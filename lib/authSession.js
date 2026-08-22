export function getAuthProviderFromSession(session) {
  if (!session?.user) {
    return null;
  }

  const googleIdentity = session.user.identities?.find(
    (identity) => identity.provider === "google"
  );
  if (googleIdentity) {
    return "google";
  }

  if (session.user.phone) {
    return "phone";
  }

  return session.user.app_metadata?.provider || "email";
}

export function isAdminSession(session) {
  if (!session?.user) {
    return false;
  }

  const role = session.user.app_metadata?.role;
  if (role !== "admin") {
    return false;
  }

  return getAuthProviderFromSession(session) === "email";
}

export function isPhoneAuthSession(session) {
  return getAuthProviderFromSession(session) === "phone";
}

export function getGoogleEmailFromSession(session) {
  if (!session?.user?.email) {
    return "";
  }
  if (getAuthProviderFromSession(session) === "google") {
    return session.user.email;
  }
  return "";
}

export function getLoginDisplayFromSession(session, verifiedMobile) {
  if (verifiedMobile) {
    return `+91 ${verifiedMobile}`;
  }
  if (session?.user?.email) {
    return session.user.email;
  }
  return "your account";
}
