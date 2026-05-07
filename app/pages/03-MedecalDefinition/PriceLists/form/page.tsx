"use client"

import PriceListsItem from "./priceListsItem"
import { usePriceListsController } from "../list/priceListsController"
import { useRouter } from "next/navigation"

export default function PriceListsFormPage() {
  const router = useRouter()
  const { selectedPriceList, isNewPriceList, handleCloseDetails, handleSavePriceList } = usePriceListsController()
  if (!selectedPriceList) return null
  return (
    <PriceListsItem
      selectedPriceList={selectedPriceList}
      isNewPriceList={isNewPriceList}
      onClose={handleCloseDetails ?? (() => router.back())}
      onSave={handleSavePriceList}
    />
  )
}

