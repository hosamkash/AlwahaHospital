"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { 
  Doctor, 
  tabData, 
  contactFields, 
  medicalFields,
  specializations,
  doctorUtils 
} from "../list/doctorsController"

interface DoctorsItemProps {
  selectedDoctor: Doctor | null
  isNewDoctor: boolean
  onClose: () => void
  onSave?: (doctor: Doctor) => void
}

export default function DoctorsItem({
  selectedDoctor,
  isNewDoctor,
  onClose,
  onSave,
}: DoctorsItemProps) {
  const [activeTab, setActiveTab] = useState("contact")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [moduleColor, setModuleColor] = useState<string>("#f97316") // default orange for dealing views

  // Load module color from localStorage
  useEffect(() => {
    const loadModuleColor = () => {
      try {
        const adminSettings = localStorage.getItem('adminSettingsGroupColors')
        if (adminSettings) {
          const colors = JSON.parse(adminSettings)
          if (colors.dealingViews) {
            setModuleColor(colors.dealingViews)
          }
        }
      } catch (error) {
        console.error('Error loading module color:', error)
      }
    }

    loadModuleColor()

    // Listen for color changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminSettingsGroupColors') {
        loadModuleColor()
      }
    }

    // Listen for custom color change events
    const handleColorChange = () => {
      loadModuleColor()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('moduleColorChanged', handleColorChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('moduleColorChanged', handleColorChange)
    }
  }, [])

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        console.log('File read successfully, setting profile image')
        setProfileImage(result)
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

  const handleRemoveProfile = () => {
    setProfileImage(null)
    // Reset the file input
    const fileInput = document.getElementById('profile-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  if (!selectedDoctor) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewDoctor ? "إضافة طبيب جديد" : "تعديل بيانات الطبيب"}
          </h2>
          <div className="flex items-center gap-2">
            <Button 
              className="text-white"
              style={{ backgroundColor: moduleColor }}
            >
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
        {/* Doctor Identification Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="flex gap-6">
            {/* Doctor Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 relative overflow-hidden group">
                  {profileImage ? (
                    <div className="w-full h-full flex items-center justify-center bg-white">
                      <img 
                        src={profileImage} 
                        alt="Doctor Profile" 
                        className="w-full h-full object-cover rounded-lg"
                        style={{ 
                          display: 'block',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                        onLoad={() => console.log('Image loaded successfully')}
                        onError={(e) => {
                          console.error('Image failed to load')
                          alert('فشل في تحميل الصورة')
                          setProfileImage(null)
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">اضغط لرفع الصورة</p>
                      <p className="text-xs text-gray-400">JPG, PNG, GIF</p>
                    </div>
                  )}
                  
                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleProfileUpload}
                  />
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2 mt-3 justify-center">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                    onClick={() => document.getElementById('profile-upload')?.click()}
                  >
                    <Upload className="w-3 h-3 ml-1" />
                    رفع
                  </Button>
                  {profileImage && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      onClick={handleRemoveProfile}
                    >
                      <Trash2 className="w-3 h-3 ml-1" />
                      حذف
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doctor-code">كود الطبيب</Label>
                <Input id="doctor-code" defaultValue={selectedDoctor.code} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="doctor-name">إسم الطبيب</Label>
                <Input id="doctor-name" defaultValue={selectedDoctor.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="doctor-specialization">التخصص</Label>
                <div className="relative mt-1">
                  <select 
                    id="doctor-specialization" 
                    defaultValue={selectedDoctor.specialization}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">اختر التخصص</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
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
                    <Input defaultValue={selectedDoctor[field.value as keyof Doctor] as string} className="flex-1" />
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-lg mt-3">+</span>
                  <Label className="w-32 text-right mt-3">العنوان</Label>
                  <Textarea defaultValue={selectedDoctor.address} className="flex-1" rows={3} />
                </div>
              </div>
            )}

            {activeTab === "medical" && (
              <div className="space-y-4">
                {medicalFields.map((field) => (
                  <div key={field.label} className="flex items-center gap-3">
                    <Label className="w-48 text-right">{field.label}</Label>
                    {field.value === "consultationFee" ? (
                      <Input 
                        type="number" 
                        defaultValue={selectedDoctor[field.value as keyof Doctor] as number} 
                        className="flex-1" 
                      />
                    ) : (
                      <Input defaultValue={selectedDoctor[field.value as keyof Doctor] as string} className="flex-1" />
                    )}
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <Label className="w-48 text-right mt-3">ملاحظات</Label>
                  <Textarea defaultValue={selectedDoctor.notes} className="flex-1" rows={3} />
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
