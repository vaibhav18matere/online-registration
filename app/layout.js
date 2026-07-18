import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AppThemeProvider } from "../components/AppThemeProvider";

export const metadata = {
  title: "KRSU Online Registration Portal",
  description:
    "Online medical admissions portal for Kyrgyz Russian Slavic University (KRSU). Apply for MBBS, track your application, and manage documents.",
  icons: {
    icon: [{ url: "/krsu-logo.jpg", type: "image/jpeg" }],
    apple: [{ url: "/krsu-logo.jpg", type: "image/jpeg" }],
    shortcut: ["/krsu-logo.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,600;0,8..60,700;1,8..60,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppThemeProvider>
          <div className="min-h-screen min-h-dvh flex flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </AppThemeProvider>
      </body>
    </html>
  );
}
