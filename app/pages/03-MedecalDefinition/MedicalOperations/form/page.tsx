"use client"

import MedicalOperationsItem from "./medicalOperationsItem"
import { useMedicalOperationsController } from "../list/medicalOperationsController"
import { useRouter } from "next/navigation"

export default function MedicalOperationsFormPage() {
  const router = useRouter()
  const { selectedOperation, isNewOperation, handleCloseDetails, handleSaveOperation } = useMedicalOperationsController()
  if (!selectedOperation) return null
  return (
    <MedicalOperationsItem
      selectedOperation={selectedOperation}
      isNewOperation={isNewOperation}
      onClose={handleCloseDetails ?? (() => router.back())}
      onSave={handleSaveOperation}
    />
  )
}

