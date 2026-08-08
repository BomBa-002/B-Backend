import { Router } from 'express';
import { response } from '../../../core/response/response.formatter.js';
export const healthRoutes = Router();
healthRoutes.get('/', (_req, res) => res.json(response.success({ status: 'up', uptime: process.uptime(), service: 'B-Backend' }, 'السيرفر شغال')));
