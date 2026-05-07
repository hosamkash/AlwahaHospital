"use client"

import SupplayMony from "../SupplayMony"
import { usePathname, useRouter } from "next/navigation"

export default function SupplayMonyListPage() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToForm = (id?: number) => {
    const basePath = pathname?.replace(/\/?list\/?$/, "") || ""
    const formPath = `${basePath}/form${id ? `?id=${id}` : ""}`
    router.push(formPath)
  }

  return (
    <SupplayMony
      onCreate={() => navigateToForm()}
      onEdit={(id: number) => navigateToForm(id)}
    />
  )
}
