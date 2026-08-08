import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/app.js';
import http from 'node:http';

test('health route responds without crashing', async () => {
  const server = http.createServer(app);
  await new Promise<void>(resolve => server.listen(0, resolve));
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const result = await fetch(`http://127.0.0.1:${address.port}/health`);
  assert.equal(result.status, 200);
  const body = await result.json() as { success: boolean };
  assert.equal(body.success, true);
  await new Promise<void>(resolve => server.close(() => resolve()));
});
