"use client"

import { useState } from "react"

// Interface for Radiology Category
export interface RadiologyCategory {
  id: number
  code: number
  name: string
  active: boolean
  description: string
}

// Interface for Radiology
export interface Radiology {
  id: number
  code: number
  categoryId: number
  name: string
  price: number
  description: string
  active: boolean
}

// Default Radiology Categories Data
export const defaultRadiologyCategories: RadiologyCategory[] = [
  {
    id: 1,
    code: 1001,
    name: "أشعة سينية",
    active: true,
    description: "الأشعة السينية التقليدية"
  },
  {
    id: 2,
    code: 1002,
    name: "أشعة مقطعية",
    active: true,
    description: "الأشعة المقطعية المحوسبة"
  },
  {
    id: 3,
    code: 1003,
    name: "أشعة رنين مغناطيسي",
    active: true,
    description: "الرنين المغناطيسي"
  },
  {
    id: 4,
    code: 1004,
    name: "أشعة بالموجات فوق الصوتية",
    active: true,
    description: "الأشعة بالموجات فوق الصوتية"
  },
  {
    id: 5,
    code: 1005,
    name: "أشعة النظائر المشعة",
    active: true,
    description: "أشعة النظائر المشعة"
  }
]

// Default Radiology Data
export const defaultRadiology: Radiology[] = [
  {
    id: 1,
    code: 2001,
    categoryId: 1,
    name: "أشعة سينية للصدر",
    price: 150.00,
    description: "أشعة سينية للصدر من الأمام والخلف",
    active: true
  },
  {
    id: 2,
    code: 2002,
    categoryId: 1,
    name: "أشعة سينية للعمود الفقري",
    price: 200.00,
    description: "أشعة سينية للعمود الفقري العنقي",
    active: true
  },
  {
    id: 3,
    code: 2003,
    categoryId: 2,
    name: "أشعة مقطعية للرأس",
    price: 800.00,
    description: "أشعة مقطعية للرأس بدون صبغة",
    active: true
  },
  {
    id: 4,
    code: 2004,
    categoryId: 2,
    name: "أشعة مقطعية للبطن",
    price: 1200.00,
    description: "أشعة مقطعية للبطن والحوض",
    active: true
  },
  {
    id: 5,
    code: 2005,
    categoryId: 3,
    name: "رنين مغناطيسي للرأس",
    price: 1500.00,
    description: "رنين مغناطيسي للرأس بدون صبغة",
    active: true
  },
  {
    id: 6,
    code: 2006,
    categoryId: 3,
    name: "رنين مغناطيسي للعمود الفقري",
    price: 1800.00,
    description: "رنين مغناطيسي للعمود الفقري",
    active: true
  },
  {
    id: 7,
    code: 2007,
    categoryId: 4,
    name: "أشعة بالموجات فوق الصوتية للبطن",
    price: 300.00,
    description: "أشعة بالموجات فوق الصوتية للبطن",
    active: true
  },
  {
    id: 8,
    code: 2008,
    categoryId: 4,
    name: "أشعة بالموجات فوق الصوتية للقلب",
    price: 500.00,
    description: "أشعة بالموجات فوق الصوتية للقلب",
    active: true
  }
]

// Custom Hook for Radiology Management
export const useRadiologyController = () => {
  const [radiology, setRadiology] = useState<Radiology[]>(defaultRadiology)
  const [categories, setCategories] = useState<RadiologyCategory[]>(defaultRadiologyCategories)
  const [showRadiologyDetails, setShowRadiologyDetails] = useState(false)
  const [selectedRadiology, setSelectedRadiology] = useState<Radiology | null>(null)
  const [isNewRadiology, setIsNewRadiology] = useState(false)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<RadiologyCategory | null>(null)
  const [isNewCategory, setIsNewCategory] = useState(false)

  const createNewRadiology = (): Radiology => ({
    id: Math.max(...radiology.map(r => r.id), 0) + 1,
    code: Math.max(...radiology.map(r => r.code), 2000) + 1,
    categoryId: categories.length > 0 ? categories[0].id : 0,
    name: "",
    price: 0,
    description: "",
    active: true
  })

  const createNewCategory = (): RadiologyCategory => ({
    id: Math.max(...categories.map(c => c.id), 0) + 1,
    code: Math.max(...categories.map(c => c.code), 1000) + 1,
    name: "",
    active: true,
    description: ""
  })

  const handleNewRadiology = () => {
    setSelectedRadiology(createNewRadiology())
    setIsNewRadiology(true)
    setShowRadiologyDetails(true)
  }

  const handleEditRadiology = (radiologyItem: Radiology) => {
    setSelectedRadiology({ ...radiologyItem })
    setIsNewRadiology(false)
    setShowRadiologyDetails(true)
  }

  const handleCloseRadiologyDetails = () => {
    setShowRadiologyDetails(false)
    setSelectedRadiology(null)
    setIsNewRadiology(false)
  }

  const handleSaveRadiology = (radiologyItem: Radiology) => {
    if (isNewRadiology) {
      setRadiology(prev => [...prev, radiologyItem])
    } else {
      setRadiology(prev => prev.map(r => r.id === radiologyItem.id ? radiologyItem : r))
    }
    handleCloseRadiologyDetails()
  }

  const handleDeleteRadiology = (radiologyId: number) => {
    setRadiology(prev => prev.filter(r => r.id !== radiologyId))
  }

  const handleNewCategory = () => {
    setSelectedCategory(createNewCategory())
    setIsNewCategory(true)
    setShowCategoryDialog(true)
  }

  const handleOpenCategoryDialog = () => {
    setShowCategoryDialog(true)
  }

  const handleEditCategory = (category: RadiologyCategory) => {
    setSelectedCategory({ ...category })
    setIsNewCategory(false)
    setShowCategoryDialog(true)
  }

  const handleCloseCategoryDialog = () => {
    setShowCategoryDialog(false)
    setSelectedCategory(null)
    setIsNewCategory(false)
  }

  const handleSaveCategory = (category: RadiologyCategory) => {
    if (isNewCategory) {
      setCategories(prev => [...prev, category])
    } else {
      setCategories(prev => prev.map(c => c.id === category.id ? category : c))
    }
    handleCloseCategoryDialog()
  }

  const handleDeleteCategory = (categoryId: number) => {
    // Check if category is used in any radiology
    const isUsed = radiology.some(r => r.categoryId === categoryId)
    if (isUsed) {
      alert("لا يمكن حذف المجموعة لأنها مستخدمة في أشعة موجودة")
      return
    }
    setCategories(prev => prev.filter(c => c.id !== categoryId))
  }

  const searchRadiology = (searchTerm: string) => {
    if (!searchTerm.trim()) return radiology
    return radiology.filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toString().includes(searchTerm) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : "غير محدد"
  }

  return {
    radiology,
    categories,
    showRadiologyDetails,
    selectedRadiology,
    isNewRadiology,
    showCategoryDialog,
    selectedCategory,
    isNewCategory,
    handleNewRadiology,
    handleEditRadiology,
    handleCloseRadiologyDetails,
    handleSaveRadiology,
    handleDeleteRadiology,
    handleNewCategory,
    handleOpenCategoryDialog,
    handleEditCategory,
    handleCloseCategoryDialog,
    handleSaveCategory,
    handleDeleteCategory,
    searchRadiology,
    getCategoryName,
  }
}

// Utility Functions
export const radiologyUtils = {
  validateRadiology: (radiology: Radiology): boolean => {
    return radiology.name.trim().length > 0 && radiology.code > 0 && radiology.categoryId > 0
  },

  validateCategory: (category: RadiologyCategory): boolean => {
    return category.name.trim().length > 0 && category.code > 0
  },

  getStatusText: (active: boolean): string => {
    return active ? "نشط" : "غير نشط"
  },

  getStatusColor: (active: boolean): string => {
    return active ? "bg-green-500" : "bg-red-500"
  },

  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 2
    }).format(amount)
  }
}
