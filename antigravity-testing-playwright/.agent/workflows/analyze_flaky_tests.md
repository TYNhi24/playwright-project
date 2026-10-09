---
description: QA workflow for analyze flaky tests.
skills:
  - flaky_test_analyzer
---

# analyze flaky tests

**Trigger:** Khi người dùng yêu cầu analyze flaky tests. **Automation stack:** TypeScript + `@playwright/test` + Playwright.
**Dependencies:** `.agent/skills/flaky_test_analyzer/SKILL.md` và rules liên quan trong `.agent/rules/`.

## Input

Nhận tài liệu, URL, test case, API spec hoặc Playwright artifact phù hợp. Dùng `[BASE_URL]`, `[REQUIREMENT_PATH]`, `[TEST_CASE_PATH]`. Không hỏi framework/runner. Khi cần Jira/Xray/site, xác minh quyền; secrets chỉ qua secret store/environment.

## Các bước

1. Nạp skill; kiểm tra nguồn, scope, quyền và thay đổi repo hiện có.
2. Ghi facts, assumptions, gaps, ambiguity và risk; hỏi làm rõ khi expected behavior chưa đủ.
3. Thực hiện tác vụ, giữ traceability requirement → risk → scenario/case → automation. UI phải inspect trang/DOM thật trước locator; API dùng `APIRequestContext`.
4. Automation dùng semantic locator, fixture/object phù hợp, auto-waiting và web-first assertions. Không hard sleep/`page.waitForTimeout()`.
5. Kiểm tra output, links, secrets, dependencies. Không tự cài package/gọi dịch vụ ngoài nếu chưa yêu cầu.

## Task-specific checks

Classify assertion/product defect separately from timing or infrastructure noise. Compare runs, inspect trace and network evidence, identify root cause, limit self-fix to two focused changes, then report reproducibility.

## Output

Trả artifact phù hợp: requirement/AC/Q&A/risk, trace matrix, test plan/cases/data, locator evidence, Playwright tests, diagnosis/fix, report hoặc integration mapping. Nêu coverage, artifacts, limits và điều chưa xác minh.
