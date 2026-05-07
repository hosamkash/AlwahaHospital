"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, DollarSign, Bed, Briefcase, Package, Tag, Scale, Building2, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function GeneralDefinitionsModule() {
  const generalDefinitionsStats = [
    {
      title: "إجمالي التعريفات",
      value: "7",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "موديولات فرعية"
    },
    {
      title: "المنتجات",
      value: "245",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "منتج مسجل"
    },
    {
      title: "الوظائف",
      value: "18",
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "وظيفة محددة"
    },
    {
      title: "الخزائن",
      value: "12",
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "خزينة نشطة"
    }
  ]

  const quickActions = [
    {
      title: "إضافة منتج جديد",
      description: "إضافة منتج أو مستلزم جديد",
      icon: Package,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      link: "/modules/02-GeneralDefinition/products"
    },
    {
      title: "إدارة الوظائف",
      description: "إضافة أو تعديل الوظائف",
      icon: Briefcase,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      link: "/modules/02-GeneralDefinition/Jobs"
    },
    {
      title: "البنود المالية",
      description: "إدارة البنود والشروط المالية",
      icon: DollarSign,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      link: "/modules/02-GeneralDefinition/FinancialClauses"
    },
    {
      title: "إدارة الخزائن",
      description: "إدارة الخزائن والمخازن",
      icon: Building2,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      link: "/modules/02-GeneralDefinition/Treasures"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">التعريفات العامة</h1>
        <p className="text-gray-600 text-lg">نظام شامل لإدارة التعريفات والتصنيفات الأساسية</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {generalDefinitionsStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">الإجراءات السريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.link} target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 ${action.color} ${action.hoverColor} rounded-full flex items-center justify-center mb-4 transition-colors`}>
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            النشاط الأخير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "تم إضافة منتج جديد", time: "منذ ساعتين", type: "إضافة" },
              { action: "تم تحديث تصنيف المنتجات", time: "منذ 4 ساعات", type: "تحديث" },
              { action: "تم إضافة وظيفة جديدة", time: "منذ 6 ساعات", type: "إضافة" },
              { action: "تم تحديث البنود المالية", time: "منذ يوم", type: "تحديث" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.type === 'إضافة' ? 'bg-green-100 text-green-800' :
                  activity.type === 'تحديث' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'حذف' ? 'bg-red-100 text-red-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
