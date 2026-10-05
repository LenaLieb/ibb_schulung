import { spawnSync } from 'node:child_process';
const commands = [['validate', 'scripts/validate-content.mjs'], ['build', 'scripts/build.mjs'], ['test', 'scripts/test.mjs']];
for (const [name, script] of commands) { const result = spawnSync(process.execPath, [script], { stdio: 'inherit' }); if (result.status !== 0) { console.error(`Gate fehlgeschlagen: ${name}`); process.exit(result.status ?? 1); } }
console.log('DoD-Gates erfolgreich: validate, build, unit/e2e.');
