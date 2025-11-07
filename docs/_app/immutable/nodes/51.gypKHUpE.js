import{f as v,a as c,t as V,e as Te}from"../chunks/nks1QWJh.js";import{y as pe,G as de,x as N,z as me,u as t,A,g as s,I as ie,B as W,a as F,$ as we,v as x,s as ue,w as f}from"../chunks/bZIXIZs8.js";import{d as Se,i as I,s as oe}from"../chunks/DANOUgWt.js";import{e as Z,p as Le,i as Pe,s as ce}from"../chunks/CKHUE_gp.js";import{h as Be}from"../chunks/DCXhKCCG.js";import{h as Ce}from"../chunks/aX-frc9G.js";import{s as o}from"../chunks/BpSVRMQn.js";import{o as Fe}from"../chunks/D62n5Z03.js";import{P as le,S as G,c as ke,B as De}from"../chunks/CFDUsp8k.js";const Ie=async({parent:L})=>{const{site:e,category:u}=await L();return{site:e,category:u,page:{title:"The Expressions DSL",description:"Introduces the Expressions DSL used as an example for Freon’s interpreter framework, explaining its structure, expression concepts, and function definitions.",tags:["expressions","DSL","interpreter","AST","numeric expressions","functions","Freon","DSL development"],modifiedTime:"2025-11-07T17:39:02.389Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},st=Object.freeze(Object.defineProperty({__proto__:null,load:Ie},Symbol.toStringTag,{value:"Module"}));var Me=v(`<!> <!> <p>Before explaining the interpreter framework, we introduce a simple DSL that will serve as our running example. This DSL
will serve as the foundation for illustrating how Freon’s interpreter framework processes and evaluates expressions.
The language defines a single model unit, <code>ExpressionUnit</code>, which contains both function definitions and expressions.
You can explore this language by creating a new Freon project using <code>npm create freon</code>, then selecting the <code>Expressions</code> template.</p> <pre class="language-freon"><code class="language-freon">// Expressions/src/defs/Expressions.ast#L1-L11

language Expressions

model Expressions &#123;
    name: identifier;
    units: ExpressionUnit[];
&#125;

modelunit ExpressionUnit &#123;
    functions: Function[];
    expressions: Expression[];
&#125;</code></pre> <!> <p>We add several basic expression concepts to represent numeric
operations: <code>NumberLiteralExpression</code> and standard binary expressions.
Operator priorities are specified to support straightforward editing (See <a href="/Documentation/Defining_an_Editor/Binary_Expressions">Binary Expressions</a> for details.):</p> <pre class="language-freon"><code class="language-freon">// Expressions/src/defs/Expressions.ast#L15-L40

abstract expression Expression &#123; &#125;

expression NumberLiteralExpression base Expression &#123;
    value: number;
&#125;

abstract binary expression BinaryExpression base Expression &#123;
    left: Expression;
    right: Expression;
&#125;

binary expression MultiplyExpression base BinaryExpression &#123;
    priority = 8;
&#125;

binary expression PlusExpression base BinaryExpression &#123;
    priority = 4;
&#125;

binary expression MinusExpression base BinaryExpression &#123;
    priority = 4;
&#125;

binary expression DivideExpression base BinaryExpression &#123;
    priority = 8;
&#125;</code></pre> <!> <p>We also define concepts to represent functions — both their definitions and calls:</p> <pre class="language-freon"><code class="language-freon">// Expressions/src/defs/Expressions.ast#L42-L61

concept Function &#123;
    name: identifier;
    body: Expression;
    parameters: Parameter[];
    reference declaredType : Type;
&#125;

concept Parameter &#123;
    name: identifier;
    reference declaredType: Type;
&#125;

expression ParameterRef base Expression &#123;
    reference parameter: Parameter;
&#125;

expression FunctionCallExpression base Expression &#123;
    reference calledFunction: Function;
    arguments: Expression[];
&#125;</code></pre> <!>`,1);function qe(L,e){pe(e,!0);const u=de({});Fe(()=>{document.querySelectorAll("pre").forEach(l=>{const r=document.createElement("div");r.className="copy-prompt";const k=document.createElement("p");k.innerHTML="👆 Click to copy",k.className="copy-prompt-p";const C=document.createElement("img");C.src="/icons/copy-icon.svg",C.className="copy-prompt-img",r.appendChild(C),r.appendChild(k),l.appendChild(r),l.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{l.querySelector("code")?.textContent!==null&&l.querySelector("code")?.textContent!==void 0&&ke(l.querySelector("code").textContent),l.querySelector(".copy-prompt > p")?.innerHTML!==null&&l.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(l.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{l.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let E="/Documentation/Interpreter_Framework",y="/Documentation/Interpreter_Framework/Understanding_the_Framework";var M=Me(),T=N(M);le(T,{prevLink:E,nextLink:y});var w=t(T,2);G(w,{tag:"h1",id:"the-expressions-dsl-1",onIntersectChange:n=>e.setVisible("the-expressions-dsl-1",n),get intersecting(){return u["the-expressions-dsl-1"]},set intersecting(n){u["the-expressions-dsl-1"]=n},children:(n,l)=>{A();var r=V("The Expressions DSL");c(n,r)},$$slots:{default:!0}});var P=t(w,6);G(P,{tag:"h2",id:"numeric-expressions-2",onIntersectChange:n=>e.setVisible("numeric-expressions-2",n),get intersecting(){return u["numeric-expressions-2"]},set intersecting(n){u["numeric-expressions-2"]=n},children:(n,l)=>{A();var r=V("Numeric Expressions");c(n,r)},$$slots:{default:!0}});var B=t(P,6);G(B,{tag:"h2",id:"functions-3",onIntersectChange:n=>e.setVisible("functions-3",n),get intersecting(){return u["functions-3"]},set intersecting(n){u["functions-3"]=n},children:(n,l)=>{A();var r=V("Functions");c(n,r)},$$slots:{default:!0}});var j=t(B,6);le(j,{prevLink:E,nextLink:y}),c(L,M),me()}var Ne=v('<meta property="article:published_time"/>'),je=v('<meta property="article:modified_time"/>'),Oe=v('<meta property="article:tag"/>'),ze=v('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),He=(L,e)=>{ue(e,!s(e))},Ue=v('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Ve=v('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ae=v('<li class="page-toc-text"><a> </a></li>'),We=v('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ze=v('<li class="page-toc-text"><a> </a></li>'),Ge=v('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function at(L,e){pe(e,!0);let u=ie(!1);const E=de([{id:"the-expressions-dsl-1",title:"The Expressions DSL",visible:!1,ref:"#the-expressions-dsl-1"},{id:"numeric-expressions-2",title:"Numeric Expressions",visible:!1,ref:"#numeric-expressions-2"},{id:"functions-3",title:"Functions",visible:!1,ref:"#functions-3"}]);let y=ie(0);function M(a,i){const g=E.find(p=>p.id===a);g&&(g.visible=i);const d=E.findIndex(p=>p.visible);d>=0&&ue(y,d,!0)}const T=W(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),w=W(()=>e.data.page.description??e.data.category.description),P="https://freon4dsl.dev/images/freon-banner.png";let B=W(()=>{const a=Le.url.pathname;return`https://freon4dsl.dev${a==="/"?"/":a.replace(/\/$/,"")}`});const j=e.data.site?.tags??[],n=e.data.category?.tags??[],l=e.data.page.tags??[],r=[...new Set([...j,...n,...l].filter(Boolean))],k={"@context":"https://schema.org","@type":"WebPage",headline:s(T),description:s(w),url:s(B),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:r.length?r.join(", "):void 0,image:P,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var C=Ge();Ce(a=>{var i=ze(),g=N(i),d=t(g,4),p=t(d,2);{var S=m=>{var b=Ne();F(()=>o(b,"content",e.data.page.publishedTime)),c(m,b)};I(p,m=>{e.data.page.publishedTime&&m(S)})}var _=t(p,2);{var h=m=>{var b=je();F(()=>o(b,"content",e.data.page.modifiedTime)),c(m,b)};I(_,m=>{e.data.page.modifiedTime&&m(h)})}var D=t(_,2);{var U=m=>{var b=Te(),he=N(b);Z(he,17,()=>r,Pe,(be,Ee)=>{var re=Oe();F(()=>o(re,"content",s(Ee))),c(be,re)}),c(m,b)};I(D,m=>{r&&m(U)})}var q=t(D,2),Q=t(q,4),X=t(Q,2),$=t(X,2),ee=t($,2);o(ee,"content",P);var te=t(ee,2),se=t(te,4),ae=t(se,2),ne=t(ae,2);o(ne,"content",P);var _e=t(ne,2);Be(_e,()=>`<script type="application/ld+json">${JSON.stringify(k)}<\/script>`),F(m=>{we.title=s(T)??"",o(g,"content",s(w)),o(d,"href",s(B)),o(q,"content",m),o(Q,"content",s(T)),o(X,"content",s(w)),o($,"content",e.data.site.title),o(te,"content",s(B)),o(se,"content",s(T)),o(ae,"content",s(w))},[()=>r.join(", ")]),c(a,i)});var O=N(C),z=x(O),H=t(x(z),2);H.__click=[He,u];var ge=x(H);{var fe=a=>{var i=Ue();c(a,i)},ve=a=>{var i=Ve();c(a,i)};I(ge,a=>{s(u)?a(fe):a(ve,!1)})}f(H),f(z);var J=t(z,2);{var xe=a=>{var i=We(),g=x(i);Z(g,22,()=>E,d=>d,(d,p,S)=>{var _=Ae(),h=x(_);let D;var U=x(h,!0);f(h),f(_),F(q=>{o(h,"href",p.ref),D=ce(h,1,"",null,D,q),oe(U,p.title)},[()=>({"page-visible":s(S)===s(y),"page-nonvisible":s(S)!==s(y)})]),c(d,_)}),f(g),f(i),c(a,i)};I(J,a=>{s(u)&&a(xe)})}var R=t(J,2);De(R,{});var ye=t(R,2);qe(ye,{setVisible:M}),f(O);var Y=t(O,2),K=t(x(Y),2);Z(K,22,()=>E,a=>a,(a,i,g)=>{var d=Ze(),p=x(d);let S;var _=x(p,!0);f(p),f(d),F(h=>{o(p,"href",i.ref),S=ce(p,1,"",null,S,h),oe(_,i.title)},[()=>({"page-visible":s(g)===s(y),"page-nonvisible":s(g)!==s(y)})]),c(a,d)}),f(K),f(Y),c(L,C),me()}Se(["click"]);export{at as component,st as universal};
//# sourceMappingURL=51.gypKHUpE.js.map
