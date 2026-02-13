# Legal & Liability Framework

## Regulatory Status: No Specific Regime Applies

Extensive research confirmed there is **no specific regulatory regime** governing legal information publishers in the US:

- **No licensing requirement.** Publishing/selling legal information commercially requires no license.
- **No registration requirement.** Data broker registration laws (VT, CA, TX, OR) target companies selling personal consumer data. Structured representations of public statutes are not personal data.
- **No mandated accuracy standard.** No law requires legal information data to be accurate. Even the Federal Register's own XML rendering carries a disclaimer that it doesn't provide legal or judicial notice.
- **No human-in-the-loop requirement.** No law requires lawyer review or any specific QA process.
- **No specific disclosure requirements** beyond standard commercial practices.

LexisNexis, Westlaw, Bloomberg Law, LegiScan, and every law firm tracker operate under this same framework.

---

## The Three Actual Legal Risks

### 1. FTC Section 5 — Deceptive Acts or Practices
- If you market as "accurate" or "comprehensive" and the data isn't, the FTC could theoretically view this as deceptive
- Standard requires: (a) representation likely to mislead, (b) from perspective of reasonable consumer, (c) that is material to purchasing decision
- In practice: FTC has never gone after a legal information publisher for data accuracy
- **Mitigation**: Don't make accuracy claims you can't back up. Say "regularly updated" not "real-time." Say "covers 15 key AI laws" not "comprehensive coverage."

### 2. Unauthorized Practice of Law (UPL)
- The critical line: **legal information** (what the law says) vs. **legal advice** (what you should do about it)
- Product as designed stays on the information side
- Risk areas within the product:
  - **Obligations array**: Decomposing laws into discrete obligations is interpretation, but legal publishers do this routinely (headnotes, annotations, summaries)
  - **compare_jurisdictions tool**: Returning structured comparison = information. Saying "therefore you should implement X" = advice. Stay on the information side.
  - **plain_language field**: Restating requirements in plain English is accepted practice. Avoid qualifiers like "you probably need to" or "this likely means"
- Court cases (LegalZoom, Upsolve) show the line is crossed when software selects/recommends specific legal actions based on user-specific inputs. Our product doesn't do that.

### 3. Contract Law / Common-Law Negligence
- If a customer relies on data, it's wrong, and they suffer damages → potential breach of contract or negligence claim
- **Primary defense**: Well-drafted terms of service with disclaimers and liability caps
- Courts routinely enforce well-drafted limitation of liability clauses

---

## Required Protections (Priority Order)

### 1. MUST DO: Terms of Service ($1K-3K, pay a lawyer)
- "As is" disclaimer on all data
- Explicit "not legal advice" and "not a substitute for professional counsel" language
- No attorney-client or professional relationship clause
- Liability cap (typically fees paid in prior 12 months, or a fixed amount like $100)
- Indemnification clause
- Warranty disclaimer (no warranty of accuracy, completeness, fitness for purpose, currency)
- This is the single most important legal investment. Non-negotiable.

### 2. SHOULD DO: One-Time Legal Review of Initial Dataset ($2K-5K)
- Have a lawyer review the first 9-15 structured law entries before launch
- Not legally required, but:
  - Dramatically increases confidence in data accuracy
  - Marketing value ("attorney-reviewed structured data")
  - Strengthens defense if someone claims reliance on incorrect data
- Contract attorney familiar with tech/privacy law can do this

### 3. SHOULD DO: Source Citations on Every Data Point
- Link every obligation back to specific statutory citation
- Says "don't take our word for it — here's the source, go verify"
- Both a trust feature and a liability shield
- Already built into schema design (citation field on each obligation)

### 4. DON'T NEED: Ongoing Lawyer Review
- Kills economics of the business
- Instead, build rigorous agentic QA process:
  - Cross-reference structured data against primary sources
  - Automated validation (citations resolve, dates match sources, categories follow taxonomy)
  - Flag failures for human review
  - Review the flags, not every update

---

## Industry Standard Disclaimer Language (Reference)

Based on review of LexisNexis, Bloomberg, Regology, and compliance SaaS company terms:

```
The information provided through this service is for general informational 
purposes only and does not constitute legal advice. [Company] is not a law 
firm and does not provide legal services. The use of this service does not 
create an attorney-client relationship or any professional relationship 
between you and [Company].

The data is provided on an "as is" basis without warranties of any kind, 
express or implied, including warranties of accuracy, completeness, 
currency, or fitness for a particular purpose. [Company] does not warrant 
that the information is error-free or up-to-date.

You should not rely on the information provided as a substitute for legal 
advice from a qualified attorney. Always consult with a licensed attorney 
regarding any specific legal questions or compliance decisions.

In no event shall [Company] be liable for any damages arising from the use 
of or reliance on the information provided, including but not limited to 
direct, indirect, incidental, special, or consequential damages. [Company]'s 
total liability shall not exceed the fees paid by you in the twelve (12) 
months preceding the claim.
```

**Note**: This is reference language only. Actual ToS should be drafted/reviewed by a lawyer familiar with your jurisdiction and business model.

---

## Key Principle

Accuracy obligation is proportional to disclaimers and pricing. A free or low-cost developer data service with clear "as is" disclaimers and source citations has a very different risk profile than a $200K/year enterprise compliance platform marketing itself as the authoritative source of regulatory truth. **Position as the former.**
