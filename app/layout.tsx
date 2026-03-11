import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trung & Bich - Wedding",
  description:
    "Wedding invitation for Trung & Bich - April 09, 2018 - Tĩnh Gia, Thanh Hóa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;600;700&family=Open+Sans:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
