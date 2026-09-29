import sys
from collections import Counter

def analyze_image(path):
    print(f"\n{'='*60}")
    print(f"ANALYZING: {path}")
    print(f"{'='*60}")
    
    try:
        from PIL import Image, ImageStat
    except ImportError:
        print("PIL/Pillow not available. Installing...")
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image, ImageStat
    
    img = Image.open(path)
    print(f"Dimensions: {img.size[0]}x{img.size[1]} ({img.mode})")
    print(f"Format: {img.format}")
    
    # Dominant colors
    img_small = img.convert('RGB').resize((100, 100))
    pixels = list(img_small.getdata())
    counter = Counter(pixels)
    top10 = counter.most_common(10)
    
    print("\nTop 10 Dominant Colors (RGB hex):")
    for i, (color, count) in enumerate(top10, 1):
        hex_color = '#{:02x}{:02x}{:02x}'.format(*color)
        print(f"  {i:2d}. {hex_color}  (RGB: {color[0]:3d}, {color[1]:3d}, {color[2]:3d})  ({count}%)")
    
    # Color composition analysis
    stat = ImageStat.Stat(img)
    r_mean, g_mean, b_mean = stat.mean
    r_std, g_std, b_std = stat.stddev
    
    print(f"\nColor Statistics:")
    print(f"  Mean RGB: ({r_mean:.1f}, {g_mean:.1f}, {b_mean:.1f})")
    print(f"  Std Dev RGB: ({r_std:.1f}, {g_std:.1f}, {b_std:.1f})")
    
    # Determine type: photo vs screenshot vs graphic design
    # Photo-like: many unique colors, natural color distribution
    # Screenshot: often has UI elements, text, sharp edges
    # Graphic design: limited palette, solid color blocks
    
    num_colors = len(counter)
    total_pixels = len(pixels)
    unique_ratio = num_colors / total_pixels if total_pixels > 0 else 0
    
    # Check for high saturation areas (screenshots often have UI colors)
    # Check color histogram smoothness
    hist = img_small.histogram()
    
    # Determine type
    img_type = "Unknown"
    if unique_ratio > 0.5 and (r_std > 30 or g_std > 30 or b_std > 30):
        img_type = "Likely Photo"
    elif unique_ratio < 0.3:
        img_type = "Likely Graphic Design"
    else:
        img_type = "Likely Screenshot or Mixed"
    
    print(f"\nApparent Type: {img_type}")
    print(f"  Unique color ratio: {unique_ratio:.3f} ({num_colors} unique colors in sample)")
    
    # OCR with pytesseract if available
    try:
        import pytesseract
        text = pytesseract.image_to_string(img)
        text = text.strip()
        if text:
            print(f"\nOCR Detected Text:")
            print(text[:500])
        else:
            print("\nOCR: No text detected")
    except ImportError:
        print("\nOCR: pytesseract not available")
    except Exception as e:
        print(f"\nOCR Error: {e}")
    
    return img_type, top10

# Analyze both images
analyze_image(r"C:\Users\hp\OneDrive\Desktop\Portfolio\image.jpg")
analyze_image(r"C:\Users\hp\OneDrive\Desktop\Portfolio\su.jpg")
