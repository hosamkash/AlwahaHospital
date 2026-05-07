"use client"

import { useState } from "react"

// Interface for Medical Service Category
export interface MedicalServiceCategory {
  id: number
  code: number
  name: string
  active: boolean
  description: string
}

// Interface for Medical Service
export interface MedicalService {
  id: number
  code: number
  categoryId: number
  name: string
  price: number
  description: string
  active: boolean
}

// Default Medical Service Categories Data
export const defaultMedicalServiceCategories: MedicalServiceCategory[] = [
  {
    id: 1,
    code: 2001,
    name: "خدمات الطوارئ",
    active: true,
    description: "الخدمات الطبية الطارئة"
  },
  {
    id: 2,
    code: 2002,
    name: "خدمات العيادات الخارجية",
    active: true,
    description: "خدمات العيادات الخارجية"
  },
  {
    id: 3,
    code: 2003,
    name: "خدمات العمليات",
    active: true,
    description: "خدمات العمليات الجراحية"
  },
  {
    id: 4,
    code: 2004,
    name: "خدمات المختبر",
    active: true,
    description: "خدمات المختبر والتحاليل"
  },
  {
    id: 5,
    code: 2005,
    name: "خدمات الصيدلية",
    active: true,
    description: "خدمات الصيدلية والأدوية"
  }
]

// Default Medical Services Data
export const defaultMedicalServices: MedicalService[] = [
  {
    id: 1,
    code: 3001,
    categoryId: 1,
    name: "استقبال الطوارئ",
    price: 100.00,
    description: "رسوم استقبال قسم الطوارئ",
    active: true
  },
  {
    id: 2,
    code: 3002,
    categoryId: 1,
    name: "علاج الجروح",
    price: 200.00,
    description: "علاج الجروح والخياطة",
    active: true
  },
  {
    id: 3,
    code: 3003,
    categoryId: 2,
    name: "كشف طبيب عام",
    price: 150.00,
    description: "كشف طبيب عام في العيادة الخارجية",
    active: true
  },
  {
    id: 4,
    code: 3004,
    categoryId: 2,
    name: "كشف طبيب أخصائي",
    price: 300.00,
    description: "كشف طبيب أخصائي في العيادة الخارجية",
    active: true
  },
  {
    id: 5,
    code: 3005,
    categoryId: 3,
    name: "عملية استئصال الزائدة",
    price: 5000.00,
    description: "عملية استئصال الزائدة الدودية",
    active: true
  },
  {
    id: 6,
    code: 3006,
    categoryId: 3,
    name: "عملية المرارة",
    price: 8000.00,
    description: "عملية استئصال المرارة",
    active: true
  },
  {
    id: 7,
    code: 3007,
    categoryId: 4,
    name: "تحليل الدم الشامل",
    price: 250.00,
    description: "تحليل الدم الشامل CBC",
    active: true
  },
  {
    id: 8,
    code: 3008,
    categoryId: 5,
    name: "صرف أدوية",
    price: 50.00,
    description: "رسوم صرف الأدوية من الصيدلية",
    active: true
  }
]

// Custom Hook for Medical Services Management
export const useMedicalServicesController = () => {
  const [medicalServices, setMedicalServices] = useState<MedicalService[]>(defaultMedicalServices)
  const [categories, setCategories] = useState<MedicalServiceCategory[]>(defaultMedicalServiceCategories)
  const [showMedicalServiceDetails, setShowMedicalServiceDetails] = useState(false)
  const [selectedMedicalService, setSelectedMedicalService] = useState<MedicalService | null>(null)
  const [isNewMedicalService, setIsNewMedicalService] = useState(false)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<MedicalServiceCategory | null>(null)
  const [isNewCategory, setIsNewCategory] = useState(false)

  const createNewMedicalService = (): MedicalService => ({
    id: Math.max(...medicalServices.map(ms => ms.id), 0) + 1,
    code: Math.max(...medicalServices.map(ms => ms.code), 3000) + 1,
    categoryId: categories.length > 0 ? categories[0].id : 0,
    name: "",
    price: 0,
    description: "",
    active: true
  })

  const createNewCategory = (): MedicalServiceCategory => ({
    id: Math.max(...categories.map(c => c.id), 0) + 1,
    code: Math.max(...categories.map(c => c.code), 2000) + 1,
    name: "",
    active: true,
    description: ""
  })

  const handleNewMedicalService = () => {
    setSelectedMedicalService(createNewMedicalService())
    setIsNewMedicalService(true)
    setShowMedicalServiceDetails(true)
  }

  const handleEditMedicalService = (medicalService: MedicalService) => {
    setSelectedMedicalService({ ...medicalService })
    setIsNewMedicalService(false)
    setShowMedicalServiceDetails(true)
  }

  const handleCloseMedicalServiceDetails = () => {
    setShowMedicalServiceDetails(false)
    setSelectedMedicalService(null)
    setIsNewMedicalService(false)
  }

  const handleSaveMedicalService = (medicalService: MedicalService) => {
    if (isNewMedicalService) {
      setMedicalServices(prev => [...prev, medicalService])
    } else {
      setMedicalServices(prev => prev.map(ms => ms.id === medicalService.id ? medicalService : ms))
    }
    handleCloseMedicalServiceDetails()
  }

  const handleDeleteMedicalService = (medicalServiceId: number) => {
    setMedicalServices(prev => prev.filter(ms => ms.id !== medicalServiceId))
  }

  const handleNewCategory = () => {
    setSelectedCategory(createNewCategory())
    setIsNewCategory(true)
    setShowCategoryDialog(true)
  }

  const handleOpenCategoryDialog = () => {
    setShowCategoryDialog(true)
  }

  const handleEditCategory = (category: MedicalServiceCategory) => {
    setSelectedCategory({ ...category })
    setIsNewCategory(false)
    setShowCategoryDialog(true)
  }

  const handleCloseCategoryDialog = () => {
    setShowCategoryDialog(false)
    setSelectedCategory(null)
    setIsNewCategory(false)
  }

  const handleSaveCategory = (category: MedicalServiceCategory) => {
    if (isNewCategory) {
      setCategories(prev => [...prev, category])
    } else {
      setCategories(prev => prev.map(c => c.id === category.id ? category : c))
    }
    handleCloseCategoryDialog()
  }

  const handleDeleteCategory = (categoryId: number) => {
    // Check if category is used in any medical service
    const isUsed = medicalServices.some(ms => ms.categoryId === categoryId)
    if (isUsed) {
      alert("لا يمكن حذف المجموعة لأنها مستخدمة في خدمات طبية موجودة")
      return
    }
    setCategories(prev => prev.filter(c => c.id !== categoryId))
  }

  const searchMedicalServices = (searchTerm: string) => {
    if (!searchTerm.trim()) return medicalServices
    return medicalServices.filter(ms =>
      ms.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ms.code.toString().includes(searchTerm) ||
      ms.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : "غير محدد"
  }

  return {
    medicalServices,
    categories,
    showMedicalServiceDetails,
    selectedMedicalService,
    isNewMedicalService,
    showCategoryDialog,
    selectedCategory,
    isNewCategory,
    handleNewMedicalService,
    handleEditMedicalService,
    handleCloseMedicalServiceDetails,
    handleSaveMedicalService,
    handleDeleteMedicalService,
    handleNewCategory,
    handleOpenCategoryDialog,
    handleEditCategory,
    handleCloseCategoryDialog,
    handleSaveCategory,
    handleDeleteCategory,
    searchMedicalServices,
    getCategoryName,
  }
}

// Utility Functions
export const medicalServicesUtils = {
  validateMedicalService: (medicalService: MedicalService): boolean => {
    return medicalService.name.trim().length > 0 && medicalService.code > 0 && medicalService.categoryId > 0
  },

  validateCategory: (category: MedicalServiceCategory): boolean => {
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
