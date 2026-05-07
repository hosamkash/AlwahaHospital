"use client"

import { useState } from "react"

// Interface لتقفيل اليومية
export interface TreasureMonyClosed {
  id: number
  code: string
  date: string
  time: string
  fromBranch: string
  fromTreasury: string
  toBranch: string
  toTreasury: string
  transferInitiator: string
  amount: number
  statement: string
  isClosed: boolean
}

// Interface للتفاصيل
export interface TreasureMonyClosedDetails {
  id: number
  code: string
  date: string
  time: string
  fromBranch: string
  fromTreasury: string
  toBranch: string
  toTreasury: string
  transferInitiator: string
  amount: number
  statement: string
  isClosed: boolean
  transactions: TransactionItem[]
  totalRevenues: number
  totalExpenses: number
  netAmount: number
}

// Interface لعناصر المعاملات
export interface TransactionItem {
  id: number
  branch: string
  code: string
  serial: string
  date: string
  voucherType: string
  treasury: string
  entityType: string
  entityName: string
  itemName: string
  amount: number
  statement: string
}

// البيانات الافتراضية لتقفيل اليومية
export const defaultTreasureMonyClosed: TreasureMonyClosed[] = [
  {
    id: 1,
    code: "TC001",
    date: "2025-09-19",
    time: "11:13",
    fromBranch: "فرع كفر الزيات 12",
    fromTreasury: "الزيات",
    toBranch: "مكه العموميه",
    toTreasury: "العمومي",
    transferInitiator: "7 هبه احمد السيد عياد سالم مخزن",
    amount: 26815.00,
    statement: "تقفيل يومية الخزينة",
    isClosed: true
  },
  {
    id: 2,
    code: "TC002",
    date: "2025-09-18",
    time: "10:45",
    fromBranch: "الرياض العمومي",
    fromTreasury: "الصندوق العمومي",
    toBranch: "جدة العمومي",
    toTreasury: "الخزينة الرئيسية",
    transferInitiator: "أحمد محمد علي",
    amount: 15000.00,
    statement: "تقفيل يومية الخزينة",
    isClosed: false
  },
  {
    id: 3,
    code: "TC003",
    date: "2025-09-17",
    time: "09:30",
    fromBranch: "الدمام العمومي",
    fromTreasury: "خزينة الدمام",
    toBranch: "الرياض العمومي",
    toTreasury: "الصندوق العمومي",
    transferInitiator: "سارة أحمد",
    amount: 22000.00,
    statement: "تقفيل يومية الخزينة",
    isClosed: true
  }
]

// البيانات الافتراضية لتفاصيل تقفيل اليومية
export const defaultTreasureMonyClosedDetails: TreasureMonyClosedDetails = {
  id: 1,
  code: "TC001",
  date: "2025-09-19",
  time: "11:13",
  fromBranch: "فرع كفر الزيات 12",
  fromTreasury: "الزيات",
  toBranch: "مكه العموميه",
  toTreasury: "العمومي",
  transferInitiator: "7 هبه احمد السيد عياد سالم مخزن",
  amount: 26815.00,
  statement: "تقفيل يومية الخزينة",
  isClosed: true,
  transactions: [
    {
      id: 1,
      branch: "فرع كفر الزيات 12",
      code: "0 ...130",
      serial: "0",
      date: "8/21/2025",
      voucherType: "سند قبض",
      treasury: "الزيات",
      entityType: "الموظفين",
      entityName: "",
      itemName: "قمية الفاتورة",
      amount: 270.0,
      statement: ""
    },
    {
      id: 2,
      branch: "فرع كفر الزيات 12",
      code: "0 9474",
      serial: "0",
      date: "8/21/2025",
      voucherType: "سند قبض",
      treasury: "الزيات",
      entityType: "الموظفين",
      entityName: "",
      itemName: "سلفة موصلات",
      amount: 25.000,
      statement: ""
    },
    {
      id: 3,
      branch: "فرع كفر الزيات 12",
      code: "0 9475",
      serial: "0",
      date: "8/21/2025",
      voucherType: "سند دفع",
      treasury: "الزيات",
      entityType: "الموظفين",
      entityName: "",
      itemName: "مصروفات تشغيلية",
      amount: 675.00,
      statement: ""
    }
  ],
  totalRevenues: 27490.00,
  totalExpenses: 675.00,
  netAmount: 26815.00
}

// Hook للتحكم في البيانات
export const useTreasureMonyClosedController = () => {
  const [treasureMonyClosed, setTreasureMonyClosed] = useState<TreasureMonyClosed[]>(defaultTreasureMonyClosed)
  const [selectedTreasureMonyClosed, setSelectedTreasureMonyClosed] = useState<TreasureMonyClosedDetails | null>(null)
  const [showTreasureMonyClosedDetails, setShowTreasureMonyClosedDetails] = useState(false)
  const [isNewTreasureMonyClosed, setIsNewTreasureMonyClosed] = useState(false)
  const [isViewMode, setIsViewMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")
  const [fromDate, setFromDate] = useState("2025-09-19")
  const [toDate, setToDate] = useState("2025-09-19")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // فلترة البيانات
  const filteredData = treasureMonyClosed.filter(item => {
    const matchesSearch = item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.fromBranch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.toBranch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.transferInitiator.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = () => {
      const itemDate = new Date(item.date)
      const today = new Date()
      
      switch (dateFilter) {
        case "today":
          return itemDate.toDateString() === today.toDateString()
        case "all":
          return true
        case "period":
          if (!fromDate || !toDate) return true
          const from = new Date(fromDate)
          const to = new Date(toDate)
          return itemDate >= from && itemDate <= to
        case "month":
          return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear()
        default:
          return true
      }
    }

    return matchesSearch && matchesDate()
  })

  // حساب الصفحات
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handleNewTreasureMonyClosed = () => {
    setSelectedTreasureMonyClosed({
      ...defaultTreasureMonyClosedDetails,
      id: Date.now(),
      code: `TC${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    })
    setIsNewTreasureMonyClosed(true)
    setIsViewMode(false)
    setShowTreasureMonyClosedDetails(true)
  }

  const handleEditTreasureMonyClosed = (treasureMonyClosed: TreasureMonyClosed) => {
    setSelectedTreasureMonyClosed({
      ...defaultTreasureMonyClosedDetails,
      id: treasureMonyClosed.id,
      code: treasureMonyClosed.code,
      date: treasureMonyClosed.date,
      time: treasureMonyClosed.time,
      fromBranch: treasureMonyClosed.fromBranch,
      fromTreasury: treasureMonyClosed.fromTreasury,
      toBranch: treasureMonyClosed.toBranch,
      toTreasury: treasureMonyClosed.toTreasury,
      transferInitiator: treasureMonyClosed.transferInitiator,
      amount: treasureMonyClosed.amount,
      statement: treasureMonyClosed.statement,
      isClosed: treasureMonyClosed.isClosed,
    })
    setIsNewTreasureMonyClosed(false)
    setIsViewMode(false)
    setShowTreasureMonyClosedDetails(true)
  }

  const handleViewDetails = (treasureMonyClosed: TreasureMonyClosed) => {
    setSelectedTreasureMonyClosed({
      ...defaultTreasureMonyClosedDetails,
      id: treasureMonyClosed.id,
      code: treasureMonyClosed.code,
      date: treasureMonyClosed.date,
      time: treasureMonyClosed.time,
      fromBranch: treasureMonyClosed.fromBranch,
      fromTreasury: treasureMonyClosed.fromTreasury,
      toBranch: treasureMonyClosed.toBranch,
      toTreasury: treasureMonyClosed.toTreasury,
      transferInitiator: treasureMonyClosed.transferInitiator,
      amount: treasureMonyClosed.amount,
      statement: treasureMonyClosed.statement,
      isClosed: treasureMonyClosed.isClosed,
    })
    setIsNewTreasureMonyClosed(false)
    setIsViewMode(true)
    setShowTreasureMonyClosedDetails(true)
  }

  const handleDeleteTreasureMonyClosed = (id: number) => {
    setTreasureMonyClosed(prev => prev.filter(item => item.id !== id))
  }

  const handleSaveTreasureMonyClosed = (data: TreasureMonyClosedDetails) => {
    if (isNewTreasureMonyClosed) {
      const newItem: TreasureMonyClosed = {
        id: data.id,
        code: data.code,
        date: data.date,
        time: data.time,
        fromBranch: data.fromBranch,
        fromTreasury: data.fromTreasury,
        toBranch: data.toBranch,
        toTreasury: data.toTreasury,
        transferInitiator: data.transferInitiator,
        amount: data.amount,
        statement: data.statement,
        isClosed: data.isClosed
      }
      setTreasureMonyClosed(prev => [newItem, ...prev])
    } else {
      setTreasureMonyClosed(prev => prev.map(item => 
        item.id === data.id ? {
          ...item,
          code: data.code,
          date: data.date,
          time: data.time,
          fromBranch: data.fromBranch,
          fromTreasury: data.fromTreasury,
          toBranch: data.toBranch,
          toTreasury: data.toTreasury,
          transferInitiator: data.transferInitiator,
          amount: data.amount,
          statement: data.statement,
          isClosed: data.isClosed
        } : item
      ))
    }
    setShowTreasureMonyClosedDetails(false)
    setSelectedTreasureMonyClosed(null)
  }

  const handleCloseDetails = () => {
    setShowTreasureMonyClosedDetails(false)
    setSelectedTreasureMonyClosed(null)
  }

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setCurrentPage(1)
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // البحث في تقفيل يومية الخزينة
  const searchTreasureMonyClosed = (searchTerm: string) => {
    if (!searchTerm.trim()) return treasureMonyClosed

    const term = searchTerm.toLowerCase()
    return treasureMonyClosed.filter(
      (treasureMonyClosed) =>
        treasureMonyClosed.code.toLowerCase().includes(term) ||
        treasureMonyClosed.transferInitiator.toLowerCase().includes(term) ||
        treasureMonyClosed.fromBranch.toLowerCase().includes(term) ||
        treasureMonyClosed.fromTreasury.toLowerCase().includes(term) ||
        treasureMonyClosed.toBranch.toLowerCase().includes(term) ||
        treasureMonyClosed.toTreasury.toLowerCase().includes(term) ||
        treasureMonyClosed.statement.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterTreasureMonyClosedByDate = (treasureMonyClosed: TreasureMonyClosed[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return treasureMonyClosed.filter(item => {
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

  return {
    treasureMonyClosed: currentData,
    selectedTreasureMonyClosed,
    showTreasureMonyClosedDetails,
    isNewTreasureMonyClosed,
    isViewMode,
    searchTerm,
    dateFilter,
    fromDate,
    toDate,
    selectedMonth,
    currentPage,
    totalPages,
    filteredData,
    handleNewTreasureMonyClosed,
    handleEditTreasureMonyClosed,
    handleViewDetails,
    handleDeleteTreasureMonyClosed,
    handleSaveTreasureMonyClosed,
    handleCloseDetails,
    handleDateFilterChange,
    handleSearchChange,
    setFromDate,
    setToDate,
    setSelectedMonth,
    handlePageChange,
    searchTreasureMonyClosed,
    filterTreasureMonyClosedByDate
  }
}

// Utility functions
export const treasureMonyClosedUtils = {
  formatAmount: (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  },

  formatDate: (date: string) => {
    return new Date(date).toLocaleDateString('ar-SA')
  },

  getStatusColor: (isClosed: boolean) => {
    return isClosed ? 'text-green-600' : 'text-red-600'
  },

  getStatusText: (isClosed: boolean) => {
    return isClosed ? 'مغلق' : 'مفتوح'
  },

  branchOptions: [
    { value: "مكه العموميه", label: "مكه العموميه" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "فرع كفر الزيات 12", label: "فرع كفر الزيات 12" }
  ],

  treasuryOptions: [
    { value: "العمومي", label: "العمومي" },
    { value: "الصندوق العمومي", label: "الصندوق العمومي" },
    { value: "الخزينة الرئيسية", label: "الخزينة الرئيسية" },
    { value: "الزيات", label: "الزيات" },
    { value: "خزينة الدمام", label: "خزينة الدمام" }
  ],

  transferInitiatorOptions: [
    { value: "أحمد محمد علي", label: "أحمد محمد علي" },
    { value: "سارة أحمد", label: "سارة أحمد" },
    { value: "محمد السيد", label: "محمد السيد" },
    { value: "7 هبه احمد السيد عياد سالم مخزن", label: "7 هبه احمد السيد عياد سالم مخزن" }
  ],

  voucherTypeOptions: [
    { value: "سند قبض", label: "سند قبض" },
    { value: "سند دفع", label: "سند دفع" }
  ],

  entityTypeOptions: [
    { value: "الموظفين", label: "الموظفين" },
    { value: "العملاء", label: "العملاء" },
    { value: "الموردين", label: "الموردين" }
  ]
}
