# Laksh — Minimalist Engineering Portfolio

A plain, minimal, aesthetic off-white portfolio designed specifically for a 2nd-year Computer Science & Engineering undergraduate. Built with modern semantic HTML5, vanilla CSS3, and vanilla JavaScript—zero external frameworks, lightning fast, and effortless to host.

## ✨ Key Features

1. **Aesthetic Warm Off-White Design**:
   - Editorial typography using *Plus Jakarta Sans* and *JetBrains Mono*
   - Subtle hairline borders and soft elevation
   - Distraction-free, high-readability layout
2. **Interactive Project Showcase**:
   - Category filtering: *Flagship AI (MockMaster)*, *Smart India Hackathon*, *Internship & IoT Lab*, *Personal*, *Early & Foundations*
   - Deep-dive case study modal detailing project architecture, code highlights, and lessons learned
   - Real working prototype photo viewer for the **Smart Eco-Hydration & E-Waste Soil Monitor** (3rd Place Award Winner)
3. **Interactive Skills Matrix**:
   - Segmented by *Core Systems & Embedded*, *AI, Full-Stack & Vibe Prototyping*, and *Verified Credentials & Discipline*
   - Highlight badges showcasing foundational strengths
4. **Verified Credentials & Document Viewer Modal**:
   - Dual support for high-res images and embedded PDFs with quick-switcher tabs
   - Includes **Engineer's Day Certificate of Achievement (3rd Place)**, **Semester 1 & 2 Official Transcripts (SGPA 9.32)**, **Ramakirti Foundation Internship Certificate**, **NPTEL Elite (IIT Kharagpur)**, **IBM SkillsBuild Generative AI**, **DSCI Cybersecurity**, and **CBSE 10th & 12th (92.4%)** Marksheets
5. **Printable / ATS-Friendly Resume Viewer**:
   - Harvard/MIT-style clean resume modal
   - One-click **"Print / Save as PDF"** with print-optimized stylesheets
6. **Working Contact Section**:
   - Client-validated form with instant confirmation feedback
   - One-click **"Copy Email"** with animated toast notifications

---

## 🛠️ How to Customize Your Information

All content (name, college, CGPA, email, projects, timeline, skills) is stored in a single easy-to-edit file: **`data.js`**.

Open [`data.js`](file:///C:/Users/laksh/.gemini/antigravity-ide/scratch/minimal-portfolio/data.js) and update:
- `PORTFOLIO_DATA.profile`: Your full name, college name, CGPA, email, and social links.
- `PORTFOLIO_DATA.skills`: Add or update your skills and notes.
- `PORTFOLIO_DATA.projects`: Add your real GitHub links and project descriptions.
- `PORTFOLIO_DATA.timeline`: Add your school / college milestones.

---

## 🚀 How to Run Locally

You can preview the portfolio using any local web server:

### Option A: Using Python (Installed by default on most systems)
```bash
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Using Node.js
```bash
npx serve .
```

---

## 🌐 How to Deploy for Free (GitHub Pages)

1. Create a new repository on GitHub named `portfolio` (or `<your-username>.github.io`).
2. Push all files from this directory to the repository.
3. In GitHub, go to **Settings > Pages > Branch**, select `main` (root) and click **Save**.
4. Your website will be live in 60 seconds at `https://<your-username>.github.io`!
