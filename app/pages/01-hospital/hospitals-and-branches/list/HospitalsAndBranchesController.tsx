"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface Hospital {
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
}

// البيانات الافتراضية للمستشفيات
export const defaultHospitals: Hospital[] = [
  {
    id: 1,
    name: "معامل قش للتحاليل الطبية",
    address: "kkkkk",
    phone: "0402968283",
    manager: "سامح قش",
    status: "نشط",
    active: true,
    salesCategory: true,
    code: "1",
    belongsTo: "فروع مستشفى الواحة",
    email: "",
    mobile: "010234567898",
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
    activityStartDate: "23/11/2011",
    cardIssuanceDate: "23/11/2011",
    insuranceDate: "",
    insuranceNumber: "",
    reportHeader: "معامل قش للتحاليل الطبية-فروع مستشفى الواحة",
    reportFooter: "المحلة الكبرى - برج الدلتا - موقف طلعت حرب 040/2222829\nسمنود ش السوق مول حمام\nأجا ش الجلاء - بجوار أجاميلكو\nميت عساس عمارة أبو زينة أمام الموقف\n040/2968283\n050/6440009\n040/2885331",
    watermark: "FOR PEER REVIEW ONLY",
  },
  {
    id: 2,
    name: "مستشفى الواحة التخصصي - فرع المحلة",
    address: "محافظة الغربية، مدينة المحلة الكبرى",
    phone: "+204022123456",
    manager: "د. سارة أحمد",
    status: "نشط",
    active: true,
    salesCategory: true,
    code: "2",
    belongsTo: "فروع مستشفى الواحة",
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
  },
  {
    id: 3,
    name: "مستشفى الواحة التخصصي - فرع طنطا",
    address: "محافظة الغربية، مدينة طنطا",
    phone: "+204034567890",
    manager: "د. محمد علي",
    status: "غير نشط",
    active: false,
    salesCategory: false,
    code: "3",
    belongsTo: "فروع مستشفى الواحة",
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
  },
]

// بيانات التبويبات المشتركة
export const tabData = [
  { id: "contact", name: "بيانات الإتصال" },
  { id: "license", name: "بيانات الترخيص" },
  { id: "insurance", name: "البيانات التأمينية" },
]

// بيانات مديري الشركة
export const companyManagers = [
  "محمود على",
  "د. سارة أحمد",
  "د. محمد علي",
  "د. أحمد حسن",
  "د. فاطمة محمود",
]

// بيانات حقول الاتصال
export const contactFields = [
  { label: "الهاتف", value: "phone", icon: "📞" },
  { label: "الموبيل", value: "mobile", icon: "📱" },
  { label: "الفاكس", value: "fax", icon: "📠" },
  { label: "البريد الالكتروني", value: "email", icon: "📧" },
  { label: "الموقع", value: "website", icon: "🌐" },
  { label: "الرقم المختصر", value: "shortNumber", icon: "🔢" },
]

// بيانات حقول الترخيص
export const licenseFields = [
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

// Hook مشترك لإدارة حالة المستشفيات
export function useHospitalsController() {
  const [hospitals, setHospitals] = useState<Hospital[]>(defaultHospitals)
  const [showHospitalDetails, setShowHospitalDetails] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [isNewHospital, setIsNewHospital] = useState(false)

  // إنشاء مستشفى جديد
  const createNewHospital = (): Hospital => ({
    id: 0,
    name: "",
    address: "",
    phone: "",
    manager: "",
    status: "نشط",
    active: true,
    salesCategory: true,
    code: "",
    belongsTo: "فروع مستشفى الواحة",
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
  })

  // فتح شاشة إضافة مستشفى جديد
  const handleNewHospital = () => {
    setSelectedHospital(createNewHospital())
    setShowHospitalDetails(true)
    setIsNewHospital(true)
  }

  // فتح شاشة تعديل مستشفى
  const handleEditHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital)
    setShowHospitalDetails(true)
    setIsNewHospital(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowHospitalDetails(false)
    setSelectedHospital(null)
    setIsNewHospital(false)
  }

  // حفظ المستشفى
  const handleSaveHospital = (hospitalData: Hospital) => {
    if (isNewHospital) {
      // إضافة مستشفى جديد
      const newHospital = {
        ...hospitalData,
        id: Math.max(...hospitals.map(h => h.id)) + 1
      }
      setHospitals([...hospitals, newHospital])
    } else {
      // تحديث مستشفى موجود
      setHospitals(hospitals.map(h => 
        h.id === hospitalData.id ? hospitalData : h
      ))
    }
    handleCloseDetails()
  }

  // حذف مستشفى
  const handleDeleteHospital = (hospitalId: number) => {
    setHospitals(hospitals.filter(h => h.id !== hospitalId))
  }

  // البحث في المستشفيات
  const searchHospitals = (searchTerm: string) => {
    if (!searchTerm.trim()) return hospitals
    
    return hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.manager.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    hospitals,
    showHospitalDetails,
    selectedHospital,
    isNewHospital,
    handleNewHospital,
    handleEditHospital,
    handleCloseDetails,
    handleSaveHospital,
    handleDeleteHospital,
    searchHospitals,
  }
}

// Utility functions مشتركة
export const hospitalUtils = {
  // التحقق من صحة بيانات المستشفى
  validateHospital: (hospital: Hospital): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!hospital.name.trim()) errors.push("اسم المستشفى مطلوب")
    if (!hospital.code.trim()) errors.push("كود المستشفى مطلوب")
    if (!hospital.phone.trim()) errors.push("رقم الهاتف مطلوب")
    
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