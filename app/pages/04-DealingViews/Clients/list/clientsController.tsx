"use client"

import { useState, useEffect } from "react"

// Types
export interface Client {
  id: number
  branch: string
  code: number
  name: string
  currentBalance: number
  balanceType: string
  mobile: string
  phone: string
  address: string
  creditLimit: number
  priceCategory: string
  active: boolean
  notes: string
}

// Mock data
export const branches = [
  "مكه العمومي",
  "الرياض الرئيسي",
  "جدة الفرع",
  "الدمام الفرع"
]

export const priceCategories = [
  "0.00 سعر العملاء",
  "5.00 سعر العملاء المميزين",
  "10.00 سعر العملاء الذهبيين",
  "15.00 سعر العملاء البلاتينيين"
]

export const balanceTypes = [
  "مدين (عليه)",
  "دائن (له)",
  "صفر"
]

// Context menu items
export const clientContextMenuItems = [
  {
    section: "العمليات الأساسية",
    items: [
      { id: "view-details", label: "عرض التفاصيل", icon: "👁️" },
      { id: "edit-client", label: "تعديل العميل", icon: "✏️" },
      { id: "delete-client", label: "حذف العميل", icon: "🗑️" }
    ]
  },
  {
    section: "المعاملات المالية",
    items: [
      { id: "view-balance", label: "عرض الرصيد", icon: "💰" },
      { id: "payment-history", label: "سجل المدفوعات", icon: "📊" },
      { id: "credit-limit", label: "تعديل حد الائتمان", icon: "💳" },
      { id: "balance-adjustment", label: "تسوية الرصيد", icon: "⚖️" }
    ]
  },
  {
    section: "الخدمات",
    items: [
      { id: "appointments", label: "المواعيد", icon: "📅" },
      { id: "medical-history", label: "التاريخ الطبي", icon: "🏥" },
      { id: "prescriptions", label: "الوصفات الطبية", icon: "💊" },
      { id: "lab-results", label: "نتائج التحاليل", icon: "🧪" }
    ]
  },
  {
    section: "التقارير",
    items: [
      { id: "client-report", label: "تقرير العميل", icon: "📋" },
      { id: "financial-report", label: "التقرير المالي", icon: "📈" },
      { id: "visit-history", label: "سجل الزيارات", icon: "📝" }
    ]
  },
  {
    section: "الإعدادات",
    items: [
      { id: "notifications", label: "الإشعارات", icon: "🔔" },
      { id: "permissions", label: "الصلاحيات", icon: "🔐" },
      { id: "backup", label: "نسخ احتياطي", icon: "💾" }
    ]
  }
]

// Utility functions
export const clientUtils = {
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount)
  },

  validateClient: (client: Client): boolean => {
    return !!(
      client.name.trim() &&
      client.mobile.trim() &&
      client.branch &&
      client.priceCategory
    )
  },

  generateClientCode: (): number => {
    return Math.floor(Math.random() * 10000) + 1000
  },

  formatPhoneNumber: (phone: string): string => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  }
}

// Mock clients data
const mockClients: Client[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    code: 1001,
    name: "أحمد محمد العتيبي",
    currentBalance: 1500.00,
    balanceType: "مدين (عليه)",
    mobile: "0501234567",
    phone: "0123456789",
    address: "شارع الملك فهد، الرياض",
    creditLimit: 5000.00,
    priceCategory: "0.00 سعر العملاء",
    active: true,
    notes: "عميل مميز"
  },
  {
    id: 2,
    branch: "الرياض الرئيسي",
    code: 1002,
    name: "فاطمة عبدالله السعيد",
    currentBalance: 0.00,
    balanceType: "صفر",
    mobile: "0509876543",
    phone: "0123456788",
    address: "حي النرجس، الرياض",
    creditLimit: 3000.00,
    priceCategory: "5.00 سعر العملاء المميزين",
    active: true,
    notes: ""
  },
  {
    id: 3,
    branch: "جدة الفرع",
    code: 1003,
    name: "محمد علي الشريف",
    currentBalance: 2500.00,
    balanceType: "مدين (عليه)",
    mobile: "0505555555",
    phone: "0123456787",
    address: "حي الروضة، جدة",
    creditLimit: 10000.00,
    priceCategory: "10.00 سعر العملاء الذهبيين",
    active: false,
    notes: "عميل ذهبي"
  }
]

// Custom hook for clients management
export const useClientsController = () => {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [showClientDetails, setShowClientDetails] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isNewClient, setIsNewClient] = useState(false)

  const handleNewClient = () => {
    const newClient: Client = {
      id: 0,
      branch: "مكه العمومي",
      code: clientUtils.generateClientCode(),
      name: "",
      currentBalance: 0.00,
      balanceType: "مدين (عليه)",
      mobile: "",
      phone: "",
      address: "",
      creditLimit: 0.00,
      priceCategory: "0.00 سعر العملاء",
      active: true,
      notes: ""
    }
    setSelectedClient(newClient)
    setIsNewClient(true)
    setShowClientDetails(true)
  }

  const handleEditClient = (client: Client) => {
    setSelectedClient(client)
    setIsNewClient(false)
    setShowClientDetails(true)
  }

  const handleCloseClientDetails = () => {
    setShowClientDetails(false)
    setSelectedClient(null)
    setIsNewClient(false)
  }

  const handleSaveClient = (client: Client) => {
    if (clientUtils.validateClient(client)) {
      if (isNewClient) {
        const newClient = { ...client, id: Date.now() }
        setClients(prev => [...prev, newClient])
      } else {
        setClients(prev => prev.map(c => c.id === client.id ? client : c))
      }
      handleCloseClientDetails()
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة")
    }
  }

  const handleDeleteClient = (clientId: number) => {
    if (confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      setClients(prev => prev.filter(c => c.id !== clientId))
    }
  }

  const searchClients = (searchTerm: string) => {
    if (!searchTerm.trim()) return clients
    
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.mobile.includes(searchTerm) ||
      client.code.toString().includes(searchTerm)
    )
  }

  const getTotalBalance = () => {
    return clients.reduce((total, client) => total + client.currentBalance, 0)
  }

  const handleOpenContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    // Context menu logic here
  }

  const handleCloseContextMenu = () => {
    // Close context menu logic here
  }

  const handleContextMenuAction = (action: string) => {
    // Handle context menu actions here
  }

  return {
    clients,
    showClientDetails,
    selectedClient,
    isNewClient,
    showContextMenu: false,
    contextMenuPosition: { x: 0, y: 0 },
    handleNewClient,
    handleEditClient,
    handleCloseClientDetails,
    handleSaveClient,
    handleDeleteClient,
    searchClients,
    getTotalBalance,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleContextMenuAction
  }
}