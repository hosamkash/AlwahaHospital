"use client"

import { useState } from "react"

// Interface مشتركة لبيانات المورد
export interface Vendor {
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

// البيانات الافتراضية للموردين
export const defaultVendors: Vendor[] = [
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
    priceCategory: "0.00 سعر الموردين",
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
    priceCategory: "0.00 سعر الموردين",
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
    priceCategory: "0.00 سعر الموردين",
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
    priceCategory: "0.00 سعر الموردين",
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
  "0.00 سعر الموردين",
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

// بيانات القائمة المنسدلة للمورد
export const vendorContextMenuItems = [
  {
    section: "سندات القبض والدفع",
    items: [
      { id: "quick-receipt", label: "سند قبض سريع", icon: "💰" },
      { id: "view-receipts", label: "عرض سندات القبض", icon: "📋" },
      { id: "quick-payment", label: "سند دفع سريع", icon: "💸" },
      { id: "view-payments", label: "عرض سندات الدفع", icon: "📄" }
    ]
  },
  {
    section: "المشتريات والمرتجعات",
    items: [
      { id: "new-sales-invoice", label: "فاتورة مشتريات جديدة", icon: "🛒" },
      { id: "view-sales-invoices", label: "عرض فواتير المشتريات", icon: "📊" },
      { id: "new-return-invoice", label: "فاتورة مرتجع جديدة", icon: "↩️" },
      { id: "view-sales-returns", label: "عرض مرتجعات المشتريات", icon: "📈" }
    ]
  },
  {
    section: "المستندات المالية والحسابات",
    items: [
      { id: "link-documents", label: "ربط المستندات بالنقدية", icon: "🔗" },
      { id: "account-statement", label: "كشف الحساب", icon: "📋" }
    ]
  },
  {
    section: "الشيكات",
    items: [
      { id: "outgoing-checks", label: "الشيكات الصادرة - الدفع", icon: "💳" },
      { id: "incoming-checks", label: "الشيكات الواردة - القبض", icon: "💳" }
    ]
  },
 
]

// Hook مشترك لإدارة حالة الموردين
export function useVendorsController() {
  const [vendors, setVendors] = useState<Vendor[]>(defaultVendors)
  const [showVendorDetails, setShowVendorDetails] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [isNewVendor, setIsNewVendor] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  // إنشاء مورد جديد
  const createNewVendor = (): Vendor => ({
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
    priceCategory: "0.00 سعر الموردين",
    active: true,
    notes: ""
  })

  // فتح شاشة إضافة مورد جديد
  const handleNewVendor = () => {
    setSelectedVendor(createNewVendor())
    setShowVendorDetails(true)
    setIsNewVendor(true)
  }

  // فتح شاشة تعديل مورد
  const handleEditVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    setShowVendorDetails(true)
    setIsNewVendor(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowVendorDetails(false)
    setSelectedVendor(null)
    setIsNewVendor(false)
  }

  // حفظ المورد
  const handleSaveVendor = (vendorData: Vendor) => {
    if (isNewVendor) {
      // إضافة مورد جديد
      const newVendor = {
        ...vendorData,
        id: Math.max(...vendors.map(v => v.id)) + 1,
        code: Math.max(...vendors.map(v => v.code)) + 1
      }
      setVendors([...vendors, newVendor])
    } else {
      // تحديث مورد موجود
      setVendors(vendors.map(v => 
        v.id === vendorData.id ? vendorData : v
      ))
    }
    handleCloseDetails()
  }

  // حذف مورد
  const handleDeleteVendor = (vendorId: number) => {
    setVendors(vendors.filter(v => v.id !== vendorId))
  }

  // البحث في الموردين
  const searchVendors = (searchTerm: string) => {
    if (!searchTerm.trim()) return vendors
    
    return vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.code.toString().includes(searchTerm) ||
      vendor.mobile.includes(searchTerm) ||
      vendor.phone.includes(searchTerm)
    )
  }

  // حساب إجمالي الرصيد الحالي
  const getTotalBalance = () => {
    return vendors.reduce((total, vendor) => total + vendor.currentBalance, 0)
  }

  // فتح القائمة المنسدلة
  const handleOpenContextMenu = (event: React.MouseEvent, vendor?: Vendor) => {
    event.preventDefault()
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
    setShowContextMenu(true)
    if (vendor) {
      setSelectedVendor(vendor)
    }
  }

  // إغلاق القائمة المنسدلة
  const handleCloseContextMenu = () => {
    setShowContextMenu(false)
  }

  // معالجة اختيار عنصر من القائمة المنسدلة
  const handleContextMenuAction = (actionId: string) => {
    console.log(`تم اختيار: ${actionId} للمورد:`, selectedVendor?.name)
    // هنا سيتم إضافة المنطق الخاص بكل إجراء
    handleCloseContextMenu()
  }

  return {
    vendors,
    showVendorDetails,
    selectedVendor,
    isNewVendor,
    showContextMenu,
    contextMenuPosition,
    createNewVendor,
    handleNewVendor,
    handleEditVendor,
    handleCloseDetails,
    handleSaveVendor,
    handleDeleteVendor,
    searchVendors,
    getTotalBalance,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleContextMenuAction,
  }
}

// Utility functions مشتركة
export const vendorUtils = {
  // التحقق من صحة بيانات المورد
  validateVendor: (vendor: Vendor): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!vendor.name.trim()) errors.push("اسم المورد مطلوب")
    if (vendor.code <= 0) errors.push("كود المورد مطلوب")
    if (!vendor.branch.trim()) errors.push("الفرع مطلوب")
    
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
