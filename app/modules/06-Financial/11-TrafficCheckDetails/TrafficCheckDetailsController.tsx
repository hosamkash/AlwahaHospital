"use client"

import { useState } from "react"

// Interface لحركة الشيكات التفصيلية
export interface TrafficCheckDetail {
  id: number
  branch: string
  checkType: string
  code: string
  checkNumber: string
  creationDate: string
  bankTreasury: string
  entityType: string
  entityName: string
  amount: number
  statement: string
  linkedToDocument: boolean
  documentCode: string
  isCollected: boolean
  isRejected: boolean
}

// Interface للتفاصيل
export interface TrafficCheckDetailForm {
  id: number
  branch: string
  checkType: string
  code: string
  checkNumber: string
  creationDate: string
  bankTreasury: string
  entityType: string
  entityName: string
  amount: number
  statement: string
  linkedToDocument: boolean
  documentCode: string
  isCollected: boolean
  isRejected: boolean
  rejectionReason: string
}

// البيانات الافتراضية لحركة الشيكات التفصيلية
export const defaultTrafficCheckDetails: TrafficCheckDetail[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    checkType: "شيك دفع",
    code: "TCD001",
    checkNumber: "123456",
    creationDate: "2025-09-21",
    bankTreasury: "البنك الأهلي السعودي",
    entityType: "مورد",
    entityName: "شركة الأدوية المتقدمة",
    amount: 15000.00,
    statement: "دفع فاتورة أدوية",
    linkedToDocument: true,
    documentCode: "DOC001",
    isCollected: false,
    isRejected: false
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    checkType: "شيك قبض",
    code: "TCD002",
    checkNumber: "789012",
    creationDate: "2025-09-20",
    bankTreasury: "البنك السعودي للاستثمار",
    entityType: "عميل",
    entityName: "مستشفى الملك فهد",
    amount: 25000.00,
    statement: "استلام شيك من عميل",
    linkedToDocument: false,
    documentCode: "",
    isCollected: true,
    isRejected: false
  },
  {
    id: 3,
    branch: "جدة العمومي",
    checkType: "شيك دفع",
    code: "TCD003",
    checkNumber: "345678",
    creationDate: "2025-09-19",
    bankTreasury: "البنك العربي الوطني",
    entityType: "مقاول",
    entityName: "مقاولات البناء الحديثة",
    amount: 8500.00,
    statement: "دفع مستحقات مقاولة",
    linkedToDocument: true,
    documentCode: "DOC002",
    isCollected: false,
    isRejected: true
  }
]

// البيانات الافتراضية لتفاصيل الشيك
export const defaultTrafficCheckDetailForm: TrafficCheckDetailForm = {
  id: 1,
  branch: "مكه العمومي",
  checkType: "شيك دفع",
  code: "1",
  checkNumber: "",
  creationDate: "0001-01-01",
  bankTreasury: "",
  entityType: "",
  entityName: "",
  amount: 0.00,
  statement: "",
  linkedToDocument: false,
  documentCode: "",
  isCollected: false,
  isRejected: false,
  rejectionReason: ""
}

// Hook للتحكم في البيانات
export const useTrafficCheckDetailsController = () => {
  const [trafficCheckDetails, setTrafficCheckDetails] = useState<TrafficCheckDetail[]>(defaultTrafficCheckDetails)
  const [selectedTrafficCheckDetail, setSelectedTrafficCheckDetail] = useState<TrafficCheckDetailForm | null>(null)
  const [showTrafficCheckDetailDetails, setShowTrafficCheckDetailDetails] = useState(false)
  const [isNewTrafficCheckDetail, setIsNewTrafficCheckDetail] = useState(false)

  // إضافة شيك جديد
  const handleNewTrafficCheckDetail = () => {
    setSelectedTrafficCheckDetail({
      ...defaultTrafficCheckDetailForm,
      id: Date.now(),
      code: `${Date.now()}`,
      creationDate: new Date().toISOString().split('T')[0],
    })
    setIsNewTrafficCheckDetail(true)
    setShowTrafficCheckDetailDetails(true)
  }

  // تعديل شيك
  const handleEditTrafficCheckDetail = (trafficCheckDetail: TrafficCheckDetail) => {
    setSelectedTrafficCheckDetail({
      ...defaultTrafficCheckDetailForm,
      id: trafficCheckDetail.id,
      branch: trafficCheckDetail.branch,
      checkType: trafficCheckDetail.checkType,
      code: trafficCheckDetail.code,
      checkNumber: trafficCheckDetail.checkNumber,
      creationDate: trafficCheckDetail.creationDate,
      bankTreasury: trafficCheckDetail.bankTreasury,
      entityType: trafficCheckDetail.entityType,
      entityName: trafficCheckDetail.entityName,
      amount: trafficCheckDetail.amount,
      statement: trafficCheckDetail.statement,
      linkedToDocument: trafficCheckDetail.linkedToDocument,
      documentCode: trafficCheckDetail.documentCode,
      isCollected: trafficCheckDetail.isCollected,
      isRejected: trafficCheckDetail.isRejected,
    })
    setIsNewTrafficCheckDetail(false)
    setShowTrafficCheckDetailDetails(true)
  }

  // إغلاق تفاصيل الشيك
  const handleCloseDetails = () => {
    setShowTrafficCheckDetailDetails(false)
    setSelectedTrafficCheckDetail(null)
    setIsNewTrafficCheckDetail(false)
  }

  // حفظ الشيك
  const handleSaveTrafficCheckDetail = (trafficCheckDetail: TrafficCheckDetailForm) => {
    if (isNewTrafficCheckDetail) {
      const newTrafficCheckDetail: TrafficCheckDetail = {
        id: trafficCheckDetail.id,
        branch: trafficCheckDetail.branch,
        checkType: trafficCheckDetail.checkType,
        code: trafficCheckDetail.code,
        checkNumber: trafficCheckDetail.checkNumber,
        creationDate: trafficCheckDetail.creationDate,
        bankTreasury: trafficCheckDetail.bankTreasury,
        entityType: trafficCheckDetail.entityType,
        entityName: trafficCheckDetail.entityName,
        amount: trafficCheckDetail.amount,
        statement: trafficCheckDetail.statement,
        linkedToDocument: trafficCheckDetail.linkedToDocument,
        documentCode: trafficCheckDetail.documentCode,
        isCollected: trafficCheckDetail.isCollected,
        isRejected: trafficCheckDetail.isRejected,
      }
      setTrafficCheckDetails((prev) => [...prev, newTrafficCheckDetail])
    } else {
      setTrafficCheckDetails((prev) =>
        prev.map((existingTrafficCheckDetail) =>
          existingTrafficCheckDetail.id === trafficCheckDetail.id
            ? {
                ...existingTrafficCheckDetail,
                branch: trafficCheckDetail.branch,
                checkType: trafficCheckDetail.checkType,
                code: trafficCheckDetail.code,
                checkNumber: trafficCheckDetail.checkNumber,
                creationDate: trafficCheckDetail.creationDate,
                bankTreasury: trafficCheckDetail.bankTreasury,
                entityType: trafficCheckDetail.entityType,
                entityName: trafficCheckDetail.entityName,
                amount: trafficCheckDetail.amount,
                statement: trafficCheckDetail.statement,
                linkedToDocument: trafficCheckDetail.linkedToDocument,
                documentCode: trafficCheckDetail.documentCode,
                isCollected: trafficCheckDetail.isCollected,
                isRejected: trafficCheckDetail.isRejected,
              }
            : existingTrafficCheckDetail
        )
      )
    }
    handleCloseDetails()
  }

  // حذف شيك
  const handleDeleteTrafficCheckDetail = (id: number) => {
    setTrafficCheckDetails((prev) => prev.filter((trafficCheckDetail) => trafficCheckDetail.id !== id))
  }

  // البحث في الشيكات
  const searchTrafficCheckDetails = (searchTerm: string) => {
    if (!searchTerm.trim()) return trafficCheckDetails

    const term = searchTerm.toLowerCase()
    return trafficCheckDetails.filter(
      (trafficCheckDetail) =>
        trafficCheckDetail.code.toLowerCase().includes(term) ||
        trafficCheckDetail.branch.toLowerCase().includes(term) ||
        trafficCheckDetail.checkType.toLowerCase().includes(term) ||
        trafficCheckDetail.checkNumber.toLowerCase().includes(term) ||
        trafficCheckDetail.bankTreasury.toLowerCase().includes(term) ||
        trafficCheckDetail.entityType.toLowerCase().includes(term) ||
        trafficCheckDetail.entityName.toLowerCase().includes(term) ||
        trafficCheckDetail.statement.toLowerCase().includes(term) ||
        trafficCheckDetail.documentCode.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterTrafficCheckDetailsByDate = (trafficCheckDetails: TrafficCheckDetail[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return trafficCheckDetails.filter(item => {
      if (dateFilter === "today") {
        const today = new Date().toISOString().split('T')[0]
        return item.creationDate === today
      } else if (dateFilter === "month") {
        if (!selectedMonth) return true
        const itemDate = new Date(item.creationDate)
        const currentYear = new Date().getFullYear()
        return itemDate.getMonth() === (parseInt(selectedMonth) - 1) && itemDate.getFullYear() === currentYear
      } else if (dateFilter === "period" && fromDate && toDate) {
        return item.creationDate >= fromDate && item.creationDate <= toDate
      }
      return true // "all" option
    })
  }

  // فلترة إضافية
  const filterTrafficCheckDetails = (trafficCheckDetails: TrafficCheckDetail[], filters: {
    bank?: string,
    entity?: string,
    branch?: string,
    treasury?: string
  }) => {
    return trafficCheckDetails.filter(item => {
      if (filters.bank && !item.bankTreasury.toLowerCase().includes(filters.bank.toLowerCase())) return false
      if (filters.entity && !item.entityName.toLowerCase().includes(filters.entity.toLowerCase())) return false
      if (filters.branch && !item.branch.toLowerCase().includes(filters.branch.toLowerCase())) return false
      if (filters.treasury && !item.bankTreasury.toLowerCase().includes(filters.treasury.toLowerCase())) return false
      return true
    })
  }

  return {
    trafficCheckDetails,
    selectedTrafficCheckDetail,
    showTrafficCheckDetailDetails,
    isNewTrafficCheckDetail,
    handleNewTrafficCheckDetail,
    handleEditTrafficCheckDetail,
    handleCloseDetails,
    handleSaveTrafficCheckDetail,
    handleDeleteTrafficCheckDetail,
    searchTrafficCheckDetails,
    filterTrafficCheckDetailsByDate,
    filterTrafficCheckDetails,
  }
}

// Utility functions
export const trafficCheckDetailsUtils = {
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

  // لون حالة التحصيل
  getCollectedColor: (isCollected: boolean) => {
    return isCollected ? "text-green-600" : "text-red-600"
  },

  // لون حالة الرفض
  getRejectedColor: (isRejected: boolean) => {
    return isRejected ? "text-red-600" : "text-green-600"
  },

  // لون حالة الربط بالمستند
  getLinkedColor: (linkedToDocument: boolean) => {
    return linkedToDocument ? "text-green-600" : "text-gray-600"
  },

  // خيارات الفروع
  branchOptions: [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ],

  // خيارات البنوك
  bankOptions: [
    { value: "البنك الأهلي السعودي", label: "البنك الأهلي السعودي" },
    { value: "البنك السعودي للاستثمار", label: "البنك السعودي للاستثمار" },
    { value: "البنك العربي الوطني", label: "البنك العربي الوطني" },
    { value: "بنك الراجحي", label: "بنك الراجحي" },
    { value: "البنك السعودي الفرنسي", label: "البنك السعودي الفرنسي" }
  ],

  // خيارات أنواع الجهات
  entityTypeOptions: [
    { value: "مورد", label: "مورد" },
    { value: "عميل", label: "عميل" },
    { value: "مستشفى", label: "مستشفى" },
    { value: "مقاول", label: "مقاول" },
    { value: "موظف", label: "موظف" }
  ],

  // خيارات أنواع الشيكات
  checkTypeOptions: [
    { value: "شيك دفع", label: "شيك دفع" },
    { value: "شيك قبض", label: "شيك قبض" }
  ],

  // خيارات الخزائن
  treasuryOptions: [
    { value: "الخزينة الرئيسية", label: "الخزينة الرئيسية" },
    { value: "خزينة الطوارئ", label: "خزينة الطوارئ" },
    { value: "خزينة العيادات", label: "خزينة العيادات" },
    { value: "خزينة العمليات", label: "خزينة العمليات" }
  ],

  // خيارات التاريخ
  dateOptions: [
    { value: "today", label: "تاريخ اليوم" },
    { value: "all", label: "الكل" },
    { value: "period", label: "فترة زمنية" },
    { value: "month", label: "شهر" },
  ],
}
