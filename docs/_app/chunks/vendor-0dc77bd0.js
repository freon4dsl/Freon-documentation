function d() {}
const rt = (t) => t;
function z(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function G(t) {
  return t();
}
function B() {
  return Object.create(null);
}
function g(t) {
  t.forEach(G);
}
function J(t) {
  return typeof t == "function";
}
function it(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && typeof t == "object") || typeof t == "function";
}
let $;
function St(t, e) {
  return $ || ($ = document.createElement("a")), ($.href = e), t === $.href;
}
function ot(t) {
  return Object.keys(t).length === 0;
}
function st(t, ...e) {
  if (t == null) return d;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Ct(t, e, n) {
  t.$$.on_destroy.push(st(e, n));
}
function Nt(t, e, n, r) {
  if (t) {
    const i = K(t, e, n, r);
    return t[0](i);
  }
}
function K(t, e, n, r) {
  return t[1] && r ? z(n.ctx.slice(), t[1](r(e))) : n.ctx;
}
function vt(t, e, n, r) {
  if (t[2] && r) {
    const i = t[2](r(n));
    if (e.dirty === void 0) return i;
    if (typeof i == "object") {
      const c = [],
        o = Math.max(e.dirty.length, i.length);
      for (let u = 0; u < o; u += 1) c[u] = e.dirty[u] | i[u];
      return c;
    }
    return e.dirty | i;
  }
  return e.dirty;
}
function zt(t, e, n, r, i, c) {
  if (i) {
    const o = K(e, n, r, c);
    t.p(o, i);
  }
}
function qt(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32;
    for (let r = 0; r < n; r++) e[r] = -1;
    return e;
  }
  return -1;
}
function Tt(t) {
  return t == null ? "" : t;
}
function Ot(t, e, n) {
  return t.set(n), e;
}
function Mt(t) {
  return t && J(t.destroy) ? t.destroy : d;
}
const Q = typeof window != "undefined";
let ct = Q ? () => window.performance.now() : () => Date.now(),
  R = Q ? (t) => requestAnimationFrame(t) : d;
const p = new Set();
function U(t) {
  p.forEach((e) => {
    e.c(t) || (p.delete(e), e.f());
  }),
    p.size !== 0 && R(U);
}
function ut(t) {
  let e;
  return (
    p.size === 0 && R(U),
    {
      promise: new Promise((n) => {
        p.add((e = { c: t, f: n }));
      }),
      abort() {
        p.delete(e);
      },
    }
  );
}
let C = !1;
function lt() {
  C = !0;
}
function ft() {
  C = !1;
}
function at(t, e, n, r) {
  for (; t < e; ) {
    const i = t + ((e - t) >> 1);
    n(i) <= r ? (t = i + 1) : (e = i);
  }
  return t;
}
function dt(t) {
  if (t.hydrate_init) return;
  t.hydrate_init = !0;
  let e = t.childNodes;
  if (t.nodeName === "HEAD") {
    const s = [];
    for (let l = 0; l < e.length; l++) {
      const a = e[l];
      a.claim_order !== void 0 && s.push(a);
    }
    e = s;
  }
  const n = new Int32Array(e.length + 1),
    r = new Int32Array(e.length);
  n[0] = -1;
  let i = 0;
  for (let s = 0; s < e.length; s++) {
    const l = e[s].claim_order,
      a =
        (i > 0 && e[n[i]].claim_order <= l
          ? i + 1
          : at(1, i, (h) => e[n[h]].claim_order, l)) - 1;
    r[s] = n[a] + 1;
    const f = a + 1;
    (n[f] = s), (i = Math.max(f, i));
  }
  const c = [],
    o = [];
  let u = e.length - 1;
  for (let s = n[i] + 1; s != 0; s = r[s - 1]) {
    for (c.push(e[s - 1]); u >= s; u--) o.push(e[u]);
    u--;
  }
  for (; u >= 0; u--) o.push(e[u]);
  c.reverse(), o.sort((s, l) => s.claim_order - l.claim_order);
  for (let s = 0, l = 0; s < o.length; s++) {
    for (; l < c.length && o[s].claim_order >= c[l].claim_order; ) l++;
    const a = l < c.length ? c[l] : null;
    t.insertBefore(o[s], a);
  }
}
function _t(t, e) {
  t.appendChild(e);
}
function ht(t, e) {
  if (C) {
    for (
      dt(t),
        (t.actual_end_child === void 0 ||
          (t.actual_end_child !== null &&
            t.actual_end_child.parentElement !== t)) &&
          (t.actual_end_child = t.firstChild);
      t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

    )
      t.actual_end_child = t.actual_end_child.nextSibling;
    e !== t.actual_end_child
      ? (e.claim_order !== void 0 || e.parentNode !== t) &&
        t.insertBefore(e, t.actual_end_child)
      : (t.actual_end_child = e.nextSibling);
  } else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function Dt(t, e, n) {
  C && !n
    ? ht(t, e)
    : (e.parentNode !== t || e.nextSibling != n) &&
      t.insertBefore(e, n || null);
}
function V(t) {
  t.parentNode.removeChild(t);
}
function Pt(t, e) {
  for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function X(t) {
  return document.createElement(t);
}
function mt(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function D(t) {
  return document.createTextNode(t);
}
function Lt() {
  return D(" ");
}
function Wt() {
  return D("");
}
function F(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function Bt(t, e, n) {
  n == null
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function pt(t) {
  return Array.from(t.childNodes);
}
function yt(t) {
  t.claim_info === void 0 &&
    (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function Y(t, e, n, r, i = !1) {
  yt(t);
  const c = (() => {
    for (let o = t.claim_info.last_index; o < t.length; o++) {
      const u = t[o];
      if (e(u)) {
        const s = n(u);
        return (
          s === void 0 ? t.splice(o, 1) : (t[o] = s),
          i || (t.claim_info.last_index = o),
          u
        );
      }
    }
    for (let o = t.claim_info.last_index - 1; o >= 0; o--) {
      const u = t[o];
      if (e(u)) {
        const s = n(u);
        return (
          s === void 0 ? t.splice(o, 1) : (t[o] = s),
          i
            ? s === void 0 && t.claim_info.last_index--
            : (t.claim_info.last_index = o),
          u
        );
      }
    }
    return r();
  })();
  return (
    (c.claim_order = t.claim_info.total_claimed),
    (t.claim_info.total_claimed += 1),
    c
  );
}
function Z(t, e, n, r) {
  return Y(
    t,
    (i) => i.nodeName === e,
    (i) => {
      const c = [];
      for (let o = 0; o < i.attributes.length; o++) {
        const u = i.attributes[o];
        n[u.name] || c.push(u.name);
      }
      c.forEach((o) => i.removeAttribute(o));
    },
    () => r(e)
  );
}
function Ft(t, e, n) {
  return Z(t, e, n, X);
}
function It(t, e, n) {
  return Z(t, e, n, mt);
}
function bt(t, e) {
  return Y(
    t,
    (n) => n.nodeType === 3,
    (n) => {
      const r = "" + e;
      if (n.data.startsWith(r)) {
        if (n.data.length !== r.length) return n.splitText(r.length);
      } else n.data = r;
    },
    () => D(e),
    !0
  );
}
function Ht(t) {
  return bt(t, " ");
}
function Gt(t, e) {
  (e = "" + e), t.wholeText !== e && (t.data = e);
}
function Jt(t, e, n, r) {
  t.style.setProperty(e, n, r ? "important" : "");
}
let E;
function gt() {
  if (E === void 0) {
    E = !1;
    try {
      typeof window != "undefined" && window.parent && window.parent.document;
    } catch {
      E = !0;
    }
  }
  return E;
}
function Kt(t, e) {
  getComputedStyle(t).position === "static" && (t.style.position = "relative");
  const r = X("iframe");
  r.setAttribute(
    "style",
    "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"
  ),
    r.setAttribute("aria-hidden", "true"),
    (r.tabIndex = -1);
  const i = gt();
  let c;
  return (
    i
      ? ((r.src =
          "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>"),
        (c = F(window, "message", (o) => {
          o.source === r.contentWindow && e();
        })))
      : ((r.src = "about:blank"),
        (r.onload = () => {
          c = F(r.contentWindow, "resize", e);
        })),
    _t(t, r),
    () => {
      (i || (c && r.contentWindow)) && c(), V(r);
    }
  );
}
function Qt(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function wt(t, e, n = !1) {
  const r = document.createEvent("CustomEvent");
  return r.initCustomEvent(t, n, !1, e), r;
}
function Rt(t, e = document.body) {
  return Array.from(e.querySelectorAll(t));
}
let j;
function S(t) {
  j = t;
}
function w() {
  if (!j) throw new Error("Function called outside component initialization");
  return j;
}
function Ut(t) {
  w().$$.on_mount.push(t);
}
function Vt(t) {
  w().$$.after_update.push(t);
}
function Xt() {
  const t = w();
  return (e, n) => {
    const r = t.$$.callbacks[e];
    if (r) {
      const i = wt(e, n);
      r.slice().forEach((c) => {
        c.call(t, i);
      });
    }
  };
}
function Yt(t, e) {
  w().$$.context.set(t, e);
}
function Zt(t) {
  return w().$$.context.get(t);
}
function te(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((r) => r.call(this, e));
}
const b = [],
  I = [],
  k = [],
  q = [],
  tt = Promise.resolve();
let T = !1;
function et() {
  T || ((T = !0), tt.then(nt));
}
function ee() {
  return et(), tt;
}
function O(t) {
  k.push(t);
}
function ne(t) {
  q.push(t);
}
let N = !1;
const v = new Set();
function nt() {
  if (!N) {
    N = !0;
    do {
      for (let t = 0; t < b.length; t += 1) {
        const e = b[t];
        S(e), xt(e.$$);
      }
      for (S(null), b.length = 0; I.length; ) I.pop()();
      for (let t = 0; t < k.length; t += 1) {
        const e = k[t];
        v.has(e) || (v.add(e), e());
      }
      k.length = 0;
    } while (b.length);
    for (; q.length; ) q.pop()();
    (T = !1), (N = !1), v.clear();
  }
}
function xt(t) {
  if (t.fragment !== null) {
    t.update(), g(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach(O);
  }
}
const A = new Set();
let _;
function re() {
  _ = { r: 0, c: [], p: _ };
}
function ie() {
  _.r || g(_.c), (_ = _.p);
}
function $t(t, e) {
  t && t.i && (A.delete(t), t.i(e));
}
function oe(t, e, n, r) {
  if (t && t.o) {
    if (A.has(t)) return;
    A.add(t),
      _.c.push(() => {
        A.delete(t), r && (n && t.d(1), r());
      }),
      t.o(e);
  }
}
const se =
  typeof window != "undefined"
    ? window
    : typeof globalThis != "undefined"
    ? globalThis
    : global;
function ce(t, e) {
  const n = {},
    r = {},
    i = { $$scope: 1 };
  let c = t.length;
  for (; c--; ) {
    const o = t[c],
      u = e[c];
    if (u) {
      for (const s in o) s in u || (r[s] = 1);
      for (const s in u) i[s] || ((n[s] = u[s]), (i[s] = 1));
      t[c] = u;
    } else for (const s in o) i[s] = 1;
  }
  for (const o in r) o in n || (n[o] = void 0);
  return n;
}
function ue(t) {
  return typeof t == "object" && t !== null ? t : {};
}
function le(t, e, n) {
  const r = t.$$.props[e];
  r !== void 0 && ((t.$$.bound[r] = n), n(t.$$.ctx[r]));
}
function fe(t) {
  t && t.c();
}
function ae(t, e) {
  t && t.l(e);
}
function Et(t, e, n, r) {
  const { fragment: i, on_mount: c, on_destroy: o, after_update: u } = t.$$;
  i && i.m(e, n),
    r ||
      O(() => {
        const s = c.map(G).filter(J);
        o ? o.push(...s) : g(s), (t.$$.on_mount = []);
      }),
    u.forEach(O);
}
function kt(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (g(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function At(t, e) {
  t.$$.dirty[0] === -1 && (b.push(t), et(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function de(t, e, n, r, i, c, o, u = [-1]) {
  const s = j;
  S(t);
  const l = (t.$$ = {
    fragment: null,
    ctx: null,
    props: c,
    update: d,
    not_equal: i,
    bound: B(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (s ? s.$$.context : [])),
    callbacks: B(),
    dirty: u,
    skip_bound: !1,
    root: e.target || s.$$.root,
  });
  o && o(l.root);
  let a = !1;
  if (
    ((l.ctx = n
      ? n(t, e.props || {}, (f, h, ...x) => {
          const y = x.length ? x[0] : h;
          return (
            l.ctx &&
              i(l.ctx[f], (l.ctx[f] = y)) &&
              (!l.skip_bound && l.bound[f] && l.bound[f](y), a && At(t, f)),
            h
          );
        })
      : []),
    l.update(),
    (a = !0),
    g(l.before_update),
    (l.fragment = r ? r(l.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      lt();
      const f = pt(e.target);
      l.fragment && l.fragment.l(f), f.forEach(V);
    } else l.fragment && l.fragment.c();
    e.intro && $t(t.$$.fragment),
      Et(t, e.target, e.anchor, e.customElement),
      ft(),
      nt();
  }
  S(s);
}
class _e {
  $destroy() {
    kt(this, 1), (this.$destroy = d);
  }
  $on(e, n) {
    const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      r.push(n),
      () => {
        const i = r.indexOf(n);
        i !== -1 && r.splice(i, 1);
      }
    );
  }
  $set(e) {
    this.$$set &&
      !ot(e) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
const m = [];
function jt(t, e = d) {
  let n;
  const r = new Set();
  function i(u) {
    if (it(t, u) && ((t = u), n)) {
      const s = !m.length;
      for (const l of r) l[1](), m.push(l, t);
      if (s) {
        for (let l = 0; l < m.length; l += 2) m[l][0](m[l + 1]);
        m.length = 0;
      }
    }
  }
  function c(u) {
    i(u(t));
  }
  function o(u, s = d) {
    const l = [u, s];
    return (
      r.add(l),
      r.size === 1 && (n = e(i) || d),
      u(t),
      () => {
        r.delete(l), r.size === 0 && (n(), (n = null));
      }
    );
  }
  return { set: i, update: c, subscribe: o };
}
function he(t) {
  return --t * t * ((1.70158 + 1) * t + 1.70158) + 1;
}
function H(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function M(t, e) {
  if (t === e || t !== t) return () => t;
  const n = typeof t;
  if (n !== typeof e || Array.isArray(t) !== Array.isArray(e))
    throw new Error("Cannot interpolate values of different type");
  if (Array.isArray(t)) {
    const r = e.map((i, c) => M(t[c], i));
    return (i) => r.map((c) => c(i));
  }
  if (n === "object") {
    if (!t || !e) throw new Error("Object cannot be null");
    if (H(t) && H(e)) {
      (t = t.getTime()), (e = e.getTime());
      const c = e - t;
      return (o) => new Date(t + o * c);
    }
    const r = Object.keys(e),
      i = {};
    return (
      r.forEach((c) => {
        i[c] = M(t[c], e[c]);
      }),
      (c) => {
        const o = {};
        return (
          r.forEach((u) => {
            o[u] = i[u](c);
          }),
          o
        );
      }
    );
  }
  if (n === "number") {
    const r = e - t;
    return (i) => t + i * r;
  }
  throw new Error(`Cannot interpolate ${n} values`);
}
function me(t, e = {}) {
  const n = jt(t);
  let r,
    i = t;
  function c(o, u) {
    if (t == null) return n.set((t = o)), Promise.resolve();
    i = o;
    let s = r,
      l = !1,
      {
        delay: a = 0,
        duration: f = 400,
        easing: h = rt,
        interpolate: x = M,
      } = z(z({}, e), u);
    if (f === 0)
      return s && (s.abort(), (s = null)), n.set((t = i)), Promise.resolve();
    const y = ct() + a;
    let P;
    return (
      (r = ut((L) => {
        if (L < y) return !0;
        l || ((P = x(t, o)), typeof f == "function" && (f = f(t, o)), (l = !0)),
          s && (s.abort(), (s = null));
        const W = L - y;
        return W > f ? (n.set((t = o)), !1) : (n.set((t = P(h(W / f)))), !0);
      })),
      r.promise
    );
  }
  return { set: c, update: (o, u) => c(o(i, t), u), subscribe: n.subscribe };
}
export {
  he as $,
  ue as A,
  kt as B,
  z as C,
  jt as D,
  ee as E,
  Zt as F,
  Qt as G,
  ht as H,
  F as I,
  d as J,
  Ct as K,
  Ot as L,
  mt as M,
  It as N,
  Pt as O,
  g as P,
  Nt as Q,
  Mt as R,
  _e as S,
  O as T,
  Kt as U,
  zt as V,
  qt as W,
  vt as X,
  Xt as Y,
  I as Z,
  me as _,
  pt as a,
  Tt as a0,
  te as a1,
  St as a2,
  se as a3,
  le as a4,
  ne as a5,
  Rt as a6,
  Bt as b,
  Ft as c,
  V as d,
  X as e,
  Jt as f,
  Dt as g,
  bt as h,
  de as i,
  Gt as j,
  Lt as k,
  Wt as l,
  Ht as m,
  re as n,
  oe as o,
  ie as p,
  $t as q,
  Yt as r,
  it as s,
  D as t,
  Vt as u,
  Ut as v,
  fe as w,
  ae as x,
  Et as y,
  ce as z,
};
