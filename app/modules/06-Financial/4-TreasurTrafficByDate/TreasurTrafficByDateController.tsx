"use client"

import { useState } from "react"

// Interface للبيانات المجمعة بالتاريخ
export interface TreasurTrafficByDate {
  id: number
  branch: string
  date: string
  revenues: number
  expenses: number
  net: number
}

// Interface للتفاصيل
export interface TreasurTrafficByDateDetails {
  id: number
  branch: string
  date: string
  revenues: number
  expenses: number
  net: number
}

// البيانات الافتراضية لحركة الخزينة المجمعة بالتاريخ
export const defaultTreasurTrafficByDate: TreasurTrafficByDate[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    date: "2025-09-19",
    revenues: 15000.00,
    expenses: 8500.00,
    net: 6500.00,
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    date: "2025-09-18",
    revenues: 12000.00,
    expenses: 9200.00,
    net: 2800.00,
  },
  {
    id: 3,
    branch: "جدة العمومي",
    date: "2025-09-17",
    revenues: 18000.00,
    expenses: 11000.00,
    net: 7000.00,
  },
  {
    id: 4,
    branch: "الدمام العمومي",
    date: "2025-09-16",
    revenues: 9500.00,
    expenses: 6800.00,
    net: 2700.00,
  },
  {
    id: 5,
    branch: "الطائف العمومي",
    date: "2025-09-15",
    revenues: 13500.00,
    expenses: 7800.00,
    net: 5700.00,
  },
]

// البيانات الافتراضية لتفاصيل حركة الخزينة المجمعة
export const defaultTreasurTrafficByDateDetails: TreasurTrafficByDateDetails = {
  id: 1,
  branch: "مكه العمومي",
  date: "2025-09-19",
  revenues: 0.00,
  expenses: 0.00,
  net: 0.00,
}

// Hook للتحكم في البيانات
export const useTreasurTrafficByDateController = () => {
  const [treasurTrafficByDate, setTreasurTrafficByDate] = useState<TreasurTrafficByDate[]>(defaultTreasurTrafficByDate)

  // البحث في حركة الخزينة المجمعة
  const searchTreasurTrafficByDate = (searchTerm: string) => {
    if (!searchTerm.trim()) return treasurTrafficByDate

    const term = searchTerm.toLowerCase()
    return treasurTrafficByDate.filter(
      (traffic) =>
        traffic.branch.toLowerCase().includes(term) ||
        traffic.date.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterTreasurTrafficByDate = (traffic: TreasurTrafficByDate[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
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
  const filterTreasurTrafficByBranch = (traffic: TreasurTrafficByDate[], branchFilter: string) => {
    if (!branchFilter) return traffic
    return traffic.filter(item => item.branch === branchFilter)
  }

  // حساب الإجماليات
  const calculateTotals = (traffic: TreasurTrafficByDate[]) => {
    return traffic.reduce((totals, item) => ({
      revenues: totals.revenues + item.revenues,
      expenses: totals.expenses + item.expenses,
      net: totals.net + item.net,
    }), { revenues: 0, expenses: 0, net: 0 })
  }

  return {
    treasurTrafficByDate,
    searchTreasurTrafficByDate,
    filterTreasurTrafficByDate,
    filterTreasurTrafficByBranch,
    calculateTotals,
  }
}

// Utility functions
export const treasurTrafficByDateUtils = {
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
}
