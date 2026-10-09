---
name: jira_integration
description: Tích hợp Jira/Xray cho QA.
---

# Tích hợp Jira/Xray cho QA

**Scope:** Tích hợp Jira/Xray cho QA. **Trigger:** Khi tác vụ tương ứng được yêu cầu.
**Input:** Requirement/case/UI/API/repo phù hợp; dùng placeholder cho URL và user.
**Output:** Deliverable traceable, có evidence, risk, assumptions và điều chưa xác minh.
**Limits:** Không bịa behavior/locator, không in credentials, không tự cài package/gọi dịch vụ ngoài.

## Trọng tâm kỹ năng

Giữ source issue key/link, mapping test ID và report. Chỉ dùng script hiện có sau khi người dùng yêu cầu thao tác dịch vụ.

## Quy trình

1. Xác định phạm vi, evidence, thiếu hụt và risk.
2. Làm theo rules liên quan, nối source tới output.
3. Tạo kết quả có thể review; nêu open questions.
4. Kiểm tra dependency và báo cách xác nhận.

Automation dùng TypeScript, `@playwright/test` và Playwright. API dùng `APIRequestContext`; locator phải inspect từ UI thật.
