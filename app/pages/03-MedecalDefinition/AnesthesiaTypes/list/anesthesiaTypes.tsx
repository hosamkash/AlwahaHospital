"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Printer } from "lucide-react"
import AnesthesiaTypesItem from "../form/anesthesiaTypesItem"
import { 
  useAnesthesiaTypesController, 
  anesthesiaTypesUtils 
} from "./anesthesiaTypesController"

type AnesthesiaTypesProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function AnesthesiaTypes({ onCreate, onEdit }: AnesthesiaTypesProps) {
  const {
    anesthesiaTypes,
    showAnesthesiaTypeDetails,
    selectedAnesthesiaType,
    isNewAnesthesiaType,
    handleNewAnesthesiaType,
    handleEditAnesthesiaType,
    handleCloseDetails,
    handleSaveAnesthesiaType,
    handleDeleteAnesthesiaType,
    searchAnesthesiaTypes,
  } = useAnesthesiaTypesController()

  const [searchTerm, setSearchTerm] = useState("")
  const filteredAnesthesiaTypes = searchAnesthesiaTypes(searchTerm)

  return (
    <div className="space-y-6">
      {showAnesthesiaTypeDetails && selectedAnesthesiaType ? (
        <AnesthesiaTypesItem
          selectedAnesthesiaType={selectedAnesthesiaType}
          isNewAnesthesiaType={isNewAnesthesiaType}
          onClose={handleCloseDetails}
          onSave={handleSaveAnesthesiaType}
        />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">أنواع التخدير</h2>
            <div className="flex items-center gap-2">
              <Button className="bg-primary" onClick={() => (onCreate ? onCreate() : handleNewAnesthesiaType())}>
                <Plus className="w-4 h-4 ml-2" />
                جديد
              </Button>
              <Button variant="outline">
                <Edit className="w-4 h-4 ml-2" />
                تعديل
              </Button>
              <Button variant="outline">
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
              <Button variant="outline">
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
              placeholder="ابحث عن نوع تخدير...."
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
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الاسم</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الوصف</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">نشط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnesthesiaTypes.map((anesthesiaType) => (
                      <tr key={anesthesiaType.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => (onEdit ? onEdit(anesthesiaType.id) : handleEditAnesthesiaType(anesthesiaType))}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteAnesthesiaType(anesthesiaType.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{anesthesiaType.code}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">{anesthesiaType.name}</td>
                        <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{anesthesiaType.description}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={anesthesiaType.active}
                              readOnly
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                            />
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
