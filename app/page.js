"use client";

import { useState } from "react";
import { getSupabase } from "../lib/supabase";
import { validateForm } from "../lib/validation";

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
  nationality: "",
  email: "",
  dob: "",
  birth_place: "",
  religion: "",
  caste: "",
  sub_caste: "",
  course: "",
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
  const [files, setFiles] = useState({ payment_screenshot: null, photograph: null });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleFileChange(e) {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] || null }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const pcbTotal =
    (Number(formData.physics_marks) || 0) +
    (Number(formData.chemistry_marks) || 0) +
    (Number(formData.biology_marks) || 0) +
    (Number(formData.english_marks) || 0);

  async function uploadFile(file, folder) {
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await getSupabase().storage.from("uploads").upload(fileName, file);
    if (error) throw error;
    const { data } = getSupabase().storage.from("uploads").getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    const validationErrors = validateForm(formData, files);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields before submitting." });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      const paymentScreenshotUrl = await uploadFile(files.payment_screenshot, "screenshots");
      const photographUrl = files.photograph ? await uploadFile(files.photograph, "photos") : null;

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
          course: formData.course,
          physics_marks: formData.physics_marks ? Number(formData.physics_marks) : null,
          chemistry_marks: formData.chemistry_marks ? Number(formData.chemistry_marks) : null,
          biology_marks: formData.biology_marks ? Number(formData.biology_marks) : null,
          english_marks: formData.english_marks ? Number(formData.english_marks) : null,
          pcb_total: pcbTotal || null,
          neet_score: formData.neet_score ? Number(formData.neet_score) : null,
          payment_mode: formData.payment_mode,
          utr_number: formData.utr_number.trim() || null,
          payment_screenshot_url: paymentScreenshotUrl,
          photograph_url: photographUrl,
        },
      ]);

      if (error) throw error;

      setStatus({ type: "success", message: "Application submitted successfully. We'll be in touch shortly." });
      setFormData(initialState);
      setFiles({ payment_screenshot: null, photograph: null });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Something went wrong while submitting. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const err = (field) => errors[field] && <div className="error-text">{errors[field]}</div>;
  const cls = (field) => (errors[field] ? "error" : "");

  const formSections = [
    { id: "personal", label: "Personal", step: 1 },
    { id: "contact", label: "Contact", step: 2 },
    { id: "course", label: "Course", step: 3 },
    { id: "academic", label: "Academics", step: 4 },
    { id: "payment", label: "Payment", step: 5 },
  ];

  function sectionHeader(step, title, subtitle) {
    return (
      <div className="section-header">
        <span className="section-number">{step}</span>
        <div className="section-titles">
          <h2>{title}</h2>
          {subtitle && <p className="section-sub">{subtitle}</p>}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hero">
        <div className="hero-inner">
          <span className="hero-badge">Admissions Open</span>
          <h1>Student Registration Form</h1>
          <p className="hero-desc">
            Apply for Medical, Dental, and Post Graduate programmes. Please fill in all details
            carefully as per your official documents. Fields marked with * are mandatory.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-label">Programmes</span>
              <span className="hero-stat-value">Medical · Dental · PG</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">Examination</span>
              <span className="hero-stat-value">10+2 &amp; NEET</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">Processing</span>
              <span className="hero-stat-value">Online Application</span>
            </div>
          </div>
        </div>
      </div>

      <main className="page">
        {status && (
          <div className={`banner ${status.type}`} role="alert">
            {status.message}
          </div>
        )}

        <nav className="form-nav" aria-label="Form sections">
          {formSections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.step}. {section.label}
            </a>
          ))}
        </nav>

        <form id="registration-form" onSubmit={handleSubmit} noValidate>
          <section id="personal" className="section">
            {sectionHeader(1, "Personal Details", "As per your official documents")}
            <div className="section-body">
          <div className="grid">
            <div className="field full">
              <label>Full Name <span className="required">*</span></label>
              <input type="text" name="full_name" className={cls("full_name")} value={formData.full_name} onChange={handleChange} placeholder="First Middle Last" />
              {err("full_name")}
            </div>

            <div className="field">
              <label>Father's / Husband's Name <span className="required">*</span></label>
              <input type="text" name="father_name" className={cls("father_name")} value={formData.father_name} onChange={handleChange} />
              {err("father_name")}
            </div>

            <div className="field">
              <label>Mother's Name <span className="required">*</span></label>
              <input type="text" name="mother_name" className={cls("mother_name")} value={formData.mother_name} onChange={handleChange} />
              {err("mother_name")}
            </div>

            <div className="field">
              <label>Date of Birth <span className="required">*</span></label>
              <input type="date" name="dob" className={cls("dob")} value={formData.dob} onChange={handleChange} />
              {err("dob")}
            </div>

            <div className="field">
              <label>Birth Place <span className="required">*</span></label>
              <input type="text" name="birth_place" className={cls("birth_place")} value={formData.birth_place} onChange={handleChange} />
              {err("birth_place")}
            </div>

            <div className="field">
              <label>Sex <span className="required">*</span></label>
              <div className="radio-row">
                {["Male", "Female"].map((opt) => (
                  <label key={opt} className="radio-option">
                    <input type="radio" name="sex" value={opt} checked={formData.sex === opt} onChange={handleChange} />
                    {opt}
                  </label>
                ))}
              </div>
              {err("sex")}
            </div>

            <div className="field">
              <label>Nationality <span className="required">*</span></label>
              <input type="text" name="nationality" className={cls("nationality")} value={formData.nationality} onChange={handleChange} placeholder="e.g. Indian" />
              {err("nationality")}
            </div>

            <div className="field">
              <label>Religion</label>
              <input type="text" name="religion" value={formData.religion} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Caste</label>
              <input type="text" name="caste" value={formData.caste} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Sub Caste</label>
              <input type="text" name="sub_caste" value={formData.sub_caste} onChange={handleChange} />
            </div>
          </div>
            </div>
          </section>

          <section id="contact" className="section">
            {sectionHeader(2, "Contact Details", "Correspondence address and how we can reach you")}
            <div className="section-body">
          <div className="grid">
            <div className="field full">
              <label>Address <span className="required">*</span></label>
              <input type="text" name="address" className={cls("address")} value={formData.address} onChange={handleChange} />
              {err("address")}
            </div>

            <div className="field">
              <label>City <span className="required">*</span></label>
              <input type="text" name="city" className={cls("city")} value={formData.city} onChange={handleChange} />
              {err("city")}
            </div>

            <div className="field">
              <label>PIN Code <span className="required">*</span></label>
              <input type="text" name="pin_code" className={cls("pin_code")} value={formData.pin_code} onChange={handleChange} maxLength={6} inputMode="numeric" />
              {err("pin_code")}
            </div>

            <div className="field">
              <label>State <span className="required">*</span></label>
              <input type="text" name="state" className={cls("state")} value={formData.state} onChange={handleChange} />
              {err("state")}
            </div>

            <div className="field">
              <label>Mobile Number <span className="required">*</span></label>
              <input type="tel" name="mobile" className={cls("mobile")} value={formData.mobile} onChange={handleChange} maxLength={10} inputMode="numeric" placeholder="10-digit mobile number" />
              {err("mobile")}
            </div>

            <div className="field">
              <label>Father's Mobile</label>
              <input type="tel" name="father_mobile" className={cls("father_mobile")} value={formData.father_mobile} onChange={handleChange} maxLength={10} inputMode="numeric" />
              {err("father_mobile")}
            </div>

            <div className="field full">
              <label>Email <span className="required">*</span></label>
              <input type="email" name="email" className={cls("email")} value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              {err("email")}
            </div>
          </div>
            </div>
          </section>

          <section id="course" className="section">
            {sectionHeader(3, "Course Selection")}
            <div className="section-body">
          <div className="grid">
            <div className="field full">
              <label>Name of Course <span className="required">*</span></label>
              <select name="course" className={cls("course")} value={formData.course} onChange={handleChange}>
                <option value="">Select a course</option>
                <option value="Medical Faculty">Medical Faculty</option>
                <option value="Dental">Dental</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
              {err("course")}
            </div>
          </div>
            </div>
          </section>

          <section id="academic" className="section">
            {sectionHeader(4, "Qualifying Examination (10+2)", "Enter marks obtained out of 100 for each subject")}
            <div className="section-body">
          <div className="marks-table-wrap">
          <table className="marks-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Max Marks</th>
                <th>Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Physics", "physics_marks"],
                ["Chemistry", "chemistry_marks"],
                ["Biology", "biology_marks"],
                ["English", "english_marks"],
              ].map(([label, field]) => (
                <tr key={field}>
                  <td data-label="Subject">{label}</td>
                  <td data-label="Max Marks">100</td>
                  <td data-label="Marks Obtained">
                    <input
                      type="number"
                      name={field}
                      className={cls(field)}
                      value={formData[field]}
                      onChange={handleChange}
                      min={0}
                      max={100}
                    />
                    {err(field)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="pcb-total">
            <span>PCB Grand Total</span>
            <span>{pcbTotal} / 400</span>
          </div>

          <div className="field neet-field">
            <label>NEET Score (out of 720)</label>
            <input type="number" name="neet_score" className={cls("neet_score")} value={formData.neet_score} onChange={handleChange} min={0} max={720} placeholder="Enter NEET score" />
            {err("neet_score")}
          </div>
            </div>
          </section>

          <section id="payment" className="section">
            {sectionHeader(5, "Payment Details", "Upload proof of payment to complete your application")}
            <div className="section-body">
          <div className="grid">
            <div className="field">
              <label>Payment Mode <span className="required">*</span></label>
              <div className="radio-row">
                {["Online", "Cash", "DD"].map((opt) => (
                  <label key={opt} className="radio-option">
                    <input type="radio" name="payment_mode" value={opt} checked={formData.payment_mode === opt} onChange={handleChange} />
                    {opt}
                  </label>
                ))}
              </div>
              {err("payment_mode")}
            </div>

            {formData.payment_mode === "Online" && (
              <div className="field">
                <label>Online UTR Number <span className="required">*</span></label>
                <input type="text" name="utr_number" className={cls("utr_number")} value={formData.utr_number} onChange={handleChange} />
                {err("utr_number")}
              </div>
            )}

            <div className="field full">
              <label>Payment Screenshot <span className="required">*</span></label>
              <label className={`file-drop ${files.payment_screenshot ? "has-file" : ""}`}>
                <input type="file" name="payment_screenshot" accept="image/*,application/pdf" onChange={handleFileChange} />
                {files.payment_screenshot ? (
                  <div className="filename">{files.payment_screenshot.name}</div>
                ) : (
                  <>
                    <div className="file-drop-icon" aria-hidden="true">📄</div>
                    <div className="file-drop-title">Click to upload payment screenshot</div>
                    <div className="hint">JPG, PNG, or PDF · up to 5MB</div>
                  </>
                )}
              </label>
              {err("payment_screenshot")}
            </div>

            <div className="field full">
              <label>Passport Size Photograph</label>
              <label className={`file-drop ${files.photograph ? "has-file" : ""}`}>
                <input type="file" name="photograph" accept="image/*" onChange={handleFileChange} />
                {files.photograph ? (
                  <div className="filename">{files.photograph.name}</div>
                ) : (
                  <>
                    <div className="file-drop-icon" aria-hidden="true">🖼</div>
                    <div className="file-drop-title">Click to upload photograph</div>
                    <div className="hint">JPG or PNG · up to 5MB</div>
                  </>
                )}
              </label>
              {err("photograph")}
            </div>
          </div>
            </div>
          </section>

          <div className="submit-row">
            <button type="submit" className="primary" disabled={submitting}>
              {submitting && <span className="spinner" aria-hidden="true" />}
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}