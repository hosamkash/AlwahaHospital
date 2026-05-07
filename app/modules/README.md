# موديولات النظام

هذا المجلد يحتوي على جميع موديولات النظام الرئيسية.

## الموديولات المتاحة

### 1. إدارة المستشفى (`01-hospital`)
- إدارة المستشفى والأقسام الطبية
- هيكل المستشفى
- المستشفيات والفروع
- الأقسام الطبية

### 2. التعريفات العامة (`02-GeneralDefinition`)
- البنود المالية
- حالات الغرف
- الوظائف
- المنتجات
- تصنيفات المنتجات
- وحدات المنتجات
- الخزائن

## بنية الموديل

كل موديل يحتوي على:

```
module-name/
├── page.tsx          # الصفحة الرئيسية للموديل
├── layout.tsx        # تخطيط الموديل
├── config.ts         # تكوين الموديل
├── types.ts          # أنواع البيانات
├── constants.ts      # الثوابت
├── utils.ts          # الأدوات المساعدة
├── hooks.ts          # الـ React Hooks
├── index.ts          # ملف التصدير الرئيسي
├── package.json      # معلومات الموديل
├── README.md         # وثائق الموديل
└── .gitignore        # ملفات مستبعدة
```

## الاستخدام

### استيراد موديل
```typescript
import { GeneralDefinitionsModule } from '@/modules/02-GeneralDefinition'
```

### استخدام الـ Hooks
```typescript
import { useGeneralDefinitionsModule } from '@/modules/02-GeneralDefinition'

function MyComponent() {
  const { isLoading, error, moduleData } = useGeneralDefinitionsModule()
  // ...
}
```

### استخدام الأدوات المساعدة
```typescript
import { getModuleInfo, getAllModules } from '@/modules/02-GeneralDefinition'

const moduleInfo = getModuleInfo('financial-clauses')
const allModules = getAllModules()
```

## إضافة موديل جديد

1. أنشئ مجلد جديد في `app/modules/`
2. أضف الملفات المطلوبة (page.tsx, layout.tsx, إلخ)
3. اتبع نفس البنية الموجودة
4. حدث هذا الملف

## التطوير

```bash
# تشغيل في وضع التطوير
npm run dev

# بناء المشروع
npm run build

# فحص الأنواع
npm run type-check

# فحص الكود
npm run lint
```

## المساهمة

1. Fork المشروع
2. أنشئ فرع جديد
3. أضف الموديل الجديد
4. أرسل Pull Request

## الترخيص

MIT License - مستشفى الواحة التخصصي