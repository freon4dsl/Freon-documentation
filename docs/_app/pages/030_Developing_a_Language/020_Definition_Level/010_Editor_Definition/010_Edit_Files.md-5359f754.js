import{S as Sa,i as La,s as Oa,e as o,t as s,k as c,w as ua,c as p,a as r,h as a,d as n,m as u,x as da,b as P,g as l,H as t,y as fa,q as ha,o as ma,B as ka}from"../../../../chunks/vendor-492729b6.js";import{N as ya}from"../../../../chunks/Note-1bdf01a3.js";/* empty css                                                            */function Da(O){let d;return{c(){d=s("The projection is always the first")},l(f){d=a(f,"The projection is always the first")},m(f,E){l(f,d,E)},d(f){f&&n(d)}}}function Na(O){let d;return{c(){d=s("For every concept or interface you have to define the projection before the trigger and/or symbol.")},l(f){d=a(f,"For every concept or interface you have to define the projection before the trigger and/or symbol.")},m(f,E){l(f,d,E)},d(f){f&&n(d)}}}function Ra(O){let d;return{c(){d=s("Each editor can be defined in multiple files")},l(f){d=a(f,"Each editor can be defined in multiple files")},m(f,E){l(f,d,E)},d(f){f&&n(d)}}}function Ma(O){let d,f,E,m;return{c(){d=s("Every "),f=o("code"),E=s(".edit"),m=s(` file that is encountered in the folder that holds your definitions, will be read during the generation.
When the editor in multiple files has the same name all information will be combined into a single editor. 
The precedence needs to be added only once, but in case you add it multiple times, the numbers are required to be equal.`)},l(y){d=a(y,"Every "),f=p(y,"CODE",{});var w=r(f);E=a(w,".edit"),w.forEach(n),m=a(y,` file that is encountered in the folder that holds your definitions, will be read during the generation.
When the editor in multiple files has the same name all information will be combined into a single editor. 
The precedence needs to be added only once, but in case you add it multiple times, the numbers are required to be equal.`)},m(y,w){l(y,d,w),l(y,f,w),t(f,E),l(y,m,w)},d(y){y&&n(d),y&&n(f),y&&n(m)}}}function Aa(O){let d,f,E,m,y,w,Tt,gt,ce,xt,It,ue,St,Lt,de,Ot,Dt,fe,Nt,Rt,Ke,$,S,Mt,he,At,Ht,me,Ct,Bt,Ft,L,Gt,ke,qt,Wt,ye,Yt,Kt,zt,v,Ut,ve,Jt,Qt,_e,Vt,Xt,Ee,Zt,en,be,tn,nn,we,sn,an,ze,b,on,je,pn,rn,Pe,ln,cn,U,un,dn,$e,fn,hn,Ue,D,Je,J,mn,Qe,T,kn,Te,yn,vn,ge,_n,En,Ve,N,bn,Q,wn,jn,Xe,R,Pn,V,$n,Tn,Ze,X,gn,et,M,xn,xe,In,Sn,tt,A,Ln,Ie,On,Dn,nt,F,va=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L24-L28</span>

concept BaseProduct <span class="token punctuation">&#123;</span>
    name<span class="token operator">:</span> identifier<span class="token punctuation">;</span>           <span class="token comment">// internal name</span>
    theme<span class="token operator">:</span> InsuranceTheme<span class="token punctuation">;</span>      <span class="token comment">// the 'kind' of insurance</span>
    parts<span class="token operator">:</span> InsurancePart<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>     <span class="token comment">// all parts of this product</span>
<span class="token punctuation">&#125;</span></code>`,st,G,_a=`<code class="language-ts">BaseProduct <span class="token operator">=</span> <span class="token string">'BaseProduct'</span> identifier <span class="token string">'&#123;'</span>
<span class="token string">'parts'</span>
InsurancePart<span class="token operator">*</span>
<span class="token string">'theme'</span> InsuranceTheme
<span class="token string">'&#125;'</span> <span class="token punctuation">;</span></code>`,at,q,Se,Nn,ot,g,Rn,Le,Mn,An,Oe,Hn,Cn,pt,Z,Bn,rt,H,it,W,Ea=`<code class="language-ts"><span class="token comment">// docu-project/defs/editor-tables.edit#L1-L5</span>

<span class="token comment">/* This file contains the table definition in a separate editor / projection group.
This enables the user to switch tables on and off. */</span>

editor tables precedence <span class="token number">4</span>
</code>`,lt,ee,Fn,ct,h,Gn,De,qn,Wn,Ne,Yn,Kn,Re,zn,Un,Me,Jn,Qn,Ae,Vn,Xn,He,Zn,es,Ce,ts,ns,Be,ss,as,Fe,os,ps,ut,Y,ba=`<code class="language-ts"><span class="token comment">// docu-project/defs/editor-main-default.edit#L5-L5</span>

<span class="token builtin">boolean</span> <span class="token punctuation">[</span><span class="token constant">YES</span> <span class="token operator">|</span> <span class="token constant">NO</span><span class="token punctuation">]</span> <span class="token comment">// the strings used to display a boolean value</span></code>`,dt,C,rs,te,is,ls,ft,ne,cs,ht,x,us,Ge,ds,fs,qe,hs,ms,mt,K,wa=`<code class="language-ts"><span class="token comment">// docu-project/defs/editor-main-default.edit#L7-L7</span>

referenceSeparator <span class="token punctuation">[</span><span class="token operator">:</span><span class="token punctuation">]</span> <span class="token comment">// the string that separates the names in a path name, e.g. pack1:cls3:part</span></code>`,kt,B,ks,We,ys,vs,yt,se,_s,vt,z,ja=`<code class="language-ts"><span class="token comment">// docu-project/defs/editor-main-default.edit#L1-L52</span>

<span class="token comment">/* This file contains the default editor definition. */</span>

editor <span class="token keyword">default</span>

<span class="token builtin">boolean</span> <span class="token punctuation">[</span><span class="token constant">YES</span> <span class="token operator">|</span> <span class="token constant">NO</span><span class="token punctuation">]</span> <span class="token comment">// the strings used to display a boolean value</span>

referenceSeparator <span class="token punctuation">[</span><span class="token operator">:</span><span class="token punctuation">]</span> <span class="token comment">// the string that separates the names in a path name, e.g. pack1:cls3:part</span>

<span class="token comment">// both modelunits show a single concept</span>
Part <span class="token punctuation">&#123;</span><span class="token punctuation">[</span> $<span class="token punctuation">&#123;</span>self<span class="token punctuation">.</span>part<span class="token punctuation">&#125;</span> <span class="token punctuation">]</span><span class="token punctuation">&#125;</span>
Product <span class="token punctuation">&#123;</span><span class="token punctuation">[</span> $<span class="token punctuation">&#123;</span>self<span class="token punctuation">.</span>product<span class="token punctuation">&#125;</span> <span class="token punctuation">]</span><span class="token punctuation">&#125;</span>

BaseProduct <span class="token punctuation">&#123;</span><span class="token punctuation">[</span>
    Base Products $<span class="token punctuation">&#123;</span>name<span class="token punctuation">&#125;</span> <span class="token keyword">for</span> $<span class="token punctuation">&#123;</span>theme<span class="token punctuation">&#125;</span>
        $<span class="token punctuation">&#123;</span>parts<span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">&#125;</span>

InsurancePart<span class="token punctuation">&#123;</span>
<span class="token punctuation">[</span>
    Insurance Part $<span class="token punctuation">&#123;</span>self<span class="token punctuation">.</span>name<span class="token punctuation">&#125;</span>
        risk assessment<span class="token operator">:</span> $<span class="token punctuation">&#123;</span>self<span class="token punctuation">.</span>statisticalRisk<span class="token punctuation">&#125;</span>
        maximum payout<span class="token operator">:</span> $<span class="token punctuation">&#123;</span>self<span class="token punctuation">.</span>maximumPayOut<span class="token punctuation">&#125;</span>
        <span class="token keyword">is</span> approved<span class="token operator">:</span> $<span class="token punctuation">&#123;</span>self<span class="token punctuation">.</span>isApproved<span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span>

InsuranceProduct <span class="token punctuation">&#123;</span><span class="token punctuation">[</span>
    Insurance Product $<span class="token punctuation">&#123;</span>name<span class="token punctuation">&#125;</span> <span class="token punctuation">(</span> <span class="token keyword">public</span> name<span class="token operator">:</span> $<span class="token punctuation">&#123;</span>productName<span class="token punctuation">&#125;</span> <span class="token punctuation">)</span> <span class="token constant">USES</span> $<span class="token punctuation">&#123;</span>basedOn horizontal separator<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token punctuation">]</span><span class="token punctuation">&#125;</span>
        Themes<span class="token operator">:</span> $<span class="token punctuation">&#123;</span>themes horizontal separator<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token punctuation">]</span><span class="token punctuation">&#125;</span>
        Premium<span class="token operator">:</span> $<span class="token punctuation">&#123;</span>advertisedPremium<span class="token punctuation">&#125;</span> per $<span class="token punctuation">&#123;</span>nrPremiumDays<span class="token punctuation">&#125;</span>
        Insured risks<span class="token operator">:</span>
            $<span class="token punctuation">&#123;</span>parts vertical terminator <span class="token punctuation">[</span><span class="token punctuation">;</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span>
        Calculation
            <span class="token punctuation">[</span><span class="token operator">?</span> Risk adjusted by <span class="token operator">=</span> $<span class="token punctuation">&#123;</span>riskAdjustment<span class="token punctuation">&#125;</span> <span class="token punctuation">]</span>
            calculated premium<span class="token operator">:</span> $<span class="token punctuation">&#123;</span>calculation<span class="token punctuation">&#125;</span>
        <span class="token punctuation">[</span><span class="token operator">?</span>Helper functions<span class="token operator">:</span>
            $<span class="token punctuation">&#123;</span>helpers vertical<span class="token punctuation">&#125;</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">&#125;</span>

CalcFunction <span class="token punctuation">&#123;</span>
    <span class="token punctuation">[</span>
        $<span class="token punctuation">&#123;</span>name<span class="token punctuation">&#125;</span> <span class="token punctuation">(</span> $<span class="token punctuation">&#123;</span>parameters horizontal separator<span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span> <span class="token punctuation">)</span><span class="token operator">:</span> $<span class="token punctuation">&#123;</span>declaredType<span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>
            $<span class="token punctuation">&#123;</span>body<span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span>
Description <span class="token punctuation">&#123;</span>
    <span class="token punctuation">[</span>$<span class="token punctuation">&#123;</span>content<span class="token punctuation">&#125;</span><span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span>
Parameter <span class="token punctuation">&#123;</span>
     <span class="token punctuation">[</span>$<span class="token punctuation">&#123;</span>name<span class="token punctuation">&#125;</span> <span class="token operator">:</span> $<span class="token punctuation">&#123;</span>declaredType<span class="token punctuation">&#125;</span><span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span></code>`,_t;return D=new ya({props:{$$slots:{content:[Na],header:[Da]},$$scope:{ctx:O}}}),H=new ya({props:{$$slots:{content:[Ma],header:[Ra]},$$scope:{ctx:O}}}),{c(){d=o("h1"),f=s("The Editor Definition Files"),E=c(),m=o("p"),y=s("In an editor definition file ("),w=o("code"),Tt=s(".edit"),gt=s(` file) you can define a ProjectIt editor by providing extra information
for each `),ce=o("em"),xt=s("concept"),It=s(" or "),ue=o("em"),St=s("interface"),Lt=s(` in your language. Currently, you can define the following three items per
`),de=o("em"),Ot=s("concept"),Dt=s(" or "),fe=o("em"),Nt=s("interface"),Rt=s("."),Ke=c(),$=o("ul"),S=o("li"),Mt=s("A "),he=o("strong"),At=s("projection"),Ht=s(", which is how the "),me=o("em"),Ct=s("concept"),Bt=s(" is shown in the editor."),Ft=c(),L=o("li"),Gt=s("An optional "),ke=o("strong"),qt=s("trigger"),Wt=s(`, which is the key or keys your user needs to type to create a
new instance of the `),ye=o("em"),Yt=s("concept"),Kt=s("."),zt=c(),v=o("li"),Ut=s("An optional "),ve=o("strong"),Jt=s("symbol"),Qt=s(", which is only used for "),_e=o("strong"),Vt=s("binary expressions"),Xt=s(`. It is the character or
character string that represents the `),Ee=o("em"),Zt=s("operator"),en=s(". When the "),be=o("em"),tn=s("symbol"),nn=s(` is not present,
the `),we=o("em"),sn=s("trigger"),an=s(" will be used for this purpose."),ze=c(),b=o("p"),on=s("You cannot create a projection for either a "),je=o("strong"),pn=s("binary expression concept"),rn=s(" or a "),Pe=o("strong"),ln=s("limited concept"),cn=s(`.
The editor provides extra `),U=o("a"),un=s("support for expressions"),dn=s(`, which
cannot be done if a user defined projection is provided. `),$e=o("strong"),fn=s("Limited concepts"),hn=s(` are blocked, because the user of the editor
can use the instances of the limited concept solely as references.`),Ue=c(),ua(D.$$.fragment),Je=c(),J=o("h2"),mn=s("Named Editors or Projection Sets"),Qe=c(),T=o("p"),kn=s("Editors can be "),Te=o("strong"),yn=s("named"),vn=s(", and you can define multiple editors. A "),ge=o("strong"),_n=s("named editor"),En=s(`
defines a set of projections that are coordinated to operate together.
These sets can be switched on and off dynamically, thus changing
the appearance of the model in the editor.
the appearance of the model in the editor.`),Ve=c(),N=o("p"),bn=s(`For instance, if you define all table projections under the same editor name,
then your user can switch from viewing objects as lists to viewing them
as `),Q=o("a"),wn=s("tables"),jn=s(`.
Or, in another example, you could have an editor (or projection set) that shows only part of the properties of some
concepts, whereas another editor shows all properties. This makes it possible to cater for different types of users.`),Xe=c(),R=o("p"),Pn=s(`Projections may specifically request that a property is displayed using a projection from a named editor.
For this see `),V=o("a"),$n=s("Including a Property Projection from Another Editor"),Tn=s("."),Ze=c(),X=o("h3"),gn=s("The Default Editor and Defaults for Every Concept"),et=c(),M=o("p"),xn=s(`Because there has to be an editor that can be used as fallback when all other editors are switched off, an
editor with the name `),xe=o("strong"),In=s("default"),Sn=s(` is generated in case it is not provided. If the default editor is provided but incomplete,
i.e. it does not define a projection for all concepts,
projections will be generated for the missing concepts. So, upon generation the default editor is always complete.`),tt=c(),A=o("p"),Ln=s("For instance when no projection is provided for the concept "),Ie=o("code"),On=s("BaseProduct"),Dn=s(`, the concrete syntax for instances of this concept
will be using the name of the concepts and its properties as keywords, and any list property will be shown as a vertical list,
which is shown more or less by the following grammar rule.`),nt=c(),F=o("pre"),st=c(),G=o("pre"),at=c(),q=o("h3"),Se=o("a"),Nn=s(" Precedence of Editors"),ot=c(),g=o("p"),Rn=s("The named editors are ordered; the order can be indicated by adding a "),Le=o("strong"),Mn=s("precendence"),An=s(` to the editor. The
projections are found based on this order. The `),Oe=o("code"),Hn=s("default"),Cn=s(` editor is always the last (i.e. its precedence is 0).
If a box/projection for a concept is not present in the editor with the highest precedence,
then the next editor is searched for a projection for the concept and so on, till the default editor is reached.`),pt=c(),Z=o("p"),Bn=s(`When you omit the precedence, ProjectIt will assign one based on the order in which the files are read,
which normally is alphabetically. However, we cannot guarantee any specific order.`),rt=c(),ua(H.$$.fragment),it=c(),W=o("pre"),lt=c(),ee=o("h2"),Fn=s("Standard Boolean Keywords"),ct=c(),h=o("p"),Gn=s("Next to the concrete syntax definitions for "),De=o("em"),qn=s("concepts"),Wn=s(" and "),Ne=o("em"),Yn=s("interfaces"),Kn=s(`, you can define the keywords to be used for
the boolean `),Re=o("em"),zn=s("true"),Un=s(" and "),Me=o("em"),Jn=s("false"),Qn=s(` values. Note that this can be done once in the complete set of editors. It should be
part of an editor called `),Ae=o("em"),Vn=s("default"),Xn=s(". In the example below, the user will view the string "),He=o("code"),Zn=s("YES"),es=s(` whenever a boolean
property has the value `),Ce=o("code"),ts=s("true"),ns=s(", and likewise "),Be=o("code"),ss=s("NO"),as=s(" will be shown for the value "),Fe=o("code"),os=s("false"),ps=s("."),ut=c(),Y=o("pre"),dt=c(),C=o("p"),rs=s(`The standard keywords can be overwritten per property.
See `),te=o("a"),is=s("Boolean Keyword Projections"),ls=s("."),ft=c(),ne=o("h2"),cs=s("Reference Separator"),ht=c(),x=o("p"),us=s("References to other objects may consist of a series of names, like "),Ge=o("em"),ds=s("country.city.street.house"),fs=s(`. The string used to separate
these names (in the example \u201D:\u201D) can be set, but, like the boolean values, only once for the complete set of editors,
in the editor called `),qe=o("em"),hs=s("default"),ms=s("."),mt=c(),K=o("pre"),kt=c(),B=o("h2"),ks=s("Example "),We=o("code"),ys=s(".edit"),vs=s(" File"),yt=c(),se=o("p"),_s=s("A complete .edit file could look like this."),vt=c(),z=o("pre"),this.h()},l(e){d=p(e,"H1",{});var i=r(d);f=a(i,"The Editor Definition Files"),i.forEach(n),E=u(e),m=p(e,"P",{});var _=r(m);y=a(_,"In an editor definition file ("),w=p(_,"CODE",{});var Ye=r(w);Tt=a(Ye,".edit"),Ye.forEach(n),gt=a(_,` file) you can define a ProjectIt editor by providing extra information
for each `),ce=p(_,"EM",{});var bs=r(ce);xt=a(bs,"concept"),bs.forEach(n),It=a(_," or "),ue=p(_,"EM",{});var ws=r(ue);St=a(ws,"interface"),ws.forEach(n),Lt=a(_,` in your language. Currently, you can define the following three items per
`),de=p(_,"EM",{});var js=r(de);Ot=a(js,"concept"),js.forEach(n),Dt=a(_," or "),fe=p(_,"EM",{});var Ps=r(fe);Nt=a(Ps,"interface"),Ps.forEach(n),Rt=a(_,"."),_.forEach(n),Ke=u(e),$=p(e,"UL",{});var ae=r($);S=p(ae,"LI",{});var oe=r(S);Mt=a(oe,"A "),he=p(oe,"STRONG",{});var $s=r(he);At=a($s,"projection"),$s.forEach(n),Ht=a(oe,", which is how the "),me=p(oe,"EM",{});var Ts=r(me);Ct=a(Ts,"concept"),Ts.forEach(n),Bt=a(oe," is shown in the editor."),oe.forEach(n),Ft=u(ae),L=p(ae,"LI",{});var pe=r(L);Gt=a(pe,"An optional "),ke=p(pe,"STRONG",{});var gs=r(ke);qt=a(gs,"trigger"),gs.forEach(n),Wt=a(pe,`, which is the key or keys your user needs to type to create a
new instance of the `),ye=p(pe,"EM",{});var xs=r(ye);Yt=a(xs,"concept"),xs.forEach(n),Kt=a(pe,"."),pe.forEach(n),zt=u(ae),v=p(ae,"LI",{});var j=r(v);Ut=a(j,"An optional "),ve=p(j,"STRONG",{});var Is=r(ve);Jt=a(Is,"symbol"),Is.forEach(n),Qt=a(j,", which is only used for "),_e=p(j,"STRONG",{});var Ss=r(_e);Vt=a(Ss,"binary expressions"),Ss.forEach(n),Xt=a(j,`. It is the character or
character string that represents the `),Ee=p(j,"EM",{});var Ls=r(Ee);Zt=a(Ls,"operator"),Ls.forEach(n),en=a(j,". When the "),be=p(j,"EM",{});var Os=r(be);tn=a(Os,"symbol"),Os.forEach(n),nn=a(j,` is not present,
the `),we=p(j,"EM",{});var Ds=r(we);sn=a(Ds,"trigger"),Ds.forEach(n),an=a(j," will be used for this purpose."),j.forEach(n),ae.forEach(n),ze=u(e),b=p(e,"P",{});var I=r(b);on=a(I,"You cannot create a projection for either a "),je=p(I,"STRONG",{});var Ns=r(je);pn=a(Ns,"binary expression concept"),Ns.forEach(n),rn=a(I," or a "),Pe=p(I,"STRONG",{});var Rs=r(Pe);ln=a(Rs,"limited concept"),Rs.forEach(n),cn=a(I,`.
The editor provides extra `),U=p(I,"A",{href:!0});var Ms=r(U);un=a(Ms,"support for expressions"),Ms.forEach(n),dn=a(I,`, which
cannot be done if a user defined projection is provided. `),$e=p(I,"STRONG",{});var As=r($e);fn=a(As,"Limited concepts"),As.forEach(n),hn=a(I,` are blocked, because the user of the editor
can use the instances of the limited concept solely as references.`),I.forEach(n),Ue=u(e),da(D.$$.fragment,e),Je=u(e),J=p(e,"H2",{});var Hs=r(J);mn=a(Hs,"Named Editors or Projection Sets"),Hs.forEach(n),Qe=u(e),T=p(e,"P",{});var re=r(T);kn=a(re,"Editors can be "),Te=p(re,"STRONG",{});var Cs=r(Te);yn=a(Cs,"named"),Cs.forEach(n),vn=a(re,", and you can define multiple editors. A "),ge=p(re,"STRONG",{});var Bs=r(ge);_n=a(Bs,"named editor"),Bs.forEach(n),En=a(re,`
defines a set of projections that are coordinated to operate together.
These sets can be switched on and off dynamically, thus changing
the appearance of the model in the editor.
the appearance of the model in the editor.`),re.forEach(n),Ve=u(e),N=p(e,"P",{});var Et=r(N);bn=a(Et,`For instance, if you define all table projections under the same editor name,
then your user can switch from viewing objects as lists to viewing them
as `),Q=p(Et,"A",{href:!0});var Fs=r(Q);wn=a(Fs,"tables"),Fs.forEach(n),jn=a(Et,`.
Or, in another example, you could have an editor (or projection set) that shows only part of the properties of some
concepts, whereas another editor shows all properties. This makes it possible to cater for different types of users.`),Et.forEach(n),Xe=u(e),R=p(e,"P",{});var bt=r(R);Pn=a(bt,`Projections may specifically request that a property is displayed using a projection from a named editor.
For this see `),V=p(bt,"A",{href:!0});var Gs=r(V);$n=a(Gs,"Including a Property Projection from Another Editor"),Gs.forEach(n),Tn=a(bt,"."),bt.forEach(n),Ze=u(e),X=p(e,"H3",{});var qs=r(X);gn=a(qs,"The Default Editor and Defaults for Every Concept"),qs.forEach(n),et=u(e),M=p(e,"P",{});var wt=r(M);xn=a(wt,`Because there has to be an editor that can be used as fallback when all other editors are switched off, an
editor with the name `),xe=p(wt,"STRONG",{});var Ws=r(xe);In=a(Ws,"default"),Ws.forEach(n),Sn=a(wt,` is generated in case it is not provided. If the default editor is provided but incomplete,
i.e. it does not define a projection for all concepts,
projections will be generated for the missing concepts. So, upon generation the default editor is always complete.`),wt.forEach(n),tt=u(e),A=p(e,"P",{});var jt=r(A);Ln=a(jt,"For instance when no projection is provided for the concept "),Ie=p(jt,"CODE",{});var Ys=r(Ie);On=a(Ys,"BaseProduct"),Ys.forEach(n),Dn=a(jt,`, the concrete syntax for instances of this concept
will be using the name of the concepts and its properties as keywords, and any list property will be shown as a vertical list,
which is shown more or less by the following grammar rule.`),jt.forEach(n),nt=u(e),F=p(e,"PRE",{class:!0});var Pa=r(F);Pa.forEach(n),st=u(e),G=p(e,"PRE",{class:!0});var $a=r(G);$a.forEach(n),at=u(e),q=p(e,"H3",{});var Es=r(q);Se=p(Es,"A",{name:!0}),r(Se).forEach(n),Nn=a(Es," Precedence of Editors"),Es.forEach(n),ot=u(e),g=p(e,"P",{});var ie=r(g);Rn=a(ie,"The named editors are ordered; the order can be indicated by adding a "),Le=p(ie,"STRONG",{});var Ks=r(Le);Mn=a(Ks,"precendence"),Ks.forEach(n),An=a(ie,` to the editor. The
projections are found based on this order. The `),Oe=p(ie,"CODE",{});var zs=r(Oe);Hn=a(zs,"default"),zs.forEach(n),Cn=a(ie,` editor is always the last (i.e. its precedence is 0).
If a box/projection for a concept is not present in the editor with the highest precedence,
then the next editor is searched for a projection for the concept and so on, till the default editor is reached.`),ie.forEach(n),pt=u(e),Z=p(e,"P",{});var Us=r(Z);Bn=a(Us,`When you omit the precedence, ProjectIt will assign one based on the order in which the files are read,
which normally is alphabetically. However, we cannot guarantee any specific order.`),Us.forEach(n),rt=u(e),da(H.$$.fragment,e),it=u(e),W=p(e,"PRE",{class:!0});var Ta=r(W);Ta.forEach(n),lt=u(e),ee=p(e,"H2",{});var Js=r(ee);Fn=a(Js,"Standard Boolean Keywords"),Js.forEach(n),ct=u(e),h=p(e,"P",{});var k=r(h);Gn=a(k,"Next to the concrete syntax definitions for "),De=p(k,"EM",{});var Qs=r(De);qn=a(Qs,"concepts"),Qs.forEach(n),Wn=a(k," and "),Ne=p(k,"EM",{});var Vs=r(Ne);Yn=a(Vs,"interfaces"),Vs.forEach(n),Kn=a(k,`, you can define the keywords to be used for
the boolean `),Re=p(k,"EM",{});var Xs=r(Re);zn=a(Xs,"true"),Xs.forEach(n),Un=a(k," and "),Me=p(k,"EM",{});var Zs=r(Me);Jn=a(Zs,"false"),Zs.forEach(n),Qn=a(k,` values. Note that this can be done once in the complete set of editors. It should be
part of an editor called `),Ae=p(k,"EM",{});var ea=r(Ae);Vn=a(ea,"default"),ea.forEach(n),Xn=a(k,". In the example below, the user will view the string "),He=p(k,"CODE",{});var ta=r(He);Zn=a(ta,"YES"),ta.forEach(n),es=a(k,` whenever a boolean
property has the value `),Ce=p(k,"CODE",{});var na=r(Ce);ts=a(na,"true"),na.forEach(n),ns=a(k,", and likewise "),Be=p(k,"CODE",{});var sa=r(Be);ss=a(sa,"NO"),sa.forEach(n),as=a(k," will be shown for the value "),Fe=p(k,"CODE",{});var aa=r(Fe);os=a(aa,"false"),aa.forEach(n),ps=a(k,"."),k.forEach(n),ut=u(e),Y=p(e,"PRE",{class:!0});var ga=r(Y);ga.forEach(n),dt=u(e),C=p(e,"P",{});var Pt=r(C);rs=a(Pt,`The standard keywords can be overwritten per property.
See `),te=p(Pt,"A",{href:!0});var oa=r(te);is=a(oa,"Boolean Keyword Projections"),oa.forEach(n),ls=a(Pt,"."),Pt.forEach(n),ft=u(e),ne=p(e,"H2",{});var pa=r(ne);cs=a(pa,"Reference Separator"),pa.forEach(n),ht=u(e),x=p(e,"P",{});var le=r(x);us=a(le,"References to other objects may consist of a series of names, like "),Ge=p(le,"EM",{});var ra=r(Ge);ds=a(ra,"country.city.street.house"),ra.forEach(n),fs=a(le,`. The string used to separate
these names (in the example \u201D:\u201D) can be set, but, like the boolean values, only once for the complete set of editors,
in the editor called `),qe=p(le,"EM",{});var ia=r(qe);hs=a(ia,"default"),ia.forEach(n),ms=a(le,"."),le.forEach(n),mt=u(e),K=p(e,"PRE",{class:!0});var xa=r(K);xa.forEach(n),kt=u(e),B=p(e,"H2",{});var $t=r(B);ks=a($t,"Example "),We=p($t,"CODE",{});var la=r(We);ys=a(la,".edit"),la.forEach(n),vs=a($t," File"),$t.forEach(n),yt=u(e),se=p(e,"P",{});var ca=r(se);_s=a(ca,"A complete .edit file could look like this."),ca.forEach(n),vt=u(e),z=p(e,"PRE",{class:!0});var Ia=r(z);Ia.forEach(n),this.h()},h(){P(U,"href","/010_Intro/010_Projectional_Editing#expressions"),P(Q,"href","/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/020_Projections#tables"),P(V,"href","/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/020_Projections#named_projection"),P(F,"class","language-ts"),P(G,"class","language-ts"),P(Se,"name","ordering"),P(W,"class","language-ts"),P(Y,"class","language-ts"),P(te,"href","/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/020_Projections#booleans"),P(K,"class","language-ts"),P(z,"class","language-ts")},m(e,i){l(e,d,i),t(d,f),l(e,E,i),l(e,m,i),t(m,y),t(m,w),t(w,Tt),t(m,gt),t(m,ce),t(ce,xt),t(m,It),t(m,ue),t(ue,St),t(m,Lt),t(m,de),t(de,Ot),t(m,Dt),t(m,fe),t(fe,Nt),t(m,Rt),l(e,Ke,i),l(e,$,i),t($,S),t(S,Mt),t(S,he),t(he,At),t(S,Ht),t(S,me),t(me,Ct),t(S,Bt),t($,Ft),t($,L),t(L,Gt),t(L,ke),t(ke,qt),t(L,Wt),t(L,ye),t(ye,Yt),t(L,Kt),t($,zt),t($,v),t(v,Ut),t(v,ve),t(ve,Jt),t(v,Qt),t(v,_e),t(_e,Vt),t(v,Xt),t(v,Ee),t(Ee,Zt),t(v,en),t(v,be),t(be,tn),t(v,nn),t(v,we),t(we,sn),t(v,an),l(e,ze,i),l(e,b,i),t(b,on),t(b,je),t(je,pn),t(b,rn),t(b,Pe),t(Pe,ln),t(b,cn),t(b,U),t(U,un),t(b,dn),t(b,$e),t($e,fn),t(b,hn),l(e,Ue,i),fa(D,e,i),l(e,Je,i),l(e,J,i),t(J,mn),l(e,Qe,i),l(e,T,i),t(T,kn),t(T,Te),t(Te,yn),t(T,vn),t(T,ge),t(ge,_n),t(T,En),l(e,Ve,i),l(e,N,i),t(N,bn),t(N,Q),t(Q,wn),t(N,jn),l(e,Xe,i),l(e,R,i),t(R,Pn),t(R,V),t(V,$n),t(R,Tn),l(e,Ze,i),l(e,X,i),t(X,gn),l(e,et,i),l(e,M,i),t(M,xn),t(M,xe),t(xe,In),t(M,Sn),l(e,tt,i),l(e,A,i),t(A,Ln),t(A,Ie),t(Ie,On),t(A,Dn),l(e,nt,i),l(e,F,i),F.innerHTML=va,l(e,st,i),l(e,G,i),G.innerHTML=_a,l(e,at,i),l(e,q,i),t(q,Se),t(q,Nn),l(e,ot,i),l(e,g,i),t(g,Rn),t(g,Le),t(Le,Mn),t(g,An),t(g,Oe),t(Oe,Hn),t(g,Cn),l(e,pt,i),l(e,Z,i),t(Z,Bn),l(e,rt,i),fa(H,e,i),l(e,it,i),l(e,W,i),W.innerHTML=Ea,l(e,lt,i),l(e,ee,i),t(ee,Fn),l(e,ct,i),l(e,h,i),t(h,Gn),t(h,De),t(De,qn),t(h,Wn),t(h,Ne),t(Ne,Yn),t(h,Kn),t(h,Re),t(Re,zn),t(h,Un),t(h,Me),t(Me,Jn),t(h,Qn),t(h,Ae),t(Ae,Vn),t(h,Xn),t(h,He),t(He,Zn),t(h,es),t(h,Ce),t(Ce,ts),t(h,ns),t(h,Be),t(Be,ss),t(h,as),t(h,Fe),t(Fe,os),t(h,ps),l(e,ut,i),l(e,Y,i),Y.innerHTML=ba,l(e,dt,i),l(e,C,i),t(C,rs),t(C,te),t(te,is),t(C,ls),l(e,ft,i),l(e,ne,i),t(ne,cs),l(e,ht,i),l(e,x,i),t(x,us),t(x,Ge),t(Ge,ds),t(x,fs),t(x,qe),t(qe,hs),t(x,ms),l(e,mt,i),l(e,K,i),K.innerHTML=wa,l(e,kt,i),l(e,B,i),t(B,ks),t(B,We),t(We,ys),t(B,vs),l(e,yt,i),l(e,se,i),t(se,_s),l(e,vt,i),l(e,z,i),z.innerHTML=ja,_t=!0},p(e,[i]){const _={};i&2&&(_.$$scope={dirty:i,ctx:e}),D.$set(_);const Ye={};i&2&&(Ye.$$scope={dirty:i,ctx:e}),H.$set(Ye)},i(e){_t||(ha(D.$$.fragment,e),ha(H.$$.fragment,e),_t=!0)},o(e){ma(D.$$.fragment,e),ma(H.$$.fragment,e),_t=!1},d(e){e&&n(d),e&&n(E),e&&n(m),e&&n(Ke),e&&n($),e&&n(ze),e&&n(b),e&&n(Ue),ka(D,e),e&&n(Je),e&&n(J),e&&n(Qe),e&&n(T),e&&n(Ve),e&&n(N),e&&n(Xe),e&&n(R),e&&n(Ze),e&&n(X),e&&n(et),e&&n(M),e&&n(tt),e&&n(A),e&&n(nt),e&&n(F),e&&n(st),e&&n(G),e&&n(at),e&&n(q),e&&n(ot),e&&n(g),e&&n(pt),e&&n(Z),e&&n(rt),ka(H,e),e&&n(it),e&&n(W),e&&n(lt),e&&n(ee),e&&n(ct),e&&n(h),e&&n(ut),e&&n(Y),e&&n(dt),e&&n(C),e&&n(ft),e&&n(ne),e&&n(ht),e&&n(x),e&&n(mt),e&&n(K),e&&n(kt),e&&n(B),e&&n(yt),e&&n(se),e&&n(vt),e&&n(z)}}}function Ha(O){return[]}class Ga extends Sa{constructor(d){super();La(this,d,Ha,Aa,Oa,{})}}export{Ga as default};
