/*! Magnific Popup - v0.9.9 - 2013-11-15
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2013 Dmitry Semenov; */
(function(e) {
    var t, n, i, o, r, a, s, l = "Close",
        c = "BeforeClose",
        d = "AfterClose",
        u = "BeforeAppend",
        p = "MarkupParse",
        f = "Open",
        m = "Change",
        g = "mfp",
        v = "." + g,
        h = "mfp-ready",
        C = "mfp-removing",
        y = "mfp-prevent-close",
        w = function() {},
        b = !!window.jQuery,
        I = e(window),
        x = function(e, n) { t.ev.on(g + e + v, n) },
        k = function(t, n, i, o) { var r = document.createElement("div"); return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r },
        T = function(n, i) { t.ev.triggerHandler(g + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i])) },
        E = function(n) { return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn },
        _ = function() { e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t) },
        S = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    w.prototype = {
        constructor: w,
        init: function() {
            var n = navigator.appVersion;
            t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = S(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document.body), o = e(document), t.popupsCache = {}
        },
        open: function(n) {
            var i;
            if (n.isObj === !1) {
                t.items = n.items.toArray(), t.index = 0;
                var r, s = n.items;
                for (i = 0; s.length > i; i++)
                    if (r = s[i], r.parsed && (r = r.el[0]), r === n.el[0]) { t.index = i; break }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (t.isOpen) return t.updateItemHTML(), void 0;
            t.types = [], a = "", t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : o, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = k("bg").on("click" + v, function() { t.close() }), t.wrap = k("wrap").attr("tabindex", -1).on("click" + v, function(e) { t._checkIfClose(e.target) && t.close() }), t.container = k("container", t.wrap)), t.contentContainer = k("content"), t.st.preloader && (t.preloader = k("preloader", t.container, t.st.tLoading));
            var l = e.magnificPopup.modules;
            for (i = 0; l.length > i; i++) {
                var c = l[i];
                c = c.charAt(0).toUpperCase() + c.slice(1), t["init" + c].call(t)
            }
            T("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(p, function(e, t, n, i) { n.close_replaceWith = E(i.type) }), a += " mfp-close-btn-in") : t.wrap.append(E())), t.st.alignTop && (a += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({ overflow: t.st.overflowY, overflowX: "hidden", overflowY: t.st.overflowY }) : t.wrap.css({ top: I.scrollTop(), position: "absolute" }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({ height: o.height(), position: "absolute" }), t.st.enableEscapeKey && o.on("keyup" + v, function(e) { 27 === e.keyCode && t.close() }), I.on("resize" + v, function() { t.updateSize() }), t.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && t.wrap.addClass(a);
            var d = t.wH = I.height(),
                u = {};
            if (t.fixedContentPos && t._hasScrollBar(d)) {
                var m = t._getScrollbarSize();
                m && (u.marginRight = m)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : u.overflow = "hidden");
            var g = t.st.mainClass;
            return t.isIE7 && (g += " mfp-ie7"), g && t._addClassToMFP(g), t.updateItemHTML(), T("BuildControls"), e("html").css(u), t.bgOverlay.add(t.wrap).prependTo(document.body), t._lastFocusedEl = document.activeElement, setTimeout(function() { t.content ? (t._addClassToMFP(h), t._setFocus()) : t.bgOverlay.addClass(h), o.on("focusin" + v, t._onFocusIn) }, 16), t.isOpen = !0, t.updateSize(d), T(f), n
        },
        close: function() { t.isOpen && (T(c), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(C), setTimeout(function() { t._close() }, t.st.removalDelay)) : t._close()) },
        _close: function() {
            T(l);
            var n = C + " " + h + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                var i = { marginRight: "" };
                t.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
            }
            o.off("keyup" + v + " focusin" + v), t.ev.off(v), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, T(d)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || I.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), T("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                var o = t.st[i] ? t.st[i].markup : !1;
                T("FirstMarkupParse", o), t.currTemplate[i] = o ? e(o) : !0
            }
            r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(a, i), n.preloaded = !0, T(m, n), r = n.type, t.container.prepend(t.contentContainer), T("AfterChange")
        },
        appendContent: function(e, n) { t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(E()) : t.content = e : t.content = "", T(u), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content) },
        parseEl: function(n) {
            var i = t.items[n],
                o = i.type;
            if (i = i.tagName ? { el: e(i) } : { data: i, src: i.src }, i.el) {
                for (var r = t.types, a = 0; r.length > a; a++)
                    if (i.el.hasClass("mfp-" + r[a])) { o = r[a]; break }
                i.src = i.el.attr("data-mfp-src"), i.src || (i.src = i.el.attr("href"))
            }
            return i.type = o || t.st.type || "inline", i.index = n, i.parsed = !0, t.items[n] = i, T("ElementParse", i), t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) { i.mfpEl = this, t._openClick(i, e, n) };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
            if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
                var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) { if (!a.call(t)) return !0 } else if (a > I.width()) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
                var o = { status: e, text: i };
                T("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function(e) { e.stopImmediatePropagation() }), t.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(y)) {
                var i = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (i && o) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) { if (i) return !0 } else if (o && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) { t.bgOverlay.addClass(e), t.wrap.addClass(e) },
        _removeClassFromMFP: function(e) { this.bgOverlay.removeClass(e), t.wrap.removeClass(e) },
        _hasScrollBar: function(e) { return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || I.height()) },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) { return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1) },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)), T(p, [t, n, i]), e.each(n, function(e, n) { if (void 0 === n || n === !1) return !0; if (o = e.split("_"), o.length > 1) { var i = t.find(v + "-" + o[0]); if (i.length > 0) { var r = o[1]; "replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n) } } else t.find(v + "-" + e).html(n) })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.id = "mfp-sbm", e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = { instance: null, proto: w.prototype, modules: [], open: function(t, n) { return _(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t) }, close: function() { return e.magnificPopup.instance && e.magnificPopup.instance.close() }, registerModule: function(t, n) { n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t) }, defaults: { disableOn: 0, key: null, midClick: !1, mainClass: "", preloader: !0, focus: "", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 0, fixedContentPos: "auto", fixedBgPos: "auto", overflowY: "auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>', tClose: "Close (Esc)", tLoading: "Loading..." } }, e.fn.magnificPopup = function(n) {
        _();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = b ? i.data("magnificPopup") : i[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({ mfpEl: o }, i, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else n = e.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var P, O, z, M = "inline",
        B = function() { z && (O.after(z.addClass(P)).detach(), z = null) };
    e.magnificPopup.registerModule(M, {
        options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
        proto: {
            initInline: function() { t.types.push(M), x(l + "." + M, function() { B() }) },
            getInline: function(n, i) {
                if (B(), n.src) {
                    var o = t.st.inline,
                        r = e(n.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (O || (P = o.hiddenClass, O = k(P), P = "mfp-" + P), z = r.after(O).detach().removeClass(P)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                    return n.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
            }
        }
    });
    var F, H = "ajax",
        L = function() { F && i.removeClass(F) },
        A = function() { L(), t.req && t.req.abort() };
    e.magnificPopup.registerModule(H, {
        options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
        proto: {
            initAjax: function() { t.types.push(H), F = t.st.ajax.cursor, x(l + "." + H, A), x("BeforeChange." + H, A) },
            getAjax: function(n) {
                F && i.addClass(F), t.updateStatus("loading");
                var o = e.extend({
                    url: n.src,
                    success: function(i, o, r) {
                        var a = { data: i, xhr: r };
                        T("ParseAjax", a), t.appendContent(e(a.data), H), n.finished = !0, L(), t._setFocus(), setTimeout(function() { t.wrap.addClass(h) }, 16), t.updateStatus("ready"), T("AjaxContentAdded")
                    },
                    error: function() { L(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src)) }
                }, t.st.ajax.settings);
                return t.req = e.ajax(o), ""
            }
        }
    });
    var j, N = function(n) { if (n.data && void 0 !== n.data.title) return n.data.title; var i = t.st.image.titleSrc; if (i) { if (e.isFunction(i)) return i.call(t, n); if (n.el) return n.el.attr(i) || "" } return "" };
    e.magnificPopup.registerModule("image", {
        options: { markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>', cursor: "mfp-zoom-out-cur", titleSrc: "title", verticalFit: !0, tError: '<a href="%url%">The image</a> could not be loaded.' },
        proto: {
            initImage: function() {
                var e = t.st.image,
                    n = ".image";
                t.types.push("image"), x(f + n, function() { "image" === t.currItem.type && e.cursor && i.addClass(e.cursor) }), x(l + n, function() { e.cursor && i.removeClass(e.cursor), I.off("resize" + v) }), x("Resize" + n, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) { e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1)) },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    o = function(r) { j && clearInterval(j), j = setInterval(function() { return i.naturalWidth > 0 ? (t._onImageHasSize(e), void 0) : (n > 200 && clearInterval(j), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500), void 0) }, r) };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0,
                    r = function() { n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, T("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a())) },
                    a = function() { n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0) },
                    s = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", n.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), n.img[0].naturalWidth > 0 && (n.hasSize = !0)
                }
                return t._parseMarkup(i, { title: N(n), img_replaceWith: n.img }, n), t.resizeImage(), n.hasSize ? (j && clearInterval(j), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
            }
        }
    });
    var W, R = function() { return void 0 === W && (W = void 0 !== document.createElement("p").style.MozTransform), W };
    e.magnificPopup.registerModule("zoom", {
        options: { enabled: !1, easing: "ease-in-out", duration: 300, opener: function(e) { return e.is("img") ? e : e.find("img") } },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, a = n.duration,
                        s = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                o = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
                        },
                        d = function() { t.content.css("visibility", "visible") };
                    x("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return d(), void 0;
                            r = s(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function() { r.css(t._getOffset(!0)), o = setTimeout(function() { d(), setTimeout(function() { r.remove(), e = r = null, T("ZoomAnimationEnded") }, 16) }, a) }, 16)
                        }
                    }), x(c + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                r = s(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() { r.css(t._getOffset()) }, 16)
                        }
                    }), x(l + i, function() { t._allowZoom() && (d(), r && r.remove(), e = null) })
                }
            },
            _allowZoom: function() { return "image" === t.currItem.type },
            _getItemToZoom: function() { return t.currItem.hasSize ? t.currItem.img : !1 },
            _getOffset: function(n) {
                var i;
                i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var o = i.offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    a = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var s = { width: i.width(), height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r };
                return R() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
            }
        }
    });
    var Z = "iframe",
        q = "//about:blank",
        D = function(e) {
            if (t.currTemplate[Z]) {
                var n = t.currTemplate[Z].find("iframe");
                n.length && (e || (n[0].src = q), t.isIE8 && n.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(Z, {
        options: { markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>', srcAction: "iframe_src", patterns: { youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" }, vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" }, gmaps: { index: "//maps.google.", src: "%id%&output=embed" } } },
        proto: {
            initIframe: function() { t.types.push(Z), x("BeforeChange", function(e, t, n) { t !== n && (t === Z ? D() : n === Z && D(!0)) }), x(l + "." + Z, function() { D() }) },
            getIframe: function(n, i) {
                var o = n.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() { return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0 });
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
            }
        }
    });
    var K = function(e) { var n = t.items.length; return e > n - 1 ? e - n : 0 > e ? n + e : e },
        Y = function(e, t, n) { return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n) };
    e.magnificPopup.registerModule("gallery", {
        options: { enabled: !1, arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', preload: [0, 2], navigateByImgClick: !0, arrows: !0, tPrev: "Previous (Left arrow key)", tNext: "Next (Right arrow key)", tCounter: "%curr% of %total%" },
        proto: {
            initGallery: function() {
                var n = t.st.gallery,
                    i = ".mfp-gallery",
                    r = Boolean(e.fn.mfpFastClick);
                return t.direction = !0, n && n.enabled ? (a += " mfp-gallery", x(f + i, function() { n.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function() { return t.items.length > 1 ? (t.next(), !1) : void 0 }), o.on("keydown" + i, function(e) { 37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next() }) }), x("UpdateStatus" + i, function(e, n) { n.text && (n.text = Y(n.text, t.currItem.index, t.items.length)) }), x(p + i, function(e, i, o, r) {
                    var a = t.items.length;
                    o.counter = a > 1 ? Y(n.tCounter, r.index, a) : ""
                }), x("BuildControls" + i, function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var i = n.arrowMarkup,
                            o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            a = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
                            s = r ? "mfpFastClick" : "click";
                        o[s](function() { t.prev() }), a[s](function() { t.next() }), t.isIE7 && (k("b", o[0], !1, !0), k("a", o[0], !1, !0), k("b", a[0], !1, !0), k("a", a[0], !1, !0)), t.container.append(o.add(a))
                    }
                }), x(m + i, function() { t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() { t.preloadNearbyImages(), t._preloadTimeout = null }, 16) }), x(l + i, function() { o.off(i), t.wrap.off("click" + i), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null }), void 0) : !1
            },
            next: function() { t.direction = !0, t.index = K(t.index + 1), t.updateItemHTML() },
            prev: function() { t.direction = !1, t.index = K(t.index - 1), t.updateItemHTML() },
            goTo: function(e) { t.direction = e >= t.index, t.index = e, t.updateItemHTML() },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    i = Math.min(n[0], t.items.length),
                    o = Math.min(n[1], t.items.length);
                for (e = 1;
                    (t.direction ? o : i) >= e; e++) t._preloadItem(t.index + e);
                for (e = 1;
                    (t.direction ? i : o) >= e; e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = K(n), !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)), T("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function() { i.hasSize = !0 }).on("error.mfploader", function() { i.hasSize = !0, i.loadError = !0, T("LazyLoadError", i) }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    e.magnificPopup.registerModule(U, {
            options: { replaceSrc: function(e) { return e.src.replace(/\.\w+$/, function(e) { return "@2x" + e }) }, ratio: 1 },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var e = t.st.retina,
                            n = e.ratio;
                        n = isNaN(n) ? n() : n, n > 1 && (x("ImageHasSize." + U, function(e, t) { t.img.css({ "max-width": t.img[0].naturalWidth / n, width: "100%" }) }), x("ElementParse." + U, function(t, i) { i.src = e.replaceSrc(i, n) }))
                    }
                }
            }
        }),
        function() {
            var t = 1e3,
                n = "ontouchstart" in window,
                i = function() { I.off("touchmove" + r + " touchend" + r) },
                o = "mfpFastClick",
                r = "." + o;
            e.fn.mfpFastClick = function(o) {
                return e(this).each(function() {
                    var a, s = e(this);
                    if (n) {
                        var l, c, d, u, p, f;
                        s.on("touchstart" + r, function(e) { u = !1, f = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, d = p.clientY, I.on("touchmove" + r, function(e) { p = e.originalEvent ? e.originalEvent.touches : e.touches, f = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - d) > 10) && (u = !0, i()) }).on("touchend" + r, function(e) { i(), u || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function() { a = !1 }, t), o()) }) })
                    }
                    s.on("click" + r, function() { a || o() })
                })
            }, e.fn.destroyMfpFastClick = function() { e(this).off("touchstart" + r + " click" + r), n && I.off("touchmove" + r + " touchend" + r) }
        }(), _()
})(window.jQuery || window.Zepto);







/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */
! function(t, e) { "use strict"; "function" == typeof define && define.amd ? define(function() { return e() }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = -1 == t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; g > e; e++) {
            var i = a[e];
            t[i] = 0
        }
        return t
    }

    function r(t) { var e = getComputedStyle(t); return e || h("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e }

    function o() {
        if (!u) {
            u = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = r(e);
            n.isBoxSizeOuter = d = 200 == t(o.width), i.removeChild(e)
        }
    }

    function n(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var n = r(e);
            if ("none" == n.display) return i();
            var h = {};
            h.width = e.offsetWidth, h.height = e.offsetHeight;
            for (var u = h.isBorderBox = "border-box" == n.boxSizing, p = 0; g > p; p++) {
                var f = a[p],
                    m = n[f],
                    s = parseFloat(m);
                h[f] = isNaN(s) ? 0 : s
            }
            var c = h.paddingLeft + h.paddingRight,
                l = h.paddingTop + h.paddingBottom,
                b = h.marginLeft + h.marginRight,
                x = h.marginTop + h.marginBottom,
                y = h.borderLeftWidth + h.borderRightWidth,
                v = h.borderTopWidth + h.borderBottomWidth,
                W = u && d,
                w = t(n.width);
            w !== !1 && (h.width = w + (W ? 0 : c + y));
            var B = t(n.height);
            return B !== !1 && (h.height = B + (W ? 0 : l + v)), h.innerWidth = h.width - (c + y), h.innerHeight = h.height - (l + v), h.outerWidth = h.width + b, h.outerHeight = h.height + x, h
        }
    }
    var d, h = "undefined" == typeof console ? e : function(t) { console.error(t) },
        a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        g = a.length,
        u = !1;
    return n
});
! function(e, t) { "use strict"; "function" == typeof define && define.amd ? define(t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t() }(window, function() {
    "use strict";
    var e = function() {
        var e = Element.prototype;
        if (e.matches) return "matches";
        if (e.matchesSelector) return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], r = 0; r < t.length; r++) {
            var o = t[r],
                n = o + "MatchesSelector";
            if (e[n]) return n
        }
    }();
    return function(t, r) { return t[e](r) }
});
! function(t, e) { "function" == typeof define && define.amd ? define(e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }("undefined" != typeof window ? window : this, function() {
    "use strict";

    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var n = this._events = this._events || {},
                i = n[t] = n[t] || [];
            return -1 == i.indexOf(e) && i.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var n = this._onceEvents = this._onceEvents || {},
                i = n[t] = n[t] || {};
            return i[e] = !0, this
        }
    }, e.off = function(t, e) { var n = this._events && this._events[t]; if (n && n.length) { var i = n.indexOf(e); return -1 != i && n.splice(i, 1), this } }, e.emitEvent = function(t, e) {
        var n = this._events && this._events[t];
        if (n && n.length) {
            var i = 0,
                s = n[i];
            e = e || [];
            for (var o = this._onceEvents && this._onceEvents[t]; s;) {
                var f = o && o[s];
                f && (this.off(t, s), delete o[s]), s.apply(this, e), i += f ? 0 : 1, s = n[i]
            }
            return this
        }
    }, t
});
! function(e, t) { "function" == typeof define && define.amd ? define(["desandro-matches-selector/matches-selector"], function(r) { return t(e, r) }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector) }(window, function(e, t) {
    "use strict";
    var r = {};
    r.extend = function(e, t) { for (var r in t) e[r] = t[r]; return e }, r.modulo = function(e, t) { return (e % t + t) % t }, r.makeArray = function(e) {
        var t = [];
        if (Array.isArray(e)) t = e;
        else if (e && "number" == typeof e.length)
            for (var r = 0; r < e.length; r++) t.push(e[r]);
        else t.push(e);
        return t
    }, r.removeFrom = function(e, t) { var r = e.indexOf(t); - 1 != r && e.splice(r, 1) }, r.getParent = function(e, r) {
        for (; e != document.body;)
            if (e = e.parentNode, t(e, r)) return e
    }, r.getQueryElement = function(e) { return "string" == typeof e ? document.querySelector(e) : e }, r.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.filterFindElements = function(e, n) {
        e = r.makeArray(e);
        var o = [];
        return e.forEach(function(e) {
            if (e instanceof HTMLElement) {
                if (!n) return void o.push(e);
                t(e, n) && o.push(e);
                for (var r = e.querySelectorAll(n), u = 0; u < r.length; u++) o.push(r[u])
            }
        }), o
    }, r.debounceMethod = function(e, t, r) {
        var n = e.prototype[t],
            o = t + "Timeout";
        e.prototype[t] = function() {
            var e = this[o];
            e && clearTimeout(e);
            var t = arguments,
                u = this;
            this[o] = setTimeout(function() { n.apply(u, t), delete u[o] }, r || 100)
        }
    }, r.docReady = function(e) { var t = document.readyState; "complete" == t || "interactive" == t ? e() : document.addEventListener("DOMContentLoaded", e) }, r.toDashed = function(e) { return e.replace(/(.)([A-Z])/g, function(e, t, r) { return t + "-" + r }).toLowerCase() };
    var n = e.console;
    return r.htmlInit = function(t, o) {
        r.docReady(function() {
            var u = r.toDashed(o),
                a = "data-" + u,
                i = document.querySelectorAll("[" + a + "]"),
                c = document.querySelectorAll(".js-" + u),
                f = r.makeArray(i).concat(r.makeArray(c)),
                d = a + "-options",
                s = e.jQuery;
            f.forEach(function(e) {
                var r, u = e.getAttribute(a) || e.getAttribute(d);
                try { r = u && JSON.parse(u) } catch (i) { return void(n && n.error("Error parsing " + a + " on " + e.className + ": " + i)) }
                var c = new t(e, r);
                s && s.data(e, o, c)
            })
        })
    }, r
});
! function(t, n) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], function(i) { n(t, i) }) : "object" == typeof module && module.exports ? module.exports = n(t, require("jquery")) : t.jQueryBridget = n(t, t.jQuery) }(window, function(t, n) {
    "use strict";

    function i(i, r, a) {
        function f(t, n, e) {
            var o, r = "$()." + i + '("' + n + '")';
            return t.each(function(t, f) {
                var c = a.data(f, i);
                if (!c) return void u(i + " not initialized. Cannot call methods, i.e. " + r);
                var d = c[n];
                if (!d || "_" == n.charAt(0)) return void u(r + " is not a valid method");
                var p = d.apply(c, e);
                o = void 0 === o ? p : o
            }), void 0 !== o ? o : t
        }

        function c(t, n) {
            t.each(function(t, e) {
                var o = a.data(e, i);
                o ? (o.option(n), o._init()) : (o = new r(e, n), a.data(e, i, o))
            })
        }
        a = a || n || t.jQuery, a && (r.prototype.option || (r.prototype.option = function(t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[i] = function(t) { if ("string" == typeof t) { var n = o.call(arguments, 1); return f(this, t, n) } return c(this, t), this }, e(a))
    }

    function e(t) {!t || t && t.bridget || (t.bridget = i) }
    var o = Array.prototype.slice,
        r = t.console,
        u = "undefined" == typeof r ? function() {} : function(t) { r.error(t) };
    return e(n || t.jQuery), i
});
! function(t, i) { "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter", "get-size/get-size"], i) : "object" == typeof module && module.exports ? module.exports = i(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = i(t.EvEmitter, t.getSize)) }(window, function(t, i) {
    "use strict";

    function n(t) { for (var i in t) return !1; return i = null, !0 }

    function o(t, i) { t && (this.element = t, this.layout = i, this.position = { x: 0, y: 0 }, this._create()) }

    function e(t) { return t.replace(/([A-Z])/g, function(t) { return "-" + t.toLowerCase() }) }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        h = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[r],
        l = { transform: a, transition: r, transitionDuration: r + "Duration", transitionProperty: r + "Property", transitionDelay: r + "Delay" },
        u = o.prototype = Object.create(t.prototype);
    u.constructor = o, u._create = function() { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, u.handleEvent = function(t) {
        var i = "on" + t.type;
        this[i] && this[i](t)
    }, u.getSize = function() { this.size = i(this.element) }, u.css = function(t) {
        var i = this.element.style;
        for (var n in t) {
            var o = l[n] || n;
            i[o] = t[n]
        }
    }, u.getPosition = function() {
        var t = getComputedStyle(this.element),
            i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"),
            o = t[i ? "left" : "right"],
            e = t[n ? "top" : "bottom"],
            s = this.layout.size,
            r = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.width : parseInt(o, 10),
            a = -1 != e.indexOf("%") ? parseFloat(e) / 100 * s.height : parseInt(e, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= i ? s.paddingLeft : s.paddingRight, a -= n ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, u.layoutPosition = function() {
        var t = this.layout.size,
            i = {},
            n = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            e = n ? "paddingLeft" : "paddingRight",
            s = n ? "left" : "right",
            r = n ? "right" : "left",
            a = this.position.x + t[e];
        i[s] = this.getXValue(a), i[r] = "";
        var h = o ? "paddingTop" : "paddingBottom",
            l = o ? "top" : "bottom",
            u = o ? "bottom" : "top",
            d = this.position.y + t[h];
        i[l] = this.getYValue(d), i[u] = "", this.css(i), this.emitEvent("layout", [this])
    }, u.getXValue = function(t) { var i = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !i ? t / this.layout.size.width * 100 + "%" : t + "px" }, u.getYValue = function(t) { var i = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && i ? t / this.layout.size.height * 100 + "%" : t + "px" }, u._transitionTo = function(t, i) {
        this.getPosition();
        var n = this.position.x,
            o = this.position.y,
            e = parseInt(t, 10),
            s = parseInt(i, 10),
            r = e === this.position.x && s === this.position.y;
        if (this.setPosition(t, i), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - n,
            h = i - o,
            l = {};
        l.transform = this.getTranslate(a, h), this.transition({ to: l, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 })
    }, u.getTranslate = function(t, i) {
        var n = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return t = n ? t : -t, i = o ? i : -i, "translate3d(" + t + "px, " + i + "px, 0)"
    }, u.goTo = function(t, i) { this.setPosition(t, i), this.layoutPosition() }, u.moveTo = u._transitionTo, u.setPosition = function(t, i) { this.position.x = parseInt(t, 10), this.position.y = parseInt(i, 10) }, u._nonTransition = function(t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var i in t.onTransitionEnd) t.onTransitionEnd[i].call(this) }, u.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var i = this._transn;
        for (var n in t.onTransitionEnd) i.onEnd[n] = t.onTransitionEnd[n];
        for (n in t.to) i.ingProperties[n] = !0, t.isCleaning && (i.clean[n] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var d = "opacity," + e(a);
    u.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: d, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(h, this, !1)
        }
    }, u.onwebkitTransitionEnd = function(t) { this.ontransitionend(t) }, u.onotransitionend = function(t) { this.ontransitionend(t) };
    var p = { "-webkit-transform": "transform" };
    u.ontransitionend = function(t) {
        if (t.target === this.element) {
            var i = this._transn,
                o = p[t.propertyName] || t.propertyName;
            if (delete i.ingProperties[o], n(i.ingProperties) && this.disableTransition(), o in i.clean && (this.element.style[t.propertyName] = "", delete i.clean[o]), o in i.onEnd) {
                var e = i.onEnd[o];
                e.call(this), delete i.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, u.disableTransition = function() { this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1 }, u._removeStyles = function(t) {
        var i = {};
        for (var n in t) i[n] = "";
        this.css(i)
    };
    var f = { transitionProperty: "", transitionDuration: "", transitionDelay: "" };
    return u.removeTransitionStyles = function() { this.css(f) }, u.stagger = function(t) { t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms" }, u.removeElem = function() { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, u.remove = function() { return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() { this.removeElem() }), void this.hide()) : void this.removeElem() }, u.reveal = function() {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
            i = {},
            n = this.getHideRevealTransitionEndProperty("visibleStyle");
        i[n] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: i })
    }, u.onRevealTransitionEnd = function() { this.isHidden || this.emitEvent("reveal") }, u.getHideRevealTransitionEndProperty = function(t) { var i = this.layout.options[t]; if (i.opacity) return "opacity"; for (var n in i) return n }, u.hide = function() {
        this.isHidden = !0, this.css({ display: "" });
        var t = this.layout.options,
            i = {},
            n = this.getHideRevealTransitionEndProperty("hiddenStyle");
        i[n] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: i })
    }, u.onHideTransitionEnd = function() { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, u.destroy = function() { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, o
});
! function(t, e) { "use strict"; "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, s, o) { return e(t, i, n, s, o) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function(t, e, i, n, s) {
    "use strict";

    function o(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
        var s = ++c;
        this.element.outlayerGUID = s, f[s] = this, this._create();
        var o = this._getOption("initLayout");
        o && this.layout()
    }

    function r(t) {
        function e() { t.apply(this, arguments) }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var s = d[n] || 1;
        return i * s
    }
    var h = t.console,
        u = t.jQuery,
        m = function() {},
        c = 0,
        f = {};
    o.namespace = "outlayer", o.Item = s, o.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } };
    var l = o.prototype;
    n.extend(l, e.prototype), l.option = function(t) { n.extend(this.options, t) }, l._getOption = function(t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, o.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, l._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, l.reloadItems = function() { this.items = this._itemize(this.element.children) }, l._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], s = 0; s < e.length; s++) {
            var o = e[s],
                r = new i(o, this);
            n.push(r)
        }
        return n
    }, l._filterFindItemElements = function(t) { return n.filterFindElements(t, this.options.itemSelector) }, l.getItemElements = function() { return this.items.map(function(t) { return t.element }) }, l.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, l._init = l.layout, l._resetLayout = function() { this.getSize() }, l.getSize = function() { this.size = i(this.element) }, l._getMeasurement = function(t, e) {
        var n, s = this.options[t];
        s ? ("string" == typeof s ? n = this.element.querySelector(s) : s instanceof HTMLElement && (n = s), this[t] = n ? i(n)[e] : s) : this[t] = 0
    }, l.layoutItems = function(t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, l._getItemsForLayout = function(t) { return t.filter(function(t) { return !t.isIgnored }) }, l._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, l._getItemLayoutPosition = function() { return { x: 0, y: 0 } }, l._processLayoutQueue = function(t) { this.updateStagger(), t.forEach(function(t, e) { this._positionItem(t.item, t.x, t.y, t.isInstant, e) }, this) }, l.updateStagger = function() { var t = this.options.stagger; return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger) }, l._positionItem = function(t, e, i, n, s) { n ? t.goTo(e, i) : (t.stagger(s * this.stagger), t.moveTo(e, i)) }, l._postLayout = function() { this.resizeContainer() }, l.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, l._getContainerSize = m, l._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, l._emitCompleteOnItems = function(t, e) {
        function i() { s.dispatchEvent(t + "Complete", null, [e]) }

        function n() { r++, r == o && i() }
        var s = this,
            o = e.length;
        if (!e || !o) return void i();
        var r = 0;
        e.forEach(function(e) { e.once(t, n) })
    }, l.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), u)
            if (this.$element = this.$element || u(this.element), e) {
                var s = u.Event(e);
                s.type = t, this.$element.trigger(s, i)
            } else this.$element.trigger(t, i)
    }, l.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, l.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, l.stamp = function(t) { t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this)) }, l.unstamp = function(t) { t = this._find(t), t && t.forEach(function(t) { n.removeFrom(this.stamps, t), this.unignore(t) }, this) }, l._find = function(t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0 }, l._manageStamps = function() { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, l._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) }
    }, l._manageStamp = m, l._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            n = this._boundingRect,
            s = i(t),
            o = { left: e.left - n.left - s.marginLeft, top: e.top - n.top - s.marginTop, right: n.right - e.right - s.marginRight, bottom: n.bottom - e.bottom - s.marginBottom };
        return o
    }, l.handleEvent = n.handleEvent, l.bindResize = function() { t.addEventListener("resize", this), this.isResizeBound = !0 }, l.unbindResize = function() { t.removeEventListener("resize", this), this.isResizeBound = !1 }, l.onresize = function() { this.resize() }, n.debounceMethod(o, "onresize", 100), l.resize = function() { this.isResizeBound && this.needsResizeLayout() && this.layout() }, l.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, l.addItems = function(t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, l.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, l.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) { t.stagger(i * e), t.reveal() })
        }
    }, l.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) { t.stagger(i * e), t.hide() })
        }
    }, l.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, l.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, l.getItem = function(t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, l.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, l.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) { t.remove(), n.removeFrom(this.items, t) }, this)
    }, l.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) { t.destroy() }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, o.data = function(t) { t = n.getQueryElement(t); var e = t && t.outlayerGUID; return e && f[e] }, o.create = function(t, e) { var i = r(o); return i.defaults = n.extend({}, o.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, o.compatOptions), i.namespace = t, i.data = o.data, i.Item = r(s), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i };
    var d = { ms: 1, s: 1e3 };
    return o.Item = s, o
});
! function(e, t) { "function" == typeof define && define.amd ? define(["get-size/get-size", "outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.LayoutMode = t(e.getSize, e.Outlayer)) }(window, function(e, t) {
    "use strict";

    function i(e) { this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, this.items = e.filteredItems, this.size = e.size) }
    var o = i.prototype,
        s = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return s.forEach(function(e) { o[e] = function() { return t.prototype[e].apply(this.isotope, arguments) } }), o.needsVerticalResizeLayout = function() {
        var t = e(this.isotope.element),
            i = this.isotope.size && t;
        return i && t.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() { this.isotope._getMeasurement.apply(this, arguments) }, o.getColumnWidth = function() { this.getSegmentSize("column", "Width") }, o.getRowHeight = function() { this.getSegmentSize("row", "Height") }, o.getSegmentSize = function(e, t) {
        var i = e + t,
            o = "outer" + t;
        if (this._getMeasurement(i, o), !this[i]) {
            var s = this.getFirstItemSize();
            this[i] = s && s[o] || this.isotope.size["inner" + t]
        }
    }, o.getFirstItemSize = function() { var t = this.isotope.filteredItems[0]; return t && t.element && e(t.element) }, o.layout = function() { this.isotope.layout.apply(this.isotope, arguments) }, o.getSize = function() { this.isotope.getSize(), this.size = this.isotope.size }, i.modes = {}, i.create = function(e, t) {
        function s() { i.apply(this, arguments) }
        return s.prototype = Object.create(o), s.prototype.constructor = s, t && (s.options = t), s.prototype.namespace = e, i.modes[e] = s, s
    }, i
});
! function(t, o) { "function" == typeof define && define.amd ? define(["outlayer/outlayer"], o) : "object" == typeof module && module.exports ? module.exports = o(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = o(t.Outlayer)) }(window, function(t) {
    "use strict";

    function o() { t.Item.apply(this, arguments) }
    var e = o.prototype = Object.create(t.Item.prototype),
        i = e._create;
    e._create = function() { this.id = this.layout.itemGUID++, i.call(this), this.sortData = {} }, e.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                o = this.layout._sorters;
            for (var e in t) {
                var i = o[e];
                this.sortData[e] = i(this.element, this)
            }
        }
    };
    var a = e.destroy;
    return e.destroy = function() { a.apply(this, arguments), this.css({ display: "" }) }, o
});
! function(t, e) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "./item", "./layout-mode", "./layout-modes/masonry", "./layout-modes/fit-rows", "./layout-modes/vertical"], function(i, r, o, s, n, a) { return e(t, i, r, o, s, n, a) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode) }(window, function(t, e, i, r, o, s, n) {
    "use strict";

    function a(t, e) {
        return function(i, r) {
            for (var o = 0; o < t.length; o++) {
                var s = t[o],
                    n = i.sortData[s],
                    a = r.sortData[s];
                if (n > a || a > n) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (n > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function(t) { return t.trim() } : function(t) { return t.replace(/^\s+|\s+$/g, "") },
        l = e.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });
    l.Item = s, l.LayoutMode = n;
    var d = l.prototype;
    d._create = function() { this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"]; for (var t in n.modes) this._initLayoutMode(t) }, d.reloadItems = function() { this.itemGUID = 0, e.prototype.reloadItems.call(this) }, d._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var r = t[i];
            r.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, d._initLayoutMode = function(t) {
        var e = n.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, d.layout = function() { return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout() }, d._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, d.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, d._init = d.arrange, d._hideReveal = function(t) { this.reveal(t.needReveal), this.hide(t.needHide) }, d._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, d._bindArrangeComplete = function() {
        function t() { e && i && r && o.dispatchEvent("arrangeComplete", null, [o.filteredItems]) }
        var e, i, r, o = this;
        this.once("layoutComplete", function() { e = !0, t() }), this.once("hideComplete", function() { i = !0, t() }), this.once("revealComplete", function() { r = !0, t() })
    }, d._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], r = [], o = [], s = this._getFilterTest(e), n = 0; n < t.length; n++) {
            var a = t[n];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? r.push(a) : u || a.isHidden || o.push(a)
            }
        }
        return { matches: i, needReveal: r, needHide: o }
    }, d._getFilterTest = function(t) { return u && this.options.isJQueryFiltering ? function(e) { return u(e.element).is(t) } : "function" == typeof t ? function(e) { return t(e.element) } : function(e) { return r(e.element, t) } }, d.updateSortData = function(t) {
        var e;
        t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, d._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = m(i)
        }
    }, d._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && e > i; i++) {
            var r = t[i];
            r.updateSortData()
        }
    };
    var m = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                r = i[0],
                o = r.match(/^\[(.+)\]$/),
                s = o && o[1],
                n = e(s, r),
                a = l.sortDataParsers[i[1]];
            return t = a ? function(t) { return t && a(n(t)) } : function(t) { return t && n(t) }
        }

        function e(t, e) { return t ? function(e) { return e.getAttribute(t) } : function(t) { var i = t.querySelector(e); return i && i.textContent } }
        return t
    }();
    l.sortDataParsers = { parseInt: function(t) { return parseInt(t, 10) }, parseFloat: function(t) { return parseFloat(t) } }, d._sort = function() {
        var t = this.options.sortBy;
        if (t) {
            var e = [].concat.apply(t, this.sortHistory),
                i = a(e, this.options.sortAscending);
            this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
        }
    }, d._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, d._resetLayout = function() { e.prototype._resetLayout.call(this), this._mode()._resetLayout() }, d._getItemLayoutPosition = function(t) { return this._mode()._getItemLayoutPosition(t) }, d._manageStamp = function(t) { this._mode()._manageStamp(t) }, d._getContainerSize = function() { return this._mode()._getContainerSize() }, d.needsResizeLayout = function() { return this._mode().needsResizeLayout() }, d.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, d.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, d._filterRevealAdded = function(t) { var e = this._filter(t); return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches }, d.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, r, o = e.length;
            for (i = 0; o > i; i++) r = e[i], this.element.appendChild(r.element);
            var s = this._filter(e).matches;
            for (i = 0; o > i; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; o > i; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var f = d.remove;
    return d.remove = function(t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        f.call(this, t);
        for (var i = e && e.length, r = 0; i && i > r; r++) {
            var s = e[r];
            o.removeFrom(this.filteredItems, s)
        }
    }, d.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, d._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var r = t.apply(this, e);
        return this.options.transitionDuration = i, r
    }, d.getFilteredItemElements = function() { return this.filteredItems.map(function(t) { return t.element }) }, l
});
! function(t, e) { "function" == typeof define && define.amd ? define(["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() { this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth") }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = { x: this.x, y: this.y };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() { return { height: this.maxY } }, e
});
! function(t, e) { "function" == typeof define && define.amd ? define(["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
        o = e.prototype;
    return o._resetLayout = function() { this.y = 0 }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            o = this.y;
        return this.y += t.size.outerHeight, { x: e, y: o }
    }, o._getContainerSize = function() { return { height: this.y } }, e
});
! function(t, i) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], i) : "object" == typeof module && module.exports ? module.exports = i(require("outlayer"), require("get-size")) : t.Masonry = i(t.Outlayer, t.getSize) }(window, function(t, i) {
    "use strict";
    var e = t.create("masonry");
    return e.compatOptions.fitWidth = "isFitWidth", e.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0
    }, e.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                e = t && t.element;
            this.columnWidth = e && i(e).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            h = this.containerWidth + this.gutter,
            s = h / o,
            n = o - h % o,
            r = n && 1 > n ? "round" : "floor";
        s = Math[r](s), this.cols = Math.max(s, 1)
    }, e.prototype.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            e = t ? this.element.parentNode : this.element,
            o = i(e);
        this.containerWidth = o && o.innerWidth
    }, e.prototype._getItemLayoutPosition = function(t) {
        t.getSize();
        var i = t.size.outerWidth % this.columnWidth,
            e = i && 1 > i ? "round" : "ceil",
            o = Math[e](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var h = this._getColGroup(o), s = Math.min.apply(Math, h), n = h.indexOf(s), r = { x: this.columnWidth * n, y: s }, a = s + t.size.outerHeight, u = this.cols + 1 - h.length, l = 0; u > l; l++) this.colYs[n + l] = a;
        return r
    }, e.prototype._getColGroup = function(t) {
        if (2 > t) return this.colYs;
        for (var i = [], e = this.cols + 1 - t, o = 0; e > o; o++) {
            var h = this.colYs.slice(o, o + t);
            i[o] = Math.max.apply(Math, h)
        }
        return i
    }, e.prototype._manageStamp = function(t) {
        var e = i(t),
            o = this._getElementOffset(t),
            h = this._getOption("originLeft"),
            s = h ? o.left : o.right,
            n = s + e.outerWidth,
            r = Math.floor(s / this.columnWidth);
        r = Math.max(0, r);
        var a = Math.floor(n / this.columnWidth);
        a -= n % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
        for (var u = this._getOption("originTop"), l = (u ? o.top : o.bottom) + e.outerHeight, c = r; a >= c; c++) this.colYs[c] = Math.max(l, this.colYs[c])
    }, e.prototype._getContainerSize = function() { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t }, e.prototype._getContainerFitWidth = function() { for (var t = 0, i = this.cols; --i && 0 === this.colYs[i];) t++; return (this.cols - t) * this.columnWidth - this.gutter }, e.prototype.needsResizeLayout = function() { var t = this.containerWidth; return this.getContainerWidth(), t != this.containerWidth }, e
});
! function(t, o) { "function" == typeof define && define.amd ? define(["../layout-mode", "masonry/masonry"], o) : "object" == typeof module && module.exports ? module.exports = o(require("../layout-mode"), require("masonry-layout")) : o(t.Isotope.LayoutMode, t.Masonry) }(window, function(t, o) {
    "use strict";
    var e = t.create("masonry"),
        i = e.prototype,
        s = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var n in o.prototype) s[n] || (i[n] = o.prototype[n]);
    var r = i.measureColumns;
    i.measureColumns = function() { this.items = this.isotope.filteredItems, r.call(this) };
    var u = i._getOption;
    return i._getOption = function(t) { return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : u.apply(this.isotope, arguments) }, e
});
! function(t, e) { "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("cellsByColumn"),
        i = e.prototype;
    return i._resetLayout = function() { this.itemIndex = 0, this.getColumnWidth(), this.getRowHeight(), this.rows = Math.floor(this.isotope.size.innerHeight / this.rowHeight), this.rows = Math.max(this.rows, 1) }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = Math.floor(this.itemIndex / this.rows),
            i = this.itemIndex % this.rows,
            o = (e + .5) * this.columnWidth - t.size.outerWidth / 2,
            s = (i + .5) * this.rowHeight - t.size.outerHeight / 2;
        return this.itemIndex++, { x: o, y: s }
    }, i._getContainerSize = function() { return { width: Math.ceil(this.itemIndex / this.rows) * this.columnWidth } }, i.needsResizeLayout = function() { return this.needsVerticalResizeLayout() }, e
});
! function(t, e) { "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("cellsByRow"),
        i = e.prototype;
    return i._resetLayout = function() { this.itemIndex = 0, this.getColumnWidth(), this.getRowHeight(), this.cols = Math.floor(this.isotope.size.innerWidth / this.columnWidth), this.cols = Math.max(this.cols, 1) }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = this.itemIndex % this.cols,
            i = Math.floor(this.itemIndex / this.cols),
            o = (e + .5) * this.columnWidth - t.size.outerWidth / 2,
            s = (i + .5) * this.rowHeight - t.size.outerHeight / 2;
        return this.itemIndex++, { x: o, y: s }
    }, i._getContainerSize = function() { return { height: Math.ceil(this.itemIndex / this.cols) * this.rowHeight } }, e
});
! function(t, e) { "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("fitColumns"),
        i = e.prototype;
    return i._resetLayout = function() { this.x = 0, this.y = 0, this.maxX = 0 }, i._getItemLayoutPosition = function(t) { t.getSize(), 0 !== this.y && t.size.outerHeight + this.y > this.isotope.size.innerHeight && (this.y = 0, this.x = this.maxX); var e = { x: this.x, y: this.y }; return this.maxX = Math.max(this.maxX, this.x + t.size.outerWidth), this.y += t.size.outerHeight, e }, i._getContainerSize = function() { return { width: this.maxX } }, i.needsResizeLayout = function() { return this.needsVerticalResizeLayout() }, e
});
! function(e, t) { "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("isotope-layout/js/layout-mode")) : t(e.Isotope.LayoutMode) }(window, function(e) {
    "use strict";
    var t = e.create("horiz", { verticalAlignment: 0 }),
        i = t.prototype;
    return i._resetLayout = function() { this.x = 0 }, i._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = (this.isotope.size.innerHeight - e.size.outerHeight) * this.options.verticalAlignment,
            i = this.x;
        return this.x += e.size.outerWidth, { x: i, y: t }
    }, i._getContainerSize = function() { return { width: this.x } }, i.needsResizeLayout = function() { return this.needsVerticalResizeLayout() }, t
});
! function(t, e) { "use strict"; "function" == typeof define && define.amd ? define(["get-size/get-size", "isotope/js/layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("isotope-layout/js/layout-mode")) : e(t.getSize, t.Isotope.LayoutMode) }(window, function(t, e) {
    "use strict";
    var i = e.create("masonryHorizontal"),
        o = i.prototype;
    return o._resetLayout = function() {
        this.getRowHeight(), this._getMeasurement("gutter", "outerHeight"), this.rowHeight += this.gutter, this.rows = Math.floor((this.isotope.size.innerHeight + this.gutter) / this.rowHeight), this.rows = Math.max(this.rows, 1);
        var t = this.rows;
        for (this.rowXs = []; t--;) this.rowXs.push(0);
        this.maxX = 0
    }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerHeight % this.rowHeight,
            i = e && 1 > e ? "round" : "ceil",
            o = Math[i](t.size.outerHeight / this.rowHeight);
        o = Math.min(o, this.rows);
        for (var r = this._getRowGroup(o), s = Math.min.apply(Math, r), h = r.indexOf(s), a = { x: s, y: this.rowHeight * h }, n = s + t.size.outerWidth, u = this.rows + 1 - r.length, g = 0; u > g; g++) this.rowXs[h + g] = n;
        return a
    }, o._getRowGroup = function(t) {
        if (2 > t) return this.rowXs;
        for (var e = [], i = this.rows + 1 - t, o = 0; i > o; o++) {
            var r = this.rowXs.slice(o, o + t);
            e[o] = Math.max.apply(Math, r)
        }
        return e
    }, o._manageStamp = function(e) {
        var i = t(e),
            o = this.isotope._getElementOffset(e),
            r = this._getOption("originTop") ? o.top : o.bottom,
            s = r + i.outerHeight,
            h = Math.floor(r / this.rowHeight);
        h = Math.max(0, h);
        var a = Math.floor(s / this.rowHeight);
        a = Math.min(this.rows - 1, a);
        for (var n = (this._getOption("originLeft") ? o.left : o.right) + i.outerWidth, u = h; a >= u; u++) this.rowXs[u] = Math.max(n, this.rowXs[u])
    }, o._getContainerSize = function() { return this.maxX = Math.max.apply(Math, this.rowXs), { width: this.maxX } }, o.needsResizeLayout = function() { return this.needsVerticalResizeLayout() }, i
});
! function(t, h) { "function" == typeof define && define.amd ? define(h) : "object" == typeof module && module.exports ? module.exports = h() : (t.Packery = t.Packery || {}, t.Packery.Rect = h()) }(window, function() {
    "use strict";

    function t(h) { for (var i in t.defaults) this[i] = t.defaults[i]; for (i in h) this[i] = h[i] }
    t.defaults = { x: 0, y: 0, width: 0, height: 0 };
    var h = t.prototype;
    return h.contains = function(t) {
        var h = t.width || 0,
            i = t.height || 0;
        return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + h && this.y + this.height >= t.y + i
    }, h.overlaps = function(t) {
        var h = this.x + this.width,
            i = this.y + this.height,
            e = t.x + t.width,
            s = t.y + t.height;
        return this.x < e && h > t.x && this.y < s && i > t.y
    }, h.getMaximalFreeRects = function(h) {
        if (!this.overlaps(h)) return !1;
        var i, e = [],
            s = this.x + this.width,
            n = this.y + this.height,
            r = h.x + h.width,
            y = h.y + h.height;
        return this.y < h.y && (i = new t({ x: this.x, y: this.y, width: this.width, height: h.y - this.y }), e.push(i)), s > r && (i = new t({ x: r, y: this.y, width: s - r, height: this.height }), e.push(i)), n > y && (i = new t({ x: this.x, y: y, width: this.width, height: n - y }), e.push(i)), this.x < h.x && (i = new t({ x: this.x, y: this.y, width: h.x - this.x, height: this.height }), e.push(i)), e
    }, h.canFit = function(t) { return this.width >= t.width && this.height >= t.height }, t
});
! function(t, e) {
    if ("function" == typeof define && define.amd) define(["./rect"], e);
    else if ("object" == typeof module && module.exports) module.exports = e(require("./rect"));
    else {
        var i = t.Packery = t.Packery || {};
        i.Packer = e(i.Rect)
    }
}(window, function(t) {
    "use strict";

    function e(t, e, i) { this.width = t || 0, this.height = e || 0, this.sortDirection = i || "downwardLeftToRight", this.reset() }
    var i = e.prototype;
    i.reset = function() {
        this.spaces = [];
        var e = new t({ x: 0, y: 0, width: this.width, height: this.height });
        this.spaces.push(e), this.sorter = s[this.sortDirection] || s.downwardLeftToRight
    }, i.pack = function(t) { for (var e = 0; e < this.spaces.length; e++) { var i = this.spaces[e]; if (i.canFit(t)) { this.placeInSpace(t, i); break } } }, i.columnPack = function(t) {
        for (var e = 0; e < this.spaces.length; e++) {
            var i = this.spaces[e],
                s = i.x <= t.x && i.x + i.width >= t.x + t.width && i.height >= t.height - .01;
            if (s) { t.y = i.y, this.placed(t); break }
        }
    }, i.rowPack = function(t) {
        for (var e = 0; e < this.spaces.length; e++) {
            var i = this.spaces[e],
                s = i.y <= t.y && i.y + i.height >= t.y + t.height && i.width >= t.width - .01;
            if (s) { t.x = i.x, this.placed(t); break }
        }
    }, i.placeInSpace = function(t, e) { t.x = e.x, t.y = e.y, this.placed(t) }, i.placed = function(t) {
        for (var e = [], i = 0; i < this.spaces.length; i++) {
            var s = this.spaces[i],
                r = s.getMaximalFreeRects(t);
            r ? e.push.apply(e, r) : e.push(s)
        }
        this.spaces = e, this.mergeSortSpaces()
    }, i.mergeSortSpaces = function() { e.mergeRects(this.spaces), this.spaces.sort(this.sorter) }, i.addSpace = function(t) { this.spaces.push(t), this.mergeSortSpaces() }, e.mergeRects = function(t) {
        var e = 0,
            i = t[e];
        t: for (; i;) {
            for (var s = 0, r = t[e + s]; r;) {
                if (r == i) s++;
                else {
                    if (r.contains(i)) { t.splice(e, 1), i = t[e]; continue t }
                    i.contains(r) ? t.splice(e + s, 1) : s++
                }
                r = t[e + s]
            }
            e++, i = t[e]
        }
        return t
    };
    var s = { downwardLeftToRight: function(t, e) { return t.y - e.y || t.x - e.x }, rightwardTopToBottom: function(t, e) { return t.x - e.x || t.y - e.y } };
    return e
});
! function(e, t) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "./rect"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("./rect")) : e.Packery.Item = t(e.Outlayer, e.Packery.Rect) }(window, function(e, t) {
    "use strict";
    var i = document.documentElement.style,
        o = "string" == typeof i.transform ? "transform" : "WebkitTransform",
        s = function() { e.Item.apply(this, arguments) },
        r = s.prototype = Object.create(e.Item.prototype),
        n = r._create;
    r._create = function() { n.call(this), this.rect = new t };
    var a = r.moveTo;
    return r.moveTo = function(e, t) {
        var i = Math.abs(this.position.x - e),
            o = Math.abs(this.position.y - t),
            s = this.layout.dragItemCount && !this.isPlacing && !this.isTransitioning && 1 > i && 1 > o;
        return s ? void this.goTo(e, t) : void a.apply(this, arguments)
    }, r.enablePlacing = function() { this.removeTransitionStyles(), this.isTransitioning && o && (this.element.style[o] = "none"), this.isTransitioning = !1, this.getSize(), this.layout._setRectSize(this.element, this.rect), this.isPlacing = !0 }, r.disablePlacing = function() { this.isPlacing = !1 }, r.removeElem = function() { this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent("remove", [this]) }, r.showDropPlaceholder = function() {
        var e = this.dropPlaceholder;
        e || (e = this.dropPlaceholder = document.createElement("div"), e.className = "packery-drop-placeholder", e.style.position = "absolute"), e.style.width = this.size.width + "px", e.style.height = this.size.height + "px", this.positionDropPlaceholder(), this.layout.element.appendChild(e)
    }, r.positionDropPlaceholder = function() { this.dropPlaceholder.style[o] = "translate(" + this.rect.x + "px, " + this.rect.y + "px)" }, r.hideDropPlaceholder = function() {
        var e = this.dropPlaceholder.parentNode;
        e && e.removeChild(this.dropPlaceholder)
    }, s
});
! function(t, i) { "function" == typeof define && define.amd ? define(["get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], i) : "object" == typeof module && module.exports ? module.exports = i(require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : t.Packery = i(t.getSize, t.Outlayer, t.Packery.Rect, t.Packery.Packer, t.Packery.Item) }(window, function(t, i, e, s, r) {
    "use strict";

    function h(t, i) { return t.position.y - i.position.y || t.position.x - i.position.x }

    function a(t, i) { return t.position.x - i.position.x || t.position.y - i.position.y }

    function n(t, i) {
        var e = i.x - t.x,
            s = i.y - t.y;
        return Math.sqrt(e * e + s * s)
    }
    e.prototype.canFit = function(t) { return this.width >= t.width - 1 && this.height >= t.height - 1 };
    var o = i.create("packery");
    o.Item = r;
    var g = o.prototype;
    g._create = function() {
        i.prototype._create.call(this), this.packer = new s, this.shiftPacker = new s, this.isEnabled = !0, this.dragItemCount = 0;
        var t = this;
        this.handleDraggabilly = { dragStart: function() { t.itemDragStart(this.element) }, dragMove: function() { t.itemDragMove(this.element, this.position.x, this.position.y) }, dragEnd: function() { t.itemDragEnd(this.element) } }, this.handleUIDraggable = { start: function(i, e) { e && t.itemDragStart(i.currentTarget) }, drag: function(i, e) { e && t.itemDragMove(i.currentTarget, e.position.left, e.position.top) }, stop: function(i, e) { e && t.itemDragEnd(i.currentTarget) } }
    }, g._resetLayout = function() {
        this.getSize(), this._getMeasurements();
        var t, i, e;
        this._getOption("horizontal") ? (t = 1 / 0, i = this.size.innerHeight + this.gutter, e = "rightwardTopToBottom") : (t = this.size.innerWidth + this.gutter, i = 1 / 0, e = "downwardLeftToRight"), this.packer.width = this.shiftPacker.width = t, this.packer.height = this.shiftPacker.height = i, this.packer.sortDirection = this.shiftPacker.sortDirection = e, this.packer.reset(), this.maxY = 0, this.maxX = 0
    }, g._getMeasurements = function() { this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width") }, g._getItemLayoutPosition = function(t) {
        if (this._setRectSize(t.element, t.rect), this.isShifting || this.dragItemCount > 0) {
            var i = this._getPackMethod();
            this.packer[i](t.rect)
        } else this.packer.pack(t.rect);
        return this._setMaxXY(t.rect), t.rect
    }, g.shiftLayout = function() { this.isShifting = !0, this.layout(), delete this.isShifting }, g._getPackMethod = function() { return this._getOption("horizontal") ? "rowPack" : "columnPack" }, g._setMaxXY = function(t) { this.maxX = Math.max(t.x + t.width, this.maxX), this.maxY = Math.max(t.y + t.height, this.maxY) }, g._setRectSize = function(i, e) {
        var s = t(i),
            r = s.outerWidth,
            h = s.outerHeight;
        (r || h) && (r = this._applyGridGutter(r, this.columnWidth), h = this._applyGridGutter(h, this.rowHeight)), e.width = Math.min(r, this.packer.width), e.height = Math.min(h, this.packer.height)
    }, g._applyGridGutter = function(t, i) {
        if (!i) return t + this.gutter;
        i += this.gutter;
        var e = t % i,
            s = e && 1 > e ? "round" : "ceil";
        return t = Math[s](t / i) * i
    }, g._getContainerSize = function() { return this._getOption("horizontal") ? { width: this.maxX - this.gutter } : { height: this.maxY - this.gutter } }, g._manageStamp = function(t) {
        var i, s = this.getItem(t);
        if (s && s.isPlacing) i = s.rect;
        else {
            var r = this._getElementOffset(t);
            i = new e({ x: this._getOption("originLeft") ? r.left : r.right, y: this._getOption("originTop") ? r.top : r.bottom })
        }
        this._setRectSize(t, i), this.packer.placed(i), this._setMaxXY(i)
    }, g.sortItemsByPosition = function() {
        var t = this._getOption("horizontal") ? a : h;
        this.items.sort(t)
    }, g.fit = function(t, i, e) {
        var s = this.getItem(t);
        s && (this.stamp(s.element), s.enablePlacing(), this.updateShiftTargets(s), i = void 0 === i ? s.rect.x : i, e = void 0 === e ? s.rect.y : e, this.shift(s, i, e), this._bindFitEvents(s), s.moveTo(s.rect.x, s.rect.y), this.shiftLayout(), this.unstamp(s.element), this.sortItemsByPosition(), s.disablePlacing())
    }, g._bindFitEvents = function(t) {
        function i() { s++, 2 == s && e.dispatchEvent("fitComplete", null, [t]) }
        var e = this,
            s = 0;
        t.once("layout", i), this.once("layoutComplete", i)
    }, g.resize = function() { this.isResizeBound && this.needsResizeLayout() && (this.options.shiftPercentResize ? this.resizeShiftPercentLayout() : this.layout()) }, g.needsResizeLayout = function() {
        var i = t(this.element),
            e = this._getOption("horizontal") ? "innerHeight" : "innerWidth";
        return i[e] != this.size[e]
    }, g.resizeShiftPercentLayout = function() {
        var i = this._getItemsForLayout(this.items),
            e = this._getOption("horizontal"),
            s = e ? "y" : "x",
            r = e ? "height" : "width",
            h = e ? "rowHeight" : "columnWidth",
            a = e ? "innerHeight" : "innerWidth",
            n = this[h];
        if (n = n && n + this.gutter) {
            this._getMeasurements();
            var o = this[h] + this.gutter;
            i.forEach(function(t) {
                var i = Math.round(t.rect[s] / n);
                t.rect[s] = i * o
            })
        } else {
            var g = t(this.element)[a] + this.gutter,
                c = this.packer[r];
            i.forEach(function(t) { t.rect[s] = t.rect[s] / c * g })
        }
        this.shiftLayout()
    }, g.itemDragStart = function(t) {
        if (this.isEnabled) {
            this.stamp(t);
            var i = this.getItem(t);
            i && (i.enablePlacing(), i.showDropPlaceholder(), this.dragItemCount++, this.updateShiftTargets(i))
        }
    }, g.updateShiftTargets = function(t) {
        this.shiftPacker.reset(), this._getBoundingRect();
        var i = this._getOption("originLeft"),
            s = this._getOption("originTop");
        this.stamps.forEach(function(t) {
            var r = this.getItem(t);
            if (!r || !r.isPlacing) {
                var h = this._getElementOffset(t),
                    a = new e({ x: i ? h.left : h.right, y: s ? h.top : h.bottom });
                this._setRectSize(t, a), this.shiftPacker.placed(a)
            }
        }, this);
        var r = this._getOption("horizontal"),
            h = r ? "rowHeight" : "columnWidth",
            a = r ? "height" : "width";
        this.shiftTargetKeys = [], this.shiftTargets = [];
        var n, o = this[h];
        if (o = o && o + this.gutter) {
            var g = Math.ceil(t.rect[a] / o),
                c = Math.floor((this.shiftPacker[a] + this.gutter) / o);
            n = (c - g) * o;
            for (var u = 0; c > u; u++) this._addShiftTarget(u * o, 0, n)
        } else n = this.shiftPacker[a] + this.gutter - t.rect[a], this._addShiftTarget(0, 0, n);
        var d = this._getItemsForLayout(this.items),
            f = this._getPackMethod();
        d.forEach(function(t) {
            var i = t.rect;
            this._setRectSize(t.element, i), this.shiftPacker[f](i), this._addShiftTarget(i.x, i.y, n);
            var e = r ? i.x + i.width : i.x,
                s = r ? i.y : i.y + i.height;
            if (this._addShiftTarget(e, s, n), o)
                for (var h = Math.round(i[a] / o), g = 1; h > g; g++) {
                    var c = r ? e : i.x + o * g,
                        u = r ? i.y + o * g : s;
                    this._addShiftTarget(c, u, n)
                }
        }, this)
    }, g._addShiftTarget = function(t, i, e) {
        var s = this._getOption("horizontal") ? i : t;
        if (!(0 !== s && s > e)) {
            var r = t + "," + i,
                h = -1 != this.shiftTargetKeys.indexOf(r);
            h || (this.shiftTargetKeys.push(r), this.shiftTargets.push({ x: t, y: i }))
        }
    }, g.shift = function(t, i, e) {
        var s, r = 1 / 0,
            h = { x: i, y: e };
        this.shiftTargets.forEach(function(t) {
            var i = n(t, h);
            r > i && (s = t, r = i)
        }), t.rect.x = s.x, t.rect.y = s.y
    };
    var c = 120;
    g.itemDragMove = function(t, i, e) {
        function s() { h.shift(r, i, e), r.positionDropPlaceholder(), h.layout() }
        var r = this.isEnabled && this.getItem(t);
        if (r) {
            i -= this.size.paddingLeft, e -= this.size.paddingTop;
            var h = this,
                a = new Date;
            this._itemDragTime && a - this._itemDragTime < c ? (clearTimeout(this.dragTimeout), this.dragTimeout = setTimeout(s, c)) : (s(), this._itemDragTime = a)
        }
    }, g.itemDragEnd = function(t) {
        function i() { s++, 2 == s && (e.element.classList.remove("is-positioning-post-drag"), e.hideDropPlaceholder(), r.dispatchEvent("dragItemPositioned", null, [e])) }
        var e = this.isEnabled && this.getItem(t);
        if (e) {
            clearTimeout(this.dragTimeout), e.element.classList.add("is-positioning-post-drag");
            var s = 0,
                r = this;
            e.once("layout", i), this.once("layoutComplete", i), e.moveTo(e.rect.x, e.rect.y), this.layout(), this.dragItemCount = Math.max(0, this.dragItemCount - 1), this.sortItemsByPosition(), e.disablePlacing(), this.unstamp(e.element)
        }
    }, g.bindDraggabillyEvents = function(t) { this._bindDraggabillyEvents(t, "on") }, g.unbindDraggabillyEvents = function(t) { this._bindDraggabillyEvents(t, "off") }, g._bindDraggabillyEvents = function(t, i) {
        var e = this.handleDraggabilly;
        t[i]("dragStart", e.dragStart), t[i]("dragMove", e.dragMove), t[i]("dragEnd", e.dragEnd)
    }, g.bindUIDraggableEvents = function(t) { this._bindUIDraggableEvents(t, "on") }, g.unbindUIDraggableEvents = function(t) { this._bindUIDraggableEvents(t, "off") }, g._bindUIDraggableEvents = function(t, i) {
        var e = this.handleUIDraggable;
        t[i]("dragstart", e.start)[i]("drag", e.drag)[i]("dragstop", e.stop)
    };
    var u = g.destroy;
    return g.destroy = function() { u.apply(this, arguments), this.isEnabled = !1 }, o.Rect = e, o.Packer = s, o
});
! function(t, e) { "use strict"; "function" == typeof define && define.amd ? define(["isotope/js/layout-mode", "packery/js/packery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("isotope-layout/js/layout-mode"), require("packery")) : e(t.Isotope.LayoutMode, t.Packery) }(window, function(t, e) {
    "use strict";
    var o = t.create("packery"),
        i = o.prototype,
        r = { _getElementOffset: !0, _getMeasurement: !0 };
    for (var s in e.prototype) r[s] || (i[s] = e.prototype[s]);
    var n = i._resetLayout;
    i._resetLayout = function() { this.packer = this.packer || new e.Packer, this.shiftPacker = this.shiftPacker || new e.Packer, n.apply(this, arguments) };
    var a = i._getItemLayoutPosition;
    i._getItemLayoutPosition = function(t) { return t.rect = t.rect || new e.Rect, a.call(this, t) };
    var p = i.needsResizeLayout;
    i.needsResizeLayout = function() { return this._getOption("horizontal") ? this.needsVerticalResizeLayout() : p.call(this) };
    var u = i._getOption;
    return i._getOption = function(t) { return "horizontal" == t ? void 0 !== this.options.isHorizontal ? this.options.isHorizontal : this.options.horizontal : u.apply(this.isotope, arguments) }, o
});
! function(t, e) { "use strict"; "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter) }(window, function(t, e) {
    "use strict";

    function i(t, e) { for (var i in e) t[i] = e[i]; return t }

    function o(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }

    function r(t, e, n) { return this instanceof r ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = o(t), this.options = i({}, this.options), "function" == typeof e ? n = e : i(this.options, e), n && this.on("always", n), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() { this.check() }.bind(this))) : new r(t, e, n) }

    function n(t) { this.img = t }

    function s(t, e) { this.url = t, this.element = e, this.img = new Image }
    var h = t.jQuery,
        a = t.console;
    r.prototype = Object.create(e.prototype), r.prototype.options = {}, r.prototype.getImages = function() { this.images = [], this.elements.forEach(this.addElementImages, this) }, r.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
            for (var i = t.querySelectorAll("img"), o = 0; o < i.length; o++) {
                var r = i[o];
                this.addImage(r)
            }
            if ("string" == typeof this.options.background) {
                var n = t.querySelectorAll(this.options.background);
                for (o = 0; o < n.length; o++) {
                    var s = n[o];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = { 1: !0, 9: !0, 11: !0 };
    return r.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, o = i.exec(e.backgroundImage); null !== o;) {
                var r = o && o[2];
                r && this.addBackground(r, t), o = i.exec(e.backgroundImage)
            }
    }, r.prototype.addImage = function(t) {
        var e = new n(t);
        this.images.push(e)
    }, r.prototype.addBackground = function(t, e) {
        var i = new s(t, e);
        this.images.push(i)
    }, r.prototype.check = function() {
        function t(t, i, o) { setTimeout(function() { e.progress(t, i, o) }) }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) { e.once("progress", t), e.check() }) : void this.complete()
    }, r.prototype.progress = function(t, e, i) { this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e) }, r.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, n.prototype = Object.create(e.prototype), n.prototype.check = function() { var t = this.getIsImageComplete(); return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src)) }, n.prototype.getIsImageComplete = function() { return this.img.complete && void 0 !== this.img.naturalWidth }, n.prototype.confirm = function(t, e) { this.isLoaded = t, this.emitEvent("progress", [this, this.img, e]) }, n.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, n.prototype.onload = function() { this.confirm(!0, "onload"), this.unbindEvents() }, n.prototype.onerror = function() { this.confirm(!1, "onerror"), this.unbindEvents() }, n.prototype.unbindEvents = function() { this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this) }, s.prototype = Object.create(n.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() { this.img.removeEventListener("load", this), this.img.removeEventListener("error", this) }, s.prototype.confirm = function(t, e) { this.isLoaded = t, this.emitEvent("progress", [this, this.element, e]) }, r.makeJQueryPlugin = function(e) { e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) { var i = new r(this, t, e); return i.jqDeferred.promise(h(this)) }) }, r.makeJQueryPlugin(), r
});
! function(i) {
    "use strict";
    var n = i.ID = {};
    n.modules = {}
}(window);
! function(e) { var r = "object" == typeof window && window || "object" == typeof self && self; "undefined" != typeof exports ? e(exports) : r && (r.hljs = e({}), "function" == typeof define && define.amd && define([], function() { return r.hljs })) }(function(e) {
    function r(e) { return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;") }

    function t(e) { return e.nodeName.toLowerCase() }

    function n(e, r) { var t = e && e.exec(r); return t && 0 == t.index }

    function a(e) { return /^(no-?highlight|plain|text)$/i.test(e) }

    function c(e) {
        var r, t, n, c = e.className + " ";
        if (c += e.parentNode ? e.parentNode.className : "", t = /\blang(?:uage)?-([\w-]+)\b/i.exec(c)) return E(t[1]) ? t[1] : "no-highlight";
        for (c = c.split(/\s+/), r = 0, n = c.length; n > r; r++)
            if (E(c[r]) || a(c[r])) return c[r]
    }

    function i(e, r) {
        var t, n = {};
        for (t in e) n[t] = e[t];
        if (r)
            for (t in r) n[t] = r[t];
        return n
    }

    function o(e) { var r = []; return function n(e, a) { for (var c = e.firstChild; c; c = c.nextSibling) 3 == c.nodeType ? a += c.nodeValue.length : 1 == c.nodeType && (r.push({ event: "start", offset: a, node: c }), a = n(c, a), t(c).match(/br|hr|img|input/) || r.push({ event: "stop", offset: a, node: c })); return a }(e, 0), r }

    function s(e, n, a) {
        function c() { return e.length && n.length ? e[0].offset != n[0].offset ? e[0].offset < n[0].offset ? e : n : "start" == n[0].event ? e : n : e.length ? e : n }

        function i(e) {
            function n(e) { return " " + e.nodeName + '="' + r(e.value) + '"' }
            l += "<" + t(e) + Array.prototype.map.call(e.attributes, n).join("") + ">"
        }

        function o(e) { l += "</" + t(e) + ">" }

        function s(e) {
            ("start" == e.event ? i : o)(e.node)
        }
        for (var u = 0, l = "", f = []; e.length || n.length;) {
            var b = c();
            if (l += r(a.substr(u, b[0].offset - u)), u = b[0].offset, b == e) {
                f.reverse().forEach(o);
                do s(b.splice(0, 1)[0]), b = c(); while (b == e && b.length && b[0].offset == u);
                f.reverse().forEach(i)
            } else "start" == b[0].event ? f.push(b[0].node) : f.pop(), s(b.splice(0, 1)[0])
        }
        return l + r(a.substr(u))
    }

    function u(e) {
        function r(e) { return e && e.source || e }

        function t(t, n) { return new RegExp(r(t), "m" + (e.cI ? "i" : "") + (n ? "g" : "")) }

        function n(a, c) {
            if (!a.compiled) {
                if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
                    var o = {},
                        s = function(r, t) {
                            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function(e) {
                                var t = e.split("|");
                                o[t[0]] = [r, t[1] ? Number(t[1]) : 1]
                            })
                        };
                    "string" == typeof a.k ? s("keyword", a.k) : Object.keys(a.k).forEach(function(e) { s(e, a.k[e]) }), a.k = o
                }
                a.lR = t(a.l || /\w+/, !0), c && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = r(a.e) || "", a.eW && c.tE && (a.tE += (a.e ? "|" : "") + c.tE)), a.i && (a.iR = t(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);
                var u = [];
                a.c.forEach(function(e) { e.v ? e.v.forEach(function(r) { u.push(i(e, r)) }) : u.push("self" == e ? a : e) }), a.c = u, a.c.forEach(function(e) { n(e, a) }), a.starts && n(a.starts, c);
                var l = a.c.map(function(e) { return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b }).concat([a.tE, a.i]).map(r).filter(Boolean);
                a.t = l.length ? t(l.join("|"), !0) : { exec: function() { return null } }
            }
        }
        n(e)
    }

    function l(e, t, a, c) {
        function i(e, r) {
            for (var t = 0; t < r.c.length; t++)
                if (n(r.c[t].bR, e)) return r.c[t]
        }

        function o(e, r) { if (n(e.eR, r)) { for (; e.endsParent && e.parent;) e = e.parent; return e } return e.eW ? o(e.parent, r) : void 0 }

        function s(e, r) { return !a && n(r.iR, e) }

        function b(e, r) { var t = N.cI ? r[0].toLowerCase() : r[0]; return e.k.hasOwnProperty(t) && e.k[t] }

        function g(e, r, t, n) {
            var a = n ? "" : w.classPrefix,
                c = '<span class="' + a,
                i = t ? "" : "</span>";
            return c += e + '">', c + r + i
        }

        function p() {
            if (!C.k) return r(k);
            var e = "",
                t = 0;
            C.lR.lastIndex = 0;
            for (var n = C.lR.exec(k); n;) {
                e += r(k.substr(t, n.index - t));
                var a = b(C, n);
                a ? (A += a[1], e += g(a[0], r(n[0]))) : e += r(n[0]), t = C.lR.lastIndex, n = C.lR.exec(k)
            }
            return e + r(k.substr(t))
        }

        function d() { var e = "string" == typeof C.sL; if (e && !y[C.sL]) return r(k); var t = e ? l(C.sL, k, !0, R[C.sL]) : f(k, C.sL.length ? C.sL : void 0); return C.r > 0 && (A += t.r), e && (R[C.sL] = t.top), g(t.language, t.value, !1, !0) }

        function h() { x += void 0 !== C.sL ? d() : p(), k = "" }

        function m(e, r) { x += e.cN ? g(e.cN, "", !0) : "", C = Object.create(e, { parent: { value: C } }) }

        function v(e, r) {
            if (k += e, void 0 === r) return h(), 0;
            var t = i(r, C);
            if (t) return t.skip ? k += r : (t.eB && (k += r), h(), t.rB || t.eB || (k = r)), m(t, r), t.rB ? 0 : r.length;
            var n = o(C, r);
            if (n) {
                var a = C;
                a.skip ? k += r : (a.rE || a.eE || (k += r), h(), a.eE && (k = r));
                do C.cN && (x += "</span>"), C.skip || (A += C.r), C = C.parent; while (C != n.parent);
                return n.starts && m(n.starts, ""), a.rE ? 0 : r.length
            }
            if (s(r, C)) throw new Error('Illegal lexeme "' + r + '" for mode "' + (C.cN || "<unnamed>") + '"');
            return k += r, r.length || 1
        }
        var N = E(e);
        if (!N) throw new Error('Unknown language: "' + e + '"');
        u(N);
        var M, C = c || N,
            R = {},
            x = "";
        for (M = C; M != N; M = M.parent) M.cN && (x = g(M.cN, "", !0) + x);
        var k = "",
            A = 0;
        try { for (var S, B, L = 0; C.t.lastIndex = L, S = C.t.exec(t), S;) B = v(t.substr(L, S.index - L), S[0]), L = S.index + B; for (v(t.substr(L)), M = C; M.parent; M = M.parent) M.cN && (x += "</span>"); return { r: A, value: x, language: e, top: C } } catch (I) { if (-1 != I.message.indexOf("Illegal")) return { r: 0, value: r(t) }; throw I }
    }

    function f(e, t) {
        t = t || w.languages || Object.keys(y);
        var n = { r: 0, value: r(e) },
            a = n;
        return t.filter(E).forEach(function(r) {
            var t = l(r, e, !1);
            t.language = r, t.r > a.r && (a = t), t.r > n.r && (a = n, n = t)
        }), a.language && (n.second_best = a), n
    }

    function b(e) { return w.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, r) { return r.replace(/\t/g, w.tabReplace) })), w.useBR && (e = e.replace(/\n/g, "<br>")), e }

    function g(e, r, t) {
        var n = r ? M[r] : t,
            a = [e.trim()];
        return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(n) && a.push(n), a.join(" ").trim()
    }

    function p(e) {
        var r = c(e);
        if (!a(r)) {
            var t;
            w.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e;
            var n = t.textContent,
                i = r ? l(r, n, !0) : f(n),
                u = o(t);
            if (u.length) {
                var p = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                p.innerHTML = i.value, i.value = s(u, o(p), n)
            }
            i.value = b(i.value), e.innerHTML = i.value, e.className = g(e.className, r, i.language), e.result = { language: i.language, re: i.r }, i.second_best && (e.second_best = { language: i.second_best.language, re: i.second_best.r })
        }
    }

    function d(e) { w = i(w, e) }

    function h() {
        if (!h.called) {
            h.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, p)
        }
    }

    function m() { addEventListener("DOMContentLoaded", h, !1), addEventListener("load", h, !1) }

    function v(r, t) {
        var n = y[r] = t(e);
        n.aliases && n.aliases.forEach(function(e) { M[e] = r })
    }

    function N() { return Object.keys(y) }

    function E(e) { return e = (e || "").toLowerCase(), y[e] || y[M[e]] }
    var w = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
        y = {},
        M = {};
    return e.highlight = l, e.highlightAuto = f, e.fixMarkup = b, e.highlightBlock = p, e.configure = d, e.initHighlighting = h, e.initHighlightingOnLoad = m, e.registerLanguage = v, e.listLanguages = N, e.getLanguage = E, e.inherit = i, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = { b: "\\\\[\\s\\S]", r: 0 }, e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }, e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }, e.PWM = { b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/ }, e.C = function(r, t, n) { var a = e.inherit({ cN: "comment", b: r, e: t, c: [] }, n || {}); return a.c.push(e.PWM), a.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }), a }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = { cN: "number", b: e.NR, r: 0 }, e.CNM = { cN: "number", b: e.CNR, r: 0 }, e.BNM = { cN: "number", b: e.BNR, r: 0 }, e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }, e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }, e.TM = { cN: "title", b: e.IR, r: 0 }, e.UTM = { cN: "title", b: e.UIR, r: 0 }, e.METHOD_GUARD = { b: "\\.\\s*" + e.UIR, r: 0 }, e
}), hljs.registerLanguage("css", function(e) {
    var r = "[a-zA-Z-][a-zA-Z0-9_-]*",
        t = { b: /[A-Z\_\.\-]+\s*:/, rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: /\S/, e: ":", eE: !0, starts: { eW: !0, eE: !0, c: [{ b: /[\w-]+\(/, rB: !0, c: [{ cN: "built_in", b: /[\w-]+/ }, { b: /\(/, e: /\)/, c: [e.ASM, e.QSM] }] }, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "number", b: "#[0-9A-Fa-f]+" }, { cN: "meta", b: "!important" }] } }] };
    return { cI: !0, i: /[=\/|'\$]/, c: [e.CBCM, { cN: "selector-id", b: /#[A-Za-z0-9_-]+/ }, { cN: "selector-class", b: /\.[A-Za-z0-9_-]+/ }, { cN: "selector-attr", b: /\[/, e: /\]/, i: "$" }, { cN: "selector-pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ }, { b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { b: "@", e: "[{;]", i: /:/, c: [{ cN: "keyword", b: /\w+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [e.ASM, e.QSM, e.CSSNM] }] }, { cN: "selector-tag", b: r, r: 0 }, { b: "{", e: "}", i: /\S/, c: [e.CBCM, t] }] }
}), hljs.registerLanguage("javascript", function(e) { return { aliases: ["js", "jsx"], k: { keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise" }, c: [{ cN: "meta", r: 10, b: /^\s*['"]use (strict|asm)['"]/ }, { cN: "meta", b: /^#!/, e: /$/ }, e.ASM, e.QSM, { cN: "string", b: "`", e: "`", c: [e.BE, { cN: "subst", b: "\\$\\{", e: "\\}" }] }, e.CLCM, e.CBCM, { cN: "number", v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }], r: 0 }, { b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [e.CLCM, e.CBCM, e.RM, { b: /</, e: /(\/\w+|\w+\/)>/, sL: "xml", c: [{ b: /<\w+\s*\/>/, skip: !0 }, { b: /<\w+/, e: /(\/\w+|\w+\/)>/, skip: !0, c: ["self"] }] }], r: 0 }, { cN: "function", bK: "function", e: /\{/, eE: !0, c: [e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: [e.CLCM, e.CBCM] }], i: /\[|%/ }, { b: /\$[(.]/ }, e.METHOD_GUARD, { cN: "class", bK: "class", e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{ bK: "extends" }, e.UTM] }, { bK: "constructor", e: /\{/, eE: !0 }], i: /#(?!!)/ } }), hljs.registerLanguage("json", function(e) {
    var r = { literal: "true false null" },
        t = [e.QSM, e.CNM],
        n = { e: ",", eW: !0, eE: !0, c: t, k: r },
        a = { b: "{", e: "}", c: [{ cN: "attr", b: /"/, e: /"/, c: [e.BE], i: "\\n" }, e.inherit(n, { b: /:/ })], i: "\\S" },
        c = { b: "\\[", e: "\\]", c: [e.inherit(n)], i: "\\S" };
    return t.splice(t.length, 0, a, c), { c: t, k: r, i: "\\S" }
}), hljs.registerLanguage("xml", function(e) {
    var r = "[A-Za-z0-9\\._:-]+",
        t = { eW: !0, i: /</, r: 0, c: [{ cN: "attr", b: r, r: 0 }, { b: /=\s*/, r: 0, c: [{ cN: "string", endsParent: !0, v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s"'=<>`]+/ }] }] }] };
    return { aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"], cI: !0, c: [{ cN: "meta", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, e.C("<!--", "-->", { r: 10 }), { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { b: /<\?(php)?/, e: /\?>/, sL: "php", c: [{ b: "/\\*", e: "\\*/", skip: !0 }] }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { name: "style" }, c: [t], starts: { e: "</style>", rE: !0, sL: ["css", "xml"] } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { name: "script" }, c: [t], starts: { e: "</script>", rE: !0, sL: ["actionscript", "javascript", "handlebars", "xml"] } }, { cN: "meta", v: [{ b: /<\?xml/, e: /\?>/, r: 10 }, { b: /<\?\w+/, e: /\?>/ }] }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "name", b: /[^\/><\s]+/, r: 0 }, t] }] }
});
! function() {
    "use strict";
    ID.getItemElement = function() {
        var t = document.createElement("div"),
            i = Math.random(),
            e = Math.random(),
            n = i > .8 ? "grid-item--width3" : i > .6 ? "grid-item--width2" : "",
            r = e > .8 ? "grid-item--height3" : e > .5 ? "grid-item--height2" : "";
        return t.className = "grid-item " + n + " " + r, t
    }, hljs.configure({ classPrefix: "" }), $.fn.displayIsotopeCode = function(t, i) {
        i = "string" == typeof i && -1 === i.indexOf("function") ? "'" + i + "'" : i;
        var e = "$grid.isotope({ " + t + ": " + i + " })";
        e = hljs.highlight("js", e).value, this.html(e)
    }
}();
ID.modules["commercial-license-agreement"] = function(e) {
    "use strict";

    function t(e) {
        var t = o.querySelector(".is-selected");
        t && t.classList.remove("is-selected"), e.classList.add("is-selected");
        for (var n = e.getAttribute("data-license-option"), i = r[n], a = 0, s = l.length; s > a; a++) {
            var c = l[a];
            c.element.textContent = i[c.property]
        }
    }
    var r = { developer: { title: "Developer", "for-official": "one (1) Licensed Developer", "for-plain": "one individual Developer" }, team: { title: "Team", "for-official": "up to eight (8) Licensed Developer(s)", "for-plain": "up to 8 Developers" }, organization: { title: "Organization", "for-official": "an unlimited number of Licensed Developer(s)", "for-plain": "an unlimited number of Developers" } },
        o = e.querySelector(".button-group"),
        n = e.querySelector("h2"),
        i = n.cloneNode(!0);
    i.style.borderTop = "none", i.style.marginTop = 0, i.id = "", n.textContent = "", o.parentNode.insertBefore(i, o.nextSibling);
    for (var l = [], a = e.querySelectorAll("[data-license-property]"), s = 0, c = a.length; c > s; s++) {
        var p = a[s],
            d = { property: p.getAttribute("data-license-property"), element: p };
        l.push(d)
    }
    t(o.querySelector(".button--developer")), o.addEventListener("click", function(e) { matchesSelector(e.target, ".button") && t(e.target) })
};
ID.modules["fizzy-bear-shirt"] = function(e) {
    "use strict";
    var t = new Date(2016, 5, 9),
        r = Math.round((t - new Date) / 864e5);
    e.querySelector(".fizzy-bear-shirt__title").textContent = "Rainbow bear shirts. Only on sale for " + r + " more days."
};
ID.modules["gh-button"] = function(t) {
    function e(t) { return t.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,") }
    var a = "metafizzy",
        o = "isotope",
        n = "ghButtonCallback" + Math.floor(1e4 * Math.random());
    window[n] = function(a) {
        var o = e(a.data.stargazers_count);
        t.querySelector(".gh-button__stat__text").textContent = o
    };
    var r = document.createElement("script");
    r.src = "https://api.github.com/repos/" + a + "/" + o + "?callback=" + n, document.head.appendChild(r)
};
ID.modules["hero-demo"] = function(t) {
    "use strict";
    var e = $(t),
        n = e.find(".grid").isotope({ itemSelector: ".element-item", layoutMode: "fitRows", transitionDuration: "0.6s", getSortData: { name: ".name", symbol: ".symbol", number: ".number parseInt", category: "[data-category]", weight: function(t) { var e = $(t).find(".weight").text(); return parseFloat(e.replace(/[\(\)]/g, "")) } } }),
        r = { numberGreaterThan50: function() { var t = $(this).find(".number").text(); return parseInt(t, 10) > 50 }, ium: function() { var t = $(this).find(".name").text(); return t.match(/ium$/) } },
        i = { numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}", ium: "function() {\n  var name = $(this).find('.name').text();\n  return name.match( /ium$/ );\n}" },
        o = e.find(".code-display code");
    e.find(".sort-by").on("click", "button", function() {
        var t = $(this).attr("data-sort-by");
        n.isotope({ sortBy: t }), o.displayIsotopeCode("sortBy", t)
    }), e.find(".filters").on("click", "button", function() {
        var t = $(this).attr("data-filter"),
            e = r[t] || t,
            a = i[t] || t;
        n.isotope({ filter: e }), o.displayIsotopeCode("filter", a)
    })
};
ID.modules["in-use-grid"] = function(e) {
    "use strict";
    var i = $(e);
    i.find(".in-use-grid__item").hide(), i.isotope({ itemSelector: "none", masonry: { columnWidth: ".grid-sizer", gutter: ".gutter-sizer" } }), i.isotope("option", { itemSelector: ".in-use-grid__item" }), i.imagesLoaded().progress(function(e, t) {
        var o = $(t.img).parents(".in-use-grid__item");
        o.show(), i.isotope("appended", o)
    })
};
ID.modules.notification = function(t) {
    "use strict";

    function n() {
        var t = new Date,
            n = e(t.getMinutes()),
            i = e(t.getSeconds());
        return [t.getHours(), n, i].join(":")
    }

    function e(t) { return 10 > t ? "0" + t : t }

    function i() { t.style[c] = "opacity 1.0s", t.style.opacity = "0" }
    var o, s = document.documentElement,
        c = "string" == typeof s.style.transition ? "transition" : "WebkitTransition";
    ID.notify = function(e) { t.textContent = e + " at " + n(), t.style[c] = "none", t.style.display = "block", t.style.opacity = "1", clearTimeout(o), o = setTimeout(i, 1e3) }
};
! function() {
    "use strict";

    function t(t) { this.element = t, this.originalY = this.element.getBoundingClientRect().top + window.pageYOffset, window.addEventListener("scroll", this), this.isFixed = !1, this.onscroll() }

    function i(t, i, e) {
        var n = t.prototype[i],
            o = i + "Timeout";
        t.prototype[i] = function() {
            if (!this[o]) {
                n.apply(this, arguments);
                var t = this;
                this[o] = setTimeout(function() { n.apply(t, arguments), delete t[o] }, e || 100)
            }
        }
    }
    ID.modules["page-nav"] = function(i) {
        var e = getSize(i).outerHeight;
        window.innerWidth < 768 || e >= window.innerHeight || new t(i)
    }, t.prototype.handleEvent = function(t) {
        var i = "on" + t.type;
        this[i] && this[i](t)
    }, t.prototype.onscroll = function() {
        var t = window.pageYOffset >= this.originalY;
        t !== this.isFixed && (this.element.classList.toggle("is-fixed"), this.isFixed = t)
    }, i(t, "onscroll", 50)
}();
ID.modules["refactor-shirt"] = function(t) {
    "use strict";
    var e = new Date(2016, 1, 10),
        r = Math.round((e - new Date) / 864e5);
    t.querySelector(".refactor-shirt__title").textContent = "Refactor shirts. Only on sale for " + r + " more days."
};
ID.modules["animate-item-size"] = function(i) {
    "use strict";
    var t = $(i),
        e = t.find(".grid").isotope({ masonry: { columnWidth: 60 } });
    e.on("click", ".animate-item-size-item", function() { $(this).toggleClass("is-expanded"), e.isotope("layout") })
};
ID.modules["animate-item-size-responsive"] = function(t) {
    "use strict";

    function i(t) {
        var i = getSize(t);
        t.style[o] = "none", t.style.width = i.width + "px", t.style.height = i.height + "px"
    }

    function e(t) {
        if (o) {
            var i = function() { t.style.width = "", t.style.height = "", t.removeEventListener(r, i, !1) };
            t.addEventListener(r, i, !1)
        }
    }

    function n(t, i) {
        var e = getSize(i);
        t.style.width = e.width + "px", t.style.height = e.height + "px"
    }
    var s = document.documentElement.style,
        o = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        r = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[o],
        a = $(t),
        d = a.find(".grid").isotope({ itemSelector: ".animate-item-size-item", percentPosition: !0, masonry: { columnWidth: ".grid-sizer" } });
    d.on("click", ".animate-item-size-item__content", function() {
        var t = this;
        i(t);
        var s = t.parentNode;
        s.classList.toggle("is-expanded");
        t.offsetWidth;
        t.style[o] = "", e(t), n(t, s), d.isotope("layout")
    })
};
ID.modules.appended = function(e) {
    "use strict";
    var t = $(e),
        n = t.find(".grid").isotope({ masonry: { columnWidth: 50 } });
    t.find(".append-button").on("click", function() {
        var e = $([ID.getItemElement(), ID.getItemElement(), ID.getItemElement()]);
        n.append(e).isotope("appended", e)
    })
};
ID.modules["arrange-complete"] = function(t) {
    "use strict";
    var o = $(t),
        n = o.find(".grid").isotope({ masonry: { columnWidth: 50 } });
    n.on("arrangeComplete", function(t, o) { ID.notify("Isotope arrange completed on " + o.length + " items") }), o.find(".button-group").on("click", "button", function() {
        var t = $(this).attr("data-filter");
        n.isotope({ filter: t })
    })
};
ID.modules["combination-filters"] = function(t) {
    "use strict";

    function o(t) { var o = ""; for (var i in t) o += t[i]; return o }
    var i = $(t),
        r = i.find(".grid").isotope({ itemSelector: ".color-shape", columnWidth: 80, transitionDuration: "0.6s" }),
        n = i.find(".code-display code"),
        e = {};
    i.on("click", ".button", function() {
        var t = $(this),
            i = t.parents(".button-group"),
            a = i.attr("data-filter-group");
        e[a] = t.attr("data-filter");
        var s = o(e);
        r.isotope({ filter: s }), n.displayIsotopeCode("filter", s)
    })
};
ID.modules.destroy = function(o) {
    "use strict";
    var t = $(o),
        i = { masonry: { columnWidth: 50 } },
        n = t.find(".grid").isotope(i),
        s = !0;
    t.find(".toggle-button").on("click", function() { s ? n.isotope("destroy") : n.isotope(i), s = !s })
};
ID.modules["filtering-demo"] = function(t) {
    "use strict";
    var n = $(t),
        e = n.find(".grid").isotope({ itemSelector: ".element-item", layoutMode: "fitRows", transitionDuration: "0.6s" }),
        i = { numberGreaterThan50: function() { var t = $(this).find(".number").text(); return parseInt(t, 10) > 50 }, ium: function() { var t = $(this).find(".name").text(); return t.match(/ium$/) } },
        r = { numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}", ium: "function() {\n  var name = $(this).find('.name').text();\n  return name.match( /ium$/ );\n}" },
        o = n.find(".code-display code");
    n.find(".filter-button-group").on("click", "button", function() {
        var t = $(this).attr("data-filter"),
            n = i[t] || t,
            u = r[t] || t;
        e.isotope({ filter: n }), o.displayIsotopeCode("filter", u)
    })
};
ID.modules["imagesloaded-callback"] = function(e) { "use strict"; var i = $(e).imagesLoaded(function() { i.isotope({ itemSelector: ".grid-image-item", percentPosition: !0, masonry: { columnWidth: ".grid-sizer" } }) }) };
ID.modules["imagesloaded-progress"] = function(e) {
    "use strict";
    var o = $(e).isotope({ itemSelector: ".grid-image-item", percentPosition: !0, masonry: { columnWidth: ".grid-sizer" } });
    o.imagesLoaded().progress(function() { o.isotope("layout") })
};
ID.modules["layout-complete"] = function(o) {
    "use strict";
    var t = $(o),
        i = t.find(".grid").isotope({ masonry: { columnWidth: 50 } });
    i.on("layoutComplete", function(o, t) { ID.notify("Isotope layout completed on " + t.length + " items") }), i.on("click", ".grid-item", function() { $(this).toggleClass("grid-item--gigante"), i.isotope("layout") })
};
ID.modules["layout-demo"] = function(i) {
    "use strict";
    var o = $(i),
        t = o.find(".grid").isotope({ masonry: { columnWidth: 50 } });
    t.on("click", ".grid-item", function() { $(this).toggleClass("grid-item--gigante"), t.isotope("layout") })
};
ID.modules["layout-modes-demo"] = function(o) {
    "use strict";
    var t = $(window),
        i = $(o),
        a = i.find(".grid").isotope({ itemSelector: ".grid-splash-item", layoutMode: "masonry", transitionDuration: "0.6s", masonry: { columnWidth: 110 }, cellsByRow: { columnWidth: 220, rowHeight: 220 }, masonryHorizontal: { rowHeight: 110 }, cellsByColumn: { columnWidth: 220, rowHeight: 220 } }),
        e = !1,
        d = i.find(".code-display code");
    i.find(".button-group").on("click", "button", function() {
        var o = $(this),
            i = !!o.attr("data-is-horizontal");
        if (e != i) {
            var n = i ? { height: .7 * t.height() } : { width: "auto" };
            a.css(n), e = i
        }
        var s = o.attr("data-layout-mode");
        a.isotope({ layoutMode: s }), d.displayIsotopeCode("layoutMode", s)
    })
};
ID.modules.insert = function(t) {
    "use strict";
    var n = $(t),
        r = n.find(".grid").isotope({ masonry: { columnWidth: 50 }, filter: function() { var t = $(this).find(".number").text(); return parseInt(t, 10) % 2 }, sortBy: "number", getSortData: { number: ".number parseInt" } });
    n.find(".insert-button").on("click", function() {
        for (var t = [], n = 0; 3 > n; n++) {
            var e = ID.getItemElement(),
                o = Math.floor(100 * Math.random());
            $(e).append('<p class="number">' + o + "</p>"), t.push(e)
        }
        r.isotope("insert", t)
    })
};
ID.modules["multiple-sort-by"] = function(t) {
    "use strict";

    function o(t) { return t.split(",") }
    var r = $(t),
        i = r.find(".button-group"),
        e = r.find(".grid").isotope({ layoutMode: "fitRows", itemSelector: ".grid-multi-item", getSortData: { color: "[data-color]", number: ".number parseInt" }, sortBy: ["color", "number"] });
    i.on("click", "button", function() { e.isotope({ sortBy: o(this.getAttribute("data-sort-by")) }) })
};
ID.modules.prepended = function(e) {
    "use strict";
    var t = $(e),
        n = t.find(".grid").isotope({ masonry: { columnWidth: 50 } });
    t.find(".prepend-button").on("click", function() {
        var e = $([ID.getItemElement(), ID.getItemElement(), ID.getItemElement()]);
        n.prepend(e).isotope("prepended", e)
    })
};
ID.modules.remove = function(o) {
    "use strict";
    var i = $(o),
        t = i.find(".grid").isotope({ masonry: { columnWidth: 50 } });
    t.on("click", ".grid-item", function() { t.isotope("remove", this).isotope("layout") })
};
ID.modules["remove-complete"] = function(o) {
    "use strict";
    var e = $(o),
        t = e.find(".grid").isotope({ masonry: { columnWidth: 50 } });
    t.on("removeComplete", function(o, e) { ID.notify("Removed " + e.length + " items") }), t.on("click", ".grid-item", function() { t.isotope("remove", this).isotope("layout") })
};
ID.modules.shuffle = function(o) {
    "use strict";
    var f = $(o),
        i = f.find(".grid").isotope({ masonry: { columnWidth: 50 } });
    f.find(".shuffle-button").on("click", function() { i.isotope("shuffle") })
};
ID.modules["sorting-demo"] = function(t) {
    "use strict";
    var o = $(t),
        e = o.find(".sort-by-button-group"),
        r = o.find(".grid").isotope({ itemSelector: ".element-item", layoutMode: "fitRows", transitionDuration: "0.6s", getSortData: { name: ".name", symbol: ".symbol", number: ".number parseInt", category: "[data-category]", weight: function(t) { var o = $(t).find(".weight").text(); return parseFloat(o.replace(/[\(\)]/g, "")) } } }),
        i = o.find(".code-display code");
    e.on("click", "button", function() {
        var t = $(this).attr("data-sort-by");
        r.isotope({ sortBy: t }), i.displayIsotopeCode("sortBy", t)
    })
};
ID.modules.stagger = function(t) {
    "use strict";
    var o = $(t),
        r = o.find(".grid").isotope({ layoutMode: "fitRows", stagger: 30 });
    o.find(".button-group").on("click", ".button", function(t) {
        var o = $(t.currentTarget).attr("data-filter");
        r.isotope({ filter: o })
    })
};
ID.modules["stamp-methods"] = function(t) {
    "use strict";
    var o = $(t),
        i = o.find(".grid").isotope({ itemSelector: ".grid-item", masonry: { columnWidth: 50 } }),
        s = i.find(".stamp"),
        n = !1;
    o.find(".stamp-button").on("click", function() { n ? i.isotope("unstamp", s) : i.isotope("stamp", s), i.isotope("layout"), n = !n })
};
ID.modules["vertical-list"] = function(t) {
    "use strict";
    var e = $(t),
        o = e.find(".vertical-list").isotope({ itemSelector: "li", layoutMode: "vertical", transitionDuration: "0.6s", getSortData: { name: ".name", symbol: ".symbol", number: ".number parseInt", category: ".category", weight: function(t) { var e = $(t).find(".weight").text(); return parseFloat(e.replace(/[\(\)]/g, "")) } } });
    e.find(".button-group").on("click", "button", function() {
        var t = $(this).attr("data-sort-by");
        o.isotope({ sortBy: t })
    })
};
ID.modules["visible-hidden-style"] = function(t) {
    "use strict";
    var i = $(t),
        e = i.find(".grid").isotope({ layoutMode: "fitRows", visibleStyle: { opacity: 1 }, hiddenStyle: { opacity: 0 } });
    i.find(".button-group").on("click", ".button", function(t) {
        var i = $(t.currentTarget).attr("data-filter");
        e.isotope({ filter: i })
    })
};
! function() {
    "use strict";
    $("[data-js-module]").each(function(t, e) {
        var s = e.getAttribute("data-js-module"),
            a = ID.modules[s];
        a && a(e)
    }), $(".js-radio-button-group").each(function(t, e) {
        var s = $(e);
        s.find(":checked").parent().addClass("is-checked"), s.on("click", "input, button", function() {
            s.find(".is-checked").removeClass("is-checked");
            var t = $(this),
                e = t.hasClass("button") ? t : t.parents(".button");
            e.addClass("is-checked")
        })
    })
}();









/*
 *  jQuery OwlCarousel v1.3.3
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *  Licensed under MIT
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */

"function" != typeof Object.create && (Object.create = function(t) {
        function e() {}
        return e.prototype = t, new e
    }),
    function(t, e, o) {
        var i = {
            init: function(e, o) {
                var i = this;
                i.$elem = t(o), i.options = t.extend({}, t.fn.owlCarousel.options, i.$elem.data(), e), i.userOptions = e, i.loadContent()
            },
            loadContent: function() {
                function e(t) {
                    var e, o = "";
                    if ("function" == typeof i.options.jsonSuccess) i.options.jsonSuccess.apply(this, [t]);
                    else {
                        for (e in t.owl) t.owl.hasOwnProperty(e) && (o += t.owl[e].item);
                        i.$elem.html(o)
                    }
                    i.logIn()
                }
                var o, i = this;
                "function" == typeof i.options.beforeInit && i.options.beforeInit.apply(this, [i.$elem]), "string" == typeof i.options.jsonPath ? (o = i.options.jsonPath, t.getJSON(o, e)) : i.logIn()
            },
            logIn: function() {
                var t = this;
                t.$elem.data({ "owl-originalStyles": t.$elem.attr("style"), "owl-originalClasses": t.$elem.attr("class") }), t.$elem.css({ opacity: 0 }), t.orignalItems = t.options.items, t.checkBrowser(), t.wrapperWidth = 0, t.checkVisible = null, t.setVars()
            },
            setVars: function() { var t = this; return 0 === t.$elem.children().length ? !1 : (t.baseClass(), t.eventTypes(), t.$userItems = t.$elem.children(), t.itemsAmount = t.$userItems.length, t.wrapItems(), t.$owlItems = t.$elem.find(".owl-item"), t.$owlWrapper = t.$elem.find(".owl-wrapper"), t.playDirection = "next", t.prevItem = 0, t.prevArr = [0], t.currentItem = 0, t.customEvents(), void t.onStartup()) },
            onStartup: function() {
                var t = this;
                t.updateItems(), t.calculateAll(), t.buildControls(), t.updateControls(), t.response(), t.moveEvents(), t.stopOnHover(), t.owlStatus(), t.options.transitionStyle !== !1 && t.transitionTypes(t.options.transitionStyle), t.options.autoPlay === !0 && (t.options.autoPlay = 5e3), t.play(), t.$elem.find(".owl-wrapper").css("display", "block"), t.$elem.is(":visible") ? t.$elem.css("opacity", 1) : t.watchVisibility(), t.onstartup = !1, t.eachMoveUpdate(), "function" == typeof t.options.afterInit && t.options.afterInit.apply(this, [t.$elem])
            },
            eachMoveUpdate: function() {
                var t = this;
                t.options.lazyLoad === !0 && t.lazyLoad(), t.options.autoHeight === !0 && t.autoHeight(), t.onVisibleItems(), "function" == typeof t.options.afterAction && t.options.afterAction.apply(this, [t.$elem])
            },
            updateVars: function() { var t = this; "function" == typeof t.options.beforeUpdate && t.options.beforeUpdate.apply(this, [t.$elem]), t.watchVisibility(), t.updateItems(), t.calculateAll(), t.updatePosition(), t.updateControls(), t.eachMoveUpdate(), "function" == typeof t.options.afterUpdate && t.options.afterUpdate.apply(this, [t.$elem]) },
            reload: function() {
                var t = this;
                e.setTimeout(function() { t.updateVars() }, 0)
            },
            watchVisibility: function() { var t = this; return t.$elem.is(":visible") !== !1 ? !1 : (t.$elem.css({ opacity: 0 }), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), void(t.checkVisible = e.setInterval(function() { t.$elem.is(":visible") && (t.reload(), t.$elem.animate({ opacity: 1 }, 200), e.clearInterval(t.checkVisible)) }, 500))) },
            wrapItems: function() {
                var t = this;
                t.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), t.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), t.wrapperOuter = t.$elem.find(".owl-wrapper-outer"), t.$elem.css("display", "block")
            },
            baseClass: function() {
                var t = this,
                    e = t.$elem.hasClass(t.options.baseClass),
                    o = t.$elem.hasClass(t.options.theme);
                e || t.$elem.addClass(t.options.baseClass), o || t.$elem.addClass(t.options.theme)
            },
            updateItems: function() {
                var e, o, i = this;
                if (i.options.responsive === !1) return !1;
                if (i.options.singleItem === !0) return i.options.items = i.orignalItems = 1, i.options.itemsCustom = !1, i.options.itemsDesktop = !1, i.options.itemsDesktopSmall = !1, i.options.itemsTablet = !1, i.options.itemsTabletSmall = !1, i.options.itemsMobile = !1, !1;
                if (e = t(i.options.responsiveBaseWidth).width(), e > (i.options.itemsDesktop[0] || i.orignalItems) && (i.options.items = i.orignalItems), i.options.itemsCustom !== !1)
                    for (i.options.itemsCustom.sort(function(t, e) { return t[0] - e[0] }), o = 0; o < i.options.itemsCustom.length; o += 1) i.options.itemsCustom[o][0] <= e && (i.options.items = i.options.itemsCustom[o][1]);
                else e <= i.options.itemsDesktop[0] && i.options.itemsDesktop !== !1 && (i.options.items = i.options.itemsDesktop[1]), e <= i.options.itemsDesktopSmall[0] && i.options.itemsDesktopSmall !== !1 && (i.options.items = i.options.itemsDesktopSmall[1]), e <= i.options.itemsTablet[0] && i.options.itemsTablet !== !1 && (i.options.items = i.options.itemsTablet[1]), e <= i.options.itemsTabletSmall[0] && i.options.itemsTabletSmall !== !1 && (i.options.items = i.options.itemsTabletSmall[1]), e <= i.options.itemsMobile[0] && i.options.itemsMobile !== !1 && (i.options.items = i.options.itemsMobile[1]);
                i.options.items > i.itemsAmount && i.options.itemsScaleUp === !0 && (i.options.items = i.itemsAmount)
            },
            response: function() { var o, i, n = this; return n.options.responsive !== !0 ? !1 : (i = t(e).width(), n.resizer = function() { t(e).width() !== i && (n.options.autoPlay !== !1 && e.clearInterval(n.autoPlayInterval), e.clearTimeout(o), o = e.setTimeout(function() { i = t(e).width(), n.updateVars() }, n.options.responsiveRefreshRate)) }, void t(e).resize(n.resizer)) },
            updatePosition: function() {
                var t = this;
                t.jumpTo(t.currentItem), t.options.autoPlay !== !1 && t.checkAp()
            },
            appendItemsSizes: function() {
                var e = this,
                    o = 0,
                    i = e.itemsAmount - e.options.items;
                e.$owlItems.each(function(n) {
                    var s = t(this);
                    s.css({ width: e.itemWidth }).data("owl-item", Number(n)), (n % e.options.items === 0 || n === i) && (n > i || (o += 1)), s.data("owl-roundPages", o)
                })
            },
            appendWrapperSizes: function() {
                var t = this,
                    e = t.$owlItems.length * t.itemWidth;
                t.$owlWrapper.css({ width: 2 * e, left: 0 }), t.appendItemsSizes()
            },
            calculateAll: function() {
                var t = this;
                t.calculateWidth(), t.appendWrapperSizes(), t.loops(), t.max()
            },
            calculateWidth: function() {
                var t = this;
                t.itemWidth = Math.round(t.$elem.width() / t.options.items)
            },
            max: function() {
                var t = this,
                    e = -1 * (t.itemsAmount * t.itemWidth - t.options.items * t.itemWidth);
                return t.options.items > t.itemsAmount ? (t.maximumItem = 0, e = 0, t.maximumPixels = 0) : (t.maximumItem = t.itemsAmount - t.options.items, t.maximumPixels = e), e
            },
            min: function() { return 0 },
            loops: function() {
                var e, o, i, n = this,
                    s = 0,
                    a = 0;
                for (n.positionsInArray = [0], n.pagesInArray = [], e = 0; e < n.itemsAmount; e += 1) a += n.itemWidth, n.positionsInArray.push(-a), n.options.scrollPerPage === !0 && (o = t(n.$owlItems[e]), i = o.data("owl-roundPages"), i !== s && (n.pagesInArray[s] = n.positionsInArray[e], s = i))
            },
            buildControls: function() {
                var e = this;
                (e.options.navigation === !0 || e.options.pagination === !0) && (e.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem)), e.options.pagination === !0 && e.buildPagination(), e.options.navigation === !0 && e.buildButtons()
            },
            buildButtons: function() {
                var e = this,
                    o = t('<div class="owl-buttons"/>');
                e.owlControls.append(o), e.buttonPrev = t("<div/>", { "class": "owl-prev", html: e.options.navigationText[0] || "" }), e.buttonNext = t("<div/>", { "class": "owl-next", html: e.options.navigationText[1] || "" }), o.append(e.buttonPrev).append(e.buttonNext), o.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(t) { t.preventDefault() }), o.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(o) { o.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev() })
            },
            buildPagination: function() {
                var e = this;
                e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(o) { o.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0) })
            },
            updatePagination: function() {
                var e, o, i, n, s, a, r = this;
                if (r.options.pagination === !1) return !1;
                for (r.paginationWrapper.html(""), e = 0, o = r.itemsAmount - r.itemsAmount % r.options.items, n = 0; n < r.itemsAmount; n += 1) n % r.options.items === 0 && (e += 1, o === n && (i = r.itemsAmount - r.options.items), s = t("<div/>", { "class": "owl-page" }), a = t("<span></span>", { text: r.options.paginationNumbers === !0 ? e : "", "class": r.options.paginationNumbers === !0 ? "owl-numbers" : "" }), s.append(a), s.data("owl-page", o === n ? i : n), s.data("owl-roundPages", e), r.paginationWrapper.append(s));
                r.checkPagination()
            },
            checkPagination: function() { var e = this; return e.options.pagination === !1 ? !1 : void e.paginationWrapper.find(".owl-page").each(function() { t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active")) }) },
            checkNavigation: function() { var t = this; return t.options.navigation === !1 ? !1 : void(t.options.rewindNav === !1 && (0 === t.currentItem && 0 === t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.addClass("disabled")) : 0 === t.currentItem && 0 !== t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.removeClass("disabled")) : t.currentItem === t.maximumItem ? (t.buttonPrev.removeClass("disabled"), t.buttonNext.addClass("disabled")) : 0 !== t.currentItem && t.currentItem !== t.maximumItem && (t.buttonPrev.removeClass("disabled"), t.buttonNext.removeClass("disabled")))) },
            updateControls: function() {
                var t = this;
                t.updatePagination(), t.checkNavigation(), t.owlControls && (t.options.items >= t.itemsAmount ? t.owlControls.hide() : t.owlControls.show())
            },
            destroyControls: function() {
                var t = this;
                t.owlControls && t.owlControls.remove()
            },
            next: function(t) {
                var e = this;
                if (e.isTransition) return !1;
                if (e.currentItem += e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem > e.maximumItem + (e.options.scrollPerPage === !0 ? e.options.items - 1 : 0)) {
                    if (e.options.rewindNav !== !0) return e.currentItem = e.maximumItem, !1;
                    e.currentItem = 0, t = "rewind"
                }
                e.goTo(e.currentItem, t)
            },
            prev: function(t) {
                var e = this;
                if (e.isTransition) return !1;
                if (e.options.scrollPerPage === !0 && e.currentItem > 0 && e.currentItem < e.options.items ? e.currentItem = 0 : e.currentItem -= e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem < 0) {
                    if (e.options.rewindNav !== !0) return e.currentItem = 0, !1;
                    e.currentItem = e.maximumItem, t = "rewind"
                }
                e.goTo(e.currentItem, t)
            },
            goTo: function(t, o, i) { var n, s = this; return s.isTransition ? !1 : ("function" == typeof s.options.beforeMove && s.options.beforeMove.apply(this, [s.$elem]), t >= s.maximumItem ? t = s.maximumItem : 0 >= t && (t = 0), s.currentItem = s.owl.currentItem = t, s.options.transitionStyle !== !1 && "drag" !== i && 1 === s.options.items && s.browser.support3d === !0 ? (s.swapSpeed(0), s.browser.support3d === !0 ? s.transition3d(s.positionsInArray[t]) : s.css2slide(s.positionsInArray[t], 1), s.afterGo(), s.singleItemTransition(), !1) : (n = s.positionsInArray[t], s.browser.support3d === !0 ? (s.isCss3Finish = !1, o === !0 ? (s.swapSpeed("paginationSpeed"), e.setTimeout(function() { s.isCss3Finish = !0 }, s.options.paginationSpeed)) : "rewind" === o ? (s.swapSpeed(s.options.rewindSpeed), e.setTimeout(function() { s.isCss3Finish = !0 }, s.options.rewindSpeed)) : (s.swapSpeed("slideSpeed"), e.setTimeout(function() { s.isCss3Finish = !0 }, s.options.slideSpeed)), s.transition3d(n)) : o === !0 ? s.css2slide(n, s.options.paginationSpeed) : "rewind" === o ? s.css2slide(n, s.options.rewindSpeed) : s.css2slide(n, s.options.slideSpeed), void s.afterGo())) },
            jumpTo: function(t) { var e = this; "function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), t >= e.maximumItem || -1 === t ? t = e.maximumItem : 0 >= t && (t = 0), e.swapSpeed(0), e.browser.support3d === !0 ? e.transition3d(e.positionsInArray[t]) : e.css2slide(e.positionsInArray[t], 1), e.currentItem = e.owl.currentItem = t, e.afterGo() },
            afterGo: function() {
                var t = this;
                t.prevArr.push(t.currentItem), t.prevItem = t.owl.prevItem = t.prevArr[t.prevArr.length - 2], t.prevArr.shift(0), t.prevItem !== t.currentItem && (t.checkPagination(), t.checkNavigation(), t.eachMoveUpdate(), t.options.autoPlay !== !1 && t.checkAp()), "function" == typeof t.options.afterMove && t.prevItem !== t.currentItem && t.options.afterMove.apply(this, [t.$elem])
            },
            stop: function() {
                var t = this;
                t.apStatus = "stop", e.clearInterval(t.autoPlayInterval)
            },
            checkAp: function() { var t = this; "stop" !== t.apStatus && t.play() },
            play: function() { var t = this; return t.apStatus = "play", t.options.autoPlay === !1 ? !1 : (e.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = e.setInterval(function() { t.next(!0) }, t.options.autoPlay))) },
            swapSpeed: function(t) { var e = this; "slideSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)) : "paginationSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)) : "string" != typeof t && e.$owlWrapper.css(e.addCssSpeed(t)) },
            addCssSpeed: function(t) { return { "-webkit-transition": "all " + t + "ms ease", "-moz-transition": "all " + t + "ms ease", "-o-transition": "all " + t + "ms ease", transition: "all " + t + "ms ease" } },
            removeTransition: function() { return { "-webkit-transition": "", "-moz-transition": "", "-o-transition": "", transition: "" } },
            doTranslate: function(t) { return { "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)", "-moz-transform": "translate3d(" + t + "px, 0px, 0px)", "-o-transform": "translate3d(" + t + "px, 0px, 0px)", "-ms-transform": "translate3d(" + t + "px, 0px, 0px)", transform: "translate3d(" + t + "px, 0px,0px)" } },
            transition3d: function(t) {
                var e = this;
                e.$owlWrapper.css(e.doTranslate(t))
            },
            css2move: function(t) {
                var e = this;
                e.$owlWrapper.css({ left: t })
            },
            css2slide: function(t, e) {
                var o = this;
                o.isCssFinish = !1, o.$owlWrapper.stop(!0, !0).animate({ left: t }, { duration: e || o.options.slideSpeed, complete: function() { o.isCssFinish = !0 } })
            },
            checkBrowser: function() {
                var t, i, n, s, a = this,
                    r = "translate3d(0px, 0px, 0px)",
                    l = o.createElement("div");
                l.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r, t = /translate3d\(0px, 0px, 0px\)/g, i = l.style.cssText.match(t), n = null !== i && 1 === i.length, s = "ontouchstart" in e || e.navigator.msMaxTouchPoints, a.browser = { support3d: n, isTouch: s }
            },
            moveEvents: function() {
                var t = this;
                (t.options.mouseDrag !== !1 || t.options.touchDrag !== !1) && (t.gestures(), t.disabledEvents())
            },
            eventTypes: function() {
                var t = this,
                    e = ["s", "e", "x"];
                t.ev_types = {}, t.options.mouseDrag === !0 && t.options.touchDrag === !0 ? e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : t.options.mouseDrag === !1 && t.options.touchDrag === !0 ? e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : t.options.mouseDrag === !0 && t.options.touchDrag === !1 && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), t.ev_types.start = e[0], t.ev_types.move = e[1], t.ev_types.end = e[2]
            },
            disabledEvents: function() {
                var e = this;
                e.$elem.on("dragstart.owl", function(t) { t.preventDefault() }), e.$elem.on("mousedown.disableTextSelect", function(e) { return t(e.target).is("input, textarea, select, option") })
            },
            gestures: function() {
                function i(t) { if (void 0 !== t.touches) return { x: t.touches[0].pageX, y: t.touches[0].pageY }; if (void 0 === t.touches) { if (void 0 !== t.pageX) return { x: t.pageX, y: t.pageY }; if (void 0 === t.pageX) return { x: t.clientX, y: t.clientY } } }

                function n(e) { "on" === e ? (t(o).on(l.ev_types.move, a), t(o).on(l.ev_types.end, r)) : "off" === e && (t(o).off(l.ev_types.move), t(o).off(l.ev_types.end)) }

                function s(o) {
                    var s, a = o.originalEvent || o || e.event;
                    if (3 === a.which) return !1;
                    if (!(l.itemsAmount <= l.options.items)) {
                        if (l.isCssFinish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                        if (l.isCss3Finish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                        l.options.autoPlay !== !1 && e.clearInterval(l.autoPlayInterval), l.browser.isTouch === !0 || l.$owlWrapper.hasClass("grabbing") || l.$owlWrapper.addClass("grabbing"), l.newPosX = 0, l.newRelativeX = 0, t(this).css(l.removeTransition()), s = t(this).position(), p.relativePos = s.left, p.offsetX = i(a).x - s.left, p.offsetY = i(a).y - s.top, n("on"), p.sliding = !1, p.targetElement = a.target || a.srcElement
                    }
                }

                function a(n) {
                    var s, a, r = n.originalEvent || n || e.event;
                    l.newPosX = i(r).x - p.offsetX, l.newPosY = i(r).y - p.offsetY, l.newRelativeX = l.newPosX - p.relativePos, "function" == typeof l.options.startDragging && p.dragging !== !0 && 0 !== l.newRelativeX && (p.dragging = !0, l.options.startDragging.apply(l, [l.$elem])), (l.newRelativeX > 8 || l.newRelativeX < -8) && l.browser.isTouch === !0 && (void 0 !== r.preventDefault ? r.preventDefault() : r.returnValue = !1, p.sliding = !0), (l.newPosY > 10 || l.newPosY < -10) && p.sliding === !1 && t(o).off("touchmove.owl"), s = function() { return l.newRelativeX / 5 }, a = function() { return l.maximumPixels + l.newRelativeX / 5 }, l.newPosX = Math.max(Math.min(l.newPosX, s()), a()), l.browser.support3d === !0 ? l.transition3d(l.newPosX) : l.css2move(l.newPosX)
                }

                function r(o) {
                    var i, s, a, r = o.originalEvent || o || e.event;
                    r.target = r.target || r.srcElement, p.dragging = !1, l.browser.isTouch !== !0 && l.$owlWrapper.removeClass("grabbing"), l.newRelativeX < 0 ? l.dragDirection = l.owl.dragDirection = "left" : l.dragDirection = l.owl.dragDirection = "right", 0 !== l.newRelativeX && (i = l.getNewPosition(), l.goTo(i, !1, "drag"), p.targetElement === r.target && l.browser.isTouch !== !0 && (t(r.target).on("click.disable", function(e) { e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable") }), s = t._data(r.target, "events").click, a = s.pop(), s.splice(0, 0, a))), n("off")
                }
                var l = this,
                    p = { offsetX: 0, offsetY: 0, baseElWidth: 0, relativePos: 0, position: null, minSwipe: null, maxSwipe: null, sliding: null, dargging: null, targetElement: null };
                l.isCssFinish = !0, l.$elem.on(l.ev_types.start, ".owl-wrapper", s)
            },
            getNewPosition: function() {
                var t = this,
                    e = t.closestItem();
                return e > t.maximumItem ? (t.currentItem = t.maximumItem, e = t.maximumItem) : t.newPosX >= 0 && (e = 0, t.currentItem = 0), e
            },
            closestItem: function() {
                var e = this,
                    o = e.options.scrollPerPage === !0 ? e.pagesInArray : e.positionsInArray,
                    i = e.newPosX,
                    n = null;
                return t.each(o, function(s, a) { i - e.itemWidth / 20 > o[s + 1] && i - e.itemWidth / 20 < a && "left" === e.moveDirection() ? (n = a, e.options.scrollPerPage === !0 ? e.currentItem = t.inArray(n, e.positionsInArray) : e.currentItem = s) : i + e.itemWidth / 20 < a && i + e.itemWidth / 20 > (o[s + 1] || o[s] - e.itemWidth) && "right" === e.moveDirection() && (e.options.scrollPerPage === !0 ? (n = o[s + 1] || o[o.length - 1], e.currentItem = t.inArray(n, e.positionsInArray)) : (n = o[s + 1], e.currentItem = s + 1)) }), e.currentItem
            },
            moveDirection: function() { var t, e = this; return e.newRelativeX < 0 ? (t = "right", e.playDirection = "next") : (t = "left", e.playDirection = "prev"), t },
            customEvents: function() {
                var t = this;
                t.$elem.on("owl.next", function() { t.next() }), t.$elem.on("owl.prev", function() { t.prev() }), t.$elem.on("owl.play", function(e, o) { t.options.autoPlay = o, t.play(), t.hoverStatus = "play" }), t.$elem.on("owl.stop", function() { t.stop(), t.hoverStatus = "stop" }), t.$elem.on("owl.goTo", function(e, o) { t.goTo(o) }), t.$elem.on("owl.jumpTo", function(e, o) { t.jumpTo(o) })
            },
            stopOnHover: function() {
                var t = this;
                t.options.stopOnHover === !0 && t.browser.isTouch !== !0 && t.options.autoPlay !== !1 && (t.$elem.on("mouseover", function() { t.stop() }), t.$elem.on("mouseout", function() { "stop" !== t.hoverStatus && t.play() }))
            },
            lazyLoad: function() { var e, o, i, n, s, a = this; if (a.options.lazyLoad === !1) return !1; for (e = 0; e < a.itemsAmount; e += 1) o = t(a.$owlItems[e]), "loaded" !== o.data("owl-loaded") && (i = o.data("owl-item"), n = o.find(".lazyOwl"), "string" == typeof n.data("src") ? (void 0 === o.data("owl-loaded") && (n.hide(), o.addClass("loading").data("owl-loaded", "checked")), s = a.options.lazyFollow === !0 ? i >= a.currentItem : !0, s && i < a.currentItem + a.options.items && n.length && n.each(function() { a.lazyPreload(o, t(this)) })) : o.data("owl-loaded", "loaded")) },
            lazyPreload: function(t, o) {
                function i() { t.data("owl-loaded", "loaded").removeClass("loading"), o.removeAttr("data-src"), "fade" === a.options.lazyEffect ? o.fadeIn(400) : o.show(), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem]) }

                function n() { r += 1, a.completeImg(o.get(0)) || s === !0 ? i() : 100 >= r ? e.setTimeout(n, 100) : i() }
                var s, a = this,
                    r = 0;
                "DIV" === o.prop("tagName") ? (o.css("background-image", "url(" + o.data("src") + ")"), s = !0) : o[0].src = o.data("src"), n()
            },
            autoHeight: function() {
                function o() {
                    var o = t(s.$owlItems[s.currentItem]).height();
                    s.wrapperOuter.css("height", o + "px"), s.wrapperOuter.hasClass("autoHeight") || e.setTimeout(function() { s.wrapperOuter.addClass("autoHeight") }, 0)
                }

                function i() { n += 1, s.completeImg(a.get(0)) ? o() : 100 >= n ? e.setTimeout(i, 100) : s.wrapperOuter.css("height", "") }
                var n, s = this,
                    a = t(s.$owlItems[s.currentItem]).find("img");
                void 0 !== a.get(0) ? (n = 0, i()) : o()
            },
            completeImg: function(t) { var e; return t.complete ? (e = typeof t.naturalWidth, "undefined" !== e && 0 === t.naturalWidth ? !1 : !0) : !1 },
            onVisibleItems: function() {
                var e, o = this;
                for (o.options.addClassActive === !0 && o.$owlItems.removeClass("active"), o.visibleItems = [], e = o.currentItem; e < o.currentItem + o.options.items; e += 1) o.visibleItems.push(e), o.options.addClassActive === !0 && t(o.$owlItems[e]).addClass("active");
                o.owl.visibleItems = o.visibleItems
            },
            transitionTypes: function(t) {
                var e = this;
                e.outClass = "owl-" + t + "-out", e.inClass = "owl-" + t + "-in"
            },
            singleItemTransition: function() {
                function t(t) { return { position: "relative", left: t + "px" } }
                var e = this,
                    o = e.outClass,
                    i = e.inClass,
                    n = e.$owlItems.eq(e.currentItem),
                    s = e.$owlItems.eq(e.prevItem),
                    a = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                    r = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2,
                    l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                e.isTransition = !0, e.$owlWrapper.addClass("owl-origin").css({ "-webkit-transform-origin": r + "px", "-moz-perspective-origin": r + "px", "perspective-origin": r + "px" }), s.css(t(a, 10)).addClass(o).on(l, function() { e.endPrev = !0, s.off(l), e.clearTransStyle(s, o) }), n.addClass(i).on(l, function() { e.endCurrent = !0, n.off(l), e.clearTransStyle(n, i) })
            },
            clearTransStyle: function(t, e) {
                var o = this;
                t.css({ position: "", left: "" }).removeClass(e), o.endPrev && o.endCurrent && (o.$owlWrapper.removeClass("owl-origin"), o.endPrev = !1, o.endCurrent = !1, o.isTransition = !1)
            },
            owlStatus: function() {
                var t = this;
                t.owl = { userOptions: t.userOptions, baseElement: t.$elem, userItems: t.$userItems, owlItems: t.$owlItems, currentItem: t.currentItem, prevItem: t.prevItem, visibleItems: t.visibleItems, isTouch: t.browser.isTouch, browser: t.browser, dragDirection: t.dragDirection }
            },
            clearEvents: function() {
                var i = this;
                i.$elem.off(".owl owl mousedown.disableTextSelect"), t(o).off(".owl owl"), t(e).off("resize", i.resizer)
            },
            unWrap: function() {
                var t = this;
                0 !== t.$elem.children().length && (t.$owlWrapper.unwrap(), t.$userItems.unwrap().unwrap(), t.owlControls && t.owlControls.remove()), t.clearEvents(), t.$elem.attr({ style: t.$elem.data("owl-originalStyles") || "", "class": t.$elem.data("owl-originalClasses") })
            },
            destroy: function() {
                var t = this;
                t.stop(), e.clearInterval(t.checkVisible), t.unWrap(), t.$elem.removeData()
            },
            reinit: function(e) {
                var o = this,
                    i = t.extend({}, o.userOptions, e);
                o.unWrap(), o.init(i, o.$elem)
            },
            addItem: function(t, e) { var o, i = this; return t ? 0 === i.$elem.children().length ? (i.$elem.append(t), i.setVars(), !1) : (i.unWrap(), o = void 0 === e || -1 === e ? -1 : e, o >= i.$userItems.length || -1 === o ? i.$userItems.eq(-1).after(t) : i.$userItems.eq(o).before(t), void i.setVars()) : !1 },
            removeItem: function(t) { var e, o = this; return 0 === o.$elem.children().length ? !1 : (e = void 0 === t || -1 === t ? -1 : t, o.unWrap(), o.$userItems.eq(e).remove(), void o.setVars()) }
        };
        t.fn.owlCarousel = function(e) {
            return this.each(function() {
                if (t(this).data("owl-init") === !0) return !1;
                t(this).data("owl-init", !0);
                var o = Object.create(i);
                o.init(e, this), t.data(this, "owlCarousel", o)
            })
        }, t.fn.owlCarousel.options = { items: 5, itemsCustom: !1, itemsDesktop: [1199, 4], itemsDesktopSmall: [979, 3], itemsTablet: [768, 2], itemsTabletSmall: !1, itemsMobile: [479, 1], singleItem: !1, itemsScaleUp: !1, slideSpeed: 200, paginationSpeed: 800, rewindSpeed: 1e3, autoPlay: !1, stopOnHover: !1, navigation: !1, navigationText: ["prev", "next"], rewindNav: !0, scrollPerPage: !1, pagination: !0, paginationNumbers: !1, responsive: !0, responsiveRefreshRate: 200, responsiveBaseWidth: e, baseClass: "owl-carousel", theme: "owl-theme", lazyLoad: !1, lazyFollow: !0, lazyEffect: "fade", autoHeight: !1, jsonPath: !1, jsonSuccess: !1, dragBeforeAnimFinish: !0, mouseDrag: !0, touchDrag: !0, addClassActive: !1, transitionStyle: !1, beforeUpdate: !1, afterUpdate: !1, beforeInit: !1, afterInit: !1, beforeMove: !1, afterMove: !1, afterAction: !1, startDragging: !1, afterLazyLoad: !1 }
    }(jQuery, window, document);















/*
 
 * Author - Harshen Amarnath Pandey
 * Version - 1.0.8
 * Release - 18th April 2015
 * Copyright (c) 2014 - 2018 Harshen Pandey
 */
(function($) {
    $.fn.countdowntimer = function(options) { return this.each(function() { countdown($(this), options); }); };

    function countdown($this, options) {
        var opts = $.extend({}, $.fn.countdowntimer.defaults, options);
        var $this = $this;
        $this.addClass("style");
        var size = "";
        var borderColor = "";
        var fontColor = "";
        var backgroundColor = "";
        var regexpMatchFormat = "";
        var regexpReplaceWith = "";
        size = opts.size;
        borderColor = opts.borderColor;
        fontColor = opts.fontColor;
        backgroundColor = opts.backgroundColor;
        if (options.regexpMatchFormat != undefined && options.regexpReplaceWith != undefined && options.timeSeparator == undefined) {
            window['regexpMatchFormat_' + $this.attr('id')] = options.regexpMatchFormat;
            window['regexpReplaceWith_' + $this.attr('id')] = options.regexpReplaceWith;
        }
        if (options.borderColor != undefined || options.fontColor != undefined || options.backgroundColor != undefined) {
            var customStyle = { "background": backgroundColor, "color": fontColor, "border-color": borderColor }
            $this.css(customStyle);
        } else { $this.addClass("colorDefinition"); }
        if (options.size != undefined) {
            switch (size) {
                case "xl":
                    $this.addClass("size_xl");
                    break;
                case "lg":
                    $this.addClass("size_lg");
                    break;
                case "md":
                    $this.addClass("size_md");
                    break;
                case "sm":
                    $this.addClass("size_sm");
                    break;
                case "xs":
                    $this.addClass("size_xs");
                    break;
            }
        } else if (size == "sm") { $this.addClass("size_sm"); }
        if (options.startDate == undefined && options.dateAndTime == undefined && options.currentTime == undefined && (options.hours != undefined || options.minutes != undefined || options.seconds != undefined)) {
            if (options.hours != undefined && options.minutes == undefined && options.seconds == undefined) {
                hours_H = "";
                minutes_H = "";
                seconds_H = "";
                timer_H = "";
                window['hours_H' + $this.attr('id')] = opts.hours;
                window['minutes_H' + $this.attr('id')] = opts.minutes;
                window['seconds_H' + $this.attr('id')] = opts.seconds;
                if (options.pauseButton != undefined) { pauseTimer($this, "H", opts, onlyHours); }
                if (options.stopButton != undefined) { stopTimer($this, "H", opts, onlyHours); }
                onlyHours($this, opts);
                window['timer_H' + $this.attr('id')] = setInterval(function() { onlyHours($this, opts) }, opts.tickInterval * 1000);
            } else if (options.hours == undefined && options.minutes != undefined && options.seconds == undefined) {
                hours_M = "";
                minutes_M = "";
                seconds_M = "";
                timer_M = "";
                window['hours_M' + $this.attr('id')] = opts.hours;
                window['minutes_M' + $this.attr('id')] = opts.minutes;
                window['seconds_M' + $this.attr('id')] = opts.seconds;
                if (options.pauseButton != undefined) { pauseTimer($this, "M", opts, onlyMinutes); }
                if (options.stopButton != undefined) { stopTimer($this, "M", opts, onlyMinutes); }
                onlyMinutes($this, opts);
                window['timer_M' + $this.attr('id')] = setInterval(function() { onlyMinutes($this, opts) }, opts.tickInterval * 1000);
            } else if (options.hours == undefined && options.minutes == undefined && options.seconds != undefined) {
                hours_S = "";
                minutes_S = "";
                seconds_S = "";
                timer_S = "";
                window['hours_S' + $this.attr('id')] = opts.hours;
                window['minutes_S' + $this.attr('id')] = opts.minutes;
                window['seconds_S' + $this.attr('id')] = opts.seconds;
                if (options.pauseButton != undefined) { pauseTimer($this, "S", opts, onlySeconds); }
                if (options.stopButton != undefined) { stopTimer($this, "S", opts, onlySeconds); }
                onlySeconds($this, opts);
                window['timer_S' + $this.attr('id')] = setInterval(function() { onlySeconds($this, opts) }, opts.tickInterval * 1000);
            } else if (options.hours != undefined && options.minutes != undefined && options.seconds == undefined) {
                hours_HM = "";
                minutes_HM = "";
                seconds_HM = "";
                timer_HM = "";
                window['hours_HM' + $this.attr('id')] = opts.hours;
                window['minutes_HM' + $this.attr('id')] = opts.minutes;
                window['seconds_HM' + $this.attr('id')] = opts.seconds;
                if (options.pauseButton != undefined) { pauseTimer($this, "HM", opts, hoursMinutes); }
                if (options.stopButton != undefined) { stopTimer($this, "HM", opts, hoursMinutes); }
                hoursMinutes($this, opts);
                window['timer_HM' + $this.attr('id')] = setInterval(function() { hoursMinutes($this, opts) }, opts.tickInterval * 1000);
            } else if (options.hours == undefined && options.minutes != undefined && options.seconds != undefined) {
                hours_MS = "";
                minutes_MS = "";
                seconds_MS = "";
                timer_MS = "";
                window['hours_MS' + $this.attr('id')] = opts.hours;
                window['minutes_MS' + $this.attr('id')] = opts.minutes;
                window['seconds_MS' + $this.attr('id')] = opts.seconds;
                if (options.pauseButton != undefined) { pauseTimer($this, "MS", opts, minutesSeconds); }
                if (options.stopButton != undefined) { stopTimer($this, "MS", opts, minutesSeconds); }
                minutesSeconds($this, opts);
                window['timer_MS' + $this.attr('id')] = setInterval(function() { minutesSeconds($this, opts) }, opts.tickInterval * 1000);
            } else if (options.hours != undefined && options.minutes == undefined && options.seconds != undefined) {
                hours_HS = "";
                minutes_HS = "";
                seconds_HS = "";
                timer_HS = "";
                window['hours_HS' + $this.attr('id')] = opts.hours;
                window['minutes_HS' + $this.attr('id')] = opts.minutes;
                window['seconds_HS' + $this.attr('id')] = opts.seconds;
                if (options.pauseButton != undefined) { pauseTimer($this, "HS", opts, hoursSeconds); }
                if (options.stopButton != undefined) { stopTimer($this, "HS", opts, hoursSeconds); }
                hoursSeconds($this, opts);
                window['timer_HS' + $this.attr('id')] = setInterval(function() { hoursSeconds($this, opts) }, opts.tickInterval * 1000);
            } else if (options.hours != undefined && options.minutes != undefined && options.seconds != undefined) {
                hours_HMS = "";
                minutes_HMS = "";
                seconds_HMS = "";
                timer_HMS = "";
                window['hours_HMS' + $this.attr('id')] = opts.hours;
                window['minutes_HMS' + $this.attr('id')] = opts.minutes;
                window['seconds_HMS' + $this.attr('id')] = opts.seconds;
                if (options.pauseButton != undefined) { pauseTimer($this, "HMS", opts, hoursMinutesSeconds); }
                if (options.stopButton != undefined) { stopTimer($this, "HMS", opts, hoursMinutesSeconds); }
                hoursMinutesSeconds($this, opts);
                window['timer_HMS' + $this.attr('id')] = setInterval(function() { hoursMinutesSeconds($this, opts) }, opts.tickInterval * 1000);
            }
        } else if (options.startDate != undefined && options.dateAndTime != undefined && options.currentTime == undefined) {
            startDate = "";
            endDate = "";
            timer_startDate = "";
            window['startDate' + $this.attr('id')] = new Date(opts.startDate);
            window['endDate' + $this.attr('id')] = new Date(opts.dateAndTime);
            var type = "withStart";
            givenDate($this, opts, type);
            window['timer_startDate' + $this.attr('id')] = setInterval(function() { givenDate($this, opts, type) }, opts.tickInterval * 1000);
        } else if (options.startDate == undefined && options.dateAndTime != undefined && options.currentTime == undefined) {
            startTime = "";
            dateTime = "";
            timer_givenDate = "";
            var hour = opts.startDate.getHours() < 10 ? '0' + opts.startDate.getHours() : opts.startDate.getHours();
            var minutes = opts.startDate.getMinutes() < 10 ? '0' + opts.startDate.getMinutes() : opts.startDate.getMinutes();
            var seconds = opts.startDate.getSeconds() < 10 ? '0' + opts.startDate.getSeconds() : opts.startDate.getSeconds();
            var month = (opts.startDate.getMonth() + 1) < 10 ? '0' + (opts.startDate.getMonth() + 1) : (opts.startDate.getMonth() + 1);
            var date = opts.startDate.getDate() < 10 ? '0' + opts.startDate.getDate() : opts.startDate.getDate();
            var year = opts.startDate.getFullYear();
            window['startTime' + $this.attr('id')] = new Date(year + '/' + month + '/' + date + ' ' + hour + ':' + minutes + ':' + seconds);
            window['dateTime' + $this.attr('id')] = new Date(opts.dateAndTime);
            var type = "withnoStart";
            givenDate($this, opts, type);
            window['timer_givenDate' + $this.attr('id')] = setInterval(function() { givenDate($this, opts, type) }, opts.tickInterval * 1000);
        } else if (options.currentTime != undefined) {
            currentTime = "";
            timer_currentDate = "";
            window['currentTime' + $this.attr('id')] = opts.currentTime;
            currentDate($this, opts);
            window['timer_currentDate' + $this.attr('id')] = setInterval(function() { currentDate($this, opts) }, opts.tickInterval * 1000);
        } else {
            countSeconds = "";
            timer_secondsTimer = "";
            window['countSeconds' + $this.attr('id')] = opts.seconds;
            window['timer_secondsTimer' + $this.attr('id')] = setInterval(function() { secondsTimer($this) }, 1000);
        }
    };

    function onlyHours($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_H' + id] == opts.minutes && window['seconds_H' + id] == opts.seconds && window['hours_H' + id] == opts.hours) {
            if (window['hours_H' + id].toString().length < 2) { window['hours_H' + id] = "0" + window['hours_H' + id]; }
            html($this, window['hours_H' + id] + opts.timeSeparator + "00" + opts.timeSeparator + "00");
            window['seconds_H' + id] = 60 - opts.tickInterval;
            window['minutes_H' + id] = 59;
            if (window['hours_H' + id] != 0) { window['hours_H' + id]--; } else {
                delete window['hours_H' + id];
                delete window['minutes_H' + id];
                delete window['seconds_H' + id];
                clearInterval(window['timer_H' + id]);
                timeUp($this, opts);
            }
        } else {
            if (window['hours_H' + id].toString().length < 2) { window['hours_H' + id] = "0" + window['hours_H' + id]; }
            if (window['minutes_H' + id].toString().length < 2) { window['minutes_H' + id] = "0" + window['minutes_H' + id]; }
            if (window['seconds_H' + id].toString().length < 2) { window['seconds_H' + id] = "0" + window['seconds_H' + id]; }
            html($this, window['hours_H' + id] + opts.timeSeparator + window['minutes_H' + id] + opts.timeSeparator + window['seconds_H' + id]);
            window['seconds_H' + id] -= opts.tickInterval;
            if (window['minutes_H' + id] != 0 && window['seconds_H' + id] < 0) {
                window['minutes_H' + id]--;
                window['seconds_H' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_H' + id] == 0 && window['seconds_H' + id] < 0 && window['hours_H' + id] != 0) {
                window['hours_H' + id]--;
                window['minutes_H' + id] = 59;
                window['seconds_H' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_H' + id] == 0 && window['seconds_H' + id] < 0 && window['hours_H' + id] == 0) {
                delete window['hours_H' + id];
                delete window['minutes_H' + id];
                delete window['seconds_H' + id];
                clearInterval(window['timer_H' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    function onlyMinutes($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_M' + id] == opts.minutes && window['seconds_M' + id] == opts.seconds) {
            if (window['minutes_M' + id].toString().length < 2) { window['minutes_M' + id] = "0" + window['minutes_M' + id]; }
            html($this, window['minutes_M' + id] + opts.timeSeparator + "00");
            window['seconds_M' + id] = 60 - opts.tickInterval;
            if (window['minutes_M' + id] != 0) { window['minutes_M' + id]--; } else {
                delete window['hours_M' + id];
                delete window['minutes_M' + id];
                delete window['seconds_M' + id];
                clearInterval(window['timer_M' + id]);
                timeUp($this, opts);
            }
        } else {
            if (window['minutes_M' + id].toString().length < 2) { window['minutes_M' + id] = "0" + window['minutes_M' + id]; }
            if (window['seconds_M' + id].toString().length < 2) { window['seconds_M' + id] = "0" + window['seconds_M' + id]; }
            html($this, window['minutes_M' + id] + opts.timeSeparator + window['seconds_M' + id]);
            window['seconds_M' + id] -= opts.tickInterval;
            if (window['minutes_M' + id] != 0 && window['seconds_M' + id] < 0) {
                window['minutes_M' + id]--;
                window['seconds_M' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_M' + id] == 0 && window['seconds_M' + id] < 0) {
                delete window['hours_M' + id];
                delete window['minutes_M' + id];
                delete window['seconds_M' + id];
                clearInterval(window['timer_M' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    function onlySeconds($this, opts) {
        var id = $this.attr('id');
        if (window['seconds_S' + id].toString().length < 2) { window['seconds_S' + id] = "0" + window['seconds_S' + id]; }
        html($this, window['seconds_S' + id] + " " + "sec");
        window['seconds_S' + id] -= opts.tickInterval;
        if (window['seconds_S' + id] < 0) {
            delete window['hours_S' + id];
            delete window['minutes_S' + id];
            delete window['seconds_S' + id];
            clearInterval(window['timer_S' + id]);
            timeUp($this, opts);
        }
        id = null;
    }

    function hoursMinutes($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_HM' + id] == opts.minutes && window['hours_HM' + id] == opts.hours) {
            if (window['hours_HM' + id].toString().length < 2) { window['hours_HM' + id] = "0" + window['hours_HM' + id]; }
            if (window['minutes_HM' + id].toString().length < 2) { window['minutes_HM' + id] = "0" + window['minutes_HM' + id]; }
            html($this, window['hours_HM' + id] + opts.timeSeparator + window['minutes_HM' + id] + opts.timeSeparator + "00");
            if (window['hours_HM' + id] != 0 && window['minutes_HM' + id] == 0) {
                window['hours_HM' + id]--;
                window['minutes_HM' + id] = 59;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HM' + id] == 0 && window['minutes_HM' + id] != 0) {
                window['seconds_HM' + id] = 60 - opts.tickInterval;
                window['minutes_HM' + id]--;
            } else {
                window['seconds_HM' + id] = 60 - opts.tickInterval;
                window['minutes_HM' + id]--;
            }
            if (window['hours_HM' + id] == 0 && window['minutes_HM' + id] == 0 && window['seconds_HM' + id] == 60) {
                delete window['hours_HM' + id];
                delete window['minutes_HM' + id];
                delete window['seconds_HM' + id];
                clearInterval(window['timer_HM' + id]);
                timeUp($this, opts);
            }
        } else {
            if (window['hours_HM' + id].toString().length < 2) { window['hours_HM' + id] = "0" + window['hours_HM' + id]; }
            if (window['minutes_HM' + id].toString().length < 2) { window['minutes_HM' + id] = "0" + window['minutes_HM' + id]; }
            if (window['seconds_HM' + id].toString().length < 2) { window['seconds_HM' + id] = "0" + window['seconds_HM' + id]; }
            html($this, window['hours_HM' + id] + opts.timeSeparator + window['minutes_HM' + id] + opts.timeSeparator + window['seconds_HM' + id]);
            window['seconds_HM' + id] -= opts.tickInterval;
            if (window['minutes_HM' + id] != 0 && window['seconds_HM' + id] < 0) {
                window['minutes_HM' + id]--;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HM' + id] == 0 && window['seconds_HM' + id] < 0 && window['hours_HM' + id] != 0) {
                window['hours_HM' + id]--;
                window['minutes_HM' + id] = 59;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HM' + id] == 0 && window['seconds_HM' + id] < 0 && window['hours_HM' + id] == 0) {
                delete window['hours_HM' + id];
                delete window['minutes_HM' + id];
                delete window['seconds_HM' + id];
                clearInterval(window['timer_HM' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    function minutesSeconds($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_MS' + id] == opts.minutes && window['seconds_MS' + id] == opts.seconds) {
            if (window['minutes_MS' + id].toString().length < 2) { window['minutes_MS' + id] = "0" + window['minutes_MS' + id]; }
            if (window['seconds_MS' + id].toString().length < 2) { window['seconds_MS' + id] = "0" + window['seconds_MS' + id]; }
            html($this, window['minutes_MS' + id] + opts.timeSeparator + window['seconds_MS' + id]);
            if (window['minutes_MS' + id] != 0 && window['seconds_MS' + id] == 0) {
                window['minutes_MS' + id]--;
                window['seconds_MS' + id] = 60 - opts.tickInterval;
            } else if (window['minutes_MS' + id] == 0 && window['seconds_MS' + id] == 0) {
                delete window['hours_MS' + id];
                delete window['minutes_MS' + id];
                delete window['seconds_MS' + id];
                clearInterval(window['timer_MS' + id]);
                timeUp($this, opts);
            } else { window['seconds_MS' + id] -= opts.tickInterval; }
        } else {
            if (window['minutes_MS' + id].toString().length < 2) { window['minutes_MS' + id] = "0" + window['minutes_MS' + id]; }
            if (window['seconds_MS' + id].toString().length < 2) { window['seconds_MS' + id] = "0" + window['seconds_MS' + id]; }
            html($this, window['minutes_MS' + id] + opts.timeSeparator + window['seconds_MS' + id]);
            window['seconds_MS' + id] -= opts.tickInterval;
            if (window['minutes_MS' + id] != 0 && window['seconds_MS' + id] < 0) {
                window['minutes_MS' + id]--;
                window['seconds_MS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_MS' + id] == 0 && window['seconds_MS' + id] < 0) {
                delete window['hours_MS' + id];
                delete window['minutes_MS' + id];
                delete window['seconds_MS' + id];
                clearInterval(window['timer_MS' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    function hoursSeconds($this, opts) {
        var id = $this.attr('id');
        if (window['seconds_HS' + id] == opts.seconds && window['hours_HS' + id] == opts.hours) {
            if (window['hours_HS' + id].toString().length < 2) { window['hours_HS' + id] = "0" + window['hours_HS' + id]; }
            if (window['seconds_HS' + id].toString().length < 2) { window['seconds_HS' + id] = "0" + window['seconds_HS' + id]; }
            html($this, window['hours_HS' + id] + opts.timeSeparator + "00" + opts.timeSeparator + window['seconds_HS' + id]);
            if (window['hours_HS' + id] == 0 && window['seconds_HS' + id] == 0) {
                delete window['hours_HS' + id];
                delete window['minutes_HS' + id];
                delete window['seconds_HS' + id];
                clearInterval(window['timer_HS' + id]);
                timeUp($this, opts);
            } else if (window['hours_HS' + id] != 0 && window['seconds_HS' + id] == 0) {
                window['hours_HS' + id]--;
                window['minutes_HS' + id] = 59;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            } else { window['seconds_HS' + id] -= opts.tickInterval; }
        } else {
            if (window['hours_HS' + id].toString().length < 2) { window['hours_HS' + id] = "0" + window['hours_HS' + id]; }
            if (window['minutes_HS' + id].toString().length < 2) { window['minutes_HS' + id] = "0" + window['minutes_HS' + id]; }
            if (window['seconds_HS' + id].toString().length < 2) { window['seconds_HS' + id] = "0" + window['seconds_HS' + id]; }
            html($this, window['hours_HS' + id] + opts.timeSeparator + window['minutes_HS' + id] + opts.timeSeparator + window['seconds_HS' + id]);
            window['seconds_HS' + id] -= opts.tickInterval;
            if (window['minutes_HS' + id] != 0 && window['seconds_HS' + id] < 0) {
                window['minutes_HS' + id]--;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HS' + id] == 0 && window['seconds_HS' + id] < 0 && window['hours_HS' + id] != 0) {
                window['hours_HS' + id]--;
                window['minutes_HS' + id] = 59;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HS' + id] == 0 && window['seconds_HS' + id] < 0 && window['hours_HS' + id] == 0) {
                delete window['hours_HS' + id];
                delete window['minutes_HS' + id];
                delete window['seconds_HS' + id];
                clearInterval(window['timer_HS' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    function hoursMinutesSeconds($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_HMS' + id] == opts.minutes && window['seconds_HMS' + id] == opts.seconds && window['hours_HMS' + id] == opts.hours) {
            if (window['hours_HMS' + id].toString().length < 2) { window['hours_HMS' + id] = "0" + window['hours_HMS' + id]; }
            if (window['minutes_HMS' + id].toString().length < 2) { window['minutes_HMS' + id] = "0" + window['minutes_HMS' + id]; }
            if (window['seconds_HMS' + id].toString().length < 2) { window['seconds_HMS' + id] = "0" + window['seconds_HMS' + id]; }
            html($this, window['hours_HMS' + id] + opts.timeSeparator + window['minutes_HMS' + id] + opts.timeSeparator + window['seconds_HMS' + id]);
            if (window['hours_HMS' + id] == 0 && window['minutes_HMS' + id] == 0 && window['seconds_HMS' + id] == 0) {
                delete window['hours_HMS' + id];
                delete window['minutes_HMS' + id];
                delete window['seconds_HMS' + id];
                clearInterval(window['timer_HMS' + id]);
                timeUp($this, opts);
            } else if (window['hours_HMS' + id] != 0 && window['minutes_HMS' + id] == 0 && window['seconds_HMS' + id] == 0) {
                window['hours_HMS' + id]--;
                window['minutes_HMS' + id] = 59;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HMS' + id] == 0 && window['minutes_HMS' + id] != 0 && window['seconds_HMS' + id] == 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HMS' + id] != 0 && window['minutes_HMS' + id] != 0 && window['seconds_HMS' + id] == 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else { window['seconds_HMS' + id] -= opts.tickInterval; }
        } else {
            if (window['hours_HMS' + id].toString().length < 2) { window['hours_HMS' + id] = "0" + window['hours_HMS' + id]; }
            if (window['minutes_HMS' + id].toString().length < 2) { window['minutes_HMS' + id] = "0" + window['minutes_HMS' + id]; }
            if (window['seconds_HMS' + id].toString().length < 2) { window['seconds_HMS' + id] = "0" + window['seconds_HMS' + id]; }
            html($this, window['hours_HMS' + id] + opts.timeSeparator + window['minutes_HMS' + id] + opts.timeSeparator + window['seconds_HMS' + id]);
            window['seconds_HMS' + id] -= opts.tickInterval;
            if (window['minutes_HMS' + id] != 0 && window['seconds_HMS' + id] < 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HMS' + id] == 0 && window['seconds_HMS' + id] < 0 && window['hours_HMS' + id] != 0) {
                window['hours_HMS' + id]--;
                window['minutes_HMS' + id] = 59;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HMS' + id] == 0 && window['seconds_HMS' + id] < 0 && window['hours_HMS' + id] == 0) {
                delete window['hours_HMS' + id];
                delete window['minutes_HMS' + id];
                delete window['seconds_HMS' + id];
                clearInterval(window['timer_HMS' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    function givenDate($this, opts, type) {
        var id = $this.attr('id');
        var endDate = (type == "withnoStart") ? window['dateTime' + id] : window['endDate' + id];
        var startDate = (type == "withnoStart") ? window['startTime' + id] : window['startDate' + id];
        var days = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));
        var hours = Math.floor(((endDate - startDate) % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        var minutes = Math.floor(((endDate - startDate) % (24 * 60 * 60 * 1000)) / (60 * 1000)) % 60;
        var seconds = Math.floor(((endDate - startDate) % (24 * 60 * 60 * 1000)) / 1000) % 60 % 60;
        if ((endDate - startDate) > 0) {
            if (days.toString().length < 2) { days = "0" + days; }
            if (hours.toString().length < 2) { hours = "0" + hours; }
            if (minutes.toString().length < 2) { minutes = "0" + minutes; }
            if (seconds.toString().length < 2) { seconds = "0" + seconds; }
            html($this, days + opts.timeSeparator + hours + opts.timeSeparator + minutes + opts.timeSeparator + seconds);
            (type == "withnoStart") ? (window['startTime' + id].setSeconds(window['startTime' + id].getSeconds() + opts.tickInterval)) : (window['startDate' + id].setSeconds(window['startDate' + id].getSeconds() + opts.tickInterval));
        } else {
            html($this, "00" + opts.timeSeparator + "00" + opts.timeSeparator + "00" + opts.timeSeparator + "00");
            if (type == "withnoStart") {
                delete window['dateTime' + id];
                delete window['startTime' + id];
                clearInterval(window['timer_givenDate' + id]);
            } else if (type == "withStart") {
                delete window['startDate' + id];
                delete window['endDate' + id];
                clearInterval(window['timer_startDate' + id]);
            }
            timeUp($this, opts);
        }
        id = null;
    }

    function currentDate($this, opts) {
        if (window['currentTime' + $this.attr('id')] == true) {
            var today = new Date();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            var seconds = today.getSeconds()
            if (hours.toString().length < 2) { hours = "0" + hours; }
            if (minutes.toString().length < 2) { minutes = "0" + minutes; }
            if (seconds.toString().length < 2) { seconds = "0" + seconds; }
            html($this, hours + opts.timeSeparator + minutes + opts.timeSeparator + seconds);
        } else { alert('Set Current Time option.'); }
    }

    function secondsTimer($this) {
        var id = $this.attr('id');
        if (window['countSeconds' + id].toString().length < 2) { window['countSeconds' + id] = "0" + window['countSeconds' + id]; }
        html($this, window['countSeconds' + id] + " " + "sec");
        window['countSeconds' + id]--;
        if (window['countSeconds' + id] == -1) {
            delete window['countSeconds' + id];
            clearInterval(window['timer_secondsTimer' + id]);
        }
        id = null;
    }

    function timeUp($this, opts) {
        if (opts.timeUp != null) { if ($.isFunction(opts.timeUp) == true) { opts.timeUp.apply($this, []); } }
        if (opts.expiryUrl != null) { window.location = opts.expiryUrl; }
    }

    function html($this, content) {
        var processedContent = content;
        if (typeof window['regexpMatchFormat_' + $this.attr('id')] !== 'undefined' && typeof window['regexpReplaceWith_' + $this.attr('id')] !== 'undefined') {
            var regexp = new RegExp(window['regexpMatchFormat_' + $this.attr('id')]);
            processedContent = content.replace(regexp, window['regexpReplaceWith_' + $this.attr('id')]);
        }
        $this.html(processedContent);
    }

    function pauseTimer($this, timerType, opts, func) {
        $("#" + opts.pauseButton).click(function() {
            if ($(this).val() != "resume") {
                $("#" + opts.pauseButton).val("resume").text("Resume");
                clearInterval(window['timer_' + timerType + $this.attr('id')]);
            } else if ($(this).val() == "resume") {
                $("#" + opts.pauseButton).val("pause").text("Pause");
                window['timer_' + timerType + $this.attr('id')] = setInterval(function() { func($this, opts) }, opts.tickInterval * 1000);
            }
        });
    }

    function stopTimer($this, timerType, opts, func) {
        $("#" + opts.stopButton).click(function() {
            if ($(this).val() != "start") {
                $("#" + opts.stopButton).val("start").text("Start");
                clearInterval(window['timer_' + timerType + $this.attr('id')]);
                window['hours_' + timerType + $this.attr('id')] = opts.hours;
                window['minutes_' + timerType + $this.attr('id')] = opts.minutes;
                window['seconds_' + timerType + $this.attr('id')] = opts.seconds;
                func($this, opts);
            } else if ($(this).val() == "start") {
                $("#" + opts.stopButton).val("stop").text("Stop");
                window['timer_' + timerType + $this.attr('id')] = setInterval(function() { func($this, opts) }, opts.tickInterval * 1000);
            }
        });
    }
    $.fn.countdowntimer.defaults = { hours: 0, minutes: 0, seconds: 60, startDate: new Date(), dateAndTime: new Date("0000/00/00 00:00:00"), currentTime: false, size: "sm", timeSeparator: ":", tickInterval: 1, timeUp: null, expiryUrl: null, regexpMatchFormat: null, regexpReplaceWith: null, pauseButton: null, stopButton: null };
}(jQuery));