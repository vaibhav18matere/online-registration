import { Suspense } from "react";
import LoginPage from "./LoginPage";

function LoginFallback() {
  return (
    <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 py-12">
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-text-muted text-sm">
        <div
          className="w-9 h-9 border-3 border-line border-t-red rounded-full animate-spin"
          aria-hidden="true"
        />
        <span>Loading login...</span>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginPage />
    </Suspense>
  );
}
