"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Printer,
  Save,
  X,
} from "lucide-react"
import { 
  ProductUnit, 
  productUnitUtils
} from "./productsUnitsController"

interface ProductsUnitsItemProps {
  selectedProductUnit: ProductUnit | null
  isNewProductUnit: boolean
  onClose: () => void
  onSave?: (productUnit: ProductUnit) => void
}

export default function ProductsUnitsItem({
  selectedProductUnit,
  isNewProductUnit,
  onClose,
  onSave,
}: ProductsUnitsItemProps) {
  const [formData, setFormData] = useState<ProductUnit>(selectedProductUnit || {
    id: 0,
    code: "",
    name: "",
    active: true,
  })

  const handleInputChange = (field: keyof ProductUnit, value: string | boolean) => {
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

  if (!selectedProductUnit) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewProductUnit ? "إضافة وحدة صنف جديدة" : "تعديل بيانات وحدة الصنف"}
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
        {/* Product Unit Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-unit-code">كود الوحدة</Label>
                <Input 
                  id="product-unit-code" 
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="product-unit-name">اسم الوحدة</Label>
                <Input 
                  id="product-unit-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1" 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="product-unit-status">الحالة</Label>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="product-unit-status"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="product-unit-status" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
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
