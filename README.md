# PLIV — Web Development Team | Piyush Projects 🚀

[![Live Website](https://img.shields.io/badge/Live_Hub-piyushprojects.pages.dev-6366f1?style=for-the-badge&logo=cloudflare)](https://piyushprojects.pages.dev)
[![GitHub Repository](https://img.shields.io/badge/GitHub-piyushprojects7%2Fpliv-10b981?style=for-the-badge&logo=github)](https://github.com/piyushprojects7/pliv)
[![License: MIT](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)](LICENSE)

A modern, high-performance showcase website for **PLIV**, the core web engineering and product development squad behind the **Piyush Projects** ecosystem ([piyushprojects.pages.dev](https://piyushprojects.pages.dev)).

---

## 🌟 Featured Innovations

### 1. 📱 Habit QR
> **"Physical-to-Digital Habit Tracking with Instant Frictionless Logging"**

- **Problem:** Habit tracking apps fail because manual app opening and logging creates high friction.
- **Solution:** Stick custom QR badges on your physical environment (water bottles, desk, gym bag, door). A quick camera scan logs streaks instantly with zero account login barriers.
- **Key Features:**
  - Dynamic printable vector SVG QR code generator with custom color palettes
  - Local-first IndexedDB streak analytics & heatmap scoring
  - Offline-first Progressive Web App (PWA) architecture

### 2. 🖨️ Piyush PrintOptimiser
> **"Smart Web & Document Layout Restructuring Engine"**

- **Problem:** Printing web pages results in cluttered ads, multi-page waste, and excessive toner consumption.
- **Solution:** A client-side DOM parsing engine that strips ads, banners, sidebars, and trackers, balances content into a compact 2-column or 3-column layout, and saves up to **60% of paper and ink**.
- **Key Features:**
  - Algorithmic DOM cleanup and orphan trailing line prevention
  - Ink-saver grayscale contrast tuning
  - Live interactive print preview with real-time paper savings calculation

### 3. 🌐 Piyush Projects Edge Hub
- The unified gateway linking all developer tools, micro-services, and web utilities at [piyushprojects.pages.dev](https://piyushprojects.pages.dev).

---

## ⚡ Tech Stack & Architecture

- **Frontend:** Semantic HTML5, Modern CSS3 with Design Tokens, Vanilla JavaScript (ES6+ Modules)
- **Styling:** Custom Glassmorphism System + Tailwind CSS CDN Engine
- **Icons:** Lucide Icons
- **Interactive Playground:** Procedural SVG QR Matrix Generator + Real-time DOM Text Optimiser Simulator
- **Canvas:** Dynamic Interactive Constellation & Node Physics System
- **Hosting:** GitHub Pages & Cloudflare Pages Edge Network

---

## 🚀 How to Publish & Make It Live on GitHub

Your repository is already pre-configured to push to `https://github.com/piyushprojects7/pliv.git`! Follow these simple steps:

### Step 1: Commit Your Code Locally
Open your terminal in this directory (`d:\code`) and run:
```bash
git add .
git commit -m "feat: launch modern PLIV portfolio showcasing Habit QR and Piyush PrintOptimiser"
```

### Step 2: Push to GitHub (Make it Public)
```bash
git branch -M main
git push -u origin main
```
> *Note:* If GitHub prompts you for authentication, sign in with your GitHub account credentials or use a **GitHub Personal Access Token (Classic)** with `repo` permissions.

### Step 3: Enable GitHub Pages (Zero Config)
1. Go to your GitHub repository: **[https://github.com/piyushprojects7/pliv](https://github.com/piyushprojects7/pliv)**
2. Click on **Settings** (top right tab of your repository).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source:** Choose **Deploy from a branch** (or select **GitHub Actions** since `.github/workflows/deploy.yml` is included).
   - If using "Deploy from a branch", set:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**.
5. Wait 60–90 seconds. Refresh the page, and GitHub will provide your live URL:
   ```
   https://piyushprojects7.github.io/pliv/
   ```

---

## 🔗 Optional: Connect to Your Cloudflare Domain (`piyushprojects.pages.dev`)
To serve this directly via Cloudflare Pages or connect custom domains:
1. Log into your Cloudflare Dashboard.
2. Go to **Workers & Pages** -> **Create Application** -> **Pages**.
3. Select **Connect to Git** and choose the `piyushprojects7/pliv` repository.
4. Set build command to empty (static HTML) and output directory to `/`.
5. Deploy!

---

## 👨‍💻 Developed by
**PLIV Engineering Squad** for **Piyush Projects**  
Official Hub: [piyushprojects.pages.dev](https://piyushprojects.pages.dev)  
GitHub: [@piyushprojects7](https://github.com/piyushprojects7)
