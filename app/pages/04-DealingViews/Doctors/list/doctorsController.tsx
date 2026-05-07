"use client"

import { useState } from "react"

// Interface مشتركة للبيانات
export interface Doctor {
  id: number
  name: string
  code: string
  specialization: string
  phone: string
  mobile: string
  email: string
  address: string
  experience: string
  education: string
  status: string
  active: boolean
  consultationFee: number
  workingHours: string
  notes: string
}

// البيانات الافتراضية للأطباء
export const defaultDoctors: Doctor[] = [
  {
    id: 1,
    name: "د. أحمد محمد علي",
    code: "DOC001",
    specialization: "طب القلب",
    phone: "+20225741234",
    mobile: "01012345678",
    email: "ahmed.ali@hospital.com",
    address: "شارع رمسيس، القاهرة",
    experience: "15 سنة",
    education: "دكتوراه في طب القلب - جامعة القاهرة",
    status: "نشط",
    active: true,
    consultationFee: 500,
    workingHours: "الأحد - الخميس: 9 ص - 5 م",
    notes: "متخصص في جراحات القلب المفتوح",
  },
  {
    id: 2,
    name: "د. سارة أحمد حسن",
    code: "DOC002",
    specialization: "طب الأطفال",
    phone: "+20225781234",
    mobile: "01098765432",
    email: "sara.hassan@hospital.com",
    address: "شارع محمد فريد، القاهرة",
    experience: "12 سنة",
    education: "ماجستير في طب الأطفال - جامعة عين شمس",
    status: "نشط",
    active: true,
    consultationFee: 400,
    workingHours: "الأحد - الأربعاء: 10 ص - 6 م",
    notes: "متخصصة في أمراض الأطفال حديثي الولادة",
  },
  {
    id: 3,
    name: "د. محمد علي محمود",
    code: "DOC003",
    specialization: "طب العظام",
    phone: "+20225791234",
    mobile: "01055556666",
    email: "mohamed.mahmoud@hospital.com",
    address: "شارع التحرير، القاهرة",
    experience: "18 سنة",
    education: "دكتوراه في جراحة العظام - جامعة الإسكندرية",
    status: "غير نشط",
    active: false,
    consultationFee: 600,
    workingHours: "السبت - الأربعاء: 8 ص - 4 م",
    notes: "متخصص في جراحات المفاصل والعمود الفقري",
  },
]

// بيانات التبويبات المشتركة
export const tabData = [
  { id: "contact", name: "بيانات الإتصال" },
  { id: "medical", name: "البيانات الطبية" },
]

// بيانات التخصصات الطبية
export const specializations = [
  "طب القلب",
  "طب الأطفال",
  "طب العظام",
  "طب الجراحة العامة",
  "طب النساء والتوليد",
  "طب العيون",
  "طب الأنف والأذن والحنجرة",
  "طب الجلدية",
  "طب المخ والأعصاب",
  "طب النفسية",
  "طب الأسنان",
  "طب الأشعة",
  "طب المختبرات",
  "طب الطوارئ",
  "طب العائلة",
]



// بيانات حقول الاتصال
export const contactFields = [
  { label: "الهاتف", value: "phone", icon: "📞" },
  { label: "الموبيل", value: "mobile", icon: "📱" },
  { label: "البريد الالكتروني", value: "email", icon: "📧" },
]

// بيانات حقول طبية
export const medicalFields = [
  { label: "التخصص", value: "specialization" },
  { label: "الخبرة", value: "experience" },
  { label: "المؤهل العلمي", value: "education" },
  { label: "رسوم الاستشارة", value: "consultationFee" },
]


// Hook مشترك لإدارة حالة الأطباء
export function useDoctorsController() {
  const [doctors, setDoctors] = useState<Doctor[]>(defaultDoctors)
  const [showDoctorDetails, setShowDoctorDetails] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isNewDoctor, setIsNewDoctor] = useState(false)

  // إنشاء طبيب جديد
  const createNewDoctor = (): Doctor => ({
    id: 0,
    name: "",
    code: "",
    specialization: "",
    phone: "",
    mobile: "",
    email: "",
    address: "",
    experience: "",
    education: "",
    status: "نشط",
    active: true,
    consultationFee: 0,
    workingHours: "",
    notes: "",
  })

  // فتح شاشة إضافة طبيب جديد
  const handleNewDoctor = () => {
    setSelectedDoctor(createNewDoctor())
    setShowDoctorDetails(true)
    setIsNewDoctor(true)
  }

  // فتح شاشة تعديل طبيب
  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowDoctorDetails(true)
    setIsNewDoctor(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowDoctorDetails(false)
    setSelectedDoctor(null)
    setIsNewDoctor(false)
  }

  // حفظ الطبيب
  const handleSaveDoctor = (doctorData: Doctor) => {
    if (isNewDoctor) {
      // إضافة طبيب جديد
      const newDoctor = {
        ...doctorData,
        id: Math.max(...doctors.map(d => d.id)) + 1
      }
      setDoctors([...doctors, newDoctor])
    } else {
      // تحديث طبيب موجود
      setDoctors(doctors.map(d => 
        d.id === doctorData.id ? doctorData : d
      ))
    }
    handleCloseDetails()
  }

  // حذف طبيب
  const handleDeleteDoctor = (doctorId: number) => {
    setDoctors(doctors.filter(d => d.id !== doctorId))
  }

  // البحث في الأطباء
  const searchDoctors = (searchTerm: string) => {
    if (!searchTerm.trim()) return doctors
    
    return doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    doctors,
    showDoctorDetails,
    selectedDoctor,
    isNewDoctor,
    createNewDoctor,
    handleNewDoctor,
    handleEditDoctor,
    handleCloseDetails,
    handleSaveDoctor,
    handleDeleteDoctor,
    searchDoctors,
  }
}

// Utility functions مشتركة
export const doctorUtils = {
  // التحقق من صحة بيانات الطبيب
  validateDoctor: (doctor: Doctor): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!doctor.name.trim()) errors.push("اسم الطبيب مطلوب")
    if (!doctor.code.trim()) errors.push("كود الطبيب مطلوب")
    if (!doctor.specialization.trim()) errors.push("التخصص مطلوب")
    if (!doctor.phone.trim()) errors.push("رقم الهاتف مطلوب")
    
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

  // تنسيق رسوم الاستشارة
  formatConsultationFee: (fee: number): string => {
    return `${fee} جنيه مصري`
  },

  // التحقق من صحة البريد الإلكتروني
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
