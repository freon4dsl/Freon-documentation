import{f as g,a as l,t as w,e as we}from"../chunks/nks1QWJh.js";import{y as me,G as fe,x as U,z as ue,u as r,A as x,g as a,I as le,B as G,a as P,$ as xe,v as y,s as he,w as h}from"../chunks/bZIXIZs8.js";import{d as Ne,i as k,s as de}from"../chunks/DANOUgWt.js";import{e as J,p as Se,i as Ie,s as ce}from"../chunks/CKHUE_gp.js";import{h as Re}from"../chunks/DCXhKCCG.js";import{h as Ee}from"../chunks/aX-frc9G.js";import{s as c}from"../chunks/BpSVRMQn.js";import{o as Ce}from"../chunks/D62n5Z03.js";import{P as pe,S as N,c as Ae,B as Ve}from"../chunks/CFDUsp8k.js";const Pe=async({parent:C})=>{const{site:t,category:o}=await C();return{site:t,category:o,page:{title:"The Fre-Tool Interfaces",description:"Interfaces implemented by generated Freon code, defining extensibility points such as environment, scoper, typer, validator, reader, writer, and standard library access.",tags:["Tool Interfaces","FreEnvironment","FreScoper","FreValidator","FreTyper","FreReader","FreWriter","FreStdlib","Freon"],modifiedTime:"2025-11-07T17:20:18.626Z",publishedTime:"2025-11-07T17:20:18.626Z"}}},rt=Object.freeze(Object.defineProperty({__proto__:null,load:Pe},Symbol.toStringTag,{value:"Module"}));var je=g(`<!> <!> <p>There are two series of interfaces that make Freon and its generated code extensible and flexible.<br/> The first series are the interfaces implemented by the generated code.</p> <!> <p>An object that implements <code>FreEnvironment</code> holds information about where to find all parts
of the language environment. It is usually a singleton object.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/environment/FreEnvironment.ts */

export type FreEnvironment = &#123;
	/**
	 * Creates a new model, an implementation of the language defined in the .ast file
	 * @param modelName
	 */
	newModel(modelName: string): FreModel;

	scoper: FreCompositeScoper;
	typer: FreCompositeTyper;
	validator: FreValidator;
	editor: FreEditor;
	writer: FreWriter;
	reader: FreReader;
	interpreter: FreInterpreter;
	projectionHandler: FreProjectionHandler;

	languageName: string;
	fileExtensions: Map&lt;string, string&gt;;
&#125;</code></pre> <!> <p>An object that implements <code>FreScoper</code> can return the named elements that are visible
for a certain AST node. This node can be a “normal” model element or a namespace.
If the node is a normal element, the names visible in its lexical surroundings are returned.</p> <p>To implement custom name resolution, write your own <code>FreScoper</code>.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/scoper/FreScoper.ts */

export interface FreScoper &#123;
	mainScoper: FreCompositeScoper;

	/**
	 *   Returns all elements that are visible in the namespace containing 'node'. Note that 'node' can
	 *   be any node in the AST, not only namespaces!
	 *
	 *   When parameter 'metaType' is present, it returns all elements that are an instance of 'metaType'.
	 *   There is no default setting for this parameter.
	 *
	 * @param node
	 * @param metaType
	 */
	getVisibleNodes(node: FreNode | FreNodeReference&lt;FreNamedNode&gt;, metaType?: string): FreNamedNode[];

	/**
	 * Returns all nodes and/or node references that represent namespaces which should be added to the namespace
	 * represented by 'node'. Combined with every element is a property called 'recursive', which indicates whether
	 * to include the imported namespaces from imported namespaces.
	 *
	 * @param node
	 */
	importedNamespaces(node: FreNode): FreNamespaceInfo[];

	/**
	 * Returns all nodes and/or node references that represent namespaces which should be used to replace
	 * the parent namespace of the namespace represented by 'node'. Combined with every element is a property
	 * called 'recursive', which indicates whether to include the imported namespaces from alternative namespaces.
	 *
	 * @param node
	 */
	alternativeNamespaces(node: FreNode): FreNamespaceInfo[];
&#125;
</code></pre> <!> <p>An object that implements <code>FreValidator</code> validates a node in the AST.
Validation may include the node itself or all of its child nodes recursively.</p> <p>Errors found are returned as a list of <code>FreError</code> objects, each containing a message and a reference
to the faulty node.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/validator/FreValidator.ts */

export interface FreValidator &#123;
	/**
	 * Returns a list of errors on 'modelelement' according to the validation rules
	 * stated in the validation definition. If 'includeChildren' is true, the child
	 * nodes of 'modelelement' in the AST are also checked.
	 *
	 * @param modelelement
	 * @param includeChildren
	 */
	validate(modelelement: FreNode, includeChildren?: boolean): FreError[];
&#125;</code></pre> <h3 id="freerror-1">FreError</h3> <pre class="language-ts"><code class="language-ts">/* File: core/src/validator/FreValidator.ts */

/**
 * An error consists of a message coupled to the faulty AST node, either a model
 * element or a list of model elements.
 */
export class FreError &#123;
	message: string; // human-readable error message
	reportedOn: FreNode | FreNode[]; // the model element that does not comply
	propertyName: string; // the property of the model element that does not comply, if appropriate
	propertyIndex: number; // the property index of the model element that does not comply, if appropriate
	locationdescription: string; // human-readable indication of 'reportedOn'
	severity: FreErrorSeverity; // indication of how serious the error is, default is 'To Do'

	constructor(
		message: string,
		node: FreNode | FreNode[],
		locationdescription: string,
		propertyName: string,
		severity?: FreErrorSeverity,
		propertyIndex?: number,
	) &#123;
		this.message = message;
		this.reportedOn = node;
		this.locationdescription = locationdescription;
		
		if (typeof severity !== "undefined") &#123;
			this.severity = severity;
		&#125; else &#123;
			this.severity = FreErrorSeverity.ToDo;
		&#125;
		this.propertyName = propertyName;
		this.propertyIndex = propertyIndex;
	&#125;
&#125;

export enum FreErrorSeverity &#123;
	Error = "Error",
	Warning = "Warning",
	Hint = "Hint",
	Improvement = "Improvement",
	ToDo = "TODO",
	Info = "Info",
	NONE = "NONE",
&#125;</code></pre> <!> <p>An object that implements <code>FreTyper</code> answers type-related questions concerning AST nodes.</p> <p>To define your own typing system, implement this interface.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/typer/FreTyper.ts */

export interface FreTyper &#123;
	// name: string;
	mainTyper: FreTyper;

	/**
	 * Returns true if 'elem' is marked as 'isType' in the Typer definition.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param elem
	 */
	isType(elem: FreNode): boolean | undefined;

	/**
	 * Returns the type of 'modelelement' according to the type rules in the Typer Definition.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param modelelement
	 */
	inferType(modelelement: FreNode): FreType | undefined;

	/**
	 * Returns true if type1 equals type2.
	 * This is a strict equal.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param type1
	 * @param type2
	 */
	equals(type1: FreType, type2: FreType): boolean | undefined;

	/**
	 * Returns true if type1 conforms to type2. The direction is type1 conforms to type2.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param type1
	 * @param type2
	 */
	conforms(type1: FreType, type2: FreType): boolean | undefined;

	/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param typelist1
	 * @param typelist2
	 */
	conformsList(typelist1: FreType[], typelist2: FreType[]): boolean | undefined;

	/**
	 * Returns the common super type of all types in 'typelist'.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param typelist
	 */
	commonSuper(typelist: FreType[]): FreType | undefined;

	/**
	 * Returns all super types as defined in the typer definition.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param type
	 */
	getSuperTypes(type: FreType): FreType[] | undefined;
&#125;</code></pre> <!> <p>An object that implements <code>FreReader</code> can read a textual representation of a model or AST node.</p> <p>To create your own parser or file reader, implement this interface.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/reader/FreReader.ts */

export interface FreReader &#123;
	/**
	 * Parses and performs a syntax analysis on 'sentence', using the parser and analyser
	 * for 'metatype', if available. If 'sentence' is correct, a model unit will be created,
	 * otherwise an error wil be thrown containing the parse or analysis error.
	 * @param input         the input string which will be parsed
	 * @param metatype      the type of the unit to be created
	 * @param model         the model to which the unit will be added
	 * @param sourceName    the (optional) name of the source that contains 'sentence'
	 */
	readFromString(input: string, metatype: string, model: FreModel, sourceName?: string): FreNode;
&#125;</code></pre> <!> <p>An object that implements <code>FreWriter</code> can generate a textual representation of an AST node.</p> <p>To implement your own unparser or writer, define this interface.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/writer/FreWriter.ts */

export interface FreWriter &#123;
	/**
	 * Returns a string representation of 'node'.
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 * Note that the single-line-string cannot be parsed into a correct model.
	 *
	 * @param node
	 * @param startIndent
	 * @param short
	 */
	writeToString(node: FreNode, startIndent?: number, short?: boolean): string;

	/**
	 * Returns a string representation of 'node', divided into an array of strings,
	 * each of which contain a single line (without newline).
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 *
	 * @param node
	 * @param startIndent
	 * @param short
	 */
	writeToLines(node: FreNode, startIndent?: number, short?: boolean): string[];

	/**
	 * Returns the name of 'node' if it has one, else returns
	 * a short unparsing of 'node'.
	 * Used by the validator to produce readable error messages.
	 *
	 * @param node
	 */
	writeNameOnly(node: FreNode | undefined): string;
&#125;</code></pre> <!> <p>An object that implements <code>FreStdlib</code> holds a number of predefined AST nodes that can be
referred to in user models.</p> <pre class="language-ts"><code class="language-ts">/* File: core/src/stdlib/FreStdlib.ts  */

export interface FreStdlib &#123;
    elements: FreNamedNode[];

    /**
     * Returns the element named 'name', if it can be found in this library.
     * When 'metatype' is provided, the element is only returned when it is
     * an instance of this metatype.
     */
    find(name: string, metatype?: string): FreNamedNode;
&#125;</code></pre> <p>The second series of interfaces define parts of the<br/> <a href="/Documentation/Under_the_Hood/Editor_Framework">Freon Editor Framework</a>.</p> <!>`,1);function Oe(C,t){me(t,!0);const o=fe({});Ce(()=>{document.querySelectorAll("pre").forEach(i=>{const n=document.createElement("div");n.className="copy-prompt";const j=document.createElement("p");j.innerHTML="👆 Click to copy",j.className="copy-prompt-p";const O=document.createElement("img");O.src="/icons/copy-icon.svg",O.className="copy-prompt-img",n.appendChild(O),n.appendChild(j),i.appendChild(n),i.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{i.querySelector("code")?.textContent!==null&&i.querySelector("code")?.textContent!==void 0&&Ae(i.querySelector("code").textContent),i.querySelector(".copy-prompt > p")?.innerHTML!==null&&i.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(i.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{i.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let S="/Documentation/Under_the_Hood/Editor_Interfaces",v="/Documentation/Terminology";var M=je(),I=U(M);pe(I,{prevLink:S,nextLink:v});var R=r(I,2);N(R,{tag:"h1",id:"the-fre-tool-interfaces-1",onIntersectChange:e=>t.setVisible("the-fre-tool-interfaces-1",e),get intersecting(){return o["the-fre-tool-interfaces-1"]},set intersecting(e){o["the-fre-tool-interfaces-1"]=e},children:(e,i)=>{x();var n=w("The Fre-Tool Interfaces");l(e,n)},$$slots:{default:!0}});var A=r(R,4);N(A,{tag:"h2",id:"freenvironment-2",onIntersectChange:e=>t.setVisible("freenvironment-2",e),get intersecting(){return o["freenvironment-2"]},set intersecting(e){o["freenvironment-2"]=e},children:(e,i)=>{x();var n=w("FreEnvironment");l(e,n)},$$slots:{default:!0}});var V=r(A,6);N(V,{tag:"h2",id:"frescoper-3",onIntersectChange:e=>t.setVisible("frescoper-3",e),get intersecting(){return o["frescoper-3"]},set intersecting(e){o["frescoper-3"]=e},children:(e,i)=>{x();var n=w("FreScoper");l(e,n)},$$slots:{default:!0}});var W=r(V,8);N(W,{tag:"h2",id:"frevalidator-4",onIntersectChange:e=>t.setVisible("frevalidator-4",e),get intersecting(){return o["frevalidator-4"]},set intersecting(e){o["frevalidator-4"]=e},children:(e,i)=>{x();var n=w("FreValidator");l(e,n)},$$slots:{default:!0}});var H=r(W,12);N(H,{tag:"h2",id:"fretyper-5",onIntersectChange:e=>t.setVisible("fretyper-5",e),get intersecting(){return o["fretyper-5"]},set intersecting(e){o["fretyper-5"]=e},children:(e,i)=>{x();var n=w("FreTyper");l(e,n)},$$slots:{default:!0}});var L=r(H,8);N(L,{tag:"h2",id:"frereader-6",onIntersectChange:e=>t.setVisible("frereader-6",e),get intersecting(){return o["frereader-6"]},set intersecting(e){o["frereader-6"]=e},children:(e,i)=>{x();var n=w("FreReader");l(e,n)},$$slots:{default:!0}});var F=r(L,8);N(F,{tag:"h2",id:"frewriter-7",onIntersectChange:e=>t.setVisible("frewriter-7",e),get intersecting(){return o["frewriter-7"]},set intersecting(e){o["frewriter-7"]=e},children:(e,i)=>{x();var n=w("FreWriter");l(e,n)},$$slots:{default:!0}});var D=r(F,8);N(D,{tag:"h2",id:"frestdlib-8",onIntersectChange:e=>t.setVisible("frestdlib-8",e),get intersecting(){return o["frestdlib-8"]},set intersecting(e){o["frestdlib-8"]=e},children:(e,i)=>{x();var n=w("FreStdlib");l(e,n)},$$slots:{default:!0}});var B=r(D,8);pe(B,{prevLink:S,nextLink:v}),l(C,M),ue()}var qe=g('<meta property="article:published_time"/>'),ke=g('<meta property="article:modified_time"/>'),Me=g('<meta property="article:tag"/>'),We=g('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),He=(C,t)=>{he(t,!a(t))},Le=g('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),De=g('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Be=g('<li class="page-toc-text"><a> </a></li>'),ze=g('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ue=g('<li class="page-toc-text"><a> </a></li>'),Ze=g('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function nt(C,t){me(t,!0);let o=le(!1);const S=fe([{id:"the-fre-tool-interfaces-1",title:"The Fre-Tool Interfaces",visible:!1,ref:"#the-fre-tool-interfaces-1"},{id:"freenvironment-2",title:"FreEnvironment",visible:!1,ref:"#freenvironment-2"},{id:"frescoper-3",title:"FreScoper",visible:!1,ref:"#frescoper-3"},{id:"frevalidator-4",title:"FreValidator",visible:!1,ref:"#frevalidator-4"},{id:"fretyper-5",title:"FreTyper",visible:!1,ref:"#fretyper-5"},{id:"frereader-6",title:"FreReader",visible:!1,ref:"#frereader-6"},{id:"frewriter-7",title:"FreWriter",visible:!1,ref:"#frewriter-7"},{id:"frestdlib-8",title:"FreStdlib",visible:!1,ref:"#frestdlib-8"}]);let v=le(0);function M(s,d){const u=S.find(p=>p.id===s);u&&(u.visible=d);const m=S.findIndex(p=>p.visible);m>=0&&he(v,m,!0)}const I=G(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),R=G(()=>t.data.page.description??t.data.category.description),A="https://freon4dsl.dev/images/freon-banner.png";let V=G(()=>{const s=Se.url.pathname;return`https://freon4dsl.dev${s==="/"?"/":s.replace(/\/$/,"")}`});const W=t.data.site?.tags??[],H=t.data.category?.tags??[],L=t.data.page.tags??[],F=[...new Set([...W,...H,...L].filter(Boolean))],D={"@context":"https://schema.org","@type":"WebPage",headline:a(I),description:a(R),url:a(V),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:F.length?F.join(", "):void 0,image:A,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var B=Ze();Ee(s=>{var d=We(),u=U(d),m=r(u,4),p=r(m,2);{var E=f=>{var _=qe();P(()=>c(_,"content",t.data.page.publishedTime)),l(f,_)};k(p,f=>{t.data.page.publishedTime&&f(E)})}var b=r(p,2);{var T=f=>{var _=ke();P(()=>c(_,"content",t.data.page.modifiedTime)),l(f,_)};k(b,f=>{t.data.page.modifiedTime&&f(T)})}var q=r(b,2);{var Z=f=>{var _=we(),be=U(_);J(be,17,()=>F,Ie,(Te,_e)=>{var se=Me();P(()=>c(se,"content",a(_e))),l(Te,se)}),l(f,_)};k(q,f=>{F&&f(Z)})}var z=r(q,2),$=r(z,4),ee=r($,2),te=r(ee,2),re=r(te,2);c(re,"content",A);var ne=r(re,2),ae=r(ne,4),oe=r(ae,2),ie=r(oe,2);c(ie,"content",A);var Fe=r(ie,2);Re(Fe,()=>`<script type="application/ld+json">${JSON.stringify(D)}<\/script>`),P(f=>{xe.title=a(I)??"",c(u,"content",a(R)),c(m,"href",a(V)),c(z,"content",f),c($,"content",a(I)),c(ee,"content",a(R)),c(te,"content",t.data.site.title),c(ne,"content",a(V)),c(ae,"content",a(I)),c(oe,"content",a(R))},[()=>F.join(", ")]),l(s,d)});var e=U(B),i=y(e),n=r(y(i),2);n.__click=[He,o];var j=y(n);{var O=s=>{var d=Le();l(s,d)},ge=s=>{var d=De();l(s,d)};k(j,s=>{a(o)?s(O):s(ge,!1)})}h(n),h(i);var K=r(i,2);{var ye=s=>{var d=ze(),u=y(d);J(u,22,()=>S,m=>m,(m,p,E)=>{var b=Be(),T=y(b);let q;var Z=y(T,!0);h(T),h(b),P(z=>{c(T,"href",p.ref),q=ce(T,1,"",null,q,z),de(Z,p.title)},[()=>({"page-visible":a(E)===a(v),"page-nonvisible":a(E)!==a(v)})]),l(m,b)}),h(u),h(d),l(s,d)};k(K,s=>{a(o)&&s(ye)})}var Q=r(K,2);Ve(Q,{});var ve=r(Q,2);Oe(ve,{setVisible:M}),h(e);var X=r(e,2),Y=r(y(X),2);J(Y,22,()=>S,s=>s,(s,d,u)=>{var m=Ue(),p=y(m);let E;var b=y(p,!0);h(p),h(m),P(T=>{c(p,"href",d.ref),E=ce(p,1,"",null,E,T),de(b,d.title)},[()=>({"page-visible":a(u)===a(v),"page-nonvisible":a(u)!==a(v)})]),l(s,m)}),h(Y),h(X),l(C,B),ue()}Ne(["click"]);export{nt as component,rt as universal};
//# sourceMappingURL=67.C7dTwOV6.js.map
