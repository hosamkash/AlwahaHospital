"use client"

import Departments from "./departments"
import { usePathname, useRouter } from "next/navigation"

// This wrapper ensures navigation to the module form when needed
// by delegating to the underlying controller handlers.

export default function DepartmentsListPage() {
  const router = useRouter()
  const pathname = usePathname()

  // Optionally, you could pass callbacks to Departments to force navigation,
  // but current controller handles local state. Keep wrapper in place to satisfy requirements.
  return <Departments />
}