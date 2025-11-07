import{f,a as l,t as I,e as Ce}from"../chunks/nks1QWJh.js";import{y as de,G as he,x as z,z as ge,u as o,A as j,g as n,I as ie,B as Y,a as N,$ as Pe,v,s as ue,w as m}from"../chunks/bZIXIZs8.js";import{d as Se,i as R,s as le}from"../chunks/DANOUgWt.js";import{e as U,p as Te,i as ke,s as ce}from"../chunks/CKHUE_gp.js";import{h as Be}from"../chunks/DCXhKCCG.js";import{h as Fe}from"../chunks/aX-frc9G.js";import{s as p}from"../chunks/BpSVRMQn.js";import{o as Le}from"../chunks/D62n5Z03.js";import{P as pe,S as A,c as Ie,B as je}from"../chunks/CFDUsp8k.js";import{F as Ne}from"../chunks/Bq9rkPJ0.js";const Ae=async({parent:B})=>{const{site:t,category:i}=await B();return{site:t,category:i,page:{title:"A Wrapper with a Button",description:"Build a custom Svelte wrapper component in Freon that augments a phone number with a clickable button and snackbar notification, and register it for use in projections.",tags:["Freon","Svelte","external components","wrapper","NumberWrapperBox","RenderComponent","PhoneButton","Flowbite","CourseSchedule","projections"],modifiedTime:"2025-11-07T19:14:07.931Z",publishedTime:"2025-11-07T17:20:18.642Z"}}},at=Object.freeze(Object.defineProperty({__proto__:null,load:Ae},Symbol.toStringTag,{value:"Module"}));var Ee=f(`<!> <!> <p>In this part of the example, we’ll create a <strong>custom wrapper component</strong> in Freon.
The component wraps a native Freon property using the</p> <a href="https://flowbite-svelte.com/" target="_blank">Flowbite Svelte</a> library.
Our example combines a person’s **phone number** with a **button** that can trigger actions using that value.
Here, clicking the button shows the phone number in a snackbar notification—but you could just as well send it to an
external system to initiate a call or validate it against another database. <hr/> <!> <p>We’ll create <code>PhoneButton.svelte</code>, a wrapper for the phone number that provides a trigger button.
There are three key parts: <strong>Script</strong>, <strong>HTML</strong>, and <strong>CSS</strong>.</p> <h3 id="the-script-part-1">The Script Part</h3> <p>Declare the two mandatory props: <code>editor</code> and <code>box</code>.<br/> The <code>box</code> is a <code>NumberWrapperBox</code>, which can wrap a number node
(see <a href="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types#wrapping-primitive-properties-5">Wrapping Property Projections of Primitive type</a>).</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L8-L9

// Props
let &#123; editor, box &#125;: FreComponentProps&lt;NumberWrapperBox&gt; = $props();</code></pre> <p>Define functions to keep the component in sync when the AST or box model changes.<br/> <code>setFocus</code> forwards focus to the wrapped box; <code>refresh</code> updates any model-driven view state.</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L16-L21

async function setFocus(): Promise&lt;void&gt; &#123;
    box.childBox.setFocus();
&#125;
const refresh = (why?: string): void =&gt; &#123;
    // do whatever needs to be done to refresh the elements that show information from the model
&#125;;</code></pre> <p>Register these with the box using reactive lifecycle hooks:</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L22-L29

$effect(() =&gt; &#123;
    box.setFocus = setFocus;
    box.refreshComponent = refresh;
&#125;);

const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
const buttonCls: string =
  'bg-light-base-600 					dark:bg-dark-base-200 ' +</code></pre> <h3 id="the-html-part-2">The HTML Part</h3> <p>The HTML contains a wrapper <code>&lt;div&gt;</code> with the rendered phone number and an Flowbite button.
You <strong>cannot</strong> mount a box directly; instead, use Freon’s <code>RenderComponent</code> which renders any known box.
It requires both <code>box</code> and <code>editor</code>—the same props your component receives.</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L33-L36

&lt;/script&gt;

&lt;div class="wrapper"&gt;
    Phone number: &lt;RenderComponent box=&#123;box.childBox&#125; editor=&#123;editor&#125;/&gt;</code></pre> <p>Add a toast/snackbar that appears when the button is clicked. The message includes the current phone value:</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L38-L43

    &lt;PhoneOutline class="&#123;iconCls&#125;" /&gt;
    &lt;/Button&gt;
&lt;/div&gt;

&#123;#if showToast&#125;
    &lt;Toast color="green" onclick=&#123;() =&gt; showToast = false&#125;&gt;</code></pre> <h3 id="the-style-part-3">The Style Part</h3> <p>Basic styling for the wrapper; Flowbite components themselves are themed via</p> <a href="https://tailwindcss.com/" target="_blank">Tailwind</a> (already configured for the host app). <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L45-L52

        &#123;#snippet icon()&#125;
            &lt;PhoneOutline class="&#123;iconCls&#125;" /&gt;
        &#123;/snippet&#125;
    &lt;/Toast&gt;
&#123;/if&#125;

&lt;style&gt;
    .wrapper &#123;</code></pre> <h3 id="the-complete-component-4">The Complete Component</h3> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase3/src/external/PhoneButton.svelte

&lt;script lang="ts"&gt;
    import &#123; Toast &#125; from "flowbite-svelte";
    import &#123; PhoneOutline &#125; from 'flowbite-svelte-icons';
    import &#123; type FreComponentProps, RenderComponent &#125; from "@freon4dsl/core-svelte";
    import &#123; NumberWrapperBox &#125; from "@freon4dsl/core";
    import &#123; Button &#125; from 'flowbite-svelte';

    // Props
    let &#123; editor, box &#125;: FreComponentProps&lt;NumberWrapperBox&gt; = $props();

    let clicked: number = 0;
    let showToast: boolean = $state(false);

    // The following three functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise&lt;void&gt; &#123;
        box.childBox.setFocus();
    &#125;
    const refresh = (why?: string): void =&gt; &#123;
        // do whatever needs to be done to refresh the elements that show information from the model
    &#125;;
    $effect(() =&gt; &#123;
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    &#125;);

    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-100 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
&lt;/script&gt;

&lt;div class="wrapper"&gt;
    Phone number: &lt;RenderComponent box=&#123;box.childBox&#125; editor=&#123;editor&#125;/&gt;
    &lt;Button tabindex=&#123;-1&#125; id="about-button" class="&#123;buttonCls&#125; &#123;colorCls&#125; " name="ToastOpen" onclick=&#123;() =&gt; &#123;clicked++; showToast = true&#125;&#125;&gt;
    &lt;PhoneOutline class="&#123;iconCls&#125;" /&gt;
    &lt;/Button&gt;
&lt;/div&gt;

&#123;#if showToast&#125;
    &lt;Toast color="green" onclick=&#123;() =&gt; showToast = false&#125;&gt;
        This person has been called on number &#123;box.getPropertyValue()&#125;.
        &#123;#snippet icon()&#125;
            &lt;PhoneOutline class="&#123;iconCls&#125;" /&gt;
        &#123;/snippet&#125;
    &lt;/Toast&gt;
&#123;/if&#125;

&lt;style&gt;
    .wrapper &#123;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    &#125;
&lt;/style&gt;</code></pre> <hr/> <!> <p>Register the component in the editor’s <a href="/Documentation/Defining_an_Editor/Global_Projections"><code>global</code></a> section:</p> <pre class="language-freon"><code class="language-freon">// CourseSchedule/phase3/defs/main.edit#L3-L8

global &#123;
    external &#123;
        PersonIcon,
        PhoneButton
    &#125;
&#125;</code></pre> <hr/> <!> <p>Use the wrapper in the <code>Person</code> projection by adding <code>wrap=PhoneButton</code> to the phone property.
We’ll keep this in the <code>externals.edit</code> projection set we introduced earlier:</p> <pre class="language-freon"><code class="language-freon">// CourseSchedule/phase3/defs/externals.edit

editor externals

Person &#123;[
    [fragment nameAndIcon]
        Availability: $&#123;self.availability checkbox&#125; Competence: $&#123;self.competence&#125;
]
fragment nameAndIcon [
[external=PersonIcon] Nickname: $&#123;self.name&#125;
Full Name: $&#123;self.fullName&#125;
$&#123;self.phone wrap=PhoneButton&#125;
]
&#125;</code></pre> <hr/> <!> <p>Tell Freon how to instantiate the component:</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase3/src/external/externals.ts

import &#123;setCustomComponents&#125; from "@freon4dsl/core-svelte";
import PersonIcon from "./PersonIcon.svelte";
import PhoneButton from "./PhoneButton.svelte";

/**
 * Configure the external components used, so Freon can find them.
 */
export function configureExternals() &#123;
    setCustomComponents([
        &#123; component: PersonIcon, knownAs: "PersonIcon" &#125;,
        &#123; component: PhoneButton, knownAs: "PhoneButton" &#125;,
    ]);
&#125;</code></pre> <hr/> <!> <p>Your editor now shows a <strong>phone button</strong> next to each number. Clicking it opens a snackbar with the number:</p> <!> <h3 id="conclusion-5">Conclusion</h3> <p>You’ve added a <strong>custom wrapper component</strong> to the Freon editor.<br/> It wraps a phone number and includes a button that triggers a snackbar.<br/> From here, you can build richer integrations—dialers, validations, or external lookups—fully integrated with your Freon projections.</p> <p>Next, you’ll learn how to <strong>replace</strong> the component that renders a list.</p> <!>`,1);function Oe(B,t){de(t,!0);const i=he({});Le(()=>{document.querySelectorAll("pre").forEach(s=>{const r=document.createElement("div");r.className="copy-prompt";const T=document.createElement("p");T.innerHTML="👆 Click to copy",T.className="copy-prompt-p";const E=document.createElement("img");E.src="/icons/copy-icon.svg",E.className="copy-prompt-img",r.appendChild(E),r.appendChild(T),s.appendChild(r),s.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{s.querySelector("code")?.textContent!==null&&s.querySelector("code")?.textContent!==void 0&&Ie(s.querySelector("code").textContent),s.querySelector(".copy-prompt > p")?.innerHTML!==null&&s.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(s.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{s.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let C="/Examples/External_Components/An_Icon_Component",b="/Examples/External_Components/Replacing_a_Part_List";var W=Ee(),P=z(W);pe(P,{prevLink:C,nextLink:b});var S=o(P,2);A(S,{tag:"h1",id:"a-wrapper-with-a-button-1",onIntersectChange:e=>t.setVisible("a-wrapper-with-a-button-1",e),get intersecting(){return i["a-wrapper-with-a-button-1"]},set intersecting(e){i["a-wrapper-with-a-button-1"]=e},children:(e,s)=>{j();var r=I("A Wrapper with a Button");l(e,r)},$$slots:{default:!0}});var F=o(S,8);A(F,{tag:"h2",id:"step-1-create-the-svelte-component-2",onIntersectChange:e=>t.setVisible("step-1-create-the-svelte-component-2",e),get intersecting(){return i["step-1-create-the-svelte-component-2"]},set intersecting(e){i["step-1-create-the-svelte-component-2"]=e},children:(e,s)=>{j();var r=I("Step 1: Create the Svelte Component");l(e,r)},$$slots:{default:!0}});var L=o(F,42);A(L,{tag:"h2",id:"step-2-add-to-the-global-section-3",onIntersectChange:e=>t.setVisible("step-2-add-to-the-global-section-3",e),get intersecting(){return i["step-2-add-to-the-global-section-3"]},set intersecting(e){i["step-2-add-to-the-global-section-3"]=e},children:(e,s)=>{j();var r=I("Step 2: Add to the Global Section");l(e,r)},$$slots:{default:!0}});var M=o(L,8);A(M,{tag:"h2",id:"step-3-include-in-the-projection-4",onIntersectChange:e=>t.setVisible("step-3-include-in-the-projection-4",e),get intersecting(){return i["step-3-include-in-the-projection-4"]},set intersecting(e){i["step-3-include-in-the-projection-4"]=e},children:(e,s)=>{j();var r=I("Step 3: Include in the Projection");l(e,r)},$$slots:{default:!0}});var q=o(M,8);A(q,{tag:"h2",id:"step-4-register-in-the-starter-code-5",onIntersectChange:e=>t.setVisible("step-4-register-in-the-starter-code-5",e),get intersecting(){return i["step-4-register-in-the-starter-code-5"]},set intersecting(e){i["step-4-register-in-the-starter-code-5"]=e},children:(e,s)=>{j();var r=I("Step 4: Register in the Starter Code");l(e,r)},$$slots:{default:!0}});var H=o(q,8);A(H,{tag:"h2",id:"final-result-6",onIntersectChange:e=>t.setVisible("final-result-6",e),get intersecting(){return i["final-result-6"]},set intersecting(e){i["final-result-6"]=e},children:(e,s)=>{j();var r=I("Final Result");l(e,r)},$$slots:{default:!0}});var w=o(H,4);Ne(w,{imageName:"examples/CourseSchedule/Screenshot-step3.png",caption:"Editor with added Phone Button",figureNumber:1});var D=o(w,8);pe(D,{prevLink:C,nextLink:b}),l(B,W),ge()}var Re=f('<meta property="article:published_time"/>'),We=f('<meta property="article:modified_time"/>'),Me=f('<meta property="article:tag"/>'),qe=f('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),He=(B,t)=>{ue(t,!n(t))},Ve=f('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),ze=f('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),De=f('<li class="page-toc-text"><a> </a></li>'),Ge=f('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ye=f('<li class="page-toc-text"><a> </a></li>'),Ue=f('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function rt(B,t){de(t,!0);let i=ie(!1);const C=he([{id:"a-wrapper-with-a-button-1",title:"A Wrapper with a Button",visible:!1,ref:"#a-wrapper-with-a-button-1"},{id:"step-1-create-the-svelte-component-2",title:"Step 1: Create the Svelte Component",visible:!1,ref:"#step-1-create-the-svelte-component-2"},{id:"step-2-add-to-the-global-section-3",title:"Step 2: Add to the Global Section",visible:!1,ref:"#step-2-add-to-the-global-section-3"},{id:"step-3-include-in-the-projection-4",title:"Step 3: Include in the Projection",visible:!1,ref:"#step-3-include-in-the-projection-4"},{id:"step-4-register-in-the-starter-code-5",title:"Step 4: Register in the Starter Code",visible:!1,ref:"#step-4-register-in-the-starter-code-5"},{id:"final-result-6",title:"Final Result",visible:!1,ref:"#final-result-6"}]);let b=ie(0);function W(a,c){const u=C.find(d=>d.id===a);u&&(u.visible=c);const h=C.findIndex(d=>d.visible);h>=0&&ue(b,h,!0)}const P=Y(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),S=Y(()=>t.data.page.description??t.data.category.description),F="https://freon4dsl.dev/images/freon-banner.png";let L=Y(()=>{const a=Te.url.pathname;return`https://freon4dsl.dev${a==="/"?"/":a.replace(/\/$/,"")}`});const M=t.data.site?.tags??[],q=t.data.category?.tags??[],H=t.data.page.tags??[],w=[...new Set([...M,...q,...H].filter(Boolean))],D={"@context":"https://schema.org","@type":"WebPage",headline:n(P),description:n(S),url:n(L),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:w.length?w.join(", "):void 0,image:F,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var e=Ue();Fe(a=>{var c=qe(),u=z(c),h=o(u,4),d=o(h,2);{var k=g=>{var y=Re();N(()=>p(y,"content",t.data.page.publishedTime)),l(g,y)};R(d,g=>{t.data.page.publishedTime&&g(k)})}var x=o(d,2);{var _=g=>{var y=We();N(()=>p(y,"content",t.data.page.modifiedTime)),l(g,y)};R(x,g=>{t.data.page.modifiedTime&&g(_)})}var O=o(x,2);{var G=g=>{var y=Ce(),xe=z(y);U(xe,17,()=>w,ke,(_e,ye)=>{var se=Me();N(()=>p(se,"content",n(ye))),l(_e,se)}),l(g,y)};R(O,g=>{w&&g(G)})}var V=o(O,2),X=o(V,4),$=o(X,2),ee=o($,2),te=o(ee,2);p(te,"content",F);var oe=o(te,2),ne=o(oe,4),ae=o(ne,2),re=o(ae,2);p(re,"content",F);var we=o(re,2);Be(we,()=>`<script type="application/ld+json">${JSON.stringify(D)}<\/script>`),N(g=>{Pe.title=n(P)??"",p(u,"content",n(S)),p(h,"href",n(L)),p(V,"content",g),p(X,"content",n(P)),p($,"content",n(S)),p(ee,"content",t.data.site.title),p(oe,"content",n(L)),p(ne,"content",n(P)),p(ae,"content",n(S))},[()=>w.join(", ")]),l(a,c)});var s=z(e),r=v(s),T=o(v(r),2);T.__click=[He,i];var E=v(T);{var me=a=>{var c=Ve();l(a,c)},fe=a=>{var c=ze();l(a,c)};R(E,a=>{n(i)?a(me):a(fe,!1)})}m(T),m(r);var Z=o(r,2);{var ve=a=>{var c=Ge(),u=v(c);U(u,22,()=>C,h=>h,(h,d,k)=>{var x=De(),_=v(x);let O;var G=v(_,!0);m(_),m(x),N(V=>{p(_,"href",d.ref),O=ce(_,1,"",null,O,V),le(G,d.title)},[()=>({"page-visible":n(k)===n(b),"page-nonvisible":n(k)!==n(b)})]),l(h,x)}),m(u),m(c),l(a,c)};R(Z,a=>{n(i)&&a(ve)})}var J=o(Z,2);je(J,{});var be=o(J,2);Oe(be,{setVisible:W}),m(s);var K=o(s,2),Q=o(v(K),2);U(Q,22,()=>C,a=>a,(a,c,u)=>{var h=Ye(),d=v(h);let k;var x=v(d,!0);m(d),m(h),N(_=>{p(d,"href",c.ref),k=ce(d,1,"",null,k,_),le(x,c.title)},[()=>({"page-visible":n(u)===n(b),"page-nonvisible":n(u)!==n(b)})]),l(a,h)}),m(Q),m(K),l(B,e),ge()}Se(["click"]);export{rt as component,at as universal};
//# sourceMappingURL=77.3vsJK5V-.js.map
