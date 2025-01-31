import{s as ft,A as de,a as g,e as d,f as h,b as _,m as A,i as c,B as _e,g as o,v as ut,x as ge,w as Ct,t as fe,o as ue,d as V,h as k,j as P,C as kt,D as mt,E as X,q as gt,p as ht}from"../chunks/scheduler.CIEH-92L.js";import{S as dt,i as _t,e as $e,c as H,a as q,m as F,t as N,b as I,d as B}from"../chunks/index.HLF2pGCU.js";import{e as qe}from"../chunks/each.BLebZWAa.js";import{w as xt}from"../chunks/index.bxqR-5-s.js";import{P as it,S as ve,c as yt,B as Et}from"../chunks/index.yTjXiNmY.js";import{F as Ge}from"../chunks/Figure.ClABA4Sw.js";const Q=xt([]);function St(s){let t;return{c(){t=fe("What is Projectional Editing?")},l(n){t=ue(n,"What is Projectional Editing?")},m(n,i){c(n,t,i)},d(n){n&&o(t)}}}function Pt(s){let t;return{c(){t=fe("Projectional workflow")},l(n){t=ue(n,"Projectional workflow")},m(n,i){c(n,t,i)},d(n){n&&o(t)}}}function jt(s){let t;return{c(){t=fe("Support For Expressions")},l(n){t=ue(n,"Support For Expressions")},m(n,i){c(n,t,i)},d(n){n&&o(t)}}}function At(s){let t;return{c(){t=fe("Adding to an Existing Expression")},l(n){t=ue(n,"Adding to an Existing Expression")},m(n,i){c(n,t,i)},d(n){n&&o(t)}}}function Lt(s){let t;return{c(){t=fe("Persistence")},l(n){t=ue(n,"Persistence")},m(n,i){c(n,t,i)},d(n){n&&o(t)}}}function Mt(s){let t,n,i,r,p,m,a=`The essential characteristic of projectional editing is that the user manipulates the Abstract Syntax Tree (AST) directly. In contrast,
	the traditional manner of editing is that a user manipulates a text-string, which is then (re)parsed into a (changed) AST.`,f,v,b='For a generic view on projectional editing see <a href="https://en.wikipedia.org/wiki/Structure*editor" target="_blank">this page</a> on Wikipedia.',T,y,S,j,D,me="The overall flow in a projectional editor generated by Freon is shown in this figure.",L,M,Y,G,he="<li>The model/AST is mapped to a visual presentation (the projection).</li> <li>The projection is shown to the user.</li> <li>The user performs an action on the projection.</li> <li>The action on the projection is mapped to an action on the model/AST.</li> <li>(or 1 again) The changed model/AST is (re)mapped to a visual representation.</li>",O,E,x,W,w,u=`Editing expressions in a projectional editor is a well-known challenge. The representation of an expression in the AST is highly
	structured. Yet, because its appearance to the user looks textual, users expect that the editing behavior resembles classical text editing
	as much as possible.`,C,$,J='In <a href="https://www.voelter.de/data/pub/fse2016-projEditing.pdf" target="_blank">Efficiency of Projectional Editing: A Controlled Experiment</a> the authors express the problem as follows.',U,Z,K,ee,Oe=`Editing expressions with their fine-grained tree structure is one of the major challenges in a projectional editor. The inability to
	insert and remove parentheses in arbitrary places (and then refactor the treestructure according to the precedence expressed by the
	parentheses) is an example.`,be,te,Ue="[Markus Voelter a.o., Efficiency of Projectional Editing]",we,Te,Ce,ne,Re=`For this reason, Freon has in-build support for expressions. There is extra functionality to be able to add an expression before or after
	an existing expression. Secondly, the AST of any binary expression is automatically balanced.`,ke,R,Fe,xe,ie,ye,se,ze=`In the above figure, when the user types a <code>+</code> symbol after the <code>**</code>, it is not enough to simply add the
	<code>+</code> in the AST.`,Ee,le,Ye=`<li>First of all, a placeholder should be added to make the expression structurally correct, so we should see something like
		<ul><li><code>a * ... + b</code>.</li></ul></li> <li>Doing so will lead to the second AST shown.</li> <li>But … this AST is not balanced right!
		<ul><li>When adding parenthesis to show the AST, this will look like <code>a * (... + b)</code></li> <li>But the user (using his knowledge of priorities of <code>**</code> and <code>+</code>) will read <code>(a * ...) + b</code>.</li></ul></li> <li>Therefore, the AST needs to be re-balanced to take the priorities of the multiplication and addition into account. This re-balancing
		leads to the third AST show, where the structure of the AST properly reflects what the user understands.</li>`,Se,oe,Je="Freon understands this kind of tree balancing and will automatically apply them while editing expressions.",Pe,z,Ne,je,re,Ke=`Typical user actions are to <em>create</em> a new element in the AST, to <em>change</em> the content of an element, or to <em>delete</em> an
	element.`,Ae,ae,Qe=`Certainly, these changes may need to be persisted. When the user triggers the menu actions <em>save unit</em> or <em>open unit</em> the AST
	is pushed to or retrieved from a server.`,Le,ce,Me,pe,He;t=new it({props:{prevLink:st,nextLink:lt}});function $t(e){s[1](e)}let Xe={tag:"h1",id:"what-is-projectional-editing-1",$$slots:{default:[St]},$$scope:{ctx:s}};s[0][0]!==void 0&&(Xe.intersecting=s[0][0]),i=new ve({props:Xe}),de.push(()=>$e(i,"intersecting",$t));function vt(e){s[2](e)}let Ze={tag:"h2",id:"projectional-workflow-2",$$slots:{default:[Pt]},$$scope:{ctx:s}};s[0][1]!==void 0&&(Ze.intersecting=s[0][1]),y=new ve({props:Ze}),de.push(()=>$e(y,"intersecting",vt)),M=new Ge({props:{imageName:"background/projection-overview.png",caption:"General flow of projectional editing",figureNumber:1}});function bt(e){s[3](e)}let et={tag:"h2",id:"support-for-expressions-3",$$slots:{default:[jt]},$$scope:{ctx:s}};s[0][2]!==void 0&&(et.intersecting=s[0][2]),E=new ve({props:et}),de.push(()=>$e(E,"intersecting",bt));function wt(e){s[4](e)}let tt={tag:"h2",id:"adding-to-an-existing-expression-4",$$slots:{default:[At]},$$scope:{ctx:s}};s[0][3]!==void 0&&(tt.intersecting=s[0][3]),R=new ve({props:tt}),de.push(()=>$e(R,"intersecting",wt)),ie=new Ge({props:{imageName:"background/expressions-problem.png",caption:"Editing expressions",figureNumber:2}});function Tt(e){s[5](e)}let nt={tag:"h2",id:"persistence-5",$$slots:{default:[Lt]},$$scope:{ctx:s}};return s[0][4]!==void 0&&(nt.intersecting=s[0][4]),z=new ve({props:nt}),de.push(()=>$e(z,"intersecting",Tt)),ce=new Ge({props:{imageName:"background/projection-overview.png",caption:"General flow of projectional editing",figureNumber:3}}),pe=new it({props:{prevLink:st,nextLink:lt}}),{c(){H(t.$$.fragment),n=g(),H(i.$$.fragment),p=g(),m=d("p"),m.textContent=a,f=g(),v=d("p"),v.innerHTML=b,T=g(),H(y.$$.fragment),j=g(),D=d("p"),D.textContent=me,L=g(),H(M.$$.fragment),Y=g(),G=d("ol"),G.innerHTML=he,O=g(),H(E.$$.fragment),W=g(),w=d("p"),w.textContent=u,C=g(),$=d("p"),$.innerHTML=J,U=g(),Z=d("hr"),K=g(),ee=d("p"),ee.textContent=Oe,be=g(),te=d("p"),te.textContent=Ue,we=g(),Te=d("hr"),Ce=g(),ne=d("p"),ne.textContent=Re,ke=g(),H(R.$$.fragment),xe=g(),H(ie.$$.fragment),ye=g(),se=d("p"),se.innerHTML=ze,Ee=g(),le=d("ul"),le.innerHTML=Ye,Se=g(),oe=d("p"),oe.textContent=Je,Pe=g(),H(z.$$.fragment),je=g(),re=d("p"),re.innerHTML=Ke,Ae=g(),ae=d("p"),ae.innerHTML=Qe,Le=g(),H(ce.$$.fragment),Me=g(),H(pe.$$.fragment)},l(e){q(t.$$.fragment,e),n=h(e),q(i.$$.fragment,e),p=h(e),m=_(e,"P",{"data-svelte-h":!0}),A(m)!=="svelte-dr123w"&&(m.textContent=a),f=h(e),v=_(e,"P",{"data-svelte-h":!0}),A(v)!=="svelte-sh1bf5"&&(v.innerHTML=b),T=h(e),q(y.$$.fragment,e),j=h(e),D=_(e,"P",{"data-svelte-h":!0}),A(D)!=="svelte-cv5cb9"&&(D.textContent=me),L=h(e),q(M.$$.fragment,e),Y=h(e),G=_(e,"OL",{"data-svelte-h":!0}),A(G)!=="svelte-17ggp34"&&(G.innerHTML=he),O=h(e),q(E.$$.fragment,e),W=h(e),w=_(e,"P",{"data-svelte-h":!0}),A(w)!=="svelte-1iiabxm"&&(w.textContent=u),C=h(e),$=_(e,"P",{"data-svelte-h":!0}),A($)!=="svelte-2ki2hr"&&($.innerHTML=J),U=h(e),Z=_(e,"HR",{}),K=h(e),ee=_(e,"P",{"data-svelte-h":!0}),A(ee)!=="svelte-1dq5ezt"&&(ee.textContent=Oe),be=h(e),te=_(e,"P",{"data-svelte-h":!0}),A(te)!=="svelte-1gynpk2"&&(te.textContent=Ue),we=h(e),Te=_(e,"HR",{}),Ce=h(e),ne=_(e,"P",{"data-svelte-h":!0}),A(ne)!=="svelte-3x3pih"&&(ne.textContent=Re),ke=h(e),q(R.$$.fragment,e),xe=h(e),q(ie.$$.fragment,e),ye=h(e),se=_(e,"P",{"data-svelte-h":!0}),A(se)!=="svelte-9l3ow2"&&(se.innerHTML=ze),Ee=h(e),le=_(e,"UL",{"data-svelte-h":!0}),A(le)!=="svelte-l4j8l2"&&(le.innerHTML=Ye),Se=h(e),oe=_(e,"P",{"data-svelte-h":!0}),A(oe)!=="svelte-187o7yf"&&(oe.textContent=Je),Pe=h(e),q(z.$$.fragment,e),je=h(e),re=_(e,"P",{"data-svelte-h":!0}),A(re)!=="svelte-18a6i00"&&(re.innerHTML=Ke),Ae=h(e),ae=_(e,"P",{"data-svelte-h":!0}),A(ae)!=="svelte-1b0dqw1"&&(ae.innerHTML=Qe),Le=h(e),q(ce.$$.fragment,e),Me=h(e),q(pe.$$.fragment,e)},m(e,l){F(t,e,l),c(e,n,l),F(i,e,l),c(e,p,l),c(e,m,l),c(e,f,l),c(e,v,l),c(e,T,l),F(y,e,l),c(e,j,l),c(e,D,l),c(e,L,l),F(M,e,l),c(e,Y,l),c(e,G,l),c(e,O,l),F(E,e,l),c(e,W,l),c(e,w,l),c(e,C,l),c(e,$,l),c(e,U,l),c(e,Z,l),c(e,K,l),c(e,ee,l),c(e,be,l),c(e,te,l),c(e,we,l),c(e,Te,l),c(e,Ce,l),c(e,ne,l),c(e,ke,l),F(R,e,l),c(e,xe,l),F(ie,e,l),c(e,ye,l),c(e,se,l),c(e,Ee,l),c(e,le,l),c(e,Se,l),c(e,oe,l),c(e,Pe,l),F(z,e,l),c(e,je,l),c(e,re,l),c(e,Ae,l),c(e,ae,l),c(e,Le,l),F(ce,e,l),c(e,Me,l),F(pe,e,l),He=!0},p(e,[l]){const Ie={};l&128&&(Ie.$$scope={dirty:l,ctx:e}),!r&&l&1&&(r=!0,Ie.intersecting=e[0][0],_e(()=>r=!1)),i.$set(Ie);const Be={};l&128&&(Be.$$scope={dirty:l,ctx:e}),!S&&l&1&&(S=!0,Be.intersecting=e[0][1],_e(()=>S=!1)),y.$set(Be);const De={};l&128&&(De.$$scope={dirty:l,ctx:e}),!x&&l&1&&(x=!0,De.intersecting=e[0][2],_e(()=>x=!1)),E.$set(De);const We={};l&128&&(We.$$scope={dirty:l,ctx:e}),!Fe&&l&1&&(Fe=!0,We.intersecting=e[0][3],_e(()=>Fe=!1)),R.$set(We);const Ve={};l&128&&(Ve.$$scope={dirty:l,ctx:e}),!Ne&&l&1&&(Ne=!0,Ve.intersecting=e[0][4],_e(()=>Ne=!1)),z.$set(Ve)},i(e){He||(N(t.$$.fragment,e),N(i.$$.fragment,e),N(y.$$.fragment,e),N(M.$$.fragment,e),N(E.$$.fragment,e),N(R.$$.fragment,e),N(ie.$$.fragment,e),N(z.$$.fragment,e),N(ce.$$.fragment,e),N(pe.$$.fragment,e),He=!0)},o(e){I(t.$$.fragment,e),I(i.$$.fragment,e),I(y.$$.fragment,e),I(M.$$.fragment,e),I(E.$$.fragment,e),I(R.$$.fragment,e),I(ie.$$.fragment,e),I(z.$$.fragment,e),I(ce.$$.fragment,e),I(pe.$$.fragment,e),He=!1},d(e){e&&(o(n),o(p),o(m),o(f),o(v),o(T),o(j),o(D),o(L),o(Y),o(G),o(O),o(W),o(w),o(C),o($),o(U),o(Z),o(K),o(ee),o(be),o(te),o(we),o(Te),o(Ce),o(ne),o(ke),o(xe),o(ye),o(se),o(Ee),o(le),o(Se),o(oe),o(Pe),o(je),o(re),o(Ae),o(ae),o(Le),o(Me)),B(t,e),B(i,e),B(y,e),B(M,e),B(E,e),B(R,e),B(ie,e),B(z,e),B(ce,e),B(pe,e)}}}let st="/Background/Testimonial",lt="/Background/About_the_Name";function Ht(s,t,n){let i;ut(s,Q,b=>n(6,i=b)),ge(Q,i=[{title:"What is Projectional Editing?",visible:!1,ref:"#what-is-projectional-editing-1"},{title:"Projectional workflow",visible:!1,ref:"#projectional-workflow-2"},{title:"Support For Expressions",visible:!1,ref:"#support-for-expressions-3"},{title:"Adding to an Existing Expression",visible:!1,ref:"#adding-to-an-existing-expression-4"},{title:"Persistence",visible:!1,ref:"#persistence-5"}],i);let r=[];Ct(()=>{document.querySelectorAll("pre").forEach(T=>{const y=document.createElement("div");y.className="copy-prompt";const S=document.createElement("p");S.innerHTML="👆 Click to copy",S.className="copy-prompt-p";const j=document.createElement("img");j.src="/icons/copy-icon.svg",j.className="copy-prompt-img",y.appendChild(j),y.appendChild(S),T.appendChild(y),T.querySelector(".copy-prompt > p").addEventListener("click",D=>{yt(T.querySelector("code").textContent),T.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{T.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function p(b){s.$$.not_equal(r[0],b)&&(r[0]=b,n(0,r))}function m(b){s.$$.not_equal(r[1],b)&&(r[1]=b,n(0,r))}function a(b){s.$$.not_equal(r[2],b)&&(r[2]=b,n(0,r))}function f(b){s.$$.not_equal(r[3],b)&&(r[3]=b,n(0,r))}function v(b){s.$$.not_equal(r[4],b)&&(r[4]=b,n(0,r))}return s.$$.update=()=>{s.$$.dirty&1&&ge(Q,i[0].visible=r[0],i),s.$$.dirty&1&&ge(Q,i[1].visible=r[1],i),s.$$.dirty&1&&ge(Q,i[2].visible=r[2],i),s.$$.dirty&1&&ge(Q,i[3].visible=r[3],i),s.$$.dirty&1&&ge(Q,i[4].visible=r[4],i)},[r,p,m,a,f,v]}class qt extends dt{constructor(t){super(),_t(this,t,Ht,Mt,ft,{})}}function ot(s,t,n){const i=s.slice();return i[6]=t[n],i[8]=n,i}function rt(s,t,n){const i=s.slice();return i[6]=t[n],i[8]=n,i}function Ft(s){let t,n;return{c(){t=d("img"),this.h()},l(i){t=_(i,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){k(t,"class","page-toc-small-img"),ht(t.src,n="/icons/down-arrow.png")||k(t,"src",n),k(t,"alt","arrow down")},m(i,r){c(i,t,r)},d(i){i&&o(t)}}}function Nt(s){let t,n;return{c(){t=d("img"),this.h()},l(i){t=_(i,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){k(t,"class","page-toc-small-img"),ht(t.src,n="/icons/upload.png")||k(t,"src",n),k(t,"alt","arrow up")},m(i,r){c(i,t,r)},d(i){i&&o(t)}}}function at(s){let t,n,i=qe(s[0]),r=[];for(let p=0;p<i.length;p+=1)r[p]=ct(rt(s,i,p));return{c(){t=d("div"),n=d("ul");for(let p=0;p<r.length;p+=1)r[p].c();this.h()},l(p){t=_(p,"DIV",{class:!0});var m=V(t);n=_(m,"UL",{class:!0});var a=V(n);for(let f=0;f<r.length;f+=1)r[f].l(a);a.forEach(o),m.forEach(o),this.h()},h(){k(n,"class","page-ul"),k(t,"class","toc-details")},m(p,m){c(p,t,m),P(t,n);for(let a=0;a<r.length;a+=1)r[a]&&r[a].m(n,null)},p(p,m){if(m&5){i=qe(p[0]);let a;for(a=0;a<i.length;a+=1){const f=rt(p,i,a);r[a]?r[a].p(f,m):(r[a]=ct(f),r[a].c(),r[a].m(n,null))}for(;a<r.length;a+=1)r[a].d(1);r.length=i.length}},d(p){p&&o(t),mt(r,p)}}}function ct(s){let t,n,i=s[6].title+"",r,p,m;return{c(){t=d("li"),n=d("a"),r=fe(i),m=g(),this.h()},l(a){t=_(a,"LI",{class:!0});var f=V(t);n=_(f,"A",{href:!0});var v=V(n);r=ue(v,i),v.forEach(o),m=h(f),f.forEach(o),this.h()},h(){k(n,"href",p=s[6].ref),X(n,"page-visible",s[8]===s[2]),X(n,"page-nonvisible",s[8]!==s[2]),k(t,"class","page-toc-text")},m(a,f){c(a,t,f),P(t,n),P(n,r),P(t,m)},p(a,f){f&1&&i!==(i=a[6].title+"")&&gt(r,i),f&1&&p!==(p=a[6].ref)&&k(n,"href",p),f&4&&X(n,"page-visible",a[8]===a[2]),f&4&&X(n,"page-nonvisible",a[8]!==a[2])},d(a){a&&o(t)}}}function pt(s){let t,n,i=s[6].title+"",r,p,m;return{c(){t=d("li"),n=d("a"),r=fe(i),m=g(),this.h()},l(a){t=_(a,"LI",{class:!0});var f=V(t);n=_(f,"A",{href:!0});var v=V(n);r=ue(v,i),v.forEach(o),m=h(f),f.forEach(o),this.h()},h(){k(n,"href",p=s[6].ref),X(n,"page-visible",s[8]===s[2]),X(n,"page-nonvisible",s[8]!==s[2]),k(t,"class","page-toc-text")},m(a,f){c(a,t,f),P(t,n),P(n,r),P(t,m)},p(a,f){f&1&&i!==(i=a[6].title+"")&&gt(r,i),f&1&&p!==(p=a[6].ref)&&k(n,"href",p),f&4&&X(n,"page-visible",a[8]===a[2]),f&4&&X(n,"page-nonvisible",a[8]!==a[2])},d(a){a&&o(t)}}}function It(s){let t,n,i,r="On this page ...",p,m,a,f,v,b,T,y,S,j,D="On this page",me,L,M,Y,G;function he(u,C){return u[1]?Nt:Ft}let O=he(s),E=O(s),x=s[1]&&at(s);v=new Et({}),T=new qt({});let W=qe(s[0]),w=[];for(let u=0;u<W.length;u+=1)w[u]=pt(ot(s,W,u));return{c(){t=d("div"),n=d("div"),i=d("p"),i.textContent=r,p=g(),m=d("button"),E.c(),a=g(),x&&x.c(),f=g(),H(v.$$.fragment),b=g(),H(T.$$.fragment),y=g(),S=d("nav"),j=d("h3"),j.textContent=D,me=g(),L=d("ul");for(let u=0;u<w.length;u+=1)w[u].c();this.h()},l(u){t=_(u,"DIV",{class:!0});var C=V(t);n=_(C,"DIV",{class:!0});var $=V(n);i=_($,"P",{class:!0,"data-svelte-h":!0}),A(i)!=="svelte-1929lhs"&&(i.textContent=r),p=h($),m=_($,"BUTTON",{class:!0});var J=V(m);E.l(J),J.forEach(o),$.forEach(o),a=h(C),x&&x.l(C),f=h(C),q(v.$$.fragment,C),b=h(C),q(T.$$.fragment,C),C.forEach(o),y=h(u),S=_(u,"NAV",{class:!0});var U=V(S);j=_(U,"H3",{class:!0,"data-svelte-h":!0}),A(j)!=="svelte-1hgt7fi"&&(j.textContent=D),me=h(U),L=_(U,"UL",{class:!0});var Z=V(L);for(let K=0;K<w.length;K+=1)w[K].l(Z);Z.forEach(o),U.forEach(o),this.h()},h(){k(i,"class","page-toc-small-title"),k(m,"class","page-toc-small-expand-button"),k(n,"class","page-toc-small"),k(t,"class","page-main"),k(j,"class","page-toc-title"),k(L,"class","page-ul"),k(S,"class","page-toc")},m(u,C){c(u,t,C),P(t,n),P(n,i),P(n,p),P(n,m),E.m(m,null),P(t,a),x&&x.m(t,null),P(t,f),F(v,t,null),P(t,b),F(T,t,null),c(u,y,C),c(u,S,C),P(S,j),P(S,me),P(S,L);for(let $=0;$<w.length;$+=1)w[$]&&w[$].m(L,null);M=!0,Y||(G=kt(m,"click",s[4]),Y=!0)},p(u,[C]){if(O!==(O=he(u))&&(E.d(1),E=O(u),E&&(E.c(),E.m(m,null))),u[1]?x?x.p(u,C):(x=at(u),x.c(),x.m(t,f)):x&&(x.d(1),x=null),C&5){W=qe(u[0]);let $;for($=0;$<W.length;$+=1){const J=ot(u,W,$);w[$]?w[$].p(J,C):(w[$]=pt(J),w[$].c(),w[$].m(L,null))}for(;$<w.length;$+=1)w[$].d(1);w.length=W.length}},i(u){M||(N(v.$$.fragment,u),N(T.$$.fragment,u),M=!0)},o(u){I(v.$$.fragment,u),I(T.$$.fragment,u),M=!1},d(u){u&&(o(t),o(y),o(S)),E.d(),x&&x.d(),B(v),B(T),mt(w,u),Y=!1,G()}}}function Bt(s,t,n){let i,r;ut(s,Q,v=>n(0,r=v));let p=!1;function m(v){let b=i;for(let T=0;T<v.length;T++)if(v[T].visible)return T;return b}function a(){n(1,p=!p)}const f=()=>{a()};return s.$$.update=()=>{s.$$.dirty&1&&n(2,i=m(r))},[r,p,i,a,f]}class Rt extends dt{constructor(t){super(),_t(this,t,Bt,It,ft,{})}}export{Rt as component};
//# sourceMappingURL=14.CX0xXp-i.js.map
