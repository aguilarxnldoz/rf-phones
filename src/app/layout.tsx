import "@/styles/globals.css";

import { type Metadata } from "next";
import { Nunito_Sans, Rubik } from "next/font/google";

export const metadata: Metadata = {
  title: "RF Phones",
  description: "Get the best deals on premium smartphones",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${rubik.variable}`}>
      <body className="bg-dark-bg text-gray-100 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
