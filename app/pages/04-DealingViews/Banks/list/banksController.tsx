"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface Bank {
  id: number
  name: string
  code: string
  address: string
  phone: string
  manager: string
  status: string
  active: boolean
  email: string
  mobile: string
  fax: string
  website: string
  swiftCode: string
  iban: string
  accountNumber: string
  branchCode: string
  bankType: string
  centralBankCode: string
}

// البيانات الافتراضية للبنوك
export const defaultBanks: Bank[] = [
  {
    id: 1,
    name: "البنك الأهلي المصري",
    code: "BNK001",
    address: "شارع رمسيس، القاهرة",
    phone: "+20225741234",
    manager: "أحمد محمد",
    status: "نشط",
    active: true,
    email: "info@nbe.com.eg",
    mobile: "01012345678",
    fax: "+20225741235",
    website: "www.nbe.com.eg",
    swiftCode: "NBEGEGCX",
    iban: "EG380001000000000000000000",
    accountNumber: "1234567890",
    branchCode: "001",
    bankType: "تجاري",
    centralBankCode: "CBE001",
  },
  {
    id: 2,
    name: "بنك مصر",
    code: "BNK002",
    address: "شارع محمد فريد، القاهرة",
    phone: "+20225781234",
    manager: "سارة أحمد",
    status: "نشط",
    active: true,
    email: "info@banquemisr.com.eg",
    mobile: "01098765432",
    fax: "+20225781235",
    website: "www.banquemisr.com.eg",
    swiftCode: "BMISEGCX",
    iban: "EG380002000000000000000000",
    accountNumber: "0987654321",
    branchCode: "002",
    bankType: "تجاري",
    centralBankCode: "CBE002",
  },
  {
    id: 3,
    name: "البنك التجاري الدولي",
    code: "BNK003",
    address: "شارع التحرير، القاهرة",
    phone: "+20225791234",
    manager: "محمد علي",
    status: "غير نشط",
    active: false,
    email: "info@cibeg.com",
    mobile: "01055556666",
    fax: "+20225791235",
    website: "www.cibeg.com",
    swiftCode: "CIBEEGCX",
    iban: "EG380003000000000000000000",
    accountNumber: "1122334455",
    branchCode: "003",
    bankType: "تجاري",
    centralBankCode: "CBE003",
  },
]

// بيانات التبويبات المشتركة
export const tabData = [
  { id: "contact", name: "بيانات الإتصال" },
  { id: "banking", name: "البيانات المصرفية" },
]

// بيانات أنواع البنوك
export const bankTypes = [
  "تجاري",
  "استثماري",
  "توفير",
  "تنموي",
  "إسلامي",
]

// بيانات مديري البنوك
export const bankManagers = [
  "أحمد محمد",
  "سارة أحمد",
  "محمد علي",
  "فاطمة حسن",
  "علي محمود",
]

// بيانات حقول الاتصال
export const contactFields = [
  { label: "الهاتف", value: "phone", icon: "📞" },
  { label: "الموبيل", value: "mobile", icon: "📱" },
  { label: "الفاكس", value: "fax", icon: "📠" },
  { label: "البريد الالكتروني", value: "email", icon: "📧" },
  { label: "الموقع", value: "website", icon: "🌐" },
]

// بيانات حقول البنك
export const bankingFields = [
  { label: "رمز SWIFT", value: "swiftCode" },
  { label: "رقم IBAN", value: "iban" },
  { label: "رقم الحساب", value: "accountNumber" },
  { label: "رمز الفرع", value: "branchCode" },
  { label: "رمز البنك المركزي", value: "centralBankCode" },
]


// Hook مشترك لإدارة حالة البنوك
export function useBanksController() {
  const [banks, setBanks] = useState<Bank[]>(defaultBanks)
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [isNewBank, setIsNewBank] = useState(false)

  // إنشاء بنك جديد
  const createNewBank = (): Bank => ({
    id: 0,
    name: "",
    code: "",
    address: "",
    phone: "",
    manager: "",
    status: "نشط",
    active: true,
    email: "",
    mobile: "",
    fax: "",
    website: "",
    swiftCode: "",
    iban: "",
    accountNumber: "",
    branchCode: "",
    bankType: "تجاري",
    centralBankCode: "",
  })

  // فتح شاشة إضافة بنك جديد
  const handleNewBank = () => {
    setSelectedBank(createNewBank())
    setShowBankDetails(true)
    setIsNewBank(true)
  }

  // فتح شاشة تعديل بنك
  const handleEditBank = (bank: Bank) => {
    setSelectedBank(bank)
    setShowBankDetails(true)
    setIsNewBank(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowBankDetails(false)
    setSelectedBank(null)
    setIsNewBank(false)
  }

  // حفظ البنك
  const handleSaveBank = (bankData: Bank) => {
    if (isNewBank) {
      // إضافة بنك جديد
      const newBank = {
        ...bankData,
        id: Math.max(...banks.map(b => b.id)) + 1
      }
      setBanks([...banks, newBank])
    } else {
      // تحديث بنك موجود
      setBanks(banks.map(b => 
        b.id === bankData.id ? bankData : b
      ))
    }
    handleCloseDetails()
  }

  // حذف بنك
  const handleDeleteBank = (bankId: number) => {
    setBanks(banks.filter(b => b.id !== bankId))
  }

  // البحث في البنوك
  const searchBanks = (searchTerm: string) => {
    if (!searchTerm.trim()) return banks
    
    return banks.filter(bank =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.manager.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    banks,
    showBankDetails,
    selectedBank,
    isNewBank,
    createNewBank,
    handleNewBank,
    handleEditBank,
    handleCloseDetails,
    handleSaveBank,
    handleDeleteBank,
    searchBanks,
  }
}

// Utility functions مشتركة
export const bankUtils = {
  // التحقق من صحة بيانات البنك
  validateBank: (bank: Bank): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!bank.name.trim()) errors.push("اسم البنك مطلوب")
    if (!bank.code.trim()) errors.push("كود البنك مطلوب")
    if (!bank.phone.trim()) errors.push("رقم الهاتف مطلوب")
    
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
  },

  // التحقق من صحة رقم IBAN
  validateIBAN: (iban: string): boolean => {
    return iban.length >= 20 && iban.length <= 34
  },

  // التحقق من صحة رمز SWIFT
  validateSWIFT: (swift: string): boolean => {
    return swift.length === 8 || swift.length === 11
  }
}
