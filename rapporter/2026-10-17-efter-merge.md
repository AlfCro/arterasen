# Rapport 2026-10-17: Efter merge, åtkomst och två adresser

Arbetspass: 2026-10-17 22:28–23:12
Av: Claude
PR: #2
Initiativ: 01, 02

## Sammanfattning

PR #1 är mergad och `granskning`-grenen fungerar utan ändrade Actions-inställningar. DNS för arterasen.se visade sig ligga hos Cloudflare, inte hos Loopia, vilket ändrar domänstegen. Alf vill ha två adresser, en för utkast och en publik. Underlaget för det beslutet finns som dokument och väntar på Alf.

## Gjort

- **Planen efter merge.** Initiativ 1 markerat som mergat. Punkten om att ge GitHub Actions skrivrättighet struken: `granskning.yml` begär `contents: write` själv.
- **Åtkomst för fler än en person.** Ny checklista i `plans/02-hosting.md` för GitHub, Cloudflare, Trello, Drive och Loopia. Flytt till en GitHub-organisation görs helst före Cloudflare-kopplingen.
- **Förhandsvisning utan hosting.** Granskningsversionen av `main` (45aa907) publicerad som privat artifact: [Ärteråsens fäbod](https://claude.ai/artifact/3nR2JuBqXU3krTjtSUfevq). Nytt skript `tools/artifact-preview.mjs` gör samma sak nästa gång.
- **DNS kontrollerat.** arterasen.se har Cloudflares namnservrar. Domänavsnittet i `plans/02-hosting.md` är omskrivet, och fakta står under *Förutsättningar* där.
- **Beslutsunderlag för två adresser:** [Två adresser för QR-sajten](https://claude.ai/code/artifact/9e3892a9-0640-41c1-93ca-0a359e9727c9), med förutsättningar, tre alternativ, jämförelse, rekommendation och en ritning. Länkat från `plans/02-hosting.md` under *Väntar på beslut*.
- **AGENTS.md.** Nya punkter under *Miljön i Claude-sessioner*: gammal lokal `main` efter klon, DNS-uppslag via WebFetch, förhandsvisning som artifact, beslutsunderlag som dokument, kopplingarnas läge.

## Beslut

- **Två adresser, en för utkast och en publik** (Alf). Hur och vad den ska heta är inte bestämt. Förslaget i underlaget är två Pages-projekt i domänens Cloudflare-konto och `utkast.arterasen.se`. Inget är ändrat i kod eller konfiguration förrän Alf har valt.
- **Actions-inställningen** behöver inte ändras (Claude, efter kontroll av körningen efter merge).

## Kontrollerat

- Workflowen `granskning` körde efter mergen och grenen `granskning` står på samma commit som `main`.
- `npm run check` grönt på `main` och på PR-grenen.
- `tools/artifact-preview.mjs` ger samma utdata som den kopia som publicerades, utom byggtiden på statussidan.
- DNS via `dns.google`: NS `jean.ns.cloudflare.com` och `lloyd.ns.cloudflare.com`, A-poster i Cloudflares proxy, inga MX-poster.
- Ritningen i beslutsunderlaget granskad som skärmdump.

## Väntar på

- [ ] Merga PR #2, så att nästa session börjar från uppdaterad plan (Alf)
- [ ] Ta reda på vems Cloudflare-konto arterasen.se ligger i (Alf)
- [ ] Välj alternativ och namn för utkastadressen i underlaget (Alf). Därefter gör Claude ändringarna i repot som står i underlagets sista avsnitt.
- [ ] Bestäm om repot ska flyttas till en GitHub-organisation innan Cloudflare kopplas (Alf)
- [ ] Koppla Trello och anslut Google Drive på claude.ai (Alf)

## Öppna frågor

- Vem har Cloudflare-kontot för arterasen.se, och kan Pages-projekten ligga där? (Alf)
- `utkast.arterasen.se` eller `granskning.arterasen.se`? (Alf, föreningen)
- Ska utkastsajten kräva inloggning? Förslaget är nej. (Alf)

## Källor

- [Cloudflare Pages: Custom domains](https://developers.cloudflare.com/pages/platform/custom-domains/)
- [Cloudflare Pages: Add a custom domain to a branch](https://developers.cloudflare.com/pages/how-to/custom-branch-aliases/)
- [Google Public DNS, NS för arterasen.se](https://dns.google/resolve?name=arterasen.se&type=NS)
