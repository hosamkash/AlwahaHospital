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
  Calendar,
  Eye,
} from "lucide-react"
import { 
  ContractDealing, 
  tabData, 
  generalFields,
  availablePriceLists,
  contractDealingUtils 
} from "../list/contractsController"
import PriceListDialog from "./priceListDialog"

interface ContractsDealingsItemProps {
  selectedContractDealing: ContractDealing | null
  isNewContractDealing: boolean
  onClose: () => void
  onSave?: (contractDealing: ContractDealing) => void
}

export default function ContractsDealingsItem({
  selectedContractDealing,
  isNewContractDealing,
  onClose,
  onSave,
}: ContractsDealingsItemProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [selectedPriceLists, setSelectedPriceLists] = useState<number[]>(
    selectedContractDealing?.selectedPriceLists || []
  )
  const [showPriceListDialog, setShowPriceListDialog] = useState(false)
  const [selectedPriceListForView, setSelectedPriceListForView] = useState<any>(null)
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

  const handlePriceListToggle = (priceListId: number) => {
    setSelectedPriceLists(prev => 
      prev.includes(priceListId)
        ? prev.filter(id => id !== priceListId)
        : [...prev, priceListId]
    )
  }

  const handleViewPriceList = (priceList: any) => {
    setSelectedPriceListForView(priceList)
    setShowPriceListDialog(true)
  }

  const closePriceListDialog = () => {
    setShowPriceListDialog(false)
    setSelectedPriceListForView(null)
  }

  if (!selectedContractDealing) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewContractDealing ? "إضافة جهة تعاقد جديدة" : "تعديل بيانات جهة التعاقد"}
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
                <Label htmlFor="company-code">كود جهة التعاقد</Label>
                <Input id="company-code" defaultValue={selectedContractDealing.code} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="company-name">إسم جهة التعاقد</Label>
                <Input id="company-name" defaultValue={selectedContractDealing.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="company-manager">مدير جهة التعاقد</Label>
                <Input id="company-manager" defaultValue={selectedContractDealing.manager} className="mt-1" />
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
            {activeTab === "general" && (
              <div className="space-y-4">
                {generalFields.map((field) => (
                  <div key={field.label} className="flex items-center gap-3">
                    <span className="text-yellow-500 text-lg">+</span>
                    <Label className="w-48 text-right">{field.label}</Label>
                    <Input defaultValue={selectedContractDealing[field.value as keyof ContractDealing] as string} className="flex-1" />
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-lg mt-3">+</span>
                  <Label className="w-48 text-right mt-3">العنوان</Label>
                  <Textarea defaultValue={selectedContractDealing.address} className="flex-1" rows={3} />
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-48 text-right">تاريخ بداية النشاط</Label>
                  <div className="relative flex-1">
                    <Input defaultValue={selectedContractDealing.activityStartDate} className="pr-8" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-48 text-right">تاريخ إصدار البطاقة</Label>
                  <div className="relative flex-1">
                    <Input defaultValue={selectedContractDealing.cardIssuanceDate} className="pr-8" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-48 text-right">تاريخ التأمين</Label>
                  <div className="relative flex-1">
                    <Input defaultValue={selectedContractDealing.insuranceDate} placeholder=" / / " className="pr-8" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                                 <div className="flex items-center gap-3">
                   <Label className="w-48 text-right">الرقم التأميني</Label>
                   <Input defaultValue={selectedContractDealing.insuranceNumber} className="flex-1" />
                 </div>
               </div>
             )}

             {activeTab === "pricelists" && (
               <div className="space-y-4">
                 <div className="mb-4">
                   <h3 className="text-lg font-semibold text-gray-800 mb-2">اختر قوائم الأسعار المناسبة لجهة التعاقد</h3>
                   <p className="text-sm text-gray-600">يمكنك اختيار أكثر من قائمة سعر واحدة</p>
                 </div>
                 
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availablePriceLists.map((priceList) => (
                      <div key={priceList.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          id={`priceList-${priceList.id}`}
                          checked={selectedPriceLists.includes(priceList.id)}
                          onChange={() => handlePriceListToggle(priceList.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div className="flex-1">
                          <label 
                            htmlFor={`priceList-${priceList.id}`}
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            {priceList.name}
                          </label>
                          <p className="text-xs text-gray-500">كود: {priceList.code}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                          onClick={() => handleViewPriceList(priceList)}
                          title="عرض تفاصيل قائمة الأسعار"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                 
                 {selectedPriceLists.length > 0 && (
                   <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                     <h4 className="text-sm font-medium text-blue-800 mb-2">قوائم الأسعار المختارة:</h4>
                     <div className="flex flex-wrap gap-2">
                       {selectedPriceLists.map((id) => {
                         const priceList = availablePriceLists.find(p => p.id === id)
                         return priceList ? (
                           <span 
                             key={id}
                             className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                           >
                             {priceList.name}
                           </span>
                         ) : null
                       })}
                     </div>
                   </div>
                 )}
               </div>
             )}
           </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2">
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

       {/* Price List Dialog */}
       <PriceListDialog
         priceList={selectedPriceListForView}
         isOpen={showPriceListDialog}
         onClose={closePriceListDialog}
       />
     </>
   )
 }
