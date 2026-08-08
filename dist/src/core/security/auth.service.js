import jwt from 'jsonwebtoken';
import { env } from '../../infrastructure/config/env.js';
export const authService = { sign(claims) { return jwt.sign(claims, env.JWT_SECRET, { expiresIn: '8h' }); }, verify(token) { return jwt.verify(token, env.JWT_SECRET); } };
