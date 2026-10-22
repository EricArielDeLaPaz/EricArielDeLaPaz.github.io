# Case-study visuals: build spec

Repo: `EricArielDeLaPaz/EricArielDeLaPaz.github.io`. This spec adds images and new slides to the four case studies (SecureID, Honda of Clear Lake, DevTective, Vextaro). It was test-built against the live code: every slide fits at 1440x900 with no inner scrolling.

## How to read this spec

- Every HTML block below is the **final, exact markup** for a section. Use it verbatim.
- Existing sections are located by their `<h2>` text. Section text that is not shown here must be left exactly as it is.
- Images live in `assets/images/case-studies/<study>/`. Case-study pages sit in `case-studies/`, so every `src` starts with `../assets/images/case-studies/`. Spaces in file names are written `%20`.
- Never invent facts, numbers or claims. Never use em dashes in new copy (use commas).
- Do not change anything not listed here.

## Pre-flight (before any code)

1. `assets/images/case-studies/secureid/paper ID type.png` is about 10 MB. Compress it to `paper-id-type.jpg` (about 1600 px on the long side, quality about 80, roughly 300 KB) in the same folder. The HTML below uses `paper-id-type.jpg`. Do not use the PNG.
2. Check that every image path used below exists. List any that do not.

## Files that change

1. `assets/js/main.js` (slide labels and Vextaro cover)
2. `assets/css/style.css` (append one block)
3. `case-studies/secureid.html`
4. `case-studies/honda.html`
5. `case-studies/devtective.html`
6. `case-studies/vextaro.html`

## 1. main.js

Replace the whole `slideLabels` object with this. The rail matches labels to slides by position, so the count must equal 1 (the hero) plus the number of `.cs-section` blocks on each page.


```js
  const slideLabels = {
    SecureID: ['SecureID', 'Defining', 'Calm Verification', 'Analyst Triage', 'Analyst Pivot', 'Personas', 'Paper to Pixels', 'System Design', 'Impact & Outcome'],
    'Honda of Clear Lake': ['Honda of Clear Lake', 'The Problem', 'What We Found', 'From Violation to Fix', 'Catastrophic Findings', 'Fix List'],
    DevTective: ['DevTective', 'Momentum', 'Three Learners', 'Re-entry Design', 'The Screens', 'Design System', 'Capstone Scope'],
    Vextaro: ['Vextaro', 'Fit Anxiety', 'Marcus & Journey', 'The Checkpoint', 'Flows & Screens', 'System Design', "What's Next"],
  };
```


In `coverAssets`, add one entry after `DevTective` if it is not already there:

```js
    Vextaro: '../assets/images/vextaro.png',
```

(The file `assets/images/vextaro.png` is already in the repo. If it is not, say so and skip this line.)

Do not touch `heroSlides` or any other code. In JS strings, escape apostrophes or use double quotes.

## 2. style.css

Append this block at the very end of the file, unchanged:


```css
/* Case-study visuals: figures, split layouts, and the Honda charts/cards */
.cs-section figure{ margin:0; min-width:0; }
.cs-section figure img{ display:block; width:100%; height:auto; max-height:280px; object-fit:contain; background:#171512; border:1px solid var(--border); border-radius:var(--radius-sm); }
.cs-section figcaption{ margin-top:8px; font:12px/1.45 'Raleway',sans-serif; color:var(--text-faint); }
.cs-section a.cs-zoom{ display:block; cursor:zoom-in; }
.cs-figure-row{ display:grid; gap:14px; margin:18px 0 6px; align-items:start; }
.cs-figure-row.cols-1{ grid-template-columns:minmax(0,1fr); }
.cs-figure-row.cols-2{ grid-template-columns:repeat(2,minmax(0,1fr)); }
.cs-figure-row.cols-3{ grid-template-columns:repeat(3,minmax(0,1fr)); }
.cs-figure-row.sm img{ max-height:200px; }
.cs-figure-row.xs img{ max-height:150px; }
.cs-section p.cs-note{ margin:10px 0 0; font:14px/1.5 'Raleway',sans-serif; color:var(--text-dim); }
.cs-figure-row.flex{ display:flex; flex-wrap:nowrap; justify-content:center; gap:14px; }
.cs-figure-row.flex figure{ flex:0 1 auto; }
.cs-figure-row.flex a.cs-zoom{ display:inline-block; }
.cs-figure-row.flex img{ width:auto; max-width:100%; max-height:var(--h,300px); }
.cs-section.case-study-slide > *{ flex-shrink:0; }
.cs-split{ display:grid; grid-template-columns:minmax(0,var(--split,1.6fr)) minmax(0,1fr); gap:28px; align-items:start; }
.cs-split .cs-figure-row{ margin-top:0; }
.cs-split .cs-figure-row.flex{ justify-content:flex-start; }
.cs-split-media > .cs-figure-row + .cs-figure-row{ margin-top:14px; }
.reasoning-chain.compact .chain-step{ padding:12px 16px; }
.reasoning-chain.compact .chain-step .k{ font-size:10px; }
.reasoning-chain.compact .chain-step .v{ font-size:13.5px; line-height:1.5; }
.reasoning-chain.is-row{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); }
.reasoning-chain.is-row .chain-step{ grid-template-columns:minmax(0,1fr); gap:8px; }
.reasoning-chain.is-row .chain-step + .chain-step{ border-top:0; border-left:1px solid var(--border-soft); }
.hc-lede{ max-width:none; }
.hc-grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:26px; margin-top:16px; }
.hc-chart h3{ margin:0 0 10px; font:600 11px/1.3 'Raleway',sans-serif; letter-spacing:.1em; text-transform:uppercase; color:var(--text-faint); }
.hc-row{ display:grid; grid-template-columns:150px minmax(0,1fr) 26px; gap:10px; align-items:center; margin-bottom:8px; font:13px/1.3 'Raleway',sans-serif; color:var(--text-dim); }
.hc-row b{ font-weight:600; color:var(--text); text-align:right; }
.hc-bar{ height:12px; background:#1b1b1b; border-radius:2px; overflow:hidden; }
.hc-bar i{ display:block; height:100%; background:var(--accent,#c9a84c); }
.hc-bar i.cat{ background:#c4574b; }
.hc-bar i.maj{ background:#d9873a; }
.hc-bar i.min{ background:#c9a84c; }
.hc-bar i.not{ background:#6f8f6b; }
.hc-note{ margin:6px 0 0; font:12px/1.45 'Raleway',sans-serif; color:var(--text-faint); }
.hc-areas{ display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:10px; margin-top:18px; }
.hc-areas .impact-stat{ padding:12px; }
.hf-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; margin-top:16px; }
.hf-card{ display:flex; flex-direction:column; gap:8px; padding:16px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--card); }
.hf-top{ display:flex; align-items:center; justify-content:space-between; gap:8px; }
.hf-id{ font:600 12px 'Raleway',sans-serif; letter-spacing:.08em; color:var(--accent,#c9a84c); }
.hf-badge{ padding:2px 8px; border-radius:999px; background:#c4574b; color:#140b0a; font:700 10px 'Raleway',sans-serif; letter-spacing:.06em; text-transform:uppercase; }
.hf-card h3{ margin:0; font:600 17px/1.25 'EB Garamond',serif; color:var(--text); }
.hf-card p{ margin:0; font:13px/1.5 'Raleway',sans-serif; color:var(--text-dim); }
.hf-card .hf-heur{ font-size:12px; color:var(--text-faint); }
.hf-fix{ margin-top:auto; padding:10px 12px; border-left:3px solid var(--accent,#c9a84c); background:#151515; font:13px/1.5 'Raleway',sans-serif; color:var(--text); }
.hf-fix span{ display:block; margin-bottom:2px; font:700 10px 'Raleway',sans-serif; letter-spacing:.1em; text-transform:uppercase; color:var(--accent,#c9a84c); }
@media(max-width:700px){
  .cs-split,.hc-grid,.hf-grid,.reasoning-chain.is-row{ grid-template-columns:minmax(0,1fr); }
  .reasoning-chain.is-row .chain-step + .chain-step{ border-left:0; border-top:1px solid var(--border-soft); }
  .cs-figure-row.cols-2,.cs-figure-row.cols-3{ grid-template-columns:minmax(0,1fr); }
  .cs-figure-row.flex{ flex-wrap:wrap; }
  .cs-section figure img,.cs-figure-row.sm img{ max-height:none; }
  .cs-figure-row.flex img{ max-height:var(--h,300px); }
  .hc-areas{ grid-template-columns:repeat(2,minmax(0,1fr)); }
  .hc-row{ grid-template-columns:110px minmax(0,1fr) 26px; }
}
```


Notes on why: slides are fixed-size flex columns, so `.cs-section.case-study-slide > *{flex-shrink:0}` stops new content being squashed. Images open full size in a new tab (`.cs-zoom`).

## 3. secureid.html

Final slide order (9 slides): hero, Defining, Calm Verification, Analyst Triage, Analyst Pivot, Personas, Paper to Pixels, System Design, Impact & Outcome.

### 3a. Slide 2 "Two users, one flow" (existing, add two figures)

Right after the existing first `<p>` (the one ending "both built on one shared design system."), insert:


```html
      <div class="cs-figure-row cols-2">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/verification-face-verified.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/verification-face-verified.png" alt="SecureID face-scan success screen on mobile" loading="lazy"></a><figcaption>The person verifying: one task per screen and a clear success state.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/dashboard-case-queue.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/dashboard-case-queue.png" alt="SecureID analyst dashboard case queue with color-coded status badges" loading="lazy"></a><figcaption>The analyst: a sortable case queue with status at a glance.</figcaption></figure>
        </div>
```


### 3b. Slides 3, 4, 5: replace the single section "From insight to decision" with these three sections

The old section had two reasoning chains. Chain 1 (the person verifying) goes to slide 3, chain 2 (the analyst) goes to slide 4, and slide 5 is new. Two sentences in chain 1 were corrected so the copy matches what was actually built and evaluated (flagged for Eric's approval; keep them as written below):

- "So I changed" now says: single-purpose screens, capture separated from biometric confirmation, a progress indicator while scanning, a clear success state, and a confirmation before leaving.
- "Evaluated via" now says: a self-review of the hi-fi screens against the original wireframes.

Both chains now carry the class `reasoning-chain compact`.


```html
    <div class="cs-section">
      <div class="cs-split">
        <div class="cs-split-text">
          <h2>From insight to decision</h2>
          <p>
            Two decisions mattered most, here's the reasoning behind each. The first was about the person verifying.
          </p>
          <div class="reasoning-chain compact">
                  <div class="chain-step">
                    <span class="k">I learned</span>
                    <span class="v">Users dropped their guard the moment they hit a screen that felt uncertain,
                      unclear what step they were on, or what would happen with their documents.
                      Anxiety about making a mistake during verification was the dominant emotion in
                      early research conversations.</span>
                  </div>
                  <div class="chain-step">
                    <span class="k">So I changed</span>
                    <span class="v">I rebuilt onboarding as single-purpose screens: document capture separated
                      from biometric confirmation instead of one dense form, with a progress indicator
                      while scanning, a clear success state, and a confirmation before leaving.</span>
                  </div>
                  <div class="chain-step">
                    <span class="k">Evaluated via</span>
                    <span class="v">A self-review of the hi-fi screens against the original wireframes,
                      checking that each screen asks for one thing and shows what happens next.</span>
                  </div>
                </div>
        </div>
        <div class="cs-split-media">
        <div class="cs-figure-row flex" style="--h:250px">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/hi-fi%20ID%20type.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/hi-fi%20ID%20type.png" alt="SecureID Choose Your ID Type mobile screen" loading="lazy"></a><figcaption>Choose an ID type.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/verification-face-verified.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/verification-face-verified.png" alt="SecureID face scan success mobile screen" loading="lazy"></a><figcaption>A clear success state.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/verification-exit.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/verification-exit.png" alt="SecureID exit confirmation mobile screen" loading="lazy"></a><figcaption>Leaving asks for confirmation.</figcaption></figure>
        </div>
        </div>
      </div>
    </div>

    <div class="cs-section">
      <div class="cs-split">
        <div class="cs-split-text">
          <h2>Triage, not a flat list</h2>
          <p>
            The second decision was about the analyst, who needs to read a queue before opening a case.
          </p>
          <div class="reasoning-chain compact">
                  <div class="chain-step">
                    <span class="k">I learned</span>
                    <span class="v">Analysts don't review cases in the order they arrive, they triage by
                      risk and age first, and a simple top-to-bottom list made that harder, not easier.</span>
                  </div>
                  <div class="chain-step">
                    <span class="k">So I changed</span>
                    <span class="v">I redesigned the dashboard navigation around filterable, sortable case
                      queues with status and priority surfaced at a glance, instead of a flat case list,
                      and mapped a dedicated settings area (notifications, password, email preferences)
                      so account controls stopped competing with the review workspace.</span>
                  </div>
                  <div class="chain-step">
                    <span class="k">Evaluated via</span>
                    <span class="v">A self-review against the IA and the color-mapped status system (button
                      and badge color tied one-to-one to case status) to confirm an analyst could read a
                      queue's priority without opening a single case.</span>
                  </div>
                </div>
        </div>
        <div class="cs-split-media">
        <div class="cs-figure-row cols-1 sm">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/dashboard-case-queue.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/dashboard-case-queue.png" alt="SecureID case queue with sortable columns and status badges" loading="lazy"></a><figcaption>Sortable queue with color-coded status.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/dashboard-settings.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/dashboard-settings.png" alt="SecureID settings screen with account, notification and preference sections" loading="lazy"></a><figcaption>Settings live in their own area, away from the review workspace.</figcaption></figure>
        </div>
        </div>
      </div>
    </div>

    <div class="cs-section">
      <h2>Fewer choices, faster cases</h2>
      <div class="reasoning-chain is-row compact">
        <div class="chain-step">
          <span class="k">I learned</span>
          <span class="v">My first version of the case-review screen put every possible action in front of the analyst at once, several buttons and controls competing for attention on a single case, which risked overwhelming someone who needed to move through cases quickly, not deliberate over the screen itself.</span>
        </div>
        <div class="chain-step">
          <span class="k">So I changed</span>
          <span class="v">I cut the primary actions down to three, Reject, Escalate, Approve, and moved everything else (a reason for rejection, a confirmation prompt, a note) into a focused overlay that only appears after one of those three is chosen, instead of sitting on the main screen at all times.</span>
        </div>
        <div class="chain-step">
          <span class="k">Evaluated via</span>
          <span class="v">A direct side-by-side of the early low-fidelity screen against the revised dashboard, checking whether the number of decisions an analyst had to make per case dropped without losing any action they actually needed.</span>
        </div>
      </div>
      <div class="cs-figure-row cols-3 xs">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/lo-fi%20review.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/lo-fi%20review.png" alt="Low-fidelity case review workspace with many controls visible at once" loading="lazy"></a><figcaption>Before: every control visible at once.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/dashboard-case-48291.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/dashboard-case-48291.png" alt="High-fidelity analyst screen for case 48291 with Reject, Escalate and Approve buttons" loading="lazy"></a><figcaption>After: Reject, Escalate, Approve.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/overlays/overlay-confirmation-reject.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/overlays/overlay-confirmation-reject.png" alt="Rejection confirmation overlay" loading="lazy"></a><figcaption>Follow-ups live in overlays.</figcaption></figure>
        </div>
      <p class="cs-note">Fewer visible choices per case was a deliberate trade for analyst throughput: less time spent interpreting the screen is less time spent per case, and the overlay pattern keeps that speed without hiding anything an analyst needs.</p>
    </div>
```


Note: the "I learned / So I changed / Evaluated via" text in slide 4 (the analyst chain) is the original chain 2 text, unchanged. Take it from the current file; the block above shows it in place.

### 3c. Slide 7 "From paper to pixels" (new, insert right after the "Four personas, kept honest" section)


```html
    <div class="cs-section">
      <h2>From paper to pixels</h2>
      <p>
        The verification flow moved through three fidelities: paper sketches to find the structure, low-fidelity wireframes to settle the screens, then high-fidelity screens built on the shared token system.
      </p>
      <div class="cs-figure-row flex" style="--h:300px">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/paper-id-type.jpg" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/paper-id-type.jpg" alt="Paper sketch of the Choose Your ID Type screen" loading="lazy"></a><figcaption>Paper sketch.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/lo-fi%20ID%20type.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/lo-fi%20ID%20type.png" alt="Low-fidelity Choose Your ID Type screen" loading="lazy"></a><figcaption>Low-fidelity wireframe.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/hi-fi%20ID%20type.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/hi-fi%20ID%20type.png" alt="High-fidelity Choose Your ID Type screen" loading="lazy"></a><figcaption>High-fidelity screen.</figcaption></figure>
        </div>
    </div>
```


### 3d. Slide 8 "One system, two interfaces" (existing, wrap in a split)

Keep the existing heading, paragraph and bullet list text exactly. Wrap them in the split below, with the image on the right:


```html
    <div class="cs-section">
      <div class="cs-split">
        <div class="cs-split-text">
          <h2>One system, two interfaces</h2>
                <p>
                  Instead of designing the user flow and analyst dashboard as separate products, I built
                  both on one shared token system, a neutral base plus accent, success, and error colors
                  in five tints each, so the same visual language reads as calm to a verifying user and
                  fast to a scanning analyst.
                </p>
                <ul>
                  <li>Five-stop color ramps (100 → 900) for accent, positive, and negative feedback</li>
                  <li>Status color mapped consistently to meaning across every button, badge, and banner</li>
                  <li>One shared type and spacing scale across both interfaces</li>
                </ul>
        </div>
        <div class="cs-split-media">
          <div class="cs-figure-row cols-1">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/secureid/hifi-overview.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/secureid/hifi-overview.png" alt="Overview of all SecureID high-fidelity screens, user flow and analyst dashboard" loading="lazy"></a><figcaption>Every high-fidelity screen, user flow and analyst dashboard, on one system.</figcaption></figure>
        </div>
        </div>
      </div>
    </div>
```


### SecureID images not used (leave them out)

`Components.png`, `verification-face-scan.png`, `verification-license-front.png`, the `overlays/` files other than `overlay-confirmation-reject.png`. Two of them (`verification-license-front.png`, `face-scan.png`) show unfinished placeholder copy ("Please Adjust ____", "Front Scanning"), so they must not appear on the site.

## 4. honda.html

No screenshots. The two new slides are built from HTML and CSS using the audit data from the original Framer portfolio. Final slide order (6 slides): hero, The Problem, What We Found, From Violation to Fix, Catastrophic Findings, Fix List.

Design: dark cards, thin borders, the site's gold accent for numbers and labels. Severity bars use four colors (Catastrophic red `#c4574b`, Major orange `#d9873a`, Minor gold `#c9a84c`, Not severe green `#6f8f6b`). Heuristic bars use one accent color. Bar widths are value divided by the chart maximum (18 for severity, 15 for heuristics).

Data (31 findings listed; do not print a total, the old page's text said 33 and the list shows 31):

| Severity | Count |
|---|---|
| Catastrophic | 3 |
| Major | 5 |
| Minor | 18 |
| Not severe | 5 |

| Heuristic violated | Count |
|---|---|
| Aesthetic & Minimalist Design | 15 |
| Consistency & Standards | 14 |
| Match With the Real World | 3 |
| Visibility of System Status | 2 |
| User Control & Freedom | 2 |
| Recognition vs Recall | 1 |
| Flexibility & Efficiency | 1 |
| Help & Documentation | 1 |

Findings by area: Navigation 11, Homepage 7, Inventory 4, Vehicle Details 5, Checkout 4.

### 4a. Slide 3 "What the audit found" (new, insert right after the "Shoppers couldn't shop confidently" section)


```html
    <div class="cs-section">
      <h2>What the audit found</h2>
      <p class="hc-lede">
        I walked the full dealership experience across five areas: Navigation, Homepage, Inventory, Vehicle Details and Checkout. I rated every finding by severity, and Navigation produced the most.
      </p>
      <div class="hc-grid">
        <div class="hc-chart">
          <h3>Findings by severity</h3>
          <div class="hc-row"><span>Catastrophic</span><div class="hc-bar"><i class="cat" style="width:16.7%"></i></div><b>3</b></div>
          <div class="hc-row"><span>Major</span><div class="hc-bar"><i class="maj" style="width:27.8%"></i></div><b>5</b></div>
          <div class="hc-row"><span>Minor</span><div class="hc-bar"><i class="min" style="width:100.0%"></i></div><b>18</b></div>
          <div class="hc-row"><span>Not severe</span><div class="hc-bar"><i class="not" style="width:27.8%"></i></div><b>5</b></div>
        </div>
        <div class="hc-chart">
          <h3>Heuristics violated</h3>
          <div class="hc-row"><span>Aesthetic &amp; Minimalist Design</span><div class="hc-bar"><i class="" style="width:100.0%"></i></div><b>15</b></div>
          <div class="hc-row"><span>Consistency &amp; Standards</span><div class="hc-bar"><i class="" style="width:93.3%"></i></div><b>14</b></div>
          <div class="hc-row"><span>Match With the Real World</span><div class="hc-bar"><i class="" style="width:20.0%"></i></div><b>3</b></div>
          <div class="hc-row"><span>Visibility of System Status</span><div class="hc-bar"><i class="" style="width:13.3%"></i></div><b>2</b></div>
          <div class="hc-row"><span>User Control &amp; Freedom</span><div class="hc-bar"><i class="" style="width:13.3%"></i></div><b>2</b></div>
          <div class="hc-row"><span>Recognition vs Recall</span><div class="hc-bar"><i class="" style="width:6.7%"></i></div><b>1</b></div>
          <div class="hc-row"><span>Flexibility &amp; Efficiency</span><div class="hc-bar"><i class="" style="width:6.7%"></i></div><b>1</b></div>
          <div class="hc-row"><span>Help &amp; Documentation</span><div class="hc-bar"><i class="" style="width:6.7%"></i></div><b>1</b></div>
          <p class="hc-note">A finding can violate more than one heuristic.</p>
        </div>
      </div>
      <div class="hc-areas">
        <div class="impact-stat"><div class="n">11</div><div class="l">Navigation</div></div>
        <div class="impact-stat"><div class="n">7</div><div class="l">Homepage</div></div>
        <div class="impact-stat"><div class="n">4</div><div class="l">Inventory</div></div>
        <div class="impact-stat"><div class="n">5</div><div class="l">Vehicle Details</div></div>
        <div class="impact-stat"><div class="n">4</div><div class="l">Checkout</div></div>
      </div>
    </div>
```


### 4b. Slide 5 "Three catastrophic findings, three fixes" (new, insert right after the "From violation to fix" section)


```html
    <div class="cs-section">
      <h2>Three catastrophic findings, three fixes</h2>
      <p class="hc-lede">
        Three findings were rated catastrophic. Each one pairs the problem with the fix I recommended in the report.
      </p>
      <div class="hf-grid">
        <article class="hf-card">
          <div class="hf-top"><span class="hf-id">2.5.0 · Homepage</span><span class="hf-badge">Catastrophic</span></div>
          <h3>Map controls cut off</h3>
          <p>The embedded map isn't centered, so some map controls are cut off.</p>
          <p class="hf-heur">Heuristic: User Control &amp; Freedom, Consistency &amp; Standards</p>
          <div class="hf-fix"><span>Recommended fix</span>Recenter the map so all controls are fully visible in the default view.</div>
        </article>
        <article class="hf-card">
          <div class="hf-top"><span class="hf-id">3.0.0 · Inventory</span><span class="hf-badge">Catastrophic</span></div>
          <h3>Search bar locks scrolling</h3>
          <p>Clicking into the search bar makes the page unscrollable, locking the user into the search input until they exit it.</p>
          <p class="hf-heur">Heuristic: User Control &amp; Freedom</p>
          <div class="hf-fix"><span>Recommended fix</span>Allow normal page scrolling while search is active, and avoid modal-like behavior unless it is a deliberate full-screen search.</div>
        </article>
        <article class="hf-card">
          <div class="hf-top"><span class="hf-id">5.3.0 · Checkout</span><span class="hf-badge">Catastrophic</span></div>
          <h3>Accessibility button missing</h3>
          <p>The accessibility button is not available on the checkout screen, even though it appears on other pages.</p>
          <p class="hf-heur">Heuristic: Help &amp; Documentation</p>
          <div class="hf-fix"><span>Recommended fix</span>Keep the accessibility button visible and functional throughout the entire checkout flow.</div>
        </article>
      </div>
    </div>
```


## 5. devtective.html

Final slide order (7 slides): hero, Momentum, Three Learners, Re-entry Design, The Screens, Design System, Capstone Scope.

### 5a. Slide 2 "Momentum, not motivation" (existing, add one figure)

Right after the existing first `<p>` (ending "...unsure where they'd left off."), insert:


```html
      <div class="cs-figure-row cols-1">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Alex-Statements.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Alex-Statements.png" alt="Alex's problem statement and if/then statement" loading="lazy"></a><figcaption>Alex: problem statement and if/then statement from the research.</figcaption></figure>
        </div>
```


### 5b. Slide 3 "Three learners" (new, right after "Momentum, not motivation")


```html
    <div class="cs-section">
      <h2>Three learners</h2>
      <p>
        Three personas, from a career changer to a junior designer to a marketer, frame who the concept is for and where each one stalls.
      </p>
      <div class="cs-figure-row cols-3 sm">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Persona-1.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Persona-1.png" alt="Persona card for Alex" loading="lazy"></a><figcaption>Alex: retail assistant manager, career changer.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Persona-2.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Persona-2.png" alt="Persona card for Taylor" loading="lazy"></a><figcaption>Taylor: junior UX/UI designer.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Persona-3.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Persona-3.png" alt="Persona card for Morgan" loading="lazy"></a><figcaption>Morgan: marketing coordinator.</figcaption></figure>
        </div>
    </div>
```


### 5c. Slide 4 "Designing for re-entry" (existing, wrap in a split)

Keep the existing heading, paragraph and reasoning chain text exactly (the chain gets the class `reasoning-chain compact`). Final markup:


```html
    <div class="cs-section">
      <div class="cs-split" style="--split:1.15fr">
        <div class="cs-split-text">
          <h2>Designing for re-entry</h2>
                <div class="reasoning-chain compact">
                  <div class="chain-step">
                    <span class="k">I learned</span>
                    <span class="v">The hardest moment wasn't lesson 1, it was the second session, after
                      a gap, when a learner had to reconstruct context before they could do anything.</span>
                  </div>
                  <div class="chain-step">
                    <span class="k">So I changed</span>
                    <span class="v">I designed the home screen around a single "pick up where you left off"
                      entry point with a short context recap, instead of a generic course-list home,
                      and wireframed progress states that show streaks honestly, without guilt-driven
                      red/warning styling.</span>
                  </div>
                  <div class="chain-step">
                    <span class="k">Evaluated via</span>
                    <span class="v">Low-fidelity prototype walkthroughs checking whether a returning user
                      could state what they'd do next within the first screen, with no explanation needed.</span>
                  </div>
                </div>
        </div>
        <div class="cs-split-media">
          <div class="cs-figure-row flex" style="--h:300px">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Home.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Home.png" alt="DevTective home screen with a pick-up-where-you-left-off card" loading="lazy"></a><figcaption>Home leads with "Pick up right where you left off."</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Alex-User-Journey-Map.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Alex-User-Journey-Map.png" alt="Alex's journey map" loading="lazy"></a><figcaption>Alex's journey map.</figcaption></figure>
        </div>
        </div>
      </div>
    </div>
```


### 5d. Slides 5 and 6 (new, right after "Designing for re-entry")


```html
    <div class="cs-section">
      <h2>The screens</h2>
      <p>
        The rest of the concept in high fidelity: case files, build mode, and rewards.
      </p>
      <div class="cs-figure-row flex" style="--h:310px">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Cases-Case-Files.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Cases-Case-Files.png" alt="DevTective case files screen" loading="lazy"></a><figcaption>Case files.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Cases-Build-Mode.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Cases-Build-Mode.png" alt="DevTective build mode screen" loading="lazy"></a><figcaption>Build mode.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Rewards.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Rewards.png" alt="DevTective rewards screen" loading="lazy"></a><figcaption>Rewards.</figcaption></figure>
        </div>
    </div>

    <div class="cs-section">
      <h2>A small design system</h2>
      <p>
        Color tokens and a typographic scale keep every screen consistent.
      </p>
      <div class="cs-figure-row flex" style="--h:330px">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Colors.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Colors.png" alt="DevTective color palette" loading="lazy"></a><figcaption>Color palette.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/devtective/Typography.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/devtective/Typography.png" alt="DevTective typography scale" loading="lazy"></a><figcaption>Typography.</figcaption></figure>
        </div>
    </div>
```


### DevTective images not used

`Morgan-Statements.png`, `Taylor-Statements.png` (the Alex statements image is used on slide 2).

## 6. vextaro.html

Slide 6 "A system built to scale" is excluded: do not change it. Final slide order (7 slides): hero, Fit Anxiety, Marcus & Journey, The Checkpoint, Flows & Screens, System Design (unchanged), What's Next.

### 6a. Slide 3 (new, right after "Fit anxiety, not selection")

The copy says the research was desk research (competitor reviews, industry return-rate data, independent style guides). Keep that wording.


```html
    <div class="cs-section">
      <h2>Marcus and his journey</h2>
      <p>
        Marcus, the primary persona, and his emotional journey map were built from desk research: competitor reviews, industry return-rate data, and independent style guides.
      </p>
      <div class="cs-figure-row flex" style="--h:330px">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/vextaro/Marcus.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/vextaro/Marcus.png" alt="Persona card for Marcus, the primary Vextaro persona" loading="lazy"></a><figcaption>Marcus, primary persona.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/vextaro/Emotional%20Journey%20Map.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/vextaro/Emotional%20Journey%20Map.png" alt="Emotional journey map for Marcus across the rental experience" loading="lazy"></a><figcaption>Emotional journey map.</figcaption></figure>
        </div>
    </div>
```


### 6b. Slide 4 "From complaint to checkpoint" (existing, wrap in a split)

Keep the existing heading, paragraph and chain text exactly (chain gets `reasoning-chain compact`). Final markup:


```html
    <div class="cs-section">
      <div class="cs-split">
        <div class="cs-split-text">
          <h2>From complaint to checkpoint</h2>
                <div class="reasoning-chain compact">
                  <div class="chain-step">
                    <span class="k">I learned</span>
                    <span class="v">Competitive audits and customer reviews both pointed to the same gap: no
                      competitor offered a human-backed fit check before checkout, and that absence was
                      a recurring, named frustration, not a guess.</span>
                  </div>
                  <div class="chain-step">
                    <span class="k">So I changed</span>
                    <span class="v">I designed a specialist fit-confirmation checkpoint directly into the
                      booking flow, and mapped it into a 7-section information architecture with three
                      annotated user flows (primary task, onboarding, and a recovery/unhappy path with
                      escalation) so the checkpoint had a clear place to live rather than being bolted on.</span>
                  </div>
                  <div class="chain-step">
                    <span class="k">Evaluated via</span>
                    <span class="v">Flow walkthroughs against the IA to confirm the checkpoint was reachable
                      from both the primary booking path and the recovery path, with no dead ends.</span>
                  </div>
                </div>
        </div>
        <div class="cs-split-media">
          <div class="cs-figure-row flex" style="--h:320px">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/vextaro/fit-check%20wireframe.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/vextaro/fit-check%20wireframe.png" alt="Wireframe of onboarding step 2 of 4, add your measurements, with a link to find a nearby measuring specialist" loading="lazy"></a><figcaption>Onboarding step 2 of 4: add measurements, or find a nearby measuring specialist.</figcaption></figure>
        </div>
        </div>
      </div>
    </div>
```


### 6c. Slide 5 (new, right after "From complaint to checkpoint")


```html
    <div class="cs-section">
      <div class="cs-split" style="--split:1.15fr">
        <div class="cs-split-text">
          <h2>Flows and first screens</h2>
          <p>
            The 7-section information architecture, the recovery flow with escalation, and the first high-fidelity screen.
          </p>
          <div class="cs-figure-row cols-1">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/vextaro/IA.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/vextaro/IA.png" alt="Vextaro seven-section information architecture" loading="lazy"></a><figcaption>Information architecture, seven sections.</figcaption></figure>
        </div>
        </div>
        <div class="cs-split-media">
          <div class="cs-figure-row flex" style="--h:320px">
          <figure><a class="cs-zoom" href="../assets/images/case-studies/vextaro/recovery%20flow.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/vextaro/recovery%20flow.png" alt="Vextaro recovery user flow with escalation" loading="lazy"></a><figcaption>Recovery flow.</figcaption></figure>
          <figure><a class="cs-zoom" href="../assets/images/case-studies/vextaro/onboarding.png" target="_blank" rel="noopener" title="Open full size"><img src="../assets/images/case-studies/vextaro/onboarding.png" alt="Vextaro onboarding welcome screen" loading="lazy"></a><figcaption>Onboarding welcome.</figcaption></figure>
        </div>
        </div>
      </div>
    </div>
```


### 6d. Slide 7 "What's next" (existing, replace the paragraph only)

Replace the existing `<p>...</p>` with:


```html
      <p>
        Vextaro is an active internship project. The information architecture, user flows,
        wireframes and token system are in place, with the first high-fidelity screens underway;
        prototyping and engineering handoff come next.
      </p>
```


## Do not change

- Anything in `index.html`, the homepage cards CSS, `heroSlides`, or other pages.
- Vextaro slide 6 and the SecureID Personas and Outcome sections.
- Existing copy not named above. Do not add numbers, quotes or claims that are not already on the site.
- The test build kept every figure's image inside `<a class="cs-zoom">` so it opens full size in a new tab. Keep that.

## Verification checklist

1. `slideLabels` count equals 1 + number of `.cs-section` blocks on each page: SecureID 9, Honda 6, DevTective 7, Vextaro 7.
2. Open each page, press through every slide. No slide scrolls inside itself at 1440x900. Nothing is clipped.
3. Every image loads (no broken icons). `paper-id-type.jpg` is under 500 KB.
4. Browser console shows no JavaScript errors (an unescaped apostrophe breaks the whole site).
5. Vextaro slide 6 is identical to before.
6. No em dashes in new copy.
7. Honda charts show 3/5/18/5 and the heuristic counts above, with no printed total.

## Known content notes for Eric

- `lo-fi review.png` contains lorem ipsum. It is used small on SecureID slide 5 as the "before" image. Replace it in Figma if you want.
- The Honda page text mentions 33 issues but 31 are listed. The charts use the 31 listed.
- Two SecureID screens have unfinished placeholder copy and are left out.
