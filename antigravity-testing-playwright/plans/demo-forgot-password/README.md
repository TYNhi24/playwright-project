# Demo E2E: email sai định dạng trên Forgot Password

Demo này minh họa một yêu cầu nhỏ đi qua phân tích QA, manual test, automation và CI. Đây là yêu cầu mẫu dùng để thực hành; cần xác nhận lại với chủ sản phẩm trước khi xem là đặc tả nghiệp vụ chính thức.

## 1. Yêu cầu mẫu

**ID:** `DEMO-FP-001`  
**Là** người dùng chưa đăng nhập, **tôi muốn** hệ thống từ chối email sai định dạng trên trang Forgot Password, **để** tôi sửa địa chỉ trước khi gửi yêu cầu khôi phục.

## 2. Phân tích

### Phạm vi

- Trang: `/admin/authentication/forgot_password`.
- Trường hợp: nhập chuỗi không đúng định dạng email rồi gửi form.
- Ngoài phạm vi: xác minh email tồn tại, gửi email khôi phục, nội dung email và luồng đặt lại mật khẩu.

### Giả định

- Form dùng kiểm tra định dạng email phía trình duyệt.
- Khi dữ liệu không hợp lệ, trình duyệt chặn submit và vẫn ở trang Forgot Password.
- Thông báo validation gốc của trình duyệt có thể khác ngôn ngữ theo môi trường; test chỉ kiểm tra trạng thái không hợp lệ, không so khớp câu chữ.

### Acceptance criteria

| ID | Tiêu chí chấp nhận |
| --- | --- |
| `AC-1` | Khi nhập `emailkhonghople` và bấm Confirm, trình duyệt đánh dấu trường email không hợp lệ. |
| `AC-2` | Form không được gửi và người dùng vẫn ở trang Forgot Password để sửa email. |

### Rủi ro và mức độ

- **Trung bình:** nếu bỏ validation, dữ liệu sai có thể được gửi tới server và gây trải nghiệm lỗi.
- **Thấp:** câu chữ native validation khác nhau giữa browser/ngôn ngữ; automation không assert nội dung cụ thể.
- Có thể tự động hóa ổn định vì điều kiện kiểm tra dựa trên validity của input và URL, không phụ thuộc tài khoản hay email nhận được.

## 3. Manual test case

**ID:** `MTC-DEMO-FP-001` — Map tới `DEMO-FP-001`, `AC-1`, `AC-2`  
**Ưu tiên:** Medium  
**Tiền điều kiện:** ứng dụng demo truy cập được; mở được trang Forgot Password.

| Bước | Thao tác | Kết quả mong đợi |
| --- | --- | --- |
| 1 | Mở `/admin/authentication/forgot_password`. | Trang Forgot Password hiển thị trường Email và nút Confirm. |
| 2 | Nhập `emailkhonghople` vào Email. | Giá trị được nhập vào trường. |
| 3 | Bấm Confirm. | Trình duyệt báo trường không hợp lệ; form không gửi; URL vẫn là trang Forgot Password. |

**Kết quả thực tế:** ghi lại khi chạy manual.  
**Trạng thái:** Not Run.

## 4. Automation và traceability

Automation đã có tại [`tests/specs/forgot-password.spec.ts`](../../../tests/specs/forgot-password.spec.ts), test `CRM_LOGIN_TC_022`. Test dùng `FORGOT_PASSWORD_DATA.invalidFormatEmail` trong `tests/fixtures/data/test-data.ts`, kiểm tra native validation message và xác nhận vẫn ở trang Forgot Password.

| Requirement | Acceptance criteria | Manual case | Automation |
| --- | --- | --- | --- |
| `DEMO-FP-001` | `AC-1`, `AC-2` | `MTC-DEMO-FP-001` | `CRM_LOGIN_TC_022` |

Chạy riêng case demo:

```bash
npx playwright test tests/specs/forgot-password.spec.ts -g "CRM_LOGIN_TC_022"
```

## 5. CI

Workflow [`.github/workflows/playwright.yml`](../../../.github/workflows/playwright.yml) chạy `npm test` khi push, pull request hoặc chạy thủ công qua `workflow_dispatch`. Lệnh này chạy toàn bộ suite Playwright, trong đó có `CRM_LOGIN_TC_022`; CI cài Chromium trước khi chạy và lưu Playwright/Allure report làm artifact.

Khi demo qua pull request:

1. Đưa thay đổi automation lên branch và mở pull request.
2. GitHub Actions chạy job `test`.
3. Xác nhận bước **Run Playwright tests** thành công.
4. Nếu cần kiểm tra chi tiết, tải artifact `playwright-report` hoặc `allure-report` từ lần chạy workflow.

## Giới hạn

Yêu cầu và manual case ở đây là ví dụ minh họa. CI phụ thuộc ứng dụng demo tại `https://crm.anhtester.com` hoặc `BASE_URL` đã cấu hình còn hoạt động và truy cập được từ runner.
