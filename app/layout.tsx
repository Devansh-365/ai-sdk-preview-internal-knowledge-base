import { Navbar } from "@/components/navbar";
import { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  // metadataBase: new URL(
  //   "https://ai-sdk-preview-internal-knowledge-base.vercel.app",
  // ),
  title: "Dev Agent",
  description: "Dev Agent using Retrieval Augmented Generation and Middleware",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Toaster position="top-center" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
