# 🦷 Samarpan Dental Clinic — Website

**Multispeciality Dental Hospital | Dahod, Gujarat, India**

---

## 📁 Project Structure

```
samarpan-dental/
│
├── index.html                   ← HOMEPAGE (all main sections)
│
├── css/
│   ├── variables.css            ← 🎨 ALL brand colors, fonts, spacing tokens (edit here first)
│   ├── base.css                 ← Reset + typography scale + utility classes
│   ├── components.css           ← Buttons, cards, forms, accordion, badges, WhatsApp btn
│   └── layout.css               ← Header, footer, hero, grid layouts, all sections
│
├── js/
│   └── main.js                  ← Navigation, scroll animations, FAQ accordion, form validation, counters
│
├── images/
│   ├── favicon.svg              ← (add your favicon here)
│   ├── logo.svg                 ← (add your logo here)
│   ├── og-image.jpg             ← (social share image, 1200x630px)
│   └── clinic/                  ← (clinic photos go here)
│
└── pages/
    ├── about.html               ← About page (create using same structure)
    ├── services.html            ← All services listing
    ├── doctors.html             ← Doctor profiles
    ├── blog.html                ← Blog/Resources listing
    ├── privacy-policy.html      ← Privacy policy
    ├── terms.html               ← Terms of use
    ├── sitemap.html             ← HTML sitemap
    │
    └── services/
        ├── dental-implants.html     ← ✅ COMPLETE (use as template for others)
        ├── root-canal.html          ← (duplicate implants page, update content)
        ├── braces-orthodontics.html ← (duplicate implants page, update content)
        ├── teeth-whitening.html     ← (duplicate implants page, update content)
        ├── pediatric-dentistry.html ← (duplicate implants page, update content)
        └── cosmetic-dentistry.html  ← (duplicate implants page, update content)
```

---

## 🚀 Quick Start

1. **Open `index.html`** in any browser — no server needed for basic viewing
2. For development with live reload, use VS Code + Live Server extension
3. For production, upload all files to your web hosting maintaining the same folder structure

---

## 🎨 How to Customize

### Change Brand Colors
Edit **`css/variables.css`** — all colors are in one place:
```css
--color-primary: #0A7E8C;   /* Main teal — change here only */
--color-accent: #F05A28;    /* CTA orange */
```

### Change Fonts
Edit the Google Fonts import in **`css/base.css`** and the variables in **`css/variables.css`**:
```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body: 'DM Sans', sans-serif;
```

### Update Phone Number
Find and replace `+91XXXXXXXXXX` and `XX-XXXX-XXXX` across all files.
Use Find & Replace (Ctrl+H in VS Code) with the pattern: `XXXXXXXXXX`

### Update WhatsApp Number
Find and replace `91XXXXXXXXXX` in all `wa.me` links.

### Update Address
Replace `[Street Address]` in `index.html` footer and contact section.

### Update Pricing
Replace `₹[X]` and `₹[X,XXX]` placeholders with actual pricing.

---

## 📍 Google Maps
The Google Maps embed is already configured with the correct coordinates for Samarpan Dental Clinic:
- **Coordinates:** 22.8349089, 74.2569887
- **Map Embed:** Pre-set in `index.html` map section
- **Directions Link:** Points to the correct Google Maps listing

---

## 📄 Creating New Service Pages
Use `pages/services/dental-implants.html` as the template:
1. Copy the file
2. Update `<title>`, `<meta name="description">`, `<link rel="canonical">`
3. Update the `service-hero` section (title, subtitle, keywords)
4. Update the main article content
5. Update the sidebar pricing and "Ideal For" section
6. Update internal links in "Other Services" sidebar

---

## 🔧 Backend / Form Integration

The booking form in `index.html` currently simulates submission.
To connect to a real backend, replace the simulation in `js/main.js`:

```javascript
// Find this section in js/main.js:
// "Simulate form submission"
// Replace with:

const response = await fetch('YOUR_BACKEND_URL/submit-appointment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
});
```

**Recommended free options:**
- **Formspree.io** — drop-in form backend, free tier available
- **EmailJS** — sends email directly from frontend, no backend needed
- **Netlify Forms** — if hosting on Netlify, just add `data-netlify="true"` to form

---

## 📱 WhatsApp Business Integration
Replace all `wa.me/91XXXXXXXXXX` links with your actual WhatsApp Business number.

**WhatsApp link format:**
```
https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment
```
Where `919876543210` = country code (91) + 10-digit mobile number.

---

## 🔍 SEO Checklist

### Before Launch:
- [ ] Update `<title>` tags on all pages (max 60 characters)
- [ ] Update `<meta name="description">` on all pages (max 155 characters)
- [ ] Set correct `<link rel="canonical">` on every page
- [ ] Replace all placeholder phone/address/WhatsApp data
- [ ] Add actual clinic photos (replace emoji placeholders)
- [ ] Update `og:image` with real 1200×630px social image
- [ ] Set correct domain in all canonical URLs

### Google Setup:
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Verify ownership in Google Search Console
- [ ] Claim/update Google Business Profile
- [ ] Enable structured data testing via Google Rich Results Test

### Create `sitemap.xml` at root:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.samarpandental.in/</loc><priority>1.0</priority></url>
  <url><loc>https://www.samarpandental.in/pages/services/dental-implants.html</loc><priority>0.9</priority></url>
  <!-- Add all pages -->
</urlset>
```

---

## 🌐 Recommended Hosting

| Option | Cost | Notes |
|--------|------|-------|
| **Hostinger** | ~₹99/month | Best value for India, good speed |
| **Netlify** | Free | Excellent for static sites, auto-deploy from GitHub |
| **Vercel** | Free | Very fast CDN, GitHub integration |
| **GoDaddy India** | ~₹150/month | Local support available |

**Recommended domain:** `samarpandental.in` or `samarpandentalclinic.com`

---

## 📞 Key Things to Replace Before Launch

| Placeholder | Replace With |
|------------|--------------|
| `+91XXXXXXXXXX` | Actual phone with country code |
| `91XXXXXXXXXX` | WhatsApp number (no spaces/+) |
| `XX-XXXX-XXXX` | Formatted phone display |
| `[Street Address]` | Full clinic address |
| `[X]` in pricing | Actual starting price |
| `info@samarpandental.in` | Real clinic email |
| `www.samarpandental.in` | Real domain |
| Emoji placeholders (🏥, 🦷) | Real clinic photos |

---

## 🛠️ Technology Stack
- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox (no framework dependency)
- **Vanilla JavaScript** — no jQuery, no dependencies, fast load
- **Google Fonts** — Playfair Display + DM Sans
- **Google Maps Embed** — pre-configured with clinic coordinates

---

*Developed for Samarpan Dental Clinic, Dahod, Gujarat, India.*
