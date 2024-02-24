import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz me",
  description: "Login in with token",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full min-h-screen">{children}</main>;
}
