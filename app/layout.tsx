import type React from "react"
import type { Metadata } from "next"
import { Cairo, Tajawal } from "next/font/google"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
})

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
})

export const metadata: Metadata = {
  title: "مستشفى الواحه التخصصي - الرعاية الطبية المتميزة",
  description: "مستشفى الواحه التخصصي يقدم أفضل الخدمات الطبية والرعاية الصحية المتخصصة",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
