import{s as xt,A as Je,a as _,e as d,H as Ue,f as v,b as g,m as y,d as I,F as Ve,g as a,h as b,i as l,B as We,v as yt,x as we,w as St,t as B,o as J,n as Ct,j as T,C as jt,D as Lt,E as ee,q as Tt,p as Et}from"../chunks/scheduler.CIEH-92L.js";import{S as It,i as Mt,e as ze,c as O,a as S,m as j,t as q,b as D,d as A}from"../chunks/index.HLF2pGCU.js";import{e as Ye}from"../chunks/each.BLebZWAa.js";import{w as qt}from"../chunks/index.bxqR-5-s.js";import{P as ht,S as Ge,c as Dt,B as At}from"../chunks/index.CLjbMqgA.js";import{N as dt}from"../chunks/Note.DEjaTDAW.js";import{F as Bt}from"../chunks/Figure.ClABA4Sw.js";const ge=qt([]);function Jt(i){let n;return{c(){n=B("The Freon Interpreter Framework")},l(t){n=J(t,"The Freon Interpreter Framework")},m(t,s){l(t,n,s)},d(t){t&&a(n)}}}function Ut(i){let n;return{c(){n=B("Freon’s Runtime Object Library")},l(t){n=J(t,"Freon’s Runtime Object Library")},m(t,s){l(t,n,s)},d(t){t&&a(n)}}}function Vt(i){let n;return{c(){n=B("Meta Levels")},l(t){n=J(t,"Meta Levels")},m(t,s){l(t,n,s)},d(t){t&&a(n)}}}function Wt(i){let n,t,s=`<li>The language definition, defining which concepts are available. Often called the M2 level. In Freon this is represented by the
				language definition in the .ast files. In Java this would be the Java Language Definition.</li> <li>The model, which contains instances of the language concepts, called the M1 level. In Freon this is what you edit in a Freon
				application. In Java this would be a Java program consisting of Java classes.</li> <li>The runtime level, values resulting from executing or interpreting the model, called the M0 level. In Freon this is the result of
				the interpreter running, or it would be the result of executing code generated from the model (M1) level. For Java this is the
				execution of a Java program.</li>`;return{c(){n=B(`In Domain Specific language we distinguish the following levels:
		`),t=d("ol"),t.innerHTML=s},l(r){n=J(r,`In Domain Specific language we distinguish the following levels:
		`),t=g(r,"OL",{"data-svelte-h":!0}),y(t)!=="svelte-1nwh40i"&&(t.innerHTML=s)},m(r,c){l(r,n,c),l(r,t,c)},p:Ct,d(r){r&&(a(n),a(t))}}}function zt(i){let n;return{c(){n=B("Interpreter Context")},l(t){n=J(t,"Interpreter Context")},m(t,s){l(t,n,s)},d(t){t&&a(n)}}}function Gt(i){let n;return{c(){n=B("Running the Interpreter")},l(t){n=J(t,"Running the Interpreter")},m(t,s){l(t,n,s)},d(t){t&&a(n)}}}function Yt(i){let n;return{c(){n=B("The selected node is the one that is interpreted")},l(t){n=J(t,"The selected node is the one that is interpreted")},m(t,s){l(t,n,s)},d(t){t&&a(n)}}}function Kt(i){let n,t,s="Edit",r;return{c(){n=B("When running the interpreter from the "),t=d("code"),t.textContent=s,r=B(` menu, the interpreter will try to evaluate the currently selected node. You will
		see a different result in the Interpreter tab for different nodes. Often the interpretation cannot be done completely, because some context
		is needed. It is up to the creator of the interpreter to augment this.`)},l(c){n=J(c,"When running the interpreter from the "),t=g(c,"CODE",{"data-svelte-h":!0}),y(t)!=="svelte-2an9oo"&&(t.textContent=s),r=J(c,` menu, the interpreter will try to evaluate the currently selected node. You will
		see a different result in the Interpreter tab for different nodes. Often the interpretation cannot be done completely, because some context
		is needed. It is up to the creator of the interpreter to augment this.`)},m(c,m){l(c,n,m),l(c,t,m),l(c,r,m)},p:Ct,d(c){c&&(a(n),a(t),a(r))}}}function Qt(i){let n,t,s,r,c,m,p=`In the generation step of Freon, a number of files are generated that together form the basis for an interpreter. As language engineer,
	the only file that you need to change is a file named <code>&lt;&lt;LanguageName&gt;&gt;Interpreter.ts</code>, where
	<code>&lt;&lt;LanguageName&gt;&gt;</code> is, of course, the name of the DSL you are working on. In our <code>Expressions</code> example
	it is called
	<code>ExpressionsInterpreter.ts</code>.`,u,f,M=`The class that is defined in this file inherits from the class <code>&lt;&lt;LanguageName&gt;&gt;InterpreterBase</code>, which includes
	one evaluation function per concept defined in the language. By overriding the evaluation functions you can define which value is to be
	associated with a certain AST node. The following is an example of an evaluation function in <code>ExpressionsInterpreterBase.ts</code>.`,w,E,C,U=`<code class="language-ts"><span class="token comment">// Expressions/src/freon/interpreter/gen/ExpressionsInterpreterBase.ts#L35-L37</span>

<span class="token function">evalNumberLiteralExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> NumberLiteralExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token string">"evalNumberLiteralExpression is not defined"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,te,H,V=`All evaluation functions are similar. The first parameter is the node for which a value needs to be determined. The second parameter, of
	type <code>InterpreterContext</code>, provides the
	<a href="/Documentation/Interpreter_Framework/Understanding_the_Framework#interpreter-context-3">context</a>
	in which the expression should be evaluated. This context is used to store values of constants, variables, etc. so they are available for
	use in the function. Initially, the base class functions throw an exception when called, as shown above, but when overridden, they should
	result in an object of type <code>RtObject</code> (short for “runtime object”), from
	<a href="/Documentation/Interpreter_Framework/Understanding_the_Framework#freons-runtime-object-library-2">Freon’s Runtime Object Library</a>.`,z,P,$e="Here is an example of how <code>evalNumberLiteralExpression</code> is overridden:",ne,R,F,L=`<code class="language-ts"><span class="token comment">// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L36-L38</span>

override <span class="token function">evalNumberLiteralExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> NumberLiteralExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,N,$,h,x,k,Q=`We have chosen to always have an <code>RtObject</code> (or one of its subclasses) as the result of interpreting, to make sure that the
	model (M1) and runtime (M0) levels are always strictly separated. Of course there can be references from <code>RtObjects</code> to instances
	in the model, e.g. for traceability. Freon provides a set of runtime classes that can be used out-of-the-box. These include:`,G,W,_e="<li><strong><code>RtNumber</code></strong>: Represents numeric values.</li> <li><strong><code>RtString</code></strong>: Represents strings.</li> <li><strong><code>RtBoolean</code></strong>: Represents boolean values.</li> <li><strong><code>RtArray</code></strong>: Represents arrays.</li> <li><strong><code>RtError</code></strong>: Represents errors.</li>",xe,se,et="Often you create domain-specific runtime classes that inherit from these foundational classes.",ye,X,Ce,Y,Ke,Le,ae,tt="Every node in the AST is evaluated within a certain context, represented by the <code>ctx: InterpreterContext</code> parameter.",Te,oe,nt=`For instance, if in the model we refer to a parameter in the body of a function, we need to know the value of the parameter to be able to
	calculate the value of the body. This is done though the context as follows:`,Ee,ie,Ie,Ft=`<code class="language-ts"><span class="token comment">// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L56-L65</span>

override <span class="token function">evalFunctionCallExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> FunctionCallExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> calledFunction <span class="token operator">=</span> node<span class="token punctuation">.</span>$calledFunction<span class="token punctuation">;</span>
    <span class="token keyword">const</span> functionContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InterpreterContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    node<span class="token punctuation">.</span>arguments<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>arg<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> argumentValue <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>arg<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Add the parameter to the context with the value of the evaluated argument</span>
        functionContext<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>calledFunction<span class="token punctuation">.</span>parameters<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span> argumentValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>calledFunction<span class="token punctuation">,</span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,Me,re,st=`The evaluation of the function call expression has two parts. In the first part a new <code>InterpreterContext</code> is created with the original
	context as its parent. This way everything in the original context is available as well.`,Fe,le,at=`Then all the arguments of the function call are evaluated and their value is stored in the context with the corresponding parameter as its
	key.`,Re,pe,ot="Now the function is evaluated <code>main.evaluate(calledFunction, functionContext)</code> with the new context as parameter.",He,ce,it=`If we come across a <code>ParameterRef</code> inside the evaluation of the function body, this evaluation can simply lookup the value of the
	parameter:`,Pe,ue,Ne,Rt=`<code class="language-ts"><span class="token comment">// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L71-L73</span>

override <span class="token function">evalParameterRef</span><span class="token punctuation">(</span>node<span class="token operator">:</span> ParameterRef<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> ctx<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>$parameter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,Oe,fe,rt="Note that the value of the parameter lookup will be different for different calls to the function. Which is exactly what we need.",Se,K,Qe,je,Z,qe,me,lt=`The following shows the result of running the interpreter for our Expressions example. The model has one function <code>range</code> and
	two expressions. When running the interpreter from the <code>Edit</code> menu in the Freon editor, a trace of the evaluation is shown in
	the Interpreter tab. In the trace you can find two Function evaluations. At the end of both lines<br/>
	the context is shown with different values for the <code>start</code> and <code>end</code> parameters for each function call.`,De,he,Ae,de,Be;n=new ht({props:{prevLink:gt,nextLink:_t}});function Ht(e){i[1](e)}let pt={tag:"h1",id:"the-freon-interpreter-framework-1",$$slots:{default:[Jt]},$$scope:{ctx:i}};i[0][0]!==void 0&&(pt.intersecting=i[0][0]),s=new Ge({props:pt}),Je.push(()=>ze(s,"intersecting",Ht));function Pt(e){i[2](e)}let ct={tag:"h2",id:"freons-runtime-object-library-2",$$slots:{default:[Ut]},$$scope:{ctx:i}};i[0][1]!==void 0&&(ct.intersecting=i[0][1]),$=new Ge({props:ct}),Je.push(()=>ze($,"intersecting",Pt)),X=new dt({props:{$$slots:{content:[Wt],header:[Vt]},$$scope:{ctx:i}}});function Nt(e){i[3](e)}let ut={tag:"h2",id:"interpreter-context-3",$$slots:{default:[zt]},$$scope:{ctx:i}};i[0][2]!==void 0&&(ut.intersecting=i[0][2]),Y=new Ge({props:ut}),Je.push(()=>ze(Y,"intersecting",Nt));function Ot(e){i[4](e)}let ft={tag:"h2",id:"running-the-interpreter-4",$$slots:{default:[Gt]},$$scope:{ctx:i}};return i[0][3]!==void 0&&(ft.intersecting=i[0][3]),K=new Ge({props:ft}),Je.push(()=>ze(K,"intersecting",Ot)),Z=new dt({props:{$$slots:{content:[Kt],header:[Yt]},$$scope:{ctx:i}}}),he=new Bt({props:{imageName:"interpreter/model-output.png",caption:"Expressions Model in the Editor",figureNumber:2}}),de=new ht({props:{prevLink:gt,nextLink:_t}}),{c(){O(n.$$.fragment),t=_(),O(s.$$.fragment),c=_(),m=d("p"),m.innerHTML=p,u=_(),f=d("p"),f.innerHTML=M,w=_(),E=d("pre"),C=new Ue(!1),te=_(),H=d("p"),H.innerHTML=V,z=_(),P=d("p"),P.innerHTML=$e,ne=_(),R=d("pre"),F=new Ue(!1),N=_(),O($.$$.fragment),x=_(),k=d("p"),k.innerHTML=Q,G=_(),W=d("ul"),W.innerHTML=_e,xe=_(),se=d("p"),se.textContent=et,ye=_(),O(X.$$.fragment),Ce=_(),O(Y.$$.fragment),Le=_(),ae=d("p"),ae.innerHTML=tt,Te=_(),oe=d("p"),oe.textContent=nt,Ee=_(),ie=d("pre"),Ie=new Ue(!1),Me=_(),re=d("p"),re.innerHTML=st,Fe=_(),le=d("p"),le.textContent=at,Re=_(),pe=d("p"),pe.innerHTML=ot,He=_(),ce=d("p"),ce.innerHTML=it,Pe=_(),ue=d("pre"),Ne=new Ue(!1),Oe=_(),fe=d("p"),fe.textContent=rt,Se=_(),O(K.$$.fragment),je=_(),O(Z.$$.fragment),qe=_(),me=d("p"),me.innerHTML=lt,De=_(),O(he.$$.fragment),Ae=_(),O(de.$$.fragment),this.h()},l(e){S(n.$$.fragment,e),t=v(e),S(s.$$.fragment,e),c=v(e),m=g(e,"P",{"data-svelte-h":!0}),y(m)!=="svelte-bqdq52"&&(m.innerHTML=p),u=v(e),f=g(e,"P",{"data-svelte-h":!0}),y(f)!=="svelte-1teegtk"&&(f.innerHTML=M),w=v(e),E=g(e,"PRE",{class:!0});var o=I(E);C=Ve(o,!1),o.forEach(a),te=v(e),H=g(e,"P",{"data-svelte-h":!0}),y(H)!=="svelte-s4logs"&&(H.innerHTML=V),z=v(e),P=g(e,"P",{"data-svelte-h":!0}),y(P)!=="svelte-szfgsp"&&(P.innerHTML=$e),ne=v(e),R=g(e,"PRE",{class:!0});var ve=I(R);F=Ve(ve,!1),ve.forEach(a),N=v(e),S($.$$.fragment,e),x=v(e),k=g(e,"P",{"data-svelte-h":!0}),y(k)!=="svelte-1o62yv1"&&(k.innerHTML=Q),G=v(e),W=g(e,"UL",{"data-svelte-h":!0}),y(W)!=="svelte-1u2z6py"&&(W.innerHTML=_e),xe=v(e),se=g(e,"P",{"data-svelte-h":!0}),y(se)!=="svelte-89ha17"&&(se.textContent=et),ye=v(e),S(X.$$.fragment,e),Ce=v(e),S(Y.$$.fragment,e),Le=v(e),ae=g(e,"P",{"data-svelte-h":!0}),y(ae)!=="svelte-19kz7x0"&&(ae.innerHTML=tt),Te=v(e),oe=g(e,"P",{"data-svelte-h":!0}),y(oe)!=="svelte-pd7k76"&&(oe.textContent=nt),Ee=v(e),ie=g(e,"PRE",{class:!0});var ke=I(ie);Ie=Ve(ke,!1),ke.forEach(a),Me=v(e),re=g(e,"P",{"data-svelte-h":!0}),y(re)!=="svelte-novdfh"&&(re.innerHTML=st),Fe=v(e),le=g(e,"P",{"data-svelte-h":!0}),y(le)!=="svelte-14552eg"&&(le.textContent=at),Re=v(e),pe=g(e,"P",{"data-svelte-h":!0}),y(pe)!=="svelte-c5pymb"&&(pe.innerHTML=ot),He=v(e),ce=g(e,"P",{"data-svelte-h":!0}),y(ce)!=="svelte-1yoslww"&&(ce.innerHTML=it),Pe=v(e),ue=g(e,"PRE",{class:!0});var be=I(ue);Ne=Ve(be,!1),be.forEach(a),Oe=v(e),fe=g(e,"P",{"data-svelte-h":!0}),y(fe)!=="svelte-17wxq7i"&&(fe.textContent=rt),Se=v(e),S(K.$$.fragment,e),je=v(e),S(Z.$$.fragment,e),qe=v(e),me=g(e,"P",{"data-svelte-h":!0}),y(me)!=="svelte-1ytj7qc"&&(me.innerHTML=lt),De=v(e),S(he.$$.fragment,e),Ae=v(e),S(de.$$.fragment,e),this.h()},h(){C.a=null,b(E,"class","language-ts"),F.a=null,b(R,"class","language-ts"),Ie.a=null,b(ie,"class","language-ts"),Ne.a=null,b(ue,"class","language-ts")},m(e,o){j(n,e,o),l(e,t,o),j(s,e,o),l(e,c,o),l(e,m,o),l(e,u,o),l(e,f,o),l(e,w,o),l(e,E,o),C.m(U,E),l(e,te,o),l(e,H,o),l(e,z,o),l(e,P,o),l(e,ne,o),l(e,R,o),F.m(L,R),l(e,N,o),j($,e,o),l(e,x,o),l(e,k,o),l(e,G,o),l(e,W,o),l(e,xe,o),l(e,se,o),l(e,ye,o),j(X,e,o),l(e,Ce,o),j(Y,e,o),l(e,Le,o),l(e,ae,o),l(e,Te,o),l(e,oe,o),l(e,Ee,o),l(e,ie,o),Ie.m(Ft,ie),l(e,Me,o),l(e,re,o),l(e,Fe,o),l(e,le,o),l(e,Re,o),l(e,pe,o),l(e,He,o),l(e,ce,o),l(e,Pe,o),l(e,ue,o),Ne.m(Rt,ue),l(e,Oe,o),l(e,fe,o),l(e,Se,o),j(K,e,o),l(e,je,o),j(Z,e,o),l(e,qe,o),l(e,me,o),l(e,De,o),j(he,e,o),l(e,Ae,o),j(de,e,o),Be=!0},p(e,[o]){const ve={};o&64&&(ve.$$scope={dirty:o,ctx:e}),!r&&o&1&&(r=!0,ve.intersecting=e[0][0],We(()=>r=!1)),s.$set(ve);const ke={};o&64&&(ke.$$scope={dirty:o,ctx:e}),!h&&o&1&&(h=!0,ke.intersecting=e[0][1],We(()=>h=!1)),$.$set(ke);const be={};o&64&&(be.$$scope={dirty:o,ctx:e}),X.$set(be);const Xe={};o&64&&(Xe.$$scope={dirty:o,ctx:e}),!Ke&&o&1&&(Ke=!0,Xe.intersecting=e[0][2],We(()=>Ke=!1)),Y.$set(Xe);const Ze={};o&64&&(Ze.$$scope={dirty:o,ctx:e}),!Qe&&o&1&&(Qe=!0,Ze.intersecting=e[0][3],We(()=>Qe=!1)),K.$set(Ze);const mt={};o&64&&(mt.$$scope={dirty:o,ctx:e}),Z.$set(mt)},i(e){Be||(q(n.$$.fragment,e),q(s.$$.fragment,e),q($.$$.fragment,e),q(X.$$.fragment,e),q(Y.$$.fragment,e),q(K.$$.fragment,e),q(Z.$$.fragment,e),q(he.$$.fragment,e),q(de.$$.fragment,e),Be=!0)},o(e){D(n.$$.fragment,e),D(s.$$.fragment,e),D($.$$.fragment,e),D(X.$$.fragment,e),D(Y.$$.fragment,e),D(K.$$.fragment,e),D(Z.$$.fragment,e),D(he.$$.fragment,e),D(de.$$.fragment,e),Be=!1},d(e){e&&(a(t),a(c),a(m),a(u),a(f),a(w),a(E),a(te),a(H),a(z),a(P),a(ne),a(R),a(N),a(x),a(k),a(G),a(W),a(xe),a(se),a(ye),a(Ce),a(Le),a(ae),a(Te),a(oe),a(Ee),a(ie),a(Me),a(re),a(Fe),a(le),a(Re),a(pe),a(He),a(ce),a(Pe),a(ue),a(Oe),a(fe),a(Se),a(je),a(qe),a(me),a(De),a(Ae)),A(n,e),A(s,e),A($,e),A(X,e),A(Y,e),A(K,e),A(Z,e),A(he,e),A(de,e)}}}let gt="/Documentation/Interpreter_Framework/The_Expressions_DSL",_t="/Documentation/Customizations";function Xt(i,n,t){let s;yt(i,ge,f=>t(5,s=f)),we(ge,s=[{title:"The Freon Interpreter Framework",visible:!1,ref:"#the-freon-interpreter-framework-1"},{title:"Freon’s Runtime Object Library",visible:!1,ref:"#freons-runtime-object-library-2"},{title:"Interpreter Context",visible:!1,ref:"#interpreter-context-3"},{title:"Running the Interpreter",visible:!1,ref:"#running-the-interpreter-4"}],s);let r=[];St(()=>{document.querySelectorAll("pre").forEach(M=>{const w=document.createElement("div");w.className="copy-prompt";const E=document.createElement("p");E.innerHTML="👆 Click to copy",E.className="copy-prompt-p";const C=document.createElement("img");C.src="/icons/copy-icon.svg",C.className="copy-prompt-img",w.appendChild(C),w.appendChild(E),M.appendChild(w),M.querySelector(".copy-prompt > p").addEventListener("click",U=>{Dt(M.querySelector("code").textContent),M.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{M.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function c(f){i.$$.not_equal(r[0],f)&&(r[0]=f,t(0,r))}function m(f){i.$$.not_equal(r[1],f)&&(r[1]=f,t(0,r))}function p(f){i.$$.not_equal(r[2],f)&&(r[2]=f,t(0,r))}function u(f){i.$$.not_equal(r[3],f)&&(r[3]=f,t(0,r))}return i.$$.update=()=>{i.$$.dirty&1&&we(ge,s[0].visible=r[0],s),i.$$.dirty&1&&we(ge,s[1].visible=r[1],s),i.$$.dirty&1&&we(ge,s[2].visible=r[2],s),i.$$.dirty&1&&we(ge,s[3].visible=r[3],s)},[r,c,m,p,u]}class Zt extends It{constructor(n){super(),Mt(this,n,Xt,Qt,xt,{})}}function vt(i,n,t){const s=i.slice();return s[6]=n[t],s[8]=t,s}function kt(i,n,t){const s=i.slice();return s[6]=n[t],s[8]=t,s}function en(i){let n,t;return{c(){n=d("img"),this.h()},l(s){n=g(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){b(n,"class","page-toc-small-img"),Et(n.src,t="/icons/down-arrow.png")||b(n,"src",t),b(n,"alt","arrow down")},m(s,r){l(s,n,r)},d(s){s&&a(n)}}}function tn(i){let n,t;return{c(){n=d("img"),this.h()},l(s){n=g(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){b(n,"class","page-toc-small-img"),Et(n.src,t="/icons/upload.png")||b(n,"src",t),b(n,"alt","arrow up")},m(s,r){l(s,n,r)},d(s){s&&a(n)}}}function $t(i){let n,t,s=Ye(i[0]),r=[];for(let c=0;c<s.length;c+=1)r[c]=bt(kt(i,s,c));return{c(){n=d("div"),t=d("ul");for(let c=0;c<r.length;c+=1)r[c].c();this.h()},l(c){n=g(c,"DIV",{class:!0});var m=I(n);t=g(m,"UL",{class:!0});var p=I(t);for(let u=0;u<r.length;u+=1)r[u].l(p);p.forEach(a),m.forEach(a),this.h()},h(){b(t,"class","page-ul"),b(n,"class","toc-details")},m(c,m){l(c,n,m),T(n,t);for(let p=0;p<r.length;p+=1)r[p]&&r[p].m(t,null)},p(c,m){if(m&5){s=Ye(c[0]);let p;for(p=0;p<s.length;p+=1){const u=kt(c,s,p);r[p]?r[p].p(u,m):(r[p]=bt(u),r[p].c(),r[p].m(t,null))}for(;p<r.length;p+=1)r[p].d(1);r.length=s.length}},d(c){c&&a(n),Lt(r,c)}}}function bt(i){let n,t,s=i[6].title+"",r,c,m;return{c(){n=d("li"),t=d("a"),r=B(s),m=_(),this.h()},l(p){n=g(p,"LI",{class:!0});var u=I(n);t=g(u,"A",{href:!0});var f=I(t);r=J(f,s),f.forEach(a),m=v(u),u.forEach(a),this.h()},h(){b(t,"href",c=i[6].ref),ee(t,"page-visible",i[8]===i[2]),ee(t,"page-nonvisible",i[8]!==i[2]),b(n,"class","page-toc-text")},m(p,u){l(p,n,u),T(n,t),T(t,r),T(n,m)},p(p,u){u&1&&s!==(s=p[6].title+"")&&Tt(r,s),u&1&&c!==(c=p[6].ref)&&b(t,"href",c),u&4&&ee(t,"page-visible",p[8]===p[2]),u&4&&ee(t,"page-nonvisible",p[8]!==p[2])},d(p){p&&a(n)}}}function wt(i){let n,t,s=i[6].title+"",r,c,m;return{c(){n=d("li"),t=d("a"),r=B(s),m=_(),this.h()},l(p){n=g(p,"LI",{class:!0});var u=I(n);t=g(u,"A",{href:!0});var f=I(t);r=J(f,s),f.forEach(a),m=v(u),u.forEach(a),this.h()},h(){b(t,"href",c=i[6].ref),ee(t,"page-visible",i[8]===i[2]),ee(t,"page-nonvisible",i[8]!==i[2]),b(n,"class","page-toc-text")},m(p,u){l(p,n,u),T(n,t),T(t,r),T(n,m)},p(p,u){u&1&&s!==(s=p[6].title+"")&&Tt(r,s),u&1&&c!==(c=p[6].ref)&&b(t,"href",c),u&4&&ee(t,"page-visible",p[8]===p[2]),u&4&&ee(t,"page-nonvisible",p[8]!==p[2])},d(p){p&&a(n)}}}function nn(i){let n,t,s,r="On this page ...",c,m,p,u,f,M,w,E,C,U,te="On this page",H,V,z,P,$e;function ne(h,x){return h[1]?tn:en}let R=ne(i),F=R(i),L=i[1]&&$t(i);f=new At({}),w=new Zt({});let N=Ye(i[0]),$=[];for(let h=0;h<N.length;h+=1)$[h]=wt(vt(i,N,h));return{c(){n=d("div"),t=d("div"),s=d("p"),s.textContent=r,c=_(),m=d("button"),F.c(),p=_(),L&&L.c(),u=_(),O(f.$$.fragment),M=_(),O(w.$$.fragment),E=_(),C=d("nav"),U=d("h3"),U.textContent=te,H=_(),V=d("ul");for(let h=0;h<$.length;h+=1)$[h].c();this.h()},l(h){n=g(h,"DIV",{class:!0});var x=I(n);t=g(x,"DIV",{class:!0});var k=I(t);s=g(k,"P",{class:!0,"data-svelte-h":!0}),y(s)!=="svelte-1929lhs"&&(s.textContent=r),c=v(k),m=g(k,"BUTTON",{class:!0});var Q=I(m);F.l(Q),Q.forEach(a),k.forEach(a),p=v(x),L&&L.l(x),u=v(x),S(f.$$.fragment,x),M=v(x),S(w.$$.fragment,x),x.forEach(a),E=v(h),C=g(h,"NAV",{class:!0});var G=I(C);U=g(G,"H3",{class:!0,"data-svelte-h":!0}),y(U)!=="svelte-1hgt7fi"&&(U.textContent=te),H=v(G),V=g(G,"UL",{class:!0});var W=I(V);for(let _e=0;_e<$.length;_e+=1)$[_e].l(W);W.forEach(a),G.forEach(a),this.h()},h(){b(s,"class","page-toc-small-title"),b(m,"class","page-toc-small-expand-button"),b(t,"class","page-toc-small"),b(n,"class","page-main"),b(U,"class","page-toc-title"),b(V,"class","page-ul"),b(C,"class","page-toc")},m(h,x){l(h,n,x),T(n,t),T(t,s),T(t,c),T(t,m),F.m(m,null),T(n,p),L&&L.m(n,null),T(n,u),j(f,n,null),T(n,M),j(w,n,null),l(h,E,x),l(h,C,x),T(C,U),T(C,H),T(C,V);for(let k=0;k<$.length;k+=1)$[k]&&$[k].m(V,null);z=!0,P||($e=jt(m,"click",i[4]),P=!0)},p(h,[x]){if(R!==(R=ne(h))&&(F.d(1),F=R(h),F&&(F.c(),F.m(m,null))),h[1]?L?L.p(h,x):(L=$t(h),L.c(),L.m(n,u)):L&&(L.d(1),L=null),x&5){N=Ye(h[0]);let k;for(k=0;k<N.length;k+=1){const Q=vt(h,N,k);$[k]?$[k].p(Q,x):($[k]=wt(Q),$[k].c(),$[k].m(V,null))}for(;k<$.length;k+=1)$[k].d(1);$.length=N.length}},i(h){z||(q(f.$$.fragment,h),q(w.$$.fragment,h),z=!0)},o(h){D(f.$$.fragment,h),D(w.$$.fragment,h),z=!1},d(h){h&&(a(n),a(E),a(C)),F.d(),L&&L.d(),A(f),A(w),Lt($,h),P=!1,$e()}}}function sn(i,n,t){let s,r;yt(i,ge,f=>t(0,r=f));let c=!1;function m(f){let M=s;for(let w=0;w<f.length;w++)if(f[w].visible)return w;return M}function p(){t(1,c=!c)}const u=()=>{p()};return i.$$.update=()=>{i.$$.dirty&1&&t(2,s=m(r))},[r,c,s,p,u]}class fn extends It{constructor(n){super(),Mt(this,n,sn,nn,xt,{})}}export{fn as component};
//# sourceMappingURL=46.Bf-BQWOk.js.map
