"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Receipt,
  ShoppingCart,
  RotateCcw,
  FileText,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const invoicesSections = [
  { title: "فواتير المشتريات", description: "إدارة فواتير المشتريات", icon: ShoppingCart, href: "/pages/07-Invoices/فواتير المشتريات", color: "bg-cyan-500" },
  { title: "فواتير مرتجعات المشتريات", description: "إدارة مرتجعات المشتريات", icon: RotateCcw, href: "/pages/07-Invoices/فواتير مرتجعات المشتريات", color: "bg-sky-500" },
  { title: "فواتير المبيعات", description: "إدارة فواتير المبيعات", icon: FileText, href: "/pages/07-Invoices/فواتير المبيعات", color: "bg-cyan-600" },
  { title: "فواتير مرتجعات المبيعات", description: "إدارة مرتجعات المبيعات", icon: RotateCcw, href: "/pages/07-Invoices/فواتير مرتجعات المبيعات", color: "bg-sky-600" },
]

export default function InvoicesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Receipt className="w-12 h-12 text-cyan-600" />
          <h1 className="text-3xl font-bold text-gray-800">إدارة الفواتير</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة فواتير المشتريات والمبيعات والمرتجعات.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoicesSections.map((section, index) => {
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
                  <Button className="w-full group-hover:bg-cyan-600 transition-colors">
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

