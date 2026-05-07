"use client"

import VendorItem from "./vendorItem"
import { useVendorsController } from "../list/vendorsController"
import { useRouter } from "next/navigation"

export default function VendorsFormPage() {
  const router = useRouter()
  const { selectedVendor, isNewVendor, handleCloseDetails, handleSaveVendor, createNewVendor } = useVendorsController()
  
  // إذا لم يكن هناك مورد محدد، أنشئ مورد جديد
  const vendorToShow = selectedVendor || createNewVendor()
  
  // دالة الإغلاق التي تنتقل للصفحة السابقة
  const handleClose = () => {
    handleCloseDetails()
    router.push('/modules/04-DealingViews/Vendors')
  }
  
  return (
    <VendorItem
      selectedVendor={vendorToShow}
      isNewVendor={!selectedVendor}
      onClose={handleClose}
      onSave={handleSaveVendor}
    />
  )
}

