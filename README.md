# AssignInc Website
### Premium Corporate Website — AI & Digital Transformation
> Government Incubated · iStart Rajasthan · Bhamashah Techno Hub

---

## 🚀 Quick Start (Beginner Guide)

### Step 1 — Install Node.js
Download and install from: https://nodejs.org/
Choose the **LTS version**. After installing, verify:
```
node --version
npm --version
```

### Step 2 — Open VS Code
1. Open VS Code
2. File → Open Folder → select the `assigninc` folder

### Step 3 — Open Terminal in VS Code
Terminal → New Terminal (or Ctrl + `)

### Step 4 — Install Dependencies
```bash
npm install
```
This installs all packages (framer-motion, gsap, react-icons, etc.). Wait for it to complete.

### Step 5 — Start the Dev Server
```bash
npm start
```
Your browser will open automatically at **http://localhost:3000**

---

## 📦 Tech Stack
| Library | Version | Purpose |
|---------|---------|---------|
| React | 18 | Frontend framework |
| Framer Motion | 11 | Animations & transitions |
| GSAP | 3.12 | Advanced scroll animations |
| React Icons | 5 | Icon library |
| Swiper | 11 | Sliders (installed, ready to use) |

---

## 📁 Project Structure
```
assigninc/
├── public/
│   └── index.html            ← Google Fonts loaded here
├── src/
│   ├── styles/
│   │   └── global.css        ← CSS variables, colors, utilities
│   ├── components/
│   │   ├── Navbar/           ← Sticky navbar with blur effect
│   │   ├── Hero/             ← Cinematic slide hero
│   │   ├── Services/         ← 3D circular carousel
│   │   ├── Domains/          ← Interactive flowchart
│   │   ├── GrowthJourney/    ← Waterfall timeline
│   │   ├── Events/           ← Animated image gallery
│   │   ├── About/            ← Company info + stats
│   │   ├── Contact/          ← Contact form
│   │   ├── Footer/           ← Full footer
│   │   └── UI/
│   │       └── WhatsAppFloat ← Floating WhatsApp button
│   ├── App.js                ← Main app
│   └── index.js              ← Entry point
└── package.json
```

---

## 🎨 Color Palette (from uploaded image)
```css
--primary:       #6A9BD4   /* Mid steel blue */
--primary-deep:  #4F82BE   /* Deeper blue */
--primary-muted: #8AAFC8   /* Muted blue */
--primary-pale:  #A9C2D3   /* Pale blue-grey */
--primary-ice:   #C4D6E1   /* Ice blue */
--accent:        #021B45   /* Dark navy (background) */
```

---

## 📸 How to Add Your Images

### Growth Journey Images
Open `src/components/GrowthJourney/GrowthJourney.js`

Add your images at the top:
```javascript
import vguImg    from '../../assets/images/vgu-launch.jpg';
import imcImg    from '../../assets/images/imc-ambani.jpg';
import modiImg   from '../../assets/images/modi-doitc.jpg';
import govt2025  from '../../assets/images/govt-2025.jpg';
import shrutiImg from '../../assets/images/shruti-haasan.jpg';
```

Replace the `<div className={styles.imagePlaceholder}>` block in each milestone with:
```jsx
<img src={vguImg} alt={m.imageAlt} className={styles.milestoneImg} />
```

Add this CSS to `GrowthJourney.module.css`:
```css
.milestoneImg {
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  aspect-ratio: 16/9;
  display: block;
}
```

### Events/Work Samples Images
Open `src/components/Events/Events.js`

Import your images at the top and replace the `cellBg` div's gradient background with your actual images using inline styles or an `<img>` tag.

Place all images in: `src/assets/images/`

---

## 📞 Update Contact Info
In `src/components/Contact/Contact.js`:
- Replace `hello@assigninc.in` with your real email
- Replace `+91 6378549221` with real phone

In `src/components/UI/WhatsAppFloat.js`:
- Replace `916378549221` with your actual WhatsApp number (with country code, no +)

---

## 🏗️ Build for Production
```bash
npm run build
```
Creates a `build/` folder ready to upload to any hosting (Vercel, Netlify, cPanel, etc.).

### Deploy to Vercel (Recommended — Free)
1. Push code to GitHub
2. Go to vercel.com → Import your repo
3. Done! Vercel auto-detects React.

---

## 🔮 Future Sections (Placeholders Ready)
These sections can be added next:
- **Case Studies** — detailed project walkthroughs
- **Testimonials** — client reviews with Swiper slider
- **Team** — team member cards
- **Blog** — articles / thought leadership
- **Portfolio** — campaign results with metrics

---

## ⚙️ Customization Cheatsheet

| What to change | Where |
|----------------|-------|
| Brand colors | `src/styles/global.css` — `:root` variables |
| Company name/tagline | `src/components/Hero/Hero.js` |
| Services list | `src/components/Services/Services.js` — `SERVICES` array |
| Domain list | `src/components/Domains/Domains.js` — `DOMAINS` array |
| Timeline milestones | `src/components/GrowthJourney/GrowthJourney.js` — `MILESTONES` array |
| Event gallery | `src/components/Events/Events.js` — `EVENTS` array |
| WhatsApp number | `src/components/UI/WhatsAppFloat.js` |
| Social media links | `src/components/Footer/Footer.js` |
| SEO meta tags | `public/index.html` |

---

## 🐛 Troubleshooting

**`npm install` fails?**
→ Delete `node_modules/` and `package-lock.json`, then run `npm install` again.

**Port 3000 already in use?**
→ Run `npm start` and press `Y` to use a different port, or kill the process using port 3000.

**Fonts not loading?**
→ Make sure you have internet connection when running locally (Google Fonts are loaded from CDN).

---

Built with ❤️ for AssignInc — iStart Rajasthan
