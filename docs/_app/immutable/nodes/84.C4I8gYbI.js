import{s as Ne,A as _e,a as $,e as _,H as Ge,f as b,b as v,m as B,d as M,F as Re,g as r,h as y,i as m,B as ve,v as Be,x as ue,w as We,t as ie,o as le,j as T,C as Je,D as Fe,E as J,q as De,p as Ae}from"../chunks/scheduler.CIEH-92L.js";import{S as Ve,i as xe,e as $e,c as z,a as O,m as U,t as G,b as R,d as W}from"../chunks/index.HLF2pGCU.js";import{e as me}from"../chunks/each.BLebZWAa.js";import{w as Ke}from"../chunks/index.bxqR-5-s.js";import{P as Te,S as be,c as Ye,B as Qe}from"../chunks/index.CLjbMqgA.js";import{F as Xe}from"../chunks/Figure.ClABA4Sw.js";const se=Ke([]);function Ze(i){let t;return{c(){t=ie("In Need of Scoping")},l(n){t=le(n,"In Need of Scoping")},m(n,s){m(n,t,s)},d(n){n&&r(t)}}}function et(i){let t;return{c(){t=ie("A Simple View on Scoping")},l(n){t=le(n,"A Simple View on Scoping")},m(n,s){m(n,t,s)},d(n){n&&r(t)}}}function tt(i){let t;return{c(){t=ie("Defining name spaces")},l(n){t=le(n,"Defining name spaces")},m(n,s){m(n,t,s)},d(n){n&&r(t)}}}function nt(i){let t,n,s,o,p,u,l=`In this lesson we are going to restrict the references to questions that we can select in the grading of a page to only the questions that
	are on that page. For this, we need to define scope rules.`,a,h,L,C,E,P=`O my, you might think, this is a really difficult subject. But, with Freon we adhere to the philosophy that ”<em>Simple things should be simple, complex things should be possible.</em>” (Read our
	<a href="/Background">Background</a> to find out more.) And in essence, scoping is not difficult at all.`,q,F,ee=`Scoping is about the question of which names are accessible/visible where. In the general case, all names in a context are divided into
	sets. These sets do not overlap, but there are subsets of larger sets, as shown in the next figure.`,H,I,te=`Let’s call the relationship between a name and the smallest possible subset that contains it: the set owns the name. For instance, in the
	figure the name ‘Peter’ is owned by set8. Using common scoping rules, any name is accessible/visible within the set that owns it, and
	within any set that contains the name’s owner, but not in other sets. In the figure the name ‘Peter’ would be accessible/visible in (from
	smallest to largest) set8, set 4, set2, and set1. But it would not be accessible/visible in set3, set5, set6, and set7.`,K,D,V,S,k=`In Freon, we call these sets of names <strong>NameSpaces</strong>. Without any scope definition, in your editor there is just a single
	namespace. It contains all the names present in your model.`,N,d,f,w,g,j="There is a very easy way to define extra name spaces in Freon. Note, however, that any file that defines scoping must have the extension <code>.scope</code>. So, let’s create a file called <code>edu.scope</code>.",x,A,ne=`First, we need to think about our DSL. Which names need to be kept from being seen in certain parts? The problem we had was with names of
	questions that are visible in all pages, also in others than the one on which the names are defined. This means that the concept <code>Page</code>
	is a likely candidate to be a name space. Knowing this, we add the following lines to the <code>edu.scope</code> file.`,oe,Y,ae,je=`<code class="language-freon"><span class="token comment">// Education/lesson6-defs/edu.scope
</span>
scoper EducationScoper for language Education

<span class="token class-name">isnamespace</span> &#123; Page  &#125;
</code>`,re,Q,we=`That’s it. Easy, peasy! You don’t believe it? Just try it out for yourselves, and you will see that in the score only the questions from
	that page can be used.`,ce,X,ye=`In the following lessons we will learn a few more things about scoping. But first we need to define the last model unit, the <em>Test</em>
	unit.`,pe,Z,fe;t=new Te({props:{prevLink:Ee,nextLink:Le}});function ze(e){i[1](e)}let Ce={tag:"h1",id:"in-need-of-scoping-1",$$slots:{default:[Ze]},$$scope:{ctx:i}};i[0][0]!==void 0&&(Ce.intersecting=i[0][0]),s=new be({props:Ce}),_e.push(()=>$e(s,"intersecting",ze));function Oe(e){i[2](e)}let ke={tag:"h2",id:"a-simple-view-on-scoping-2",$$slots:{default:[et]},$$scope:{ctx:i}};i[0][1]!==void 0&&(ke.intersecting=i[0][1]),h=new be({props:ke}),_e.push(()=>$e(h,"intersecting",Oe)),D=new Xe({props:{imageName:"tutorial/Tutorial-lesson6-namespaces.png",caption:"Simple View on Namespaces",figureNumber:1}});function Ue(e){i[3](e)}let Se={tag:"h2",id:"defining-name-spaces-3",$$slots:{default:[tt]},$$scope:{ctx:i}};return i[0][2]!==void 0&&(Se.intersecting=i[0][2]),d=new be({props:Se}),_e.push(()=>$e(d,"intersecting",Ue)),Z=new Te({props:{prevLink:Ee,nextLink:Le}}),{c(){z(t.$$.fragment),n=$(),z(s.$$.fragment),p=$(),u=_("p"),u.textContent=l,a=$(),z(h.$$.fragment),C=$(),E=_("p"),E.innerHTML=P,q=$(),F=_("p"),F.textContent=ee,H=$(),I=_("p"),I.textContent=te,K=$(),z(D.$$.fragment),V=$(),S=_("p"),S.innerHTML=k,N=$(),z(d.$$.fragment),w=$(),g=_("p"),g.innerHTML=j,x=$(),A=_("p"),A.innerHTML=ne,oe=$(),Y=_("pre"),ae=new Ge(!1),re=$(),Q=_("p"),Q.textContent=we,ce=$(),X=_("p"),X.innerHTML=ye,pe=$(),z(Z.$$.fragment),this.h()},l(e){O(t.$$.fragment,e),n=b(e),O(s.$$.fragment,e),p=b(e),u=v(e,"P",{"data-svelte-h":!0}),B(u)!=="svelte-16dpkoc"&&(u.textContent=l),a=b(e),O(h.$$.fragment,e),C=b(e),E=v(e,"P",{"data-svelte-h":!0}),B(E)!=="svelte-1y6xd56"&&(E.innerHTML=P),q=b(e),F=v(e,"P",{"data-svelte-h":!0}),B(F)!=="svelte-14fyq89"&&(F.textContent=ee),H=b(e),I=v(e,"P",{"data-svelte-h":!0}),B(I)!=="svelte-10pvc6q"&&(I.textContent=te),K=b(e),O(D.$$.fragment,e),V=b(e),S=v(e,"P",{"data-svelte-h":!0}),B(S)!=="svelte-1265dtp"&&(S.innerHTML=k),N=b(e),O(d.$$.fragment,e),w=b(e),g=v(e,"P",{"data-svelte-h":!0}),B(g)!=="svelte-1km1e2o"&&(g.innerHTML=j),x=b(e),A=v(e,"P",{"data-svelte-h":!0}),B(A)!=="svelte-1eszi7g"&&(A.innerHTML=ne),oe=b(e),Y=v(e,"PRE",{class:!0});var c=M(Y);ae=Re(c,!1),c.forEach(r),re=b(e),Q=v(e,"P",{"data-svelte-h":!0}),B(Q)!=="svelte-zzp7bu"&&(Q.textContent=we),ce=b(e),X=v(e,"P",{"data-svelte-h":!0}),B(X)!=="svelte-rizhuc"&&(X.innerHTML=ye),pe=b(e),O(Z.$$.fragment,e),this.h()},h(){ae.a=null,y(Y,"class","language-freon")},m(e,c){U(t,e,c),m(e,n,c),U(s,e,c),m(e,p,c),m(e,u,c),m(e,a,c),U(h,e,c),m(e,C,c),m(e,E,c),m(e,q,c),m(e,F,c),m(e,H,c),m(e,I,c),m(e,K,c),U(D,e,c),m(e,V,c),m(e,S,c),m(e,N,c),U(d,e,c),m(e,w,c),m(e,g,c),m(e,x,c),m(e,A,c),m(e,oe,c),m(e,Y,c),ae.m(je,Y),m(e,re,c),m(e,Q,c),m(e,ce,c),m(e,X,c),m(e,pe,c),U(Z,e,c),fe=!0},p(e,[c]){const he={};c&32&&(he.$$scope={dirty:c,ctx:e}),!o&&c&1&&(o=!0,he.intersecting=e[0][0],ve(()=>o=!1)),s.$set(he);const ge={};c&32&&(ge.$$scope={dirty:c,ctx:e}),!L&&c&1&&(L=!0,ge.intersecting=e[0][1],ve(()=>L=!1)),h.$set(ge);const de={};c&32&&(de.$$scope={dirty:c,ctx:e}),!f&&c&1&&(f=!0,de.intersecting=e[0][2],ve(()=>f=!1)),d.$set(de)},i(e){fe||(G(t.$$.fragment,e),G(s.$$.fragment,e),G(h.$$.fragment,e),G(D.$$.fragment,e),G(d.$$.fragment,e),G(Z.$$.fragment,e),fe=!0)},o(e){R(t.$$.fragment,e),R(s.$$.fragment,e),R(h.$$.fragment,e),R(D.$$.fragment,e),R(d.$$.fragment,e),R(Z.$$.fragment,e),fe=!1},d(e){e&&(r(n),r(p),r(u),r(a),r(C),r(E),r(q),r(F),r(H),r(I),r(K),r(V),r(S),r(N),r(w),r(g),r(x),r(A),r(oe),r(Y),r(re),r(Q),r(ce),r(X),r(pe)),W(t,e),W(s,e),W(h,e),W(D,e),W(d,e),W(Z,e)}}}let Ee="/Tutorial/Projections_for_Expressions",Le="/Tutorial/More_Scoping";function st(i,t,n){let s;Be(i,se,a=>n(4,s=a)),ue(se,s=[{title:"In Need of Scoping",visible:!1,ref:"#in-need-of-scoping-1"},{title:"A Simple View on Scoping",visible:!1,ref:"#a-simple-view-on-scoping-2"},{title:"Defining name spaces",visible:!1,ref:"#defining-name-spaces-3"}],s);let o=[];We(()=>{document.querySelectorAll("pre").forEach(h=>{const L=document.createElement("div");L.className="copy-prompt";const C=document.createElement("p");C.innerHTML="👆 Click to copy",C.className="copy-prompt-p";const E=document.createElement("img");E.src="/icons/copy-icon.svg",E.className="copy-prompt-img",L.appendChild(E),L.appendChild(C),h.appendChild(L),h.querySelector(".copy-prompt > p").addEventListener("click",P=>{Ye(h.querySelector("code").textContent),h.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{h.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function p(a){i.$$.not_equal(o[0],a)&&(o[0]=a,n(0,o))}function u(a){i.$$.not_equal(o[1],a)&&(o[1]=a,n(0,o))}function l(a){i.$$.not_equal(o[2],a)&&(o[2]=a,n(0,o))}return i.$$.update=()=>{i.$$.dirty&1&&ue(se,s[0].visible=o[0],s),i.$$.dirty&1&&ue(se,s[1].visible=o[1],s),i.$$.dirty&1&&ue(se,s[2].visible=o[2],s)},[o,p,u,l]}class it extends Ve{constructor(t){super(),xe(this,t,st,nt,Ne,{})}}function Pe(i,t,n){const s=i.slice();return s[6]=t[n],s[8]=n,s}function qe(i,t,n){const s=i.slice();return s[6]=t[n],s[8]=n,s}function lt(i){let t,n;return{c(){t=_("img"),this.h()},l(s){t=v(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){y(t,"class","page-toc-small-img"),Ae(t.src,n="/icons/down-arrow.png")||y(t,"src",n),y(t,"alt","arrow down")},m(s,o){m(s,t,o)},d(s){s&&r(t)}}}function ot(i){let t,n;return{c(){t=_("img"),this.h()},l(s){t=v(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){y(t,"class","page-toc-small-img"),Ae(t.src,n="/icons/upload.png")||y(t,"src",n),y(t,"alt","arrow up")},m(s,o){m(s,t,o)},d(s){s&&r(t)}}}function He(i){let t,n,s=me(i[0]),o=[];for(let p=0;p<s.length;p+=1)o[p]=Ie(qe(i,s,p));return{c(){t=_("div"),n=_("ul");for(let p=0;p<o.length;p+=1)o[p].c();this.h()},l(p){t=v(p,"DIV",{class:!0});var u=M(t);n=v(u,"UL",{class:!0});var l=M(n);for(let a=0;a<o.length;a+=1)o[a].l(l);l.forEach(r),u.forEach(r),this.h()},h(){y(n,"class","page-ul"),y(t,"class","toc-details")},m(p,u){m(p,t,u),T(t,n);for(let l=0;l<o.length;l+=1)o[l]&&o[l].m(n,null)},p(p,u){if(u&5){s=me(p[0]);let l;for(l=0;l<s.length;l+=1){const a=qe(p,s,l);o[l]?o[l].p(a,u):(o[l]=Ie(a),o[l].c(),o[l].m(n,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=s.length}},d(p){p&&r(t),Fe(o,p)}}}function Ie(i){let t,n,s=i[6].title+"",o,p,u;return{c(){t=_("li"),n=_("a"),o=ie(s),u=$(),this.h()},l(l){t=v(l,"LI",{class:!0});var a=M(t);n=v(a,"A",{href:!0});var h=M(n);o=le(h,s),h.forEach(r),u=b(a),a.forEach(r),this.h()},h(){y(n,"href",p=i[6].ref),J(n,"page-visible",i[8]===i[2]),J(n,"page-nonvisible",i[8]!==i[2]),y(t,"class","page-toc-text")},m(l,a){m(l,t,a),T(t,n),T(n,o),T(t,u)},p(l,a){a&1&&s!==(s=l[6].title+"")&&De(o,s),a&1&&p!==(p=l[6].ref)&&y(n,"href",p),a&4&&J(n,"page-visible",l[8]===l[2]),a&4&&J(n,"page-nonvisible",l[8]!==l[2])},d(l){l&&r(t)}}}function Me(i){let t,n,s=i[6].title+"",o,p,u;return{c(){t=_("li"),n=_("a"),o=ie(s),u=$(),this.h()},l(l){t=v(l,"LI",{class:!0});var a=M(t);n=v(a,"A",{href:!0});var h=M(n);o=le(h,s),h.forEach(r),u=b(a),a.forEach(r),this.h()},h(){y(n,"href",p=i[6].ref),J(n,"page-visible",i[8]===i[2]),J(n,"page-nonvisible",i[8]!==i[2]),y(t,"class","page-toc-text")},m(l,a){m(l,t,a),T(t,n),T(n,o),T(t,u)},p(l,a){a&1&&s!==(s=l[6].title+"")&&De(o,s),a&1&&p!==(p=l[6].ref)&&y(n,"href",p),a&4&&J(n,"page-visible",l[8]===l[2]),a&4&&J(n,"page-nonvisible",l[8]!==l[2])},d(l){l&&r(t)}}}function at(i){let t,n,s,o="On this page ...",p,u,l,a,h,L,C,E,P,q,F="On this page",ee,H,I,te,K;function D(f,w){return f[1]?ot:lt}let V=D(i),S=V(i),k=i[1]&&He(i);h=new Qe({}),C=new it({});let N=me(i[0]),d=[];for(let f=0;f<N.length;f+=1)d[f]=Me(Pe(i,N,f));return{c(){t=_("div"),n=_("div"),s=_("p"),s.textContent=o,p=$(),u=_("button"),S.c(),l=$(),k&&k.c(),a=$(),z(h.$$.fragment),L=$(),z(C.$$.fragment),E=$(),P=_("nav"),q=_("h3"),q.textContent=F,ee=$(),H=_("ul");for(let f=0;f<d.length;f+=1)d[f].c();this.h()},l(f){t=v(f,"DIV",{class:!0});var w=M(t);n=v(w,"DIV",{class:!0});var g=M(n);s=v(g,"P",{class:!0,"data-svelte-h":!0}),B(s)!=="svelte-1929lhs"&&(s.textContent=o),p=b(g),u=v(g,"BUTTON",{class:!0});var j=M(u);S.l(j),j.forEach(r),g.forEach(r),l=b(w),k&&k.l(w),a=b(w),O(h.$$.fragment,w),L=b(w),O(C.$$.fragment,w),w.forEach(r),E=b(f),P=v(f,"NAV",{class:!0});var x=M(P);q=v(x,"H3",{class:!0,"data-svelte-h":!0}),B(q)!=="svelte-1hgt7fi"&&(q.textContent=F),ee=b(x),H=v(x,"UL",{class:!0});var A=M(H);for(let ne=0;ne<d.length;ne+=1)d[ne].l(A);A.forEach(r),x.forEach(r),this.h()},h(){y(s,"class","page-toc-small-title"),y(u,"class","page-toc-small-expand-button"),y(n,"class","page-toc-small"),y(t,"class","page-main"),y(q,"class","page-toc-title"),y(H,"class","page-ul"),y(P,"class","page-toc")},m(f,w){m(f,t,w),T(t,n),T(n,s),T(n,p),T(n,u),S.m(u,null),T(t,l),k&&k.m(t,null),T(t,a),U(h,t,null),T(t,L),U(C,t,null),m(f,E,w),m(f,P,w),T(P,q),T(P,ee),T(P,H);for(let g=0;g<d.length;g+=1)d[g]&&d[g].m(H,null);I=!0,te||(K=Je(u,"click",i[4]),te=!0)},p(f,[w]){if(V!==(V=D(f))&&(S.d(1),S=V(f),S&&(S.c(),S.m(u,null))),f[1]?k?k.p(f,w):(k=He(f),k.c(),k.m(t,a)):k&&(k.d(1),k=null),w&5){N=me(f[0]);let g;for(g=0;g<N.length;g+=1){const j=Pe(f,N,g);d[g]?d[g].p(j,w):(d[g]=Me(j),d[g].c(),d[g].m(H,null))}for(;g<d.length;g+=1)d[g].d(1);d.length=N.length}},i(f){I||(G(h.$$.fragment,f),G(C.$$.fragment,f),I=!0)},o(f){R(h.$$.fragment,f),R(C.$$.fragment,f),I=!1},d(f){f&&(r(t),r(E),r(P)),S.d(),k&&k.d(),W(h),W(C),Fe(d,f),te=!1,K()}}}function rt(i,t,n){let s,o;Be(i,se,h=>n(0,o=h));let p=!1;function u(h){let L=s;for(let C=0;C<h.length;C++)if(h[C].visible)return C;return L}function l(){n(1,p=!p)}const a=()=>{l()};return i.$$.update=()=>{i.$$.dirty&1&&n(2,s=u(o))},[o,p,s,l,a]}class gt extends Ve{constructor(t){super(),xe(this,t,rt,at,Ne,{})}}export{gt as component};
//# sourceMappingURL=84.C4I8gYbI.js.map
