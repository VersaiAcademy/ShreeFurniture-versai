# 🧪 Address Validation Updates - Testing Checklist

**Test Date:** November 13, 2025  
**Status:** Ready for Testing

---

## ✅ Backend Validation Tests

### Test 1: Phone Number - Required
```
TEST: Save address WITHOUT phone number
EXPECTED: ❌ FAIL with error "Phone must be 10 digits"
STATUS: [ ] Pass [ ] Fail
```

### Test 2: Phone Number - Exactly 10 Digits
```
TEST: Save address with phone = "9876543210"
EXPECTED: ✅ PASS (saves successfully)
STATUS: [ ] Pass [ ] Fail
```

### Test 3: Phone Number - Less than 10 Digits
```
TEST: Save address with phone = "987654321" (9 digits)
EXPECTED: ❌ FAIL with error "Phone must be 10 digits"
STATUS: [ ] Pass [ ] Fail
```

### Test 4: Phone Number - More than 10 Digits
```
TEST: Save address with phone = "98765432109" (11 digits)
EXPECTED: ❌ FAIL with error "Phone must be 10 digits"
STATUS: [ ] Pass [ ] Fail
```

### Test 5: Phone Number - Non-Numeric
```
TEST: Save address with phone = "98765ABCDE"
EXPECTED: ❌ FAIL with error "Phone must be 10 digits"
STATUS: [ ] Pass [ ] Fail
```

### Test 6: Landmark - Optional
```
TEST: Save address WITHOUT landmark field
EXPECTED: ✅ PASS (landmark = null in DB)
STATUS: [ ] Pass [ ] Fail
```

### Test 7: Landmark - Can be Empty String
```
TEST: Save address with landmark = "" (empty)
EXPECTED: ✅ PASS (landmark = null in DB)
STATUS: [ ] Pass [ ] Fail
```

### Test 8: Landmark - Can have Value
```
TEST: Save address with landmark = "Near Central Park"
EXPECTED: ✅ PASS (landmark saved)
STATUS: [ ] Pass [ ] Fail
```

### Test 9: Address Required
```
TEST: Save address with address_line1 = "" (empty)
EXPECTED: ❌ FAIL with error "Address line 1 is required"
STATUS: [ ] Pass [ ] Fail
```

### Test 10: Zip Code - 5 Digits Valid
```
TEST: Save address with zip = "40000"
EXPECTED: ✅ PASS (5 digits accepted)
STATUS: [ ] Pass [ ] Fail
```

### Test 11: Zip Code - 6 Digits Valid
```
TEST: Save address with zip = "400001"
EXPECTED: ✅ PASS (6 digits accepted)
STATUS: [ ] Pass [ ] Fail
```

### Test 12: Zip Code - Less than 5 Digits Invalid
```
TEST: Save address with zip = "4000"
EXPECTED: ❌ FAIL with error "Zip code must be 5-6 digits"
STATUS: [ ] Pass [ ] Fail
```

### Test 13: Zip Code - More than 6 Digits Invalid
```
TEST: Save address with zip = "4000001"
EXPECTED: ❌ FAIL with error "Zip code must be 5-6 digits"
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ Frontend Validation Tests

### Test 14: Form Cannot Submit Without Phone
```
TEST: Click "Save Address" without entering phone
EXPECTED: ❌ Form shows validation error (HTML5 required)
STATUS: [ ] Pass [ ] Fail
```

### Test 15: Form Cannot Submit Without Address
```
TEST: Click "Save Address" without entering Address Line 1
EXPECTED: ❌ Form shows validation error
STATUS: [ ] Pass [ ] Fail
```

### Test 16: Phone Placeholder Shows Required
```
TEST: View edit form
EXPECTED: ✅ Phone placeholder shows "Phone Number (10 digits) *"
STATUS: [ ] Pass [ ] Fail
```

### Test 17: Landmark Placeholder Shows Optional
```
TEST: View edit form
EXPECTED: ✅ Landmark placeholder shows "Landmark (Optional)"
STATUS: [ ] Pass [ ] Fail
```

### Test 18: Edit Form Pre-fills Data
```
TEST: Click Edit button with existing address
EXPECTED: ✅ All fields pre-filled with saved values
         ✅ Landmark field filled if it has value
         ✅ Landmark empty if it was null
STATUS: [ ] Pass [ ] Fail
```

### Test 19: Submit Form with Valid Data
```
TEST: Fill all required fields and click Save
EXPECTED: ✅ Success message appears
         ✅ Form closes and shows read-only view
         ✅ Toastr notification: "Address updated successfully!"
STATUS: [ ] Pass [ ] Fail
```

### Test 20: Submit Form with Invalid Phone
```
TEST: Fill form but phone has only 9 digits, click Save
EXPECTED: ❌ Validation error shown on phone field or in console
         ❌ Toastr error: "Failed to update address"
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ Frontend Display Tests

### Test 21: Address Display - Full Details
```
TEST: View saved address (read-only mode)
EXPECTED: ✅ Shows all fields:
         - Address
         - Locality
         - Landmark
         - City
         - State
         - Pin Code
         - Phone
         - Alternate Phone (if exists)
STATUS: [ ] Pass [ ] Fail
```

### Test 22: Landmark Display - When Not Provided
```
TEST: View saved address where landmark = null
EXPECTED: ✅ Shows "Landmark: Not provided"
         ❌ Does NOT show as blank line
STATUS: [ ] Pass [ ] Fail
```

### Test 23: Phone Display - Correct Field
```
TEST: View saved address
EXPECTED: ✅ Phone field shows mob1 value (e.g., 9876543210)
STATUS: [ ] Pass [ ] Fail
```

### Test 24: Alternate Phone Display
```
TEST: Save address with both mob1 and mob2, then view
EXPECTED: ✅ Shows both phone numbers
         ✅ Alternate Phone only shows if mob2 exists
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ Admin Orders Table Tests

### Test 25: Admin Table - Phone Column
```
TEST: View admin orders
EXPECTED: ✅ Phone column displays
         ✅ Shows customer phone number
         ✅ Falls back to address.mob1 if no user.phone
         ✅ Shows "N/A" if neither exists
STATUS: [ ] Pass [ ] Fail
```

### Test 26: Admin Table - Full Address Display
```
TEST: View admin orders
EXPECTED: ✅ Address column shows:
         - address (street)
         - area (locality)
         - city
         - postalcode (pin code)
         
EXAMPLE: "123 Main Street, Sector 5, Mumbai - 400001"
STATUS: [ ] Pass [ ] Fail
```

### Test 27: Admin Table - Address with Landmark
```
TEST: View admin orders where customer added landmark
EXPECTED: ✅ Landmark visible in address display OR
         ✅ Separate field shows landmark if available
STATUS: [ ] Pass [ ] Fail
```

### Test 28: Admin Table - Missing Address
```
TEST: View order where address = null
EXPECTED: ✅ Shows "N/A" for address field
         ✅ Shows "N/A" for phone field
         ❌ Does NOT crash
STATUS: [ ] Pass [ ] Fail
```

### Test 29: Admin Table - Mobile Responsive
```
TEST: View admin table on mobile (< 768px width)
EXPECTED: ✅ Table scrolls horizontally
         ✅ Phone column visible
         ✅ Address column shows truncated but readable
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ Database Tests

### Test 30: Database - New Address Document
```
MONGODB: db.deliveryaddresses.findOne()
EXPECTED: ✅ mob1: 9876543210 (required, not null)
         ✅ landmark: null (if not provided - optional)
         ✅ All address fields present
STATUS: [ ] Pass [ ] Fail
```

### Test 31: Database - Schema Validation
```
TEST: Try to save address without mob1 to MongoDB directly
EXPECTED: ❌ MongoDB validation error
         "mob1: is required"
STATUS: [ ] Pass [ ] Fail
```

### Test 32: Database - Landmark Field
```
MONGODB: db.deliveryaddresses.findOne()
EXPECTED: ✅ landmark: null OR string value
         ❌ landmark: undefined (should exist as null if not set)
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ API Endpoint Tests

### Test 33: PUT /api/users/:id - Success Response
```
REQUEST:
{
  "phone": "9876543210",
  "address_line1": "123 Main St",
  "address_line2": "Sector 5",
  "city": "Mumbai",
  "state": "Maharashtra",
  "zip": "400001",
  "landmark": "Near Park"
}

EXPECTED: ✅ Status 200
         ✅ Message: "Profile updated successfully"
         ✅ Response includes address object
         ✅ address.mob1 = 9876543210
         ✅ address.landmark = "Near Park"
STATUS: [ ] Pass [ ] Fail
```

### Test 34: PUT /api/users/:id - Missing Phone Error
```
REQUEST: (without phone field)
{
  "address_line1": "123 Main St",
  ...
}

EXPECTED: ❌ Status 400
         ✅ Message: "Validation failed"
         ✅ errors include phone error
STATUS: [ ] Pass [ ] Fail
```

### Test 35: PUT /api/users/:id - Optional Landmark
```
REQUEST: (without landmark field)
{
  "phone": "9876543210",
  "address_line1": "123 Main St",
  ...
}

EXPECTED: ✅ Status 200
         ✅ Address saves successfully
         ✅ address.landmark = null
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ Error Handling Tests

### Test 36: Toast Notification - Success
```
TEST: Save address successfully
EXPECTED: ✅ Toast message: "Address updated successfully!"
         ✅ Toast type: Success (green)
         ✅ Toast auto-dismisses after 3 seconds
STATUS: [ ] Pass [ ] Fail
```

### Test 37: Toast Notification - Error
```
TEST: Try to save address with invalid phone
EXPECTED: ✅ Toast message appears with error details
         ✅ Toast type: Error (red)
         ✅ Error message readable
STATUS: [ ] Pass [ ] Fail
```

### Test 38: Console Errors - None
```
TEST: Save address successfully
EXPECTED: ✅ No JavaScript errors in console
         ❌ No 400/500 HTTP errors
         ✅ All API calls successful
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ Edge Cases

### Test 39: Phone with Spaces
```
TEST: Save address with phone = "98765 43210" (with space)
EXPECTED: ❌ FAIL (should be numeric only)
STATUS: [ ] Pass [ ] Fail
```

### Test 40: Phone with Dashes
```
TEST: Save address with phone = "9876-543-210"
EXPECTED: ❌ FAIL (should be numeric only)
STATUS: [ ] Pass [ ] Fail
```

### Test 41: Very Long Landmark
```
TEST: Save address with very long landmark (500 chars)
EXPECTED: ✅ PASS (should save, limited by DB schema)
         OR ❌ FAIL with error message
STATUS: [ ] Pass [ ] Fail
```

### Test 42: Special Characters in Address
```
TEST: Save address with "&", "@", "#" symbols
EXPECTED: ✅ PASS (should allow special chars)
STATUS: [ ] Pass [ ] Fail
```

### Test 43: Unicode Characters
```
TEST: Save address with Hindi/Marathi characters
EXPECTED: ✅ PASS (should save and display correctly)
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ Integration Tests

### Test 44: Full Order Flow with New Address
```
TEST: 
  1. User creates/updates address with phone & optional landmark
  2. User places order
  3. Check order in admin panel
  
EXPECTED: ✅ Order shows customer phone
         ✅ Order shows full address including city & pincode
         ✅ Landmark visible if provided
STATUS: [ ] Pass [ ] Fail
```

### Test 45: Multiple Users - Address Independence
```
TEST: Create addresses for 2 different users
EXPECTED: ✅ Each user's address stored separately
         ✅ Admin sees correct phone for each order
         ✅ No address mixing
STATUS: [ ] Pass [ ] Fail
```

### Test 46: Update Existing Address
```
TEST: 
  1. Save address with phone "9876543210"
  2. Edit and change phone to "9876543211"
  3. Save again
  
EXPECTED: ✅ New phone saved
         ✅ Old phone replaced
         ✅ Address object ID remains same (updated, not created new)
STATUS: [ ] Pass [ ] Fail
```

---

## ✅ UI/UX Tests

### Test 47: Form Labels Clear
```
TEST: View edit form
EXPECTED: ✅ All fields have clear labels
         ✅ Required fields marked with * (asterisk)
         ✅ Optional fields say "(Optional)"
STATUS: [ ] Pass [ ] Fail
```

### Test 48: Mobile Layout
```
TEST: View edit form on mobile (320px width)
EXPECTED: ✅ Form fields stack vertically
         ✅ All input fields full width
         ✅ No horizontal overflow
         ✅ Buttons full width
STATUS: [ ] Pass [ ] Fail
```

### Test 49: Tablet Layout
```
TEST: View edit form on tablet (768px width)
EXPECTED: ✅ Form in 2-column grid layout
         ✅ Proper spacing
         ✅ Readable and accessible
STATUS: [ ] Pass [ ] Fail
```

### Test 50: Loading State
```
TEST: Click "Save Address" and watch for loading
EXPECTED: ✅ Button changes to "Saving..."
         ✅ Button disabled during save
         ✅ Button returns to "Save Address" after success/error
STATUS: [ ] Pass [ ] Fail
```

---

## 📊 Test Summary

**Total Tests:** 50  
**Passed:** ___  
**Failed:** ___  

### Critical Tests (Must Pass):
- Test 1-5: Phone validation ✅
- Test 6-8: Landmark optional ✅
- Test 25-26: Admin display ✅
- Test 33-35: API validation ✅

### Important Tests (Should Pass):
- Test 14-20: Frontend validation ✅
- Test 30-32: Database validation ✅

### Nice-to-Have Tests (Can Pass):
- Test 39-43: Edge cases ✅
- Test 47-50: UI/UX ✅

---

## 🚨 Critical Issues

If ANY of these tests fail:
1. ❌ Phone not required → Cannot fulfill orders (CRITICAL)
2. ❌ Admin phone not showing → Cannot contact customers (CRITICAL)
3. ❌ Admin address incomplete → Cannot deliver (CRITICAL)

---

## ✅ Sign-Off

```
Tested By: ________________
Date: ________________
Status: [ ] All Pass [ ] Some Fail [ ] Critical Issues

Notes:
_________________________________
_________________________________
_________________________________
```

---

**Next Step:** Run these tests and check results!

