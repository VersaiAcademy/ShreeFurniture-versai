# Email Setup Guide - Form Queries Not Receiving

## Problem
Forms are submitting successfully but emails are not being received at the configured email address.

## Quick Fix Checklist

### 1. Check Environment Variables
Make sure your `.env` file has:
```env
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_TO_ADMIN=your-email@gmail.com  # Optional, defaults to MAIL_USER
```

### 2. Test Email Configuration
Run the test script:
```bash
cd backend
node utils/testEmail.js
```

This will:
- Check if environment variables are set
- Send a test email
- Show detailed error messages if it fails

### 3. Common Gmail Issues

#### Issue 1: App Password Required
Gmail requires App Passwords for SMTP (not your regular password).

**Steps:**
1. Go to Google Account → Security
2. Enable 2-Step Verification (if not already enabled)
3. Go to App Passwords
4. Generate a new App Password for "Mail"
5. Use this 16-character password in `MAIL_PASS`

#### Issue 2: Less Secure App Access (Old Method)
If you can't use App Passwords:
1. Go to Google Account → Security
2. Enable "Less secure app access" (not recommended)

### 4. Check Server Logs
After submitting a form, check your backend server console for:
- `📧 Attempting to send email to: ...`
- `✅ Email sent successfully!` or `❌ Email sending failed: ...`

### 5. Verify Email Address
Make sure `MAIL_TO_ADMIN` or `MAIL_USER` is the correct email where you want to receive form queries.

## Debugging Steps

### Step 1: Check Environment Variables
```bash
# In backend directory
node -e "require('dotenv').config(); console.log('MAIL_USER:', process.env.MAIL_USER); console.log('MAIL_TO_ADMIN:', process.env.MAIL_TO_ADMIN);"
```

### Step 2: Test Email Sending
```bash
cd backend
node utils/testEmail.js
```

### Step 3: Check Backend Logs
When you submit a form, you should see in console:
```
📧 Preparing to send contact notification to: your-email@gmail.com
📧 Attempting to send email to: your-email@gmail.com
✅ Email sent successfully! Message ID: ...
```

If you see errors, they will show:
```
❌ Email sending failed: ...
❌ Error details: { code: 'EAUTH', ... }
```

### Step 4: Check Email Provider Settings

#### For Gmail:
- ✅ 2-Step Verification enabled
- ✅ App Password generated
- ✅ App Password used in `MAIL_PASS` (not regular password)

#### For Other Providers:
- Check SMTP settings (host, port, secure)
- May need different configuration in `sendMail.js`

## Code Changes Made

### 1. Enhanced Error Logging
- Added detailed console logs for email sending
- Shows recipient, subject, and success/failure status
- Logs full error details on failure

### 2. Better Error Handling
- Email failures are logged but don't break form submission
- Detailed error messages help identify the issue

### 3. Test Utility
- Created `backend/utils/testEmail.js` for easy testing
- Can be run independently to verify email setup

## Testing

### Test Contact Form:
1. Go to `/contactus`
2. Fill and submit the form
3. Check backend console for email logs
4. Check your email inbox (and spam folder)

### Test Custom Furniture Form:
1. Go to `/custom-furnitures`
2. Fill and submit the form
3. Check backend console and email

### Test Bulk Order Form:
1. Go to `/bulk-order`
2. Fill and submit the form
3. Check backend console and email

## Expected Console Output

### Success:
```
📧 Preparing to send contact notification to: your-email@gmail.com
📧 Attempting to send email to: your-email@gmail.com
📧 Subject: New Contact Submission - John Doe
📧 From: your-email@gmail.com
✅ Email sent successfully! Message ID: <xxx@mail.gmail.com>
✅ Response: 250 2.0.0 OK
```

### Failure:
```
❌ Email sending failed: Invalid login
❌ Error details: {
  message: 'Invalid login: 535-5.7.8 Username and Password not accepted',
  code: 'EAUTH',
  command: 'AUTH PLAIN',
  response: '535-5.7.8 Username and Password not accepted'
}
```

## Common Error Codes

- `EAUTH` - Authentication failed (wrong password/username)
- `ECONNECTION` - Connection failed (network/firewall)
- `ETIMEDOUT` - Connection timeout
- `EENVELOPE` - Invalid recipient email

## Still Not Working?

1. **Check Spam Folder** - Emails might be going to spam
2. **Verify Email Address** - Make sure `MAIL_TO_ADMIN` is correct
3. **Check Gmail Security** - App Password might be expired/revoked
4. **Test with Different Email** - Try a different email provider
5. **Check Server Logs** - Look for detailed error messages
6. **Verify Network** - Server might be blocking SMTP port 465

## Next Steps

1. Run `node utils/testEmail.js` to test configuration
2. Submit a test form and check console logs
3. Check email inbox (and spam folder)
4. If still failing, check error details in console

---

**Note:** Email sending is non-blocking. Forms will still submit successfully even if email fails. Check server logs to see if emails are actually being sent.

