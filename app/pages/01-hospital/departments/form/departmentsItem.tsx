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
  Department, 
  departmentUtils 
} from "../list/departmentsController"

interface DepartmentsItemProps {
  selectedDepartment: Department | null
  isNewDepartment: boolean
  onClose: () => void
  onSave?: (department: Department) => void
}

export default function DepartmentsItem({
  selectedDepartment,
  isNewDepartment,
  onClose,
  onSave,
}: DepartmentsItemProps) {
  const [formData, setFormData] = useState<Department>(selectedDepartment || {
    id: 0,
    code: "",
    name: "",
    active: true,
    description: "",
  })

  const handleInputChange = (field: keyof Department, value: string | boolean) => {
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

  if (!selectedDepartment) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewDepartment ? "إضافة إدارة جديدة" : "تعديل بيانات الإدارة"}
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
            <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={onClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 p-6 rounded-b-lg">
        {/* Department Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department-code">كود الإدارة</Label>
                <Input 
                  id="department-code" 
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="department-name">اسم الإدارة</Label>
                <Input 
                  id="department-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1" 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="department-status">الحالة</Label>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="department-status"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="department-status" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="department-description">وصف الإدارة</Label>
              <Textarea 
                id="department-description" 
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1" 
                rows={4}
                placeholder="أدخل وصفاً مفصلاً للإدارة أو القسم..."
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات إضافية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department-manager">مدير الإدارة</Label>
              <Input 
                id="department-manager" 
                className="mt-1" 
                placeholder="اسم مدير الإدارة"
              />
            </div>
            <div>
              <Label htmlFor="department-phone">رقم الهاتف</Label>
              <Input 
                id="department-phone" 
                className="mt-1" 
                placeholder="رقم هاتف الإدارة"
              />
            </div>
            <div>
              <Label htmlFor="department-email">البريد الإلكتروني</Label>
              <Input 
                id="department-email" 
                type="email"
                className="mt-1" 
                placeholder="البريد الإلكتروني للإدارة"
              />
            </div>
            <div>
              <Label htmlFor="department-location">الموقع</Label>
              <Input 
                id="department-location" 
                className="mt-1" 
                placeholder="موقع الإدارة في المستشفى"
              />
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
          <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={onClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>
    </>
  )
}
