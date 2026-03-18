# Discord Bot Plugin Market

[简体中文](README.md) | [English](README.en.md)

这是 `discord-` 宿主的静态插件市场前端，使用 Vue 3 + Vite 构建，并部署到 GitHub Pages。

站点目标很直接：
- 只收录 GitHub 插件链接和元数据，不托管插件源码包。
- 提供适合人类浏览的市场首页，同时给 bot 暴露同一份 `index.json`。
- 让宿主通过 `PLUGIN_MARKET_INDEX_URL` 读取市场索引，在 `/plugin` 面板里展示市场预览和外链入口。

## 仓库内容

- `public/index.json`: 市场索引，网页和 bot 共用。
- `src/`: Vue 前端源码。
- `src/styles/*.css`: 分离的样式文件。
- `.github/ISSUE_TEMPLATE/plugin-submission.yml`: 插件上架表单。
- `.github/workflows/deploy.yml`: GitHub Pages 自动部署。

## 本地开发

```bash
npm install
npm run dev
```

构建静态站点：

```bash
npm run build
```

## 插件提交流程

GitHub Pages 本身没有后端写入能力，所以“所有人都可以上传”的现实做法是：

1. 先把插件发布到公开的 GitHub 仓库。
2. 使用仓库里的 `Plugin Submission` issue 表单提交元数据。
3. 维护者审核后，把条目写进 `public/index.json`。

这样依然满足“市场只存 GitHub 链接”和“bot 可互联”这两个核心目标，而且不会引入额外后端。

## 与 bot 联动

bot 侧配置：

```env
PLUGIN_MARKET_INDEX_URL=https://qqqyyyhhh8-del.github.io/discord-bot-market/index.json
```

配置后，主仓库里的 `/plugin` 面板会读取这份索引，显示市场概览，并提供市场主页和提交通道按钮。

## 许可证

本仓库使用 [MIT License](LICENSE)。

