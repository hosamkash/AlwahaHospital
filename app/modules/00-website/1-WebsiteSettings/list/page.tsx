"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Settings,
  Globe,
  Monitor
} from "lucide-react"

// Mock data
const websiteSettings = [
  {
    id: 1,
    name: "إعدادات الموقع الرئيسي",
    type: "عام",
    status: "نشط",
    lastModified: "2024-01-15",
    description: "إعدادات عامة للموقع الرئيسي"
  },
  {
    id: 2,
    name: "إعدادات التصميم",
    type: "تصميم",
    status: "نشط",
    lastModified: "2024-01-14",
    description: "إعدادات الألوان والخطوط"
  },
  {
    id: 3,
    name: "إعدادات SEO",
    type: "تحسين",
    status: "غير نشط",
    lastModified: "2024-01-13",
    description: "إعدادات محركات البحث"
  }
]

export default function WebsiteSettingsListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSettings, setSelectedSettings] = useState<number[]>([])
  const router = useRouter()

  const filteredSettings = websiteSettings.filter(setting =>
    setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setting.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNewSettingClick = () => {
    router.push('/modules/00-website/1-WebsiteSettings/form')
  }

  const handleEditSettingClick = (id: number) => {
    router.push(`/modules/00-website/1-WebsiteSettings/form?id=${id}`)
  }

  const handleDeleteSetting = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الإعداد؟')) {
      // Delete logic here
      console.log('Delete setting:', id)
    }
  }

  const toggleSelection = (id: number) => {
    setSelectedSettings(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleBulkDelete = () => {
    if (selectedSettings.length === 0) return
    if (confirm(`هل أنت متأكد من حذف ${selectedSettings.length} إعداد؟`)) {
      // Bulk delete logic here
      console.log('Bulk delete:', selectedSettings)
      setSelectedSettings([])
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">إعدادات الموقع</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-primary" onClick={handleNewSettingClick}>
            <Plus className="w-4 h-4 ml-2" />
            جديد
          </Button>
          <Button variant="outline">
            <Edit className="w-4 h-4 ml-2" />
            تعديل
          </Button>
          <Button variant="outline" onClick={handleBulkDelete} disabled={selectedSettings.length === 0}>
            <Trash2 className="w-4 h-4 ml-2" />
            حذف المحدد
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الإعدادات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">المجموع: {filteredSettings.length}</span>
          <span className="text-sm text-gray-600">المحدد: {selectedSettings.length}</span>
        </div>
      </div>

      {/* Settings List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            قائمة الإعدادات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الوصف</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">آخر تعديل</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">النوع</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">اسم الإعداد</th>
                </tr>
              </thead>
              <tbody>
                {filteredSettings.map((setting) => (
                  <tr 
                    key={setting.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEditSettingClick(setting.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedSettings.includes(setting.id)}
                          onChange={(e) => {
                            e.stopPropagation()
                            toggleSelection(setting.id)
                          }}
                          className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteSetting(setting.id)
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{setting.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{setting.lastModified}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        setting.status === 'نشط' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {setting.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{setting.type}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{setting.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
