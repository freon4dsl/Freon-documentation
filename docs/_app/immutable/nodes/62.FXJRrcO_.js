import{f as h,a as i,t as B,e as Fe}from"../chunks/nks1QWJh.js";import{y as de,G as me,x as z,z as pe,u as o,A as L,g as r,I as ie,B as V,a as O,$ as Ce,v,s as ge,w as u}from"../chunks/bZIXIZs8.js";import{d as Ae,i as R,s as se}from"../chunks/DANOUgWt.js";import{e as Z,p as Ne,i as we,s as ce}from"../chunks/CKHUE_gp.js";import{h as Se}from"../chunks/DCXhKCCG.js";import{h as Ee}from"../chunks/aX-frc9G.js";import{s as d}from"../chunks/BpSVRMQn.js";import{o as Ie}from"../chunks/D62n5Z03.js";import{P as le,S as j,c as Oe,B as Pe}from"../chunks/CFDUsp8k.js";const Be=async({parent:S})=>{const{site:t,category:s}=await S();return{site:t,category:s,page:{title:"The Freon Core Interfaces",description:"Overview of the essential TypeScript interfaces that define Freon’s core editor and model framework: FreNode, FreNamedNode, FreAction, and FreCustomAction.",tags:["Core Interfaces","FreNode","FreAction","Freon","TypeScript"],modifiedTime:"2025-11-07T17:20:18.626Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},ot=Object.freeze(Object.defineProperty({__proto__:null,load:Be},Symbol.toStringTag,{value:"Module"}));var Le=h(`<!> <!> <!> <p>As Freon uses the AST for projections and behavior, it needs to know about the type of elements in the AST.<br/> To allow Freon to work, each element type that occurs in the AST must implement the <code>FreNode</code> interface.<br/> This interface is kept as small as possible to allow Freon to be used for any AST.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/ast/FreNode.ts */

export interface FreNode &#123;
	freId(): string;

	freLanguageConcept(): string;

	freOwner(): FreNode | undefined;

	freOwnerDescriptor(): FreOwnerDescriptor;

	freIsModel(): boolean;

	freIsUnit(): boolean;

	freIsExpression(): boolean;

	freIsBinaryExpression(): boolean;

	copy(): FreNode;

	match(toBeMatched: Partial&lt;FreNode&gt;): boolean;

	parseLocation?: FreParseLocation; // if relevant, the location of this node within the source from which it is parsed
&#125;</code></pre> <p>The two most important members in this interface are:</p> <ul><li><code>freId()</code> — returns a unique ID for each element in the AST.</li> <li><code>freContainer()</code> — returns a descriptor for the container (parent) of an element in the AST.</li></ul> <p>The functions <code>freIsExpression()</code> and <code>freIsBinaryExpression()</code> are only needed when your language
contains expressions, since Freon includes special handling for expression trees.<br/> To start with, these functions can simply return <code>false</code>.</p> <p>Note that Freon does not need to know anything about the structure of your language:<br/> no available element types, no property names, and no model structure.<br/> This is intentional — Freon is not designed as a full <em>language workbench</em>,<br/> but as a flexible projectional editor that can integrate with multiple language workbenches (or none at all).</p> <!> <p>An object that implements <code>FreNamedNode</code> can be a node in a model AST, similar to<br/> [<code>FreNode</code>] implementations.<br/> The difference is that <code>FreNamedNode</code> objects have a <code>name</code> property.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/ast/FreNamedNode.ts */

export interface FreNamedNode extends FreNode &#123;
	name: string;
&#125;</code></pre> <!> <p><code>FreAction</code> is the abstract base class for all editor actions that can be triggered from boxes.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/editor/actions/FreAction.ts */

export abstract class FreAction &#123;
	/**
	 * The trigger to activate this behavior
	 */
	trigger: FreTriggerType;

	/**
	 * The box roles in which this trigger is active
	 */
	activeInBoxRoles: string[];

	/**
	 * Optional callback function that returns whether the trigger is applicable for the specific box.
	 */
	isApplicable?: (box: Box) =&gt; boolean;

	/**
	 * The role of the box that should be selected after the action has been executing.
	 */
	boxRoleToSelect?: string;

	/**
	 * The caret position where the cursor should be positioned after the action has been executed.
	 * Only applicable if the selected box is a TextBox.
	 */
	caretPosition?: FreCaret;

	/**
	 * The property name of the reference for which this is a shortcut.
	 */
	referenceShortcut?: ReferenceShortcut;

	/**
	 * Execute the action
	 * @param box       The selected box on which this action is executed
	 * @param trigger   The trigger that causes this action to execute
	 * @param editor    The editor
	 * @param index     The index in the list, if there is any
	 */
	abstract execute(box: Box, trigger: FreTriggerUse, editor: FreEditor, index?: number): FrePostAction;
&#125;</code></pre> <!> <p>A concrete implementation of <code>FreAction</code>, <code>FreCustomAction</code> defines a customizable editor action
executed via a function stored in its <code>action</code> property.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/editor/actions/FreCustomAction.ts */

import &#123; AST &#125; from "../../change-manager/index.js";
import &#123; FreUtils &#125; from "../../util/index.js";
import &#123; Box &#125; from "../boxes/index.js";
import &#123; FreEditor &#125; from "../FreEditor.js";
import &#123;
FreAction,
CustomAction,
FreTriggerUse,
FrePostAction,
triggerTypeToString,
ACTION_LOGGER
&#125; from "./internal.js";

export class FreCustomAction extends FreAction &#123;
	static create(initializer?: Partial&lt;FreCustomAction&gt;) &#123;
		const result = new FreCustomAction();
		FreUtils.initializeObject(result, initializer);
		return result;
	&#125;
	/**
	 * The action function that will be performed
	 */
	action: CustomAction;

	constructor() &#123;
		super();
	&#125;

	/**
	 * @see FreAction.execute
	 * @param box
	 * @param trigger
	 * @param editor
	 */
	override execute(box: Box, trigger: FreTriggerUse, editor: FreEditor): FrePostAction &#123;
		ACTION_LOGGER.log("FreCustomCommand: trigger [" + triggerTypeToString(trigger) + "]");
		ACTION_LOGGER.log("FreCustomCommand: action [" + this.action + "]");
		const self = this;
		let selected
		AST.change( () =&gt; &#123;
			selected = self.action(box, triggerTypeToString(trigger), editor);
		&#125;)
		if (!!selected) &#123;
			if (!!self.boxRoleToSelect) &#123;
				return function () &#123;
					ACTION_LOGGER.log("FreCustomCommand select " + box.node.freLanguageConcept() + " box " + self.boxRoleToSelect);
					editor.selectElementBox(selected, self.boxRoleToSelect, self.caretPosition);
				&#125;;
			&#125; else &#123;
				// Default: select the first editable child of the selected element
				return function () &#123;
					ACTION_LOGGER.log("editor.selectFirstEditableChildBox(selected) ");
					editor.selectFirstEditableChildBox(selected);
				&#125;;
			&#125;
		&#125;
		return function(): void &#123;
			if (self.boxRoleToSelect === "REFERENCE") &#123;
				const index = (box.node[box.propertyName] as Array&lt;any&gt;).length -1
				// const empty = editor.findBoxForNode(box.node, box.propertyName)
				editor.selectElement(box.node, box.propertyName, index)
				editor.selectNextLeaf()
				ACTION_LOGGER.log(\`REFERENCE node $&#123;box.node.freId()&#125; prop $&#123;box.propertyName&#125; index $&#123;index&#125;\`)
			&#125;
		&#125;
		// return EMPTY_POST_ACTION;
	&#125;

&#125;</code></pre> <!>`,1);function Re(S,t){de(t,!0);const s=me({});Ie(()=>{document.querySelectorAll("pre").forEach(c=>{const n=document.createElement("div");n.className="copy-prompt";const A=document.createElement("p");A.innerHTML="👆 Click to copy",A.className="copy-prompt-p";const N=document.createElement("img");N.src="/icons/copy-icon.svg",N.className="copy-prompt-img",n.appendChild(N),n.appendChild(A),c.appendChild(n),c.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{c.querySelector("code")?.textContent!==null&&c.querySelector("code")?.textContent!==void 0&&Oe(c.querySelector("code").textContent),c.querySelector(".copy-prompt > p")?.innerHTML!==null&&c.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(c.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{c.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let T="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types",b="/Documentation/Under_the_Hood/Editor_Interfaces";var k=Le(),F=z(k);le(F,{prevLink:T,nextLink:b});var C=o(F,2);j(C,{tag:"h1",id:"the-freon-core-interfaces-1",onIntersectChange:e=>t.setVisible("the-freon-core-interfaces-1",e),get intersecting(){return s["the-freon-core-interfaces-1"]},set intersecting(e){s["the-freon-core-interfaces-1"]=e},children:(e,c)=>{L();var n=B("The Freon Core Interfaces");i(e,n)},$$slots:{default:!0}});var E=o(C,2);j(E,{tag:"h2",id:"frenode-2",onIntersectChange:e=>t.setVisible("frenode-2",e),get intersecting(){return s["frenode-2"]},set intersecting(e){s["frenode-2"]=e},children:(e,c)=>{L();var n=B("FreNode");i(e,n)},$$slots:{default:!0}});var I=o(E,14);j(I,{tag:"h2",id:"frenamednode-3",onIntersectChange:e=>t.setVisible("frenamednode-3",e),get intersecting(){return s["frenamednode-3"]},set intersecting(e){s["frenamednode-3"]=e},children:(e,c)=>{L();var n=B("FreNamedNode");i(e,n)},$$slots:{default:!0}});var G=o(I,6);j(G,{tag:"h2",id:"freaction-4",onIntersectChange:e=>t.setVisible("freaction-4",e),get intersecting(){return s["freaction-4"]},set intersecting(e){s["freaction-4"]=e},children:(e,c)=>{L();var n=B("FreAction");i(e,n)},$$slots:{default:!0}});var M=o(G,6);j(M,{tag:"h2",id:"frecustomaction-5",onIntersectChange:e=>t.setVisible("frecustomaction-5",e),get intersecting(){return s["frecustomaction-5"]},set intersecting(e){s["frecustomaction-5"]=e},children:(e,c)=>{L();var n=B("FreCustomAction");i(e,n)},$$slots:{default:!0}});var U=o(M,6);le(U,{prevLink:T,nextLink:b}),i(S,k),pe()}var je=h('<meta property="article:published_time"/>'),ke=h('<meta property="article:modified_time"/>'),Ge=h('<meta property="article:tag"/>'),Me=h('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),qe=(S,t)=>{ge(t,!r(t))},ze=h('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),Ue=h('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),He=h('<li class="page-toc-text"><a> </a></li>'),De=h('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ve=h('<li class="page-toc-text"><a> </a></li>'),Ze=h('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function rt(S,t){de(t,!0);let s=ie(!1);const T=me([{id:"the-freon-core-interfaces-1",title:"The Freon Core Interfaces",visible:!1,ref:"#the-freon-core-interfaces-1"},{id:"frenode-2",title:"FreNode",visible:!1,ref:"#frenode-2"},{id:"frenamednode-3",title:"FreNamedNode",visible:!1,ref:"#frenamednode-3"},{id:"freaction-4",title:"FreAction",visible:!1,ref:"#freaction-4"},{id:"frecustomaction-5",title:"FreCustomAction",visible:!1,ref:"#frecustomaction-5"}]);let b=ie(0);function k(a,l){const f=T.find(m=>m.id===a);f&&(f.visible=l);const p=T.findIndex(m=>m.visible);p>=0&&ge(b,p,!0)}const F=V(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),C=V(()=>t.data.page.description??t.data.category.description),E="https://freon4dsl.dev/images/freon-banner.png";let I=V(()=>{const a=Ne.url.pathname;return`https://freon4dsl.dev${a==="/"?"/":a.replace(/\/$/,"")}`});const G=t.data.site?.tags??[],M=t.data.category?.tags??[],U=t.data.page.tags??[],e=[...new Set([...G,...M,...U].filter(Boolean))],c={"@context":"https://schema.org","@type":"WebPage",headline:r(F),description:r(C),url:r(I),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:e.length?e.join(", "):void 0,image:E,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var n=Ze();Ee(a=>{var l=Me(),f=z(l),p=o(f,4),m=o(p,2);{var w=g=>{var y=je();O(()=>d(y,"content",t.data.page.publishedTime)),i(g,y)};R(m,g=>{t.data.page.publishedTime&&g(w)})}var x=o(m,2);{var _=g=>{var y=ke();O(()=>d(y,"content",t.data.page.modifiedTime)),i(g,y)};R(x,g=>{t.data.page.modifiedTime&&g(_)})}var P=o(x,2);{var D=g=>{var y=Fe(),_e=z(y);Z(_e,17,()=>e,we,(ye,Te)=>{var ne=Ge();O(()=>d(ne,"content",r(Te))),i(ye,ne)}),i(g,y)};R(P,g=>{e&&g(D)})}var q=o(P,2),Q=o(q,4),X=o(Q,2),$=o(X,2),ee=o($,2);d(ee,"content",E);var te=o(ee,2),oe=o(te,4),re=o(oe,2),ae=o(re,2);d(ae,"content",E);var xe=o(ae,2);Se(xe,()=>`<script type="application/ld+json">${JSON.stringify(c)}<\/script>`),O(g=>{Ce.title=r(F)??"",d(f,"content",r(C)),d(p,"href",r(I)),d(q,"content",g),d(Q,"content",r(F)),d(X,"content",r(C)),d($,"content",t.data.site.title),d(te,"content",r(I)),d(oe,"content",r(F)),d(re,"content",r(C))},[()=>e.join(", ")]),i(a,l)});var A=z(n),N=v(A),H=o(v(N),2);H.__click=[qe,s];var fe=v(H);{var ue=a=>{var l=ze();i(a,l)},he=a=>{var l=Ue();i(a,l)};R(fe,a=>{r(s)?a(ue):a(he,!1)})}u(H),u(N);var J=o(N,2);{var ve=a=>{var l=De(),f=v(l);Z(f,22,()=>T,p=>p,(p,m,w)=>{var x=He(),_=v(x);let P;var D=v(_,!0);u(_),u(x),O(q=>{d(_,"href",m.ref),P=ce(_,1,"",null,P,q),se(D,m.title)},[()=>({"page-visible":r(w)===r(b),"page-nonvisible":r(w)!==r(b)})]),i(p,x)}),u(f),u(l),i(a,l)};R(J,a=>{r(s)&&a(ve)})}var W=o(J,2);Pe(W,{});var be=o(W,2);Re(be,{setVisible:k}),u(A);var Y=o(A,2),K=o(v(Y),2);Z(K,22,()=>T,a=>a,(a,l,f)=>{var p=Ve(),m=v(p);let w;var x=v(m,!0);u(m),u(p),O(_=>{d(m,"href",l.ref),w=ce(m,1,"",null,w,_),se(x,l.title)},[()=>({"page-visible":r(f)===r(b),"page-nonvisible":r(f)!==r(b)})]),i(a,p)}),u(K),u(Y),i(S,n),pe()}Ae(["click"]);export{rt as component,ot as universal};
//# sourceMappingURL=62.FXJRrcO_.js.map
