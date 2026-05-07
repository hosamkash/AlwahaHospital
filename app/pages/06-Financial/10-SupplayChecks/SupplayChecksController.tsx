"use client"

import { useState } from "react"

// Interface لشيكات القبض
export interface SupplayCheck {
  id: number
  branch: string
  code: string
  creationDate: string
  dueDate: string
  bank: string
  entityType: string
  entityName: string
  amount: number
  statement: string
  isCollected: boolean
  isRejected: boolean
}

// Interface للتفاصيل
export interface SupplayCheckDetails {
  id: number
  branch: string
  code: string
  checkNumber: number
  creationDate: string
  dueDate: string
  bank: string
  balance: number
  alertBeforeDue: number
  entityType: string
  entityName: string
  amount: number
  amountInWords: string
  statement: string
  isCollected: boolean
  isRejected: boolean
  rejectionReason: string
}

// البيانات الافتراضية لشيكات القبض
export const defaultSupplayChecks: SupplayCheck[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    code: "SC001",
    creationDate: "2025-09-19",
    dueDate: "2025-10-19",
    bank: "البنك الأهلي السعودي",
    entityType: "عميل",
    entityName: "شركة التأمين المتقدمة",
    amount: 25000.00,
    statement: "استلام شيك من عميل",
    isCollected: false,
    isRejected: false
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    code: "SC002",
    creationDate: "2025-09-18",
    dueDate: "2025-10-18",
    bank: "البنك السعودي للاستثمار",
    entityType: "مستشفى",
    entityName: "مستشفى الملك فهد",
    amount: 15000.00,
    statement: "استلام شيك من مستشفى",
    isCollected: true,
    isRejected: false
  },
  {
    id: 3,
    branch: "جدة العمومي",
    code: "SC003",
    creationDate: "2025-09-17",
    dueDate: "2025-10-17",
    bank: "البنك العربي الوطني",
    entityType: "عميل",
    entityName: "شركة الخدمات الطبية",
    amount: 12000.00,
    statement: "استلام شيك من عميل",
    isCollected: false,
    isRejected: true
  }
]

// البيانات الافتراضية لتفاصيل الشيك
export const defaultSupplayCheckDetails: SupplayCheckDetails = {
  id: 1,
  branch: "مكه العمومي",
  code: "1",
  checkNumber: 0,
  creationDate: "0001-01-01",
  dueDate: "0001-01-01",
  bank: "",
  balance: 0.00,
  alertBeforeDue: 0,
  entityType: "",
  entityName: "",
  amount: 0.00,
  amountInWords: "",
  statement: "",
  isCollected: false,
  isRejected: false,
  rejectionReason: ""
}

// Hook للتحكم في البيانات
export const useSupplayChecksController = () => {
  const [supplayChecks, setSupplayChecks] = useState<SupplayCheck[]>(defaultSupplayChecks)
  const [selectedSupplayCheck, setSelectedSupplayCheck] = useState<SupplayCheckDetails | null>(null)
  const [showSupplayCheckDetails, setShowSupplayCheckDetails] = useState(false)
  const [isNewSupplayCheck, setIsNewSupplayCheck] = useState(false)

  // إضافة شيك جديد
  const handleNewSupplayCheck = () => {
    setSelectedSupplayCheck({
      ...defaultSupplayCheckDetails,
      id: Date.now(),
      code: `${Date.now()}`,
      creationDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
    })
    setIsNewSupplayCheck(true)
    setShowSupplayCheckDetails(true)
  }

  // تعديل شيك
  const handleEditSupplayCheck = (supplayCheck: SupplayCheck) => {
    setSelectedSupplayCheck({
      ...defaultSupplayCheckDetails,
      id: supplayCheck.id,
      code: supplayCheck.code,
      creationDate: supplayCheck.creationDate,
      dueDate: supplayCheck.dueDate,
      bank: supplayCheck.bank,
      entityType: supplayCheck.entityType,
      entityName: supplayCheck.entityName,
      amount: supplayCheck.amount,
      statement: supplayCheck.statement,
      isCollected: supplayCheck.isCollected,
      isRejected: supplayCheck.isRejected,
    })
    setIsNewSupplayCheck(false)
    setShowSupplayCheckDetails(true)
  }

  // إغلاق تفاصيل الشيك
  const handleCloseDetails = () => {
    setShowSupplayCheckDetails(false)
    setSelectedSupplayCheck(null)
    setIsNewSupplayCheck(false)
  }

  // حفظ الشيك
  const handleSaveSupplayCheck = (supplayCheck: SupplayCheckDetails) => {
    if (isNewSupplayCheck) {
      const newSupplayCheck: SupplayCheck = {
        id: supplayCheck.id,
        branch: supplayCheck.branch,
        code: supplayCheck.code,
        creationDate: supplayCheck.creationDate,
        dueDate: supplayCheck.dueDate,
        bank: supplayCheck.bank,
        entityType: supplayCheck.entityType,
        entityName: supplayCheck.entityName,
        amount: supplayCheck.amount,
        statement: supplayCheck.statement,
        isCollected: supplayCheck.isCollected,
        isRejected: supplayCheck.isRejected,
      }
      setSupplayChecks((prev) => [...prev, newSupplayCheck])
    } else {
      setSupplayChecks((prev) =>
        prev.map((existingSupplayCheck) =>
          existingSupplayCheck.id === supplayCheck.id
            ? {
                ...existingSupplayCheck,
                branch: supplayCheck.branch,
                code: supplayCheck.code,
                creationDate: supplayCheck.creationDate,
                dueDate: supplayCheck.dueDate,
                bank: supplayCheck.bank,
                entityType: supplayCheck.entityType,
                entityName: supplayCheck.entityName,
                amount: supplayCheck.amount,
                statement: supplayCheck.statement,
                isCollected: supplayCheck.isCollected,
                isRejected: supplayCheck.isRejected,
              }
            : existingSupplayCheck
        )
      )
    }
    handleCloseDetails()
  }

  // حذف شيك
  const handleDeleteSupplayCheck = (id: number) => {
    setSupplayChecks((prev) => prev.filter((supplayCheck) => supplayCheck.id !== id))
  }

  // البحث في الشيكات
  const searchSupplayChecks = (searchTerm: string) => {
    if (!searchTerm.trim()) return supplayChecks

    const term = searchTerm.toLowerCase()
    return supplayChecks.filter(
      (supplayCheck) =>
        supplayCheck.code.toLowerCase().includes(term) ||
        supplayCheck.branch.toLowerCase().includes(term) ||
        supplayCheck.bank.toLowerCase().includes(term) ||
        supplayCheck.entityType.toLowerCase().includes(term) ||
        supplayCheck.entityName.toLowerCase().includes(term) ||
        supplayCheck.statement.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterSupplayChecksByDate = (supplayChecks: SupplayCheck[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return supplayChecks.filter(item => {
      if (dateFilter === "today") {
        const today = new Date().toISOString().split('T')[0]
        return item.creationDate === today
      } else if (dateFilter === "month") {
        if (!selectedMonth) return true
        const itemDate = new Date(item.creationDate)
        const currentYear = new Date().getFullYear()
        return itemDate.getMonth() === (parseInt(selectedMonth) - 1) && itemDate.getFullYear() === currentYear
      } else if (dateFilter === "period" && fromDate && toDate) {
        return item.creationDate >= fromDate && item.creationDate <= toDate
      }
      return true // "all" option
    })
  }

  return {
    supplayChecks,
    selectedSupplayCheck,
    showSupplayCheckDetails,
    isNewSupplayCheck,
    handleNewSupplayCheck,
    handleEditSupplayCheck,
    handleCloseDetails,
    handleSaveSupplayCheck,
    handleDeleteSupplayCheck,
    searchSupplayChecks,
    filterSupplayChecksByDate,
  }
}

// Utility functions
export const supplayChecksUtils = {
  // تنسيق التاريخ
  formatDate: (date: string) => {
    return new Date(date).toLocaleDateString('ar-EG')
  },

  // تنسيق المبلغ
  formatAmount: (amount: number) => {
    return amount.toLocaleString('ar-EG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  },

  // تنسيق الرصيد
  formatBalance: (balance: number) => {
    return balance.toLocaleString('ar-EG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  },

  // لون حالة التحصيل
  getCollectedColor: (isCollected: boolean) => {
    return isCollected ? "text-green-600" : "text-red-600"
  },

  // لون حالة الرفض
  getRejectedColor: (isRejected: boolean) => {
    return isRejected ? "text-red-600" : "text-green-600"
  },

  // خيارات الفروع
  branchOptions: [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ],

  // خيارات البنوك
  bankOptions: [
    { value: "البنك الأهلي السعودي", label: "البنك الأهلي السعودي" },
    { value: "البنك السعودي للاستثمار", label: "البنك السعودي للاستثمار" },
    { value: "البنك العربي الوطني", label: "البنك العربي الوطني" },
    { value: "بنك الراجحي", label: "بنك الراجحي" },
    { value: "البنك السعودي الفرنسي", label: "البنك السعودي الفرنسي" }
  ],

  // خيارات أنواع الجهات
  entityTypeOptions: [
    { value: "عميل", label: "عميل" },
    { value: "مستشفى", label: "مستشفى" },
    { value: "مورد", label: "مورد" },
    { value: "مقاول", label: "مقاول" },
    { value: "موظف", label: "موظف" }
  ],

  // خيارات التاريخ
  dateOptions: [
    { value: "today", label: "تاريخ اليوم" },
    { value: "all", label: "الكل" },
    { value: "period", label: "فترة زمنية" },
    { value: "month", label: "شهر" },
  ],
}
