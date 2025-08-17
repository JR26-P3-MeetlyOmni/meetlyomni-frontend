# 测试文档

该项目包含多种类型的测试，以确保应用程序的质量和稳定性。

## 测试结构

```
tests/
├── e2e/                          # End-to-End 测试 (Playwright)
│   ├── pages/                    # Page Object Models
│   │   └── LoginPage.ts          # 登录页面 POM
│   ├── utils/                    # 测试工具类
│   │   ├── apiMocks.ts           # API 模拟工具
│   │   └── testHelpers.ts        # 测试辅助工具
│   ├── fixtures/                 # 测试数据
│   │   └── testData.ts           # 测试数据定义
│   ├── login.spec.ts             # 完整登录流程 E2E 测试
│   ├── login-basic.spec.ts       # 基础登录页面测试
│   └── setup.spec.ts             # 设置验证测试
├── README.md                     # 本文档
└──
src/features/auth/tests/
├── integration/                  # 集成测试
│   └── LoginFlow.integration.test.tsx  # 登录流程集成测试
└──
```

## 测试类型

### 1. 单元测试 (Vitest + React Testing Library)

- **位置**: 与组件同目录 (`*.test.tsx`)
- **用途**: 测试单个组件或函数的行为
- **运行**: `npm run test`

### 2. 集成测试 (Vitest + React Testing Library)

- **位置**: `src/features/auth/tests/integration/`
- **用途**: 测试多个组件或系统间的交互
- **运行**: `npm run test` (包含在单元测试中)

### 3. End-to-End 测试 (Playwright)

- **位置**: `tests/e2e/`
- **用途**: 测试完整的用户旅程和真实浏览器行为
- **运行**: `npm run test:e2e`

## 运行测试

### 前提条件

- Node.js 20+
- 已安装项目依赖: `npm install`
- 已安装 Playwright 浏览器: `npx playwright install`

### 单元测试和集成测试

```bash
# 运行所有单元测试和集成测试
npm run test

# 监视模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage

# 运行特定测试文件
npm run test -- LoginFlow.integration.test.tsx
```

### E2E 测试

#### 基础运行

```bash
# 运行所有 E2E 测试 (无头模式)
npm run test:e2e

# 运行特定测试文件
npm run test:e2e -- login.spec.ts

# 运行特定浏览器
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit
```

#### 调试模式

```bash
# 带头模式运行 (可见浏览器)
npm run test:e2e:headed

# 调试模式 (逐步执行)
npm run test:e2e:debug

# UI 模式 (可视化测试运行器)
npm run test:e2e:ui
```

#### 查看测试报告

```bash
# 查看最后一次测试的 HTML 报告
npm run test:e2e:report
```

### 在开发服务器运行时测试

```bash
# 在一个终端中启动开发服务器
npm run dev

# 在另一个终端中运行 E2E 测试
npm run test:e2e
```

## 测试配置

### Playwright 配置 (`playwright.config.ts`)

- 支持多浏览器测试 (Chrome, Firefox, Safari)
- 移动端测试 (Mobile Chrome, Mobile Safari)
- 自动启动开发服务器
- 失败时截图和录制视频
- 重试机制

### 测试覆盖的场景

#### 登录功能 E2E 测试

1. **页面加载和视觉元素**
   - 页面加载性能验证
   - 所有视觉元素正确显示
   - 响应式设计在不同屏幕尺寸下的表现

2. **表单交互和验证**
   - 用户输入功能
   - 客户端表单验证
   - 实时错误提示和清除

3. **成功登录流程**
   - 有效凭据登录
   - 加载状态显示
   - 自动跳转到 dashboard
   - localStorage token 持久化

4. **错误场景处理**
   - 无效凭据错误显示
   - 网络错误处理
   - 超时错误处理
   - 错误后重试机制

5. **认证状态持久化**
   - 页面刷新后保持登录状态
   - 无效 token 时自动登出

6. **可访问性和用户体验**
   - 键盘导航支持
   - 焦点管理
   - 基础可访问性要求
   - 防止重复提交

7. **性能和错误处理**
   - 页面加载时间验证
   - 慢网络条件下的行为
   - JavaScript 错误检测

## 最佳实践

### Page Object Model (POM)

- 使用 POM 模式组织 E2E 测试代码
- 将页面交互逻辑封装在页面类中
- 提高测试代码的可维护性和复用性

### API 模拟

- 使用 Playwright 的路由拦截功能模拟 API 响应
- 测试不同的 API 响应场景
- 避免依赖真实的后端服务

### 测试数据管理

- 使用集中的测试数据配置
- 为不同测试场景准备不同的数据集
- 每次测试前清理状态

### 等待策略

- 使用显式等待而非固定延迟
- 等待网络空闲状态确保页面完全加载
- 使用 Playwright 的自动等待机制

## 故障排除

### 常见问题

1. **测试超时**

   ```bash
   # 增加超时时间
   npm run test:e2e -- --timeout=60000
   ```

2. **浏览器无法启动**

   ```bash
   # 重新安装 Playwright 浏览器
   npx playwright install --force
   ```

3. **开发服务器连接失败**

   ```bash
   # 确保开发服务器正在运行
   npm run dev

   # 或让 Playwright 自动启动服务器
   # (已在 playwright.config.ts 中配置)
   ```

4. **查看详细日志**
   ```bash
   # 启用详细日志
   DEBUG=pw:api npm run test:e2e
   ```

### 调试技巧

1. **使用浏览器开发者工具**

   ```bash
   npm run test:e2e:debug
   ```

2. **截图和视频**
   - 失败的测试会自动截图
   - 视频保存在 `test-results/` 目录

3. **Trace 查看器**
   ```bash
   # 查看测试执行轨迹
   npx playwright show-trace test-results/trace.zip
   ```

## CI/CD 集成

项目包含 GitHub Actions 工作流 (`.github/workflows/e2e-tests.yml`) 用于在 CI 环境中运行 E2E 测试。

### CI 中的测试特性

- 在推送和 PR 时自动运行
- 生成测试报告和视频
- 失败时上传调试信息
- 支持测试重试机制

## 贡献指南

### 添加新的 E2E 测试

1. 在 `tests/e2e/` 目录下创建新的 `.spec.ts` 文件
2. 使用现有的 Page Object Models 或创建新的
3. 遵循现有的测试结构和命名约定
4. 添加适当的测试数据和 API 模拟

### 更新 Page Object Models

1. 在 `tests/e2e/pages/` 目录下更新或创建新的页面类
2. 封装页面交互逻辑
3. 提供清晰的方法名和文档注释

### 测试覆盖率要求

- 单元测试: 最低 80% 覆盖率
- 集成测试: 覆盖关键用户流程
- E2E 测试: 覆盖端到端用户旅程
