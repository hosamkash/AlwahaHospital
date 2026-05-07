"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  X,
  Save,
  Settings,
  Globe,
  Monitor,
  Palette,
  Code
} from "lucide-react"

interface WebsiteSetting {
  id?: number
  name: string
  type: string
  status: string
  description: string
  value: string
  category: string
}

function WebsiteSettingsFormContent() {
  const [setting, setSetting] = useState<WebsiteSetting>({
    name: "",
    type: "",
    status: "نشط",
    description: "",
    value: "",
    category: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const isNewSetting = !id

  useEffect(() => {
    if (id) {
      // Load existing setting data
      // This would typically be an API call
      console.log('Loading setting with id:', id)
      // Mock data for editing
      setSetting({
        id: parseInt(id),
        name: "إعدادات الموقع الرئيسي",
        type: "عام",
        status: "نشط",
        description: "إعدادات عامة للموقع الرئيسي",
        value: "قيمة الإعداد",
        category: "عام"
      })
    }
  }, [id])

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Saving setting:', setting)
      setIsLoading(false)
      router.push('/modules/00-website/1-WebsiteSettings/list')
    }, 1000)
  }

  const handleClose = () => {
    router.push('/modules/00-website/1-WebsiteSettings/list')
  }

  const settingTypes = [
    { value: "عام", label: "إعدادات عامة", icon: Settings },
    { value: "تصميم", label: "إعدادات التصميم", icon: Palette },
    { value: "تحسين", label: "إعدادات التحسين", icon: Code },
    { value: "أمان", label: "إعدادات الأمان", icon: Monitor }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {isNewSetting ? "إضافة إعداد موقع جديد" : "تعديل إعداد الموقع"}
        </h2>
        <div className="flex items-center gap-2">
          <Button className="bg-primary" onClick={handleSave}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
          <Button variant="outline" onClick={handleClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        </div>
      )}

      {/* Form Content */}
      {!isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">اسم الإعداد</Label>
                <Input
                  id="name"
                  value={setting.name}
                  onChange={(e) => setSetting({ ...setting, name: e.target.value })}
                  placeholder="أدخل اسم الإعداد"
                />
              </div>

              <div>
                <Label htmlFor="type">نوع الإعداد</Label>
                <select
                  id="type"
                  value={setting.type}
                  onChange={(e) => setSetting({ ...setting, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">اختر نوع الإعداد</option>
                  {settingTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="category">الفئة</Label>
                <Input
                  id="category"
                  value={setting.category}
                  onChange={(e) => setSetting({ ...setting, category: e.target.value })}
                  placeholder="أدخل فئة الإعداد"
                />
              </div>

              <div>
                <Label htmlFor="status">الحالة</Label>
                <select
                  id="status"
                  value={setting.status}
                  onChange={(e) => setSetting({ ...setting, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="نشط">نشط</option>
                  <option value="غير نشط">غير نشط</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Setting Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                تفاصيل الإعداد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">وصف الإعداد</Label>
                <Textarea
                  id="description"
                  value={setting.description}
                  onChange={(e) => setSetting({ ...setting, description: e.target.value })}
                  placeholder="أدخل وصفاً مفصلاً للإعداد..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="value">قيمة الإعداد</Label>
                <Textarea
                  id="value"
                  value={setting.value}
                  onChange={(e) => setSetting({ ...setting, value: e.target.value })}
                  placeholder="أدخل قيمة الإعداد..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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

export default function WebsiteSettingsFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WebsiteSettingsFormContent />
    </Suspense>
  )
}
