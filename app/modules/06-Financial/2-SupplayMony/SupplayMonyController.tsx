"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface SupplayMony {
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
export interface SupplayMonyDetails {
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

// البيانات الافتراضية لسندات القبض
export const defaultSupplayMony: SupplayMony[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    code: "501",
    serial: "001",
    date: "2025-09-19",
    entityType: "عميل",
    entityAccountName: "أحمد محمد",
    treasury: "الصندوق العمومي",
    itemName: "دفعة مقدمة",
    amount: 1500.00,
    statement: "دفعة مقدمة من العميل أحمد محمد",
    isClosed: false,
    linkedToDocument: false,
    documentCode: "",
    documentData: "",
    isTransferred: false,
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    code: "502",
    serial: "002",
    date: "2025-09-18",
    entityType: "مورد",
    entityAccountName: "شركة الأدوية المتحدة",
    treasury: "صندوق الطوارئ",
    itemName: "استرداد مبلغ",
    amount: 3200.00,
    statement: "استرداد مبلغ من مورد الأدوية",
    isClosed: true,
    linkedToDocument: true,
    documentCode: "DOC002",
    documentData: "فاتورة استرداد",
    isTransferred: true,
  },
  {
    id: 3,
    branch: "جدة العمومي",
    code: "503",
    serial: "003",
    date: "2025-09-17",
    entityType: "بنك",
    entityAccountName: "البنك الأهلي",
    treasury: "الصندوق العمومي",
    itemName: "قرض بنكي",
    amount: 50000.00,
    statement: "قرض بنكي من البنك الأهلي",
    isClosed: false,
    linkedToDocument: false,
    documentCode: "",
    documentData: "",
    isTransferred: false,
  },
]

// البيانات الافتراضية لتفاصيل سند القبض
export const defaultSupplayMonyDetails: SupplayMonyDetails = {
  id: 1,
  code: "501",
  serial: "0",
  date: "2025-09-19",
  branch: "مكه العمومي",
  treasury: "الصندوق العمومي",
  entityType: "",
  accountEntity: "",
  itemName: "دفعة مقدمة",
  amount: 0.00,
  statement: "",
  isClosed: false,
  isTransferred: false,
  linkedToDocument: false,
  balance: 5744058.00,
}

// Hook للتحكم في البيانات
export const useSupplayMonyController = () => {
  const [supplayMony, setSupplayMony] = useState<SupplayMony[]>(defaultSupplayMony)
  const [selectedSupplayMony, setSelectedSupplayMony] = useState<SupplayMonyDetails | null>(null)
  const [showSupplayMonyDetails, setShowSupplayMonyDetails] = useState(false)
  const [isNewSupplayMony, setIsNewSupplayMony] = useState(false)

  // إضافة سند قبض جديد
  const handleNewSupplayMony = () => {
    setSelectedSupplayMony({
      ...defaultSupplayMonyDetails,
      id: Date.now(),
      code: `${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    })
    setIsNewSupplayMony(true)
    setShowSupplayMonyDetails(true)
  }

  // تعديل سند قبض
  const handleEditSupplayMony = (supplayMony: SupplayMony) => {
    setSelectedSupplayMony({
      ...defaultSupplayMonyDetails,
      id: supplayMony.id,
      code: supplayMony.code,
      serial: supplayMony.serial,
      date: supplayMony.date,
      branch: supplayMony.branch,
      treasury: supplayMony.treasury,
      entityType: supplayMony.entityType,
      accountEntity: supplayMony.entityAccountName,
      itemName: supplayMony.itemName,
      amount: supplayMony.amount,
      statement: supplayMony.statement,
      isClosed: supplayMony.isClosed,
      isTransferred: supplayMony.isTransferred,
      linkedToDocument: supplayMony.linkedToDocument,
    })
    setIsNewSupplayMony(false)
    setShowSupplayMonyDetails(true)
  }

  // إغلاق تفاصيل سند القبض
  const handleCloseDetails = () => {
    setShowSupplayMonyDetails(false)
    setSelectedSupplayMony(null)
    setIsNewSupplayMony(false)
  }

  // حفظ سند القبض
  const handleSaveSupplayMony = (supplayMony: SupplayMonyDetails) => {
    if (isNewSupplayMony) {
      const newSupplayMony: SupplayMony = {
        id: supplayMony.id,
        branch: supplayMony.branch,
        code: supplayMony.code,
        serial: supplayMony.serial,
        date: supplayMony.date,
        entityType: supplayMony.entityType,
        entityAccountName: supplayMony.accountEntity,
        treasury: supplayMony.treasury,
        itemName: supplayMony.itemName,
        amount: supplayMony.amount,
        statement: supplayMony.statement,
        isClosed: supplayMony.isClosed,
        linkedToDocument: supplayMony.linkedToDocument,
        documentCode: "",
        documentData: "",
        isTransferred: supplayMony.isTransferred,
      }
      setSupplayMony((prev) => [...prev, newSupplayMony])
    } else {
      setSupplayMony((prev) =>
        prev.map((existingSupplayMony) =>
          existingSupplayMony.id === supplayMony.id
            ? {
                ...existingSupplayMony,
                branch: supplayMony.branch,
                code: supplayMony.code,
                serial: supplayMony.serial,
                date: supplayMony.date,
                entityType: supplayMony.entityType,
                entityAccountName: supplayMony.accountEntity,
                treasury: supplayMony.treasury,
                itemName: supplayMony.itemName,
                amount: supplayMony.amount,
                statement: supplayMony.statement,
                isClosed: supplayMony.isClosed,
                linkedToDocument: supplayMony.linkedToDocument,
                isTransferred: supplayMony.isTransferred,
              }
            : existingSupplayMony
        )
      )
    }
    handleCloseDetails()
  }

  // حذف سند قبض
  const handleDeleteSupplayMony = (id: number) => {
    setSupplayMony((prev) => prev.filter((supplayMony) => supplayMony.id !== id))
  }

  // البحث في سندات القبض
  const searchSupplayMony = (searchTerm: string) => {
    if (!searchTerm.trim()) return supplayMony

    const term = searchTerm.toLowerCase()
    return supplayMony.filter(
      (supplayMony) =>
        supplayMony.code.toLowerCase().includes(term) ||
        supplayMony.branch.toLowerCase().includes(term) ||
        supplayMony.entityAccountName.toLowerCase().includes(term) ||
        supplayMony.itemName.toLowerCase().includes(term) ||
        supplayMony.statement.toLowerCase().includes(term)
    )
  }

  // تحديث حالة سند القبض
  const updateSupplayMonyStatus = (id: number, field: string, value: boolean) => {
    setSupplayMony((prev) =>
      prev.map((supplayMony) =>
        supplayMony.id === id ? { ...supplayMony, [field]: value } : supplayMony
      )
    )
  }

  return {
    supplayMony,
    selectedSupplayMony,
    showSupplayMonyDetails,
    isNewSupplayMony,
    handleNewSupplayMony,
    handleEditSupplayMony,
    handleCloseDetails,
    handleSaveSupplayMony,
    handleDeleteSupplayMony,
    searchSupplayMony,
    updateSupplayMonyStatus,
  }
}

// Utility functions
export const supplayMonyUtils = {
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
    { value: "عميل", label: "عميل" },
    { value: "مورد", label: "مورد" },
    { value: "موظف", label: "موظف" },
    { value: "بنك", label: "بنك" },
    { value: "مقاول", label: "مقاول" }
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
    { value: "دفعة مقدمة", label: "دفعة مقدمة" },
    { value: "استرداد مبلغ", label: "استرداد مبلغ" },
    { value: "قرض بنكي", label: "قرض بنكي" },
    { value: "إيرادات خدمات", label: "إيرادات خدمات" },
    { value: "مبيعات نقدية", label: "مبيعات نقدية" }
  ],
}
