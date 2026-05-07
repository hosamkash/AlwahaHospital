"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Save, RotateCcw, ArrowLeftRight } from "lucide-react"
import {
  TranesiferMonyDetails,
  defaultTranesiferMonyDetails,
  useTranesiferMonyController,
  tranesiferMonyUtils
} from "../TranesiferMonyController"

export default function TranesiferMonyFormPage() {
  const router = useRouter()
  const {
    selectedTranesiferMony,
    showTranesiferMonyDetails,
    isNewTranesiferMony,
    handleCloseDetails,
    handleSaveTranesiferMony,
    switchBranchesAndTreasuries,
  } = useTranesiferMonyController()

  const [formData, setFormData] = useState<TranesiferMonyDetails>(defaultTranesiferMonyDetails)
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
    if (selectedTranesiferMony) {
      setFormData(selectedTranesiferMony)
      setIsNew(isNewTranesiferMony)
    } else {
      // If no selected data, initialize as new
      setFormData({
        ...defaultTranesiferMonyDetails,
        id: Date.now(),
        code: `TM${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      })
      setIsNew(true)
    }
  }, [selectedTranesiferMony, isNewTranesiferMony])

  const handleInputChange = (field: keyof TranesiferMonyDetails, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    handleSaveTranesiferMony(formData)
    router.push("/modules/06-Financial/7-TranesiferMony/list")
  }

  const handleSaveAndClose = () => {
    handleSaveTranesiferMony({ ...formData, isClosed: true })
    router.push("/modules/06-Financial/7-TranesiferMony/list")
  }

  const handleCancel = () => {
    router.push("/modules/06-Financial/7-TranesiferMony/list")
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

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold text-center">
          بيانات تحويل النقدية (بين الخزائن)
        </h2>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - To Branch and Treasury */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="toBranch" className="text-sm font-medium text-gray-700">إلى فرع</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <select
                  id="toBranch"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                  value={formData.toBranch}
                  onChange={(e) => handleInputChange("toBranch", e.target.value)}
                >
                  <option value="">اختر الفرع</option>
                  {tranesiferMonyUtils.branchOptions.map(option => (
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
              >
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
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
              >
                <option value="">اختر الخزينة</option>
                {tranesiferMonyUtils.treasuryOptions.map(option => (
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

          {/* Additional Controls */}
          <div>
            <Label htmlFor="transferType" className="text-sm font-medium text-gray-700">نوع التحويل</Label>
            <div className="relative">
              <select
                id="transferType"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                value={formData.transferType || ""}
                onChange={(e) => handleInputChange("transferType", e.target.value)}
              >
                <option value="">اختر نوع التحويل</option>
                <option value="internal">تحويل داخلي</option>
                <option value="external">تحويل خارجي</option>
                <option value="emergency">تحويل طارئ</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="priority" className="text-sm font-medium text-gray-700">الأولوية</Label>
            <div className="relative">
              <select
                id="priority"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                value={formData.priority || ""}
                onChange={(e) => handleInputChange("priority", e.target.value)}
              >
                <option value="">اختر الأولوية</option>
                <option value="low">منخفضة</option>
                <option value="normal">عادية</option>
                <option value="high">عالية</option>
                <option value="urgent">عاجلة</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="reference" className="text-sm font-medium text-gray-700">المرجع</Label>
            <Input
              id="reference"
              value={formData.reference || ""}
              onChange={(e) => handleInputChange("reference", e.target.value)}
              placeholder="رقم المرجع أو الوثيقة"
              className="bg-white"
            />
          </div>

          {/* Image Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white">
            <div className="text-gray-500 text-sm">No image data</div>
          </div>
        </div>

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
                  placeholder="11:03"
                  className="bg-white"
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
                />
                <span className="text-sm text-gray-700">تم إغلاق التحويل</span>
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="fromBranch" className="text-sm font-medium text-gray-700">من فرع</Label>
            <div className="relative">
              <select
                id="fromBranch"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                value={formData.fromBranch}
                onChange={(e) => handleInputChange("fromBranch", e.target.value)}
              >
                <option value="">اختر الفرع</option>
                {tranesiferMonyUtils.branchOptions.map(option => (
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
            <Label htmlFor="fromTreasury" className="text-sm font-medium text-gray-700">من خزينة</Label>
            <div className="relative">
              <select
                id="fromTreasury"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                value={formData.fromTreasury}
                onChange={(e) => handleInputChange("fromTreasury", e.target.value)}
              >
                <option value="">اختر الخزينة</option>
                {tranesiferMonyUtils.treasuryOptions.map(option => (
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
            <Label className="text-sm font-medium text-gray-700">الرصيد</Label>
            <div className="text-red-600 font-bold text-lg">
              {tranesiferMonyUtils.formatBalance(formData.balance)}
            </div>
          </div>

          <div>
            <Label htmlFor="transferInitiator" className="text-sm font-medium text-gray-700">قائم بالتحويل</Label>
            <div className="relative">
              <select
                id="transferInitiator"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none pr-8 bg-white"
                value={formData.transferInitiator}
                onChange={(e) => handleInputChange("transferInitiator", e.target.value)}
              >
                <option value="">اختر القائم بالتحويل</option>
                {tranesiferMonyUtils.transferInitiatorOptions.map(option => (
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
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </div>
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
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm text-red-600">نسخ البيان إلى سندات الدفع والقبض</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 pt-6">
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
        <Button variant="outline" onClick={handleCancel}>
          <X className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
      </div>
    </div>
  )
}