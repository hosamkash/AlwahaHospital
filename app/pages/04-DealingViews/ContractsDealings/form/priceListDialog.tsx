"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Printer } from "lucide-react"

interface PriceListItem {
  id: number
  code: string
  name: string
  originalPrice: number
  discountValue: number
  discountPercentage: number
  listPrice: number
  finalPrice: number
  type: string
}

interface PriceList {
  id: number
  code: string
  name: string
  description: string
  active: boolean
  discountType: string
  globalDiscountPercentage: number
  services: PriceListItem[]
  items: PriceListItem[]
  analysis: PriceListItem[]
  radiology: PriceListItem[]
  operations: PriceListItem[]
}

interface PriceListDialogProps {
  priceList: PriceList | null
  isOpen: boolean
  onClose: () => void
}

const tabData = [
  { id: "services", name: "الخدمات الطبية" },
  { id: "items", name: "الأصناف" },
  { id: "analysis", name: "التحاليل" },
  { id: "radiology", name: "الأشعة" },
  { id: "operations", name: "العمليات" },
]

const discountTypes = [
  { value: "percentage", label: "نسبة مئوية" },
  { value: "fixed", label: "قيمة ثابتة" },
]

const priceListUtils = {
  formatNumber: (num: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(num)
  }
}

export default function PriceListDialog({ priceList, isOpen, onClose }: PriceListDialogProps) {
  const [activeTab, setActiveTab] = useState("services")

  if (!isOpen || !priceList) return null

  // حساب الإجماليات
  const calculateTotals = () => {
    const allItems = [...priceList.services, ...priceList.items, ...priceList.analysis, ...priceList.radiology, ...priceList.operations]
    
    const totalOriginal = allItems.reduce((sum, item) => sum + item.originalPrice, 0)
    const totalDiscount = allItems.reduce((sum, item) => sum + (item.originalPrice - item.finalPrice), 0)
    const totalFinal = allItems.reduce((sum, item) => sum + item.finalPrice, 0)

    return { totalOriginal, totalDiscount, totalFinal }
  }

  const totals = calculateTotals()

  // الحصول على العناصر الحالية للتبويب
  const getCurrentItems = () => {
    switch (activeTab) {
      case "services": return priceList.services
      case "items": return priceList.items
      case "analysis": return priceList.analysis
      case "radiology": return priceList.radiology
      case "operations": return priceList.operations
      default: return []
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-800">
              تفاصيل قائمة الأسعار: {priceList.name}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100">
                <Printer className="w-4 h-4 ml-2" />
                طباعة
              </Button>
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 ml-2" />
                إغلاق
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Identification Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">البيانات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الكود</label>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                    {priceList.code}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم قائمة الأسعار</label>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                    {priceList.name}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800 min-h-[60px]">
                  {priceList.description || "لا يوجد وصف"}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع الخصم</label>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                    {discountTypes.find(type => type.value === priceList.discountType)?.label}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نسبة الخصم العامة (%)</label>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                    {priceList.globalDiscountPercentage}%
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={priceList.active}
                    readOnly
                    className="ml-2"
                  />
                  <label className="mr-2 text-sm font-medium text-gray-700">نشط</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Global Totals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">الإجماليات العامة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{priceListUtils.formatNumber(totals.totalOriginal)}</div>
                  <div className="text-sm text-gray-600">إجمالي الأسعار الأصلية</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{priceListUtils.formatNumber(totals.totalDiscount)}</div>
                  <div className="text-sm text-gray-600">إجمالي الخصومات</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{priceListUtils.formatNumber(totals.totalFinal)}</div>
                  <div className="text-sm text-gray-600">إجمالي الأسعار النهائية</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">تفاصيل العناصر</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {tabData.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {tabData.find(tab => tab.id === activeTab)?.name}
                </h3>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-right py-3 px-4 font-medium text-gray-700">#</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">الكود</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">اسم العنصر</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">السعر الأصلي</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">ق. الخصم</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">ن. الخصم</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">سعر القائمة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">السعر النهائي</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getCurrentItems().map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                          <td className="py-3 px-4 font-mono text-sm text-gray-600">{item.code}</td>
                          <td className="py-3 px-4 font-semibold text-gray-800">{item.name}</td>
                          <td className="py-3 px-4 text-gray-600">{priceListUtils.formatNumber(item.originalPrice)}</td>
                          <td className="py-3 px-4 text-gray-600">{priceListUtils.formatNumber(item.discountValue)}</td>
                          <td className="py-3 px-4 text-gray-600">{item.discountPercentage}%</td>
                          <td className="py-3 px-4 text-gray-600">{priceListUtils.formatNumber(item.listPrice)}</td>
                          <td className="py-3 px-4 font-semibold text-gray-800">{priceListUtils.formatNumber(item.finalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Empty State for Tab */}
                {getCurrentItems().length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                      <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">لا توجد عناصر في هذا التبويب</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
