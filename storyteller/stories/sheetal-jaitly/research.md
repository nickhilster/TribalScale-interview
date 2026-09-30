# Sheetal Jaitly: research log

## Brief and assumptions (made without asking the user)

- **Subject**: Sheetal Jaitly, founder and CEO of TribalScale (the person, not the company; TribalScale is a node-rich context, not the subject). Kind: person (living, public business figure).
- **Angle**: a sales-trained operator builds a software consultancy, watches it boom and nearly fail, rebuilds it, and now argues that enterprises should redesign themselves around AI rather than bolt AI on. The map lets a reader see his own rebuild sitting next to his advice to others (that link is editorial, drawn dashed).
- **Audience**: general reader / professional network. Independent study; the user (Nikhil Khedkar) is not the subject and is not affiliated with him. Credit: "An independent StoryTellr study by Nikhil Khedkar."
- **Boundaries**: professional, publicly published information only, 1990s to Sept 2026, English sources. Size requested: roughly 25-40 nodes.
- **Privacy decisions**: The Swagger Magazine interview and two podcast blurbs contain personal material (family background and finances, a period of ill health, loved ones, home life). **None of it is used.** Also left out: his personal debts/credit-card detail in the BetaKit piece (the story uses only company-level insolvency facts), social-media profiles, contact details, and the photo. No inference about any sensitive attribute.
- **Brand decision**: see theme.json `brandSources`. He has no personal site; his profile lives inside tribalscale.com.
- All sources accessed **2026-09-30**. Plain `curl` returned full raw HTML for tribalscale.com, swaggermagazine.com, betakit.com, theglobeandmail.com, listennotes, apple podcasts, substack, marketscale, and text was extracted with tags stripped. **medium.com and businesswire.com** needed a real browser (Playwright) and were read as rendered page text. The WebFetch tool returned only a summary of the profile page, so nothing was quoted from that digest; the profile page was re-read raw.

## Sources read

### tsfocus: Sheetal Jaitly (In Focus) · tier 1 (company's own profile of him)
- https://www.tribalscale.com/in-focus/sheetal-jaitly · TribalScale · 2026-09-30
- "Founder and Chief Executive Officer @ TribalScale" (copied)
- "Besides being an avid investor and supporter of digital technology companies, Sheetal is a board member of Feed Ontario, a member of Tech4SickKids Council, DMZ, and a TechStars Mentor." (copied; self-description, undated)
- Lists six articles by him, including the three cited below and the two FinScale pieces. Site footer: "Toronto - New York - Miami".

### dontadd: "Don't Add AI. Redesign the Company." · tier 1 (his byline)
- https://www.tribalscale.com/insights/dont-add-ai-redesign-the-company · TribalScale · 2026-09-30 · raw text, undated on page
- "Most companies are adding 2026 AI to 2016 workflows." (copied)
- Seven redesigns named: workflow, job, team, product, technology stack, governance, how you measure work.
- "Governance therefore has to move into the architecture." (copied)
- "Don't put AI into the company you have. Build the company AI makes possible." (copied)

### ainative: "The AI-Native Enterprise: 12 Things You Must Do to Transform Your Company" · tier 1
- https://www.tribalscale.com/insights/ai-native-enterprise-12-things · TribalScale · 2026-09-30 · raw text, undated
- 12 items, incl. 4 "Move From Copilots to Agents", 6 "Become Model-Agnostic", 9 "Make Evaluation a Core Engineering Discipline", 10 "Redesign Governance for Agents", 11 "Change How You Measure People", 12 "Become Your Own Best AI Case Study".
- "Copilots help people perform tasks." / "Agents perform work." (copied)
- "Companies should begin measuring leverage—not activity." (copied)
- "Use AI internally." / "Aggressively." (copied, two lines)
- "It's an operating-model transformation enabled by technology." (copied)
- Page navigation: previous article is "Don't Add AI...", next is "Stop Buying AI Seats...".

### seats: "Stop Buying AI Seats. Start Rebuilding How Work Gets Done" · tier 1
- https://www.tribalscale.com/insights/stop-buying-ai-seats · TribalScale · 2026-09-30 · raw, undated
- "Buying everyone an AI seat is not AI transformation." (copied)
- "This is why I am increasingly bullish on building custom software again." (copied)
- Argues cost/barrier to build custom software is falling; gives a buy-vs-build table. Also: "Do not make AI another task." (copied)

### deploygap: "The Deployment Gap, Now in the Agentic Era" · tier 1 (only the intro is public)
- https://www.tribalscale.com/insights/the-deployment-gap-now-in-the-agentic-era · 2026-09-30 · raw, partial (rest is gated behind a FinScale download)
- Says it was "originally published in the third issue of FinScale Magazine" (copied, the page's own wording).
- Cites "A VentureBeat infrastructure analysis published in April 2026" naming three failure modes: context decay, orchestration drift, silent partial failures (I did not read the VentureBeat piece).
- "is the service behaving correctly?" (copied)

### insgap: "The Insurance AI Gap, Now an Agent-Era Catch-Up Race" · tier 1 (intro only)
- https://www.tribalscale.com/insights/the-insurance-ai-gap-now-an-agent-era-catch-up-race · 2026-09-30 · raw, partial
- Opens with an unnamed "Chief Underwriting Officer of a top-ten North American P&C carrier" quoted as saying "We have ninety-three AI initiatives across the company. Maybe six are in production." (copied; anonymous, unverifiable)
- Cites "McKinsey's 2024 Global Insurance AI Survey, fewer than 10 percent of P&C and life insurers have deployed AI at scale" (copied; third-party statistic quoted by him, not checked by me)

### swagger: "SWAGGERMAGAZINE: SELFMADE - Sheetal Jaitly" · tier 2 (magazine profile, told largely in his own words)
- https://www.swaggermagazine.com/home/selfmade/SheetalJaitly/ · Swagger Publications · 2026-09-30 · raw. **Undated**: site footer says "copyright © 2023"; internal clues (mentions OPM enrolment, "these last five years") suggest 2020-2021 but I could not confirm. Authored by a contributor; quotes are the magazine's rendering of Jaitly.
- "Sheetal Jaitly gives his employees stickers that say “Fail Fast”." (copied)
- Career: started in shipping and receiving at Keating Technologies ("I saw what rapid growth from 30 to 300 people looked like."); then Ricoh as copy machine salesman; "A customer poached him, forcing Jaitly to learn how to sell predictive analytics and data sciences"; "director-level employee at only 27 years old"; then "joined his friends at the newly launched Xtreme Labs, and helped grow the business to $37.5m in revenue in five years." Xtreme Labs "acquired by Pivotal, and then by Dell"; he "struggled to find his place".
- "Jaitly started TribalScale in November of 2015". First big client (unnamed "one of the world's largest media companies", a former client from Pivotal) "handed Jaitly a $1.2m contract" after saying "you rejected the opportunity for a huge commission just to do what was right by me."
- "In three years, TribalScale earned just over $50m in revenue, grew the staff to 250+, and had seven offices around the world. Then, they imploded." (copied). "Jaitly said that TribalScale grew too big, too fast."
- "The first months of 2020 saw TribalScale lose 80 percent of their customers." He "reinvested in his clients at no charge." (article's wording of what he said; company-reported)
- Values: "Sheetal Jaitly has removed ‘transparency’ as one of the three core values"; his reason: "The term was used to attack people."; "Transparency was replaced with resiliency"; remaining values "empowerment, and challenge and collaborate".
- "I have to be friendly – not friends – with my employees." (rotten-strawberry theory)
- "Jaitly is currently enrolled in the OPM Program at Harvard Business School".
- **Not used (personal)**: family background, childhood, parents' finances, a period of depression, loved ones, home life.

### medium20: "TribalScale 2.0: Restructuring & Resilience" · tier 1 (his own essay, company blog)
- https://medium.com/tribalscale/tribalscale-2-0-restructuring-resilience-66b957484e87 · TribalScale Inc. on Medium · dated Feb 25, 2021 · browser-rendered raw text
- "By Sheetal Jaitly, CEO, TribalScale"
- "I first started TS because I saw there was a big gap in the market." (copied)
- TakeOver: "We did our first TakeOver in 2017 with over 800 attendees." 2018: "we sold out and had 1,700 people attend"; "Canadian Prime Minister Justin Trudeau open the conference"; "We raised money for SickKids".
- "We had a large client restructure their company and exit our engagement and we struggled to maintain our large staff capacity." (copied)
- "This involved us having to work under CCAA creditor protection in the midst of the pandemic"; "We were brought into CCAA because of our disagreement with our landlord".
- Office at 200 Wellington closed March 16, 2020; "letting it go in June broke our hearts".
- "Clawing our way out of creditor protection was the greatest and most difficult feat our company has ever faced. But on January 27th, 2021 we made that our reality." (copied)
- Core values named: Resilience, Empowerment, Challenge & Collaborate; "our motto “Fail Fast”".

### takeoverstory: "The TakeOver Story" · tier 1
- https://medium.com/tribalscale/the-takeover-story-196ba3cc2998 · dated Sep 26, 2017 (edited Oct 10) · browser raw
- "We secured 83 speakers and had over 800 attendees at our Conference." Conference date Oct 2 (2017). Topics: blockchain, big data, AI, machine learning, AR/VR, Voice. "TakeOver 2018 is happening June 11th!"

### tribe2: "Tribe Turns 2!" · tier 1
- https://medium.com/tribalscale/tribe-turns-2-8109fe06a7c6 · dated Nov 2, 2017 · browser raw
- "In less than two years, we went from 0 to 100 employees." "Our Tribe has grown to over 125 members globally!" (copied)
- TakeOver: "83 speakers (52% females & 48% males)".
- Launched Venture Studios "alongside seasoned venture investor and operator, Roger Chabra our Chief Innovation Officer".
- Dubai office "team has grown to 14 employees"; "now calling 200 Wellington St W. our home".
- "Being recognized by Amazon and Google as expert Alexa skill and Action builders for their voice platforms" (copied; company claim)

### bkinsolv: BetaKit, "With $5.8 million owed to creditors, TribalScale files for insolvency..." · tier 2 (independent trade press; Meagan Simpson, June 16, 2020)
- https://betakit.com/with-5-8-million-owed-to-creditors-tribalscale-files-for-insolvency-in-bid-to-restructure-company/ · raw
- "TribalScale owes more than $5.8 million to 45 creditors, according to documents filed with the Office of the Superintendent of Bankruptcy Canada in May." (copied)
- Notice of Intention to make a proposal filed May 19 (2020) under the Bankruptcy and Insolvency Act.
- Jaitly said the insolvency was part of a restructuring plan started "more than a year ago" (BetaKit paraphrase); the trigger was the landlord (Allstream) claiming a lease default, per the company's insolvency lawyer.
- Jaitly: "When your revenue is really situated in your two biggest clients, then that’s a big boat to keep afloat," (copied) on why things began to slide; a large account restructured and brought work in-house, a second client "poaching" staff (his claims).
- "Prior to that period, Jaitly said TribalScale ... had brought in $60 million in revenue over three years, with $30 million of that in 2018." (BetaKit paraphrase of his statement)
- About 60 employees at the time. **Not used**: detail on amounts owed to individuals, including him.

### bwexit: "TribalScale Exits Creditor Protection" · tier 1 (company press release)
- https://www.businesswire.com/news/home/20210222005241/en/TribalScale-Exits-Creditor-Protection · Business Wire · Feb 22, 2021 · browser raw
- "TribalScale emerged from creditor protection on January 27, 2021." (copied)
- "TribalScale Inc. has been in creditor protection since May 2020." (copied)
- Quote by Jaitly: "We have a healthy and strong balance sheet" (company claim).
- "The company has closed over $81 million of funding in five years" (copied; company claim, wording as published; ambiguous what "funding" means)

### bkvs: BetaKit, "TribalScale launches $100 million Venture Studios program..." · tier 2 (Jessica Galang, Feb 7, 2018)
- https://betakit.com/tribalscale-launches-100-million-venture-studios-program-to-co-create-ai-and-blockchain-startups/ · raw
- "Venture Studios program, which will create startups in the blockchain, AI, and voice space over the next five years." (copied)
- "TribalScale will be offering startups $500,000 in cash and support to accepted companies." (copied). Kirstine Stewart "recently joined the team as president and chief revenue officer".
- Jaitly: "we are flipping the model and unfairly stacking the deck in their favor" (copied)

### globexl: The Globe and Mail, "California firm buys Toronto mobile developer Xtreme Labs" · tier 2 (Omar El Akkad, Oct 2, 2013)
- https://www.theglobeandmail.com/technology/california-firm-buys-toronto-mobile-developer-xtreme-labs/article14664751/ · raw
- Pivotal to buy the "350-employee, Toronto-based Xtreme Labs"; founded 2007; co-founders Amar Varma and Sundeep Madra; price undisclosed, All Things Digital reported "$65-million (U.S.)". Does **not** mention Jaitly.

### who, how, vsite: TribalScale company pages · tier 1
- https://www.tribalscale.com/company/who-we-are · "Built on Empowerment, Meritocracy, Transparency" (copied heading); "700+ Products Launched", "95% Repeat Client Rate" (company claims). Footer © 2025.
- https://www.tribalscale.com/company/how-we-work · lists a case titled "TribalScale | Building an Enterprise Agentic Platform for Delivery, Operations, and Personal Productivity" (title only; I did not open the case).
- https://www.tribalscale.com/company/venture-studio · "Most venture studios advise. We build." (copied)

### finpr: "FinScale Magazine Launches..." · tier 1
- https://www.tribalscale.com/press-release/tribalscale-launches-finscale-magazine-issue-01 · May 5, 2025
- Jaitly: "AI, data, and digital transformation are no longer future-focused buzzwords" (copied)

### top10: "TribalScale CEO Sheetal Jaitly Named One of the “Top 10 Leading Men in 2025” in MSN" · tier 1 (company press release, dated Dec 3, 2025)
- https://www.tribalscale.com/press-release/tribalscale-ceo-sheetal-jaitly-named-one-of-the-top-10-leading-men-in-2025 · browser raw
- Says the feature is "a global profile". I did **not** find or read the MSN piece itself; it may be sponsored or syndicated content. Treated as a company claim.

### fnb: "Always Be Learning with Sheetal Jaitly from TribalScale" (First Name Basis, Ep. 64) · tier 1
- https://www.tribalscale.com/podcast/always-be-learning · raw · 27 min; "learn about the Owner/President Management Program at Harvard Business School, Sheetal's approach to learning effectively, and playing to your strengths" (copied). Undated on page.

### hardpart: "Sheetal Jaitly from TribalScale" (The Hard Part with Evan McCann) · tier 2
- https://podcasts.apple.com/nz/podcast/sheetal-jaitly-from-tribalscale/id1634787423?i=1000703046792 · dated 10 April 2025 · 47 min · raw
- Episode takeaways list includes "Xtreme Labs Experience and Mafia", "Navigating Digital Transformation and AI", "The Miami Tech Boom". (Topic list only; I did not hear the episode.)

### ms: MarketScale, "Innovating the Foundations of Industry 4.0 with Sheetal Jaitly" · tier 2 (sponsored-content network; Nov 3, 2022)
- https://marketscale.com/industries/podcast-network/wavelengths/innovating-the-foundations-of-industry-4-0-with-sheetal-jaitly/ · raw
- “The things that we thought were impossible are now being shown to us that they can be possible.” (copied). Topics: Industry 4.0, edge computing, 5G, telecom.

### oc, tblp: other interviews · tier 2 (blurbs only)
- https://www.listennotes.com/podcasts/open-concept/sheetal-jaitly-founder-and-IBepTvmbjaD/ · Open Concept (undated): blurb says he discusses "what it takes to make big corporations more innovative" and "what he learned as a door-to-door photocopier salesman" (copied fragments; the blurb also mentions mental health, which I do not use).
- https://edwin100x.substack.com/p/tblp044-sheetal-jaitly-start-with-dd7 · The Business Leadership Podcast TBLP044 "Start With An Entrepreneurial Mindset", Jan 23, 2018 (blurb only).

## Tried and could not use
- Crunchbase / TheOrg / Wiza / RocketReach profiles: aggregator data, not opened; not cited. Web-search summaries mention earlier jobs (Marlabs, Millward Brown, Generation5, USRobotics/Palm) that I **could not confirm from a page I read**, so they are not in the graph.
- IT World Canada podcast page, CIX 2018 speaker page, TechTO panel, Takeover speaker page, DMZ profile page: URL now 404 / redirected; not cited.
- Fail Fast blog post on tribalscale.com: 404.
- Founder Institute mentor listing: page fetched but did not mention him; not used. Techstars and DMZ roles rest only on his own TribalScale profile.
- MNP court filings (CCAA): found via search, not read; the BetaKit piece and company releases carry the insolvency facts.
- Stablecoin article (FinScale piece): read intro only; left out of the graph.
- Talks/keynotes: no page I could read documents a specific keynote by him beyond TakeOver (which he hosted) and podcasts.

## Conflicts and gaps
- Revenue/growth in the first three years: Swagger has "just over $50m ... 250+ staff ... seven offices"; BetaKit has Jaitly saying "$60 million in revenue over three years, with $30 million of that in 2018"; the company press release says "$81 million of funding in five years". Three different figures, none independently verified. Modeled as its own node.
- Headcount: Nov 2017 post says over 125 members after two years; Swagger says 250+ by year three; BetaKit says about 60 in June 2020. Consistent with a rise and fall but not stated as one series by any source.
- Transparency as a value: Swagger (undated) says it was removed and replaced by resiliency; Feb 2021 Medium essay lists Resilience, Empowerment, Challenge & Collaborate; the current Who We Are page lists "Empowerment, Meritocracy, Transparency". I did not find a source explaining the current wording.
- Timeline of 2019: the 2021 essay says "In 2019 ... we sat down and took a hard look"; BetaKit says debt began in January 2019 (claim made by Jaitly on the company podcast, not heard by me).
- Not covered at all: his academic education, employment before Keating Technologies, current investor holdings, any departure/succession plans, employee/customer criticism (Glassdoor not read), TribalScale client results beyond its own claims.
