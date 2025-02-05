import{s as Fe,A as Ce,a as g,e as y,H as ge,f as w,b as h,m as B,d as q,F as we,g as o,h as d,i as f,B as Ee,r as Oe,w as be,v as es,t as re,o as ie,j as C,C as ss,D as je,E as O,q as We,p as Ke}from"../chunks/scheduler.Cra-n4xf.js";import{S as Ye,i as Ve,e as xe,c as J,a as Q,m as X,t as Z,b as ee,d as se}from"../chunks/index.Bm95Nbrf.js";import{e as ve}from"../chunks/stores.DIt-NjBs.js";import{w as ns}from"../chunks/index.B9cI0ado.js";import{P as Ne,S as qe,c as as,B as ts}from"../chunks/index.NO_ZQ_dD.js";const oe=ns([]);function ls(t){let s;return{c(){s=re("Generic Types: an Example Typer Definition")},l(n){s=ie(n,"Generic Types: an Example Typer Definition")},m(n,a){f(n,s,a)},d(n){n&&o(s)}}}function ps(t){let s;return{c(){s=re("The Typer Definition of the Example Language")},l(n){s=ie(n,"The Typer Definition of the Example Language")},m(n,a){f(n,s,a)},d(n){n&&o(s)}}}function os(t){let s;return{c(){s=re("The Complete Typer Definition")},l(n){s=ie(n,"The Complete Typer Definition")},m(n,a){f(n,s,a)},d(n){n&&o(s)}}}function cs(t){let s,n,a,p,i,k,l="This example shows how generic types and unit of measurements can be defined.",c,u,L,b,E,G=`Once the structure of the example language is defined, we are able to focus on the typer definition. Because types in Freon do not reside
	within the AST, but are completely separate from it, we need to associate a type concept with each of our AST concepts.`,S,D,ne="The Type Concepts",M,P,ae=`First, we define a type concept that corresponds with our type declaration called <em>GenericType</em>, and one that corresponds with
	<em>UnitOfMeasurement</em>. They are quite similar to their AST counterparts, but note that here we use <strong>FreType</strong> as type for
	the property. We want to build a structure of type concepts, not of AST nodes!`,j,H,I,A=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type#L6-L14
</span>
<span class="token keyword">type</span> <span class="token class-name">TT_GenericType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;

<span class="token keyword">type</span> <span class="token class-name">TT_MeasurementType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    unit: <span class="token class-name">UnitKind</span>;
&#125;</code>`,v,x,$="The Infertype Rules",m,_,T=`Next, we associate the AST nodes with the type concepts, using infertype rules. When invoked, these rules will create a new instance of
	the type concepts.`,U,N,W,ce=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type#L34-L46
</span>
<span class="token class-name">GenericType</span> &#123;
    <span class="token keyword">infertype</span> <span class="token class-name">TT_GenericType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.baseType),
        kind: <span class="token class-name">self</span>.kind
    &#125;;
&#125;

<span class="token class-name">UnitOfMeasurement</span> &#123;
    <span class="token keyword">infertype</span> <span class="token class-name">TT_MeasurementType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.baseType),
        unit: <span class="token class-name">self</span>.unit
    &#125;;
&#125;</code>`,me,F,Le="The Conforms And Equals Rules",fe,K,Ge=`To be able to compare the types of expressions and of type declarations, we need to state the <em>equalsto</em> and/or <em>conformsto</em>
	rules.`,ke,Y,ue,ze=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type#L91-L118
</span>
<span class="token class-name">TT_GenericType</span> &#123;
    <span class="token keyword">equalsto</span> x:<span class="token class-name">TT_GenericType</span> <span class="token class-name">where</span> &#123;
            x.<span class="token keyword">base</span> <span class="token keyword">equalsto</span> <span class="token variable">self</span>.<span class="token keyword">base</span>;
            x.kind <span class="token keyword">equalsto</span> <span class="token variable">self</span>.kind;
        &#125;;
    <span class="token keyword">conformsto</span> other:<span class="token class-name">TT_GenericType</span> <span class="token class-name">where</span> &#123;
            <span class="token comment">// both conditions must be true
</span>            <span class="token variable">self</span>.<span class="token keyword">base</span> <span class="token keyword">conformsto</span> other.<span class="token keyword">base</span>;
            <span class="token variable">self</span>.kind <span class="token keyword">conformsto</span> other.kind;
        &#125;;
&#125;

<span class="token class-name">GenericKind</span> &#123;
    Set <span class="token keyword">conformsto</span> Collection;
    Sequence <span class="token keyword">conformsto</span> Collection;
    Bag <span class="token keyword">conformsto</span> Collection;
&#125;

<span class="token class-name">TT_MeasurementType</span> &#123;
    <span class="token keyword">equalsto</span> aap:<span class="token class-name">TT_MeasurementType</span> <span class="token class-name">where</span> &#123;
            aap.<span class="token keyword">base</span> <span class="token keyword">equalsto</span> <span class="token variable">self</span>.<span class="token keyword">base</span>;
            aap.unit <span class="token keyword">equalsto</span> <span class="token variable">self</span>.unit;
        &#125;;
    <span class="token keyword">conformsto</span> rr:<span class="token class-name">TT_MeasurementType</span> <span class="token class-name">where</span> &#123;
            <span class="token variable">self</span>.<span class="token keyword">base</span> <span class="token keyword">conformsto</span> rr.<span class="token keyword">base</span>;
            <span class="token variable">self</span>.unit <span class="token keyword">equalsto</span> rr.unit;
        &#125;;
&#125;</code>`,de,R,$e,ye,V,he,Je=`<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type
</span>
typer

<span class="token comment">// What are types?
</span><span class="token class-name">istype</span> &#123; TopType &#125;

<span class="token keyword">type</span> <span class="token class-name">TT_GenericType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;

<span class="token keyword">type</span> <span class="token class-name">TT_MeasurementType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    unit: <span class="token class-name">UnitKind</span>;
&#125;

<span class="token comment">// Which concepts have a type?
</span><span class="token class-name">hastype</span> &#123; Exp, TypeUsage &#125;

<span class="token comment">// What are the top and bottom types?
</span><span class="token class-name">anytype</span> &#123;
    <span class="token keyword">conformsto</span> PredefinedType:<span class="token class-name">ANY</span>; <span class="token comment">// PredefinedType:ANY is the least specific type
</span>&#125;

<span class="token class-name">PredefinedType</span> &#123;
    PredefinedType:<span class="token class-name">NULL</span> <span class="token keyword">conformsto</span> anytype; <span class="token comment">// PredefinedType:NULL is the most specific type
</span>    NUMBER <span class="token keyword">conformsto</span> STRING;
&#125;

<span class="token comment">// Which type does an expression have?
</span><span class="token class-name">TypeRef</span> &#123;
    <span class="token keyword">infertype</span> <span class="token variable">self</span>.<span class="token keyword">type</span>;
&#125;

<span class="token class-name">GenericType</span> &#123;
    <span class="token keyword">infertype</span> <span class="token class-name">TT_GenericType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.baseType),
        kind: <span class="token class-name">self</span>.kind
    &#125;;
&#125;

<span class="token class-name">UnitOfMeasurement</span> &#123;
    <span class="token keyword">infertype</span> <span class="token class-name">TT_MeasurementType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.baseType),
        unit: <span class="token class-name">self</span>.unit
    &#125;;
&#125;

<span class="token class-name">NumberLiteral</span> &#123;
    <span class="token keyword">infertype</span> PredefinedType:<span class="token class-name">NUMBER</span>;
&#125;

<span class="token class-name">StringLiteral</span> &#123;
    <span class="token keyword">infertype</span> PredefinedType:<span class="token class-name">STRING</span>;
&#125;

<span class="token class-name">BooleanLiteral</span> &#123;
    <span class="token keyword">infertype</span> PredefinedType:<span class="token class-name">BOOLEAN</span>;
&#125;

<span class="token class-name">NamedExp</span> &#123;
    <span class="token keyword">infertype</span> <span class="token variable">self</span>.myType;
&#125;

<span class="token class-name">PlusExp</span> &#123;
    <span class="token keyword">infertype</span> commonSuperType(<span class="token variable">self</span>.left, <span class="token variable">self</span>.right);
&#125;

<span class="token class-name">UnitLiteral</span> &#123;
    <span class="token comment">// 62 kilogram, or 112 miles
</span>    <span class="token keyword">infertype</span> <span class="token class-name">TT_MeasurementType</span> &#123;
                  <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.inner),
                  unit: <span class="token class-name">self</span>.unit
              &#125;;
&#125;

<span class="token class-name">GenericLiteral</span> &#123;
    <span class="token comment">// Set&#123; 12, 14, 16, 18 &#125;
</span>    <span class="token keyword">infertype</span> <span class="token class-name">TT_GenericType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.content),
        kind: <span class="token class-name">self</span>.kind
    &#125;;
&#125;

<span class="token comment">// Which types are 'equal' to each other?
</span><span class="token class-name">NamedType</span> &#123;
    <span class="token keyword">equalsto</span> aa:<span class="token class-name">NamedType</span> <span class="token class-name">where</span> &#123;
            aa.name <span class="token keyword">equalsto</span> <span class="token variable">self</span>.name;
        &#125;;
&#125;

<span class="token class-name">TT_GenericType</span> &#123;
    <span class="token keyword">equalsto</span> x:<span class="token class-name">TT_GenericType</span> <span class="token class-name">where</span> &#123;
            x.<span class="token keyword">base</span> <span class="token keyword">equalsto</span> <span class="token variable">self</span>.<span class="token keyword">base</span>;
            x.kind <span class="token keyword">equalsto</span> <span class="token variable">self</span>.kind;
        &#125;;
    <span class="token keyword">conformsto</span> other:<span class="token class-name">TT_GenericType</span> <span class="token class-name">where</span> &#123;
            <span class="token comment">// both conditions must be true
</span>            <span class="token variable">self</span>.<span class="token keyword">base</span> <span class="token keyword">conformsto</span> other.<span class="token keyword">base</span>;
            <span class="token variable">self</span>.kind <span class="token keyword">conformsto</span> other.kind;
        &#125;;
&#125;

<span class="token class-name">GenericKind</span> &#123;
    Set <span class="token keyword">conformsto</span> Collection;
    Sequence <span class="token keyword">conformsto</span> Collection;
    Bag <span class="token keyword">conformsto</span> Collection;
&#125;

<span class="token class-name">TT_MeasurementType</span> &#123;
    <span class="token keyword">equalsto</span> aap:<span class="token class-name">TT_MeasurementType</span> <span class="token class-name">where</span> &#123;
            aap.<span class="token keyword">base</span> <span class="token keyword">equalsto</span> <span class="token variable">self</span>.<span class="token keyword">base</span>;
            aap.unit <span class="token keyword">equalsto</span> <span class="token variable">self</span>.unit;
        &#125;;
    <span class="token keyword">conformsto</span> rr:<span class="token class-name">TT_MeasurementType</span> <span class="token class-name">where</span> &#123;
            <span class="token variable">self</span>.<span class="token keyword">base</span> <span class="token keyword">conformsto</span> rr.<span class="token keyword">base</span>;
            <span class="token variable">self</span>.unit <span class="token keyword">equalsto</span> rr.unit;
        &#125;;
&#125;
</code>`,_e,z,Te;s=new Ne({props:{prevLink:De,nextLink:Ae}});function Qe(e){t[1](e)}let Se={tag:"h1",id:"generic-types-an-example-typer-definition-1",$$slots:{default:[ls]},$$scope:{ctx:t}};t[0][0]!==void 0&&(Se.intersecting=t[0][0]),a=new qe({props:Se}),Ce.push(()=>xe(a,"intersecting",Qe));function Xe(e){t[2](e)}let Me={tag:"h2",id:"the-typer-definition-of-the-example-language-2",$$slots:{default:[ps]},$$scope:{ctx:t}};t[0][1]!==void 0&&(Me.intersecting=t[0][1]),u=new qe({props:Me}),Ce.push(()=>xe(u,"intersecting",Xe));function Ze(e){t[3](e)}let Pe={tag:"h2",id:"the-complete-typer-definition-3",$$slots:{default:[os]},$$scope:{ctx:t}};return t[0][2]!==void 0&&(Pe.intersecting=t[0][2]),R=new qe({props:Pe}),Ce.push(()=>xe(R,"intersecting",Ze)),z=new Ne({props:{prevLink:De,nextLink:Ae}}),{c(){J(s.$$.fragment),n=g(),J(a.$$.fragment),i=g(),k=y("p"),k.textContent=l,c=g(),J(u.$$.fragment),b=g(),E=y("p"),E.textContent=G,S=g(),D=y("h3"),D.textContent=ne,M=g(),P=y("p"),P.innerHTML=ae,j=g(),H=y("pre"),I=new ge(!1),v=g(),x=y("h3"),x.textContent=$,m=g(),_=y("p"),_.textContent=T,U=g(),N=y("pre"),W=new ge(!1),me=g(),F=y("h3"),F.textContent=Le,fe=g(),K=y("p"),K.innerHTML=Ge,ke=g(),Y=y("pre"),ue=new ge(!1),de=g(),J(R.$$.fragment),ye=g(),V=y("pre"),he=new ge(!1),_e=g(),J(z.$$.fragment),this.h()},l(e){Q(s.$$.fragment,e),n=w(e),Q(a.$$.fragment,e),i=w(e),k=h(e,"P",{"data-svelte-h":!0}),B(k)!=="svelte-cwuyx9"&&(k.textContent=l),c=w(e),Q(u.$$.fragment,e),b=w(e),E=h(e,"P",{"data-svelte-h":!0}),B(E)!=="svelte-bxa8um"&&(E.textContent=G),S=w(e),D=h(e,"H3",{id:!0,"data-svelte-h":!0}),B(D)!=="svelte-gw4fr0"&&(D.textContent=ne),M=w(e),P=h(e,"P",{"data-svelte-h":!0}),B(P)!=="svelte-1mbpbi8"&&(P.innerHTML=ae),j=w(e),H=h(e,"PRE",{class:!0});var r=q(H);I=we(r,!1),r.forEach(o),v=w(e),x=h(e,"H3",{id:!0,"data-svelte-h":!0}),B(x)!=="svelte-pe6gm9"&&(x.textContent=$),m=w(e),_=h(e,"P",{"data-svelte-h":!0}),B(_)!=="svelte-1tnj4rn"&&(_.textContent=T),U=w(e),N=h(e,"PRE",{class:!0});var te=q(N);W=we(te,!1),te.forEach(o),me=w(e),F=h(e,"H3",{id:!0,"data-svelte-h":!0}),B(F)!=="svelte-d6bym2"&&(F.textContent=Le),fe=w(e),K=h(e,"P",{"data-svelte-h":!0}),B(K)!=="svelte-ozjp82"&&(K.innerHTML=Ge),ke=w(e),Y=h(e,"PRE",{class:!0});var le=q(Y);ue=we(le,!1),le.forEach(o),de=w(e),Q(R.$$.fragment,e),ye=w(e),V=h(e,"PRE",{class:!0});var pe=q(V);he=we(pe,!1),pe.forEach(o),_e=w(e),Q(z.$$.fragment,e),this.h()},h(){d(D,"id","the-type-concepts-1"),I.a=null,d(H,"class","language-freon"),d(x,"id","the-infertype-rules-2"),W.a=null,d(N,"class","language-freon"),d(F,"id","the-conforms-and-equals-rules-3"),ue.a=null,d(Y,"class","language-freon"),he.a=null,d(V,"class","language-freon")},m(e,r){X(s,e,r),f(e,n,r),X(a,e,r),f(e,i,r),f(e,k,r),f(e,c,r),X(u,e,r),f(e,b,r),f(e,E,r),f(e,S,r),f(e,D,r),f(e,M,r),f(e,P,r),f(e,j,r),f(e,H,r),I.m(A,H),f(e,v,r),f(e,x,r),f(e,m,r),f(e,_,r),f(e,U,r),f(e,N,r),W.m(ce,N),f(e,me,r),f(e,F,r),f(e,fe,r),f(e,K,r),f(e,ke,r),f(e,Y,r),ue.m(ze,Y),f(e,de,r),X(R,e,r),f(e,ye,r),f(e,V,r),he.m(Je,V),f(e,_e,r),X(z,e,r),Te=!0},p(e,[r]){const te={};r&32&&(te.$$scope={dirty:r,ctx:e}),!p&&r&1&&(p=!0,te.intersecting=e[0][0],Ee(()=>p=!1)),a.$set(te);const le={};r&32&&(le.$$scope={dirty:r,ctx:e}),!L&&r&1&&(L=!0,le.intersecting=e[0][1],Ee(()=>L=!1)),u.$set(le);const pe={};r&32&&(pe.$$scope={dirty:r,ctx:e}),!$e&&r&1&&($e=!0,pe.intersecting=e[0][2],Ee(()=>$e=!1)),R.$set(pe)},i(e){Te||(Z(s.$$.fragment,e),Z(a.$$.fragment,e),Z(u.$$.fragment,e),Z(R.$$.fragment,e),Z(z.$$.fragment,e),Te=!0)},o(e){ee(s.$$.fragment,e),ee(a.$$.fragment,e),ee(u.$$.fragment,e),ee(R.$$.fragment,e),ee(z.$$.fragment,e),Te=!1},d(e){e&&(o(n),o(i),o(k),o(c),o(b),o(E),o(S),o(D),o(M),o(P),o(j),o(H),o(v),o(x),o(m),o(_),o(U),o(N),o(me),o(F),o(fe),o(K),o(ke),o(Y),o(de),o(ye),o(V),o(_e)),se(s,e),se(a,e),se(u,e),se(R,e),se(z,e)}}}let De="/Examples/Generic_Types/The_TyperExample_DSL",Ae="/Examples/External_Components";function rs(t,s,n){let a;Oe(t,oe,c=>n(4,a=c)),be(oe,a=[{title:"Generic Types: an Example Typer Definition",visible:!1,ref:"#generic-types-an-example-typer-definition-1"},{title:"The Typer Definition of the Example Language",visible:!1,ref:"#the-typer-definition-of-the-example-language-2"},{title:"The Complete Typer Definition",visible:!1,ref:"#the-complete-typer-definition-3"}],a);let p=[];es(()=>{document.querySelectorAll("pre").forEach(u=>{const L=document.createElement("div");L.className="copy-prompt";const b=document.createElement("p");b.innerHTML="👆 Click to copy",b.className="copy-prompt-p";const E=document.createElement("img");E.src="/icons/copy-icon.svg",E.className="copy-prompt-img",L.appendChild(E),L.appendChild(b),u.appendChild(L),u.querySelector(".copy-prompt > p").addEventListener("click",G=>{as(u.querySelector("code").textContent),u.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{u.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function i(c){t.$$.not_equal(p[0],c)&&(p[0]=c,n(0,p))}function k(c){t.$$.not_equal(p[1],c)&&(p[1]=c,n(0,p))}function l(c){t.$$.not_equal(p[2],c)&&(p[2]=c,n(0,p))}return t.$$.update=()=>{t.$$.dirty&1&&be(oe,a[0].visible=p[0],a),t.$$.dirty&1&&be(oe,a[1].visible=p[1],a),t.$$.dirty&1&&be(oe,a[2].visible=p[2],a)},[p,i,k,l]}class is extends Ye{constructor(s){super(),Ve(this,s,rs,cs,Fe,{})}}function He(t,s,n){const a=t.slice();return a[6]=s[n],a[8]=n,a}function Ue(t,s,n){const a=t.slice();return a[6]=s[n],a[8]=n,a}function ms(t){let s,n;return{c(){s=y("img"),this.h()},l(a){s=h(a,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){d(s,"class","page-toc-small-img"),Ke(s.src,n="/icons/down-arrow.png")||d(s,"src",n),d(s,"alt","arrow down")},m(a,p){f(a,s,p)},d(a){a&&o(s)}}}function fs(t){let s,n;return{c(){s=y("img"),this.h()},l(a){s=h(a,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){d(s,"class","page-toc-small-img"),Ke(s.src,n="/icons/upload.png")||d(s,"src",n),d(s,"alt","arrow up")},m(a,p){f(a,s,p)},d(a){a&&o(s)}}}function Be(t){let s,n,a=ve(t[0]),p=[];for(let i=0;i<a.length;i+=1)p[i]=Ie(Ue(t,a,i));return{c(){s=y("div"),n=y("ul");for(let i=0;i<p.length;i+=1)p[i].c();this.h()},l(i){s=h(i,"DIV",{class:!0});var k=q(s);n=h(k,"UL",{class:!0});var l=q(n);for(let c=0;c<p.length;c+=1)p[c].l(l);l.forEach(o),k.forEach(o),this.h()},h(){d(n,"class","page-ul"),d(s,"class","toc-details")},m(i,k){f(i,s,k),C(s,n);for(let l=0;l<p.length;l+=1)p[l]&&p[l].m(n,null)},p(i,k){if(k&5){a=ve(i[0]);let l;for(l=0;l<a.length;l+=1){const c=Ue(i,a,l);p[l]?p[l].p(c,k):(p[l]=Ie(c),p[l].c(),p[l].m(n,null))}for(;l<p.length;l+=1)p[l].d(1);p.length=a.length}},d(i){i&&o(s),je(p,i)}}}function Ie(t){let s,n,a=t[6].title+"",p,i,k;return{c(){s=y("li"),n=y("a"),p=re(a),k=g(),this.h()},l(l){s=h(l,"LI",{class:!0});var c=q(s);n=h(c,"A",{href:!0});var u=q(n);p=ie(u,a),u.forEach(o),k=w(c),c.forEach(o),this.h()},h(){d(n,"href",i=t[6].ref),O(n,"page-visible",t[8]===t[2]),O(n,"page-nonvisible",t[8]!==t[2]),d(s,"class","page-toc-text")},m(l,c){f(l,s,c),C(s,n),C(n,p),C(s,k)},p(l,c){c&1&&a!==(a=l[6].title+"")&&We(p,a),c&1&&i!==(i=l[6].ref)&&d(n,"href",i),c&4&&O(n,"page-visible",l[8]===l[2]),c&4&&O(n,"page-nonvisible",l[8]!==l[2])},d(l){l&&o(s)}}}function Re(t){let s,n,a=t[6].title+"",p,i,k;return{c(){s=y("li"),n=y("a"),p=re(a),k=g(),this.h()},l(l){s=h(l,"LI",{class:!0});var c=q(s);n=h(c,"A",{href:!0});var u=q(n);p=ie(u,a),u.forEach(o),k=w(c),c.forEach(o),this.h()},h(){d(n,"href",i=t[6].ref),O(n,"page-visible",t[8]===t[2]),O(n,"page-nonvisible",t[8]!==t[2]),d(s,"class","page-toc-text")},m(l,c){f(l,s,c),C(s,n),C(n,p),C(s,k)},p(l,c){c&1&&a!==(a=l[6].title+"")&&We(p,a),c&1&&i!==(i=l[6].ref)&&d(n,"href",i),c&4&&O(n,"page-visible",l[8]===l[2]),c&4&&O(n,"page-nonvisible",l[8]!==l[2])},d(l){l&&o(s)}}}function ks(t){let s,n,a,p="On this page ...",i,k,l,c,u,L,b,E,G,S,D="On this page",ne,M,P,ae,j;function H(m,_){return m[1]?fs:ms}let I=H(t),A=I(t),v=t[1]&&Be(t);u=new ts({}),b=new is({});let x=ve(t[0]),$=[];for(let m=0;m<x.length;m+=1)$[m]=Re(He(t,x,m));return{c(){s=y("div"),n=y("div"),a=y("p"),a.textContent=p,i=g(),k=y("button"),A.c(),l=g(),v&&v.c(),c=g(),J(u.$$.fragment),L=g(),J(b.$$.fragment),E=g(),G=y("nav"),S=y("h3"),S.textContent=D,ne=g(),M=y("ul");for(let m=0;m<$.length;m+=1)$[m].c();this.h()},l(m){s=h(m,"DIV",{class:!0});var _=q(s);n=h(_,"DIV",{class:!0});var T=q(n);a=h(T,"P",{class:!0,"data-svelte-h":!0}),B(a)!=="svelte-1929lhs"&&(a.textContent=p),i=w(T),k=h(T,"BUTTON",{class:!0});var U=q(k);A.l(U),U.forEach(o),T.forEach(o),l=w(_),v&&v.l(_),c=w(_),Q(u.$$.fragment,_),L=w(_),Q(b.$$.fragment,_),_.forEach(o),E=w(m),G=h(m,"NAV",{class:!0});var N=q(G);S=h(N,"H3",{class:!0,"data-svelte-h":!0}),B(S)!=="svelte-1hgt7fi"&&(S.textContent=D),ne=w(N),M=h(N,"UL",{class:!0});var W=q(M);for(let ce=0;ce<$.length;ce+=1)$[ce].l(W);W.forEach(o),N.forEach(o),this.h()},h(){d(a,"class","page-toc-small-title"),d(k,"class","page-toc-small-expand-button"),d(n,"class","page-toc-small"),d(s,"class","page-main"),d(S,"class","page-toc-title"),d(M,"class","page-ul"),d(G,"class","page-toc")},m(m,_){f(m,s,_),C(s,n),C(n,a),C(n,i),C(n,k),A.m(k,null),C(s,l),v&&v.m(s,null),C(s,c),X(u,s,null),C(s,L),X(b,s,null),f(m,E,_),f(m,G,_),C(G,S),C(G,ne),C(G,M);for(let T=0;T<$.length;T+=1)$[T]&&$[T].m(M,null);P=!0,ae||(j=ss(k,"click",t[4]),ae=!0)},p(m,[_]){if(I!==(I=H(m))&&(A.d(1),A=I(m),A&&(A.c(),A.m(k,null))),m[1]?v?v.p(m,_):(v=Be(m),v.c(),v.m(s,c)):v&&(v.d(1),v=null),_&5){x=ve(m[0]);let T;for(T=0;T<x.length;T+=1){const U=He(m,x,T);$[T]?$[T].p(U,_):($[T]=Re(U),$[T].c(),$[T].m(M,null))}for(;T<$.length;T+=1)$[T].d(1);$.length=x.length}},i(m){P||(Z(u.$$.fragment,m),Z(b.$$.fragment,m),P=!0)},o(m){ee(u.$$.fragment,m),ee(b.$$.fragment,m),P=!1},d(m){m&&(o(s),o(E),o(G)),A.d(),v&&v.d(),se(u),se(b),je($,m),ae=!1,j()}}}function us(t,s,n){let a,p;Oe(t,oe,u=>n(0,p=u));let i=!1;function k(u){let L=a;for(let b=0;b<u.length;b++)if(u[b].visible)return b;return L}function l(){n(1,i=!i)}const c=()=>{l()};return t.$$.update=()=>{t.$$.dirty&1&&n(2,a=k(p))},[p,i,a,l,c]}class gs extends Ye{constructor(s){super(),Ve(this,s,us,ks,Fe,{})}}export{gs as component};
//# sourceMappingURL=75.BLh64T9X.js.map
