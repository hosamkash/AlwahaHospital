"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Printer,
  Save,
  X,
} from "lucide-react"
import { 
  FinancialClause, 
  financialClauseUtils,
  itemTypes
} from "./FinancialClausesController"

interface FinancialClausesItemProps {
  selectedFinancialClause?: FinancialClause | null
  isNewFinancialClause?: boolean
  onClose?: () => void
  onSave?: (financialClause: FinancialClause) => void
}

export default function FinancialClausesItem({
  selectedFinancialClause = null,
  isNewFinancialClause = true,
  onClose,
  onSave,
}: FinancialClausesItemProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<FinancialClause>(selectedFinancialClause || {
    id: 0,
    code: 0,
    name: "",
    active: true,
    itemType: "سند قبض",
    isDefaultForCashTransfers: false,
  })

  const handleInputChange = (field: keyof FinancialClause, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(formData)
    } else {
      console.log("Saving financial clause:", formData)
      // هنا يمكن إضافة منطق الحفظ
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      router.back()
    }
  }

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewFinancialClause ? "إضافة بند مالي جديد" : "تعديل بيانات البند المالي"}
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-primary" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300">
              <Printer className="w-4 h-4 ml-2" />
              طباعة
            </Button>
            <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={handleClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 p-6 rounded-b-lg">
        {/* Financial Clause Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="space-y-4">
            {/* نشط */}
            <div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="financial-clause-active"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="financial-clause-active" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>

            {/* الكود والاسم */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="financial-clause-code">الكود</Label>
                <Input 
                  id="financial-clause-code" 
                  type="number"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', parseInt(e.target.value) || 0)}
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="financial-clause-name">الإسم</Label>
                <Input 
                  id="financial-clause-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1" 
                />
              </div>
            </div>


            {/* نوع البند */}
            <div>
              <Label htmlFor="financial-clause-type">نوع البند</Label>
              <div className="mt-1 relative">
                <select
                  id="financial-clause-type"
                  value={formData.itemType}
                  onChange={(e) => handleInputChange('itemType', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-8"
                >
                  {itemTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* البند الافتراضي للتحويلات */}
            <div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="financial-clause-default-transfers"
                  checked={formData.isDefaultForCashTransfers}
                  onChange={(e) => handleInputChange('isDefaultForCashTransfers', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="financial-clause-default-transfers" className="mr-2 text-sm font-medium text-gray-700">
                  بند افتراضي لتحويلات النقدية
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button className="bg-primary" onClick={handleSave}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
          <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300">
            <Printer className="w-4 h-4 ml-2" />
            طباعة
          </Button>
          <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={handleClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>
    </>
  )
}