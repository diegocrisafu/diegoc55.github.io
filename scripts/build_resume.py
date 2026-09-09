"""Build the classic serif resume from resume.json. Requires reportlab."""

import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
for face in ("Regular", "Bold", "BoldItalic"):
    pdfmetrics.registerFont(TTFont(
        f"ResumeSerif-{face}", str(ROOT / f"assets/fonts/ResumeSerif-{face}.ttf")
    ))
pdfmetrics.registerFontFamily(
    "ResumeSerif", normal="ResumeSerif-Regular", bold="ResumeSerif-Bold",
    italic="ResumeSerif-BoldItalic", boldItalic="ResumeSerif-BoldItalic",
)

DATA = json.loads((ROOT / "resume.json").read_text())
STYLES = {
    "name": ParagraphStyle(
        "name", fontName="ResumeSerif-Regular", fontSize=18, leading=21,
        alignment=TA_CENTER,
    ),
    "contact": ParagraphStyle(
        "contact", fontName="ResumeSerif-Regular", fontSize=8.5, leading=11,
        alignment=TA_CENTER,
    ),
    "section": ParagraphStyle(
        "section", fontName="ResumeSerif-Bold", fontSize=11.5, leading=14,
        spaceBefore=5, spaceAfter=2,
    ),
    "title": ParagraphStyle(
        "title", fontName="ResumeSerif-Bold", fontSize=10, leading=12,
    ),
    "date": ParagraphStyle(
        "date", fontName="ResumeSerif-Bold", fontSize=9.5, leading=12,
        alignment=TA_RIGHT,
    ),
    "body": ParagraphStyle(
        "body", fontName="ResumeSerif-Regular", fontSize=10, leading=11.8,
    ),
    "bullet": ParagraphStyle(
        "bullet", fontName="ResumeSerif-Regular", fontSize=10, leading=11.8,
        leftIndent=8, firstLineIndent=-8, spaceAfter=1.5,
    ),
    "note": ParagraphStyle(
        "note", fontName="ResumeSerif-Regular", fontSize=9.5, leading=11.5,
        spaceAfter=2,
    ),
}


def para(text, style="body"):
    return Paragraph(text, STYLES[style])


def row(left, date):
    table = Table(
        [[para(left, "title"), para(escape(date), "date")]], colWidths=(410, 142)
    )
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def bullet(text):
    return para("• " + escape(text), "bullet")


def section(title):
    return [
        para(title, "section"),
        HRFlowable(width="100%", thickness=0.4, color=colors.black, spaceAfter=4),
    ]


links = []
for label in ("Email", "LinkedIn", "GitHub", "Portfolio"):
    url = DATA["links"][label]
    text = "diego.crisafu@gmail.com" if label == "Email" else label
    links.append(f'<link href="{escape(url)}"><u>{escape(text)}</u></link>')
contact = "Montreal, QC, Canada | +1 514 679 5568 | " + " | ".join(links)
story = [para(escape(DATA["name"]).upper(), "name"), para(contact, "contact")]

story.extend(section("SUMMARY"))
story.append(para(escape(DATA["summary"])))
story.extend(section("EXPERIENCE"))
for entry in DATA["experience"]:
    title = escape(entry["company"]) + " | <i>" + escape(entry["title"]) + "</i>"
    block = [row(title, entry["date"]), Spacer(1, 2)]
    if entry.get("note"):
        block.append(para(escape(entry["note"]), "note"))
    block.extend(bullet(text) for text in entry["bullets"])
    block.append(Spacer(1, 3))
    story.append(KeepTogether(block))

story.extend(section("EDUCATION"))
for entry in DATA["education"]:
    title = escape(entry["school"]) + " | <i>" + escape(entry["detail"]) + "</i>"
    story.append(row(title, entry["date"]))
    story.append(Spacer(1, 3))

story.extend(section("SKILLS"))
for title, items in DATA["skills"].items():
    story.append(para("<b>" + escape(title) + ":</b> " + escape(", ".join(items))))

story.extend(section("PROJECTS"))
for entry in DATA["projects"]:
    name = escape(entry["name"])
    if entry.get("url"):
        name = f'<link href="{escape(entry["url"])}"><u>{name}</u></link>'
    title = name + " | <i>" + escape(entry["stack"]) + "</i>"
    block = [row(title, entry["date"]), Spacer(1, 2)]
    block.extend(bullet(text) for text in entry["bullets"])
    block.append(Spacer(1, 3))
    story.append(KeepTogether(block))

story.extend(section("PROFESSIONAL DEVELOPMENT"))
for text in DATA["development"]:
    story.append(bullet(text))

document = SimpleDocTemplate(
    str(ROOT / "Diego_Resume.pdf"), pagesize=letter,
    leftMargin=24, rightMargin=24, topMargin=6, bottomMargin=24,
    title="Diego Crisafulli | Software Engineering", author="Diego Crisafulli",
    pageCompression=1,
)
document.build(story)
print(ROOT / "Diego_Resume.pdf")
