# Quy tắc QA toàn cục

- Automation dùng TypeScript, `@playwright/test` và Playwright.
- Phân biệt dữ kiện quan sát, requirement và giả định; ghi câu hỏi thay vì tự thêm business rules.
- Không in/commit credential, token hoặc PII; dùng placeholder và biến môi trường.
- Không tự cài package, gọi dịch vụ ngoài, commit/push hoặc đổi dữ liệu môi trường nếu chưa được yêu cầu.
- Không đoán locator; inspect DOM thật. Ưu tiên semantic locator, CSS ổn định, XPath cuối cùng.
- Dùng auto-waiting/web-first assertions; cấm hard sleep và `page.waitForTimeout()`.
- Test độc lập, assertion theo behavior, test data riêng, cleanup phù hợp.
- Giữ nguyên mẫu nghiệp vụ và thay đổi có sẵn của người dùng. Báo validation và giới hạn.
