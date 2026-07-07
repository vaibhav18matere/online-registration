"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../lib/supabase";
import { validateDraft, validateSubmit } from "../lib/validation";
import { ADMISSION_DOCUMENTS, createInitialDocumentFiles } from "../lib/documents";
import { DeclarationModal } from "./DeclarationModal";
import { DEFAULT_NATIONALITY, getLatestAllowedBirthDate, RELIGIONS } from "../lib/formOptions";
import { getCitiesForState, INDIAN_STATES } from "../lib/indiaLocations";
import {
  existingUrlsFromRegistration,
  registrationToFormData,
} from "../lib/formState";
import { saveRegistrationDraft, submitRegistration } from "../lib/registrationService";
import { DocumentActions } from "./DocumentActions";
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
  secondaryButtonClass,
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

export function RegistrationForm({ registration, verifiedMobile, isPhoneLogin, googleEmail }) {
  const router = useRouter();
  const authOptions = {
    requireMobileMatch: isPhoneLogin,
    verifiedMobile: isPhoneLogin ? verifiedMobile : "",
  };

  const [formData, setFormData] = useState(() => {
    const data = registrationToFormData(registration);
    if (isPhoneLogin && verifiedMobile) {
      data.mobile = verifiedMobile;
    }
    if (googleEmail && !data.email) {
      data.email = googleEmail;
    }
    return data;
  });
  const [existingUrls, setExistingUrls] = useState(() =>
    existingUrlsFromRegistration(registration)
  );
  const [files, setFiles] = useState({
    payment_screenshot: null,
    ...initialDocumentFiles,
  });
  const [errors, setErrors] = useState({});
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [declarationOpen, setDeclarationOpen] = useState(false);
  const [registrationId, setRegistrationId] = useState(registration?.id ?? null);
  const [isSubmitted, setIsSubmitted] = useState(registration?.status === "submitted");

  useEffect(() => {
    if (registration?.id) {
      setRegistrationId(registration.id);
      setIsSubmitted(registration.status === "submitted");
    }
  }, [registration]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "mobile" && isPhoneLogin) {
      return;
    }
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

  async function handleSaveDraft(event) {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validateDraft(formData, authOptions);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields before saving." });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSavingDraft(true);
    try {
      const userId = (await getSupabase().auth.getUser()).data.user?.id;
      if (!userId) {
        throw new Error("You must be logged in to save your application.");
      }

      const saved = await saveRegistrationDraft(
        getSupabase(),
        formData,
        files,
        existingUrls,
        userId,
        registrationId
      );

      setRegistrationId(saved.id);
      setIsSubmitted(saved.status === "submitted");
      setExistingUrls(existingUrlsFromRegistration(saved));
      setFiles({ payment_screenshot: null, ...initialDocumentFiles });
      setStatus({ type: "success", message: "Draft saved. You can continue anytime from your dashboard." });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong while saving.",
      });
    } finally {
      setSavingDraft(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validateSubmit(
      formData,
      files,
      consentAccepted,
      existingUrls,
      authOptions
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields before submitting." });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      const userId = (await getSupabase().auth.getUser()).data.user?.id;
      if (!userId) {
        throw new Error("You must be logged in to submit your application.");
      }

      await submitRegistration(
        getSupabase(),
        formData,
        files,
        existingUrls,
        userId,
        registrationId
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong while submitting.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function renderFileContent(fileKey, emptyContent, fileLabel) {
    const newFile = files[fileKey];
    const existingUrl = existingUrls[fileKey];

    if (newFile) {
      return <div className="text-sm text-success font-semibold wrap-break-word">{newFile.name}</div>;
    }

    if (existingUrl) {
      return (
        <div className="space-y-2" onClick={(event) => event.stopPropagation()}>
          <div className="text-sm text-success font-semibold">Uploaded</div>
          <DocumentActions url={existingUrl} label={fileLabel} compact />
          <div className="text-xs text-text-muted">Click to replace file</div>
        </div>
      );
    }

    return emptyContent;
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
      {status && (
        <div
          className={status.type === "success" ? bannerSuccessClass : bannerErrorClass}
          role="alert"
        >
          {status.message}
        </div>
      )}

      <nav
          className="flex flex-nowrap gap-2 mb-5 sm:mb-7 p-3 bg-yellow-soft border-[1.5px] border-line rounded-xl shadow-md overflow-x-auto snap-x snap-proximity scrollbar-thin [-webkit-overflow-scrolling:touch]"
        aria-label="Form sections"
      >
          {formSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 text-[clamp(11px,2.8vw,12px)] font-semibold text-white px-3.5 py-2 rounded-full bg-yellow-bg border border-line snap-start transition-all duration-300 hover:bg-red hover:border-red hover:text-white hover:-translate-y-0.5"
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
              <input type="tel" name="mobile" className={inputClassName("mobile", errors)} value={formData.mobile} onChange={handleChange} maxLength={10} inputMode="numeric" placeholder="10-digit mobile number" readOnly={isPhoneLogin} />
              {isPhoneLogin ? (
                <p className="text-xs text-text-muted mt-1">Must match your verified login number (+91 {verifiedMobile})</p>
              ) : (
                <p className="text-xs text-text-muted mt-1">Enter the mobile number we should use to contact you.</p>
              )}
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
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 bg-gradient-to-r from-red to-red-dark text-white px-4 py-3.5 rounded-lg font-semibold text-[clamp(13px,3.5vw,14px)] mt-1 shadow-md">
            <span>PCB Grand Total</span>
            <span className="font-serif text-[clamp(16px,4vw,18px)] text-white/90">{pcbTotal} / 300</span>
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
              <label className={fileDropClass(Boolean(files.payment_screenshot || existingUrls.payment_screenshot))}>
                <input type="file" name="payment_screenshot" accept="image/*,application/pdf" onChange={handleFileChange} className="hidden" />
                {renderFileContent("payment_screenshot", (
                  <>
                    <div className="text-[clamp(24px,6vw,28px)] mb-2 opacity-70" aria-hidden="true">📄</div>
                    <div className="text-sm font-semibold text-white">Click to upload payment screenshot</div>
                    <div className="text-xs text-text-muted mt-1.5">JPG, PNG, or PDF · up to 5MB</div>
                  </>
                ), "Payment Screenshot")}
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
                <label className={fileDropClass(Boolean(files[doc.name] || existingUrls[doc.name]))}>
                  <input
                    type="file"
                    name={doc.name}
                    accept={doc.accept}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {renderFileContent(doc.name, (
                    <>
                      <div className="text-[clamp(24px,6vw,28px)] mb-2 opacity-70" aria-hidden="true">📄</div>
                      <div className="text-sm font-semibold text-white">Click to upload {doc.label.toLowerCase()}</div>
                      <div className="text-xs text-text-muted mt-1.5">{doc.hint}</div>
                    </>
                  ), doc.label)}
                </label>
                {renderFieldError(doc.name)}
              </div>
            ))}
          </div>
            </div>
          </section>

          <div
            className={mergeClasses(
              "mt-2 p-4 sm:p-5 bg-yellow-soft border-[1.5px] border-line rounded-xl shadow-md",
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

          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mt-2 p-4 sm:p-6 bg-yellow-soft border-[1.5px] border-line rounded-xl shadow-md">
            {!consentAccepted && (
              <p className="m-0 p-3 rounded-lg bg-yellow-bg border border-line text-white text-[clamp(13px,3.5vw,14px)] leading-normal md:flex-1" role="status">
                Please read and accept the Undertaking and Declaration before submitting the application.
              </p>
            )}
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={handleSaveDraft}
              disabled={savingDraft || submitting}
            >
              {savingDraft && <span className={spinnerClass} aria-hidden="true" />}
              {savingDraft ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="submit"
              className={primaryButtonClass}
              disabled={submitting || savingDraft || !consentAccepted}
              aria-disabled={submitting || savingDraft || !consentAccepted}
            >
              {submitting && <span className={spinnerClass} aria-hidden="true" />}
              {submitting ? "Submitting..." : isSubmitted ? "Update & Resubmit" : "Submit Application"}
            </button>
          </div>
        </form>

      <DeclarationModal
        isOpen={declarationOpen}
        onClose={() => setDeclarationOpen(false)}
      />
    </>
  );
}