# Build + compile one CV spec and/or cover-letter spec with tectonic.
import sys, os, subprocess, importlib, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_v2, build_cl4
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
def compile_tex(p):
    d = os.path.dirname(p)
    r = subprocess.run(["tectonic", "-X", "compile", "--keep-logs", os.path.basename(p)], cwd=d, capture_output=True, text=True)
    if r.returncode: print(r.stderr[-2000:]); raise SystemExit("compile failed: " + p)
    return p[:-4] + ".pdf"
for name in sys.argv[1:]:
    m = importlib.import_module(name)
    if name.startswith("spec_"):
        p = build_v2.build(m.SPEC, os.path.join(ROOT, "cv"))
    else:
        p = build_cl4.build(m.SPEC, os.path.join(ROOT, "cover_letters"))
    print("built", compile_tex(p))
