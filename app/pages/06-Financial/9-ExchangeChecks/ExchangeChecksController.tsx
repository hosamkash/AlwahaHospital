"use client"

import { useState } from "react"

// Interface لشيكات الدفع
export interface ExchangeCheck {
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
export interface ExchangeCheckDetails {
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

// البيانات الافتراضية لشيكات الدفع
export const defaultExchangeChecks: ExchangeCheck[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    code: "EC001",
    creationDate: "2025-09-19",
    dueDate: "2025-10-19",
    bank: "البنك الأهلي السعودي",
    entityType: "مورد",
    entityName: "شركة الأدوية المتقدمة",
    amount: 15000.00,
    statement: "دفع فاتورة أدوية",
    isCollected: false,
    isRejected: false
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    code: "EC002",
    creationDate: "2025-09-18",
    dueDate: "2025-10-18",
    bank: "البنك السعودي للاستثمار",
    entityType: "مقاول",
    entityName: "مقاولات البناء الحديثة",
    amount: 25000.00,
    statement: "دفع مستحقات مقاولة",
    isCollected: true,
    isRejected: false
  },
  {
    id: 3,
    branch: "جدة العمومي",
    code: "EC003",
    creationDate: "2025-09-17",
    dueDate: "2025-10-17",
    bank: "البنك العربي الوطني",
    entityType: "مورد",
    entityName: "شركة المعدات الطبية",
    amount: 8500.00,
    statement: "دفع فاتورة معدات",
    isCollected: false,
    isRejected: true
  }
]

// البيانات الافتراضية لتفاصيل الشيك
export const defaultExchangeCheckDetails: ExchangeCheckDetails = {
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
export const useExchangeChecksController = () => {
  const [exchangeChecks, setExchangeChecks] = useState<ExchangeCheck[]>(defaultExchangeChecks)
  const [selectedExchangeCheck, setSelectedExchangeCheck] = useState<ExchangeCheckDetails | null>(null)
  const [showExchangeCheckDetails, setShowExchangeCheckDetails] = useState(false)
  const [isNewExchangeCheck, setIsNewExchangeCheck] = useState(false)

  // إضافة شيك جديد
  const handleNewExchangeCheck = () => {
    setSelectedExchangeCheck({
      ...defaultExchangeCheckDetails,
      id: Date.now(),
      code: `${Date.now()}`,
      creationDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
    })
    setIsNewExchangeCheck(true)
    setShowExchangeCheckDetails(true)
  }

  // تعديل شيك
  const handleEditExchangeCheck = (exchangeCheck: ExchangeCheck) => {
    setSelectedExchangeCheck({
      ...defaultExchangeCheckDetails,
      id: exchangeCheck.id,
      code: exchangeCheck.code,
      creationDate: exchangeCheck.creationDate,
      dueDate: exchangeCheck.dueDate,
      bank: exchangeCheck.bank,
      entityType: exchangeCheck.entityType,
      entityName: exchangeCheck.entityName,
      amount: exchangeCheck.amount,
      statement: exchangeCheck.statement,
      isCollected: exchangeCheck.isCollected,
      isRejected: exchangeCheck.isRejected,
    })
    setIsNewExchangeCheck(false)
    setShowExchangeCheckDetails(true)
  }

  // إغلاق تفاصيل الشيك
  const handleCloseDetails = () => {
    setShowExchangeCheckDetails(false)
    setSelectedExchangeCheck(null)
    setIsNewExchangeCheck(false)
  }

  // حفظ الشيك
  const handleSaveExchangeCheck = (exchangeCheck: ExchangeCheckDetails) => {
    if (isNewExchangeCheck) {
      const newExchangeCheck: ExchangeCheck = {
        id: exchangeCheck.id,
        branch: exchangeCheck.branch,
        code: exchangeCheck.code,
        creationDate: exchangeCheck.creationDate,
        dueDate: exchangeCheck.dueDate,
        bank: exchangeCheck.bank,
        entityType: exchangeCheck.entityType,
        entityName: exchangeCheck.entityName,
        amount: exchangeCheck.amount,
        statement: exchangeCheck.statement,
        isCollected: exchangeCheck.isCollected,
        isRejected: exchangeCheck.isRejected,
      }
      setExchangeChecks((prev) => [...prev, newExchangeCheck])
    } else {
      setExchangeChecks((prev) =>
        prev.map((existingExchangeCheck) =>
          existingExchangeCheck.id === exchangeCheck.id
            ? {
                ...existingExchangeCheck,
                branch: exchangeCheck.branch,
                code: exchangeCheck.code,
                creationDate: exchangeCheck.creationDate,
                dueDate: exchangeCheck.dueDate,
                bank: exchangeCheck.bank,
                entityType: exchangeCheck.entityType,
                entityName: exchangeCheck.entityName,
                amount: exchangeCheck.amount,
                statement: exchangeCheck.statement,
                isCollected: exchangeCheck.isCollected,
                isRejected: exchangeCheck.isRejected,
              }
            : existingExchangeCheck
        )
      )
    }
    handleCloseDetails()
  }

  // حذف شيك
  const handleDeleteExchangeCheck = (id: number) => {
    setExchangeChecks((prev) => prev.filter((exchangeCheck) => exchangeCheck.id !== id))
  }

  // البحث في الشيكات
  const searchExchangeChecks = (searchTerm: string) => {
    if (!searchTerm.trim()) return exchangeChecks

    const term = searchTerm.toLowerCase()
    return exchangeChecks.filter(
      (exchangeCheck) =>
        exchangeCheck.code.toLowerCase().includes(term) ||
        exchangeCheck.branch.toLowerCase().includes(term) ||
        exchangeCheck.bank.toLowerCase().includes(term) ||
        exchangeCheck.entityType.toLowerCase().includes(term) ||
        exchangeCheck.entityName.toLowerCase().includes(term) ||
        exchangeCheck.statement.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterExchangeChecksByDate = (exchangeChecks: ExchangeCheck[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return exchangeChecks.filter(item => {
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
    exchangeChecks,
    selectedExchangeCheck,
    showExchangeCheckDetails,
    isNewExchangeCheck,
    handleNewExchangeCheck,
    handleEditExchangeCheck,
    handleCloseDetails,
    handleSaveExchangeCheck,
    handleDeleteExchangeCheck,
    searchExchangeChecks,
    filterExchangeChecksByDate,
  }
}

// Utility functions
export const exchangeChecksUtils = {
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
    { value: "مورد", label: "مورد" },
    { value: "مقاول", label: "مقاول" },
    { value: "عميل", label: "عميل" },
    { value: "موظف", label: "موظف" },
    { value: "مستشفى", label: "مستشفى" }
  ],

  // خيارات التاريخ
  dateOptions: [
    { value: "today", label: "تاريخ اليوم" },
    { value: "all", label: "الكل" },
    { value: "period", label: "فترة زمنية" },
    { value: "month", label: "شهر" },
  ],
}
