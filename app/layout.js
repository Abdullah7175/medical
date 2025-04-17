import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
});

export const metadata = {
  title: 'Nutricare',
  description: 'A comprehensive medical dashboard for healthcare professionals',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={cairo.variable}>{/* No whitespace here */}
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}