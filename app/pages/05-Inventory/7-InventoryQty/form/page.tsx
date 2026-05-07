"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { 
  InventoryItemDetails, 
  defaultInventoryItems,
  useInventoryQtyController
} from "../InventoryQtyController"
import ComboBox from "@/components/ComboBox"

function InventoryQtyFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemId = searchParams.get('id')

  const { inventoryItems, handleSaveItem } = useInventoryQtyController()

  const [item, setItem] = useState<InventoryItemDetails | null>(null)
  const [isNewItem, setIsNewItem] = useState(false)

  useEffect(() => {
    if (itemId) {
      const existingItem = inventoryItems.find(item => item.id === parseInt(itemId))
      if (existingItem) {
        setItem({
          ...existingItem,
          lastUpdated: new Date().toISOString(),
          notes: "",
        })
        setIsNewItem(false)
      } else {
        console.warn(`Item with ID ${itemId} not found. Initializing as new item.`)
        setItem({
          id: Date.now(),
          branch: "",
          barcode: "",
          warehouse: "",
          item: "",
          category: "",
          manufacturer: "",
          warehouseBalance: 0,
          price: 0,
          total: 0,
          lastUpdated: new Date().toISOString(),
          notes: "",
        })
        setIsNewItem(true)
      }
    } else {
      setItem({
        id: Date.now(),
        branch: "",
        barcode: "",
        warehouse: "",
        item: "",
        category: "",
        manufacturer: "",
        warehouseBalance: 0,
        price: 0,
        total: 0,
        lastUpdated: new Date().toISOString(),
        notes: "",
      })
      setIsNewItem(true)
    }
  }, [itemId, inventoryItems])

  if (!item) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string | number) => {
    setItem(prev => {
      if (!prev) return null
      const updatedItem = { ...prev, [field]: value }
      
      // Calculate total when price or quantity changes
      if (field === 'price' || field === 'warehouseBalance') {
        updatedItem.total = updatedItem.warehouseBalance * updatedItem.price
      }
      
      return updatedItem
    })
  }

  const handleSave = () => {
    if (item) {
      handleSaveItem(item)
      router.push('/modules/05-Inventory/7-InventoryQty/list')
    }
  }

  const handleClose = () => {
    router.back()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {isNewItem ? "إضافة صنف جديد للجرد" : "تعديل بيانات الصنف"}
        </h2>
        <Button variant="outline" onClick={handleClose}>
          <X className="w-4 h-4 ml-2" />
          إغلاق
        </Button>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6">
        {/* Right Column */}
        <div className="space-y-4">
          <ComboBox
            label="الفرع"
            value={item.branch}
            options={[
              { value: "مكه العمومي", label: "مكه العمومي" },
              { value: "الرياض العمومي", label: "الرياض العمومي" },
              { value: "جدة العمومي", label: "جدة العمومي" },
              { value: "الدمام العمومي", label: "الدمام العمومي" },
              { value: "الطائف العمومي", label: "الطائف العمومي" }
            ]}
            onChange={(value) => handleInputChange("branch", value)}
            placeholder="اختر الفرع..."
            searchPlaceholder="ابحث عن الفرع..."
          />
          <div>
            <Label className="text-right block mb-1">الباركود</Label>
            <Input
              value={item.barcode}
              onChange={(e) => handleInputChange("barcode", e.target.value)}
              className="pr-8"
              placeholder="أدخل الباركود..."
            />
          </div>
          <ComboBox
            label="المخزن"
            value={item.warehouse}
            options={[
              { value: "العمومي", label: "العمومي" },
              { value: "مخزن الطوارئ", label: "مخزن الطوارئ" },
              { value: "مخزن العيادات", label: "مخزن العيادات" },
              { value: "مخزن العمليات", label: "مخزن العمليات" },
              { value: "المخزن الرئيسي", label: "المخزن الرئيسي" }
            ]}
            onChange={(value) => handleInputChange("warehouse", value)}
            placeholder="اختر المخزن..."
            searchPlaceholder="ابحث عن المخزن..."
          />
          <div>
            <Label className="text-right block mb-1">الصنف</Label>
            <Input
              value={item.item}
              onChange={(e) => handleInputChange("item", e.target.value)}
              className="pr-8"
              placeholder="أدخل اسم الصنف..."
            />
          </div>
        </div>

        {/* Left Column */}
        <div className="space-y-4">
          <ComboBox
            label="التصنيف"
            value={item.category}
            options={[
              { value: "أدوية مسكنة", label: "أدوية مسكنة" },
              { value: "مضادات حيوية", label: "مضادات حيوية" },
              { value: "مسكنات قوية", label: "مسكنات قوية" },
              { value: "أدوية السكري", label: "أدوية السكري" },
              { value: "أدوية القلب", label: "أدوية القلب" },
              { value: "أدوية الضغط", label: "أدوية الضغط" }
            ]}
            onChange={(value) => handleInputChange("category", value)}
            placeholder="اختر التصنيف..."
            searchPlaceholder="ابحث عن التصنيف..."
          />
          <ComboBox
            label="الشركة المنتجة"
            value={item.manufacturer}
            options={[
              { value: "شركة الدواء", label: "شركة الدواء" },
              { value: "شركة الصحة", label: "شركة الصحة" },
              { value: "شركة الأدوية", label: "شركة الأدوية" },
              { value: "شركة العلاج", label: "شركة العلاج" }
            ]}
            onChange={(value) => handleInputChange("manufacturer", value)}
            placeholder="اختر الشركة..."
            searchPlaceholder="ابحث عن الشركة..."
          />
          <div>
            <Label className="text-right block mb-1">رصيد المخزن</Label>
            <Input
              type="number"
              value={item.warehouseBalance}
              onChange={(e) => handleInputChange("warehouseBalance", parseInt(e.target.value) || 0)}
              className="pr-8"
              placeholder="أدخل الكمية..."
            />
          </div>
          <div>
            <Label className="text-right block mb-1">السعر</Label>
            <Input
              type="number"
              step="0.01"
              value={item.price}
              onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
              className="pr-8"
              placeholder="أدخل السعر..."
            />
          </div>
        </div>
      </div>

      {/* Additional Fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-right block mb-1">الإجمالي</Label>
          <Input
            value={item.total.toFixed(2)}
            disabled
            className="pr-8 bg-gray-100"
            placeholder="يتم حسابه تلقائياً..."
          />
        </div>
        <div>
          <Label className="text-right block mb-1">آخر تحديث</Label>
          <Input
            value={new Date(item.lastUpdated).toLocaleString('ar-EG')}
            disabled
            className="pr-8 bg-gray-100"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label className="text-right block mb-1">ملاحظات</Label>
        <textarea
          value={item.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md resize-none"
          rows={3}
          placeholder="أدخل أي ملاحظات إضافية..."
        />
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
    </div>
  )
}

export default function InventoryQtyFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InventoryQtyFormContent />
    </Suspense>
  )
}
