import { sqlite } from './client.js';
const statements = [
    `CREATE TABLE IF NOT EXISTS tenants (id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, type TEXT NOT NULL DEFAULT 'business', status TEXT NOT NULL DEFAULT 'active', created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'active', created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS memberships (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL REFERENCES tenants(id), user_id TEXT NOT NULL REFERENCES users(id), role TEXT NOT NULL DEFAULT 'member', created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, UNIQUE(tenant_id,user_id))`,
    `CREATE TABLE IF NOT EXISTS entities (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL REFERENCES tenants(id), name TEXT NOT NULL, kind TEXT NOT NULL, tax_number TEXT, notes TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS phones (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, entity_id TEXT NOT NULL REFERENCES entities(id), number TEXT NOT NULL, is_primary INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS addresses (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, entity_id TEXT NOT NULL REFERENCES entities(id), label TEXT NOT NULL, address TEXT NOT NULL, is_primary INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL REFERENCES tenants(id), parent_id TEXT, code TEXT NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, UNIQUE(tenant_id,code))`,
    `CREATE TABLE IF NOT EXISTS journal_entries (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, reference TEXT NOT NULL, description TEXT NOT NULL, posted_at INTEGER NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS journal_lines (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, journal_entry_id TEXT NOT NULL REFERENCES journal_entries(id), account_id TEXT NOT NULL REFERENCES accounts(id), debit TEXT NOT NULL DEFAULT '0', credit TEXT NOT NULL DEFAULT '0', created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS balances (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, account_id TEXT NOT NULL, debit TEXT NOT NULL DEFAULT '0', credit TEXT NOT NULL DEFAULT '0', created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, UNIQUE(tenant_id,account_id))`,
    `CREATE TABLE IF NOT EXISTS documents (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, number TEXT NOT NULL, type TEXT NOT NULL, entity_id TEXT, total TEXT NOT NULL DEFAULT '0', status TEXT NOT NULL DEFAULT 'draft', created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS document_lines (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, document_id TEXT NOT NULL REFERENCES documents(id), description TEXT NOT NULL, quantity REAL NOT NULL, unit_price TEXT NOT NULL, total TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS audit_logs (id TEXT PRIMARY KEY, tenant_id TEXT, user_id TEXT, action TEXT NOT NULL, resource TEXT NOT NULL, resource_id TEXT, metadata TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS settings (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, UNIQUE(tenant_id,key))`,
    `CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, token_hash TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS tenant_counters (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, key TEXT NOT NULL, value INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, UNIQUE(tenant_id,key))`,
];
for (const statement of statements)
    sqlite.exec(statement);
console.log('تم تجهيز قاعدة البيانات والجداول بنجاح');
