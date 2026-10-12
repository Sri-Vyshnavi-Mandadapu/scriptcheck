# ScriptCheck

A responsive prescription-review **educational prototype**, inspired by the supplied ScriptCheck Industry Product Blueprint. Floating CSS 3D medicine visuals, browser-local prescription intake, plain-language findings and downloadable reports. No account, backend, patient database, API key or paid service required.

## Run

Requires Node 18+ for tests and Python 3 for the local server.

```sh
npm test
npm start
```

Open http://localhost:4173. Deploy `dist/` to Netlify (configuration included), GitHub Pages, or any static host. The Sites manifest supports the connected Sites deployment.

## What works

- JPG/PNG/WEBP preview, PDF preview and manual transcription, plain-text import.
- Optional English printed-image OCR using Tesseract.js 5.1.1 in the browser. It requires external software/model downloads and can fail offline; manual entry remains available. Handwriting is not validated.
- Editable, explicitly confirmed medicine fields with current/stopped/historical/uncertain use.
- Six configured drug-pair rules, selected NSAID overlap, exact ingredient duplication/allergy matching, selected kidney/ulcer context rules, methotrexate schedule warning, and oral solid paracetamol daily arithmetic.
- Explicit missing-data and unsupported-scope messages; stale reports disappear after edits.
- Printable report and text download; clear-session action; responsive layout and reduced-motion support.

## Clinical boundary

**Not clinically validated and not for treatment decisions.** It can miss serious interactions. No trained AI model or comprehensive licensed knowledge service is connected. Never infer safety from a result without findings. Rules use linked NHS/FDA references but have not been approved by a clinical owner. Sources are in `dist/engine.js`; rule version is included in reports. No accuracy or regulatory claims are made.

The blueprint's complete product requires clinical partnership, a validated learned model, licensed comprehensive evidence, secure professional authentication/authorization, longitudinal records, expert decisions and notifications, and regulatory review. Those are not simulated here. See `docs/ROADMAP.md`.

## Privacy

Prescription content stays in page memory; no localStorage, analytics, health API calls, server storage or care-team messaging. Refresh/close clears it. Hosting providers and Google Fonts/jsDelivr/Tesseract language-model hosts receive ordinary network metadata. Optional OCR operates on-device. Downloaded/printed reports contain health details and must be handled privately. Use synthetic data for demonstrations.

## Verification

`node --test tests/*.test.js` tests the rule engine, including unit conversion, unknown data, excluded medicine states, all configured pairs, dose gating and absence of safety clearance. Passing these tests proves neither clinical effectiveness nor comprehensive coverage.
