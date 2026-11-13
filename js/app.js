/* =============================================================
   飘茹 PIAORU · 应用层 app.js
   入场观察器 / hash 路由 / 事件绑定 / 初始化
   ============================================================= */

var VIEWS = ["home","products","product","about","science","journal","article","contact"];
var io = null;

/* ---------- 入场动画观察 ---------- */
function observeReveals(){
  if(io){ io.disconnect(); }
  if(!("IntersectionObserver" in window)){
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("in"); });
    return;
  }
  io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold:.12 });
  document.querySelectorAll(".reveal:not(.in)").forEach(function(el){ io.observe(el); });
}

/* ---------- 路由 ---------- */
function parseHash(){
  var h = location.hash.replace(/^#\//, "") || "home";
  var parts = h.split("/");
  return { view:parts[0] || "home", param:parts[1] };
}

function showView(view){
  VIEWS.forEach(function(v){ document.getElementById("view-" + v).classList.toggle("active", v === view); });
  document.querySelectorAll("nav.menu a").forEach(function(a){
    var n = a.getAttribute("data-nav");
    a.classList.toggle("active", n === view || (view === "product" && n === "products") || (view === "article" && n === "journal"));
  });
  document.getElementById("menu").classList.remove("open");
  window.scrollTo(0, 0);
}

function route(){
  var r = parseHash();
  if(VIEWS.indexOf(r.view) === -1){ r.view = "home"; }

  showView(r.view);

  if(r.view === "product"){ renderProduct(r.param); }
  else if(r.view === "article"){ renderArticle(r.param); }
  else { applySEO(r.view); }

  observeReveals();
}

/* ---------- 事件 ---------- */
document.addEventListener("click", function(e){
  var el = e.target.closest("[data-route]");
  if(el){ location.hash = el.getAttribute("data-route"); return; }

  var faq = e.target.closest(".faq-q");
  if(faq){
    var item = faq.parentElement;
    var ans = item.querySelector(".faq-a");
    var open = item.classList.toggle("open");
    ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0";
  }
});

document.getElementById("burger").addEventListener("click", function(){
  document.getElementById("menu").classList.toggle("open");
});

document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  document.getElementById("form-success").style.display = "block";
  this.reset();
});

/* ---------- 初始化 ---------- */
renderProducts();
renderJournal();
renderScience();
renderFAQ();
route();
window.addEventListener("hashchange", route);
