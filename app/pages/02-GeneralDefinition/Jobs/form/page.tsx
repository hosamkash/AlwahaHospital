"use client"

import JobsItem from "./JobsItem"
import { useRouter } from "next/navigation"

export default function JobsFormPage() {
  const router = useRouter()
  return <JobsItem onClose={() => router.back()} />
}