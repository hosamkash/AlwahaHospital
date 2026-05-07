"use client"

import { useState } from "react"

// Interface لتحويل النقدية
export interface TranesiferMony {
  id: number
  code: string
  date: string
  time: string
  transferInitiator: string
  fromBranch: string
  fromTreasury: string
  toBranch: string
  toTreasury: string
  amount: number
  isExecuted: boolean
  statement: string
  isClosed: boolean
}

// Interface للتفاصيل
export interface TranesiferMonyDetails {
  id: number
  code: string
  date: string
  time: string
  transferInitiator: string
  fromBranch: string
  fromTreasury: string
  toBranch: string
  toTreasury: string
  amount: number
  isExecuted: boolean
  statement: string
  isClosed: boolean
  balance: number
  transferType?: string
  priority?: string
  reference?: string
}

// البيانات الافتراضية لتحويل النقدية
export const defaultTranesiferMony: TranesiferMony[] = [
  {
    id: 1,
    code: "TM001",
    date: "2025-09-19",
    time: "11:03",
    transferInitiator: "أحمد محمد",
    fromBranch: "مكه العمومي",
    fromTreasury: "الصندوق العمومي",
    toBranch: "الرياض العمومي",
    toTreasury: "صندوق الطوارئ",
    amount: 5000.00,
    isExecuted: true,
    statement: "تحويل مبلغ للطوارئ في فرع الرياض",
    isClosed: false,
  },
  {
    id: 2,
    code: "TM002",
    date: "2025-09-18",
    time: "14:30",
    transferInitiator: "سارة أحمد",
    fromBranch: "جدة العمومي",
    fromTreasury: "صندوق العيادات",
    toBranch: "الدمام العمومي",
    toTreasury: "الصندوق الرئيسي",
    amount: 3000.00,
    isExecuted: false,
    statement: "تحويل مبلغ للعمليات في فرع الدمام",
    isClosed: false,
  },
  {
    id: 3,
    code: "TM003",
    date: "2025-09-17",
    time: "09:15",
    transferInitiator: "محمد علي",
    fromBranch: "الطائف العمومي",
    fromTreasury: "صندوق العمليات",
    toBranch: "مكه العمومي",
    toTreasury: "الصندوق العمومي",
    amount: 7500.00,
    isExecuted: true,
    statement: "تحويل مبلغ للصندوق العمومي في مكة",
    isClosed: true,
  },
  {
    id: 4,
    code: "TM004",
    date: "2025-09-16",
    time: "16:45",
    transferInitiator: "فاطمة حسن",
    fromBranch: "الرياض العمومي",
    fromTreasury: "صندوق الطوارئ",
    toBranch: "جدة العمومي",
    toTreasury: "صندوق العيادات",
    amount: 2500.00,
    isExecuted: true,
    statement: "تحويل مبلغ للعيادات في فرع جدة",
    isClosed: false,
  },
  {
    id: 5,
    code: "TM005",
    date: "2025-09-15",
    time: "10:20",
    transferInitiator: "خالد سعد",
    fromBranch: "الدمام العمومي",
    fromTreasury: "الصندوق الرئيسي",
    toBranch: "الطائف العمومي",
    toTreasury: "صندوق العمليات",
    amount: 4000.00,
    isExecuted: false,
    statement: "تحويل مبلغ للعمليات في فرع الطائف",
    isClosed: false,
  },
]

// البيانات الافتراضية لتفاصيل تحويل النقدية
export const defaultTranesiferMonyDetails: TranesiferMonyDetails = {
  id: 1,
  code: "TM001",
  date: new Date().toISOString().split('T')[0],
  time: "11:03",
  transferInitiator: "",
  fromBranch: "مكه العمومي",
  fromTreasury: "الصندوق العمومي",
  toBranch: "",
  toTreasury: "",
  amount: 0.00,
  isExecuted: false,
  statement: "",
  isClosed: false,
  balance: 5744058.60,
  transferType: "",
  priority: "",
  reference: ""
}

// Hook للتحكم في البيانات
export const useTranesiferMonyController = () => {
  const [tranesiferMony, setTranesiferMony] = useState<TranesiferMony[]>(defaultTranesiferMony)
  const [selectedTranesiferMony, setSelectedTranesiferMony] = useState<TranesiferMonyDetails | null>(null)
  const [showTranesiferMonyDetails, setShowTranesiferMonyDetails] = useState(false)
  const [isNewTranesiferMony, setIsNewTranesiferMony] = useState(false)

  const handleNewTranesiferMony = () => {
    setSelectedTranesiferMony({
      ...defaultTranesiferMonyDetails,
      id: Date.now(),
      code: `TM${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    })
    setIsNewTranesiferMony(true)
    setShowTranesiferMonyDetails(true)
  }

  const handleEditTranesiferMony = (tranesiferMony: TranesiferMony) => {
    setSelectedTranesiferMony({
      ...defaultTranesiferMonyDetails,
      id: tranesiferMony.id,
      code: tranesiferMony.code,
      date: tranesiferMony.date,
      time: tranesiferMony.time,
      transferInitiator: tranesiferMony.transferInitiator,
      fromBranch: tranesiferMony.fromBranch,
      fromTreasury: tranesiferMony.fromTreasury,
      toBranch: tranesiferMony.toBranch,
      toTreasury: tranesiferMony.toTreasury,
      amount: tranesiferMony.amount,
      isExecuted: tranesiferMony.isExecuted,
      statement: tranesiferMony.statement,
      isClosed: tranesiferMony.isClosed,
    })
    setIsNewTranesiferMony(false)
    setShowTranesiferMonyDetails(true)
  }

  const handleCloseDetails = () => {
    setShowTranesiferMonyDetails(false)
    setSelectedTranesiferMony(null)
    setIsNewTranesiferMony(false)
  }

  const handleSaveTranesiferMony = (tranesiferMony: TranesiferMonyDetails) => {
    if (isNewTranesiferMony) {
      const newTranesiferMony: TranesiferMony = {
        id: tranesiferMony.id,
        code: tranesiferMony.code,
        date: tranesiferMony.date,
        time: tranesiferMony.time,
        transferInitiator: tranesiferMony.transferInitiator,
        fromBranch: tranesiferMony.fromBranch,
        fromTreasury: tranesiferMony.fromTreasury,
        toBranch: tranesiferMony.toBranch,
        toTreasury: tranesiferMony.toTreasury,
        amount: tranesiferMony.amount,
        isExecuted: tranesiferMony.isExecuted,
        statement: tranesiferMony.statement,
        isClosed: tranesiferMony.isClosed,
      }
      setTranesiferMony((prev) => [...prev, newTranesiferMony])
    } else {
      setTranesiferMony((prev) =>
        prev.map((existingTranesiferMony) =>
          existingTranesiferMony.id === tranesiferMony.id
            ? {
                ...existingTranesiferMony,
                code: tranesiferMony.code,
                date: tranesiferMony.date,
                time: tranesiferMony.time,
                transferInitiator: tranesiferMony.transferInitiator,
                fromBranch: tranesiferMony.fromBranch,
                fromTreasury: tranesiferMony.fromTreasury,
                toBranch: tranesiferMony.toBranch,
                toTreasury: tranesiferMony.toTreasury,
                amount: tranesiferMony.amount,
                isExecuted: tranesiferMony.isExecuted,
                statement: tranesiferMony.statement,
                isClosed: tranesiferMony.isClosed,
              }
            : existingTranesiferMony
        )
      )
    }
    handleCloseDetails()
  }

  const handleDeleteTranesiferMony = (id: number) => {
    setTranesiferMony((prev) => prev.filter((tranesiferMony) => tranesiferMony.id !== id))
  }

  // البحث في تحويل النقدية
  const searchTranesiferMony = (searchTerm: string) => {
    if (!searchTerm.trim()) return tranesiferMony

    const term = searchTerm.toLowerCase()
    return tranesiferMony.filter(
      (tranesiferMony) =>
        tranesiferMony.code.toLowerCase().includes(term) ||
        tranesiferMony.transferInitiator.toLowerCase().includes(term) ||
        tranesiferMony.fromBranch.toLowerCase().includes(term) ||
        tranesiferMony.fromTreasury.toLowerCase().includes(term) ||
        tranesiferMony.toBranch.toLowerCase().includes(term) ||
        tranesiferMony.toTreasury.toLowerCase().includes(term) ||
        tranesiferMony.statement.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterTranesiferMonyByDate = (tranesiferMony: TranesiferMony[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return tranesiferMony.filter(item => {
      if (dateFilter === "today") {
        const today = new Date().toISOString().split('T')[0]
        return item.date === today
      } else if (dateFilter === "month") {
        if (!selectedMonth) return true
        const itemDate = new Date(item.date)
        const currentYear = new Date().getFullYear()
        return itemDate.getMonth() === (parseInt(selectedMonth) - 1) && itemDate.getFullYear() === currentYear
      } else if (dateFilter === "period" && fromDate && toDate) {
        return item.date >= fromDate && item.date <= toDate
      }
      return true // "all" option
    })
  }

  // تبديل الفروع والخزائن
  const switchBranchesAndTreasuries = (tranesiferMony: TranesiferMonyDetails) => {
    const tempBranch = tranesiferMony.fromBranch
    const tempTreasury = tranesiferMony.fromTreasury
    
    setSelectedTranesiferMony(prev => prev ? {
      ...prev,
      fromBranch: prev.toBranch,
      fromTreasury: prev.toTreasury,
      toBranch: tempBranch,
      toTreasury: tempTreasury,
    } : null)
  }

  return {
    tranesiferMony,
    selectedTranesiferMony,
    showTranesiferMonyDetails,
    isNewTranesiferMony,
    handleNewTranesiferMony,
    handleEditTranesiferMony,
    handleCloseDetails,
    handleSaveTranesiferMony,
    handleDeleteTranesiferMony,
    searchTranesiferMony,
    filterTranesiferMonyByDate,
    switchBranchesAndTreasuries,
  }
}

// Utility functions
export const tranesiferMonyUtils = {
  // تنسيق التاريخ
  formatDate: (date: string) => {
    return new Date(date).toLocaleDateString('ar-EG')
  },

  // تنسيق الوقت
  formatTime: (time: string) => {
    return time
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

  // لون المبلغ
  getAmountColor: (amount: number) => {
    if (amount > 0) return "text-green-600"
    if (amount < 0) return "text-red-600"
    return "text-gray-600"
  },

  // لون حالة التنفيذ
  getExecutedColor: (isExecuted: boolean) => {
    return isExecuted ? "text-green-600" : "text-red-600"
  },

  // لون حالة الإغلاق
  getClosedColor: (isClosed: boolean) => {
    return isClosed ? "text-green-600" : "text-gray-600"
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

  // خيارات القائمين بالتحويل
  transferInitiatorOptions: [
    { value: "أحمد محمد", label: "أحمد محمد" },
    { value: "سارة أحمد", label: "سارة أحمد" },
    { value: "محمد علي", label: "محمد علي" },
    { value: "فاطمة حسن", label: "فاطمة حسن" },
    { value: "خالد سعد", label: "خالد سعد" }
  ],
}
