"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Printer, X } from "lucide-react"
import { Job, jobUtils } from "../list/JobsController"

interface JobsItemProps {
  selectedJob?: Job | null
  isNewJob?: boolean
  onClose: () => void
  onSave?: (job: Job) => void
}

export default function JobsItem({ selectedJob, isNewJob, onClose, onSave }: JobsItemProps) {
  const [formData, setFormData] = useState<Job>(
    selectedJob || { id: 0, code: 0, name: "", description: "", active: true }
  )

  const handleInputChange = (field: keyof Job, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (jobUtils.validateJob(formData)) {
      onSave?.(formData)
    } else {
      alert("يرجى ملء جميع الحقول المطلوبة")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {isNewJob ? "إضافة وظيفة جديدة" : "تعديل بيانات الوظيفة"}
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-primary" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline">
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

      {/* Main Content */}
      <div className="space-y-6">
        {/* Job Information Section */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات الوظيفة</h3>
          <div className="space-y-4">
            {/* نشط */}
            <div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="job-active"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="job-active" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>

            {/* الكود والاسم */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job-code">الكود</Label>
                <Input
                  id="job-code"
                  type="number"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="job-name">الإسم</Label>
                <Input
                  id="job-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* الوصف */}
            <div>
              <Label htmlFor="job-description">الوصف</Label>
              <Textarea
                id="job-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1"
                rows={3}
                placeholder="وصف مختصر للوظيفة"
              />
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-primary" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline">
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
    </div>
  )
}
