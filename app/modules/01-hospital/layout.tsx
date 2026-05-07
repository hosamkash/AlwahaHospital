"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [moduleColor, setModuleColor] = useState<string>("#10b981") // default emerald for hospital

  // Load saved module color from admin settings
  useEffect(() => {
    try {
      const savedColors = localStorage.getItem('adminSettingsGroupColors')
      if (savedColors) {
        const parsed = JSON.parse(savedColors)
        if (parsed && typeof parsed['hospital'] === 'string') {
          setModuleColor(parsed['hospital'])
        }
      }
    } catch (e) {
      // ignore and use default
    }
  }, [])

  // Helpers to lighten/darken hex color a bit
  const clamp = (v: number) => Math.max(0, Math.min(255, v))
  const hexToRgb = (hex: string) => {
    const m = hex.replace('#','')
    const bigint = parseInt(m.length === 3 ? m.split('').map(c=>c+c).join('') : m, 16)
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
  }
  const rgbToHex = (r: number, g: number, b: number) => `#${[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`
  const lighten = (hex: string, amount = 0.15) => {
    const { r,g,b } = hexToRgb(hex)
    return rgbToHex(
      clamp(Math.round(r + (255 - r) * amount)),
      clamp(Math.round(g + (255 - g) * amount)),
      clamp(Math.round(b + (255 - b) * amount))
    )
  }
  const darken = (hex: string, amount = 0.15) => {
    const { r,g,b } = hexToRgb(hex)
    return rgbToHex(
      clamp(Math.round(r * (1 - amount))),
      clamp(Math.round(g * (1 - amount))),
      clamp(Math.round(b * (1 - amount)))
    )
  }

  const headerFrom = moduleColor
  const headerTo = darken(moduleColor, 0.12)
  const pageBgFrom = lighten(moduleColor, 0.92) // very light tint
  const pageBgTo = lighten(moduleColor, 0.88)
  const sidebarIcon = darken(moduleColor, 0.1)
  const navHoverBg = lighten(moduleColor, 0.9)
  const navHoverText = darken(moduleColor, 0.35)

  const hospitalMenuItems = [
    { name: "المستشفى والفروع", href: "/modules/01-hospital/hospitals-and-branches", icon: "🏢" },
    { name: "هيكل المستشفى", href: "/modules/01-hospital/hospital-structure", icon: "🏥" },
    { name: "معاينة الإشغال", href: "/modules/01-hospital/occupancy-preview", icon: "📈" },
    { name: "تقارير الإشغال", href: "/modules/01-hospital/occupancy-reports", icon: "📊" },
    { name: "الادارات والأقسام", href: "/modules/01-hospital/departments", icon: "🏬" },
    { name: "المخازن", href: "/modules/01-hospital/stores", icon: "📦" },
  ]

  return (
    <div 
      className="min-h-screen"
      style={{ background: `linear-gradient(135deg, ${pageBgFrom}, ${pageBgTo})` }}
    >
      <style>{`
        .module-theme button.bg-primary,
        .module-theme [data-slot="button"].bg-primary {
          background-color: ${moduleColor} !important;
          color: #ffffff !important;
          border-color: ${moduleColor} !important;
        }
        .module-theme button.bg-primary:hover,
        .module-theme [data-slot="button"].bg-primary:hover {
          background-color: ${darken(moduleColor, 0.12)} !important;
          border-color: ${darken(moduleColor, 0.12)} !important;
        }
        .module-theme button.bg-primary:focus,
        .module-theme [data-slot="button"].bg-primary:focus {
          background-color: ${moduleColor} !important;
          border-color: ${moduleColor} !important;
        }
        .module-theme .text-module-color { color: ${moduleColor} !important; }
        .module-theme .bg-module-color { background-color: ${moduleColor} !important; }
        .module-theme .border-module-color { border-color: ${moduleColor} !important; }
      `}</style>
      {/* Header */}
      <header 
        className="text-white shadow-lg"
        style={{ background: `linear-gradient(90deg, ${headerFrom}, ${headerTo})` }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="lg:hidden text-white hover:bg-white/20" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden lg:flex text-white hover:bg-white/20" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title={sidebarCollapsed ? "إظهار القائمة" : "إخفاء القائمة"}
              >
                {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </Button>
              <Building2 className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">إدارة المستشفى</h1>
                <p className="text-sm opacity-90">إدارة المستشفى والأقسام الطبية</p>
              </div>
            </div>
            <Link href="/admin" className="opacity-90 hover:opacity-100 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              العودة للوحة الرئيسية
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 module-theme">
        <div className={`grid grid-cols-1 gap-8 ${sidebarCollapsed ? 'lg:grid-cols-1' : 'lg:grid-cols-4'}`}>
          {/* Sidebar */}
          {!sidebarCollapsed && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" style={{ color: sidebarIcon }} />
                قائمة المستشفى
              </h3>
              <nav className="space-y-2">
                {hospitalMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{}}
                    onMouseEnter={(e)=>{
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = navHoverBg
                      ;(e.currentTarget as HTMLAnchorElement).style.color = navHoverText
                    }}
                    onMouseLeave={(e)=>{
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = ''
                      ;(e.currentTarget as HTMLAnchorElement).style.color = ''
                    }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Main Content */}
          <div className={sidebarCollapsed ? "lg:col-span-1" : "lg:col-span-3"}>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}