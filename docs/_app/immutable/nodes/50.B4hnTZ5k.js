import{s as pe,A as _e,a as w,e as v,H as ve,f as E,b as $,m as G,d as I,F as $e,g as f,h as g,i as h,B as be,v as fe,x as te,w as ye,t as X,o as Y,n as ke,j as C,C as Ce,D as ue,E as V,q as me,p as de}from"../chunks/scheduler.CIEH-92L.js";import{S as he,i as ge,e as we,c as F,a as A,m as O,t as x,b as U,d as j}from"../chunks/index.HLF2pGCU.js";import{e as W}from"../chunks/each.BLebZWAa.js";import{w as Ee}from"../chunks/index.bxqR-5-s.js";import{P as ne,S as Te,c as Se,B as Pe}from"../chunks/index.yTjXiNmY.js";import{N as Le}from"../chunks/Note.DEjaTDAW.js";const Q=Ee([]);function He(i){let e;return{c(){e=X("Scoping, Typing, and Validating")},l(t){e=Y(t,"Scoping, Typing, and Validating")},m(t,n){h(t,e,n)},d(t){t&&f(e)}}}function qe(i){let e;return{c(){e=X("Incomplete code")},l(t){e=Y(t,"Incomplete code")},m(t,n){h(t,e,n)},d(t){t&&f(e)}}}function Ie(i){let e,t=`Keep in mind that all commands, except <code>all</code>, when used individually (i.e., without combining them with others), produce
			code that may not compile correctly. For example, the <code>scoper</code>
			and <code>validator</code> may depend on the <code>typer</code> and attempt to reference its class, which might not yet be generated.
			Similarly, the <code>editor</code> may try to include the <code>scoper</code>.`,n,l,r=`To avoid such issues, it is best to start with the <code>all</code> command. Once this has been run, you can use specific commands for
			individual aspects of your language as needed. This approach ensures correct dependencies while minimizing regeneration time.`;return{c(){e=v("p"),e.innerHTML=t,n=w(),l=v("p"),l.innerHTML=r},l(o){e=$(o,"P",{"data-svelte-h":!0}),G(e)!=="svelte-1n8pgna"&&(e.innerHTML=t),n=E(o),l=$(o,"P",{"data-svelte-h":!0}),G(l)!=="svelte-r5rfvf"&&(l.innerHTML=r)},m(o,a){h(o,e,a),h(o,n,a),h(o,l,a)},p:ke,d(o){o&&(f(e),f(n),f(l))}}}function Me(i){let e,t,n,l,r,o,a=`Because, besides to the concrete syntax, scoping, typing, and validation are important parts of a language definition, Freon provides
	defaults and generation tools for each of them.`,c,m,S=`Each of the generators take as input yet another definition file and can be run independently. For instance, using one of the following
	commands.`,b,P,T,M=`<code class="language-bash"><span class="token function">npm</span> run freon scope-it <span class="token parameter variable">-d</span> src/defs <span class="token parameter variable">-o</span> src/<span class="token string">"

npm run freon type-it -d src/defs -o src/"</span>

<span class="token function">npm</span> run freon validate-it <span class="token parameter variable">-d</span> src/defs <span class="token parameter variable">-o</span> src/"</code>`,B,L,H,q,N;e=new ne({props:{prevLink:ae,nextLink:le}});function R(s){i[1](s)}let z={tag:"h1",id:"scoping-typing-and-validating-1",$$slots:{default:[He]},$$scope:{ctx:i}};return i[0][0]!==void 0&&(z.intersecting=i[0][0]),n=new Te({props:z}),_e.push(()=>we(n,"intersecting",R)),L=new Le({props:{$$slots:{content:[Ie],header:[qe]},$$scope:{ctx:i}}}),q=new ne({props:{prevLink:ae,nextLink:le}}),{c(){F(e.$$.fragment),t=w(),F(n.$$.fragment),r=w(),o=v("p"),o.textContent=a,c=w(),m=v("p"),m.textContent=S,b=w(),P=v("pre"),T=new ve(!1),B=w(),F(L.$$.fragment),H=w(),F(q.$$.fragment),this.h()},l(s){A(e.$$.fragment,s),t=E(s),A(n.$$.fragment,s),r=E(s),o=$(s,"P",{"data-svelte-h":!0}),G(o)!=="svelte-qey3n9"&&(o.textContent=a),c=E(s),m=$(s,"P",{"data-svelte-h":!0}),G(m)!=="svelte-1d0adkl"&&(m.textContent=S),b=E(s),P=$(s,"PRE",{class:!0});var u=I(P);T=$e(u,!1),u.forEach(f),B=E(s),A(L.$$.fragment,s),H=E(s),A(q.$$.fragment,s),this.h()},h(){T.a=null,g(P,"class","language-bash")},m(s,u){O(e,s,u),h(s,t,u),O(n,s,u),h(s,r,u),h(s,o,u),h(s,c,u),h(s,m,u),h(s,b,u),h(s,P,u),T.m(M,P),h(s,B,u),O(L,s,u),h(s,H,u),O(q,s,u),N=!0},p(s,[u]){const _={};u&8&&(_.$$scope={dirty:u,ctx:s}),!l&&u&1&&(l=!0,_.intersecting=s[0][0],be(()=>l=!1)),n.$set(_);const D={};u&8&&(D.$$scope={dirty:u,ctx:s}),L.$set(D)},i(s){N||(x(e.$$.fragment,s),x(n.$$.fragment,s),x(L.$$.fragment,s),x(q.$$.fragment,s),N=!0)},o(s){U(e.$$.fragment,s),U(n.$$.fragment,s),U(L.$$.fragment,s),U(q.$$.fragment,s),N=!1},d(s){s&&(f(t),f(r),f(o),f(c),f(m),f(b),f(P),f(B),f(H)),j(e,s),j(n,s),j(L,s),j(q,s)}}}let ae="/Documentation/Defining_an_Editor/The_Parser_Projection",le="/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider";function De(i,e,t){let n;fe(i,Q,o=>t(2,n=o)),te(Q,n=[{title:"Scoping, Typing, and Validating",visible:!1,ref:"#scoping-typing-and-validating-1"}],n);let l=[];ye(()=>{document.querySelectorAll("pre").forEach(a=>{const c=document.createElement("div");c.className="copy-prompt";const m=document.createElement("p");m.innerHTML="👆 Click to copy",m.className="copy-prompt-p";const S=document.createElement("img");S.src="/icons/copy-icon.svg",S.className="copy-prompt-img",c.appendChild(S),c.appendChild(m),a.appendChild(c),a.querySelector(".copy-prompt > p").addEventListener("click",b=>{Se(a.querySelector("code").textContent),a.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{a.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function r(o){i.$$.not_equal(l[0],o)&&(l[0]=o,t(0,l))}return i.$$.update=()=>{i.$$.dirty&1&&te(Q,n[0].visible=l[0],n)},[l,r]}class Ne extends he{constructor(e){super(),ge(this,e,De,Me,pe,{})}}function se(i,e,t){const n=i.slice();return n[6]=e[t],n[8]=t,n}function ie(i,e,t){const n=i.slice();return n[6]=e[t],n[8]=t,n}function Ve(i){let e,t;return{c(){e=v("img"),this.h()},l(n){e=$(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","page-toc-small-img"),de(e.src,t="/icons/down-arrow.png")||g(e,"src",t),g(e,"alt","arrow down")},m(n,l){h(n,e,l)},d(n){n&&f(e)}}}function Be(i){let e,t;return{c(){e=v("img"),this.h()},l(n){e=$(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","page-toc-small-img"),de(e.src,t="/icons/upload.png")||g(e,"src",t),g(e,"alt","arrow up")},m(n,l){h(n,e,l)},d(n){n&&f(e)}}}function oe(i){let e,t,n=W(i[0]),l=[];for(let r=0;r<n.length;r+=1)l[r]=re(ie(i,n,r));return{c(){e=v("div"),t=v("ul");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=$(r,"DIV",{class:!0});var o=I(e);t=$(o,"UL",{class:!0});var a=I(t);for(let c=0;c<l.length;c+=1)l[c].l(a);a.forEach(f),o.forEach(f),this.h()},h(){g(t,"class","page-ul"),g(e,"class","toc-details")},m(r,o){h(r,e,o),C(e,t);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(t,null)},p(r,o){if(o&5){n=W(r[0]);let a;for(a=0;a<n.length;a+=1){const c=ie(r,n,a);l[a]?l[a].p(c,o):(l[a]=re(c),l[a].c(),l[a].m(t,null))}for(;a<l.length;a+=1)l[a].d(1);l.length=n.length}},d(r){r&&f(e),ue(l,r)}}}function re(i){let e,t,n=i[6].title+"",l,r,o;return{c(){e=v("li"),t=v("a"),l=X(n),o=w(),this.h()},l(a){e=$(a,"LI",{class:!0});var c=I(e);t=$(c,"A",{href:!0});var m=I(t);l=Y(m,n),m.forEach(f),o=E(c),c.forEach(f),this.h()},h(){g(t,"href",r=i[6].ref),V(t,"page-visible",i[8]===i[2]),V(t,"page-nonvisible",i[8]!==i[2]),g(e,"class","page-toc-text")},m(a,c){h(a,e,c),C(e,t),C(t,l),C(e,o)},p(a,c){c&1&&n!==(n=a[6].title+"")&&me(l,n),c&1&&r!==(r=a[6].ref)&&g(t,"href",r),c&4&&V(t,"page-visible",a[8]===a[2]),c&4&&V(t,"page-nonvisible",a[8]!==a[2])},d(a){a&&f(e)}}}function ce(i){let e,t,n=i[6].title+"",l,r,o;return{c(){e=v("li"),t=v("a"),l=X(n),o=w(),this.h()},l(a){e=$(a,"LI",{class:!0});var c=I(e);t=$(c,"A",{href:!0});var m=I(t);l=Y(m,n),m.forEach(f),o=E(c),c.forEach(f),this.h()},h(){g(t,"href",r=i[6].ref),V(t,"page-visible",i[8]===i[2]),V(t,"page-nonvisible",i[8]!==i[2]),g(e,"class","page-toc-text")},m(a,c){h(a,e,c),C(e,t),C(t,l),C(e,o)},p(a,c){c&1&&n!==(n=a[6].title+"")&&me(l,n),c&1&&r!==(r=a[6].ref)&&g(t,"href",r),c&4&&V(t,"page-visible",a[8]===a[2]),c&4&&V(t,"page-nonvisible",a[8]!==a[2])},d(a){a&&f(e)}}}function Fe(i){let e,t,n,l="On this page ...",r,o,a,c,m,S,b,P,T,M,B="On this page",L,H,q,N,R;function z(p,k){return p[1]?Be:Ve}let s=z(i),u=s(i),_=i[1]&&oe(i);m=new Pe({}),b=new Ne({});let D=W(i[0]),y=[];for(let p=0;p<D.length;p+=1)y[p]=ce(se(i,D,p));return{c(){e=v("div"),t=v("div"),n=v("p"),n.textContent=l,r=w(),o=v("button"),u.c(),a=w(),_&&_.c(),c=w(),F(m.$$.fragment),S=w(),F(b.$$.fragment),P=w(),T=v("nav"),M=v("h3"),M.textContent=B,L=w(),H=v("ul");for(let p=0;p<y.length;p+=1)y[p].c();this.h()},l(p){e=$(p,"DIV",{class:!0});var k=I(e);t=$(k,"DIV",{class:!0});var d=I(t);n=$(d,"P",{class:!0,"data-svelte-h":!0}),G(n)!=="svelte-1929lhs"&&(n.textContent=l),r=E(d),o=$(d,"BUTTON",{class:!0});var K=I(o);u.l(K),K.forEach(f),d.forEach(f),a=E(k),_&&_.l(k),c=E(k),A(m.$$.fragment,k),S=E(k),A(b.$$.fragment,k),k.forEach(f),P=E(p),T=$(p,"NAV",{class:!0});var J=I(T);M=$(J,"H3",{class:!0,"data-svelte-h":!0}),G(M)!=="svelte-1hgt7fi"&&(M.textContent=B),L=E(J),H=$(J,"UL",{class:!0});var ee=I(H);for(let Z=0;Z<y.length;Z+=1)y[Z].l(ee);ee.forEach(f),J.forEach(f),this.h()},h(){g(n,"class","page-toc-small-title"),g(o,"class","page-toc-small-expand-button"),g(t,"class","page-toc-small"),g(e,"class","page-main"),g(M,"class","page-toc-title"),g(H,"class","page-ul"),g(T,"class","page-toc")},m(p,k){h(p,e,k),C(e,t),C(t,n),C(t,r),C(t,o),u.m(o,null),C(e,a),_&&_.m(e,null),C(e,c),O(m,e,null),C(e,S),O(b,e,null),h(p,P,k),h(p,T,k),C(T,M),C(T,L),C(T,H);for(let d=0;d<y.length;d+=1)y[d]&&y[d].m(H,null);q=!0,N||(R=Ce(o,"click",i[4]),N=!0)},p(p,[k]){if(s!==(s=z(p))&&(u.d(1),u=s(p),u&&(u.c(),u.m(o,null))),p[1]?_?_.p(p,k):(_=oe(p),_.c(),_.m(e,c)):_&&(_.d(1),_=null),k&5){D=W(p[0]);let d;for(d=0;d<D.length;d+=1){const K=se(p,D,d);y[d]?y[d].p(K,k):(y[d]=ce(K),y[d].c(),y[d].m(H,null))}for(;d<y.length;d+=1)y[d].d(1);y.length=D.length}},i(p){q||(x(m.$$.fragment,p),x(b.$$.fragment,p),q=!0)},o(p){U(m.$$.fragment,p),U(b.$$.fragment,p),q=!1},d(p){p&&(f(e),f(P),f(T)),u.d(),_&&_.d(),j(m),j(b),ue(y,p),N=!1,R()}}}function Ae(i,e,t){let n,l;fe(i,Q,m=>t(0,l=m));let r=!1;function o(m){let S=n;for(let b=0;b<m.length;b++)if(m[b].visible)return b;return S}function a(){t(1,r=!r)}const c=()=>{a()};return i.$$.update=()=>{i.$$.dirty&1&&t(2,n=o(l))},[l,r,n,a,c]}class Ke extends he{constructor(e){super(),ge(this,e,Ae,Fe,pe,{})}}export{Ke as component};
//# sourceMappingURL=50.B4hnTZ5k.js.map
