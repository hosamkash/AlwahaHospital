"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Microscope,
  FlaskConical,
  TestTubes,
  SquareEqual,
  Ruler,
  Activity,
  ListChecks,
  Bell,
  ClipboardPlus,
  Droplets,
  Beaker,
  CalendarDays,
  ClipboardCheck,
  CheckCheck,
  Printer,
  Archive,
  Wrench,
  Boxes,
  BarChart,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const labSections = [
  { title: "أنواع العينات", description: "إدارة أنواع العينات", icon: FlaskConical, href: "/pages/10-Laboratory/أنواع العينات", color: "bg-violet-500" },
  { title: "أنواع الأوعية", description: "إدارة أنواع الأوعية", icon: TestTubes, href: "/pages/10-Laboratory/أنواع الأوعية", color: "bg-purple-500" },
  { title: "نوع نتيجة التحاليل", description: "تعريف نوع النتائج", icon: SquareEqual, href: "/pages/10-Laboratory/نوع نتيجة التحاليل", color: "bg-violet-600" },
  { title: "وحدة قياس التحليل", description: "تعريف وحدات القياس", icon: Ruler, href: "/pages/10-Laboratory/وحدة قياس التحليل", color: "bg-purple-600" },
  { title: "التحاليل الطبية", description: "إدارة التحاليل", icon: Activity, href: "/pages/10-Laboratory/التحاليل الطبية", color: "bg-violet-700" },
  { title: "مجموعات التحاليل الطبية", description: "إدارة مجموعات التحاليل", icon: ListChecks, href: "/pages/10-Laboratory/مجموعات التحاليل الطبية", color: "bg-purple-700" },
  { title: "كومنتات نتائج التحاليل", description: "إدارة التعليقات الجاهزة", icon: ClipboardCheck, href: "/pages/10-Laboratory/كومنتات نتائج التحاليل", color: "bg-violet-800" },
  { title: "تنبيهات نتائج التحاليل", description: "تعريف التنبيهات", icon: Bell, href: "/pages/10-Laboratory/تنبيهات نتائج التحاليل", color: "bg-purple-800" },
  { title: "تسجيل طلب فحص (حافظة التحاليل)", description: "تسجيل طلبات الفحص", icon: ClipboardPlus, href: "/pages/10-Laboratory/تسجيل طلب فحص (حافظة التحاليل)", color: "bg-violet-900" },
  { title: "استلام (سحب) العينات", description: "استلام العينات", icon: Droplets, href: "/pages/10-Laboratory/استلام (سحب) العينات", color: "bg-purple-900" },
  { title: "إدارة أنواع التحاليل", description: "إدارة الأنواع", icon: Beaker, href: "/pages/10-Laboratory/إدارة أنواع التحاليل", color: "bg-violet-500" },
  { title: "جدولة التحاليل", description: "جدولة أعمال المختبر", icon: CalendarDays, href: "/pages/10-Laboratory/جدولة التحاليل", color: "bg-purple-500" },
  { title: "المهام اليومية", description: "المهام اليومية للمختبر", icon: ClipboardCheck, href: "/pages/10-Laboratory/المهام اليومية", color: "bg-violet-600" },
  { title: "تسجيل نتائج التحاليل", description: "تسجيل النتائج", icon: CheckCheck, href: "/pages/10-Laboratory/تسجيل نتائج التحاليل", color: "bg-purple-600" },
  { title: "مراجعة واعتماد النتائج", description: "مراجعة واعتماد", icon: CheckCheck, href: "/pages/10-Laboratory/مراجعة واعتماد النتائج", color: "bg-violet-700" },
  { title: "طباعة تقارير التحاليل", description: "طباعة التقارير", icon: Printer, href: "/pages/10-Laboratory/طباعة تقارير التحاليل", color: "bg-purple-700" },
  { title: "أرشيف نتائج المرضى", description: "أرشيف النتائج", icon: Archive, href: "/pages/10-Laboratory/أرشيف نتائج المرضى", color: "bg-violet-800" },
  { title: "إدارة الأجهزة والمعايرة", description: "إدارة الأجهزة", icon: Wrench, href: "/pages/10-Laboratory/إدارة الأجهزة والمعايرة", color: "bg-purple-800" },
  { title: "إدارة مواد وأدوات التحاليل", description: "مواد وأدوات المختبر", icon: Boxes, href: "/pages/10-Laboratory/إدارة مواد وأدوات التحاليل", color: "bg-violet-900" },
  { title: "تقارير إحصائية للمختبر", description: "تقارير وإحصائيات", icon: BarChart, href: "/pages/10-Laboratory/تقارير إحصائية للمختبر", color: "bg-purple-900" },
]

export default function LaboratoryPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Microscope className="w-12 h-12 text-violet-600" />
          <h1 className="text-3xl font-bold text-gray-800">قسم (المختبر) معمل التحاليل الطبية</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة كاملة لتعريفات المختبر وجدولة العمل وتسجيل ومراجعة النتائج.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labSections.map((section, index) => {
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
                  <Button className="w-full group-hover:bg-violet-600 transition-colors">
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

