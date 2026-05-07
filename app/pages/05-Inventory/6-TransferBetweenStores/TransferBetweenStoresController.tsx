"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface TransferBetweenStores {
  id: number
  code: string
  date: string
  responsibleEmployee: string
  transferStatus: string
  transferredFromBranch: string
  transferredFromStore: string
  transferValue: number
  transferredToBranch: string
  transferredToStore: string
  receivedValue: number
  notes: string
}

// Interface للتفاصيل
export interface TransferBetweenStoresDetails {
  id: number
  code: string
  date: string
  time: string
  fromBranch: string
  toBranch: string
  fromStore: string
  toStore: string
  employee: string
  notes: string
  transferStatus: string
  receiptMatches: boolean
  // Items
  items: TransferItem[]
}

export interface TransferItem {
  id: number
  barcode: string
  item: string
  category: string
  manufacturer: string
  priceCategory: string
  unit: string
  transferredQuantity: number
  transferredPrice: number
  transferredTotal: number
  receivedQuantity: number
  receiptDifference: number
  receiptMatches: boolean
  receivedPrice: number
  receivedTotal: number
}

// البيانات الافتراضية للتحويلات بين المخازن
export const defaultTransfers: TransferBetweenStores[] = [
  {
    id: 1,
    code: "8023",
    date: "2025-09-19",
    responsibleEmployee: "ا. عاطف",
    transferStatus: "قيد الطلب",
    transferredFromBranch: "مكه العمومي",
    transferredFromStore: "العمومي",
    transferValue: 15000,
    transferredToBranch: "الرياض العمومي",
    transferredToStore: "مخزن الرياض",
    receivedValue: 15000,
    notes: "تحويل عاجل للأصناف",
  },
  {
    id: 2,
    code: "8024",
    date: "2025-09-18",
    responsibleEmployee: "د. أحمد",
    transferStatus: "مكتمل",
    transferredFromBranch: "جدة العمومي",
    transferredFromStore: "مخزن جدة",
    transferValue: 8500,
    transferredToBranch: "الدمام العمومي",
    transferredToStore: "مخزن الدمام",
    receivedValue: 8500,
    notes: "تحويل منتظم",
  },
  {
    id: 3,
    code: "8025",
    date: "2025-09-17",
    responsibleEmployee: "م. سارة",
    transferStatus: "قيد المراجعة",
    transferredFromBranch: "الطائف العمومي",
    transferredFromStore: "مخزن الطائف",
    transferValue: 12000,
    transferredToBranch: "مكه العمومي",
    transferredToStore: "العمومي",
    receivedValue: 0,
    notes: "تحويل عاجل",
  },
]

// البيانات الافتراضية لتفاصيل التحويل
export const defaultTransferDetails: TransferBetweenStoresDetails = {
  id: 1,
  code: "8023",
  date: "2025-09-19",
  time: "15:25",
  fromBranch: "مكه العمومي",
  toBranch: "",
  fromStore: "العمومي",
  toStore: "",
  employee: "ا. عاطف",
  notes: "",
  transferStatus: "قيد الطلب",
  receiptMatches: true,
  items: [],
}

// Hook للتحكم في البيانات
export const useTransferBetweenStoresController = () => {
  const [transfers, setTransfers] = useState<TransferBetweenStores[]>(defaultTransfers)
  const [selectedTransfer, setSelectedTransfer] = useState<TransferBetweenStoresDetails | null>(null)
  const [showTransferDetails, setShowTransferDetails] = useState(false)
  const [isNewTransfer, setIsNewTransfer] = useState(false)

  // إضافة تحويل جديد
  const handleNewTransfer = () => {
    setSelectedTransfer({
      ...defaultTransferDetails,
      id: Date.now(),
      code: `${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    })
    setIsNewTransfer(true)
    setShowTransferDetails(true)
  }

  // تعديل تحويل
  const handleEditTransfer = (transfer: TransferBetweenStores) => {
    setSelectedTransfer({
      ...defaultTransferDetails,
      id: transfer.id,
      code: transfer.code,
      date: transfer.date,
      fromBranch: transfer.transferredFromBranch,
      toBranch: transfer.transferredToBranch,
      fromStore: transfer.transferredFromStore,
      toStore: transfer.transferredToStore,
      employee: transfer.responsibleEmployee,
      notes: transfer.notes,
      transferStatus: transfer.transferStatus,
    })
    setIsNewTransfer(false)
    setShowTransferDetails(true)
  }

  // إغلاق تفاصيل التحويل
  const handleCloseDetails = () => {
    setShowTransferDetails(false)
    setSelectedTransfer(null)
    setIsNewTransfer(false)
  }

  // حفظ التحويل
  const handleSaveTransfer = (transfer: TransferBetweenStoresDetails) => {
    if (isNewTransfer) {
      const newTransfer: TransferBetweenStores = {
        id: transfer.id,
        code: transfer.code,
        date: transfer.date,
        responsibleEmployee: transfer.employee,
        transferStatus: transfer.transferStatus,
        transferredFromBranch: transfer.fromBranch,
        transferredFromStore: transfer.fromStore,
        transferValue: transfer.items.reduce((sum, item) => sum + item.transferredTotal, 0),
        transferredToBranch: transfer.toBranch,
        transferredToStore: transfer.toStore,
        receivedValue: transfer.items.reduce((sum, item) => sum + item.receivedTotal, 0),
        notes: transfer.notes,
      }
      setTransfers((prev) => [...prev, newTransfer])
    } else {
      setTransfers((prev) =>
        prev.map((existingTransfer) =>
          existingTransfer.id === transfer.id
            ? {
                ...existingTransfer,
                code: transfer.code,
                date: transfer.date,
                responsibleEmployee: transfer.employee,
                transferStatus: transfer.transferStatus,
                transferredFromBranch: transfer.fromBranch,
                transferredFromStore: transfer.fromStore,
                transferValue: transfer.items.reduce((sum, item) => sum + item.transferredTotal, 0),
                transferredToBranch: transfer.toBranch,
                transferredToStore: transfer.toStore,
                receivedValue: transfer.items.reduce((sum, item) => sum + item.receivedTotal, 0),
                notes: transfer.notes,
              }
            : existingTransfer
        )
      )
    }
    handleCloseDetails()
  }

  // حذف تحويل
  const handleDeleteTransfer = (id: number) => {
    setTransfers((prev) => prev.filter((transfer) => transfer.id !== id))
  }

  // البحث في التحويلات
  const searchTransfers = (searchTerm: string) => {
    if (!searchTerm.trim()) return transfers

    const term = searchTerm.toLowerCase()
    return transfers.filter(
      (transfer) =>
        transfer.code.toLowerCase().includes(term) ||
        transfer.transferredFromBranch.toLowerCase().includes(term) ||
        transfer.transferredToBranch.toLowerCase().includes(term) ||
        transfer.responsibleEmployee.toLowerCase().includes(term) ||
        transfer.transferStatus.toLowerCase().includes(term)
    )
  }

  // تحديث حالة التحويل
  const updateTransferStatus = (id: number, status: string) => {
    setTransfers((prev) =>
      prev.map((transfer) =>
        transfer.id === id ? { ...transfer, transferStatus: status } : transfer
      )
    )
  }

  return {
    transfers,
    selectedTransfer,
    showTransferDetails,
    isNewTransfer,
    handleNewTransfer,
    handleEditTransfer,
    handleCloseDetails,
    handleSaveTransfer,
    handleDeleteTransfer,
    searchTransfers,
    updateTransferStatus,
  }
}

// Utility functions
export const transferBetweenStoresUtils = {
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

  // لون حالة التحويل
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

  // حالات التحويل
  transferStatuses: [
    "قيد الطلب",
    "قيد المراجعة",
    "مكتمل",
    "ملغي",
  ],
}
