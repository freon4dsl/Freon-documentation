import{f as g,a as s,t as L,e as Ce}from"../chunks/nks1QWJh.js";import{y as de,G as pe,x as z,z as me,u as a,A as E,g as n,I as re,B as G,a as A,$ as Te,v,s as ue,w as f}from"../chunks/bZIXIZs8.js";import{d as Pe,i as M,s as se}from"../chunks/DANOUgWt.js";import{e as Z,p as Ie,i as Se,s as ce}from"../chunks/CKHUE_gp.js";import{h as ke}from"../chunks/DCXhKCCG.js";import{h as Ne}from"../chunks/aX-frc9G.js";import{s as d}from"../chunks/BpSVRMQn.js";import{o as Be}from"../chunks/D62n5Z03.js";import{P as le,S as R,c as Oe,B as Ae}from"../chunks/CFDUsp8k.js";import{F as De}from"../chunks/Bq9rkPJ0.js";const Le=async({parent:N})=>{const{site:e,category:c}=await N();return{site:e,category:c,page:{title:"Namespace Imports",description:"Learn how to extend visibility in Freon by importing namespaces, define inheritance-like behavior, use recursive imports, and control visibility with public and private properties.",tags:["namespace imports","scoping","visibility","recursive imports","private properties","Freon","DSL development","scope rules"],modifiedTime:"2025-11-07T17:39:02.373Z",publishedTime:"2025-11-07T17:20:18.623Z"}}},it=Object.freeze(Object.defineProperty({__proto__:null,load:Le},Symbol.toStringTag,{value:"Module"}));var Ee=g(`<!> <!> <p>Previously, we saw that the set of visible nodes in a namespace consists of the nodes it declares and
the nodes visible in its parent namespace. This standard visibility can be extended with <strong>imports</strong>.
When a namespace is imported into
another namespace, its declared nodes are added to the visible nodes of the latter.</p> <p>In the following example, <code>basedOn</code> is in the language structure definition (<code>.ast</code> file) a property of the <code>InsuranceProduct</code> concept.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L53-L65

concept InsuranceProduct &#123;
    name: identifier;                       // internal name
    productName: string;                    // name by which this product is known to the public
    themes: InsuranceTheme[];               // the 'kind' of insurance
    advertisedPremium: EuroLiteral;         // the premium as known to the public
    nrPremiumDays: PremiumDays;             // the number of days for which the advertised premium is calculated
    reference parts: InsurancePart[];       // optionally, known parts can be included by reference
    reference basedOn: BaseProduct[];       // the BaseProducts from which the parts are taken

    riskAdjustment?: PercentageLiteral;     // an adjustment to the risk of the separate parts, e.g. caused by the combination of the parts
    calculation: DocuExpression;            // the premium as calculated based on the parts
    helpers: CalcFunction[];                // helper functions used to calculate the premium
&#125;</code></pre> <p>If the following import statement is included in the .scope file, the declared nodes in the <code>basedOn</code> property in the user’s model
will be included in the namespace identified by an <code>InsuranceProduct</code>. Note that both <code>InsuranceProduct</code> and <code>BaseProduct</code> (the type of <code>basedOn</code>) need to be defined as a namespace.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/scoper-docu.scope#L3-L9

isNamespace &#123; InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef &#125;

InsuranceProduct &#123;
    imports &#123;
        self.basedOn;
    &#125; 
&#125;</code></pre> <!> <p>A namespace import effectively turns the namespace tree into a graph, like references make the abstract syntax <em>tree</em> become a graph.
For instance, when the namespace A8 is imported into namespace A3 an extra edge is made between nodes A3 and A8, as shown in
the next figure. This edge signifies the inclusion of the declared nodes of A8 ([F1, D7, D8]) in the visible nodes of A3.</p> <!> <!> <p>Using namespace imports, you can support some kind of inheritance in your DSL. Suppose <code>baseClass</code> represents the “super class”
of <code>ClassWithInheritance</code> in your language, as follows.</p> <pre class="language-freon"><code class="language-freon">/* The .ast file */

concept ClassWithInheritance &#123;
    name: identifier;
    reference baseClass?: ClassWithInheritance;
    methods: Method[];
&#125;

concept Method &#123;
    name: identifier;
    parameters: Parameter[];
    body: Body;
&#125;</code></pre> <p>For brevity, the definitions of <code>Parameter</code> and <code>Body</code> are omitted. The only thing you need to know is
that <code>Body</code> is an expression in which you can refer to a method.</p> <p>Next, use a scope import to include all the declared nodes of the “super class” in the visible nodes of the “subclass”.</p> <pre class="language-freon"><code class="language-freon">/* The .scope file */

ClassWithInheritance &#123;
    imports &#123;
        self.baseClass;
    &#125; 
&#125;
</code></pre> <p>Now suppose, the user’s model is this. (Again, for brevity, we do not include the editor definition,
but the keywords <code>class</code>, <code>super</code>, and <code>method</code> are a definite giveaway to the link between concrete
and abstract syntax.😊)</p> <pre><code>class SmallBusiness 
  method calculateTurnover() &#123;
    // some expression
  &#125;
  method calculateRevenue() &#123;
    // some expression
  &#125;
  method calculateValueAddedTax() &#123;
    // some expression
  &#125;
  
class DryCleaner super SmallBusiness
  method revenueAsPercentageOfTurnover() &#123;
    // expression using references to calculateRevenue and calculateTurnover
  &#125;  
</code></pre> <p>The user can reference the methods of <code>SmallBusiness</code> because they are
in the declared nodes of the namespace identified by <code>SmallBusiness</code>, and they are imported in the <code>DryCleaner</code> namespace by the import statement in the scope file.</p> <!> <p>Sometimes you may want to include not only the declared nodes of the imported namespace, but its imported
nodes as well. In the example above, where a sort of inheritance is defined, you would want the
methods of the superclass of the superclass also to be included. We can define this in the scope
file by simply adding the keyword <code>recursive</code> in front of the import. Each import in the list can
have its own keyword, in this way you have a fine-grained control over what is added.</p> <pre class="language-freon"><code class="language-freon">ClassWithInheritance &#123;
    imports &#123;
        recursive self.baseClass;
        self.someOtherProperty;
    &#125; 
&#125;
</code></pre> <!> <p>To add an even finer control over what and what is not imported, you can add the keyword ‘private’
to the definition of properties in the .ast file. (Not in the .scope file!) Any property that is
thus marked <code>private</code> will not be included in the set of imported nodes. The marking does not affect
the declared nodes, only the imported nodes of any namespace that imports a namespace with private
properties. This means that properties marked <code>private</code> are visible within their own namespace,
but not when that namespace is imported elsewhere.</p> <p>Suppose that in the inheritance example we want to have private methods. We could adjust the .ast file like this:</p> <pre class="language-freon"><code class="language-freon">concept ClassWithInheritance &#123;
    name: identifier;
    reference baseClass?: ClassWithInheritance;
    methods: Method[];
    private privateMethods: Method[];
&#125;</code></pre> <p>Suppose further that the user model is the following:</p> <pre><code>class SmallBusiness 
  method calculateTurnover() &#123;
    // some expression, where internalCalculation may be referenced
  &#125;
  method calculateRevenue() &#123;
    // some expression, where internalCalculation may be referenced
  &#125;
  method calculateValueAddedTax() &#123;
    // some expression, where internalCalculation may be referenced
  &#125;
  private method internalCalculation() &#123;
    // some expression, where internalCalculation may be referenced
  &#125;

  
class DryCleaner super SmallBusiness
  method revenueAsPercentageOfTurnover() &#123;
    // expression using references to calculateRevenue, calculateTurnover, as well as someOtherCalculation, but NOT to internalCalculation
  &#125;  
  private method someOtherCalculation() &#123;
    // expression using references to calculateRevenue, calculateTurnover, as well as someOtherCalculation, but NOT to internalCalculation 
  &#125;</code></pre> <p>Now the visible nodes of <code>SmallBusiness</code> would include <code>internalCalculation</code>, whereas the visible nodes of <code>DryCleaner</code> would not. It would, however, include <code>someOtherCalculation</code>. But, if <code>DryCleaner</code> was
imported in another namespace, <code>someOtherCalculation</code> would not be part of that namespace.</p> <p>The next page will explain how to leave out the standard hierarchical namespaces (lexical scope)
using <a href="/Documentation/Defining_Scope_Rules/Namespace_Alternatives">namespace alternatives</a>.</p> <!>`,1);function Me(N,e){de(e,!0);const c=pe({});Be(()=>{document.querySelectorAll("pre").forEach(r=>{const o=document.createElement("div");o.className="copy-prompt";const I=document.createElement("p");I.innerHTML="👆 Click to copy",I.className="copy-prompt-p";const S=document.createElement("img");S.src="/icons/copy-icon.svg",S.className="copy-prompt-img",o.appendChild(S),o.appendChild(I),r.appendChild(o),r.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{r.querySelector("code")?.textContent!==null&&r.querySelector("code")?.textContent!==void 0&&Oe(r.querySelector("code").textContent),r.querySelector(".copy-prompt > p")?.innerHTML!==null&&r.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(r.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{r.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let x="/Documentation/Defining_Scope_Rules/Basics_and_Terminology",y="/Documentation/Defining_Scope_Rules/Namespace_Alternatives";var W=Ee(),C=z(W);le(C,{prevLink:x,nextLink:y});var T=a(C,2);R(T,{tag:"h1",id:"namespace-imports-1",onIntersectChange:t=>e.setVisible("namespace-imports-1",t),get intersecting(){return c["namespace-imports-1"]},set intersecting(t){c["namespace-imports-1"]=t},children:(t,r)=>{E();var o=L("Namespace Imports");s(t,o)},$$slots:{default:!0}});var B=a(T,12);R(B,{tag:"h2",id:"effect-on-the-namespace-tree-2",onIntersectChange:t=>e.setVisible("effect-on-the-namespace-tree-2",t),get intersecting(){return c["effect-on-the-namespace-tree-2"]},set intersecting(t){c["effect-on-the-namespace-tree-2"]=t},children:(t,r)=>{E();var o=L("Effect on the Namespace Tree");s(t,o)},$$slots:{default:!0}});var O=a(B,4);De(O,{imageName:"documentation/AST-plus-reference.png",caption:"Graph showing an import between Namespace nodes",figureNumber:1});var j=a(O,2);R(j,{tag:"h2",id:"example-defining-inheritance-3",onIntersectChange:t=>e.setVisible("example-defining-inheritance-3",t),get intersecting(){return c["example-defining-inheritance-3"]},set intersecting(t){c["example-defining-inheritance-3"]=t},children:(t,r)=>{E();var o=L("Example: Defining Inheritance");s(t,o)},$$slots:{default:!0}});var q=a(j,18);R(q,{tag:"h2",id:"recursive-imports-4",onIntersectChange:t=>e.setVisible("recursive-imports-4",t),get intersecting(){return c["recursive-imports-4"]},set intersecting(t){c["recursive-imports-4"]=t},children:(t,r)=>{E();var o=L("Recursive Imports");s(t,o)},$$slots:{default:!0}});var F=a(q,6);R(F,{tag:"h2",id:"public-and-private-properties-5",onIntersectChange:t=>e.setVisible("public-and-private-properties-5",t),get intersecting(){return c["public-and-private-properties-5"]},set intersecting(t){c["public-and-private-properties-5"]=t},children:(t,r)=>{E();var o=L("Public and Private Properties");s(t,o)},$$slots:{default:!0}});var P=a(F,16);le(P,{prevLink:x,nextLink:y}),s(N,W),me()}var Re=g('<meta property="article:published_time"/>'),We=g('<meta property="article:modified_time"/>'),je=g('<meta property="article:tag"/>'),qe=g('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Fe=(N,e)=>{ue(e,!n(e))},Ve=g('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),ze=g('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),He=g('<li class="page-toc-text"><a> </a></li>'),Ge=g('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ze=g('<li class="page-toc-text"><a> </a></li>'),Je=g('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function ot(N,e){de(e,!0);let c=re(!1);const x=pe([{id:"namespace-imports-1",title:"Namespace Imports",visible:!1,ref:"#namespace-imports-1"},{id:"effect-on-the-namespace-tree-2",title:"Effect on the Namespace Tree",visible:!1,ref:"#effect-on-the-namespace-tree-2"},{id:"example-defining-inheritance-3",title:"Example: Defining Inheritance",visible:!1,ref:"#example-defining-inheritance-3"},{id:"recursive-imports-4",title:"Recursive Imports",visible:!1,ref:"#recursive-imports-4"},{id:"public-and-private-properties-5",title:"Public and Private Properties",visible:!1,ref:"#public-and-private-properties-5"}]);let y=re(0);function W(i,l){const h=x.find(p=>p.id===i);h&&(h.visible=l);const m=x.findIndex(p=>p.visible);m>=0&&ue(y,m,!0)}const C=G(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),T=G(()=>e.data.page.description??e.data.category.description),B="https://freon4dsl.dev/images/freon-banner.png";let O=G(()=>{const i=Ie.url.pathname;return`https://freon4dsl.dev${i==="/"?"/":i.replace(/\/$/,"")}`});const j=e.data.site?.tags??[],q=e.data.category?.tags??[],F=e.data.page.tags??[],P=[...new Set([...j,...q,...F].filter(Boolean))],t={"@context":"https://schema.org","@type":"WebPage",headline:n(C),description:n(T),url:n(O),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:P.length?P.join(", "):void 0,image:B,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var r=Je();Ne(i=>{var l=qe(),h=z(l),m=a(h,4),p=a(m,2);{var k=u=>{var w=Re();A(()=>d(w,"content",e.data.page.publishedTime)),s(u,w)};M(p,u=>{e.data.page.publishedTime&&u(k)})}var b=a(p,2);{var _=u=>{var w=We();A(()=>d(w,"content",e.data.page.modifiedTime)),s(u,w)};M(b,u=>{e.data.page.modifiedTime&&u(_)})}var D=a(b,2);{var H=u=>{var w=Ce(),_e=z(w);Z(_e,17,()=>P,Se,(we,xe)=>{var oe=je();A(()=>d(oe,"content",n(xe))),s(we,oe)}),s(u,w)};M(D,u=>{P&&u(H)})}var V=a(D,2),X=a(V,4),Y=a(X,2),$=a(Y,2),ee=a($,2);d(ee,"content",B);var te=a(ee,2),ae=a(te,4),ne=a(ae,2),ie=a(ne,2);d(ie,"content",B);var be=a(ie,2);ke(be,()=>`<script type="application/ld+json">${JSON.stringify(t)}<\/script>`),A(u=>{Te.title=n(C)??"",d(h,"content",n(T)),d(m,"href",n(O)),d(V,"content",u),d(X,"content",n(C)),d(Y,"content",n(T)),d($,"content",e.data.site.title),d(te,"content",n(O)),d(ae,"content",n(C)),d(ne,"content",n(T))},[()=>P.join(", ")]),s(i,l)});var o=z(r),I=v(o),S=a(v(I),2);S.__click=[Fe,c];var he=v(S);{var fe=i=>{var l=Ve();s(i,l)},ge=i=>{var l=ze();s(i,l)};M(he,i=>{n(c)?i(fe):i(ge,!1)})}f(S),f(I);var J=a(I,2);{var ve=i=>{var l=Ge(),h=v(l);Z(h,22,()=>x,m=>m,(m,p,k)=>{var b=He(),_=v(b);let D;var H=v(_,!0);f(_),f(b),A(V=>{d(_,"href",p.ref),D=ce(_,1,"",null,D,V),se(H,p.title)},[()=>({"page-visible":n(k)===n(y),"page-nonvisible":n(k)!==n(y)})]),s(m,b)}),f(h),f(l),s(i,l)};M(J,i=>{n(c)&&i(ve)})}var U=a(J,2);Ae(U,{});var ye=a(U,2);Me(ye,{setVisible:W}),f(o);var K=a(o,2),Q=a(v(K),2);Z(Q,22,()=>x,i=>i,(i,l,h)=>{var m=Ze(),p=v(m);let k;var b=v(p,!0);f(p),f(m),A(_=>{d(p,"href",l.ref),k=ce(p,1,"",null,k,_),se(b,l.title)},[()=>({"page-visible":n(h)===n(y),"page-nonvisible":n(h)!==n(y)})]),s(i,m)}),f(Q),f(K),s(N,r),me()}Pe(["click"]);export{ot as component,it as universal};
//# sourceMappingURL=48.VRi2w8Oo.js.map
