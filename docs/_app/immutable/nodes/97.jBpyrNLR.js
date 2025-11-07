import{f,a as s,t as q,e as Pe}from"../chunks/nks1QWJh.js";import{y as me,G as fe,x as $,z as ue,u as o,A as k,g as a,I as le,B as G,a as N,$ as xe,v as w,s as he,w as h}from"../chunks/bZIXIZs8.js";import{d as Fe,i as D,s as ce}from"../chunks/DANOUgWt.js";import{e as U,p as Ee,i as ke,s as de}from"../chunks/CKHUE_gp.js";import{h as Se}from"../chunks/DCXhKCCG.js";import{h as Ce}from"../chunks/aX-frc9G.js";import{s as d}from"../chunks/BpSVRMQn.js";import{o as Le}from"../chunks/D62n5Z03.js";import{P as pe,S as O,c as Ne,B as Me}from"../chunks/CFDUsp8k.js";import{N as Ie}from"../chunks/B1swYv4A.js";import{F as ge}from"../chunks/Bq9rkPJ0.js";const qe=async({parent:S})=>{const{site:t,category:l}=await S();return{site:t,category:l,page:{title:"More Fun with Projections",description:"Explore advanced Freon editor projections—build tables, define multiple editor views, control precedence, and target specific projections for concepts like FlowRule and PageTransition.",tags:["Freon","projectional editing","editor","projections","tables","Flow","FlowRule","PageTransition","rules_as_table","footing editor","multiple editors","editor precedence","Education language","tutorial"],modifiedTime:"2025-11-07T17:20:18.626Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},lt=Object.freeze(Object.defineProperty({__proto__:null,load:qe},Symbol.toStringTag,{value:"Module"}));var De=f("A projection for the <em>Flow</em> model unit",1),Oe=f(`<p>Unfortunately, it’s not possible to show the same property of a concept twice in the same editor.
The tooling that keeps the underlying model and the editor view in sync doesn’t allow this.</p>`),We=f(`<!> <!> <p>Freon projections are very flexible. In this lesson we’re going to explore several ways to make your editor look great.
We’re going to create tables!</p> <!> <p>We almost forgot to make an editor definition for the <em>Flow</em> model unit. Create a file called <code>edu-flow.edit</code>,
and add the following lines. You should be familiar with everything in these projections by now.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson3-defs/edu-flow.edit

/* This file contains the default editor definition. */

editor default

Flow &#123;[
    Flow $&#123;self.name&#125; for SiteGroup $&#123;self.main&#125;

    $&#123;self.rules vertical&#125;
]&#125;

FlowRule &#123;[
    -------------------------------------
    Name: $&#123;self.name&#125;
    Description: $&#123;self.description&#125;
    From page $&#123;self.page&#125;

        $&#123;self.transitions&#125;
]&#125;

PageTransition &#123;[
    when $&#123;self.condition&#125; goto page $&#123;self.toPage&#125;
]&#125;</code></pre> <p>Yes—generate the editor and try it! To see this definition in action, click the arrow-left
icon in the top bar and select <strong>StartFlow</strong> from the list of model units. It looks like this:</p> <!> <!> <p>With Freon you can have multiple views on the same concept. Freon generates a <a href="/Background/Projectional_Editing">projectional editor</a>.</p> <p>Remember that the editor definition in the previous lesson and the one above are called <code>default</code>? That’s
because you can create any number of editor definitions, each with its own name.</p> <p>You can think of an editor as a different view on the model, but in terms of the editor definition,
it’s simply a set of projection definitions. This set can change the appearance of a single concept
or multiple concepts.</p> <p>When an editor definition doesn’t include a projection for a certain concept, it falls back to a projection from another
editor definition. Which projection is chosen is determined by a fixed algorithm.
For details, see <a href="/Documentation/Defining_an_Editor#editor-precedence-4">Editor Precedence</a>.</p> <!> <!> <p>Let’s create a second editor definition for the <em>Flow</em> model unit—one that displays
the list of <em>PageTransitions</em> in a <em>FlowRule</em> as a table.
We’ll name this editor definition <code>rules_as_table</code>. Put it in <code>edu-flow-table.edit</code>.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson3-defs/edu-flow-table.edit#L3-L3

editor rules_as_table</code></pre> <p>To create a projection for <em>FlowRule</em>, we’ll reuse the default projection with one change:
we remove the keyword <code>vertical</code> from <code>$&#123;self.transitions&#125;</code> and add <code>table</code>.</p> <p>Furthermore, we want one element per row, so we add the keyword <code>rows</code>.<br/> (You can also display one element per column using <code>columns</code>.)</p> <pre class="language-freon"><code class="language-freon">// Education/lesson3-defs/edu-flow-table.edit#L5-L12

FlowRule &#123;[
    -------------------------------------
    Name: $&#123;name&#125;
        Description: $&#123;self.description&#125;
        For page $&#123;page&#125;

        $&#123;self.transitions table rows&#125;
]&#125;</code></pre> <p>Next, define the table itself. Each element in the list is an instance of the <em>PageTransition</em> concept,
so we add a projection for this concept—but we prefix it with the keyword <code>table</code>.<br/> This means the projection is only used when the concept is rendered within a list projected <strong>as a table</strong>.</p> <p>You may also add headers (taken literally). Here the headers are <code>Condition</code> and <code>Goto Page</code>.<br/> The <code>|</code> character separates columns. Headers are optional.</p> <p>Finally, specify the cell content by indicating which property goes into each column.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson3-defs/edu-flow-table.edit#L14-L17

PageTransition &#123; table [
    Condition          | Goto Page
    $&#123;self.condition&#125;  |  $&#123;self.toPage&#125;
]&#125;</code></pre> <p>Note that for <em>PageTransition</em> we defined a table with two parts. The <strong>context</strong> in which these objects are projected
determines whether they appear as <strong>rows</strong> or <strong>columns</strong>.</p> <p>After saving <code>edu-flow-table.edit</code>, run the generator again. Find the model unit
named <strong>StartFlow</strong> and… yes, there’s a table. Try switching <code>rows</code> to <code>columns</code> in the <em>FlowRule</em> projection
to see the difference.</p> <!> <p>If you want to revert to the earlier look, open the <strong>View</strong> menu, deselect <strong>rules_as_table</strong>, and click <strong>Apply changes</strong>.<br/> The menu lists each editor definition by name; as you add more, you can toggle them on or off.</p> <!> <p>We mentioned that there is an <a href="/Documentation/Defining_an_Editor#editor-precedence-4">algorithm</a> that determines which projection is shown.
Sometimes you want to force a specific projection. You can do this by stating the concept <strong>and</strong> the editor name using <code>[=&gt;ConceptName:editor-name]</code>—for example, <code>[=&gt;Page:footing]</code>.</p> <p>Before using the <code>footing</code> editor, create it. Add a file called <code>page-footing.edit</code> and copy:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson3-defs/page-footing.edit#L3-L8

editor footing

Page &#123;[
    Questions:
        $&#123;self.questions vertical terminator [END]&#125;
]&#125;</code></pre> <p>Now we can specify a specific editor. Rewrite <code>edu-topics.edit</code> as follows:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson3-defs/edu-topics.edit#L17-L60


Theory &#123;[
    ----------------------------------------------------
    Theory [=&gt;Page]
        $&#123;self.content vertical  terminator[== END OF LINE]&#125;

        [=&gt;Page:footing]
]&#125;

Video &#123;[
    ----------------------------------------------------
    Video [=&gt;Page]
        Maybe this video will help you understand.
        $&#123;self.url&#125;

        [=&gt;Page:footing]
]&#125;

WorkSheet &#123;[
    ----------------------------------------------------
    Worksheet [=&gt;Page]
        See if you can answer the following questions.

        [=&gt;Page:footing]
]&#125;

ExamplePage &#123;[
    ----------------------------------------------------
    Example [=&gt;Page]
        $&#123;self.content&#125;

        Now, please, answer the following questions.

        [=&gt;Page:footing]
]&#125;

InDepthMaterial &#123;[
    ----------------------------------------------------
    InDepthMaterial [=&gt;Page]
        $&#123;self.content&#125;

        Test your understanding by answering the following questions.

        [=&gt;Page:footing]</code></pre> <p>Try it out! There’s a lot of fun to be had with projections.
In the next lesson we’ll add expressions to the metamodel and to the editor definitions.</p> <!>`,1);function Be(S,t){me(t,!0);const l=fe({});Le(()=>{document.querySelectorAll("pre").forEach(r=>{const n=document.createElement("div");n.className="copy-prompt";const v=document.createElement("p");v.innerHTML="👆 Click to copy",v.className="copy-prompt-p";const M=document.createElement("img");M.src="/icons/copy-icon.svg",M.className="copy-prompt-img",n.appendChild(M),n.appendChild(v),r.appendChild(n),r.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{r.querySelector("code")?.textContent!==null&&r.querySelector("code")?.textContent!==void 0&&Ne(r.querySelector("code").textContent),r.querySelector(".copy-prompt > p")?.innerHTML!==null&&r.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(r.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{r.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let P="/Tutorial/Making_an_Editor",y="/Tutorial/Expressions_in_Freon";var W=We(),x=$(W);pe(x,{prevLink:P,nextLink:y});var F=o(x,2);O(F,{tag:"h1",id:"more-fun-with-projections-1",onIntersectChange:e=>t.setVisible("more-fun-with-projections-1",e),get intersecting(){return l["more-fun-with-projections-1"]},set intersecting(e){l["more-fun-with-projections-1"]=e},children:(e,r)=>{k();var n=q("More Fun with Projections");s(e,n)},$$slots:{default:!0}});var C=o(F,4);O(C,{tag:"h2",id:"a-projection-for-the-flow-model-unit-2",onIntersectChange:e=>t.setVisible("a-projection-for-the-flow-model-unit-2",e),get intersecting(){return l["a-projection-for-the-flow-model-unit-2"]},set intersecting(e){l["a-projection-for-the-flow-model-unit-2"]=e},children:(e,r)=>{k();var n=De();k(2),s(e,n)},$$slots:{default:!0}});var L=o(C,8);ge(L,{imageName:"tutorial/Tutorial-lesson3-screenshot1.png",caption:"Editor after adding projections for the Flow model unit",figureNumber:1});var B=o(L,2);O(B,{tag:"h2",id:"more-than-one-editor-3",onIntersectChange:e=>t.setVisible("more-than-one-editor-3",e),get intersecting(){return l["more-than-one-editor-3"]},set intersecting(e){l["more-than-one-editor-3"]=e},children:(e,r)=>{k();var n=q("More than One Editor");s(e,n)},$$slots:{default:!0}});var R=o(B,10);Ie(R,{header:n=>{k();var v=q("One property, one occurrence in the editor");s(n,v)},content:n=>{var v=Oe();s(n,v)},$$slots:{header:!0,content:!0}});var V=o(R,2);O(V,{tag:"h2",id:"creating-tables-4",onIntersectChange:e=>t.setVisible("creating-tables-4",e),get intersecting(){return l["creating-tables-4"]},set intersecting(e){l["creating-tables-4"]=e},children:(e,r)=>{k();var n=q("Creating Tables");s(e,n)},$$slots:{default:!0}});var _=o(V,24);ge(_,{imageName:"tutorial/Tutorial-lesson3-screenshot2.png",caption:"Editor after adding projections for the Flow model unit",figureNumber:2});var A=o(_,4);O(A,{tag:"h2",id:"using-a-specific-editor-5",onIntersectChange:e=>t.setVisible("using-a-specific-editor-5",e),get intersecting(){return l["using-a-specific-editor-5"]},set intersecting(e){l["using-a-specific-editor-5"]=e},children:(e,r)=>{k();var n=q("Using a Specific Editor");s(e,n)},$$slots:{default:!0}});var H=o(A,14);pe(H,{prevLink:P,nextLink:y}),s(S,W),ue()}var Re=f('<meta property="article:published_time"/>'),Ve=f('<meta property="article:modified_time"/>'),Ae=f('<meta property="article:tag"/>'),He=f('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Ye=(S,t)=>{he(t,!a(t))},$e=f('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),ze=f('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ge=f('<li class="page-toc-text"><a> </a></li>'),Ue=f('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ze=f('<li class="page-toc-text"><a> </a></li>'),Je=f('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function ct(S,t){me(t,!0);let l=le(!1);const P=fe([{id:"more-fun-with-projections-1",title:"More Fun with Projections",visible:!1,ref:"#more-fun-with-projections-1"},{id:"a-projection-for-the-flow-model-unit-2",title:"A projection for the Flow model unit",visible:!1,ref:"#a-projection-for-the-flow-model-unit-2"},{id:"more-than-one-editor-3",title:"More than One Editor",visible:!1,ref:"#more-than-one-editor-3"},{id:"creating-tables-4",title:"Creating Tables",visible:!1,ref:"#creating-tables-4"},{id:"using-a-specific-editor-5",title:"Using a Specific Editor",visible:!1,ref:"#using-a-specific-editor-5"}]);let y=le(0);function W(i,c){const u=P.find(p=>p.id===i);u&&(u.visible=c);const g=P.findIndex(p=>p.visible);g>=0&&he(y,g,!0)}const x=G(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),F=G(()=>t.data.page.description??t.data.category.description),C="https://freon4dsl.dev/images/freon-banner.png";let L=G(()=>{const i=Ee.url.pathname;return`https://freon4dsl.dev${i==="/"?"/":i.replace(/\/$/,"")}`});const B=t.data.site?.tags??[],R=t.data.category?.tags??[],V=t.data.page.tags??[],_=[...new Set([...B,...R,...V].filter(Boolean))],A={"@context":"https://schema.org","@type":"WebPage",headline:a(x),description:a(F),url:a(L),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:_.length?_.join(", "):void 0,image:C,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var H=Je();Ce(i=>{var c=He(),u=$(c),g=o(u,4),p=o(g,2);{var E=m=>{var j=Re();N(()=>d(j,"content",t.data.page.publishedTime)),s(m,j)};D(p,m=>{t.data.page.publishedTime&&m(E)})}var b=o(p,2);{var T=m=>{var j=Ve();N(()=>d(j,"content",t.data.page.modifiedTime)),s(m,j)};D(b,m=>{t.data.page.modifiedTime&&m(T)})}var I=o(b,2);{var z=m=>{var j=Pe(),be=$(j);U(be,17,()=>_,ke,(Te,je)=>{var se=Ae();N(()=>d(se,"content",a(je))),s(Te,se)}),s(m,j)};D(I,m=>{_&&m(z)})}var Y=o(I,2),X=o(Y,4),ee=o(X,2),te=o(ee,2),oe=o(te,2);d(oe,"content",C);var ae=o(oe,2),ne=o(ae,4),ie=o(ne,2),re=o(ie,2);d(re,"content",C);var _e=o(re,2);Se(_e,()=>`<script type="application/ld+json">${JSON.stringify(A)}<\/script>`),N(m=>{xe.title=a(x)??"",d(u,"content",a(F)),d(g,"href",a(L)),d(Y,"content",m),d(X,"content",a(x)),d(ee,"content",a(F)),d(te,"content",t.data.site.title),d(ae,"content",a(L)),d(ne,"content",a(x)),d(ie,"content",a(F))},[()=>_.join(", ")]),s(i,c)});var e=$(H),r=w(e),n=o(w(r),2);n.__click=[Ye,l];var v=w(n);{var M=i=>{var c=$e();s(i,c)},ve=i=>{var c=ze();s(i,c)};D(v,i=>{a(l)?i(M):i(ve,!1)})}h(n),h(r);var Z=o(r,2);{var we=i=>{var c=Ue(),u=w(c);U(u,22,()=>P,g=>g,(g,p,E)=>{var b=Ge(),T=w(b);let I;var z=w(T,!0);h(T),h(b),N(Y=>{d(T,"href",p.ref),I=de(T,1,"",null,I,Y),ce(z,p.title)},[()=>({"page-visible":a(E)===a(y),"page-nonvisible":a(E)!==a(y)})]),s(g,b)}),h(u),h(c),s(i,c)};D(Z,i=>{a(l)&&i(we)})}var J=o(Z,2);Me(J,{});var ye=o(J,2);Be(ye,{setVisible:W}),h(e);var Q=o(e,2),K=o(w(Q),2);U(K,22,()=>P,i=>i,(i,c,u)=>{var g=Ze(),p=w(g);let E;var b=w(p,!0);h(p),h(g),N(T=>{d(p,"href",c.ref),E=de(p,1,"",null,E,T),ce(b,c.title)},[()=>({"page-visible":a(u)===a(y),"page-nonvisible":a(u)!==a(y)})]),s(i,g)}),h(K),h(Q),s(S,H),ue()}Fe(["click"]);export{ct as component,lt as universal};
//# sourceMappingURL=97.jBpyrNLR.js.map
