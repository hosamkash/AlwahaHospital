"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface Department {
  id: number
  code: string
  name: string
  active: boolean
  description: string
}

// البيانات الافتراضية للإدارات
export const defaultDepartments: Department[] = [
  {
    id: 1,
    code: "IT",
    name: "قسم تكنولوجيا المعلومات",
    active: true,
    description: "إدارة وتطوير أنظمة المستشفى التقنية",
  },
  {
    id: 2,
    code: "HR",
    name: "قسم الموارد البشرية",
    active: true,
    description: "إدارة شئون العاملين والموظفين",
  },
  {
    id: 3,
    code: "FIN",
    name: "قسم المالية",
    active: true,
    description: "إدارة الشئون المالية والمحاسبية",
  },
  {
    id: 4,
    code: "MED",
    name: "القسم الطبي",
    active: true,
    description: "إدارة الخدمات الطبية والعلاجية",
  },
  {
    id: 5,
    code: "ADMIN",
    name: "الإدارة العامة",
    active: false,
    description: "الإدارة العامة للمستشفى",
  },
]

// Hook مشترك لإدارة حالة الإدارات
export function useDepartmentsController() {
  const [departments, setDepartments] = useState<Department[]>(defaultDepartments)
  const [showDepartmentDetails, setShowDepartmentDetails] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isNewDepartment, setIsNewDepartment] = useState(false)

  // إنشاء إدارة جديدة
  const createNewDepartment = (): Department => ({
    id: 0,
    code: "",
    name: "",
    active: true,
    description: "",
  })

  // فتح شاشة إضافة إدارة جديدة
  const handleNewDepartment = () => {
    setSelectedDepartment(createNewDepartment())
    setShowDepartmentDetails(true)
    setIsNewDepartment(true)
  }

  // فتح شاشة تعديل إدارة
  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setShowDepartmentDetails(true)
    setIsNewDepartment(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowDepartmentDetails(false)
    setSelectedDepartment(null)
    setIsNewDepartment(false)
  }

  // حفظ الإدارة
  const handleSaveDepartment = (departmentData: Department) => {
    if (isNewDepartment) {
      // إضافة إدارة جديدة
      const newDepartment = {
        ...departmentData,
        id: Math.max(...departments.map(d => d.id)) + 1
      }
      setDepartments([...departments, newDepartment])
    } else {
      // تحديث إدارة موجودة
      setDepartments(departments.map(d => 
        d.id === departmentData.id ? departmentData : d
      ))
    }
    handleCloseDetails()
  }

  // حذف إدارة
  const handleDeleteDepartment = (departmentId: number) => {
    setDepartments(departments.filter(d => d.id !== departmentId))
  }

  // البحث في الإدارات
  const searchDepartments = (searchTerm: string) => {
    if (!searchTerm.trim()) return departments
    
    return departments.filter(department =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    departments,
    showDepartmentDetails,
    selectedDepartment,
    isNewDepartment,
    handleNewDepartment,
    handleEditDepartment,
    handleCloseDetails,
    handleSaveDepartment,
    handleDeleteDepartment,
    searchDepartments,
  }
}

// Utility functions مشتركة
export const departmentUtils = {
  // التحقق من صحة بيانات الإدارة
  validateDepartment: (department: Department): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!department.name.trim()) errors.push("اسم الإدارة مطلوب")
    if (!department.code.trim()) errors.push("كود الإدارة مطلوب")
    if (!department.description.trim()) errors.push("وصف الإدارة مطلوب")
    
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
