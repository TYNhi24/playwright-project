# Quy tắc API testing bằng Playwright

Scope: API trong QA end-to-end. Runner: Playwright Test; request qua fixture/`APIRequestContext`.
- Tách request helper, type, data và assertion vừa đủ; tránh framework phụ.
- Kiểm tra status, contract/shape, business fields, headers và lỗi theo acceptance criteria. SLA chỉ khi có ngưỡng yêu cầu.
- Dùng data synthetic, unique; cleanup resource khi an toàn.
- Đọc URL/token từ environment/secret store; không log credentials/payload nhạy cảm.
- Bổ sung authorization, validation, boundary, concurrency/rate-limit khi thuộc phạm vi và môi trường cho phép.
- Không tự gửi tải lớn hoặc gọi hệ thống ngoài phạm vi.
