import "./globals.css";
import AuthRedirect from "./utils/auth/redirect";

export const metadata = {
  title: "Sejiwa App | PLatform Konseling Digital",
  description: "Dengan pendekatan postmodern, SEJIWA menawarkan pengalaman konseling yang interaktif dan personal, berfokus pada mindfulness, refleksi diri, dan keseimbangan emosional"
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
