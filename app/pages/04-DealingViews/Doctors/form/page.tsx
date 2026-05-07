"use client"

import DoctorsItem from "./doctorsItem"
import { useDoctorsController } from "../list/doctorsController"
import { useRouter } from "next/navigation"

export default function DoctorsFormPage() {
  const router = useRouter()
  const { selectedDoctor, isNewDoctor, handleCloseDetails, handleSaveDoctor, createNewDoctor } = useDoctorsController()
  
  // إذا لم يكن هناك طبيب محدد، أنشئ طبيب جديد
  const doctorToShow = selectedDoctor || createNewDoctor()
  
  // دالة الإغلاق التي تنتقل للصفحة السابقة
  const handleClose = () => {
    handleCloseDetails()
    router.push('/modules/04-DealingViews/Doctors')
  }
  
  return (
    <DoctorsItem
      selectedDoctor={doctorToShow}
      isNewDoctor={!selectedDoctor}
      onClose={handleClose}
      onSave={handleSaveDoctor}
    />
  )
}

