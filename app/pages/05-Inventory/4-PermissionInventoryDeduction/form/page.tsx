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
  PermissionInventoryDeductionDetails, 
  PermissionInventoryDeductionItem as PermissionItem,
  defaultPermissionInventoryDeductionDetails,
  usePermissionInventoryDeductionController
} from "../PermissionInventoryDeductionController"
import ProductSelectionDialog from "@/components/ProductSelectionDialog"
import ComboBox from "@/components/ComboBox"

function PermissionInventoryDeductionFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const permissionId = searchParams.get('id')
  const isViewMode = searchParams.get('view') === 'true'

  const { permissionInventoryDeduction, handleSavePermission } = usePermissionInventoryDeductionController()

  const [permission, setPermission] = useState<PermissionInventoryDeductionDetails | null>(null)
  const [isNewPermission, setIsNewPermission] = useState(false)
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
    { value: "تم الموافقة", label: "تم الموافقة" },
    { value: "قيد التنفيذ", label: "قيد التنفيذ" },
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
    if (permissionId) {
      const existingPermission = permissionInventoryDeduction.find(perm => perm.id === parseInt(permissionId))
      if (existingPermission) {
        // For editing, load existing data and convert to PermissionInventoryDeductionDetails
        setPermission({
          ...defaultPermissionInventoryDeductionDetails,
          ...existingPermission,
          employee: existingPermission.responsibleEmployee, // Map responsibleEmployee to employee
          items: defaultPermissionInventoryDeductionDetails.items // Keep default items for now, or load actual items if available
        })
        setIsNewPermission(false)
      } else {
        // If ID is provided but not found, treat as new or redirect
        console.warn(`Permission with ID ${permissionId} not found. Initializing as new permission.`)
        setPermission({
          ...defaultPermissionInventoryDeductionDetails,
          id: Date.now(),
          code: `PD${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        })
        setIsNewPermission(true)
      }
    } else {
      // For new permission
      setPermission({
        ...defaultPermissionInventoryDeductionDetails,
        id: Date.now(),
        code: `PD${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      })
      setIsNewPermission(true)
    }
  }, [permissionId, permissionInventoryDeduction])

  if (!permission) {
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
    setPermission(prev => {
      if (!prev) return null
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const handleItemChange = (itemId: number, field: string, value: string | boolean | number) => {
    setPermission(prev => {
      if (!prev) return null
      return {
        ...prev,
        items: prev.items.map(item =>
          item.id === itemId ? { ...item, [field]: value } : item
        )
      }
    })
  }

  const handleSave = () => {
    if (permission) {
      handleSavePermission(permission)
      router.push('/admin/05-Inventory/4-PermissionInventoryDeduction/list')
    }
  }

  const handleClose = () => {
    router.back()
  }

  // إضافة الأصناف المختارة للطلب
  const handleSelectProducts = (products: any[]) => {
    const newItems = products.map((product, index) => ({
      id: Date.now() + index, // إنشاء ID فريد
      barcode: product.barcode,
      item: product.name,
      category: product.category,
      manufacturer: product.manufacturer,
      unit: product.unit,
      priceCategory: product.priceCategory,
      balance: product.currentBalance,
      quantity: product.selectedQuantity || 1,
      price: product.price,
      total: (product.selectedQuantity || 1) * product.price
    }))

    setPermission(prev => {
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
          {isNewPermission ? "إضافة إذن خصم جديد" : isViewMode ? "عرض إذن الخصم" : "تعديل بيانات إذن الخصم"}
        </h2>
        <div className="flex items-center gap-2">
          {!isViewMode && (
            <Button 
              className="bg-primary"
              onClick={() => setIsProductDialogOpen(true)}
            >
              <Plus className="w-4 h-4 ml-2" />
              اختيار أصناف
            </Button>
          )}
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
          <ComboBox
            label="الفرع"
            value={permission.branch}
            options={branchOptions}
            onChange={(value) => handleInputChange("branch", value)}
            placeholder="اختر الفرع..."
            searchPlaceholder="ابحث عن الفرع..."
          />
          <ComboBox
            label="المخزن"
            value={permission.warehouse}
            options={warehouseOptions}
            onChange={(value) => handleInputChange("warehouse", value)}
            placeholder="اختر المخزن..."
            searchPlaceholder="ابحث عن المخزن..."
          />
          <ComboBox
            label="القائم بالطلب"
            value={permission.employee}
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
                value={permission.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="pr-8"
                readOnly={isViewMode}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <ComboBox
            label="حالة الإذن"
            value={permission.orderStatus}
            options={statusOptions}
            onChange={(value) => handleInputChange("orderStatus", value)}
            placeholder="اختر الحالة..."
            searchPlaceholder="ابحث عن الحالة..."
          />
          <div>
            <Label className="text-right block mb-1">ملاحظات</Label>
            <div className="relative">
              <Input
                value={permission.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="pr-8"
                readOnly={isViewMode}
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
            <Label className="text-right block mb-1">التاريخ</Label>
            <div className="relative">
              <Input
                type="date"
                value={permission.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="pr-8"
                readOnly={isViewMode}
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
                value={permission.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="pr-8"
                readOnly={isViewMode}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                <th className="text-right py-3 px-4 font-medium text-gray-700">التصنيف</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الشركة المنتجة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">فئة السعر</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الوحدة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الرصيد</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">السعر</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {permission.items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{index + 1}</td>
                  <td className="py-3 px-4 text-sm font-mono">{item.barcode}</td>
                  <td className="py-3 px-4 text-sm font-medium">{item.item}</td>
                  <td className="py-3 px-4 text-sm">{item.category}</td>
                  <td className="py-3 px-4 text-sm">{item.manufacturer}</td>
                  <td className="py-3 px-4 text-sm">{item.priceCategory}</td>
                  <td className="py-3 px-4 text-sm">{item.unit}</td>
                  <td className="py-3 px-4 text-sm">{item.balance}</td>
                  <td className="py-3 px-4 text-sm">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, "quantity", parseInt(e.target.value) || 0)}
                      className="w-20"
                      readOnly={isViewMode}
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(item.id, "price", parseFloat(e.target.value) || 0)}
                      className="w-20"
                      readOnly={isViewMode}
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{item.total}</td>
                </tr>
              ))}
              {permission.items.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-gray-500">
                    لا توجد أصناف مضافة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      {!isViewMode && (
        <div className="flex items-center justify-center gap-4">
          <Button className="bg-primary" onClick={handleSave}>
            حفظ
          </Button>
          <Button variant="outline" onClick={handleClose}>
            إلغاء
          </Button>
        </div>
      )}

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

export default function PermissionInventoryDeductionFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PermissionInventoryDeductionFormContent />
    </Suspense>
  )
}
