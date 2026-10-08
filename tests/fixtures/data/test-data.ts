// src/data/users.ts
// Test data cho CRM Login module — unique, traceable

export const VALID_USER = {
  email: 'admin@example.com',
  password: '123456',
};

export const INVALID_USERS = {
  wrongPassword: {
    email: 'admin@example.com',
    password: 'SaiMatKhau_20261002',
  },
  wrongEmail: {
    email: 'wrong_admin_20261002@example.com',
    password: '123456',
  },
  nonExistentEmail: {
    email: 'notexist_20261002@example.com',
    password: 'WrongPass_20261002',
  },
};

export const SECURITY_PAYLOADS = {
  sqlInjectionEmail: `' OR 1=1 --`,
  sqlInjectionPassword: `' OR '1'='1`,
  xssEmail: `<script>alert('XSS_20261002')</script>`,
};

export const LONG_DATA = {
  email: 'a'.repeat(989) + '@example.com',   // 1001 ký tự tổng
  password: 'Aa1!' + 'x'.repeat(997),         // 1001 ký tự tổng
};

export const FORGOT_PASSWORD_DATA = {
  validEmail: 'admin@example.com',
  nonExistentEmail: 'khongtontai_20261002@example.com',
  invalidFormatEmail: 'emailkhonghople',
};

export const ERROR_MESSAGES = {
  invalidCredentials: 'Invalid email or password',
  emailRequired: 'The Email Address field is required.',
  passwordRequired: 'The Password field is required.',
};

export const URLS = {
  login: '/admin/authentication',
  dashboard: '/admin/',
  forgotPassword: '/admin/authentication/forgot_password',
  logout: '/admin/authentication/logout',
};
