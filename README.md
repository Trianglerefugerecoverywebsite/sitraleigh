# Sit Raleigh — Website

Theravāda Meditation Community · Raleigh, NC  
Built with [Eleventy](https://www.11ty.dev/) + [Decap CMS](https://decapcms.org/) + [Netlify](https://netlify.com/)

---

## Local development

```bash
npm install
npm start
# → http://localhost:8080
```

---

## Deploying to Netlify (one-time setup)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/sitraleigh.git
git push -u origin main
```

### 2. Connect to Netlify
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
2. Choose your GitHub repo
3. Build settings are pre-configured in `netlify.toml` — just click **Deploy**

### 3. Enable Netlify Identity (gives Cary his admin login)
1. In your Netlify site dashboard → **Identity** tab → **Enable Identity**
2. Under **Registration** → set to **Invite only**
3. Under **Services → Git Gateway** → click **Enable Git Gateway**
4. Go to **Identity → Invite users** → enter Cary's email → Send invite
5. Cary clicks the email link, sets a password, and can now log in at `sitraleigh.com/admin`

### 4. Point your domain
In Netlify → **Domain settings** → add `sitraleigh.com` and follow the DNS instructions.

---

## How Cary updates the site

Cary visits `sitraleigh.com/admin`, logs in, and can edit:

| Section | What he can change |
|---|---|
| **This Week's Teaching** | Title, date, time, location, description, registration link |
| **Weekly Schedule** | Add/remove/edit regular sits |
| **Events & Retreats** | Create new events with dates, maps, registration links, photos |
| **Recorded Teachings** | Upload or link audio/video recordings |
| **About** | Bio, photo, pull quote, email |
| **Practice Locations** | Addresses, map embeds, parking notes |
| **Site Settings** | Tagline, announcement banner, Google Analytics ID |

Every save creates a commit in GitHub → Netlify auto-deploys → site updates in ~30 seconds.

---

## Project structure

```
sitraleigh/
├── src/
│   ├── _data/          ← JSON data files (edited via CMS)
│   │   ├── settings.json
│   │   ├── this_week.json
│   │   ├── schedule.json
│   │   ├── about.json
│   │   └── locations.json
│   ├── _layouts/       ← Page templates
│   │   ├── base.njk
│   │   ├── event.njk
│   │   └── teaching.njk
│   ├── admin/          ← Decap CMS
│   │   ├── index.html
│   │   └── config.yml  ← CMS field definitions
│   ├── css/main.css
│   ├── events/         ← One .md file per event
│   ├── teachings/      ← One .md file per teaching
│   ├── index.njk       ← Homepage
│   ├── schedule.njk
│   ├── teachings.njk
│   ├── events.njk
│   ├── about.njk
│   └── contact.njk
├── .eleventy.js
├── netlify.toml
└── package.json
```
