# Change: 完善深色模式支持

## Why
应用代码中已广泛使用 `dark:` Tailwind 类，但缺少用户主动切换主题的入口。当前只能依赖系统偏好设置，无法在应用内控制，影响用户体验。

## What Changes

### 1. 主题切换功能
- 在"我的"页面添加深色模式切换开关
- 支持三种模式：跟随系统、始终浅色、始终深色
- 主题偏好持久化到 LocalStorage

### 2. 主题状态管理
- 创建 ThemeContext 管理主题状态
- 在 `<html>` 标签动态添加/移除 `dark` 类
- 监听系统主题变化（当设置为"跟随系统"时）

### 3. UI 适配检查
- 检查所有页面深色模式下的显示效果
- 修复可能存在的颜色对比度问题

## Impact
- Affected specs: theme (新建)
- Affected code:
  - `app/contexts/ThemeContext.tsx` - 新建主题 Context
  - `app/root.tsx` - 注入 ThemeProvider，动态 class
  - `app/routes/profile.tsx` - 添加主题切换 UI
  - `app/utils/storageManager.ts` - 添加主题存储函数
