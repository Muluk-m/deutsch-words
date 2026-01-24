## ADDED Requirements

### Requirement: Theme Preference Management
应用 SHALL 支持用户选择主题偏好，包括"跟随系统"、"浅色模式"、"深色模式"三种选项。

#### Scenario: 默认主题
- **WHEN** 用户首次访问应用
- **THEN** 主题跟随系统偏好设置

#### Scenario: 手动切换主题
- **WHEN** 用户在设置中选择"深色模式"
- **THEN** 应用立即切换到深色主题
- **AND** 偏好保存到 LocalStorage
- **AND** 刷新页面后保持深色主题

#### Scenario: 跟随系统模式
- **WHEN** 用户选择"跟随系统"
- **AND** 系统主题从浅色切换到深色
- **THEN** 应用自动切换到深色主题

### Requirement: Theme Toggle UI
应用 SHALL 在"我的"页面提供主题切换入口，允许用户方便地切换主题。

#### Scenario: 主题切换界面
- **WHEN** 用户进入"我的"页面
- **THEN** 显示"外观设置"区块
- **AND** 展示三个主题选项（系统、浅色、深色）
- **AND** 当前选中的选项高亮显示
