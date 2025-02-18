import{s as at,A as he,a as v,e as _,H as ve,f as $,b as h,m as B,d as I,F as $e,g as o,h as k,i as c,B as be,r as it,w as _e,v as $t,t as re,o as ce,j as E,C as bt,D as ot,E as Y,q as lt,p as rt}from"../chunks/scheduler.Cra-n4xf.js";import{S as ct,i as pt,e as ke,c as V,a as G,m as z,t as J,b as K,d as Q}from"../chunks/index.Bm95Nbrf.js";import{e as Ne}from"../chunks/stores.Bq7jfj-I.js";import{w as kt}from"../chunks/index.B9cI0ado.js";import{P as Xe,S as Pe,c as Pt,B as yt}from"../chunks/index.DunYcI8q.js";const X=kt([]);function wt(a){let t;return{c(){t=re("Defining Properties")},l(n){t=ce(n,"Defining Properties")},m(n,s){c(n,t,s)},d(n){n&&o(t)}}}function Lt(a){let t;return{c(){t=re("Primitive Properties")},l(n){t=ce(n,"Primitive Properties")},m(n,s){c(n,t,s)},d(n){n&&o(t)}}}function Ct(a){let t;return{c(){t=re("Part Properties")},l(n){t=ce(n,"Part Properties")},m(n,s){c(n,t,s)},d(n){n&&o(t)}}}function Et(a){let t;return{c(){t=re("Reference Properties")},l(n){t=ce(n,"Reference Properties")},m(n,s){c(n,t,s)},d(n){n&&o(t)}}}function Tt(a){let t;return{c(){t=re("Optional Properties")},l(n){t=ce(n,"Optional Properties")},m(n,s){c(n,t,s)},d(n){n&&o(t)}}}function Mt(a){let t,n,s,i,p,f,r=`Each of the language structure elements (concepts, interfaces, expressions, etc.) may have <strong>Properties</strong>.<br/>
	Properties can be lists, this is indicated by square brackets after the type name. There are three types of properties.`,m,g,b,P,C,T=`<strong>Primitive properties</strong> have as type <code>identifier</code>, <code>string</code>, <code>number</code>, or
	<code>boolean</code>, and are always contained in the <em>concept</em>. Primitive properties may also be lists.`,M,R,W,O=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L25-L26
</span>
name: <span class="token builtin">identifier</span>;               <span class="token comment">// internal name
</span>isUnderConstruction: <span class="token builtin">boolean</span>;   // defines whether this <span class="token keyword">base</span> product is still 'raw'</code>`,A,q,pe,Z,D,S=`<strong>Parts</strong> have as type one of the <em>concepts</em> (including <em>expression concepts</em> and <em>limited concepts</em>) or
	interfaces in the language, and are <em>contained in the concept</em> that holds the property (as in the UML composition relationship).
	Parts are also called children. In the example below <code>body</code> and <code>parameters</code> are parts.`,L,H,y,u=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L72-L73
</span>
body: <span class="token class-name">DocuExpression</span>;               <span class="token comment">// the actual calculation definition
</span>parameters: <span class="token class-name">Parameter</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;            // any parameters</code>`,w,d,U,j,N,me=`<strong>References</strong> also have as type one of the <em>concepts</em> or <em>interfaces</em> in the language, but a reference is not
	contained in its <em>concept</em> (as in the UML association relationship). References are indicated by the keyword
	<em>reference</em> in front of the definition.`,ye,x,Ue="References are always by name, therefore the referred concept must have a <code>name</code> property of type <code>identifier</code>.",we,ee,je=`In the following example the concept <code>InsuranceProduct</code> holds a list of references to <code>InsuranceParts</code> in the
	property <code>parts</code>.`,Le,te,Ce,mt=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L53-L65
</span>
<span class="token keyword">concept</span> <span class="token class-name">InsuranceProduct</span> &#123;
    name: <span class="token builtin">identifier</span>;                       <span class="token comment">// internal name
</span>    productName: <span class="token builtin">string</span>;                    <span class="token comment">// name by which this product is known to the public
</span>    themes: <span class="token class-name">InsuranceTheme</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;               <span class="token comment">// the 'kind' of insurance
</span>    advertisedPremium: <span class="token class-name">EuroLiteral</span>;         <span class="token comment">// the premium as known to the public
</span>    nrPremiumDays: <span class="token class-name">PremiumDays</span>;             <span class="token comment">// the number of days for which the advertised premium is calculated
</span>    <span class="token keyword">reference</span> parts: <span class="token class-name">InsurancePart</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;       <span class="token comment">// optionally, known parts can be included by reference
</span>    <span class="token keyword">reference</span> basedOn: <span class="token class-name">BaseProduct</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;       <span class="token comment">// the BaseProducts from which the parts are taken
</span>
    riskAdjustment?: <span class="token class-name">PercentageLiteral</span>;     <span class="token comment">// an adjustment to the risk of the separate parts, e.g. caused by the combination of the parts
</span>    calculation: <span class="token class-name">DocuExpression</span>;            <span class="token comment">// the premium as calculated based on the parts
</span>    helpers: <span class="token class-name">CalcFunction</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;                <span class="token comment">// helper functions used to calculate the premium
</span>&#125;</code>`,Ee,ne,Fe="The concept <code>InsurancePart</code> has a property <code>name: identifier</code>.",Te,se,Me,ut=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L44-L45
</span>
<span class="token keyword">concept</span> <span class="token class-name">InsurancePart</span> &#123;
    name: <span class="token builtin">identifier</span>;                       // internal name</code>`,Ie,F,Oe,He,ae,Ve=`Properties may be optional. This is indicated using a question mark after the property name. Lists are always considered to be optional,
	i.e. they maybe empty, - there is no need for the question mark there.`,qe,ie,Ge="Primitive properties may not be optional at the moment, but we plan to change this in the future.",De,oe,Se,ft=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L70-L70
</span>
description?: <span class="token class-name">Description</span>;          // an optional description</code>`,Re,le,Be;t=new Xe({props:{prevLink:Ye,nextLink:Ze}});function dt(e){a[1](e)}let ze={tag:"h1",id:"defining-properties-1",$$slots:{default:[wt]},$$scope:{ctx:a}};a[0][0]!==void 0&&(ze.intersecting=a[0][0]),s=new Pe({props:ze}),he.push(()=>ke(s,"intersecting",dt));function gt(e){a[2](e)}let Je={tag:"h2",id:"primitive-properties-2",$$slots:{default:[Lt]},$$scope:{ctx:a}};a[0][1]!==void 0&&(Je.intersecting=a[0][1]),g=new Pe({props:Je}),he.push(()=>ke(g,"intersecting",gt));function _t(e){a[3](e)}let Ke={tag:"h2",id:"part-properties-3",$$slots:{default:[Ct]},$$scope:{ctx:a}};a[0][2]!==void 0&&(Ke.intersecting=a[0][2]),q=new Pe({props:Ke}),he.push(()=>ke(q,"intersecting",_t));function ht(e){a[4](e)}let Qe={tag:"h2",id:"reference-properties-4",$$slots:{default:[Et]},$$scope:{ctx:a}};a[0][3]!==void 0&&(Qe.intersecting=a[0][3]),d=new Pe({props:Qe}),he.push(()=>ke(d,"intersecting",ht));function vt(e){a[5](e)}let We={tag:"h2",id:"optional-properties-5",$$slots:{default:[Tt]},$$scope:{ctx:a}};return a[0][4]!==void 0&&(We.intersecting=a[0][4]),F=new Pe({props:We}),he.push(()=>ke(F,"intersecting",vt)),le=new Xe({props:{prevLink:Ye,nextLink:Ze}}),{c(){V(t.$$.fragment),n=v(),V(s.$$.fragment),p=v(),f=_("p"),f.innerHTML=r,m=v(),V(g.$$.fragment),P=v(),C=_("p"),C.innerHTML=T,M=v(),R=_("pre"),W=new ve(!1),A=v(),V(q.$$.fragment),Z=v(),D=_("p"),D.innerHTML=S,L=v(),H=_("pre"),y=new ve(!1),w=v(),V(d.$$.fragment),j=v(),N=_("p"),N.innerHTML=me,ye=v(),x=_("p"),x.innerHTML=Ue,we=v(),ee=_("p"),ee.innerHTML=je,Le=v(),te=_("pre"),Ce=new ve(!1),Ee=v(),ne=_("p"),ne.innerHTML=Fe,Te=v(),se=_("pre"),Me=new ve(!1),Ie=v(),V(F.$$.fragment),He=v(),ae=_("p"),ae.textContent=Ve,qe=v(),ie=_("p"),ie.textContent=Ge,De=v(),oe=_("pre"),Se=new ve(!1),Re=v(),V(le.$$.fragment),this.h()},l(e){G(t.$$.fragment,e),n=$(e),G(s.$$.fragment,e),p=$(e),f=h(e,"P",{"data-svelte-h":!0}),B(f)!=="svelte-1vtow2w"&&(f.innerHTML=r),m=$(e),G(g.$$.fragment,e),P=$(e),C=h(e,"P",{"data-svelte-h":!0}),B(C)!=="svelte-k1mctd"&&(C.innerHTML=T),M=$(e),R=h(e,"PRE",{class:!0});var l=I(R);W=$e(l,!1),l.forEach(o),A=$(e),G(q.$$.fragment,e),Z=$(e),D=h(e,"P",{"data-svelte-h":!0}),B(D)!=="svelte-dtwm4m"&&(D.innerHTML=S),L=$(e),H=h(e,"PRE",{class:!0});var ue=I(H);y=$e(ue,!1),ue.forEach(o),w=$(e),G(d.$$.fragment,e),j=$(e),N=h(e,"P",{"data-svelte-h":!0}),B(N)!=="svelte-zq0g6x"&&(N.innerHTML=me),ye=$(e),x=h(e,"P",{"data-svelte-h":!0}),B(x)!=="svelte-brat2f"&&(x.innerHTML=Ue),we=$(e),ee=h(e,"P",{"data-svelte-h":!0}),B(ee)!=="svelte-o5h0um"&&(ee.innerHTML=je),Le=$(e),te=h(e,"PRE",{class:!0});var fe=I(te);Ce=$e(fe,!1),fe.forEach(o),Ee=$(e),ne=h(e,"P",{"data-svelte-h":!0}),B(ne)!=="svelte-1isa7c6"&&(ne.innerHTML=Fe),Te=$(e),se=h(e,"PRE",{class:!0});var de=I(se);Me=$e(de,!1),de.forEach(o),Ie=$(e),G(F.$$.fragment,e),He=$(e),ae=h(e,"P",{"data-svelte-h":!0}),B(ae)!=="svelte-16vgjs1"&&(ae.textContent=Ve),qe=$(e),ie=h(e,"P",{"data-svelte-h":!0}),B(ie)!=="svelte-170960h"&&(ie.textContent=Ge),De=$(e),oe=h(e,"PRE",{class:!0});var ge=I(oe);Se=$e(ge,!1),ge.forEach(o),Re=$(e),G(le.$$.fragment,e),this.h()},h(){W.a=null,k(R,"class","language-freon"),y.a=null,k(H,"class","language-freon"),Ce.a=null,k(te,"class","language-freon"),Me.a=null,k(se,"class","language-freon"),Se.a=null,k(oe,"class","language-freon")},m(e,l){z(t,e,l),c(e,n,l),z(s,e,l),c(e,p,l),c(e,f,l),c(e,m,l),z(g,e,l),c(e,P,l),c(e,C,l),c(e,M,l),c(e,R,l),W.m(O,R),c(e,A,l),z(q,e,l),c(e,Z,l),c(e,D,l),c(e,L,l),c(e,H,l),y.m(u,H),c(e,w,l),z(d,e,l),c(e,j,l),c(e,N,l),c(e,ye,l),c(e,x,l),c(e,we,l),c(e,ee,l),c(e,Le,l),c(e,te,l),Ce.m(mt,te),c(e,Ee,l),c(e,ne,l),c(e,Te,l),c(e,se,l),Me.m(ut,se),c(e,Ie,l),z(F,e,l),c(e,He,l),c(e,ae,l),c(e,qe,l),c(e,ie,l),c(e,De,l),c(e,oe,l),Se.m(ft,oe),c(e,Re,l),z(le,e,l),Be=!0},p(e,[l]){const ue={};l&128&&(ue.$$scope={dirty:l,ctx:e}),!i&&l&1&&(i=!0,ue.intersecting=e[0][0],be(()=>i=!1)),s.$set(ue);const fe={};l&128&&(fe.$$scope={dirty:l,ctx:e}),!b&&l&1&&(b=!0,fe.intersecting=e[0][1],be(()=>b=!1)),g.$set(fe);const de={};l&128&&(de.$$scope={dirty:l,ctx:e}),!pe&&l&1&&(pe=!0,de.intersecting=e[0][2],be(()=>pe=!1)),q.$set(de);const ge={};l&128&&(ge.$$scope={dirty:l,ctx:e}),!U&&l&1&&(U=!0,ge.intersecting=e[0][3],be(()=>U=!1)),d.$set(ge);const Ae={};l&128&&(Ae.$$scope={dirty:l,ctx:e}),!Oe&&l&1&&(Oe=!0,Ae.intersecting=e[0][4],be(()=>Oe=!1)),F.$set(Ae)},i(e){Be||(J(t.$$.fragment,e),J(s.$$.fragment,e),J(g.$$.fragment,e),J(q.$$.fragment,e),J(d.$$.fragment,e),J(F.$$.fragment,e),J(le.$$.fragment,e),Be=!0)},o(e){K(t.$$.fragment,e),K(s.$$.fragment,e),K(g.$$.fragment,e),K(q.$$.fragment,e),K(d.$$.fragment,e),K(F.$$.fragment,e),K(le.$$.fragment,e),Be=!1},d(e){e&&(o(n),o(p),o(f),o(m),o(P),o(C),o(M),o(R),o(A),o(Z),o(D),o(L),o(H),o(w),o(j),o(N),o(ye),o(x),o(we),o(ee),o(Le),o(te),o(Ee),o(ne),o(Te),o(se),o(Ie),o(He),o(ae),o(qe),o(ie),o(De),o(oe),o(Re)),Q(t,e),Q(s,e),Q(g,e),Q(q,e),Q(d,e),Q(F,e),Q(le,e)}}}let Ye="/Documentation/Creating_the_Metamodel/Language_Structure",Ze="/Documentation/Defining_an_Editor";function It(a,t,n){let s;it(a,X,b=>n(6,s=b)),_e(X,s=[{title:"Defining Properties",visible:!1,ref:"#defining-properties-1"},{title:"Primitive Properties",visible:!1,ref:"#primitive-properties-2"},{title:"Part Properties",visible:!1,ref:"#part-properties-3"},{title:"Reference Properties",visible:!1,ref:"#reference-properties-4"},{title:"Optional Properties",visible:!1,ref:"#optional-properties-5"}],s);let i=[];$t(()=>{document.querySelectorAll("pre").forEach(P=>{const C=document.createElement("div");C.className="copy-prompt";const T=document.createElement("p");T.innerHTML="👆 Click to copy",T.className="copy-prompt-p";const M=document.createElement("img");M.src="/icons/copy-icon.svg",M.className="copy-prompt-img",C.appendChild(M),C.appendChild(T),P.appendChild(C),P.querySelector(".copy-prompt > p").addEventListener("click",R=>{Pt(P.querySelector("code").textContent),P.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{P.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function p(b){a.$$.not_equal(i[0],b)&&(i[0]=b,n(0,i))}function f(b){a.$$.not_equal(i[1],b)&&(i[1]=b,n(0,i))}function r(b){a.$$.not_equal(i[2],b)&&(i[2]=b,n(0,i))}function m(b){a.$$.not_equal(i[3],b)&&(i[3]=b,n(0,i))}function g(b){a.$$.not_equal(i[4],b)&&(i[4]=b,n(0,i))}return a.$$.update=()=>{a.$$.dirty&1&&_e(X,s[0].visible=i[0],s),a.$$.dirty&1&&_e(X,s[1].visible=i[1],s),a.$$.dirty&1&&_e(X,s[2].visible=i[2],s),a.$$.dirty&1&&_e(X,s[3].visible=i[3],s),a.$$.dirty&1&&_e(X,s[4].visible=i[4],s)},[i,p,f,r,m,g]}class Ht extends ct{constructor(t){super(),pt(this,t,It,Mt,at,{})}}function xe(a,t,n){const s=a.slice();return s[6]=t[n],s[8]=n,s}function et(a,t,n){const s=a.slice();return s[6]=t[n],s[8]=n,s}function qt(a){let t,n;return{c(){t=_("img"),this.h()},l(s){t=h(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){k(t,"class","page-toc-small-img"),rt(t.src,n="/icons/down-arrow.png")||k(t,"src",n),k(t,"alt","arrow down")},m(s,i){c(s,t,i)},d(s){s&&o(t)}}}function Dt(a){let t,n;return{c(){t=_("img"),this.h()},l(s){t=h(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){k(t,"class","page-toc-small-img"),rt(t.src,n="/icons/upload.png")||k(t,"src",n),k(t,"alt","arrow up")},m(s,i){c(s,t,i)},d(s){s&&o(t)}}}function tt(a){let t,n,s=Ne(a[0]),i=[];for(let p=0;p<s.length;p+=1)i[p]=nt(et(a,s,p));return{c(){t=_("div"),n=_("ul");for(let p=0;p<i.length;p+=1)i[p].c();this.h()},l(p){t=h(p,"DIV",{class:!0});var f=I(t);n=h(f,"UL",{class:!0});var r=I(n);for(let m=0;m<i.length;m+=1)i[m].l(r);r.forEach(o),f.forEach(o),this.h()},h(){k(n,"class","page-ul"),k(t,"class","toc-details")},m(p,f){c(p,t,f),E(t,n);for(let r=0;r<i.length;r+=1)i[r]&&i[r].m(n,null)},p(p,f){if(f&5){s=Ne(p[0]);let r;for(r=0;r<s.length;r+=1){const m=et(p,s,r);i[r]?i[r].p(m,f):(i[r]=nt(m),i[r].c(),i[r].m(n,null))}for(;r<i.length;r+=1)i[r].d(1);i.length=s.length}},d(p){p&&o(t),ot(i,p)}}}function nt(a){let t,n,s=a[6].title+"",i,p,f;return{c(){t=_("li"),n=_("a"),i=re(s),f=v(),this.h()},l(r){t=h(r,"LI",{class:!0});var m=I(t);n=h(m,"A",{href:!0});var g=I(n);i=ce(g,s),g.forEach(o),f=$(m),m.forEach(o),this.h()},h(){k(n,"href",p=a[6].ref),Y(n,"page-visible",a[8]===a[2]),Y(n,"page-nonvisible",a[8]!==a[2]),k(t,"class","page-toc-text")},m(r,m){c(r,t,m),E(t,n),E(n,i),E(t,f)},p(r,m){m&1&&s!==(s=r[6].title+"")&&lt(i,s),m&1&&p!==(p=r[6].ref)&&k(n,"href",p),m&4&&Y(n,"page-visible",r[8]===r[2]),m&4&&Y(n,"page-nonvisible",r[8]!==r[2])},d(r){r&&o(t)}}}function st(a){let t,n,s=a[6].title+"",i,p,f;return{c(){t=_("li"),n=_("a"),i=re(s),f=v(),this.h()},l(r){t=h(r,"LI",{class:!0});var m=I(t);n=h(m,"A",{href:!0});var g=I(n);i=ce(g,s),g.forEach(o),f=$(m),m.forEach(o),this.h()},h(){k(n,"href",p=a[6].ref),Y(n,"page-visible",a[8]===a[2]),Y(n,"page-nonvisible",a[8]!==a[2]),k(t,"class","page-toc-text")},m(r,m){c(r,t,m),E(t,n),E(n,i),E(t,f)},p(r,m){m&1&&s!==(s=r[6].title+"")&&lt(i,s),m&1&&p!==(p=r[6].ref)&&k(n,"href",p),m&4&&Y(n,"page-visible",r[8]===r[2]),m&4&&Y(n,"page-nonvisible",r[8]!==r[2])},d(r){r&&o(t)}}}function St(a){let t,n,s,i="On this page ...",p,f,r,m,g,b,P,C,T,M,R="On this page",W,O,A,q,pe;function Z(u,w){return u[1]?Dt:qt}let D=Z(a),S=D(a),L=a[1]&&tt(a);g=new yt({}),P=new Ht({});let H=Ne(a[0]),y=[];for(let u=0;u<H.length;u+=1)y[u]=st(xe(a,H,u));return{c(){t=_("div"),n=_("div"),s=_("p"),s.textContent=i,p=v(),f=_("button"),S.c(),r=v(),L&&L.c(),m=v(),V(g.$$.fragment),b=v(),V(P.$$.fragment),C=v(),T=_("nav"),M=_("h3"),M.textContent=R,W=v(),O=_("ul");for(let u=0;u<y.length;u+=1)y[u].c();this.h()},l(u){t=h(u,"DIV",{class:!0});var w=I(t);n=h(w,"DIV",{class:!0});var d=I(n);s=h(d,"P",{class:!0,"data-svelte-h":!0}),B(s)!=="svelte-1929lhs"&&(s.textContent=i),p=$(d),f=h(d,"BUTTON",{class:!0});var U=I(f);S.l(U),U.forEach(o),d.forEach(o),r=$(w),L&&L.l(w),m=$(w),G(g.$$.fragment,w),b=$(w),G(P.$$.fragment,w),w.forEach(o),C=$(u),T=h(u,"NAV",{class:!0});var j=I(T);M=h(j,"H3",{class:!0,"data-svelte-h":!0}),B(M)!=="svelte-1hgt7fi"&&(M.textContent=R),W=$(j),O=h(j,"UL",{class:!0});var N=I(O);for(let me=0;me<y.length;me+=1)y[me].l(N);N.forEach(o),j.forEach(o),this.h()},h(){k(s,"class","page-toc-small-title"),k(f,"class","page-toc-small-expand-button"),k(n,"class","page-toc-small"),k(t,"class","page-main"),k(M,"class","page-toc-title"),k(O,"class","page-ul"),k(T,"class","page-toc")},m(u,w){c(u,t,w),E(t,n),E(n,s),E(n,p),E(n,f),S.m(f,null),E(t,r),L&&L.m(t,null),E(t,m),z(g,t,null),E(t,b),z(P,t,null),c(u,C,w),c(u,T,w),E(T,M),E(T,W),E(T,O);for(let d=0;d<y.length;d+=1)y[d]&&y[d].m(O,null);A=!0,q||(pe=bt(f,"click",a[4]),q=!0)},p(u,[w]){if(D!==(D=Z(u))&&(S.d(1),S=D(u),S&&(S.c(),S.m(f,null))),u[1]?L?L.p(u,w):(L=tt(u),L.c(),L.m(t,m)):L&&(L.d(1),L=null),w&5){H=Ne(u[0]);let d;for(d=0;d<H.length;d+=1){const U=xe(u,H,d);y[d]?y[d].p(U,w):(y[d]=st(U),y[d].c(),y[d].m(O,null))}for(;d<y.length;d+=1)y[d].d(1);y.length=H.length}},i(u){A||(J(g.$$.fragment,u),J(P.$$.fragment,u),A=!0)},o(u){K(g.$$.fragment,u),K(P.$$.fragment,u),A=!1},d(u){u&&(o(t),o(C),o(T)),S.d(),L&&L.d(),Q(g),Q(P),ot(y,u),q=!1,pe()}}}function Rt(a,t,n){let s,i;it(a,X,g=>n(0,i=g));let p=!1;function f(g){let b=s;for(let P=0;P<g.length;P++)if(g[P].visible)return P;return b}function r(){n(1,p=!p)}const m=()=>{r()};return a.$$.update=()=>{a.$$.dirty&1&&n(2,s=f(i))},[i,p,s,r,m]}class jt extends ct{constructor(t){super(),pt(this,t,Rt,St,at,{})}}export{jt as component};
//# sourceMappingURL=22.D10MUm23.js.map
