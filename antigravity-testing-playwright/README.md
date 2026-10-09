# Playwright QA Testing Kit

Bộ kit QA tái sử dụng từ requirement intake đến automation và báo cáo. Mọi UI/API automation dùng TypeScript, `@playwright/test` và Playwright. Requirement, phân tích rủi ro, manual test case và test data độc lập runner.

## Luồng QA
1. Nhận requirement từ tài liệu, story, Jira, website hoặc thiết kế; ghi nguồn và giả định.
2. Phân tích ambiguity, câu hỏi, acceptance criteria, rủi ro và phạm vi.
3. Phân rã module, traceability và coverage/risk.
4. Thiết kế scenario, manual test case, ma trận tổ hợp và test data.
5. Đánh giá automation suitability; inspect UI/DOM thật trước locator.
6. Thiết kế fixture, Page/Component Object, UI/API test bằng Playwright Test.
7. Chạy, debug, phân tích flaky test có giới hạn, xuất report/artifact.
8. Tích hợp CI và tùy chọn Jira/Xray, Google Sheets hoặc Excel.

## Cấu trúc
- `.agent/rules/`: quy tắc QA, Playwright, locator và API.
- `.agent/skills/`: requirement, test design, data, framework, UI recon, healing, flaky, integrations.
- `.agent/workflows/`: workflow theo tác vụ QA.
- `plans/`: quy trình manual, automation và cross-module.
- `prompt_templates/`: prompt dùng nhanh.
- `practices/`: requirement và test case mẫu; nội dung nghiệp vụ được giữ nguyên.
- `scripts/`: tiện ích Excel và integration Jira/Xray, Google Sheets.

## Dùng trong dự án khác
Copy `.agent/`, `plans/`, `prompt_templates/` và `practices/` mẫu cần thiết. Tạo Playwright project theo quy trình dependency của dự án; cấu hình `playwright.config.ts`, `tests/`, `playwright-report/` và `test-results/`. Không chép credentials. Dùng `.env.example` làm danh sách biến, lưu giá trị thật trong secret store/environment và giữ `.env` ngoài Git.

## Chạy Playwright
```bash
npm ci
npx playwright install --with-deps
npx playwright test
npx playwright show-report
```
Đặt `baseURL` qua cấu hình hoặc `[BASE_URL]`. CI nên lưu `playwright-report/` và `test-results/` khi phù hợp. Mỗi integration có dependency/hướng dẫn riêng; chỉ chạy khi cần và đã review quyền truy cập. Workflow gọi lại cho consumer nằm tại `.github/workflows/playwright.yml`; gọi workflow này từ project có `package-lock.json`, `playwright.config.ts` và test suite. Review artifact trước khi chia sẻ vì trace/screenshot có thể chứa dữ liệu môi trường.

Workflow ở `.agent/workflows/`. Skill trong frontmatter phải tồn tại ở `.agent/skills/<name>/SKILL.md`. Quy trình dài ở `plans/`, prompt nhanh ở `prompt_templates/`, mẫu nghiệp vụ ở `practices/`.
