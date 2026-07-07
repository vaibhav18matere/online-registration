import { ADMISSION_DOCUMENTS } from "./documents";
import { DEFAULT_COURSE } from "./formOptions";

export async function fetchMyRegistration(supabase, userId) {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function resolveRegistrationId(supabase, userId, registrationId) {
  if (registrationId) {
    return registrationId;
  }

  const existing = await fetchMyRegistration(supabase, userId);
  return existing?.id ?? null;
}

export async function linkRegistrationByEmail(supabase, email, userId) {
  const { data, error } = await supabase.rpc("link_registration_by_email", {
    p_email: email,
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function linkRegistrationByMobile(supabase, mobile, userId) {
  const { data, error } = await supabase.rpc("link_registration_by_mobile", {
    p_mobile: mobile,
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }

  return data;
}

export function computePcbTotal(formData) {
  return (
    (Number(formData.physics_marks) || 0) +
    (Number(formData.chemistry_marks) || 0) +
    (Number(formData.biology_marks) || 0)
  );
}

export async function uploadFile(supabase, file, folder, userId) {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("uploads").upload(fileName, file);
  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function uploadDocumentFiles(supabase, documentFiles, userId, existingUrls) {
  const uploads = ADMISSION_DOCUMENTS.map(async (doc) => {
    const file = documentFiles[doc.name];
    if (file) {
      const url = await uploadFile(supabase, file, doc.storageFolder, userId);
      return [doc.dbColumn, url];
    }
    if (existingUrls[doc.name]) {
      return [doc.dbColumn, existingUrls[doc.name]];
    }
    return [doc.dbColumn, null];
  });

  const results = await Promise.all(uploads);
  return Object.fromEntries(results);
}

export function buildRegistrationPayload(formData, pcbTotal, urls, userId, status) {
  const payload = {
    user_id: userId,
    course: DEFAULT_COURSE,
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
    payment_mode: formData.payment_mode || null,
    utr_number: formData.utr_number.trim() || null,
    status,
    ...urls,
  };

  if (status === "submitted") {
    payload.submitted_at = new Date().toISOString();
  }

  return payload;
}

export async function saveRegistrationDraft(
  supabase,
  formData,
  files,
  existingUrls,
  userId,
  registrationId
) {
  const pcbTotal = computePcbTotal(formData);

  let paymentScreenshotUrl = existingUrls.payment_screenshot || null;
  if (files.payment_screenshot) {
    paymentScreenshotUrl = await uploadFile(
      supabase,
      files.payment_screenshot,
      "screenshots",
      userId
    );
  }

  const documentUrls = await uploadDocumentFiles(supabase, files, userId, existingUrls);

  const payload = buildRegistrationPayload(
    formData,
    pcbTotal,
    {
      payment_screenshot_url: paymentScreenshotUrl,
      ...documentUrls,
    },
    userId,
    "draft"
  );

  const resolvedId = await resolveRegistrationId(supabase, userId, registrationId);

  if (resolvedId) {
    const { data, error } = await supabase
      .from("registrations")
      .update(payload)
      .eq("id", resolvedId)
      .eq("user_id", userId)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  const { data, error } = await supabase.from("registrations").insert([payload]).select().single();
  if (error) {
    throw error;
  }
  return data;
}

export async function submitRegistration(
  supabase,
  formData,
  files,
  existingUrls,
  userId,
  registrationId
) {
  const pcbTotal = computePcbTotal(formData);

  let paymentScreenshotUrl = existingUrls.payment_screenshot || null;
  if (files.payment_screenshot) {
    paymentScreenshotUrl = await uploadFile(
      supabase,
      files.payment_screenshot,
      "screenshots",
      userId
    );
  }

  const documentUrls = await uploadDocumentFiles(supabase, files, userId, existingUrls);

  const payload = buildRegistrationPayload(
    formData,
    pcbTotal,
    {
      payment_screenshot_url: paymentScreenshotUrl,
      ...documentUrls,
    },
    userId,
    "submitted"
  );

  const resolvedId = await resolveRegistrationId(supabase, userId, registrationId);

  if (resolvedId) {
    const { data, error } = await supabase
      .from("registrations")
      .update(payload)
      .eq("id", resolvedId)
      .eq("user_id", userId)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  const { data, error } = await supabase.from("registrations").insert([payload]).select().single();
  if (error) {
    throw error;
  }
  return data;
}

export function getMissingDocuments(registration) {
  if (!registration) {
    return ADMISSION_DOCUMENTS.filter((doc) => doc.required);
  }

  return ADMISSION_DOCUMENTS.filter((doc) => {
    if (!doc.required) {
      return false;
    }
    return !registration[doc.dbColumn];
  });
}

export function getDocumentCompletion(registration) {
  const uploaded = ADMISSION_DOCUMENTS.filter((doc) => registration?.[doc.dbColumn]).length;
  return {
    uploaded,
    total: ADMISSION_DOCUMENTS.length,
    requiredMissing: getMissingDocuments(registration).length,
  };
}
