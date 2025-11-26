const express = require('express');
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const {
  createPublicOrder,
  listAdminOrders
} = require('../controllers/customerOrderController');

const router = express.Router();

const validators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Valid phone is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('pincode').trim().isLength({ min: 4 }).withMessage('Valid pincode required')
];

router.post('/order/create', validators, createPublicOrder);

router.get('/admin/orders', authenticateToken, listAdminOrders);

module.exports = router;

