/**
 * Form Validation Utilities
 * Centralized validation functions for all forms
 */

/**
 * Validate phone number (10 digits, numeric only)
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { valid: false, message: 'Phone number is required' };
  }
  const phoneRegex = /^[0-9]{10}$/;
  const cleaned = phone.toString().replace(/\D/g, '');
  if (!phoneRegex.test(cleaned)) {
    return { valid: false, message: 'Phone number must be exactly 10 digits' };
  }
  return { valid: true, value: cleaned };
};

/**
 * Validate pincode (6 digits, numeric only)
 */
export const validatePincode = (pincode) => {
  if (!pincode || pincode.toString().trim() === '') {
    return { valid: false, message: 'Pincode is required' };
  }
  const pincodeRegex = /^[0-9]{6}$/;
  const cleaned = pincode.toString().replace(/\D/g, '');
  if (!pincodeRegex.test(cleaned)) {
    return { valid: false, message: 'Pincode must be exactly 6 digits' };
  }
  return { valid: true, value: cleaned };
};

/**
 * Validate name (minimum 3 characters, alphabets and spaces only)
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return { valid: false, message: 'Name is required' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 3) {
    return { valid: false, message: 'Name must be at least 3 characters long' };
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(trimmed)) {
    return { valid: false, message: 'Name can only contain letters and spaces' };
  }
  return { valid: true, value: trimmed };
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { valid: false, message: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Please enter a valid email address' };
  }
  return { valid: true, value: email.trim() };
};

/**
 * Validate address (minimum 10 characters)
 */
export const validateAddress = (address) => {
  if (!address || address.trim() === '') {
    return { valid: false, message: 'Address is required' };
  }
  const trimmed = address.trim();
  if (trimmed.length < 10) {
    return { valid: false, message: 'Address must be at least 10 characters long' };
  }
  return { valid: true, value: trimmed };
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }
  return { valid: true, value: value.toString().trim() };
};

