import{f,a as i,t as j,e as Ee}from"../chunks/nks1QWJh.js";import{y as le,G as pe,x as R,z as ge,u as o,A as D,g as s,I as ae,B as V,a as O,$ as Te,v as x,s as me,w as h}from"../chunks/bZIXIZs8.js";import{d as Se,i as B,s as ie}from"../chunks/DANOUgWt.js";import{e as W,p as qe,i as Ce,s as ce}from"../chunks/CKHUE_gp.js";import{h as Le}from"../chunks/DCXhKCCG.js";import{h as Ae}from"../chunks/aX-frc9G.js";import{s as a}from"../chunks/BpSVRMQn.js";import{o as Ne}from"../chunks/D62n5Z03.js";import{P as de,S as M,c as Oe,B as Pe}from"../chunks/CFDUsp8k.js";import{F as Be}from"../chunks/Bq9rkPJ0.js";const Ie=async({parent:L})=>{const{site:e,category:l}=await L();return{site:e,category:l,page:{title:"Expressions in Freon",description:"Add grading logic to your DSL by introducing expressions in Freon. Define ScoreExpression variants (question references, number literals, counts), build binary and comparison expressions with priorities, and update the editor to show grading.",tags:["Freon","expressions","DSL","grading","ScoreExpression","QuestionReference","NrOfCorrectAnswers","NumberLiteralExpression","binary expressions","AND","OR","comparisons","Equals","GreaterThan","LessThan","editor projections","Page","GradeScore","tutorial"],modifiedTime:"2025-11-07T17:20:18.626Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},rt=Object.freeze(Object.defineProperty({__proto__:null,load:Ie},Symbol.toStringTag,{value:"Module"}));var ke=f(`<!> <!> <p>Many DSLs include expressions like <code>24 + 56</code>. Even though they may look simple, anyone who has tried to build a language knows expressions can be tricky. In Freon, they therefore have a special place.</p> <p>In this lesson we introduce expressions by adding grading rules to each <code>Topic</code>. To do this, we need to update the metamodel.
Open the file <code>edu-topics.ast</code> and add one line to the <code>Page</code> concept.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson4-defs/edu-topics.ast#L10-L14

abstract concept Page &#123;
    name: identifier;
    questions: Question[];
    grading: GradeScore[]; /* concept from 'edu-scoring.ast' */
&#125;</code></pre> <p>We’ll define the <code>GradeScore</code> concept in a new file called <code>edu-scoring.ast</code>.
Add the following lines:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson4-defs/edu-scoring.ast#L1-L6

language Education

concept GradeScore &#123;
    grade: Grade;
    expr: ScoreExpression;
&#125;</code></pre> <p>Yes, the <code>expr</code> property uses <code>ScoreExpression</code>, which represents our expressions. To design it well, let’s first understand what users want to express.</p> <!> <p>Grading depends on answers to the questions on a page. For instance, if all answers are correct, the score should be the top grade; if all are incorrect, the lowest grade applies. Talking to our hypothetical client (<img src="/icons/smile.png" alt="Smiley" width="20" height="20"/>), we learn that teachers want to assign a grade when specific questions are correct, even if others matter less. They might write:</p> <pre class="language-txt"><code class="language-txt">GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers &gt; 2</code></pre> <p>So, what do we need?</p> <ol><li>A number literal for the <strong>3</strong> and <strong>2</strong>.</li> <li>Something that represents <strong>Number of Correct Answers</strong>.</li> <li>A reference to a question on the page (for <strong>questionX</strong>, <strong>questionY</strong>, etc.).</li> <li>Binary boolean expressions (<strong>AND</strong>, <strong>OR</strong>).</li> <li>An equals comparison for <code>=</code>.</li> <li>A greater-than comparison for <code>&gt;</code> (and we’ll add the others for completeness).</li></ol> <p>Here’s how we define the first three items:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson4-defs/edu-scoring.ast#L8-L28

///////////////////////////////////
/// Expressions
//////////////////////////////////
abstract expression ScoreExpression &#123;
&#125;

/* The value of a question reference is the answer given to the
given question */
expression QuestionReference base ScoreExpression &#123;
    reference question: Question;
&#125;

/* The value of NrOfCorrectAnswers is the total number of correct
answers on a page. */
expression NrOfCorrectAnswers base ScoreExpression &#123;
&#125;

/* The value of a NumberLiteralExpression is simply a number, like '24' */
expression NumberLiteralExpression base ScoreExpression &#123;
    value: number;
&#125;</code></pre> <p>Instead of <code>concept</code>, we use <code>expression</code> to tell Freon that instances of these types are expressions.<br/> <code>ScoreExpression</code> is the common base so we can use it wherever an expression is needed. Otherwise, the definitions look similar to ordinary concepts.</p> <!> <p>Freon provides extra support for binary expressions. We only need to declare that a concept is a binary expression. Below we define boolean <strong>AND</strong> and <strong>OR</strong>:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson4-defs/edu-scoring.ast#L30-L44

///////////////////////////////////
/// Boolean AND and OR
//////////////////////////////////
abstract binary expression BinaryExpression base ScoreExpression &#123;
    left: ScoreExpression;
    right: ScoreExpression;
&#125;

binary expression AndExpression base BinaryExpression &#123;
    priority = 1;
&#125;

binary expression OrExpression base BinaryExpression &#123;
    priority = 1;
&#125;</code></pre> <p>Because all expressions share <code>ScoreExpression</code> as a base, any <code>ScoreExpression</code> can appear on the left or right side of a <code>BinaryExpression</code>.</p> <p><code>AndExpression</code> and <code>OrExpression</code> don’t need extra properties (that’s typical), but we do set a <code>priority</code>. Expression trees need priorities to parse and render correctly.<br/> In math, multiplication has higher priority than addition, so <code>8 * 7 + 1</code> is <code>(8 * 7) + 1</code>, not <code>8 * (7 + 1)</code>.<br/> In Freon, a higher number means higher priority.</p> <!> <p>To satisfy <code>=</code> and <code>&gt;</code>, we’ll also add <code>&lt;</code>, <code>&gt;=</code>, and <code>&lt;=</code> for completeness:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson4-defs/edu-scoring.ast#L46-L70

///////////////////////////////////
/// Comparisons: &lt;=, &gt;=, &gt;, &lt;, ===
//////////////////////////////////
abstract binary expression ComparisonExpression base BinaryExpression &#123;
&#125;

binary expression LessOrEqualsExpression base ComparisonExpression &#123;
    priority = 2;
&#125;

binary expression GreaterOrEqualsExpression base ComparisonExpression &#123;
    priority = 2;
&#125;

binary expression LessThenExpression base ComparisonExpression &#123;
    priority = 2;
&#125;

binary expression GreaterThenExpression base ComparisonExpression &#123;
    priority = 2;
&#125;

binary expression EqualsExpression base ComparisonExpression &#123;
    priority = 2;
&#125;</code></pre> <p>Now generate the editor again and open the <code>lesson4</code> model. We switch models because the metamodel gained new concepts, and the new model contains instances of them.</p> <p><code>%@$#&*!!!</code>—after all that, nothing changed!<br/> Right: the <code>Page</code> projection (or its children) doesn’t mention the new <code>grading</code> property, so it isn’t shown. Let’s fix that by updating the <code>Page</code> projection in <code>page-footing.edit</code>:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson4-defs/page-footing.edit#L5-L11

Page &#123;[
    Questions:
        $&#123;self.questions vertical&#125;

    Score
        $&#123;self.grading vertical&#125;
]&#125;</code></pre> <p>Generate again and you’ll see (part of) the grading information. It’s not pretty yet, but the expressions are there.<br/> In the next lesson, you’ll learn how to <strong>project expressions</strong> nicely.</p> <!> <!>`,1);function Fe(L,e){le(e,!0);const l=pe({});Ne(()=>{document.querySelectorAll("pre").forEach(c=>{const d=document.createElement("div");d.className="copy-prompt";const S=document.createElement("p");S.innerHTML="👆 Click to copy",S.className="copy-prompt-p";const q=document.createElement("img");q.src="/icons/copy-icon.svg",q.className="copy-prompt-img",d.appendChild(q),d.appendChild(S),c.appendChild(d),c.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{c.querySelector("code")?.textContent!==null&&c.querySelector("code")?.textContent!==void 0&&Oe(c.querySelector("code").textContent),c.querySelector(".copy-prompt > p")?.innerHTML!==null&&c.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(c.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{c.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let w="/Tutorial/More_Fun_with_Projections",v="/Tutorial/Projections_for_Expressions";var I=ke(),E=R(I);de(E,{prevLink:w,nextLink:v});var T=o(E,2);M(T,{tag:"h1",id:"expressions-in-freon-1",onIntersectChange:t=>e.setVisible("expressions-in-freon-1",t),get intersecting(){return l["expressions-in-freon-1"]},set intersecting(t){l["expressions-in-freon-1"]=t},children:(t,c)=>{D();var d=j("Expressions in Freon");i(t,d)},$$slots:{default:!0}});var A=o(T,14);M(A,{tag:"h2",id:"the-requirements-2",onIntersectChange:t=>e.setVisible("the-requirements-2",t),get intersecting(){return l["the-requirements-2"]},set intersecting(t){l["the-requirements-2"]=t},children:(t,c)=>{D();var d=j("The Requirements");i(t,d)},$$slots:{default:!0}});var N=o(A,16);M(N,{tag:"h2",id:"binary-expressions-3",onIntersectChange:t=>e.setVisible("binary-expressions-3",t),get intersecting(){return l["binary-expressions-3"]},set intersecting(t){l["binary-expressions-3"]=t},children:(t,c)=>{D();var d=j("Binary Expressions");i(t,d)},$$slots:{default:!0}});var k=o(N,10);M(k,{tag:"h2",id:"the-comparison-expressions-4",onIntersectChange:t=>e.setVisible("the-comparison-expressions-4",t),get intersecting(){return l["the-comparison-expressions-4"]},set intersecting(t){l["the-comparison-expressions-4"]=t},children:(t,c)=>{D();var d=j("The Comparison Expressions");i(t,d)},$$slots:{default:!0}});var F=o(k,14);Be(F,{imageName:"tutorial/Tutorial-lesson4-screenshot1.png",caption:"Editor after adding grading to the metamodel",figureNumber:1});var H=o(F,2);de(H,{prevLink:w,nextLink:v}),i(L,I),ge()}var Ge=f('<meta property="article:published_time"/>'),je=f('<meta property="article:modified_time"/>'),De=f('<meta property="article:tag"/>'),Me=f('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Re=(L,e)=>{me(e,!s(e))},He=f('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),ze=f('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Qe=f('<li class="page-toc-text"><a> </a></li>'),Ve=f('<div class="toc-details"><ul class="page-ul"></ul></div>'),We=f('<li class="page-toc-text"><a> </a></li>'),Ye=f('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function nt(L,e){le(e,!0);let l=ae(!1);const w=pe([{id:"expressions-in-freon-1",title:"Expressions in Freon",visible:!1,ref:"#expressions-in-freon-1"},{id:"the-requirements-2",title:"The Requirements",visible:!1,ref:"#the-requirements-2"},{id:"binary-expressions-3",title:"Binary Expressions",visible:!1,ref:"#binary-expressions-3"},{id:"the-comparison-expressions-4",title:"The Comparison Expressions",visible:!1,ref:"#the-comparison-expressions-4"}]);let v=ae(0);function I(r,n){const u=w.find(p=>p.id===r);u&&(u.visible=n);const g=w.findIndex(p=>p.visible);g>=0&&me(v,g,!0)}const E=V(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),T=V(()=>e.data.page.description??e.data.category.description),A="https://freon4dsl.dev/images/freon-banner.png";let N=V(()=>{const r=qe.url.pathname;return`https://freon4dsl.dev${r==="/"?"/":r.replace(/\/$/,"")}`});const k=e.data.site?.tags??[],F=e.data.category?.tags??[],H=e.data.page.tags??[],t=[...new Set([...k,...F,...H].filter(Boolean))],c={"@context":"https://schema.org","@type":"WebPage",headline:s(E),description:s(T),url:s(N),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:t.length?t.join(", "):void 0,image:A,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var d=Ye();Ae(r=>{var n=Me(),u=R(n),g=o(u,4),p=o(g,2);{var C=m=>{var _=Ge();O(()=>a(_,"content",e.data.page.publishedTime)),i(m,_)};B(p,m=>{e.data.page.publishedTime&&m(C)})}var y=o(p,2);{var b=m=>{var _=je();O(()=>a(_,"content",e.data.page.modifiedTime)),i(m,_)};B(y,m=>{e.data.page.modifiedTime&&m(b)})}var P=o(y,2);{var Q=m=>{var _=Ee(),be=R(_);W(be,17,()=>t,Ce,(_e,we)=>{var ne=De();O(()=>a(ne,"content",s(we))),i(_e,ne)}),i(m,_)};B(P,m=>{t&&m(Q)})}var G=o(P,2),K=o(G,4),U=o(K,2),$=o(U,2),ee=o($,2);a(ee,"content",A);var te=o(ee,2),oe=o(te,4),se=o(oe,2),re=o(se,2);a(re,"content",A);var ye=o(re,2);Le(ye,()=>`<script type="application/ld+json">${JSON.stringify(c)}<\/script>`),O(m=>{Te.title=s(E)??"",a(u,"content",s(T)),a(g,"href",s(N)),a(G,"content",m),a(K,"content",s(E)),a(U,"content",s(T)),a($,"content",e.data.site.title),a(te,"content",s(N)),a(oe,"content",s(E)),a(se,"content",s(T))},[()=>t.join(", ")]),i(r,n)});var S=R(d),q=x(S),z=o(x(q),2);z.__click=[Re,l];var ue=x(z);{var he=r=>{var n=He();i(r,n)},fe=r=>{var n=ze();i(r,n)};B(ue,r=>{s(l)?r(he):r(fe,!1)})}h(z),h(q);var Y=o(q,2);{var xe=r=>{var n=Ve(),u=x(n);W(u,22,()=>w,g=>g,(g,p,C)=>{var y=Qe(),b=x(y);let P;var Q=x(b,!0);h(b),h(y),O(G=>{a(b,"href",p.ref),P=ce(b,1,"",null,P,G),ie(Q,p.title)},[()=>({"page-visible":s(C)===s(v),"page-nonvisible":s(C)!==s(v)})]),i(g,y)}),h(u),h(n),i(r,n)};B(Y,r=>{s(l)&&r(xe)})}var Z=o(Y,2);Pe(Z,{});var ve=o(Z,2);Fe(ve,{setVisible:I}),h(S);var X=o(S,2),J=o(x(X),2);W(J,22,()=>w,r=>r,(r,n,u)=>{var g=We(),p=x(g);let C;var y=x(p,!0);h(p),h(g),O(b=>{a(p,"href",n.ref),C=ce(p,1,"",null,C,b),ie(y,n.title)},[()=>({"page-visible":s(u)===s(v),"page-nonvisible":s(u)!==s(v)})]),i(r,g)}),h(J),h(X),i(L,d),ge()}Se(["click"]);export{nt as component,rt as universal};
//# sourceMappingURL=93.DOR50rKG.js.map
