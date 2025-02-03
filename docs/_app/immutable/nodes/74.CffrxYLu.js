import{s as Ce,A as de,a as T,e as y,H as pe,f as $,b as _,m as F,d as L,F as oe,g as c,h,i as u,B as ge,v as Le,x as me,w as qe,t as ie,o as re,j as E,C as Ae,D as Se,E as R,q as Ue,p as Ne}from"../chunks/scheduler.CIEH-92L.js";import{S as De,i as Pe,e as he,c as V,a as z,m as J,t as Q,b as Z,d as ee}from"../chunks/index.HLF2pGCU.js";import{e as ce}from"../chunks/each.BLebZWAa.js";import{w as Ke}from"../chunks/index.bxqR-5-s.js";import{P as ye,S as _e,c as He,B as Re}from"../chunks/index.CLjbMqgA.js";const se=Ke([]);function Ie(l){let e;return{c(){e=ie("The Metamodel Definition of the Example Language")},l(s){e=re(s,"The Metamodel Definition of the Example Language")},m(s,n){u(s,e,n)},d(s){s&&c(e)}}}function Oe(l){let e;return{c(){e=ie("The Complete AST Definition")},l(s){e=re(s,"The Complete AST Definition")},m(s,n){u(s,e,n)},d(s){s&&c(e)}}}function je(l){let e,s,n,p,i,m,t=`To explain the type definition, we first need the metamodel of the example language. Below is the complete .ast file. But first, let’s
	explain some highlights.`,o,f,N=`Every type in the list of <em>expression</em> - <em>declared type</em> pairs is an instance of the AST concept <strong>TypeUsage</strong>,
	which comes in two flavours: a type declaration, and a type reference, that holds a reference to another AST node.`,w,U,S,q=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.ast#L18-L26
</span>
<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">TypeUsage</span> &#123; <span class="token comment">// to be used wherever a type can be used, either a referred type of or declared type is correct
</span>&#125;

<span class="token keyword">concept</span> <span class="token class-name">TypeRef</span> <span class="token keyword">base</span> <span class="token class-name">TypeUsage</span>  &#123;
    <span class="token keyword">reference</span> <span class="token keyword">type</span>: <span class="token class-name">NamedType</span>;
&#125;

<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">TypeDecl</span> <span class="token keyword">base</span> <span class="token class-name">TypeUsage</span> &#123;
&#125;</code>`,I,D,G=`There are also two options for a type declaration, a generic type, and a unit of measurement. For this example, we have used the names of
	the generic types from the Object Constraint Language: Set, Bag, Sequence, and Collection. Note that these declarations are part of the
	AST. They are not type concepts themselves.`,A,P,O,ne=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.ast#L37-L47
</span>
<span class="token keyword">concept</span> <span class="token class-name">GenericType</span> <span class="token keyword">base</span> <span class="token class-name">TypeDecl</span> &#123;
    baseType: <span class="token class-name">TypeUsage</span>;
    kind: <span class="token class-name">GenericKind</span>; <span class="token comment">// is it a set, sequence, bag, or anything else
</span>&#125;
<span class="token keyword">limited</span> <span class="token class-name">GenericKind</span> &#123; Set; Sequence; Bag; Collection; &#125;

<span class="token keyword">concept</span> <span class="token class-name">UnitOfMeasurement</span> <span class="token keyword">base</span> <span class="token class-name">TypeDecl</span> &#123;
    <span class="token keyword">reference</span> baseType: <span class="token class-name">PredefinedType</span>; <span class="token comment">// is always NUMBER!!
</span>    unit: <span class="token class-name">UnitKind</span>; <span class="token comment">// is it measured in km, kWh, grams, or anything else
</span>&#125;
<span class="token keyword">limited</span> <span class="token class-name">UnitKind</span> &#123; Meters; Grams; kWh; Hours; &#125;</code>`,K,x,b=`The definitions of the expressions in the example language are straightforward. There are literal expressions for strings, booleans, and
	number, as well as generic literals and unit literals.`,M,g,r,v=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.ast#L61-L75
</span>
<span class="token keyword">expression</span> BooleanLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    xx: <span class="token builtin">boolean</span>;
&#125;

<span class="token keyword">expression</span> UnitLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    <span class="token comment">// 62 kilogram, or 112 miles
</span>    inner: <span class="token class-name">NumberLiteral</span>;
    unit: <span class="token class-name">UnitKind</span>;
&#125;

<span class="token keyword">expression</span> GenericLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    <span class="token comment">// Set&#123; 12, 14, 16, 18 &#125;
</span>    content: <span class="token class-name">Exp</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;</code>`,d,C,H,j,B,ae,Me=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.ast
</span>
language projectY

<span class="token keyword">model</span> <span class="token class-name">XX</span> &#123;
    units: <span class="token class-name">XXunit</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">XXunit</span> &#123;
    lines: <span class="token class-name">ExpWithType</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"expr"</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">ExpWithType</span> &#123;
    expr: <span class="token class-name">Exp</span>;
    <span class="token keyword">type</span>: <span class="token class-name">TypeUsage</span>;
&#125;

<span class="token comment">// definitions of types
</span><span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">TypeUsage</span> &#123; <span class="token comment">// to be used wherever a type can be used, either a referred type of or declared type is correct
</span>&#125;

<span class="token keyword">concept</span> <span class="token class-name">TypeRef</span> <span class="token keyword">base</span> <span class="token class-name">TypeUsage</span>  &#123;
    <span class="token keyword">reference</span> <span class="token keyword">type</span>: <span class="token class-name">NamedType</span>;
&#125;

<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">TypeDecl</span> <span class="token keyword">base</span> <span class="token class-name">TypeUsage</span> &#123;
&#125;

<span class="token keyword">interface</span> <span class="token class-name">TopType</span> &#123;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">NamedType</span> <span class="token keyword">implements</span> <span class="token class-name">TopType</span> &#123;
    name: <span class="token builtin">identifier</span>;
&#125;

<span class="token keyword">limited</span> PredefinedType <span class="token keyword">base</span> <span class="token class-name">NamedType</span> &#123; NUMBER; BOOLEAN; STRING; ANY; NULL; &#125;

<span class="token keyword">concept</span> <span class="token class-name">GenericType</span> <span class="token keyword">base</span> <span class="token class-name">TypeDecl</span> &#123;
    baseType: <span class="token class-name">TypeUsage</span>;
    kind: <span class="token class-name">GenericKind</span>; <span class="token comment">// is it a set, sequence, bag, or anything else
</span>&#125;
<span class="token keyword">limited</span> <span class="token class-name">GenericKind</span> &#123; Set; Sequence; Bag; Collection; &#125;

<span class="token keyword">concept</span> <span class="token class-name">UnitOfMeasurement</span> <span class="token keyword">base</span> <span class="token class-name">TypeDecl</span> &#123;
    <span class="token keyword">reference</span> baseType: <span class="token class-name">PredefinedType</span>; <span class="token comment">// is always NUMBER!!
</span>    unit: <span class="token class-name">UnitKind</span>; <span class="token comment">// is it measured in km, kWh, grams, or anything else
</span>&#125;
<span class="token keyword">limited</span> <span class="token class-name">UnitKind</span> &#123; Meters; Grams; kWh; Hours; &#125;

<span class="token comment">// definitions of expressions
</span><span class="token keyword">abstract</span> <span class="token keyword">expression</span> <span class="token class-name">Exp</span> &#123;
&#125;

<span class="token keyword">expression</span> NumberLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    xx: <span class="token builtin">number</span>;
&#125;

<span class="token keyword">expression</span> StringLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    xx: <span class="token builtin">string</span>;
&#125;

<span class="token keyword">expression</span> BooleanLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    xx: <span class="token builtin">boolean</span>;
&#125;

<span class="token keyword">expression</span> UnitLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    <span class="token comment">// 62 kilogram, or 112 miles
</span>    inner: <span class="token class-name">NumberLiteral</span>;
    unit: <span class="token class-name">UnitKind</span>;
&#125;

<span class="token keyword">expression</span> GenericLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    <span class="token comment">// Set&#123; 12, 14, 16, 18 &#125;
</span>    content: <span class="token class-name">Exp</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;


<span class="token keyword">expression</span> NamedExp <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    inner: <span class="token class-name">Exp</span>;
    myType: <span class="token class-name">NamedType</span>;
&#125;

<span class="token keyword">expression</span> PlusExp <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    left: <span class="token class-name">Exp</span>;
    right: <span class="token class-name">Exp</span>;
&#125;
</code>`,te,W,le;e=new ye({props:{prevLink:we,nextLink:be}});function Be(a){l[1](a)}let ke={tag:"h1",id:"the-metamodel-definition-of-the-example-language-1",$$slots:{default:[Ie]},$$scope:{ctx:l}};l[0][0]!==void 0&&(ke.intersecting=l[0][0]),n=new _e({props:ke}),de.push(()=>he(n,"intersecting",Be));function Ge(a){l[2](a)}let fe={tag:"h2",id:"the-complete-ast-definition-2",$$slots:{default:[Oe]},$$scope:{ctx:l}};return l[0][1]!==void 0&&(fe.intersecting=l[0][1]),C=new _e({props:fe}),de.push(()=>he(C,"intersecting",Ge)),W=new ye({props:{prevLink:we,nextLink:be}}),{c(){V(e.$$.fragment),s=T(),V(n.$$.fragment),i=T(),m=y("p"),m.textContent=t,o=T(),f=y("p"),f.innerHTML=N,w=T(),U=y("pre"),S=new pe(!1),I=T(),D=y("p"),D.textContent=G,A=T(),P=y("pre"),O=new pe(!1),K=T(),x=y("p"),x.textContent=b,M=T(),g=y("pre"),r=new pe(!1),d=T(),V(C.$$.fragment),j=T(),B=y("pre"),ae=new pe(!1),te=T(),V(W.$$.fragment),this.h()},l(a){z(e.$$.fragment,a),s=$(a),z(n.$$.fragment,a),i=$(a),m=_(a,"P",{"data-svelte-h":!0}),F(m)!=="svelte-1u5aovc"&&(m.textContent=t),o=$(a),f=_(a,"P",{"data-svelte-h":!0}),F(f)!=="svelte-8bvwgc"&&(f.innerHTML=N),w=$(a),U=_(a,"PRE",{class:!0});var k=L(U);S=oe(k,!1),k.forEach(c),I=$(a),D=_(a,"P",{"data-svelte-h":!0}),F(D)!=="svelte-kuo8wb"&&(D.textContent=G),A=$(a),P=_(a,"PRE",{class:!0});var X=L(P);O=oe(X,!1),X.forEach(c),K=$(a),x=_(a,"P",{"data-svelte-h":!0}),F(x)!=="svelte-tprriv"&&(x.textContent=b),M=$(a),g=_(a,"PRE",{class:!0});var Y=L(g);r=oe(Y,!1),Y.forEach(c),d=$(a),z(C.$$.fragment,a),j=$(a),B=_(a,"PRE",{class:!0});var ue=L(B);ae=oe(ue,!1),ue.forEach(c),te=$(a),z(W.$$.fragment,a),this.h()},h(){S.a=null,h(U,"class","language-freon"),O.a=null,h(P,"class","language-freon"),r.a=null,h(g,"class","language-freon"),ae.a=null,h(B,"class","language-freon")},m(a,k){J(e,a,k),u(a,s,k),J(n,a,k),u(a,i,k),u(a,m,k),u(a,o,k),u(a,f,k),u(a,w,k),u(a,U,k),S.m(q,U),u(a,I,k),u(a,D,k),u(a,A,k),u(a,P,k),O.m(ne,P),u(a,K,k),u(a,x,k),u(a,M,k),u(a,g,k),r.m(v,g),u(a,d,k),J(C,a,k),u(a,j,k),u(a,B,k),ae.m(Me,B),u(a,te,k),J(W,a,k),le=!0},p(a,[k]){const X={};k&16&&(X.$$scope={dirty:k,ctx:a}),!p&&k&1&&(p=!0,X.intersecting=a[0][0],ge(()=>p=!1)),n.$set(X);const Y={};k&16&&(Y.$$scope={dirty:k,ctx:a}),!H&&k&1&&(H=!0,Y.intersecting=a[0][1],ge(()=>H=!1)),C.$set(Y)},i(a){le||(Q(e.$$.fragment,a),Q(n.$$.fragment,a),Q(C.$$.fragment,a),Q(W.$$.fragment,a),le=!0)},o(a){Z(e.$$.fragment,a),Z(n.$$.fragment,a),Z(C.$$.fragment,a),Z(W.$$.fragment,a),le=!1},d(a){a&&(c(s),c(i),c(m),c(o),c(f),c(w),c(U),c(I),c(D),c(A),c(P),c(K),c(x),c(M),c(g),c(d),c(j),c(B),c(te)),ee(e,a),ee(n,a),ee(C,a),ee(W,a)}}}let we="/Examples/Generic_Types",be="/Examples/Generic_Types/The_Typer_Definition";function We(l,e,s){let n;Le(l,se,t=>s(3,n=t)),me(se,n=[{title:"The Metamodel Definition of the Example Language",visible:!1,ref:"#the-metamodel-definition-of-the-example-language-1"},{title:"The Complete AST Definition",visible:!1,ref:"#the-complete-ast-definition-2"}],n);let p=[];qe(()=>{document.querySelectorAll("pre").forEach(o=>{const f=document.createElement("div");f.className="copy-prompt";const N=document.createElement("p");N.innerHTML="👆 Click to copy",N.className="copy-prompt-p";const w=document.createElement("img");w.src="/icons/copy-icon.svg",w.className="copy-prompt-img",f.appendChild(w),f.appendChild(N),o.appendChild(f),o.querySelector(".copy-prompt > p").addEventListener("click",U=>{He(o.querySelector("code").textContent),o.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{o.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function i(t){l.$$.not_equal(p[0],t)&&(p[0]=t,s(0,p))}function m(t){l.$$.not_equal(p[1],t)&&(p[1]=t,s(0,p))}return l.$$.update=()=>{l.$$.dirty&1&&me(se,n[0].visible=p[0],n),l.$$.dirty&1&&me(se,n[1].visible=p[1],n)},[p,i,m]}class Xe extends De{constructor(e){super(),Pe(this,e,We,je,Ce,{})}}function ve(l,e,s){const n=l.slice();return n[6]=e[s],n[8]=s,n}function Te(l,e,s){const n=l.slice();return n[6]=e[s],n[8]=s,n}function Ye(l){let e,s;return{c(){e=y("img"),this.h()},l(n){e=_(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){h(e,"class","page-toc-small-img"),Ne(e.src,s="/icons/down-arrow.png")||h(e,"src",s),h(e,"alt","arrow down")},m(n,p){u(n,e,p)},d(n){n&&c(e)}}}function Fe(l){let e,s;return{c(){e=y("img"),this.h()},l(n){e=_(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){h(e,"class","page-toc-small-img"),Ne(e.src,s="/icons/upload.png")||h(e,"src",s),h(e,"alt","arrow up")},m(n,p){u(n,e,p)},d(n){n&&c(e)}}}function $e(l){let e,s,n=ce(l[0]),p=[];for(let i=0;i<n.length;i+=1)p[i]=xe(Te(l,n,i));return{c(){e=y("div"),s=y("ul");for(let i=0;i<p.length;i+=1)p[i].c();this.h()},l(i){e=_(i,"DIV",{class:!0});var m=L(e);s=_(m,"UL",{class:!0});var t=L(s);for(let o=0;o<p.length;o+=1)p[o].l(t);t.forEach(c),m.forEach(c),this.h()},h(){h(s,"class","page-ul"),h(e,"class","toc-details")},m(i,m){u(i,e,m),E(e,s);for(let t=0;t<p.length;t+=1)p[t]&&p[t].m(s,null)},p(i,m){if(m&5){n=ce(i[0]);let t;for(t=0;t<n.length;t+=1){const o=Te(i,n,t);p[t]?p[t].p(o,m):(p[t]=xe(o),p[t].c(),p[t].m(s,null))}for(;t<p.length;t+=1)p[t].d(1);p.length=n.length}},d(i){i&&c(e),Se(p,i)}}}function xe(l){let e,s,n=l[6].title+"",p,i,m;return{c(){e=y("li"),s=y("a"),p=ie(n),m=T(),this.h()},l(t){e=_(t,"LI",{class:!0});var o=L(e);s=_(o,"A",{href:!0});var f=L(s);p=re(f,n),f.forEach(c),m=$(o),o.forEach(c),this.h()},h(){h(s,"href",i=l[6].ref),R(s,"page-visible",l[8]===l[2]),R(s,"page-nonvisible",l[8]!==l[2]),h(e,"class","page-toc-text")},m(t,o){u(t,e,o),E(e,s),E(s,p),E(e,m)},p(t,o){o&1&&n!==(n=t[6].title+"")&&Ue(p,n),o&1&&i!==(i=t[6].ref)&&h(s,"href",i),o&4&&R(s,"page-visible",t[8]===t[2]),o&4&&R(s,"page-nonvisible",t[8]!==t[2])},d(t){t&&c(e)}}}function Ee(l){let e,s,n=l[6].title+"",p,i,m;return{c(){e=y("li"),s=y("a"),p=ie(n),m=T(),this.h()},l(t){e=_(t,"LI",{class:!0});var o=L(e);s=_(o,"A",{href:!0});var f=L(s);p=re(f,n),f.forEach(c),m=$(o),o.forEach(c),this.h()},h(){h(s,"href",i=l[6].ref),R(s,"page-visible",l[8]===l[2]),R(s,"page-nonvisible",l[8]!==l[2]),h(e,"class","page-toc-text")},m(t,o){u(t,e,o),E(e,s),E(s,p),E(e,m)},p(t,o){o&1&&n!==(n=t[6].title+"")&&Ue(p,n),o&1&&i!==(i=t[6].ref)&&h(s,"href",i),o&4&&R(s,"page-visible",t[8]===t[2]),o&4&&R(s,"page-nonvisible",t[8]!==t[2])},d(t){t&&c(e)}}}function Ve(l){let e,s,n,p="On this page ...",i,m,t,o,f,N,w,U,S,q,I="On this page",D,G,A,P,O;function ne(r,v){return r[1]?Fe:Ye}let K=ne(l),x=K(l),b=l[1]&&$e(l);f=new Re({}),w=new Xe({});let M=ce(l[0]),g=[];for(let r=0;r<M.length;r+=1)g[r]=Ee(ve(l,M,r));return{c(){e=y("div"),s=y("div"),n=y("p"),n.textContent=p,i=T(),m=y("button"),x.c(),t=T(),b&&b.c(),o=T(),V(f.$$.fragment),N=T(),V(w.$$.fragment),U=T(),S=y("nav"),q=y("h3"),q.textContent=I,D=T(),G=y("ul");for(let r=0;r<g.length;r+=1)g[r].c();this.h()},l(r){e=_(r,"DIV",{class:!0});var v=L(e);s=_(v,"DIV",{class:!0});var d=L(s);n=_(d,"P",{class:!0,"data-svelte-h":!0}),F(n)!=="svelte-1929lhs"&&(n.textContent=p),i=$(d),m=_(d,"BUTTON",{class:!0});var C=L(m);x.l(C),C.forEach(c),d.forEach(c),t=$(v),b&&b.l(v),o=$(v),z(f.$$.fragment,v),N=$(v),z(w.$$.fragment,v),v.forEach(c),U=$(r),S=_(r,"NAV",{class:!0});var H=L(S);q=_(H,"H3",{class:!0,"data-svelte-h":!0}),F(q)!=="svelte-1hgt7fi"&&(q.textContent=I),D=$(H),G=_(H,"UL",{class:!0});var j=L(G);for(let B=0;B<g.length;B+=1)g[B].l(j);j.forEach(c),H.forEach(c),this.h()},h(){h(n,"class","page-toc-small-title"),h(m,"class","page-toc-small-expand-button"),h(s,"class","page-toc-small"),h(e,"class","page-main"),h(q,"class","page-toc-title"),h(G,"class","page-ul"),h(S,"class","page-toc")},m(r,v){u(r,e,v),E(e,s),E(s,n),E(s,i),E(s,m),x.m(m,null),E(e,t),b&&b.m(e,null),E(e,o),J(f,e,null),E(e,N),J(w,e,null),u(r,U,v),u(r,S,v),E(S,q),E(S,D),E(S,G);for(let d=0;d<g.length;d+=1)g[d]&&g[d].m(G,null);A=!0,P||(O=Ae(m,"click",l[4]),P=!0)},p(r,[v]){if(K!==(K=ne(r))&&(x.d(1),x=K(r),x&&(x.c(),x.m(m,null))),r[1]?b?b.p(r,v):(b=$e(r),b.c(),b.m(e,o)):b&&(b.d(1),b=null),v&5){M=ce(r[0]);let d;for(d=0;d<M.length;d+=1){const C=ve(r,M,d);g[d]?g[d].p(C,v):(g[d]=Ee(C),g[d].c(),g[d].m(G,null))}for(;d<g.length;d+=1)g[d].d(1);g.length=M.length}},i(r){A||(Q(f.$$.fragment,r),Q(w.$$.fragment,r),A=!0)},o(r){Z(f.$$.fragment,r),Z(w.$$.fragment,r),A=!1},d(r){r&&(c(e),c(U),c(S)),x.d(),b&&b.d(),ee(f),ee(w),Se(g,r),P=!1,O()}}}function ze(l,e,s){let n,p;Le(l,se,f=>s(0,p=f));let i=!1;function m(f){let N=n;for(let w=0;w<f.length;w++)if(f[w].visible)return w;return N}function t(){s(1,i=!i)}const o=()=>{t()};return l.$$.update=()=>{l.$$.dirty&1&&s(2,n=m(p))},[p,i,n,t,o]}class ns extends De{constructor(e){super(),Pe(this,e,ze,Ve,Ce,{})}}export{ns as component};
//# sourceMappingURL=74.CffrxYLu.js.map
