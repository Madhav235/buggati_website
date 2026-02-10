import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for a clean, modern look. Or could use 'Cinzel' for luxury? Stick to Inter for UI.
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bugatti Chiron | 1500 HP Hypercar",
  description: "Experience the Bugatti Chiron. 8.0L W16, 1500 HP, 420+ km/h. The apex of automotive engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
