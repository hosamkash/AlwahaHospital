"use client"

import { useState } from "react"

// Interface for Treasure
export interface Treasure {
  id: number
  code: number
  name: string
  active: boolean
  branchName: string
  order: number
  creationDate: string
  currentBalance: number
}

// Default Branches Data
export const defaultBranches = [
  "الفرع الرئيسي",
  "فرع سمنود",
  "فرع طنطا",
  "فرع المحلة",
  "فرع كفر الزيات",
  "فرع زفتى",
  "فرع بسيون",
  "فرع قطور"
]

// Default Treasures Data
export const defaultTreasures: Treasure[] = [
  {
    id: 1,
    code: 1001,
    name: "الخزينة الرئيسية",
    active: true,
    branchName: "الفرع الرئيسي",
    order: 1,
    creationDate: "2024-01-01",
    currentBalance: 15000000.00
  },
  {
    id: 2,
    code: 1002,
    name: "خزينة سمنود",
    active: true,
    branchName: "فرع سمنود",
    order: 2,
    creationDate: "2024-01-15",
    currentBalance: 9579919.85
  },
  {
    id: 3,
    code: 1003,
    name: "خزينة طنطا",
    active: true,
    branchName: "فرع طنطا",
    order: 3,
    creationDate: "2024-02-01",
    currentBalance: 8500000.00
  },
  {
    id: 4,
    code: 1004,
    name: "خزينة المحلة",
    active: true,
    branchName: "فرع المحلة",
    order: 4,
    creationDate: "2024-02-15",
    currentBalance: 7200000.00
  },
  {
    id: 5,
    code: 1005,
    name: "خزينة كفر الزيات",
    active: true,
    branchName: "فرع كفر الزيات",
    order: 5,
    creationDate: "2024-03-01",
    currentBalance: 6500000.00
  },
  {
    id: 6,
    code: 1006,
    name: "خزينة زفتى",
    active: true,
    branchName: "فرع زفتى",
    order: 6,
    creationDate: "2024-03-15",
    currentBalance: 5800000.00
  },
  {
    id: 7,
    code: 1007,
    name: "خزينة بسيون",
    active: true,
    branchName: "فرع بسيون",
    order: 7,
    creationDate: "2024-04-01",
    currentBalance: 5200000.00
  },
  {
    id: 8,
    code: 1008,
    name: "خزينة قطور",
    active: true,
    branchName: "فرع قطور",
    order: 8,
    creationDate: "2024-04-15",
    currentBalance: 4800000.00
  }
]

// Custom Hook for Treasures Management
export const useTreasuresController = () => {
  const [treasures, setTreasures] = useState<Treasure[]>(defaultTreasures)
  const [showTreasureDetails, setShowTreasureDetails] = useState(false)
  const [selectedTreasure, setSelectedTreasure] = useState<Treasure | null>(null)
  const [isNewTreasure, setIsNewTreasure] = useState(false)

  const createNewTreasure = (): Treasure => ({
    id: Math.max(...treasures.map(treasure => treasure.id), 0) + 1,
    code: Math.max(...treasures.map(treasure => treasure.code), 1000) + 1,
    name: "",
    active: true,
    branchName: defaultBranches[0],
    order: Math.max(...treasures.map(treasure => treasure.order), 0) + 1,
    creationDate: new Date().toISOString().split('T')[0],
    currentBalance: 0
  })

  const handleNewTreasure = () => {
    setSelectedTreasure(createNewTreasure())
    setIsNewTreasure(true)
    setShowTreasureDetails(true)
  }

  const handleEditTreasure = (treasure: Treasure) => {
    setSelectedTreasure({ ...treasure })
    setIsNewTreasure(false)
    setShowTreasureDetails(true)
  }

  const handleCloseDetails = () => {
    setShowTreasureDetails(false)
    setSelectedTreasure(null)
    setIsNewTreasure(false)
  }

  const handleSaveTreasure = (treasure: Treasure) => {
    if (isNewTreasure) {
      setTreasures(prev => [...prev, treasure])
    } else {
      setTreasures(prev => prev.map(t => t.id === treasure.id ? treasure : t))
    }
    handleCloseDetails()
  }

  const handleDeleteTreasure = (treasureId: number) => {
    setTreasures(prev => prev.filter(treasure => treasure.id !== treasureId))
  }

  const searchTreasures = (searchTerm: string) => {
    if (!searchTerm.trim()) return treasures
    return treasures.filter(treasure =>
      treasure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treasure.code.toString().includes(searchTerm) ||
      treasure.branchName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    treasures,
    showTreasureDetails,
    selectedTreasure,
    isNewTreasure,
    handleNewTreasure,
    handleEditTreasure,
    handleCloseDetails,
    handleSaveTreasure,
    handleDeleteTreasure,
    searchTreasures,
  }
}

// Utility Functions
export const treasureUtils = {
  validateTreasure: (treasure: Treasure): boolean => {
    return treasure.name.trim().length > 0 && treasure.code > 0 && treasure.branchName.trim().length > 0
  },

  getStatusText: (active: boolean): string => {
    return active ? "نشط" : "غير نشط"
  },

  getStatusColor: (active: boolean): string => {
    return active ? "bg-green-500" : "bg-red-500"
  },

  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 2
    }).format(amount)
  },

  formatDate: (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-EG')
  }
}
