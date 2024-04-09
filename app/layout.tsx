import { GeistSans } from "geist/font/sans";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";
import LoginLayout from "@/components/layouts/LoginLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import UserLayout from "@/components/layouts/UserLayout";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Restaurante",
  description: "The fastest way to build apps with Next.js and Supabase",
};




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const supabase = createClient();
  let Layout = LoginLayout;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    Layout = 'admin' === 'admin' ? AdminLayout : UserLayout;
  }

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
