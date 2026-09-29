import pathlib, sys, re
sys.stdout.reconfigure(encoding="utf-8")
root = pathlib.Path(r"C:\Users\hp\OneDrive\Desktop\Portfolio")
IMGS = sorted(p.name for p in root.iterdir() if p.is_file() and p.suffix.lower() in {".jpg",".jpeg",".png",".webp",".gif",".svg"})
print("images at root:")
for n in IMGS: print("  ", n)
print()
pat = re.compile(r'(?:src=|href=|url\()\s*["\']?([^"\'()\s>]+)')
for f in sorted(root.glob("*.html")) + [root/"css"/"style.css", root/"js"/"main.js", root/"README.md"]:
    s = f.read_bytes().decode("utf-8")
    hits = sorted({m for m in pat.findall(s) if m.lower().endswith((".jpg",".jpeg",".png",".webp",".gif",".svg"))})
    if hits: print(f"{f.name}: {hits}")
