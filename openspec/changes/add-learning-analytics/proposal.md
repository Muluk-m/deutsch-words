# Change: 添加学习数据可视化

## Why
当前应用只显示基础统计数字（已学单词数、连续学习天数），缺乏：
- 学习趋势的可视化展示
- 历史学习数据的回顾
- 激励用户持续学习的数据呈现

参考主流语言学习应用（如 Duolingo、Anki），数据可视化是提升用户粘性的重要功能。

## What Changes

### 1. 学习热力图
- 日历形式展示过去 3 个月的学习活动
- 颜色深浅表示当日学习量
- 类似 GitHub 贡献图

### 2. 学习趋势图
- 折线图展示近 7/30 天学习趋势
- 显示每日学习词数变化
- 标记学习高峰和低谷

### 3. 掌握程度分布
- 饼图/环形图展示单词掌握程度分布
- 分类：新学习、熟悉中、已掌握、需复习

### 4. 学习报告
- 在"我的"页面展示学习概览
- 周报/月报数据汇总

## Impact
- Affected specs: analytics (新建)
- Affected code:
  - `app/components/LearningHeatmap.tsx` - 新建热力图组件
  - `app/components/LearningChart.tsx` - 新建趋势图组件
  - `app/components/MasteryDonut.tsx` - 新建掌握度环形图
  - `app/routes/profile.tsx` - 集成数据可视化组件
  - `app/utils/storageManager.ts` - 扩展学习数据存储结构
