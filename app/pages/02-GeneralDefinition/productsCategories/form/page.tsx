"use client"

import ProductsCategoriesItem from "./productsCategoriesItem"
import { useRouter } from "next/navigation"

export default function ProductsCategoriesFormPage() {
  const router = useRouter()
  return <ProductsCategoriesItem onClose={() => router.back()} />
}