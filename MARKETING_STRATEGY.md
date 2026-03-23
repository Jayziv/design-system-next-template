# Faeble Studio — Marketing Strategy & Automation Plan

> Zero-budget customer acquisition playbook for a new Leeds-based web studio.

---

## Situation

- New studio, zero clients, zero revenue
- Founder has 7+ years industry experience (credibility asset)
- UK-only market, Leeds-based
- No budget for paid tools — everything must start on free tiers
- Goal: automate as much outreach and lead generation as possible

---

## Phase 1: Foundations (Week 1–2)

### SEO Setup (done in code)
- [x] Open Graph + Twitter Card meta tags
- [x] JSON-LD structured data (LocalBusiness schema)
- [x] sitemap.xml auto-generation
- [x] robots.txt
- [x] Canonical URLs
- [ ] Google Search Console — verify site ownership at https://search.google.com/search-console
- [ ] Bing Webmaster Tools — submit at https://www.bing.com/webmasters
- [ ] Google Business Profile — create at https://business.google.com (CRITICAL for local searches like "web designer Leeds")

### Analytics
- [ ] Vercel Analytics — enable in Vercel dashboard (free on hobby plan)
- [ ] Google Analytics 4 — create property and add tracking snippet

### Social Profiles to Create
- [ ] **LinkedIn** company page: linkedin.com/company/faeblestudio
  - Also optimise personal profile with "Founder at Faeble Studio" headline
  - This is the #1 channel for B2B services — prioritise it
- [ ] **GitHub** organisation: github.com/faeblestudio
  - Showcase the design system, open source work
  - Pin best repositories
- [ ] **X/Twitter**: x.com/faeblestudio
  - Dev community visibility, share builds and tips
- [ ] **Instagram** (optional): for visual portfolio once you have client work

### Email Infrastructure
- [ ] Sign up for **Brevo** (brevo.com) — free tier: 300 emails/day + automation
- [ ] Create email template for outreach (see Phase 3)
- [ ] Create a simple lead magnet PDF: "Free Website Performance Audit Checklist"
  - Use Canva free tier to design it
  - Gate it behind an email capture on your site (stretch goal)

---

## Phase 2: Content Engine (Week 3–6)

### Blog Strategy
Add a blog to the site (Next.js MDX). Each post targets a specific search query that potential clients Google.

**Priority articles (write these first):**

1. **"How much does a website cost in the UK in 2026?"**
   - Target: business owners researching costs
   - Include your pricing, compare agencies vs freelancers vs DIY
   - Long-tail SEO goldmine

2. **"Next.js vs WordPress: which is right for your business?"**
   - Target: people comparing options before hiring
   - Position yourself as the modern alternative to WordPress agencies

3. **"Why your website is slow (and how to fix it)"**
   - Target: business owners with existing slow sites
   - Include free tools they can use (Lighthouse, PageSpeed Insights)
   - Natural lead-in to your redesign service

4. **"Web accessibility: what UK businesses need to know"**
   - Target: businesses worried about compliance
   - Reference UK Equality Act 2010 and upcoming regulations
   - Position accessibility as a standard, not an add-on

5. **"5 signs your website is losing you customers"**
   - Target: business owners not sure if their site is a problem
   - Each sign = a service you offer as the solution

**Publishing cadence:** 2 articles per month minimum. Quality > quantity.

### Social Content Automation

**Tool:** Buffer (free: 3 channels, 10 scheduled posts per channel)

**Content repurposing workflow:**
1. Write one blog post
2. Extract 3–5 key takeaways as LinkedIn posts
3. Create 1 LinkedIn article (longer form)
4. Create 2–3 X/Twitter posts
5. Schedule all in Buffer for the week

**LinkedIn posting strategy (most important channel):**
- Monday: Share a blog post or article
- Wednesday: Quick tip or insight from your work
- Friday: Behind-the-scenes build update or tech opinion
- Post between 7–9am UK time for maximum reach

**Content types that perform on LinkedIn for dev studios:**
- Before/after website screenshots (once you have client work)
- Lighthouse score improvements
- Code snippets with context ("here's how we made this 3x faster")
- Opinions on web dev trends
- "Things I learned building X" posts

---

## Phase 3: Outreach Automation (Week 7+)

### LinkedIn Outreach (Highest ROI)

**Target personas:**
- Small business owners in Leeds / West Yorkshire
- Startup founders looking for a tech partner
- Marketing managers at SMBs who control the web budget

**Connection strategy:**
1. Search LinkedIn for target personas (use Sales Navigator free trial if needed)
2. Send personalised connection request (no pitch in the request)
3. Once connected, engage with their content for a few days
4. Then send a value-first message:

**Template (customise every time):**
```
Hi [Name],

I noticed [specific thing about their business/site]. Really like what you're doing with [genuine compliment].

I run a web studio in Leeds and was curious — are you happy with how your website performs on mobile? I do free 10-minute audits if you ever want a second opinion.

No pressure at all — just thought it might be useful.

Jay
```

**Volume:** 10–15 new connections per day (manual to stay within LinkedIn limits)

### Cold Email Outreach

**Finding prospects:**
1. Google Maps: search for businesses in Leeds / nearby cities
2. Visit their websites — run quick Lighthouse audit
3. If their site scores poorly or looks outdated, they're a prospect
4. Use Hunter.io (free: 25 searches/month) to find email addresses
5. Log prospects in HubSpot CRM (free)

**Email automation with Brevo:**

Create a 3-email sequence (sent automatically):

**Email 1 (Day 0) — The observation:**
```
Subject: Quick thought about [Business Name]'s website

Hi [Name],

I came across [Business Name] while researching [industry] businesses in Leeds. I ran a quick performance check on your website and noticed a few things that might be costing you visitors:

- [Specific issue, e.g., "Your mobile load time is over 6 seconds — Google recommends under 2.5"]
- [Specific issue, e.g., "Your site isn't showing up in local search results for '[keyword]'"]

Not trying to sell you anything — just thought it might be useful to know.

If you're curious, I'm happy to do a free 15-minute audit call and walk you through what I found.

Jay
Faeble Studio — faeblestudio.com
```

**Email 2 (Day 3) — The follow-up:**
```
Subject: Re: Quick thought about [Business Name]'s website

Hi [Name],

Just following up on my note about your website. Here's a quick tip you can implement today, no cost:

[One actionable tip, e.g., "Compress your hero image — it's currently 2.4MB. Running it through tinypng.com could cut your load time in half."]

Let me know if you'd like that full audit — genuinely happy to help.

Jay
```

**Email 3 (Day 8) — The last touch:**
```
Subject: Last one from me

Hi [Name],

Didn't want to keep filling your inbox, so this is my last note.

If your website ever needs attention — whether that's a redesign, better SEO, or just a fresh pair of eyes — feel free to reach out. I work with businesses across Leeds and keep things straightforward.

Here's my calendar if you ever want a chat: [Cal.com link]

All the best,
Jay
```

**Volume:** 10–20 personalised emails per week. Quality matters more than quantity. Never send generic blasts — every email should reference their specific website.

### Freelance Platforms (Bridge Income)

While building the outreach pipeline, get on freelance platforms for immediate opportunities:

- **Upwork** — create a strong profile, bid on UK web dev projects
  - Optimise headline: "React & Next.js Developer | Web Design Studio | Leeds, UK"
  - Start with competitive rates to build reviews, increase once rated
- **PeoplePerHour** — UK-focused, good for local clients
- **Fiverr** — create packages (e.g., "I will build a professional Next.js website")
- **Bark** — leads come to you based on local searches

### Local Directories (Free Listings)

Submit your business to all of these (helps local SEO):
- [ ] Google Business Profile (most important)
- [ ] Yell.com
- [ ] FreeIndex
- [ ] Bark.com
- [ ] Clutch.co
- [ ] DesignRush
- [ ] Bing Places
- [ ] Apple Maps (via Apple Business Connect)
- [ ] Thomson Local

---

## Phase 4: Scale (Month 3+) — Reinvest First Revenue

Once you land 2–3 paying clients:

### Real Social Proof
- Ask every client for a testimonial (add to website)
- Create real case studies with before/after metrics
- Share results on LinkedIn and X

### Paid Advertising
- **Google Ads** for local keywords: "web designer Leeds", "website design Leeds"
  - Start at £5–10/day, target Leeds + 30 mile radius
  - Use exact match keywords to control spend
- **LinkedIn Ads** (later): expensive but very targeted for B2B

### Referral Programme
- Offer 10% commission (or £100–200 flat fee) for client referrals
- Ask happy clients directly: "Do you know anyone who could use a new website?"
- Create a simple referral page on your site

### Email List
- Grow newsletter subscribers through blog content
- Monthly email: 1 tip + 1 blog post + 1 CTA
- Use Brevo automation for welcome sequences

---

## Free Tool Stack

| Need | Tool | Free Tier Details |
|------|------|-------------------|
| CRM | HubSpot CRM | Unlimited contacts, deal tracking, forever free |
| Email marketing | Brevo | 300 emails/day, automation workflows, landing pages |
| Social scheduling | Buffer | 3 channels, 10 scheduled posts each |
| Email finding | Hunter.io | 25 searches/month, 50 verifications/month |
| Call booking | Cal.com | Free for individuals, unlimited bookings |
| Analytics | Vercel Analytics + GA4 | Both free |
| SEO monitoring | Google Search Console | Free, essential |
| Content drafting | Claude | You already have access |
| Graphic design | Canva | Free tier covers most needs |
| Image compression | TinyPNG | Free for web use |
| Lighthouse audits | PageSpeed Insights | Free, use for prospect research |
| Project management | Notion | Free for personal use |

---

## Weekly Routine (Once Pipeline is Running)

| Day | Activity | Time |
|-----|----------|------|
| Monday | Write/schedule social posts for the week (Buffer) | 1 hour |
| Tuesday | Research 10 prospects, run Lighthouse audits | 1 hour |
| Wednesday | Send personalised outreach emails | 1 hour |
| Thursday | LinkedIn connection requests + engagement | 30 min |
| Friday | Write/edit blog content | 2 hours |
| Ongoing | Respond to enquiries within 24 hours | As needed |

**Total marketing time: ~5.5 hours/week**

---

## Key Metrics to Track

| Metric | Tool | Target (Month 1–3) |
|--------|------|---------------------|
| Website visitors | GA4 / Vercel Analytics | 100+/month |
| Google Search impressions | Search Console | 500+/month |
| LinkedIn connections | LinkedIn | 200+ relevant |
| Outreach emails sent | Brevo | 40–80/month |
| Discovery calls booked | Cal.com | 4+/month |
| Proposals sent | HubSpot CRM | 2+/month |
| Clients won | HubSpot CRM | 1/month |

---

## Important Notes

- **Never lie about experience.** The site now honestly positions you as a new studio with real industry experience. This is your strength — clients get senior-level work at competitive prices without agency markup.
- **Personalise everything.** Generic outreach gets ignored. Every email and message should reference the prospect's specific business and website.
- **Track everything in CRM.** Even if it feels like overkill with 0 clients, the habit matters. HubSpot free CRM is perfect for this.
- **Ask for referrals early.** Even before you have paying clients — ask former colleagues, friends, family if they know anyone who needs a website.
- **Price confidently.** Don't race to the bottom. Your 7+ years of experience and modern tech stack justify premium-but-fair pricing.
