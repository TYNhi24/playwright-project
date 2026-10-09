# Quy tắc Playwright

Scope: UI/API automation, browser inspection và debug. Stack duy nhất: Playwright + TypeScript + `@playwright/test`.
- Khảo sát trang thật trước locator; không đoán hoặc chép locator chưa xác minh.
- Ưu tiên `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`, `getByTestId`, CSS ổn định; XPath cuối.
- Dùng auto-waiting và web-first `expect`; không hard sleep/`page.waitForTimeout()`.
- API test dùng `request` fixture/`APIRequestContext` trong Playwright Test.
- Debug bằng trace, screenshot, video, console/network evidence; không đưa dữ liệu nhạy cảm vào report.
- Desktop debug mặc định 1920x1080; CI headless, local headed khi cần.
- HTML mặc định; JSON/JUnit tùy chọn. Lưu report và test-results làm artifacts khi phù hợp.
