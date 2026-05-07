"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { 
  RadiologyCategory, 
  radiologyUtils 
} from "./radiologyController"

interface RadiologyCategoriesProps {
  categories: RadiologyCategory[]
  onSave: (category: RadiologyCategory) => void
  onDelete: (categoryId: number) => void
  onClose: () => void
}

export default function RadiologyCategories({ categories, onSave, onDelete, onClose }: RadiologyCategoriesProps) {
  const [showForm, setShowForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<RadiologyCategory | null>(null)
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [formData, setFormData] = useState<RadiologyCategory>({
    id: 0,
    code: 0,
    name: "",
    active: true,
    description: ""
  })

  const handleNewCategory = () => {
    setFormData({
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      code: Math.max(...categories.map(c => c.code), 1000) + 1,
      name: "",
      active: true,
      description: ""
    })
    setIsNewCategory(true)
    setShowForm(true)
  }

  const handleEditCategory = (category: RadiologyCategory) => {
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

  const handleInputChange = (field: keyof RadiologyCategory, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (radiologyUtils.validateCategory(formData)) {
      onSave(formData)
      handleCloseForm()
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-50 p-4 rounded-t-lg border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">إدارة مجموعات الأشعة</h2>
            <div className="flex items-center gap-2">
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleNewCategory}>
                <Plus className="w-4 h-4 ml-2" />
                مجموعة جديدة
              </Button>
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 ml-2" />
                إغلاق
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {showForm ? (
            /* Category Form */
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {isNewCategory ? "إضافة مجموعة جديدة" : "تعديل المجموعة"}
                </h3>
                
                <div className="space-y-4">
                  {/* نشط */}
                  <div>
                    <div className="mt-1 flex items-center">
                      <input
                        type="checkbox"
                        id="category-active"
                        checked={formData.active}
                        onChange={(e) => handleInputChange('active', e.target.checked)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <label htmlFor="category-active" className="mr-2 text-sm font-medium text-gray-700">
                        نشط
                      </label>
                    </div>
                  </div>

                  {/* الكود والاسم */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category-code">الكود</Label>
                      <Input
                        id="category-code"
                        type="number"
                        value={formData.code}
                        onChange={(e) => handleInputChange('code', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-name">الإسم</Label>
                      <Input
                        id="category-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                        placeholder="اسم المجموعة"
                      />
                    </div>
                  </div>

                  {/* الوصف */}
                  <div>
                    <Label htmlFor="category-description">الوصف</Label>
                    <Textarea
                      id="category-description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="mt-1"
                      rows={3}
                      placeholder="وصف المجموعة"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
                    <Save className="w-4 h-4 ml-2" />
                    حفظ
                  </Button>
                  <Button variant="outline" onClick={handleCloseForm}>
                    <X className="w-4 h-4 ml-2" />
                    إلغاء
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Categories List */
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Input
                  className="pl-10 pr-4 py-2 w-full"
                  placeholder="ابحث في المجموعات...."
                />
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-700">الكود</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-700">الاسم</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-700">نشط</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-700">الوصف</th>
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
                            <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{category.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
