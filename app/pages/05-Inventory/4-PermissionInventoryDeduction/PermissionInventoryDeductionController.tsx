"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface PermissionInventoryDeduction {
  id: number
  branch: string
  warehouse: string
  responsibleEmployee: string
  code: string
  date: string
  time: string
  orderValue: number
  orderStatus: string
  notes: string
}

// Interface للتفاصيل
export interface PermissionInventoryDeductionDetails {
  id: number
  code: string
  date: string
  time: string
  branch: string
  warehouse: string
  employee: string
  notes: string
  orderStatus: string
  // Preparation section
  prepareFromMainWarehouse: boolean
  prepBranch: string
  prepWarehouse: string
  prepEmployee: string
  prepNotes: string
  // Sending section
  sendPreparedOrder: boolean
  deliveryDriver: string
  sendingNotes: string
  // Receiving section
  receiveSentOrder: boolean
  receivingEmployee: string
  receivingNotes: string
  hideZeroBalances: boolean
  // Items
  items: PermissionInventoryDeductionItem[]
}

export interface PermissionInventoryDeductionItem {
  id: number
  barcode: string
  item: string
  category: string
  manufacturer: string
  unit: string
  priceCategory: string
  balance: number
  quantity: number
  price: number
  total: number
}

// البيانات الافتراضية لأذون الخصم
export const defaultPermissionInventoryDeduction: PermissionInventoryDeduction[] = [
  {
    id: 1,
    branch: "الفرع الرئيسي",
    warehouse: "المخزن الرئيسي",
    responsibleEmployee: "أحمد محمد",
    code: "PD001",
    date: "2025-08-25",
    time: "09:30",
    orderValue: 15000,
    orderStatus: "قيد الطلب",
    notes: "إذن خصم عاجل للأصناف",
  },
  {
    id: 2,
    branch: "فرع المحلة",
    warehouse: "مخزن المحلة",
    responsibleEmployee: "سارة أحمد",
    code: "PD002",
    date: "2025-08-24",
    time: "14:15",
    orderValue: 8500,
    orderStatus: "تم التجهيز",
    notes: "تم تجهيز الإذن وجاهز للإرسال",
  },
  {
    id: 3,
    branch: "فرع طنطا",
    warehouse: "مخزن طنطا",
    responsibleEmployee: "محمد علي",
    code: "PD003",
    date: "2025-08-23",
    time: "11:45",
    orderValue: 12000,
    orderStatus: "تم الإرسال",
    notes: "تم إرسال الإذن للمستلم",
  },
]

// البيانات الافتراضية لتفاصيل الإذن
export const defaultPermissionInventoryDeductionDetails: PermissionInventoryDeductionDetails = {
  id: 1,
  code: "2",
  date: "2025-09-18",
  time: "23:03",
  branch: "مكه العمومي",
  warehouse: "العمومي",
  employee: "أ. عاطف",
  notes: "",
  orderStatus: "قيد الطلب",
  prepareFromMainWarehouse: true,
  prepBranch: "",
  prepWarehouse: "",
  prepEmployee: "",
  prepNotes: "",
  sendPreparedOrder: false,
  deliveryDriver: "",
  sendingNotes: "",
  receiveSentOrder: false,
  receivingEmployee: "",
  receivingNotes: "",
  hideZeroBalances: false,
  items: [],
}

// Hook للتحكم في البيانات
export const usePermissionInventoryDeductionController = () => {
  const [permissionInventoryDeduction, setPermissionInventoryDeduction] = useState<PermissionInventoryDeduction[]>(defaultPermissionInventoryDeduction)
  const [selectedPermission, setSelectedPermission] = useState<PermissionInventoryDeductionDetails | null>(null)
  const [showPermissionDetails, setShowPermissionDetails] = useState(false)
  const [isNewPermission, setIsNewPermission] = useState(false)

  // إضافة إذن جديد
  const handleNewPermission = () => {
    setSelectedPermission({
      ...defaultPermissionInventoryDeductionDetails,
      id: Date.now(),
      code: `PD${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    })
    setIsNewPermission(true)
    setShowPermissionDetails(true)
  }

  // تعديل إذن
  const handleEditPermission = (permission: PermissionInventoryDeduction) => {
    setSelectedPermission({
      ...defaultPermissionInventoryDeductionDetails,
      id: permission.id,
      code: permission.code,
      date: permission.date,
      branch: permission.branch,
      warehouse: permission.warehouse,
      employee: permission.responsibleEmployee,
      notes: permission.notes,
      orderStatus: permission.orderStatus,
    })
    setIsNewPermission(false)
    setShowPermissionDetails(true)
  }

  // إغلاق تفاصيل الإذن
  const handleCloseDetails = () => {
    setShowPermissionDetails(false)
    setSelectedPermission(null)
    setIsNewPermission(false)
  }

  // حفظ الإذن
  const handleSavePermission = (permission: PermissionInventoryDeductionDetails) => {
    if (isNewPermission) {
      const newPermission: PermissionInventoryDeduction = {
        id: permission.id,
        branch: permission.branch,
        warehouse: permission.warehouse,
        responsibleEmployee: permission.employee,
        code: permission.code,
        date: permission.date,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        orderValue: permission.items.reduce((sum, item) => sum + (item.quantity * 100), 0),
        orderStatus: permission.orderStatus,
        notes: permission.notes,
      }
      setPermissionInventoryDeduction((prev) => [...prev, newPermission])
    } else {
      setPermissionInventoryDeduction((prev) =>
        prev.map((existingPermission) =>
          existingPermission.id === permission.id
            ? {
                ...existingPermission,
                branch: permission.branch,
                warehouse: permission.warehouse,
                responsibleEmployee: permission.employee,
                code: permission.code,
                date: permission.date,
                orderStatus: permission.orderStatus,
                notes: permission.notes,
              }
            : existingPermission
        )
      )
    }
    handleCloseDetails()
  }

  // حذف إذن
  const handleDeletePermission = (id: number) => {
    setPermissionInventoryDeduction((prev) => prev.filter((permission) => permission.id !== id))
  }

  // البحث في الأذون
  const searchPermissionInventoryDeduction = (searchTerm: string) => {
    if (!searchTerm.trim()) return permissionInventoryDeduction

    const term = searchTerm.toLowerCase()
    return permissionInventoryDeduction.filter(
      (permission) =>
        permission.code.toLowerCase().includes(term) ||
        permission.branch.toLowerCase().includes(term) ||
        permission.warehouse.toLowerCase().includes(term) ||
        permission.responsibleEmployee.toLowerCase().includes(term) ||
        permission.orderStatus.toLowerCase().includes(term)
    )
  }

  // تحديث حالة الإذن
  const updatePermissionStatus = (id: number, status: string) => {
    setPermissionInventoryDeduction((prev) =>
      prev.map((permission) =>
        permission.id === id ? { ...permission, orderStatus: status } : permission
      )
    )
  }

  return {
    permissionInventoryDeduction,
    selectedPermission,
    showPermissionDetails,
    isNewPermission,
    handleNewPermission,
    handleEditPermission,
    handleCloseDetails,
    handleSavePermission,
    handleDeletePermission,
    searchPermissionInventoryDeduction,
    updatePermissionStatus,
  }
}

// Utility functions
export const permissionInventoryDeductionUtils = {
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

  // لون حالة الإذن
  getStatusColor: (status: string) => {
    switch (status) {
      case "قيد الطلب":
        return "text-blue-600"
      case "تم التجهيز":
        return "text-yellow-600"
      case "تم الإرسال":
        return "text-orange-600"
      case "تم الإستلام":
        return "text-green-600"
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

  // حالات الإذن
  orderStatuses: [
    "قيد الطلب",
    "تم التجهيز",
    "تم الإرسال",
    "تم الإستلام",
  ],
}
