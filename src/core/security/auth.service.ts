import jwt from 'jsonwebtoken';
import { env } from '../../infrastructure/config/env.js';
export type AuthClaims = { userId: string; tenantId: string; role: string };
export const authService = { sign(claims: AuthClaims) { return jwt.sign(claims, env.JWT_SECRET, { expiresIn: '8h' }); }, verify(token: string) { return jwt.verify(token, env.JWT_SECRET) as AuthClaims; } };
