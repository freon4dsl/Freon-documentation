import{S as Et,i as Mt,s as $t,e as r,t as a,k as d,w as dt,c as l,a as p,h as o,d as n,m as h,x as ht,b as $,g as m,H as t,y as gt,q as _t,o as vt,B as wt}from"../../chunks/vendor-0dc77bd0.js";import{N as bt}from"../../chunks/Note-b0db7989.js";/* empty css                                                      */function xt(x){let i;return{c(){i=a("What is referable is determined by the language engineer.")},l(c){i=o(c,"What is referable is determined by the language engineer.")},m(c,g){m(c,i,g)},d(c){c&&n(i)}}}function St(x){let i;return{c(){i=a(`The language designer defines which elements in a model are referable.
From the point of view of the user this is a given part of the language (s)he is using.
This is similar to restrictions in a programming language that state that only certain 
types of elements may be exported/imported.`)},l(c){i=o(c,`The language designer defines which elements in a model are referable.
From the point of view of the user this is a given part of the language (s)he is using.
This is similar to restrictions in a programming language that state that only certain 
types of elements may be exported/imported.`)},m(c,g){m(c,i,g)},d(c){c&&n(i)}}}function Tt(x){let i;return{c(){i=a("By-name References.")},l(c){i=o(c,"By-name References.")},m(c,g){m(c,i,g)},d(c){c&&n(i)}}}function Pt(x){let i;return{c(){i=a(`References are by name, like they are in programming languages.
This is unlike many other modeling environments, where references are done by id.`)},l(c){i=o(c,`References are by name, like they are in programming languages.
This is unlike many other modeling environments, where references are done by id.`)},m(c,g){m(c,i,g)},d(c){c&&n(i)}}}function At(x){let i,c,g,k,ue,S,fe,de,Y,D,he,Z,u,ge,N,_e,ve,O,we,be,W,ke,ye,G,Ee,Me,ee,T,kt=`<code class="language-ts"><span class="token comment">// docu-project/defs/language-main.ast#L7-L20</span>

model InsuranceModel <span class="token punctuation">&#123;</span>
    parts<span class="token operator">:</span> Part<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>              <span class="token comment">// units that hold partial definitions of insurance products</span>
    products<span class="token operator">:</span> Product<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>        <span class="token comment">// units that hold sellable insurance products</span>
<span class="token punctuation">&#125;</span>

modelunit Part <span class="token punctuation">&#123;</span>
    part<span class="token operator">:</span> BaseProduct<span class="token punctuation">;</span>          <span class="token comment">// one collection of partial insurance products</span>
    file<span class="token operator">-</span>extension <span class="token operator">=</span> <span class="token string">"base"</span><span class="token punctuation">;</span>    <span class="token comment">// the file extension used by the parser</span>
<span class="token punctuation">&#125;</span>

modelunit Product <span class="token punctuation">&#123;</span>
    product<span class="token operator">:</span> InsuranceProduct<span class="token punctuation">;</span>  <span class="token comment">// one collection of sellable insurance products</span>
    file<span class="token operator">-</span>extension <span class="token operator">=</span> <span class="token string">"prod"</span><span class="token punctuation">;</span>    <span class="token comment">// the file extension used by the parser</span>
<span class="token punctuation">&#125;</span></code>`,te,B,$e,ne,_,b,xe,z,Se,Te,q,Pe,Ae,Ie,P,Fe,j,Le,De,Be,A,Re,I,Ue,He,ae,F,J,Ce,oe,y,Ne,K,Oe,We,se,f,Ge,R,ze,qe,Q,je,Je,V,Ke,Qe,U,Ve,Xe,ie,E,re,M,le;return E=new bt({props:{$$slots:{content:[St],header:[xt]},$$scope:{ctx:x}}}),M=new bt({props:{$$slots:{content:[Pt],header:[Tt]},$$scope:{ctx:x}}}),{c(){i=r("h1"),c=a("Models Often Become Too Large"),g=d(),k=r("p"),ue=a("Contrary to what is common in the world of "),S=r("a"),fe=a("Domain Specific Languages (DSLs)"),de=a(`
we believe that a model
is often too large to handle. When dealing with source code, the times have long gone that a complete
application was written in a single file. Since the 1980s every self-respecting programming language has supported some kind of modularization.
It is our strong conviction that this approach should also be taken when dealing with models.`),Y=d(),D=r("h2"),he=a("Introducing Model Units"),Z=d(),u=r("p"),ge=a(`Similar to how the source code for a single application is split into classes and/or modules, every model in Freon is split
into `),N=r("strong"),_e=a("model units"),ve=a(`. Each model may contain units of multiple types, either an array of units, or a single unit. The next example
shows how to define model units. Here,
an `),O=r("em"),we=a("InsuranceModel"),be=a(" consists of a list of "),W=r("em"),ke=a("Parts"),ye=a(" and a list of "),G=r("em"),Ee=a("Products"),Me=a("."),ee=d(),T=r("pre"),te=d(),B=r("p"),$e=a(`The notion of model units has been around for some time. Actually, we have
published a number of papers on the topic.`),ne=d(),_=r("ul"),b=r("li"),xe=a("At "),z=r("em"),Se=a("Eclipse Summit 2008 Modeling Symposium"),Te=a(" model units were introduced in "),q=r("em"),Pe=a(`Big Models
an Alternative Approach`),Ae=a("."),Ie=d(),P=r("li"),Fe=a(`Earlier, model units were described under the term \u2018Partial Models\u2019 at the ECMDA-FA 2007 conference
in a paper called `),j=r("em"),Le=a("Building a Flexible Software Factory Using Partial Domain Specific Models"),De=a("."),Be=d(),A=r("li"),Re=a("More recently model units have been used within the "),I=r("a"),Ue=a("Mendix"),He=a(` meta-model to allow for working with large models
in their web based modeling tools. This work was presented at Splash 2016 in _Making Mendix Meta Model Driven_.`),ae=d(),F=r("h2"),J=r("a"),Ce=a(" Model Unit Interfaces"),oe=d(),y=r("p"),Ne=a("Another essential idea that we borrow from programming is "),K=r("strong"),Oe=a("information hiding"),We=a(`.
Every model unit in Freon defines an interface.
The interface determines which elements from the model unit are visible (i.e. can be referred to)
in other units in the same model.`),se=d(),f=r("p"),Ge=a("In a Freon definition of the language structure (the "),R=r("a"),ze=a(".ast file"),qe=a(`)
concepts and properties can be defined to be `),Q=r("strong"),je=a("private"),Je=a(`.
Whereas other parts of a model unit can be referenced from another model unit,i.e. the `),V=r("strong"),Ke=a("public"),Qe=a(` parts, private parts can only be referenced from
the same model unit.
The default scoper (the one from the `),U=r("a"),Ve=a("default level"),Xe=a(`)
already takes
the difference between public and private concepts and properties into account when resolving references.`),ie=d(),dt(E.$$.fragment),re=d(),dt(M.$$.fragment),this.h()},l(e){i=l(e,"H1",{});var s=p(i);c=o(s,"Models Often Become Too Large"),s.forEach(n),g=h(e),k=l(e,"P",{});var L=p(k);ue=o(L,"Contrary to what is common in the world of "),S=l(L,"A",{href:!0,target:!0});var X=p(S);fe=o(X,"Domain Specific Languages (DSLs)"),X.forEach(n),de=o(L,`
we believe that a model
is often too large to handle. When dealing with source code, the times have long gone that a complete
application was written in a single file. Since the 1980s every self-respecting programming language has supported some kind of modularization.
It is our strong conviction that this approach should also be taken when dealing with models.`),L.forEach(n),Y=h(e),D=l(e,"H2",{});var Ze=p(D);he=o(Ze,"Introducing Model Units"),Ze.forEach(n),Z=h(e),u=l(e,"P",{});var v=p(u);ge=o(v,`Similar to how the source code for a single application is split into classes and/or modules, every model in Freon is split
into `),N=l(v,"STRONG",{});var et=p(N);_e=o(et,"model units"),et.forEach(n),ve=o(v,`. Each model may contain units of multiple types, either an array of units, or a single unit. The next example
shows how to define model units. Here,
an `),O=l(v,"EM",{});var tt=p(O);we=o(tt,"InsuranceModel"),tt.forEach(n),be=o(v," consists of a list of "),W=l(v,"EM",{});var nt=p(W);ke=o(nt,"Parts"),nt.forEach(n),ye=o(v," and a list of "),G=l(v,"EM",{});var at=p(G);Ee=o(at,"Products"),at.forEach(n),Me=o(v,"."),v.forEach(n),ee=h(e),T=l(e,"PRE",{class:!0});var yt=p(T);yt.forEach(n),te=h(e),B=l(e,"P",{});var ot=p(B);$e=o(ot,`The notion of model units has been around for some time. Actually, we have
published a number of papers on the topic.`),ot.forEach(n),ne=h(e),_=l(e,"UL",{});var H=p(_);b=l(H,"LI",{});var C=p(b);xe=o(C,"At "),z=l(C,"EM",{});var st=p(z);Se=o(st,"Eclipse Summit 2008 Modeling Symposium"),st.forEach(n),Te=o(C," model units were introduced in "),q=l(C,"EM",{});var it=p(q);Pe=o(it,`Big Models
an Alternative Approach`),it.forEach(n),Ae=o(C,"."),C.forEach(n),Ie=h(H),P=l(H,"LI",{});var pe=p(P);Fe=o(pe,`Earlier, model units were described under the term \u2018Partial Models\u2019 at the ECMDA-FA 2007 conference
in a paper called `),j=l(pe,"EM",{});var rt=p(j);Le=o(rt,"Building a Flexible Software Factory Using Partial Domain Specific Models"),rt.forEach(n),De=o(pe,"."),pe.forEach(n),Be=h(H),A=l(H,"LI",{});var ce=p(A);Re=o(ce,"More recently model units have been used within the "),I=l(ce,"A",{href:!0,target:!0});var lt=p(I);Ue=o(lt,"Mendix"),lt.forEach(n),He=o(ce,` meta-model to allow for working with large models
in their web based modeling tools. This work was presented at Splash 2016 in _Making Mendix Meta Model Driven_.`),ce.forEach(n),H.forEach(n),ae=h(e),F=l(e,"H2",{});var Ye=p(F);J=l(Ye,"A",{name:!0}),p(J).forEach(n),Ce=o(Ye," Model Unit Interfaces"),Ye.forEach(n),oe=h(e),y=l(e,"P",{});var me=p(y);Ne=o(me,"Another essential idea that we borrow from programming is "),K=l(me,"STRONG",{});var pt=p(K);Oe=o(pt,"information hiding"),pt.forEach(n),We=o(me,`.
Every model unit in Freon defines an interface.
The interface determines which elements from the model unit are visible (i.e. can be referred to)
in other units in the same model.`),me.forEach(n),se=h(e),f=l(e,"P",{});var w=p(f);Ge=o(w,"In a Freon definition of the language structure (the "),R=l(w,"A",{href:!0});var ct=p(R);ze=o(ct,".ast file"),ct.forEach(n),qe=o(w,`)
concepts and properties can be defined to be `),Q=l(w,"STRONG",{});var mt=p(Q);je=o(mt,"private"),mt.forEach(n),Je=o(w,`.
Whereas other parts of a model unit can be referenced from another model unit,i.e. the `),V=l(w,"STRONG",{});var ut=p(V);Ke=o(ut,"public"),ut.forEach(n),Qe=o(w,` parts, private parts can only be referenced from
the same model unit.
The default scoper (the one from the `),U=l(w,"A",{href:!0});var ft=p(U);Ve=o(ft,"default level"),ft.forEach(n),Xe=o(w,`)
already takes
the difference between public and private concepts and properties into account when resolving references.`),w.forEach(n),ie=h(e),ht(E.$$.fragment,e),re=h(e),ht(M.$$.fragment,e),this.h()},h(){$(S,"href","https://en.wikipedia.org/wiki/Domain-specific*language"),$(S,"target","_blank"),$(T,"class","language-ts"),$(I,"href","https://www.mendix.com/"),$(I,"target","_blank"),$(J,"name","public"),$(R,"href","/010_Intro/040_A_Language_in_Five_Parts"),$(U,"href","/010_Intro/050_Three_Levels_of_Customization#level1")},m(e,s){m(e,i,s),t(i,c),m(e,g,s),m(e,k,s),t(k,ue),t(k,S),t(S,fe),t(k,de),m(e,Y,s),m(e,D,s),t(D,he),m(e,Z,s),m(e,u,s),t(u,ge),t(u,N),t(N,_e),t(u,ve),t(u,O),t(O,we),t(u,be),t(u,W),t(W,ke),t(u,ye),t(u,G),t(G,Ee),t(u,Me),m(e,ee,s),m(e,T,s),T.innerHTML=kt,m(e,te,s),m(e,B,s),t(B,$e),m(e,ne,s),m(e,_,s),t(_,b),t(b,xe),t(b,z),t(z,Se),t(b,Te),t(b,q),t(q,Pe),t(b,Ae),t(_,Ie),t(_,P),t(P,Fe),t(P,j),t(j,Le),t(P,De),t(_,Be),t(_,A),t(A,Re),t(A,I),t(I,Ue),t(A,He),m(e,ae,s),m(e,F,s),t(F,J),t(F,Ce),m(e,oe,s),m(e,y,s),t(y,Ne),t(y,K),t(K,Oe),t(y,We),m(e,se,s),m(e,f,s),t(f,Ge),t(f,R),t(R,ze),t(f,qe),t(f,Q),t(Q,je),t(f,Je),t(f,V),t(V,Ke),t(f,Qe),t(f,U),t(U,Ve),t(f,Xe),m(e,ie,s),gt(E,e,s),m(e,re,s),gt(M,e,s),le=!0},p(e,[s]){const L={};s&1&&(L.$$scope={dirty:s,ctx:e}),E.$set(L);const X={};s&1&&(X.$$scope={dirty:s,ctx:e}),M.$set(X)},i(e){le||(_t(E.$$.fragment,e),_t(M.$$.fragment,e),le=!0)},o(e){vt(E.$$.fragment,e),vt(M.$$.fragment,e),le=!1},d(e){e&&n(i),e&&n(g),e&&n(k),e&&n(Y),e&&n(D),e&&n(Z),e&&n(u),e&&n(ee),e&&n(T),e&&n(te),e&&n(B),e&&n(ne),e&&n(_),e&&n(ae),e&&n(F),e&&n(oe),e&&n(y),e&&n(se),e&&n(f),e&&n(ie),wt(E,e),e&&n(re),wt(M,e)}}}class Dt extends Et{constructor(i){super();Mt(this,i,null,At,$t,{})}}export{Dt as default};
