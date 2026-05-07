"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { 
  ProductMovementDetails, 
  defaultProductMovements,
  useProductsMovementController
} from "../ProductsMovementController"
import ComboBox from "@/components/ComboBox"

function ProductsMovementFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const movementId = searchParams.get('id')

  const { productMovements, handleSaveMovement } = useProductsMovementController()

  const [movement, setMovement] = useState<ProductMovementDetails | null>(null)
  const [isNewMovement, setIsNewMovement] = useState(false)

  useEffect(() => {
    if (movementId) {
      const existingMovement = productMovements.find(movement => movement.id === parseInt(movementId))
      if (existingMovement) {
        setMovement({
          ...existingMovement,
          notes: "",
          reference: "",
        })
        setIsNewMovement(false)
      } else {
        console.warn(`Movement with ID ${movementId} not found. Initializing as new movement.`)
        setMovement({
          id: Date.now(),
          warehouse: "",
          date: new Date().toISOString().split('T')[0],
          documentType: "",
          balanceBefore: 0,
          quantity: 0,
          balanceAfter: 0,
          price: 0,
          total: 0,
          notes: "",
          reference: "",
        })
        setIsNewMovement(true)
      }
    } else {
      setMovement({
        id: Date.now(),
        warehouse: "",
        date: new Date().toISOString().split('T')[0],
        documentType: "",
        balanceBefore: 0,
        quantity: 0,
        balanceAfter: 0,
        price: 0,
        total: 0,
        notes: "",
        reference: "",
      })
      setIsNewMovement(true)
    }
  }, [movementId, productMovements])

  if (!movement) {
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
    setMovement(prev => {
      if (!prev) return null
      const updatedMovement = { ...prev, [field]: value }
      
      // Calculate balance after when quantity changes
      if (field === 'quantity') {
        updatedMovement.balanceAfter = updatedMovement.balanceBefore + updatedMovement.quantity
      }
      
      // Calculate total when price or quantity changes
      if (field === 'price' || field === 'quantity') {
        updatedMovement.total = updatedMovement.quantity * updatedMovement.price
      }
      
      return updatedMovement
    })
  }

  const handleSave = () => {
    if (movement) {
      handleSaveMovement(movement)
      router.push('/modules/05-Inventory/8-ProductsMovement/list')
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
          {isNewMovement ? "إضافة حركة صنف جديدة" : "تعديل بيانات حركة الصنف"}
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
            label="المخزن"
            value={movement.warehouse}
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
            <Label className="text-right block mb-1">التاريخ</Label>
            <div className="relative">
              <Input
                type="date"
                value={movement.date}
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
          <ComboBox
            label="نوع المستند"
            value={movement.documentType}
            options={[
              { value: "إذن إضافة", label: "إذن إضافة" },
              { value: "طلب نواقص بالإضافة", label: "طلب نواقص بالإضافة" },
              { value: "تحويل أصناف بالزيادة", label: "تحويل أصناف بالزيادة" },
              { value: "تسوية بالزيادة", label: "تسوية بالزيادة" },
              { value: "فاتورة مشتريات", label: "فاتورة مشتريات" },
              { value: "فاتورة مرتجعات مبيعات", label: "فاتورة مرتجعات مبيعات" },
              { value: "جرد يومي بالزيادة", label: "جرد يومي بالزيادة" },
              { value: "فاتورة مرتجعات مخصصة", label: "فاتورة مرتجعات مخصصة" },
              { value: "إذن خصم", label: "إذن خصم" },
              { value: "طلب نواقص بالخصم", label: "طلب نواقص بالخصم" },
              { value: "تحويل أصناف بالنقصان", label: "تحويل أصناف بالنقصان" },
              { value: "تسوية بالنقصان", label: "تسوية بالنقصان" },
              { value: "فاتورة مرتجعات مشتريات", label: "فاتورة مرتجعات مشتريات" },
              { value: "فاتورة مبيعات", label: "فاتورة مبيعات" },
              { value: "فاتورة مندوب", label: "فاتورة مندوب" },
              { value: "فاتورة مبيعات موظف", label: "فاتورة مبيعات موظف" },
              { value: "جرد يومي بالنقصان", label: "جرد يومي بالنقصان" }
            ]}
            onChange={(value) => handleInputChange("documentType", value)}
            placeholder="اختر نوع المستند..."
            searchPlaceholder="ابحث عن نوع المستند..."
          />
          <div>
            <Label className="text-right block mb-1">الرصيد قبل</Label>
            <Input
              type="number"
              value={movement.balanceBefore}
              onChange={(e) => handleInputChange("balanceBefore", parseInt(e.target.value) || 0)}
              className="pr-8"
              placeholder="أدخل الرصيد قبل..."
            />
          </div>
        </div>

        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label className="text-right block mb-1">الكمية</Label>
            <Input
              type="number"
              value={movement.quantity}
              onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 0)}
              className="pr-8"
              placeholder="أدخل الكمية..."
            />
          </div>
          <div>
            <Label className="text-right block mb-1">الرصيد بعد</Label>
            <Input
              value={movement.balanceAfter}
              disabled
              className="pr-8 bg-gray-100"
              placeholder="يتم حسابه تلقائياً..."
            />
          </div>
          <div>
            <Label className="text-right block mb-1">السعر</Label>
            <Input
              type="number"
              step="0.01"
              value={movement.price}
              onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
              className="pr-8"
              placeholder="أدخل السعر..."
            />
          </div>
          <div>
            <Label className="text-right block mb-1">الإجمالي</Label>
            <Input
              value={movement.total.toFixed(2)}
              disabled
              className="pr-8 bg-gray-100"
              placeholder="يتم حسابه تلقائياً..."
            />
          </div>
        </div>
      </div>

      {/* Additional Fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-right block mb-1">المرجع</Label>
          <Input
            value={movement.reference}
            onChange={(e) => handleInputChange("reference", e.target.value)}
            className="pr-8"
            placeholder="أدخل المرجع..."
          />
        </div>
        <div>
          <Label className="text-right block mb-1">ملاحظات</Label>
          <Input
            value={movement.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            className="pr-8"
            placeholder="أدخل الملاحظات..."
          />
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
    </div>
  )
}

export default function ProductsMovementFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsMovementFormContent />
    </Suspense>
  )
}
