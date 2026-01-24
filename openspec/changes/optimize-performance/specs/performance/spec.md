## ADDED Requirements

### Requirement: Global Words Context
应用 SHALL 提供全局词库 Context，在应用启动时加载一次词库数据，供所有页面共享使用。

#### Scenario: 词库数据加载
- **WHEN** 应用首次启动
- **THEN** WordsProvider 加载 `/words.json` 一次
- **AND** 所有子组件可通过 `useWords()` 获取词库数据

#### Scenario: 跨页面数据共享
- **WHEN** 用户从首页导航到学习页面
- **THEN** 学习页面直接使用已加载的词库数据
- **AND** 不触发新的网络请求

### Requirement: Route Code Splitting
应用 SHALL 实现路由级代码分割，非首屏路由延迟加载以减少首屏 bundle 体积。

#### Scenario: 首屏加载
- **WHEN** 用户首次访问应用首页
- **THEN** 只加载首页相关代码
- **AND** 其他路由代码不包含在初始 bundle 中

#### Scenario: 路由切换加载
- **WHEN** 用户导航到未加载的路由
- **THEN** 显示加载状态
- **AND** 动态加载该路由代码
- **AND** 加载完成后渲染页面

### Requirement: Component Render Optimization
关键组件 SHALL 使用 React.memo 和 useMemo 优化，避免不必要的重渲染。

#### Scenario: 列表项优化
- **WHEN** 父组件状态变化但列表项 props 未变
- **THEN** 列表项组件不触发重渲染

#### Scenario: 派生数据缓存
- **WHEN** 组件需要计算派生数据（如过滤、排序）
- **THEN** 使用 useMemo 缓存计算结果
- **AND** 只在依赖变化时重新计算
