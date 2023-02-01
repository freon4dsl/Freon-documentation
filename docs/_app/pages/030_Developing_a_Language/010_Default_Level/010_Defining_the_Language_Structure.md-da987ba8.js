import{S as xs,i as ws,s as Ls,e as l,t as a,k as c,w as Va,c as i,a as r,h as s,d as n,m as u,x as Xa,b as d,g as p,H as t,y as Za,q as es,o as ns,B as ts}from"../../../chunks/vendor-0dc77bd0.js";import{N as as}from"../../../chunks/Note-b0db7989.js";/* empty css                                                         */function As(S){let f;return{c(){f=a("Models are never explicit in an editor")},l(m){f=s(m,"Models are never explicit in an editor")},m(m,y){p(m,f,y)},d(m){m&&n(f)}}}function Ds(S){let f;return{c(){f=a(`The model is never shown in an editor as a whole. 
It is always shown in parts: the model units. However, the webapp does 'show' the model and the units, that are
part of it, in its left panel.`)},l(m){f=s(m,`The model is never shown in an editor as a whole. 
It is always shown in parts: the model units. However, the webapp does 'show' the model and the units, that are
part of it, in its left panel.`)},m(m,y){p(m,f,y)},d(m){m&&n(f)}}}function Ms(S){let f;return{c(){f=a("No quotes around numbers and booleans.")},l(m){f=s(m,"No quotes around numbers and booleans.")},m(m,y){p(m,f,y)},d(m){m&&n(f)}}}function Ts(S){let f;return{c(){f=a(`For number and boolean types, quotes (double or single) are not allowed around the values of properties of
instances of limited concepts.`)},l(m){f=s(m,`For number and boolean types, quotes (double or single) are not allowed around the values of properties of
instances of limited concepts.`)},m(m,y){p(m,f,y)},d(m){m&&n(f)}}}function Ps(S){let f,m,y,b,Sn,ye,Bn,On,ve,Fn,jn,qe,X,Rn,Qe,Z,Nn,We,B,ss=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L1-L2</span>

language DocuProject
</code>`,Ye,ee,Un,ze,h,qn,ne,Qn,Wn,te,Yn,zn,ae,Gn,Jn,se,Kn,Vn,oe,Xn,Zn,pe,et,nt,le,tt,at,Ge,O,Ee,st,Je,A,ot,be,pt,lt,Ke,D,Ve,F,os=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L7-L10</span>

model InsuranceModel <span class="token punctuation">&#123;</span>
    parts<span class="token operator">:</span> Part<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>              <span class="token comment">// units that hold partial definitions of insurance products</span>
    products<span class="token operator">:</span> Product<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>        <span class="token comment">// units that hold sellable insurance products</span>
<span class="token punctuation">&#125;</span></code>`,Xe,j,xe,it,Ze,v,rt,we,ct,ut,ie,ft,mt,re,dt,ht,en,ce,_t,nn,R,ps=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L12-L15</span>

modelunit Part <span class="token punctuation">&#123;</span>
    part<span class="token operator">:</span> BaseProduct<span class="token punctuation">;</span>          <span class="token comment">// one collection of partial insurance products</span>
    file<span class="token operator">-</span>extension <span class="token operator">=</span> <span class="token string">"base"</span><span class="token punctuation">;</span>    <span class="token comment">// the file extension used by the parser</span>
<span class="token punctuation">&#125;</span></code>`,tn,M,kt,Le,yt,vt,an,N,Ae,Et,sn,T,bt,De,xt,wt,on,x,Lt,Me,At,Dt,Te,Mt,Tt,pn,U,ls=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L24-L28</span>

concept BaseProduct <span class="token punctuation">&#123;</span>
    name<span class="token operator">:</span> identifier<span class="token punctuation">;</span>           <span class="token comment">// internal name</span>
    theme<span class="token operator">:</span> InsuranceTheme<span class="token punctuation">;</span>      <span class="token comment">// the 'kind' of insurance</span>
    parts<span class="token operator">:</span> InsurancePart<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>     <span class="token comment">// all parts of this product</span>
<span class="token punctuation">&#125;</span></code>`,ln,q,is=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L106-L112</span>

<span class="token comment">/* The concept TypeRef represents a reference to a known type.
 * In the 'language-extras.ast' file there is an example of a
 * concept representing a type declaration.
 */</span>
concept TypeRef base DocuType  <span class="token punctuation">&#123;</span>
    reference type<span class="token operator">:</span> NamedType<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,rn,Q,Pe,Pt,cn,P,Ct,Ce,gt,$t,un,ue,It,fn,W,rs=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-expressions.ast#L10-L18</span>

<span class="token keyword">abstract</span> expression Literal base DocuExpression <span class="token punctuation">&#123;</span>
<span class="token punctuation">&#125;</span>
expression EuroLiteral base Literal <span class="token punctuation">&#123;</span>
    euros<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    cents<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
expression NumberLiteral base Literal <span class="token punctuation">&#123;</span>
    value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,mn,Y,ge,Ht,dn,_,St,$e,Bt,Ot,Ie,Ft,jt,He,Rt,Nt,Se,Ut,qt,Be,Qt,Wt,hn,w,Yt,fe,zt,Gt,me,Jt,Kt,_n,de,Vt,kn,z,cs=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-expressions.ast#L23-L43</span>

<span class="token comment">// Basic binary expressions: plus, minus, multiply, divide</span>
<span class="token keyword">abstract</span> binary expression BinaryExpression base DocuExpression <span class="token punctuation">&#123;</span>
    left<span class="token operator">:</span> DocuExpression<span class="token punctuation">;</span>
    right<span class="token operator">:</span> DocuExpression<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

binary expression PlusExpression base BinaryExpression <span class="token punctuation">&#123;</span>
    priority <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

binary expression MinusExpression base BinaryExpression <span class="token punctuation">&#123;</span>
    priority <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

binary expression MultiplyExpression base BinaryExpression <span class="token punctuation">&#123;</span>
    priority <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

binary expression DivideExpression base BinaryExpression <span class="token punctuation">&#123;</span>
    priority <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,yn,G,Oe,Xt,vn,C,Zt,Fe,ea,na,En,g,ta,je,aa,sa,bn,he,oa,xn,J,us=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L114-L131</span>

limited InsuranceTheme <span class="token punctuation">&#123;</span>        <span class="token comment">// limited defined as a simple enumeration</span>
    HomeTheme<span class="token punctuation">;</span> HealthTheme<span class="token punctuation">;</span> LegalTheme<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

limited PremiumDays <span class="token punctuation">&#123;</span>           <span class="token comment">// limited with various options</span>
    <span class="token comment">// if the 'name' property was not provided, it would have been generated</span>
    name<span class="token operator">:</span> identifier<span class="token punctuation">;</span>
    nrOfDays<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token comment">// notations 'name:' and '"name":' are both correct</span>
    Week <span class="token operator">=</span> <span class="token punctuation">&#123;</span> name<span class="token operator">:</span> <span class="token string">"Week"</span><span class="token punctuation">,</span> nrOfDays<span class="token operator">:</span> <span class="token number">7</span> <span class="token punctuation">&#125;</span>
    Month <span class="token operator">=</span> <span class="token punctuation">&#123;</span> <span class="token string">"name"</span><span class="token operator">:</span> <span class="token string">"Month"</span><span class="token punctuation">,</span> nrOfDays<span class="token operator">:</span> <span class="token number">30</span> <span class="token punctuation">&#125;</span>
    <span class="token comment">// the following instance gets the name "Quarter"</span>
    Quarter <span class="token operator">=</span> <span class="token punctuation">&#123;</span> nrOfDays<span class="token operator">:</span> <span class="token number">91</span> <span class="token punctuation">&#125;</span>
    <span class="token comment">// the following instance gets the name "Semester"</span>
    Semester <span class="token operator">=</span> <span class="token punctuation">&#123;</span> nrOfDays<span class="token operator">:</span> <span class="token number">182</span> <span class="token punctuation">&#125;</span>
    <span class="token comment">// the following instance gets the name "Year"</span>
    Year <span class="token operator">=</span> <span class="token punctuation">&#123;</span> nrOfDays<span class="token operator">:</span> <span class="token number">365</span> <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,wn,$,Ln,K,Re,pa,An,I,la,Ne,ia,ra,Dn,V,fs=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L86-L88</span>

<span class="token keyword">interface</span> <span class="token class-name">NamedType</span> <span class="token punctuation">&#123;</span>
    name<span class="token operator">:</span> identifier<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,Mn;return D=new as({props:{$$slots:{content:[Ds],header:[As]},$$scope:{ctx:S}}}),$=new as({props:{$$slots:{content:[Ts],header:[Ms]},$$scope:{ctx:S}}}),{c(){f=l("h1"),m=a("The Language Structure Definition"),y=c(),b=l("p"),Sn=a("The abstract syntax tree (AST) of the language is described in files with the extension "),ye=l("code"),Bn=a(".ast"),On=a(`.
All files with this extension in the `),ve=l("em"),Fn=a("defs"),jn=a(` folder (i.e. the folder were you keep your definition files)
are combined into one AST definition.`),qe=c(),X=l("h2"),Rn=a("Name of the language"),Qe=c(),Z=l("p"),Nn=a(`Every AST file must start with the declaration of the name of your language. This name is used
to create the name of a number of generated classes.`),We=c(),B=l("pre"),Ye=c(),ee=l("h2"),Un=a("Concepts"),ze=c(),h=l("p"),qn=a(`The Freon language structure, which describes the abstract syntax tree (AST), consists of a
list of a `),ne=l("a"),Qn=a("Models"),Wn=a(`,
`),te=l("a"),Yn=a("Model Units"),zn=a(`,
`),ae=l("a"),Gn=a("Concepts"),Jn=a(`,
`),se=l("a"),Kn=a("Expression Concepts"),Vn=a(`,
`),oe=l("a"),Xn=a("Binary Expression Concepts"),Zn=a(`,
`),pe=l("a"),et=a("Limited Concepts"),nt=a(`,
and/or `),le=l("a"),tt=a("Interfaces"),at=a("."),Ge=c(),O=l("h3"),Ee=l("a"),st=a(" Model"),Je=c(),A=l("p"),ot=a("A "),be=l("em"),pt=a("model"),lt=a(` is the root of the abstract syntax tree, and as such the complete description specified by the user.
It may hold any number of model units as children. These model units may be of different type. For instance, you
can have model units that define the items in a home automation system, and other model units that define the rules
that apply in this system.`),Ke=c(),Va(D.$$.fragment),Ve=c(),F=l("pre"),Xe=c(),j=l("h3"),xe=l("a"),it=a(" Model unit"),Ze=c(),v=l("p"),rt=a("A "),we=l("em"),ct=a("model unit"),ut=a(` is a part of the model that can be edited independently of the rest of the model. A model unit is
always a direct child of a model. The name of a model unit can never be `),ie=l("a"),ft=a("private"),mt=a(`
(see `),re=l("a"),dt=a("Models and Model Units"),ht=a(")."),en=c(),ce=l("p"),_t=a("Model units may not extend other units or implement interfaces."),nn=c(),R=l("pre"),tn=c(),M=l("p"),kt=a("Model units have one special entry "),Le=l("code"),yt=a("file-extension"),vt=a(`, as shown in the example above. This is an optional
indication of the file type that the generated parser will associate with this model unit, i.e. an
instance of the above model unit will be exported/imported to/from a file with this extension.`),an=c(),N=l("h3"),Ae=l("a"),Et=a(" Concept"),sn=c(),T=l("p"),bt=a("A "),De=l("em"),xt=a("concept"),wt=a(` is the basic element of your language definition. It defines which instances can be present in
a model created by your users.`),on=c(),x=l("p"),Lt=a("Concepts may extend one other concept using the keyword "),Me=l("code"),At=a("base"),Dt=a(`, and implement multiple interfaces.
Furthermore, they may be `),Te=l("em"),Mt=a("abstract"),Tt=a("."),pn=c(),U=l("pre"),ln=c(),q=l("pre"),rn=c(),Q=l("h3"),Pe=l("a"),Pt=a(" Expression Concept"),cn=c(),P=l("p"),Ct=a("An "),Ce=l("em"),gt=a("expression concept"),$t=a(` is a concept that is an expression. The editor deals with these differently in
order to give your user a more natural editing experience.`),un=c(),ue=l("p"),It=a("Expression concepts may extend one other concept, and implement multiple interfaces."),fn=c(),W=l("pre"),mn=c(),Y=l("h3"),ge=l("a"),Ht=a(" Binary Expression Concept"),dn=c(),_=l("p"),St=a("A "),$e=l("em"),Bt=a("binary expression concept"),Ot=a(` is an expression concept that has two sub expressions, left and right operands,
and an operator, which in the concrete syntax usually goes in the middle. For example, the expression `),Ie=l("code"),Ft=a("4 + 5"),jt=a(`
has as left operand `),He=l("code"),Rt=a("4"),Nt=a(", as operator "),Se=l("code"),Ut=a("+"),qt=a(", and as right operand "),Be=l("code"),Qt=a("5"),Wt=a("."),hn=c(),w=l("p"),Yt=a(`Any concrete binary expression concept needs to have a priority. The priority is used by Freon to balance the
abstract syntax tree (see `),fe=l("a"),zt=a("Projectional Editing"),Gt=a(`). In
the `),me=l("a"),Jt=a("second level tutorial"),Kt=a(` you can
find more information on how to set the operand.`),_n=c(),de=l("p"),Vt=a("Binary expression concepts may extend one other concept, and implement multiple interfaces."),kn=c(),z=l("pre"),yn=c(),G=l("h3"),Oe=l("a"),Xt=a(" Limited Concept"),vn=c(),C=l("p"),Zt=a("A "),Fe=l("em"),ea=a("limited concept"),na=a(` is a concept that has a limited number of predefined instances. Actually, it is an extended
version of an enumeration. All instances become part of the standard library of your language.`),En=c(),g=l("p"),ta=a("A limited concept must always have a name property ("),je=l("code"),aa=a("name: identifier;"),sa=a(`), but if this is not provided
in the definition then it is automatically created. Furthermore, when a predefined instance does not provide a
value for the name, the name of the instance is used. In this manner, you can define simple enumerations.`),bn=c(),he=l("p"),oa=a("Limited concepts may extend another concept, and implement multiple interfaces."),xn=c(),J=l("pre"),wn=c(),Va($.$$.fragment),Ln=c(),K=l("h3"),Re=l("a"),pa=a(" Interface"),An=c(),I=l("p"),la=a("An "),Ne=l("em"),ia=a("interface"),ra=a(" is a concept that has no instances. It may extend multiple other interfaces."),Dn=c(),V=l("pre"),this.h()},l(e){f=i(e,"H1",{});var o=r(f);m=s(o,"The Language Structure Definition"),o.forEach(n),y=u(e),b=i(e,"P",{});var L=r(b);Sn=s(L,"The abstract syntax tree (AST) of the language is described in files with the extension "),ye=i(L,"CODE",{});var Ue=r(ye);Bn=s(Ue,".ast"),Ue.forEach(n),On=s(L,`.
All files with this extension in the `),ve=i(L,"EM",{});var ka=r(ve);Fn=s(ka,"defs"),ka.forEach(n),jn=s(L,` folder (i.e. the folder were you keep your definition files)
are combined into one AST definition.`),L.forEach(n),qe=u(e),X=i(e,"H2",{});var ya=r(X);Rn=s(ya,"Name of the language"),ya.forEach(n),Qe=u(e),Z=i(e,"P",{});var va=r(Z);Nn=s(va,`Every AST file must start with the declaration of the name of your language. This name is used
to create the name of a number of generated classes.`),va.forEach(n),We=u(e),B=i(e,"PRE",{class:!0});var ms=r(B);ms.forEach(n),Ye=u(e),ee=i(e,"H2",{});var Ea=r(ee);Un=s(Ea,"Concepts"),Ea.forEach(n),ze=u(e),h=i(e,"P",{});var k=r(h);qn=s(k,`The Freon language structure, which describes the abstract syntax tree (AST), consists of a
list of a `),ne=i(k,"A",{href:!0});var ba=r(ne);Qn=s(ba,"Models"),ba.forEach(n),Wn=s(k,`,
`),te=i(k,"A",{href:!0});var xa=r(te);Yn=s(xa,"Model Units"),xa.forEach(n),zn=s(k,`,
`),ae=i(k,"A",{href:!0});var wa=r(ae);Gn=s(wa,"Concepts"),wa.forEach(n),Jn=s(k,`,
`),se=i(k,"A",{href:!0});var La=r(se);Kn=s(La,"Expression Concepts"),La.forEach(n),Vn=s(k,`,
`),oe=i(k,"A",{href:!0});var Aa=r(oe);Xn=s(Aa,"Binary Expression Concepts"),Aa.forEach(n),Zn=s(k,`,
`),pe=i(k,"A",{href:!0});var Da=r(pe);et=s(Da,"Limited Concepts"),Da.forEach(n),nt=s(k,`,
and/or `),le=i(k,"A",{href:!0});var Ma=r(le);tt=s(Ma,"Interfaces"),Ma.forEach(n),at=s(k,"."),k.forEach(n),Ge=u(e),O=i(e,"H3",{});var ca=r(O);Ee=i(ca,"A",{name:!0}),r(Ee).forEach(n),st=s(ca," Model"),ca.forEach(n),Je=u(e),A=i(e,"P",{});var Tn=r(A);ot=s(Tn,"A "),be=i(Tn,"EM",{});var Ta=r(be);pt=s(Ta,"model"),Ta.forEach(n),lt=s(Tn,` is the root of the abstract syntax tree, and as such the complete description specified by the user.
It may hold any number of model units as children. These model units may be of different type. For instance, you
can have model units that define the items in a home automation system, and other model units that define the rules
that apply in this system.`),Tn.forEach(n),Ke=u(e),Xa(D.$$.fragment,e),Ve=u(e),F=i(e,"PRE",{class:!0});var ds=r(F);ds.forEach(n),Xe=u(e),j=i(e,"H3",{});var ua=r(j);xe=i(ua,"A",{name:!0}),r(xe).forEach(n),it=s(ua," Model unit"),ua.forEach(n),Ze=u(e),v=i(e,"P",{});var H=r(v);rt=s(H,"A "),we=i(H,"EM",{});var Pa=r(we);ct=s(Pa,"model unit"),Pa.forEach(n),ut=s(H,` is a part of the model that can be edited independently of the rest of the model. A model unit is
always a direct child of a model. The name of a model unit can never be `),ie=i(H,"A",{href:!0});var Ca=r(ie);ft=s(Ca,"private"),Ca.forEach(n),mt=s(H,`
(see `),re=i(H,"A",{href:!0});var ga=r(re);dt=s(ga,"Models and Model Units"),ga.forEach(n),ht=s(H,")."),H.forEach(n),en=u(e),ce=i(e,"P",{});var $a=r(ce);_t=s($a,"Model units may not extend other units or implement interfaces."),$a.forEach(n),nn=u(e),R=i(e,"PRE",{class:!0});var hs=r(R);hs.forEach(n),tn=u(e),M=i(e,"P",{});var Pn=r(M);kt=s(Pn,"Model units have one special entry "),Le=i(Pn,"CODE",{});var Ia=r(Le);yt=s(Ia,"file-extension"),Ia.forEach(n),vt=s(Pn,`, as shown in the example above. This is an optional
indication of the file type that the generated parser will associate with this model unit, i.e. an
instance of the above model unit will be exported/imported to/from a file with this extension.`),Pn.forEach(n),an=u(e),N=i(e,"H3",{});var fa=r(N);Ae=i(fa,"A",{name:!0}),r(Ae).forEach(n),Et=s(fa," Concept"),fa.forEach(n),sn=u(e),T=i(e,"P",{});var Cn=r(T);bt=s(Cn,"A "),De=i(Cn,"EM",{});var Ha=r(De);xt=s(Ha,"concept"),Ha.forEach(n),wt=s(Cn,` is the basic element of your language definition. It defines which instances can be present in
a model created by your users.`),Cn.forEach(n),on=u(e),x=i(e,"P",{});var _e=r(x);Lt=s(_e,"Concepts may extend one other concept using the keyword "),Me=i(_e,"CODE",{});var Sa=r(Me);At=s(Sa,"base"),Sa.forEach(n),Dt=s(_e,`, and implement multiple interfaces.
Furthermore, they may be `),Te=i(_e,"EM",{});var Ba=r(Te);Mt=s(Ba,"abstract"),Ba.forEach(n),Tt=s(_e,"."),_e.forEach(n),pn=u(e),U=i(e,"PRE",{class:!0});var _s=r(U);_s.forEach(n),ln=u(e),q=i(e,"PRE",{class:!0});var ks=r(q);ks.forEach(n),rn=u(e),Q=i(e,"H3",{});var ma=r(Q);Pe=i(ma,"A",{name:!0}),r(Pe).forEach(n),Pt=s(ma," Expression Concept"),ma.forEach(n),cn=u(e),P=i(e,"P",{});var gn=r(P);Ct=s(gn,"An "),Ce=i(gn,"EM",{});var Oa=r(Ce);gt=s(Oa,"expression concept"),Oa.forEach(n),$t=s(gn,` is a concept that is an expression. The editor deals with these differently in
order to give your user a more natural editing experience.`),gn.forEach(n),un=u(e),ue=i(e,"P",{});var Fa=r(ue);It=s(Fa,"Expression concepts may extend one other concept, and implement multiple interfaces."),Fa.forEach(n),fn=u(e),W=i(e,"PRE",{class:!0});var ys=r(W);ys.forEach(n),mn=u(e),Y=i(e,"H3",{});var da=r(Y);ge=i(da,"A",{name:!0}),r(ge).forEach(n),Ht=s(da," Binary Expression Concept"),da.forEach(n),dn=u(e),_=i(e,"P",{});var E=r(_);St=s(E,"A "),$e=i(E,"EM",{});var ja=r($e);Bt=s(ja,"binary expression concept"),ja.forEach(n),Ot=s(E,` is an expression concept that has two sub expressions, left and right operands,
and an operator, which in the concrete syntax usually goes in the middle. For example, the expression `),Ie=i(E,"CODE",{});var Ra=r(Ie);Ft=s(Ra,"4 + 5"),Ra.forEach(n),jt=s(E,`
has as left operand `),He=i(E,"CODE",{});var Na=r(He);Rt=s(Na,"4"),Na.forEach(n),Nt=s(E,", as operator "),Se=i(E,"CODE",{});var Ua=r(Se);Ut=s(Ua,"+"),Ua.forEach(n),qt=s(E,", and as right operand "),Be=i(E,"CODE",{});var qa=r(Be);Qt=s(qa,"5"),qa.forEach(n),Wt=s(E,"."),E.forEach(n),hn=u(e),w=i(e,"P",{});var ke=r(w);Yt=s(ke,`Any concrete binary expression concept needs to have a priority. The priority is used by Freon to balance the
abstract syntax tree (see `),fe=i(ke,"A",{href:!0});var Qa=r(fe);zt=s(Qa,"Projectional Editing"),Qa.forEach(n),Gt=s(ke,`). In
the `),me=i(ke,"A",{href:!0});var Wa=r(me);Jt=s(Wa,"second level tutorial"),Wa.forEach(n),Kt=s(ke,` you can
find more information on how to set the operand.`),ke.forEach(n),_n=u(e),de=i(e,"P",{});var Ya=r(de);Vt=s(Ya,"Binary expression concepts may extend one other concept, and implement multiple interfaces."),Ya.forEach(n),kn=u(e),z=i(e,"PRE",{class:!0});var vs=r(z);vs.forEach(n),yn=u(e),G=i(e,"H3",{});var ha=r(G);Oe=i(ha,"A",{name:!0}),r(Oe).forEach(n),Xt=s(ha," Limited Concept"),ha.forEach(n),vn=u(e),C=i(e,"P",{});var $n=r(C);Zt=s($n,"A "),Fe=i($n,"EM",{});var za=r(Fe);ea=s(za,"limited concept"),za.forEach(n),na=s($n,` is a concept that has a limited number of predefined instances. Actually, it is an extended
version of an enumeration. All instances become part of the standard library of your language.`),$n.forEach(n),En=u(e),g=i(e,"P",{});var In=r(g);ta=s(In,"A limited concept must always have a name property ("),je=i(In,"CODE",{});var Ga=r(je);aa=s(Ga,"name: identifier;"),Ga.forEach(n),sa=s(In,`), but if this is not provided
in the definition then it is automatically created. Furthermore, when a predefined instance does not provide a
value for the name, the name of the instance is used. In this manner, you can define simple enumerations.`),In.forEach(n),bn=u(e),he=i(e,"P",{});var Ja=r(he);oa=s(Ja,"Limited concepts may extend another concept, and implement multiple interfaces."),Ja.forEach(n),xn=u(e),J=i(e,"PRE",{class:!0});var Es=r(J);Es.forEach(n),wn=u(e),Xa($.$$.fragment,e),Ln=u(e),K=i(e,"H3",{});var _a=r(K);Re=i(_a,"A",{name:!0}),r(Re).forEach(n),pa=s(_a," Interface"),_a.forEach(n),An=u(e),I=i(e,"P",{});var Hn=r(I);la=s(Hn,"An "),Ne=i(Hn,"EM",{});var Ka=r(Ne);ia=s(Ka,"interface"),Ka.forEach(n),ra=s(Hn," is a concept that has no instances. It may extend multiple other interfaces."),Hn.forEach(n),Dn=u(e),V=i(e,"PRE",{class:!0});var bs=r(V);bs.forEach(n),this.h()},h(){d(B,"class","language-ts"),d(ne,"href","/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Model"),d(te,"href","/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Model_Unit"),d(ae,"href","/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Concept"),d(se,"href","/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Expression_Concept"),d(oe,"href","/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Binary_Expression_Concept"),d(pe,"href","/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Limited_Concept"),d(le,"href","/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Interface"),d(Ee,"name","Model"),d(F,"class","language-ts"),d(xe,"name","Model_Unit"),d(ie,"href","/010_Intro/030_Models_and_Model_Units#public"),d(re,"href","/010_Intro/030_Models_and_Model_Units#public"),d(R,"class","language-ts"),d(Ae,"name","Concept"),d(U,"class","language-ts"),d(q,"class","language-ts"),d(Pe,"name","Expression_Concept"),d(W,"class","language-ts"),d(ge,"name","Binary_Expression_Concept"),d(fe,"href","/010_Intro/010_Projectional_Editing#tree-balancing"),d(me,"href","/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/050_Other_Options"),d(z,"class","language-ts"),d(Oe,"name","Limited_Concept"),d(J,"class","language-ts"),d(Re,"name","Interface"),d(V,"class","language-ts")},m(e,o){p(e,f,o),t(f,m),p(e,y,o),p(e,b,o),t(b,Sn),t(b,ye),t(ye,Bn),t(b,On),t(b,ve),t(ve,Fn),t(b,jn),p(e,qe,o),p(e,X,o),t(X,Rn),p(e,Qe,o),p(e,Z,o),t(Z,Nn),p(e,We,o),p(e,B,o),B.innerHTML=ss,p(e,Ye,o),p(e,ee,o),t(ee,Un),p(e,ze,o),p(e,h,o),t(h,qn),t(h,ne),t(ne,Qn),t(h,Wn),t(h,te),t(te,Yn),t(h,zn),t(h,ae),t(ae,Gn),t(h,Jn),t(h,se),t(se,Kn),t(h,Vn),t(h,oe),t(oe,Xn),t(h,Zn),t(h,pe),t(pe,et),t(h,nt),t(h,le),t(le,tt),t(h,at),p(e,Ge,o),p(e,O,o),t(O,Ee),t(O,st),p(e,Je,o),p(e,A,o),t(A,ot),t(A,be),t(be,pt),t(A,lt),p(e,Ke,o),Za(D,e,o),p(e,Ve,o),p(e,F,o),F.innerHTML=os,p(e,Xe,o),p(e,j,o),t(j,xe),t(j,it),p(e,Ze,o),p(e,v,o),t(v,rt),t(v,we),t(we,ct),t(v,ut),t(v,ie),t(ie,ft),t(v,mt),t(v,re),t(re,dt),t(v,ht),p(e,en,o),p(e,ce,o),t(ce,_t),p(e,nn,o),p(e,R,o),R.innerHTML=ps,p(e,tn,o),p(e,M,o),t(M,kt),t(M,Le),t(Le,yt),t(M,vt),p(e,an,o),p(e,N,o),t(N,Ae),t(N,Et),p(e,sn,o),p(e,T,o),t(T,bt),t(T,De),t(De,xt),t(T,wt),p(e,on,o),p(e,x,o),t(x,Lt),t(x,Me),t(Me,At),t(x,Dt),t(x,Te),t(Te,Mt),t(x,Tt),p(e,pn,o),p(e,U,o),U.innerHTML=ls,p(e,ln,o),p(e,q,o),q.innerHTML=is,p(e,rn,o),p(e,Q,o),t(Q,Pe),t(Q,Pt),p(e,cn,o),p(e,P,o),t(P,Ct),t(P,Ce),t(Ce,gt),t(P,$t),p(e,un,o),p(e,ue,o),t(ue,It),p(e,fn,o),p(e,W,o),W.innerHTML=rs,p(e,mn,o),p(e,Y,o),t(Y,ge),t(Y,Ht),p(e,dn,o),p(e,_,o),t(_,St),t(_,$e),t($e,Bt),t(_,Ot),t(_,Ie),t(Ie,Ft),t(_,jt),t(_,He),t(He,Rt),t(_,Nt),t(_,Se),t(Se,Ut),t(_,qt),t(_,Be),t(Be,Qt),t(_,Wt),p(e,hn,o),p(e,w,o),t(w,Yt),t(w,fe),t(fe,zt),t(w,Gt),t(w,me),t(me,Jt),t(w,Kt),p(e,_n,o),p(e,de,o),t(de,Vt),p(e,kn,o),p(e,z,o),z.innerHTML=cs,p(e,yn,o),p(e,G,o),t(G,Oe),t(G,Xt),p(e,vn,o),p(e,C,o),t(C,Zt),t(C,Fe),t(Fe,ea),t(C,na),p(e,En,o),p(e,g,o),t(g,ta),t(g,je),t(je,aa),t(g,sa),p(e,bn,o),p(e,he,o),t(he,oa),p(e,xn,o),p(e,J,o),J.innerHTML=us,p(e,wn,o),Za($,e,o),p(e,Ln,o),p(e,K,o),t(K,Re),t(K,pa),p(e,An,o),p(e,I,o),t(I,la),t(I,Ne),t(Ne,ia),t(I,ra),p(e,Dn,o),p(e,V,o),V.innerHTML=fs,Mn=!0},p(e,[o]){const L={};o&1&&(L.$$scope={dirty:o,ctx:e}),D.$set(L);const Ue={};o&1&&(Ue.$$scope={dirty:o,ctx:e}),$.$set(Ue)},i(e){Mn||(es(D.$$.fragment,e),es($.$$.fragment,e),Mn=!0)},o(e){ns(D.$$.fragment,e),ns($.$$.fragment,e),Mn=!1},d(e){e&&n(f),e&&n(y),e&&n(b),e&&n(qe),e&&n(X),e&&n(Qe),e&&n(Z),e&&n(We),e&&n(B),e&&n(Ye),e&&n(ee),e&&n(ze),e&&n(h),e&&n(Ge),e&&n(O),e&&n(Je),e&&n(A),e&&n(Ke),ts(D,e),e&&n(Ve),e&&n(F),e&&n(Xe),e&&n(j),e&&n(Ze),e&&n(v),e&&n(en),e&&n(ce),e&&n(nn),e&&n(R),e&&n(tn),e&&n(M),e&&n(an),e&&n(N),e&&n(sn),e&&n(T),e&&n(on),e&&n(x),e&&n(pn),e&&n(U),e&&n(ln),e&&n(q),e&&n(rn),e&&n(Q),e&&n(cn),e&&n(P),e&&n(un),e&&n(ue),e&&n(fn),e&&n(W),e&&n(mn),e&&n(Y),e&&n(dn),e&&n(_),e&&n(hn),e&&n(w),e&&n(_n),e&&n(de),e&&n(kn),e&&n(z),e&&n(yn),e&&n(G),e&&n(vn),e&&n(C),e&&n(En),e&&n(g),e&&n(bn),e&&n(he),e&&n(xn),e&&n(J),e&&n(wn),ts($,e),e&&n(Ln),e&&n(K),e&&n(An),e&&n(I),e&&n(Dn),e&&n(V)}}}class Is extends xs{constructor(f){super();ws(this,f,null,Ps,Ls,{})}}export{Is as default};
