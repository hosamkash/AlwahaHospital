"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

function RadiologyFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const isNew = !id

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    active: true,
  })

  useEffect(() => {
    if (!isNew && id) {
      // Load existing radiology data
      const existingData = {
        code: "RAD001",
        name: "أشعة سينية للصدر",
        price: "150.00",
        active: true,
      }
      setFormData(existingData)
    }
  }, [id, isNew])

  const handleSave = () => {
    console.log("Saving radiology:", formData)
    router.push('/modules/03-MedicalDefinition/Radiology/list')
  }

  const handleCancel = () => {
    router.push('/modules/03-MedicalDefinition/Radiology/list')
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {isNew ? "إضافة نوع أشعة جديد" : "تعديل بيانات نوع الأشعة"}
        </h2>
        <div className="flex items-center gap-2">
          <Button className="bg-primary" onClick={handleSave}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 ml-2" />
            إلغاء
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل نوع الأشعة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="radiology-code">كود الأشعة</Label>
              <Input 
                id="radiology-code" 
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="radiology-name">اسم الأشعة</Label>
              <Input 
                id="radiology-name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="radiology-price">السعر</Label>
              <Input 
                id="radiology-price" 
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="radiology-status">الحالة</Label>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="radiology-status"
                  checked={formData.active}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="radiology-status" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button className="bg-primary" onClick={handleSave}>
          <Save className="w-4 h-4 ml-2" />
          حفظ
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          <X className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
      </div>
    </div>
  )
}

export default function RadiologyFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RadiologyFormContent />
    </Suspense>
  )
}

