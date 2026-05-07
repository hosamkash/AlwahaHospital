"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Printer, Filter, ChevronDown, User } from "lucide-react"
import GuarantorsItem from "../form/guarantorsItem"
import GuarantorContextMenu from "./guarantorContextMenu"
import { 
  useGuarantorsController, 
  guarantorUtils 
} from "./guarantorsController"

type GuarantorsProps = {
  onCreate?: () => void
  onEdit?: (id: number) => void
}

export default function Guarantors({ onCreate, onEdit }: GuarantorsProps) {
  const {
    guarantors,
    showGuarantorDetails,
    selectedGuarantor,
    isNewGuarantor,
    showContextMenu,
    contextMenuPosition,
    handleNewGuarantor,
    handleEditGuarantor,
    handleCloseDetails,
    handleSaveGuarantor,
    handleDeleteGuarantor,
    searchGuarantors,
    getTotalBalance,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleContextMenuAction,
  } = useGuarantorsController()

  const [searchTerm, setSearchTerm] = useState("")
  const filteredGuarantors = searchGuarantors(searchTerm)
  const totalBalance = getTotalBalance()

  return (
    <div className="space-y-6">
      {showGuarantorDetails && selectedGuarantor ? (
        <GuarantorsItem
          selectedGuarantor={selectedGuarantor}
          isNewGuarantor={isNewGuarantor}
          onClose={handleCloseDetails}
          onSave={handleSaveGuarantor}
        />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">عرض المرافق - الضامن</h2>
            <div className="flex items-center gap-2">
              <Button className="bg-primary" onClick={() => (onCreate ? onCreate() : handleNewGuarantor())}>
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
              <Button className="bg-primary" onClick={(e) => handleOpenContextMenu(e)}>
                <User className="w-4 h-4 ml-2" />
                إدارة المرافق
              </Button>
            </div>
          </div>

          

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          إجراءات
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          #
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          الفرع
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          الكود
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          الإسم
                        </div>
                      </th>
                     
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          الموبيل
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          الهاتف
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          العنوان
                        </div>
                      </th>
                     
                      <th className="text-right py-3 px-4 font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          نشط
                        </div>
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGuarantors.map((guarantor, index) => (
                      <tr 
                        key={guarantor.id} 
                        className="border-b border-gray-100 hover:bg-gray-50"
                        onContextMenu={(e) => handleOpenContextMenu(e, guarantor)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                                                         <button
                              onClick={(e) => {
                                e.stopPropagation()
                                onEdit ? onEdit(guarantor.id) : handleEditGuarantor(guarantor)
                              }}
                             className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                             title="تعديل"
                           >
                             <Edit className="w-4 h-4" />
                           </button>
                           <button
                             onClick={(e) => {
                               e.stopPropagation()
                                                               if (confirm(`هل أنت متأكد من حذف المرافق "${guarantor.name}"؟`)) {
                                 handleDeleteGuarantor(guarantor.id)
                               }
                             }}
                             className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                             title="حذف"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                       </td>
                       <td className="py-3 px-4 text-gray-600 cursor-pointer" onClick={() => (onEdit ? onEdit(guarantor.id) : handleEditGuarantor(guarantor))}>{index + 1}</td>
                       <td className="py-3 px-4 text-gray-600">{guarantor.branch}</td>
                       <td className="py-3 px-4 text-gray-600">{guarantor.code}</td>
                       <td className="py-3 px-4 font-medium text-gray-800">{guarantor.name}</td>
                       <td className="py-3 px-4 text-gray-600">{guarantor.mobile || "-"}</td>
                       <td className="py-3 px-4 text-gray-600">{guarantor.phone || "-"}</td>
                       <td className="py-3 px-4 text-gray-600">{guarantor.address || "-"}</td>
                       <td className="py-3 px-4">
                         <div className="flex items-center justify-center">
                           <input
                             type="checkbox"
                             checked={guarantor.active}
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

            {/* Context Menu */}
      <GuarantorContextMenu
       isOpen={showContextMenu}
       position={contextMenuPosition}
       onClose={handleCloseContextMenu}
       onAction={handleContextMenuAction}
     />
   </div>
 )
}
