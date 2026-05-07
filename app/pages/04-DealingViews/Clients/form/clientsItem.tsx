"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Save,
  X,
  Printer,
} from "lucide-react"
import ClientContextMenu from "../list/clientContextMenu"
import { 
  Client, 
  branches, 
  priceCategories, 
  balanceTypes,
  clientUtils 
} from "../list/clientsController"

interface ClientsItemProps {
  selectedClient: Client | null
  isNewClient: boolean
  onClose: () => void
  onSave?: (client: Client) => void
}

export default function ClientsItem({
  selectedClient,
  isNewClient,
  onClose,
  onSave,
}: ClientsItemProps) {
  const [clientData, setClientData] = useState<Client>(selectedClient || {
    id: 0,
    branch: "مكه العمومي",
    code: 0,
    name: "",
    currentBalance: 0.00,
    balanceType: "مدين (عليه)",
    mobile: "",
    phone: "",
    address: "",
    creditLimit: 0.00,
    priceCategory: "0.00 سعر العملاء",
    active: true,
    notes: ""
  })

  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
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

  const handleInputChange = (field: keyof Client, value: any) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(clientData)
    }
  }

  // فتح القائمة المنسدلة
  const handleOpenContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
    setShowContextMenu(true)
  }

  // إغلاق القائمة المنسدلة
  const handleCloseContextMenu = () => {
    setShowContextMenu(false)
  }

  // معالجة اختيار عنصر من القائمة المنسدلة
  const handleContextMenuAction = (actionId: string) => {
    console.log(`تم اختيار: ${actionId} للعميل:`, clientData.name)
    // هنا سيتم إضافة المنطق الخاص بكل إجراء
    handleCloseContextMenu()
  }



  if (!selectedClient) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewClient ? "إضافة عميل جديد" : "تعديل بيانات العميل"}
          </h2>
          <div className="flex items-center gap-2">
            <Button 
              className="text-white"
              style={{ backgroundColor: moduleColor }}
              onClick={handleSave}
            >
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button 
              className="text-white"
              style={{ backgroundColor: moduleColor }}
              onClick={handleOpenContextMenu}
            >
              <User className="w-4 h-4 ml-2" />
              إدارة العميل
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
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-6">بيانات العملاء</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الفرع */}
            <div>
              <Label htmlFor="branch" className="text-right block mb-2">الفرع</Label>
              <div className="relative">
                <select 
                  id="branch" 
                  value={clientData.branch}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-red-600"
                >
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* الكود */}
            <div>
              <Label htmlFor="code" className="text-right block mb-2">الكود</Label>
              <Input 
                id="code" 
                type="number"
                value={clientData.code}
                onChange={(e) => handleInputChange('code', parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>

            {/* نشط */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={clientData.active}
                onChange={(e) => handleInputChange('active', e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
              <Label htmlFor="active" className="text-right">نشط</Label>
            </div>

            {/* الإسم */}
            <div>
              <Label htmlFor="name" className="text-right block mb-2">الإسم</Label>
              <Input 
                id="name" 
                value={clientData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* الموبيل */}
            <div>
              <Label htmlFor="mobile" className="text-right block mb-2">الموبيل</Label>
              <Input 
                id="mobile" 
                value={clientData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* الهاتف */}
            <div>
              <Label htmlFor="phone" className="text-right block mb-2">الهاتف</Label>
              <Input 
                id="phone" 
                value={clientData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* العنوان */}
            <div className="md:col-span-2">
              <Label htmlFor="address" className="text-right block mb-2">العنوان</Label>
              <Textarea 
                id="address" 
                value={clientData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>

            {/* فئة السعر */}
            <div>
              <Label htmlFor="priceCategory" className="text-right block mb-2">فئة السعر</Label>
              <div className="relative">
                <select 
                  id="priceCategory" 
                  value={clientData.priceCategory}
                  onChange={(e) => handleInputChange('priceCategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* حد الإئتمان */}
            <div>
              <Label htmlFor="creditLimit" className="text-right block mb-2">حد الإئتمان</Label>
              <Input 
                id="creditLimit" 
                type="number"
                step="0.01"
                value={clientData.creditLimit}
                onChange={(e) => handleInputChange('creditLimit', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>

            {/* الرصيد الحالي */}
            <div>
              <Label htmlFor="currentBalance" className="text-right block mb-2">الرصيد الحالي</Label>
              <Input 
                id="currentBalance" 
                type="number"
                step="0.01"
                value={clientData.currentBalance}
                onChange={(e) => handleInputChange('currentBalance', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>

            {/* نوع الرصيد */}
            <div>
              <Label htmlFor="balanceType" className="text-right block mb-2">نوع الرصيد</Label>
              <div className="relative">
                <select 
                  id="balanceType" 
                  value={clientData.balanceType}
                  onChange={(e) => handleInputChange('balanceType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {balanceTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ملاحظات */}
            <div className="md:col-span-2">
              <Label htmlFor="notes" className="text-right block mb-2">ملاحظات</Label>
              <Textarea 
                id="notes" 
                value={clientData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-gray-300" onClick={onClose}>
            <X className="w-4 h-4 ml-2" />
            إلغاء
          </Button>
          <Button 
            className="text-white" 
            style={{ backgroundColor: moduleColor }}
            onClick={handleSave}
          >
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
        </div>
      </div>

      {/* Context Menu */}
      <ClientContextMenu
        isOpen={showContextMenu}
        position={contextMenuPosition}
        onClose={handleCloseContextMenu}
        onAction={handleContextMenuAction}
      />
    </>
  )
}
