"use client"

import { useState } from "react"

// Interface for Job
export interface Job {
  id: number
  code: number
  name: string
  active: boolean
  description: string
}

// Default Jobs Data
export const defaultJobs: Job[] = [
  {
    id: 1,
    code: 1001,
    name: "مدير عام",
    active: true,
    description: "المدير العام للمستشفى"
  },
  {
    id: 2,
    code: 1002,
    name: "مدير إداري",
    active: true,
    description: "مدير الشؤون الإدارية"
  },
  {
    id: 3,
    code: 1003,
    name: "مدير مالي",
    active: true,
    description: "مدير الشؤون المالية"
  },
  {
    id: 4,
    code: 1004,
    name: "مدير طبي",
    active: true,
    description: "مدير الشؤون الطبية"
  },
  {
    id: 5,
    code: 1005,
    name: "مدير تمريض",
    active: true,
    description: "مدير التمريض"
  },
  {
    id: 6,
    code: 1006,
    name: "طبيب استشاري",
    active: true,
    description: "طبيب استشاري متخصص"
  },
  {
    id: 7,
    code: 1007,
    name: "طبيب مقيم",
    active: true,
    description: "طبيب مقيم"
  },
  {
    id: 8,
    code: 1008,
    name: "ممرض",
    active: true,
    description: "ممرض/ممرضة"
  }
]

// Custom Hook for Jobs Management
export const useJobsController = () => {
  const [jobs, setJobs] = useState<Job[]>(defaultJobs)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isNewJob, setIsNewJob] = useState(false)

  const createNewJob = (): Job => ({
    id: Math.max(...jobs.map(job => job.id), 0) + 1,
    code: Math.max(...jobs.map(job => job.code), 1000) + 1,
    name: "",
    active: true,
    description: ""
  })

  const handleNewJob = () => {
    setSelectedJob(createNewJob())
    setIsNewJob(true)
    setShowJobDetails(true)
  }

  const handleEditJob = (job: Job) => {
    setSelectedJob({ ...job })
    setIsNewJob(false)
    setShowJobDetails(true)
  }

  const handleCloseDetails = () => {
    setShowJobDetails(false)
    setSelectedJob(null)
    setIsNewJob(false)
  }

  const handleSaveJob = (job: Job) => {
    if (isNewJob) {
      setJobs(prev => [...prev, job])
    } else {
      setJobs(prev => prev.map(j => j.id === job.id ? job : j))
    }
    handleCloseDetails()
  }

  const handleDeleteJob = (jobId: number) => {
    setJobs(prev => prev.filter(job => job.id !== jobId))
  }

  const searchJobs = (searchTerm: string) => {
    if (!searchTerm.trim()) return jobs
    return jobs.filter(job =>
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.code.toString().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    jobs,
    showJobDetails,
    selectedJob,
    isNewJob,
    handleNewJob,
    handleEditJob,
    handleCloseDetails,
    handleSaveJob,
    handleDeleteJob,
    searchJobs,
  }
}

// Utility Functions
export const jobUtils = {
  validateJob: (job: Job): boolean => {
    return job.name.trim().length > 0 && job.code > 0
  },

  getStatusText: (active: boolean): string => {
    return active ? "نشط" : "غير نشط"
  },

  getStatusColor: (active: boolean): string => {
    return active ? "bg-green-500" : "bg-red-500"
  }
}
