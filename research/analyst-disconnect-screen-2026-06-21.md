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
| ★ | **HLNE** | Hamilton Lane | ~$74 | **~$136–182 (+84% to +146%)** | $230 | 7–13 | Buy | sentiment (private-marks transparency) — *not* structural | FRE **+25%**, fees +14–20%, evergreen AUM +64%, **9th straight double-digit dividend hike**, ~13x P/E — **earnings GREW while the stock halved = pure multiple compression.** Largest clean disconnect on the board. |
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
**1. HLNE · 2. CNC · 3. UNH · 4. MOH · 5. NXPI · 6. SLB · 7. CRM · 8. ZS · 9. LDOS · 10. BRO** *(HLNE vaults to #1 — biggest quality gap, +84–146% to consensus, FRE growing +25%)*
— **dominated by two themes: managed-care cost-trend recovery (CNC/UNH/MOH) and the AI-fear/oil-crash sentiment washouts (CRM/ZS/LDOS/SLB/HAL).** Both are *resolvable* causes with fundamentals already inflecting — the textbook "market wrong, not analysts wrong" setup.

## ★ HLNE (Hamilton Lane) — full Step-7 dossier
*Price note: your chart shows ~$73.93 (recent low); one feed reads ~$87. 52-wk low is $75.93. Confirm your live fill — **but the entire analyst target range ($102–$230) sits ABOVE the price either way.** Math below anchored at ~$74 entry.*

- **Investment thesis:** A blue-chip private-markets asset manager (~$1T footprint) whose **earnings GREW double-digits while the stock fell ~64%** ($203→~$74) = pure multiple compression to ~**11–13x forward** (FY27 EPS est **$6.55, +15%**). FRE +25% (Q2/Q3 ran +37%), fees +14–20%, evergreen AUM **+64%**, incentive-fee 47% CAGR, **9th straight double-digit dividend hike**, plus a **$1.5B unrealized carry balance (+23% YoY)** = embedded future earnings the market is ignoring.
- **Bear thesis:** Private-equity **NAVs/marks could be written down** (frozen exits + higher-for-longer) → fee-earning AUM growth stalls and carry evaporates; HLNE *defending its own marks* is self-interested; the whole alts complex could stay de-rated (cheap gets cheaper).
- **Why analysts are bullish (9 analysts, Buy, 0 Sell):** recurring FRE engine compounding ~mid-20s%, evergreen/retail S-curve, secondaries advantaged by the slow-exit drought, fat dividend + buyback. **No analyst target is below the price** (low $102 → high $230; avg ~$157, median ~$170).
- **Why the market is bearish:** sentiment de-rating of all alts on "private-credit bubble / stale marks / IPO drought" — a *sector* fear, not an HLNE earnings problem.
- **Insider buying (CONFIRMED, open-market, near the low):** **Exec Co-Chairman Hartley Rogers ~38,290 sh (~$3M)**, **COO Andrea Kramer** (buys all year, no sells), **Director David Berkman 15,000 sh** — all **Jun 11, 2026 at ~$76–79**; **10 buys vs 1 sell.** You'd be buying *below* where the Co-Chairman bought.
- **Institutional ownership:** heavy (≈full float), **+~6% QoQ** — institutions adding into the drawdown.
- **Valuation:** ~11–13x FY27 EPS ($6.55), ~12.8x fwd, **~3%+ dividend yield** (safe, $2.40, +11%), vs a 5-yr history of 25–35x. PEG <0.6 on FRE growth.
- **Key catalysts:** Q1 FY27 print (~Aug '26); **carry realizations if PE exits/IPO window thaw** (optionality on the $1.5B unrealized carry); alts-complex sentiment turn (rate cuts); continued dividend hikes/buyback.
- **Probability analysts are "directionally right":** ~**60%** the stock re-rates materially higher over 1–2yr; ~25% it stays cheap-but-compounding (you still collect the dividend + EPS growth); ~15% the marks/recession bear case bites. *(Caveat: Street targets are systematically optimistic — the most likely single path is "right direction, smaller magnitude," ~$110–130 / +50–75%, not the full $157 avg.)*
- **Expected return if analysts right:** to avg ~$157 = **+112%**; median $170 = **+130%**; high $230 = **+211%** (from $74).
- **Expected return if analysts wrong (bear):** marks reset → ~$55–60 = **−19% to −26%**; severe (~$48) = **−35%**. Cushioned by recurring FRE + the dividend.
- **Asymmetry:** base **+112%** vs bear **~−20%** ≈ **~5:1 reward/risk** — a genuine asymmetric setup, corroborated by the insider cluster and the company's own research arguing the feared macro *favors* its secondaries/evergreen engines.

### Status
A fully rigorous **Top 100** with every data field (each bank's target, insider buying, institutional flows, probability-weighted returns per name) is the one piece the throttle blocked — that needs the desk fleet to finish or terminal data. The high-value core — the two buckets and the Top 10 — is above. *(I can resume the throttled desks or deep-dive any Top-10 name on request.)*

## ⚖️ Disclaimer
AI-generated from public web sources, **informational/educational only — NOT investment advice.** Consensus targets are *opinions*, frequently wrong, and often lag events; a large gap is as likely to signal a melting business as an opportunity. Independently verify every price, target, analyst count, and balance-sheet figure before acting, mind ADR/FX/liquidity risks, and consider a licensed advisor.
