"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface ProductsMovement {
  id: number
  warehouse: string
  date: string
  documentType: string
  balanceBefore: number
  quantity: number
  balanceAfter: number
  price: number
  total: number
}

// Interface للتفاصيل
export interface ProductsMovementDetails {
  id: number
  warehouse: string
  date: string
  documentType: string
  balanceBefore: number
  quantity: number
  balanceAfter: number
  price: number
  total: number
  notes: string
  reference: string
}

// البيانات الافتراضية لحركة الأصناف
export const defaultProductsMovements: ProductsMovement[] = [
  {
    id: 1,
    warehouse: "العمومي",
    date: "2025-09-19",
    documentType: "إذن إضافة",
    balanceBefore: 100,
    quantity: 50,
    balanceAfter: 150,
    price: 25.50,
    total: 1275.00,
  },
  {
    id: 2,
    warehouse: "مخزن الطوارئ",
    date: "2025-09-18",
    documentType: "فاتورة مبيعات",
    balanceBefore: 200,
    quantity: -30,
    balanceAfter: 170,
    price: 30.75,
    total: -922.50,
  },
  {
    id: 3,
    warehouse: "مخزن العيادات",
    date: "2025-09-17",
    documentType: "تحويل أصناف بالزيادة",
    balanceBefore: 75,
    quantity: 25,
    balanceAfter: 100,
    price: 45.00,
    total: 1125.00,
  },
  {
    id: 4,
    warehouse: "مخزن العمليات",
    date: "2025-09-16",
    documentType: "تسوية بالزيادة",
    balanceBefore: 50,
    quantity: 10,
    balanceAfter: 60,
    price: 120.00,
    total: 1200.00,
  },
  {
    id: 5,
    warehouse: "المخزن الرئيسي",
    date: "2025-09-15",
    documentType: "فاتورة مشتريات",
    balanceBefore: 300,
    quantity: 100,
    balanceAfter: 400,
    price: 85.25,
    total: 8525.00,
  },
]

// Hook للتحكم في البيانات
export const useProductsMovementController = () => {
  const [productsMovements, setProductsMovements] = useState<ProductsMovement[]>(defaultProductsMovements)
  const [selectedMovement, setSelectedMovement] = useState<ProductsMovementDetails | null>(null)
  const [showMovementDetails, setShowMovementDetails] = useState(false)
  const [isNewMovement, setIsNewMovement] = useState(false)

  // إضافة حركة جديدة
  const handleNewMovement = () => {
    setSelectedMovement({
      id: Date.now(),
      warehouse: "",
      date: new Date().toISOString().split('T')[0],
      documentType: "",
      balanceBefore: 0,
      quantity: 0,
      balanceAfter: 0,
      price: 0,
      total: 0,
      notes: "",
      reference: "",
    })
    setIsNewMovement(true)
    setShowMovementDetails(true)
  }

  // تعديل حركة
  const handleEditMovement = (movement: ProductsMovement) => {
    setSelectedMovement({
      ...movement,
      notes: "",
      reference: "",
    })
    setIsNewMovement(false)
    setShowMovementDetails(true)
  }

  // إغلاق تفاصيل الحركة
  const handleCloseDetails = () => {
    setShowMovementDetails(false)
    setSelectedMovement(null)
    setIsNewMovement(false)
  }

  // حفظ الحركة
  const handleSaveMovement = (movement: ProductsMovementDetails) => {
    if (isNewMovement) {
      const newMovement: ProductsMovement = {
        id: movement.id,
        warehouse: movement.warehouse,
        date: movement.date,
        documentType: movement.documentType,
        balanceBefore: movement.balanceBefore,
        quantity: movement.quantity,
        balanceAfter: movement.balanceAfter,
        price: movement.price,
        total: movement.total,
      }
      setProductsMovements((prev) => [...prev, newMovement])
    } else {
      setProductsMovements((prev) =>
        prev.map((existingMovement) =>
          existingMovement.id === movement.id
            ? {
                ...existingMovement,
                warehouse: movement.warehouse,
                date: movement.date,
                documentType: movement.documentType,
                balanceBefore: movement.balanceBefore,
                quantity: movement.quantity,
                balanceAfter: movement.balanceAfter,
                price: movement.price,
                total: movement.total,
              }
            : existingMovement
        )
      )
    }
    handleCloseDetails()
  }

  // حذف حركة
  const handleDeleteMovement = (id: number) => {
    setProductsMovements((prev) => prev.filter((movement) => movement.id !== id))
  }

  // البحث في الحركات
  const searchMovements = (searchTerm: string) => {
    if (!searchTerm.trim()) return productsMovements

    const term = searchTerm.toLowerCase()
    return productsMovements.filter(
      (movement) =>
        movement.warehouse.toLowerCase().includes(term) ||
        movement.documentType.toLowerCase().includes(term) ||
        movement.date.toLowerCase().includes(term)
    )
  }

  // فلترة الحركات حسب التاريخ
  const filterMovementsByDate = (movements: ProductsMovement[], dateFilter: string, fromDate?: string, toDate?: string, selectedMonth?: string) => {
    return movements.filter(movement => {
      if (dateFilter === "today") {
        const today = new Date().toISOString().split('T')[0]
        return movement.date === today
      } else if (dateFilter === "month") {
        if (!selectedMonth) return true
        const movementDate = new Date(movement.date)
        const currentYear = new Date().getFullYear()
        return movementDate.getMonth() === (parseInt(selectedMonth) - 1) && movementDate.getFullYear() === currentYear
      } else if (dateFilter === "period" && fromDate && toDate) {
        return movement.date >= fromDate && movement.date <= toDate
      }
      return true // "all" option
    })
  }

  return {
    productsMovements,
    selectedMovement,
    showMovementDetails,
    isNewMovement,
    handleNewMovement,
    handleEditMovement,
    handleCloseDetails,
    handleSaveMovement,
    handleDeleteMovement,
    searchMovements,
    filterMovementsByDate,
  }
}

// Utility functions
export const productsMovementUtils = {
  // تنسيق التاريخ
  formatDate: (date: string) => {
    return new Date(date).toLocaleDateString('ar-EG')
  },

  // تنسيق القيمة
  formatValue: (value: number) => {
    return value.toLocaleString('ar-EG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  },

  // تنسيق الكمية
  formatQuantity: (quantity: number) => {
    return quantity.toLocaleString('ar-EG')
  },

  // لون الكمية (إيجابية أو سلبية)
  getQuantityColor: (quantity: number) => {
    if (quantity > 0) return "text-green-600"
    if (quantity < 0) return "text-red-600"
    return "text-gray-600"
  },

  // خيارات التواريخ
  dateOptions: [
    { value: "today", label: "تاريخ اليوم" },
    { value: "period", label: "فترة زمنية" },
    { value: "all", label: "الكل" },
    { value: "month", label: "شهر" },
  ],

  // خيارات المخازن
  warehouseOptions: [
    { value: "العمومي", label: "العمومي" },
    { value: "مخزن الطوارئ", label: "مخزن الطوارئ" },
    { value: "مخزن العيادات", label: "مخزن العيادات" },
    { value: "مخزن العمليات", label: "مخزن العمليات" },
    { value: "المخزن الرئيسي", label: "المخزن الرئيسي" }
  ],

  // خيارات أنواع المستندات
  documentTypeOptions: [
    { value: "إذن إضافة", label: "إذن إضافة" },
    { value: "طلب نواقص بالإضافة", label: "طلب نواقص بالإضافة" },
    { value: "تحويل أصناف بالزيادة", label: "تحويل أصناف بالزيادة" },
    { value: "تسوية بالزيادة", label: "تسوية بالزيادة" },
    { value: "فاتورة مشتريات", label: "فاتورة مشتريات" },
    { value: "فاتورة مرتجعات مبيعات", label: "فاتورة مرتجعات مبيعات" },
    { value: "جرد يومي بالزيادة", label: "جرد يومي بالزيادة" },
    { value: "فاتورة مرتجعات مخصصة", label: "فاتورة مرتجعات مخصصة" },
    { value: "إذن خصم", label: "إذن خصم" },
    { value: "طلب نواقص بالخصم", label: "طلب نواقص بالخصم" },
    { value: "تحويل أصناف بالنقصان", label: "تحويل أصناف بالنقصان" },
    { value: "تسوية بالنقصان", label: "تسوية بالنقصان" },
    { value: "فاتورة مرتجعات مشتريات", label: "فاتورة مرتجعات مشتريات" },
    { value: "فاتورة مبيعات", label: "فاتورة مبيعات" },
    { value: "فاتورة مندوب", label: "فاتورة مندوب" },
    { value: "فاتورة مبيعات موظف", label: "فاتورة مبيعات موظف" },
    { value: "جرد يومي بالنقصان", label: "جرد يومي بالنقصان" }
  ],

  // خيارات الفروع
  branchOptions: [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ],

  // خيارات الأصناف
  itemOptions: [
    { value: "باراسيتامول 500 مج", label: "باراسيتامول 500 مج" },
    { value: "إيبوبروفين 400 مج", label: "إيبوبروفين 400 مج" },
    { value: "أموكسيسيلين 250 مج", label: "أموكسيسيلين 250 مج" },
    { value: "مورفين 10 مج", label: "مورفين 10 مج" },
    { value: "أنسولين 100 وحدة", label: "أنسولين 100 وحدة" }
  ],

  // تصنيفات الحركات
  movementCategories: {
    "إجمالي الإضافة": [
      "إذن إضافة",
      "طلب نواقص بالإضافة",
      "تحويل أصناف بالزيادة",
      "تسوية بالزيادة",
      "فاتورة مشتريات",
      "فاتورة مرتجعات مبيعات",
      "جرد يومي بالزيادة",
      "فاتورة مرتجعات مخصصة"
    ],
    "إذن خصم": [
      "طلب نواقص بالخصم",
      "تحويل أصناف بالنقصان",
      "تسوية بالنقصان",
      "فاتورة مرتجعات مشتريات",
      "فاتورة مبيعات",
      "فاتورة مندوب",
      "فاتورة مبيعات موظف",
      "جرد يومي بالنقصان"
    ]
  }
}
