"use client"

import ContractsDealingsItem from "./contractsDealingsItem"
import { useContractsDealingsController } from "../list/contractsController"
import { useRouter } from "next/navigation"

export default function ContractsDealingsFormPage() {
  const router = useRouter()
  const { selectedContractDealing, isNewContractDealing, handleCloseDetails, handleSaveContractDealing, createNewContractDealing } = useContractsDealingsController()
  
  // إذا لم يكن هناك جهة تعاقد محددة، أنشئ جهة تعاقد جديدة
  const contractDealingToShow = selectedContractDealing || createNewContractDealing()
  
  // دالة الإغلاق التي تنتقل للصفحة السابقة
  const handleClose = () => {
    handleCloseDetails()
    router.push('/modules/04-DealingViews/ContractsDealings')
  }
  
  return (
    <ContractsDealingsItem
      selectedContractDealing={contractDealingToShow}
      isNewContractDealing={!selectedContractDealing}
      onClose={handleClose}
      onSave={handleSaveContractDealing}
    />
  )
}

