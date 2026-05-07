"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, X, Plus, Edit, Trash2 } from "lucide-react"
import { RadiologyCategory } from "./list/radiologyController"

interface RadiologyCategoriesProps {
  categories: RadiologyCategory[]
  onSave: (category: RadiologyCategory) => void
  onDelete: (categoryId: number) => void
  onClose: () => void
}

export default function RadiologyCategories({ 
  categories, 
  onSave, 
  onDelete, 
  onClose 
}: RadiologyCategoriesProps) {
  const [showForm, setShowForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<RadiologyCategory | null>(null)
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [formData, setFormData] = useState<RadiologyCategory>({
    id: 0,
    name: "",
    description: "",
    active: true
  })

  const handleNewCategory = () => {
    setFormData({
      id: 0,
      name: "",
      description: "",
      active: true
    })
    setIsNewCategory(true)
    setShowForm(true)
  }

  const handleEditCategory = (category: RadiologyCategory) => {
    setFormData(category)
    setIsNewCategory(false)
    setShowForm(true)
  }

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData)
      setShowForm(false)
      setSelectedCategory(null)
    }
  }

  const handleDelete = (categoryId: number) => {
    if (confirm("هل أنت متأكد من حذف هذه المجموعة؟")) {
      onDelete(categoryId)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedCategory(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">إدارة مجموعات الأشعة</h2>
          <div className="flex items-center gap-2">
            <Button className="bg-primary" onClick={handleNewCategory}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة مجموعة
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </div>

      {showForm ? (
        /* Form Section */
        <div className="bg-white p-6 rounded-lg shadow-sm border">
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
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="category-active" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>

            {/* الاسم */}
            <div>
              <Label htmlFor="category-name">اسم المجموعة</Label>
              <Input
                id="category-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1"
                placeholder="اسم المجموعة"
              />
            </div>

            {/* الوصف */}
            <div>
              <Label htmlFor="category-description">الوصف</Label>
              <Textarea
                id="category-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1"
                rows={3}
                placeholder="وصف المجموعة"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleCloseForm}>
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
            <Button className="bg-primary" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
          </div>
        </div>
      ) : (
        /* Categories List */
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الحالة</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الاسم</th>
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
                            onClick={() => handleDelete(category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          category.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.active ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">{category.name}</td>
                      <td className="py-3 px-4 text-gray-600">{category.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
