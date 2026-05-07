"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  DollarSign,
  FileText,
  Receipt,
  CalendarDays,
  Layers,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const financeSections = [
  { title: "سندات الدفع", description: "تسجيل سندات الدفع", icon: FileText, href: "/pages/06-Financial/1-ExchangeMony", color: "bg-emerald-500" },
  { title: "سندات القبض", description: "تسجيل سندات القبض", icon: Receipt, href: "/pages/06-Financial/2-SupplayMony", color: "bg-green-500" },
  { title: "حركة الخزينة تفصيلي", description: "عرض الحركة تفصيلي", icon: Layers, href: "/pages/06-Financial/3-TreasurTraffic", color: "bg-emerald-600" },
  { title: "حركة الخزينة - تجميع بالتاريخ", description: "تجميع حسب التاريخ", icon: CalendarDays, href: "/pages/06-Financial/4-TreasurTrafficByDate", color: "bg-green-600" },
  { title: "حركة الخزينة - تجميع ببنود النقدية والتاريخ", description: "تجميع ببنود النقدية والتاريخ", icon: Layers, href: "/pages/06-Financial/5-TreasurTrafficByClusesAndDate", color: "bg-emerald-700" },
  { title: "حركة الخزينة - تجميع ببنود النقدية", description: "تجميع ببنود النقدية", icon: Layers, href: "/pages/06-Financial/6-TreasurTrafficByCluses", color: "bg-green-700" },
  { title: "تحويلات النقدية", description: "إدارة التحويلات النقدية", icon: DollarSign, href: "/pages/06-Financial/7-TranesiferMony", color: "bg-emerald-800" },
  { title: "تقفيل يومية الخزينة", description: "تقفيل اليومية", icon: FileText, href: "/pages/06-Financial/8-TreasureMonyClosed", color: "bg-green-800" },
  { title: "شيكات الدفع", description: "إدارة شيكات الدفع", icon: Receipt, href: "/pages/06-Financial/9-ExchangeChecks", color: "bg-emerald-900" },
  { title: "شيكات القبض", description: "إدارة شيكات القبض", icon: Receipt, href: "/pages/06-Financial/10-SupplayChecks", color: "bg-green-900" },
  { title: "حركة الشيكات تفصيلي", description: "عرض حركة الشيكات تفصيلي", icon: Layers, href: "/pages/06-Financial/11-TrafficCheckDetails", color: "bg-emerald-500" },
  { title: "حركة الشيكات تجميعي", description: "عرض حركة الشيكات تجميعي", icon: Layers, href: "/pages/06-Financial/12-TrafficCheckGrouping", color: "bg-emerald-600" },
  { title: "ربط المستندات بالنقدية", description: "ربط المستندات بالحركة النقدية", icon: FileText, href: "/pages/06-Financial/13-BindDocumentWithFinancial", color: "bg-green-600" },
]

export default function FinancialPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <DollarSign className="w-12 h-12 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-800">الماليات</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة شاملة لحركة النقدية والشيكات والتقارير.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financeSections.map((section, index) => {
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
                  <Button className="w-full group-hover:bg-emerald-600 transition-colors">
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

