"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

// Import components
import Sidebar from "./components/Sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D9%84%D9%88%D8%AC%D9%88%202.jpg-TAiYObEVLPcn1RKfN7dTtTl8fgE76X.jpeg"
                alt="لوجو مستشفى الواحة التخصصي"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">إعدادات النظام - مستشفى الواحة التخصصي</h1>
                <p className="text-sm text-gray-600">إدارة إعدادات التصنيفات والوحدات</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-green-600 hover:text-green-700">
                العودة للموقع الرئيسي
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
