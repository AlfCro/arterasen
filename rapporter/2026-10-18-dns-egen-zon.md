# Rapport 2026-10-18: DNS till eget Cloudflare-konto

Arbetspass: 2026-10-18 15:11–15:50
Av: Claude
PR: se PLAN.md
Initiativ: 02

## Sammanfattning

Alf har inloggning hos domänregistraren, som visade sig vara Name ISP och inte Loopia. Automatisk förnyelse är på. Ingen i föreningen känner till Cloudflare-kontot där DNS för arterasen.se ligger, och domänen finns inte i Alfs konto. Alf bestämde att zonen flyttas till hans Cloudflare-konto, med huvudsajten pekad på `www.n.nu` enligt N.nu:s manual. Fler administratörer läggs till senare, senast innan skyltarna trycks.

## Gjort

- **`plans/02-hosting.md`:** förutsättningarna rättade (Name ISP, förnyelse, N.nu och Cloudflare), nytt beslut, avsnittet *Domän* omskrivet till stegen för att flytta zonen, punkten om Cloudflare-administratörer skärpt, öppna frågor uppdaterade.
- **PLAN.md:** initiativ 2 är *Pågår*, *Väntar på* uppdaterad, PR #4 avbockad.
- **README.md:** *Läget just nu* om hosting och domän.
- **AGENTS.md:** `dns.google` kan svara 429 efter några uppslag i rad.
- Ett mejlutkast till N.nu:s support togs fram i chatten men skickades inte. Alf vill inte gå den vägen.

## Beslut

- **Zonen arterasen.se flyttas till Alfs Cloudflare-konto** (Alf). Föreningen byter frivilliga då och då, och ingen vet vems det nuvarande kontot är. Kontot används bara för föreningen och döps om senare. Pages-projektet skapas i samma konto.
- **Fler administratörer senare** (Alf): en person i styrelsen och en inloggning med föreningens mejladress, båda *Super Administrator*, senast innan skyltarna trycks våren 2027. Medlemmar och kontonamn kan ändras när som helst utan att domänen påverkas.
- **Inte flytta DNS till Name ISP.** Huvudsajten får HTTPS genom Cloudflare enligt N.nu:s manual, och apex behöver en CNAME mot `www.n.nu` (Claude).
- **Pages, inte Workers** står fast. Cloudflare föreslår Workers för nya projekt, men Pages stöds och bygget läser `CF_PAGES_BRANCH` (Claude).

## Kontrollerat

- NS för arterasen.se via `dns.google`: fortfarande `jean.ns.cloudflare.com` och `lloyd.ns.cloudflare.com`.
- TXT för arterasen.se: inga poster. MX saknades redan 2026-10-17.
- `www.n.nu` → 46.246.45.145, inte en Cloudflare-adress, så en proxad CNAME från en egen zon fungerar.
- `www.arterasen.se` gick inte att slå upp: proxyn svarade 429. Cloudflare visar posten när zonen läggs till.
- N.nu:s manual: namnservrarna för domäner hos Loopia är just `jean`/`lloyd`, och för eget Cloudflare-konto gäller CNAME `@` och `www` → `www.n.nu`, SSL *Flexible*.
- Cloudflares dokumentation: en *Super Administrator* kan ändra medlemmar och återkalla andra Super Administrators. Kontot finns kvar när en medlem tar bort sin inloggning.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] DNSSEC av hos Name ISP, sedan zonen till Cloudflare och namnserverbyte, enligt stegen i `plans/02-hosting.md` (Alf)
- [ ] Pages-projektet `arterasen-info` i samma konto och `info.arterasen.se` som custom domain (Alf)
- [ ] Tvåstegsverifiering på Cloudflare-inloggningen (Alf)
- [ ] Kontrollera DNS och sajterna efter bytet (Claude)
- [ ] Granska och merga PR:en (Alf)

## Öppna frågor

- Vem har N.nu-inloggningen? Den behövs om HTTPS måste aktiveras om efter bytet (Alf, ordföranden).
- Vem står som innehavare hos Name ISP, och vems kort dras vid förnyelsen 2027-01-22? (Alf)
- Vilken mejladress ska föreningen använda för Cloudflare-inloggningen? Den får inte ligga på arterasen.se (föreningen).

## Källor

- [Koppla domän från Loopia till N.nu (N.nu manual)](https://manual.n.nu/article/36-andra-namnservrar-pa-loopia)
- [Aktivera HTTPS (N.nu manual)](https://manual.n.nu/article/55-aktivera-https)
- [Cloudflare Docs: Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/)
- [Cloudflare Docs: Manage members](https://developers.cloudflare.com/fundamentals/manage-members/manage/)
- [Cloudflare Pages vs Workers 2026 (Mecanik)](https://mecanik.dev/en/posts/cloudflare-pages-vs-workers-which-to-use-in-2026/)
