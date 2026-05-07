"use client"

import EmployeesItem from "./employeesItem"
import { useEmployeesController } from "../list/employeesController"
import { useRouter } from "next/navigation"

export default function EmployeesFormPage() {
  const router = useRouter()
  const { selectedEmployee, isNewEmployee, handleCloseDetails, handleSaveEmployee, createNewEmployee } = useEmployeesController()
  
  // إذا لم يكن هناك موظف محدد، أنشئ موظف جديد
  const employeeToShow = selectedEmployee || createNewEmployee()
  
  // دالة الإغلاق التي تنتقل للصفحة السابقة
  const handleClose = () => {
    handleCloseDetails()
    router.push('/modules/04-DealingViews/Employees')
  }
  
  return (
    <EmployeesItem
      selectedEmployee={employeeToShow}
      isNewEmployee={!selectedEmployee}
      onClose={handleClose}
      onSave={handleSaveEmployee}
    />
  )
}

