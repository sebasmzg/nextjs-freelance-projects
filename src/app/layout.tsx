import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "infrastructure/context/auth-provider";


export const metadata: Metadata = {
  title: "Next Freelance",
  description: "Freelance projects management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
      <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
