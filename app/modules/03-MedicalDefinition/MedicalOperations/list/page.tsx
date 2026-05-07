"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Printer } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MedicalOperationsListPage() {
  const router = useRouter()

  const handleNewOperation = () => {
    router.push('/modules/03-MedicalDefinition/MedicalOperations/form')
  }

  const handleEditOperation = (operation: any) => {
    router.push(`/modules/03-MedicalDefinition/MedicalOperations/form?id=${operation.id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">عرض تعريف العمليات</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-primary" onClick={handleNewOperation}>
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
          placeholder="ابحث عن عملية...."
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
                  <th className="text-right py-3 px-4 font-medium text-gray-700">السعر</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">نشط</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditOperation({ id: 1 })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">OP001</td>
                  <td className="py-3 px-4 font-medium text-gray-800">استئصال الزائدة الدودية</td>
                  <td className="py-3 px-4 text-gray-600">2000.00</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

