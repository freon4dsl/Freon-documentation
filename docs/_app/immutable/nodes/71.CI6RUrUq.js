import{f as u,a as i,t as Q,e as Ee}from"../chunks/nks1QWJh.js";import{y as ue,G as pe,x as W,z as ge,u as a,A as v,g as n,I as ie,B as z,a as q,$ as Ie,v as x,s as me,w}from"../chunks/bZIXIZs8.js";import{d as Te,i as B,s as ce}from"../chunks/DANOUgWt.js";import{e as H,p as Re,i as Se,s as le}from"../chunks/CKHUE_gp.js";import{h as Pe}from"../chunks/DCXhKCCG.js";import{h as Ce}from"../chunks/aX-frc9G.js";import{s as d}from"../chunks/BpSVRMQn.js";import{o as Ae}from"../chunks/D62n5Z03.js";import{P as de,S as M,c as Le,B as qe}from"../chunks/CFDUsp8k.js";import{N as Me}from"../chunks/B1swYv4A.js";const Oe=async({parent:C})=>{const{site:t,category:c}=await C();return{site:t,category:c,page:{title:"More Basic Evaluation Functions",description:"Extend the EducationInterpreter with evaluation functions for tests, pages, answers, and score expressions. Learn how to compute runtime values and handle abstract concepts in Freon interpreters.",tags:["Freon","interpreter","evaluation","EducationInterpreter","Answer","LastStep","Page","ScoreExpression","QuestionReference","NrOfCorrectAnswers","RtGrade","runtime","M1","M0","M2","DSL","tutorial","example"],modifiedTime:"2025-11-07T17:20:18.626Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},ct=Object.freeze(Object.defineProperty({__proto__:null,load:Oe},Symbol.toStringTag,{value:"Module"}));var je=u("Evaluations of <code>LastStep</code> and <code>Answer</code>",1),Be=u("Evaluation of <code>Page</code>",1),Ne=u("Evaluation of <code>ScoreExpression</code>s",1),Ge=u("In Domain-Specific Languages, we distinguish between three levels: <ol><li><p><strong>M2 – Language Definition</strong>: Defines which concepts exist. In Freon, this is represented by the <code>.ast</code> files.<br/> In Java, this would correspond to the Java language definition.</p></li> <li><p><strong>M1 – Model</strong>: Contains instances of those concepts. In Freon, this is what you edit in the Freon editor.<br/> In Java, this would be the program itself (Java classes, methods, etc.).</p></li> <li><p><strong>M0 – Runtime</strong>: The results produced by running or interpreting an M1 model.<br/> In Freon, this is what your interpreter computes. In Java, this would be the execution of a program.</p></li></ol>",1),Fe=u(`<!> <!> <p>With the simplest evaluation functions done, we can now focus on the <strong>test evaluation logic</strong> itself.</p> <!> <p>Let’s refresh your memory and look at the AST of the <code>Test</code> model unit.</p> <pre class="language-freon"><code class="language-freon">// Education/lesson9-defs/edu-tests.ast

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
    steps: Step[]; /* Note that the order is of importance */
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
&#125;</code></pre> <!> <p>The simplest concept is <code>LastStep</code>. Its runtime value should always be <strong>true</strong>, because it has no follow-up page and no restrictions.<br/> The evaluation function looks like this:</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L212-L214

override evalLastStep(node: LastStep, ctx: InterpreterContext): RtObject &#123;
    return RtBoolean.TRUE
&#125;</code></pre> <p>Next, let’s determine the runtime value of an <code>Answer</code>.<br/> We need to compare the <strong>given answer</strong> with the <strong>expected correct answer</strong> from the question.<br/> The given answer is evaluated from <code>value</code>, while the expected answer comes from the referenced <code>question</code>.</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L202-L210

override evalAnswer(node: Answer, ctx: InterpreterContext): RtObject &#123;
    console.log(\`evalAnswer.node $&#123;node?.$question.content&#125;\`)
    const actualAnswer = main.evaluate(node.value, ctx)
    if (node.question.referred !== undefined &amp;&amp; node.question.referred !== null) &#123;
        const expectedAnswer = main.evaluate(node.question.referred.correctAnswer, ctx)
        return actualAnswer.equals(expectedAnswer)
    &#125;
    return new RtError("evalAnswer: question not found")
&#125;</code></pre> <!> <p>Before we can evaluate a <code>Step</code>, we need to know how to evaluate its <code>fromPage</code> property.<br/> The concept <code>Page</code> is abstract:</p> <pre class="language-freon"><code class="language-freon">// Education/lesson9-defs/edu-topics.ast#L10-L14

abstract concept Page &#123;
    name: identifier;
    questions: Question[];
    grading: GradeScore[]; /* concept from 'edu-scoring.ast' */
&#125;</code></pre> <p>We therefore define evaluation functions for each concrete subtype of <code>Page</code>:<br/> <code>Theory</code>, <code>Video</code>, <code>WorkSheet</code>, <code>ExamplePage</code>, and <code>InDepthMaterial</code>.</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L153-L182

static evalPage(node: Page, ctx: InterpreterContext): RtObject &#123;
    // Find grade for given answers
    console.log(\`Evaluating Page $&#123;node?.name&#125;\`)
    for (const score of node.grading) &#123;
        const scoreValue = main.evaluate(score.expr, ctx)
        if (isRtBoolean(scoreValue)) &#123;
            if (scoreValue.asBoolean()) &#123;
                console.log(\`Evaluating Page returning $&#123;score.$grade?.name&#125;\`)
                return new RtGrade(score.$grade)
            &#125;
        &#125;
    &#125;
    return new RtError(\`No grade found for current answers in page $&#123;node.name&#125;\`)
&#125;

override evalTheory(node: Theory, ctx: InterpreterContext): RtObject &#123;
    return EducationInterpreter.evalPage(node, ctx)
&#125;
override evalVideo(node: Video, ctx: InterpreterContext): RtObject &#123;
    return EducationInterpreter.evalPage(node, ctx)
&#125;
override evalWorkSheet(node: WorkSheet, ctx: InterpreterContext): RtObject &#123;
    return EducationInterpreter.evalPage(node, ctx)
&#125;
override evalInDepthMaterial(node: InDepthMaterial, ctx: InterpreterContext): RtObject &#123;
    return EducationInterpreter.evalPage(node, ctx)
&#125;
override evalExamplePage(node: ExamplePage, ctx: InterpreterContext): RtObject &#123;
    return EducationInterpreter.evalPage(node, ctx)
&#125;</code></pre> <!> <p>In the <code>evalPage</code> function, we call <code>main.evaluate(score.expr, ctx)</code>.<br/> That means we still need evaluation functions for the remaining expression concepts — namely <code>QuestionReference</code> and <code>NrOfCorrectAnswers</code>.</p> <h3 id="nrofcorrectanswers-1"><code>NrOfCorrectAnswers</code></h3> <p>The total number of correct answers for the current page is stored in the <strong>context</strong>.<br/> We retrieve it using <code>ctx.find</code>.</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L198-L200

override evalNrOfCorrectAnswers(node: NrOfCorrectAnswers, ctx: InterpreterContext): RtObject &#123;
    return ctx.find("NR_OF_CORRECT_ANSWERS")
&#125;</code></pre> <h3 id="questionreference-2"><code>QuestionReference</code></h3> <p>This one evaluates a comparison between the <strong>expected answer</strong> (from the model) and the <strong>given answer</strong> (from the test context).</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L184-L196

override evalQuestionReference(node: QuestionReference, ctx: InterpreterContext): RtObject &#123;
    const question = node?.question?.referred
    if (question === undefined || question === null) &#123;
        throw new RtError("evalQuestionReference: Question is not found")
    &#125;
    const expected = main.evaluate(question.correctAnswer, ctx)
    const givenAnswer = ctx.find(question)
    if (givenAnswer === undefined || givenAnswer === null) &#123;
        throw new RtError(\`evalQuestionReference: Question '$&#123;question.content&#125;' does not have a result value\`)
    &#125;
    console.log(\`evalQuestionReference for '$&#123;question.content&#125;', given answer is '$&#123;givenAnswer&#125;', expected '$&#123;expected&#125;'\`)
    return givenAnswer.equals(expected)
&#125;</code></pre> <!> <p>The <code>evalPage</code> function loops through all grades and evaluates each grading expression until it finds one that returns <code>true</code>.<br/> The first such grade determines the result for that page.</p> <p>To represent this at runtime, we introduce a new class, <code>RtGrade</code>, since we want to distinguish <strong>runtime objects (M0)</strong><br/> from <strong>model objects (M1)</strong> and <strong>language definitions (M2)</strong>.</p> <!> <h3 id="the-rtgrade-class-3">The <code>RtGrade</code> class</h3> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/runtime/RtGrade.ts

import &#123; RtBoolean, RtObject &#125; from "@freon4dsl/core";
import &#123; Grade &#125; from "../../language/gen/index.js";

export class RtGrade extends RtObject &#123;
    readonly _type: string = "RtGrade";
    grade: Grade;

    constructor(grade: Grade) &#123;
        super();
        this.grade = grade;
    &#125;

    equals(other: RtObject): RtBoolean &#123;
        if (isRtGrade(other)) &#123;
            return RtBoolean.of(this.grade === other.grade);
        &#125; else &#123;
            return RtBoolean.FALSE;
        &#125;
    &#125;

    override toString(): string &#123;
        return \`Grade: $&#123;this.grade.name&#125;\`;
    &#125;
&#125;

export function isRtGrade(object: any): object is RtGrade &#123;
    const _type = (object as any)?._type;
    return !!_type &amp;&amp; _type === "RtGrade";
&#125;</code></pre> <p>This runtime class allows us to represent a <strong>grade result</strong> separately from the model itself —<br/> a clean, modular way to connect interpretation results to the model.</p> <!>`,1);function ke(C,t){ue(t,!0);const c=pe({});Ae(()=>{document.querySelectorAll("pre").forEach(s=>{const o=document.createElement("div");o.className="copy-prompt";const f=document.createElement("p");f.innerHTML="👆 Click to copy",f.className="copy-prompt-p";const O=document.createElement("img");O.src="/icons/copy-icon.svg",O.className="copy-prompt-img",o.appendChild(O),o.appendChild(f),s.appendChild(o),s.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{s.querySelector("code")?.textContent!==null&&s.querySelector("code")?.textContent!==void 0&&Le(s.querySelector("code").textContent),s.querySelector(".copy-prompt > p")?.innerHTML!==null&&s.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(s.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{s.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let T="/Examples/Building_an_Interpreter",_="/Examples/Building_an_Interpreter/Using_the_Context";var N=Fe(),R=W(N);de(R,{prevLink:T,nextLink:_});var S=a(R,2);M(S,{tag:"h1",id:"more-basic-evaluation-functions-1",onIntersectChange:e=>t.setVisible("more-basic-evaluation-functions-1",e),get intersecting(){return c["more-basic-evaluation-functions-1"]},set intersecting(e){c["more-basic-evaluation-functions-1"]=e},children:(e,s)=>{v();var o=Q("More Basic Evaluation Functions");i(e,o)},$$slots:{default:!0}});var A=a(S,4);M(A,{tag:"h2",id:"the-ast-of-the-test-model-unit-2",onIntersectChange:e=>t.setVisible("the-ast-of-the-test-model-unit-2",e),get intersecting(){return c["the-ast-of-the-test-model-unit-2"]},set intersecting(e){c["the-ast-of-the-test-model-unit-2"]=e},children:(e,s)=>{v();var o=Q("The AST of the Test Model Unit");i(e,o)},$$slots:{default:!0}});var L=a(A,6);M(L,{tag:"h2",id:"evaluations-of-laststep-and-answer-3",onIntersectChange:e=>t.setVisible("evaluations-of-laststep-and-answer-3",e),get intersecting(){return c["evaluations-of-laststep-and-answer-3"]},set intersecting(e){c["evaluations-of-laststep-and-answer-3"]=e},children:(e,s)=>{v();var o=je();v(3),i(e,o)},$$slots:{default:!0}});var G=a(L,10);M(G,{tag:"h2",id:"evaluation-of-page-4",onIntersectChange:e=>t.setVisible("evaluation-of-page-4",e),get intersecting(){return c["evaluation-of-page-4"]},set intersecting(e){c["evaluation-of-page-4"]=e},children:(e,s)=>{v();var o=Be();v(),i(e,o)},$$slots:{default:!0}});var F=a(G,10);M(F,{tag:"h2",id:"evaluation-of-scoreexpressions-5",onIntersectChange:e=>t.setVisible("evaluation-of-scoreexpressions-5",e),get intersecting(){return c["evaluation-of-scoreexpressions-5"]},set intersecting(e){c["evaluation-of-scoreexpressions-5"]=e},children:(e,s)=>{v();var o=Ne();v(2),i(e,o)},$$slots:{default:!0}});var k=a(F,16);M(k,{tag:"h2",id:"more-about-evaluation-of-pages-6",onIntersectChange:e=>t.setVisible("more-about-evaluation-of-pages-6",e),get intersecting(){return c["more-about-evaluation-of-pages-6"]},set intersecting(e){c["more-about-evaluation-of-pages-6"]=e},children:(e,s)=>{v();var o=Q("More About Evaluation of Pages");i(e,o)},$$slots:{default:!0}});var b=a(k,6);Me(b,{header:o=>{v();var f=Q("Meta Levels");i(o,f)},content:o=>{v();var f=Ge();v(),i(o,f)},$$slots:{header:!0,content:!0}});var D=a(b,8);de(D,{prevLink:T,nextLink:_}),i(C,N),ge()}var Ve=u('<meta property="article:published_time"/>'),Qe=u('<meta property="article:modified_time"/>'),We=u('<meta property="article:tag"/>'),De=u('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Je=(C,t)=>{me(t,!n(t))},ze=u('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),He=u('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ue=u('<li class="page-toc-text"><a> </a></li>'),Ze=u('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ke=u('<li class="page-toc-text"><a> </a></li>'),Xe=u('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function lt(C,t){ue(t,!0);let c=ie(!1);const T=pe([{id:"more-basic-evaluation-functions-1",title:"More Basic Evaluation Functions",visible:!1,ref:"#more-basic-evaluation-functions-1"},{id:"the-ast-of-the-test-model-unit-2",title:"The AST of the Test Model Unit",visible:!1,ref:"#the-ast-of-the-test-model-unit-2"},{id:"evaluations-of-laststep-and-answer-3",title:"Evaluations of LastStep and Answer",visible:!1,ref:"#evaluations-of-laststep-and-answer-3"},{id:"evaluation-of-page-4",title:"Evaluation of Page",visible:!1,ref:"#evaluation-of-page-4"},{id:"evaluation-of-scoreexpressions-5",title:"Evaluation of ScoreExpressions",visible:!1,ref:"#evaluation-of-scoreexpressions-5"},{id:"more-about-evaluation-of-pages-6",title:"More About Evaluation of Pages",visible:!1,ref:"#more-about-evaluation-of-pages-6"}]);let _=ie(0);function N(r,l){const h=T.find(p=>p.id===r);h&&(h.visible=l);const g=T.findIndex(p=>p.visible);g>=0&&me(_,g,!0)}const R=z(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),S=z(()=>t.data.page.description??t.data.category.description),A="https://freon4dsl.dev/images/freon-banner.png";let L=z(()=>{const r=Re.url.pathname;return`https://freon4dsl.dev${r==="/"?"/":r.replace(/\/$/,"")}`});const G=t.data.site?.tags??[],F=t.data.category?.tags??[],k=t.data.page.tags??[],b=[...new Set([...G,...F,...k].filter(Boolean))],D={"@context":"https://schema.org","@type":"WebPage",headline:n(R),description:n(S),url:n(L),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:b.length?b.join(", "):void 0,image:A,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var e=Xe();Ce(r=>{var l=De(),h=W(l),g=a(h,4),p=a(g,2);{var P=m=>{var I=Ve();q(()=>d(I,"content",t.data.page.publishedTime)),i(m,I)};B(p,m=>{t.data.page.publishedTime&&m(P)})}var y=a(p,2);{var E=m=>{var I=Qe();q(()=>d(I,"content",t.data.page.modifiedTime)),i(m,I)};B(y,m=>{t.data.page.modifiedTime&&m(E)})}var j=a(y,2);{var J=m=>{var I=Ee(),_e=W(I);H(_e,17,()=>b,Se,(be,ye)=>{var se=We();q(()=>d(se,"content",n(ye))),i(be,se)}),i(m,I)};B(j,m=>{b&&m(J)})}var V=a(j,2),Y=a(V,4),$=a(Y,2),ee=a($,2),te=a(ee,2);d(te,"content",A);var ae=a(te,2),oe=a(ae,4),ne=a(oe,2),re=a(ne,2);d(re,"content",A);var xe=a(re,2);Pe(xe,()=>`<script type="application/ld+json">${JSON.stringify(D)}<\/script>`),q(m=>{Ie.title=n(R)??"",d(h,"content",n(S)),d(g,"href",n(L)),d(V,"content",m),d(Y,"content",n(R)),d($,"content",n(S)),d(ee,"content",t.data.site.title),d(ae,"content",n(L)),d(oe,"content",n(R)),d(ne,"content",n(S))},[()=>b.join(", ")]),i(r,l)});var s=W(e),o=x(s),f=a(x(o),2);f.__click=[Je,c];var O=x(f);{var ve=r=>{var l=ze();i(r,l)},fe=r=>{var l=He();i(r,l)};B(O,r=>{n(c)?r(ve):r(fe,!1)})}w(f),w(o);var U=a(o,2);{var he=r=>{var l=Ze(),h=x(l);H(h,22,()=>T,g=>g,(g,p,P)=>{var y=Ue(),E=x(y);let j;var J=x(E,!0);w(E),w(y),q(V=>{d(E,"href",p.ref),j=le(E,1,"",null,j,V),ce(J,p.title)},[()=>({"page-visible":n(P)===n(_),"page-nonvisible":n(P)!==n(_)})]),i(g,y)}),w(h),w(l),i(r,l)};B(U,r=>{n(c)&&r(he)})}var Z=a(U,2);qe(Z,{});var we=a(Z,2);ke(we,{setVisible:N}),w(s);var K=a(s,2),X=a(x(K),2);H(X,22,()=>T,r=>r,(r,l,h)=>{var g=Ke(),p=x(g);let P;var y=x(p,!0);w(p),w(g),q(E=>{d(p,"href",l.ref),P=le(p,1,"",null,P,E),ce(y,l.title)},[()=>({"page-visible":n(h)===n(_),"page-nonvisible":n(h)!==n(_)})]),i(r,g)}),w(X),w(K),i(C,e),ge()}Te(["click"]);export{lt as component,ct as universal};
//# sourceMappingURL=71.CI6RUrUq.js.map
