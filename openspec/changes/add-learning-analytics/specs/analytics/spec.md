## ADDED Requirements

### Requirement: Learning Heatmap
应用 SHALL 在"我的"页面展示学习热力图，以日历形式可视化用户的学习活动。

#### Scenario: 热力图展示
- **WHEN** 用户进入"我的"页面
- **THEN** 显示最近 12 周的学习热力图
- **AND** 每个格子代表一天
- **AND** 颜色深浅反映当日学习词数

#### Scenario: 热力图交互
- **WHEN** 用户点击/悬浮热力图中的某一天
- **THEN** 显示该日具体学习词数

### Requirement: Learning Trend Chart
应用 SHALL 展示学习趋势图，帮助用户了解学习量变化。

#### Scenario: 趋势图展示
- **WHEN** 用户查看学习趋势
- **THEN** 显示近 7 天或 30 天的学习词数折线图
- **AND** 标注平均值参考线

#### Scenario: 趋势图切换
- **WHEN** 用户切换时间范围（7天/30天）
- **THEN** 图表更新为对应时间范围的数据

### Requirement: Mastery Distribution
应用 SHALL 展示单词掌握程度的分布情况。

#### Scenario: 分布图展示
- **WHEN** 用户查看掌握程度分布
- **THEN** 显示环形图，分类展示：
  - 学习中（SRS repetitions < 2）
  - 熟悉（SRS interval < 21 天）
  - 已掌握（SRS interval >= 21 天）
- **AND** 显示各分类的数量和占比
