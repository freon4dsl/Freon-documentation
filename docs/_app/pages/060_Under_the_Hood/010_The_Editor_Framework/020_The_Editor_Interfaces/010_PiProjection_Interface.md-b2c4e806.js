import{S as O,i as R,s as g,e as p,t as a,k as H,c as m,a as f,h as r,d as t,m as I,b as G,g as u,H as n,J as M}from"../../../../chunks/vendor-0dc77bd0.js";function K(D){let i,v,x,l,E,h,y,w,_,c,J=`<code class="language-ts"><span class="token comment">/* File: core/src/editor/PiProjection.ts  */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">PiProjection</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * returns the box for &#96;element&#96;.
	 */</span>
	<span class="token function">getBox</span><span class="token punctuation">(</span>element<span class="token operator">:</span> PiElement<span class="token punctuation">)</span><span class="token operator">:</span> Box<span class="token punctuation">;</span>

	rootProjection<span class="token operator">:</span> PiProjection<span class="token punctuation">;</span>
	name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,b,o,T,k,S,A,P,B,F;return{c(){i=p("h1"),v=a("PiProjection"),x=H(),l=p("p"),E=a("The projection from your model/AST is defined by implementing the "),h=p("em"),y=a("PiProjection"),w=a(" interface:"),_=H(),c=p("pre"),b=H(),o=p("p"),T=a("Implementing this interface should return a "),k=p("em"),S=a("Box"),A=a(" for each "),P=p("code"),B=a("element"),F=a(` in the AST.
Freon includes boxes of various types (textual, tabular, horizontal or vertical collections, etc.)
to define this projection.
The box model is further described in the xref:../framework/editor-framework[editor framework].`),this.h()},l(e){i=m(e,"H1",{});var s=f(i);v=r(s,"PiProjection"),s.forEach(t),x=I(e),l=m(e,"P",{});var j=f(l);E=r(j,"The projection from your model/AST is defined by implementing the "),h=m(j,"EM",{});var z=f(h);y=r(z,"PiProjection"),z.forEach(t),w=r(j," interface:"),j.forEach(t),_=I(e),c=m(e,"PRE",{class:!0});var L=f(c);L.forEach(t),b=I(e),o=m(e,"P",{});var d=f(o);T=r(d,"Implementing this interface should return a "),k=m(d,"EM",{});var C=f(k);S=r(C,"Box"),C.forEach(t),A=r(d," for each "),P=m(d,"CODE",{});var q=f(P);B=r(q,"element"),q.forEach(t),F=r(d,` in the AST.
Freon includes boxes of various types (textual, tabular, horizontal or vertical collections, etc.)
to define this projection.
The box model is further described in the xref:../framework/editor-framework[editor framework].`),d.forEach(t),this.h()},h(){G(c,"class","language-ts")},m(e,s){u(e,i,s),n(i,v),u(e,x,s),u(e,l,s),n(l,E),n(l,h),n(h,y),n(l,w),u(e,_,s),u(e,c,s),c.innerHTML=J,u(e,b,s),u(e,o,s),n(o,T),n(o,k),n(k,S),n(o,A),n(o,P),n(P,B),n(o,F)},p:M,i:M,o:M,d(e){e&&t(i),e&&t(x),e&&t(l),e&&t(_),e&&t(c),e&&t(b),e&&t(o)}}}class Q extends O{constructor(i){super();R(this,i,null,K,g,{})}}export{Q as default};
