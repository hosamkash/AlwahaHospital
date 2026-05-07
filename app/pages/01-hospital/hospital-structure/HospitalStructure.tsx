"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Save,
  X,
  Settings,
  Users,
  Stethoscope,
  AlertTriangle,
  Utensils,
  TestTube,
  Microscope,
  Coffee,
  Shield,
  Monitor,
  Heart,
  Package,
} from "lucide-react"

export default function HospitalStructure() {
  const handleGreenButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    if (target) {
      target.style.backgroundColor = "#16a34a"
      setTimeout(() => {
        if (target && target.style) {
          target.style.backgroundColor = ""
        }
      }, 150)
    }
  }

  const handleButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    if (target) {
      target.style.backgroundColor = "#dcfce7"
      setTimeout(() => {
        if (target && target.style) {
          target.style.backgroundColor = ""
        }
      }, 150)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">هيكل المستشفى - التأسيس</h2>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors"
            onMouseDown={handleGreenButtonPress}
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة طابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-gray-50 active:bg-green-100 transition-colors bg-transparent"
            onMouseDown={handleButtonPress}
          >
            <Save className="w-4 h-4 ml-2" />
            حفظ التصميم
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* قائمة أنواع الغرف */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">أنواع الغرف والمرافق</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <Users className="w-5 h-5 ml-2 text-blue-600" />
                  دورة مياه
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <Stethoscope className="w-5 h-5 ml-2 text-green-600" />
                  صيدلية
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <AlertTriangle className="w-5 h-5 ml-2 text-orange-600" />
                  مخزن
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <Utensils className="w-5 h-5 ml-2 text-purple-600" />
                  مطبخ
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <TestTube className="w-5 h-5 ml-2 text-red-600" />
                  معمل تحاليل
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <Microscope className="w-5 h-5 ml-2 text-indigo-600" />
                  استقبال
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <Coffee className="w-5 h-5 ml-2 text-yellow-600" />
                  مطعم
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <Shield className="w-5 h-5 ml-2 text-gray-600" />
                  وحدة أمنية
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <Monitor className="w-5 h-5 ml-2 text-cyan-600" />
                  مكتب إداري
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <Heart className="w-5 h-5 ml-2 text-pink-600" />
                  غرفة تحكم
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* منطقة التصميم */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">تصميم المستشفى</CardTitle>
                <div className="flex items-center gap-2">
                  <Label htmlFor="floor-select">عدد الطوابق:</Label>
                  <select
                    id="floor-select"
                    className="border border-gray-300 rounded px-2 py-1"
                    defaultValue="2"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* الطابق الأول */}
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[300px]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">الطابق 1</h3>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onMouseDown={handleButtonPress}>
                        <X className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onMouseDown={handleButtonPress}>
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4 h-48">
                    {/* غرف الطابق الأول */}
                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Users className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">عيادات</p>
                        <p className="text-xs text-gray-600">غير مشغولة</p>
                        <p className="text-xs text-gray-600">رقم: 1</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Users className="w-8 h-8 text-gray-400 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">دورة مياه</p>
                        <p className="text-xs text-gray-600">مزدوجة</p>
                        <p className="text-xs text-gray-600">رقم: 1</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Plus className="w-8 h-8 text-green-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">صيدلية</p>
                        <p className="text-xs text-gray-600">الحجة</p>
                        <p className="text-xs text-gray-600">رقم: 3</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Package className="w-8 h-8 text-orange-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة</p>
                        <p className="text-xs text-gray-600">الحجة</p>
                        <p className="text-xs text-gray-600">رقم: 2</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-gray-100 flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* الطابق الثاني */}
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[300px]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">الطابق 2</h3>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onMouseDown={handleButtonPress}>
                        <X className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onMouseDown={handleButtonPress}>
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4 h-48">
                    {/* غرف الطابق الثاني */}
                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Users className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">عيادات</p>
                        <p className="text-xs text-gray-600">غير مشغولة</p>
                        <p className="text-xs text-gray-600">رقم: 5</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Users className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">عيادات</p>
                        <p className="text-xs text-gray-600">غير مشغولة</p>
                        <p className="text-xs text-gray-600">رقم: 4</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Users className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">عيادات</p>
                        <p className="text-xs text-gray-600">غير مشغولة</p>
                        <p className="text-xs text-gray-600">رقم: 3</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Monitor className="w-8 h-8 text-cyan-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة تحكم</p>
                        <p className="text-xs text-gray-600">غير مشغولة</p>
                        <p className="text-xs text-gray-600">رقم: 2</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-white flex flex-col items-center justify-center hover:border-green-500 cursor-pointer transition-colors">
                      <Utensils className="w-8 h-8 text-purple-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">مطعم</p>
                        <p className="text-xs text-gray-600">الحجة</p>
                        <p className="text-xs text-gray-600">رقم: 1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* أزرار التحكم */}
              <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors"
                  onMouseDown={handleGreenButtonPress}
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-gray-50 active:bg-green-100 transition-colors bg-transparent"
                  onMouseDown={handleButtonPress}
                >
                  <X className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}