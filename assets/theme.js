!(function (t, e, i, s, o) {
  "use strict";
  function n(t, e) {
    let i;
    return function () {
      if (t) {
        const s = () => t.apply(this, arguments);
        clearTimeout(i), (i = setTimeout(s, e));
      }
    };
  }
  (window.theme = window.theme || {}),
    (window.theme.sizes = {
      mobile: 480,
      small: 768,
      large: 1024,
      widescreen: 1440,
    }),
    (window.theme.keyboardKeys = {
      TAB: "Tab",
      ENTER: "Enter",
      NUMPADENTER: "NumpadEnter",
      ESCAPE: "Escape",
      SPACE: "Space",
      LEFTARROW: "ArrowLeft",
      RIGHTARROW: "ArrowRight",
    }),
    (window.theme.focusable =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const r = "body",
    a = "[data-main]",
    l = "[data-site-header]",
    c = "[data-prevent-transparent-header]",
    h = "supports-transparent-header",
    d = "site-header--transparent",
    u = "is-first-section-transparent",
    p = "data-transparent",
    m = () => {
      const t = document.querySelector(r),
        e = t.querySelector(l);
      if (!e) return;
      const i = "true" === e.getAttribute(p),
        s = t.querySelector(a).children[0];
      if (!s) return;
      const o = s.querySelector(`${c}:first-of-type`);
      window.isHeaderTransparent = i && s.classList.contains(h) && !o;
      CSS.supports("(selector(:has(*)))") ||
        (t.classList.toggle(u, window.isHeaderTransparent),
        e.classList.toggle(d, window.isHeaderTransparent));
    };
  let g = A();
  const v = {
      body: "body",
      main: "[data-main]",
      collectionFilters: "[data-collection-filters]",
      footer: '[data-section-type*="footer"]',
      header: "[data-header-height]",
      stickyHeader: '[data-site-header][data-position="fixed"]',
      announcementBar: "[data-announcement-bar]",
      collectionStickyBar: "[data-collection-sticky-bar]",
      logoTextLink: "[data-logo-text-link]",
    },
    y = {
      templateCollection: "template-collection",
      templateSearch: "template-search",
      supportsTransparentHeader: "supports-transparent-header",
    };
  function f() {
    var t, e;
    const i = {};
    return (
      (i.windowHeight = Math.min(window.screen.height, window.innerHeight)),
      (i.footerHeight = L(v.footer)),
      (i.headerHeight = L(v.header)),
      (i.stickyHeaderHeight = k() ? window.stickyHeaderHeight : 0),
      (i.headerInitialHeight =
        parseInt(
          (null === (t = document.querySelector(v.header)) || void 0 === t
            ? void 0
            : t.dataset.height) ||
            (null === (e = document.querySelector(v.header)) || void 0 === e
              ? void 0
              : e.offsetHeight)
        ) || 0),
      (i.announcementBarHeight = L(v.announcementBar)),
      (i.collectionStickyBarHeight = L(v.collectionStickyBar)),
      i
    );
  }
  function b() {
    document.addEventListener("theme:resize", E),
      w(),
      document.dispatchEvent(new CustomEvent("theme:vars"), { bubbles: !1 });
  }
  function w() {
    S();
  }
  function E() {
    S(!0);
  }
  function S(t = !1) {
    const e = document.querySelector(v.body),
      i = document.querySelector(v.collectionFilters),
      s = null !== document.querySelector(v.logoTextLink);
    let {
      windowHeight: o,
      headerHeight: n,
      headerInitialHeight: r,
      announcementBarHeight: a,
      footerHeight: l,
      collectionStickyBarHeight: c,
    } = f();
    s &&
      (n = (function () {
        document.documentElement.style.setProperty("--header-height", "auto"),
          document.documentElement.style.setProperty(
            "--header-sticky-height",
            "auto"
          );
        const t = document.querySelector(v.header).offsetHeight;
        return (
          requestAnimationFrame(() => {
            document.documentElement.style.setProperty(
              "--header-height",
              `${t}px`
            ),
              document.documentElement.style.setProperty(
                "--header-sticky-height",
                `${t}px`
              );
          }),
          t
        );
      })());
    const h =
      window.isHeaderTransparent &&
      document
        .querySelector(v.main)
        .firstElementChild.classList.contains(y.supportsTransparentHeader)
        ? o - a
        : o - r - a;
    let d = k() ? o - window.stickyHeaderHeight : o;
    const u = e.classList.contains(y.templateCollection),
      p = e.classList.contains(y.templateSearch),
      m = (u && i) || (p && i);
    if (
      (document.documentElement.style.setProperty("--footer-height", `${l}px`),
      document.documentElement.style.setProperty("--content-full", `${h}px`),
      document.documentElement.style.setProperty(
        "--content-min",
        o - n - l + "px"
      ),
      document.documentElement.style.setProperty(
        "--collection-sticky-bar-height",
        `${c}px`
      ),
      m && (d = o),
      !t)
    )
      return void document.documentElement.style.setProperty(
        "--full-height",
        `${d}px`
      );
    const b = A();
    b !== g &&
      (document.documentElement.style.setProperty("--full-height", `${d}px`),
      (g = b));
  }
  function L(t) {
    const e = document.querySelector(t);
    return e ? e.clientHeight : 0;
  }
  function k() {
    return document.querySelector(v.stickyHeader);
  }
  function A() {
    return window.matchMedia("(orientation: portrait)").matches
      ? "portrait"
      : window.matchMedia("(orientation: landscape)").matches
      ? "landscape"
      : void 0;
  }
  const q = {
    overflowBackground: "[data-overflow-background]",
    overflowFrame: "[data-overflow-frame]",
    overflowContent: "[data-overflow-content]",
    overflowContainer: "[data-overflow-container]",
    overflowWrapper: "[data-overflow-wrapper]",
  };
  function C(t, e) {
    let i = 0;
    e.forEach((t) => {
      i = t.offsetHeight > i ? t.offsetHeight : i;
    });
    const s = t.querySelectorAll(q.overflowBackground);
    [t, ...s].forEach((t) => {
      t.style.setProperty("min-height", `calc(${i}px + var(--header-height))`);
    });
  }
  function T(t) {
    if (window.innerWidth < window.theme.sizes.small) {
      return void t.querySelectorAll(q.overflowFrame).forEach((t) => {
        const e = t.querySelectorAll(q.overflowContent);
        C(t, e);
      });
    }
    let e = 0;
    const i = t.querySelectorAll(q.overflowFrame);
    t.querySelectorAll(q.overflowContent).forEach((t) => {
      t.offsetHeight > e && (e = t.offsetHeight);
    });
    [...i, ...t.querySelectorAll(q.overflowBackground)].forEach((t) => {
      t.style.setProperty("min-height", `${e}px`);
    }),
      t.style.setProperty("min-height", `${e}px`);
  }
  function P(t) {
    const e = t.querySelectorAll(q.overflowContainer);
    e &&
      e.forEach((t) => {
        const e = t.querySelectorAll(q.overflowContent);
        C(t, e),
          document.addEventListener("theme:resize", () => {
            C(t, e);
          });
      });
    const i = t.querySelectorAll(q.overflowWrapper);
    i &&
      i.forEach((t) => {
        T(t),
          document.addEventListener("theme:resize", () => {
            T(t);
          });
      });
  }
  function F() {
    document.dispatchEvent(new CustomEvent("theme:resize", { bubbles: !0 })),
      window.lastWindowWidth !== window.innerWidth &&
        (document.dispatchEvent(
          new CustomEvent("theme:resize:width", { bubbles: !0 })
        ),
        (window.lastWindowWidth = window.innerWidth));
  }
  window.lastWindowWidth = window.innerWidth;
  let I = window.pageYOffset,
    x = null,
    H = null,
    D = null,
    M = null,
    O = 0;
  const B = {
    quickViewVisible: "js-quick-view-visible",
    cartDrawerOpen: "js-drawer-open-cart",
  };
  function _(e) {
    setTimeout(() => {
      O && clearTimeout(O),
        t.disablePageScroll(e.detail, {
          allowTouchMove: (t) => "TEXTAREA" === t.tagName,
        }),
        document.documentElement.setAttribute("data-scroll-locked", "");
    });
  }
  function $(t) {
    const e = t.detail;
    e ? (O = setTimeout(z, e)) : z();
  }
  function z() {
    document.body.classList.contains(B.quickViewVisible) ||
      document.body.classList.contains(B.cartDrawerOpen) ||
      (t.clearQueueScrollLocks(),
      t.enablePageScroll(),
      document.documentElement.removeAttribute("data-scroll-locked"));
  }
  const R = (t, e = "", i) => {
    const s = i || document.createElement("div");
    return (
      s.classList.add(e),
      s.setAttribute("data-scroll-lock-scrollable", ""),
      t.parentNode.insertBefore(s, t),
      s.appendChild(t)
    );
  };
  function V(t) {
    t.querySelectorAll("table").forEach((t) => {
      R(t, "table-wrapper");
    });
  }
  const W = { loading: "is-loading" },
    N = { img: "img.is-loading" };
  function U(t) {
    t.querySelectorAll(N.img).forEach((t) => {
      t.complete &&
        (t.classList.remove(W.loading),
        t.parentNode.classList.remove(W.loading));
    });
  }
  const j = "img",
    K = "template",
    Q = ".shopify-section",
    G = "[data-deferred-content]",
    X = "[data-product-image]",
    J = "srcset",
    Y = "data-loaded",
    Z = "data-deferred-container";
  let tt = class extends HTMLElement {
    connectedCallback() {
      0 != this.deferredTriggers.length
        ? this.deferredTriggers.forEach((t) => {
            t.addEventListener(
              "mouseenter",
              () => {
                this.hasAttribute(Y) || this.loadTemplate();
              },
              { once: !0 }
            );
          })
        : this.container.addEventListener(
            "mouseenter",
            () => {
              this.hasAttribute(Y) || this.loadTemplate();
            },
            { once: !0 }
          );
    }
    loadTemplate() {
      var t;
      const e = document.createElement("div"),
        i = this.querySelector(K);
      if (
        !i ||
        !(null == i || null === (t = i.content) || void 0 === t
          ? void 0
          : t.firstElementChild)
      )
        return;
      e.appendChild(i.content.firstElementChild.cloneNode(!0));
      const s = e.querySelector(G);
      if (!s) return;
      this.append(s), this.setAttribute(Y, !0);
      s.querySelectorAll(j).length > 0 && this.reloadSrcset(this);
    }
    reloadSrcset(t) {
      t &&
        t.querySelectorAll(j).forEach((t) => {
          if (!t.parentNode.matches(X)) {
            const e = t.getAttribute(J);
            t.setAttribute(J, ""), t.setAttribute(J, e);
          }
        });
    }
    constructor() {
      super(),
        (this.container = this),
        this.hasAttribute(Z) &&
          (this.container =
            this.closest(this.getAttribute(Z)) || this.closest(Q)),
        (this.deferredTriggers = this.container.querySelectorAll(
          this.dataset.deferredTriggers
        ));
    }
  };
  const et = {
      inputSearch: 'input[type="search"]',
      inputType: 'input[name="type"]',
      form: "form",
      allVisibleElements: '[role="option"]',
      ariaSelected: '[aria-selected="true"]',
      selectedOption: '[aria-selected="true"] a, button[aria-selected="true"]',
      popularSearches: "[data-popular-searches]",
      popdownBody: "[data-popdown-body]",
      mainInputSearch: "[data-main-input-search]",
      predictiveSearchResults: "[data-predictive-search-results]",
      predictiveSearch: "predictive-search",
      searchForm: "search-form",
    },
    it = "is-searched",
    st = "template-search";
  let ot = class extends HTMLElement {
    getQuery() {
      return this.input.value.trim();
    }
    onFocus() {
      this.currentSearchTerm = this.getQuery();
    }
    onChange() {
      this.classList.toggle(it, !this.isFormCleared()),
        (this.searchTerm = this.getQuery());
    }
    isFormCleared() {
      return 0 === this.input.value.length;
    }
    submit() {
      this.form.submit();
    }
    reset() {
      this.input.val = "";
    }
    onFormSubmit(t) {
      (this.getQuery().length && !this.querySelector(et.selectedLink)) ||
        t.preventDefault();
    }
    onKeydown(t) {
      ("ArrowUp" !== t.code && "ArrowDown" !== t.code) || t.preventDefault();
    }
    onKeyup(t) {
      switch (
        (!this.getQuery().length && this.predictiveSearch && this.close(!0),
        t.preventDefault(),
        t.code)
      ) {
        case "ArrowUp":
          this.switchOption("up");
          break;
        case "ArrowDown":
          this.switchOption("down");
          break;
        case "Enter":
          this.selectOption();
      }
    }
    switchOption(t) {
      const e = "up" === t,
        i =
          this.classList.contains(it) && this.predictiveSearchResults
            ? this.predictiveSearchResults
            : this.popularSearches;
      if (!i) return;
      this.selectedElement = i.querySelector(et.ariaSelected);
      const s = Array.from(i.querySelectorAll(et.allVisibleElements)).filter(
        (t) => null !== t.offsetParent
      );
      let o = 0;
      if (e && !this.selectedElement) return;
      let n = -1,
        r = 0;
      for (; -1 === n && r <= s.length; )
        s[r] === this.selectedElement && (n = r), r++;
      !e && this.selectedElement
        ? (o = n === s.length - 1 ? 0 : n + 1)
        : e && (o = 0 === n ? s.length - 1 : n - 1),
        o !== n &&
          ((this.activeElement = s[o]), this.handleFocusableDescendants());
    }
    selectOption() {
      const t = this.querySelector(et.selectedOption);
      t && t.click();
    }
    handleFocusableDescendants(t = !1) {
      const e = this.selectedElement
        ? this.selectedElement
        : this.querySelector(et.ariaSelected);
      var i;
      if ((e && e.setAttribute("aria-selected", !1), !this.activeElement || t))
        return (
          (this.selectedElement = null),
          null === (i = this.activeElement) ||
            void 0 === i ||
            i.setAttribute("aria-selected", !1),
          this.input.setAttribute("aria-expanded", !1),
          void this.input.setAttribute("aria-activedescendant", "")
        );
      this.activeElement.setAttribute("aria-selected", !0),
        this.input.setAttribute("aria-activedescendant", this.activeElement.id);
    }
    constructor() {
      var t;
      super(),
        (this.input = this.querySelector(et.inputSearch)),
        (this.form = this.querySelector(et.form)),
        (this.popdownBody = this.closest(et.popdownBody)),
        (this.popularSearches =
          null === (t = this.popdownBody) || void 0 === t
            ? void 0
            : t.querySelector(et.popularSearches)),
        (this.predictiveSearchResults = this.querySelector(
          et.predictiveSearchResults
        )),
        (this.predictiveSearch = this.matches(et.predictiveSearch)),
        (this.searchForm = this.matches(et.searchForm)),
        (this.selectedElement = null),
        (this.activeElement = null),
        (this.searchTerm = ""),
        (this.currentSearchTerm = ""),
        (this.isSearchPage = document.body.classList.contains(st)),
        this.input.addEventListener(
          "input",
          n((t) => {
            this.onChange(t);
          }, 300).bind(this)
        ),
        this.input.addEventListener("focus", this.onFocus.bind(this)),
        this.input.form.addEventListener(
          "submit",
          this.onFormSubmit.bind(this)
        ),
        this.addEventListener("keyup", this.onKeyup.bind(this)),
        this.addEventListener("keydown", this.onKeydown.bind(this)),
        this.isSearchPage &&
          ((this.mainInputType = document.querySelector(
            `${et.mainInputSearch} ${et.inputType}`
          )),
          (this.inputType = this.querySelector(et.inputType)),
          (this.inputType.value = this.mainInputType.value));
    }
  };
  customElements.define("search-form", ot);
  const nt = "predictive-search",
    rt = "#shopify-section-api-predictive-search",
    at = "[data-predictive-search-results]",
    lt = "[data-predictive-search-status]",
    ct = "[data-predictive-search-live-region-count-value]",
    ht = "reset";
  customElements.define(
    "predictive-search",
    class extends ot {
      connectedCallback() {
        this.predictiveSearchResults.addEventListener("transitionend", (t) => {
          t.target !== this.predictiveSearchResults ||
            this.getQuery().length ||
            (this.classList.remove(ht),
            requestAnimationFrame(() => this.clearResultsHTML()));
        });
      }
      onChange() {
        super.onChange(),
          this.classList.remove(ht),
          this.searchTerm.length
            ? requestAnimationFrame(() =>
                this.getSearchResults(this.searchTerm)
              )
            : this.classList.add(ht);
      }
      onFocus() {
        super.onFocus(),
          this.currentSearchTerm.length &&
            (this.searchTerm !== this.currentSearchTerm
              ? this.onChange()
              : "true" === this.getAttribute("results")
              ? this.open()
              : this.getSearchResults(this.searchTerm));
      }
      getSearchResults(t) {
        const e = t.replace(" ", "-").toLowerCase(),
          i = parseInt(window.theme.settings.suggestionsResultsLimit);
        let s = "query";
        (s += window.theme.settings.suggestArticles ? ",article" : ""),
          (s += window.theme.settings.suggestCollections ? ",collection" : ""),
          (s += window.theme.settings.suggestProducts ? ",product" : ""),
          (s += window.theme.settings.suggestPages ? ",page" : ""),
          this.setLiveRegionLoadingState(),
          this.cachedResults[e]
            ? this.renderSearchResults(this.cachedResults[e])
            : fetch(
                `${theme.routes.predictiveSearchUrl}?q=${encodeURIComponent(
                  t
                )}&resources[type]=${s}&resources[limit]=${i}&section_id=api-predictive-search`,
                { signal: this.abortController.signal }
              )
                .then((t) => {
                  if (!t.ok) {
                    var e = new Error(t.status);
                    throw (this.close(), e);
                  }
                  return t.text();
                })
                .then((t) => {
                  const i = new DOMParser()
                    .parseFromString(t, "text/html")
                    .querySelector(rt).innerHTML;
                  this.allPredictiveSearchInstances.forEach((t) => {
                    t.cachedResults[e] = i;
                  }),
                    this.renderSearchResults(i);
                })
                .catch((t) => {
                  if (20 !== (null == t ? void 0 : t.code))
                    throw (this.close(), t);
                });
      }
      switchOption(t) {
        super.switchOption(t),
          this.statusElement && (this.statusElement.textContent = "");
      }
      setLiveRegionLoadingState() {
        (this.statusElement = this.statusElement || this.querySelector(lt)),
          (this.loadingText =
            this.loadingText || this.getAttribute("data-loading-text")),
          this.setLiveRegionText(this.loadingText),
          this.setAttribute("loading", !0);
      }
      setLiveRegionText(t) {
        this.statusElement.setAttribute("aria-hidden", "false"),
          (this.statusElement.textContent = t),
          setTimeout(() => {
            this.statusElement.setAttribute("aria-hidden", "true");
          }, 1e3);
      }
      renderSearchResults(t) {
        (this.predictiveSearchResults.innerHTML = t),
          this.setAttribute("results", !0),
          this.setLiveRegionResults(),
          this.open();
      }
      setLiveRegionResults() {
        this.removeAttribute("loading"),
          this.setLiveRegionText(this.querySelector(ct).textContent);
      }
      open() {
        this.setAttribute("open", !0);
      }
      close(t = !1) {
        this.closeResults(t);
      }
      closeResults(t = !1) {
        t &&
          (this.reset(),
          this.removeAttribute("results"),
          this.classList.remove(ht)),
          this.removeAttribute("loading"),
          this.removeAttribute("open");
      }
      clearResultsHTML() {
        this.predictiveSearchResults.innerHTML = "";
      }
      constructor() {
        super(),
          (this.abortController = new AbortController()),
          (this.allPredictiveSearchInstances = document.querySelectorAll(nt)),
          (this.predictiveSearchResults = this.querySelector(at)),
          (this.cachedResults = {});
      }
    }
  ),
    (window.requestIdleCallback =
      window.requestIdleCallback ||
      function (t) {
        var e = Date.now();
        return setTimeout(function () {
          t({
            didTimeout: !1,
            timeRemaining: function () {
              return Math.max(0, 50 - (Date.now() - e));
            },
          });
        }, 1);
      }),
    (window.cancelIdleCallback =
      window.cancelIdleCallback ||
      function (t) {
        clearTimeout(t);
      }),
    window.addEventListener("resize", n(F, 50)),
    (function () {
      let t;
      window.addEventListener(
        "scroll",
        function () {
          t && window.cancelAnimationFrame(t),
            (t = window.requestAnimationFrame(function () {
              !(function () {
                const t = window.pageYOffset;
                t > I
                  ? ((H = !0), (x = !1))
                  : t < I
                  ? ((H = !1), (x = !0))
                  : ((x = null), (H = null)),
                  (I = t),
                  document.dispatchEvent(
                    new CustomEvent("theme:scroll", {
                      detail: { up: x, down: H, position: t },
                      bubbles: !1,
                    })
                  ),
                  x &&
                    !D &&
                    document.dispatchEvent(
                      new CustomEvent("theme:scroll:up", {
                        detail: { position: t },
                        bubbles: !1,
                      })
                    ),
                  H &&
                    !M &&
                    document.dispatchEvent(
                      new CustomEvent("theme:scroll:down", {
                        detail: { position: t },
                        bubbles: !1,
                      })
                    ),
                  (M = H),
                  (D = x);
              })();
            }));
        },
        { passive: !0 }
      ),
        window.addEventListener("theme:scroll:lock", _),
        window.addEventListener("theme:scroll:unlock", $);
    })(),
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
      ? ((document.documentElement.className =
          document.documentElement.className.replace(
            "no-touch",
            "supports-touch"
          )),
        (window.theme.touch = !0))
      : (window.theme.touch = !1),
    document.addEventListener(
      "load",
      (t) => {
        "IMG" == t.target.tagName &&
          t.target.classList.contains(W.loading) &&
          (t.target.classList.remove(W.loading),
          t.target.parentNode.classList.remove(W.loading));
      },
      !0
    );
  const dt = n(() => {
    m();
  }, 300);
  "true" === document.body.dataset.animations &&
    e.init({ once: !0, offset: 50, duration: 600 }),
    window.addEventListener("DOMContentLoaded", () => {
      b(),
        P(document),
        V(document),
        U(document),
        document.documentElement.classList.remove("is-loading"),
        document.documentElement.classList.add("is-loaded");
    }),
    document.addEventListener("shopify:section:load", (t) => {
      const e = t.target;
      window.dispatchEvent(new Event("resize"), { bubbles: !0 }),
        P(e),
        V(e),
        b(),
        dt();
    }),
    document.addEventListener("shopify:section:reorder", () => {
      dt();
    }),
    document.addEventListener("shopify:section:unload", () => {
      dt();
    }),
    customElements.get("deferred-loading") ||
      customElements.define("deferred-loading", tt),
    (function () {
      function t(t) {
        var e = window.innerWidth || document.documentElement.clientWidth,
          i = window.innerHeight || document.documentElement.clientHeight,
          s = t.getBoundingClientRect();
        return s.top >= 0 && s.bottom <= i && s.left >= 0 && s.right <= e;
      }
      function e(t) {
        var e = window.innerWidth || document.documentElement.clientWidth,
          i = window.innerHeight || document.documentElement.clientHeight,
          s = t.getBoundingClientRect(),
          o = (s.left >= 0 && s.left <= e) || (s.right >= 0 && s.right <= e),
          n = (s.top >= 0 && s.top <= i) || (s.bottom >= 0 && s.bottom <= i);
        return o && n;
      }
      window.visibilityHelper = {
        isElementTotallyVisible: t,
        isElementPartiallyVisible: e,
        inViewportPartially: function (t, i) {
          function s() {
            var s = e(t);
            s != o && ((o = s), "function" == typeof i && i(s, t));
          }
          var o = e(t);
          window.addEventListener("load", s),
            window.addEventListener("resize", s),
            window.addEventListener("scroll", s);
        },
        inViewportTotally: function (e, i) {
          function s() {
            var s = t(e);
            s != o && ((o = s), "function" == typeof i && i(s, e));
          }
          var o = t(e);
          window.addEventListener("load", s),
            window.addEventListener("resize", s),
            window.addEventListener("scroll", s);
        },
      };
    })(),
    (window.Shopify = window.Shopify || {}),
    (window.Shopify.theme = window.Shopify.theme || {}),
    (window.Shopify.theme.sections = window.Shopify.theme.sections || {}),
    (window.Shopify.theme.sections.registered =
      window.Shopify.theme.sections.registered || {}),
    (window.Shopify.theme.sections.instances =
      window.Shopify.theme.sections.instances || []);
  const ut = window.Shopify.theme.sections.registered,
    pt = window.Shopify.theme.sections.instances,
    mt = { id: "data-section-id", type: "data-section-type" };
  let gt = class {
      getStack() {
        return this.callStack;
      }
      constructor(t = null, e = []) {
        (this.type = t),
          (this.components = (function (t) {
            if ((void 0 !== t && "object" != typeof t) || null === t)
              throw new TypeError(
                "Theme Sections: The components object provided is not a valid"
              );
            return t;
          })(e)),
          (this.callStack = {
            onLoad: [],
            onUnload: [],
            onSelect: [],
            onDeselect: [],
            onBlockSelect: [],
            onBlockDeselect: [],
            onReorder: [],
          }),
          e.forEach((t) => {
            for (const [e, i] of Object.entries(t)) {
              const t = this.callStack[e];
              Array.isArray(t) && "function" == typeof i
                ? t.push(i)
                : (console.warn(
                    `Unregisted function: '${e}' in component: '${this.type}'`
                  ),
                  console.warn(i));
            }
          });
      }
    },
    vt = class {
      callFunctions(t, e = null) {
        this.callStack[t].forEach((t) => {
          const i = { id: this.id, type: this.type, container: this.container };
          e ? t.call(i, e) : t.call(i);
        });
      }
      onLoad() {
        this.callFunctions("onLoad");
      }
      onUnload() {
        this.callFunctions("onUnload");
      }
      onSelect(t) {
        this.callFunctions("onSelect", t);
      }
      onDeselect(t) {
        this.callFunctions("onDeselect", t);
      }
      onBlockSelect(t) {
        this.callFunctions("onBlockSelect", t);
      }
      onBlockDeselect(t) {
        this.callFunctions("onBlockDeselect", t);
      }
      onReorder(t) {
        this.callFunctions("onReorder", t);
      }
      constructor(t, e) {
        (this.container = (function (t) {
          if (!(t instanceof Element))
            throw new TypeError(
              "Theme Sections: Attempted to load section. The section container provided is not a DOM element."
            );
          if (null === t.getAttribute(mt.id))
            throw new Error(
              "Theme Sections: The section container provided does not have an id assigned to the " +
                mt.id +
                " attribute."
            );
          return t;
        })(t)),
          (this.id = t.getAttribute(mt.id)),
          (this.type = e.type),
          (this.callStack = e.getStack());
        try {
          this.onLoad();
        } catch (t) {
          console.warn(`Error in section: ${this.id}`),
            console.warn(this),
            console.warn(t);
        }
      }
    };
  function yt(t, e) {
    if ("string" != typeof t)
      throw new TypeError(
        "Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered"
      );
    if (void 0 !== ut[t])
      throw new Error(
        'Theme Sections: A section of type "' +
          t +
          '" has already been registered. You cannot register the same section type twice'
      );
    Array.isArray(e) || (e = [e]);
    const i = new gt(t, e);
    return (ut[t] = i), ut;
  }
  function ft(t, e) {
    (t = Et(t)),
      void 0 === e && (e = document.querySelectorAll("[" + mt.type + "]")),
      (e = St(e)),
      t.forEach(function (t) {
        const i = ut[t];
        void 0 !== i &&
          (e = e.filter(function (e) {
            return (
              !(bt(e).length > 0) &&
              null !== e.getAttribute(mt.type) &&
              (e.getAttribute(mt.type) !== t || (pt.push(new vt(e, i)), !1))
            );
          }));
      });
  }
  function bt(t) {
    var e = [];
    if (NodeList.prototype.isPrototypeOf(t) || Array.isArray(t)) var i = t[0];
    if (t instanceof Element || i instanceof Element)
      St(t).forEach(function (t) {
        e = e.concat(
          pt.filter(function (e) {
            return e.container === t;
          })
        );
      });
    else if ("string" == typeof t || "string" == typeof i) {
      Et(t).forEach(function (t) {
        e = e.concat(
          pt.filter(function (e) {
            return e.type === t;
          })
        );
      });
    }
    return e;
  }
  function wt(t) {
    for (var e, i = 0; i < pt.length; i++)
      if (pt[i].id === t) {
        e = pt[i];
        break;
      }
    return e;
  }
  function Et(t) {
    return (
      "*" === t
        ? (t = Object.keys(ut))
        : "string" == typeof t
        ? (t = [t])
        : t.constructor === vt
        ? (t = [t.prototype.type])
        : Array.isArray(t) &&
          t[0].constructor === vt &&
          (t = t.map(function (t) {
            return t.type;
          })),
      (t = t.map(function (t) {
        return t.toLowerCase();
      }))
    );
  }
  function St(t) {
    return (
      NodeList.prototype.isPrototypeOf(t) && t.length > 0
        ? (t = Array.prototype.slice.call(t))
        : (NodeList.prototype.isPrototypeOf(t) && 0 === t.length) || null === t
        ? (t = [])
        : !Array.isArray(t) && t instanceof Element && (t = [t]),
      t
    );
  }
  window.Shopify.designMode &&
    (document.addEventListener("shopify:section:load", function (t) {
      var e = t.detail.sectionId,
        i = t.target.querySelector("[" + mt.id + '="' + e + '"]');
      !0 === window.Shopify.visualPreviewMode &&
        null === i &&
        (i = t.target.querySelector(`[${mt.id}]`)),
        null !== i && ft(i.getAttribute(mt.type), i);
    }),
    document.addEventListener("shopify:section:reorder", function (t) {
      var e = t.detail.sectionId,
        i = t.target.querySelector("[" + mt.id + '="' + e + '"]');
      "object" == typeof bt(i)[0] &&
        bt(i).forEach(function (t) {
          t.onReorder();
        });
    }),
    document.addEventListener("shopify:section:unload", function (t) {
      var e = t.detail.sectionId,
        i = t.target.querySelector("[" + mt.id + '="' + e + '"]');
      "object" == typeof bt(i)[0] &&
        bt(i).forEach(function (t) {
          var e = pt
            .map(function (t) {
              return t.id;
            })
            .indexOf(t.id);
          pt.splice(e, 1), t.onUnload();
        });
    }),
    document.addEventListener("shopify:section:select", function (t) {
      var e = wt(t.detail.sectionId);
      "object" == typeof e && e.onSelect(t);
    }),
    document.addEventListener("shopify:section:deselect", function (t) {
      var e = wt(t.detail.sectionId);
      "object" == typeof e && e.onDeselect(t);
    }),
    document.addEventListener("shopify:block:select", function (t) {
      var e = wt(t.detail.sectionId);
      "object" == typeof e && e.onBlockSelect(t);
    }),
    document.addEventListener("shopify:block:deselect", function (t) {
      var e = wt(t.detail.sectionId);
      "object" == typeof e && e.onBlockDeselect(t);
    }));
  const Lt = (t, e) => {
    let i, s;
    return function o(...n) {
      const r = Date.now();
      (s = clearTimeout(s)),
        !i || r - i >= e
          ? (t.apply(null, n), (i = r))
          : (s = setTimeout(o.bind(null, ...n), e - (r - i)));
    };
  };
  function kt(t) {
    (this.status = t.status || null),
      (this.headers = t.headers || null),
      (this.json = t.json || null),
      (this.body = t.body || null);
  }
  kt.prototype = Error.prototype;
  const At = "[data-collapsible-single]",
    qt = "[data-collapsible-trigger]",
    Ct = "[data-collapsible-content]",
    Tt = "is-expanded",
    Pt = "aria-expanded",
    Ft = "aria-controls",
    It = "data-collapsible-trigger-mobile",
    xt = "data-collapsible-transition-override",
    Ht = 500,
    Dt = {};
  let Mt = class {
    init() {
      this.triggers.forEach((t) => {
        t.addEventListener("click", this.collapsibleToggleEvent),
          t.addEventListener("keyup", this.collapsibleToggleEvent);
      });
    }
    collapsibleToggle(t) {
      t.preventDefault();
      const e = t.target.matches(qt) ? t.target : t.target.closest(qt),
        i = e.getAttribute(Ft),
        s = document.getElementById(i),
        o = e.hasAttribute(It),
        n = e.classList.contains(Tt),
        r = t.code === theme.keyboardKeys.SPACE,
        a = t.code === theme.keyboardKeys.ESCAPE,
        l = window.innerWidth < theme.sizes.small;
      (this.isTransitioning && !this.transitionOverride) ||
        ((!t.code || r || a) &&
          ((!n && a) ||
            (o && !l) ||
            ((this.isTransitioning = !0),
            (e.disabled = !0),
            this.single &&
              this.triggers.forEach((t) => {
                const i = t.classList.contains(Tt);
                if (e == t || !i) return;
                const s = t.getAttribute(Ft),
                  o = document.getElementById(s);
                requestAnimationFrame(() => {
                  this.closeItem(o, t);
                });
              }),
            n
              ? requestAnimationFrame(() => {
                  this.closeItem(s, e);
                })
              : requestAnimationFrame(() => {
                  this.openItem(s, e);
                }))));
    }
    openItem(t, e) {
      let i = t.querySelector(Ct).offsetHeight;
      this.setDropdownHeight(t, i, e, !0),
        e.classList.add(Tt),
        e.setAttribute(Pt, !0),
        e.dispatchEvent(
          new CustomEvent("theme:form:sticky", {
            bubbles: !0,
            detail: { element: "accordion" },
          })
        );
    }
    closeItem(t, e) {
      let i = t.querySelector(Ct).offsetHeight;
      requestAnimationFrame(() => {
        (i = 0), this.setDropdownHeight(t, i, e, !1), e.classList.remove(Tt);
      }),
        this.setDropdownHeight(t, i, e, !1),
        e.classList.remove(Tt),
        e.setAttribute(Pt, !1);
    }
    setDropdownHeight(t, e, i, s) {
      (t.style.height = `${e}px`),
        t.setAttribute(Pt, s),
        t.classList.toggle(Tt, s),
        this.resetHeightTimer && clearTimeout(this.resetHeightTimer),
        0 == e &&
          (this.resetHeightTimer = setTimeout(() => {
            t.style.height = "";
          }, Ht)),
        s
          ? (this.resetHeightTimer = setTimeout(() => {
              (t.style.height = "auto"), (this.isTransitioning = !1);
            }, Ht))
          : (this.isTransitioning = !1),
        setTimeout(() => {
          i.disabled = !1;
        }, Ht);
    }
    onUnload() {
      this.triggers.forEach((t) => {
        t.removeEventListener("click", this.collapsibleToggleEvent),
          t.removeEventListener("keyup", this.collapsibleToggleEvent);
      });
    }
    constructor(t) {
      (this.container = t),
        (this.single = this.container.querySelector(At)),
        (this.triggers = this.container.querySelectorAll(qt)),
        (this.resetHeightTimer = 0),
        (this.isTransitioning = !1),
        (this.transitionOverride = this.container.hasAttribute(xt)),
        (this.collapsibleToggleEvent = (t) =>
          Lt(this.collapsibleToggle(t), 1250)),
        this.init();
    }
  };
  const Ot = {
      onLoad() {
        Dt[this.id] = new Mt(this.container);
      },
      onUnload() {
        Dt[this.id].onUnload();
      },
    },
    Bt = "[data-quantity-holder]",
    _t = "[data-quantity-field]",
    $t = "[data-quantity-button]",
    zt = "[data-quantity-minus]",
    Rt = "[data-quantity-plus]",
    Vt = "read-only",
    Wt = "is-disabled";
  let Nt = class {
    init() {
      (this.quantity = this.holder.querySelector(Bt)),
        this.quantity &&
          ((this.field = this.quantity.querySelector(_t)),
          (this.buttons = this.quantity.querySelectorAll($t)),
          (this.increaseButton = this.quantity.querySelector(Rt)),
          (this.quantityValue = Number(this.field.value || 0)),
          (this.cartItemID = this.field.getAttribute("data-id")),
          (this.maxValue =
            Number(this.field.getAttribute("max")) > 0
              ? Number(this.field.getAttribute("max"))
              : null),
          (this.minValue =
            Number(this.field.getAttribute("min")) > 0
              ? Number(this.field.getAttribute("min"))
              : 0),
          (this.disableIncrease = this.disableIncrease.bind(this)),
          (this.emptyField = !1),
          (this.updateQuantity = this.updateQuantity.bind(this)),
          (this.decrease = this.decrease.bind(this)),
          (this.increase = this.increase.bind(this)),
          this.disableIncrease(),
          this.quantity.classList.contains(Vt) ||
            (this.changeValueOnClick(), this.changeValueOnInput()));
    }
    changeValueOnClick() {
      this.buttons.forEach((t) => {
        t.addEventListener("click", (t) => {
          t.preventDefault(),
            (this.quantityValue = Number(this.field.value || 0));
          const e = t.target,
            i = e.matches(zt) || e.closest(zt),
            s = e.matches(Rt) || e.closest(Rt);
          i && this.decrease(), s && this.increase(), this.updateQuantity();
        });
      });
    }
    changeValueOnInput() {
      this.field.addEventListener("input", () => {
        (this.quantityValue = this.field.value), this.updateQuantity();
      });
    }
    updateQuantity() {
      this.maxValue < this.quantityValue &&
        null !== this.maxValue &&
        (this.quantityValue = this.maxValue),
        this.minValue > this.quantityValue &&
          (this.quantityValue = this.minValue),
        (this.field.value = this.quantityValue),
        this.disableIncrease(),
        document.dispatchEvent(new CustomEvent("theme:cart:update")),
        this.quantityUpdateCart && this.updateCart();
    }
    decrease() {
      this.quantityValue > this.minValue
        ? this.quantityValue--
        : (this.quantityValue = 0);
    }
    increase() {
      this.quantityValue++;
    }
    disableIncrease() {
      this.increaseButton.classList.toggle(
        Wt,
        this.quantityValue >= this.maxValue && null !== this.maxValue
      );
    }
    updateCart() {
      if ("" === this.quantityValue) return;
      const t = new CustomEvent("theme:cart:update", {
        bubbles: !0,
        detail: { id: this.cartItemID, quantity: this.quantityValue },
      });
      this.holder.dispatchEvent(t);
    }
    constructor(t, e = !1) {
      (this.holder = t), (this.quantityUpdateCart = e);
    }
  };
  const Ut = {
    state: { firstFocusable: null, lastFocusable: null, trigger: null },
    trapFocus: function (t) {
      var e = Array.from(
        t.container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])'
        )
      ).filter(function (t) {
        var e = t.offsetWidth,
          i = t.offsetHeight;
        return (
          0 !== e &&
          0 !== i &&
          "none" !== getComputedStyle(t).getPropertyValue("display")
        );
      });
      (e = e.filter(function (t) {
        return !t.classList.contains("deferred-media__poster");
      })),
        (this.state.firstFocusable = e[0]),
        (this.state.lastFocusable = e[e.length - 1]),
        t.elementToFocus ||
          (t.elementToFocus = this.state.firstFocusable || t.container),
        this._setupHandlers(),
        document.addEventListener("focusin", this._onFocusInHandler),
        document.addEventListener("focusout", this._onFocusOutHandler),
        t.container.setAttribute("tabindex", "-1"),
        t.elementToFocus.focus();
    },
    removeTrapFocus: function (t) {
      const e = !document.body.classList.contains("no-outline");
      t && t.container && t.container.removeAttribute("tabindex"),
        document.removeEventListener("focusin", this._onFocusInHandler),
        this.state.trigger && e && this.state.trigger.focus();
    },
    _manageFocus: function (t) {
      t.code === theme.keyboardKeys.TAB &&
        (t.target !== this.state.lastFocusable ||
          t.shiftKey ||
          (t.preventDefault(), this.state.firstFocusable.focus()),
        t.target === this.state.firstFocusable &&
          t.shiftKey &&
          (t.preventDefault(), this.state.lastFocusable.focus()));
    },
    _onFocusOut: function () {
      document.removeEventListener("keydown", this._manageFocusHandler);
    },
    _onFocusIn: function (t) {
      (t.target !== this.state.lastFocusable &&
        t.target !== this.state.firstFocusable) ||
        document.addEventListener("keydown", this._manageFocusHandler);
    },
    _setupHandlers: function () {
      this._onFocusInHandler ||
        (this._onFocusInHandler = this._onFocusIn.bind(this)),
        this._onFocusOutHandler ||
          (this._onFocusOutHandler = this._onFocusIn.bind(this)),
        this._manageFocusHandler ||
          (this._manageFocusHandler = this._manageFocus.bind(this));
    },
  };
  const jt = {};
  function Kt(t = {}) {
    if ((t.type || (t.type = "json"), t.url))
      return jt[t.url]
        ? jt[t.url]
        : (function (t, e) {
            const i = new Promise((i, s) => {
              "text" === e
                ? fetch(t)
                    .then((t) => t.text())
                    .then((t) => {
                      i(t);
                    })
                    .catch((t) => {
                      s(t);
                    })
                : (function (t, e, i) {
                    let s = document.getElementsByTagName("head")[0],
                      o = !1,
                      n = document.createElement("script");
                    (n.src = t),
                      (n.onload = n.onreadystatechange =
                        function () {
                          o ||
                          (this.readyState &&
                            "loaded" != this.readyState &&
                            "complete" != this.readyState)
                            ? i()
                            : ((o = !0), e());
                        }),
                      s.appendChild(n);
                  })(
                    t,
                    function () {
                      i();
                    },
                    function () {
                      s();
                    }
                  );
            });
            return (jt[t] = i), i;
          })(t.url, t.type);
    if (t.json)
      return jt[t.json]
        ? Promise.resolve(jt[t.json])
        : window
            .fetch(t.json)
            .then((t) => t.json())
            .then((e) => ((jt[t.json] = e), e));
    if (t.name) {
      const e = "".concat(t.name, t.version);
      return jt[e]
        ? jt[e]
        : (function (t) {
            const e = "".concat(t.name, t.version),
              i = new Promise((e, i) => {
                try {
                  window.Shopify.loadFeatures([
                    {
                      name: t.name,
                      version: t.version,
                      onLoad: (t) => {
                        !(function (t, e, i) {
                          i ? e(i) : t();
                        })(e, i, t);
                      },
                    },
                  ]);
                } catch (t) {
                  i(t);
                }
              });
            return (jt[e] = i), i;
          })(t);
    }
    return Promise.reject();
  }
  (window.isYoutubeAPILoaded = !1), (window.isVimeoAPILoaded = !1);
  const Qt = "[data-video-id]",
    Gt = "loaded",
    Xt = "data-enable-sound",
    Jt = "data-enable-background",
    Yt = "data-enable-autoplay",
    Zt = "data-enable-loop",
    te = "data-video-id",
    ee = "data-video-type";
  const ie = {
      videoIframe: "[data-video-id]",
      videoWrapper: ".video-wrapper",
      youtubeWrapper: "[data-youtube-wrapper]",
    },
    se = "data-section-id",
    oe = "data-enable-sound",
    ne = "data-check-player-visibility",
    re = "data-video-id",
    ae = "data-video-type",
    le = "loaded",
    ce = [];
  const he = "[data-notification-form]",
    de = "[data-notification]",
    ue = "[data-popup-close]",
    pe = "pswp--success",
    me = "notification-popup-visible";
  function ge(t) {
    const e = i.data(t);
    e &&
      (e.on("dragStart", (t, e) => {
        document.ontouchmove = function (t) {
          t.preventDefault();
        };
      }),
      e.on("dragEnd", (t, e) => {
        document.ontouchmove = function (t) {
          return !0;
        };
      }));
  }
  const ve = "html5",
    ye = "youtube",
    fe = "vimeo",
    be = "[data-deferred-media]",
    we = "[data-deferred-media-button]",
    Ee = "[data-product-single-media-wrapper]",
    Se = "[data-video]",
    Le = ".media--hidden",
    ke = "media--hidden",
    Ae = "loaded",
    qe = "data-section-id",
    Ce = "data-autoplay-video",
    Te = "data-media-id";
  let Pe = class {
    init() {
      this.container.querySelectorAll(Se).forEach((t) => {
        const e = t.querySelector(we);
        e && e.addEventListener("click", this.loadContent.bind(this, t)),
          this.autoplayVideo && this.loadContent(t);
      });
    }
    loadContent(t) {
      if (t.querySelector(be).getAttribute(Ae)) return;
      const e = document.createElement("div");
      e.appendChild(
        t.querySelector("template").content.firstElementChild.cloneNode(!0)
      );
      const i = t.dataset.mediaId,
        s = e.querySelector("video, iframe"),
        o = this.hostFromVideoElement(s),
        n = t.querySelector(be);
      n.appendChild(s),
        n.setAttribute("loaded", !0),
        (this.players[i] = {
          mediaId: i,
          sectionId: this.id,
          container: t,
          element: s,
          host: o,
          ready: () => {
            this.createPlayer(i);
          },
        });
      const r = this.players[i];
      switch (r.host) {
        case ve:
          this.loadVideo(r, ve);
          break;
        case fe:
          window.isVimeoAPILoaded
            ? this.loadVideo(r, fe)
            : Kt({ url: "https://player.vimeo.com/api/player.js" }).then(() =>
                this.loadVideo(r, fe)
              );
          break;
        case ye:
          window.isYoutubeAPILoaded
            ? this.loadVideo(r, ye)
            : Kt({ url: "https://www.youtube.com/iframe_api" }).then(() =>
                this.loadVideo(r, ye)
              );
      }
    }
    hostFromVideoElement(t) {
      if ("VIDEO" === t.tagName) return ve;
      if ("IFRAME" === t.tagName) {
        if (
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
            t.src
          )
        )
          return ye;
        if (t.src.includes("vimeo.com")) return fe;
      }
      return null;
    }
    loadVideo(t, e) {
      t.host === e && t.ready();
    }
    createPlayer(t) {
      const e = this.players[t];
      switch (e.host) {
        case ve:
          e.element.addEventListener("play", () => {
            e.container.dispatchEvent(new CustomEvent("theme:media:play"), {
              bubbles: !0,
            });
          }),
            e.element.addEventListener("pause", () => {
              e.container.dispatchEvent(new CustomEvent("theme:media:pause"), {
                bubbles: !0,
              });
            }),
            this.autoplayVideo && this.observeVideo(e, t);
          break;
        case fe:
          (e.player = new Vimeo.Player(e.element)),
            e.player.play(),
            e.container.dispatchEvent(new CustomEvent("theme:media:play"), {
              bubbles: !0,
            }),
            (window.isVimeoAPILoaded = !0),
            e.player.on("play", () => {
              e.container.dispatchEvent(new CustomEvent("theme:media:play"), {
                bubbles: !0,
              });
            }),
            e.player.on("pause", () => {
              e.container.dispatchEvent(new CustomEvent("theme:media:pause"), {
                bubbles: !0,
              });
            }),
            this.autoplayVideo && this.observeVideo(e, t);
          break;
        case ye:
          if (e.host == ye && e.player) return;
          YT.ready(() => {
            const i = e.container.dataset.videoId;
            (e.player = new YT.Player(e.element, {
              videoId: i,
              events: {
                onReady: (t) => {
                  t.target.playVideo(),
                    e.container.dispatchEvent(
                      new CustomEvent("theme:media:play"),
                      { bubbles: !0 }
                    );
                },
                onStateChange: (t) => {
                  1 == t.data &&
                    e.container.dispatchEvent(
                      new CustomEvent("theme:media:play"),
                      { bubbles: !0 }
                    ),
                    2 == t.data &&
                      e.container.dispatchEvent(
                        new CustomEvent("theme:media:pause"),
                        { bubbles: !0 }
                      ),
                    0 == t.data &&
                      e.container.dispatchEvent(
                        new CustomEvent("theme:media:pause"),
                        { bubbles: !0 }
                      );
                },
              },
            })),
              (window.isYoutubeAPILoaded = !0),
              this.autoplayVideo && this.observeVideo(e, t);
          });
      }
      e.container.addEventListener("theme:media:visible", (t) =>
        this.onVisible(t)
      ),
        e.container.addEventListener("theme:media:hidden", (t) =>
          this.onHidden(t)
        ),
        e.container.addEventListener("xrLaunch", (t) => this.onHidden(t));
    }
    observeVideo(t) {
      new IntersectionObserver(
        (e, i) => {
          e.forEach((e) => {
            const i = 0 == e.intersectionRatio,
              s = !t.element.closest(Le);
            i ? this.pauseVideo(t) : s && this.playVideo(t);
          });
        },
        { rootMargin: "200px", threshold: [0, 0.25, 0.75, 1] }
      ).observe(t.element);
    }
    playVideo(t) {
      t.player && t.player.playVideo
        ? t.player.playVideo()
        : t.element && t.element.play
        ? t.element.play()
        : t.player && t.player.play && t.player.play(),
        t.container.dispatchEvent(new CustomEvent("theme:media:play"), {
          bubbles: !0,
        });
    }
    pauseVideo(t) {
      if (t.player && t.player.pauseVideo)
        "1" == t.player.playerInfo.playerState && t.player.pauseVideo();
      else if (t.player && t.player.pause) t.player.pause();
      else if (t.element && !t.element.paused) {
        var e;
        if ("function" == typeof t.element.pause)
          null === (e = t.element) || void 0 === e || e.pause();
      }
    }
    onHidden(t) {
      if (void 0 !== t.target.dataset.mediaId) {
        const e = t.target.dataset.mediaId,
          i = this.players[e];
        this.pauseVideo(i);
      }
    }
    onVisible(t) {
      if (void 0 !== t.target.dataset.mediaId) {
        const e = t.target.dataset.mediaId,
          i = this.players[e];
        setTimeout(() => {
          this.playVideo(i);
        }, 50),
          this.pauseContainerMedia(e);
      }
    }
    pauseOtherMedia(t, e) {
      const i = `[${Te}="${t}"]`,
        s = e.querySelectorAll(`${Ee}:not(${i})`);
      s.length &&
        s.forEach((t) => {
          t.dispatchEvent(new CustomEvent("theme:media:hidden"), {
            bubbles: !0,
          }),
            t.classList.add(ke);
        });
    }
    constructor(t) {
      (this.container = t),
        (this.id = this.container.getAttribute(qe)),
        (this.autoplayVideo = "true" === this.container.getAttribute(Ce)),
        (this.players = {}),
        (this.pauseContainerMedia = (t, e = this.container) =>
          this.pauseOtherMedia(t, e)),
        this.init();
    }
  };
  function Fe(t, e, i = [], s = !1) {
    const o = new FormData(t),
      n = new URLSearchParams(o);
    if (!e) return n.toString();
    const r = new FormData(e),
      a = new URLSearchParams(r),
      l = [];
    for (const t of o.entries()) "" === t[1] && l.push(t[0]);
    for (const t of r.entries()) "" === t[1] && l.push(t[0]);
    for (let t = 0; t < l.length; t++) {
      const e = l[t];
      n.has(e) && n.delete(e), a.has(e) && a.delete(e);
    }
    for (const t of n.keys()) a.has(t) && a.delete(t);
    if (i.length > 0)
      for (let t = 0; t < i.length; t++) {
        const e = i[t];
        n.has(e) && n.delete(e), a.has(e) && a.delete(e);
      }
    return (
      s && (a.has("type") && a.delete("type"), n.set("type", s)),
      `${n.toString()}&${a.toString()}`
    );
  }
  const Ie = "[data-custom-scrollbar]",
    xe = "[data-custom-scrollbar-items]",
    He = "[data-custom-scrollbar-thumb]",
    De = ".current";
  let Me = class {
    calculateTrack(t) {
      if (!t)
        return (
          this.scrollbar.style.setProperty("--thumb-scale", 0),
          void this.scrollbar.style.setProperty("--thumb-position", "0px")
        );
      const e = t.clientWidth / this.scrollbarThumb.parentElement.clientWidth,
        i = t.offsetLeft / this.scrollbarThumb.parentElement.clientWidth;
      this.scrollbar.style.setProperty("--thumb-scale", e),
        this.scrollbar.style.setProperty(
          "--thumb-position",
          this.trackWidth * i + "px"
        );
    }
    calculateScrollbar() {
      if (this.scrollbarItems.children.length) {
        const t = [...this.scrollbarItems.children];
        (this.trackWidth = 0),
          t.forEach((t) => {
            this.trackWidth +=
              t.getBoundingClientRect().width +
              parseInt(window.getComputedStyle(t).marginRight);
          }),
          this.scrollbar.style.setProperty(
            "--track-width",
            `${this.trackWidth}px`
          );
      }
    }
    onScrollbarChange(t) {
      t &&
        t.detail &&
        t.detail.element &&
        this.container.contains(t.detail.element) &&
        this.calculateTrack(t.detail.element);
    }
    events() {
      document.addEventListener("theme:resize:width", this.calcScrollbarEvent),
        document.addEventListener(
          "theme:custom-scrollbar:change",
          this.onScrollbarChangeEvent
        );
    }
    unload() {
      document.removeEventListener(
        "theme:resize:width",
        this.calcScrollbarEvent
      ),
        document.removeEventListener(
          "theme:custom-scrollbar:change",
          this.onScrollbarChangeEvent
        );
    }
    constructor(t) {
      (this.container = t),
        (this.scrollbarItems = t.querySelector(xe)),
        (this.scrollbar = t.querySelector(Ie)),
        (this.scrollbarThumb = t.querySelector(He)),
        (this.trackWidth = 0),
        (this.calcScrollbarEvent = () => this.calculateScrollbar()),
        (this.onScrollbarChangeEvent = (t) => this.onScrollbarChange(t)),
        this.scrollbar &&
          this.scrollbarItems &&
          (this.events(),
          this.calculateScrollbar(),
          this.scrollbarItems.children.length &&
            this.calculateTrack(this.scrollbarItems.querySelector(De)));
    }
  };
  const Oe = "[data-tooltip]",
    Be = "[data-tooltip-container]",
    _e = "[data-tooltip-arrow]",
    $e = "[data-aos]",
    ze = "tooltip-default",
    Re = "is-animating",
    Ve = "is-visible",
    We = "is-hiding",
    Ne = "data-tooltip",
    Ue = "data-tooltip-container",
    je = "data-tooltip-stop-mouseenter",
    Ke = {};
  let Qe = class {
    init() {
      if (!document.querySelector(Be)) {
        const t = `<div class="${this.rootClass}__inner"><div class="${this.rootClass}__arrow" data-tooltip-arrow></div><div class="${this.rootClass}__text"></div></div>`,
          e = document.createElement("div");
        (e.className = `${this.rootClass} ${this.isAnimatingClass}`),
          e.setAttribute(Ue, ""),
          (e.innerHTML = t),
          document.body.appendChild(e);
      }
      this.tooltip.addEventListener("mouseenter", this.addPinMouseEvent),
        this.tooltip.addEventListener("mouseleave", this.removePinMouseEvent),
        this.tooltip.addEventListener("theme:tooltip:init", this.addPinEvent),
        document.addEventListener("theme:tooltip:close", this.removePinEvent);
      const t = document.querySelector(Be);
      theme.settings.animations &&
        this.animatedContainer &&
        this.animatedContainer.addEventListener("transitionend", (e) => {
          "transform" === e.propertyName && t.classList.remove(Re);
        });
    }
    addPin(t = !1) {
      const e = document.querySelector(Be),
        i = e.querySelector(_e);
      if (e && ((t && !this.tooltip.hasAttribute(je)) || !t)) {
        const t = e.querySelector(`.${this.rootClass}__inner`);
        e.querySelector(`.${this.rootClass}__text`).textContent = this.label;
        const s = t.offsetWidth,
          o = this.tooltip.getBoundingClientRect(),
          n = o.top,
          r = o.width,
          a = n + o.height + window.scrollY;
        let l = o.left - s / 2 + r / 2,
          c = "50%";
        const h = l + s - window.innerWidth;
        h > 0 && (l -= h),
          l < 0 && ((c = `calc(50% + ${l}px)`), (l = 0)),
          (i.style.left = c),
          (e.style.transform = `translate(${l}px, ${a}px)`),
          e.classList.remove(We),
          e.classList.add(Ve),
          document.addEventListener("theme:scroll", this.removePinEvent);
      }
    }
    removePin(t, e = !1, i = !1) {
      const s = document.querySelector(Be),
        o = s.classList.contains(Ve);
      s &&
        ((e && !this.tooltip.hasAttribute(je)) || !e) &&
        (o &&
          (i || t.detail.hideTransition) &&
          (s.classList.add(We),
          this.hideTransitionTimeout &&
            clearTimeout(this.hideTransitionTimeout),
          (this.hideTransitionTimeout = setTimeout(() => {
            s.classList.remove(We);
          }, this.transitionSpeed))),
        s.classList.remove(Ve),
        document.removeEventListener("theme:scroll", this.removePinEvent));
    }
    unload() {
      this.tooltip.removeEventListener("mouseenter", this.addPinMouseEvent),
        this.tooltip.removeEventListener(
          "mouseleave",
          this.removePinMouseEvent
        ),
        this.tooltip.removeEventListener(
          "theme:tooltip:init",
          this.addPinEvent
        ),
        document.removeEventListener(
          "theme:tooltip:close",
          this.removePinEvent
        ),
        document.removeEventListener("theme:scroll", this.removePinEvent);
    }
    constructor(t) {
      (this.tooltip = t),
        this.tooltip.hasAttribute(Ne) &&
          ((this.rootClass = ze),
          (this.isAnimatingClass = Re),
          (this.label = this.tooltip.getAttribute(Ne)),
          (this.transitionSpeed = 200),
          (this.hideTransitionTimeout = 0),
          (this.animatedContainer = this.tooltip.closest($e)),
          (this.addPinEvent = () => this.addPin()),
          (this.addPinMouseEvent = () => this.addPin(!0)),
          (this.removePinEvent = (t) => Lt(this.removePin(t), 50)),
          (this.removePinMouseEvent = (t) => this.removePin(t, !0, !0)),
          this.init());
    }
  };
  const Ge = {
      onLoad() {
        Ke[this.id] = [];
        this.container.querySelectorAll(Oe).forEach((t) => {
          Ke[this.id].push(new Qe(t));
        });
      },
      onUnload() {
        Ke[this.id].forEach((t) => {
          "function" == typeof t.unload && t.unload();
        });
      },
    },
    Xe = "[data-range-slider]",
    Je = "[data-range-left]",
    Ye = "[data-range-right]",
    Ze = "[data-range-line]",
    ti = "[data-range-holder]",
    ei = "data-se-min",
    ii = "data-se-max",
    si = "data-se-min-value",
    oi = "data-se-max-value",
    ni = "data-se-step",
    ri = "data-range-filter-update",
    ai = "[data-field-price-min]",
    li = "[data-field-price-max]",
    ci = "is-initialized";
  function hi() {
    this.entries = [];
  }
  function di(t, e) {
    ui(t);
    var i = (function (t, e) {
      ui(t),
        (function (t) {
          if (!Array.isArray(t)) throw new TypeError(t + " is not an array.");
          if (0 === t.length) throw new Error(t + " is empty.");
          if (!t[0].hasOwnProperty("name"))
            throw new Error(t[0] + "does not contain name key.");
          if ("string" != typeof t[0].name)
            throw new TypeError(
              "Invalid value type passed for name of option " +
                t[0].name +
                ". Value should be string."
            );
        })(e);
      var i = [];
      return (
        e.forEach(function (e) {
          for (var s = 0; s < t.options.length; s++) {
            if (
              (t.options[s].name || t.options[s]).toLowerCase() ===
              e.name.toLowerCase()
            ) {
              i[s] = e.value;
              break;
            }
          }
        }),
        i
      );
    })(t, e);
    return (function (t, e) {
      ui(t),
        (function (t) {
          if (Array.isArray(t) && "object" == typeof t[0])
            throw new Error(t + "is not a valid array of options.");
        })(e);
      var i = t.variants.filter(function (t) {
        return e.every(function (e, i) {
          return t.options[i] === e;
        });
      });
      return i[0] || null;
    })(t, i);
  }
  function ui(t) {
    if ("object" != typeof t) throw new TypeError(t + " is not an object.");
    if (0 === Object.keys(t).length && t.constructor === Object)
      throw new Error(t + " is empty.");
  }
  (hi.prototype.add = function (t, e, i) {
    this.entries.push({ element: t, event: e, fn: i }),
      t.addEventListener(e, i);
  }),
    (hi.prototype.removeAll = function () {
      this.entries = this.entries.filter(function (t) {
        return t.element.removeEventListener(t.event, t.fn), !1;
      });
    });
  var pi = '[name="id"]',
    mi = '[name="selling_plan"]',
    gi = '[name^="options"]',
    vi = '[name="quantity"]',
    yi = '[name^="properties"]';
  const fi = { color: "ash" },
    bi = "[data-swatch]",
    wi = "[data-product-block]",
    Ei = "[data-product-image-hover]",
    Si = "[data-button-quick-view]",
    Li = "[data-grid-image]",
    ki = "[data-grid-link]",
    Ai = "[data-swatches-more]",
    qi = "[data-section-type]",
    Ci = "[data-swatches-container]",
    Ti = "[data-swatches-label]",
    Pi = "[data-swatches-button]",
    Fi = "[data-option-position]",
    Ii = "[data-slider]",
    xi = "product__media--featured-visible",
    Hi = "product__media__hover-img--visible",
    Di = "swatch__link--no-image",
    Mi = "no-outline",
    Oi = "is-visible",
    Bi = "selector-wrapper--large",
    _i = "data-swatch",
    $i = "data-swatch-handle",
    zi = "data-swatch-label",
    Ri = "data-swatch-image",
    Vi = "data-swatch-image-id",
    Wi = "data-swatch-variant",
    Ni = "data-variant-id",
    Ui = "data-variant-secondary-id";
  let ji = {};
  const Ki = {};
  let Qi = class {
      init() {
        this.setStyles(),
          this.variant && this.outer && this.handleClicks(),
          !this.image && this.swatchLink && this.swatchLink.classList.add(Di);
      }
      setStyles() {
        this.colorMatch &&
          this.colorMatch.hex &&
          this.element.style.setProperty("--swatch", `${this.colorMatch.hex}`),
          this.colorMatch &&
            this.colorMatch.path &&
            this.element.style.setProperty(
              "background-image",
              `url(${this.colorMatch.path})`
            );
      }
      handleClicks() {
        this.swatchLink.addEventListener("click", (t) => {
          const e = !document.body.classList.contains(Mi),
            i = this.swatchLink.getAttribute(Wi);
          e || (t.preventDefault(), this.updateImagesAndLinksOnEvent(i));
        }),
          this.swatchLink.addEventListener("keyup", (t) => {
            const e = !document.body.classList.contains(Mi),
              i = this.swatchLink.getAttribute(Wi);
            (t.code !== theme.keyboardKeys.ENTER &&
              t.code !== theme.keyboardKeys.NUMPADENTER) ||
              e ||
              (t.preventDefault(),
              this.swatchLink.dispatchEvent(
                new Event("mouseenter", { bubbles: !0 })
              ),
              this.updateImagesAndLinksOnEvent(i));
          });
      }
      updateImagesAndLinksOnEvent(t) {
        this.updateLinks(), this.replaceImages(t);
      }
      updateLinks() {
        (this.linkElements = this.outer.querySelectorAll(ki)),
          (this.quickView = this.outer.querySelector(Si)),
          this.linkElements.length &&
            this.linkElements.forEach((t) => {
              const e =
                ((i = t.getAttribute("href")),
                (s = this.variant),
                /variant=/.test(i)
                  ? i.replace(/(variant=)[^&]+/, "$1" + s)
                  : /\?/.test(i)
                  ? i.concat("&variant=").concat(s)
                  : i.concat("?variant=").concat(s));
              var i, s;
              t.setAttribute("href", e);
            }),
          this.quickView &&
            "quick_buy" === theme.settings.quickBuy &&
            this.quickView.setAttribute(Ni, this.variant);
      }
      replaceImages(t) {
        const e = this.outer.querySelector(`[${Ui}="${t}"]`),
          i = this.outer.querySelector(`[${Ni}="${t}"]`),
          s = [...this.outer.querySelectorAll(Li)].find((t) =>
            t.classList.contains(xi)
          );
        if (i && this.imageId) {
          if (!e || !s) return;
          const t = () => {
            requestAnimationFrame(() => {
              s.classList.remove(xi),
                i.classList.add(xi),
                requestAnimationFrame(() => {
                  e.classList.remove(xi);
                });
            }),
              e.removeEventListener("animationend", t);
          };
          requestAnimationFrame(() => {
            e.classList.add(xi);
          }),
            e.addEventListener("animationend", t);
        }
        "image" === theme.settings.productGridHover &&
          (this.hoverImages = this.outer.querySelectorAll(Ei)),
          this.hoverImages.length > 1 &&
            this.hoverImages.forEach((t) => {
              t.classList.remove(Hi),
                t.getAttribute(Ni) === this.variant
                  ? t.classList.add(Hi)
                  : this.hoverImages[0].classList.add(Hi);
            });
      }
      constructor(t) {
        (this.element = t),
          (this.swatchLink = this.element.nextElementSibling),
          (this.colorString = t.getAttribute(_i)),
          (this.image = this.element.getAttribute(Ri)),
          (this.imageId = this.element.getAttribute(Vi)),
          (this.variant = this.element.getAttribute(Wi)),
          (this.outer = this.element.closest(wi)),
          (this.hoverImages = []);
        const e = new (class {
          getColor() {
            return this.match;
          }
          init() {
            return Kt({ json: theme.assets.swatches })
              .then((t) => this.matchColors(t, this.settings.color))
              .catch((t) => {
                console.log("failed to load swatch colors script"),
                  console.log(t);
              });
          }
          matchColors(t, e) {
            let i = "#E5E5E5",
              s = null;
            const o = theme.assets.base || "/",
              n = e.toLowerCase().replace(/\s/g, ""),
              r = t.colors;
            if (r) {
              let t = null;
              if (
                r.filter((e, i) => {
                  if (
                    Object.keys(e)
                      .toString()
                      .toLowerCase()
                      .replace(/\s/g, "") === n
                  )
                    return (t = i), e;
                }).length &&
                null !== t
              ) {
                const e = Object.values(r[t])[0];
                (i = e),
                  (e.includes(".jpg") ||
                    e.includes(".jpeg") ||
                    e.includes(".png") ||
                    e.includes(".svg")) &&
                    ((s = `${o}${e}`), (i = "#888888"));
              }
            }
            return { color: this.settings.color, path: s, hex: i };
          }
          constructor(t = {}) {
            (this.settings = { ...fi, ...t }), (this.match = this.init());
          }
        })({ color: this.colorString });
        e.getColor().then((t) => {
          (this.colorMatch = t), this.init();
        });
      }
    },
    Gi = class extends HTMLElement {
      init() {
        (this.swatchElements = this.querySelectorAll(bi)),
          this.swatchElements.forEach((t) => {
            new Qi(t);
          }),
          this.handleShowMore();
      }
      handleShowMore() {
        (this.initialHeight = this.offsetHeight),
          (this.expandedHeight = this.initialHeight);
        const t = this.closest(qi),
          e = this.querySelector(Ai);
        e &&
          (null == e ||
            e.addEventListener("click", () => {
              this.classList.add(Oi);
            }),
          null == t ||
            t.addEventListener("touchstart", (t) => {
              this.contains(t.target) ||
                (this.classList.remove(Oi),
                this.dispatchEvent(new Event("mouseleave", { bubbles: !0 })));
            }),
          this.addEventListener("mouseenter", () => {
            const t = (e) => {
              this.expandedHeight = this.offsetHeight;
              const i = e.target.closest(Ii);
              this.expandedHeight > this.initialHeight &&
                i &&
                requestAnimationFrame(() =>
                  i.dispatchEvent(
                    new CustomEvent("theme:slider:resize", { bubbles: !1 })
                  )
                ),
                this.removeEventListener("animationstart", t);
            };
            this.addEventListener("animationstart", t);
          }),
          this.addEventListener("mouseleave", () => {
            const t = (e) => {
              const i = e.target.closest(Ii);
              this.expandedHeight > this.initialHeight &&
                i &&
                requestAnimationFrame(() =>
                  i.dispatchEvent(
                    new CustomEvent("theme:slider:resize", { bubbles: !1 })
                  )
                ),
                this.removeEventListener("animationstart", t);
            };
            this.addEventListener("animationstart", t);
          }));
      }
      constructor() {
        super(),
          (this.handle = this.getAttribute($i)),
          (this.label = this.getAttribute(zi).trim().toLowerCase()),
          (function (t) {
            const e = `${theme.routes.root}products/${t}.js`;
            return window
              .fetch(e)
              .then((t) => t.json())
              .catch((t) => {
                console.error(t);
              });
          })(this.handle).then((t) => {
            (this.product = t),
              (this.colorOption = t.options.find(
                (t) => t.name.toLowerCase() === this.label || null
              )),
              this.colorOption &&
                ((this.swatches = this.colorOption.values), this.init());
          });
      }
    },
    Xi = class {
      checkSwatchesHeight(t) {
        const e = t.querySelector(Ti),
          i = t.querySelector(Pi),
          s = parseInt(
            window.getComputedStyle(t).getPropertyValue("padding-top")
          ),
          o = parseInt(
            window.getComputedStyle(e).getPropertyValue("margin-bottom")
          ),
          n = parseInt(
            window.getComputedStyle(i).getPropertyValue("margin-bottom")
          ),
          r = t.closest(Fi);
        r.classList.remove(Bi),
          t.offsetHeight - s >
            e.offsetHeight + o + 2 * i.offsetHeight + 2 * n &&
            (t.style.setProperty(
              "--swatches-max-height",
              `${t.offsetHeight}px`
            ),
            r.classList.add(Bi));
      }
      onUnload() {
        this.swatchesContainers.forEach((t) => {
          document.removeEventListener(
            "theme:resize:width",
            this.checkSwatchesHeightOnResize
          );
        });
      }
      constructor(t) {
        (this.container = t),
          (this.swatchesContainers = this.container.querySelectorAll(Ci)),
          this.swatchesContainers.forEach((t) => {
            (this.checkSwatchesHeightOnResize = () =>
              this.checkSwatchesHeight(t)),
              this.checkSwatchesHeight(t),
              document.addEventListener(
                "theme:resize:width",
                this.checkSwatchesHeightOnResize
              );
          });
      }
    };
  const Ji = (t) => {
      ji = [];
      t.querySelectorAll(bi).forEach((t) => {
        ji.push(new Qi(t));
      });
    },
    Yi = {
      onLoad() {
        Ji(this.container);
      },
    },
    Zi = {
      onLoad() {
        Ki[this.id] = new Xi(this.container);
      },
      onUnload() {
        Ki[this.id].onUnload();
      },
    },
    ts = "[data-slider]",
    es = "[data-product-media-container]",
    is = "[data-product-media-slideshow]",
    ss = "[data-product-media-slideshow-slide]",
    os = "[data-product-slideshow-progress]",
    ns = ".flickity-button",
    rs = "[data-product]",
    as = "[data-popup-close]",
    ls = "fill",
    cs = "js-quick-view-visible",
    hs = {};
  let ds = class {
    productGridSlideshow() {
      const t = this.container.querySelectorAll(is),
        e = this.container.querySelectorAll(es);
      t.length &&
        t.forEach((t) => {
          const e = t.closest(es),
            s = e.querySelector(os),
            o = t.querySelectorAll(ss).length,
            n = 2200,
            r = !this.sliders.length;
          let a = new i.data(t),
            l = 0,
            c = ss;
          !a.isActive &&
            o > 1 &&
            ((a = new i(t, {
              draggable: r,
              cellSelector: c,
              contain: !0,
              wrapAround: !0,
              imagesLoaded: !0,
              pageDots: !1,
              prevNextButtons: !1,
              adaptiveHeight: !1,
              pauseAutoPlayOnHover: !1,
              selectedAttraction: 0.2,
              friction: 1,
              on: {
                ready: () => {
                  this.container.style.setProperty(
                    "--autoplay-speed",
                    "2200ms"
                  );
                },
                change: () => {
                  l && clearTimeout(l),
                    s.classList.remove(ls),
                    s.offsetWidth,
                    requestAnimationFrame(() => {
                      s.classList.add(ls);
                    }),
                    (l = setTimeout(() => {
                      s.classList.remove(ls);
                    }, n));
                },
                dragEnd: () => {
                  a.playPlayer();
                },
              },
            })),
            window.theme.touch ||
              (e.addEventListener("mouseenter", () => {
                s.classList.add(ls),
                  l && clearTimeout(l),
                  (l = setTimeout(() => {
                    s.classList.remove(ls);
                  }, n)),
                  (a.options.autoPlay = n),
                  a.playPlayer();
              }),
              e.addEventListener("mouseleave", () => {
                a.stopPlayer(), l && clearTimeout(l), s.classList.remove(ls);
              })));
        }),
        e.length &&
          e.forEach((t) => {
            t.addEventListener("click", (t) => {
              t.target.matches(ns) && t.preventDefault();
            });
          });
    }
    popupClose() {
      const t = document.querySelector(rs);
      if (t) {
        t.querySelector(as).dispatchEvent(new Event("click"));
      }
    }
    onBlockSelect() {
      this.body.classList.contains(cs) && this.popupClose();
    }
    onDeselect() {
      this.body.classList.contains(cs) && this.popupClose();
    }
    onUnload() {
      this.body.classList.contains(cs) && this.popupClose();
    }
    constructor(t) {
      (this.container = t),
        (this.body = document.body),
        (this.sliders = this.container.querySelectorAll(ts)),
        "slideshow" !== theme.settings.productGridHover ||
          window.theme.touch ||
          this.productGridSlideshow(),
        new Il(this.container);
    }
  };
  const us = {
      onLoad() {
        hs[this.id] = new ds(this.container);
      },
      onBlockSelect() {
        hs[this.id].onBlockSelect();
      },
      onDeselect() {
        hs[this.id].onDeselect();
      },
      onUnload() {
        hs[this.id].onUnload();
      },
    },
    ps = "#AjaxinateLoop",
    ms = "#AjaxinatePagination",
    gs = "data-ajaxinate-id",
    vs = "is-loaded";
  let ys = {},
    fs = class {
      init() {
        this.loadMoreFix(),
          (this.ajaxinateContainer = this.container.querySelectorAll(ps)),
          this.ajaxinateContainer.forEach((t) => {
            const e = `${ps}[${gs}="${t.dataset.ajaxinateId}"]`,
              i = `${ms}[${gs}="${t.dataset.ajaxinateId}"]`;
            if (t.children.length > 0) {
              const s = new o({
                container: e,
                pagination: i,
                method: "scroll",
              });
              t.classList.add(vs), this.endlessScroll.push(s);
            }
          });
      }
      update(t) {
        this.ajaxinateContainer = this.container.querySelectorAll(ps);
        const e = (e) => e.settings.container === t,
          i = this.endlessScroll.find(e);
        if (i) {
          const t = this.endlessScroll.findIndex(e);
          this.endlessScroll.splice(t, 1),
            (i.settings.method = "scroll"),
            i.destroy();
        }
        const s = [...this.ajaxinateContainer].find(
          (e) => `${ps}[${gs}="${e.dataset.ajaxinateId}"]` === t
        );
        if (!s) return;
        const n = `${ps}[${gs}="${s.dataset.ajaxinateId}"]`,
          r = `${ms}[${gs}="${s.dataset.ajaxinateId}"]`;
        if (!(s.children.length > 0)) return;
        const a = new o({ container: n, pagination: r, method: "scroll" });
        s.classList.add(vs), this.endlessScroll.push(a);
      }
      loadMoreFix() {
        o.prototype.loadMore = function () {
          (this.request = new XMLHttpRequest()),
            (this.request.onreadystatechange = function () {
              if (!this.request.responseXML) return;
              if (
                4 === !this.request.readyState ||
                200 === !this.request.status
              )
                return;
              const t = this.request.responseXML.querySelector(
                  this.settings.container
                ),
                e = this.request.responseXML.querySelector(
                  this.settings.pagination
                );
              this.containerElement.insertAdjacentHTML(
                "beforeend",
                t.innerHTML
              ),
                null == e
                  ? this.removePaginationElement()
                  : ((this.paginationElement.innerHTML = e.innerHTML),
                    this.settings.callback &&
                      "function" == typeof this.settings.callback &&
                      this.settings.callback(this.request.responseXML),
                    this.initialize());
            }.bind(this)),
            this.request.open("GET", this.nextPageUrl, !0),
            (this.request.responseType = "document"),
            this.request.send();
        };
      }
      unload() {
        this.endlessScroll.length > 0 &&
          (this.endlessScroll.forEach((t) => {
            (t.settings.method = "scroll"), t.destroy();
          }),
          this.ajaxinateContainer.forEach((t) => t.classList.remove(vs)));
      }
      constructor(t) {
        (this.container = t),
          (this.endlessScroll = []),
          theme.settings.enableInfinityScroll && this.init();
      }
    };
  const bs = {
      onLoad() {
        ys = new fs(this.container);
      },
      onUnload: function () {
        "function" == typeof ys.unload && ys.unload();
      },
    },
    ws = 300,
    Es = "[data-toggle-filters]",
    Ss = "[data-close-filters]",
    Ls = "[data-open-filters]",
    ks = "[data-collection-wrapper]",
    As = "[data-collapsible-trigger]",
    qs = "[data-sort-toggle]",
    Cs = "[data-collection-sort-options]",
    Ts = "[data-input-sort]",
    Ps = "[data-collection-filters]",
    Fs = "[data-collection-filters-list]",
    Is = "[data-collection-sticky-bar]",
    xs = "[data-collection-filter]",
    Hs = "[data-collection-filter-tag]",
    Ds = "[data-collection-filter-tag-button]",
    Ms = "[data-collection-filters-form]",
    Os = "[data-filter-reset-button]",
    Bs = "[data-filter-tag-reset-button]",
    _s = '[data-section-type="popups"]',
    $s = "[data-collection-products]",
    zs = "[data-products-count]",
    Rs = "[data-field-price-min]",
    Vs = "[data-field-price-max]",
    Ws = "[data-se-min-value]",
    Ns = "[data-se-max-value]",
    Us = "data-se-min-value",
    js = "data-se-max-value",
    Ks = "data-se-min",
    Qs = "data-se-max",
    Gs = "[data-tooltip]",
    Xs = "[data-tooltip-container]",
    Js = "[data-show-more]",
    Ys = "[data-show-more-actions]",
    Zs = "[data-show-more-container]",
    to = "[data-show-more-trigger]",
    eo = "[data-search-performed]",
    io = "[data-search-form]",
    so = "[data-custom-scrollbar]",
    oo = "is-active",
    no = "is-expanded",
    ro = "is-visible",
    ao = "is-loading",
    lo = "popup--visible",
    co = "collection__filters--visible",
    ho = "collection__sort__option-wrapper--visible",
    uo = "data-filter-active",
    po = "data-prevent-scroll-lock",
    mo = "data-filters-default-state",
    go = "tabindex",
    vo = "aria-expanded",
    yo = "data-current-type",
    fo = {};
  let bo = class {
    initFacetedFilters() {
      "tag" != this.filterMode &&
        "group" != this.filterMode &&
        this.enableFilters &&
        (this.rangeSlider = new (class {
          init() {
            if (
              ((this.slider = this.container.querySelector(Xe)), !this.slider)
            )
              return;
            (this.resizeFilters = n(this.reset.bind(this), 50)),
              (this.onMoveEvent = (t) => this.onMove(t)),
              (this.onStopEvent = (t) => this.onStop(t)),
              (this.onStartEvent = (t) => this.onStart(t)),
              (this.startX = 0),
              (this.x = 0),
              (this.touchLeft = this.slider.querySelector(Je)),
              (this.touchRight = this.slider.querySelector(Ye)),
              (this.lineSpan = this.slider.querySelector(Ze)),
              (this.min = parseFloat(this.slider.getAttribute(ei))),
              (this.max = parseFloat(this.slider.getAttribute(ii))),
              (this.step = 0),
              (this.normalizeFact = 20);
            let t = this.min;
            this.slider.hasAttribute(si) &&
              (t = parseFloat(this.slider.getAttribute(si)));
            let e = this.max;
            this.slider.hasAttribute(oi) &&
              (e = parseFloat(this.slider.getAttribute(oi))),
              t < this.min && (t = this.min),
              e > this.max && (e = this.max),
              t > e && (t = e),
              this.slider.getAttribute(ni) &&
                (this.step = Math.abs(
                  parseFloat(this.slider.getAttribute(ni))
                )),
              this.reset(),
              window.addEventListener("theme:resize", this.resizeFilters),
              (this.maxX =
                this.slider.offsetWidth - this.touchRight.offsetWidth),
              (this.selectedTouch = null),
              (this.initialValue =
                this.lineSpan.offsetWidth - this.normalizeFact),
              this.setMinValue(t),
              this.setMaxValue(e),
              this.touchLeft.addEventListener("mousedown", this.onStartEvent),
              this.touchRight.addEventListener("mousedown", this.onStartEvent),
              this.touchLeft.addEventListener("touchstart", this.onStartEvent, {
                passive: !0,
              }),
              this.touchRight.addEventListener(
                "touchstart",
                this.onStartEvent,
                { passive: !0 }
              ),
              this.slider.classList.add(ci);
          }
          reset() {
            (this.touchLeft.style.left = "0px"),
              (this.touchRight.style.left =
                this.slider.offsetWidth - this.touchLeft.offsetWidth + "px"),
              (this.lineSpan.style.marginLeft = "0px"),
              (this.lineSpan.style.width =
                this.slider.offsetWidth - this.touchLeft.offsetWidth + "px"),
              (this.startX = 0),
              (this.x = 0),
              (this.maxX =
                this.slider.offsetWidth - this.touchRight.offsetWidth),
              (this.initialValue =
                this.lineSpan.offsetWidth - this.normalizeFact);
          }
          setMinValue(t) {
            const e = (t - this.min) / (this.max - this.min);
            (this.touchLeft.style.left =
              Math.ceil(
                e *
                  (this.slider.offsetWidth -
                    (this.touchLeft.offsetWidth + this.normalizeFact))
              ) + "px"),
              (this.lineSpan.style.marginLeft =
                this.touchLeft.offsetLeft + "px"),
              (this.lineSpan.style.width =
                this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
              this.slider.setAttribute(si, t);
          }
          setMaxValue(t) {
            const e = (t - this.min) / (this.max - this.min);
            (this.touchRight.style.left =
              Math.ceil(
                e *
                  (this.slider.offsetWidth -
                    (this.touchLeft.offsetWidth + this.normalizeFact)) +
                  this.normalizeFact
              ) + "px"),
              (this.lineSpan.style.marginLeft =
                this.touchLeft.offsetLeft + "px"),
              (this.lineSpan.style.width =
                this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
              this.slider.setAttribute(oi, t);
          }
          onStart(t) {
            t.preventDefault();
            let e = t;
            t.touches && (e = t.touches[0]),
              t.currentTarget === this.touchLeft
                ? (this.x = this.touchLeft.offsetLeft)
                : t.currentTarget === this.touchRight &&
                  (this.x = this.touchRight.offsetLeft),
              (this.startX = e.pageX - this.x),
              (this.selectedTouch = t.currentTarget),
              document.addEventListener("mousemove", this.onMoveEvent),
              document.addEventListener("mouseup", this.onStopEvent),
              document.addEventListener("touchmove", this.onMoveEvent, {
                passive: !0,
              }),
              document.addEventListener("touchend", this.onStopEvent, {
                passive: !0,
              });
          }
          onMove(t) {
            let e = t;
            t.touches && (e = t.touches[0]),
              (this.x = e.pageX - this.startX),
              this.selectedTouch === this.touchLeft
                ? (this.x >
                  this.touchRight.offsetLeft -
                    this.selectedTouch.offsetWidth +
                    10
                    ? (this.x =
                        this.touchRight.offsetLeft -
                        this.selectedTouch.offsetWidth +
                        10)
                    : this.x < 0 && (this.x = 0),
                  (this.selectedTouch.style.left = this.x + "px"))
                : this.selectedTouch === this.touchRight &&
                  (this.x <
                  this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10
                    ? (this.x =
                        this.touchLeft.offsetLeft +
                        this.touchLeft.offsetWidth -
                        10)
                    : this.x > this.maxX && (this.x = this.maxX),
                  (this.selectedTouch.style.left = this.x + "px")),
              (this.lineSpan.style.marginLeft =
                this.touchLeft.offsetLeft + "px"),
              (this.lineSpan.style.width =
                this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
              this.calculateValue(),
              this.slider.getAttribute("on-change") &&
                new Function("min, max", this.slider.getAttribute("on-change"))(
                  this.slider.getAttribute(si),
                  this.slider.getAttribute(oi)
                ),
              this.onChange(
                this.slider.getAttribute(si),
                this.slider.getAttribute(oi)
              );
          }
          onStop(t) {
            document.removeEventListener("mousemove", this.onMoveEvent),
              document.removeEventListener("mouseup", this.onStopEvent),
              document.removeEventListener("touchmove", this.onMoveEvent, {
                passive: !0,
              }),
              document.removeEventListener("touchend", this.onStopEvent, {
                passive: !0,
              }),
              (this.selectedTouch = null),
              this.calculateValue(),
              this.onChanged(
                this.slider.getAttribute(si),
                this.slider.getAttribute(oi)
              );
          }
          onChange(t, e) {
            const i = this.slider.closest(ti);
            if (i) {
              const s = i.querySelector(ai),
                o = i.querySelector(li);
              s && o && ((s.value = parseInt(t)), (o.value = parseInt(e)));
            }
          }
          onChanged(t, e) {
            this.slider.hasAttribute(ri) &&
              this.slider.dispatchEvent(
                new CustomEvent("theme:filter:range-update", { bubbles: !0 })
              );
          }
          calculateValue() {
            const t =
              (this.lineSpan.offsetWidth - this.normalizeFact) /
              this.initialValue;
            let e = this.lineSpan.offsetLeft / this.initialValue,
              i = e + t;
            if (
              ((e = e * (this.max - this.min) + this.min),
              (i = i * (this.max - this.min) + this.min),
              0 !== this.step)
            ) {
              let t = Math.floor(e / this.step);
              (e = this.step * t),
                (t = Math.floor(i / this.step)),
                (i = this.step * t);
            }
            this.selectedTouch === this.touchLeft &&
              this.slider.setAttribute(si, e),
              this.selectedTouch === this.touchRight &&
                this.slider.setAttribute(oi, i);
          }
          unload() {
            document.removeEventListener(
              "theme:filters:init",
              this.initListener
            ),
              window.removeEventListener("theme:resize", this.resizeFilters);
          }
          constructor(t) {
            (this.container = t),
              this.init(),
              (this.initListener = () => this.init()),
              document.addEventListener(
                "theme:filters:init",
                this.initListener
              );
          }
        })(this.container));
    }
    initTooltips() {
      var t, e;
      ((this.tooltips = this.container.querySelectorAll(Gs)),
      window.innerWidth < theme.sizes.small) &&
        (this.tooltips =
          null === (e = this.productGrid) || void 0 === e
            ? void 0
            : e.querySelectorAll(Gs));
      null === (t = this.tooltips) ||
        void 0 === t ||
        t.forEach((t) => {
          new Qe(t);
        }),
        this.handleVisibleTooltips();
    }
    handleVisibleTooltips() {
      if (this.tooltips.length > 0) {
        const t = document.querySelector(Xs);
        t.classList.contains(ro) && t.classList.remove(ro);
      }
    }
    updateRange() {
      const t = this.filtersForm.querySelector(Ws),
        e = this.filtersForm.querySelector(Ns),
        i = this.filtersForm.querySelector(Rs),
        s = this.filtersForm.querySelector(Vs);
      if (t.hasAttribute(Us) && e.hasAttribute(js)) {
        const o = parseFloat(i.placeholder, 10),
          n = parseFloat(s.placeholder, 10),
          r = parseFloat(t.getAttribute(Us), 10),
          a = parseFloat(e.getAttribute(js), 10);
        (o === r && n === a) ||
          ((i.value = parseInt(r)),
          (s.value = parseInt(a)),
          this.filtersForm.dispatchEvent(new Event("input", { bubbles: !0 })));
      }
    }
    onSubmitHandler(t) {
      t.preventDefault();
      const e = new FormData(this.filtersForm),
        i = new URLSearchParams(e),
        s = [];
      let o = "";
      this.isSearchPage &&
        ((this.searchForm = this.container.querySelector(io)),
        (this.currentType = this.container.getAttribute(yo)));
      const n = this.filtersForm.querySelector(Ws),
        r = this.filtersForm.querySelector(Ns),
        a = this.filtersForm.querySelector(Rs),
        l = this.filtersForm.querySelector(Vs);
      if (n && r && a && l && n.hasAttribute(Ks) && r.hasAttribute(Qs)) {
        const t = parseFloat(n.getAttribute(Ks), 10),
          e = parseFloat(r.getAttribute(Qs), 10),
          o = a.value ? parseFloat(a.value, 10) : t,
          c = l.value ? parseFloat(l.value, 10) : e;
        o <= t &&
          c >= e &&
          (s.push("filter.v.price.gte"),
          s.push("filter.v.price.lte"),
          i.delete("filter.v.price.gte"),
          i.delete("filter.v.price.lte"));
      }
      if (((o = i.toString()), this.isSearchPage)) {
        o = Fe(this.searchForm, this.filtersForm, s);
        let t = "";
        "all" === this.currentType && (t = "&type=product"),
          o.indexOf("&type=product") > -1 && (t = ""),
          (o += t);
      }
      this.renderSection(o, t);
    }
    onHistoryChange(t) {
      var e;
      if (!this.filters) return;
      let i =
        (null === (e = t.state) || void 0 === e ? void 0 : e.searchParams) ||
        "";
      if (this.isSearchPage) {
        t.state || (i = window.location.search);
        if (!(i.indexOf("type=product") > -1)) return;
      }
      this.renderSection(i, null, !1);
    }
    renderSection(t, e, i = !0) {
      this.startLoading();
      const s = `${window.location.pathname}?section_id=${this.sectionId}&${t}`,
        o = (t) => t.url === s;
      this.filterData.some(o)
        ? this.renderSectionFromCache(o, e)
        : this.renderSectionFromFetch(s, e),
        i && this.updateURLHash(t);
    }
    renderSectionFromFetch(t) {
      fetch(t)
        .then((t) => t.text())
        .then((e) => {
          const i = e;
          (this.filterData = [...this.filterData, { html: i, url: t }]),
            (this.inputSort = this.container.querySelectorAll(Ts)),
            this.renderFilters(i),
            this.bindFilterButtonsEvents(),
            this.hideFiltersOnMobile(),
            this.renderProductGrid(i),
            this.updateProductsCount(i),
            this.finishLoading(),
            this.mobileFiltersScrollLock(),
            this.handleSearchPageActiveTab();
        });
    }
    renderSectionFromCache(t, e) {
      const i = this.filterData.find(t).html;
      this.renderFilters(i, e),
        this.hideFiltersOnMobile(),
        this.renderProductGrid(i),
        this.updateProductsCount(i),
        this.finishLoading(),
        this.mobileFiltersScrollLock(),
        this.handleSearchPageActiveTab();
    }
    handleSearchPageActiveTab() {
      this.isSearchPage &&
        ((this.scrollable = this.container.querySelector(so)),
        this.scrollable &&
          !this.customScrollbar &&
          (this.customScrollbar = new Me(this.container)));
    }
    renderProductGrid(t) {
      const e = new DOMParser()
        .parseFromString(t, "text/html")
        .querySelector($s);
      e &&
        ((this.productGrid.innerHTML = e.innerHTML),
        this.initProductGridEvents(theme.settings.enableInfinityScroll),
        this.filterShowMore());
    }
    updateProductsCount(t) {
      const e = new DOMParser()
        .parseFromString(t, "text/html")
        .querySelector(zs);
      e && (this.productsCount.innerHTML = e.innerHTML);
    }
    renderFilters(t) {
      const e = new DOMParser()
        .parseFromString(t, "text/html")
        .querySelector(Ps);
      e &&
        ((this.filters.innerHTML = e.innerHTML),
        (this.filtersForm = document.querySelector(Ms)),
        this.bindFilterButtonsEvents(),
        this.bindToggleButtonsEvents(),
        Ji(this.container),
        (this.collapsible = new Mt(this.container)),
        document.dispatchEvent(
          new CustomEvent("theme:filters:init", { bubbles: !0 })
        ));
    }
    updateURLHash(t) {
      history.pushState(
        { searchParams: t },
        "",
        `${window.location.pathname}${t && "?".concat(t)}`
      );
    }
    bindFilterButtonsEvents() {
      this.inputSort.length > 0 &&
        this.inputSort.forEach((t) => {
          t.addEventListener("change", this.updateCollectionFormSortEvent);
        }),
        this.filtersForm &&
          (this.filtersForm.addEventListener(
            "input",
            this.debouncedSubmitEvent.bind(this)
          ),
          this.filtersForm.addEventListener(
            "theme:filter:range-update",
            this.updateRangeEvent
          )),
        this.collectionSortOptions &&
          this.collectionSortOptions.addEventListener(
            "keyup",
            this.onTabHandlerEvent
          ),
        "tag" != this.filterMode &&
          "group" != this.filterMode &&
          this.enableFilters &&
          this.container.querySelectorAll(Os).forEach((t) => {
            t.addEventListener("click", this.onFilterResetClick, { once: !0 });
          });
    }
    onFilterResetClick(t) {
      t.preventDefault(),
        this.renderSection(
          new URL(t.currentTarget.href).searchParams.toString()
        );
    }
    bindToggleButtonsEvents() {
      var t;
      this.container.querySelectorAll(Es).forEach((t) => {
        t.addEventListener("click", this.onFilterToggleClick);
      }),
        this.container.querySelectorAll(Ss).forEach((t) => {
          t.addEventListener("click", this.hideFiltersDrawer);
        }),
        this.container.querySelectorAll(Ls).forEach((t) => {
          t.addEventListener("click", this.showFiltersDrawer);
        }),
        null === (t = this.container.querySelector(ks)) ||
          void 0 === t ||
          t.addEventListener("keyup", this.onKeyUpHandler);
    }
    onTabHandler(t) {
      if (
        t.code === theme.keyboardKeys.SPACE ||
        t.code === theme.keyboardKeys.ENTER ||
        t.code === theme.keyboardKeys.NUMPADENTER
      ) {
        const e = t.target.previousElementSibling.value;
        this.filtersForm.querySelectorAll(Ts).forEach((t) => {
          t.checked && (t.checked = !1), t.value === e && (t.checked = !0);
        }),
          this.filtersForm.dispatchEvent(new Event("input", { bubbles: !0 })),
          t.target.dispatchEvent(new Event("click", { bubbles: !0 }));
      }
    }
    onKeyUpHandler(t) {
      t.code === theme.keyboardKeys.ESCAPE && this.hideFiltersDrawer();
    }
    onFilterToggleClick(t) {
      t.preventDefault(), w();
      this.filters.classList.contains(co)
        ? this.hideFiltersDrawer()
        : this.showFiltersDrawer();
    }
    sortDropdownToggle() {
      this.collectionSortOptions &&
        this.collectionSortOptions.classList.toggle(ho);
    }
    bodyClick(t) {
      if (!this.collectionSortOptions) return;
      const e = this.sortToggle.contains(t.target);
      this.collectionSortOptions.classList.contains(ho) &&
        !e &&
        this.sortDropdownToggle();
    }
    updateCollectionFormSort(t) {
      const e = t.target,
        i = e.value,
        s = e.closest(Cs);
      this.container.querySelectorAll(Ts).forEach((t) => {
        t.value === i && (t.checked = !0);
      }),
        null !== s &&
          this.filtersForm.dispatchEvent(new Event("input", { bubbles: !0 }));
    }
    showFiltersDrawer() {
      (this.a11y.state.trigger = document.querySelector(Es)),
        this.a11y.trapFocus({ container: this.filters }),
        this.mobileFiltersScrollLock();
    }
    mobileFiltersScrollLock() {
      if (window.innerWidth < theme.sizes.small) {
        const t = document.querySelector(Fs);
        this.filters.classList.contains(co) || this.filters.classList.add(co),
          document.dispatchEvent(
            new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: t })
          );
      }
    }
    hideFiltersOnMobile() {
      const t = this.container.querySelectorAll(`${As}:not(${to})`);
      window.innerWidth < theme.sizes.small &&
        requestAnimationFrame(() => {
          t.forEach((t) => {
            const e = "true" === t.getAttribute(uo);
            t.classList.contains(no) &&
              !e &&
              t.dispatchEvent(new Event("click"));
          });
        });
    }
    showFiltersOnDesktop() {
      const t = this.container.querySelectorAll(`${As}:not(${to})`),
        e = this.container.getAttribute(mo),
        i = "first-open" === e,
        s = "open" === e,
        o = "closed" === e,
        n = this.enableSorting ? 1 : 0;
      t.forEach((t, e) => {
        const r = t.classList.contains(no),
          a = "true" === t.getAttribute(uo),
          l = a && !r && s;
        (a && !l) ||
          (((o && r) ||
            (i && !r && e === n) ||
            (i && r && e !== n) ||
            (s && !r) ||
            l) &&
            t.dispatchEvent(new Event("click")));
      });
    }
    hideFiltersDrawer() {
      let t = this.filters.classList.contains(co),
        e = this.container.classList.contains(ao);
      t && (this.filters.classList.remove(co), this.a11y.removeTrapFocus()),
        e ||
          document.dispatchEvent(
            new CustomEvent("theme:scroll:unlock", { bubbles: !0, detail: ws })
          );
    }
    filtersResizeEvents() {
      window.innerWidth >= theme.sizes.small
        ? (this.showFiltersOnDesktop(), this.hideFiltersDrawer())
        : this.hideFiltersOnMobile();
    }
    filterShowMore() {
      (this.showMore = this.container.querySelectorAll(Js)),
        0 !== this.showMore.length &&
          this.showMore.forEach((t) => {
            const e = t.querySelector(As),
              i = t.querySelector(Ys);
            if (!i) return;
            const s = i.querySelector(to),
              o = i.querySelector(Zs),
              n = o.querySelectorAll(window.theme.focusable);
            "true" === o.getAttribute(vo) ||
              n.forEach((t) => {
                t.setAttribute(go, "-1");
              }),
              s.addEventListener("keyup", (t) => {
                (t.code !== theme.keyboardKeys.SPACE &&
                  t.code !== theme.keyboardKeys.ENTER &&
                  t.code !== theme.keyboardKeys.NUMPADENTER) ||
                  this.updateShowMoreFocusableElements(t, n);
              }),
              s.addEventListener("click", (t) => {
                this.updateShowMoreFocusableElements(t, n);
              }),
              e.addEventListener("keyup", (t) => {
                (t.code !== theme.keyboardKeys.SPACE &&
                  t.code !== theme.keyboardKeys.ENTER &&
                  t.code !== theme.keyboardKeys.NUMPADENTER) ||
                  this.updateCollapsedContainerFocusableElements(e, s, n);
              }),
              e.addEventListener("click", () => {
                this.updateCollapsedContainerFocusableElements(e, s, n);
              });
          });
    }
    updateCollapsedContainerFocusableElements(t, e, i) {
      requestAnimationFrame(() => {
        const s = "true" === t.getAttribute(vo),
          o = "true" === e.getAttribute(vo);
        i.forEach((t) => {
          !s && o && t.setAttribute(go, "-1"), s && o && t.removeAttribute(go);
        });
      });
    }
    updateShowMoreFocusableElements(t, e) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const i = "true" === t.target.getAttribute(vo);
          e.forEach((t, e) => {
            if (i) return t.removeAttribute(go), void (0 === e && t.focus());
            t.setAttribute(go, "-1");
          });
        });
      });
    }
    initTagFilters() {
      ("tag" != this.filterMode && "group" != this.filterMode) ||
        !this.enableFilters ||
        ((this.tags = this.container.dataset.tags.split("+").filter((t) => t)),
        this.bindFilterTagButtonsEvents(),
        this.bindSortChangeEvent());
    }
    renderTagFiltersProducts(t) {
      this.startLoading(),
        "object" == typeof this.endlessCollection &&
          this.endlessCollection.unload(),
        fetch(t)
          .then((t) => t.text())
          .then((e) => {
            const i = e,
              s = new DOMParser().parseFromString(i, "text/html"),
              o = s.querySelector($s).innerHTML,
              n = s.querySelector(Ps).innerHTML;
            (this.productGrid.innerHTML = o),
              (this.filters.innerHTML = n),
              (this.inputSort = this.container.querySelectorAll(Ts)),
              (this.filtersForm = document.querySelector(Ms)),
              (this.filterData = [...this.filterData, { html: i, url: t }]),
              (this.alreadyClicked = !1),
              this.bindFilterTagButtonsEvents(),
              this.bindFilterButtonsEvents(),
              this.bindSortChangeEvent(),
              this.bindToggleButtonsEvents(),
              this.initProductGridEvents(theme.settings.enableInfinityScroll),
              this.updateProductsCount(i),
              this.mobileFiltersScrollLock(),
              this.hideFiltersOnMobile(),
              Ji(this.container),
              (this.collapsible = new Mt(this.container)),
              this.filterShowMore(),
              history.replaceState &&
                window.history.pushState({ path: t }, "", t);
          })
          .catch((t) => {
            this.finishLoading(), console.log(`Error: ${t}`);
          });
    }
    bindFilterTagButtonsEvents() {
      this.container.querySelectorAll(Ds).forEach((t) => {
        t.addEventListener("click", this.onFilterTagButtonClick.bind(this));
      }),
        this.container.querySelectorAll(Bs).forEach((t) => {
          t.addEventListener("click", this.onFilterTagClearClick);
        }),
        this.container.querySelectorAll(Os).forEach((t) => {
          t.addEventListener("click", this.onFilterTagResetClick);
        });
    }
    bindSortChangeEvent() {
      this.container.querySelectorAll(Ts).forEach((t) => {
        t.addEventListener("input", this.debouncedSortEvent.bind(this));
      });
    }
    onFilterTagButtonClick(t) {
      if ((t.preventDefault(), this.alreadyClicked)) return;
      this.alreadyClicked = !0;
      const e = t.currentTarget,
        i = e.dataset.tag;
      if (e.parentNode.classList.contains(oo)) {
        let t = this.tags.indexOf(i);
        e.parentNode.classList.remove(oo), t > -1 && this.tags.splice(t, 1);
      } else e.parentNode.classList.add(oo), this.tags.push(i);
      let s =
        this.collectionHandle +
        "/" +
        this.tags.join("+") +
        "?sort_by=" +
        this.getSortValue();
      this.container.querySelector(xs).classList.remove(no),
        this.container.querySelector(xs).setAttribute(vo, !1),
        this.container.setAttribute("data-tags", "[" + this.tags + "]"),
        this.renderTagFiltersProducts(s);
    }
    onFilterTagClearClick(t) {
      if ((t.preventDefault(), this.alreadyClicked)) return;
      this.alreadyClicked = !0;
      const e = t.currentTarget.dataset.tag,
        i = this.tags.indexOf(e);
      i > -1 && this.tags.splice(i, 1);
      const s =
        this.collectionHandle +
        "/" +
        this.tags.join("+") +
        "?sort_by=" +
        this.getSortValue();
      this.container.setAttribute("data-tags", "[" + this.tags + "]"),
        this.renderTagFiltersProducts(s);
    }
    onSortChange() {
      let t =
        this.collectionHandle +
        "/" +
        this.tags.join("+") +
        "?sort_by=" +
        this.getSortValue();
      this.renderTagFiltersProducts(t);
    }
    getSortValue() {
      let t = "";
      return (
        this.inputSort.forEach((e) => {
          e.checked && (t = e.value);
        }),
        t
      );
    }
    onFilterTagResetClick(t) {
      if ((null == t || t.preventDefault(), this.alreadyClicked)) return;
      (this.alreadyClicked = !0),
        this.container.querySelectorAll(Hs).forEach((t) => {
          t.classList.remove(oo);
        }),
        this.container.querySelectorAll(xs).forEach((t) => {
          t.classList.remove(no), t.setAttribute(vo, !1);
        }),
        (this.tags = []),
        this.container.setAttribute("data-tags", "");
      let e = this.collectionHandle + "/?sort_by=" + this.getSortValue();
      this.renderTagFiltersProducts(e);
    }
    getProductsOffsetTop() {
      return (
        this.productGrid.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        this.filtersStickyBar.offsetHeight
      );
    }
    getStickyBarOffsetTop() {
      return (
        this.filtersStickyBar.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top
      );
    }
    initProductGridEvents(t) {
      if (t)
        return this.initInfinityScroll(), void this.initProductGridEvents(!1);
      (this.productGridEvents = new ds(this.container)),
        this.initTooltips(),
        setTimeout(() => {
          this.finishLoading();
        }, 1.5 * ws);
    }
    initInfinityScroll() {
      if (this.isSearchPage) {
        if (!this.enableFilters) return;
        document.dispatchEvent(
          new CustomEvent("theme:tab:ajaxinate", {
            bubbles: !0,
            detail: "product",
          })
        );
      } else
        "object" == typeof this.endlessCollection &&
          this.endlessCollection.unload(),
          (this.endlessCollection = new fs(this.container)),
          0 !== this.endlessCollection.endlessScroll.length &&
            (this.endlessCollection.endlessScroll[0].settings.callback = () =>
              this.initProductGridEvents(!1));
    }
    startLoading() {
      this.container.classList.add(ao),
        window.innerWidth >= theme.sizes.small &&
          document.dispatchEvent(
            new CustomEvent("theme:scroll:lock", { bubbles: !0 })
          );
      let t = this.getProductsOffsetTop();
      window.scrollTo({ top: t, left: 0, behavior: "smooth" });
    }
    finishLoading() {
      const t = document.querySelectorAll(`${_s} .${lo}`),
        e = t.length > 0;
      if ((this.container.classList.remove(ao), e)) {
        let e = 0;
        [...t].forEach((t) => {
          t.hasAttribute(po) && (e += 1);
        }),
          e === t.length &&
            document.dispatchEvent(
              new CustomEvent("theme:scroll:unlock", {
                bubbles: !0,
                detail: ws,
              })
            );
      } else
        window.innerWidth >= theme.sizes.small &&
          document.dispatchEvent(
            new CustomEvent("theme:scroll:unlock", { bubbles: !0, detail: ws })
          );
    }
    onDeselect() {
      this.productGridEvents && this.productGridEvents.onDeselect();
    }
    onUnload() {
      "object" == typeof this.endlessCollection &&
        this.endlessCollection.unload(),
        this.productGridEvents && this.productGridEvents.onUnload(),
        this.collapsible && this.collapsible.onUnload(),
        this.rangeSlider && this.rangeSlider.unload(),
        this.filters &&
          document.removeEventListener("theme:resize:width", this.resizeEvent),
        document.removeEventListener("click", this.bodyClickEvent),
        this.groupTagFilters.length > 0 && this.onFilterTagResetClick(),
        this.finishLoading();
    }
    constructor(t) {
      var e;
      (this.container = t),
        (this.sectionId = t.dataset.sectionId),
        (this.enableFilters = "true" === t.dataset.enableFilters),
        (this.enableSorting = "true" === t.dataset.enableSorting),
        (this.filterMode = t.dataset.filterMode),
        (this.collectionHandle = this.container.dataset.collection),
        (this.isSearchPage = null != t.closest(eo)),
        (this.productGrid = this.container.querySelector($s)),
        (this.productsCount = this.container.querySelector(zs)),
        (this.groupTagFilters = this.container.querySelectorAll(xs)),
        (this.filters = this.container.querySelector(Ps)),
        (this.filterTriggers = this.container.querySelectorAll(As)),
        (this.filtersStickyBar = this.container.querySelector(Is)),
        (this.filtersForm = this.container.querySelector(Ms)),
        (this.inputSort = this.container.querySelectorAll(Ts)),
        (this.sortToggle = this.container.querySelector(qs)),
        (this.collectionSortOptions = this.container.querySelector(Cs)),
        (this.a11y = Ut),
        (this.filterData = []),
        (this.rangeSlider = null),
        (this.sortDropdownEvent = () => this.sortDropdownToggle()),
        (this.onTabHandlerEvent = (t) => this.onTabHandler(t)),
        (this.updateCollectionFormSortEvent = (t) =>
          this.updateCollectionFormSort(t)),
        (this.bodyClickEvent = (t) => this.bodyClick(t)),
        (this.onFilterResetClick = this.onFilterResetClick.bind(this)),
        (this.onFilterTagResetClick = this.onFilterTagResetClick.bind(this)),
        (this.onFilterTagClearClick = this.onFilterTagClearClick.bind(this)),
        (this.onFilterToggleClick = this.onFilterToggleClick.bind(this)),
        (this.onKeyUpHandler = this.onKeyUpHandler.bind(this)),
        (this.updateRangeEvent = this.updateRange.bind(this)),
        (this.debouncedSubmitEvent = n((t) => {
          this.onSubmitHandler(t);
        }, 500)),
        (this.debouncedSortEvent = n((t) => {
          this.onSortChange(t);
        }, 500)),
        (this.productGridEvents = {}),
        this.filters &&
          ((this.hideFiltersDrawer = this.hideFiltersDrawer.bind(this)),
          (this.showFiltersDrawer = this.showFiltersDrawer.bind(this)),
          (this.resizeEvent = n(() => {
            this.filtersResizeEvents();
          }, 500)),
          this.filtersResizeEvents(),
          document.addEventListener("theme:resize:width", this.resizeEvent)),
        this.initTagFilters(),
        this.initFacetedFilters(),
        this.bindToggleButtonsEvents(),
        this.bindFilterButtonsEvents(),
        this.initProductGridEvents(theme.settings.enableInfinityScroll),
        Ji(this.container),
        (this.collapsible = new Mt(this.container)),
        w(),
        window.addEventListener("popstate", this.onHistoryChange.bind(this)),
        null === (e = this.sortToggle) ||
          void 0 === e ||
          e.addEventListener("click", this.sortDropdownEvent),
        document.addEventListener("click", this.bodyClickEvent),
        this.filterShowMore();
    }
  };
  const wo = {
      onLoad() {
        fo[this.id] = new bo(this.container);
      },
      onDeselect() {
        fo[this.id].onDeselect();
      },
      onUnload() {
        fo[this.id].onUnload();
      },
    },
    Eo = "[data-tabs-link]",
    So = "[data-tab]",
    Lo = "[data-tab-ref]",
    ko = "[data-custom-scrollbar]",
    Ao = "[data-custom-scrollbar-holder]",
    qo = "[data-slider]",
    Co = "[data-tabs-contents]",
    To = "[data-search-form]",
    Po = "[data-all-types-container]",
    Fo = "[data-collection-filters-form]",
    Io = "[data-current-page]",
    xo = "[data-tooltip]",
    Ho = "[data-collection-products]",
    Do = "#AjaxinateLoop",
    Mo = "current",
    Oo = "hide",
    Bo = "alt",
    _o = "aos-animate",
    $o = "aos-init",
    zo = "is-loaded",
    Ro = "data-tabs-link",
    Vo = "data-tab",
    Wo = "data-tab-ref",
    No = "data-start-index",
    Uo = "data-search-performed",
    jo = "data-type",
    Ko = "data-current-type",
    Qo = "data-all-types",
    Go = "data-current-page",
    Xo = "data-ajaxinate-id",
    Jo = {};
  let Yo = class {
    assignSearchPageArguments() {
      this.isSearchPage &&
        ((this.searchForm = this.container.querySelector(To)),
        (this.searchFormData = new FormData(this.searchForm)),
        (this.searchTerm = encodeURIComponent(this.searchFormData.get("q"))),
        (this.currentType = this.container.getAttribute(Ko)),
        (this.sectionId = this.container.dataset.sectionId),
        (this.searchForAllTypes = "true" === this.container.getAttribute(Qo)),
        (this.fetchURL = ""),
        (this.searchParams = ""),
        (this.cachedResults = {}),
        this.handleTabsHistory(),
        this.infiniteScrollListener(),
        this.initInfinityScroll(this.currentType));
    }
    init() {
      const t = this.container.querySelectorAll(Eo),
        e = this.container.querySelector(
          `[${Ro}="${
            this.container.hasAttribute(No)
              ? this.container.getAttribute(No)
              : 0
          }"]`
        ),
        i = this.container.querySelector(
          `[${Vo}="${
            this.container.hasAttribute(No)
              ? this.container.getAttribute(No)
              : 0
          }"]`
        );
      null == i || i.classList.add(Mo),
        null == e || e.classList.add(Mo),
        this.checkVisibleTabsLinks(),
        t.forEach((t) => {
          this.handleTabsNavListeners(t);
        });
    }
    handleTabsHistory() {
      window.addEventListener("popstate", this.onHistoryChange.bind(this)),
        (this.openTabFromHistoryEvent = (t) => this.openTabFromHistory(t)),
        this.tabsLink.forEach((t) => {
          t.addEventListener(
            "theme:tab:open-from-history",
            this.openTabFromHistoryEvent
          );
        });
    }
    handleTabsNavListeners(t) {
      const e = t.getAttribute(Ro),
        i = this.container.querySelector(`[${Vo}="${e}"]`);
      i &&
        (t.addEventListener("click", (e) => {
          this.isSearchPage && this.handleURLSearchParams(e, !0),
            this.tabChange(t, i);
        }),
        t.addEventListener("keyup", (e) => {
          (e.code !== theme.keyboardKeys.SPACE &&
            e.code !== theme.keyboardKeys.ENTER &&
            e.code !== theme.keyboardKeys.NUMPADENTER) ||
            (this.isSearchPage && this.handleURLSearchParams(e, !0),
            this.tabChange(t, i));
        }));
    }
    openTabFromHistory(t) {
      const e = t.target,
        i = this.container.querySelector(t.detail.element).getAttribute(Ro),
        s = this.container.querySelector(`[${Vo}="${i}"]`);
      s && (this.handleURLSearchParams(t, !1), this.tabChange(e, s));
    }
    handleURLSearchParams(t, e = !0) {
      const i = t.target.matches(Eo) ? t.target : t.target.closest(Eo),
        s = i.getAttribute(jo),
        o = i.getAttribute(Ro),
        n = this.container.querySelector(`[${Vo}="${o}"]`).querySelector(Io),
        r = document.querySelector(Fo);
      let a = n ? `&page=${n.getAttribute(Go)}` : "";
      if (
        ((this.searchParams = Fe(this.searchForm, r, [], s)), "product" === s)
      ) {
        const t = this.searchParams.replace("&type=product", "");
        this.searchParams = `${t}&type=product`;
      } else this.searchParams = `q=${this.searchTerm}&type=${s}`;
      theme.settings.enableInfinityScroll ||
        "" === a ||
        (this.searchParams += a),
        (this.fetchURL = `${theme.routes.searchUrl}?${this.searchParams}&section_id=${this.sectionId}`),
        e &&
          history.pushState(
            { searchParams: this.searchParams },
            "",
            `${window.location.pathname}${
              this.searchParams && "?".concat(this.searchParams)
            }`
          );
    }
    tabChangeFetchContent(t, e) {
      const i = t.getAttribute(jo),
        s = t.getAttribute(Ro),
        o = this.container.querySelector(`[${Vo}="${s}"]`),
        n = this.currentType === i;
      if (this.cachedResults[s] || n)
        return (
          "product" !== i ||
            this.searchFilters ||
            (this.searchFilters = new bo(this.container)),
          void requestAnimationFrame(() => {
            this.handleActiveTabClasses(t, e),
              this.scrollToCurrentTabLink(t),
              this.triggerTabAnimations(e),
              this.checkVisibleTabsLinks(),
              this.updateAjaxify(e, i);
          })
        );
      fetch(this.fetchURL)
        .then((t) => {
          if (!t.ok) {
            throw new Error(t.status);
          }
          return t.text();
        })
        .then((n) => {
          const r = new DOMParser()
            .parseFromString(n, "text/html")
            .querySelector(`[${Vo}="${s}"]`).innerHTML;
          var a;
          this.searchForAllTypes &&
            (null === (a = this.container.querySelector(Po)) ||
              void 0 === a ||
              a.remove());
          (this.cachedResults[s] = r),
            (o.innerHTML = r),
            "product" !== i ||
              this.searchFilters ||
              (this.searchFilters = new bo(this.container)),
            requestAnimationFrame(() => {
              this.handleActiveTabClasses(t, e),
                this.scrollToCurrentTabLink(t),
                this.triggerTabAnimations(e),
                this.checkVisibleTabsLinks(),
                this.initInfinityScroll(i);
            });
        })
        .catch((t) => {
          throw t;
        });
    }
    onHistoryChange(t) {
      var e;
      const i =
          (null === (e = t.state) || void 0 === e ? void 0 : e.searchParams) ||
          window.location.search,
        s = i.indexOf("type=product") > -1,
        o = i.indexOf("type=article") > -1,
        n = i.indexOf("type=page") > -1,
        r = s || o || n,
        a = this.container.querySelector(`${Eo}[${jo}="product"]`),
        l = this.container.querySelector(`${Eo}[${jo}="article"]`),
        c = this.container.querySelector(`${Eo}[${jo}="page"]`);
      r
        ? (s &&
            (null == a ||
              a.dispatchEvent(
                new CustomEvent("theme:tab:open-from-history", {
                  bubbles: !0,
                  detail: { element: `[${jo}="product"]` },
                })
              )),
          o &&
            (null == l ||
              l.dispatchEvent(
                new CustomEvent("theme:tab:open-from-history", {
                  bubbles: !0,
                  detail: { element: `[${jo}="article"]` },
                })
              )),
          n &&
            (null == c ||
              c.dispatchEvent(
                new CustomEvent("theme:tab:open-from-history", {
                  bubbles: !0,
                  detail: { element: `[${jo}="page"]` },
                })
              )))
        : (window.location = i);
    }
    initCustomScrollbar() {
      this.scrollable &&
        !this.customScrollbar &&
        (this.customScrollbar = new Me(this.container));
    }
    infiniteScrollListener() {
      theme.settings.enableInfinityScroll &&
        ((this.ajaxifyFromFiltersEvent = (t) => this.ajaxifyFromFilters(t)),
        document.addEventListener(
          "theme:tab:ajaxinate",
          this.ajaxifyFromFiltersEvent
        ));
    }
    ajaxifyFromFilters(t) {
      this.initInfinityScroll(t.detail);
    }
    initInfinityScroll(t) {
      if (!theme.settings.enableInfinityScroll) return;
      if (0 === this.container.querySelectorAll(Do).length) return;
      const e = this.container.querySelector(`${So}.${Mo}`),
        i = null == e ? void 0 : e.querySelector(Do),
        s = null == i ? void 0 : i.classList.contains(zo);
      e
        ? (!i &&
            this.endlessCollection &&
            this.updateAjaxinateInstancesSettings(t),
          i && !s && this.initAjaxyfy(t))
        : this.initAjaxyfy(t);
    }
    updateAjaxinateInstancesSettings(t) {
      setTimeout(() => {
        if (0 === this.endlessCollection.endlessScroll.length) return;
        [...this.endlessCollection.endlessScroll].forEach((t) => {
          const e = t.containerElement,
            i = [...this.tab].find((t) => t.classList.contains(Mo));
          !(null !== e.closest(`${So}.${Mo}`)) &&
            i &&
            (t.settings.method = "click");
        });
        const e = () => this.initProductGridEvents();
        if ("product" === t || "all" === t) {
          const t = (t) =>
              t.settings.container.indexOf("resultsProducts") > -1 ||
              t.settings.container.indexOf("allTypes") > -1,
            i = [...this.endlessCollection.endlessScroll].find(t);
          if (!i) return;
          i.settings.callback = e;
        }
      });
    }
    initAjaxyfy(t) {
      if ("object" != typeof this.endlessCollection)
        return (
          (this.endlessCollection = new fs(this.container)),
          void this.updateAjaxinateInstancesSettings(t)
        );
      this.endlessCollection.endlessScroll.length > 0 &&
        (this.endlessCollection.unload(),
        (this.endlessCollection = new fs(this.container)),
        this.updateAjaxinateInstancesSettings(t));
    }
    updateAjaxify(t, e) {
      var i;
      if (
        0 ===
        (null === (i = this.endlessCollection) || void 0 === i
          ? void 0
          : i.endlessScroll.length)
      )
        return;
      const s = t.querySelector(Do),
        o = `${Do}[${Xo}="${null == s ? void 0 : s.dataset.ajaxinateId}"]`;
      s &&
        (this.endlessCollection.update(o),
        this.updateAjaxinateInstancesSettings(e));
    }
    initProductGridEvents() {
      (this.productGridEvents = new ds(this.container)), this.initTooltips();
    }
    initTooltips() {
      var t, e;
      ((this.tooltips = this.container.querySelectorAll(xo)),
      (this.productGrid = this.container.querySelector(Ho)),
      window.innerWidth < theme.sizes.small) &&
        (this.tooltips =
          null === (e = this.productGrid) || void 0 === e
            ? void 0
            : e.querySelectorAll(xo));
      null === (t = this.tooltips) ||
        void 0 === t ||
        t.forEach((t) => {
          new Qe(t);
        });
    }
    tabChange(t, e) {
      t.classList.contains(Mo) ||
        (this.isSearchPage
          ? this.tabChangeFetchContent(t, e)
          : (this.handleActiveTabClasses(t, e),
            this.scrollToCurrentTabLink(t),
            this.triggerTabAnimations(e),
            this.handleTabSliders(e),
            this.checkVisibleTabsLinks()));
    }
    handleActiveTabClasses(t, e) {
      var i;
      const s = this.container.querySelector(`${So}.${Mo}`),
        o = this.container.querySelector(`${Eo}.${Mo}`);
      null == s || s.classList.remove(Mo),
        null == o || o.classList.remove(Mo),
        t.classList.add(Mo),
        e.classList.add(Mo),
        t.classList.contains(Oo) && e.classList.add(Oo),
        null === (i = this.tabRef) ||
          void 0 === i ||
          i.forEach((t) => {
            const i = t.classList.contains(Mo),
              s = t.getAttribute(Wo) === e.getAttribute(Vo);
            t.classList.toggle(Mo, !i && s);
          });
    }
    scrollToCurrentTabLink(t) {
      const e = t.closest(Ao) ? t.closest(Ao) : t.parentElement,
        i = parseInt(
          window.getComputedStyle(e).getPropertyValue("padding-left")
        );
      e.scrollTo({
        top: 0,
        left: t.offsetLeft - e.offsetWidth / 2 + t.offsetWidth / 2 + i,
        behavior: "smooth",
      }),
        t.dispatchEvent(
          new CustomEvent("theme:custom-scrollbar:change", {
            bubbles: !0,
            detail: { element: t },
          })
        );
    }
    triggerTabAnimations(t) {
      "false" != theme.settings.animations &&
        (this.tabsContents.querySelectorAll(`.${$o}`).forEach((t) => {
          t.classList.remove(_o);
        }),
        this.animateElementsTimer && clearTimeout(this.animateElementsTimer),
        (this.animateElementsTimer = setTimeout(() => {
          t.querySelectorAll(`.${$o}`).forEach((t) => {
            t.classList.add(_o);
          });
        }, 150)));
    }
    handleTabSliders(t) {
      const e = t.querySelector(qo);
      e &&
        e.dispatchEvent(new CustomEvent("theme:tab:change", { bubbles: !1 }));
    }
    checkVisibleTabsLinks() {
      const t = this.container.querySelectorAll(Eo),
        e = this.container.querySelectorAll(`${Eo}.${Oo}`);
      t.length - e.length < 2
        ? this.container.classList.add(Bo)
        : this.container.classList.remove(Bo);
    }
    onBlockSelect(t) {
      const e = t.target;
      e &&
        (e.dispatchEvent(new Event("click")),
        e.parentNode.scrollTo({
          top: 0,
          left: e.offsetLeft - e.clientWidth,
          behavior: "smooth",
        }));
    }
    onUnload() {
      this.customScrollbar && this.customScrollbar.unload(),
        this.isSearchPage &&
          theme.settings.enableInfinityScroll &&
          document.removeEventListener(
            "theme:tab:ajaxinate",
            this.ajaxifyFromFiltersEvent
          );
    }
    constructor(t) {
      (this.container = t),
        (this.tabsContents = t.querySelector(Co)),
        (this.animateElementsTimer = null),
        (this.isSearchPage = null != t.closest(`[${Uo}="true"]`)),
        this.container &&
          ((this.scrollable = this.container.querySelector(ko)),
          (this.tabRef = this.container.querySelectorAll(Lo)),
          (this.tabsLink = this.container.querySelectorAll(Eo)),
          (this.tab = this.container.querySelectorAll(So)),
          this.assignSearchPageArguments(),
          this.init(),
          this.initCustomScrollbar());
    }
  };
  const Zo = {
      onLoad() {
        Jo[this.id] = new Yo(this.container);
      },
      onBlockSelect(t) {
        Jo[this.id].onBlockSelect(t);
      },
      onUnload() {
        Jo[this.id].onUnload();
      },
    },
    tn = "[data-drawer]",
    en = "[data-drawer-toggle]",
    sn = "[data-scroll]",
    on = "[data-quick-view-item]",
    nn = "is-open",
    rn = "js-drawer-open",
    an = "cv-h",
    ln = "site-header",
    cn = "aria-expanded",
    hn = "aria-controls";
  let dn = {},
    un = class {
      initListeners() {
        this.drawerToggleButtons.forEach((t) => {
          t.addEventListener("click", this.drawerToggleEvent);
        }),
          this.drawers.forEach((t) => {
            t.addEventListener("keyup", this.keyPressCloseEvent),
              (this.collapsible = new Mt(t)),
              (this.tabs = new Yo(t));
          }),
          document.addEventListener("click", this.drawerCloseEvent),
          document.addEventListener(
            "theme:drawer:closing",
            this.drawerCloseEvent
          );
      }
      toggle(t) {
        t.preventDefault();
        const e = document.querySelector(`#${t.target.getAttribute(hn)}`);
        if (!e) return;
        e.classList.contains(nn) ? this.close() : this.open(t);
      }
      open(t) {
        const e = t.target,
          i = document.querySelector(`#${t.target.getAttribute(hn)}`);
        if (!i) return;
        const s = i.querySelector(sn) || i;
        document.dispatchEvent(
          new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: s })
        ),
          document.dispatchEvent(new CustomEvent("theme:drawer:open"), {
            bubbles: !0,
          }),
          document.body.classList.add(rn),
          i.classList.add(nn),
          i.classList.remove(an),
          e.setAttribute(cn, !0),
          setTimeout(() => {
            (this.a11y.state.trigger = e),
              this.a11y.trapFocus({ container: i });
          });
      }
      close() {
        if (!document.body.classList.contains(rn)) return;
        const t = document.querySelector(`${tn}.${nn}`);
        this.drawerToggleButtons.forEach((t) => {
          t.setAttribute(cn, !1);
        }),
          this.a11y.removeTrapFocus({ container: t }),
          t.classList.remove(nn);
        const e = (i) => {
          i.target === t &&
            (requestAnimationFrame(() => {
              t.classList.add(an),
                document.dispatchEvent(new CustomEvent("theme:drawer:close"), {
                  bubbles: !0,
                }),
                document.dispatchEvent(
                  new CustomEvent("theme:scroll:unlock", { bubbles: !0 })
                );
            }),
            t.removeEventListener("transitionend", e));
        };
        t.addEventListener("transitionend", e),
          document.body.classList.remove(rn);
      }
      onUnload() {
        this.close(),
          this.drawerToggleButtons.forEach((t) => {
            t.removeEventListener("click", this.drawerToggleEvent);
          }),
          this.drawers.forEach((t) => {
            t.removeEventListener("keyup", this.keyPressCloseEvent);
          }),
          document.removeEventListener("click", this.drawerCloseEvent),
          document.removeEventListener(
            "theme:drawer:closing",
            this.drawerCloseEvent
          ),
          this.collapsible && this.collapsible.onUnload(),
          this.tabs && this.tabs.onUnload();
      }
      constructor(t) {
        (this.container = t),
          (this.drawers = this.container.querySelectorAll(tn)),
          (this.drawerToggleButtons = this.container.querySelectorAll(en)),
          (this.a11y = Ut),
          (this.drawerToggleEvent = Lt((t) => {
            this.toggle(t);
          }, 150)),
          (this.keyPressCloseEvent = Lt((t) => {
            t.code === theme.keyboardKeys.ESCAPE && this.close(t);
          }, 150)),
          (this.drawerCloseEvent = (t) => {
            const e = document.querySelector(`${tn}.${nn}`);
            let i = !1;
            if (!e) return;
            "click" === t.type && (i = t.target.matches(en));
            const s = !!e && e.contains(t.target),
              o = e.closest(on),
              n = !!o && o.contains(t.target);
            i || s || n || this.close();
          }),
          this.initListeners();
      }
    };
  const pn = {
      onLoad() {
        this.container.classList.contains(ln) &&
          (this.container = this.container.parentNode),
          (dn[this.id] = new un(this.container));
      },
      onUnload() {
        dn[this.id].onUnload();
      },
    },
    mn = (t, e = !1, i = "block") => {
      t && (e ? t.style.removeProperty("display") : (t.style.display = i));
    },
    gn = (t) => {
      t && (t.style.display = "none");
    },
    vn = (t) => {
      const { stickyHeaderHeight: e } = f();
      window.scrollTo({
        top: t + Math.round(window.scrollY) - e,
        left: 0,
        behavior: "smooth",
      });
    },
    yn = "[data-store-availability-list]",
    fn = {
      close: ".js-modal-close",
      open: ".js-modal-open-store-availability-modal",
      openClass: "modal--is-active",
      openBodyClass: "modal--is-visible",
      closeModalOnClick: !1,
      scrollIntoView: !1,
    };
  const bn = "body",
    wn = "[data-store-availability-modal]",
    En = "[data-store-availability-modal-open]",
    Sn = "[data-store-availability-modal-close]",
    Ln = "[data-store-availability-modal-product__title]",
    kn = "store-availabilities-modal--active";
  const An = "[data-product-form]",
    qn = "[data-option-position]",
    Cn = '[name^="options"], [data-popout-option]',
    Tn = "sold-out",
    Pn = "unavailable",
    Fn = "data-option-position",
    In = "data-value";
  const xn = 1,
    Hn = "data-notification-popup",
    Dn = {
      history: !1,
      focus: !1,
      mainClass: "pswp--notification pswp--not-close-btn",
      closeOnVerticalDrag: !1,
    };
  let Mn = class {
    init() {
      const t = [{ html: this.notificationPopupHtml }];
      (this.a11y.state.trigger = this.button), new ul(t, Dn, xn);
    }
    constructor(t) {
      (this.button = t),
        (this.a11y = Ut),
        (this.notificationPopupHtml = this.button.getAttribute(Hn)),
        "" !== this.notificationPopupHtml.trim() && this.init();
    }
  };
  const On = "[data-product]",
    Bn = "[data-product-form]",
    _n = "[data-add-to-cart]",
    $n = "[data-add-to-cart-text]",
    zn = "[data-buy-it-now]",
    Rn = "[data-compare-price]",
    Vn = "[data-form-wrapper]",
    Wn = "[data-site-header]",
    Nn = "[data-product-select]",
    Un = "_preorder",
    jn = "[data-price-wrapper]",
    Kn = "[data-price-off]",
    Qn = "[data-price-off-type]",
    Gn = "[data-price-off-amount]",
    Xn = "[data-product-slide]",
    Jn = "[data-product-image]",
    Yn = "[data-product-single-media-slider]",
    Zn = "[data-product-json]",
    tr = "[data-product-price]",
    er = "[data-product-unit-price]",
    ir = "[data-product-base]",
    sr = "[data-product-unit]",
    or = "[data-subscription-watch-price]",
    nr = "[data-subscription-selectors]",
    rr = "[data-toggles-group]",
    ar = "data-group-toggle",
    lr = "[data-plan-description]",
    cr = "[data-remaining-count]",
    hr = "[data-remaining-wrapper]",
    dr = "[data-product-remaining-json]",
    ur = "[data-store-availability-container]",
    pr = "[data-upsell-btn]",
    mr = ".shopify-section",
    gr = "[data-quick-view-item]",
    vr = "[data-notification-button-text]",
    yr = "[data-swatches-container]",
    fr = "[data-swatches-more]",
    br = "[data-option-position]",
    wr = "hidden",
    Er = "variant--soldout",
    Sr = "variant--unavailabe",
    Lr = "product__price--sale",
    kr = "product__price--hidden",
    Ar = "count-is-low",
    qr = "count-is-in",
    Cr = "count-is-out",
    Tr = "count-is-unavailable",
    Pr = "selector-wrapper--visible",
    Fr = "data-image-id",
    Ir = "data-tall-layout",
    xr = "data-enable-history-state",
    Hr = "data-notification-popup",
    Dr = "data-swatch-variant";
  let Mr = class {
    init() {
      let t = null;
      const e = this.container.querySelector(Zn);
      e && (t = e.innerHTML),
        t
          ? ((this.productJSON = JSON.parse(t)),
            this.linkForm(),
            (this.sellout = new (class {
              init() {
                this.update();
              }
              update() {
                this.getCurrentState(),
                  this.optionElements.forEach((t) => {
                    const e = t.value || t.getAttribute(In),
                      i = t.closest(qn);
                    if (!i) return;
                    const s = i.getAttribute(Fn),
                      o = parseInt(s, 10) - 1;
                    let n = [...this.selections];
                    n[o] = e;
                    const r = this.productJSON.variants.find((t) => {
                      let e = !0;
                      for (let i = 0; i < n.length; i++)
                        t.options[i] !== n[i] && (e = !1);
                      return e;
                    });
                    t.parentElement.classList.remove(Tn, Pn),
                      void 0 === r
                        ? t.parentElement.classList.add(Pn)
                        : !1 === (null == r ? void 0 : r.available) &&
                          t.parentElement.classList.add(Tn);
                  });
              }
              getCurrentState() {
                for (var t of ((this.formData = new FormData(this.form)),
                (this.selections = []),
                this.formData.entries()))
                  t[0].includes("options[") && this.selections.push(t[1]);
              }
              constructor(t, e) {
                (this.container = t),
                  (this.productJSON = e),
                  (this.form = this.container.querySelector(An)),
                  (this.formData = new FormData(this.form)),
                  (this.optionElements = this.container.querySelectorAll(Cn)),
                  this.productJSON && this.form && this.init();
              }
            })(this.container, this.productJSON)))
          : console.error("Missing product JSON");
    }
    destroy() {
      this.productForm.destroy();
    }
    linkForm() {
      this.productForm = new (class {
        destroy() {
          this._listeners.removeAll();
        }
        options() {
          return this._serializeInputValues(this.optionInputs, function (t) {
            return (t.name = /(?:^(options\[))(.*?)(?:\])/.exec(t.name)[2]), t;
          });
        }
        variant() {
          const t = this.options();
          return t.length ? di(this.product, t) : this.product.variants[0];
        }
        plan(t) {
          let e = { allocation: null, group: null, detail: null };
          const i = new FormData(this.form).get("selling_plan");
          return (
            i &&
              t &&
              (e.allocation = t.selling_plan_allocations.find(function (t) {
                return t.selling_plan_id.toString() === i.toString();
              })),
            e.allocation &&
              (e.group = this.product.selling_plan_groups.find(function (t) {
                return (
                  t.id.toString() ===
                  e.allocation.selling_plan_group_id.toString()
                );
              })),
            e.group &&
              (e.detail = e.group.selling_plans.find(function (t) {
                return t.id.toString() === i.toString();
              })),
            e && e.allocation && e.detail && e.allocation ? e : null
          );
        }
        properties() {
          return this._serializeInputValues(this.propertyInputs, function (t) {
            return (
              (t.name = /(?:^(properties\[))(.*?)(?:\])/.exec(t.name)[2]), t
            );
          });
        }
        quantity() {
          return this.quantityInputs[0]
            ? Number.parseInt(this.quantityInputs[0].value, 10)
            : 1;
        }
        getFormState() {
          const t = this.variant();
          return {
            options: this.options(),
            variant: t,
            properties: this.properties(),
            quantity: this.quantity(),
            plan: this.plan(t),
          };
        }
        _setIdInputValue(t) {
          t && t.id
            ? (this.variantElement.value = t.id.toString())
            : (this.variantElement.value = ""),
            this.variantElement.dispatchEvent(new Event("change"));
        }
        _onSubmit(t, e) {
          (e.dataset = this.getFormState()),
            t.onFormSubmit && t.onFormSubmit(e);
        }
        _onOptionChange(t) {
          this._setIdInputValue(t.dataset.variant);
        }
        _onFormEvent(t) {
          return void 0 === t
            ? Function.prototype.bind()
            : function (e) {
                (e.dataset = this.getFormState()),
                  this._setIdInputValue(e.dataset.variant),
                  t(e);
              }.bind(this);
        }
        _initInputs(t, e) {
          return Array.prototype.slice
            .call(this.element.querySelectorAll(t))
            .map(
              function (t) {
                return (
                  this._listeners.add(t, "change", this._onFormEvent(e)), t
                );
              }.bind(this)
            );
        }
        _serializeInputValues(t, e) {
          return t.reduce(function (t, i) {
            return (
              (i.checked || ("radio" !== i.type && "checkbox" !== i.type)) &&
                t.push(e({ name: i.name, value: i.value })),
              t
            );
          }, []);
        }
        _validateProductObject(t) {
          if ("object" != typeof t)
            throw new TypeError(t + " is not an object.");
          if (void 0 === t.variants[0].options)
            throw new TypeError(
              "Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route"
            );
          return t;
        }
        constructor(t, e, i) {
          (this.element = t),
            (this.form =
              "FORM" == this.element.tagName
                ? this.element
                : this.element.querySelector("form")),
            (this.product = this._validateProductObject(e)),
            (this.variantElement = this.element.querySelector(pi)),
            (i = i || {}),
            (this._listeners = new hi()),
            this._listeners.add(
              this.element,
              "submit",
              this._onSubmit.bind(this, i)
            ),
            (this.optionInputs = this._initInputs(gi, i.onOptionChange)),
            (this.planInputs = this._initInputs(mi, i.onPlanChange)),
            (this.quantityInputs = this._initInputs(vi, i.onQuantityChange)),
            (this.propertyInputs = this._initInputs(yi, i.onPropertyChange));
        }
      })(this.productForm, this.productJSON, {
        onOptionChange: this.onOptionChange.bind(this),
        onPlanChange: this.onPlanChange.bind(this),
      });
      const t = this.productForm.getFormState();
      if (
        (this.pushState(t, !0),
        this.subsToggleListeners(),
        this.swatchesContainer)
      ) {
        this.observeSwatch(t);
        const e = this.swatchesContainer.closest(br),
          i = e.querySelector(fr);
        null == i ||
          i.addEventListener("click", (t) => {
            t.preventDefault(),
              e.classList.contains(Pr)
                ? e.classList.remove(Pr)
                : e.classList.add(Pr);
          });
      }
    }
    onOptionChange(t) {
      this.pushState(t.dataset), this.updateProductImage(t);
    }
    onPlanChange(t) {
      this.subPrices && this.pushState(t.dataset);
    }
    pushState(t, e = !1) {
      var i;
      (this.productState = this.setProductState(t)),
        this.updateAddToCartState(t),
        this.updateProductPrices(t),
        this.updateSaleText(t),
        this.updateSubscriptionText(t),
        this.fireHookEvent(t),
        this.updateRemaining(t),
        null === (i = this.sellout) || void 0 === i || i.update(t),
        this.enableHistoryState && !e && this.updateHistoryState(t),
        this.storeAvailability &&
          (t.variant
            ? this.storeAvailability.updateContent(
                t.variant.id,
                this.productForm.product.title
              )
            : this.storeAvailability.clearContent());
    }
    updateAddToCartState(t) {
      const e = t.variant,
        i = this.container.querySelectorAll(jn),
        s = this.container.querySelectorAll(_n),
        o = this.container.querySelectorAll($n),
        n = this.container.querySelectorAll(Vn),
        r = this.container.querySelector(zn);
      let a = theme.strings.add_to_cart;
      this.productJSON.tags.includes(Un) && (a = theme.strings.preorder),
        null == i ||
          i.forEach((t) => {
            t.classList.toggle(kr, !e);
          }),
        null == s ||
          s.forEach((t) => {
            var i;
            if (t.matches(pr)) return;
            if (((t.disabled = !0), null == r || r.classList.add(wr), !e))
              return;
            if (
              ((t.disabled = !1),
              e.available && (null == r || r.classList.remove(wr)),
              !t.hasAttribute(Hr))
            )
              return;
            const s = t.id.replace("AddToCart", "NotificationForm"),
              o = this.sessionStorage.getItem("notification_form_id");
            let n = !1,
              a = e.id,
              l = e.title;
            if (o) {
              const t = o.substring(0, o.lastIndexOf("--")),
                e = o.split("--").slice(-1)[0];
              (n = s === t),
                n &&
                  ((this.latestVariantId = a),
                  (this.latestVariantTitle = l),
                  (a = Number(e)),
                  this.productJSON.variants.forEach((t) => {
                    t.id === a && (l = t.title);
                  }));
            }
            let c = t.getAttribute(Hr);
            const h =
              null ===
                (i = new DOMParser()
                  .parseFromString(c, "text/html")
                  .querySelector(vr)) || void 0 === i
                ? void 0
                : i.innerHTML;
            if ("" != this.latestVariantId && "" != this.latestVariantTitle) {
              var d;
              (c = c.replaceAll(this.latestVariantId, a)),
                (c = c.replaceAll(this.latestVariantTitle, l));
              const t =
                null ===
                  (d = new DOMParser()
                    .parseFromString(c, "text/html")
                    .querySelector(vr)) || void 0 === d
                  ? void 0
                  : d.innerHTML;
              c = c.replace(t, h);
            }
            t.setAttribute(Hr, c),
              n && (this.scrollToForm(this.product.closest(mr)), new Mn(t)),
              (this.latestVariantId = a),
              (this.latestVariantTitle = l);
          }),
        null == o ||
          o.forEach((t) => {
            if (e) {
              if (e.available) t.innerHTML = a;
              else if (
                ((t.innerHTML = theme.strings.sold_out),
                t.parentNode.hasAttribute(Hr))
              ) {
                if (t.closest(gr)) return;
                t.innerHTML = `${theme.strings.sold_out} - ${theme.strings.newsletter_product_availability}`;
              }
            } else t.innerHTML = theme.strings.unavailable;
          }),
        null == n ||
          n.forEach((t) => {
            if (!e) return t.classList.add(Sr), void t.classList.remove(Er);
            const i = t.querySelector(Nn);
            if ((i && (i.value = e.id), !e.available))
              return t.classList.add(Er), void t.classList.remove(Sr);
            t.classList.remove(Er, Sr);
          });
    }
    updateHistoryState(t) {
      const e = t.variant,
        i = t.plan,
        s = window.location.href;
      if (e && s.includes("/product")) {
        const t = new window.URL(s),
          o = t.searchParams;
        o.set("variant", e.id),
          i && i.detail && i.detail.id && this.productState.hasPlan
            ? o.set("selling_plan", i.detail.id)
            : o.delete("selling_plan"),
          (t.search = o.toString());
        const n = t.toString();
        window.history.replaceState({ path: n }, "", n);
      }
    }
    updateRemaining(t) {
      const e = t.variant,
        i = [qr, Cr, Tr, Ar];
      if (e && this.remainingWrapper && this.remainingJSON) {
        const t = this.remainingJSON[e.id];
        ("out" === t || t < 1) &&
          (this.remainingWrapper.classList.remove(...i),
          this.remainingWrapper.classList.add(Cr)),
          ("in" === t || t >= this.remainingMaxInt) &&
            (this.remainingWrapper.classList.remove(...i),
            this.remainingWrapper.classList.add(qr)),
          ("low" === t || (t > 0 && t < this.remainingMaxInt)) &&
            (this.remainingWrapper.classList.remove(...i),
            this.remainingWrapper.classList.add(Ar),
            this.remainingCount && (this.remainingCount.innerHTML = t));
      } else
        !e &&
          this.remainingWrapper &&
          (this.remainingWrapper.classList.remove(...i),
          this.remainingWrapper.classList.add(Tr));
    }
    getBaseUnit(t) {
      return 1 === t.unit_price_measurement.reference_value
        ? t.unit_price_measurement.reference_unit
        : t.unit_price_measurement.reference_value +
            t.unit_price_measurement.reference_unit;
    }
    subsToggleListeners() {
      this.container.querySelectorAll(rr).forEach((t) => {
        t.addEventListener(
          "change",
          function (t) {
            const e = t.target.value.toString(),
              i = this.container.querySelector(`[${ar}="${e}"]`),
              s = this.container.querySelectorAll(`[${ar}]`);
            if (i) {
              i.classList.remove(wr);
              const t = i.querySelector('[name="selling_plan"]');
              (t.checked = !0), t.dispatchEvent(new Event("change"));
            }
            s.forEach((t) => {
              if (t !== i) {
                t.classList.add(wr);
                t.querySelectorAll('[name="selling_plan"]').forEach((t) => {
                  (t.checked = !1), t.dispatchEvent(new Event("change"));
                });
              }
            });
          }.bind(this)
        );
      });
    }
    updateSaleText(t) {
      this.productState.planSale
        ? this.updateSaleTextSubscription(t)
        : this.productState.onSale
        ? this.updateSaleTextStandard(t)
        : this.priceOffWrap && this.priceOffWrap.classList.add(wr);
    }
    updateSaleTextStandard(t) {
      if (!this.priceOffType) return;
      this.priceOffType.innerHTML =
        window.theme.strings.sale_badge_text || "sale";
      const e = t.variant;
      if (
        window.theme.settings.savingBadgeType &&
        "percentage" === window.theme.settings.savingBadgeType
      ) {
        const t = (e.compare_at_price - e.price) / e.compare_at_price,
          i = Math.floor(100 * t);
        this.priceOffAmount.innerHTML = `${i}%`;
      } else {
        const t = e.compare_at_price - e.price;
        this.priceOffAmount.innerHTML = s.formatMoney(t, theme.moneyFormat);
      }
      this.priceOffWrap.classList.remove(wr);
    }
    updateSaleTextSubscription(t) {
      const e = t.variant,
        i = this.productForm.product.selling_plan_groups.find(
          (t) => t.id === e.selling_plan_allocations[0].selling_plan_group_id
        ),
        o = t.plan
          ? t.plan.detail.price_adjustments[0]
          : i.selling_plans[0].price_adjustments[0],
        n = o.value || 0,
        r =
          "percentage" === o.value_type
            ? `${n}%`
            : s.formatMoney(e.price - n, theme.moneyFormat);
      (this.priceOffType.innerHTML =
        window.theme.strings.subscription || "subscripton"),
        (this.priceOffAmount.innerHTML = r),
        this.priceOffWrap.classList.remove(wr);
    }
    updateSubscriptionText(t) {
      t.plan && this.planDecription && null !== t.plan.detail.description
        ? ((this.planDecription.innerHTML = t.plan.detail.description),
          this.planDecription.classList.remove(wr))
        : this.planDecription && this.planDecription.classList.add(wr);
    }
    updateProductPrices(t) {
      const e = t.variant,
        i = t.plan;
      this.container.querySelectorAll(jn).forEach((t) => {
        const o = t.querySelector(Rn),
          n = t.querySelector(tr);
        let r = "",
          a = "";
        if (
          (this.productState.available &&
            ((r = e.compare_at_price), (a = e.price)),
          this.productState.hasPlan)
        ) {
          a = i
            ? i.allocation.price
            : e.selling_plan_allocations[0].per_delivery_price;
        }
        if (this.productState.planSale) {
          const t = i
            ? i.allocation.price
            : e.selling_plan_allocations[0].per_delivery_price;
          (r = i
            ? i.allocation.compare_at_price
            : e.selling_plan_allocations[0].compare_at_price),
            (a = t);
        }
        o &&
          (this.productState.onSale || this.productState.planSale
            ? (o.classList.remove(wr), n.classList.add(Lr))
            : (o.classList.add(wr), n.classList.remove(Lr)),
          (o.innerHTML = theme.settings.currency_code_enable
            ? s.formatMoney(r, theme.moneyWithCurrencyFormat)
            : s.formatMoney(r, theme.moneyFormat))),
          (n.innerHTML =
            0 === a
              ? window.theme.strings.free
              : theme.settings.currency_code_enable
              ? s.formatMoney(a, theme.moneyWithCurrencyFormat)
              : s.formatMoney(a, theme.moneyFormat));
      }),
        this.hasUnitPricing && this.updateProductUnits(t);
    }
    updateProductUnits(t) {
      const e = t.variant,
        i = t.plan;
      let o = null;
      if (
        (e && e.unit_price && (o = e.unit_price),
        i &&
          (null == i ? void 0 : i.allocation) &&
          (null == i ? void 0 : i.allocation.unit_price) &&
          (o = i.allocation.unit_price),
        !i &&
          e.selling_plan_allocations &&
          e.selling_plan_allocations.length > 0)
      ) {
        o = e.selling_plan_allocations[0].unit_price;
      }
      if (o) {
        const t = this.getBaseUnit(e),
          i =
            0 === o
              ? window.theme.strings.free
              : s.formatMoney(o, theme.moneyFormat);
        (this.container.querySelector(er).innerHTML = i),
          (this.container.querySelector(ir).innerHTML = t),
          mn(this.container.querySelector(sr));
      } else gn(this.container.querySelector(sr));
    }
    fireHookEvent(t) {
      const e = t.variant;
      this.container.dispatchEvent(
        new CustomEvent("theme:variant:change", {
          detail: { variant: e },
          bubbles: !0,
        })
      );
    }
    setProductState(t) {
      const e = t.variant,
        i = t.plan,
        s = {
          available: !0,
          soldOut: !1,
          onSale: !1,
          showUnitPrice: !1,
          requiresPlan: !1,
          hasPlan: !1,
          planPerDelivery: !1,
          planSale: !1,
        };
      if (e) {
        const t = e.requires_selling_plan || !1;
        e.available || (s.soldOut = !0),
          e.compare_at_price > e.price && (s.onSale = !0),
          e.unit_price && (s.showUnitPrice = !0),
          this.product &&
            this.product.requires_selling_plan &&
            (s.requiresPlan = !0),
          i &&
            this.subPrices &&
            ((s.hasPlan = !0),
            i.allocation.per_delivery_price !== i.allocation.price &&
              (s.planPerDelivery = !0),
            e.price > i.allocation.price && (s.planSale = !0)),
          !i &&
            t &&
            ((s.hasPlan = !0),
            e.selling_plan_allocations[0].per_delivery_price !==
              e.selling_plan_allocations[0].price && (s.planPerDelivery = !0),
            e.price > e.selling_plan_allocations[0].price && (s.planSale = !0));
      } else s.available = !1;
      return s;
    }
    updateProductImage(t) {
      const e = t.dataset.variant;
      if (!e || !(null == e ? void 0 : e.featured_media)) return;
      const s = this.container.querySelector(
          `${Jn}[${Fr}="${e.featured_media.id}"]`
        ),
        o = null == s ? void 0 : s.closest(Xn);
      if (o) {
        const t = parseInt([...o.parentElement.children].indexOf(o)),
          n = this.container.querySelector(Yn),
          r = i.data(n);
        if (r && r.isActive) {
          const t = n.querySelector(`[data-id="${e.featured_media.id}"]`);
          if (t) {
            const e = parseInt([...t.parentNode.children].indexOf(t));
            r.select(e);
          }
          return;
        }
        if (this.tallLayout) {
          const e = s.getBoundingClientRect().top;
          if (0 === t && e + window.scrollY > window.pageYOffset) return;
          document.dispatchEvent(
            new CustomEvent("theme:tooltip:close", {
              bubbles: !1,
              detail: { hideTransition: !1 },
            })
          ),
            vn(e);
        }
      }
    }
    observeSwatch(t) {
      const e = this.swatchesContainer.querySelector(
        `[${Dr}*="${t.variant.id}"]`
      );
      this.swatchesContainer.closest(br).classList.remove(Pr),
        new IntersectionObserver(
          (t, e) => {
            t.forEach((t) => {
              0 == t.intersectionRatio &&
                this.swatchesContainer.closest(br).classList.add(Pr);
            });
          },
          { root: this.container, threshold: [0.95, 1] }
        ).observe(e);
    }
    scrollToForm(t) {
      var e;
      const i =
        null === (e = document.querySelector(Wn)) || void 0 === e
          ? void 0
          : e.dataset.height;
      visibilityHelper.isElementPartiallyVisible(t) ||
        visibilityHelper.isElementTotallyVisible(t) ||
        setTimeout(() => {
          const e = t.getBoundingClientRect().top - i;
          window.scrollTo({ top: e, left: 0, behavior: "smooth" });
        }, 400);
    }
    constructor(t) {
      if (
        ((this.container = t),
        (this.product = this.container.querySelector(On)),
        (this.productForm = this.container.querySelector(Bn)),
        (this.tallLayout = "true" === this.container.getAttribute(Ir)),
        !this.product || !this.productForm)
      ) {
        return void new Nt(this.container).init();
      }
      (this.storeAvailabilityContainer = this.container.querySelector(ur)),
        (this.enableHistoryState = "true" === this.container.getAttribute(xr)),
        (this.hasUnitPricing = this.container.querySelector(sr)),
        (this.subSelectors = this.container.querySelector(nr)),
        (this.subPrices = this.container.querySelector(or)),
        (this.priceOffWrap = this.container.querySelector(Kn)),
        (this.priceOffAmount = this.container.querySelector(Gn)),
        (this.priceOffType = this.container.querySelector(Qn)),
        (this.planDecription = this.container.querySelector(lr)),
        (this.swatchesContainer = this.container.querySelector(yr)),
        (this.latestVariantId = ""),
        (this.latestVariantTitle = ""),
        (this.sellout = null),
        (this.sessionStorage = window.sessionStorage),
        (this.remainingWrapper = this.container.querySelector(hr)),
        this.remainingWrapper &&
          ((this.remainingMaxInt = parseInt(
            this.remainingWrapper.dataset.remainingMax,
            10
          )),
          (this.remainingCount = this.container.querySelector(cr)),
          (this.remainingJSONWrapper = this.container.querySelector(dr)),
          (this.remainingJSON = null),
          this.remainingJSONWrapper &&
            "" !== this.remainingJSONWrapper.innerHTML &&
            (this.remainingJSON = JSON.parse(
              this.remainingJSONWrapper.innerHTML
            ))),
        this.storeAvailabilityContainer &&
          (this.storeAvailability = new (class {
            updateContent(t, e) {
              this._fetchStoreAvailabilities(t, e);
            }
            clearContent() {
              this.container.innerHTML = "";
            }
            _initModal() {
              return new (class {
                init() {
                  this.openElement.addEventListener(
                    "click",
                    this.open.bind(this)
                  ),
                    this.modal
                      .querySelector(this.config.close)
                      .addEventListener("click", this.closeModal.bind(this));
                }
                open(t) {
                  let e = !1;
                  if (
                    (t ? t.preventDefault() : (e = !0), this.modalIsOpen && !e)
                  )
                    return void this.closeModal();
                  this.modal.classList.add(this.config.openClass),
                    this.nodes.parents.forEach((t) => {
                      t.classList.add(this.config.openBodyClass);
                    }),
                    (this.modalIsOpen = !0);
                  const i = document.querySelector(yn);
                  document.dispatchEvent(
                    new CustomEvent("theme:scroll:lock", {
                      bubbles: !0,
                      detail: i,
                    })
                  ),
                    this.config.scrollIntoView && this.scrollIntoView(),
                    this.bindEvents(),
                    this.a11y.trapFocus({ container: this.modal });
                }
                closeModal() {
                  if (this.modalIsOpen) {
                    document.activeElement.blur(),
                      this.modal.classList.remove(this.config.openClass);
                    var t = this;
                    this.nodes.parents.forEach(function (e) {
                      e.classList.remove(t.config.openBodyClass);
                    }),
                      (this.modalIsOpen = !1),
                      this.openElement.focus(),
                      this.unbindEvents(),
                      this.a11y.removeTrapFocus({ container: this.modal }),
                      document.dispatchEvent(
                        new CustomEvent("theme:scroll:unlock", {
                          bubbles: !0,
                          detail: 400,
                        })
                      );
                  }
                }
                bindEvents() {
                  (this.keyupHandler = this.keyupHandler.bind(this)),
                    (this.clickHandler = this.clickHandler.bind(this)),
                    document.body.addEventListener("keyup", this.keyupHandler),
                    document.body.addEventListener("click", this.clickHandler);
                }
                unbindEvents() {
                  document.body.removeEventListener("keyup", this.keyupHandler),
                    document.body.removeEventListener(
                      "click",
                      this.clickHandler
                    );
                }
                keyupHandler(t) {
                  t.code === theme.keyboardKeys.ESCAPE && this.closeModal();
                }
                clickHandler(t) {
                  !this.config.closeModalOnClick ||
                    this.modal.contains(t.target) ||
                    t.target.matches(this.config.open) ||
                    this.closeModal();
                }
                scrollIntoView() {
                  this.focusOnOpen.scrollIntoView({ behavior: "smooth" });
                }
                constructor(t, e) {
                  if (((this.modal = document.getElementById(t)), !this.modal))
                    return !1;
                  (this.nodes = {
                    parents: [document.querySelector("html"), document.body],
                  }),
                    (this.config = Object.assign(fn, e)),
                    (this.modalIsOpen = !1),
                    (this.focusOnOpen = this.config.focusOnOpen
                      ? document.getElementById(this.config.focusOnOpen)
                      : this.modal),
                    (this.openElement = document.querySelector(
                      this.config.open
                    )),
                    (this.a11y = Ut),
                    this.init();
                }
              })("StoreAvailabilityModal", {
                close: Sn,
                open: En,
                closeModalOnClick: !0,
                openClass: kn,
                scrollIntoView: !1,
              });
            }
            _fetchStoreAvailabilities(t, e) {
              const i = "/variants/" + t + "/?section_id=store-availability";
              this.clearContent();
              const s = this;
              fetch(i)
                .then(function (t) {
                  return t.text();
                })
                .then(function (t) {
                  const i = document.querySelector(bn);
                  let o = i.querySelector(wn);
                  o && o.remove(),
                    (s.container.innerHTML = t),
                    (s.container.innerHTML =
                      s.container.firstElementChild.innerHTML),
                    "" !== s.container.firstElementChild.innerHTML.trim()
                      ? s.container.querySelector(En) &&
                        ((s.modal = s._initModal()),
                        s._updateProductTitle(e),
                        (o = s.container.querySelector(wn)),
                        o && i.appendChild(o))
                      : s.clearContent();
                });
            }
            _updateProductTitle(t) {
              this.container.querySelector(Ln).textContent = t;
            }
            constructor(t) {
              this.container = t;
            }
          })(this.storeAvailabilityContainer));
      new Nt(this.container).init(), this.init();
    }
  };
  const Or = {
      onLoad() {
        this.section = new Mr(this.container);
      },
    },
    Br = "form",
    _r = "[data-popout]",
    $r = "[data-popout-list]",
    zr = "[data-popout-toggle]",
    Rr = "[data-popout-input]",
    Vr = "[data-popout-option]",
    Wr = "[data-popout-text]",
    Nr = "[aria-current]",
    Ur = "[data-product-image]",
    jr = "[data-product-grid-item]",
    Kr = "select-popout__list--visible",
    Qr = "select-popout--alt",
    Gr = "--current",
    Xr = "is-visible",
    Jr = "aria-current",
    Yr = "aria-expanded",
    Zr = "data-value",
    ta = "data-popout-prevent",
    ea = "data-quantity-field",
    ia = "data-quick-view-item";
  let sa = {},
    oa = class {
      unload() {
        this.popoutOptions.length &&
          this.popoutOptions.forEach((t) => {
            t.removeEventListener(
              "theme:popout:click",
              this.popupOptionsClickEvent
            ),
              t.removeEventListener("click", this._connectOptionsDispatchEvent);
          }),
          this.popoutToggle.removeEventListener(
            "click",
            this.popupToggleClickEvent
          ),
          this.popoutToggle.removeEventListener(
            "focusout",
            this.popupToggleFocusoutEvent
          ),
          this.popoutList.removeEventListener(
            "focusout",
            this.popupListFocusoutEvent
          ),
          this.popout.removeEventListener("keyup", this.popoutKeyupEvent),
          document.removeEventListener("theme:cart:update", this.updatePopout),
          document.body.removeEventListener("click", this.bodyClick);
      }
      popupToggleClick(t) {
        const e = "true" === t.currentTarget.getAttribute(Yr);
        if (this.popoutList.closest(jr)) {
          const t = this.popoutList.closest(jr).querySelector(Ur);
          t && t.classList.toggle(Xr, !e);
        }
        t.currentTarget.setAttribute(Yr, !e),
          this.popoutList.classList.toggle(Kr);
      }
      popupToggleFocusout(t) {
        if (!t.relatedTarget) return;
        const e = this.popout.contains(t.relatedTarget),
          i = t.relatedTarget.hasAttribute(ia);
        e || i || this._hideList();
      }
      popupListFocusout(t) {
        const e = t.currentTarget.contains(t.relatedTarget);
        this.popoutList.classList.contains(Kr) && !e && this._hideList();
      }
      popupOptionsClick(t) {
        if ("#" === t.target.closest(Vr).attributes.href.value) {
          t.preventDefault();
          let e = "";
          if (
            (t.currentTarget.getAttribute(Zr) &&
              (e = t.currentTarget.getAttribute(Zr)),
            (this.popoutInput.value = e),
            this.popoutPrevent)
          ) {
            this.popoutInput.dispatchEvent(new Event("change")),
              !t.detail.preventTrigger &&
                this.popoutInput.hasAttribute(ea) &&
                this.popoutInput.dispatchEvent(new Event("input"));
            const i = this.popoutList.querySelector(`[class*="${Gr}"]`);
            let s = Gr;
            if (i && i.classList.length)
              for (const t of i.classList)
                if (t.includes(Gr)) {
                  s = t;
                  break;
                }
            const o = this.popoutList.querySelector(`.${s}`);
            o &&
              (o.classList.remove(`${s}`),
              t.currentTarget.parentElement.classList.add(`${s}`));
            const n = this.popoutList.querySelector(Nr);
            n &&
              (n.removeAttribute(Jr), t.currentTarget.setAttribute(Jr, "true")),
              "" !== e && (this.popoutText.textContent = e),
              this.popupToggleFocusout(t),
              this.popupListFocusout(t);
          } else this._submitForm(e);
        }
      }
      updatePopout() {
        const t = this.popoutList.querySelector(
          `[${Zr}="${this.popoutInput.value}"]`
        );
        t
          ? (t.dispatchEvent(
              new CustomEvent("theme:popout:click", {
                cancelable: !0,
                bubbles: !0,
                detail: { preventTrigger: !0 },
              })
            ),
            t.parentElement.nextSibling || this.popout.classList.add(Qr))
          : this.popout.classList.add(Qr);
      }
      popoutKeyup(t) {
        t.code === theme.keyboardKeys.ESCAPE &&
          (this._hideList(), this.popoutToggle.focus());
      }
      bodyClick(t) {
        const e = this.popout.contains(t.target);
        this.popoutList.classList.contains(Kr) && !e && this._hideList();
      }
      _connectToggle() {
        this.popoutToggle.addEventListener("click", this.popupToggleClickEvent);
      }
      _connectOptions() {
        this.popoutOptions.length &&
          this.popoutOptions.forEach((t) => {
            t.addEventListener(
              "theme:popout:click",
              this.popupOptionsClickEvent
            ),
              t.addEventListener("click", this._connectOptionsDispatchEvent);
          });
      }
      _connectOptionsDispatch(t) {
        const e = new CustomEvent("theme:popout:click", {
          cancelable: !0,
          bubbles: !0,
          detail: { preventTrigger: !1 },
        });
        t.target.dispatchEvent(e) || t.preventDefault();
      }
      _onFocusOut() {
        this.popoutToggle.addEventListener(
          "focusout",
          this.popupToggleFocusoutEvent
        ),
          this.popoutList.addEventListener(
            "focusout",
            this.popupListFocusoutEvent
          ),
          this.popout.addEventListener("keyup", this.popoutKeyupEvent),
          document.body.addEventListener("click", this.bodyClick);
      }
      _submitForm() {
        const t = this.popout.closest(Br);
        t && t.submit();
      }
      _hideList() {
        this.popoutList.classList.remove(Kr),
          this.popoutToggle.setAttribute(Yr, !1);
      }
      constructor(t) {
        (this.popout = t),
          (this.popoutList = this.popout.querySelector($r)),
          (this.popoutToggle = this.popout.querySelector(zr)),
          (this.popoutText = this.popout.querySelector(Wr)),
          (this.popoutInput = this.popout.querySelector(Rr)),
          (this.popoutOptions = this.popout.querySelectorAll(Vr)),
          (this.popoutPrevent = "true" === this.popout.getAttribute(ta)),
          (this.popupToggleFocusoutEvent = (t) => this.popupToggleFocusout(t)),
          (this.popupListFocusoutEvent = (t) => this.popupListFocusout(t)),
          (this.popupToggleClickEvent = (t) => this.popupToggleClick(t)),
          (this.popoutKeyupEvent = (t) => this.popoutKeyup(t)),
          (this.popupOptionsClickEvent = (t) => this.popupOptionsClick(t)),
          (this._connectOptionsDispatchEvent = (t) =>
            this._connectOptionsDispatch(t)),
          (this.bodyClick = this.bodyClick.bind(this)),
          (this.updatePopout = this.updatePopout.bind(this)),
          this._connectOptions(),
          this._connectToggle(),
          this._onFocusOut(),
          this.popoutInput &&
            this.popoutInput.hasAttribute(ea) &&
            document.addEventListener("theme:cart:update", this.updatePopout);
      }
    };
  const na = {
      onLoad() {
        sa[this.id] = [];
        this.container.querySelectorAll(_r).forEach((t) => {
          sa[this.id].push(new oa(t));
        });
      },
      onUnload() {
        sa[this.id].forEach((t) => {
          "function" == typeof t.unload && t.unload();
        });
      },
    },
    ra = "[data-add-to-cart]",
    aa = "[data-deferred-media]",
    la = "[data-deferred-media-button]",
    ca = "[data-popup-close]",
    ha = "[data-popout]",
    da = "[data-quick-view-inner]",
    ua = "[data-quick-view-item-holder]",
    pa = "[data-product]",
    ma = "[data-product-form]",
    ga = "[data-product-single-media-slider]",
    va = "[data-product-single-media-wrapper]",
    ya = "[data-model]",
    fa = "[data-product-json]",
    ba = "[data-quick-view-foot-inner]",
    wa = "[data-shop-the-look-thumb]",
    Ea = "[data-tooltip]",
    Sa = "[data-drawer-toggle]",
    La = "has-media-active",
    ka = "is-active",
    Aa = "is-loading",
    qa = "media--hidden",
    Ca = "no-outline",
    Ta = "notification-popup-visible",
    Pa = "popup-quick-view--animate-in",
    Fa = "popup-quick-view--animate-out",
    Ia = "popup-quick-view--animated",
    xa = "popup-quick-view",
    Ha = "js-quick-view-visible",
    Da = "js-quick-view-from-cart",
    Ma = "js-drawer-open",
    Oa = "id",
    Ba = "data-media-id",
    _a = "data-section-id",
    $a = "loaded",
    za = "tabindex",
    Ra = "data-quick-view-onboarding",
    Va = "data-hotspot",
    Wa = "data-hotspot-ref",
    Na = "AddToCartForm--",
    Ua = "AddToCart--";
  const ja = 400,
    Ka = ".pswp",
    Qa = ".pswp__custom-close",
    Ga = "iframe, video",
    Xa = ".pswp__custom-iframe",
    Ja = ".pswp__thumbs",
    Ya = ".pswp__button, .pswp__caption-close",
    Za = "is-current",
    tl = "pswp--custom-loader",
    el = "pswp--custom-opening",
    il = "pswp__loader",
    sl = "pswp--open",
    ol = "pswp__button--close",
    nl = "pswp--notification",
    rl = "popup-quick-view",
    al = "js-drawer-open-cart",
    ll = "popup-quick-view--animate-out",
    cl = "data-pswp-option-classes",
    hl = "data-video-type",
    dl = `<div class="${il}"><div class="loader loader--image"><div class="loader__image"></div></div></div>`;
  let ul = class {
    init() {
      document.dispatchEvent(
        new CustomEvent("theme:scroll:lock", { bubbles: !0 })
      ),
        this.pswpElement.classList.add(el),
        this.initLoader(),
        Kt({ url: window.theme.assets.photoswipe })
          .then(() => this.loadPopup())
          .catch((t) => console.error(t));
    }
    initLoader() {
      if (
        this.pswpElement.classList.contains(tl) &&
        "" !== this.options &&
        this.options.mainClass
      ) {
        this.pswpElement.setAttribute(cl, this.options.mainClass);
        let t = document.createElement("div");
        (t.innerHTML = dl), (t = t.firstChild), this.pswpElement.appendChild(t);
      } else this.pswpElement.setAttribute(cl, "");
    }
    loadPopup() {
      const t = window.themePhotoswipe.PhotoSwipe.default,
        e = window.themePhotoswipe.PhotoSwipeUI.default;
      this.pswpElement.classList.contains(tl) &&
        this.pswpElement.classList.remove(tl),
        this.pswpElement.classList.remove(el),
        (this.popup = new t(this.pswpElement, e, this.items, this.options)),
        this.popup.listen("afterInit", this.dispatchPopupInitEventCallback),
        this.popup.listen("imageLoadComplete", this.setCurrentThumbCallback),
        this.popup.listen("beforeChange", this.setCurrentThumbCallback),
        this.popup.listen("close", this.onCloseCallback),
        this.popup.init(),
        this.initPopupCallback();
    }
    initPopupCallback() {
      this.isVideo && this.hideUnusedButtons(),
        this.initVideo(),
        this.thumbsActions(),
        this.a11y.trapFocus({ container: this.pswpElement }),
        this.pswpElement.classList.contains(rl) &&
          new (class {
            initTooltips() {
              (this.tooltips = this.pswpElement.querySelectorAll(Ea)),
                this.tooltips.forEach((t) => {
                  new Qe(t);
                });
            }
            initPopouts() {
              var t;
              (this.popoutElements = this.pswpElement.querySelectorAll(ha)),
                (this.popouts = {}),
                null === (t = this.popoutElements) ||
                  void 0 === t ||
                  t.forEach((t, e) => {
                    this.popouts[e] = new oa(t);
                  });
            }
            handleDraggable(t, e) {
              t && ((t.options.draggable = Boolean(e)), t.updateDraggable());
            }
            initItems(t, e) {
              this.addFormSuffix(t),
                this.initProductSlider(t, e),
                this.initProductVideo(t),
                this.initProductModel(t),
                this.initShopifyXrLaunch(t),
                Ji(t),
                this.pswpElement.querySelectorAll(Sa).length && new un(t),
                V(t);
              const i = new Mr(t.parentNode);
              this.productForms.push(i),
                Shopify.PaymentButton && Shopify.PaymentButton.init(),
                t.classList.remove(Aa);
            }
            init() {
              document.addEventListener(
                "submit",
                this.prevent3dModelSubmitEvent
              ),
                this.popupCloseButtons.forEach((t) => {
                  t.addEventListener("keyup", (t) => {
                    (t.code !== theme.keyboardKeys.ENTER &&
                      t.code !== theme.keyboardKeys.NUMPADENTER &&
                      t.code !== theme.keyboardKeys.SPACE) ||
                      this.closePopup(t);
                  }),
                    t.addEventListener("click", (t) => {
                      this.closePopup(t);
                    });
                }),
                this.pswpElement.addEventListener(
                  "click",
                  this.outerCloseEvent
                ),
                document.dispatchEvent(
                  new CustomEvent("theme:popup:open", { bubbles: !0 })
                ),
                this.popup.listen("preventDragEvent", (t, e, i) => {
                  i.prevent = !1;
                }),
                this.pswpElement.addEventListener("mousedown", () => {
                  this.popup.framework.unbind(
                    window,
                    "pointermove pointerup pointercancel",
                    this.popup
                  );
                }),
                this.popup.listen("initialZoomInEnd", () => {
                  document.body.classList.add(Ha),
                    this.a11y.trapFocus({ container: this.quickViewInner });
                }),
                this.pswpElement.addEventListener(
                  "animationend",
                  this.closeOnAnimationEndEvent
                ),
                this.popup.listen("destroy", () => {
                  this.flkty.length > 0 &&
                    requestAnimationFrame(() => {
                      this.flkty.forEach((t) => t.pausePlayer());
                    }),
                    document.body.classList.remove(Ha),
                    document.removeEventListener(
                      "keyup",
                      this.closeOnEscapeEvent
                    ),
                    document.addEventListener("keyup", this.closeOnEscapeEvent),
                    this.pswpElement.removeEventListener(
                      "click",
                      this.outerCloseEvent
                    ),
                    this.pswpElement.removeEventListener(
                      "animationend",
                      this.closeOnAnimationEndEvent
                    ),
                    document.removeEventListener(
                      "submit",
                      this.prevent3dModelSubmitEvent
                    ),
                    this.deferredMedias.forEach((t) => {
                      t.removeAttribute($a);
                      const e = t.closest(va);
                      e.dispatchEvent(new CustomEvent("theme:media:hidden"), {
                        bubbles: !0,
                      }),
                        e.classList.add(qa);
                    });
                }),
                document.addEventListener("keyup", this.closeOnEscapeEvent),
                document.addEventListener("theme:cart:added", () => {
                  this.pswpElement.classList.contains(xa) &&
                    this.pswpElement.classList.add(Fa);
                }),
                this.animateInQuickview(),
                this.initShopTheLookListeners();
            }
            initShopTheLookListeners() {
              var t;
              null === (t = this.buttonsShopTheLookThumb) ||
                void 0 === t ||
                t.forEach((t) => {
                  t.addEventListener("click", (t) => {
                    t.preventDefault();
                    const e = t.target.matches(wa)
                        ? t.target
                        : t.target.closest(wa),
                      i = this.pswpElement.querySelector(
                        `[${Va}="${e.getAttribute(Wa)}"]`
                      );
                    !e.classList.contains(ka) &&
                      i &&
                      (this.flkty.length > 0 &&
                        requestAnimationFrame(() => {
                          this.flkty.forEach((t) => {
                            t.resize();
                            const e = this.quickViewInner.querySelectorAll(va);
                            e.length &&
                              e.forEach((t) => {
                                t.dispatchEvent(
                                  new CustomEvent("theme:media:hidden"),
                                  { bubbles: !0 }
                                ),
                                  t.classList.add(qa);
                              });
                          });
                        }),
                      i.classList.add(ka),
                      this.quickViewItemHolders.forEach((t) => {
                        t !== i && t.classList.remove(ka);
                      }));
                  });
                });
            }
            prevent3dModelSubmit(t) {
              t.submitter.closest(aa) &&
                t.submitter.closest(ma) &&
                t.preventDefault();
            }
            closeQuickviewOnMobile() {
              window.innerWidth < window.theme.sizes.large &&
                document.body.classList.contains(Ha) &&
                this.popup.close();
            }
            animateInQuickview() {
              this.pswpElement.classList.add(Pa),
                this.quickViewFoot.addEventListener("animationend", (t) => {
                  this.handleAnimatedState(t);
                }),
                this.pswpElement.addEventListener("animationend", (t) => {
                  this.handleAnimatedState(t, !0);
                });
            }
            handleAnimatedState(t, e = !1) {
              if ("quickViewAnimateInUp" == t.animationName) {
                if (e && window.innerWidth >= window.theme.sizes.small) return;
                this.pswpElement.classList.add(Ia),
                  this.pswpElement.classList.remove(Pa),
                  document.body.classList.remove(Da),
                  U(this.pswpElement);
              }
            }
            closePopup(t) {
              null == t || t.preventDefault(),
                document.body.classList.contains(Ma) &&
                  document.dispatchEvent(
                    new CustomEvent("theme:drawer:closing", { bubbles: !0 })
                  ),
                this.pswpElement.classList.add(Fa),
                this.productForms.length > 0 &&
                  this.productForms.forEach((t) => {
                    t.destroy();
                  }),
                this.swatchesContainer.onUnload();
            }
            closeOnAnimationEnd(t) {
              ("quickViewAnimateOutRight" != t.animationName &&
                "quickViewAnimateOutDown" != t.animationName) ||
                (this.popup.template.classList.remove(Fa, Ia),
                this.popup.close());
            }
            closeOnEscape(t) {
              const e = document.body.classList.contains(Ha),
                i = document.body.classList.contains(Ta);
              t.code === theme.keyboardKeys.ESCAPE &&
                e &&
                !i &&
                this.closePopup(t);
            }
            initProductSlider(t, e) {
              const s = t.querySelector(ga),
                o = t.querySelectorAll(va);
              if (o.length > 1) {
                const n = new i(s, {
                  wrapAround: !0,
                  cellAlign: "left",
                  pageDots: !1,
                  prevNextButtons: !0,
                  adaptiveHeight: !1,
                  pauseAutoPlayOnHover: !1,
                  selectedAttraction: 0.2,
                  friction: 1,
                  autoPlay: !1,
                  on: {
                    ready: () => {
                      s.setAttribute(za, "-1"),
                        requestAnimationFrame(() => {
                          n.resize();
                        });
                    },
                    settle: () => {
                      const e = n.selectedElement,
                        i = e.getAttribute(Ba);
                      e.setAttribute(za, "0"),
                        n.cells.forEach((t) => {
                          t.element !== e && t.element.setAttribute(za, "-1");
                        }),
                        this.switchMedia(t, i);
                    },
                  },
                });
                this.flkty.push(n),
                  o.length &&
                    o.forEach((t) => {
                      t.addEventListener("theme:media:play", () => {
                        this.handleDraggable(this.flkty[e], !1),
                          t.closest(ga).classList.add(La);
                      }),
                        t.addEventListener("theme:media:pause", () => {
                          this.handleDraggable(this.flkty[e], !0),
                            t.closest(ga).classList.remove(La);
                        });
                    }),
                  ge(s);
              }
            }
            switchMedia(t, e) {
              const i = this.quickViewInner.querySelectorAll(va),
                s = t.querySelector(`${va}[${Ba}="${e}"]`),
                o = !document.body.classList.contains(Ca);
              i.length &&
                i.forEach((t) => {
                  t.dispatchEvent(new CustomEvent("theme:media:hidden"), {
                    bubbles: !0,
                  }),
                    t.classList.add(qa);
                }),
                o && s.focus(),
                s.closest(ga).classList.remove(La),
                s.classList.remove(qa),
                s.dispatchEvent(new CustomEvent("theme:media:visible"), {
                  bubbles: !0,
                });
              const n = s.querySelector(aa);
              n &&
                "true" !== n.getAttribute($a) &&
                s.querySelector(la).dispatchEvent(new Event("click"));
            }
            initProductVideo(t) {
              const e = new Pe(t);
              this.videos.push(e);
            }
            initProductModel(t) {
              const e = t.getAttribute(_a),
                i = t.querySelectorAll(ya);
              i.length &&
                i.forEach((t) => {
                  theme.ProductModel.init(t, e);
                });
            }
            initShopifyXrLaunch(t) {
              document.addEventListener("shopify_xr_launch", () => {
                t.querySelector(`${ya}:not(.${qa})`).dispatchEvent(
                  new CustomEvent("xrLaunch")
                );
              });
            }
            addFormSuffix(t) {
              const e = `${t.getAttribute(_a)}-${
                  JSON.parse(t.querySelector(fa).innerHTML).handle
                }`,
                i = t.querySelector(ma),
                s = t.querySelector(ra);
              i.setAttribute(Oa, Na + e), s.setAttribute(Oa, Ua + e);
            }
            constructor(t, e) {
              (this.popup = t),
                (this.pswpElement = e),
                (this.quickViewFoot = this.pswpElement.querySelector(ba)),
                (this.quickViewInner = this.pswpElement.querySelector(da)),
                (this.product = this.pswpElement.querySelectorAll(pa)),
                (this.flkty = []),
                (this.videos = []),
                (this.productForms = []),
                (this.deferredMedias = this.pswpElement.querySelectorAll(aa)),
                (this.buttonsShopTheLookThumb =
                  this.pswpElement.querySelectorAll(wa)),
                (this.quickViewItemHolders =
                  this.pswpElement.querySelectorAll(ua)),
                (this.popupCloseButtons =
                  this.quickViewInner.querySelectorAll(ca)),
                (this.a11y = Ut),
                (this.prevent3dModelSubmitEvent = (t) =>
                  this.prevent3dModelSubmit(t)),
                (this.closeOnAnimationEndEvent = (t) =>
                  this.closeOnAnimationEnd(t)),
                (this.closeOnEscapeEvent = (t) => this.closeOnEscape(t)),
                (this.outerCloseEvent = (t) => {
                  if (!this.quickViewInner.contains(t.target)) {
                    const e = this.quickViewInner.nextElementSibling;
                    if (e && e.contains(t.target)) return;
                    this.closePopup(t);
                  }
                }),
                this.product.forEach((t, e) => {
                  t.hasAttribute(Ra) || this.initItems(t, e);
                }),
                this.init(),
                this.initTooltips(),
                this.initPopouts(),
                (this.swatchesContainer = new Xi(this.pswpElement));
            }
          })(this.popup, this.pswpElement),
        this.pswpElement.classList.contains(nl) &&
          new (class {
            init() {
              this.popup.listen("preventDragEvent", (t, e, i) => {
                i.prevent = !1;
              });
              const t =
                -1 !== window.location.search.indexOf("?customer_posted=true");
              this.notificationForm = this.pswpElement.querySelector(he);
              const e = this.pswpElement.querySelector(ue);
              document.body.classList.add(me),
                this.pswpElement.addEventListener("mousedown", () => {
                  this.popup.framework.unbind(
                    window,
                    "pointermove pointerup pointercancel",
                    this.popup
                  );
                }),
                t && this.pswpElement.classList.add(pe),
                this.notificationForm.addEventListener("submit", (t) =>
                  this.notificationSubmitEvent(t)
                ),
                this.pswpElement.addEventListener(
                  "click",
                  this.outerCloseEvent
                ),
                e.addEventListener("click", () => {
                  this.popup.close();
                }),
                this.popup.listen("destroy", () => {
                  this.notificationRemoveStorage(),
                    this.pswpElement.removeEventListener(
                      "click",
                      this.outerCloseEvent
                    ),
                    document.body.classList.remove(me);
                });
            }
            notificationSubmitEvent(t) {
              this.notificationStopSubmit &&
                (t.preventDefault(),
                this.notificationRemoveStorage(),
                this.notificationWriteStorage(),
                (this.notificationStopSubmit = !1),
                this.notificationForm.submit());
            }
            notificationWriteStorage() {
              void 0 !== this.sessionStorage &&
                this.sessionStorage.setItem(
                  "notification_form_id",
                  this.notificationForm.id
                );
            }
            notificationRemoveStorage() {
              this.sessionStorage.removeItem("notification_form_id");
            }
            constructor(t, e) {
              (this.popup = t),
                (this.pswpElement = e),
                (this.notificationForm = null),
                (this.notificationStopSubmit = !0),
                (this.sessionStorage = window.sessionStorage);
              const i = this.pswpElement.querySelector(de);
              (this.outerCloseEvent = (t) => {
                i.contains(t.target) || this.popup.close();
              }),
                this.init();
            }
          })(this.popup, this.pswpElement),
        (this.closePopup = () => {
          this.pswpElement.classList.contains(rl)
            ? this.pswpElement.classList.add(ll)
            : this.popup.close();
        }),
        this.closeBtn &&
          this.closeBtn.addEventListener("click", this.closePopup),
        document.addEventListener("theme:cart:added", this.closePopup);
    }
    dispatchPopupInitEvent() {
      this.triggerBtn &&
        this.triggerBtn.dispatchEvent(
          new CustomEvent("theme:popup:init", { bubbles: !0 })
        );
    }
    initVideo() {
      const t = this.pswpElement.querySelector(Xa);
      if (t) {
        const e = t.getAttribute(hl);
        (this.isVideo = !0),
          "youtube" == e
            ? new (class {
                init() {
                  window.isYoutubeAPILoaded
                    ? this.loadYoutubePlayer()
                    : Kt({ url: "https://www.youtube.com/iframe_api" }).then(
                        () => this.loadYoutubePlayer()
                      );
                }
                loadYoutubePlayer() {
                  const t = {
                    height: "720",
                    width: "1280",
                    playerVars: this.videoOptionsVars,
                    events: {
                      onReady: (t) => {
                        const e = t.target.getIframe(),
                          i = e.id,
                          s =
                            "true" ===
                            document.querySelector(`#${i}`).getAttribute(oe);
                        e.setAttribute("tabindex", "-1"),
                          s ? t.target.unMute() : t.target.mute(),
                          t.target.playVideo(),
                          this.checkPlayerVisibilityFlag &&
                            (this.checkPlayerVisibility(i),
                            window.addEventListener(
                              "scroll",
                              Lt(() => {
                                this.checkPlayerVisibility(i);
                              }, 150)
                            ));
                      },
                      onStateChange: (t) => {
                        0 == t.data && t.target.playVideo(),
                          1 == t.data &&
                            t.target
                              .getIframe()
                              .parentElement.classList.add(le);
                      },
                    },
                  };
                  (t.videoId = this.videoID),
                    this.videoID.length &&
                      YT.ready(() => {
                        ce[this.playerID] = new YT.Player(this.playerID, t);
                      }),
                    (window.isYoutubeAPILoaded = !0);
                }
                checkPlayerVisibility(t) {
                  let e;
                  if ("string" == typeof t) e = t;
                  else {
                    if (null == t.data) return;
                    e = t.data.id;
                  }
                  const i = document.getElementById(e + "-container");
                  if (!i) return;
                  const s = ce[e],
                    o = i.getBoundingClientRect();
                  let n =
                    visibilityHelper.isElementPartiallyVisible(i) ||
                    visibilityHelper.isElementTotallyVisible(i);
                  o.top < 0 && i.clientHeight + o.top >= 0 && (n = !0),
                    n && s && "function" == typeof s.playVideo
                      ? s.playVideo()
                      : !n &&
                        s &&
                        "function" == typeof s.pauseVideo &&
                        s.pauseVideo();
                }
                onUnload() {
                  const t = "youtube-" + this.container.getAttribute(se);
                  ce[t] && ce[t].destroy();
                }
                constructor(t) {
                  (this.container = t),
                    (this.player = this.container.querySelector(
                      ie.videoIframe
                    )),
                    this.player &&
                      ((this.videoOptionsVars = {}),
                      (this.videoID = this.player.getAttribute(re)),
                      (this.videoType = this.player.getAttribute(ae)),
                      "youtube" == this.videoType &&
                        ((this.checkPlayerVisibilityFlag =
                          "true" === this.player.getAttribute(ne)),
                        (this.playerID = this.player.querySelector(
                          ie.youtubeWrapper
                        )
                          ? this.player.querySelector(ie.youtubeWrapper).id
                          : this.player.id),
                        this.player.hasAttribute(ie.dataHideOptions) &&
                          (this.videoOptionsVars = {
                            cc_load_policy: 0,
                            iv_load_policy: 3,
                            modestbranding: 1,
                            playsinline: 1,
                            autohide: 0,
                            controls: 0,
                            branding: 0,
                            showinfo: 0,
                            rel: 0,
                            fs: 0,
                            wmode: "opaque",
                          }),
                        this.init(),
                        this.container.addEventListener(
                          "touchstart",
                          function (t) {
                            if (
                              t.target.matches(ie.videoWrapper) ||
                              t.target.closest(ie.videoWrapper)
                            ) {
                              const e = t.target.querySelector(
                                ie.videoIframe
                              ).id;
                              ce[e].playVideo();
                            }
                          },
                          { passive: !0 }
                        )));
                }
              })(t.parentElement)
            : "vimeo" == e &&
              new (class {
                init() {
                  this.loadVimeoPlayer();
                }
                loadVimeoPlayer() {
                  const t = "https://vimeo.com/" + this.videoID;
                  let e = "";
                  const i = this.player,
                    s = {
                      url: t,
                      background: this.enableBackground,
                      muted: this.disableSound,
                      autoplay: this.enableAutoplay,
                      loop: this.enableLoop,
                    };
                  for (let t in s)
                    e +=
                      encodeURIComponent(t) +
                      "=" +
                      encodeURIComponent(s[t]) +
                      "&";
                  fetch(`https://vimeo.com/api/oembed.json?${e}`)
                    .then((t) => t.json())
                    .then(function (t) {
                      (i.innerHTML = t.html),
                        setTimeout(function () {
                          i.parentElement.classList.add(Gt);
                        }, 1e3);
                    })
                    .catch(function () {
                      console.log("error");
                    });
                }
                constructor(t) {
                  (this.container = t),
                    (this.player = this.container.querySelector(Qt)),
                    this.player &&
                      ((this.videoID = this.player.getAttribute(te)),
                      (this.videoType = this.player.getAttribute(ee)),
                      (this.enableBackground =
                        "true" === this.player.getAttribute(Jt)),
                      (this.disableSound =
                        "false" === this.player.getAttribute(Xt)),
                      (this.enableAutoplay =
                        "false" !== this.player.getAttribute(Yt)),
                      (this.enableLoop =
                        "false" !== this.player.getAttribute(Zt)),
                      "vimeo" == this.videoType && this.init());
                }
              })(t.parentElement);
      }
    }
    thumbsActions() {
      this.popupThumbsContainer &&
        this.popupThumbsContainer.firstChild &&
        (this.popupThumbsContainer.addEventListener("wheel", (t) =>
          this.stopDisabledScroll(t)
        ),
        this.popupThumbsContainer.addEventListener("mousewheel", (t) =>
          this.stopDisabledScroll(t)
        ),
        this.popupThumbsContainer.addEventListener("DOMMouseScroll", (t) =>
          this.stopDisabledScroll(t)
        ),
        (this.popupThumbs = this.pswpElement.querySelectorAll(`${Ja} > *`)),
        this.popupThumbs.forEach((t, e) => {
          t.addEventListener("click", (i) => {
            i.preventDefault(),
              t.parentElement.querySelector(`.${Za}`).classList.remove(Za),
              t.classList.add(Za),
              this.popup.goTo(e);
          });
        }));
    }
    hideUnusedButtons() {
      this.pswpElement.querySelectorAll(Ya).forEach((t) => {
        t.classList.contains(ol) || (t.style.display = "none");
      });
    }
    stopDisabledScroll(t) {
      t.stopPropagation();
    }
    onClose() {
      const t = this.pswpElement.querySelector(Ga);
      if (
        (t && t.parentNode.removeChild(t),
        this.popupThumbsContainer && this.popupThumbsContainer.firstChild)
      )
        for (; this.popupThumbsContainer.firstChild; )
          this.popupThumbsContainer.removeChild(
            this.popupThumbsContainer.firstChild
          );
      this.pswpElement.setAttribute(cl, "");
      const e = this.pswpElement.querySelector(`.${il}`);
      e && this.pswpElement.removeChild(e),
        document.body.classList.contains(al) || this.a11y.removeTrapFocus(),
        document.removeEventListener("theme:cart:added", this.closePopup),
        setTimeout(() => {
          const t = this.recentlyOpenedPopupsCount(),
            e = document.body.classList.contains(al);
          0 !== t ||
            e ||
            document.dispatchEvent(
              new CustomEvent("theme:scroll:unlock", { bubbles: !0 })
            );
        }, ja);
    }
    recentlyOpenedPopupsCount() {
      let t = 0;
      return (
        this.pswpElements.forEach((e) => {
          e.classList.contains(sl) && (t += 1);
        }),
        t
      );
    }
    setCurrentThumb() {
      if (this.popupThumbsContainer && this.popupThumbsContainer.firstChild)
        return;
      const t = this.pswpElement.querySelector(`${Ja} > .${Za}`);
      if ((t && t.classList.remove(Za), !this.popupThumbs)) return;
      const e = this.popupThumbs[this.popup.getCurrentIndex()];
      e.classList.add(Za), this.scrollThumbs(e);
    }
    scrollThumbs(t) {
      const e =
          this.popupThumbsContainer.scrollLeft +
          this.popupThumbsContainer.offsetWidth,
        i = t.offsetLeft;
      if (e <= i + t.offsetWidth || e > i) {
        const e = parseInt(window.getComputedStyle(t).marginLeft);
        this.popupThumbsContainer.scrollTo({
          top: 0,
          left: i - e,
          behavior: "smooth",
        });
      }
    }
    constructor(t, e = "", i = 0, s = null) {
      (this.items = t),
        (this.triggerBtn = s),
        (this.pswpElements = document.querySelectorAll(Ka)),
        (this.pswpElement = this.pswpElements[i]),
        (this.popup = null),
        (this.popupThumbs = null),
        (this.popupThumbsContainer = this.pswpElement.querySelector(Ja)),
        (this.closeBtn = this.pswpElement.querySelector(Qa));
      (this.options = "" !== e ? e : { history: !1, focus: !1, mainClass: "" }),
        (this.onCloseCallback = () => this.onClose()),
        (this.dispatchPopupInitEventCallback = () =>
          this.dispatchPopupInitEvent()),
        (this.setCurrentThumbCallback = () => this.setCurrentThumb()),
        (this.a11y = Ut),
        this.init();
    }
  };
  const pl = 0,
    ml = "[data-button-quick-view]",
    gl = "[data-quick-view-items-template]",
    vl = "[data-cart-drawer]",
    yl = "[data-shop-the-look-quick-view-button]",
    fl = "[data-shop-the-look-thumb]",
    bl = "[data-quick-view-item-holder]",
    wl = "is-loading",
    El = "is-active",
    Sl = "js-quick-view-from-cart",
    Ll = "popup-quick-view pswp--not-close-btn",
    kl = "popup-quick-view popup-quick-view--shop-the-look pswp--not-close-btn",
    Al = "data-handle",
    ql = "data-variant-id",
    Cl = "data-shop-the-look-quick-view",
    Tl = "data-hotspot",
    Pl = "data-initialized",
    Fl = {
      history: !1,
      focus: !1,
      mainClass: Ll,
      showHideOpacity: !1,
      closeOnVerticalDrag: !1,
      closeOnScroll: !1,
      modal: !1,
      escKey: !1,
    };
  let Il = class {
    popupInit(t) {
      var e, i;
      const s = this.loadPhotoswipe.pswpElement.querySelector(
          `[${Tl}="${t.getAttribute(Tl)}"]`
        ),
        o = this.loadPhotoswipe.pswpElement.querySelectorAll(bl);
      s.classList.add(El),
        o.forEach((t) => {
          t !== s && t.classList.remove(El);
        }),
        this.toggleQuickViewButtonsLoadingClasses(!0),
        this.toggleQuickViewThumbsLoadingClasses(!0);
      const n = (t) => {
        "quickViewAnimateInUp" === t.animationName &&
          requestAnimationFrame(() => {
            this.toggleQuickViewThumbsLoadingClasses(!1);
          }),
          "quickViewAnimateOutDown" === t.animationName &&
            this.loadPhotoswipe.pswpElement.removeEventListener(
              "animationend",
              n
            );
      };
      this.loadPhotoswipe.pswpElement.addEventListener("animationend", n),
        null === (e = this.loadPhotoswipe) ||
          void 0 === e ||
          null === (i = e.popup) ||
          void 0 === i ||
          i.listen("destroy", () => {
            this.toggleQuickViewButtonsLoadingClasses(!1),
              this.toggleQuickViewThumbsLoadingClasses(!1);
          });
    }
    toggleQuickViewButtonsLoadingClasses(t = !0) {
      var e, i;
      t
        ? null === (i = this.buttonsQuickView) ||
          void 0 === i ||
          i.forEach((t) => {
            t.classList.add(wl);
          })
        : null === (e = this.buttonsQuickView) ||
          void 0 === e ||
          e.forEach((t) => {
            t.classList.remove(wl);
          });
    }
    toggleQuickViewThumbsLoadingClasses(t = !0) {
      var e, i, s;
      ((this.buttonsShopTheLookThumb =
        null === (e = this.loadPhotoswipe) || void 0 === e
          ? void 0
          : e.pswpElement.querySelectorAll(fl)),
      t)
        ? null === (s = this.buttonsShopTheLookThumb) ||
          void 0 === s ||
          s.forEach((t) => {
            t.classList.add(wl);
          })
        : null === (i = this.buttonsShopTheLookThumb) ||
          void 0 === i ||
          i.forEach((t) => {
            t.classList.remove(wl);
          });
    }
    initPhotoswipe(t) {
      t.preventDefault();
      const e = t.target.matches(ml) ? t.target : t.target.closest(ml),
        i = window.innerWidth < theme.sizes.small;
      let s = "",
        o = !1;
      if (e.hasAttribute(Cl)) {
        if (!i) return;
        o = !0;
      }
      (Fl.mainClass = Ll),
        e.classList.add(wl),
        e.closest(vl) && document.body.classList.add(Sl),
        (this.a11y.state.trigger = e),
        e.hasAttribute(ql) && (s = `&variant=${e.getAttribute(ql)}`);
      const n = `${theme.routes.root}products/${e.getAttribute(
        Al
      )}?section_id=api-quickview${s}`;
      if (o) {
        (Fl.mainClass = kl),
          this.buttonsQuickView.forEach((t) => {
            t.classList.add(wl);
          });
        const t = new XMLSerializer(),
          i = this.container
            .querySelector(gl)
            .content.firstElementChild.cloneNode(!0),
          s = t.serializeToString(i);
        this.loadPhotoswipeWithTemplate(s, e);
      } else this.loadPhotoswipeFromFetch(n, e);
    }
    loadPhotoswipeWithTemplate(t, e) {
      const i = [{ html: t }];
      this.loadPhotoswipe = new ul(i, Fl, pl, e);
    }
    loadPhotoswipeFromFetch(t, e) {
      fetch(t)
        .then((t) => t.text())
        .then((t) => {
          const i = [{ html: t }];
          this.loadPhotoswipe = new ul(i, Fl, pl, e);
        })
        .catch((t) => console.log("error: ", t));
    }
    constructor(t) {
      var e, i;
      (this.container = t),
        (this.a11y = Ut),
        (this.buttonsQuickView = this.container.querySelectorAll(ml)),
        (this.buttonsShopTheLookQuickView =
          this.container.querySelectorAll(yl)),
        (this.popupInitCallback = (t) => this.popupInit(t)),
        null === (e = this.buttonsQuickView) ||
          void 0 === e ||
          e.forEach((t) => {
            t.hasAttribute(Pl) ||
              (t.addEventListener("click", (t) => this.initPhotoswipe(t)),
              t.addEventListener("theme:popup:init", () => {
                t.classList.remove(wl),
                  t.hasAttribute(Cl) && this.popupInitCallback(t);
              }),
              t.setAttribute(Pl, ""));
          }),
        null === (i = this.buttonsShopTheLookQuickView) ||
          void 0 === i ||
          i.forEach((t) => {
            t.addEventListener("click", () => {
              var t;
              null === (t = this.buttonsQuickView[0]) ||
                void 0 === t ||
                t.dispatchEvent(new Event("click"));
            });
          });
    }
  };
  const xl = {
      cartDrawerEnabled: "drawer" === window.theme.settings.cartType,
      timers: { addProductTimeout: 1e3 },
      animations: { data: "data-aos", method: "fade-up" },
    },
    Hl = {
      outerSection: "[data-section-id]",
      aos: "[data-aos]",
      additionalCheckoutButtons: "[data-additional-checkout-button]",
      apiContent: "[data-api-content]",
      apiLineItems: "[data-api-line-items]",
      apiUpsellItems: "[data-api-upsell-items]",
      apiCartPrice: "[data-api-cart-price]",
      buttonAddToCart: "[data-add-to-cart]",
      upsellButtonByHandle: "[data-handle]",
      cartCloseError: "[data-cart-error-close]",
      cartDrawer: "[data-cart-drawer]",
      cartDrawerTemplate: "[data-cart-drawer-template]",
      cartDrawerToggle: "[data-cart-drawer-toggle]",
      cartDrawerBody: "[data-cart-drawer-body]",
      cartErrors: "[data-cart-errors]",
      cartForm: "[data-cart-form]",
      cartTermsCheckbox: "[data-cart-acceptance-checkbox]",
      cartCheckoutButtonWrapper: "[data-cart-checkout-buttons]",
      cartCheckoutButton: "[data-cart-checkout-button]",
      cartItemRemove: "[data-item-remove]",
      cartItemsQty: "[data-cart-items-qty]",
      cartTotal: "[data-cart-total]",
      cartTotalPrice: "[data-cart-total-price]",
      cartMessage: "[data-cart-message]",
      cartMessageDefault: "[data-message-default]",
      cartPage: "[data-cart-page]",
      cartProgress: "[data-cart-message-progress]",
      emptyMessage: "[data-empty-message]",
      buttonHolder: "[data-foot-holder]",
      item: "[data-cart-item]",
      itemsHolder: "[data-items-holder]",
      itemsWrapper: "[data-items-wrapper]",
      formCloseError: "[data-close-error]",
      formErrorsContainer: "[data-cart-errors-container]",
      upsellHolder: "[data-upsell-holder]",
      errorMessage: "[data-error-message]",
      termsErrorMessage: "[data-terms-error-message]",
      pairProductsHolder: "[data-pair-products-holder]",
      pairProducts: "[data-pair-products]",
      priceHolder: "[data-cart-price-holder]",
      leftToSpend: "[data-left-to-spend]",
      quickBuyForm: "[data-quickbuy-form]",
      qtyInput: "[data-quantity-field]",
      productMediaContainer: "[data-product-media-container]",
      formWrapper: "[data-form-wrapper]",
      productForm: "[data-product-form]",
      popupQuickView: ".popup-quick-view",
      popupClose: "[data-popup-close]",
      error: "[data-error]",
      quickViewOnboarding: "[data-quick-view-onboarding]",
      flickityEnabled: ".flickity-enabled",
    },
    Dl = "hidden",
    Ml = "is-hidden",
    Ol = "js-drawer-open-cart",
    Bl = "is-open",
    _l = "is-visible",
    $l = "is-expanded",
    zl = "is-loading",
    Rl = "is-disabled",
    Vl = "is-success",
    Wl = "cart__toggle--has-items",
    Nl = "variant--soldout",
    Ul = "is-removed",
    jl = "aos-animate",
    Kl = "is-updated",
    Ql = "no-outline",
    Gl = "product-grid-item__image--error",
    Xl = "cv-h",
    Jl = "data-limit",
    Yl = "data-cart-message",
    Zl = "data-cart-total",
    tc = "aria-expanded",
    ec = "disabled",
    ic = "value",
    sc = "data-id",
    oc = "data-item",
    nc = "data-item-index",
    rc = "data-item-title",
    ac = "data-atc-trigger",
    lc = "data-notification-popup",
    cc = "data-recipient-errors";
  let hc = {},
    dc = class {
      init() {
        var t;
        (this.cartToggleButtons = document.querySelectorAll(
          Hl.cartDrawerToggle
        )),
          (this.cartPage = document.querySelector(Hl.cartPage)),
          (this.cartDrawer = document.querySelector(Hl.cartDrawer)),
          (this.cart = this.cartDrawer || this.cartPage),
          (this.cartCount = this.getCartItemCount()),
          this.assignArguments(),
          (this.recipientErrors =
            "true" ===
            (null === (t = this.form) || void 0 === t
              ? void 0
              : t.getAttribute(cc))),
          (this.flktyUpsell = null),
          (this.form = null),
          (this.collapsible = null),
          (this.a11y = Ut),
          (this.build = this.build.bind(this)),
          (this.addToCart = this.addToCart.bind(this)),
          (this.updateCart = this.updateCart.bind(this)),
          (this.openCartDrawer = this.openCartDrawer.bind(this)),
          (this.closeCartDrawer = this.closeCartDrawer.bind(this)),
          (this.toggleCartDrawer = this.toggleCartDrawer.bind(this)),
          (this.formSubmitHandler = Lt(this.formSubmitHandler.bind(this), 50)),
          (this.closeCartError = () => {
            this.cartErrorHolder.classList.remove($l);
          }),
          (this.cartDrawerCloseEvent = null),
          (this.hasItemsInCart = this.hasItemsInCart.bind(this)),
          (this.isCartPage = Boolean(this.cart && null === this.cartDrawer)),
          (this.showAnimations = Boolean(
            "true" === document.body.dataset.animations
          )),
          (this.toggleClassesOnContainers =
            this.toggleClassesOnContainers.bind(this)),
          (this.totalItems = 0),
          (this.isCartDrawerOpen = !1),
          (this.isCartDrawerLoaded = !1),
          (this.cartDiscounts = 0),
          (this.cartDrawerEnabled = xl.cartDrawerEnabled),
          (this.cartAnimationTimer = 0),
          (this.cartUpdateFailed = !1),
          this.cartEvents(),
          this.cartAddEvent(),
          this.cartDrawerToggleEvents(),
          this.initQuantity(),
          this.buttonHolder && (this.collapsible = new Mt(this.buttonHolder)),
          this.isCartPage && this.renderPairProducts(),
          document.addEventListener("theme:popup:open", this.closeCartDrawer);
      }
      assignArguments() {
        (this.cartDrawerBody = document.querySelector(Hl.cartDrawerBody)),
          (this.emptyMessage = document.querySelector(Hl.emptyMessage)),
          (this.buttonHolder = document.querySelector(Hl.buttonHolder)),
          (this.itemsHolder = document.querySelector(Hl.itemsHolder)),
          (this.cartItemsQty = document.querySelector(Hl.cartItemsQty)),
          (this.itemsWrapper = document.querySelector(Hl.itemsWrapper)),
          (this.items = document.querySelectorAll(Hl.item)),
          (this.cartTotal = document.querySelector(Hl.cartTotal)),
          (this.cartTotalPrice = document.querySelector(Hl.cartTotalPrice)),
          (this.cartMessage = document.querySelectorAll(Hl.cartMessage)),
          (this.cartOriginalTotal = document.querySelector(
            Hl.cartOriginalTotal
          )),
          (this.cartErrorHolder = document.querySelector(Hl.cartErrors)),
          (this.cartCloseErrorMessage = document.querySelector(
            Hl.cartCloseError
          )),
          (this.pairProductsHolder = document.querySelector(
            Hl.pairProductsHolder
          )),
          (this.pairProducts = document.querySelector(Hl.pairProducts)),
          (this.priceHolder = document.querySelector(Hl.priceHolder)),
          (this.upsellHolders = document.querySelectorAll(Hl.upsellHolder)),
          (this.cartTermsCheckbox = document.querySelector(
            Hl.cartTermsCheckbox
          )),
          (this.cartCheckoutButtonWrapper = document.querySelector(
            Hl.cartCheckoutButtonWrapper
          )),
          (this.cartCheckoutButton = document.querySelector(
            Hl.cartCheckoutButton
          )),
          (this.cartForm = document.querySelector(Hl.cartForm)),
          (this.cartItemCount = 0),
          (this.subtotal = window.theme.subtotal),
          (this.button = null),
          this.cartMessage.length > 0 &&
            (this.cartFreeLimitShipping =
              100 *
              Number(this.cartMessage[0].getAttribute(Jl)) *
              window.Shopify.currency.rate),
          this.updateProgress();
      }
      initQuantity() {
        var t;
        (this.items = document.querySelectorAll(Hl.item)),
          null === (t = this.items) ||
            void 0 === t ||
            t.forEach((t) => {
              new Nt(t, !0).init(), this.cartUpdateEvent(t);
            });
      }
      cartUpdateEvent(t) {
        t.addEventListener("theme:cart:update", (e) => {
          this.updateCart({ id: e.detail.id, quantity: e.detail.quantity }, t);
        });
      }
      cartEvents() {
        const t = document.querySelectorAll(Hl.cartItemRemove);
        (this.totalItems = t.length),
          null == t ||
            t.forEach((t) => {
              const e = t.closest(Hl.item);
              t.addEventListener("click", (i) => {
                i.preventDefault(),
                  t.classList.contains(Rl) ||
                    this.updateCart({ id: e.getAttribute(sc), quantity: 0 }, e);
              });
            }),
          this.cartCloseErrorMessage &&
            (this.cartCloseErrorMessage.removeEventListener(
              "click",
              this.closeCartError
            ),
            this.cartCloseErrorMessage.addEventListener(
              "click",
              this.closeCartError
            )),
          this.cartTermsCheckbox &&
            (this.cartTermsCheckbox.removeEventListener(
              "change",
              this.formSubmitHandler
            ),
            this.cartCheckoutButtonWrapper.removeEventListener(
              "click",
              this.formSubmitHandler
            ),
            this.cartForm.removeEventListener("submit", this.formSubmitHandler),
            this.cartTermsCheckbox.addEventListener(
              "change",
              this.formSubmitHandler
            ),
            this.cartCheckoutButtonWrapper.addEventListener(
              "click",
              this.formSubmitHandler
            ),
            this.cartForm.addEventListener("submit", this.formSubmitHandler));
      }
      cartAddEvent() {
        document.addEventListener("click", (t) => {
          const e = t.target,
            i = null == e ? void 0 : e.matches(Hl.buttonAddToCart),
            s = null == e ? void 0 : e.closest(Hl.buttonAddToCart);
          if (i || s) {
            var o, n, r;
            t.preventDefault(),
              (this.button = i ? e : s),
              (this.form = e.closest("form")),
              (this.recipientErrors =
                "true" ===
                (null === (o = this.form) || void 0 === o
                  ? void 0
                  : o.getAttribute(cc))),
              (this.formWrapper = this.button.closest(Hl.formWrapper));
            const a =
                null === (n = this.formWrapper) || void 0 === n
                  ? void 0
                  : n.classList.contains(Nl),
              l = this.button.hasAttribute(ec),
              c = this.button.closest(Hl.quickViewOnboarding),
              h = this.button.hasAttribute(ac),
              d = this.button.hasAttribute(lc),
              u =
                null === (r = this.form) || void 0 === r
                  ? void 0
                  : r.querySelector('[type="file"]');
            if (l || u || c) return;
            if (a && d) return void new Mn(this.button);
            h && (this.a11y.state.trigger = this.button);
            const p = new FormData(this.form);
            this.addToCart(p),
              document.dispatchEvent(
                new CustomEvent("theme:cart:add", {
                  bubbles: !0,
                  detail: { selector: e },
                })
              );
          }
        });
      }
      getCart() {
        if (this.cartDrawer && !this.isCartDrawerLoaded) {
          const t = !1;
          this.renderCartDrawer(t);
        }
        fetch(theme.routes.cart_url + "?section_id=api-cart-items")
          .then(this.handleErrors)
          .then((t) => t.text())
          .then((t) => {
            const e = document.createElement("div");
            e.innerHTML = t;
            const i = e.querySelector(Hl.apiContent);
            this.build(i);
          })
          .catch((t) => console.log(t));
      }
      addToCart(t) {
        this.cartDrawerEnabled &&
          this.button &&
          (this.button.classList.add(zl), this.button.setAttribute(ec, !0)),
          fetch(theme.routes.cart_add_url, {
            method: "POST",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              Accept: "application/javascript",
            },
            body: t,
          })
            .then((t) => t.json())
            .then((t) => {
              if (
                ((this.button.disabled = !0), this.addLoadingClass(), t.status)
              )
                return this.addToCartError(t), void this.removeLoadingClass();
              this.hideAddToCartErrorMessage(),
                this.cartDrawerEnabled
                  ? this.getCart()
                  : (window.location = theme.routes.cart_url);
            })
            .catch((t) => console.log(t));
      }
      updateCart(t = {}, e = null) {
        let i = t.quantity;
        null !== e && (i ? e.classList.add(zl) : e.classList.add(Ul)),
          this.disableCartButtons(),
          this.addLoadingClass();
        const s = this.cart.querySelector(`[${oc}="${t.id}"]`) || e,
          o = (null == s ? void 0 : s.hasAttribute(nc))
            ? parseInt(s.getAttribute(nc))
            : 0,
          n = (null == s ? void 0 : s.hasAttribute(rc))
            ? s.getAttribute(rc)
            : null;
        if (0 === o) return;
        const r = { line: o, quantity: i };
        fetch(theme.routes.cart_change_url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(r),
        })
          .then((t) => {
            if (400 === t.status) {
              const e = new Error(t.status);
              throw (
                (this.cartDrawerEnabled
                  ? this.getCart()
                  : (window.location = theme.routes.cart_url),
                e)
              );
            }
            return t.text();
          })
          .then((t) => {
            if (JSON.parse(t).errors)
              return (
                (this.cartUpdateFailed = !0),
                this.updateErrorText(n),
                this.toggleErrorMessage(),
                this.resetLineItem(e),
                this.enableCartButtons(),
                void this.removeLoadingClass()
              );
            this.getCart();
          })
          .catch((t) => {
            console.log(t), this.enableCartButtons(), this.removeLoadingClass();
          });
      }
      resetLineItem(t) {
        const e = t.querySelector(Hl.qtyInput),
          i = e.getAttribute("value");
        (e.value = i), t.classList.remove(zl);
      }
      disableCartButtons() {
        const t = this.cart.querySelectorAll("input"),
          e = this.cart.querySelectorAll(`button, ${Hl.cartItemRemove}`);
        t.length &&
          t.forEach((t) => {
            t.classList.add(Rl), t.blur(), (t.disabled = !0);
          }),
          e.length &&
            e.forEach((t) => {
              t.setAttribute(ec, !0);
            });
      }
      enableCartButtons() {
        const t = this.cart.querySelectorAll("input"),
          e = this.cart.querySelectorAll(`button, ${Hl.cartItemRemove}`);
        t.length &&
          t.forEach((t) => {
            t.classList.remove(Rl), (t.disabled = !1);
          }),
          e.length &&
            e.forEach((t) => {
              t.removeAttribute(ec);
            });
      }
      updateErrorText(t) {
        this.cartErrorHolder.querySelector(Hl.errorMessage).innerText = t;
      }
      toggleErrorMessage() {
        if (this.cartErrorHolder) {
          if (
            (this.cartErrorHolder.classList.toggle($l, this.cartUpdateFailed),
            this.cartUpdateFailed)
          ) {
            const t = this.cartErrorHolder.querySelector(Hl.cartCloseError);
            this.focusOnErrorMessage(this.cartErrorHolder, t);
          }
          this.cartUpdateFailed = !1;
        }
      }
      handleErrors(t) {
        return t.ok
          ? t
          : t.json().then(function (e) {
              throw new kt({
                status: t.statusText,
                headers: t.headers,
                json: e,
              });
            });
      }
      addToCartError(t) {
        const e = this.button.closest(Hl.quickBuyForm),
          i = this.button.closest(Hl.upsellHolder),
          s = !document.body.classList.contains(Ql);
        let o = (
          this.button.closest(Hl.productForm)
            ? this.button.closest(Hl.productForm)
            : this.button.closest(Hl.upsellHolder)
        ).querySelector(Hl.formErrorsContainer);
        i && (o = i.querySelector(Hl.formErrorsContainer)),
          this.cartDrawerEnabled &&
            this.button &&
            null !== this.button.closest(Hl.cartDrawer) &&
            !this.button.closest(Hl.cartDrawer) &&
            this.closeCartDrawer(),
          this.button.classList.remove(zl),
          this.button.removeAttribute(ec);
        const n = e
          ? ""
          : `\n      <button type="button" class="errors__button-close" data-close-error>\n        ${theme.icons.close}\n      </button>\n    `;
        let r = `${t.message}: ${t.description}`;
        if (
          (this.recipientErrors &&
            t.description &&
            "object" == typeof t.description &&
            (r = Object.entries(t.description)
              .map(([t, e]) => `${e}`)
              .join("<br>")),
          (o.innerHTML = `\n      <div class="errors" data-error autofocus>\n        ${r}\n        ${n}\n      </div>\n    `),
          e)
        ) {
          const t = o.closest(Hl.productMediaContainer);
          t.classList.add(Gl),
            o.querySelector(Hl.error).addEventListener("animationend", () => {
              t.classList.remove(Gl),
                (o.innerHTML = ""),
                s || document.activeElement.blur();
            });
        } else
          o.classList.add(_l),
            o.addEventListener("transitionend", () => {
              this.resizeSliders(o);
            }),
            this.handleCloseErrorMessages(o);
      }
      handleCloseErrorMessages(t) {
        const e = t.querySelector(Hl.formCloseError);
        null == e ||
          e.addEventListener("click", (e) => {
            const i = e.target;
            (i.matches(Hl.formCloseError) || i.closest(Hl.formCloseError)) &&
              (e.preventDefault(),
              t.classList.remove(_l),
              t
                .querySelector(Hl.error)
                .addEventListener("transitionend", () => {
                  (t.innerHTML = ""), this.resizeSliders(i);
                }));
          }),
          this.focusOnErrorMessage(t, e);
      }
      focusOnErrorMessage(t, e) {
        !document.body.classList.contains(Ql) &&
          t.addEventListener("transitionend", () => {
            requestAnimationFrame(() =>
              null == e ? void 0 : e.focus({ focusVisible: !0 })
            );
          });
      }
      hideAddToCartErrorMessage() {
        const t = this.button.closest(Hl.upsellHolder)
            ? this.button.closest(Hl.upsellHolder)
            : this.button.closest(Hl.productForm),
          e = null == t ? void 0 : t.querySelector(Hl.formErrorsContainer);
        null == e || e.classList.remove(_l);
      }
      resizeSliders(t) {
        const e = t.closest(Hl.flickityEnabled);
        if (!e) return;
        const s = i.data(e);
        requestAnimationFrame(() => s.resize());
      }
      renderCartDrawer(t = !0) {
        const e = document.querySelector(Hl.cartDrawerTemplate);
        e &&
          ((this.cartDrawer.innerHTML = e.innerHTML),
          this.assignArguments(),
          this.initQuantity(),
          this.cartEvents(),
          this.buttonHolder && (this.collapsible = new Mt(this.buttonHolder)),
          (this.cartDrawerToggle = this.cartDrawer.querySelector(
            Hl.cartDrawerToggle
          )),
          this.cartDrawerToggle.addEventListener(
            "click",
            this.cartDrawerToggleClickEvent
          ),
          (this.isCartDrawerLoaded = !0),
          this.renderPairProducts(),
          document.dispatchEvent(
            new CustomEvent("theme:cart:loaded", { bubbles: !0 })
          ),
          t && this.openCartDrawer());
      }
      openCartDrawer() {
        this.isCartDrawerOpen ||
          (this.isCartDrawerLoaded
            ? (document.dispatchEvent(
                new CustomEvent("theme:cart:open", { bubbles: !0 })
              ),
              document.dispatchEvent(
                new CustomEvent("theme:scroll:lock", {
                  bubbles: !0,
                  detail: this.cartDrawer,
                })
              ),
              document.dispatchEvent(
                new CustomEvent("theme:scroll:lock", {
                  bubbles: !0,
                  detail: this.cartDrawerBody,
                })
              ),
              document.body.classList.add(Ol),
              this.cartDrawer.classList.add(Bl),
              this.cartDrawer.classList.remove(Xl),
              this.cartDrawer.querySelectorAll(Hl.aos).forEach((t) => {
                requestAnimationFrame(() => {
                  t.classList.add(jl);
                });
              }),
              this.cartToggleButtons.forEach((t) => {
                t.setAttribute(tc, !0);
              }),
              this.a11y.trapFocus({ container: this.cartDrawer }),
              this.observeAdditionalCheckoutButtons(),
              (this.isCartDrawerOpen = !0))
            : this.renderCartDrawer());
      }
      closeCartDrawer() {
        if (!this.isCartDrawerOpen) return;
        document.dispatchEvent(
          new CustomEvent("theme:cart:close", { bubbles: !0 })
        ),
          this.cartAnimationTimer && clearTimeout(this.cartAnimationTimer),
          (this.cartAnimationTimer = setTimeout(() => {
            this.cartDrawer.querySelectorAll(Hl.aos).forEach((t) => {
              t.classList.remove(jl);
            });
          }, 300)),
          this.cartErrorHolder.classList.remove($l),
          this.a11y.removeTrapFocus(),
          this.cartToggleButtons.forEach((t) => {
            t.setAttribute(tc, !1);
          }),
          document.body.classList.remove(Ol),
          this.cartDrawer.classList.remove(Bl),
          this.itemsHolder.classList.remove(Kl);
        const t = (e) => {
          e.target === this.cartDrawer &&
            (requestAnimationFrame(() => {
              this.cartDrawer.classList.add(Xl);
            }),
            this.cartDrawer.removeEventListener("transitionend", t));
        };
        this.cartDrawer.addEventListener("transitionend", t);
        !document.body.classList.contains(Ql) ||
          requestAnimationFrame(() => {
            document.activeElement.blur();
          });
        document.dispatchEvent(
          new CustomEvent("theme:scroll:unlock", { bubbles: !0, detail: 400 })
        ),
          (this.isCartDrawerOpen = !1);
      }
      toggleCartDrawer() {
        this.isCartDrawerOpen ? this.closeCartDrawer() : this.openCartDrawer();
      }
      cartDrawerToggleEvents() {
        this.cartDrawer &&
          (this.cartDrawer.addEventListener("keyup", (t) => {
            t.code === theme.keyboardKeys.ESCAPE && this.closeCartDrawer();
          }),
          (this.cartDrawerToggleClickEvent = (t) => {
            t.preventDefault();
            const e = t.target;
            "false" === e.getAttribute(tc) && (this.a11y.state.trigger = e),
              this.toggleCartDrawer();
          }),
          (this.cartDrawerCloseEvent = (t) => {
            const e = t.target.matches(Hl.cartDrawerToggle),
              i = document.querySelector(Hl.cartDrawer).contains(t.target),
              s = t.target.closest(Hl.popupQuickView);
            e || i || s || this.closeCartDrawer();
          }),
          this.cartToggleButtons.forEach((t) => {
            t.addEventListener("click", this.cartDrawerToggleClickEvent);
          }),
          document.addEventListener("mousedown", this.cartDrawerCloseEvent));
      }
      toggleClassesOnContainers() {
        const t = this;
        this.emptyMessage.classList.toggle(Dl, t.hasItemsInCart()),
          this.buttonHolder.classList.toggle(Dl, !t.hasItemsInCart()),
          this.itemsHolder.classList.toggle(Dl, !t.hasItemsInCart()),
          this.cartItemsQty.classList.toggle(Dl, !t.hasItemsInCart());
      }
      build(t) {
        const e = t.querySelector(Hl.apiLineItems),
          i = t.querySelector(Hl.apiUpsellItems),
          o = Boolean(null === e && null === i),
          n = t.querySelector(Hl.apiCartPrice),
          r = t.querySelector(Hl.cartTotal);
        this.priceHolder && n && (this.priceHolder.innerHTML = n.innerHTML),
          this.emptyMessage.querySelectorAll(Hl.aos).forEach((t) => {
            t.classList.remove(jl);
          }),
          o
            ? ((this.itemsHolder.innerHTML = ""),
              this.pairProductsHolder &&
                (this.pairProductsHolder.innerHTML = ""))
            : ((this.itemsHolder.innerHTML = e.innerHTML),
              this.pairProductsHolder &&
                (this.pairProductsHolder.innerHTML = i.innerHTML),
              this.renderPairProducts()),
          (this.newTotalItems =
            e && e.querySelectorAll(Hl.item).length
              ? e.querySelectorAll(Hl.item).length
              : 0),
          (this.subtotal =
            r && r.hasAttribute(Zl) ? parseInt(r.getAttribute(Zl)) : 0),
          (this.cartCount = this.getCartItemCount()),
          this.cartMessage.length > 0 && this.updateProgress(),
          this.cartToggleButtons.forEach((t) => {
            t.classList.remove(Wl),
              this.newTotalItems > 0 && t.classList.add(Wl);
          }),
          this.toggleErrorMessage(),
          this.updateItemsQuantity(this.cartCount),
          (this.cartTotalPrice.innerHTML =
            0 === this.subtotal
              ? window.theme.strings.free
              : s.formatMoney(this.subtotal, theme.moneyWithCurrencyFormat)),
          this.totalItems !== this.newTotalItems &&
            ((this.totalItems = this.newTotalItems),
            this.toggleClassesOnContainers()),
          this.isCartDrawerOpen && this.itemsHolder.classList.add(Kl),
          this.cartEvents(),
          this.initQuantity(),
          this.enableCartButtons(),
          this.resetButtonClasses(),
          this.removeLoadingClass(),
          document.dispatchEvent(
            new CustomEvent("theme:cart:added", { bubbles: !0 })
          ),
          this.cartDrawer && this.openCartDrawer();
      }
      getCartItemCount() {
        return this.cart
          ? Array.from(this.cart.querySelectorAll(Hl.qtyInput)).reduce(
              (t, e) => t + parseInt(e.value),
              0
            )
          : 0;
      }
      hasItemsInCart() {
        return this.totalItems > 0;
      }
      freeShippingMessageHandle(t) {
        this.cartMessage.length > 0 &&
          document.querySelectorAll(Hl.cartMessage).forEach((e) => {
            const i =
                e.hasAttribute(Yl) && "true" === e.getAttribute(Yl) && 0 !== t,
              s = e.querySelector(Hl.cartMessageDefault);
            e.classList.toggle(Vl, t >= this.cartFreeLimitShipping && i),
              e.classList.toggle(Ml, 0 === t),
              s.classList.toggle(Ml, t >= this.cartFreeLimitShipping);
          });
      }
      updateProgress() {
        const t = (this.subtotal / this.cartFreeLimitShipping) * 100,
          e = theme.settings.currency_code_enable
            ? s.formatMoney(
                this.cartFreeLimitShipping - this.subtotal,
                theme.moneyWithCurrencyFormat
              )
            : s.formatMoney(
                this.cartFreeLimitShipping - this.subtotal,
                theme.moneyFormat
              );
        this.cartMessage.length > 0 &&
          document.querySelectorAll(Hl.cartMessage).forEach((i) => {
            const s = i.querySelectorAll(Hl.cartProgress),
              o = i.querySelector(Hl.leftToSpend);
            o && (o.innerHTML = e.replace(".00", "").replace(",00", "")),
              s.length &&
                s.forEach((e, i) => {
                  e.classList.toggle(
                    Ml,
                    this.subtotal / this.cartFreeLimitShipping >= 1
                  ),
                    e.style.setProperty("--progress-width", `${t}%`),
                    0 === i && e.setAttribute(ic, t);
                }),
              this.freeShippingMessageHandle(this.subtotal);
          });
      }
      renderPairProducts() {
        if (
          ((this.flktyUpsell = null),
          (this.pairProductsHolder = document.querySelector(
            Hl.pairProductsHolder
          )),
          (this.pairProducts = document.querySelector(Hl.pairProducts)),
          (this.upsellHolders = document.querySelectorAll(Hl.upsellHolder)),
          null === this.pairProductsHolder ||
            void 0 === this.pairProductsHolder)
        )
          return;
        const t = this;
        this.upsellHolders.length > 1
          ? (this.flktyUpsell = new i(this.pairProducts, {
              wrapAround: !0,
              pageDots: !0,
              adaptiveHeight: !0,
              prevNextButtons: !1,
              on: {
                ready: function () {
                  new Il(t.cart),
                    this.reloadCells(),
                    requestAnimationFrame(() => this.resize());
                },
              },
            }))
          : new Il(this.cart);
      }
      updateItemsQuantity(t) {
        let e = theme.strings.cart_items_one,
          i = theme.strings.cart_items_many;
        (e = e.split("}}")[1]),
          (i = i.split("}}")[1]),
          this.cartItemsQty &&
            (this.cartItemsQty.textContent =
              1 === t ? `${t} ${e}` : `${t} ${i}`);
      }
      observeAdditionalCheckoutButtons() {
        const t = this.cart.querySelector(Hl.additionalCheckoutButtons);
        if (t) {
          const e = new MutationObserver(() => {
            this.a11y.removeTrapFocus(),
              this.a11y.trapFocus({ container: this.cart }),
              e.disconnect();
          });
          e.observe(t, { subtree: !0, childList: !0 });
        }
      }
      formSubmitHandler() {
        const t = document.querySelector(Hl.cartTermsCheckbox).checked,
          e = document.querySelector(Hl.termsErrorMessage);
        if (t)
          e.classList.remove($l), this.cartCheckoutButton.removeAttribute(ec);
        else {
          if (document.querySelector(Hl.termsErrorMessage).length > 0) return;
          (e.innerText = theme.strings.cart_acceptance_error),
            this.cartCheckoutButton.setAttribute(ec, !0),
            e.classList.add($l);
        }
      }
      resetButtonClasses() {
        const t = document.querySelectorAll(Hl.buttonAddToCart);
        t &&
          t.forEach((t) => {
            t.classList.contains(zl) &&
              (t.classList.remove(zl),
              t.classList.add(Vl),
              setTimeout(() => {
                t.removeAttribute(ec), t.classList.remove(Vl);
              }, xl.timers.addProductTimeout));
          });
      }
      addLoadingClass() {
        this.cartDrawer
          ? this.cartDrawer.classList.add(zl)
          : this.itemsWrapper && this.itemsWrapper.classList.add(zl);
      }
      removeLoadingClass() {
        this.cartDrawer
          ? this.cartDrawer.classList.remove(zl)
          : this.itemsWrapper && this.itemsWrapper.classList.remove(zl);
      }
      unload() {
        this.cartDrawerToggle &&
          this.cartDrawerToggle.removeEventListener(
            "click",
            this.cartDrawerToggleClickEvent
          ),
          this.cartToggleButtons.forEach((t) => {
            t.removeEventListener("click", this.cartDrawerToggleClickEvent);
          }),
          document.removeEventListener("mousedown", this.cartDrawerCloseEvent),
          null !== this.collapsible && this.collapsible.onUnload();
      }
      constructor() {
        "/password" !== window.location.pathname && this.init();
      }
    };
  yt("cart-template", {
    onLoad() {
      hc[this.id] = new dc();
    },
    onUnload() {
      "function" == typeof hc[this.id].unload && hc[this.id].unload();
    },
  });
  const uc = "is-visible",
    pc = document.querySelector("[data-scroll-top-button]");
  pc &&
    (pc.addEventListener("click", () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }),
    document.addEventListener(
      "scroll",
      Lt(() => {
        pc.classList.toggle(uc, window.pageYOffset > window.innerHeight);
      }, 150)
    ));
  const mc = "details",
    gc = "[data-popdown-body]",
    vc = "[data-popdown-close]",
    yc = "[data-popdown-toggle]",
    fc = "[data-search-form-inner]",
    bc = "[data-popular-searches-link]",
    wc = "[data-site-header]",
    Ec = "[data-nav]",
    Sc = "[data-nav-items-compress]",
    Lc = "[data-nav-icons]",
    kc = "[data-mobile-menu]",
    Ac = "predictive-search",
    qc = "search-form",
    Cc = "data-popdown-in-header",
    Tc = "data-popdown-in-page",
    Pc = "data-search-performed",
    Fc = "search-opened",
    Ic = "site-header--menu-opened",
    xc = "nav--compress";
  let Hc = class extends HTMLElement {
    connectedCallback() {
      this.isPopdownInHeader &&
        (this.details.addEventListener(
          "keyup",
          (t) => "ESCAPE" === t.code.toUpperCase() && this.close()
        ),
        this.popdownClose.addEventListener("click", () => this.close()),
        this.popdownToggle.addEventListener("click", (t) =>
          this.onPopdownToggleClick(t)
        ),
        this.popdownToggle.setAttribute("role", "button")),
        this.isPopdownInPage &&
          (this.popdownClose.addEventListener("click", () =>
            this.triggerPopdownClose()
          ),
          this.searchFormWrapper.addEventListener("focusout", () =>
            this.onFocusOut()
          ),
          this.searchFormWrapper.input.addEventListener("click", (t) =>
            this.triggerPopdownOpen(t)
          )),
        this.searchFormInner.addEventListener("transitionend", (t) => {
          t.target === this.searchFormInner &&
            this.details.hasAttribute("open") &&
            "false" == this.details.getAttribute("open") &&
            this.onClose();
        }),
        this.popularSearchesLink.forEach((t) => {
          t.addEventListener("click", (t) => {
            t.preventDefault();
            const e = t.target.textContent;
            (this.searchFormWrapper.input.value = e),
              this.searchFormWrapper.submit();
          });
        });
    }
    onPopdownToggleClick(t) {
      t.preventDefault(),
        t.target.closest(mc).hasAttribute("open") ? this.close() : this.open(t);
    }
    onBodyClick(t) {
      var e;
      const i = this.contains(t.target);
      (null === (e = this.header) || void 0 === e
        ? void 0
        : e.classList.contains(Ic)) ||
        i ||
        i ||
        this.close();
    }
    onFocusOut() {
      this.predictiveSearch &&
        requestAnimationFrame(() => {
          this.searchFormWrapper.contains(document.activeElement) ||
            this.searchFormWrapper.close();
        });
    }
    triggerPopdownOpen(t) {
      const e = this.closest(`[${Pc}="false"]`),
        i = matchMedia("(pointer:coarse)").matches,
        s = window.innerWidth < theme.sizes.small,
        o = i || s,
        n = null != e;
      if (this.nav && this.mobileMenu && (o || n)) {
        t.preventDefault();
        const e = this.nav.classList.contains(xc);
        let s = this.mobileMenu.querySelector(yc);
        i ||
          (s = e
            ? this.nav.querySelector(`${Sc} ${yc}`)
            : this.nav.querySelector(`${Lc} ${yc}`)),
          setTimeout(() => {
            null == s || s.dispatchEvent(new Event("click", { bubbles: !0 }));
          }, 300);
      }
    }
    open(t) {
      (this.onBodyClickEvent = (t) => this.onBodyClick(t)),
        t.target.closest(mc).setAttribute("open", ""),
        this.searchFormWrapper.input.setAttribute("aria-expanded", !0),
        document.body.classList.add(Fc),
        document.body.addEventListener("click", this.onBodyClickEvent),
        document.addEventListener(
          "theme:resize",
          this.ensureClosingOnResizeEvent
        ),
        document.dispatchEvent(
          new CustomEvent("theme:scroll:lock", { bubbles: !0 })
        ),
        (this.a11y.state.trigger = t.target),
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            t.target.closest(mc).setAttribute("open", "true"),
              this.a11y.trapFocus({ container: this.searchFormInner });
          });
        });
    }
    close() {
      this.a11y.removeTrapFocus(),
        this.details.setAttribute("open", "false"),
        this.predictiveSearch && this.searchFormWrapper.close(),
        this.searchFormWrapper.handleFocusableDescendants(!0);
    }
    triggerPopdownClose() {
      this.predictiveSearch && this.searchFormWrapper.close(),
        this.searchFormWrapper.popularSearches &&
          requestAnimationFrame(() => document.activeElement.blur());
    }
    onClose() {
      this.details.removeAttribute("open"),
        document.dispatchEvent(
          new CustomEvent("theme:search:close", { bubbles: !0 })
        ),
        document.body.classList.remove(Fc),
        document.body.removeEventListener("click", this.onBodyClickEvent),
        document.removeEventListener(
          "theme:resize",
          this.ensureClosingOnResizeEvent
        ),
        document.dispatchEvent(
          new CustomEvent("theme:scroll:unlock", { bubbles: !0 })
        );
    }
    ensureClosingOnResize() {
      null === this.offsetParent && this.onClose();
    }
    constructor() {
      var t, e, i;
      super(),
        (this.isPopdownInHeader = this.hasAttribute(Cc)),
        (this.isPopdownInPage = this.hasAttribute(Tc)),
        (this.popdownBody = this.querySelector(gc)),
        (this.popdownClose = this.querySelector(vc)),
        (this.searchFormInner = this.querySelector(fc)),
        (this.popularSearchesLink = this.querySelectorAll(bc)),
        (this.searchFormWrapper = this.querySelector(qc)
          ? this.querySelector(qc)
          : this.querySelector(Ac)),
        (this.predictiveSearch = this.searchFormWrapper.matches(Ac)),
        (this.header = document.querySelector(wc)),
        (this.headerSection =
          null === (t = this.header) || void 0 === t ? void 0 : t.parentNode),
        (this.nav =
          null === (e = this.header) || void 0 === e
            ? void 0
            : e.querySelector(Ec)),
        (this.mobileMenu =
          null === (i = this.headerSection) || void 0 === i
            ? void 0
            : i.querySelector(kc)),
        (this.a11y = Ut),
        (this.ensureClosingOnResizeEvent = () => this.ensureClosingOnResize()),
        this.isPopdownInHeader &&
          ((this.details = this.querySelector(mc)),
          (this.popdownToggle = this.querySelector(yc)));
    }
  };
  customElements.define("search-popdown", Hc),
    (theme.ProductModel = (function () {
      let t = {},
        e = {},
        i = {};
      const s = {
          productMediaWrapper: "[data-product-single-media-wrapper]",
          mediaGroup: "[data-product-single-media-group]",
          productXr: "[data-shopify-xr]",
          mediaId: "data-media-id",
          model3d: "data-shopify-model3d-id",
          modelViewer: "model-viewer",
          modelJson: "#ModelJson-",
          deferredMedia: "[data-deferred-media]",
          deferredMediaButton: "[data-deferred-media-button]",
        },
        o = { isLoading: "is-loading", mediaHidden: "media--hidden" };
      function n(t, n) {
        if (t.querySelector(s.deferredMedia).getAttribute("loaded")) return;
        t.classList.add(o.isLoading);
        const l = document.createElement("div");
        l.appendChild(
          t.querySelector("template").content.firstElementChild.cloneNode(!0)
        );
        const c = l.querySelector("model-viewer"),
          h = t.querySelector(s.deferredMedia);
        h.appendChild(c), h.setAttribute("loaded", !0);
        const d = t.dataset.mediaId,
          u = c.dataset.modelId,
          p = t.closest(s.mediaGroup).parentElement.querySelector(s.productXr);
        (i[n] = { element: p, defaultId: u }),
          (e[d] = {
            modelId: u,
            mediaId: d,
            sectionId: n,
            container: t,
            element: c,
          }),
          window.ShopifyXR
            ? a()
            : window.Shopify.loadFeatures([
                { name: "shopify-xr", version: "1.0", onLoad: r },
                { name: "model-viewer-ui", version: "1.0", onLoad: a },
              ]);
      }
      function r(e) {
        if (e) console.warn(e);
        else if (window.ShopifyXR) {
          for (const e in t)
            if (t.hasOwnProperty(e)) {
              const i = t[e];
              if (i.loaded) continue;
              const o = document.querySelector(`${s.modelJson}${e}`);
              o &&
                (window.ShopifyXR.addModels(JSON.parse(o.innerHTML)),
                (i.loaded = !0));
            }
          window.ShopifyXR.setupXRElements();
        } else
          document.addEventListener("shopify_xr_initialized", function () {
            r();
          });
      }
      function a(t) {
        if (t) console.warn(t);
        else
          for (const t in e)
            if (e.hasOwnProperty(t)) {
              const i = e[t];
              i.modelViewerUi ||
                ((i.modelViewerUi = new Shopify.ModelViewerUI(i.element)),
                l(i));
            }
      }
      function l(t) {
        const e = i[t.sectionId];
        t.container.addEventListener("theme:media:visible", function () {
          e.element.setAttribute(s.model3d, t.modelId),
            window.theme.touch ||
              (t.modelViewerUi.play(),
              t.container.dispatchEvent(new CustomEvent("theme:media:play"), {
                bubbles: !0,
              }));
        }),
          t.container.addEventListener("theme:media:hidden", function () {
            t.modelViewerUi.pause();
          }),
          t.container.addEventListener("xrLaunch", function () {
            t.modelViewerUi.pause();
          }),
          t.element.addEventListener("load", () => {
            e.element.setAttribute(s.model3d, t.modelId),
              t.container.classList.remove(o.isLoading),
              t.container.dispatchEvent(new CustomEvent("theme:media:play"), {
                bubbles: !0,
              });
          }),
          t.element.addEventListener(
            "shopify_model_viewer_ui_toggle_play",
            function () {
              c(t.mediaId),
                setTimeout(() => {
                  t.container.dispatchEvent(
                    new CustomEvent("theme:media:play"),
                    { bubbles: !0 }
                  );
                }, 50);
            }
          ),
          t.element.addEventListener(
            "shopify_model_viewer_ui_toggle_pause",
            function () {
              t.container.dispatchEvent(new CustomEvent("theme:media:pause"), {
                bubbles: !0,
              });
            }
          ),
          c(t.mediaId);
      }
      function c(t) {
        const e = `[${s.mediaId}="${t}"]`,
          i = document.querySelectorAll(`${s.productMediaWrapper}:not(${e})`);
        i.length &&
          i.forEach((t) => {
            t.dispatchEvent(new CustomEvent("theme:media:hidden"), {
              bubbles: !0,
            }),
              t.classList.add(o.mediaHidden);
          });
      }
      return {
        init: function (e, i) {
          t[i] = { loaded: !1 };
          const o = e.querySelector(s.deferredMediaButton);
          o && o.addEventListener("click", n.bind(this, e, i));
        },
        loadContent: n,
        removeSectionModels: function (i) {
          for (const t in e)
            if (e.hasOwnProperty(t)) {
              e[t].sectionId === i && delete e[t];
            }
          delete t[i], delete theme.mediaInstances[i];
        },
      };
    })()),
    yt("collection-template", wo);
  const Dc = ".template-customers-addresses",
    Mc = "[data-form]",
    Oc = "[data-form-new]",
    Bc = "[data-button-new]",
    _c = "[data-button-edit]",
    $c = "[data-button-delete]",
    zc = "[data-button-cancel]",
    Rc = "data-form-edit",
    Vc = "AddressCountryNew",
    Wc = "AddressProvinceNew",
    Nc = "AddressProvinceContainerNew",
    Uc = "[data-country-option]",
    jc = "AddressCountry",
    Kc = "AddressProvince",
    Qc = "AddressProvinceContainer",
    Gc = 'input[type="text"]:not(.optional)',
    Xc = "data-form-id",
    Jc = "is-hidden",
    Yc = "validation--showup";
  const Zc = document.querySelector(Dc);
  Zc &&
    new (class {
      init() {
        if (this.addressNewForm) {
          const t = this.section,
            e = this.addressNewForm;
          this.customerAddresses();
          const i = t.querySelectorAll(Bc);
          i.length &&
            i.forEach((t) => {
              t.addEventListener("click", function (i) {
                i.preventDefault(), t.classList.add(Jc), e.classList.remove(Jc);
              });
            });
          const s = t.querySelectorAll(_c);
          s.length &&
            s.forEach((e) => {
              e.addEventListener("click", function (e) {
                e.preventDefault();
                const i = this.getAttribute(Xc);
                t.querySelector(`[${Rc}="${i}"]`).classList.toggle(Jc);
              });
            });
          const o = t.querySelectorAll($c);
          o.length &&
            o.forEach((t) => {
              t.addEventListener("click", function (t) {
                t.preventDefault();
                const e = this.getAttribute(Xc);
                confirm(theme.strings.delete_confirm) &&
                  Shopify.postLink("/account/addresses/" + e, {
                    parameters: { _method: "delete" },
                  });
              });
            });
          const n = t.querySelectorAll(zc);
          n.length &&
            n.forEach((t) => {
              t.addEventListener("click", function (t) {
                t.preventDefault(),
                  this.closest(Mc).classList.add(Jc),
                  document.querySelector(Bc).classList.remove(Jc);
              });
            });
        }
      }
      customerAddresses() {
        Shopify.CountryProvinceSelector &&
          new Shopify.CountryProvinceSelector(Vc, Wc, { hideElement: Nc }),
          this.section.querySelectorAll(Uc).forEach((t) => {
            const e = t.getAttribute(Xc),
              i = `${jc}_${e}`,
              s = `${Kc}_${e}`,
              o = `${Qc}_${e}`;
            new Shopify.CountryProvinceSelector(i, s, { hideElement: o });
          });
      }
      validate() {
        this.accountForms.forEach((t) => {
          const e = t.querySelector("form"),
            i = e.querySelectorAll(Gc);
          e.addEventListener("submit", (t) => {
            let e = !1;
            i.forEach((t) => {
              t.value
                ? t.nextElementSibling.classList.remove(Yc)
                : (t.nextElementSibling.classList.add(Yc), (e = !0));
            }),
              e && t.preventDefault();
          });
        });
      }
      constructor(t) {
        (this.section = t),
          (this.addressNewForm = this.section.querySelector(Oc)),
          (this.accountForms = this.section.querySelectorAll(Mc)),
          this.init(),
          this.validate();
      }
    })(Zc);
  const th = "[data-account-form]",
    eh = "[data-show-reset]",
    ih = "[data-hide-reset]",
    sh = "[data-recover-password]",
    oh = "[data-login-form]",
    nh = "[data-recover-success]",
    rh = "[data-recover-success-text]",
    ah = "#recover",
    lh = "is-hidden";
  const ch = document.querySelector(th);
  ch &&
    new (class {
      init() {
        window.location.hash == ah
          ? this.showRecoverPasswordForm()
          : this.hideRecoverPasswordForm(),
          this.success && this.successText.classList.remove(lh),
          this.showButton.addEventListener(
            "click",
            (t) => {
              t.preventDefault(), this.showRecoverPasswordForm();
            },
            !1
          ),
          this.hideButton.addEventListener(
            "click",
            (t) => {
              t.preventDefault(), this.hideRecoverPasswordForm();
            },
            !1
          );
      }
      showRecoverPasswordForm() {
        return (
          this.recover.classList.remove(lh),
          this.login.classList.add(lh),
          (window.location.hash = ah),
          !1
        );
      }
      hideRecoverPasswordForm() {
        return (
          this.login.classList.remove(lh),
          this.recover.classList.add(lh),
          (window.location.hash = ""),
          !1
        );
      }
      constructor(t) {
        (this.form = t),
          (this.showButton = t.querySelector(eh)),
          (this.hideButton = t.querySelector(ih)),
          (this.recover = t.querySelector(sh)),
          (this.login = t.querySelector(oh)),
          (this.success = t.querySelector(nh)),
          (this.successText = t.querySelector(rh)),
          this.init();
      }
    })(ch),
    yt("search-template", [wo, Zo]);
  const hh = "[data-ticker-scale]",
    dh = "[data-ticker-text]",
    uh = "data-clone",
    ph = "data-marquee-speed",
    mh = "ticker--animated",
    gh = "ticker--unloaded",
    vh = "ticker__comparitor",
    yh = 1.63,
    fh = 100;
  const bh = "[data-announcement]",
    wh = "[data-announcement-slide]",
    Eh = "[data-ticker-frame]",
    Sh = "[data-slide]",
    Lh = "[data-slider]",
    kh = "[data-ticker-scale]",
    Ah = "[data-ticker-text]",
    qh = "data-slide",
    Ch = "data-slider-speed",
    Th = "data-stop",
    Ph = "style",
    Fh = "data-target-referrer",
    Ih = "desktop",
    xh = "mobile",
    Hh = "ticker--animated",
    Dh = {};
  const Mh = {
    onLoad() {
      Dh[this.id] = [];
      const t = this.container.querySelector(bh);
      t &&
        Dh[this.id].push(
          new (class {
            init() {
              this.removeAnnouncement(),
                this.slider &&
                  (this.initSlider(),
                  document.addEventListener(
                    "theme:resize:width",
                    this.initSlider.bind(this)
                  )),
                this.slider ||
                  (this.initTickers(!0), this.tickerAnimationPause());
            }
            removeAnnouncement() {
              for (let t = 0; t < this.slides.length; t++) {
                const e = this.slides[t];
                e.hasAttribute(Fh) &&
                  (-1 !== this.locationPath.indexOf(e.getAttribute(Fh)) ||
                    window.Shopify.designMode ||
                    e.parentNode.removeChild(e));
              }
            }
            initSlider() {
              if (this.slider.querySelectorAll(Sh)) {
                let t = `${Sh}`;
                (t =
                  window.innerWidth < theme.sizes.small
                    ? `${Sh}:not(.${Ih})`
                    : `${Sh}:not(.${xh})`),
                  null != this.flkty && this.flkty.destroy(),
                  (this.flkty = new i(this.slider, {
                    cellSelector: t,
                    pageDots: !1,
                    prevNextButtons: !1,
                    wrapAround: !0,
                    autoPlay: parseInt(this.slider.getAttribute(Ch), 10),
                    on: {
                      ready: () => {
                        setTimeout(() => {
                          this.slider.dispatchEvent(
                            new CustomEvent("slider-is-loaded", {
                              bubbles: !0,
                              detail: { slider: this },
                            })
                          );
                        }, 10);
                      },
                    },
                  })),
                  this.flkty.reposition();
              }
              this.slider.addEventListener("slider-is-loaded", () => {
                this.initTickers();
              });
            }
            initTickers(t = !1) {
              this.barHolder.querySelectorAll(Eh).forEach((e) => {
                const i = new (class {
                  listen() {
                    document.addEventListener(
                      "theme:resize:width",
                      this.resizeEvent
                    ),
                      this.checkWidth();
                  }
                  checkWidth() {
                    const t =
                      2 *
                      window
                        .getComputedStyle(this.frame)
                        .paddingLeft.replace("px", "");
                    if (
                      this.frame.clientWidth - t <
                        this.comparitor.clientWidth ||
                      this.stopClone
                    ) {
                      if (1 === this.scale.childElementCount) {
                        if (
                          (this.text.classList.add(mh),
                          (this.clone = this.text.cloneNode(!0)),
                          this.clone.setAttribute(uh, ""),
                          this.scale.appendChild(this.clone),
                          this.stopClone)
                        )
                          for (let t = 0; t < 10; t++) {
                            const t = this.text.cloneNode(!0);
                            t.setAttribute(uh, ""), this.scale.appendChild(t);
                          }
                        let t = this.frame.getAttribute(ph);
                        null === t && (t = 100);
                        const e = yh * (100 / parseInt(t, 10)),
                          i = (this.text.clientWidth / fh) * e;
                        this.scale.style.setProperty(
                          "--animation-time",
                          `${i}s`
                        );
                      }
                    } else {
                      this.text.classList.add(mh);
                      let t = this.scale.querySelector(`[${uh}]`);
                      t && this.scale.removeChild(t),
                        this.text.classList.remove(mh);
                    }
                  }
                  unload() {
                    document.removeEventListener(
                      "theme:resize:width",
                      this.resizeEvent
                    );
                  }
                  constructor(t, e = !1) {
                    (this.frame = t),
                      (this.stopClone = e),
                      (this.scale = this.frame.querySelector(hh)),
                      (this.text = this.frame.querySelector(dh)),
                      (this.comparitor = this.text.cloneNode(!0)),
                      this.comparitor.classList.add(vh),
                      this.frame.appendChild(this.comparitor),
                      this.scale.classList.remove(gh),
                      (this.resizeEvent = n(() => this.checkWidth(), 100)),
                      this.listen();
                  }
                })(e, t);
                this.tickers.push(i);
                const s = e.querySelectorAll(Sh);
                if (0 !== s.length) {
                  const t = e.querySelectorAll(`${Sh}.${xh}`),
                    i = e.querySelectorAll(`${Sh}.${Ih}`);
                  s.length === t.length
                    ? e.parentNode.classList.add(xh)
                    : s.length === i.length && e.parentNode.classList.add(Ih);
                }
              });
            }
            toggleTicker(t, e) {
              const i = t.target.closest(kh),
                s = document.querySelector(`[${qh}="${t.detail.blockId}"]`);
              e &&
                s &&
                (i.setAttribute(Th, ""),
                i.querySelectorAll(Ah).forEach((t) => {
                  t.classList.remove(Hh),
                    (t.style.transform = `translate3d(${-(
                      s.offsetLeft -
                      parseInt(getComputedStyle(s).marginLeft, 10)
                    )}px, 0, 0)`);
                })),
                !e &&
                  s &&
                  (i.querySelectorAll(Ah).forEach((t) => {
                    t.classList.add(Hh), t.removeAttribute(Ph);
                  }),
                  i.removeAttribute(Th));
            }
            tickerAnimationPause() {
              let t = 0,
                e = !1;
              const i = this.barHolder.querySelector(wh);
              i.addEventListener("mouseenter", () => {
                (e = !0),
                  (t = setTimeout(() => {
                    e &&
                      i.querySelectorAll(Ah).forEach((t) => {
                        t.style.animationPlayState = "paused";
                      }),
                      clearTimeout(t);
                  }, 500));
              }),
                i.addEventListener("mouseleave", () => {
                  (e = !1),
                    i.querySelectorAll(Ah).forEach((t) => {
                      t.style.animationPlayState = "running";
                    });
                });
            }
            onBlockSelect(t) {
              const e = parseInt(
                [...t.target.parentNode.children].indexOf(t.target)
              );
              this.slider &&
                null !== this.flkty &&
                (this.flkty.select(e), this.flkty.pausePlayer()),
                this.slider || this.toggleTicker(t, !0);
            }
            onBlockDeselect(t) {
              this.slider && null !== this.flkty && this.flkty.unpausePlayer(),
                this.slider || this.toggleTicker(t, !1);
            }
            onUnload() {
              document.removeEventListener(
                "theme:resize:width",
                this.initSlider.bind(this)
              ),
                this.tickers.length > 0 &&
                  this.tickers.forEach((t) => {
                    t.unload();
                  });
            }
            constructor(t) {
              (this.barHolder = t),
                (this.locationPath = location.href),
                (this.slides = this.barHolder.querySelectorAll(Sh)),
                (this.slider = this.barHolder.querySelector(Lh)),
                (this.tickers = []),
                (this.flkty = null),
                this.init();
            }
          })(t)
        );
    },
    onBlockSelect(t) {
      Dh[this.id].length &&
        Dh[this.id].forEach((e) => {
          "function" == typeof e.onBlockSelect && e.onBlockSelect(t);
        });
    },
    onBlockDeselect(t) {
      Dh[this.id].length &&
        Dh[this.id].forEach((e) => {
          "function" == typeof e.onBlockSelect && e.onBlockDeselect(t);
        });
    },
    onUnload() {
      Dh[this.id].forEach((t) => {
        "function" == typeof t.onUnload && t.onUnload();
      });
    },
  };
  yt("announcement-bar", Mh), yt("marquee", Mh);
  const Oh = "[data-hover-disclosure]",
    Bh = "[data-site-header]",
    _h = "[data-top-link]",
    $h = "[data-header-background]",
    zh = "[data-nav-item]",
    Rh = "is-visible",
    Vh = "grandparent",
    Wh = "site-header--menu-opened",
    Nh = "has-scrolled",
    Uh = "site-header--hovered",
    jh = "search-opened",
    Kh = "data-hover-disclosure-toggle",
    Qh = "aria-haspopup",
    Gh = "aria-expanded",
    Xh = "aria-controls";
  let Jh = {};
  const Yh = {
      onLoad() {
        Jh[this.id] = [];
        this.container.querySelectorAll(Oh).forEach((t) => {
          Jh[this.id].push(
            new (class {
              showDisclosure() {
                (this.hasScrolled = document.body.classList.contains(Nh)),
                  (this.headerHeight = this.hasScrolled
                    ? window.stickyHeaderHeight
                    : this.header.offsetHeight),
                  this.grandparent
                    ? ((this.dropdown.style.height = "auto"),
                      (this.dropdownHeight =
                        this.dropdown.offsetHeight + this.headerHeight))
                    : (this.dropdownHeight = this.headerHeight),
                  this.background.style.setProperty(
                    "--header-background-height",
                    `${this.dropdownHeight}px`
                  ),
                  this.trigger.setAttribute(Gh, !0),
                  this.trigger.classList.add(Rh),
                  this.header.classList.add(Wh),
                  this.trigger.classList.contains(Vh) &&
                    document.dispatchEvent(
                      new CustomEvent("theme:scroll:lock", {
                        bubbles: !0,
                        detail: this.header,
                      })
                    ),
                  this.updateHeaderHover();
              }
              hideDisclosure() {
                this.background.style.removeProperty(
                  "--header-background-height"
                ),
                  this.trigger.classList.remove(Rh),
                  this.trigger.setAttribute(Gh, !1),
                  this.header.classList.remove(Wh),
                  document.body.classList.contains(jh) ||
                    document.dispatchEvent(
                      new CustomEvent("theme:scroll:unlock", { bubbles: !0 })
                    );
              }
              updateHeaderHover() {
                requestAnimationFrame(() => {
                  const t = this.header.matches(":hover"),
                    e = this.header.classList.contains(Uh);
                  t && !e && this.header.classList.add(Uh);
                });
              }
              handleTablets() {
                this.trigger.addEventListener("touchstart", (t) => {
                  if (!this.trigger.classList.contains(Rh)) {
                    t.preventDefault();
                    const e = this.header.querySelectorAll(`.${Rh}${zh}`);
                    if (e.length > 0)
                      return void e.forEach((t) => {
                        if (t !== this.trigger) {
                          t.dispatchEvent(
                            new Event("mouseleave", { bubbles: !0 })
                          );
                          const e = () => {
                            requestAnimationFrame(() => {
                              this.showDisclosure();
                            }),
                              t.removeEventListener("transitionend", e);
                          };
                          t.addEventListener("transitionend", e);
                        }
                      });
                    this.showDisclosure();
                  }
                });
              }
              connectHoverToggle() {
                this.trigger.addEventListener("mouseenter", () =>
                  this.showDisclosure()
                ),
                  this.link.addEventListener("focus", () =>
                    this.showDisclosure()
                  ),
                  this.trigger.addEventListener("mouseleave", () =>
                    this.hideDisclosure()
                  ),
                  this.trigger.addEventListener("focusout", (t) => {
                    this.trigger.contains(t.relatedTarget) ||
                      this.hideDisclosure();
                  }),
                  this.disclosure.addEventListener("keyup", (t) => {
                    t.code === theme.keyboardKeys.ESCAPE &&
                      this.hideDisclosure();
                  });
              }
              onBlockSelect(t) {
                this.disclosure.contains(t.target) && this.showDisclosure(t);
              }
              onBlockDeselect(t) {
                this.disclosure.contains(t.target) && this.hideDisclosure();
              }
              constructor(t) {
                (this.disclosure = t),
                  (this.header = t.closest(Bh)),
                  (this.key = this.disclosure.id),
                  (this.trigger = document.querySelector(
                    `[${Kh}='${this.key}']`
                  )),
                  (this.link = this.trigger.querySelector(_h)),
                  (this.grandparent = this.trigger.classList.contains(Vh)),
                  (this.background = document.querySelector($h)),
                  this.trigger.setAttribute(Qh, !0),
                  this.trigger.setAttribute(Gh, !1),
                  this.trigger.setAttribute(Xh, this.key),
                  (this.dropdown = this.trigger.querySelector(Oh)),
                  this.connectHoverToggle(),
                  this.handleTablets();
              }
            })(t)
          );
        });
      },
      onBlockSelect(t) {
        Jh[this.id].forEach((e) => {
          "function" == typeof e.onBlockSelect && e.onBlockSelect(t);
        });
      },
      onBlockDeselect(t) {
        Jh[this.id].forEach((e) => {
          "function" == typeof e.onBlockDeselect && e.onBlockDeselect(t);
        });
      },
    },
    Zh = "[data-site-header]",
    td = "[data-announcement-wrapper]",
    ed = "[data-collection-filters]",
    id = "[data-logo]",
    sd = "[data-logo-text-link]",
    od = "[data-collapsible-trigger]",
    nd = "#nav-drawer",
    rd = "[data-drawer]",
    ad = "[data-drawer-toggle]",
    ld = "[data-popdown-toggle]",
    cd = "[data-mobile-menu]",
    hd = "[data-nav]",
    dd = "[data-nav-icons]",
    ud = "[data-nav-item]",
    pd = "[data-nav-link-mobile]",
    md = "[data-nav-search-open]",
    gd = "[data-wrapper]",
    vd = "[data-header-background]",
    yd = "[data-cart-page]",
    fd = "[data-takes-space]",
    bd = {
      jsDrawerOpenAll: [
        "js-drawer-open",
        "js-drawer-open-cart",
        "js-quick-view-visible",
        "js-quick-view-from-cart",
      ],
      headerTransparent: "site-header--transparent",
      headerHovered: "site-header--hovered",
      headerMenuOpened: "site-header--menu-opened",
      hasScrolled: "has-scrolled",
      hideHeader: "hide-header",
      navCompress: "nav--compress",
      logoCompress: "logo--compress",
      isVisible: "is-visible",
      isOpen: "is-open",
      searchOpened: "search-opened",
      noOutline: "no-outline",
      cloneClass: "js__header__clone",
    },
    wd = "data-nav-alignment",
    Ed = {};
  const Sd = {
    onLoad() {
      Ed[this.id] = new (class {
        updateHeaderHover() {
          requestAnimationFrame(() => {
            const t = this.header.matches(":hover"),
              e = this.header.classList.contains(bd.headerHovered);
            t && !e && this.header.classList.add(bd.headerHovered);
          });
        }
        handleTouchstart(t) {
          const e = this.header.contains(t.target),
            i = this.header.querySelector(`.${bd.isVisible}${ud}`);
          !e && i && i.dispatchEvent(new Event("mouseleave", { bubbles: !0 }));
        }
        handleTextLinkLogos() {
          if (null === this.logoTextLink) return;
          const t = this.header.offsetHeight;
          document.documentElement.style.setProperty(
            "--header-height",
            `${t}px`
          ),
            document.documentElement.style.setProperty(
              "--header-sticky-height",
              `${t}px`
            );
        }
        initStickyHeader() {
          if (
            ((this.hasScrolled = !1),
            (this.hasCollectionFilters = document.querySelector(ed)),
            (this.position = this.header.dataset.position),
            "fixed" === this.position && !this.hasCollectionFilters)
          )
            return (
              this.headerState(),
              void document.addEventListener(
                "theme:scroll",
                this.headerStateEvent
              )
            );
          document.body.classList.remove(bd.hasScrolled),
            window.isHeaderTransparent &&
              this.header.classList.add(bd.headerTransparent);
        }
        headerState(t) {
          const e = parseInt(
              this.header.dataset.height || this.header.offsetHeight
            ),
            i = document.querySelector(td),
            s = e + (i ? i.offsetHeight : 0),
            o = window.pageYOffset || document.documentElement.scrollTop,
            n = t && t.detail && t.detail.up;
          (this.hasScrolled = o > s),
            document.body.classList.toggle(bd.hasScrolled, this.hasScrolled);
          const r = o < s + window.stickyHeaderHeight && n;
          if (
            (document.body.classList.toggle(bd.hideHeader, r),
            window.isHeaderTransparent)
          ) {
            const t = !this.hasScrolled || r;
            this.header.classList.toggle(bd.headerTransparent, t);
          }
          if (this.header.classList.contains(bd.headerHovered)) {
            const t = this.hasScrolled ? window.stickyHeaderHeight : e;
            this.background.style.setProperty(
              "--header-background-height",
              `${t}px`
            );
            const i = this.header.querySelector(`.${bd.isVisible}${ud}`);
            i && i.dispatchEvent(new Event("mouseenter", { bubbles: !0 }));
          }
        }
        handleBackgroundEvents() {
          this.headerWrapper.addEventListener(
            "mouseenter",
            this.updateBackgroundHeightEvent
          ),
            this.headerWrapper.addEventListener(
              "mouseleave",
              this.updateBackgroundHeightEvent
            ),
            this.header.addEventListener(
              "focusout",
              this.updateBackgroundHeightEvent
            ),
            document.addEventListener(
              "theme:cart:close",
              this.updateBackgroundHeightEvent
            ),
            document.addEventListener(
              "theme:search:close",
              this.updateBackgroundHeightEvent
            );
        }
        updateBackgroundHeight(t) {
          const e = matchMedia("(pointer:fine)").matches,
            i = !document.body.classList.contains(bd.noOutline),
            s = e && !i;
          if (!t) return;
          let o = bd.jsDrawerOpenAll.some((t) =>
            document.body.classList.contains(t)
          );
          ("mouseenter" === t.type || o) &&
            ((this.headerHeight = this.hasScrolled
              ? window.stickyHeaderHeight
              : this.header.offsetHeight),
            this.header.classList.add(bd.headerHovered),
            this.header.classList.contains(bd.headerMenuOpened) ||
              this.background.style.setProperty(
                "--header-background-height",
                `${this.headerHeight}px`
              )),
            "mouseenter" !== t.type &&
              requestAnimationFrame(() => {
                if (
                  ((o = bd.jsDrawerOpenAll.some((t) =>
                    document.body.classList.contains(t)
                  )),
                  o)
                )
                  return;
                if ("focusout" === t.type && !e) return;
                if ("theme:search:close" === t.type && !s) return;
                if (this.hasScrolled) return;
                const n = null === document.activeElement.closest(Zh),
                  r = document.body.classList.contains(bd.searchOpened),
                  a = this.header.classList.contains(bd.headerMenuOpened);
                r ||
                  a ||
                  (("focusout" !== t.type || n) &&
                    (this.header.classList.remove(bd.headerHovered),
                    this.background.style.setProperty(
                      "--header-background-height",
                      "0px"
                    ),
                    i || document.activeElement.blur()));
              });
        }
        listenWidth() {
          document.addEventListener("theme:resize", this.checkWidthEvent),
            this.checkWidth();
        }
        checkWidth() {
          window.innerWidth < this.minWidth
            ? (this.nav.classList.add(bd.navCompress),
              this.logo.classList.add(bd.logoCompress))
            : (this.nav.classList.remove(bd.navCompress),
              this.logo.classList.remove(bd.logoCompress));
        }
        getMinWidth() {
          const t =
              this.headerWrapper.currentStyle ||
              window.getComputedStyle(this.headerWrapper),
            e = 2 * parseInt(t.paddingLeft),
            i = this.header.cloneNode(!0);
          i.classList.add(bd.cloneClass), document.body.appendChild(i);
          const s = i.querySelectorAll(fd),
            o = (function (t, e) {
              let i = [];
              t.forEach((t) => {
                i.push(t.clientWidth);
              });
              let [s, o, n] = i;
              if ("left" === e) {
                const t = s;
                (s = o), (o = t);
              }
              return "right" !== e && (s > n ? (n = s) : (s = n)), s + o + n;
            })(s, this.header.getAttribute(wd));
          return document.body.removeChild(i), o + 20 * s.length + e;
        }
        initMobileNav() {
          var t;
          if (
            ((this.mobileMenu = this.headerSection.querySelector(cd)),
            (this.navDrawer = this.headerSection.querySelector(nd)),
            (this.drawerToggle = this.navDrawer.querySelector(ad)),
            (this.navSearchOpen = this.navDrawer.querySelectorAll(md)),
            null === (t = this.navSearchOpen) ||
              void 0 === t ||
              t.forEach((t) => {
                t.addEventListener("click", (t) => {
                  t.preventDefault();
                  const e = this.drawerToggle.closest(`${rd}.${bd.isOpen}`),
                    i = matchMedia("(pointer:coarse)").matches
                      ? this.mobileMenu.querySelector(ld)
                      : this.nav.querySelector(ld);
                  this.drawerToggle.dispatchEvent(
                    new Event("click", { bubbles: !0 })
                  );
                  const s = (t) => {
                    t.target === e &&
                      (requestAnimationFrame(() =>
                        i.dispatchEvent(new Event("click", { bubbles: !0 }))
                      ),
                      e.removeEventListener("transitionend", s));
                  };
                  e.addEventListener("transitionend", s);
                });
              }),
            "link" === theme.settings.mobileMenuBehaviour)
          )
            return;
          const e = this.headerSection.querySelectorAll(pd);
          e.length &&
            e.forEach((t) => {
              t.addEventListener("click", (e) => {
                const i = t.parentNode.querySelectorAll(od).length,
                  s = t.nextElementSibling;
                i &&
                  (e.preventDefault(),
                  s.dispatchEvent(new Event("click"), { bubbles: !0 }));
              });
            });
        }
        onUnload() {
          document.documentElement.style.removeProperty("--header-height"),
            document.documentElement.style.removeProperty(
              "--header-sticky-height"
            ),
            this.initStickyHeader(),
            document.body.classList.remove(...bd.jsDrawerOpenAll),
            document.removeEventListener("theme:scroll", this.headerStateEvent),
            document.removeEventListener("theme:resize", this.checkWidthEvent),
            document.removeEventListener(
              "theme:cart:close",
              this.updateBackgroundHeightEvent
            ),
            document.removeEventListener(
              "theme:search:close",
              this.updateBackgroundHeightEvent
            ),
            document.body.removeEventListener(
              "touchstart",
              this.handleTouchstartEvent
            ),
            document.dispatchEvent(
              new CustomEvent("theme:scroll:unlock", { bubbles: !0 })
            ),
            "function" == typeof window.cart.unload && window.cart.unload();
        }
        constructor(t) {
          (this.container = t),
            (this.background = document.querySelector(vd)),
            (this.header = t),
            (this.headerSection = t.parentNode),
            (this.headerWrapper = t.querySelector(gd)),
            (this.logo = t.querySelector(id)),
            (this.logoTextLink = t.querySelector(sd)),
            (this.nav = t.querySelector(hd)),
            (this.navIcons = t.querySelector(dd)),
            (this.headerStateEvent = (t) => this.headerState(t)),
            (this.handleTouchstartEvent = (t) => this.handleTouchstart(t)),
            (this.updateBackgroundHeightEvent = (t) =>
              this.updateBackgroundHeight(t)),
            m(),
            (this.minWidth = this.getMinWidth()),
            (this.checkWidthEvent = () => this.checkWidth()),
            this.listenWidth(),
            this.initMobileNav(),
            this.handleTextLinkLogos(),
            this.initStickyHeader(),
            this.handleBackgroundEvents(),
            document.querySelector(yd) || (window.cart = new dc()),
            document.body.addEventListener(
              "touchstart",
              this.handleTouchstartEvent,
              { passive: !0 }
            ),
            this.updateHeaderHover();
        }
      })(this.container);
    },
    onUnload() {
      Ed[this.id].onUnload();
    },
  };
  yt("header", [Sd, Yh, pn]);
  const Ld = "[data-collapsible-trigger]",
    kd = "is-expanded";
  yt("accordions", [
    {
      onBlockSelect(t) {
        const e = t.target.querySelector(Ld);
        requestAnimationFrame(() => {
          e.classList.contains(kd) || e.dispatchEvent(new Event("click"));
        });
      },
    },
    Ot,
  ]);
  const Ad = "[data-share-button]",
    qd = "[data-share-button-tooltip]",
    Cd = "is-visible",
    Td = "is-hiding",
    Pd = {};
  const Fd = {
    onLoad() {
      Pd[this.id] = new (class {
        init() {
          this.button &&
            this.button.addEventListener("click", () => {
              let t = window.location.href;
              this.button.dataset.shareLink &&
                (t = this.button.dataset.shareLink),
                this.tooltip.classList.contains(Cd) ||
                  navigator.clipboard.writeText(t).then(() => {
                    this.tooltip.classList.add(Cd),
                      setTimeout(() => {
                        this.tooltip.classList.add(Td),
                          this.tooltip.classList.remove(Cd),
                          this.hideTransitionTimeout &&
                            clearTimeout(this.hideTransitionTimeout),
                          (this.hideTransitionTimeout = setTimeout(() => {
                            this.tooltip.classList.remove(Td);
                          }, this.transitionSpeed));
                      }, 1500);
                  });
            });
        }
        constructor(t) {
          (this.container = t),
            (this.button = this.container.querySelector(Ad)),
            (this.tooltip = this.container.querySelector(qd)),
            (this.transitionSpeed = 200),
            (this.hideTransitionTimeout = 0),
            this.init();
        }
      })(this.container);
    },
  };
  yt("article", [Fd]);
  const Id = "[data-video-play]",
    xd = "data-video-play";
  const Hd = {
      onLoad() {
        new (class {
          init() {
            this.videoPlay.length &&
              this.videoPlay.forEach((t) => {
                t.addEventListener("click", (e) => {
                  if (t.hasAttribute(xd) && "" !== t.getAttribute(xd).trim()) {
                    e.preventDefault();
                    const i = [{ html: t.getAttribute(xd) }];
                    (this.a11y.state.trigger = t), new ul(i);
                  }
                });
              });
          }
          constructor(t) {
            (this.container = t),
              (this.videoPlay = this.container.querySelectorAll(Id)),
              (this.a11y = Ut),
              this.init();
          }
        })(this.container);
      },
    },
    Dd = "[data-site-header]",
    Md = "[data-main]";
  let Od = {};
  const Bd = {
    onLoad() {
      Od[this.id] = new (class {
        init() {
          var t;
          if ("true" !== this.container.dataset.zoomAnimation) return;
          const e = this.container,
            i = document.body.querySelector(Md).children[0],
            s = this.container.parentNode === i,
            o =
              "true" ==
              (null === (t = this.header) || void 0 === t
                ? void 0
                : t.dataset.transparent),
            n = () => {
              var t, i;
              const n =
                  s & o
                    ? 0
                    : parseInt(
                        (null === (t = this.header) || void 0 === t
                          ? void 0
                          : t.dataset.height) ||
                          (null === (i = this.header) || void 0 === i
                            ? void 0
                            : i.offsetHeight)
                      ),
                r = e.getBoundingClientRect(),
                a = e.offsetHeight,
                l = s ? n - r.top : n - r.top + window.innerHeight;
              let c = 0.1;
              s && (c *= 1.5);
              let h = 1 + (l / a) * c;
              (h = h > 1 ? h : 1), e.style.setProperty("--scale", h);
            };
          n(),
            (this.zoomOnScrollEvent = Lt(n, 5)),
            new IntersectionObserver(
              (t) => {
                t[0].isIntersecting
                  ? window.addEventListener("scroll", this.zoomOnScrollEvent)
                  : window.removeEventListener(
                      "scroll",
                      this.zoomOnScrollEvent
                    );
              },
              { root: null, rootMargin: "0px", threshold: 0 }
            ).observe(e);
        }
        onUnload() {
          null !== this.zoomOnScrollEvent &&
            window.removeEventListener("scroll", this.zoomOnScrollEvent);
        }
        constructor(t) {
          (this.container = t),
            (this.header = document.querySelector(Dd)),
            this.init();
        }
      })(this.container);
    },
    onUnload() {
      Od[this.id].onUnload();
    },
  };
  function _d() {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }
  function $d() {
    return _d() >= window.theme.sizes.small;
  }
  function zd() {
    return _d() < window.theme.sizes.small;
  }
  yt("banner-image", [Bd, Hd]);
  const Rd = "[data-scroll-spy]",
    Vd = "is-selected",
    Wd = "is-full-height",
    Nd = "data-scroll-spy",
    Ud = "data-scroll-spy-prevent",
    jd = "data-scroll-spy-mobile",
    Kd = "data-scroll-spy-desktop",
    Qd = {};
  const Gd = {
      onLoad() {
        Qd[this.id] = [];
        this.container.querySelectorAll(Rd).forEach((t) => {
          const e = this.container.querySelector(t.getAttribute(Nd));
          Qd[this.id].push(
            new (class {
              init() {
                this.onScroll(),
                  document.addEventListener(
                    "theme:scroll",
                    this.scrollCallback
                  ),
                  document.addEventListener(
                    "theme:resize:width",
                    this.scrollCallback
                  );
              }
              isEligible() {
                return (
                  !this.container.hasAttribute(Ud) &&
                  ((zd() && this.anchor.hasAttribute(jd)) ||
                    ($d() && this.anchor.hasAttribute(Kd)) ||
                    (!this.anchor.hasAttribute(Kd) &&
                      !this.anchor.hasAttribute(jd)))
                );
              }
              onScroll() {
                if (!this.isEligible()) return;
                (this.top = this.element.getBoundingClientRect().top),
                  (this.bottom = this.element.getBoundingClientRect().bottom);
                const t = Math.round(window.innerHeight),
                  e = Math.round(window.scrollY),
                  i = e + t,
                  s = Math.round(this.top + e),
                  o = this.element.offsetHeight;
                if (!(s < i) || s + o < e) return;
                this.anchor.parentNode.offsetHeight <= o
                  ? this.container.style.setProperty(
                      "--sticky-position",
                      window.innerHeight / 2 - o / 2 + "px"
                    )
                  : this.container.classList.add(Wd),
                  (this.anchorTop = this.anchor.getBoundingClientRect().top),
                  (this.anchorBottom =
                    this.anchor.getBoundingClientRect().bottom);
                const n = this.top < this.anchorTop,
                  r = this.bottom < this.anchorBottom;
                n &&
                  !r &&
                  (this.anchors.forEach((t) => {
                    t.matches(this.anchorSelector) || t.classList.remove(Vd);
                  }),
                  this.anchor.classList.add(Vd));
              }
              onUnload() {
                document.removeEventListener(
                  "theme:scroll",
                  this.scrollCallback
                ),
                  document.removeEventListener(
                    "theme:resize:width",
                    this.scrollCallback
                  );
              }
              constructor(t, e) {
                (this.container = t),
                  (this.element = e),
                  this.element &&
                    ((this.anchorSelector = `[${Nd}="#${this.element.id}"]`),
                    (this.anchor = this.container.querySelector(
                      this.anchorSelector
                    )),
                    (this.anchors = this.container.querySelectorAll(`[${Nd}]`)),
                    this.anchor &&
                      ((this.scrollCallback = () => this.onScroll()),
                      this.init()));
              }
            })(this.container, e)
          );
        });
      },
      onUnload() {
        Qd[this.id].forEach((t) => {
          "function" == typeof t.onUnload && t.onUnload();
        });
      },
    },
    Xd = "[data-banner]",
    Jd = "[data-slider-content]",
    Yd = "[data-slider-media]",
    Zd = "a, button",
    tu = "data-index",
    eu = "tabindex",
    iu = "data-slider-single-image",
    su = "data-scroll-spy-prevent",
    ou = "is-selected",
    nu = "row",
    ru = "columns";
  let au = {};
  yt("banner-with-text-columns", [
    {
      onLoad() {
        au[this.id] = new (class {
          listen() {
            document.addEventListener(
              "theme:resize:width",
              this.onResizeCallback
            ),
              this.links.forEach((t) => {
                t.addEventListener("focus", () => {
                  const e = Number(t.closest(Xd).getAttribute(tu));
                  window.innerWidth >= theme.sizes.small && this.sync(e);
                });
              }),
              this.banners.forEach((t) => {
                t.addEventListener("mouseenter", () => {
                  const e = Number(t.getAttribute(tu));
                  window.innerWidth >= theme.sizes.small &&
                    !window.theme.touch &&
                    this.sync(e);
                }),
                  t.addEventListener("pointerup", () => {
                    const e = Number(t.getAttribute(tu));
                    window.innerWidth >= theme.sizes.small &&
                      window.theme.touch &&
                      this.sync(e);
                  });
              });
          }
          handleColumnsLayout() {
            if (this.sliderContent.children.length <= 1) return;
            let t = window.innerWidth < window.theme.sizes.small;
            this.sliderMedia.children.length > 1 &&
              ((this.flktyMedia = new i(this.sliderMedia, {
                draggable: !1,
                wrapAround: !1,
                fade: !0,
                prevNextButtons: !1,
                adaptiveHeight: !1,
                pageDots: !1,
                setGallerySize: !1,
                on: {
                  change: (t) => {
                    this.handleGroupItemsNavigation(t, this.flktyContent);
                  },
                },
              })),
              ge(this.sliderMedia)),
              (this.flktyContent = new i(this.sliderContent, {
                draggable: t,
                prevNextButtons: !1,
                pageDots: !0,
                cellAlign: "left",
                adaptiveHeight: !1,
                imagesLoaded: !0,
                on: {
                  ready: () => {
                    this.listen(), this.slidesTabIndex();
                  },
                  change: (t) => {
                    window.innerWidth < theme.sizes.small &&
                      !this.singleImageEnabled &&
                      this.flktyMedia.select(t),
                      this.slidesTabIndex(),
                      this.handleGroupItemsNavigation(t, this.flktyMedia);
                  },
                },
              })),
              ge(this.sliderContent);
          }
          handleRowLayout() {
            if (this.sliderMedia.children.length <= 1 || zd())
              return this.updateState(0), void this.listen();
            this.initMediaSlider();
          }
          initMediaSlider() {
            (this.flktyMedia = new i(this.sliderMedia, {
              draggable: !0,
              wrapAround: !1,
              fade: !0,
              prevNextButtons: !1,
              adaptiveHeight: !1,
              pageDots: !1,
              setGallerySize: !1,
              on: {
                ready: () => {
                  this.updateState(0), this.listen();
                },
                change: (t) => {
                  this.updateState(t);
                },
              },
            })),
              ge(this.sliderMedia);
          }
          handleGroupItemsNavigation(t, e = null) {
            null !== e &&
              requestAnimationFrame(() => {
                t !== e.selectedIndex && e.select(t);
              });
          }
          slidesTabIndex() {
            this.sliderContent &&
              i.data(this.sliderContent).cells.forEach((t) => {
                let e = "-1";
                t.element.classList.contains(ou) && (e = "0"),
                  t.element.querySelectorAll(Zd).forEach((t) => {
                    t.setAttribute(eu, e);
                  });
              });
          }
          sync(t = 0) {
            this.appearance === ru
              ? this.flktyContent.selectCell(t)
              : this.updateState(t),
              this.flktyMedia && this.flktyMedia.selectCell(t);
          }
          updateState(t = 0) {
            this.banners.forEach((e) => {
              const i = Number(e.getAttribute(tu));
              e.classList.toggle(ou, i === t);
            });
          }
          handleSlidersOnResize() {
            if (this.appearance === nu) {
              if (zd() && this.flktyMedia)
                return this.flktyMedia.destroy(), void (this.flktyMedia = null);
              if ($d() && !this.flktyMedia) return void this.initMediaSlider();
            }
            this.flktyContent &&
              (this.flktyContent.resize(), this.toggleDraggable()),
              this.flktyMedia && this.flktyMedia.resize();
          }
          toggleDraggable() {
            (this.flktyContent.options.draggable =
              window.innerWidth < window.theme.sizes.small),
              this.flktyContent.updateDraggable();
          }
          onBlockSelect(t) {
            const e = parseInt(
              [...t.target.parentNode.children].indexOf(t.target)
            );
            if ((this.sync(e), this.appearance === nu)) {
              const t = this.sliderMedia.children[e],
                i = Math.round(t.getBoundingClientRect().top);
              this.container.setAttribute(su, ""),
                setTimeout(() => vn(i), 400),
                setTimeout(() => this.container.removeAttribute(su), 1e3);
            }
          }
          onUnload() {
            document.removeEventListener(
              "theme:resize:width",
              this.onResizeCallback
            );
          }
          constructor(t) {
            var e;
            (this.container = t.container),
              (this.sliderContent = this.container.querySelector(Jd)),
              (this.singleImageEnabled =
                null === (e = this.sliderContent) || void 0 === e
                  ? void 0
                  : e.hasAttribute(iu)),
              (this.banners = this.container.querySelectorAll(Xd)),
              (this.links = this.container.querySelectorAll("a")),
              (this.sliderMedia = this.container.querySelector(Yd)),
              (this.flktyContent = null),
              (this.flktyMedia = null),
              (this.onResizeCallback = () => this.handleSlidersOnResize()),
              (this.appearance = this.container.dataset.appearance),
              this.appearance === ru
                ? this.handleColumnsLayout()
                : this.handleRowLayout();
          }
        })(this);
      },
      onBlockSelect(t) {
        au[this.id].onBlockSelect(t);
      },
    },
    Gd,
  ]),
    yt("blog-posts", bs);
  const lu = "[data-slider]",
    cu = "[data-slider-item]",
    hu = "[data-media-container]",
    du = "a, button",
    uu = ".flickity-button",
    pu = "carousel--inactive",
    mu = "carousel--resize",
    gu = "tabindex",
    vu = {};
  const yu = {
    onLoad() {
      vu[this.id] = new (class {
        initSlider() {
          this.slider.classList.remove(pu),
            (this.flkty = new i(this.slider, {
              pageDots: !1,
              cellAlign: "left",
              groupCells: !0,
              contain: !0,
              on: {
                ready: () => {
                  this.setSliderArrowsPosition(this.slider),
                    setTimeout(() => {
                      this.changeTabIndex(), this.flkty.resize();
                    }, 0);
                },
                change: () => {
                  this.changeTabIndex();
                },
              },
            })),
            (i.prototype._createResizeClass = function () {
              this.element.classList.add(mu);
            }),
            i.createMethods.push("_createResizeClass");
          const t = i.prototype.resize;
          i.prototype.resize = function () {
            this.element.classList.remove(mu),
              t.call(this),
              this.element.classList.add(mu);
          };
        }
        destroySlider() {
          this.slider.classList.add(pu),
            null !== this.flkty && (this.flkty.destroy(), (this.flkty = null));
        }
        checkSlidesSize() {
          const t =
            this.container.querySelector(cu).currentStyle ||
            window.getComputedStyle(this.container.querySelector(cu));
          this.gutter = parseInt(t.marginRight);
          const e = this.slider.offsetWidth < this.getItemsWidth();
          window.innerWidth >= theme.sizes.small && e
            ? this.initSlider()
            : this.destroySlider();
        }
        changeTabIndex() {
          const t = this.flkty.selectedIndex;
          this.flkty.slides.forEach((e, i) => {
            e.cells.forEach((e) => {
              e.element.querySelectorAll(du).forEach((e) => {
                e.setAttribute(gu, t === i ? "0" : "-1");
              });
            });
          });
        }
        getItemsWidth() {
          let t = 0;
          const e = this.slider.querySelectorAll(cu);
          return (
            e.length &&
              e.forEach((e) => {
                t += e.offsetWidth + this.gutter;
              }),
            t
          );
        }
        listen() {
          this.slider &&
            (this.checkSlidesSize(),
            document.addEventListener(
              "theme:resize:width",
              this.checkSlidesSizeOnResize
            ));
        }
        setSliderArrowsPosition(t) {
          const e = t.querySelectorAll(uu),
            i = t.querySelector(hu);
          e.length &&
            i &&
            e.forEach((t) => {
              t.style.top = i.offsetHeight / 2 + "px";
            });
        }
        onBlockSelect(t) {
          if (null !== this.flkty) {
            const e = parseInt(
                [...t.target.parentNode.children].indexOf(t.target)
              ),
              i = parseInt(this.flkty.slides[0].cells.length),
              s = Math.floor(e / i);
            this.flkty.select(s);
          } else {
            const e =
                this.slider.currentStyle ||
                window.getComputedStyle(this.slider),
              i = parseInt(e.paddingLeft),
              s = t.target.offsetLeft - i;
            this.slider.scrollTo({ top: 0, left: s, behavior: "smooth" });
          }
        }
        onUnload() {
          document.removeEventListener(
            "theme:resize:width",
            this.checkSlidesSizeOnResize
          );
        }
        constructor(t) {
          (this.container = t.container),
            (this.slider = this.container.querySelector(lu)),
            (this.flkty = null),
            (this.gutter = 0),
            (this.checkSlidesSizeOnResize = () => this.checkSlidesSize()),
            this.listen();
        }
      })(this);
    },
    onUnload(t) {
      vu[this.id].onUnload(t);
    },
    onBlockSelect(t) {
      vu[this.id].onBlockSelect(t);
    },
  };
  yt("columns-with-image", [yu, Hd]);
  const fu = "[data-form-message-close]",
    bu = "[data-form-message]",
    wu = "hide-down",
    Eu = "notification-visible";
  let Su = {};
  yt("contact-form", {
    onLoad() {
      Su[this.id] = new (class {
        hidePopups() {
          document.body.classList.add(Eu);
        }
        showPopups() {
          document.body.classList.remove(Eu);
        }
        closeFormMessage() {
          this.closeButton.addEventListener(
            "click",
            this.closeMessage.bind(this)
          );
        }
        closeMessage(t) {
          t.preventDefault(),
            this.messageWrapper.classList.add(wu),
            this.showPopups();
        }
        autoHideMessage() {
          setTimeout(() => {
            this.messageWrapper.classList.add(wu), this.showPopups();
          }, 1e4);
        }
        constructor(t) {
          (this.container = t.container),
            (this.closeButton = this.container.querySelector(fu)),
            (this.messageWrapper = this.container.querySelector(bu)),
            this.messageWrapper &&
              (this.hidePopups(),
              this.closeFormMessage(),
              this.autoHideMessage());
        }
      })(this);
    },
  });
  const Lu = "time",
    ku = "[data-days]",
    Au = "[data-hours]",
    qu = "[data-minutes]",
    Cu = "[data-seconds]",
    Tu = "[data-section-type]",
    Pu = ".shopify-section",
    Fu = "countdown--loading",
    Iu = "countdown--loaded",
    xu = "countdown-timer--show-message",
    Hu = "hide-countdown",
    Du = "data-expiration-behavior",
    Mu = "hide",
    Ou = "show-message";
  let Bu = class extends HTMLElement {
    connectedCallback() {
      this.init();
    }
    disconnectedCallback() {
      this.stopTimer();
    }
    init() {
      isNaN(this.endDate) || this.endDate <= Date.now()
        ? this.onComplete()
        : (this.onLoad(!0), (this.interval = setInterval(this.update, 1e3)));
    }
    stopTimer() {
      clearInterval(this.interval);
    }
    convertTime(t) {
      const e = parseInt(t / this.daysInMs, 10);
      t -= e * this.daysInMs;
      const i = parseInt(t / this.hoursInMs, 10);
      t -= i * this.hoursInMs;
      const s = parseInt(t / this.minutesInMs, 10);
      t -= s * this.minutesInMs;
      return {
        days: e,
        hours: i,
        minutes: s,
        seconds: parseInt(t / this.secondsInMs, 10),
      };
    }
    render(t) {
      (this.days.textContent = t.days),
        (this.hours.textContent = t.hours),
        (this.minutes.textContent = t.minutes),
        (this.seconds.textContent = t.seconds);
    }
    onComplete() {
      this.render({ days: 0, hours: 0, minutes: 0, seconds: 0 }),
        this.shouldHideOnComplete && this.shopifySection.classList.add(Hu),
        this.shouldShowMessage && this.classList.add(xu);
    }
    onLoad(t) {
      t
        ? this.section.classList.add(Fu)
        : (this.section.classList.add(Iu), (this.isLoading = !1));
    }
    update() {
      const t = Date.now(),
        e = this.endDate - t;
      if (e <= 0) return this.stopTimer(), void this.onComplete();
      const i = this.convertTime(e);
      this.render(i), this.isLoading && this.onLoad(!1);
    }
    constructor() {
      super(),
        (this.section = this.closest(Tu)),
        (this.shopifySection = this.closest(Pu)),
        (this.expirationBehavior = this.getAttribute(Du)),
        (this.time = this.querySelector(Lu)),
        (this.endDate = Date.parse(this.time.dateTime)),
        (this.days = this.querySelector(ku)),
        (this.hours = this.querySelector(Au)),
        (this.minutes = this.querySelector(qu)),
        (this.seconds = this.querySelector(Cu)),
        (this.daysInMs = 864e5),
        (this.hoursInMs = this.daysInMs / 24),
        (this.minutesInMs = this.hoursInMs / 60),
        (this.secondsInMs = this.minutesInMs / 60),
        (this.isLoading = !0),
        (this.shouldHideOnComplete = this.expirationBehavior === Mu),
        (this.shouldShowMessage = this.expirationBehavior === Ou),
        (this.update = this.update.bind(this));
    }
  };
  yt("countdown", [Bd, Hd]),
    customElements.get("countdown-timer") ||
      customElements.define("countdown-timer", Bu);
  const _u = "[data-video-id]",
    $u = "[data-video-player]",
    zu = "[data-video-template]",
    Ru = "[data-video-autoplay]",
    Vu = "[data-video-wrapper]",
    Wu = "[data-video-bg-play]",
    Nu = "is-loading",
    Uu = "is-paused",
    ju = {};
  const Ku = {
    onLoad() {
      ju[this.id] = [];
      this.container.querySelectorAll(Vu).forEach((t) => {
        ju[this.id].push(
          new (class {
            init() {
              this.videoId &&
                (new IntersectionObserver(
                  (t, e) => {
                    t.forEach((t) => {
                      if (t.isIntersecting) {
                        const i = this.videoTemplate.innerHTML;
                        (this.videoPlayer.innerHTML = i),
                          (this.video = this.container.querySelector(Ru)),
                          this.videoPlayer.classList.remove(Nu),
                          this.container.classList.add(Uu),
                          this.listen(),
                          e.unobserve(t.target);
                      }
                    });
                  },
                  {
                    root: null,
                    rootMargin: "300px",
                    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
                  }
                ).observe(this.videoPlayer),
                this.videoPlayButton.addEventListener("click", (t) => {
                  var e;
                  t.preventDefault(),
                    null === (e = this.video) || void 0 === e || e.play();
                }));
            }
            listen() {
              this.video.addEventListener("play", () => {
                this.container.classList.remove(Uu);
              }),
                this.container.addEventListener(
                  "touchstart",
                  () => {
                    this.video.play();
                  },
                  { passive: !0 }
                );
            }
            constructor(t) {
              (this.container = t),
                (this.videoId = this.container.querySelector(_u)),
                (this.videoPlayer = this.container.querySelector($u)),
                (this.videoTemplate = this.container.querySelector(zu)),
                (this.videoPlayButton = this.container.querySelector(Wu)),
                this.init();
            }
          })(t)
        );
      });
    },
  };
  let Qu = class {
    write() {
      ((-1 !== document.cookie.indexOf("; ") &&
        !document.cookie.split("; ").find((t) => t.startsWith(this.name))) ||
        -1 === document.cookie.indexOf("; ")) &&
        (document.cookie = `${this.name}=${this.value}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}; sameSite=${this.configuration.sameSite}; secure=${this.configuration.secure}`);
    }
    read() {
      if (
        -1 !== document.cookie.indexOf("; ") &&
        document.cookie.split("; ").find((t) => t.startsWith(this.name))
      ) {
        return document.cookie
          .split("; ")
          .find((t) => t.startsWith(this.name))
          .split("=")[1];
      }
      return !1;
    }
    destroy() {
      document.cookie.split("; ").find((t) => t.startsWith(this.name)) &&
        (document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}; sameSite=${this.configuration.sameSite}; secure=${this.configuration.secure}`);
    }
    constructor(t, e) {
      (this.configuration = {
        expires: null,
        path: "/",
        domain: window.location.hostname,
        sameSite: "none",
        secure: !0,
      }),
        (this.name = t),
        (this.value = e);
    }
  };
  const Gu = "[data-newsletter-form]",
    Xu = "[data-popup]",
    Ju = "has-success",
    Yu = "has-error",
    Zu = "newsletter_form_id",
    tp = {};
  const ep = {
      onLoad() {
        tp[this.id] = [];
        this.container.querySelectorAll(Gu).forEach((t) => {
          tp[this.id].push(
            new (class {
              init() {
                this.newsletter.addEventListener(
                  "submit",
                  this.newsletterSubmit
                ),
                  this.showMessage();
              }
              newsletterSubmitEvent(t) {
                this.stopSubmit &&
                  (t.preventDefault(),
                  this.removeStorage(),
                  this.writeStorage(),
                  (this.stopSubmit = !1),
                  this.newsletter.submit());
              }
              checkForChallengePage() {
                this.isChallengePage =
                  window.location.pathname === theme.routes.root + "challenge";
              }
              writeStorage() {
                void 0 !== this.sessionStorage &&
                  this.sessionStorage.setItem(Zu, this.newsletter.id);
              }
              readStorage() {
                this.formID = this.sessionStorage.getItem(Zu);
              }
              removeStorage() {
                this.sessionStorage.removeItem(Zu);
              }
              showMessage() {
                if ((this.readStorage(), this.newsletter.id === this.formID)) {
                  const t = document.getElementById(this.formID),
                    e =
                      -1 !==
                      window.location.search.indexOf("?customer_posted=true"),
                    i =
                      -1 !==
                      window.location.search.indexOf("accepts_marketing");
                  e
                    ? (t.classList.remove(Yu),
                      t.classList.add(Ju),
                      this.popup &&
                        ((this.cookie = new Qu(
                          this.popup.dataset.cookieName,
                          "user_has_closed"
                        )),
                        this.cookie.write()))
                    : i && (t.classList.remove(Ju), t.classList.add(Yu)),
                    (e || i) && this.scrollToForm(t);
                }
              }
              scrollToForm(t) {
                const e = t.getBoundingClientRect();
                visibilityHelper.isElementPartiallyVisible(t) ||
                  visibilityHelper.isElementTotallyVisible(t) ||
                  setTimeout(() => {
                    window.scrollTo({
                      top: e.top,
                      left: 0,
                      behavior: "smooth",
                    });
                  }, 400);
              }
              onUnload() {
                this.newsletter.removeEventListener(
                  "submit",
                  this.newsletterSubmit
                );
              }
              constructor(t) {
                (this.newsletter = t),
                  (this.sessionStorage = window.sessionStorage),
                  (this.popup = this.newsletter.closest(Xu)),
                  (this.stopSubmit = !0),
                  (this.isChallengePage = !1),
                  (this.formID = null),
                  (this.formIdSuccess = null),
                  this.checkForChallengePage(),
                  (this.newsletterSubmit = (t) =>
                    this.newsletterSubmitEvent(t)),
                  this.isChallengePage || this.init();
              }
            })(t)
          );
        });
      },
      onUnload() {
        tp[this.id].forEach((t) => {
          "function" == typeof t.onUnload && t.onUnload();
        });
      },
    },
    ip = "[data-product]",
    sp = "[data-slider]",
    op = "[data-slide]",
    np = "[data-product-media-container]",
    rp = ".flickity-button",
    ap = "a, button",
    lp = "tabindex",
    cp = {};
  const hp = {
    onLoad() {
      cp[this.id] = new (class {
        checkSlider() {
          window.innerWidth >= theme.sizes.small
            ? this.productSlider.forEach((t) => {
                this.initProductSlider(t);
              })
            : this.productSlider.forEach((t) => {
                this.destroyProductSlider(t);
              });
        }
        initProductSlider(t) {
          const e = t.querySelectorAll(op).length,
            s = t.dataset.slider;
          e > 1 &&
            (void 0 !== this.flkty[s] && this.flkty[s].isActive
              ? this.setSliderArrowsPosition(t)
              : (this.flkty[s] = new i(t, {
                  prevNextButtons: !0,
                  adaptiveHeight: !0,
                  pageDots: !0,
                  wrapAround: !0,
                  on: {
                    ready: () => {
                      this.setSliderArrowsPosition(t);
                    },
                    change: (t) => {
                      this.flkty[s].cells.forEach((e, i) => {
                        e.element.querySelectorAll(ap).forEach((e) => {
                          e.setAttribute(lp, i === t ? "0" : "-1");
                        });
                      });
                    },
                  },
                })));
        }
        destroyProductSlider(t) {
          const e = t.dataset.slider;
          "object" == typeof this.flkty[e] && this.flkty[e].destroy();
        }
        setSliderArrowsPosition(t) {
          const e = t.querySelectorAll(rp),
            i = t.querySelector(np);
          e.length &&
            i &&
            e.forEach((t) => {
              t.style.top = i.offsetHeight / 2 + "px";
            });
        }
        resizeSlider(t) {
          const e = t.target,
            s = i.data(e) || null;
          s && s.resize();
        }
        listen() {
          this.checkSlider(),
            document.addEventListener(
              "theme:resize:width",
              this.checkSliderOnResize
            ),
            this.productSlider.forEach((t) => {
              t.addEventListener("theme:slider:resize", this.resizeSliderEvent);
            });
        }
        onUnload() {
          if (this.flkty)
            for (const t in this.flkty)
              this.flkty.hasOwnProperty(t) && this.flkty[t].destroy();
          document.removeEventListener(
            "theme:resize:width",
            this.checkSliderOnResize
          ),
            this.productSlider.forEach((t) => {
              t.removeEventListener(
                "theme:slider:resize",
                this.resizeSliderEvent
              );
            });
        }
        constructor(t) {
          (this.container = t),
            (this.product = this.container.querySelectorAll(ip)),
            (this.productSlider = this.container.querySelectorAll(sp)),
            (this.checkSliderOnResize = () => this.checkSlider()),
            (this.resizeSliderEvent = (t) => this.resizeSlider(t)),
            (this.flkty = []),
            (this.videoObj = []),
            (this.quickViewObj = []),
            this.listen();
        }
      })(this.container);
    },
    onUnload(t) {
      cp[this.id].onUnload(t);
    },
  };
  yt("custom-content", [hp, ep, Hd, Ku, us]);
  const dp = "[data-slider]",
    up = "[data-slide]",
    pp = "[data-product-media-container]",
    mp = "a, button",
    gp = ".flickity-button",
    vp = "[data-promo]",
    yp = "carousel",
    fp = "carousel--inactive",
    bp = "is-last-slide-visible",
    wp = "featured-collection",
    Ep = "collection-promo--full",
    Sp = "collection-promo--two-columns",
    Lp = "data-slider-id",
    kp = "data-slider-show-image",
    Ap = "tabindex",
    qp = {};
  let Cp = class {
    initSlider(t) {
      const e = t.getAttribute(Lp);
      t.classList.remove(fp),
        void 0 !== this.flkty[e] && this.flkty[e].isActive
          ? this.setSliderArrowsPosition(t)
          : ((this.flkty[e] = new i(t, {
              pageDots: !1,
              cellSelector: up,
              cellAlign: "left",
              groupCells: !0,
              contain: !0,
              wrapAround: !1,
              adaptiveHeight: !1,
              on: {
                ready: () => {
                  this.setSliderArrowsPosition(t),
                    setTimeout(() => {
                      this.changeTabIndex(t);
                    }, 0);
                },
                change: () => {
                  this.changeTabIndex(t);
                },
              },
            })),
            this.handleLastSlideOverlayOnTablet(t));
    }
    destroySlider(t) {
      const e = t.getAttribute(Lp);
      t.classList.contains(yp) && t.classList.add(fp),
        "object" == typeof this.flkty[e] && this.flkty[e].destroy();
    }
    resetSlider(t) {
      const e = t.target,
        i = e.getAttribute(Lp);
      "object" == typeof this.flkty[i]
        ? this.flkty[i].select(0, !1, !0)
        : e.scrollTo({ left: 0, behavior: "instant" });
    }
    resizeSlider(t) {
      const e = t.target,
        s = i.data(e) || null;
      s && s.resize();
    }
    checkSlidesSize() {
      this.sliders.length &&
        this.sliders.forEach((t) => {
          const e = this.columns,
            i = window.innerWidth >= theme.sizes.large,
            s =
              window.innerWidth >= theme.sizes.small &&
              window.innerWidth < theme.sizes.large;
          let o = t.querySelectorAll(up).length;
          const n = t.querySelectorAll(vp);
          n.length &&
            i &&
            n.forEach((t) => {
              t.classList.contains(Ep)
                ? (o += e - 1)
                : t.classList.contains(Sp) && (o += 1);
            }),
            t.hasAttribute(kp) && (o += 1),
            (i && o > e) || (s && o > 2)
              ? this.initSlider(t)
              : this.destroySlider(t);
        });
    }
    changeTabIndex(t) {
      const e = t.getAttribute(Lp),
        i = this.flkty[e].selectedIndex;
      this.flkty[e].slides.forEach((t, e) => {
        t.cells.forEach((t) => {
          t.element.querySelectorAll(mp).forEach((t) => {
            t.setAttribute(Ap, i === e ? "0" : "-1");
          });
        });
      });
    }
    setSliderArrowsPosition(t) {
      const e = t.querySelectorAll(gp),
        i = t.querySelector(pp);
      e.length &&
        i &&
        e.forEach((t) => {
          t.style.top = i.offsetHeight / 2 + "px";
        });
    }
    handleLastSlideOverlayOnTablet(t) {
      const e = t.getAttribute(Lp);
      this.flkty[e].on("select", () => {
        if (
          !(
            window.innerWidth >= theme.sizes.small &&
            window.innerWidth < theme.sizes.large
          )
        )
          return;
        const i = this.flkty[e].selectedIndex,
          s = this.flkty[e].slides.length - 1 === i;
        t.parentNode.classList.toggle(bp, s);
      });
    }
    handleLastSlideOverlayOnMobile() {
      this.sliders.forEach((t) => {
        t.addEventListener("scroll", (e) => {
          if (!(window.innerWidth < theme.sizes.small)) return;
          const i = e.target.offsetWidth,
            s =
              Array.from(t.children).pop().getBoundingClientRect().left + 80 <
              i;
          t.parentNode.classList.toggle(bp, s);
        });
      });
    }
    listen() {
      this.sliders.length &&
        (this.checkSlidesSize(),
        document.addEventListener(
          "theme:resize:width",
          this.checkSlidesSizeOnResize
        ),
        this.sliders.forEach((t) => {
          t.addEventListener("theme:tab:change", this.resetSliderEvent),
            t.addEventListener("theme:slider:resize", this.resizeSliderEvent);
        }));
    }
    onBlockSelect(t) {
      const e = t.target.closest(dp),
        s = i.data(e) || null;
      if (!e) return;
      let o = t.target.parentNode,
        n = t.target;
      if (
        (this.container.classList.contains(wp) &&
          ((o = o.parentNode), (n = n.parentNode)),
        null !== s && s.isActive)
      ) {
        const t = parseInt([...o.children].indexOf(n)),
          e = parseInt(s.slides[0].cells.length),
          i = Math.floor(t / e);
        s.select(i);
      } else {
        const t = e.currentStyle || window.getComputedStyle(e),
          i = parseInt(t.paddingLeft),
          s = n.offsetLeft - i;
        e.scrollTo({ top: 0, left: s, behavior: "smooth" });
      }
    }
    onUnload() {
      if (this.flkty)
        for (const t in this.flkty)
          this.flkty.hasOwnProperty(t) && this.flkty[t].destroy();
      document.removeEventListener(
        "theme:resize:width",
        this.checkSlidesSizeOnResize
      ),
        this.sliders.length &&
          this.sliders.forEach((t) => {
            t.removeEventListener("theme:tab:change", this.resetSliderEvent),
              t.removeEventListener(
                "theme:slider:resize",
                this.resizeSliderEvent
              );
          });
    }
    constructor(t) {
      (this.container = t),
        (this.columns = parseInt(this.container.dataset.columns)),
        (this.sliders = this.container.querySelectorAll(dp)),
        (this.checkSlidesSizeOnResize = () => this.checkSlidesSize()),
        (this.resetSliderEvent = (t) => this.resetSlider(t)),
        (this.resizeSliderEvent = (t) => this.resizeSlider(t)),
        (this.flkty = []),
        this.listen(),
        this.handleLastSlideOverlayOnMobile();
    }
  };
  const Tp = {
    onLoad() {
      qp[this.id] = [];
      this.container.querySelectorAll(dp).forEach((t) => {
        qp[this.id].push(new Cp(this.container));
      });
    },
    onUnload() {
      qp[this.id].forEach((t) => {
        "function" == typeof t.onUnload && t.onUnload();
      });
    },
    onBlockSelect(t) {
      qp[this.id].forEach((e) => {
        "function" == typeof e.onBlockSelect && e.onBlockSelect(t);
      });
    },
  };
  yt("featured-collection", [us, Ge, Tp]), yt("featured-video", [Hd, Ku]);
  const Pp = "[data-shop-pay-wrapper]",
    Fp = "shop-login-button",
    Ip = "shop-follow-button",
    xp = "follow-on-shop-button",
    Hp = "heart-icon",
    Dp = "shop-logo",
    Mp = {};
  const Op = "[data-collapsible-trigger-mobile]",
    Bp = "is-expanded";
  yt("footer", [
    na,
    ep,
    Ot,
    {
      onBlockSelect(t) {
        const e = t.target.querySelector(Op);
        requestAnimationFrame(() => {
          e && !e.classList.contains(Bp) && e.dispatchEvent(new Event("click"));
        });
      },
      onBlockDeselect(t) {
        const e = t.target.querySelector(Op);
        requestAnimationFrame(() => {
          e && e.classList.contains(Bp) && e.dispatchEvent(new Event("click"));
        });
      },
    },
    {
      onLoad() {
        Mp[this.id] = new (class {
          init() {
            if (!this.shopLoginButton || !this.shopPayWrapper) return;
            const t = this.shopPayWrapper.dataset.bg || "transparent",
              e = this.shopPayWrapper.dataset.text || "#fff",
              i = this.shopPayWrapper.dataset.hover || "#fff";
            (this.mainButtonStyles = `\n      :host {\n        --bg-color: ${t};\n        --text-color: ${e};\n        --hover-color: ${i};\n      }\n\n      .follow-icon-wrapper:before {\n        background: var(--bg-color);\n        border-color: var(--text-color);\n        transition: border 0.3s ease;\n      }\n\n      .button:not(.button--following):focus-visible .follow-icon-wrapper:before,\n      .button:not(.button--following):hover .follow-icon-wrapper:before {\n        background: var(--bg-color);\n        border-color: var(--hover-color);\n      }\n\n      .button {\n        background: transparent;\n        color: var(--text-color);\n      }\n\n      .following-text {\n        color: var(--text-color);\n      }\n\n      .button--following:focus-visible,\n      .button--following:hover {\n        background: var(--bg-color);\n      }\n\n      .button:not(.button--following):focus-visible .follow-icon-wrapper:before,\n      .button:not(.button--following):hover .follow-icon-wrapper:before {\n        background: var(--bg-color);\n        border-color: var(--hover-color);\n      }\n    `),
              (this.svgIconsStyles = `\n      :host {\n        color: ${e};\n      }\n    `),
              customElements.whenDefined(Fp).then((t) => {
                requestAnimationFrame(() => {
                  const t = this.shopLoginButton.shadowRoot,
                    e = null == t ? void 0 : t.querySelector(Ip),
                    i = null == e ? void 0 : e.shadowRoot,
                    s = null == i ? void 0 : i.querySelector(xp),
                    o = null == s ? void 0 : s.shadowRoot;
                  o &&
                    this.overwriteStyles(
                      o.host.shadowRoot,
                      this.mainButtonStyles
                    );
                  const n = o.querySelector(Hp),
                    r = null == n ? void 0 : n.shadowRoot,
                    a = o.querySelector(Dp),
                    l = null == a ? void 0 : a.shadowRoot;
                  r &&
                    this.overwriteStyles(
                      r.host.shadowRoot,
                      this.svgIconsStyles
                    ),
                    l &&
                      this.overwriteStyles(
                        l.host.shadowRoot,
                        this.svgIconsStyles
                      );
                });
              });
          }
          overwriteStyles(t, e) {
            let i = document.createElement("style");
            (i.innerHTML = e), t.appendChild(i);
          }
          constructor(t) {
            (this.container = t),
              (this.shopPayWrapper = document.querySelector(Pp)),
              (this.shopLoginButton = document.querySelector(Fp)),
              this.init();
          }
        })(this.container);
      },
    },
  ]);
  const _p = "[data-slider]";
  let $p = {};
  yt("icons-row", {
    onLoad() {
      $p[this.id] = new (class {
        onBlockSelect(t) {
          const e =
              this.slider.currentStyle || window.getComputedStyle(this.slider),
            i = parseInt(e.paddingLeft),
            s = t.target.offsetLeft - i;
          this.slider.scrollTo({ top: 0, left: s, behavior: "smooth" });
        }
        constructor(t) {
          (this.container = t.container),
            (this.slider = this.container.querySelector(_p));
        }
      })(this);
    },
    onBlockSelect(t) {
      $p[this.id].onBlockSelect(t);
    },
  });
  const zp = "[data-accordion-item]",
    Rp = "[data-accordion-button]",
    Vp = "is-expanded",
    Wp = {};
  yt("image-accordions", {
    onLoad() {
      Wp[this.id] = new (class {
        init() {
          this.imageAccordionsItems.forEach((t) => {
            t.addEventListener(
              "mouseenter",
              this.accordionExpandEvent.bind(this, t)
            );
          }),
            this.buttons.forEach((t) => {
              t.addEventListener(
                "focusin",
                this.accordionFocusEvent.bind(this, t)
              );
            });
        }
        accordionExpand(t) {
          t.classList.contains(Vp) ||
            (this.imageAccordionsItems.forEach((t) => {
              t.classList.remove(Vp);
            }),
            t.classList.add(Vp));
        }
        accordionFocus(t) {
          t.closest(zp).dispatchEvent(new Event("mouseenter"));
        }
        onBlockSelect(t) {
          const e = t.target;
          e && e.dispatchEvent(new Event("mouseenter"));
        }
        constructor(t) {
          (this.container = t.container),
            (this.imageAccordionsItems = this.container.querySelectorAll(zp)),
            (this.buttons = this.container.querySelectorAll(Rp)),
            (this.accordionExpandEvent = (t) => this.accordionExpand(t)),
            (this.accordionFocusEvent = (t) => this.accordionFocus(t)),
            this.init();
        }
      })(this);
    },
    onBlockSelect(t) {
      Wp[this.id].onBlockSelect(t);
    },
  }),
    yt("image-with-text", Hd),
    yt("list-collections", Tp);
  const Np = {},
    Up = "[data-slider-gallery]",
    jp = "[data-slider-info]",
    Kp = "[data-slide-item]";
  yt("locations", {
    onLoad() {
      Np[this.id] = new (class {
        initSlider() {
          const t = this.container.querySelectorAll(Kp).length;
          let e = i.data(this.slider) || null,
            s = i.data(this.sliderNav) || null;
          t <= 1 ||
            ((e = new i(this.slider, {
              fade: !0,
              wrapAround: !0,
              adaptiveHeight: !0,
              prevNextButtons: !1,
              pageDots: !1,
            })),
            ge(this.slider),
            (s = new i(this.sliderNav, {
              fade: !0,
              wrapAround: !0,
              imagesLoaded: !0,
              asNavFor: this.slider,
              prevNextButtons: !0,
              pageDots: !1,
            })),
            s.on("change", () => {
              e.selectCell(s.selectedIndex);
            }),
            e.on("change", () => {
              s.selectCell(e.selectedIndex);
            }));
        }
        onBlockSelect(t) {
          const e = i.data(this.slider) || null,
            s = i.data(this.sliderNav) || null,
            o = parseInt([...t.target.parentNode.children].indexOf(t.target));
          null !== e && e.select(o), null !== s && s.select(o);
        }
        constructor(t) {
          (this.container = t.container),
            (this.slider = this.container.querySelector(Up)),
            (this.sliderNav = this.container.querySelector(jp)),
            this.initSlider();
        }
      })(this);
    },
    onBlockSelect(t) {
      Np[this.id].onBlockSelect(t);
    },
  });
  const Qp = {},
    Gp = "[data-slider]",
    Xp = "[data-slide-item]",
    Jp = "[data-pointer]",
    Yp = "[data-product-media-container]",
    Zp = "[data-quick-view-item-holder]",
    tm = ".flickity-button",
    em = "a, button",
    im = "[data-tooltip]",
    sm = "data-pointer",
    om = "data-hotspot",
    nm = "tabindex",
    rm = "product-grid-item__image--hovered",
    am = "pointer--selected",
    lm = "is-selected",
    cm = "is-active",
    hm = "pswp--open";
  const dm = {
    onLoad() {
      Qp[this.id] = new (class {
        listen() {
          this.slider &&
            (this.checkSlidesSize(),
            document.addEventListener(
              "theme:resize:width",
              this.checkSlidesSizeOnResize
            ),
            this.slider.addEventListener(
              "theme:slider:resize",
              this.resizeSliderEvent
            )),
            this.pointers.length > 0 &&
              this.pointers.forEach((t) => {
                t.addEventListener("click", this.pointersInit),
                  t.addEventListener("mouseover", this.pointersOver),
                  t.addEventListener("mouseleave", this.pointersOut);
              });
        }
        checkSlidesSize() {
          const t = window.innerWidth >= theme.sizes.small;
          this.initTooltips(),
            t
              ? this.slides.length > 2
                ? this.initSlider()
                : (this.destroySlider(), this.slidesTabIndex())
              : !t && this.slides.length > 1
              ? this.initSlider()
              : this.destroySlider();
        }
        initTooltips() {
          (this.tooltips = this.container.querySelectorAll(im)),
            this.tooltips.forEach((t) => {
              new Qe(t);
            });
        }
        initSlider() {
          null !== this.flkty
            ? this.setSliderArrowsPosition()
            : (this.flkty = new i(this.slider, {
                prevNextButtons: !0,
                wrapAround: !0,
                adaptiveHeight: !1,
                cellAlign: "left",
                groupCells: !1,
                contain: !0,
                on: {
                  ready: () => {
                    this.slidesTabIndex(),
                      this.setSliderArrowsPosition(),
                      this.dotPointers();
                  },
                  change: () => {
                    this.slidesTabIndex(), this.dotPointers();
                  },
                },
              }));
        }
        setSliderArrowsPosition() {
          if (!(window.innerWidth >= theme.sizes.small)) return;
          const t = this.slider.querySelectorAll(tm),
            e = this.slider.querySelector(Yp);
          t.length &&
            e &&
            t.forEach((t) => {
              t.style.top = e.offsetHeight / 2 + "px";
            });
        }
        slidesTabIndex() {
          this.slides.length < 3
            ? this.slider.querySelectorAll(em).forEach((t) => {
                t.setAttribute(nm, "0");
              })
            : i.data(this.slider).cells.forEach((t) => {
                let e = "-1";
                t.element.classList.contains(lm) && (e = "0"),
                  t.element.querySelectorAll(em).forEach((t) => {
                    t.setAttribute(nm, e);
                  });
              });
        }
        destroySlider() {
          "object" == typeof this.flkty &&
            null !== this.flkty &&
            (this.flkty.destroy(), (this.flkty = null));
        }
        resizeSlider(t) {
          const e = t.target,
            s = i.data(e) || null;
          s && s.resize();
        }
        dotPointers(t) {
          if (0 === this.pointers.length) return;
          if (
            (this.pointers.forEach((t) => {
              t.classList.remove(am);
            }),
            t)
          ) {
            var e;
            const i = t.target.getAttribute(sm);
            return void (
              null === (e = this.flkty) ||
              void 0 === e ||
              e.select(i)
            );
          }
          const i = null == this.flkty ? 0 : this.flkty.selectedIndex;
          i >= 0 && this.pointers[i].classList.add(am);
        }
        dotPointerIn(t) {
          const e = t.target.getAttribute(sm),
            i = this.slides[e].querySelector(Yp),
            s = matchMedia("(pointer:coarse)").matches;
          window.innerWidth < theme.sizes.small || s || this.observeImage(i),
            this.pointers.forEach((t) => {
              t.style.setProperty("--look-animation", "none");
            });
        }
        dotPointerOut(t) {
          const e = t.target.getAttribute(sm),
            i = this.slides[e].querySelector(Yp);
          i.classList.remove(rm),
            i.dispatchEvent(new Event("mouseleave")),
            this.observer && this.observer.disconnect(),
            this.pointers.forEach((t) => {
              t.style.removeProperty("--look-animation");
            });
        }
        observeImage(t) {
          (this.observer = new IntersectionObserver(
            (t, e) => {
              t.forEach((t) => {
                const e = t.target;
                0 == t.intersectionRatio ||
                  (e.dispatchEvent(new Event("mouseenter")),
                  e.classList.add(rm));
              });
            },
            { root: this.slider, threshold: [0.95, 1] }
          )),
            this.observer.observe(t);
        }
        triggerClick(t) {
          requestAnimationFrame(() => t.dispatchEvent(new Event("click")));
        }
        destroyQuickViewPopup() {
          var t, e;
          const i =
            null === (t = this.quickViewPopup) ||
            void 0 === t ||
            null === (e = t.loadPhotoswipe) ||
            void 0 === e
              ? void 0
              : e.pswpElement;
          i &&
            i.classList.contains(hm) &&
            this.quickViewPopup.loadPhotoswipe.popup.close();
        }
        onBlockSelect(t) {
          this.debouncedBlockSelectCallback(t);
        }
        debouncedBlockSelect(t) {
          var e, i;
          const s =
            null === (e = this.quickViewPopup) ||
            void 0 === e ||
            null === (i = e.loadPhotoswipe) ||
            void 0 === i
              ? void 0
              : i.pswpElement;
          s
            ? setTimeout(() => {
                if (s.classList.contains(hm)) {
                  const e =
                      this.quickViewPopup.loadPhotoswipe.pswpElement.querySelector(
                        `[${om}="${t.target.getAttribute(om)}"]`
                      ),
                    i =
                      this.quickViewPopup.loadPhotoswipe.pswpElement.querySelectorAll(
                        Zp
                      );
                  e.classList.add(cm),
                    i.forEach((t) => {
                      t !== e && t.classList.remove(cm);
                    });
                } else this.triggerClick(t.target);
              })
            : setTimeout(() => this.triggerClick(t.target), 400);
        }
        onUnload() {
          this.destroyQuickViewPopup(),
            document.removeEventListener(
              "theme:resize:width",
              this.checkSlidesSizeOnResize
            ),
            this.slider &&
              this.slider.removeEventListener(
                "theme:slider:resize",
                this.resizeSliderEvent
              );
        }
        onDeselect() {
          this.destroyQuickViewPopup();
        }
        constructor(t) {
          (this.container = t),
            (this.slider = this.container.querySelector(Gp)),
            (this.slides = this.container.querySelectorAll(Xp)),
            (this.pointers = this.container.querySelectorAll(Jp)),
            (this.flkty = null),
            (this.observer = null),
            (this.checkSlidesSizeOnResize = () => this.checkSlidesSize()),
            (this.resizeSliderEvent = (t) => this.resizeSlider(t)),
            (this.pointersInit = (t) => this.dotPointers(t)),
            (this.pointersOver = (t) => this.dotPointerIn(t)),
            (this.pointersOut = (t) => this.dotPointerOut(t)),
            (this.debouncedBlockSelectCallback = n(
              (t) => this.debouncedBlockSelect(t),
              500
            )),
            (this.quickViewPopup = new Il(this.container)),
            this.listen();
        }
      })(this.container);
    },
    onUnload() {
      Qp[this.id].onUnload();
    },
    onBlockSelect(t) {
      Qp[this.id].onBlockSelect(t);
    },
    onDeselect() {
      Qp[this.id].onDeselect();
    },
  };
  yt("look", [dm]);
  const um = "[data-grid]";
  yt("mosaic", {
    onBlockSelect(t) {
      const e = t.target.closest(um),
        i = e.currentStyle || window.getComputedStyle(e),
        s = parseInt(i.paddingLeft),
        o = t.target.offsetLeft - s;
      e.scrollTo({ top: 0, left: o, behavior: "smooth" });
    },
  }),
    yt("newsletter", ep),
    yt("overlapping-images", Hd);
  const pm = "[data-toggle-admin]",
    mm = "[data-toggle-newsletter]",
    gm = "[data-form-admin]",
    vm = "[data-form-newsletter]";
  let ym = {};
  yt("password-template", {
    onLoad() {
      ym[this.id] = new (class {
        init() {
          this.toggleAdmin.addEventListener("click", (t) => {
            t.preventDefault(), this.showPasswordForm();
          }),
            this.toggleNewsletter.addEventListener("click", (t) => {
              t.preventDefault(), this.hidePasswordForm();
            }),
            "#login" == window.location.hash || this.adminErrors
              ? this.showPasswordForm()
              : this.hidePasswordForm();
        }
        showPasswordForm() {
          mn(this.adminForm),
            gn(this.newsletterForm),
            (window.location.hash = "#login");
        }
        hidePasswordForm() {
          mn(this.newsletterForm),
            gn(this.adminForm),
            (window.location.hash = "");
        }
        constructor(t) {
          (this.container = t.container),
            (this.toggleAdmin = this.container.querySelector(pm)),
            (this.toggleNewsletter = this.container.querySelector(mm)),
            (this.adminForm = this.container.querySelector(gm)),
            (this.newsletterForm = this.container.querySelector(vm)),
            (this.adminErrors = this.adminForm.querySelector(".errors")),
            (this.newsletterErrors =
              this.newsletterForm.querySelector(".errors")),
            this.init();
        }
      })(this);
    },
  });
  const fm = "[data-large-promo]",
    bm = "[data-large-promo-inner]",
    wm = "[data-tracking-consent]",
    Em = "[data-tracking-consent-inner]",
    Sm = "[data-confirm-cookies]",
    Lm = "[data-popup-bar]",
    km = "[data-popup-bar-holder]",
    Am = "[data-popup-bar-toggle]",
    qm = "[data-popup-body]",
    Cm = "[data-popup-close]",
    Tm = "[data-popup-underlay]",
    Pm = "[data-newsletter-form]",
    Fm = "data-target-referrer",
    Im = "data-prevent-scroll-lock",
    xm = "has-success",
    Hm = "has-error",
    Dm = "selected",
    Mm = "has-block-selected",
    Om = "popup--expanded",
    Bm = "popup--visible",
    _m = "mobile",
    $m = "desktop",
    zm = "popup--bar",
    Rm = "popup-bar-is-visible";
  let Vm = {},
    Wm = 0,
    Nm = 0,
    Um = [],
    jm = class {
      always() {
        this.showPopup();
      }
      delayed(t = 10) {
        setTimeout(() => {
          this.showPopup();
        }, 1e3 * t);
      }
      bottom() {
        document.addEventListener("theme:scroll", this.showPopupOnScrollEvent);
      }
      idle() {
        if (!(!0 === this.checkPopupTarget())) return;
        let t = 0;
        const e = [
            "mousemove",
            "mousedown",
            "click",
            "touchmove",
            "touchstart",
            "touchend",
            "keydown",
            "keypress",
          ],
          i = ["load", "resize", "scroll"],
          s = () => {
            (t = setTimeout(() => {
              (t = 0), this.showPopup();
            }, 6e4)),
              e.forEach((t) => {
                document.addEventListener(t, o);
              }),
              i.forEach((t) => {
                window.addEventListener(t, o);
              });
          },
          o = () => {
            t && clearTimeout(t),
              e.forEach((t) => {
                document.removeEventListener(t, o);
              }),
              i.forEach((t) => {
                window.removeEventListener(t, o);
              }),
              s();
          };
        s();
      }
      showPopup() {
        const t = { id: this.popup.id, body: this.popupBody };
        Um.push(t);
        if (!0 === this.checkPopupTarget()) {
          if (
            ((Nm += 1),
            this.popup.classList.add(Bm),
            this.popup.classList.contains(zm) &&
              document.body.classList.add(Rm),
            this.a11y.trapFocus({ container: this.popupBody }),
            this.popup.hasAttribute(Im))
          )
            return !1;
          this.scrollLock();
        }
      }
      checkPopupTarget() {
        const t = this.popup.parentNode.classList.contains(_m),
          e = this.popup.parentNode.classList.contains($m);
        return !(
          (t && window.innerWidth >= theme.sizes.small) ||
          (e && window.innerWidth < theme.sizes.small)
        );
      }
      scrollLock() {
        document.dispatchEvent(
          new CustomEvent("theme:scroll:lock", {
            bubbles: !0,
            detail: this.popupBody,
          })
        );
      }
      showPopupOnScroll() {
        window.scrollY + window.innerHeight >= document.body.clientHeight &&
          (this.showPopup(),
          document.removeEventListener(
            "theme:scroll",
            this.showPopupOnScrollEvent
          ));
      }
      onUnload() {
        document.removeEventListener(
          "theme:scroll",
          this.showPopupOnScrollEvent
        );
      }
      constructor(t, e) {
        if (
          ((this.popupContainer = t),
          (this.popup = e),
          (this.popupBody = e.querySelector(qm)),
          (this.delay = t.dataset.popupDelay),
          (this.isSubmitted =
            -1 !== window.location.href.indexOf("accepts_marketing") ||
            -1 !== window.location.href.indexOf("customer_posted=true")),
          (this.a11y = Ut),
          (this.showPopupOnScrollEvent = () => this.showPopupOnScroll()),
          ("always" === this.delay || this.isSubmitted) && this.always(),
          this.delay && this.delay.includes("delayed") && !this.isSubmitted)
        ) {
          const t = this.delay.includes("_")
            ? parseInt(this.delay.split("_")[1])
            : 10;
          this.delayed(t);
        }
        "bottom" !== this.delay || this.isSubmitted || this.bottom(),
          "idle" !== this.delay || this.isSubmitted || this.idle();
      }
    },
    Km = class {
      constructor(t) {
        if (
          ((this.popupContainer = t),
          (this.locationPath = location.href),
          !this.popupContainer.hasAttribute(Fm))
        )
          return !1;
        -1 !==
          this.locationPath.indexOf(this.popupContainer.getAttribute(Fm)) ||
          window.Shopify.designMode ||
          this.popupContainer.parentNode.removeChild(this.popupContainer);
      }
    };
  yt("popups", [
    {
      onLoad() {
        (Vm[this.id] = []), window.Shopify.designMode && (Nm = 0);
        const t = this.container.querySelectorAll(fm);
        t.length &&
          t.forEach((t) => {
            Vm[this.id].push(
              new (class {
                init() {
                  (!1 !== this.cookie.read() && !window.Shopify.designMode) ||
                    (window.Shopify.designMode
                      ? this.showPopup()
                      : new jm(this.popupContainer, this.popup),
                    this.form &&
                      setTimeout(() => {
                        this.form.classList.contains(xm) &&
                          (this.showPopupIfNoCookie(), (Nm -= 1));
                      }),
                    this.initClosers());
                }
                checkPopupTarget() {
                  const t = this.popup.parentNode.classList.contains(_m),
                    e = this.popup.parentNode.classList.contains($m);
                  return !(
                    (t && window.innerWidth >= theme.sizes.small) ||
                    (e && window.innerWidth < theme.sizes.small)
                  );
                }
                showPopupIfNoCookie() {
                  this.showPopup();
                }
                initClosers() {
                  this.close.addEventListener(
                    "click",
                    this.closePopup.bind(this)
                  ),
                    this.underlay.addEventListener(
                      "click",
                      this.closePopup.bind(this)
                    ),
                    this.popupContainer.addEventListener("keyup", (t) => {
                      t.code === theme.keyboardKeys.ESCAPE &&
                        this.closePopup(t);
                    });
                }
                closePopup(t) {
                  t.preventDefault(), this.hidePopup(), this.cookie.write();
                }
                scrollLock() {
                  this.resetScrollUnlock(),
                    this.a11y.trapFocus({ container: this.popupBody }),
                    document.dispatchEvent(
                      new CustomEvent("theme:scroll:lock", {
                        bubbles: !0,
                        detail: this.popupBody,
                      })
                    );
                }
                scrollUnlock() {
                  this.resetScrollUnlock(),
                    (Wm = setTimeout(() => {
                      document.dispatchEvent(
                        new CustomEvent("theme:scroll:unlock", { bubbles: !0 })
                      );
                    }, 300));
                }
                resetScrollUnlock() {
                  Wm && clearTimeout(Wm);
                }
                showPopup() {
                  const t = !0 === this.checkPopupTarget(),
                    e = { id: this.popupId, body: this.popup };
                  Um.push(e),
                    t &&
                      ((Nm += 1),
                      this.popup.classList.add(Bm),
                      this.scrollLock());
                }
                hidePopup() {
                  this.popup.classList.remove(Bm);
                  const t = Um.findIndex((t) => t.id === this.popupId);
                  if (
                    ((Nm -= 1),
                    Um.splice(t, 1),
                    1 == Nm && document.body.classList.contains(Rm))
                  )
                    this.scrollUnlock();
                  else if (Nm < 1)
                    this.scrollUnlock(), this.a11y.removeTrapFocus();
                  else if (Um.length > 0) {
                    const t = Um[Um.length - 1].body;
                    this.a11y.trapFocus({ container: t });
                  }
                }
                onBlockSelect(t) {
                  this.popupContainer.contains(t.target) &&
                    !this.popup.classList.contains(Bm) &&
                    (this.popup.classList.add(Dm),
                    this.popupContainer.classList.add(Mm),
                    this.showPopup());
                }
                onBlockDeselect(t) {
                  this.popupContainer.contains(t.target) &&
                    (this.popup.classList.remove(Dm),
                    this.popupContainer.classList.remove(Mm),
                    this.hidePopup());
                }
                onUnload() {
                  this.scrollUnlock();
                }
                onDeselect() {
                  this.popup.classList.remove(Dm),
                    this.popupContainer.classList.remove(Mm),
                    this.hidePopup();
                }
                constructor(t) {
                  (this.popupContainer = t),
                    (this.popup = this.popupContainer.querySelector(bm)),
                    (this.popupBody = this.popup.querySelector(qm)),
                    (this.popupId = this.popup.id),
                    (this.close = this.popup.querySelector(Cm)),
                    (this.underlay = this.popup.querySelector(Tm)),
                    (this.form = this.popup.querySelector(Pm)),
                    (this.cookie = new Qu(
                      this.popupContainer.dataset.cookieName,
                      "user_has_closed"
                    )),
                    (this.isTargeted = new Km(this.popupContainer)),
                    (this.a11y = Ut),
                    this.init();
                }
              })(t)
            );
          });
        const e = this.container.querySelectorAll(Lm);
        e.length &&
          e.forEach((t) => {
            Vm[this.id].push(
              new (class {
                init() {
                  (!1 !== this.cookie.read() && !window.Shopify.designMode) ||
                    (window.Shopify.designMode
                      ? this.showPopup()
                      : new jm(this.popupContainer, this.popup),
                    this.initPopupToggleButton(),
                    this.initClosers(),
                    this.form &&
                      setTimeout(() => {
                        this.form.classList.contains(xm) &&
                          this.showPopupIfNoCookie(),
                          this.form.classList.contains(Hm) &&
                            this.toggle.dispatchEvent(new Event("click"));
                      }));
                }
                checkPopupTarget() {
                  const t = this.popup.parentNode.classList.contains(_m),
                    e = this.popup.parentNode.classList.contains($m);
                  return !(
                    (t && window.innerWidth >= theme.sizes.small) ||
                    (e && window.innerWidth < theme.sizes.small)
                  );
                }
                showPopupIfNoCookie() {
                  this.showPopup(),
                    this.toggle.dispatchEvent(new Event("click"));
                }
                initPopupToggleButton() {
                  this.toggle.addEventListener("click", (t) => {
                    t.preventDefault(),
                      this.popup.classList.toggle(Om),
                      this.popup.classList.contains(Om)
                        ? this.scrollLock()
                        : this.scrollUnlock();
                  });
                }
                showPopup() {
                  const t = { id: this.popupId, body: this.popup };
                  Um.push(t),
                    this.a11y.trapFocus({ container: this.popupBody }),
                    !0 === this.checkPopupTarget() &&
                      ((Nm += 1),
                      document.body.classList.add(Rm),
                      this.popup.classList.add(Bm));
                }
                hidePopup() {
                  this.popup.classList.remove(Bm),
                    document.body.classList.remove(Rm);
                  const t = Um.findIndex((t) => t.id === this.popupId);
                  if ((Um.splice(t, 1), Nm >= 1 && (Nm -= 1), Nm < 1))
                    this.scrollUnlock(), this.a11y.removeTrapFocus();
                  else if (Um.length > 0) {
                    const t = Um[Um.length - 1].body;
                    this.a11y.trapFocus({ container: t });
                  }
                }
                initClosers() {
                  this.close.addEventListener(
                    "click",
                    this.closePopup.bind(this)
                  ),
                    this.underlay.addEventListener("click", () =>
                      this.toggle.dispatchEvent(new Event("click"))
                    ),
                    this.popupContainer.addEventListener("keyup", (t) => {
                      t.code === theme.keyboardKeys.ESCAPE &&
                        (this.popup.classList.remove(Om), this.scrollUnlock());
                    });
                }
                closePopup(t) {
                  t.preventDefault(), this.cookie.write(), this.hidePopup();
                }
                scrollLock() {
                  document.dispatchEvent(
                    new CustomEvent("theme:scroll:lock", {
                      bubbles: !0,
                      detail: this.popupBody,
                    })
                  );
                }
                scrollUnlock() {
                  this.resetScrollUnlock(),
                    (Wm = setTimeout(() => {
                      document.dispatchEvent(
                        new CustomEvent("theme:scroll:unlock", { bubbles: !0 })
                      );
                    }, 300));
                }
                resetScrollUnlock() {
                  Wm && clearTimeout(Wm);
                }
                onBlockSelect(t) {
                  this.popupContainer.contains(t.target) &&
                    !this.popup.classList.contains(Bm) &&
                    (this.showPopup(),
                    this.popup.classList.add(Om),
                    this.popup.classList.add(Dm),
                    this.popup.parentNode.classList.add(Mm),
                    this.resetScrollUnlock(),
                    this.scrollLock());
                }
                onBlockDeselect(t) {
                  this.popupContainer.contains(t.target) &&
                    (this.popup.classList.remove(Om),
                    this.popup.classList.remove(Dm),
                    this.popup.parentNode.classList.remove(Mm),
                    this.hidePopup());
                }
                onUnload() {
                  this.scrollUnlock();
                }
                onDeselect() {
                  this.popup.classList.remove(Om),
                    this.popup.classList.remove(Dm),
                    this.popup.parentNode.classList.remove(Mm),
                    this.hidePopup();
                }
                constructor(t) {
                  (this.popupContainer = t),
                    (this.popup = this.popupContainer.querySelector(km)),
                    (this.popupBody = this.popup.querySelector(qm)),
                    (this.popupId = this.popup.id),
                    (this.close = this.popup.querySelector(Cm)),
                    (this.underlay = this.popup.querySelector(Tm)),
                    (this.toggle = this.popup.querySelector(Am)),
                    (this.cookie = new Qu(
                      this.popupContainer.dataset.cookieName,
                      "user_has_closed"
                    )),
                    (this.form = this.popup.querySelector(Pm)),
                    (this.isTargeted = new Km(this.popupContainer)),
                    (this.a11y = Ut),
                    this.init();
                }
              })(t)
            );
          });
        const i = this.container.querySelectorAll(wm);
        i.length &&
          i.forEach((t) => {
            Vm[this.id].push(
              new (class {
                init() {
                  this.enableTracking && this.showPopup(), this.clickEvents();
                }
                clickEvents() {
                  this.close.addEventListener("click", (t) => {
                    t.preventDefault(),
                      window.Shopify.customerPrivacy.setTrackingConsent(
                        !1,
                        () => this.hidePopup()
                      );
                  }),
                    this.acceptButton.addEventListener("click", (t) => {
                      t.preventDefault(),
                        window.Shopify.customerPrivacy.setTrackingConsent(
                          !0,
                          () => this.hidePopup()
                        );
                    }),
                    document.addEventListener("trackingConsentAccepted", () => {
                      console.log("trackingConsentAccepted event fired");
                    });
                }
                showPopup() {
                  const t = { id: this.popupId, body: this.popup };
                  Um.push(t),
                    this.popup.classList.add(Bm),
                    this.a11y.trapFocus({ container: this.popup });
                }
                hidePopup() {
                  this.popup.classList.remove(Bm);
                  const t = Um.findIndex((t) => t.id === this.popupId);
                  if ((Um.splice(t, 1), Nm < 1)) this.a11y.removeTrapFocus();
                  else if (Um.length > 0) {
                    const t = Um[Um.length - 1].body;
                    this.a11y.trapFocus({ container: t });
                  }
                }
                onBlockSelect(t) {
                  this.popupContainer.contains(t.target) &&
                    this.enableTracking &&
                    !this.popup.classList.contains(Bm) &&
                    (this.showPopup(),
                    this.popup.classList.add(Dm),
                    this.popup.parentNode.classList.add(Mm));
                }
                onBlockDeselect(t) {
                  this.popupContainer.contains(t.target) &&
                    (this.popup.classList.remove(Dm),
                    this.popupContainer.classList.remove(Mm),
                    this.hidePopup());
                }
                onDeselect() {
                  this.popup.classList.remove(Dm),
                    this.popupContainer.classList.remove(Mm),
                    this.hidePopup();
                }
                constructor(t) {
                  (this.popupContainer = t),
                    (this.popup = this.popupContainer.querySelector(Em)),
                    (this.popupId = this.popup.id),
                    (this.close = this.popup.querySelector(Cm)),
                    (this.acceptButton = this.popup.querySelector(Sm)),
                    (this.enable =
                      "true" === this.popupContainer.dataset.enable),
                    (this.a11y = Ut),
                    window.Shopify.loadFeatures(
                      [{ name: "consent-tracking-api", version: "0.1" }],
                      (t) => {
                        if (t) throw t;
                        const e =
                            window.Shopify.customerPrivacy.userCanBeTracked(),
                          i =
                            window.Shopify.customerPrivacy.getTrackingConsent();
                        (this.enableTracking =
                          !e && "no_interaction" === i && this.enable),
                          window.Shopify.designMode &&
                            (this.enableTracking = !0),
                          this.init();
                      }
                    );
                }
              })(t)
            );
          });
      },
      onDeselect() {
        Vm[this.id].forEach((t) => {
          "function" == typeof t.onDeselect && t.onDeselect();
        });
      },
      onBlockSelect(t) {
        Vm[this.id].forEach((e) => {
          "function" == typeof e.onBlockSelect && e.onBlockSelect(t);
        });
      },
      onBlockDeselect(t) {
        Vm[this.id].forEach((e) => {
          "function" == typeof e.onBlockDeselect && e.onBlockDeselect(t);
        });
      },
      onUnload(t) {
        Vm[this.id].forEach((e) => {
          "function" == typeof e.onUnload && e.onUnload(t);
        });
      },
    },
    ep,
  ]);
  const Qm = "[data-press-items]",
    Gm = "[data-logo-slider]",
    Xm = "[data-logo-slide]",
    Jm = "a, button",
    Ym = "data-logo-index",
    Zm = "tabindex";
  let tg = {};
  const eg = {
    onLoad() {
      tg[this.id] = new (class {
        checkSlides() {
          const t = this.container.offsetWidth,
            e = this.container.querySelectorAll(Xm),
            s = i.data(this.sliderNav) || null;
          null !== s &&
            ((s.options.draggable = !1),
            (s.options.wrapAround = !1),
            (s.options.contain = !0),
            this.getSlidesWidth() > t &&
              e.length > 2 &&
              ((s.options.draggable = !0),
              (s.options.wrapAround = !0),
              (s.options.contain = !1)),
            s.resize(),
            s.updateDraggable());
        }
        getSlidesWidth() {
          const t = this.container.querySelectorAll(Xm);
          let e = 0;
          return (
            t.length &&
              t.forEach((t) => {
                e += t.offsetWidth;
              }),
            e
          );
        }
        initSlider() {
          let t = i.data(this.slider) || null,
            e = i.data(this.sliderNav) || null;
          const s = parseInt(this.container.dataset.duration),
            o = "true" === this.container.dataset.autoplay && s;
          (t = new i(this.slider, {
            fade: !0,
            wrapAround: !0,
            adaptiveHeight: !0,
            prevNextButtons: !1,
            pageDots: !1,
            autoPlay: o,
          })),
            (e = new i(this.sliderNav, {
              draggable: !1,
              wrapAround: !1,
              contain: !0,
              imagesLoaded: !0,
              asNavFor: this.slider,
              prevNextButtons: !1,
              adaptiveHeight: !1,
              pageDots: !1,
              on: {
                ready: () => {
                  this.container.querySelectorAll(Xm).forEach((e) => {
                    e.addEventListener("keyup", (i) => {
                      if (
                        i.code === theme.keyboardKeys.ENTER ||
                        i.code === theme.keyboardKeys.NUMPADENTER ||
                        i.code === theme.keyboardKeys.SPACE
                      ) {
                        const i = Number(e.getAttribute(Ym));
                        t.selectCell(i);
                      }
                    });
                  });
                },
              },
            })),
            ge(this.slider),
            ge(this.sliderNav),
            e.on("change", (e) => {
              t.selectCell(e);
            }),
            t.on("change", (i) => {
              e.selectCell(i),
                t.cells.forEach((t, e) => {
                  t.element.querySelectorAll(Jm).forEach((t) => {
                    t.setAttribute(Zm, e === i ? "0" : "-1");
                  });
                });
            });
        }
        resizeSlider() {
          const t = i.data(this.slider);
          t && t.resize();
        }
        onBlockSelect(t) {
          const e = i.data(this.slider) || null,
            s = i.data(this.sliderNav) || null,
            o = parseInt([...t.target.parentNode.children].indexOf(t.target));
          null !== e && (e.select(o), e.pausePlayer()),
            null !== s && s.select(o);
        }
        onBlockDeselect() {
          const t = i.data(this.slider) || null;
          "true" === this.container.dataset.autoplay &&
            null !== t &&
            t.playPlayer();
        }
        onUnload() {
          document.removeEventListener(
            "theme:resize:width",
            this.sliderResizeEvent
          );
        }
        constructor(t) {
          (this.container = t.container),
            (this.slider = this.container.querySelector(Qm)),
            (this.sliderNav = this.container.querySelector(Gm)),
            (this.sliderResizeEvent = () => this.checkSlides()),
            this.initSlider(),
            this.checkSlides(),
            window.addEventListener("load", this.resizeSlider.bind(this)),
            document.addEventListener(
              "theme:resize:width",
              this.sliderResizeEvent
            );
        }
      })(this);
    },
    onUnload(t) {
      tg[this.id].onUnload(t);
    },
    onBlockSelect(t) {
      tg[this.id].onBlockSelect(t);
    },
    onBlockDeselect() {
      tg[this.id].onBlockDeselect();
    },
  };
  yt("press", eg);
  const ig = "[data-product-single-media-slider]",
    sg = "[data-product-info]",
    og = "[data-header-sticky]",
    ng = "[data-header-height]",
    rg = "is-sticky",
    ag = "data-sticky-enabled";
  window.theme.variables = { productPageSticky: !1 };
  const lg = {};
  const cg = {
      onLoad() {
        lg[this.id] = new (class {
          init() {
            this.stickyEnabled &&
              (this.stickyScrollCheck(),
              document.addEventListener("theme:resize", this.resizeEvent)),
              this.initSticky();
          }
          initSticky() {
            theme.variables.productPageSticky &&
              ((this.requestAnimationSticky = requestAnimationFrame(() =>
                this.calculateStickyPosition()
              )),
              this.productInfo.addEventListener("theme:form:sticky", (t) => {
                this.removeAnimationFrame(),
                  (this.requestAnimationSticky = requestAnimationFrame(() =>
                    this.calculateStickyPosition(t)
                  ));
              }),
              document.addEventListener("theme:scroll", this.scrollEvent));
          }
          scrollEvents(t) {
            null !== t.detail &&
              ((this.scrollTop = t.detail.position),
              (this.scrollDirectionDown = t.detail.down)),
              this.requestAnimationSticky ||
                (this.requestAnimationSticky = requestAnimationFrame(() =>
                  this.calculateStickyPosition()
                ));
          }
          resizeEvents() {
            this.stickyScrollCheck(),
              document.removeEventListener("theme:scroll", this.scrollEvent),
              this.initSticky();
          }
          stickyScrollCheck() {
            const t =
                (window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth) >= window.theme.sizes.large,
              e = this.container.querySelector(sg);
            if (e)
              if (t) {
                const t = this.container.querySelector(sg),
                  i = this.container.querySelector(ig);
                if (!t || !i) return;
                t.offsetHeight < i.offsetHeight
                  ? ((theme.variables.productPageSticky = !0),
                    e.classList.add(rg))
                  : ((theme.variables.productPageSticky = !1),
                    e.classList.remove(rg));
              } else
                (theme.variables.productPageSticky = !1),
                  e.classList.remove(rg);
          }
          calculateStickyPosition(t = null) {
            const e = Boolean(t && t.detail),
              i = Boolean(
                e && t.detail.element && "accordion" === t.detail.element
              ),
              s = this.productInfo.offsetHeight,
              o = window.innerHeight - s - this.defaultTopBottomSpacings,
              n = Math.abs(this.scrollTop - this.scrollLastPosition);
            this.scrollDirectionDown
              ? (this.stickyScrollTop -= n)
              : (this.stickyScrollTop += n),
              this.stickyFormLoad &&
                (document.querySelector(og) && document.querySelector(ng)
                  ? (this.stickyDefaultTop = parseInt(
                      document.querySelector(ng).getBoundingClientRect().height
                    ))
                  : (this.stickyDefaultTop = this.defaultTopBottomSpacings),
                (this.stickyScrollTop = this.stickyDefaultTop)),
              (this.stickyScrollTop = Math.min(
                Math.max(this.stickyScrollTop, o),
                this.stickyDefaultTop
              ));
            const r = this.stickyScrollTop - this.currentPoint;
            (this.currentPoint = this.stickyFormLoad
              ? this.stickyScrollTop
              : this.currentPoint + 0.5 * r),
              this.productInfo.style.setProperty(
                "--sticky-top",
                `${this.currentPoint}px`
              ),
              (this.scrollLastPosition = this.scrollTop),
              (this.stickyFormLoad = !1),
              (i && this.onChangeCounter <= 10) ||
              (i && this.stickyFormLastHeight !== s) ||
              (this.stickyScrollTop !== this.currentPoint &&
                this.requestAnimationSticky)
                ? (i && (this.onChangeCounter += 1),
                  i &&
                    this.stickyFormLastHeight !== s &&
                    (this.onChangeCounter = 11),
                  (this.requestAnimationSticky = requestAnimationFrame(() =>
                    this.calculateStickyPosition(t)
                  )))
                : this.requestAnimationSticky && this.removeAnimationFrame(),
              (this.stickyFormLastHeight = s);
          }
          removeAnimationFrame() {
            this.requestAnimationSticky &&
              (cancelAnimationFrame(this.requestAnimationSticky),
              (this.requestAnimationSticky = null),
              (this.onChangeCounter = 0));
          }
          onUnload() {
            this.stickyEnabled &&
              document.removeEventListener("theme:resize", this.resizeEvent),
              theme.variables.productPageSticky &&
                document.removeEventListener("theme:scroll", this.scrollEvent);
          }
          constructor(t) {
            (this.container = t.container),
              (this.stickyEnabled = "true" === this.container.getAttribute(ag)),
              (this.productInfo = this.container.querySelector(sg)),
              (this.stickyScrollTop = 0),
              (this.scrollLastPosition = 0),
              (this.stickyDefaultTop = 0),
              (this.currentPoint = 0),
              (this.defaultTopBottomSpacings = 30),
              (this.scrollTop = window.scrollY),
              (this.scrollDirectionDown = !0),
              (this.requestAnimationSticky = null),
              (this.stickyFormLoad = !0),
              (this.stickyFormLastHeight = null),
              (this.onChangeCounter = 0),
              (this.scrollEvent = (t) => this.scrollEvents(t)),
              (this.resizeEvent = (t) => this.resizeEvents(t)),
              this.init();
          }
        })(this);
      },
      onUnload() {
        lg[this.id].onUnload();
      },
    },
    hg = "[data-product-single-media-group]",
    dg = "[data-product-single-media-slider]",
    ug = "[data-zoom-wrapper]",
    pg = "pswp-zoom-gallery",
    mg = "pswp-zoom-gallery--single",
    gg = "is-moving",
    vg = "data-image-width",
    yg = "data-image-height";
  const fg = "[data-complementary-products]",
    bg = "[data-button-quick-view]",
    wg = "data-url";
  let Eg = class extends HTMLElement {
    connectedCallback() {
      new IntersectionObserver(
        ((t, e) => {
          t[0].isIntersecting &&
            (e.unobserve(this),
            this.hasAttribute(wg) &&
              "" !== this.getAttribute(wg) &&
              fetch(this.getAttribute(wg))
                .then((t) => t.text())
                .then((t) => {
                  const e = document.createElement("div");
                  e.innerHTML = t;
                  const i = e.querySelector(fg);
                  i &&
                    i.innerHTML.trim().length &&
                    (this.innerHTML = i.innerHTML),
                    e.querySelector(bg) && new Il(this);
                })
                .catch((t) => {
                  console.error(t);
                }));
        }).bind(this),
        { rootMargin: "0px 0px 400px 0px" }
      ).observe(this);
    }
    constructor() {
      super();
    }
  };
  const Sg = "[data-recipient-checkbox]",
    Lg = "[data-recipient-email]",
    kg = "[data-recipient-name]",
    Ag = "[data-recipient-message]",
    qg = "[data-recipient-send-on]",
    Cg = "[data-recipient-control]",
    Tg = "[data-recipient-offset]",
    Pg = "[data-product-form]",
    Fg = "[data-cart-drawer]",
    Ig = "js-quick-view-visible";
  let xg = class extends HTMLElement {
    connectedCallback() {
      this.recipientCheckbox &&
        (this.disableInputFields(),
        this.recipientCheckbox.addEventListener("change", this.onChangeEvent),
        document.addEventListener("theme:cart:added", this.onCartAddedEvent));
    }
    onChange(t) {
      if (!t.target.checked)
        return this.clearInputFields(), void this.disableInputFields();
      this.enableInputFields();
    }
    onCartAdded() {
      const t = this.closest(Pg).offsetTop,
        e = document.body.classList.contains(Ig);
      if (!(!0 === this.recipientCheckbox.checked)) return;
      e || window.scrollTo({ top: t, left: 0, behavior: "smooth" });
      const i = (t) => {
        t.target === this.cartDrawer &&
          (requestAnimationFrame(() => {
            (this.recipientCheckbox.checked = !1),
              this.recipientCheckbox.dispatchEvent(new Event("change"));
          }),
          this.cartDrawer.removeEventListener("transitionend", i));
      };
      this.cartDrawer.addEventListener("transitionend", i);
    }
    inputFields() {
      return [
        this.recipientEmail,
        this.recipientName,
        this.recipientMessage,
        this.recipientSendOn,
      ];
    }
    disableableFields() {
      return [...this.inputFields(), this.recipientOffset];
    }
    clearInputFields() {
      this.inputFields().forEach((t) => (t.value = ""));
    }
    enableInputFields() {
      this.disableableFields().forEach((t) => (t.disabled = !1));
    }
    disableInputFields() {
      this.disableableFields().forEach((t) => (t.disabled = !0));
    }
    disconnectedCallback() {
      this.recipientCheckbox.removeEventListener("change", this.onChangeEvent),
        document.removeEventListener("theme:cart:added", this.onCartAddedEvent);
    }
    constructor() {
      super(),
        (this.recipientCheckbox = this.querySelector(Sg)),
        (this.recipientControl = this.querySelector(Cg)),
        (this.recipientControl.disabled = !0),
        (this.recipientEmail = this.querySelector(Lg)),
        (this.recipientName = this.querySelector(kg)),
        (this.recipientMessage = this.querySelector(Ag)),
        (this.recipientSendOn = this.querySelector(qg)),
        (this.recipientOffset = this.querySelector(Tg)),
        this.recipientOffset &&
          (this.recipientOffset.value = new Date().getTimezoneOffset()),
        (this.cartDrawer = document.querySelector(Fg)),
        (this.onChangeEvent = (t) => this.onChange(t)),
        (this.onCartAddedEvent = () => this.onCartAdded());
    }
  };
  const Hg = "[data-product-single-media-slider]",
    Dg = "[data-thumbnail-id]",
    Mg = "[data-product-single-media-thumbs]",
    Og = "[data-product-single-media-wrapper]",
    Bg = "[data-model]",
    _g = ".product-single__thumbnail-link",
    $g = "[data-deferred-media]",
    zg = "[data-deferred-media-button]",
    Rg = "[data-product-rating]",
    Vg = "#shopify-product-reviews",
    Wg = "a, button",
    Ng = "[data-upsell-holder]",
    Ug = "[data-upsell-slider]",
    jg = "[data-slider]",
    Kg = "featured-product",
    Qg = "featured-product--onboarding",
    Gg = "has-media-active",
    Xg = "is-selected",
    Jg = "media--hidden",
    Yg = "no-outline",
    Zg = "is-moving",
    tv = "data-media-id",
    ev = "data-section-id",
    iv = "data-thumbnail-id",
    sv = "data-tall-layout",
    ov = "loaded",
    nv = "tabindex",
    rv = {};
  const av = {
    onLoad() {
      rv[this.id] = new (class {
        productSlider() {
          this.checkSlider(),
            document.addEventListener(
              "theme:resize:width",
              this.checkSliderOnResize
            );
        }
        checkSlider() {
          !this.tallLayout || window.innerWidth < theme.sizes.large
            ? this.initProductSlider()
            : this.destroyProductSlider();
        }
        resizeFlickityNav() {
          null !== this.flktyNav && this.flktyNav.resize();
        }
        initProductSlider() {
          const t = this.container.querySelector(Hg),
            e = this.container.querySelector(Mg),
            s = this.container.querySelectorAll(Og);
          if (
            s.length > 1 &&
            ((this.flkty = new i(t, {
              wrapAround: !0,
              pageDots: !1,
              adaptiveHeight: !0,
              on: {
                ready: () => {
                  t.setAttribute(nv, "-1"),
                    s.forEach((t) => {
                      if (!t.classList.contains(Xg)) {
                        const e = t.querySelectorAll(Wg);
                        e.length &&
                          e.forEach((t) => {
                            t.setAttribute(nv, "-1");
                          });
                      }
                    });
                },
                dragStart: () => {
                  t.classList.add(Zg);
                },
                dragMove: () => {
                  this.isFlickityDragging = !0;
                },
                staticClick: () => {
                  this.isFlickityDragging = !1;
                },
                settle: (e) => {
                  const i = this.flkty.selectedElement.getAttribute(tv);
                  this.flkty.cells.forEach((t, i) => {
                    const s = t.element.querySelectorAll(Wg);
                    s.length &&
                      s.forEach((t) => {
                        t.setAttribute(nv, i === e ? "0" : "-1");
                      });
                  }),
                    this.switchMedia(i),
                    t.classList.remove(Zg);
                },
              },
            })),
            s.length &&
              s.forEach((t) => {
                t.addEventListener("theme:media:play", () => {
                  (this.flkty.options.draggable = !1),
                    this.flkty.updateDraggable(),
                    t.closest(Hg).classList.add(Gg);
                }),
                  t.addEventListener("theme:media:pause", () => {
                    (this.flkty.options.draggable = !0),
                      this.flkty.updateDraggable(),
                      t.closest(Hg).classList.remove(Gg);
                  });
              }),
            ge(t),
            null !== e)
          ) {
            (this.flktyNav = new i(e, {
              asNavFor: t,
              contain: !0,
              pageDots: !1,
              prevNextButtons: !1,
              resize: !0,
              on: {
                ready: () => {
                  e.setAttribute(nv, "-1");
                },
              },
            })),
              null !== this.flktyNav &&
                document.addEventListener(
                  "theme:resize:width",
                  this.flktyNavOnResize
                ),
              ge(e);
            const s = this.container.querySelectorAll(_g);
            s.length &&
              s.forEach((t) => {
                t.addEventListener("click", (t) => {
                  t.preventDefault();
                });
              });
          }
        }
        destroyProductSlider() {
          null !== this.flkty &&
            (this.flkty.destroy(),
            this.flktyNav.destroy(),
            (this.flkty = null),
            (this.flktyNav = null));
        }
        initUpsellSlider() {
          const t = this.container.querySelector(Ug);
          if (this.container.querySelectorAll(Ng).length > 1) {
            const e = new i(t, {
              wrapAround: !0,
              pageDots: !0,
              adaptiveHeight: !0,
              prevNextButtons: !1,
            });
            e.on("change", (t) => {
              e.cells.forEach((e, i) => {
                const s = e.element.querySelectorAll(Wg);
                s.length &&
                  s.forEach((e) => {
                    e.setAttribute(nv, i === t ? "0" : "-1");
                  });
              });
            });
          }
        }
        initFeatureSlider() {
          this.featureSliders.forEach((t) => {
            Array.from(t.children).length > 1 &&
              (this.flktyFeature = new i(t, {
                wrapAround: !0,
                pageDots: !0,
                adaptiveHeight: !0,
                prevNextButtons: !1,
              }));
          });
        }
        handleMediaFocus(t) {
          if (
            t.code !== theme.keyboardKeys.ENTER &&
            t.code !== theme.keyboardKeys.TAB
          )
            return;
          const e = t.currentTarget.getAttribute(iv),
            s = this.container.querySelector(`[${tv}="${e}"]`),
            o = parseInt([...s.parentNode.children].indexOf(s)),
            n = this.container.querySelector(Hg),
            r = this.container.querySelector(Mg),
            a = i.data(n) || null,
            l = i.data(r) || null;
          a &&
            a.isActive &&
            o > -1 &&
            (t.code === theme.keyboardKeys.ENTER ||
              t.code === theme.keyboardKeys.NUMPADENTER) &&
            a.select(o),
            l && l.isActive && o > -1 && l.select(o);
        }
        switchMedia(t) {
          const e = document.querySelectorAll(`${Og}`),
            i = this.container.querySelector(`${Og}[${tv}="${t}"]`),
            s = !document.body.classList.contains(Yg);
          e.length &&
            e.forEach((t) => {
              t.dispatchEvent(new CustomEvent("theme:media:hidden"), {
                bubbles: !0,
              }),
                t.classList.add(Jg);
            }),
            s && i.focus(),
            i.closest(Hg).classList.remove(Gg),
            i.classList.remove(Jg),
            i.dispatchEvent(new CustomEvent("theme:media:visible"), {
              bubbles: !0,
            });
          const o = i.querySelector($g);
          o &&
            "true" !== o.getAttribute(ov) &&
            i.querySelector(zg).dispatchEvent(new Event("click"));
        }
        initMediaSwitch() {
          const t = this.container.querySelectorAll(Dg);
          t.length &&
            t.forEach((t) => {
              t.addEventListener("keyup", this.handleMediaFocus.bind(this)),
                t.addEventListener("click", (t) => {
                  t.preventDefault();
                });
            });
        }
        initProductVideo() {
          this.videos = new Pe(this.container);
        }
        initProductModel() {
          const t = this.container.querySelectorAll(Bg);
          t.length &&
            t.forEach((t) => {
              theme.ProductModel.init(t, this.sectionId);
            });
        }
        initShopifyXrLaunch() {
          document.addEventListener("shopify_xr_launch", () => {
            this.container
              .querySelector(`${Bg}:not(.${Jg})`)
              .dispatchEvent(new CustomEvent("xrLaunch"));
          });
        }
        onUnload() {
          null !== this.flktyNav &&
            document.removeEventListener(
              "theme:resize:width",
              this.flktyNavOnResize
            ),
            document.removeEventListener(
              "theme:resize:width",
              this.checkSliderOnResize
            );
        }
        scrollToReviews() {
          const t = this.container.querySelector(Rg);
          t &&
            ["click", "keydown"].forEach((e) => {
              t.addEventListener(e, (t) => {
                if (
                  (t.code !== theme.keyboardKeys.ENTER &&
                    t.code !== theme.keyboardKeys.NUMPADENTER) ||
                  "click" != t.type
                ) {
                  const t = document.querySelector(Vg);
                  if (!t) return;
                  t.scrollIntoView({ behavior: "smooth" });
                }
              });
            });
        }
        onBlockSelect(t) {
          const e = i.data(t.target.closest(jg)),
            s = parseInt([...t.target.parentNode.children].indexOf(t.target));
          e && e.select(s);
        }
        constructor(t) {
          (this.container = t.container),
            (this.sectionId = this.container.getAttribute(ev)),
            (this.tallLayout = "true" === this.container.getAttribute(sv)),
            (this.featureSliders = this.container.querySelectorAll(jg)),
            (this.flkty = null),
            (this.flktyNav = null),
            (this.isFlickityDragging = !1),
            (this.enableHistoryState = !this.container.classList.contains(Kg)),
            (this.checkSliderOnResize = () => this.checkSlider()),
            (this.flktyNavOnResize = () => this.resizeFlickityNav()),
            this.scrollToReviews(),
            this.initUpsellSlider(),
            this.initFeatureSlider(),
            new Il(this.container),
            this.container.classList.contains(Qg) ||
              (new (class {
                init() {
                  this.zoomWrappers.length &&
                    this.zoomWrappers.forEach((t, e) => {
                      t.addEventListener("click", (i) => {
                        i.preventDefault(),
                          (this.slider && this.slider.classList.contains(gg)) ||
                            ((this.a11y.state.trigger = t), this.createZoom(e));
                      });
                    });
                }
                createZoom(t) {
                  const e = this;
                  let i = [],
                    s = 0;
                  this.zoomWrappers.forEach((o) => {
                    const n = o.getAttribute("href"),
                      r = parseInt(o.getAttribute(vg)),
                      a = parseInt(o.getAttribute(yg));
                    if (
                      (i.push({ src: n, w: r, h: a, msrc: n }),
                      (s += 1),
                      e.zoomWrappers.length === s)
                    ) {
                      let e = `${pg}`;
                      1 === s && (e = `${pg} ${mg}`),
                        new ul(i, {
                          barsSize: { top: 60, bottom: 60 },
                          history: !1,
                          focus: !1,
                          index: t,
                          mainClass: e,
                          showHideOpacity: !0,
                          showAnimationDuration: 250,
                          hideAnimationDuration: 250,
                          closeOnScroll: !1,
                          closeOnVerticalDrag: !1,
                          captionEl: !1,
                          closeEl: !0,
                          closeElClasses: ["caption-close"],
                          tapToClose: !1,
                          clickToCloseNonZoomable: !1,
                          maxSpreadZoom: 2,
                          loop: !0,
                          spacing: 0,
                          allowPanToNext: !0,
                          pinchToClose: !1,
                        });
                    }
                  });
                }
                constructor(t) {
                  (this.container = t),
                    (this.mediaContainer = this.container.querySelector(hg)),
                    (this.slider = this.container.querySelector(dg)),
                    (this.zoomWrappers = this.container.querySelectorAll(ug)),
                    (this.zoomEnable =
                      "true" === this.mediaContainer.dataset.gallery),
                    (this.a11y = Ut),
                    this.zoomEnable && this.init();
                }
              })(this.container),
              this.productSlider(),
              this.initMediaSwitch(),
              this.initProductVideo(),
              this.initProductModel(),
              this.initShopifyXrLaunch());
        }
      })(this);
    },
    onUnload: function () {
      rv[this.id].onUnload();
    },
    onBlockSelect(t) {
      rv[this.id].onBlockSelect(t);
    },
  };
  yt("product-template", [Or, av, Yi, Zi, Fd, Ot, Ge, na, pn, cg]),
    yt("featured-product", [Or, av, Yi, Zi, Fd, Ot, Ge, na, pn, cg]),
    customElements.get("complementary-products") ||
      customElements.define("complementary-products", Eg),
    customElements.get("recipient-form") ||
      customElements.define("recipient-form", xg);
  const lv = "is-disabled",
    cv = "data-circle-text-parallax";
  const hv = "href",
    dv = "data-media-id",
    uv = "data-deferred-media-loaded",
    pv = "[data-product-content-wrapper]",
    mv = "[data-product-single-media-wrapper]",
    gv = "[data-model]",
    vv = "[data-product-link]",
    yv = "[data-product-single-media-image]",
    fv = "[data-slider-contents]",
    bv = "[data-slider-images]",
    wv = "[data-tab-button]",
    Ev = "[data-tab-item]",
    Sv = "[data-circle-text]",
    Lv = {
      aosAnimate: "aos-animate",
      tabButtonActive: "products-list__nav__button--active",
      tabItemActive: "products-list__item--active",
      mediaHidden: "media--hidden",
      isDisabled: "is-disabled",
    },
    kv = {};
  yt("products-list", {
    onLoad() {
      kv[this.id] = new (class {
        listen() {
          (this.slidersImages.length > 0 || this.slidersContents.length > 0) &&
            document.addEventListener("theme:resize", this.sliderResizeEvent);
        }
        resizeSlider() {
          this.flktyImages.length > 0 &&
            requestAnimationFrame(() => {
              this.flktyImages.forEach((t) => t.resize());
            }),
            this.flktyContent.length > 0 &&
              requestAnimationFrame(() => {
                this.flktyContent.forEach((t) => t.resize());
              });
        }
        initButtons() {
          this.tabButtons.length &&
            this.tabButtons.forEach((t) => {
              t.addEventListener("click", (e) => {
                if (t.classList.contains(Lv.tabButtonActive)) return;
                const i = t.getAttribute(hv),
                  s = this.container.querySelector(i),
                  o = s.querySelector(mv),
                  n = o ? o.dataset.mediaId : null,
                  r = s.querySelector(Sv);
                this.tabButtons.forEach((t) => {
                  t.classList.remove(Lv.tabButtonActive);
                }),
                  this.tabItems.forEach((t) => {
                    const e = t.querySelector(Sv);
                    t.classList.remove(Lv.tabItemActive),
                      null == e || e.classList.add(Lv.isDisabled),
                      theme.settings.animations &&
                        t.querySelectorAll(`.${Lv.aosAnimate}`).forEach((t) => {
                          t.classList.remove(Lv.aosAnimate),
                            setTimeout(() => {
                              t.classList.add(Lv.aosAnimate);
                            });
                        });
                  }),
                  t.classList.add(Lv.tabButtonActive),
                  s.classList.add(Lv.tabItemActive),
                  document.dispatchEvent(new Event("theme:resize")),
                  r &&
                    (r.classList.remove(Lv.isDisabled),
                    document.dispatchEvent(new Event("theme:scroll"))),
                  this.handleProductVideos(s, n),
                  e.preventDefault();
              });
            });
        }
        initSliders() {
          this.slidersImages.forEach((t, e) => {
            const s = t.closest(Ev).querySelector(fv),
              o = new i(t, {
                fade: !0,
                pageDots: !1,
                prevNextButtons: !0,
                wrapAround: !0,
                adaptiveHeight: !0,
                asNavFor: s,
                on: {
                  change: (t) => {
                    this.flktyContent.length > 0 &&
                      this.flktyContent[e].select(t);
                  },
                },
              });
            o.on("settle", (e) => {
              const i = t.querySelectorAll(mv);
              for (let t = 0; t < i.length; t++)
                t === e
                  ? i[t].querySelector(yv).removeAttribute("tabindex")
                  : i[t].querySelector(yv).setAttribute("tabindex", "-1");
            }),
              this.flktyImages.push(o);
          }),
            this.slidersContents.forEach((t) => {
              const e = new i(t, {
                fade: !0,
                pageDots: !1,
                prevNextButtons: !1,
                wrapAround: !0,
                adaptiveHeight: !0,
              });
              e.on("settle", (e) => {
                const i = t.querySelectorAll(pv);
                for (let t = 0; t < i.length; t++)
                  t === e
                    ? i[t].querySelectorAll(vv).forEach((t) => {
                        t.removeAttribute("tabindex");
                      })
                    : i[t].querySelectorAll(vv).forEach((t) => {
                        t.setAttribute("tabindex", "-1");
                      });
              }),
                this.flktyContent.push(e);
            });
        }
        initProductVideos() {
          this.tabItems.forEach((t) => {
            t.classList.contains(Lv.tabItemActive) &&
              this.handleProductVideos(t);
          });
        }
        loadVideos(t, e = null) {
          new IntersectionObserver(
            (i, s) => {
              i.forEach((i) => {
                if (i.isIntersecting) {
                  const o = new Pe(t);
                  this.videos.push(o),
                    t.setAttribute(uv, ""),
                    this.playToggle(e),
                    s.unobserve(i.target);
                }
              });
            },
            {
              root: null,
              rootMargin: "300px",
              threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
            }
          ).observe(t);
        }
        handleProductVideos(t, e = null) {
          t.hasAttribute(uv) ? this.playToggle(e) : this.loadVideos(t, e);
        }
        playToggle(t) {
          this.videos.forEach((e) => {
            "function" == typeof e.pauseContainerMedia &&
              t &&
              (e.pauseContainerMedia(t, this.container), this.switchMedia(t)),
              t ||
                0 !== Object.keys(e.players).length ||
                this.pauseContainerMedia(this.container);
          });
        }
        switchMedia(t) {
          const e = this.container.querySelector(`${mv}[${dv}="${t}"]`);
          !document.body.classList.contains(Lv.noOutline) && e.focus(),
            e.classList.remove(Lv.mediaHidden),
            e.dispatchEvent(new CustomEvent("theme:media:visible"), {
              bubbles: !0,
            });
        }
        pauseContainerMedia(t) {
          const e = t.querySelectorAll(mv);
          0 !== e.length &&
            e.forEach((t) => {
              t.dispatchEvent(new CustomEvent("theme:media:hidden"), {
                bubbles: !0,
              }),
                t.classList.add(Lv.mediaHidden);
            });
        }
        initProductModel() {
          const t = this.container.querySelectorAll(gv);
          t.length &&
            t.forEach((t) => {
              theme.ProductModel.init(t, this.sectionId);
            });
        }
        initShopifyXrLaunch() {
          document.addEventListener("shopify_xr_launch", () => {
            this.container
              .querySelector(`${gv}:not(.${Lv.mediaHidden})`)
              .dispatchEvent(new CustomEvent("xrLaunch"));
          });
        }
        initCircleText() {
          this.container.querySelectorAll(Sv).forEach((t) => {
            new (class {
              init() {
                this.circleText.hasAttribute(cv) &&
                  document.addEventListener("theme:scroll", this.scrollEvent);
              }
              updateParallax() {
                if (this.circleText.classList.contains(lv)) return;
                const t = Math.round(window.innerHeight),
                  e = Math.round(window.scrollY),
                  i = e + t,
                  s = Math.round(
                    this.circleText.getBoundingClientRect().top + e
                  ),
                  o = this.circleText.offsetHeight;
                if (s < i && !(s + o < e)) {
                  const e = (100 * (i - s - o / 2)) / t;
                  let n = ((this.rotateDegree * e) / 100) * -1;
                  e > 0 &&
                    (this.circleText.style.transform = `rotate(${
                      this.adjustRotateDegree + n
                    }deg)`);
                }
              }
              unload() {
                document.removeEventListener("theme:scroll", this.scrollEvent);
              }
              constructor(t) {
                (this.circleText = t),
                  (this.rotateDegree = 70),
                  (this.adjustRotateDegree = this.rotateDegree / 2),
                  (this.scrollEvent = () => this.updateParallax()),
                  this.init();
              }
            })(t);
          });
        }
        onBlockSelect(t) {
          t.target.dispatchEvent(new Event("click"));
        }
        onUnload() {
          (this.slidersImages.length > 0 || this.slidersContents.length > 0) &&
            document.removeEventListener(
              "theme:resize",
              this.sliderResizeEvent
            );
        }
        constructor(t) {
          (this.container = t.container),
            (this.sectionId = this.container.dataset.sectionId),
            (this.tabButtons = this.container.querySelectorAll(wv)),
            (this.tabItems = this.container.querySelectorAll(Ev)),
            (this.slidersImages = this.container.querySelectorAll(bv)),
            (this.slidersContents = this.container.querySelectorAll(fv)),
            (this.videos = []),
            (this.flktyImages = []),
            (this.flktyContent = []),
            (this.sliderResizeEvent = () => this.resizeSlider()),
            this.initButtons(),
            this.initSliders(),
            this.initProductVideos(),
            this.initProductModel(),
            this.initShopifyXrLaunch(),
            this.initCircleText(),
            this.listen();
        }
      })(this);
    },
    onUnload() {
      kv[this.id].onUnload();
    },
    onBlockSelect(t) {
      kv[this.id].onBlockSelect(t);
    },
  });
  const Av = "[data-product-block]",
    qv = "[data-related-products]",
    Cv = "data-section-id",
    Tv = "data-product-id",
    Pv = "data-limit",
    Fv = {};
  yt("related-products", {
    onLoad() {
      Fv[this.id] = new (class {
        init() {
          const t = this.container.getAttribute(Cv),
            e = this.container.getAttribute(Tv),
            i = this.container.getAttribute(Pv),
            s = `${theme.routes.product_recommendations_url}?section_id=${t}&limit=${i}&product_id=${e}`;
          fetch(s)
            .then((t) => t.text())
            .then((t) => {
              const e = document.createElement("div");
              e.innerHTML = t;
              const i = e.querySelector(qv);
              i.querySelectorAll(Av).length &&
                ((this.relatedProducts.innerHTML = i.innerHTML),
                (this.productGrid = new ds(this.container)),
                (this.gridSlider = new Cp(this.container)));
            });
        }
        onDeselect() {
          this.productGrid && this.productGrid.onDeselect();
        }
        onUnload() {
          this.productGrid && this.productGrid.onUnload(),
            this.gridSlider && this.gridSlider.onUnload();
        }
        constructor(t) {
          (this.container = t),
            (this.relatedProducts = this.container.querySelector(qv)),
            this.init();
        }
      })(this.container);
    },
    onDeselect() {
      Fv[this.id].onDeselect();
    },
    onUnload() {
      Fv[this.id].onUnload();
    },
  });
  const Iv = {},
    xv = "[data-slider]",
    Hv = "[data-item]",
    Dv = "[data-button-show]",
    Mv = "[data-button-hide]",
    Ov = "[data-item-products]",
    Bv = "[data-item-products-slider]",
    _v = "[data-item-product]",
    $v = "a, button",
    zv = "blog-item--active",
    Rv = "blog-item__products--visible",
    Vv = "flickity-enabled",
    Wv = "is-selected",
    Nv = {
      slider: "data-slider",
      slidePosition: "data-slide-position",
      sectionId: "data-section-id",
      tabIndex: "tabindex",
    };
  const Uv = {
    onLoad() {
      Iv[this.id] = new (class {
        initSlider() {
          (this.flkty = new i(this.slider, {
            prevNextButtons: !0,
            pageDots: !1,
            cellAlign: "left",
            wrapAround: !1,
            groupCells: !0,
            contain: !0,
            on: {
              ready: () => {
                this.handleFocus();
              },
            },
          })),
            this.flkty.on("change", () => {
              const t = this.container.querySelectorAll(Hv);
              this.handleFocus(),
                t.length &&
                  t.forEach((t) => {
                    const e = t.querySelector(Ov);
                    t.classList.remove(zv),
                      e && t.querySelector(Ov).classList.remove(Rv);
                  }),
                this.flkty &&
                  !this.flkty.options.draggable &&
                  ((this.flkty.options.draggable = !0),
                  this.flkty.updateDraggable());
            });
        }
        destroySlider() {
          null !== this.flkty && (this.flkty.destroy(), (this.flkty = null));
        }
        checkSlidesSize() {
          const t =
            this.container.querySelector(Hv).currentStyle ||
            window.getComputedStyle(this.container.querySelector(Hv));
          this.gutter = parseInt(t.marginRight);
          const e =
            this.slider.offsetWidth + this.gutter < this.getItemsWidth();
          window.innerWidth >= theme.sizes.small && e
            ? this.initSlider()
            : this.destroySlider();
        }
        getItemsWidth() {
          let t = 0;
          const e = this.slider.querySelectorAll(Hv);
          return (
            e.length &&
              e.forEach((e) => {
                t += e.offsetWidth + this.gutter;
              }),
            t
          );
        }
        bindButtons() {
          const t = this.container.querySelectorAll(Bv),
            e = this.container.querySelectorAll(Dv),
            s = this.container.querySelectorAll(Mv);
          e.length &&
            e.forEach((t) => {
              t.addEventListener("click", (e) => {
                e.preventDefault(),
                  this.container.querySelectorAll(Hv).forEach((t) => {
                    const e = t.querySelector(Ov);
                    t.classList.remove(zv),
                      e && (e.classList.remove(Rv), this.changeTabIndex(e));
                  });
                const i = t.closest(Hv),
                  s = i.querySelector(Ov);
                if ((i.classList.add(zv), s)) {
                  s.classList.add(Rv), this.changeTabIndex(s, "enable");
                  const t = s.querySelector(Bv),
                    e = t.querySelectorAll(_v);
                  if (t.classList.contains(Vv)) {
                    const i = t
                      .querySelector(`.${Wv}`)
                      .getAttribute(Nv.slidePosition);
                    e.forEach((t, e) => {
                      t.setAttribute(Nv.tabIndex, e === i ? "0" : "-1");
                    });
                  }
                }
                null !== this.flkty &&
                  ((this.flkty.options.draggable = !1),
                  this.flkty.updateDraggable()),
                  (this.a11y.state.trigger = t);
              });
            }),
            s.length &&
              s.forEach((t) => {
                t.addEventListener("click", (e) => {
                  e.preventDefault();
                  const i = t.closest(Hv),
                    s = i.querySelector(Ov);
                  i.classList.remove(zv),
                    s && (s.classList.remove(Rv), this.changeTabIndex(s)),
                    null !== this.flkty &&
                      ((this.flkty.options.draggable = !0),
                      this.flkty.updateDraggable()),
                    this.a11y.state.trigger.focus();
                });
              }),
            t.length &&
              t.forEach((t) => {
                if (t.querySelectorAll(_v).length > 1) {
                  const e = new i(t, {
                    prevNextButtons: !0,
                    contain: !0,
                    pageDots: !1,
                    wrapAround: !0,
                    on: {
                      change: (t) => {
                        e.cells.forEach((e, i) => {
                          e.element.querySelectorAll($v).forEach((e) => {
                            e.setAttribute(Nv.tabIndex, i === t ? "0" : "-1");
                          });
                        });
                      },
                    },
                  });
                }
              }),
            this.slider.addEventListener("keyup", (t) => {
              if (t.code === theme.keyboardKeys.ESCAPE) {
                const e = t.target.hasAttribute(Nv.slider)
                  ? t.target.querySelectorAll(Hv)
                  : t.target.closest(xv).querySelectorAll(Hv);
                e.length &&
                  (e.forEach((t) => {
                    const e = t.querySelector(Ov);
                    t.classList.remove(zv),
                      e && (e.classList.remove(Rv), this.changeTabIndex(e));
                  }),
                  this.flkty &&
                    ((this.flkty.options.draggable = !0),
                    this.flkty.updateDraggable())),
                  this.a11y.state.trigger.focus();
              }
            });
        }
        handleFocus() {
          const t = this.container.querySelectorAll(Hv);
          t.length &&
            t.forEach((t) => {
              const e = t.classList.contains(Wv),
                i = t.querySelector(Ov);
              e
                ? (this.changeTabIndex(t, "enable"),
                  i && this.changeTabIndex(i))
                : (this.changeTabIndex(t), i && i.classList.remove(Rv));
            });
        }
        listen() {
          this.slider &&
            (this.checkSlidesSize(),
            document.addEventListener(
              "theme:resize:width",
              this.checkSlidesSizeOnResize
            )),
            document.addEventListener("mousedown", this.clickOutsideItemEvent);
        }
        changeTabIndex(t, e = "") {
          const i = "enable" === e ? "0" : "-1";
          t.querySelectorAll($v).forEach((t) => {
            t.setAttribute(Nv.tabIndex, i);
          });
        }
        onBlockSelect(t) {
          if (null !== this.flkty) {
            const e = parseInt(
                [...t.target.parentNode.children].indexOf(t.target)
              ),
              i = parseInt(this.flkty.slides[0].cells.length),
              s = Math.floor(e / i);
            this.flkty.select(s);
          } else {
            const e =
                this.slider.currentStyle ||
                window.getComputedStyle(this.slider),
              i = parseInt(e.paddingLeft),
              s = t.target.offsetLeft - i;
            this.slider.scrollTo({ top: 0, left: s, behavior: "smooth" });
          }
        }
        onUnload() {
          document.removeEventListener(
            "theme:resize:width",
            this.checkSlidesSizeOnResize
          ),
            document.removeEventListener(
              "mousedown",
              this.clickOutsideItemEvent
            );
        }
        constructor(t) {
          (this.container = t.container),
            (this.flkty = null),
            (this.slider = this.container.querySelector(xv)),
            (this.checkSlidesSizeOnResize = () => this.checkSlidesSize()),
            (this.isFullWidth = this.container.hasAttribute(Nv.fullWidth)),
            (this.gutter = 0),
            (this.a11y = Ut),
            (this.clickOutsideItemEvent = (t) => {
              if (!t.target.matches(Hv) && !t.target.closest(Hv)) {
                const t = this.container.querySelectorAll(Hv);
                t.length &&
                  t.forEach((t) => {
                    const e = t.querySelector(Ov);
                    e && (e.classList.remove(Rv), this.changeTabIndex(e)),
                      t.classList.remove(zv);
                  });
              }
            }),
            this.bindButtons(),
            this.listen();
        }
      })(this);
    },
    onUnload(t) {
      Iv[this.id].onUnload(t);
    },
    onBlockSelect(t) {
      Iv[this.id].onBlockSelect(t);
    },
  };
  yt("shoppable-blog", Uv);
  const jv = "[data-scroll-down]",
    Kv = "[data-site-header]",
    Qv = "[data-slide]",
    Gv = "a, button",
    Xv = "[data-slider]",
    Jv = "data-style",
    Yv = "data-current-style",
    Zv = "tabindex",
    ty = "data-slide-position",
    ey = "site-header--fixed",
    iy = {};
  yt("slider", [
    {
      onLoad() {
        iy[this.id] = new (class {
          initSlider() {
            const t = this.container.querySelectorAll(Qv).length,
              e = parseInt(this.container.dataset.duration),
              s = "true" === this.container.dataset.pageDots && t > 1,
              o = "true" === this.container.dataset.navArrows && t > 1;
            let n = "true" === this.container.dataset.autoplay;
            if ((n && (n = e), t > 1))
              (this.flkty = new i(this.container, {
                fade: !0,
                cellSelector: Qv,
                autoPlay: n,
                wrapAround: !0,
                adaptiveHeight: !0,
                setGallerySize: !0,
                imagesLoaded: !0,
                pageDots: s,
                prevNextButtons: o,
                on: {
                  ready: () => {
                    const t = this.container
                      .querySelector(`${Qv}[${ty}="1"]`)
                      .getAttribute(Jv);
                    this.container.setAttribute(Yv, t),
                      requestAnimationFrame(this.resizeEvent),
                      document.addEventListener("theme:vars", this.resizeEvent);
                  },
                  change: (t) => {
                    const e = this.flkty.selectedElement.getAttribute(Jv);
                    this.container.setAttribute(Yv, e),
                      this.flkty.cells.forEach((e, i) => {
                        e.element.querySelectorAll(Gv).forEach((e) => {
                          e.setAttribute(Zv, i === t ? "0" : "-1");
                        });
                      });
                  },
                },
              })),
                ge(this.container);
            else if (1 === t) {
              const t = this.container.querySelector(Qv).getAttribute(Jv);
              this.container.setAttribute(Yv, t);
            }
          }
          bindScrollButton() {
            const t = this.container.querySelector(jv);
            t &&
              t.addEventListener("click", (t) => {
                t.preventDefault();
                const e = this.header.classList.contains(ey) ? 60 : 0,
                  i = parseInt(
                    Math.ceil(
                      this.container.offsetTop + this.container.offsetHeight - e
                    )
                  );
                window.scrollTo({ top: i, left: 0, behavior: "smooth" });
              });
          }
          onBlockSelect(t) {
            const e = parseInt(
              [...t.target.parentNode.children].indexOf(t.target)
            );
            null !== this.flkty &&
              (this.flkty.select(e), this.flkty.pausePlayer());
          }
          onBlockDeselect(t) {
            "true" === t.target.closest(Xv).dataset.autoplay &&
              null !== this.flkty &&
              this.flkty.playPlayer();
          }
          onReorder() {
            null !== this.flkty && this.flkty.resize();
          }
          onUnload() {
            null !== this.flkty &&
              (document.removeEventListener("theme:vars", this.resizeEvent),
              this.flkty.destroy(),
              (this.flkty = null));
          }
          constructor(t) {
            (this.container = t.container),
              (this.header = document.querySelector(Kv)),
              (this.flkty = null),
              (this.resizeEvent = () => {
                this.flkty.resize();
              }),
              this.initSlider(),
              this.bindScrollButton();
          }
        })(this);
      },
      onReorder(t) {
        iy[this.id].onReorder(t);
      },
      onUnload(t) {
        iy[this.id].onUnload(t);
      },
      onBlockSelect(t) {
        iy[this.id].onBlockSelect(t);
      },
      onBlockDeselect(t) {
        iy[this.id].onBlockDeselect(t);
      },
    },
    Hd,
    Bd,
  ]),
    yt("subcollections", Tp),
    yt("tab-collections", [us, Tp, Zo]);
  const sy = {},
    oy = "[data-slider]",
    ny = "[data-item]",
    ry = "flickity-enabled",
    ay = "data-section-id";
  yt("testimonials", {
    onLoad() {
      sy[this.id] = new (class {
        initSlider() {
          const t = this.slider.querySelectorAll(ny).length;
          let e = this.slider.classList.contains(ry);
          (2 == t && window.innerWidth >= theme.sizes.small) ||
          1 == t ||
          window.innerWidth < theme.sizes.small
            ? e && this.flkty.destroy()
            : ((this.flkty = new i(this.slider, {
                cellSelector: ny,
                prevNextButtons: !0,
                pageDots: !1,
                groupCells: !0,
                cellAlign: "left",
                contain: !0,
                adaptiveHeight: !1,
              })),
              this.flkty.resize(),
              this.flkty.slideableWidth > this.flkty.size.width ||
                this.flkty.destroy());
        }
        onBlockSelect(t) {
          if (null !== this.flkty) {
            const e = parseInt(
                [...t.target.parentNode.children].indexOf(t.target)
              ),
              i = parseInt(this.flkty.slides[0].cells.length),
              s = Math.floor(e / i);
            this.flkty.select(s);
          } else {
            const e =
                this.slider.currentStyle ||
                window.getComputedStyle(this.slider),
              i = parseInt(e.paddingLeft),
              s = t.target.offsetLeft - i;
            this.slider.scrollTo({ top: 0, left: s, behavior: "smooth" });
          }
        }
        onUnload() {
          document.removeEventListener(
            "theme:resize:width",
            this.sliderResizeEvent
          );
        }
        constructor(t) {
          (this.container = t.container),
            (this.sectionId = this.container.getAttribute(ay)),
            (this.slider = this.container.querySelector(oy)),
            (this.sliderResizeEvent = () => this.initSlider()),
            (this.flkty = null),
            this.initSlider(),
            document.addEventListener(
              "theme:resize:width",
              this.sliderResizeEvent
            );
        }
      })(this);
    },
    onUnload(t) {
      sy[this.id].onUnload(t);
    },
    onBlockSelect(t) {
      sy[this.id].onBlockSelect(t);
    },
  });
  const ly = "no-outline",
    cy = "[data-skip-content]",
    hy = 'a[href="#"]';
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${(() => {
      const t = document.createElement("div");
      (t.style.visibility = "hidden"),
        (t.style.overflow = "scroll"),
        (t.style.msOverflowStyle = "scrollbar"),
        document.body.appendChild(t);
      const e = document.createElement("div");
      t.appendChild(e);
      const i = t.offsetWidth - e.offsetWidth;
      return t.parentNode.removeChild(t), i;
    })()}px`
  ),
    document.addEventListener("DOMContentLoaded", function () {
      ft("*"),
        new (class {
          init() {
            (this.body = document.body),
              (this.inPageLink = document.querySelector(cy)),
              (this.linkesWithOnlyHash = document.querySelectorAll(hy)),
              (this.isFocused = !1),
              this.focusHash(),
              this.bindInPageLinks(),
              this.clickEvents(),
              this.focusEvents(),
              this.focusEventsOff();
          }
          clickEvents() {
            this.inPageLink &&
              this.inPageLink.addEventListener("click", (t) => {
                t.preventDefault();
              }),
              this.linkesWithOnlyHash &&
                this.linkesWithOnlyHash.forEach((t) => {
                  t.addEventListener("click", (t) => {
                    t.preventDefault();
                  });
                });
          }
          focusEvents() {
            document.addEventListener("keyup", (t) => {
              t.code === theme.keyboardKeys.TAB &&
                (this.body.classList.remove(ly), (this.isFocused = !0));
            });
          }
          focusEventsOff() {
            document.addEventListener("mousedown", () => {
              this.body.classList.add(ly), (this.isFocused = !1);
            });
          }
          forceFocus(t, e) {
            e = e || {};
            var i = t.tabIndex;
            (t.tabIndex = -1),
              (t.dataset.tabIndex = i),
              t.focus(),
              void 0 !== e.className && t.classList.add(e.className),
              t.addEventListener("blur", function s(o) {
                o.target.removeEventListener(o.type, s),
                  (t.tabIndex = i),
                  delete t.dataset.tabIndex,
                  void 0 !== e.className && t.classList.remove(e.className);
              });
          }
          focusHash(t) {
            t = t || {};
            let e = window.location.hash;
            void 0 !== theme.settings.newHash &&
              ((e = theme.settings.newHash), (window.location.hash = `#${e}`));
            const i = document.getElementById(e.slice(1));
            if (i && t.ignore && i.matches(t.ignore)) return !1;
            e && i && this.forceFocus(i, t);
          }
          bindInPageLinks(t) {
            return (
              (t = t || {}),
              Array.prototype.slice
                .call(document.querySelectorAll('a[href^="#"]'))
                .filter((e) => {
                  if ("#" === e.hash || "" === e.hash) return !1;
                  if (t.ignore && e.matches(t.ignore)) return !1;
                  if (
                    ((i = e.hash.substr(1)),
                    null === document.getElementById(i))
                  )
                    return !1;
                  var i,
                    s = document.querySelector(e.hash);
                  return (
                    !!s &&
                    (e.addEventListener("click", () => {
                      this.forceFocus(s, t);
                    }),
                    !0)
                  );
                })
            );
          }
          constructor() {
            this.init();
          }
        })(),
        !customElements.get("product-grid-item-swatch") &&
          window.theme.settings.enableColorSwatchesCollection &&
          customElements.define("product-grid-item-swatch", Gi);
      "scrollBehavior" in document.documentElement.style ||
        Kt({ url: theme.assets.smoothscroll });
    });
})(
  themeVendor.ScrollLock,
  themeVendor.AOS,
  themeVendor.Flickity,
  themeVendor.themeCurrency,
  themeVendor.ajaxinate
);