"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { 
  DiseaseCategory, 
  diseaseUtils 
} from "./DiseaseController"

interface DiseaseCategoriesProps {
  categories: DiseaseCategory[]
  onSave: (category: DiseaseCategory) => void
  onDelete: (categoryId: number) => void
  onClose: () => void
}

export default function DiseaseCategories({ categories, onSave, onDelete, onClose }: DiseaseCategoriesProps) {
  
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory | null>(null)
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<DiseaseCategory>({
    id: 0,
    code: "",
    name: "",
    active: true,
    description: ""
  })

  const handleNewCategory = () => {
    setFormData({
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      code: "",
      name: "",
      active: true,
      description: ""
    })
    setIsNewCategory(true)
    setShowForm(true)
  }

  const handleEditCategory = (category: DiseaseCategory) => {
    setFormData({ ...category })
    setSelectedCategory(category)
    setIsNewCategory(false)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedCategory(null)
    setIsNewCategory(false)
  }

  const handleInputChange = (field: keyof DiseaseCategory, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (diseaseUtils.validateCategory(formData)) {
      onSave(formData)
      handleCloseForm()
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة")
    }
  }

  return (
    <div className="space-y-6">
      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              {isNewCategory ? "إضافة مجموعة جديدة" : "تعديل المجموعة"}
            </h3>
            <div className="flex items-center gap-2">
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSave}>
                <Save className="w-4 h-4 ml-2" />
                حفظ
              </Button>
              <Button variant="outline" onClick={handleCloseForm}>
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category-code">كود المجموعة</Label>
              <Input 
                id="category-code" 
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                className="mt-1" 
                placeholder="مثال: CARD"
              />
            </div>
            <div>
              <Label htmlFor="category-name">اسم المجموعة</Label>
              <Input 
                id="category-name" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1" 
                placeholder="اسم المجموعة"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="category-description">الوصف</Label>
              <Textarea 
                id="category-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1" 
                rows={3}
                placeholder="وصف المجموعة..."
              />
            </div>
                         <div>
               <Label htmlFor="category-status">الحالة</Label>
               <div className="mt-1 flex items-center">
                 <input
                   type="checkbox"
                   id="category-status"
                   checked={formData.active}
                   onChange={(e) => handleInputChange('active', e.target.checked)}
                   className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                 />
                 <Label htmlFor="category-status" className="mr-2 text-sm text-gray-700">
                   نشط
                 </Label>
               </div>
             </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">إدارة مجموعات الأمراض</h2>
            <div className="flex items-center gap-2">
              <Button className="bg-primary" onClick={handleNewCategory}>
                <Plus className="w-4 h-4 ml-2" />
                مجموعة جديدة
              </Button>
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 ml-2" />
                إغلاق
              </Button>
            </div>
          </div>

          {/* Categories Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الكود</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الاسم</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الوصف</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditCategory(category)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onDelete(category.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{category.code}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">{category.name}</td>
                        <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{category.description}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={category.active}
                              readOnly
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
