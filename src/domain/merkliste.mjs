export const MAX_MERKLISTE = 10;

export function normalizeMerkliste(ids = [], targets = [], max = MAX_MERKLISTE) {
  const validIds = new Set(
    (targets || [])
      .filter((target) => target && target.id && target.status === 'FREIGEGEBEN')
      .map((target) => String(target.id))
  );

  const unique = [];
  for (const candidate of Array.isArray(ids) ? ids : []) {
    const value = String(candidate ?? '').trim();
    if (!value || unique.includes(value) || !validIds.has(value)) {
      continue;
    }
    unique.push(value);
    if (unique.length >= max) break;
  }
  return unique;
}

export function mergeMerkliste(local = [], remote = [], targets = [], max = MAX_MERKLISTE) {
  const merged = [...new Set([...normalizeMerkliste(local, targets, max), ...normalizeMerkliste(remote, targets, max)])];
  return merged.slice(0, max);
}

export function addToMerkliste(current = [], targetId, targets = [], max = MAX_MERKLISTE) {
  const normalized = String(targetId ?? '').trim();
  if (!normalized) return [...normalizeMerkliste(current, targets, max)];

  const existing = normalizeMerkliste(current, targets, max);
  if (existing.includes(normalized)) return existing;
  if (existing.length >= max) return existing;

  const validTargets = new Set(
    (targets || [])
      .filter((target) => target && target.id && target.status === 'FREIGEGEBEN')
      .map((target) => String(target.id))
  );

  if (!validTargets.has(normalized)) return existing;

  return [...existing, normalized].slice(0, max);
}

export function removeFromMerkliste(current = [], targetId) {
  const normalized = String(targetId ?? '').trim();
  if (!normalized) return [...current];
  return (Array.isArray(current) ? current : []).filter((entry) => String(entry).trim() !== normalized);
}

export function readMerklisteFromStorage(storage, fallback = []) {
  if (!storage || typeof storage.getItem !== 'function') return Array.isArray(fallback) ? [...fallback] : [];

  try {
    const raw = storage.getItem('urlaub-merklisten');
    if (!raw) return Array.isArray(fallback) ? [...fallback] : [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : Array.isArray(fallback) ? [...fallback] : [];
  } catch {
    return Array.isArray(fallback) ? [...fallback] : [];
  }
}

export function writeMerklisteToStorage(storage, ids = []) {
  if (!storage || typeof storage.setItem !== 'function') return false;

  try {
    storage.setItem('urlaub-merklisten', JSON.stringify(Array.isArray(ids) ? ids : []));
    return true;
  } catch {
    return false;
  }
}
