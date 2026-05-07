"use client"

import DiseaseItem from "./diseaseItem"
import { useDiseaseController } from "../list/diseaseController"
import { useRouter } from "next/navigation"

export default function DiseaseFormPage() {
  const router = useRouter()
  const { selectedDisease, isNewDisease, categories, handleCloseDetails, handleSaveDisease } = useDiseaseController()
  if (!selectedDisease) return null
  return (
    <DiseaseItem
      selectedDisease={selectedDisease}
      isNewDisease={isNewDisease}
      categories={categories}
      onClose={handleCloseDetails ?? (() => router.back())}
      onSave={handleSaveDisease}
    />
  )
}

