# Playwright automation plan

Quy trình nhiều bước: context, UI recon, Page/Component Object, test data, Playwright tests, review và flaky analysis. Giữ traceability theo module.
1. Context/scope: nguồn, actor, environment, constraints, assumptions.
2. Analysis: acceptance criteria, ambiguity/questions, dependencies, risk.
3. Decomposition: module, feature, state, integration boundary.
4. Design: risk-based scenario, manual cases, boundary/negative/combinatorial coverage, data.
5. Automation suitability: ổn định, deterministic, oracle và cleanup.
6. Automation: inspect UI thật bằng Playwright; xác minh locator; TypeScript `@playwright/test`; APIRequestContext.
7. Review/run: auto-wait, web-first assertion, không hard sleep; debug trace/report, coverage/limits.

Deliverables: requirement/AC, Q&A, risk/coverage, cases/data, traceability và (nếu áp dụng) Playwright tests + HTML/JSON/JUnit report. Stack cố định Playwright + TypeScript + Playwright Test.
