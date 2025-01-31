import{s as xe,A as re,a as x,e as b,H as pe,f as L,b as y,m as ee,d as P,F as ce,g as p,h as g,i as k,B as ue,v as Le,x as oe,w as Me,t as se,o as ne,j as C,C as Ne,D as Ce,E as A,q as Te,p as Pe}from"../chunks/scheduler.CIEH-92L.js";import{S as Fe,i as Se,e as fe,c as O,a as G,m as z,t as W,b as Y,d as J}from"../chunks/index.HLF2pGCU.js";import{e as le}from"../chunks/each.BLebZWAa.js";import{w as He}from"../chunks/index.bxqR-5-s.js";import{P as ge,S as me,c as Ie,B as Ue}from"../chunks/index.D1zh88jY.js";const Z=He([]);function Ae(a){let e;return{c(){e=se("The Expressions DSL")},l(s){e=ne(s,"The Expressions DSL")},m(s,n){k(s,e,n)},d(s){s&&p(e)}}}function je(a){let e;return{c(){e=se("Numeric Expressions")},l(s){e=ne(s,"Numeric Expressions")},m(s,n){k(s,e,n)},d(s){s&&p(e)}}}function Re(a){let e;return{c(){e=se("Functions")},l(s){e=ne(s,"Functions")},m(s,n){k(s,e,n)},d(s){s&&p(e)}}}function Ve(a){let e,s,n,l,r,u,o=`Before explaining the interpreter framwework, we take a look at the following simple DSL, which will be used as an example. It is defined
	with a single model unit called <code>ExpressionUnit</code> that contains both function definitions and expressions. You can check out
	this language by creating a new Freon project with <code>npm create Freon</code> and then selecting the <code>Expressions</code> language.`,i,m,T,E=`<code class="language-freon"><span class="token comment">// Expressions/src/defs/Expressions.ast#L1-L11
</span>
language Expressions

<span class="token keyword">model</span> <span class="token class-name">Expressions</span> &#123;
    name: <span class="token builtin">identifier</span>;
    units: <span class="token class-name">ExpressionUnit</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">ExpressionUnit</span> &#123;
    functions: <span class="token class-name">Function</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    expressions: <span class="token class-name">Expression</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;</code>`,F,$,S,j,D,N=`Added are some basic expression concepts to represent numeric expressions: a NumberLiteralExpression and the standard binary expressions.
	Note that we specify the priorities of the binary operators to allow straightforward editing (see <a href="/Documentation/Defining_an_Editor/Binary_Expressions">Binary Expressions</a>):`,I,B,R,te=`<code class="language-freon"><span class="token comment">// Expressions/src/defs/Expressions.ast#L15-L40
</span>
<span class="token keyword">abstract</span> <span class="token keyword">expression</span> <span class="token class-name">Expression</span> &#123; &#125;

<span class="token keyword">expression</span> NumberLiteralExpression <span class="token keyword">base</span> <span class="token class-name">Expression</span> &#123;
    value: <span class="token builtin">number</span>;
&#125;

<span class="token keyword">abstract</span> <span class="token keyword">binary</span> <span class="token keyword">expression</span> BinaryExpression <span class="token keyword">base</span> <span class="token class-name">Expression</span> &#123;
    left: <span class="token class-name">Expression</span>;
    right: <span class="token class-name">Expression</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> MultiplyExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">8</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> PlusExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">4</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> MinusExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">4</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> DivideExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">8</span>;
&#125;</code>`,U,w,v,q,_,c="We also add concepts to represent functions, both function definitions and function calls:",h,d,H,K=`<code class="language-freon"><span class="token comment">// Expressions/src/defs/Expressions.ast#L42-L61
</span>
<span class="token keyword">concept</span> <span class="token class-name">Function</span> &#123;
    name: <span class="token builtin">identifier</span>;
    body: <span class="token class-name">Expression</span>;
    parameters: <span class="token class-name">Parameter</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    <span class="token keyword">reference</span> declaredType : <span class="token class-name">Type</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Parameter</span> &#123;
    name: <span class="token builtin">identifier</span>;
    <span class="token keyword">reference</span> declaredType: <span class="token class-name">Type</span>;
&#125;

<span class="token keyword">expression</span> ParameterRef <span class="token keyword">base</span> <span class="token class-name">Expression</span> &#123;
    <span class="token keyword">reference</span> parameter: <span class="token class-name">Parameter</span>;
&#125;

<span class="token keyword">expression</span> FunctionCallExpression <span class="token keyword">base</span> <span class="token class-name">Expression</span> &#123;
    <span class="token keyword">reference</span> calledFunction: <span class="token class-name">Function</span>;
    arguments: <span class="token class-name">Expression</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;</code>`,V,M,ae;e=new ge({props:{prevLink:he,nextLink:be}});function De(t){a[1](t)}let de={tag:"h1",id:"the-expressions-dsl-1",$$slots:{default:[Ae]},$$scope:{ctx:a}};a[0][0]!==void 0&&(de.intersecting=a[0][0]),n=new me({props:de}),re.push(()=>fe(n,"intersecting",De));function Be(t){a[2](t)}let ke={tag:"h2",id:"numeric-expressions-2",$$slots:{default:[je]},$$scope:{ctx:a}};a[0][1]!==void 0&&(ke.intersecting=a[0][1]),$=new me({props:ke}),re.push(()=>fe($,"intersecting",Be));function qe(t){a[3](t)}let _e={tag:"h2",id:"functions-3",$$slots:{default:[Re]},$$scope:{ctx:a}};return a[0][2]!==void 0&&(_e.intersecting=a[0][2]),w=new me({props:_e}),re.push(()=>fe(w,"intersecting",qe)),M=new ge({props:{prevLink:he,nextLink:be}}),{c(){O(e.$$.fragment),s=x(),O(n.$$.fragment),r=x(),u=b("p"),u.innerHTML=o,i=x(),m=b("pre"),T=new pe(!1),F=x(),O($.$$.fragment),j=x(),D=b("p"),D.innerHTML=N,I=x(),B=b("pre"),R=new pe(!1),U=x(),O(w.$$.fragment),q=x(),_=b("p"),_.textContent=c,h=x(),d=b("pre"),H=new pe(!1),V=x(),O(M.$$.fragment),this.h()},l(t){G(e.$$.fragment,t),s=L(t),G(n.$$.fragment,t),r=L(t),u=y(t,"P",{"data-svelte-h":!0}),ee(u)!=="svelte-i6txoz"&&(u.innerHTML=o),i=L(t),m=y(t,"PRE",{class:!0});var f=P(m);T=ce(f,!1),f.forEach(p),F=L(t),G($.$$.fragment,t),j=L(t),D=y(t,"P",{"data-svelte-h":!0}),ee(D)!=="svelte-13j3pjq"&&(D.innerHTML=N),I=L(t),B=y(t,"PRE",{class:!0});var Q=P(B);R=ce(Q,!1),Q.forEach(p),U=L(t),G(w.$$.fragment,t),q=L(t),_=y(t,"P",{"data-svelte-h":!0}),ee(_)!=="svelte-1gbplh2"&&(_.textContent=c),h=L(t),d=y(t,"PRE",{class:!0});var X=P(d);H=ce(X,!1),X.forEach(p),V=L(t),G(M.$$.fragment,t),this.h()},h(){T.a=null,g(m,"class","language-freon"),R.a=null,g(B,"class","language-freon"),H.a=null,g(d,"class","language-freon")},m(t,f){z(e,t,f),k(t,s,f),z(n,t,f),k(t,r,f),k(t,u,f),k(t,i,f),k(t,m,f),T.m(E,m),k(t,F,f),z($,t,f),k(t,j,f),k(t,D,f),k(t,I,f),k(t,B,f),R.m(te,B),k(t,U,f),z(w,t,f),k(t,q,f),k(t,_,f),k(t,h,f),k(t,d,f),H.m(K,d),k(t,V,f),z(M,t,f),ae=!0},p(t,[f]){const Q={};f&32&&(Q.$$scope={dirty:f,ctx:t}),!l&&f&1&&(l=!0,Q.intersecting=t[0][0],ue(()=>l=!1)),n.$set(Q);const X={};f&32&&(X.$$scope={dirty:f,ctx:t}),!S&&f&1&&(S=!0,X.intersecting=t[0][1],ue(()=>S=!1)),$.$set(X);const ie={};f&32&&(ie.$$scope={dirty:f,ctx:t}),!v&&f&1&&(v=!0,ie.intersecting=t[0][2],ue(()=>v=!1)),w.$set(ie)},i(t){ae||(W(e.$$.fragment,t),W(n.$$.fragment,t),W($.$$.fragment,t),W(w.$$.fragment,t),W(M.$$.fragment,t),ae=!0)},o(t){Y(e.$$.fragment,t),Y(n.$$.fragment,t),Y($.$$.fragment,t),Y(w.$$.fragment,t),Y(M.$$.fragment,t),ae=!1},d(t){t&&(p(s),p(r),p(u),p(i),p(m),p(F),p(j),p(D),p(I),p(B),p(U),p(q),p(_),p(h),p(d),p(V)),J(e,t),J(n,t),J($,t),J(w,t),J(M,t)}}}let he="/Documentation/Interpreter_Framework",be="/Documentation/Interpreter_Framework/Understanding_the_Framework";function Oe(a,e,s){let n;Le(a,Z,i=>s(4,n=i)),oe(Z,n=[{title:"The Expressions DSL",visible:!1,ref:"#the-expressions-dsl-1"},{title:"Numeric Expressions",visible:!1,ref:"#numeric-expressions-2"},{title:"Functions",visible:!1,ref:"#functions-3"}],n);let l=[];Me(()=>{document.querySelectorAll("pre").forEach(m=>{const T=document.createElement("div");T.className="copy-prompt";const E=document.createElement("p");E.innerHTML="👆 Click to copy",E.className="copy-prompt-p";const F=document.createElement("img");F.src="/icons/copy-icon.svg",F.className="copy-prompt-img",T.appendChild(F),T.appendChild(E),m.appendChild(T),m.querySelector(".copy-prompt > p").addEventListener("click",$=>{Ie(m.querySelector("code").textContent),m.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{m.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function r(i){a.$$.not_equal(l[0],i)&&(l[0]=i,s(0,l))}function u(i){a.$$.not_equal(l[1],i)&&(l[1]=i,s(0,l))}function o(i){a.$$.not_equal(l[2],i)&&(l[2]=i,s(0,l))}return a.$$.update=()=>{a.$$.dirty&1&&oe(Z,n[0].visible=l[0],n),a.$$.dirty&1&&oe(Z,n[1].visible=l[1],n),a.$$.dirty&1&&oe(Z,n[2].visible=l[2],n)},[l,r,u,o]}class Ge extends Fe{constructor(e){super(),Se(this,e,Oe,Ve,xe,{})}}function ye(a,e,s){const n=a.slice();return n[6]=e[s],n[8]=s,n}function $e(a,e,s){const n=a.slice();return n[6]=e[s],n[8]=s,n}function ze(a){let e,s;return{c(){e=b("img"),this.h()},l(n){e=y(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","page-toc-small-img"),Pe(e.src,s="/icons/down-arrow.png")||g(e,"src",s),g(e,"alt","arrow down")},m(n,l){k(n,e,l)},d(n){n&&p(e)}}}function We(a){let e,s;return{c(){e=b("img"),this.h()},l(n){e=y(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","page-toc-small-img"),Pe(e.src,s="/icons/upload.png")||g(e,"src",s),g(e,"alt","arrow up")},m(n,l){k(n,e,l)},d(n){n&&p(e)}}}function ve(a){let e,s,n=le(a[0]),l=[];for(let r=0;r<n.length;r+=1)l[r]=we($e(a,n,r));return{c(){e=b("div"),s=b("ul");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=y(r,"DIV",{class:!0});var u=P(e);s=y(u,"UL",{class:!0});var o=P(s);for(let i=0;i<l.length;i+=1)l[i].l(o);o.forEach(p),u.forEach(p),this.h()},h(){g(s,"class","page-ul"),g(e,"class","toc-details")},m(r,u){k(r,e,u),C(e,s);for(let o=0;o<l.length;o+=1)l[o]&&l[o].m(s,null)},p(r,u){if(u&5){n=le(r[0]);let o;for(o=0;o<n.length;o+=1){const i=$e(r,n,o);l[o]?l[o].p(i,u):(l[o]=we(i),l[o].c(),l[o].m(s,null))}for(;o<l.length;o+=1)l[o].d(1);l.length=n.length}},d(r){r&&p(e),Ce(l,r)}}}function we(a){let e,s,n=a[6].title+"",l,r,u;return{c(){e=b("li"),s=b("a"),l=se(n),u=x(),this.h()},l(o){e=y(o,"LI",{class:!0});var i=P(e);s=y(i,"A",{href:!0});var m=P(s);l=ne(m,n),m.forEach(p),u=L(i),i.forEach(p),this.h()},h(){g(s,"href",r=a[6].ref),A(s,"page-visible",a[8]===a[2]),A(s,"page-nonvisible",a[8]!==a[2]),g(e,"class","page-toc-text")},m(o,i){k(o,e,i),C(e,s),C(s,l),C(e,u)},p(o,i){i&1&&n!==(n=o[6].title+"")&&Te(l,n),i&1&&r!==(r=o[6].ref)&&g(s,"href",r),i&4&&A(s,"page-visible",o[8]===o[2]),i&4&&A(s,"page-nonvisible",o[8]!==o[2])},d(o){o&&p(e)}}}function Ee(a){let e,s,n=a[6].title+"",l,r,u;return{c(){e=b("li"),s=b("a"),l=se(n),u=x(),this.h()},l(o){e=y(o,"LI",{class:!0});var i=P(e);s=y(i,"A",{href:!0});var m=P(s);l=ne(m,n),m.forEach(p),u=L(i),i.forEach(p),this.h()},h(){g(s,"href",r=a[6].ref),A(s,"page-visible",a[8]===a[2]),A(s,"page-nonvisible",a[8]!==a[2]),g(e,"class","page-toc-text")},m(o,i){k(o,e,i),C(e,s),C(s,l),C(e,u)},p(o,i){i&1&&n!==(n=o[6].title+"")&&Te(l,n),i&1&&r!==(r=o[6].ref)&&g(s,"href",r),i&4&&A(s,"page-visible",o[8]===o[2]),i&4&&A(s,"page-nonvisible",o[8]!==o[2])},d(o){o&&p(e)}}}function Ye(a){let e,s,n,l="On this page ...",r,u,o,i,m,T,E,F,$,S,j="On this page",D,N,I,B,R;function te(c,h){return c[1]?We:ze}let U=te(a),w=U(a),v=a[1]&&ve(a);m=new Ue({}),E=new Ge({});let q=le(a[0]),_=[];for(let c=0;c<q.length;c+=1)_[c]=Ee(ye(a,q,c));return{c(){e=b("div"),s=b("div"),n=b("p"),n.textContent=l,r=x(),u=b("button"),w.c(),o=x(),v&&v.c(),i=x(),O(m.$$.fragment),T=x(),O(E.$$.fragment),F=x(),$=b("nav"),S=b("h3"),S.textContent=j,D=x(),N=b("ul");for(let c=0;c<_.length;c+=1)_[c].c();this.h()},l(c){e=y(c,"DIV",{class:!0});var h=P(e);s=y(h,"DIV",{class:!0});var d=P(s);n=y(d,"P",{class:!0,"data-svelte-h":!0}),ee(n)!=="svelte-1929lhs"&&(n.textContent=l),r=L(d),u=y(d,"BUTTON",{class:!0});var H=P(u);w.l(H),H.forEach(p),d.forEach(p),o=L(h),v&&v.l(h),i=L(h),G(m.$$.fragment,h),T=L(h),G(E.$$.fragment,h),h.forEach(p),F=L(c),$=y(c,"NAV",{class:!0});var K=P($);S=y(K,"H3",{class:!0,"data-svelte-h":!0}),ee(S)!=="svelte-1hgt7fi"&&(S.textContent=j),D=L(K),N=y(K,"UL",{class:!0});var V=P(N);for(let M=0;M<_.length;M+=1)_[M].l(V);V.forEach(p),K.forEach(p),this.h()},h(){g(n,"class","page-toc-small-title"),g(u,"class","page-toc-small-expand-button"),g(s,"class","page-toc-small"),g(e,"class","page-main"),g(S,"class","page-toc-title"),g(N,"class","page-ul"),g($,"class","page-toc")},m(c,h){k(c,e,h),C(e,s),C(s,n),C(s,r),C(s,u),w.m(u,null),C(e,o),v&&v.m(e,null),C(e,i),z(m,e,null),C(e,T),z(E,e,null),k(c,F,h),k(c,$,h),C($,S),C($,D),C($,N);for(let d=0;d<_.length;d+=1)_[d]&&_[d].m(N,null);I=!0,B||(R=Ne(u,"click",a[4]),B=!0)},p(c,[h]){if(U!==(U=te(c))&&(w.d(1),w=U(c),w&&(w.c(),w.m(u,null))),c[1]?v?v.p(c,h):(v=ve(c),v.c(),v.m(e,i)):v&&(v.d(1),v=null),h&5){q=le(c[0]);let d;for(d=0;d<q.length;d+=1){const H=ye(c,q,d);_[d]?_[d].p(H,h):(_[d]=Ee(H),_[d].c(),_[d].m(N,null))}for(;d<_.length;d+=1)_[d].d(1);_.length=q.length}},i(c){I||(W(m.$$.fragment,c),W(E.$$.fragment,c),I=!0)},o(c){Y(m.$$.fragment,c),Y(E.$$.fragment,c),I=!1},d(c){c&&(p(e),p(F),p($)),w.d(),v&&v.d(),J(m),J(E),Ce(_,c),B=!1,R()}}}function Je(a,e,s){let n,l;Le(a,Z,m=>s(0,l=m));let r=!1;function u(m){let T=n;for(let E=0;E<m.length;E++)if(m[E].visible)return E;return T}function o(){s(1,r=!r)}const i=()=>{o()};return a.$$.update=()=>{a.$$.dirty&1&&s(2,n=u(l))},[l,r,n,o,i]}class ss extends Fe{constructor(e){super(),Se(this,e,Je,Ye,xe,{})}}export{ss as component};
//# sourceMappingURL=45.DcC8rGh4.js.map
