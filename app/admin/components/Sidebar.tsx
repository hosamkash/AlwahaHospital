"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Globe,
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
} from "lucide-react"

// تعريف مجموعات القائمة
const menuGroups = [
  {
    id: "website",
    title: "إدارة الموقع",
    icon: Globe,
    items: [
      "عن مستشفى الواحة التخصصي",
      "خدماتنا الطبية",
      "رؤيتنا ورسالتنا",
      "اتصل بنا",
      "فريقنا الطبي",
      "جهات التعاقد",
    ],
  },
  {
    id: "hospital",
    title: "الشركة - المستشفى",
    icon: Building2,
    items: [
      "المستشفى والفروع",
      "هيكل المستشفى",
      "معاينة الإشغال",
      "تقارير الإشغال",
      "الادارات والأقسام",
      "المخازن"
    ],
  },
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
  {
    id: "medical-definitions",
    title: "التعريفات الطبية",
    icon: Stethoscope,
    items: [
      "الأشعات",
      "الخدمات الطبية",
      "الأمراض",
      "تعريف العمليات",
      "التخصصات الطبية",
      "التحاليل الطبية",
      "أنواع التخدير",
      "قوائم الأسعار"
    ],
  },
  {
    id: "dealingViews",
    title: "جهات التعامل",
    icon: HandHeart,
    items: [
      "العملاء – المرضي",
      "المرافق - الضامن",
      "الموردين",
      "الموظفين",
      "البنوك",
      "الأطباء",
      "جهات التعاقد"
    ],
  },
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
  {
    id: "finance",
    title: "الماليات",
    icon: DollarSign,
    items: [
      "سندات الدفع",
      "سندات القبض",
      "حركة الخزينة تفصيلي",
      "حركة الخزينة - تجميع بالتاريخ",
      "حركة الخزينة - تجميع ببنود النقدية والتاريخ",
      "حركة الخزينة - تجميع ببنود النقدية",
      "تحويلات النقدية",
      "تقفيل يومية الخزينة",
      "شيكات الدفع",
      "شيكات القبض",
      "حركة الشيكات تفصيلي",
      "حركة الشيكات تجميعي",
      "ربط المستندات بالنقدية"
    ],
  },
  {
    id: "invoices",
    title: "إدارة الفواتير",
    icon: Receipt,
    items: [
      "فواتير المشتريات",
      "فواتير مرتجعات المشتريات",
      "فواتير المبيعات",
      "فواتير مرتجعات المبيعات"
    ],
  },
  {
    id: "representatives",
    title: "إدارة المندوبين",
    icon: Truck,
    items: [],
  },
  {
    id: "hr",
    title: "إدارة شئون العاملين",
    icon: UserCheck,
    items: [
      "بيانات الموظفين",
      "الأقسام والوظائف",
      "جداول العمل (الشيفتات)",
      "الحضور والانصراف",
      "التأخيرات والانصراف المبكر",
      "الغياب",
      "الإجازات",
      "السلف والقروض",
      "المرتبات والحوافز",
      "الخصومات والاستقطاعات",
      "التسويات المالية",
      "العقاب والمكافآت",
      "الترقيات والتنقلات",
      "إنهاء الخدمة والاستقالات",
      "أرشيف المستندات",
      "إدارة المستخدمين والصلاحيات",
      "تقارير شئون العاملين"
    ],
  },
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
  {
    id: "radiology",
    title: "قسم الأشعة",
    icon: Zap,
    items: [
      "تسجيل طلب أشعة",
      "إدارة أنواع الأشعة",
      "جدولة الأشعة",
      "رفع صور الأشعة",
      "تقرير الأشعة",
      "مراجعة واعتماد التقرير",
      "أرشيف الأشعة"
    ],
  },
  {
    id: "pharmacy",
    title: "قسم الصيدلية",
    icon: Pill,
    items: [
      "طلب دواء",
      "صرف دواء للعيادات / المرضى",
      "إدارة وصفات الأطباء",
      "إدارة مخزون الأدوية",
      "تنبيهات انتهاء الصلاحية",
      "جرد الصيدلية",
      "تقارير الصيدلية"
    ],
  },
  {
    id: "emergency",
    title: "قسم الطوارئ",
    icon: AlertTriangle,
    items: ["قريباً ...."],
  },
  {
    id: "inpatient",
    title: "قسم الداخلي (الإقامات)",
    icon: Bed,
    items: ["قريباً ...."],
  },
  {
    id: "operations",
    title: "قسم العمليات",
    icon: Scissors,
    items: ["قريباً ...."],
  },
  {
    id: "recovery",
    title: "قسم الإفاقة (بعد العمليات)",
    icon: Heart,
    items: ["قريباً ...."],
  },
  {
    id: "icu",
    title: "قسم العناية المركزة",
    icon: Heart,
    items: ["قريباً ...."],
  },
  {
    id: "nursery",
    title: "قسم الحضانة",
    icon: Baby,
    items: ["قريباً ...."],
  },
  {
    id: "outpatient",
    title: "قسم العيادات الخارجية",
    icon: Clipboard,
    items: ["قريباً ...."],
  },
  {
    id: "insurance",
    title: "التأمين الطبي والتعاقدات",
    icon: Shield,
    items: ["قريباً ...."],
  },
  {
    id: "private-clinics",
    title: "قسم العيادات الخاصة",
    icon: Home,
    items: ["قريباً ...."],
  },
  {
    id: "waste-management",
    title: "قسم النفايات والإدارة الصحة",
    icon: AlertTriangle,
    items: ["قريباً ...."],
  },
  {
    id: "gas-room",
    title: "قسم – غرفة الغازات",
    icon: Zap,
    items: ["قريباً ...."],
  },
  {
    id: "it",
    title: "إدارة تكنولوجيا المعلومات",
    icon: Monitor,
    items: [],
  },
  {
    id: "kitchen",
    title: "قسم المطبخ (مطعم المستشفى)",
    icon: Utensils,
    items: ["قريباً ...."],
  },
  {
    id: "general-services",
    title: "إدارة الخدمات العامة",
    icon: Settings,
    items: ["قريباً ...."],
  },
  {
    id: "cafeteria",
    title: "قسم الكافتريا",
    icon: Coffee,
    items: ["قريباً ...."],
  },
  {
    id: "system-settings",
    title: "الإعدادات",
    icon: Settings,
    items: ["قريباً ...."],
  },
  {
    id: "marketing",
    title: "إدارة التسويق",
    icon: TrendingUp,
    items: ["قريباً ...."],
  },
  {
    id: "ai-diagnosis",
    title: "إدارة الذكاء الاصطناعي للتشخيص المبكر",
    icon: Brain,
    items: ["قريباً ...."],
  },
  {
    id: "big-data-analysis",
    title: "تحليل البيانات الضخمة لتوقع احتياجات المستشفى",
    icon: Database,
    items: ["قريباً ...."],
  },
  {
    id: "mental-health",
    title: "نظام إدارة الصحة النفسية",
    icon: Activity,
    items: ["قريباً ...."],
  },
  {
    id: "remote-monitoring",
    title: "مراقبة الحالة الصحية عن بُعد باستخدام أجهزة ذكية",
    icon: Wifi,
    items: ["قريباً ...."],
  },
  {
    id: "ai-hr",
    title: "إدارة الموارد البشرية بالذكاء الاصطناعي",
    icon: Users,
    items: ["قريباً ...."],
  },
  {
    id: "smart-tracking",
    title: "نظام التتبع الذكي للأدوية والمستلزمات",
    icon: MapPin,
    items: ["قريباً ...."],
  },
  {
    id: "remote-consultation",
    title: "خدمة الاستشارات الطبية عن بُعد بتقنية الواقع المعزز",
    icon: Video,
    items: ["قريباً ...."],
  },
  {
    id: "patient-experience",
    title: "نظام إدارة تجربة المريض الشخصية",
    icon: UserPlus,
    items: ["قريباً ...."],
  },
  {
    id: "performance-analysis",
    title: "تحليل البيانات لتقييم الأداء الطبي",
    icon: BarChart,
    items: ["قريباً ...."],
  },
  {
    id: "health-awareness",
    title: "نظام إدارة التوعية الصحية للمجتمع",
    icon: Megaphone,
    items: ["قريباً ...."],
  },
]

// تعريف الروابط المتاحة
const routeMapping: { [key: string]: string } = {
  "overview": "/admin",
  "hospital-0": "/admin/01-hospital/hospitals-and-branches",
  "hospital-1": "/admin/01-hospital/hospital-structure", 
  "hospital-2": "/admin/01-hospital/occupancy-preview",
  "hospital-3": "/admin/01-hospital/occupancy-reports",
  "hospital-4": "/admin/01-hospital/departments",
  "hospital-5": "/admin/01-hospital/stores",
  "general-definitions-0": "/admin/02-GeneralDefinition/productsUnits",
  "general-definitions-1": "/admin/02-GeneralDefinition/productsCategories",
  "general-definitions-2": "/admin/02-GeneralDefinition/products",
  "general-definitions-3": "/admin/02-GeneralDefinition/FinancialClauses",
  "general-definitions-4": "/admin/02-GeneralDefinition/Treasures",
  "general-definitions-5": "/admin/02-GeneralDefinition/Jobs",
  "general-definitions-6": "/admin/02-GeneralDefinition/HospitalRoomStatus",
  "medical-definitions-0": "/admin/03-MedecalDefinition/Radiology",
  "medical-definitions-1": "/admin/03-MedecalDefinition/MedicalServices",
  "medical-definitions-2": "/admin/03-MedecalDefinition/Disease",
  "medical-definitions-2-groups": "/admin/03-MedecalDefinition/Disease/disease-groups",
  "medical-definitions-3": "/admin/03-MedecalDefinition/MedicalOperations",
  "medical-definitions-4": "/admin/03-MedecalDefinition/MedicalSpecialties",
  "medical-definitions-5": "/admin/03-MedecalDefinition/Analysis",
  "medical-definitions-6": "/admin/03-MedecalDefinition/AnesthesiaTypes",
  "medical-definitions-7": "/admin/03-MedecalDefinition/PriceLists",
  "dealingViews-0": "/admin/04-DealingViews/Clients",
  "dealingViews-1": "/admin/04-DealingViews/Guarantors",
  "dealingViews-2": "/admin/04-DealingViews/Vendors",
  "dealingViews-3": "/admin/04-DealingViews/Employees",
  "dealingViews-4": "/admin/04-DealingViews/Banks",
  "dealingViews-5": "/admin/04-DealingViews/Doctors",
  "dealingViews-6": "/admin/04-DealingViews/ContractsDealings",
  "inventory-0": "/admin/05-Inventory/1-InventoryCreticalQty",
  "inventory-1": "/admin/05-Inventory/2-ShortageRequest",
  "inventory-2": "/admin/05-Inventory/3-PermissionInventoryAdd",
  "inventory-3": "/admin/05-Inventory/4-PermissionInventoryDeduction",
  "inventory-4": "/admin/05-Inventory/5-Settelments",
  "inventory-5": "/admin/05-Inventory/6-TransferBetweenStores",
  "inventory-6": "/admin/05-Inventory/7-InventoryQty",
  "inventory-7": "/admin/05-Inventory/8-ProductsMovement",
  "inventory-8": "/admin/05-Inventory/9-PeriodicInventory",
  "finance-0": "/admin/06-Financial/1-ExchangeMony",
  "finance-1": "/admin/06-Financial/2-SupplayMony",
  "finance-2": "/admin/06-Financial/3-TreasurTraffic",
  "finance-3": "/admin/06-Financial/4-TreasurTrafficByDate",
  "finance-4": "/admin/06-Financial/5-TreasurTrafficByClusesAndDate",
  "finance-5": "/admin/06-Financial/6-TreasurTrafficByCluses",
  "finance-6": "/admin/06-Financial/7-TranesiferMony",
  "finance-7": "/admin/06-Financial/8-TreasureMonyClosed",
  "finance-8": "/admin/06-Financial/9-ExchangeChecks",
  "finance-9": "/admin/06-Financial/10-SupplayChecks",
  "finance-10": "/admin/06-Financial/11-TrafficCheckDetails",
  "finance-11": "/admin/06-Financial/12-TrafficCheckGrouping",
  "finance-12": "/admin/06-Financial/13-BindDocumentWithFinancial",
}

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const pathname = usePathname()
  const [visibleGroups, setVisibleGroups] = useState<string[]>([])
  const [visibleItems, setVisibleItems] = useState<string[]>([])
  const [groupColors, setGroupColors] = useState<{[key: string]: string}>({})

  // تحميل الإعدادات المحفوظة
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedGroups = localStorage.getItem('adminSettingsVisibleGroups')
        const savedItems = localStorage.getItem('adminSettingsVisibleItems')
        const savedColors = localStorage.getItem('adminSettingsGroupColors')
        
        if (savedGroups) {
          const parsedGroups = JSON.parse(savedGroups)
          setVisibleGroups(parsedGroups)
        } else {
          // إذا لم تكن هناك إعدادات، اجعل جميع المجموعات مرئية
          setVisibleGroups(menuGroups.map(group => group.id))
        }
        
        if (savedItems) {
          const parsedItems = JSON.parse(savedItems)
          setVisibleItems(parsedItems)
        } else {
          // إذا لم تكن هناك إعدادات، اجعل جميع العناصر مرئية
          const allItemKeys: string[] = []
          menuGroups.forEach(group => {
            group.items.forEach((_, index) => {
              allItemKeys.push(`${group.id}:${index}`)
            })
          })
          setVisibleItems(allItemKeys)
        }

        if (savedColors) {
          const parsedColors = JSON.parse(savedColors)
          setGroupColors(parsedColors)
        }
      } catch (error) {
        console.error('خطأ في تحميل إعدادات القائمة:', error)
        // في حالة الخطأ، اجعل كل شيء مرئي
        setVisibleGroups(menuGroups.map(group => group.id))
        const allItemKeys: string[] = []
        menuGroups.forEach(group => {
          group.items.forEach((_, index) => {
            allItemKeys.push(`${group.id}:${index}`)
          })
        })
        setVisibleItems(allItemKeys)
      }
    }

    loadSettings()
    
    // الاستماع لتغييرات الإعدادات
    const handleSettingsChange = () => {
      loadSettings()
    }
    
    window.addEventListener('adminSettingsChanged', handleSettingsChange)
    
    return () => {
      window.removeEventListener('adminSettingsChanged', handleSettingsChange)
    }
  }, [])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => 
      prev.includes(groupId) 
        ? prev.filter((id) => id !== groupId) 
        : [...prev, groupId]
    )
  }

  return (
    <div className={`lg:col-span-1 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
      <Card className="h-[calc(200vh-400px)] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">القائمة الرئيسية</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-y-auto h-[calc(200vh-480px)]">
            <nav className="space-y-1">
              {/* نظرة عامة */}
              <Link
                href="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`block w-full text-right px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                  pathname === "/admin" ? "bg-green-50 text-green-600 border-r-2 border-green-600" : ""
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>نظرة عامة</span>
              </Link>

              {/* مجموعات القائمة */}
              {menuGroups
                .filter(group => visibleGroups.includes(group.id))
                .map((group) => {
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
                        <IconComponent 
                          className="w-5 h-5" 
                          style={{ color: groupColors[group.id] || '#6b7280' }}
                        />
                        <span className="font-medium text-gray-800 text-sm">{group.title}</span>
                      </div>
                      {group.items.length > 0 && (
                        isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {/* عناصر المجموعة */}
                    {isExpanded && group.items.length > 0 && (
                      <div className="bg-gray-50">
                        {group.items
                          .map((item, index) => {
                            const itemKey = `${group.id}:${index}`
                            const isItemVisible = visibleItems.includes(itemKey)
                            return { item, index, itemKey, isItemVisible }
                          })
                          .filter(({ isItemVisible }) => isItemVisible)
                          .map(({ item, index, itemKey }) => {
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
  )
}
