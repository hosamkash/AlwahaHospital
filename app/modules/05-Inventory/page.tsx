"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Package,
  AlertTriangle,
  ClipboardList,
  PlusSquare,
  MinusSquare,
  Scale,
  ArrowLeftRight,
  Layers,
  ReceiptText,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const inventorySections = [
  { title: "الأرصدة الحرجة وحد الطلب", description: "متابعة الحدود الحرجة للصنف", icon: AlertTriangle, href: "/modules/05-Inventory/1-InventoryCreticalQty", color: "bg-indigo-500" },
  { title: "طلبات نواقص الأصناف", description: "تجميع ورفع طلبات النواقص", icon: ClipboardList, href: "/modules/05-Inventory/2-ShortageRequest", color: "bg-violet-500" },
  { title: "إذن إضافة", description: "تسجيل إذون إضافة للمخزن", icon: PlusSquare, href: "/modules/05-Inventory/3-PermissionInventoryAdd", color: "bg-indigo-600" },
  { title: "إذن خصم", description: "تسجيل إذون خصم من المخزن", icon: MinusSquare, href: "/modules/05-Inventory/4-PermissionInventoryDeduction", color: "bg-violet-600" },
  { title: "تسوية الأصناف", description: "تسجيل تسويات العجز والزيادة", icon: Scale, href: "/modules/05-Inventory/5-Settelments", color: "bg-indigo-700" },
  { title: "التحويل بين المخازن", description: "تحويل الأصناف بين المخازن", icon: ArrowLeftRight, href: "/modules/05-Inventory/6-TransferBetweenStores", color: "bg-violet-700" },
  { title: "الجرد المستمر", description: "متابعة الكميات أولاً بأول", icon: Layers, href: "/modules/05-Inventory/7-InventoryQty", color: "bg-indigo-800" },
  { title: "كارت الصنف", description: "حركة الصنف وتكلفته", icon: ReceiptText, href: "/modules/05-Inventory/8-ProductsMovement", color: "bg-violet-800" },
  { title: "الجرد الدوري", description: "جرد شامل في فترات محددة", icon: Layers, href: "/modules/05-Inventory/9-PeriodicInventory", color: "bg-indigo-900" },
]

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Package className="w-12 h-12 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">إدارة المخازن</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          إدارة عمليات المخزون من الإذن وحتى الجرد.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventorySections.map((section, index) => {
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
                  <Button className="w-full group-hover:bg-indigo-600 transition-colors">
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

