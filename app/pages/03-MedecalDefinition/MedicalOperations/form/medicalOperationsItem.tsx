"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  MedicalOperation, 
  tabData, 
  anesthesiaTypes,
  medicalOperationUtils,
  calculateTotals,
  availableItems,
  availableRadiology,
  availableAnalysis,
  availableSpecialties
} from "../list/medicalOperationsController"
import { defaultMedicalServices } from "../../MedicalServices/list/medicalServicesController"
import { defaultProducts } from "../../../02-GeneralDefinition/products/list/productsController"
import { defaultRadiology } from "../../Radiology/list/radiologyController"
import { defaultMedicalSpecialties } from "../../MedicalSpecialties/list/medicalSpecialtiesController"
import { defaultAnalyses } from "../../Analysis/list/analysisController"
 
interface MedicalOperationsItemProps {
  selectedOperation: MedicalOperation | null
  isNewOperation: boolean
  onClose: () => void
  onSave?: (operation: MedicalOperation) => void
}

export default function MedicalOperationsItem({
  selectedOperation,
  isNewOperation,
  onClose,
  onSave,
}: MedicalOperationsItemProps) {
  const [activeTab, setActiveTab] = useState("services")
  const [showServiceDialog, setShowServiceDialog] = useState(false)
  const [serviceSearch, setServiceSearch] = useState("")
  const [showItemDialog, setShowItemDialog] = useState(false)
  const [itemSearch, setItemSearch] = useState("")
  const [showRadiologyDialog, setShowRadiologyDialog] = useState(false)
  const [radiologySearch, setRadiologySearch] = useState("")
  const [showSpecialtyDialog, setShowSpecialtyDialog] = useState(false)
  const [specialtySearch, setSpecialtySearch] = useState("")
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false)
  const [analysisSearch, setAnalysisSearch] = useState("")
  const [operation, setOperation] = useState<MedicalOperation>(selectedOperation || {
    id: 0,
    code: "",
    name: "",
    anesthesiaType: "",
    active: true,
    total: 0,
    discount: 0,
    net: 0,
    services: [],
    items: [],
    radiology: [],
    analysis: [],
    specialties: []
  })

  // تحديث العملية عند تغيير selectedOperation
  useEffect(() => {
    if (selectedOperation) {
      setOperation(selectedOperation)
    }
  }, [selectedOperation])

  // حساب الإجماليات
  const totals = calculateTotals(operation)

  const handleSave = () => {
    if (onSave) {
      onSave(operation)
    }
  }

  const addService = () => {
    setShowServiceDialog(true)
  }

  const handlePickService = (service: { id: number; code: number; name: string; price: number }) => {
    const newService = {
      id: Math.max(...operation.services.map(s => s.id), 0) + 1,
      serviceCode: String(service.code),
      serviceName: service.name,
      value: service.price,
      discountValue: 0,
      discountPercentage: 0,
      net: service.price,
    }
    setOperation(prev => ({ ...prev, services: [...prev.services, newService] }))
    setShowServiceDialog(false)
  }

  const addItem = () => {
    setShowItemDialog(true)
  }

  const handlePickProduct = (p: { id: number; code: string; name: string; minorUnit: string; minorUnitSalePrice1: number }) => {
    const price = Number(p.minorUnitSalePrice1 || 0)
    const newItem = {
      id: Math.max(...operation.items.map(i => i.id), 0) + 1,
      code: p.code,
      itemName: p.name,
      quantity: 1,
      value: price,
      discount: 0,
      discountPercentage: 0,
      unit: p.minorUnit,
      net: price,
    }
    setOperation(prev => ({ ...prev, items: [...prev.items, newItem] }))
    setShowItemDialog(false)
  }

  const addRadiology = () => {
    setShowRadiologyDialog(true)
  }

  const handlePickRadiology = (r: { id: number; code: number; name: string; price: number }) => {
    const newRadiology = {
      id: Math.max(...operation.radiology.map(rad => rad.id), 0) + 1,
      code: String(r.code),
      radiologyName: r.name,
      value: r.price,
      discount: 0,
      net: r.price,
    }
    setOperation(prev => ({ ...prev, radiology: [...prev.radiology, newRadiology] }))
    setShowRadiologyDialog(false)
  }

  const addAnalysis = () => {
    setShowAnalysisDialog(true)
  }

  const handlePickAnalysis = (a: { id: number; code: string; name: string }) => {
    const newAnalysis = {
      id: Math.max(...operation.analysis.map(an => an.id), 0) + 1,
      code: a.code,
      analysisName: a.name,
      value: 0,
      discount: 0,
      net: 0,
    }
    setOperation(prev => ({ ...prev, analysis: [...prev.analysis, newAnalysis] }))
    setShowAnalysisDialog(false)
  }

  const addSpecialty = () => {
    setShowSpecialtyDialog(true)
  }

  const handlePickSpecialty = (s: { id: number; code: string; name: string }) => {
    const newSpecialty = {
      id: Math.max(...operation.specialties.map(sp => sp.id), 0) + 1,
      code: s.code,
      specialtyName: s.name,
      value: 0,
      discount: 0,
      net: 0,
    }
    setOperation(prev => ({ ...prev, specialties: [...prev.specialties, newSpecialty] }))
    setShowSpecialtyDialog(false)
  }

  const removeService = (id: number) => {
    setOperation({
      ...operation,
      services: operation.services.filter(s => s.id !== id)
    })
  }

  const removeItem = (id: number) => {
    setOperation({
      ...operation,
      items: operation.items.filter(i => i.id !== id)
    })
  }

  const removeRadiology = (id: number) => {
    setOperation({
      ...operation,
      radiology: operation.radiology.filter(r => r.id !== id)
    })
  }

  const removeAnalysis = (id: number) => {
    setOperation({
      ...operation,
      analysis: operation.analysis.filter(a => a.id !== id)
    })
  }

  const removeSpecialty = (id: number) => {
    setOperation({
      ...operation,
      specialties: operation.specialties.filter(s => s.id !== id)
    })
  }

  if (!selectedOperation) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewOperation ? "إضافة عملية طبية جديدة" : "تعديل بيانات العملية الطبية"}
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSave}>
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
        <div className="flex gap-6">
      

          {/* Right Panel - Main Content */}
          <div className="flex-1">
            {/* Operation Details */}
            <div className="bg-white p-6 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="operation-code">الكود</Label>
                  <Input 
                    id="operation-code" 
                    value={operation.code}
                    onChange={(e) => setOperation({...operation, code: e.target.value})}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="operation-name">الإسم (عربي)</Label>
                  <Input 
                    id="operation-name" 
                    value={operation.name}
                    onChange={(e) => setOperation({...operation, name: e.target.value})}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="anesthesia-type">نوع التخدير</Label>
                  <div className="relative mt-1">
                    <select 
                      id="anesthesia-type" 
                      value={operation.anesthesiaType}
                      onChange={(e) => setOperation({...operation, anesthesiaType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">اختر نوع التخدير</option>
                      {anesthesiaTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
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
                {/* Services Tab */}
                {activeTab === "services" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">الخدمات</h3>
                      <Button onClick={addService} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Plus className="w-4 h-4 ml-2" />
                        إختيار
                      </Button>
                    </div>
                    {showServiceDialog && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/30" onClick={() => setShowServiceDialog(false)}></div>
                        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4">
                          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h4 className="font-bold text-gray-800">اختيار خدمة طبية</h4>
                            <Button variant="outline" onClick={() => setShowServiceDialog(false)}>
                              إغلاق
                            </Button>
                          </div>
                          <div className="p-4">
                            <div className="mb-3">
                              <Input
                                placeholder="ابحث باسم الخدمة أو الكود..."
                                value={serviceSearch}
                                onChange={(e) => setServiceSearch(e.target.value)}
                              />
                            </div>
                            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-right py-2 px-3">الكود</th>
                                    <th className="text-right py-2 px-3">اسم الخدمة</th>
                                    <th className="text-right py-2 px-3">السعر</th>
                                    <th className="text-right py-2 px-3">إجراء</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {defaultMedicalServices
                                    .filter((s: any) =>
                                      !serviceSearch.trim() ||
                                      s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                                      String(s.code).includes(serviceSearch)
                                    )
                                    .map((s: any) => (
                                      <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-2 px-3 font-mono">{s.code}</td>
                                        <td className="py-2 px-3">{s.name}</td>
                                        <td className="py-2 px-3">{medicalOperationUtils.formatNumber(s.price)}</td>
                                        <td className="py-2 px-3">
                      <Button size="sm" className="bg-primary" onClick={() => handlePickService(s)}>
                                            إضافة
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">#</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">كود الخدمة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">إسم الخدمة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">القيمة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">قيمة الخصم</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">قيمة الخصم %</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الصافي</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {operation.services.map((service, index) => (
                            <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 px-3 text-sm">{index + 1}</td>
                              <td className="py-2 px-3 text-sm">{service.serviceCode}</td>
                              <td className="py-2 px-3 text-sm">{service.serviceName}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(service.value)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(service.discountValue)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(service.discountPercentage)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(service.net)}</td>
                              <td className="py-2 px-3 text-sm">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                  onClick={() => removeService(service.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Items Tab */}
                {activeTab === "items" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">الأصناف</h3>
                      <Button onClick={addItem} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Plus className="w-4 h-4 ml-2" />
                        إختيار
                      </Button>
                    </div>
                    {showItemDialog && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/30" onClick={() => setShowItemDialog(false)}></div>
                        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4">
                          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h4 className="font-bold text-gray-800">اختيار صنف</h4>
                            <Button variant="outline" onClick={() => setShowItemDialog(false)}>
                              إغلاق
                            </Button>
                          </div>
                          <div className="p-4">
                            <div className="mb-3">
                              <Input
                                placeholder="ابحث باسم الصنف أو الكود..."
                                value={itemSearch}
                                onChange={(e) => setItemSearch(e.target.value)}
                              />
                            </div>
                            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-right py-2 px-3">الكود</th>
                                    <th className="text-right py-2 px-3">اسم الصنف</th>
                                    <th className="text-right py-2 px-3">الوحدة</th>
                                    <th className="text-right py-2 px-3">سعر الوحدة</th>
                                    <th className="text-right py-2 px-3">إجراء</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {defaultProducts
                                    .filter((p: any) =>
                                      !itemSearch.trim() ||
                                      p.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
                                      p.code.toLowerCase().includes(itemSearch.toLowerCase())
                                    )
                                    .map((p: any) => (
                                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-2 px-3 font-mono">{p.code}</td>
                                        <td className="py-2 px-3">{p.name}</td>
                                        <td className="py-2 px-3">{p.minorUnit}</td>
                                        <td className="py-2 px-3">{medicalOperationUtils.formatNumber(Number(p.minorUnitSalePrice1 || 0))}</td>
                                        <td className="py-2 px-3">
                                          <Button size="sm" className="bg-primary" onClick={() => handlePickProduct(p as any)}>
                                            إضافة
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">#</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الكود</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">إسم الصنف</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الكمية</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">القيمة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الخصم</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">نسبة الخصم</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الوحدة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الصافي</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {operation.items.map((item, index) => (
                            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 px-3 text-sm">{index + 1}</td>
                              <td className="py-2 px-3 text-sm">{item.code}</td>
                              <td className="py-2 px-3 text-sm">{item.itemName}</td>
                              <td className="py-2 px-3 text-sm">{item.quantity}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(item.value)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(item.discount)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(item.discountPercentage)}</td>
                              <td className="py-2 px-3 text-sm">{item.unit}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(item.net)}</td>
                              <td className="py-2 px-3 text-sm">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Radiology Tab */}
                {activeTab === "radiology" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">الأشعة</h3>
                      <Button onClick={addRadiology} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Plus className="w-4 h-4 ml-2" />
                        إختيار
                      </Button>
                    </div>
                    {showRadiologyDialog && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/30" onClick={() => setShowRadiologyDialog(false)}></div>
                        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4">
                          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h4 className="font-bold text-gray-800">اختيار أشعة</h4>
                            <Button variant="outline" onClick={() => setShowRadiologyDialog(false)}>
                              إغلاق
                            </Button>
                          </div>
                          <div className="p-4">
                            <div className="mb-3">
                              <Input
                                placeholder="ابحث باسم الأشعة أو الكود..."
                                value={radiologySearch}
                                onChange={(e) => setRadiologySearch(e.target.value)}
                              />
                            </div>
                            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-right py-2 px-3">الكود</th>
                                    <th className="text-right py-2 px-3">اسم الأشعة</th>
                                    <th className="text-right py-2 px-3">السعر</th>
                                    <th className="text-right py-2 px-3">إجراء</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {defaultRadiology
                                    .filter((r: any) =>
                                      !radiologySearch.trim() ||
                                      r.name.toLowerCase().includes(radiologySearch.toLowerCase()) ||
                                      String(r.code).includes(radiologySearch)
                                    )
                                    .map((r: any) => (
                                      <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-2 px-3 font-mono">{r.code}</td>
                                        <td className="py-2 px-3">{r.name}</td>
                                        <td className="py-2 px-3">{medicalOperationUtils.formatNumber(r.price)}</td>
                                        <td className="py-2 px-3">
                                          <Button size="sm" className="bg-primary" onClick={() => handlePickRadiology(r)}>
                                            إضافة
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">#</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الكود</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">إسم الأشعة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">القيمة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الخصم</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الصافي</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {operation.radiology.map((rad, index) => (
                            <tr key={rad.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 px-3 text-sm">{index + 1}</td>
                              <td className="py-2 px-3 text-sm">{rad.code}</td>
                              <td className="py-2 px-3 text-sm">{rad.radiologyName}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(rad.value)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(rad.discount)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(rad.net)}</td>
                              <td className="py-2 px-3 text-sm">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                  onClick={() => removeRadiology(rad.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Analysis Tab */}
                {activeTab === "analysis" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">التحاليل</h3>
                      <Button onClick={addAnalysis} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Plus className="w-4 h-4 ml-2" />
                        إختيار
                      </Button>
                    </div>
                    {showAnalysisDialog && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/30" onClick={() => setShowAnalysisDialog(false)}></div>
                        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4">
                          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h4 className="font-bold text-gray-800">اختيار تحليل طبي</h4>
                            <Button variant="outline" onClick={() => setShowAnalysisDialog(false)}>
                              إغلاق
                            </Button>
                          </div>
                          <div className="p-4">
                            <div className="mb-3">
                              <Input
                                placeholder="ابحث باسم التحليل أو الكود..."
                                value={analysisSearch}
                                onChange={(e) => setAnalysisSearch(e.target.value)}
                              />
                            </div>
                            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-right py-2 px-3">الكود</th>
                                    <th className="text-right py-2 px-3">اسم التحليل</th>
                                    <th className="text-right py-2 px-3">إجراء</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {defaultAnalyses
                                    .filter((a: any) =>
                                      !analysisSearch.trim() ||
                                      a.name.toLowerCase().includes(analysisSearch.toLowerCase()) ||
                                      a.code.toLowerCase().includes(analysisSearch.toLowerCase())
                                    )
                                    .map((a: any) => (
                                      <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-2 px-3 font-mono">{a.code}</td>
                                        <td className="py-2 px-3">{a.name}</td>
                                        <td className="py-2 px-3">
                                          <Button size="sm" className="bg-primary" onClick={() => handlePickAnalysis(a)}>
                                            إضافة
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">#</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الكود</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">إسم التحليل</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">القيمة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الخصم</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الصافي</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {operation.analysis.map((ana, index) => (
                            <tr key={ana.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 px-3 text-sm">{index + 1}</td>
                              <td className="py-2 px-3 text-sm">{ana.code}</td>
                              <td className="py-2 px-3 text-sm">{ana.analysisName}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(ana.value)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(ana.discount)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(ana.net)}</td>
                              <td className="py-2 px-3 text-sm">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                  onClick={() => removeAnalysis(ana.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Specialties Tab */}
                {activeTab === "specialties" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">التخصصات</h3>
                      <Button onClick={addSpecialty} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Plus className="w-4 h-4 ml-2" />
                        إختيار
                      </Button>
                    </div>
                    {showSpecialtyDialog && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/30" onClick={() => setShowSpecialtyDialog(false)}></div>
                        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4">
                          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h4 className="font-bold text-gray-800">اختيار تخصص طبي</h4>
                            <Button variant="outline" onClick={() => setShowSpecialtyDialog(false)}>
                              إغلاق
                            </Button>
                          </div>
                          <div className="p-4">
                            <div className="mb-3">
                              <Input
                                placeholder="ابحث باسم التخصص أو الكود..."
                                value={specialtySearch}
                                onChange={(e) => setSpecialtySearch(e.target.value)}
                              />
                            </div>
                            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-right py-2 px-3">الكود</th>
                                    <th className="text-right py-2 px-3">اسم التخصص</th>
                                    <th className="text-right py-2 px-3">إجراء</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {defaultMedicalSpecialties
                                    .filter((sp: any) =>
                                      !specialtySearch.trim() ||
                                      sp.name.toLowerCase().includes(specialtySearch.toLowerCase()) ||
                                      sp.code.toLowerCase().includes(specialtySearch.toLowerCase())
                                    )
                                    .map((sp: any) => (
                                      <tr key={sp.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-2 px-3 font-mono">{sp.code}</td>
                                        <td className="py-2 px-3">{sp.name}</td>
                                        <td className="py-2 px-3">
                                          <Button size="sm" className="bg-primary" onClick={() => handlePickSpecialty(sp)}>
                                            إضافة
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">#</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الكود</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">إسم التخصص</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">القيمة</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الخصم</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الصافي</th>
                            <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {operation.specialties.map((spec, index) => (
                            <tr key={spec.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 px-3 text-sm">{index + 1}</td>
                              <td className="py-2 px-3 text-sm">{spec.code}</td>
                              <td className="py-2 px-3 text-sm">{spec.specialtyName}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(spec.value)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(spec.discount)}</td>
                              <td className="py-2 px-3 text-sm">{medicalOperationUtils.formatNumber(spec.net)}</td>
                              <td className="py-2 px-3 text-sm">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                  onClick={() => removeSpecialty(spec.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Totals */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-end gap-6">
                <div className="text-center">
                  <Label className="text-sm text-gray-600">الإجمالي</Label>
                  <div className="font-bold text-gray-800">{medicalOperationUtils.formatNumber(totals.total)}</div>
                </div>
                <div className="text-center">
                  <Label className="text-sm text-gray-600">الخصم</Label>
                  <div className="font-bold text-gray-800">{medicalOperationUtils.formatNumber(totals.discount)}</div>
                </div>
                <div className="text-center">
                  <Label className="text-sm text-gray-600">الصافي</Label>
                  <div className="font-bold text-gray-800">{medicalOperationUtils.formatNumber(totals.net)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button className="bg-primary text-white" onClick={handleSave}>
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
