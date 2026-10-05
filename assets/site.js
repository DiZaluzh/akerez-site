(function () {
  var messages = window.AKEREZ_MESSAGES || {};
  var catalog = window.AKEREZ_CATALOG || { products: [], work: [] };

  function lookup(lang, key) {
    var node = messages[lang];
    if (!node || !key) return null;
    var parts = key.split(".");
    for (var i = 0; i < parts.length; i += 1) {
      if (node == null || typeof node !== "object") return null;
      node = node[parts[i]];
    }
    return typeof node === "string" ? node : null;
  }

  function list(lang, key) {
    var node = messages[lang];
    if (!node) return null;
    var parts = key.split(".");
    for (var i = 0; i < parts.length; i += 1) {
      if (node == null) return null;
      node = node[parts[i]];
    }
    return Array.isArray(node) ? node : null;
  }

  function lang() {
    var value = document.documentElement.lang || "en";
    return messages[value] ? value : "en";
  }

  function applyText() {
    var current = lang();
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = lookup(current, el.getAttribute("data-i18n"));
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var value = lookup(current, el.getAttribute("data-i18n-aria"));
      if (value != null) el.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-list]").forEach(function (el) {
      var items = list(current, el.getAttribute("data-i18n-list"));
      if (!items) return;
      el.replaceChildren();
      items.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        el.appendChild(li);
      });
    });
    var titleKey = document.body && document.body.getAttribute("data-title");
    var descKey = document.body && document.body.getAttribute("data-description");
    if (titleKey) {
      var title = lookup(current, titleKey);
      if (title) document.title = title;
    }
    if (descKey) {
      var desc = lookup(current, descKey);
      var meta = document.querySelector('meta[name="description"]');
      if (desc && meta) meta.setAttribute("content", desc);
    }
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-set-lang") === current ? "true" : "false");
    });
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (toggle && nav) {
      var open = nav.classList.contains("is-open");
      toggle.setAttribute("aria-label", lookup(current, open ? "nav.close" : "nav.open") || toggle.getAttribute("aria-label"));
    }
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function stage(slug) {
    if (slug === "verbs") {
      return (
        '<div class="stage stage--verbs" aria-hidden="true">' +
        '<p class="stage__infinitive">être</p>' +
        '<p class="stage__line"><span>présent</span> nous sommes</p>' +
        '<span class="stage__bar"></span><span class="stage__bar stage__bar--short"></span>' +
        "</div>"
      );
    }
    if (slug === "invoice-book") {
      return (
        '<div class="stage stage--invoice" aria-hidden="true">' +
        '<p class="stage__num">001</p>' +
        '<span class="stage__rule"></span><span class="stage__rule"></span><span class="stage__rule stage__rule--short"></span>' +
        "</div>"
      );
    }
    return (
      '<div class="stage stage--plain" aria-hidden="true">' +
      '<span class="stage__rule"></span><span class="stage__rule"></span><span class="stage__rule stage__rule--short"></span>' +
      "</div>"
    );
  }

  function renderMounts() {
    var current = lang();
    document.querySelectorAll("[data-mount]").forEach(function (root) {
      var kind = root.getAttribute("data-mount");
      var layout = root.getAttribute("data-layout") || "index";
      var heading = root.getAttribute("data-heading") || (layout === "feature" ? "h3" : "h2");
      if (heading !== "h2" && heading !== "h3") heading = "h3";
      var items = catalog[kind] || [];
      var viewLabel = esc(lookup(current, kind === "work" ? "work.view" : "products.view") || "");
      var html = items
        .map(function (item, index) {
          var summary = esc((item.summary && item.summary[current]) || "");
          var meta = esc((item.meta && item.meta[current]) || "");
          var name = esc(item.name);
          var href = esc(item.href);
          var number = String(index + 1).padStart(2, "0");
          if (layout === "feature") {
            return (
              '<article class="product-feature">' +
              '<a class="product-feature__link" href="' +
              href +
              '">' +
              '<div class="product-feature__copy">' +
              '<p class="meta-line">' +
              number +
              " — " +
              meta +
              "</p>" +
              "<" + heading + ' class="product-feature__name">' +
              name +
              "</" + heading + ">" +
              '<p class="product-feature__summary">' +
              summary +
              "</p>" +
              '<span class="more">' +
              viewLabel +
              "</span>" +
              "</div>" +
              stage(item.slug) +
              "</a></article>"
            );
          }
          return (
            '<article class="index-row">' +
            '<a class="index-row__link" href="' +
            href +
            '">' +
            '<span class="index-row__num">' +
            number +
            "</span>" +
            "<" + heading + ' class="index-row__name">' +
            name +
            "</" + heading + ">" +
            '<span class="index-row__summary">' +
            summary +
            "</span>" +
            '<span class="index-row__meta">' +
            meta +
            "</span>" +
            "</a></article>"
          );
        })
        .join("");
      root.innerHTML = html;
    });
  }

  function setLang(next) {
    if (!messages[next]) return;
    try {
      localStorage.setItem("akerez-lang", next);
    } catch (error) {
      /* storage can be blocked; the choice still applies for this view */
    }
    document.documentElement.lang = next;
    apply();
  }

  function apply() {
    applyText();
    renderMounts();
  }

  function closeNav() {
    var nav = document.getElementById("site-nav");
    var toggle = document.querySelector(".nav-toggle");
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    var label = lookup(lang(), "nav.open");
    if (label) toggle.setAttribute("aria-label", label);
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      setLang(button.getAttribute("data-set-lang"));
    });
  });

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      var label = lookup(lang(), open ? "nav.close" : "nav.open");
      if (label) toggle.setAttribute("aria-label", label);
      if (open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  document.querySelectorAll(".brand").forEach(function (el) {
    el.setAttribute("aria-label", "AKEREZ");
    el.querySelectorAll(".wordmark, .mark").forEach(function (part) {
      part.setAttribute("aria-hidden", "true");
      part.removeAttribute("role");
      part.removeAttribute("aria-label");
    });
  });

  var currentNav = document.body && document.body.getAttribute("data-nav");
  document.querySelectorAll("[data-nav-link]").forEach(function (link) {
    if (currentNav && link.getAttribute("data-nav-link") === currentNav) {
      link.setAttribute("aria-current", "page");
    }
  });

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  apply();
})();
