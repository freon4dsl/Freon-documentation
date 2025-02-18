import{s as he,A as ne,a as y,e as v,H as ke,f as w,b as $,m as K,d as q,F as ye,g as m,h,i as _,B as se,r as ge,w as ee,v as we,t as X,o as Z,j as k,C as Ce,D as _e,E as j,q as de,p as ve}from"../chunks/scheduler.Cra-n4xf.js";import{S as $e,i as be,e as oe,c as F,a as O,m as V,t as U,b as G,d as R}from"../chunks/index.Bm95Nbrf.js";import{e as W}from"../chunks/stores.Bq7jfj-I.js";import{w as Ee}from"../chunks/index.B9cI0ado.js";import{P as ae,S as le,c as Se,B as Le}from"../chunks/index.DunYcI8q.js";const J=Ee([]);function Te(a){let e;return{c(){e=X("Customization of the Scoper")},l(t){e=Z(t,"Customization of the Scoper")},m(t,s){_(t,e,s)},d(t){t&&m(e)}}}function He(a){let e;return{c(){e=X("Adjusting the Environment")},l(t){e=Z(t,"Adjusting the Environment")},m(t,s){_(t,e,s)},d(t){t&&m(e)}}}function Pe(a){let e,t,s,l,c,u,o=`The scoper can not yet be customized <strong>per concept</strong>. Instead, you can replace the whole scoper by one create yourself. The
	new scoper needs to implement the following interface.`,r,f,E,g,S,L=`Furthermore, you need to tell Freon to use this new scoper instead of the generated one. You do this by changing the line that initializes
	the scoper in the class <code>YourLanguageNameEnvironment</code>. You can find it in <code>~/freon/environment/</code>. Obviously, you
	need to exchange <code>YourLanguageName</code> by the name of the language that you are creating.`,T,z,Y=`Suppose the class <code>YourScoper</code>
	holds the scoper with the improvements that you have made, then the entry in the environment class would be:`,H,P,D,Q=`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">EntityEnvironment</span> <span class="token keyword">implements</span> <span class="token class-name">PiEnvironment</span> <span class="token punctuation">&#123;</span>
    <span class="token operator">...</span>
    scoper<span class="token operator">:</span> PiScoper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">YourScoper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span></code>`,B,M,C;e=new ae({props:{prevLink:ie,nextLink:re}});function b(n){a[1](n)}let I={tag:"h1",id:"customization-of-the-scoper-1",$$slots:{default:[Te]},$$scope:{ctx:a}};a[0][0]!==void 0&&(I.intersecting=a[0][0]),s=new le({props:I}),ne.push(()=>oe(s,"intersecting",b));function d(n){a[2](n)}let p={tag:"h2",id:"adjusting-the-environment-2",$$slots:{default:[He]},$$scope:{ctx:a}};return a[0][1]!==void 0&&(p.intersecting=a[0][1]),f=new le({props:p}),ne.push(()=>oe(f,"intersecting",d)),M=new ae({props:{prevLink:ie,nextLink:re}}),{c(){F(e.$$.fragment),t=y(),F(s.$$.fragment),c=y(),u=v("p"),u.innerHTML=o,r=y(),F(f.$$.fragment),g=y(),S=v("p"),S.innerHTML=L,T=y(),z=v("p"),z.innerHTML=Y,H=y(),P=v("pre"),D=new ke(!1),B=y(),F(M.$$.fragment),this.h()},l(n){O(e.$$.fragment,n),t=w(n),O(s.$$.fragment,n),c=w(n),u=$(n,"P",{"data-svelte-h":!0}),K(u)!=="svelte-1gi2l0m"&&(u.innerHTML=o),r=w(n),O(f.$$.fragment,n),g=w(n),S=$(n,"P",{"data-svelte-h":!0}),K(S)!=="svelte-j7mis3"&&(S.innerHTML=L),T=w(n),z=$(n,"P",{"data-svelte-h":!0}),K(z)!=="svelte-14xgfc7"&&(z.innerHTML=Y),H=w(n),P=$(n,"PRE",{class:!0});var i=q(P);D=ye(i,!1),i.forEach(m),B=w(n),O(M.$$.fragment,n),this.h()},h(){D.a=null,h(P,"class","language-ts")},m(n,i){V(e,n,i),_(n,t,i),V(s,n,i),_(n,c,i),_(n,u,i),_(n,r,i),V(f,n,i),_(n,g,i),_(n,S,i),_(n,T,i),_(n,z,i),_(n,H,i),_(n,P,i),D.m(Q,P),_(n,B,i),V(M,n,i),C=!0},p(n,[i]){const A={};i&16&&(A.$$scope={dirty:i,ctx:n}),!l&&i&1&&(l=!0,A.intersecting=n[0][0],se(()=>l=!1)),s.$set(A);const N={};i&16&&(N.$$scope={dirty:i,ctx:n}),!E&&i&1&&(E=!0,N.intersecting=n[0][1],se(()=>E=!1)),f.$set(N)},i(n){C||(U(e.$$.fragment,n),U(s.$$.fragment,n),U(f.$$.fragment,n),U(M.$$.fragment,n),C=!0)},o(n){G(e.$$.fragment,n),G(s.$$.fragment,n),G(f.$$.fragment,n),G(M.$$.fragment,n),C=!1},d(n){n&&(m(t),m(c),m(u),m(r),m(g),m(S),m(T),m(z),m(H),m(P),m(B)),R(e,n),R(s,n),R(f,n),R(M,n)}}}let ie="/Documentation/Customizations/External_Components",re="/Documentation/Customizations/Typer_Customization";function Me(a,e,t){let s;ge(a,J,o=>t(3,s=o)),ee(J,s=[{title:"Customization of the Scoper",visible:!1,ref:"#customization-of-the-scoper-1"},{title:"Adjusting the Environment",visible:!1,ref:"#adjusting-the-environment-2"}],s);let l=[];we(()=>{document.querySelectorAll("pre").forEach(r=>{const f=document.createElement("div");f.className="copy-prompt";const E=document.createElement("p");E.innerHTML="👆 Click to copy",E.className="copy-prompt-p";const g=document.createElement("img");g.src="/icons/copy-icon.svg",g.className="copy-prompt-img",f.appendChild(g),f.appendChild(E),r.appendChild(f),r.querySelector(".copy-prompt > p").addEventListener("click",S=>{Se(r.querySelector("code").textContent),r.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{r.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function c(o){a.$$.not_equal(l[0],o)&&(l[0]=o,t(0,l))}function u(o){a.$$.not_equal(l[1],o)&&(l[1]=o,t(0,l))}return a.$$.update=()=>{a.$$.dirty&1&&ee(J,s[0].visible=l[0],s),a.$$.dirty&1&&ee(J,s[1].visible=l[1],s)},[l,c,u]}class qe extends $e{constructor(e){super(),be(this,e,Me,Pe,he,{})}}function ce(a,e,t){const s=a.slice();return s[6]=e[t],s[8]=t,s}function pe(a,e,t){const s=a.slice();return s[6]=e[t],s[8]=t,s}function ze(a){let e,t;return{c(){e=v("img"),this.h()},l(s){e=$(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){h(e,"class","page-toc-small-img"),ve(e.src,t="/icons/down-arrow.png")||h(e,"src",t),h(e,"alt","arrow down")},m(s,l){_(s,e,l)},d(s){s&&m(e)}}}function Ie(a){let e,t;return{c(){e=v("img"),this.h()},l(s){e=$(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){h(e,"class","page-toc-small-img"),ve(e.src,t="/icons/upload.png")||h(e,"src",t),h(e,"alt","arrow up")},m(s,l){_(s,e,l)},d(s){s&&m(e)}}}function ue(a){let e,t,s=W(a[0]),l=[];for(let c=0;c<s.length;c+=1)l[c]=fe(pe(a,s,c));return{c(){e=v("div"),t=v("ul");for(let c=0;c<l.length;c+=1)l[c].c();this.h()},l(c){e=$(c,"DIV",{class:!0});var u=q(e);t=$(u,"UL",{class:!0});var o=q(t);for(let r=0;r<l.length;r+=1)l[r].l(o);o.forEach(m),u.forEach(m),this.h()},h(){h(t,"class","page-ul"),h(e,"class","toc-details")},m(c,u){_(c,e,u),k(e,t);for(let o=0;o<l.length;o+=1)l[o]&&l[o].m(t,null)},p(c,u){if(u&5){s=W(c[0]);let o;for(o=0;o<s.length;o+=1){const r=pe(c,s,o);l[o]?l[o].p(r,u):(l[o]=fe(r),l[o].c(),l[o].m(t,null))}for(;o<l.length;o+=1)l[o].d(1);l.length=s.length}},d(c){c&&m(e),_e(l,c)}}}function fe(a){let e,t,s=a[6].title+"",l,c,u;return{c(){e=v("li"),t=v("a"),l=X(s),u=y(),this.h()},l(o){e=$(o,"LI",{class:!0});var r=q(e);t=$(r,"A",{href:!0});var f=q(t);l=Z(f,s),f.forEach(m),u=w(r),r.forEach(m),this.h()},h(){h(t,"href",c=a[6].ref),j(t,"page-visible",a[8]===a[2]),j(t,"page-nonvisible",a[8]!==a[2]),h(e,"class","page-toc-text")},m(o,r){_(o,e,r),k(e,t),k(t,l),k(e,u)},p(o,r){r&1&&s!==(s=o[6].title+"")&&de(l,s),r&1&&c!==(c=o[6].ref)&&h(t,"href",c),r&4&&j(t,"page-visible",o[8]===o[2]),r&4&&j(t,"page-nonvisible",o[8]!==o[2])},d(o){o&&m(e)}}}function me(a){let e,t,s=a[6].title+"",l,c,u;return{c(){e=v("li"),t=v("a"),l=X(s),u=y(),this.h()},l(o){e=$(o,"LI",{class:!0});var r=q(e);t=$(r,"A",{href:!0});var f=q(t);l=Z(f,s),f.forEach(m),u=w(r),r.forEach(m),this.h()},h(){h(t,"href",c=a[6].ref),j(t,"page-visible",a[8]===a[2]),j(t,"page-nonvisible",a[8]!==a[2]),h(e,"class","page-toc-text")},m(o,r){_(o,e,r),k(e,t),k(t,l),k(e,u)},p(o,r){r&1&&s!==(s=o[6].title+"")&&de(l,s),r&1&&c!==(c=o[6].ref)&&h(t,"href",c),r&4&&j(t,"page-visible",o[8]===o[2]),r&4&&j(t,"page-nonvisible",o[8]!==o[2])},d(o){o&&m(e)}}}function Ae(a){let e,t,s,l="On this page ...",c,u,o,r,f,E,g,S,L,T,z="On this page",Y,H,P,D,Q;function B(p,n){return p[1]?Ie:ze}let M=B(a),C=M(a),b=a[1]&&ue(a);f=new Le({}),g=new qe({});let I=W(a[0]),d=[];for(let p=0;p<I.length;p+=1)d[p]=me(ce(a,I,p));return{c(){e=v("div"),t=v("div"),s=v("p"),s.textContent=l,c=y(),u=v("button"),C.c(),o=y(),b&&b.c(),r=y(),F(f.$$.fragment),E=y(),F(g.$$.fragment),S=y(),L=v("nav"),T=v("h3"),T.textContent=z,Y=y(),H=v("ul");for(let p=0;p<d.length;p+=1)d[p].c();this.h()},l(p){e=$(p,"DIV",{class:!0});var n=q(e);t=$(n,"DIV",{class:!0});var i=q(t);s=$(i,"P",{class:!0,"data-svelte-h":!0}),K(s)!=="svelte-1929lhs"&&(s.textContent=l),c=w(i),u=$(i,"BUTTON",{class:!0});var A=q(u);C.l(A),A.forEach(m),i.forEach(m),o=w(n),b&&b.l(n),r=w(n),O(f.$$.fragment,n),E=w(n),O(g.$$.fragment,n),n.forEach(m),S=w(p),L=$(p,"NAV",{class:!0});var N=q(L);T=$(N,"H3",{class:!0,"data-svelte-h":!0}),K(T)!=="svelte-1hgt7fi"&&(T.textContent=z),Y=w(N),H=$(N,"UL",{class:!0});var te=q(H);for(let x=0;x<d.length;x+=1)d[x].l(te);te.forEach(m),N.forEach(m),this.h()},h(){h(s,"class","page-toc-small-title"),h(u,"class","page-toc-small-expand-button"),h(t,"class","page-toc-small"),h(e,"class","page-main"),h(T,"class","page-toc-title"),h(H,"class","page-ul"),h(L,"class","page-toc")},m(p,n){_(p,e,n),k(e,t),k(t,s),k(t,c),k(t,u),C.m(u,null),k(e,o),b&&b.m(e,null),k(e,r),V(f,e,null),k(e,E),V(g,e,null),_(p,S,n),_(p,L,n),k(L,T),k(L,Y),k(L,H);for(let i=0;i<d.length;i+=1)d[i]&&d[i].m(H,null);P=!0,D||(Q=Ce(u,"click",a[4]),D=!0)},p(p,[n]){if(M!==(M=B(p))&&(C.d(1),C=M(p),C&&(C.c(),C.m(u,null))),p[1]?b?b.p(p,n):(b=ue(p),b.c(),b.m(e,r)):b&&(b.d(1),b=null),n&5){I=W(p[0]);let i;for(i=0;i<I.length;i+=1){const A=ce(p,I,i);d[i]?d[i].p(A,n):(d[i]=me(A),d[i].c(),d[i].m(H,null))}for(;i<d.length;i+=1)d[i].d(1);d.length=I.length}},i(p){P||(U(f.$$.fragment,p),U(g.$$.fragment,p),P=!0)},o(p){G(f.$$.fragment,p),G(g.$$.fragment,p),P=!1},d(p){p&&(m(e),m(S),m(L)),C.d(),b&&b.d(),R(f),R(g),_e(d,p),D=!1,Q()}}}function De(a,e,t){let s,l;ge(a,J,f=>t(0,l=f));let c=!1;function u(f){let E=s;for(let g=0;g<f.length;g++)if(f[g].visible)return g;return E}function o(){t(1,c=!c)}const r=()=>{o()};return a.$$.update=()=>{a.$$.dirty&1&&t(2,s=u(l))},[l,c,s,o,r]}class Oe extends $e{constructor(e){super(),be(this,e,De,Ae,he,{})}}export{Oe as component};
//# sourceMappingURL=28.BcggV5Bw.js.map
