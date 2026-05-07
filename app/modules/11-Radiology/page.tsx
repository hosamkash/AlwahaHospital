"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Zap,
  ClipboardPlus,
  Radio,
  CalendarDays,
  ImageUp,
  FileText,
  CheckCheck,
  Archive,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const radiologySections = [
  { title: "تسجيل طلب أشعة", description: "تسجيل الطلبات الجديدة", icon: ClipboardPlus, href: "/pages/11-Radiology/تسجيل طلب أشعة", color: "bg-amber-500" },
  { title: "إدارة أنواع الأشعة", description: "تعريف أنواع الأشعة", icon: Radio, href: "/pages/11-Radiology/إدارة أنواع الأشعة", color: "bg-yellow-500" },
  { title: "جدولة الأشعة", description: "تنظيم المواعيد والجدولة", icon: CalendarDays, href: "/pages/11-Radiology/جدولة الأشعة", color: "bg-amber-600" },
  { title: "رفع صور الأشعة", description: "رفع الصور والملفات", icon: ImageUp, href: "/pages/11-Radiology/رفع صور الأشعة", color: "bg-yellow-600" },
  { title: "تقرير الأشعة", description: "تحرير التقارير", icon: FileText, href: "/pages/11-Radiology/تقرير الأشعة", color: "bg-amber-700" },
  { title: "مراجعة واعتماد التقرير", description: "المراجعة والاعتماد", icon: CheckCheck, href: "/pages/11-Radiology/مراجعة واعتماد التقرير", color: "bg-yellow-700" },
  { title: "أرشيف الأشعة", description: "أرشفة التقارير والصور", icon: Archive, href: "/pages/11-Radiology/أرشيف الأشعة", color: "bg-amber-800" },
]

export default function RadiologyPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Zap className="w-12 h-12 text-amber-600" />
          <h1 className="text-3xl font-bold text-gray-800">قسم الأشعة</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة شاملة لطلبات الأشعة والتقارير والأرشفة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {radiologySections.map((section, index) => {
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
                  <Button className="w-full group-hover:bg-amber-600 transition-colors">
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

