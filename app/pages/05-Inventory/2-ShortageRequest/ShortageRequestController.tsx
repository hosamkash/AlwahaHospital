"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface ShortageRequest {
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
export interface ShortageRequestDetails {
  id: number
  code: string
  date: string
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
  items: ShortageRequestItem[]
}

export interface ShortageRequestItem {
  id: number
  barcode: string
  item: string
  category: string
  unit: string
  priceCategory: string
  requiredBalance: number
  requiredQuantity: number
  disbursedBalance: number
  disbursedQuantity: number
  quantityDifference: number
  isPrepared: boolean
  preparationNotes: string
  receivedQuantity: number
  receivingDifference: number
  receivingMatches: boolean
  receivingNotes: string
}

// البيانات الافتراضية لطلبات النواقص
export const defaultShortageRequests: ShortageRequest[] = [
  {
    id: 1,
    branch: "الفرع الرئيسي",
    warehouse: "المخزن الرئيسي",
    responsibleEmployee: "أحمد محمد",
    code: "SR001",
    date: "2025-08-25",
    time: "09:30",
    orderValue: 15000,
    orderStatus: "قيد الطلب",
    notes: "طلب عاجل للأصناف الناقصة",
  },
  {
    id: 2,
    branch: "فرع المحلة",
    warehouse: "مخزن المحلة",
    responsibleEmployee: "سارة أحمد",
    code: "SR002",
    date: "2025-08-24",
    time: "14:15",
    orderValue: 8500,
    orderStatus: "تم التجهيز",
    notes: "تم تجهيز الطلب وجاهز للإرسال",
  },
  {
    id: 3,
    branch: "فرع طنطا",
    warehouse: "مخزن طنطا",
    responsibleEmployee: "محمد علي",
    code: "SR003",
    date: "2025-08-23",
    time: "11:45",
    orderValue: 12000,
    orderStatus: "تم الإرسال",
    notes: "تم إرسال الطلب للمستلم",
  },
]

// البيانات الافتراضية لتفاصيل الطلب
export const defaultShortageRequestDetails: ShortageRequestDetails = {
  id: 1,
  code: "SR001",
  date: "2025-08-25",
  branch: "الفرع الرئيسي",
  warehouse: "المخزن الرئيسي",
  employee: "أحمد محمد",
  notes: "طلب عاجل للأصناف الناقصة",
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
  items: [
    {
      id: 1,
      barcode: "123456789",
      item: "باراسيتامول 500 مجم",
      category: "مسكنات",
      unit: "علبة",
      priceCategory: "أ",
      requiredBalance: 50,
      requiredQuantity: 20,
      disbursedBalance: 0,
      disbursedQuantity: 0,
      quantityDifference: 20,
      isPrepared: false,
      preparationNotes: "",
      receivedQuantity: 0,
      receivingDifference: 0,
      receivingMatches: false,
      receivingNotes: "",
    },
    {
      id: 2,
      barcode: "987654321",
      item: "أمبيسلين 250 مجم",
      category: "مضادات حيوية",
      unit: "علبة",
      priceCategory: "ب",
      requiredBalance: 30,
      requiredQuantity: 15,
      disbursedBalance: 0,
      disbursedQuantity: 0,
      quantityDifference: 15,
      isPrepared: false,
      preparationNotes: "",
      receivedQuantity: 0,
      receivingDifference: 0,
      receivingMatches: false,
      receivingNotes: "",
    },
  ],
}

// Hook للتحكم في البيانات
export const useShortageRequestController = () => {
  const [shortageRequests, setShortageRequests] = useState<ShortageRequest[]>(defaultShortageRequests)
  const [selectedRequest, setSelectedRequest] = useState<ShortageRequestDetails | null>(null)
  const [showRequestDetails, setShowRequestDetails] = useState(false)
  const [isNewRequest, setIsNewRequest] = useState(false)

  // إضافة طلب جديد
  const handleNewRequest = () => {
    setSelectedRequest({
      ...defaultShortageRequestDetails,
      id: Date.now(),
      code: `SR${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    })
    setIsNewRequest(true)
    setShowRequestDetails(true)
  }

  // تعديل طلب
  const handleEditRequest = (request: ShortageRequest) => {
    setSelectedRequest({
      ...defaultShortageRequestDetails,
      id: request.id,
      code: request.code,
      date: request.date,
      branch: request.branch,
      warehouse: request.warehouse,
      employee: request.responsibleEmployee,
      notes: request.notes,
      orderStatus: request.orderStatus,
    })
    setIsNewRequest(false)
    setShowRequestDetails(true)
  }

  // إغلاق تفاصيل الطلب
  const handleCloseDetails = () => {
    setShowRequestDetails(false)
    setSelectedRequest(null)
    setIsNewRequest(false)
  }

  // حفظ الطلب
  const handleSaveRequest = (request: ShortageRequestDetails) => {
    if (isNewRequest) {
      const newRequest: ShortageRequest = {
        id: request.id,
        branch: request.branch,
        warehouse: request.warehouse,
        responsibleEmployee: request.employee,
        code: request.code,
        date: request.date,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        orderValue: request.items.reduce((sum, item) => sum + (item.requiredQuantity * 100), 0),
        orderStatus: request.orderStatus,
        notes: request.notes,
      }
      setShortageRequests((prev) => [...prev, newRequest])
    } else {
      setShortageRequests((prev) =>
        prev.map((existingRequest) =>
          existingRequest.id === request.id
            ? {
                ...existingRequest,
                branch: request.branch,
                warehouse: request.warehouse,
                responsibleEmployee: request.employee,
                code: request.code,
                date: request.date,
                orderStatus: request.orderStatus,
                notes: request.notes,
              }
            : existingRequest
        )
      )
    }
    handleCloseDetails()
  }

  // حذف طلب
  const handleDeleteRequest = (id: number) => {
    setShortageRequests((prev) => prev.filter((request) => request.id !== id))
  }

  // البحث في الطلبات
  const searchShortageRequests = (searchTerm: string) => {
    if (!searchTerm.trim()) return shortageRequests

    const term = searchTerm.toLowerCase()
    return shortageRequests.filter(
      (request) =>
        request.code.toLowerCase().includes(term) ||
        request.branch.toLowerCase().includes(term) ||
        request.warehouse.toLowerCase().includes(term) ||
        request.responsibleEmployee.toLowerCase().includes(term) ||
        request.orderStatus.toLowerCase().includes(term)
    )
  }

  // تحديث حالة الطلب
  const updateRequestStatus = (id: number, status: string) => {
    setShortageRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, orderStatus: status } : request
      )
    )
  }

  return {
    shortageRequests,
    selectedRequest,
    showRequestDetails,
    isNewRequest,
    handleNewRequest,
    handleEditRequest,
    handleCloseDetails,
    handleSaveRequest,
    handleDeleteRequest,
    searchShortageRequests,
    updateRequestStatus,
  }
}

// Utility functions
export const shortageRequestUtils = {
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

  // لون حالة الطلب
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

  // حالات الطلب
  orderStatuses: [
    "قيد الطلب",
    "تم التجهيز",
    "تم الإرسال",
    "تم الإستلام",
  ],
}
