import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bugatti Chiron | The Pinnacle of Hypercar Engineering",
  description: "Experience the Bugatti Chiron. 1500 HP Quad-Turbo W16 Engineering Masterpiece.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(orbitron.variable, rajdhani.variable, "antialiased bg-black text-white")}>
        {children}
      </body>
    </html>
  );
}
