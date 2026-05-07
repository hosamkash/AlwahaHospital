"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  User,
  Camera,
  Upload,
  Printer,
  Save,
  X,
  Trash2,
  Calendar,
} from "lucide-react"
import { 
  Hospital, 
  tabData, 
  companyManagers, 
  contactFields, 
  licenseFields,
  hospitalUtils 
} from "../list/HospitalsAndBranchesController"

interface HospitalsAndBranchesItemProps {
  selectedHospital: Hospital | null
  isNewHospital: boolean
  onClose: () => void
  onSave?: (hospital: Hospital) => void
}

export default function HospitalsAndBranchesItem({
  selectedHospital,
  isNewHospital,
  onClose,
  onSave,
}: HospitalsAndBranchesItemProps) {
  const [activeTab, setActiveTab] = useState("contact")
  const [logoImage, setLogoImage] = useState<string | null>(null)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name, file.type, file.size)
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('يرجى اختيار ملف صورة صحيح')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        console.log('File read successfully, setting logo image')
        setLogoImage(result)
      }
      reader.onerror = () => {
        console.error('Error reading file')
        alert('خطأ في قراءة الملف')
      }
      reader.readAsDataURL(file)
    } else {
      console.log('No file selected')
    }
  }

  const handleRemoveLogo = () => {
    setLogoImage(null)
    // Reset the file input
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  if (!selectedHospital) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewHospital ? "إضافة مستشفى جديد" : "تعديل بيانات المستشفى"}
          </h2>
          <div className="flex items-center gap-2">
          <Button className="bg-primary">            
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300">
              <Printer className="w-4 h-4 ml-2" />
              طباعة
            </Button>
            <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={onClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 p-6 rounded-b-lg">
        {/* Company Identification Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="flex gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 relative overflow-hidden group">
                  {logoImage ? (
                    <div className="w-full h-full flex items-center justify-center bg-white">
                      <img 
                        src={logoImage} 
                        alt="Company Logo" 
                        className="w-full h-full object-contain"
                        style={{ 
                          display: 'block',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                        onLoad={() => console.log('Image loaded successfully')}
                        onError={(e) => {
                          console.error('Image failed to load')
                          alert('فشل في تحميل الصورة')
                          setLogoImage(null)
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">اضغط لرفع اللوجو</p>
                      <p className="text-xs text-gray-400">JPG, PNG, GIF</p>
                    </div>
                  )}
                  
                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleLogoUpload}
                  />
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2 mt-3 justify-center">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Upload className="w-3 h-3 ml-1" />
                    رفع
                  </Button>
                  {logoImage && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      onClick={handleRemoveLogo}
                    >
                      <Trash2 className="w-3 h-3 ml-1" />
                      حذف
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company-code">كود الشركة</Label>
                <Input id="company-code" defaultValue={selectedHospital.code} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="company-name">إسم الشركة</Label>
                <Input id="company-name" defaultValue={selectedHospital.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="company-manager">مدير الشركة</Label>
                <div className="relative mt-1">
                                     <select 
                     id="company-manager" 
                     defaultValue={selectedHospital.manager}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   >
                     <option value="">اختر مدير الشركة</option>
                     {companyManagers.map((manager) => (
                       <option key={manager} value={manager}>{manager}</option>
                     ))}
                   </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
                         {activeTab === "contact" && (
               <div className="space-y-4">
                 {contactFields.map((field) => (
                                     <div key={field.label} className="flex items-center gap-3">
                     <span className="text-yellow-500 text-lg">+</span>
                     <Label className="w-32 text-right">{field.label}</Label>
                     <Input defaultValue={selectedHospital[field.value as keyof Hospital] as string} className="flex-1" />
                   </div>
                ))}
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-lg mt-3">+</span>
                  <Label className="w-32 text-right mt-3">العنوان</Label>
                  <Textarea defaultValue={selectedHospital.address} className="flex-1" rows={3} />
                </div>
              </div>
            )}

                         {activeTab === "license" && (
               <div className="space-y-4">
                 {licenseFields.map((field) => (
                                     <div key={field.label} className="flex items-center gap-3">
                     <Label className="w-48 text-right">{field.label}</Label>
                     <Input defaultValue={selectedHospital[field.value as keyof Hospital] as string} className="flex-1" />
                   </div>
                ))}
                <div className="flex items-center gap-3">
                  <Label className="w-48 text-right">تاريخ بداية النشاط</Label>
                  <div className="relative flex-1">
                    <Input defaultValue={selectedHospital.activityStartDate} className="pr-8" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-48 text-right">تاريخ إصدار البطاقة</Label>
                  <div className="relative flex-1">
                    <Input defaultValue={selectedHospital.cardIssuanceDate} className="pr-8" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "insurance" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Label className="w-32 text-right">تاريخ التأمين</Label>
                  <div className="relative flex-1">
                    <Input defaultValue={selectedHospital.insuranceDate} placeholder=" / / " className="pr-8" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-32 text-right">الرقم التأميني</Label>
                  <Input defaultValue={selectedHospital.insuranceNumber} className="flex-1" />
                </div>
              </div>
            )}

            
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
          <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300">
            <Printer className="w-4 h-4 ml-2" />
            طباعة
          </Button>
          <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={onClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>
    </>
  )
}