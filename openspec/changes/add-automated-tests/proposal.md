# Change: 添加自动化测试

## Why
项目当前无自动化测试，全靠手动测试，存在以下风险：
- 重构时容易引入回归 bug
- 难以验证边界条件和错误处理
- 无法保障关键功能的稳定性
- 缺乏代码质量保障

## What Changes

### 1. 单元测试框架
- 集成 Vitest 测试框架
- 配置测试环境（jsdom）
- 添加测试脚本到 package.json

### 2. 核心工具函数测试
- `srsAlgorithm.ts` - SM-2 算法测试
- `storageManager.ts` - 存储操作测试
- `wordParser.ts` - 单词解析测试
- `unitManager.ts` - 单元管理测试
- `useAnswerCheck.ts` - 答案检查测试

### 3. 组件测试
- 使用 @testing-library/react
- 关键组件的渲染测试
- 用户交互测试

### 4. E2E 测试（可选，后续阶段）
- Playwright 集成
- 核心用户流程测试

## Impact
- Affected specs: testing (新建)
- Affected code:
  - `package.json` - 添加测试依赖和脚本
  - `vitest.config.ts` - 新建 Vitest 配置
  - `app/utils/__tests__/*.test.ts` - 新建单元测试
  - `app/components/__tests__/*.test.tsx` - 新建组件测试
