"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, Search } from "lucide-react"

interface ComboBoxOption {
  value: string
  label: string
}

interface ComboBoxProps {
  label: string
  value: string
  options: ComboBoxOption[]
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
}

export default function ComboBox({
  label,
  value,
  options,
  onChange,
  placeholder = "اختر...",
  searchPlaceholder = "ابحث...",
  className = ""
}: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredOptions, setFilteredOptions] = useState(options)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter options based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredOptions(
        options.filter(option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      setFilteredOptions(options)
    }
  }, [searchTerm, options])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputClick = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const handleOptionSelect = (option: ComboBoxOption) => {
    onChange(option.value)
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchTerm(newValue)
    
    // If user types something that matches an option, select it
    const matchingOption = options.find(option =>
      option.label.toLowerCase() === newValue.toLowerCase()
    )
    
    if (matchingOption) {
      onChange(matchingOption.value)
    } else {
      // Allow free text input
      onChange(newValue)
    }
  }

  const selectedOption = options.find(option => option.value === value)
  const displayValue = selectedOption ? selectedOption.label : value

  return (
    <div className={`relative ${className}`}>
      <Label className="text-right block mb-1">{label}</Label>
      <div className="relative" ref={dropdownRef}>
        <Input
          ref={inputRef}
          value={isOpen ? searchTerm : displayValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          className="pr-8 cursor-pointer"
          readOnly={!isOpen}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="pr-8 text-sm"
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 text-right"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  لا توجد نتائج
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
