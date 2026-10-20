#!/usr/bin/env python3
"""Trace the present-day map of Ärteråsen into a clean SVG base map.

One-off helper, not part of the build. Needs python3 with numpy, opencv-python and Pillow.

Source: Lars Bägerfeldt, skrift 66, p. 51 ("Den nuvarande utbredningen av hus i Ärteråsen"),
extracted with:  pdfimages -j -f 51 -l 51 material/skrifter/bagerfeldt-66-*.pdf <prefix>

    python3 tools/karta-vektorisera.py <map.jpg> content/karta/bas.svg

The image is segmented by colour: open land (pale cream), forest (pale green, the background),
buildings (tan, brown and the red/orange highlighted fire houses) and the contour lines.
Buildings become rotated rectangles, open land a smoothed polygon, contours simplified polylines.
Coordinates stay in source pixels (scale bar: about 41.5 px = 20 m) so places can be placed
by reading the source image. The style is applied by the page that embeds the SVG.
"""

import sys

import cv2
import numpy as np
from PIL import Image

PX_PER_M = 41.5 / 20


def load(path):
    rgb = np.array(Image.open(path).convert('RGB')).astype(np.int16)
    return rgb[..., 0], rgb[..., 1], rgb[..., 2]


def mask_text(h, w):
    """Areas to ignore: the place name label and the scale bar."""
    m = np.zeros((h, w), np.uint8)
    cv2.rectangle(m, (165, 390), (325, 440), 255, -1)  # "Ärteråsen"
    cv2.rectangle(m, (0, 880), (60, h), 255, -1)  # scale bar
    return m


def buildings(r, g, b, ignore):
    red = (r > 230) & (g < 125) & (b < 50)  # highlighted fire houses (brown roofs have g ~135, b ~80)
    brown = (r - b > 40) & (r < 235) & (g < 200) & (r > g + 5)  # tan and brown roofs
    # The yellow halo around a highlighted house has a darker rim and a grey glow that look like roofs.
    brown &= halos(r, g, b) == 0
    m = ((red | brown) & (ignore == 0)).astype(np.uint8) * 255
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    out = []
    contours, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for c in contours:
        if cv2.contourArea(c) < 25:
            continue
        (cx, cy), (w, h), a = cv2.minAreaRect(c)
        # highlighted houses are drawn with a halo; the roof itself is the red part
        hl = int(red[int(cy), int(cx)]) if 0 <= int(cy) < r.shape[0] and 0 <= int(cx) < r.shape[1] else 0
        out.append({'cx': cx, 'cy': cy, 'w': w, 'h': h, 'a': a, 'hl': bool(hl)})
    return out


def halos(r, g, b, glow=13):
    """Yellow halo around a highlighted house, plus the grey glow outside it."""
    halo = ((r > 225) & (g > 170) & (b < 175)).astype(np.uint8) * 255
    halo = cv2.morphologyEx(halo, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))
    return cv2.dilate(halo, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (glow, glow)))


def open_land(r, g, b, houses, ignore):
    cream = ((r > 236) & (g > 236) & (b > 195) & (np.abs(r - g) < 14) & (ignore == 0)).astype(np.uint8) * 255
    # A halo hides what is under it: continue the edges around it through the halo.
    m = cv2.inpaint(cream, halos(r, g, b, 31), 9, cv2.INPAINT_TELEA)
    m = (m > 127).astype(np.uint8) * 255
    for hs in houses:
        box = cv2.boxPoints(((hs['cx'], hs['cy']), (hs['w'] + 6, hs['h'] + 6), hs['a'])).astype(np.int32)
        cv2.fillPoly(m, [box], 255)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
    m = cv2.GaussianBlur(m, (9, 9), 0)
    m = (m > 127).astype(np.uint8) * 255
    contours, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    big = [c for c in contours if cv2.contourArea(c) > 2000]
    filled = np.zeros_like(m)
    cv2.drawContours(filled, big, -1, 255, -1)
    return [cv2.approxPolyDP(c, 1.6, True)[:, 0, :] for c in big], filled


def contour_lines(r, g, b, houses, ignore, land):
    lum = (r * 299 + g * 587 + b * 114) // 1000
    bg = cv2.medianBlur(lum.astype(np.uint8), 21).astype(np.int16)
    # Only in the forest: inside the open land the halos and the edge give too many false lines.
    near_land = cv2.dilate(land, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17, 17))) > 0
    line = (bg - lum > 9) & (ignore == 0) & ~near_land & (halos(r, g, b) == 0)
    m = line.astype(np.uint8) * 255
    for hs in houses:  # houses and their halos are not contours
        box = cv2.boxPoints(((hs['cx'], hs['cy']), (hs['w'] + 22, hs['h'] + 22), hs['a'])).astype(np.int32)
        cv2.fillPoly(m, [box], 0)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    skel = thin(m)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(cv2.dilate(skel, np.ones((3, 3), np.uint8)))
    keep = np.zeros_like(skel)
    for i in range(1, n):
        comp = labels == i
        length = int((skel[comp] > 0).sum())
        if length >= 70 and stats[i][4] < length * 4.5:  # long and thin, not a blob or the hatching
            keep[comp & (skel > 0)] = 255
    return trace(keep)


def thin(m):
    from skimage.morphology import skeletonize

    return skeletonize(m > 0).astype(np.uint8) * 255


def trace(skel):
    """Walk skeleton pixels into polylines."""
    pts = set(zip(*np.nonzero(skel)))
    nb = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

    def neighbours(p):
        return [(p[0] + dy, p[1] + dx) for dy, dx in nb if (p[0] + dy, p[1] + dx) in pts]

    lines = []
    ends = [p for p in pts if len(neighbours(p)) == 1]
    seen = set()
    for start in ends + list(pts):
        if start in seen:
            continue
        line, p = [start], start
        seen.add(p)
        while True:
            nxt = [q for q in neighbours(p) if q not in seen]
            if not nxt:
                break
            p = nxt[0]
            seen.add(p)
            line.append(p)
        if len(line) >= 40:
            arr = np.array([[x, y] for y, x in line], np.int32).reshape(-1, 1, 2)
            lines.append(cv2.approxPolyDP(arr, 1.2, False)[:, 0, :])
    return lines


def path(points, closed):
    d = 'M' + ' L'.join(f'{x:.0f} {y:.0f}' for x, y in points)
    return d + (' Z' if closed else '')


def main(src, dst):
    r, g, b = load(src)
    h, w = r.shape
    ignore = mask_text(h, w)
    houses = buildings(r, g, b, ignore)
    land, land_mask = open_land(r, g, b, houses, ignore)
    lines = contour_lines(r, g, b, houses, ignore, land_mask)

    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" data-px-per-m="{PX_PER_M:.4f}">',
        '<!-- Traced from Lars Bägerfeldt, skrift 66, p. 51. See tools/karta-vektorisera.py. -->',
        f'<rect class="k-skog" width="{w}" height="{h}"/>',
        '<g class="k-vall">' + ''.join(f'<path d="{path(p, True)}"/>' for p in land) + '</g>',
        '<g class="k-kurvor">' + ''.join(f'<path d="{path(l, False)}"/>' for l in lines) + '</g>',
        '<g class="k-hus">',
    ]
    for hs in sorted(houses, key=lambda s: (s['cy'], s['cx'])):
        cls = ' class="k-eldhus"' if hs['hl'] else ''
        out.append(
            f'<rect{cls} x="{-hs["w"] / 2:.1f}" y="{-hs["h"] / 2:.1f}" width="{hs["w"]:.1f}" height="{hs["h"]:.1f}" '
            f'transform="translate({hs["cx"]:.1f} {hs["cy"]:.1f}) rotate({hs["a"]:.1f})"/>'
        )
    out += ['</g>', '</svg>', '']
    with open(dst, 'w', encoding='utf-8') as f:
        f.write('\n'.join(out))
    print(f'{len(houses)} hus ({sum(s["hl"] for s in houses)} markerade), {len(land)} öppna ytor, {len(lines)} höjdkurvor -> {dst}')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
