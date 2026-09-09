"""Rebuild the public, text based résumé from resume.json. Requires reportlab."""
from pathlib import Path
import json
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent.parent
pdfmetrics.registerFont(TTFont('ResumeSans', str(ROOT/'assets/fonts/LiberationSans-Regular.ttf')))
pdfmetrics.registerFont(TTFont('ResumeSans-Bold', str(ROOT/'assets/fonts/LiberationSans-Bold.ttf')))
pdfmetrics.registerFontFamily('ResumeSans', normal='ResumeSans', bold='ResumeSans-Bold', italic='ResumeSans', boldItalic='ResumeSans-Bold')
data = json.loads((ROOT / 'resume.json').read_text())
INK = colors.HexColor('#171a20')
MUTED = colors.HexColor('#424a53')
ACCENT = colors.HexColor('#28523a')
STYLES = {
    'name': ParagraphStyle('name', fontName='ResumeSans-Bold', fontSize=21, leading=24, alignment=TA_CENTER, textColor=INK),
    'headline': ParagraphStyle('headline', fontName='ResumeSans', fontSize=10.5, leading=13, alignment=TA_CENTER, textColor=INK),
    'contact': ParagraphStyle('contact', fontName='ResumeSans', fontSize=9.5, leading=12, alignment=TA_CENTER, textColor=MUTED),
    'section': ParagraphStyle('section', fontName='ResumeSans-Bold', fontSize=10.5, leading=13, spaceBefore=6, spaceAfter=3, textColor=ACCENT),
    'title': ParagraphStyle('title', fontName='ResumeSans-Bold', fontSize=10.5, leading=13, textColor=INK),
    'date': ParagraphStyle('date', fontName='ResumeSans', fontSize=9, leading=13, alignment=TA_RIGHT, textColor=MUTED),
    'body': ParagraphStyle('body', fontName='ResumeSans', fontSize=10.5, leading=12.5, textColor=INK),
    'bullet': ParagraphStyle('bullet', fontName='ResumeSans', fontSize=10.5, leading=12.5, leftIndent=9, firstLineIndent=-9, spaceAfter=1.5, textColor=INK),
    'note': ParagraphStyle('note', fontName='ResumeSans', fontSize=9.5, leading=12, spaceAfter=2, textColor=MUTED),
}
WIDTH = letter[0] - 72
def para(text, style='body'):
    return Paragraph(text, STYLES[style])
def row(left, right, widths=(368,172)):
    table=Table([[para(left,'title'),para(escape(right),'date')]], colWidths=widths)
    table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
    return table
def bullet(text):
    return para('• '+escape(text),'bullet')

story=[para(escape(data['name']).upper(),'name'),para(escape(data['headline']),'headline'),para(escape(data['contact']),'contact')]
links=[]
for label,url in data['links'].items():
    text='diego.crisafu@gmail.com' if label=='Email' else label
    links.append(f'<link href="{escape(url)}" color="#28523a"><u>{escape(text)}</u></link>')
story.append(para(' | '.join(links),'contact'))
story.append(para('EDUCATION','section'))
for entry in data['education']:
    story.append(KeepTogether([row(escape(entry['school']),entry['date']),para(escape(entry['detail']),'body'),Spacer(1,3)]))
story.append(para('EXPERIENCE','section'))
for entry in data['experience']:
    header=escape(entry['company'])+' | '+escape(entry['title'])
    block=[row(header,entry['date'])]
    if entry.get('note'):block.append(para(escape(entry['note']),'note'))
    block.extend(bullet(text) for text in entry['bullets'])
    block.append(Spacer(1,3))
    story.append(KeepTogether(block))
story.append(para('PROJECTS','section'))
for entry in data['projects']:
    title=escape(entry['name'])+' | '+escape(entry['stack'])
    if entry.get('url'):title=f'<link href="{escape(entry["url"])}" color="#171a20">{title}</link>'
    story.append(KeepTogether([row(title,entry['date'])]+[bullet(text) for text in entry['bullets']]+[Spacer(1,3)]))
story.append(para('TECHNICAL SKILLS','section'))
# Group related products while preserving the distinction between languages and tools.
skills=data['skills']
for title,items in [
    ('Languages',skills['Languages']),
    ('Frameworks and databases',skills['Frameworks and runtimes']+skills['Databases']),
    ('Tools and web',skills['Tools and platforms']+skills['Web'])]:
    story.append(para('<b>'+escape(title)+':</b> '+escape(', '.join(items))))
doc=SimpleDocTemplate(str(ROOT/'Diego_Resume.pdf'),pagesize=letter,rightMargin=36,leftMargin=36,topMargin=28,bottomMargin=28,title='Diego Crisafulli | Software Engineering',author='Diego Crisafulli',pageCompression=1)
doc.build(story)
print(ROOT/'Diego_Resume.pdf')
