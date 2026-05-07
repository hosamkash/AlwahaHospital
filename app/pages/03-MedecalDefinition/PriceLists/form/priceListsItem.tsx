"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Save,
  X,
  Printer,
  Plus,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { 
  PriceList, 
  PriceListItem,
  tabData, 
  discountTypes,
  availableServices,
  availableItems,
  availableAnalysis,
  availableRadiology,
  availableOperations,
  priceListUtils 
} from "../list/priceListsController"

interface PriceListsItemProps {
  selectedPriceList: PriceList | null
  isNewPriceList: boolean
  onClose: () => void
  onSave?: (priceList: PriceList) => void
}

export default function PriceListsItem({
  selectedPriceList,
  isNewPriceList,
  onClose,
  onSave,
}: PriceListsItemProps) {
  const [activeTab, setActiveTab] = useState("services")
  const [priceList, setPriceList] = useState<PriceList>(selectedPriceList || {
    id: 0,
    code: "",
    name: "",
    description: "",
    active: true,
    discountType: "percentage",
    globalDiscountPercentage: 0,
    services: [],
    items: [],
    analysis: [],
    radiology: [],
    operations: []
  })

  // تحديث قائمة الأسعار عند تغيير selectedPriceList
  useEffect(() => {
    if (selectedPriceList) {
      setPriceList(selectedPriceList)
    }
  }, [selectedPriceList])

  // حساب الإجماليات
  const calculateTotals = () => {
    const allItems = [...priceList.services, ...priceList.items, ...priceList.analysis, ...priceList.radiology, ...priceList.operations]
    
    const totalOriginal = allItems.reduce((sum, item) => sum + item.originalPrice, 0)
    const totalDiscount = allItems.reduce((sum, item) => sum + (item.originalPrice - item.finalPrice), 0)
    const totalFinal = allItems.reduce((sum, item) => sum + item.finalPrice, 0)

    return { totalOriginal, totalDiscount, totalFinal }
  }

  const totals = calculateTotals()

  const handleSave = () => {
    if (onSave) {
      onSave(priceList)
    }
  }

  // إضافة عنصر للتبويب الحالي
  const addItem = () => {
    let newItem: PriceListItem
    let currentItems: PriceListItem[]

    // حساب السعر النهائي وقيمة الخصم بناءً على نوع الخصم
    const calculateDiscountAndFinalPrice = (originalPrice: number) => {
      if (priceList.discountType === "percentage") {
        const discountValue = originalPrice * (priceList.globalDiscountPercentage / 100)
        return {
          discountValue: discountValue,
          finalPrice: originalPrice - discountValue
        }
      } else if (priceList.discountType === "fixed") {
        // تحديد سعر بعد الخصم لكل عنصر - لا يوجد خصم تلقائي
        return {
          discountValue: 0,
          finalPrice: originalPrice
        }
      } else if (priceList.discountType === "mixed") {
        // خصم مختلط - تطبيق نسبة الخصم العامة فقط
        let finalPrice = originalPrice
        if (priceList.globalDiscountPercentage > 0) {
          finalPrice = originalPrice * (1 - priceList.globalDiscountPercentage / 100)
        }
        return {
          discountValue: 0,
          finalPrice: finalPrice
        }
      }
      return {
        discountValue: 0,
        finalPrice: originalPrice
      }
    }

    switch (activeTab) {
      case "services":
        const selectedService = availableServices[0]
        const serviceDiscount = calculateDiscountAndFinalPrice(selectedService.originalPrice)
        newItem = {
          id: Math.max(...priceList.services.map(s => s.id), 0) + 1,
          code: selectedService.code,
          name: selectedService.name,
          originalPrice: selectedService.originalPrice,
          discountValue: serviceDiscount.discountValue,
          discountPercentage: priceList.discountType === "percentage" ? priceList.globalDiscountPercentage : 0,
          listPrice: selectedService.originalPrice,
          finalPrice: serviceDiscount.finalPrice,
          type: "service"
        }
        currentItems = [...priceList.services, newItem]
        setPriceList({ ...priceList, services: currentItems })
        break

      case "items":
        const selectedItem = availableItems[0]
        const itemDiscount = calculateDiscountAndFinalPrice(selectedItem.originalPrice)
        newItem = {
          id: Math.max(...priceList.items.map(i => i.id), 0) + 1,
          code: selectedItem.code,
          name: selectedItem.name,
          originalPrice: selectedItem.originalPrice,
          discountValue: itemDiscount.discountValue,
          discountPercentage: priceList.discountType === "percentage" ? priceList.globalDiscountPercentage : 0,
          listPrice: selectedItem.originalPrice,
          finalPrice: itemDiscount.finalPrice,
          type: "item"
        }
        currentItems = [...priceList.items, newItem]
        setPriceList({ ...priceList, items: currentItems })
        break

      case "analysis":
        const selectedAnalysis = availableAnalysis[0]
        const analysisDiscount = calculateDiscountAndFinalPrice(selectedAnalysis.originalPrice)
        newItem = {
          id: Math.max(...priceList.analysis.map(a => a.id), 0) + 1,
          code: selectedAnalysis.code,
          name: selectedAnalysis.name,
          originalPrice: selectedAnalysis.originalPrice,
          discountValue: analysisDiscount.discountValue,
          discountPercentage: priceList.discountType === "percentage" ? priceList.globalDiscountPercentage : 0,
          listPrice: selectedAnalysis.originalPrice,
          finalPrice: analysisDiscount.finalPrice,
          type: "analysis"
        }
        currentItems = [...priceList.analysis, newItem]
        setPriceList({ ...priceList, analysis: currentItems })
        break

      case "radiology":
        const selectedRadiology = availableRadiology[0]
        const radiologyDiscount = calculateDiscountAndFinalPrice(selectedRadiology.originalPrice)
        newItem = {
          id: Math.max(...priceList.radiology.map(r => r.id), 0) + 1,
          code: selectedRadiology.code,
          name: selectedRadiology.name,
          originalPrice: selectedRadiology.originalPrice,
          discountValue: radiologyDiscount.discountValue,
          discountPercentage: priceList.discountType === "percentage" ? priceList.globalDiscountPercentage : 0,
          listPrice: selectedRadiology.originalPrice,
          finalPrice: radiologyDiscount.finalPrice,
          type: "radiology"
        }
        currentItems = [...priceList.radiology, newItem]
        setPriceList({ ...priceList, radiology: currentItems })
        break

      case "operations":
        const selectedOperation = availableOperations[0]
        const operationDiscount = calculateDiscountAndFinalPrice(selectedOperation.originalPrice)
        newItem = {
          id: Math.max(...priceList.operations.map(o => o.id), 0) + 1,
          code: selectedOperation.code,
          name: selectedOperation.name,
          originalPrice: selectedOperation.originalPrice,
          discountValue: operationDiscount.discountValue,
          discountPercentage: priceList.discountType === "percentage" ? priceList.globalDiscountPercentage : 0,
          listPrice: selectedOperation.originalPrice,
          finalPrice: operationDiscount.finalPrice,
          type: "operation"
        }
        currentItems = [...priceList.operations, newItem]
        setPriceList({ ...priceList, operations: currentItems })
        break
    }
  }

  // حذف عنصر من التبويب الحالي
  const removeItem = (itemId: number) => {
    switch (activeTab) {
      case "services":
        setPriceList({ ...priceList, services: priceList.services.filter(s => s.id !== itemId) })
        break
      case "items":
        setPriceList({ ...priceList, items: priceList.items.filter(i => i.id !== itemId) })
        break
      case "analysis":
        setPriceList({ ...priceList, analysis: priceList.analysis.filter(a => a.id !== itemId) })
        break
      case "radiology":
        setPriceList({ ...priceList, radiology: priceList.radiology.filter(r => r.id !== itemId) })
        break
      case "operations":
        setPriceList({ ...priceList, operations: priceList.operations.filter(o => o.id !== itemId) })
        break
    }
  }

  // تحديث عنصر في التبويب الحالي
  const updateItem = (itemId: number, field: keyof PriceListItem, value: any) => {
    const updateItems = (items: PriceListItem[]) => 
      items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value }
          
          // حساب السعر النهائي بناءً على نوع الخصم
          if (priceList.discountType === "percentage") {
            // نسبة خصم على كل العناصر
            updatedItem.discountPercentage = priceList.globalDiscountPercentage
            updatedItem.discountValue = updatedItem.originalPrice * (priceList.globalDiscountPercentage / 100)
            updatedItem.finalPrice = updatedItem.originalPrice - updatedItem.discountValue
          } else if (priceList.discountType === "fixed") {
            // تحديد سعر بعد الخصم لكل عنصر - حساب تلقائي للخصم
            if (field === 'discountValue' && updatedItem.discountValue > 0) {
              updatedItem.discountPercentage = (updatedItem.discountValue / updatedItem.originalPrice) * 100
              updatedItem.finalPrice = updatedItem.originalPrice - updatedItem.discountValue
            } else if (field === 'discountPercentage' && updatedItem.discountPercentage > 0) {
              updatedItem.discountValue = updatedItem.originalPrice * (updatedItem.discountPercentage / 100)
              updatedItem.finalPrice = updatedItem.originalPrice - updatedItem.discountValue
            } else if (field === 'finalPrice') {
              // عند تغيير السعر النهائي مباشرة
              const discountValue = updatedItem.originalPrice - updatedItem.finalPrice
              updatedItem.discountValue = Math.max(0, discountValue)
              updatedItem.discountPercentage = updatedItem.originalPrice > 0 ? (discountValue / updatedItem.originalPrice) * 100 : 0
            } else {
              // إعادة تعيين القيم
              updatedItem.discountPercentage = 0
              updatedItem.discountValue = 0
              updatedItem.finalPrice = updatedItem.originalPrice
            }
          } else if (priceList.discountType === "mixed") {
            // خصم مختلط - نسبة الخصم العامة + خصم على كل سطر
            let finalPrice = updatedItem.originalPrice
            
            // تطبيق نسبة الخصم العامة أولاً
            if (priceList.globalDiscountPercentage > 0) {
              finalPrice = finalPrice * (1 - priceList.globalDiscountPercentage / 100)
            }
            
            // ثم تطبيق الخصم على السطر (قيمة أو نسبة)
            if (updatedItem.discountValue > 0) {
              finalPrice = finalPrice - updatedItem.discountValue
            }
            if (updatedItem.discountPercentage > 0) {
              finalPrice = finalPrice * (1 - updatedItem.discountPercentage / 100)
            }
            
            updatedItem.finalPrice = Math.max(0, finalPrice)
            
            // حساب نسبة الخصم تلقائياً عند تغيير قيمة الخصم
            if (field === 'discountValue' && updatedItem.discountValue > 0) {
              // حساب النسبة بناءً على السعر بعد الخصم العام
              const priceAfterGlobalDiscount = updatedItem.originalPrice * (1 - priceList.globalDiscountPercentage / 100)
              updatedItem.discountPercentage = priceAfterGlobalDiscount > 0 ? (updatedItem.discountValue / priceAfterGlobalDiscount) * 100 : 0
            }
            
            // حساب قيمة الخصم تلقائياً عند تغيير نسبة الخصم
            if (field === 'discountPercentage' && updatedItem.discountPercentage > 0) {
              // حساب القيمة بناءً على السعر بعد الخصم العام
              const priceAfterGlobalDiscount = updatedItem.originalPrice * (1 - priceList.globalDiscountPercentage / 100)
              updatedItem.discountValue = priceAfterGlobalDiscount * (updatedItem.discountPercentage / 100)
            }
          }
          
          return updatedItem
        }
        return item
      })

    switch (activeTab) {
      case "services":
        setPriceList({ ...priceList, services: updateItems(priceList.services) })
        break
      case "items":
        setPriceList({ ...priceList, items: updateItems(priceList.items) })
        break
      case "analysis":
        setPriceList({ ...priceList, analysis: updateItems(priceList.analysis) })
        break
      case "radiology":
        setPriceList({ ...priceList, radiology: updateItems(priceList.radiology) })
        break
      case "operations":
        setPriceList({ ...priceList, operations: updateItems(priceList.operations) })
        break
    }
  }

  // تحديث نسبة الخصم العامة وتطبيقها على جميع العناصر
  const updateGlobalDiscount = (newPercentage: number) => {
    const updatedPriceList = { ...priceList, globalDiscountPercentage: newPercentage }
    
    // إذا كان نوع الخصم "نسبة خصم على كل العناصر"، طبق النسبة على جميع العناصر
    if (priceList.discountType === "percentage") {
      const updateAllItems = (items: PriceListItem[]) => 
        items.map(item => {
          const discountValue = item.originalPrice * (newPercentage / 100)
          return {
            ...item,
            discountPercentage: newPercentage,
            discountValue: discountValue,
            finalPrice: item.originalPrice - discountValue
          }
        })
      
      updatedPriceList.services = updateAllItems(priceList.services)
      updatedPriceList.items = updateAllItems(priceList.items)
      updatedPriceList.analysis = updateAllItems(priceList.analysis)
      updatedPriceList.radiology = updateAllItems(priceList.radiology)
      updatedPriceList.operations = updateAllItems(priceList.operations)
    } else if (priceList.discountType === "mixed") {
      // في حالة الخصم المختلط، أعد حساب السعر النهائي مع النسبة الجديدة
      const updateAllItems = (items: PriceListItem[]) => 
        items.map(item => {
          let finalPrice = item.originalPrice
          
          // تطبيق نسبة الخصم العامة أولاً
          if (newPercentage > 0) {
            finalPrice = finalPrice * (1 - newPercentage / 100)
          }
          
          // ثم تطبيق الخصم على السطر
          if (item.discountValue > 0) {
            finalPrice = finalPrice - item.discountValue
          }
          if (item.discountPercentage > 0) {
            finalPrice = finalPrice * (1 - item.discountPercentage / 100)
          }
          
          return {
            ...item,
            finalPrice: Math.max(0, finalPrice)
          }
        })
      
      updatedPriceList.services = updateAllItems(priceList.services)
      updatedPriceList.items = updateAllItems(priceList.items)
      updatedPriceList.analysis = updateAllItems(priceList.analysis)
      updatedPriceList.radiology = updateAllItems(priceList.radiology)
      updatedPriceList.operations = updateAllItems(priceList.operations)
    }
    // في حالة "fixed" لا يتم تطبيق نسبة الخصم العامة
    
    setPriceList(updatedPriceList)
  }

  // تحديث نوع الخصم
  const updateDiscountType = (newType: string) => {
    const updatedPriceList = { ...priceList, discountType: newType as any }
    
    // إذا تم تغيير نوع الخصم إلى "نسبة خصم على كل العناصر"، طبق النسبة العامة
    if (newType === "percentage") {
      const updateAllItems = (items: PriceListItem[]) => 
        items.map(item => {
          const discountValue = item.originalPrice * (priceList.globalDiscountPercentage / 100)
          return {
            ...item,
            discountPercentage: priceList.globalDiscountPercentage,
            discountValue: discountValue,
            finalPrice: item.originalPrice - discountValue
          }
        })
      
      updatedPriceList.services = updateAllItems(priceList.services)
      updatedPriceList.items = updateAllItems(priceList.items)
      updatedPriceList.analysis = updateAllItems(priceList.analysis)
      updatedPriceList.radiology = updateAllItems(priceList.radiology)
      updatedPriceList.operations = updateAllItems(priceList.operations)
    } else if (newType === "fixed") {
      // إذا تم تغيير نوع الخصم إلى "تحديد سعر بعد الخصم لكل عنصر"، احذف نسبة الخصم العامة
      updatedPriceList.globalDiscountPercentage = 0
      
      const updateAllItems = (items: PriceListItem[]) => 
        items.map(item => ({
          ...item,
          discountPercentage: 0,
          discountValue: 0,
          finalPrice: item.originalPrice
        }))
      
      updatedPriceList.services = updateAllItems(priceList.services)
      updatedPriceList.items = updateAllItems(priceList.items)
      updatedPriceList.analysis = updateAllItems(priceList.analysis)
      updatedPriceList.radiology = updateAllItems(priceList.radiology)
      updatedPriceList.operations = updateAllItems(priceList.operations)
    } else if (newType === "mixed") {
      // إذا تم تغيير نوع الخصم إلى "خصم مختلط"، احتفظ بنسبة الخصم العامة
      // وامسح خصم السطر فقط
      const updateAllItems = (items: PriceListItem[]) => 
        items.map(item => {
          let finalPrice = item.originalPrice
          
          // تطبيق نسبة الخصم العامة فقط
          if (priceList.globalDiscountPercentage > 0) {
            finalPrice = finalPrice * (1 - priceList.globalDiscountPercentage / 100)
          }
          
          return {
            ...item,
            discountPercentage: 0,
            discountValue: 0,
            finalPrice: finalPrice
          }
        })
      
      updatedPriceList.services = updateAllItems(priceList.services)
      updatedPriceList.items = updateAllItems(priceList.items)
      updatedPriceList.analysis = updateAllItems(priceList.analysis)
      updatedPriceList.radiology = updateAllItems(priceList.radiology)
      updatedPriceList.operations = updateAllItems(priceList.operations)
    }
    
    setPriceList(updatedPriceList)
  }

  // الحصول على العناصر الحالية للتبويب
  const getCurrentItems = () => {
    switch (activeTab) {
      case "services": return priceList.services
      case "items": return priceList.items
      case "analysis": return priceList.analysis
      case "radiology": return priceList.radiology
      case "operations": return priceList.operations
      default: return []
    }
  }

  if (!selectedPriceList) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewPriceList ? "إضافة قائمة أسعار جديدة" : "تعديل قائمة الأسعار"}
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-primary text-white" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100">
              <Printer className="w-4 h-4 ml-2" />
              طباعة
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Identification Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">البيانات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">الكود</Label>
                <Input
                  id="code"
                  value={priceList.code}
                  onChange={(e) => setPriceList({ ...priceList, code: e.target.value })}
                  placeholder="أدخل كود قائمة الأسعار"
                />
              </div>
              <div>
                <Label htmlFor="name">اسم قائمة الأسعار</Label>
                <Input
                  id="name"
                  value={priceList.name}
                  onChange={(e) => setPriceList({ ...priceList, name: e.target.value })}
                  placeholder="أدخل اسم قائمة الأسعار"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={priceList.description}
                onChange={(e) => setPriceList({ ...priceList, description: e.target.value })}
                placeholder="أدخل وصف قائمة الأسعار"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="discountType">نوع الخصم</Label>
                <select
                  id="discountType"
                  value={priceList.discountType}
                  onChange={(e) => updateDiscountType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {discountTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="globalDiscount">نسبة الخصم العامة (%)</Label>
                <Input
                  id="globalDiscount"
                  type="number"
                  min="0"
                  max="100"
                  value={priceList.globalDiscountPercentage}
                  onChange={(e) => updateGlobalDiscount(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  disabled={priceList.discountType === "fixed"}
                />
              </div>
              <div className="flex items-center">
                <input
                  id="active"
                  type="checkbox"
                  checked={priceList.active}
                  onChange={(e) => setPriceList({ ...priceList, active: e.target.checked })}
                  className="ml-2"
                />
                <Label htmlFor="active" className="mr-2">نشط</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Totals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">الإجماليات العامة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{priceListUtils.formatNumber(totals.totalOriginal)}</div>
                <div className="text-sm text-gray-600">إجمالي الأسعار الأصلية</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{priceListUtils.formatNumber(totals.totalDiscount)}</div>
                <div className="text-sm text-gray-600">إجمالي الخصومات</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{priceListUtils.formatNumber(totals.totalFinal)}</div>
                <div className="text-sm text-gray-600">إجمالي الأسعار النهائية</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">تفاصيل العناصر</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {tabData.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
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
            <div className="space-y-4">
              {/* Add Item Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  {tabData.find(tab => tab.id === activeTab)?.name}
                </h3>
                <Button onClick={addItem} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة عنصر
                </Button>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-medium text-gray-700">#</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الكود</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">اسم العنصر</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">السعر الأصلي</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">ق. الخصم</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">ن. الخصم</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">سعر القائمة</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">السعر النهائي</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentItems().map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                        <td className="py-3 px-4 font-mono text-sm text-gray-600">{item.code}</td>
                        <td className="py-3 px-4 font-semibold text-gray-800">{item.name}</td>
                        <td className="py-3 px-4 text-gray-600">{priceListUtils.formatNumber(item.originalPrice)}</td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            min="0"
                            value={item.discountValue}
                            onChange={(e) => updateItem(item.id, 'discountValue', parseFloat(e.target.value) || 0)}
                            className="w-20 text-center"
                            disabled={priceList.discountType === "percentage"}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={item.discountPercentage}
                            onChange={(e) => updateItem(item.id, 'discountPercentage', parseFloat(e.target.value) || 0)}
                            className="w-20 text-center"
                            disabled={priceList.discountType === "percentage"}
                          />
                        </td>
                        <td className="py-3 px-4 text-gray-600">{priceListUtils.formatNumber(item.listPrice)}</td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            min="0"
                            value={item.finalPrice}
                            onChange={(e) => updateItem(item.id, 'finalPrice', parseFloat(e.target.value) || 0)}
                            className="w-24 text-center"
                            disabled={priceList.discountType === "percentage"}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-3 h-3 ml-1" />
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State for Tab */}
              {getCurrentItems().length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">لا توجد عناصر في هذا التبويب</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
