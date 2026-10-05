import test from 'node:test';
import assert from 'node:assert/strict';
import { auditReleaseReadiness } from '../../src/domain/release-readiness.mjs';
import { loadTargets } from '../../src/content/repository.mjs';

test('Release-Audit sperrt den Prototypbestand mit konkreten AP-14/15-Blockern', () => {
  const report = auditReleaseReadiness(loadTargets());

  assert.equal(report.ready, false);
  assert.deepEqual(report.counts, { approvedTargets: 5, cities: 2, winterProfileCandidates: 4 });
  assert.ok(report.blockers.some((blocker) => blocker.id === 'AP14-45'));
  assert.ok(report.blockers.some((blocker) => blocker.id === 'AP14-CONTENT-QUALITY'));
  assert.ok(report.blockers.some((blocker) => blocker.id === 'AP15-EVIDENCE' && blocker.requirement === 'ap14ProductApproval'));
});

test('Release-Audit verlangt explizite Nachweise statt Annahmen', () => {
  const report = auditReleaseReadiness([], { ap15ProductApproval: true });

  assert.equal(report.ready, false);
  assert.ok(report.blockers.some((blocker) => blocker.id === 'AP15-EVIDENCE' && blocker.requirement === 'ap15QualityApproval'));
});