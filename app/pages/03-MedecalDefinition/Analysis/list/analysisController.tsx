"use client"

import { useState } from "react"

// Interface مشتركة لبيانات التحليل الطبي
export interface Analysis {
  id: number
  code: string
  name: string
  description: string
  active: boolean
}

// البيانات الافتراضية للتحاليل الطبية
export const defaultAnalyses: Analysis[] = [
  {
    id: 1,
    code: "CBC",
    name: "تحليل صورة الدم الكاملة",
    description: "تحليل شامل لمكونات الدم بما في ذلك خلايا الدم الحمراء والبيضاء والصفائح الدموية",
    active: true
  },
  {
    id: 2,
    code: "LFT",
    name: "تحليل وظائف الكبد",
    description: "تحليل شامل لوظائف الكبد ومستويات الإنزيمات والبروتينات",
    active: true
  },
  {
    id: 3,
    code: "KFT",
    name: "تحليل وظائف الكلى",
    description: "تحليل شامل لوظائف الكلى ومستويات الكرياتينين واليوريا",
    active: true
  },
  {
    id: 4,
    code: "LIPID",
    name: "تحليل الدهون",
    description: "تحليل مستويات الكوليسترول والدهون الثلاثية في الدم",
    active: true
  },
  {
    id: 5,
    code: "THYROID",
    name: "تحليل وظائف الغدة الدرقية",
    description: "تحليل مستويات هرمونات الغدة الدرقية (TSH, T3, T4)",
    active: true
  },
  {
    id: 6,
    code: "DIABETES",
    name: "تحليل السكري",
    description: "تحليل مستويات السكر في الدم والهيموجلوبين السكري",
    active: true
  },
  {
    id: 7,
    code: "VITAMIN",
    name: "تحليل الفيتامينات",
    description: "تحليل مستويات الفيتامينات والمعادن في الجسم",
    active: true
  },
  {
    id: 8,
    code: "HORMONE",
    name: "تحليل الهرمونات",
    description: "تحليل مستويات الهرمونات المختلفة في الجسم",
    active: true
  },
  {
    id: 9,
    code: "CARDIO",
    name: "تحليل القلب",
    description: "تحليل إنزيمات القلب ومؤشرات أمراض القلب",
    active: true
  },
  {
    id: 10,
    code: "IMMUNE",
    name: "تحليل المناعة",
    description: "تحليل مستويات الأجسام المضادة والمناعة",
    active: true
  }
]

// Hook مشترك لإدارة حالة التحاليل الطبية
export function useAnalysisController() {
  const [analyses, setAnalyses] = useState<Analysis[]>(defaultAnalyses)
  const [showAnalysisDetails, setShowAnalysisDetails] = useState(false)
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null)
  const [isNewAnalysis, setIsNewAnalysis] = useState(false)

  // إنشاء تحليل جديد
  const createNewAnalysis = (): Analysis => ({
    id: 0,
    code: "",
    name: "",
    description: "",
    active: true
  })

  // فتح شاشة إضافة تحليل جديد
  const handleNewAnalysis = () => {
    setSelectedAnalysis(createNewAnalysis())
    setShowAnalysisDetails(true)
    setIsNewAnalysis(true)
  }

  // فتح شاشة تعديل تحليل
  const handleEditAnalysis = (analysis: Analysis) => {
    setSelectedAnalysis(analysis)
    setShowAnalysisDetails(true)
    setIsNewAnalysis(false)
  }

  // إغلاق شاشة التفاصيل
  const handleCloseDetails = () => {
    setShowAnalysisDetails(false)
    setSelectedAnalysis(null)
    setIsNewAnalysis(false)
  }

  // حفظ التحليل
  const handleSaveAnalysis = (analysisData: Analysis) => {
    if (isNewAnalysis) {
      // إضافة تحليل جديد
      const newAnalysis = {
        ...analysisData,
        id: Math.max(...analyses.map(a => a.id)) + 1
      }
      setAnalyses([...analyses, newAnalysis])
    } else {
      // تحديث تحليل موجود
      setAnalyses(analyses.map(a => 
        a.id === analysisData.id ? analysisData : a
      ))
    }
    handleCloseDetails()
  }

  // حذف تحليل
  const handleDeleteAnalysis = (analysisId: number) => {
    setAnalyses(analyses.filter(a => a.id !== analysisId))
  }

  // البحث في التحاليل
  const searchAnalyses = (searchTerm: string) => {
    if (!searchTerm.trim()) return analyses
    
    return analyses.filter(analysis =>
      analysis.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    analyses,
    showAnalysisDetails,
    selectedAnalysis,
    isNewAnalysis,
    handleNewAnalysis,
    handleEditAnalysis,
    handleCloseDetails,
    handleSaveAnalysis,
    handleDeleteAnalysis,
    searchAnalyses,
  }
}

// Utility functions مشتركة
export const analysisUtils = {
  // التحقق من صحة بيانات التحليل
  validateAnalysis: (analysis: Analysis): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!analysis.name.trim()) errors.push("اسم التحليل مطلوب")
    if (!analysis.code.trim()) errors.push("كود التحليل مطلوب")
    if (!analysis.description.trim()) errors.push("وصف التحليل مطلوب")
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // تحويل الحالة إلى نص
  getStatusText: (active: boolean): string => {
    return active ? "نشط" : "غير نشط"
  },

  // الحصول على لون الحالة
  getStatusColor: (active: boolean): string => {
    return active ? "bg-green-500" : "bg-red-500"
  },

  // تنسيق كود التحليل
  formatAnalysisCode: (code: string): string => {
    return code.toUpperCase().trim()
  }
}
