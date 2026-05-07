"use client"

import { useEffect, useRef } from "react"
import { vendorContextMenuItems } from "./vendorsController"

interface VendorContextMenuProps {
  isOpen: boolean
  position: { x: number; y: number }
  onClose: () => void
  onAction: (actionId: string) => void
}

export default function VendorContextMenu({
  isOpen,
  position,
  onClose,
  onAction,
}: VendorContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // إغلاق القائمة عند الضغط على ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-64"
      style={{
        left: position.x,
        top: position.y,
        maxHeight: "80vh",
        overflowY: "auto"
      }}
    >
      {vendorContextMenuItems.map((section, sectionIndex) => (
        <div key={section.section}>
          {/* عنوان القسم */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
            {section.section}
          </div>
          
          {/* عناصر القسم */}
          {section.items.map((item) => (
            <button
              key={item.id}
              onClick={() => onAction(item.id)}
              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors duration-150"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
            </button>
          ))}
          
          {/* فاصل بين الأقسام */}
          {sectionIndex < vendorContextMenuItems.length - 1 && (
            <div className="border-b border-gray-200 my-1"></div>
          )}
        </div>
      ))}
    </div>
  )
}
