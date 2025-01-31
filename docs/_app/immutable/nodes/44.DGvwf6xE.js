import{s as ye,A as fe,a as k,e as v,H as qe,f as y,b as $,m as H,d as P,F as De,g as u,h as C,i as h,B as me,v as Ee,x as oe,w as Ae,t as te,o as ne,n as Ne,j as E,C as He,D as Te,E as z,q as Se,p as Ie}from"../chunks/scheduler.CIEH-92L.js";import{S as Fe,i as Le,e as he,c as W,a as U,m as j,t as O,b as G,d as R}from"../chunks/index.HLF2pGCU.js";import{e as ie}from"../chunks/each.BLebZWAa.js";import{w as Me}from"../chunks/index.bxqR-5-s.js";import{P as _e,S as ge,c as Be,B as Ve}from"../chunks/index.D1zh88jY.js";import{N as We}from"../chunks/Note.DEjaTDAW.js";import{F as Ue}from"../chunks/Figure.ClABA4Sw.js";const ee=Me([]);function je(i){let e;return{c(){e=te("Interpreter Framework")},l(t){e=ne(t,"Interpreter Framework")},m(t,l){h(t,e,l)},d(t){t&&u(e)}}}function Oe(i){let e;return{c(){e=te("The Interpreter Framework is still in Development")},l(t){e=ne(t,"The Interpreter Framework is still in Development")},m(t,l){h(t,e,l)},d(t){t&&u(e)}}}function Ge(i){let e,t=`The use of an interpreter in the Freon editor is still in development. Foremost, the presentation of the results is likely to change.
			With this in mind, the interpreter framework is already usable.`;return{c(){e=v("p"),e.textContent=t},l(l){e=$(l,"P",{"data-svelte-h":!0}),H(e)!=="svelte-1csknhi"&&(e.textContent=t)},m(l,s){h(l,e,s)},p:Ne,d(l){l&&u(e)}}}function Re(i){let e;return{c(){e=te("What is an Interpreter")},l(t){e=ne(t,"What is an Interpreter")},m(t,l){h(t,e,l)},d(t){t&&u(e)}}}function ze(i){let e,t,l,s,o,f,r="Freon includes an interpreter framework which makes it easy to write an interpreter for a language.",a,m,I,g,D,F,T,Z=`Most articles on interpreters you will find start by describing lexers and parsers and as a final step evaluation. Forget about lexers,
	parsers, those are only needed when you start with plain text. Because we use a projectional editor, in Freon we have the AST of our model
	already available and do not need to parse text to get the AST.`,M,S,J=`The interpreter in Freon helps to calculate something based on the AST of the model. The general way to build an interpreter is as
	follows:`,B,x,K,X=`<code class="language-freon">Select the start node you want to evaluate
   If the node has children/parts
      Evaluate the parts 
      Evaluate the node, using the evaluated value of the parts
   else if the node is a leaf
      Evaluate the node</code>`,L,d,A="Take the following AST as an example.",b,c,w,_,V="Let’s evaluate the multiply (*) node.",N,q,Y=`<li>We need to first evaluate the two children (+ and 5)
		<ul><li>Evaluate the plus (+) node, we need to evaluate the children first.
				<ul><li>Evaluate the “3” node, resulting in the value 3</li> <li>Evaluate the “4” node, resulting in the value 4</li></ul></li> <li>Evaluate the plus based on the result of the children, result is 7</li> <li>Evaluate the “5” node resulting in 5.</li></ul></li> <li>Evaluate multiply of 6 and 5, result is 30</li>`,le,Q,re;e=new _e({props:{prevLink:de,nextLink:ve}});function Pe(n){i[1](n)}let ce={tag:"h1",id:"interpreter-framework-1",$$slots:{default:[je]},$$scope:{ctx:i}};i[0][0]!==void 0&&(ce.intersecting=i[0][0]),l=new ge({props:ce}),fe.push(()=>he(l,"intersecting",Pe)),m=new We({props:{$$slots:{content:[Ge],header:[Oe]},$$scope:{ctx:i}}});function xe(n){i[2](n)}let ue={tag:"h2",id:"what-is-an-interpreter-2",$$slots:{default:[Re]},$$scope:{ctx:i}};return i[0][1]!==void 0&&(ue.intersecting=i[0][1]),g=new ge({props:ue}),fe.push(()=>he(g,"intersecting",xe)),c=new Ue({props:{imageName:"interpreter/plus-tree.png",caption:"AST for Plus Expression",figureNumber:1}}),Q=new _e({props:{prevLink:de,nextLink:ve}}),{c(){W(e.$$.fragment),t=k(),W(l.$$.fragment),o=k(),f=v("p"),f.textContent=r,a=k(),W(m.$$.fragment),I=k(),W(g.$$.fragment),F=k(),T=v("p"),T.textContent=Z,M=k(),S=v("p"),S.textContent=J,B=k(),x=v("pre"),K=new qe(!1),L=k(),d=v("p"),d.textContent=A,b=k(),W(c.$$.fragment),w=k(),_=v("p"),_.textContent=V,N=k(),q=v("ul"),q.innerHTML=Y,le=k(),W(Q.$$.fragment),this.h()},l(n){U(e.$$.fragment,n),t=y(n),U(l.$$.fragment,n),o=y(n),f=$(n,"P",{"data-svelte-h":!0}),H(f)!=="svelte-18v6dk"&&(f.textContent=r),a=y(n),U(m.$$.fragment,n),I=y(n),U(g.$$.fragment,n),F=y(n),T=$(n,"P",{"data-svelte-h":!0}),H(T)!=="svelte-14brukl"&&(T.textContent=Z),M=y(n),S=$(n,"P",{"data-svelte-h":!0}),H(S)!=="svelte-b21bxv"&&(S.textContent=J),B=y(n),x=$(n,"PRE",{class:!0});var p=P(x);K=De(p,!1),p.forEach(u),L=y(n),d=$(n,"P",{"data-svelte-h":!0}),H(d)!=="svelte-15qm27g"&&(d.textContent=A),b=y(n),U(c.$$.fragment,n),w=y(n),_=$(n,"P",{"data-svelte-h":!0}),H(_)!=="svelte-1cys5wy"&&(_.textContent=V),N=y(n),q=$(n,"UL",{"data-svelte-h":!0}),H(q)!=="svelte-1u3j1rk"&&(q.innerHTML=Y),le=y(n),U(Q.$$.fragment,n),this.h()},h(){K.a=null,C(x,"class","language-freon")},m(n,p){j(e,n,p),h(n,t,p),j(l,n,p),h(n,o,p),h(n,f,p),h(n,a,p),j(m,n,p),h(n,I,p),j(g,n,p),h(n,F,p),h(n,T,p),h(n,M,p),h(n,S,p),h(n,B,p),h(n,x,p),K.m(X,x),h(n,L,p),h(n,d,p),h(n,b,p),j(c,n,p),h(n,w,p),h(n,_,p),h(n,N,p),h(n,q,p),h(n,le,p),j(Q,n,p),re=!0},p(n,[p]){const se={};p&16&&(se.$$scope={dirty:p,ctx:n}),!s&&p&1&&(s=!0,se.intersecting=n[0][0],me(()=>s=!1)),l.$set(se);const pe={};p&16&&(pe.$$scope={dirty:p,ctx:n}),m.$set(pe);const ae={};p&16&&(ae.$$scope={dirty:p,ctx:n}),!D&&p&1&&(D=!0,ae.intersecting=n[0][1],me(()=>D=!1)),g.$set(ae)},i(n){re||(O(e.$$.fragment,n),O(l.$$.fragment,n),O(m.$$.fragment,n),O(g.$$.fragment,n),O(c.$$.fragment,n),O(Q.$$.fragment,n),re=!0)},o(n){G(e.$$.fragment,n),G(l.$$.fragment,n),G(m.$$.fragment,n),G(g.$$.fragment,n),G(c.$$.fragment,n),G(Q.$$.fragment,n),re=!1},d(n){n&&(u(t),u(o),u(f),u(a),u(I),u(F),u(T),u(M),u(S),u(B),u(x),u(L),u(d),u(b),u(w),u(_),u(N),u(q),u(le)),R(e,n),R(l,n),R(m,n),R(g,n),R(c,n),R(Q,n)}}}let de="/Documentation/Scoping,_Typing,_and_Validating/Validator",ve="/Documentation/Interpreter_Framework/The_Expressions_DSL";function Je(i,e,t){let l;Ee(i,ee,r=>t(3,l=r)),oe(ee,l=[{title:"Interpreter Framework",visible:!1,ref:"#interpreter-framework-1"},{title:"What is an Interpreter",visible:!1,ref:"#what-is-an-interpreter-2"}],l);let s=[];Ae(()=>{document.querySelectorAll("pre").forEach(a=>{const m=document.createElement("div");m.className="copy-prompt";const I=document.createElement("p");I.innerHTML="👆 Click to copy",I.className="copy-prompt-p";const g=document.createElement("img");g.src="/icons/copy-icon.svg",g.className="copy-prompt-img",m.appendChild(g),m.appendChild(I),a.appendChild(m),a.querySelector(".copy-prompt > p").addEventListener("click",D=>{Be(a.querySelector("code").textContent),a.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{a.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function o(r){i.$$.not_equal(s[0],r)&&(s[0]=r,t(0,s))}function f(r){i.$$.not_equal(s[1],r)&&(s[1]=r,t(0,s))}return i.$$.update=()=>{i.$$.dirty&1&&oe(ee,l[0].visible=s[0],l),i.$$.dirty&1&&oe(ee,l[1].visible=s[1],l)},[s,o,f]}class Ke extends Fe{constructor(e){super(),Le(this,e,Je,ze,ye,{})}}function $e(i,e,t){const l=i.slice();return l[6]=e[t],l[8]=t,l}function be(i,e,t){const l=i.slice();return l[6]=e[t],l[8]=t,l}function Qe(i){let e,t;return{c(){e=v("img"),this.h()},l(l){e=$(l,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){C(e,"class","page-toc-small-img"),Ie(e.src,t="/icons/down-arrow.png")||C(e,"src",t),C(e,"alt","arrow down")},m(l,s){h(l,e,s)},d(l){l&&u(e)}}}function Xe(i){let e,t;return{c(){e=v("img"),this.h()},l(l){e=$(l,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){C(e,"class","page-toc-small-img"),Ie(e.src,t="/icons/upload.png")||C(e,"src",t),C(e,"alt","arrow up")},m(l,s){h(l,e,s)},d(l){l&&u(e)}}}function we(i){let e,t,l=ie(i[0]),s=[];for(let o=0;o<l.length;o+=1)s[o]=Ce(be(i,l,o));return{c(){e=v("div"),t=v("ul");for(let o=0;o<s.length;o+=1)s[o].c();this.h()},l(o){e=$(o,"DIV",{class:!0});var f=P(e);t=$(f,"UL",{class:!0});var r=P(t);for(let a=0;a<s.length;a+=1)s[a].l(r);r.forEach(u),f.forEach(u),this.h()},h(){C(t,"class","page-ul"),C(e,"class","toc-details")},m(o,f){h(o,e,f),E(e,t);for(let r=0;r<s.length;r+=1)s[r]&&s[r].m(t,null)},p(o,f){if(f&5){l=ie(o[0]);let r;for(r=0;r<l.length;r+=1){const a=be(o,l,r);s[r]?s[r].p(a,f):(s[r]=Ce(a),s[r].c(),s[r].m(t,null))}for(;r<s.length;r+=1)s[r].d(1);s.length=l.length}},d(o){o&&u(e),Te(s,o)}}}function Ce(i){let e,t,l=i[6].title+"",s,o,f;return{c(){e=v("li"),t=v("a"),s=te(l),f=k(),this.h()},l(r){e=$(r,"LI",{class:!0});var a=P(e);t=$(a,"A",{href:!0});var m=P(t);s=ne(m,l),m.forEach(u),f=y(a),a.forEach(u),this.h()},h(){C(t,"href",o=i[6].ref),z(t,"page-visible",i[8]===i[2]),z(t,"page-nonvisible",i[8]!==i[2]),C(e,"class","page-toc-text")},m(r,a){h(r,e,a),E(e,t),E(t,s),E(e,f)},p(r,a){a&1&&l!==(l=r[6].title+"")&&Se(s,l),a&1&&o!==(o=r[6].ref)&&C(t,"href",o),a&4&&z(t,"page-visible",r[8]===r[2]),a&4&&z(t,"page-nonvisible",r[8]!==r[2])},d(r){r&&u(e)}}}function ke(i){let e,t,l=i[6].title+"",s,o,f;return{c(){e=v("li"),t=v("a"),s=te(l),f=k(),this.h()},l(r){e=$(r,"LI",{class:!0});var a=P(e);t=$(a,"A",{href:!0});var m=P(t);s=ne(m,l),m.forEach(u),f=y(a),a.forEach(u),this.h()},h(){C(t,"href",o=i[6].ref),z(t,"page-visible",i[8]===i[2]),z(t,"page-nonvisible",i[8]!==i[2]),C(e,"class","page-toc-text")},m(r,a){h(r,e,a),E(e,t),E(t,s),E(e,f)},p(r,a){a&1&&l!==(l=r[6].title+"")&&Se(s,l),a&1&&o!==(o=r[6].ref)&&C(t,"href",o),a&4&&z(t,"page-visible",r[8]===r[2]),a&4&&z(t,"page-nonvisible",r[8]!==r[2])},d(r){r&&u(e)}}}function Ye(i){let e,t,l,s="On this page ...",o,f,r,a,m,I,g,D,F,T,Z="On this page",M,S,J,B,x;function K(c,w){return c[1]?Xe:Qe}let X=K(i),L=X(i),d=i[1]&&we(i);m=new Ve({}),g=new Ke({});let A=ie(i[0]),b=[];for(let c=0;c<A.length;c+=1)b[c]=ke($e(i,A,c));return{c(){e=v("div"),t=v("div"),l=v("p"),l.textContent=s,o=k(),f=v("button"),L.c(),r=k(),d&&d.c(),a=k(),W(m.$$.fragment),I=k(),W(g.$$.fragment),D=k(),F=v("nav"),T=v("h3"),T.textContent=Z,M=k(),S=v("ul");for(let c=0;c<b.length;c+=1)b[c].c();this.h()},l(c){e=$(c,"DIV",{class:!0});var w=P(e);t=$(w,"DIV",{class:!0});var _=P(t);l=$(_,"P",{class:!0,"data-svelte-h":!0}),H(l)!=="svelte-1929lhs"&&(l.textContent=s),o=y(_),f=$(_,"BUTTON",{class:!0});var V=P(f);L.l(V),V.forEach(u),_.forEach(u),r=y(w),d&&d.l(w),a=y(w),U(m.$$.fragment,w),I=y(w),U(g.$$.fragment,w),w.forEach(u),D=y(c),F=$(c,"NAV",{class:!0});var N=P(F);T=$(N,"H3",{class:!0,"data-svelte-h":!0}),H(T)!=="svelte-1hgt7fi"&&(T.textContent=Z),M=y(N),S=$(N,"UL",{class:!0});var q=P(S);for(let Y=0;Y<b.length;Y+=1)b[Y].l(q);q.forEach(u),N.forEach(u),this.h()},h(){C(l,"class","page-toc-small-title"),C(f,"class","page-toc-small-expand-button"),C(t,"class","page-toc-small"),C(e,"class","page-main"),C(T,"class","page-toc-title"),C(S,"class","page-ul"),C(F,"class","page-toc")},m(c,w){h(c,e,w),E(e,t),E(t,l),E(t,o),E(t,f),L.m(f,null),E(e,r),d&&d.m(e,null),E(e,a),j(m,e,null),E(e,I),j(g,e,null),h(c,D,w),h(c,F,w),E(F,T),E(F,M),E(F,S);for(let _=0;_<b.length;_+=1)b[_]&&b[_].m(S,null);J=!0,B||(x=He(f,"click",i[4]),B=!0)},p(c,[w]){if(X!==(X=K(c))&&(L.d(1),L=X(c),L&&(L.c(),L.m(f,null))),c[1]?d?d.p(c,w):(d=we(c),d.c(),d.m(e,a)):d&&(d.d(1),d=null),w&5){A=ie(c[0]);let _;for(_=0;_<A.length;_+=1){const V=$e(c,A,_);b[_]?b[_].p(V,w):(b[_]=ke(V),b[_].c(),b[_].m(S,null))}for(;_<b.length;_+=1)b[_].d(1);b.length=A.length}},i(c){J||(O(m.$$.fragment,c),O(g.$$.fragment,c),J=!0)},o(c){G(m.$$.fragment,c),G(g.$$.fragment,c),J=!1},d(c){c&&(u(e),u(D),u(F)),L.d(),d&&d.d(),R(m),R(g),Te(b,c),B=!1,x()}}}function Ze(i,e,t){let l,s;Ee(i,ee,m=>t(0,s=m));let o=!1;function f(m){let I=l;for(let g=0;g<m.length;g++)if(m[g].visible)return g;return I}function r(){t(1,o=!o)}const a=()=>{r()};return i.$$.update=()=>{i.$$.dirty&1&&t(2,l=f(s))},[s,o,l,r,a]}class at extends Fe{constructor(e){super(),Le(this,e,Ze,Ye,ye,{})}}export{at as component};
//# sourceMappingURL=44.DGvwf6xE.js.map
