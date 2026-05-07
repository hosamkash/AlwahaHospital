"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Save,
  X,
  Trash2,
  Printer,
  Package,
  Activity,
  RefreshCw,
} from "lucide-react"
import { 
  Product, 
  productsUtils,
  productClassifications,
  productUnits
} from "../list/productsController"

interface ProductsItemProps {
  selectedProduct?: Product | null
  isNewProduct?: boolean
  onClose: () => void
  onSave?: (product: Product) => void
}

export default function ProductsItem({
  selectedProduct,
  isNewProduct,
  onClose,
  onSave,
}: ProductsItemProps) {
  const [formData, setFormData] = useState<Product>(selectedProduct || {
    id: 0,
    code: "",
    name: "",
    majorUnit: "الدستة",
    conversionFactor: 12,
    minorUnit: "القطعة",
    classification: "",
    active: true,
    displayInSales: true,
         // Major Unit Prices
     majorUnitPurchasePrice: 0.00,
     majorUnitSalePrice1: 0.00,
     majorUnitSalePrice2: 0.00,
     majorUnitSalePrice3: 0.00,
     majorUnitSalePrice4: 0.00,
     majorUnitSalePrice5: 0.00,
     // Major Unit Profits
     majorUnitProfit1: "0.00",
     majorUnitProfit2: "0.00",
     majorUnitProfit3: "0.00",
     majorUnitProfit4: "0.00",
     majorUnitProfit5: "0.00",
     // Major Unit Profit Percentages
     majorUnitProfitPercentage1: "0.0",
     majorUnitProfitPercentage2: "0.0",
     majorUnitProfitPercentage3: "0.0",
     majorUnitProfitPercentage4: "0.0",
     majorUnitProfitPercentage5: "0.0",
     // Minor Unit Prices
     minorUnitPurchasePrice: 0.00,
     minorUnitSalePrice1: 0.00,
     minorUnitSalePrice2: 0.00,
     minorUnitSalePrice3: 0.00,
     minorUnitSalePrice4: 0.00,
     minorUnitSalePrice5: 0.00,
     // Minor Unit Profits
     minorUnitProfit1: "0.00",
     minorUnitProfit2: "0.00",
     minorUnitProfit3: "0.00",
     minorUnitProfit4: "0.00",
     minorUnitProfit5: "0.00",
     // Minor Unit Profit Percentages
     minorUnitProfitPercentage1: "0.0",
     minorUnitProfitPercentage2: "0.0",
     minorUnitProfitPercentage3: "0.0",
     minorUnitProfitPercentage4: "0.0",
     minorUnitProfitPercentage5: "0.0",
    representativeCommission: 0.00,
    managerCommission: 0.00,
    minimumLimit: 0,
    orderLimit: 0
  })

  const handleInputChange = (field: keyof Product, value: string | number | boolean) => {
    setFormData(prev => {
      const updatedData = { ...prev, [field]: value }
      
      // Auto-calculate based on field changes
      if (field === 'majorUnitPurchasePrice') {
        // Calculate minor unit purchase price
        const majorPrice = parseFloat(value as string) || 0
        const conversionFactor = updatedData.conversionFactor || 1
        const minorPrice = conversionFactor > 0 ? majorPrice / conversionFactor : 0
        updatedData.minorUnitPurchasePrice = Math.round(minorPrice * 100) / 100
        
        // Recalculate all profits for major unit
        updatedData.majorUnitProfit1 = calculateProfit(updatedData.majorUnitSalePrice1, majorPrice)
        updatedData.majorUnitProfit2 = calculateProfit(updatedData.majorUnitSalePrice2, majorPrice)
        updatedData.majorUnitProfit3 = calculateProfit(updatedData.majorUnitSalePrice3, majorPrice)
        updatedData.majorUnitProfit4 = calculateProfit(updatedData.majorUnitSalePrice4, majorPrice)
        updatedData.majorUnitProfit5 = calculateProfit(updatedData.majorUnitSalePrice5, majorPrice)
        
        updatedData.majorUnitProfitPercentage1 = calculateProfitPercentage(updatedData.majorUnitSalePrice1, majorPrice)
        updatedData.majorUnitProfitPercentage2 = calculateProfitPercentage(updatedData.majorUnitSalePrice2, majorPrice)
        updatedData.majorUnitProfitPercentage3 = calculateProfitPercentage(updatedData.majorUnitSalePrice3, majorPrice)
        updatedData.majorUnitProfitPercentage4 = calculateProfitPercentage(updatedData.majorUnitSalePrice4, majorPrice)
        updatedData.majorUnitProfitPercentage5 = calculateProfitPercentage(updatedData.majorUnitSalePrice5, majorPrice)
      }
      
      if (field === 'minorUnitPurchasePrice') {
        // Calculate major unit purchase price
        const minorPrice = parseFloat(value as string) || 0
        const conversionFactor = updatedData.conversionFactor || 1
        const majorPrice = minorPrice * conversionFactor
        updatedData.majorUnitPurchasePrice = Math.round(majorPrice * 100) / 100
        
        // Recalculate all profits for minor unit
        updatedData.minorUnitProfit1 = calculateProfit(updatedData.minorUnitSalePrice1, minorPrice)
        updatedData.minorUnitProfit2 = calculateProfit(updatedData.minorUnitSalePrice2, minorPrice)
        updatedData.minorUnitProfit3 = calculateProfit(updatedData.minorUnitSalePrice3, minorPrice)
        updatedData.minorUnitProfit4 = calculateProfit(updatedData.minorUnitSalePrice4, minorPrice)
        updatedData.minorUnitProfit5 = calculateProfit(updatedData.minorUnitSalePrice5, minorPrice)
        
        updatedData.minorUnitProfitPercentage1 = calculateProfitPercentage(updatedData.minorUnitSalePrice1, minorPrice)
        updatedData.minorUnitProfitPercentage2 = calculateProfitPercentage(updatedData.minorUnitSalePrice2, minorPrice)
        updatedData.minorUnitProfitPercentage3 = calculateProfitPercentage(updatedData.minorUnitSalePrice3, minorPrice)
        updatedData.minorUnitProfitPercentage4 = calculateProfitPercentage(updatedData.minorUnitSalePrice4, minorPrice)
        updatedData.minorUnitProfitPercentage5 = calculateProfitPercentage(updatedData.minorUnitSalePrice5, minorPrice)
      }
      
      if (field === 'conversionFactor') {
        const conversionFactor = parseInt(value as string) || 1
        if (conversionFactor > 0) {
          // Recalculate minor unit purchase price from major unit
          const majorPrice = updatedData.majorUnitPurchasePrice || 0
          const minorPrice = majorPrice / conversionFactor
          updatedData.minorUnitPurchasePrice = Math.round(minorPrice * 100) / 100
          
          // Recalculate all minor unit profits
          updatedData.minorUnitProfit1 = calculateProfit(updatedData.minorUnitSalePrice1, minorPrice)
          updatedData.minorUnitProfit2 = calculateProfit(updatedData.minorUnitSalePrice2, minorPrice)
          updatedData.minorUnitProfit3 = calculateProfit(updatedData.minorUnitSalePrice3, minorPrice)
          updatedData.minorUnitProfit4 = calculateProfit(updatedData.minorUnitSalePrice4, minorPrice)
          updatedData.minorUnitProfit5 = calculateProfit(updatedData.minorUnitSalePrice5, minorPrice)
          
          updatedData.minorUnitProfitPercentage1 = calculateProfitPercentage(updatedData.minorUnitSalePrice1, minorPrice)
          updatedData.minorUnitProfitPercentage2 = calculateProfitPercentage(updatedData.minorUnitSalePrice2, minorPrice)
          updatedData.minorUnitProfitPercentage3 = calculateProfitPercentage(updatedData.minorUnitSalePrice3, minorPrice)
          updatedData.minorUnitProfitPercentage4 = calculateProfitPercentage(updatedData.minorUnitSalePrice4, minorPrice)
          updatedData.minorUnitProfitPercentage5 = calculateProfitPercentage(updatedData.minorUnitSalePrice5, minorPrice)
        }
      }
      
      // Major unit sale prices calculations
      if (field === 'majorUnitSalePrice1') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.majorUnitPurchasePrice || 0
        updatedData.majorUnitProfit1 = calculateProfit(salePrice, purchasePrice)
        updatedData.majorUnitProfitPercentage1 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      if (field === 'majorUnitSalePrice2') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.majorUnitPurchasePrice || 0
        updatedData.majorUnitProfit2 = calculateProfit(salePrice, purchasePrice)
        updatedData.majorUnitProfitPercentage2 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      if (field === 'majorUnitSalePrice3') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.majorUnitPurchasePrice || 0
        updatedData.majorUnitProfit3 = calculateProfit(salePrice, purchasePrice)
        updatedData.majorUnitProfitPercentage3 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      if (field === 'majorUnitSalePrice4') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.majorUnitPurchasePrice || 0
        updatedData.majorUnitProfit4 = calculateProfit(salePrice, purchasePrice)
        updatedData.majorUnitProfitPercentage4 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      if (field === 'majorUnitSalePrice5') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.majorUnitPurchasePrice || 0
        updatedData.majorUnitProfit5 = calculateProfit(salePrice, purchasePrice)
        updatedData.majorUnitProfitPercentage5 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      // Minor unit sale prices calculations
      if (field === 'minorUnitSalePrice1') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.minorUnitPurchasePrice || 0
        updatedData.minorUnitProfit1 = calculateProfit(salePrice, purchasePrice)
        updatedData.minorUnitProfitPercentage1 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      if (field === 'minorUnitSalePrice2') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.minorUnitPurchasePrice || 0
        updatedData.minorUnitProfit2 = calculateProfit(salePrice, purchasePrice)
        updatedData.minorUnitProfitPercentage2 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      if (field === 'minorUnitSalePrice3') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.minorUnitPurchasePrice || 0
        updatedData.minorUnitProfit3 = calculateProfit(salePrice, purchasePrice)
        updatedData.minorUnitProfitPercentage3 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      if (field === 'minorUnitSalePrice4') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.minorUnitPurchasePrice || 0
        updatedData.minorUnitProfit4 = calculateProfit(salePrice, purchasePrice)
        updatedData.minorUnitProfitPercentage4 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      if (field === 'minorUnitSalePrice5') {
        const salePrice = parseFloat(value as string) || 0
        const purchasePrice = updatedData.minorUnitPurchasePrice || 0
        updatedData.minorUnitProfit5 = calculateProfit(salePrice, purchasePrice)
        updatedData.minorUnitProfitPercentage5 = calculateProfitPercentage(salePrice, purchasePrice)
      }
      
      return updatedData
    })
  }
  
  // Helper functions for calculations
  const calculateProfit = (salePrice: number, purchasePrice: number): string => {
    const profit = salePrice - purchasePrice
    return Math.round(profit * 100) / 100 + ""
  }
  
  const calculateProfitPercentage = (salePrice: number, purchasePrice: number): string => {
    if (purchasePrice === 0) return "0.0"
    const percentage = ((salePrice - purchasePrice) / purchasePrice) * 100
    return Math.round(percentage * 10) / 10 + ""
  }

  const handleSave = () => {
    const validation = productsUtils.validateProduct(formData)
    if (validation.isValid) {
      onSave?.(formData)
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة:\n" + validation.errors.join("\n"))
    }
  }

  // When opened standalone (from modules/pages form route), selectedProduct may be undefined. We still render with defaults.

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewProduct ? "إضافة صنف جديد" : "تعديل بيانات الصنف"}
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-primary" onClick={handleSave}>
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
        {/* Product Information Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h3 className="font-bold text-gray-800 mb-4">بيانات الصنف</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product-classification">التصنيف</Label>
              <div className="relative mt-1">
                <select
                  id="product-classification"
                  value={formData.classification}
                  onChange={(e) => handleInputChange('classification', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">اختر التصنيف</option>
                  {productClassifications.map((classification) => (
                    <option key={classification} value={classification}>
                      {classification}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="product-name">الإسم</Label>
              <Input 
                id="product-name" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1" 
                placeholder="اسم الصنف"
              />
            </div>
            <div>
              <Label htmlFor="product-barcode">الباركود</Label>
              <div className="relative mt-1">
                <Input 
                  id="product-barcode" 
                  className="pr-10" 
                  placeholder="باركود الصنف"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
            <div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="product-active"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <Label htmlFor="product-active" className="mr-2 text-sm text-gray-700">
                  نشط
                </Label>
              </div>
            </div>
            <div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="product-display-sales"
                  checked={formData.displayInSales}
                  onChange={(e) => handleInputChange('displayInSales', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <Label htmlFor="product-display-sales" className="mr-2 text-sm text-gray-700">
                  يتم العرض في المبيعات
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Unit Conversion Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h3 className="font-bold text-gray-800 mb-4">تحويل الوحدات</h3>
          <div className="flex items-center gap-4">
            <div>
              <Label>الوحدة الكبرى</Label>
              <div className="mt-1">
                <select
                  value={formData.majorUnit}
                  onChange={(e) => handleInputChange('majorUnit', e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {productUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-end h-10">
              <span className="text-2xl font-bold text-gray-600">=</span>
            </div>
            <div>
              <Label>عدد الوحدات</Label>
              <div className="mt-1">
                <Input 
                  type="number"
                  value={formData.conversionFactor}
                  onChange={(e) => handleInputChange('conversionFactor', parseInt(e.target.value) || 0)}
                  className="w-20 text-center"
                />
              </div>
            </div>
            <div className="flex items-end h-10">
              <span className="text-2xl font-bold text-gray-600">×</span>
            </div>
            <div>
              <Label>الوحدة الصغرى</Label>
              <div className="mt-1">
                <select
                  value={formData.minorUnit}
                  onChange={(e) => handleInputChange('minorUnit', e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {productUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h3 className="font-bold text-gray-800 mb-4">الأسعار والربح</h3>
          
          {/* Purchase Prices Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Major Unit Purchase Price */}
            <div>
              <Label htmlFor="major-unit-purchase-price" className="text-md font-medium text-gray-700">سعر شراء الوحدة الكبرى ({formData.majorUnit})</Label>
              <Input 
                id="major-unit-purchase-price"
                type="number"
                step="0.01"
                value={formData.majorUnitPurchasePrice}
                onChange={(e) => handleInputChange('majorUnitPurchasePrice', parseFloat(e.target.value) || 0)}
                className="mt-1 w-full"
              />
            </div>
            
            {/* Minor Unit Purchase Price */}
            <div>
              <Label htmlFor="minor-unit-purchase-price" className="text-md font-medium text-gray-700">سعر شراء الوحدة الصغرى ({formData.minorUnit})</Label>
              <Input 
                id="minor-unit-purchase-price"
                type="number"
                step="0.01"
                value={formData.minorUnitPurchasePrice}
                onChange={(e) => handleInputChange('minorUnitPurchasePrice', parseFloat(e.target.value) || 0)}
                className="mt-1 w-full"
              />
            </div>
          </div>

          {/* Sales Prices Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Major Unit Sales Prices Table */}
            <div>
              <h4 className="text-lg font-semibold text-blue-800 mb-4">أسعار الوحدة الكبرى ({formData.majorUnit})</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-right py-3 px-4 font-medium text-gray-700 border-b border-gray-200">سعر البيع</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700 border-b border-gray-200">قيمة الربح</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700 border-b border-gray-200">نسبة الربح %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Major Unit Sale Price 1 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 1:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.majorUnitSalePrice1}
                            onChange={(e) => handleInputChange('majorUnitSalePrice1', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfit1 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfitPercentage1 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>

                    {/* Major Unit Sale Price 2 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 2:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.majorUnitSalePrice2}
                            onChange={(e) => handleInputChange('majorUnitSalePrice2', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfit2 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfitPercentage2 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>

                    {/* Major Unit Sale Price 3 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 3:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.majorUnitSalePrice3}
                            onChange={(e) => handleInputChange('majorUnitSalePrice3', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfit3 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfitPercentage3 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>

                    {/* Major Unit Sale Price 4 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 4:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.majorUnitSalePrice4}
                            onChange={(e) => handleInputChange('majorUnitSalePrice4', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfit4 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfitPercentage4 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>

                    {/* Major Unit Sale Price 5 */}
                    <tr>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 5:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.majorUnitSalePrice5}
                            onChange={(e) => handleInputChange('majorUnitSalePrice5', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfit5 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.majorUnitProfitPercentage5 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Minor Unit Sales Prices Table */}
            <div>
              <h4 className="text-lg font-semibold text-green-800 mb-4">أسعار الوحدة الصغرى ({formData.minorUnit})</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="text-right py-3 px-4 font-medium text-gray-700 border-b border-gray-200">سعر البيع</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700 border-b border-gray-200">قيمة الربح</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700 border-b border-gray-200">نسبة الربح %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Minor Unit Sale Price 1 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 1:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.minorUnitSalePrice1}
                            onChange={(e) => handleInputChange('minorUnitSalePrice1', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfit1 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfitPercentage1 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>

                    {/* Minor Unit Sale Price 2 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 2:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.minorUnitSalePrice2}
                            onChange={(e) => handleInputChange('minorUnitSalePrice2', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfit2 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfitPercentage2 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>

                    {/* Minor Unit Sale Price 3 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 3:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.minorUnitSalePrice3}
                            onChange={(e) => handleInputChange('minorUnitSalePrice3', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfit3 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfitPercentage3 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>

                    {/* Minor Unit Sale Price 4 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 4:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.minorUnitSalePrice4}
                            onChange={(e) => handleInputChange('minorUnitSalePrice4', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfit4 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfitPercentage4 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>

                    {/* Minor Unit Sale Price 5 */}
                    <tr>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">سعر بيع 5:</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={formData.minorUnitSalePrice5}
                            onChange={(e) => handleInputChange('minorUnitSalePrice5', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </td>
                                           <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfit5 || "0.00"}
                         readOnly
                         className="w-20 text-center text-green-600 font-medium bg-gray-50"
                         placeholder="0.00"
                       />
                     </td>
                     <td className="py-3 px-4 text-center">
                       <Input 
                         type="text"
                         value={formData.minorUnitProfitPercentage5 || "0.0"}
                         readOnly
                         className="w-16 text-center text-blue-600 font-medium bg-gray-50"
                         placeholder="0.0"
                       />
                     </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Limits Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h3 className="font-bold text-gray-800 mb-4">الحدود</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minimum-limit">الحد الأدنى</Label>
              <Input 
                id="minimum-limit"
                type="number"
                value={formData.minimumLimit}
                onChange={(e) => handleInputChange('minimumLimit', parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="order-limit">حد الطلب</Label>
              <Input 
                id="order-limit"
                type="number"
                value={formData.orderLimit}
                onChange={(e) => handleInputChange('orderLimit', parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button className="bg-primary" onClick={handleSave}>
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
