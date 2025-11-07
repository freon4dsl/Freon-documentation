import{f as v,a as o,t as f,e as Le}from"../chunks/nks1QWJh.js";import{y as he,G as fe,x as G,z as ve,u as a,A as u,g as r,I as pe,B as R,a as O,$ as Ie,v as b,s as ye,w as x}from"../chunks/bZIXIZs8.js";import{d as Ee,i as H,s as me}from"../chunks/DANOUgWt.js";import{e as K,p as Ce,i as Pe,s as ue}from"../chunks/CKHUE_gp.js";import{h as Se}from"../chunks/DCXhKCCG.js";import{h as Me}from"../chunks/aX-frc9G.js";import{s as p}from"../chunks/BpSVRMQn.js";import{o as Be}from"../chunks/D62n5Z03.js";import{P as ge,S as E,c as De,B as ke}from"../chunks/CFDUsp8k.js";import{N as X}from"../chunks/B1swYv4A.js";const Ae=async({parent:B})=>{const{site:t,category:s}=await B();return{site:t,category:s,page:{title:"The Language Structure",description:"Understand the main structural elements of a Freon language definition, including models, model units, concepts, expression concepts, binary expression concepts, limited concepts, and interfaces.",tags:["language structure","metamodel","model units","concepts","expression concepts","binary expressions","limited concepts","interfaces","Freon","DSL development"],modifiedTime:"2025-11-07T18:57:06.823Z",publishedTime:"2025-11-07T17:20:18.610Z"}}},ot=Object.freeze(Object.defineProperty({__proto__:null,load:Ae},Symbol.toStringTag,{value:"Module"}));var Ne=v(`<p>It is good practice to have all expression concepts inherit from one single root concept. This make it easy 
to have any type of expression as a part of the expression that you want to define.</p> <p>For instance, when defining a bracketed expression, i.e. an expression surrounded by brackets, you can 
simply use the root expression concept as type of the property that is to be put between the brackets.</p>`,1),Oe=v(`<!> <!> <!> <p>A <em>model</em> is the root of the abstract syntax tree.
It may hold any number of model units as children. These model units may be of different types. For instance, you
can have model units that define the items in a home automation system, and other model units that define the rules
that apply in this system.</p> <!> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L7-L10

model InsuranceModel &#123;
    parts: Part[];              // units that hold partial definitions of insurance products
    products: Product[];        // units that hold sellable insurance products
&#125;</code></pre> <!> <p>A <em>model unit</em> is a part of the model that can be edited by the user independently of the rest of the model. A model unit is
always a direct child of a model. Model units may not extend other units, or implement interfaces.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L12-L15

modelunit Part &#123;
    part: BaseProduct;          // one collection of partial insurance products
    file-extension = "base";    // the file extension used by the parser
&#125;</code></pre> <p>Model units have one special entry called <code>file-extension</code>, as shown in the example above. This is an optional
indication of the file type that the generated parser will associate with this model unit, i.e. an
instance of the above model unit will be exported/imported to/from a file with extension ‘.base’.</p> <!> <p>A <em>concept</em> is the basic element of your language definition. It defines which instances can be present in
a model created by your users.</p> <p>Concepts may extend one other concept using the keyword <code>base</code>, and implement multiple interfaces.
Furthermore, they may be <em>abstract</em>.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L24-L28

concept BaseProduct &#123;
    name: identifier;               // internal name
    isUnderConstruction: boolean;   // defines whether this base product is still 'raw'
    theme: InsuranceTheme;          // the 'kind' of insurance
    parts: InsurancePart[];         // all parts of this product</code></pre> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L106-L112

    Percentage;
&#125;

limited NumberType implements NamedType &#123;
    Number;
&#125;
</code></pre> <!> <p>An <em>expression concept</em> is a concept represents an expression. The editor deals differently with these, in
order to give your user a more natural editing experience.</p> <p>Expression concepts may extend another concept, and implement multiple interfaces.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-expressions.ast#L10-L18

abstract expression Literal base DocuExpression &#123;
&#125;
expression EuroLiteral base Literal &#123;
    euros: number;
    cents: number;
&#125;
expression NumberLiteral base Literal &#123;
    value: number;
&#125;</code></pre> <!> <!> <p>A <em>binary expression concept</em> is an expression concept that has two sub-expressions, <code>left</code> and <code>right</code> operands,
and an operator, which in the concrete syntax is shown in the middle. For example, the expression <code>4 + 5</code> has as left operand <code>4</code>, as operator <code>+</code>, and as right operand <code>5</code>.</p> <p>Any concrete binary expression concept needs to have a priority. For example, in mathematics the
priority of the multiplication is higher than the priority of addition. The expression 5 + 67 * 8
should be read as 5 + (67 * 8), not as (5 + 67) * 8. The priorities are used by Freon to balance the
abstract syntax tree (See <a href="/Background/Projectional_Editing#adding-to-an-existing-expression-4">Projectional Editing</a>). In <a href="/Documentation/Defining_an_Editor/Ease_of_Editing">Ease of Editing</a> you can
find more information on how to set the concrete syntax for the operand.</p> <p>Binary expression concepts may extend one other concept, and implement multiple interfaces.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-expressions.ast#L26-L46

// Basic binary expressions: plus, minus, multiply, divide
abstract binary expression BinaryExpression base DocuExpression &#123;
    left: DocuExpression;
    right: DocuExpression;
&#125;

binary expression PlusExpression base BinaryExpression &#123;
    priority = 4;
&#125;

binary expression MinusExpression base BinaryExpression &#123;
    priority = 4;
&#125;

binary expression MultiplyExpression base BinaryExpression &#123;
    priority = 8;
&#125;

binary expression DivideExpression base BinaryExpression &#123;
    priority = 8;
&#125;</code></pre> <!> <p>A <em>limited concept</em> defines a fixed set of predefined instances. Actually, it is an extended
version of an enumeration. All instances become part of the standard library of your language.</p> <p>A limited concept must always have a name property (<code>name: identifier;</code>), but if this is not provided
in the definition then it is automatically created. Furthermore, when a predefined instance does not provide a
value for the name, the name given in the .ast file is used. In this manner, you can define simple enumerations.</p> <p>Limited concepts may extend another concept, and implement multiple interfaces. Note that the definition of the concept
includes the definition of the predefined instances. For example, the instances of <code>PremiumDays</code> are <code>Week</code>, <code>Month</code>, <code>Quarter</code>, <code>Semester</code>, and <code>Year</code>.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L129-L146

limited InsuranceTheme &#123;        // limited defined as a simple enumeration
    HomeTheme; HealthTheme; LegalTheme;
&#125;

limited PremiumDays &#123;           // limited with various options
    // if the 'name' property was not provided, it would have been generated
    name: identifier;
    nrOfDays: number;
    // notations 'name:' and '"name":' are both correct
    Week = &#123; name: "Week", nrOfDays: 7 &#125;
    Month = &#123; "name": "Month", nrOfDays: 30 &#125;
    // the following instance gets the name "Quarter"
    Quarter = &#123; nrOfDays: 91 &#125;
    // the following instance gets the name "Semester"
    Semester = &#123; nrOfDays: 182 &#125;
    // the following instance gets the name "Year"
    Year = &#123; nrOfDays: 365 &#125;
&#125;</code></pre> <!> <!> <p>An <em>interface</em> is a concept that has no instances. It may extend multiple other interfaces.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L96-L99

// concepts can implement interfaces.
interface NamedType &#123;
    name: identifier;
&#125;</code></pre> <p>The next section will explain the options for concept properties.</p> <!>`,1);function qe(B,t){he(t,!0);const s=fe({});Be(()=>{document.querySelectorAll("pre").forEach(i=>{const n=document.createElement("div");n.className="copy-prompt";const l=document.createElement("p");l.innerHTML="👆 Click to copy",l.className="copy-prompt-p";const V=document.createElement("img");V.src="/icons/copy-icon.svg",V.className="copy-prompt-img",n.appendChild(V),n.appendChild(l),i.appendChild(n),i.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{i.querySelector("code")?.textContent!==null&&i.querySelector("code")?.textContent!==void 0&&De(i.querySelector("code").textContent),i.querySelector(".copy-prompt > p")?.innerHTML!==null&&i.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(i.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{i.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let C="/Documentation/Creating_the_Metamodel",_="/Documentation/Creating_the_Metamodel/Defining_Properties";var z=Oe(),P=G(z);ge(P,{prevLink:C,nextLink:_});var S=a(P,2);E(S,{tag:"h1",id:"the-language-structure-1",onIntersectChange:e=>t.setVisible("the-language-structure-1",e),get intersecting(){return s["the-language-structure-1"]},set intersecting(e){s["the-language-structure-1"]=e},children:(e,i)=>{u();var n=f("The Language Structure");o(e,n)},$$slots:{default:!0}});var D=a(S,2);E(D,{tag:"h2",id:"model-2",onIntersectChange:e=>t.setVisible("model-2",e),get intersecting(){return s["model-2"]},set intersecting(e){s["model-2"]=e},children:(e,i)=>{u();var n=f("Model");o(e,n)},$$slots:{default:!0}});var k=a(D,4);X(k,{header:n=>{u();var l=f("Models are never explicit in an editor");o(n,l)},content:n=>{u();var l=f(`The model is never shown in an editor as a whole.
It is always shown in parts: the model units. However, the provided web app does 'show' the model and the units, that are
part of it, in its left panel.`);o(n,l)},$$slots:{header:!0,content:!0}});var W=a(k,4);E(W,{tag:"h2",id:"model-unit-3",onIntersectChange:e=>t.setVisible("model-unit-3",e),get intersecting(){return s["model-unit-3"]},set intersecting(e){s["model-unit-3"]=e},children:(e,i)=>{u();var n=f("Model unit");o(e,n)},$$slots:{default:!0}});var Q=a(W,8);E(Q,{tag:"h2",id:"concept-4",onIntersectChange:e=>t.setVisible("concept-4",e),get intersecting(){return s["concept-4"]},set intersecting(e){s["concept-4"]=e},children:(e,i)=>{u();var n=f("Concept");o(e,n)},$$slots:{default:!0}});var U=a(Q,10);E(U,{tag:"h2",id:"expression-concept-5",onIntersectChange:e=>t.setVisible("expression-concept-5",e),get intersecting(){return s["expression-concept-5"]},set intersecting(e){s["expression-concept-5"]=e},children:(e,i)=>{u();var n=f("Expression Concept");o(e,n)},$$slots:{default:!0}});var w=a(U,8);{const e=n=>{u();var l=f("Use a Single Root of the Expression AST");o(n,l)},i=n=>{var l=Ne();u(2),o(n,l)};X(w,{header:e,content:i,header2:e,content2:i,$$slots:{header2:!0,content2:!0}})}var Y=a(w,2);E(Y,{tag:"h2",id:"binary-expression-concept-6",onIntersectChange:e=>t.setVisible("binary-expression-concept-6",e),get intersecting(){return s["binary-expression-concept-6"]},set intersecting(e){s["binary-expression-concept-6"]=e},children:(e,i)=>{u();var n=f("Binary Expression Concept");o(e,n)},$$slots:{default:!0}});var q=a(Y,10);E(q,{tag:"h2",id:"limited-concept-7",onIntersectChange:e=>t.setVisible("limited-concept-7",e),get intersecting(){return s["limited-concept-7"]},set intersecting(e){s["limited-concept-7"]=e},children:(e,i)=>{u();var n=f("Limited Concept");o(e,n)},$$slots:{default:!0}});var A=a(q,10);{const e=n=>{u();var l=f("No quotes around numbers and booleans.");o(n,l)},i=n=>{u();var l=f(`For number and boolean types, quotes (double or single) are not allowed around the values of properties of
instances of limited concepts.`);o(n,l)};X(A,{header:e,content:i,header3:e,content3:i,$$slots:{header3:!0,content3:!0}})}var N=a(A,2);E(N,{tag:"h2",id:"interface-8",onIntersectChange:e=>t.setVisible("interface-8",e),get intersecting(){return s["interface-8"]},set intersecting(e){s["interface-8"]=e},children:(e,i)=>{u();var n=f("Interface");o(e,n)},$$slots:{default:!0}});var F=a(N,8);ge(F,{prevLink:C,nextLink:_}),o(B,z),ve()}var Fe=v('<meta property="article:published_time"/>'),Ve=v('<meta property="article:modified_time"/>'),je=v('<meta property="article:tag"/>'),He=v('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),ze=(B,t)=>{ye(t,!r(t))},We=v('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Qe=v('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ue=v('<li class="page-toc-text"><a> </a></li>'),Ye=v('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ze=v('<li class="page-toc-text"><a> </a></li>'),Ge=v('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function rt(B,t){he(t,!0);let s=pe(!1);const C=fe([{id:"the-language-structure-1",title:"The Language Structure",visible:!1,ref:"#the-language-structure-1"},{id:"model-2",title:"Model",visible:!1,ref:"#model-2"},{id:"model-unit-3",title:"Model unit",visible:!1,ref:"#model-unit-3"},{id:"concept-4",title:"Concept",visible:!1,ref:"#concept-4"},{id:"expression-concept-5",title:"Expression Concept",visible:!1,ref:"#expression-concept-5"},{id:"binary-expression-concept-6",title:"Binary Expression Concept",visible:!1,ref:"#binary-expression-concept-6"},{id:"limited-concept-7",title:"Limited Concept",visible:!1,ref:"#limited-concept-7"},{id:"interface-8",title:"Interface",visible:!1,ref:"#interface-8"}]);let _=pe(0);function z(c,d){const y=C.find(m=>m.id===c);y&&(y.visible=d);const g=C.findIndex(m=>m.visible);g>=0&&ye(_,g,!0)}const P=R(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),S=R(()=>t.data.page.description??t.data.category.description),D="https://freon4dsl.dev/images/freon-banner.png";let k=R(()=>{const c=Ce.url.pathname;return`https://freon4dsl.dev${c==="/"?"/":c.replace(/\/$/,"")}`});const W=t.data.site?.tags??[],Q=t.data.category?.tags??[],U=t.data.page.tags??[],w=[...new Set([...W,...Q,...U].filter(Boolean))],Y={"@context":"https://schema.org","@type":"WebPage",headline:r(P),description:r(S),url:r(k),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:w.length?w.join(", "):void 0,image:D,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var q=Ge();Me(c=>{var d=He(),y=G(d),g=a(y,4),m=a(g,2);{var M=h=>{var I=Fe();O(()=>p(I,"content",t.data.page.publishedTime)),o(h,I)};H(m,h=>{t.data.page.publishedTime&&h(M)})}var T=a(m,2);{var L=h=>{var I=Ve();O(()=>p(I,"content",t.data.page.modifiedTime)),o(h,I)};H(T,h=>{t.data.page.modifiedTime&&h(L)})}var j=a(T,2);{var J=h=>{var I=Le(),_e=G(I);K(_e,17,()=>w,Pe,(we,Te)=>{var de=je();O(()=>p(de,"content",r(Te))),o(we,de)}),o(h,I)};H(j,h=>{w&&h(J)})}var Z=a(j,2),ne=a(Z,4),ae=a(ne,2),ie=a(ae,2),oe=a(ie,2);p(oe,"content",D);var re=a(oe,2),se=a(re,4),ce=a(se,2),le=a(ce,2);p(le,"content",D);var be=a(le,2);Se(be,()=>`<script type="application/ld+json">${JSON.stringify(Y)}<\/script>`),O(h=>{Ie.title=r(P)??"",p(y,"content",r(S)),p(g,"href",r(k)),p(Z,"content",h),p(ne,"content",r(P)),p(ae,"content",r(S)),p(ie,"content",t.data.site.title),p(re,"content",r(k)),p(se,"content",r(P)),p(ce,"content",r(S))},[()=>w.join(", ")]),o(c,d)});var A=G(q),N=b(A),F=a(b(N),2);F.__click=[ze,s];var e=b(F);{var i=c=>{var d=We();o(c,d)},n=c=>{var d=Qe();o(c,d)};H(e,c=>{r(s)?c(i):c(n,!1)})}x(F),x(N);var l=a(N,2);{var V=c=>{var d=Ye(),y=b(d);K(y,22,()=>C,g=>g,(g,m,M)=>{var T=Ue(),L=b(T);let j;var J=b(L,!0);x(L),x(T),O(Z=>{p(L,"href",m.ref),j=ue(L,1,"",null,j,Z),me(J,m.title)},[()=>({"page-visible":r(M)===r(_),"page-nonvisible":r(M)!==r(_)})]),o(g,T)}),x(y),x(d),o(c,d)};H(l,c=>{r(s)&&c(V)})}var $=a(l,2);ke($,{});var xe=a($,2);qe(xe,{setVisible:z}),x(A);var ee=a(A,2),te=a(b(ee),2);K(te,22,()=>C,c=>c,(c,d,y)=>{var g=Ze(),m=b(g);let M;var T=b(m,!0);x(m),x(g),O(L=>{p(m,"href",d.ref),M=ue(m,1,"",null,M,L),me(T,d.title)},[()=>({"page-visible":r(y)===r(_),"page-nonvisible":r(y)!==r(_)})]),o(c,g)}),x(te),x(ee),o(B,q),ve()}Ee(["click"]);export{rt as component,ot as universal};
//# sourceMappingURL=23.1AbvilXp.js.map
