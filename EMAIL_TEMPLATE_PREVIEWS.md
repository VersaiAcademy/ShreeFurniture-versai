# Email Template Previews

## 1. Contact Form Email (Admin)

**Recipient:** srifurniturevillageweb@gmail.com  
**Subject:** `New Contact Form Submission - {Customer Name}`

### Visual Layout:
```
┌─────────────────────────────────────┐
│  🚨 NEW CONTACT FORM SUBMISSION     │
│  Customer Name                      │
└─────────────────────────────────────┘

Contact Information:
┌─────────────────┬──────────────────┐
│ Name:           │ John Doe         │
│ Email:          │ john@email.com   │
│ Phone:          │ 9876543210       │
│ Reason:         │ Product Query    │
└─────────────────┴──────────────────┘

💬 Message:
┌─────────────────────────────────────┐
│ Customer's message text here...      │
└─────────────────────────────────────┘

📎 Attachment: [View Image] (if provided)

Action Required: Please respond to this customer inquiry promptly.
```

---

## 2. Custom Furniture Email (Admin)

**Recipient:** srifurniturevillageweb@gmail.com  
**Subject:** `New Custom Furniture Enquiry Received - {OrderID}`

### Visual Layout:
```
┌─────────────────────────────────────┐
│  🪑 CUSTOM FURNITURE ENQUIRY        │
│  Customer Name                      │
│  Order ID: ORD-1234567890-ABC       │
└─────────────────────────────────────┘

Customer Details:
┌─────────────────┬──────────────────┐
│ Name:           │ John Doe         │
│ Phone:          │ 9876543210       │
│ Email:          │ john@email.com   │
│ Product:        │ Custom Furniture │
└─────────────────┴──────────────────┘

Delivery Address:
┌─────────────────────────────────────┐
│ 123 Main Street                      │
│ City, State                          │
│ Pincode: 123456                      │
└─────────────────────────────────────┘

📝 Custom Requirements:
┌─────────────────────────────────────┐
│ Customer's custom requirements...    │
└─────────────────────────────────────┘

Action Required: Contact customer to discuss requirements.
```

---

## 3. Bulk Order Email (Admin)

**Recipient:** srifurniturevillageweb@gmail.com  
**Subject:** `New Bulk/Corporate Order Received - {OrderID}`

### Visual Layout:
```
┌─────────────────────────────────────┐
│  📦 BULK/CORPORATE ORDER ENQUIRY   │
│  Customer Name                      │
│  Order ID: ORD-1234567890-XYZ      │
└─────────────────────────────────────┘

Business Information:
┌─────────────────┬──────────────────┐
│ Contact Name:    │ John Doe         │
│ Company:         │ ABC Corporation  │
│ Phone:           │ 9876543210       │
│ Email:           │ john@email.com   │
│ Requirement Type:│ Hotel Furniture  │
│ Approx Quantity: │ 50               │
│ Product:         │ Bulk Order       │
└─────────────────┴──────────────────┘

Delivery Address: [Full address]

📝 Requirements: [Customer requirements]

Action Required: Contact for pricing and delivery timeline.
```

---

## 4. Order Confirmation Email (Customer)

**Recipient:** Customer Email  
**Subject:** `Order Confirmation - {OrderID} | SRI Furniture Village`

### Visual Layout:
```
┌─────────────────────────────────────┐
│  Hello Customer,                    │
│  ✅ Order Confirmed!                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📦 Order ID: ORD-1234567890-ABC   │
│  Payment confirmed. Processing...   │
└─────────────────────────────────────┘

Order Details:
┌─────────────────┬──────────────────┐
│ Product:        │ Sofa Set         │
│ Total Amount:   │ ₹25,000.00       │
│ Payment Mode:   │ ONLINE            │
│ Payment Status: │ PAID              │
└─────────────────┴──────────────────┘

Order Items:
┌──────────┬──────┬──────────┬──────────┐
│ Item     │ Qty  │ Price    │ Total    │
├──────────┼──────┼──────────┼──────────┤
│ Sofa Set │ 1    │ ₹25,000  │ ₹25,000  │
└──────────┴──────┴──────────┴──────────┘

Delivery Address:
┌─────────────────────────────────────┐
│ 123 Main Street                      │
│ City, State                          │
│ Pincode: 123456                      │
└─────────────────────────────────────┘

📅 Estimated Delivery:
Our team will contact you within 24-48 hours.
Expected delivery: 5-7 business days.

Contact: srifurniturevillageweb@gmail.com
```

---

## 5. Admin Order Notification Email

**Recipient:** srifurniturevillageweb@gmail.com  
**Subject:** `New {FormType} Order Received - {OrderID}`

### Visual Layout:
```
┌─────────────────────────────────────┐
│  🚨 NEW ORDER RECEIVED              │
│  Customer Name (Order Type)         │
│  Order ID: ORD-1234567890-ABC       │
└─────────────────────────────────────┘

Customer Information:
┌─────────────────┬──────────────────┐
│ Name:           │ John Doe         │
│ Phone:          │ 9876543210       │
│ Email:          │ john@email.com   │
│ Product:        │ Sofa Set         │
│ Total Amount:   │ ₹25,000.00       │
│ Payment Mode:   │ ONLINE            │
│ Payment Status: │ [PAID] (green)   │
└─────────────────┴──────────────────┘

Delivery Address: [Full address]

Order Items: [If provided]

Customer Note: [If provided]

Action Required: Process order and contact customer.
```

---

## Email Styling Features

### Color Coding:
- **Contact Form:** Red header (#ef4444)
- **Custom Furniture:** Blue header (#3b82f6)
- **Bulk Order:** Yellow header (#f59e0b)
- **Order Confirmation:** Green confirmation (#059669)
- **Admin Order:** Red alert (#ef4444)

### Responsive Design:
- Works on all email clients
- Mobile-friendly layout
- Table-based structure for compatibility
- Inline CSS for maximum compatibility

### Professional Elements:
- SRI Furniture Village branding
- Clear section headers
- Organized data tables
- Action required sections
- Timestamps
- Clickable phone/email links

---

## Testing Email Templates

### Test Contact Form:
1. Submit contact form
2. Check inbox: `srifurniturevillageweb@gmail.com`
3. Verify email received with all details

### Test Custom Furniture:
1. Submit custom furniture form
2. Check admin inbox
3. Check customer inbox (if email provided)
4. Verify both emails received

### Test Bulk Order:
1. Submit bulk order form
2. Check admin inbox
3. Check customer inbox (if email provided)
4. Verify both emails received

### Test Regular Order:
1. Place order through checkout
2. Check admin inbox
3. Check customer inbox
4. Verify order confirmation email

---

## Email Delivery Status

All emails are sent to:
- **Admin:** srifurniturevillageweb@gmail.com
- **Customer:** Email provided in form/order

Email sending is **non-blocking** - forms are saved even if email fails.

Check server logs for email delivery status:
- `✅ Email sent successfully` = Delivered
- `❌ Email sending failed` = Check SMTP configuration

