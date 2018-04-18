/*!
 * Bootstrap v4.0.0 (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
!(function (t, e) {
  typeof exports === 'object' && typeof module !== 'undefined' ? e(exports, require('jquery'), require('popper.js')) : typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], e) : e(t.bootstrap = {}, t.jQuery, t.Popper);
}(this, (t, e, n) => {
  'use strict';

  function i(t, e) {
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, 'value' in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function s(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }

  function r() {
    return (r = Object.assign || function (t) {
      for (let e = 1; e < arguments.length; e++) {
        const n = arguments[e];
        for (const i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
      }
      return t;
    }).apply(this, arguments);
  }
  e = e && e.hasOwnProperty('default') ? e.default : e, n = n && n.hasOwnProperty('default') ? n.default : n;
  let o, 
    a, 
    l, 
    h, 
    c, 
    u, 
    f, 
    d, 
    _, 
    g, 
    p, 
    m, 
    v, 
    E, 
    T, 
    y, 
    C, 
    I, 
    A, 
    b, 
    D, 
    S, 
    w, 
    N, 
    O, 
    k, 
    P = (function (t) {
      let e = !1;

      function n(e) {
        let n = this,
          s = !1;
        return t(this).one(i.TRANSITION_END, () => {
          s = !0;
        }), setTimeout(() => {
          s || i.triggerTransitionEnd(n);
        }, e), this;
      }
      var i = {
        TRANSITION_END: 'bsTransitionEnd',
        getUID(t) {
          do {
            t += ~~(1e6 * Math.random());
          } while (document.getElementById(t));
          return t;
        },
        getSelectorFromElement(e) {
          let n, 
            i = e.getAttribute('data-target');
          i && i !== '#' || (i = e.getAttribute('href') || ''), i.charAt(0) === '#' && (n = i, i = n = typeof t.escapeSelector === 'function' ? t.escapeSelector(n).substr(1) : n.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1'));
          try {
            return t(document).find(i).length > 0 ? i : null;
          } catch (t) {
            return null;
          }
        },
        reflow(t) {
          return t.offsetHeight;
        },
        triggerTransitionEnd(n) {
          t(n).trigger(e.end);
        },
        supportsTransitionEnd() {
          return Boolean(e);
        },
        isElement(t) {
          return (t[0] || t).nodeType;
        },
        typeCheckConfig(t, e, n) {
          for (const s in n) {
            if (Object.prototype.hasOwnProperty.call(n, s)) {
              let r = n[s],
                o = e[s],
                a = o && i.isElement(o) ? 'element' : (l = o, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
              if (!new RegExp(r).test(a)) throw new Error(`${t.toUpperCase()}: Option "${s}" provided type "${a}" but expected type "${r}".`);
            } 
          }
          let l;
        },
      };
      return e = (typeof window === 'undefined' || !window.QUnit) && {
        end: 'transitionend',
      }, t.fn.emulateTransitionEnd = n, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
        bindType: e.end,
        delegateType: e.end,
        handle(e) {
          if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
        },
      }), i;
    }(e)),
    L = (a = 'alert', h = `.${l = 'bs.alert'}`, c = (o = e).fn[a], u = {
      CLOSE: `close${h}`,
      CLOSED: `closed${h}`,
      CLICK_DATA_API: `click${h}.data-api`,
    }, f = 'alert', d = 'fade', _ = 'show', g = (function () {
        function t(t) {
          this._element = t;
        }
        const e = t.prototype;
        return e.close = function (t) {
          t = t || this._element;
          const e = this._getRootElement(t);
          this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
        }, e.dispose = function () {
          o.removeData(this._element, l), this._element = null;
        }, e._getRootElement = function (t) {
          let e = P.getSelectorFromElement(t),
            n = !1;
          return e && (n = o(e)[0]), n || (n = o(t).closest(`.${f}`)[0]), n;
        }, e._triggerCloseEvent = function (t) {
          const e = o.Event(u.CLOSE);
          return o(t).trigger(e), e;
        }, e._removeElement = function (t) {
          const e = this;
          o(t).removeClass(_), P.supportsTransitionEnd() && o(t).hasClass(d) ? o(t).one(P.TRANSITION_END, (n) => e._destroyElement(t, n)).emulateTransitionEnd(150) : this._destroyElement(t);
        }, e._destroyElement = function (t) {
          o(t).detach().trigger(u.CLOSED).remove();
        }, t._jQueryInterface = function (e) {
          return this.each(function () {
            let n = o(this),
              i = n.data(l);
            i || (i = new t(this), n.data(l, i)), e === 'close' && i[e](this);
          });
        }, t._handleDismiss = function (t) {
          return function (e) {
            e && e.preventDefault(), t.close(this);
          };
        }, s(t, null, [{
          key: 'VERSION',
          get() {
            return '4.0.0';
          },
        }]), t;
      }()), o(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g())), o.fn[a] = g._jQueryInterface, o.fn[a].Constructor = g, o.fn[a].noConflict = function () {
        return o.fn[a] = c, g._jQueryInterface;
      }, g),
    R = (m = 'button', E = `.${v = 'bs.button'}`, T = '.data-api', y = (p = e).fn[m], C = 'active', I = 'btn', A = 'focus', b = '[data-toggle^="button"]', D = '[data-toggle="buttons"]', S = 'input', w = '.active', N = '.btn', O = {
      CLICK_DATA_API: `click${E}${T}`,
      FOCUS_BLUR_DATA_API: `focus${E}${T} blur${E}${T}`,
    }, k = (function () {
        function t(t) {
          this._element = t;
        }
        const e = t.prototype;
        return e.toggle = function () {
          let t = !0,
            e = !0,
            n = p(this._element).closest(D)[0];
          if (n) {
            const i = p(this._element).find(S)[0];
            if (i) {
              if (i.type === 'radio') { 
                if (i.checked && p(this._element).hasClass(C)) t = !1;
                else {
                  const s = p(n).find(w)[0];
                  s && p(s).removeClass(C);
                }
              }
              if (t) {
                if (i.hasAttribute('disabled') || n.hasAttribute('disabled') || i.classList.contains('disabled') || n.classList.contains('disabled')) return;
                i.checked = !p(this._element).hasClass(C), p(i).trigger('change');
              }
              i.focus(), e = !1;
            }
          }
          e && this._element.setAttribute('aria-pressed', !p(this._element).hasClass(C)), t && p(this._element).toggleClass(C);
        }, e.dispose = function () {
          p.removeData(this._element, v), this._element = null;
        }, t._jQueryInterface = function (e) {
          return this.each(function () {
            let n = p(this).data(v);
            n || (n = new t(this), p(this).data(v, n)), e === 'toggle' && n[e]();
          });
        }, s(t, null, [{
          key: 'VERSION',
          get() {
            return '4.0.0';
          },
        }]), t;
      }()), p(document).on(O.CLICK_DATA_API, b, (t) => {
        t.preventDefault();
        let e = t.target;
        p(e).hasClass(I) || (e = p(e).closest(N)), k._jQueryInterface.call(p(e), 'toggle');
      }).on(O.FOCUS_BLUR_DATA_API, b, (t) => {
        const e = p(t.target).closest(N)[0];
        p(e).toggleClass(A, /^focus(in)?$/.test(t.type));
      }), p.fn[m] = k._jQueryInterface, p.fn[m].Constructor = k, p.fn[m].noConflict = function () {
        return p.fn[m] = y, k._jQueryInterface;
      }, k),
    j = (function (t) {
      let e = 'carousel',
        n = 'bs.carousel',
        i = `.${n}`,
        o = t.fn[e],
        a = {
          interval: 5e3,
          keyboard: !0,
          slide: !1,
          pause: 'hover',
          wrap: !0,
        },
        l = {
          interval: '(number|boolean)',
          keyboard: 'boolean',
          slide: '(boolean|string)',
          pause: '(string|boolean)',
          wrap: 'boolean',
        },
        h = 'next',
        c = 'prev',
        u = 'left',
        f = 'right',
        d = {
          SLIDE: `slide${i}`,
          SLID: `slid${i}`,
          KEYDOWN: `keydown${i}`,
          MOUSEENTER: `mouseenter${i}`,
          MOUSELEAVE: `mouseleave${i}`,
          TOUCHEND: `touchend${i}`,
          LOAD_DATA_API: `load${i}.data-api`,
          CLICK_DATA_API: `click${i}.data-api`,
        },
        _ = 'carousel',
        g = 'active',
        p = 'slide',
        m = 'carousel-item-right',
        v = 'carousel-item-left',
        E = 'carousel-item-next',
        T = 'carousel-item-prev',
        y = {
          ACTIVE: '.active',
          ACTIVE_ITEM: '.active.carousel-item',
          ITEM: '.carousel-item',
          NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
          INDICATORS: '.carousel-indicators',
          DATA_SLIDE: '[data-slide], [data-slide-to]',
          DATA_RIDE: '[data-ride="carousel"]',
        },
        C = (function () {
          function o(e, n) {
            this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(y.INDICATORS)[0], this._addEventListeners();
          }
          const C = o.prototype;
          return C.next = function () {
            this._isSliding || this._slide(h);
          }, C.nextWhenVisible = function () {
            !document.hidden && t(this._element).is(':visible') && t(this._element).css('visibility') !== 'hidden' && this.next();
          }, C.prev = function () {
            this._isSliding || this._slide(c);
          }, C.pause = function (e) {
            e || (this._isPaused = !0), t(this._element).find(y.NEXT_PREV)[0] && P.supportsTransitionEnd() && (P.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
          }, C.cycle = function (t) {
            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
          }, C.to = function (e) {
            const n = this;
            this._activeElement = t(this._element).find(y.ACTIVE_ITEM)[0];
            const i = this._getItemIndex(this._activeElement);
            if (!(e > this._items.length - 1 || e < 0)) { 
              if (this._isSliding) {
                t(this._element).one(d.SLID, () => n.to(e)); 
              } else {
                if (i === e) return this.pause(), void this.cycle();
                const s = e > i ? h : c;
                this._slide(s, this._items[e]);
              } 
            }
          }, C.dispose = function () {
            t(this._element).off(i), t.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
          }, C._getConfig = function (t) {
            return t = r({}, a, t), P.typeCheckConfig(e, t, l), t;
          }, C._addEventListeners = function () {
            const e = this;
            this._config.keyboard && t(this._element).on(d.KEYDOWN, (t) => e._keydown(t)), this._config.pause === 'hover' && (t(this._element).on(d.MOUSEENTER, (t) => e.pause(t)).on(d.MOUSELEAVE, (t) => e.cycle(t)), 'ontouchstart' in document.documentElement && t(this._element).on(d.TOUCHEND, () => {
              e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout((t) => e.cycle(t), 500 + e._config.interval);
            }));
          }, C._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
              switch (t.which) {
                case 37:
                  t.preventDefault(), this.prev();
                  break;
                case 39:
                  t.preventDefault(), this.next();
              }
            }
          }, C._getItemIndex = function (e) {
            return this._items = t.makeArray(t(e).parent().find(y.ITEM)), this._items.indexOf(e);
          }, C._getItemByDirection = function (t, e) {
            let n = t === h,
              i = t === c,
              s = this._getItemIndex(e),
              r = this._items.length - 1;
            if ((i && s === 0 || n && s === r) && !this._config.wrap) return e;
            const o = (s + (t === c ? -1 : 1)) % this._items.length;
            return o === -1 ? this._items[this._items.length - 1] : this._items[o];
          }, C._triggerSlideEvent = function (e, n) {
            let i = this._getItemIndex(e),
              s = this._getItemIndex(t(this._element).find(y.ACTIVE_ITEM)[0]),
              r = t.Event(d.SLIDE, {
                relatedTarget: e,
                direction: n,
                from: s,
                to: i,
              });
            return t(this._element).trigger(r), r;
          }, C._setActiveIndicatorElement = function (e) {
            if (this._indicatorsElement) {
              t(this._indicatorsElement).find(y.ACTIVE).removeClass(g);
              const n = this._indicatorsElement.children[this._getItemIndex(e)];
              n && t(n).addClass(g);
            }
          }, C._slide = function (e, n) {
            let i, 
              s, 
              r, 
              o = this,
              a = t(this._element).find(y.ACTIVE_ITEM)[0],
              l = this._getItemIndex(a),
              c = n || a && this._getItemByDirection(e, a),
              _ = this._getItemIndex(c),
              C = Boolean(this._interval);
            if (e === h ? (i = v, s = E, r = u) : (i = m, s = T, r = f), c && t(c).hasClass(g)) this._isSliding = !1;
            else if (!this._triggerSlideEvent(c, r).isDefaultPrevented() && a && c) {
              this._isSliding = !0, C && this.pause(), this._setActiveIndicatorElement(c);
              const I = t.Event(d.SLID, {
                relatedTarget: c,
                direction: r,
                from: l,
                to: _,
              });
              P.supportsTransitionEnd() && t(this._element).hasClass(p) ? (t(c).addClass(s), P.reflow(c), t(a).addClass(i), t(c).addClass(i), t(a).one(P.TRANSITION_END, () => {
                t(c).removeClass(`${i} ${s}`).addClass(g), t(a).removeClass(`${g} ${s} ${i}`), o._isSliding = !1, setTimeout(() => t(o._element).trigger(I), 0);
              }).emulateTransitionEnd(600)) : (t(a).removeClass(g), t(c).addClass(g), this._isSliding = !1, t(this._element).trigger(I)), C && this.cycle();
            }
          }, o._jQueryInterface = function (e) {
            return this.each(function () {
              let i = t(this).data(n),
                s = r({}, a, t(this).data());
              typeof e === 'object' && (s = r({}, s, e));
              const l = typeof e === 'string' ? e : s.slide;
              if (i || (i = new o(this, s), t(this).data(n, i)), typeof e === 'number') i.to(e);
              else if (typeof l === 'string') {
                if (typeof i[l] === 'undefined') throw new TypeError(`No method named "${l}"`);
                i[l]();
              } else s.interval && (i.pause(), i.cycle());
            });
          }, o._dataApiClickHandler = function (e) {
            const i = P.getSelectorFromElement(this);
            if (i) {
              const s = t(i)[0];
              if (s && t(s).hasClass(_)) {
                let a = r({}, t(s).data(), t(this).data()),
                  l = this.getAttribute('data-slide-to');
                l && (a.interval = !1), o._jQueryInterface.call(t(s), a), l && t(s).data(n).to(l), e.preventDefault();
              }
            }
          }, s(o, null, [{
            key: 'VERSION',
            get() {
              return '4.0.0';
            },
          }, {
            key: 'Default',
            get() {
              return a;
            },
          }]), o;
        }());
      return t(document).on(d.CLICK_DATA_API, y.DATA_SLIDE, C._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, () => {
        t(y.DATA_RIDE).each(function () {
          const e = t(this);
          C._jQueryInterface.call(e, e.data());
        });
      }), t.fn[e] = C._jQueryInterface, t.fn[e].Constructor = C, t.fn[e].noConflict = function () {
        return t.fn[e] = o, C._jQueryInterface;
      }, C;
    }(e)),
    H = (function (t) {
      let e = 'collapse',
        n = 'bs.collapse',
        i = `.${n}`,
        o = t.fn[e],
        a = {
          toggle: !0,
          parent: '',
        },
        l = {
          toggle: 'boolean',
          parent: '(string|element)',
        },
        h = {
          SHOW: `show${i}`,
          SHOWN: `shown${i}`,
          HIDE: `hide${i}`,
          HIDDEN: `hidden${i}`,
          CLICK_DATA_API: `click${i}.data-api`,
        },
        c = 'show',
        u = 'collapse',
        f = 'collapsing',
        d = 'collapsed',
        _ = 'width',
        g = 'height',
        p = {
          ACTIVES: '.show, .collapsing',
          DATA_TOGGLE: '[data-toggle="collapse"]',
        },
        m = (function () {
          function i(e, n) {
            this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t(`[data-toggle="collapse"][href="#${e.id}"],[data-toggle="collapse"][data-target="#${e.id}"]`));
            for (let i = t(p.DATA_TOGGLE), s = 0; s < i.length; s++) {
              let r = i[s],
                o = P.getSelectorFromElement(r);
              o !== null && t(o).filter(e).length > 0 && (this._selector = o, this._triggerArray.push(r));
            }
            this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
          }
          const o = i.prototype;
          return o.toggle = function () {
            t(this._element).hasClass(c) ? this.hide() : this.show();
          }, o.show = function () {
            let e, 
              s, 
              r = this;
            if (!this._isTransitioning && !t(this._element).hasClass(c) && (this._parent && (e = t.makeArray(t(this._parent).find(p.ACTIVES).filter(`[data-parent="${this._config.parent}"]`))).length === 0 && (e = null), !(e && (s = t(e).not(this._selector).data(n)) && s._isTransitioning))) {
              const o = t.Event(h.SHOW);
              if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
                e && (i._jQueryInterface.call(t(e).not(this._selector), 'hide'), s || t(e).data(n, null));
                const a = this._getDimension();
                t(this._element).removeClass(u).addClass(f), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(d).attr('aria-expanded', !0), this.setTransitioning(!0);
                const l = function () {
                  t(r._element).removeClass(f).addClass(u).addClass(c), r._element.style[a] = '', r.setTransitioning(!1), t(r._element).trigger(h.SHOWN);
                };
                if (P.supportsTransitionEnd()) {
                  const _ = `scroll${a[0].toUpperCase() + a.slice(1)}`;
                  t(this._element).one(P.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = `${this._element[_]}px`;
                } else l();
              }
            }
          }, o.hide = function () {
            const e = this;
            if (!this._isTransitioning && t(this._element).hasClass(c)) {
              const n = t.Event(h.HIDE);
              if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
                const i = this._getDimension();
                if (this._element.style[i] = `${this._element.getBoundingClientRect()[i]}px`, P.reflow(this._element), t(this._element).addClass(f).removeClass(u).removeClass(c), this._triggerArray.length > 0) {
                  for (let s = 0; s < this._triggerArray.length; s++) {
                    let r = this._triggerArray[s],
                      o = P.getSelectorFromElement(r);
                    if (o !== null) t(o).hasClass(c) || t(r).addClass(d).attr('aria-expanded', !1);
                  }
                }
                this.setTransitioning(!0);
                const a = function () {
                  e.setTransitioning(!1), t(e._element).removeClass(f).addClass(u).trigger(h.HIDDEN);
                };
                this._element.style[i] = '', P.supportsTransitionEnd() ? t(this._element).one(P.TRANSITION_END, a).emulateTransitionEnd(600) : a();
              }
            }
          }, o.setTransitioning = function (t) {
            this._isTransitioning = t;
          }, o.dispose = function () {
            t.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
          }, o._getConfig = function (t) {
            return (t = r({}, a, t)).toggle = Boolean(t.toggle), P.typeCheckConfig(e, t, l), t;
          }, o._getDimension = function () {
            return t(this._element).hasClass(_) ? _ : g;
          }, o._getParent = function () {
            let e = this,
              n = null;
            P.isElement(this._config.parent) ? (n = this._config.parent, typeof this._config.parent.jquery !== 'undefined' && (n = this._config.parent[0])) : n = t(this._config.parent)[0];
            const s = `[data-toggle="collapse"][data-parent="${this._config.parent}"]`;
            return t(n).find(s).each((t, n) => {
              e._addAriaAndCollapsedClass(i._getTargetFromElement(n), [n]);
            }), n;
          }, o._addAriaAndCollapsedClass = function (e, n) {
            if (e) {
              const i = t(e).hasClass(c);
              n.length > 0 && t(n).toggleClass(d, !i).attr('aria-expanded', i);
            }
          }, i._getTargetFromElement = function (e) {
            const n = P.getSelectorFromElement(e);
            return n ? t(n)[0] : null;
          }, i._jQueryInterface = function (e) {
            return this.each(function () {
              let s = t(this),
                o = s.data(n),
                l = r({}, a, s.data(), typeof e === 'object' && e);
              if (!o && l.toggle && /show|hide/.test(e) && (l.toggle = !1), o || (o = new i(this, l), s.data(n, o)), typeof e === 'string') {
                if (typeof o[e] === 'undefined') throw new TypeError(`No method named "${e}"`);
                o[e]();
              }
            });
          }, s(i, null, [{
            key: 'VERSION',
            get() {
              return '4.0.0';
            },
          }, {
            key: 'Default',
            get() {
              return a;
            },
          }]), i;
        }());
      return t(document).on(h.CLICK_DATA_API, p.DATA_TOGGLE, function (e) {
        e.currentTarget.tagName === 'A' && e.preventDefault();
        let i = t(this),
          s = P.getSelectorFromElement(this);
        t(s).each(function () {
          let e = t(this),
            s = e.data(n) ? 'toggle' : i.data();
          m._jQueryInterface.call(e, s);
        });
      }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () {
        return t.fn[e] = o, m._jQueryInterface;
      }, m;
    }(e)),
    W = (function (t) {
      let e = 'dropdown',
        i = 'bs.dropdown',
        o = `.${i}`,
        a = '.data-api',
        l = t.fn[e],
        h = new RegExp('38|40|27'),
        c = {
          HIDE: `hide${o}`,
          HIDDEN: `hidden${o}`,
          SHOW: `show${o}`,
          SHOWN: `shown${o}`,
          CLICK: `click${o}`,
          CLICK_DATA_API: `click${o}${a}`,
          KEYDOWN_DATA_API: `keydown${o}${a}`,
          KEYUP_DATA_API: `keyup${o}${a}`,
        },
        u = 'disabled',
        f = 'show',
        d = 'dropup',
        _ = 'dropright',
        g = 'dropleft',
        p = 'dropdown-menu-right',
        m = 'dropdown-menu-left',
        v = 'position-static',
        E = '[data-toggle="dropdown"]',
        T = '.dropdown form',
        y = '.dropdown-menu',
        C = '.navbar-nav',
        I = '.dropdown-menu .dropdown-item:not(.disabled)',
        A = 'top-start',
        b = 'top-end',
        D = 'bottom-start',
        S = 'bottom-end',
        w = 'right-start',
        N = 'left-start',
        O = {
          offset: 0,
          flip: !0,
          boundary: 'scrollParent',
        },
        k = {
          offset: '(number|string|function)',
          flip: 'boolean',
          boundary: '(string|element)',
        },
        L = (function () {
          function a(t, e) {
            this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
          }
          const l = a.prototype;
          return l.toggle = function () {
            if (!this._element.disabled && !t(this._element).hasClass(u)) {
              let e = a._getParentFromElement(this._element),
                i = t(this._menu).hasClass(f);
              if (a._clearMenus(), !i) {
                let s = {
                    relatedTarget: this._element,
                  },
                  r = t.Event(c.SHOW, s);
                if (t(e).trigger(r), !r.isDefaultPrevented()) {
                  if (!this._inNavbar) {
                    if (typeof n === 'undefined') throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
                    let o = this._element;
                    t(e).hasClass(d) && (t(this._menu).hasClass(m) || t(this._menu).hasClass(p)) && (o = e), this._config.boundary !== 'scrollParent' && t(e).addClass(v), this._popper = new n(o, this._menu, this._getPopperConfig());
                  }
                  'ontouchstart' in document.documentElement && t(e).closest(C).length === 0 && t('body').children().on('mouseover', null, t.noop), this._element.focus(), this._element.setAttribute('aria-expanded', !0), t(this._menu).toggleClass(f), t(e).toggleClass(f).trigger(t.Event(c.SHOWN, s));
                }
              }
            }
          }, l.dispose = function () {
            t.removeData(this._element, i), t(this._element).off(o), this._element = null, this._menu = null, this._popper !== null && (this._popper.destroy(), this._popper = null);
          }, l.update = function () {
            this._inNavbar = this._detectNavbar(), this._popper !== null && this._popper.scheduleUpdate();
          }, l._addEventListeners = function () {
            const e = this;
            t(this._element).on(c.CLICK, (t) => {
              t.preventDefault(), t.stopPropagation(), e.toggle();
            });
          }, l._getConfig = function (n) {
            return n = r({}, this.constructor.Default, t(this._element).data(), n), P.typeCheckConfig(e, n, this.constructor.DefaultType), n;
          }, l._getMenuElement = function () {
            if (!this._menu) {
              const e = a._getParentFromElement(this._element);
              this._menu = t(e).find(y)[0];
            }
            return this._menu;
          }, l._getPlacement = function () {
            let e = t(this._element).parent(),
              n = D;
            return e.hasClass(d) ? (n = A, t(this._menu).hasClass(p) && (n = b)) : e.hasClass(_) ? n = w : e.hasClass(g) ? n = N : t(this._menu).hasClass(p) && (n = S), n;
          }, l._detectNavbar = function () {
            return t(this._element).closest('.navbar').length > 0;
          }, l._getPopperConfig = function () {
            let t = this,
              e = {};
            return typeof this._config.offset === 'function' ? e.fn = function (e) {
              return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e;
            } : e.offset = this._config.offset, {
              placement: this._getPlacement(),
              modifiers: {
                offset: e,
                flip: {
                  enabled: this._config.flip,
                },
                preventOverflow: {
                  boundariesElement: this._config.boundary,
                },
              },
            };
          }, a._jQueryInterface = function (e) {
            return this.each(function () {
              let n = t(this).data(i);
              if (n || (n = new a(this, typeof e === 'object' ? e : null), t(this).data(i, n)), typeof e === 'string') {
                if (typeof n[e] === 'undefined') throw new TypeError(`No method named "${e}"`);
                n[e]();
              }
            });
          }, a._clearMenus = function (e) {
            if (!e || e.which !== 3 && (e.type !== 'keyup' || e.which === 9)) {
              for (let n = t.makeArray(t(E)), s = 0; s < n.length; s++) {
                let r = a._getParentFromElement(n[s]),
                  o = t(n[s]).data(i),
                  l = {
                    relatedTarget: n[s],
                  };
                if (o) {
                  const h = o._menu;
                  if (t(r).hasClass(f) && !(e && (e.type === 'click' && /input|textarea/i.test(e.target.tagName) || e.type === 'keyup' && e.which === 9) && t.contains(r, e.target))) {
                    const u = t.Event(c.HIDE, l);
                    t(r).trigger(u), u.isDefaultPrevented() || ('ontouchstart' in document.documentElement && t('body').children().off('mouseover', null, t.noop), n[s].setAttribute('aria-expanded', 'false'), t(h).removeClass(f), t(r).removeClass(f).trigger(t.Event(c.HIDDEN, l)));
                  }
                }
              } 
            }
          }, a._getParentFromElement = function (e) {
            let n, 
              i = P.getSelectorFromElement(e);
            return i && (n = t(i)[0]), n || e.parentNode;
          }, a._dataApiKeydownHandler = function (e) {
            if ((/input|textarea/i.test(e.target.tagName) ? !(e.which === 32 || e.which !== 27 && (e.which !== 40 && e.which !== 38 || t(e.target).closest(y).length)) : h.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(u))) {
              let n = a._getParentFromElement(this),
                i = t(n).hasClass(f);
              if ((i || e.which === 27 && e.which === 32) && (!i || e.which !== 27 && e.which !== 32)) {
                const s = t(n).find(I).get();
                if (s.length !== 0) {
                  let r = s.indexOf(e.target);
                  e.which === 38 && r > 0 && r--, e.which === 40 && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus();
                }
              } else {
                if (e.which === 27) {
                  const o = t(n).find(E)[0];
                  t(o).trigger('focus');
                }
                t(this).trigger('click');
              }
            }
          }, s(a, null, [{
            key: 'VERSION',
            get() {
              return '4.0.0';
            },
          }, {
            key: 'Default',
            get() {
              return O;
            },
          }, {
            key: 'DefaultType',
            get() {
              return k;
            },
          }]), a;
        }());
      return t(document).on(c.KEYDOWN_DATA_API, E, L._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, y, L._dataApiKeydownHandler).on(`${c.CLICK_DATA_API} ${c.KEYUP_DATA_API}`, L._clearMenus)
        .on(c.CLICK_DATA_API, E, function (e) {
          e.preventDefault(), e.stopPropagation(), L._jQueryInterface.call(t(this), 'toggle');
        })
        .on(c.CLICK_DATA_API, T, (t) => {
          t.stopPropagation();
        }), t.fn[e] = L._jQueryInterface, t.fn[e].Constructor = L, t.fn[e].noConflict = function () {
        return t.fn[e] = l, L._jQueryInterface;
      }, L;
    }(e)),
    M = (function (t) {
      let e = 'modal',
        n = 'bs.modal',
        i = `.${n}`,
        o = t.fn.modal,
        a = {
          backdrop: !0,
          keyboard: !0,
          focus: !0,
          show: !0,
        },
        l = {
          backdrop: '(boolean|string)',
          keyboard: 'boolean',
          focus: 'boolean',
          show: 'boolean',
        },
        h = {
          HIDE: `hide${i}`,
          HIDDEN: `hidden${i}`,
          SHOW: `show${i}`,
          SHOWN: `shown${i}`,
          FOCUSIN: `focusin${i}`,
          RESIZE: `resize${i}`,
          CLICK_DISMISS: `click.dismiss${i}`,
          KEYDOWN_DISMISS: `keydown.dismiss${i}`,
          MOUSEUP_DISMISS: `mouseup.dismiss${i}`,
          MOUSEDOWN_DISMISS: `mousedown.dismiss${i}`,
          CLICK_DATA_API: `click${i}.data-api`,
        },
        c = 'modal-scrollbar-measure',
        u = 'modal-backdrop',
        f = 'modal-open',
        d = 'fade',
        _ = 'show',
        g = {
          DIALOG: '.modal-dialog',
          DATA_TOGGLE: '[data-toggle="modal"]',
          DATA_DISMISS: '[data-dismiss="modal"]',
          FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
          STICKY_CONTENT: '.sticky-top',
          NAVBAR_TOGGLER: '.navbar-toggler',
        },
        p = (function () {
          function o(e, n) {
            this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(g.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0;
          }
          const p = o.prototype;
          return p.toggle = function (t) {
            return this._isShown ? this.hide() : this.show(t);
          }, p.show = function (e) {
            const n = this;
            if (!this._isTransitioning && !this._isShown) {
              P.supportsTransitionEnd() && t(this._element).hasClass(d) && (this._isTransitioning = !0);
              const i = t.Event(h.SHOW, {
                relatedTarget: e,
              });
              t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(f), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(h.CLICK_DISMISS, g.DATA_DISMISS, (t) => n.hide(t)), t(this._dialog).on(h.MOUSEDOWN_DISMISS, () => {
                t(n._element).one(h.MOUSEUP_DISMISS, (e) => {
                  t(e.target).is(n._element) && (n._ignoreBackdropClick = !0);
                });
              }), this._showBackdrop(() => n._showElement(e)));
            }
          }, p.hide = function (e) {
            const n = this;
            if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
              const i = t.Event(h.HIDE);
              if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                this._isShown = !1;
                const s = P.supportsTransitionEnd() && t(this._element).hasClass(d);
                s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(h.FOCUSIN), t(this._element).removeClass(_), t(this._element).off(h.CLICK_DISMISS), t(this._dialog).off(h.MOUSEDOWN_DISMISS), s ? t(this._element).one(P.TRANSITION_END, (t) => n._hideModal(t)).emulateTransitionEnd(300) : this._hideModal();
              }
            }
          }, p.dispose = function () {
            t.removeData(this._element, n), t(window, document, this._element, this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null;
          }, p.handleUpdate = function () {
            this._adjustDialog();
          }, p._getConfig = function (t) {
            return t = r({}, a, t), P.typeCheckConfig(e, t, l), t;
          }, p._showElement = function (e) {
            let n = this,
              i = P.supportsTransitionEnd() && t(this._element).hasClass(d);
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = 'block', this._element.removeAttribute('aria-hidden'), this._element.scrollTop = 0, i && P.reflow(this._element), t(this._element).addClass(_), this._config.focus && this._enforceFocus();
            let s = t.Event(h.SHOWN, {
                relatedTarget: e,
              }),
              r = function () {
                n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(s);
              };
            i ? t(this._dialog).one(P.TRANSITION_END, r).emulateTransitionEnd(300) : r();
          }, p._enforceFocus = function () {
            const e = this;
            t(document).off(h.FOCUSIN).on(h.FOCUSIN, (n) => {
              document !== n.target && e._element !== n.target && t(e._element).has(n.target).length === 0 && e._element.focus();
            });
          }, p._setEscapeEvent = function () {
            const e = this;
            this._isShown && this._config.keyboard ? t(this._element).on(h.KEYDOWN_DISMISS, (t) => {
              t.which === 27 && (t.preventDefault(), e.hide());
            }) : this._isShown || t(this._element).off(h.KEYDOWN_DISMISS);
          }, p._setResizeEvent = function () {
            const e = this;
            this._isShown ? t(window).on(h.RESIZE, (t) => e.handleUpdate(t)) : t(window).off(h.RESIZE);
          }, p._hideModal = function () {
            const e = this;
            this._element.style.display = 'none', this._element.setAttribute('aria-hidden', !0), this._isTransitioning = !1, this._showBackdrop(() => {
              t(document.body).removeClass(f), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(h.HIDDEN);
            });
          }, p._removeBackdrop = function () {
            this._backdrop && (t(this._backdrop).remove(), this._backdrop = null);
          }, p._showBackdrop = function (e) {
            let n = this,
              i = t(this._element).hasClass(d) ? d : '';
            if (this._isShown && this._config.backdrop) {
              const s = P.supportsTransitionEnd() && i;
              if (this._backdrop = document.createElement('div'), this._backdrop.className = u, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(h.CLICK_DISMISS, (t) => {
                n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && (n._config.backdrop === 'static' ? n._element.focus() : n.hide());
              }), s && P.reflow(this._backdrop), t(this._backdrop).addClass(_), !e) return;
              if (!s) return void e();
              t(this._backdrop).one(P.TRANSITION_END, e).emulateTransitionEnd(150);
            } else if (!this._isShown && this._backdrop) {
              t(this._backdrop).removeClass(_);
              const r = function () {
                n._removeBackdrop(), e && e();
              };
              P.supportsTransitionEnd() && t(this._element).hasClass(d) ? t(this._backdrop).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r();
            } else e && e();
          }, p._adjustDialog = function () {
            const t = this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing && t && (this._element.style.paddingLeft = `${this._scrollbarWidth}px`), this._isBodyOverflowing && !t && (this._element.style.paddingRight = `${this._scrollbarWidth}px`);
          }, p._resetAdjustments = function () {
            this._element.style.paddingLeft = '', this._element.style.paddingRight = '';
          }, p._checkScrollbar = function () {
            const t = document.body.getBoundingClientRect();
            this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
          }, p._setScrollbar = function () {
            const e = this;
            if (this._isBodyOverflowing) {
              t(g.FIXED_CONTENT).each((n, i) => {
                let s = t(i)[0].style.paddingRight,
                  r = t(i).css('padding-right');
                t(i).data('padding-right', s).css('padding-right', `${parseFloat(r) + e._scrollbarWidth}px`);
              }), t(g.STICKY_CONTENT).each((n, i) => {
                let s = t(i)[0].style.marginRight,
                  r = t(i).css('margin-right');
                t(i).data('margin-right', s).css('margin-right', `${parseFloat(r) - e._scrollbarWidth}px`);
              }), t(g.NAVBAR_TOGGLER).each((n, i) => {
                let s = t(i)[0].style.marginRight,
                  r = t(i).css('margin-right');
                t(i).data('margin-right', s).css('margin-right', `${parseFloat(r) + e._scrollbarWidth}px`);
              });
              let n = document.body.style.paddingRight,
                i = t('body').css('padding-right');
              t('body').data('padding-right', n).css('padding-right', `${parseFloat(i) + this._scrollbarWidth}px`);
            }
          }, p._resetScrollbar = function () {
            t(g.FIXED_CONTENT).each((e, n) => {
              const i = t(n).data('padding-right');
              typeof i !== 'undefined' && t(n).css('padding-right', i).removeData('padding-right');
            }), t(`${g.STICKY_CONTENT}, ${g.NAVBAR_TOGGLER}`).each((e, n) => {
              const i = t(n).data('margin-right');
              typeof i !== 'undefined' && t(n).css('margin-right', i).removeData('margin-right');
            });
            const e = t('body').data('padding-right');
            typeof e !== 'undefined' && t('body').css('padding-right', e).removeData('padding-right');
          }, p._getScrollbarWidth = function () {
            const t = document.createElement('div');
            t.className = c, document.body.appendChild(t);
            const e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          }, o._jQueryInterface = function (e, i) {
            return this.each(function () {
              let s = t(this).data(n),
                a = r({}, o.Default, t(this).data(), typeof e === 'object' && e);
              if (s || (s = new o(this, a), t(this).data(n, s)), typeof e === 'string') {
                if (typeof s[e] === 'undefined') throw new TypeError(`No method named "${e}"`);
                s[e](i);
              } else a.show && s.show(i);
            });
          }, s(o, null, [{
            key: 'VERSION',
            get() {
              return '4.0.0';
            },
          }, {
            key: 'Default',
            get() {
              return a;
            },
          }]), o;
        }());
      return t(document).on(h.CLICK_DATA_API, g.DATA_TOGGLE, function (e) {
        let i, 
          s = this,
          o = P.getSelectorFromElement(this);
        o && (i = t(o)[0]);
        const a = t(i).data(n) ? 'toggle' : r({}, t(i).data(), t(this).data());
        this.tagName !== 'A' && this.tagName !== 'AREA' || e.preventDefault();
        var l = t(i).one(h.SHOW, (e) => {
          e.isDefaultPrevented() || l.one(h.HIDDEN, () => {
            t(s).is(':visible') && s.focus();
          });
        });
        p._jQueryInterface.call(t(i), a, this);
      }), t.fn.modal = p._jQueryInterface, t.fn.modal.Constructor = p, t.fn.modal.noConflict = function () {
        return t.fn.modal = o, p._jQueryInterface;
      }, p;
    }(e)),
    U = (function (t) {
      let e = 'tooltip',
        i = 'bs.tooltip',
        o = `.${i}`,
        a = t.fn[e],
        l = new RegExp('(^|\\s)bs-tooltip\\S+', 'g'),
        h = {
          animation: 'boolean',
          template: 'string',
          title: '(string|element|function)',
          trigger: 'string',
          delay: '(number|object)',
          html: 'boolean',
          selector: '(string|boolean)',
          placement: '(string|function)',
          offset: '(number|string)',
          container: '(string|element|boolean)',
          fallbackPlacement: '(string|array)',
          boundary: '(string|element)',
        },
        c = {
          AUTO: 'auto',
          TOP: 'top',
          RIGHT: 'right',
          BOTTOM: 'bottom',
          LEFT: 'left',
        },
        u = {
          animation: !0,
          template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: 'hover focus',
          title: '',
          delay: 0,
          html: !1,
          selector: !1,
          placement: 'top',
          offset: 0,
          container: !1,
          fallbackPlacement: 'flip',
          boundary: 'scrollParent',
        },
        f = 'show',
        d = 'out',
        _ = {
          HIDE: `hide${o}`,
          HIDDEN: `hidden${o}`,
          SHOW: `show${o}`,
          SHOWN: `shown${o}`,
          INSERTED: `inserted${o}`,
          CLICK: `click${o}`,
          FOCUSIN: `focusin${o}`,
          FOCUSOUT: `focusout${o}`,
          MOUSEENTER: `mouseenter${o}`,
          MOUSELEAVE: `mouseleave${o}`,
        },
        g = 'fade',
        p = 'show',
        m = '.tooltip-inner',
        v = '.arrow',
        E = 'hover',
        T = 'focus',
        y = 'click',
        C = 'manual',
        I = (function () {
          function a(t, e) {
            if (typeof n === 'undefined') throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
            this._isEnabled = !0, this._timeout = 0, this._hoverState = '', this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners();
          }
          const I = a.prototype;
          return I.enable = function () {
            this._isEnabled = !0;
          }, I.disable = function () {
            this._isEnabled = !1;
          }, I.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
          }, I.toggle = function (e) {
            if (this._isEnabled) {
              if (e) {
                let n = this.constructor.DATA_KEY,
                  i = t(e.currentTarget).data(n);
                i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i);
              } else {
                if (t(this.getTipElement()).hasClass(p)) return void this._leave(null, this);
                this._enter(null, this);
              }
            }
          }, I.dispose = function () {
            clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest('.modal').off('hide.bs.modal'), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper !== null && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
          }, I.show = function () {
            const e = this;
            if (t(this.element).css('display') === 'none') throw new Error('Please use show on visible elements');
            const i = t.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              t(this.element).trigger(i);
              const s = t.contains(this.element.ownerDocument.documentElement, this.element);
              if (i.isDefaultPrevented() || !s) return;
              let r = this.getTipElement(),
                o = P.getUID(this.constructor.NAME);
              r.setAttribute('id', o), this.element.setAttribute('aria-describedby', o), this.setContent(), this.config.animation && t(r).addClass(g);
              let l = typeof this.config.placement === 'function' ? this.config.placement.call(this, r, this.element) : this.config.placement,
                h = this._getAttachment(l);
              this.addAttachmentClass(h);
              const c = !1 === this.config.container ? document.body : t(this.config.container);
              t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
                placement: h,
                modifiers: {
                  offset: {
                    offset: this.config.offset,
                  },
                  flip: {
                    behavior: this.config.fallbackPlacement,
                  },
                  arrow: {
                    element: v,
                  },
                  preventOverflow: {
                    boundariesElement: this.config.boundary,
                  },
                },
                onCreate(t) {
                  t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
                },
                onUpdate(t) {
                  e._handlePopperPlacementChange(t);
                },
              }), t(r).addClass(p), 'ontouchstart' in document.documentElement && t('body').children().on('mouseover', null, t.noop);
              const u = function () {
                e.config.animation && e._fixTransition();
                const n = e._hoverState;
                e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === d && e._leave(null, e);
              };
              P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(this.tip).one(P.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION) : u();
            }
          }, I.hide = function (e) {
            let n = this,
              i = this.getTipElement(),
              s = t.Event(this.constructor.Event.HIDE),
              r = function () {
                n._hoverState !== f && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute('aria-describedby'), t(n.element).trigger(n.constructor.Event.HIDDEN), n._popper !== null && n._popper.destroy(), e && e();
              };
            t(this.element).trigger(s), s.isDefaultPrevented() || (t(i).removeClass(p), 'ontouchstart' in document.documentElement && t('body').children().off('mouseover', null, t.noop), this._activeTrigger[y] = !1, this._activeTrigger[T] = !1, this._activeTrigger[E] = !1, P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(i).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = '');
          }, I.update = function () {
            this._popper !== null && this._popper.scheduleUpdate();
          }, I.isWithContent = function () {
            return Boolean(this.getTitle());
          }, I.addAttachmentClass = function (e) {
            t(this.getTipElement()).addClass(`bs-tooltip-${e}`);
          }, I.getTipElement = function () {
            return this.tip = this.tip || t(this.config.template)[0], this.tip;
          }, I.setContent = function () {
            const e = t(this.getTipElement());
            this.setElementContent(e.find(m), this.getTitle()), e.removeClass(`${g} ${p}`);
          }, I.setElementContent = function (e, n) {
            const i = this.config.html;
            typeof n === 'object' && (n.nodeType || n.jquery) ? i ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[i ? 'html' : 'text'](n);
          }, I.getTitle = function () {
            let t = this.element.getAttribute('data-original-title');
            return t || (t = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title), t;
          }, I._getAttachment = function (t) {
            return c[t.toUpperCase()];
          }, I._setListeners = function () {
            const e = this;
            this.config.trigger.split(' ').forEach((n) => {
              if (n === 'click') {
                t(e.element).on(e.constructor.Event.CLICK, e.config.selector, (t) => e.toggle(t)); 
              } else if (n !== C) {
                let i = n === E ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                  s = n === E ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                t(e.element).on(i, e.config.selector, (t) => e._enter(t)).on(s, e.config.selector, (t) => e._leave(t));
              }
              t(e.element).closest('.modal').on('hide.bs.modal', () => e.hide());
            }), this.config.selector ? this.config = r({}, this.config, {
              trigger: 'manual',
              selector: '',
            }) : this._fixTitle();
          }, I._fixTitle = function () {
            const t = typeof this.element.getAttribute('data-original-title');
            (this.element.getAttribute('title') || t !== 'string') && (this.element.setAttribute('data-original-title', this.element.getAttribute('title') || ''), this.element.setAttribute('title', ''));
          }, I._enter = function (e, n) {
            const i = this.constructor.DATA_KEY;
            (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger[e.type === 'focusin' ? T : E] = !0), t(n.getTipElement()).hasClass(p) || n._hoverState === f ? n._hoverState = f : (clearTimeout(n._timeout), n._hoverState = f, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(() => {
              n._hoverState === f && n.show();
            }, n.config.delay.show) : n.show());
          }, I._leave = function (e, n) {
            const i = this.constructor.DATA_KEY;
            (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger[e.type === 'focusout' ? T : E] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = d, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(() => {
              n._hoverState === d && n.hide();
            }, n.config.delay.hide) : n.hide());
          }, I._isWithActiveTrigger = function () {
            for (const t in this._activeTrigger) { if (this._activeTrigger[t]) return !0; }
            return !1;
          }, I._getConfig = function (n) {
            return typeof (n = r({}, this.constructor.Default, t(this.element).data(), n)).delay === 'number' && (n.delay = {
              show: n.delay,
              hide: n.delay,
            }), typeof n.title === 'number' && (n.title = n.title.toString()), typeof n.content === 'number' && (n.content = n.content.toString()), P.typeCheckConfig(e, n, this.constructor.DefaultType), n;
          }, I._getDelegateConfig = function () {
            const t = {};
            if (this.config) { for (const e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]); }
            return t;
          }, I._cleanTipClass = function () {
            let e = t(this.getTipElement()),
              n = e.attr('class').match(l);
            n !== null && n.length > 0 && e.removeClass(n.join(''));
          }, I._handlePopperPlacementChange = function (t) {
            this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
          }, I._fixTransition = function () {
            let e = this.getTipElement(),
              n = this.config.animation;
            e.getAttribute('x-placement') === null && (t(e).removeClass(g), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n);
          }, a._jQueryInterface = function (e) {
            return this.each(function () {
              let n = t(this).data(i),
                s = typeof e === 'object' && e;
              if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, s), t(this).data(i, n)), typeof e === 'string')) {
                if (typeof n[e] === 'undefined') throw new TypeError(`No method named "${e}"`);
                n[e]();
              }
            });
          }, s(a, null, [{
            key: 'VERSION',
            get() {
              return '4.0.0';
            },
          }, {
            key: 'Default',
            get() {
              return u;
            },
          }, {
            key: 'NAME',
            get() {
              return e;
            },
          }, {
            key: 'DATA_KEY',
            get() {
              return i;
            },
          }, {
            key: 'Event',
            get() {
              return _;
            },
          }, {
            key: 'EVENT_KEY',
            get() {
              return o;
            },
          }, {
            key: 'DefaultType',
            get() {
              return h;
            },
          }]), a;
        }());
      return t.fn[e] = I._jQueryInterface, t.fn[e].Constructor = I, t.fn[e].noConflict = function () {
        return t.fn[e] = a, I._jQueryInterface;
      }, I;
    }(e)),
    x = (function (t) {
      let e = 'popover',
        n = 'bs.popover',
        i = `.${n}`,
        o = t.fn[e],
        a = new RegExp('(^|\\s)bs-popover\\S+', 'g'),
        l = r({}, U.Default, {
          placement: 'right',
          trigger: 'click',
          content: '',
          template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        }),
        h = r({}, U.DefaultType, {
          content: '(string|element|function)',
        }),
        c = 'fade',
        u = 'show',
        f = '.popover-header',
        d = '.popover-body',
        _ = {
          HIDE: `hide${i}`,
          HIDDEN: `hidden${i}`,
          SHOW: `show${i}`,
          SHOWN: `shown${i}`,
          INSERTED: `inserted${i}`,
          CLICK: `click${i}`,
          FOCUSIN: `focusin${i}`,
          FOCUSOUT: `focusout${i}`,
          MOUSEENTER: `mouseenter${i}`,
          MOUSELEAVE: `mouseleave${i}`,
        },
        g = (function (r) {
          let o, 
            g;

          function p() {
            return r.apply(this, arguments) || this;
          }
          g = r, (o = p).prototype = Object.create(g.prototype), o.prototype.constructor = o, o.__proto__ = g;
          const m = p.prototype;
          return m.isWithContent = function () {
            return this.getTitle() || this._getContent();
          }, m.addAttachmentClass = function (e) {
            t(this.getTipElement()).addClass(`bs-popover-${e}`);
          }, m.getTipElement = function () {
            return this.tip = this.tip || t(this.config.template)[0], this.tip;
          }, m.setContent = function () {
            const e = t(this.getTipElement());
            this.setElementContent(e.find(f), this.getTitle());
            let n = this._getContent();
            typeof n === 'function' && (n = n.call(this.element)), this.setElementContent(e.find(d), n), e.removeClass(`${c} ${u}`);
          }, m._getContent = function () {
            return this.element.getAttribute('data-content') || this.config.content;
          }, m._cleanTipClass = function () {
            let e = t(this.getTipElement()),
              n = e.attr('class').match(a);
            n !== null && n.length > 0 && e.removeClass(n.join(''));
          }, p._jQueryInterface = function (e) {
            return this.each(function () {
              let i = t(this).data(n),
                s = typeof e === 'object' ? e : null;
              if ((i || !/destroy|hide/.test(e)) && (i || (i = new p(this, s), t(this).data(n, i)), typeof e === 'string')) {
                if (typeof i[e] === 'undefined') throw new TypeError(`No method named "${e}"`);
                i[e]();
              }
            });
          }, s(p, null, [{
            key: 'VERSION',
            get() {
              return '4.0.0';
            },
          }, {
            key: 'Default',
            get() {
              return l;
            },
          }, {
            key: 'NAME',
            get() {
              return e;
            },
          }, {
            key: 'DATA_KEY',
            get() {
              return n;
            },
          }, {
            key: 'Event',
            get() {
              return _;
            },
          }, {
            key: 'EVENT_KEY',
            get() {
              return i;
            },
          }, {
            key: 'DefaultType',
            get() {
              return h;
            },
          }]), p;
        }(U));
      return t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
        return t.fn[e] = o, g._jQueryInterface;
      }, g;
    }(e)),
    K = (function (t) {
      let e = 'scrollspy',
        n = 'bs.scrollspy',
        i = `.${n}`,
        o = t.fn[e],
        a = {
          offset: 10,
          method: 'auto',
          target: '',
        },
        l = {
          offset: 'number',
          method: 'string',
          target: '(string|element)',
        },
        h = {
          ACTIVATE: `activate${i}`,
          SCROLL: `scroll${i}`,
          LOAD_DATA_API: `load${i}.data-api`,
        },
        c = 'dropdown-item',
        u = 'active',
        f = {
          DATA_SPY: '[data-spy="scroll"]',
          ACTIVE: '.active',
          NAV_LIST_GROUP: '.nav, .list-group',
          NAV_LINKS: '.nav-link',
          NAV_ITEMS: '.nav-item',
          LIST_ITEMS: '.list-group-item',
          DROPDOWN: '.dropdown',
          DROPDOWN_ITEMS: '.dropdown-item',
          DROPDOWN_TOGGLE: '.dropdown-toggle',
        },
        d = 'offset',
        _ = 'position',
        g = (function () {
          function o(e, n) {
            const i = this;
            this._element = e, this._scrollElement = e.tagName === 'BODY' ? window : e, this._config = this._getConfig(n), this._selector = `${this._config.target} ${f.NAV_LINKS},${this._config.target} ${f.LIST_ITEMS},${this._config.target} ${f.DROPDOWN_ITEMS}`, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, (t) => i._process(t)), this.refresh(), this._process();
          }
          const g = o.prototype;
          return g.refresh = function () {
            let e = this,
              n = this._scrollElement === this._scrollElement.window ? d : _,
              i = this._config.method === 'auto' ? n : this._config.method,
              s = i === _ ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map((e) => {
              let n, 
                r = P.getSelectorFromElement(e);
              if (r && (n = t(r)[0]), n) {
                const o = n.getBoundingClientRect();
                if (o.width || o.height) return [t(n)[i]().top + s, r];
              }
              return null;
            }).filter((t) => t).sort((t, e) => t[0] - e[0])
              .forEach((t) => {
                e._offsets.push(t[0]), e._targets.push(t[1]);
              });
          }, g.dispose = function () {
            t.removeData(this._element, n), t(this._scrollElement).off(i), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
          }, g._getConfig = function (n) {
            if (typeof (n = r({}, a, n)).target !== 'string') {
              let i = t(n.target).attr('id');
              i || (i = P.getUID(e), t(n.target).attr('id', i)), n.target = `#${i}`;
            }
            return P.typeCheckConfig(e, n, l), n;
          }, g._getScrollTop = function () {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
          }, g._getScrollHeight = function () {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          }, g._getOffsetHeight = function () {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
          }, g._process = function () {
            let t = this._getScrollTop() + this._config.offset,
              e = this._getScrollHeight(),
              n = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(), t >= n) {
              const i = this._targets[this._targets.length - 1];
              this._activeTarget !== i && this._activate(i);
            } else {
              if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
              for (let s = this._offsets.length; s--;) {
                this._activeTarget !== this._targets[s] && t >= this._offsets[s] && (typeof this._offsets[s + 1] === 'undefined' || t < this._offsets[s + 1]) && this._activate(this._targets[s]);
              }
            }
          }, g._activate = function (e) {
            this._activeTarget = e, this._clear();
            let n = this._selector.split(',');
            n = n.map((t) => `${t}[data-target="${e}"],${t}[href="${e}"]`);
            const i = t(n.join(','));
            i.hasClass(c) ? (i.closest(f.DROPDOWN).find(f.DROPDOWN_TOGGLE).addClass(u), i.addClass(u)) : (i.addClass(u), i.parents(f.NAV_LIST_GROUP).prev(`${f.NAV_LINKS}, ${f.LIST_ITEMS}`).addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_ITEMS).children(f.NAV_LINKS).addClass(u)), t(this._scrollElement).trigger(h.ACTIVATE, {
              relatedTarget: e,
            });
          }, g._clear = function () {
            t(this._selector).filter(f.ACTIVE).removeClass(u);
          }, o._jQueryInterface = function (e) {
            return this.each(function () {
              let i = t(this).data(n);
              if (i || (i = new o(this, typeof e === 'object' && e), t(this).data(n, i)), typeof e === 'string') {
                if (typeof i[e] === 'undefined') throw new TypeError(`No method named "${e}"`);
                i[e]();
              }
            });
          }, s(o, null, [{
            key: 'VERSION',
            get() {
              return '4.0.0';
            },
          }, {
            key: 'Default',
            get() {
              return a;
            },
          }]), o;
        }());
      return t(window).on(h.LOAD_DATA_API, () => {
        for (let e = t.makeArray(t(f.DATA_SPY)), n = e.length; n--;) {
          const i = t(e[n]);
          g._jQueryInterface.call(i, i.data());
        }
      }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
        return t.fn[e] = o, g._jQueryInterface;
      }, g;
    }(e)),
    V = (function (t) {
      let e = 'bs.tab',
        n = `.${e}`,
        i = t.fn.tab,
        r = {
          HIDE: `hide${n}`,
          HIDDEN: `hidden${n}`,
          SHOW: `show${n}`,
          SHOWN: `shown${n}`,
          CLICK_DATA_API: 'click.bs.tab.data-api',
        },
        o = 'dropdown-menu',
        a = 'active',
        l = 'disabled',
        h = 'fade',
        c = 'show',
        u = '.dropdown',
        f = '.nav, .list-group',
        d = '.active',
        _ = '> li > .active',
        g = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        p = '.dropdown-toggle',
        m = '> .dropdown-menu .active',
        v = (function () {
          function n(t) {
            this._element = t;
          }
          const i = n.prototype;
          return i.show = function () {
            const e = this;
            if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(a) || t(this._element).hasClass(l))) {
              let n, 
                i, 
                s = t(this._element).closest(f)[0],
                o = P.getSelectorFromElement(this._element);
              if (s) {
                const h = s.nodeName === 'UL' ? _ : d;
                i = (i = t.makeArray(t(s).find(h)))[i.length - 1];
              }
              let c = t.Event(r.HIDE, {
                  relatedTarget: this._element,
                }),
                u = t.Event(r.SHOW, {
                  relatedTarget: i,
                });
              if (i && t(i).trigger(c), t(this._element).trigger(u), !u.isDefaultPrevented() && !c.isDefaultPrevented()) {
                o && (n = t(o)[0]), this._activate(this._element, s);
                const g = function () {
                  let n = t.Event(r.HIDDEN, {
                      relatedTarget: e._element,
                    }),
                    s = t.Event(r.SHOWN, {
                      relatedTarget: i,
                    });
                  t(i).trigger(n), t(e._element).trigger(s);
                };
                n ? this._activate(n, n.parentNode, g) : g();
              }
            }
          }, i.dispose = function () {
            t.removeData(this._element, e), this._element = null;
          }, i._activate = function (e, n, i) {
            let s = this,
              r = (n.nodeName === 'UL' ? t(n).find(_) : t(n).children(d))[0],
              o = i && P.supportsTransitionEnd() && r && t(r).hasClass(h),
              a = function () {
                return s._transitionComplete(e, r, i);
              };
            r && o ? t(r).one(P.TRANSITION_END, a).emulateTransitionEnd(150) : a();
          }, i._transitionComplete = function (e, n, i) {
            if (n) {
              t(n).removeClass(`${c} ${a}`);
              const s = t(n.parentNode).find(m)[0];
              s && t(s).removeClass(a), n.getAttribute('role') === 'tab' && n.setAttribute('aria-selected', !1);
            }
            if (t(e).addClass(a), e.getAttribute('role') === 'tab' && e.setAttribute('aria-selected', !0), P.reflow(e), t(e).addClass(c), e.parentNode && t(e.parentNode).hasClass(o)) {
              const r = t(e).closest(u)[0];
              r && t(r).find(p).addClass(a), e.setAttribute('aria-expanded', !0);
            }
            i && i();
          }, n._jQueryInterface = function (i) {
            return this.each(function () {
              let s = t(this),
                r = s.data(e);
              if (r || (r = new n(this), s.data(e, r)), typeof i === 'string') {
                if (typeof r[i] === 'undefined') throw new TypeError(`No method named "${i}"`);
                r[i]();
              }
            });
          }, s(n, null, [{
            key: 'VERSION',
            get() {
              return '4.0.0';
            },
          }]), n;
        }());
      return t(document).on(r.CLICK_DATA_API, g, function (e) {
        e.preventDefault(), v._jQueryInterface.call(t(this), 'show');
      }), t.fn.tab = v._jQueryInterface, t.fn.tab.Constructor = v, t.fn.tab.noConflict = function () {
        return t.fn.tab = i, v._jQueryInterface;
      }, v;
    }(e));
  !(function (t) {
    if (typeof t === 'undefined') throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
    const e = t.fn.jquery.split(' ')[0].split('.');
    if (e[0] < 2 && e[1] < 9 || e[0] === 1 && e[1] === 9 && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
  }(e)), t.Util = P, t.Alert = L, t.Button = R, t.Carousel = j, t.Collapse = H, t.Dropdown = W, t.Modal = M, t.Popover = x, t.Scrollspy = K, t.Tab = V, t.Tooltip = U, Object.defineProperty(t, '__esModule', {
    value: !0,
  });
}));
// # sourceMappingURL=bootstrap.min.js.map
