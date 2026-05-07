"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  UserCheck,
  Users,
  Briefcase,
  CalendarDays,
  Clock,
  Ban,
  Plane,
  PiggyBank,
  BadgeDollarSign,
  FileMinus,
  Scale,
  Gavel,
  MoveRight,
  LogOut,
  FileArchive,
  ShieldCheck,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const hrSections = [
  { title: "بيانات الموظفين", description: "إدارة بيانات الموظفين", icon: Users, href: "/pages/09-HR/بيانات الموظفين", color: "bg-pink-500" },
  { title: "الأقسام والوظائف", description: "إدارة الهيكل الوظيفي", icon: Briefcase, href: "/pages/09-HR/الأقسام والوظائف", color: "bg-rose-500" },
  { title: "جداول العمل (الشيفتات)", description: "تخطيط الجداول", icon: CalendarDays, href: "/pages/09-HR/جداول العمل (الشيفتات)", color: "bg-pink-600" },
  { title: "الحضور والانصراف", description: "تسجيل الحضور والانصراف", icon: Clock, href: "/pages/09-HR/الحضور والانصراف", color: "bg-rose-600" },
  { title: "التأخيرات والانصراف المبكر", description: "متابعة التأخيرات", icon: Clock, href: "/pages/09-HR/التأخيرات والانصراف المبكر", color: "bg-pink-700" },
  { title: "الغياب", description: "إدارة الغياب", icon: Ban, href: "/pages/09-HR/الغياب", color: "bg-rose-700" },
  { title: "الإجازات", description: "إدارة الإجازات", icon: Plane, href: "/pages/09-HR/الإجازات", color: "bg-pink-800" },
  { title: "السلف والقروض", description: "إدارة السلف والقروض", icon: PiggyBank, href: "/pages/09-HR/السلف والقروض", color: "bg-rose-800" },
  { title: "المرتبات والحوافز", description: "إدارة الرواتب والحوافز", icon: BadgeDollarSign, href: "/pages/09-HR/المرتبات والحوافز", color: "bg-pink-900" },
  { title: "الخصومات والاستقطاعات", description: "إدارة الخصومات", icon: FileMinus, href: "/pages/09-HR/الخصومات والاستقطاعات", color: "bg-rose-900" },
  { title: "التسويات المالية", description: "تسويات الرواتب", icon: Scale, href: "/pages/09-HR/التسويات المالية", color: "bg-pink-500" },
  { title: "العقاب والمكافآت", description: "إدارة الجزاءات والمكافآت", icon: Gavel, href: "/pages/09-HR/العقاب والمكافآت", color: "bg-rose-500" },
  { title: "الترقيات والتنقلات", description: "إدارة الترقيات", icon: MoveRight, href: "/pages/09-HR/الترقيات والتنقلات", color: "bg-pink-600" },
  { title: "إنهاء الخدمة والاستقالات", description: "نهاية الخدمة", icon: LogOut, href: "/pages/09-HR/إنهاء الخدمة والاستقالات", color: "bg-rose-600" },
  { title: "أرشيف المستندات", description: "أرشفة المستندات", icon: FileArchive, href: "/pages/09-HR/أرشيف المستندات", color: "bg-pink-700" },
  { title: "إدارة المستخدمين والصلاحيات", description: "صلاحيات المستخدمين", icon: ShieldCheck, href: "/pages/09-HR/إدارة المستخدمين والصلاحيات", color: "bg-rose-700" },
  { title: "تقارير شئون العاملين", description: "تقارير وتحليلات", icon: BarChart3, href: "/pages/09-HR/تقارير شئون العاملين", color: "bg-pink-800" },
]

export default function HRPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <UserCheck className="w-12 h-12 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-800">إدارة شئون العاملين</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة شاملة لملفات الموظفين والحضور والرواتب والتقارير.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hrSections.map((section, index) => {
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
                  <Button className="w-full group-hover:bg-pink-600 transition-colors">
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

