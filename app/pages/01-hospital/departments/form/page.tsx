"use client"

import { useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DepartmentsItem from "./departmentsItem"
import { Department } from "../list/departmentsController"

function DepartmentsFormContent({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const idParam = searchParams.get("id")

  const selectedDepartment: Department | null = useMemo(() => {
    if (idParam) {
      const id = Number(idParam)
      return { id, code: "", name: "", active: true, description: "" }
    }
    return { id: 0, code: "", name: "", active: true, description: "" }
  }, [idParam])

  const isNewDepartment = !idParam

  const handleClose = () => {
    if (onClose) return onClose()
    router.back()
  }

  return (
    <DepartmentsItem
      selectedDepartment={selectedDepartment}
      isNewDepartment={isNewDepartment}
      onClose={handleClose}
    />
  )
}

export default function DepartmentsFormPage({ onClose }: { onClose?: () => void }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DepartmentsFormContent onClose={onClose} />
    </Suspense>
  )
}