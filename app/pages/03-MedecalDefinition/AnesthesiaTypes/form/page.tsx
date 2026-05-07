"use client"

import AnesthesiaTypesItem from "./anesthesiaTypesItem"
import { useAnesthesiaTypesController } from "../list/anesthesiaTypesController"
import { useRouter } from "next/navigation"

export default function AnesthesiaTypesFormPage() {
  const router = useRouter()
  const { selectedAnesthesiaType, isNewAnesthesiaType, handleCloseDetails, handleSaveAnesthesiaType } = useAnesthesiaTypesController()
  if (!selectedAnesthesiaType) return null
  return (
    <AnesthesiaTypesItem
      selectedAnesthesiaType={selectedAnesthesiaType}
      isNewAnesthesiaType={isNewAnesthesiaType}
      onClose={handleCloseDetails ?? (() => router.back())}
      onSave={handleSaveAnesthesiaType}
    />
  )
}

