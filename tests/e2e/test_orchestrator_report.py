import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from scripts import orchestrator


def test_report_generation(tmp_path):
    out = tmp_path / "report.json"
    rep = orchestrator.generate_report(str(out))
    assert 'packages' in rep
    assert len(rep['packages']) >= 1
    # order should be list-like
    assert isinstance(rep.get('order'), list)
