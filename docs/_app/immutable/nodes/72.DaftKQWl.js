import{f as v,a as i,t as M,e as be}from"../chunks/nks1QWJh.js";import{y as de,G as pe,x as A,z as ue,u as a,A as U,g as o,I as se,B as G,a as L,$ as xe,v as h,s as me,w as f}from"../chunks/bZIXIZs8.js";import{d as Ee,i as O,s as ie}from"../chunks/DANOUgWt.js";import{e as Z,p as Se,i as Fe,s as le}from"../chunks/CKHUE_gp.js";import{h as Ie}from"../chunks/DCXhKCCG.js";import{h as Ce}from"../chunks/aX-frc9G.js";import{s}from"../chunks/BpSVRMQn.js";import{o as Pe}from"../chunks/D62n5Z03.js";import{P as ce,S as z,c as Le,B as Be}from"../chunks/CFDUsp8k.js";import{F as Oe}from"../chunks/Bq9rkPJ0.js";const qe=async({parent:I})=>{const{site:e,category:d}=await I();return{site:e,category:d,page:{title:"Finishing the Test",description:"Combine the interpreter’s building blocks to evaluate test flows end-to-end. Learn how to check step sequencing, aggregate scenario results, pass flow data via context, and present errors to the user.",tags:["Freon","interpreter","Test","Scenario","TestFlow","Step","Page","Flow","context","CURRENT_FLOW","RtPage","RtError","evaluation","EducationInterpreter","tutorial","example"],modifiedTime:"2025-11-07T17:20:18.626Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},rt=Object.freeze(Object.defineProperty({__proto__:null,load:qe},Symbol.toStringTag,{value:"Module"}));var Ne=v(`<!> <!> <p>All basic building blocks for the interpreter have been implemented. What’s left is to combine the information
and present it to the user.</p> <!> <p>Every <code>TestFlow</code> consists of a series of steps, where the page that is the result of a previous step should equal
the <code>fromPage</code> of the next. In the following code we loop over the steps, remember the evaluation result from the previous step,
and compare it to the <code>fromPage</code> of the current step. If there’s an error, we create a readable
message that will be shown to the user.</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L84-L107

override evalTestFlow(node: TestFlow, ctx: InterpreterContext): RtObject &#123;
    console.log("Evaluating Test Flow " + node.freId() + "  steps " + node.steps?.length)
    let previousPage: RtPage = undefined
    let previousStep: Step
    let first: boolean = true      // indicates whether there is a calculated value for 'previous'
    for (const step of node.steps) &#123;
        // Compare the fromPage with the previous stepResult
        if (!first &amp;&amp; previousPage.page !== step.$fromPage) &#123;
            // There was an error. Based on the given answers, we should not be on 'fromPage'.
            return new RtError(\`Next page of step $&#123;EducationEnvironment.getInstance().writer.writeToLines(previousStep)&#125; should be $&#123;previousPage.page.name&#125;, not $&#123;step.$fromPage.name&#125;.\`)
        &#125;
        const stepResult = main.evaluate(step, ctx)
        if (isRtPage(stepResult) ) &#123;
            // Remember the previous stepResult
            previousPage = stepResult
            previousStep = step
            first = false
        &#125;
        if (isRtError(stepResult)) &#123;
            return stepResult
        &#125;
    &#125;
    return RtBoolean.TRUE
&#125;</code></pre> <!> <p>The evaluation of <code>Scenario</code> is straightforward: loop over all test flows and return <code>false</code> if any produces an error.</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L70-L82

override evalScenario(node: Scenario, ctx: InterpreterContext): RtObject &#123;
    console.log("Evaluating Scenario " + node.description + "  testFlow " + node.testFlow?.length)
    for (const testFlow of node.testFlow) &#123;
        const stepFlowResult = main.evaluate(testFlow, ctx)
        if (isRtBoolean(stepFlowResult) &amp;&amp; stepFlowResult.asBoolean() === false) &#123;
            return RtBoolean.FALSE
        &#125;
        if (isRtError(stepFlowResult)) &#123;
            return stepFlowResult
        &#125;
    &#125;
    return RtBoolean.TRUE
&#125;</code></pre> <p>In the final evaluation function, <code>evalTest</code>, we also add the flow to the context under <code>CURRENT_FLOW</code>.
The rest mirrors the <code>evalScenario</code> logic.</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L52-L68

override evalTest(node: Test, ctx: InterpreterContext): RtObject &#123;
    console.log("Evaluating Scenario " + node.freId() + "  flow " + node.flow.referred?.name)
    // Puts the current flow in the context
    const newCtx = new InterpreterContext(ctx)
    const flow = new RtFlow(node.flow.referred)
    newCtx.set("CURRENT_FLOW", flow)
    for (const s of node.scenarios) &#123;
        const scenarioResult = main.evaluate(s, newCtx)
        if (isRtBoolean(scenarioResult) &amp;&amp; scenarioResult.asBoolean() === false) &#123;
            return RtBoolean.FALSE
        &#125;
        if (isRtError(scenarioResult)) &#123;
            return scenarioResult
        &#125;
    &#125;
    return RtBoolean.TRUE
&#125;</code></pre> <!> <p>Running the interpreter on the complete <code>TestB</code> model unit from our model (named <strong>Model4Interpreter</strong>)
results in this error:</p> <!> <!>`,1);function ke(I,e){de(e,!0);const d=pe({});Pe(()=>{document.querySelectorAll("pre").forEach(l=>{const c=document.createElement("div");c.className="copy-prompt";const E=document.createElement("p");E.innerHTML="👆 Click to copy",E.className="copy-prompt-p";const S=document.createElement("img");S.src="/icons/copy-icon.svg",S.className="copy-prompt-img",c.appendChild(S),c.appendChild(E),l.appendChild(c),l.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{l.querySelector("code")?.textContent!==null&&l.querySelector("code")?.textContent!==void 0&&Le(l.querySelector("code").textContent),l.querySelector(".copy-prompt > p")?.innerHTML!==null&&l.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(l.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{l.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let R="/Examples/Building_an_Interpreter/Using_the_Context",_="/Examples/Generic_Types";var q=Ne(),b=A(q);ce(b,{prevLink:R,nextLink:_});var x=a(b,2);z(x,{tag:"h1",id:"finishing-the-test-1",onIntersectChange:t=>e.setVisible("finishing-the-test-1",t),get intersecting(){return d["finishing-the-test-1"]},set intersecting(t){d["finishing-the-test-1"]=t},children:(t,l)=>{U();var c=M("Finishing the Test");i(t,c)},$$slots:{default:!0}});var C=a(x,4);z(C,{tag:"h2",id:"evaluation-of-testflow-2",onIntersectChange:t=>e.setVisible("evaluation-of-testflow-2",t),get intersecting(){return d["evaluation-of-testflow-2"]},set intersecting(t){d["evaluation-of-testflow-2"]=t},children:(t,l)=>{U();var c=M("Evaluation of TestFlow");i(t,c)},$$slots:{default:!0}});var P=a(C,6);z(P,{tag:"h2",id:"evaluation-of-scenario-and-test-3",onIntersectChange:t=>e.setVisible("evaluation-of-scenario-and-test-3",t),get intersecting(){return d["evaluation-of-scenario-and-test-3"]},set intersecting(t){d["evaluation-of-scenario-and-test-3"]=t},children:(t,l)=>{U();var c=M("Evaluation of Scenario and Test");i(t,c)},$$slots:{default:!0}});var N=a(P,10);z(N,{tag:"h2",id:"the-result-4",onIntersectChange:t=>e.setVisible("the-result-4",t),get intersecting(){return d["the-result-4"]},set intersecting(t){d["the-result-4"]=t},children:(t,l)=>{U();var c=M("The Result");i(t,c)},$$slots:{default:!0}});var k=a(N,4);Oe(k,{imageName:"examples/Interpreter/Interpreter-result.png",caption:"The result of the interpreter showing an error",figureNumber:1});var H=a(k,2);ce(H,{prevLink:R,nextLink:_}),i(I,q),ue()}var je=v('<meta property="article:published_time"/>'),Me=v('<meta property="article:modified_time"/>'),Ue=v('<meta property="article:tag"/>'),ze=v('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Ae=(I,e)=>{me(e,!o(e))},He=v('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Ve=v('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),We=v('<li class="page-toc-text"><a> </a></li>'),Ge=v('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ze=v('<li class="page-toc-text"><a> </a></li>'),Je=v('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function nt(I,e){de(e,!0);let d=se(!1);const R=pe([{id:"finishing-the-test-1",title:"Finishing the Test",visible:!1,ref:"#finishing-the-test-1"},{id:"evaluation-of-testflow-2",title:"Evaluation of TestFlow",visible:!1,ref:"#evaluation-of-testflow-2"},{id:"evaluation-of-scenario-and-test-3",title:"Evaluation of Scenario and Test",visible:!1,ref:"#evaluation-of-scenario-and-test-3"},{id:"the-result-4",title:"The Result",visible:!1,ref:"#the-result-4"}]);let _=se(0);function q(r,n){const g=R.find(p=>p.id===r);g&&(g.visible=n);const u=R.findIndex(p=>p.visible);u>=0&&me(_,u,!0)}const b=G(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),x=G(()=>e.data.page.description??e.data.category.description),C="https://freon4dsl.dev/images/freon-banner.png";let P=G(()=>{const r=Se.url.pathname;return`https://freon4dsl.dev${r==="/"?"/":r.replace(/\/$/,"")}`});const N=e.data.site?.tags??[],k=e.data.category?.tags??[],H=e.data.page.tags??[],t=[...new Set([...N,...k,...H].filter(Boolean))],l={"@context":"https://schema.org","@type":"WebPage",headline:o(b),description:o(x),url:o(P),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:t.length?t.join(", "):void 0,image:C,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var c=Je();Ce(r=>{var n=ze(),g=A(n),u=a(g,4),p=a(u,2);{var F=m=>{var T=je();L(()=>s(T,"content",e.data.page.publishedTime)),i(m,T)};O(p,m=>{e.data.page.publishedTime&&m(F)})}var w=a(p,2);{var y=m=>{var T=Me();L(()=>s(T,"content",e.data.page.modifiedTime)),i(m,T)};O(w,m=>{e.data.page.modifiedTime&&m(y)})}var B=a(w,2);{var W=m=>{var T=be(),ye=A(T);Z(ye,17,()=>t,Fe,(Te,Re)=>{var ne=Ue();L(()=>s(ne,"content",o(Re))),i(Te,ne)}),i(m,T)};O(B,m=>{t&&m(W)})}var j=a(B,2),X=a(j,4),Y=a(X,2),$=a(Y,2),ee=a($,2);s(ee,"content",C);var te=a(ee,2),ae=a(te,4),oe=a(ae,2),re=a(oe,2);s(re,"content",C);var we=a(re,2);Ie(we,()=>`<script type="application/ld+json">${JSON.stringify(l)}<\/script>`),L(m=>{xe.title=o(b)??"",s(g,"content",o(x)),s(u,"href",o(P)),s(j,"content",m),s(X,"content",o(b)),s(Y,"content",o(x)),s($,"content",e.data.site.title),s(te,"content",o(P)),s(ae,"content",o(b)),s(oe,"content",o(x))},[()=>t.join(", ")]),i(r,n)});var E=A(c),S=h(E),V=a(h(S),2);V.__click=[Ae,d];var ge=h(V);{var fe=r=>{var n=He();i(r,n)},ve=r=>{var n=Ve();i(r,n)};O(ge,r=>{o(d)?r(fe):r(ve,!1)})}f(V),f(S);var J=a(S,2);{var he=r=>{var n=Ge(),g=h(n);Z(g,22,()=>R,u=>u,(u,p,F)=>{var w=We(),y=h(w);let B;var W=h(y,!0);f(y),f(w),L(j=>{s(y,"href",p.ref),B=le(y,1,"",null,B,j),ie(W,p.title)},[()=>({"page-visible":o(F)===o(_),"page-nonvisible":o(F)!==o(_)})]),i(u,w)}),f(g),f(n),i(r,n)};O(J,r=>{o(d)&&r(he)})}var D=a(J,2);Be(D,{});var _e=a(D,2);ke(_e,{setVisible:q}),f(E);var K=a(E,2),Q=a(h(K),2);Z(Q,22,()=>R,r=>r,(r,n,g)=>{var u=Ze(),p=h(u);let F;var w=h(p,!0);f(p),f(u),L(y=>{s(p,"href",n.ref),F=le(p,1,"",null,F,y),ie(w,n.title)},[()=>({"page-visible":o(g)===o(_),"page-nonvisible":o(g)!==o(_)})]),i(r,u)}),f(Q),f(K),i(I,c),ue()}Ee(["click"]);export{nt as component,rt as universal};
//# sourceMappingURL=72.DaftKQWl.js.map
