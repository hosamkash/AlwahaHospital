"use client"

import ClientsItem from "./clientsItem"
import { useClientsController } from "../list/clientsController"
import { useRouter } from "next/navigation"

export default function ClientsFormPage() {
  const router = useRouter()
  const { selectedClient, isNewClient, handleCloseClientDetails, handleSaveClient } = useClientsController()
  
  // إذا لم يكن هناك عميل محدد، أنشئ عميل جديد
  const clientToShow = selectedClient || {
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
    priceCategory: "0.00 سعر العملاء",
    active: true,
    notes: ""
  }
  
  // دالة الإغلاق التي تنتقل للصفحة السابقة
  const handleClose = () => {
    handleCloseClientDetails()
    router.push('/modules/04-DealingViews/Clients')
  }
  
  return (
    <ClientsItem
      selectedClient={clientToShow}
      isNewClient={!selectedClient}
      onClose={handleClose}
      onSave={handleSaveClient}
    />
  )
}

