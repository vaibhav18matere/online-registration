const MOBILE_REGEX = /^[6-9]\d{9}$/;

export function normalizeMobileInput(value) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function isValidIndianMobile(mobile) {
  return MOBILE_REGEX.test(mobile);
}

export function toE164IndianMobile(mobile) {
  return `+91${mobile}`;
}

export function mobileFromE164(e164Phone) {
  if (!e164Phone) {
    return "";
  }
  return e164Phone.replace(/^\+91/, "");
}

export async function sendPhoneOtp(supabase, mobile) {
  const phone = toE164IndianMobile(mobile);
  const { error } = await supabase.auth.signInWithOtp({ phone });
  if (error) {
    throw error;
  }
}

export async function verifyPhoneOtp(supabase, mobile, token) {
  const phone = toE164IndianMobile(mobile);
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });
  if (error) {
    throw error;
  }
  return data;
}
