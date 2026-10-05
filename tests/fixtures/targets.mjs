export const TEST_TARGETS = Object.freeze([
  {
    id: 'test-nordstadt', name: 'Nordstadt', typ: 'STADT', land: 'DE', region: 'Nordregion', preisniveau: 'EUR', status: 'FREIGEGEBEN',
    interessen: { STRAND: 0, STADT: 2, NATUR: 1, KULTUR: 2, AKTIVURLAUB: 1, ERHOLUNG: 1, KULINARIK: 2, AUSFLUEGE: 1 },
    saison: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 2, 9: 1, 10: 1, 11: 1, 12: 1 },
    reiseform: { single: 2, paar: 2, familie: 1 }, kinder: { A0_5: 0, A6_11: 1, A12P: 2 }
  },
  {
    id: 'test-sonnenbucht', name: 'Sonnenbucht', typ: 'KUESTENREGION', land: 'ES', region: 'Testküste', preisniveau: 'EUR_EUR', status: 'FREIGEGEBEN',
    interessen: { STRAND: 2, STADT: 0, NATUR: 2, KULTUR: 1, AKTIVURLAUB: 2, ERHOLUNG: 2, KULINARIK: 1, AUSFLUEGE: 2 },
    saison: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2 },
    reiseform: { single: 2, paar: 2, familie: 2 }, kinder: { A0_5: 2, A6_11: 2, A12P: 2 }
  },
  {
    id: 'test-bergsee', name: 'Bergsee', typ: 'SEENREGION', land: 'AT', region: 'Testalpen', preisniveau: 'EUR_EUR_EUR_EUR', status: 'FREIGEGEBEN',
    interessen: { STRAND: 1, STADT: 0, NATUR: 2, KULTUR: 1, AKTIVURLAUB: 2, ERHOLUNG: 2, KULINARIK: 1, AUSFLUEGE: 2 },
    saison: { 1: 0, 2: 0, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 1, 11: 0, 12: 0 },
    reiseform: { single: 1, paar: 2, familie: 2 }, kinder: { A0_5: 1, A6_11: 2, A12P: 2 }
  },
  {
    id: 'test-zurueckgezogen', name: 'Archivziel', typ: 'STADT', land: 'DE', region: 'Archivregion', preisniveau: 'EUR', status: 'ZURUECKGEZOGEN',
    interessen: { STRAND: 2, STADT: 2, NATUR: 2, KULTUR: 2, AKTIVURLAUB: 2, ERHOLUNG: 2, KULINARIK: 2, AUSFLUEGE: 2 },
    saison: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2 },
    reiseform: { single: 2, paar: 2, familie: 2 }, kinder: { A0_5: 2, A6_11: 2, A12P: 2 }
  }
]);
