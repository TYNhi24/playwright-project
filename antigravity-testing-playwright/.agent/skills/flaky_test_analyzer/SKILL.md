---
name: flaky_test_analyzer
description: Phân tích flaky test Playwright.
---

# Phân tích flaky test Playwright

**Scope:** Phân tích flaky test Playwright. **Trigger:** Khi tác vụ tương ứng được yêu cầu.
**Input:** Requirement/case/UI/API/repo phù hợp; dùng placeholder cho URL và user.
**Output:** Deliverable traceable, có evidence, risk, assumptions và điều chưa xác minh.
**Limits:** Không bịa behavior/locator, không in credentials, không tự cài package/gọi dịch vụ ngoài.

## Trọng tâm kỹ năng

Phân tách product defect, race, state leak, timeout, selector drift, network và môi trường; dùng trace/report, đề xuất nguyên nhân trước khi sửa.

## Quy trình

1. Xác định phạm vi, evidence, thiếu hụt và risk.
2. Làm theo rules liên quan, nối source tới output.
3. Tạo kết quả có thể review; nêu open questions.
4. Kiểm tra dependency và báo cách xác nhận.

Automation dùng TypeScript, `@playwright/test` và Playwright. API dùng `APIRequestContext`; locator phải inspect từ UI thật.
