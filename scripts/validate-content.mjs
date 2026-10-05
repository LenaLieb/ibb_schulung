import { loadTargets } from '../src/content/repository.mjs';
import { INTERESSEN_IDS, MONATE, PREISNIVEAUS, REISEFORMEN } from '../src/config/constants.mjs';
const targets = loadTargets();
if (targets.length === 0) throw new Error('Der freigegebene Bestand darf nicht leer sein.');
const ids = new Set();
for (const target of targets) {
  if (!target.id || !target.name || target.status !== 'FREIGEGEBEN') throw new Error(`Pflichtfeld/Freigabe fehlt: ${target.id}`);
  if (ids.has(target.id)) throw new Error(`Ziel-ID doppelt: ${target.id}`);
  ids.add(target.id);
  if (!['STADT', 'INSEL', 'KUESTENREGION', 'SEENREGION'].includes(target.typ)) throw new Error(`Zieltyp ungueltig: ${target.id}`);
  if (!PREISNIVEAUS.includes(target.preisniveau)) throw new Error(`Preisniveau ungueltig: ${target.id}`);
  if (INTERESSEN_IDS.some((id) => !Number.isInteger(target.interessen[id]) || target.interessen[id] < 0 || target.interessen[id] > 2)) throw new Error(`Interessenwerte ungueltig: ${target.id}`);
  if (MONATE.some((month) => !Number.isInteger(target.saison[month]) || target.saison[month] < 0 || target.saison[month] > 2) || REISEFORMEN.some((form) => !Number.isInteger(target.reiseform[form]) || target.reiseform[form] < 0 || target.reiseform[form] > 2)) throw new Error(`Skalen fehlen oder liegen ausserhalb des Wertebereichs: ${target.id}`);
}
console.log(`Inhalt gueltig: ${targets.length} freigegebene Ziele.`);
