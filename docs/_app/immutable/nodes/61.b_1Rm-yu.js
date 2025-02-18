import{s as Zn,A as se,a as m,e as d,H as ae,f,b as h,m as T,d as C,F as oe,g as p,h as y,i as r,B as pe,r as et,w as ne,v as yt,t as J,o as K,j as P,C as vt,D as nt,E as ie,q as tt,p as st}from"../chunks/scheduler.Cra-n4xf.js";import{S as at,i as ot,e as le,c as V,a as j,m as W,t as D,b as O,d as B}from"../chunks/index.Bm95Nbrf.js";import{e as _n}from"../chunks/stores.Bq7jfj-I.js";import{w as $t}from"../chunks/index.B9cI0ado.js";import{P as zn,S as re,c as wt,B as Ft}from"../chunks/index.DunYcI8q.js";const U=$t([]);function Et(a){let t;return{c(){t=J("The Fre-tool Interfaces")},l(n){t=K(n,"The Fre-tool Interfaces")},m(n,o){r(n,t,o)},d(n){n&&p(t)}}}function Tt(a){let t;return{c(){t=J("FreEnvironment")},l(n){t=K(n,"FreEnvironment")},m(n,o){r(n,t,o)},d(n){n&&p(t)}}}function Ct(a){let t;return{c(){t=J("FreScoper")},l(n){t=K(n,"FreScoper")},m(n,o){r(n,t,o)},d(n){n&&p(t)}}}function St(a){let t;return{c(){t=J("FreValidator")},l(n){t=K(n,"FreValidator")},m(n,o){r(n,t,o)},d(n){n&&p(t)}}}function Pt(a){let t;return{c(){t=J("FreTyper")},l(n){t=K(n,"FreTyper")},m(n,o){r(n,t,o)},d(n){n&&p(t)}}}function Rt(a){let t;return{c(){t=J("FreReader")},l(n){t=K(n,"FreReader")},m(n,o){r(n,t,o)},d(n){n&&p(t)}}}function Lt(a){let t;return{c(){t=J("FreWriter")},l(n){t=K(n,"FreWriter")},m(n,o){r(n,t,o)},d(n){n&&p(t)}}}function It(a){let t;return{c(){t=J("FreStdlib")},l(n){t=K(n,"FreStdlib")},m(n,o){r(n,t,o)},d(n){n&&p(t)}}}function Ht(a){let t,n,o,l,c,_,i=`There are two series of interfaces that make Freon and its generated code extensible and flexible. The first series are the interfaces
	implemented by the generated code:`,u,b,z,E,L,g=`An object that implements <code>FreEnvironment</code> holds the information about where to find all parts of the language environment. It is
	usually a singleton object.`,S,R,q,H=`<code class="language-ts"><span class="token comment">/* File: core/src/environment/FreEnvironment.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreEnvironment</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Creates a new model, an implementation of the language defined in the .ast file
	 * @param name
	 */</span>
	<span class="token function">newModel</span><span class="token punctuation">(</span>modelName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FreModel<span class="token punctuation">;</span>

	scoper<span class="token operator">:</span> FreScoper<span class="token punctuation">;</span>
	typer<span class="token operator">:</span> FreTyper<span class="token punctuation">;</span>
	validator<span class="token operator">:</span> FreValidator<span class="token punctuation">;</span>
	editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>
	stdlib<span class="token operator">:</span> FreStdlib<span class="token punctuation">;</span>
	writer<span class="token operator">:</span> FreWriter<span class="token punctuation">;</span>
	reader<span class="token operator">:</span> FreReader<span class="token punctuation">;</span>

	<span class="token comment">// projectionalEditorComponent: ProjectionalEditor;</span>
	languageName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
	unitNames<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	fileExtensions<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,G,M,Ie,ce,A,N=`An object that implements <code>FreScoper</code> is able to return the named elements that are visible for a certain AST node. This node can
	be a ‘normal’ model element, or it can be a namespace. If the node is a ‘normal’ element, the names visbible in its (lexical) surrounding namespace
	are returned.`,w,I,F="If you want to write your own scoper you will need to implement this interface.",k,$,v,ue=`<code class="language-ts"><span class="token comment">/* File: core/src/scoper/FreScoper.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreScoper</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns the element to which the 'pathname' refers. If the elment cannot be found, or if the element is
	 * not visible (private) from the location of 'modelelement', then null is returned.
	 * If present, then the search is limited to elements which type is 'metatype'.
	 *
	 * @param modelelement: the containing element, where 'pathname' should be visible
	 * @param doNotSearch: the role or property name of the element that we are searching for
	 * @param pathname: the name or series of names of the element that we are searching for
	 * @param metatype: the metatype of the element that we are searching for
	 */</span>
	<span class="token function">resolvePathName</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> doNotSearch<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> pathname<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FreNamedElement<span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Returns true if 'name' is known in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns true if the element named 'name'
	 *   is an instance of 'metatype'. There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns true if the element named 'name'
	 *   is known in the namespace containing 'modelelement', without looking in surrounding namespaces.
	 *
	 * @param modelElement
	 * @param name
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">isInScope</span><span class="token punctuation">(</span>modelElement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Returns all elements that are visible in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns all elements that are an instance of 'metatype'.
	 *   There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns all elements that are visible in
	 *   the namespace containing 'modelelement', without looking in surrounding namespaces. Elements in
	 *   surrounding namespaces are normally shadowed by elements with the same name in an inner namespace.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">getVisibleElements</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> FreNamedElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Returns the element named 'name' which is visible in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns the element that is an instance of 'metatype'.
	 *   There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns the element that is visible in
	 *   the namespace containing 'modelelement', without looking in surrounding namespaces. Elements in
	 *   surrounding namespaces are normally shadowed by elements with the same name in an inner namespace.
	 *
	 * @param modelelement
	 * @param name
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">getFromVisibleElements</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> FreNamedElement<span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Does the same as getVisibleElements, only it does not return the elements,
	 *   but the names of the elements.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">getVisibleNames</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,Q,x,me,je,fe,Fn=`An object that implements <code>FreValidator</code> is able to validate a node in the AST. The validation can be only on the node itself, or
	it can include all child-nodes recursively.`,We,ke,En=`The errors that are found are returned in the form of a list of <code>FreError</code> objects. Every <code>FreError</code>
	holds a message, and a reference to the node that is faulty.`,De,de,Tn="If you want to write your own validator you will need to implement this interface.",Oe,he,Be,pt=`<code class="language-ts"><span class="token comment">/* File: core/src/validator/FreValidator.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreValidator</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns a list of errors on 'modelelement' according to the validation rules
	 * stated in the validation definition. If 'includeChildren' is true, the child
	 * nodes of 'modelelement' in the AST are also checked.
	 *
	 * @param modelelement
	 * @param includeChildren
	 */</span>
	<span class="token function">validate</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> includeChildren<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> FreError<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,ze,te,Cn="FreError",Ue,ge,Ge,lt=`<code class="language-ts"><span class="token comment">/* File: core/src/validator/FreValidator.ts */</span>

<span class="token comment">/**
 * An error consists of a message coupled to the faulty AST node, either a model
 * element or a list of model elements.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">FreError</span> <span class="token punctuation">&#123;</span>
	message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// human-readable error message</span>
	reportedOn<span class="token operator">:</span> FreElement <span class="token operator">|</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// the model element that does not comply</span>
	locationdescription<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// human-readable indication of 'reportedOn'</span>
	severity<span class="token operator">:</span> FreErrorSeverity<span class="token punctuation">;</span> <span class="token comment">// indication of how serious the error is, default is 'ToDo'</span>
<span class="token punctuation">&#125;</span></code>`,Je,X,bn,Ke,_e,Sn="An object that implements <code>FreTyper</code> is answer a set of question concerning the type of a node in the AST.",Qe,be,Pn="If you want to write your own typer you will need to implement this interface.",Xe,ye,Ye,rt=`<code class="language-ts"><span class="token comment">/* File: core/src/typer/FreTyper.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreTyper</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns the type of 'modelelement' according to the type rules in the Typer Definition
	 * @param modelelement
	 */</span>
	<span class="token function">inferType</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> FreElement<span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if the type that inferType(elem1) returns equals the type inferType(elem2) returns.
	 * This is a strict equal.
	 * @param elem1
	 * @param elem2
	 */</span>
	<span class="token function">equalsType</span><span class="token punctuation">(</span>elem1<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> elem2<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if the type that inferType(elem1) returns conforms to the type inferType(elem2) returns, according to
	 * the type rules in the Typer definition. The direction is elem2 conforms to elem1.
	 * @param elem1
	 * @param elem2
	 */</span>
	<span class="token function">conformsTo</span><span class="token punctuation">(</span>elem1<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> elem2<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * @param typelist1
	 * @param typelist2
	 */</span>
	<span class="token function">conformList</span><span class="token punctuation">(</span>typelist1<span class="token operator">:</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> typelist2<span class="token operator">:</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if 'elem' is marked as 'type' in the Typer definition
	 * @param elem
	 */</span>
	<span class="token function">isType</span><span class="token punctuation">(</span>elem<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * This interface is being used to implement the three-tier approach.
 * Both the generated and custom type providers should implement this interface.
 * The generated class that implement the FreTyper interface connects all the classes
 * that implement this interface and returns the correct value to the (external) user.
 *
 * When the implementor of this interface does not provide for a result of one of the methods,
 * this method should return 'null'.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreTyperPart</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns the type of 'modelelement' according to the type rules in the Typer Definition.
	 * @param modelelement
	 */</span>
	<span class="token function">inferType</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> FreElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if the type that inferType(elem1) returns equals the type inferType(elem2) returns.
	 * This is a strict equal.
	 * @param elem1
	 * @param elem2
	 */</span>
	<span class="token function">equalsType</span><span class="token punctuation">(</span>elem1<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> elem2<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if the type that inferType(elem1) returns conforms to the type inferType(elem2) returns, according to
	 * the type rules in the Typer definition. The direction is elem2 conforms to elem1.
	 * @param elem1
	 * @param elem2
	 */</span>
	<span class="token function">conformsTo</span><span class="token punctuation">(</span>elem1<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> elem2<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * @param typelist1
	 * @param typelist2
	 */</span>
	<span class="token function">conformList</span><span class="token punctuation">(</span>typelist1<span class="token operator">:</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> typelist2<span class="token operator">:</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if 'elem' is marked as 'type' in the Typer definition.
	 * @param elem
	 */</span>
	<span class="token function">isType</span><span class="token punctuation">(</span>elem<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,Ze,Y,yn,en,ve,Rn="An object that implements <code>FreReader</code> is able to read a string representation of a node in the AST.",nn,$e,Ln="If you want to write your own parser/filereader you will need to implement this interface.",tn,we,sn,it=`<code class="language-ts"><span class="token comment">/* File: core/src/reader/FreReader.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreReader</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Parses the 'input' into a model unit of type 'metatype'.
	 * May throw an Error if a syntax error occurs.
	 * @param input
	 * @param metatype
	 */</span>
	<span class="token function">readFromString</span><span class="token punctuation">(</span>input<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FreElement<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,an,Z,vn,on,Fe,In="An object that implements <code>FreWriter</code> is able to build a string representation of a node in the AST.",pn,Ee,Hn="If you want to write your own unparser/writer you will need to implement this interface.",ln,Te,rn,ct=`<code class="language-ts"><span class="token comment">/* File: core/src/writer/FreWriter.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreWriter</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns a string representation of 'modelelement'.
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 * Note that the single-line-string cannot be parsed into a correct model.
	 *
	 * @param modelelement
	 * @param startIndent
	 * @param short
	 */</span>
	<span class="token function">writeToString</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> startIndent<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> short<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns a string representation of 'modelelement', divided into an array of strings,
	 * each of which contain a single line (without newline).
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 *
	 * @param modelelement
	 * @param startIndent
	 * @param short
	 */</span>
	<span class="token function">writeToLines</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> startIndent<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> short<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns the name of 'modelelement' if it has one, else returns
	 * a short unparsing of 'modelelement'.
	 * Used by the validator to produce readable error messages.
	 *
	 * @param modelelement
	 */</span>
	<span class="token function">writeNameOnly</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,cn,ee,$n,un,Ce,Mn="An object that implements <code>FreStdlib</code> holds a number of predefined AST nodes, which can be referred to in the model AST.",mn,Se,qn="If you want to write your own standard library you will need to implement this interface.",fn,Pe,kn,ut=`<code class="language-ts"><span class="token comment">/* File: core/src/stdlib/FreStdlib.ts  */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreStdlib</span> <span class="token punctuation">&#123;</span>
	elements<span class="token operator">:</span> FreNamedElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns the element named 'name', if it can be found in this library.
	 * When 'metatype' is provided, the element is only returned when it is
	 * an instance of this metatype.
	 * @param name
	 * @param metatype
	 */</span>
	<span class="token function">find</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FreNamedElement<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,dn,Re,An=`The second series of interfaces are those that define parts of the
	<a href="/Documentation/Under_the_Hood/Editor_Framework">Freon Editor Framework</a>.`,hn,Le,gn;t=new zn({props:{prevLink:Un,nextLink:Gn}});function mt(e){a[1](e)}let Nn={tag:"h1",id:"the-fre-tool-interfaces-1",$$slots:{default:[Et]},$$scope:{ctx:a}};a[0][0]!==void 0&&(Nn.intersecting=a[0][0]),o=new re({props:Nn}),se.push(()=>le(o,"intersecting",mt));function ft(e){a[2](e)}let xn={tag:"h2",id:"freenvironment-2",$$slots:{default:[Tt]},$$scope:{ctx:a}};a[0][1]!==void 0&&(xn.intersecting=a[0][1]),b=new re({props:xn}),se.push(()=>le(b,"intersecting",ft));function kt(e){a[3](e)}let Vn={tag:"h2",id:"frescoper-3",$$slots:{default:[Ct]},$$scope:{ctx:a}};a[0][2]!==void 0&&(Vn.intersecting=a[0][2]),M=new re({props:Vn}),se.push(()=>le(M,"intersecting",kt));function dt(e){a[4](e)}let jn={tag:"h2",id:"frevalidator-4",$$slots:{default:[St]},$$scope:{ctx:a}};a[0][3]!==void 0&&(jn.intersecting=a[0][3]),x=new re({props:jn}),se.push(()=>le(x,"intersecting",dt));function ht(e){a[5](e)}let Wn={tag:"h1",id:"fretyper-5",$$slots:{default:[Pt]},$$scope:{ctx:a}};a[0][4]!==void 0&&(Wn.intersecting=a[0][4]),X=new re({props:Wn}),se.push(()=>le(X,"intersecting",ht));function gt(e){a[6](e)}let Dn={tag:"h2",id:"frereader-6",$$slots:{default:[Rt]},$$scope:{ctx:a}};a[0][5]!==void 0&&(Dn.intersecting=a[0][5]),Y=new re({props:Dn}),se.push(()=>le(Y,"intersecting",gt));function _t(e){a[7](e)}let On={tag:"h2",id:"frewriter-7",$$slots:{default:[Lt]},$$scope:{ctx:a}};a[0][6]!==void 0&&(On.intersecting=a[0][6]),Z=new re({props:On}),se.push(()=>le(Z,"intersecting",_t));function bt(e){a[8](e)}let Bn={tag:"h2",id:"frestdlib-8",$$slots:{default:[It]},$$scope:{ctx:a}};return a[0][7]!==void 0&&(Bn.intersecting=a[0][7]),ee=new re({props:Bn}),se.push(()=>le(ee,"intersecting",bt)),Le=new zn({props:{prevLink:Un,nextLink:Gn}}),{c(){V(t.$$.fragment),n=m(),V(o.$$.fragment),c=m(),_=d("p"),_.textContent=i,u=m(),V(b.$$.fragment),E=m(),L=d("p"),L.innerHTML=g,S=m(),R=d("pre"),q=new ae(!1),G=m(),V(M.$$.fragment),ce=m(),A=d("p"),A.innerHTML=N,w=m(),I=d("p"),I.textContent=F,k=m(),$=d("pre"),v=new ae(!1),Q=m(),V(x.$$.fragment),je=m(),fe=d("p"),fe.innerHTML=Fn,We=m(),ke=d("p"),ke.innerHTML=En,De=m(),de=d("p"),de.textContent=Tn,Oe=m(),he=d("pre"),Be=new ae(!1),ze=m(),te=d("h3"),te.textContent=Cn,Ue=m(),ge=d("pre"),Ge=new ae(!1),Je=m(),V(X.$$.fragment),Ke=m(),_e=d("p"),_e.innerHTML=Sn,Qe=m(),be=d("p"),be.textContent=Pn,Xe=m(),ye=d("pre"),Ye=new ae(!1),Ze=m(),V(Y.$$.fragment),en=m(),ve=d("p"),ve.innerHTML=Rn,nn=m(),$e=d("p"),$e.textContent=Ln,tn=m(),we=d("pre"),sn=new ae(!1),an=m(),V(Z.$$.fragment),on=m(),Fe=d("p"),Fe.innerHTML=In,pn=m(),Ee=d("p"),Ee.textContent=Hn,ln=m(),Te=d("pre"),rn=new ae(!1),cn=m(),V(ee.$$.fragment),un=m(),Ce=d("p"),Ce.innerHTML=Mn,mn=m(),Se=d("p"),Se.textContent=qn,fn=m(),Pe=d("pre"),kn=new ae(!1),dn=m(),Re=d("p"),Re.innerHTML=An,hn=m(),V(Le.$$.fragment),this.h()},l(e){j(t.$$.fragment,e),n=f(e),j(o.$$.fragment,e),c=f(e),_=h(e,"P",{"data-svelte-h":!0}),T(_)!=="svelte-kzmw3g"&&(_.textContent=i),u=f(e),j(b.$$.fragment,e),E=f(e),L=h(e,"P",{"data-svelte-h":!0}),T(L)!=="svelte-78phx6"&&(L.innerHTML=g),S=f(e),R=h(e,"PRE",{class:!0});var s=C(R);q=oe(s,!1),s.forEach(p),G=f(e),j(M.$$.fragment,e),ce=f(e),A=h(e,"P",{"data-svelte-h":!0}),T(A)!=="svelte-1eqjga1"&&(A.innerHTML=N),w=f(e),I=h(e,"P",{"data-svelte-h":!0}),T(I)!=="svelte-wlzax3"&&(I.textContent=F),k=f(e),$=h(e,"PRE",{class:!0});var He=C($);v=oe(He,!1),He.forEach(p),Q=f(e),j(x.$$.fragment,e),je=f(e),fe=h(e,"P",{"data-svelte-h":!0}),T(fe)!=="svelte-vv54nt"&&(fe.innerHTML=Fn),We=f(e),ke=h(e,"P",{"data-svelte-h":!0}),T(ke)!=="svelte-uzamb7"&&(ke.innerHTML=En),De=f(e),de=h(e,"P",{"data-svelte-h":!0}),T(de)!=="svelte-1q8rn4n"&&(de.textContent=Tn),Oe=f(e),he=h(e,"PRE",{class:!0});var Me=C(he);Be=oe(Me,!1),Me.forEach(p),ze=f(e),te=h(e,"H3",{id:!0,"data-svelte-h":!0}),T(te)!=="svelte-hvw0c6"&&(te.textContent=Cn),Ue=f(e),ge=h(e,"PRE",{class:!0});var qe=C(ge);Ge=oe(qe,!1),qe.forEach(p),Je=f(e),j(X.$$.fragment,e),Ke=f(e),_e=h(e,"P",{"data-svelte-h":!0}),T(_e)!=="svelte-16q5big"&&(_e.innerHTML=Sn),Qe=f(e),be=h(e,"P",{"data-svelte-h":!0}),T(be)!=="svelte-1u7mukf"&&(be.textContent=Pn),Xe=f(e),ye=h(e,"PRE",{class:!0});var Ae=C(ye);Ye=oe(Ae,!1),Ae.forEach(p),Ze=f(e),j(Y.$$.fragment,e),en=f(e),ve=h(e,"P",{"data-svelte-h":!0}),T(ve)!=="svelte-vb5j3k"&&(ve.innerHTML=Rn),nn=f(e),$e=h(e,"P",{"data-svelte-h":!0}),T($e)!=="svelte-1cqz1j8"&&($e.textContent=Ln),tn=f(e),we=h(e,"PRE",{class:!0});var Ne=C(we);sn=oe(Ne,!1),Ne.forEach(p),an=f(e),j(Z.$$.fragment,e),on=f(e),Fe=h(e,"P",{"data-svelte-h":!0}),T(Fe)!=="svelte-1begltm"&&(Fe.innerHTML=In),pn=f(e),Ee=h(e,"P",{"data-svelte-h":!0}),T(Ee)!=="svelte-81lps7"&&(Ee.textContent=Hn),ln=f(e),Te=h(e,"PRE",{class:!0});var xe=C(Te);rn=oe(xe,!1),xe.forEach(p),cn=f(e),j(ee.$$.fragment,e),un=f(e),Ce=h(e,"P",{"data-svelte-h":!0}),T(Ce)!=="svelte-fmupk"&&(Ce.innerHTML=Mn),mn=f(e),Se=h(e,"P",{"data-svelte-h":!0}),T(Se)!=="svelte-1r431fz"&&(Se.textContent=qn),fn=f(e),Pe=h(e,"PRE",{class:!0});var Ve=C(Pe);kn=oe(Ve,!1),Ve.forEach(p),dn=f(e),Re=h(e,"P",{"data-svelte-h":!0}),T(Re)!=="svelte-u33zuy"&&(Re.innerHTML=An),hn=f(e),j(Le.$$.fragment,e),this.h()},h(){q.a=null,y(R,"class","language-ts"),v.a=null,y($,"class","language-ts"),Be.a=null,y(he,"class","language-ts"),y(te,"id","freerror-1"),Ge.a=null,y(ge,"class","language-ts"),Ye.a=null,y(ye,"class","language-ts"),sn.a=null,y(we,"class","language-ts"),rn.a=null,y(Te,"class","language-ts"),kn.a=null,y(Pe,"class","language-ts")},m(e,s){W(t,e,s),r(e,n,s),W(o,e,s),r(e,c,s),r(e,_,s),r(e,u,s),W(b,e,s),r(e,E,s),r(e,L,s),r(e,S,s),r(e,R,s),q.m(H,R),r(e,G,s),W(M,e,s),r(e,ce,s),r(e,A,s),r(e,w,s),r(e,I,s),r(e,k,s),r(e,$,s),v.m(ue,$),r(e,Q,s),W(x,e,s),r(e,je,s),r(e,fe,s),r(e,We,s),r(e,ke,s),r(e,De,s),r(e,de,s),r(e,Oe,s),r(e,he,s),Be.m(pt,he),r(e,ze,s),r(e,te,s),r(e,Ue,s),r(e,ge,s),Ge.m(lt,ge),r(e,Je,s),W(X,e,s),r(e,Ke,s),r(e,_e,s),r(e,Qe,s),r(e,be,s),r(e,Xe,s),r(e,ye,s),Ye.m(rt,ye),r(e,Ze,s),W(Y,e,s),r(e,en,s),r(e,ve,s),r(e,nn,s),r(e,$e,s),r(e,tn,s),r(e,we,s),sn.m(it,we),r(e,an,s),W(Z,e,s),r(e,on,s),r(e,Fe,s),r(e,pn,s),r(e,Ee,s),r(e,ln,s),r(e,Te,s),rn.m(ct,Te),r(e,cn,s),W(ee,e,s),r(e,un,s),r(e,Ce,s),r(e,mn,s),r(e,Se,s),r(e,fn,s),r(e,Pe,s),kn.m(ut,Pe),r(e,dn,s),r(e,Re,s),r(e,hn,s),W(Le,e,s),gn=!0},p(e,[s]){const He={};s&1024&&(He.$$scope={dirty:s,ctx:e}),!l&&s&1&&(l=!0,He.intersecting=e[0][0],pe(()=>l=!1)),o.$set(He);const Me={};s&1024&&(Me.$$scope={dirty:s,ctx:e}),!z&&s&1&&(z=!0,Me.intersecting=e[0][1],pe(()=>z=!1)),b.$set(Me);const qe={};s&1024&&(qe.$$scope={dirty:s,ctx:e}),!Ie&&s&1&&(Ie=!0,qe.intersecting=e[0][2],pe(()=>Ie=!1)),M.$set(qe);const Ae={};s&1024&&(Ae.$$scope={dirty:s,ctx:e}),!me&&s&1&&(me=!0,Ae.intersecting=e[0][3],pe(()=>me=!1)),x.$set(Ae);const Ne={};s&1024&&(Ne.$$scope={dirty:s,ctx:e}),!bn&&s&1&&(bn=!0,Ne.intersecting=e[0][4],pe(()=>bn=!1)),X.$set(Ne);const xe={};s&1024&&(xe.$$scope={dirty:s,ctx:e}),!yn&&s&1&&(yn=!0,xe.intersecting=e[0][5],pe(()=>yn=!1)),Y.$set(xe);const Ve={};s&1024&&(Ve.$$scope={dirty:s,ctx:e}),!vn&&s&1&&(vn=!0,Ve.intersecting=e[0][6],pe(()=>vn=!1)),Z.$set(Ve);const wn={};s&1024&&(wn.$$scope={dirty:s,ctx:e}),!$n&&s&1&&($n=!0,wn.intersecting=e[0][7],pe(()=>$n=!1)),ee.$set(wn)},i(e){gn||(D(t.$$.fragment,e),D(o.$$.fragment,e),D(b.$$.fragment,e),D(M.$$.fragment,e),D(x.$$.fragment,e),D(X.$$.fragment,e),D(Y.$$.fragment,e),D(Z.$$.fragment,e),D(ee.$$.fragment,e),D(Le.$$.fragment,e),gn=!0)},o(e){O(t.$$.fragment,e),O(o.$$.fragment,e),O(b.$$.fragment,e),O(M.$$.fragment,e),O(x.$$.fragment,e),O(X.$$.fragment,e),O(Y.$$.fragment,e),O(Z.$$.fragment,e),O(ee.$$.fragment,e),O(Le.$$.fragment,e),gn=!1},d(e){e&&(p(n),p(c),p(_),p(u),p(E),p(L),p(S),p(R),p(G),p(ce),p(A),p(w),p(I),p(k),p($),p(Q),p(je),p(fe),p(We),p(ke),p(De),p(de),p(Oe),p(he),p(ze),p(te),p(Ue),p(ge),p(Je),p(Ke),p(_e),p(Qe),p(be),p(Xe),p(ye),p(Ze),p(en),p(ve),p(nn),p($e),p(tn),p(we),p(an),p(on),p(Fe),p(pn),p(Ee),p(ln),p(Te),p(cn),p(un),p(Ce),p(mn),p(Se),p(fn),p(Pe),p(dn),p(Re),p(hn)),B(t,e),B(o,e),B(b,e),B(M,e),B(x,e),B(X,e),B(Y,e),B(Z,e),B(ee,e),B(Le,e)}}}let Un="/Documentation/Under_the_Hood/Editor_Interfaces",Gn="/Documentation/Terminology";function Mt(a,t,n){let o;et(a,U,g=>n(9,o=g)),ne(U,o=[{title:"The Fre-tool Interfaces",visible:!1,ref:"#the-fre-tool-interfaces-1"},{title:"FreEnvironment",visible:!1,ref:"#freenvironment-2"},{title:"FreScoper",visible:!1,ref:"#frescoper-3"},{title:"FreValidator",visible:!1,ref:"#frevalidator-4"},{title:"FreTyper",visible:!1,ref:"#fretyper-5"},{title:"FreReader",visible:!1,ref:"#frereader-6"},{title:"FreWriter",visible:!1,ref:"#frewriter-7"},{title:"FreStdlib",visible:!1,ref:"#frestdlib-8"}],o);let l=[];yt(()=>{document.querySelectorAll("pre").forEach(S=>{const R=document.createElement("div");R.className="copy-prompt";const q=document.createElement("p");q.innerHTML="👆 Click to copy",q.className="copy-prompt-p";const H=document.createElement("img");H.src="/icons/copy-icon.svg",H.className="copy-prompt-img",R.appendChild(H),R.appendChild(q),S.appendChild(R),S.querySelector(".copy-prompt > p").addEventListener("click",G=>{wt(S.querySelector("code").textContent),S.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{S.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function c(g){a.$$.not_equal(l[0],g)&&(l[0]=g,n(0,l))}function _(g){a.$$.not_equal(l[1],g)&&(l[1]=g,n(0,l))}function i(g){a.$$.not_equal(l[2],g)&&(l[2]=g,n(0,l))}function u(g){a.$$.not_equal(l[3],g)&&(l[3]=g,n(0,l))}function b(g){a.$$.not_equal(l[4],g)&&(l[4]=g,n(0,l))}function z(g){a.$$.not_equal(l[5],g)&&(l[5]=g,n(0,l))}function E(g){a.$$.not_equal(l[6],g)&&(l[6]=g,n(0,l))}function L(g){a.$$.not_equal(l[7],g)&&(l[7]=g,n(0,l))}return a.$$.update=()=>{a.$$.dirty&1&&ne(U,o[0].visible=l[0],o),a.$$.dirty&1&&ne(U,o[1].visible=l[1],o),a.$$.dirty&1&&ne(U,o[2].visible=l[2],o),a.$$.dirty&1&&ne(U,o[3].visible=l[3],o),a.$$.dirty&1&&ne(U,o[4].visible=l[4],o),a.$$.dirty&1&&ne(U,o[5].visible=l[5],o),a.$$.dirty&1&&ne(U,o[6].visible=l[6],o),a.$$.dirty&1&&ne(U,o[7].visible=l[7],o)},[l,c,_,i,u,b,z,E,L]}class qt extends at{constructor(t){super(),ot(this,t,Mt,Ht,Zn,{})}}function Jn(a,t,n){const o=a.slice();return o[6]=t[n],o[8]=n,o}function Kn(a,t,n){const o=a.slice();return o[6]=t[n],o[8]=n,o}function At(a){let t,n;return{c(){t=d("img"),this.h()},l(o){t=h(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){y(t,"class","page-toc-small-img"),st(t.src,n="/icons/down-arrow.png")||y(t,"src",n),y(t,"alt","arrow down")},m(o,l){r(o,t,l)},d(o){o&&p(t)}}}function Nt(a){let t,n;return{c(){t=d("img"),this.h()},l(o){t=h(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){y(t,"class","page-toc-small-img"),st(t.src,n="/icons/upload.png")||y(t,"src",n),y(t,"alt","arrow up")},m(o,l){r(o,t,l)},d(o){o&&p(t)}}}function Qn(a){let t,n,o=_n(a[0]),l=[];for(let c=0;c<o.length;c+=1)l[c]=Xn(Kn(a,o,c));return{c(){t=d("div"),n=d("ul");for(let c=0;c<l.length;c+=1)l[c].c();this.h()},l(c){t=h(c,"DIV",{class:!0});var _=C(t);n=h(_,"UL",{class:!0});var i=C(n);for(let u=0;u<l.length;u+=1)l[u].l(i);i.forEach(p),_.forEach(p),this.h()},h(){y(n,"class","page-ul"),y(t,"class","toc-details")},m(c,_){r(c,t,_),P(t,n);for(let i=0;i<l.length;i+=1)l[i]&&l[i].m(n,null)},p(c,_){if(_&5){o=_n(c[0]);let i;for(i=0;i<o.length;i+=1){const u=Kn(c,o,i);l[i]?l[i].p(u,_):(l[i]=Xn(u),l[i].c(),l[i].m(n,null))}for(;i<l.length;i+=1)l[i].d(1);l.length=o.length}},d(c){c&&p(t),nt(l,c)}}}function Xn(a){let t,n,o=a[6].title+"",l,c,_;return{c(){t=d("li"),n=d("a"),l=J(o),_=m(),this.h()},l(i){t=h(i,"LI",{class:!0});var u=C(t);n=h(u,"A",{href:!0});var b=C(n);l=K(b,o),b.forEach(p),_=f(u),u.forEach(p),this.h()},h(){y(n,"href",c=a[6].ref),ie(n,"page-visible",a[8]===a[2]),ie(n,"page-nonvisible",a[8]!==a[2]),y(t,"class","page-toc-text")},m(i,u){r(i,t,u),P(t,n),P(n,l),P(t,_)},p(i,u){u&1&&o!==(o=i[6].title+"")&&tt(l,o),u&1&&c!==(c=i[6].ref)&&y(n,"href",c),u&4&&ie(n,"page-visible",i[8]===i[2]),u&4&&ie(n,"page-nonvisible",i[8]!==i[2])},d(i){i&&p(t)}}}function Yn(a){let t,n,o=a[6].title+"",l,c,_;return{c(){t=d("li"),n=d("a"),l=J(o),_=m(),this.h()},l(i){t=h(i,"LI",{class:!0});var u=C(t);n=h(u,"A",{href:!0});var b=C(n);l=K(b,o),b.forEach(p),_=f(u),u.forEach(p),this.h()},h(){y(n,"href",c=a[6].ref),ie(n,"page-visible",a[8]===a[2]),ie(n,"page-nonvisible",a[8]!==a[2]),y(t,"class","page-toc-text")},m(i,u){r(i,t,u),P(t,n),P(n,l),P(t,_)},p(i,u){u&1&&o!==(o=i[6].title+"")&&tt(l,o),u&1&&c!==(c=i[6].ref)&&y(n,"href",c),u&4&&ie(n,"page-visible",i[8]===i[2]),u&4&&ie(n,"page-nonvisible",i[8]!==i[2])},d(i){i&&p(t)}}}function xt(a){let t,n,o,l="On this page ...",c,_,i,u,b,z,E,L,g,S,R="On this page",q,H,G,M,Ie;function ce(k,$){return k[1]?Nt:At}let A=ce(a),N=A(a),w=a[1]&&Qn(a);b=new Ft({}),E=new qt({});let I=_n(a[0]),F=[];for(let k=0;k<I.length;k+=1)F[k]=Yn(Jn(a,I,k));return{c(){t=d("div"),n=d("div"),o=d("p"),o.textContent=l,c=m(),_=d("button"),N.c(),i=m(),w&&w.c(),u=m(),V(b.$$.fragment),z=m(),V(E.$$.fragment),L=m(),g=d("nav"),S=d("h3"),S.textContent=R,q=m(),H=d("ul");for(let k=0;k<F.length;k+=1)F[k].c();this.h()},l(k){t=h(k,"DIV",{class:!0});var $=C(t);n=h($,"DIV",{class:!0});var v=C(n);o=h(v,"P",{class:!0,"data-svelte-h":!0}),T(o)!=="svelte-1929lhs"&&(o.textContent=l),c=f(v),_=h(v,"BUTTON",{class:!0});var ue=C(_);N.l(ue),ue.forEach(p),v.forEach(p),i=f($),w&&w.l($),u=f($),j(b.$$.fragment,$),z=f($),j(E.$$.fragment,$),$.forEach(p),L=f(k),g=h(k,"NAV",{class:!0});var Q=C(g);S=h(Q,"H3",{class:!0,"data-svelte-h":!0}),T(S)!=="svelte-1hgt7fi"&&(S.textContent=R),q=f(Q),H=h(Q,"UL",{class:!0});var x=C(H);for(let me=0;me<F.length;me+=1)F[me].l(x);x.forEach(p),Q.forEach(p),this.h()},h(){y(o,"class","page-toc-small-title"),y(_,"class","page-toc-small-expand-button"),y(n,"class","page-toc-small"),y(t,"class","page-main"),y(S,"class","page-toc-title"),y(H,"class","page-ul"),y(g,"class","page-toc")},m(k,$){r(k,t,$),P(t,n),P(n,o),P(n,c),P(n,_),N.m(_,null),P(t,i),w&&w.m(t,null),P(t,u),W(b,t,null),P(t,z),W(E,t,null),r(k,L,$),r(k,g,$),P(g,S),P(g,q),P(g,H);for(let v=0;v<F.length;v+=1)F[v]&&F[v].m(H,null);G=!0,M||(Ie=vt(_,"click",a[4]),M=!0)},p(k,[$]){if(A!==(A=ce(k))&&(N.d(1),N=A(k),N&&(N.c(),N.m(_,null))),k[1]?w?w.p(k,$):(w=Qn(k),w.c(),w.m(t,u)):w&&(w.d(1),w=null),$&5){I=_n(k[0]);let v;for(v=0;v<I.length;v+=1){const ue=Jn(k,I,v);F[v]?F[v].p(ue,$):(F[v]=Yn(ue),F[v].c(),F[v].m(H,null))}for(;v<F.length;v+=1)F[v].d(1);F.length=I.length}},i(k){G||(D(b.$$.fragment,k),D(E.$$.fragment,k),G=!0)},o(k){O(b.$$.fragment,k),O(E.$$.fragment,k),G=!1},d(k){k&&(p(t),p(L),p(g)),N.d(),w&&w.d(),B(b),B(E),nt(F,k),M=!1,Ie()}}}function Vt(a,t,n){let o,l;et(a,U,b=>n(0,l=b));let c=!1;function _(b){let z=o;for(let E=0;E<b.length;E++)if(b[E].visible)return E;return z}function i(){n(1,c=!c)}const u=()=>{i()};return a.$$.update=()=>{a.$$.dirty&1&&n(2,o=_(l))},[l,c,o,i,u]}class zt extends at{constructor(t){super(),ot(this,t,Vt,xt,Zn,{})}}export{zt as component};
//# sourceMappingURL=61.b_1Rm-yu.js.map
