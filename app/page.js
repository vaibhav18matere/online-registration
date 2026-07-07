"use client";

import { useState } from "react";
import { getSupabase } from "../lib/supabase";
import { validateForm } from "../lib/validation";
import { ADMISSION_DOCUMENTS, createInitialDocumentFiles } from "../lib/documents";
import { DeclarationModal } from "../components/DeclarationModal";
import { DEFAULT_NATIONALITY, getLatestAllowedBirthDate, RELIGIONS } from "../lib/formOptions";
import { getCitiesForState, INDIAN_STATES } from "../lib/indiaLocations";
import {
  bannerErrorClass,
  bannerSuccessClass,
  errorTextClass,
  fieldClass,
  fieldFullClass,
  fileDropClass,
  gridClass,
  inputClassName,
  labelClass,
  mergeClasses,
  primaryButtonClass,
  radioOptionClass,
  radioRowClass,
  sectionBodyClass,
  sectionClass,
  sectionHeaderClass,
  sectionNumberClass,
  sectionSubClass,
  sectionTitleClass,
  spinnerClass,
  marksTableBodyClass,
  marksTableClass,
  marksTableHeadCellClass,
  marksTableHeadClass,
  marksTableInputCellClass,
  marksTableSubjectCellClass,
  marksTableValueCellClass,
  marksTableWrapClass,
} from "../lib/uiClasses";

const initialDocumentFiles = createInitialDocumentFiles();

const initialState = {
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

export default function Home() {
  const [formData, setFormData] = useState(initialState);
  const [files, setFiles] = useState({
    payment_screenshot: null,
    ...initialDocumentFiles,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [declarationOpen, setDeclarationOpen] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, city: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (name === "state" && errors.city) {
      setErrors((prev) => ({ ...prev, city: undefined }));
    }
  }

  function handlePinCodeChange(e) {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({ ...prev, pin_code: digitsOnly }));
    if (errors.pin_code) setErrors((prev) => ({ ...prev, pin_code: undefined }));
  }

  function handleFileChange(e) {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] || null }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const pcbTotal =
    (Number(formData.physics_marks) || 0) +
    (Number(formData.chemistry_marks) || 0) +
    (Number(formData.biology_marks) || 0);

  async function uploadFile(file, folder) {
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await getSupabase().storage.from("uploads").upload(fileName, file);
    if (error) throw error;
    const { data } = getSupabase().storage.from("uploads").getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function uploadDocumentFiles(documentFiles) {
    const uploads = ADMISSION_DOCUMENTS.map(async (doc) => {
      const file = documentFiles[doc.name];
      if (!file) {
        return [doc.dbColumn, null];
      }
      const url = await uploadFile(file, doc.storageFolder);
      return [doc.dbColumn, url];
    });
    const results = await Promise.all(uploads);
    return Object.fromEntries(results);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    const validationErrors = validateForm(formData, files, consentAccepted);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields before submitting." });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      const documentFiles = {};
      ADMISSION_DOCUMENTS.forEach((doc) => {
        documentFiles[doc.name] = files[doc.name];
      });

      const [paymentScreenshotUrl, documentUrls] = await Promise.all([
        uploadFile(files.payment_screenshot, "screenshots"),
        uploadDocumentFiles(documentFiles),
      ]);

      const { error } = await getSupabase().from("registrations").insert([
        {
          full_name: formData.full_name.trim(),
          father_name: formData.father_name.trim(),
          mother_name: formData.mother_name.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          pin_code: formData.pin_code.trim(),
          state: formData.state.trim(),
          father_mobile: formData.father_mobile.trim() || null,
          mobile: formData.mobile.trim(),
          sex: formData.sex,
          nationality: formData.nationality.trim(),
          email: formData.email.trim().toLowerCase(),
          dob: formData.dob,
          birth_place: formData.birth_place.trim(),
          religion: formData.religion.trim() || null,
          caste: formData.caste.trim() || null,
          sub_caste: formData.sub_caste.trim() || null,
          physics_marks: formData.physics_marks ? Number(formData.physics_marks) : null,
          chemistry_marks: formData.chemistry_marks ? Number(formData.chemistry_marks) : null,
          biology_marks: formData.biology_marks ? Number(formData.biology_marks) : null,
          english_marks: formData.english_marks ? Number(formData.english_marks) : null,
          pcb_total: pcbTotal || null,
          neet_score: formData.neet_score ? Number(formData.neet_score) : null,
          payment_mode: formData.payment_mode,
          utr_number: formData.utr_number.trim() || null,
          payment_screenshot_url: paymentScreenshotUrl,
          ...documentUrls,
        },
      ]);

      if (error) throw error;

      setStatus({ type: "success", message: "Application submitted successfully. We'll be in touch shortly." });
      setFormData(initialState);
      setFiles({ payment_screenshot: null, ...initialDocumentFiles });
      setConsentAccepted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Something went wrong while submitting. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  function renderFieldError(field) {
    if (!errors[field]) {
      return null;
    }
    return <div className={errorTextClass}>{errors[field]}</div>;
  }
  const latestAllowedBirthDate = getLatestAllowedBirthDate();
  const cityOptions = getCitiesForState(formData.state);

  const formSections = [
    { id: "personal", label: "Personal", step: 1 },
    { id: "contact", label: "Contact", step: 2 },
    { id: "academic", label: "Academics", step: 3 },
    { id: "payment", label: "Payment", step: 4 },
    { id: "documents", label: "Documents", step: 5 },
  ];

  function sectionHeader(step, title, subtitle) {
    return (
      <div className={sectionHeaderClass}>
        <span className={sectionNumberClass}>{step}</span>
        <div>
          <h2 className={sectionTitleClass}>{title}</h2>
          {subtitle && <p className={sectionSubClass}>{subtitle}</p>}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden bg-yellow-soft text-black -mx-4 sm:-mx-5 lg:-mx-6 mb-5 sm:mb-9 px-4 sm:px-5 lg:px-6 py-7 sm:py-9 lg:py-12 border-b-2 border-line">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(196,30,58,0.06)_0%,transparent_40%),radial-gradient(circle_at_5%_95%,rgba(240,208,96,0.4)_0%,transparent_45%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-[900px] mx-auto">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-red bg-white border-[1.5px] border-red px-3 py-1 rounded-full mb-3.5">
            Admissions Open
          </span>
          <h1 className="text-red text-[clamp(24px,6vw,38px)] mb-3">Student Registration Form</h1>
          <p className="text-black-soft text-[clamp(14px,3.5vw,15px)] max-w-[560px] m-0 mb-5 sm:mb-7 leading-relaxed">
            Please fill in all details carefully as per your official documents. Fields marked with
            * are mandatory.
          </p>
        </div>
      </div>

      <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 pb-[max(clamp(40px,8vw,64px),env(safe-area-inset-bottom,0px))]">
        {status && (
          <div
            className={status.type === "success" ? bannerSuccessClass : bannerErrorClass}
            role="alert"
          >
            {status.message}
          </div>
        )}

        <nav
          className="flex flex-nowrap gap-2 mb-5 sm:mb-7 p-3 bg-white border-[1.5px] border-line rounded-xl shadow-sm overflow-x-auto snap-x snap-proximity [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
          aria-label="Form sections"
        >
          {formSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 text-[clamp(11px,2.8vw,12px)] font-semibold text-black px-3.5 py-2 rounded-full bg-yellow-bg border border-line snap-start transition-[background,border-color,color] hover:bg-red hover:border-red hover:text-white"
            >
              {section.step}. {section.label}
            </a>
          ))}
        </nav>

        <form id="registration-form" onSubmit={handleSubmit} noValidate>
          <section id="personal" className={sectionClass}>
            {sectionHeader(1, "Personal Details", "As per your official documents")}
            <div className={sectionBodyClass}>
          <div className={gridClass}>
            <div className={mergeClasses(fieldClass, fieldFullClass)}>
              <label className={labelClass}>Full Name <span className="text-red ml-0.5">*</span></label>
              <input type="text" name="full_name" className={inputClassName("full_name", errors)} value={formData.full_name} onChange={handleChange} placeholder="First Middle Last" />
              {renderFieldError("full_name")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Father's / Husband's Name <span className="text-red ml-0.5">*</span></label>
              <input type="text" name="father_name" className={inputClassName("father_name", errors)} value={formData.father_name} onChange={handleChange} />
              {renderFieldError("father_name")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Mother's Name <span className="text-red ml-0.5">*</span></label>
              <input type="text" name="mother_name" className={inputClassName("mother_name", errors)} value={formData.mother_name} onChange={handleChange} />
              {renderFieldError("mother_name")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Date of Birth <span className="text-red ml-0.5">*</span></label>
              <input
                type="date"
                name="dob"
                className={inputClassName("dob", errors)}
                value={formData.dob}
                onChange={handleChange}
                max={latestAllowedBirthDate}
              />
              {renderFieldError("dob")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Birth Place <span className="text-red ml-0.5">*</span></label>
              <input type="text" name="birth_place" className={inputClassName("birth_place", errors)} value={formData.birth_place} onChange={handleChange} />
              {renderFieldError("birth_place")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Sex <span className="text-red ml-0.5">*</span></label>
              <div className={radioRowClass}>
                {["Male", "Female"].map((opt) => (
                  <label key={opt} className={radioOptionClass}>
                    <input type="radio" name="sex" value={opt} checked={formData.sex === opt} onChange={handleChange} />
                    {opt}
                  </label>
                ))}
              </div>
              {renderFieldError("sex")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Nationality <span className="text-red ml-0.5">*</span></label>
              <input
                type="text"
                name="nationality"
                className={inputClassName("nationality", errors)}
                value={formData.nationality}
                onChange={handleChange}
                readOnly
              />
              {renderFieldError("nationality")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Religion</label>
              <select name="religion" className={inputClassName("religion", errors)} value={formData.religion} onChange={handleChange}>
                <option value="">Select religion</option>
                {RELIGIONS.map((religion) => (
                  <option key={religion} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Caste</label>
              <input type="text" name="caste" className={inputClassName("caste", errors)} value={formData.caste} onChange={handleChange} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Sub Caste</label>
              <input type="text" name="sub_caste" className={inputClassName("sub_caste", errors)} value={formData.sub_caste} onChange={handleChange} />
            </div>
          </div>
            </div>
          </section>

          <section id="contact" className={sectionClass}>
            {sectionHeader(2, "Contact Details", "Correspondence address and how we can reach you")}
            <div className={sectionBodyClass}>
          <div className={gridClass}>
            <div className={fieldClass}>
              <label className={labelClass}>State <span className="text-red ml-0.5">*</span></label>
              <select name="state" className={inputClassName("state", errors)} value={formData.state} onChange={handleChange}>
                <option value="">Select state</option>
                {INDIAN_STATES.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
              {renderFieldError("state")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>City <span className="text-red ml-0.5">*</span></label>
              <select
                name="city"
                className={inputClassName("city", errors)}
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.state}
              >
                <option value="">{formData.state ? "Select city" : "Select state first"}</option>
                {cityOptions.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
              {renderFieldError("city")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>PIN Code <span className="text-red ml-0.5">*</span></label>
              <input
                type="number"
                name="pin_code"
                className={inputClassName("pin_code", errors)}
                value={formData.pin_code}
                onChange={handlePinCodeChange}
                min={100000}
                max={999999}
                inputMode="numeric"
                placeholder="6-digit PIN code"
              />
              {renderFieldError("pin_code")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Mobile Number <span className="text-red ml-0.5">*</span></label>
              <input type="tel" name="mobile" className={inputClassName("mobile", errors)} value={formData.mobile} onChange={handleChange} maxLength={10} inputMode="numeric" placeholder="10-digit mobile number" />
              {renderFieldError("mobile")}
            </div>

            <div className={fieldClass}>
              <label className={labelClass}>Father's Mobile</label>
              <input type="tel" name="father_mobile" className={inputClassName("father_mobile", errors)} value={formData.father_mobile} onChange={handleChange} maxLength={10} inputMode="numeric" />
              {renderFieldError("father_mobile")}
            </div>

            <div className={mergeClasses(fieldClass, fieldFullClass)}>
              <label className={labelClass}>Email <span className="text-red ml-0.5">*</span></label>
              <input type="email" name="email" className={inputClassName("email", errors)} value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              {renderFieldError("email")}
            </div>

            <div className={mergeClasses(fieldClass, fieldFullClass)}>
              <label className={labelClass}>Address <span className="text-red ml-0.5">*</span></label>
              <input type="text" name="address" className={inputClassName("address", errors)} value={formData.address} onChange={handleChange} />
              {renderFieldError("address")}
            </div>
          </div>
            </div>
          </section>

          <section id="academic" className={sectionClass}>
            {sectionHeader(3, "Qualifying Examination (10+2)", "Enter marks obtained out of 100 for each subject")}
            <div className={sectionBodyClass}>
          <div className={marksTableWrapClass}>
          <table className={marksTableClass}>
            <thead className={marksTableHeadClass}>
              <tr>
                <th className={marksTableHeadCellClass}>Subject</th>
                <th className={marksTableHeadCellClass}>Max Marks</th>
                <th className={marksTableHeadCellClass}>Marks Obtained</th>
              </tr>
            </thead>
            <tbody className={marksTableBodyClass}>
              {[
                ["Physics", "physics_marks"],
                ["Chemistry", "chemistry_marks"],
                ["Biology", "biology_marks"],
                ["English", "english_marks"],
              ].map(([label, field]) => (
                <tr key={field}>
                  <td className={marksTableSubjectCellClass}>{label}</td>
                  <td className={marksTableValueCellClass} data-label="Max Marks">100</td>
                  <td className={marksTableInputCellClass} data-label="Marks Obtained">
                    <input
                      type="number"
                      name={field}
                      className={inputClassName(field, errors)}
                      value={formData[field]}
                      onChange={handleChange}
                      min={0}
                      max={100}
                    />
                    {renderFieldError(field)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 bg-red text-white px-4 py-3.5 rounded-lg font-semibold text-[clamp(13px,3.5vw,14px)] mt-1">
            <span>PCB Grand Total</span>
            <span className="font-serif text-[clamp(16px,4vw,18px)] text-yellow-soft">{pcbTotal} / 300</span>
          </div>

          <div className={mergeClasses(fieldClass, "mt-5 w-full sm:max-w-[280px]")}>
            <label className={labelClass}>NEET Score (out of 720)</label>
            <input type="number" name="neet_score" className={inputClassName("neet_score", errors)} value={formData.neet_score} onChange={handleChange} min={0} max={720} placeholder="Enter NEET score" />
            {renderFieldError("neet_score")}
          </div>
            </div>
          </section>

          <section id="payment" className={sectionClass}>
            {sectionHeader(4, "Payment Details", "Upload proof of payment to complete your application")}
            <div className={sectionBodyClass}>
          <div className={gridClass}>
            <div className={fieldClass}>
              <label className={labelClass}>Payment Mode <span className="text-red ml-0.5">*</span></label>
              <div className={radioRowClass}>
                {["Online", "Cash", "DD"].map((opt) => (
                  <label key={opt} className={radioOptionClass}>
                    <input type="radio" name="payment_mode" value={opt} checked={formData.payment_mode === opt} onChange={handleChange} />
                    {opt}
                  </label>
                ))}
              </div>
              {renderFieldError("payment_mode")}
            </div>

            {formData.payment_mode === "Online" && (
              <div className={fieldClass}>
                <label className={labelClass}>Online UTR Number <span className="text-red ml-0.5">*</span></label>
                <input type="text" name="utr_number" className={inputClassName("utr_number", errors)} value={formData.utr_number} onChange={handleChange} />
                {renderFieldError("utr_number")}
              </div>
            )}

            <div className={mergeClasses(fieldClass, fieldFullClass)}>
              <label className={labelClass}>Payment Screenshot <span className="text-red ml-0.5">*</span></label>
              <label className={fileDropClass(Boolean(files.payment_screenshot))}>
                <input type="file" name="payment_screenshot" accept="image/*,application/pdf" onChange={handleFileChange} className="hidden" />
                {files.payment_screenshot ? (
                  <div className="text-sm text-success font-semibold break-words">{files.payment_screenshot.name}</div>
                ) : (
                  <>
                    <div className="text-[clamp(24px,6vw,28px)] mb-2 opacity-70" aria-hidden="true">📄</div>
                    <div className="text-sm font-semibold text-black">Click to upload payment screenshot</div>
                    <div className="text-xs text-text-muted mt-1.5">JPG, PNG, or PDF · up to 5MB</div>
                  </>
                )}
              </label>
              {renderFieldError("payment_screenshot")}
            </div>
          </div>
            </div>
          </section>

          <section id="documents" className={sectionClass}>
            {sectionHeader(5, "Upload Documents", "Documents for admission — fields marked with * are mandatory")}
            <div className={sectionBodyClass}>
          <div className={gridClass}>
            {ADMISSION_DOCUMENTS.map((doc) => (
              <div key={doc.name} className={mergeClasses(fieldClass, fieldFullClass)}>
                <label className={labelClass}>
                  {doc.label}
                  {doc.required ? (
                    <span className="text-red ml-0.5"> *</span>
                  ) : (
                    <span className="text-text-muted font-normal text-[0.92em]"> ({doc.optionalHint})</span>
                  )}
                </label>
                <label className={fileDropClass(Boolean(files[doc.name]))}>
                  <input
                    type="file"
                    name={doc.name}
                    accept={doc.accept}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {files[doc.name] ? (
                    <div className="text-sm text-success font-semibold break-words">{files[doc.name].name}</div>
                  ) : (
                    <>
                      <div className="text-[clamp(24px,6vw,28px)] mb-2 opacity-70" aria-hidden="true">📄</div>
                      <div className="text-sm font-semibold text-black">Click to upload {doc.label.toLowerCase()}</div>
                      <div className="text-xs text-text-muted mt-1.5">{doc.hint}</div>
                    </>
                  )}
                </label>
                {renderFieldError(doc.name)}
              </div>
            ))}
          </div>
            </div>
          </section>

          <div
            className={mergeClasses(
              "mt-2 p-4 sm:p-5 bg-white border-[1.5px] border-line rounded-xl shadow-sm",
              errors.consent && "border-error bg-error-bg"
            )}
          >
            <label className="flex items-start gap-3 mb-0 text-[clamp(13px,3.5vw,14px)] font-medium leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={consentAccepted}
                className="w-[18px] h-[18px] min-h-[18px] mt-0.5 shrink-0 accent-red cursor-pointer"
                onChange={(event) => {
                  setConsentAccepted(event.target.checked);
                  if (errors.consent) {
                    setErrors((prev) => ({ ...prev, consent: undefined }));
                  }
                }}
              />
              <span>
                I have read the{" "}
                <button
                  type="button"
                  className="inline p-0 border-0 bg-transparent text-red font-semibold underline underline-offset-2 cursor-pointer font-[inherit] hover:text-red-dark"
                  onClick={() => setDeclarationOpen(true)}
                >
                  Undertaking and Declaration
                </button>{" "}
                and agree to the terms and conditions. <span className="text-red ml-0.5">*</span>
              </span>
            </label>
            {renderFieldError("consent")}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mt-2 p-4 sm:p-6 bg-white border-[1.5px] border-line rounded-xl shadow-sm">
            {!consentAccepted && (
              <p className="m-0 p-3 rounded-lg bg-yellow-bg border border-yellow-border text-black text-[clamp(13px,3.5vw,14px)] leading-normal md:flex-1" role="status">
                Please read and accept the Undertaking and Declaration before submitting the application.
              </p>
            )}
            <button
              type="submit"
              className={primaryButtonClass}
              disabled={submitting || !consentAccepted}
              aria-disabled={submitting || !consentAccepted}
            >
              {submitting && <span className={spinnerClass} aria-hidden="true" />}
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </main>

      <DeclarationModal
        isOpen={declarationOpen}
        onClose={() => setDeclarationOpen(false)}
      />
    </>
  );
}