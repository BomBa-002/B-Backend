/** مواصفة OpenAPI واحدة؛ أي route جديد يتضاف هنا عشان التوثيق يفضل متزامن. */
export function createOpenApiDocument() {
    return {
        openapi: '3.0.3',
        info: { title: 'B-Backend API', version: '1.0.0', description: 'توثيق SaaS لإدارة الشركات والمحلات والخدمات.' },
        servers: [{ url: '/api/v1', description: 'السيرفر الحالي' }],
        tags: [{ name: 'System', description: 'حالة واكتشاف النظام' }, { name: 'Entities', description: 'العملاء والموردين' }],
        paths: {
            '/': { get: { tags: ['System'], summary: 'اكتشاف خدمات API', responses: { '200': { description: 'تم بنجاح' } } } },
            '/entities': {
                get: { tags: ['Entities'], summary: 'عرض الكيانات', parameters: [{ name: 'tenantId', in: 'query', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'قائمة الكيانات' }, '400': { $ref: '#/components/responses/ValidationError' } } },
                post: { tags: ['Entities'], summary: 'إضافة عميل أو مورد', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateEntity' } } } }, responses: { '201': { description: 'تم إنشاء الكيان' }, '400': { $ref: '#/components/responses/ValidationError' } } },
            },
        },
        components: {
            schemas: {
                CreateEntity: { type: 'object', required: ['tenantId', 'name', 'kind'], properties: { tenantId: { type: 'string', example: 'tenant-demo' }, name: { type: 'string', minLength: 2, example: 'محمد السيد' }, kind: { type: 'string', enum: ['customer', 'vendor', 'both'], example: 'customer' }, notes: { type: 'string', example: 'عميل ملتزم' } } },
                ApiError: { type: 'object', properties: { success: { type: 'boolean', example: false }, message: { type: 'string', example: 'المسار ده مش موجود' }, requestId: { type: 'string' } } },
            },
            responses: { ValidationError: { description: 'البيانات غير صحيحة', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } } },
        },
    };
}
export const openApiDocument = createOpenApiDocument();
