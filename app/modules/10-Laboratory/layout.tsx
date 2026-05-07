"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Microscope,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuGroups = [
  {
    id: "laboratory",
    title: "قسم (المختبر) معمل التحاليل الطبية",
    icon: Microscope,
    items: [
      "أنواع العينات",
      "أنواع الأوعية",
      "نوع نتيجة التحاليل",
      "وحدة قياس التحليل",
      "التحاليل الطبية",
      "مجموعات التحاليل الطبية",
      "كومنتات نتائج التحاليل",
      "تنبيهات نتائج التحاليل",
      "تسجيل طلب فحص (حافظة التحاليل)",
      "استلام (سحب) العينات",
      "إدارة أنواع التحاليل",
      "جدولة التحاليل",
      "المهام اليومية",
      "تسجيل نتائج التحاليل",
      "مراجعة واعتماد النتائج",
      "طباعة تقارير التحاليل",
      "أرشيف نتائج المرضى",
      "إدارة الأجهزة والمعايرة",
      "إدارة مواد وأدوات التحاليل",
      "تقارير إحصائية للمختبر"
    ],
  },
]

const routeMapping: { [key: string]: string } = {
  "laboratory-0": "/pages/10-Laboratory/أنواع العينات",
  "laboratory-1": "/pages/10-Laboratory/أنواع الأوعية",
  "laboratory-2": "/pages/10-Laboratory/نوع نتيجة التحاليل",
  "laboratory-3": "/pages/10-Laboratory/وحدة قياس التحليل",
  "laboratory-4": "/pages/10-Laboratory/التحاليل الطبية",
  "laboratory-5": "/pages/10-Laboratory/مجموعات التحاليل الطبية",
  "laboratory-6": "/pages/10-Laboratory/كومنتات نتائج التحاليل",
  "laboratory-7": "/pages/10-Laboratory/تنبيهات نتائج التحاليل",
  "laboratory-8": "/pages/10-Laboratory/تسجيل طلب فحص (حافظة التحاليل)",
  "laboratory-9": "/pages/10-Laboratory/استلام (سحب) العينات",
  "laboratory-10": "/pages/10-Laboratory/إدارة أنواع التحاليل",
  "laboratory-11": "/pages/10-Laboratory/جدولة التحاليل",
  "laboratory-12": "/pages/10-Laboratory/المهام اليومية",
  "laboratory-13": "/pages/10-Laboratory/تسجيل نتائج التحاليل",
  "laboratory-14": "/pages/10-Laboratory/مراجعة واعتماد النتائج",
  "laboratory-15": "/pages/10-Laboratory/طباعة تقارير التحاليل",
  "laboratory-16": "/pages/10-Laboratory/أرشيف نتائج المرضى",
  "laboratory-17": "/pages/10-Laboratory/إدارة الأجهزة والمعايرة",
  "laboratory-18": "/pages/10-Laboratory/إدارة مواد وأدوات التحاليل",
  "laboratory-19": "/pages/10-Laboratory/تقارير إحصائية للمختبر",
}

export default function LaboratoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["laboratory"])
  const pathname = usePathname()

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => 
      prev.includes(groupId) 
        ? prev.filter((id) => id !== groupId) 
        : [...prev, groupId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <header className="bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg">
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
              <Microscope className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">قسم (المختبر) معمل التحاليل الطبية</h1>
                <p className="text-sm text-violet-100">إدارة التحاليل والنتائج والمهام</p>
              </div>
            </div>
            <Link href="/admin" className="text-violet-100 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              العودة للوحة الرئيسية
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className={`grid grid-cols-1 gap-8 ${sidebarCollapsed ? 'lg:grid-cols-1' : 'lg:grid-cols-4'}`}>
          {!sidebarCollapsed && (
            <div className="lg:col-span-1">
              <Card className="h-[calc(200vh-400px)] overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">القائمة الرئيسية</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-y-auto h-[calc(200vh-480px)]">
                    <nav className="space-y-1">
                      {menuGroups.map((group) => {
                        const IconComponent = group.icon
                        const isExpanded = expandedGroups.includes(group.id)

                        return (
                          <div key={group.id} className="border-b border-gray-100 last:border-b-0">
                            <button
                              onClick={() => toggleGroup(group.id)}
                              className="w-full text-right px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-800 text-sm">{group.title}</span>
                              </div>
                              {group.items.length > 0 && (
                                isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                              )}
                            </button>

                            {isExpanded && group.items.length > 0 && (
                              <div className="bg-gray-50">
                                {group.items.map((item, index) => {
                                  const routeKey = `${group.id}-${index}`
                                  const route = routeMapping[routeKey]
                                  
                                  return route ? (
                                    <Link
                                      key={index}
                                      href={route}
                                      onClick={() => setSidebarOpen(false)}
                                      className={`block w-full text-right px-8 py-2 text-sm hover:bg-gray-100 transition-colors ${
                                        pathname === route ? "bg-violet-100 text-violet-700" : "text-gray-700"
                                      }`}
                                    >
                                      {item}
                                    </Link>
                                  ) : (
                                    <button
                                      key={index}
                                      className="block w-full text-right px-8 py-2 text-sm text-gray-400 cursor-not-allowed opacity-50"
                                      disabled
                                      title="قريباً"
                                    >
                                      {item} (قريباً)
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </nav>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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

