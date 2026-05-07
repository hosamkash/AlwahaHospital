"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Printer, X } from "lucide-react"
import { Treasure, treasureUtils, defaultBranches } from "../list/TreasuresController"

interface TreasuresItemProps {
  selectedTreasure?: Treasure | null
  isNewTreasure?: boolean
  onClose: () => void
  onSave?: (treasure: Treasure) => void
}

export default function TreasuresItem({ selectedTreasure, isNewTreasure, onClose, onSave }: TreasuresItemProps) {
  const [formData, setFormData] = useState<Treasure>(selectedTreasure || {
    id: 0,
    code: 0,
    name: "",
    active: true,
    branchName: "",
    order: 0,
    creationDate: "",
    currentBalance: 0,
  })

  const handleInputChange = (field: keyof Treasure, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (treasureUtils.validateTreasure(formData)) {
      onSave?.(formData)
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {isNewTreasure ? "إضافة خزينة جديدة" : "تعديل بيانات الخزينة"}
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-primary" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 ml-2" />
              طباعة
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Treasure Information Section */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات الخزينة</h3>
          <div className="space-y-4">
            {/* نشط */}
            <div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="treasure-active"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="treasure-active" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>

            {/* إسم الفرع */}
            <div>
              <Label htmlFor="treasure-branch">إسم الفرع</Label>
              <div className="mt-1 relative">
                <select
                  id="treasure-branch"
                  value={formData.branchName}
                  onChange={(e) => handleInputChange('branchName', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-8"
                >
                  {defaultBranches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
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

            {/* الكود والترتيب */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="treasure-code">الكود</Label>
                <Input
                  id="treasure-code"
                  type="number"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="treasure-order">الترتيب</Label>
                <Input
                  id="treasure-order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* تاريخ الإنشاء */}
            <div>
              <Label htmlFor="treasure-creation-date">تاريخ الإنشاء</Label>
              <div className="mt-1 relative">
                <Input
                  id="treasure-creation-date"
                  type="date"
                  value={formData.creationDate}
                  onChange={(e) => handleInputChange('creationDate', e.target.value)}
                  className="pr-8"
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* الإسم */}
            <div>
              <Label htmlFor="treasure-name">الإسم</Label>
              <Input
                id="treasure-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1"
                placeholder="اسم الخزينة"
              />
            </div>

            {/* الرصيد الحالي */}
            <div>
              <Label htmlFor="treasure-balance">الرصيد الحالي</Label>
              <Input
                id="treasure-balance"
                type="number"
                step="0.01"
                value={formData.currentBalance}
                onChange={(e) => handleInputChange('currentBalance', parseFloat(e.target.value) || 0)}
                className="mt-1"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-primary" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 ml-2" />
              طباعة
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
