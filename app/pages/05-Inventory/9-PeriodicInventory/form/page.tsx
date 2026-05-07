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
  PeriodicInventoryDetails, 
  PeriodicInventoryItem,
  defaultPeriodicInventoryDetails,
  usePeriodicInventoryController
} from "../PeriodicInventoryController"
import ProductSelectionDialog from "@/components/ProductSelectionDialog"
import ComboBox from "@/components/ComboBox"

function PeriodicInventoryFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inventoryId = searchParams.get('id')

  const { periodicInventory, handleSaveInventory } = usePeriodicInventoryController()

  const [inventory, setInventory] = useState<PeriodicInventoryDetails | null>(null)
  const [isNewInventory, setIsNewInventory] = useState(false)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)

  // ComboBox options
  const branchOptions = [
    { value: "مكه العمومي", label: "مكه العمومي" },
    { value: "الرياض العمومي", label: "الرياض العمومي" },
    { value: "جدة العمومي", label: "جدة العمومي" },
    { value: "الدمام العمومي", label: "الدمام العمومي" },
    { value: "الطائف العمومي", label: "الطائف العمومي" }
  ]

  const warehouseOptions = [
    { value: "العمومي", label: "العمومي" },
    { value: "الطوارئ", label: "الطوارئ" },
    { value: "العيادات", label: "العيادات" },
    { value: "العمليات", label: "العمليات" },
    { value: "المخزن الرئيسي", label: "المخزن الرئيسي" }
  ]

  const statusOptions = [
    { value: "قيد الطلب", label: "قيد الطلب" },
    { value: "قيد المراجعة", label: "قيد المراجعة" },
    { value: "مكتمل", label: "مكتمل" },
    { value: "ملغي", label: "ملغي" }
  ]

  const employeeOptions = [
    { value: "أ. عاطف", label: "أ. عاطف" },
    { value: "د. أحمد", label: "د. أحمد" },
    { value: "م. سارة", label: "م. سارة" },
    { value: "أ. محمد", label: "أ. محمد" },
    { value: "د. فاطمة", label: "د. فاطمة" }
  ]

  useEffect(() => {
    if (inventoryId) {
      const existingInventory = periodicInventory.find(inv => inv.id === parseInt(inventoryId))
      if (existingInventory) {
        // For editing, load existing data and convert to PeriodicInventoryDetails
        setInventory({
          ...defaultPeriodicInventoryDetails,
          ...existingInventory,
          employee: existingInventory.responsibleEmployee, // Map responsibleEmployee to employee
          items: defaultPeriodicInventoryDetails.items // Keep default items for now, or load actual items if available
        })
        setIsNewInventory(false)
      } else {
        // If ID is provided but not found, treat as new or redirect
        console.warn(`Inventory with ID ${inventoryId} not found. Initializing as new inventory.`)
        setInventory({
          ...defaultPeriodicInventoryDetails,
          id: Date.now(),
          code: `PI${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        })
        setIsNewInventory(true)
      }
    } else {
      // For new inventory
      setInventory({
        ...defaultPeriodicInventoryDetails,
        id: Date.now(),
        code: `PI${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      })
      setIsNewInventory(true)
    }
  }, [inventoryId, periodicInventory])

  if (!inventory) {
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
    setInventory(prev => {
      if (!prev) return null
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const handleItemChange = (itemId: number, field: string, value: string | boolean | number) => {
    setInventory(prev => {
      if (!prev) return null
      return {
        ...prev,
        items: prev.items.map(item => {
          if (item.id === itemId) {
            const updatedItem = { ...item, [field]: value }
            
            // Calculate deficit and surplus quantities
            const deficitQuantity = Math.max(0, item.bookQuantity - updatedItem.actualQuantity)
            const surplusQuantity = Math.max(0, updatedItem.actualQuantity - item.bookQuantity)
            
            // Calculate total prices
            const totalDeficitPrice = deficitQuantity * updatedItem.price
            const totalSurplusPrice = surplusQuantity * updatedItem.price
            
            return {
              ...updatedItem,
              deficitQuantity,
              surplusQuantity,
              totalDeficitPrice,
              totalSurplusPrice
            }
          }
          return item
        })
      }
    })
  }

  const handleSave = () => {
    if (inventory) {
      handleSaveInventory(inventory)
      router.push('/modules/05-Inventory/9-PeriodicInventory/list')
    }
  }

  const handleClose = () => {
    router.back()
  }

  // إضافة الأصناف المختارة للجرد
  const handleSelectProducts = (products: any[]) => {
    const newItems = products.map((product, index) => ({
      id: Date.now() + index, // إنشاء ID فريد
      barcode: product.barcode,
      item: product.name,
      category: product.category,
      manufacturer: product.manufacturer,
      unit: product.unit,
      priceCategory: product.priceCategory,
      bookQuantity: product.currentBalance || 0,
      actualQuantity: product.currentBalance || 0,
      price: product.price,
      deficitQuantity: 0,
      totalDeficitPrice: 0,
      surplusQuantity: 0,
      totalSurplusPrice: 0
    }))

    setInventory(prev => {
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
          {isNewInventory ? "تفاصيل الجرد الدوري للأصناف" : "تعديل بيانات الجرد الدوري"}
        </h2>
        <div className="flex items-center gap-2">
          <Button 
            className="bg-primary"
            onClick={() => setIsProductDialogOpen(true)}
          >
            <Plus className="w-4 h-4 ml-2" />
            جرد كل الأصناف
          </Button>
          <Button variant="outline" onClick={handleClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>

      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inventory.hideZeroBalances}
              onChange={(e) => handleInputChange("hideZeroBalances", e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">إخفاء الأرصدة = 0</span>
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-3 gap-6">
        {/* Right Column */}
        <div className="space-y-4">
          <ComboBox
            label="الفرع"
            value={inventory.branch}
            options={branchOptions}
            onChange={(value) => handleInputChange("branch", value)}
            placeholder="اختر الفرع..."
            searchPlaceholder="ابحث عن الفرع..."
          />
          <ComboBox
            label="المخزن"
            value={inventory.warehouse}
            options={warehouseOptions}
            onChange={(value) => handleInputChange("warehouse", value)}
            placeholder="اختر المخزن..."
            searchPlaceholder="ابحث عن المخزن..."
          />
          <ComboBox
            label="الموظف"
            value={inventory.employee}
            options={employeeOptions}
            onChange={(value) => handleInputChange("employee", value)}
            placeholder="اختر الموظف..."
            searchPlaceholder="ابحث عن الموظف..."
          />
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          <div>
            <Label className="text-right block mb-1">الكود</Label>
            <div className="relative">
              <Input
                value={inventory.code}
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
          <ComboBox
            label="حالة الجرد"
            value={inventory.adjustmentStatus}
            options={statusOptions}
            onChange={(value) => handleInputChange("adjustmentStatus", value)}
            placeholder="اختر الحالة..."
            searchPlaceholder="ابحث عن الحالة..."
          />
          <div>
            <Label className="text-right block mb-1">ملاحظات</Label>
            <div className="relative">
              <Input
                value={inventory.notes}
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
        </div>

        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label className="text-right block mb-1">الساعة</Label>
            <div className="relative">
              <Input
                type="time"
                value={inventory.time}
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
          <div>
            <Label className="text-right block mb-1">التاريخ</Label>
            <div className="relative">
              <Input
                type="date"
                value={inventory.date}
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
                <th className="text-right py-3 px-4 font-medium text-gray-700">الشركة المنتجة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">التصنيف</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">فئة السعر</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الوحدة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية الدفترية</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية الفعلية</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">السعر</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">كمية النواقص</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">إجمالي سعر النواقص</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">كمية الزيادة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">إجمالي سعر الزيادة</th>
              </tr>
            </thead>
            <tbody>
              {inventory.items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{index + 1}</td>
                  <td className="py-3 px-4 text-sm font-mono">{item.barcode}</td>
                  <td className="py-3 px-4 text-sm font-medium">{item.item}</td>
                  <td className="py-3 px-4 text-sm">{item.manufacturer}</td>
                  <td className="py-3 px-4 text-sm">{item.category}</td>
                  <td className="py-3 px-4 text-sm">{item.priceCategory}</td>
                  <td className="py-3 px-4 text-sm">{item.unit}</td>
                  <td className="py-3 px-4 text-sm">{item.bookQuantity}</td>
                  <td className="py-3 px-4 text-sm">
                    <Input
                      type="number"
                      value={item.actualQuantity}
                      onChange={(e) => handleItemChange(item.id, "actualQuantity", parseInt(e.target.value) || 0)}
                      className="w-20"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(item.id, "price", parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-red-600">{item.deficitQuantity}</td>
                  <td className="py-3 px-4 text-sm font-medium text-red-600">{item.totalDeficitPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm font-medium text-green-600">{item.surplusQuantity}</td>
                  <td className="py-3 px-4 text-sm font-medium text-green-600">{item.totalSurplusPrice.toFixed(2)}</td>
                </tr>
              ))}
              {inventory.items.length === 0 && (
                <tr>
                  <td colSpan={14} className="py-8 text-center text-gray-500">
                    لا توجد أصناف مضافة
                  </td>
                </tr>
              )}
              {/* Summary Row */}
              {inventory.items.length > 0 && (
                <tr className="bg-gray-100 font-medium">
                  <td colSpan={10} className="py-3 px-4 text-sm text-right">المجموع:</td>
                  <td className="py-3 px-4 text-sm text-red-600">
                    {inventory.items.reduce((sum, item) => sum + item.deficitQuantity, 0)}
                  </td>
                  <td className="py-3 px-4 text-sm text-red-600">
                    {inventory.items.reduce((sum, item) => sum + item.totalDeficitPrice, 0).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm text-green-600">
                    {inventory.items.reduce((sum, item) => sum + item.surplusQuantity, 0)}
                  </td>
                  <td className="py-3 px-4 text-sm text-green-600">
                    {inventory.items.reduce((sum, item) => sum + item.totalSurplusPrice, 0).toFixed(2)}
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

export default function PeriodicInventoryFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PeriodicInventoryFormContent />
    </Suspense>
  )
}
