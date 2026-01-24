# Change: 应用性能优化

## Why
当前应用存在以下性能问题：
1. `words.json` (7000+ 行) 在每个页面都重新 fetch，造成网络浪费和内存重复占用
2. 无词库全局状态管理，每个组件独立加载数据
3. 所有路由打包在一个 bundle 中，首屏加载较慢
4. 部分组件缺少 React 性能优化（memo, useMemo, useCallback）

## What Changes

### 1. 词库全局状态管理
- 创建 `WordsContext` 统一管理词库数据
- 应用启动时加载一次，全局共享
- 支持按单元过滤、搜索等操作

### 2. 路由懒加载
- 使用 React Router 的 `lazy()` 实现代码分割
- 低优先级页面延迟加载
- 添加加载状态 UI

### 3. React 组件优化
- 关键组件使用 `React.memo` 避免不必要渲染
- 复杂计算使用 `useMemo` 缓存
- 事件处理函数使用 `useCallback` 稳定引用

### 4. 词库数据优化（可选）
- 按单元拆分 JSON 文件
- 首屏只加载当前单元数据

## Impact
- Affected specs: performance (新建)
- Affected code:
  - `app/contexts/WordsContext.tsx` - 新建全局词库 Context
  - `app/root.tsx` - 注入 WordsProvider
  - `app/routes/*.tsx` - 移除重复的 words fetch，使用 Context
  - `app/routes.ts` - 添加路由懒加载配置
  - `app/components/*.tsx` - 添加 memo 优化
