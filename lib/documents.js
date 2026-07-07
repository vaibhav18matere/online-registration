export const ADMISSION_DOCUMENTS = [
  {
    name: "photograph",
    dbColumn: "photograph_url",
    label: "Color Passport Size Photo",
    required: true,
    accept: "image/*",
    storageFolder: "photos",
    hint: "JPG or PNG · up to 5MB",
  },
  {
    name: "marksheet_10th",
    dbColumn: "marksheet_10th_url",
    label: "10th Marksheet",
    required: true,
    accept: "image/*,application/pdf",
    storageFolder: "documents",
    hint: "JPG, PNG, or PDF · up to 5MB",
  },
  {
    name: "marksheet_12th",
    dbColumn: "marksheet_12th_url",
    label: "12th Marksheet",
    required: true,
    accept: "image/*,application/pdf",
    storageFolder: "documents",
    hint: "JPG, PNG, or PDF · up to 5MB",
  },
  {
    name: "aadhar_card",
    dbColumn: "aadhar_card_url",
    label: "Aadhar Card",
    required: true,
    accept: "image/*,application/pdf",
    storageFolder: "documents",
    hint: "JPG, PNG, or PDF · up to 5MB",
  },
  {
    name: "neet_marksheet",
    dbColumn: "neet_marksheet_url",
    label: "NEET Marksheet",
    optionalHint: "if available",
    required: false,
    accept: "image/*,application/pdf",
    storageFolder: "documents",
    hint: "JPG, PNG, or PDF · up to 5MB",
  },
  {
    name: "pan_card",
    dbColumn: "pan_card_url",
    label: "PAN Card",
    optionalHint: "if available",
    required: false,
    accept: "image/*,application/pdf",
    storageFolder: "documents",
    hint: "JPG, PNG, or PDF · up to 5MB",
  },
  {
    name: "passport_first_page",
    dbColumn: "passport_first_page_url",
    label: "Passport 1st Page",
    optionalHint: "if available",
    required: false,
    accept: "image/*,application/pdf",
    storageFolder: "documents",
    hint: "JPG, PNG, or PDF · up to 5MB",
  },
  {
    name: "passport_last_page",
    dbColumn: "passport_last_page_url",
    label: "Passport Last Page",
    optionalHint: "if available",
    required: false,
    accept: "image/*,application/pdf",
    storageFolder: "documents",
    hint: "JPG, PNG, or PDF · up to 5MB",
  },
];

export function createInitialDocumentFiles() {
  const files = {};
  ADMISSION_DOCUMENTS.forEach((doc) => {
    files[doc.name] = null;
  });
  return files;
}
