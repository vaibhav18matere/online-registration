"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabase } from "../../lib/supabase";
import {
  isValidIndianMobile,
  normalizeMobileInput,
  sendPhoneOtp,
  verifyPhoneOtp,
} from "../../lib/phoneAuth";
import { signInWithGoogle } from "../../lib/googleAuth";
import {
  bannerErrorClass,
  errorTextClass,
  fieldClass,
  inputBase,
  labelClass,
  mergeClasses,
  primaryButtonClass,
  secondaryButtonClass,
  spinnerClass,
} from "../../lib/uiClasses";

const AUTH_ERROR_MESSAGES = {
  missing_auth_code: "Sign-in was cancelled or interrupted. Please try again.",
  auth_callback_failed: "Google sign-in failed. Please try again.",
  supabase_not_configured: "Supabase is not configured. Contact the administrator.",
};

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";
  const authErrorCode = searchParams.get("error");

  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (authErrorCode && AUTH_ERROR_MESSAGES[authErrorCode]) {
      setError(AUTH_ERROR_MESSAGES[authErrorCode]);
    }
  }, [authErrorCode]);

  function handleMobileChange(event) {
    setMobile(normalizeMobileInput(event.target.value));
    if (error) {
      setError(null);
    }
  }

  function handleOtpChange(event) {
    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
    if (error) {
      setError(null);
    }
  }

  async function handleSendOtp(event) {
    event.preventDefault();
    setError(null);

    if (!isValidIndianMobile(mobile)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setSending(true);
    try {
      await sendPhoneOtp(getSupabase(), mobile);
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP. Try again.");
    } finally {
      setSending(false);
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault();
    setError(null);

    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP sent to your phone.");
      return;
    }

    setVerifying(true);
    try {
      await verifyPhoneOtp(getSupabase(), mobile, otp);
      router.replace(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle(getSupabase(), redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 py-8 sm:py-12 pb-[max(48px,env(safe-area-inset-bottom,0px))]">
      <div className="max-w-[420px] mx-auto p-7 sm:p-10 bg-yellow-soft border-[1.5px] border-line rounded-xl shadow-lg">
        <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-red mb-3">
          Student Login
        </span>
        <h1 className="text-white text-[clamp(22px,5vw,28px)] mb-8">Sign in to continue</h1>
        {/* <p className="text-text-muted text-sm m-0 mb-7 leading-relaxed">
          Verify with OTP on your mobile, or sign in with Google.
        </p> */}

        <button
          type="button"
          className={mergeClasses(
            secondaryButtonClass,
            "w-full! gap-3 border-line hover:border-line hover:bg-white hover:text-black"
          )}
          onClick={handleGoogleSignIn}
          disabled={googleLoading || sending || verifying}
        >
          {googleLoading ? (
            <span className="w-5 h-5 border-2 border-line border-t-red rounded-full animate-spin" aria-hidden="true" />
          ) : (
            <GoogleIcon />
          )}
          {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
        </button>

        {/* <div className="flex items-center gap-3 my-6">
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">or</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div> */}

        {error && (
          <div className={`${bannerErrorClass} mb-5`} role="alert">
            {error}
          </div>
        )}

        {/* {step === "mobile" ? (
          <form onSubmit={handleSendOtp}>
            <div className={fieldClass}>
              <label htmlFor="login-mobile" className={labelClass}>
                Mobile number (OTP)
              </label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3.5 min-h-11 border-[1.5px] border-line rounded-lg bg-yellow-soft text-sm font-semibold shrink-0">
                  +91
                </span>
                <input
                  id="login-mobile"
                  type="tel"
                  inputMode="numeric"
                  className={inputBase}
                  value={mobile}
                  onChange={handleMobileChange}
                  placeholder="10-digit mobile"
                  maxLength={10}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className={`${primaryButtonClass} w-full! mt-4`}
              disabled={sending || googleLoading}
            >
              {sending && <span className={spinnerClass} aria-hidden="true" />}
              {sending ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <p className="text-sm text-black-soft m-0 mb-4">
              OTP sent to <strong>+91 {mobile}</strong>
            </p>
            <div className={fieldClass}>
              <label htmlFor="login-otp" className={labelClass}>
                Enter OTP
              </label>
              <input
                id="login-otp"
                type="text"
                inputMode="numeric"
                className={`${inputBase} tracking-[0.3em] text-center text-lg font-semibold`}
                value={otp}
                onChange={handleOtpChange}
                placeholder="6-digit code"
                maxLength={6}
                autoComplete="one-time-code"
                required
              />
              {otp.length > 0 && otp.length < 6 && (
                <p className={errorTextClass}>OTP must be 6 digits</p>
              )}
            </div>
            <button
              type="submit"
              className={`${primaryButtonClass} w-full! mt-4`}
              disabled={verifying || googleLoading}
            >
              {verifying && <span className={spinnerClass} aria-hidden="true" />}
              {verifying ? "Verifying..." : "Verify & Continue"}
            </button>
            <button
              type="button"
              className={`${secondaryButtonClass} w-full! mt-3`}
              onClick={() => {
                setStep("mobile");
                setOtp("");
                setError(null);
              }}
            >
              Change number
            </button>
          </form>
        )} */}
      </div>
    </main>
  );
}
