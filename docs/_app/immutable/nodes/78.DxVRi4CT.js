import{f,a as s,t as F,e as Ae}from"../chunks/nks1QWJh.js";import{y as ge,G as he,x as $,z as me,u as o,A as N,g as n,I as se,B as U,a as I,$ as Ce,v,s as ue,w as u}from"../chunks/bZIXIZs8.js";import{d as we,i as j,s as le}from"../chunks/DANOUgWt.js";import{e as X,p as Te,i as Be,s as ce}from"../chunks/CKHUE_gp.js";import{h as Le}from"../chunks/DCXhKCCG.js";import{h as ke}from"../chunks/aX-frc9G.js";import{s as d}from"../chunks/BpSVRMQn.js";import{o as Ie}from"../chunks/D62n5Z03.js";import{P as de,S as z,c as Oe,B as Re}from"../chunks/CFDUsp8k.js";import{F as pe}from"../chunks/Bq9rkPJ0.js";const Fe=async({parent:B})=>{const{site:e,category:l}=await B();return{site:e,category:l,page:{title:"Replacing a Part List",description:"Replace a Freon part list with a custom Svelte accordion component. Learn to build StaffAccordion.svelte, wire it to PartListReplacerBox, manage focus and refresh, and register it for use in projections.",tags:["Freon","Svelte","external components","PartListReplacerBox","StaffAccordion","Accordion","RenderComponent","AST.change","MobX","projections","CourseSchedule"],modifiedTime:"2025-11-07T18:12:52.262Z",publishedTime:"2025-11-07T17:20:18.642Z"}}},at=Object.freeze(Object.defineProperty({__proto__:null,load:Fe},Symbol.toStringTag,{value:"Module"}));var Ne=f(`<!> <!> <p>In this part of the extended example, you’ll learn how to replace a <strong>part list</strong> in your application by creating a custom Svelte component, <code>StaffAccordion.svelte</code>, to display and manage a list of teachers within an accordion.</p> <!> <p>We’ll create the <code>StaffAccordion.svelte</code> component to replace the default projection of the <code>teachers</code> property in the <code>Staff</code> model unit.</p> <h3 id="the-script-section-1">The Script Section</h3> <p>Begin by defining the component’s parameters and the necessary state management functions:</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L9-L55

// This property is a parts list, therefore the external box to use is an PartListReplacerBox.
// Props
let &#123; editor, box &#125;: FreComponentProps&lt;PartListReplacerBox&gt; = $props();

let panelOpen: boolean[] = $state([]);      // List of booleans to indicate which panel is open (true) and closed (false).
let multiplePar: boolean = $state(false);   // Indicates whether multiple panels may be open at the same time.

let ch = $state([...box.children])
/*
    Sets all panels in the state 'closed',
    and sets the length of 'panelOpen'.
 */
function initialize() &#123;
    let param: string | undefined = box.findParam("multi");
    if (param === "multiple") &#123;
        multiplePar = true;
    &#125;
    panelOpen = []
    for (let i = 0; i &lt; box.children.length; i++) &#123;
        // this also sets the length of panelOpen!
        panelOpen[i] = false;
        box.children[i].isVisible = false; // the child boxes are not currently shown
    &#125;
&#125;

// The following three functions need to be included for the editor to function properly.
// Please, set the focus to the first editable/selectable element in this component.
async function setFocus(): Promise&lt;void&gt; &#123;
    for( let i=0; i &lt; box.children.length; i++) &#123;
        if (panelOpen[i]) &#123;
            box.children[i].setFocus();
        &#125;
    &#125;
&#125;
const refresh = (why?: string): void =&gt; &#123;
    console.log("REFRESH ACCORDION")
    // do whatever needs to be done to refresh the elements that show information from the model
    untrack( () =&gt; initialize() );
&#125;;
const addPerson = () =&gt; &#123;
    // Note that you need to put any changes to the actual model in a 'AST.change or AST.changeNamed',
    // because all elements in the model are reactive using mobx.
    AST.change(() =&gt; &#123;
        let newPerson: Person = Person.create(&#123;&#125;);
        box.getPropertyValue().push(newPerson);
    &#125;);
&#125;</code></pre> <p>We implement <code>setFocus</code> so that when focus is programmatically set to the list, it forwards focus to the first <strong>open</strong> panel’s content.<br/> <code>initialize</code> reads the <code>multi</code> parameter (from the <code>.edit</code> file) and initializes <code>panelOpen</code>.</p> <p>We also provide <code>addPerson</code> and <code>removePerson</code> to mutate the list. Because the AST is reactive via <strong>MobX</strong>, changes must be wrapped in <code>AST.change</code> (or <code>AST.changeNamed</code>).</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L57-L72

const removePerson = (index: number) =&gt; &#123;
    // Note that you need to put any changes to the actual model in a 'AST.change' or
    // 'AST.changeNamed', because all elements in the AST model are reactive using mobx.
    AST.change(() =&gt; &#123;
        box.getPropertyValue().splice(index, 1);
    &#125;);
&#125;
// Run the initialization
initialize();

$effect(() =&gt; &#123;
    // $inspect.trace(\`accordion for $effect $&#123;box.children.length&#125; id $&#123;box.id&#125;\`)
    // console.log(\`========== $effect $&#123;box.children.length&#125; id $&#123;box.id&#125;\` )
    box.setFocus = setFocus;
    box.refreshComponent = refresh;
    // Needed to get an effect</code></pre> <h3 id="the-html-section-2">The HTML Section</h3> <p>The HTML consists of a wrapper <code>div</code> with an <code>Accordion</code> and a button to <strong>add</strong> items.<br/> Inside the <code>Accordion</code>, we iterate over <code>box.children</code>, creating a <code>Panel</code> per child.<br/> For each panel header, we use AST info from <code>childBox.node</code>:</p> <ul><li><code>childBox.node.freLanguageConcept()</code> → the meta concept name (e.g., <code>Person</code>)</li> <li><code>childBox.node.freId()</code> → a stable id</li> <li>For ad-hoc access to properties without casting, we use <strong>typed index access</strong>: <code>childBox.node["name"]</code>.</li></ul> <p>The panel content renders the native Freon component for the child via <code>RenderComponent</code>, and includes a <strong>remove</strong> button.</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L78-L96

    &#125;);

    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-100 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
&lt;/script&gt;

&lt;div style="display: flex; align-items: flex-end;"&gt;
    &lt;Accordion multiple=&#123;multiplePar&#125;&gt;
        &#123;#each ch as childBox, index&#125;
            &lt;AccordionItem bind:open=&#123;panelOpen[index]&#125;&gt;
                &#123;#snippet header()&#125;
                    &#123;childBox.node.freLanguageConcept()&#125; &#123;childBox.node.freId()&#125;
                &#123;/snippet&#125;

                    &lt;div style="display: flex; align-items: flex-end;"&gt;</code></pre> <h3 id="the-complete-component-3">The Complete Component</h3> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase4/src/external/StaffAccordion.svelte

&lt;script lang="ts"&gt;
    import &#123; AccordionItem, Accordion, Button &#125; from 'flowbite-svelte';
    import &#123; AST, PartListReplacerBox &#125; from "@freon4dsl/core";
    import &#123; type FreComponentProps, RenderComponent &#125; from "@freon4dsl/core-svelte";
    import &#123; Person &#125; from "../freon/index.js";
    import &#123; untrack &#125; from "svelte"
    import &#123; UserAddOutline, UserRemoveOutline &#125; from 'flowbite-svelte-icons';
    // This component replaces the component for "teachers: Person[];" from model unit "Staff".
    // This property is a parts list, therefore the external box to use is an PartListReplacerBox.
    // Props
    let &#123; editor, box &#125;: FreComponentProps&lt;PartListReplacerBox&gt; = $props();

    let panelOpen: boolean[] = $state([]);      // List of booleans to indicate which panel is open (true) and closed (false).
    let multiplePar: boolean = $state(false);   // Indicates whether multiple panels may be open at the same time.

    let ch = $state([...box.children])
    /*
        Sets all panels in the state 'closed',
        and sets the length of 'panelOpen'.
     */
    function initialize() &#123;
        let param: string | undefined = box.findParam("multi");
        if (param === "multiple") &#123;
            multiplePar = true;
        &#125;
        panelOpen = []
        for (let i = 0; i &lt; box.children.length; i++) &#123;
            // this also sets the length of panelOpen!
            panelOpen[i] = false;
            box.children[i].isVisible = false; // the child boxes are not currently shown
        &#125;
    &#125;

    // The following three functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise&lt;void&gt; &#123;
        for( let i=0; i &lt; box.children.length; i++) &#123;
            if (panelOpen[i]) &#123;
                box.children[i].setFocus();
            &#125;
        &#125;
    &#125;
    const refresh = (why?: string): void =&gt; &#123;
        console.log("REFRESH ACCORDION")
        // do whatever needs to be done to refresh the elements that show information from the model
        untrack( () =&gt; initialize() );
    &#125;;
    const addPerson = () =&gt; &#123;
        // Note that you need to put any changes to the actual model in a 'AST.change or AST.changeNamed',
        // because all elements in the model are reactive using mobx.
        AST.change(() =&gt; &#123;
            let newPerson: Person = Person.create(&#123;&#125;);
            box.getPropertyValue().push(newPerson);
        &#125;);
    &#125;

    const removePerson = (index: number) =&gt; &#123;
        // Note that you need to put any changes to the actual model in a 'AST.change' or
        // 'AST.changeNamed', because all elements in the AST model are reactive using mobx.
        AST.change(() =&gt; &#123;
            box.getPropertyValue().splice(index, 1);
        &#125;);
    &#125;
    // Run the initialization
    initialize();

    $effect(() =&gt; &#123;
        // $inspect.trace(\`accordion for $effect $&#123;box.children.length&#125; id $&#123;box.id&#125;\`)
        // console.log(\`========== $effect $&#123;box.children.length&#125; id $&#123;box.id&#125;\` )
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
        // Needed to get an effect
        ch = [...box.children]
        // untrack becauise initialize causes a too many  effects error
        untrack( () =&gt; &#123;
            initialize()
        &#125;)        
    &#125;);

    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-100 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
&lt;/script&gt;

&lt;div style="display: flex; align-items: flex-end;"&gt;
    &lt;Accordion multiple=&#123;multiplePar&#125;&gt;
        &#123;#each ch as childBox, index&#125;
            &lt;AccordionItem bind:open=&#123;panelOpen[index]&#125;&gt;
                &#123;#snippet header()&#125;
                    &#123;childBox.node.freLanguageConcept()&#125; &#123;childBox.node.freId()&#125;
                &#123;/snippet&#125;

                    &lt;div style="display: flex; align-items: flex-end;"&gt;
                        &lt;RenderComponent box=&#123;childBox&#125; editor=&#123;editor&#125; /&gt;
&lt;!--                        &lt;IconButton class="material-icons" onclick=&#123;() =&gt; removePerson(index)&#125;&gt;remove&lt;/IconButton&gt;--&gt;
                        &lt;Button tabindex=&#123;-1&#125; id="add-button" class="&#123;buttonCls&#125; &#123;colorCls&#125; " name="removePerson" onclick=&#123;() =&gt; removePerson(index)&#125;&gt;
                            &lt;UserRemoveOutline class="&#123;iconCls&#125;" /&gt;
                        &lt;/Button&gt;
                    &lt;/div&gt;
            &lt;/AccordionItem&gt;
        &#123;/each&#125;
    &lt;/Accordion&gt;

&lt;!--    &lt;IconButton class="material-icons" onclick=&#123;() =&gt; addPerson()&#125;&gt;add&lt;/IconButton&gt;--&gt;
    &lt;Button tabindex=&#123;-1&#125; id="add-button" class="&#123;buttonCls&#125; &#123;colorCls&#125; " name="addPerson" onclick=&#123;() =&gt; addPerson()&#125;&gt;
        &lt;UserAddOutline class="&#123;iconCls&#125;" /&gt;
    &lt;/Button&gt;
&lt;/div&gt;
</code></pre> <!> <p>Replace the <code>teachers</code> property with the <code>StaffAccordion</code> component and pass the string parameter <code>multi="multiple"</code> to allow multiple panels to be open:</p> <pre class="language-freon"><code class="language-freon">// CourseSchedule/phase4/defs/externals.edit#L14-L18

Staff &#123;[
Staff in the category: $&#123;self.name&#125;

    $&#123;self.teachers replace=StaffAccordion multi="multiple"&#125;
]&#125;</code></pre> <!> <p>Add <code>StaffAccordion</code> to the global section and register it as a custom component.</p> <pre class="language-freon"><code class="language-freon">// CourseSchedule/phase4/defs/main.edit#L3-L9

global &#123;
    external &#123;
        PersonIcon,
        PhoneButton,
        StaffAccordion
    &#125;
&#125;</code></pre> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase4/src/external/externals.ts#L9-L15

export function configureExternals() &#123;
    setCustomComponents([
        &#123; component: PersonIcon, knownAs: "PersonIcon" &#125;,
        &#123; component: PhoneButton, knownAs: "PhoneButton" &#125;,
        &#123; component: StaffAccordion, knownAs: "StaffAccordion" &#125;,
    ]);
&#125;</code></pre> <!> <p>After these steps, your editor displays the staff list in an <strong>accordion</strong>:</p> <ul><li><strong>All panels closed:</strong></li></ul> <!> <ul><li><strong>A panel open:</strong></li></ul> <!> <h3 id="conclusion-4">Conclusion</h3> <p>That’s it! You’ve replaced the <code>teachers</code> list with a Svelte accordion.<br/> Next, you’ll learn how to reorder AST nodes and display them in a different order.</p> <!>`,1);function je(B,e){ge(e,!0);const l=he({});Ie(()=>{document.querySelectorAll("pre").forEach(i=>{const r=document.createElement("div");r.className="copy-prompt";const w=document.createElement("p");w.innerHTML="👆 Click to copy",w.className="copy-prompt-p";const O=document.createElement("img");O.src="/icons/copy-icon.svg",O.className="copy-prompt-img",r.appendChild(O),r.appendChild(w),i.appendChild(r),i.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{i.querySelector("code")?.textContent!==null&&i.querySelector("code")?.textContent!==void 0&&Oe(i.querySelector("code").textContent),i.querySelector(".copy-prompt > p")?.innerHTML!==null&&i.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(i.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{i.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let P="/Examples/External_Components/A_Wrapper_with_a_Button",b="/Examples/External_Components/A_Sorted_Table";var E=Ne(),A=$(E);de(A,{prevLink:P,nextLink:b});var C=o(A,2);z(C,{tag:"h1",id:"replacing-a-part-list-1",onIntersectChange:t=>e.setVisible("replacing-a-part-list-1",t),get intersecting(){return l["replacing-a-part-list-1"]},set intersecting(t){l["replacing-a-part-list-1"]=t},children:(t,i)=>{N();var r=F("Replacing a Part List");s(t,r)},$$slots:{default:!0}});var L=o(C,4);z(L,{tag:"h2",id:"step-1-create-the-svelte-component-2",onIntersectChange:t=>e.setVisible("step-1-create-the-svelte-component-2",t),get intersecting(){return l["step-1-create-the-svelte-component-2"]},set intersecting(t){l["step-1-create-the-svelte-component-2"]=t},children:(t,i)=>{N();var r=F("Step 1: Create the Svelte Component");s(t,r)},$$slots:{default:!0}});var k=o(L,30);z(k,{tag:"h2",id:"step-2-include-in-the-projection-3",onIntersectChange:t=>e.setVisible("step-2-include-in-the-projection-3",t),get intersecting(){return l["step-2-include-in-the-projection-3"]},set intersecting(t){l["step-2-include-in-the-projection-3"]=t},children:(t,i)=>{N();var r=F("Step 2: Include in the Projection");s(t,r)},$$slots:{default:!0}});var M=o(k,6);z(M,{tag:"h2",id:"step-3-do-the-admin-4",onIntersectChange:t=>e.setVisible("step-3-do-the-admin-4",t),get intersecting(){return l["step-3-do-the-admin-4"]},set intersecting(t){l["step-3-do-the-admin-4"]=t},children:(t,i)=>{N();var r=F("Step 3: Do the Admin");s(t,r)},$$slots:{default:!0}});var V=o(M,8);z(V,{tag:"h2",id:"final-result-5",onIntersectChange:t=>e.setVisible("final-result-5",t),get intersecting(){return l["final-result-5"]},set intersecting(t){l["final-result-5"]=t},children:(t,i)=>{N();var r=F("Final Result");s(t,r)},$$slots:{default:!0}});var q=o(V,6);pe(q,{imageName:"examples/CourseSchedule/Screenshot-step4a.png",caption:"Staff model unit with Accordion",figureNumber:1});var x=o(q,4);pe(x,{imageName:"examples/CourseSchedule/Screenshot-step4b.png",caption:"Accordion with open panel",figureNumber:2});var W=o(x,6);de(W,{prevLink:P,nextLink:b}),s(B,E),me()}var ze=f('<meta property="article:published_time"/>'),Ee=f('<meta property="article:modified_time"/>'),Me=f('<meta property="article:tag"/>'),Ve=f('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),qe=(B,e)=>{ue(e,!n(e))},He=f('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),$e=f('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),We=f('<li class="page-toc-text"><a> </a></li>'),De=f('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ue=f('<li class="page-toc-text"><a> </a></li>'),Xe=f('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function it(B,e){ge(e,!0);let l=se(!1);const P=he([{id:"replacing-a-part-list-1",title:"Replacing a Part List",visible:!1,ref:"#replacing-a-part-list-1"},{id:"step-1-create-the-svelte-component-2",title:"Step 1: Create the Svelte Component",visible:!1,ref:"#step-1-create-the-svelte-component-2"},{id:"step-2-include-in-the-projection-3",title:"Step 2: Include in the Projection",visible:!1,ref:"#step-2-include-in-the-projection-3"},{id:"step-3-do-the-admin-4",title:"Step 3: Do the Admin",visible:!1,ref:"#step-3-do-the-admin-4"},{id:"final-result-5",title:"Final Result",visible:!1,ref:"#final-result-5"}]);let b=se(0);function E(a,c){const m=P.find(p=>p.id===a);m&&(m.visible=c);const g=P.findIndex(p=>p.visible);g>=0&&ue(b,g,!0)}const A=U(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),C=U(()=>e.data.page.description??e.data.category.description),L="https://freon4dsl.dev/images/freon-banner.png";let k=U(()=>{const a=Te.url.pathname;return`https://freon4dsl.dev${a==="/"?"/":a.replace(/\/$/,"")}`});const M=e.data.site?.tags??[],V=e.data.category?.tags??[],q=e.data.page.tags??[],x=[...new Set([...M,...V,...q].filter(Boolean))],W={"@context":"https://schema.org","@type":"WebPage",headline:n(A),description:n(C),url:n(k),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:x.length?x.join(", "):void 0,image:L,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var t=Xe();ke(a=>{var c=Ve(),m=$(c),g=o(m,4),p=o(g,2);{var T=h=>{var _=ze();I(()=>d(_,"content",e.data.page.publishedTime)),s(h,_)};j(p,h=>{e.data.page.publishedTime&&h(T)})}var y=o(p,2);{var S=h=>{var _=Ee();I(()=>d(_,"content",e.data.page.modifiedTime)),s(h,_)};j(y,h=>{e.data.page.modifiedTime&&h(S)})}var R=o(y,2);{var D=h=>{var _=Ae(),Se=$(_);X(Se,17,()=>x,Be,(_e,Pe)=>{var re=Me();I(()=>d(re,"content",n(Pe))),s(_e,re)}),s(h,_)};j(R,h=>{x&&h(D)})}var H=o(R,2),K=o(H,4),Q=o(K,2),ee=o(Q,2),te=o(ee,2);d(te,"content",L);var oe=o(te,2),ne=o(oe,4),ae=o(ne,2),ie=o(ae,2);d(ie,"content",L);var ye=o(ie,2);Le(ye,()=>`<script type="application/ld+json">${JSON.stringify(W)}<\/script>`),I(h=>{Ce.title=n(A)??"",d(m,"content",n(C)),d(g,"href",n(k)),d(H,"content",h),d(K,"content",n(A)),d(Q,"content",n(C)),d(ee,"content",e.data.site.title),d(oe,"content",n(k)),d(ne,"content",n(A)),d(ae,"content",n(C))},[()=>x.join(", ")]),s(a,c)});var i=$(t),r=v(i),w=o(v(r),2);w.__click=[qe,l];var O=v(w);{var fe=a=>{var c=He();s(a,c)},ve=a=>{var c=$e();s(a,c)};j(O,a=>{n(l)?a(fe):a(ve,!1)})}u(w),u(r);var Z=o(r,2);{var be=a=>{var c=De(),m=v(c);X(m,22,()=>P,g=>g,(g,p,T)=>{var y=We(),S=v(y);let R;var D=v(S,!0);u(S),u(y),I(H=>{d(S,"href",p.ref),R=ce(S,1,"",null,R,H),le(D,p.title)},[()=>({"page-visible":n(T)===n(b),"page-nonvisible":n(T)!==n(b)})]),s(g,y)}),u(m),u(c),s(a,c)};j(Z,a=>{n(l)&&a(be)})}var G=o(Z,2);Re(G,{});var xe=o(G,2);je(xe,{setVisible:E}),u(i);var J=o(i,2),Y=o(v(J),2);X(Y,22,()=>P,a=>a,(a,c,m)=>{var g=Ue(),p=v(g);let T;var y=v(p,!0);u(p),u(g),I(S=>{d(p,"href",c.ref),T=ce(p,1,"",null,T,S),le(y,c.title)},[()=>({"page-visible":n(m)===n(b),"page-nonvisible":n(m)!==n(b)})]),s(a,g)}),u(Y),u(J),s(B,t),me()}we(["click"]);export{it as component,at as universal};
//# sourceMappingURL=78.DxVRi4CT.js.map
