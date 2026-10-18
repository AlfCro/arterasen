# Rapport 2026-10-18: DNS flyttad

Arbetspass: 2026-10-18 20:00–21:30
Av: Claude
PR: #5
Initiativ: 02

## Sammanfattning

Alf flyttade zonen arterasen.se till sitt Cloudflare-konto för hand 2026-10-18, som PR #5 beslutade. Namnservrarna är nu `betty.ns.cloudflare.com` och `carl.ns.cloudflare.com`, huvudsajten hos N.nu svarar som förut, och `info.arterasen.se` finns inte i DNS än. Planen visar nu vad som är gjort och vad som återstår för Pages. Driftuppgifterna dokumenterades i ett nytt privat repo.

## Gjort

- **`plans/02-hosting.md`:** *Förutsättningar* delade i läget efter flytten och läget före. Domänstegen avbockade med resultat. Två nya kontroller för när `info` läggs till: HTTPS med zonens *Flexible*, och att huvudsajten fortfarande svarar. Logg.
- **PLAN.md:** initiativ 2 och *Väntar på* uppdaterade, rapporten tillagd.
- **README.md:** *Läget just nu* om DNS och nästa steg.
- **AGENTS.md:** drift- och kontouppgifter ligger i det privata repot `AlfCro/arterasen-config`.
- **`AlfCro/arterasen-config`** (privat, nytt): domän, zon, poster, SSL/TLS, kontrollerna efter flytten, granskningen före och den planerade Pages-sajten med nästa steg.
- Lagt på PR #5:s gren i stället för en ny PR, så att beslutet och genomförandet granskas tillsammans.

## Beslut

- **Driftuppgifter i ett privat repo** (Alf): `AlfCro/arterasen-config`. Det publika repot håller planen och det som syns i publika uppslag.

## Kontrollerat

Kontrollerna efter flytten gjorde Alf. Claude kunde inte göra egna DNS-uppslag i passet, eftersom WebFetch mot `dns.google` krävde ett godkännande som inte hann besvaras.

- Cloudflares dashboard: zonen aktiv, *Flexible* sparat.
- Publika uppslag efter aktiveringen: namnservrarna `betty` och `carl`. `info.arterasen.se` ger NXDOMAIN.
- Cirka 19:55: `https://arterasen.se` ger 301 till `https://www.arterasen.se/`, som ger 200. Kontroller av DNS och HTTP-huvuden, inte i webbläsare.
- Cloudflares dokumentation om custom domains: posten för en underdomän läggs automatiskt när zonen ligger hos Cloudflare, och en CNAME som läggs för hand innan ger fel 522. Krypteringsläget tas inte upp där.
- `npm run check`, `npm run check:readme` och `npm run build` gröna.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Granska och merga PR #5 (Alf)
- [ ] Pages-projektet i samma Cloudflare-konto: namn, bygge och koppling till repot enligt `plans/02-hosting.md` (Alf)
- [ ] `info.arterasen.se` via *Custom domains*, sedan kontroll av HTTPS, certifikat och sidorna (Alf, Claude)
- [ ] Tvåstegsverifiering på Cloudflare-inloggningen (Alf)

## Öppna frågor

- Ger zonens *Flexible* problem för Pages-sajten på `info`? Kontrolleras när domänen är tillagd (Claude).
- Vem har N.nu-inloggningen? (Alf, ordföranden)
- Fråga A1 i underlaget till ordföranden gäller nu bara N.nu. Cloudflare-delen är löst.

## Källor

- [Cloudflare Pages: Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Aktivera HTTPS (N.nu manual)](https://manual.n.nu/article/55-aktivera-https)
