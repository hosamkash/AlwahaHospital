"use client"

import ProductsMovement from "../ProductsMovement"
import { usePathname, useRouter } from "next/navigation"

export default function ProductsMovementListPage() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToForm = (id?: number) => {
    const basePath = pathname?.replace(/\/?list\/?$/, "") || ""
    const formPath = `${basePath}/form${id ? `?id=${id}` : ""}`
    router.push(formPath)
  }

  return (
    <ProductsMovement
      onCreate={() => navigateToForm()}
      onEdit={(id: number) => navigateToForm(id)}
    />
  )
}
