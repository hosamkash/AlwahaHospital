"use client"

import TreasuresItem from "./TreasuresItem"
import { useRouter } from "next/navigation"

export default function TreasuresFormPage() {
  const router = useRouter()
  return <TreasuresItem onClose={() => router.back()} />
}