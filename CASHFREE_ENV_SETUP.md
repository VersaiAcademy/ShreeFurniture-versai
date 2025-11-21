# Cashfree Payment Gateway Setup Guide

## Environment Variables Required

आपको `backend/.env` file में ये variables add करने होंगे:

```env
# Cashfree Configuration
CASHFREE_APP_ID=your_app_id_here
CASHFREE_SECRET_KEY=your_secret_key_here
CASHFREE_API_BASE=https://api.cashfree.com
CASHFREE_WEBHOOK_SECRET=your_webhook_secret  # Optional
FRONTEND_BASE_URL=http://localhost:5173  # For local development
```

## Steps to Get Cashfree API Keys

1. **Login to Cashfree Dashboard**: 
   - Go to https://merchant.cashfree.com/merchants/pg/developers/api-keys?env=prod
   - Login with your Cashfree account

2. **Get API Keys**:
   - **Client ID** → यह `CASHFREE_APP_ID` होगा
   - **Client Secret** → यह `CASHFREE_SECRET_KEY` होगा

3. **Select Environment**:
   - **Sandbox/Test**: `CASHFREE_API_BASE=https://sandbox.cashfree.com`
   - **Production/Live**: `CASHFREE_API_BASE=https://api.cashfree.com`

## Example .env Configuration

### For Development (Sandbox):
```env
CASHFREE_APP_ID=CF12345ABCD
CASHFREE_SECRET_KEY=your_sandbox_secret_key
CASHFREE_API_BASE=https://sandbox.cashfree.com
FRONTEND_BASE_URL=http://localhost:5173
```

### For Production (Live):
```env
CASHFREE_APP_ID=CF12345ABCD
CASHFREE_SECRET_KEY=your_live_secret_key
CASHFREE_API_BASE=https://api.cashfree.com
FRONTEND_BASE_URL=https://yourdomain.com
```

## Important Notes

1. **Never Commit .env File**: `.env` file को git में commit न करें
2. **Keep Secrets Safe**: API keys को कभी share न करें
3. **Use Sandbox First**: Production से पहले sandbox में test करें
4. **Restart Server**: .env changes के बाद backend server restart करें

## How Payment Flow Works

1. User clicks "Buy Now" on address page
2. If not logged in → redirects to login
3. After login → returns to address page
4. Auto-triggers payment if address is complete
5. Creates Cashfree order via backend
6. Redirects to Cashfree payment gateway
7. After payment → redirects to `/cashfree-callback`
8. Verifies payment and creates order

## Troubleshooting

### Issue: "Cashfree not configured on server"
**Solution**: Check that `CASHFREE_APP_ID` and `CASHFREE_SECRET_KEY` are set in `.env`

### Issue: Payment gateway doesn't open
**Solution**: 
- Check backend console logs for Cashfree API response
- Verify API keys are correct
- Check that `CASHFREE_API_BASE` is correct (sandbox vs live)

### Issue: Payment redirects to login even when logged in
**Solution**: 
- Clear browser localStorage
- Check that token is valid
- Verify authentication flow

## Testing Checklist

- [ ] Set Cashfree credentials in `.env`
- [ ] Restart backend server
- [ ] Test with sandbox credentials first
- [ ] Complete full payment flow
- [ ] Verify payment callback works
- [ ] Test error scenarios
- [ ] Switch to live credentials for production

---

**Reference**: https://merchant.cashfree.com/merchants/pg/developers/api-keys

