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
  Heart,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuGroups = [
  {
    id: "recovery",
    title: "قسم الإفاقة (بعد العمليات)",
    icon: Heart,
    items: ["قريباً ...."],
  },
]

const routeMapping: { [key: string]: string } = {}

export default function RecoveryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["recovery"])
  const pathname = usePathname()

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => 
      prev.includes(groupId) 
        ? prev.filter((id) => id !== groupId) 
        : [...prev, groupId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
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
              <Heart className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">قسم الإفاقة (بعد العمليات)</h1>
                <p className="text-sm text-emerald-100">قريباً ...</p>
              </div>
            </div>
            <Link href="/admin" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-2">
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
                                {/* قريباً */}
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

