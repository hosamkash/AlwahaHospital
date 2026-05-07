"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface MedicalOperation {
  id: number
  code: string
  name: string
  anesthesiaType: string
  active: boolean
  total: number
  discount: number
  net: number
  services: OperationService[]
  items: OperationItem[]
  radiology: OperationRadiology[]
  analysis: OperationAnalysis[]
  specialties: OperationSpecialty[]
}

export interface OperationService {
  id: number
  serviceCode: string
  serviceName: string
  value: number
  discountValue: number
  discountPercentage: number
  net: number
}

export interface OperationItem {
  id: number
  code: string
  itemName: string
  quantity: number
  value: number
  discount: number
  discountPercentage: number
  unit: string
  net: number
}

export interface OperationRadiology {
  id: number
  code: string
  radiologyName: string
  value: number
  discount: number
  net: number
}

export interface OperationAnalysis {
  id: number
  code: string
  analysisName: string
  value: number
  discount: number
  net: number
}

export interface OperationSpecialty {
  id: number
  code: string
  specialtyName: string
  value: number
  discount: number
  net: number
}

// البيانات الافتراضية للعمليات الطبية
export const defaultMedicalOperations: MedicalOperation[] = [
  {
    id: 1,
    code: "1",
    name: "عمليه قلب مفتوح",
    anesthesiaType: "تخدير كلي",
    active: true,
    total: 15000,
    discount: 1500,
    net: 13500,
    services: [
      {
        id: 1,
        serviceCode: "S001",
        serviceName: "استشارة طبيب القلب",
        value: 500,
        discountValue: 50,
        discountPercentage: 10,
        net: 450
      },
      {
        id: 2,
        serviceCode: "S002",
        serviceName: "عملية القلب المفتوح",
        value: 12000,
        discountValue: 1200,
        discountPercentage: 10,
        net: 10800
      }
    ],
    items: [
      {
        id: 1,
        code: "I001",
        itemName: "خيوط جراحية",
        quantity: 5,
        value: 200,
        discount: 20,
        discountPercentage: 10,
        unit: "قطعة",
        net: 180
      }
    ],
    radiology: [
      {
        id: 1,
        code: "R001",
        radiologyName: "أشعة سينية للصدر",
        value: 300,
        discount: 30,
        net: 270
      }
    ],
    analysis: [
      {
        id: 1,
        code: "A001",
        analysisName: "تحليل الدم الشامل",
        value: 200,
        discount: 20,
        net: 180
      }
    ],
    specialties: [
      {
        id: 1,
        code: "SP001",
        specialtyName: "جراحة القلب",
        value: 1000,
        discount: 100,
        net: 900
      }
    ]
  },
  {
    id: 2,
    code: "2",
    name: "عمليه استئصال الزائدة",
    anesthesiaType: "تخدير موضعي",
    active: true,
    total: 3000,
    discount: 300,
    net: 2700,
    services: [
      {
        id: 3,
        serviceCode: "S003",
        serviceName: "استشارة طبيب الجراحة",
        value: 200,
        discountValue: 20,
        discountPercentage: 10,
        net: 180
      }
    ],
    items: [],
    radiology: [],
    analysis: [],
    specialties: []
  }
]

// بيانات التبويبات المشتركة
export const tabData = [
  { id: "services", name: "الخدمات" },
  { id: "items", name: "الأصناف" },
  { id: "radiology", name: "الأشعة" },
  { id: "analysis", name: "التحاليل" },
  { id: "specialties", name: "التخصصات" },
]

// بيانات أنواع التخدير
export const anesthesiaTypes = [
  "تخدير كلي",
  "تخدير موضعي",
  "تخدير نصفي",
  "تخدير سطحى",
  "بدون تخدير"
]

// بيانات الخدمات المتاحة
export const availableServices = [
  { code: "S001", name: "استشارة طبيب القلب", value: 500 },
  { code: "S002", name: "عملية القلب المفتوح", value: 12000 },
  { code: "S003", name: "استشارة طبيب الجراحة", value: 200 },
  { code: "S004", name: "عملية استئصال الزائدة", value: 3000 },
  { code: "S005", name: "عملية تنظير البطن", value: 2500 },
]

// بيانات الأصناف المتاحة
export const availableItems = [
  { code: "I001", name: "خيوط جراحية", value: 200, unit: "قطعة" },
  { code: "I002", name: "قفازات طبية", value: 50, unit: "زوج" },
  { code: "I003", name: "ضمادات طبية", value: 30, unit: "قطعة" },
  { code: "I004", name: "محاليل وريدية", value: 150, unit: "زجاجة" },
]

// بيانات الأشعة المتاحة
export const availableRadiology = [
  { code: "R001", name: "أشعة سينية للصدر", value: 300 },
  { code: "R002", name: "أشعة مقطعية للبطن", value: 800 },
  { code: "R003", name: "رنين مغناطيسي للرأس", value: 1200 },
  { code: "R004", name: "أشعة بالموجات فوق الصوتية", value: 400 },
]

// بيانات التحاليل المتاحة
export const availableAnalysis = [
  { code: "A001", name: "تحليل الدم الشامل", value: 200 },
  { code: "A002", name: "تحليل وظائف الكبد", value: 150 },
  { code: "A003", name: "تحليل وظائف الكلى", value: 150 },
  { code: "A004", name: "تحليل السكر", value: 100 },
]

// بيانات التخصصات المتاحة
export const availableSpecialties = [
  { code: "SP001", name: "جراحة القلب", value: 1000 },
  { code: "SP002", name: "جراحة عامة", value: 800 },
  { code: "SP003", name: "جراحة العظام", value: 900 },
  { code: "SP004", name: "جراحة المخ والأعصاب", value: 1500 },
]

// Hook مشترك لإدارة حالة العمليات الطبية
export function useMedicalOperationsController() {
  const [medicalOperations, setMedicalOperations] = useState<MedicalOperation[]>(defaultMedicalOperations)
  const [showOperationDetails, setShowOperationDetails] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState<MedicalOperation | null>(null)
  const [isNewOperation, setIsNewOperation] = useState(false)

  // إنشاء عملية جديدة
  const createNewOperation = (): MedicalOperation => ({
    id: 0,
    code: "",
    name: "",
    anesthesiaType: "",
    active: true,
    total: 0,
    discount: 0,
    net: 0,
    services: [],
    items: [],
    radiology: [],
    analysis: [],
    specialties: []
  })

  // فتح شاشة إضافة عملية جديدة
  const handleNewOperation = () => {
    setSelectedOperation(createNewOperation())
    setShowOperationDetails(true)
    setIsNewOperation(true)
  }

  // فتح شاشة تعديل عملية
  const handleEditOperation = (operation: MedicalOperation) => {
    setSelectedOperation(operation)
    setShowOperationDetails(true)
    setIsNewOperation(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowOperationDetails(false)
    setSelectedOperation(null)
    setIsNewOperation(false)
  }

  // حفظ العملية
  const handleSaveOperation = (operationData: MedicalOperation) => {
    if (isNewOperation) {
      // إضافة عملية جديدة
      const newOperation = {
        ...operationData,
        id: Math.max(...medicalOperations.map(o => o.id)) + 1
      }
      setMedicalOperations([...medicalOperations, newOperation])
    } else {
      // تحديث عملية موجودة
      setMedicalOperations(medicalOperations.map(o => 
        o.id === operationData.id ? operationData : o
      ))
    }
    handleCloseDetails()
  }

  // حذف عملية
  const handleDeleteOperation = (operationId: number) => {
    setMedicalOperations(medicalOperations.filter(o => o.id !== operationId))
  }

  // البحث في العمليات
  const searchOperations = (searchTerm: string) => {
    if (!searchTerm.trim()) return medicalOperations
    
    return medicalOperations.filter(operation =>
      operation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operation.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operation.anesthesiaType.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // حساب الإجماليات
  const calculateTotals = (operation: MedicalOperation) => {
    const servicesTotal = operation.services.reduce((sum, service) => sum + service.value, 0)
    const servicesDiscount = operation.services.reduce((sum, service) => sum + service.discountValue, 0)
    const servicesNet = operation.services.reduce((sum, service) => sum + service.net, 0)

    const itemsTotal = operation.items.reduce((sum, item) => sum + (item.value * item.quantity), 0)
    const itemsDiscount = operation.items.reduce((sum, item) => sum + item.discount, 0)
    const itemsNet = operation.items.reduce((sum, item) => sum + item.net, 0)

    const radiologyTotal = operation.radiology.reduce((sum, rad) => sum + rad.value, 0)
    const radiologyDiscount = operation.radiology.reduce((sum, rad) => sum + rad.discount, 0)
    const radiologyNet = operation.radiology.reduce((sum, rad) => sum + rad.net, 0)

    const analysisTotal = operation.analysis.reduce((sum, ana) => sum + ana.value, 0)
    const analysisDiscount = operation.analysis.reduce((sum, ana) => sum + ana.discount, 0)
    const analysisNet = operation.analysis.reduce((sum, ana) => sum + ana.net, 0)

    const specialtiesTotal = operation.specialties.reduce((sum, spec) => sum + spec.value, 0)
    const specialtiesDiscount = operation.specialties.reduce((sum, spec) => sum + spec.discount, 0)
    const specialtiesNet = operation.specialties.reduce((sum, spec) => sum + spec.net, 0)

    return {
      total: servicesTotal + itemsTotal + radiologyTotal + analysisTotal + specialtiesTotal,
      discount: servicesDiscount + itemsDiscount + radiologyDiscount + analysisDiscount + specialtiesDiscount,
      net: servicesNet + itemsNet + radiologyNet + analysisNet + specialtiesNet
    }
  }

  return {
    medicalOperations,
    showOperationDetails,
    selectedOperation,
    isNewOperation,
    handleNewOperation,
    handleEditOperation,
    handleCloseDetails,
    handleSaveOperation,
    handleDeleteOperation,
    searchOperations,
    calculateTotals,
  }
}

// Utility functions مشتركة
export const medicalOperationUtils = {
  // التحقق من صحة بيانات العملية
  validateOperation: (operation: MedicalOperation): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!operation.name.trim()) errors.push("اسم العملية مطلوب")
    if (!operation.code.trim()) errors.push("كود العملية مطلوب")
    if (!operation.anesthesiaType.trim()) errors.push("نوع التخدير مطلوب")
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // تنسيق الأرقام
  formatNumber: (num: number): string => {
    return num.toFixed(3)
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

// دالة حساب الإجماليات مُصدَّرة
export const calculateTotals = (operation: MedicalOperation) => {
  const servicesTotal = operation.services.reduce((sum, service) => sum + service.value, 0)
  const servicesDiscount = operation.services.reduce((sum, service) => sum + service.discountValue, 0)
  const servicesNet = operation.services.reduce((sum, service) => sum + service.net, 0)

  const itemsTotal = operation.items.reduce((sum, item) => sum + (item.value * item.quantity), 0)
  const itemsDiscount = operation.items.reduce((sum, item) => sum + item.discount, 0)
  const itemsNet = operation.items.reduce((sum, item) => sum + item.net, 0)

  const radiologyTotal = operation.radiology.reduce((sum, rad) => sum + rad.value, 0)
  const radiologyDiscount = operation.radiology.reduce((sum, rad) => sum + rad.discount, 0)
  const radiologyNet = operation.radiology.reduce((sum, rad) => sum + rad.net, 0)

  const analysisTotal = operation.analysis.reduce((sum, ana) => sum + ana.value, 0)
  const analysisDiscount = operation.analysis.reduce((sum, ana) => sum + ana.discount, 0)
  const analysisNet = operation.analysis.reduce((sum, ana) => sum + ana.net, 0)

  const specialtiesTotal = operation.specialties.reduce((sum, spec) => sum + spec.value, 0)
  const specialtiesDiscount = operation.specialties.reduce((sum, spec) => sum + spec.discount, 0)
  const specialtiesNet = operation.specialties.reduce((sum, spec) => sum + spec.net, 0)

  return {
    total: servicesTotal + itemsTotal + radiologyTotal + analysisTotal + specialtiesTotal,
    discount: servicesDiscount + itemsDiscount + radiologyDiscount + analysisDiscount + specialtiesDiscount,
    net: servicesNet + itemsNet + radiologyNet + analysisNet + specialtiesNet
  }
}
