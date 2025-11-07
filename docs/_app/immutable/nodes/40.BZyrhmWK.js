import{f as m,a as r,t as h,e as Pe}from"../chunks/nks1QWJh.js";import{y as ge,G as ve,x as K,z as ye,u as n,A as s,g as c,I as ue,B as ee,a as F,$ as Ie,v as _,s as be,w as b}from"../chunks/bZIXIZs8.js";import{d as $e,i as H,s as me}from"../chunks/DANOUgWt.js";import{e as te,p as Te,i as Le,s as he}from"../chunks/CKHUE_gp.js";import{h as ke}from"../chunks/DCXhKCCG.js";import{h as Ce}from"../chunks/aX-frc9G.js";import{s as u}from"../chunks/BpSVRMQn.js";import{o as Se}from"../chunks/D62n5Z03.js";import{P as fe,S as C,c as Ae,B as ze}from"../chunks/CFDUsp8k.js";import{N as S}from"../chunks/B1swYv4A.js";const Ee=async({parent:A})=>{const{site:a,category:d}=await A();return{site:a,category:d,page:{title:"Projections",description:"Learn how to define projections in Freon, including property inclusion, named projections, lists, tables, optional projections, and inherited projections for flexible and readable editor layouts.",tags:["projections","editor definition","named projections","lists","tables","optional projections","inherited projections","Freon","DSL development","concrete syntax"],modifiedTime:"2025-11-07T19:03:58.393Z",publishedTime:"2025-11-07T17:20:18.610Z"}}},lt=Object.freeze(Object.defineProperty({__proto__:null,load:Ee},Symbol.toStringTag,{value:"Module"}));var De=m("Only the properties that are directly owned by the concept or interface are allowed. For instance, <code>self.declaredType.name</code> is not a valid property projection.",1),Be=m("<code>self</code> is optional",1),Ne=m("Because you may only use direct properties, the prefix <code>self</code> may be omitted.",1),Oe=m(`A terminator or separator should not contain a newline character. Horizontal or vertical layout is
purely determined by the keywords <code>horizontal</code> and <code>vertical</code>.`,1),Fe=m(`Each of the properties in a table is displayed using its own projection.
In this example, <code>name</code> is a string, and will be displayed as an editable text,
and <code>maximumPayout</code> is a <code>EuroLiteral</code> Note that the properties can be lists themselves, which can be displayed as lists or tables.`,1),Me=m(`<!> <!> <p>A projection is defined using angular brackets,
in a style similar to Markdown. The appearance of the definition
closely resembles the resulting output. Everything within square
brackets (<code>[]</code>), except text enclosed in <code>$&#123;&#125;</code>, is interpreted
literally, including the indentation. For more details, refer to the information
on <a href="/Documentation/Defining_an_Editor/Indentation">Indentation</a>.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-indentation.edit#L6-L14

Text &#123;
[
This is
        literal text
      that is projected in the
                editor
  for every concept of type Text.
]
&#125;</code></pre> <!> <p>When defining a projection for a concept or interface, you will likely need
to include its properties. This is done using the special notation <code>$&#123;&#125;</code>, which
instructs Freon to include a property according to the projection of its type.</p> <p>For example, given the following metamodel:</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L22-L32

// A BaseProduct defines all the different elements ('parts') that can be
// used to create a marketable InsuranceProduct.
concept BaseProduct &#123;
    name: identifier;               // internal name
    isUnderConstruction: boolean;   // defines whether this base product is still 'raw'
    theme: InsuranceTheme;          // the 'kind' of insurance
    parts: InsurancePart[];         // all parts of this product
    // The following properties are present to show the different options for displaying booleans.
    isApprovedLevel1: boolean;
    isApprovedLevel2: boolean;
    isApprovedLevel3: boolean;</code></pre> <p>consider the property <code>self.body</code>, which is of type <code>DocuExpression</code>. It
will be displayed based on the projection defined for <code>DocuExpression</code>.
Meanwhile, <code>self.declaredType</code> is a property of the abstract type <code>DocuType</code>.
This property will be projected according to the definition of
the specific (non-abstract) subtype of <code>DocuType</code> encountered at runtime.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-main-default.edit#L38-L49

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
]&#125;</code></pre> <!> <!> <!> <!> <p>By default, a property you include will be displayed using the projection
defined for its type. Freon determines this projection based on the
precedence specified in the <code>.edit</code> files.</p> <p>If you want to use a specific projection from a different editor,
you can use a <strong>named property projection</strong>. In this case, Freon
will look for the projection in the editor with the specified name.</p> <p>In the next example, the projection for <code>self.parts:comments</code> will first be searched
in the editor named <code>comments</code>. If it is not found there,
Freon will fall back to the standard precedence order of projections.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-named-proj.edit#L3-L8

BaseProduct &#123;[
    /* In this projection 'self.parts' is always shown according to the projection */
    /* defined for concept InsurancePart in the editor 'comments'.                 */
    Base Products $&#123;self.name&#125; for $&#123;self.theme&#125;
        $&#123;self.parts:comments&#125;
]&#125;</code></pre> <!> <p>For list properties, you can specify horizontal or vertical projection. Both options are optional. If
neither <code>vertical</code> nor <code>horizontal</code> is specified, the property
will be displayed as a vertical list by default.</p> <p>You can also choose to project a list property
as a <a href="/Documentation/Defining_an_Editor/Projections#tables-5">table</a>.</p> <p>For a list, you can include the following options:</p> <ul><li>A <strong>separator</strong> string, which will appear between each element.</li> <li>A <strong>terminator</strong> string, which will appear after each element.</li> <li>An <strong>initiator</strong> string, which will appear before each element.</li></ul> <p>All of these are optional. The default separator is a single space.</p> <p>In the following example, the list <code>parts</code> is displayed vertically
with a <code>';'</code> terminator. The list <code>themes</code> is displayed horizontally
with a <code>', '</code> separator. The list <code>helpers</code> is shown as a vertical
list without any separator, terminator, or initiator. In fact,
the <code>vertical</code> keyword could be omitted for <code>helpers</code>, as it is the
default projection for lists.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-main-default.edit#L38-L49

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
]&#125;</code></pre> <!> <!> <p>If a property is a list, you can choose to display it as a table.
Tables can be either row-based or column-based. In a row-based table,
each element of the list is displayed in a separate row, while
in a column-based table, each element is displayed in a single
column. The default is row-based.</p> <p>Defining a table involves two steps:</p> <ol><li>Add the keyword <code>table</code> to the list property you want to
display as a table. Optionally, you can also specify either <code>rows</code> or <code>columns</code>.</li> <li>Define a table-projection for the type of the elements
in the list. This projection specifies the table headers and</li> <li>determines how the elements of the list are arranged in rows or columns.</li></ol> <!> <p>To project the <code>parts</code> property of concept <code>BaseProduct</code> as a row based table,
you can use the following code.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-tables.edit#L13-L16

BaseProduct &#123;[
    Base Products $&#123;name&#125; for $&#123;theme&#125;
        $&#123;parts table rows&#125;
]&#125;</code></pre> <p>Given the above example, there should also be a projection tagged <code>table</code> for the
concept <code>InsurancePart</code> (the type of <code>parts</code>).
The example below defines four columns or rows, each with its own header.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-tables.edit#L6-L11

InsurancePart&#123;
table [
    Name    | risk               | pay out          | is approved
    $&#123;name&#125; | $&#123;statisticalRisk&#125; | $&#123;maximumPayOut&#125; | $&#123;isApproved&#125;
]
&#125;</code></pre> <!> <!> <!> <p>When a property is marked optional in the language structure definition (the <code>.ast</code> files), the projection
of this property should also be optional. This is indicated by <code>[?</code>.</p> <p>In the next example both the property <code>riskAdjustment</code> and <code>helpers</code> are only shown if they are present.
If they are not present, respectively the text <code>Risk adjusted by =</code> or <code>Helper functions:</code> is omitted as well.</p> <p>Note that optional projections for non-optional properties are not allowed.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-main-default.edit#L38-L49

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
]&#125;</code></pre> <!> <p>Just as concepts can inherit from other concepts, projection definitions can also inherit from their super concepts.
To indicate the inclusion the syntax <code>[=&gt; SUPER]</code> is used, where <code>SUPER</code> is the name of the super concept.</p> <p>For instance, in the UML metamodel both <code>AssociationClass</code> and <code>Class</code> inherit from the abstract <code>Classifier</code>. When building an editor for the UML metamodel,
one may define the projections as follows. The entries for <code>attributes</code>, <code>operations</code>, and <code>states</code> will appear for both child concepts.</p> <pre class="language-freon"><code class="language-freon">Classifier &#123;
        [
        [?&lt;attributes&gt;  $&#123;self.attributes vertical terminator [;] &#125;]
        [?&lt;operations&gt;  $&#123;self.operations vertical terminator [;] &#125;]
        [?&lt;states&gt;      $&#123;self.states     vertical separator [;] &#125;]
        ]
&#125;

AssociationClass &#123;
        [
        [?$&#123;self.visibility&#125;] &lt;associationclass&gt; $&#123;self.name&#125;
        $&#123;self.end1&#125; &lt;-&gt; $&#123;self.end2&#125;
        
        [=&gt; Classifier ]
        &lt;endassociationclass&gt;
        ]
&#125;

Class &#123;
    [
    [?$&#123;visibility&#125;] $&#123;self.isAbstract [&lt;abstract&gt;]&#125; &lt;class&gt; $&#123;self.name&#125;
    [?&lt;specializes&gt;  $&#123;self.generalizations horizontal separator [, ] &#125;]
    [?&lt;implements&gt;   $&#123;self.interfaces      horizontal separator [, ] &#125;]
    
    [=&gt; Classifier]
    &lt;endclass&gt;
    ]
&#125;</code></pre> <!>`,1);function qe(A,a){ge(a,!0);const d=ve({});Se(()=>{document.querySelectorAll("pre").forEach(o=>{const t=document.createElement("div");t.className="copy-prompt";const i=document.createElement("p");i.innerHTML="👆 Click to copy",i.className="copy-prompt-p";const O=document.createElement("img");O.src="/icons/copy-icon.svg",O.className="copy-prompt-img",t.appendChild(O),t.appendChild(i),o.appendChild(t),o.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{o.querySelector("code")?.textContent!==null&&o.querySelector("code")?.textContent!==void 0&&Ae(o.querySelector("code").textContent),o.querySelector(".copy-prompt > p")?.innerHTML!==null&&o.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(o.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{o.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let $="/Documentation/Defining_an_Editor",w="/Documentation/Defining_an_Editor/Indentation";var U=Me(),T=K(U);fe(T,{prevLink:$,nextLink:w});var L=n(T,2);C(L,{tag:"h1",id:"projections-1",onIntersectChange:e=>a.setVisible("projections-1",e),get intersecting(){return d["projections-1"]},set intersecting(e){d["projections-1"]=e},children:(e,o)=>{s();var t=h("Projections");r(e,t)},$$slots:{default:!0}});var z=n(L,6);C(z,{tag:"h2",id:"including-properties-2",onIntersectChange:e=>a.setVisible("including-properties-2",e),get intersecting(){return d["including-properties-2"]},set intersecting(e){d["including-properties-2"]=e},children:(e,o)=>{s();var t=h("Including Properties");r(e,t)},$$slots:{default:!0}});var E=n(z,12);S(E,{header:t=>{s();var i=h("Only direct properties are allowed");r(t,i)},content:t=>{s();var i=De();s(2),r(t,i)},$$slots:{header:!0,content:!0}});var V=n(E,2);{const e=t=>{var i=Be();s(),r(t,i)},o=t=>{s();var i=Ne();s(2),r(t,i)};S(V,{header:e,content:o,header2:e,content2:o,$$slots:{header2:!0,content2:!0}})}var R=n(V,2);{const e=t=>{s();var i=h("One property, one occurrence in the editor");r(t,i)},o=t=>{s();var i=h(`It is not possible to show the same property of a concept twice in the same editor.
The tooling we use to keep the state of the underlying model in sync with the view in the running editor
does not allow us to do this.`);r(t,i)};S(R,{header:e,content:o,header3:e,content3:o,$$slots:{header3:!0,content3:!0}})}var W=n(R,2);C(W,{tag:"h2",id:"using-named-projections-3",onIntersectChange:e=>a.setVisible("using-named-projections-3",e),get intersecting(){return d["using-named-projections-3"]},set intersecting(e){d["using-named-projections-3"]=e},children:(e,o)=>{s();var t=h("Using Named Projections");r(e,t)},$$slots:{default:!0}});var j=n(W,10);C(j,{tag:"h2",id:"lists-4",onIntersectChange:e=>a.setVisible("lists-4",e),get intersecting(){return d["lists-4"]},set intersecting(e){d["lists-4"]=e},children:(e,o)=>{s();var t=h("Lists");r(e,t)},$$slots:{default:!0}});var G=n(j,16);{const e=t=>{s();var i=h("Newlines in terminator or separator are ignored");r(t,i)},o=t=>{s();var i=Oe();s(4),r(t,i)};S(G,{header:e,content:o,header4:e,content4:o,$$slots:{header4:!0,content4:!0}})}var M=n(G,2);C(M,{tag:"h2",id:"tables-5",onIntersectChange:e=>a.setVisible("tables-5",e),get intersecting(){return d["tables-5"]},set intersecting(e){d["tables-5"]=e},children:(e,o)=>{s();var t=h("Tables");r(e,t)},$$slots:{default:!0}});var D=n(M,8);{const e=o=>{s();var t=h(`Note that you only need to include one
table projection for the elements for both column and row based tables.
Freon will swap the entries when needed.`);r(o,t)};S(D,{content:e,content5:e,$$slots:{content5:!0}})}var B=n(D,10);{const e=t=>{s();var i=h("Properties within a table are displayed according to their own projection");r(t,i)},o=t=>{s();var i=Fe();s(6),r(t,i)};S(B,{header:e,content:o,header6:e,content6:o,$$slots:{header6:!0,content6:!0}})}var N=n(B,2);{const e=t=>{s();var i=h("Whitespace in headers is ignored");r(t,i)},o=t=>{s();var i=h("Whitespace between headers is ignored, but aligning columns improves readability.");r(t,i)};S(N,{header:e,content:o,header7:e,content7:o,$$slots:{header7:!0,content7:!0}})}var J=n(N,2);C(J,{tag:"h2",id:"optional-projections-6",onIntersectChange:e=>a.setVisible("optional-projections-6",e),get intersecting(){return d["optional-projections-6"]},set intersecting(e){d["optional-projections-6"]=e},children:(e,o)=>{s();var t=h("Optional Projections");r(e,t)},$$slots:{default:!0}});var Z=n(J,10);C(Z,{tag:"h2",id:"inherited-projections-7",onIntersectChange:e=>a.setVisible("inherited-projections-7",e),get intersecting(){return d["inherited-projections-7"]},set intersecting(e){d["inherited-projections-7"]=e},children:(e,o)=>{s();var t=h("Inherited Projections");r(e,t)},$$slots:{default:!0}});var Q=n(Z,8);fe(Q,{prevLink:$,nextLink:w}),r(A,U),ye()}var He=m('<meta property="article:published_time"/>'),Ue=m('<meta property="article:modified_time"/>'),Ve=m('<meta property="article:tag"/>'),Re=m('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),We=(A,a)=>{be(a,!c(a))},Ge=m('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Je=m('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ze=m('<li class="page-toc-text"><a> </a></li>'),Ye=m('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ke=m('<li class="page-toc-text"><a> </a></li>'),Qe=m('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function dt(A,a){ge(a,!0);let d=ue(!1);const $=ve([{id:"projections-1",title:"Projections",visible:!1,ref:"#projections-1"},{id:"including-properties-2",title:"Including Properties",visible:!1,ref:"#including-properties-2"},{id:"using-named-projections-3",title:"Using Named Projections",visible:!1,ref:"#using-named-projections-3"},{id:"lists-4",title:"Lists",visible:!1,ref:"#lists-4"},{id:"tables-5",title:"Tables",visible:!1,ref:"#tables-5"},{id:"optional-projections-6",title:"Optional Projections",visible:!1,ref:"#optional-projections-6"},{id:"inherited-projections-7",title:"Inherited Projections",visible:!1,ref:"#inherited-projections-7"}]);let w=ue(0);function U(l,p){const y=$.find(f=>f.id===l);y&&(y.visible=p);const g=$.findIndex(f=>f.visible);g>=0&&be(w,g,!0)}const T=ee(()=>a.data.page.title?`${a.data.site.title} – ${a.data.category.title} – ${a.data.page.title}`:`${a.data.site.title} – ${a.data.category.title}`),L=ee(()=>a.data.page.description??a.data.category.description),z="https://freon4dsl.dev/images/freon-banner.png";let E=ee(()=>{const l=Te.url.pathname;return`https://freon4dsl.dev${l==="/"?"/":l.replace(/\/$/,"")}`});const V=a.data.site?.tags??[],R=a.data.category?.tags??[],W=a.data.page.tags??[],j=[...new Set([...V,...R,...W].filter(Boolean))],G={"@context":"https://schema.org","@type":"WebPage",headline:c(T),description:c(L),url:c(E),datePublished:a.data.page.publishedTime,dateModified:a.data.page.modifiedTime,keywords:j.length?j.join(", "):void 0,image:z,publisher:a.data?.site?.title?{"@type":"Organization",name:a.data.site.title}:void 0};var M=Qe();Ce(l=>{var p=Re(),y=K(p),g=n(y,4),f=n(g,2);{var k=v=>{var I=He();F(()=>u(I,"content",a.data.page.publishedTime)),r(v,I)};H(f,v=>{a.data.page.publishedTime&&v(k)})}var x=n(f,2);{var P=v=>{var I=Ue();F(()=>u(I,"content",a.data.page.modifiedTime)),r(v,I)};H(x,v=>{a.data.page.modifiedTime&&v(P)})}var q=n(x,2);{var X=v=>{var I=Pe(),we=K(I);te(we,17,()=>j,Le,(je,xe)=>{var pe=Ve();F(()=>u(pe,"content",c(xe))),r(je,pe)}),r(v,I)};H(q,v=>{j&&v(X)})}var Y=n(q,2),ae=n(Y,4),ne=n(ae,2),re=n(ne,2),ie=n(re,2);u(ie,"content",z);var se=n(ie,2),ce=n(se,4),le=n(ce,2),de=n(le,2);u(de,"content",z);var _e=n(de,2);ke(_e,()=>`<script type="application/ld+json">${JSON.stringify(G)}<\/script>`),F(v=>{Ie.title=c(T)??"",u(y,"content",c(L)),u(g,"href",c(E)),u(Y,"content",v),u(ae,"content",c(T)),u(ne,"content",c(L)),u(re,"content",a.data.site.title),u(se,"content",c(E)),u(ce,"content",c(T)),u(le,"content",c(L))},[()=>j.join(", ")]),r(l,p)});var D=K(M),B=_(D),N=n(_(B),2);N.__click=[We,d];var J=_(N);{var Z=l=>{var p=Ge();r(l,p)},Q=l=>{var p=Je();r(l,p)};H(J,l=>{c(d)?l(Z):l(Q,!1)})}b(N),b(B);var e=n(B,2);{var o=l=>{var p=Ye(),y=_(p);te(y,22,()=>$,g=>g,(g,f,k)=>{var x=Ze(),P=_(x);let q;var X=_(P,!0);b(P),b(x),F(Y=>{u(P,"href",f.ref),q=he(P,1,"",null,q,Y),me(X,f.title)},[()=>({"page-visible":c(k)===c(w),"page-nonvisible":c(k)!==c(w)})]),r(g,x)}),b(y),b(p),r(l,p)};H(e,l=>{c(d)&&l(o)})}var t=n(e,2);ze(t,{});var i=n(t,2);qe(i,{setVisible:U}),b(D);var O=n(D,2),oe=n(_(O),2);te(oe,22,()=>$,l=>l,(l,p,y)=>{var g=Ke(),f=_(g);let k;var x=_(f,!0);b(f),b(g),F(P=>{u(f,"href",p.ref),k=he(f,1,"",null,k,P),me(x,p.title)},[()=>({"page-visible":c(y)===c(w),"page-nonvisible":c(y)!==c(w)})]),r(l,g)}),b(oe),b(O),r(A,M),ye()}$e(["click"]);export{dt as component,lt as universal};
//# sourceMappingURL=40.BZyrhmWK.js.map
