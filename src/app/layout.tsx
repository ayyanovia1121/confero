import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Confero - Seamless Video Conferencing",
  description:
    "Confero is a modern video conferencing app that enables seamless and high-quality communication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-dark-2 antialiased`}>
        {children}
      </body>
    </html>
  );
}
