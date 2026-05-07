"use client"

import ProductsUnitsItem from "./productsUnitsItem"
import { useRouter } from "next/navigation"

export default function ProductsUnitsFormPage() {
  const router = useRouter()
  return <ProductsUnitsItem onClose={() => router.back()} />
}