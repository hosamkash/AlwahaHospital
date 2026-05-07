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
  Stethoscope,
  Activity,
} from "lucide-react"
import { 
  MedicalSpecialty, 
  medicalSpecialtiesUtils 
} from "../list/medicalSpecialtiesController"

interface MedicalSpecialtiesItemProps {
  selectedSpecialty: MedicalSpecialty | null
  isNewSpecialty: boolean
  onClose: () => void
  onSave?: (specialty: MedicalSpecialty) => void
}

export default function MedicalSpecialtiesItem({
  selectedSpecialty,
  isNewSpecialty,
  onClose,
  onSave,
}: MedicalSpecialtiesItemProps) {
  const [formData, setFormData] = useState<MedicalSpecialty>(selectedSpecialty || {
    id: 0,
    code: "",
    name: "",
    description: "",
    active: true
  })

  const handleInputChange = (field: keyof MedicalSpecialty, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    const validation = medicalSpecialtiesUtils.validateSpecialty(formData)
    if (validation.isValid) {
      onSave?.(formData)
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة:\n" + validation.errors.join("\n"))
    }
  }

  if (!selectedSpecialty) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewSpecialty ? "إضافة تخصص طبي جديد" : "تعديل بيانات التخصص الطبي"}
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
        {/* Specialty Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="flex gap-6">
            {/* Specialty Icon */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="text-center">
                  <Stethoscope className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">رمز التخصص</p>
                </div>
              </div>
            </div>

            {/* Specialty Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialty-code">كود التخصص</Label>
                <Input 
                  id="specialty-code" 
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="mt-1" 
                  placeholder="مثال: CARD"
                />
              </div>
              <div>
                <Label htmlFor="specialty-name">اسم التخصص</Label>
                <Input 
                  id="specialty-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1" 
                  placeholder="اسم التخصص الطبي"
                />
              </div>
              <div>
                <Label htmlFor="specialty-status">الحالة</Label>
                <div className="mt-1 flex items-center">
                  <input
                    type="checkbox"
                    id="specialty-status"
                    checked={formData.active}
                    onChange={(e) => handleInputChange('active', e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <Label htmlFor="specialty-status" className="mr-2 text-sm text-gray-700">
                    نشط
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialty Description Section */}
        <div className="bg-white rounded-lg mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4">وصف التخصص</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="specialty-description">الوصف التفصيلي</Label>
                <Textarea 
                  id="specialty-description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1" 
                  rows={4}
                  placeholder="وصف تفصيلي للتخصص الطبي ومجالات عمله..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specialty Information Section */}
        <div className="bg-white rounded-lg mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4">معلومات التخصص</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Specialty Status */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-green-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">حالة التخصص</Label>
                    <p className="text-xs text-gray-500">هل هذا التخصص نشط ومتاح؟</p>
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
                <Label htmlFor="specialty-requirements">متطلبات التخصص</Label>
                <Textarea 
                  id="specialty-requirements"
                  className="mt-1" 
                  rows={3}
                  placeholder="متطلبات وشروط التخصص..."
                />
              </div>
              <div>
                <Label htmlFor="specialty-duration">مدة التخصص</Label>
                <Textarea 
                  id="specialty-duration"
                  className="mt-1" 
                  rows={3}
                  placeholder="مدة الدراسة والتدريب..."
                />
              </div>
              <div>
                <Label htmlFor="specialty-certifications">الشهادات المطلوبة</Label>
                <Textarea 
                  id="specialty-certifications"
                  className="mt-1" 
                  rows={3}
                  placeholder="الشهادات والتراخيص المطلوبة..."
                />
              </div>
              <div>
                <Label htmlFor="specialty-notes">ملاحظات إضافية</Label>
                <Textarea 
                  id="specialty-notes"
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
