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
  FileText,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// تعريف مجموعات القائمة - إظهار قسم التعريفات العامة فقط
const menuGroups = [
  {
    id: "general-definitions",
    title: "التعريفات العامة",
    icon: FileText,
    items: [
      "وحدات الأصناف",
      "تصنيفات الأصناف",
      "الأصناف - المستهلكات",
      "بنود الماليات",
      "خزائن النقدية",
      "الوظائف",
      "حالات الغرف"
    ],
  },
]

// تعريف الروابط المتاحة
const routeMapping: { [key: string]: string } = {
  "overview": "/admin",
  "hospital-0": "/pages/01-hospital/hospitals-and-branches",
  "hospital-1": "/pages/01-hospital/hospital-structure", 
  "hospital-2": "/pages/01-hospital/occupancy-preview",
  "hospital-3": "/pages/01-hospital/occupancy-reports",
  "hospital-4": "/pages/01-hospital/departments",
  "hospital-5": "/pages/01-hospital/stores",
  "general-definitions-0": "/modules/02-GeneralDefinition/productsUnits",
  "general-definitions-1": "/modules/02-GeneralDefinition/productsCategories",
  "general-definitions-2": "/modules/02-GeneralDefinition/products",
  "general-definitions-3": "/modules/02-GeneralDefinition/FinancialClauses",
  "general-definitions-4": "/modules/02-GeneralDefinition/Treasures",
  "general-definitions-5": "/modules/02-GeneralDefinition/Jobs",
  "general-definitions-6": "/modules/02-GeneralDefinition/HospitalRoomStatus",
  "medical-definitions-0": "/pages/03-MedecalDefinition/Radiology",
  "medical-definitions-1": "/pages/03-MedecalDefinition/MedicalServices",
  "medical-definitions-2": "/pages/03-MedecalDefinition/Disease",
  "medical-definitions-2-groups": "/pages/03-MedecalDefinition/Disease/disease-groups",
  "medical-definitions-3": "/pages/03-MedecalDefinition/MedicalOperations",
  "medical-definitions-4": "/pages/03-MedecalDefinition/MedicalSpecialties",
  "medical-definitions-5": "/pages/03-MedecalDefinition/Analysis",
  "medical-definitions-6": "/pages/03-MedecalDefinition/AnesthesiaTypes",
  "medical-definitions-7": "/pages/03-MedecalDefinition/PriceLists",
  "dealingViews-0": "/pages/04-DealingViews/Clients",
  "dealingViews-1": "/pages/04-DealingViews/Guarantors",
  "dealingViews-2": "/pages/04-DealingViews/Vendors",
  "dealingViews-3": "/pages/04-DealingViews/Employees",
  "dealingViews-4": "/pages/04-DealingViews/Banks",
  "dealingViews-5": "/pages/04-DealingViews/Doctors",
  "dealingViews-6": "/pages/04-DealingViews/ContractsDealings",
  "inventory-0": "/pages/05-Inventory/1-InventoryCreticalQty",
  "inventory-1": "/pages/05-Inventory/2-ShortageRequest",
  "inventory-2": "/pages/05-Inventory/3-PermissionInventoryAdd",
  "inventory-3": "/pages/05-Inventory/4-PermissionInventoryDeduction",
  "inventory-4": "/pages/05-Inventory/5-Settelments",
  "inventory-5": "/pages/05-Inventory/6-TransferBetweenStores",
  "inventory-6": "/pages/05-Inventory/7-InventoryQty",
  "inventory-7": "/pages/05-Inventory/8-ProductsMovement",
  "inventory-8": "/pages/05-Inventory/9-PeriodicInventory",
  "finance-0": "/pages/06-Financial/1-ExchangeMony",
  "finance-1": "/pages/06-Financial/2-SupplayMony",
  "finance-2": "/pages/06-Financial/3-TreasurTraffic",
  "finance-3": "/pages/06-Financial/4-TreasurTrafficByDate",
  "finance-4": "/pages/06-Financial/5-TreasurTrafficByClusesAndDate",
  "finance-5": "/pages/06-Financial/6-TreasurTrafficByCluses",
  "finance-6": "/pages/06-Financial/7-TranesiferMony",
  "finance-7": "/pages/06-Financial/8-TreasureMonyClosed",
  "finance-8": "/pages/06-Financial/9-ExchangeChecks",
  "finance-9": "/pages/06-Financial/10-SupplayChecks",
  "finance-10": "/pages/06-Financial/11-TrafficCheckDetails",
  "finance-11": "/pages/06-Financial/12-TrafficCheckGrouping",
  "finance-12": "/pages/06-Financial/13-BindDocumentWithFinancial",
}

export default function GeneralDefinitionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["general-definitions"])
  const [moduleColor, setModuleColor] = useState<string>("#8b5cf6") // default purple for general definitions
  const pathname = usePathname()

  // Load module color from localStorage
  useEffect(() => {
    const loadModuleColor = () => {
      try {
        const adminSettings = localStorage.getItem('adminSettingsGroupColors')
        if (adminSettings) {
          const colors = JSON.parse(adminSettings)
          if (colors.generalDefinitions) {
            setModuleColor(colors.generalDefinitions)
          }
        }
      } catch (error) {
        console.error('Error loading module color:', error)
      }
    }

    loadModuleColor()

    // Listen for color changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminSettingsGroupColors') {
        loadModuleColor()
      }
    }

    // Listen for custom color change events
    const handleColorChange = () => {
      loadModuleColor()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('moduleColorChanged', handleColorChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('moduleColorChanged', handleColorChange)
    }
  }, [])

  // Helper functions for color manipulation
  const lighten = (color: string, amount: number): string => {
    const hex = color.replace('#', '')
    const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + amount)
    const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + amount)
    const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + amount)
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  const darken = (color: string, amount: number): string => {
    const hex = color.replace('#', '')
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - amount)
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - amount)
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - amount)
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  // Dynamic color variables
  const headerFrom = moduleColor
  const headerTo = darken(moduleColor, 30)
  const pageBgFrom = lighten(moduleColor, 200)
  const pageBgTo = lighten(moduleColor, 220)
  const sidebarIconColor = moduleColor
  const sidebarHoverColor = lighten(moduleColor, 50)

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
              <FileText className="w-10 h-10" style={{ color: sidebarIconColor }} />
              <div>
                <h1 className="text-xl font-bold">التعريفات العامة</h1>
                <p className="text-sm opacity-90">إدارة التعريفات والتصنيفات الأساسية</p>
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
            <div className="lg:col-span-1">
              <Card className="h-[calc(200vh-400px)] overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">القائمة الرئيسية</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-y-auto h-[calc(200vh-480px)]">
                    <nav className="space-y-1">
                      {/* مجموعات القائمة */}
                      {menuGroups.map((group) => {
                        const IconComponent = group.icon
                        const isExpanded = expandedGroups.includes(group.id)

                        return (
                          <div key={group.id} className="border-b border-gray-100 last:border-b-0">
                            {/* عنوان المجموعة */}
                            <button
                              onClick={() => toggleGroup(group.id)}
                              className="w-full text-right px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5" style={{ color: sidebarIconColor }} />
                                <span className="font-medium text-gray-800 text-sm">{group.title}</span>
                              </div>
                              {group.items.length > 0 && (
                                isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                              )}
                            </button>

                            {/* عناصر المجموعة */}
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
                                        pathname === route ? "bg-green-100 text-green-700" : "text-gray-700"
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

          {/* Main Content */}
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
