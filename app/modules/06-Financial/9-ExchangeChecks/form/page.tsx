"use client"

import { Suspense } from "react"
import ExchangeChecksFormPage from "@/app/pages/06-Financial/9-ExchangeChecks/form/page"

export default function ExchangeChecksFormPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExchangeChecksFormPage />
    </Suspense>
  )
}