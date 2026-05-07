"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, RotateCcw, Database, Wrench, X } from "lucide-react"
import {
  useTranesiferMonyController,
  tranesiferMonyUtils
} from "./TranesiferMonyController"

type TranesiferMonyProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function TranesiferMony({ onCreate, onEdit }: TranesiferMonyProps) {
  const {
    tranesiferMony,
    searchTranesiferMony,
    filterTranesiferMonyByDate,
    handleNewTranesiferMony,
    handleEditTranesiferMony,
    handleDeleteTranesiferMony,
  } = useTranesiferMonyController()

  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")
  const [fromDate, setFromDate] = useState("2025-09-19")
  const [toDate, setToDate] = useState("2025-09-19")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [moduleColor, setModuleColor] = useState<string>("#f97316") // default orange for financial

  useEffect(() => {
    const loadModuleColor = () => {
      try {
        const adminSettings = localStorage.getItem('adminSettingsGroupColors')
        if (adminSettings) {
          const colors = JSON.parse(adminSettings)
          if (colors.finance) {
            setModuleColor(colors.finance)
          }
        }
      } catch (error) {
        console.error('Error loading module color:', error)
      }
    }

    loadModuleColor()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminSettingsGroupColors') {
        loadModuleColor()
      }
    }

    const handleColorChange = () => {
      loadModuleColor()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('moduleColorChanged', handleColorChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('moduleColorChanged', handleColorChange)
    }
  }, [])

  // Filter data based on search and date
  const filteredTranesiferMony = filterTranesiferMonyByDate(
    searchTranesiferMony(searchTerm),
    dateFilter,
    fromDate,
    toDate,
    selectedMonth
  )

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setSelectedMonth("") // Reset month selection when changing filter type
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">عرض تحويلات النقدية (بين الخزائن)</h2>
        <div className="flex items-center gap-2">
          <Button 
            className="text-white"
            style={{ backgroundColor: moduleColor }}
            onClick={() => (onCreate ? onCreate() : null)}
          >
            <Database className="w-4 h-4 ml-2" />
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
                    الكود
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
                    الساعة
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    القائم بالتحويل
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    من فرع
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    من خزينة
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    إلى فرع
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    إلى خزينة
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    المبلغ
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    تم التنفيذ
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <input type="checkbox" className="w-3 h-3 mt-1" />
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    البيان
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTranesiferMony.map((tranesiferMony, index) => (
                  <tr 
                    key={tranesiferMony.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => (onEdit ? onEdit(tranesiferMony.id) : null)}
                  >
                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 font-mono text-gray-800">{tranesiferMony.code}</td>
                    <td className="py-3 px-4 text-gray-600">{tranesiferMonyUtils.formatDate(tranesiferMony.date)}</td>
                    <td className="py-3 px-4 text-gray-600">{tranesiferMonyUtils.formatTime(tranesiferMony.time)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{tranesiferMony.transferInitiator}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{tranesiferMony.fromBranch}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{tranesiferMony.fromTreasury}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{tranesiferMony.toBranch}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{tranesiferMony.toTreasury}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{tranesiferMonyUtils.formatAmount(tranesiferMony.amount)}</td>
                    <td className={`py-3 px-4 font-medium ${tranesiferMonyUtils.getExecutedColor(tranesiferMony.isExecuted)}`}>
                      {tranesiferMony.isExecuted ? "تم التنفيذ" : "لم يتم التنفيذ"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{tranesiferMony.statement}</td>
                  </tr>
                ))}
                
                {filteredTranesiferMony.length === 0 && (
                  <tr>
                    <td colSpan={12} className="py-8 text-center text-gray-500">
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
