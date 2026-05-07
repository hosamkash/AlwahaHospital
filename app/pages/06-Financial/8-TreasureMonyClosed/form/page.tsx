"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Save, RotateCcw, ArrowLeftRight } from "lucide-react"
import {
  TreasureMonyClosedDetails,
  defaultTreasureMonyClosedDetails,
  useTreasureMonyClosedController,
  treasureMonyClosedUtils,
  TransactionItem
} from "../TreasureMonyClosedController"

export default function TreasureMonyClosedFormPage() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    selectedTreasureMonyClosed,
    showTreasureMonyClosedDetails,
    isNewTreasureMonyClosed,
    isViewMode,
    handleCloseDetails,
    handleSaveTreasureMonyClosed,
  } = useTreasureMonyClosedController()

  const [formData, setFormData] = useState<TreasureMonyClosedDetails>(defaultTreasureMonyClosedDetails)
  const [isNew, setIsNew] = useState(true)
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

  useEffect(() => {
    if (selectedTreasureMonyClosed) {
      setFormData(selectedTreasureMonyClosed)
      setIsNew(isNewTreasureMonyClosed)
    } else {
      // If no selected data, initialize as new
      setFormData({
        ...defaultTreasureMonyClosedDetails,
        id: Date.now(),
        code: `TC${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      })
      setIsNew(true)
    }
  }, [selectedTreasureMonyClosed, isNewTreasureMonyClosed])

  const handleInputChange = (field: keyof TreasureMonyClosedDetails, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getListPath = () => {
    const currentPath = pathname || ""
    const basePath = currentPath.replace(/\/form.*$/, "")
    return basePath || "/modules/06-Financial/8-TreasureMonyClosed"
  }

  const handleSave = () => {
    handleSaveTreasureMonyClosed(formData)
    router.push(getListPath())
  }

  const handleSaveAndClose = () => {
    handleSaveTreasureMonyClosed({ ...formData, isClosed: true })
    router.push(getListPath())
  }

  const handleCancel = () => {
    handleCloseDetails()
    router.back()
  }

  const handleSwitch = () => {
    const tempBranch = formData.fromBranch
    const tempTreasury = formData.fromTreasury
    
    setFormData(prev => ({
      ...prev,
      fromBranch: prev.toBranch,
      fromTreasury: prev.toTreasury,
      toBranch: tempBranch,
      toTreasury: tempTreasury,
    }))
  }

  const getVoucherTypeColor = (voucherType: string) => {
    return voucherType === "سند قبض" ? "bg-green-100" : "bg-red-100"
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold text-center">
          {isViewMode ? "عرض تفاصيل تقفيل يومية الخزينة" : "تقفيل يومية الخزينة"}
        </h2>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-2 gap-6">
       

        {/* Right Column - From Branch and Treasury */}
        <div className="space-y-4">
          {/* Code and Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code" className="text-sm font-medium text-gray-700">الكود</Label>
              <div className="relative">
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  className="text-right bg-white"
                  disabled={isViewMode}
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">التاريخ</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="bg-white"
                  disabled={isViewMode}
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Time and Checkbox Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time" className="text-sm font-medium text-gray-700">الساعة</Label>
              <div className="relative">
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  placeholder="11:13"
                  className="bg-white"
                  disabled={isViewMode}
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isClosed}
                  onChange={(e) => handleInputChange("isClosed", e.target.checked)}
                  className="w-4 h-4"
                  disabled={isViewMode}
                />
                <span className="text-sm text-gray-700">تم إغلاق التحويل</span>
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="fromBranch" className="text-sm font-medium text-gray-700">من فرع</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <select
                  id="fromBranch"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                  value={formData.fromBranch}
                  onChange={(e) => handleInputChange("fromBranch", e.target.value)}
                  disabled={isViewMode}
                >
                  <option value="">اختر الفرع</option>
                  {treasureMonyClosedUtils.branchOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleSwitch}
                className="bg-gray-100 hover:bg-gray-200 border-gray-300 px-3"
                disabled={isViewMode}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="fromTreasury" className="text-sm font-medium text-gray-700">من خزينة</Label>
            <div className="relative">
              <select
                id="fromTreasury"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                value={formData.fromTreasury}
                onChange={(e) => handleInputChange("fromTreasury", e.target.value)}
                disabled={isViewMode}
              >
                <option value="">اختر الخزينة</option>
                {treasureMonyClosedUtils.treasuryOptions.map(option => (
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

 {/* Left Column - To Branch and Treasury */}
 <div className="space-y-4">
          <div>
            <Label htmlFor="toBranch" className="text-sm font-medium text-gray-700">إلى فرع</Label>
            <div className="relative">
              <select
                id="toBranch"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                value={formData.toBranch}
                onChange={(e) => handleInputChange("toBranch", e.target.value)}
                disabled={isViewMode}
              >
                <option value="">اختر الفرع</option>
                {treasureMonyClosedUtils.branchOptions.map(option => (
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

          <div>
            <Label htmlFor="toTreasury" className="text-sm font-medium text-gray-700">إلى خزينة</Label>
            <div className="relative">
              <select
                id="toTreasury"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                value={formData.toTreasury}
                onChange={(e) => handleInputChange("toTreasury", e.target.value)}
                disabled={isViewMode}
              >
                <option value="">اختر الخزينة</option>
                {treasureMonyClosedUtils.treasuryOptions.map(option => (
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
        
          <div>
            <Label htmlFor="transferInitiator" className="text-sm font-medium text-gray-700">القائم بالتحويل</Label>
            <Input
              id="transferInitiator"
              value={formData.transferInitiator}
              onChange={(e) => handleInputChange("transferInitiator", e.target.value)}
              placeholder="القائم بالتحويل"
              className="bg-white"
              disabled={isViewMode}
            />
          </div>

          <div>
            <Label htmlFor="statement" className="text-sm font-medium text-gray-700">البيان</Label>
            <Textarea
              id="statement"
              value={formData.statement}
              onChange={(e) => handleInputChange("statement", e.target.value)}
              rows={3}
              placeholder="أدخل البيان..."
              className="bg-white"
              disabled={isViewMode}
            />
          </div>

          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">المبلغ</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", parseFloat(e.target.value) || 0)}
                className="text-right bg-white"
                placeholder="0.00"
                disabled={isViewMode}
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">تفاصيل المعاملات</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">#</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">الفرع</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">الكود</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">السريال</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">التاريخ</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">نوع السند</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">الخزينة</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">نوع الجهة</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">الجهة - إسم الحساب</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">إسم البند</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">المبلغ</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">البيان</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {formData.transactions.map((transaction, index) => (
                  <tr key={transaction.id} className={`${getVoucherTypeColor(transaction.voucherType)}`}>
                    <td className="px-4 py-3 text-sm text-gray-800">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.branch}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.code}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.serial}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.voucherType}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.treasury}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.entityType}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.entityName}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.itemName}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{treasureMonyClosedUtils.formatAmount(transaction.amount)}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.statement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800">الإيرادات - المقبوضات</h3>
              <p className="text-2xl font-bold text-green-600">{treasureMonyClosedUtils.formatAmount(formData.totalRevenues)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-800">المصروفات - المدفوعات</h3>
              <p className="text-2xl font-bold text-red-600">{treasureMonyClosedUtils.formatAmount(formData.totalExpenses)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-800">الصافي</h3>
              <p className="text-2xl font-bold text-yellow-600">{treasureMonyClosedUtils.formatAmount(formData.netAmount)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 pt-6">
        {!isViewMode && (
          <>
            <Button 
              className="text-white"
              style={{ backgroundColor: moduleColor }}
              onClick={handleSave}
            >
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button 
              className="text-white"
              style={{ backgroundColor: moduleColor }}
              onClick={handleSaveAndClose}
            >
              <Save className="w-4 h-4 ml-2" />
              حفظ وغلق
            </Button>
          </>
        )}
        <Button variant="outline" onClick={handleCancel}>
          <X className="w-4 h-4 ml-2" />
          {isViewMode ? "إغلاق" : "إلغاء"}
        </Button>
      </div>
    </div>
  )
}
