"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface FinancialClause {
  id: number
  code: number
  name: string
  active: boolean
  itemType: string
  isDefaultForCashTransfers: boolean
}

// البيانات الافتراضية لبنود الماليات
export const defaultFinancialClauses: FinancialClause[] = [
  {
    id: 1,
    code: 1,
    name: "قيمة الفاتورة",
    active: true,
    itemType: "سند قبض",
    isDefaultForCashTransfers: false,
  },
  {
    id: 2,
    code: 2,
    name: "مصاريف إدارية",
    active: true,
    itemType: "سند دفع",
    isDefaultForCashTransfers: false,
  },
  {
    id: 3,
    code: 3,
    name: "مصاريف تشغيلية",
    active: true,
    itemType: "سند دفع",
    isDefaultForCashTransfers: false,
  },
  {
    id: 4,
    code: 4,
    name: "إيرادات خدمات طبية",
    active: true,
    itemType: "سند قبض",
    isDefaultForCashTransfers: false,
  },
  {
    id: 5,
    code: 5,
    name: "مصاريف صيانة",
    active: true,
    itemType: "سند دفع",
    isDefaultForCashTransfers: false,
  },
  {
    id: 6,
    code: 6,
    name: "إيرادات صيدلية",
    active: true,
    itemType: "سند قبض",
    isDefaultForCashTransfers: false,
  },
  {
    id: 7,
    code: 7,
    name: "مصاريف رواتب",
    active: false,
    itemType: "سند دفع",
    isDefaultForCashTransfers: false,
  },
  {
    id: 8,
    code: 8,
    name: "تحويلات نقدية",
    active: true,
    itemType: "سند دفع",
    isDefaultForCashTransfers: true,
  },
]

// أنواع البنود المتاحة
export const itemTypes = [
  "سند قبض",
  "سند دفع",
]

// Hook مشترك لإدارة حالة بنود الماليات
export function useFinancialClausesController() {
  const [financialClauses, setFinancialClauses] = useState<FinancialClause[]>(defaultFinancialClauses)
  const [showFinancialClauseDetails, setShowFinancialClauseDetails] = useState(false)
  const [selectedFinancialClause, setSelectedFinancialClause] = useState<FinancialClause | null>(null)
  const [isNewFinancialClause, setIsNewFinancialClause] = useState(false)

  // إنشاء بند مالي جديد
  const createNewFinancialClause = (): FinancialClause => ({
    id: 0,
    code: 0,
    name: "",
    active: true,
    itemType: "سند قبض",
    isDefaultForCashTransfers: false,
  })

  // فتح شاشة إضافة بند مالي جديد
  const handleNewFinancialClause = () => {
    setSelectedFinancialClause(createNewFinancialClause())
    setShowFinancialClauseDetails(true)
    setIsNewFinancialClause(true)
  }

  // فتح شاشة تعديل بند مالي
  const handleEditFinancialClause = (financialClause: FinancialClause) => {
    setSelectedFinancialClause(financialClause)
    setShowFinancialClauseDetails(true)
    setIsNewFinancialClause(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowFinancialClauseDetails(false)
    setSelectedFinancialClause(null)
    setIsNewFinancialClause(false)
  }

  // حفظ البند المالي
  const handleSaveFinancialClause = (financialClauseData: FinancialClause) => {
    if (isNewFinancialClause) {
      // إضافة بند مالي جديد
      const newFinancialClause = {
        ...financialClauseData,
        id: Math.max(...financialClauses.map(f => f.id)) + 1
      }
      setFinancialClauses([...financialClauses, newFinancialClause])
    } else {
      // تحديث بند مالي موجود
      setFinancialClauses(financialClauses.map(f => 
        f.id === financialClauseData.id ? financialClauseData : f
      ))
    }
    handleCloseDetails()
  }

  // حذف بند مالي
  const handleDeleteFinancialClause = (financialClauseId: number) => {
    setFinancialClauses(financialClauses.filter(f => f.id !== financialClauseId))
  }

  // البحث في بنود الماليات
  const searchFinancialClauses = (searchTerm: string) => {
    if (!searchTerm.trim()) return financialClauses
    
    return financialClauses.filter(financialClause =>
      financialClause.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      financialClause.code.toString().includes(searchTerm) ||
      financialClause.itemType.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    financialClauses,
    showFinancialClauseDetails,
    selectedFinancialClause,
    isNewFinancialClause,
    handleNewFinancialClause,
    handleEditFinancialClause,
    handleCloseDetails,
    handleSaveFinancialClause,
    handleDeleteFinancialClause,
    searchFinancialClauses,
  }
}

// Utility functions مشتركة
export const financialClauseUtils = {
  // التحقق من صحة بيانات البند المالي
  validateFinancialClause: (financialClause: FinancialClause): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!financialClause.name.trim()) errors.push("اسم البند مطلوب")
    if (financialClause.code <= 0) errors.push("كود البند مطلوب")
    if (!financialClause.itemType.trim()) errors.push("نوع البند مطلوب")
    
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

  // تحويل نوع البند إلى نص
  getItemTypeText: (itemType: string): string => {
    return itemType || "غير محدد"
  },


  // تحويل الحالة إلى نص للبند الافتراضي
  getDefaultForTransfersText: (isDefault: boolean): string => {
    return isDefault ? "نعم" : "لا"
  }
}