---
layout: home

hero:
  name: AI实验室
  text: DIY 智能办公室方案与实施
  tagline: 按“了解现状→完成设计→现场实施→验收维护”推进，让每项决定都有依据、每次变更都可追溯。
  image:
    src: /logo.svg
    alt: 智能办公室
  actions:
    - theme: brand
      text: 第一次使用，从这里开始
      link: /guide/getting-started
    - theme: alt
      text: 查看项目总览
      link: /guide/project-overview

features:
  - icon: 🧭
    title: 第一次查看
    details: 用几分钟了解这个文档库、项目路径，以及导航、搜索和页面目录的用法。
    link: /guide/getting-started
    linkText: 打开使用指南
  - icon: 📐
    title: 做方案
    details: 先核对办公室布局和现场边界，再设计网络、灯光、窗帘与环境联动。
    link: /guide/office-layout
    linkText: 从空间布局开始
  - icon: 🔧
    title: 现场实施
    details: 按开工前清单、试点范围和验收标准推进，并保留可复核证据。
    link: /management/acceptance
    linkText: 查看施工与验收
  - icon: 🗂️
    title: 维护项目
    details: 把已稳定的方案写入文档，把待办、变更、决策和验收记录放到正确位置。
    link: /guide/workflow
    linkText: 了解协作流程
---

## 项目现在在哪里？

::: warning 当前阶段：方案梳理与现场确认
仓库已包含办公室布局初稿、现有网络说明、智能化总体方案与自动化场景建议，但现场尺寸、回路、设备接口、负责人和最终采购范围仍待确认。这些文档不代表方案已批准或工程已完成。
:::

### 下一步

1. 按[办公室布局](/guide/office-layout)和[智能化总体方案](/implementation/smart-office-plan)完成现场复核。
2. 在[项目总览](/guide/project-overview)中确认范围、负责人和阶段交付物。
3. 评审首轮试点范围，再为已确认的采购、施工和验收工作建立 Issue。

### 待完成清单

- [ ] 指定空间、网络、智能化、采购与验收负责人。
- [ ] 复核平面图的内部尺寸、墙体、门窗和机房位置。
- [ ] 逐回路确认灯具、配电、窗帘供电、空调与新风接口。
- [ ] 确认试点区域、设备数量、预算与可复核的验收标准。
- [ ] 试点通过后，再决定是否扩展到其他区域。

## 按任务找资料

| 你现在要做什么 | 从这里开始 |
| --- | --- |
| 了解文档库怎么用 | [使用指南](/guide/getting-started) |
| 明确项目范围、交付物和阶段 | [项目总览](/guide/project-overview) |
| 核对办公室空间与功能分区 | [办公室布局](/guide/office-layout) |
| 了解现有网络与两地互联 | [当前网络现状](/guide/architecture) |
| 设计灯光、窗帘、环境与控制平台 | [智能化总体方案](/implementation/smart-office-plan) |
| 检查网络与弱电开工条件 | [网络与弱电规划](/implementation/network) |
| 定义、测试自动化规则 | [自动化场景](/implementation/automation) |
| 采购设备或维护资产信息 | [采购与设备台账](/management/procurement) |
| 联调、验收与交付现场系统 | [施工与验收](/management/acceptance) |
| 记录变更或重要技术决定 | [协作与变更流程](/guide/workflow) · [决策记录](/guide/decision-log) |

::: tip 快速找到内容
点击页面顶部的“搜索方案、设备、房间…”，或按 `⌘ K`（macOS）/ `Ctrl K`（Windows、Linux），输入房间、设备、协议或任务名称，即可直接跳到相关页面标题。
:::

::: info 记录原则
稳定的方案、规范和结论放在文档；待办、现场问题和待验收事项放在 Issue；影响成本、体验、安全或维护的决定写入决策记录。
:::
