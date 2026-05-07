"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Printer } from "lucide-react"
import { 
  usePermissionInventoryDeductionController, 
  permissionInventoryDeductionUtils 
} from "./PermissionInventoryDeductionController"

type PermissionInventoryDeductionProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function PermissionInventoryDeduction({ onCreate, onEdit }: PermissionInventoryDeductionProps) {
  const {
    permissionInventoryDeduction,
    handleDeletePermission,
    searchPermissionInventoryDeduction,
  } = usePermissionInventoryDeductionController()

  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  
  // Filter permissions based on search and date
  const filteredPermissions = searchPermissionInventoryDeduction(searchTerm).filter(permission => {
    if (dateFilter === "today") {
      const today = new Date().toISOString().split('T')[0]
      return permission.date === today
    } else if (dateFilter === "month") {
      if (!selectedMonth) return true // Show all if no month selected
      const permissionDate = new Date(permission.date)
      const currentYear = new Date().getFullYear()
      return permissionDate.getMonth() === (parseInt(selectedMonth) - 1) && permissionDate.getFullYear() === currentYear
    } else if (dateFilter === "period" && fromDate && toDate) {
      return permission.date >= fromDate && permission.date <= toDate
    }
    return true // "all" option
  })

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setSelectedMonth("") // Reset month selection when changing filter type
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">عرض إذون الخصم</h2>
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
            <Printer className="w-4 h-4 ml-2" />
            طباعة
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
          className="pl-10 pr-4 py-2 w-full"
          placeholder="ابحث عن إذن أو كود...."
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
                  <th className="text-right py-3 px-4 font-medium text-gray-700">#</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الفرع</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">المخزن</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الموظف المسؤل</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الكود</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">التاريخ</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الساعة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">قيمة الطلب</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">حالة الطلب</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {filteredPermissions.map((permission) => (
                  <tr 
                    key={permission.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => (onEdit ? onEdit(permission.id) : null)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit ? onEdit(permission.id) : null
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePermission(permission.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{permission.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{permission.branch}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{permission.warehouse}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{permission.responsibleEmployee}</td>
                    <td className="py-3 px-4 font-mono text-gray-800">{permission.code}</td>
                    <td className="py-3 px-4 text-gray-600">{permissionInventoryDeductionUtils.formatDate(permission.date)}</td>
                    <td className="py-3 px-4 text-gray-600">{permission.time}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{permissionInventoryDeductionUtils.formatValue(permission.orderValue)}</td>
                    <td className={`py-3 px-4 font-medium ${permissionInventoryDeductionUtils.getStatusColor(permission.orderStatus)}`}>
                      {permission.orderStatus}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{permission.notes}</td>
                  </tr>
                ))}
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

