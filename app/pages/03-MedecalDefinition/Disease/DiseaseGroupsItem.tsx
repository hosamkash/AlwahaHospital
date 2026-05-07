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
  DiseaseGroup, 
  diseaseGroupUtils
} from "./DiseaseGroupsController"

interface DiseaseGroupsItemProps {
  selectedDiseaseGroup: DiseaseGroup | null
  isNewDiseaseGroup: boolean
  onClose: () => void
  onSave?: (diseaseGroup: DiseaseGroup) => void
}

export default function DiseaseGroupsItem({
  selectedDiseaseGroup,
  isNewDiseaseGroup,
  onClose,
  onSave,
}: DiseaseGroupsItemProps) {
  const [formData, setFormData] = useState<DiseaseGroup>(selectedDiseaseGroup || {
    id: 0,
    code: 0,
    name: "",
    active: true,
    description: ""
  })

  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (field: keyof DiseaseGroup, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // مسح الأخطاء عند التعديل
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleSave = () => {
    const validation = diseaseGroupUtils.validateDiseaseGroup(formData)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    if (onSave) {
      onSave(formData)
    }
  }

  if (!selectedDiseaseGroup) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewDiseaseGroup ? "إضافة مجموعة أمراض جديدة" : "تعديل بيانات مجموعة الأمراض"}
          </h2>
          <div className="flex items-center gap-2">
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
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 p-6 rounded-b-lg">
        {/* Disease Group Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="space-y-4">
            {/* نشط */}
            <div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="disease-group-active"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="disease-group-active" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>

            {/* الكود والاسم */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="disease-group-code">الكود</Label>
                <Input 
                  id="disease-group-code" 
                  type="number"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', parseInt(e.target.value) || 0)}
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="disease-group-name">الإسم</Label>
                <Input 
                  id="disease-group-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1" 
                />
              </div>
            </div>

            {/* الوصف */}
            <div>
              <Label htmlFor="disease-group-description">الوصف</Label>
              <Textarea 
                id="disease-group-description" 
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1" 
                rows={3}
                placeholder="أدخل وصف مفصل للمجموعة..."
              />
            </div>
          </div>

          {/* عرض الأخطاء */}
          {errors.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-medium text-red-800 mb-2">يرجى تصحيح الأخطاء التالية:</h4>
              <ul className="list-disc list-inside text-sm text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
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
