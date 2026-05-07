"use client"

import { useState } from "react"

// Interface للمستندات المالية
export interface FinancialDocument {
  id: number
  documentType: string
  code: string
  date: string
  branch: string
  entityType: string
  entityName: string
  total: number
  isClosed: boolean
}

// Interface لسندات الدفع
export interface PaymentVoucher {
  id: number
  code: string
  date: string
  treasury: string
  itemName: string
  amount: number
}

// Interface لسندات القبض
export interface ReceiptVoucher {
  id: number
  code: string
  date: string
  treasury: string
  itemName: string
  amount: number
}

// Interface للتفاصيل
export interface BindDocumentForm {
  id: number
  documentType: string
  code: string
  date: string
  branch: string
  entityType: string
  entityName: string
  total: number
  isClosed: boolean
  notes: string
}

// البيانات الافتراضية للمستندات المالية
export const defaultFinancialDocuments: FinancialDocument[] = [
  {
    id: 1,
    documentType: "فاتورة مندوب",
    code: "13445",
    date: "2025-09-21",
    branch: "فرع طلخا",
    entityType: "الموظفين",
    entityName: "65 ناديه رمضان عويس",
    total: 25367.50,
    isClosed: true
  },
  {
    id: 2,
    documentType: "فاتورة مندوب",
    code: "14147",
    date: "2025-09-21",
    branch: "فرع سمنود",
    entityType: "الموظفين",
    entityName: "87 فاطمه عبد السلام",
    total: 16620.00,
    isClosed: false
  },
  {
    id: 3,
    documentType: "فاتورة مبيعات",
    code: "14201",
    date: "2025-09-20",
    branch: "فرع طلخا",
    entityType: "العملاء",
    entityName: "123 أحمد محمد علي",
    total: 500.00,
    isClosed: true
  },
  {
    id: 4,
    documentType: "فاتورة مشتريات",
    code: "14302",
    date: "2025-09-19",
    branch: "فرع سمنود",
    entityType: "الموردين",
    entityName: "456 شركة المورد الأول",
    total: 12500.00,
    isClosed: false
  },
  {
    id: 5,
    documentType: "فاتورة مندوب",
    code: "14415",
    date: "2025-09-18",
    branch: "فرع طلخا",
    entityType: "الموظفين",
    entityName: "78 سارة أحمد حسن",
    total: 8750.00,
    isClosed: true
  }
]

// البيانات الافتراضية لسندات الدفع
export const defaultPaymentVouchers: PaymentVoucher[] = [
  {
    id: 1,
    code: "PV001",
    date: "2025-09-21",
    treasury: "الخزينة الرئيسية",
    itemName: "مرتبات الموظفين",
    amount: 15000.00
  },
  {
    id: 2,
    code: "PV002",
    date: "2025-09-20",
    treasury: "خزينة الفرع",
    itemName: "مصروفات تشغيلية",
    amount: 5000.00
  }
]

// البيانات الافتراضية لسندات القبض
export const defaultReceiptVouchers: ReceiptVoucher[] = [
  {
    id: 1,
    code: "RV001",
    date: "2025-09-21",
    treasury: "الخزينة الرئيسية",
    itemName: "إيرادات المبيعات",
    amount: 25000.00
  },
  {
    id: 2,
    code: "RV002",
    date: "2025-09-20",
    treasury: "خزينة الفرع",
    itemName: "إيرادات الخدمات",
    amount: 8000.00
  }
]

// البيانات الافتراضية للتفاصيل
export const defaultBindDocumentForm: BindDocumentForm = {
  id: 1,
  documentType: "",
  code: "",
  date: "0001-01-01",
  branch: "",
  entityType: "",
  entityName: "",
  total: 0.00,
  isClosed: false,
  notes: ""
}

// Hook للتحكم في البيانات
export const useBindDocumentWithFinancialController = () => {
  const [financialDocuments, setFinancialDocuments] = useState<FinancialDocument[]>(defaultFinancialDocuments)
  const [paymentVouchers, setPaymentVouchers] = useState<PaymentVoucher[]>(defaultPaymentVouchers)
  const [receiptVouchers, setReceiptVouchers] = useState<ReceiptVoucher[]>(defaultReceiptVouchers)
  const [selectedDocument, setSelectedDocument] = useState<BindDocumentForm | null>(null)
  const [showDocumentDetails, setShowDocumentDetails] = useState(false)
  const [isNewDocument, setIsNewDocument] = useState(false)

  // إضافة مستند جديد
  const handleNewDocument = () => {
    setSelectedDocument({
      ...defaultBindDocumentForm,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    })
    setIsNewDocument(true)
    setShowDocumentDetails(true)
  }

  // تعديل مستند
  const handleEditDocument = (document: FinancialDocument) => {
    setSelectedDocument({
      ...defaultBindDocumentForm,
      id: document.id,
      documentType: document.documentType,
      code: document.code,
      date: document.date,
      branch: document.branch,
      entityType: document.entityType,
      entityName: document.entityName,
      total: document.total,
      isClosed: document.isClosed,
    })
    setIsNewDocument(false)
    setShowDocumentDetails(true)
  }

  // إغلاق تفاصيل المستند
  const handleCloseDetails = () => {
    setShowDocumentDetails(false)
    setSelectedDocument(null)
    setIsNewDocument(false)
  }

  // حفظ المستند
  const handleSaveDocument = (document: BindDocumentForm) => {
    if (isNewDocument) {
      const newDocument: FinancialDocument = {
        id: document.id,
        documentType: document.documentType,
        code: document.code,
        date: document.date,
        branch: document.branch,
        entityType: document.entityType,
        entityName: document.entityName,
        total: document.total,
        isClosed: document.isClosed,
      }
      setFinancialDocuments((prev) => [...prev, newDocument])
    } else {
      setFinancialDocuments((prev) =>
        prev.map((existingDocument) =>
          existingDocument.id === document.id
            ? {
                ...existingDocument,
                documentType: document.documentType,
                code: document.code,
                date: document.date,
                branch: document.branch,
                entityType: document.entityType,
                entityName: document.entityName,
                total: document.total,
                isClosed: document.isClosed,
              }
            : existingDocument
        )
      )
    }
    handleCloseDetails()
  }

  // حذف مستند
  const handleDeleteDocument = (id: number) => {
    setFinancialDocuments((prev) => prev.filter((document) => document.id !== id))
  }

  // البحث في المستندات
  const searchDocuments = (searchTerm: string) => {
    if (!searchTerm.trim()) return financialDocuments

    const term = searchTerm.toLowerCase()
    return financialDocuments.filter(
      (document) =>
        document.documentType.toLowerCase().includes(term) ||
        document.code.toLowerCase().includes(term) ||
        document.branch.toLowerCase().includes(term) ||
        document.entityType.toLowerCase().includes(term) ||
        document.entityName.toLowerCase().includes(term)
    )
  }

  // فلترة بالتاريخ
  const filterDocumentsByDate = (documents: FinancialDocument[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return documents.filter(item => {
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
  const filterDocuments = (documents: FinancialDocument[], filters: {
    documentType?: string,
    entityType?: string
  }) => {
    return documents.filter(item => {
      if (filters.documentType && !item.documentType.toLowerCase().includes(filters.documentType.toLowerCase())) return false
      if (filters.entityType && !item.entityType.toLowerCase().includes(filters.entityType.toLowerCase())) return false
      return true
    })
  }

  // حساب إجمالي المستندات
  const calculateTotal = (documents: FinancialDocument[]) => {
    return documents.reduce((sum, doc) => sum + doc.total, 0)
  }

  return {
    financialDocuments,
    paymentVouchers,
    receiptVouchers,
    selectedDocument,
    showDocumentDetails,
    isNewDocument,
    handleNewDocument,
    handleEditDocument,
    handleCloseDetails,
    handleSaveDocument,
    handleDeleteDocument,
    searchDocuments,
    filterDocumentsByDate,
    filterDocuments,
    calculateTotal,
  }
}

// Utility functions
export const bindDocumentUtils = {
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

  // لون المبلغ
  getAmountColor: (amount: number) => {
    return amount >= 0 ? "text-green-600" : "text-red-600"
  },

  // خيارات أنواع المستندات
  documentTypeOptions: [
    { value: "فاتورة مندوب", label: "فاتورة مندوب" },
    { value: "فاتورة مبيعات", label: "فاتورة مبيعات" },
    { value: "فاتورة مشتريات", label: "فاتورة مشتريات" },
    { value: "فاتورة مرتجعات", label: "فاتورة مرتجعات" },
    { value: "سند دفع", label: "سند دفع" },
    { value: "سند قبض", label: "سند قبض" }
  ],

  // خيارات أنواع الجهات
  entityTypeOptions: [
    { value: "الموظفين", label: "الموظفين" },
    { value: "العملاء", label: "العملاء" },
    { value: "الموردين", label: "الموردين" },
    { value: "البنوك", label: "البنوك" },
    { value: "الحكومة", label: "الحكومة" }
  ],

  // خيارات الفروع
  branchOptions: [
    { value: "فرع طلخا", label: "فرع طلخا" },
    { value: "فرع سمنود", label: "فرع سمنود" },
    { value: "الفرع الرئيسي", label: "الفرع الرئيسي" }
  ],

  // خيارات الخزائن
  treasuryOptions: [
    { value: "الخزينة الرئيسية", label: "الخزينة الرئيسية" },
    { value: "خزينة الفرع", label: "خزينة الفرع" },
    { value: "خزينة الطوارئ", label: "خزينة الطوارئ" }
  ],

  // خيارات التاريخ
  dateOptions: [
    { value: "today", label: "تاريخ اليوم" },
    { value: "all", label: "الكل" },
    { value: "period", label: "فترة زمنية" },
    { value: "month", label: "شهر" },
  ],
}
