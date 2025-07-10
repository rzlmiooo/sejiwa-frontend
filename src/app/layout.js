import "./globals.css";
import AuthRedirect from "./utils/auth/redirect";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Welcome to Sejiwa",
  description: "Platform Konseling Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SpeedInsights/>
        <AuthRedirect/>
        {children}
      </body>
    </html>
  );
}
