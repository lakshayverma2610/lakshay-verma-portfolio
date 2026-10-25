import os
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class ATSResume(FPDF):
    def __init__(self):
        super().__init__(format="letter", unit="mm")
        # Ensure it fits into exactly 1 page
        self.set_auto_page_break(auto=False)
        self.set_margins(left=12, top=10, right=12)

        # Register standard Windows Arial fonts
        font_dir = r"C:\Windows\Fonts"
        self.add_font("ArialUnicode", "", os.path.join(font_dir, "arial.ttf"))
        self.add_font("ArialUnicode", "B", os.path.join(font_dir, "arialbd.ttf"))
        self.add_font("ArialUnicode", "I", os.path.join(font_dir, "ariali.ttf"))
        self.add_font("ArialUnicode", "BI", os.path.join(font_dir, "arialbi.ttf"))

    def section_heading(self, title):
        self.ln(2.0)
        self.set_font("ArialUnicode", "B", 9.8)
        self.set_text_color(15, 15, 15)
        self.cell(0, 4.2, title.upper(), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        # Clean solid divider rule
        self.set_draw_color(30, 30, 30)
        self.set_line_width(0.28)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(1.5)

    def entry_header(self, title, date_str, subtitle, meta_str=None):
        self.set_font("ArialUnicode", "B", 9.0)
        self.set_text_color(15, 15, 15)
        
        avail_w = self.w - self.l_margin - self.r_margin
        date_w = self.get_string_width(date_str) + 4
        title_w = avail_w - date_w
        
        self.cell(title_w, 4.0, title, new_x=XPos.RIGHT, new_y=YPos.TOP)
        self.set_font("ArialUnicode", "B", 8.4)
        self.set_text_color(60, 60, 60)
        self.cell(date_w, 4.0, date_str, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="R")
        
        # Subtitle and Meta row
        self.set_font("ArialUnicode", "I", 8.3)
        self.set_text_color(40, 40, 40)
        if meta_str:
            meta_w = self.get_string_width(meta_str) + 4
            sub_w = avail_w - meta_w
            self.cell(sub_w, 3.6, subtitle, new_x=XPos.RIGHT, new_y=YPos.TOP)
            self.set_font("ArialUnicode", "B", 8.2)
            self.set_text_color(20, 20, 20)
            self.cell(meta_w, 3.6, meta_str, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="R")
        else:
            self.cell(0, 3.6, subtitle, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(0.3)

    def bullet(self, text, bold_prefix=""):
        self.set_x(self.l_margin)
        avail_w = self.w - self.l_margin - self.r_margin
        bullet_indent = 4.0
        content_w = avail_w - bullet_indent
        
        self.set_font("ArialUnicode", "", 8.3)
        self.set_text_color(40, 40, 40)
        self.cell(bullet_indent, 3.6, "-", new_x=XPos.RIGHT, new_y=YPos.TOP, align="C")
        
        if bold_prefix:
            self.set_font("ArialUnicode", "B", 8.3)
            self.write(3.6, bold_prefix + " ")
            self.set_font("ArialUnicode", "", 8.3)
            self.write(3.6, text)
            self.ln(3.6)
        else:
            self.multi_cell(content_w, 3.6, text, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.ln(0.1)

def generate_resume():
    pdf = ATSResume()
    pdf.add_page()

    # 1. Header
    pdf.set_font("ArialUnicode", "B", 17)
    pdf.set_text_color(15, 15, 15)
    pdf.cell(0, 6.5, "LAKSHAY VERMA", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")

    pdf.set_font("ArialUnicode", "", 8.4)
    pdf.set_text_color(50, 50, 50)
    contact = "Gurugram, Haryana, India   |   lakshayverma2610@gmail.com   |   linkedin.com/in/lakshayverma2610   |   github.com"
    pdf.cell(0, 4.0, contact, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")

    # Top divider
    pdf.set_draw_color(20, 20, 20)
    pdf.set_line_width(0.35)
    pdf.line(pdf.l_margin, pdf.get_y() + 0.8, pdf.w - pdf.r_margin, pdf.get_y() + 0.8)
    pdf.ln(1.8)

    # 2. Education
    pdf.section_heading("Education")
    
    pdf.entry_header(
        "IILM University, Gurugram", 
        "2025 - 2029 (Expected)", 
        "Bachelor of Technology in Computer Science & Engineering (Student ID: 2581008)", 
        "Sem 2 SGPA: 9.32 | CGPA: 8.89 / 10.0"
    )
    pdf.bullet(
        "Achieved 5 A+ Grades in Semester 2 (Applied Calculus, Quantum Physics, Environmental Science).",
        "Academic Standing:"
    )
    pdf.bullet(
        "Straight Grade A in Data Structures & Algorithms, DSA Lab, C Programming, and Python. Grade A+ (10.0) in Applied Linear Algebra; Grade A in Digital Electronics & Computer Organization.",
        "Core Coursework:"
    )
    pdf.ln(0.6)

    pdf.entry_header(
        "Gurugram Public School, Gurugram", 
        "2024", 
        "CBSE Senior Secondary Examination (Class XII - Physics, Chemistry, Mathematics)", 
        "Aggregate: 92.4% (462/500) - Straight A1s"
    )
    pdf.bullet(
        "Informatics Practice: 98/100 (A1), English Core: 93/100 (A1), Chemistry: 93/100 (A1), Physics: 91/100 (A1).",
        "Key Subject Scores:"
    )
    pdf.ln(0.6)

    pdf.entry_header(
        "Gurugram Public School, Gurugram", 
        "2023", 
        "CBSE Secondary School Examination (Class X)", 
        "Computer Application: 100/100 (Grade A1) - 92.2% Best 5"
    )

    # 3. Experience & Internships
    pdf.section_heading("Experience & Internships")
    
    pdf.entry_header(
        "Ramakirti Foundation (80G / 12A Certified Non-Profit)", 
        "July 2026", 
        "Full-Stack Engineering & Social Impact Intern", 
        "Summer Post-Freshman Internship"
    )
    pdf.bullet("Engineered interactive web components, responsive frontend layouts, and donor workflows for the official portal under direct supervision of the Director.")
    pdf.bullet("Implemented client-side input validations, modular interface elements, and optimized cross-device mobile accessibility.")
    pdf.bullet("Awarded official Certificate of Completion with formal commendation from Director for dedication and quality delivery.")
    pdf.ln(0.6)

    pdf.entry_header(
        "IILM University Physical IoT Lab", 
        "Spring 2026", 
        "Smart Inventory & Telemetry Engineer", 
        "Campus Lab Infrastructure"
    )
    pdf.bullet("Designed hardware audit logging platform to track physical microcontrollers (ESP32, Arduino Uno), sensor kits, and apparatus.")
    pdf.bullet("Eliminated manual equipment tracking overhead and provided real-time component availability telemetry.")

    # 4. Key Engineering Projects
    pdf.section_heading("Key Engineering Projects")

    pdf.entry_header(
        "MockMaster - AI Mock Interview & Candidate Assessment Platform", 
        "Python, FastAPI, LLMs, React", 
        "Flagship University Placement Initiative", 
        "Commissioned by University Leadership"
    )
    pdf.bullet("Architected automated placement interview simulation platform to evaluate engineering student readiness.")
    pdf.bullet("Engineered dynamic technical question generation tailored to candidate target roles (DSA, C, Full-Stack, Systems).")
    pdf.bullet("Designed candidate response parsing pipelines with structured rubric scoring across technical depth and clarity.")
    pdf.ln(0.6)

    pdf.entry_header(
        "Smart Eco-Hydration & E-Waste Soil Telemetry Monitor", 
        "Arduino Uno, C++, Sensors, HDD Upcycling", 
        "Award Winner: 3rd Position in University Innovation Challenge", 
        "CoE Robotics & Automation"
    )
    pdf.bullet("Engineered closed-loop automated plant irrigation system by upcycling electronic waste (repurposed computer HDD chassis).")
    pdf.bullet("Integrated HC-SR04 ultrasonic reservoir level telemetry with calibrated soil moisture conductivity detection.")
    pdf.bullet("Awarded 3rd Position by Dean Dr. Bhawna Mallick and Convener Dr. Puja Acharya at the annual Engineer's Day competition.")
    pdf.ln(0.6)

    pdf.entry_header(
        "Geo-CashWatch - Mule Network & ATM Cash-Out Interception", 
        "FastAPI, Kafka, Redis Geospatial, Docker", 
        "Smart India Hackathon (SIH 26184)", 
        "Ministry of Home Affairs (I4C)"
    )
    pdf.bullet("Architected real-time streaming pipeline processing synthetic ATM cash withdrawal event streams through Apache Kafka.")
    pdf.bullet("Implemented sub-second geospatial proximity clustering in Redis to flag coordinated mule withdrawals across urban ATM clusters.")
    pdf.bullet("Containerized multi-service backend with Docker Compose and Kubernetes deployment manifests.")
    pdf.ln(0.6)

    pdf.entry_header(
        "Smriti Saathi - Cognitive & Memory Companion", 
        "React Native, FastAPI, SQLite", 
        "Smart India Hackathon Project", 
        "Healthcare AI Track"
    )
    pdf.bullet("Engineered assistive mobile application supporting individuals with mild cognitive impairment and elderly relatives.")
    pdf.bullet("Built daily routine trackers, memory anchors, and automated family caregiver alerts backed by secure FastAPI endpoints.")

    # 5. Technical Skills
    pdf.section_heading("Technical Skills")
    avail_w = pdf.w - pdf.l_margin - pdf.r_margin

    skills_lines = [
        ("Languages & Core: ", "C (Pointers, Dynamic Memory, Structs), C++, Python, JavaScript (ES6+), SQL, Data Structures & Algorithms."),
        ("Systems & Embedded: ", "Arduino Uno, ESP32 Microcontrollers, Sensor Interfacing (Ultrasonic, Soil Moisture), Telemetry Auditing."),
        ("AI & Web Engineering: ", "FastAPI, React, RESTful APIs, Prompt Engineering & LLM Pipelines, HTML5, Semantic CSS."),
        ("DevOps & Infrastructure: ", "Git, GitHub, Linux Shell, Docker Containerization, Redis Geospatial, Apache Kafka.")
    ]

    for label, items in skills_lines:
        pdf.set_font("ArialUnicode", "B", 8.3)
        lbl_w = pdf.get_string_width(label)
        pdf.cell(lbl_w, 3.6, label, new_x=XPos.RIGHT, new_y=YPos.TOP)
        pdf.set_font("ArialUnicode", "", 8.3)
        pdf.cell(avail_w - lbl_w, 3.6, items, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # 6. Honors & Verified Certifications
    pdf.section_heading("Honors & Verified Certifications")
    pdf.bullet("Engineer's Day Innovation Challenge (Best Out of Waste, 15 Sep 2026), Center of Excellence in Robotics & Automation, IILM University & MoE IIC.", "3rd Position (Podium Finish):")
    pdf.bullet("IIT Kharagpur & Ministry of Education (SWAYAM) in Environmental Science (12-week course, 4 recommended university credits, Roll: NPTEL26HS120S955500225).", "NPTEL Elite Certification:")
    pdf.bullet("Certified in foundation models, LLM architectures, and prompt design (Completed July 2026, Credential ID: PLAN-BAEFCCAAD520).", "IBM SkillsBuild (Generative AI):")
    pdf.bullet("Data Security Council of India (DSCI) & MyGov (Cert ID: 8834963249).", "Cyber Security Awareness:")

    output_path = "Lakshay_Verma_Resume.pdf"
    pdf.output(output_path)
    print(f"Generated {output_path} successfully ({os.path.getsize(output_path)} bytes, Pages: {pdf.page_no()})")

    # Also save a copy inside assets/docs/
    os.makedirs(os.path.join("assets", "docs"), exist_ok=True)
    docs_path = os.path.join("assets", "docs", "Lakshay_Verma_Resume.pdf")
    pdf.output(docs_path)
    print(f"Saved copy to {docs_path} successfully ({os.path.getsize(docs_path)} bytes)")

if __name__ == "__main__":
    generate_resume()
