"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Save,
  X,
  Trash2,
  Printer,
  Activity,
  Syringe,
} from "lucide-react"
import { 
  AnesthesiaType, 
  anesthesiaTypesUtils 
} from "../list/anesthesiaTypesController"

interface AnesthesiaTypesItemProps {
  selectedAnesthesiaType: AnesthesiaType | null
  isNewAnesthesiaType: boolean
  onClose: () => void
  onSave?: (anesthesiaType: AnesthesiaType) => void
}

export default function AnesthesiaTypesItem({
  selectedAnesthesiaType,
  isNewAnesthesiaType,
  onClose,
  onSave,
}: AnesthesiaTypesItemProps) {
  const [formData, setFormData] = useState<AnesthesiaType>(selectedAnesthesiaType || {
    id: 0,
    code: "",
    name: "",
    description: "",
    active: true
  })

  const handleInputChange = (field: keyof AnesthesiaType, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    const validation = anesthesiaTypesUtils.validateAnesthesiaType(formData)
    if (validation.isValid) {
      onSave?.(formData)
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة:\n" + validation.errors.join("\n"))
    }
  }

  if (!selectedAnesthesiaType) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewAnesthesiaType ? "إضافة نوع تخدير جديد" : "تعديل بيانات نوع التخدير"}
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
        {/* Anesthesia Type Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="flex gap-6">
            {/* Anesthesia Type Icon */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="text-center">
                  <Syringe className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">رمز التخدير</p>
                </div>
              </div>
            </div>

            {/* Anesthesia Type Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="anesthesia-type-code">كود نوع التخدير</Label>
                <Input 
                  id="anesthesia-type-code" 
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="mt-1" 
                  placeholder="مثال: GEN"
                />
              </div>
              <div>
                <Label htmlFor="anesthesia-type-name">اسم نوع التخدير</Label>
                <Input 
                  id="anesthesia-type-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1" 
                  placeholder="اسم نوع التخدير"
                />
              </div>
              <div>
                <Label htmlFor="anesthesia-type-status">الحالة</Label>
                <div className="mt-1 flex items-center">
                  <input
                    type="checkbox"
                    id="anesthesia-type-status"
                    checked={formData.active}
                    onChange={(e) => handleInputChange('active', e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <Label htmlFor="anesthesia-type-status" className="mr-2 text-sm text-gray-700">
                    نشط
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anesthesia Type Description Section */}
        <div className="bg-white rounded-lg mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4">وصف نوع التخدير</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="anesthesia-type-description">الوصف التفصيلي</Label>
                <Textarea 
                  id="anesthesia-type-description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1" 
                  rows={4}
                  placeholder="وصف تفصيلي لنوع التخدير وطريقة استخدامه..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Anesthesia Type Information Section */}
        <div className="bg-white rounded-lg mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4">معلومات نوع التخدير</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Anesthesia Type Status */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-green-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">حالة نوع التخدير</Label>
                    <p className="text-xs text-gray-500">هل هذا النوع نشط ومتاح للاستخدام؟</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-active"
                    checked={formData.active}
                    onChange={(e) => handleInputChange('active', e.target.checked)}
                    className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white rounded-lg mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4">معلومات إضافية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="anesthesia-indications">الاستطبابات</Label>
                <Textarea 
                  id="anesthesia-indications"
                  className="mt-1" 
                  rows={3}
                  placeholder="الاستطبابات والعمليات المناسبة..."
                />
              </div>
              <div>
                <Label htmlFor="anesthesia-contraindications">الاحتياطات</Label>
                <Textarea 
                  id="anesthesia-contraindications"
                  className="mt-1" 
                  rows={3}
                  placeholder="الاحتياطات والموانع..."
                />
              </div>
              <div>
                <Label htmlFor="anesthesia-duration">مدة التأثير</Label>
                <Textarea 
                  id="anesthesia-duration"
                  className="mt-1" 
                  rows={3}
                  placeholder="مدة تأثير التخدير..."
                />
              </div>
              <div>
                <Label htmlFor="anesthesia-notes">ملاحظات إضافية</Label>
                <Textarea 
                  id="anesthesia-notes"
                  className="mt-1" 
                  rows={3}
                  placeholder="ملاحظات إضافية..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2">
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
    </>
  )
}
