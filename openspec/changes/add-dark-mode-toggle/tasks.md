## 1. 主题状态管理

- [ ] 1.1 在 `storageManager.ts` 添加主题存储函数
  - getThemePreference(): 'system' | 'light' | 'dark'
  - setThemePreference(theme): void

- [ ] 1.2 创建 `app/contexts/ThemeContext.tsx`
  - ThemeProvider 组件
  - useTheme() hook
  - 监听系统主题变化
  - 动态更新 document.documentElement.classList

- [ ] 1.3 在 `app/root.tsx` 注入 ThemeProvider
  - 服务端渲染时设置默认主题
  - 客户端激活后应用用户偏好

## 2. 主题切换 UI

- [ ] 2.1 创建 `app/components/ThemeToggle.tsx` 组件
  - 三选一：系统、浅色、深色
  - 当前选中状态高亮
  - 切换动画效果

- [ ] 2.2 在 `profile.tsx` 页面集成主题切换
  - 添加"外观设置"区块
  - 集成 ThemeToggle 组件

## 3. 深色模式适配检查

- [ ] 3.1 检查所有页面深色模式显示
  - 首页 home.tsx
  - 学习页 learn.tsx
  - 各测试页面
  - 设置页 settings.tsx

- [ ] 3.2 修复发现的颜色对比度问题

## 4. 验证

- [ ] 4.1 测试三种主题模式切换
- [ ] 4.2 测试刷新后主题保持
- [ ] 4.3 测试系统主题变化响应
