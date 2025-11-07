import{f as g,a as i,t as j,e as Ee}from"../chunks/nks1QWJh.js";import{y as de,G as pe,x as W,z as ue,u as r,A as I,g as a,I as ie,B as G,a as F,$ as we,v as b,s as me,w as f}from"../chunks/bZIXIZs8.js";import{d as Te,i as q,s as se}from"../chunks/DANOUgWt.js";import{e as U,p as Be,i as Le,s as le}from"../chunks/CKHUE_gp.js";import{h as Ie}from"../chunks/DCXhKCCG.js";import{h as Se}from"../chunks/aX-frc9G.js";import{s as c}from"../chunks/BpSVRMQn.js";import{o as Ne}from"../chunks/D62n5Z03.js";import{P as ce,S as V,c as Oe,B as Fe}from"../chunks/CFDUsp8k.js";import{N as Ce}from"../chunks/B1swYv4A.js";const je=async({parent:S})=>{const{site:e,category:d}=await S();return{site:e,category:d,page:{title:"Building an Interpreter",description:"Learn how to build an interpreter in Freon using the Computer Aided Learning DSL. This example walks through implementing literal and binary expression evaluation functions in TypeScript.",tags:["Freon","interpreter","EducationInterpreter","evaluation","AST","RtNumber","RtFraction","RtBoolean","SimpleNumber","NumberLiteralExpression","OrExpression","binary expressions","runtime","tutorial","example"],modifiedTime:"2025-11-07T17:20:18.626Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},ot=Object.freeze(Object.defineProperty({__proto__:null,load:je},Symbol.toStringTag,{value:"Module"}));var qe=g(`When running the interpreter from the <code>Edit</code> menu, Freon evaluates the <strong>currently selected node</strong>.  
You’ll see different results in the <em>Interpreter</em> tab depending on the selection.  
Sometimes interpretation cannot complete because additional context is needed — it’s up to the interpreter creator to handle such cases.`,1),ke=g(`<!> <!> <p>This example demonstrates how to <strong>create an interpreter</strong> for your Freon-based language.</p> <!> <p>The language used in this extended example is the same one explained in detail in the <a href="/Tutorial/Overview">tutorial</a>.<br/> In the DSL’s requirements, our hypothetical client wanted a way to <strong>test the page flow</strong>.<br/> We’ll build an interpreter to do just that.</p> <p>To follow along, run:</p> <pre class="language-bash"><code class="language-bash">npm create freon@latest</code></pre> <p>Then select the language <strong>EducationInterpreter</strong>.<br/> Build the project (<code>npm run build</code>), start the editor, and select the model named <strong>Model4Interpreter</strong> —<br/> it’s essentially the same as the tutorial’s <code>Lesson6</code> model.</p> <p>Open the model unit <strong>TestB</strong>, then run the interpreter from the <strong>Edit</strong> menu on the entire test<br/> (by selecting the test as the current node).</p> <!> <!> <p>As explained in <a href="/Documentation/Interpreter_Framework">Interpreter Framework</a>,<br/> there’s only one file we need to modify:<br/> <code>/src/freon/interpreter/EducationInterpreter.ts</code>.</p> <p>We’ll build the evaluation <strong>from the bottom up</strong> — starting with the literal expressions:<br/> <code>SimpleNumber</code>, <code>NumberLiteralExpression</code>, and <code>Fraction</code>.</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L216-L228

/////////////////// Literals

override evalSimpleNumber(node: SimpleNumber, ctx: InterpreterContext): RtObject &#123;
    return new RtNumber(node.value)
&#125;

override evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject &#123;
    return new RtNumber(node.value)
&#125;

override evalFraction(node: Fraction, ctx: InterpreterContext): RtObject &#123;
    return new RtFraction(new RtNumber(node.numerator), new RtNumber(node.denominator))
&#125;</code></pre> <p>The first two functions return an <code>RtNumber</code> runtime object containing the node’s value.<br/> The third returns an <code>RtFraction</code>, defined as:</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/runtime/RtFraction.ts

import &#123; RtBoolean, RtNumber, RtObject &#125; from "@freon4dsl/core";

export class RtFraction extends RtObject &#123;
    readonly _type: string = "RtFraction";

    nominator: RtNumber;
    denumerator: RtNumber;

    constructor(num: RtNumber, den: RtNumber) &#123;
        super();
        this.nominator = num;
        this.denumerator = den;
    &#125;

    override equals(other: RtObject): RtBoolean &#123;
        if (isRtFraction(other)) &#123;
            return this.nominator.equals(other.nominator).and(this.denumerator.equals(other.denumerator));
        &#125; else &#123;
            return RtBoolean.FALSE;
        &#125;
    &#125;
    
    override toString(): string &#123;
        return this.nominator.toString() + "/" + this.denumerator.toString()
    &#125;
&#125;

export function isRtFraction(object: any): object is RtFraction &#123;
    const _type = (object as any)?._type;
    return !!_type &amp;&amp; _type === "RtFraction";
&#125;</code></pre> <p>For our purposes, we don’t need to simplify fractions (e.g., <code>6/3 → 2</code>).<br/> We just need to compare them for equality, which is handled by the <code>equals</code> method.</p> <!> <p>Next, let’s define the evaluation functions for <strong>binary expressions</strong>.<br/> They all follow a similar pattern. Here’s the <code>OrExpression</code>:</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L244-L248

override evalOrExpression(node: OrExpression, ctx: InterpreterContext): RtObject &#123;
    const left = main.evaluate(node.left, ctx) as RtBoolean
    const right = main.evaluate(node.right, ctx) as RtBoolean
    return left.or(right)
&#125;</code></pre> <p>We first evaluate both sides of the expression.<br/> Note the use of the <strong>main interpreter</strong> from <code>MainEducationInterpreter.ts</code>,<br/> which can evaluate any node type.<br/> We then use the built-in <code>or</code> function of the <code>RtBoolean</code> class, defined as:</p> <pre class="language-ts"><code class="language-ts">export class RtBoolean extends RtObject &#123;
	static readonly TRUE = new RtBoolean(true);
	static readonly FALSE = new RtBoolean(false);

	static of(bool: boolean): RtBoolean &#123;
		return bool ? RtBoolean.TRUE : RtBoolean.FALSE;
	&#125;

	or(other: RtBoolean): RtBoolean &#123;
		return RtBoolean.of(this._value || other.asBoolean());
	&#125;
    ...  
&#125;		</code></pre> <p>Other expressions, like <code>AndExpression</code> and <code>EqualsExpression</code>, are implemented in much the same way.<br/> For example, here’s the <code>GreaterOrEqualsExpression</code>:</p> <pre class="language-ts"><code class="language-ts">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L256-L260

override evalGreaterOrEqualsExpression(node: GreaterOrEqualsExpression, ctx: InterpreterContext): RtObject &#123;
    const left = main.evaluate(node.left, ctx) as RtNumber
    const right = main.evaluate(node.right, ctx) as RtNumber
    return RtBoolean.of(left.value &gt;= right.value)
&#125;</code></pre> <p>This pattern makes your interpreter modular, easy to extend, and consistent across expression types.</p> <!>`,1);function Pe(S,e){de(e,!0);const d=pe({});Ne(()=>{document.querySelectorAll("pre").forEach(s=>{const o=document.createElement("div");o.className="copy-prompt";const h=document.createElement("p");h.innerHTML="👆 Click to copy",h.className="copy-prompt-p";const B=document.createElement("img");B.src="/icons/copy-icon.svg",B.className="copy-prompt-img",o.appendChild(B),o.appendChild(h),s.appendChild(o),s.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{s.querySelector("code")?.textContent!==null&&s.querySelector("code")?.textContent!==void 0&&Oe(s.querySelector("code").textContent),s.querySelector(".copy-prompt > p")?.innerHTML!==null&&s.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(s.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{s.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let E="/Examples/Overview",y="/Examples/Building_an_Interpreter/Basic_Evaluation_Functions";var k=ke(),w=W(k);ce(w,{prevLink:E,nextLink:y});var T=r(w,2);V(T,{tag:"h1",id:"building-an-interpreter-1",onIntersectChange:t=>e.setVisible("building-an-interpreter-1",t),get intersecting(){return d["building-an-interpreter-1"]},set intersecting(t){d["building-an-interpreter-1"]=t},children:(t,s)=>{I();var o=j("Building an Interpreter");i(t,o)},$$slots:{default:!0}});var N=r(T,4);V(N,{tag:"h2",id:"the-computer-aided-learning-dsl-2",onIntersectChange:t=>e.setVisible("the-computer-aided-learning-dsl-2",t),get intersecting(){return d["the-computer-aided-learning-dsl-2"]},set intersecting(t){d["the-computer-aided-learning-dsl-2"]=t},children:(t,s)=>{I();var o=j("The Computer Aided Learning DSL");i(t,o)},$$slots:{default:!0}});var O=r(N,12);Ce(O,{header:o=>{I();var h=j("The selected node is the one that is interpreted");i(o,h)},content:o=>{I();var h=qe();I(6),i(o,h)},$$slots:{header:!0,content:!0}});var P=r(O,2);V(P,{tag:"h2",id:"values-for-the-literals-3",onIntersectChange:t=>e.setVisible("values-for-the-literals-3",t),get intersecting(){return d["values-for-the-literals-3"]},set intersecting(t){d["values-for-the-literals-3"]=t},children:(t,s)=>{I();var o=j("Values for the Literals");i(t,o)},$$slots:{default:!0}});var A=r(P,14);V(A,{tag:"h2",id:"values-for-binary-expressions-4",onIntersectChange:t=>e.setVisible("values-for-binary-expressions-4",t),get intersecting(){return d["values-for-binary-expressions-4"]},set intersecting(t){d["values-for-binary-expressions-4"]=t},children:(t,s)=>{I();var o=j("Values for Binary Expressions");i(t,o)},$$slots:{default:!0}});var H=r(A,16);ce(H,{prevLink:E,nextLink:y}),i(S,k),ue()}var Ae=g('<meta property="article:published_time"/>'),Me=g('<meta property="article:modified_time"/>'),Ve=g('<meta property="article:tag"/>'),We=g('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),He=(S,e)=>{me(e,!a(e))},ze=g('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),De=g('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ge=g('<li class="page-toc-text"><a> </a></li>'),Ue=g('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ze=g('<li class="page-toc-text"><a> </a></li>'),Je=g('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function it(S,e){de(e,!0);let d=ie(!1);const E=pe([{id:"building-an-interpreter-1",title:"Building an Interpreter",visible:!1,ref:"#building-an-interpreter-1"},{id:"the-computer-aided-learning-dsl-2",title:"The Computer Aided Learning DSL",visible:!1,ref:"#the-computer-aided-learning-dsl-2"},{id:"values-for-the-literals-3",title:"Values for the Literals",visible:!1,ref:"#values-for-the-literals-3"},{id:"values-for-binary-expressions-4",title:"Values for Binary Expressions",visible:!1,ref:"#values-for-binary-expressions-4"}]);let y=ie(0);function k(n,l){const v=E.find(p=>p.id===n);v&&(v.visible=l);const u=E.findIndex(p=>p.visible);u>=0&&me(y,u,!0)}const w=G(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),T=G(()=>e.data.page.description??e.data.category.description),N="https://freon4dsl.dev/images/freon-banner.png";let O=G(()=>{const n=Be.url.pathname;return`https://freon4dsl.dev${n==="/"?"/":n.replace(/\/$/,"")}`});const P=e.data.site?.tags??[],A=e.data.category?.tags??[],H=e.data.page.tags??[],t=[...new Set([...P,...A,...H].filter(Boolean))],s={"@context":"https://schema.org","@type":"WebPage",headline:a(w),description:a(T),url:a(O),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:t.length?t.join(", "):void 0,image:N,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var o=Je();Se(n=>{var l=We(),v=W(l),u=r(v,4),p=r(u,2);{var L=m=>{var R=Ae();F(()=>c(R,"content",e.data.page.publishedTime)),i(m,R)};q(p,m=>{e.data.page.publishedTime&&m(L)})}var x=r(p,2);{var _=m=>{var R=Me();F(()=>c(R,"content",e.data.page.modifiedTime)),i(m,R)};q(x,m=>{e.data.page.modifiedTime&&m(_)})}var C=r(x,2);{var D=m=>{var R=Ee(),xe=W(R);U(xe,17,()=>t,Le,(_e,Re)=>{var oe=Ve();F(()=>c(oe,"content",a(Re))),i(_e,oe)}),i(m,R)};q(C,m=>{t&&m(D)})}var M=r(C,2),Q=r(M,4),X=r(Q,2),$=r(X,2),ee=r($,2);c(ee,"content",N);var te=r(ee,2),re=r(te,4),ae=r(re,2),ne=r(ae,2);c(ne,"content",N);var ye=r(ne,2);Ie(ye,()=>`<script type="application/ld+json">${JSON.stringify(s)}<\/script>`),F(m=>{we.title=a(w)??"",c(v,"content",a(T)),c(u,"href",a(O)),c(M,"content",m),c(Q,"content",a(w)),c(X,"content",a(T)),c($,"content",e.data.site.title),c(te,"content",a(O)),c(re,"content",a(w)),c(ae,"content",a(T))},[()=>t.join(", ")]),i(n,l)});var h=W(o),B=b(h),z=r(b(B),2);z.__click=[He,d];var ge=b(z);{var he=n=>{var l=ze();i(n,l)},ve=n=>{var l=De();i(n,l)};q(ge,n=>{a(d)?n(he):n(ve,!1)})}f(z),f(B);var Z=r(B,2);{var fe=n=>{var l=Ue(),v=b(l);U(v,22,()=>E,u=>u,(u,p,L)=>{var x=Ge(),_=b(x);let C;var D=b(_,!0);f(_),f(x),F(M=>{c(_,"href",p.ref),C=le(_,1,"",null,C,M),se(D,p.title)},[()=>({"page-visible":a(L)===a(y),"page-nonvisible":a(L)!==a(y)})]),i(u,x)}),f(v),f(l),i(n,l)};q(Z,n=>{a(d)&&n(fe)})}var J=r(Z,2);Fe(J,{});var be=r(J,2);Pe(be,{setVisible:k}),f(h);var Y=r(h,2),K=r(b(Y),2);U(K,22,()=>E,n=>n,(n,l,v)=>{var u=Ze(),p=b(u);let L;var x=b(p,!0);f(p),f(u),F(_=>{c(p,"href",l.ref),L=le(p,1,"",null,L,_),se(x,l.title)},[()=>({"page-visible":a(v)===a(y),"page-nonvisible":a(v)!==a(y)})]),i(n,u)}),f(K),f(Y),i(S,o),ue()}Te(["click"]);export{it as component,ot as universal};
//# sourceMappingURL=70.CXT17JOt.js.map
