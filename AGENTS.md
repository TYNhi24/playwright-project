# Hướng dẫn cho agent

## Mục tiêu

Đây là project kiểm thử giao diện web bằng Playwright, TypeScript và `@playwright/test`. Trước khi triển khai một chức năng hoặc thay đổi test, hãy đọc requirement, hiểu cấu trúc liên quan và làm theo convention sẵn có của project.

## Đọc trước khi thay đổi

1. Đọc `package.json` và `playwright.config.ts` để hiểu lệnh chạy test, cấu hình runner và thư mục test.
2. Đọc `antigravity-testing-playwright/RULE_GLOBAL.md` để nắm quy tắc chung.
3. Đọc rule trong `antigravity-testing-playwright/.agent/rules/` phù hợp với công việc:
   - `playwright_rules.md` cho test Playwright.
   - `locator_strategy.md` cho locator và tương tác UI.
   - `api_rules.md` cho API test.
   - `automation_rules.md` cho thiết kế automation.
4. Đọc các test, page object, fixture hoặc helper đang xử lý và ít nhất một ví dụ tương tự trước khi sửa.
5. Chỉ mở workflow trong `antigravity-testing-playwright/.agent/workflows/`, hướng dẫn trong `plans/` hoặc mẫu trong `prompt_templates/` khi chúng phù hợp với yêu cầu.

## Cấu trúc project

- `tests/specs/`: các test spec, được cấu hình làm `testDir`.
- `tests/pages/`: Page Object cho các trang.
- `tests/elements/`: locator và phần tử trang.
- `tests/fixtures/`: fixture và dữ liệu test.
- `tests/steps/`: các bước nghiệp vụ dùng lại.
- `tests/support/`: URL và tiện ích hỗ trợ.
- `antigravity-testing-playwright/`: QA kit gồm quy tắc, workflow, kế hoạch và prompt mẫu.
- `playwright.config.ts`: cấu hình Playwright, reporter, browser và hành vi khi test lỗi.

## Khi thực hiện yêu cầu

- Xác định yêu cầu, hành vi mong đợi và phạm vi file cần thay đổi. Nếu thiếu thông tin ảnh hưởng đến kết quả, nêu rõ giả định hoặc hỏi lại.
- Tìm convention hiện có và ưu tiên mở rộng cách tổ chức hiện tại thay vì tạo cấu trúc mới.
- Dùng TypeScript, Playwright Test và fixture/Page Object hiện có khi phù hợp.
- Với UI, kiểm tra DOM hoặc accessible tree trước khi chọn locator. Ưu tiên locator theo role, label, placeholder hoặc test id ổn định.
- Dùng auto-waiting và web-first assertions; không dùng hard sleep hoặc `page.waitForTimeout()` để đồng bộ.
- Giữ test độc lập, dữ liệu test rõ ràng và cleanup phù hợp.
- Không đưa credential, token hoặc dữ liệu nhạy cảm vào mã nguồn hay log. Dùng biến môi trường hoặc placeholder.
- Không tự cài package, gọi dịch vụ bên ngoài, thay đổi dữ liệu môi trường, commit hoặc push nếu yêu cầu không bao gồm việc đó.
- Giữ nguyên các thay đổi sẵn có của người dùng và chỉ sửa trong phạm vi cần thiết.
- Sau khi sửa, báo những gì đã thay đổi và nêu rõ kiểm tra nào đã hoặc chưa được thực hiện.

## Lệnh thường dùng

- `npm test`: chạy toàn bộ Playwright tests.
- `npm run test:ui`: chạy test UI đăng nhập.
- `npm run test:auth`: chạy test xác thực đăng nhập.
- `npm run test:forgot`: chạy test quên mật khẩu.
- `npm run test:logout`: chạy test đăng xuất.
- `npm run test:security`: chạy test bảo mật.
- `npm run report:playwright`: mở Playwright report.
