import{f as u,a as s,t as z,e as Ce}from"../chunks/nks1QWJh.js";import{y as de,G as ge,x as N,z as he,u as o,A as O,g as r,I as ie,B as G,a as D,$ as ke,v as F,s as pe,w as f}from"../chunks/bZIXIZs8.js";import{d as Se,i as L,s as le}from"../chunks/DANOUgWt.js";import{e as R,p as Ae,i as Ee,s as se}from"../chunks/CKHUE_gp.js";import{h as Be}from"../chunks/DCXhKCCG.js";import{h as Te}from"../chunks/aX-frc9G.js";import{s as l}from"../chunks/BpSVRMQn.js";import{o as xe}from"../chunks/D62n5Z03.js";import{P as ce,S as j,c as De,B as Ie}from"../chunks/CFDUsp8k.js";const Le=async({parent:E})=>{const{site:e,category:c}=await E();return{site:e,category:c,page:{title:"Styling",description:"Learn how to style the Freon web app and editor using SCSS or CSS, including light and dark theme customization, Flowbite integration, and overriding Freon component styles.",tags:["styling","SCSS","CSS","themes","light mode","dark mode","editor styling","Flowbite","Material UI","Freon","DSL development"],modifiedTime:"2025-11-07T19:06:34.439Z",publishedTime:"2025-11-07T17:20:18.610Z"}}},ot=Object.freeze(Object.defineProperty({__proto__:null,load:Le},Symbol.toStringTag,{value:"Module"}));var Pe=u(`<!> <!> <p>The web app and/or the editor can be styled using either SCSS or CSS.</p> <!> <p>The provided <a href="/Documentation/Overview/Getting_Started#a-minimal-web-app-and-server-6">web app</a> is built using the <a href="https://flowbite-svelte.com/" target="_blank">Flowbite Svelte</a> UI library.
This library uses <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>. We have provided a CSS file that includes the required styling, which is called <code>webapp-styles.css</code>. It imports the base Tailwind styles, as well as styles for the core-svelte and the webapp libraries.
Any styles that you want to define should be imported last, in order for them to overwrite the default styles.
In the provided CSS file we have already included imports for two entries:</p> <ol><li>a file for any styling of external components</li> <li>a file for changing the theme of the webapp.</li></ol> <pre class="language-scss"><code class="language-scss">// Styling/webapp-styles.css

/* Import the standard tailwind styles */
@import 'tailwindcss';

/* Import all styles from core-svelte */
@import '../../../node_modules/@freon4dsl/core-svelte/src/lib/styles/freon.css';
@import '../../../node_modules/@freon4dsl/core-svelte/src/lib/styles/freon-light.css';
@import '../../../node_modules/@freon4dsl/core-svelte/src/lib/styles/freon-tw-dark.css';
@import '../../../node_modules/@freon4dsl/core-svelte/src/lib/styles/freon-color-definitions.css';

/* Import all styles from the webapp library */
@import '../../../node_modules/@freon4dsl/weblib-flowbite/dist/styles/lib-styles.css';

/* Import local styles and overrides */
@import './theme-colors-override.css';
@import './externals-styles.css';
</code></pre> <p>Run the following command to make these files available. If you don’t modify any of the styles, a single
run is enough. However, if you do make changes, rerun this command.</p> <pre class="language-bash"><code class="language-bash">  npm run styles   # Needed to generate the runtime CSS files. A single run will suffice.</code></pre> <!> <p>To change the theme colors you need to edit the colors in the <code>theme-colors-override.css</code> file.
This file contains various sets of colors that are used in the webapp dark and light modes, and in the editor dark and light modes.</p> <pre class="language-scss"><code class="language-scss">// Styling/theme-colors-override.css

:root &#123;
    /* Colors for the Flowbite webapp Light mode  */
    --color-light-base-50:  #FFFCF2;
    --color-light-base-100: #FFF1CC;
    --color-light-base-150: #FFE8A3;
    --color-light-base-200: #FFDD7A;
    --color-light-base-250: #FFD24D;
    --color-light-base-300: #FFC61A;
    --color-light-base-350: #FFC61A;
    --color-light-base-400: #E6AF00;
    --color-light-base-500: #E6AF00;
    --color-light-base-600: #BF9200;
    --color-light-base-700: #997500;
    --color-light-base-800: #735900;
    --color-light-base-900: #4D3D00;

    /* Colors for the Flowbite webapp Light mode accent */
    --color-light-accent-50:  #EAF4FF;
    --color-light-accent-100: #CFE6FF;
    --color-light-accent-200: #B3D7FF;
    --color-light-accent-300: #99C8FF;
    --color-light-accent-400: #7AB6FF;
    --color-light-accent-500: #5AA3FF;
    --color-light-accent-600: #3F8CFF;
    --color-light-accent-700: #2F6FCE;
    --color-light-accent-800: #22539B;
    --color-light-accent-900: #173A6B;

    /* Colors for the Freon editor Light mode  */
    --color-light-freon-50:  #FFFCF2;
    --color-light-freon-100: #FFF1CC;
    --color-light-freon-150: #FFE8A3;
    --color-light-freon-200: #FFDD7A;
    --color-light-freon-250: #FFD24D;
    --color-light-freon-300: #FFC61A;
    --color-light-freon-350: #FFC61A;
    --color-light-freon-400: #E6AF00;
    --color-light-freon-500: #E6AF00;
    --color-light-freon-600: #BF9200;
    --color-light-freon-700: #997500;
    --color-light-freon-800: #735900;
    --color-light-freon-900: #4D3D00;
    --color-light-freon-error:    #FF4C4C;       /* unchanged */
    --color-light-freon-editable: #FFE8A3;       /* was orange-150 → yellow-150 */
    --color-light-freon-optional: #E6AF00;       /* was orange-400/500 → yellow-400/500 */
    --color-light-freon-border:   #22539B;       /* was green-800 → blue-800 */
    --color-light-freon-dropdown: #2F6FCE;       /* was green-700 → blue-700 */
    --color-light-freon-button:   #CFE6FF;       /* was green-100 → blue-100 */

    /* Colors for the Flowbite webapp Dark mode */
    --color-dark-base-50:  #FAFBFF;
    --color-dark-base-100: #EAF4FF;
    --color-dark-base-150: #CFE6FF;
    --color-dark-base-200: #BFE0FF;
    --color-dark-base-250: #B3D7FF;
    --color-dark-base-300: #99C8FF;
    --color-dark-base-350: #7AB6FF;
    --color-dark-base-400: #5AA3FF;
    --color-dark-base-500: #3F8CFF;
    --color-dark-base-600: #2F6FCE;
    --color-dark-base-700: #22539B;
    --color-dark-base-800: #173A6B;
    --color-dark-base-900: #0F2746;

    --color-dark-accent-50:  #FFF1CC;
    --color-dark-accent-100: #FFE8A3;
    --color-dark-accent-200: #FFDD7A;
    --color-dark-accent-300: #FFD24D;
    --color-dark-accent-400: #FFC61A;
    --color-dark-accent-500: #E6AF00;
    --color-dark-accent-600: #BF9200;
    --color-dark-accent-700: #997500;
    --color-dark-accent-800: #735900;
    --color-dark-accent-900: #4D3D00;

    /* Colors for the Freon editor Dark mode */
    --color-dark-freon-50:  #FAFBFF;
    --color-dark-freon-100: #EAF4FF;
    --color-dark-freon-150: #CFE6FF;
    --color-dark-freon-200: #BFE0FF;
    --color-dark-freon-250: #B3D7FF;
    --color-dark-freon-300: #99C8FF;
    --color-dark-freon-350: #7AB6FF;
    --color-dark-freon-400: #5AA3FF;
    --color-dark-freon-500: #3F8CFF;
    --color-dark-freon-600: #2F6FCE;
    --color-dark-freon-700: #22539B;
    --color-dark-freon-800: #173A6B;
    --color-dark-freon-900: #0F2746;
    --color-dark-freon-error:    #FF4C4C;  /* unchanged */
    --color-dark-freon-editable: #FFE8A3;  /* yellow-150 */
    --color-dark-freon-optional: #E6AF00;  /* yellow-400/500 */
    --color-dark-freon-border:   #22539B;  /* blue-800 */
    --color-dark-freon-dropdown: #2F6FCE;  /* blue-700 */
    --color-dark-freon-button:   #7AB6FF;  /* blue-350 */

    /* Colors used in both light and dark mode (colorblind-safe version) */
    --color-light-freon-accent-error: #FF4C4C;         /* unchanged */
    --color-light-freon-accent-editable: #FFE8A3;      /* was #FFD0B3 → lighter yellow */
    --color-light-freon-accent-optional: #E6AF00;      /* was #DB6506 → deep yellow */
    --color-light-freon-border-green: #22539B;         /* was #47651A → strong blue */
    --color-light-freon-accent-dropdown: #2F6FCE;      /* was #5B7F20 → mid-blue */
    --color-light-freon-accent-button: #7AB6FF;        /* was #98CA32 → bright blue */
    --freon-light-accent-lightgreen: #EAF4FF;          /* was #e4f5e5 → very light blue */

    /* Colors used in dark mode (colorblind-safe version) */
    --color-dark-freon-accent-error: #FF4C4C;          /* unchanged */
    --color-dark-freon-accent-editable: #FFE8A3;       /* was #FFD0B3 → soft yellow */
    --color-dark-freon-accent-optional: #E6AF00;       /* was #DB6506 → deep yellow */
    --color-dark-freon-border-green: #22539B;          /* was #47651A → strong blue */
    --color-dark-freon-accent-dropdown: #2F6FCE;       /* was #5B7F20 → medium blue */
    --color-dark-freon-accent-button: #7AB6FF;         /* was #98CA32 → bright blue */
&#125;
</code></pre> <!> <p>Because the minimal <a href="/Documentation/Overview/Getting_Started#a-minimal-web-app-and-server-6">web app</a> is provided solely for your convenience, the styling of the editor is kept separate from the styling of the web
application. In the above <code>webapp-styles.css</code> file, you will notice that four CSS files from
the <code>@freon4dsl/core-svelte</code> package are imported. One includes all styling that does not concern colors (<code>freon.css</code>).
Two files define the colors for either the light or dark mode (<code>freon-light.css</code> and <code>freon-tw-dark.css</code>). If you are not
using <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>, a file called <code>freon-plain-dark.css</code> provides all
dark mode styling in plain css. The fourth file defines colors such that they can be used to theme the web app and editor.</p> <p>The comments and naming in each CSS file should (hopefully) indicate where each
style is being used. For example, the following styles are defined for horizontal and vertical lists.</p> <pre class="language-scss"><code class="language-scss">// Styling/freon.css#L50-L66

.list-component-horizontal &#123;
    white-space: nowrap;
    display: grid;
    padding: 0px;
    border-width: 0pt;
    border-style: none;
    margin: 0px;
    box-sizing: border-box;
&#125;

.list-component-vertical &#123;
    padding: 0px;
    border-width: 0pt;
    border-style: none;
    margin: 1px;
    box-sizing: border-box;
&#125;</code></pre> <p>To modify the styling, copy the files from the <code>@freon4dsl/core-svelte</code> package into your
styles folder and adjust the <code>@import</code> statement in <code>webapp-styles.scss</code> to include your own
files instead of the packaged ones. Then start changing the styles in your own
copies to your liking, however, take care when modifying the boolean and numeric controls, because they are based on
Material UI components.</p> <p>The following components derive their colors from Material UI variables, which you can override using Freon-specific CSS variables:</p> <ul><li>RadioComponent uses  “—mdc-theme-secondary” for its color, if you want to override this value set “—freon-boolean-radiobox-color”.</li> <li>CheckComponent uses  “—mdc-theme-secondary”, if you want to override it, use “—freon-boolean-checkbox-color”.</li> <li>SwitchComponent uses  “—mdc-theme-primary”, if you want to override it, set “—freon-boolean-switch-color”.</li> <li>NumericSliderComponent uses  “—mdc-theme-primary”, if you want to override it, set “—freon-numeric-slider-color”.</li> <li>InnerSwitchComponent uses  “—mdc-theme-primary”, if you want to override it, set “—freon-boolean-switch-color”.</li></ul> <!>`,1);function Me(E,e){de(e,!0);const c=ge({});xe(()=>{document.querySelectorAll("pre").forEach(n=>{const d=document.createElement("div");d.className="copy-prompt";const x=document.createElement("p");x.innerHTML="👆 Click to copy",x.className="copy-prompt-p";const S=document.createElement("img");S.src="/icons/copy-icon.svg",S.className="copy-prompt-img",d.appendChild(S),d.appendChild(x),n.appendChild(d),n.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{n.querySelector("code")?.textContent!==null&&n.querySelector("code")?.textContent!==void 0&&De(n.querySelector("code").textContent),n.querySelector(".copy-prompt > p")?.innerHTML!==null&&n.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(n.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{n.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let _="/Documentation/Defining_an_Editor/Fragments",y="/Documentation/Defining_an_Editor/The_Parser_Projection";var P=Pe(),C=N(P);ce(C,{prevLink:_,nextLink:y});var k=o(C,2);j(k,{tag:"h1",id:"styling-1",onIntersectChange:t=>e.setVisible("styling-1",t),get intersecting(){return c["styling-1"]},set intersecting(t){c["styling-1"]=t},children:(t,n)=>{O();var d=z("Styling");s(t,d)},$$slots:{default:!0}});var B=o(k,4);j(B,{tag:"h1",id:"styling-the-web-app-2",onIntersectChange:t=>e.setVisible("styling-the-web-app-2",t),get intersecting(){return c["styling-the-web-app-2"]},set intersecting(t){c["styling-the-web-app-2"]=t},children:(t,n)=>{O();var d=z("Styling the Web App");s(t,d)},$$slots:{default:!0}});var T=o(B,12);j(T,{tag:"h2",id:"changing-the-theme-3",onIntersectChange:t=>e.setVisible("changing-the-theme-3",t),get intersecting(){return c["changing-the-theme-3"]},set intersecting(t){c["changing-the-theme-3"]=t},children:(t,n)=>{O();var d=z("Changing the Theme");s(t,d)},$$slots:{default:!0}});var M=o(T,6);j(M,{tag:"h2",id:"styling-the-editor-4",onIntersectChange:t=>e.setVisible("styling-the-editor-4",t),get intersecting(){return c["styling-the-editor-4"]},set intersecting(t){c["styling-the-editor-4"]=t},children:(t,n)=>{O();var d=z("Styling the Editor");s(t,d)},$$slots:{default:!0}});var H=o(M,14);ce(H,{prevLink:_,nextLink:y}),s(E,P),he()}var qe=u('<meta property="article:published_time"/>'),ze=u('<meta property="article:modified_time"/>'),Oe=u('<meta property="article:tag"/>'),je=u('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Ne=(E,e)=>{pe(e,!r(e))},He=u('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Ve=u('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ue=u('<li class="page-toc-text"><a> </a></li>'),We=u('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ge=u('<li class="page-toc-text"><a> </a></li>'),Re=u('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function rt(E,e){de(e,!0);let c=ie(!1);const _=ge([{id:"styling-1",title:"Styling",visible:!1,ref:"#styling-1"},{id:"styling-the-web-app-2",title:"Styling the Web App",visible:!1,ref:"#styling-the-web-app-2"},{id:"changing-the-theme-3",title:"Changing the Theme",visible:!1,ref:"#changing-the-theme-3"},{id:"styling-the-editor-4",title:"Styling the Editor",visible:!1,ref:"#styling-the-editor-4"}]);let y=ie(0);function P(a,i){const m=_.find(g=>g.id===a);m&&(m.visible=i);const h=_.findIndex(g=>g.visible);h>=0&&pe(y,h,!0)}const C=G(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),k=G(()=>e.data.page.description??e.data.category.description),B="https://freon4dsl.dev/images/freon-banner.png";let T=G(()=>{const a=Ae.url.pathname;return`https://freon4dsl.dev${a==="/"?"/":a.replace(/\/$/,"")}`});const M=e.data.site?.tags??[],H=e.data.category?.tags??[],t=e.data.page.tags??[],n=[...new Set([...M,...H,...t].filter(Boolean))],d={"@context":"https://schema.org","@type":"WebPage",headline:r(C),description:r(k),url:r(T),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:n.length?n.join(", "):void 0,image:B,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var x=Re();Te(a=>{var i=je(),m=N(i),h=o(m,4),g=o(h,2);{var A=p=>{var w=qe();D(()=>l(w,"content",e.data.page.publishedTime)),s(p,w)};L(g,p=>{e.data.page.publishedTime&&p(A)})}var b=o(g,2);{var v=p=>{var w=ze();D(()=>l(w,"content",e.data.page.modifiedTime)),s(p,w)};L(b,p=>{e.data.page.modifiedTime&&p(v)})}var I=o(b,2);{var W=p=>{var w=Ce(),ve=N(w);R(ve,17,()=>n,Ee,(we,_e)=>{var ne=Oe();D(()=>l(ne,"content",r(_e))),s(we,ne)}),s(p,w)};L(I,p=>{n&&p(W)})}var q=o(I,2),X=o(q,4),Y=o(X,2),$=o(Y,2),ee=o($,2);l(ee,"content",B);var te=o(ee,2),oe=o(te,4),re=o(oe,2),ae=o(re,2);l(ae,"content",B);var be=o(ae,2);Be(be,()=>`<script type="application/ld+json">${JSON.stringify(d)}<\/script>`),D(p=>{ke.title=r(C)??"",l(m,"content",r(k)),l(h,"href",r(T)),l(q,"content",p),l(X,"content",r(C)),l(Y,"content",r(k)),l($,"content",e.data.site.title),l(te,"content",r(T)),l(oe,"content",r(C)),l(re,"content",r(k))},[()=>n.join(", ")]),s(a,i)});var S=N(x),V=F(S),U=o(F(V),2);U.__click=[Ne,c];var me=F(U);{var fe=a=>{var i=He();s(a,i)},ue=a=>{var i=Ve();s(a,i)};L(me,a=>{r(c)?a(fe):a(ue,!1)})}f(U),f(V);var Z=o(V,2);{var Fe=a=>{var i=We(),m=F(i);R(m,22,()=>_,h=>h,(h,g,A)=>{var b=Ue(),v=F(b);let I;var W=F(v,!0);f(v),f(b),D(q=>{l(v,"href",g.ref),I=se(v,1,"",null,I,q),le(W,g.title)},[()=>({"page-visible":r(A)===r(y),"page-nonvisible":r(A)!==r(y)})]),s(h,b)}),f(m),f(i),s(a,i)};L(Z,a=>{r(c)&&a(Fe)})}var J=o(Z,2);Ie(J,{});var ye=o(J,2);Me(ye,{setVisible:P}),f(S);var K=o(S,2),Q=o(F(K),2);R(Q,22,()=>_,a=>a,(a,i,m)=>{var h=Ge(),g=F(h);let A;var b=F(g,!0);f(g),f(h),D(v=>{l(g,"href",i.ref),A=se(g,1,"",null,A,v),le(b,i.title)},[()=>({"page-visible":r(m)===r(y),"page-nonvisible":r(m)!==r(y)})]),s(a,h)}),f(Q),f(K),s(E,x),he()}Se(["click"]);export{rt as component,ot as universal};
//# sourceMappingURL=43.DGORG29Z.js.map
