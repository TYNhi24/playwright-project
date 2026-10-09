# Hướng dẫn agent QA Playwright

Mặc định automation duy nhất là Playwright + TypeScript + `@playwright/test`; không hỏi người dùng chọn runner/ngôn ngữ/framework.

1. Đọc nguồn requirement; ghi phạm vi, giả định, ambiguity, câu hỏi và rủi ro.
2. Lập acceptance criteria kiểm chứng được; nối requirement → scenario → test case → automation.
3. Thiết kế theo risk, gồm positive, negative, boundary, permission, cross-module. Nêu manual-only cùng lý do.
4. Với UI, quan sát trang/DOM/accessible tree thật bằng Playwright trước locator.
5. Tạo test với Playwright Test, fixture và Page/Component Object khi có ích. API dùng `APIRequestContext`/fixture Playwright.
6. Chẩn đoán bằng trace, screenshot, report; sửa trong phạm vi giới hạn.
7. Báo coverage, artifact, vấn đề còn lại và giả định.

Locator ưu tiên `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`, `getByTestId`, CSS ổn định; XPath cuối. Dùng auto-waiting/web-first assertions; không hard sleep/`page.waitForTimeout()`. Bảo vệ secrets; dùng `[BASE_URL]`, `[TEST_USER]`, `[REQUIREMENT_PATH]`. Không tự cài package, gọi dịch vụ ngoài, commit hoặc push. Giữ thay đổi người dùng. Tuân theo `.agent/rules/`, nạp skill workflow yêu cầu và chỉ dùng tài nguyên còn tồn tại.
