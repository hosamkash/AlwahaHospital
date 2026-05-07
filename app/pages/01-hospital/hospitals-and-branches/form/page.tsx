"use client"

import { useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import HospitalsAndBranchesItem from "./HospitalsAndBranchesItem"
import { Hospital } from "../list/HospitalsAndBranchesController"

function HospitalsAndBranchesFormContent({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const idParam = searchParams.get("id")

  const selectedHospital: Hospital | null = useMemo(() => {
    if (idParam) {
      const id = Number(idParam)
      return { 
        id, 
        name: "", 
        address: "", 
        phone: "", 
        manager: "", 
        status: "نشط", 
        active: true, 
        salesCategory: true, 
        code: "", 
        belongsTo: "فروع مستشفى الواحة", 
        email: "", 
        mobile: "", 
        fax: "", 
        website: "", 
        shortNumber: "", 
        taxRegistrationNumber: "", 
        taxCardNumber: "", 
        affiliatedAuthority: "", 
        taxpayerName: "", 
        taxpayerAddress: "", 
        fileNumber: "", 
        activity: "", 
        establishmentNumber: "", 
        establishmentSector: "", 
        activityStartDate: "", 
        cardIssuanceDate: "", 
        insuranceDate: "", 
        insuranceNumber: "", 
        reportHeader: "", 
        reportFooter: "", 
        watermark: "" 
      }
    }
    return { 
      id: 0, 
      name: "", 
      address: "", 
      phone: "", 
      manager: "", 
      status: "نشط", 
      active: true, 
      salesCategory: true, 
      code: "", 
      belongsTo: "فروع مستشفى الواحة", 
      email: "", 
      mobile: "", 
      fax: "", 
      website: "", 
      shortNumber: "", 
      taxRegistrationNumber: "", 
      taxCardNumber: "", 
      affiliatedAuthority: "", 
      taxpayerName: "", 
      taxpayerAddress: "", 
      fileNumber: "", 
      activity: "", 
      establishmentNumber: "", 
      establishmentSector: "", 
      activityStartDate: "", 
      cardIssuanceDate: "", 
      insuranceDate: "", 
      insuranceNumber: "", 
      reportHeader: "", 
      reportFooter: "", 
      watermark: "" 
    }
  }, [idParam])

  const isNewHospital = !idParam

  const handleClose = () => {
    if (onClose) return onClose()
    router.back()
  }

  return (
    <HospitalsAndBranchesItem
      selectedHospital={selectedHospital}
      isNewHospital={isNewHospital}
      onClose={handleClose}
    />
  )
}

export default function HospitalsAndBranchesFormPage({ onClose }: { onClose?: () => void }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HospitalsAndBranchesFormContent onClose={onClose} />
    </Suspense>
  )
}