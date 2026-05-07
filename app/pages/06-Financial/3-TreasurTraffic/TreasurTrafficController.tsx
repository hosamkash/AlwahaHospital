"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface TreasurTraffic {
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
  trafficType: string // نوع الحركة (داخلية، خارجية)
  previousBalance: number // الرصيد السابق
  currentBalance: number // الرصيد الحالي
}

// Interface للتفاصيل
export interface TreasurTrafficDetails {
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
  trafficType: string
  previousBalance: number
  currentBalance: number
}

// البيانات الافتراضية لحركة الخزينة
export const defaultTreasurTraffic: TreasurTraffic[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    code: "TT001",
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
    trafficType: "داخلية",
    previousBalance: 100000.00,
    currentBalance: 101500.00,
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    code: "TT002",
    serial: "002",
    date: "2025-09-18",
    entityType: "مورد",
    entityAccountName: "شركة الأدوية المتحدة",
    treasury: "صندوق الطوارئ",
    itemName: "دفع فاتورة",
    amount: -2500.00,
    statement: "دفع فاتورة شراء أدوية",
    isClosed: true,
    linkedToDocument: true,
    documentCode: "DOC001",
    documentData: "فاتورة شراء أدوية",
    isTransferred: true,
    trafficType: "خارجية",
    previousBalance: 50000.00,
    currentBalance: 47500.00,
  },
  {
    id: 3,
    branch: "جدة العمومي",
    code: "TT003",
    serial: "003",
    date: "2025-09-17",
    entityType: "بنك",
    entityAccountName: "البنك الأهلي",
    treasury: "الصندوق العمومي",
    itemName: "إيداع بنكي",
    amount: 10000.00,
    statement: "إيداع مبلغ في البنك الأهلي",
    isClosed: false,
    linkedToDocument: false,
    documentCode: "",
    documentData: "",
    isTransferred: false,
    trafficType: "داخلية",
    previousBalance: 75000.00,
    currentBalance: 85000.00,
  },
  {
    id: 4,
    branch: "الدمام العمومي",
    code: "TT004",
    serial: "004",
    date: "2025-09-16",
    entityType: "موظف",
    entityAccountName: "سارة أحمد",
    treasury: "صندوق العيادات",
    itemName: "راتب موظف",
    amount: -3000.00,
    statement: "دفع راتب الموظفة سارة أحمد",
    isClosed: true,
    linkedToDocument: true,
    documentCode: "DOC002",
    documentData: "كشف رواتب",
    isTransferred: false,
    trafficType: "خارجية",
    previousBalance: 25000.00,
    currentBalance: 22000.00,
  },
  {
    id: 5,
    branch: "الطائف العمومي",
    code: "TT005",
    serial: "005",
    date: "2025-09-15",
    entityType: "عميل",
    entityAccountName: "محمد علي",
    treasury: "الصندوق الرئيسي",
    itemName: "استرداد مبلغ",
    amount: 750.00,
    statement: "استرداد مبلغ زائد من العميل",
    isClosed: false,
    linkedToDocument: false,
    documentCode: "",
    documentData: "",
    isTransferred: false,
    trafficType: "داخلية",
    previousBalance: 200000.00,
    currentBalance: 200750.00,
  },
]

// البيانات الافتراضية لتفاصيل حركة الخزينة
export const defaultTreasurTrafficDetails: TreasurTrafficDetails = {
  id: 1,
  code: "TT001",
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
  balance: 100000.00,
  trafficType: "داخلية",
  previousBalance: 0.00,
  currentBalance: 0.00,
}

// Hook للتحكم في البيانات
export const useTreasurTrafficController = () => {
  const [treasurTraffic, setTreasurTraffic] = useState<TreasurTraffic[]>(defaultTreasurTraffic)
  const [selectedTreasurTraffic, setSelectedTreasurTraffic] = useState<TreasurTrafficDetails | null>(null)
  const [showTreasurTrafficDetails, setShowTreasurTrafficDetails] = useState(false)
  const [isNewTreasurTraffic, setIsNewTreasurTraffic] = useState(false)

  // إضافة حركة خزينة جديدة
  const handleNewTreasurTraffic = () => {
    setSelectedTreasurTraffic({
      ...defaultTreasurTrafficDetails,
      id: Date.now(),
      code: `TT${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    })
    setIsNewTreasurTraffic(true)
    setShowTreasurTrafficDetails(true)
  }

  // تعديل حركة خزينة
  const handleEditTreasurTraffic = (treasurTraffic: TreasurTraffic) => {
    setSelectedTreasurTraffic({
      ...defaultTreasurTrafficDetails,
      id: treasurTraffic.id,
      code: treasurTraffic.code,
      serial: treasurTraffic.serial,
      date: treasurTraffic.date,
      branch: treasurTraffic.branch,
      treasury: treasurTraffic.treasury,
      entityType: treasurTraffic.entityType,
      accountEntity: treasurTraffic.entityAccountName,
      itemName: treasurTraffic.itemName,
      amount: treasurTraffic.amount,
      statement: treasurTraffic.statement,
      isClosed: treasurTraffic.isClosed,
      isTransferred: treasurTraffic.isTransferred,
      linkedToDocument: treasurTraffic.linkedToDocument,
      trafficType: treasurTraffic.trafficType,
      previousBalance: treasurTraffic.previousBalance,
      currentBalance: treasurTraffic.currentBalance,
    })
    setIsNewTreasurTraffic(false)
    setShowTreasurTrafficDetails(true)
  }

  // إغلاق تفاصيل حركة الخزينة
  const handleCloseDetails = () => {
    setShowTreasurTrafficDetails(false)
    setSelectedTreasurTraffic(null)
    setIsNewTreasurTraffic(false)
  }

  // حفظ حركة الخزينة
  const handleSaveTreasurTraffic = (treasurTraffic: TreasurTrafficDetails) => {
    if (isNewTreasurTraffic) {
      const newTreasurTraffic: TreasurTraffic = {
        id: treasurTraffic.id,
        branch: treasurTraffic.branch,
        code: treasurTraffic.code,
        serial: treasurTraffic.serial,
        date: treasurTraffic.date,
        entityType: treasurTraffic.entityType,
        entityAccountName: treasurTraffic.accountEntity,
        treasury: treasurTraffic.treasury,
        itemName: treasurTraffic.itemName,
        amount: treasurTraffic.amount,
        statement: treasurTraffic.statement,
        isClosed: treasurTraffic.isClosed,
        linkedToDocument: treasurTraffic.linkedToDocument,
        documentCode: "",
        documentData: "",
        isTransferred: treasurTraffic.isTransferred,
        trafficType: treasurTraffic.trafficType,
        previousBalance: treasurTraffic.previousBalance,
        currentBalance: treasurTraffic.currentBalance,
      }
      setTreasurTraffic((prev) => [...prev, newTreasurTraffic])
    } else {
      setTreasurTraffic((prev) =>
        prev.map((existingTreasurTraffic) =>
          existingTreasurTraffic.id === treasurTraffic.id
            ? {
                ...existingTreasurTraffic,
                branch: treasurTraffic.branch,
                code: treasurTraffic.code,
                serial: treasurTraffic.serial,
                date: treasurTraffic.date,
                entityType: treasurTraffic.entityType,
                entityAccountName: treasurTraffic.accountEntity,
                treasury: treasurTraffic.treasury,
                itemName: treasurTraffic.itemName,
                amount: treasurTraffic.amount,
                statement: treasurTraffic.statement,
                isClosed: treasurTraffic.isClosed,
                linkedToDocument: treasurTraffic.linkedToDocument,
                isTransferred: treasurTraffic.isTransferred,
                trafficType: treasurTraffic.trafficType,
                previousBalance: treasurTraffic.previousBalance,
                currentBalance: treasurTraffic.currentBalance,
              }
            : existingTreasurTraffic
        )
      )
    }
    handleCloseDetails()
  }

  // حذف حركة خزينة
  const handleDeleteTreasurTraffic = (id: number) => {
    setTreasurTraffic((prev) => prev.filter((treasurTraffic) => treasurTraffic.id !== id))
  }

  // البحث في حركة الخزينة
  const searchTreasurTraffic = (searchTerm: string) => {
    if (!searchTerm.trim()) return treasurTraffic

    const term = searchTerm.toLowerCase()
    return treasurTraffic.filter(
      (treasurTraffic) =>
        treasurTraffic.code.toLowerCase().includes(term) ||
        treasurTraffic.branch.toLowerCase().includes(term) ||
        treasurTraffic.entityAccountName.toLowerCase().includes(term) ||
        treasurTraffic.itemName.toLowerCase().includes(term) ||
        treasurTraffic.statement.toLowerCase().includes(term) ||
        treasurTraffic.trafficType.toLowerCase().includes(term)
    )
  }

  // تحديث حالة حركة الخزينة
  const updateTreasurTrafficStatus = (id: number, field: string, value: boolean) => {
    setTreasurTraffic((prev) =>
      prev.map((treasurTraffic) =>
        treasurTraffic.id === id ? { ...treasurTraffic, [field]: value } : treasurTraffic
      )
    )
  }

  return {
    treasurTraffic,
    selectedTreasurTraffic,
    showTreasurTrafficDetails,
    isNewTreasurTraffic,
    handleNewTreasurTraffic,
    handleEditTreasurTraffic,
    handleCloseDetails,
    handleSaveTreasurTraffic,
    handleDeleteTreasurTraffic,
    searchTreasurTraffic,
    updateTreasurTrafficStatus,
  }
}

// Utility functions
export const treasurTrafficUtils = {
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

  // لون نوع الحركة
  getTrafficTypeColor: (trafficType: string) => {
    return trafficType === "داخلية" ? "text-green-600" : "text-red-600"
  },

  // لون المبلغ (إيجابي أو سلبي)
  getAmountColor: (amount: number) => {
    if (amount > 0) return "text-green-600"
    if (amount < 0) return "text-red-600"
    return "text-gray-600"
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
    { value: "دفع فاتورة", label: "دفع فاتورة" },
    { value: "إيداع بنكي", label: "إيداع بنكي" },
    { value: "راتب موظف", label: "راتب موظف" },
    { value: "استرداد مبلغ", label: "استرداد مبلغ" },
    { value: "تحويل داخلي", label: "تحويل داخلي" },
    { value: "سحب نقدي", label: "سحب نقدي" }
  ],

  // خيارات أنواع الحركة
  trafficTypeOptions: [
    { value: "داخلية", label: "داخلية" },
    { value: "خارجية", label: "خارجية" }
  ],
}
