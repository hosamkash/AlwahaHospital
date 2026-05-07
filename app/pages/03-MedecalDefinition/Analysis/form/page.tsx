"use client"

import AnalysisItem from "./analysisItem"
import { useAnalysisController } from "../list/analysisController"
import { useRouter } from "next/navigation"

export default function AnalysisFormPage() {
  const router = useRouter()
  const { selectedAnalysis, isNewAnalysis, handleCloseDetails, handleSaveAnalysis } = useAnalysisController()
  if (!selectedAnalysis) return null
  return (
    <AnalysisItem
      selectedAnalysis={selectedAnalysis}
      isNewAnalysis={isNewAnalysis}
      onClose={handleCloseDetails ?? (() => router.back())}
      onSave={handleSaveAnalysis}
    />
  )
}

