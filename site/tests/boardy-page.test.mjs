import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const page = fs.readFileSync(path.join(root, 'site', 'boardy', 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(root, 'site', 'boardy', 'app.js'), 'utf8');

test('Boardy page keeps the working record self-contained', () => {
  assert.match(page, /I did not just use Boardy\.<br \/><em>I built around it\.<\/em>/);
  assert.match(page, /This page is my record/);
  assert.match(page, /Boardy Boardman/);
  assert.match(page, /Exploring what comes after the superconnector/);
  assert.match(page, /Built around Boardy/);
  assert.match(page, /no automated integration as implemented/);
  assert.doesNotMatch(page, /You asked Nikhil/);
  assert.match(page, /Boardy-to-Heather-1\.ogg/);
  assert.match(page, /Boardy-to-Heather-2\.ogg/);
  assert.match(page, /boardyanimated\.vercel\.app/);
  assert.match(script, /addEventListener\('ended'/);
  assert.ok(fs.existsSync(path.join(root, 'boardy', 'Boardy-to-Heather-1.ogg')));
  assert.ok(fs.existsSync(path.join(root, 'boardy', 'Boardy-to-Heather-2.ogg')));
});
