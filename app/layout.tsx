import  Header from "./componets/Header"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from './Provider'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinterest-clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        <Header/>
        {children}
        </Provider>
        </body>
    </html>
  );
}
