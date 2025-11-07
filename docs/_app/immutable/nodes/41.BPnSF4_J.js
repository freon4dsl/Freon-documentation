import{f as v,a as s,t as F,e as Le}from"../chunks/nks1QWJh.js";import{y as pe,G as me,x as q,z as ue,u as t,A as U,g as o,I as ne,B as W,a as B,$ as xe,v as h,s as ge,w as f}from"../chunks/bZIXIZs8.js";import{d as je,i as D,s as se}from"../chunks/DANOUgWt.js";import{e as Z,p as ke,i as Ie,s as le}from"../chunks/CKHUE_gp.js";import{h as Se}from"../chunks/DCXhKCCG.js";import{h as Ce}from"../chunks/aX-frc9G.js";import{s as n}from"../chunks/BpSVRMQn.js";import{o as Be}from"../chunks/D62n5Z03.js";import{P as ce,S as G,c as Ae,B as De}from"../chunks/CFDUsp8k.js";import{F as de}from"../chunks/Bq9rkPJ0.js";const Ne=async({parent:I})=>{const{site:e,category:u}=await I();return{site:e,category:u,page:{title:"Projections for Limited Concepts",description:"Learn how to display limited concepts in Freon using radio groups for single-valued properties and checkbox lists for multi-valued properties.",tags:["limited concepts","projections","radio group","checkbox list","enumeration","editor controls","projectional editor","Freon","DSL development"],modifiedTime:"2025-11-07T18:12:52.262Z",publishedTime:"2025-11-07T17:20:18.610Z"}}},rt=Object.freeze(Object.defineProperty({__proto__:null,load:Ne},Symbol.toStringTag,{value:"Module"}));var Ee=v(`<!> <!> <p>There are two controls for limited concepts. They differ, based on whether the property is a list or a single value.
For single values, the property can be displayed as a radio group, where all possible values of the
limited concept are options. When the property is a list of limited values, it can be displayed as a list of checkboxes.</p> <p>The example that is used in the documentation defines the limited concept <code>InsuranceTheme</code> as a simple enumeration.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L129-L131

limited InsuranceTheme &#123;        // limited defined as a simple enumeration
    HomeTheme; HealthTheme; LegalTheme;
&#125;</code></pre> <p>This concept is used twice as property type. Once as a single value in <code>BaseProduct</code>, and once
as a list in <code>InsurancePart</code>.</p> <!> <p>The metamodel for <code>BaseProduct</code> is the following.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L24-L39

concept BaseProduct &#123;
    name: identifier;               // internal name
    isUnderConstruction: boolean;   // defines whether this base product is still 'raw'
    theme: InsuranceTheme;          // the 'kind' of insurance
    parts: InsurancePart[];         // all parts of this product
    // The following properties are present to show the different options for displaying booleans.
    isApprovedLevel1: boolean;
    isApprovedLevel2: boolean;
    isApprovedLevel3: boolean;
    yieldsProfit: boolean;
    range: number;
    nrOfUse: number;
    // The previoud two properties are present to show the different options for displaying numbers.
    // The following property is present to show the use of an external DatePicker component.
    date: string;
&#125;</code></pre> <p>We combine this metamodel with the following projection.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-main-controls.edit#L5-L17

BaseProduct &#123;[
    Base Products $&#123;name&#125; for $&#123;theme radio&#125;
        is still under construction: $&#123;self.isUnderConstruction switch&#125;
        is approved level1: $&#123;self.isApprovedLevel1 radio [Sure | NoWay]&#125;
        is approved level2: $&#123;self.isApprovedLevel2 inner-switch&#125;
        is approved level3: $&#123;self.isApprovedLevel3 checkbox&#125;
        yields profit: $&#123;self.yieldsProfit text [Plenty | Little]&#125;
        expected nr of use: $&#123;self.nrOfUse&#125;
        range: $&#123;self.range slider&#125;


        $&#123;parts&#125;
]&#125;</code></pre> <p>The result is shown below.</p> <!> <!> <p>The metamodel for <code>InsuranceProduct</code> is the following.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/language-main.ast#L53-L65

concept InsuranceProduct &#123;
    name: identifier;                       // internal name
    productName: string;                    // name by which this product is known to the public
    themes: InsuranceTheme[];               // the 'kind' of insurance
    advertisedPremium: EuroLiteral;         // the premium as known to the public
    nrPremiumDays: PremiumDays;             // the number of days for which the advertised premium is calculated
    reference parts: InsurancePart[];       // optionally, known parts can be included by reference
    reference basedOn: BaseProduct[];       // the BaseProducts from which the parts are taken

    riskAdjustment?: PercentageLiteral;     // an adjustment to the risk of the separate parts, e.g. caused by the combination of the parts
    calculation: DocuExpression;            // the premium as calculated based on the parts
    helpers: CalcFunction[];                // helper functions used to calculate the premium
&#125;</code></pre> <p>Again, we combine this metamodel with a projection.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/editor-main-controls.edit#L19-L30

InsuranceProduct &#123;[
    Insurance Product $&#123;name&#125; ( public name: $&#123;productName&#125; ) USES $&#123;basedOn horizontal separator[, ]&#125;
        Themes: $&#123;themes checkbox&#125;
        Premium: $&#123;advertisedPremium&#125; per $&#123;nrPremiumDays&#125;
        Insured risks:
            $&#123;parts vertical terminator [;]&#125;
        Calculation
            [? Risk adjusted by = $&#123;riskAdjustment&#125; ]
            calculated premium: $&#123;calculation&#125;
        [?Helper functions:
            $&#123;helpers vertical&#125;]
]&#125;</code></pre> <p>And the result is the following.</p> <!> <!>`,1);function Oe(I,e){pe(e,!0);const u=me({});Be(()=>{document.querySelectorAll("pre").forEach(l=>{const d=document.createElement("div");d.className="copy-prompt";const x=document.createElement("p");x.innerHTML="👆 Click to copy",x.className="copy-prompt-p";const j=document.createElement("img");j.src="/icons/copy-icon.svg",j.className="copy-prompt-img",d.appendChild(j),d.appendChild(x),l.appendChild(d),l.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{l.querySelector("code")?.textContent!==null&&l.querySelector("code")?.textContent!==void 0&&Ae(l.querySelector("code").textContent),l.querySelector(".copy-prompt > p")?.innerHTML!==null&&l.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(l.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{l.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let w="/Documentation/Defining_an_Editor/String_Projections",y="/Documentation/Defining_an_Editor/Binary_Expressions";var N=Ee(),T=q(N);ce(T,{prevLink:w,nextLink:y});var L=t(T,2);G(L,{tag:"h1",id:"projections-for-limited-concepts-1",onIntersectChange:a=>e.setVisible("projections-for-limited-concepts-1",a),get intersecting(){return u["projections-for-limited-concepts-1"]},set intersecting(a){u["projections-for-limited-concepts-1"]=a},children:(a,l)=>{U();var d=F("Projections for Limited Concepts");s(a,d)},$$slots:{default:!0}});var S=t(L,10);G(S,{tag:"h2",id:"single-valued-properties-2",onIntersectChange:a=>e.setVisible("single-valued-properties-2",a),get intersecting(){return u["single-valued-properties-2"]},set intersecting(a){u["single-valued-properties-2"]=a},children:(a,l)=>{U();var d=F("Single Valued Properties");s(a,d)},$$slots:{default:!0}});var C=t(S,12);de(C,{imageName:"documentation/Documentation-Limited-Projections-screenshot1.png",caption:"A control for a single value of limited type",figureNumber:1});var E=t(C,2);G(E,{tag:"h2",id:"multi-valued-properties-3",onIntersectChange:a=>e.setVisible("multi-valued-properties-3",a),get intersecting(){return u["multi-valued-properties-3"]},set intersecting(a){u["multi-valued-properties-3"]=a},children:(a,l)=>{U();var d=F("Multi-Valued Properties");s(a,d)},$$slots:{default:!0}});var O=t(E,12);de(O,{imageName:"documentation/Documentation-Limited-Projections-screenshot2.png",caption:"A control for a multi-valued property of limited type",figureNumber:2});var H=t(O,2);ce(H,{prevLink:w,nextLink:y}),s(I,N),ue()}var Me=v('<meta property="article:published_time"/>'),qe=v('<meta property="article:modified_time"/>'),He=v('<meta property="article:tag"/>'),Ve=v('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),ze=(I,e)=>{ge(e,!o(e))},Fe=v('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Ue=v('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),We=v('<li class="page-toc-text"><a> </a></li>'),Ze=v('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ge=v('<li class="page-toc-text"><a> </a></li>'),Je=v('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function it(I,e){pe(e,!0);let u=ne(!1);const w=me([{id:"projections-for-limited-concepts-1",title:"Projections for Limited Concepts",visible:!1,ref:"#projections-for-limited-concepts-1"},{id:"single-valued-properties-2",title:"Single Valued Properties",visible:!1,ref:"#single-valued-properties-2"},{id:"multi-valued-properties-3",title:"Multi-Valued Properties",visible:!1,ref:"#multi-valued-properties-3"}]);let y=ne(0);function N(r,i){const g=w.find(c=>c.id===r);g&&(g.visible=i);const p=w.findIndex(c=>c.visible);p>=0&&ge(y,p,!0)}const T=W(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),L=W(()=>e.data.page.description??e.data.category.description),S="https://freon4dsl.dev/images/freon-banner.png";let C=W(()=>{const r=ke.url.pathname;return`https://freon4dsl.dev${r==="/"?"/":r.replace(/\/$/,"")}`});const E=e.data.site?.tags??[],O=e.data.category?.tags??[],H=e.data.page.tags??[],a=[...new Set([...E,...O,...H].filter(Boolean))],l={"@context":"https://schema.org","@type":"WebPage",headline:o(T),description:o(L),url:o(C),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:a.length?a.join(", "):void 0,image:S,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var d=Je();Ce(r=>{var i=Ve(),g=q(i),p=t(g,4),c=t(p,2);{var k=m=>{var P=Me();B(()=>n(P,"content",e.data.page.publishedTime)),s(m,P)};D(c,m=>{e.data.page.publishedTime&&m(k)})}var _=t(c,2);{var b=m=>{var P=qe();B(()=>n(P,"content",e.data.page.modifiedTime)),s(m,P)};D(_,m=>{e.data.page.modifiedTime&&m(b)})}var A=t(_,2);{var z=m=>{var P=Le(),Pe=q(P);Z(Pe,17,()=>a,Ie,(we,Te)=>{var ie=He();B(()=>n(ie,"content",o(Te))),s(we,ie)}),s(m,P)};D(A,m=>{a&&m(z)})}var M=t(A,2),X=t(M,4),Y=t(X,2),$=t(Y,2),ee=t($,2);n(ee,"content",S);var te=t(ee,2),ae=t(te,4),oe=t(ae,2),re=t(oe,2);n(re,"content",S);var be=t(re,2);Se(be,()=>`<script type="application/ld+json">${JSON.stringify(l)}<\/script>`),B(m=>{xe.title=o(T)??"",n(g,"content",o(L)),n(p,"href",o(C)),n(M,"content",m),n(X,"content",o(T)),n(Y,"content",o(L)),n($,"content",e.data.site.title),n(te,"content",o(C)),n(ae,"content",o(T)),n(oe,"content",o(L))},[()=>a.join(", ")]),s(r,i)});var x=q(d),j=h(x),V=t(h(j),2);V.__click=[ze,u];var fe=h(V);{var ve=r=>{var i=Fe();s(r,i)},he=r=>{var i=Ue();s(r,i)};D(fe,r=>{o(u)?r(ve):r(he,!1)})}f(V),f(j);var J=t(j,2);{var ye=r=>{var i=Ze(),g=h(i);Z(g,22,()=>w,p=>p,(p,c,k)=>{var _=We(),b=h(_);let A;var z=h(b,!0);f(b),f(_),B(M=>{n(b,"href",c.ref),A=le(b,1,"",null,A,M),se(z,c.title)},[()=>({"page-visible":o(k)===o(y),"page-nonvisible":o(k)!==o(y)})]),s(p,_)}),f(g),f(i),s(r,i)};D(J,r=>{o(u)&&r(ye)})}var R=t(J,2);De(R,{});var _e=t(R,2);Oe(_e,{setVisible:N}),f(x);var K=t(x,2),Q=t(h(K),2);Z(Q,22,()=>w,r=>r,(r,i,g)=>{var p=Ge(),c=h(p);let k;var _=h(c,!0);f(c),f(p),B(b=>{n(c,"href",i.ref),k=le(c,1,"",null,k,b),se(_,i.title)},[()=>({"page-visible":o(g)===o(y),"page-nonvisible":o(g)!==o(y)})]),s(r,p)}),f(Q),f(K),s(I,d),ue()}je(["click"]);export{it as component,rt as universal};
//# sourceMappingURL=41.BPnSF4_J.js.map
