from __future__ import annotations

import json
from pathlib import Path

import win32com.client


SCRIPT_DIR = Path(__file__).resolve().parent
EXAMPLE_ROOT = SCRIPT_DIR.parent
REPO_ROOT = EXAMPLE_ROOT.parents[1]
ROOT = REPO_ROOT / "local-runs" / "satellite-network-rebuild"
PPTX = ROOT / "satellite_network_framework_replica.pptx"
if not PPTX.exists():
    ROOT = EXAMPLE_ROOT
    PPTX = EXAMPLE_ROOT / "output" / "replica.pptx"
OUT = REPO_ROOT / "local-runs" / "satellite-network-preview"
OUT.mkdir(parents=True, exist_ok=True)
for old_preview in OUT.glob("*.PNG"):
    old_preview.unlink()
for old_preview in OUT.glob("*.png"):
    old_preview.unlink()

app = win32com.client.Dispatch("PowerPoint.Application")
app.Visible = 1
presentation = None
try:
    presentation = app.Presentations.Open(str(PPTX), WithWindow=False)
    presentation.Export(str(OUT), "PNG", 1680, 945)
finally:
    if presentation is not None:
        presentation.Close()
    app.Quit()

raw_exports = sorted(OUT.glob("*.PNG"))
exports = []
for idx, path in enumerate(raw_exports, start=1):
    target = OUT / f"slide_{idx}.png"
    path.rename(target)
    exports.append(str(target))
report_path = ROOT / "validation_report.json"
if report_path.exists():
    report = json.loads(report_path.read_text(encoding="utf-8"))
    report["powerpoint_export_preview"] = [str(Path(p).relative_to(ROOT)).replace("\\", "/") for p in exports]
    report["checks"].append("PowerPoint COM round-trip PNG export completed for visual QA.")
    report["known_limits"] = [item for item in report.get("known_limits", []) if "PowerPoint round-trip render" not in item]
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"exports": exports}, ensure_ascii=False, indent=2))
