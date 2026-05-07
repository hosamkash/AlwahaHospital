"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  X,
  Plus
} from "lucide-react"
import { 
  TransferBetweenStoresDetails, 
  TransferItem,
  defaultTransferDetails,
  useTransferBetweenStoresController
} from "../TransferBetweenStoresController"
import ProductSelectionDialog from "@/components/ProductSelectionDialog"
import ComboBox from "@/components/ComboBox"

function TransferBetweenStoresFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const transferId = searchParams.get('id')

  const { transfers, handleSaveTransfer } = useTransferBetweenStoresController()

  const [transfer, setTransfer] = useState<TransferBetweenStoresDetails | null>(null)
  const [isNewTransfer, setIsNewTransfer] = useState(false)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)

  // ComboBox options
  const branchOptions = [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ]

  const storeOptions = [
    { value: "العمومي", label: "العمومي" },
    { value: "مخزن الطوارئ", label: "مخزن الطوارئ" },
    { value: "مخزن العيادات", label: "مخزن العيادات" },
    { value: "مخزن العمليات", label: "مخزن العمليات" },
    { value: "المخزن الرئيسي", label: "المخزن الرئيسي" }
  ]

  const statusOptions = [
    { value: "قيد الطلب", label: "قيد الطلب" },
    { value: "قيد المراجعة", label: "قيد المراجعة" },
    { value: "مكتمل", label: "مكتمل" },
    { value: "ملغي", label: "ملغي" }
  ]

  const employeeOptions = [
    { value: "ا. عاطف", label: "ا. عاطف" },
    { value: "د. أحمد", label: "د. أحمد" },
    { value: "م. سارة", label: "م. سارة" },
    { value: "أ. محمد", label: "أ. محمد" },
    { value: "د. فاطمة", label: "د. فاطمة" }
  ]

  useEffect(() => {
    if (transferId) {
      const existingTransfer = transfers.find(transfer => transfer.id === parseInt(transferId))
      if (existingTransfer) {
        // For editing, load existing data and convert to TransferBetweenStoresDetails
        setTransfer({
          ...defaultTransferDetails,
          ...existingTransfer,
          fromBranch: existingTransfer.transferredFromBranch,
          toBranch: existingTransfer.transferredToBranch,
          fromStore: existingTransfer.transferredFromStore,
          toStore: existingTransfer.transferredToStore,
          employee: existingTransfer.responsibleEmployee,
          items: defaultTransferDetails.items // Keep default items for now, or load actual items if available
        })
        setIsNewTransfer(false)
      } else {
        // If ID is provided but not found, treat as new or redirect
        console.warn(`Transfer with ID ${transferId} not found. Initializing as new transfer.`)
        setTransfer({
          ...defaultTransferDetails,
          id: Date.now(),
          code: `${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        })
        setIsNewTransfer(true)
      }
    } else {
      // For new transfer
      setTransfer({
        ...defaultTransferDetails,
        id: Date.now(),
        code: `${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      })
      setIsNewTransfer(true)
    }
  }, [transferId, transfers])

  if (!transfer) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setTransfer(prev => {
      if (!prev) return null
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const handleItemChange = (itemId: number, field: string, value: string | boolean | number) => {
    setTransfer(prev => {
      if (!prev) return null
      return {
        ...prev,
        items: prev.items.map(item => {
          if (item.id === itemId) {
            const updatedItem = { ...item, [field]: value }
            
            // Calculate totals
            const transferredTotal = updatedItem.transferredQuantity * updatedItem.transferredPrice
            const receivedTotal = updatedItem.receivedQuantity * updatedItem.receivedPrice
            const receiptDifference = updatedItem.receivedQuantity - updatedItem.transferredQuantity
            const receiptMatches = updatedItem.receivedQuantity === updatedItem.transferredQuantity
            
            return {
              ...updatedItem,
              transferredTotal,
              receivedTotal,
              receiptDifference,
              receiptMatches
            }
          }
          return item
        })
      }
    })
  }

  const handleSave = () => {
    if (transfer) {
      handleSaveTransfer(transfer)
      router.push('/modules/05-Inventory/6-TransferBetweenStores/list')
    }
  }

  const handleClose = () => {
    router.back()
  }

  // إضافة الأصناف المختارة للتحويل
  const handleSelectProducts = (products: any[]) => {
    const newItems = products.map((product, index) => ({
      id: Date.now() + index, // إنشاء ID فريد
      barcode: product.barcode,
      item: product.name,
      category: product.category,
      manufacturer: product.manufacturer,
      unit: product.unit,
      priceCategory: product.priceCategory,
      transferredQuantity: product.selectedQuantity || 1,
      transferredPrice: product.price,
      transferredTotal: (product.selectedQuantity || 1) * product.price,
      receivedQuantity: product.selectedQuantity || 1,
      receiptDifference: 0,
      receiptMatches: true,
      receivedPrice: product.price,
      receivedTotal: (product.selectedQuantity || 1) * product.price
    }))

    setTransfer(prev => {
      if (!prev) return null
      return {
        ...prev,
        items: [...prev.items, ...newItems]
      }
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {isNewTransfer ? "إضافة تحويل أصناف جديد" : "تعديل بيانات تحويل الأصناف"}
        </h2>
        <div className="flex items-center gap-2">
          <Button 
            className="bg-primary"
            onClick={() => setIsProductDialogOpen(true)}
          >
            <Plus className="w-4 h-4 ml-2" />
            اختيار أصناف
          </Button>
          <Button variant="outline" onClick={handleClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-3 gap-6">
        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <Label className="text-right block mb-1">الكود</Label>
            <div className="relative">
              <Input
                value={transfer.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="pr-8"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">التاريخ</Label>
            <div className="relative">
              <Input
                type="date"
                value={transfer.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="pr-8"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-right block mb-1">الساعة</Label>
            <div className="relative">
              <Input
                type="time"
                value={transfer.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="pr-8"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          <ComboBox
            label="من فرع"
            value={transfer.fromBranch}
            options={branchOptions}
            onChange={(value) => handleInputChange("fromBranch", value)}
            placeholder="اختر الفرع المصدر..."
            searchPlaceholder="ابحث عن الفرع..."
          />
          <ComboBox
            label="إلى فرع"
            value={transfer.toBranch}
            options={branchOptions}
            onChange={(value) => handleInputChange("toBranch", value)}
            placeholder="اختر الفرع الوجهة..."
            searchPlaceholder="ابحث عن الفرع..."
          />
          <ComboBox
            label="من مخزن"
            value={transfer.fromStore}
            options={storeOptions}
            onChange={(value) => handleInputChange("fromStore", value)}
            placeholder="اختر المخزن المصدر..."
            searchPlaceholder="ابحث عن المخزن..."
          />
          <ComboBox
            label="إلى مخزن"
            value={transfer.toStore}
            options={storeOptions}
            onChange={(value) => handleInputChange("toStore", value)}
            placeholder="اختر المخزن الوجهة..."
            searchPlaceholder="ابحث عن المخزن..."
          />
        </div>

        {/* Left Column */}
        <div className="space-y-4">
          <ComboBox
            label="الموظف"
            value={transfer.employee}
            options={employeeOptions}
            onChange={(value) => handleInputChange("employee", value)}
            placeholder="اختر الموظف..."
            searchPlaceholder="ابحث عن الموظف..."
          />
          <ComboBox
            label="حالة التحويل"
            value={transfer.transferStatus}
            options={statusOptions}
            onChange={(value) => handleInputChange("transferStatus", value)}
            placeholder="اختر الحالة..."
            searchPlaceholder="ابحث عن الحالة..."
          />
          <div>
            <Label className="text-right block mb-1">ملاحظات</Label>
            <div className="relative">
              <Input
                value={transfer.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="pr-8"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="receiptMatches"
              checked={transfer.receiptMatches}
              onChange={(e) => handleInputChange("receiptMatches", e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="receiptMatches" className="text-sm">الإستلام مطابق</Label>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <hr className="border-gray-300" />

      {/* Items Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-right py-3 px-4 font-medium text-gray-700">#</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الباركود</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الصنف</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">التصنيف</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الشركة المنتجة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">فئة السعر</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الوحدة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية المحولة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">سعر المحول</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">إجمالي المحول</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية المستلمة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">فرق الإستلام</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الإستلام مطابق</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">سعر المستلم</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">إجمالي المستلم</th>
              </tr>
            </thead>
            <tbody>
              {transfer.items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{index + 1}</td>
                  <td className="py-3 px-4 text-sm font-mono">{item.barcode}</td>
                  <td className="py-3 px-4 text-sm font-medium">{item.item}</td>
                  <td className="py-3 px-4 text-sm">{item.category}</td>
                  <td className="py-3 px-4 text-sm">{item.manufacturer}</td>
                  <td className="py-3 px-4 text-sm">{item.priceCategory}</td>
                  <td className="py-3 px-4 text-sm">{item.unit}</td>
                  <td className="py-3 px-4 text-sm">
                    <Input
                      type="number"
                      value={item.transferredQuantity}
                      onChange={(e) => handleItemChange(item.id, "transferredQuantity", parseInt(e.target.value) || 0)}
                      className="w-20"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Input
                      type="number"
                      value={item.transferredPrice}
                      onChange={(e) => handleItemChange(item.id, "transferredPrice", parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{item.transferredTotal.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm">
                    <Input
                      type="number"
                      value={item.receivedQuantity}
                      onChange={(e) => handleItemChange(item.id, "receivedQuantity", parseInt(e.target.value) || 0)}
                      className="w-20"
                    />
                  </td>
                  <td className={`py-3 px-4 text-sm ${item.receiptDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.receiptDifference}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <input
                      type="checkbox"
                      checked={item.receiptMatches}
                      onChange={(e) => handleItemChange(item.id, "receiptMatches", e.target.checked)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Input
                      type="number"
                      value={item.receivedPrice}
                      onChange={(e) => handleItemChange(item.id, "receivedPrice", parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{item.receivedTotal.toFixed(2)}</td>
                </tr>
              ))}
              {transfer.items.length === 0 && (
                <tr>
                  <td colSpan={15} className="py-8 text-center text-gray-500">
                    لا توجد أصناف مضافة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button className="bg-primary" onClick={handleSave}>
          حفظ
        </Button>
        <Button variant="outline" onClick={handleClose}>
          إلغاء
        </Button>
      </div>

      {/* Product Selection Dialog */}
      <ProductSelectionDialog
        isOpen={isProductDialogOpen}
        onClose={() => setIsProductDialogOpen(false)}
        onSelectProducts={handleSelectProducts}
        showAddButton={true}
      />
    </div>
  )
}

export default function TransferBetweenStoresFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransferBetweenStoresFormContent />
    </Suspense>
  )
}
