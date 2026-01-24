## 1. 词库全局状态管理

- [x] 1.1 创建 `app/contexts/WordsContext.tsx`
  - WordsProvider 组件
  - useWords() hook
  - 类型定义 (WordsContextValue)
  
- [x] 1.2 在 `app/root.tsx` 注入 WordsProvider

- [x] 1.3 迁移页面使用 Context (按使用频率排序)
  - [x] `home.tsx` - 首页
  - [x] `learn.tsx` - 学习页
  - [x] `srs-review.tsx` - SRS 复习
  - [x] `test-listening.tsx` - 听写测试
  - [x] `test-choice.tsx` - 选择题测试
  - [x] `test-cn-to-de.tsx` - 中德翻译
  - [ ] `test-cloze.tsx` - 填空测试
  - [x] `random.tsx` - 随机测试
  - [ ] `review.tsx` - 复习页
  - [ ] `flashcard.tsx` - 闪卡
  - [ ] `unit.$id.tsx` - 单元详情
  - [ ] `word.$word.tsx` - 单词详情
  - [ ] `practice-articles.tsx` - 冠词练习
  - [ ] `practice-plural.tsx` - 复数练习
  - [ ] `practice-verbs.tsx` - 动词变位
  - [ ] `practice-confusables.tsx` - 易混淆词
  - [x] `mistakes.tsx` - 错题本 (不需要迁移，不使用 words.json)
  - [x] `favorites.tsx` - 生词本

## 2. 路由懒加载

- [ ] 2.1 修改 `app/routes.ts` 配置懒加载
  - 首页保持同步加载
  - 其他页面使用 lazy()

- [ ] 2.2 添加路由加载 fallback 组件
  - 创建 `app/components/RouteLoading.tsx`
  - 在 root.tsx 配置 Suspense

- [ ] 2.3 预加载常用路由
  - learn, srs-review, test-modes 预加载

## 3. 组件性能优化

- [ ] 3.1 优化 `LearningDashboard.tsx`
  - QuickStatCard 使用 memo

- [ ] 3.2 优化 `BottomNav.tsx`
  - 整体组件使用 memo
  - navItems 使用 useMemo

- [ ] 3.3 优化 `UnitSelector.tsx`
  - 列表项使用 memo

- [ ] 3.4 优化首页单元列表渲染
  - 单元卡片使用 memo
  - 进度计算使用 useMemo

## 4. 验证与测试

- [ ] 4.1 使用 React DevTools Profiler 验证渲染次数减少
- [ ] 4.2 使用 Lighthouse 测试首屏加载性能
- [ ] 4.3 验证各页面功能正常
