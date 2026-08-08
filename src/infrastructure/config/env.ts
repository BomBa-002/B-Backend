import 'dotenv/config';
import { z } from 'zod';
const schema = z.object({ NODE_ENV: z.enum(['development','test','production']).default('development'), PORT: z.coerce.number().default(4000), JWT_SECRET: z.string().min(16).default('dev-secret-change-me-123456'), CORS_ORIGIN: z.string().default('*') });
export const env = schema.parse(process.env);
