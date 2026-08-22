"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";
import {
  getAuthProviderFromSession,
  getGoogleEmailFromSession,
  getLoginDisplayFromSession,
  isAdminSession,
  isPhoneAuthSession,
} from "../lib/authSession";
import { getVerifiedMobileFromSession } from "../lib/formState";
import { linkRegistrationByEmail, linkRegistrationByMobile } from "../lib/registrationService";

async function linkExistingRegistration(supabase, session) {
  if (!session?.user?.id) {
    return;
  }

  const mobile = getVerifiedMobileFromSession(session);
  if (mobile) {
    await linkRegistrationByMobile(supabase, mobile, session.user.id);
    return;
  }

  const googleEmail = getGoogleEmailFromSession(session);
  if (googleEmail) {
    await linkRegistrationByEmail(supabase, googleEmail, session.user.id);
  }
}

export function useStudentSession() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    let authSubscription = null;

    async function initAuth() {
      try {
        const supabase = getSupabase();
        const { data } = await supabase.auth.getSession();
        setSession(data.session);

        if (data.session) {
          await linkExistingRegistration(supabase, data.session);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
          setSession(newSession);
          if (newSession) {
            await linkExistingRegistration(supabase, newSession);
          }
        });
        authSubscription = authListener.subscription;
      } catch (error) {
        setInitError(error instanceof Error ? error.message : "Unable to connect to Supabase.");
      } finally {
        setCheckingSession(false);
      }
    }

    initAuth();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  async function signOut() {
    await getSupabase().auth.signOut();
  }

  const verifiedMobile = getVerifiedMobileFromSession(session);
  const authProvider = getAuthProviderFromSession(session);
  const isPhoneLogin = isPhoneAuthSession(session);
  const googleEmail = getGoogleEmailFromSession(session);
  const loginDisplay = getLoginDisplayFromSession(session, verifiedMobile);

  return {
    session,
    user: session?.user ?? null,
    verifiedMobile,
    authProvider,
    isPhoneLogin,
    googleEmail,
    loginDisplay,
    checkingSession,
    initError,
    isAuthenticated: Boolean(session),
    isAdmin: isAdminSession(session),
    signOut,
  };
}
