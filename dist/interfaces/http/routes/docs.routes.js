import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { createOpenApiDocument } from '../openapi.js';
export const docsRoutes = Router();
const options = { customSiteTitle: 'B-Backend API Docs', customCss: '.swagger-ui .topbar{background:#172554}.swagger-ui .info .title{color:#172554}' };
/** Swagger UI بيتولد من آخر مواصفة كل مرة، فالتعديلات بتظهر فوراً بدون restart في التطوير. */
docsRoutes.get('/openapi.json', (_req, res) => res.json(createOpenApiDocument()));
docsRoutes.get('/', (_req, res) => {
    const document = createOpenApiDocument();
    res.type('html').send(swaggerUi.generateHTML(document, options));
});
