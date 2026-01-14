# Project Context

## Purpose
德语单词智能学习系统 (Deutsch Wörter) - 一个帮助用户学习德语词汇的全栈 Web 应用，支持单词发音、拼写练习、间隔重复复习、多种测试模式等功能。

## Tech Stack
- **前端框架**: React 19 + React Router 7
- **语言**: TypeScript 5.9
- **样式**: Tailwind CSS 4 + 自定义 CSS 动画
- **构建工具**: Vite 6
- **部署平台**: Cloudflare Workers
- **图标库**: Lucide React
- **数据存储**: LocalStorage (浏览器本地存储)
- **词库格式**: JSON (`public/words.json`)

## Project Conventions

### Code Style
- 使用函数式组件和 React Hooks
- TypeScript 严格模式
- 组件文件采用 PascalCase 命名 (如 `AnswerInput.tsx`)
- 工具函数采用 camelCase 命名 (如 `storageManager.ts`)
- 路由文件使用 kebab-case 命名 (如 `practice-articles.tsx`)
- 使用 Tailwind CSS 实用类进行样式设计，复杂动画使用自定义 CSS
- 中文注释，Git commit 信息使用英文（≤120字符）

### Architecture Patterns
- **路由**: React Router 7 文件约定式路由 (`app/routes/`)
- **组件**: 可复用组件放在 `app/components/`
- **Hooks**: 自定义 hooks 放在 `app/hooks/`
- **工具函数**: 放在 `app/utils/`
- **类型定义**: 集中在 `app/types/`
- **数据脚本**: Node.js 脚本放在 `scripts/`
- **数据持久化**: 通过 `storageManager.ts` 统一管理 LocalStorage

### Testing Strategy
- 暂无自动化测试框架
- 手动测试为主
- 未来可考虑添加 Vitest 单元测试

### Git Workflow
- 主分支开发
- Commit 信息使用英文，简洁描述变更
- Commit 信息长度限制：≤120 字符

## Domain Context

### 核心概念
- **Word (单词)**: 包含德语单词、中文释义、音标、词性、单元 ID 等
- **Unit (单元)**: 每 100 个单词为一个学习单元
- **SRS (间隔重复系统)**: 使用 SM-2 算法管理复习计划
- **Mistake (错题)**: 记录用户答错的单词及错误答案

### 德语词汇特性
- **冠词**: der (阳性), die (阴性), das (中性)
- **复数形式**: 名词有复数变化，格式如 `Haus, Häuser`
- **动词变位**: 现在时、过去时、完成时各人称变化
- **音标**: IPA 国际音标格式

### 学习模式
- **顺序学习**: 按单元顺序学习单词
- **复习模式**: 复习已学单词
- **随机测试**: 随机抽取单词进行测试
- **SRS 复习**: 基于遗忘曲线的智能复习

### 测试模式
- **听力测试**: 听发音写单词
- **选择题**: 选择正确的中文/德语释义
- **中德翻译**: 看中文写德语
- **填空练习**: 补全单词
- **冠词练习**: 选择正确的冠词
- **复数练习**: 填写复数形式
- **动词变位**: 练习动词各人称形式

## Important Constraints
- **纯前端应用**: 无后端服务器，数据存储在浏览器 LocalStorage
- **离线友好**: 词库数据打包在应用中，支持离线使用
- **移动端友好**: 响应式设计，支持触屏操作
- **无用户认证**: 单机应用，无需登录
- **数据迁移**: 需支持旧版数据格式向新 SRS 格式迁移

## External Dependencies
- **Google Fonts**: Inter 字体加载
- **TTS (文字转语音)**: 使用浏览器内置 Web Speech API 进行德语发音
- **Cloudflare**: 应用托管和 CDN

## Key Files
- `public/words.json`: 词库数据（7000+ 行）
- `app/utils/srsAlgorithm.ts`: SM-2 间隔重复算法
- `app/utils/storageManager.ts`: LocalStorage 统一管理
- `app/utils/unitManager.ts`: 单元管理
- `app/utils/wordParser.ts`: 德语单词解析（提取冠词、复数等）
