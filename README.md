# Ärteråsen QR-information

QR-skyltar för besökare på Ärteråsens fäbod i Ore, Rättviks kommun. Varje skylt leder till en kort text om platsen på svenska, engelska eller tyska, beroende på besökarens telefon. Sajten är byggd för Ärteråsens Kulturförening.

- **Publik sajt:** https://info.arterasen.se/ (när hostingen är på plats, se [plans/02-hosting.md](plans/02-hosting.md))
- **För volontärerna:** https://info.arterasen.se/intern/ beskriver hur man skriver, granskar och sätter upp skyltar
- **Arbetsplan:** [PLAN.md](PLAN.md) med en delplan per initiativ i [plans/](plans/)
- **För AI-agenter:** [AGENTS.md](AGENTS.md)

## Så fungerar det

```
Volontär skriver i Google Drive ──► Trello-kort "Klar för Claude"
        ▲                                     │
        │                                     ▼
  kommentar på kortet              Claude gör sida + översätter,
        │                          lägger förhandsvisning på kortet
        │                                     │
        └──────── "Granska" ◄─────────────────┘
                     │ föreningen godkänner
                     ▼
              Claude publicerar ──► info.arterasen.se ──► skylt skrivs ut
```

Allt innehåll ligger som Markdown i `content/`. En liten Node-generator i `src/` bygger statiska sidor, QR-ingångar och utskrivbara skyltar till `dist/`. Cloudflare Pages bygger `main` till den publika sajten och varje annan gren till en egen förhandsvisning.

## Utveckling

Kräver Node 20 eller senare.

```sh
npm ci
npm run dev        # http://localhost:8080, utkast syns
npm run check      # validera innehållet
npm run build      # produktion till dist/
```

Testa QR-koderna med en telefon i samma nätverk:

```sh
SITE_URL=http://<din-dators-ip>:8080/ npm run dev
```

Öppna sedan `/skyltar/` och skanna en kod.

## Lägga till en plats

```sh
npm run ny -- karles-lada "Karles lada"
npm run bild -- ~/Bilder/lada.jpg karles-lada
```

Fyll i `content/platser/karles-lada/{sv,en,de}.md`. Platsen syns bara i förhandsvisningar tills `status: klar` står i alla tre filerna. Normalt sköter Claude detta utifrån Trello-korten, se [docs/arbetsflode.md](docs/arbetsflode.md).

## Viktigt

En QR-adress som sitter på en uppsatt skylt får aldrig sluta fungera. Uppsatta skyltar registreras i `content/tryckta-skyltar.json`, och `npm run check` stoppar varje ändring som skulle bryta en av dem.
