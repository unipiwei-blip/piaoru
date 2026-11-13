/* =============================================================
   飘茹 PIAORU · 渲染层 render.js
   产品卡 / 文章卡 / 成分卡 / FAQ 的 DOM 生成与详情页渲染
   ============================================================= */

function productCard(p, i){
  var points = p.ingredients.slice(0,3).map(function(x){ return "<span>" + x + "</span>"; }).join("");
  return '<article class="case-card reveal d' + ((i % 3) + 1) + '" data-route="#/product/' + p.id + '">' +
    '<div class="case-shot"><img src="' + p.img + '" alt="' + p.alt + '" loading="lazy"></div>' +
    '<div class="case-body">' +
      '<div class="case-meta"><span class="tagx">' + p.tag + '</span></div>' +
      '<h3>' + p.name + '</h3>' +
      '<p>' + p.desc + '</p>' +
      '<div class="case-points">' + points + '</div>' +
      '<div class="case-foot"><span class="no">0' + (i + 1) + '</span><span class="link-more">查看详情 <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>' +
    '</div></article>';
}

function renderProducts(){
  var html = PRODUCTS.map(productCard).join("");
  document.getElementById("home-products").innerHTML = html;
  document.getElementById("products-list").innerHTML = html;
}

function renderProduct(id){
  var p = PRODUCTS.filter(function(x){ return x.id === id; })[0];
  var host = document.getElementById("product-detail");
  if(!p){ host.innerHTML = "<p>未找到该产品。</p>"; return; }

  document.getElementById("crumb-product").textContent = p.name;
  var tags = p.ingredients.map(function(x){ return "<span>" + x + "</span>"; }).join("");
  var rows = p.spec.map(function(r){ return "<tr><th>" + r[0] + "</th><td>" + r[1] + "</td></tr>"; }).join("");

  host.innerHTML =
    '<div class="detail-img"><img src="' + p.img + '" alt="' + p.alt + '"></div>' +
    '<div>' +
      '<span class="tagx" style="font-size:11px;font-weight:800;padding:4px 9px;border-radius:6px;background:rgba(26,107,255,.09);color:var(--blue-deep)">' + p.tag + '</span>' +
      '<h1>' + p.name + '</h1>' +
      '<p class="detail-desc">' + p.desc + '</p>' +
      '<div class="ingredient-tags">' + tags + '</div>' +
      '<table class="spec-table">' + rows + '</table>' +
      '<div class="hero-actions" style="margin-top:24px"><a class="btn btn-primary" href="#/contact">咨询选购</a><a class="btn btn-ghost" href="#/products">返回产品列表</a></div>' +
    '</div>';

  applySEO("product", { title:p.name + " — 飘茹洗发水官网 | www.piaoru.com.cn", desc:p.desc });
}

function articleCard(a, i){
  var points = a.points.map(function(x){ return "<span>" + x + "</span>"; }).join("");
  return '<article class="case-card reveal d' + ((i % 3) + 1) + '" data-route="#/article/' + a.id + '">' +
    '<div class="case-shot"><img src="' + a.img + '" alt="' + a.alt + '" loading="lazy"></div>' +
    '<div class="case-body">' +
      '<div class="case-meta"><span class="tagx">' + a.tag + '</span><span class="url">' + a.date + '</span></div>' +
      '<h3>' + a.title + '</h3>' +
      '<p>' + a.excerpt + '</p>' +
      '<div class="case-points">' + points + '</div>' +
      '<div class="case-foot"><span class="no">0' + (i + 1) + '</span><span class="link-more">阅读全文 <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>' +
    '</div></article>';
}

function renderJournal(){
  var html = ARTICLES.map(articleCard).join("");
  document.getElementById("journal-list").innerHTML = html;
  document.getElementById("home-journal").innerHTML = ARTICLES.slice(0,3).map(articleCard).join("");
}

function renderArticle(id){
  var a = ARTICLES.filter(function(x){ return x.id === id; })[0];
  var host = document.getElementById("article-detail");
  if(!a){ host.innerHTML = "<p>未找到该文章。</p>"; return; }

  document.getElementById("crumb-article").textContent = a.title;
  var body = a.body.map(function(sec){ return "<h2>" + sec[0] + "</h2><p>" + sec[1] + "</p>"; }).join("");

  host.innerHTML =
    '<span class="tagx" style="font-size:11px;font-weight:800;padding:4px 9px;border-radius:6px;background:rgba(26,107,255,.09);color:var(--blue-deep)">' + a.tag + '</span>' +
    '<h1 style="font-size:30px;color:var(--ink);margin:10px 0 14px">' + a.title + '</h1>' +
    '<p style="color:var(--muted);margin-bottom:8px">' + a.date + '</p>' +
    '<p style="color:var(--muted);margin-bottom:24px">' + a.excerpt + '</p>' +
    '<img src="' + a.img + '" alt="' + a.alt + '" style="border-radius:18px;margin-bottom:24px">' + body +
    '<div class="hero-actions" style="margin-top:30px"><a class="btn btn-ghost" href="#/journal">返回资讯列表</a></div>';

  applySEO("article", { title:a.title + " — 飘茹护发资讯 | www.piaoru.com.cn", desc:a.excerpt });
}

function renderScience(){
  var items = [
    {t:"锌 PCA", d:"控油系列核心成分，帮助减少头皮多余油脂带来的黏腻感。", img:"assets/images/product-oil.jpg"},
    {t:"透明质酸 · 角蛋白", d:"修护系列滋养成分，帮助改善发丝顺滑度与梳理性。", img:"assets/images/product-repair.jpg"},
    {t:"生物素 · 咖啡提取物", d:"蓬松系列代表成分，针对细软扁塌发质，帮助发根显蓬松。", img:"assets/images/product-volume.jpg"},
    {t:"吡啶硫酮锌 · 洋甘菊", d:"舒缓系列成分，配合草本精华帮助维持头皮清爽舒适。", img:"assets/images/product-soothe.jpg"}
  ];
  document.getElementById("science-ingredients").innerHTML = items.map(function(it, i){
    return '<article class="case-card reveal d' + ((i % 3) + 1) + '"><div class="case-shot"><img src="' + it.img + '" alt="' + it.t + '相关成分场景" loading="lazy"></div><div class="case-body"><h3>' + it.t + '</h3><p>' + it.d + '</p></div></article>';
  }).join("");
}

function renderFAQ(){
  document.getElementById("faq-list").innerHTML = FAQS.map(function(f, i){
    return '<div class="faq-item reveal d' + ((i % 3) + 1) + '" data-faq="' + i + '">' +
      '<div class="faq-q"><span>' + f.q + '</span><span class="faq-arrow"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></span></div>' +
      '<div class="faq-a"><p>' + f.a + '</p></div>' +
    '</div>';
  }).join("");
}
