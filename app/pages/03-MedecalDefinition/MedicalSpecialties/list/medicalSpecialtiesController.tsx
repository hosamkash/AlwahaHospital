"use client"

import { useState } from "react"

// Interface مشتركة لبيانات التخصص الطبي
export interface MedicalSpecialty {
  id: number
  code: string
  name: string
  description: string
  active: boolean
}

// البيانات الافتراضية للتخصصات الطبية
export const defaultMedicalSpecialties: MedicalSpecialty[] = [
  {
    id: 1,
    code: "CARD",
    name: "أمراض القلب",
    description: "تخصص أمراض القلب والأوعية الدموية",
    active: true
  },
  {
    id: 2,
    code: "NEUR",
    name: "الأعصاب",
    description: "تخصص أمراض الجهاز العصبي",
    active: true
  },
  {
    id: 3,
    code: "ORTH",
    name: "العظام",
    description: "تخصص جراحة العظام والمفاصل",
    active: true
  },
  {
    id: 4,
    code: "PEDI",
    name: "طب الأطفال",
    description: "تخصص طب الأطفال والرضع",
    active: true
  },
  {
    id: 5,
    code: "GYNE",
    name: "أمراض النساء",
    description: "تخصص أمراض النساء والتوليد",
    active: true
  },
  {
    id: 6,
    code: "DERM",
    name: "الأمراض الجلدية",
    description: "تخصص الأمراض الجلدية والتناسلية",
    active: true
  },
  {
    id: 7,
    code: "OPTH",
    name: "طب العيون",
    description: "تخصص طب العيون وجراحتها",
    active: true
  },
  {
    id: 8,
    code: "ENT",
    name: "أنف وأذن وحنجرة",
    description: "تخصص الأنف والأذن والحنجرة",
    active: true
  },
  {
    id: 9,
    code: "UROL",
    name: "المسالك البولية",
    description: "تخصص المسالك البولية والتناسلية",
    active: true
  },
  {
    id: 10,
    code: "PSYC",
    name: "الطب النفسي",
    description: "تخصص الطب النفسي والعصبي",
    active: true
  }
]

// Hook مشترك لإدارة حالة التخصصات الطبية
export function useMedicalSpecialtiesController() {
  const [specialties, setSpecialties] = useState<MedicalSpecialty[]>(defaultMedicalSpecialties)
  const [showSpecialtyDetails, setShowSpecialtyDetails] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState<MedicalSpecialty | null>(null)
  const [isNewSpecialty, setIsNewSpecialty] = useState(false)

  // إنشاء تخصص جديد
  const createNewSpecialty = (): MedicalSpecialty => ({
    id: 0,
    code: "",
    name: "",
    description: "",
    active: true
  })

  // فتح شاشة إضافة تخصص جديد
  const handleNewSpecialty = () => {
    setSelectedSpecialty(createNewSpecialty())
    setShowSpecialtyDetails(true)
    setIsNewSpecialty(true)
  }

  // فتح شاشة تعديل تخصص
  const handleEditSpecialty = (specialty: MedicalSpecialty) => {
    setSelectedSpecialty(specialty)
    setShowSpecialtyDetails(true)
    setIsNewSpecialty(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowSpecialtyDetails(false)
    setSelectedSpecialty(null)
    setIsNewSpecialty(false)
  }

  // حفظ التخصص
  const handleSaveSpecialty = (specialtyData: MedicalSpecialty) => {
    if (isNewSpecialty) {
      // إضافة تخصص جديد
      const newSpecialty = {
        ...specialtyData,
        id: Math.max(...specialties.map(s => s.id)) + 1
      }
      setSpecialties([...specialties, newSpecialty])
    } else {
      // تحديث تخصص موجود
      setSpecialties(specialties.map(s => 
        s.id === specialtyData.id ? specialtyData : s
      ))
    }
    handleCloseDetails()
  }

  // حذف تخصص
  const handleDeleteSpecialty = (specialtyId: number) => {
    setSpecialties(specialties.filter(s => s.id !== specialtyId))
  }

  // البحث في التخصصات
  const searchSpecialties = (searchTerm: string) => {
    if (!searchTerm.trim()) return specialties
    
    return specialties.filter(specialty =>
      specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialty.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    specialties,
    showSpecialtyDetails,
    selectedSpecialty,
    isNewSpecialty,
    handleNewSpecialty,
    handleEditSpecialty,
    handleCloseDetails,
    handleSaveSpecialty,
    handleDeleteSpecialty,
    searchSpecialties,
  }
}

// Utility functions مشتركة
export const medicalSpecialtiesUtils = {
  // التحقق من صحة بيانات التخصص
  validateSpecialty: (specialty: MedicalSpecialty): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!specialty.name.trim()) errors.push("اسم التخصص مطلوب")
    if (!specialty.code.trim()) errors.push("كود التخصص مطلوب")
    if (!specialty.description.trim()) errors.push("وصف التخصص مطلوب")
    
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

  // تنسيق كود التخصص
  formatSpecialtyCode: (code: string): string => {
    return code.toUpperCase().trim()
  }
}
