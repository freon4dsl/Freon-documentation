import{S as M,i as S,s as H,e as k,t as m,k as w,c as d,a as f,g as h,d as a,n as y,b as I,f as l,F as i,H as b}from"../../../chunks/vendor-0216fdcb.js";function N(j){let s,v,c,t,P,p,E,_,r,o,x=`<code class="language-ts"><span class="token comment">/* File: core/src/environment/PiEnvironment.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">PiEnvironment</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Creates a new model, an implementation of the language defined in the .ast file
	 * @param name
	 */</span>
	<span class="token function">newModel</span><span class="token punctuation">(</span>modelName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> PiModel<span class="token punctuation">;</span>

	scoper<span class="token operator">:</span> PiScoper<span class="token punctuation">;</span>
	typer<span class="token operator">:</span> PiTyper<span class="token punctuation">;</span>
	validator<span class="token operator">:</span> PiValidator<span class="token punctuation">;</span>
	editor<span class="token operator">:</span> PiEditor<span class="token punctuation">;</span>
	stdlib<span class="token operator">:</span> PiStdlib<span class="token punctuation">;</span>
	writer<span class="token operator">:</span> PiWriter<span class="token punctuation">;</span>
	reader<span class="token operator">:</span> PiReader<span class="token punctuation">;</span>

	<span class="token comment">// projectionalEditorComponent: ProjectionalEditor;</span>
	languageName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
	unitNames<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	fileExtensions<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`;return{c(){s=k("h1"),v=m("PiEnvironment"),c=w(),t=k("p"),P=m("An object that implements "),p=k("code"),E=m("PiEnvironment"),_=m(` holds the information about where to find all parts
of the language environment. It is usually a singleton object.`),r=w(),o=k("pre"),this.h()},l(n){s=d(n,"H1",{});var e=f(s);v=h(e,"PiEnvironment"),e.forEach(a),c=y(n),t=d(n,"P",{});var u=f(t);P=h(u,"An object that implements "),p=d(u,"CODE",{});var g=f(p);E=h(g,"PiEnvironment"),g.forEach(a),_=h(u,` holds the information about where to find all parts
of the language environment. It is usually a singleton object.`),u.forEach(a),r=y(n),o=d(n,"PRE",{class:!0});var C=f(o);C.forEach(a),this.h()},h(){I(o,"class","language-ts")},m(n,e){l(n,s,e),i(s,v),l(n,c,e),l(n,t,e),i(t,P),i(t,p),i(p,E),i(t,_),l(n,r,e),l(n,o,e),o.innerHTML=x},p:b,i:b,o:b,d(n){n&&a(s),n&&a(c),n&&a(t),n&&a(r),n&&a(o)}}}class F extends M{constructor(s){super();S(this,s,null,N,H,{})}}export{F as default};
