const WINTER_MONTHS = [11, 12, 1, 2];

const REQUIRED_CONTENT_GROUPS = [
  'ortkennung', 'koordinaten', 'iata', 'prio', 'texte', 'charakterprofil',
  'klima', 'bilder', 'sehenswuerdigkeiten', 'aktivitaeten', 'alternativen', 'pruefung'
];

const REQUIRED_EVIDENCE = [
  'winterDefinitionApproved',
  'ap14ProductApproval',
  'ap14QualityApproval',
  'mustHaveStoriesAccepted',
  'productionEndToEndAccepted',
  'metricsAndPrivacyApproved',
  'accessibilityAccepted',
  'responsiveAccepted',
  'performanceAccepted',
  'seoAccepted',
  'backupRestoreTested',
  'rollbackTested',
  'ap15ProductApproval',
  'ap15QualityApproval'
];

export function auditReleaseReadiness(targets = [], evidence = {}) {
  const blockers = [];
  const cities = targets.filter((target) => target.typ === 'STADT').length;
  const winterProfileCandidates = targets.filter((target) =>
    WINTER_MONTHS.some((month) => Number(target.saison?.[month]) > 0)
  ).length;
  const targetsMissingContent = targets
    .filter((target) => REQUIRED_CONTENT_GROUPS.some((group) => target[group] == null || target[group] === '' || (Array.isArray(target[group]) && target[group].length === 0)))
    .map((target) => ({
      id: target.id,
      missing: REQUIRED_CONTENT_GROUPS.filter((group) => target[group] == null || target[group] === '' || (Array.isArray(target[group]) && target[group].length === 0))
    }));

  if (targets.length !== 45) blockers.push({ id: 'AP14-45', expected: 45, actual: targets.length });
  if (cities < 12) blockers.push({ id: 'AP14-CITIES', expectedAtLeast: 12, actual: cities });
  if (winterProfileCandidates < 12) blockers.push({ id: 'AP14-WINTER-PROFILES', expectedAtLeast: 12, actual: winterProfileCandidates });
  if (targetsMissingContent.length) blockers.push({ id: 'AP14-CONTENT-QUALITY', targets: targetsMissingContent });

  for (const key of REQUIRED_EVIDENCE) {
    if (evidence[key] !== true) blockers.push({ id: 'AP15-EVIDENCE', requirement: key });
  }

  return {
    ready: blockers.length === 0,
    counts: { approvedTargets: targets.length, cities, winterProfileCandidates },
    blockers
  };
}