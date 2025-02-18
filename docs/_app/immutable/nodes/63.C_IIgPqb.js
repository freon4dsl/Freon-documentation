import{s as ot,A as Hn,a as g,e as m,H as _n,f as v,b as h,m as M,d as C,F as gn,g as o,h as w,i,B as Fn,r as pt,w as vn,v as wt,t as z,o as J,n as bt,j as L,C as yt,D as lt,E as Q,q as ct,p as rt}from"../chunks/scheduler.Cra-n4xf.js";import{S as it,i as ut,e as On,c as D,a as V,m as G,t as U,b as W,d as Y}from"../chunks/index.Bm95Nbrf.js";import{e as Pn}from"../chunks/stores.Bq7jfj-I.js";import{w as $t}from"../chunks/index.B9cI0ado.js";import{P as Qn,S as qn,c as Et,B as Rt}from"../chunks/index.DunYcI8q.js";import{N as Lt}from"../chunks/Note.BZaOCr5b.js";const cn=$t([]);function xt(a){let t;return{c(){t=z("Building an Interpreter")},l(e){t=J(e,"Building an Interpreter")},m(e,s){i(e,t,s)},d(e){e&&o(t)}}}function Tt(a){let t;return{c(){t=z("The Computer Aided Learning DSL")},l(e){t=J(e,"The Computer Aided Learning DSL")},m(e,s){i(e,t,s)},d(e){e&&o(t)}}}function Ct(a){let t;return{c(){t=z("The selected node is the one that is interpreted")},l(e){t=J(e,"The selected node is the one that is interpreted")},m(e,s){i(e,t,s)},d(e){e&&o(t)}}}function Bt(a){let t,e,s="Edit",p;return{c(){t=z("When running the interpreter from the "),e=m("code"),e.textContent=s,p=z(` menu, the interpreter will try to evaluate the currently selected node. You will
		see a different result in the Interpreter tab for different nodes. Often the interpretation cannot be done completely, because some context
		is needed. It is up to the creator of the interpreter to augment this.`)},l(r){t=J(r,"When running the interpreter from the "),e=h(r,"CODE",{"data-svelte-h":!0}),M(e)!=="svelte-2an9oo"&&(e.textContent=s),p=J(r,` menu, the interpreter will try to evaluate the currently selected node. You will
		see a different result in the Interpreter tab for different nodes. Often the interpretation cannot be done completely, because some context
		is needed. It is up to the creator of the interpreter to augment this.`)},m(r,f){i(r,t,f),i(r,e,f),i(r,p,f)},p:bt,d(r){r&&(o(t),o(e),o(p))}}}function It(a){let t;return{c(){t=z("Values for the Literals")},l(e){t=J(e,"Values for the Literals")},m(e,s){i(e,t,s)},d(e){e&&o(t)}}}function Nt(a){let t;return{c(){t=z("Values for Binary Expressions")},l(e){t=J(e,"Values for Binary Expressions")},m(e,s){i(e,t,s)},d(e){e&&o(t)}}}function Mt(a){let t,e,s,p,r,f,c="This example shows how to create an interpreter.",k,u,B,y,x,T=`The language used in this extended example is the one that is in depth explained in the <a href="/Tutorial/Overview">tutorial</a>. When
	you take another look at the requirements for this DSL, you see that our hypothetical client wants a means to test the page flow. We are
	going to build an interpreter to do just that.`,I,q,rn=`To follow the example use the <code>npm create freon@latest</code> command and choose the language called
	<code>EducationInterpreter</code>. Build the project (<code>npm run build</code>). Start the editor and select the model named
	‘Model4Interpreter’, which is basically the same as the model called ‘Lesson6’ that was used in the tutorial. Open the model unit ‘TestB’
	and run the interpreter from the <code>Edit</code> menu on the complete test (i.e. by selecting the test as current node).`,S,N,K,H,un,j,R,E=`As explained in <a href="/Documentation/Interpreter_Framework">Interpreter Framework</a> there is only one file that we need to change:
	<code>/src/freon/interpreter/EducationInterpreter.ts</code>.`,F,b,d=`Because this is the easiest manner, we are going to build the evaluation from the bottom up. This means that we are first going to
	implement the evaluation functions for the literal expressions, i.e. <code>SimpleNumber</code>, <code>NumberLiteralExpression</code>, and
	<code>Fraction</code>.`,$,_,P,kn=`<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L216-L228</span>

<span class="token comment">/////////////////// Literals</span>

override <span class="token function">evalSimpleNumber</span><span class="token punctuation">(</span>node<span class="token operator">:</span> SimpleNumber<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

override <span class="token function">evalNumberLiteralExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> NumberLiteralExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

override <span class="token function">evalFraction</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Fraction<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtFraction</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>numerator<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>denominator<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`,X,O,Dn=`As you see, the first two functions simply return a runtime object of type <code>RtNumber</code> which holds the current
	<code>value</code>
	of the node. The third function returns a runtime object of type <code>RtFraction</code>, which is defined as follows:`,wn,Z,bn,kt=`<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/runtime/RtFraction.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RtBoolean<span class="token punctuation">,</span> RtNumber<span class="token punctuation">,</span> RtObject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">RtFraction</span> <span class="token keyword">extends</span> <span class="token class-name">RtObject</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">readonly</span> _type<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"RtFraction"</span><span class="token punctuation">;</span>

    nominator<span class="token operator">:</span> RtNumber<span class="token punctuation">;</span>
    denumerator<span class="token operator">:</span> RtNumber<span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>num<span class="token operator">:</span> RtNumber<span class="token punctuation">,</span> den<span class="token operator">:</span> RtNumber<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>nominator <span class="token operator">=</span> num<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>denumerator <span class="token operator">=</span> den<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    override <span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token operator">:</span> RtObject<span class="token punctuation">)</span><span class="token operator">:</span> RtBoolean <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtFraction</span><span class="token punctuation">(</span>other<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>nominator<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>nominator<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>denumerator<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>denumerator<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    
    override <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>nominator<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>denumerator<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isRtFraction</span><span class="token punctuation">(</span>object<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> object <span class="token keyword">is</span> RtFraction <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> _type <span class="token operator">=</span> <span class="token punctuation">(</span>object <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">?.</span>_type<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span>_type <span class="token operator">&amp;&amp;</span> _type <span class="token operator">===</span> <span class="token string">"RtFraction"</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`,yn,nn,Vn=`What makes things easy is that we do not actually need the result of a fraction, that is, if the fraction is 6/3, we do not need the
	number 2. All we have to do, when building the test for our customer, is to compare one fraction with another. Therefore, the only
	function we need to define for the <code>RtFraction</code> class is the <code>equals</code> function.`,$n,A,jn,En,tn,Gn=`The next step is to create the evaluation functions for the binary expressions. They are all similar, so here we focus on the evaluation
	of an <code>OrExpression</code>.`,Rn,en,Ln,ft=`<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L244-L248</span>

override <span class="token function">evalOrExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> OrExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> left <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token keyword">as</span> RtBoolean
    <span class="token keyword">const</span> right <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token keyword">as</span> RtBoolean
    <span class="token keyword">return</span> left<span class="token punctuation">.</span><span class="token function">or</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`,xn,sn,Un=`First we evaluate the left and right hand side of the expression. Note that we use the <code>main</code> interpreter from the file
	<code>MainEducationInterpreter.ts</code>. The <code>main</code> interpreter is able to obtain the runtime value for any node type. Next we
	use the predefined <code>or</code> function of the class
	<code>RtBoolean</code>, which is defined as follows.`,Tn,an,Cn,dt=`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">RtBoolean</span> <span class="token keyword">extends</span> <span class="token class-name">RtObject</span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token constant">TRUE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RtBoolean</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token constant">FALSE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RtBoolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">static</span> <span class="token keyword">of</span><span class="token punctuation">(</span>bool<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> RtBoolean <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> bool <span class="token operator">?</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">TRUE</span> <span class="token operator">:</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">or</span><span class="token punctuation">(</span>other<span class="token operator">:</span> RtBoolean<span class="token punctuation">)</span><span class="token operator">:</span> RtBoolean <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">||</span> other<span class="token punctuation">.</span><span class="token function">asBoolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
    <span class="token operator">...</span>  
<span class="token punctuation">&#125;</span>		</code>`,Bn,on,Wn=`The other comparison expressions, like <code>AndExpression</code>, and <code>EqualsExpression</code>, are implemented in a similar
	fashion. For example, this is the implementation of the <code>GreaterOrEqualsExpression</code>:`,In,pn,Nn,mt=`<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L256-L260</span>

override <span class="token function">evalGreaterOrEqualsExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> GreaterOrEqualsExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> left <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token keyword">as</span> RtNumber
    <span class="token keyword">const</span> right <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token keyword">as</span> RtNumber
    <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>value <span class="token operator">>=</span> right<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`,Mn,ln,Sn;t=new Qn({props:{prevLink:Xn,nextLink:Zn}});function ht(n){a[1](n)}let Yn={tag:"h1",id:"building-an-interpreter-1",$$slots:{default:[xt]},$$scope:{ctx:a}};a[0][0]!==void 0&&(Yn.intersecting=a[0][0]),s=new qn({props:Yn}),Hn.push(()=>On(s,"intersecting",ht));function _t(n){a[2](n)}let zn={tag:"h2",id:"the-computer-aided-learning-dsl-2",$$slots:{default:[Tt]},$$scope:{ctx:a}};a[0][1]!==void 0&&(zn.intersecting=a[0][1]),u=new qn({props:zn}),Hn.push(()=>On(u,"intersecting",_t)),N=new Lt({props:{$$slots:{content:[Bt],header:[Ct]},$$scope:{ctx:a}}});function gt(n){a[3](n)}let Jn={tag:"h2",id:"values-for-the-literals-3",$$slots:{default:[It]},$$scope:{ctx:a}};a[0][2]!==void 0&&(Jn.intersecting=a[0][2]),H=new qn({props:Jn}),Hn.push(()=>On(H,"intersecting",gt));function vt(n){a[4](n)}let Kn={tag:"h2",id:"values-for-binary-expressions-4",$$slots:{default:[Nt]},$$scope:{ctx:a}};return a[0][3]!==void 0&&(Kn.intersecting=a[0][3]),A=new qn({props:Kn}),Hn.push(()=>On(A,"intersecting",vt)),ln=new Qn({props:{prevLink:Xn,nextLink:Zn}}),{c(){D(t.$$.fragment),e=g(),D(s.$$.fragment),r=g(),f=m("p"),f.textContent=c,k=g(),D(u.$$.fragment),y=g(),x=m("p"),x.innerHTML=T,I=g(),q=m("p"),q.innerHTML=rn,S=g(),D(N.$$.fragment),K=g(),D(H.$$.fragment),j=g(),R=m("p"),R.innerHTML=E,F=g(),b=m("p"),b.innerHTML=d,$=g(),_=m("pre"),P=new _n(!1),X=g(),O=m("p"),O.innerHTML=Dn,wn=g(),Z=m("pre"),bn=new _n(!1),yn=g(),nn=m("p"),nn.innerHTML=Vn,$n=g(),D(A.$$.fragment),En=g(),tn=m("p"),tn.innerHTML=Gn,Rn=g(),en=m("pre"),Ln=new _n(!1),xn=g(),sn=m("p"),sn.innerHTML=Un,Tn=g(),an=m("pre"),Cn=new _n(!1),Bn=g(),on=m("p"),on.innerHTML=Wn,In=g(),pn=m("pre"),Nn=new _n(!1),Mn=g(),D(ln.$$.fragment),this.h()},l(n){V(t.$$.fragment,n),e=v(n),V(s.$$.fragment,n),r=v(n),f=h(n,"P",{"data-svelte-h":!0}),M(f)!=="svelte-1cg51o0"&&(f.textContent=c),k=v(n),V(u.$$.fragment,n),y=v(n),x=h(n,"P",{"data-svelte-h":!0}),M(x)!=="svelte-1kpg4lf"&&(x.innerHTML=T),I=v(n),q=h(n,"P",{"data-svelte-h":!0}),M(q)!=="svelte-1f7d0l1"&&(q.innerHTML=rn),S=v(n),V(N.$$.fragment,n),K=v(n),V(H.$$.fragment,n),j=v(n),R=h(n,"P",{"data-svelte-h":!0}),M(R)!=="svelte-1v4e673"&&(R.innerHTML=E),F=v(n),b=h(n,"P",{"data-svelte-h":!0}),M(b)!=="svelte-1w3hbwy"&&(b.innerHTML=d),$=v(n),_=h(n,"PRE",{class:!0});var l=C(_);P=gn(l,!1),l.forEach(o),X=v(n),O=h(n,"P",{"data-svelte-h":!0}),M(O)!=="svelte-1whxqe4"&&(O.innerHTML=Dn),wn=v(n),Z=h(n,"PRE",{class:!0});var fn=C(Z);bn=gn(fn,!1),fn.forEach(o),yn=v(n),nn=h(n,"P",{"data-svelte-h":!0}),M(nn)!=="svelte-1uix98d"&&(nn.innerHTML=Vn),$n=v(n),V(A.$$.fragment,n),En=v(n),tn=h(n,"P",{"data-svelte-h":!0}),M(tn)!=="svelte-2kg6mz"&&(tn.innerHTML=Gn),Rn=v(n),en=h(n,"PRE",{class:!0});var dn=C(en);Ln=gn(dn,!1),dn.forEach(o),xn=v(n),sn=h(n,"P",{"data-svelte-h":!0}),M(sn)!=="svelte-1sd0bmx"&&(sn.innerHTML=Un),Tn=v(n),an=h(n,"PRE",{class:!0});var hn=C(an);Cn=gn(hn,!1),hn.forEach(o),Bn=v(n),on=h(n,"P",{"data-svelte-h":!0}),M(on)!=="svelte-xghjpx"&&(on.innerHTML=Wn),In=v(n),pn=h(n,"PRE",{class:!0});var mn=C(pn);Nn=gn(mn,!1),mn.forEach(o),Mn=v(n),V(ln.$$.fragment,n),this.h()},h(){P.a=null,w(_,"class","language-ts"),bn.a=null,w(Z,"class","language-ts"),Ln.a=null,w(en,"class","language-ts"),Cn.a=null,w(an,"class","language-ts"),Nn.a=null,w(pn,"class","language-ts")},m(n,l){G(t,n,l),i(n,e,l),G(s,n,l),i(n,r,l),i(n,f,l),i(n,k,l),G(u,n,l),i(n,y,l),i(n,x,l),i(n,I,l),i(n,q,l),i(n,S,l),G(N,n,l),i(n,K,l),G(H,n,l),i(n,j,l),i(n,R,l),i(n,F,l),i(n,b,l),i(n,$,l),i(n,_,l),P.m(kn,_),i(n,X,l),i(n,O,l),i(n,wn,l),i(n,Z,l),bn.m(kt,Z),i(n,yn,l),i(n,nn,l),i(n,$n,l),G(A,n,l),i(n,En,l),i(n,tn,l),i(n,Rn,l),i(n,en,l),Ln.m(ft,en),i(n,xn,l),i(n,sn,l),i(n,Tn,l),i(n,an,l),Cn.m(dt,an),i(n,Bn,l),i(n,on,l),i(n,In,l),i(n,pn,l),Nn.m(mt,pn),i(n,Mn,l),G(ln,n,l),Sn=!0},p(n,[l]){const fn={};l&64&&(fn.$$scope={dirty:l,ctx:n}),!p&&l&1&&(p=!0,fn.intersecting=n[0][0],Fn(()=>p=!1)),s.$set(fn);const dn={};l&64&&(dn.$$scope={dirty:l,ctx:n}),!B&&l&1&&(B=!0,dn.intersecting=n[0][1],Fn(()=>B=!1)),u.$set(dn);const hn={};l&64&&(hn.$$scope={dirty:l,ctx:n}),N.$set(hn);const mn={};l&64&&(mn.$$scope={dirty:l,ctx:n}),!un&&l&1&&(un=!0,mn.intersecting=n[0][2],Fn(()=>un=!1)),H.$set(mn);const An={};l&64&&(An.$$scope={dirty:l,ctx:n}),!jn&&l&1&&(jn=!0,An.intersecting=n[0][3],Fn(()=>jn=!1)),A.$set(An)},i(n){Sn||(U(t.$$.fragment,n),U(s.$$.fragment,n),U(u.$$.fragment,n),U(N.$$.fragment,n),U(H.$$.fragment,n),U(A.$$.fragment,n),U(ln.$$.fragment,n),Sn=!0)},o(n){W(t.$$.fragment,n),W(s.$$.fragment,n),W(u.$$.fragment,n),W(N.$$.fragment,n),W(H.$$.fragment,n),W(A.$$.fragment,n),W(ln.$$.fragment,n),Sn=!1},d(n){n&&(o(e),o(r),o(f),o(k),o(y),o(x),o(I),o(q),o(S),o(K),o(j),o(R),o(F),o(b),o($),o(_),o(X),o(O),o(wn),o(Z),o(yn),o(nn),o($n),o(En),o(tn),o(Rn),o(en),o(xn),o(sn),o(Tn),o(an),o(Bn),o(on),o(In),o(pn),o(Mn)),Y(t,n),Y(s,n),Y(u,n),Y(N,n),Y(H,n),Y(A,n),Y(ln,n)}}}let Xn="/Examples/Overview",Zn="/Examples/Building_an_Interpreter/Basic_Evaluation_Functions";function St(a,t,e){let s;pt(a,cn,u=>e(5,s=u)),vn(cn,s=[{title:"Building an Interpreter",visible:!1,ref:"#building-an-interpreter-1"},{title:"The Computer Aided Learning DSL",visible:!1,ref:"#the-computer-aided-learning-dsl-2"},{title:"Values for the Literals",visible:!1,ref:"#values-for-the-literals-3"},{title:"Values for Binary Expressions",visible:!1,ref:"#values-for-binary-expressions-4"}],s);let p=[];wt(()=>{document.querySelectorAll("pre").forEach(B=>{const y=document.createElement("div");y.className="copy-prompt";const x=document.createElement("p");x.innerHTML="👆 Click to copy",x.className="copy-prompt-p";const T=document.createElement("img");T.src="/icons/copy-icon.svg",T.className="copy-prompt-img",y.appendChild(T),y.appendChild(x),B.appendChild(y),B.querySelector(".copy-prompt > p").addEventListener("click",I=>{Et(B.querySelector("code").textContent),B.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{B.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function r(u){a.$$.not_equal(p[0],u)&&(p[0]=u,e(0,p))}function f(u){a.$$.not_equal(p[1],u)&&(p[1]=u,e(0,p))}function c(u){a.$$.not_equal(p[2],u)&&(p[2]=u,e(0,p))}function k(u){a.$$.not_equal(p[3],u)&&(p[3]=u,e(0,p))}return a.$$.update=()=>{a.$$.dirty&1&&vn(cn,s[0].visible=p[0],s),a.$$.dirty&1&&vn(cn,s[1].visible=p[1],s),a.$$.dirty&1&&vn(cn,s[2].visible=p[2],s),a.$$.dirty&1&&vn(cn,s[3].visible=p[3],s)},[p,r,f,c,k]}class Ht extends it{constructor(t){super(),ut(this,t,St,Mt,ot,{})}}function nt(a,t,e){const s=a.slice();return s[6]=t[e],s[8]=e,s}function tt(a,t,e){const s=a.slice();return s[6]=t[e],s[8]=e,s}function Ft(a){let t,e;return{c(){t=m("img"),this.h()},l(s){t=h(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){w(t,"class","page-toc-small-img"),rt(t.src,e="/icons/down-arrow.png")||w(t,"src",e),w(t,"alt","arrow down")},m(s,p){i(s,t,p)},d(s){s&&o(t)}}}function Ot(a){let t,e;return{c(){t=m("img"),this.h()},l(s){t=h(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){w(t,"class","page-toc-small-img"),rt(t.src,e="/icons/upload.png")||w(t,"src",e),w(t,"alt","arrow up")},m(s,p){i(s,t,p)},d(s){s&&o(t)}}}function et(a){let t,e,s=Pn(a[0]),p=[];for(let r=0;r<s.length;r+=1)p[r]=st(tt(a,s,r));return{c(){t=m("div"),e=m("ul");for(let r=0;r<p.length;r+=1)p[r].c();this.h()},l(r){t=h(r,"DIV",{class:!0});var f=C(t);e=h(f,"UL",{class:!0});var c=C(e);for(let k=0;k<p.length;k+=1)p[k].l(c);c.forEach(o),f.forEach(o),this.h()},h(){w(e,"class","page-ul"),w(t,"class","toc-details")},m(r,f){i(r,t,f),L(t,e);for(let c=0;c<p.length;c+=1)p[c]&&p[c].m(e,null)},p(r,f){if(f&5){s=Pn(r[0]);let c;for(c=0;c<s.length;c+=1){const k=tt(r,s,c);p[c]?p[c].p(k,f):(p[c]=st(k),p[c].c(),p[c].m(e,null))}for(;c<p.length;c+=1)p[c].d(1);p.length=s.length}},d(r){r&&o(t),lt(p,r)}}}function st(a){let t,e,s=a[6].title+"",p,r,f;return{c(){t=m("li"),e=m("a"),p=z(s),f=g(),this.h()},l(c){t=h(c,"LI",{class:!0});var k=C(t);e=h(k,"A",{href:!0});var u=C(e);p=J(u,s),u.forEach(o),f=v(k),k.forEach(o),this.h()},h(){w(e,"href",r=a[6].ref),Q(e,"page-visible",a[8]===a[2]),Q(e,"page-nonvisible",a[8]!==a[2]),w(t,"class","page-toc-text")},m(c,k){i(c,t,k),L(t,e),L(e,p),L(t,f)},p(c,k){k&1&&s!==(s=c[6].title+"")&&ct(p,s),k&1&&r!==(r=c[6].ref)&&w(e,"href",r),k&4&&Q(e,"page-visible",c[8]===c[2]),k&4&&Q(e,"page-nonvisible",c[8]!==c[2])},d(c){c&&o(t)}}}function at(a){let t,e,s=a[6].title+"",p,r,f;return{c(){t=m("li"),e=m("a"),p=z(s),f=g(),this.h()},l(c){t=h(c,"LI",{class:!0});var k=C(t);e=h(k,"A",{href:!0});var u=C(e);p=J(u,s),u.forEach(o),f=v(k),k.forEach(o),this.h()},h(){w(e,"href",r=a[6].ref),Q(e,"page-visible",a[8]===a[2]),Q(e,"page-nonvisible",a[8]!==a[2]),w(t,"class","page-toc-text")},m(c,k){i(c,t,k),L(t,e),L(e,p),L(t,f)},p(c,k){k&1&&s!==(s=c[6].title+"")&&ct(p,s),k&1&&r!==(r=c[6].ref)&&w(e,"href",r),k&4&&Q(e,"page-visible",c[8]===c[2]),k&4&&Q(e,"page-nonvisible",c[8]!==c[2])},d(c){c&&o(t)}}}function qt(a){let t,e,s,p="On this page ...",r,f,c,k,u,B,y,x,T,I,q="On this page",rn,S,N,K,H;function un(d,$){return d[1]?Ot:Ft}let j=un(a),R=j(a),E=a[1]&&et(a);u=new Rt({}),y=new Ht({});let F=Pn(a[0]),b=[];for(let d=0;d<F.length;d+=1)b[d]=at(nt(a,F,d));return{c(){t=m("div"),e=m("div"),s=m("p"),s.textContent=p,r=g(),f=m("button"),R.c(),c=g(),E&&E.c(),k=g(),D(u.$$.fragment),B=g(),D(y.$$.fragment),x=g(),T=m("nav"),I=m("h3"),I.textContent=q,rn=g(),S=m("ul");for(let d=0;d<b.length;d+=1)b[d].c();this.h()},l(d){t=h(d,"DIV",{class:!0});var $=C(t);e=h($,"DIV",{class:!0});var _=C(e);s=h(_,"P",{class:!0,"data-svelte-h":!0}),M(s)!=="svelte-1929lhs"&&(s.textContent=p),r=v(_),f=h(_,"BUTTON",{class:!0});var P=C(f);R.l(P),P.forEach(o),_.forEach(o),c=v($),E&&E.l($),k=v($),V(u.$$.fragment,$),B=v($),V(y.$$.fragment,$),$.forEach(o),x=v(d),T=h(d,"NAV",{class:!0});var kn=C(T);I=h(kn,"H3",{class:!0,"data-svelte-h":!0}),M(I)!=="svelte-1hgt7fi"&&(I.textContent=q),rn=v(kn),S=h(kn,"UL",{class:!0});var X=C(S);for(let O=0;O<b.length;O+=1)b[O].l(X);X.forEach(o),kn.forEach(o),this.h()},h(){w(s,"class","page-toc-small-title"),w(f,"class","page-toc-small-expand-button"),w(e,"class","page-toc-small"),w(t,"class","page-main"),w(I,"class","page-toc-title"),w(S,"class","page-ul"),w(T,"class","page-toc")},m(d,$){i(d,t,$),L(t,e),L(e,s),L(e,r),L(e,f),R.m(f,null),L(t,c),E&&E.m(t,null),L(t,k),G(u,t,null),L(t,B),G(y,t,null),i(d,x,$),i(d,T,$),L(T,I),L(T,rn),L(T,S);for(let _=0;_<b.length;_+=1)b[_]&&b[_].m(S,null);N=!0,K||(H=yt(f,"click",a[4]),K=!0)},p(d,[$]){if(j!==(j=un(d))&&(R.d(1),R=j(d),R&&(R.c(),R.m(f,null))),d[1]?E?E.p(d,$):(E=et(d),E.c(),E.m(t,k)):E&&(E.d(1),E=null),$&5){F=Pn(d[0]);let _;for(_=0;_<F.length;_+=1){const P=nt(d,F,_);b[_]?b[_].p(P,$):(b[_]=at(P),b[_].c(),b[_].m(S,null))}for(;_<b.length;_+=1)b[_].d(1);b.length=F.length}},i(d){N||(U(u.$$.fragment,d),U(y.$$.fragment,d),N=!0)},o(d){W(u.$$.fragment,d),W(y.$$.fragment,d),N=!1},d(d){d&&(o(t),o(x),o(T)),R.d(),E&&E.d(),Y(u),Y(y),lt(b,d),K=!1,H()}}}function Pt(a,t,e){let s,p;pt(a,cn,u=>e(0,p=u));let r=!1;function f(u){let B=s;for(let y=0;y<u.length;y++)if(u[y].visible)return y;return B}function c(){e(1,r=!r)}const k=()=>{c()};return a.$$.update=()=>{a.$$.dirty&1&&e(2,s=f(p))},[p,r,s,c,k]}class Wt extends it{constructor(t){super(),ut(this,t,Pt,qt,ot,{})}}export{Wt as component};
//# sourceMappingURL=63.C_IIgPqb.js.map
