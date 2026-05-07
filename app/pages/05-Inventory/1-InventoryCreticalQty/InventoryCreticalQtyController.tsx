"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface InventoryItem {
  id: number
  branch: string
  warehouse: string
  barcode: string
  item: string
  category: string
  manufacturer: string
  unit: string
  warehouseBalance: number
  orderLimit: number
}

// البيانات الافتراضية للأصناف
export const defaultInventoryItems: InventoryItem[] = [
  {
    id: 1,
    branch: "الفرع الرئيسي",
    warehouse: "المخزن الرئيسي",
    barcode: "123456789",
    item: "باراسيتامول 500 مجم",
    category: "مسكنات",
    manufacturer: "شركة الأدوية المصرية",
    unit: "علبة",
    warehouseBalance: 15,
    orderLimit: 20,
  },
  {
    id: 2,
    branch: "فرع المحلة",
    warehouse: "مخزن المحلة",
    barcode: "987654321",
    item: "أمبيسلين 250 مجم",
    category: "مضادات حيوية",
    manufacturer: "شركة فاركو",
    unit: "علبة",
    warehouseBalance: 8,
    orderLimit: 25,
  },
  {
    id: 3,
    branch: "الفرع الرئيسي",
    warehouse: "مخزن الطوارئ",
    barcode: "456789123",
    item: "قطرات العين",
    category: "أدوية العين",
    manufacturer: "شركة إيفا فارما",
    unit: "زجاجة",
    warehouseBalance: 5,
    orderLimit: 15,
  },
  {
    id: 4,
    branch: "فرع طنطا",
    warehouse: "مخزن طنطا",
    barcode: "789123456",
    item: "فيتامين سي 1000 مجم",
    category: "فيتامينات",
    manufacturer: "شركة يونيفارما",
    unit: "علبة",
    warehouseBalance: 12,
    orderLimit: 30,
  },
  {
    id: 5,
    branch: "الفرع الرئيسي",
    warehouse: "المخزن الرئيسي",
    barcode: "321654987",
    item: "أدوية السكري",
    category: "أدوية السكري",
    manufacturer: "شركة نوفو نورديسك",
    unit: "علبة",
    warehouseBalance: 3,
    orderLimit: 10,
  },
]

// Hook للتحكم في البيانات
export const useInventoryController = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(defaultInventoryItems)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showItemDetails, setShowItemDetails] = useState(false)
  const [isNewItem, setIsNewItem] = useState(false)

  // إضافة صنف جديد
  const handleNewItem = () => {
    setSelectedItem({
      id: Date.now(),
      branch: "",
      warehouse: "",
      barcode: "",
      item: "",
      category: "",
      manufacturer: "",
      unit: "",
      warehouseBalance: 0,
      orderLimit: 0,
    })
    setIsNewItem(true)
    setShowItemDetails(true)
  }

  // تعديل صنف
  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item)
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
  const handleSaveItem = (item: InventoryItem) => {
    if (isNewItem) {
      setInventoryItems((prev) => [...prev, item])
    } else {
      setInventoryItems((prev) =>
        prev.map((existingItem) =>
          existingItem.id === item.id ? item : existingItem
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
  const searchInventoryItems = (searchTerm: string) => {
    if (!searchTerm.trim()) return inventoryItems

    const term = searchTerm.toLowerCase()
    return inventoryItems.filter(
      (item) =>
        item.item.toLowerCase().includes(term) ||
        item.barcode.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.manufacturer.toLowerCase().includes(term) ||
        item.branch.toLowerCase().includes(term) ||
        item.warehouse.toLowerCase().includes(term)
    )
  }

  // الحصول على الأصناف الحرجة (الرصيد أقل من حد الطلب)
  const getCriticalItems = () => {
    return inventoryItems.filter((item) => item.warehouseBalance <= item.orderLimit)
  }

  // إنشاء فاتورة مشتريات للأصناف الناقصة
  const createPurchaseInvoice = () => {
    const criticalItems = getCriticalItems()
    // هنا يمكن إضافة منطق إنشاء فاتورة المشتريات
    console.log("إنشاء فاتورة مشتريات للأصناف الناقصة:", criticalItems)
  }

  // تحديث البيانات
  const refreshData = () => {
    // هنا يمكن إضافة منطق تحديث البيانات من الخادم
    console.log("تحديث البيانات")
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
    searchInventoryItems,
    getCriticalItems,
    createPurchaseInvoice,
    refreshData,
  }
}

// Utility functions
export const inventoryUtils = {
  // تنسيق الرصيد
  formatBalance: (balance: number) => {
    return balance.toLocaleString('ar-EG')
  },

  // تنسيق حد الطلب
  formatOrderLimit: (limit: number) => {
    return limit.toLocaleString('ar-EG')
  },

  // تحديد حالة الرصيد
  getBalanceStatus: (balance: number, orderLimit: number) => {
    if (balance === 0) return "نفذ"
    if (balance <= orderLimit) return "حرج"
    return "طبيعي"
  },

  // لون حالة الرصيد
  getBalanceStatusColor: (balance: number, orderLimit: number) => {
    if (balance === 0) return "text-red-600"
    if (balance <= orderLimit) return "text-orange-600"
    return "text-green-600"
  },
}
