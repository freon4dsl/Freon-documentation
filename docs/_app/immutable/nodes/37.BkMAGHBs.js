import{s as ze,A as ce,a as b,e as v,H as st,f as $,b as k,m as F,d as N,F as it,g as r,h as y,i as u,B as pe,v as Ye,x as le,w as lt,t as Z,o as x,j as E,C as at,D as Je,E as X,q as Ke,p as Qe}from"../chunks/scheduler.CIEH-92L.js";import{S as We,i as Xe,e as fe,c as G,a as U,m as O,t as R,b as V,d as z}from"../chunks/index.HLF2pGCU.js";import{e as $e}from"../chunks/each.BLebZWAa.js";import{w as rt}from"../chunks/index.bxqR-5-s.js";import{P as Ie,S as ue,c as ct,B as pt}from"../chunks/index.CLjbMqgA.js";const Q=rt([]);function ft(s){let t;return{c(){t=Z("Projections to be used Globally")},l(n){t=x(n,"Projections to be used Globally")},m(n,o){u(n,t,o)},d(n){n&&r(t)}}}function ut(s){let t;return{c(){t=Z("Boolean Projections")},l(n){t=x(n,"Boolean Projections")},m(n,o){u(n,t,o)},d(n){n&&r(t)}}}function mt(s){let t;return{c(){t=Z("Projections for Limited Concepts")},l(n){t=x(n,"Projections for Limited Concepts")},m(n,o){u(n,t,o)},d(n){n&&r(t)}}}function dt(s){let t;return{c(){t=Z("Projections for Numbers")},l(n){t=x(n,"Projections for Numbers")},m(n,o){u(n,t,o)},d(n){n&&r(t)}}}function _t(s){let t;return{c(){t=Z("Reference Separator")},l(n){t=x(n,"Reference Separator")},m(n,o){u(n,t,o)},d(n){n&&r(t)}}}function gt(s){let t;return{c(){t=Z("Adding Names of External Components")},l(n){t=x(n,"Adding Names of External Components")},m(n,o){u(n,t,o)},d(n){n&&r(t)}}}function ht(s){let t,n,o,i,c,d,l=`For some concrete syntax elements you may provide a global definition, i.e. these definitions to be used everywhere in the editor. Note
	that this can be done once in the complete set of editors, only in the <em>default</em> editor definition. However, the global definitions
	can be overwritten per property.`,p,_,B=`All global projection definitions need to be within curly brackets (<code>{}</code>) prefixed with the keyword
	<code>global</code>.`,m,P,L,T,M,ee=`The keywords to be used for the boolean <em>true</em> and <em>false</em> values can be defined globally, or you can choose to display
	boolean values as a boolean control. Every option described in
	<a href="/Documentation/Defining_an_Editor/Boolean_Projections">Boolean Projections</a> is allowed.`,S,D,ae=`In the example below, the user will view every boolean property as an inner-switch button with the string <code>YES</code> for the value
	<code>true</code>, and <code>NO</code> for the value <code>false</code>.`,te,I,Y,q=`<code class="language-ts"><span class="token comment">// Insurance/src/defs/editor-main-default.edit#L5-L18</span>

global <span class="token punctuation">&#123;</span>
    <span class="token builtin">boolean</span> inner<span class="token operator">-</span><span class="token keyword">switch</span> <span class="token punctuation">[</span><span class="token constant">YES</span> <span class="token operator">|</span> <span class="token constant">NO</span><span class="token punctuation">]</span> <span class="token comment">// the strings used to display a boolean value, all booleans will default be displayed as an inner switch control</span>
<span class="token comment">//    limited radio</span>
<span class="token comment">//    limited[] checkbox</span>
    <span class="token comment">// number slider  // you can use the slider control as default projection for numbers, but this will not often be the preferred option</span>
    referenceSeparator <span class="token punctuation">[</span><span class="token operator">:</span><span class="token punctuation">]</span> <span class="token comment">// the string that separates the names in a path name, e.g. pack1:cls3:part</span>
    external <span class="token punctuation">&#123;</span>
        AnimatedGif<span class="token punctuation">,</span>
        SMUI_Card<span class="token punctuation">,</span>
        SMUI_Accordion<span class="token punctuation">,</span>
        SMUI_Dialog<span class="token punctuation">,</span>
        DatePicker
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,w,j,C,f,g,h=`To indicate global definitions for limited concepts you can use the keywords <code>limited</code> and <code>limited[]</code> for single
	valued properties and multivalued properties respectively. The keyword(s) must be followed by the options available for limited concepts,
	as described in <a href="/Documentation/Defining_an_Editor/Projections_for_Limited_Concepts">Projections for Limited Concepts</a>.`,A,H,re,W,ne,Te=`To indicate global definitions for properties with type <code>number</code> you can use the keyword <code>number</code>. The keyword must
	be followed by the options available for numbers, as described in
	<a href="/Documentation/Defining_an_Editor/Number_Projections">Number Projections</a>.`,me,J,ve,de,oe,je=`References to other objects may consist of a series of names, like <em>country.city.street.house</em>. The string used to separate these
	names (in the example above ”.”) can be set.`,_e,K,ke,ge,se,Me='Freon offers the possibility to include Svelte components that are defined outside of Freon. These components are called <a href="/Documentation/Customizations/External_Components"><em>external</em></a>. All names of external components need to be declared in the <code>global</code> section.',he,ie,be;t=new Ie({props:{prevLink:Ae,nextLink:Fe}});function Ze(e){s[1](e)}let He={tag:"h1",id:"projections-to-be-used-globally-1",$$slots:{default:[ft]},$$scope:{ctx:s}};s[0][0]!==void 0&&(He.intersecting=s[0][0]),o=new ue({props:He}),ce.push(()=>fe(o,"intersecting",Ze));function xe(e){s[2](e)}let Se={tag:"h2",id:"boolean-projections-2",$$slots:{default:[ut]},$$scope:{ctx:s}};s[0][1]!==void 0&&(Se.intersecting=s[0][1]),P=new ue({props:Se}),ce.push(()=>fe(P,"intersecting",xe));function et(e){s[3](e)}let De={tag:"h2",id:"projections-for-limited-concepts-3",$$slots:{default:[mt]},$$scope:{ctx:s}};s[0][2]!==void 0&&(De.intersecting=s[0][2]),j=new ue({props:De}),ce.push(()=>fe(j,"intersecting",et));function tt(e){s[4](e)}let Ne={tag:"h2",id:"projections-for-numbers-4",$$slots:{default:[dt]},$$scope:{ctx:s}};s[0][3]!==void 0&&(Ne.intersecting=s[0][3]),H=new ue({props:Ne}),ce.push(()=>fe(H,"intersecting",tt));function nt(e){s[5](e)}let qe={tag:"h2",id:"reference-separator-5",$$slots:{default:[_t]},$$scope:{ctx:s}};s[0][4]!==void 0&&(qe.intersecting=s[0][4]),J=new ue({props:qe}),ce.push(()=>fe(J,"intersecting",nt));function ot(e){s[6](e)}let Be={tag:"h2",id:"adding-names-of-external-components-6",$$slots:{default:[gt]},$$scope:{ctx:s}};return s[0][5]!==void 0&&(Be.intersecting=s[0][5]),K=new ue({props:Be}),ce.push(()=>fe(K,"intersecting",ot)),ie=new Ie({props:{prevLink:Ae,nextLink:Fe}}),{c(){G(t.$$.fragment),n=b(),G(o.$$.fragment),c=b(),d=v("p"),d.innerHTML=l,p=b(),_=v("p"),_.innerHTML=B,m=b(),G(P.$$.fragment),T=b(),M=v("p"),M.innerHTML=ee,S=b(),D=v("p"),D.innerHTML=ae,te=b(),I=v("pre"),Y=new st(!1),w=b(),G(j.$$.fragment),f=b(),g=v("p"),g.innerHTML=h,A=b(),G(H.$$.fragment),W=b(),ne=v("p"),ne.innerHTML=Te,me=b(),G(J.$$.fragment),de=b(),oe=v("p"),oe.innerHTML=je,_e=b(),G(K.$$.fragment),ge=b(),se=v("p"),se.innerHTML=Me,he=b(),G(ie.$$.fragment),this.h()},l(e){U(t.$$.fragment,e),n=$(e),U(o.$$.fragment,e),c=$(e),d=k(e,"P",{"data-svelte-h":!0}),F(d)!=="svelte-pldsf1"&&(d.innerHTML=l),p=$(e),_=k(e,"P",{"data-svelte-h":!0}),F(_)!=="svelte-ost8ed"&&(_.innerHTML=B),m=$(e),U(P.$$.fragment,e),T=$(e),M=k(e,"P",{"data-svelte-h":!0}),F(M)!=="svelte-gkj7gc"&&(M.innerHTML=ee),S=$(e),D=k(e,"P",{"data-svelte-h":!0}),F(D)!=="svelte-1lah3e0"&&(D.innerHTML=ae),te=$(e),I=k(e,"PRE",{class:!0});var a=N(I);Y=it(a,!1),a.forEach(r),w=$(e),U(j.$$.fragment,e),f=$(e),g=k(e,"P",{"data-svelte-h":!0}),F(g)!=="svelte-1qqox5m"&&(g.innerHTML=h),A=$(e),U(H.$$.fragment,e),W=$(e),ne=k(e,"P",{"data-svelte-h":!0}),F(ne)!=="svelte-1ix35cx"&&(ne.innerHTML=Te),me=$(e),U(J.$$.fragment,e),de=$(e),oe=k(e,"P",{"data-svelte-h":!0}),F(oe)!=="svelte-15mnzwy"&&(oe.innerHTML=je),_e=$(e),U(K.$$.fragment,e),ge=$(e),se=k(e,"P",{"data-svelte-h":!0}),F(se)!=="svelte-1u6f5t3"&&(se.innerHTML=Me),he=$(e),U(ie.$$.fragment,e),this.h()},h(){Y.a=null,y(I,"class","language-ts")},m(e,a){O(t,e,a),u(e,n,a),O(o,e,a),u(e,c,a),u(e,d,a),u(e,p,a),u(e,_,a),u(e,m,a),O(P,e,a),u(e,T,a),u(e,M,a),u(e,S,a),u(e,D,a),u(e,te,a),u(e,I,a),Y.m(q,I),u(e,w,a),O(j,e,a),u(e,f,a),u(e,g,a),u(e,A,a),O(H,e,a),u(e,W,a),u(e,ne,a),u(e,me,a),O(J,e,a),u(e,de,a),u(e,oe,a),u(e,_e,a),O(K,e,a),u(e,ge,a),u(e,se,a),u(e,he,a),O(ie,e,a),be=!0},p(e,[a]){const ye={};a&256&&(ye.$$scope={dirty:a,ctx:e}),!i&&a&1&&(i=!0,ye.intersecting=e[0][0],pe(()=>i=!1)),o.$set(ye);const we={};a&256&&(we.$$scope={dirty:a,ctx:e}),!L&&a&1&&(L=!0,we.intersecting=e[0][1],pe(()=>L=!1)),P.$set(we);const Ce={};a&256&&(Ce.$$scope={dirty:a,ctx:e}),!C&&a&1&&(C=!0,Ce.intersecting=e[0][2],pe(()=>C=!1)),j.$set(Ce);const Pe={};a&256&&(Pe.$$scope={dirty:a,ctx:e}),!re&&a&1&&(re=!0,Pe.intersecting=e[0][3],pe(()=>re=!1)),H.$set(Pe);const Le={};a&256&&(Le.$$scope={dirty:a,ctx:e}),!ve&&a&1&&(ve=!0,Le.intersecting=e[0][4],pe(()=>ve=!1)),J.$set(Le);const Ee={};a&256&&(Ee.$$scope={dirty:a,ctx:e}),!ke&&a&1&&(ke=!0,Ee.intersecting=e[0][5],pe(()=>ke=!1)),K.$set(Ee)},i(e){be||(R(t.$$.fragment,e),R(o.$$.fragment,e),R(P.$$.fragment,e),R(j.$$.fragment,e),R(H.$$.fragment,e),R(J.$$.fragment,e),R(K.$$.fragment,e),R(ie.$$.fragment,e),be=!0)},o(e){V(t.$$.fragment,e),V(o.$$.fragment,e),V(P.$$.fragment,e),V(j.$$.fragment,e),V(H.$$.fragment,e),V(J.$$.fragment,e),V(K.$$.fragment,e),V(ie.$$.fragment,e),be=!1},d(e){e&&(r(n),r(c),r(d),r(p),r(_),r(m),r(T),r(M),r(S),r(D),r(te),r(I),r(w),r(f),r(g),r(A),r(W),r(ne),r(me),r(de),r(oe),r(_e),r(ge),r(se),r(he)),z(t,e),z(o,e),z(P,e),z(j,e),z(H,e),z(J,e),z(K,e),z(ie,e)}}}let Ae="/Documentation/Defining_an_Editor/Binary_Expressions",Fe="/Documentation/Defining_an_Editor/Buttons";function bt(s,t,n){let o;Ye(s,Q,m=>n(7,o=m)),le(Q,o=[{title:"Projections to be used Globally",visible:!1,ref:"#projections-to-be-used-globally-1"},{title:"Boolean Projections",visible:!1,ref:"#boolean-projections-2"},{title:"Projections for Limited Concepts",visible:!1,ref:"#projections-for-limited-concepts-3"},{title:"Projections for Numbers",visible:!1,ref:"#projections-for-numbers-4"},{title:"Reference Separator",visible:!1,ref:"#reference-separator-5"},{title:"Adding Names of External Components",visible:!1,ref:"#adding-names-of-external-components-6"}],o);let i=[];lt(()=>{document.querySelectorAll("pre").forEach(P=>{const L=document.createElement("div");L.className="copy-prompt";const T=document.createElement("p");T.innerHTML="👆 Click to copy",T.className="copy-prompt-p";const M=document.createElement("img");M.src="/icons/copy-icon.svg",M.className="copy-prompt-img",L.appendChild(M),L.appendChild(T),P.appendChild(L),P.querySelector(".copy-prompt > p").addEventListener("click",ee=>{ct(P.querySelector("code").textContent),P.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{P.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function c(m){s.$$.not_equal(i[0],m)&&(i[0]=m,n(0,i))}function d(m){s.$$.not_equal(i[1],m)&&(i[1]=m,n(0,i))}function l(m){s.$$.not_equal(i[2],m)&&(i[2]=m,n(0,i))}function p(m){s.$$.not_equal(i[3],m)&&(i[3]=m,n(0,i))}function _(m){s.$$.not_equal(i[4],m)&&(i[4]=m,n(0,i))}function B(m){s.$$.not_equal(i[5],m)&&(i[5]=m,n(0,i))}return s.$$.update=()=>{s.$$.dirty&1&&le(Q,o[0].visible=i[0],o),s.$$.dirty&1&&le(Q,o[1].visible=i[1],o),s.$$.dirty&1&&le(Q,o[2].visible=i[2],o),s.$$.dirty&1&&le(Q,o[3].visible=i[3],o),s.$$.dirty&1&&le(Q,o[4].visible=i[4],o),s.$$.dirty&1&&le(Q,o[5].visible=i[5],o)},[i,c,d,l,p,_,B]}class $t extends We{constructor(t){super(),Xe(this,t,bt,ht,ze,{})}}function Ge(s,t,n){const o=s.slice();return o[6]=t[n],o[8]=n,o}function Ue(s,t,n){const o=s.slice();return o[6]=t[n],o[8]=n,o}function vt(s){let t,n;return{c(){t=v("img"),this.h()},l(o){t=k(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){y(t,"class","page-toc-small-img"),Qe(t.src,n="/icons/down-arrow.png")||y(t,"src",n),y(t,"alt","arrow down")},m(o,i){u(o,t,i)},d(o){o&&r(t)}}}function kt(s){let t,n;return{c(){t=v("img"),this.h()},l(o){t=k(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){y(t,"class","page-toc-small-img"),Qe(t.src,n="/icons/upload.png")||y(t,"src",n),y(t,"alt","arrow up")},m(o,i){u(o,t,i)},d(o){o&&r(t)}}}function Oe(s){let t,n,o=$e(s[0]),i=[];for(let c=0;c<o.length;c+=1)i[c]=Re(Ue(s,o,c));return{c(){t=v("div"),n=v("ul");for(let c=0;c<i.length;c+=1)i[c].c();this.h()},l(c){t=k(c,"DIV",{class:!0});var d=N(t);n=k(d,"UL",{class:!0});var l=N(n);for(let p=0;p<i.length;p+=1)i[p].l(l);l.forEach(r),d.forEach(r),this.h()},h(){y(n,"class","page-ul"),y(t,"class","toc-details")},m(c,d){u(c,t,d),E(t,n);for(let l=0;l<i.length;l+=1)i[l]&&i[l].m(n,null)},p(c,d){if(d&5){o=$e(c[0]);let l;for(l=0;l<o.length;l+=1){const p=Ue(c,o,l);i[l]?i[l].p(p,d):(i[l]=Re(p),i[l].c(),i[l].m(n,null))}for(;l<i.length;l+=1)i[l].d(1);i.length=o.length}},d(c){c&&r(t),Je(i,c)}}}function Re(s){let t,n,o=s[6].title+"",i,c,d;return{c(){t=v("li"),n=v("a"),i=Z(o),d=b(),this.h()},l(l){t=k(l,"LI",{class:!0});var p=N(t);n=k(p,"A",{href:!0});var _=N(n);i=x(_,o),_.forEach(r),d=$(p),p.forEach(r),this.h()},h(){y(n,"href",c=s[6].ref),X(n,"page-visible",s[8]===s[2]),X(n,"page-nonvisible",s[8]!==s[2]),y(t,"class","page-toc-text")},m(l,p){u(l,t,p),E(t,n),E(n,i),E(t,d)},p(l,p){p&1&&o!==(o=l[6].title+"")&&Ke(i,o),p&1&&c!==(c=l[6].ref)&&y(n,"href",c),p&4&&X(n,"page-visible",l[8]===l[2]),p&4&&X(n,"page-nonvisible",l[8]!==l[2])},d(l){l&&r(t)}}}function Ve(s){let t,n,o=s[6].title+"",i,c,d;return{c(){t=v("li"),n=v("a"),i=Z(o),d=b(),this.h()},l(l){t=k(l,"LI",{class:!0});var p=N(t);n=k(p,"A",{href:!0});var _=N(n);i=x(_,o),_.forEach(r),d=$(p),p.forEach(r),this.h()},h(){y(n,"href",c=s[6].ref),X(n,"page-visible",s[8]===s[2]),X(n,"page-nonvisible",s[8]!==s[2]),y(t,"class","page-toc-text")},m(l,p){u(l,t,p),E(t,n),E(n,i),E(t,d)},p(l,p){p&1&&o!==(o=l[6].title+"")&&Ke(i,o),p&1&&c!==(c=l[6].ref)&&y(n,"href",c),p&4&&X(n,"page-visible",l[8]===l[2]),p&4&&X(n,"page-nonvisible",l[8]!==l[2])},d(l){l&&r(t)}}}function yt(s){let t,n,o,i="On this page ...",c,d,l,p,_,B,m,P,L,T,M="On this page",ee,S,D,ae,te;function I(f,g){return f[1]?kt:vt}let Y=I(s),q=Y(s),w=s[1]&&Oe(s);_=new pt({}),m=new $t({});let j=$e(s[0]),C=[];for(let f=0;f<j.length;f+=1)C[f]=Ve(Ge(s,j,f));return{c(){t=v("div"),n=v("div"),o=v("p"),o.textContent=i,c=b(),d=v("button"),q.c(),l=b(),w&&w.c(),p=b(),G(_.$$.fragment),B=b(),G(m.$$.fragment),P=b(),L=v("nav"),T=v("h3"),T.textContent=M,ee=b(),S=v("ul");for(let f=0;f<C.length;f+=1)C[f].c();this.h()},l(f){t=k(f,"DIV",{class:!0});var g=N(t);n=k(g,"DIV",{class:!0});var h=N(n);o=k(h,"P",{class:!0,"data-svelte-h":!0}),F(o)!=="svelte-1929lhs"&&(o.textContent=i),c=$(h),d=k(h,"BUTTON",{class:!0});var A=N(d);q.l(A),A.forEach(r),h.forEach(r),l=$(g),w&&w.l(g),p=$(g),U(_.$$.fragment,g),B=$(g),U(m.$$.fragment,g),g.forEach(r),P=$(f),L=k(f,"NAV",{class:!0});var H=N(L);T=k(H,"H3",{class:!0,"data-svelte-h":!0}),F(T)!=="svelte-1hgt7fi"&&(T.textContent=M),ee=$(H),S=k(H,"UL",{class:!0});var re=N(S);for(let W=0;W<C.length;W+=1)C[W].l(re);re.forEach(r),H.forEach(r),this.h()},h(){y(o,"class","page-toc-small-title"),y(d,"class","page-toc-small-expand-button"),y(n,"class","page-toc-small"),y(t,"class","page-main"),y(T,"class","page-toc-title"),y(S,"class","page-ul"),y(L,"class","page-toc")},m(f,g){u(f,t,g),E(t,n),E(n,o),E(n,c),E(n,d),q.m(d,null),E(t,l),w&&w.m(t,null),E(t,p),O(_,t,null),E(t,B),O(m,t,null),u(f,P,g),u(f,L,g),E(L,T),E(L,ee),E(L,S);for(let h=0;h<C.length;h+=1)C[h]&&C[h].m(S,null);D=!0,ae||(te=at(d,"click",s[4]),ae=!0)},p(f,[g]){if(Y!==(Y=I(f))&&(q.d(1),q=Y(f),q&&(q.c(),q.m(d,null))),f[1]?w?w.p(f,g):(w=Oe(f),w.c(),w.m(t,p)):w&&(w.d(1),w=null),g&5){j=$e(f[0]);let h;for(h=0;h<j.length;h+=1){const A=Ge(f,j,h);C[h]?C[h].p(A,g):(C[h]=Ve(A),C[h].c(),C[h].m(S,null))}for(;h<C.length;h+=1)C[h].d(1);C.length=j.length}},i(f){D||(R(_.$$.fragment,f),R(m.$$.fragment,f),D=!0)},o(f){V(_.$$.fragment,f),V(m.$$.fragment,f),D=!1},d(f){f&&(r(t),r(P),r(L)),q.d(),w&&w.d(),z(_),z(m),Je(C,f),ae=!1,te()}}}function wt(s,t,n){let o,i;Ye(s,Q,_=>n(0,i=_));let c=!1;function d(_){let B=o;for(let m=0;m<_.length;m++)if(_[m].visible)return m;return B}function l(){n(1,c=!c)}const p=()=>{l()};return s.$$.update=()=>{s.$$.dirty&1&&n(2,o=d(i))},[i,c,o,l,p]}class jt extends We{constructor(t){super(),Xe(this,t,wt,yt,ze,{})}}export{jt as component};
//# sourceMappingURL=37.BkMAGHBs.js.map
