"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface PeriodicInventory {
  id: number
  branch: string
  warehouse: string
  code: string
  date: string
  responsibleEmployee: string
  adjustmentStatus: string
  adjustmentValueIncrease: number
  adjustmentValueDecrease: number
  adjustmentDifference: number
  notes: string
}

// Interface للتفاصيل
export interface PeriodicInventoryDetails {
  id: number
  code: string
  date: string
  time: string
  branch: string
  warehouse: string
  employee: string
  adjustmentStatus: string
  notes: string
  hideZeroBalances: boolean
  // Items
  items: PeriodicInventoryItem[]
}

export interface PeriodicInventoryItem {
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

// البيانات الافتراضية للجرد الدوري
export const defaultPeriodicInventory: PeriodicInventory[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    warehouse: "العمومي",
    code: "PI001",
    date: "2025-09-19",
    responsibleEmployee: "أ. عاطف",
    adjustmentStatus: "قيد الطلب",
    adjustmentValueIncrease: 1500.00,
    adjustmentValueDecrease: 750.00,
    adjustmentDifference: 750.00,
    notes: "جرد دوري شهري",
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    warehouse: "مخزن الطوارئ",
    code: "PI002",
    date: "2025-09-18",
    responsibleEmployee: "د. أحمد",
    adjustmentStatus: "مكتمل",
    adjustmentValueIncrease: 2200.50,
    adjustmentValueDecrease: 1200.25,
    adjustmentDifference: 1000.25,
    notes: "جرد دوري ربع سنوي",
  },
  {
    id: 3,
    branch: "جدة العمومي",
    warehouse: "مخزن العيادات",
    code: "PI003",
    date: "2025-09-17",
    responsibleEmployee: "م. سارة",
    adjustmentStatus: "قيد المراجعة",
    adjustmentValueIncrease: 850.75,
    adjustmentValueDecrease: 450.00,
    adjustmentDifference: 400.75,
    notes: "جرد دوري أسبوعي",
  },
]

// البيانات الافتراضية لتفاصيل الجرد الدوري
export const defaultPeriodicInventoryDetails: PeriodicInventoryDetails = {
  id: 1,
  code: "1",
  date: "2025-09-19",
  time: "17:50",
  branch: "مكه العمومي",
  warehouse: "العمومي",
  employee: "أ. عاطف",
  adjustmentStatus: "قيد الطلب",
  notes: "",
  hideZeroBalances: true,
  items: [],
}

// Hook للتحكم في البيانات
export const usePeriodicInventoryController = () => {
  const [periodicInventory, setPeriodicInventory] = useState<PeriodicInventory[]>(defaultPeriodicInventory)
  const [selectedInventory, setSelectedInventory] = useState<PeriodicInventoryDetails | null>(null)
  const [showInventoryDetails, setShowInventoryDetails] = useState(false)
  const [isNewInventory, setIsNewInventory] = useState(false)

  // إضافة جرد جديد
  const handleNewInventory = () => {
    setSelectedInventory({
      ...defaultPeriodicInventoryDetails,
      id: Date.now(),
      code: `PI${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    })
    setIsNewInventory(true)
    setShowInventoryDetails(true)
  }

  // تعديل جرد
  const handleEditInventory = (inventory: PeriodicInventory) => {
    setSelectedInventory({
      ...defaultPeriodicInventoryDetails,
      id: inventory.id,
      code: inventory.code,
      date: inventory.date,
      branch: inventory.branch,
      warehouse: inventory.warehouse,
      employee: inventory.responsibleEmployee,
      notes: inventory.notes,
      adjustmentStatus: inventory.adjustmentStatus,
    })
    setIsNewInventory(false)
    setShowInventoryDetails(true)
  }

  // إغلاق تفاصيل الجرد
  const handleCloseDetails = () => {
    setShowInventoryDetails(false)
    setSelectedInventory(null)
    setIsNewInventory(false)
  }

  // حفظ الجرد
  const handleSaveInventory = (inventory: PeriodicInventoryDetails) => {
    if (isNewInventory) {
      const newInventory: PeriodicInventory = {
        id: inventory.id,
        branch: inventory.branch,
        warehouse: inventory.warehouse,
        code: inventory.code,
        date: inventory.date,
        responsibleEmployee: inventory.employee,
        adjustmentStatus: inventory.adjustmentStatus,
        adjustmentValueIncrease: inventory.items.reduce((sum, item) => sum + item.totalSurplusPrice, 0),
        adjustmentValueDecrease: inventory.items.reduce((sum, item) => sum + item.totalDeficitPrice, 0),
        adjustmentDifference: inventory.items.reduce((sum, item) => sum + (item.totalSurplusPrice - item.totalDeficitPrice), 0),
        notes: inventory.notes,
      }
      setPeriodicInventory((prev) => [...prev, newInventory])
    } else {
      setPeriodicInventory((prev) =>
        prev.map((existingInventory) =>
          existingInventory.id === inventory.id
            ? {
                ...existingInventory,
                branch: inventory.branch,
                warehouse: inventory.warehouse,
                code: inventory.code,
                date: inventory.date,
                responsibleEmployee: inventory.employee,
                adjustmentStatus: inventory.adjustmentStatus,
                adjustmentValueIncrease: inventory.items.reduce((sum, item) => sum + item.totalSurplusPrice, 0),
                adjustmentValueDecrease: inventory.items.reduce((sum, item) => sum + item.totalDeficitPrice, 0),
                adjustmentDifference: inventory.items.reduce((sum, item) => sum + (item.totalSurplusPrice - item.totalDeficitPrice), 0),
                notes: inventory.notes,
              }
            : existingInventory
        )
      )
    }
    handleCloseDetails()
  }

  // حذف جرد
  const handleDeleteInventory = (id: number) => {
    setPeriodicInventory((prev) => prev.filter((inventory) => inventory.id !== id))
  }

  // البحث في الجرد
  const searchPeriodicInventory = (searchTerm: string) => {
    if (!searchTerm.trim()) return periodicInventory

    const term = searchTerm.toLowerCase()
    return periodicInventory.filter(
      (inventory) =>
        inventory.code.toLowerCase().includes(term) ||
        inventory.branch.toLowerCase().includes(term) ||
        inventory.warehouse.toLowerCase().includes(term) ||
        inventory.responsibleEmployee.toLowerCase().includes(term) ||
        inventory.adjustmentStatus.toLowerCase().includes(term)
    )
  }

  // تحديث حالة الجرد
  const updateInventoryStatus = (id: number, status: string) => {
    setPeriodicInventory((prev) =>
      prev.map((inventory) =>
        inventory.id === id ? { ...inventory, adjustmentStatus: status } : inventory
      )
    )
  }

  return {
    periodicInventory,
    selectedInventory,
    showInventoryDetails,
    isNewInventory,
    handleNewInventory,
    handleEditInventory,
    handleCloseDetails,
    handleSaveInventory,
    handleDeleteInventory,
    searchPeriodicInventory,
    updateInventoryStatus,
  }
}

// Utility functions
export const periodicInventoryUtils = {
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
    return value.toLocaleString('ar-EG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  },

  // لون حالة الجرد
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
    { value: "all", label: "الكل" },
    { value: "period", label: "فترة زمنية" },
    { value: "month", label: "شهر" },
  ],

  // حالات الجرد
  adjustmentStatuses: [
    "قيد الطلب",
    "قيد المراجعة",
    "مكتمل",
    "ملغي",
  ],

  // خيارات الفروع
  branchOptions: [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ],

  // خيارات المخازن
  warehouseOptions: [
    { value: "العمومي", label: "العمومي" },
    { value: "الطوارئ", label: "الطوارئ" },
    { value: "العيادات", label: "العيادات" },
    { value: "العمليات", label: "العمليات" },
    { value: "المخزن الرئيسي", label: "المخزن الرئيسي" }
  ],

  // خيارات الموظفين
  employeeOptions: [
    { value: "أ. عاطف", label: "أ. عاطف" },
    { value: "د. أحمد", label: "د. أحمد" },
    { value: "م. سارة", label: "م. سارة" },
    { value: "أ. محمد", label: "أ. محمد" },
    { value: "د. فاطمة", label: "د. فاطمة" }
  ],
}
