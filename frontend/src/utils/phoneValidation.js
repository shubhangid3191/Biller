/**
 * Phone/Mobile validation utilities
 * Validates 10-digit phone numbers (no alphabets)
 */

// Validation function - checks if value is empty or exactly 10 digits
export const validatePhone = (value) => {
  if (!value) return ""; // Empty is okay (unless field is required)
  if (!/^\d{10}$/.test(value)) {
    return "Enter a valid 10-digit number";
  }
  return "";
};

// Format phone number for display (optional formatting)
export const formatPhoneDisplay = (value) => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return digits;
};

// Create onChange handler for phone fields
// Returns a function that strips non-digits and limits to 10 digits
export const createPhoneChangeHandler = (setForm, field, setErrors = null) => (e) => {
  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
  
  setForm((prev) => ({
    ...prev,
    [field]: digits,
  }));

  // Clear error when user is typing
  if (setErrors) {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  }
};

// Create onBlur handler for phone fields
// Validates the field when user leaves it
export const createPhoneBlurHandler = (form, field, setErrors) => () => {
  setErrors((prev) => ({
    ...prev,
    [field]: validatePhone(form[field]),
  }));
};

// Validate all phone fields at once (for form submission)
export const validatePhoneFields = (form, phoneFieldNames) => {
  const errors = {};
  phoneFieldNames.forEach((field) => {
    const error = validatePhone(form[field]);
    if (error) {
      errors[field] = error;
    }
  });
  return errors;
};
