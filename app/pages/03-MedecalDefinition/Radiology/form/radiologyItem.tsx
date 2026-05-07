"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Printer, X, Settings } from "lucide-react"
import { Radiology, RadiologyCategory, radiologyUtils } from "../list/radiologyController"
import RadiologyCategories from "../RadiologyCategories"

interface RadiologyItemProps {
  selectedRadiology: Radiology
  isNewRadiology: boolean
  categories: RadiologyCategory[]
  onClose: () => void
  onSave: (radiology: Radiology) => void
  onSaveCategory: (category: RadiologyCategory) => void
  onDeleteCategory: (categoryId: number) => void
}

export default function RadiologyItem({ selectedRadiology, isNewRadiology, categories, onClose, onSave, onSaveCategory, onDeleteCategory }: RadiologyItemProps) {
  const [formData, setFormData] = useState<Radiology>(selectedRadiology)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)

  const handleInputChange = (field: keyof Radiology, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (radiologyUtils.validateRadiology(formData)) {
      onSave(formData)
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
            {isNewRadiology ? "إضافة أشعة جديدة" : "تعديل بيانات الأشعة"}
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
        {/* Radiology Information Section */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات الأشعة</h3>
          <div className="space-y-4">
            {/* نشط */}
            <div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="radiology-active"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="radiology-active" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>

            {/* يتبع مجموعة */}
            <div>
              <Label htmlFor="radiology-category">يتبع مجموعة</Label>
              <div className="mt-1 flex gap-2">
                <div className="relative flex-1">
                  <select
                    id="radiology-category"
                    value={formData.categoryId}
                    onChange={(e) => handleInputChange('categoryId', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-8"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  className="px-3 py-2 whitespace-nowrap"
                  onClick={() => setShowCategoryDialog(true)}
                >
                  <Settings className="w-4 h-4 ml-1" />
                  إدارة المجموعات
                </Button>
              </div>
            </div>

            {/* الكود والاسم */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="radiology-code">الكود</Label>
                <Input
                  id="radiology-code"
                  type="number"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="radiology-name">الاسم</Label>
                <Input
                  id="radiology-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                  placeholder="اسم الأشعة"
                />
              </div>
            </div>

            {/* السعر */}
            <div>
              <Label htmlFor="radiology-price">السعر</Label>
              <Input
                id="radiology-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className="mt-1"
                placeholder="0.00"
              />
            </div>

            {/* الوصف */}
            <div>
              <Label htmlFor="radiology-description">الوصف</Label>
              <Textarea
                id="radiology-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1"
                rows={4}
                placeholder="وصف الأشعة"
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

      {/* Category Management Dialog */}
      {showCategoryDialog && (
        <RadiologyCategories
          categories={categories}
          onSave={onSaveCategory}
          onDelete={onDeleteCategory}
          onClose={() => setShowCategoryDialog(false)}
        />
      )}
    </div>
  )
}
