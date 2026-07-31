import{_ as n,o as a,c as i,a2 as l}from"./chunks/framework.CHeM0PsO.js";const o=JSON.parse('{"title":"决策记录","description":"以 ADR 形式保存影响范围、原因和复盘结论。","frontmatter":{"title":"决策记录","description":"以 ADR 形式保存影响范围、原因和复盘结论。"},"headers":[],"relativePath":"guide/decision-log.md","filePath":"guide/decision-log.md","lastUpdated":1785475798000}'),e={name:"guide/decision-log.md"};function p(t,s,r,h,c,d){return a(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="决策记录" tabindex="-1">决策记录 <a class="header-anchor" href="#决策记录" aria-label="Permalink to &quot;决策记录&quot;">​</a></h1><p>每个会影响成本、体验、安全、施工或后续维护的选择，都应新增一份决策记录。文件名采用 <code>YYYY-MM-DD-主题.md</code>，例如 <code>2026-07-31-iot-vlan-isolation.md</code>。</p><h2 id="模板" tabindex="-1">模板 <a class="header-anchor" href="#模板" aria-label="Permalink to &quot;模板&quot;">​</a></h2><div class="language-md vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># ADR-001：决策名称</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 日期：YYYY-MM-DD</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 状态：提议 / 已批准 / 已替代</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 关联 Issue：#编号</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 背景</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">当前问题、约束与目标。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 备选方案</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 方案 A：优点 / 缺点 / 成本</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 方案 B：优点 / 缺点 / 成本</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 决定</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">最终选择及原因。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 影响与回滚</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">对预算、施工、运维的影响；若失败如何恢复。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>决策记录不追求长篇大论，关键是让半年后接手项目的人明白：当时为什么这样做、影响什么、由谁确认。</p></div>`,5)])])}const b=n(e,[["render",p]]);export{o as __pageData,b as default};
