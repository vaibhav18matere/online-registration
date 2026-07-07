import { ADMISSION_DOCUMENTS } from "./documents";
import { INDIAN_STATES, isValidStateCity } from "./indiaLocations";

function isRequiredValue(val) {
  return val !== undefined && val !== null && String(val).trim() !== "";
}

function validateFile(file, fieldName, label, errors) {
  if (!file) {
    return;
  }
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    errors[fieldName] = `${label} must be a JPG, PNG, or PDF file`;
  } else if (file.size > 5 * 1024 * 1024) {
    errors[fieldName] = `${label} must be under 5MB`;
  }
}

function validateCommonFields(data, errors, options) {
  const { requireMobileMatch, verifiedMobile, checkConsent } = options;

  if (!isRequiredValue(data.full_name)) {
    errors.full_name = "Full name is required";
  }

  if (!isRequiredValue(data.mobile)) {
    errors.mobile = "Mobile number is required";
  }

  const mobileRegex = /^[6-9]\d{9}$/;
  if (data.mobile && !mobileRegex.test(data.mobile)) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }

  if (requireMobileMatch && verifiedMobile && data.mobile !== verifiedMobile) {
    errors.mobile = "Mobile number must match your verified login number";
  }

  if (!isRequiredValue(data.email)) {
    errors.email = "Email is required";
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (checkConsent && !options.consentAccepted) {
    errors.consent = "You must read and accept the undertaking and declaration";
  }
}

export function validateDraft(data, authOptions) {
  const errors = {};
  validateCommonFields(data, errors, {
    requireMobileMatch: authOptions.requireMobileMatch,
    verifiedMobile: authOptions.verifiedMobile,
    checkConsent: false,
    consentAccepted: false,
  });
  return errors;
}

export function validateSubmit(data, files, consentAccepted, existingUrls, authOptions) {
  const errors = {};

  const requiredFields = [
    ["full_name", "Full name is required"],
    ["father_name", "Father's / Husband's name is required"],
    ["mother_name", "Mother's name is required"],
    ["address", "Address is required"],
    ["city", "City is required"],
    ["state", "State is required"],
    ["pin_code", "PIN code is required"],
    ["mobile", "Mobile number is required"],
    ["sex", "Please select sex"],
    ["nationality", "Nationality is required"],
    ["email", "Email is required"],
    ["dob", "Date of birth is required"],
    ["birth_place", "Birth place is required"],
    ["payment_mode", "Please select a payment mode"],
  ];

  requiredFields.forEach(([field, msg]) => {
    if (!isRequiredValue(data[field])) {
      errors[field] = msg;
    }
  });

  validateCommonFields(data, errors, {
    requireMobileMatch: authOptions.requireMobileMatch,
    verifiedMobile: authOptions.verifiedMobile,
    checkConsent: true,
    consentAccepted,
  });

  const mobileRegex = /^[6-9]\d{9}$/;
  if (data.father_mobile && !mobileRegex.test(data.father_mobile)) {
    errors.father_mobile = "Enter a valid 10-digit mobile number";
  }

  if (data.pin_code && !/^\d{6}$/.test(String(data.pin_code))) {
    errors.pin_code = "Enter a valid 6-digit PIN code";
  }

  if (data.state && !INDIAN_STATES.includes(data.state)) {
    errors.state = "Select a valid Indian state or union territory";
  }

  if (data.city && data.state && !isValidStateCity(data.state, data.city)) {
    errors.city = "Select a valid city for the chosen state";
  }

  if (data.dob) {
    const todayStr = new Date().toISOString().split("T")[0];
    const dobDate = new Date(`${data.dob}T00:00:00`);
    if (isNaN(dobDate.getTime()) || data.dob >= todayStr) {
      errors.dob = "Date of birth must be a past date (not today or future)";
    } else {
      const age = (Date.now() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 15) {
        errors.dob = "Date of birth seems incorrect";
      }
    }
  }

  ["physics_marks", "chemistry_marks", "biology_marks", "english_marks"].forEach((field) => {
    if (data[field] !== "" && data[field] !== undefined) {
      const n = Number(data[field]);
      if (isNaN(n) || n < 0 || n > 100) {
        errors[field] = "Enter marks between 0 and 100";
      }
    }
  });

  if (data.neet_score !== "" && data.neet_score !== undefined) {
    const n = Number(data.neet_score);
    if (isNaN(n) || n < 0 || n > 720) {
      errors.neet_score = "NEET score must be between 0 and 720";
    }
  }

  if (data.payment_mode === "Online" && !isRequiredValue(data.utr_number)) {
    errors.utr_number = "UTR number is required for online payments";
  }

  if (!files.payment_screenshot && !existingUrls.payment_screenshot) {
    errors.payment_screenshot = "Please attach your payment screenshot";
  }

  validateFile(files.payment_screenshot, "payment_screenshot", "Payment screenshot", errors);

  ADMISSION_DOCUMENTS.forEach((doc) => {
    const hasExisting = Boolean(existingUrls[doc.name]);
    if (doc.required && !files[doc.name] && !hasExisting) {
      errors[doc.name] = `Please attach your ${doc.label.toLowerCase()}`;
    }
    validateFile(files[doc.name], doc.name, doc.label, errors);
  });

  return errors;
}

/** @deprecated Use validateSubmit with authOptions */
export function validateForm(data, files, consentAccepted) {
  return validateSubmit(data, files, consentAccepted, {}, {
    requireMobileMatch: false,
    verifiedMobile: "",
  });
}
