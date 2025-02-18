import{s as Ct,A as he,a as _,e as h,H as Ee,f as g,b as v,m as I,d as H,F as Me,g as a,h as b,i as r,B as ve,r as Lt,w as ne,v as Ot,t as x,o as ee,j as M,C as Ut,D as Et,E as se,q as Mt,p as qt}from"../chunks/scheduler.Cra-n4xf.js";import{S as Pt,i as Ht,e as $e,c as N,a as F,m as G,t as B,b as j,d as O}from"../chunks/index.Bm95Nbrf.js";import{e as Qe}from"../chunks/stores.Bq7jfj-I.js";import{w as Wt}from"../chunks/index.B9cI0ado.js";import{P as ht,S as be,c as zt,B as Jt}from"../chunks/index.DunYcI8q.js";const J=Wt([]);function Kt(i){let n;return{c(){n=x("Validator")},l(t){n=ee(t,"Validator")},m(t,s){r(t,n,s)},d(t){t&&a(n)}}}function Qt(i){let n;return{c(){n=x("Simple Value Rules")},l(t){n=ee(t,"Simple Value Rules")},m(t,s){r(t,n,s)},d(t){t&&a(n)}}}function Xt(i){let n;return{c(){n=x("List Rules")},l(t){n=ee(t,"List Rules")},m(t,s){r(t,n,s)},d(t){t&&a(n)}}}function Yt(i){let n;return{c(){n=x("Valid Identifier Rules")},l(t){n=ee(t,"Valid Identifier Rules")},m(t,s){r(t,n,s)},d(t){t&&a(n)}}}function Zt(i){let n;return{c(){n=x("Type Check Rules")},l(t){n=ee(t,"Type Check Rules")},m(t,s){r(t,n,s)},d(t){t&&a(n)}}}function xt(i){let n;return{c(){n=x("Custom Messages")},l(t){n=ee(t,"Custom Messages")},m(t,s){r(t,n,s)},d(t){t&&a(n)}}}function en(i){let n;return{c(){n=x("The Default Validation Rules")},l(t){n=ee(t,"The Default Validation Rules")},m(t,s){r(t,n,s)},d(t){t&&a(n)}}}function tn(i){let n,t,s,o,p,m,c=`Validation is all about the rules that hold in your language. These rules are not the rules of the concrete syntax, but instead they
	provide an extra check of the model/AST.`,u,$,U=`The <strong>validator</strong> definition provides the constraints or rules that should be true in the models build by your users. Any
	part of the validator definition must be included in a file with the extension <code>.valid</code>. All files with this extension in the
	<a href="/Documentation/Overview/Getting_Started#template-project-startup-3"><em>defs</em> folder</a>
	(i.e. the folder were you keep your definition files) are combined into one validator definition.`,C,d,L="Currently, there are four types of validation rules.",E,q,D,V,R,ke=`Given a <a href="/Documentation/Creating_the_Metamodel/Defining_Properties#simple-properties-2">simple property</a>, its value can be
	limited to certain values.`,ie,W,K,A=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-extras.valid#L3-L6
</span>
<span class="token class-name">EntityAttribute</span> &#123;
    <span class="token variable">self</span>.numVal >= <span class="token number">12</span>;       <span class="token comment">// in .ast file: "numVal: number;"
</span>    <span class="token variable">self</span>.numVal &lt;= <span class="token number">30</span>;
&#125;</code>`,w,P,T,f,k,y="Given a list property, a <strong>not-empty rule</strong> can be stated. The list complies with the rule if it is not empty.",z,S,Le=`An <strong>is-unique rule</strong> is another rule that can be stated for a list property. The list complies when the value of the property
	is unique within the list.`,te,le,qe,It=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-docu.valid#L3-L7
</span>
<span class="token class-name">InsuranceProduct</span> &#123;
    <span class="token keyword">notEmpty</span> <span class="token variable">self</span>.parts;
    <span class="token keyword">isunique</span> name <span class="token keyword">in</span> <span class="token variable">self</span>.parts;
    <span class="token keyword">isunique</span> name <span class="token keyword">in</span> <span class="token variable">self</span>.helpers;
&#125;</code>`,Pe,Q,Xe,He,ae,st=`Given a simple property of type <em>identifier</em>, a <strong>valid-identifier-rule</strong> can be given. The property complies with the
	rule if it is a valid identifier according to the TypeScript definition.`,Ie,oe,it=`For a <em>valid-identifier-rule</em> the <code>validIdentifier</code> keyword is used followed by an optional simple property. When the
	property is present, this property is checked. When the property is not present, Freon assumes that the concept has a simple property
	named ‘<code>name</code>’ of type ‘<code>identifier</code>’, and it will check this property.`,Ve,re,Re,Vt=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-docu.valid#L27-L32
</span>
&#125;
<span class="token class-name">CalcFunction</span> &#123;
    <span class="token comment">// typecheck conformsTo (self.body, self.declaredType);
</span>    <span class="token keyword">isunique</span> name <span class="token keyword">in</span> <span class="token variable">self</span>.parameters;
    <span class="token class-name">validIdentifier</span>
    &#123;</code>`,Se,X,Ye,De,ce,lt=`Given the rules in the typer definition, rules can be stated to ensure type compliance. To indicate a <strong>type checking rule</strong>
	the keyword <code>typecheck</code> is used, followed by either <code>equalsType</code> or <code>conformsTo</code>. The first demands that
	the types of the two properties given are equal. The second demands that the type of the first conforms to the type of the second.`,Ae,pe,at="In type checking rules it is possible to use predefined instances of a limited concept.",Ne,ue,Fe,Rt=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-docu.valid#L10-L12
</span>
<span class="token class-name">MinusExpression</span>  &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;</code>`,Ge,Y,Ze,Be,fe,ot=`The generated error messages can be changed into custom ones. Similar to the editor definition, properties can be used in the error
	message using the syntax <code>\${propName}</code>. The severity of the error may or may not be indicated. The possible values
	are “error”, “warning”, “hint”, “improvement”, “todo”, and “info”. It defaults to “todo”.`,je,me,Oe,St=`<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-docu.valid#L28-L36
</span>
<span class="token class-name">CalcFunction</span> &#123;
    <span class="token comment">// typecheck conformsTo (self.body, self.declaredType);
</span>    <span class="token keyword">isunique</span> name <span class="token keyword">in</span> <span class="token variable">self</span>.parameters;
    <span class="token class-name">validIdentifier</span>
    &#123;
        <span class="token keyword">message</span>: <span class="token string">"El nombre '$&#123;self.name&#125;' no es un identificador correcto."</span>,
        <span class="token keyword">severity</span>: <span class="token builtin">error</span>
    &#125;;
&#125;</code>`,Ue,Z,xe,We,de,rt="There are just a few default validation rules:",ze,_e,ct="<li>Non-optional properties must be set.</li> <li>Non-optional lists must include one element.</li> <li>Names of model units should be valid identifiers.</li> <li>Any reference must be present.</li>",Je,ge,Ke;n=new ht({props:{prevLink:vt,nextLink:$t}});function Dt(e){i[1](e)}let pt={tag:"h1",id:"validator-1",$$slots:{default:[Kt]},$$scope:{ctx:i}};i[0][0]!==void 0&&(pt.intersecting=i[0][0]),s=new be({props:pt}),he.push(()=>$e(s,"intersecting",Dt));function At(e){i[2](e)}let ut={tag:"h2",id:"simple-value-rules-2",$$slots:{default:[Qt]},$$scope:{ctx:i}};i[0][1]!==void 0&&(ut.intersecting=i[0][1]),q=new be({props:ut}),he.push(()=>$e(q,"intersecting",At));function Nt(e){i[3](e)}let ft={tag:"h2",id:"list-rules-3",$$slots:{default:[Xt]},$$scope:{ctx:i}};i[0][2]!==void 0&&(ft.intersecting=i[0][2]),P=new be({props:ft}),he.push(()=>$e(P,"intersecting",Nt));function Ft(e){i[4](e)}let mt={tag:"h2",id:"valid-identifier-rules-4",$$slots:{default:[Yt]},$$scope:{ctx:i}};i[0][3]!==void 0&&(mt.intersecting=i[0][3]),Q=new be({props:mt}),he.push(()=>$e(Q,"intersecting",Ft));function Gt(e){i[5](e)}let dt={tag:"h2",id:"type-check-rules-5",$$slots:{default:[Zt]},$$scope:{ctx:i}};i[0][4]!==void 0&&(dt.intersecting=i[0][4]),X=new be({props:dt}),he.push(()=>$e(X,"intersecting",Gt));function Bt(e){i[6](e)}let _t={tag:"h2",id:"custom-messages-6",$$slots:{default:[xt]},$$scope:{ctx:i}};i[0][5]!==void 0&&(_t.intersecting=i[0][5]),Y=new be({props:_t}),he.push(()=>$e(Y,"intersecting",Bt));function jt(e){i[7](e)}let gt={tag:"h1",id:"the-default-validation-rules-7",$$slots:{default:[en]},$$scope:{ctx:i}};return i[0][6]!==void 0&&(gt.intersecting=i[0][6]),Z=new be({props:gt}),he.push(()=>$e(Z,"intersecting",jt)),ge=new ht({props:{prevLink:vt,nextLink:$t}}),{c(){N(n.$$.fragment),t=_(),N(s.$$.fragment),p=_(),m=h("p"),m.textContent=c,u=_(),$=h("p"),$.innerHTML=U,C=_(),d=h("p"),d.textContent=L,E=_(),N(q.$$.fragment),V=_(),R=h("p"),R.innerHTML=ke,ie=_(),W=h("pre"),K=new Ee(!1),w=_(),N(P.$$.fragment),f=_(),k=h("p"),k.innerHTML=y,z=_(),S=h("p"),S.innerHTML=Le,te=_(),le=h("pre"),qe=new Ee(!1),Pe=_(),N(Q.$$.fragment),He=_(),ae=h("p"),ae.innerHTML=st,Ie=_(),oe=h("p"),oe.innerHTML=it,Ve=_(),re=h("pre"),Re=new Ee(!1),Se=_(),N(X.$$.fragment),De=_(),ce=h("p"),ce.innerHTML=lt,Ae=_(),pe=h("p"),pe.textContent=at,Ne=_(),ue=h("pre"),Fe=new Ee(!1),Ge=_(),N(Y.$$.fragment),Be=_(),fe=h("p"),fe.innerHTML=ot,je=_(),me=h("pre"),Oe=new Ee(!1),Ue=_(),N(Z.$$.fragment),We=_(),de=h("p"),de.textContent=rt,ze=_(),_e=h("ul"),_e.innerHTML=ct,Je=_(),N(ge.$$.fragment),this.h()},l(e){F(n.$$.fragment,e),t=g(e),F(s.$$.fragment,e),p=g(e),m=v(e,"P",{"data-svelte-h":!0}),I(m)!=="svelte-polmz9"&&(m.textContent=c),u=g(e),$=v(e,"P",{"data-svelte-h":!0}),I($)!=="svelte-cnecsm"&&($.innerHTML=U),C=g(e),d=v(e,"P",{"data-svelte-h":!0}),I(d)!=="svelte-1ducsbm"&&(d.textContent=L),E=g(e),F(q.$$.fragment,e),V=g(e),R=v(e,"P",{"data-svelte-h":!0}),I(R)!=="svelte-stkur6"&&(R.innerHTML=ke),ie=g(e),W=v(e,"PRE",{class:!0});var l=H(W);K=Me(l,!1),l.forEach(a),w=g(e),F(P.$$.fragment,e),f=g(e),k=v(e,"P",{"data-svelte-h":!0}),I(k)!=="svelte-13fdih6"&&(k.innerHTML=y),z=g(e),S=v(e,"P",{"data-svelte-h":!0}),I(S)!=="svelte-gco3pm"&&(S.innerHTML=Le),te=g(e),le=v(e,"PRE",{class:!0});var ye=H(le);qe=Me(ye,!1),ye.forEach(a),Pe=g(e),F(Q.$$.fragment,e),He=g(e),ae=v(e,"P",{"data-svelte-h":!0}),I(ae)!=="svelte-12egui6"&&(ae.innerHTML=st),Ie=g(e),oe=v(e,"P",{"data-svelte-h":!0}),I(oe)!=="svelte-8jjsks"&&(oe.innerHTML=it),Ve=g(e),re=v(e,"PRE",{class:!0});var we=H(re);Re=Me(we,!1),we.forEach(a),Se=g(e),F(X.$$.fragment,e),De=g(e),ce=v(e,"P",{"data-svelte-h":!0}),I(ce)!=="svelte-qc2udi"&&(ce.innerHTML=lt),Ae=g(e),pe=v(e,"P",{"data-svelte-h":!0}),I(pe)!=="svelte-feybmw"&&(pe.textContent=at),Ne=g(e),ue=v(e,"PRE",{class:!0});var Te=H(ue);Fe=Me(Te,!1),Te.forEach(a),Ge=g(e),F(Y.$$.fragment,e),Be=g(e),fe=v(e,"P",{"data-svelte-h":!0}),I(fe)!=="svelte-rq3mnn"&&(fe.innerHTML=ot),je=g(e),me=v(e,"PRE",{class:!0});var Ce=H(me);Oe=Me(Ce,!1),Ce.forEach(a),Ue=g(e),F(Z.$$.fragment,e),We=g(e),de=v(e,"P",{"data-svelte-h":!0}),I(de)!=="svelte-tmmrxs"&&(de.textContent=rt),ze=g(e),_e=v(e,"UL",{"data-svelte-h":!0}),I(_e)!=="svelte-kq51le"&&(_e.innerHTML=ct),Je=g(e),F(ge.$$.fragment,e),this.h()},h(){K.a=null,b(W,"class","language-freon"),qe.a=null,b(le,"class","language-freon"),Re.a=null,b(re,"class","language-freon"),Fe.a=null,b(ue,"class","language-freon"),Oe.a=null,b(me,"class","language-freon")},m(e,l){G(n,e,l),r(e,t,l),G(s,e,l),r(e,p,l),r(e,m,l),r(e,u,l),r(e,$,l),r(e,C,l),r(e,d,l),r(e,E,l),G(q,e,l),r(e,V,l),r(e,R,l),r(e,ie,l),r(e,W,l),K.m(A,W),r(e,w,l),G(P,e,l),r(e,f,l),r(e,k,l),r(e,z,l),r(e,S,l),r(e,te,l),r(e,le,l),qe.m(It,le),r(e,Pe,l),G(Q,e,l),r(e,He,l),r(e,ae,l),r(e,Ie,l),r(e,oe,l),r(e,Ve,l),r(e,re,l),Re.m(Vt,re),r(e,Se,l),G(X,e,l),r(e,De,l),r(e,ce,l),r(e,Ae,l),r(e,pe,l),r(e,Ne,l),r(e,ue,l),Fe.m(Rt,ue),r(e,Ge,l),G(Y,e,l),r(e,Be,l),r(e,fe,l),r(e,je,l),r(e,me,l),Oe.m(St,me),r(e,Ue,l),G(Z,e,l),r(e,We,l),r(e,de,l),r(e,ze,l),r(e,_e,l),r(e,Je,l),G(ge,e,l),Ke=!0},p(e,[l]){const ye={};l&512&&(ye.$$scope={dirty:l,ctx:e}),!o&&l&1&&(o=!0,ye.intersecting=e[0][0],ve(()=>o=!1)),s.$set(ye);const we={};l&512&&(we.$$scope={dirty:l,ctx:e}),!D&&l&1&&(D=!0,we.intersecting=e[0][1],ve(()=>D=!1)),q.$set(we);const Te={};l&512&&(Te.$$scope={dirty:l,ctx:e}),!T&&l&1&&(T=!0,Te.intersecting=e[0][2],ve(()=>T=!1)),P.$set(Te);const Ce={};l&512&&(Ce.$$scope={dirty:l,ctx:e}),!Xe&&l&1&&(Xe=!0,Ce.intersecting=e[0][3],ve(()=>Xe=!1)),Q.$set(Ce);const et={};l&512&&(et.$$scope={dirty:l,ctx:e}),!Ye&&l&1&&(Ye=!0,et.intersecting=e[0][4],ve(()=>Ye=!1)),X.$set(et);const tt={};l&512&&(tt.$$scope={dirty:l,ctx:e}),!Ze&&l&1&&(Ze=!0,tt.intersecting=e[0][5],ve(()=>Ze=!1)),Y.$set(tt);const nt={};l&512&&(nt.$$scope={dirty:l,ctx:e}),!xe&&l&1&&(xe=!0,nt.intersecting=e[0][6],ve(()=>xe=!1)),Z.$set(nt)},i(e){Ke||(B(n.$$.fragment,e),B(s.$$.fragment,e),B(q.$$.fragment,e),B(P.$$.fragment,e),B(Q.$$.fragment,e),B(X.$$.fragment,e),B(Y.$$.fragment,e),B(Z.$$.fragment,e),B(ge.$$.fragment,e),Ke=!0)},o(e){j(n.$$.fragment,e),j(s.$$.fragment,e),j(q.$$.fragment,e),j(P.$$.fragment,e),j(Q.$$.fragment,e),j(X.$$.fragment,e),j(Y.$$.fragment,e),j(Z.$$.fragment,e),j(ge.$$.fragment,e),Ke=!1},d(e){e&&(a(t),a(p),a(m),a(u),a($),a(C),a(d),a(E),a(V),a(R),a(ie),a(W),a(w),a(f),a(k),a(z),a(S),a(te),a(le),a(Pe),a(He),a(ae),a(Ie),a(oe),a(Ve),a(re),a(Se),a(De),a(ce),a(Ae),a(pe),a(Ne),a(ue),a(Ge),a(Be),a(fe),a(je),a(me),a(Ue),a(We),a(de),a(ze),a(_e),a(Je)),O(n,e),O(s,e),O(q,e),O(P,e),O(Q,e),O(X,e),O(Y,e),O(Z,e),O(ge,e)}}}let vt="/Documentation/Scoping,_Typing,_and_Validating/Type_Provider",$t="/Documentation/Interpreter_Framework";function nn(i,n,t){let s;Lt(i,J,d=>t(8,s=d)),ne(J,s=[{title:"Validator",visible:!1,ref:"#validator-1"},{title:"Simple Value Rules",visible:!1,ref:"#simple-value-rules-2"},{title:"List Rules",visible:!1,ref:"#list-rules-3"},{title:"Valid Identifier Rules",visible:!1,ref:"#valid-identifier-rules-4"},{title:"Type Check Rules",visible:!1,ref:"#type-check-rules-5"},{title:"Custom Messages",visible:!1,ref:"#custom-messages-6"},{title:"The Default Validation Rules",visible:!1,ref:"#the-default-validation-rules-7"}],s);let o=[];Ot(()=>{document.querySelectorAll("pre").forEach(L=>{const E=document.createElement("div");E.className="copy-prompt";const q=document.createElement("p");q.innerHTML="👆 Click to copy",q.className="copy-prompt-p";const D=document.createElement("img");D.src="/icons/copy-icon.svg",D.className="copy-prompt-img",E.appendChild(D),E.appendChild(q),L.appendChild(E),L.querySelector(".copy-prompt > p").addEventListener("click",V=>{zt(L.querySelector("code").textContent),L.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{L.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function p(d){i.$$.not_equal(o[0],d)&&(o[0]=d,t(0,o))}function m(d){i.$$.not_equal(o[1],d)&&(o[1]=d,t(0,o))}function c(d){i.$$.not_equal(o[2],d)&&(o[2]=d,t(0,o))}function u(d){i.$$.not_equal(o[3],d)&&(o[3]=d,t(0,o))}function $(d){i.$$.not_equal(o[4],d)&&(o[4]=d,t(0,o))}function U(d){i.$$.not_equal(o[5],d)&&(o[5]=d,t(0,o))}function C(d){i.$$.not_equal(o[6],d)&&(o[6]=d,t(0,o))}return i.$$.update=()=>{i.$$.dirty&1&&ne(J,s[0].visible=o[0],s),i.$$.dirty&1&&ne(J,s[1].visible=o[1],s),i.$$.dirty&1&&ne(J,s[2].visible=o[2],s),i.$$.dirty&1&&ne(J,s[3].visible=o[3],s),i.$$.dirty&1&&ne(J,s[4].visible=o[4],s),i.$$.dirty&1&&ne(J,s[5].visible=o[5],s),i.$$.dirty&1&&ne(J,s[6].visible=o[6],s)},[o,p,m,c,u,$,U,C]}class sn extends Pt{constructor(n){super(),Ht(this,n,nn,tn,Ct,{})}}function bt(i,n,t){const s=i.slice();return s[6]=n[t],s[8]=t,s}function kt(i,n,t){const s=i.slice();return s[6]=n[t],s[8]=t,s}function ln(i){let n,t;return{c(){n=h("img"),this.h()},l(s){n=v(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){b(n,"class","page-toc-small-img"),qt(n.src,t="/icons/down-arrow.png")||b(n,"src",t),b(n,"alt","arrow down")},m(s,o){r(s,n,o)},d(s){s&&a(n)}}}function an(i){let n,t;return{c(){n=h("img"),this.h()},l(s){n=v(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){b(n,"class","page-toc-small-img"),qt(n.src,t="/icons/upload.png")||b(n,"src",t),b(n,"alt","arrow up")},m(s,o){r(s,n,o)},d(s){s&&a(n)}}}function yt(i){let n,t,s=Qe(i[0]),o=[];for(let p=0;p<s.length;p+=1)o[p]=wt(kt(i,s,p));return{c(){n=h("div"),t=h("ul");for(let p=0;p<o.length;p+=1)o[p].c();this.h()},l(p){n=v(p,"DIV",{class:!0});var m=H(n);t=v(m,"UL",{class:!0});var c=H(t);for(let u=0;u<o.length;u+=1)o[u].l(c);c.forEach(a),m.forEach(a),this.h()},h(){b(t,"class","page-ul"),b(n,"class","toc-details")},m(p,m){r(p,n,m),M(n,t);for(let c=0;c<o.length;c+=1)o[c]&&o[c].m(t,null)},p(p,m){if(m&5){s=Qe(p[0]);let c;for(c=0;c<s.length;c+=1){const u=kt(p,s,c);o[c]?o[c].p(u,m):(o[c]=wt(u),o[c].c(),o[c].m(t,null))}for(;c<o.length;c+=1)o[c].d(1);o.length=s.length}},d(p){p&&a(n),Et(o,p)}}}function wt(i){let n,t,s=i[6].title+"",o,p,m;return{c(){n=h("li"),t=h("a"),o=x(s),m=_(),this.h()},l(c){n=v(c,"LI",{class:!0});var u=H(n);t=v(u,"A",{href:!0});var $=H(t);o=ee($,s),$.forEach(a),m=g(u),u.forEach(a),this.h()},h(){b(t,"href",p=i[6].ref),se(t,"page-visible",i[8]===i[2]),se(t,"page-nonvisible",i[8]!==i[2]),b(n,"class","page-toc-text")},m(c,u){r(c,n,u),M(n,t),M(t,o),M(n,m)},p(c,u){u&1&&s!==(s=c[6].title+"")&&Mt(o,s),u&1&&p!==(p=c[6].ref)&&b(t,"href",p),u&4&&se(t,"page-visible",c[8]===c[2]),u&4&&se(t,"page-nonvisible",c[8]!==c[2])},d(c){c&&a(n)}}}function Tt(i){let n,t,s=i[6].title+"",o,p,m;return{c(){n=h("li"),t=h("a"),o=x(s),m=_(),this.h()},l(c){n=v(c,"LI",{class:!0});var u=H(n);t=v(u,"A",{href:!0});var $=H(t);o=ee($,s),$.forEach(a),m=g(u),u.forEach(a),this.h()},h(){b(t,"href",p=i[6].ref),se(t,"page-visible",i[8]===i[2]),se(t,"page-nonvisible",i[8]!==i[2]),b(n,"class","page-toc-text")},m(c,u){r(c,n,u),M(n,t),M(t,o),M(n,m)},p(c,u){u&1&&s!==(s=c[6].title+"")&&Mt(o,s),u&1&&p!==(p=c[6].ref)&&b(t,"href",p),u&4&&se(t,"page-visible",c[8]===c[2]),u&4&&se(t,"page-nonvisible",c[8]!==c[2])},d(c){c&&a(n)}}}function on(i){let n,t,s,o="On this page ...",p,m,c,u,$,U,C,d,L,E,q="On this page",D,V,R,ke,ie;function W(f,k){return f[1]?an:ln}let K=W(i),A=K(i),w=i[1]&&yt(i);$=new Jt({}),C=new sn({});let P=Qe(i[0]),T=[];for(let f=0;f<P.length;f+=1)T[f]=Tt(bt(i,P,f));return{c(){n=h("div"),t=h("div"),s=h("p"),s.textContent=o,p=_(),m=h("button"),A.c(),c=_(),w&&w.c(),u=_(),N($.$$.fragment),U=_(),N(C.$$.fragment),d=_(),L=h("nav"),E=h("h3"),E.textContent=q,D=_(),V=h("ul");for(let f=0;f<T.length;f+=1)T[f].c();this.h()},l(f){n=v(f,"DIV",{class:!0});var k=H(n);t=v(k,"DIV",{class:!0});var y=H(t);s=v(y,"P",{class:!0,"data-svelte-h":!0}),I(s)!=="svelte-1929lhs"&&(s.textContent=o),p=g(y),m=v(y,"BUTTON",{class:!0});var z=H(m);A.l(z),z.forEach(a),y.forEach(a),c=g(k),w&&w.l(k),u=g(k),F($.$$.fragment,k),U=g(k),F(C.$$.fragment,k),k.forEach(a),d=g(f),L=v(f,"NAV",{class:!0});var S=H(L);E=v(S,"H3",{class:!0,"data-svelte-h":!0}),I(E)!=="svelte-1hgt7fi"&&(E.textContent=q),D=g(S),V=v(S,"UL",{class:!0});var Le=H(V);for(let te=0;te<T.length;te+=1)T[te].l(Le);Le.forEach(a),S.forEach(a),this.h()},h(){b(s,"class","page-toc-small-title"),b(m,"class","page-toc-small-expand-button"),b(t,"class","page-toc-small"),b(n,"class","page-main"),b(E,"class","page-toc-title"),b(V,"class","page-ul"),b(L,"class","page-toc")},m(f,k){r(f,n,k),M(n,t),M(t,s),M(t,p),M(t,m),A.m(m,null),M(n,c),w&&w.m(n,null),M(n,u),G($,n,null),M(n,U),G(C,n,null),r(f,d,k),r(f,L,k),M(L,E),M(L,D),M(L,V);for(let y=0;y<T.length;y+=1)T[y]&&T[y].m(V,null);R=!0,ke||(ie=Ut(m,"click",i[4]),ke=!0)},p(f,[k]){if(K!==(K=W(f))&&(A.d(1),A=K(f),A&&(A.c(),A.m(m,null))),f[1]?w?w.p(f,k):(w=yt(f),w.c(),w.m(n,u)):w&&(w.d(1),w=null),k&5){P=Qe(f[0]);let y;for(y=0;y<P.length;y+=1){const z=bt(f,P,y);T[y]?T[y].p(z,k):(T[y]=Tt(z),T[y].c(),T[y].m(V,null))}for(;y<T.length;y+=1)T[y].d(1);T.length=P.length}},i(f){R||(B($.$$.fragment,f),B(C.$$.fragment,f),R=!0)},o(f){j($.$$.fragment,f),j(C.$$.fragment,f),R=!1},d(f){f&&(a(n),a(d),a(L)),A.d(),w&&w.d(),O($),O(C),Et(T,f),ke=!1,ie()}}}function rn(i,n,t){let s,o;Lt(i,J,$=>t(0,o=$));let p=!1;function m($){let U=s;for(let C=0;C<$.length;C++)if($[C].visible)return C;return U}function c(){t(1,p=!p)}const u=()=>{c()};return i.$$.update=()=>{i.$$.dirty&1&&t(2,s=m(o))},[o,p,s,c,u]}class dn extends Pt{constructor(n){super(),Ht(this,n,rn,on,Ct,{})}}export{dn as component};
//# sourceMappingURL=53.C0sdTRUv.js.map
