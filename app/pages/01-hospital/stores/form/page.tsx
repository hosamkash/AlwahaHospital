"use client"

import StoresItem from "./storesItem"
import { useStoresController } from "../list/storesController"

export default function StoreFormPage() {
  const { selectedStore, isNewStore, handleCloseDetails, handleSaveStore } = useStoresController()
  if (!selectedStore) return null
  return (
    <StoresItem
      selectedStore={selectedStore}
      isNewStore={isNewStore}
      onClose={handleCloseDetails}
      onSave={handleSaveStore}
    />
  )
}

