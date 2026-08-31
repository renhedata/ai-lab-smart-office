# AI实验室 DIY 智能办公室方案与实施

这是办公室智能化改造项目的方案库。内容以 MDX 维护，并通过 Next.js + Fumadocs 生成静态站点。

在线文档：https://renhedata.github.io/ai-lab-smart-office/

提供方案：https://github.com/renhedata/ai-lab-smart-office/issues/new?template=idea.yml

项目当前处于准备期：技术文档是规划基线，不是已批准的采购或施工方案。

## 提供方案

- 普通用户：打开[提供方案](https://github.com/renhedata/ai-lab-smart-office/issues/new?template=idea.yml)，说明问题和做法即可。
- 维护者：方案确认后更新 `content/docs/`，运行 `npm run build`，再提交 Pull Request。

不得提交密码、密钥、门禁凭证、个人信息或内部网络细节。

## 本地预览

```bash
npm install
npm run dev
```

打开站点根地址（默认是 `http://localhost:3000/ai-lab-smart-office/`）；方案目录位于 `/ai-lab-smart-office/docs/`。

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

- 已整理的方案、设备配置和验收标准直接维护在 `content/docs/`；新方案先通过 Issue 提交。
- 可公开的示意图源文件放 `diagrams/`；正式坐标、精确网络/点位和施工图只在内部受限系统维护，公开文档引用内部记录编号和脱敏导出图。
- 大文件（CAD、视频、扫描件、合同）不提交 Git；保存到 NAS/对象存储，并在相应 Markdown 中放链接和版本号。
- 影响预算、网络边界、施工或自动化逻辑的变更须在内部评审；公开 Pull Request 只保留脱敏结论。
