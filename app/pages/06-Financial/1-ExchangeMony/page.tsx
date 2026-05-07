"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ExchangeMonyPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the list page by default
    router.push('/modules/06-Financial/1-ExchangeMony/list')
  }, [router])

  return (
    <div className="p-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">جاري التوجيه...</p>
      </div>
    </div>
  )
}
