import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
export const metadata: Metadata = {
  title: "Flomaila",
  description: "Train one AI on your store. Sell on chat, web, and email.",
  applicationName: "Flomaila",
  keywords: ["flomaila", "ai inbox", "ecommerce chatbot"],
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><AppShell>{children}</AppShell></body></html>);
}
