"use client"

import { useState } from "react"
import { defaultDiseaseGroups } from "../DiseaseGroupsController"

// Interface مشتركة لبيانات المرض
export interface Disease {
  id: number
  code: string
  categoryId: number
  name: string
  description: string
  isCommon: boolean
  isInfectious: boolean
  active: boolean
} 

// Interface لمجموعات الأمراض (مبسطة للاستخدام داخل شاشة الأمراض)
export interface DiseaseCategory {
  id: number
  code: string
  name: string
  active: boolean
  description: string
}

// البيانات الافتراضية لمجموعات الأمراض (نفس عناصر شاشة إدارة مجموعات الأمراض)
export const defaultDiseaseCategories: DiseaseCategory[] = defaultDiseaseGroups.map(g => ({
  id: g.id,
  code: String(g.code),
  name: g.name,
  active: g.active,
  description: g.description,
}))

// البيانات الافتراضية للأمراض
export const defaultDiseases: Disease[] = [
  {
    id: 1,
    code: "HTN001",
    categoryId: 1,
    name: "ارتفاع ضغط الدم",
    description: "ارتفاع ضغط الدم المزمن",
    isCommon: true,
    isInfectious: false,
    active: true
  },
  {
    id: 2,
    code: "DM001",
    categoryId: 5,
    name: "مرض السكري",
    description: "مرض السكري من النوع الثاني",
    isCommon: true,
    isInfectious: false,
    active: true
  },
  {
    id: 3,
    code: "FLU001",
    categoryId: 6,
    name: "الإنفلونزا",
    description: "الإنفلونزا الموسمية",
    isCommon: true,
    isInfectious: true,
    active: true
  },
  {
    id: 4,
    code: "ASTH001",
    categoryId: 2,
    name: "الربو",
    description: "الربو الشعبي",
    isCommon: true,
    isInfectious: false,
    active: true
  },
  {
    id: 5,
    code: "GAST001",
    categoryId: 3,
    name: "التهاب المعدة",
    description: "التهاب المعدة المزمن",
    isCommon: true,
    isInfectious: false,
    active: true
  }
]

// Hook مشترك لإدارة حالة الأمراض
export function useDiseaseController() {
  const [diseases, setDiseases] = useState<Disease[]>(defaultDiseases)
  const [categories] = useState<DiseaseCategory[]>(defaultDiseaseCategories)
  const [showDiseaseDetails, setShowDiseaseDetails] = useState(false)
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)
  const [isNewDisease, setIsNewDisease] = useState(false)

  // إنشاء مرض جديد
  const createNewDisease = (): Disease => ({
    id: 0,
    code: "",
    categoryId: categories[0]?.id ?? 1,
    name: "",
    description: "",
    isCommon: false,
    isInfectious: false,
    active: true
  })

  // فتح شاشة إضافة مرض جديد
  const handleNewDisease = () => {
    setSelectedDisease(createNewDisease())
    setShowDiseaseDetails(true)
    setIsNewDisease(true)
  }

  // فتح شاشة تعديل مرض
  const handleEditDisease = (disease: Disease) => {
    setSelectedDisease(disease)
    setShowDiseaseDetails(true)
    setIsNewDisease(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowDiseaseDetails(false)
    setSelectedDisease(null)
    setIsNewDisease(false)
  }

  // حفظ المرض
  const handleSaveDisease = (diseaseData: Disease) => {
    if (isNewDisease) {
      // إضافة مرض جديد
      const newDisease = {
        ...diseaseData,
        id: Math.max(...diseases.map(d => d.id)) + 1
      }
      setDiseases([...diseases, newDisease])
    } else {
      // تحديث مرض موجود
      setDiseases(diseases.map(d => 
        d.id === diseaseData.id ? diseaseData : d
      ))
    }
    handleCloseDetails()
  }

  // حذف مرض
  const handleDeleteDisease = (diseaseId: number) => {
    setDiseases(diseases.filter(d => d.id !== diseaseId))
  }

  // البحث في الأمراض
  const searchDiseases = (searchTerm: string) => {
    if (!searchTerm.trim()) return diseases
    
    return diseases.filter(disease =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // الحصول على اسم المجموعة
  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : "غير محدد"
  }

  return {
    diseases,
    categories,
    showDiseaseDetails,
    selectedDisease,
    isNewDisease,
    handleNewDisease,
    handleEditDisease,
    handleCloseDetails,
    handleSaveDisease,
    handleDeleteDisease,
    searchDiseases,
    getCategoryName,
  }
}

// Utility functions مشتركة
export const diseaseUtils = {
  // التحقق من صحة بيانات المرض
  validateDisease: (disease: Disease): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!disease.name.trim()) errors.push("اسم المرض مطلوب")
    if (!disease.code.trim()) errors.push("كود المرض مطلوب")
    if (!disease.description.trim()) errors.push("وصف المرض مطلوب")
    if (disease.categoryId === 0) errors.push("يجب اختيار مجموعة المرض")
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // الحصول على اسم مجموعة المرض (من قائمة المجموعات الحالية)
  getCategoryName: (categoryId: number): string => {
    const category = defaultDiseaseCategories.find(c => c.id === categoryId)
    return category ? category.name : "غير محدد"
  },

  // تحويل الحالة إلى نص
  getStatusText: (active: boolean): string => {
    return active ? "نشط" : "غير نشط"
  },

  // الحصول على لون الحالة
  getStatusColor: (active: boolean): string => {
    return active ? "bg-green-500" : "bg-red-500"
  },

  // تنسيق كود المرض
  formatDiseaseCode: (code: string): string => {
    return code.toUpperCase().trim()
  }
}
