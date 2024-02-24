import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QuizContextProvider } from "@/lib/globalContext";
import { Header } from "@/components/Header";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "900"] });

export const metadata: Metadata = {
  title: "Quiz me",
  description:
    "Test your knowledge, acquire as much points to be the highest in the leader board",
  authors: [
    { name: "Handsome Nyathi", url: "https://thehandsomedev.com" },
    { name: "misterh100", url: "https://github.com/MisterH100" },
  ],
  keywords: ["Next.Js", "React", "Quiz", "game", "iq"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </title>
      </head>
      <QuizContextProvider>
        <body className={`${poppins.className} gradient_bg relative`}>
          <main className="min-h-screen">
            <Header />
            {children}
          </main>
        </body>
      </QuizContextProvider>
    </html>
  );
}
