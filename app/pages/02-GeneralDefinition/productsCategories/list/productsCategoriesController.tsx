"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface ProductCategory {
  id: number
  code: string
  name: string
  active: boolean
}

// البيانات الافتراضية لتصنيفات الأصناف
export const defaultProductCategories: ProductCategory[] = [
  {
    id: 1,
    code: "MED",
    name: "أدوية",
    active: true,
  },
  {
    id: 2,
    code: "SUP",
    name: "مستلزمات طبية",
    active: true,
  },
  {
    id: 3,
    code: "EQP",
    name: "أجهزة طبية",
    active: true,
  },
  {
    id: 4,
    code: "LAB",
    name: "مواد مختبر",
    active: true,
  },
  {
    id: 5,
    code: "CON",
    name: "مواد استهلاكية",
    active: true,
  },
  {
    id: 6,
    code: "SUR",
    name: "أدوات جراحية",
    active: true,
  },
  {
    id: 7,
    code: "RAD",
    name: "مواد أشعة",
    active: false,
  },
  {
    id: 8,
    code: "PHY",
    name: "مواد علاج طبيعي",
    active: true,
  },
]

// Hook مشترك لإدارة حالة تصنيفات الأصناف
export function useProductCategoriesController() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(defaultProductCategories)
  const [showProductCategoryDetails, setShowProductCategoryDetails] = useState(false)
  const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory | null>(null)
  const [isNewProductCategory, setIsNewProductCategory] = useState(false)

  // إنشاء تصنيف صنف جديد
  const createNewProductCategory = (): ProductCategory => ({
    id: 0,
    code: "",
    name: "",
    active: true,
  })

  // فتح شاشة إضافة تصنيف صنف جديد
  const handleNewProductCategory = () => {
    setSelectedProductCategory(createNewProductCategory())
    setShowProductCategoryDetails(true)
    setIsNewProductCategory(true)
  }

  // فتح شاشة تعديل تصنيف صنف
  const handleEditProductCategory = (productCategory: ProductCategory) => {
    setSelectedProductCategory(productCategory)
    setShowProductCategoryDetails(true)
    setIsNewProductCategory(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowProductCategoryDetails(false)
    setSelectedProductCategory(null)
    setIsNewProductCategory(false)
  }

  // حفظ تصنيف الصنف
  const handleSaveProductCategory = (productCategoryData: ProductCategory) => {
    if (isNewProductCategory) {
      // إضافة تصنيف صنف جديد
      const newProductCategory = {
        ...productCategoryData,
        id: Math.max(...productCategories.map(p => p.id)) + 1
      }
      setProductCategories([...productCategories, newProductCategory])
    } else {
      // تحديث تصنيف صنف موجود
      setProductCategories(productCategories.map(p => 
        p.id === productCategoryData.id ? productCategoryData : p
      ))
    }
    handleCloseDetails()
  }

  // حذف تصنيف صنف
  const handleDeleteProductCategory = (productCategoryId: number) => {
    setProductCategories(productCategories.filter(p => p.id !== productCategoryId))
  }

  // البحث في تصنيفات الأصناف
  const searchProductCategories = (searchTerm: string) => {
    if (!searchTerm.trim()) return productCategories
    
    return productCategories.filter(productCategory =>
      productCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productCategory.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    productCategories,
    showProductCategoryDetails,
    selectedProductCategory,
    isNewProductCategory,
    handleNewProductCategory,
    handleEditProductCategory,
    handleCloseDetails,
    handleSaveProductCategory,
    handleDeleteProductCategory,
    searchProductCategories,
  }
}

// Utility functions مشتركة
export const productCategoryUtils = {
  // التحقق من صحة بيانات تصنيف الصنف
  validateProductCategory: (productCategory: ProductCategory): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!productCategory.name.trim()) errors.push("اسم التصنيف مطلوب")
    if (!productCategory.code.trim()) errors.push("كود التصنيف مطلوب")
    
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
