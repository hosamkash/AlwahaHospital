"use client"

export default function SimpleFormPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">بيانات طلب النواقص</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الكود</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded px-3 py-2"
              defaultValue="SR001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">الفرع</label>
          <select className="w-full border border-gray-300 rounded px-3 py-2">
            <option>اختر الفرع</option>
            <option>الفرع الرئيسي</option>
            <option>فرع المحلة</option>
            <option>فرع طنطا</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">المخزن</label>
          <select className="w-full border border-gray-300 rounded px-3 py-2">
            <option>اختر المخزن</option>
            <option>المخزن الرئيسي</option>
            <option>مخزن المحلة</option>
            <option>مخزن طنطا</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
          <textarea 
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            placeholder="أدخل ملاحظاتك هنا..."
          ></textarea>
        </div>
        
        <div className="flex gap-4">
          <button className="bg-primary text-white px-6 py-2 rounded">
            حفظ
          </button>
          <button className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  )
}
