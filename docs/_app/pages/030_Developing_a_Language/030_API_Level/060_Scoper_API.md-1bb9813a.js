import{S as le,i as re,s as ie,e as r,t,k as y,c as i,a as c,h as o,d as n,m as b,b as ne,g as p,H as a,J as K}from"../../../chunks/vendor-0dc77bd0.js";function ce(ae){let u,Y,x,m,z,v,I,W,P,d,se=`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">PiScoper</span> <span class="token punctuation">&#123;</span>

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
<span class="token punctuation">&#125;</span></code>`,N,g,D,T,l,F,E,H,V,w,A,j,S,M,q,L,h,G,_,J,B,C,f,te=`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">EntityEnvironment</span> <span class="token keyword">implements</span> <span class="token class-name">PiEnvironment</span> <span class="token punctuation">&#123;</span>
    <span class="token operator">...</span>
    scoper<span class="token operator">:</span> PiScoper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">YourScoper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span></code>`;return{c(){u=r("h1"),Y=t("Third Level Customization of the Scoper"),x=y(),m=r("p"),z=t("The scoper can not yet be customized "),v=r("strong"),I=t("per concept"),W=t(`. Instead, you can replace the whole
scoper by one create yourself.
The new scoper needs to implement the following interface.`),P=y(),d=r("pre"),N=y(),g=r("h2"),D=t("Adjusting the Environment"),T=y(),l=r("p"),F=t(`Furthermore, you need to tell Freon to use this new scoper instead of the generated one. You do this by
changing the line that initializes the scoper in the class `),E=r("code"),H=t("<yourLanguageName>Environment"),V=t(`. You can find it
in `),w=r("code"),A=t("~/picode/environment/"),j=t(`. Obviously,
you need to exchange `),S=r("code"),M=t("<yourLanguageName>"),q=t(" by the name of the language that you are creating."),L=y(),h=r("p"),G=t("Suppose the class "),_=r("code"),J=t("YourScoper"),B=t(`
holds the scoper with the improvements that you have made, then the entry in the environment class would be:`),C=y(),f=r("pre"),this.h()},l(e){u=i(e,"H1",{});var s=c(u);Y=o(s,"Third Level Customization of the Scoper"),s.forEach(n),x=b(e),m=i(e,"P",{});var O=c(m);z=o(O,"The scoper can not yet be customized "),v=i(O,"STRONG",{});var Q=c(v);I=o(Q,"per concept"),Q.forEach(n),W=o(O,`. Instead, you can replace the whole
scoper by one create yourself.
The new scoper needs to implement the following interface.`),O.forEach(n),P=b(e),d=i(e,"PRE",{class:!0});var oe=c(d);oe.forEach(n),N=b(e),g=i(e,"H2",{});var U=c(g);D=o(U,"Adjusting the Environment"),U.forEach(n),T=b(e),l=i(e,"P",{});var k=c(l);F=o(k,`Furthermore, you need to tell Freon to use this new scoper instead of the generated one. You do this by
changing the line that initializes the scoper in the class `),E=i(k,"CODE",{});var X=c(E);H=o(X,"<yourLanguageName>Environment"),X.forEach(n),V=o(k,`. You can find it
in `),w=i(k,"CODE",{});var Z=c(w);A=o(Z,"~/picode/environment/"),Z.forEach(n),j=o(k,`. Obviously,
you need to exchange `),S=i(k,"CODE",{});var $=c(S);M=o($,"<yourLanguageName>"),$.forEach(n),q=o(k," by the name of the language that you are creating."),k.forEach(n),L=b(e),h=i(e,"P",{});var R=c(h);G=o(R,"Suppose the class "),_=i(R,"CODE",{});var ee=c(_);J=o(ee,"YourScoper"),ee.forEach(n),B=o(R,`
holds the scoper with the improvements that you have made, then the entry in the environment class would be:`),R.forEach(n),C=b(e),f=i(e,"PRE",{class:!0});var pe=c(f);pe.forEach(n),this.h()},h(){ne(d,"class","language-ts"),ne(f,"class","language-ts")},m(e,s){p(e,u,s),a(u,Y),p(e,x,s),p(e,m,s),a(m,z),a(m,v),a(v,I),a(m,W),p(e,P,s),p(e,d,s),d.innerHTML=se,p(e,N,s),p(e,g,s),a(g,D),p(e,T,s),p(e,l,s),a(l,F),a(l,E),a(E,H),a(l,V),a(l,w),a(w,A),a(l,j),a(l,S),a(S,M),a(l,q),p(e,L,s),p(e,h,s),a(h,G),a(h,_),a(_,J),a(h,B),p(e,C,s),p(e,f,s),f.innerHTML=te},p:K,i:K,o:K,d(e){e&&n(u),e&&n(x),e&&n(m),e&&n(P),e&&n(d),e&&n(N),e&&n(g),e&&n(T),e&&n(l),e&&n(L),e&&n(h),e&&n(C),e&&n(f)}}}class me extends le{constructor(u){super();re(this,u,null,ce,ie,{})}}export{me as default};
