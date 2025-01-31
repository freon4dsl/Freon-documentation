import{s as ue,A as _e,a as y,e as d,f as k,b as _,m as B,i as h,B as ve,g as p,v as fe,x as te,w as be,t as Y,o as Z,d as P,h as v,j as $,C as we,D as pe,E as j,q as me,p as ge}from"../chunks/scheduler.CIEH-92L.js";import{S as he,i as de,e as $e,c as O,a as V,m as x,t as G,b as J,d as z}from"../chunks/index.HLF2pGCU.js";import{e as R}from"../chunks/each.BLebZWAa.js";import{w as ye}from"../chunks/index.bxqR-5-s.js";import{P as ne,S as ke,c as Le,B as Te}from"../chunks/index.D1zh88jY.js";const Q=ye([]);function Ce(r){let e;return{c(){e=Y("Welcome, Language Engineer!")},l(n){e=Z(n,"Welcome, Language Engineer!")},m(n,l){h(n,e,l)},d(n){n&&p(e)}}}function Ee(r){let e,n,l,a,c,u,i=`Freon is a Language Workbench, a tool for creating mini-languages, which are also known as <a href="https://en.wikipedia.org/wiki/Domain-specific*language" target="_blank">Domain Specific Languages (DSLs)</a>. Freon generates an integrated set of editor, scoper, typer, and validator for your mini-language from a small set of definitions.
	Together we call this the work environment for your language.`,o,m,T=`The core of Freon is a <strong>TypeScript/JavaScript</strong> framework for building web-based,
	<a href="/Background/Projectional_Editing">projectional</a>
	editors. Editing expressions in a projectional editor is a well-known challenge. What makes the Freon framework unique is the fact that it
	has built-in support for expressions, so you can easily make a projectional editor that allows for a natural manner of editing.`,w,C,E=`We assume that people who want to use Freon know at least the basics of making mini-languages. For instance, the terms metamodel, abstract
	syntax tree, scope, concrete syntax, parsing, etc., should be familiar. If you are not, please first refer to other sources, for instance
	the book <a href="https://www.manning.com/books/building-user-friendly-dsls" target="_blank">‘Building User-Friendly DSLs’</a> written by
	Meinte Boersma. If you just need to refresh your knowledge, refer to <a href="/Documentation/Terminology">Freon Terminology</a>.
	Furthermore, a little knowledge of UML will come in handy, but this is not a true requirement.`,M,q,W=`To be clear about the distinction, on this site, when we address the Freon user, we call him/her a <strong>language engineer</strong>. The
	people that will be using the generated work environment are simply called <strong>users</strong>.`,S,H,U=`So welcome, language engineer, to the world of Freon. This documentation is meant for you. It explains how Freon can help you in creating
	a language, and building a work environment for it. If you have questions that are not answered in this documentation, please get in
	contact with the Freon team, for instance via email at <em>info AT freon4dsl.dev</em>.`,A,D,N="<strong>Have fun!</strong>",L,g,F;e=new ne({props:{prevLink:le,nextLink:ie}});function b(t){r[1](t)}let f={tag:"h1",id:"welcome-language-engineer-1",$$slots:{default:[Ce]},$$scope:{ctx:r}};return r[0][0]!==void 0&&(f.intersecting=r[0][0]),l=new ke({props:f}),_e.push(()=>$e(l,"intersecting",b)),g=new ne({props:{prevLink:le,nextLink:ie}}),{c(){O(e.$$.fragment),n=y(),O(l.$$.fragment),c=y(),u=d("p"),u.innerHTML=i,o=y(),m=d("p"),m.innerHTML=T,w=y(),C=d("p"),C.innerHTML=E,M=y(),q=d("p"),q.innerHTML=W,S=y(),H=d("p"),H.innerHTML=U,A=y(),D=d("p"),D.innerHTML=N,L=y(),O(g.$$.fragment)},l(t){V(e.$$.fragment,t),n=k(t),V(l.$$.fragment,t),c=k(t),u=_(t,"P",{"data-svelte-h":!0}),B(u)!=="svelte-1oeq9ll"&&(u.innerHTML=i),o=k(t),m=_(t,"P",{"data-svelte-h":!0}),B(m)!=="svelte-vyp9my"&&(m.innerHTML=T),w=k(t),C=_(t,"P",{"data-svelte-h":!0}),B(C)!=="svelte-gao06r"&&(C.innerHTML=E),M=k(t),q=_(t,"P",{"data-svelte-h":!0}),B(q)!=="svelte-709mcc"&&(q.innerHTML=W),S=k(t),H=_(t,"P",{"data-svelte-h":!0}),B(H)!=="svelte-15lf58j"&&(H.innerHTML=U),A=k(t),D=_(t,"P",{"data-svelte-h":!0}),B(D)!=="svelte-c233gb"&&(D.innerHTML=N),L=k(t),V(g.$$.fragment,t)},m(t,s){x(e,t,s),h(t,n,s),x(l,t,s),h(t,c,s),h(t,u,s),h(t,o,s),h(t,m,s),h(t,w,s),h(t,C,s),h(t,M,s),h(t,q,s),h(t,S,s),h(t,H,s),h(t,A,s),h(t,D,s),h(t,L,s),x(g,t,s),F=!0},p(t,[s]){const I={};s&8&&(I.$$scope={dirty:s,ctx:t}),!a&&s&1&&(a=!0,I.intersecting=t[0][0],ve(()=>a=!1)),l.$set(I)},i(t){F||(G(e.$$.fragment,t),G(l.$$.fragment,t),G(g.$$.fragment,t),F=!0)},o(t){J(e.$$.fragment,t),J(l.$$.fragment,t),J(g.$$.fragment,t),F=!1},d(t){t&&(p(n),p(c),p(u),p(o),p(m),p(w),p(C),p(M),p(q),p(S),p(H),p(A),p(D),p(L)),z(e,t),z(l,t),z(g,t)}}}let le="",ie="/Documentation/Overview/Getting_Started";function Me(r,e,n){let l;fe(r,Q,u=>n(2,l=u)),te(Q,l=[{title:"Welcome, Language Engineer!",visible:!1,ref:"#welcome-language-engineer-1"}],l);let a=[];be(()=>{document.querySelectorAll("pre").forEach(i=>{const o=document.createElement("div");o.className="copy-prompt";const m=document.createElement("p");m.innerHTML="👆 Click to copy",m.className="copy-prompt-p";const T=document.createElement("img");T.src="/icons/copy-icon.svg",T.className="copy-prompt-img",o.appendChild(T),o.appendChild(m),i.appendChild(o),i.querySelector(".copy-prompt > p").addEventListener("click",w=>{Le(i.querySelector("code").textContent),i.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{i.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function c(u){r.$$.not_equal(a[0],u)&&(a[0]=u,n(0,a))}return r.$$.update=()=>{r.$$.dirty&1&&te(Q,l[0].visible=a[0],l)},[a,c]}class Se extends he{constructor(e){super(),de(this,e,Me,Ee,ue,{})}}function ae(r,e,n){const l=r.slice();return l[6]=e[n],l[8]=n,l}function re(r,e,n){const l=r.slice();return l[6]=e[n],l[8]=n,l}function He(r){let e,n;return{c(){e=d("img"),this.h()},l(l){e=_(l,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){v(e,"class","page-toc-small-img"),ge(e.src,n="/icons/down-arrow.png")||v(e,"src",n),v(e,"alt","arrow down")},m(l,a){h(l,e,a)},d(l){l&&p(e)}}}function Fe(r){let e,n;return{c(){e=d("img"),this.h()},l(l){e=_(l,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){v(e,"class","page-toc-small-img"),ge(e.src,n="/icons/upload.png")||v(e,"src",n),v(e,"alt","arrow up")},m(l,a){h(l,e,a)},d(l){l&&p(e)}}}function oe(r){let e,n,l=R(r[0]),a=[];for(let c=0;c<l.length;c+=1)a[c]=se(re(r,l,c));return{c(){e=d("div"),n=d("ul");for(let c=0;c<a.length;c+=1)a[c].c();this.h()},l(c){e=_(c,"DIV",{class:!0});var u=P(e);n=_(u,"UL",{class:!0});var i=P(n);for(let o=0;o<a.length;o+=1)a[o].l(i);i.forEach(p),u.forEach(p),this.h()},h(){v(n,"class","page-ul"),v(e,"class","toc-details")},m(c,u){h(c,e,u),$(e,n);for(let i=0;i<a.length;i+=1)a[i]&&a[i].m(n,null)},p(c,u){if(u&5){l=R(c[0]);let i;for(i=0;i<l.length;i+=1){const o=re(c,l,i);a[i]?a[i].p(o,u):(a[i]=se(o),a[i].c(),a[i].m(n,null))}for(;i<a.length;i+=1)a[i].d(1);a.length=l.length}},d(c){c&&p(e),pe(a,c)}}}function se(r){let e,n,l=r[6].title+"",a,c,u;return{c(){e=d("li"),n=d("a"),a=Y(l),u=y(),this.h()},l(i){e=_(i,"LI",{class:!0});var o=P(e);n=_(o,"A",{href:!0});var m=P(n);a=Z(m,l),m.forEach(p),u=k(o),o.forEach(p),this.h()},h(){v(n,"href",c=r[6].ref),j(n,"page-visible",r[8]===r[2]),j(n,"page-nonvisible",r[8]!==r[2]),v(e,"class","page-toc-text")},m(i,o){h(i,e,o),$(e,n),$(n,a),$(e,u)},p(i,o){o&1&&l!==(l=i[6].title+"")&&me(a,l),o&1&&c!==(c=i[6].ref)&&v(n,"href",c),o&4&&j(n,"page-visible",i[8]===i[2]),o&4&&j(n,"page-nonvisible",i[8]!==i[2])},d(i){i&&p(e)}}}function ce(r){let e,n,l=r[6].title+"",a,c,u;return{c(){e=d("li"),n=d("a"),a=Y(l),u=y(),this.h()},l(i){e=_(i,"LI",{class:!0});var o=P(e);n=_(o,"A",{href:!0});var m=P(n);a=Z(m,l),m.forEach(p),u=k(o),o.forEach(p),this.h()},h(){v(n,"href",c=r[6].ref),j(n,"page-visible",r[8]===r[2]),j(n,"page-nonvisible",r[8]!==r[2]),v(e,"class","page-toc-text")},m(i,o){h(i,e,o),$(e,n),$(n,a),$(e,u)},p(i,o){o&1&&l!==(l=i[6].title+"")&&me(a,l),o&1&&c!==(c=i[6].ref)&&v(n,"href",c),o&4&&j(n,"page-visible",i[8]===i[2]),o&4&&j(n,"page-nonvisible",i[8]!==i[2])},d(i){i&&p(e)}}}function Pe(r){let e,n,l,a="On this page ...",c,u,i,o,m,T,w,C,E,M,q="On this page",W,S,H,U,A;function D(f,t){return f[1]?Fe:He}let N=D(r),L=N(r),g=r[1]&&oe(r);m=new Te({}),w=new Se({});let F=R(r[0]),b=[];for(let f=0;f<F.length;f+=1)b[f]=ce(ae(r,F,f));return{c(){e=d("div"),n=d("div"),l=d("p"),l.textContent=a,c=y(),u=d("button"),L.c(),i=y(),g&&g.c(),o=y(),O(m.$$.fragment),T=y(),O(w.$$.fragment),C=y(),E=d("nav"),M=d("h3"),M.textContent=q,W=y(),S=d("ul");for(let f=0;f<b.length;f+=1)b[f].c();this.h()},l(f){e=_(f,"DIV",{class:!0});var t=P(e);n=_(t,"DIV",{class:!0});var s=P(n);l=_(s,"P",{class:!0,"data-svelte-h":!0}),B(l)!=="svelte-1929lhs"&&(l.textContent=a),c=k(s),u=_(s,"BUTTON",{class:!0});var I=P(u);L.l(I),I.forEach(p),s.forEach(p),i=k(t),g&&g.l(t),o=k(t),V(m.$$.fragment,t),T=k(t),V(w.$$.fragment,t),t.forEach(p),C=k(f),E=_(f,"NAV",{class:!0});var K=P(E);M=_(K,"H3",{class:!0,"data-svelte-h":!0}),B(M)!=="svelte-1hgt7fi"&&(M.textContent=q),W=k(K),S=_(K,"UL",{class:!0});var ee=P(S);for(let X=0;X<b.length;X+=1)b[X].l(ee);ee.forEach(p),K.forEach(p),this.h()},h(){v(l,"class","page-toc-small-title"),v(u,"class","page-toc-small-expand-button"),v(n,"class","page-toc-small"),v(e,"class","page-main"),v(M,"class","page-toc-title"),v(S,"class","page-ul"),v(E,"class","page-toc")},m(f,t){h(f,e,t),$(e,n),$(n,l),$(n,c),$(n,u),L.m(u,null),$(e,i),g&&g.m(e,null),$(e,o),x(m,e,null),$(e,T),x(w,e,null),h(f,C,t),h(f,E,t),$(E,M),$(E,W),$(E,S);for(let s=0;s<b.length;s+=1)b[s]&&b[s].m(S,null);H=!0,U||(A=we(u,"click",r[4]),U=!0)},p(f,[t]){if(N!==(N=D(f))&&(L.d(1),L=N(f),L&&(L.c(),L.m(u,null))),f[1]?g?g.p(f,t):(g=oe(f),g.c(),g.m(e,o)):g&&(g.d(1),g=null),t&5){F=R(f[0]);let s;for(s=0;s<F.length;s+=1){const I=ae(f,F,s);b[s]?b[s].p(I,t):(b[s]=ce(I),b[s].c(),b[s].m(S,null))}for(;s<b.length;s+=1)b[s].d(1);b.length=F.length}},i(f){H||(G(m.$$.fragment,f),G(w.$$.fragment,f),H=!0)},o(f){J(m.$$.fragment,f),J(w.$$.fragment,f),H=!1},d(f){f&&(p(e),p(C),p(E)),L.d(),g&&g.d(),z(m),z(w),pe(b,f),U=!1,A()}}}function qe(r,e,n){let l,a;fe(r,Q,m=>n(0,a=m));let c=!1;function u(m){let T=l;for(let w=0;w<m.length;w++)if(m[w].visible)return w;return T}function i(){n(1,c=!c)}const o=()=>{i()};return r.$$.update=()=>{r.$$.dirty&1&&n(2,l=u(a))},[a,c,l,i,o]}class Ne extends he{constructor(e){super(),de(this,e,qe,Pe,ue,{})}}export{Ne as component};
//# sourceMappingURL=47.15CaCTpv.js.map
