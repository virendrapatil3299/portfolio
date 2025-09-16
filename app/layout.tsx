import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./Navbar";
// import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A modern, animated portfolio built with Next.js + TypeScript"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col text-white">
        <Navbar />
        <main className="flex-1 container mx-auto px-6 pt-28 pb-6">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
