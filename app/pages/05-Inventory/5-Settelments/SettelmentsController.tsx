"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface Settlement {
  id: number
  branch: string
  warehouse: string
  code: string
  date: string
  responsibleEmployee: string
  settlementStatus: string
  settlementValueByDecrease: number
  settlementValueByIncrease: number
  differenceInSettlementValues: number
  notes: string
}

// Interface للتفاصيل
export interface SettlementDetails {
  id: number
  code: string
  date: string
  time: string
  branch: string
  warehouse: string
  employee: string
  notes: string
  settlementStatus: string
  hideZeroBalances: boolean
  // Items
  items: SettlementItem[]
}

export interface SettlementItem {
  id: number
  barcode: string
  item: string
  manufacturer: string
  category: string
  priceCategory: string
  unit: string
  bookQuantity: number
  actualQuantity: number
  price: number
  deficitQuantity: number
  totalDeficitPrice: number
  surplusQuantity: number
  totalSurplusPrice: number
}

// البيانات الافتراضية لتسويات الأصناف
export const defaultSettlements: Settlement[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    warehouse: "المخزن العمومي",
    code: "205",
    date: "2025-09-19",
    responsibleEmployee: "ا. عاطف",
    settlementStatus: "قيد الطلب",
    settlementValueByDecrease: 1500,
    settlementValueByIncrease: 800,
    differenceInSettlementValues: -700,
    notes: "تسوية شهرية للأصناف",
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    warehouse: "مخزن الرياض",
    code: "206",
    date: "2025-09-18",
    responsibleEmployee: "د. أحمد",
    settlementStatus: "مكتمل",
    settlementValueByDecrease: 2200,
    settlementValueByIncrease: 1200,
    differenceInSettlementValues: -1000,
    notes: "تسوية نهاية الأسبوع",
  },
  {
    id: 3,
    branch: "جدة العمومي",
    warehouse: "مخزن جدة",
    code: "207",
    date: "2025-09-17",
    responsibleEmployee: "م. سارة",
    settlementStatus: "قيد المراجعة",
    settlementValueByDecrease: 900,
    settlementValueByIncrease: 1500,
    differenceInSettlementValues: 600,
    notes: "تسوية عاجلة",
  },
]

// البيانات الافتراضية لتفاصيل التسوية
export const defaultSettlementDetails: SettlementDetails = {
  id: 1,
  code: "205",
  date: "2025-09-19",
  time: "12:49",
  branch: "مكه العمومي",
  warehouse: "المخزن العمومي",
  employee: "ا. عاطف",
  notes: "",
  settlementStatus: "قيد الطلب",
  hideZeroBalances: false,
  items: [],
}

// Hook للتحكم في البيانات
export const useSettlementsController = () => {
  const [settlements, setSettlements] = useState<Settlement[]>(defaultSettlements)
  const [selectedSettlement, setSelectedSettlement] = useState<SettlementDetails | null>(null)
  const [showSettlementDetails, setShowSettlementDetails] = useState(false)
  const [isNewSettlement, setIsNewSettlement] = useState(false)

  // إضافة تسوية جديدة
  const handleNewSettlement = () => {
    setSelectedSettlement({
      ...defaultSettlementDetails,
      id: Date.now(),
      code: `${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    })
    setIsNewSettlement(true)
    setShowSettlementDetails(true)
  }

  // تعديل تسوية
  const handleEditSettlement = (settlement: Settlement) => {
    setSelectedSettlement({
      ...defaultSettlementDetails,
      id: settlement.id,
      code: settlement.code,
      date: settlement.date,
      branch: settlement.branch,
      warehouse: settlement.warehouse,
      employee: settlement.responsibleEmployee,
      notes: settlement.notes,
      settlementStatus: settlement.settlementStatus,
    })
    setIsNewSettlement(false)
    setShowSettlementDetails(true)
  }

  // إغلاق تفاصيل التسوية
  const handleCloseDetails = () => {
    setShowSettlementDetails(false)
    setSelectedSettlement(null)
    setIsNewSettlement(false)
  }

  // حفظ التسوية
  const handleSaveSettlement = (settlement: SettlementDetails) => {
    if (isNewSettlement) {
      const newSettlement: Settlement = {
        id: settlement.id,
        branch: settlement.branch,
        warehouse: settlement.warehouse,
        code: settlement.code,
        date: settlement.date,
        responsibleEmployee: settlement.employee,
        settlementStatus: settlement.settlementStatus,
        settlementValueByDecrease: settlement.items.reduce((sum, item) => sum + item.totalDeficitPrice, 0),
        settlementValueByIncrease: settlement.items.reduce((sum, item) => sum + item.totalSurplusPrice, 0),
        differenceInSettlementValues: settlement.items.reduce((sum, item) => sum + item.totalSurplusPrice - item.totalDeficitPrice, 0),
        notes: settlement.notes,
      }
      setSettlements((prev) => [...prev, newSettlement])
    } else {
      setSettlements((prev) =>
        prev.map((existingSettlement) =>
          existingSettlement.id === settlement.id
            ? {
                ...existingSettlement,
                branch: settlement.branch,
                warehouse: settlement.warehouse,
                code: settlement.code,
                date: settlement.date,
                responsibleEmployee: settlement.employee,
                settlementStatus: settlement.settlementStatus,
                settlementValueByDecrease: settlement.items.reduce((sum, item) => sum + item.totalDeficitPrice, 0),
                settlementValueByIncrease: settlement.items.reduce((sum, item) => sum + item.totalSurplusPrice, 0),
                differenceInSettlementValues: settlement.items.reduce((sum, item) => sum + item.totalSurplusPrice - item.totalDeficitPrice, 0),
                notes: settlement.notes,
              }
            : existingSettlement
        )
      )
    }
    handleCloseDetails()
  }

  // حذف تسوية
  const handleDeleteSettlement = (id: number) => {
    setSettlements((prev) => prev.filter((settlement) => settlement.id !== id))
  }

  // البحث في التسويات
  const searchSettlements = (searchTerm: string) => {
    if (!searchTerm.trim()) return settlements

    const term = searchTerm.toLowerCase()
    return settlements.filter(
      (settlement) =>
        settlement.code.toLowerCase().includes(term) ||
        settlement.branch.toLowerCase().includes(term) ||
        settlement.warehouse.toLowerCase().includes(term) ||
        settlement.responsibleEmployee.toLowerCase().includes(term) ||
        settlement.settlementStatus.toLowerCase().includes(term)
    )
  }

  // تحديث حالة التسوية
  const updateSettlementStatus = (id: number, status: string) => {
    setSettlements((prev) =>
      prev.map((settlement) =>
        settlement.id === id ? { ...settlement, settlementStatus: status } : settlement
      )
    )
  }

  return {
    settlements,
    selectedSettlement,
    showSettlementDetails,
    isNewSettlement,
    handleNewSettlement,
    handleEditSettlement,
    handleCloseDetails,
    handleSaveSettlement,
    handleDeleteSettlement,
    searchSettlements,
    updateSettlementStatus,
  }
}

// Utility functions
export const settlementsUtils = {
  // تنسيق التاريخ
  formatDate: (date: string) => {
    return new Date(date).toLocaleDateString('ar-EG')
  },

  // تنسيق الوقت
  formatTime: (time: string) => {
    return time
  },

  // تنسيق القيمة
  formatValue: (value: number) => {
    return value.toLocaleString('ar-EG')
  },

  // لون حالة التسوية
  getStatusColor: (status: string) => {
    switch (status) {
      case "قيد الطلب":
        return "text-blue-600"
      case "قيد المراجعة":
        return "text-yellow-600"
      case "مكتمل":
        return "text-green-600"
      case "ملغي":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  },

  // خيارات التاريخ
  dateOptions: [
    { value: "today", label: "تاريخ اليوم" },
    { value: "month", label: "شهر" },
    { value: "all", label: "الكل" },
    { value: "period", label: "فترة زمنية" },
  ],

  // حالات التسوية
  settlementStatuses: [
    "قيد الطلب",
    "قيد المراجعة",
    "مكتمل",
    "ملغي",
  ],
}
