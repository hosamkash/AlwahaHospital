"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, MapPin, Clock, Settings } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>هاتف: +201027226410</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>محافظة الغربية، مدينة سمنود</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>ساعات العمل: 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D9%84%D9%88%D8%AC%D9%88%202.jpg-TAiYObEVLPcn1RKfN7dTtTl8fgE76X.jpeg"
                alt="لوجو مستشفى الواحة التخصصي"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-serif">مستشفى الواحة التخصصي</h1>
              <p className="text-sm text-gray-600">الرعاية الطبية المتميزة</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">
              الرئيسية
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">
              عن المستشفى
            </a>
            <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors">
              الخدمات
            </a>
            <a href="#doctors" className="text-gray-700 hover:text-green-600 transition-colors">
              الأطباء
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">
              اتصل بنا
            </a>
            <Link
              href="/"
              // href="/admin"
              className="text-gray-700 hover:text-green-600 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              لوحة التحكم
            </Link>
            <Button className="bg-green-600 hover:bg-green-700">احجز موعد</Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">
                الرئيسية
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">
                عن المستشفى
              </a>
              <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors">
                الخدمات
              </a>
              <a href="#doctors" className="text-gray-700 hover:text-green-600 transition-colors">
                الأطباء
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">
                اتصل بنا
              </a>
              <Link
                href="/admin"
                className="text-gray-700 hover:text-green-600 transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                لوحة التحكم
              </Link>
              <Button className="bg-green-600 hover:bg-green-700 w-fit">احجز موعد</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
