# B-Backend

Backend SaaS modular monolith لإدارة الشركات والمحلات والخدمات، مبني بـ Express وTypeScript وSQLite وDrizzle ORM.

## التشغيل

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

- `GET /health` فحص حالة السيرفر.
- `GET /api/v1` معلومات النسخة والموديولات.
- `GET /api/v1/entities?tenantId=...` عرض العملاء والموردين مع عزل المستأجر.
- `POST /api/v1/entities` إضافة عميل أو مورد.

السيرفر بيمسك الأخطاء العامة وطلبات الوعود غير المعالجة ويسجلها، لكن لازم مراقبة وتشغيل process manager في الإنتاج؛ مفيش نظام يقدر يضمن استمرار العملية لو حصل kill من نظام التشغيل نفسه.
