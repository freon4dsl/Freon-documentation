import{f,a as l,t as ne,e as Ee}from"../chunks/nks1QWJh.js";import{y as pe,G as de,x as D,z as me,u as a,A as ie,g as t,I as re,B as R,a as k,$ as we,v,s as ge,w as g}from"../chunks/bZIXIZs8.js";import{d as Le,i as B,s as oe}from"../chunks/DANOUgWt.js";import{e as H,p as Se,i as Ue,s as se}from"../chunks/CKHUE_gp.js";import{h as Ne}from"../chunks/DCXhKCCG.js";import{h as ke}from"../chunks/aX-frc9G.js";import{s as r}from"../chunks/BpSVRMQn.js";import{o as Me}from"../chunks/D62n5Z03.js";import{P as le,S as ce,c as Ce,B as Ge}from"../chunks/CFDUsp8k.js";const Be=async({parent:U})=>{const{site:e,category:y}=await U();return{site:e,category:y,page:{title:"The Metamodel Definition of the Example Language",description:"Review the complete AST for a simple language that pairs expressions with declared types. Learn how TypeUsage, TypeRef, TypeDecl, GenericType, and UnitOfMeasurement model generic types and units of measurement.",tags:["Freon","metamodel","AST","TypeUsage","TypeRef","TypeDecl","GenericType","UnitOfMeasurement","GenericKind","UnitKind","PredefinedType","expressions","literals","typer","example language"],modifiedTime:"2025-11-07T17:20:18.642Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},at=Object.freeze(Object.defineProperty({__proto__:null,load:Be},Symbol.toStringTag,{value:"Module"}));var Pe=f(`<!> <!> <p>To explain the type definition, we first need the <strong>metamodel</strong> of the example language.
Below is the complete <code>.ast</code> file—first, a few highlights.</p> <p>Every type in the list of <em>expression – declared type</em> pairs is an instance of the AST
concept <strong>TypeUsage</strong>, which comes in two flavours: a <strong>type reference</strong> (pointing to a named type),
and a <strong>type declaration</strong> (an inline declaration that stands on its own).</p> <pre class="language-freon"><code class="language-freon">// TyperExample/src/defs/projectY.ast#L18-L26

abstract concept TypeUsage &#123; // to be used wherever a type can be used, either a referred type of or declared type is correct
&#125;

concept TypeRef base TypeUsage  &#123;
    reference type: NamedType;
&#125;

abstract concept TypeDecl base TypeUsage &#123;
&#125;</code></pre> <p>There are two options for a type declaration: a <strong>generic type</strong> and a <strong>unit of measurement</strong>.
For this example we borrow the generic kinds from OCL: <code>Set</code>, <code>Bag</code>, <code>Sequence</code>, and <code>Collection</code>.
Note that these are <strong>AST declarations</strong>; they are not type concepts by themselves.</p> <pre class="language-freon"><code class="language-freon">// TyperExample/src/defs/projectY.ast#L37-L47

concept GenericType base TypeDecl &#123;
    baseType: TypeUsage;
    kind: GenericKind; // is it a set, sequence, bag, or anything else
&#125;
limited GenericKind &#123; Set; Sequence; Bag; Collection; &#125;

concept UnitOfMeasurement base TypeDecl &#123;
    reference baseType: PredefinedType; // is always NUMBER!!
    unit: UnitKind; // is it measured in km, kWh, grams, or anything else
&#125;
limited UnitKind &#123; Meters; Grams; kWh; Hours; &#125;</code></pre> <p>The expression definitions are straightforward: literal expressions for
strings, booleans, and numbers, as well as generic literals and unit literals.</p> <pre class="language-freon"><code class="language-freon">// TyperExample/src/defs/projectY.ast#L61-L75

expression BooleanLiteral base Exp &#123;
    xx: boolean;
&#125;

expression UnitLiteral base Exp &#123;
    // 62 kilogram, or 112 miles
    inner: NumberLiteral;
    unit: UnitKind;
&#125;

expression GenericLiteral base Exp &#123;
    // Set&#123; 12, 14, 16, 18 &#125;
    content: Exp[];
    kind: GenericKind;
&#125;</code></pre> <!> <pre class="language-freon"><code class="language-freon">// TyperExample/src/defs/projectY.ast

language projectY

model XX &#123;
    units: XXunit[];
&#125;

modelunit XXunit &#123;
    lines: ExpWithType[];
    file-extension = "expr";
&#125;

concept ExpWithType &#123;
    expr: Exp;
    type: TypeUsage;
&#125;

// definitions of types
abstract concept TypeUsage &#123; // to be used wherever a type can be used, either a referred type of or declared type is correct
&#125;

concept TypeRef base TypeUsage  &#123;
    reference type: NamedType;
&#125;

abstract concept TypeDecl base TypeUsage &#123;
&#125;

interface TopType &#123;
&#125;

concept NamedType implements TopType &#123;
    name: identifier;
&#125;

limited PredefinedType base NamedType &#123; NUMBER; BOOLEAN; STRING; ANY; NULL; &#125;

concept GenericType base TypeDecl &#123;
    baseType: TypeUsage;
    kind: GenericKind; // is it a set, sequence, bag, or anything else
&#125;
limited GenericKind &#123; Set; Sequence; Bag; Collection; &#125;

concept UnitOfMeasurement base TypeDecl &#123;
    reference baseType: PredefinedType; // is always NUMBER!!
    unit: UnitKind; // is it measured in km, kWh, grams, or anything else
&#125;
limited UnitKind &#123; Meters; Grams; kWh; Hours; &#125;

// definitions of expressions
abstract expression Exp &#123;
&#125;

expression NumberLiteral base Exp &#123;
    xx: number;
&#125;

expression StringLiteral base Exp &#123;
    xx: string;
&#125;

expression BooleanLiteral base Exp &#123;
    xx: boolean;
&#125;

expression UnitLiteral base Exp &#123;
    // 62 kilogram, or 112 miles
    inner: NumberLiteral;
    unit: UnitKind;
&#125;

expression GenericLiteral base Exp &#123;
    // Set&#123; 12, 14, 16, 18 &#125;
    content: Exp[];
    kind: GenericKind;
&#125;


expression NamedExp base Exp &#123;
    inner: Exp;
    myType: NamedType;
&#125;

expression PlusExp base Exp &#123;
    left: Exp;
    right: Exp;
&#125;
</code></pre> <!>`,1);function qe(U,e){pe(e,!0);const y=de({});Me(()=>{document.querySelectorAll("pre").forEach(c=>{const u=document.createElement("div");u.className="copy-prompt";const h=document.createElement("p");h.innerHTML="👆 Click to copy",h.className="copy-prompt-p";const C=document.createElement("img");C.src="/icons/copy-icon.svg",C.className="copy-prompt-img",u.appendChild(C),u.appendChild(h),c.appendChild(u),c.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{c.querySelector("code")?.textContent!==null&&c.querySelector("code")?.textContent!==void 0&&Ce(c.querySelector("code").textContent),c.querySelector(".copy-prompt > p")?.innerHTML!==null&&c.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(c.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{c.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let E="/Examples/Generic_Types",T="/Examples/Generic_Types/The_Typer_Definition";var P=Pe(),w=D(P);le(w,{prevLink:E,nextLink:T});var L=a(w,2);ce(L,{tag:"h1",id:"the-metamodel-definition-of-the-example-language-1",onIntersectChange:o=>e.setVisible("the-metamodel-definition-of-the-example-language-1",o),get intersecting(){return y["the-metamodel-definition-of-the-example-language-1"]},set intersecting(o){y["the-metamodel-definition-of-the-example-language-1"]=o},children:(o,c)=>{ie();var u=ne("The Metamodel Definition of the Example Language");l(o,u)},$$slots:{default:!0}});var N=a(L,16);ce(N,{tag:"h2",id:"the-complete-ast-definition-2",onIntersectChange:o=>e.setVisible("the-complete-ast-definition-2",o),get intersecting(){return y["the-complete-ast-definition-2"]},set intersecting(o){y["the-complete-ast-definition-2"]=o},children:(o,c)=>{ie();var u=ne("The Complete AST Definition");l(o,u)},$$slots:{default:!0}});var M=a(N,4);le(M,{prevLink:E,nextLink:T}),l(U,P),me()}var De=f('<meta property="article:published_time"/>'),Ke=f('<meta property="article:modified_time"/>'),Oe=f('<meta property="article:tag"/>'),je=f('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Ae=(U,e)=>{ge(e,!t(e))},Re=f('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),He=f('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ie=f('<li class="page-toc-text"><a> </a></li>'),We=f('<div class="toc-details"><ul class="page-ul"></ul></div>'),Xe=f('<li class="page-toc-text"><a> </a></li>'),Ye=f('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function nt(U,e){pe(e,!0);let y=re(!1);const E=de([{id:"the-metamodel-definition-of-the-example-language-1",title:"The Metamodel Definition of the Example Language",visible:!1,ref:"#the-metamodel-definition-of-the-example-language-1"},{id:"the-complete-ast-definition-2",title:"The Complete AST Definition",visible:!1,ref:"#the-complete-ast-definition-2"}]);let T=re(0);function P(n,i){const m=E.find(s=>s.id===n);m&&(m.visible=i);const p=E.findIndex(s=>s.visible);p>=0&&ge(T,p,!0)}const w=R(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),L=R(()=>e.data.page.description??e.data.category.description),N="https://freon4dsl.dev/images/freon-banner.png";let M=R(()=>{const n=Se.url.pathname;return`https://freon4dsl.dev${n==="/"?"/":n.replace(/\/$/,"")}`});const o=e.data.site?.tags??[],c=e.data.category?.tags??[],u=e.data.page.tags??[],h=[...new Set([...o,...c,...u].filter(Boolean))],C={"@context":"https://schema.org","@type":"WebPage",headline:t(w),description:t(L),url:t(M),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:h.length?h.join(", "):void 0,image:N,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var I=Ye();ke(n=>{var i=je(),m=D(i),p=a(m,4),s=a(p,2);{var S=d=>{var b=De();k(()=>r(b,"content",e.data.page.publishedTime)),l(d,b)};B(s,d=>{e.data.page.publishedTime&&d(S)})}var x=a(s,2);{var _=d=>{var b=Ke();k(()=>r(b,"content",e.data.page.modifiedTime)),l(d,b)};B(x,d=>{e.data.page.modifiedTime&&d(_)})}var G=a(x,2);{var A=d=>{var b=Ee(),xe=D(b);H(xe,17,()=>h,Ue,(_e,be)=>{var ae=Oe();k(()=>r(ae,"content",t(be))),l(_e,ae)}),l(d,b)};B(G,d=>{h&&d(A)})}var q=a(G,2),V=a(q,4),F=a(V,2),Z=a(F,2),J=a(Z,2);r(J,"content",N);var Q=a(J,2),$=a(Q,4),ee=a($,2),te=a(ee,2);r(te,"content",N);var Te=a(te,2);Ne(Te,()=>`<script type="application/ld+json">${JSON.stringify(C)}<\/script>`),k(d=>{we.title=t(w)??"",r(m,"content",t(L)),r(p,"href",t(M)),r(q,"content",d),r(V,"content",t(w)),r(F,"content",t(L)),r(Z,"content",e.data.site.title),r(Q,"content",t(M)),r($,"content",t(w)),r(ee,"content",t(L))},[()=>h.join(", ")]),l(n,i)});var K=D(I),O=v(K),j=a(v(O),2);j.__click=[Ae,y];var fe=v(j);{var ye=n=>{var i=Re();l(n,i)},ue=n=>{var i=He();l(n,i)};B(fe,n=>{t(y)?n(ye):n(ue,!1)})}g(j),g(O);var W=a(O,2);{var he=n=>{var i=We(),m=v(i);H(m,22,()=>E,p=>p,(p,s,S)=>{var x=Ie(),_=v(x);let G;var A=v(_,!0);g(_),g(x),k(q=>{r(_,"href",s.ref),G=se(_,1,"",null,G,q),oe(A,s.title)},[()=>({"page-visible":t(S)===t(T),"page-nonvisible":t(S)!==t(T)})]),l(p,x)}),g(m),g(i),l(n,i)};B(W,n=>{t(y)&&n(he)})}var X=a(W,2);Ge(X,{});var ve=a(X,2);qe(ve,{setVisible:P}),g(K);var Y=a(K,2),z=a(v(Y),2);H(z,22,()=>E,n=>n,(n,i,m)=>{var p=Xe(),s=v(p);let S;var x=v(s,!0);g(s),g(p),k(_=>{r(s,"href",i.ref),S=se(s,1,"",null,S,_),oe(x,i.title)},[()=>({"page-visible":t(m)===t(T),"page-nonvisible":t(m)!==t(T)})]),l(n,p)}),g(z),g(Y),l(U,I),me()}Le(["click"]);export{nt as component,at as universal};
//# sourceMappingURL=81.Cqo4dc0J.js.map
