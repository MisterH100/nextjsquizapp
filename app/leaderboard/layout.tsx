import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz me",
  description: "Quiz me leader board",
};

export default function LeaderboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full min-h-screen">{children}</main>;
}
