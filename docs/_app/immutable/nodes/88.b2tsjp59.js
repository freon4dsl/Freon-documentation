import{s as et,A as Le,a as _,e as m,H as ze,f as v,b as g,m as E,d as D,F as Ge,g as s,h as y,i as c,B as Te,v as tt,x as he,w as pt,t as fe,o as ue,j as L,C as dt,D as nt,E as Y,q as ot,p as it}from"../chunks/scheduler.CIEH-92L.js";import{S as lt,i as st,e as qe,c as U,a as N,m as O,t as z,b as G,d as V}from"../chunks/index.HLF2pGCU.js";import{e as Se}from"../chunks/each.BLebZWAa.js";import{w as mt}from"../chunks/index.bxqR-5-s.js";import{P as Ve,S as Ee,c as gt,B as _t}from"../chunks/index.CLjbMqgA.js";const ae=mt([]);function vt(i){let t;return{c(){t=fe("Welcome to the Freon tutorial!")},l(n){t=ue(n,"Welcome to the Freon tutorial!")},m(n,o){c(n,t,o)},d(n){n&&s(t)}}}function bt(i){let t;return{c(){t=fe("The DSL: Computer Aided Learning")},l(n){t=ue(n,"The DSL: Computer Aided Learning")},m(n,o){c(n,t,o)},d(n){n&&s(t)}}}function wt(i){let t;return{c(){t=fe("How to use this tutorial")},l(n){t=ue(n,"How to use this tutorial")},m(n,o){c(n,t,o)},d(n){n&&s(t)}}}function yt(i){let t;return{c(){t=fe("Where do the files go?")},l(n){t=ue(n,"Where do the files go?")},m(n,o){c(n,t,o)},d(n){n&&s(t)}}}function $t(i){let t,n,o,l,u,d,a=`This step-by-step guide will teach you everything you need to know to easily build your own domain specific language (DSL). You will learn
	how to create the set of tools, editor, validator, interpreter, etc., which will enable your end-users to use your DSL efficiently.`,h,p,S='You can also consult the documentation, or - if you’re impatient to start hacking on your machine locally - <a href="/Documentation/Overview/Getting_Started#example-project-startup-2">create a project</a>.',$,T,q=`We assume that you are interested in DSLs, and are therefore familiar with terms like metamodel, abstract syntax, and model, as well as
	abbreviations like AST. If you are not, please first refer to other sources, for instance the book <a href="https://www.manning.com/books/building-user-friendly-dsls" target="_blank">‘Building User-Friendly DSLs’</a>
	written by Meinte Boersma. If you just need to refresh your knowledge, refer to
	<a href="/Documentation/Terminology">Freon Terminology</a>. Furthermore, a little knowledge of UML will come in handy, but this is not a
	true requirement.`,M,x,R,F,I,re=`The first thing to do is explain the domain in which our DSL is positioned, which is Computer Aided Learning. Our (hypothetical) client is
	a company that provides a service to children of various ages to help them learn certain topics, like arithmetic and mathematics,
	geography, history, biology, or road safety. For this purpose the company deploys a number of websites, each dedicated to a certain topic.`,J,A,K=`The company, therefore, needs a lean and agile means to define the content of the webpages, and the flow between them. For instance, when
	a pupil makes many mistakes, the page that will be shown next to this specific pupil is one that might contain extra explanation, or extra
	practice material. But when another pupil goes through the topic with much ease, he or she will be shown more advanced material to keep
	him/her interested. Furthermore, our client company want a means to test the page flow before the actual webpages are produced.`,H,w,B="So you might see that we have a bit of task before us to satisfy this client’s needs and expectations.",k,f,C,b,P,Q=`This tutorial is split into 9 lessons. Each lesson has a dedicated subject, but it will build upon the previous lessons. So the best way
	is to work through them in the given order.`,X,j,xe=`The easiest way to follow this tutorial is to use the create project command, and choose the language <code>Education</code>. This way you
	can recreate the project, and toy with many of the options.`,pe,Z,de,at='<code class="language-bash">  <span class="token function">npm</span> create freon@latest</code>',me,ee,Fe=`In the <code>Education</code> project you will find all definition files needed for one of the lessons in a separate folder, so you won’t
	be bothered by any of the details that are not yet explained, when going through the lessons one by one. For instance, you can find all
	definition files for lesson 3 in the folder named <code>lesson3-defs</code>, and likewise for all other lessons. The files for lesson1 are
	present in the <code>src/defs</code> folder (see <a href="#where-do-the-files-go-4">Where do the files go?</a>) at the start. Empty this
	folder before the next lesson, and copy in the files for the lesson you are about to follow. You can also find a number of models that fit
	the language(s) from the lessons in the <strong>modelstore</strong> folder. (For an explanation of the content of the project see
	<a href="/Documentation/Overview/Getting_Started#project_structure-4">Project_Structure</a>.) Use the model called <code>Lesson1</code>
	for lessons 1 till 3, the model <code>Lesson4</code> for lessons 4 and 5, and <code>Lesson6</code> for the rest of the lessons.`,ge,te,Ie="For some hints on how to use the editor, click on the question mark on the top bar of the editor.",_e,W,He,ve,ne,je=`Your project will be set up to have all your Freon definition files in the folder <code>src/defs</code>, but if you decide to do things
	differently, you can change the <code>package.json</code> file. Look at the scripts for <code>generate </code>and <code>clean-gen</code>.
	There you find the folder <code>src/defs</code>
	mentioned. If you change these entries you can place the language definition files anywhere you like.`,be,oe,we,rt=`<code class="language-undefined">&quot;generate&quot;: &quot;freon -v all -d src/defs -o src/freon&quot;,
&quot;clean-gen&quot;: &quot;freon clean-it -d src/defs -o src/freon&quot;,</code>`,ye,ie,Ae=`In this tutorial we will make a number of Freon definition files. Note that the extension of the file (for instance, <code>.ast</code>,
	<code>.valid</code>) is important, but the name is not. All metamodel definitions need to be in a <code>.ast</code> file, all editor
	definitions in a <code>.edit</code> file, etc.`,$e,le,Be=`When you have checked out the source code and are following this example in your own IDE, you might notice that upon regeneration the
	browser sometimes shows an empty page. The reason is that the browser is quicker than the regeneration process. (In the console of the
	browser development tools you will see the message <code>Uncaught SyntaxError: Unexpected end of input</code>.) Don’t worry, simply reload
	the page, and everything will be fine.`,ke,se,Ce;t=new Ve({props:{prevLink:Ye,nextLink:Re}});function ct(e){i[1](e)}let We={tag:"h1",id:"welcome-to-the-freon-tutorial-1",$$slots:{default:[vt]},$$scope:{ctx:i}};i[0][0]!==void 0&&(We.intersecting=i[0][0]),o=new Ee({props:We}),Le.push(()=>qe(o,"intersecting",ct));function ft(e){i[2](e)}let Ue={tag:"h2",id:"the-dsl-computer-aided-learning-2",$$slots:{default:[bt]},$$scope:{ctx:i}};i[0][1]!==void 0&&(Ue.intersecting=i[0][1]),x=new Ee({props:Ue}),Le.push(()=>qe(x,"intersecting",ft));function ut(e){i[3](e)}let Ne={tag:"h2",id:"how-to-use-this-tutorial-3",$$slots:{default:[wt]},$$scope:{ctx:i}};i[0][2]!==void 0&&(Ne.intersecting=i[0][2]),f=new Ee({props:Ne}),Le.push(()=>qe(f,"intersecting",ut));function ht(e){i[4](e)}let Oe={tag:"h2",id:"where-do-the-files-go-4",$$slots:{default:[yt]},$$scope:{ctx:i}};return i[0][3]!==void 0&&(Oe.intersecting=i[0][3]),W=new Ee({props:Oe}),Le.push(()=>qe(W,"intersecting",ht)),se=new Ve({props:{prevLink:Ye,nextLink:Re}}),{c(){U(t.$$.fragment),n=_(),U(o.$$.fragment),u=_(),d=m("p"),d.textContent=a,h=_(),p=m("p"),p.innerHTML=S,$=_(),T=m("p"),T.innerHTML=q,M=_(),U(x.$$.fragment),F=_(),I=m("p"),I.textContent=re,J=_(),A=m("p"),A.textContent=K,H=_(),w=m("p"),w.textContent=B,k=_(),U(f.$$.fragment),b=_(),P=m("p"),P.textContent=Q,X=_(),j=m("p"),j.innerHTML=xe,pe=_(),Z=m("pre"),de=new ze(!1),me=_(),ee=m("p"),ee.innerHTML=Fe,ge=_(),te=m("p"),te.textContent=Ie,_e=_(),U(W.$$.fragment),ve=_(),ne=m("p"),ne.innerHTML=je,be=_(),oe=m("pre"),we=new ze(!1),ye=_(),ie=m("p"),ie.innerHTML=Ae,$e=_(),le=m("p"),le.innerHTML=Be,ke=_(),U(se.$$.fragment),this.h()},l(e){N(t.$$.fragment,e),n=v(e),N(o.$$.fragment,e),u=v(e),d=g(e,"P",{"data-svelte-h":!0}),E(d)!=="svelte-1hqvjq9"&&(d.textContent=a),h=v(e),p=g(e,"P",{"data-svelte-h":!0}),E(p)!=="svelte-kyszbt"&&(p.innerHTML=S),$=v(e),T=g(e,"P",{"data-svelte-h":!0}),E(T)!=="svelte-l91y3p"&&(T.innerHTML=q),M=v(e),N(x.$$.fragment,e),F=v(e),I=g(e,"P",{"data-svelte-h":!0}),E(I)!=="svelte-1087l3e"&&(I.textContent=re),J=v(e),A=g(e,"P",{"data-svelte-h":!0}),E(A)!=="svelte-11s9qbk"&&(A.textContent=K),H=v(e),w=g(e,"P",{"data-svelte-h":!0}),E(w)!=="svelte-il6cnf"&&(w.textContent=B),k=v(e),N(f.$$.fragment,e),b=v(e),P=g(e,"P",{"data-svelte-h":!0}),E(P)!=="svelte-clfkuy"&&(P.textContent=Q),X=v(e),j=g(e,"P",{"data-svelte-h":!0}),E(j)!=="svelte-l1yxkq"&&(j.innerHTML=xe),pe=v(e),Z=g(e,"PRE",{class:!0});var r=D(Z);de=Ge(r,!1),r.forEach(s),me=v(e),ee=g(e,"P",{"data-svelte-h":!0}),E(ee)!=="svelte-zmem41"&&(ee.innerHTML=Fe),ge=v(e),te=g(e,"P",{"data-svelte-h":!0}),E(te)!=="svelte-1wm7npw"&&(te.textContent=Ie),_e=v(e),N(W.$$.fragment,e),ve=v(e),ne=g(e,"P",{"data-svelte-h":!0}),E(ne)!=="svelte-fm7ooh"&&(ne.innerHTML=je),be=v(e),oe=g(e,"PRE",{class:!0});var ce=D(oe);we=Ge(ce,!1),ce.forEach(s),ye=v(e),ie=g(e,"P",{"data-svelte-h":!0}),E(ie)!=="svelte-2wvt68"&&(ie.innerHTML=Ae),$e=v(e),le=g(e,"P",{"data-svelte-h":!0}),E(le)!=="svelte-1ezvcz7"&&(le.innerHTML=Be),ke=v(e),N(se.$$.fragment,e),this.h()},h(){de.a=null,y(Z,"class","language-bash"),we.a=null,y(oe,"class","language-undefined")},m(e,r){O(t,e,r),c(e,n,r),O(o,e,r),c(e,u,r),c(e,d,r),c(e,h,r),c(e,p,r),c(e,$,r),c(e,T,r),c(e,M,r),O(x,e,r),c(e,F,r),c(e,I,r),c(e,J,r),c(e,A,r),c(e,H,r),c(e,w,r),c(e,k,r),O(f,e,r),c(e,b,r),c(e,P,r),c(e,X,r),c(e,j,r),c(e,pe,r),c(e,Z,r),de.m(at,Z),c(e,me,r),c(e,ee,r),c(e,ge,r),c(e,te,r),c(e,_e,r),O(W,e,r),c(e,ve,r),c(e,ne,r),c(e,be,r),c(e,oe,r),we.m(rt,oe),c(e,ye,r),c(e,ie,r),c(e,$e,r),c(e,le,r),c(e,ke,r),O(se,e,r),Ce=!0},p(e,[r]){const ce={};r&64&&(ce.$$scope={dirty:r,ctx:e}),!l&&r&1&&(l=!0,ce.intersecting=e[0][0],Te(()=>l=!1)),o.$set(ce);const Me={};r&64&&(Me.$$scope={dirty:r,ctx:e}),!R&&r&1&&(R=!0,Me.intersecting=e[0][1],Te(()=>R=!1)),x.$set(Me);const Pe={};r&64&&(Pe.$$scope={dirty:r,ctx:e}),!C&&r&1&&(C=!0,Pe.intersecting=e[0][2],Te(()=>C=!1)),f.$set(Pe);const De={};r&64&&(De.$$scope={dirty:r,ctx:e}),!He&&r&1&&(He=!0,De.intersecting=e[0][3],Te(()=>He=!1)),W.$set(De)},i(e){Ce||(z(t.$$.fragment,e),z(o.$$.fragment,e),z(x.$$.fragment,e),z(f.$$.fragment,e),z(W.$$.fragment,e),z(se.$$.fragment,e),Ce=!0)},o(e){G(t.$$.fragment,e),G(o.$$.fragment,e),G(x.$$.fragment,e),G(f.$$.fragment,e),G(W.$$.fragment,e),G(se.$$.fragment,e),Ce=!1},d(e){e&&(s(n),s(u),s(d),s(h),s(p),s($),s(T),s(M),s(F),s(I),s(J),s(A),s(H),s(w),s(k),s(b),s(P),s(X),s(j),s(pe),s(Z),s(me),s(ee),s(ge),s(te),s(_e),s(ve),s(ne),s(be),s(oe),s(ye),s(ie),s($e),s(le),s(ke)),V(t,e),V(o,e),V(x,e),V(f,e),V(W,e),V(se,e)}}}let Ye="/Documentation/Terminology",Re="/Tutorial/Creating_your_Metamodel";function kt(i,t,n){let o;tt(i,ae,p=>n(5,o=p)),he(ae,o=[{title:"Welcome to the Freon tutorial!",visible:!1,ref:"#welcome-to-the-freon-tutorial-1"},{title:"The DSL: Computer Aided Learning",visible:!1,ref:"#the-dsl-computer-aided-learning-2"},{title:"How to use this tutorial",visible:!1,ref:"#how-to-use-this-tutorial-3"},{title:"Where do the files go?",visible:!1,ref:"#where-do-the-files-go-4"}],o);let l=[];pt(()=>{document.querySelectorAll("pre").forEach(S=>{const $=document.createElement("div");$.className="copy-prompt";const T=document.createElement("p");T.innerHTML="👆 Click to copy",T.className="copy-prompt-p";const q=document.createElement("img");q.src="/icons/copy-icon.svg",q.className="copy-prompt-img",$.appendChild(q),$.appendChild(T),S.appendChild($),S.querySelector(".copy-prompt > p").addEventListener("click",M=>{gt(S.querySelector("code").textContent),S.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{S.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function u(p){i.$$.not_equal(l[0],p)&&(l[0]=p,n(0,l))}function d(p){i.$$.not_equal(l[1],p)&&(l[1]=p,n(0,l))}function a(p){i.$$.not_equal(l[2],p)&&(l[2]=p,n(0,l))}function h(p){i.$$.not_equal(l[3],p)&&(l[3]=p,n(0,l))}return i.$$.update=()=>{i.$$.dirty&1&&he(ae,o[0].visible=l[0],o),i.$$.dirty&1&&he(ae,o[1].visible=l[1],o),i.$$.dirty&1&&he(ae,o[2].visible=l[2],o),i.$$.dirty&1&&he(ae,o[3].visible=l[3],o)},[l,u,d,a,h]}class Ct extends lt{constructor(t){super(),st(this,t,kt,$t,et,{})}}function Je(i,t,n){const o=i.slice();return o[6]=t[n],o[8]=n,o}function Ke(i,t,n){const o=i.slice();return o[6]=t[n],o[8]=n,o}function Lt(i){let t,n;return{c(){t=m("img"),this.h()},l(o){t=g(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){y(t,"class","page-toc-small-img"),it(t.src,n="/icons/down-arrow.png")||y(t,"src",n),y(t,"alt","arrow down")},m(o,l){c(o,t,l)},d(o){o&&s(t)}}}function Tt(i){let t,n;return{c(){t=m("img"),this.h()},l(o){t=g(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){y(t,"class","page-toc-small-img"),it(t.src,n="/icons/upload.png")||y(t,"src",n),y(t,"alt","arrow up")},m(o,l){c(o,t,l)},d(o){o&&s(t)}}}function Qe(i){let t,n,o=Se(i[0]),l=[];for(let u=0;u<o.length;u+=1)l[u]=Xe(Ke(i,o,u));return{c(){t=m("div"),n=m("ul");for(let u=0;u<l.length;u+=1)l[u].c();this.h()},l(u){t=g(u,"DIV",{class:!0});var d=D(t);n=g(d,"UL",{class:!0});var a=D(n);for(let h=0;h<l.length;h+=1)l[h].l(a);a.forEach(s),d.forEach(s),this.h()},h(){y(n,"class","page-ul"),y(t,"class","toc-details")},m(u,d){c(u,t,d),L(t,n);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(n,null)},p(u,d){if(d&5){o=Se(u[0]);let a;for(a=0;a<o.length;a+=1){const h=Ke(u,o,a);l[a]?l[a].p(h,d):(l[a]=Xe(h),l[a].c(),l[a].m(n,null))}for(;a<l.length;a+=1)l[a].d(1);l.length=o.length}},d(u){u&&s(t),nt(l,u)}}}function Xe(i){let t,n,o=i[6].title+"",l,u,d;return{c(){t=m("li"),n=m("a"),l=fe(o),d=_(),this.h()},l(a){t=g(a,"LI",{class:!0});var h=D(t);n=g(h,"A",{href:!0});var p=D(n);l=ue(p,o),p.forEach(s),d=v(h),h.forEach(s),this.h()},h(){y(n,"href",u=i[6].ref),Y(n,"page-visible",i[8]===i[2]),Y(n,"page-nonvisible",i[8]!==i[2]),y(t,"class","page-toc-text")},m(a,h){c(a,t,h),L(t,n),L(n,l),L(t,d)},p(a,h){h&1&&o!==(o=a[6].title+"")&&ot(l,o),h&1&&u!==(u=a[6].ref)&&y(n,"href",u),h&4&&Y(n,"page-visible",a[8]===a[2]),h&4&&Y(n,"page-nonvisible",a[8]!==a[2])},d(a){a&&s(t)}}}function Ze(i){let t,n,o=i[6].title+"",l,u,d;return{c(){t=m("li"),n=m("a"),l=fe(o),d=_(),this.h()},l(a){t=g(a,"LI",{class:!0});var h=D(t);n=g(h,"A",{href:!0});var p=D(n);l=ue(p,o),p.forEach(s),d=v(h),h.forEach(s),this.h()},h(){y(n,"href",u=i[6].ref),Y(n,"page-visible",i[8]===i[2]),Y(n,"page-nonvisible",i[8]!==i[2]),y(t,"class","page-toc-text")},m(a,h){c(a,t,h),L(t,n),L(n,l),L(t,d)},p(a,h){h&1&&o!==(o=a[6].title+"")&&ot(l,o),h&1&&u!==(u=a[6].ref)&&y(n,"href",u),h&4&&Y(n,"page-visible",a[8]===a[2]),h&4&&Y(n,"page-nonvisible",a[8]!==a[2])},d(a){a&&s(t)}}}function qt(i){let t,n,o,l="On this page ...",u,d,a,h,p,S,$,T,q,M,x="On this page",R,F,I,re,J;function A(f,C){return f[1]?Tt:Lt}let K=A(i),H=K(i),w=i[1]&&Qe(i);p=new _t({}),$=new Ct({});let B=Se(i[0]),k=[];for(let f=0;f<B.length;f+=1)k[f]=Ze(Je(i,B,f));return{c(){t=m("div"),n=m("div"),o=m("p"),o.textContent=l,u=_(),d=m("button"),H.c(),a=_(),w&&w.c(),h=_(),U(p.$$.fragment),S=_(),U($.$$.fragment),T=_(),q=m("nav"),M=m("h3"),M.textContent=x,R=_(),F=m("ul");for(let f=0;f<k.length;f+=1)k[f].c();this.h()},l(f){t=g(f,"DIV",{class:!0});var C=D(t);n=g(C,"DIV",{class:!0});var b=D(n);o=g(b,"P",{class:!0,"data-svelte-h":!0}),E(o)!=="svelte-1929lhs"&&(o.textContent=l),u=v(b),d=g(b,"BUTTON",{class:!0});var P=D(d);H.l(P),P.forEach(s),b.forEach(s),a=v(C),w&&w.l(C),h=v(C),N(p.$$.fragment,C),S=v(C),N($.$$.fragment,C),C.forEach(s),T=v(f),q=g(f,"NAV",{class:!0});var Q=D(q);M=g(Q,"H3",{class:!0,"data-svelte-h":!0}),E(M)!=="svelte-1hgt7fi"&&(M.textContent=x),R=v(Q),F=g(Q,"UL",{class:!0});var X=D(F);for(let j=0;j<k.length;j+=1)k[j].l(X);X.forEach(s),Q.forEach(s),this.h()},h(){y(o,"class","page-toc-small-title"),y(d,"class","page-toc-small-expand-button"),y(n,"class","page-toc-small"),y(t,"class","page-main"),y(M,"class","page-toc-title"),y(F,"class","page-ul"),y(q,"class","page-toc")},m(f,C){c(f,t,C),L(t,n),L(n,o),L(n,u),L(n,d),H.m(d,null),L(t,a),w&&w.m(t,null),L(t,h),O(p,t,null),L(t,S),O($,t,null),c(f,T,C),c(f,q,C),L(q,M),L(q,R),L(q,F);for(let b=0;b<k.length;b+=1)k[b]&&k[b].m(F,null);I=!0,re||(J=dt(d,"click",i[4]),re=!0)},p(f,[C]){if(K!==(K=A(f))&&(H.d(1),H=K(f),H&&(H.c(),H.m(d,null))),f[1]?w?w.p(f,C):(w=Qe(f),w.c(),w.m(t,h)):w&&(w.d(1),w=null),C&5){B=Se(f[0]);let b;for(b=0;b<B.length;b+=1){const P=Je(f,B,b);k[b]?k[b].p(P,C):(k[b]=Ze(P),k[b].c(),k[b].m(F,null))}for(;b<k.length;b+=1)k[b].d(1);k.length=B.length}},i(f){I||(z(p.$$.fragment,f),z($.$$.fragment,f),I=!0)},o(f){G(p.$$.fragment,f),G($.$$.fragment,f),I=!1},d(f){f&&(s(t),s(T),s(q)),H.d(),w&&w.d(),V(p),V($),nt(k,f),re=!1,J()}}}function Et(i,t,n){let o,l;tt(i,ae,p=>n(0,l=p));let u=!1;function d(p){let S=o;for(let $=0;$<p.length;$++)if(p[$].visible)return $;return S}function a(){n(1,u=!u)}const h=()=>{a()};return i.$$.update=()=>{i.$$.dirty&1&&n(2,o=d(l))},[l,u,o,a,h]}class xt extends lt{constructor(t){super(),st(this,t,Et,qt,et,{})}}export{xt as component};
//# sourceMappingURL=88.b2tsjp59.js.map
