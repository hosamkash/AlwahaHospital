"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Printer,
  Save,
  X,
} from "lucide-react"
import { 
  Store, 
  storeUtils,
  defaultBranches
} from "../list/storesController"

interface StoresItemProps {
  selectedStore: Store | null
  isNewStore: boolean
  onClose: () => void
  onSave?: (store: Store) => void
}

export default function StoresItem({
  selectedStore,
  isNewStore,
  onClose,
  onSave,
}: StoresItemProps) {
  const [formData, setFormData] = useState<Store>(selectedStore || {
    id: 0,
    code: "",
    name: "",
    active: true,
    description: "",
    branchId: 1,
  })

  const handleInputChange = (field: keyof Store, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(formData)
    }
  }

  if (!selectedStore) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewStore ? "إضافة مخزن جديد" : "تعديل بيانات المخزن"}
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-primary text-white" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300">
              <Printer className="w-4 h-4 ml-2" />
              طباعة
            </Button>
            <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={onClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 p-6 rounded-b-lg">
        {/* Store Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="store-code">كود المخزن</Label>
                <Input 
                  id="store-code" 
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="store-name">اسم المخزن</Label>
                <Input 
                  id="store-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1" 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="store-status">الحالة</Label>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="store-status"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="store-status" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="store-branch">الفرع المرتبط</Label>
              <div className="mt-1 relative">
                <select
                  id="store-branch"
                  value={formData.branchId}
                  onChange={(e) => handleInputChange('branchId', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-8"
                >
                  {defaultBranches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
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

            <div>
              <Label htmlFor="store-description">وصف المخزن</Label>
              <Textarea 
                id="store-description" 
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1" 
                rows={4}
                placeholder="أدخل وصفاً مفصلاً للمخزن..."
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات إضافية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="store-manager">مدير المخزن</Label>
              <Input 
                id="store-manager" 
                className="mt-1" 
                placeholder="اسم مدير المخزن"
              />
            </div>
            <div>
              <Label htmlFor="store-phone">رقم الهاتف</Label>
              <Input 
                id="store-phone" 
                className="mt-1" 
                placeholder="رقم هاتف المخزن"
              />
            </div>
            <div>
              <Label htmlFor="store-location">الموقع</Label>
              <Input 
                id="store-location" 
                className="mt-1" 
                placeholder="موقع المخزن في المستشفى"
              />
            </div>
            <div>
              <Label htmlFor="store-capacity">السعة</Label>
              <Input 
                id="store-capacity" 
                type="number"
                className="mt-1" 
                placeholder="سعة المخزن"
              />
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSave}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
          <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300">
            <Printer className="w-4 h-4 ml-2" />
            طباعة
          </Button>
          <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={onClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>
    </>
  )
}
