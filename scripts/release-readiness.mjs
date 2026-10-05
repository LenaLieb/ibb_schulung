import { auditReleaseReadiness } from '../src/domain/release-readiness.mjs';
import { loadTargets } from '../src/content/repository.mjs';

const report = auditReleaseReadiness(loadTargets());
console.log(JSON.stringify(report, null, 2));
if (!report.ready) {
  console.error(`Veröffentlichung gesperrt: ${report.blockers.length} offene Nachweise.`);
  process.exitCode = 1;
}