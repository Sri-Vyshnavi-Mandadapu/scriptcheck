# AI-assisted prescription review

The Netlify endpoint `/.netlify/functions/ai-review` calls OpenAI Responses with a server-only key, multimodal input, medium reasoning and strict structured output. Default model: `gpt-5.4`; override with `OPENAI_MODEL` only after compatibility testing. This is a general-purpose pretrained model, **not a clinically validated prescription-risk classifier**.

## Activate

1. On eligible Netlify credit-based plans, AI Gateway automatically provides `OPENAI_API_KEY` and `OPENAI_BASE_URL`; this app honors both. No separate provider key is required. Alternatively, configure a provider key and its base URL using Functions-scoped Netlify environment settings. Never put keys in source, browser storage, chat, or netlify.toml.
2. Review account AI usage/credit limits. Gateway inference consumes Netlify credits; an independently configured provider key uses that provider's billing. Unlimited free inference is not promised.
3. Redeploy to apply environment changes: `npm exec --package=netlify-cli -- netlify deploy --prod --no-build --dir=dist`.
4. Check the readiness endpoint and test with synthetic prescriptions.

## Behavior

Explicit sharing consent; photo/PDF/text/structured medicine input; 25 entries, 10,000 text characters and 3 MB document limits. Uncertain readings, missing critical facts, invalid model output, refusal, missing key, quota limits, connection errors and timeouts produce `pharmacist_required`. Independent rules are computed server-side and cannot be removed by the model. No safety guarantees, confidence percentages, treatment changes or fabricated professional reviews.

A downloadable pharmacist handoff contains concerns and questions. It does not contact, message, or book a pharmacist. No pharmacist network is connected. Changing input invalidates the result and cancels the browser request. Provider timeout is 45 seconds; Netlify rate limit is six requests per IP/domain per minute, not a guaranteed global spending cap.

## Privacy

Local rule/OCR mode stays on-device. With consent, AI mode sends the prescription and entered health context through Netlify to OpenAI. No application patient database or content logs. Calls use `store:false`, which does not eliminate provider abuse-monitoring retention. Hosting/access logs may contain network metadata. Remove identifying data and establish clinical/privacy governance before real-patient use.

## References and testing

[Model](https://developers.openai.com/api/docs/models/gpt-5.4), [structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [provider data controls](https://developers.openai.com/api/docs/guides/your-data), [Netlify environment variables](https://docs.netlify.com/build/functions/environment-variables/).

Unit tests mock provider responses to check routing and security invariants. They do not establish medical accuracy. Browser tests cover consent, uncertainty, stale results and fallback. Live model verification requires a configured key and must be reported separately.
