"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface PriceList {
  id: number
  code: string
  name: string
  description: string
  active: boolean
  discountType: "percentage" | "fixed" | "mixed" // نوع الخصم: نسبة، مبلغ ثابت، مختلط
  globalDiscountPercentage: number // نسبة الخصم العامة على كل العناصر
  services: PriceListItem[]
  items: PriceListItem[]
  analysis: PriceListItem[]
  radiology: PriceListItem[]
  operations: PriceListItem[]
}

export interface PriceListItem {
  id: number
  code: string
  name: string
  originalPrice: number
  discountValue: number // مبلغ الخصم الثابت
  discountPercentage: number // نسبة الخصم
  listPrice: number // سعر القائمة
  finalPrice: number // السعر النهائي بعد الخصم
  type: "service" | "item" | "analysis" | "radiology" | "operation"
}

// البيانات الافتراضية لقوائم الأسعار
export const defaultPriceLists: PriceList[] = [
  {
    id: 1,
    code: "PL001",
    name: "قائمة أسعار عامة",
    description: "قائمة الأسعار الأساسية للمستشفى",
    active: true,
    discountType: "percentage",
    globalDiscountPercentage: 10,
    services: [
      {
        id: 1,
        code: "S001",
        name: "استشارة طبيب القلب",
        originalPrice: 500,
        discountValue: 0,
        discountPercentage: 10,
        listPrice: 500,
        finalPrice: 450,
        type: "service"
      },
      {
        id: 2,
        code: "S002",
        name: "استشارة طبيب الجراحة",
        originalPrice: 300,
        discountValue: 0,
        discountPercentage: 10,
        listPrice: 300,
        finalPrice: 270,
        type: "service"
      }
    ],
    items: [
      {
        id: 3,
        code: "I001",
        name: "خيوط جراحية",
        originalPrice: 200,
        discountValue: 0,
        discountPercentage: 10,
        listPrice: 200,
        finalPrice: 180,
        type: "item"
      }
    ],
    analysis: [
      {
        id: 4,
        code: "A001",
        name: "تحليل الدم الشامل",
        originalPrice: 200,
        discountValue: 0,
        discountPercentage: 10,
        listPrice: 200,
        finalPrice: 180,
        type: "analysis"
      },
      {
        id: 5,
        code: "A002",
        name: "Total T3",
        originalPrice: 35,
        discountValue: 0,
        discountPercentage: 0,
        listPrice: 35,
        finalPrice: 35,
        type: "analysis"
      },
      {
        id: 6,
        code: "A003",
        name: "Total T4",
        originalPrice: 60,
        discountValue: 0,
        discountPercentage: 0,
        listPrice: 60,
        finalPrice: 60,
        type: "analysis"
      },
      {
        id: 7,
        code: "A004",
        name: "TSH - (Ultra Sensitive)",
        originalPrice: 55,
        discountValue: 0,
        discountPercentage: 0,
        listPrice: 55,
        finalPrice: 55,
        type: "analysis"
      }
    ],
    radiology: [
      {
        id: 8,
        code: "R001",
        name: "أشعة سينية للصدر",
        originalPrice: 300,
        discountValue: 0,
        discountPercentage: 10,
        listPrice: 300,
        finalPrice: 270,
        type: "radiology"
      }
    ],
    operations: [
      {
        id: 9,
        code: "OP001",
        name: "عمليه قلب مفتوح",
        originalPrice: 15000,
        discountValue: 0,
        discountPercentage: 10,
        listPrice: 15000,
        finalPrice: 13500,
        type: "operation"
      }
    ]
  },
  {
    id: 2,
    code: "PL002",
    name: "قائمة أسعار خاصة",
    description: "قائمة أسعار للعملاء المميزين",
    active: true,
    discountType: "mixed",
    globalDiscountPercentage: 15,
    services: [],
    items: [],
    analysis: [],
    radiology: [],
    operations: []
  }
]

// بيانات التبويبات المشتركة
export const tabData = [
  { id: "services", name: "الخدمات" },
  { id: "items", name: "الأصناف" },
  { id: "analysis", name: "التحاليل" },
  { id: "radiology", name: "الأشعة" },
  { id: "operations", name: "العمليات" },
]

// بيانات أنواع الخصم
export const discountTypes = [
  { value: "percentage", label: "نسبة خصم على كل العناصر" },
  { value: "fixed", label: "تحديد سعر بعد الخصم لكل عنصر" },
  { value: "mixed", label: "خصم منفصل لكل عنصر + نسبة خصم عامة" },
]

// بيانات الخدمات المتاحة
export const availableServices = [
  { code: "S001", name: "استشارة طبيب القلب", originalPrice: 500 },
  { code: "S002", name: "استشارة طبيب الجراحة", originalPrice: 300 },
  { code: "S003", name: "استشارة طبيب العظام", originalPrice: 250 },
  { code: "S004", name: "استشارة طبيب المخ والأعصاب", originalPrice: 400 },
  { code: "S005", name: "استشارة طبيب الأطفال", originalPrice: 200 },
]

// بيانات الأصناف المتاحة
export const availableItems = [
  { code: "I001", name: "خيوط جراحية", originalPrice: 200 },
  { code: "I002", name: "قفازات طبية", originalPrice: 50 },
  { code: "I003", name: "ضمادات طبية", originalPrice: 30 },
  { code: "I004", name: "محاليل وريدية", originalPrice: 150 },
  { code: "I005", name: "أدوية مسكنة", originalPrice: 100 },
]

// بيانات التحاليل المتاحة
export const availableAnalysis = [
  { code: "A001", name: "تحليل الدم الشامل", originalPrice: 200 },
  { code: "A002", name: "Total T3", originalPrice: 35 },
  { code: "A003", name: "Total T4", originalPrice: 60 },
  { code: "A004", name: "TSH - (Ultra Sensitive)", originalPrice: 55 },
  { code: "A005", name: "Free T3", originalPrice: 120 },
  { code: "A006", name: "Free T4", originalPrice: 150 },
  { code: "A007", name: "Free thyroxin index", originalPrice: 100 },
  { code: "A008", name: "Anti thyroglobulin (Anti TG)", originalPrice: 300 },
  { code: "A009", name: "Anti Peroxidase - Ab (Anti - TPO)", originalPrice: 225 },
  { code: "A010", name: "Parathyroid hormone [PTH]", originalPrice: 400 },
  { code: "A011", name: "Calcitionin", originalPrice: 300 },
  { code: "A012", name: "Protein Bound Iodine", originalPrice: 250 },
  { code: "A013", name: "Thyroglobulin", originalPrice: 350 },
  { code: "A014", name: "T3 Uptake", originalPrice: 180 },
  { code: "A015", name: "FSH", originalPrice: 120 },
  { code: "A016", name: "LH", originalPrice: 120 },
]

// بيانات الأشعة المتاحة
export const availableRadiology = [
  { code: "R001", name: "أشعة سينية للصدر", originalPrice: 300 },
  { code: "R002", name: "أشعة مقطعية للبطن", originalPrice: 800 },
  { code: "R003", name: "رنين مغناطيسي للرأس", originalPrice: 1200 },
  { code: "R004", name: "أشعة بالموجات فوق الصوتية", originalPrice: 400 },
  { code: "R005", name: "أشعة مقطعية للصدر", originalPrice: 600 },
]

// بيانات العمليات المتاحة
export const availableOperations = [
  { code: "OP001", name: "عمليه قلب مفتوح", originalPrice: 15000 },
  { code: "OP002", name: "عمليه استئصال الزائدة", originalPrice: 3000 },
  { code: "OP003", name: "عمليه تنظير البطن", originalPrice: 2500 },
  { code: "OP004", name: "عمليه استئصال المرارة", originalPrice: 4000 },
  { code: "OP005", name: "عمليه استئصال اللوزتين", originalPrice: 1500 },
]

// Hook مشترك لإدارة حالة قوائم الأسعار
export function usePriceListsController() {
  const [priceLists, setPriceLists] = useState<PriceList[]>(defaultPriceLists)
  const [showPriceListDetails, setShowPriceListDetails] = useState(false)
  const [selectedPriceList, setSelectedPriceList] = useState<PriceList | null>(null)
  const [isNewPriceList, setIsNewPriceList] = useState(false)

  // إنشاء قائمة أسعار جديدة
  const createNewPriceList = (): PriceList => ({
    id: 0,
    code: "",
    name: "",
    description: "",
    active: true,
    discountType: "percentage",
    globalDiscountPercentage: 0,
    services: [],
    items: [],
    analysis: [],
    radiology: [],
    operations: []
  })

  // فتح شاشة إضافة قائمة أسعار جديدة
  const handleNewPriceList = () => {
    setSelectedPriceList(createNewPriceList())
    setShowPriceListDetails(true)
    setIsNewPriceList(true)
  }

  // فتح شاشة تعديل قائمة أسعار
  const handleEditPriceList = (priceList: PriceList) => {
    setSelectedPriceList(priceList)
    setShowPriceListDetails(true)
    setIsNewPriceList(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowPriceListDetails(false)
    setSelectedPriceList(null)
    setIsNewPriceList(false)
  }

  // حفظ قائمة الأسعار
  const handleSavePriceList = (priceListData: PriceList) => {
    if (isNewPriceList) {
      // إضافة قائمة أسعار جديدة
      const newPriceList = {
        ...priceListData,
        id: Math.max(...priceLists.map(p => p.id)) + 1
      }
      setPriceLists([...priceLists, newPriceList])
    } else {
      // تحديث قائمة أسعار موجودة
      setPriceLists(priceLists.map(p => 
        p.id === priceListData.id ? priceListData : p
      ))
    }
    handleCloseDetails()
  }

  // حذف قائمة أسعار
  const handleDeletePriceList = (priceListId: number) => {
    setPriceLists(priceLists.filter(p => p.id !== priceListId))
  }

  // البحث في قوائم الأسعار
  const searchPriceLists = (searchTerm: string) => {
    if (!searchTerm.trim()) return priceLists
    
    return priceLists.filter(priceList =>
      priceList.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      priceList.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      priceList.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // حساب السعر النهائي للعنصر
  const calculateFinalPrice = (item: PriceListItem, globalDiscountPercentage: number, discountType: string) => {
    let finalPrice = item.originalPrice

    if (discountType === "percentage") {
      // نسبة خصم على كل العناصر
      finalPrice = item.originalPrice * (1 - globalDiscountPercentage / 100)
    } else if (discountType === "fixed") {
      // تحديد سعر بعد الخصم لكل عنصر
      if (item.discountValue > 0) {
        finalPrice = item.originalPrice - item.discountValue
      }
    } else if (discountType === "mixed") {
      // خصم منفصل لكل عنصر + نسبة خصم عامة
      let tempPrice = item.originalPrice
      if (item.discountValue > 0) {
        tempPrice = tempPrice - item.discountValue
      }
      if (item.discountPercentage > 0) {
        tempPrice = tempPrice * (1 - item.discountPercentage / 100)
      }
      finalPrice = tempPrice * (1 - globalDiscountPercentage / 100)
    }

    return Math.max(0, finalPrice)
  }

  // إضافة عنصر لقائمة الأسعار
  const addItemToPriceList = (priceList: PriceList, itemType: string, itemData: any) => {
    const newItem: PriceListItem = {
      id: Math.max(...priceList[itemType as keyof PriceList]?.map((i: any) => i.id) || [0]) + 1,
      code: itemData.code,
      name: itemData.name,
      originalPrice: itemData.originalPrice,
      discountValue: 0,
      discountPercentage: 0,
      listPrice: itemData.originalPrice,
      finalPrice: itemData.originalPrice,
      type: itemType as any
    }

    return {
      ...priceList,
      [itemType]: [...priceList[itemType as keyof PriceList] || [], newItem]
    }
  }

  // حذف عنصر من قائمة الأسعار
  const removeItemFromPriceList = (priceList: PriceList, itemType: string, itemId: number) => {
    return {
      ...priceList,
      [itemType]: priceList[itemType as keyof PriceList]?.filter((item: any) => item.id !== itemId) || []
    }
  }

  return {
    priceLists,
    showPriceListDetails,
    selectedPriceList,
    isNewPriceList,
    handleNewPriceList,
    handleEditPriceList,
    handleCloseDetails,
    handleSavePriceList,
    handleDeletePriceList,
    searchPriceLists,
    calculateFinalPrice,
    addItemToPriceList,
    removeItemFromPriceList,
  }
}

// Utility functions مشتركة
export const priceListUtils = {
  // التحقق من صحة بيانات قائمة الأسعار
  validatePriceList: (priceList: PriceList): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!priceList.name.trim()) errors.push("اسم قائمة الأسعار مطلوب")
    if (!priceList.code.trim()) errors.push("كود قائمة الأسعار مطلوب")
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // تنسيق الأرقام
  formatNumber: (num: number): string => {
    return num.toFixed(2)
  },

  // تحويل الحالة إلى نص
  getStatusText: (active: boolean): string => {
    return active ? "نشط" : "غير نشط"
  },

  // الحصول على لون الحالة
  getStatusColor: (active: boolean): string => {
    return active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  },

  // الحصول على نص نوع الخصم
  getDiscountTypeText: (discountType: string): string => {
    switch (discountType) {
      case "percentage":
        return "نسبة خصم عامة"
      case "fixed":
        return "سعر ثابت بعد الخصم"
      case "mixed":
        return "خصم مختلط"
      default:
        return "غير محدد"
    }
  }
}
