(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Hero
  $("avatar").src = `https://github.com/${S.githubUser}.png?size=240`;
  $("name").textContent = S.name;
  $("role").textContent = S.role;
  $("location").textContent = S.location;
  $("year").textContent = new Date().getFullYear();

  // Typing effect
  const lines = S.typing;
  let li = 0, ci = 0, del = false;
  (function type() {
    const line = Array.from(lines[li]);
    $("typed").textContent = line.slice(0, ci).join("");
    if (!del && ci < line.length) ci++;
    else if (del && ci > 0) ci--;
    else { del = !del; if (!del) li = (li + 1) % lines.length; return setTimeout(type, del ? 1600 : 300); }
    setTimeout(type, del ? 35 : 70);
  })();

  // About
  $("about-text").innerHTML = S.about.map((p) => `<p>${esc(p)}</p>`).join("");
  const stackNames = S.mainStack;
  $("about-code").innerHTML =
    `<span class="k">const</span> ${esc(S.name.toLowerCase())} = {\n` +
    `  role: <span class="s">"${esc(S.role)}"</span>,\n` +
    `  location: <span class="s">"${esc(S.location)}"</span>,\n` +
    `  stack: [${stackNames.map((s) => `<span class="s">"${esc(s)}"</span>`).join(", ")}],\n` +
    `  coffee: <span class="p">true</span>,\n};`;

  // Stack
  $("stack-list").innerHTML = Object.entries(S.stack)
    .map(([group, ids]) => `<div><h3>${esc(group)}</h3><div class="icons">${ids
      .map((id) => `<img src="https://skillicons.dev/icons?i=${encodeURIComponent(id)}" alt="${esc(id)}" title="${esc(id)}" loading="lazy" />`)
      .join("")}</div></div>`)
    .join("");

  // Socials
  $("social-list").innerHTML = S.socials
    .map((s) => `<a class="btn" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`)
    .join("");

  // Projects (GitHub API, public, non-fork)
  const card = (r, featured) => `
    <article class="card">
      ${featured ? '<span class="badge">Featured</span>' : ""}
      <h3>${esc(r.name)}</h3>
      <p>${esc(r.description || "No description yet.")}</p>
      <div class="meta">
        ${r.language ? `<span>● ${esc(r.language)}</span>` : ""}
        <span>★ ${r.stargazers_count}</span>
        <span class="links">
          <a href="${esc(r.html_url)}" target="_blank" rel="noopener">Code ↗</a>
          ${r.homepage ? `<a href="${esc(r.homepage)}" target="_blank" rel="noopener">Live ↗</a>` : ""}
        </span>
      </div>
    </article>`;

  fetch(`https://api.github.com/users/${S.githubUser}/repos?per_page=100&sort=updated`)
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((repos) => {
      const list = repos.filter((r) => !r.fork && !S.hidden.includes(r.name));
      const feat = S.featured.map((n) => list.find((r) => r.name === n)).filter(Boolean);
      const rest = list.filter((r) => !S.featured.includes(r.name));
      const html = feat.map((r) => card(r, true)).join("") + rest.map((r) => card(r, false)).join("");
      $("project-list").innerHTML = html || '<p class="muted">No public projects yet.</p>';
    })
    .catch(() => {
      $("project-list").innerHTML =
        `<p class="muted">Couldn't load projects right now. See them on <a href="https://github.com/${esc(S.githubUser)}?tab=repositories">GitHub ↗</a>.</p>`;
    });

  // Theme toggle
  $("theme").addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Reveal on scroll
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("show")), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
