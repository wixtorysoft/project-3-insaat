import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import DynamicNavbar from "@/components/DynamicNavbar";
import Footer from "@/components/sections/Footer";
import CookieBanner from "@/components/CookieBanner";
import DynamicPreloader from "@/components/DynamicPreloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wixtory İnşaat | Geleceği İnşa Ediyoruz",
  description:
    "25 yılı aşkın tecrübemizle, Türkiye'nin en prestijli yapılarını hayata geçiriyoruz. Konut, ticari ve endüstriyel inşaat projeleri.",
  keywords: [
    "inşaat",
    "yapı",
    "konut",
    "ticari bina",
    "mimari",
    "İstanbul",
    "Wixtory",
    "inşaat şirketi",
    "Wixtory İnşaat",
  ],
  authors: [{ name: "Wixtory İnşaat - Hacı Celal Aygar" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Wixtory İnşaat | Geleceği İnşa Ediyoruz",
    description:
      "25 yılı aşkın tecrübemizle, kalitesi ve güvenilirliğiyle tanınan öncü bir inşaat kuruluşu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <DynamicPreloader />
          <div className="min-h-screen flex flex-col">
            <DynamicNavbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
