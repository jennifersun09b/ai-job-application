import sys, glob
from pypdf import PdfReader
def bbox(path):
    r=PdfReader(path); p=r.pages[0]
    W=float(p.mediabox.width); H=float(p.mediabox.height)
    ys=[]
    def v(text,cm,tm,fd,fs):
        if text.strip(): ys.append(tm[5])
    p.extract_text(visitor_text=v)
    if not ys: return W,H,None,None
    return W,H,max(ys),min(ys)
print(f"{'file':52} {'page':>13} {'top':>7} {'bot':>7} {'used%':>6}")
for f in sorted(glob.glob(sys.argv[1])):
    W,H,top,bot=bbox(f)
    if top is None: print(f"{f[:52]:52}  no text"); continue
    used=(top-bot)/H*100
    print(f"{f.split('/')[-1][:52]:52} {W:5.0f}x{H:<6.0f} {top:7.1f} {bot:7.1f} {used:6.1f}")
