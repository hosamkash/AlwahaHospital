"use client"

import { useState } from "react"

// Interface لمجموعات الأمراض
export interface DiseaseGroup {
  id: number
  code: number
  name: string
  active: boolean
  description: string
}

// البيانات الافتراضية لمجموعات الأمراض
export const defaultDiseaseGroups: DiseaseGroup[] = [
  {
    id: 1,
    code: 1001,
    name: "أمراض القلب والأوعية الدموية",
    active: true,
    description: "جميع الأمراض المتعلقة بالقلب والأوعية الدموية"
  },
  {
    id: 2,
    code: 1002,
    name: "أمراض الجهاز التنفسي",
    active: true,
    description: "أمراض الرئتين والجهاز التنفسي"
  },
  {
    id: 3,
    code: 1003,
    name: "أمراض الجهاز الهضمي",
    active: true,
    description: "أمراض المعدة والأمعاء والكبد"
  },
  {
    id: 4,
    code: 1004,
    name: "أمراض الجهاز العصبي",
    active: true,
    description: "أمراض الدماغ والأعصاب"
  },
  {
    id: 5,
    code: 1005,
    name: "أمراض العظام والمفاصل",
    active: true,
    description: "أمراض العظام والمفاصل والعمود الفقري"
  },
  {
    id: 6,
    code: 1006,
    name: "أمراض الجلد",
    active: true,
    description: "أمراض الجلد والشعر والأظافر"
  },
  {
    id: 7,
    code: 1007,
    name: "أمراض العيون",
    active: true,
    description: "أمراض العيون والرؤية"
  },
  {
    id: 8,
    code: 1008,
    name: "أمراض الأذن والأنف والحنجرة",
    active: true,
    description: "أمراض الأذن والأنف والحنجرة"
  }
]

// Hook لإدارة حالة مجموعات الأمراض
export function useDiseaseGroupsController() {
  const [diseaseGroups, setDiseaseGroups] = useState<DiseaseGroup[]>(defaultDiseaseGroups)
  const [showDiseaseGroupDetails, setShowDiseaseGroupDetails] = useState(false)
  const [selectedDiseaseGroup, setSelectedDiseaseGroup] = useState<DiseaseGroup | null>(null)
  const [isNewDiseaseGroup, setIsNewDiseaseGroup] = useState(false)

  // إنشاء مجموعة أمراض جديدة
  const createNewDiseaseGroup = (): DiseaseGroup => ({
    id: 0,
    code: 0,
    name: "",
    active: true,
    description: ""
  })

  // فتح شاشة إضافة مجموعة أمراض جديدة
  const handleNewDiseaseGroup = () => {
    setSelectedDiseaseGroup(createNewDiseaseGroup())
    setShowDiseaseGroupDetails(true)
    setIsNewDiseaseGroup(true)
  }

  // فتح شاشة تعديل مجموعة أمراض
  const handleEditDiseaseGroup = (diseaseGroup: DiseaseGroup) => {
    setSelectedDiseaseGroup(diseaseGroup)
    setShowDiseaseGroupDetails(true)
    setIsNewDiseaseGroup(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowDiseaseGroupDetails(false)
    setSelectedDiseaseGroup(null)
    setIsNewDiseaseGroup(false)
  }

  // حفظ مجموعة الأمراض
  const handleSaveDiseaseGroup = (diseaseGroupData: DiseaseGroup) => {
    if (isNewDiseaseGroup) {
      // إضافة مجموعة أمراض جديدة
      const newDiseaseGroup = {
        ...diseaseGroupData,
        id: Math.max(...diseaseGroups.map(d => d.id)) + 1
      }
      setDiseaseGroups([...diseaseGroups, newDiseaseGroup])
    } else {
      // تحديث مجموعة أمراض موجودة
      setDiseaseGroups(diseaseGroups.map(d => 
        d.id === diseaseGroupData.id ? diseaseGroupData : d
      ))
    }
    handleCloseDetails()
  }

  // حذف مجموعة أمراض
  const handleDeleteDiseaseGroup = (diseaseGroupId: number) => {
    setDiseaseGroups(diseaseGroups.filter(d => d.id !== diseaseGroupId))
  }

  // البحث في مجموعات الأمراض
  const searchDiseaseGroups = (searchTerm: string) => {
    if (!searchTerm.trim()) return diseaseGroups
    
    return diseaseGroups.filter(diseaseGroup =>
      diseaseGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diseaseGroup.code.toString().includes(searchTerm) ||
      diseaseGroup.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    diseaseGroups,
    showDiseaseGroupDetails,
    selectedDiseaseGroup,
    isNewDiseaseGroup,
    handleNewDiseaseGroup,
    handleEditDiseaseGroup,
    handleCloseDetails,
    handleSaveDiseaseGroup,
    handleDeleteDiseaseGroup,
    searchDiseaseGroups,
  }
}

// Utility functions مشتركة
export const diseaseGroupUtils = {
  // التحقق من صحة بيانات مجموعة الأمراض
  validateDiseaseGroup: (diseaseGroup: DiseaseGroup): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!diseaseGroup.name.trim()) errors.push("اسم المجموعة مطلوب")
    if (diseaseGroup.code <= 0) errors.push("كود المجموعة مطلوب")
    if (!diseaseGroup.description.trim()) errors.push("وصف المجموعة مطلوب")
    
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
