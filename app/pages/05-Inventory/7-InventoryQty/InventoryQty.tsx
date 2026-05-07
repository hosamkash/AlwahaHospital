"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Printer, DollarSign, RotateCcw, X } from "lucide-react"
import { 
  useInventoryQtyController, 
  inventoryQtyUtils 
} from "./InventoryQtyController"

type InventoryQtyProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function InventoryQty({ onCreate, onEdit }: InventoryQtyProps) {
  const {
    inventoryItems,
    handleDeleteItem,
    searchItems,
    updatePrices,
    hideZeroQuantities,
  } = useInventoryQtyController()

  const [searchTerm, setSearchTerm] = useState("")
  const [hideZeroFromColumn, setHideZeroFromColumn] = useState("")
  const [evaluationPrice, setEvaluationPrice] = useState("average")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredItems = searchItems(searchTerm)

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  const handleHideZeroQuantities = () => {
    if (hideZeroFromColumn) hideZeroQuantities(hideZeroFromColumn)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">الجرد المستمر ( رصيد الأصناف )</h2>
      </div>

      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label className="text-sm">إخفاء الكميات = 0 من عمود</Label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input className="w-32 pr-8" placeholder="اختر العمود" value={hideZeroFromColumn} onChange={(e) => setHideZeroFromColumn(e.target.value)} />
                <button onClick={() => setHideZeroFromColumn("")} className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <div className="relative">
                <select className="border border-gray-300 rounded px-3 py-1 text-sm appearance-none pr-8 w-32" value={hideZeroFromColumn} onChange={(e) => setHideZeroFromColumn(e.target.value)}>
                  <option value="">اختر العمود</option>
                  <option value="warehouseBalance">رصيد المخزن</option>
                  <option value="price">السعر</option>
                  <option value="total">الإجمالي</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <Button variant="outline" onClick={handleHideZeroQuantities}>تطبيق</Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-sm">تقييم المخزن بسعر</Label>
            <div className="relative">
              <select className="border border-gray-300 rounded px-3 py-1 text-sm appearance-none pr-8 w-40" value={evaluationPrice} onChange={(e) => setEvaluationPrice(e.target.value)}>
                <option value="average">متوسط السعر</option>
                <option value="last">آخر سعر</option>
                <option value="cost">سعر التكلفة</option>
                <option value="retail">سعر البيع</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <Input className="pl-10 pr-4 py-2 w-full" placeholder="أكتب هنا أي شيء تريد البحث عنه" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-700">#</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الفرع</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الباركود</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">المخزن</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الصنف</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">التصنيف</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الشركة المنتجة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">رصيد المخزن</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">السعر</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, idx) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => (onEdit ? onEdit(item.id) : null)}>
                    <td className="py-3 px-4 text-gray-600">{startIndex + idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{item.branch}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{item.barcode}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{item.warehouse}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{item.item}</td>
                    <td className="py-3 px-4 text-gray-600">{item.category}</td>
                    <td className="py-3 px-4 text-gray-600">{item.manufacturer}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{inventoryQtyUtils.formatQuantity(item.warehouseBalance)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{inventoryQtyUtils.formatValue(item.price)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{inventoryQtyUtils.formatValue(item.total)}</td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-gray-500">لا توجد أصناف</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">عرض {startIndex + 1} إلى {Math.min(endIndex, filteredItems.length)} من {filteredItems.length} صنف</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Button>
            <span className="px-3 py-1 text-sm">صفحة {currentPage} من {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">عدد العناصر في الصفحة</span>
            <div className="relative">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm appearance-none pr-8" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

