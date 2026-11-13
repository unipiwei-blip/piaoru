/* =============================================================
   飘茹 PIAORU · SEO 层 seo.js
   路由切换时动态更新 title / description / keywords / canonical / OG
   ============================================================= */

function setMeta(attr, key, val){
  var m = document.querySelector('meta[name="' + attr + '"]') || document.querySelector('meta[property="' + attr + '"]');
  if(m){ m.setAttribute(key, val); }
}

function applySEO(route, extra){
  var cfg = SEO[route] || SEO.home;
  document.title = cfg.title;
  setMeta("description", "content", cfg.desc);
  setMeta("keywords", "content", cfg.kw);

  var canon = document.querySelector('link[rel="canonical"]');
  if(canon){ canon.href = cfg.url; }

  var ogUrl = document.querySelector('meta[property="og:url"]');
  if(ogUrl){ ogUrl.setAttribute("content", cfg.url); }
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if(ogTitle){ ogTitle.setAttribute("content", cfg.title); }
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if(ogDesc){ ogDesc.setAttribute("content", cfg.desc); }

  if(extra){
    document.title = extra.title;
    if(ogTitle){ ogTitle.setAttribute("content", extra.title); }
    if(extra.desc){
      setMeta("description", "content", extra.desc);
      if(ogDesc){ ogDesc.setAttribute("content", extra.desc); }
    }
  }
}
