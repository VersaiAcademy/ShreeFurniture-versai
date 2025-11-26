const currency = (value) => {
  if (typeof value !== 'number') {
    const num = Number(value);
    if (!Number.isFinite(num)) return 'N/A';
    return `₹${num.toLocaleString('en-IN')}`;
  }
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
};

const renderItemRows = (items = []) => {
  if (!items.length) {
    return `<tr>
      <td colspan="4" style="padding:12px;border:1px solid #eee;text-align:center;color:#6b7280;font-size:13px;">
        No item breakdown provided
      </td>
    </tr>`;
  }

  return items
    .map(
      (item) => `<tr>
        <td style="padding:12px;border:1px solid #eee;">${item.productName || 'Product'}</td>
        <td style="padding:12px;border:1px solid #eee;text-align:center;">${item.quantity || 1}</td>
        <td style="padding:12px;border:1px solid #eee;text-align:right;">${currency(item.price)}</td>
        <td style="padding:12px;border:1px solid #eee;text-align:right;">${currency(
          (item.price || 0) * (item.quantity || 1)
        )}</td>
      </tr>`
    )
    .join('');
};

const baseLayout = (content) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Notification</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:24px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 12px 30px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:#111827;padding:32px 24px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;font-size:24px;">SRI Furniture Village</h1>
                <p style="color:#cbd5f5;margin:8px 0 0;font-size:14px;">Premium handcrafted furniture</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 24px;color:#111827;">
                ${content}
              </td>
            </tr>
            <tr>
              <td style="background:#f9fafb;padding:20px;text-align:center;color:#6b7280;font-size:12px;">
                © ${new Date().getFullYear()} SRI Furniture Village. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const addressBlock = (order) => {
  const rows = [
    order.address,
    [order.city, order.state].filter(Boolean).join(', '),
    order.pincode && `Pincode: ${order.pincode}`
  ]
    .filter(Boolean)
    .map((line) => `<p style="margin:0;color:#374151;">${line}</p>`)
    .join('');

  return `
    <div style="background:#fef3c7;padding:18px;border-radius:10px;margin-top:18px;">
      <p style="margin:0;font-weight:bold;color:#92400e;text-transform:uppercase;font-size:12px;">Delivery Address</p>
      <p style="margin:6px 0 0;color:#1f2937;">${rows || 'Not provided'}</p>
    </div>
  `;
};

exports.buildCustomerOrderEmail = (order) => {
  const content = `
    <p style="font-size:16px;margin:0 0 16px;">Hello ${order.name || 'Customer'},</p>
    <p style="font-size:14px;margin:0 0 16px;color:#4b5563;">
      Thank you for choosing <strong>SRI Furniture Village</strong>. Your order <strong>${order.orderId}</strong> has been
      received and is now <strong>${order.paymentStatus?.toUpperCase()}</strong>.
    </p>

    <div style="background:#f1f5f9;padding:16px;border-radius:10px;margin-bottom:18px;">
      <p style="margin:0;color:#475569;font-size:14px;"><strong>Product:</strong> ${order.productName || 'Custom Furniture'}</p>
      <p style="margin:6px 0 0;color:#475569;font-size:14px;"><strong>Amount:</strong> ${currency(order.productPrice)}</p>
      <p style="margin:6px 0 0;color:#475569;font-size:14px;"><strong>Payment Mode:</strong> ${
        order.paymentMode?.toUpperCase() || 'NA'
      }</p>
    </div>

    ${order.cartItems?.length ? `<table width="100%" style="border-collapse:collapse;font-size:13px;">${renderItemRows(order.cartItems)}</table>` : ''}

    ${addressBlock(order)}

    <p style="margin:24px 0 0;color:#111827;font-size:14px;">
      Our support team will contact you soon for delivery scheduling. If you have questions, simply reply to this email.
    </p>
  `;

  return baseLayout(content);
};

exports.buildAdminOrderEmail = (order) => {
  const content = `
    <p style="font-size:14px;color:#ef4444;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;">New order received</p>
    <h2 style="margin:0 0 8px;font-size:22px;color:#111827;">${order.name} (${order.formType})</h2>
    <p style="margin:0 0 18px;color:#4b5563;">Order ID: <strong>${order.orderId}</strong></p>

    <table width="100%" style="border-collapse:collapse;font-size:14px;margin-bottom:16px;">
      <tr>
        <td style="padding:8px;border:1px solid #e5e7eb;"><strong>Phone:</strong></td>
        <td style="padding:8px;border:1px solid #e5e7eb;">${order.phone || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #e5e7eb;"><strong>Email:</strong></td>
        <td style="padding:8px;border:1px solid #e5e7eb;">${order.email || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #e5e7eb;"><strong>Product:</strong></td>
        <td style="padding:8px;border:1px solid #e5e7eb;">${order.productName || 'Custom Requirement'}</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #e5e7eb;"><strong>Price:</strong></td>
        <td style="padding:8px;border:1px solid #e5e7eb;">${currency(order.productPrice)}</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #e5e7eb;"><strong>Payment Status:</strong></td>
        <td style="padding:8px;border:1px solid #e5e7eb;">${order.paymentStatus?.toUpperCase() || 'PENDING'}</td>
      </tr>
    </table>

    ${addressBlock(order)}

    ${
      order.notes
        ? `<div style="margin-top:18px;padding:16px;border-left:4px solid #f97316;background:#fff7ed;color:#78350f;">
            <strong>Customer Note:</strong>
            <p style="margin:8px 0 0;white-space:pre-line;">${order.notes}</p>
          </div>`
        : ''
    }

    ${
      order.cartItems?.length
        ? `<h3 style="margin:24px 0 12px;color:#111827;font-size:16px;">Items</h3>
           <table width="100%" style="border-collapse:collapse;font-size:13px;">${renderItemRows(order.cartItems)}</table>`
        : ''
    }
  `;

  return baseLayout(content);
};

