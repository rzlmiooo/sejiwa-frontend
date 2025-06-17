import "./globals.css";

export const metadata = {
  title: "Welcome to Sejiwa",
  description: "Platform Konseling Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
