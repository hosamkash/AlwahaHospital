"use client"

import GuarantorsItem from "./guarantorsItem"
import { useGuarantorsController } from "../list/guarantorsController"
import { useRouter } from "next/navigation"

export default function GuarantorsFormPage() {
  const router = useRouter()
  const { selectedGuarantor, isNewGuarantor, handleCloseDetails, handleSaveGuarantor, createNewGuarantor } = useGuarantorsController()
  
  // إذا لم يكن هناك ضامن محدد، أنشئ ضامن جديد
  const guarantorToShow = selectedGuarantor || createNewGuarantor()
  
  // دالة الإغلاق التي تنتقل للصفحة السابقة
  const handleClose = () => {
    handleCloseDetails()
    router.push('/modules/04-DealingViews/Guarantors')
  }
  
  return (
    <GuarantorsItem
      selectedGuarantor={guarantorToShow}
      isNewGuarantor={!selectedGuarantor}
      onClose={handleClose}
      onSave={handleSaveGuarantor}
    />
  )
}

