import{f as u,a as r,t as _,e as je}from"../chunks/nks1QWJh.js";import{y as fe,G as ge,x as U,z as he,u as i,A as h,g as n,I as le,B as J,a as O,$ as Te,v as b,s as ve,w as y}from"../chunks/bZIXIZs8.js";import{d as Ee,i as B,s as pe}from"../chunks/DANOUgWt.js";import{e as K,p as Se,i as ke,s as me}from"../chunks/CKHUE_gp.js";import{h as Ie}from"../chunks/DCXhKCCG.js";import{h as Ce}from"../chunks/aX-frc9G.js";import{s as p}from"../chunks/BpSVRMQn.js";import{o as De}from"../chunks/D62n5Z03.js";import{P as ue,S as F,c as Le,B as $e}from"../chunks/CFDUsp8k.js";import{N as W}from"../chunks/B1swYv4A.js";import{F as Ne}from"../chunks/Bq9rkPJ0.js";const Oe=async({parent:C})=>{const{site:t,category:d}=await C();return{site:t,category:d,page:{title:"Defining an Editor",description:"Learn how to define editor behavior in Freon using .edit files, including projections, triggers, symbols, named editors, and precedence for customizing the projectional editor interface.",tags:["editor definition",".edit file","projections","triggers","symbols","named editors","editor precedence","projectional editor","Freon","DSL development"],modifiedTime:"2025-11-07T19:03:58.393Z",publishedTime:"2025-11-07T17:20:18.610Z"}}},ct=Object.freeze(Object.defineProperty({__proto__:null,load:Oe},Symbol.toStringTag,{value:"Module"}));var Fe=u(`<p>Every <code>.edit</code> file in the folder containing your definitions is read during the 
generation process. If multiple files define editors with the same name, their information 
is merged into a single editor.</p> <p>You only need to set precedence once; if defined in multiple files, the values must match.</p>`,1),Ae=u(`<p>Keep in mind that all commands, except <code>all</code>, when used individually (i.e., without combining 
them with others), produce code that may not compile correctly. For example, the <code>scoper</code> and <code>validator</code> may depend on the <code>typer</code> and attempt to reference its class, 
which might not yet be generated. Similarly, the <code>editor</code> may try to include 
the <code>scoper</code>.</p> <p>To avoid such issues, it is best to start with the <code>all</code> command. Once this 
has been run, you can use specific commands for individual aspects of your language as needed. 
This approach ensures correct dependencies while minimizing regeneration time.</p>`,1),qe=u("Example <code>.edit</code> File",1),ze=u(`<!> <!> <p>An editor’s behavior is specified in an editor definition file (a <code>.edit</code> file).
You can define the following three aspects for each <em>concept</em> or <em>interface</em>:</p> <ul><li><strong>Projection</strong>: Defines how the <em>concept</em> is visually represented in the editor. This is also called the <a href="/Documentation/Terminology">concrete syntax</a>.</li> <li><strong>Trigger</strong> (optional): Specifies the key or keys that a user must type to create a new instance of the <em>concept</em> and that
appears in a dropdown menu.</li> <li><strong>Symbol</strong> (optional): Used exclusively for binary expressions: the character or string that represents
the <em>operator</em>. If a <em>symbol</em> is not provided, the <em>trigger</em> will serve this purpose.</li></ul> <p>Note that projections cannot be specified for <em>binary expression concepts</em> or <em>limited concepts</em>.
The editor offers specialized support for binary expressions, which cannot function properly
if a user-defined projection is applied. Limited concepts are also restricted
from having projections because they are intended for use as references only within the editor.</p> <!> <!> <p>You can define multiple projections for the same concept and switch between these
different projections in the editor. This allows you to adapt the editor to
a specific task or point of view.</p> <p>Editors are <strong>named</strong>, allowing you to define multiple editors with coordinated
sets of projections.</p> <p>For example, if you group all <a href="/Documentation/Defining_an_Editor/Projections#tables-5">table projections</a> under
a specific named editor,
users can switch between viewing objects as lists or as tables. Similarly,
you could create one editor (or projection set) that displays only a subset
of properties for certain concepts, while another editor shows all properties.
This flexibility allows you to accommodate different user needs.</p> <p>Projections can also explicitly specify that a property must be displayed using
a projection from a specific named editor. For more details,
refer to <a href="/Documentation/Defining_an_Editor/Projections#using-named-projections-3">Using Named Projections</a>.</p> <!> <p>Since an editor is required as a fallback when all other editors are disabled,
a default editor is automatically generated if one is not provided. If a default
editor is supplied but is incomplete — meaning it does not define projections
for all concepts — projections for the missing concepts are automatically
generated. As a result, the default editor is always complete during generation.</p> <p>The generated default will show the concept’s name and all of its properties in the order given in the .ast file.
List properties will be displayed as a vertical list.</p> <p>For example, if no projection is specified for the concepts <code>InsurancePart</code>, <code>PercentageLiteral</code>, and <code>EuroLiteral</code> instances of <code>InsurancePart</code> will be shown as follows.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L44-L49

concept InsurancePart &#123;
    name: identifier;                       // internal name
    isApproved: boolean = false;            // indication of approval status
    statisticalRisk: PercentageLiteral;     // the statistical risk known for this event
    maximumPayOut: EuroLiteral;             // maximum payout in case the insured event happens
&#125;</code></pre> <!> <!> <p>Named editors are arranged in a specific order, which can be specified by assigning
a precedence value to each editor. Projections are resolved following this order.
The default editor always has the lowest precedence (0) and is evaluated last.</p> <p>If a projection for a concept is not found in the editor with the highest precedence,
the system checks the next editor in the sequence, continuing until it
reaches the default editor.</p> <p>If you do not specify a precedence, Freon assigns one based on the order
in which the files are read — typically alphabetically. However, this
order isn’t guaranteed.</p> <!> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-tables.edit#L1-L11

/* This file contains the table definition in a separate editor / projection group.
This enables the user to switch tables on and off. */

editor tables precedence 4

InsurancePart&#123;
table [
    Name    | risk               | pay out          | is approved
    $&#123;name&#125; | $&#123;statisticalRisk&#125; | $&#123;maximumPayOut&#125; | $&#123;isApproved&#125;
]
&#125;</code></pre> <!> <p>The generator for the editor runs every time the <code>freon all</code> command is executed. But it is also possible to run
the generator for the editor independently. The following command will do the trick.</p> <pre class="language-bash"><code class="language-bash">npm run freon edit-it -d src/defs -o src/</code></pre> <!> <!> <p>A complete .edit file could look like this.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-main-default.edit#L1-L80

/* This file contains the default editor definition. */

editor default

global &#123;
    boolean inner-switch [YES | NO] // the strings used to display a boolean value, all booleans will default be displayed as an inner switch control
//    limited radio
//    limited[] checkbox
    // number slider  // you can use the slider control as default projection for numbers, but this will not often be the preferred option
    referenceSeparator [:] // the string that separates the names in a path name, e.g. pack1:cls3:part
    external &#123;
        AnimatedGif,
        ExternalCard,
        ExternalAccordion,
        ExternalDialog,
        DatePicker
    &#125;
&#125;

// both modelunits show a single concept
Part &#123;[ $&#123;self.part&#125; ]&#125;
Product &#123;[ $&#123;self.product&#125; ]&#125;

BaseProduct &#123;[
    Base Products $&#123;name&#125; for $&#123;theme&#125;
        $&#123;parts&#125;
]&#125;

InsurancePart&#123;
[
    Insurance Part $&#123;self.name&#125;
        risk assessment: $&#123;self.statisticalRisk&#125;
        maximum payout: $&#123;self.maximumPayOut&#125;
        is approved: $&#123;self.isApproved [YES | NO]&#125;
]
&#125;

InsuranceProduct &#123;[
    Insurance Product $&#123;name&#125; ( public name: $&#123;productName&#125; ) USES $&#123;basedOn horizontal separator[, ]&#125;
        Themes: $&#123;themes horizontal separator[, ]&#125;
        Premium: $&#123;advertisedPremium&#125; per $&#123;nrPremiumDays&#125;
        Insured risks:
            $&#123;parts vertical terminator [;]&#125;
        Calculation
            [? Risk adjusted by = $&#123;riskAdjustment&#125; ]
            calculated premium: $&#123;calculation&#125;
        [?Helper functions:
            $&#123;helpers vertical&#125;]
]&#125;

CalcFunction &#123;
    [
        $&#123;name&#125; ( $&#123;parameters horizontal separator[,]&#125; ): $&#123;declaredType&#125; &#123;
            $&#123;body&#125;
        &#125;
    ]
&#125;
Description &#123;
    [$&#123;content&#125;]
&#125;
Parameter &#123;
     [$&#123;name&#125; : $&#123;declaredType&#125;]
&#125;

// No need for projections for DocuType and its implementors, they
// are only used as references, so their names suffice.

Entity &#123;[
    $&#123;self.isCompany [COMPANY]&#125; $&#123;self.name&#125;
]&#125;
</code></pre> <!>`,1);function Be(C,t){fe(t,!0);const d=ge({});De(()=>{document.querySelectorAll("pre").forEach(o=>{const a=document.createElement("div");a.className="copy-prompt";const c=document.createElement("p");c.innerHTML="👆 Click to copy",c.className="copy-prompt-p";const N=document.createElement("img");N.src="/icons/copy-icon.svg",N.className="copy-prompt-img",a.appendChild(N),a.appendChild(c),o.appendChild(a),o.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{o.querySelector("code")?.textContent!==null&&o.querySelector("code")?.textContent!==void 0&&Le(o.querySelector("code").textContent),o.querySelector(".copy-prompt > p")?.innerHTML!==null&&o.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(o.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{o.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let E="/Documentation/Creating_the_Metamodel/Defining_Properties",w="/Documentation/Defining_an_Editor/Projections";var M=ze(),S=U(M);ue(S,{prevLink:E,nextLink:w});var k=i(S,2);F(k,{tag:"h1",id:"defining-an-editor-1",onIntersectChange:e=>t.setVisible("defining-an-editor-1",e),get intersecting(){return d["defining-an-editor-1"]},set intersecting(e){d["defining-an-editor-1"]=e},children:(e,o)=>{h();var a=_("Defining an Editor");r(e,a)},$$slots:{default:!0}});var D=i(k,8);W(D,{header:a=>{h();var c=_("The projection comes first");r(a,c)},content:a=>{h();var c=_("For every concept or interface, define the projection before the trigger and/or symbol.");r(a,c)},$$slots:{header:!0,content:!0}});var L=i(D,2);F(L,{tag:"h2",id:"named-editors-or-projection-sets-2",onIntersectChange:e=>t.setVisible("named-editors-or-projection-sets-2",e),get intersecting(){return d["named-editors-or-projection-sets-2"]},set intersecting(e){d["named-editors-or-projection-sets-2"]=e},children:(e,o)=>{h();var a=_("Named Editors or Projection Sets");r(e,a)},$$slots:{default:!0}});var H=i(L,10);F(H,{tag:"h2",id:"the-default-editor-3",onIntersectChange:e=>t.setVisible("the-default-editor-3",e),get intersecting(){return d["the-default-editor-3"]},set intersecting(e){d["the-default-editor-3"]=e},children:(e,o)=>{h();var a=_("The Default Editor");r(e,a)},$$slots:{default:!0}});var V=i(H,10);Ne(V,{imageName:"documentation/Defining-an-Editor-Screenshot.png",caption:"Generated Default Projection",figureNumber:1});var R=i(V,2);F(R,{tag:"h2",id:"editor-precedence-4",onIntersectChange:e=>t.setVisible("editor-precedence-4",e),get intersecting(){return d["editor-precedence-4"]},set intersecting(e){d["editor-precedence-4"]=e},children:(e,o)=>{h();var a=_("Editor Precedence");r(e,a)},$$slots:{default:!0}});var x=i(R,8);{const e=a=>{h();var c=_("Each editor can be defined in multiple files");r(a,c)},o=a=>{var c=Fe();h(2),r(a,c)};W(x,{header:e,content:o,header2:e,content2:o,$$slots:{header2:!0,content2:!0}})}var Y=i(x,4);F(Y,{tag:"h2",id:"running-the-editor-generator-5",onIntersectChange:e=>t.setVisible("running-the-editor-generator-5",e),get intersecting(){return d["running-the-editor-generator-5"]},set intersecting(e){d["running-the-editor-generator-5"]=e},children:(e,o)=>{h();var a=_("Running the Editor Generator");r(e,a)},$$slots:{default:!0}});var A=i(Y,6);{const e=a=>{h();var c=_("Incomplete code");r(a,c)},o=a=>{var c=Ae();h(2),r(a,c)};W(A,{header:e,content:o,header3:e,content3:o,$$slots:{header3:!0,content3:!0}})}var $=i(A,2);F($,{tag:"h2",id:"example-edit-file-6",onIntersectChange:e=>t.setVisible("example-edit-file-6",e),get intersecting(){return d["example-edit-file-6"]},set intersecting(e){d["example-edit-file-6"]=e},children:(e,o)=>{h();var a=qe();h(2),r(e,a)},$$slots:{default:!0}});var q=i($,6);ue(q,{prevLink:E,nextLink:w}),r(C,M),he()}var Me=u('<meta property="article:published_time"/>'),He=u('<meta property="article:modified_time"/>'),Ve=u('<meta property="article:tag"/>'),Re=u('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Ye=(C,t)=>{ve(t,!n(t))},Ge=u('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Ue=u('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ze=u('<li class="page-toc-text"><a> </a></li>'),Je=u('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ke=u('<li class="page-toc-text"><a> </a></li>'),We=u('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function lt(C,t){fe(t,!0);let d=le(!1);const E=ge([{id:"defining-an-editor-1",title:"Defining an Editor",visible:!1,ref:"#defining-an-editor-1"},{id:"named-editors-or-projection-sets-2",title:"Named Editors or Projection Sets",visible:!1,ref:"#named-editors-or-projection-sets-2"},{id:"the-default-editor-3",title:"The Default Editor",visible:!1,ref:"#the-default-editor-3"},{id:"editor-precedence-4",title:"Editor Precedence",visible:!1,ref:"#editor-precedence-4"},{id:"running-the-editor-generator-5",title:"Running the Editor Generator",visible:!1,ref:"#running-the-editor-generator-5"},{id:"example-edit-file-6",title:"Example .edit File",visible:!1,ref:"#example-edit-file-6"}]);let w=le(0);function M(s,l){const v=E.find(m=>m.id===s);v&&(v.visible=l);const f=E.findIndex(m=>m.visible);f>=0&&ve(w,f,!0)}const S=J(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),k=J(()=>t.data.page.description??t.data.category.description),D="https://freon4dsl.dev/images/freon-banner.png";let L=J(()=>{const s=Se.url.pathname;return`https://freon4dsl.dev${s==="/"?"/":s.replace(/\/$/,"")}`});const H=t.data.site?.tags??[],V=t.data.category?.tags??[],R=t.data.page.tags??[],x=[...new Set([...H,...V,...R].filter(Boolean))],Y={"@context":"https://schema.org","@type":"WebPage",headline:n(S),description:n(k),url:n(L),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:x.length?x.join(", "):void 0,image:D,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var A=We();Ce(s=>{var l=Re(),v=U(l),f=i(v,4),m=i(f,2);{var I=g=>{var T=Me();O(()=>p(T,"content",t.data.page.publishedTime)),r(g,T)};B(m,g=>{t.data.page.publishedTime&&g(I)})}var P=i(m,2);{var j=g=>{var T=He();O(()=>p(T,"content",t.data.page.modifiedTime)),r(g,T)};B(P,g=>{t.data.page.modifiedTime&&g(j)})}var z=i(P,2);{var Z=g=>{var T=je(),we=U(T);K(we,17,()=>x,ke,(xe,Pe)=>{var ce=Ve();O(()=>p(ce,"content",n(Pe))),r(xe,ce)}),r(g,T)};B(z,g=>{x&&g(Z)})}var G=i(z,2),te=i(G,4),ie=i(te,2),ae=i(ie,2),oe=i(ae,2);p(oe,"content",D);var re=i(oe,2),ne=i(re,4),se=i(ne,2),de=i(se,2);p(de,"content",D);var be=i(de,2);Ie(be,()=>`<script type="application/ld+json">${JSON.stringify(Y)}<\/script>`),O(g=>{Te.title=n(S)??"",p(v,"content",n(k)),p(f,"href",n(L)),p(G,"content",g),p(te,"content",n(S)),p(ie,"content",n(k)),p(ae,"content",t.data.site.title),p(re,"content",n(L)),p(ne,"content",n(S)),p(se,"content",n(k))},[()=>x.join(", ")]),r(s,l)});var $=U(A),q=b($),e=i(b(q),2);e.__click=[Ye,d];var o=b(e);{var a=s=>{var l=Ge();r(s,l)},c=s=>{var l=Ue();r(s,l)};B(o,s=>{n(d)?s(a):s(c,!1)})}y(e),y(q);var N=i(q,2);{var ye=s=>{var l=Je(),v=b(l);K(v,22,()=>E,f=>f,(f,m,I)=>{var P=Ze(),j=b(P);let z;var Z=b(j,!0);y(j),y(P),O(G=>{p(j,"href",m.ref),z=me(j,1,"",null,z,G),pe(Z,m.title)},[()=>({"page-visible":n(I)===n(w),"page-nonvisible":n(I)!==n(w)})]),r(f,P)}),y(v),y(l),r(s,l)};B(N,s=>{n(d)&&s(ye)})}var Q=i(N,2);$e(Q,{});var _e=i(Q,2);Be(_e,{setVisible:M}),y($);var X=i($,2),ee=i(b(X),2);K(ee,22,()=>E,s=>s,(s,l,v)=>{var f=Ke(),m=b(f);let I;var P=b(m,!0);y(m),y(f),O(j=>{p(m,"href",l.ref),I=me(m,1,"",null,I,j),pe(P,l.title)},[()=>({"page-visible":n(v)===n(w),"page-nonvisible":n(v)!==n(w)})]),r(s,f)}),y(ee),y(X),r(C,A),he()}Ee(["click"]);export{lt as component,ct as universal};
//# sourceMappingURL=31.C5joW_CF.js.map
