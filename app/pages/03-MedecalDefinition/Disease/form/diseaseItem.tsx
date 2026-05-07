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
  AlertTriangle,
  Heart,
  Activity,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { 
  Disease, 
  DiseaseCategory,
  diseaseUtils 
} from "../list/diseaseController"

interface DiseaseItemProps {
  selectedDisease: Disease | null
  isNewDisease: boolean
  categories: DiseaseCategory[]
  onClose: () => void
  onSave?: (disease: Disease) => void
}

export default function DiseaseItem({
  selectedDisease,
  isNewDisease,
  categories,
  onClose,
  onSave,
}: DiseaseItemProps) {
  const [formData, setFormData] = useState<Disease>(selectedDisease || {
    id: 0,
    code: "",
    categoryId: 1,
    name: "",
    description: "",
    isCommon: false,
    isInfectious: false,
    active: true
  })

  const handleInputChange = (field: keyof Disease, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    const validation = diseaseUtils.validateDisease(formData)
    if (validation.isValid) {
      onSave?.(formData)
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة:\n" + validation.errors.join("\n"))
    }
  }

  if (!selectedDisease) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewDisease ? "إضافة مرض جديد" : "تعديل بيانات المرض"}
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
        {/* Disease Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="flex gap-6">
            {/* Disease Icon */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="text-center">
                  <Heart className="w-12 h-12 text-red-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">رمز المرض</p>
                </div>
              </div>
            </div>

            {/* Disease Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="disease-code">كود المرض</Label>
                <Input 
                  id="disease-code" 
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="mt-1" 
                  placeholder="مثال: HTN001"
                />
              </div>
              <div>
                <Label htmlFor="disease-name">اسم المرض</Label>
                <Input 
                  id="disease-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1" 
                  placeholder="اسم المرض"
                />
              </div>
              <div>
                <Label htmlFor="disease-category">المجموعة</Label>
                <div className="mt-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <select 
                      id="disease-category" 
                      value={formData.categoryId}
                      onChange={(e) => handleInputChange('categoryId', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">اختر مجموعة المرض</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <Link href="/admin/03-MedecalDefinition/Disease/disease-groups" title="إدارة مجموعات الأمراض">
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
                             <div>
                 <Label htmlFor="disease-status">الحالة</Label>
                 <div className="mt-1 flex items-center">
                   <input
                     type="checkbox"
                     id="disease-status"
                     checked={formData.active}
                     onChange={(e) => handleInputChange('active', e.target.checked)}
                     className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                   />
                   <Label htmlFor="disease-status" className="mr-2 text-sm text-gray-700">
                     نشط
                   </Label>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Disease Description Section */}
        <div className="bg-white rounded-lg mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4">وصف المرض</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="disease-description">الوصف التفصيلي</Label>
                <Textarea 
                  id="disease-description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1" 
                  rows={4}
                  placeholder="وصف تفصيلي للمرض وأعراضه..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Disease Properties Section */}
        <div className="bg-white rounded-lg mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4">خصائص المرض</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common Disease */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-green-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">مرض شائع</Label>
                    <p className="text-xs text-gray-500">هل هذا المرض شائع الحدوث؟</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-common"
                    checked={formData.isCommon}
                    onChange={(e) => handleInputChange('isCommon', e.target.checked)}
                    className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                </div>
              </div>

              {/* Infectious Disease */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">مرض معدي</Label>
                    <p className="text-xs text-gray-500">هل هذا المرض معدي؟</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-infectious"
                    checked={formData.isInfectious}
                    onChange={(e) => handleInputChange('isInfectious', e.target.checked)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
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
                <Label htmlFor="disease-symptoms">الأعراض الشائعة</Label>
                <Textarea 
                  id="disease-symptoms"
                  className="mt-1" 
                  rows={3}
                  placeholder="الأعراض الشائعة للمرض..."
                />
              </div>
              <div>
                <Label htmlFor="disease-treatment">العلاج الموصى به</Label>
                <Textarea 
                  id="disease-treatment"
                  className="mt-1" 
                  rows={3}
                  placeholder="العلاج الموصى به..."
                />
              </div>
              <div>
                <Label htmlFor="disease-prevention">طرق الوقاية</Label>
                <Textarea 
                  id="disease-prevention"
                  className="mt-1" 
                  rows={3}
                  placeholder="طرق الوقاية من المرض..."
                />
              </div>
              <div>
                <Label htmlFor="disease-notes">ملاحظات إضافية</Label>
                <Textarea 
                  id="disease-notes"
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
