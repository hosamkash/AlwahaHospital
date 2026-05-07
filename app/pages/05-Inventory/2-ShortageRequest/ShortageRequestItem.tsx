"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Save, 
  X, 
  Check, 
  Mail, 
  RefreshCw,
  Filter,
  Plus
} from "lucide-react"
import { 
  ShortageRequestDetails, 
  ShortageRequestItem as ShortageItem 
} from "./ShortageRequestController"
import ProductSelectionDialog from "@/components/ProductSelectionDialog"

interface ShortageRequestItemProps {
  selectedRequest: ShortageRequestDetails
  isNewRequest: boolean
  onClose: () => void
  onSave: (request: ShortageRequestDetails) => void
}

export default function ShortageRequestItem({
  selectedRequest,
  isNewRequest,
  onClose,
  onSave,
}: ShortageRequestItemProps) {
  const [request, setRequest] = useState<ShortageRequestDetails>(selectedRequest)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setRequest(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleItemChange = (itemId: number, field: string, value: string | boolean | number) => {
    setRequest(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleSave = () => {
    onSave(request)
  }

  // إضافة الأصناف المختارة للطلب
  const handleSelectProducts = (products: any[]) => {
    const newItems = products.map((product, index) => ({
      id: Date.now() + index, // إنشاء ID فريد
      barcode: product.barcode,
      item: product.name,
      category: product.category,
      unit: product.unit,
      priceCategory: product.priceCategory,
      requiredBalance: product.currentBalance,
      requiredQuantity: product.selectedQuantity || 1,
      disbursedBalance: 0,
      disbursedQuantity: 0,
      quantityDifference: 0,
      isPrepared: false,
      preparationNotes: "",
      receivedQuantity: 0,
      receivingDifference: 0,
      receivingMatches: false,
      receivingNotes: ""
    }))

    setRequest(prev => ({
      ...prev,
      items: [...prev.items, ...newItems]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">بيانات (طلب) نواقص الأصناف (تجهيز - إرسال - إستلام)</h2>
          <div className="text-sm text-gray-600">
            <div>حالة الطلب</div>
            <div className="font-medium">{request.orderStatus}</div>
          </div>
        </div>
        <Button variant="outline" onClick={onClose}>
          <X className="w-4 h-4 ml-2" />
          إغلاق
        </Button>
      </div>

      {/* Order Details Panel */}
      <div className="grid grid-cols-3 gap-6">
        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">بيانات الطلب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>الكود</Label>
                <Input
                  value={request.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                />
              </div>
              <div>
                <Label>التاريخ</Label>
                <Input
                  type="date"
                  value={request.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>الفرع</Label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={request.branch}
                onChange={(e) => handleInputChange("branch", e.target.value)}
              >
                <option value="">اختر الفرع</option>
                <option value="الفرع الرئيسي">الفرع الرئيسي</option>
                <option value="فرع المحلة">فرع المحلة</option>
                <option value="فرع طنطا">فرع طنطا</option>
              </select>
            </div>
            <div>
              <Label>المخزن</Label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={request.warehouse}
                onChange={(e) => handleInputChange("warehouse", e.target.value)}
              >
                <option value="">اختر المخزن</option>
                <option value="المخزن الرئيسي">المخزن الرئيسي</option>
                <option value="مخزن المحلة">مخزن المحلة</option>
                <option value="مخزن طنطا">مخزن طنطا</option>
              </select>
            </div>
            <div>
              <Label>الموظف</Label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={request.employee}
                onChange={(e) => handleInputChange("employee", e.target.value)}
              >
                <option value="">اختر الموظف</option>
                <option value="أحمد محمد">أحمد محمد</option>
                <option value="سارة أحمد">سارة أحمد</option>
                <option value="محمد علي">محمد علي</option>
              </select>
            </div>
            <div>
              <Label>ملاحظات</Label>
              <Textarea
                value={request.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preparation Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">التجهيز</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={request.prepareFromMainWarehouse}
                onChange={(e) => handleInputChange("prepareFromMainWarehouse", e.target.checked)}
              />
              <Label>تجهيز الأصناف من المخزن الرئيسي</Label>
            </div>
            <div>
              <Label>الفرع</Label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={request.prepBranch}
                onChange={(e) => handleInputChange("prepBranch", e.target.value)}
              >
                <option value="">اختر الفرع</option>
                <option value="الفرع الرئيسي">الفرع الرئيسي</option>
                <option value="فرع المحلة">فرع المحلة</option>
              </select>
            </div>
            <div>
              <Label>المخزن</Label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={request.prepWarehouse}
                onChange={(e) => handleInputChange("prepWarehouse", e.target.value)}
              >
                <option value="">اختر المخزن</option>
                <option value="المخزن الرئيسي">المخزن الرئيسي</option>
                <option value="مخزن المحلة">مخزن المحلة</option>
              </select>
            </div>
            <div>
              <Label>الموظف</Label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={request.prepEmployee}
                onChange={(e) => handleInputChange("prepEmployee", e.target.value)}
              >
                <option value="">اختر الموظف</option>
                <option value="أحمد محمد">أحمد محمد</option>
                <option value="سارة أحمد">سارة أحمد</option>
              </select>
            </div>
            <div>
              <Label>ملاحظات</Label>
              <Textarea
                value={request.prepNotes}
                onChange={(e) => handleInputChange("prepNotes", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sending and Receiving Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الإرسال والإستلام</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={request.sendPreparedOrder}
                onChange={(e) => handleInputChange("sendPreparedOrder", e.target.checked)}
              />
              <Label>إرسال الطلب المجهز</Label>
            </div>
            <div>
              <Label>مندوب التوصيل - السائق</Label>
              <Input
                value={request.deliveryDriver}
                onChange={(e) => handleInputChange("deliveryDriver", e.target.value)}
                placeholder="اختر السائق"
              />
            </div>
            <div>
              <Label>ملاحظات الإرسال</Label>
              <Textarea
                value={request.sendingNotes}
                onChange={(e) => handleInputChange("sendingNotes", e.target.value)}
                rows={2}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={request.receiveSentOrder}
                onChange={(e) => handleInputChange("receiveSentOrder", e.target.checked)}
              />
              <Label>إستلام الطلب المرسل</Label>
            </div>
            <div>
              <Label>الموظف المستلم</Label>
              <Input
                value={request.receivingEmployee}
                onChange={(e) => handleInputChange("receivingEmployee", e.target.value)}
                placeholder="اختر الموظف"
              />
            </div>
            <div>
              <Label>ملاحظات الإستلام</Label>
              <Textarea
                value={request.receivingNotes}
                onChange={(e) => handleInputChange("receivingNotes", e.target.value)}
                rows={2}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={request.hideZeroBalances}
                onChange={(e) => handleInputChange("hideZeroBalances", e.target.checked)}
              />
              <Label>إخفاء الأرصدة = 0</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">الأصناف المطلوبة</CardTitle>
            <Button 
              className="bg-primary"
              onClick={() => setIsProductDialogOpen(true)}
            >
              <Plus className="w-4 h-4 ml-2" />
              اختيار أصناف
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-700">#</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الباركود</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الصنف</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">التصنيف</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الوحدة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">فئة السعر</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">رصيد المطلوب</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية المطلوبة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">رصيد المنصرف</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية المنصرفة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">فرق الكمية</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">تم التجهيز</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">ملاحظة التجهيز</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية المستلمة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">فرق الإستلام</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الإستلام مطابق</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">ملاحظة الإستلام</th>
                </tr>
              </thead>
              <tbody>
                {request.items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm">{index + 1}</td>
                    <td className="py-3 px-4 text-sm font-mono">{item.barcode}</td>
                    <td className="py-3 px-4 text-sm font-medium">{item.item}</td>
                    <td className="py-3 px-4 text-sm">{item.category}</td>
                    <td className="py-3 px-4 text-sm">{item.unit}</td>
                    <td className="py-3 px-4 text-sm">{item.priceCategory}</td>
                    <td className="py-3 px-4 text-sm">{item.requiredBalance}</td>
                    <td className="py-3 px-4 text-sm">
                      <Input
                        type="number"
                        value={item.requiredQuantity}
                        onChange={(e) => handleItemChange(item.id, "requiredQuantity", parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm">{item.disbursedBalance}</td>
                    <td className="py-3 px-4 text-sm">
                      <Input
                        type="number"
                        value={item.disbursedQuantity}
                        onChange={(e) => handleItemChange(item.id, "disbursedQuantity", parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm">{item.quantityDifference}</td>
                    <td className="py-3 px-4 text-sm">
                      <input
                        type="checkbox"
                        checked={item.isPrepared}
                        onChange={(e) => handleItemChange(item.id, "isPrepared", e.target.checked)}
                      />
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Input
                        value={item.preparationNotes}
                        onChange={(e) => handleItemChange(item.id, "preparationNotes", e.target.value)}
                        className="w-32"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Input
                        type="number"
                        value={item.receivedQuantity}
                        onChange={(e) => handleItemChange(item.id, "receivedQuantity", parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm">{item.receivingDifference}</td>
                    <td className="py-3 px-4 text-sm">
                      <input
                        type="checkbox"
                        checked={item.receivingMatches}
                        onChange={(e) => handleItemChange(item.id, "receivingMatches", e.target.checked)}
                      />
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Input
                        value={item.receivingNotes}
                        onChange={(e) => handleItemChange(item.id, "receivingNotes", e.target.value)}
                        className="w-32"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button className="bg-primary" onClick={handleSave}>
          <Save className="w-4 h-4 ml-2" />
          حفظ
        </Button>
        <Button className="bg-primary">
          <Save className="w-4 h-4 ml-2" />
          إنهاء الطلب
        </Button>
        <Button className="bg-yellow-600 hover:bg-yellow-700">
          <Check className="w-4 h-4 ml-2" />
          تم التجهيز
        </Button>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Mail className="w-4 h-4 ml-2" />
          تم الإرسال
        </Button>
        <Button className="bg-primary">
          <Check className="w-4 h-4 ml-2" />
          تم الإستلام
        </Button>
        <Button variant="outline">
          <X className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 ml-2" />
          تصحيح الكميات (إرجاع)
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
