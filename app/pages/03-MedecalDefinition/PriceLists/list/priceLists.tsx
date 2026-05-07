"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Printer } from "lucide-react"
import PriceListsItem from "../form/priceListsItem"
import { 
  usePriceListsController, 
  priceListUtils 
} from "./priceListsController"

type PriceListsProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function PriceLists({ onCreate, onEdit }: PriceListsProps) {
  const {
    priceLists,
    showPriceListDetails,
    selectedPriceList,
    isNewPriceList,
    handleNewPriceList,
    handleEditPriceList,
    handleCloseDetails,
    handleSavePriceList,
    handleDeletePriceList,
    searchPriceLists,
  } = usePriceListsController()

  const [searchTerm, setSearchTerm] = useState("")
  const filteredPriceLists = searchPriceLists(searchTerm)

  return (
    <div className="space-y-6">
      {showPriceListDetails && selectedPriceList ? (
        <PriceListsItem
          selectedPriceList={selectedPriceList}
          isNewPriceList={isNewPriceList}
          onClose={handleCloseDetails}
          onSave={handleSavePriceList}
        />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">قوائم الأسعار</h2>
            <div className="flex items-center gap-2">
              <Button className="bg-primary" onClick={() => (onCreate ? onCreate() : handleNewPriceList())}>
                <Plus className="w-4 h-4 ml-2" />
                جديد
              </Button>
              <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                <Edit className="w-4 h-4 ml-2" />
                تعديل
              </Button>
              <Button variant="outline" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
              <Button variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100">
                <Printer className="w-4 h-4 ml-2" />
                طباعة
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Input
              className="pl-10 pr-4 py-2 w-full"
              placeholder="ابحث عن قائمة أسعار...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الكود</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">اسم قائمة الأسعار</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الوصف</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">نوع الخصم</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">نسبة الخصم العامة</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">عدد العناصر</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">نشط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPriceLists.map((priceList) => {
                      const totalItems = priceList.services.length + priceList.items.length + 
                                       priceList.analysis.length + priceList.radiology.length + 
                                       priceList.operations.length
                      
                      return (
                        <tr key={priceList.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                                onClick={() => (onEdit ? onEdit(priceList.id) : handleEditPriceList(priceList))}
                              >
                                <Edit className="w-3 h-3 ml-1" />
                                تعديل
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                onClick={() => handleDeletePriceList(priceList.id)}
                              >
                                <Trash2 className="w-3 h-3 ml-1" />
                                حذف
                              </Button>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-sm text-gray-600">
                            {priceList.code}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-800">
                            {priceList.name}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {priceList.description}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {priceListUtils.getDiscountTypeText(priceList.discountType)}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {priceList.globalDiscountPercentage}%
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {totalItems}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priceListUtils.getStatusColor(priceList.active)}`}>
                              {priceListUtils.getStatusText(priceList.active)}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Empty State */}
          {filteredPriceLists.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد قوائم أسعار</h3>
              <p className="text-gray-500 mb-4">ابدأ بإنشاء قائمة أسعار جديدة لإدارة أسعار الخدمات والمنتجات</p>
              <Button className="bg-primary" onClick={() => (onCreate ? onCreate() : handleNewPriceList())}>
                <Plus className="w-4 h-4 ml-2" />
                إنشاء قائمة أسعار جديدة
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
