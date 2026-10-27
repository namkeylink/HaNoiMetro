import test from 'node:test';
import assert from 'node:assert/strict';
import { filterMetroLines, getMetroStats, normalizeText, generateStandaloneBootstrapHtml } from './filterMetro';
import { METRO_LINES } from '../data/metroData';

test('normalizeText removes accents and trims', () => {
  assert.equal(normalizeText('  Hà Nội Tuyến Số 1  '), 'ha noi tuyen so 1');
  assert.equal(normalizeText('Cát Linh'), 'cat linh');
  assert.equal(normalizeText('Nhổn - Ga Hà Nội'), 'nhon - ga ha noi');
});

test('getMetroStats returns correct total line count and non-zero km', () => {
  const stats = getMetroStats(METRO_LINES);
  assert.equal(stats.totalLines, 16);
  assert.ok(stats.operatingCount >= 2, 'Should have operating lines 2A and 3');
  assert.ok(stats.totalKm > 200, 'Total km should be greater than 200');
  assert.ok(stats.totalStations > 100, 'Total stations across planned network should exceed 100');
});

test('filterMetroLines filters by status correctly', () => {
  const operatingLines = filterMetroLines(METRO_LINES, '', 'operating');
  assert.ok(operatingLines.length >= 2);
  operatingLines.forEach(line => {
    assert.equal(line.status, 'operating');
  });

  const planningLines = filterMetroLines(METRO_LINES, '', 'planning');
  assert.ok(planningLines.length > 5);
  planningLines.forEach(line => {
    assert.equal(line.status, 'planning');
  });
});

test('filterMetroLines matches Vietnamese and Japanese queries', () => {
  // Vietnamese search without accents
  const resCatLinh = filterMetroLines(METRO_LINES, 'cat linh', 'all');
  assert.ok(resCatLinh.length > 0);
  assert.ok(resCatLinh.some(l => l.code === 'M2A'));

  // Japanese search
  const resJapaneseNhon = filterMetroLines(METRO_LINES, 'ニョン', 'all');
  assert.ok(resJapaneseNhon.length > 0);
  assert.ok(resJapaneseNhon.some(l => l.code === 'M3'));

  // Line number search
  const resLine5 = filterMetroLines(METRO_LINES, '5', 'all');
  assert.ok(resLine5.some(l => l.code === 'M5'));

  // Airport line search
  const resAirport = filterMetroLines(METRO_LINES, 'Gia Bình', 'all');
  assert.ok(resAirport.some(l => l.code === 'M10' || l.code === 'M14'));
});

test('generateStandaloneBootstrapHtml produces valid HTML with embed iframe and lines data', () => {
  const html = generateStandaloneBootstrapHtml();
  assert.ok(html.includes('<!doctype html>'));
  assert.ok(html.includes('https://www.google.com/maps/d/embed?mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s&ehbc=2E312F'));
  assert.ok(html.includes('bootstrap@5.3.3'));
  assert.ok(html.includes('Tuyến Metro Số 1'));
  assert.ok(html.includes('ハノイ都市鉄道'));
  assert.ok(html.includes('カットリン'));
});
