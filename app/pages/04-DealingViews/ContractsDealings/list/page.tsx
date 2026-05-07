"use client"

import ContractsDealings from "./contractsDealings"
import { usePathname, useRouter } from "next/navigation"

export default function ContractsDealingsListPage() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToForm = (id?: number) => {
    const basePath = pathname?.replace(/\/?list\/?$/, "") || ""
    const formPath = `${basePath}/form${id ? `?id=${id}` : ""}`
    router.push(formPath)
  }

  return (
    <ContractsDealings
      onCreate={() => navigateToForm()}
      onEdit={(id: number) => navigateToForm(id)}
    />
  )
}

