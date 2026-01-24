## ADDED Requirements

### Requirement: Unit Testing Framework
项目 SHALL 集成 Vitest 单元测试框架，支持运行自动化测试。

#### Scenario: 运行测试
- **WHEN** 开发者执行 `npm run test`
- **THEN** Vitest 运行所有单元测试
- **AND** 输出测试结果和通过/失败数量

#### Scenario: 测试覆盖率
- **WHEN** 开发者执行 `npm run test:coverage`
- **THEN** 生成测试覆盖率报告
- **AND** 显示各文件的覆盖率百分比

### Requirement: Core Algorithm Tests
项目 SHALL 包含 SRS 算法的单元测试，验证间隔重复计算的正确性。

#### Scenario: SRS 进度更新测试
- **GIVEN** 一个初始化的 SRS 进度
- **WHEN** 以不同 quality 值（0-5）更新进度
- **THEN** interval 和 easinessFactor 按 SM-2 算法正确计算

#### Scenario: 到期判断测试
- **GIVEN** 一个 nextReview 为过去时间的进度
- **WHEN** 调用 isDue()
- **THEN** 返回 true

### Requirement: Storage Operations Tests
项目 SHALL 包含存储操作的单元测试，验证数据持久化的正确性。

#### Scenario: 进度存取测试
- **WHEN** 保存 SRS 进度到 localStorage
- **AND** 读取 SRS 进度
- **THEN** 读取的数据与保存的数据一致

#### Scenario: 备份恢复测试
- **GIVEN** 导出的备份数据
- **WHEN** 调用 importAllData()
- **THEN** 所有学习数据正确恢复
