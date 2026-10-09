# Chiến lược locator Playwright

Trigger: inspect UI, sinh/review/heal locator. Locator bắt nguồn từ DOM/accessible tree quan sát trực tiếp.
1. `getByRole(role, { name })` cho semantic elements.
2. `getByLabel`, `getByPlaceholder`, `getByText` cho form/text.
3. `getByTestId` khi test ID có sẵn/được thống nhất.
4. CSS ổn định; XPath khi không còn cách rõ ràng.

Xác minh locator đúng element, unique trong scope và đúng trạng thái. Dùng filter, locator lồng nhau hoặc scope dialog/row thay index. Thiếu evidence thì yêu cầu DOM/screenshot/quyền browser; không bịa selector.
