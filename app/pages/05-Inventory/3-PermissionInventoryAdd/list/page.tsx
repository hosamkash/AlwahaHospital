"use client"

import PermissionInventoryAdd from "../PermissionInventoryAdd"
import { usePathname, useRouter } from "next/navigation"

export default function PermissionInventoryAddListPage() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToForm = (id?: number) => {
    const basePath = pathname?.replace(/\/?list\/?$/, "") || ""
    const formPath = `${basePath}/form${id ? `?id=${id}` : ""}`
    router.push(formPath)
  }

  return (
    <PermissionInventoryAdd
      onCreate={() => navigateToForm()}
      onEdit={(id: number) => navigateToForm(id)}
    />
  )
}
