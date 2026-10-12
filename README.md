# ScriptCheck

A responsive prescription-review **educational prototype**, inspired by the supplied ScriptCheck Industry Product Blueprint. Floating CSS 3D visuals, optional multimodal AI review, independent rule checks, plain-language findings, and pharmacist handoff reports.

Public address: https://scriptcheck-rx.netlify.app (`scriptcheck.netlify.app` was unavailable).

Local rule checking needs no API key. Cloud AI uses Netlify AI Gateway's automatically supplied server credentials and base URL when available, or an explicitly configured server-side OpenAI key. AI usage consumes hosting/provider credits. The default model is GPT-5.4, not a clinically validated ScriptCheck-specific model. See [AI setup and boundaries](docs/AI-DEPLOYMENT.md).

## Run

Requires Node 18+ for tests and Python 3 for the local server.

```sh
npm test
npm start
```

Open http://localhost:4173 for the local-rule frontend. Use Netlify Dev for the AI endpoint. Deploy through Netlify CLI with the included function configuration; a static-only host cannot execute the AI backend. The retained Sites manifest identifies the original static deployment.

## What works

- Optional AI review of image/PDF/text/entered medicine data, after explicit sharing consent.
- Uncertainty, incomplete inputs, refusal, timeout, quota error and missing configuration route to a pharmacist-review handoff. The app does not automatically contact a pharmacist.
- Server-side structured output validation, selected independent safeguards, size limits, and request rate limiting.

- JPG/PNG/WEBP preview, PDF preview and manual transcription, plain-text import.
- Optional English printed-image OCR using Tesseract.js 5.1.1 in the browser. It requires external software/model downloads and can fail offline; manual entry remains available. Handwriting is not validated.
- Editable, explicitly confirmed medicine fields with current/stopped/historical/uncertain use.
- Six configured drug-pair rules, selected NSAID overlap, exact ingredient duplication/allergy matching, selected kidney/ulcer context rules, methotrexate schedule warning, and oral solid paracetamol daily arithmetic.
- Explicit missing-data and unsupported-scope messages; stale reports disappear after edits.
- Printable report and text download; clear-session action; responsive layout and reduced-motion support.

## Clinical boundary

**Not clinically validated and not for treatment decisions.** It can miss serious interactions. A general-purpose AI integration is available when configured; there is no comprehensive licensed knowledge service or independently validated patient-risk model. Never infer safety from a result without findings. Rules use linked NHS/FDA references but have not been approved by a clinical owner. Sources are in `dist/engine.js`; rule and prompt/model versions accompany their reports. No accuracy or regulatory claims are made.

The blueprint's complete product requires clinical partnership, a validated learned model, licensed comprehensive evidence, secure professional authentication/authorization, longitudinal records, expert decisions and notifications, and regulatory review. Those are not simulated here. See `docs/ROADMAP.md`.

## Privacy

Local checks and optional OCR operate on-device. With explicit consent, AI review sends the chosen prescription and entered context through Netlify to OpenAI. No patient database, localStorage, clinical-content logging or care-team messaging. API requests use `store:false`; provider abuse-monitoring retention can still apply. Refresh/close clears browser memory. Hosting and software providers receive ordinary network metadata. Keep downloaded/printed reports private. Use synthetic data for demonstrations.

## Verification

`node --test tests/*.test.js` tests the rule engine and mocked AI integration, including unit conversion, unknown data, independent warning preservation, consent, refusals, timeouts, schema validation and absence of safety clearance. Passing these tests proves neither clinical effectiveness nor comprehensive coverage. Live provider tests require a configured API key.
