"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface Employee {
  id: number
  name: string
  code: string
  type: string
  address: string
  phone: string
  mobile: string
  email: string
  nationalId: string
  birthDate: string
  hireDate: string
  department: string
  position: string
  salary: number
  status: string
  active: boolean
  personalData: {
    maritalStatus: string
    children: number
    emergencyContact: string
    emergencyPhone: string
    militaryStatus: string
    religion: string
  }
  jobData: {
    jobTitle: string
    workLocation: string
    employmentType: string
    probationPeriod: string
  }
  attendanceData: {
    workSchedule: string
    workStartTime: string
    workEndTime: string
    workHours: string
    attendanceRate: number
    lateDays: number
    absentDays: number
  }
  salaryData: {
    basicSalary: number
    allowances: number
    deductions: number
    netSalary: number
    bankAccount: string
  }
  vacationData: {
    annualLeave: number
    sickLeave: number
    emergencyLeave: number
    usedLeave: number
    remainingLeave: number
  }
  workSchedule: {
    workDays: string[]
    breakTime: string
    overtime: boolean
  }
  qualifications: {
    education: string
    certificates: string[]
    skills: string[]
    languages: string[]
    previousJobs: string[]
    trainingCourses: string[]
    achievements: string[]
  }
  experience: {
    // تم نقل البيانات إلى qualifications
  }
  appointment: {
    justification: string
    documents: string[]
    approvalStatus: string
  }
  advances: {
    totalAdvances: number
    paidAdvances: number
    remainingAdvances: number
    advanceHistory: string[]
  }
  covenants: {
    totalCovenants: number
    returnedCovenants: number
    remainingCovenants: number
    covenantHistory: string[]
  }
  attendanceRecord: {
    monthlyAttendance: string[]
    lateRecords: string[]
    absentRecords: string[]
  }
  withdrawals: {
    totalWithdrawals: number
    withdrawalHistory: string[]
  }
  bonuses: {
    totalBonuses: number
    bonusHistory: string[]
  }
  penalties: {
    totalPenalties: number
    penaltyHistory: string[]
  }
  discounts: {
    totalDiscounts: number
    discountHistory: string[]
  }
}

// البيانات الافتراضية للموظفين
export const defaultEmployees: Employee[] = [
  {
    id: 1,
    name: "أحمد محمد علي",
    code: "EMP001",
    type: "موظف دائم",
    address: "شارع رمسيس، القاهرة",
    phone: "+20225741234",
    mobile: "01012345678",
    email: "ahmed.ali@hospital.com",
    nationalId: "12345678901234",
    birthDate: "1985-03-15",
    hireDate: "2020-01-01",
    department: "قسم الموارد البشرية",
    position: "مدير الموارد البشرية",
    salary: 8000,
    status: "نشط",
    active: true,
    personalData: {
      maritalStatus: "متزوج",
      children: 2,
      emergencyContact: "سارة أحمد",
      emergencyPhone: "01098765432",
      militaryStatus: "مكتمل الخدمة",
      religion: "مسلم"
    },
    jobData: {
      jobTitle: "مدير الموارد البشرية",
      workLocation: "المقر الرئيسي",
      employmentType: "دوام كامل",
      probationPeriod: "3 أشهر"
    },
    attendanceData: {
      workSchedule: "الأحد - الخميس: 8 ص - 4 م",
      workStartTime: "08:00",
      workEndTime: "16:00",
      workHours: "8 ساعات",
      attendanceRate: 95,
      lateDays: 2,
      absentDays: 1
    },
    salaryData: {
      basicSalary: 6000,
      allowances: 2000,
      deductions: 500,
      netSalary: 7500,
      bankAccount: "1234567890"
    },
    vacationData: {
      annualLeave: 21,
      sickLeave: 10,
      emergencyLeave: 5,
      usedLeave: 8,
      remainingLeave: 13
    },
    workSchedule: {
      workDays: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"],
      breakTime: "ساعة واحدة",
      overtime: true
    },
    qualifications: {
      education: "بكالوريوس إدارة أعمال",
      certificates: ["شهادة إدارة الموارد البشرية", "شهادة السلامة المهنية"],
      skills: ["إدارة الفرق", "التواصل الفعال", "حل المشكلات"],
      languages: ["العربية", "الإنجليزية"],
      previousJobs: ["مدير شؤون الموظفين - شركة ABC", "مشرف موارد بشرية - شركة XYZ"],
      trainingCourses: ["دورة إدارة الأداء", "دورة التوظيف والاختيار"],
      achievements: ["تحسين معدل رضا الموظفين بنسبة 20%", "تقليل معدل دوران العمالة بنسبة 15%"]
    },
    experience: {
      previousJobs: ["مدير شؤون الموظفين - شركة ABC", "مشرف موارد بشرية - شركة XYZ"],
      trainingCourses: ["دورة إدارة الأداء", "دورة التوظيف والاختيار"],
      achievements: ["تحسين معدل رضا الموظفين بنسبة 20%", "تقليل معدل دوران العمالة بنسبة 15%"]
    },
    appointment: {
      justification: "حاجة ماسة لخبرة في إدارة الموارد البشرية",
      documents: ["السيرة الذاتية", "شهادات الخبرة", "المراجع"],
      approvalStatus: "موافق عليه"
    },
    advances: {
      totalAdvances: 5000,
      paidAdvances: 3000,
      remainingAdvances: 2000,
      advanceHistory: ["2023-01-15: 2000 جنيه", "2023-06-20: 3000 جنيه"]
    },
    covenants: {
      totalCovenants: 3000,
      returnedCovenants: 2000,
      remainingCovenants: 1000,
      covenantHistory: ["2023-02-10: لابتوب 3000 جنيه", "2023-08-15: إرجاع 2000 جنيه"]
    },
    attendanceRecord: {
      monthlyAttendance: ["2024-01-01: حاضر", "2024-01-02: حاضر", "2024-01-03: متأخر"],
      lateRecords: ["2024-01-03: متأخر 15 دقيقة", "2024-01-10: متأخر 10 دقائق"],
      absentRecords: ["2024-01-15: غياب بسبب مرض"]
    },
    withdrawals: {
      totalWithdrawals: 1500,
      withdrawalHistory: ["2024-01-05: 500 جنيه", "2024-01-20: 1000 جنيه"]
    },
    bonuses: {
      totalBonuses: 3000,
      bonusHistory: ["2023-12-31: مكافأة نهاية السنة 3000 جنيه"]
    },
    penalties: {
      totalPenalties: 200,
      penaltyHistory: ["2024-01-03: تأخير 200 جنيه"]
    },
    discounts: {
      totalDiscounts: 500,
      discountHistory: ["2024-01-15: خصم تأمين صحي 500 جنيه"]
    }
  },
  {
    id: 2,
    name: "سارة أحمد حسن",
    code: "EMP002",
    type: "موظف مؤقت",
    address: "شارع محمد فريد، القاهرة",
    phone: "+20225781234",
    mobile: "01098765432",
    email: "sara.hassan@hospital.com",
    nationalId: "98765432109876",
    birthDate: "1990-07-22",
    hireDate: "2021-03-01",
    department: "قسم المحاسبة",
    position: "محاسب",
    salary: 5000,
    status: "نشط",
    active: true,
    personalData: {
      maritalStatus: "عزباء",
      children: 0,
      emergencyContact: "أحمد حسن",
      emergencyPhone: "01055556666",
      militaryStatus: "معفى",
      religion: "مسلم"
    },
    jobData: {
      jobTitle: "محاسب",
      workLocation: "المقر الرئيسي",
      employmentType: "دوام كامل",
      probationPeriod: "6 أشهر"
    },
    attendanceData: {
      workSchedule: "الأحد - الخميس: 9 ص - 5 م",
      workStartTime: "09:00",
      workEndTime: "17:00",
      workHours: "8 ساعات",
      attendanceRate: 98,
      lateDays: 1,
      absentDays: 0
    },
    salaryData: {
      basicSalary: 4000,
      allowances: 1000,
      deductions: 300,
      netSalary: 4700,
      bankAccount: "0987654321"
    },
    vacationData: {
      annualLeave: 21,
      sickLeave: 10,
      emergencyLeave: 5,
      usedLeave: 5,
      remainingLeave: 16
    },
         workSchedule: {
       workDays: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"],
       breakTime: "ساعة واحدة",
       overtime: false
     },
         qualifications: {
       education: "بكالوريوس محاسبة",
       certificates: ["شهادة محاسب قانوني", "شهادة برنامج SAP"],
       skills: ["إعداد التقارير المالية", "المراجعة المحاسبية", "برامج المحاسبة"],
       languages: ["العربية", "الإنجليزية"],
       previousJobs: ["محاسب - مكتب محاسبة ABC", "مساعد محاسب - شركة XYZ"],
       trainingCourses: ["دورة المحاسبة الإلكترونية", "دورة الضرائب"],
       achievements: ["تحسين دقة التقارير المالية", "تقليل وقت إعداد الميزانية"]
     },
    experience: {
      previousJobs: ["محاسب - مكتب محاسبة ABC", "مساعد محاسب - شركة XYZ"],
      trainingCourses: ["دورة المحاسبة الإلكترونية", "دورة الضرائب"],
      achievements: ["تحسين دقة التقارير المالية", "تقليل وقت إعداد الميزانية"]
    },
    appointment: {
      justification: "حاجة لقسم المحاسبة",
      documents: ["السيرة الذاتية", "شهادات الخبرة"],
      approvalStatus: "موافق عليه"
    },
    advances: {
      totalAdvances: 2000,
      paidAdvances: 1500,
      remainingAdvances: 500,
      advanceHistory: ["2023-05-10: 2000 جنيه", "2023-11-15: إرجاع 1500 جنيه"]
    },
    covenants: {
      totalCovenants: 1500,
      returnedCovenants: 1000,
      remainingCovenants: 500,
      covenantHistory: ["2023-06-01: جهاز كمبيوتر 1500 جنيه", "2023-12-01: إرجاع 1000 جنيه"]
    },
    attendanceRecord: {
      monthlyAttendance: ["2024-01-01: حاضر", "2024-01-02: حاضر", "2024-01-03: حاضر"],
      lateRecords: ["2024-01-08: متأخر 5 دقائق"],
      absentRecords: []
    },
    withdrawals: {
      totalWithdrawals: 800,
      withdrawalHistory: ["2024-01-10: 300 جنيه", "2024-01-25: 500 جنيه"]
    },
    bonuses: {
      totalBonuses: 1500,
      bonusHistory: ["2023-12-31: مكافأة أداء 1500 جنيه"]
    },
    penalties: {
      totalPenalties: 0,
      penaltyHistory: []
    },
    discounts: {
      totalDiscounts: 300,
      discountHistory: ["2024-01-15: خصم تأمين صحي 300 جنيه"]
    }
  }
]

// بيانات التبويبات المشتركة
export const tabData = [
  { id: "personal", name: "البيانات الشخصية" },
  { id: "job", name: "البيانات الوظيفية" },
  { id: "attendance", name: "لائحة الحضور والإنصراف" },
  { id: "salary", name: "الرواتب" },
  { id: "vacation", name: "الأجازات الدورية" },
  { id: "qualifications", name: "المؤهلات والشهادات" }
]

// بيانات أنواع الموظفين
export const employeeTypes = [
  "موظف دائم",
  "موظف مؤقت",
  "موظف بعقد محدد",
  "موظف تدريب",
  "موظف متعاون"
]

// بيانات الأقسام
export const departments = [
  "قسم الموارد البشرية",
  "قسم المحاسبة",
  "قسم تقنية المعلومات",
  "قسم التسويق",
  "قسم المبيعات",
  "قسم خدمة العملاء",
  "قسم الصيانة",
  "قسم الأمن",
  "قسم النظافة",
  "قسم المطبخ"
]

// بيانات الحالة الاجتماعية
export const maritalStatuses = [
  "عزباء",
  "متزوج",
  "مطلق",
  "أرمل"
]

// بيانات الموقف من التجنيد
export const militaryStatuses = [
  "معفى",
  "مؤجل",
  "مكتمل الخدمة",
  "غير مكتمل الخدمة",
  "غير مطلوب"
]

// بيانات الديانة
export const religions = [
  "مسلم",
  "مسيحي",
  "أخرى"
]

// بيانات نوع التوظيف
export const employmentTypes = [
  "دوام كامل",
  "دوام جزئي",
  "عقد محدد",
  "متعاون"
]

// Hook مشترك لإدارة حالة الموظفين
export function useEmployeesController() {
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees)
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isNewEmployee, setIsNewEmployee] = useState(false)

  // إنشاء موظف جديد
  const createNewEmployee = (): Employee => ({
    id: 0,
    name: "",
    code: "",
    type: "",
    address: "",
    phone: "",
    mobile: "",
    email: "",
    nationalId: "",
    birthDate: "",
    hireDate: "",
    department: "",
    position: "",
    salary: 0,
    status: "نشط",
    active: true,
    personalData: {
      maritalStatus: "",
      children: 0,
      emergencyContact: "",
      emergencyPhone: "",
      militaryStatus: "",
      religion: ""
    },
    jobData: {
      jobTitle: "",
      workLocation: "",
      employmentType: "",
      probationPeriod: ""
    },
    attendanceData: {
      workSchedule: "",
      workStartTime: "",
      workEndTime: "",
      workHours: "",
      attendanceRate: 0,
      lateDays: 0,
      absentDays: 0
    },
    salaryData: {
      basicSalary: 0,
      allowances: 0,
      deductions: 0,
      netSalary: 0,
      bankAccount: ""
    },
    vacationData: {
      annualLeave: 21,
      sickLeave: 10,
      emergencyLeave: 5,
      usedLeave: 0,
      remainingLeave: 21
    },
    workSchedule: {
      workDays: [],
      breakTime: "",
      overtime: false
    },
    qualifications: {
      education: "",
      certificates: [],
      skills: [],
      languages: [],
      previousJobs: [],
      trainingCourses: [],
      achievements: []
    },
    experience: {
      // تم نقل البيانات إلى qualifications
    },
    appointment: {
      justification: "",
      documents: [],
      approvalStatus: ""
    },
    advances: {
      totalAdvances: 0,
      paidAdvances: 0,
      remainingAdvances: 0,
      advanceHistory: []
    },
    covenants: {
      totalCovenants: 0,
      returnedCovenants: 0,
      remainingCovenants: 0,
      covenantHistory: []
    },
    attendanceRecord: {
      monthlyAttendance: [],
      lateRecords: [],
      absentRecords: []
    },
    withdrawals: {
      totalWithdrawals: 0,
      withdrawalHistory: []
    },
    bonuses: {
      totalBonuses: 0,
      bonusHistory: []
    },
    penalties: {
      totalPenalties: 0,
      penaltyHistory: []
    },
    discounts: {
      totalDiscounts: 0,
      discountHistory: []
    }
  })

  // فتح شاشة إضافة موظف جديد
  const handleNewEmployee = () => {
    setSelectedEmployee(createNewEmployee())
    setShowEmployeeDetails(true)
    setIsNewEmployee(true)
  }

  // فتح شاشة تعديل موظف
  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowEmployeeDetails(true)
    setIsNewEmployee(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowEmployeeDetails(false)
    setSelectedEmployee(null)
    setIsNewEmployee(false)
  }

  // حفظ الموظف
  const handleSaveEmployee = (employeeData: Employee) => {
    if (isNewEmployee) {
      // إضافة موظف جديد
      const newEmployee = {
        ...employeeData,
        id: Math.max(...employees.map(e => e.id)) + 1
      }
      setEmployees([...employees, newEmployee])
    } else {
      // تحديث موظف موجود
      setEmployees(employees.map(e => 
        e.id === employeeData.id ? employeeData : e
      ))
    }
    handleCloseDetails()
  }

  // حذف موظف
  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(employees.filter(e => e.id !== employeeId))
  }

  // البحث في الموظفين
  const searchEmployees = (searchTerm: string) => {
    if (!searchTerm.trim()) return employees
    
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    employees,
    showEmployeeDetails,
    selectedEmployee,
    isNewEmployee,
    createNewEmployee,
    handleNewEmployee,
    handleEditEmployee,
    handleCloseDetails,
    handleSaveEmployee,
    handleDeleteEmployee,
    searchEmployees,
  }
}

// Utility functions مشتركة
export const employeeUtils = {
  // التحقق من صحة بيانات الموظف
  validateEmployee: (employee: Employee): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!employee.name.trim()) errors.push("اسم الموظف مطلوب")
    if (!employee.code.trim()) errors.push("كود الموظف مطلوب")
    if (!employee.nationalId.trim()) errors.push("الرقم القومي مطلوب")
    if (!employee.phone.trim()) errors.push("رقم الهاتف مطلوب")
    
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

  // تنسيق الراتب
  formatSalary: (salary: number): string => {
    return `${salary.toLocaleString()} جنيه مصري`
  },

  // التحقق من صحة البريد الإلكتروني
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // حساب العمر من تاريخ الميلاد
  calculateAge: (birthDate: string): number => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  },

  // حساب سنوات الخدمة
  calculateServiceYears: (hireDate: string): number => {
    const today = new Date()
    const hire = new Date(hireDate)
    let years = today.getFullYear() - hire.getFullYear()
    const monthDiff = today.getMonth() - hire.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < hire.getDate())) {
      years--
    }
    
    return years
  }
}
