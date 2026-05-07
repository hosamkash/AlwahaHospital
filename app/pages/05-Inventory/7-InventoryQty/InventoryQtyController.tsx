"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface InventoryItem {
  id: number
  branch: string
  barcode: string
  warehouse: string
  item: string
  category: string
  manufacturer: string
  warehouseBalance: number
  price: number
  total: number
}

// Interface للتفاصيل
export interface InventoryItemDetails {
  id: number
  branch: string
  barcode: string
  warehouse: string
  item: string
  category: string
  manufacturer: string
  warehouseBalance: number
  price: number
  total: number
  lastUpdated: string
  notes: string
}

// البيانات الافتراضية للجرد المستمر
export const defaultInventoryItems: InventoryItem[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    barcode: "1234567890123",
    warehouse: "العمومي",
    item: "باراسيتامول 500 مج",
    category: "أدوية مسكنة",
    manufacturer: "شركة الدواء",
    warehouseBalance: 150,
    price: 25.50,
    total: 3825.00,
  },
  {
    id: 2,
    branch: "الرياض العمومي",
    barcode: "1234567890124",
    warehouse: "مخزن الطوارئ",
    item: "إيبوبروفين 400 مج",
    category: "أدوية مسكنة",
    manufacturer: "شركة الصحة",
    warehouseBalance: 200,
    price: 30.75,
    total: 6150.00,
  },
  {
    id: 3,
    branch: "جدة العمومي",
    barcode: "1234567890125",
    warehouse: "مخزن العيادات",
    item: "أموكسيسيلين 250 مج",
    category: "مضادات حيوية",
    manufacturer: "شركة الدواء",
    warehouseBalance: 75,
    price: 45.00,
    total: 3375.00,
  },
  {
    id: 4,
    branch: "الدمام العمومي",
    barcode: "1234567890126",
    warehouse: "مخزن العمليات",
    item: "مورفين 10 مج",
    category: "مسكنات قوية",
    manufacturer: "شركة الصحة",
    warehouseBalance: 50,
    price: 120.00,
    total: 6000.00,
  },
  {
    id: 5,
    branch: "الطائف العمومي",
    barcode: "1234567890127",
    warehouse: "المخزن الرئيسي",
    item: "أنسولين 100 وحدة",
    category: "أدوية السكري",
    manufacturer: "شركة الدواء",
    warehouseBalance: 300,
    price: 85.25,
    total: 25575.00,
  },
]

// Hook للتحكم في البيانات
export const useInventoryQtyController = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(defaultInventoryItems)
  const [selectedItem, setSelectedItem] = useState<InventoryItemDetails | null>(null)
  const [showItemDetails, setShowItemDetails] = useState(false)
  const [isNewItem, setIsNewItem] = useState(false)

  // إضافة صنف جديد
  const handleNewItem = () => {
    setSelectedItem({
      id: Date.now(),
      branch: "",
      barcode: "",
      warehouse: "",
      item: "",
      category: "",
      manufacturer: "",
      warehouseBalance: 0,
      price: 0,
      total: 0,
      lastUpdated: new Date().toISOString(),
      notes: "",
    })
    setIsNewItem(true)
    setShowItemDetails(true)
  }

  // تعديل صنف
  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem({
      ...item,
      lastUpdated: new Date().toISOString(),
      notes: "",
    })
    setIsNewItem(false)
    setShowItemDetails(true)
  }

  // إغلاق تفاصيل الصنف
  const handleCloseDetails = () => {
    setShowItemDetails(false)
    setSelectedItem(null)
    setIsNewItem(false)
  }

  // حفظ الصنف
  const handleSaveItem = (item: InventoryItemDetails) => {
    if (isNewItem) {
      const newItem: InventoryItem = {
        id: item.id,
        branch: item.branch,
        barcode: item.barcode,
        warehouse: item.warehouse,
        item: item.item,
        category: item.category,
        manufacturer: item.manufacturer,
        warehouseBalance: item.warehouseBalance,
        price: item.price,
        total: item.total,
      }
      setInventoryItems((prev) => [...prev, newItem])
    } else {
      setInventoryItems((prev) =>
        prev.map((existingItem) =>
          existingItem.id === item.id
            ? {
                ...existingItem,
                branch: item.branch,
                barcode: item.barcode,
                warehouse: item.warehouse,
                item: item.item,
                category: item.category,
                manufacturer: item.manufacturer,
                warehouseBalance: item.warehouseBalance,
                price: item.price,
                total: item.total,
              }
            : existingItem
        )
      )
    }
    handleCloseDetails()
  }

  // حذف صنف
  const handleDeleteItem = (id: number) => {
    setInventoryItems((prev) => prev.filter((item) => item.id !== id))
  }

  // البحث في الأصناف
  const searchItems = (searchTerm: string) => {
    if (!searchTerm.trim()) return inventoryItems

    const term = searchTerm.toLowerCase()
    return inventoryItems.filter(
      (item) =>
        item.barcode.toLowerCase().includes(term) ||
        item.item.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.manufacturer.toLowerCase().includes(term) ||
        item.branch.toLowerCase().includes(term) ||
        item.warehouse.toLowerCase().includes(term)
    )
  }

  // تحديث الأسعار
  const updatePrices = (priceUpdate: number) => {
    setInventoryItems((prev) =>
      prev.map((item) => ({
        ...item,
        price: item.price * (1 + priceUpdate / 100),
        total: item.warehouseBalance * (item.price * (1 + priceUpdate / 100)),
      }))
    )
  }

  // إخفاء الكميات الصفرية
  const hideZeroQuantities = (column: string) => {
    setInventoryItems((prev) =>
      prev.filter((item) => {
        if (column === "warehouseBalance") {
          return item.warehouseBalance > 0
        }
        return true
      })
    )
  }

  return {
    inventoryItems,
    selectedItem,
    showItemDetails,
    isNewItem,
    handleNewItem,
    handleEditItem,
    handleCloseDetails,
    handleSaveItem,
    handleDeleteItem,
    searchItems,
    updatePrices,
    hideZeroQuantities,
  }
}

// Utility functions
export const inventoryQtyUtils = {
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
    { value: "مخزن الطوارئ", label: "مخزن الطوارئ" },
    { value: "مخزن العيادات", label: "مخزن العيادات" },
    { value: "مخزن العمليات", label: "مخزن العمليات" },
    { value: "المخزن الرئيسي", label: "المخزن الرئيسي" }
  ],

  // خيارات التصنيفات
  categoryOptions: [
    { value: "أدوية مسكنة", label: "أدوية مسكنة" },
    { value: "مضادات حيوية", label: "مضادات حيوية" },
    { value: "مسكنات قوية", label: "مسكنات قوية" },
    { value: "أدوية السكري", label: "أدوية السكري" },
    { value: "أدوية القلب", label: "أدوية القلب" },
    { value: "أدوية الضغط", label: "أدوية الضغط" }
  ],

  // خيارات الشركات المنتجة
  manufacturerOptions: [
    { value: "شركة الدواء", label: "شركة الدواء" },
    { value: "شركة الصحة", label: "شركة الصحة" },
    { value: "شركة الأدوية", label: "شركة الأدوية" },
    { value: "شركة العلاج", label: "شركة العلاج" }
  ],

  // خيارات تقييم المخزن
  evaluationOptions: [
    { value: "average", label: "متوسط السعر" },
    { value: "last", label: "آخر سعر" },
    { value: "cost", label: "سعر التكلفة" },
    { value: "retail", label: "سعر البيع" }
  ],
}
