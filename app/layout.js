import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from '@/components/GoogleAnalytics.js';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Inventory Management",
  description: "Created by @Mohammed-Iqramul",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={inter.className}>{children}<SpeedInsights /></body>
      
    </html>
  );
}
