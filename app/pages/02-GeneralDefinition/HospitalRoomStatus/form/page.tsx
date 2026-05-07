"use client"

import HospitalRoomStatusItem from "./HospitalRoomStatusItem"
import { useRouter } from "next/navigation"

export default function HospitalRoomStatusFormPage() {
  const router = useRouter()
  return <HospitalRoomStatusItem onClose={() => router.back()} />
}