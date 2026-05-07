"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, RotateCcw, Database, Search, X } from "lucide-react"
import { 
  useBindDocumentWithFinancialController, 
  bindDocumentUtils 
} from "./BindDocumentWithFinancialController"
import ComboBox from "@/components/ComboBox"

export default function BindDocumentWithFinancialListPage() {
  const router = useRouter()
  const {
    financialDocuments,
    paymentVouchers,
    receiptVouchers,
    handleDeleteDocument,
    searchDocuments,
    filterDocumentsByDate,
    filterDocuments,
    calculateTotal,
  } = useBindDocumentWithFinancialController()

  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")
  const [fromDate, setFromDate] = useState("2025-09-21")
  const [toDate, setToDate] = useState("2025-09-21")
  const [selectedMonth, setSelectedMonth] = useState("")
  
  // Additional filters
  const [documentTypeFilter, setDocumentTypeFilter] = useState("")
  const [entityTypeFilter, setEntityTypeFilter] = useState("")
  
  // Filter documents based on search, date, and additional filters
  const filteredDocuments = filterDocuments(
    filterDocumentsByDate(
      searchDocuments(searchTerm),
      dateFilter,
      fromDate,
      toDate,
      selectedMonth
    ),
    {
      documentType: documentTypeFilter,
      entityType: entityTypeFilter
    }
  )

  const handleNewDocumentClick = () => {
    router.push('/modules/06-Financial/13-BindDocumentWithFinancial/form')
  }

  const handleEditDocumentClick = (id: number) => {
    router.push(`/modules/06-Financial/13-BindDocumentWithFinancial/form?id=${id}`)
  }

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setSelectedMonth("") // Reset month selection when changing filter type
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setDocumentTypeFilter("")
    setEntityTypeFilter("")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-600">ربط المستندات بالنقدية والدفعات</h2>
        <div className="flex items-center gap-2">
          
          <Button variant="outline">
            <RotateCcw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-4 gap-6">
        {/* Left Side - Payment and Receipt Vouchers */}
        <div className="col-span-1 space-y-4">
          {/* Payment Vouchers */}
          <Card>
            <CardContent className="p-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">سندات الدفع</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        #
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        الكود
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        التاريخ
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        الخزينة
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        إسم البند
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        المبلغ
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentVouchers.map((voucher, index) => (
                      <tr key={voucher.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-2 text-gray-600">{index + 1}</td>
                        <td className="py-2 px-2 font-medium text-gray-800">{voucher.code}</td>
                        <td className="py-2 px-2 text-gray-600">{bindDocumentUtils.formatDate(voucher.date)}</td>
                        <td className="py-2 px-2 text-gray-600">{voucher.treasury}</td>
                        <td className="py-2 px-2 text-gray-600">{voucher.itemName}</td>
                        <td className="py-2 px-2 font-medium text-red-600">{bindDocumentUtils.formatAmount(voucher.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Receipt Vouchers */}
          <Card>
            <CardContent className="p-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">سندات القبض</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        #
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        الكود
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        التاريخ
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        الخزينة
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        إسم البند
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-gray-700">
                        المبلغ
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {receiptVouchers.map((voucher, index) => (
                      <tr key={voucher.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-2 text-gray-600">{index + 1}</td>
                        <td className="py-2 px-2 font-medium text-gray-800">{voucher.code}</td>
                        <td className="py-2 px-2 text-gray-600">{bindDocumentUtils.formatDate(voucher.date)}</td>
                        <td className="py-2 px-2 text-gray-600">{voucher.treasury}</td>
                        <td className="py-2 px-2 text-gray-600">{voucher.itemName}</td>
                        <td className="py-2 px-2 font-medium text-green-600">{bindDocumentUtils.formatAmount(voucher.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Main Financial Documents Grid */}
        <div className="col-span-3">
          {/* Filtering Section */}
          <Card className="mb-4">
            <CardContent className="p-3">
              <div className="flex items-center gap-6">
                {/* Date Filters */}
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
                  </div>
                </div>
                
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

               
              </div>
            </CardContent>

            <CardContent className="p-0">
      {/* Document and Entity Type Filters */}
      <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">نوع المستند:</Label>
                    <Input
                      type="text"
                      value={documentTypeFilter}
                      onChange={(e) => setDocumentTypeFilter(e.target.value)}
                      className="w-32"
                      placeholder="نوع المستند"
                    />
                    
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">نوع الجهة:</Label>
                    <Input
                      type="text"
                      value={entityTypeFilter}
                      onChange={(e) => setEntityTypeFilter(e.target.value)}
                      className="w-32"
                      placeholder="نوع الجهة"
                    />
                    
                  </div>
                </div>
  </CardContent>


          </Card>

          {/* Main Financial Documents Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        #
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        نوع المستند
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        الكود
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        التاريخ
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        الفرع
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        نوع الجهة
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        الجهة - إسم الحساب
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        الإجمالي
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        مغلق
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        ق
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                        <div className="mt-1">
                          <Input className="w-full h-6 text-xs" placeholder="=" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((document, index) => (
                      <tr 
                        key={document.id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${index === 5 ? 'bg-blue-50' : ''}`}
                        onClick={() => handleEditDocumentClick(document.id)}
                      >
                        <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">{document.documentType}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">{document.code}</td>
                        <td className="py-3 px-4 text-gray-600">{bindDocumentUtils.formatDate(document.date)}</td>
                        <td className="py-3 px-4 text-gray-600">{document.branch}</td>
                        <td className="py-3 px-4 text-gray-600">{document.entityType}</td>
                        <td className="py-3 px-4 text-gray-600">{document.entityName}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">{bindDocumentUtils.formatAmount(document.total)}</td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={document.isClosed}
                            readOnly
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="w-4 h-4 bg-gray-300 rounded"></div>
                        </td>
                      </tr>
                    ))}
                    
                    {filteredDocuments.length === 0 && (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-gray-500">
                          لا توجد بيانات للعرض
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100 border-t-2 border-gray-300">
                      <td colSpan={7} className="py-3 px-4 text-right font-bold text-gray-800">
                        الإجمالي:
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-800">
                        {bindDocumentUtils.formatAmount(calculateTotal(filteredDocuments))}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>


            
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div></div>
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
      </div>
    </div>
  )
}
