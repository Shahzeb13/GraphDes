import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rashid Khan — Graphic Designer | Attock, Pakistan",
  description:
    "Portfolio of Rashid Khan, a creative graphic designer based in Attock, Pakistan. Specializing in brand identity, visual design, and digital illustration.",
  keywords: "graphic designer, Rashid Khan, Attock, Pakistan, brand identity, logo design, visual design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
