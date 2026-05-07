"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  X,
  Save
} from "lucide-react"
import { 
  SupplayCheckDetails, 
  defaultSupplayCheckDetails,
  useSupplayChecksController,
  supplayChecksUtils
} from "../SupplayChecksController"
import ComboBox from "@/components/ComboBox"

function SupplayCheckFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const checkId = searchParams.get('id')

  const { supplayChecks, handleSaveSupplayCheck } = useSupplayChecksController()

  const [check, setCheck] = useState<SupplayCheckDetails | null>(null)
  const [isNewCheck, setIsNewCheck] = useState(false)
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

  // ComboBox options
  const branchOptions = supplayChecksUtils.branchOptions
  const bankOptions = supplayChecksUtils.bankOptions
  const entityTypeOptions = supplayChecksUtils.entityTypeOptions

  useEffect(() => {
    if (checkId) {
      const existingCheck = supplayChecks.find(chk => chk.id === parseInt(checkId))
      if (existingCheck) {
        // For editing, load existing data and convert to SupplayCheckDetails
        setCheck({
          ...defaultSupplayCheckDetails,
          ...existingCheck,
          checkNumber: 0,
          balance: 0.00,
          alertBeforeDue: 0,
          amountInWords: "",
          rejectionReason: ""
        })
        setIsNewCheck(false)
      } else {
        // If ID is provided but not found, treat as new or redirect
        console.warn(`Check with ID ${checkId} not found. Initializing as new check.`)
        setCheck({
          ...defaultSupplayCheckDetails,
          id: Date.now(),
          code: `${Date.now()}`,
          creationDate: new Date().toISOString().split('T')[0],
          dueDate: new Date().toISOString().split('T')[0],
        })
        setIsNewCheck(true)
      }
    } else {
      // For new check
      setCheck({
        ...defaultSupplayCheckDetails,
        id: Date.now(),
        code: `${Date.now()}`,
        creationDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
      })
      setIsNewCheck(true)
    }
  }, [checkId, supplayChecks])

  if (!check) {
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
    setCheck(prev => {
      if (!prev) return null
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const handleSave = () => {
    if (check) {
      handleSaveSupplayCheck(check)
      router.push('/modules/06-Financial/10-SupplayChecks/list')
    }
  }

  const handleClose = () => {
    router.push('/modules/06-Financial/10-SupplayChecks/list')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {isNewCheck ? "بيانات شيك القبض - الشيك الوارد" : "تعديل بيانات شيك القبض"}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6">
        {/* Right Column */}
        <div className="space-y-4">
          <ComboBox
            label="الفرع"
            value={check.branch}
            options={branchOptions}
            onChange={(value) => handleInputChange("branch", value)}
            placeholder="اختر الفرع..."
            searchPlaceholder="ابحث عن الفرع..."
          />
          <div>
            <Label className="text-right block mb-1">الكود</Label>
            <div className="relative">
              <Input
                value={check.code}
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
            <Label className="text-right block mb-1">تاريخ الإنشاء</Label>
            <div className="relative">
              <Input
                type="date"
                value={check.creationDate}
                onChange={(e) => handleInputChange("creationDate", e.target.value)}
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
            label="التحصيل طرف خزينة بنك"
            value={check.bank}
            options={bankOptions}
            onChange={(value) => handleInputChange("bank", value)}
            placeholder="اختر البنك..."
            searchPlaceholder="ابحث عن البنك..."
          />
          <ComboBox
            label="نوع الجهة"
            value={check.entityType}
            options={entityTypeOptions}
            onChange={(value) => handleInputChange("entityType", value)}
            placeholder="اختر نوع الجهة..."
            searchPlaceholder="ابحث عن نوع الجهة..."
          />
          <div>
            <Label className="text-right block mb-1">إدفعوا لأمر (الجهة)</Label>
            <div className="relative">
              <Input
                value={check.entityName}
                onChange={(e) => handleInputChange("entityName", e.target.value)}
                className="pr-8"
                placeholder="اسم الجهة"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">المبلغ</Label>
            <div className="relative">
              <Input
                type="number"
                step="0.01"
                value={check.amount}
                onChange={(e) => handleInputChange("amount", parseFloat(e.target.value) || 0)}
                className="pr-8 text-right"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">التفقيط</Label>
            <div className="relative">
              <Input
                value={check.amountInWords}
                onChange={(e) => handleInputChange("amountInWords", e.target.value)}
                className="pr-8"
                placeholder="المبلغ بالكلمات"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">البيان</Label>
            <Textarea
              value={check.statement}
              onChange={(e) => handleInputChange("statement", e.target.value)}
              rows={3}
              placeholder="أدخل البيان..."
              className="bg-white"
            />
          </div>
        </div>

        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label className="text-right block mb-1">رقم الشيك</Label>
            <div className="relative">
              <Input
                type="number"
                value={check.checkNumber}
                onChange={(e) => handleInputChange("checkNumber", parseInt(e.target.value) || 0)}
                className="pr-8 text-right"
                placeholder="0"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">تاريخ الإستحقاق</Label>
            <div className="relative">
              <Input
                type="date"
                value={check.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                className="pr-8"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">الرصيد</Label>
            <div className="text-blue-600 font-bold text-lg">
              {supplayChecksUtils.formatBalance(check.balance)}
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">التنبيه قبل ميعاد الاستحقاق ب</Label>
            <div className="relative">
              <Input
                type="number"
                value={check.alertBeforeDue}
                onChange={(e) => handleInputChange("alertBeforeDue", parseInt(e.target.value) || 0)}
                className="pr-8 text-right"
                placeholder="0"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">يوم</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Check Workflow Section */}
      <div className="border-t border-gray-300 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">مسار الشيك (القبول والرفض)</h3>
        
        <div className="flex items-center gap-4 mb-4">
          <Button 
            className="text-white"
            style={{ backgroundColor: moduleColor }}
          >
            <Save className="w-4 h-4 ml-2" />
            سند دفع
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={check.isCollected}
                onChange={(e) => handleInputChange("isCollected", e.target.checked)}
                className="w-4 h-4"
              />
              <Label>تم التحصيل</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={check.isRejected}
                onChange={(e) => handleInputChange("isRejected", e.target.checked)}
                className="w-4 h-4"
              />
              <Label>رفض الشيك</Label>
            </div>
          </div>
          
          <div className="space-y-4">
            {check.isRejected && (
              <div>
                <Label className="text-right block mb-1">سبب الرفض</Label>
                <Textarea
                  value={check.rejectionReason}
                  onChange={(e) => handleInputChange("rejectionReason", e.target.value)}
                  rows={3}
                  placeholder="أدخل سبب الرفض..."
                  className="bg-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button 
          className="text-white"
          style={{ backgroundColor: moduleColor }}
          onClick={handleSave}
        >
          <Save className="w-4 h-4 ml-2" />
          حفظ
        </Button>
        <Button variant="outline" onClick={handleClose}>
          إلغاء
        </Button>
      </div>
    </div>
  )
}

export default function SupplayCheckFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SupplayCheckFormContent />
    </Suspense>
  )
}
