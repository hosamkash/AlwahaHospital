"use client"

import BanksItem from "./banksItem"
import { useBanksController } from "../list/banksController"
import { useRouter } from "next/navigation"

export default function BanksFormPage() {
  const router = useRouter()
  const { selectedBank, isNewBank, handleCloseDetails, handleSaveBank, createNewBank } = useBanksController()
  
  // إذا لم يكن هناك بنك محدد، أنشئ بنك جديد
  const bankToShow = selectedBank || createNewBank()
  
  // دالة الإغلاق التي تنتقل للصفحة السابقة
  const handleClose = () => {
    handleCloseDetails()
    router.push('/modules/04-DealingViews/Banks')
  }
  
  return (
    <BanksItem
      selectedBank={bankToShow}
      isNewBank={!selectedBank}
      onClose={handleClose}
      onSave={handleSaveBank}
    />
  )
}

