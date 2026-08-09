# AI实验室 DIY 智能办公室方案与实施

这是办公室智能化改造项目的文档源仓库。项目资料以 MDX 维护，并通过 Next.js + Fumadocs 生成文档站。站点复用 Better T Stack 文档应用的 Notebook 布局和页面操作方案；导航、搜索、侧栏、MDX 页面与主题仍由 Fumadocs 提供。

在线文档：https://renhedata.github.io/ai-lab-smart-office/

参与共创：https://renhedata.github.io/ai-lab-smart-office/docs/participation/

项目讨论：https://github.com/renhedata/ai-lab-smart-office/discussions （登录 GitHub 后可发帖和回复）

项目当前处于准备期：技术文档是规划基线，不是已批准采购/施工方案。项目协调人、公司内部快速反馈渠道、首个试点负责人和验收人未指定前，不启动试点采购；未经试点结果和推广决策，不启动批量采购。

## 提建议与贡献

- 不熟悉 GitHub：按[参与共创](https://renhedata.github.io/ai-lab-smart-office/docs/participation/)中的“30 秒反馈”描述问题，通过公司指定的内部渠道提交，由项目协调人脱敏代录。
- 针对单篇内容的纠错或补充：在文档末尾的“讨论本文”评论。
- 跨页面的建议、方案比较或使用反馈：在 GitHub Discussions 发起讨论；有明确负责人和验收条件的工作，再建立 Issue。
- 修改文档、图纸或配置：Fork 或创建分支后完成修改，运行 `npm run dev` 预览和 `npm run build` 验证，再提交 Pull Request。请说明改动原因、影响范围、关联 Issue 与验证结果。

重要取舍需使用 `DEC` 决策记录写清背景、备选、影响、反对意见、回退与复核日，并同步更新对应方案。批准、拒绝、暂缓和退役都保留原因，不删除历史记录。

不得提交密码、密钥、门禁凭证、个人信息或未经脱敏的现场资料。可公开共创资料与精确网络拓扑、资产、现场证据和原始传感器日志应分层存放；公开仓库只保留公开或脱敏内容。

## 本地预览

```bash
npm install
npm run dev
```

打开终端显示的文档地址（默认是 `http://localhost:3000/ai-lab-smart-office/docs/`）；站点根地址会直接进入这篇文档。

## 构建静态站点

```bash
npm run build
```

生成的静态文件在 `out/`，可部署到 GitHub Pages、公司 NAS 或任意 Web 服务器。

## 自动部署

推送到 `main` 会自动安装依赖、构建 `out/`，并发布到 GitHub Pages。也可以在 GitHub Actions 中手动运行“Deploy GitHub Pages”工作流。

## 生成二维 CAD 底图

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements-cad.txt
.venv/bin/python scripts/generate_office_floorplan.py
```

生成的 DXF、CAD ZIP 下载包、SVG、PDF 和 PNG 位于 `public/layout/`。图纸当前为照片转绘初稿，内部尺寸和门窗位置须经现场复核；若仓库保持公开，正式坐标、精确点位和可识别现场细节应迁入内部受限系统，公开版本只保留共创所需的示意分区。

## 文档约定

- 方案、设备配置和验收标准应直接维护在 `content/docs/`；需求、试点、决策、变更和效果分别使用 `NEED`、`EXP`、`DEC`、`CHG`、`MET` 编号并互相关联。
- 可公开的示意图源文件放 `diagrams/`；正式坐标、精确网络/点位和施工图只在内部受限系统维护，公开文档引用内部记录编号和脱敏导出图。
- 大文件（CAD、视频、扫描件、合同）不提交 Git；保存到 NAS/对象存储，并在相应 Markdown 中放链接和版本号。
- 任何影响预算、网络边界、施工或自动化逻辑的变更，先创建 `DEC` / `CHG`；公开 Pull Request 只审核脱敏结论，精确配置在内部受限流程评审。
