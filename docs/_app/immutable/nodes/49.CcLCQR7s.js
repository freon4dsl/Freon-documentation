import{f as h,a as c,t as N,e as Te}from"../chunks/nks1QWJh.js";import{y as le,G as pe,x as z,z as fe,u as a,A as F,g as n,I as se,B as G,a as O,$ as Se,v,s as me,w as u}from"../chunks/bZIXIZs8.js";import{d as Ie,i as M,s as re}from"../chunks/DANOUgWt.js";import{e as Z,p as Pe,i as Ce,s as ce}from"../chunks/CKHUE_gp.js";import{h as De}from"../chunks/DCXhKCCG.js";import{h as ke}from"../chunks/aX-frc9G.js";import{s as l}from"../chunks/BpSVRMQn.js";import{o as Ae}from"../chunks/D62n5Z03.js";import{P as de,S as q,c as Le,B as Ne}from"../chunks/CFDUsp8k.js";const Fe=async({parent:k})=>{const{site:t,category:s}=await k();return{site:t,category:s,page:{title:"The Freon Scoper Definition",description:"Learn how to write a Freon scoper definition in .scope files, declare namespaces, and define imports and alternatives using Freon’s scoping meta-language.",tags:["scoper definition","scope provider",".scope","namespaces","imports","alternatives","meta-language","scoping rules","Freon","DSL development"],modifiedTime:"2025-11-07T18:52:21.430Z",publishedTime:"2025-11-07T17:20:18.624Z"}}},at=Object.freeze(Object.defineProperty({__proto__:null,load:Fe},Symbol.toStringTag,{value:"Module"}));var Oe=h(`<!> <!> <p>The <strong>scope provider</strong> (or <strong>scoper</strong> for short) is defined by a scoper definition, which must be in a file with
the extension <code>.scope</code>. The scoper definition holds all your DSL’s scoping rules. All files with the .scope extension in
the <a href="/Documentation/Overview/Getting_Started#creating-a-project-2"><em>defs</em> folder</a> (i.e. the folder where you keep your definition files) are combined into one scoper definition.
Any <code>.scope</code> file should start by declaring the language for which the scoper is defined.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/scoper-docu.scope#L1-L2

scoper for language InsuranceModel
</code></pre> <p>The default scoper, which is the scoper provided when no scoper definition is given,
simply regards your user’s model as the one and only namespace, meaning that every node is visible everywhere.</p> <!> <p>Often, much of the necessary scoping can be defined simply by stating that certain concepts are namespaces. This is done in a single statement, which must come
before any other rules. All metatypes that are regarded as namespaces are listed between curly brackets after the keyword <code>isNamespace</code>.
Model units and interfaces can be used as well. Any instance of a concept that implements a namespace interface will
be regarded as a namespace.</p> <p>Have a look again at an earlier example:</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/scoper-docu.scope#L3-L3

isNamespace &#123; InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef &#125;</code></pre> <!> <p>The next parts of the scoper definition cover imports and alternatives; they may be mixed.</p> <p>To define an import use the name of the concept, model unit, or interface that identifies the namespace,
and - between curly brackets - add the imported namespace after the keyword <code>imports</code>. You may add a
list of properties; all of them will be imported. The keyword <code>recursive</code> (See <a href="/Documentation/Defining_Scope_Rules/Namespace_Imports#recursive-imports-4">Recursive Imports</a>) may
be added to each entry in the list individually.</p> <pre class="language-freon"><code class="language-freon">InsuranceProduct &#123;
    imports &#123;
        self.basedOn;
        recursive self.themes;
        self.parts;
    &#125; 
&#125;</code></pre> <!> <p>To define an alternative, you should use
the name of the concept, model unit or interface that identifies the namespace, and add the imported namespace after
the keyword <code>alternative</code>. Here too, you may add a list of properties to be included in the alternatives, and
use the keyword <code>recursive</code> for each entry in the list individually.</p> <pre class="language-freon"><code class="language-freon">InsuranceProduct &#123;
    alternatives &#123;
        self.basedOn;
        recursive self.themes;
        self.parts;
    &#125; 
&#125;</code></pre> <!> <p>The Freon meta-language for scoping provides
a number of options for building an expression to indicate the required namespace.</p> <p>First, you may use dots to traverse the AST.</p> <pre class="language-freon"><code class="language-freon">    alternatives &#123;
        self.xxx.yyy.rrr;
    &#125; </code></pre> <p>Second, you can use an instance of a limited concept. Put a <code>#</code> sign before the name of the limited concept, and
use the <code>:</code> sign as separator followed by the name of the limited instance.</p> <pre class="language-freon"><code class="language-freon">    imports &#123;
        #AttributeType:Integer;
    &#125; </code></pre> <p>Third, you may want to use the owning namespace of a property. For this you should use the predefined function <code>owner()</code>.</p> <pre class="language-freon"><code class="language-freon">    imports &#123;
        self.xxx.owner();
    &#125; </code></pre> <p>Fourth, you can indicate that you want to use a certain property, but only
if it is of a certain metatype. To do this you use the predefined function <code>if()</code> which takes as its parameter the name of a
concept or model unit (no interfaces!). If the node is not of the required type, no namespace is added.</p> <pre class="language-freon"><code class="language-freon">    imports &#123;
        self.xxx.if(ConceptY);
        self.if(Unit12);
    &#125; </code></pre> <p>You can combine all the options and make a really complex statement. But be careful, it is easy to get confused.
In the following example, the namespace that is imported is the namespace indicated by the <code>conceptA_prop</code> instance of
the namespace that ‘owns’ the property <code>self.xxx</code> (i.e. <code>self.xxx</code> is
in the declared nodes of this namespace), but only if this owner is of (meta)type <code>ConceptA</code>.</p> <pre class="language-freon"><code class="language-freon">    imports &#123;
        self.xxx.owner().if(ConceptA).conceptA_prop;
    &#125; </code></pre> <p>Finally, when you have also defined a typer (See <a href="/Documentation/Typing_and_Validating">Typing and Validating</a>), you may
use the type of an instance as namespace. To do this you use the predefined function <code>type()</code>. Note that nothing may follow
a <code>type()</code> expression. Note also that the type of an instance is different from its metatype. The first is an instance of some
concept that is defined by the typer definition to represent the type of the node. The second is a concept, model unit, or
interface that is defined in the .ast file.</p> <pre class="language-freon"><code class="language-freon">    alternatives &#123;
        self.xxx.type();
        self.type();
        self.yyy.owner().type();
    &#125; </code></pre> <!> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/scoper-docu.scope

scoper for language InsuranceModel

isNamespace &#123; InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef &#125;

InsuranceProduct &#123;
    imports &#123;
        self.basedOn;
    &#125; 
&#125;

AttributeRef &#123;
	alternatives &#123;
        self.owner().type();
    &#125; 
&#125;

Entity &#123;
    imports &#123;
        self.baseEntity;
    &#125; 
&#125;
</code></pre> <!>`,1);function qe(k,t){le(t,!0);const s=pe({});Ae(()=>{document.querySelectorAll("pre").forEach(r=>{const o=document.createElement("div");o.className="copy-prompt";const P=document.createElement("p");P.innerHTML="👆 Click to copy",P.className="copy-prompt-p";const C=document.createElement("img");C.src="/icons/copy-icon.svg",C.className="copy-prompt-img",o.appendChild(C),o.appendChild(P),r.appendChild(o),r.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{r.querySelector("code")?.textContent!==null&&r.querySelector("code")?.textContent!==void 0&&Le(r.querySelector("code").textContent),r.querySelector(".copy-prompt > p")?.innerHTML!==null&&r.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(r.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{r.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let w="/Documentation/Defining_Scope_Rules/Namespace_Alternatives",y="/Documentation/Typing_and_Validating";var B=Oe(),T=z(B);de(T,{prevLink:w,nextLink:y});var S=a(T,2);q(S,{tag:"h1",id:"the-freon-scoper-definition-1",onIntersectChange:e=>t.setVisible("the-freon-scoper-definition-1",e),get intersecting(){return s["the-freon-scoper-definition-1"]},set intersecting(e){s["the-freon-scoper-definition-1"]=e},children:(e,r)=>{F();var o=N("The Freon Scoper Definition");c(e,o)},$$slots:{default:!0}});var A=a(S,8);q(A,{tag:"h2",id:"defining-namespaces-2",onIntersectChange:e=>t.setVisible("defining-namespaces-2",e),get intersecting(){return s["defining-namespaces-2"]},set intersecting(e){s["defining-namespaces-2"]=e},children:(e,r)=>{F();var o=N("Defining Namespaces");c(e,o)},$$slots:{default:!0}});var L=a(A,8);q(L,{tag:"h2",id:"defining-imports-3",onIntersectChange:e=>t.setVisible("defining-imports-3",e),get intersecting(){return s["defining-imports-3"]},set intersecting(e){s["defining-imports-3"]=e},children:(e,r)=>{F();var o=N("Defining Imports");c(e,o)},$$slots:{default:!0}});var V=a(L,8);q(V,{tag:"h2",id:"defining-alternatives-4",onIntersectChange:e=>t.setVisible("defining-alternatives-4",e),get intersecting(){return s["defining-alternatives-4"]},set intersecting(e){s["defining-alternatives-4"]=e},children:(e,r)=>{F();var o=N("Defining Alternatives");c(e,o)},$$slots:{default:!0}});var j=a(V,6);q(j,{tag:"h2",id:"overview-of-possibilities-in-the-scope-definition-5",onIntersectChange:e=>t.setVisible("overview-of-possibilities-in-the-scope-definition-5",e),get intersecting(){return s["overview-of-possibilities-in-the-scope-definition-5"]},set intersecting(e){s["overview-of-possibilities-in-the-scope-definition-5"]=e},children:(e,r)=>{F();var o=N("Overview of Possibilities in the Scope Definition");c(e,o)},$$slots:{default:!0}});var H=a(j,28);q(H,{tag:"h2",id:"example-scope-definition-6",onIntersectChange:e=>t.setVisible("example-scope-definition-6",e),get intersecting(){return s["example-scope-definition-6"]},set intersecting(e){s["example-scope-definition-6"]=e},children:(e,r)=>{F();var o=N("Example Scope Definition");c(e,o)},$$slots:{default:!0}});var I=a(H,4);de(I,{prevLink:w,nextLink:y}),c(k,B),fe()}var Ee=h('<meta property="article:published_time"/>'),Me=h('<meta property="article:modified_time"/>'),Be=h('<meta property="article:tag"/>'),Ve=h('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),je=(k,t)=>{me(t,!n(t))},He=h('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Re=h('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),ze=h('<li class="page-toc-text"><a> </a></li>'),Ye=h('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ge=h('<li class="page-toc-text"><a> </a></li>'),Ze=h('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function nt(k,t){le(t,!0);let s=se(!1);const w=pe([{id:"the-freon-scoper-definition-1",title:"The Freon Scoper Definition",visible:!1,ref:"#the-freon-scoper-definition-1"},{id:"defining-namespaces-2",title:"Defining Namespaces",visible:!1,ref:"#defining-namespaces-2"},{id:"defining-imports-3",title:"Defining Imports",visible:!1,ref:"#defining-imports-3"},{id:"defining-alternatives-4",title:"Defining Alternatives",visible:!1,ref:"#defining-alternatives-4"},{id:"overview-of-possibilities-in-the-scope-definition-5",title:"Overview of Possibilities in the Scope Definition",visible:!1,ref:"#overview-of-possibilities-in-the-scope-definition-5"},{id:"example-scope-definition-6",title:"Example Scope Definition",visible:!1,ref:"#example-scope-definition-6"}]);let y=se(0);function B(i,d){const g=w.find(p=>p.id===i);g&&(g.visible=d);const f=w.findIndex(p=>p.visible);f>=0&&me(y,f,!0)}const T=G(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),S=G(()=>t.data.page.description??t.data.category.description),A="https://freon4dsl.dev/images/freon-banner.png";let L=G(()=>{const i=Pe.url.pathname;return`https://freon4dsl.dev${i==="/"?"/":i.replace(/\/$/,"")}`});const V=t.data.site?.tags??[],j=t.data.category?.tags??[],H=t.data.page.tags??[],I=[...new Set([...V,...j,...H].filter(Boolean))],e={"@context":"https://schema.org","@type":"WebPage",headline:n(T),description:n(S),url:n(L),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:I.length?I.join(", "):void 0,image:A,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var r=Ze();ke(i=>{var d=Ve(),g=z(d),f=a(g,4),p=a(f,2);{var D=m=>{var x=Ee();O(()=>l(x,"content",t.data.page.publishedTime)),c(m,x)};M(p,m=>{t.data.page.publishedTime&&m(D)})}var _=a(p,2);{var b=m=>{var x=Me();O(()=>l(x,"content",t.data.page.modifiedTime)),c(m,x)};M(_,m=>{t.data.page.modifiedTime&&m(b)})}var E=a(_,2);{var Y=m=>{var x=Te(),be=z(x);Z(be,17,()=>I,Ce,(xe,we)=>{var oe=Be();O(()=>l(oe,"content",n(we))),c(xe,oe)}),c(m,x)};M(E,m=>{I&&m(Y)})}var R=a(E,2),Q=a(R,4),X=a(Q,2),$=a(X,2),ee=a($,2);l(ee,"content",A);var te=a(ee,2),ae=a(te,4),ne=a(ae,2),ie=a(ne,2);l(ie,"content",A);var _e=a(ie,2);De(_e,()=>`<script type="application/ld+json">${JSON.stringify(e)}<\/script>`),O(m=>{Se.title=n(T)??"",l(g,"content",n(S)),l(f,"href",n(L)),l(R,"content",m),l(Q,"content",n(T)),l(X,"content",n(S)),l($,"content",t.data.site.title),l(te,"content",n(L)),l(ae,"content",n(T)),l(ne,"content",n(S))},[()=>I.join(", ")]),c(i,d)});var o=z(r),P=v(o),C=a(v(P),2);C.__click=[je,s];var ge=v(C);{var ue=i=>{var d=He();c(i,d)},he=i=>{var d=Re();c(i,d)};M(ge,i=>{n(s)?i(ue):i(he,!1)})}u(C),u(P);var J=a(P,2);{var ve=i=>{var d=Ye(),g=v(d);Z(g,22,()=>w,f=>f,(f,p,D)=>{var _=ze(),b=v(_);let E;var Y=v(b,!0);u(b),u(_),O(R=>{l(b,"href",p.ref),E=ce(b,1,"",null,E,R),re(Y,p.title)},[()=>({"page-visible":n(D)===n(y),"page-nonvisible":n(D)!==n(y)})]),c(f,_)}),u(g),u(d),c(i,d)};M(J,i=>{n(s)&&i(ve)})}var U=a(J,2);Ne(U,{});var ye=a(U,2);qe(ye,{setVisible:B}),u(o);var W=a(o,2),K=a(v(W),2);Z(K,22,()=>w,i=>i,(i,d,g)=>{var f=Ge(),p=v(f);let D;var _=v(p,!0);u(p),u(f),O(b=>{l(p,"href",d.ref),D=ce(p,1,"",null,D,b),re(_,d.title)},[()=>({"page-visible":n(g)===n(y),"page-nonvisible":n(g)!==n(y)})]),c(i,f)}),u(K),u(W),c(k,r),fe()}Ie(["click"]);export{nt as component,at as universal};
//# sourceMappingURL=49.CcLCQR7s.js.map
