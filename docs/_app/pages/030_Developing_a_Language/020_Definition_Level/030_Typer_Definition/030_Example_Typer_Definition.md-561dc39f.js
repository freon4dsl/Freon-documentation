import{S as Dn,i as Kn,s as Yn,e as c,t as p,k as i,c as u,a as l,h as o,d as s,m as r,b as Q,g as t,H as e,J as hn}from"../../../../chunks/vendor-0dc77bd0.js";function jn(Nn){let y,V,C,w,X,U,b,Z,H,E,$,O,x,g,W,k,nn,L,sn,an,S,tn,en,N,pn,on,B,m,An=`<code class="language-ts"><span class="token comment">// typer-example/defs/projectY.type#L6-L14</span>

<span class="token keyword">type</span> <span class="token class-name">TT_GenericType</span> <span class="token punctuation">&#123;</span>
    base<span class="token operator">:</span> PiType<span class="token punctuation">;</span>
    kind<span class="token operator">:</span> GenericKind<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">type</span> <span class="token class-name">TT_MeasurementType</span> <span class="token punctuation">&#123;</span>
    base<span class="token operator">:</span> PiType<span class="token punctuation">;</span>
    unit<span class="token operator">:</span> UnitKind<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,D,v,cn,K,q,un,Y,h,Rn=`<code class="language-ts"><span class="token comment">// typer-example/defs/projectY.type#L34-L46</span>

GenericType <span class="token punctuation">&#123;</span>
    infertype TT_GenericType <span class="token punctuation">&#123;</span>
        base<span class="token operator">:</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>baseType<span class="token punctuation">)</span><span class="token punctuation">,</span>
        kind<span class="token operator">:</span> self<span class="token punctuation">.</span>kind
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

UnitOfMeasurement <span class="token punctuation">&#123;</span>
    infertype TT_MeasurementType <span class="token punctuation">&#123;</span>
        base<span class="token operator">:</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>baseType<span class="token punctuation">)</span><span class="token punctuation">,</span>
        unit<span class="token operator">:</span> self<span class="token punctuation">.</span>unit
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,j,G,ln,F,f,rn,A,kn,fn,R,yn,Tn,I,d,Cn=`<code class="language-ts"><span class="token comment">// typer-example/defs/projectY.type#L91-L118</span>

TT_GenericType <span class="token punctuation">&#123;</span>
    equalsto x<span class="token operator">:</span>TT_GenericType where <span class="token punctuation">&#123;</span>
            x<span class="token punctuation">.</span>base equalsto self<span class="token punctuation">.</span>base<span class="token punctuation">;</span>
            x<span class="token punctuation">.</span>kind equalsto self<span class="token punctuation">.</span>kind<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    conformsto other<span class="token operator">:</span>TT_GenericType where <span class="token punctuation">&#123;</span>
            <span class="token comment">// both conditions must be true</span>
            self<span class="token punctuation">.</span>base conformsto other<span class="token punctuation">.</span>base<span class="token punctuation">;</span>
            self<span class="token punctuation">.</span>kind conformsto other<span class="token punctuation">.</span>kind<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

GenericKind <span class="token punctuation">&#123;</span>
    Set conformsto Collection<span class="token punctuation">;</span>
    Sequence conformsto Collection<span class="token punctuation">;</span>
    Bag conformsto Collection<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

TT_MeasurementType <span class="token punctuation">&#123;</span>
    equalsto aap<span class="token operator">:</span>TT_MeasurementType where <span class="token punctuation">&#123;</span>
            aap<span class="token punctuation">.</span>base equalsto self<span class="token punctuation">.</span>base<span class="token punctuation">;</span>
            aap<span class="token punctuation">.</span>unit equalsto self<span class="token punctuation">.</span>unit<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    conformsto rr<span class="token operator">:</span>TT_MeasurementType where <span class="token punctuation">&#123;</span>
            self<span class="token punctuation">.</span>base conformsto rr<span class="token punctuation">.</span>base<span class="token punctuation">;</span>
            self<span class="token punctuation">.</span>unit equalsto rr<span class="token punctuation">.</span>unit<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,J,M,mn,z,_,Un=`<code class="language-ts"><span class="token comment">// typer-example/defs/projectY.type</span>

typer

<span class="token comment">// What are types?</span>
istype <span class="token punctuation">&#123;</span> TopType <span class="token punctuation">&#125;</span>

<span class="token keyword">type</span> <span class="token class-name">TT_GenericType</span> <span class="token punctuation">&#123;</span>
    base<span class="token operator">:</span> PiType<span class="token punctuation">;</span>
    kind<span class="token operator">:</span> GenericKind<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">type</span> <span class="token class-name">TT_MeasurementType</span> <span class="token punctuation">&#123;</span>
    base<span class="token operator">:</span> PiType<span class="token punctuation">;</span>
    unit<span class="token operator">:</span> UnitKind<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// Which concepts have a type?</span>
hastype <span class="token punctuation">&#123;</span> Exp<span class="token punctuation">,</span> TypeUsage <span class="token punctuation">&#125;</span>

<span class="token comment">// What are the top and bottom types?</span>
anytype <span class="token punctuation">&#123;</span>
    conformsto PredefinedType<span class="token operator">:</span><span class="token constant">ANY</span><span class="token punctuation">;</span> <span class="token comment">// PredefinedType:ANY is the least specific type</span>
<span class="token punctuation">&#125;</span>

PredefinedType <span class="token punctuation">&#123;</span>
    PredefinedType<span class="token operator">:</span><span class="token constant">NULL</span> conformsto anytype<span class="token punctuation">;</span> <span class="token comment">// PredefinedType:NULL is the most specific type</span>
    <span class="token class-name"><span class="token constant">NUMBER</span></span> conformsto <span class="token constant">STRING</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// Which type does an expression have?</span>
TypeRef <span class="token punctuation">&#123;</span>
    infertype self<span class="token punctuation">.</span>type<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

GenericType <span class="token punctuation">&#123;</span>
    infertype TT_GenericType <span class="token punctuation">&#123;</span>
        base<span class="token operator">:</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>baseType<span class="token punctuation">)</span><span class="token punctuation">,</span>
        kind<span class="token operator">:</span> self<span class="token punctuation">.</span>kind
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

UnitOfMeasurement <span class="token punctuation">&#123;</span>
    infertype TT_MeasurementType <span class="token punctuation">&#123;</span>
        base<span class="token operator">:</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>baseType<span class="token punctuation">)</span><span class="token punctuation">,</span>
        unit<span class="token operator">:</span> self<span class="token punctuation">.</span>unit
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

NumberLiteral <span class="token punctuation">&#123;</span>
    infertype PredefinedType<span class="token operator">:</span><span class="token constant">NUMBER</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

StringLiteral <span class="token punctuation">&#123;</span>
    infertype PredefinedType<span class="token operator">:</span><span class="token constant">STRING</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

BooleanLiteral <span class="token punctuation">&#123;</span>
    infertype PredefinedType<span class="token operator">:</span><span class="token constant">BOOLEAN</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

NamedExp <span class="token punctuation">&#123;</span>
    infertype self<span class="token punctuation">.</span>myType<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

PlusExp <span class="token punctuation">&#123;</span>
    infertype <span class="token function">commonSuperType</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>left<span class="token punctuation">,</span> self<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

UnitLiteral <span class="token punctuation">&#123;</span>
    <span class="token comment">// 62 kilogram, or 112 miles</span>
    infertype TT_MeasurementType <span class="token punctuation">&#123;</span>
                  base<span class="token operator">:</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>inner<span class="token punctuation">)</span><span class="token punctuation">,</span>
                  unit<span class="token operator">:</span> self<span class="token punctuation">.</span>unit
              <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

GenericLiteral <span class="token punctuation">&#123;</span>
    <span class="token comment">// Set&#123; 12, 14, 16, 18 &#125;</span>
    infertype TT_GenericType <span class="token punctuation">&#123;</span>
        base<span class="token operator">:</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>content<span class="token punctuation">)</span><span class="token punctuation">,</span>
        kind<span class="token operator">:</span> self<span class="token punctuation">.</span>kind
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// Which types are 'equal' to each other?</span>
NamedType <span class="token punctuation">&#123;</span>
    equalsto aa<span class="token operator">:</span>NamedType where <span class="token punctuation">&#123;</span>
            aa<span class="token punctuation">.</span>name equalsto self<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

TT_GenericType <span class="token punctuation">&#123;</span>
    equalsto x<span class="token operator">:</span>TT_GenericType where <span class="token punctuation">&#123;</span>
            x<span class="token punctuation">.</span>base equalsto self<span class="token punctuation">.</span>base<span class="token punctuation">;</span>
            x<span class="token punctuation">.</span>kind equalsto self<span class="token punctuation">.</span>kind<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    conformsto other<span class="token operator">:</span>TT_GenericType where <span class="token punctuation">&#123;</span>
            <span class="token comment">// both conditions must be true</span>
            self<span class="token punctuation">.</span>base conformsto other<span class="token punctuation">.</span>base<span class="token punctuation">;</span>
            self<span class="token punctuation">.</span>kind conformsto other<span class="token punctuation">.</span>kind<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

GenericKind <span class="token punctuation">&#123;</span>
    Set conformsto Collection<span class="token punctuation">;</span>
    Sequence conformsto Collection<span class="token punctuation">;</span>
    Bag conformsto Collection<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

TT_MeasurementType <span class="token punctuation">&#123;</span>
    equalsto aap<span class="token operator">:</span>TT_MeasurementType where <span class="token punctuation">&#123;</span>
            aap<span class="token punctuation">.</span>base equalsto self<span class="token punctuation">.</span>base<span class="token punctuation">;</span>
            aap<span class="token punctuation">.</span>unit equalsto self<span class="token punctuation">.</span>unit<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    conformsto rr<span class="token operator">:</span>TT_MeasurementType where <span class="token punctuation">&#123;</span>
            self<span class="token punctuation">.</span>base conformsto rr<span class="token punctuation">.</span>base<span class="token punctuation">;</span>
            self<span class="token punctuation">.</span>unit equalsto rr<span class="token punctuation">.</span>unit<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`;return{c(){y=c("h1"),V=p("Generic Types: an Example Typer Definition"),C=i(),w=c("p"),X=p("This example shows how generic types and unit of measurements can be defined."),U=i(),b=c("h2"),Z=p("The Typer Definition of the Example Language"),H=i(),E=c("p"),$=p(`Once the structure of the example language is defined, we are able to focus on
the typer definition. Because types in Freon do not reside within the AST,
but are completely separate from it, we need to associate a type concept with
each of our AST concepts.`),O=i(),x=c("h3"),g=p("The Type Concepts"),W=i(),k=c("p"),nn=p(`First, we define a type concept that corresponds
with our type declaration called `),L=c("em"),sn=p("GenericType"),an=p(", and one that corresponds with "),S=c("em"),tn=p("UnitOfMeasurement"),en=p(`.
They are quite similar to their AST counterparts, but note that here we use `),N=c("strong"),pn=p("PiType"),on=p(` as type for the property.
We want to build a structure of type concepts, not of AST nodes!`),B=i(),m=c("pre"),D=i(),v=c("h3"),cn=p("The Infertype Rules"),K=i(),q=c("p"),un=p(`Next, we associate the AST nodes with the type concepts, using infertype rules. When invoked, these rules will create a new instance of
the type concepts.`),Y=i(),h=c("pre"),j=i(),G=c("h3"),ln=p("The Conforms And Equals Rules"),F=i(),f=c("p"),rn=p(`To be able to compare the types of expressions and of type declarations,
we need to state the `),A=c("em"),kn=p("equalsto"),fn=p(" and/or "),R=c("em"),yn=p("conformsto"),Tn=p(" rules."),I=i(),d=c("pre"),J=i(),M=c("h2"),mn=p("The Complete Typer Definition"),z=i(),_=c("pre"),this.h()},l(n){y=u(n,"H1",{});var a=l(y);V=o(a,"Generic Types: an Example Typer Definition"),a.forEach(s),C=r(n),w=u(n,"P",{});var dn=l(w);X=o(dn,"This example shows how generic types and unit of measurements can be defined."),dn.forEach(s),U=r(n),b=u(n,"H2",{});var _n=l(b);Z=o(_n,"The Typer Definition of the Example Language"),_n.forEach(s),H=r(n),E=u(n,"P",{});var wn=l(E);$=o(wn,`Once the structure of the example language is defined, we are able to focus on
the typer definition. Because types in Freon do not reside within the AST,
but are completely separate from it, we need to associate a type concept with
each of our AST concepts.`),wn.forEach(s),O=r(n),x=u(n,"H3",{});var bn=l(x);g=o(bn,"The Type Concepts"),bn.forEach(s),W=r(n),k=u(n,"P",{});var T=l(k);nn=o(T,`First, we define a type concept that corresponds
with our type declaration called `),L=u(T,"EM",{});var En=l(L);sn=o(En,"GenericType"),En.forEach(s),an=o(T,", and one that corresponds with "),S=u(T,"EM",{});var xn=l(S);tn=o(xn,"UnitOfMeasurement"),xn.forEach(s),en=o(T,`.
They are quite similar to their AST counterparts, but note that here we use `),N=u(T,"STRONG",{});var vn=l(N);pn=o(vn,"PiType"),vn.forEach(s),on=o(T,` as type for the property.
We want to build a structure of type concepts, not of AST nodes!`),T.forEach(s),B=r(n),m=u(n,"PRE",{class:!0});var Hn=l(m);Hn.forEach(s),D=r(n),v=u(n,"H3",{});var qn=l(v);cn=o(qn,"The Infertype Rules"),qn.forEach(s),K=r(n),q=u(n,"P",{});var Gn=l(q);un=o(Gn,`Next, we associate the AST nodes with the type concepts, using infertype rules. When invoked, these rules will create a new instance of
the type concepts.`),Gn.forEach(s),Y=r(n),h=u(n,"PRE",{class:!0});var On=l(h);On.forEach(s),j=r(n),G=u(n,"H3",{});var Mn=l(G);ln=o(Mn,"The Conforms And Equals Rules"),Mn.forEach(s),F=r(n),f=u(n,"P",{});var P=l(f);rn=o(P,`To be able to compare the types of expressions and of type declarations,
we need to state the `),A=u(P,"EM",{});var Pn=l(A);kn=o(Pn,"equalsto"),Pn.forEach(s),fn=o(P," and/or "),R=u(P,"EM",{});var Ln=l(R);yn=o(Ln,"conformsto"),Ln.forEach(s),Tn=o(P," rules."),P.forEach(s),I=r(n),d=u(n,"PRE",{class:!0});var Wn=l(d);Wn.forEach(s),J=r(n),M=u(n,"H2",{});var Sn=l(M);mn=o(Sn,"The Complete Typer Definition"),Sn.forEach(s),z=r(n),_=u(n,"PRE",{class:!0});var Bn=l(_);Bn.forEach(s),this.h()},h(){Q(m,"class","language-ts"),Q(h,"class","language-ts"),Q(d,"class","language-ts"),Q(_,"class","language-ts")},m(n,a){t(n,y,a),e(y,V),t(n,C,a),t(n,w,a),e(w,X),t(n,U,a),t(n,b,a),e(b,Z),t(n,H,a),t(n,E,a),e(E,$),t(n,O,a),t(n,x,a),e(x,g),t(n,W,a),t(n,k,a),e(k,nn),e(k,L),e(L,sn),e(k,an),e(k,S),e(S,tn),e(k,en),e(k,N),e(N,pn),e(k,on),t(n,B,a),t(n,m,a),m.innerHTML=An,t(n,D,a),t(n,v,a),e(v,cn),t(n,K,a),t(n,q,a),e(q,un),t(n,Y,a),t(n,h,a),h.innerHTML=Rn,t(n,j,a),t(n,G,a),e(G,ln),t(n,F,a),t(n,f,a),e(f,rn),e(f,A),e(A,kn),e(f,fn),e(f,R),e(R,yn),e(f,Tn),t(n,I,a),t(n,d,a),d.innerHTML=Cn,t(n,J,a),t(n,M,a),e(M,mn),t(n,z,a),t(n,_,a),_.innerHTML=Un},p:hn,i:hn,o:hn,d(n){n&&s(y),n&&s(C),n&&s(w),n&&s(U),n&&s(b),n&&s(H),n&&s(E),n&&s(O),n&&s(x),n&&s(W),n&&s(k),n&&s(B),n&&s(m),n&&s(D),n&&s(v),n&&s(K),n&&s(q),n&&s(Y),n&&s(h),n&&s(j),n&&s(G),n&&s(F),n&&s(f),n&&s(I),n&&s(d),n&&s(J),n&&s(M),n&&s(z),n&&s(_)}}}class In extends Dn{constructor(y){super();Kn(this,y,null,jn,Yn,{})}}export{In as default};
