import { ADMISSION_DOCUMENTS } from "./documents";

export function validateForm(data, files, consentAccepted) {
    const errors = {};
  
    const required = (val) => val !== undefined && val !== null && String(val).trim() !== "";
  
    // Required text fields
    const requiredFields = [
      ["full_name", "Full name is required"],
      ["father_name", "Father's / Husband's name is required"],
      ["mother_name", "Mother's name is required"],
      ["address", "Address is required"],
      ["city", "City is required"],
      ["state", "State is required"],
      ["mobile", "Mobile number is required"],
      ["sex", "Please select sex"],
      ["nationality", "Nationality is required"],
      ["email", "Email is required"],
      ["dob", "Date of birth is required"],
      ["birth_place", "Birth place is required"],
      ["payment_mode", "Please select a payment mode"],
    ];
  
    requiredFields.forEach(([field, msg]) => {
      if (!required(data[field])) errors[field] = msg;
    });
  
    // Email format
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Enter a valid email address";
    }
  
    // Indian mobile numbers: 10 digits, starting 6-9
    const mobileRegex = /^[6-9]\d{9}$/;
    if (data.mobile && !mobileRegex.test(data.mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (data.father_mobile && !mobileRegex.test(data.father_mobile)) {
      errors.father_mobile = "Enter a valid 10-digit mobile number";
    }
  
    // Pin code: 6 digits
    if (data.pin_code && !/^\d{6}$/.test(data.pin_code)) {
      errors.pin_code = "Enter a valid 6-digit PIN code";
    }
  
    // Date of birth: must be a real, past date, and give a plausible age (>=15)
    if (data.dob) {
      const dobDate = new Date(data.dob);
      const today = new Date();
      if (isNaN(dobDate.getTime()) || dobDate >= today) {
        errors.dob = "Enter a valid date of birth";
      } else {
        const age = (today - dobDate) / (1000 * 60 * 60 * 24 * 365.25);
        if (age < 15) errors.dob = "Date of birth seems incorrect";
      }
    }
  
    // Marks: 0-100 each
    ["physics_marks", "chemistry_marks", "biology_marks", "english_marks"].forEach((f) => {
      if (data[f] !== "" && data[f] !== undefined) {
        const n = Number(data[f]);
        if (isNaN(n) || n < 0 || n > 100) {
          errors[f] = "Enter marks between 0 and 100";
        }
      }
    });
  
    // NEET score: 0-720
    if (data.neet_score !== "" && data.neet_score !== undefined) {
      const n = Number(data.neet_score);
      if (isNaN(n) || n < 0 || n > 720) {
        errors.neet_score = "NEET score must be between 0 and 720";
      }
    }
  
    // UTR required only for online payment
    if (data.payment_mode === "Online" && !required(data.utr_number)) {
      errors.utr_number = "UTR number is required for online payments";
    }
  
    // Payment screenshot required
    if (!files.payment_screenshot) {
      errors.payment_screenshot = "Please attach your payment screenshot";
    }
  
    // File validation helper
    const validateFile = (file, fieldName, label) => {
      if (!file) return;
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        errors[fieldName] = `${label} must be a JPG, PNG, or PDF file`;
      } else if (file.size > 5 * 1024 * 1024) {
        errors[fieldName] = `${label} must be under 5MB`;
      }
    };
  
    validateFile(files.payment_screenshot, "payment_screenshot", "Payment screenshot");

    ADMISSION_DOCUMENTS.forEach((doc) => {
      if (doc.required && !files[doc.name]) {
        errors[doc.name] = `Please attach your ${doc.label.toLowerCase()}`;
      }
      validateFile(files[doc.name], doc.name, doc.label);
    });

    if (!consentAccepted) {
      errors.consent = "You must read and accept the undertaking and declaration";
    }

    return errors;
  }