import{s as Ht,A as we,a as h,e as d,H as Vt,f as g,b as _,m as y,d as D,F as Gt,g as o,h as C,i as r,B as $e,v as xt,x as ve,w as Kt,t as Y,o as Z,j as P,C as Wt,D as St,E as X,q as At,p as qt}from"../chunks/scheduler.CIEH-92L.js";import{S as Bt,i as Dt,e as ke,c as O,a as U,m as j,t as N,b as R,d as V}from"../chunks/index.HLF2pGCU.js";import{e as We}from"../chunks/each.BLebZWAa.js";import{w as zt}from"../chunks/index.bxqR-5-s.js";import{P as kt,S as ye,c as Qt,B as Jt}from"../chunks/index.yTjXiNmY.js";const Q=zt([]);function Xt(l){let t;return{c(){t=Y("A Bit of Background")},l(n){t=Z(n,"A Bit of Background")},m(n,i){r(n,t,i)},d(n){n&&o(t)}}}function Yt(l){let t;return{c(){t=Y("Design Philosophy")},l(n){t=Z(n,"Design Philosophy")},m(n,i){r(n,t,i)},d(n){n&&o(t)}}}function Zt(l){let t;return{c(){t=Y("A Minimal Viable Product")},l(n){t=Z(n,"A Minimal Viable Product")},m(n,i){r(n,t,i)},d(n){n&&o(t)}}}function en(l){let t;return{c(){t=Y("Name-Based References")},l(n){t=Z(n,"Name-Based References")},m(n,i){r(n,t,i)},d(n){n&&o(t)}}}function tn(l){let t;return{c(){t=Y("Model Units or Partitions")},l(n){t=Z(n,"Model Units or Partitions")},m(n,i){r(n,t,i)},d(n){n&&o(t)}}}function nn(l){let t;return{c(){t=Y("Other Guidelines")},l(n){t=Z(n,"Other Guidelines")},m(n,i){r(n,t,i)},d(n){n&&o(t)}}}function sn(l){let t,n,i,a,p,v,c=`It took a few years to create Freon, but more importantly it took a lot of experience: experience with building software in general,
	experience with creating languages like UML and OCL, experience with creating a large number of DSLs, experience with the tools available
	for building DSLs. In short, Freon is the result of a lifetime of experience, and with that, the lessons learned.`,u,b,F="A few of these lessons are explained below to give you an insight in the motives and guiding principles behind Freon.",m,M,T,E,H,ee=`The design philosophy that we follow in Freon can best be described by the following quote from the well-known graphical user interface
	designer Alan Kay.`,A,q,be=`<p><em>Simple things should be simple, complex things should be possible.</em>
		(<a href="https://en.wikipedia.org/wiki/Alan_Kay" target="_blank">Alan Kay, Turing Award Winner</a>)</p>`,te,B,J,x,$,G=`Freon is a minimal viable product which supports the language engineer in creating a work environment for a mini-language. A key principle
	is the <a href="https://en.wikipedia.org/wiki/Pareto*principle" target="_blank">Pareto principle</a>
	(or 80%-20% rule), which states that for many events, roughly 80% of the effects come from 20% of the causes. For example, it is an axiom of
	business management that “80% of sales come from 20% of clients”.`,k,f,L=`In software development the Pareto principle translates to “<em>80% of the development effort is spent on 20% of the application</em>”,
	this 20% being the more complex parts. Still, the other 80% of the application needs to be created as well.`,w,S,ne=`Freon aims to make the latter <strong>as simple as possible</strong>, while keeping the generated code <strong>open</strong> for the language
	engineer to code the more complex parts by hand. One of our use cases is the creation of a prototype language in a day or in a couple of days
	at most.`,ie,I,it=`Let’s get the 20% down to say about 1% to 5%. That either leaves you with 15% extra free time to spend on your hobbies (fun!), or with
	extra time to tackle the difficult bits of your application (fulfilling!).`,Ce,K,ze,Me,se,st=`In <a href="/Background/Projectional_Editing#expressions">Support for Expressions</a> we explain that editing expressions is a known
	challenge for projectional editors. A second challenge is posed by <em>references</em>, which is stated in
	<a href="https://www.voelter.de/data/pub/fse2016-projEditing.pdf" target="_blank">Efficiency of Projectional Editing: A Controlled Experiment</a> as follows.`,Le,Te,Pe,le,lt=`<p><strong>References.</strong>
		References are based on pointers to the targetnode’s ID. Despite some advantages (e.g., robust refactorings) of this approach, we observe
		problems with the tradeoff that the reference target has to exist at the time the reference is created. A more robust and intuitive handling
		of references is desirable. While some problems can be solved by language developers (e.g., quick fixes to create reference targets), there
		should be a better way to support references by the IDE itself.</p> <p>[Markus Voelter a.o., Efficiency of Projectional Editing]</p>`,Ee,He,xe,oe,ot=`This is the reason that in Freon we allow only name-based references, which are resolved on a need-to basis. Every reference is an
	instance of the class <code>FreNodeReference</code>, which holds:`,Se,ae,at="<li>the name or path (i.e. a list of names) of the referred element</li> <li>the meta-type of the referred element</li> <li>a cache of the element itself</li>",Ae,re,rt=`This means that the AST is truly a tree, not a graph. One advantage is that we are not obliged to have the complete model in memory. Our
	use of multi-file models is explained in the next section.`,qe,W,Qe,Be,ce,ct=`Contrary to what is common in the world of <a href="https://en.wikipedia.org/wiki/Domain-specific*language" target="_blank">Domain Specific Languages (DSLs)</a>
	we believe that a model is often too large to handle. When dealing with source code, the times have long gone that a complete application was
	written in a single file. Since the 1980s every self-respecting programming language has supported some kind of modularization. It is our strong
	conviction that this approach should also be taken when dealing with models.`,De,pe,pt=`Similar to how the source code for a single application is split into classes and/or modules, every model in Freon is split into <strong>model units</strong>. Each model may contain units of multiple types, either an array of units, or a single unit. The next example shows how to define model
	units. Here, an <em>InsuranceModel</em> consists of a list of <em>Parts</em> and a list of <em>Products</em>.`,Ie,fe,Fe,It=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L7-L20
</span>
<span class="token keyword">model</span> <span class="token class-name">InsuranceModel</span> &#123;
    parts: <span class="token class-name">Part</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;              <span class="token comment">// units that hold partial definitions of insurance products
</span>    products: <span class="token class-name">Product</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;        <span class="token comment">// units that hold sellable insurance products
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Part</span> &#123;
    part: <span class="token class-name">BaseProduct</span>;          <span class="token comment">// one collection of partial insurance products
</span>    file-extension = <span class="token string">"base"</span>;    <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Product</span> &#123;
    product: <span class="token class-name">InsuranceProduct</span>;  <span class="token comment">// one collection of sellable insurance products
</span>    file-extension = <span class="token string">"prod"</span>;    <span class="token comment">// the file extension used by the parser
</span>&#125;</code>`,Oe,ue,ft="The notion of model units has been around for some time. Actually, we have published a number of papers on the topic.",Ue,me,ut=`<li>At <em>Eclipse Summit 2008 Modeling Symposium</em> model units were introduced in <em>Big Models an Alternative Approach</em>.</li> <li>Earlier, model units were described under the term ‘Partial Models’ at the ECMDA-FA 2007 conference in a paper called <em>Building a Flexible Software Factory Using Partial Domain Specific Models</em>.</li> <li>More recently model units have been used within the
		<a href="https://www.mendix.com/" target="_blank">Mendix</a> meta-model to allow for working with large models in their web based modeling
		tools. This work was presented at Splash 2016 in _Making Mendix Meta Model Driven_.</li>`,je,z,Je,Ne,he,mt=`Other guidelines have been <strong>ease of use</strong>, and <strong>flexibility</strong>. Freon may not (yet
	<img src="/icons/smile.png" alt="OOPS" width="20" height="20"/>) do everything you need, but what it does, should be very easy to get
	into. Furthermore, Freon is designed to be <strong>extendable</strong>, and <strong>easy to integrate with other tooling</strong>. In
	practise this means that:`,Re,ge,ht=`<li>Every part of the work environment that is generated, can be <em>exchanged</em> for one that suits the language engineer better, provided
		the right interface is implemented.</li> <li>Every part of the work environment is made by its own generator, so you can adjust which parts you want to generate and which parts you <em>omit</em>.</li> <li>The different parts of the work environment can be run on either the server or the client. Thus creating <em>multiple deployment options</em>.</li>`,Ve,de,gt=`With these principles in mind, we have started of small and simple. Every definition language, from the language structure to the
	validation rules, is kept <strong>minimal</strong>. Over time, in an <strong>agile</strong>
	fashion, these will be extended whenever the need arises.`,Ge,_e,Ke;t=new kt({props:{prevLink:yt,nextLink:Ct}});function Ft(e){l[1](e)}let dt={tag:"h1",id:"a-bit-of-background-1",$$slots:{default:[Xt]},$$scope:{ctx:l}};l[0][0]!==void 0&&(dt.intersecting=l[0][0]),i=new ye({props:dt}),we.push(()=>ke(i,"intersecting",Ft));function Ot(e){l[2](e)}let _t={tag:"h2",id:"design-philosophy-2",$$slots:{default:[Yt]},$$scope:{ctx:l}};l[0][1]!==void 0&&(_t.intersecting=l[0][1]),M=new ye({props:_t}),we.push(()=>ke(M,"intersecting",Ot));function Ut(e){l[3](e)}let vt={tag:"h2",id:"a-minimal-viable-product-3",$$slots:{default:[Zt]},$$scope:{ctx:l}};l[0][2]!==void 0&&(vt.intersecting=l[0][2]),B=new ye({props:vt}),we.push(()=>ke(B,"intersecting",Ut));function jt(e){l[4](e)}let bt={tag:"h2",id:"name-based-references-4",$$slots:{default:[en]},$$scope:{ctx:l}};l[0][3]!==void 0&&(bt.intersecting=l[0][3]),K=new ye({props:bt}),we.push(()=>ke(K,"intersecting",jt));function Nt(e){l[5](e)}let wt={tag:"h2",id:"model-units-or-partitions-5",$$slots:{default:[tn]},$$scope:{ctx:l}};l[0][4]!==void 0&&(wt.intersecting=l[0][4]),W=new ye({props:wt}),we.push(()=>ke(W,"intersecting",Nt));function Rt(e){l[6](e)}let $t={tag:"h2",id:"other-guidelines-6",$$slots:{default:[nn]},$$scope:{ctx:l}};return l[0][5]!==void 0&&($t.intersecting=l[0][5]),z=new ye({props:$t}),we.push(()=>ke(z,"intersecting",Rt)),_e=new kt({props:{prevLink:yt,nextLink:Ct}}),{c(){O(t.$$.fragment),n=h(),O(i.$$.fragment),p=h(),v=d("p"),v.textContent=c,u=h(),b=d("p"),b.textContent=F,m=h(),O(M.$$.fragment),E=h(),H=d("p"),H.textContent=ee,A=h(),q=d("blockquote"),q.innerHTML=be,te=h(),O(B.$$.fragment),x=h(),$=d("p"),$.innerHTML=G,k=h(),f=d("p"),f.innerHTML=L,w=h(),S=d("p"),S.innerHTML=ne,ie=h(),I=d("p"),I.textContent=it,Ce=h(),O(K.$$.fragment),Me=h(),se=d("p"),se.innerHTML=st,Le=h(),Te=d("hr"),Pe=h(),le=d("blockquote"),le.innerHTML=lt,Ee=h(),He=d("hr"),xe=h(),oe=d("p"),oe.innerHTML=ot,Se=h(),ae=d("ul"),ae.innerHTML=at,Ae=h(),re=d("p"),re.textContent=rt,qe=h(),O(W.$$.fragment),Be=h(),ce=d("p"),ce.innerHTML=ct,De=h(),pe=d("p"),pe.innerHTML=pt,Ie=h(),fe=d("pre"),Fe=new Vt(!1),Oe=h(),ue=d("p"),ue.textContent=ft,Ue=h(),me=d("ul"),me.innerHTML=ut,je=h(),O(z.$$.fragment),Ne=h(),he=d("p"),he.innerHTML=mt,Re=h(),ge=d("ul"),ge.innerHTML=ht,Ve=h(),de=d("p"),de.innerHTML=gt,Ge=h(),O(_e.$$.fragment),this.h()},l(e){U(t.$$.fragment,e),n=g(e),U(i.$$.fragment,e),p=g(e),v=_(e,"P",{"data-svelte-h":!0}),y(v)!=="svelte-1fl31j2"&&(v.textContent=c),u=g(e),b=_(e,"P",{"data-svelte-h":!0}),y(b)!=="svelte-je06at"&&(b.textContent=F),m=g(e),U(M.$$.fragment,e),E=g(e),H=_(e,"P",{"data-svelte-h":!0}),y(H)!=="svelte-m7y7kg"&&(H.textContent=ee),A=g(e),q=_(e,"BLOCKQUOTE",{"data-svelte-h":!0}),y(q)!=="svelte-8l9cf7"&&(q.innerHTML=be),te=g(e),U(B.$$.fragment,e),x=g(e),$=_(e,"P",{"data-svelte-h":!0}),y($)!=="svelte-12lq8e9"&&($.innerHTML=G),k=g(e),f=_(e,"P",{"data-svelte-h":!0}),y(f)!=="svelte-1eqf2te"&&(f.innerHTML=L),w=g(e),S=_(e,"P",{"data-svelte-h":!0}),y(S)!=="svelte-1soegwk"&&(S.innerHTML=ne),ie=g(e),I=_(e,"P",{"data-svelte-h":!0}),y(I)!=="svelte-1qigyoe"&&(I.textContent=it),Ce=g(e),U(K.$$.fragment,e),Me=g(e),se=_(e,"P",{"data-svelte-h":!0}),y(se)!=="svelte-1iqi0r2"&&(se.innerHTML=st),Le=g(e),Te=_(e,"HR",{}),Pe=g(e),le=_(e,"BLOCKQUOTE",{"data-svelte-h":!0}),y(le)!=="svelte-1o0kwa"&&(le.innerHTML=lt),Ee=g(e),He=_(e,"HR",{}),xe=g(e),oe=_(e,"P",{"data-svelte-h":!0}),y(oe)!=="svelte-wffhc6"&&(oe.innerHTML=ot),Se=g(e),ae=_(e,"UL",{"data-svelte-h":!0}),y(ae)!=="svelte-1gfv57m"&&(ae.innerHTML=at),Ae=g(e),re=_(e,"P",{"data-svelte-h":!0}),y(re)!=="svelte-vhozsa"&&(re.textContent=rt),qe=g(e),U(W.$$.fragment,e),Be=g(e),ce=_(e,"P",{"data-svelte-h":!0}),y(ce)!=="svelte-6vb5vp"&&(ce.innerHTML=ct),De=g(e),pe=_(e,"P",{"data-svelte-h":!0}),y(pe)!=="svelte-1w0r6q0"&&(pe.innerHTML=pt),Ie=g(e),fe=_(e,"PRE",{class:!0});var s=D(fe);Fe=Gt(s,!1),s.forEach(o),Oe=g(e),ue=_(e,"P",{"data-svelte-h":!0}),y(ue)!=="svelte-l6kwt0"&&(ue.textContent=ft),Ue=g(e),me=_(e,"UL",{"data-svelte-h":!0}),y(me)!=="svelte-a8lzjo"&&(me.innerHTML=ut),je=g(e),U(z.$$.fragment,e),Ne=g(e),he=_(e,"P",{"data-svelte-h":!0}),y(he)!=="svelte-l32y23"&&(he.innerHTML=mt),Re=g(e),ge=_(e,"UL",{"data-svelte-h":!0}),y(ge)!=="svelte-1pazcbn"&&(ge.innerHTML=ht),Ve=g(e),de=_(e,"P",{"data-svelte-h":!0}),y(de)!=="svelte-witpsp"&&(de.innerHTML=gt),Ge=g(e),U(_e.$$.fragment,e),this.h()},h(){Fe.a=null,C(fe,"class","language-freon")},m(e,s){j(t,e,s),r(e,n,s),j(i,e,s),r(e,p,s),r(e,v,s),r(e,u,s),r(e,b,s),r(e,m,s),j(M,e,s),r(e,E,s),r(e,H,s),r(e,A,s),r(e,q,s),r(e,te,s),j(B,e,s),r(e,x,s),r(e,$,s),r(e,k,s),r(e,f,s),r(e,w,s),r(e,S,s),r(e,ie,s),r(e,I,s),r(e,Ce,s),j(K,e,s),r(e,Me,s),r(e,se,s),r(e,Le,s),r(e,Te,s),r(e,Pe,s),r(e,le,s),r(e,Ee,s),r(e,He,s),r(e,xe,s),r(e,oe,s),r(e,Se,s),r(e,ae,s),r(e,Ae,s),r(e,re,s),r(e,qe,s),j(W,e,s),r(e,Be,s),r(e,ce,s),r(e,De,s),r(e,pe,s),r(e,Ie,s),r(e,fe,s),Fe.m(It,fe),r(e,Oe,s),r(e,ue,s),r(e,Ue,s),r(e,me,s),r(e,je,s),j(z,e,s),r(e,Ne,s),r(e,he,s),r(e,Re,s),r(e,ge,s),r(e,Ve,s),r(e,de,s),r(e,Ge,s),j(_e,e,s),Ke=!0},p(e,[s]){const Xe={};s&256&&(Xe.$$scope={dirty:s,ctx:e}),!a&&s&1&&(a=!0,Xe.intersecting=e[0][0],$e(()=>a=!1)),i.$set(Xe);const Ye={};s&256&&(Ye.$$scope={dirty:s,ctx:e}),!T&&s&1&&(T=!0,Ye.intersecting=e[0][1],$e(()=>T=!1)),M.$set(Ye);const Ze={};s&256&&(Ze.$$scope={dirty:s,ctx:e}),!J&&s&1&&(J=!0,Ze.intersecting=e[0][2],$e(()=>J=!1)),B.$set(Ze);const et={};s&256&&(et.$$scope={dirty:s,ctx:e}),!ze&&s&1&&(ze=!0,et.intersecting=e[0][3],$e(()=>ze=!1)),K.$set(et);const tt={};s&256&&(tt.$$scope={dirty:s,ctx:e}),!Qe&&s&1&&(Qe=!0,tt.intersecting=e[0][4],$e(()=>Qe=!1)),W.$set(tt);const nt={};s&256&&(nt.$$scope={dirty:s,ctx:e}),!Je&&s&1&&(Je=!0,nt.intersecting=e[0][5],$e(()=>Je=!1)),z.$set(nt)},i(e){Ke||(N(t.$$.fragment,e),N(i.$$.fragment,e),N(M.$$.fragment,e),N(B.$$.fragment,e),N(K.$$.fragment,e),N(W.$$.fragment,e),N(z.$$.fragment,e),N(_e.$$.fragment,e),Ke=!0)},o(e){R(t.$$.fragment,e),R(i.$$.fragment,e),R(M.$$.fragment,e),R(B.$$.fragment,e),R(K.$$.fragment,e),R(W.$$.fragment,e),R(z.$$.fragment,e),R(_e.$$.fragment,e),Ke=!1},d(e){e&&(o(n),o(p),o(v),o(u),o(b),o(m),o(E),o(H),o(A),o(q),o(te),o(x),o($),o(k),o(f),o(w),o(S),o(ie),o(I),o(Ce),o(Me),o(se),o(Le),o(Te),o(Pe),o(le),o(Ee),o(He),o(xe),o(oe),o(Se),o(ae),o(Ae),o(re),o(qe),o(Be),o(ce),o(De),o(pe),o(Ie),o(fe),o(Oe),o(ue),o(Ue),o(me),o(je),o(Ne),o(he),o(Re),o(ge),o(Ve),o(de),o(Ge)),V(t,e),V(i,e),V(M,e),V(B,e),V(K,e),V(W,e),V(z,e),V(_e,e)}}}let yt="/LionWeb/Overview",Ct="/Background/Testimonial";function ln(l,t,n){let i;xt(l,Q,m=>n(7,i=m)),ve(Q,i=[{title:"A Bit of Background",visible:!1,ref:"#a-bit-of-background-1"},{title:"Design Philosophy",visible:!1,ref:"#design-philosophy-2"},{title:"A Minimal Viable Product",visible:!1,ref:"#a-minimal-viable-product-3"},{title:"Name-Based References",visible:!1,ref:"#name-based-references-4"},{title:"Model Units or Partitions",visible:!1,ref:"#model-units-or-partitions-5"},{title:"Other Guidelines",visible:!1,ref:"#other-guidelines-6"}],i);let a=[];Kt(()=>{document.querySelectorAll("pre").forEach(M=>{const T=document.createElement("div");T.className="copy-prompt";const E=document.createElement("p");E.innerHTML="👆 Click to copy",E.className="copy-prompt-p";const H=document.createElement("img");H.src="/icons/copy-icon.svg",H.className="copy-prompt-img",T.appendChild(H),T.appendChild(E),M.appendChild(T),M.querySelector(".copy-prompt > p").addEventListener("click",ee=>{Qt(M.querySelector("code").textContent),M.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{M.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function p(m){l.$$.not_equal(a[0],m)&&(a[0]=m,n(0,a))}function v(m){l.$$.not_equal(a[1],m)&&(a[1]=m,n(0,a))}function c(m){l.$$.not_equal(a[2],m)&&(a[2]=m,n(0,a))}function u(m){l.$$.not_equal(a[3],m)&&(a[3]=m,n(0,a))}function b(m){l.$$.not_equal(a[4],m)&&(a[4]=m,n(0,a))}function F(m){l.$$.not_equal(a[5],m)&&(a[5]=m,n(0,a))}return l.$$.update=()=>{l.$$.dirty&1&&ve(Q,i[0].visible=a[0],i),l.$$.dirty&1&&ve(Q,i[1].visible=a[1],i),l.$$.dirty&1&&ve(Q,i[2].visible=a[2],i),l.$$.dirty&1&&ve(Q,i[3].visible=a[3],i),l.$$.dirty&1&&ve(Q,i[4].visible=a[4],i),l.$$.dirty&1&&ve(Q,i[5].visible=a[5],i)},[a,p,v,c,u,b,F]}class on extends Bt{constructor(t){super(),Dt(this,t,ln,sn,Ht,{})}}function Mt(l,t,n){const i=l.slice();return i[6]=t[n],i[8]=n,i}function Lt(l,t,n){const i=l.slice();return i[6]=t[n],i[8]=n,i}function an(l){let t,n;return{c(){t=d("img"),this.h()},l(i){t=_(i,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){C(t,"class","page-toc-small-img"),qt(t.src,n="/icons/down-arrow.png")||C(t,"src",n),C(t,"alt","arrow down")},m(i,a){r(i,t,a)},d(i){i&&o(t)}}}function rn(l){let t,n;return{c(){t=d("img"),this.h()},l(i){t=_(i,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){C(t,"class","page-toc-small-img"),qt(t.src,n="/icons/upload.png")||C(t,"src",n),C(t,"alt","arrow up")},m(i,a){r(i,t,a)},d(i){i&&o(t)}}}function Tt(l){let t,n,i=We(l[0]),a=[];for(let p=0;p<i.length;p+=1)a[p]=Pt(Lt(l,i,p));return{c(){t=d("div"),n=d("ul");for(let p=0;p<a.length;p+=1)a[p].c();this.h()},l(p){t=_(p,"DIV",{class:!0});var v=D(t);n=_(v,"UL",{class:!0});var c=D(n);for(let u=0;u<a.length;u+=1)a[u].l(c);c.forEach(o),v.forEach(o),this.h()},h(){C(n,"class","page-ul"),C(t,"class","toc-details")},m(p,v){r(p,t,v),P(t,n);for(let c=0;c<a.length;c+=1)a[c]&&a[c].m(n,null)},p(p,v){if(v&5){i=We(p[0]);let c;for(c=0;c<i.length;c+=1){const u=Lt(p,i,c);a[c]?a[c].p(u,v):(a[c]=Pt(u),a[c].c(),a[c].m(n,null))}for(;c<a.length;c+=1)a[c].d(1);a.length=i.length}},d(p){p&&o(t),St(a,p)}}}function Pt(l){let t,n,i=l[6].title+"",a,p,v;return{c(){t=d("li"),n=d("a"),a=Y(i),v=h(),this.h()},l(c){t=_(c,"LI",{class:!0});var u=D(t);n=_(u,"A",{href:!0});var b=D(n);a=Z(b,i),b.forEach(o),v=g(u),u.forEach(o),this.h()},h(){C(n,"href",p=l[6].ref),X(n,"page-visible",l[8]===l[2]),X(n,"page-nonvisible",l[8]!==l[2]),C(t,"class","page-toc-text")},m(c,u){r(c,t,u),P(t,n),P(n,a),P(t,v)},p(c,u){u&1&&i!==(i=c[6].title+"")&&At(a,i),u&1&&p!==(p=c[6].ref)&&C(n,"href",p),u&4&&X(n,"page-visible",c[8]===c[2]),u&4&&X(n,"page-nonvisible",c[8]!==c[2])},d(c){c&&o(t)}}}function Et(l){let t,n,i=l[6].title+"",a,p,v;return{c(){t=d("li"),n=d("a"),a=Y(i),v=h(),this.h()},l(c){t=_(c,"LI",{class:!0});var u=D(t);n=_(u,"A",{href:!0});var b=D(n);a=Z(b,i),b.forEach(o),v=g(u),u.forEach(o),this.h()},h(){C(n,"href",p=l[6].ref),X(n,"page-visible",l[8]===l[2]),X(n,"page-nonvisible",l[8]!==l[2]),C(t,"class","page-toc-text")},m(c,u){r(c,t,u),P(t,n),P(n,a),P(t,v)},p(c,u){u&1&&i!==(i=c[6].title+"")&&At(a,i),u&1&&p!==(p=c[6].ref)&&C(n,"href",p),u&4&&X(n,"page-visible",c[8]===c[2]),u&4&&X(n,"page-nonvisible",c[8]!==c[2])},d(c){c&&o(t)}}}function cn(l){let t,n,i,a="On this page ...",p,v,c,u,b,F,m,M,T,E,H="On this page",ee,A,q,be,te;function B(f,L){return f[1]?rn:an}let J=B(l),x=J(l),$=l[1]&&Tt(l);b=new Jt({}),m=new on({});let G=We(l[0]),k=[];for(let f=0;f<G.length;f+=1)k[f]=Et(Mt(l,G,f));return{c(){t=d("div"),n=d("div"),i=d("p"),i.textContent=a,p=h(),v=d("button"),x.c(),c=h(),$&&$.c(),u=h(),O(b.$$.fragment),F=h(),O(m.$$.fragment),M=h(),T=d("nav"),E=d("h3"),E.textContent=H,ee=h(),A=d("ul");for(let f=0;f<k.length;f+=1)k[f].c();this.h()},l(f){t=_(f,"DIV",{class:!0});var L=D(t);n=_(L,"DIV",{class:!0});var w=D(n);i=_(w,"P",{class:!0,"data-svelte-h":!0}),y(i)!=="svelte-1929lhs"&&(i.textContent=a),p=g(w),v=_(w,"BUTTON",{class:!0});var S=D(v);x.l(S),S.forEach(o),w.forEach(o),c=g(L),$&&$.l(L),u=g(L),U(b.$$.fragment,L),F=g(L),U(m.$$.fragment,L),L.forEach(o),M=g(f),T=_(f,"NAV",{class:!0});var ne=D(T);E=_(ne,"H3",{class:!0,"data-svelte-h":!0}),y(E)!=="svelte-1hgt7fi"&&(E.textContent=H),ee=g(ne),A=_(ne,"UL",{class:!0});var ie=D(A);for(let I=0;I<k.length;I+=1)k[I].l(ie);ie.forEach(o),ne.forEach(o),this.h()},h(){C(i,"class","page-toc-small-title"),C(v,"class","page-toc-small-expand-button"),C(n,"class","page-toc-small"),C(t,"class","page-main"),C(E,"class","page-toc-title"),C(A,"class","page-ul"),C(T,"class","page-toc")},m(f,L){r(f,t,L),P(t,n),P(n,i),P(n,p),P(n,v),x.m(v,null),P(t,c),$&&$.m(t,null),P(t,u),j(b,t,null),P(t,F),j(m,t,null),r(f,M,L),r(f,T,L),P(T,E),P(T,ee),P(T,A);for(let w=0;w<k.length;w+=1)k[w]&&k[w].m(A,null);q=!0,be||(te=Wt(v,"click",l[4]),be=!0)},p(f,[L]){if(J!==(J=B(f))&&(x.d(1),x=J(f),x&&(x.c(),x.m(v,null))),f[1]?$?$.p(f,L):($=Tt(f),$.c(),$.m(t,u)):$&&($.d(1),$=null),L&5){G=We(f[0]);let w;for(w=0;w<G.length;w+=1){const S=Mt(f,G,w);k[w]?k[w].p(S,L):(k[w]=Et(S),k[w].c(),k[w].m(A,null))}for(;w<k.length;w+=1)k[w].d(1);k.length=G.length}},i(f){q||(N(b.$$.fragment,f),N(m.$$.fragment,f),q=!0)},o(f){R(b.$$.fragment,f),R(m.$$.fragment,f),q=!1},d(f){f&&(o(t),o(M),o(T)),x.d(),$&&$.d(),V(b),V(m),St(k,f),be=!1,te()}}}function pn(l,t,n){let i,a;xt(l,Q,b=>n(0,a=b));let p=!1;function v(b){let F=i;for(let m=0;m<b.length;m++)if(b[m].visible)return m;return F}function c(){n(1,p=!p)}const u=()=>{c()};return l.$$.update=()=>{l.$$.dirty&1&&n(2,i=v(a))},[a,p,i,c,u]}class dn extends Bt{constructor(t){super(),Dt(this,t,pn,cn,Ht,{})}}export{dn as component};
//# sourceMappingURL=13.BMXul06U.js.map
