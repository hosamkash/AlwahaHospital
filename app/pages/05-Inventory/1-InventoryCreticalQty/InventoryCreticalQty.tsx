"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Printer, RefreshCw, X, Grid, Filter } from "lucide-react"
import { 
  useInventoryController, 
  inventoryUtils 
} from "./InventoryCreticalQtyController"

export default function InventoryCreticalQty() {
  const {
    inventoryItems,
    handleNewItem,
    handleEditItem,
    handleDeleteItem,
    searchInventoryItems,
    createPurchaseInvoice,
    refreshData,
  } = useInventoryController()

  const [searchTerm, setSearchTerm] = useState("")
  const filteredItems = searchInventoryItems(searchTerm)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">عرض الأرصدة الحرجة - حد الطلب</h2>
                 <div className="flex items-center gap-2">
           <Button 
             className="bg-primary" 
             onClick={createPurchaseInvoice}
           >
             <Grid className="w-4 h-4 ml-2" />
             إنشاء فاتورة مشتريات
           </Button>
           <Button 
             className="bg-primary"
           >
             <Grid className="w-4 h-4 ml-2" />
             انشاء طلب النواقص
           </Button>
           <Button 
             variant="outline" 
             onClick={refreshData}
           >
             <RefreshCw className="w-4 h-4 ml-2" />
             تحديث
           </Button>
           <Button variant="outline">
             <X className="w-4 h-4 ml-2" />
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
          placeholder="ابحث عن صنف أو باركود...."
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
                   <th className="text-right py-3 px-4 font-medium text-gray-700">الفرع</th>
                   <th className="text-right py-3 px-4 font-medium text-gray-700">المخزن</th>
                   <th className="text-right py-3 px-4 font-medium text-gray-700">الباركود</th>
                   <th className="text-right py-3 px-4 font-medium text-gray-700">الصنف</th>
                   <th className="text-right py-3 px-4 font-medium text-gray-700">التصنيف</th>
                   <th className="text-right py-3 px-4 font-medium text-gray-700">الشركة المنتجة</th>
                   <th className="text-right py-3 px-4 font-medium text-gray-700">الوحدة</th>
                   <th className="text-right py-3 px-4 font-medium text-gray-700">رصيد المخزن</th>
                   <th className="text-right py-3 px-4 font-medium text-gray-700">حد الطلب</th>
                 </tr>
               </thead>
              <tbody>
                                 {filteredItems.map((item) => (
                   <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                     <td className="py-3 px-4 text-sm">{item.branch}</td>
                     <td className="py-3 px-4 text-sm">{item.warehouse}</td>
                     <td className="py-3 px-4 text-sm font-mono">{item.barcode}</td>
                     <td className="py-3 px-4 text-sm font-medium text-gray-800">{item.item}</td>
                     <td className="py-3 px-4 text-sm">{item.category}</td>
                     <td className="py-3 px-4 text-sm">{item.manufacturer}</td>
                     <td className="py-3 px-4 text-sm">{item.unit}</td>
                     <td className={`py-3 px-4 text-sm font-medium ${inventoryUtils.getBalanceStatusColor(item.warehouseBalance, item.orderLimit)}`}>
                       {inventoryUtils.formatBalance(item.warehouseBalance)}
                     </td>
                     <td className="py-3 px-4 text-sm font-medium">
                       {inventoryUtils.formatOrderLimit(item.orderLimit)}
                     </td>
                   </tr>
                 ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">إجمالي الأصناف:</span>
            <Input 
              className="w-20 text-center"
              value={filteredItems.length}
              readOnly
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">الأصناف الحرجة:</span>
            <Input 
              className="w-20 text-center"
              value={filteredItems.filter(item => item.warehouseBalance <= item.orderLimit).length}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">عدد العناصر في الصفحة</span>
            <div className="relative">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm appearance-none pr-8">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
