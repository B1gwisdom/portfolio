/* ==========================================================================
   projects.js — 项目数据 + 动态渲染
   说明：新增项目只需向 projects 数组追加一条数据，页面自动按配置排版。
   字段说明：
     id       数字编号   layout  布局模式 split-left/split-right/full/offset
     genre    类别      title   名称    desc  简介
     date     完成时间   category信息分类（用于 meta）  tag 类别标签（小号）
     stack    技术栈数组 images  图片数组（1 或 2 张）
   ========================================================================== */

const projects = [
  {
    id: "01",
    layout: "split-left",
    genre: "Web 应用",
    tag: "AI 应用",
    title: "AI 智能伴侣",
    desc: "基于 Python、Streamlit 与 OpenAI 兼容 SDK 构建的 Web 应用。",
    date: "2026 年 6 月",
    category: "Web 应用",
    stack: ["Python", "Streamlit", "OpenAI 兼容 SDK", "requests"],
    images: [
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Streamlit%20style%20AI%20chat%20assistant%20dashboard%20web%20app%20screenshot%2C%20conversation%20panel%20with%20chat%20bubbles%20and%20sidebar%20controls%2C%20clean%20light%20UI%2C%20warm%20neutral%20editorial%20tone&image_size=landscape_4_3"
    ]
  },
  {
    id: "02",
    layout: "split-right",
    genre: "Web 应用",
    tag: "移动应用",
    title: "苍穹外卖",
    desc: "基于微信小程序、Spring Boot 与 MySQL 构建的 Web 应用。",
    date: "2026 年 7 月",
    category: "Web 应用",
    stack: ["微信小程序", "Spring Boot", "MySQL", "HTML/CSS/JS"],
    images: [
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=WeChat%20mini%20program%20food%20delivery%20ordering%20interface%2C%20takeout%20dish%20list%20with%20food%20photos%20and%20price%20cards%2C%20clean%20warm%20neutral%20tones%2C%20editorial%20presentation&image_size=landscape_4_3"
    ]
  },
  {
    id: "03",
    layout: "full",
    genre: "Web 应用",
    tag: "本地生活",
    title: "黑马点评",
    desc: "基于 Spring Boot、MySQL 与 Redis 构建的 Web 应用。",
    date: "2026 年 8 月",
    category: "Web 应用",
    stack: ["Spring Boot", "MySQL", "Redis", "HTML/CSS/JS"],
    images: [
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=store%20review%20app%20interface%20with%20shop%20list%20rating%20stars%20and%20review%20cards%2C%20clean%20minimal%20layout%2C%20warm%20neutral%20editorial%20style&image_size=landscape_16_9"
    ]
  }
];

/* ---------- 渲染工具 ---------- */

function buildMeta(project) {
  return `
    <dl class="project__meta">
      <div><dt>完成时间</dt><dd>${project.date}</dd></div>
      <div><dt>类别</dt><dd>${project.category}</dd></div>
    </dl>
    <ul class="project__stack">
      ${project.stack.map((s) => `<li>${s}</li>`).join("")}
    </ul>
  `;
}

function buildMedia(project) {
  // offset 用两图 + 色块，其余用单图
  if (project.layout === "offset" && project.images.length >= 2) {
    return `
      <figure class="project__media project__media--a">
        <img src="${project.images[0]}" alt="${project.title}（图一）" loading="lazy" />
      </figure>
      <figure class="project__media project__media--b">
        <img src="${project.images[1]}" alt="${project.title}（图二）" loading="lazy" />
      </figure>
      <figure class="project__media project__media--a2">
        <img src="${project.images[0]}" alt="${project.title}（细节）" loading="lazy" />
      </figure>
      <div class="project__block">
        <span class="corners corners--ink" aria-hidden="true"></span>
        <div class="project__block-inner">
          <span class="project__feature">${project.feature}</span>
        </div>
      </div>
    `;
  }
  return `
    <figure class="project__media plate-frame">
      <img src="${project.images[0]}" alt="${project.title}" loading="lazy" />
    </figure>
  `;
}

function renderProject(project) {
  const node = document.createElement("article");
  node.className = `project project--${project.layout}`;

  const head = `
    <header class="project__head">
      <span class="project__wm" aria-hidden="true">${project.id}</span>
      <div>
        <p class="project__number">No. ${project.id}</p>
        <span class="project__genre">${project.genre}</span>
        <span class="project__tag">${project.tag}</span>
        <h3 class="project__title">${project.title}</h3>
      </div>
    </header>
  `;

  const body = `
    <div class="project__body">
      <p class="project__desc">${project.desc}</p>
      ${project.layout === "full" ? "" : buildMeta(project)}
      <a class="project__more" href="#contact">了解详情 <span>↗</span></a>
    </div>
  `;

  const media = buildMedia(project);

  if (project.layout === "full") {
    // full 布局：head 收起，信息并入底部横条
    node.innerHTML = `
      ${media}
      <div class="project__floor">
        <span class="project__wm" aria-hidden="true">${project.id}</span>
        <div>
          <p class="project__number">No. ${project.id} — ${project.genre}</p>
          <span class="project__tag">${project.tag}</span>
          <h3 class="project__title">${project.title}</h3>
          <p class="project__desc">${project.desc}</p>
          ${buildMeta(project)}
          <a class="project__more" href="#contact">了解详情 <span>↗</span></a>
        </div>
      </div>
    `;
  } else {
    node.innerHTML = head + media + body;
  }

  return node;
}

/* ---------- 挂载 ---------- */
(function renderAll() {
  const container = document.getElementById("projects");
  if (!container) return;
  const fragment = document.createDocumentFragment();
  projects.forEach((p) => fragment.appendChild(renderProject(p)));
  container.appendChild(fragment);
})();