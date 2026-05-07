"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Stethoscope, Calendar, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HospitalPage() {
  const hospitalStats = [
    {
      title: "إجمالي المستشفيات",
      value: "3",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "مستشفيات وفروع"
    },
    {
      title: "الأقسام الطبية",
      value: "12",
      icon: Stethoscope,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "أقسام متخصصة"
    },
    {
      title: "الطاقم الطبي",
      value: "156",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "طبيب وممرض"
    },
    {
      title: "المواعيد اليوم",
      value: "89",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "مواعيد مخططة"
    }
  ]

  const quickActions = [
    {
      title: "إضافة قسم جديد",
      description: "إضافة قسم طبي جديد للمستشفى",
      icon: Stethoscope,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      link: "/pages/01-hospital/medical-departments"
    },
    {
      title: "إدارة الغرف",
      description: "إدارة الغرف والأسرة",
      icon: Building2,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      link: "/pages/01-hospital/rooms-and-beds"
    },
    {
      title: "الطاقم الطبي",
      description: "إدارة الطاقم الطبي",
      icon: Users,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      link: "/pages/01-hospital/medical-staff"
    },
    {
      title: "التقارير",
      description: "عرض التقارير الطبية",
      icon: FileText,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      link: "/pages/01-hospital/medical-reports"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">إدارة المستشفى</h1>
        <p className="text-gray-600 text-lg">نظام شامل لإدارة المستشفى والأقسام الطبية</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hospitalStats.map((stat, index) => (
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
                    <div className={`w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 transition-colors`}>
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
            <TrendingUp className="w-5 h-5 text-blue-600" />
            النشاط الأخير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "تم إضافة قسم جديد", time: "منذ ساعتين", type: "إضافة" },
              { action: "تم تحديث بيانات الطاقم", time: "منذ 4 ساعات", type: "تحديث" },
              { action: "تم حجز موعد جديد", time: "منذ 6 ساعات", type: "حجز" },
              { action: "تم إصدار تقرير طبي", time: "منذ يوم", type: "تقرير" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.type === 'إضافة' ? 'bg-green-100 text-green-800' :
                  activity.type === 'تحديث' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'حجز' ? 'bg-purple-100 text-purple-800' :
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