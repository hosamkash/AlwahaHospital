"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Package,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuGroups = [
  {
    id: "inventory",
    title: "إدارة المخازن",
    icon: Package,
    items: [
      "الأرصدة الحرجة وحد الطلب",
      "طلبات نواقص الأصناف",
      "إذن إضافة",
      "إذن خصم",
      "تسوية الأصناف",
      "التحويل بين المخازن",
      "الجرد المستمر",
      "كارت الصنف",
      "الجرد الدوري"
    ],
  },
]

const routeMapping: { [key: string]: string } = {
  "inventory-0": "/modules/05-Inventory/1-InventoryCreticalQty",
  "inventory-1": "/modules/05-Inventory/2-ShortageRequest",
  "inventory-2": "/modules/05-Inventory/3-PermissionInventoryAdd",
  "inventory-3": "/modules/05-Inventory/4-PermissionInventoryDeduction",
  "inventory-4": "/modules/05-Inventory/5-Settelments",
  "inventory-5": "/modules/05-Inventory/6-TransferBetweenStores",
  "inventory-6": "/modules/05-Inventory/7-InventoryQty",
  "inventory-7": "/modules/05-Inventory/8-ProductsMovement",
  "inventory-8": "/modules/05-Inventory/9-PeriodicInventory",
}

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["inventory"])
  const [moduleColor, setModuleColor] = useState<string>("#6366f1") // default indigo for inventory
  const pathname = usePathname()

  // Load saved module color from admin settings
  useEffect(() => {
    try {
      const savedColors = localStorage.getItem('adminSettingsGroupColors')
      if (savedColors) {
        const parsed = JSON.parse(savedColors)
        if (parsed && typeof parsed['inventory'] === 'string') {
          setModuleColor(parsed['inventory'])
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
  const activeBg = lighten(moduleColor, 0.85)
  const activeText = darken(moduleColor, 0.3)

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => 
      prev.includes(groupId) 
        ? prev.filter((id) => id !== groupId) 
        : [...prev, groupId]
    )
  }

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
              <Package className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">إدارة المخازن</h1>
                <p className="text-sm opacity-90">كل ما يخص إدارة المخزون</p>
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
                                <IconComponent className="w-5 h-5" style={{ color: sidebarIcon }} />
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
                                      className={`block w-full text-right px-8 py-2 text-sm transition-colors ${
                                        pathname === route ? "" : "text-gray-700"
                                      }`}
                                      style={pathname === route ? { backgroundColor: activeBg, color: activeText } : {}}
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
            <div className="bg-white rounded-lg shadow-lg p-6 module-theme">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

