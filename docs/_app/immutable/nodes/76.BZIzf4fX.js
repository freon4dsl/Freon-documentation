import{s as de,A as oe,a as H,e as w,f as k,b as y,m as W,i as h,B as se,g as f,v as ve,x as ee,w as Ee,t as X,o as Z,d as B,h as v,j as C,C as He,D as $e,E as D,q as be,p as we}from"../chunks/scheduler.CIEH-92L.js";import{S as ye,i as Ce,e as re,c as x,a as O,m as Y,t as z,b as J,d as K}from"../chunks/index.HLF2pGCU.js";import{e as te}from"../chunks/each.BLebZWAa.js";import{w as ke}from"../chunks/index.bxqR-5-s.js";import{P as ce,S as ae,c as Le,B as Se}from"../chunks/index.yTjXiNmY.js";const R=ke([]);function Te(i){let e;return{c(){e=X("Examples")},l(t){e=Z(t,"Examples")},m(t,n){h(t,e,n)},d(t){t&&f(e)}}}function qe(i){let e;return{c(){e=X("Currently Available")},l(t){e=Z(t,"Currently Available")},m(t,n){h(t,e,n)},d(t){t&&f(e)}}}function Ie(i){let e;return{c(){e=X("Upcoming")},l(t){e=Z(t,"Upcoming")},m(t,n){h(t,e,n)},d(t){t&&f(e)}}}function Me(i){let e,t,n,s,a,u,o=`In this section of the website we have gathered a number of examples that each focus on one more advanced topic. During the upcoming year
	we plan to add more examples to this list. For now, the following examples are available. You can find the sources for each of the example
	on GitHub. See <a href="/Documentation/Overview/Getting_Started">Getting Started</a>
	for information on how to install the examples on your computer.`,r,p,L,d,E,T='<li><a href="/Examples/Building_an_Interpreter">Building an Interpreter</a> How to build an interpreter that uses the Freon AST.</li> <li><a href="/Examples/Generic_Types">Generic Types</a> How to create a language with generic types.</li> <li><a href="/Examples/External_Components">Using Svelte Components from a Library</a> How to include custom components in the editor.</li>',q,I,F,M,P,Q="The following examples are planned, and, hopefully, will be available soon.",G,U,j="<li><strong>Projection Fragments</strong> How to create and use fragments in your projections.</li> <li><strong>Editor Styling</strong> How to style the generated editor.</li> <li><strong>Custom Projections</strong> How to build custom projections.</li> <li><strong>Custom Actions</strong> How to create custom actions.</li> <li><strong>Custom Scoping</strong> How to adjust the scope provider.</li> <li><strong>Custom Validation</strong> How to create cutom validation rules.</li> <li><strong>Include Freon in your website</strong> How to proceed when you want to include Freon in another webpage.</li>",S,_,A;e=new ce({props:{prevLink:ue,nextLink:pe}});function $(l){i[1](l)}let c={tag:"h1",id:"examples-1",$$slots:{default:[Te]},$$scope:{ctx:i}};i[0][0]!==void 0&&(c.intersecting=i[0][0]),n=new ae({props:c}),oe.push(()=>re(n,"intersecting",$));function b(l){i[2](l)}let g={tag:"h2",id:"currently-available-2",$$slots:{default:[qe]},$$scope:{ctx:i}};i[0][1]!==void 0&&(g.intersecting=i[0][1]),p=new ae({props:g}),oe.push(()=>re(p,"intersecting",b));function N(l){i[3](l)}let V={tag:"h2",id:"upcoming-3",$$slots:{default:[Ie]},$$scope:{ctx:i}};return i[0][2]!==void 0&&(V.intersecting=i[0][2]),I=new ae({props:V}),oe.push(()=>re(I,"intersecting",N)),_=new ce({props:{prevLink:ue,nextLink:pe}}),{c(){x(e.$$.fragment),t=H(),x(n.$$.fragment),a=H(),u=w("p"),u.innerHTML=o,r=H(),x(p.$$.fragment),d=H(),E=w("ul"),E.innerHTML=T,q=H(),x(I.$$.fragment),M=H(),P=w("p"),P.textContent=Q,G=H(),U=w("ul"),U.innerHTML=j,S=H(),x(_.$$.fragment)},l(l){O(e.$$.fragment,l),t=k(l),O(n.$$.fragment,l),a=k(l),u=y(l,"P",{"data-svelte-h":!0}),W(u)!=="svelte-934yil"&&(u.innerHTML=o),r=k(l),O(p.$$.fragment,l),d=k(l),E=y(l,"UL",{"data-svelte-h":!0}),W(E)!=="svelte-6ewm2s"&&(E.innerHTML=T),q=k(l),O(I.$$.fragment,l),M=k(l),P=y(l,"P",{"data-svelte-h":!0}),W(P)!=="svelte-qme07n"&&(P.textContent=Q),G=k(l),U=y(l,"UL",{"data-svelte-h":!0}),W(U)!=="svelte-q6pu3h"&&(U.innerHTML=j),S=k(l),O(_.$$.fragment,l)},m(l,m){Y(e,l,m),h(l,t,m),Y(n,l,m),h(l,a,m),h(l,u,m),h(l,r,m),Y(p,l,m),h(l,d,m),h(l,E,m),h(l,q,m),Y(I,l,m),h(l,M,m),h(l,P,m),h(l,G,m),h(l,U,m),h(l,S,m),Y(_,l,m),A=!0},p(l,[m]){const ne={};m&32&&(ne.$$scope={dirty:m,ctx:l}),!s&&m&1&&(s=!0,ne.intersecting=l[0][0],se(()=>s=!1)),n.$set(ne);const le={};m&32&&(le.$$scope={dirty:m,ctx:l}),!L&&m&1&&(L=!0,le.intersecting=l[0][1],se(()=>L=!1)),p.$set(le);const ie={};m&32&&(ie.$$scope={dirty:m,ctx:l}),!F&&m&1&&(F=!0,ie.intersecting=l[0][2],se(()=>F=!1)),I.$set(ie)},i(l){A||(z(e.$$.fragment,l),z(n.$$.fragment,l),z(p.$$.fragment,l),z(I.$$.fragment,l),z(_.$$.fragment,l),A=!0)},o(l){J(e.$$.fragment,l),J(n.$$.fragment,l),J(p.$$.fragment,l),J(I.$$.fragment,l),J(_.$$.fragment,l),A=!1},d(l){l&&(f(t),f(a),f(u),f(r),f(d),f(E),f(q),f(M),f(P),f(G),f(U),f(S)),K(e,l),K(n,l),K(p,l),K(I,l),K(_,l)}}}let ue="/Tutorial/Conclusion",pe="/Examples/Building_an_Interpreter";function Pe(i,e,t){let n;ve(i,R,r=>t(4,n=r)),ee(R,n=[{title:"Examples",visible:!1,ref:"#examples-1"},{title:"Currently Available",visible:!1,ref:"#currently-available-2"},{title:"Upcoming",visible:!1,ref:"#upcoming-3"}],n);let s=[];Ee(()=>{document.querySelectorAll("pre").forEach(p=>{const L=document.createElement("div");L.className="copy-prompt";const d=document.createElement("p");d.innerHTML="👆 Click to copy",d.className="copy-prompt-p";const E=document.createElement("img");E.src="/icons/copy-icon.svg",E.className="copy-prompt-img",L.appendChild(E),L.appendChild(d),p.appendChild(L),p.querySelector(".copy-prompt > p").addEventListener("click",T=>{Le(p.querySelector("code").textContent),p.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{p.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function a(r){i.$$.not_equal(s[0],r)&&(s[0]=r,t(0,s))}function u(r){i.$$.not_equal(s[1],r)&&(s[1]=r,t(0,s))}function o(r){i.$$.not_equal(s[2],r)&&(s[2]=r,t(0,s))}return i.$$.update=()=>{i.$$.dirty&1&&ee(R,n[0].visible=s[0],n),i.$$.dirty&1&&ee(R,n[1].visible=s[1],n),i.$$.dirty&1&&ee(R,n[2].visible=s[2],n)},[s,a,u,o]}class Ae extends ye{constructor(e){super(),Ce(this,e,Pe,Me,de,{})}}function fe(i,e,t){const n=i.slice();return n[6]=e[t],n[8]=t,n}function me(i,e,t){const n=i.slice();return n[6]=e[t],n[8]=t,n}function Be(i){let e,t;return{c(){e=w("img"),this.h()},l(n){e=y(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){v(e,"class","page-toc-small-img"),we(e.src,t="/icons/down-arrow.png")||v(e,"src",t),v(e,"alt","arrow down")},m(n,s){h(n,e,s)},d(n){n&&f(e)}}}function Ue(i){let e,t;return{c(){e=w("img"),this.h()},l(n){e=y(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){v(e,"class","page-toc-small-img"),we(e.src,t="/icons/upload.png")||v(e,"src",t),v(e,"alt","arrow up")},m(n,s){h(n,e,s)},d(n){n&&f(e)}}}function ge(i){let e,t,n=te(i[0]),s=[];for(let a=0;a<n.length;a+=1)s[a]=_e(me(i,n,a));return{c(){e=w("div"),t=w("ul");for(let a=0;a<s.length;a+=1)s[a].c();this.h()},l(a){e=y(a,"DIV",{class:!0});var u=B(e);t=y(u,"UL",{class:!0});var o=B(t);for(let r=0;r<s.length;r+=1)s[r].l(o);o.forEach(f),u.forEach(f),this.h()},h(){v(t,"class","page-ul"),v(e,"class","toc-details")},m(a,u){h(a,e,u),C(e,t);for(let o=0;o<s.length;o+=1)s[o]&&s[o].m(t,null)},p(a,u){if(u&5){n=te(a[0]);let o;for(o=0;o<n.length;o+=1){const r=me(a,n,o);s[o]?s[o].p(r,u):(s[o]=_e(r),s[o].c(),s[o].m(t,null))}for(;o<s.length;o+=1)s[o].d(1);s.length=n.length}},d(a){a&&f(e),$e(s,a)}}}function _e(i){let e,t,n=i[6].title+"",s,a,u;return{c(){e=w("li"),t=w("a"),s=X(n),u=H(),this.h()},l(o){e=y(o,"LI",{class:!0});var r=B(e);t=y(r,"A",{href:!0});var p=B(t);s=Z(p,n),p.forEach(f),u=k(r),r.forEach(f),this.h()},h(){v(t,"href",a=i[6].ref),D(t,"page-visible",i[8]===i[2]),D(t,"page-nonvisible",i[8]!==i[2]),v(e,"class","page-toc-text")},m(o,r){h(o,e,r),C(e,t),C(t,s),C(e,u)},p(o,r){r&1&&n!==(n=o[6].title+"")&&be(s,n),r&1&&a!==(a=o[6].ref)&&v(t,"href",a),r&4&&D(t,"page-visible",o[8]===o[2]),r&4&&D(t,"page-nonvisible",o[8]!==o[2])},d(o){o&&f(e)}}}function he(i){let e,t,n=i[6].title+"",s,a,u;return{c(){e=w("li"),t=w("a"),s=X(n),u=H(),this.h()},l(o){e=y(o,"LI",{class:!0});var r=B(e);t=y(r,"A",{href:!0});var p=B(t);s=Z(p,n),p.forEach(f),u=k(r),r.forEach(f),this.h()},h(){v(t,"href",a=i[6].ref),D(t,"page-visible",i[8]===i[2]),D(t,"page-nonvisible",i[8]!==i[2]),v(e,"class","page-toc-text")},m(o,r){h(o,e,r),C(e,t),C(t,s),C(e,u)},p(o,r){r&1&&n!==(n=o[6].title+"")&&be(s,n),r&1&&a!==(a=o[6].ref)&&v(t,"href",a),r&4&&D(t,"page-visible",o[8]===o[2]),r&4&&D(t,"page-nonvisible",o[8]!==o[2])},d(o){o&&f(e)}}}function De(i){let e,t,n,s="On this page ...",a,u,o,r,p,L,d,E,T,q,I="On this page",F,M,P,Q,G;function U(c,b){return c[1]?Ue:Be}let j=U(i),S=j(i),_=i[1]&&ge(i);p=new Se({}),d=new Ae({});let A=te(i[0]),$=[];for(let c=0;c<A.length;c+=1)$[c]=he(fe(i,A,c));return{c(){e=w("div"),t=w("div"),n=w("p"),n.textContent=s,a=H(),u=w("button"),S.c(),o=H(),_&&_.c(),r=H(),x(p.$$.fragment),L=H(),x(d.$$.fragment),E=H(),T=w("nav"),q=w("h3"),q.textContent=I,F=H(),M=w("ul");for(let c=0;c<$.length;c+=1)$[c].c();this.h()},l(c){e=y(c,"DIV",{class:!0});var b=B(e);t=y(b,"DIV",{class:!0});var g=B(t);n=y(g,"P",{class:!0,"data-svelte-h":!0}),W(n)!=="svelte-1929lhs"&&(n.textContent=s),a=k(g),u=y(g,"BUTTON",{class:!0});var N=B(u);S.l(N),N.forEach(f),g.forEach(f),o=k(b),_&&_.l(b),r=k(b),O(p.$$.fragment,b),L=k(b),O(d.$$.fragment,b),b.forEach(f),E=k(c),T=y(c,"NAV",{class:!0});var V=B(T);q=y(V,"H3",{class:!0,"data-svelte-h":!0}),W(q)!=="svelte-1hgt7fi"&&(q.textContent=I),F=k(V),M=y(V,"UL",{class:!0});var l=B(M);for(let m=0;m<$.length;m+=1)$[m].l(l);l.forEach(f),V.forEach(f),this.h()},h(){v(n,"class","page-toc-small-title"),v(u,"class","page-toc-small-expand-button"),v(t,"class","page-toc-small"),v(e,"class","page-main"),v(q,"class","page-toc-title"),v(M,"class","page-ul"),v(T,"class","page-toc")},m(c,b){h(c,e,b),C(e,t),C(t,n),C(t,a),C(t,u),S.m(u,null),C(e,o),_&&_.m(e,null),C(e,r),Y(p,e,null),C(e,L),Y(d,e,null),h(c,E,b),h(c,T,b),C(T,q),C(T,F),C(T,M);for(let g=0;g<$.length;g+=1)$[g]&&$[g].m(M,null);P=!0,Q||(G=He(u,"click",i[4]),Q=!0)},p(c,[b]){if(j!==(j=U(c))&&(S.d(1),S=j(c),S&&(S.c(),S.m(u,null))),c[1]?_?_.p(c,b):(_=ge(c),_.c(),_.m(e,r)):_&&(_.d(1),_=null),b&5){A=te(c[0]);let g;for(g=0;g<A.length;g+=1){const N=fe(c,A,g);$[g]?$[g].p(N,b):($[g]=he(N),$[g].c(),$[g].m(M,null))}for(;g<$.length;g+=1)$[g].d(1);$.length=A.length}},i(c){P||(z(p.$$.fragment,c),z(d.$$.fragment,c),P=!0)},o(c){J(p.$$.fragment,c),J(d.$$.fragment,c),P=!1},d(c){c&&(f(e),f(E),f(T)),S.d(),_&&_.d(),K(p),K(d),$e($,c),Q=!1,G()}}}function Fe(i,e,t){let n,s;ve(i,R,p=>t(0,s=p));let a=!1;function u(p){let L=n;for(let d=0;d<p.length;d++)if(p[d].visible)return d;return L}function o(){t(1,a=!a)}const r=()=>{o()};return i.$$.update=()=>{i.$$.dirty&1&&t(2,n=u(s))},[s,a,n,o,r]}class Oe extends ye{constructor(e){super(),Ce(this,e,Fe,De,de,{})}}export{Oe as component};
//# sourceMappingURL=76.BZIzf4fX.js.map
