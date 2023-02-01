import{S as A,i as V,s as H,e as c,t as m,k as x,c as u,a as k,h,d as n,m as P,b as j,g as p,H as r,J as _}from"../../../chunks/vendor-0dc77bd0.js";function C(N){let s,y,d,t,w,i,S,E,f,l,v,b,o,W=`<code class="language-ts"><span class="token comment">/* File: core/src/scoper/PiScoper.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">PiScoper</span> <span class="token punctuation">&#123;</span>

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
	<span class="token function">resolvePathName</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> PiElement<span class="token punctuation">,</span> doNotSearch<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> pathname<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> PiNamedElement<span class="token punctuation">;</span>

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
	<span class="token function">isInScope</span><span class="token punctuation">(</span>modelElement<span class="token operator">:</span> PiElement<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

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
	<span class="token function">getVisibleElements</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> PiElement<span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> PiNamedElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

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
	<span class="token function">getFromVisibleElements</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> PiElement<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> PiNamedElement<span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Does the same as getVisibleElements, only it does not return the elements,
	 *   but the names of the elements.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">getVisibleNames</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> PiElement<span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`;return{c(){s=c("h1"),y=m("PiScoper"),d=x(),t=c("p"),w=m("An object that implements "),i=c("code"),S=m("PiScoper"),E=m(` is able to return the named elements that are visible
for a certain AST node. This node can be a \u2018normal\u2019 model element, or it can be a namespace.
If the node is a \u2018normal\u2019 element, the names visbible in its (lexical) surrounding namespace
are returned.`),f=x(),l=c("p"),v=m("If you want to write your own scoper you will need to implement this interface."),b=x(),o=c("pre"),this.h()},l(e){s=u(e,"H1",{});var a=k(s);y=h(a,"PiScoper"),a.forEach(n),d=P(e),t=u(e,"P",{});var g=k(t);w=h(g,"An object that implements "),i=u(g,"CODE",{});var I=k(i);S=h(I,"PiScoper"),I.forEach(n),E=h(g,` is able to return the named elements that are visible
for a certain AST node. This node can be a \u2018normal\u2019 model element, or it can be a namespace.
If the node is a \u2018normal\u2019 element, the names visbible in its (lexical) surrounding namespace
are returned.`),g.forEach(n),f=P(e),l=u(e,"P",{});var T=k(l);v=h(T,"If you want to write your own scoper you will need to implement this interface."),T.forEach(n),b=P(e),o=u(e,"PRE",{class:!0});var R=k(o);R.forEach(n),this.h()},h(){j(o,"class","language-ts")},m(e,a){p(e,s,a),r(s,y),p(e,d,a),p(e,t,a),r(t,w),r(t,i),r(i,S),r(t,E),p(e,f,a),p(e,l,a),r(l,v),p(e,b,a),p(e,o,a),o.innerHTML=W},p:_,i:_,o:_,d(e){e&&n(s),e&&n(d),e&&n(t),e&&n(f),e&&n(l),e&&n(b),e&&n(o)}}}class F extends A{constructor(s){super();V(this,s,null,C,H,{})}}export{F as default};
