const { validationResult } = require('express-validator');
const CustomerOrder = require('../models/CustomerOrder');
const sendMail = require('../utils/sendMail');
const { buildAdminOrderEmail, buildCustomerOrderEmail } = require('../utils/emailTemplates');

const ADMIN_EMAIL = process.env.MAIL_TO_ADMIN || process.env.MAIL_USER;

const generateOrderId = (prefix = 'ORD') => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${Date.now()}-${random}`;
};

const sanitizePhone = (phone = '') => phone.replace(/[^\d+]/g, '').substring(0, 15);

const createOrderRecord = async (payload = {}) => {
  const orderId = payload.orderId || generateOrderId(payload.formType === 'checkout' ? 'CHK' : 'ORD');
  const baseData = {
    ...payload,
    orderId,
    phone: sanitizePhone(payload.phone),
    paymentStatus: payload.paymentStatus || (payload.paymentMode === 'online' ? 'paid' : 'cod')
  };
  const order = await CustomerOrder.create(baseData);
  return order;
};

const dispatchEmails = async (order) => {
  if (!ADMIN_EMAIL) {
    console.warn('MAIL_TO_ADMIN not configured. Skipping admin notification.');
    return;
  }

  const adminHtml = buildAdminOrderEmail(order);
  const customerHtml = buildCustomerOrderEmail(order);

  const operations = [
    sendMail({
      to: ADMIN_EMAIL,
      subject: `New Order Received - ${order.orderId}`,
      html: adminHtml
    })
  ];

  if (order.email) {
    operations.push(
      sendMail({
        to: order.email,
        subject: 'Your Order is Confirmed',
        html: customerHtml
      })
    );
  }

  const results = await Promise.allSettled(operations);
  results
    .filter((result) => result.status === 'rejected')
    .forEach((result) => {
      console.warn('Email dispatch failed:', result.reason?.message || result.reason);
    });
};

exports.createPublicOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: errors.array().map((e) => e.msg).join(', ')
      });
    }

    const allowedStatus = ['pending', 'paid', 'cod', 'failed'];
    const allowedModes = ['online', 'cod', 'na'];

    const payload = {
      formType: req.body.formType || 'order',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      productName: req.body.productName,
      productId: req.body.productId,
      productPrice: req.body.productPrice ? Number(req.body.productPrice) : undefined,
      paymentStatus: allowedStatus.includes(req.body.paymentStatus) ? req.body.paymentStatus : 'pending',
      paymentMode: allowedModes.includes(req.body.paymentMode) ? req.body.paymentMode : 'na',
      notes: req.body.notes,
      cartItems: Array.isArray(req.body.cartItems) ? req.body.cartItems : [],
      meta: req.body.meta
    };

    const order = await createOrderRecord(payload);
    await dispatchEmails(order);

    res.status(201).json({
      success: true,
      message: 'Order submitted successfully',
      orderId: order.orderId
    });
  } catch (err) {
    next(err);
  }
};

exports.listAdminOrders = async (req, res, next) => {
  try {
    if (!req.user || req.authType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;
    const filter = {};
    if (req.query.paymentStatus) {
      filter.paymentStatus = req.query.paymentStatus;
    }
    if (req.query.formType) {
      filter.formType = req.query.formType;
    }

    const [orders, total] = await Promise.all([
      CustomerOrder.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      CustomerOrder.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.recordCheckoutOrder = async ({ user, address, cartSummary, paymentMode, paymentStatus, orderId }) => {
  if (!user || !address) return null;

  const payload = {
    formType: paymentMode === 'cod' ? 'cod' : 'checkout',
    orderId,
    name: `${user.first_name || user.username || ''}`.trim() || 'Customer',
    email: user.email,
    phone: address.mob1 ? String(address.mob1) : user.phone || '',
    address: [address.address, address.area, address.city, address.state].filter(Boolean).join(', '),
    city: address.city,
    state: address.state,
    pincode: address.postalcode || address.pincode,
    productName: cartSummary?.productName,
    productId: cartSummary?.productId,
    productPrice: cartSummary?.total,
    paymentMode,
    paymentStatus,
    cartItems: cartSummary?.items || [],
    meta: {
      legacyOrderIds: cartSummary?.legacyIds || []
    }
  };

  const order = await createOrderRecord(payload);
  await dispatchEmails(order);
  return order;
};

