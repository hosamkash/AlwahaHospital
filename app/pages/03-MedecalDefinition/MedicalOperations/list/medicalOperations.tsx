"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Printer } from "lucide-react"
import MedicalOperationsItem from "../form/medicalOperationsItem"
import { 
  useMedicalOperationsController, 
  medicalOperationUtils 
} from "./medicalOperationsController"

type MedicalOperationsProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function MedicalOperations({ onCreate, onEdit }: MedicalOperationsProps) {
  const {
    medicalOperations,
    showOperationDetails,
    selectedOperation,
    isNewOperation,
    handleNewOperation,
    handleEditOperation,
    handleCloseDetails,
    handleSaveOperation,
    handleDeleteOperation,
    searchOperations,
  } = useMedicalOperationsController()

  const [searchTerm, setSearchTerm] = useState("")
  const filteredOperations = searchOperations(searchTerm)

  return (
    <div className="space-y-6">
      {showOperationDetails && selectedOperation ? (
        <MedicalOperationsItem
          selectedOperation={selectedOperation}
          isNewOperation={isNewOperation}
          onClose={handleCloseDetails}
          onSave={handleSaveOperation}
        />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">تعريف العمليات الطبية</h2>
            <div className="flex items-center gap-2">
              <Button className="bg-primary" onClick={() => (onCreate ? onCreate() : handleNewOperation())}>
                <Plus className="w-4 h-4 ml-2" />
                جديد
              </Button>
              <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                <Edit className="w-4 h-4 ml-2" />
                تعديل
              </Button>
              <Button variant="outline" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
              <Button variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100">
                <Printer className="w-4 h-4 ml-2" />
                طباعة
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Input
              className="pl-10 pr-4 py-2 w-full"
              placeholder="ابحث عن عملية طبية...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الإجراءات</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الكود</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">اسم العملية</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">نوع التخدير</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الإجمالي</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الخصم</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الصافي</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">نشط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOperations.map((operation) => (
                      <tr key={operation.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                              onClick={() => (onEdit ? onEdit(operation.id) : handleEditOperation(operation))}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                              onClick={() => handleDeleteOperation(operation.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 font-mono">{operation.code}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">{operation.name}</td>
                        <td className="py-3 px-4 text-gray-600">{operation.anesthesiaType}</td>
                        <td className="py-3 px-4 text-gray-600 font-mono">{medicalOperationUtils.formatNumber(operation.total)}</td>
                        <td className="py-3 px-4 text-gray-600 font-mono">{medicalOperationUtils.formatNumber(operation.discount)}</td>
                        <td className="py-3 px-4 text-gray-600 font-mono font-semibold">{medicalOperationUtils.formatNumber(operation.net)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              operation.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {operation.active ? 'نشط' : 'غير نشط'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">عدد العناصر في الصفحة</span>
                <div className="relative">
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm appearance-none pr-8">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
