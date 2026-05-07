"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Stethoscope,
  Radiation,
  Activity,
  GitBranch,
  HeartPulse,
  Microscope,
  Syringe,
  ListChecks,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const medicalSections = [
  {
    title: "الأشعات",
    description: "إدارة أنواع الأشعة والطلبات ونتائج التقارير",
    icon: Radiation,
    href: "/pages/03-MedecalDefinition/Radiology",
    color: "bg-red-500",
  },
  {
    title: "الخدمات الطبية",
    description: "إدارة الخدمات الطبية والتسعير",
    icon: Activity,
    href: "/pages/03-MedecalDefinition/MedicalServices",
    color: "bg-orange-500",
  },
  {
    title: "الأمراض",
    description: "إدارة الأمراض ومجموعاتها",
    icon: ListChecks,
    href: "/pages/03-MedecalDefinition/Disease",
    color: "bg-rose-500",
  },
  {
    title: "تعريف العمليات",
    description: "إدارة العمليات وأنواعها",
    icon: GitBranch,
    href: "/pages/03-MedecalDefinition/MedicalOperations",
    color: "bg-pink-500",
  },
  {
    title: "التخصصات الطبية",
    description: "إدارة التخصصات الطبية",
    icon: HeartPulse,
    href: "/pages/03-MedecalDefinition/MedicalSpecialties",
    color: "bg-red-600",
  },
  {
    title: "التحاليل الطبية",
    description: "إدارة التحاليل وأنواع النتائج والوحدات",
    icon: Microscope,
    href: "/pages/03-MedecalDefinition/Analysis",
    color: "bg-fuchsia-600",
  },
  {
    title: "أنواع التخدير",
    description: "إدارة أنواع التخدير",
    icon: Syringe,
    href: "/pages/03-MedecalDefinition/AnesthesiaTypes",
    color: "bg-rose-600",
  },
  {
    title: "قوائم الأسعار",
    description: "إدارة قوائم الأسعار الطبية",
    icon: Stethoscope,
    href: "/pages/03-MedecalDefinition/PriceLists",
    color: "bg-red-700",
  },
]

export default function MedicalDefinitionsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Stethoscope className="w-12 h-12 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-800">التعريفات الطبية</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة جميع التصنيفات والتعريفات الطبية الأساسية للنظام.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicalSections.map((section, index) => {
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
                  <Button className="w-full group-hover:bg-red-600 transition-colors">
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

