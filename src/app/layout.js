import "./globals.css";
import AuthRedirect from "./utils/auth/redirect";

export const metadata = {
  title: "Welcome to Sejiwa",
  description: "Platform Konseling Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthRedirect/>
        {children}
      </body>
    </html>
  );
}
