# Street Hearts website

Statische website voor Street Hearts (`street-hearts.nl`), gehost via **GitHub Pages** met **Cloudflare** ervoor voor DNS, CDN en SSL.

Geen build-step, geen frameworks. Open `index.html` in een browser en je ziet de site.

## Bestanden

```
index.html          De hele site, alle teksten en secties
styles.css          Vormgeving (pastel palet uit het logo)
script.js           Mobiel menu, profiel-modals, lightbox, "lees verder"
CNAME               Vertelt GitHub Pages welk domein hoort bij deze site
.nojekyll           Voorkomt dat GitHub Pages Jekyll draait
robots.txt          Toestemming voor zoekmachines
sitemap.xml         Index voor zoekmachines
assets/
  logo.png          Het Street Hearts logo
  infographic.png   De infographic (klikbaar om uit te vergroten)
  favicon.svg       Browser-tab-icoon
```

## Tekst aanpassen

Alle tekst staat in `index.html`. Open dat bestand in een editor (Notepad, VS Code, ...), zoek de zin die je wil aanpassen en wijzig die direct. Opslaan en pushen naar GitHub, binnen 1-2 minuten staat het online.

De 6 profielen staan onderaan `index.html` in een `<script type="application/json" id="profile-data">` blok. Pas daar de teksten aan als je een profiel wil wijzigen.

## Lokaal bekijken

Dubbelklik op `index.html` om hem in je browser te openen. Voor een telefoon-test op je eigen wifi-netwerk kun je een mini-webserver starten:

```powershell
# Python (meestal al geïnstalleerd op Windows 11)
cd C:\Users\juanv\Documents\StreatHearts\site
python -m http.server 8080
```

Open dan `http://<jouw-pc-ip>:8080` op je telefoon (in hetzelfde wifi-netwerk).

## Publiceren via GitHub Pages → Cloudflare

### 1. Push naar GitHub

```powershell
cd C:\Users\juanv\Documents\StreatHearts\site
git init
git add .
git commit -m "Initial Street Hearts website"
git branch -M main
# Maak eerst een lege repository aan op https://github.com/new (naam: street-hearts-website)
git remote add origin https://github.com/<jouw-github-username>/street-hearts-website.git
git push -u origin main
```

### 2. Zet GitHub Pages aan

In de repository op GitHub:
1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `(root)` → **Save**
4. Wacht 1 minuut. Bovenaan verschijnt: *"Your site is live at https://<username>.github.io/street-hearts-website/"*
5. Bij **Custom domain**: vul `street-hearts.nl` in en klik Save (het CNAME-bestand staat er al, dus dit slaat correct op).
6. Vink **Enforce HTTPS** aan (zodra DNS gepropageerd is, kan tot 24 uur duren).

### 3. DNS in Cloudflare

In Cloudflare bij de DNS-instellingen van `street-hearts.nl`, voeg deze records toe:

| Type  | Name | Content                              | Proxy |
|-------|------|--------------------------------------|-------|
| A     | @    | `185.199.108.153`                    | DNS only* |
| A     | @    | `185.199.109.153`                    | DNS only* |
| A     | @    | `185.199.110.153`                    | DNS only* |
| A     | @    | `185.199.111.153`                    | DNS only* |
| CNAME | www  | `<jouw-github-username>.github.io.`  | DNS only* |

*Belangrijk*: zet de proxy-status (oranje wolkje) **eerst op "DNS only"** (grijs wolkje) tijdens de eerste setup. GitHub Pages moet eerst zelf een SSL-certificaat kunnen aanvragen via Let's Encrypt. Zodra "Enforce HTTPS" in GitHub Pages werkt (groen vinkje), kun je het oranje wolkje aanzetten voor Cloudflare's CDN.

In **Cloudflare → SSL/TLS** → zet op **"Full"** (niet "Flexible", dat veroorzaakt redirect-loops met GitHub Pages).

### 4. Klaar

`https://street-hearts.nl` toont je site, met automatisch HTTPS via Cloudflare.

## Wijzigingen later

```powershell
cd C:\Users\juanv\Documents\StreatHearts\site
# pas bestanden aan
git add .
git commit -m "Tekstwijziging X"
git push
```

GitHub Pages pikt de wijziging vanzelf op (1–2 minuten).

## Open Graph preview image (optioneel later)

De `<meta property="og:image">` in `index.html` verwijst nu naar het logo. Voor mooiere link-previews op LinkedIn/WhatsApp kun je later een 1200×630 banner maken en uploaden als `assets/og-image.png`, en de URL in de meta-tag aanpassen.
