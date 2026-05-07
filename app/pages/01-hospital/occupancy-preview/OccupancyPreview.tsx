"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Printer, Bed } from "lucide-react"

interface Room {
  id: string
  name: string
  status: string
  floor: number
  patient?: string
}

interface OccupancyPreviewProps {
  setShowRoomBooking?: (show: boolean) => void
  handleRoomClick?: (room: Room) => void
}

export default function OccupancyPreview({ 
  setShowRoomBooking = () => {}, 
  handleRoomClick = () => {} 
}: OccupancyPreviewProps) {
  const roomStates = [
    {
      id: "available",
      name: "متاحة",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      textColor: "text-green-600",
    },
    {
      id: "occupied",
      name: "محجوزة",
      color: "red",
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
      textColor: "text-red-600",
    },
    {
      id: "cleaning",
      name: "قيد التنظيف",
      color: "yellow",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-600",
    },
    {
      id: "maintenance",
      name: "صيانة",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-400",
      textColor: "text-orange-600",
    },
    {
      id: "out-of-service",
      name: "خارج الخدمة",
      color: "gray",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-400",
      textColor: "text-gray-600",
    },
    {
      id: "under-construction",
      name: "تحت الإنشاء",
      color: "purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-400",
      textColor: "text-purple-600",
    },
  ]

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
        <h2 className="text-2xl font-bold text-gray-800">معاينة إشغال المستشفى</h2>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors"
            onMouseDown={handleGreenButtonPress}
            onClick={() => setShowRoomBooking(true)}
          >
            <Calendar className="w-4 h-4 ml-2" />
            حجز جديد
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-gray-50 active:bg-green-100 transition-colors bg-transparent"
            onMouseDown={handleButtonPress}
          >
            <Printer className="w-4 h-4 ml-2" />
            تقرير الإشغال
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* إحصائيات سريعة */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">إحصائيات الإشغال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600">غرف متاحة</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">6</p>
                <p className="text-sm text-gray-600">غرف محجوزة</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">2</p>
                <p className="text-sm text-gray-600">قيد التنظيف</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">1</p>
                <p className="text-sm text-gray-600">صيانة</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-600">1</p>
                <p className="text-sm text-gray-600">خارج الخدمة</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">67%</p>
                <p className="text-sm text-gray-600">معدل الإشغال</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* خريطة الإشغال */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">خريطة إشغال الغرف - الوقت الحالي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* الطابق الأول */}
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4">الطابق الأول</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div
                      className="border-2 border-green-400 rounded-lg p-3 bg-green-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({ id: "101", name: "غرفة 101", status: "available", floor: 1 })
                      }
                    >
                      <Bed className="w-8 h-8 text-green-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 101</p>
                        <p className="text-xs text-green-600">متاحة</p>
                      </div>
                    </div>

                    <div
                      className="border-2 border-red-400 rounded-lg p-3 bg-red-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({
                          id: "102",
                          name: "غرفة 102",
                          status: "occupied",
                          floor: 1,
                          patient: "أحمد محمد",
                        })
                      }
                    >
                      <Bed className="w-8 h-8 text-red-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 102</p>
                        <p className="text-xs text-red-600">محجوزة</p>
                        <p className="text-xs text-gray-600">أحمد محمد</p>
                      </div>
                    </div>

                    <div
                      className="border-2 border-red-400 rounded-lg p-3 bg-red-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({
                          id: "103",
                          name: "غرفة 103",
                          status: "occupied",
                          floor: 1,
                          patient: "فاطمة علي",
                        })
                      }
                    >
                      <Bed className="w-8 h-8 text-red-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 103</p>
                        <p className="text-xs text-red-600">محجوزة</p>
                        <p className="text-xs text-gray-600">فاطمة علي</p>
                      </div>
                    </div>

                    <div
                      className="border-2 border-yellow-400 rounded-lg p-3 bg-yellow-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({ id: "104", name: "غرفة 104", status: "cleaning", floor: 1 })
                      }
                    >
                      <Bed className="w-8 h-8 text-yellow-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 104</p>
                        <p className="text-xs text-yellow-600">قيد التنظيف</p>
                      </div>
                    </div>

                    <div
                      className="border-2 border-orange-400 rounded-lg p-3 bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({ id: "105", name: "غرفة 105", status: "maintenance", floor: 1 })
                      }
                    >
                      <Bed className="w-8 h-8 text-orange-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 105</p>
                        <p className="text-xs text-orange-600">صيانة</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* الطابق الثاني */}
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4">الطابق الثاني</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div
                      className="border-2 border-red-400 rounded-lg p-3 bg-red-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({
                          id: "201",
                          name: "غرفة 201",
                          status: "occupied",
                          floor: 2,
                          patient: "محمد أحمد",
                        })
                      }
                    >
                      <Bed className="w-8 h-8 text-red-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 201</p>
                        <p className="text-xs text-red-600">محجوزة</p>
                        <p className="text-xs text-gray-600">محمد أحمد</p>
                      </div>
                    </div>

                    <div
                      className="border-2 border-green-400 rounded-lg p-3 bg-green-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({ id: "202", name: "غرفة 202", status: "available", floor: 2 })
                      }
                    >
                      <Bed className="w-8 h-8 text-green-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 202</p>
                        <p className="text-xs text-green-600">متاحة</p>
                      </div>
                    </div>

                    <div
                      className="border-2 border-gray-400 rounded-lg p-3 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({ id: "203", name: "غرفة 203", status: "out-of-service", floor: 2 })
                      }
                    >
                      <Bed className="w-8 h-8 text-gray-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 203</p>
                        <p className="text-xs text-gray-600">خارج الخدمة</p>
                      </div>
                    </div>

                    <div
                      className="border-2 border-yellow-400 rounded-lg p-3 bg-yellow-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({ id: "204", name: "غرفة 204", status: "cleaning", floor: 2 })
                      }
                    >
                      <Bed className="w-8 h-8 text-yellow-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 204</p>
                        <p className="text-xs text-yellow-600">قيد التنظيف</p>
                      </div>
                    </div>

                    <div
                      className="border-2 border-purple-400 rounded-lg p-3 bg-purple-50 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        handleRoomClick({
                          id: "205",
                          name: "غرفة 205",
                          status: "under-construction",
                          floor: 2,
                        })
                      }
                    >
                      <Bed className="w-8 h-8 text-purple-600 mb-2" />
                      <div className="text-center">
                        <p className="text-xs font-medium">غرفة 205</p>
                        <p className="text-xs text-purple-600">تحت الإنشاء</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* مفتاح الألوان المحدث */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-200 flex-wrap">
                {roomStates.map((state) => (
                  <div key={state.id} className="flex items-center gap-2">
                    <div className={`w-4 h-4 bg-${state.color}-400 rounded`}></div>
                    <span className="text-sm">{state.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
