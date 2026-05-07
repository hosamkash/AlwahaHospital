"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  HandHeart,
  Users,
  HeartHandshake,
  Briefcase,
  Landmark,
  Stethoscope,
  Building2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const dealingSections = [
  { title: "العملاء – المرضي", description: "إدارة بيانات العملاء/المرضى", icon: Users, href: "/pages/04-DealingViews/Clients", color: "bg-orange-500" },
  { title: "المرافق - الضامن", description: "إدارة بيانات المرافقين والضمان", icon: HeartHandshake, href: "/pages/04-DealingViews/Guarantors", color: "bg-amber-500" },
  { title: "الموردين", description: "إدارة بيانات الموردين", icon: Briefcase, href: "/pages/04-DealingViews/Vendors", color: "bg-orange-600" },
  { title: "الموظفين", description: "إدارة بيانات الموظفين", icon: Building2, href: "/pages/04-DealingViews/Employees", color: "bg-amber-600" },
  { title: "البنوك", description: "إدارة بيانات البنوك", icon: Landmark, href: "/pages/04-DealingViews/Banks", color: "bg-orange-700" },
  { title: "الأطباء", description: "إدارة بيانات الأطباء", icon: Stethoscope, href: "/pages/04-DealingViews/Doctors", color: "bg-amber-700" },
  { title: "جهات التعاقد", description: "إدارة شركات التأمين وشركاء التعاقد", icon: HandHeart, href: "/pages/04-DealingViews/ContractsDealings", color: "bg-orange-800" },
]

export default function DealingViewsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <HandHeart className="w-12 h-12 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-800">جهات التعامل</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة شاملة لكل الجهات المرتبطة بالمستشفى من عملاء وموردين وأطباء وبنوك.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealingSections.map((section, index) => {
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
                  <Button className="w-full group-hover:bg-orange-600 transition-colors">
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

