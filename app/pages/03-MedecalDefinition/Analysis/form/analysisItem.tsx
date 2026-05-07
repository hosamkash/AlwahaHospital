"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Save,
  X,
  Printer,
  FlaskConical,
} from "lucide-react"
import { 
  Analysis, 
  analysisUtils 
} from "../list/analysisController"

interface AnalysisItemProps {
  selectedAnalysis: Analysis | null
  isNewAnalysis: boolean
  onClose: () => void
  onSave?: (analysis: Analysis) => void
}

export default function AnalysisItem({
  selectedAnalysis,
  isNewAnalysis,
  onClose,
  onSave,
}: AnalysisItemProps) {
  const [formData, setFormData] = useState<Analysis>(selectedAnalysis || {
    id: 0,
    code: "",
    name: "",
    description: "",
    active: true,
  })
  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (field: keyof Analysis, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    const validation = analysisUtils.validateAnalysis(formData)
    if (validation.isValid) {
      onSave?.(formData)
      setErrors([])
    } else {
      setErrors(validation.errors)
    }
  }

  if (!selectedAnalysis) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewAnalysis ? "إضافة تحليل طبي جديد" : "تعديل بيانات التحليل الطبي"}
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
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">خطأ!</strong>
            <span className="block sm:inline"> يرجى تصحيح الأخطاء التالية:</span>
            <ul className="mt-2 list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Analysis Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="flex gap-6">
            {/* Analysis Icon */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="text-center">
                  <FlaskConical className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">رمز التحليل</p>
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="flex-1 space-y-4">
              {/* نشط */}
              <div>
                <div className="mt-1 flex items-center">
                  <input
                    type="checkbox"
                    id="analysis-active"
                    checked={formData.active}
                    onChange={(e) => handleInputChange('active', e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <label htmlFor="analysis-active" className="mr-2 text-sm font-medium text-gray-700">
                    نشط
                  </label>
                </div>
              </div>

              {/* الكود والاسم */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="analysis-code">كود التحليل</Label>
                  <Input
                    id="analysis-code"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    className="mt-1"
                    placeholder="كود التحليل"
                  />
                </div>
                <div>
                  <Label htmlFor="analysis-name">اسم التحليل</Label>
                  <Input
                    id="analysis-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                    placeholder="اسم التحليل"
                  />
                </div>
              </div>

              {/* الوصف */}
              <div>
                <Label htmlFor="analysis-description">وصف التحليل</Label>
                <Textarea
                  id="analysis-description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1"
                  rows={4}
                  placeholder="وصف تفصيلي للتحليل"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات إضافية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="analysis-category">فئة التحليل</Label>
              <div className="relative mt-1">
                <select 
                  id="analysis-category" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">اختر فئة التحليل</option>
                  <option value="blood">تحاليل الدم</option>
                  <option value="urine">تحاليل البول</option>
                  <option value="hormone">تحاليل الهرمونات</option>
                  <option value="vitamin">تحاليل الفيتامينات</option>
                  <option value="immune">تحاليل المناعة</option>
                  <option value="other">أخرى</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="analysis-unit">وحدة القياس</Label>
              <Input
                id="analysis-unit"
                className="mt-1"
                placeholder="وحدة القياس"
              />
            </div>
            <div>
              <Label htmlFor="analysis-normal-range">المعدل الطبيعي</Label>
              <Input
                id="analysis-normal-range"
                className="mt-1"
                placeholder="المعدل الطبيعي"
              />
            </div>
            <div>
              <Label htmlFor="analysis-cost">التكلفة</Label>
              <Input
                id="analysis-cost"
                type="number"
                className="mt-1"
                placeholder="0.00"
              />
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
