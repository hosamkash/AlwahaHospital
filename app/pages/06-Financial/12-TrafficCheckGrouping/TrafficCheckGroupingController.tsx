"use client"

import { useState } from "react"

// Interface لحركة الشيكات التجميعية
export interface TrafficCheckGrouping {
  id: number
  branch: string
  date: string
  incomingChecks: number
  outgoingChecks: number
  netAmount: number
}

// Interface للتفاصيل
export interface TrafficCheckGroupingForm {
  id: number
  branch: string
  date: string
  incomingChecks: number
  outgoingChecks: number
  netAmount: number
  notes: string
}

// البيانات الافتراضية لحركة الشيكات التجميعية
export const defaultTrafficCheckGrouping: TrafficCheckGrouping[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    date: "2025-09-21",
    incomingChecks: 150000.00,
    outgoingChecks: 85000.00,
    netAmount: 65000.00
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    date: "2025-09-20",
    incomingChecks: 200000.00,
    outgoingChecks: 120000.00,
    netAmount: 80000.00
  },
  {
    id: 3,
    branch: "جدة العمومي",
    date: "2025-09-19",
    incomingChecks: 95000.00,
    outgoingChecks: 110000.00,
    netAmount: -15000.00
  },
  {
    id: 4,
    branch: "الدمام العمومي",
    date: "2025-09-18",
    incomingChecks: 180000.00,
    outgoingChecks: 75000.00,
    netAmount: 105000.00
  },
  {
    id: 5,
    branch: "الطائف العمومي",
    date: "2025-09-17",
    incomingChecks: 120000.00,
    outgoingChecks: 90000.00,
    netAmount: 30000.00
  }
]

// البيانات الافتراضية لتفاصيل التجميع
export const defaultTrafficCheckGroupingForm: TrafficCheckGroupingForm = {
  id: 1,
  branch: "مكه العمومي",
  date: "0001-01-01",
  incomingChecks: 0.00,
  outgoingChecks: 0.00,
  netAmount: 0.00,
  notes: ""
}

// Hook للتحكم في البيانات
export const useTrafficCheckGroupingController = () => {
  const [trafficCheckGrouping, setTrafficCheckGrouping] = useState<TrafficCheckGrouping[]>(defaultTrafficCheckGrouping)
  const [selectedTrafficCheckGrouping, setSelectedTrafficCheckGrouping] = useState<TrafficCheckGroupingForm | null>(null)
  const [showTrafficCheckGroupingDetails, setShowTrafficCheckGroupingDetails] = useState(false)
  const [isNewTrafficCheckGrouping, setIsNewTrafficCheckGrouping] = useState(false)

  // إضافة تجميع جديد
  const handleNewTrafficCheckGrouping = () => {
    setSelectedTrafficCheckGrouping({
      ...defaultTrafficCheckGroupingForm,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    })
    setIsNewTrafficCheckGrouping(true)
    setShowTrafficCheckGroupingDetails(true)
  }

  // تعديل تجميع
  const handleEditTrafficCheckGrouping = (trafficCheckGrouping: TrafficCheckGrouping) => {
    setSelectedTrafficCheckGrouping({
      ...defaultTrafficCheckGroupingForm,
      id: trafficCheckGrouping.id,
      branch: trafficCheckGrouping.branch,
      date: trafficCheckGrouping.date,
      incomingChecks: trafficCheckGrouping.incomingChecks,
      outgoingChecks: trafficCheckGrouping.outgoingChecks,
      netAmount: trafficCheckGrouping.netAmount,
    })
    setIsNewTrafficCheckGrouping(false)
    setShowTrafficCheckGroupingDetails(true)
  }

  // إغلاق تفاصيل التجميع
  const handleCloseDetails = () => {
    setShowTrafficCheckGroupingDetails(false)
    setSelectedTrafficCheckGrouping(null)
    setIsNewTrafficCheckGrouping(false)
  }

  // حفظ التجميع
  const handleSaveTrafficCheckGrouping = (trafficCheckGrouping: TrafficCheckGroupingForm) => {
    if (isNewTrafficCheckGrouping) {
      const newTrafficCheckGrouping: TrafficCheckGrouping = {
        id: trafficCheckGrouping.id,
        branch: trafficCheckGrouping.branch,
        date: trafficCheckGrouping.date,
        incomingChecks: trafficCheckGrouping.incomingChecks,
        outgoingChecks: trafficCheckGrouping.outgoingChecks,
        netAmount: trafficCheckGrouping.netAmount,
      }
      setTrafficCheckGrouping((prev) => [...prev, newTrafficCheckGrouping])
    } else {
      setTrafficCheckGrouping((prev) =>
        prev.map((existingTrafficCheckGrouping) =>
          existingTrafficCheckGrouping.id === trafficCheckGrouping.id
            ? {
                ...existingTrafficCheckGrouping,
                branch: trafficCheckGrouping.branch,
                date: trafficCheckGrouping.date,
                incomingChecks: trafficCheckGrouping.incomingChecks,
                outgoingChecks: trafficCheckGrouping.outgoingChecks,
                netAmount: trafficCheckGrouping.netAmount,
              }
            : existingTrafficCheckGrouping
        )
      )
    }
    handleCloseDetails()
  }

  // حذف تجميع
  const handleDeleteTrafficCheckGrouping = (id: number) => {
    setTrafficCheckGrouping((prev) => prev.filter((trafficCheckGrouping) => trafficCheckGrouping.id !== id))
  }

  // البحث في التجميعات
  const searchTrafficCheckGrouping = (searchTerm: string) => {
    if (!searchTerm.trim()) return trafficCheckGrouping

    const term = searchTerm.toLowerCase()
    return trafficCheckGrouping.filter(
      (trafficCheckGrouping) =>
        trafficCheckGrouping.branch.toLowerCase().includes(term) ||
        trafficCheckGrouping.date.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterTrafficCheckGroupingByDate = (trafficCheckGrouping: TrafficCheckGrouping[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return trafficCheckGrouping.filter(item => {
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

  // فلترة إضافية
  const filterTrafficCheckGrouping = (trafficCheckGrouping: TrafficCheckGrouping[], filters: {
    bank?: string,
    entity?: string,
    branch?: string,
    treasury?: string
  }) => {
    return trafficCheckGrouping.filter(item => {
      if (filters.branch && !item.branch.toLowerCase().includes(filters.branch.toLowerCase())) return false
      return true
    })
  }

  return {
    trafficCheckGrouping,
    selectedTrafficCheckGrouping,
    showTrafficCheckGroupingDetails,
    isNewTrafficCheckGrouping,
    handleNewTrafficCheckGrouping,
    handleEditTrafficCheckGrouping,
    handleCloseDetails,
    handleSaveTrafficCheckGrouping,
    handleDeleteTrafficCheckGrouping,
    searchTrafficCheckGrouping,
    filterTrafficCheckGroupingByDate,
    filterTrafficCheckGrouping,
  }
}

// Utility functions
export const trafficCheckGroupingUtils = {
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

  // لون المبلغ الصافي
  getNetAmountColor: (amount: number) => {
    return amount >= 0 ? "text-green-600" : "text-red-600"
  },

  // خيارات الفروع
  branchOptions: [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ],

  // خيارات التاريخ
  dateOptions: [
    { value: "today", label: "تاريخ اليوم" },
    { value: "all", label: "الكل" },
    { value: "period", label: "فترة زمنية" },
    { value: "month", label: "شهر" },
  ],
}
