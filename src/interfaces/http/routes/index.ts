import { Router } from 'express';
import { entityRoutes } from './entity.routes.js';
export const apiRoutes = Router();
apiRoutes.use('/entities', entityRoutes);
