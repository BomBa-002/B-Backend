import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/app.js';
import http from 'node:http';
function request(path) {
    return new Promise((resolve, reject) => {
        const server = app.listen(0, () => {
            const address = server.address();
            const port = typeof address === 'object' && address ? address.port : 0;
            http.get(`http://127.0.0.1:${port}${path}`, response => { let body = ''; response.setEncoding('utf8'); response.on('data', chunk => { body += chunk; }); response.on('end', () => { server.close(); resolve({ status: response.statusCode ?? 0, body }); }); }).on('error', error => { server.close(); reject(error); });
        });
    });
}
test('OpenAPI JSON is valid and current', async () => {
    const result = await request('/docs/openapi.json');
    const document = JSON.parse(result.body);
    assert.equal(result.status, 200);
    assert.equal(document.openapi, '3.0.3');
    assert.ok(document.paths['/entities']);
});
test('Swagger UI is available', async () => {
    const result = await request('/docs');
    assert.equal(result.status, 200);
    assert.match(result.body, /swagger-ui/);
});
