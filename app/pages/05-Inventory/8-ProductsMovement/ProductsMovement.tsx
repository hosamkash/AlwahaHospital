"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RotateCcw, Filter, X } from "lucide-react"
import { 
  useProductsMovementController, 
  productsMovementUtils 
} from "./ProductsMovementController"

type ProductsMovementProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function ProductsMovement({ onCreate, onEdit }: ProductsMovementProps) {
  const {
    productMovements,
    handleDeleteMovement,
    searchMovements,
    filterMovementsByDate,
  } = useProductsMovementController()

  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedItem, setSelectedItem] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedWarehouse, setSelectedWarehouse] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredMovements = filterMovementsByDate(
    searchMovements(searchTerm),
    dateFilter,
    fromDate,
    toDate,
    selectedMonth
  )

  const totalPages = Math.ceil(filteredMovements.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMovements = filteredMovements.slice(startIndex, endIndex)

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setSelectedMonth("")
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  const handleRefresh = () => {
    console.log("Refreshing data...")
  }

  const handleDeleteFilter = () => {
    setSearchTerm("")
    setDateFilter("today")
    setFromDate("")
    setToDate("")
    setSelectedMonth("")
    setSelectedItem("")
    setSelectedBranch("")
    setSelectedWarehouse("")
    setCurrentPage(1)
  }

  const handleClearSearch = () => setSearchTerm("")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">كارت صنف</h2>
      </div>

      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="dateFilter" value="today" checked={dateFilter === "today"} onChange={(e) => handleDateFilterChange(e.target.value)} className="w-4 h-4" />
                  <span className="text-sm">تاريخ اليوم</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="dateFilter" value="period" checked={dateFilter === "period"} onChange={(e) => handleDateFilterChange(e.target.value)} className="w-4 h-4" />
                  <span className="text-sm">فترة زمنية</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="dateFilter" value="all" checked={dateFilter === "all"} onChange={(e) => handleDateFilterChange(e.target.value)} className="w-4 h-4" />
                  <span className="text-sm">الكل</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="dateFilter" value="month" checked={dateFilter === "month"} onChange={(e) => handleDateFilterChange(e.target.value)} className="w-4 h-4" />
                  <span className="text-sm">شهر</span>
                </label>
              </div>
            </div>
            {dateFilter === "period" && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">من تاريخ:</Label>
                  <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">إلى تاريخ:</Label>
                  <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-40" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh}><RotateCcw className="w-4 h-4 ml-2" />تحديث</Button>
          <Button variant="outline" onClick={handleDeleteFilter}><Filter className="w-4 h-4 ml-2" />حذف الفلتر</Button>
        </div>
        <Button variant="outline" onClick={handleClearSearch}><X className="w-4 h-4 ml-2" />Clear</Button>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <Input className="pl-10 pr-4 py-2 w-full" placeholder="أكتب هنا أي شيء تريد البحث عنه" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Button className="bg-primary" onClick={() => (onCreate ? onCreate() : null)}>جديد</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-700">#</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">المخزن</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">التاريخ</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">نوع المستند</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الرصيد قبل</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الرصيد بعد</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">السعر</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {currentMovements.map((movement, idx) => (
                  <tr key={movement.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => (onEdit ? onEdit(movement.id) : null)}>
                    <td className="py-3 px-4 text-gray-600">{startIndex + idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{movement.warehouse}</td>
                    <td className="py-3 px-4 text-gray-600">{productsMovementUtils.formatDate(movement.date)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{movement.documentType}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{productsMovementUtils.formatQuantity(movement.balanceBefore)}</td>
                    <td className={`py-3 px-4 font-medium ${productsMovementUtils.getQuantityColor(movement.quantity)}`}>{productsMovementUtils.formatQuantity(movement.quantity)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{productsMovementUtils.formatQuantity(movement.balanceAfter)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{productsMovementUtils.formatValue(movement.price)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{productsMovementUtils.formatValue(movement.total)}</td>
                  </tr>
                ))}
                {currentMovements.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-gray-500">لا توجد حركات</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">عرض {startIndex + 1} إلى {Math.min(endIndex, filteredMovements.length)} من {filteredMovements.length} حركة</div>
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
