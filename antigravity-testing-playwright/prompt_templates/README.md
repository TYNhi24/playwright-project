# Prompt templates

Prompt độc lập dùng nhanh; quy trình nhiều bước nằm trong `plans/`. Stack automation luôn là TypeScript + `@playwright/test` + Playwright. Thay placeholder bằng input, không chèn secrets.

| File | Mục đích | Workflow |
|---|---|---|
| [prompt_01_generate_requirements.txt](prompt_01_generate_requirements.txt) | Requirement, AC, ambiguity, risk | `/generate_requirements_from_website` |
| [prompt_02_generate_test_cases.txt](prompt_02_generate_test_cases.txt) | Scenario, test case, traceability | `/generate_testcases_from_requirements` |
| [prompt_03_create_framework_playwright.txt](prompt_03_create_framework_playwright.txt) | Framework Playwright TypeScript | `/generate_automation_framework` |
| [prompt_04_generate_script_playwright.txt](prompt_04_generate_script_playwright.txt) | UI test từ evidence | `/generate_automation_from_ui_flow` |
| [prompt_05_convert_manual_to_automation.txt](prompt_05_convert_manual_to_automation.txt) | Suitability/conversion | `/generate_automation_from_testcases` |
| [prompt_06_review_automation_code.txt](prompt_06_review_automation_code.txt) | Review/refactor | `/analyze_flaky_tests` |
| [prompt_07_generate_test_data.txt](prompt_07_generate_test_data.txt) | Test data | `/generate_test_data` |
| [prompt_08_analyze_flaky_tests.txt](prompt_08_analyze_flaky_tests.txt) | Flaky diagnosis | `/analyze_flaky_tests` |
| [prompt_09_generate_api_tests.txt](prompt_09_generate_api_tests.txt) | API tests từ OpenAPI | `/generate_api_tests_from_swagger` |

Prompt trùng lặp đã được hợp nhất. Dùng `[BASE_URL]`, `[TEST_USER]`, `[REQUIREMENT_PATH]`; không commit credentials.
