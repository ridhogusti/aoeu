/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function (e, t) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = t() : typeof define === 'function' && define.amd ? define(t) : e.Popper = t();
}(this, () => {
  'use strict';

  function e(e) {
    return e && {}.toString.call(e) === '[object Function]';
  }

  function t(e, t) {
    if (e.nodeType !== 1) return [];
    const o = window.getComputedStyle(e, null);
    return t ? o[t] : o;
  }

  function o(e) {
    return e.nodeName === 'HTML' ? e : e.parentNode || e.host;
  }

  function n(e) {
    if (!e || ['HTML', 'BODY', '#document'].indexOf(e.nodeName) !== -1) return window.document.body;
    let i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
  }

  function r(e) {
    let o = e && e.offsetParent,
      i = o && o.nodeName;
    return i && i !== 'BODY' && i !== 'HTML' ? ['TD', 'TABLE'].indexOf(o.nodeName) !== -1 && t(o, 'position') === 'static' ? r(o) : o : window.document.documentElement;
  }

  function p(e) {
    const t = e.nodeName;
    return t !== 'BODY' && (t === 'HTML' || r(e.firstElementChild) === e);
  }

  function s(e) {
    return e.parentNode === null ? e : s(e.parentNode);
  }

  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return window.document.documentElement;
    let o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = o ? e : t,
      n = o ? t : e,
      a = document.createRange();
    a.setStart(i, 0), a.setEnd(n, 0);
    const l = a.commonAncestorContainer;
    if (e !== l && t !== l || i.contains(n)) return p(l) ? l : r(l);
    const f = s(e);
    return f.host ? d(f.host, t) : d(e, s(t).host);
  }

  function a(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'top',
      o = t === 'top' ? 'scrollTop' : 'scrollLeft',
      i = e.nodeName;
    if (i === 'BODY' || i === 'HTML') {
      let n = window.document.documentElement,
        r = window.document.scrollingElement || n;
      return r[o];
    }
    return e[o];
  }

  function l(e, t) {
    let o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      i = a(t, 'top'),
      n = a(t, 'left'),
      r = o ? -1 : 1;
    return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e;
  }

  function f(e, t) {
    let o = t === 'x' ? 'Left' : 'Top',
      i = o == 'Left' ? 'Right' : 'Bottom';
    return +e[`border${o}Width`].split('px')[0] + +e[`border${i}Width`].split('px')[0];
  }

  function m(e, t, o, i) {
    return X(t[`offset${e}`], t[`scroll${e}`], o[`client${e}`], o[`offset${e}`], o[`scroll${e}`], ne() ? o[`offset${e}`] + i[`margin${e === 'Height' ? 'Top' : 'Left'}`] + i[`margin${e === 'Height' ? 'Bottom' : 'Right'}`] : 0);
  }

  function c() {
    let e = window.document.body,
      t = window.document.documentElement,
      o = ne() && window.getComputedStyle(t);
    return {
      height: m('Height', e, t, o),
      width: m('Width', e, t, o),
    };
  }

  function h(e) {
    return de({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height,
    });
  }

  function g(e) {
    let o = {};
    if (ne()) { 
      try {
        o = e.getBoundingClientRect();
        let i = a(e, 'top'),
          n = a(e, 'left');
        o.top += i, o.left += n, o.bottom += i, o.right += n;
      } catch (e) {} 
    } else o = e.getBoundingClientRect();
    let r = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top,
      },
      p = e.nodeName === 'HTML' ? c() : {},
      s = p.width || e.clientWidth || r.right - r.left,
      d = p.height || e.clientHeight || r.bottom - r.top,
      l = e.offsetWidth - s,
      m = e.offsetHeight - d;
    if (l || m) {
      const g = t(e);
      l -= f(g, 'x'), m -= f(g, 'y'), r.width -= l, r.height -= m;
    }
    return h(r);
  }

  function u(e, o) {
    let i = ne(),
      r = o.nodeName === 'HTML',
      p = g(e),
      s = g(o),
      d = n(e),
      a = t(o),
      f = +a.borderTopWidth.split('px')[0],
      m = +a.borderLeftWidth.split('px')[0],
      c = h({
        top: p.top - s.top - f,
        left: p.left - s.left - m,
        width: p.width,
        height: p.height,
      });
    if (c.marginTop = 0, c.marginLeft = 0, !i && r) {
      let u = +a.marginTop.split('px')[0],
        b = +a.marginLeft.split('px')[0];
      c.top -= f - u, c.bottom -= f - u, c.left -= m - b, c.right -= m - b, c.marginTop = u, c.marginLeft = b;
    }
    return (i ? o.contains(d) : o === d && d.nodeName !== 'BODY') && (c = l(c, o)), c;
  }

  function b(e) {
    let t = window.document.documentElement,
      o = u(e, t),
      i = X(t.clientWidth, window.innerWidth || 0),
      n = X(t.clientHeight, window.innerHeight || 0),
      r = a(t),
      p = a(t, 'left'),
      s = {
        top: r - o.top + o.marginTop,
        left: p - o.left + o.marginLeft,
        width: i,
        height: n,
      };
    return h(s);
  }

  function y(e) {
    const i = e.nodeName;
    return i === 'BODY' || i === 'HTML' ? !1 : t(e, 'position') === 'fixed' || y(o(e));
  }

  function w(e, t, i, r) {
    let p = {
        top: 0,
        left: 0,
      },
      s = d(e, t);
    if (r === 'viewport') p = b(s);
    else {
      let a;
      r === 'scrollParent' ? (a = n(o(e)), a.nodeName === 'BODY' && (a = window.document.documentElement)) : r === 'window' ? a = window.document.documentElement : a = r;
      const l = u(a, s);
      if (a.nodeName === 'HTML' && !y(s)) {
        let f = c(),
          m = f.height,
          h = f.width;
        p.top += l.top - l.marginTop, p.bottom = m + l.top, p.left += l.left - l.marginLeft, p.right = h + l.left;
      } else p = l;
    }
    return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p;
  }

  function E(e) {
    let t = e.width,
      o = e.height;
    return t * o;
  }

  function v(e, t, o, i, n) {
    const r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (e.indexOf('auto') === -1) return e;
    let p = w(o, i, r, n),
      s = {
        top: {
          width: p.width,
          height: t.top - p.top,
        },
        right: {
          width: p.right - t.right,
          height: p.height,
        },
        bottom: {
          width: p.width,
          height: p.bottom - t.bottom,
        },
        left: {
          width: t.left - p.left,
          height: p.height,
        },
      },
      d = Object.keys(s).map((e) => de({
        key: e,
      }, s[e], {
        area: E(s[e]),
      })).sort((e, t) => t.area - e.area),
      a = d.filter((e) => {
        let t = e.width,
          i = e.height;
        return t >= o.clientWidth && i >= o.clientHeight;
      }),
      l = a.length > 0 ? a[0].key : d[0].key,
      f = e.split('-')[1];
    return l + (f ? `-${f}` : '');
  }

  function x(e, t, o) {
    const i = d(t, o);
    return u(o, i);
  }

  function O(e) {
    let t = window.getComputedStyle(e),
      o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
      n = {
        width: e.offsetWidth + i,
        height: e.offsetHeight + o,
      };
    return n;
  }

  function L(e) {
    const t = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom',
    };
    return e.replace(/left|right|bottom|top/g, (e) => t[e]);
  }

  function S(e, t, o) {
    o = o.split('-')[0];
    let i = O(e),
      n = {
        width: i.width,
        height: i.height,
      },
      r = ['right', 'left'].indexOf(o) !== -1,
      p = r ? 'top' : 'left',
      s = r ? 'left' : 'top',
      d = r ? 'height' : 'width',
      a = r ? 'width' : 'height';
    return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[L(s)], n;
  }

  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }

  function C(e, t, o) {
    if (Array.prototype.findIndex) {
      return e.findIndex((e) => e[t] === o);
    }
    const i = T(e, (e) => e[t] === o);
    return e.indexOf(i);
  }

  function N(t, o, i) {
    const n = void 0 === i ? t : t.slice(0, C(t, 'name', i));
    return n.forEach((t) => {
      t.function && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      const i = t.function || t.fn;
      t.enabled && e(i) && (o.offsets.popper = h(o.offsets.popper), o.offsets.reference = h(o.offsets.reference), o = i(o, t));
    }), o;
  }

  function k() {
    if (!this.state.isDestroyed) {
      let e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }

  function W(e, t) {
    return e.some((e) => {
      let o = e.name,
        i = e.enabled;
      return i && o === t;
    });
  }

  function B(e) {
    for (let t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
      let i = t[n],
        r = i ? `${i}${o}` : e;
      if (typeof window.document.body.style[r] !== 'undefined') return r;
    }
    return null;
  }

  function P() {
    return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }

  function D(e, t, o, i) {
    let r = e.nodeName === 'BODY',
      p = r ? window : e;
    p.addEventListener(t, o, {
      passive: !0,
    }), r || D(n(p.parentNode), t, o, i), i.push(p);
  }

  function H(e, t, o, i) {
    o.updateBound = i, window.addEventListener('resize', o.updateBound, {
      passive: !0,
    });
    const r = n(e);
    return D(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o;
  }

  function A() {
    this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate));
  }

  function M(e, t) {
    return window.removeEventListener('resize', t.updateBound), t.scrollParents.forEach((e) => {
      e.removeEventListener('scroll', t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }

  function I() {
    this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state));
  }

  function R(e) {
    return e !== '' && !isNaN(parseFloat(e)) && isFinite(e);
  }

  function U(e, t) {
    Object.keys(t).forEach((o) => {
      let i = ''; ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) !== -1 && R(t[o]) && (i = 'px'), e.style[o] = t[o] + i;
    });
  }

  function Y(e, t) {
    Object.keys(t).forEach((o) => {
      const i = t[o];
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }

  function F(e, t, o) {
    let i = T(e, (e) => {
        const o = e.name;
        return o === t;
      }),
      n = !!i && e.some((e) => e.name === o && e.enabled && e.order < i.order);
    if (!n) {
      const r = `\`${t}\``;
      console.warn(`\`${o}\`` + ` modifier is required by ${r} modifier in order to work, be sure to include it before ${r}!`);
    }
    return n;
  }

  function j(e) {
    return e === 'end' ? 'start' : e === 'start' ? 'end' : e;
  }

  function K(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      o = le.indexOf(e),
      i = le.slice(o + 1).concat(le.slice(0, o));
    return t ? i.reverse() : i;
  }

  function q(e, t, o, i) {
    let n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +n[1],
      p = n[2];
    if (!r) return e;
    if (p.indexOf('%') === 0) {
      let s;
      switch (p) {
        case '%p':
          s = o;
          break;
        case '%':
        case '%r':
        default:
          s = i;
      }
      const d = h(s);
      return d[t] / 100 * r;
    }
    if (p === 'vh' || p === 'vw') {
      let a;
      return a = p === 'vh' ? X(document.documentElement.clientHeight, window.innerHeight || 0) : X(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r;
    }
    return r;
  }

  function G(e, t, o, i) {
    let n = [0, 0],
      r = ['right', 'left'].indexOf(i) !== -1,
      p = e.split(/(\+|\-)/).map((e) => e.trim()),
      s = p.indexOf(T(p, (e) => e.search(/,|\s/) !== -1));
    p[s] && p[s].indexOf(',') === -1 && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    let d = /\s*,\s*|\s+/,
      a = s === -1 ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
    return a = a.map((e, i) => {
      let n = (i === 1 ? !r : r) ? 'height' : 'width',
        p = !1;
      return e.reduce((e, t) => (e[e.length - 1] === '' && ['+', '-'].indexOf(t) !== -1 ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)), []).map((e) => q(e, n, t, o));
    }), a.forEach((e, t) => {
      e.forEach((o, i) => {
        R(o) && (n[t] += o * (e[i - 1] === '-' ? -1 : 1));
      });
    }), n;
  }

  function z(e, t) {
    let o, 
      i = t.offset,
      n = e.placement,
      r = e.offsets,
      p = r.popper,
      s = r.reference,
      d = n.split('-')[0];
    return o = R(+i) ? [+i, 0] : G(i, p, s, d), d === 'left' ? (p.top += o[0], p.left -= o[1]) : d === 'right' ? (p.top += o[0], p.left += o[1]) : d === 'top' ? (p.left += o[0], p.top -= o[1]) : d === 'bottom' && (p.left += o[0], p.top += o[1]), e.popper = p, e;
  }
  for (var V = Math.min, _ = Math.floor, X = Math.max, Q = ['native code', '[object MutationObserverConstructor]'], J = function (e) {
      return Q.some((t) => (e || '').toString().indexOf(t) > -1);
    }, Z = typeof window !== 'undefined', $ = ['Edge', 'Trident', 'Firefox'], ee = 0, te = 0; te < $.length; te += 1) {
    if (Z && navigator.userAgent.indexOf($[te]) >= 0) {
      ee = 1;
      break;
    }
  }
  var i, 
    oe = Z && J(window.MutationObserver),
    ie = oe ? function (e) {
      let t = !1,
        o = 0,
        i = document.createElement('span'),
        n = new MutationObserver((() => {
          e(), t = !1;
        }));
      return n.observe(i, {
        attributes: !0,
      }),
      function () {
        t || (t = !0, i.setAttribute('x-index', o), ++o);
      };
    } : function (e) {
      let t = !1;
      return function () {
        t || (t = !0, setTimeout(() => {
          t = !1, e();
        }, ee));
      };
    },
    ne = function () {
      return void 0 == i && (i = navigator.appVersion.indexOf('MSIE 10') !== -1), i;
    },
    re = function (e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
    },
    pe = (function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
      return function (t, o, i) {
        return o && e(t.prototype, o), i && e(t, i), t;
      };
    }()),
    se = function (e, t, o) {
      return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }) : e[t] = o, e;
    },
    de = Object.assign || function (e) {
      for (var t, o = 1; o < arguments.length; o++) { for (const i in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); }
      return e;
    },
    ae = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
    le = ae.slice(3),
    fe = {
      FLIP: 'flip',
      CLOCKWISE: 'clockwise',
      COUNTERCLOCKWISE: 'counterclockwise',
    },
    me = (function () {
      function t(o, i) {
        let n = this,
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        re(this, t), this.scheduleUpdate = function () {
          return requestAnimationFrame(n.update);
        }, this.update = ie(this.update.bind(this)), this.options = de({}, t.Defaults, r), this.state = {
          isDestroyed: !1,
          isCreated: !1,
          scrollParents: [],
        }, this.reference = o.jquery ? o[0] : o, this.popper = i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(de({}, t.Defaults.modifiers, r.modifiers)).forEach((e) => {
          n.options.modifiers[e] = de({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
        }), this.modifiers = Object.keys(this.options.modifiers).map((e) => de({
          name: e,
        }, n.options.modifiers[e])).sort((e, t) => e.order - t.order), this.modifiers.forEach((t) => {
          t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state);
        }), this.update();
        const p = this.options.eventsEnabled;
        p && this.enableEventListeners(), this.state.eventsEnabled = p;
      }
      return pe(t, [{
        key: 'update',
        value() {
          return k.call(this);
        },
      }, {
        key: 'destroy',
        value() {
          return P.call(this);
        },
      }, {
        key: 'enableEventListeners',
        value() {
          return A.call(this);
        },
      }, {
        key: 'disableEventListeners',
        value() {
          return I.call(this);
        },
      }]), t;
    }());
  return me.Utils = (typeof window === 'undefined' ? global : window).PopperUtils, me.placements = ae, me.Defaults = {
    placement: 'bottom',
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate() {},
    onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn(e) {
          let t = e.placement,
            o = t.split('-')[0],
            i = t.split('-')[1];
          if (i) {
            let n = e.offsets,
              r = n.reference,
              p = n.popper,
              s = ['bottom', 'top'].indexOf(o) !== -1,
              d = s ? 'left' : 'top',
              a = s ? 'width' : 'height',
              l = {
                start: se({}, d, r[d]),
                end: se({}, d, r[d] + r[a] - p[a]),
              };
            e.offsets.popper = de({}, p, l[i]);
          }
          return e;
        },
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: z,
        offset: 0,
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn(e, t) {
          let o = t.boundariesElement || r(e.instance.popper);
          e.instance.reference === o && (o = r(o));
          const i = w(e.instance.popper, e.instance.reference, t.padding, o);
          t.boundaries = i;
          let n = t.priority,
            p = e.offsets.popper,
            s = {
              primary(e) {
                let o = p[e];
                return p[e] < i[e] && !t.escapeWithReference && (o = X(p[e], i[e])), se({}, e, o);
              },
              secondary(e) {
                let o = e === 'right' ? 'left' : 'top',
                  n = p[o];
                return p[e] > i[e] && !t.escapeWithReference && (n = V(p[o], i[e] - (e === 'right' ? p.width : p.height))), se({}, o, n);
              },
            };
          return n.forEach((e) => {
            const t = ['left', 'top'].indexOf(e) === -1 ? 'secondary' : 'primary';
            p = de({}, p, s[t](e));
          }), e.offsets.popper = p, e;
        },
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent',
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn(e) {
          let t = e.offsets,
            o = t.popper,
            i = t.reference,
            n = e.placement.split('-')[0],
            r = _,
            p = ['top', 'bottom'].indexOf(n) !== -1,
            s = p ? 'right' : 'bottom',
            d = p ? 'left' : 'top',
            a = p ? 'width' : 'height';
          return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e;
        },
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn(e, o) {
          if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
          let i = o.element;
          if (typeof i === 'string') {
            if (i = e.instance.popper.querySelector(i), !i) return e;
          } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
          let n = e.placement.split('-')[0],
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = ['left', 'right'].indexOf(n) !== -1,
            a = d ? 'height' : 'width',
            l = d ? 'Top' : 'Left',
            f = l.toLowerCase(),
            m = d ? 'left' : 'top',
            c = d ? 'bottom' : 'right',
            g = O(i)[a];
          s[c] - g < p[f] && (e.offsets.popper[f] -= p[f] - (s[c] - g)), s[f] + g > p[c] && (e.offsets.popper[f] += s[f] + g - p[c]);
          let u = s[f] + s[a] / 2 - g / 2,
            b = t(e.instance.popper, `margin${l}`).replace('px', ''),
            y = u - h(e.offsets.popper)[f] - b;
          return y = X(V(p[a] - g, y), 0), e.arrowElement = i, e.offsets.arrow = {}, e.offsets.arrow[f] = Math.round(y), e.offsets.arrow[m] = '', e;
        },
        element: '[x-arrow]',
      },
      flip: {
        order: 600,
        enabled: !0,
        fn(e, t) {
          if (W(e.instance.modifiers, 'inner')) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          let o = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
            i = e.placement.split('-')[0],
            n = L(i),
            r = e.placement.split('-')[1] || '',
            p = [];
          switch (t.behavior) {
            case fe.FLIP:
              p = [i, n];
              break;
            case fe.CLOCKWISE:
              p = K(i);
              break;
            case fe.COUNTERCLOCKWISE:
              p = K(i, !0);
              break;
            default:
              p = t.behavior;
          }
          return p.forEach((s, d) => {
            if (i !== s || p.length === d + 1) return e;
            i = e.placement.split('-')[0], n = L(i);
            let a = e.offsets.popper,
              l = e.offsets.reference,
              f = _,
              m = i === 'left' && f(a.right) > f(l.left) || i === 'right' && f(a.left) < f(l.right) || i === 'top' && f(a.bottom) > f(l.top) || i === 'bottom' && f(a.top) < f(l.bottom),
              c = f(a.left) < f(o.left),
              h = f(a.right) > f(o.right),
              g = f(a.top) < f(o.top),
              u = f(a.bottom) > f(o.bottom),
              b = i === 'left' && c || i === 'right' && h || i === 'top' && g || i === 'bottom' && u,
              y = ['top', 'bottom'].indexOf(i) !== -1,
              w = !!t.flipVariations && (y && r === 'start' && c || y && r === 'end' && h || !y && r === 'start' && g || !y && r === 'end' && u);
            (m || b || w) && (e.flipped = !0, (m || b) && (i = p[d + 1]), w && (r = j(r)), e.placement = i + (r ? `-${r}` : ''), e.offsets.popper = de({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = N(e.instance.modifiers, e, 'flip'));
          }), e;
        },
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport',
      },
      inner: {
        order: 700,
        enabled: !1,
        fn(e) {
          let t = e.placement,
            o = t.split('-')[0],
            i = e.offsets,
            n = i.popper,
            r = i.reference,
            p = ['left', 'right'].indexOf(o) !== -1,
            s = ['top', 'left'].indexOf(o) === -1;
          return n[p ? 'left' : 'top'] = r[o] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = L(t), e.offsets.popper = h(n), e;
        },
      },
      hide: {
        order: 800,
        enabled: !0,
        fn(e) {
          if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
          let t = e.offsets.reference,
            o = T(e.instance.modifiers, (e) => e.name === 'preventOverflow').boundaries;
          if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
          }
          return e;
        },
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn(e, t) {
          let o = t.x,
            i = t.y,
            n = e.offsets.popper,
            p = T(e.instance.modifiers, (e) => e.name === 'applyStyle').gpuAcceleration;
          void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          let s, 
            d, 
            a = void 0 === p ? t.gpuAcceleration : p,
            l = r(e.instance.popper),
            f = g(l),
            m = {
              position: n.position,
            },
            c = {
              left: _(n.left),
              top: _(n.top),
              bottom: _(n.bottom),
              right: _(n.right),
            },
            h = o === 'bottom' ? 'top' : 'bottom',
            u = i === 'right' ? 'left' : 'right',
            b = B('transform');
          if (d = h == 'bottom' ? -f.height + c.bottom : c.top, s = u == 'right' ? -f.width + c.right : c.left, a && b) m[b] = `translate3d(${s}px, ${d}px, 0)`, m[h] = 0, m[u] = 0, m.willChange = 'transform';
          else {
            let y = h == 'bottom' ? -1 : 1,
              w = u == 'right' ? -1 : 1;
            m[h] = d * y, m[u] = s * w, m.willChange = `${h}, ${u}`;
          }
          const E = {
            'x-placement': e.placement,
          };
          return e.attributes = de({}, E, e.attributes), e.styles = de({}, m, e.styles), e.arrowStyles = de({}, e.offsets.arrow, e.arrowStyles), e;
        },
        gpuAcceleration: !0,
        x: 'bottom',
        y: 'right',
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn(e) {
          return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && U(e.arrowElement, e.arrowStyles), e;
        },
        onLoad(e, t, o, i, n) {
          let r = x(n, t, e),
            p = v(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
          return t.setAttribute('x-placement', p), U(t, {
            position: 'absolute',
          }), o;
        },
        gpuAcceleration: void 0,
      },
    },
  }, me;
}));
