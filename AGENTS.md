# Documentation Agents — risingwave-docs

This file defines the role-specific instructions for AI agents working on
`risingwavelabs/risingwave-docs`.

Use it for two distinct roles:
- **Docs Auto-PR Writer**: creates or revises documentation PRs for issues.
- **Docs PR Reviewer**: audits docs PRs and decides `pass`, `revise`, or `escalate`.

---

## Role Selection Contract

- If your task brief says you are the **writer**, follow only the
  `Docs Auto-PR Writer Instructions` section plus the repository-specific notes.
- If your task brief says you are the **reviewer**, follow only the
  `Docs PR Reviewer Instructions` and `Auto-PR Loop Review Subset` sections plus
  the repository-specific notes.
- If the task brief conflicts with generic guidance here, the task brief wins.
- Do not silently switch roles. A writer does not self-approve. A reviewer does
  not rewrite the PR directly unless the task brief explicitly asks for it.

---

## Shared Objective

Ensure every merged PR is **factually correct** and **intended for public
documentation**, while minimizing human reviewer time.

- **Precision**: No incorrect documentation gets merged.
- **Recall**: No correct PR gets unnecessarily blocked.
- **Efficiency**: Surface only what humans need to decide; handle the rest autonomously.

---

## Docs Auto-PR Writer Instructions

### Writer Objective

Turn an eligible docs issue into a **small PR that is straightforward to review** and is consistent
with the current docs and with the actual RisingWave implementation.

### Writer Workflow

1. **Check eligibility first**
   - Prefer issues with clear scope: broken links, typos, missing examples,
     missing option docs, or tightly scoped factual corrections.
   - Do not auto-fix issues whose required scope is still unclear after reading
     the issue body and linked context.

2. **Read the existing docs before changing anything**
   - Identify the page’s reader intent, abstraction level, and neighboring
     sections.
   - Extend the existing structure when it fits; create a new page only if the
     current page would become semantically overloaded.

3. **Cross-check with `risingwavelabs/risingwave`**
   - Verify parameter names, defaults, SQL syntax, feature scope, and examples
     against the source code before editing docs.
   - If runtime verification is feasible for the documented behavior, use it.

4. **Keep the change minimal**
   - Modify only the files needed to resolve the issue.
   - Do not opportunistically refactor unrelated wording, structure, or style.

5. **Do not give up early**
   - First inspect the docs repo.
   - Then inspect the RisingWave source code.
   - Then do the smallest verification needed.
   - Only stop and hand back to a human if you still cannot form a concrete,
     defensible documentation change.

### Writer PR Requirements

- Use a focused branch name, for example `docs/fix-issue-<number>`.
- Open a PR that references the issue and uses a closing phrase such as
  `Closes #<number>` when appropriate.
- Keep the PR description factual: what changed, what evidence was used, and
  any remaining limits.

---

## Docs PR Reviewer Instructions

### Reviewer Objective

Audit docs PRs rigorously enough that only factually correct and publicly
intended documentation changes reach human merge review.

### Full Manual Review Pipeline

```
Phase 1: Independent Review (two agents in parallel, blind to each other)
    Agent A ──→ Report A
    Agent B ──→ Report B

Phase 2: Adversarial Cross-Check (each agent reviews the other's report)
    Agent A reads Report B ──→ Challenges / Validates
    Agent B reads Report A ──→ Challenges / Validates

Phase 3: Duplicate Detection
    Identify overlapping PRs → Recommend which to keep / close

Phase 4: Human Decision
    Both agree 🟢       ──→  Auto-merge candidate
    Disagreement / 🟡🔴 ──→  Structured report → Human decides
```

---

## Phase 1: Independent Review

### Step 1 — CI & Build Check

Verify that CI workflows pass (lint, build, link checks). Flag any failures as blockers.

### Step 2 — Documentation Intent Check

Before evaluating content, determine whether this feature **should** be publicly documented.

1. **Find the original RisingWave PR** referenced in the docs PR body or title.
2. **Read the RW PR description and comments** for signals:
   - `internal`, `customer-specific`, `experiment`, `temporary`, `hack`, `do not expose`
   - Labels like `experimental`, `internal`, `do-not-document`
3. **Read source code inline comments** for:
   - `// TODO: remove`, `// hack`, `// temporary`, `// internal only`
   - Feature flags marked as hidden or internal
4. **Decision**:
   - If the RW PR or code explicitly says do not expose → mark 🔴 **Should NOT be documented**, recommend closing the docs PR.
   - If no signal but the feature looks like an internal workaround → mark 🟡, escalate to human.
   - If clearly a public feature → proceed to Step 3.
   - If no RW PR reference and intent is unclear → mark as `unknown_intent`, do not auto-merge.

### Step 3 — Semantic Review of the Diff

Read the full PR diff and evaluate:

- **Factual accuracy**: Do parameter names, default values, SQL syntax, and behavioral descriptions match the code?
- **Completeness**: Are all **publicly intended** parameters documented? Are any **internal-only** parameters being incorrectly exposed?
- **Consistency**: Do changes contradict other parts of the documentation?
- **Clarity**: Is the language clear and unambiguous for end users?
- **Placement**: Does the content belong on this page? Ask: *"What reader intent does this page serve, and does what's being added serve the same intent?"* Topic relevance alone is not sufficient — the abstraction level, reader role, and reading purpose must also match. If content fits none of the existing pages well, the right answer is a new page, not the closest approximation. "Related topics" is a same-level cross-reference, not a catch-all; new bullets must match the abstraction level of the existing bullets on that page.

### Step 4 — Cross-Validation Against Source Code

For each non-trivial claim in the PR, verify against `risingwavelabs/risingwave` source:

- Parameter names and types
- Default values
- SQL syntax and keywords
- Behavioral descriptions (e.g., "this feature does X when Y")

For each claim, classify as:
- **VERIFIED**: Confirmed against source code with specific file/line reference.
- **UNVERIFIED**: Could not confirm (state what you tried).
- **INCORRECT**: Found contradicting evidence (cite the evidence).

### Step 5 — Runtime Verification Against a RisingWave Instance

When the PR documents executable behavior (SQL syntax, function output, parameter effects), verify by running against a live RisingWave instance:

1. Connect to a RisingWave instance (dev or nightly build matching the documented version).
2. Run the exact SQL statements or configurations shown in the PR.
3. Verify that query results, error messages, default values, and behavioral descriptions match.
4. Test edge cases if the docs describe boundary behavior.

**What to verify at runtime:**
- SQL syntax validity (does the statement parse and execute?)
- Function return values and types
- Default parameter values
- Error messages and error conditions
- CREATE/ALTER statement behavior
- System catalog schema (column names, types)

**When runtime verification is not feasible** (fall back to Step 4 only):
- Infrastructure-dependent features (CDC connectors requiring external databases)
- Cloud-only features (RisingWave Cloud specific)
- Deployment/operational procedures
- Features not yet available in the current nightly build

### Step 6 — Risk Grading

- 🟢 **Low risk** — Changes are accurate, complete, and consistent. Safe to merge.
- 🟡 **Medium risk** — Minor issues found (e.g., missing navigation entry, unclear wording, unverified defaults). Fixable, needs attention.
- 🔴 **High risk** — Factual errors, contradictions with source code, internal-only features exposed, or missing critical information. Requires human review.

### Step 7 — Structured Audit Report

Post a comment on the PR with:

```markdown
## Audit Report

**PR**: #<number> — <title>
**Author**: <author>
**Risk Level**: 🟢 / 🟡 / 🔴
**Documentation Intent**: public / unknown_intent / should_not_document
**Original RW PR**: #<number> by @<committer> (or "N/A — docs-only")

### Findings

#### Finding 1: <short description>
- **Claim**: <what the PR states>
- **Evidence**: <what the source code / runtime test / existing docs say>
- **Verdict**: VERIFIED / UNVERIFIED / INCORRECT

#### Finding 2: ...

### Recommendation
<Merge as-is / Merge after fixes / Requires human review / Should not be documented>
```

---

## Phase 2: Adversarial Cross-Check

Each agent reviews the other agent's report. The prompt for cross-checking must be **adversarial, not collaborative**:

> Your job is to find mistakes in the other reviewer's report, not to agree with them.
>
> For each finding in their report:
> 1. Do you agree with their verdict? If not, show counter-evidence.
> 2. Did they actually verify their claim, or just assert it?
>
> What did they miss? Specifically check:
> - Claims they marked VERIFIED: Did they cite specific code, or assume?
> - Claims they didn't flag: Are any of these actually wrong?
> - Documentation intent: Did they check the original RW PR for internal/experimental signals?

Post a cross-review comment:

```markdown
## Cross-Review Report

**Original Reviewer**: <agent name>
**Cross-Reviewer**: <agent name>

### Original Verdict
<risk level and summary>

### Cross-Review Verdict
✅ Agree / ⚠️ Partially Disagree / ❌ Disagree — <explanation>

### Missed Findings
<issues the original reviewer overlooked, or "None">

### Disagreements
<findings where you disagree with the original verdict, with evidence>

### Final Recommendation
<merged recommendation>
```

### Adaptive Depth

- **One cross-check round** is sufficient for most PRs.
- **Add a second round** (third agent as tie-breaker) if:
  - The cross-check produced disagreements (not just new findings)
  - The PR is 🔴 high-risk
  - The PR touches multiple domains (SQL + Kubernetes + monitoring)

---

## Phase 3: Duplicate Detection

Before merging, identify groups of PRs that modify the same files or address the same issue:

- Compare scope and correctness
- Recommend which PR to keep and which to close
- Flag any unique fixes in the "losing" PR that should be cherry-picked

---

## Phase 4: Human Decision

After both rounds of review, PRs are categorized:

- **Auto-mergeable** (🟢, both agents agree): Queue for merge.
- **Needs minor fixes** (🟡): Apply suggested fixes, then merge.
- **Needs human judgment** (🔴 or agent disagreement): Escalate with full context.

Request the original RW committer as reviewer on every PR that has a corresponding RW PR.

---

## Auto-PR Loop Review Subset

When the reviewer is invoked by the automated docs issue -> PR loop, do **not**
run the entire manual review pipeline above.

In the auto-PR loop, use this narrower subset:

- Use the intent, semantic, source-validation, and runtime-validation standards
  from **Phase 1, Steps 2-6**.
- Do **not** run adversarial multi-agent cross-checking by default.
- Do **not** treat `pass` as an org-level approval or auto-merge signal.
- Output one of:
  - `pass`: the PR is good enough to move to `awaiting_human_merge`
  - `revise`: there are concrete, actionable fixes the writer should make
  - `escalate`: only after exhausting repo inspection, source inspection, and
    feasible verification, and still being unable to form a responsible
    `pass` or concrete `revise`

### Review Loop Policy

- Prefer `revise` over `escalate`.
- `revise` feedback must be concrete enough that the writer can act on it
  without guessing.
- Treat `escalate` as a last resort, not a convenience exit.
- Keep escalate reason codes narrow and hard to trigger. The initial allowed
  reasons are:
  - `non_converging_after_max_rounds`
  - `unable_to_verify_with_available_evidence`

---

## Key Principles

1. **Evidence over opinion** — Every finding must cite specific code, runtime results, or docs as evidence.
2. **Source of truth is the code** — When docs and code disagree, the code is correct.
3. **Not everything should be documented** — Check documentation intent before checking accuracy. Internal, customer-specific, and experimental features should not be in public docs.
4. **Verify by running when possible** — Static code reading catches most issues, but runtime verification catches behavioral mismatches that code review alone misses.
5. **Independence before collaboration** — Agents must not see each other's output during Phase 1. Anchoring bias destroys the value of cross-checking.
6. **Adversarial cross-check** — A collaborative prompt produces rubber-stamping. An adversarial prompt produces genuine scrutiny.
7. **Structured output** — Standardized reports make batch processing feasible for human reviewers.
8. **Duplicate awareness** — Bot-generated PRs frequently overlap; merging both causes conflicts.

---

## Repository-Specific Notes

- Navigation config is in `docs.json`.
- The docs framework is Mintlify-based.
- Cross-validate against `risingwavelabs/risingwave` source code for all technical claims.
