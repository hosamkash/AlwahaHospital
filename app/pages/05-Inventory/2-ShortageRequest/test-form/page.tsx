"use client"

export default function TestFormPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">صفحة اختبار البيانات</h1>
      <p>هذه صفحة اختبار للتأكد من أن التوجيه يعمل بشكل صحيح.</p>
      <div className="mt-4 p-4 bg-primary/10 rounded">
        <p className="text-primary">✅ الصفحة تعمل بشكل صحيح!</p>
      </div>
    </div>
  )
}
