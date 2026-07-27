"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useStudentSession } from "../hooks/useStudentSession";
import { cardHoverClass, primaryButtonClass, secondaryButtonClass } from "../lib/uiClasses";

const APPLICATION_STEPS = [
  {
    step: "1",
    title: "Sign in",
    text: "Verify your identity securely with Google",
  },
  {
    step: "2",
    title: "Fill application",
    text: "Complete the form at your own pace, save drafts, and upload documents when ready.",
  },
  {
    step: "3",
    title: "Track & update",
    text: "Return to your dashboard anytime to check status or submit remaining documents.",
  },
];

const KEY_FEATURES = [
  "Low cost of living",
  "Experienced teaching faculty",
  "Cultural familiarity for Indian students",
  "Recognised by MCI and WHO",
];

const ADVANTAGES = [
  {
    title: "Dual government recognition",
    text: "Founded jointly by Kyrgyzstan and Russia, supporting strong academic standards and wider degree acceptance.",
  },
  {
    title: "European-standard medical training",
    text: "The curriculum aligns with international medical norms, helping graduates pursue further study or practice in Europe, Russia, India, and the USA.",
  },
  {
    title: "On-campus teaching hospital",
    text: "Students gain early clinical exposure and hands-on training at the university’s own hospital.",
  },
  {
    title: "Russian & Kyrgyz language support",
    text: "MBBS is taught in English, with Russian and Kyrgyz classes that help during local patient interaction.",
  },
  {
    title: "High student-to-teacher ratio",
    text: "Smaller batches allow closer guidance from professors and clearer understanding of core medical subjects.",
  },
  {
    title: "Research opportunities",
    text: "Active medical research programmes give students room to build scientific and practical insight.",
  },
  {
    title: "Multicultural campus",
    text: "Learners from India, Russia, Pakistan, Nepal, and other countries create a diverse academic community.",
  },
  {
    title: "Straightforward admission",
    text: "Entry focuses on basic eligibility criteria, without a complex additional entrance examination.",
  },
];

const RANKINGS = [
  { type: "QS World University Rankings", rank: "851–900" },
  { type: "Asian University Rankings", rank: "291–300" },
  { type: "Asian University Rankings – Central Asia", rank: "19" },
  { type: "Country Ranking in Kyrgyzstan", rank: "1" },
  { type: "World Ranking", rank: "4455" },
];

const CAREER_LOCAL = [
  {
    title: "Hospitals, clinics & research",
    text: "After licensing, graduates can work in hospitals, clinics, and research settings across Kyrgyzstan.",
  },
  {
    title: "Postgraduate studies (MD/MS)",
    text: "Specialise in areas such as surgery, cardiology, or pediatrics in Kyrgyzstan or overseas.",
  },
  {
    title: "Teaching and research",
    text: "Academically inclined graduates can move into university teaching or research roles.",
  },
  {
    title: "Hospital training & residency",
    text: "Internship and residency pathways in affiliated institutions provide structured clinical experience.",
  },
];

const CAREER_HOME = [
  {
    title: "Qualify for licensing exams",
    text: "Prepare for exams such as NEXT (India), USMLE (USA), PLAB (UK), or MCCQE (Canada).",
  },
  {
    title: "Government and private roles",
    text: "Join government or private hospitals, clinics, and pharmaceutical organisations at home.",
  },
  {
    title: "Further specialisation abroad",
    text: "Many graduates pursue postgraduate medicine in the USA, UK, Germany, Australia, and beyond.",
  },
  {
    title: "Open a private practice",
    text: "Once licensed, graduates may establish their own clinic in their home country.",
  },
];

const BENEFITS = [
  {
    title: "Affordable fees & living costs",
    text: "Studying MBBS in Kyrgyzstan is typically more economical than comparable options in the USA, UK, or many private colleges.",
  },
  {
    title: "Internationally accepted degree",
    text: "Universities here are recognised by bodies such as WHO, NMC, ECFMG, and FAIMER.",
  },
  {
    title: "No donation or extra entrance test",
    text: "Indian applicants are not asked for donations or additional entrance tests beyond NEET qualification.",
  },
  {
    title: "English-medium curriculum",
    text: "MBBS is delivered in English, so international students can focus on medicine without a language barrier in class.",
  },
  {
    title: "Modern learning facilities",
    text: "Students train with updated laboratories, qualified faculty, and hospitals equipped for clinical practice.",
  },
  {
    title: "Strong clinical exposure",
    text: "Partner hospitals help students connect theory with real patient care.",
  },
  {
    title: "Student-friendly environment",
    text: "The country is generally safe and welcoming, with a sizeable community of Indian and other international students.",
  },
  {
    title: "Simple admission & visa process",
    text: "Admission steps are clear, and visa processing is typically handled promptly for eligible candidates.",
  },
];

const sectionEyebrowClass =
  "inline-block text-[11px] font-bold tracking-widest uppercase text-red mb-3";

const sectionHeadingClass =
  "font-serif text-white text-[clamp(22px,4.5vw,32px)] mb-3 leading-tight";

const sectionLeadClass =
  "text-text-muted text-[15px] sm:text-base leading-relaxed m-0 max-w-[640px]";

const infoCardClass = `bg-yellow-soft border-[1.5px] border-line rounded-xl p-5 shadow-md ${cardHoverClass}`;

const sectionAnchorClass = "scroll-mt-[88px] md:scroll-mt-[84px]";

export default function HomePage() {
  const { isAuthenticated, checkingSession } = useStudentSession();
  const primaryHref = !checkingSession && isAuthenticated ? "/dashboard" : "/login";
  const primaryLabel = !checkingSession && isAuthenticated ? "Go to Dashboard" : "Login to Apply";

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden text-white -mx-4 sm:-mx-5 lg:-mx-6 mb-5 sm:mb-9 border-b border-line/50 min-h-[min(520px,85vh)] flex items-end sm:items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/banner.jpeg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#050d18]/95 via-[#0a1628]/82 to-[#0f2847]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#050d18]/90 via-[#0a1628]/25 to-[#0a1628]/40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(59,130,246,0.18)_0%,transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[900px] mx-auto px-4 sm:px-5 lg:px-6 py-12 sm:py-16 lg:py-20">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-white bg-red/25 border border-red/60 backdrop-blur-sm px-3 py-1 rounded-full mb-4 shadow-md">
            Admissions Open
          </span>
          <h1 className="text-white text-[clamp(28px,6vw,44px)] mb-4 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] max-w-[640px]">
            KRSU Medical Admissions
          </h1>
          <p className="text-white/85 text-[clamp(15px,3.5vw,17px)] max-w-[580px] m-0 mb-8 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            Apply online for MBBS admissions at Kyrgyz Russian Slavic University. Sign in, complete your registration and follow progress from your dashboard.
          </p>
          <div className="flex flex-col xs:flex-row gap-3">
            <Link href={primaryHref} className={`${primaryButtonClass} inline-flex no-underline justify-center shadow-lg`}>
              {primaryLabel}
            </Link>
            <Link
              href="/login?redirect=/application"
              className={`${secondaryButtonClass} inline-flex no-underline justify-center backdrop-blur-sm bg-yellow-soft/70`}
            >
              Start Application
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 pb-[max(clamp(40px,8vw,64px),env(safe-area-inset-bottom,0px))] space-y-10 sm:space-y-14">
        <section id="how-it-works" className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${sectionAnchorClass}`}>
          {APPLICATION_STEPS.map((item) => (
            <article key={item.step} className={infoCardClass}>
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-gradient-to-br from-red to-red-dark text-white text-sm font-bold mb-3 shadow-md">
                {item.step}
              </span>
              <h2 className="font-serif text-white text-lg mb-2">{item.title}</h2>
              <p className="text-sm text-text-muted m-0 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section id="about" className={sectionAnchorClass}>
          <span className={sectionEyebrowClass}>About the University</span>
          <h2 className={sectionHeadingClass}>Kyrgyz Russian Slavic University</h2>
          <p className={`${sectionLeadClass} mb-6`}>
            Kyrgyz Russian Slavic University is a public university in Bishkek, founded in 1993. It
            delivers Russian-standard programmes with international recognition across medicine,
            technical fields, and the humanities.
          </p>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            {KEY_FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 bg-yellow-soft/70 border border-line rounded-xl px-4 py-3.5"
              >
                <span
                  className="mt-0.5 shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-red to-red-dark shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
                  aria-hidden="true"
                />
                <p className="m-0 text-sm sm:text-[15px] font-medium text-white leading-snug">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="mbbs" className={`${infoCardClass} ${sectionAnchorClass}`}>
          <span className={sectionEyebrowClass}>MBBS at KRSU</span>
          <h2 className={`${sectionHeadingClass} text-[clamp(20px,4vw,28px)]`}>
            A competitive medical programme for international students
          </h2>
          <div className="space-y-4 text-sm sm:text-[15px] text-text-muted leading-relaxed">
            <p className="m-0">
              MBBS at Kyrgyz Russian Slavic University (KRSU) is a solid option for students who want
              rigorous medical training abroad. As one of Kyrgyzstan’s well-known medical universities,
              KRSU focuses on strong teaching and practical clinical preparation.
            </p>
            <p className="m-0">
              Established in 1993 through a Russian–Kyrgyz partnership and based in Bishkek, the
              university combines modern medical instruction, practice-led learning, and research
              involvement.
            </p>
            <p className="m-0">
              KRSU is listed with WHO, NMC (National Medical Commission), FAIMER, and ECFMG, which
              supports pathways to practise medicine internationally. Affordable tuition, an
              English-medium MBBS course, and up-to-date medical facilities make it a practical
              choice for aspiring doctors.
            </p>
          </div>
        </section>

        <section id="advantages" className={sectionAnchorClass}>
          <span className={sectionEyebrowClass}>Why KRSU</span>
          <h2 className={sectionHeadingClass}>Advantages of MBBS at KRSU</h2>
          <p className={`${sectionLeadClass} mb-6`}>
            Studying medicine at KRSU offers internationally oriented degrees, useful campus
            facilities, and clear next steps after graduation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {ADVANTAGES.map((item) => (
              <article key={item.title} className={infoCardClass}>
                <h3 className="font-serif text-white text-base sm:text-lg mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted m-0 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="rankings" className={sectionAnchorClass}>
          <span className={sectionEyebrowClass}>Rankings 2026</span>
          <h2 className={sectionHeadingClass}>KRSU University Ranking</h2>
          <p className={`${sectionLeadClass} mb-6`}>
            A quick look at where Kyrgyz Russian Slavic University stands on selected global and
            regional ranking lists.
          </p>

          <div className="sm:overflow-x-auto sm:border-[1.5px] sm:border-line sm:rounded-xl sm:bg-yellow-soft/40">
            <table className="w-full border-collapse m-0">
              <thead className="hidden sm:table-header-group">
                <tr>
                  <th className="bg-yellow-muted text-white font-bold text-[11px] uppercase tracking-wide text-left px-4 py-3 border-b border-line">
                    Ranking Type
                  </th>
                  <th className="bg-yellow-muted text-white font-bold text-[11px] uppercase tracking-wide text-left px-4 py-3 border-b border-line w-[140px]">
                    Rank
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr]:block [&_tr]:bg-yellow-soft [&_tr]:border-[1.5px] [&_tr]:border-line [&_tr]:rounded-xl [&_tr]:mb-2.5 [&_tr:last-child]:mb-0 sm:[&_tr]:table-row sm:[&_tr]:bg-transparent sm:[&_tr]:border-0 sm:[&_tr]:rounded-none sm:[&_tr]:mb-0 sm:hover:[&_tr]:bg-yellow-soft/50">
                {RANKINGS.map((row) => (
                  <tr key={row.type}>
                    <td className="block px-3.5 py-3 bg-yellow-muted/40 text-[15px] font-semibold text-white sm:table-cell sm:px-4 sm:py-3.5 sm:bg-transparent sm:text-sm sm:font-medium sm:border-b sm:border-line">
                      <span className="sm:hidden text-[11px] uppercase tracking-wide text-red font-bold block mb-1">
                        Ranking Type
                      </span>
                      {row.type}
                    </td>
                    <td className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-white sm:table-cell sm:px-4 sm:py-3.5 sm:border-b sm:border-line">
                      <span className="sm:hidden text-[11px] uppercase tracking-wide text-red font-bold">
                        Rank
                      </span>
                      <span className="font-semibold text-red sm:text-white">{row.rank}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="careers" className={sectionAnchorClass}>
          <span className={sectionEyebrowClass}>After Graduation</span>
          <h2 className={sectionHeadingClass}>Career Prospects After MBBS</h2>
          <p className={`${sectionLeadClass} mb-6`}>
            An MBBS earned in Kyrgyzstan can open international study and practice routes once the
            relevant licensing exams are cleared.
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="font-serif text-white text-lg sm:text-xl mb-3">
                Opportunities in Kyrgyzstan
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {CAREER_LOCAL.map((item) => (
                  <article key={item.title} className={infoCardClass}>
                    <h4 className="font-serif text-white text-base mb-2 leading-snug">{item.title}</h4>
                    <p className="text-sm text-text-muted m-0 leading-relaxed">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-white text-lg sm:text-xl mb-3">
                Returning to your home country
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {CAREER_HOME.map((item) => (
                  <article key={item.title} className={infoCardClass}>
                    <h4 className="font-serif text-white text-base mb-2 leading-snug">{item.title}</h4>
                    <p className="text-sm text-text-muted m-0 leading-relaxed">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className={sectionAnchorClass}>
          <span className={sectionEyebrowClass}>Why Kyrgyzstan</span>
          <h2 className={sectionHeadingClass}>Benefits of Studying MBBS in Kyrgyzstan</h2>
          <p className={`${sectionLeadClass} mb-6`}>
            Kyrgyzstan attracts international medical students for its lower costs, recognised
            degrees, and approachable admission process.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {BENEFITS.map((item) => (
              <article key={item.title} className={infoCardClass}>
                <h3 className="font-serif text-white text-base sm:text-lg mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted m-0 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="counseling"
          className={`relative overflow-hidden rounded-xl border-[1.5px] border-line bg-gradient-to-br from-yellow-soft via-yellow-muted/40 to-yellow-soft p-6 sm:p-8 shadow-md ${sectionAnchorClass}`}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.2)_0%,transparent_45%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <span className={sectionEyebrowClass}>Get Free Counseling</span>
            <h2 className={`${sectionHeadingClass} text-[clamp(20px,4vw,28px)]`}>
              Ready to start your MBBS journey at KRSU?
            </h2>
            <p className={`${sectionLeadClass} mb-6`}>
              Sign in to begin your application, or open the registration form and manage everything
              from your personal dashboard.
            </p>
            <div className="flex flex-col xs:flex-row gap-3">
              <Link href={primaryHref} className={`${primaryButtonClass} inline-flex no-underline justify-center`}>
                {primaryLabel}
              </Link>
              <Link
                href="/login?redirect=/application"
                className={`${secondaryButtonClass} inline-flex no-underline justify-center`}
              >
                Start Application
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
