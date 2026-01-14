# Change: 重构导航层级并添加核心学习功能

## Why
当前应用功能入口分散、层级混乱：首页同时承载学习统计、快速入口、语法练习、单元列表，测试入口在多处重复出现（首页快速开始、语法专练、底部导航、test-modes 页面），导致用户难以快速找到目标功能。同时缺少主流语言学习应用的核心功能（每日目标、生词本、学习统计详情）。

## 当前进度

### ✅ 已完成
- **SRS 复习页面重构** (`srs-review.tsx`)：现代化卡片布局、表情图标评分、优化的进度显示

### 🔄 进行中
- 导航层级优化
- 核心新功能开发

## What Changes

### 导航层级优化
- **底部导航调整**：首页、学习、测试、我的（新增，替换原复习 Tab）
- **首页单元列表**：改为可折叠分组展示（5 个单元一组）
- **首页仪表盘**：添加每日目标进度显示

### 新增功能
- **每日学习目标**：用户可设置每日目标（10/20/30/50 词），达成显示庆祝动画
- **生词本功能**：标记难词，支持专项复习
- **"我的" 页面**：学习统计、目标设置、生词本入口
- **德语特殊字符输入**：答题时快捷输入 ä ö ü ß

### UI 统一
- 其他页面风格统一为 `srs-review.tsx` 的现代化风格

## Impact
- Affected specs: navigation (新建)
- Affected code:
  - `app/routes/home.tsx` - 仪表盘增强、单元列表折叠
  - `app/components/BottomNav.tsx` - 添加 "我的" Tab
  - `app/components/LearningDashboard.tsx` - 添加每日目标显示
  - `app/routes/profile.tsx` - 新建 "我的" 页面
  - `app/routes/favorites.tsx` - 新建生词本页面
  - `app/utils/storageManager.ts` - 添加目标和生词本存储
  - `app/types/word.ts` - 添加相关类型定义
  - `app/components/GermanKeyboard.tsx` - 新建特殊字符输入组件

