# Prompt building blocks

Requirement: nguồn `[REQUIREMENT_PATH]`, phạm vi `[MODULE]`; tách facts, assumptions, ambiguity, AC, risk, questions.

UI automation: `[BASE_URL]`, cases `[TEST_CASE_PATH]`; inspect DOM thật trước locator. Tạo TypeScript test với `@playwright/test`, không hard sleep.

API: `[API_SPEC_PATH]`; dùng `APIRequestContext` trong Playwright Test, kiểm tra status, contract, business behavior và negative cases.
