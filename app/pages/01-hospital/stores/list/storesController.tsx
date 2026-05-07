"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface Store {
  id: number
  code: string
  name: string
  active: boolean
  description: string
  branchId: number
}

// Interface للفروع
export interface Branch {
  id: number
  name: string
}

// البيانات الافتراضية للمخازن
export const defaultStores: Store[] = [
  {
    id: 1,
    code: "ST001",
    name: "مخزن الأدوية الرئيسي",
    active: true,
    description: "المخزن الرئيسي للأدوية والمواد الطبية",
    branchId: 1,
  },
  {
    id: 2,
    code: "ST002",
    name: "مخزن المستلزمات الطبية",
    active: true,
    description: "مخزن المستلزمات الطبية والأجهزة",
    branchId: 1,
  },
  {
    id: 3,
    code: "ST003",
    name: "مخزن المواد الاستهلاكية",
    active: true,
    description: "مخزن المواد الاستهلاكية والورقيات",
    branchId: 2,
  },
  {
    id: 4,
    code: "ST004",
    name: "مخزن الأجهزة الطبية",
    active: false,
    description: "مخزن الأجهزة الطبية المتخصصة",
    branchId: 2,
  },
  {
    id: 5,
    code: "ST005",
    name: "مخزن الطوارئ",
    active: true,
    description: "مخزن طوارئ للمواد الأساسية",
    branchId: 1,
  },
]

// البيانات الافتراضية للفروع
export const defaultBranches: Branch[] = [
  { id: 1, name: "الفرع الرئيسي" },
  { id: 2, name: "فرع الشرق" },
  { id: 3, name: "فرع الغرب" },
  { id: 4, name: "فرع الشمال" },
  { id: 5, name: "فرع الجنوب" },
]

// Hook مشترك لإدارة حالة المخازن
export function useStoresController() {
  const [stores, setStores] = useState<Store[]>(defaultStores)
  const [showStoreDetails, setShowStoreDetails] = useState(false)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [isNewStore, setIsNewStore] = useState(false)

  // إنشاء مخزن جديد
  const createNewStore = (): Store => ({
    id: 0,
    code: "",
    name: "",
    active: true,
    description: "",
    branchId: 1,
  })

  // فتح شاشة إضافة مخزن جديد
  const handleNewStore = () => {
    setSelectedStore(createNewStore())
    setShowStoreDetails(true)
    setIsNewStore(true)
  }

  // فتح شاشة تعديل مخزن
  const handleEditStore = (store: Store) => {
    setSelectedStore(store)
    setShowStoreDetails(true)
    setIsNewStore(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowStoreDetails(false)
    setSelectedStore(null)
    setIsNewStore(false)
  }

  // حفظ المخزن
  const handleSaveStore = (storeData: Store) => {
    if (isNewStore) {
      // إضافة مخزن جديد
      const newStore = {
        ...storeData,
        id: Math.max(...stores.map(s => s.id)) + 1
      }
      setStores([...stores, newStore])
    } else {
      // تحديث مخزن موجود
      setStores(stores.map(s => 
        s.id === storeData.id ? storeData : s
      ))
    }
    handleCloseDetails()
  }

  // حذف مخزن
  const handleDeleteStore = (storeId: number) => {
    setStores(stores.filter(s => s.id !== storeId))
  }

  // البحث في المخازن
  const searchStores = (searchTerm: string) => {
    if (!searchTerm.trim()) return stores
    
    return stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // الحصول على اسم الفرع
  const getBranchName = (branchId: number): string => {
    const branch = defaultBranches.find(b => b.id === branchId)
    return branch ? branch.name : "غير محدد"
  }

  return {
    stores,
    showStoreDetails,
    selectedStore,
    isNewStore,
    handleNewStore,
    handleEditStore,
    handleCloseDetails,
    handleSaveStore,
    handleDeleteStore,
    searchStores,
    getBranchName,
  }
}

// Utility functions مشتركة
export const storeUtils = {
  // التحقق من صحة بيانات المخزن
  validateStore: (store: Store): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!store.name.trim()) errors.push("اسم المخزن مطلوب")
    if (!store.code.trim()) errors.push("كود المخزن مطلوب")
    if (!store.description.trim()) errors.push("وصف المخزن مطلوب")
    if (!store.branchId) errors.push("يجب اختيار الفرع")
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // تحويل الحالة إلى نص
  getStatusText: (active: boolean): string => {
    return active ? "نشط" : "غير نشط"
  },

  // الحصول على لون الحالة
  getStatusColor: (active: boolean): string => {
    return active ? "bg-green-500" : "bg-red-500"
  }
}