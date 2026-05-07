"use client"

import Doctors from "./doctors"
import { usePathname, useRouter } from "next/navigation"

export default function DoctorsListPage() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToForm = (id?: number) => {
    const basePath = pathname?.replace(/\/?list\/?$/, "") || ""
    const formPath = `${basePath}/form${id ? `?id=${id}` : ""}`
    router.push(formPath)
  }

  return (
    <Doctors
      onCreate={() => navigateToForm()}
      onEdit={(id: number) => navigateToForm(id)}
    />
  )
}

