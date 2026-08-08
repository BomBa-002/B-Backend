import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { sqlite } from './client.js';
import './migrate.js';

const now = Date.now();
const tenantId = randomUUID();
const userId = randomUUID();
const passwordHash = await bcrypt.hash('12345678', 12);
const run = sqlite.transaction(() => {
  sqlite.prepare(`INSERT OR IGNORE INTO tenants (id,name,slug,type,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?)`).run(tenantId, 'محل الكهربائيات البتاع', 'el-betaa-electronics', 'shop', 'active', now, now);
  sqlite.prepare(`INSERT OR IGNORE INTO users (id,name,email,password_hash,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?)`).run(userId, 'أحمد محمد', 'ahmed@betaa.local', passwordHash, 'active', now, now);
  sqlite.prepare(`INSERT OR IGNORE INTO memberships (id,tenant_id,user_id,role,created_at,updated_at) VALUES (?,?,?,?,?,?)`).run(randomUUID(), tenantId, userId, 'owner', now, now);
  const account = sqlite.prepare(`INSERT OR IGNORE INTO accounts (id,tenant_id,code,name,type,created_at,updated_at) VALUES (?,?,?,?,?,?,?)`);
  for (const [code, name, type] of [['1000','الأصول','asset'],['2000','الالتزامات','liability'],['3000','حقوق الملكية','equity'],['4000','الإيرادات','revenue'],['5000','المصروفات','expense']]) account.run(randomUUID(), tenantId, code, name, type, now, now);
  const entityId = randomUUID();
  sqlite.prepare(`INSERT INTO entities (id,tenant_id,name,kind,notes,created_at,updated_at) VALUES (?,?,?,?,?,?,?)`).run(entityId, tenantId, 'عميلنا محمد السيد', 'customer', 'بيحب التعامل الكاش ودايماً ملتزم', now, now);
  sqlite.prepare(`INSERT INTO phones (id,tenant_id,entity_id,number,is_primary,created_at,updated_at) VALUES (?,?,?,?,?,?,?)`).run(randomUUID(), tenantId, entityId, '01001234567', 1, now, now);
});
run();
console.log('تم تحميل بيانات اختبار مصرية: محل، مستخدم، حسابات، وعميل');
console.log('بيانات الدخول: ahmed@betaa.local / 12345678');
