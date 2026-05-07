"use client"

import { useState } from "react"

// Interface مشتركة لبيانات المرافق
export interface Guarantor {
  id: number
  branch: string
  code: number
  name: string
  currentBalance: number
  balanceType: string
  mobile: string
  phone: string
  address: string
  creditLimit: number
  priceCategory: string
  active: boolean
  notes: string
}

// البيانات الافتراضية للمرافق
export const defaultGuarantors: Guarantor[] = [
  {
    id: 1,
    branch: "مكه العمومي",
    code: 1,
    name: "ابوشمس",
    currentBalance: 13288.50,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر المرافق",
    active: true,
    notes: ""
  },
  {
    id: 2,
    branch: "مكه العمومي",
    code: 2,
    name: "ام فيفي",
    currentBalance: 14596.42,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر العروض",
    active: true,
    notes: ""
  },
  {
    id: 3,
    branch: "مكه العمومي",
    code: 3,
    name: "اسلام الماجيك",
    currentBalance: 9400.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر القطع",
    active: true,
    notes: ""
  },
  {
    id: 4,
    branch: "مكه العمومي",
    code: 4,
    name: "اسماء عبد المنعم",
    currentBalance: 4980.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر الشراء",
    active: true,
    notes: ""
  },
  {
    id: 5,
    branch: "مكه العمومي",
    code: 5,
    name: "فتحى عدس",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر المرافق",
    active: true,
    notes: ""
  },
  {
    id: 6,
    branch: "مكه العمومي",
    code: 6,
    name: "احسان",
    currentBalance: 560.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر العروض",
    active: true,
    notes: ""
  },
  {
    id: 7,
    branch: "مكه العمومي",
    code: 7,
    name: "هاله",
    currentBalance: 169603.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر القطع",
    active: true,
    notes: ""
  },
  {
    id: 8,
    branch: "مكه العمومي",
    code: 8,
    name: "ام ابراهيم نوسه",
    currentBalance: 600.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر الشراء",
    active: true,
    notes: ""
  },
  {
    id: 9,
    branch: "مكه العمومي",
    code: 9,
    name: "فاطمه اجا",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر المرافق",
    active: true,
    notes: ""
  },
  {
    id: 10,
    branch: "مكه العمومي",
    code: 10,
    name: "ام نجلا",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر العروض",
    active: true,
    notes: ""
  },
  {
    id: 11,
    branch: "مكه العمومي",
    code: 11,
    name: "صابرين",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر القطع",
    active: true,
    notes: ""
  },
  {
    id: 12,
    branch: "مكه العمومي",
    code: 12,
    name: "ابوميرنا",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر الشراء",
    active: true,
    notes: ""
  },
  {
    id: 13,
    branch: "مكه العمومي",
    code: 13,
    name: "ام مصطفى",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر المرافق",
    active: true,
    notes: ""
  },
  {
    id: 14,
    branch: "مكه العمومي",
    code: 14,
    name: "فرع المحلة محمد وحيد",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر العروض",
    active: true,
    notes: ""
  },
  {
    id: 15,
    branch: "مكه العمومي",
    code: 15,
    name: "اسلام ابوسما",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر القطع",
    active: true,
    notes: ""
  }
]

// بيانات الفروع
export const branches = [
  "مكه العمومي",
  "فرع المحلة",
  "فرع طنطا",
  "فرع الإسكندرية",
  "فرع القاهرة"
]

// بيانات فئات الأسعار
export const priceCategories = [
  "0.00 سعر المرافق",
  "0.00 سعر العروض", 
  "0.00 سعر القطع",
  "0.00 سعر الشراء"
]

// بيانات أنواع الأرصدة
export const balanceTypes = [
  "مدين (عليه)",
  "دائن (له)",
  "صفر"
]

// بيانات القائمة المنسدلة للمرافق
export const guarantorContextMenuItems = [
  {
    section: "القائمة الرئيسية",
    items: [
      { id: "convertToClient", label: "تحويل لعميل", icon: "💰" },
     
    ]
  },
  
]

// Hook مشترك لإدارة حالة المرافق
export function useGuarantorsController() {
  const [guarantors, setGuarantors] = useState<Guarantor[]>(defaultGuarantors)
  const [showGuarantorDetails, setShowGuarantorDetails] = useState(false)
  const [selectedGuarantor, setSelectedGuarantor] = useState<Guarantor | null>(null)
  const [isNewGuarantor, setIsNewGuarantor] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  // إنشاء مرافق جديد
  const createNewGuarantor = (): Guarantor => ({
    id: 0,
    branch: "مكه العمومي",
    code: 0,
    name: "",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر المرافق",
    active: true,
    notes: ""
  })

  // فتح شاشة إضافة مرافق جديد
  const handleNewGuarantor = () => {
    setSelectedGuarantor(createNewGuarantor())
    setShowGuarantorDetails(true)
    setIsNewGuarantor(true)
  }

  // فتح شاشة تعديل مرافق
  const handleEditGuarantor = (guarantor: Guarantor) => {
    setSelectedGuarantor(guarantor)
    setShowGuarantorDetails(true)
    setIsNewGuarantor(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowGuarantorDetails(false)
    setSelectedGuarantor(null)
    setIsNewGuarantor(false)
  }

  // حفظ المرافق
  const handleSaveGuarantor = (guarantorData: Guarantor) => {
    if (isNewGuarantor) {
      // إضافة مرافق جديد
      const newGuarantor = {
        ...guarantorData,
        id: Math.max(...guarantors.map(g => g.id)) + 1,
        code: Math.max(...guarantors.map(g => g.code)) + 1
      }
      setGuarantors([...guarantors, newGuarantor])
    } else {
      // تحديث مرافق موجود
      setGuarantors(guarantors.map(g => 
        g.id === guarantorData.id ? guarantorData : g
      ))
    }
    handleCloseDetails()
  }

  // حذف مرافق
  const handleDeleteGuarantor = (guarantorId: number) => {
    setGuarantors(guarantors.filter(g => g.id !== guarantorId))
  }

  // البحث في المرافق
  const searchGuarantors = (searchTerm: string) => {
    if (!searchTerm.trim()) return guarantors
    
    return guarantors.filter(guarantor =>
      guarantor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guarantor.code.toString().includes(searchTerm) ||
      guarantor.mobile.includes(searchTerm) ||
      guarantor.phone.includes(searchTerm)
    )
  }

  // حساب إجمالي الرصيد الحالي
  const getTotalBalance = () => {
    return guarantors.reduce((total, guarantor) => total + guarantor.currentBalance, 0)
  }

  // فتح القائمة المنسدلة
  const handleOpenContextMenu = (event: React.MouseEvent, guarantor?: Guarantor) => {
    event.preventDefault()
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
    setShowContextMenu(true)
    if (guarantor) {
      setSelectedGuarantor(guarantor)
    }
  }

  // إغلاق القائمة المنسدلة
  const handleCloseContextMenu = () => {
    setShowContextMenu(false)
  }

  // معالجة اختيار عنصر من القائمة المنسدلة
  const handleContextMenuAction = (actionId: string) => {
    console.log(`تم اختيار: ${actionId} للمرافق:`, selectedGuarantor?.name)
    // هنا سيتم إضافة المنطق الخاص بكل إجراء
    handleCloseContextMenu()
  }

  return {
    guarantors,
    showGuarantorDetails,
    selectedGuarantor,
    isNewGuarantor,
    showContextMenu,
    contextMenuPosition,
    createNewGuarantor,
    handleNewGuarantor,
    handleEditGuarantor,
    handleCloseDetails,
    handleSaveGuarantor,
    handleDeleteGuarantor,
    searchGuarantors,
    getTotalBalance,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleContextMenuAction,
  }
}

// Utility functions مشتركة
export const guarantorUtils = {
  // التحقق من صحة بيانات المرافق
  validateGuarantor: (guarantor: Guarantor): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!guarantor.name.trim()) errors.push("اسم المرافق مطلوب")
    if (guarantor.code <= 0) errors.push("كود المرافق مطلوب")
    if (!guarantor.branch.trim()) errors.push("الفرع مطلوب")
    
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

  // تنسيق المبلغ
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('ar-EG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
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
