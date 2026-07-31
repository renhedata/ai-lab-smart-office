#!/usr/bin/env python3
"""Generate the preliminary 2D office floor plan as DXF, SVG, PDF and PNG.

The drawing is calibrated from the photographed plan using the documented
20,000 mm overall width. Internal geometry is an editable first-pass trace and
must be checked on site before it is used for construction.
"""

from __future__ import annotations

import argparse
import html
import math
import zipfile
from dataclasses import dataclass
from pathlib import Path

import cairosvg
import ezdxf
from ezdxf.enums import TextEntityAlignment


WIDTH = 20_000
HEIGHT = 27_200
OUTER_WALL = 260
INNER_WALL = 140


@dataclass(frozen=True)
class Wall:
    orientation: str
    fixed: float
    start: float
    end: float
    thickness: float = INNER_WALL


@dataclass(frozen=True)
class Door:
    orientation: str
    fixed: float
    start: float
    width: float
    swing: str

    @property
    def end(self) -> float:
        return self.start + self.width


@dataclass(frozen=True)
class Window:
    orientation: str
    fixed: float
    start: float
    end: float


@dataclass(frozen=True)
class Label:
    text: str
    x: float
    y: float
    size: float = 500
    layer: str = "A-TEXT"
    rotation: float = 0


def hwall(y: float, x1: float, x2: float, thickness: float = INNER_WALL) -> Wall:
    return Wall("h", y, x1, x2, thickness)


def vwall(x: float, y1: float, y2: float, thickness: float = INNER_WALL) -> Wall:
    return Wall("v", x, y1, y2, thickness)


WALLS = [
    hwall(0, 0, WIDTH, OUTER_WALL),
    hwall(HEIGHT, 0, WIDTH, OUTER_WALL),
    vwall(0, 0, HEIGHT, OUTER_WALL),
    vwall(WIDTH, 0, HEIGHT, OUTER_WALL),
    # Northern dining and support spaces.
    vwall(4_500, 0, 5_400),
    vwall(7_100, 3_600, 9_000),
    hwall(3_400, 0, 4_500),
    hwall(3_600, 4_500, WIDTH),
    hwall(5_400, 0, WIDTH),
    # D zone.
    hwall(7_200, 7_100, WIDTH),
    hwall(9_000, 7_100, WIDTH),
    # C zone and western service rooms.
    vwall(4_500, 5_400, 23_800),
    hwall(7_200, 0, 4_500),
    hwall(9_300, 0, 4_500),
    hwall(12_100, 0, 4_500),
    hwall(14_600, 0, 4_500),
    hwall(17_000, 0, 4_500),
    hwall(19_800, 0, 4_500),
    vwall(2_250, 19_800, 21_700),
    hwall(21_700, 0, 4_500),
    # B zone and reception.
    vwall(15_700, 9_000, 23_800),
    hwall(11_800, 15_700, WIDTH),
    hwall(14_600, 15_700, WIDTH),
    hwall(17_600, 15_700, WIDTH),
    hwall(22_400, 15_700, WIDTH),
    hwall(23_800, 0, WIDTH),
    # Southern machine room, front desk, entrance and lift zone.
    vwall(6_500, 23_800, HEIGHT),
    vwall(11_500, 23_800, HEIGHT),
    vwall(14_500, 23_800, HEIGHT),
    vwall(17_500, 23_800, HEIGHT),
    hwall(25_500, 17_500, WIDTH),
]


DOORS = [
    Door("h", HEIGHT, 12_300, 1_400, "up"),
    Door("h", 3_400, 3_350, 900, "up"),
    Door("v", 4_500, 2_250, 900, "left"),
    Door("v", 4_500, 4_050, 900, "left"),
    Door("v", 7_100, 3_900, 900, "right"),
    Door("v", 7_100, 5_700, 900, "right"),
    Door("v", 7_100, 7_500, 900, "right"),
    Door("v", 4_500, 5_750, 900, "left"),
    Door("v", 4_500, 7_550, 900, "left"),
    Door("v", 4_500, 9_650, 900, "left"),
    Door("v", 4_500, 12_450, 900, "left"),
    Door("v", 4_500, 14_950, 900, "left"),
    Door("v", 4_500, 17_350, 900, "left"),
    Door("v", 4_500, 20_150, 850, "left"),
    Door("v", 4_500, 22_050, 850, "left"),
    Door("h", 21_700, 500, 750, "up"),
    Door("v", 15_700, 9_300, 900, "right"),
    Door("v", 15_700, 12_100, 900, "right"),
    Door("v", 15_700, 14_900, 900, "right"),
    Door("v", 15_700, 22_650, 800, "right"),
    Door("h", 23_800, 5_150, 900, "down"),
    Door("h", 23_800, 7_200, 900, "down"),
    Door("h", 23_800, 15_950, 850, "down"),
    Door("v", 11_500, 24_900, 900, "right"),
    Door("v", 14_500, 24_900, 900, "right"),
    Door("v", 17_500, 24_100, 850, "right"),
    Door("v", 17_500, 25_850, 850, "right"),
]


WINDOWS = [
    Window("h", 0, 450, 3_900),
    Window("h", 0, 7_700, 14_400),
    Window("h", 0, 15_500, 19_550),
    Window("h", HEIGHT, 450, 5_900),
    Window("h", HEIGHT, 6_900, 10_900),
    Window("h", HEIGHT, 14_900, 17_000),
    Window("v", 0, 550, 2_700),
    Window("v", 0, 3_850, 5_150),
    Window("v", 0, 5_750, 6_850),
    Window("v", 0, 7_600, 8_800),
    Window("v", 0, 9_950, 11_450),
    Window("v", 0, 12_700, 14_100),
    Window("v", 0, 15_250, 16_600),
    Window("v", 0, 17_650, 19_900),
    Window("v", WIDTH, 650, 2_950),
    Window("v", WIDTH, 3_950, 5_050),
    Window("v", WIDTH, 5_700, 6_850),
    Window("v", WIDTH, 7_500, 8_750),
    Window("v", WIDTH, 9_650, 11_250),
    Window("v", WIDTH, 12_250, 14_150),
    Window("v", WIDTH, 15_050, 17_050),
    Window("v", WIDTH, 18_200, 21_900),
]


LABELS = [
    Label("灶台", 2_200, 1_700, 600),
    Label("食堂一", 2_200, 4_450, 520),
    Label("食堂 · 餐厅", 12_250, 750, 560),
    Label("D办公室1", 13_200, 4_500, 520),
    Label("D办公室2", 13_200, 6_300, 520),
    Label("D办公室3", 13_200, 8_100, 520),
    Label("C办公室5", 2_150, 6_300, 490),
    Label("C办公室4", 2_150, 8_250, 490),
    Label("D会议室", 2_150, 10_700, 500),
    Label("C办公室3", 2_150, 13_350, 490),
    Label("C办公室2", 2_150, 15_800, 490),
    Label("C办公室1", 2_150, 18_700, 490),
    Label("卫生间1", 1_125, 20_750, 340),
    Label("卫生间2", 3_375, 20_750, 340),
    Label("卫生间3", 2_250, 22_750, 360),
    Label("机房", 3_250, 25_450, 520),
    Label("前台", 9_000, 25_050, 520),
    Label("A大厅3", 11_000, 10_200, 520),
    Label("A大厅2", 11_000, 13_200, 520),
    Label("A大厅1", 11_000, 16_200, 520),
    Label("南侧前厅", 11_000, 20_500, 560),
    Label("B办公室1", 17_850, 10_400, 490),
    Label("B办公室2", 17_850, 13_200, 490),
    Label("B办公室3", 17_850, 15_250, 490),
    Label("A大厅4", 17_850, 18_800, 520),
    Label("接待厅", 17_850, 23_050, 440),
    Label("电梯厅", 16_000, 25_700, 440),
    Label("入口", 13_000, 25_700, 480),
]


COLUMNS = [
    (0, 0), (WIDTH, 0), (0, HEIGHT), (WIDTH, HEIGHT),
    (4_500, 0), (12_500, 0),
    (0, 9_000), (0, 17_000), (0, 23_800),
    (WIDTH, 9_000), (WIDTH, 17_600), (WIDTH, 23_800),
    (6_400, 9_000), (14_500, 9_000),
    (6_400, 12_000), (14_500, 12_000),
    (6_400, 15_000), (14_500, 15_000),
    (6_400, 18_000), (14_500, 18_000),
    (6_500, 23_800), (14_500, 23_800), (17_500, 23_800),
]


def wall_parts(wall: Wall) -> list[tuple[float, float]]:
    parts = [(wall.start, wall.end)]
    for door in DOORS:
        if door.orientation != wall.orientation or abs(door.fixed - wall.fixed) > 0.1:
            continue
        next_parts: list[tuple[float, float]] = []
        for start, end in parts:
            if door.end <= start or door.start >= end:
                next_parts.append((start, end))
            else:
                if door.start > start:
                    next_parts.append((start, door.start))
                if door.end < end:
                    next_parts.append((door.end, end))
        parts = next_parts
    return [(a, b) for a, b in parts if b - a > 1]


def cad_y(y: float) -> float:
    return HEIGHT - y


def add_dxf_line(msp, p1, p2, layer: str) -> None:
    msp.add_line(p1, p2, dxfattribs={"layer": layer})


def add_dxf_wall(msp, wall: Wall, start: float, end: float) -> None:
    half = wall.thickness / 2
    if wall.orientation == "h":
        y1 = cad_y(wall.fixed - half)
        y2 = cad_y(wall.fixed + half)
        add_dxf_line(msp, (start, y1), (end, y1), "A-WALL")
        add_dxf_line(msp, (start, y2), (end, y2), "A-WALL")
        add_dxf_line(msp, (start, y1), (start, y2), "A-WALL")
        add_dxf_line(msp, (end, y1), (end, y2), "A-WALL")
    else:
        x1 = wall.fixed - half
        x2 = wall.fixed + half
        y1 = cad_y(start)
        y2 = cad_y(end)
        add_dxf_line(msp, (x1, y1), (x1, y2), "A-WALL")
        add_dxf_line(msp, (x2, y1), (x2, y2), "A-WALL")
        add_dxf_line(msp, (x1, y1), (x2, y1), "A-WALL")
        add_dxf_line(msp, (x1, y2), (x2, y2), "A-WALL")


def door_geometry(door: Door):
    if door.orientation == "v":
        hinge = (door.fixed, door.start)
        other = (door.fixed, door.end)
        leaf = (
            door.fixed - door.width if door.swing == "left" else door.fixed + door.width,
            door.start,
        )
    else:
        hinge = (door.start, door.fixed)
        other = (door.end, door.fixed)
        leaf = (
            door.start,
            door.fixed - door.width if door.swing == "up" else door.fixed + door.width,
        )
    return hinge, other, leaf


def add_dxf_door(msp, door: Door) -> None:
    hinge, other, leaf = door_geometry(door)
    hc = (hinge[0], cad_y(hinge[1]))
    oc = (other[0], cad_y(other[1]))
    lc = (leaf[0], cad_y(leaf[1]))
    add_dxf_line(msp, hc, lc, "A-DOOR")
    a1 = math.degrees(math.atan2(oc[1] - hc[1], oc[0] - hc[0])) % 360
    a2 = math.degrees(math.atan2(lc[1] - hc[1], lc[0] - hc[0])) % 360
    if (a2 - a1) % 360 > 180:
        a1, a2 = a2, a1
    msp.add_arc(hc, door.width, a1, a2, dxfattribs={"layer": "A-DOOR"})


def add_dxf_rect(msp, x: float, y: float, w: float, h: float, layer: str) -> None:
    points = [
        (x, cad_y(y)),
        (x + w, cad_y(y)),
        (x + w, cad_y(y + h)),
        (x, cad_y(y + h)),
    ]
    msp.add_lwpolyline(points, close=True, dxfattribs={"layer": layer})


def add_dxf_text(msp, label: Label) -> None:
    entity = msp.add_text(
        label.text,
        height=label.size,
        dxfattribs={"layer": label.layer, "style": "CN", "rotation": label.rotation},
    )
    entity.set_placement(
        (label.x, cad_y(label.y)),
        align=TextEntityAlignment.MIDDLE_CENTER,
    )


def add_furniture_dxf(msp) -> None:
    for y in (9_500, 12_500, 15_500):
        add_dxf_rect(msp, 8_000, y, 6_000, 1_300, "A-FURN")
        for index in range(4):
            x = 8_150 + index * 1_450
            add_dxf_rect(msp, x, y - 450, 700, 320, "A-FURN")
            add_dxf_rect(msp, x, y + 1_430, 700, 320, "A-FURN")
    add_dxf_rect(msp, 7_800, 1_450, 7_600, 1_150, "A-FURN")
    for x in (8_000, 9_200, 10_400, 11_600, 12_800, 14_000):
        add_dxf_rect(msp, x, 950, 650, 320, "A-FURN")
        add_dxf_rect(msp, x, 2_780, 650, 320, "A-FURN")
    add_dxf_rect(msp, 750, 10_100, 3_000, 900, "A-FURN")
    add_dxf_rect(msp, 17_000, 16_150, 2_000, 850, "A-FURN")
    add_dxf_rect(msp, 17_050, 20_400, 1_700, 650, "A-FURN")
    add_dxf_rect(msp, 16_350, 20_250, 500, 1_000, "A-FURN")
    add_dxf_rect(msp, 18_950, 20_250, 500, 1_000, "A-FURN")
    add_dxf_rect(msp, 7_250, 25_850, 3_500, 550, "A-FURN")
    for x, y in ((17_750, 24_050), (17_750, 25_750)):
        add_dxf_rect(msp, x, y, 1_500, 1_200, "A-FURN")


def add_dimensions_dxf(msp) -> None:
    offset = 900
    add_dxf_line(msp, (0, cad_y(-offset)), (WIDTH, cad_y(-offset)), "A-DIMS")
    add_dxf_line(msp, (0, cad_y(-250)), (0, cad_y(-1_150)), "A-DIMS")
    add_dxf_line(msp, (WIDTH, cad_y(-250)), (WIDTH, cad_y(-1_150)), "A-DIMS")
    add_dxf_text(msp, Label("20000", WIDTH / 2, -offset - 250, 420, "A-DIMS"))
    add_dxf_line(msp, (-900, cad_y(0)), (-900, cad_y(HEIGHT)), "A-DIMS")
    add_dxf_line(msp, (-250, cad_y(0)), (-1_150, cad_y(0)), "A-DIMS")
    add_dxf_line(msp, (-250, cad_y(HEIGHT)), (-1_150, cad_y(HEIGHT)), "A-DIMS")
    add_dxf_text(msp, Label("27200（待现场复核）", -1_250, HEIGHT / 2, 380, "A-DIMS", 90))


def build_dxf(path: Path) -> None:
    doc = ezdxf.new("R2010", setup=True, units=ezdxf.units.MM)
    doc.header["$INSUNITS"] = 4
    layer_specs = [
        ("A-WALL", 7, 50),
        ("A-DOOR", 3, 25),
        ("A-WIND", 5, 25),
        ("A-FURN", 8, 18),
        ("A-TEXT", 7, 18),
        ("A-DIMS", 6, 18),
        ("S-COLS", 1, 35),
        ("A-REF", 9, 13),
        ("E-NETWORK", 4, 25),
        ("E-SECURITY", 2, 25),
        ("E-SENSOR", 6, 25),
    ]
    for name, color, lineweight in layer_specs:
        doc.layers.add(name=name, color=color, lineweight=lineweight)
    doc.styles.add("CN", font="PingFang SC")
    msp = doc.modelspace()
    for wall in WALLS:
        for start, end in wall_parts(wall):
            add_dxf_wall(msp, wall, start, end)
    for door in DOORS:
        add_dxf_door(msp, door)
    for window in WINDOWS:
        if window.orientation == "h":
            for delta in (-45, 45):
                add_dxf_line(
                    msp,
                    (window.start, cad_y(window.fixed + delta)),
                    (window.end, cad_y(window.fixed + delta)),
                    "A-WIND",
                )
        else:
            for delta in (-45, 45):
                add_dxf_line(
                    msp,
                    (window.fixed + delta, cad_y(window.start)),
                    (window.fixed + delta, cad_y(window.end)),
                    "A-WIND",
                )
    for x, y in COLUMNS:
        add_dxf_rect(msp, x - 210, y - 210, 420, 420, "S-COLS")
    add_furniture_dxf(msp)
    for label in LABELS:
        add_dxf_text(msp, label)
    add_dxf_text(msp, Label("二维平面底图初稿 · 单位：mm · 非施工图", WIDTH / 2, HEIGHT + 1_100, 430, "A-REF"))
    add_dimensions_dxf(msp)
    doc.saveas(path)


def svg_line(x1, y1, x2, y2, class_name, width=None, extra="") -> str:
    width_attr = f' stroke-width="{width}"' if width is not None else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" class="{class_name}"{width_attr} {extra}/>'


def svg_rect(x, y, w, h, class_name, extra="") -> str:
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="{class_name}" {extra}/>'


def svg_text(label: Label) -> str:
    transform = f' transform="rotate({label.rotation} {label.x} {label.y})"' if label.rotation else ""
    return (
        f'<text x="{label.x}" y="{label.y}" class="{label.layer.lower()}" '
        f'font-size="{label.size}"{transform}>{html.escape(label.text)}</text>'
    )


def add_furniture_svg(parts: list[str]) -> None:
    for index, y in enumerate((9_500, 12_500, 15_500), start=1):
        parts.append(svg_rect(7_700, y - 600, 6_600, 2_250, "zone-boundary"))
        parts.append(svg_rect(8_000, y, 6_000, 1_300, "furniture"))
        for seat in range(4):
            x = 8_150 + seat * 1_450
            parts.append(svg_rect(x, y - 450, 700, 320, "chair"))
            parts.append(svg_rect(x, y + 1_430, 700, 320, "chair"))
        parts.append(svg_text(Label(f"A大厅{4 - index}", 11_000, y + 650, 480)))
    parts.append(svg_rect(7_800, 1_450, 7_600, 1_150, "furniture"))
    for x in (8_000, 9_200, 10_400, 11_600, 12_800, 14_000):
        parts.append(svg_rect(x, 950, 650, 320, "chair"))
        parts.append(svg_rect(x, 2_780, 650, 320, "chair"))
    parts.append(svg_rect(750, 10_100, 3_000, 900, "furniture"))
    for x in (900, 1_700, 2_500):
        parts.append(svg_rect(x, 9_600, 500, 320, "chair"))
        parts.append(svg_rect(x, 11_180, 500, 320, "chair"))
    parts.append(svg_rect(17_000, 16_150, 2_000, 850, "furniture"))
    parts.append(svg_rect(17_050, 20_400, 1_700, 650, "furniture"))
    parts.append(svg_rect(16_350, 20_250, 500, 1_000, "furniture"))
    parts.append(svg_rect(18_950, 20_250, 500, 1_000, "furniture"))
    parts.append(svg_rect(7_250, 25_850, 3_500, 550, "furniture"))
    for x, y in ((17_750, 24_050), (17_750, 25_750)):
        parts.append(svg_rect(x, y, 1_500, 1_200, "lift"))
        parts.append(svg_text(Label("电梯", x + 750, y + 600, 320)))


def add_dimensions_svg(parts: list[str]) -> None:
    parts.append(svg_line(0, -900, WIDTH, -900, "dimension"))
    parts.append(svg_line(0, -250, 0, -1_150, "dimension"))
    parts.append(svg_line(WIDTH, -250, WIDTH, -1_150, "dimension"))
    parts.append(svg_text(Label("20000", WIDTH / 2, -1_150, 420, "A-DIMS")))
    parts.append(svg_line(-900, 0, -900, HEIGHT, "dimension"))
    parts.append(svg_line(-250, 0, -1_150, 0, "dimension"))
    parts.append(svg_line(-250, HEIGHT, -1_150, HEIGHT, "dimension"))
    parts.append(svg_text(Label("27200（待现场复核）", -1_250, HEIGHT / 2, 360, "A-DIMS", -90)))


def build_svg(path: Path) -> None:
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1875" viewBox="-1800 -1700 23600 31600">',
        '<metadata>AI实验室办公室二维平面底图初稿；总宽按 20000 mm 校准，内部尺寸需现场复核。</metadata>',
        """<style>
        .sheet { fill: #ffffff; }
        .zone-dining { fill: #fff7df; }
        .zone-d { fill: #f5f0ff; }
        .zone-c { fill: #edf7ff; }
        .zone-b { fill: #effaf3; }
        .zone-common { fill: #f2fbfa; }
        .zone-service { fill: #f5f6f8; }
        .wall { stroke: #111827; stroke-linecap: square; fill: none; }
        .door { stroke: #0f766e; stroke-width: 55; fill: none; }
        .window { stroke: #0284c7; stroke-width: 42; fill: none; }
        .window-mask { stroke: #ffffff; fill: none; }
        .column { fill: #111827; stroke: #111827; }
        .furniture, .chair, .lift { fill: #f8fafc; stroke: #64748b; stroke-width: 36; }
        .chair { fill: #ffffff; }
        .lift { fill: #f1f5f9; stroke-width: 48; }
        .zone-boundary { fill: none; stroke: #94a3b8; stroke-width: 32; stroke-dasharray: 180 120; }
        .a-text, .a-dims, .a-ref { font-family: 'PingFang SC', 'Noto Sans CJK SC', 'Microsoft YaHei', sans-serif; text-anchor: middle; dominant-baseline: central; fill: #111827; }
        .a-dims { fill: #475569; }
        .a-ref { fill: #64748b; }
        .dimension, .dimension-small { stroke: #64748b; stroke-width: 34; fill: none; marker-start: url(#tick); marker-end: url(#tick); }
        .dimension-small { stroke-width: 24; }
        .north { stroke: #0f172a; fill: #0f172a; }
        </style>""",
        '<defs><marker id="tick" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto"><path d="M2,10 L10,2" stroke="#64748b" stroke-width="1.5"/></marker></defs>',
        svg_rect(-1_800, -1_700, 23_600, 31_600, "sheet"),
        svg_rect(0, 0, WIDTH, 5_400, "zone-dining"),
        svg_rect(7_100, 3_600, 12_900, 5_400, "zone-d"),
        svg_rect(0, 5_400, 4_500, 15_300, "zone-c"),
        svg_rect(15_700, 9_000, 4_300, 13_400, "zone-b"),
        svg_rect(4_500, 9_000, 11_200, 14_800, "zone-common"),
        svg_rect(0, 19_800, 4_500, 4_000, "zone-service"),
        svg_rect(0, 23_800, WIDTH, 3_400, "zone-service"),
    ]
    for wall in WALLS:
        for start, end in wall_parts(wall):
            if wall.orientation == "h":
                parts.append(svg_line(start, wall.fixed, end, wall.fixed, "wall", wall.thickness))
            else:
                parts.append(svg_line(wall.fixed, start, wall.fixed, end, "wall", wall.thickness))
    for window in WINDOWS:
        if window.orientation == "h":
            parts.append(svg_line(window.start, window.fixed, window.end, window.fixed, "window-mask", OUTER_WALL + 35))
            for delta in (-45, 45):
                parts.append(svg_line(window.start, window.fixed + delta, window.end, window.fixed + delta, "window"))
        else:
            parts.append(svg_line(window.fixed, window.start, window.fixed, window.end, "window-mask", OUTER_WALL + 35))
            for delta in (-45, 45):
                parts.append(svg_line(window.fixed + delta, window.start, window.fixed + delta, window.end, "window"))
    for door in DOORS:
        hinge, other, leaf = door_geometry(door)
        sweep = 1 if door.swing in {"left", "down"} else 0
        parts.append(svg_line(hinge[0], hinge[1], leaf[0], leaf[1], "door"))
        parts.append(
            f'<path d="M {other[0]} {other[1]} A {door.width} {door.width} 0 0 {sweep} {leaf[0]} {leaf[1]}" class="door"/>'
        )
    for x, y in COLUMNS:
        parts.append(svg_rect(x - 210, y - 210, 420, 420, "column"))
    add_furniture_svg(parts)
    for label in LABELS:
        if label.text not in {"A大厅1", "A大厅2", "A大厅3"}:
            parts.append(svg_text(label))
    add_dimensions_svg(parts)
    parts.extend([
        svg_text(Label("AI实验室办公室二维平面底图（初稿）", WIDTH / 2, HEIGHT + 1_000, 520, "A-REF")),
        svg_text(Label("单位：mm · 总宽按原图 20000 校准 · 内部尺寸、墙厚及门窗位置须现场复核", WIDTH / 2, HEIGHT + 1_650, 330, "A-REF")),
        svg_line(20_700, 26_500, 20_700, 24_900, "north", 45),
        '<path d="M 20700 24400 L 20380 25100 L 20700 24960 L 21020 25100 Z" class="north"/>',
        svg_text(Label("N", 20_700, 24_050, 360, "A-REF")),
        "</svg>",
    ])
    path.write_text("\n".join(parts), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("docs/public/layout"),
        help="Directory for generated assets",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    output_dir = args.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)
    svg_path = output_dir / "office-layout-2d.svg"
    dxf_path = output_dir / "office-layout-2d.dxf"
    pdf_path = output_dir / "office-layout-2d.pdf"
    png_path = output_dir / "office-layout-2d.png"
    zip_path = output_dir / "office-layout-2d-cad.zip"
    build_svg(svg_path)
    build_dxf(dxf_path)
    cairosvg.svg2pdf(url=str(svg_path), write_to=str(pdf_path))
    cairosvg.svg2png(url=str(svg_path), write_to=str(png_path), output_width=1800)
    zip_info = zipfile.ZipInfo(dxf_path.name, date_time=(2026, 7, 31, 0, 0, 0))
    zip_info.compress_type = zipfile.ZIP_DEFLATED
    zip_info.external_attr = 0o644 << 16
    with zipfile.ZipFile(zip_path, "w") as archive:
        archive.writestr(zip_info, dxf_path.read_bytes())
    for path in (dxf_path, zip_path, svg_path, pdf_path, png_path):
        print(path)


if __name__ == "__main__":
    main()
