"use client"

import { useState } from "react"

// Interface مشتركة لبيانات نوع التخدير
export interface AnesthesiaType {
  id: number
  code: string
  name: string
  description: string
  active: boolean
}

// البيانات الافتراضية لأنواع التخدير
export const defaultAnesthesiaTypes: AnesthesiaType[] = [
  {
    id: 1,
    code: "GEN",
    name: "تخدير عام",
    description: "التخدير العام الكامل للمريض",
    active: true
  },
  {
    id: 2,
    code: "LOC",
    name: "تخدير موضعي",
    description: "التخدير الموضعي لمنطقة محددة",
    active: true
  },
  {
    id: 3,
    code: "REG",
    name: "تخدير إقليمي",
    description: "التخدير الإقليمي لمنطقة واسعة",
    active: true
  },
  {
    id: 4,
    code: "SED",
    name: "تخدير واعي",
    description: "التخدير الواعي مع إبقاء المريض مستيقظاً",
    active: true
  },
  {
    id: 5,
    code: "SPI",
    name: "تخدير نخاعي",
    description: "التخدير النخاعي للحوض والأطراف السفلية",
    active: true
  },
  {
    id: 6,
    code: "EPI",
    name: "تخدير فوق الجافية",
    description: "التخدير فوق الجافية للعمليات الجراحية",
    active: true
  },
  {
    id: 7,
    code: "NIT",
    name: "أكسيد النيتروز",
    description: "تخدير باستخدام أكسيد النيتروز",
    active: true
  },
  {
    id: 8,
    code: "INT",
    name: "تخدير بالاستنشاق",
    description: "التخدير بالاستنشاق للعمليات الطويلة",
    active: true
  },
  {
    id: 9,
    code: "TOT",
    name: "تخدير كلي بالوريد",
    description: "التخدير الكلي بالوريد بدون استنشاق",
    active: true
  },
  {
    id: 10,
    code: "BAL",
    name: "تخدير متوازن",
    description: "التخدير المتوازن باستخدام عدة أدوية",
    active: true
  }
]

// Hook مشترك لإدارة حالة أنواع التخدير
export function useAnesthesiaTypesController() {
  const [anesthesiaTypes, setAnesthesiaTypes] = useState<AnesthesiaType[]>(defaultAnesthesiaTypes)
  const [showAnesthesiaTypeDetails, setShowAnesthesiaTypeDetails] = useState(false)
  const [selectedAnesthesiaType, setSelectedAnesthesiaType] = useState<AnesthesiaType | null>(null)
  const [isNewAnesthesiaType, setIsNewAnesthesiaType] = useState(false)

  // إنشاء نوع تخدير جديد
  const createNewAnesthesiaType = (): AnesthesiaType => ({
    id: 0,
    code: "",
    name: "",
    description: "",
    active: true
  })

  // فتح شاشة إضافة نوع تخدير جديد
  const handleNewAnesthesiaType = () => {
    setSelectedAnesthesiaType(createNewAnesthesiaType())
    setShowAnesthesiaTypeDetails(true)
    setIsNewAnesthesiaType(true)
  }

  // فتح شاشة تعديل نوع تخدير
  const handleEditAnesthesiaType = (anesthesiaType: AnesthesiaType) => {
    setSelectedAnesthesiaType(anesthesiaType)
    setShowAnesthesiaTypeDetails(true)
    setIsNewAnesthesiaType(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowAnesthesiaTypeDetails(false)
    setSelectedAnesthesiaType(null)
    setIsNewAnesthesiaType(false)
  }

  // حفظ نوع التخدير
  const handleSaveAnesthesiaType = (anesthesiaTypeData: AnesthesiaType) => {
    if (isNewAnesthesiaType) {
      // إضافة نوع تخدير جديد
      const newAnesthesiaType = {
        ...anesthesiaTypeData,
        id: Math.max(...anesthesiaTypes.map(a => a.id)) + 1
      }
      setAnesthesiaTypes([...anesthesiaTypes, newAnesthesiaType])
    } else {
      // تحديث نوع تخدير موجود
      setAnesthesiaTypes(anesthesiaTypes.map(a => 
        a.id === anesthesiaTypeData.id ? anesthesiaTypeData : a
      ))
    }
    handleCloseDetails()
  }

  // حذف نوع تخدير
  const handleDeleteAnesthesiaType = (anesthesiaTypeId: number) => {
    setAnesthesiaTypes(anesthesiaTypes.filter(a => a.id !== anesthesiaTypeId))
  }

  // البحث في أنواع التخدير
  const searchAnesthesiaTypes = (searchTerm: string) => {
    if (!searchTerm.trim()) return anesthesiaTypes
    
    return anesthesiaTypes.filter(anesthesiaType =>
      anesthesiaType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anesthesiaType.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anesthesiaType.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    anesthesiaTypes,
    showAnesthesiaTypeDetails,
    selectedAnesthesiaType,
    isNewAnesthesiaType,
    handleNewAnesthesiaType,
    handleEditAnesthesiaType,
    handleCloseDetails,
    handleSaveAnesthesiaType,
    handleDeleteAnesthesiaType,
    searchAnesthesiaTypes,
  }
}

// Utility functions مشتركة
export const anesthesiaTypesUtils = {
  // التحقق من صحة بيانات نوع التخدير
  validateAnesthesiaType: (anesthesiaType: AnesthesiaType): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!anesthesiaType.name.trim()) errors.push("اسم نوع التخدير مطلوب")
    if (!anesthesiaType.code.trim()) errors.push("كود نوع التخدير مطلوب")
    if (!anesthesiaType.description.trim()) errors.push("وصف نوع التخدير مطلوب")
    
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
  },

  // تنسيق كود نوع التخدير
  formatAnesthesiaTypeCode: (code: string): string => {
    return code.toUpperCase().trim()
  }
}
