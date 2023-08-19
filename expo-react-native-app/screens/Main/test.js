"use strict";
! function() {
    if (window.TradingView && window.TradingView.host && !window.TradingView.reoloadTvjs) return;
    var t = {
        "color-gull-gray": "#9db2bd",
        "color-brand": "#2962FF",
        "color-brand-hover": "#1E53E5",
        "color-brand-active": "#1848CC"
    };
    const e = new RegExp("^http(s)?:(//)?");
    var i, o, n, r, a, s, d, l = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
        h = {
            host: null == window.location.host.match(/tradingview\.com|pyrrosinvestment\.com/i) ? "https://s.tradingview.com" : "https://www.tradingview.com",
            ideasHost: "https://www.tradingview.com",
            chatHost: "https://www.tradingview.com",
            widgetHost: "https://www.tradingview-widget.com",
            getHost: function(t) {
                return t.useWidgetHost ? h.widgetHost : h.host
            },
            embedStylesForCopyright: function() {
                var e = document.createElement("style");
                return e.innerHTML = ".tradingview-widget-copyright {font-size: 13px !important; line-height: 32px !important; text-align: center !important; vertical-align: middle !important; font-family: " + l + " !important; color: " + t["color-gull-gray"] + " !important;} .tradingview-widget-copyright .blue-text {color: " + t["color-brand"] + " !important;} .tradingview-widget-copyright a {text-decoration: none !important; color: " + t["color-gull-gray"] + " !important;} .tradingview-widget-copyright a:visited {color: " + t["color-gull-gray"] + " !important;} .tradingview-widget-copyright a:hover .blue-text {color: " + t["color-brand-hover"] + " !important;} .tradingview-widget-copyright a:active .blue-text {color: " + t["color-brand-active"] + " !important;} .tradingview-widget-copyright a:visited .blue-text {color: " + t["color-brand"] + " !important;}", e
            },
            embedStylesForFullHeight: function(t, e, i) {
                var o = e ? "calc(" + t + " - 32px)" : t,
                    n = document.querySelector("#" + i);
                n.parentElement.style.height = o, n.style.height = "100%"
            },
            gId: function() {
                return "tradingview_" + (1048576 * (1 + Math.random()) | 0).toString(16).substring(1)
            },
            isPersentHeight: function(t) {
                return "%" === t
            },
            getSuffix: function(t) {
                var e = t.toString().match(/(%|px|em|ex)/);
                return e ? e[0] : "px"
            },
            hasCopyright: function(t) {
                var e = document.getElementById(t),
                    i = e && e.parentElement;
                return !!i && !!i.querySelector(".tradingview-widget-copyright")
            },
            calculateWidgetHeight: function(t, e) {
                var i = parseInt(t),
                    o = this.getSuffix(t),
                    n = this.isPersentHeight(o),
                    r = e && this.hasCopyright(e);
                return n && e && (this.embedStylesForFullHeight(i + o, r, e), r) ? 100 + o : r ? "calc(" + i + o + " - 32px)" : i + o
            },
            onready: function(t) {
                window.addEventListener ? window.addEventListener("DOMContentLoaded", t, !1) : window.attachEvent("onload", t)
            },
            css: function(t) {
                var e, i = document.getElementsByTagName("head")[0],
                    o = document.createElement("style");
                o.type = "text/css", o.styleSheet ? o.styleSheet.cssText = t : (e = document.createTextNode(t), o.appendChild(e)), i.appendChild(o)
            },
            bindEvent: function(t, e, i) {
                t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i)
            },
            unbindEvent: function(t, e, i) {
                t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, i)
            },
            cloneSimpleObject: function(t) {
                if (null == t || "object" != typeof t) return t;
                var e = t.constructor();
                for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                return e
            },
            isArray: function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            isMobileDevice: (i = {
                Android: /Android/i.test(navigator.userAgent),
                BlackBerry: /BlackBerry/i.test(navigator.userAgent),
                iOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
                Opera: /Opera Mini/i.test(navigator.userAgent)
            }, i.any = i.Android || i.BlackBerry || i.iOS || i.Opera, i),
            generateUtmForUrlParams: function(t) {
                var e = {
                    utm_source: window.location.hostname,
                    utm_medium: h.hasCopyright(t.container) ? "widget_new" : "widget"
                };
                return t.type && (e.utm_campaign = t.type, "chart" === t.type && (e.utm_term = t.symbol)), e
            },
            getPageUriString: function() {
                const t = location.href,
                    i = this.invalidUrl(t);
                return i || t.replace(e, "")
            },
            invalidUrl: function(t) {
                try {
                    const i = new URL(t);
                    return e.test(i.protocol) ? null : "__NHTTP__"
                } catch (t) {
                    return "__FAIL__"
                }
            },
            getWidgetTitleAttribute: function(t, e) {
                return t || e.replace("-", " ") + " TradingView widget"
            },
            WidgetAbstract: function() {},
            MediumWidget: function(t) {
                this.id = h.gId();
                const e = h.calculateWidgetHeight(t.height || 400, t.container_id);
                let i;
                switch (t.chartType) {
                    case "candlesticks": {
                        const {
                            chartType: e,
                            upColor: o,
                            downColor: n,
                            borderUpColor: r,
                            borderDownColor: a,
                            wickUpColor: s,
                            wickDownColor: d
                        } = t;
                        i = {
                            chartType: e,
                            upColor: o,
                            downColor: n,
                            borderUpColor: r,
                            borderDownColor: a,
                            wickUpColor: s,
                            wickDownColor: d
                        };
                        break
                    }
                    case "bars": {
                        const {
                            chartType: e,
                            upColor: o,
                            downColor: n
                        } = t;
                        i = {
                            chartType: e,
                            upColor: o,
                            downColor: n
                        };
                        break
                    }
                    case "line": {
                        const {
                            chartType: e,
                            color: o,
                            colorGrowing: n,
                            colorFalling: r,
                            lineWidth: a
                        } = t;
                        i = {
                            chartType: e,
                            color: o,
                            colorGrowing: n,
                            colorFalling: r,
                            lineWidth: a
                        };
                        break
                    }
                    case "area":
                    default: {
                        const {
                            chartType: e = "area",
                            lineColor: o = t.trendLineColor || "",
                            lineColorGrowing: n,
                            lineColorFalling: r,
                            topColor: a = t.underLineColor || "",
                            bottomColor: s = t.underLineBottomColor || "",
                            lineWidth: d
                        } = t;
                        i = {
                            chartType: e,
                            lineColor: o,
                            lineColorGrowing: n,
                            lineColorFalling: r,
                            topColor: a,
                            bottomColor: s,
                            lineWidth: d
                        };
                        break
                    }
                }
                this.options = {
                    container: t.container_id || "",
                    width: h.WidgetAbstract.prototype.fixSize(t.width) || "",
                    height: h.WidgetAbstract.prototype.fixSize(e) || "",
                    symbols: t.symbols,
                    greyText: t.greyText || "",
                    symbols_description: t.symbols_description || "",
                    large_chart_url: t.large_chart_url || "",
                    customer: t.customer || "",
                    backgroundColor: t.backgroundColor || "",
                    gridLineColor: t.gridLineColor || "",
                    fontColor: t.fontColor || "",
                    fontSize: t.fontSize || "",
                    widgetFontColor: t.widgetFontColor || "",
                    timeAxisBackgroundColor: t.timeAxisBackgroundColor || "",
                    chartOnly: !!t.chartOnly,
                    locale: t.locale,
                    whitelabel: !!t.whitelabel || "",
                    colorTheme: t.colorTheme,
                    isTransparent: t.isTransparent,
                    useWidgetHost: Boolean(t.useWidgetHost),
                    showFloatingTooltip: t.showFloatingTooltip,
                    valuesTracking: t.valuesTracking,
                    changeMode: t.changeMode,
                    dateFormat: t.dateFormat,
                    timeHoursFormat: t.timeHoursFormat,
                    showVolume: t.showVolume,
                    showMA: t.showMA,
                    volumeUpColor: t.volumeUpColor,
                    volumeDownColor: t.volumeDownColor,
                    maLineColor: t.maLineColor,
                    maLineWidth: t.maLineWidth,
                    maLength: t.maLength,
                    hideDateRanges: t.hideDateRanges,
                    hideMarketStatus: t.hideMarketStatus,
                    hideSymbolLogo: t.hideSymbolLogo,
                    scalePosition: t.scalePosition,
                    scaleMode: t.scaleMode,
                    fontFamily: t.fontFamily,
                    noTimeScale: t.noTimeScale,
                    ...i
                }, this.createWidget()
            },
            widget: function(t) {
                this.id = t.id || h.gId();
                var e = h.getUrlParams(),
                    i = t.tvwidgetsymbol || e.tvwidgetsymbol || e.symbol || t.symbol || "NASDAQ:AAPL",
                    o = t.logo || "";
                o.src && (o = o.src), o && o.replace(".png", "");
                var n = h.calculateWidgetHeight(t.height || 500, t.container_id);
                this.options = {
                    whitelabel: t.whitelabel || "",
                    width: t.width || 800,
                    height: n,
                    symbol: i,
                    interval: t.interval || "1",
                    range: t.range || "",
                    timezone: t.timezone || "",
                    autosize: t.autosize,
                    hide_top_toolbar: t.hide_top_toolbar,
                    hide_side_toolbar: t.hide_side_toolbar,
                    hide_legend: t.hide_legend,
                    allow_symbol_change: t.allow_symbol_change,
                    save_image: void 0 === t.save_image || t.save_image,
                    container: t.container_id || "",
                    watchlist: t.watchlist || [],
                    editablewatchlist: !!t.editablewatchlist,
                    studies: t.studies || [],
                    theme: t.theme || "",
                    style: t.style || "",
                    extended_hours: void 0 === t.extended_hours ? void 0 : +t.extended_hours,
                    details: !!t.details,
                    calendar: !!t.calendar,
                    hotlist: !!t.hotlist,
                    hideideas: !!t.hideideas,
                    hideideasbutton: !!t.hideideasbutton,
                    widgetbar_width: +t.widgetbar_width || void 0,
                    withdateranges: t.withdateranges || "",
                    customer: t.customer || o || "",
                    venue: t.venue,
                    symbology: t.symbology,
                    logo: o,
                    show_popup_button: !!t.show_popup_button,
                    popup_height: t.popup_height || "",
                    popup_width: t.popup_width || "",
                    studies_overrides: t.studies_overrides,
                    overrides: t.overrides,
                    enabled_features: t.enabled_features,
                    disabled_features: t.disabled_features,
                    publish_source: t.publish_source || "",
                    enable_publishing: t.enable_publishing,
                    whotrades: t.whotrades || void 0,
                    locale: t.locale,
                    referral_id: t.referral_id,
                    no_referral_id: t.no_referral_id,
                    fundamental: t.fundamental,
                    percentage: t.percentage,
                    hidevolume: t.hidevolume,
                    padding: t.padding,
                    greyText: t.greyText || "",
                    horztouchdrag: t.horztouchdrag,
                    verttouchdrag: t.verttouchdrag,
                    useWidgetHost: Boolean(t.useWidgetHost),
                    backgroundColor: t.backgroundColor,
                    gridColor: t.gridColor
                }, t.cme && (this.options.customer = "cme"), isFinite(t.widgetbar_width) && t.widgetbar_width > 0 && (this.options.widgetbar_width = t.widgetbar_width), this._ready_handlers = [], this.create()
            },
            chart: function(t) {
                this.id = h.gId(), this.options = {
                    width: t.width || 640,
                    height: t.height || 500,
                    container: t.container_id || "",
                    realtime: t.realtime,
                    chart: t.chart,
                    locale: t.locale,
                    type: "chart",
                    autosize: t.autosize,
                    mobileStatic: t.mobileStatic
                }, this._ready_handlers = [], this.create()
            },
            stream: function(t) {
                this.id = h.gId(), this.options = {
                    width: t.width || 640,
                    height: t.height || 500,
                    container: t.container_id || "",
                    stream: t.stream,
                    locale: t.locale,
                    autosize: t.autosize
                }, this.create()
            },
            EventsWidget: function(t) {
                this.id = h.gId(), this.options = {
                    container: t.container_id || "",
                    width: t.width || 486,
                    height: t.height || 670,
                    currency: t.currencyFilter || "",
                    importance: t.importanceFilter || "",
                    type: "economic-calendar"
                }, this.createWidget(t)
            },
            IdeasStreamWidget: function(t) {
                this.id = h.gId(), this.options = {
                    container: t.container_id || "",
                    width: t.width || 486,
                    height: t.height || 670,
                    symbol: t.symbol || "",
                    username: t.username || "",
                    mode: t.mode || "",
                    publishSource: t.publishSource || "",
                    sort: t.sort || "trending",
                    stream: t.stream,
                    waitSymbol: t.waitSymbol,
                    hideDescription: t.hideDescription,
                    startingCount: t.startingCount,
                    bgColor: t.bgColor || "",
                    headerColor: t.headerColor || "",
                    borderColor: t.borderColor || "",
                    locale: t.locale,
                    type: "ideas-stream",
                    useWidgetHost: Boolean(t.useWidgetHost)
                }, this._ready_handlers = [], this.createWidget()
            },
            IdeaWidget: function(t) {
                this.id = h.gId(), this.options = {
                    container: t.container_id || "",
                    width: t.width || 486,
                    height: t.height || 670,
                    idea: t.idea || "",
                    chartUrl: t.chartUrl || "",
                    whotrades: t.whotrades || void 0,
                    locale: t.locale,
                    type: "idea"
                }, this.createWidget(t)
            },
            ChatWidgetEmbed: function(t) {
                this.id = h.gId(), this.options = {
                    container: t.container_id || "",
                    width: t.width || 400,
                    height: t.height || 500,
                    room: t.room || "",
                    whotrades: t.whotrades || void 0,
                    locale: t.locale,
                    type: "chat-embed"
                }, this.createWidget(t)
            }
        };
    h.WidgetAbstract.prototype = {
        widgetId: "unknown",
        fixSize: function(t) {
            return /^[0-9]+(\.|,[0-9])*$/.test(t) ? t + "px" : t
        },
        width: function() {
            return this.options.autosize ? "100%" : h.WidgetAbstract.prototype.fixSize(this.options.width)
        },
        height: function() {
            return this.options.autosize ? "100%" : h.WidgetAbstract.prototype.fixSize(this.options.height)
        },
        addWrapperFrame: function(t, e, i) {
            var o = h.WidgetAbstract.prototype.height.call(this),
                n = h.WidgetAbstract.prototype.width.call(this);
            i = i || "transparent";
            return '<div id="' + this.id + '-wrapper" style="position: relative;box-sizing: content-box;width: ' + n + ";height: " + o + ";margin: 0 auto !important;padding: 0 !important;font-family: " + l + ';"><div style="width: ' + n + ";height: " + o + ";background: " + i + ';padding: 0 !important;">' + t + "</div>" + (e || "") + "</div>"
        },
        addFooterLogo: function(t, e) {
            e = e || {};
            var i = new URL("https://www.tradingview.com/");
            return '';
        }
    }, h.ChatWidgetEmbed.prototype = {
        widgetId: "chat",
        createWidget: function() {
            var t = this.widgetCode();
           // t = h.WidgetAbstract.prototype.addFooterLogo.call(this, t), c(t, this.options)
        },
        widgetCode: function() {
            var t = new URL(h.chatHost);
            return t.pathname = "/chatwidgetembed/", h.addUrlParams(t, {
                whotrades: this.options.whotrades,
                locale: this.options.locale
            }), h.addUrlParams(t, h.generateUtmForUrlParams(this.options)), this.options.room && (t.hash = this.options.room), `\n\t\t\t\t<iframe\n\t\t\t\t\ttitle="${h.getWidgetTitleAttribute(this.options.iframeTitle,this.widgetId)}"\n\t\t\t\t\tlang="${!this.options.iframeLang&&"en"}"\n\t\t\t\t\tsrc="${t.toString()}"\n\t\t\t\t\t${this.options.width?`width="${this.options.width}"`:""}\n\t\t\t\t\t${this.options.height?`height="${this.options.height}"`:""}\n\t\t\t\t\tframeborder="0" allowTransparency="true" scrolling="no"\n\t\t\t\t>\n\t\t\t\t</iframe>\n\t\t\t`
        }
    }, h.IdeaWidget.prototype = {
        widgetId: "idea-popup",
        createWidget: function() {
            var t = this.widgetCode();
            c(t, this.options);
            var e = this,
                i = document.getElementById(this.id);
            this.postMessage = h.postMessageWrapper(i.contentWindow, this.id), this.postMessage.on("resize", (function(t) {
                t.id === e.id && (i.style.height = t.height + "px")
            }), !0)
        },
        widgetCode: function() {
            var t = new URL(h.ideasHost);
            return t.pathname = "/idea-popup/", h.addUrlParams(t, {
                id: this.id,
                width: this.options.width,
                height: this.options.height,
                idea: this.options.idea,
                chart_url: this.options.chartUrl,
                whotrades: this.options.whotrades,
                locale: this.options.locale
            }), this.options.type = "idea", h.addUrlParams(t, h.generateUtmForUrlParams(this.options)), `\n\t\t\t\t<iframe\n\t\t\t\t\ttitle="${h.getWidgetTitleAttribute(this.options.iframeTitle,this.widgetId)}"\n\t\t\t\t\tlang="${!this.options.iframeLang&&"en"}"\n\t\t\t\t\tid="${this.id}"\n\t\t\t\t\tsrc="${t.toString()}"\n\t\t\t\t\twidth="${this.options.width}"\n\t\t\t\t\t${this.options.height?`height="${this.options.height}"`:""}\n\t\t\t\t\tframeborder="0" allowTransparency="true" scrolling="no"\n\t\t\t\t>\n\t\t\t\t</iframe>\n\t\t\t`
        },
        getSymbol: function(t) {
            this.postMessage.on("symbolInfo", t)
        }
    }, h.EventsWidget.prototype = {
        widgetId: "events",
        createWidget: function() {
            var t = this.widgetCode();
            c(t, this.options)
        },
        widgetCode: function() {
            var t = new URL(h.getHost(this.options));
            return t.pathname = "/eventswidgetembed/", h.addUrlParams(t, {
                currency: this.options.currency,
                importance: this.options.importance
            }), this.options.type = "events", h.addUrlParams(t, h.generateUtmForUrlParams(this.options)), `\n\t\t\t\t<iframe\n\t\t\t\t\ttitle="${h.getWidgetTitleAttribute(this.options.iframeTitle,this.widgetId)}"\n\t\t\t\t\tlang="${!this.options.iframeLang&&"en"}"\n\t\t\t\t\tsrc="${t.toString()}"\n\t\t\t\t\twidth="${this.options.width}"\n\t\t\t\t\t${this.options.height?`height="${this.options.height}"`:""}\n\t\t\t\t\tframeborder="0" scrolling="no">\n\t\t\t\t</iframe>\n\t\t\t`
        }
    }, h.IdeasStreamWidget.prototype = {
        widgetId: "ideas-widget",
        createWidget: function() {
            var t = this.widgetCode();
            c(t, this.options);
            var e = this,
                i = document.getElementById(this.id);
            this.postMessage = h.postMessageWrapper(i.contentWindow, this.id), h.bindEvent(i, "load", (function() {
                e._ready = !0;
                for (var t = e._ready_handlers.length; t--;) e._ready_handlers[t].call(e)
            })), e.postMessage.on("resize", (function(t) {
                if (t.id === e.id) {
                    var o = Math.max(t.height, 450);
                    i.style.height = o + "px"
                }
            }), !0)
        },
        widgetCode: function() {
            var t = this.options,
                e = new URL(h.getHost(t));
            return e.pathname = "/ideaswidgetembed/", h.addUrlParams(e, {
                id: this.id,
                width: t.width,
                height: t.height,
                symbol: t.symbol,
                username: t.username,
                mode: t.mode,
                publish_source: t.publishSource,
                sort: t.sort,
                stream: t.stream,
                wait_symbol: t.waitSymbol,
                hide_desc: t.hideDescription,
                s_count: t.startingCount,
                bg_color: t.bgColor,
                h_color: t.headerColor,
                borderColor: t.borderColor,
                locale: t.locale,
                useWidgetHost: Boolean(t.useWidgetHost)
            }), h.addUrlParams(e, h.generateUtmForUrlParams(this.options)), `\n\t\t\t\t<iframe\n\t\t\t\t\ttitle="${h.getWidgetTitleAttribute(this.options.iframeTitle,this.widgetId)}"\n\t\t\t\t\tlang="${!this.options.iframeLang&&"en"}"\n\t\t\t\t\tid="${this.id}"\n\t\t\t\t\tsrc="${e.toString()}"\n\t\t\t\t\twidth="${t.width}"\n\t\t\t\t\t${this.options.height?`height="${this.options.height}"`:""}\n\t\t\t\t\tframeborder="0" allowTransparency="true" scrolling="no">\n\t\t\t\t</iframe>\n\t\t\t`
        },
        setSymbol: function(t) {
            var e = document.getElementById(this.id);
            this.postMessage.post(e.contentWindow, "setSymbol", t)
        },
        ready: function(t) {
            this._ready ? t.call(this) : this._ready_handlers.push(t)
        }
    }, h.MediumWidget.prototype = {
        widgetId: "symbol-overview",
        createWidget: function() {
            var t = this.widgetCode();
            c(t, this.options)
        },
        widgetCode: function() {
            const t = Object.create(null);
            for (const e of ["symbols", "width", "height", "colorTheme", "backgroundColor", "gridLineColor", "fontColor", "widgetFontColor", "underLineColor", "underLineBottomColor", "trendLineColor", "activeTickerBackgroundColor", "timeAxisBackgroundColor", "scalePosition", "scaleMode", "chartType", "color", "colorGrowing", "colorFalling", "lineColor", "lineColorGrowing", "lineColorFalling", "topColor", "bottomColor", "upColor", "downColor", "borderUpColor", "borderDownColor", "wickUpColor", "wickDownColor", "fontFamily", "fontSize", "noTimeScale", "valuesTracking", "changeMode", "dateFormat", "timeHoursFormat", "lineWidth", "volumeUpColor", "volumeDownColor", "chartOnly", "whitelabel", "isTransparent", "showFloatingTooltip", "showVolume", "showMA", "maLineColor", "maLineWidth", "maLength", "hideDateRanges", "hideMarketStatus", "hideSymbolLogo"]) this.options[e] && (t[e] = this.options[e]);
            t["page-uri"] = h.getPageUriString(), this.options.type = "symbol-overview";
            const e = h.generateUtmForUrlParams(this.options);
            for (var i of Object.keys(e)) t[i] = e[i];
            const o = new URL("/embed-widget/symbol-overview/", h.getHost(this.options));
            return this.options.customer && (o.pathname += this.options.customer + "/"), this.options.locale && o.searchParams.append("locale", this.options.locale), o.hash = encodeURIComponent(JSON.stringify(t)), `\n\t\t\t\t<iframe\n\t\t\t\t\ttitle="${h.getWidgetTitleAttribute(this.options.iframeTitle,this.widgetId)}"\n\t\t\t\t\tlang="${!this.options.iframeLang&&"en"}"\n\t\t\t\t\tid="${this.id}"\n\t\t\t\t\tsrc="${o.toString()}"\n\t\t\t\t\tstyle="\n\t\t\t\t\t\tmargin: 0 !important;\n\t\t\t\t\t\tpadding: 0 !important;\n\t\t\t\t\t\t${this.options.width?`width: ${this.options.width};`:""}\n\t\t\t\t\t\t${this.options.height?`height: ${this.options.height};`:""}\n\t\t\t\t\t"\n\t\t\t\t\tframeborder="0" allowTransparency="true" scrolling="no"\n\t\t\t\t>\n\t\t\t\t</iframe>\n\t\t\t`
        },
        remove: function() {
            var t = document.getElementById("tradingview_widget");
            t.parentNode.removeChild(t)
        }
    }, h.widget.prototype = {
        widgetId: "advanced-chart",
        create: function() {
            this.options.type = this.options.fundamental ? "fundamental" : "chart";
            var t = this.render(),
                e = this;
            this.options.noLogoOverlay || (t = h.WidgetAbstract.prototype.addWrapperFrame.call(this, t)), c(t, this.options);
            var i = document.getElementById("tradingview-copyright");
            i && i.parentElement && i.parentElement.removeChild(i), this.iframe = document.getElementById(this.id), this.postMessage = h.postMessageWrapper(this.iframe.contentWindow, this.id), h.bindEvent(this.iframe, "load", (function() {
                e.postMessage.get("widgetReady", {}, (function() {
                    var t;
                    for (e._ready = !0, t = e._ready_handlers.length; t--;) e._ready_handlers[t].call(e)
                }))
            })), e.postMessage.on("logoCreated", (function(t) {
                if (t.left && t.bottom && t.width && t.height && t.href) {
                    e._logoOverlay && (e._logoOverlay.parentNode.removeChild(e._logoOverlay), delete e._logoOverlay);
                    var i = document.createElement("a");
                    t.text && (i.textContent = t.text, i.style.color = "transparent"), i.style.position = "absolute", i.style.display = "inline-block", i.style.left = t.left, i.style.bottom = t.bottom, i.style.width = t.width, i.style.height = t.height, i.style.backgroundColor = "transparent", i.style.pointerEvents = "none", i.href = t.href, i.setAttribute("target", "_blank"), e._logoOverlay = i, document.getElementById(e.id + "-wrapper").appendChild(i)
                }
            })), e.postMessage.on("setLogoOverlayVisibility", (function(t) {
                e._logoOverlay && t && "boolean" == typeof t.visible && (e._logoOverlay.style.display = t.visible ? "inline-block" : "none")
            })), e.postMessage.on("openChartInPopup", (function(t) {
                for (var i = h.cloneSimpleObject(e.options), o = ["symbol", "interval"], n = o.length - 1; n >= 0; n--) {
                    var r = o[n],
                        a = t[r];
                    a && (i[r] = a)
                }
                i.show_popup_button = !1;
                var s = e.options.popup_width || 900,
                    d = e.options.popup_height || 600,
                    l = (screen.width - s) / 2,
                    c = (screen.height - d) / 2,
                    g = window.open(e.generateUrl(i), "_blank", "resizable=yes, top=" + c + ", left=" + l + ", width=" + s + ", height=" + d);
                g && (g.opener = null)
            }))
        },
        ready: function(t) {
            this._ready ? t.call(this) : this._ready_handlers.push(t)
        },
        render: function() {
            var t = this.generateUrl();
            return `\n\t\t\t\t<iframe\n\t\t\t\t\ttitle="${h.getWidgetTitleAttribute(this.options.iframeTitle,this.widgetId)}"\n\t\t\t\t\tlang="${!this.options.iframeLang&&"en"}"\n\t\t\t\t\tid="${this.id}"\n\t\t\t\t\tsrc="${t}"\n\t\t\t\t\tstyle="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"\n\t\t\t\t\tframeborder="0" allowTransparency="true" scrolling="no" allowfullscreen\n\t\t\t\t>\n\t\t\t\t</iframe>\n\t\t\t`
        },
        generateUrl: function(t) {
            var e;

            function i(e, i) {
                return i = i || e, void 0 === t[e] ? "" : "&" + encodeURIComponent(i) + "=" + (t[e] ? "1" : "0")
            }

            function o(e, i, o) {
                return o = o || e, t[e] ? "&" + o + "=" + i : ""
            }

            function n(e, i, o) {
                return o = o || {}, "&" + e + "=" + (t[e] ? encodeURIComponent(JSON.stringify(i)) : encodeURIComponent(JSON.stringify(o)))
            }
            e = "cme" === (t = t || this.options).customer ? "/cmewidgetembed/" : t.customer ? "/" + t.customer + "/widgetembed/" : "/widgetembed/";
            const r = Object.create(null);
            var a = (t.enable_publishing ? h.ideasHost : h.getHost(t)) + e + "?frameElementId=" + this.id + "&symbol=" + encodeURIComponent(t.symbol) + "&interval=" + encodeURIComponent(t.interval) + (t.range ? "&range=" + encodeURIComponent(t.range) : "") + (t.whitelabel ? "&whitelabel=1" : "") + (t.hide_top_toolbar ? "&hidetoptoolbar=1" : "") + (t.hide_legend ? "&hidelegend=1" : "") + i("hide_side_toolbar", "hidesidetoolbar") + i("allow_symbol_change", "symboledit") + i("save_image", "saveimage") + (void 0 !== t.backgroundColor ? "&backgroundColor=" + encodeURIComponent(t.backgroundColor) : "") + (void 0 !== t.gridColor ? "&gridColor=" + encodeURIComponent(t.gridColor) : "") + (t.watchlist && t.watchlist.length && t.watchlist.join ? "&watchlist=" + encodeURIComponent(t.watchlist.join("")) : "") + o("editablewatchlist", "1") + o("details", "1") + o("calendar", "1") + o("hotlist", "1") + (t.studies && h.isArray(t.studies) ? "string" == typeof t.studies[0] ? o("studies", encodeURIComponent(t.studies.join(""))) : n("studies", t.studies) : "") + i("horztouchdrag") + i("verttouchdrag") + o("widgetbar_width", t.widgetbar_width, "widgetbarwidth") + o("hideideas", "1") + o("theme", encodeURIComponent(t.theme)) + o("style", encodeURIComponent(t.style)) + (void 0 === t.extended_hours ? "" : "&extended_hours=" + t.extended_hours) + o("timezone", encodeURIComponent(t.timezone)) + o("hideideasbutton", "1") + o("withdateranges", "1") + o("hidevolume", "1") + (void 0 === t.padding ? "" : "&padding=" + t.padding) + o("show_popup_button", "1", "showpopupbutton") + n("studies_overrides", t.studies_overrides, {}) + n("overrides", t.overrides, {}) + n("enabled_features", t.enabled_features, []) + n("disabled_features", t.disabled_features, []) + (t.show_popup_button ? "&showpopupbutton=1" : "") + (t.publish_source ? "&publishsource=" + encodeURIComponent(t.publish_source) : "") + (t.enable_publishing ? "&enablepublishing=" + encodeURIComponent(t.enable_publishing) : "") + (t.venue ? "&venue=" + encodeURIComponent(t.venue) : "") + (t.symbology ? "&symbology=" + encodeURIComponent(t.symbology) : "") + (t.whotrades ? "&whotrades=" + encodeURIComponent(t.whotrades) : "") + (t.locale ? "&locale=" + t.locale : "") + (t.referral_id ? "&referral_id=" + t.referral_id : "") + (t.no_referral_id ? "&no_referral_id=1" : "") + (t.fundamental ? "&fundamental=" + encodeURIComponent(t.fundamental) : "") + (t.percentage ? "&percentage=" + encodeURIComponent(t.percentage) : "") + "&utm_source=" + encodeURI(window.location.hostname) + "&utm_medium=" + (h.hasCopyright(t.container) ? "widget_new" : "widget") + (t.type ? "&utm_campaign=" + t.type : "") + (t.type && "chart" === t.type ? "&utm_term=" + encodeURIComponent(t.symbol) : "");
            return r["page-uri"] = h.getPageUriString(), a = a + "#" + encodeURIComponent(JSON.stringify(r))
        },
        image: function(t) {
            this.postMessage.get("imageURL", {}, (function(e) {
                var i = h.host + "/x/" + e + "/";
                t(i)
            }))
        },
        subscribeToQuote: function(t) {
            var e = document.getElementById(this.id);
            this.postMessage.post(e.contentWindow, "quoteSubscribe"), this.postMessage.on("quoteUpdate", t)
        },
        getSymbolInfo: function(t) {
            this.postMessage.get("symbolInfo", {}, t)
        },
        remove: function() {
            var t = document.getElementById(this.id);
            t.parentNode.removeChild(t)
        },
        reload: function() {
            var t = document.getElementById(this.id),
                e = t.parentNode;
            e.removeChild(t), e.innerHTML = this.render()
        }
    }, h.chart.prototype = {
        widgetId: "published-chart",
        create: function() {
            this.isMobile = h.isMobileDevice.any;
            var t, e = this.render(),
                i = this;
            h.chartCssAttached || (h.css(this.renderCss()), h.chartCssAttached = !0), c(e, this.options), t = document.getElementById(this.id), h.bindEvent(t, "load", (function() {
                var t;
                for (i._ready = !0, t = i._ready_handlers.length; t--;) i._ready_handlers[t].call(i)
            })), h.onready((function() {
                var e = !1;
                if (document.querySelector && document.querySelector('a[href$="/v/' + i.options.chart + '/"]') && (e = !0), !e)
                    for (var o = document.getElementsByTagName("a"), n = new RegExp("/v/" + i.options.chart + "/$"), r = new RegExp("/chart/([0-9a-zA-Z:+*-/()]+)/" + i.options.chart), a = 0; a < o.length; a++)
                        if (n.test(o[a].href) || r.test(o[a].href)) {
                            e = !0;
                            break
                        } e && (t.src += "#nolinks", t.name = "nolinks")
            })), this.postMessage = h.postMessageWrapper(t.contentWindow, this.id), this.postMessage.on("toggleFullscreen", (function(e) {
                t.contentWindow === this.source && i.toggleFullscreen(e.value)
            }), !0)
        },
        ready: h.widget.prototype.ready,
        renderCss: function() {
            return ".tradingview-widget {position: relative;}"
        },
        render: function() {
            var t = this.options.mobileStatic && this.isMobile ? new URL(`${h.host}/embed-static/${this.options.chart}`) : new URL(`${h.host}/embed/${this.options.chart}`);
            h.addUrlParams(t, {
                method: "script",
                locale: this.options.locale
            }, !0), this.options.type = "chart", h.addUrlParams(t, h.generateUtmForUrlParams(this.options));
            var e = this.options.autosize ? 'style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' : `style="width: ${this.options.width}px; height: ${this.options.height}px;"`;
            const i = this.options.autosize ? 'style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' : `width="${this.options.width}" height="${this.options.height}"`;
            return `\n\t\t\t\t<div class="tradingview-widget" ${e}>\n\t\t\t\t\t<iframe\n\t\t\t\t\t\ttitle="${h.getWidgetTitleAttribute(this.options.iframeTitle,this.widgetId)}"\n\t\t\t\t\t\tlang="${!this.options.iframeLang&&"en"}"\n\t\t\t\t\t\tid="${this.id}"\n\t\t\t\t\t\tsrc="${t.toString()}"\n\t\t\t\t\t\t${i}\n\t\t\t\t\t\tframeborder="0" allowTransparency="true" scrolling="no"\n\t\t\t\t\t>\n\t\t\t\t\t</iframe>\n\t\t\t\t</div>\n\t\t\t`
        },
        toggleFullscreen: function(t) {
            var e = document.getElementById(this.id);
            t ? (e.style.position = "fixed", e.style.width = "100vw", e.style.maxWidth = "100%", e.style.height = "100vh", e.style.maxHeight = "100%", e.style.left = "0px", e.style.top = "0px", e.style.zIndex = "1000000", e.style.backgroundColor = "#fff") : (e.style.position = "static", this.options.autosize ? (e.style.width = "100%", e.style.height = "100%") : (e.style.width = this.options.width + "px", e.style.height = this.options.height + "px"), e.style.maxWidth = "none", e.style.maxHeight = "none", e.style.zIndex = "auto", e.style.backgroundColor = "transparent")
        },
        getSymbolInfo: function(t) {
            this.postMessage.get("symbolInfo", {}, t)
        }
    }, h.stream.prototype = {
        widgetId: "stream",
        create: function() {
            this.isMobile = h.isMobileDevice.any;
            var t = this.render();
            c(t, this.options)
        },
        render: function() {
            var t = new URL(h.host + this.options.stream + "/embed/");
            h.addUrlParams(t, {
                locale: this.options.locale
            }, !0), this.options.type = "chart", h.addUrlParams(t, h.generateUtmForUrlParams(this.options));
            var e = this.options.autosize ? 'style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' : `style="width: ${this.options.width}px; height: ${this.options.height}px;"`,
                i = this.options.autosize ? 'style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' : `width="${this.options.width}" height="${this.options.height}"`;
            return `\n\t\t\t\t<div class="tradingview-widget"\t${e}>\n\t\t\t\t\t<iframe\n\t\t\t\t\t\ttitle="${h.getWidgetTitleAttribute(this.options.iframeTitle,this.widgetId)}"\n\t\t\t\t\t\tlang="${!this.options.iframeLang&&"en"}"\n\t\t\t\t\t\tid="${this.id}"\n\t\t\t\t\t\tsrc="${t.toString()}"\n\t\t\t\t\t\t${i}\n\t\t\t\t\t\tframeborder="0" allowTransparency="true" scrolling="no"\n\t\t\t\t\t>\n\t\t\t\t\t</iframe>\n\t\t\t\t</div>\n\t\t\t`
        }
    }, h.postMessageWrapper = (n = {}, r = {}, a = {}, s = 0, d = 0, window.addEventListener && window.addEventListener("message", (function(t) {
        var e;
        try {
            e = JSON.parse(t.data)
        } catch (t) {
            return
        }
        if (e && e.provider && "TradingView" === e.provider)
            if (e.source = t.source, "get" === e.type) {
                if (!r[e.name]) return;
                r[e.name].forEach((function(t) {
                    "function" == typeof t && t.call(e, e.data, (function(t) {
                        var i = {
                            id: e.id,
                            type: "on",
                            name: e.name,
                            client_id: e.client_id,
                            data: t,
                            provider: "TradingView"
                        };
                        o.postMessage(JSON.stringify(i), "*")
                    }))
                }))
            } else if ("on" === e.type) n[e.client_id] && n[e.client_id][e.id] && (n[e.client_id][e.id].call(e, e.data), delete n[e.client_id][e.id]);
        else if ("post" === e.type) {
            if (!r[e.name]) return;
            r[e.name].forEach((function(t) {
                "function" == typeof t && t.call(e, e.data, (function() {}))
            }))
        }
    })), function(t, e) {
        return n[e] = {}, a[e] = t, o = t, {
            on: function(t, e, i) {
                r[t] && i || (r[t] = []), r[t].push(e)
            },
            off: function(t, e) {
                if (!r[t]) return !1;
                var i = r[t].indexOf(e);
                i > -1 && r[t].splice(i, 1)
            },
            get: function(t, i, o) {
                var r = {
                    id: s++,
                    type: "get",
                    name: t,
                    client_id: e,
                    data: i,
                    provider: "TradingView"
                };
                n[e][r.id] = o, a[e].postMessage(JSON.stringify(r), "*")
            },
            post: function(t, e, i) {
                var o = {
                    id: d++,
                    type: "post",
                    name: e,
                    data: i,
                    provider: "TradingView"
                };
                t && "function" == typeof t.postMessage && t.postMessage(JSON.stringify(o), "*")
            }
        }
    }), h.getUrlParams = function() {
        for (var t = /\+/g, e = /([^&=]+)=?([^&]*)/g, i = window.location.search.substring(1), o = e.exec(i), n = function(e) {
                return decodeURIComponent(e.replace(t, " "))
            }, r = {}; o;) r[n(o[1])] = n(o[2]), o = e.exec(i);
        return r
    }, h.createUrlParams = function(t) {
        var e = [];
        for (var i in t) t.hasOwnProperty(i) && null != t[i] && e.push(encodeURIComponent(i) + "=" + encodeURIComponent(t[i]));
        return e.join("&")
    }, h.addUrlParams = function(t, e, i) {
        for (var o in e) e.hasOwnProperty(o) && (i ? e[o] : null != e[o]) && t.searchParams.set(o, e[o]);
        return t
    };
    var c = function(t, e) {
            var i = document.getElementById(e.container);
            if (i) {
                i.innerHTML = t;
                var o = i.parentElement && i.parentElement.querySelector(".tradingview-widget-copyright");
                if (o) {
                    o.style.width = i.querySelector("iframe").style.width;
                    var n = o.querySelector("a");
                    if (n) {
                        var r = n.getAttribute("href");
                        if (r) try {
                            const t = new URL(r);
                            h.addUrlParams(t, h.generateUtmForUrlParams(e)), n.setAttribute("href", t.toString())
                        } catch (t) {
                            console.log(`Cannot update link UTM params, href="${r}"`)
                        }
                    }
                }
            } else document.write(t);
            document.body.appendChild(h.embedStylesForCopyright())
        },
        g = function(t, e) {
            for (var i in e) "object" == typeof e[i] && t.hasOwnProperty(i) ? g(t[i], e[i]) : t[i] = e[i];
            return t
        };
    window.TradingView ? g(window.TradingView, h) : window.TradingView = h
}();