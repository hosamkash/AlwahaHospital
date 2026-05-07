"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface ProductUnit {
  id: number
  code: string
  name: string
  active: boolean
}

// البيانات الافتراضية لوحدات الأصناف
export const defaultProductUnits: ProductUnit[] = [
  {
    id: 1,
    code: "PCS",
    name: "قطعة",
    active: true,
  },
  {
    id: 2,
    code: "KG",
    name: "كيلوجرام",
    active: true,
  },
  {
    id: 3,
    code: "LTR",
    name: "لتر",
    active: true,
  },
  {
    id: 4,
    code: "BOX",
    name: "صندوق",
    active: true,
  },
  {
    id: 5,
    code: "BOTTLE",
    name: "زجاجة",
    active: true,
  },
  {
    id: 6,
    code: "TABLET",
    name: "قرص",
    active: true,
  },
  {
    id: 7,
    code: "AMP",
    name: "أمبول",
    active: false,
  },
  {
    id: 8,
    code: "VIAL",
    name: "قارورة",
    active: true,
  },
]

// Hook مشترك لإدارة حالة وحدات الأصناف
export function useProductUnitsController() {
  const [productUnits, setProductUnits] = useState<ProductUnit[]>(defaultProductUnits)
  const [showProductUnitDetails, setShowProductUnitDetails] = useState(false)
  const [selectedProductUnit, setSelectedProductUnit] = useState<ProductUnit | null>(null)
  const [isNewProductUnit, setIsNewProductUnit] = useState(false)

  // إنشاء وحدة صنف جديدة
  const createNewProductUnit = (): ProductUnit => ({
    id: 0,
    code: "",
    name: "",
    active: true,
  })

  // فتح شاشة إضافة وحدة صنف جديدة
  const handleNewProductUnit = () => {
    setSelectedProductUnit(createNewProductUnit())
    setShowProductUnitDetails(true)
    setIsNewProductUnit(true)
  }

  // فتح شاشة تعديل وحدة صنف
  const handleEditProductUnit = (productUnit: ProductUnit) => {
    setSelectedProductUnit(productUnit)
    setShowProductUnitDetails(true)
    setIsNewProductUnit(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowProductUnitDetails(false)
    setSelectedProductUnit(null)
    setIsNewProductUnit(false)
  }

  // حفظ وحدة الصنف
  const handleSaveProductUnit = (productUnitData: ProductUnit) => {
    if (isNewProductUnit) {
      // إضافة وحدة صنف جديدة
      const newProductUnit = {
        ...productUnitData,
        id: Math.max(...productUnits.map(p => p.id)) + 1
      }
      setProductUnits([...productUnits, newProductUnit])
    } else {
      // تحديث وحدة صنف موجودة
      setProductUnits(productUnits.map(p => 
        p.id === productUnitData.id ? productUnitData : p
      ))
    }
    handleCloseDetails()
  }

  // حذف وحدة صنف
  const handleDeleteProductUnit = (productUnitId: number) => {
    setProductUnits(productUnits.filter(p => p.id !== productUnitId))
  }

  // البحث في وحدات الأصناف
  const searchProductUnits = (searchTerm: string) => {
    if (!searchTerm.trim()) return productUnits
    
    return productUnits.filter(productUnit =>
      productUnit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productUnit.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    productUnits,
    showProductUnitDetails,
    selectedProductUnit,
    isNewProductUnit,
    handleNewProductUnit,
    handleEditProductUnit,
    handleCloseDetails,
    handleSaveProductUnit,
    handleDeleteProductUnit,
    searchProductUnits,
  }
}

// Utility functions مشتركة
export const productUnitUtils = {
  // التحقق من صحة بيانات وحدة الصنف
  validateProductUnit: (productUnit: ProductUnit): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!productUnit.name.trim()) errors.push("اسم الوحدة مطلوب")
    if (!productUnit.code.trim()) errors.push("كود الوحدة مطلوب")
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // تحويل الحالة إلى نص
  getStatusText: (active: boolean): string => {
    return active ? "نشط" : "غير نشط"
  },

  // الحصول على لون الحالة
  getStatusColor: (active: boolean): string => {
    return active ? "bg-green-500" : "bg-red-500"
  }
}
