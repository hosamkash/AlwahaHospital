"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  X, 
  Search,
  Plus
} from "lucide-react"

// تعريف واجهة الصنف
export interface Product {
  id: number
  barcode: string
  name: string
  category: string
  manufacturer: string
  unit: string
  priceCategory: string
  currentBalance: number
  price: number
}

// بيانات الأصناف الافتراضية
export const defaultProducts: Product[] = [
  {
    id: 1,
    barcode: "1234567890123",
    name: "قطن طبي",
    category: "مستلزمات طبية",
    manufacturer: "شركة الصحة",
    unit: "علبة",
    priceCategory: "عام",
    currentBalance: 150,
    price: 25.50
  },
  {
    id: 2,
    barcode: "1234567890124",
    name: "شاش طبي",
    category: "مستلزمات طبية",
    manufacturer: "شركة الصحة",
    unit: "لفة",
    priceCategory: "عام",
    currentBalance: 80,
    price: 15.75
  },
  {
    id: 3,
    barcode: "1234567890125",
    name: "محلول ملحي",
    category: "محاليل طبية",
    manufacturer: "شركة الدواء",
    unit: "زجاجة",
    priceCategory: "عام",
    currentBalance: 200,
    price: 8.25
  },
  {
    id: 4,
    barcode: "1234567890126",
    name: "حقن طبية",
    category: "مستلزمات طبية",
    manufacturer: "شركة الصحة",
    unit: "قطعة",
    priceCategory: "عام",
    currentBalance: 500,
    price: 2.50
  },
  {
    id: 5,
    barcode: "1234567890127",
    name: "قفازات طبية",
    category: "مستلزمات طبية",
    manufacturer: "شركة الحماية",
    unit: "زوج",
    priceCategory: "عام",
    currentBalance: 1000,
    price: 1.25
  },
  {
    id: 6,
    barcode: "1234567890128",
    name: "مطهر طبي",
    category: "مطهرات",
    manufacturer: "شركة النظافة",
    unit: "زجاجة",
    priceCategory: "عام",
    currentBalance: 75,
    price: 12.00
  },
  {
    id: 7,
    barcode: "1234567890129",
    name: "ضمادات لاصقة",
    category: "مستلزمات طبية",
    manufacturer: "شركة الصحة",
    unit: "علبة",
    priceCategory: "عام",
    currentBalance: 120,
    price: 18.50
  },
  {
    id: 8,
    barcode: "1234567890130",
    name: "ميزان حرارة",
    category: "أجهزة طبية",
    manufacturer: "شركة الأجهزة",
    unit: "قطعة",
    priceCategory: "عام",
    currentBalance: 15,
    price: 45.00
  }
]

interface ProductSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectProducts: (products: Product[]) => void
  title?: string
  searchPlaceholder?: string
  showManufacturer?: boolean
  showPrice?: boolean
  showBalance?: boolean
  showAddButton?: boolean
}

export default function ProductSelectionDialog({
  isOpen,
  onClose,
  onSelectProducts,
  title = "اختيار الأصناف",
  searchPlaceholder = "ابحث عن الصنف بالاسم أو الباركود أو التصنيف أو الشركة المنتجة...",
  showManufacturer = true,
  showPrice = true,
  showBalance = true,
  showAddButton = true
}: ProductSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  // فلترة الأصناف حسب البحث
  const filteredProducts = defaultProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // تحديث الكمية
  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities(prev => ({ ...prev, [productId]: quantity }))
  }

  // إضافة صنف واحد
  const handleAddSingleProduct = (product: Product) => {
    const quantity = quantities[product.id] || 1
    if (quantity > 0) {
      onSelectProducts([{
        ...product,
        selectedQuantity: quantity
      }])
      // إعادة تعيين الكمية بعد الإضافة
      setQuantities(prev => ({ ...prev, [product.id]: 1 }))
    }
  }

  // تأكيد الاختيار (للأصناف المحددة)
  const handleConfirmSelection = () => {
    // الحصول على الأصناف التي لها كمية أكبر من 0
    const productsWithQuantities = filteredProducts
      .filter(product => (quantities[product.id] || 0) > 0)
      .map(product => ({
        ...product,
        selectedQuantity: quantities[product.id] || 1
      }))
    onSelectProducts(productsWithQuantities)
    onClose()
  }

  // إغلاق الديالوج
  const handleClose = () => {
    setQuantities({})
    setSearchTerm("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <Button variant="outline" onClick={handleClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>

        <div className="h-[calc(90vh-120px)]">
          {/* قائمة الأصناف المتاحة */}
          <div className="w-full">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  className="pl-10 pr-4 py-2 w-full"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-80px)]">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الباركود</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الصنف</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">التصنيف</th>
                    {showManufacturer && (
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الشركة المنتجة</th>
                    )}
                    <th className="text-right py-3 px-4 font-medium text-gray-700">فئة السعر</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الوحدة</th>
                    {showBalance && (
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الرصيد الحالي</th>
                    )}
                    {showPrice && (
                      <th className="text-right py-3 px-4 font-medium text-gray-700">السعر</th>
                    )}
                    <th className="text-right py-3 px-4 font-medium text-gray-700">الكمية المطلوب إضافتها</th>
                    {showAddButton && (
                      <th className="text-right py-3 px-4 font-medium text-gray-700">إضافة</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono">{product.barcode}</td>
                      <td className="py-3 px-4 text-sm font-medium">{product.name}</td>
                      <td className="py-3 px-4 text-sm">{product.category}</td>
                      {showManufacturer && (
                        <td className="py-3 px-4 text-sm">{product.manufacturer}</td>
                      )}
                      <td className="py-3 px-4 text-sm">{product.priceCategory}</td>
                      <td className="py-3 px-4 text-sm">{product.unit}</td>
                      {showBalance && (
                        <td className="py-3 px-4 text-sm">{product.currentBalance}</td>
                      )}
                      {showPrice && (
                        <td className="py-3 px-4 text-sm">{product.price}</td>
                      )}
                      <td className="py-3 px-4 text-sm">
                        <Input
                          type="number"
                          min="1"
                          value={quantities[product.id] || 1}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                          className="w-20 text-sm"
                        />
                      </td>
                      {showAddButton && (
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handleAddSingleProduct(product)}
                            disabled={(quantities[product.id] || 1) <= 0}
                          >
                            إضافة
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {showAddButton 
              ? "اضغط زر + لإضافة الأصناف مباشرة" 
              : `تم تحديد كمية لـ ${filteredProducts.filter(product => (quantities[product.id] || 0) > 0).length} صنف`
            }
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleClose}>
              إغلاق
            </Button>
            {!showAddButton && (
              <Button 
                className="bg-green-600 hover:bg-green-700" 
                onClick={handleConfirmSelection}
                disabled={filteredProducts.filter(product => (quantities[product.id] || 0) > 0).length === 0}
              >
                تأكيد الاختيار
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
