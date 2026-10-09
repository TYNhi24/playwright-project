# Quy tắc automation

Scope: Mọi UI/API automation trong kit. Stack: TypeScript, `@playwright/test`, Playwright.
- Dùng fixture và Page/Component Object khi giúp test dễ đọc/tái sử dụng; assertion theo behavior nằm trong test.
- Test độc lập, data unique/traceable, cleanup khi tạo dữ liệu có thể xóa an toàn.
- Dùng Playwright Test, auto-waiting, web-first assertions; không hard sleep hoặc `page.waitForTimeout()`.
- Không log secrets; bỏ code debug/unused. Không cài dependency ngoài yêu cầu.
