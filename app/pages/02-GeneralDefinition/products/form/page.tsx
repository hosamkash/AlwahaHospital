"use client"

import ProductsItem from "./productsItem"
import { useRouter } from "next/navigation"

export default function ProductsFormPage() {
  const router = useRouter()
  return <ProductsItem onClose={() => router.back()} />
}