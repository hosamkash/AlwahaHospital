"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, RotateCcw, Database } from "lucide-react"
import { 
  useTrafficCheckGroupingController, 
  trafficCheckGroupingUtils 
} from "./TrafficCheckGroupingController"
import ComboBox from "@/components/ComboBox"

export default function TrafficCheckGroupingListPage() {
  const router = useRouter()
  const {
    trafficCheckGrouping,
    handleDeleteTrafficCheckGrouping,
    searchTrafficCheckGrouping,
    filterTrafficCheckGroupingByDate,
    filterTrafficCheckGrouping,
  } = useTrafficCheckGroupingController()

  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  
  // Additional filters - now as ComboBox values
  const [bankFilter, setBankFilter] = useState("")
  const [entityFilter, setEntityFilter] = useState("")
  const [branchFilter, setBranchFilter] = useState("")
  const [treasuryFilter, setTreasuryFilter] = useState("")
  
  // Filter checks based on search, date, and additional filters
  const filteredChecks = filterTrafficCheckGrouping(
    filterTrafficCheckGroupingByDate(
      searchTrafficCheckGrouping(searchTerm),
      dateFilter,
      fromDate,
      toDate,
      selectedMonth
    ),
    {
      bank: bankFilter,
      entity: entityFilter,
      branch: branchFilter,
      treasury: treasuryFilter
    }
  )

  const handleNewCheckClick = () => {
    router.push('/admin/06-Financial/12-TrafficCheckGrouping/form')
  }

  const handleEditCheckClick = (id: number) => {
    router.push(`/admin/06-Financial/12-TrafficCheckGrouping/form?id=${id}`)
  }

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setSelectedMonth("") // Reset month selection when changing filter type
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">حركة الشيكات تجميعي</h2>
        <div className="flex items-center gap-2">
          
          <Button variant="outline">
            <RotateCcw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Filtering Section */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-6">
            {/* Additional Filters - Now as ComboBox */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm">البنك:</Label>
                <ComboBox
                  value={bankFilter}
                  options={trafficCheckGroupingUtils.branchOptions}
                  onChange={setBankFilter}
                  placeholder="اختر البنك..."
                  searchPlaceholder="ابحث عن البنك..."
                  className="w-40"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm">الجهة:</Label>
                <ComboBox
                  value={entityFilter}
                  options={trafficCheckGroupingUtils.branchOptions}
                  onChange={setEntityFilter}
                  placeholder="اختر الجهة..."
                  searchPlaceholder="ابحث عن الجهة..."
                  className="w-40"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm">الفرع:</Label>
                <ComboBox
                  value={branchFilter}
                  options={trafficCheckGroupingUtils.branchOptions}
                  onChange={setBranchFilter}
                  placeholder="اختر الفرع..."
                  searchPlaceholder="ابحث عن الفرع..."
                  className="w-32"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm">خزينة:</Label>
                <ComboBox
                  value={treasuryFilter}
                  options={trafficCheckGroupingUtils.branchOptions}
                  onChange={setTreasuryFilter}
                  placeholder="اختر الخزينة..."
                  searchPlaceholder="ابحث عن الخزينة..."
                  className="w-32"
                />
              </div>
            </div>

           
          </div>

           <CardContent className="p-3">
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
           </CardContent>
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
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        ABC
                      </div>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    الشيكات الواردة - الإيرادات
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    الشيكات الصادرة - المصروفات
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
                {filteredChecks.map((check, index) => (
                  <tr 
                    key={check.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEditCheckClick(check.id)}
                  >
                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{check.branch}</td>
                    <td className="py-3 px-4 text-gray-600">{trafficCheckGroupingUtils.formatDate(check.date)}</td>
                    <td className="py-3 px-4 font-medium text-green-600">{trafficCheckGroupingUtils.formatAmount(check.incomingChecks)}</td>
                    <td className="py-3 px-4 font-medium text-red-600">{trafficCheckGroupingUtils.formatAmount(check.outgoingChecks)}</td>
                    <td className={`py-3 px-4 font-bold ${trafficCheckGroupingUtils.getNetAmountColor(check.netAmount)}`}>
                      {trafficCheckGroupingUtils.formatAmount(check.netAmount)}
                    </td>
                  </tr>
                ))}
                
                {filteredChecks.length === 0 && (
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
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
  )
}
