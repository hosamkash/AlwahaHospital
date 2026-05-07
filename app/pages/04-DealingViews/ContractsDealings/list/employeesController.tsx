"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface ContractDealing {
  id: number
  name: string
  address: string
  phone: string
  manager: string
  status: string
  active: boolean
  salesCategory: boolean
  code: string
  belongsTo: string
  email: string
  mobile: string
  fax: string
  website: string
  shortNumber: string
  taxRegistrationNumber: string
  taxCardNumber: string
  affiliatedAuthority: string
  taxpayerName: string
  taxpayerAddress: string
  fileNumber: string
  activity: string
  establishmentNumber: string
  establishmentSector: string
  activityStartDate: string
  cardIssuanceDate: string
  insuranceDate: string
  insuranceNumber: string
  reportHeader: string
  reportFooter: string
  watermark: string
  selectedPriceLists: number[]
}

// البيانات الافتراضية لجهات التعاقد
export const defaultContractDealings: ContractDealing[] = [
  {
    id: 1,
    name: "شركة الخدمات الطبية المتقدمة",
    address: "شارع النيل، القاهرة الجديدة",
    phone: "+20225741234",
    manager: "أحمد محمد",
    status: "نشط",
    active: true,
    salesCategory: true,
    code: "CD001",
    belongsTo: "جهات التعاقد",
    email: "info@medicalservices.com",
    mobile: "01012345678",
    fax: "+20225741235",
    website: "www.medicalservices.com",
    shortNumber: "1234",
    taxRegistrationNumber: "123456789",
    taxCardNumber: "987654321",
    affiliatedAuthority: "وزارة الصحة",
    taxpayerName: "شركة الخدمات الطبية المتقدمة",
    taxpayerAddress: "شارع النيل، القاهرة الجديدة",
    fileNumber: "FN001",
    activity: "الخدمات الطبية",
    establishmentNumber: "EN001",
    establishmentSector: "القطاع الصحي",
    activityStartDate: "2024-01-01",
    cardIssuanceDate: "2024-01-01",
    insuranceDate: "2024-01-01",
    insuranceNumber: "INS001",
         reportHeader: "شركة الخدمات الطبية المتقدمة",
     reportFooter: "جميع الحقوق محفوظة",
     watermark: "FOR PEER REVIEW ONLY",
     selectedPriceLists: [1, 3, 4],
   },
  {
    id: 2,
    name: "مؤسسة الرعاية الصحية",
    address: "شارع رمسيس، القاهرة",
    phone: "+20225781234",
    manager: "سارة أحمد",
    status: "نشط",
    active: true,
    salesCategory: true,
    code: "CD002",
    belongsTo: "جهات التعاقد",
    email: "contact@healthcare.org",
    mobile: "01098765432",
    fax: "+20225781235",
    website: "www.healthcare.org",
    shortNumber: "5678",
    taxRegistrationNumber: "987654321",
    taxCardNumber: "123456789",
    affiliatedAuthority: "وزارة الصحة",
    taxpayerName: "مؤسسة الرعاية الصحية",
    taxpayerAddress: "شارع رمسيس، القاهرة",
    fileNumber: "FN002",
    activity: "الرعاية الصحية",
    establishmentNumber: "EN002",
    establishmentSector: "القطاع الصحي",
    activityStartDate: "2024-03-01",
    cardIssuanceDate: "2024-03-01",
    insuranceDate: "2024-03-01",
    insuranceNumber: "INS002",
         reportHeader: "مؤسسة الرعاية الصحية",
     reportFooter: "جميع الحقوق محفوظة",
     watermark: "FOR PEER REVIEW ONLY",
     selectedPriceLists: [2, 4, 6],
   },
  {
    id: 3,
    name: "شركة الأدوية العالمية",
    address: "شارع التحرير، القاهرة",
    phone: "+20225791234",
    manager: "محمد علي",
    status: "غير نشط",
    active: false,
    salesCategory: false,
    code: "CD003",
    belongsTo: "جهات التعاقد",
    email: "info@globalpharma.com",
    mobile: "01055556666",
    fax: "+20225791235",
    website: "www.globalpharma.com",
    shortNumber: "9012",
    taxRegistrationNumber: "555666777",
    taxCardNumber: "777666555",
    affiliatedAuthority: "وزارة الصحة",
    taxpayerName: "شركة الأدوية العالمية",
    taxpayerAddress: "شارع التحرير، القاهرة",
    fileNumber: "FN003",
    activity: "الأدوية",
    establishmentNumber: "EN003",
    establishmentSector: "القطاع الصحي",
    activityStartDate: "2024-06-01",
    cardIssuanceDate: "2024-06-01",
    insuranceDate: "2024-06-01",
    insuranceNumber: "INS003",
         reportHeader: "شركة الأدوية العالمية",
     reportFooter: "جميع الحقوق محفوظة",
     watermark: "FOR PEER REVIEW ONLY",
     selectedPriceLists: [1, 5],
   },
]

// بيانات التبويبات المشتركة
export const tabData = [
  { id: "general", name: "البيانات العامة" },
  { id: "pricelists", name: "قوائم الأسعار" },
]

// بيانات مديري الشركة
export const companyManagers = [
  "أحمد محمد",
  "سارة أحمد",
  "محمد علي",
  "فاطمة محمود",
  "علي حسن",
]

// بيانات قوائم الأسعار المتاحة
export const availablePriceLists = [
  { id: 1, name: "قائمة الأسعار الأساسية", code: "BASIC" },
  { id: 2, name: "قائمة الأسعار المميزة", code: "PREMIUM" },
  { id: 3, name: "قائمة الأسعار للشركات", code: "CORPORATE" },
  { id: 4, name: "قائمة الأسعار للتعاقدات", code: "CONTRACT" },
  { id: 5, name: "قائمة الأسعار للطلاب", code: "STUDENT" },
  { id: 6, name: "قائمة الأسعار للموظفين", code: "EMPLOYEE" },
  { id: 7, name: "قائمة الأسعار للكبار", code: "SENIOR" },
  { id: 8, name: "قائمة الأسعار للأطفال", code: "CHILD" },
]

// بيانات الحقول العامة
export const generalFields = [
  { label: "الهاتف", value: "phone", icon: "📞" },
  { label: "الموبيل", value: "mobile", icon: "📱" },
  { label: "الفاكس", value: "fax", icon: "📠" },
  { label: "البريد الالكتروني", value: "email", icon: "📧" },
  { label: "الموقع", value: "website", icon: "🌐" },
  { label: "الرقم المختصر", value: "shortNumber", icon: "🔢" },
  { label: "رقم التسجيل الضريبي", value: "taxRegistrationNumber" },
  { label: "رقم البطاقة الضريبية", value: "taxCardNumber" },
  { label: "المأمورية التابع لها", value: "affiliatedAuthority" },
  { label: "إسم الممول", value: "taxpayerName" },
  { label: "عنوان الممول", value: "taxpayerAddress" },
  { label: "رقم الملف", value: "fileNumber" },
  { label: "النشاط", value: "activity" },
  { label: "رقم المنشأة", value: "establishmentNumber" },
  { label: "قطاع المنشأة", value: "establishmentSector" },
]



// Hook مشترك لإدارة حالة جهات التعاقد
export function useContractsDealingsController() {
  const [contractDealings, setContractDealings] = useState<ContractDealing[]>(defaultContractDealings)
  const [showContractDealingDetails, setShowContractDealingDetails] = useState(false)
  const [selectedContractDealing, setSelectedContractDealing] = useState<ContractDealing | null>(null)
  const [isNewContractDealing, setIsNewContractDealing] = useState(false)

  // إنشاء جهة تعاقد جديدة
  const createNewContractDealing = (): ContractDealing => ({
    id: 0,
    name: "",
    address: "",
    phone: "",
    manager: "",
    status: "نشط",
    active: true,
    salesCategory: true,
    code: "",
    belongsTo: "جهات التعاقد",
    email: "",
    mobile: "",
    fax: "",
    website: "",
    shortNumber: "",
    taxRegistrationNumber: "",
    taxCardNumber: "",
    affiliatedAuthority: "",
    taxpayerName: "",
    taxpayerAddress: "",
    fileNumber: "",
    activity: "",
    establishmentNumber: "",
    establishmentSector: "",
    activityStartDate: "",
    cardIssuanceDate: "",
    insuranceDate: "",
    insuranceNumber: "",
         reportHeader: "",
     reportFooter: "",
     watermark: "",
     selectedPriceLists: [],
   })

  // فتح شاشة إضافة جهة تعاقد جديدة
  const handleNewContractDealing = () => {
    setSelectedContractDealing(createNewContractDealing())
    setShowContractDealingDetails(true)
    setIsNewContractDealing(true)
  }

  // فتح شاشة تعديل جهة تعاقد
  const handleEditContractDealing = (contractDealing: ContractDealing) => {
    setSelectedContractDealing(contractDealing)
    setShowContractDealingDetails(true)
    setIsNewContractDealing(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowContractDealingDetails(false)
    setSelectedContractDealing(null)
    setIsNewContractDealing(false)
  }

  // حفظ جهة التعاقد
  const handleSaveContractDealing = (contractDealingData: ContractDealing) => {
    if (isNewContractDealing) {
      // إضافة جهة تعاقد جديدة
      const newContractDealing = {
        ...contractDealingData,
        id: Math.max(...contractDealings.map(c => c.id)) + 1
      }
      setContractDealings([...contractDealings, newContractDealing])
    } else {
      // تحديث جهة تعاقد موجودة
      setContractDealings(contractDealings.map(c => 
        c.id === contractDealingData.id ? contractDealingData : c
      ))
    }
    handleCloseDetails()
  }

  // حذف جهة تعاقد
  const handleDeleteContractDealing = (contractDealingId: number) => {
    setContractDealings(contractDealings.filter(c => c.id !== contractDealingId))
  }

  // البحث في جهات التعاقد
  const searchContractDealings = (searchTerm: string) => {
    if (!searchTerm.trim()) return contractDealings
    
    return contractDealings.filter(contractDealing =>
      contractDealing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractDealing.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractDealing.manager.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    contractDealings,
    showContractDealingDetails,
    selectedContractDealing,
    isNewContractDealing,
    handleNewContractDealing,
    handleEditContractDealing,
    handleCloseDetails,
    handleSaveContractDealing,
    handleDeleteContractDealing,
    searchContractDealings,
  }
}

// Utility functions مشتركة
export const contractDealingUtils = {
  // التحقق من صحة بيانات جهة التعاقد
  validateContractDealing: (contractDealing: ContractDealing): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!contractDealing.name.trim()) errors.push("اسم جهة التعاقد مطلوب")
    if (!contractDealing.code.trim()) errors.push("كود جهة التعاقد مطلوب")
    if (!contractDealing.phone.trim()) errors.push("رقم الهاتف مطلوب")
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // تنسيق رقم الهاتف
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 11 && cleaned.startsWith('01')) {
      return `+20${cleaned}`
    }
    return phone
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
