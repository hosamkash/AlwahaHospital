"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Building2,
  FileText,
  Stethoscope,
  HandHeart,
  Package,
  DollarSign,
  Receipt,
  Truck,
  UserCheck,
  Microscope,
  Zap,
  Pill,
  AlertTriangle,
  Bed,
  Scissors,
  Heart,
  Baby,
  Clipboard,
  Shield,
  Home,
  Utensils,
  Coffee,
  Monitor,
  TrendingUp,
  Settings,
  Brain,
  Database,
  Activity,
  Wifi,
  Users,
  MapPin,
  Video,
  UserPlus,
  BarChart,
  Megaphone,
  Globe,
} from "lucide-react"

// تعريف الموديلات الرئيسية
const mainModules = [
  {
    id: "website",
    title: "إدارة الموقع",
    description: "إدارة محتوى الموقع والخدمات",
    icon: Globe,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    link: "/modules/00-website"
  },
  {
    id: "hospital",
    title: "الشركة - المستشفى",
    description: "إدارة المستشفى والفروع والأقسام",
    icon: Building2,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    link: "/modules/01-hospital"
  },
  {
    id: "general-definitions",
    title: "التعريفات العامة",
    description: "إدارة الوحدات والتصنيفات والوظائف",
    icon: FileText,
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    link: "/modules/02-GeneralDefinition"
  },
  {
    id: "medical-definitions",
    title: "التعريفات الطبية",
    description: "إدارة الخدمات الطبية والأمراض",
    icon: Stethoscope,
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    link: "/modules/03-MedicalDefinition"
  },
  {
    id: "dealingViews",
    title: "جهات التعامل",
    description: "إدارة العملاء والموردين والأطباء",
    icon: HandHeart,
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    link: "/modules/04-DealingViews"
  },
  {
    id: "inventory",
    title: "إدارة المخازن",
    description: "إدارة المخزون والجرد والتحويلات",
    icon: Package,
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600",
    link: "/modules/05-Inventory"
  },
  {
    id: "finance",
    title: "الماليات",
    description: "إدارة المالية والحركة النقدية",
    icon: DollarSign,
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600",
    link: "/modules/06-Financial"
  },
  {
    id: "invoices",
    title: "إدارة الفواتير",
    description: "إدارة فواتير المبيعات والمشتريات",
    icon: Receipt,
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600",
    link: "/modules/07-Invoices"
  },
  {
    id: "representatives",
    title: "إدارة المندوبين",
    description: "إدارة مندوبي المبيعات",
    icon: Truck,
    color: "bg-teal-500",
    hoverColor: "hover:bg-teal-600",
    link: "/admin/representatives"
  },
  {
    id: "hr",
    title: "إدارة شئون العاملين",
    description: "إدارة الموظفين والرواتب والحضور",
    icon: UserCheck,
    color: "bg-pink-500",
    hoverColor: "hover:bg-pink-600",
    link: "/modules/09-HR"
  },
  {
    id: "laboratory",
    title: "قسم (المختبر) معمل التحاليل الطبية",
    description: "إدارة التحاليل الطبية والنتائج",
    icon: Microscope,
    color: "bg-violet-500",
    hoverColor: "hover:bg-violet-600",
    link: "/modules/10-Laboratory"
  },
  {
    id: "radiology",
    title: "قسم الأشعة",
    description: "إدارة الأشعة والتقارير",
    icon: Zap,
    color: "bg-amber-500",
    hoverColor: "hover:bg-amber-600",
    link: "/modules/11-Radiology"
  },
  {
    id: "pharmacy",
    title: "قسم الصيدلية",
    description: "إدارة الأدوية والمخزون",
    icon: Pill,
    color: "bg-lime-500",
    hoverColor: "hover:bg-lime-600",
    link: "/modules/12-Pharmacy"
  },
  {
    id: "emergency",
    title: "قسم الطوارئ",
    description: "إدارة حالات الطوارئ",
    icon: AlertTriangle,
    color: "bg-rose-500",
    hoverColor: "hover:bg-rose-600",
    link: "/modules/13-Emergency"
  },
  {
    id: "inpatient",
    title: "قسم الداخلي (الإقامات)",
    description: "إدارة الإقامات والمرضى الداخليين",
    icon: Bed,
    color: "bg-sky-500",
    hoverColor: "hover:bg-sky-600",
    link: "/modules/14-Inpatient"
  },
  {
    id: "operations",
    title: "قسم العمليات",
    description: "إدارة العمليات الجراحية",
    icon: Scissors,
    color: "bg-fuchsia-500",
    hoverColor: "hover:bg-fuchsia-600",
    link: "/modules/15-Operations"
  },
  {
    id: "recovery",
    title: "قسم الإفاقة (بعد العمليات)",
    description: "إدارة ما بعد العمليات",
    icon: Heart,
    color: "bg-emerald-600",
    hoverColor: "hover:bg-emerald-700",
    link: "/modules/16-Recovery"
  },
  {
    id: "icu",
    title: "قسم العناية المركزة",
    description: "إدارة العناية المركزة",
    icon: Heart,
    color: "bg-red-600",
    hoverColor: "hover:bg-red-700",
    link: "/modules/17-ICU"
  },
  {
    id: "nursery",
    title: "قسم الحضانة",
    description: "إدارة حضانة الأطفال",
    icon: Baby,
    color: "bg-pink-600",
    hoverColor: "hover:bg-pink-700",
    link: "/modules/18-Nursery"
  },
  {
    id: "outpatient",
    title: "قسم العيادات الخارجية",
    description: "إدارة العيادات الخارجية",
    icon: Clipboard,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    link: "/modules/19-Outpatient"
  },
  {
    id: "insurance",
    title: "التأمين الطبي والتعاقدات",
    description: "إدارة التأمين والتعاقدات",
    icon: Shield,
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700",
    link: "/modules/20-Insurance"
  },
  {
    id: "private-clinics",
    title: "قسم العيادات الخاصة",
    description: "إدارة العيادات الخاصة",
    icon: Home,
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-700",
    link: "/modules/21-PrivateClinics"
  },
  {
    id: "waste-management",
    title: "قسم النفايات والإدارة الصحة",
    description: "إدارة النفايات الطبية",
    icon: AlertTriangle,
    color: "bg-yellow-600",
    hoverColor: "hover:bg-yellow-700",
    link: "/modules/22-WasteManagement"
  },
  {
    id: "gas-room",
    title: "قسم – غرفة الغازات",
    description: "إدارة غرفة الغازات",
    icon: Zap,
    color: "bg-indigo-600",
    hoverColor: "hover:bg-indigo-700",
    link: "/modules/23-GasRoom"
  },
  {
    id: "it",
    title: "إدارة تكنولوجيا المعلومات",
    description: "إدارة تقنية المعلومات",
    icon: Monitor,
    color: "bg-gray-600",
    hoverColor: "hover:bg-gray-700",
    link: "/modules/24-IT"
  },
  {
    id: "kitchen",
    title: "قسم المطبخ (مطعم المستشفى)",
    description: "إدارة مطعم المستشفى",
    icon: Utensils,
    color: "bg-orange-600",
    hoverColor: "hover:bg-orange-700",
    link: "/modules/25-Kitchen"
  },
  {
    id: "general-services",
    title: "إدارة الخدمات العامة",
    description: "إدارة الخدمات العامة",
    icon: Settings,
    color: "bg-slate-600",
    hoverColor: "hover:bg-slate-700",
    link: "/modules/26-GeneralServices"
  },
  {
    id: "cafeteria",
    title: "قسم الكافتريا",
    description: "إدارة الكافتريا",
    icon: Coffee,
    color: "bg-amber-600",
    hoverColor: "hover:bg-amber-700",
    link: "/modules/27-Cafeteria"
  },
  {
    id: "system-settings",
    title: "الإعدادات",
    description: "إعدادات النظام",
    icon: Settings,
    color: "bg-gray-700",
    hoverColor: "hover:bg-gray-800",
    link: "/modules/28-SystemSettings"
  },
  {
    id: "marketing",
    title: "إدارة التسويق",
    description: "إدارة التسويق والإعلان",
    icon: TrendingUp,
    color: "bg-green-700",
    hoverColor: "hover:bg-green-800",
    link: "/modules/29-Marketing"
  },
  {
    id: "ai-diagnosis",
    title: "إدارة الذكاء الاصطناعي للتشخيص المبكر",
    description: "التشخيص بالذكاء الاصطناعي",
    icon: Brain,
    color: "bg-purple-700",
    hoverColor: "hover:bg-purple-800",
    link: "/modules/30-AI-Diagnosis"
  },
  {
    id: "big-data-analysis",
    title: "تحليل البيانات الضخمة لتوقع احتياجات المستشفى",
    description: "تحليل البيانات الضخمة",
    icon: Database,
    color: "bg-blue-700",
    hoverColor: "hover:bg-blue-800",
    link: "/modules/31-Big-Data-Analysis"
  },
  {
    id: "mental-health",
    title: "نظام إدارة الصحة النفسية",
    description: "إدارة الصحة النفسية",
    icon: Activity,
    color: "bg-pink-700",
    hoverColor: "hover:bg-pink-800",
    link: "/modules/32-Mental-Health"
  },
  {
    id: "remote-monitoring",
    title: "مراقبة الحالة الصحية عن بُعد باستخدام أجهزة ذكية",
    description: "مراقبة الحالة الصحية عن بُعد",
    icon: Wifi,
    color: "bg-cyan-700",
    hoverColor: "hover:bg-cyan-800",
    link: "/modules/33-Remote-Monitoring"
  },
  {
    id: "ai-hr",
    title: "إدارة الموارد البشرية بالذكاء الاصطناعي",
    description: "إدارة الموارد البشرية بالذكاء الاصطناعي",
    icon: Users,
    color: "bg-teal-700",
    hoverColor: "hover:bg-teal-800",
    link: "/modules/34-AI-HR"
  },
  {
    id: "smart-tracking",
    title: "نظام التتبع الذكي للأدوية والمستلزمات",
    description: "تتبع الأدوية والمستلزمات",
    icon: MapPin,
    color: "bg-emerald-700",
    hoverColor: "hover:bg-emerald-800",
    link: "/modules/35-Smart-Tracking"
  },
  {
    id: "remote-consultation",
    title: "خدمة الاستشارات الطبية عن بُعد بتقنية الواقع المعزز",
    description: "الاستشارات الطبية عن بُعد",
    icon: Video,
    color: "bg-violet-700",
    hoverColor: "hover:bg-violet-800",
    link: "/modules/36-Remote-Consultation"
  },
  {
    id: "patient-experience",
    title: "نظام إدارة تجربة المريض الشخصية",
    description: "إدارة تجربة المريض الشخصية",
    icon: UserPlus,
    color: "bg-rose-700",
    hoverColor: "hover:bg-rose-800",
    link: "/modules/37-Patient-Experience"
  },
  {
    id: "performance-analysis",
    title: "تحليل البيانات لتقييم الأداء الطبي",
    description: "تحليل الأداء الطبي",
    icon: BarChart,
    color: "bg-indigo-700",
    hoverColor: "hover:bg-indigo-800",
    link: "/modules/38-Performance-Analysis"
  },
  {
    id: "health-awareness",
    title: "نظام إدارة التوعية الصحية للمجتمع",
    description: "إدارة التوعية الصحية",
    icon: Megaphone,
    color: "bg-lime-700",
    hoverColor: "hover:bg-lime-800",
    link: "/modules/39-Health-Awareness"
  },
  
]

export default function AdminDashboard() {
  const [visibleModules, setVisibleModules] = useState<string[]>([])
  const [groupColors, setGroupColors] = useState<{[key: string]: string}>({})

  // الألوان الافتراضية للمجموعات
  const defaultColors: {[key: string]: string} = {
    "website": "#3b82f6", // blue
    "hospital": "#10b981", // emerald
    "general-definitions": "#8b5cf6", // violet
    "medical-definitions": "#f59e0b", // amber
    "dealingViews": "#ef4444", // red
    "inventory": "#6366f1", // indigo
    "finance": "#059669", // emerald
    "invoices": "#dc2626", // red
    "representatives": "#7c3aed", // violet
    "hr": "#0891b2", // cyan
    "laboratory": "#be185d", // pink
    "radiology": "#ea580c", // orange
    "pharmacy": "#16a34a", // green
    "emergency": "#dc2626", // red
    "inpatient": "#0ea5e9", // sky
    "operations": "#7c2d12", // red
    "recovery": "#059669", // emerald
    "icu": "#be185d", // pink
    "nursery": "#f59e0b", // amber
    "outpatient": "#0891b2", // cyan
    "insurance": "#7c3aed", // violet
    "private-clinics": "#16a34a", // green
    "waste-management": "#dc2626", // red
    "gas-room": "#ea580c", // orange
    "it": "#6366f1", // indigo
    "kitchen": "#f59e0b", // amber
    "general-services": "#6b7280", // gray
    "cafeteria": "#16a34a", // green
    "system-settings": "#6b7280", // gray
    "marketing": "#ec4899", // pink
    "ai-diagnosis": "#8b5cf6", // violet
    "big-data-analysis": "#0ea5e9", // sky
    "mental-health": "#059669", // emerald
    "remote-monitoring": "#6366f1", // indigo
    "ai-hr": "#0891b2", // cyan
    "smart-tracking": "#f59e0b", // amber
    "remote-consultation": "#7c3aed", // violet
    "patient-experience": "#16a34a", // green
    "performance-analysis": "#dc2626", // red
    "health-awareness": "#ec4899" // pink
  }

  // تحميل الإعدادات المحفوظة من صفحة الإعدادات
  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('adminSettingsVisibleGroups')
      const savedColors = localStorage.getItem('adminSettingsGroupColors')
      
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings)
          setVisibleModules(parsedSettings)
        } catch (error) {
          console.error('خطأ في تحميل إعدادات الموديلات المرئية:', error)
          // إذا فشل التحميل، اجعل جميع الموديلات مرئية
          setVisibleModules(mainModules.map(module => module.id))
        }
      } else {
        // إذا لم تكن هناك إعدادات محفوظة، اجعل جميع الموديلات مرئية
        setVisibleModules(mainModules.map(module => module.id))
      }

      if (savedColors) {
        try {
          const parsedColors = JSON.parse(savedColors)
          setGroupColors(parsedColors)
        } catch (error) {
          setGroupColors(defaultColors)
        }
      } else {
        setGroupColors(defaultColors)
      }
    }

    // تحميل الإعدادات في البداية
    loadSettings()

    // الاستماع للتغييرات في localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminSettingsVisibleGroups' || e.key === 'adminSettingsGroupColors') {
        loadSettings()
      }
    }

    // الاستماع للأحداث المخصصة (للتحديثات في نفس التبويب)
    const handleCustomStorageChange = () => {
      loadSettings()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('adminSettingsChanged', handleCustomStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('adminSettingsChanged', handleCustomStorageChange)
    }
  }, [])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">نظام إدارة مستشفى الواحة التخصصي</h1>
        <p className="text-lg text-gray-600">اختر الموديل المناسب لإدارة عمليات المستشفى</p>
      </div>

      {/* Main Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mainModules.filter(module => visibleModules.includes(module.id)).map((module) => {
          const IconComponent = module.icon
          return (
            <Link 
              key={module.id} 
              href={module.link}
              target={module.id === "hospital" || module.id === "general-definitions" || module.id === "website" || module.id === "medical-definitions" || module.id === "dealingViews" || module.id === "inventory" || module.id === "finance" || module.id === "invoices" || module.id === "hr" || module.id === "laboratory" || module.id === "radiology" || module.id === "pharmacy" || module.id === "emergency" || module.id === "inpatient" || module.id === "operations" || module.id === "recovery" || module.id === "icu" || module.id === "nursery" || module.id === "outpatient" || module.id === "insurance" || module.id === "private-clinics" || module.id === "waste-management" || module.id === "gas-room" || module.id === "it" || module.id === "kitchen" || module.id === "general-services" || module.id === "cafeteria" || module.id === "system-settings" || module.id === "marketing" || module.id === "ai-diagnosis" || module.id === "big-data-analysis" || module.id === "mental-health" || module.id === "remote-monitoring" || module.id === "ai-hr" || module.id === "smart-tracking" || module.id === "remote-consultation" || module.id === "patient-experience" || module.id === "performance-analysis" || module.id === "health-awareness" ? "_blank" : "_self"}
              rel={module.id === "hospital" || module.id === "general-definitions" || module.id === "website" || module.id === "medical-definitions" || module.id === "dealingViews" || module.id === "inventory" || module.id === "finance" || module.id === "invoices" || module.id === "hr" || module.id === "laboratory" || module.id === "radiology" || module.id === "pharmacy" || module.id === "emergency" || module.id === "inpatient" || module.id === "operations" || module.id === "recovery" || module.id === "icu" || module.id === "nursery" || module.id === "outpatient" || module.id === "insurance" || module.id === "private-clinics" || module.id === "waste-management" || module.id === "gas-room" || module.id === "it" || module.id === "kitchen" || module.id === "general-services" || module.id === "cafeteria" || module.id === "system-settings" || module.id === "marketing" || module.id === "ai-diagnosis" || module.id === "big-data-analysis" || module.id === "mental-health" || module.id === "remote-monitoring" || module.id === "ai-hr" || module.id === "smart-tracking" || module.id === "remote-consultation" || module.id === "patient-experience" || module.id === "performance-analysis" || module.id === "health-awareness" ? "noopener noreferrer" : undefined}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        backgroundColor: groupColors[module.id] || defaultColors[module.id] || '#6b7280'
                      }}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {module.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                      {module.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
