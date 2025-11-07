import{f as u,a as i,t as se,e as Se}from"../chunks/nks1QWJh.js";import{y as de,G as pe,x as z,z as me,u as a,A as k,g as o,I as re,B as G,a as F,$ as xe,v,s as ge,w as h}from"../chunks/bZIXIZs8.js";import{d as Pe,i as E,s as ie}from"../chunks/DANOUgWt.js";import{e as Y,p as qe,i as je,s as ce}from"../chunks/CKHUE_gp.js";import{h as Ce}from"../chunks/DCXhKCCG.js";import{h as Ie}from"../chunks/aX-frc9G.js";import{s as r}from"../chunks/BpSVRMQn.js";import{o as Ne}from"../chunks/D62n5Z03.js";import{P as le,S as O,c as ke,B as Fe}from"../chunks/CFDUsp8k.js";import{F as Le}from"../chunks/Bq9rkPJ0.js";const Ee=async({parent:C})=>{const{site:e,category:d}=await C();return{site:e,category:d,page:{title:"More Scoping",description:"Extend Freon’s scoping system by introducing namespace additions. Learn how to define the Test model unit and restrict visible question names within each Step to those belonging to the referenced Page.",tags:["Freon","scoping","namespaces","namespace addition","Step","Page","Test","Scenario","Answer","Flow","questions","DSL","Education language","tutorial"],modifiedTime:"2025-11-07T17:20:18.626Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},rt=Object.freeze(Object.defineProperty({__proto__:null,load:Ee},Symbol.toStringTag,{value:"Module"}));var Me=u("The <em>Test</em> model unit metamodel",1),Ae=u("The <em>Test</em> model unit projections",1),Be=u(`<!> <!> <p>In this lesson, you’ll learn more about scoping. But first, we’ll add the metamodel
and the projections for the fourth model unit — the <strong>Tests</strong>.</p> <!> <p>In the requirements of our DSL in the <a href="/Tutorial/Overview">introduction</a>, we stated that<br/> “… our client company wants a means to test the page flow before the actual webpages are produced.”<br/> The <strong>Test</strong> model unit is the starting point for fulfilling that requirement.</p> <p>In a Test, a teacher can add multiple scenarios, each describing a series of page flows.<br/> For instance, the teacher might want to test that from the start page <code>Theory101</code>, a pupil who answers all questions correctly is directed to <code>InDepth101</code>,<br/> and after succeeding there, proceeds to <code>Theory102</code>.</p> <p>Within a test, we need to specify both the answers given to questions on the current page and the expected follow-up page.<br/> Add the following to the file <code>edu-tests.ast</code>:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson7-defs/edu-tests.ast

language Education

modelunit Test &#123;
    name: identifier;
    scenarios: Scenario[];
    reference main: SiteGroup;
    reference flow: Flow;
&#125;

concept Scenario &#123;
    description: string;
    testFlow: TestFlow[];
&#125;

concept TestFlow &#123;
    steps: Step[]; /* Note that the order is of importance */
&#125;

concept Step &#123;
    reference fromPage: Page;
    answerSeries: Answer[];
&#125;

concept LastStep base Step &#123;
&#125;

concept Answer &#123;
    reference question: Question;
    value: NumberConcept;
&#125;</code></pre> <!> <p>We’ll also define projections for these concepts. By now, none of this should look unfamiliar:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson7-defs/edu-tests.edit

editor default

Test &#123;[
    Test $&#123;self.name&#125;
    Regarding MainTopic: $&#123;self.main&#125;, and flow: $&#123;self.flow&#125;

    $&#123;self.scenarios&#125;
]&#125;

Scenario &#123;[
    ------------------------------------
    $&#123;self.description&#125;

        $&#123;self.testFlow vertical&#125;
]&#125;

TestFlow &#123;[
    $&#123;self.steps horizontal separator[===&gt;]&#125;
]&#125;

Step &#123;[
    $&#123;self.fromPage&#125; =&gt; $&#123;self.answerSeries table rows&#125;
]&#125;

LastStep &#123;[
    $&#123;self.fromPage&#125;
]&#125;

Answer &#123; table [
    $&#123;self.question&#125; | $&#123;self.value&#125;
]&#125;</code></pre> <!> <p>Now comes the interesting part.<br/> If you try to build a test flow, you’ll notice that when adding answers, the user can still access question names from other pages.<br/> Generate the editor, open the model <code>lesson6</code>, and in the side panel select <code>TestB</code> to see something like this:</p> <!> <p>Here, the questions <code>pie</code> and <code>pie2</code> belong to the page <code>Theory101</code>, but <code>difficult1</code> and <code>further</code> do not.<br/> How can we prevent such mistakes?</p> <p>The answer lies in <strong>another scope rule</strong>.<br/> We need to draw a boundary around each <code>Step</code> instance — a namespace that only includes the relevant names.<br/> So, we’ll make <code>Step</code> a namespace. However, this namespace itself has no direct names; the question names we want belong to the <code>fromPage</code> property.<br/> To tell Freon to include those, we use a <strong>namespace addition</strong>.</p> <p>A namespace addition imports names into a namespace, as long as those names can be directly reached from the namespace object.<br/> In our case, <code>Step</code> can use names from its <code>fromPage</code>, but not from other scenarios.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson7-defs/edu.scope

scoper for language Education

isNamespace &#123; Page, Step &#125;

Step &#123;
    imports &#123;
        self.fromPage;
    &#125; 
&#125;</code></pre> <p>Now regenerate and take another look.<br/> You’ll see that the available question names in each answer series are <strong>only</strong> those from the corresponding <code>fromPage</code>.</p> <p>Yes — scoping really can be this easy!</p> <p>In the next lesson, we’ll take things a step further by introducing Freon’s <strong>typing system</strong> to help users build even more reliable models.</p> <!>`,1);function He(C,e){de(e,!0);const d=pe({});Ne(()=>{document.querySelectorAll("pre").forEach(c=>{const l=document.createElement("div");l.className="copy-prompt";const P=document.createElement("p");P.innerHTML="👆 Click to copy",P.className="copy-prompt-p";const q=document.createElement("img");q.src="/icons/copy-icon.svg",q.className="copy-prompt-img",l.appendChild(q),l.appendChild(P),c.appendChild(l),c.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{c.querySelector("code")?.textContent!==null&&c.querySelector("code")?.textContent!==void 0&&ke(c.querySelector("code").textContent),c.querySelector(".copy-prompt > p")?.innerHTML!==null&&c.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(c.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{c.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let T="/Tutorial/In_Need_of_Scoping",_="/Tutorial/How_to_Handle_Typing";var M=Be(),S=z(M);le(S,{prevLink:T,nextLink:_});var x=a(S,2);O(x,{tag:"h1",id:"more-scoping-1",onIntersectChange:t=>e.setVisible("more-scoping-1",t),get intersecting(){return d["more-scoping-1"]},set intersecting(t){d["more-scoping-1"]=t},children:(t,c)=>{k();var l=se("More Scoping");i(t,l)},$$slots:{default:!0}});var I=a(x,4);O(I,{tag:"h2",id:"the-test-model-unit-metamodel-2",onIntersectChange:t=>e.setVisible("the-test-model-unit-metamodel-2",t),get intersecting(){return d["the-test-model-unit-metamodel-2"]},set intersecting(t){d["the-test-model-unit-metamodel-2"]=t},children:(t,c)=>{k();var l=Me();k(2),i(t,l)},$$slots:{default:!0}});var N=a(I,10);O(N,{tag:"h2",id:"the-test-model-unit-projections-3",onIntersectChange:t=>e.setVisible("the-test-model-unit-projections-3",t),get intersecting(){return d["the-test-model-unit-projections-3"]},set intersecting(t){d["the-test-model-unit-projections-3"]=t},children:(t,c)=>{k();var l=Ae();k(2),i(t,l)},$$slots:{default:!0}});var A=a(N,6);O(A,{tag:"h2",id:"namespace-addition-4",onIntersectChange:t=>e.setVisible("namespace-addition-4",t),get intersecting(){return d["namespace-addition-4"]},set intersecting(t){d["namespace-addition-4"]=t},children:(t,c)=>{k();var l=se("Namespace Addition");i(t,l)},$$slots:{default:!0}});var B=a(A,4);Le(B,{imageName:"tutorial/Tutorial-lesson7-screenshot1.png",caption:"No scoping in the Test model unit",figureNumber:1});var V=a(B,16);le(V,{prevLink:T,nextLink:_}),i(C,M),me()}var Oe=u('<meta property="article:published_time"/>'),ze=u('<meta property="article:modified_time"/>'),Ve=u('<meta property="article:tag"/>'),We=u('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),De=(C,e)=>{ge(e,!o(e))},Ge=u('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Ye=u('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ze=u('<li class="page-toc-text"><a> </a></li>'),Je=u('<div class="toc-details"><ul class="page-ul"></ul></div>'),Qe=u('<li class="page-toc-text"><a> </a></li>'),Re=u('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function it(C,e){de(e,!0);let d=re(!1);const T=pe([{id:"more-scoping-1",title:"More Scoping",visible:!1,ref:"#more-scoping-1"},{id:"the-test-model-unit-metamodel-2",title:"The Test model unit metamodel",visible:!1,ref:"#the-test-model-unit-metamodel-2"},{id:"the-test-model-unit-projections-3",title:"The Test model unit projections",visible:!1,ref:"#the-test-model-unit-projections-3"},{id:"namespace-addition-4",title:"Namespace Addition",visible:!1,ref:"#namespace-addition-4"}]);let _=re(0);function M(n,s){const f=T.find(p=>p.id===n);f&&(f.visible=s);const m=T.findIndex(p=>p.visible);m>=0&&ge(_,m,!0)}const S=G(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),x=G(()=>e.data.page.description??e.data.category.description),I="https://freon4dsl.dev/images/freon-banner.png";let N=G(()=>{const n=qe.url.pathname;return`https://freon4dsl.dev${n==="/"?"/":n.replace(/\/$/,"")}`});const A=e.data.site?.tags??[],B=e.data.category?.tags??[],V=e.data.page.tags??[],t=[...new Set([...A,...B,...V].filter(Boolean))],c={"@context":"https://schema.org","@type":"WebPage",headline:o(S),description:o(x),url:o(N),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:t.length?t.join(", "):void 0,image:I,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var l=Re();Ie(n=>{var s=We(),f=z(s),m=a(f,4),p=a(m,2);{var j=g=>{var w=Oe();F(()=>r(w,"content",e.data.page.publishedTime)),i(g,w)};E(p,g=>{e.data.page.publishedTime&&g(j)})}var y=a(p,2);{var b=g=>{var w=ze();F(()=>r(w,"content",e.data.page.modifiedTime)),i(g,w)};E(y,g=>{e.data.page.modifiedTime&&g(b)})}var L=a(y,2);{var D=g=>{var w=Se(),be=z(w);Y(be,17,()=>t,je,(we,Te)=>{var ne=Ve();F(()=>r(ne,"content",o(Te))),i(we,ne)}),i(g,w)};E(L,g=>{t&&g(D)})}var H=a(L,2),K=a(H,4),U=a(K,2),X=a(U,2),$=a(X,2);r($,"content",I);var ee=a($,2),te=a(ee,4),ae=a(te,2),oe=a(ae,2);r(oe,"content",I);var ye=a(oe,2);Ce(ye,()=>`<script type="application/ld+json">${JSON.stringify(c)}<\/script>`),F(g=>{xe.title=o(S)??"",r(f,"content",o(x)),r(m,"href",o(N)),r(H,"content",g),r(K,"content",o(S)),r(U,"content",o(x)),r(X,"content",e.data.site.title),r(ee,"content",o(N)),r(te,"content",o(S)),r(ae,"content",o(x))},[()=>t.join(", ")]),i(n,s)});var P=z(l),q=v(P),W=a(v(q),2);W.__click=[De,d];var ue=v(W);{var fe=n=>{var s=Ge();i(n,s)},he=n=>{var s=Ye();i(n,s)};E(ue,n=>{o(d)?n(fe):n(he,!1)})}h(W),h(q);var Z=a(q,2);{var ve=n=>{var s=Je(),f=v(s);Y(f,22,()=>T,m=>m,(m,p,j)=>{var y=Ze(),b=v(y);let L;var D=v(b,!0);h(b),h(y),F(H=>{r(b,"href",p.ref),L=ce(b,1,"",null,L,H),ie(D,p.title)},[()=>({"page-visible":o(j)===o(_),"page-nonvisible":o(j)!==o(_)})]),i(m,y)}),h(f),h(s),i(n,s)};E(Z,n=>{o(d)&&n(ve)})}var J=a(Z,2);Fe(J,{});var _e=a(J,2);He(_e,{setVisible:M}),h(P);var Q=a(P,2),R=a(v(Q),2);Y(R,22,()=>T,n=>n,(n,s,f)=>{var m=Qe(),p=v(m);let j;var y=v(p,!0);h(p),h(m),F(b=>{r(p,"href",s.ref),j=ce(p,1,"",null,j,b),ie(y,s.title)},[()=>({"page-visible":o(f)===o(_),"page-nonvisible":o(f)!==o(_)})]),i(n,m)}),h(R),h(Q),i(C,l),me()}Pe(["click"]);export{it as component,rt as universal};
//# sourceMappingURL=98.CEgI5a0c.js.map
