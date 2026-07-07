import { DEFAULT_NATIONALITY } from "./formOptions";
import { ADMISSION_DOCUMENTS } from "./documents";
import { mobileFromE164 } from "./phoneAuth";

export const initialFormState = {
  full_name: "",
  father_name: "",
  mother_name: "",
  address: "",
  city: "",
  pin_code: "",
  state: "",
  father_mobile: "",
  mobile: "",
  sex: "",
  nationality: DEFAULT_NATIONALITY,
  email: "",
  dob: "",
  birth_place: "",
  religion: "",
  caste: "",
  sub_caste: "",
  physics_marks: "",
  chemistry_marks: "",
  biology_marks: "",
  english_marks: "",
  neet_score: "",
  payment_mode: "",
  utr_number: "",
};

export function registrationToFormData(registration) {
  if (!registration) {
    return { ...initialFormState };
  }

  return {
    full_name: registration.full_name || "",
    father_name: registration.father_name || "",
    mother_name: registration.mother_name || "",
    address: registration.address || "",
    city: registration.city || "",
    pin_code: registration.pin_code || "",
    state: registration.state || "",
    father_mobile: registration.father_mobile || "",
    mobile: registration.mobile || "",
    sex: registration.sex || "",
    nationality: registration.nationality || DEFAULT_NATIONALITY,
    email: registration.email || "",
    dob: registration.dob || "",
    birth_place: registration.birth_place || "",
    religion: registration.religion || "",
    caste: registration.caste || "",
    sub_caste: registration.sub_caste || "",
    physics_marks: registration.physics_marks != null ? String(registration.physics_marks) : "",
    chemistry_marks: registration.chemistry_marks != null ? String(registration.chemistry_marks) : "",
    biology_marks: registration.biology_marks != null ? String(registration.biology_marks) : "",
    english_marks: registration.english_marks != null ? String(registration.english_marks) : "",
    neet_score: registration.neet_score != null ? String(registration.neet_score) : "",
    payment_mode: registration.payment_mode || "",
    utr_number: registration.utr_number || "",
  };
}

export function existingUrlsFromRegistration(registration) {
  if (!registration) {
    return {};
  }

  const urls = {
    payment_screenshot: registration.payment_screenshot_url || null,
  };

  ADMISSION_DOCUMENTS.forEach((doc) => {
    urls[doc.name] = registration[doc.dbColumn] || null;
  });

  return urls;
}

export function getVerifiedMobileFromSession(session) {
  if (!session?.user?.phone) {
    return "";
  }
  return mobileFromE164(session.user.phone);
}

export const REGISTRATION_STATUS_LABELS = {
  draft: "Draft — not yet submitted",
  submitted: "Submitted",
  under_review: "Under review",
  approved: "Approved",
  rejected: "Rejected",
};
