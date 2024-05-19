import type { Metadata } from "next";
import { Nunito } from 'next/font/google';
import "./globals.css";

const nunito = Nunito({ weight: ["700", "400"], subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Login",
  description: "Faça seu login",
  icons: {
    icon: '../../public/assets/B2BitLogo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
