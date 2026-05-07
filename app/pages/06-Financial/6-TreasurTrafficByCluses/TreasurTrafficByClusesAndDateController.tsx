"use client"

import { useState } from "react"

// Interface للبيانات المجمعة بالتاريخ والبند
export interface TreasurTrafficByClusesAndDate {
  id: number
  branch: string
  date: string
  cashItemType: string
  cashItem: string
  amount: number
}

// Interface للتفاصيل
export interface TreasurTrafficByClusesAndDateDetails {
  id: number
  branch: string
  date: string
  cashItemType: string
  cashItem: string
  amount: number
}

// البيانات الافتراضية لحركة الخزينة المجمعة بالتاريخ والبند
export const defaultTreasurTrafficByClusesAndDate: TreasurTrafficByClusesAndDate[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    date: "2025-09-19",
    cashItemType: "إيرادات",
    cashItem: "رسوم استشارة",
    amount: 500.00,
  },
  {
    id: 2,
    branch: "مكه العمومي",
    date: "2025-09-19",
    cashItemType: "إيرادات",
    cashItem: "رسوم فحص",
    amount: 200.00,
  },
  {
    id: 3,
    branch: "مكه العمومي",
    date: "2025-09-19",
    cashItemType: "مصروفات",
    cashItem: "مصاريف تشغيل",
    amount: -300.00,
  },
  {
    id: 4,
    branch: "الرياض العمومي",
    date: "2025-09-18",
    cashItemType: "إيرادات",
    cashItem: "رسوم عمليات",
    amount: 1500.00,
  },
  {
    id: 5,
    branch: "الرياض العمومي",
    date: "2025-09-18",
    cashItemType: "مصروفات",
    cashItem: "مصاريف أدوية",
    amount: -800.00,
  },
  {
    id: 6,
    branch: "جدة العمومي",
    date: "2025-09-17",
    cashItemType: "إيرادات",
    cashItem: "رسوم طوارئ",
    amount: 750.00,
  },
  {
    id: 7,
    branch: "جدة العمومي",
    date: "2025-09-17",
    cashItemType: "مصروفات",
    cashItem: "مصاريف صيانة",
    amount: -450.00,
  },
  {
    id: 8,
    branch: "الدمام العمومي",
    date: "2025-09-16",
    cashItemType: "إيرادات",
    cashItem: "رسوم مختبر",
    amount: 1200.00,
  },
  {
    id: 9,
    branch: "الدمام العمومي",
    date: "2025-09-16",
    cashItemType: "مصروفات",
    cashItem: "مصاريف كهرباء",
    amount: -600.00,
  },
  {
    id: 10,
    branch: "الطائف العمومي",
    date: "2025-09-15",
    cashItemType: "إيرادات",
    cashItem: "رسوم أشعة",
    amount: 900.00,
  },
]

// البيانات الافتراضية لتفاصيل حركة الخزينة المجمعة
export const defaultTreasurTrafficByClusesAndDateDetails: TreasurTrafficByClusesAndDateDetails = {
  id: 1,
  branch: "مكه العمومي",
  date: "2025-09-19",
  cashItemType: "إيرادات",
  cashItem: "رسوم استشارة",
  amount: 0.00,
}

// Hook للتحكم في البيانات
export const useTreasurTrafficByClusesAndDateController = () => {
  const [treasurTrafficByClusesAndDate, setTreasurTrafficByClusesAndDate] = useState<TreasurTrafficByClusesAndDate[]>(defaultTreasurTrafficByClusesAndDate)
  const [selectedTreasurTrafficByClusesAndDate, setSelectedTreasurTrafficByClusesAndDate] = useState<TreasurTrafficByClusesAndDateDetails | null>(null)
  const [showTreasurTrafficByClusesAndDateDetails, setShowTreasurTrafficByClusesAndDateDetails] = useState(false)
  const [isNewTreasurTrafficByClusesAndDate, setIsNewTreasurTrafficByClusesAndDate] = useState(false)

  const handleNewTreasurTrafficByClusesAndDate = () => {
    setSelectedTreasurTrafficByClusesAndDate({
      ...defaultTreasurTrafficByClusesAndDateDetails,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    })
    setIsNewTreasurTrafficByClusesAndDate(true)
    setShowTreasurTrafficByClusesAndDateDetails(true)
  }

  const handleEditTreasurTrafficByClusesAndDate = (traffic: TreasurTrafficByClusesAndDate) => {
    setSelectedTreasurTrafficByClusesAndDate({
      ...defaultTreasurTrafficByClusesAndDateDetails,
      id: traffic.id,
      branch: traffic.branch,
      date: traffic.date,
      cashItemType: traffic.cashItemType,
      cashItem: traffic.cashItem,
      amount: traffic.amount,
    })
    setIsNewTreasurTrafficByClusesAndDate(false)
    setShowTreasurTrafficByClusesAndDateDetails(true)
  }

  const handleCloseDetails = () => {
    setShowTreasurTrafficByClusesAndDateDetails(false)
    setSelectedTreasurTrafficByClusesAndDate(null)
    setIsNewTreasurTrafficByClusesAndDate(false)
  }

  const handleSaveTreasurTrafficByClusesAndDate = (traffic: TreasurTrafficByClusesAndDateDetails) => {
    if (isNewTreasurTrafficByClusesAndDate) {
      const newTraffic: TreasurTrafficByClusesAndDate = {
        id: traffic.id,
        branch: traffic.branch,
        date: traffic.date,
        cashItemType: traffic.cashItemType,
        cashItem: traffic.cashItem,
        amount: traffic.amount,
      }
      setTreasurTrafficByClusesAndDate((prev) => [...prev, newTraffic])
    } else {
      setTreasurTrafficByClusesAndDate((prev) =>
        prev.map((existingTraffic) =>
          existingTraffic.id === traffic.id
            ? {
                ...existingTraffic,
                branch: traffic.branch,
                date: traffic.date,
                cashItemType: traffic.cashItemType,
                cashItem: traffic.cashItem,
                amount: traffic.amount,
              }
            : existingTraffic
        )
      )
    }
    handleCloseDetails()
  }

  const handleDeleteTreasurTrafficByClusesAndDate = (id: number) => {
    setTreasurTrafficByClusesAndDate((prev) => prev.filter((traffic) => traffic.id !== id))
  }

  // البحث في حركة الخزينة المجمعة
  const searchTreasurTrafficByClusesAndDate = (searchTerm: string) => {
    if (!searchTerm.trim()) return treasurTrafficByClusesAndDate

    const term = searchTerm.toLowerCase()
    return treasurTrafficByClusesAndDate.filter(
      (traffic) =>
        traffic.branch.toLowerCase().includes(term) ||
        traffic.date.toLowerCase().includes(term) ||
        traffic.cashItemType.toLowerCase().includes(term) ||
        traffic.cashItem.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterTreasurTrafficByDate = (traffic: TreasurTrafficByClusesAndDate[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return traffic.filter(item => {
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

  // فلترة بالفرع
  const filterTreasurTrafficByBranch = (traffic: TreasurTrafficByClusesAndDate[], branchFilter: string) => {
    if (!branchFilter) return traffic
    return traffic.filter(item => item.branch === branchFilter)
  }

  // فلترة بالبند
  const filterTreasurTrafficByItem = (traffic: TreasurTrafficByClusesAndDate[], itemFilter: string) => {
    if (!itemFilter) return traffic
    return traffic.filter(item => item.cashItem === itemFilter)
  }

  // حساب الإجماليات
  const calculateTotals = (traffic: TreasurTrafficByClusesAndDate[]) => {
    return traffic.reduce((totals, item) => ({
      amount: totals.amount + item.amount,
    }), { amount: 0 })
  }

  return {
    treasurTrafficByClusesAndDate,
    selectedTreasurTrafficByClusesAndDate,
    showTreasurTrafficByClusesAndDateDetails,
    isNewTreasurTrafficByClusesAndDate,
    handleNewTreasurTrafficByClusesAndDate,
    handleEditTreasurTrafficByClusesAndDate,
    handleCloseDetails,
    handleSaveTreasurTrafficByClusesAndDate,
    handleDeleteTreasurTrafficByClusesAndDate,
    searchTreasurTrafficByClusesAndDate,
    filterTreasurTrafficByDate,
    filterTreasurTrafficByBranch,
    filterTreasurTrafficByItem,
    calculateTotals,
  }
}

// Utility functions
export const treasurTrafficByClusesAndDateUtils = {
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

  // لون المبلغ (إيجابي أو سلبي)
  getAmountColor: (amount: number) => {
    if (amount > 0) return "text-green-600"
    if (amount < 0) return "text-red-600"
    return "text-gray-600"
  },

  // لون نوع البند
  getItemTypeColor: (type: string) => {
    if (type === "إيرادات") return "text-green-600"
    if (type === "مصروفات") return "text-red-600"
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

  // خيارات أنواع البنود
  cashItemTypeOptions: [
    { value: "إيرادات", label: "إيرادات" },
    { value: "مصروفات", label: "مصروفات" },
  ],

  // خيارات البنود
  cashItemOptions: [
    { value: "رسوم استشارة", label: "رسوم استشارة" },
    { value: "رسوم فحص", label: "رسوم فحص" },
    { value: "رسوم عمليات", label: "رسوم عمليات" },
    { value: "رسوم طوارئ", label: "رسوم طوارئ" },
    { value: "رسوم مختبر", label: "رسوم مختبر" },
    { value: "رسوم أشعة", label: "رسوم أشعة" },
    { value: "مصاريف تشغيل", label: "مصاريف تشغيل" },
    { value: "مصاريف أدوية", label: "مصاريف أدوية" },
    { value: "مصاريف صيانة", label: "مصاريف صيانة" },
    { value: "مصاريف كهرباء", label: "مصاريف كهرباء" },
  ],
}
