"use client"

import RadiologyItem from "./radiologyItem"
import { useRadiologyController } from "../list/radiologyController"
import { useRouter } from "next/navigation"

export default function RadiologyFormPage() {
  const router = useRouter()
  const { selectedRadiology, isNewRadiology, categories, handleCloseDetails, handleSaveRadiology, handleSaveCategory, handleDeleteCategory } = useRadiologyController()
  if (!selectedRadiology) return null
  return (
    <RadiologyItem
      selectedRadiology={selectedRadiology}
      isNewRadiology={isNewRadiology}
      categories={categories}
      onClose={handleCloseDetails ?? (() => router.back())}
      onSave={handleSaveRadiology}
      onSaveCategory={handleSaveCategory}
      onDeleteCategory={handleDeleteCategory}
    />
  )
}

