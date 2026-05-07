"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Camera,
  Upload,
  Printer,
  Save,
  X,
  Trash2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building,
  Briefcase,
  DollarSign,
  Clock,
  GraduationCap,
  Award,
  FileText,
  CreditCard,
  Gift,
  AlertTriangle,
  Minus,
  Plus,
  CheckCircle,
  Percent,
  RefreshCw,
  Folder,
  FileCheck
} from "lucide-react"
import { 
  Employee, 
  tabData, 
  employeeTypes,
  departments,
  maritalStatuses,
  militaryStatuses,
  religions,
  employmentTypes,
  employeeUtils 
} from "../list/employeesController"

interface EmployeesItemProps {
  selectedEmployee: Employee | null
  isNewEmployee: boolean
  onClose: () => void
  onSave?: (employee: Employee) => void
}

export default function EmployeesItem({
  selectedEmployee,
  isNewEmployee,
  onClose,
  onSave,
}: EmployeesItemProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [moduleColor, setModuleColor] = useState<string>("#f97316") // default orange for dealing views

  // Load module color from localStorage
  useEffect(() => {
    const loadModuleColor = () => {
      try {
        const adminSettings = localStorage.getItem('adminSettingsGroupColors')
        if (adminSettings) {
          const colors = JSON.parse(adminSettings)
          if (colors.dealingViews) {
            setModuleColor(colors.dealingViews)
          }
        }
      } catch (error) {
        console.error('Error loading module color:', error)
      }
    }

    loadModuleColor()

    // Listen for color changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminSettingsGroupColors') {
        loadModuleColor()
      }
    }

    // Listen for custom color change events
    const handleColorChange = () => {
      loadModuleColor()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('moduleColorChanged', handleColorChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('moduleColorChanged', handleColorChange)
    }
  }, [])

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('يرجى اختيار ملف صورة صحيح')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
      }
      reader.onerror = () => {
        alert('خطأ في قراءة الملف')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfile = () => {
    setProfileImage(null)
    const fileInput = document.getElementById('profile-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  if (!selectedEmployee) return null

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800">
            {isNewEmployee ? "إضافة موظف جديد" : "تعديل بيانات الموظف"}
          </h2>
          <div className="flex items-center gap-2">
            <Button 
              className="text-white"
              style={{ backgroundColor: moduleColor }}
            >
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
        {/* Employee Identification Section */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <div className="flex gap-6">
            {/* Employee Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 relative overflow-hidden group">
                  {profileImage ? (
                    <div className="w-full h-full flex items-center justify-center bg-white">
                      <img 
                        src={profileImage} 
                        alt="Employee Profile" 
                        className="w-full h-full object-cover rounded-lg"
                        style={{ 
                          display: 'block',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                        onError={() => {
                          alert('فشل في تحميل الصورة')
                          setProfileImage(null)
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">اضغط لرفع الصورة</p>
                      <p className="text-xs text-gray-400">JPG, PNG, GIF</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleProfileUpload}
                  />
                </div>
                
                <div className="flex gap-2 mt-3 justify-center">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                    onClick={() => document.getElementById('profile-upload')?.click()}
                  >
                    <Upload className="w-3 h-3 ml-1" />
                    رفع
                  </Button>
                  {profileImage && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      onClick={handleRemoveProfile}
                    >
                      <Trash2 className="w-3 h-3 ml-1" />
                      حذف
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Employee Basic Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employee-code">كود الموظف</Label>
                <Input id="employee-code" defaultValue={selectedEmployee.code} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="employee-name">إسم الموظف</Label>
                <Input id="employee-name" defaultValue={selectedEmployee.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="employee-type">نوع الموظف</Label>
                <div className="relative mt-1">
                  <select 
                    id="employee-type" 
                    defaultValue={selectedEmployee.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">اختر نوع الموظف</option>
                    {employeeTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="employee-department">القسم</Label>
                <div className="relative mt-1">
                  <select 
                    id="employee-department" 
                    defaultValue={selectedEmployee.department}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">اختر القسم</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

                 {/* Tabs Layout */}
         <div className="bg-white rounded-lg mb-6">
           <div className="flex">
             {/* Tabs Navigation - Right Side */}
             <div className="w-64 border-l border-gray-200 bg-gray-50">
               <nav className="p-4 space-y-2" aria-label="Tabs">
                 {tabData.map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`w-full text-right py-3 px-4 rounded-lg font-medium text-sm transition-colors duration-200 ${
                       activeTab === tab.id
                         ? "bg-blue-500 text-white shadow-md"
                         : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                     }`}
                   >
                     {tab.name}
                   </button>
                 ))}
               </nav>
             </div>

             {/* Tab Content - Left Side */}
             <div className="flex-1 p-6">
            {activeTab === "personal" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="national-id">الرقم القومي</Label>
                    <Input id="national-id" defaultValue={selectedEmployee.nationalId} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="birth-date">تاريخ الميلاد</Label>
                    <div className="relative mt-1">
                      <Input id="birth-date" type="date" defaultValue={selectedEmployee.birthDate} className="pr-8" />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">الهاتف</Label>
                    <div className="relative mt-1">
                      <Input id="phone" defaultValue={selectedEmployee.phone} className="pr-8" />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mobile">الموبيل</Label>
                    <Input id="mobile" defaultValue={selectedEmployee.mobile} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative mt-1">
                      <Input id="email" defaultValue={selectedEmployee.email} className="pr-8" />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                                     <div>
                     <Label htmlFor="marital-status">الحالة الاجتماعية</Label>
                     <div className="relative mt-1">
                       <select 
                         id="marital-status" 
                         defaultValue={selectedEmployee.personalData.maritalStatus}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       >
                         <option value="">اختر الحالة</option>
                         {maritalStatuses.map((status) => (
                           <option key={status} value={status}>{status}</option>
                         ))}
                       </select>
                     </div>
                   </div>
                   <div>
                     <Label htmlFor="military-status">الموقف من التجنيد</Label>
                     <div className="relative mt-1">
                       <select 
                         id="military-status" 
                         defaultValue={selectedEmployee.personalData.militaryStatus}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       >
                         <option value="">اختر الموقف</option>
                         {militaryStatuses.map((status) => (
                           <option key={status} value={status}>{status}</option>
                         ))}
                       </select>
                     </div>
                   </div>
                   <div>
                     <Label htmlFor="religion">الديانة</Label>
                     <div className="relative mt-1">
                       <select 
                         id="religion" 
                         defaultValue={selectedEmployee.personalData.religion}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       >
                         <option value="">اختر الديانة</option>
                         {religions.map((religion) => (
                           <option key={religion} value={religion}>{religion}</option>
                         ))}
                       </select>
                     </div>
                   </div>
                </div>
                <div>
                  <Label htmlFor="address">العنوان</Label>
                  <div className="relative mt-1">
                    <Textarea id="address" defaultValue={selectedEmployee.address} className="pr-8" rows={3} />
                    <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                      <MapPin className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "job" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="job-title">المسمى الوظيفي</Label>
                    <Input id="job-title" defaultValue={selectedEmployee.jobData.jobTitle} className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="work-location">موقع العمل</Label>
                    <Input id="work-location" defaultValue={selectedEmployee.jobData.workLocation} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="employment-type">نوع التوظيف</Label>
                    <div className="relative mt-1">
                      <select 
                        id="employment-type" 
                        defaultValue={selectedEmployee.jobData.employmentType}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر النوع</option>
                        {employmentTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hire-date">تاريخ التعيين</Label>
                    <div className="relative mt-1">
                      <Input id="hire-date" type="date" defaultValue={selectedEmployee.hireDate} className="pr-8" />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="probation-period">فترة التجربة</Label>
                    <Input id="probation-period" defaultValue={selectedEmployee.jobData.probationPeriod} className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="work-schedule">جدول العمل</Label>
                    <Input id="work-schedule" defaultValue={selectedEmployee.attendanceData.workSchedule} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="work-start-time">مواعيد العمل من الساعة</Label>
                    <Input id="work-start-time" type="time" defaultValue={selectedEmployee.attendanceData.workStartTime} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="work-end-time">مواعيد العمل إلى الساعة</Label>
                    <Input id="work-end-time" type="time" defaultValue={selectedEmployee.attendanceData.workEndTime} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="work-hours">عدد الساعات فرق بين الاتنين</Label>
                    <Input id="work-hours" defaultValue={selectedEmployee.attendanceData.workHours} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="attendance-rate">نسبة الحضور</Label>
                    <div className="relative mt-1">
                      <Input id="attendance-rate" type="number" defaultValue={selectedEmployee.attendanceData.attendanceRate} className="pr-8" />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Percent className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="late-days">أيام التأخير</Label>
                    <Input id="late-days" type="number" defaultValue={selectedEmployee.attendanceData.lateDays} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="absent-days">أيام الغياب</Label>
                    <Input id="absent-days" type="number" defaultValue={selectedEmployee.attendanceData.absentDays} className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "salary" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="basic-salary">الراتب الأساسي</Label>
                    <div className="relative mt-1">
                      <Input id="basic-salary" type="number" defaultValue={selectedEmployee.salaryData.basicSalary} className="pr-8" />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="allowances">البدلات</Label>
                    <Input id="allowances" type="number" defaultValue={selectedEmployee.salaryData.allowances} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="deductions">الخصومات</Label>
                    <Input id="deductions" type="number" defaultValue={selectedEmployee.salaryData.deductions} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="net-salary">صافي الراتب</Label>
                    <Input id="net-salary" type="number" defaultValue={selectedEmployee.salaryData.netSalary} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="bank-account">رقم الحساب البنكي</Label>
                    <Input id="bank-account" defaultValue={selectedEmployee.salaryData.bankAccount} className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vacation" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annual-leave">الإجازة السنوية</Label>
                    <Input id="annual-leave" type="number" defaultValue={selectedEmployee.vacationData.annualLeave} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="sick-leave">الإجازة المرضية</Label>
                    <Input id="sick-leave" type="number" defaultValue={selectedEmployee.vacationData.sickLeave} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="emergency-leave">الإجازة الطارئة</Label>
                    <Input id="emergency-leave" type="number" defaultValue={selectedEmployee.vacationData.emergencyLeave} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="used-leave">الإجازات المستخدمة</Label>
                    <Input id="used-leave" type="number" defaultValue={selectedEmployee.vacationData.usedLeave} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="remaining-leave">الإجازات المتبقية</Label>
                    <Input id="remaining-leave" type="number" defaultValue={selectedEmployee.vacationData.remainingLeave} className="mt-1" />
                  </div>
                </div>
              </div>
            )}



            {activeTab === "qualifications" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="education">المؤهل العلمي</Label>
                  <Input id="education" defaultValue={selectedEmployee.qualifications.education} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="certificates">الشهادات</Label>
                  <Textarea id="certificates" defaultValue={selectedEmployee.qualifications.certificates.join('\n')} className="mt-1" rows={3} />
                </div>
                <div>
                  <Label htmlFor="skills">المهارات</Label>
                  <Textarea id="skills" defaultValue={selectedEmployee.qualifications.skills.join('\n')} className="mt-1" rows={3} />
                </div>
                <div>
                  <Label htmlFor="languages">اللغات</Label>
                  <Textarea id="languages" defaultValue={selectedEmployee.qualifications.languages.join('\n')} className="mt-1" rows={2} />
                </div>
                <div>
                  <Label htmlFor="previous-jobs">الوظائف السابقة</Label>
                  <Textarea id="previous-jobs" defaultValue={selectedEmployee.qualifications.previousJobs.join('\n')} className="mt-1" rows={3} />
                </div>
                <div>
                  <Label htmlFor="training-courses">الدورات التدريبية</Label>
                  <Textarea id="training-courses" defaultValue={selectedEmployee.qualifications.trainingCourses.join('\n')} className="mt-1" rows={3} />
                </div>
                <div>
                  <Label htmlFor="achievements">الإنجازات</Label>
                  <Textarea id="achievements" defaultValue={selectedEmployee.qualifications.achievements.join('\n')} className="mt-1" rows={3} />
                </div>
              </div>
            )}



            
             </div>
           </div>
         </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
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
