import{f as v,a as l,t as P,e as Ee}from"../chunks/nks1QWJh.js";import{y as ge,G as de,x as H,z as me,u as a,A as q,g as n,I as re,B as D,a as j,$ as xe,v as f,s as pe,w as h}from"../chunks/bZIXIZs8.js";import{d as Le,i as F,s as se}from"../chunks/DANOUgWt.js";import{e as J,p as Se,i as Ce,s as le}from"../chunks/CKHUE_gp.js";import{h as Te}from"../chunks/DCXhKCCG.js";import{h as Me}from"../chunks/aX-frc9G.js";import{s}from"../chunks/BpSVRMQn.js";import{o as Ne}from"../chunks/D62n5Z03.js";import{P as ce,S as U,c as je,B as ke}from"../chunks/CFDUsp8k.js";const Fe=async({parent:C})=>{const{site:e,category:c}=await C();return{site:e,category:c,page:{title:"Getting Language Information",description:"Learn how to access and display language-level information in a custom Freon-based web app. Initialize and use langInfo for projections, unit types, and the language name within your Svelte components.",tags:["Freon","Svelte","Integration","core","core-svelte","LanguageEnvironment","langInfo","ProjectionHandler","WebappConfigurator","InMemoryModel","Flowbite","ViewMenu","ModelInfo","NavBar"],modifiedTime:"2025-11-07T17:20:18.645Z",publishedTime:"2025-11-07T17:20:18.645Z"}}},at=Object.freeze(Object.defineProperty({__proto__:null,load:Fe},Symbol.toStringTag,{value:"Module"}));var ze=v(`<!> <!> <p>There are a couple of places where we would like to use information, not about the models, but about the language for which the editor was created.
We need the names of the available projections for use in the view menu, and we will use the names of the model unit types in the drawer that
shows the available units in the model. Just for fun, we would like to show the name of the language in the navbar.</p> <p>Because the last is fairly simple, we start by making the change in the navbar.</p> <!> <p>To include information from the DSL we use a Svelte state variable called <code>langInfo</code>.</p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/lib/stores/LanguageInfo.svelte.ts

export interface LanguageInfo &#123;
  // name of the language
  name: string;
  // names of all model unit types
  unitTypes: string[];
  // all known file extensions
  fileExtensions: string[];
  // all possible projections
  projectionNames: string[];
&#125;

export const langInfo: LanguageInfo = $state(&#123;
  name: "FreLanguage ...",
  unitTypes: [] as string[],
  fileExtensions: [] as string[],
  projectionNames: [] as string[],
&#125;);
</code></pre> <p>We use this state variable in the NavBar on line 26:</p> <pre class="language-html"><code class="language-html">// IntegrationExample/webapp/src/lib/main-app/NavBar.svelte#L24-L27

&lt;NavBrand href="/"&gt;
	&lt;img src="./freonlogo.svg" class="me-3 h-6 sm:h-9" alt="Freon Logo" /&gt;
	&lt;span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"&gt;Freon for &#123;langInfo.name&#125;&lt;/span&gt;
&lt;/NavBrand&gt;</code></pre> <p>We would like to say: “that’s it”, but so far there is no information present in the state variable.</p> <!> <p>Before the start of the web app we need to initialize the <code>langInfo</code> state variable. We have chosen to do this
in a Svelte hook (see <a href="https://svelte.dev/docs/kit/hooks" target="_blank">SvelteKit Hooks</a>), because it needs to be done only once. We
use the <code>configureExternals</code> and <code>configureLoggers</code> functions from the DSL, as well as the <code>LanguageEnvironment</code>.</p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/hooks.client.ts

/*
 * This files contains all initialization that needs to be done ONCE at the startup of the Freon application
 */
import &#123;
  configureExternals,
  configureLoggers,
  LanguageEnvironment,
&#125; from "@freon4dsl/samples-education";
import &#123; WebappConfigurator &#125; from "$lib/language/WebappConfigurator.js";
import &#123; ServerCommunication &#125; from "@freon4dsl/core";

WebappConfigurator.getInstance().setEnvironment(
  LanguageEnvironment.getInstance(),
  ServerCommunication.getInstance(),
);
configureExternals();
configureLoggers();
</code></pre> <p>As you can see we have created a file called <code>WebappConfigurator</code> to contain all code that deals with
the DSL and with the <code>@freon4dsl/core</code> package. Because we use the server that Freon provides (also as a convenience),
we can use an instance of <code>ServerCommunication</code> from <code>@freon4dsl/core</code>. In a production environment this
needs to be replaced with your own server implementation. Note that any server must implement
the <code>IServerCommunication</code> interface.</p> <p>The <code>setEnvironment</code> function remembers the object that will perform the communication with the server, and
the language environment, for further use. For the core package to function properly, you also need to
create an instance of the class <code>InMemoryModel</code>, which also takes the language environment and the server
implementation as parameters. The <code>InMemoryModel</code> handles creation, saving, etc. of models and model units.</p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/lib/language/WebappConfigurator.ts#L45-L54

setEnvironment(
    editorEnvironment: FreEnvironment,
    serverCommunication: IServerCommunication,
): void &#123;
    // LOGGER.log('setEnvironment')
    this.editorEnvironment = editorEnvironment;
    this.serverCommunication = serverCommunication;
    WebappConfigurator.initialize(editorEnvironment);
    this.modelStore = new InMemoryModel(editorEnvironment, serverCommunication);
&#125;</code></pre> <p>Finally, the <code>initialize</code> function fills the Svelte state variable <code>langInfo</code> with the values that we need.
Note that the <code>LanguageEnvironment</code> initializes the <code>FreLanguage</code> class from the core package. A call to <code>LanguageEnvironment.getInstance()</code> must therefore precede a call to <code>FreLanguage.getInstance()</code>. Both classes
follow the Singleton pattern and are initialized through <code>getInstance</code>.</p> <p>Commented out, because we do not yet have an element in our web app to show error messages, is the way to
handle messages from the Freon editor. Assign a function to the editor’s <code>setUserMessage</code> property, which handles
the messages. Its signature is <code>setUserMessage(message: string, severity?: FreErrorSeverity): void</code>.</p> <p>Note also that you need to start the <code>FreUndoManager</code> for undo/redo handling to function.</p> <pre class="language-ts"><code class="language-ts">// IntegrationExample/webapp/src/lib/language/WebappConfigurator.ts#L60-L92

static initialize(editorEnvironment: FreEnvironment): void &#123;
    let langEnv: FreEnvironment = editorEnvironment;
    // the language name
    langInfo.name = langEnv.languageName;

    // the names of the unit types
    langInfo.unitTypes = FreLanguage.getInstance().getUnitNames();

    // the names of the projections / views
    const proj: FreProjectionHandler = langEnv.editor.projection;
    let nameList: string[] = !!proj ? proj.projectionNames() : ["default"];
    // remove any old values
    langInfo.projectionNames.splice(0, langInfo.projectionNames.length);
    // push the right ones
    langInfo.projectionNames.push(...nameList);
    replaceProjectionsShown(nameList);

    // the file extensions for all unit types
    // because 'langEnv.fileExtensions.values()' is not an Array but an IterableIterator,
    // we transfer the value to a tmp array.
    const tmp: string[] = [];
    for (const val of langEnv.fileExtensions.values()) &#123;
        tmp.push(val);
    &#125;
    langInfo.fileExtensions = tmp;

    // let the editor know how to set the user message,
    // we do this by assigning our own method to the editor's method
    // langEnv.editor.setUserMessage = setUserMessage;

    // start the undo manager
    FreUndoManager.getInstance();
&#125;</code></pre> <!> <p>In this example web app, as in the standard Freon web app, we show the information about
the current model in a drawer panel.
For the names of the model unit types in this drawer we use the same approach as above. From the <code>langInfo</code> state variable we take the <code>unitTypes</code>, and loop over them. The inner list is where
the model information</p> <!>`,1);function Be(C,e){ge(e,!0);const c=de({});Ne(()=>{document.querySelectorAll("pre").forEach(i=>{const g=document.createElement("div");g.className="copy-prompt";const N=document.createElement("p");N.innerHTML="👆 Click to copy",N.className="copy-prompt-p";const L=document.createElement("img");L.src="/icons/copy-icon.svg",L.className="copy-prompt-img",g.appendChild(L),g.appendChild(N),i.appendChild(g),i.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{i.querySelector("code")?.textContent!==null&&i.querySelector("code")?.textContent!==void 0&&je(i.querySelector("code").textContent),i.querySelector(".copy-prompt > p")?.innerHTML!==null&&i.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(i.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{i.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let I="/Examples/Website_Integration",b="/Examples/Website_Integration/Including_Model_Information";var z=ze(),E=H(z);ce(E,{prevLink:I,nextLink:b});var x=a(E,2);U(x,{tag:"h1",id:"getting-language-information-1",onIntersectChange:t=>e.setVisible("getting-language-information-1",t),get intersecting(){return c["getting-language-information-1"]},set intersecting(t){c["getting-language-information-1"]=t},children:(t,i)=>{q();var g=P("Getting Language Information");l(t,g)},$$slots:{default:!0}});var T=a(x,6);U(T,{tag:"h2",id:"language-name-in-the-navbar-2",onIntersectChange:t=>e.setVisible("language-name-in-the-navbar-2",t),get intersecting(){return c["language-name-in-the-navbar-2"]},set intersecting(t){c["language-name-in-the-navbar-2"]=t},children:(t,i)=>{q();var g=P("Language Name in the Navbar");l(t,g)},$$slots:{default:!0}});var M=a(T,12);U(M,{tag:"h2",id:"initialization-of-the-state-variable-3",onIntersectChange:t=>e.setVisible("initialization-of-the-state-variable-3",t),get intersecting(){return c["initialization-of-the-state-variable-3"]},set intersecting(t){c["initialization-of-the-state-variable-3"]=t},children:(t,i)=>{q();var g=P("Initialization of the State Variable");l(t,g)},$$slots:{default:!0}});var B=a(M,20);U(B,{tag:"h2",id:"unit-types-in-model-drawer-4",onIntersectChange:t=>e.setVisible("unit-types-in-model-drawer-4",t),get intersecting(){return c["unit-types-in-model-drawer-4"]},set intersecting(t){c["unit-types-in-model-drawer-4"]=t},children:(t,i)=>{q();var g=P("Unit Types in Model Drawer");l(t,g)},$$slots:{default:!0}});var O=a(B,4);ce(O,{prevLink:I,nextLink:b}),l(C,z),me()}var We=v('<meta property="article:published_time"/>'),Pe=v('<meta property="article:modified_time"/>'),qe=v('<meta property="article:tag"/>'),Ue=v('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),He=(C,e)=>{pe(e,!n(e))},Oe=v('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Ve=v('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ae=v('<li class="page-toc-text"><a> </a></li>'),Ge=v('<div class="toc-details"><ul class="page-ul"></ul></div>'),De=v('<li class="page-toc-text"><a> </a></li>'),Je=v('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function nt(C,e){ge(e,!0);let c=re(!1);const I=de([{id:"getting-language-information-1",title:"Getting Language Information",visible:!1,ref:"#getting-language-information-1"},{id:"language-name-in-the-navbar-2",title:"Language Name in the Navbar",visible:!1,ref:"#language-name-in-the-navbar-2"},{id:"initialization-of-the-state-variable-3",title:"Initialization of the State Variable",visible:!1,ref:"#initialization-of-the-state-variable-3"},{id:"unit-types-in-model-drawer-4",title:"Unit Types in Model Drawer",visible:!1,ref:"#unit-types-in-model-drawer-4"}]);let b=re(0);function z(o,r){const u=I.find(d=>d.id===o);u&&(u.visible=r);const m=I.findIndex(d=>d.visible);m>=0&&pe(b,m,!0)}const E=D(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),x=D(()=>e.data.page.description??e.data.category.description),T="https://freon4dsl.dev/images/freon-banner.png";let M=D(()=>{const o=Se.url.pathname;return`https://freon4dsl.dev${o==="/"?"/":o.replace(/\/$/,"")}`});const B=e.data.site?.tags??[],O=e.data.category?.tags??[],t=e.data.page.tags??[],i=[...new Set([...B,...O,...t].filter(Boolean))],g={"@context":"https://schema.org","@type":"WebPage",headline:n(E),description:n(x),url:n(M),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:i.length?i.join(", "):void 0,image:T,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var N=Je();Me(o=>{var r=Ue(),u=H(r),m=a(u,4),d=a(m,2);{var S=p=>{var _=We();j(()=>s(_,"content",e.data.page.publishedTime)),l(p,_)};F(d,p=>{e.data.page.publishedTime&&p(S)})}var y=a(d,2);{var w=p=>{var _=Pe();j(()=>s(_,"content",e.data.page.modifiedTime)),l(p,_)};F(y,p=>{e.data.page.modifiedTime&&p(w)})}var k=a(y,2);{var G=p=>{var _=Ee(),we=H(_);J(we,17,()=>i,Ce,(_e,Ie)=>{var ie=qe();j(()=>s(ie,"content",n(Ie))),l(_e,ie)}),l(p,_)};F(k,p=>{i&&p(G)})}var W=a(k,2),X=a(W,4),Y=a(X,2),$=a(Y,2),ee=a($,2);s(ee,"content",T);var te=a(ee,2),ae=a(te,4),ne=a(ae,2),oe=a(ne,2);s(oe,"content",T);var ye=a(oe,2);Te(ye,()=>`<script type="application/ld+json">${JSON.stringify(g)}<\/script>`),j(p=>{xe.title=n(E)??"",s(u,"content",n(x)),s(m,"href",n(M)),s(W,"content",p),s(X,"content",n(E)),s(Y,"content",n(x)),s($,"content",e.data.site.title),s(te,"content",n(M)),s(ae,"content",n(E)),s(ne,"content",n(x))},[()=>i.join(", ")]),l(o,r)});var L=H(N),V=f(L),A=a(f(V),2);A.__click=[He,c];var ue=f(A);{var he=o=>{var r=Oe();l(o,r)},ve=o=>{var r=Ve();l(o,r)};F(ue,o=>{n(c)?o(he):o(ve,!1)})}h(A),h(V);var Z=a(V,2);{var fe=o=>{var r=Ge(),u=f(r);J(u,22,()=>I,m=>m,(m,d,S)=>{var y=Ae(),w=f(y);let k;var G=f(w,!0);h(w),h(y),j(W=>{s(w,"href",d.ref),k=le(w,1,"",null,k,W),se(G,d.title)},[()=>({"page-visible":n(S)===n(b),"page-nonvisible":n(S)!==n(b)})]),l(m,y)}),h(u),h(r),l(o,r)};F(Z,o=>{n(c)&&o(fe)})}var K=a(Z,2);ke(K,{});var be=a(K,2);Be(be,{setVisible:z}),h(L);var R=a(L,2),Q=a(f(R),2);J(Q,22,()=>I,o=>o,(o,r,u)=>{var m=De(),d=f(m);let S;var y=f(d,!0);h(d),h(m),j(w=>{s(d,"href",r.ref),S=le(d,1,"",null,S,w),se(y,r.title)},[()=>({"page-visible":n(u)===n(b),"page-nonvisible":n(u)!==n(b)})]),l(o,m)}),h(Q),h(R),l(C,N),me()}Le(["click"]);export{nt as component,at as universal};
//# sourceMappingURL=86.Bw8bdJAe.js.map
