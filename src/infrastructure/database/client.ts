import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';

const databaseUrl = process.env.DATABASE_URL ?? './database/sqlite.db';
const absolutePath = path.resolve(databaseUrl);
fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
export const sqlite = new Database(absolutePath);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');
export const db = drizzle(sqlite, { schema });
