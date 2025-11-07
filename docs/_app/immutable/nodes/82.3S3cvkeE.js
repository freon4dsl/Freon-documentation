import{f as g,a as p,t as W,e as we}from"../chunks/nks1QWJh.js";import{y as ce,G as de,x as A,z as me,u as t,A as D,g as n,I as ie,B as R,a as k,$ as Ge,v as T,s as fe,w as u}from"../chunks/bZIXIZs8.js";import{d as qe,i as N,s as se}from"../chunks/DANOUgWt.js";import{e as Y,p as Se,i as Le,s as pe}from"../chunks/CKHUE_gp.js";import{h as Ee}from"../chunks/DCXhKCCG.js";import{h as Me}from"../chunks/aX-frc9G.js";import{s}from"../chunks/BpSVRMQn.js";import{o as ke}from"../chunks/D62n5Z03.js";import{P as le,S as z,c as Ce,B as Pe}from"../chunks/CFDUsp8k.js";const Ne=async({parent:S})=>{const{site:e,category:f}=await S();return{site:e,category:f,page:{title:"Generic Types — Example Typer Definition",description:"Learn how to define a typer for generic types and units of measurement in Freon. Explore infertype, equalsto, and conformsto rules and how type concepts connect to AST nodes.",tags:["Freon","typer","generic types","measurement units","infertype","equalsto","conformsto","TT_GenericType","TT_MeasurementType","GenericType","UnitOfMeasurement","type system","example"],modifiedTime:"2025-11-07T17:20:18.642Z",publishedTime:"2025-11-07T17:20:18.642Z"}}},nt=Object.freeze(Object.defineProperty({__proto__:null,load:Ne},Symbol.toStringTag,{value:"Module"}));var Be=g(`<!> <!> <p>This example shows how <strong>generic types</strong> and <strong>units of measurement</strong> can be defined.</p> <!> <p>Once the structure of the example language is defined, we can focus on its <strong>typer definition</strong>.<br/> In Freon, types do <strong>not</strong> reside inside the AST—they are defined separately.<br/> We therefore need to associate a <strong>type concept</strong> with each relevant AST concept.</p> <h3 id="the-type-concepts-1">The Type Concepts</h3> <p>First, we define type concepts that correspond to the AST’s <code>GenericType</code> and <code>UnitOfMeasurement</code>.<br/> They are similar to their AST counterparts, but note that here we use <strong>FreType</strong> as the property type.
We want to build a <strong>hierarchy of type concepts</strong>, not AST nodes.</p> <pre class="language-freon"><code class="language-freon">// TyperExample/src/defs/projectY.type#L6-L14

type TT_GenericType &#123;
    base: FreType;
    kind: GenericKind;
&#125;

type TT_MeasurementType &#123;
    base: FreType;
    unit: UnitKind;
&#125;</code></pre> <h3 id="the-infertype-rules-2">The Infertype Rules</h3> <p>Next, we associate AST nodes with their corresponding type concepts using <strong>infertype</strong> rules.<br/> When invoked, these rules create new instances of the type concepts.</p> <pre class="language-freon"><code class="language-freon">// TyperExample/src/defs/projectY.type#L34-L46

GenericType &#123;
    infertype TT_GenericType &#123;
        base: typeof(self.baseType),
        kind: self.kind
    &#125;;
&#125;

UnitOfMeasurement &#123;
    infertype TT_MeasurementType &#123;
        base: typeof(self.baseType),
        unit: self.unit
    &#125;;
&#125;</code></pre> <h3 id="the-conforms-and-equals-rules-3">The Conforms and Equals Rules</h3> <p>To compare expression types with declared types, we define <strong>equalsto</strong> and <strong>conformsto</strong> rules.</p> <pre class="language-freon"><code class="language-freon">// TyperExample/src/defs/projectY.type#L91-L118

TT_GenericType &#123;
    equalsto x:TT_GenericType where &#123;
            x.base equalsto self.base;
            x.kind equalsto self.kind;
        &#125;;
    conformsto other:TT_GenericType where &#123;
            // both conditions must be true
            self.base conformsto other.base;
            self.kind conformsto other.kind;
        &#125;;
&#125;

GenericKind &#123;
    Set conformsto #GenericKind:Collection;
    Sequence conformsto #GenericKind:Collection;
    Bag conformsto #GenericKind:Collection;
&#125;

TT_MeasurementType &#123;
    equalsto aap:TT_MeasurementType where &#123;
            aap.base equalsto self.base;
            aap.unit equalsto self.unit;
        &#125;;
    conformsto rr:TT_MeasurementType where &#123;
            self.base conformsto rr.base;
            self.unit equalsto rr.unit;
        &#125;;
&#125;</code></pre> <!> <pre class="language-freon"><code class="language-freon">// TyperExample/src/defs/projectY.type

typer

// What are types?
istype &#123; TopType &#125;

type TT_GenericType &#123;
    base: FreType;
    kind: GenericKind;
&#125;

type TT_MeasurementType &#123;
    base: FreType;
    unit: UnitKind;
&#125;

// Which concepts have a type?
hastype &#123; Exp, TypeUsage &#125;

// What are the top and bottom types?
anytype &#123;
    conformsto #PredefinedType:ANY; // PredefinedType:ANY is the least specific type
&#125;

PredefinedType &#123;
    NULL conformsto anytype; // PredefinedType:NULL is the most specific type
    NUMBER conformsto #PredefinedType:STRING;
&#125;

// Which type does an expression have?
TypeRef &#123;
    infertype self.type;
&#125;

GenericType &#123;
    infertype TT_GenericType &#123;
        base: typeof(self.baseType),
        kind: self.kind
    &#125;;
&#125;

UnitOfMeasurement &#123;
    infertype TT_MeasurementType &#123;
        base: typeof(self.baseType),
        unit: self.unit
    &#125;;
&#125;

NumberLiteral &#123;
    infertype #PredefinedType:NUMBER;
&#125;

StringLiteral &#123;
    infertype #PredefinedType:STRING;
&#125;

BooleanLiteral &#123;
    infertype #PredefinedType:BOOLEAN;
&#125;

NamedExp &#123;
    infertype self.myType;
&#125;

PlusExp &#123;
    infertype commonSuperType(self.left, self.right);
&#125;

UnitLiteral &#123;
    // 62 kilogram, or 112 miles
    infertype TT_MeasurementType &#123;
                  base: typeof(self.inner),
                  unit: self.unit
              &#125;;
&#125;

GenericLiteral &#123;
    // Set&#123; 12, 14, 16, 18 &#125;
    infertype TT_GenericType &#123;
        base: typeof(self.content),
        kind: self.kind
    &#125;;
&#125;

// Which types are 'equal' to each other?
NamedType &#123;
    equalsto aa:NamedType where &#123;
            aa.name equalsto self.name;
        &#125;;
&#125;

TT_GenericType &#123;
    equalsto x:TT_GenericType where &#123;
            x.base equalsto self.base;
            x.kind equalsto self.kind;
        &#125;;
    conformsto other:TT_GenericType where &#123;
            // both conditions must be true
            self.base conformsto other.base;
            self.kind conformsto other.kind;
        &#125;;
&#125;

GenericKind &#123;
    Set conformsto #GenericKind:Collection;
    Sequence conformsto #GenericKind:Collection;
    Bag conformsto #GenericKind:Collection;
&#125;

TT_MeasurementType &#123;
    equalsto aap:TT_MeasurementType where &#123;
            aap.base equalsto self.base;
            aap.unit equalsto self.unit;
        &#125;;
    conformsto rr:TT_MeasurementType where &#123;
            self.base conformsto rr.base;
            self.unit equalsto rr.unit;
        &#125;;
&#125;
</code></pre> <!>`,1);function Oe(S,e){ce(e,!0);const f=de({});ke(()=>{document.querySelectorAll("pre").forEach(l=>{const o=document.createElement("div");o.className="copy-prompt";const C=document.createElement("p");C.innerHTML="👆 Click to copy",C.className="copy-prompt-p";const M=document.createElement("img");M.src="/icons/copy-icon.svg",M.className="copy-prompt-img",o.appendChild(M),o.appendChild(C),l.appendChild(o),l.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{l.querySelector("code")?.textContent!==null&&l.querySelector("code")?.textContent!==void 0&&Ce(l.querySelector("code").textContent),l.querySelector(".copy-prompt > p")?.innerHTML!==null&&l.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(l.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{l.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let x="/Examples/Generic_Types/The_TyperExample_DSL",h="/Examples/External_Components";var B=Be(),w=A(B);le(w,{prevLink:x,nextLink:h});var G=t(w,2);z(G,{tag:"h1",id:"generic-types--example-typer-definition-1",onIntersectChange:r=>e.setVisible("generic-types--example-typer-definition-1",r),get intersecting(){return f["generic-types--example-typer-definition-1"]},set intersecting(r){f["generic-types--example-typer-definition-1"]=r},children:(r,l)=>{D();var o=W("Generic Types — Example Typer Definition");p(r,o)},$$slots:{default:!0}});var L=t(G,4);z(L,{tag:"h2",id:"the-typer-definition-of-the-example-language-2",onIntersectChange:r=>e.setVisible("the-typer-definition-of-the-example-language-2",r),get intersecting(){return f["the-typer-definition-of-the-example-language-2"]},set intersecting(r){f["the-typer-definition-of-the-example-language-2"]=r},children:(r,l)=>{D();var o=W("The Typer Definition of the Example Language");p(r,o)},$$slots:{default:!0}});var E=t(L,22);z(E,{tag:"h2",id:"the-complete-typer-definition-3",onIntersectChange:r=>e.setVisible("the-complete-typer-definition-3",r),get intersecting(){return f["the-complete-typer-definition-3"]},set intersecting(r){f["the-complete-typer-definition-3"]=r},children:(r,l)=>{D();var o=W("The Complete Typer Definition");p(r,o)},$$slots:{default:!0}});var K=t(E,4);le(K,{prevLink:x,nextLink:h}),p(S,B),me()}var Ae=g('<meta property="article:published_time"/>'),Ke=g('<meta property="article:modified_time"/>'),Ue=g('<meta property="article:tag"/>'),Ie=g('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),je=(S,e)=>{fe(e,!n(e))},Fe=g('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),We=g('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),De=g('<li class="page-toc-text"><a> </a></li>'),Re=g('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ye=g('<li class="page-toc-text"><a> </a></li>'),ze=g('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function at(S,e){ce(e,!0);let f=ie(!1);const x=de([{id:"generic-types--example-typer-definition-1",title:"Generic Types — Example Typer Definition",visible:!1,ref:"#generic-types--example-typer-definition-1"},{id:"the-typer-definition-of-the-example-language-2",title:"The Typer Definition of the Example Language",visible:!1,ref:"#the-typer-definition-of-the-example-language-2"},{id:"the-complete-typer-definition-3",title:"The Complete Typer Definition",visible:!1,ref:"#the-complete-typer-definition-3"}]);let h=ie(0);function B(a,i){const y=x.find(c=>c.id===a);y&&(y.visible=i);const d=x.findIndex(c=>c.visible);d>=0&&fe(h,d,!0)}const w=R(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),G=R(()=>e.data.page.description??e.data.category.description),L="https://freon4dsl.dev/images/freon-banner.png";let E=R(()=>{const a=Se.url.pathname;return`https://freon4dsl.dev${a==="/"?"/":a.replace(/\/$/,"")}`});const K=e.data.site?.tags??[],r=e.data.category?.tags??[],l=e.data.page.tags??[],o=[...new Set([...K,...r,...l].filter(Boolean))],C={"@context":"https://schema.org","@type":"WebPage",headline:n(w),description:n(G),url:n(E),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:o.length?o.join(", "):void 0,image:L,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var M=ze();Me(a=>{var i=Ie(),y=A(i),d=t(y,4),c=t(d,2);{var q=m=>{var b=Ae();k(()=>s(b,"content",e.data.page.publishedTime)),p(m,b)};N(c,m=>{e.data.page.publishedTime&&m(q)})}var v=t(c,2);{var _=m=>{var b=Ke();k(()=>s(b,"content",e.data.page.modifiedTime)),p(m,b)};N(v,m=>{e.data.page.modifiedTime&&m(_)})}var P=t(v,2);{var F=m=>{var b=we(),_e=A(b);Y(_e,17,()=>o,Le,(be,xe)=>{var oe=Ue();k(()=>s(oe,"content",n(xe))),p(be,oe)}),p(m,b)};N(P,m=>{o&&m(F)})}var O=t(P,2),Q=t(O,4),X=t(Q,2),$=t(X,2),ee=t($,2);s(ee,"content",L);var te=t(ee,2),ne=t(te,4),ae=t(ne,2),re=t(ae,2);s(re,"content",L);var ve=t(re,2);Ee(ve,()=>`<script type="application/ld+json">${JSON.stringify(C)}<\/script>`),k(m=>{Ge.title=n(w)??"",s(y,"content",n(G)),s(d,"href",n(E)),s(O,"content",m),s(Q,"content",n(w)),s(X,"content",n(G)),s($,"content",e.data.site.title),s(te,"content",n(E)),s(ne,"content",n(w)),s(ae,"content",n(G))},[()=>o.join(", ")]),p(a,i)});var U=A(M),I=T(U),j=t(T(I),2);j.__click=[je,f];var ye=T(j);{var ue=a=>{var i=Fe();p(a,i)},ge=a=>{var i=We();p(a,i)};N(ye,a=>{n(f)?a(ue):a(ge,!1)})}u(j),u(I);var H=t(I,2);{var Te=a=>{var i=Re(),y=T(i);Y(y,22,()=>x,d=>d,(d,c,q)=>{var v=De(),_=T(v);let P;var F=T(_,!0);u(_),u(v),k(O=>{s(_,"href",c.ref),P=pe(_,1,"",null,P,O),se(F,c.title)},[()=>({"page-visible":n(q)===n(h),"page-nonvisible":n(q)!==n(h)})]),p(d,v)}),u(y),u(i),p(a,i)};N(H,a=>{n(f)&&a(Te)})}var V=t(H,2);Pe(V,{});var he=t(V,2);Oe(he,{setVisible:B}),u(U);var Z=t(U,2),J=t(T(Z),2);Y(J,22,()=>x,a=>a,(a,i,y)=>{var d=Ye(),c=T(d);let q;var v=T(c,!0);u(c),u(d),k(_=>{s(c,"href",i.ref),q=pe(c,1,"",null,q,_),se(v,i.title)},[()=>({"page-visible":n(y)===n(h),"page-nonvisible":n(y)!==n(h)})]),p(a,d)}),u(J),u(Z),p(S,M),me()}qe(["click"]);export{at as component,nt as universal};
//# sourceMappingURL=82.3S3cvkeE.js.map
