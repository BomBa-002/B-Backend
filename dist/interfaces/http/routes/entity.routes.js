import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { sqlite } from '../../../infrastructure/database/client.js';
import { response } from '../../../core/response/response.formatter.js';
import { errors } from '../../../core/errors/error.definitions.js';
export const entityRoutes = Router();
const body = z.object({ tenantId: z.string().min(1), name: z.string().min(2), kind: z.enum(['customer', 'vendor', 'both']), notes: z.string().optional() });
entityRoutes.get('/', (req, res) => { const tenantId = z.string().parse(req.query.tenantId); const rows = sqlite.prepare('SELECT * FROM entities WHERE tenant_id = ? ORDER BY created_at DESC').all(tenantId); res.json(response.list(rows, rows.length)); });
entityRoutes.post('/', (req, res) => { const parsed = body.safeParse(req.body); if (!parsed.success)
    throw errors.validation(parsed.error.flatten()); const id = randomUUID(); const now = Date.now(); sqlite.prepare('INSERT INTO entities (id,tenant_id,name,kind,notes,created_at,updated_at) VALUES (?,?,?,?,?,?,?)').run(id, parsed.data.tenantId, parsed.data.name, parsed.data.kind, parsed.data.notes ?? null, now, now); res.status(201).json(response.success({ id, ...parsed.data }, 'اتضاف الكيان بنجاح')); });
