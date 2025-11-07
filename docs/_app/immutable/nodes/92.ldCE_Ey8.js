import{f as p,a as s,t as H,e as xe}from"../chunks/nks1QWJh.js";import{y as me,G as ue,x as V,z as ge,u as o,A as v,g as n,I as se,B as Y,a as I,$ as Se,v as y,s as he,w}from"../chunks/bZIXIZs8.js";import{d as ke,i as N,s as le}from"../chunks/DANOUgWt.js";import{e as R,p as Fe,i as Ce,s as de}from"../chunks/CKHUE_gp.js";import{h as Pe}from"../chunks/DCXhKCCG.js";import{h as Ee}from"../chunks/aX-frc9G.js";import{s as c}from"../chunks/BpSVRMQn.js";import{o as Me}from"../chunks/D62n5Z03.js";import{P as ce,S as j,c as Ie,B as Ge}from"../chunks/CFDUsp8k.js";import{N as pe}from"../chunks/B1swYv4A.js";const Ae=async({parent:P})=>{const{site:t,category:l}=await P();return{site:t,category:l,page:{title:"Creating Your Metamodel",description:"Define the core metamodel for your Freon-based DSL by introducing model units (Topic, Flow, Test, SiteGroup), concepts, references, and limited concepts, and organize your definition files for generation.",tags:["Freon","metamodel","model units","AST","Topic","Flow","Test","SiteGroup","Page","references","UML","limited concept","enumeration","Education language","tutorial"],modifiedTime:"2025-11-07T18:52:21.430Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},dt=Object.freeze(Object.defineProperty({__proto__:null,load:Ae},Symbol.toStringTag,{value:"Module"}));var Ne=p("The <em>SiteGroup</em> model unit",1),je=p(`<p>A property of type string may contain any printable character, but the content of an identifier is bound to a number of rules.
These rules are equal to the rules in Typescript. Any concept or model unit that has a property <i>name</i> of type <i>identifier</i> can be referred to.</p>`),Be=p("The <em>Topic</em> model unit",1),qe=p(`<p>The Freon metamodel can be expressed in UML. For instance, a Freon concept may be compared to a UML class. 
It can have properties and associations with other concepts,
and it can inherit from other concepts and/or implement an interface.</p> <p>Likewise, reference properties may be compared to UML directed associations, while normal properties resemble aggregation relations.</p> <p>Freon automatically generates several UML class diagrams of your metamodel. You can find them in the
folder <code>src/diagrams</code>, along with other diagrams
(for example, one that focuses on inheritance relations).</p>`,1),De=p("The <em>Flow</em> model unit",1),Oe=p(`<!> <!> <p>From this point onward, we assume you have a Freon project open in your
favorite IDE—either by cloning the <a href="/Documentation/Overview/Getting_Started#creating-a-project-2">Example project</a> or the <a href="/Documentation/Overview/Getting_Started#creating-a-project-2">Template project</a>.</p> <!> <p>The first thing we need to decide is the name of our language and how we
want to partition any model the user creates. The user will see only one partition
at a time in the editor, but references can point to nodes in other partitions. In
Freon terminology these partitions are called <em>Model Units</em>.</p> <p>We’ll create a model with a number of topics. Each model is dedicated to
one of the courses that our client offers (i.e., one of their websites). Each model is divided into four
parts. The <strong>Topics</strong> part covers the different webpages available
for the topic. <strong>Flow</strong> defines how navigation between
pages should proceed. The <strong>Tests</strong> section defines tests for
topics and the flow between topics. Finally, the <strong>SiteGroup</strong> part provides an overview of
a site group with all subtopics, flows, and tests relevant to that topic.</p> <p>Create the file <code>edu-main.ast</code> in the <code>src/defs</code> folder, and add the following code.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson1-defs/edu-main.ast#L1-L10

language Education

model Education /* Computer Aided Learning */ &#123;
    name: identifier;
    topic: Topic[];
    flow: Flow[];
    tests: Test[];
    overviews: SiteGroup[];
&#125;</code></pre> <p>If you’re impatient and already tried to generate the editor, you’ll have noticed
that there are errors in our input. We need to define the concepts <code>Topic</code>, <code>Flow</code>, <code>Test</code>, and <code>SiteGroup</code>. All four are model units, so we define them as such.</p> <pre class="language-freon"><code class="language-freon">modelunit Topic &#123;

&#125;
modelunit Test &#123;

&#125;
modelunit Flow &#123;

&#125;
modelunit SiteGroup &#123;

&#125;</code></pre> <!> <p>Let’s focus on the <em>SiteGroup</em> model unit first. Because it’s likely that we’ll need to reference topics,
we give each topic a <code>name</code> of type <code>identifier</code>.</p> <!> <p>Every (sub)topic belongs to a site group, but we don’t want this relationship
to be like a UML aggregation, as that would be too restrictive here. Therefore, we introduce another feature of
Freon’s metamodel: the <strong>reference</strong>. You can compare a reference to a UML directed association, where the role name is the property name (<code>topics</code>), and the direction
is from the owner of the property (<code>SiteGroup</code>) to the property’s type (<code>Topic</code>). The square brackets after the type indicate
a list (multiple instances).</p> <p>Likewise, we define references to the flows and tests that are part of this site group.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson1-defs/edu-main.ast#L11-L17

modelunit SiteGroup &#123;
    name: identifier;
    description: string; /* e.g. Mathematics, fractions for students age 10 */
    reference topics: Topic[];
    reference flows: Flow[];
    reference tests: Test[];
&#125;</code></pre> <!> <p>To avoid very large files, you can split your language definition across as many files as you like.
As long as the file extension is <code>.ast</code>, the file
will be included as part of your language metamodel.</p> <p>So, let’s create another file to store the metamodel for the <em>Topic</em> model unit. Like the <em>SiteGroup</em> model
unit, the <em>Topic</em> model unit has a name of type <code>identifier</code>. A description is probably
useful as well; we give it the type <code>string</code>, because it may contain any characters.
We’re modeling a website, so the concept <strong>Page</strong> should definitely be present.
Each <code>Topic</code> will have a number of pages. The result for now is the code below.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson1-defs/edu-topics.ast#L3-L8

modelunit Topic &#123;
    name: identifier;
    reference main: SiteGroup;
    description: string;
    pages: Page[];
&#125;</code></pre> <p>So far, so good!</p> <p>Now, let’s outline the types of pages we’ll use.
There will be ordinary pages with explanatory text and
questions to test understanding. We also want content that’s engaging for kids—for instance, videos.
There should be pages with examples and pages with assignments. It’s a good
idea to make the <strong>Page</strong> concept abstract, and then define several concepts that inherit from it.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson1-defs/edu-topics.ast#L10-L39

abstract concept Page &#123;
    name: identifier;
    questions: Question[];
&#125;

concept Theory base Page &#123;
    /* For the sake of the example this is simplified.
    Should be formatted text including pictures, etc. */
    content: Line[];
&#125;

concept Line &#123;
    content: string;
&#125;

concept Video base Page &#123;
    url: string;
&#125;

concept WorkSheet base Page &#123;
&#125;

concept ExamplePage base Page &#123;
    content: Line[];
&#125;

concept InDepthMaterial base Page &#123;
    content: Line[];
&#125;</code></pre> <!> <p>But let’s not forget to add a definition for the concept <strong>Question</strong>. Freon will complain if you
use concepts you haven’t defined. And because we’re dealing with mathematics, we need to
represent fractions; a simple number won’t be sufficient.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson1-defs/edu-topics.ast#L41-L57

    name: identifier;
    content: string;
    correctAnswer: NumberConcept;
&#125;

abstract concept NumberConcept &#123;
&#125;

concept SimpleNumber base NumberConcept &#123;
    value: number;
&#125;

concept Fraction base NumberConcept &#123;
    numerator: number;
    denominator: number;
&#125;</code></pre> <p>By now, you’ve seen the gist of how to build a simple metamodel. For the sake of brevity,
we will not go further into defining the content of each page type. Let’s just assume
there is some content, represented here as lines of text.</p> <p>If you like, you can generate the editor for our DSL and try it out. Use the following command in the terminal
window of your IDE (you can swap <code>npm</code> for the package manager of your choice):</p> <pre class="language-bash"><code class="language-bash">npm run build</code></pre> <p>In the GitHub project, we’ve provided an example model named <code>lesson1</code>.
Before you open the editor, start the server.</p> <pre class="language-bash"><code class="language-bash">npm run start</code></pre> <p>Open the editor, select <code>lesson1</code> as the model, and have a browse.</p> <p>Yes, we know—it works, but it doesn’t look great. In the next lesson we’ll learn how to
make the model look more polished in the editor. But first, we’ll define the second model unit:
the description of the flow between pages.</p> <!> <p>Create a second file called <code>edu-flow.ast</code>. This file will contain the part of the metamodel that handles <strong>Flows</strong>.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson1-defs/edu-flow.ast#L1-L6

language Education

modelunit Flow &#123;
    reference main: SiteGroup;
    rules: FlowRule[];
&#125;</code></pre> <p>Here again, we use a reference to link the flow to a site group.</p> <p>In the following code, each <strong>FlowRule</strong> is linked to a specific page—the page the pupil is currently
working on. The flow rule determines which page to show next using a set of <strong>PageTransitions</strong>.
A page transition is a condition paired with a target page. If the condition is fulfilled, that
page will be the next in the flow.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson1-defs/edu-flow.ast#L8-L18

concept FlowRule &#123;
    name: identifier;
    description: string;
    reference page: Page;
    transitions: PageTransition[];
&#125;

concept PageTransition &#123; /* E.g. Grade A =&gt; show pageA, Grade F =&gt; show pageC */
    condition: Grade;
    reference toPage: Page;
&#125;</code></pre> <p>But how do we define the condition for a page transition? For now, we’ll take the straightforward approach and use an enumeration.
In Freon terminology this is a <a href="/Documentation/Creating_the_Metamodel/Language_Structure#limited-concept-7">limited concept</a>,
which is slightly more expressive than a traditional enumeration.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson1-defs/edu-flow.ast#L20-L27

limited Grade &#123;
    gradeA;
    gradeB;
    gradeC;
    gradeD;
    gradeE;
    gradeF;
&#125;</code></pre> <p>That’s the second model unit done!</p> <p>Again, you might want to generate the editor and try it out. Note that when you start the editor, it will open
with the topic from the previous step. Click the arrow-left icon in the top bar to open an
overview of all model units present in your project. Click on <code>StartFlow</code>, select <strong>Open</strong> from the dropdown,
and you can view and edit the partition we’ve prepared for you. Or play with the File menu—click <strong>New Model Unit</strong> and explore.</p> <p>Things still don’t look great, do they? Please be patient. In the next lesson you’ll learn to beautify the model’s appearance in the editor.</p> <!>`,1);function Ue(P,t){me(t,!0);const l=ue({});Me(()=>{document.querySelectorAll("pre").forEach(i=>{const a=document.createElement("div");a.className="copy-prompt";const m=document.createElement("p");m.innerHTML="👆 Click to copy",m.className="copy-prompt-p";const G=document.createElement("img");G.src="/icons/copy-icon.svg",G.className="copy-prompt-img",a.appendChild(G),a.appendChild(m),i.appendChild(a),i.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{i.querySelector("code")?.textContent!==null&&i.querySelector("code")?.textContent!==void 0&&Ie(i.querySelector("code").textContent),i.querySelector(".copy-prompt > p")?.innerHTML!==null&&i.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(i.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{i.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let S="/Tutorial/Overview",b="/Tutorial/Making_an_Editor";var B=Oe(),k=V(B);ce(k,{prevLink:S,nextLink:b});var F=o(k,2);j(F,{tag:"h1",id:"creating-your-metamodel-1",onIntersectChange:e=>t.setVisible("creating-your-metamodel-1",e),get intersecting(){return l["creating-your-metamodel-1"]},set intersecting(e){l["creating-your-metamodel-1"]=e},children:(e,i)=>{v();var a=H("Creating your Metamodel");s(e,a)},$$slots:{default:!0}});var E=o(F,4);j(E,{tag:"h2",id:"defining-the-model-and-model-units-2",onIntersectChange:e=>t.setVisible("defining-the-model-and-model-units-2",e),get intersecting(){return l["defining-the-model-and-model-units-2"]},set intersecting(e){l["defining-the-model-and-model-units-2"]=e},children:(e,i)=>{v();var a=H("Defining the model and model units");s(e,a)},$$slots:{default:!0}});var M=o(E,14);j(M,{tag:"h2",id:"the-sitegroup-model-unit-3",onIntersectChange:e=>t.setVisible("the-sitegroup-model-unit-3",e),get intersecting(){return l["the-sitegroup-model-unit-3"]},set intersecting(e){l["the-sitegroup-model-unit-3"]=e},children:(e,i)=>{v();var a=Ne();v(2),s(e,a)},$$slots:{default:!0}});var q=o(M,4);pe(q,{header:a=>{v();var m=H("The type identifier versus the type string.");s(a,m)},content:a=>{var m=je();s(a,m)},$$slots:{header:!0,content:!0}});var D=o(q,8);j(D,{tag:"h2",id:"the-topic-model-unit-4",onIntersectChange:e=>t.setVisible("the-topic-model-unit-4",e),get intersecting(){return l["the-topic-model-unit-4"]},set intersecting(e){l["the-topic-model-unit-4"]=e},children:(e,i)=>{v();var a=Be();v(2),s(e,a)},$$slots:{default:!0}});var O=o(D,14);{const e=a=>{v();var m=H("UML diagrams");s(a,m)},i=a=>{var m=qe();v(4),s(a,m)};pe(O,{header:e,content:i,header2:e,content2:i,$$slots:{header2:!0,content2:!0}})}var _=o(O,20);j(_,{tag:"h2",id:"the-flow-model-unit-5",onIntersectChange:e=>t.setVisible("the-flow-model-unit-5",e),get intersecting(){return l["the-flow-model-unit-5"]},set intersecting(e){l["the-flow-model-unit-5"]=e},children:(e,i)=>{v();var a=De();v(2),s(e,a)},$$slots:{default:!0}});var z=o(_,22);ce(z,{prevLink:S,nextLink:b}),s(P,B),ge()}var He=p('<meta property="article:published_time"/>'),Ve=p('<meta property="article:modified_time"/>'),ze=p('<meta property="article:tag"/>'),We=p('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Ye=(P,t)=>{he(t,!n(t))},Re=p('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Qe=p('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ze=p('<li class="page-toc-text"><a> </a></li>'),Je=p('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ke=p('<li class="page-toc-text"><a> </a></li>'),Xe=p('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function ct(P,t){me(t,!0);let l=se(!1);const S=ue([{id:"creating-your-metamodel-1",title:"Creating your Metamodel",visible:!1,ref:"#creating-your-metamodel-1"},{id:"defining-the-model-and-model-units-2",title:"Defining the model and model units",visible:!1,ref:"#defining-the-model-and-model-units-2"},{id:"the-sitegroup-model-unit-3",title:"The SiteGroup model unit",visible:!1,ref:"#the-sitegroup-model-unit-3"},{id:"the-topic-model-unit-4",title:"The Topic model unit",visible:!1,ref:"#the-topic-model-unit-4"},{id:"the-flow-model-unit-5",title:"The Flow model unit",visible:!1,ref:"#the-flow-model-unit-5"}]);let b=se(0);function B(r,d){const f=S.find(u=>u.id===r);f&&(f.visible=d);const g=S.findIndex(u=>u.visible);g>=0&&he(b,g,!0)}const k=Y(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),F=Y(()=>t.data.page.description??t.data.category.description),E="https://freon4dsl.dev/images/freon-banner.png";let M=Y(()=>{const r=Fe.url.pathname;return`https://freon4dsl.dev${r==="/"?"/":r.replace(/\/$/,"")}`});const q=t.data.site?.tags??[],D=t.data.category?.tags??[],O=t.data.page.tags??[],_=[...new Set([...q,...D,...O].filter(Boolean))],z={"@context":"https://schema.org","@type":"WebPage",headline:n(k),description:n(F),url:n(M),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:_.length?_.join(", "):void 0,image:E,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var e=Xe();Ee(r=>{var d=We(),f=V(d),g=o(f,4),u=o(g,2);{var C=h=>{var x=He();I(()=>c(x,"content",t.data.page.publishedTime)),s(h,x)};N(u,h=>{t.data.page.publishedTime&&h(C)})}var T=o(u,2);{var L=h=>{var x=Ve();I(()=>c(x,"content",t.data.page.modifiedTime)),s(h,x)};N(T,h=>{t.data.page.modifiedTime&&h(L)})}var A=o(T,2);{var W=h=>{var x=xe(),_e=V(x);R(_e,17,()=>_,Ce,(Te,Le)=>{var re=ze();I(()=>c(re,"content",n(Le))),s(Te,re)}),s(h,x)};N(A,h=>{_&&h(W)})}var U=o(A,2),X=o(U,4),$=o(X,2),ee=o($,2),te=o(ee,2);c(te,"content",E);var oe=o(te,2),ae=o(oe,4),ne=o(ae,2),ie=o(ne,2);c(ie,"content",E);var be=o(ie,2);Pe(be,()=>`<script type="application/ld+json">${JSON.stringify(z)}<\/script>`),I(h=>{Se.title=n(k)??"",c(f,"content",n(F)),c(g,"href",n(M)),c(U,"content",h),c(X,"content",n(k)),c($,"content",n(F)),c(ee,"content",t.data.site.title),c(oe,"content",n(M)),c(ae,"content",n(k)),c(ne,"content",n(F))},[()=>_.join(", ")]),s(r,d)});var i=V(e),a=y(i),m=o(y(a),2);m.__click=[Ye,l];var G=y(m);{var fe=r=>{var d=Re();s(r,d)},ve=r=>{var d=Qe();s(r,d)};N(G,r=>{n(l)?r(fe):r(ve,!1)})}w(m),w(a);var Q=o(a,2);{var we=r=>{var d=Je(),f=y(d);R(f,22,()=>S,g=>g,(g,u,C)=>{var T=Ze(),L=y(T);let A;var W=y(L,!0);w(L),w(T),I(U=>{c(L,"href",u.ref),A=de(L,1,"",null,A,U),le(W,u.title)},[()=>({"page-visible":n(C)===n(b),"page-nonvisible":n(C)!==n(b)})]),s(g,T)}),w(f),w(d),s(r,d)};N(Q,r=>{n(l)&&r(we)})}var Z=o(Q,2);Ge(Z,{});var ye=o(Z,2);Ue(ye,{setVisible:B}),w(i);var J=o(i,2),K=o(y(J),2);R(K,22,()=>S,r=>r,(r,d,f)=>{var g=Ke(),u=y(g);let C;var T=y(u,!0);w(u),w(g),I(L=>{c(u,"href",d.ref),C=de(u,1,"",null,C,L),le(T,d.title)},[()=>({"page-visible":n(f)===n(b),"page-nonvisible":n(f)!==n(b)})]),s(r,g)}),w(K),w(J),s(P,e),ge()}ke(["click"]);export{ct as component,dt as universal};
//# sourceMappingURL=92.ldCE_Ey8.js.map
