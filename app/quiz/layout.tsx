import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz me",
  description:
    "Test your knowledge, acquire as much points to be the highest in the leader board",
};

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full min-h-screen">{children}</main>;
}
