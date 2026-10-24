import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Exercise the actual browser probe without pulling browser-only engine modules into Node.
const source = await readFile(new URL('../../web/src/engine/detect-runtime.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { hasNodeApi } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`) as {
  hasNodeApi: (fetcher: typeof fetch) => Promise<boolean>;
};

test('runtime detection accepts CodeCraft JSON and rejects Pages fallbacks and unrelated services', async () => {
  const probe = (body: string, contentType: string, status = 200) => hasNodeApi(async () => new Response(body, { status, headers: { 'content-type': contentType } }));
  assert.equal(await probe(JSON.stringify({ ok: true, service: 'codecraft', version: '0.1.0' }), 'application/json'), true);
  assert.equal(await probe('<!doctype html><title>CodeCraft</title>', 'text/html'), false);
  assert.equal(await probe(JSON.stringify({ service: 'unrelated' }), 'application/json'), false);
  assert.equal(await probe(JSON.stringify({ service: 'codecraft' }), 'application/json', 503), false);
  assert.equal(await probe('invalid JSON', 'application/json'), false);
  assert.equal(await probe('null', 'application/json'), false);
  assert.equal(await hasNodeApi(async () => { throw new Error('offline'); }), false);
});
