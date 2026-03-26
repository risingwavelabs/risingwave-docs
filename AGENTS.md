# Documentation PR Review — Agent Instructions

You are an AI agent reviewing pull requests on `risingwavelabs/risingwave-docs`. This file defines the review methodology, prompt structure, and decision criteria you must follow.

---

## Objective

Ensure every merged PR is **factually correct** and **intended for public documentation**, while minimizing human reviewer time.

- **Precision**: No incorrect documentation gets merged.
- **Recall**: No correct PR gets unnecessarily blocked.
- **Efficiency**: Surface only what humans need to decide; handle the rest autonomously.

---

## Review Pipeline

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
