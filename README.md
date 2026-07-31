# AI实验室 DIY 智能办公室方案与实施

这是办公室智能化改造项目的文档源仓库。项目资料以 Markdown 维护，并通过 VitePress 生成可本地预览的文档站。

在线文档：https://renhedata.github.io/ai-lab-smart-office/

## 本地预览

```bash
npm install
npm run docs:dev
```

打开终端显示的本地地址（默认是 `http://localhost:5173`）。

## 构建静态站点

```bash
npm run docs:build
```

生成的静态文件在 `docs/.vitepress/dist/`，可部署到 GitHub Pages、公司 NAS 或任意 Web 服务器。

## 生成二维 CAD 底图

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements-cad.txt
.venv/bin/python scripts/generate_office_floorplan.py
```

生成的 DXF、SVG、PDF 和 PNG 位于 `docs/public/layout/`。图纸当前为照片转绘初稿，内部尺寸和门窗位置须经现场复核后再修改生成脚本中的坐标。

## 文档约定

- 方案、设备配置、决策和验收标准应直接维护在 `docs/`。
- 图纸源文件放 `diagrams/`，并在文档中引用其导出图或链接。
- 大文件（CAD、视频、扫描件、合同）不提交 Git；保存到 NAS/对象存储，并在相应 Markdown 中放链接和版本号。
- 任何影响预算、拓扑、施工或自动化逻辑的变更，先创建 Issue，再通过 Pull Request 审核并合并。
