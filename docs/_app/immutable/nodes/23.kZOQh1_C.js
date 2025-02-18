import{s as nn,A as ae,a as u,e as g,H as oe,f,b as $,m as C,d as T,F as ie,g as i,h as k,i as r,B as le,r as sn,w as ee,v as xn,t as F,o as R,n as En,j as M,C as Ln,D as an,E as pe,q as on,p as ln}from"../chunks/scheduler.Cra-n4xf.js";import{S as rn,i as cn,e as re,c as D,a as q,m as S,t as A,b as B,d as N}from"../chunks/index.Bm95Nbrf.js";import{e as $t}from"../chunks/stores.Bq7jfj-I.js";import{w as Cn}from"../chunks/index.B9cI0ado.js";import{P as Gt,S as ce,c as Tn,B as Mn}from"../chunks/index.DunYcI8q.js";import{N as Lt}from"../chunks/Note.BZaOCr5b.js";const Q=Cn([]);function Pn(a){let n;return{c(){n=F("The Language Structure")},l(t){n=R(t,"The Language Structure")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function Hn(a){let n;return{c(){n=F("Model")},l(t){n=R(t,"Model")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function In(a){let n;return{c(){n=F("Models are never explicit in an editor")},l(t){n=R(t,"Models are never explicit in an editor")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function Dn(a){let n;return{c(){n=F(`The model is never shown in an editor as a whole. It is always shown in parts: the model units. However, the provided webapp does 'show'
		the model and the units, that are part of it, in its left panel.`)},l(t){n=R(t,`The model is never shown in an editor as a whole. It is always shown in parts: the model units. However, the provided webapp does 'show'
		the model and the units, that are part of it, in its left panel.`)},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function qn(a){let n;return{c(){n=F("Model unit")},l(t){n=R(t,"Model unit")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function Sn(a){let n;return{c(){n=F("Concept")},l(t){n=R(t,"Concept")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function An(a){let n;return{c(){n=F("Expression Concept")},l(t){n=R(t,"Expression Concept")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function Bn(a){let n;return{c(){n=F("Use a Single Root of the Expression AST")},l(t){n=R(t,"Use a Single Root of the Expression AST")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function Nn(a){let n,t=`It is good practice to have all expression concepts inherit from one single root concept. This make it easy to have any type of
			expression as a part of the expression that you want to define.`,s,l,m=`For instance, when defining a bracketed expression, i.e. an expression surrounded by brackets, you can simply use the root expression
			concept as type of the property that is to be put between the brackets.`;return{c(){n=g("p"),n.textContent=t,s=u(),l=g("p"),l.textContent=m},l(p){n=$(p,"P",{"data-svelte-h":!0}),C(n)!=="svelte-q1dh8a"&&(n.textContent=t),s=f(p),l=$(p,"P",{"data-svelte-h":!0}),C(l)!=="svelte-1mtgjd4"&&(l.textContent=m)},m(p,c){r(p,n,c),r(p,s,c),r(p,l,c)},p:En,d(p){p&&(i(n),i(s),i(l))}}}function Fn(a){let n;return{c(){n=F("Binary Expression Concept")},l(t){n=R(t,"Binary Expression Concept")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function Rn(a){let n;return{c(){n=F("Limited Concept")},l(t){n=R(t,"Limited Concept")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function On(a){let n;return{c(){n=F("No quotes around numbers and booleans.")},l(t){n=R(t,"No quotes around numbers and booleans.")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function jn(a){let n;return{c(){n=F(`For number and boolean types, quotes (double or single) are not allowed around the values of properties of instances of limited
		concepts.`)},l(t){n=R(t,`For number and boolean types, quotes (double or single) are not allowed around the values of properties of instances of limited
		concepts.`)},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function Un(a){let n;return{c(){n=F("Interface")},l(t){n=R(t,"Interface")},m(t,s){r(t,n,s)},d(t){t&&i(n)}}}function Vn(a){let n,t,s,l,m,p,c,d,b,W=`A <em>model</em> is the root of the abstract syntax tree. It may hold any number of model units as children. These model units may be of different
	type. For instance, you can have model units that define the items in a home automation system, and other model units that define the rules
	that apply in this system.`,E,H,h,x,U,z=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L7-L10
</span>
<span class="token keyword">model</span> <span class="token class-name">InsuranceModel</span> &#123;
    parts: <span class="token class-name">Part</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;              <span class="token comment">// units that hold partial definitions of insurance products
</span>    products: <span class="token class-name">Product</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;        <span class="token comment">// units that hold sellable insurance products
</span>&#125;</code>`,P,I,me,ue,Y,fe=`A <em>model unit</em> is a part of the model that can be edited by the user independently of the rest of the model. A model unit is always
	a direct child of a model. Model units may not extend other units, or implement interfaces.`,O,w,V,L=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L12-L15
</span>
<span class="token keyword">modelunit</span> <span class="token class-name">Part</span> &#123;
    part: <span class="token class-name">BaseProduct</span>;          <span class="token comment">// one collection of partial insurance products
</span>    file-extension = <span class="token string">"base"</span>;    <span class="token comment">// the file extension used by the parser
</span>&#125;</code>`,_,v,y=`Model units have one special entry called <code>file-extension</code>, as shown in the example above. This is an optional indication of
	the file type that the generated parser will associate with this model unit, i.e. an instance of the above model unit will be
	exported/imported to/from a file with extension ‘.base’.`,G,j,De,te,de,Ct="A <em>concept</em> is the basic element of your language definition. It defines which instances can be present in a model created by your users.",Oe,he,Tt=`Concepts may extend one other concept using the keyword <code>base</code>, and implement multiple interfaces. Furthermore, they may be
	<em>abstract</em>.`,je,_e,Ue,pn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L24-L28
</span>
<span class="token keyword">concept</span> <span class="token class-name">BaseProduct</span> &#123;
    name: <span class="token builtin">identifier</span>;               <span class="token comment">// internal name
</span>    isUnderConstruction: <span class="token builtin">boolean</span>;   <span class="token comment">// defines whether this base product is still 'raw'
</span>    theme: <span class="token class-name">InsuranceTheme</span>;          <span class="token comment">// the 'kind' of insurance
</span>    parts: <span class="token class-name">InsurancePart</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;         // all parts of this product</code>`,Ve,ge,Qe,mn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L106-L112
</span>
    Percentage;
&#125;

<span class="token keyword">limited</span> NumberType <span class="token keyword">implements</span> <span class="token class-name">NamedType</span> &#123;
    Number;
&#125;
</code>`,We,J,kt,Ye,$e,Mt=`An <em>expression concept</em> is a concept represents an expression. The editor deals differently with these, in order to give your user a
	more natural editing experience.`,Ge,ke,Pt="Expression concepts may extend another concept, and implement multiple interfaces.",ze,be,Je,un=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-expressions.ast#L10-L18
</span>
<span class="token keyword">abstract</span> <span class="token keyword">expression</span> Literal <span class="token keyword">base</span> <span class="token class-name">DocuExpression</span> &#123;
&#125;
<span class="token keyword">expression</span> EuroLiteral <span class="token keyword">base</span> <span class="token class-name">Literal</span> &#123;
    euros: <span class="token builtin">number</span>;
    cents: <span class="token builtin">number</span>;
&#125;
<span class="token keyword">expression</span> NumberLiteral <span class="token keyword">base</span> <span class="token class-name">Literal</span> &#123;
    value: <span class="token builtin">number</span>;
&#125;</code>`,Ke,ne,Xe,K,bt,Ze,ve,Ht=`A <em>binary expression concept</em> is an expression concept that has two sub expressions, <code>left</code> and <code>right</code>
	operands, and an operator, which in the concrete syntax is shown in the middle. For example, the expression <code>4 + 5</code>
	has as left operand <code>4</code>, as operator <code>+</code>, and as right operand <code>5</code>.`,et,ye,It=`Any concrete binary expression concept needs to have a priority. For example, in mathematics the priority of the multiplication is higher
	than the priority of the plus. The expression 5 + 67 * 8 should be read as 5 + (67 * 8), not as (5 + 67) * 8. The priorities are used by
	Freon to balance the abstract syntax tree (see <a href="/Background/Projectional_Editing#tree-balancing">Projectional Editing</a>). In
	<a href="/Documentation/Defining_an_Editor/Ease_of_Editing">Ease of Editing</a> you can find more information on how to set the concrete syntax
	for the operand.`,tt,we,Dt="Binary expression concepts may extend one other concept, and implement multiple interfaces.",nt,xe,st,fn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-expressions.ast#L26-L46
</span>
<span class="token comment">// Basic binary expressions: plus, minus, multiply, divide
</span><span class="token keyword">abstract</span> <span class="token keyword">binary</span> <span class="token keyword">expression</span> BinaryExpression <span class="token keyword">base</span> <span class="token class-name">DocuExpression</span> &#123;
    left: <span class="token class-name">DocuExpression</span>;
    right: <span class="token class-name">DocuExpression</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> PlusExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">4</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> MinusExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">4</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> MultiplyExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">8</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> DivideExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">8</span>;
&#125;</code>`,at,X,vt,ot,Ee,qt=`A <em>limited concept</em> is a concept that has a limited number of predefined instances. Actually, it is an extended version of an enumeration.
	All instances become part of the standard library of your language.`,it,Le,St=`A limited concept must always have a name property (<code>name: identifier;</code>), but if this is not provided in the definition then it
	is automatically created. Furthermore, when a predefined instance does not provide a value for the name, the name given in the .ast file
	is used. In this manner, you can define simple enumerations.`,lt,Ce,At=`Limited concepts may extend another concept, and implement multiple interfaces. Note that the definition of the concept includes the
	definition of the predefined instances. For example, the instances of <code>PremiumDays</code> are
	<code>Week</code>, <code>Month</code>, <code>Quarter</code>, <code>Semester</code>, and <code>Year</code>.`,rt,Te,ct,dn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L129-L146
</span>
<span class="token keyword">limited</span> <span class="token class-name">InsuranceTheme</span> &#123;        <span class="token comment">// limited defined as a simple enumeration
</span>    HomeTheme; HealthTheme; LegalTheme;
&#125;

<span class="token keyword">limited</span> <span class="token class-name">PremiumDays</span> &#123;           <span class="token comment">// limited with various options
</span>    <span class="token comment">// if the 'name' property was not provided, it would have been generated
</span>    name: <span class="token builtin">identifier</span>;
    nrOfDays: <span class="token builtin">number</span>;
    <span class="token comment">// notations 'name:' and '"name":' are both correct
</span>    Week = &#123; name: <span class="token string">"Week"</span>, nrOfDays: <span class="token class-name">7</span> &#125;
    Month = &#123; <span class="token string">"name"</span>: <span class="token string">"Month"</span>, nrOfDays: <span class="token class-name">30</span> &#125;
    <span class="token comment">// the following instance gets the name "Quarter"
</span>    Quarter = &#123; nrOfDays: <span class="token class-name">91</span> &#125;
    <span class="token comment">// the following instance gets the name "Semester"
</span>    Semester = &#123; nrOfDays: <span class="token class-name">182</span> &#125;
    <span class="token comment">// the following instance gets the name "Year"
</span>    Year = &#123; nrOfDays: <span class="token class-name">365</span> &#125;
&#125;</code>`,pt,se,mt,Z,yt,ut,Me,Bt="An <em>interface</em> is a concept that has no instances. It may extend multiple other interfaces.",ft,Pe,dt,hn=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L96-L99
</span>
<span class="token comment">// concepts can implement interfaces.
</span><span class="token keyword">interface</span> <span class="token class-name">NamedType</span> &#123;
    name: <span class="token builtin">identifier</span>;
&#125;</code>`,ht,He,Nt="The next section will explain the options for concept properties.",_t,Ie,gt;n=new Gt({props:{prevLink:zt,nextLink:Jt}});function _n(e){a[1](e)}let Ft={tag:"h1",id:"the-language-structure-1",$$slots:{default:[Pn]},$$scope:{ctx:a}};a[0][0]!==void 0&&(Ft.intersecting=a[0][0]),s=new ce({props:Ft}),ae.push(()=>re(s,"intersecting",_n));function gn(e){a[2](e)}let Rt={tag:"h2",id:"model-2",$$slots:{default:[Hn]},$$scope:{ctx:a}};a[0][1]!==void 0&&(Rt.intersecting=a[0][1]),p=new ce({props:Rt}),ae.push(()=>re(p,"intersecting",gn)),H=new Lt({props:{$$slots:{content:[Dn],header:[In]},$$scope:{ctx:a}}});function $n(e){a[3](e)}let Ot={tag:"h2",id:"model-unit-3",$$slots:{default:[qn]},$$scope:{ctx:a}};a[0][2]!==void 0&&(Ot.intersecting=a[0][2]),I=new ce({props:Ot}),ae.push(()=>re(I,"intersecting",$n));function kn(e){a[4](e)}let jt={tag:"h2",id:"concept-4",$$slots:{default:[Sn]},$$scope:{ctx:a}};a[0][3]!==void 0&&(jt.intersecting=a[0][3]),j=new ce({props:jt}),ae.push(()=>re(j,"intersecting",kn));function bn(e){a[5](e)}let Ut={tag:"h2",id:"expression-concept-5",$$slots:{default:[An]},$$scope:{ctx:a}};a[0][4]!==void 0&&(Ut.intersecting=a[0][4]),J=new ce({props:Ut}),ae.push(()=>re(J,"intersecting",bn)),ne=new Lt({props:{$$slots:{content:[Nn],header:[Bn]},$$scope:{ctx:a}}});function vn(e){a[6](e)}let Vt={tag:"h2",id:"binary-expression-concept-6",$$slots:{default:[Fn]},$$scope:{ctx:a}};a[0][5]!==void 0&&(Vt.intersecting=a[0][5]),K=new ce({props:Vt}),ae.push(()=>re(K,"intersecting",vn));function yn(e){a[7](e)}let Qt={tag:"h2",id:"limited-concept-7",$$slots:{default:[Rn]},$$scope:{ctx:a}};a[0][6]!==void 0&&(Qt.intersecting=a[0][6]),X=new ce({props:Qt}),ae.push(()=>re(X,"intersecting",yn)),se=new Lt({props:{$$slots:{content:[jn],header:[On]},$$scope:{ctx:a}}});function wn(e){a[8](e)}let Wt={tag:"h2",id:"interface-8",$$slots:{default:[Un]},$$scope:{ctx:a}};return a[0][7]!==void 0&&(Wt.intersecting=a[0][7]),Z=new ce({props:Wt}),ae.push(()=>re(Z,"intersecting",wn)),Ie=new Gt({props:{prevLink:zt,nextLink:Jt}}),{c(){D(n.$$.fragment),t=u(),D(s.$$.fragment),m=u(),D(p.$$.fragment),d=u(),b=g("p"),b.innerHTML=W,E=u(),D(H.$$.fragment),h=u(),x=g("pre"),U=new oe(!1),P=u(),D(I.$$.fragment),ue=u(),Y=g("p"),Y.innerHTML=fe,O=u(),w=g("pre"),V=new oe(!1),_=u(),v=g("p"),v.innerHTML=y,G=u(),D(j.$$.fragment),te=u(),de=g("p"),de.innerHTML=Ct,Oe=u(),he=g("p"),he.innerHTML=Tt,je=u(),_e=g("pre"),Ue=new oe(!1),Ve=u(),ge=g("pre"),Qe=new oe(!1),We=u(),D(J.$$.fragment),Ye=u(),$e=g("p"),$e.innerHTML=Mt,Ge=u(),ke=g("p"),ke.textContent=Pt,ze=u(),be=g("pre"),Je=new oe(!1),Ke=u(),D(ne.$$.fragment),Xe=u(),D(K.$$.fragment),Ze=u(),ve=g("p"),ve.innerHTML=Ht,et=u(),ye=g("p"),ye.innerHTML=It,tt=u(),we=g("p"),we.textContent=Dt,nt=u(),xe=g("pre"),st=new oe(!1),at=u(),D(X.$$.fragment),ot=u(),Ee=g("p"),Ee.innerHTML=qt,it=u(),Le=g("p"),Le.innerHTML=St,lt=u(),Ce=g("p"),Ce.innerHTML=At,rt=u(),Te=g("pre"),ct=new oe(!1),pt=u(),D(se.$$.fragment),mt=u(),D(Z.$$.fragment),ut=u(),Me=g("p"),Me.innerHTML=Bt,ft=u(),Pe=g("pre"),dt=new oe(!1),ht=u(),He=g("p"),He.textContent=Nt,_t=u(),D(Ie.$$.fragment),this.h()},l(e){q(n.$$.fragment,e),t=f(e),q(s.$$.fragment,e),m=f(e),q(p.$$.fragment,e),d=f(e),b=$(e,"P",{"data-svelte-h":!0}),C(b)!=="svelte-y7cr4c"&&(b.innerHTML=W),E=f(e),q(H.$$.fragment,e),h=f(e),x=$(e,"PRE",{class:!0});var o=T(x);U=ie(o,!1),o.forEach(i),P=f(e),q(I.$$.fragment,e),ue=f(e),Y=$(e,"P",{"data-svelte-h":!0}),C(Y)!=="svelte-304x3n"&&(Y.innerHTML=fe),O=f(e),w=$(e,"PRE",{class:!0});var qe=T(w);V=ie(qe,!1),qe.forEach(i),_=f(e),v=$(e,"P",{"data-svelte-h":!0}),C(v)!=="svelte-18vq1tf"&&(v.innerHTML=y),G=f(e),q(j.$$.fragment,e),te=f(e),de=$(e,"P",{"data-svelte-h":!0}),C(de)!=="svelte-3ool38"&&(de.innerHTML=Ct),Oe=f(e),he=$(e,"P",{"data-svelte-h":!0}),C(he)!=="svelte-1ne9nj0"&&(he.innerHTML=Tt),je=f(e),_e=$(e,"PRE",{class:!0});var Se=T(_e);Ue=ie(Se,!1),Se.forEach(i),Ve=f(e),ge=$(e,"PRE",{class:!0});var Fe=T(ge);Qe=ie(Fe,!1),Fe.forEach(i),We=f(e),q(J.$$.fragment,e),Ye=f(e),$e=$(e,"P",{"data-svelte-h":!0}),C($e)!=="svelte-hu4vhb"&&($e.innerHTML=Mt),Ge=f(e),ke=$(e,"P",{"data-svelte-h":!0}),C(ke)!=="svelte-nnh91d"&&(ke.textContent=Pt),ze=f(e),be=$(e,"PRE",{class:!0});var Ae=T(be);Je=ie(Ae,!1),Ae.forEach(i),Ke=f(e),q(ne.$$.fragment,e),Xe=f(e),q(K.$$.fragment,e),Ze=f(e),ve=$(e,"P",{"data-svelte-h":!0}),C(ve)!=="svelte-ytzyfe"&&(ve.innerHTML=Ht),et=f(e),ye=$(e,"P",{"data-svelte-h":!0}),C(ye)!=="svelte-1ft2tj2"&&(ye.innerHTML=It),tt=f(e),we=$(e,"P",{"data-svelte-h":!0}),C(we)!=="svelte-6k0439"&&(we.textContent=Dt),nt=f(e),xe=$(e,"PRE",{class:!0});var Be=T(xe);st=ie(Be,!1),Be.forEach(i),at=f(e),q(X.$$.fragment,e),ot=f(e),Ee=$(e,"P",{"data-svelte-h":!0}),C(Ee)!=="svelte-e29gl5"&&(Ee.innerHTML=qt),it=f(e),Le=$(e,"P",{"data-svelte-h":!0}),C(Le)!=="svelte-1357txx"&&(Le.innerHTML=St),lt=f(e),Ce=$(e,"P",{"data-svelte-h":!0}),C(Ce)!=="svelte-2dm0gl"&&(Ce.innerHTML=At),rt=f(e),Te=$(e,"PRE",{class:!0});var Ne=T(Te);ct=ie(Ne,!1),Ne.forEach(i),pt=f(e),q(se.$$.fragment,e),mt=f(e),q(Z.$$.fragment,e),ut=f(e),Me=$(e,"P",{"data-svelte-h":!0}),C(Me)!=="svelte-torjlg"&&(Me.innerHTML=Bt),ft=f(e),Pe=$(e,"PRE",{class:!0});var Re=T(Pe);dt=ie(Re,!1),Re.forEach(i),ht=f(e),He=$(e,"P",{"data-svelte-h":!0}),C(He)!=="svelte-8t493p"&&(He.textContent=Nt),_t=f(e),q(Ie.$$.fragment,e),this.h()},h(){U.a=null,k(x,"class","language-freon"),V.a=null,k(w,"class","language-freon"),Ue.a=null,k(_e,"class","language-freon"),Qe.a=null,k(ge,"class","language-freon"),Je.a=null,k(be,"class","language-freon"),st.a=null,k(xe,"class","language-freon"),ct.a=null,k(Te,"class","language-freon"),dt.a=null,k(Pe,"class","language-freon")},m(e,o){S(n,e,o),r(e,t,o),S(s,e,o),r(e,m,o),S(p,e,o),r(e,d,o),r(e,b,o),r(e,E,o),S(H,e,o),r(e,h,o),r(e,x,o),U.m(z,x),r(e,P,o),S(I,e,o),r(e,ue,o),r(e,Y,o),r(e,O,o),r(e,w,o),V.m(L,w),r(e,_,o),r(e,v,o),r(e,G,o),S(j,e,o),r(e,te,o),r(e,de,o),r(e,Oe,o),r(e,he,o),r(e,je,o),r(e,_e,o),Ue.m(pn,_e),r(e,Ve,o),r(e,ge,o),Qe.m(mn,ge),r(e,We,o),S(J,e,o),r(e,Ye,o),r(e,$e,o),r(e,Ge,o),r(e,ke,o),r(e,ze,o),r(e,be,o),Je.m(un,be),r(e,Ke,o),S(ne,e,o),r(e,Xe,o),S(K,e,o),r(e,Ze,o),r(e,ve,o),r(e,et,o),r(e,ye,o),r(e,tt,o),r(e,we,o),r(e,nt,o),r(e,xe,o),st.m(fn,xe),r(e,at,o),S(X,e,o),r(e,ot,o),r(e,Ee,o),r(e,it,o),r(e,Le,o),r(e,lt,o),r(e,Ce,o),r(e,rt,o),r(e,Te,o),ct.m(dn,Te),r(e,pt,o),S(se,e,o),r(e,mt,o),S(Z,e,o),r(e,ut,o),r(e,Me,o),r(e,ft,o),r(e,Pe,o),dt.m(hn,Pe),r(e,ht,o),r(e,He,o),r(e,_t,o),S(Ie,e,o),gt=!0},p(e,[o]){const qe={};o&1024&&(qe.$$scope={dirty:o,ctx:e}),!l&&o&1&&(l=!0,qe.intersecting=e[0][0],le(()=>l=!1)),s.$set(qe);const Se={};o&1024&&(Se.$$scope={dirty:o,ctx:e}),!c&&o&1&&(c=!0,Se.intersecting=e[0][1],le(()=>c=!1)),p.$set(Se);const Fe={};o&1024&&(Fe.$$scope={dirty:o,ctx:e}),H.$set(Fe);const Ae={};o&1024&&(Ae.$$scope={dirty:o,ctx:e}),!me&&o&1&&(me=!0,Ae.intersecting=e[0][2],le(()=>me=!1)),I.$set(Ae);const Be={};o&1024&&(Be.$$scope={dirty:o,ctx:e}),!De&&o&1&&(De=!0,Be.intersecting=e[0][3],le(()=>De=!1)),j.$set(Be);const Ne={};o&1024&&(Ne.$$scope={dirty:o,ctx:e}),!kt&&o&1&&(kt=!0,Ne.intersecting=e[0][4],le(()=>kt=!1)),J.$set(Ne);const Re={};o&1024&&(Re.$$scope={dirty:o,ctx:e}),ne.$set(Re);const wt={};o&1024&&(wt.$$scope={dirty:o,ctx:e}),!bt&&o&1&&(bt=!0,wt.intersecting=e[0][5],le(()=>bt=!1)),K.$set(wt);const xt={};o&1024&&(xt.$$scope={dirty:o,ctx:e}),!vt&&o&1&&(vt=!0,xt.intersecting=e[0][6],le(()=>vt=!1)),X.$set(xt);const Yt={};o&1024&&(Yt.$$scope={dirty:o,ctx:e}),se.$set(Yt);const Et={};o&1024&&(Et.$$scope={dirty:o,ctx:e}),!yt&&o&1&&(yt=!0,Et.intersecting=e[0][7],le(()=>yt=!1)),Z.$set(Et)},i(e){gt||(A(n.$$.fragment,e),A(s.$$.fragment,e),A(p.$$.fragment,e),A(H.$$.fragment,e),A(I.$$.fragment,e),A(j.$$.fragment,e),A(J.$$.fragment,e),A(ne.$$.fragment,e),A(K.$$.fragment,e),A(X.$$.fragment,e),A(se.$$.fragment,e),A(Z.$$.fragment,e),A(Ie.$$.fragment,e),gt=!0)},o(e){B(n.$$.fragment,e),B(s.$$.fragment,e),B(p.$$.fragment,e),B(H.$$.fragment,e),B(I.$$.fragment,e),B(j.$$.fragment,e),B(J.$$.fragment,e),B(ne.$$.fragment,e),B(K.$$.fragment,e),B(X.$$.fragment,e),B(se.$$.fragment,e),B(Z.$$.fragment,e),B(Ie.$$.fragment,e),gt=!1},d(e){e&&(i(t),i(m),i(d),i(b),i(E),i(h),i(x),i(P),i(ue),i(Y),i(O),i(w),i(_),i(v),i(G),i(te),i(de),i(Oe),i(he),i(je),i(_e),i(Ve),i(ge),i(We),i(Ye),i($e),i(Ge),i(ke),i(ze),i(be),i(Ke),i(Xe),i(Ze),i(ve),i(et),i(ye),i(tt),i(we),i(nt),i(xe),i(at),i(ot),i(Ee),i(it),i(Le),i(lt),i(Ce),i(rt),i(Te),i(pt),i(mt),i(ut),i(Me),i(ft),i(Pe),i(ht),i(He),i(_t)),N(n,e),N(s,e),N(p,e),N(H,e),N(I,e),N(j,e),N(J,e),N(ne,e),N(K,e),N(X,e),N(se,e),N(Z,e),N(Ie,e)}}}let zt="/Documentation/Creating_the_Metamodel",Jt="/Documentation/Creating_the_Metamodel/Defining_Properties";function Qn(a,n,t){let s;sn(a,Q,h=>t(9,s=h)),ee(Q,s=[{title:"The Language Structure",visible:!1,ref:"#the-language-structure-1"},{title:"Model",visible:!1,ref:"#model-2"},{title:"Model unit",visible:!1,ref:"#model-unit-3"},{title:"Concept",visible:!1,ref:"#concept-4"},{title:"Expression Concept",visible:!1,ref:"#expression-concept-5"},{title:"Binary Expression Concept",visible:!1,ref:"#binary-expression-concept-6"},{title:"Limited Concept",visible:!1,ref:"#limited-concept-7"},{title:"Interface",visible:!1,ref:"#interface-8"}],s);let l=[];xn(()=>{document.querySelectorAll("pre").forEach(x=>{const U=document.createElement("div");U.className="copy-prompt";const z=document.createElement("p");z.innerHTML="👆 Click to copy",z.className="copy-prompt-p";const P=document.createElement("img");P.src="/icons/copy-icon.svg",P.className="copy-prompt-img",U.appendChild(P),U.appendChild(z),x.appendChild(U),x.querySelector(".copy-prompt > p").addEventListener("click",I=>{Tn(x.querySelector("code").textContent),x.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{x.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function m(h){a.$$.not_equal(l[0],h)&&(l[0]=h,t(0,l))}function p(h){a.$$.not_equal(l[1],h)&&(l[1]=h,t(0,l))}function c(h){a.$$.not_equal(l[2],h)&&(l[2]=h,t(0,l))}function d(h){a.$$.not_equal(l[3],h)&&(l[3]=h,t(0,l))}function b(h){a.$$.not_equal(l[4],h)&&(l[4]=h,t(0,l))}function W(h){a.$$.not_equal(l[5],h)&&(l[5]=h,t(0,l))}function E(h){a.$$.not_equal(l[6],h)&&(l[6]=h,t(0,l))}function H(h){a.$$.not_equal(l[7],h)&&(l[7]=h,t(0,l))}return a.$$.update=()=>{a.$$.dirty&1&&ee(Q,s[0].visible=l[0],s),a.$$.dirty&1&&ee(Q,s[1].visible=l[1],s),a.$$.dirty&1&&ee(Q,s[2].visible=l[2],s),a.$$.dirty&1&&ee(Q,s[3].visible=l[3],s),a.$$.dirty&1&&ee(Q,s[4].visible=l[4],s),a.$$.dirty&1&&ee(Q,s[5].visible=l[5],s),a.$$.dirty&1&&ee(Q,s[6].visible=l[6],s),a.$$.dirty&1&&ee(Q,s[7].visible=l[7],s)},[l,m,p,c,d,b,W,E,H]}class Wn extends rn{constructor(n){super(),cn(this,n,Qn,Vn,nn,{})}}function Kt(a,n,t){const s=a.slice();return s[6]=n[t],s[8]=t,s}function Xt(a,n,t){const s=a.slice();return s[6]=n[t],s[8]=t,s}function Yn(a){let n,t;return{c(){n=g("img"),this.h()},l(s){n=$(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){k(n,"class","page-toc-small-img"),ln(n.src,t="/icons/down-arrow.png")||k(n,"src",t),k(n,"alt","arrow down")},m(s,l){r(s,n,l)},d(s){s&&i(n)}}}function Gn(a){let n,t;return{c(){n=g("img"),this.h()},l(s){n=$(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){k(n,"class","page-toc-small-img"),ln(n.src,t="/icons/upload.png")||k(n,"src",t),k(n,"alt","arrow up")},m(s,l){r(s,n,l)},d(s){s&&i(n)}}}function Zt(a){let n,t,s=$t(a[0]),l=[];for(let m=0;m<s.length;m+=1)l[m]=en(Xt(a,s,m));return{c(){n=g("div"),t=g("ul");for(let m=0;m<l.length;m+=1)l[m].c();this.h()},l(m){n=$(m,"DIV",{class:!0});var p=T(n);t=$(p,"UL",{class:!0});var c=T(t);for(let d=0;d<l.length;d+=1)l[d].l(c);c.forEach(i),p.forEach(i),this.h()},h(){k(t,"class","page-ul"),k(n,"class","toc-details")},m(m,p){r(m,n,p),M(n,t);for(let c=0;c<l.length;c+=1)l[c]&&l[c].m(t,null)},p(m,p){if(p&5){s=$t(m[0]);let c;for(c=0;c<s.length;c+=1){const d=Xt(m,s,c);l[c]?l[c].p(d,p):(l[c]=en(d),l[c].c(),l[c].m(t,null))}for(;c<l.length;c+=1)l[c].d(1);l.length=s.length}},d(m){m&&i(n),an(l,m)}}}function en(a){let n,t,s=a[6].title+"",l,m,p;return{c(){n=g("li"),t=g("a"),l=F(s),p=u(),this.h()},l(c){n=$(c,"LI",{class:!0});var d=T(n);t=$(d,"A",{href:!0});var b=T(t);l=R(b,s),b.forEach(i),p=f(d),d.forEach(i),this.h()},h(){k(t,"href",m=a[6].ref),pe(t,"page-visible",a[8]===a[2]),pe(t,"page-nonvisible",a[8]!==a[2]),k(n,"class","page-toc-text")},m(c,d){r(c,n,d),M(n,t),M(t,l),M(n,p)},p(c,d){d&1&&s!==(s=c[6].title+"")&&on(l,s),d&1&&m!==(m=c[6].ref)&&k(t,"href",m),d&4&&pe(t,"page-visible",c[8]===c[2]),d&4&&pe(t,"page-nonvisible",c[8]!==c[2])},d(c){c&&i(n)}}}function tn(a){let n,t,s=a[6].title+"",l,m,p;return{c(){n=g("li"),t=g("a"),l=F(s),p=u(),this.h()},l(c){n=$(c,"LI",{class:!0});var d=T(n);t=$(d,"A",{href:!0});var b=T(t);l=R(b,s),b.forEach(i),p=f(d),d.forEach(i),this.h()},h(){k(t,"href",m=a[6].ref),pe(t,"page-visible",a[8]===a[2]),pe(t,"page-nonvisible",a[8]!==a[2]),k(n,"class","page-toc-text")},m(c,d){r(c,n,d),M(n,t),M(t,l),M(n,p)},p(c,d){d&1&&s!==(s=c[6].title+"")&&on(l,s),d&1&&m!==(m=c[6].ref)&&k(t,"href",m),d&4&&pe(t,"page-visible",c[8]===c[2]),d&4&&pe(t,"page-nonvisible",c[8]!==c[2])},d(c){c&&i(n)}}}function zn(a){let n,t,s,l="On this page ...",m,p,c,d,b,W,E,H,h,x,U="On this page",z,P,I,me,ue;function Y(_,v){return _[1]?Gn:Yn}let fe=Y(a),O=fe(a),w=a[1]&&Zt(a);b=new Mn({}),E=new Wn({});let V=$t(a[0]),L=[];for(let _=0;_<V.length;_+=1)L[_]=tn(Kt(a,V,_));return{c(){n=g("div"),t=g("div"),s=g("p"),s.textContent=l,m=u(),p=g("button"),O.c(),c=u(),w&&w.c(),d=u(),D(b.$$.fragment),W=u(),D(E.$$.fragment),H=u(),h=g("nav"),x=g("h3"),x.textContent=U,z=u(),P=g("ul");for(let _=0;_<L.length;_+=1)L[_].c();this.h()},l(_){n=$(_,"DIV",{class:!0});var v=T(n);t=$(v,"DIV",{class:!0});var y=T(t);s=$(y,"P",{class:!0,"data-svelte-h":!0}),C(s)!=="svelte-1929lhs"&&(s.textContent=l),m=f(y),p=$(y,"BUTTON",{class:!0});var G=T(p);O.l(G),G.forEach(i),y.forEach(i),c=f(v),w&&w.l(v),d=f(v),q(b.$$.fragment,v),W=f(v),q(E.$$.fragment,v),v.forEach(i),H=f(_),h=$(_,"NAV",{class:!0});var j=T(h);x=$(j,"H3",{class:!0,"data-svelte-h":!0}),C(x)!=="svelte-1hgt7fi"&&(x.textContent=U),z=f(j),P=$(j,"UL",{class:!0});var De=T(P);for(let te=0;te<L.length;te+=1)L[te].l(De);De.forEach(i),j.forEach(i),this.h()},h(){k(s,"class","page-toc-small-title"),k(p,"class","page-toc-small-expand-button"),k(t,"class","page-toc-small"),k(n,"class","page-main"),k(x,"class","page-toc-title"),k(P,"class","page-ul"),k(h,"class","page-toc")},m(_,v){r(_,n,v),M(n,t),M(t,s),M(t,m),M(t,p),O.m(p,null),M(n,c),w&&w.m(n,null),M(n,d),S(b,n,null),M(n,W),S(E,n,null),r(_,H,v),r(_,h,v),M(h,x),M(h,z),M(h,P);for(let y=0;y<L.length;y+=1)L[y]&&L[y].m(P,null);I=!0,me||(ue=Ln(p,"click",a[4]),me=!0)},p(_,[v]){if(fe!==(fe=Y(_))&&(O.d(1),O=fe(_),O&&(O.c(),O.m(p,null))),_[1]?w?w.p(_,v):(w=Zt(_),w.c(),w.m(n,d)):w&&(w.d(1),w=null),v&5){V=$t(_[0]);let y;for(y=0;y<V.length;y+=1){const G=Kt(_,V,y);L[y]?L[y].p(G,v):(L[y]=tn(G),L[y].c(),L[y].m(P,null))}for(;y<L.length;y+=1)L[y].d(1);L.length=V.length}},i(_){I||(A(b.$$.fragment,_),A(E.$$.fragment,_),I=!0)},o(_){B(b.$$.fragment,_),B(E.$$.fragment,_),I=!1},d(_){_&&(i(n),i(H),i(h)),O.d(),w&&w.d(),N(b),N(E),an(L,_),me=!1,ue()}}}function Jn(a,n,t){let s,l;sn(a,Q,b=>t(0,l=b));let m=!1;function p(b){let W=s;for(let E=0;E<b.length;E++)if(b[E].visible)return E;return W}function c(){t(1,m=!m)}const d=()=>{c()};return a.$$.update=()=>{a.$$.dirty&1&&t(2,s=p(l))},[l,m,s,c,d]}class ss extends rn{constructor(n){super(),cn(this,n,Jn,zn,nn,{})}}export{ss as component};
//# sourceMappingURL=23.kZOQh1_C.js.map
