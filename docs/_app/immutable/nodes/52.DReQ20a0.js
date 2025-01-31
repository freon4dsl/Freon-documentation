import{s as wn,A as ie,a as u,e as d,H as le,f as m,b as h,m as b,d as E,F as ce,g as o,h as v,i as l,B as re,v as kn,x as te,w as jn,t as q,o as A,n as Gt,j as M,C as Yn,D as Cn,E as ue,q as Ln,p as En}from"../chunks/scheduler.CIEH-92L.js";import{S as Pn,i as Hn,e as pe,c as I,a as R,m as N,t as D,b as x,d as F}from"../chunks/index.HLF2pGCU.js";import{e as It}from"../chunks/each.BLebZWAa.js";import{w as zn}from"../chunks/index.bxqR-5-s.js";import{P as hn,S as fe,c as Kn,B as Jn}from"../chunks/index.yTjXiNmY.js";import{N as St}from"../chunks/Note.DEjaTDAW.js";const j=zn([]);function Qn(i){let n;return{c(){n=q("Type Provider")},l(t){n=A(t,"Type Provider")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function Xn(i){let n;return{c(){n=q("Typing Rules")},l(t){n=A(t,"Typing Rules")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function Zn(i){let n;return{c(){n=q("Types or Type Concepts")},l(t){n=A(t,"Types or Type Concepts")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function es(i){let n;return{c(){n=q("Terms That Have a Type")},l(t){n=A(t,"Terms That Have a Type")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function ts(i){let n;return{c(){n=q("Inference Rules")},l(t){n=A(t,"Inference Rules")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function ns(i){let n;return{c(){n=q("This is a valid inference rule, only if 'declaredType' is an instance of a concept that is marked 'isType'.")},l(t){n=A(t,"This is a valid inference rule, only if 'declaredType' is an instance of a concept that is marked 'isType'.")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function ss(i){let n;return{c(){n=q("Type Equals and Type Conformance Rules")},l(t){n=A(t,"Type Equals and Type Conformance Rules")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function os(i){let n,t,a="equalsto",c;return{c(){n=q("Type concept instances can not be compared based on their identity, instead you will need to use an "),t=d("code"),t.textContent=a,c=q(" entry.")},l(r){n=A(r,"Type concept instances can not be compared based on their identity, instead you will need to use an "),t=h(r,"CODE",{"data-svelte-h":!0}),b(t)!=="svelte-8e6t6s"&&(t.textContent=a),c=A(r," entry.")},m(r,y){l(r,n,y),l(r,t,y),l(r,c,y)},p:Gt,d(r){r&&(o(n),o(t),o(c))}}}function as(i){let n,t,a="conformsto";return{c(){n=q("Use of "),t=d("strong"),t.textContent=a},l(c){n=A(c,"Use of "),t=h(c,"STRONG",{"data-svelte-h":!0}),b(t)!=="svelte-ev085q"&&(t.textContent=a)},m(c,r){l(c,n,r),l(c,t,r)},p:Gt,d(c){c&&(o(n),o(t))}}}function is(i){let n,t,a="conformsto",c,r,y="where",p;return{c(){n=q("Be careful with the use of "),t=d("code"),t.textContent=a,c=q(" within "),r=d("code"),r.textContent=y,p=q(` clauses because this can lead to an explosion of newly created
		type concept instances.`)},l(f){n=A(f,"Be careful with the use of "),t=h(f,"CODE",{"data-svelte-h":!0}),b(t)!=="svelte-14tx2qe"&&(t.textContent=a),c=A(f," within "),r=h(f,"CODE",{"data-svelte-h":!0}),b(r)!=="svelte-158rkl7"&&(r.textContent=y),p=A(f,` clauses because this can lead to an explosion of newly created
		type concept instances.`)},m(f,$){l(f,n,$),l(f,t,$),l(f,c,$),l(f,r,$),l(f,p,$)},p:Gt,d(f){f&&(o(n),o(t),o(c),o(r),o(p))}}}function ls(i){let n;return{c(){n=q("Rules That Apply to Any Concept")},l(t){n=A(t,"Rules That Apply to Any Concept")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function cs(i){let n;return{c(){n=q("Anytype rules must be included after the 'hasType' rules and before the inference rules.")},l(t){n=A(t,"Anytype rules must be included after the 'hasType' rules and before the inference rules.")},m(t,a){l(t,n,a)},d(t){t&&o(n)}}}function rs(i){let n,t,a,c,r,y,p=`Typing determines which elements are permissible in specific locations within a model or Abstract Syntax Tree (AST). For example, in the
	expression <code>a + 6</code>, it is generally expected that <code>a</code> represents a numeric value, as other types of values would not
	be valid in this context.`,f,$,Y=`Freon addresses many potential typing issues by enforcing the use of a typed metamodel. This ensures that when a certain type, such as a
	boolean, is required, only a boolean value can be provided. However, there are scenarios where the metamodel permits a broader range of
	values than desired, which can lead to unintended flexibility.`,L,O,g=`The <strong>type provider</strong> (or <strong>typer</strong>, for short) definition provides the information necessary to determine the
	type of element. Any part of the typer definition must be included in a file with the extension <code>.type</code>. All files with this
	extension in the <a href="/Documentation/Overview/Getting_Started#template-project-startup-3"><em>defs</em> folder</a>
	(i.e. the folder were you keep your definition files) are combined into one typer definition.`,P,H,V,S,G,Fe=`In the typer definition file you can indicate typing rules for every
	<em>concept</em> or <em>interface</em> in your language. The typing rules come in four categories. Each category is there to answer one of
	the following questions.`,me,z,de="<li>Which <em>concepts</em> or <em>interfaces</em> are considered to be types?</li> <li>Which <em>concepts</em> or <em>interfaces</em> are considered to have a type?</li> <li>How to determine the type of a <em>concept</em> or <em>interface</em>?</li> <li>Which types are considered to be equal or conforming?</li>",B,w,K="Note that these sections need to be in the <code>.type</code> file in this order.",k,_,C,T,U,he=`In Freon all types are completely separate from the elements of your AST. These are called <strong>type concepts</strong>, which all
	implements the interface <strong>FreType</strong> from the <code>@freon4dsl/core</code> package. Type concepts can be defined in two ways.
	Either they are specified in the <code>.type</code> file, or some AST nodes are declared to be types. In the latter case, Freon generates a
	type concept which holds a reference to the AST node.`,_e,W,Ut=`To indicate which AST concepts are considered to be types in your language, the keyword <code>isType</code> is used, followed by all types
	in your language between curly brackets, and separated by commas.`,Ye,ye,ze,Mn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L4-L4
</span>
<span class="token class-name">istype</span> &#123; NamedType &#125;</code>`,Ke,ge,Vt=`To define new type concepts you can use a simplified version of the concept definition in the .ast files. The properties may only be
	instances of other type concepts, or references to limited concepts. The property
	<code>base</code> in the next example is an instance of the interface <code>FreType</code>, whereas the property <code>kind</code> refers
	to the limited concept <code>GenericKind</code>.`,Je,$e,Qe,qn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L6-L9
</span>
<span class="token keyword">type</span> <span class="token class-name">GenericType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;</code>`,Xe,ve,Wt="Note that is it often good practise to have a common superclass or interface for all your types, but this is not necessary.",Ze,J,Rt,et,Te,jt=`Not all AST nodes need to have a type associated to it. Only those nodes for which you need a validation rule, or have another reason to
	require a type, need to be marked as having a type. We refer to those AST nodes as <strong>terms</strong>, so as not to confuse these with
	<a href="/Documentation/Creating_the_Metamodel/Language_Structure#expression-concept-5"><code>expression concepts</code></a>, which have a
	different meaning.`,tt,be,Yt=`You can indicate which AST nodes are terms by the keyword <code>hasType</code> followed by all terms in your language between curly brackets,
	and separated by commas.`,nt,we,st,An=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L12-L12
</span>
<span class="token class-name">hastype</span> &#123; DocuExpression, DocuType, CalcFunction, Parameter, RiskRef, PayoutRef &#125;</code>`,ot,Q,Nt,at,ke,zt=`In order to determine the type of a term, there needs to be a rule, called an <strong>inference rule</strong>, for each concept or
	interface that is marked <code>hasType</code>. Each of these rules should result in a type concept.`,it,Ce,Kt=`The following example gives an inference rule that states that the type of calculation function is the value of its attribute <code>declaredType</code>. This value is an instance of <code>DocuType</code>, which indeed was declared to represent a type by the above declaration. First, we
	show the metamodel definition.`,lt,Le,ct,Sn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L68-L74
</span>
<span class="token keyword">concept</span> <span class="token class-name">CalcFunction</span> &#123;
    name: <span class="token builtin">identifier</span>;                   <span class="token comment">// the name
</span>    description?: <span class="token class-name">Description</span>;          <span class="token comment">// an optional description
</span>    declaredType : <span class="token class-name">DocuType</span>;            <span class="token comment">// the type
</span>    body: <span class="token class-name">DocuExpression</span>;               <span class="token comment">// the actual calculation definition
</span>    parameters: <span class="token class-name">Parameter</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;            <span class="token comment">// any parameters
</span>&#125;</code>`,rt,Ee,Jt="And, the typer definition looks like this.",pt,Pe,ft,In=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L18-L20
</span>
<span class="token class-name">CalcFunction</span> &#123;
    <span class="token keyword">infertype</span> <span class="token variable">self</span>.declaredType;
&#125;</code>`,ut,ne,mt,He,Qt=`Concepts that are types (as indicated by <code>isType</code>) can also be terms. If an inference rule is present, this rule will determine
	the type of such a term. If no rule is present, the type of the AST node is the <em>type concept</em> generated for this AST node.`,dt,Me,Xt="In an inference rule, as in other definition files, it is possible to use the predefined instances of a <strong>limited concept</strong>.",ht,qe,_t,Rn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L27-L29
</span>
<span class="token class-name">RiskAdjustmentRef</span> &#123;
    <span class="token keyword">infertype</span> PercentageType:<span class="token class-name">Percentage</span>;
&#125;</code>`,yt,X,Dt,gt,Ae,Zt=`The last section in the type definition is where rules are given that state which types are considered equal or conforming. Each rule can
	have two entries: the <code>conformsto</code> and the <code>equalsto</code> entries. Within these entries it is also possible to use the predefined
	instances of a limited concept.`,$t,Se,vt,Nn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L81-L89
</span>
<span class="token comment">// Which types are 'equal' to each other?
</span><span class="token class-name">NamedType</span> &#123;
    <span class="token keyword">equalsto</span> aa:<span class="token class-name">NamedType</span> <span class="token class-name">where</span> &#123;
            aa.name <span class="token keyword">equalsto</span> <span class="token variable">self</span>.name;
        &#125;;
    <span class="token keyword">conformsto</span> other:<span class="token class-name">NamedType</span> <span class="token class-name">where</span> &#123;
            other.name <span class="token keyword">equalsto</span> <span class="token variable">self</span>.name;
        &#125;;
&#125;</code>`,Tt,Ie,en=`The <code>where</code> clause in the above example can be used when a type has some structure. For every property in the type concept a
	condition is given. If all conditions evaluate to true then the <code>where</code> clause results in true.`,bt,se,wt,Z,xt,kt,Re,tn=`In a condition of a <code>where</code> clause you may use <code>conformsto</code>. In that case, invocation of the rule will produce the
	cartesian product of all super concepts of the properties in the conditions. For an example, see
	<a href="/Examples/Generic_Types">Typer Example</a>.`,Ct,oe,Lt,ee,Ft,Et,Ne,nn=`Conformance and other rules can also be defined to apply to <strong>any</strong> concept. Obviously, this means that any instance of any concept
	conforms to the given value.`,Pt,De,Ht,Dn=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type#L21-L28
</span>
    <span class="token keyword">conformsto</span> PredefinedType:<span class="token class-name">ANY</span>; <span class="token comment">// PredefinedType:ANY is the least specific type
</span>&#125;

<span class="token class-name">PredefinedType</span> &#123;
    PredefinedType:<span class="token class-name">NULL</span> <span class="token keyword">conformsto</span> anytype; <span class="token comment">// PredefinedType:NULL is the most specific type
</span>    NUMBER <span class="token keyword">conformsto</span> STRING;
&#125;
</code>`,Mt,ae,qt,xe,At;n=new hn({props:{prevLink:_n,nextLink:yn}});function xn(e){i[1](e)}let sn={tag:"h1",id:"type-provider-1",$$slots:{default:[Qn]},$$scope:{ctx:i}};i[0][0]!==void 0&&(sn.intersecting=i[0][0]),a=new fe({props:sn}),ie.push(()=>pe(a,"intersecting",xn));function Fn(e){i[2](e)}let on={tag:"h1",id:"typing-rules-2",$$slots:{default:[Xn]},$$scope:{ctx:i}};i[0][1]!==void 0&&(on.intersecting=i[0][1]),H=new fe({props:on}),ie.push(()=>pe(H,"intersecting",Fn));function On(e){i[3](e)}let an={tag:"h2",id:"types-or-type-concepts-3",$$slots:{default:[Zn]},$$scope:{ctx:i}};i[0][2]!==void 0&&(an.intersecting=i[0][2]),_=new fe({props:an}),ie.push(()=>pe(_,"intersecting",On));function Bn(e){i[4](e)}let ln={tag:"h2",id:"terms-that-have-a-type-4",$$slots:{default:[es]},$$scope:{ctx:i}};i[0][3]!==void 0&&(ln.intersecting=i[0][3]),J=new fe({props:ln}),ie.push(()=>pe(J,"intersecting",Bn));function Gn(e){i[5](e)}let cn={tag:"h2",id:"inference-rules-5",$$slots:{default:[ts]},$$scope:{ctx:i}};i[0][4]!==void 0&&(cn.intersecting=i[0][4]),Q=new fe({props:cn}),ie.push(()=>pe(Q,"intersecting",Gn)),ne=new St({props:{$$slots:{content:[ns]},$$scope:{ctx:i}}});function Un(e){i[6](e)}let rn={tag:"h2",id:"type-equals-and-type-conformance-rules-6",$$slots:{default:[ss]},$$scope:{ctx:i}};i[0][5]!==void 0&&(rn.intersecting=i[0][5]),X=new fe({props:rn}),ie.push(()=>pe(X,"intersecting",Un)),se=new St({props:{$$slots:{content:[os]},$$scope:{ctx:i}}});function Vn(e){i[7](e)}let pn={tag:"h2",id:"use-of-conformsto-7",$$slots:{default:[as]},$$scope:{ctx:i}};i[0][6]!==void 0&&(pn.intersecting=i[0][6]),Z=new fe({props:pn}),ie.push(()=>pe(Z,"intersecting",Vn)),oe=new St({props:{$$slots:{content:[is]},$$scope:{ctx:i}}});function Wn(e){i[8](e)}let fn={tag:"h2",id:"rules-that-apply-to-any-concept-8",$$slots:{default:[ls]},$$scope:{ctx:i}};return i[0][7]!==void 0&&(fn.intersecting=i[0][7]),ee=new fe({props:fn}),ie.push(()=>pe(ee,"intersecting",Wn)),ae=new St({props:{$$slots:{content:[cs]},$$scope:{ctx:i}}}),xe=new hn({props:{prevLink:_n,nextLink:yn}}),{c(){I(n.$$.fragment),t=u(),I(a.$$.fragment),r=u(),y=d("p"),y.innerHTML=p,f=u(),$=d("p"),$.textContent=Y,L=u(),O=d("p"),O.innerHTML=g,P=u(),I(H.$$.fragment),S=u(),G=d("p"),G.innerHTML=Fe,me=u(),z=d("ol"),z.innerHTML=de,B=u(),w=d("p"),w.innerHTML=K,k=u(),I(_.$$.fragment),T=u(),U=d("p"),U.innerHTML=he,_e=u(),W=d("p"),W.innerHTML=Ut,Ye=u(),ye=d("pre"),ze=new le(!1),Ke=u(),ge=d("p"),ge.innerHTML=Vt,Je=u(),$e=d("pre"),Qe=new le(!1),Xe=u(),ve=d("p"),ve.textContent=Wt,Ze=u(),I(J.$$.fragment),et=u(),Te=d("p"),Te.innerHTML=jt,tt=u(),be=d("p"),be.innerHTML=Yt,nt=u(),we=d("pre"),st=new le(!1),ot=u(),I(Q.$$.fragment),at=u(),ke=d("p"),ke.innerHTML=zt,it=u(),Ce=d("p"),Ce.innerHTML=Kt,lt=u(),Le=d("pre"),ct=new le(!1),rt=u(),Ee=d("p"),Ee.textContent=Jt,pt=u(),Pe=d("pre"),ft=new le(!1),ut=u(),I(ne.$$.fragment),mt=u(),He=d("p"),He.innerHTML=Qt,dt=u(),Me=d("p"),Me.innerHTML=Xt,ht=u(),qe=d("pre"),_t=new le(!1),yt=u(),I(X.$$.fragment),gt=u(),Ae=d("p"),Ae.innerHTML=Zt,$t=u(),Se=d("pre"),vt=new le(!1),Tt=u(),Ie=d("p"),Ie.innerHTML=en,bt=u(),I(se.$$.fragment),wt=u(),I(Z.$$.fragment),kt=u(),Re=d("p"),Re.innerHTML=tn,Ct=u(),I(oe.$$.fragment),Lt=u(),I(ee.$$.fragment),Et=u(),Ne=d("p"),Ne.innerHTML=nn,Pt=u(),De=d("pre"),Ht=new le(!1),Mt=u(),I(ae.$$.fragment),qt=u(),I(xe.$$.fragment),this.h()},l(e){R(n.$$.fragment,e),t=m(e),R(a.$$.fragment,e),r=m(e),y=h(e,"P",{"data-svelte-h":!0}),b(y)!=="svelte-hb6rns"&&(y.innerHTML=p),f=m(e),$=h(e,"P",{"data-svelte-h":!0}),b($)!=="svelte-if70w4"&&($.textContent=Y),L=m(e),O=h(e,"P",{"data-svelte-h":!0}),b(O)!=="svelte-1usjryx"&&(O.innerHTML=g),P=m(e),R(H.$$.fragment,e),S=m(e),G=h(e,"P",{"data-svelte-h":!0}),b(G)!=="svelte-1ktcc5m"&&(G.innerHTML=Fe),me=m(e),z=h(e,"OL",{"data-svelte-h":!0}),b(z)!=="svelte-u9a1z9"&&(z.innerHTML=de),B=m(e),w=h(e,"P",{"data-svelte-h":!0}),b(w)!=="svelte-1ukp7ai"&&(w.innerHTML=K),k=m(e),R(_.$$.fragment,e),T=m(e),U=h(e,"P",{"data-svelte-h":!0}),b(U)!=="svelte-eg1c52"&&(U.innerHTML=he),_e=m(e),W=h(e,"P",{"data-svelte-h":!0}),b(W)!=="svelte-1poe7eh"&&(W.innerHTML=Ut),Ye=m(e),ye=h(e,"PRE",{class:!0});var s=E(ye);ze=ce(s,!1),s.forEach(o),Ke=m(e),ge=h(e,"P",{"data-svelte-h":!0}),b(ge)!=="svelte-nvz46o"&&(ge.innerHTML=Vt),Je=m(e),$e=h(e,"PRE",{class:!0});var Oe=E($e);Qe=ce(Oe,!1),Oe.forEach(o),Xe=m(e),ve=h(e,"P",{"data-svelte-h":!0}),b(ve)!=="svelte-17ncktz"&&(ve.textContent=Wt),Ze=m(e),R(J.$$.fragment,e),et=m(e),Te=h(e,"P",{"data-svelte-h":!0}),b(Te)!=="svelte-1af8sk8"&&(Te.innerHTML=jt),tt=m(e),be=h(e,"P",{"data-svelte-h":!0}),b(be)!=="svelte-1uto2k3"&&(be.innerHTML=Yt),nt=m(e),we=h(e,"PRE",{class:!0});var Be=E(we);st=ce(Be,!1),Be.forEach(o),ot=m(e),R(Q.$$.fragment,e),at=m(e),ke=h(e,"P",{"data-svelte-h":!0}),b(ke)!=="svelte-wtns8u"&&(ke.innerHTML=zt),it=m(e),Ce=h(e,"P",{"data-svelte-h":!0}),b(Ce)!=="svelte-10icsb5"&&(Ce.innerHTML=Kt),lt=m(e),Le=h(e,"PRE",{class:!0});var Ge=E(Le);ct=ce(Ge,!1),Ge.forEach(o),rt=m(e),Ee=h(e,"P",{"data-svelte-h":!0}),b(Ee)!=="svelte-l0fnm0"&&(Ee.textContent=Jt),pt=m(e),Pe=h(e,"PRE",{class:!0});var Ue=E(Pe);ft=ce(Ue,!1),Ue.forEach(o),ut=m(e),R(ne.$$.fragment,e),mt=m(e),He=h(e,"P",{"data-svelte-h":!0}),b(He)!=="svelte-1asafs9"&&(He.innerHTML=Qt),dt=m(e),Me=h(e,"P",{"data-svelte-h":!0}),b(Me)!=="svelte-hdbxn7"&&(Me.innerHTML=Xt),ht=m(e),qe=h(e,"PRE",{class:!0});var Ve=E(qe);_t=ce(Ve,!1),Ve.forEach(o),yt=m(e),R(X.$$.fragment,e),gt=m(e),Ae=h(e,"P",{"data-svelte-h":!0}),b(Ae)!=="svelte-1n6o004"&&(Ae.innerHTML=Zt),$t=m(e),Se=h(e,"PRE",{class:!0});var je=E(Se);vt=ce(je,!1),je.forEach(o),Tt=m(e),Ie=h(e,"P",{"data-svelte-h":!0}),b(Ie)!=="svelte-18kpcbb"&&(Ie.innerHTML=en),bt=m(e),R(se.$$.fragment,e),wt=m(e),R(Z.$$.fragment,e),kt=m(e),Re=h(e,"P",{"data-svelte-h":!0}),b(Re)!=="svelte-cqx950"&&(Re.innerHTML=tn),Ct=m(e),R(oe.$$.fragment,e),Lt=m(e),R(ee.$$.fragment,e),Et=m(e),Ne=h(e,"P",{"data-svelte-h":!0}),b(Ne)!=="svelte-1lqvigh"&&(Ne.innerHTML=nn),Pt=m(e),De=h(e,"PRE",{class:!0});var We=E(De);Ht=ce(We,!1),We.forEach(o),Mt=m(e),R(ae.$$.fragment,e),qt=m(e),R(xe.$$.fragment,e),this.h()},h(){ze.a=null,v(ye,"class","language-freon"),Qe.a=null,v($e,"class","language-freon"),st.a=null,v(we,"class","language-freon"),ct.a=null,v(Le,"class","language-freon"),ft.a=null,v(Pe,"class","language-freon"),_t.a=null,v(qe,"class","language-freon"),vt.a=null,v(Se,"class","language-freon"),Ht.a=null,v(De,"class","language-freon")},m(e,s){N(n,e,s),l(e,t,s),N(a,e,s),l(e,r,s),l(e,y,s),l(e,f,s),l(e,$,s),l(e,L,s),l(e,O,s),l(e,P,s),N(H,e,s),l(e,S,s),l(e,G,s),l(e,me,s),l(e,z,s),l(e,B,s),l(e,w,s),l(e,k,s),N(_,e,s),l(e,T,s),l(e,U,s),l(e,_e,s),l(e,W,s),l(e,Ye,s),l(e,ye,s),ze.m(Mn,ye),l(e,Ke,s),l(e,ge,s),l(e,Je,s),l(e,$e,s),Qe.m(qn,$e),l(e,Xe,s),l(e,ve,s),l(e,Ze,s),N(J,e,s),l(e,et,s),l(e,Te,s),l(e,tt,s),l(e,be,s),l(e,nt,s),l(e,we,s),st.m(An,we),l(e,ot,s),N(Q,e,s),l(e,at,s),l(e,ke,s),l(e,it,s),l(e,Ce,s),l(e,lt,s),l(e,Le,s),ct.m(Sn,Le),l(e,rt,s),l(e,Ee,s),l(e,pt,s),l(e,Pe,s),ft.m(In,Pe),l(e,ut,s),N(ne,e,s),l(e,mt,s),l(e,He,s),l(e,dt,s),l(e,Me,s),l(e,ht,s),l(e,qe,s),_t.m(Rn,qe),l(e,yt,s),N(X,e,s),l(e,gt,s),l(e,Ae,s),l(e,$t,s),l(e,Se,s),vt.m(Nn,Se),l(e,Tt,s),l(e,Ie,s),l(e,bt,s),N(se,e,s),l(e,wt,s),N(Z,e,s),l(e,kt,s),l(e,Re,s),l(e,Ct,s),N(oe,e,s),l(e,Lt,s),N(ee,e,s),l(e,Et,s),l(e,Ne,s),l(e,Pt,s),l(e,De,s),Ht.m(Dn,De),l(e,Mt,s),N(ae,e,s),l(e,qt,s),N(xe,e,s),At=!0},p(e,[s]){const Oe={};s&1024&&(Oe.$$scope={dirty:s,ctx:e}),!c&&s&1&&(c=!0,Oe.intersecting=e[0][0],re(()=>c=!1)),a.$set(Oe);const Be={};s&1024&&(Be.$$scope={dirty:s,ctx:e}),!V&&s&1&&(V=!0,Be.intersecting=e[0][1],re(()=>V=!1)),H.$set(Be);const Ge={};s&1024&&(Ge.$$scope={dirty:s,ctx:e}),!C&&s&1&&(C=!0,Ge.intersecting=e[0][2],re(()=>C=!1)),_.$set(Ge);const Ue={};s&1024&&(Ue.$$scope={dirty:s,ctx:e}),!Rt&&s&1&&(Rt=!0,Ue.intersecting=e[0][3],re(()=>Rt=!1)),J.$set(Ue);const Ve={};s&1024&&(Ve.$$scope={dirty:s,ctx:e}),!Nt&&s&1&&(Nt=!0,Ve.intersecting=e[0][4],re(()=>Nt=!1)),Q.$set(Ve);const je={};s&1024&&(je.$$scope={dirty:s,ctx:e}),ne.$set(je);const We={};s&1024&&(We.$$scope={dirty:s,ctx:e}),!Dt&&s&1&&(Dt=!0,We.intersecting=e[0][5],re(()=>Dt=!1)),X.$set(We);const un={};s&1024&&(un.$$scope={dirty:s,ctx:e}),se.$set(un);const Ot={};s&1024&&(Ot.$$scope={dirty:s,ctx:e}),!xt&&s&1&&(xt=!0,Ot.intersecting=e[0][6],re(()=>xt=!1)),Z.$set(Ot);const mn={};s&1024&&(mn.$$scope={dirty:s,ctx:e}),oe.$set(mn);const Bt={};s&1024&&(Bt.$$scope={dirty:s,ctx:e}),!Ft&&s&1&&(Ft=!0,Bt.intersecting=e[0][7],re(()=>Ft=!1)),ee.$set(Bt);const dn={};s&1024&&(dn.$$scope={dirty:s,ctx:e}),ae.$set(dn)},i(e){At||(D(n.$$.fragment,e),D(a.$$.fragment,e),D(H.$$.fragment,e),D(_.$$.fragment,e),D(J.$$.fragment,e),D(Q.$$.fragment,e),D(ne.$$.fragment,e),D(X.$$.fragment,e),D(se.$$.fragment,e),D(Z.$$.fragment,e),D(oe.$$.fragment,e),D(ee.$$.fragment,e),D(ae.$$.fragment,e),D(xe.$$.fragment,e),At=!0)},o(e){x(n.$$.fragment,e),x(a.$$.fragment,e),x(H.$$.fragment,e),x(_.$$.fragment,e),x(J.$$.fragment,e),x(Q.$$.fragment,e),x(ne.$$.fragment,e),x(X.$$.fragment,e),x(se.$$.fragment,e),x(Z.$$.fragment,e),x(oe.$$.fragment,e),x(ee.$$.fragment,e),x(ae.$$.fragment,e),x(xe.$$.fragment,e),At=!1},d(e){e&&(o(t),o(r),o(y),o(f),o($),o(L),o(O),o(P),o(S),o(G),o(me),o(z),o(B),o(w),o(k),o(T),o(U),o(_e),o(W),o(Ye),o(ye),o(Ke),o(ge),o(Je),o($e),o(Xe),o(ve),o(Ze),o(et),o(Te),o(tt),o(be),o(nt),o(we),o(ot),o(at),o(ke),o(it),o(Ce),o(lt),o(Le),o(rt),o(Ee),o(pt),o(Pe),o(ut),o(mt),o(He),o(dt),o(Me),o(ht),o(qe),o(yt),o(gt),o(Ae),o($t),o(Se),o(Tt),o(Ie),o(bt),o(wt),o(kt),o(Re),o(Ct),o(Lt),o(Et),o(Ne),o(Pt),o(De),o(Mt),o(qt)),F(n,e),F(a,e),F(H,e),F(_,e),F(J,e),F(Q,e),F(ne,e),F(X,e),F(se,e),F(Z,e),F(oe,e),F(ee,e),F(ae,e),F(xe,e)}}}let _n="/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider",yn="/Documentation/Scoping,_Typing,_and_Validating/Validator";function ps(i,n,t){let a;kn(i,j,g=>t(9,a=g)),te(j,a=[{title:"Type Provider",visible:!1,ref:"#type-provider-1"},{title:"Typing Rules",visible:!1,ref:"#typing-rules-2"},{title:"Types or Type Concepts",visible:!1,ref:"#types-or-type-concepts-3"},{title:"Terms That Have a Type",visible:!1,ref:"#terms-that-have-a-type-4"},{title:"Inference Rules",visible:!1,ref:"#inference-rules-5"},{title:"Type Equals and Type Conformance Rules",visible:!1,ref:"#type-equals-and-type-conformance-rules-6"},{title:"Use of conformsto",visible:!1,ref:"#use-of-conformsto-7"},{title:"Rules That Apply to Any Concept",visible:!1,ref:"#rules-that-apply-to-any-concept-8"}],a);let c=[];jn(()=>{document.querySelectorAll("pre").forEach(P=>{const H=document.createElement("div");H.className="copy-prompt";const V=document.createElement("p");V.innerHTML="👆 Click to copy",V.className="copy-prompt-p";const S=document.createElement("img");S.src="/icons/copy-icon.svg",S.className="copy-prompt-img",H.appendChild(S),H.appendChild(V),P.appendChild(H),P.querySelector(".copy-prompt > p").addEventListener("click",G=>{Kn(P.querySelector("code").textContent),P.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{P.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function r(g){i.$$.not_equal(c[0],g)&&(c[0]=g,t(0,c))}function y(g){i.$$.not_equal(c[1],g)&&(c[1]=g,t(0,c))}function p(g){i.$$.not_equal(c[2],g)&&(c[2]=g,t(0,c))}function f(g){i.$$.not_equal(c[3],g)&&(c[3]=g,t(0,c))}function $(g){i.$$.not_equal(c[4],g)&&(c[4]=g,t(0,c))}function Y(g){i.$$.not_equal(c[5],g)&&(c[5]=g,t(0,c))}function L(g){i.$$.not_equal(c[6],g)&&(c[6]=g,t(0,c))}function O(g){i.$$.not_equal(c[7],g)&&(c[7]=g,t(0,c))}return i.$$.update=()=>{i.$$.dirty&1&&te(j,a[0].visible=c[0],a),i.$$.dirty&1&&te(j,a[1].visible=c[1],a),i.$$.dirty&1&&te(j,a[2].visible=c[2],a),i.$$.dirty&1&&te(j,a[3].visible=c[3],a),i.$$.dirty&1&&te(j,a[4].visible=c[4],a),i.$$.dirty&1&&te(j,a[5].visible=c[5],a),i.$$.dirty&1&&te(j,a[6].visible=c[6],a),i.$$.dirty&1&&te(j,a[7].visible=c[7],a)},[c,r,y,p,f,$,Y,L,O]}class fs extends Pn{constructor(n){super(),Hn(this,n,ps,rs,wn,{})}}function gn(i,n,t){const a=i.slice();return a[6]=n[t],a[8]=t,a}function $n(i,n,t){const a=i.slice();return a[6]=n[t],a[8]=t,a}function us(i){let n,t;return{c(){n=d("img"),this.h()},l(a){n=h(a,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){v(n,"class","page-toc-small-img"),En(n.src,t="/icons/down-arrow.png")||v(n,"src",t),v(n,"alt","arrow down")},m(a,c){l(a,n,c)},d(a){a&&o(n)}}}function ms(i){let n,t;return{c(){n=d("img"),this.h()},l(a){n=h(a,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){v(n,"class","page-toc-small-img"),En(n.src,t="/icons/upload.png")||v(n,"src",t),v(n,"alt","arrow up")},m(a,c){l(a,n,c)},d(a){a&&o(n)}}}function vn(i){let n,t,a=It(i[0]),c=[];for(let r=0;r<a.length;r+=1)c[r]=Tn($n(i,a,r));return{c(){n=d("div"),t=d("ul");for(let r=0;r<c.length;r+=1)c[r].c();this.h()},l(r){n=h(r,"DIV",{class:!0});var y=E(n);t=h(y,"UL",{class:!0});var p=E(t);for(let f=0;f<c.length;f+=1)c[f].l(p);p.forEach(o),y.forEach(o),this.h()},h(){v(t,"class","page-ul"),v(n,"class","toc-details")},m(r,y){l(r,n,y),M(n,t);for(let p=0;p<c.length;p+=1)c[p]&&c[p].m(t,null)},p(r,y){if(y&5){a=It(r[0]);let p;for(p=0;p<a.length;p+=1){const f=$n(r,a,p);c[p]?c[p].p(f,y):(c[p]=Tn(f),c[p].c(),c[p].m(t,null))}for(;p<c.length;p+=1)c[p].d(1);c.length=a.length}},d(r){r&&o(n),Cn(c,r)}}}function Tn(i){let n,t,a=i[6].title+"",c,r,y;return{c(){n=d("li"),t=d("a"),c=q(a),y=u(),this.h()},l(p){n=h(p,"LI",{class:!0});var f=E(n);t=h(f,"A",{href:!0});var $=E(t);c=A($,a),$.forEach(o),y=m(f),f.forEach(o),this.h()},h(){v(t,"href",r=i[6].ref),ue(t,"page-visible",i[8]===i[2]),ue(t,"page-nonvisible",i[8]!==i[2]),v(n,"class","page-toc-text")},m(p,f){l(p,n,f),M(n,t),M(t,c),M(n,y)},p(p,f){f&1&&a!==(a=p[6].title+"")&&Ln(c,a),f&1&&r!==(r=p[6].ref)&&v(t,"href",r),f&4&&ue(t,"page-visible",p[8]===p[2]),f&4&&ue(t,"page-nonvisible",p[8]!==p[2])},d(p){p&&o(n)}}}function bn(i){let n,t,a=i[6].title+"",c,r,y;return{c(){n=d("li"),t=d("a"),c=q(a),y=u(),this.h()},l(p){n=h(p,"LI",{class:!0});var f=E(n);t=h(f,"A",{href:!0});var $=E(t);c=A($,a),$.forEach(o),y=m(f),f.forEach(o),this.h()},h(){v(t,"href",r=i[6].ref),ue(t,"page-visible",i[8]===i[2]),ue(t,"page-nonvisible",i[8]!==i[2]),v(n,"class","page-toc-text")},m(p,f){l(p,n,f),M(n,t),M(t,c),M(n,y)},p(p,f){f&1&&a!==(a=p[6].title+"")&&Ln(c,a),f&1&&r!==(r=p[6].ref)&&v(t,"href",r),f&4&&ue(t,"page-visible",p[8]===p[2]),f&4&&ue(t,"page-nonvisible",p[8]!==p[2])},d(p){p&&o(n)}}}function ds(i){let n,t,a,c="On this page ...",r,y,p,f,$,Y,L,O,g,P,H="On this page",V,S,G,Fe,me;function z(_,C){return _[1]?ms:us}let de=z(i),B=de(i),w=i[1]&&vn(i);$=new Jn({}),L=new fs({});let K=It(i[0]),k=[];for(let _=0;_<K.length;_+=1)k[_]=bn(gn(i,K,_));return{c(){n=d("div"),t=d("div"),a=d("p"),a.textContent=c,r=u(),y=d("button"),B.c(),p=u(),w&&w.c(),f=u(),I($.$$.fragment),Y=u(),I(L.$$.fragment),O=u(),g=d("nav"),P=d("h3"),P.textContent=H,V=u(),S=d("ul");for(let _=0;_<k.length;_+=1)k[_].c();this.h()},l(_){n=h(_,"DIV",{class:!0});var C=E(n);t=h(C,"DIV",{class:!0});var T=E(t);a=h(T,"P",{class:!0,"data-svelte-h":!0}),b(a)!=="svelte-1929lhs"&&(a.textContent=c),r=m(T),y=h(T,"BUTTON",{class:!0});var U=E(y);B.l(U),U.forEach(o),T.forEach(o),p=m(C),w&&w.l(C),f=m(C),R($.$$.fragment,C),Y=m(C),R(L.$$.fragment,C),C.forEach(o),O=m(_),g=h(_,"NAV",{class:!0});var he=E(g);P=h(he,"H3",{class:!0,"data-svelte-h":!0}),b(P)!=="svelte-1hgt7fi"&&(P.textContent=H),V=m(he),S=h(he,"UL",{class:!0});var _e=E(S);for(let W=0;W<k.length;W+=1)k[W].l(_e);_e.forEach(o),he.forEach(o),this.h()},h(){v(a,"class","page-toc-small-title"),v(y,"class","page-toc-small-expand-button"),v(t,"class","page-toc-small"),v(n,"class","page-main"),v(P,"class","page-toc-title"),v(S,"class","page-ul"),v(g,"class","page-toc")},m(_,C){l(_,n,C),M(n,t),M(t,a),M(t,r),M(t,y),B.m(y,null),M(n,p),w&&w.m(n,null),M(n,f),N($,n,null),M(n,Y),N(L,n,null),l(_,O,C),l(_,g,C),M(g,P),M(g,V),M(g,S);for(let T=0;T<k.length;T+=1)k[T]&&k[T].m(S,null);G=!0,Fe||(me=Yn(y,"click",i[4]),Fe=!0)},p(_,[C]){if(de!==(de=z(_))&&(B.d(1),B=de(_),B&&(B.c(),B.m(y,null))),_[1]?w?w.p(_,C):(w=vn(_),w.c(),w.m(n,f)):w&&(w.d(1),w=null),C&5){K=It(_[0]);let T;for(T=0;T<K.length;T+=1){const U=gn(_,K,T);k[T]?k[T].p(U,C):(k[T]=bn(U),k[T].c(),k[T].m(S,null))}for(;T<k.length;T+=1)k[T].d(1);k.length=K.length}},i(_){G||(D($.$$.fragment,_),D(L.$$.fragment,_),G=!0)},o(_){x($.$$.fragment,_),x(L.$$.fragment,_),G=!1},d(_){_&&(o(n),o(O),o(g)),B.d(),w&&w.d(),F($),F(L),Cn(k,_),Fe=!1,me()}}}function hs(i,n,t){let a,c;kn(i,j,$=>t(0,c=$));let r=!1;function y($){let Y=a;for(let L=0;L<$.length;L++)if($[L].visible)return L;return Y}function p(){t(1,r=!r)}const f=()=>{p()};return i.$$.update=()=>{i.$$.dirty&1&&t(2,a=y(c))},[c,r,a,p,f]}class bs extends Pn{constructor(n){super(),Hn(this,n,hs,ds,wn,{})}}export{bs as component};
//# sourceMappingURL=52.DReQ20a0.js.map
