import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz me",
  description: "Player info and stats",
};

export default function StatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full min-h-screen">{children}</main>;
}
