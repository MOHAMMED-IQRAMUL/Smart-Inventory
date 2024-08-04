import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from '@/components/GoogleAnalytics.tsx';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Inventory Management",
  description: "Created by @Mohammed-Iqramul",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang='en'>
      
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }