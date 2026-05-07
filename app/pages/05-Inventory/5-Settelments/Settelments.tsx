"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, RotateCcw } from "lucide-react"
import { 
  useSettlementsController, 
  settlementsUtils 
} from "./SettelmentsController"

type SettelmentsProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function Settelments({ onCreate, onEdit }: SettelmentsProps) {
  const {
    settlements,
    handleDeleteSettlement,
    searchSettlements,
  } = useSettlementsController()

  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Filter settlements based on search and date
  const filteredSettlements = searchSettlements(searchTerm).filter(settlement => {
    if (dateFilter === "today") {
      const today = new Date().toISOString().split('T')[0]
      return settlement.date === today
    } else if (dateFilter === "month") {
      if (!selectedMonth) return true // Show all if no month selected
      const settlementDate = new Date(settlement.date)
      const currentYear = new Date().getFullYear()
      return settlementDate.getMonth() === (parseInt(selectedMonth) - 1) && settlementDate.getFullYear() === currentYear
    } else if (dateFilter === "period" && fromDate && toDate) {
      return settlement.date >= fromDate && settlement.date <= toDate
    }
    return true // "all" option
  })

  // Pagination
  const totalPages = Math.ceil(filteredSettlements.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSettlements = filteredSettlements.slice(startIndex, endIndex)

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setSelectedMonth("") // Reset month selection when changing filter type
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1) // Reset to first page when items per page changes
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">تسوية الأصناف</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-primary" onClick={() => (onCreate ? onCreate() : null)}>
            <Plus className="w-4 h-4 ml-2" />
            جديد
          </Button>
          <Button variant="outline">
            <Edit className="w-4 h-4 ml-2" />
            تعديل
          </Button>
          <Button variant="outline">
            <Trash2 className="w-4 h-4 ml-2" />
            حذف
          </Button>
          <Button variant="outline">
            <RotateCcw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Date Filtering Section */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="dateFilter"
                    value="today"
                    checked={dateFilter === "today"}
                    onChange={(e) => handleDateFilterChange(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">تاريخ اليوم</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="dateFilter"
                    value="month"
                    checked={dateFilter === "month"}
                    onChange={(e) => handleDateFilterChange(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">شهر</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="dateFilter"
                    value="all"
                    checked={dateFilter === "all"}
                    onChange={(e) => handleDateFilterChange(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">الكل</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="dateFilter"
                    value="period"
                    checked={dateFilter === "period"}
                    onChange={(e) => handleDateFilterChange(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">فترة زمنية</span>
                </label>
              </div>
            </div>
            
            {dateFilter === "month" && (
              <div className="flex items-center gap-2">
                <Label className="text-sm">اختر الشهر:</Label>
                <div className="relative">
                  <select 
                    className="border border-gray-300 rounded px-3 py-1 text-sm appearance-none pr-8 w-32"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">اختر الشهر</option>
                    <option value="1">يناير</option>
                    <option value="2">فبراير</option>
                    <option value="3">مارس</option>
                    <option value="4">أبريل</option>
                    <option value="5">مايو</option>
                    <option value="6">يونيو</option>
                    <option value="7">يوليو</option>
                    <option value="8">أغسطس</option>
                    <option value="9">سبتمبر</option>
                    <option value="10">أكتوبر</option>
                    <option value="11">نوفمبر</option>
                    <option value="12">ديسمبر</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            
            {dateFilter === "period" && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">من تاريخ:</Label>
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-40"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">إلى تاريخ:</Label>
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-40"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <Input
          className="pl-10 pr-20 py-2 w-full"
          placeholder="إكتب هنا أي شيء تريد البحث عنه"
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
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>#</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>الفرع</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>المخزن</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>الكود</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>التاريخ</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>الموظف المسؤل</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>حالة التسوية</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>قيمة التسوية بالنقص</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>قيمة التسوية بالزيادة</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>فرق قيمة التسويات</span>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>ملاحظات</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSettlements.map((settlement) => (
                  <tr 
                    key={settlement.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => (onEdit ? onEdit(settlement.id) : null)}
                  >
                    <td className="py-3 px-4 text-gray-600">{settlement.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{settlement.branch}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{settlement.warehouse}</td>
                    <td className="py-3 px-4 font-mono text-gray-800">{settlement.code}</td>
                    <td className="py-3 px-4 text-gray-600">{settlementsUtils.formatDate(settlement.date)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{settlement.responsibleEmployee}</td>
                    <td className={`py-3 px-4 font-medium ${settlementsUtils.getStatusColor(settlement.settlementStatus)}`}>
                      {settlement.settlementStatus}
                    </td>
                    <td className="py-3 px-4 font-medium text-red-600">{settlementsUtils.formatValue(settlement.settlementValueByDecrease)}</td>
                    <td className="py-3 px-4 font-medium text-green-600">{settlementsUtils.formatValue(settlement.settlementValueByIncrease)}</td>
                    <td className={`py-3 px-4 font-medium ${settlement.differenceInSettlementValues >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {settlementsUtils.formatValue(settlement.differenceInSettlementValues)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{settlement.notes}</td>
                  </tr>
                ))}
                {currentSettlements.length === 0 && (
                  <tr>
                    <td colSpan={11} className="py-8 text-center text-gray-500">
                      لا توجد تسويات
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          عرض {startIndex + 1} إلى {Math.min(endIndex, filteredSettlements.length)} من {filteredSettlements.length} تسوية
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <span className="px-3 py-1 text-sm">
              صفحة {currentPage} من {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">عدد العناصر في الصفحة</span>
            <div className="relative">
              <select 
                className="border border-gray-300 rounded px-2 py-1 text-sm appearance-none pr-8"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
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

