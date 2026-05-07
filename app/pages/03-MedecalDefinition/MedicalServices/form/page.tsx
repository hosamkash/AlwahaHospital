"use client"

import MedicalServicesItem from "./medicalServicesItem"
import { useMedicalServicesController } from "../list/medicalServicesController"
import { useRouter } from "next/navigation"

export default function MedicalServicesFormPage() {
  const router = useRouter()
  const { selectedMedicalService, isNewMedicalService, categories, handleCloseMedicalServiceDetails, handleSaveMedicalService, handleSaveCategory, handleDeleteCategory } = useMedicalServicesController()
  if (!selectedMedicalService) return null
  return (
    <MedicalServicesItem
      selectedMedicalService={selectedMedicalService}
      isNewMedicalService={isNewMedicalService}
      categories={categories}
      onClose={handleCloseMedicalServiceDetails ?? (() => router.back())}
      onSave={handleSaveMedicalService}
      onSaveCategory={handleSaveCategory}
      onDeleteCategory={handleDeleteCategory}
    />
  )
}

