---
name: ui_debug_agent
description: Khảo sát và debug UI Playwright.
---

# Khảo sát và debug UI Playwright

**Scope:** Khảo sát và debug UI Playwright. **Trigger:** Khi tác vụ tương ứng được yêu cầu.
**Input:** Requirement/case/UI/API/repo phù hợp; dùng placeholder cho URL và user.
**Output:** Deliverable traceable, có evidence, risk, assumptions và điều chưa xác minh.
**Limits:** Không bịa behavior/locator, không in credentials, không tự cài package/gọi dịch vụ ngoài.

## Trọng tâm kỹ năng

Ghi URL/state/browser viewport, hành động đã thực hiện, accessible/DOM evidence, console/network signal và giới hạn quyền.

## Quy trình

1. Xác định phạm vi, evidence, thiếu hụt và risk.
2. Làm theo rules liên quan, nối source tới output.
3. Tạo kết quả có thể review; nêu open questions.
4. Kiểm tra dependency và báo cách xác nhận.

Automation dùng TypeScript, `@playwright/test` và Playwright. API dùng `APIRequestContext`; locator phải inspect từ UI thật.
