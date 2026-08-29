# Berry Bank

Marketing and information site for Berry Fintech, Inc. (Berry Bank), San Antonio, Texas.

Four pages: home, Green Hub, investors, privacy policy. No CMS, no database, no admin
login. All copy lives in one TypeScript file.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Changing the words on the site

Everything readable on the site is in **`content/site.ts`**. Edit it, save, commit, push.
That is the whole workflow. Nobody needs a login.

Two rules we hold to in that file:

1. No number goes on the site unless it is real and we can say where it came from.
2. Nothing is described as further along than it is. Goals are labelled as goals.

## Changing how it looks

Every design decision is in **`app/globals.css`**. The tokens at the top control the whole
site: change `--berry` and the buttons, links, section fields, and the logo mark all follow.

- `--paper` `#F4EFED` — page background, a rosy grey rather than a cream
- `--ink` `#1C1210` — body text, a near-black warmed with the brand hue
- `--berry` `#9E1916` — the one accent
- `--growth` `#16A075` — used in exactly one place, the Green Hub live marker

Text colors were picked to pass WCAG AA (4.5:1) on both background tones. If you change
them, check the contrast before shipping.

Type is Schibsted Grotesk with IBM Plex Mono for labels, amounts, and filing data. Heading
sizes follow a 1.618 progression: 17px body, 27px h3, 44px h2, 71px display.

## Email signups

The form posts to `app/api/newsletter/route.ts`, which adds the person to Resend Contacts
and sends a welcome email. It needs `RESEND_API_KEY` in `.env.local`. Without the key the
route accepts the signup and logs it instead of failing, so local development works.

Sending from `noreply@berrybank.app` requires the domain to be verified in Resend.

## The Green Hub embed

`/green-hub` shows the live Green Hub (`greenhub.berrybank.app`) in a scaled, non-interactive
frame, with a button that opens the real site in a new tab.

The frame is deliberately not interactive. The Green Hub's landing screen is a login form,
and asking people to type a password into a cross-origin iframe is a bad idea: password
managers will not autofill it, and it teaches users a habit that phishing relies on. If you
ever make that frame interactive, remove the login screen from it first.

Below 768px the frame is replaced with a link, because the Green Hub is built for a desktop
viewport and scaling it to phone width makes it unreadable.

## Deploying

Push to `main`. Vercel builds it. Set `RESEND_API_KEY` in the Vercel project's environment
variables.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Resend. Plain CSS, no framework. 35 packages.
