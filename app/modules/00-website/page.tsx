"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Globe, 
  Heart, 
  Eye, 
  Phone, 
  Users, 
  Handshake,
  ArrowRight,
  Edit,
  Settings
} from "lucide-react"
import Link from "next/link"

const websiteSections = [
  {
    title: "عن مستشفى الواحة التخصصي",
    description: "إدارة المحتوى التعريفي بالمستشفى وتاريخه ومرافقه",
    icon: Globe,
    href: "/pages/00-website/about-hospital",
    color: "bg-blue-500",
    stats: "محتوى ديناميكي"
  },
  {
    title: "خدماتنا الطبية",
    description: "إدارة الخدمات الطبية المقدمة والعروض الخاصة",
    icon: Heart,
    href: "/pages/00-website/medical-services",
    color: "bg-red-500",
    stats: "خدمات متعددة"
  },
  {
    title: "رؤيتنا ورسالتنا",
    description: "إدارة الرؤية والرسالة والقيم المؤسسية",
    icon: Eye,
    href: "/pages/00-website/vision-mission",
    color: "bg-green-500",
    stats: "قيم مؤسسية"
  },
  {
    title: "اتصل بنا",
    description: "إدارة معلومات التواصل والموقع والمواعيد",
    icon: Phone,
    href: "/pages/00-website/contact-us",
    color: "bg-purple-500",
    stats: "معلومات التواصل"
  },
  {
    title: "فريقنا الطبي",
    description: "إدارة بيانات الأطباء والاستشاريين",
    icon: Users,
    href: "/pages/00-website/medical-team",
    color: "bg-orange-500",
    stats: "فريق طبي"
  },
  {
    title: "جهات التعاقد",
    description: "إدارة شركات التأمين وشركاء التعاقد",
    icon: Handshake,
    href: "/pages/00-website/contracting-parties",
    color: "bg-teal-500",
    stats: "شراكات"
  }
]

export default function WebsitePage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Globe className="w-12 h-12 text-primary" />
          <h1 className="text-3xl font-bold text-gray-800">إدارة الموقع الإلكتروني</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة شاملة لمحتوى الموقع الإلكتروني لمستشفى الواحة التخصصي
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Edit className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-800">تحرير سريع</h3>
                <p className="text-sm text-gray-600">تعديل المحتوى الأساسي</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-800">إعدادات الموقع</h3>
                <p className="text-sm text-gray-600">تخصيص المظهر والسلوك</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-800">معاينة الموقع</h3>
                <p className="text-sm text-gray-600">عرض الموقع للمستخدمين</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Website Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websiteSections.map((section, index) => {
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
                    <p className="text-sm text-gray-500">{section.stats}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                <Link href={section.href}>
                  <Button className="w-full bg-primary group-hover:opacity-90 transition-colors">
                    إدارة المحتوى
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-600">أقسام الموقع</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">محتوى محدث</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600">متاح دائماً</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">مستجيب</div>
            <div className="text-sm text-gray-600">جميع الأجهزة</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
