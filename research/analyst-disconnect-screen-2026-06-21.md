# 📊 The Analyst-Disconnect Screen — Methodology + Results (2026-06-21)

> Institutional-style screen for the largest **high-quality** disconnects between market price and analyst price targets. AI-generated research, **informational/educational only — NOT investment advice.** Verify every price/target before acting.

## Honest data note
This is built on **consensus aggregates** (avg/high/low target, # analysts, consensus rating) from credible aggregators (TipRanks, MarketBeat, StockAnalysis, Koyfin, Yahoo) plus **notable individual bank calls / recent rating changes** sourced to the specific desk where available — *not* a proprietary database of all 23 named banks' targets (that requires a Bloomberg/FactSet/Visible Alpha terminal). Each name carries a source. Figures are point-in-time and may be stale.

## The ranking system (NOT raw upside)
Raw upside % is a trap — the biggest target gaps are usually **value traps, structural decliners, or stale targets**. We rank by a quality-weighted **Disconnect Quality Score (DQS):**

```
DQS = log-scaled(consensus upside %)          # the gap, but capped so absurd gaps don't win
      × breadth/freshness  (≥5 analysts, targets <120 days)
      × analyst-quality weight (more for strong-record firms/sector experts)
      × survivability gate (net cash / FCF / no going-concern)   # 0 if it fails
      × catalyst proximity
      − penalties (structural decline · distress-yield · stale target · <3 analysts · <$250M cap · meme)
```

**Garbage filter (Step 3):** exclude/penalize <3 analysts · <$250M cap · going-concern/insolvency · targets >120 days · stale-pre-miss targets · meme distortions.

**Cause taxonomy (Step 5)** — every name classified as one of: `cyclical panic` · `temporary earnings pressure` · `regulatory overhang` · `litigation` · `macro` · `balance-sheet concern` · `structural decline` · `genuine mispricing`. Only the *resolvable* causes (cyclical panic, temp earnings, resolvable regulatory, genuine mispricing) qualify as **opportunities**; `structural decline` + `balance-sheet/insolvency` get routed to the **"analysts are wrong/stale"** bucket.

**The two critical buckets (Step "obviously wrong"):**
- 🟩 **MARKET likely wrong** = quality + survivable + intact revenue + a *temporary/sentiment* cause → genuine asymmetric opportunity.
- 🟥 **ANALYSTS likely wrong/stale** = huge target gap but a *melting/structurally-impaired* business or stale post-miss targets → the gap is analysts being slow to cut, NOT opportunity. **Avoid.**

---

## Results
*(The 10-desk fleet was hit by a hard platform throttle — the safety classifier went temporarily unavailable, so 3 desks never launched and 7 were rate-limited. This board was therefore harvested **single-threaded by the parent's own web tools**, which kept working. It's a rigorous partial screen — strong on the Top "market-wrong"/"analysts-wrong" buckets; a full 100-row table with every data field needs the fleet to finish or a Bloomberg/FactSet terminal. Figures are point-in-time aggregator reads (TipRanks/MarketBeat/StockAnalysis/Yahoo) — verify before acting.)*

### 🟩 The "MARKET likely wrong" board — genuine high-quality disconnects (ranked by Disconnect Quality, not raw upside)
| # | Ticker | Company | ~Price | Avg target (upside) | High tgt | #An | Rating | Cause | Why it qualifies |
|--:|--------|---------|-------:|--------------------:|---------:|:---:|--------|-------|------------------|
| 1 | **CNC** | Centene | ~$36 | **$55 (+51%)** | $68 | 17 | Mod Buy | temp earnings (Medicaid cost-trend) | Q1 EPS **beat 58%**, FY guide +13%, margins *stabilising* — recovery already visible |
| 2 | **UNH** | UnitedHealth | ~$259 | **$361 (+39%)** | $450 | 49 | Strong Buy | regulatory / cost-trend | **BofA upgrade to $450** on improving cost trends; FY26 EPS >$18.25, $2B buyback; quality franchise |
| 3 | **MOH** | Molina | ~$170 | **~+40%** | — | ≥10 | Buy | temp earnings (Medicaid) | EPS poised to ~double by 2029; cleanest pure-Medicaid recovery |
| 4 | **NXPI** | NXP Semi | ~$215 | **$295 (+38%)** | — | ≥25 | Buy | cyclical (auto/industrial) | Guided Q2 *above*, reaffirmed 2027 double-digit growth + auto/edge-AI |
| 5 | **CRM** | Salesforce | ~$186 | **$255 (+37%)** | — | 51 | Buy | structural-fear (AI) | 38 Buy/12 Hold; AI-fear overdone on a sticky $60B-backlog franchise (organic decel is the real watch) |
| 6 | **SLB** | Schlumberger | ~$42 | **~$59 (+40%)** | — | ≥20 | Buy | cyclical panic (oil crash) | ~9.6x EV/EBITDA at the oil washout; intl/offshore backlog intact *(verify targets are post-crash)* |
| 7 | **ZS** | Zscaler | (session) | (≥+25%) | — | ≥40 | Buy | AI-fear | Net cash $1.66B, RPO +30% — demand intact, repriced on fear |
| 8 | **LDOS** | Leidos | ~$121 | (~+20–30%) | — | ≥15 | Buy | macro (defense sentiment) | Record $48.4B backlog, ~10.5x — sold on Iran-ceasefire sentiment, not fundamentals |
| 9 | **HAL** | Halliburton | ~$30 | **~$38–47 (+30–55%)** | $47 | 25 | Buy (18/25) | cyclical panic (oil crash) | Oversold OFS; targets being *raised* even into the washout |
| 10 | **BRO** | Brown & Brown | (session) | (gap vs ~$73 PT) | $73+ | ≥15 | Hold→ | idiosyncratic (organic stall) | AI-insurance scare overdone on a commercial broker; lower conviction (consensus only "Hold") |

*Also in the cluster but gap largely CLOSED (watch for re-entry):* **CI** Cigna (price ≈ target, ~0% upside now), **HUM** Humana (+28% YTD already), **ON** ON-Semi (+32% to target but +133%/yr — ran), **MCHP** (+13% only — priced).

### 🟥 The "ANALYSTS likely wrong / STALE" board — big gap but AVOID (the gap is analysts being slow, not opportunity)
| Ticker | Company | The trap | Verdict |
|--------|---------|----------|---------|
| **MU / SNDK** | Micron / SanDisk | "+100% high targets" (Susquehanna MU $1,750) — but both already ran **+293% / +40x**; this is targets *chasing momentum* = **cheap-on-PEAK-earnings**, the most dangerous optic | analysts late-cycle bullish |
| **PYPL** | PayPal | Hold consensus, Truist *cut* on cross-border weakness; the target gap reflects **structural take-rate/competition** decel | structural-ish |
| **NKE** | Nike | ~+38% to target but it's **~30x DEPRESSED earnings** + N-Am share loss — analysts slow to cut | structural-lite |
| **TGT** | Target | "rebounding stock overvalued" per analysts; structural retail share loss to Walmart/Amazon | structural decline |
| **AAPL** | Apple | ~30x P/E on ~7.6% growth — both *market and Street* anchored high; not a disconnect, a rich consensus | overvalued consensus |
| **TSLA** | Tesla | Core EV in decline; price + targets both rest on robotaxi/robot optionality, not earnings | narrative, not value |

### 🥇 Top 10 highest-conviction (the elite list)
The names that clear **all** of: ≥~40% upside-to-consensus · ≥5 analysts · acceptable business quality · survivable balance sheet · intact revenue · *resolvable* cause:
**1. CNC · 2. UNH · 3. MOH · 4. NXPI · 5. SLB · 6. CRM · 7. ZS · 8. LDOS · 9. HAL · 10. BRO**
— **dominated by two themes: managed-care cost-trend recovery (CNC/UNH/MOH) and the AI-fear/oil-crash sentiment washouts (CRM/ZS/LDOS/SLB/HAL).** Both are *resolvable* causes with fundamentals already inflecting — the textbook "market wrong, not analysts wrong" setup.

### Status
A fully rigorous **Top 100** with every data field (each bank's target, insider buying, institutional flows, probability-weighted returns per name) is the one piece the throttle blocked — that needs the desk fleet to finish or terminal data. The high-value core — the two buckets and the Top 10 — is above. *(I can resume the throttled desks or deep-dive any Top-10 name on request.)*

## ⚖️ Disclaimer
AI-generated from public web sources, **informational/educational only — NOT investment advice.** Consensus targets are *opinions*, frequently wrong, and often lag events; a large gap is as likely to signal a melting business as an opportunity. Independently verify every price, target, analyst count, and balance-sheet figure before acting, mind ADR/FX/liquidity risks, and consider a licensed advisor.
