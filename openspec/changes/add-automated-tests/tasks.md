## 1. 测试框架配置

- [ ] 1.1 安装 Vitest 及相关依赖
  - vitest
  - @testing-library/react
  - @testing-library/jest-dom
  - @testing-library/user-event

- [ ] 1.2 创建 `vitest.config.ts` 配置文件
  - jsdom 环境
  - 路径别名配置
  - 覆盖率配置

- [ ] 1.3 在 `package.json` 添加测试脚本
  - test: vitest run
  - test:watch: vitest
  - test:coverage: vitest --coverage

## 2. 核心工具函数测试

- [ ] 2.1 创建 `app/utils/__tests__/srsAlgorithm.test.ts`
  - initializeSRSProgress 测试
  - updateSRSProgress 各种 quality 值测试
  - isDue 判断测试
  - getDueWords 排序测试

- [ ] 2.2 创建 `app/utils/__tests__/storageManager.test.ts`
  - SRS 进度读写测试
  - 错题记录操作测试
  - 生词本操作测试
  - 备份/恢复功能测试

- [ ] 2.3 创建 `app/utils/__tests__/wordParser.test.ts`
  - buildPluralForm 各种复数规则测试
  - 特殊情况处理测试

- [ ] 2.4 创建 `app/utils/__tests__/unitManager.test.ts`
  - createUnits 分组测试
  - getUnitWords 过滤测试
  - getUnitProgress 计算测试

## 3. Hooks 测试

- [ ] 3.1 创建 `app/hooks/__tests__/useAnswerCheck.test.ts`
  - 大小写不敏感测试
  - 特殊字符处理测试
  - 冠词匹配测试

## 4. 组件测试

- [ ] 4.1 创建 `app/components/__tests__/GermanKeyboard.test.tsx`
  - 字符插入测试
  - 键盘渲染测试

- [ ] 4.2 创建 `app/components/__tests__/LearningDashboard.test.tsx`
  - props 渲染测试
  - 进度计算显示测试

## 5. 集成与验证

- [ ] 5.1 运行全部测试，确保通过
- [ ] 5.2 配置 CI 流程运行测试（可选）
- [ ] 5.3 生成测试覆盖率报告
