import { matching } from './app/domain/matching.mjs';
import { MAX_ERGEBNISSE } from './app/config/constants.mjs';
import { summarizeResult, trimResults } from './app/domain/result-view.mjs';
import { resolveTravelMonths } from './app/domain/travel-period.mjs';
import { parse, serialize } from './app/url/search-state.mjs';
import { getThemenEinstiege, resolvePresetSelection } from './app/domain/guided-entry.mjs';
import { buildComparisonSnapshot, selectComparisonTargets } from './app/domain/comparison.mjs';
import { addToMerkliste, normalizeMerkliste, readMerklisteFromStorage, removeFromMerkliste, writeMerklisteToStorage } from './app/domain/merkliste.mjs';
import { buildTargetPage, formatPriceLabel } from './app/domain/target-page.mjs';
import { chooseRelaxation } from './app/domain/relaxation.mjs';

const $ = (id) => document.getElementById(id);
const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const values = (element) => [...element.selectedOptions].map((option) => option.value);
const priceOptions = [['EUR', '€ · Einfach & gut'], ['EUR_EUR', '€€ · Komfortabel'], ['EUR_EUR_EUR', '€€€ · Besonders'], ['EUR_EUR_EUR_EUR', '€€€€ · Einmalig']];
const select = (id, entries) => { const element = $(id); for (const [value, label, chosen] of entries) { const option = document.createElement('option'); option.value = value; option.textContent = label; option.selected = chosen; element.append(option); } };
let data;
let shared = { compare: [], wishlist: [] };
let activeCriteria = null;
const testMode = /^\/test\/?$/.test(location.pathname);

function applyFormCriteria(nextCriteria) {
  document.querySelector(`input[name=f][value="${nextCriteria.f}"]`).checked = true;
  document.querySelector('input[name=zeitart][value="monate"]').checked = true;
  for (const option of $('monate').options) option.selected = (nextCriteria.M ?? []).includes(Number(option.value));
  for (const [id, selectedValues] of [['interessen', nextCriteria.I ?? []], ['laender', nextCriteria.L ?? []], ['preise', nextCriteria.P ?? []]]) for (const option of $(id).options) option.selected = selectedValues.includes(option.value);
  for (const input of document.querySelectorAll('input[name=A]')) input.checked = (nextCriteria.A ?? []).includes(input.value);
  if (nextCriteria.zeitart === 'spanne') { document.querySelector('input[name=zeitart][value="spanne"]').checked = true; $('von').value = nextCriteria.von ?? ''; $('bis').value = nextCriteria.bis ?? ''; }
  syncFamilyMode(); syncTimeMode(); updateDatePreview();
}

function criteria() {
  const zeitart = document.querySelector('input[name=zeitart]:checked').value;
  const f = document.querySelector('input[name=f]:checked').value;
  const A = f === 'familie' ? [...document.querySelectorAll('input[name=A]:checked')].map((input) => input.value) : [];
  if (f === 'familie' && A.length === 0) throw new Error('Für Familien ist mindestens eine Kinderaltersgruppe erforderlich.');
  const common = { f, A, I: values($('interessen')), L: values($('laender')), P: values($('preise')), relax: 'ORIGINAL' };
  if (zeitart === 'spanne') { const von = $('von').value; const bis = $('bis').value; return { ...common, M: resolveTravelMonths({ mode: 'fixed', startDate: von, endDate: bis }), zeitart, von, bis }; }
  return { ...common, M: [...$('monate').selectedOptions].map((option) => Number(option.value)), zeitart: 'monate' };
}

function restoreForm(state) {
  const fixed = state.zeitart === 'spanne';
  const form = document.querySelector(`input[name=f][value="${state.f}"]`); if (form) form.checked = true;
  document.querySelector(`input[name=zeitart][value="${fixed ? 'spanne' : 'monate'}"]`).checked = true;
  $('von').value = fixed ? state.von : ''; $('bis').value = fixed ? state.bis : '';
  for (const option of $('monate').options) option.selected = state.M.includes(Number(option.value));
  for (const [id, selectedValues] of [['interessen', state.I], ['laender', state.L], ['preise', state.P]]) for (const option of $(id).options) option.selected = selectedValues.includes(option.value);
  for (const input of document.querySelectorAll('input[name=A]')) input.checked = (state.A ?? []).includes(input.value);
  syncFamilyMode(); syncTimeMode(); updateDatePreview();
}

function syncFamilyMode() {
  const family = document.querySelector('input[name=f]:checked').value === 'familie';
  $('altersgruppen').hidden = !family;
  for (const input of document.querySelectorAll('input[name=A]')) { input.disabled = !family; if (!family) input.checked = false; }
}

function syncTimeMode() {
  const fixed = document.querySelector('input[name=zeitart]:checked').value === 'spanne';
  $('monatsbereich').hidden = fixed; $('monate').disabled = fixed; $('monate').required = !fixed;
  $('datumsbereich').hidden = !fixed; $('von').disabled = !fixed; $('bis').disabled = !fixed; $('von').required = fixed; $('bis').required = fixed; $('bis').min = $('von').value;
}

function updateDatePreview() {
  if (document.querySelector('input[name=zeitart]:checked').value !== 'spanne' || !$('von').value || !$('bis').value) { $('monatsvorschau').textContent = ''; $('bis').setCustomValidity(''); return; }
  try { const selected = resolveTravelMonths({ mode: 'fixed', startDate: $('von').value, endDate: $('bis').value }); $('monatsvorschau').textContent = `Berücksichtigte Monate: ${selected.map((month) => months[month - 1]).join(', ')}`; $('bis').setCustomValidity(''); } catch (error) { $('monatsvorschau').textContent = error.message; $('bis').setCustomValidity(error.message); }
}

function updateUrl(replace = false) { if (activeCriteria) { const query = serialize(activeCriteria, shared); history[replace ? 'replaceState' : 'pushState'](null, '', `${testMode ? '/test?daten=test&' : '/suche?'}${query}`); } }
function button(text, onClick, pressed = null) { const element = document.createElement('button'); element.type = 'button'; element.textContent = text; if (pressed !== null) element.setAttribute('aria-pressed', String(pressed)); element.addEventListener('click', onClick); return element; }

function renderTargetDetails(target) {
  const page = buildTargetPage(target); const details = document.createElement('details'); details.className = 'target-details'; const summary = document.createElement('summary'); summary.textContent = 'Mehr über dieses Ziel'; details.append(summary);
  for (const [title, text] of Object.entries(page.blocks)) { const block = document.createElement('section'); const heading = document.createElement('h4'); heading.textContent = title[0].toUpperCase() + title.slice(1); const paragraph = document.createElement('p'); paragraph.textContent = text; block.append(heading, paragraph); details.append(block); }
  return details;
}

function toggleCompare(id) { shared.compare = shared.compare.includes(id) ? shared.compare.filter((entry) => entry !== id) : [...shared.compare, id].slice(0, 3); renderComparison(); renderResults(); updateUrl(); }
function toggleWishlist(id) { shared.wishlist = shared.wishlist.includes(id) ? removeFromMerkliste(shared.wishlist, id) : addToMerkliste(shared.wishlist, id, data.ziele); writeMerklisteToStorage(localStorage, shared.wishlist); renderWishlist(); renderResults(); updateUrl(); }

function renderResults() {
  const output = $('ergebnisse'); output.replaceChildren(); if (!activeCriteria) return;
  const relaxation = chooseRelaxation(activeCriteria, data.ziele);
  const relaxed = activeCriteria.relax === 'AUTO' && relaxation.level !== 'R0' && relaxation.level !== 'DIAGNOSE';
  const answer = matching(relaxed ? relaxation.relaxedCriteria : activeCriteria, data.ziele); const results = trimResults(answer.results, MAX_ERGEBNISSE);
  if (relaxed || (!results.length && relaxation.suggestions.length)) {
    const notice = document.createElement('aside'); notice.className = 'search-notice'; const text = document.createElement('p'); text.textContent = relaxed ? `Aktive Lockerung (${relaxation.level}): ${relaxation.label}. Deine ursprünglichen Kriterien bleiben im Link erhalten.` : relaxation.suggestions.map((item) => item.text).join(' '); notice.append(text);
    if (relaxed) notice.append(button('Originalkriterien wiederherstellen', () => { activeCriteria = { ...activeCriteria, relax: 'ORIGINAL' }; updateUrl(); run(); }));
    else if (relaxation.level === 'R1' || relaxation.level === 'R2') notice.append(button(`${relaxation.label} anwenden`, () => { activeCriteria = { ...activeCriteria, relax: 'AUTO' }; updateUrl(); run(); })); output.append(notice);
  }
  if (!results.length) { const empty = document.createElement('p'); empty.textContent = 'Noch keine passende Reiseidee im freigegebenen Bestand.'; output.append(empty); return; }
  for (const [index, result] of results.entries()) {
    const target = data.ziele.find((entry) => entry.id === result.id); const article = document.createElement('article'); article.className = 'result';
    const visual = document.createElement('div'); visual.className = `destination-art ${result.id}`; visual.setAttribute('role', 'img'); visual.setAttribute('aria-label', `Grafischer Platzhalter für ${result.name}`);
    const badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = index < 3 ? 'REISEIDEE FÜR DICH' : `WEITERE IDEE ${index + 1}`;
    const title = document.createElement('h3'); title.textContent = result.name;
    const meta = document.createElement('p'); meta.className = 'meta'; meta.textContent = `${result.land} · ${result.region} · ${formatPriceLabel(result.preisniveau)}`;
    const reason = document.createElement('p'); reason.className = 'reason'; reason.textContent = summarizeResult(result, answer.criteria);
    const matchList = document.createElement('div'); matchList.className = 'match-list'; for (const interest of result.interests.slice(0, 3)) { const item = document.createElement('span'); item.textContent = `✓ ${interest}`; matchList.append(item); }
    const actions = document.createElement('div'); actions.className = 'card-actions'; actions.append(button(shared.compare.includes(result.id) ? 'Aus Vergleich entfernen' : 'Vergleichen', () => toggleCompare(result.id), shared.compare.includes(result.id)), button(shared.wishlist.includes(result.id) ? 'Nicht mehr merken' : 'Merken', () => toggleWishlist(result.id), shared.wishlist.includes(result.id)));
    const targetLink = document.createElement('a'); targetLink.className = 'target-link'; targetLink.href = testMode ? '#' : `/ziel/${encodeURIComponent(result.id)}`; targetLink.textContent = 'Ziel ansehen →';
    article.append(visual, badge, title, meta, reason, matchList, actions, targetLink, renderTargetDetails(target)); output.append(article);
  }
}

function renderComparison() {
  const output = $('vergleich'); output.replaceChildren(); const selected = selectComparisonTargets(shared.compare, data.ziele); $('vergleich-bereich').hidden = selected.length === 0; if (!selected.length) return;
  const snapshot = buildComparisonSnapshot(data.ziele, shared.compare, { criteria: activeCriteria ?? {} }); const intro = document.createElement('p'); intro.className = 'comparison-intro'; intro.textContent = `Vergleich für ${snapshot.period.months.map((month) => months[month - 1]).join(', ')}.`; output.append(intro);
  const table = document.createElement('table'); const head = document.createElement('thead'); const body = document.createElement('tbody'); const header = document.createElement('tr'); for (const label of ['Kriterium', ...snapshot.targets.map((target) => target.name)]) { const cell = document.createElement('th'); cell.scope = 'col'; cell.textContent = label; header.append(cell); } head.append(header);
  const rows = [['Region', (target) => `${target.region}, ${target.land}`], ['Budget', (target) => formatPriceLabel(target.preisniveau)], ['Stärken', (target) => target.interestFocus.join(', ') || '–'], ['Saison', (target) => snapshot.period.months.map((month) => `${months[month - 1]}: ${target.saison[month] ?? '–'}/2`).join(', ')]];
  for (const [label, value] of rows) { const row = document.createElement('tr'); const heading = document.createElement('th'); heading.scope = 'row'; heading.textContent = label; row.append(heading); for (const target of snapshot.targets) { const cell = document.createElement('td'); cell.textContent = value(target); row.append(cell); } body.append(row); }
  table.append(head, body); output.append(table); const actions = document.createElement('div'); actions.className = 'comparison-actions'; for (const target of selected) actions.append(button(`${target.name} entfernen`, () => toggleCompare(target.id))); output.append(actions);
}

function renderWishlist() { const output = $('merkliste'); output.replaceChildren(); const targets = data.ziele.filter((target) => shared.wishlist.includes(target.id)); $('merkliste-bereich').hidden = targets.length === 0; for (const target of targets) { const item = document.createElement('li'); item.textContent = `${target.name} · ${target.region}`; item.append(button('Entfernen', () => toggleWishlist(target.id))); output.append(item); } }

function run() {
  try { const state = parse(location.search); if (state.f === 'familie' && state.A.length === 0) throw new Error('Für Familien ist mindestens eine Kinderaltersgruppe erforderlich.'); restoreForm(state); activeCriteria = state; shared.compare = [...new Set(state.compare ?? [])].filter((id) => data.ziele.some((target) => target.id === id)).slice(0, 3); const localWishlist = readMerklisteFromStorage(localStorage); shared.wishlist = normalizeMerkliste([...(state.wishlist ?? []), ...localWishlist], data.ziele); writeMerklisteToStorage(localStorage, shared.wishlist); $('datenstand').textContent = `Datenstand ${data.datenversion}`; $('fehler').hidden = true; renderResults(); renderComparison(); renderWishlist(); } catch (error) { $('fehler').textContent = error.message; $('fehler').hidden = false; }
}

async function start() {
  const response = await fetch(testMode ? '/data/test-bestand.json' : '/data/bestand.json'); data = await response.json(); $('testmodus').hidden = !testMode;
  select('monate', months.map((label, index) => [String(index + 1), label, index === 6])); select('interessen', data.interessen.map((item) => [item.id, item.label, item.id === 'STRAND'])); select('laender', [...new Map(data.ziele.map((target) => [target.land, target.land]))].map(([id, label]) => [id, label, false])); select('preise', priceOptions);
  for (const preset of getThemenEinstiege()) { const option = document.createElement('option'); option.value = preset.id; option.textContent = preset.label; $('vorgaben').append(option); }
  $('vorgaben').addEventListener('change', () => { if (!$('vorgaben').value) return; const preset = resolvePresetSelection($('vorgaben').value); applyFormCriteria(preset.criteria); activeCriteria = { ...preset.criteria, zeitart: 'monate' }; updateUrl(); run(); });
  document.querySelectorAll('input[name=zeitart]').forEach((radio) => radio.addEventListener('change', syncTimeMode)); document.querySelectorAll('input[name=f]').forEach((radio) => radio.addEventListener('change', syncFamilyMode)); $('von').addEventListener('change', () => { $('bis').min = $('von').value; updateDatePreview(); }); $('bis').addEventListener('change', updateDatePreview);
  $('suche').addEventListener('submit', (event) => { event.preventDefault(); try { activeCriteria = criteria(); updateUrl(); run(); document.getElementById('ergebnisbereich').scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (error) { $('fehler').textContent = error.message; $('fehler').hidden = false; } });
  window.addEventListener('popstate', run); syncFamilyMode(); syncTimeMode(); if (location.search) run();
}
start().catch((error) => { $('fehler').textContent = error.message; $('fehler').hidden = false; });
