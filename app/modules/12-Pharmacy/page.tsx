"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Pill,
  ClipboardPlus,
  Syringe,
  Stethoscope,
  Boxes,
  Bell,
  ClipboardList,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const pharmacySections = [
  { title: "طلب دواء", description: "تسجيل طلبات الأدوية", icon: ClipboardPlus, href: "/pages/12-Pharmacy/طلب دواء", color: "bg-lime-500" },
  { title: "صرف دواء للعيادات / المرضى", description: "صرف الأدوية للمرضى والعيادات", icon: Syringe, href: "/pages/12-Pharmacy/صرف دواء للعيادات / المرضى", color: "bg-green-500" },
  { title: "إدارة وصفات الأطباء", description: "إدارة الوصفات الطبية", icon: Stethoscope, href: "/pages/12-Pharmacy/إدارة وصفات الأطباء", color: "bg-lime-600" },
  { title: "إدارة مخزون الأدوية", description: "إدارة المخزون", icon: Boxes, href: "/pages/12-Pharmacy/إدارة مخزون الأدوية", color: "bg-green-600" },
  { title: "تنبيهات انتهاء الصلاحية", description: "متابعة انتهاء الصلاحية", icon: Bell, href: "/pages/12-Pharmacy/تنبيهات انتهاء الصلاحية", color: "bg-lime-700" },
  { title: "جرد الصيدلية", description: "إجراء الجرد الدوري", icon: ClipboardList, href: "/pages/12-Pharmacy/جرد الصيدلية", color: "bg-green-700" },
  { title: "تقارير الصيدلية", description: "تقارير وإحصائيات", icon: BarChart3, href: "/pages/12-Pharmacy/تقارير الصيدلية", color: "bg-lime-800" },
]

export default function PharmacyPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Pill className="w-12 h-12 text-lime-600" />
          <h1 className="text-3xl font-bold text-gray-800">قسم الصيدلية</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة طلبات الأدوية والصرف والوصفات والمخزون والتقارير.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pharmacySections.map((section, index) => {
          const IconComponent = section.icon
          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${section.color} text-white`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-800">{section.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                <Link href={section.href} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full group-hover:bg-lime-600 transition-colors">
                    إدارة المحتوى
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

