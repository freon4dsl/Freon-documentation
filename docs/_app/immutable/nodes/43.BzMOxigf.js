import{s as pe,A as ge,a as C,e as v,f as E,b,m as N,i as g,B as ve,g as f,v as ue,x as te,w as be,t as Y,o as Z,d as D,h as d,j as y,C as $e,D as fe,E as I,q as he,p as me}from"../chunks/scheduler.CIEH-92L.js";import{S as de,i as _e,e as ke,c as G,a as O,m as U,t as x,b as z,d as W}from"../chunks/index.HLF2pGCU.js";import{e as R}from"../chunks/each.BLebZWAa.js";import{w as we}from"../chunks/index.bxqR-5-s.js";import{P as ne,S as ye,c as Ce,B as Ee}from"../chunks/index.yTjXiNmY.js";const Q=we([]);function Pe(i){let e;return{c(){e=Y("The Parser Projection")},l(t){e=Z(t,"The Parser Projection")},m(t,n){g(t,e,n)},d(t){t&&f(e)}}}function Te(i){let e,t,n,s,o,c,l=`Freon generates a parser (wrapped in a file reader), and un unparser (wrapped in a file writer), both based on the default projection.
	Because, obviously, the unparser should be able to read the files that were written using the parser, both are based on the same
	projection.`,a,u,P=`When, however, the default projection is not the one required for reading from, and writing to text files, a separate projection called <code>parser</code>
	can be used. This projection is never shown in the editor. Like other projections, the parser generation falls back to the default
	projection for a certain concept, when no definition is present in the <code>parser</code> projection set.`,$,T,L=`Layout, like vertical and horizontal lists, is taken into account as much as possible. Furthermore, typical parse problems like left and
	right recursion are avoided. To be able to do so, Freon uses a parser generator called <a href="https://github.com/dhakehurst/net.akehurst.language" target="_blank">AGL</a>, created by David Akehurst, which is more powerful than most PEG parser generators.`,j,M,A="However, it is still possible to create a projection that cannot be parsed. Please, consider this when writing the parser projection.",S,q,H;e=new ne({props:{prevLink:le,nextLink:re}});function J(r){i[1](r)}let F={tag:"h1",id:"the-parser-projection-1",$$slots:{default:[Pe]},$$scope:{ctx:i}};return i[0][0]!==void 0&&(F.intersecting=i[0][0]),n=new ye({props:F}),ge.push(()=>ke(n,"intersecting",J)),q=new ne({props:{prevLink:le,nextLink:re}}),{c(){G(e.$$.fragment),t=C(),G(n.$$.fragment),o=C(),c=v("p"),c.textContent=l,a=C(),u=v("p"),u.innerHTML=P,$=C(),T=v("p"),T.innerHTML=L,j=C(),M=v("p"),M.textContent=A,S=C(),G(q.$$.fragment)},l(r){O(e.$$.fragment,r),t=E(r),O(n.$$.fragment,r),o=E(r),c=b(r,"P",{"data-svelte-h":!0}),N(c)!=="svelte-pahr21"&&(c.textContent=l),a=E(r),u=b(r,"P",{"data-svelte-h":!0}),N(u)!=="svelte-110xqeg"&&(u.innerHTML=P),$=E(r),T=b(r,"P",{"data-svelte-h":!0}),N(T)!=="svelte-10lki9u"&&(T.innerHTML=L),j=E(r),M=b(r,"P",{"data-svelte-h":!0}),N(M)!=="svelte-li340d"&&(M.textContent=A),S=E(r),O(q.$$.fragment,r)},m(r,h){U(e,r,h),g(r,t,h),U(n,r,h),g(r,o,h),g(r,c,h),g(r,a,h),g(r,u,h),g(r,$,h),g(r,T,h),g(r,j,h),g(r,M,h),g(r,S,h),U(q,r,h),H=!0},p(r,[h]){const _={};h&8&&(_.$$scope={dirty:h,ctx:r}),!s&&h&1&&(s=!0,_.intersecting=r[0][0],ve(()=>s=!1)),n.$set(_)},i(r){H||(x(e.$$.fragment,r),x(n.$$.fragment,r),x(q.$$.fragment,r),H=!0)},o(r){z(e.$$.fragment,r),z(n.$$.fragment,r),z(q.$$.fragment,r),H=!1},d(r){r&&(f(t),f(o),f(c),f(a),f(u),f($),f(T),f(j),f(M),f(S)),W(e,r),W(n,r),W(q,r)}}}let le="/Documentation/Defining_an_Editor/Styling",re="/Documentation/Scoping,_Typing,_and_Validating";function Le(i,e,t){let n;ue(i,Q,c=>t(2,n=c)),te(Q,n=[{title:"The Parser Projection",visible:!1,ref:"#the-parser-projection-1"}],n);let s=[];be(()=>{document.querySelectorAll("pre").forEach(l=>{const a=document.createElement("div");a.className="copy-prompt";const u=document.createElement("p");u.innerHTML="👆 Click to copy",u.className="copy-prompt-p";const P=document.createElement("img");P.src="/icons/copy-icon.svg",P.className="copy-prompt-img",a.appendChild(P),a.appendChild(u),l.appendChild(a),l.querySelector(".copy-prompt > p").addEventListener("click",$=>{Ce(l.querySelector("code").textContent),l.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{l.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function o(c){i.$$.not_equal(s[0],c)&&(s[0]=c,t(0,s))}return i.$$.update=()=>{i.$$.dirty&1&&te(Q,n[0].visible=s[0],n)},[s,o]}class je extends de{constructor(e){super(),_e(this,e,Le,Te,pe,{})}}function se(i,e,t){const n=i.slice();return n[6]=e[t],n[8]=t,n}function ie(i,e,t){const n=i.slice();return n[6]=e[t],n[8]=t,n}function Se(i){let e,t;return{c(){e=v("img"),this.h()},l(n){e=b(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){d(e,"class","page-toc-small-img"),me(e.src,t="/icons/down-arrow.png")||d(e,"src",t),d(e,"alt","arrow down")},m(n,s){g(n,e,s)},d(n){n&&f(e)}}}function qe(i){let e,t;return{c(){e=v("img"),this.h()},l(n){e=b(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){d(e,"class","page-toc-small-img"),me(e.src,t="/icons/upload.png")||d(e,"src",t),d(e,"alt","arrow up")},m(n,s){g(n,e,s)},d(n){n&&f(e)}}}function ae(i){let e,t,n=R(i[0]),s=[];for(let o=0;o<n.length;o+=1)s[o]=oe(ie(i,n,o));return{c(){e=v("div"),t=v("ul");for(let o=0;o<s.length;o+=1)s[o].c();this.h()},l(o){e=b(o,"DIV",{class:!0});var c=D(e);t=b(c,"UL",{class:!0});var l=D(t);for(let a=0;a<s.length;a+=1)s[a].l(l);l.forEach(f),c.forEach(f),this.h()},h(){d(t,"class","page-ul"),d(e,"class","toc-details")},m(o,c){g(o,e,c),y(e,t);for(let l=0;l<s.length;l+=1)s[l]&&s[l].m(t,null)},p(o,c){if(c&5){n=R(o[0]);let l;for(l=0;l<n.length;l+=1){const a=ie(o,n,l);s[l]?s[l].p(a,c):(s[l]=oe(a),s[l].c(),s[l].m(t,null))}for(;l<s.length;l+=1)s[l].d(1);s.length=n.length}},d(o){o&&f(e),fe(s,o)}}}function oe(i){let e,t,n=i[6].title+"",s,o,c;return{c(){e=v("li"),t=v("a"),s=Y(n),c=C(),this.h()},l(l){e=b(l,"LI",{class:!0});var a=D(e);t=b(a,"A",{href:!0});var u=D(t);s=Z(u,n),u.forEach(f),c=E(a),a.forEach(f),this.h()},h(){d(t,"href",o=i[6].ref),I(t,"page-visible",i[8]===i[2]),I(t,"page-nonvisible",i[8]!==i[2]),d(e,"class","page-toc-text")},m(l,a){g(l,e,a),y(e,t),y(t,s),y(e,c)},p(l,a){a&1&&n!==(n=l[6].title+"")&&he(s,n),a&1&&o!==(o=l[6].ref)&&d(t,"href",o),a&4&&I(t,"page-visible",l[8]===l[2]),a&4&&I(t,"page-nonvisible",l[8]!==l[2])},d(l){l&&f(e)}}}function ce(i){let e,t,n=i[6].title+"",s,o,c;return{c(){e=v("li"),t=v("a"),s=Y(n),c=C(),this.h()},l(l){e=b(l,"LI",{class:!0});var a=D(e);t=b(a,"A",{href:!0});var u=D(t);s=Z(u,n),u.forEach(f),c=E(a),a.forEach(f),this.h()},h(){d(t,"href",o=i[6].ref),I(t,"page-visible",i[8]===i[2]),I(t,"page-nonvisible",i[8]!==i[2]),d(e,"class","page-toc-text")},m(l,a){g(l,e,a),y(e,t),y(t,s),y(e,c)},p(l,a){a&1&&n!==(n=l[6].title+"")&&he(s,n),a&1&&o!==(o=l[6].ref)&&d(t,"href",o),a&4&&I(t,"page-visible",l[8]===l[2]),a&4&&I(t,"page-nonvisible",l[8]!==l[2])},d(l){l&&f(e)}}}function De(i){let e,t,n,s="On this page ...",o,c,l,a,u,P,$,T,L,j,M="On this page",A,S,q,H,J;function F(p,w){return p[1]?qe:Se}let r=F(i),h=r(i),_=i[1]&&ae(i);u=new Ee({}),$=new je({});let B=R(i[0]),k=[];for(let p=0;p<B.length;p+=1)k[p]=ce(se(i,B,p));return{c(){e=v("div"),t=v("div"),n=v("p"),n.textContent=s,o=C(),c=v("button"),h.c(),l=C(),_&&_.c(),a=C(),G(u.$$.fragment),P=C(),G($.$$.fragment),T=C(),L=v("nav"),j=v("h3"),j.textContent=M,A=C(),S=v("ul");for(let p=0;p<k.length;p+=1)k[p].c();this.h()},l(p){e=b(p,"DIV",{class:!0});var w=D(e);t=b(w,"DIV",{class:!0});var m=D(t);n=b(m,"P",{class:!0,"data-svelte-h":!0}),N(n)!=="svelte-1929lhs"&&(n.textContent=s),o=E(m),c=b(m,"BUTTON",{class:!0});var V=D(c);h.l(V),V.forEach(f),m.forEach(f),l=E(w),_&&_.l(w),a=E(w),O(u.$$.fragment,w),P=E(w),O($.$$.fragment,w),w.forEach(f),T=E(p),L=b(p,"NAV",{class:!0});var K=D(L);j=b(K,"H3",{class:!0,"data-svelte-h":!0}),N(j)!=="svelte-1hgt7fi"&&(j.textContent=M),A=E(K),S=b(K,"UL",{class:!0});var ee=D(S);for(let X=0;X<k.length;X+=1)k[X].l(ee);ee.forEach(f),K.forEach(f),this.h()},h(){d(n,"class","page-toc-small-title"),d(c,"class","page-toc-small-expand-button"),d(t,"class","page-toc-small"),d(e,"class","page-main"),d(j,"class","page-toc-title"),d(S,"class","page-ul"),d(L,"class","page-toc")},m(p,w){g(p,e,w),y(e,t),y(t,n),y(t,o),y(t,c),h.m(c,null),y(e,l),_&&_.m(e,null),y(e,a),U(u,e,null),y(e,P),U($,e,null),g(p,T,w),g(p,L,w),y(L,j),y(L,A),y(L,S);for(let m=0;m<k.length;m+=1)k[m]&&k[m].m(S,null);q=!0,H||(J=$e(c,"click",i[4]),H=!0)},p(p,[w]){if(r!==(r=F(p))&&(h.d(1),h=r(p),h&&(h.c(),h.m(c,null))),p[1]?_?_.p(p,w):(_=ae(p),_.c(),_.m(e,a)):_&&(_.d(1),_=null),w&5){B=R(p[0]);let m;for(m=0;m<B.length;m+=1){const V=se(p,B,m);k[m]?k[m].p(V,w):(k[m]=ce(V),k[m].c(),k[m].m(S,null))}for(;m<k.length;m+=1)k[m].d(1);k.length=B.length}},i(p){q||(x(u.$$.fragment,p),x($.$$.fragment,p),q=!0)},o(p){z(u.$$.fragment,p),z($.$$.fragment,p),q=!1},d(p){p&&(f(e),f(T),f(L)),h.d(),_&&_.d(),W(u),W($),fe(k,p),H=!1,J()}}}function Me(i,e,t){let n,s;ue(i,Q,u=>t(0,s=u));let o=!1;function c(u){let P=n;for(let $=0;$<u.length;$++)if(u[$].visible)return $;return P}function l(){t(1,o=!o)}const a=()=>{l()};return i.$$.update=()=>{i.$$.dirty&1&&t(2,n=c(s))},[s,o,n,l,a]}class Fe extends de{constructor(e){super(),_e(this,e,Me,De,pe,{})}}export{Fe as component};
//# sourceMappingURL=43.BzMOxigf.js.map
