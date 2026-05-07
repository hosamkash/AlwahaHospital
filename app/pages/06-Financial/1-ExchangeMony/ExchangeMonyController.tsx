"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface ExchangeMony {
  id: number
  branch: string
  code: string
  serial: string
  date: string
  entityType: string
  entityAccountName: string
  treasury: string
  itemName: string
  amount: number
  statement: string
  isClosed: boolean
  linkedToDocument: boolean
  documentCode: string
  documentData: string
  isTransferred: boolean
}

// Interface للتفاصيل
export interface ExchangeMonyDetails {
  id: number
  code: string
  serial: string
  date: string
  branch: string
  treasury: string
  entityType: string
  accountEntity: string
  itemName: string
  amount: number
  statement: string
  isClosed: boolean
  isTransferred: boolean
  linkedToDocument: boolean
  balance: number
}

// البيانات الافتراضية لسندات الدفع
export const defaultExchangeMony: ExchangeMony[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    code: "476",
    serial: "001",
    date: "2025-09-19",
    entityType: "موظف",
    entityAccountName: "أحمد محمد",
    treasury: "الصندوق العمومي",
    itemName: "بدلة موصلات",
    amount: 500.00,
    statement: "بدلة موصلات للموظف أحمد محمد",
    isClosed: false,
    linkedToDocument: false,
    documentCode: "",
    documentData: "",
    isTransferred: false,
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    code: "477",
    serial: "002",
    date: "2025-09-18",
    entityType: "مورد",
    entityAccountName: "شركة الأدوية المتحدة",
    treasury: "صندوق الطوارئ",
    itemName: "أدوية طوارئ",
    amount: 2500.00,
    statement: "دفعة مقدمة لشراء أدوية الطوارئ",
    isClosed: true,
    linkedToDocument: true,
    documentCode: "DOC001",
    documentData: "فاتورة شراء أدوية",
    isTransferred: true,
  },
  {
    id: 3,
    branch: "جدة العمومي",
    code: "478",
    serial: "003",
    date: "2025-09-17",
    entityType: "عميل",
    entityAccountName: "محمد علي",
    treasury: "الصندوق العمومي",
    itemName: "استرداد مبلغ",
    amount: 750.00,
    statement: "استرداد مبلغ زائد من العميل",
    isClosed: false,
    linkedToDocument: false,
    documentCode: "",
    documentData: "",
    isTransferred: false,
  },
]

// البيانات الافتراضية لتفاصيل سند الدفع
export const defaultExchangeMonyDetails: ExchangeMonyDetails = {
  id: 1,
  code: "476",
  serial: "0",
  date: "2025-09-19",
  branch: "مكه العمومي",
  treasury: "الصندوق العمومي",
  entityType: "",
  accountEntity: "",
  itemName: "بدلة موصلات",
  amount: 0.00,
  statement: "",
  isClosed: false,
  isTransferred: false,
  linkedToDocument: false,
  balance: 5744058.00,
}

// Hook للتحكم في البيانات
export const useExchangeMonyController = () => {
  const [exchangeMony, setExchangeMony] = useState<ExchangeMony[]>(defaultExchangeMony)
  const [selectedExchangeMony, setSelectedExchangeMony] = useState<ExchangeMonyDetails | null>(null)
  const [showExchangeMonyDetails, setShowExchangeMonyDetails] = useState(false)
  const [isNewExchangeMony, setIsNewExchangeMony] = useState(false)

  // إضافة سند دفع جديد
  const handleNewExchangeMony = () => {
    setSelectedExchangeMony({
      ...defaultExchangeMonyDetails,
      id: Date.now(),
      code: `${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    })
    setIsNewExchangeMony(true)
    setShowExchangeMonyDetails(true)
  }

  // تعديل سند دفع
  const handleEditExchangeMony = (exchangeMony: ExchangeMony) => {
    setSelectedExchangeMony({
      ...defaultExchangeMonyDetails,
      id: exchangeMony.id,
      code: exchangeMony.code,
      serial: exchangeMony.serial,
      date: exchangeMony.date,
      branch: exchangeMony.branch,
      treasury: exchangeMony.treasury,
      entityType: exchangeMony.entityType,
      accountEntity: exchangeMony.entityAccountName,
      itemName: exchangeMony.itemName,
      amount: exchangeMony.amount,
      statement: exchangeMony.statement,
      isClosed: exchangeMony.isClosed,
      isTransferred: exchangeMony.isTransferred,
      linkedToDocument: exchangeMony.linkedToDocument,
    })
    setIsNewExchangeMony(false)
    setShowExchangeMonyDetails(true)
  }

  // إغلاق تفاصيل سند الدفع
  const handleCloseDetails = () => {
    setShowExchangeMonyDetails(false)
    setSelectedExchangeMony(null)
    setIsNewExchangeMony(false)
  }

  // حفظ سند الدفع
  const handleSaveExchangeMony = (exchangeMony: ExchangeMonyDetails) => {
    if (isNewExchangeMony) {
      const newExchangeMony: ExchangeMony = {
        id: exchangeMony.id,
        branch: exchangeMony.branch,
        code: exchangeMony.code,
        serial: exchangeMony.serial,
        date: exchangeMony.date,
        entityType: exchangeMony.entityType,
        entityAccountName: exchangeMony.accountEntity,
        treasury: exchangeMony.treasury,
        itemName: exchangeMony.itemName,
        amount: exchangeMony.amount,
        statement: exchangeMony.statement,
        isClosed: exchangeMony.isClosed,
        linkedToDocument: exchangeMony.linkedToDocument,
        documentCode: "",
        documentData: "",
        isTransferred: exchangeMony.isTransferred,
      }
      setExchangeMony((prev) => [...prev, newExchangeMony])
    } else {
      setExchangeMony((prev) =>
        prev.map((existingExchangeMony) =>
          existingExchangeMony.id === exchangeMony.id
            ? {
                ...existingExchangeMony,
                branch: exchangeMony.branch,
                code: exchangeMony.code,
                serial: exchangeMony.serial,
                date: exchangeMony.date,
                entityType: exchangeMony.entityType,
                entityAccountName: exchangeMony.accountEntity,
                treasury: exchangeMony.treasury,
                itemName: exchangeMony.itemName,
                amount: exchangeMony.amount,
                statement: exchangeMony.statement,
                isClosed: exchangeMony.isClosed,
                linkedToDocument: exchangeMony.linkedToDocument,
                isTransferred: exchangeMony.isTransferred,
              }
            : existingExchangeMony
        )
      )
    }
    handleCloseDetails()
  }

  // حذف سند دفع
  const handleDeleteExchangeMony = (id: number) => {
    setExchangeMony((prev) => prev.filter((exchangeMony) => exchangeMony.id !== id))
  }

  // البحث في سندات الدفع
  const searchExchangeMony = (searchTerm: string) => {
    if (!searchTerm.trim()) return exchangeMony

    const term = searchTerm.toLowerCase()
    return exchangeMony.filter(
      (exchangeMony) =>
        exchangeMony.code.toLowerCase().includes(term) ||
        exchangeMony.branch.toLowerCase().includes(term) ||
        exchangeMony.entityAccountName.toLowerCase().includes(term) ||
        exchangeMony.itemName.toLowerCase().includes(term) ||
        exchangeMony.statement.toLowerCase().includes(term)
    )
  }

  // تحديث حالة سند الدفع
  const updateExchangeMonyStatus = (id: number, field: string, value: boolean) => {
    setExchangeMony((prev) =>
      prev.map((exchangeMony) =>
        exchangeMony.id === id ? { ...exchangeMony, [field]: value } : exchangeMony
      )
    )
  }

  return {
    exchangeMony,
    selectedExchangeMony,
    showExchangeMonyDetails,
    isNewExchangeMony,
    handleNewExchangeMony,
    handleEditExchangeMony,
    handleCloseDetails,
    handleSaveExchangeMony,
    handleDeleteExchangeMony,
    searchExchangeMony,
    updateExchangeMonyStatus,
  }
}

// Utility functions
export const exchangeMonyUtils = {
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

  // لون حالة الإغلاق
  getClosedColor: (isClosed: boolean) => {
    return isClosed ? "text-green-600" : "text-gray-600"
  },

  // لون حالة التحويل
  getTransferredColor: (isTransferred: boolean) => {
    return isTransferred ? "text-blue-600" : "text-gray-600"
  },

  // لون حالة الربط بالمستند
  getLinkedColor: (linkedToDocument: boolean) => {
    return linkedToDocument ? "text-purple-600" : "text-gray-600"
  },

  // خيارات التاريخ
  dateOptions: [
    { value: "today", label: "تاريخ اليوم" },
    { value: "all", label: "الكل" },
    { value: "period", label: "فترة زمنية" },
    { value: "month", label: "شهر" },
  ],

  // خيارات الفروع
  branchOptions: [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ],

  // خيارات الخزائن
  treasuryOptions: [
    { value: "الصندوق العمومي", label: "الصندوق العمومي" },
    { value: "صندوق الطوارئ", label: "صندوق الطوارئ" },
    { value: "صندوق العيادات", label: "صندوق العيادات" },
    { value: "صندوق العمليات", label: "صندوق العمليات" },
    { value: "الصندوق الرئيسي", label: "الصندوق الرئيسي" }
  ],

  // خيارات أنواع الجهات
  entityTypeOptions: [
    { value: "موظف", label: "موظف" },
    { value: "مورد", label: "مورد" },
    { value: "عميل", label: "عميل" },
    { value: "مقاول", label: "مقاول" },
    { value: "بنك", label: "بنك" }
  ],

  // خيارات الحسابات
  accountOptions: [
    { value: "أحمد محمد", label: "أحمد محمد" },
    { value: "سارة أحمد", label: "سارة أحمد" },
    { value: "محمد علي", label: "محمد علي" },
    { value: "فاطمة حسن", label: "فاطمة حسن" },
    { value: "علي محمود", label: "علي محمود" }
  ],

  // خيارات الأصناف
  itemOptions: [
    { value: "بدلة موصلات", label: "بدلة موصلات" },
    { value: "أدوية طوارئ", label: "أدوية طوارئ" },
    { value: "استرداد مبلغ", label: "استرداد مبلغ" },
    { value: "راتب موظف", label: "راتب موظف" },
    { value: "مصاريف تشغيل", label: "مصاريف تشغيل" }
  ],
}