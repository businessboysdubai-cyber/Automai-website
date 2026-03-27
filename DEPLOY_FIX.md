# Deploy Fix — 404 NOT_FOUND su Route Radice "/"

## Causa Identificata

**Il branch `main` conteneva solo il vecchio `index.html` statico**, mentre la nuova homepage Next.js era stata pushata soltanto sul branch feature `claude/ai-automation-homepage-Kw0No`.

Vercel deploya in produzione dal branch `main`. Il deploy di produzione (`dpl_5Z9ZxMizrkk7bhW3rhXiHy5yMPHD`) si è completato in **15ms** perché ha trovato soltanto `index.html` — nessun `package.json`, nessun Next.js build, nessuna route `/` registrata nel runtime.

Il **preview deployment** dal branch feature (`dpl_H68YS1kYLMT7ee7FW9WfPAEaxGf6`) invece ha eseguito correttamente `npm install + npm run build` producendo la homepage completa, ma rimane un preview non servito in produzione.

## Controlli Eseguiti

| Check | Risultato |
|---|---|
| `app/page.tsx` — export default valido | ✅ OK |
| `app/layout.tsx` — wrappa `{children}` | ✅ OK |
| `next.config.ts` — nessun rewrite/redirect su "/" | ✅ OK |
| `npm run build` locale | ✅ 0 errori TypeScript |
| `vercel.json` | ✅ Non presente (nessuna config errata) |
| Branch `main` su GitHub | ❌ Conteneva solo `index.html` |
| Preview da `claude/ai-automation-homepage-Kw0No` | ✅ Build OK, route "/" risponde |

## Cosa È Stato Modificato

1. **Aperta PR** da `claude/ai-automation-homepage-Kw0No` → `main`
2. **Mergiata** con squash/merge commit
3. Vercel ha rilevato il push su `main` e ha triggato automaticamente un nuovo **production deployment** che include il progetto Next.js completo

## Come Re-deployare su Vercel

### Opzione 1 — Push su `main` (automatico, raccomandato)
```bash
git checkout main
git merge claude/ai-automation-homepage-Kw0No
git push origin main
```
Vercel rileva il push e deploya automaticamente in produzione.

### Opzione 2 — Deploy manuale con Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

## Struttura del Progetto in Produzione

```
/               → app/page.tsx    (Hero + Features + HowItWorks + CTA)
/_not-found     → gestito da Next.js App Router
```

Il progetto è un'app **Next.js 16 statica** (output: static prerender). Non richiede funzioni serverless.
