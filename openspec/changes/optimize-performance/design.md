## Context
应用当前有 20+ 个路由页面，多数都需要访问词库数据。每个页面独立 fetch `/words.json`，导致：
- 重复网络请求（虽有 SW 缓存但仍需解析）
- 每个页面独立维护 `words` state
- 无法跨页面共享搜索/过滤结果

## Goals / Non-Goals
- **Goals:**
  - 词库数据全局单例，应用生命周期内只加载一次
  - 首屏加载时间减少 30%+
  - 内存占用稳定，不随页面切换线性增长
  
- **Non-Goals:**
  - 不做服务端数据拆分（保持纯前端架构）
  - 不引入复杂状态管理库（如 Redux）
  - 不做数据库化改造

## Decisions

### Decision 1: 使用 React Context 管理词库
**Why:** 轻量级，React 原生支持，无额外依赖
**Alternatives:**
- Zustand：更强大但增加依赖
- Redux：过度设计，不适合此规模
- Jotai：原子化状态，学习成本高

### Decision 2: 路由级代码分割
**Why:** React Router 7 原生支持 `lazy()`，配置简单
**Implementation:**
```typescript
// routes.ts
import { lazy } from "react-router";

export default [
  { path: "/", lazy: () => import("./routes/home") },
  { path: "/test-listening", lazy: () => import("./routes/test-listening") },
  // ...
];
```

### Decision 3: 保持 words.json 单文件
**Why:** 
- 7000+ 行约 200KB，gzip 后 ~30KB，可接受
- 拆分增加复杂度，收益有限
- Service Worker 已缓存，二次访问无网络请求

## Risks / Trade-offs
- **Context re-render:** 
  - 风险：词库变化触发全局重渲染
  - 缓解：词库数据只读，不会变化；派生状态使用 useMemo
  
- **懒加载闪烁:**
  - 风险：路由切换时出现加载闪烁
  - 缓解：添加 Suspense fallback + 预加载常用路由

## Migration Plan
1. 创建 WordsContext，不修改现有代码
2. 逐页面迁移，使用 useWords() 替换 fetch
3. 迁移完成后，添加路由懒加载
4. 最后添加组件级 memo 优化

## Open Questions
- 是否需要词库搜索索引优化（当前线性搜索）？
- 是否考虑 IndexedDB 存储词库（离线首次访问场景）？
