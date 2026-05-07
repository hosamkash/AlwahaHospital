"use client"

import PermissionInventoryDeduction from "../PermissionInventoryDeduction"
import { usePathname, useRouter } from "next/navigation"

export default function PermissionInventoryDeductionListPage() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToForm = (id?: number) => {
    const basePath = pathname?.replace(/\/?list\/?$/, "") || ""
    const formPath = `${basePath}/form${id ? `?id=${id}` : ""}`
    router.push(formPath)
  }

  return (
    <PermissionInventoryDeduction
      onCreate={() => navigateToForm()}
      onEdit={(id: number) => navigateToForm(id)}
    />
  )
}
