"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, X, BarChart3 } from "lucide-react"
import { 
  useTreasurTrafficByDateController, 
  treasurTrafficByDateUtils 
} from "./TreasurTrafficByDateController"

export default function TreasurTrafficByDatePage() {
  const {
    treasurTrafficByDate,
    searchTreasurTrafficByDate,
    filterTreasurTrafficByDate,
    filterTreasurTrafficByBranch,
    calculateTotals,
  } = useTreasurTrafficByDateController()

  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")
  const [fromDate, setFromDate] = useState("2025-09-19")
  const [toDate, setToDate] = useState("2025-09-19")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [branchFilter, setBranchFilter] = useState("")

  // Filter data based on search, date, and branch
  const filteredData = filterTreasurTrafficByBranch(
    filterTreasurTrafficByDate(
      searchTreasurTrafficByDate(searchTerm),
      dateFilter,
      fromDate,
      toDate,
      selectedMonth
    ),
    branchFilter
  )

  // Calculate totals
  const totals = calculateTotals(filteredData)

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setSelectedMonth("") // Reset month selection when changing filter type
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setBranchFilter("")
    setFromDate("")
    setToDate("")
    setSelectedMonth("")
    setDateFilter("today")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">حركة خزائن النقدية - تجميع بالتاريخ فقط</h2>
      </div>

      {/* Filter Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            {/* Date Filter */}
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
            
            {/* Date Inputs */}
            {dateFilter === "period" && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">من تاريخ:</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-40"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">إلى تاريخ:</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-40"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
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
      </Card>

      {/* Branch Filter and Action Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm">الفرع:</Label>
                <div className="relative">
                  <select 
                    className="border border-gray-300 rounded px-3 py-1 text-sm appearance-none pr-8 w-40"
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                  >
                    <option value="">جميع الفروع</option>
                    {treasurTrafficByDateUtils.branchOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 ml-2" />
                <BarChart3 className="w-4 h-4 ml-1" />
                بحث
              </Button>
              <Button variant="outline" onClick={handleClearSearch}>
                <X className="w-4 h-4 ml-2" />
                إلغاء البحث
              </Button>
            </div>
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
          className="pl-10 pr-4 py-2 w-full"
          placeholder="أكتب هنا أي شيء تريد البحث عنه"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Table */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    الفرع
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    التاريخ
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    الإيرادات
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    المصروفات
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    الصافي
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((traffic, index) => (
                  <tr 
                    key={traffic.id} 
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{traffic.branch}</td>
                    <td className="py-3 px-4 text-gray-600">{treasurTrafficByDateUtils.formatDate(traffic.date)}</td>
                    <td className={`py-3 px-4 font-medium ${treasurTrafficByDateUtils.getAmountColor(traffic.revenues)}`}>
                      {treasurTrafficByDateUtils.formatAmount(traffic.revenues)}
                    </td>
                    <td className={`py-3 px-4 font-medium ${treasurTrafficByDateUtils.getAmountColor(-traffic.expenses)}`}>
                      {treasurTrafficByDateUtils.formatAmount(traffic.expenses)}
                    </td>
                    <td className={`py-3 px-4 font-medium ${treasurTrafficByDateUtils.getAmountColor(traffic.net)}`}>
                      {treasurTrafficByDateUtils.formatAmount(traffic.net)}
                    </td>
                  </tr>
                ))}
                
                {/* Totals Row */}
                {filteredData.length > 0 && (
                  <tr className="bg-gray-100 border-t-2 border-gray-300">
                    <td className="py-3 px-4 font-bold text-gray-800">=</td>
                    <td className="py-3 px-4 font-bold text-gray-800">الإجمالي</td>
                    <td className="py-3 px-4 font-bold text-gray-800">-</td>
                    <td className={`py-3 px-4 font-bold ${treasurTrafficByDateUtils.getAmountColor(totals.revenues)}`}>
                      {treasurTrafficByDateUtils.formatAmount(totals.revenues)}
                    </td>
                    <td className={`py-3 px-4 font-bold ${treasurTrafficByDateUtils.getAmountColor(-totals.expenses)}`}>
                      {treasurTrafficByDateUtils.formatAmount(totals.expenses)}
                    </td>
                    <td className={`py-3 px-4 font-bold ${treasurTrafficByDateUtils.getAmountColor(totals.net)}`}>
                      {treasurTrafficByDateUtils.formatAmount(totals.net)}
                    </td>
                  </tr>
                )}
                
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      لا توجد بيانات للعرض
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
