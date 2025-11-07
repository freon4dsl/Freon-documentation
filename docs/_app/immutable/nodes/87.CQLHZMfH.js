import{f,a as l,t as q,e as Me}from"../chunks/nks1QWJh.js";import{y as me,G as pe,x as B,z as ge,u as t,A as z,g as a,I as re,B as G,a as E,$ as Te,v,s as ue,w as h}from"../chunks/bZIXIZs8.js";import{d as Le,i as U,s as le}from"../chunks/DANOUgWt.js";import{e as R,p as Se,i as ke,s as se}from"../chunks/CKHUE_gp.js";import{h as Ce}from"../chunks/DCXhKCCG.js";import{h as De}from"../chunks/aX-frc9G.js";import{s as r}from"../chunks/BpSVRMQn.js";import{o as Ee}from"../chunks/D62n5Z03.js";import{P as de,S as V,c as Ne,B as Ue}from"../chunks/CFDUsp8k.js";import{F as ce}from"../chunks/Bq9rkPJ0.js";const We=async({parent:k})=>{const{site:e,category:g}=await k();return{site:e,category:g,page:{title:"Including Model Information",description:"Connect your Freon-based web app to the server to open/create models, list available models, and populate the Model Drawer. Uses WebappConfigurator, InMemoryModel, and Flowbite dialogs to mirror the standard Freon web app behavior.",tags:["Freon","Svelte","Integration","server","InMemoryModel","WebappConfigurator","Model Drawer","Flowbite","SvelteKit","undo","projections","BoxFactory","samples-education"],modifiedTime:"2025-11-07T17:20:18.645Z",publishedTime:"2025-11-07T17:20:18.645Z"}}},nt=Object.freeze(Object.defineProperty({__proto__:null,load:We},Symbol.toStringTag,{value:"Module"}));var Oe=f(`<!> <!> <p>Now we have dealt with information from the DSL, we are ready to take
on the next challenge, to get information from the server.
Of course, the server needs to be running, so do not forget to execute
the following command in the folder <code>/packages/dsl</code>.</p> <pre class="language-bash"><code class="language-bash">npm run server</code></pre> <!> <p>To make things a bit more interesting we have implemented two ways to open a model.
First, you can add the name of the model to the url in the address bar of your browser.
Second, you can choose a model from the list of models available on the server. For this
option we need to open a dialog.
(Again, we are mimicking what the standard web app is capable of.)</p> <p>Below is the code that implements this. Note that we have moved all code to actually
open the model, and to get the names of the available models, to the before mentioned class <code>WebappConfigurator</code>.</p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/lib/main-app/WebappLayout.svelte#L24-L42

nMount(async () =&gt; &#123;
// If a model is given as parameter, open this model
// A new model is created when this model does not exist
const urlParams = new URLSearchParams(window.location.search);
const model = urlParams.get('model');
if (model !== null) &#123;
	openModel(model);
&#125; else &#123;
	// No model given as parameter, open the dialog to ask for it
	// Get list of models from server
	const names = await WebappConfigurator.getInstance().getAllModelNames();
	if (!!names &amp;&amp; names.length &gt; 0) &#123;
		// Make the names available for the dialog
		serverInfo.allModelNames = names;
	&#125;

	// open the app with the open/new model dialog
	dialogs.openModelDialogVisible = true;
&#125;</code></pre> <p>So, let’s have a look at the <code>WebappConfigurator</code>. We first examine the <code>openModel</code> function. As you see,
the InMemoryModel class (here placed in the variable <code>modelStore</code>) from the <code>@freon4dsl/core</code> package
is doing the actual work. Here we take the model unit identifiers (a list of name-id pairs), find the first
unit in the list, and show it in the editor.</p> <p>Two things need to be done for this to function properly.</p> <ul><li>We need to clear all box caches, because they are no longer valid (done by <code>BoxFactory.clearCaches()</code>).</li> <li>The projections also need to be cleared (done by <code>this.editorEnvironment?.projectionHandler.clear()</code>).</li></ul> <p>Then we are all set to show the model in the editor, which will be explained
in <a href="/Examples/Website_Integration/Adding_the_Editor">Adding the Editor</a>.
Finally, we store information on the units in <code>updateUnitList()</code>.</p> <p>More on Freon’s Box Model can be found in <a href="/Documentation/Under_the_Hood/Editor_Framework">Editor Framework</a></p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/lib/language/WebappConfigurator.ts#L99-L122

async openModel(modelName: string) &#123;
    if (!!this.modelStore) &#123;
        // create new model instance in memory and set its name
        await this.modelStore.openModel(modelName);
        const unitIdentifiers = this.modelStore.getUnitIdentifiers();
        LOGGER.log('unit identifiers: ' + JSON.stringify(unitIdentifiers));
        if (!!unitIdentifiers &amp;&amp; unitIdentifiers.length &gt; 0) &#123;
            // load the first unit and show it
            let first: boolean = true;
            for (const unitIdentifier of unitIdentifiers) &#123;
                if (first) &#123;
                    const unit = this.modelStore.getUnitByName(unitIdentifier.name);
                    LOGGER.log("UnitId " + unitIdentifier.name + " unit is " + unit?.name);
                    this.currentUnit = unit;
                    BoxFactory.clearCaches()
                    this.editorEnvironment?.projectionHandler.clear()
                    this.showUnit(this.currentUnit);
                    first = false;
                &#125;
            &#125;
        &#125;
        this.updateUnitList()
    &#125;
&#125;</code></pre> <p>Upon submit, the Svelte dialog component also uses the <code>WebappConfigurator.openModel</code> and <code>WebappConfigurator.newModel</code> functions to actually open or create the model. The if-statements
in the code check whether the user has entered a valid model name.</p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/lib/dialogs/OpenModelDialog.svelte#L47-L57

async function handleSubmit() &#123;
	const comm = WebappConfigurator.getInstance();
	// console.log('Handle "submit": ' + newName)
	if (internalSelected?.length &gt; 0) &#123; // should be checked first, because newName depends on it
		await comm.openModel(internalSelected);
		// $initializing = false;
	&#125; else if (!newNameInvalid() &amp;&amp; newName.length &gt; 0) &#123;
		console.log("CREATING NEW MODEL: " + newName);
		await comm.newModel(newName);
		// $initializing = false;
	&#125; else &#123;</code></pre> <p>The result of our work is that upon opening the web page (without the model parameter in the address bar),
the open model dialog pops up.</p> <!> <!> <p>As promised, we are going to show you how to add information to the Model Drawer. Here we are going to
focus on the inner list. All units in the model should be sorted based on their type, and every one of
them should have a dropdown menu associated that enables opening, saving etc. of that specific model unit.</p> <p>As you can see, we loop over a list called <code>myUnits</code>, and check whether the list item has the same
type as <code>unitType</code>. This sorts out the units based on their type. Then we show the unit’s name, and add
a dropdown menu where every function takes the index in <code>myUnits</code> as parameter.</p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/lib/main-app/ModelInfo.svelte#L66-L90

&lt;Listgroup&gt;
    &#123;#each langInfo.unitTypes as unitType&#125;
        &lt;Heading tag="h5" class="pl-2"&gt;&#123;unitType&#125;&lt;/Heading&gt;
        &lt;ListgroupItem class="gap-2 text-base font-semibold"&gt;
            &lt;Listgroup&gt;
                &#123;#each myUnits as unit, index&#125;
                    &#123;#if unit.freLanguageConcept() === unitType&#125;
                        &lt;div class="flex justify-between"&gt;
                            &#123;unit.name&#125;
                            &lt;DotsHorizontalOutline class="dots-menu1 inline dark:text-white"/&gt;
                        &lt;/div&gt;
                        &lt;Dropdown triggeredBy=".dots-menu1"&gt;
                            &lt;DropdownItem onclick=&#123;() =&gt; (openUnit(index))&#125;&gt;Open&lt;/DropdownItem&gt;
                            &lt;DropdownItem onclick=&#123;() =&gt; (saveUnit(index))&#125;&gt;Save&lt;/DropdownItem&gt;
                            &lt;DropdownItem onclick=&#123;() =&gt; (renameUnit(index))&#125;&gt;Rename&lt;/DropdownItem&gt;
                            &lt;DropdownItem onclick=&#123;() =&gt; (deleteUnit(index))&#125;&gt;Delete&lt;/DropdownItem&gt;
                            &lt;DropdownItem slot="footer" onclick=&#123;() =&gt; (exportUnit(index))&#125;&gt;Export&lt;/DropdownItem&gt;
                        &lt;/Dropdown&gt;
                    &#123;/if&#125;
                &#123;/each&#125;
            &lt;/Listgroup&gt;
        &lt;/ListgroupItem&gt;
    &#123;/each&#125;
    &lt;!-- Instead of DotsHorizontalOutline we could use ChevronDownOutline--&gt;
&lt;/Listgroup&gt;</code></pre> <p>To keep <code>myUnits</code> in sync with the current model, we use a Svelte effect. Here we use a state variable,
called <code>modelInfo</code>, that was set by the <code>WebappConfigurator.updateUnitList()</code>.</p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/lib/main-app/ModelInfo.svelte#L16-L28

$effect(() =&gt; &#123;
    myUnits = !!modelInfo.units &amp;&amp; modelInfo.units.length &gt; 0
        ? modelInfo.units.sort((u1: FreModelUnit, u2: FreModelUnit) =&gt; &#123;
            if (u1.name &gt; u2.name) &#123;
                return 1;
            &#125;
            if (u1.name &lt; u2.name) &#123;
                return -1;
            &#125;
            return 0;
        &#125;)
        : [];
&#125;);</code></pre> <p>When we open the model information drawer, we can see the result of all our work.</p> <!> <!>`,1);function Fe(k,e){me(e,!0);const g=pe({});Ee(()=>{document.querySelectorAll("pre").forEach(s=>{const c=document.createElement("div");c.className="copy-prompt";const T=document.createElement("p");T.innerHTML="👆 Click to copy",T.className="copy-prompt-p";const L=document.createElement("img");L.src="/icons/copy-icon.svg",L.className="copy-prompt-img",c.appendChild(L),c.appendChild(T),s.appendChild(c),s.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{s.querySelector("code")?.textContent!==null&&s.querySelector("code")?.textContent!==void 0&&Ne(s.querySelector("code").textContent),s.querySelector(".copy-prompt > p")?.innerHTML!==null&&s.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(s.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{s.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let I="/Examples/Website_Integration/Getting_Language_Information",w="/Examples/Website_Integration/Adding_the_Editor";var W=Oe(),x=B(W);de(x,{prevLink:I,nextLink:w});var M=t(x,2);V(M,{tag:"h1",id:"including-model-information-1",onIntersectChange:o=>e.setVisible("including-model-information-1",o),get intersecting(){return g["including-model-information-1"]},set intersecting(o){g["including-model-information-1"]=o},children:(o,s)=>{z();var c=q("Including Model Information");l(o,c)},$$slots:{default:!0}});var C=t(M,6);V(C,{tag:"h2",id:"opening-a-model-2",onIntersectChange:o=>e.setVisible("opening-a-model-2",o),get intersecting(){return g["opening-a-model-2"]},set intersecting(o){g["opening-a-model-2"]=o},children:(o,s)=>{z();var c=q("Opening a Model");l(o,c)},$$slots:{default:!0}});var D=t(C,26);ce(D,{imageName:"examples/WebsiteIntegration/info-from-server.png",caption:"The open model dialog",figureNumber:1});var O=t(D,2);V(O,{tag:"h2",id:"model-drawer-content-3",onIntersectChange:o=>e.setVisible("model-drawer-content-3",o),get intersecting(){return g["model-drawer-content-3"]},set intersecting(o){g["model-drawer-content-3"]=o},children:(o,s)=>{z();var c=q("Model Drawer Content");l(o,c)},$$slots:{default:!0}});var F=t(O,14);ce(F,{imageName:"examples/WebsiteIntegration/model-drawer.png",caption:"Open drawer showing the model information",figureNumber:2});var P=t(F,2);de(P,{prevLink:I,nextLink:w}),l(k,W),ge()}var He=f('<meta property="article:published_time"/>'),Be=f('<meta property="article:modified_time"/>'),Pe=f('<meta property="article:tag"/>'),Ae=f('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),je=(k,e)=>{ue(e,!a(e))},qe=f('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),ze=f('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ge=f('<li class="page-toc-text"><a> </a></li>'),Re=f('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ve=f('<li class="page-toc-text"><a> </a></li>'),Je=f('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function it(k,e){me(e,!0);let g=re(!1);const I=pe([{id:"including-model-information-1",title:"Including Model Information",visible:!1,ref:"#including-model-information-1"},{id:"opening-a-model-2",title:"Opening a Model",visible:!1,ref:"#opening-a-model-2"},{id:"model-drawer-content-3",title:"Model Drawer Content",visible:!1,ref:"#model-drawer-content-3"}]);let w=re(0);function W(n,i){const u=I.find(d=>d.id===n);u&&(u.visible=i);const m=I.findIndex(d=>d.visible);m>=0&&ue(w,m,!0)}const x=G(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),M=G(()=>e.data.page.description??e.data.category.description),C="https://freon4dsl.dev/images/freon-banner.png";let D=G(()=>{const n=Se.url.pathname;return`https://freon4dsl.dev${n==="/"?"/":n.replace(/\/$/,"")}`});const O=e.data.site?.tags??[],F=e.data.category?.tags??[],P=e.data.page.tags??[],o=[...new Set([...O,...F,...P].filter(Boolean))],s={"@context":"https://schema.org","@type":"WebPage",headline:a(x),description:a(M),url:a(D),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:o.length?o.join(", "):void 0,image:C,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var c=Je();De(n=>{var i=Ae(),u=B(i),m=t(u,4),d=t(m,2);{var S=p=>{var _=He();E(()=>r(_,"content",e.data.page.publishedTime)),l(p,_)};U(d,p=>{e.data.page.publishedTime&&p(S)})}var b=t(d,2);{var y=p=>{var _=Be();E(()=>r(_,"content",e.data.page.modifiedTime)),l(p,_)};U(b,p=>{e.data.page.modifiedTime&&p(y)})}var N=t(b,2);{var j=p=>{var _=Me(),_e=B(_);R(_e,17,()=>o,ke,(Ie,xe)=>{var ie=Pe();E(()=>r(ie,"content",a(xe))),l(Ie,ie)}),l(p,_)};U(N,p=>{o&&p(j)})}var H=t(N,2),X=t(H,4),Y=t(X,2),$=t(Y,2),ee=t($,2);r(ee,"content",C);var te=t(ee,2),oe=t(te,4),ae=t(oe,2),ne=t(ae,2);r(ne,"content",C);var ye=t(ne,2);Ce(ye,()=>`<script type="application/ld+json">${JSON.stringify(s)}<\/script>`),E(p=>{Te.title=a(x)??"",r(u,"content",a(M)),r(m,"href",a(D)),r(H,"content",p),r(X,"content",a(x)),r(Y,"content",a(M)),r($,"content",e.data.site.title),r(te,"content",a(D)),r(oe,"content",a(x)),r(ae,"content",a(M))},[()=>o.join(", ")]),l(n,i)});var T=B(c),L=v(T),A=t(v(L),2);A.__click=[je,g];var he=v(A);{var fe=n=>{var i=qe();l(n,i)},ve=n=>{var i=ze();l(n,i)};U(he,n=>{a(g)?n(fe):n(ve,!1)})}h(A),h(L);var J=t(L,2);{var we=n=>{var i=Re(),u=v(i);R(u,22,()=>I,m=>m,(m,d,S)=>{var b=Ge(),y=v(b);let N;var j=v(y,!0);h(y),h(b),E(H=>{r(y,"href",d.ref),N=se(y,1,"",null,N,H),le(j,d.title)},[()=>({"page-visible":a(S)===a(w),"page-nonvisible":a(S)!==a(w)})]),l(m,b)}),h(u),h(i),l(n,i)};U(J,n=>{a(g)&&n(we)})}var Z=t(J,2);Ue(Z,{});var be=t(Z,2);Fe(be,{setVisible:W}),h(T);var K=t(T,2),Q=t(v(K),2);R(Q,22,()=>I,n=>n,(n,i,u)=>{var m=Ve(),d=v(m);let S;var b=v(d,!0);h(d),h(m),E(y=>{r(d,"href",i.ref),S=se(d,1,"",null,S,y),le(b,i.title)},[()=>({"page-visible":a(u)===a(w),"page-nonvisible":a(u)!==a(w)})]),l(n,m)}),h(Q),h(K),l(k,c),ge()}Le(["click"]);export{it as component,nt as universal};
//# sourceMappingURL=87.CQLHZMfH.js.map
