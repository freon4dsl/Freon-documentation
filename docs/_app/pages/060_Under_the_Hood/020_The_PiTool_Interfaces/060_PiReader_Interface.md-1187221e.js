import{S as T,i as C,s as M,e as c,t as u,k as R,c as f,a as m,g as d,d as a,n as x,b as q,f as p,F as i,H as S}from"../../../chunks/vendor-0216fdcb.js";function D(F){let s,w,k,n,P,l,E,b,_,r,v,y,o,H=`<code class="language-ts"><span class="token comment">/* File: core/src/reader/PiReader.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">PiReader</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Parses the 'input' into a model unit of type 'metatype'.
	 * May throw an Error if a syntax error occurs.
	 * @param input
	 * @param metatype
	 */</span>
	<span class="token function">readFromString</span><span class="token punctuation">(</span>input<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> PiElement<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`;return{c(){s=c("h1"),w=u("PiReader"),k=R(),n=c("p"),P=u("An object that implements "),l=c("code"),E=u("PiReader"),b=u(" is able to read a string representation of a node in the AST."),_=R(),r=c("p"),v=u("If you want to write your own parser/filereader you will need to implement this interface."),y=R(),o=c("pre"),this.h()},l(e){s=f(e,"H1",{});var t=m(s);w=d(t,"PiReader"),t.forEach(a),k=x(e),n=f(e,"P",{});var h=m(n);P=d(h,"An object that implements "),l=f(h,"CODE",{});var A=m(l);E=d(A,"PiReader"),A.forEach(a),b=d(h," is able to read a string representation of a node in the AST."),h.forEach(a),_=x(e),r=f(e,"P",{});var j=m(r);v=d(j,"If you want to write your own parser/filereader you will need to implement this interface."),j.forEach(a),y=x(e),o=f(e,"PRE",{class:!0});var I=m(o);I.forEach(a),this.h()},h(){q(o,"class","language-ts")},m(e,t){p(e,s,t),i(s,w),p(e,k,t),p(e,n,t),i(n,P),i(n,l),i(l,E),i(n,b),p(e,_,t),p(e,r,t),i(r,v),p(e,y,t),p(e,o,t),o.innerHTML=H},p:S,i:S,o:S,d(e){e&&a(s),e&&a(k),e&&a(n),e&&a(_),e&&a(r),e&&a(y),e&&a(o)}}}class O extends T{constructor(s){super();C(this,s,null,D,M,{})}}export{O as default};