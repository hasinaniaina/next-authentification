
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";


export const metadata: Metadata = {
  title: "Authentification Next-Auth",
  description: "Generated by Hasinaniaina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="holder">
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="content">
              {children}
            </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
