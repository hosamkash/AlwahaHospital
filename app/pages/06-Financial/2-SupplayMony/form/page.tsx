"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  X,
  Save,
  Tag,
  Lock,
  RotateCcw
} from "lucide-react"
import { 
  SupplayMonyDetails, 
  defaultSupplayMonyDetails,
  useSupplayMonyController
} from "../SupplayMonyController"
import ComboBox from "@/components/ComboBox"

function SupplayMonyFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supplayMonyId = searchParams.get('id')

  const { supplayMony, handleSaveSupplayMony } = useSupplayMonyController()

  const [supplayMonyData, setSupplayMonyData] = useState<SupplayMonyDetails | null>(null)
  const [isNewSupplayMony, setIsNewSupplayMony] = useState(false)

  // ComboBox options
  const branchOptions = [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ]

  const treasuryOptions = [
    { value: "الصندوق العمومي", label: "الصندوق العمومي" },
    { value: "صندوق الطوارئ", label: "صندوق الطوارئ" },
    { value: "صندوق العيادات", label: "صندوق العيادات" },
    { value: "صندوق العمليات", label: "صندوق العمليات" },
    { value: "الصندوق الرئيسي", label: "الصندوق الرئيسي" }
  ]

  const entityTypeOptions = [
    { value: "عميل", label: "عميل" },
    { value: "مورد", label: "مورد" },
    { value: "موظف", label: "موظف" },
    { value: "بنك", label: "بنك" },
    { value: "مقاول", label: "مقاول" }
  ]

  const accountOptions = [
    { value: "أحمد محمد", label: "أحمد محمد" },
    { value: "سارة أحمد", label: "سارة أحمد" },
    { value: "محمد علي", label: "محمد علي" },
    { value: "فاطمة حسن", label: "فاطمة حسن" },
    { value: "علي محمود", label: "علي محمود" }
  ]

  const itemOptions = [
    { value: "دفعة مقدمة", label: "دفعة مقدمة" },
    { value: "استرداد مبلغ", label: "استرداد مبلغ" },
    { value: "قرض بنكي", label: "قرض بنكي" },
    { value: "إيرادات خدمات", label: "إيرادات خدمات" },
    { value: "مبيعات نقدية", label: "مبيعات نقدية" }
  ]

  useEffect(() => {
    if (supplayMonyId) {
      const existingSupplayMony = supplayMony.find(ex => ex.id === parseInt(supplayMonyId))
      if (existingSupplayMony) {
        // For editing, load existing data and convert to SupplayMonyDetails
        setSupplayMonyData({
          ...defaultSupplayMonyDetails,
          ...existingSupplayMony,
          accountEntity: existingSupplayMony.entityAccountName, // Map entityAccountName to accountEntity
        })
        setIsNewSupplayMony(false)
      } else {
        // If ID is provided but not found, treat as new or redirect
        console.warn(`Supplay Mony with ID ${supplayMonyId} not found. Initializing as new supplay mony.`)
        setSupplayMonyData({
          ...defaultSupplayMonyDetails,
          id: Date.now(),
          code: `${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
        })
        setIsNewSupplayMony(true)
      }
    } else {
      // For new supplay mony
      setSupplayMonyData({
        ...defaultSupplayMonyDetails,
        id: Date.now(),
        code: `${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
      })
      setIsNewSupplayMony(true)
    }
  }, [supplayMonyId, supplayMony])

  if (!supplayMonyData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setSupplayMonyData(prev => {
      if (!prev) return null
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const handleSave = () => {
    if (supplayMonyData) {
      handleSaveSupplayMony(supplayMonyData)
      router.push('/modules/06-Financial/2-SupplayMony/list')
    }
  }

  const handleSaveAndClose = () => {
    if (supplayMonyData) {
      const updatedData = { ...supplayMonyData, isClosed: true }
      handleSaveSupplayMony(updatedData)
      router.push('/modules/06-Financial/2-SupplayMony/list')
    }
  }

  const handleCloseOnly = () => {
    if (supplayMonyData) {
      const updatedData = { ...supplayMonyData, isClosed: true }
      handleSaveSupplayMony(updatedData)
      router.push('/modules/06-Financial/2-SupplayMony/list')
    }
  }

  const handleCancel = () => {
    router.push('/modules/06-Financial/2-SupplayMony/list')
  }

  const handleCountCash = () => {
    // Handle cash counting logic
    console.log("Counting cash...")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {isNewSupplayMony ? "بيانات سند القبض" : "تعديل بيانات سند القبض"}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>

      {/* Status Checkboxes */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={supplayMonyData.isClosed}
            onChange={(e) => handleInputChange("isClosed", e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">تم غلق السند</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={supplayMonyData.isTransferred}
            onChange={(e) => handleInputChange("isTransferred", e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-red-600">تم التحويل</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={supplayMonyData.linkedToDocument}
            onChange={(e) => handleInputChange("linkedToDocument", e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">مرتبط بمستند</span>
        </label>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6">
        {/* Right Column */}
        <div className="space-y-4">
          <ComboBox
            label="الفرع"
            value={supplayMonyData.branch}
            options={branchOptions}
            onChange={(value) => handleInputChange("branch", value)}
            placeholder="اختر الفرع..."
            searchPlaceholder="ابحث عن الفرع..."
          />
          <div>
            <Label className="text-right block mb-1">الكود</Label>
            <div className="relative">
              <Input
                value={supplayMonyData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="pr-8"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">التاريخ</Label>
            <div className="relative">
              <Input
                type="date"
                value={supplayMonyData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="pr-8"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <ComboBox
            label="الخزينة - الصندوق العمومي"
            value={supplayMonyData.treasury}
            options={treasuryOptions}
            onChange={(value) => handleInputChange("treasury", value)}
            placeholder="اختر الخزينة..."
            searchPlaceholder="ابحث عن الخزينة..."
          />
          <ComboBox
            label="نوع الجهة"
            value={supplayMonyData.entityType}
            options={entityTypeOptions}
            onChange={(value) => handleInputChange("entityType", value)}
            placeholder="اختر نوع الجهة..."
            searchPlaceholder="ابحث عن نوع الجهة..."
          />
          <ComboBox
            label="الحساب - الجهة"
            value={supplayMonyData.accountEntity}
            options={accountOptions}
            onChange={(value) => handleInputChange("accountEntity", value)}
            placeholder="اختر الحساب..."
            searchPlaceholder="ابحث عن الحساب..."
          />
          <ComboBox
            label="إسم البند"
            value={supplayMonyData.itemName}
            options={itemOptions}
            onChange={(value) => handleInputChange("itemName", value)}
            placeholder="اختر البند..."
            searchPlaceholder="ابحث عن البند..."
          />
          <div>
            <Label className="text-right block mb-1">المبلغ</Label>
            <div className="relative">
              <Input
                type="number"
                value={supplayMonyData.amount}
                onChange={(e) => handleInputChange("amount", parseFloat(e.target.value) || 0)}
                className="pr-8"
                step="0.01"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">البيان</Label>
            <Textarea
              value={supplayMonyData.statement}
              onChange={(e) => handleInputChange("statement", e.target.value)}
              className="min-h-[100px]"
              placeholder="أدخل البيان..."
            />
          </div>
        </div>

        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label className="text-right block mb-1">السريال</Label>
            <div className="relative">
              <Input
                type="number"
                value={supplayMonyData.serial}
                onChange={(e) => handleInputChange("serial", e.target.value)}
                className="pr-8"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">الرصيد</Label>
            <div className="relative">
              <Input
                value={supplayMonyData.balance.toLocaleString('ar-EG')}
                readOnly
                className="pr-8 bg-gray-50"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
          <Save className="w-4 h-4 ml-2" />
          حفظ
        </Button>
        <Button variant="outline" onClick={handleCountCash}>
          <Tag className="w-4 h-4 ml-2" />
          عد النقدية
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveAndClose}>
          <Save className="w-4 h-4 ml-2" />
          <X className="w-4 h-4 ml-1" />
          حفظ وغلق السند
        </Button>
        <Button variant="outline" onClick={handleCloseOnly}>
          <Lock className="w-4 h-4 ml-2" />
          غلق فقط
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          <RotateCcw className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
      </div>
    </div>
  )
}

export default function SupplayMonyFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SupplayMonyFormContent />
    </Suspense>
  )
}
