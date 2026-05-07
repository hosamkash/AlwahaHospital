"use client"

import MedicalSpecialtiesItem from "./medicalSpecialtiesItem"
import { useMedicalSpecialtiesController } from "../list/medicalSpecialtiesController"
import { useRouter } from "next/navigation"

export default function MedicalSpecialtiesFormPage() {
  const router = useRouter()
  const { selectedSpecialty, isNewSpecialty, handleCloseDetails, handleSaveSpecialty } = useMedicalSpecialtiesController()
  if (!selectedSpecialty) return null
  return (
    <MedicalSpecialtiesItem
      selectedSpecialty={selectedSpecialty}
      isNewSpecialty={isNewSpecialty}
      onClose={handleCloseDetails ?? (() => router.back())}
      onSave={handleSaveSpecialty}
    />
  )
}

