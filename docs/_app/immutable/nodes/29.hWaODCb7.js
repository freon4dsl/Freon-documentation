import{s as hn,A as en,a as T,e as w,H as $n,f as C,b,m as O,d as q,F as Tn,g as u,h as g,i as d,B as an,v as gn,x as tn,w as Cn,t as Z,o as nn,j as $,C as En,D as yn,E as N,q as _n,p as vn}from"../chunks/scheduler.CIEH-92L.js";import{S as wn,i as bn,e as on,c as Y,a as R,m as x,t as J,b as K,d as Q}from"../chunks/index.HLF2pGCU.js";import{e as X}from"../chunks/each.BLebZWAa.js";import{w as Fn}from"../chunks/index.bxqR-5-s.js";import{P as pn,S as ln,c as Ln,B as Mn}from"../chunks/index.D1zh88jY.js";const W=Fn([]);function Pn(o){let n;return{c(){n=Z("Customization of the Typer")},l(s){n=nn(s,"Customization of the Typer")},m(s,t){d(s,n,t)},d(s){s&&u(n)}}}function Sn(o){let n;return{c(){n=Z("Adding Typing Methods")},l(s){n=nn(s,"Adding Typing Methods")},m(s,t){d(s,n,t)},d(s){s&&u(n)}}}function Hn(o){let n,s,t,p,c,r,e=`The typer can be customized <strong>per concept</strong>. Your new typer needs to implement the
	<a href="/Documentation/Under_the_Hood/FreTool_Interfaces#fretyper-5">FreTyper interface</a>.`,l,k,M=`As a convenience, Freon generates a file <code>~/freon/typer/CustomYourLanguageNameTyperPart.ts</code>, which will not be overwritten upon
	regeneration. It already contains a class that implements this interface.`,y,E,L,P,I,G=`In the new typer class add the code you want to add in one or more of the methods. Let the method return ‘null’ to let Freon know that the
	typer from the Freon Definition Level should be used instead.`,S,H,U=`The following code changes the <code>conformsList</code> method for lists of <code>Variables</code>. It checks the lists in reverse order:
	A-B-C conforms to C-B-A.`,V,z,B,A=`<code class="language-ts"><span class="token comment">// CustomizationsProject/src/custom/typer/CustomEntityModelTyperPart.ts</span>

<span class="token comment">// Generated by the Freon Language Generator.</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> FreNode<span class="token punctuation">,</span> FreType<span class="token punctuation">,</span> FreTyper <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>Variable<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../language/gen/index.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>EntityModelEnvironment<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../config/gen/EntityModelEnvironment.js"</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Class 'CustomEntityModelTyperPart' is meant to be a convient place to add any
 * custom code for type checking.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomEntityModelTyperPart</span> <span class="token keyword">implements</span> <span class="token class-name">FreTyper</span> <span class="token punctuation">&#123;</span>
    mainTyper<span class="token operator">:</span> FreTyper<span class="token punctuation">;</span>

    <span class="token function">isType</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreNode<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">inferType</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreNode<span class="token punctuation">)</span><span class="token operator">:</span> FreType <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">equals</span><span class="token punctuation">(</span>type1<span class="token operator">:</span> FreType<span class="token punctuation">,</span> type2<span class="token operator">:</span> FreType<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">conforms</span><span class="token punctuation">(</span>type1<span class="token operator">:</span> FreType<span class="token punctuation">,</span> type2<span class="token operator">:</span> FreType<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * Example of custom typings: typelist2 conforms to typelist1 if the elements
     * conform in the opposite direction, i.e. [A, B, C] conforms to [C, B, A]
     * @param typelist1
     * @param typelist2
     */</span>
    <span class="token function">conformsList</span><span class="token punctuation">(</span>typelist1<span class="token operator">:</span> FreType<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> typelist2<span class="token operator">:</span> FreType<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>typelist1<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>typelist1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Variable</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>typelist1<span class="token punctuation">.</span>length <span class="token operator">!==</span> typelist2<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token keyword">let</span> result<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> max_length <span class="token operator">=</span> typelist1<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> typelist1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                result <span class="token operator">=</span> EntityModelEnvironment<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>typer<span class="token punctuation">.</span><span class="token function">conforms</span><span class="token punctuation">(</span>typelist1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> typelist2<span class="token punctuation">[</span>max_length <span class="token operator">-</span> i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token keyword">return</span> result<span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">commonSuper</span><span class="token punctuation">(</span>typelist<span class="token operator">:</span> FreType<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> FreType <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">public</span> <span class="token function">getSuperTypes</span><span class="token punctuation">(</span>type<span class="token operator">:</span> FreType<span class="token punctuation">)</span><span class="token operator">:</span> FreType<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
</code>`,_,F,h;n=new pn({props:{prevLink:cn,nextLink:rn}});function i(a){o[1](a)}let v={tag:"h1",id:"customization-of-the-typer-1",$$slots:{default:[Pn]},$$scope:{ctx:o}};o[0][0]!==void 0&&(v.intersecting=o[0][0]),t=new ln({props:v}),en.push(()=>on(t,"intersecting",i));function m(a){o[2](a)}let D={tag:"h2",id:"adding-typing-methods-2",$$slots:{default:[Sn]},$$scope:{ctx:o}};return o[0][1]!==void 0&&(D.intersecting=o[0][1]),E=new ln({props:D}),en.push(()=>on(E,"intersecting",m)),F=new pn({props:{prevLink:cn,nextLink:rn}}),{c(){Y(n.$$.fragment),s=T(),Y(t.$$.fragment),c=T(),r=w("p"),r.innerHTML=e,l=T(),k=w("p"),k.innerHTML=M,y=T(),Y(E.$$.fragment),P=T(),I=w("p"),I.textContent=G,S=T(),H=w("p"),H.innerHTML=U,V=T(),z=w("pre"),B=new $n(!1),_=T(),Y(F.$$.fragment),this.h()},l(a){R(n.$$.fragment,a),s=C(a),R(t.$$.fragment,a),c=C(a),r=b(a,"P",{"data-svelte-h":!0}),O(r)!=="svelte-1qnxzeb"&&(r.innerHTML=e),l=C(a),k=b(a,"P",{"data-svelte-h":!0}),O(k)!=="svelte-17ottds"&&(k.innerHTML=M),y=C(a),R(E.$$.fragment,a),P=C(a),I=b(a,"P",{"data-svelte-h":!0}),O(I)!=="svelte-1oixm5q"&&(I.textContent=G),S=C(a),H=b(a,"P",{"data-svelte-h":!0}),O(H)!=="svelte-14po27s"&&(H.innerHTML=U),V=C(a),z=b(a,"PRE",{class:!0});var f=q(z);B=Tn(f,!1),f.forEach(u),_=C(a),R(F.$$.fragment,a),this.h()},h(){B.a=null,g(z,"class","language-ts")},m(a,f){x(n,a,f),d(a,s,f),x(t,a,f),d(a,c,f),d(a,r,f),d(a,l,f),d(a,k,f),d(a,y,f),x(E,a,f),d(a,P,f),d(a,I,f),d(a,S,f),d(a,H,f),d(a,V,f),d(a,z,f),B.m(A,z),d(a,_,f),x(F,a,f),h=!0},p(a,[f]){const j={};f&16&&(j.$$scope={dirty:f,ctx:a}),!p&&f&1&&(p=!0,j.intersecting=a[0][0],an(()=>p=!1)),t.$set(j);const sn={};f&16&&(sn.$$scope={dirty:f,ctx:a}),!L&&f&1&&(L=!0,sn.intersecting=a[0][1],an(()=>L=!1)),E.$set(sn)},i(a){h||(J(n.$$.fragment,a),J(t.$$.fragment,a),J(E.$$.fragment,a),J(F.$$.fragment,a),h=!0)},o(a){K(n.$$.fragment,a),K(t.$$.fragment,a),K(E.$$.fragment,a),K(F.$$.fragment,a),h=!1},d(a){a&&(u(s),u(c),u(r),u(l),u(k),u(y),u(P),u(I),u(S),u(H),u(V),u(z),u(_)),Q(n,a),Q(t,a),Q(E,a),Q(F,a)}}}let cn="/Documentation/Customizations/Scoper_Customization",rn="/Documentation/Customizations/Validator_Customization";function qn(o,n,s){let t;gn(o,W,e=>s(3,t=e)),tn(W,t=[{title:"Customization of the Typer",visible:!1,ref:"#customization-of-the-typer-1"},{title:"Adding Typing Methods",visible:!1,ref:"#adding-typing-methods-2"}],t);let p=[];Cn(()=>{document.querySelectorAll("pre").forEach(l=>{const k=document.createElement("div");k.className="copy-prompt";const M=document.createElement("p");M.innerHTML="👆 Click to copy",M.className="copy-prompt-p";const y=document.createElement("img");y.src="/icons/copy-icon.svg",y.className="copy-prompt-img",k.appendChild(y),k.appendChild(M),l.appendChild(k),l.querySelector(".copy-prompt > p").addEventListener("click",E=>{Ln(l.querySelector("code").textContent),l.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{l.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function c(e){o.$$.not_equal(p[0],e)&&(p[0]=e,s(0,p))}function r(e){o.$$.not_equal(p[1],e)&&(p[1]=e,s(0,p))}return o.$$.update=()=>{o.$$.dirty&1&&tn(W,t[0].visible=p[0],t),o.$$.dirty&1&&tn(W,t[1].visible=p[1],t)},[p,c,r]}class An extends wn{constructor(n){super(),bn(this,n,qn,Hn,hn,{})}}function un(o,n,s){const t=o.slice();return t[6]=n[s],t[8]=s,t}function kn(o,n,s){const t=o.slice();return t[6]=n[s],t[8]=s,t}function In(o){let n,s;return{c(){n=w("img"),this.h()},l(t){n=b(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(n,"class","page-toc-small-img"),vn(n.src,s="/icons/down-arrow.png")||g(n,"src",s),g(n,"alt","arrow down")},m(t,p){d(t,n,p)},d(t){t&&u(n)}}}function zn(o){let n,s;return{c(){n=w("img"),this.h()},l(t){n=b(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(n,"class","page-toc-small-img"),vn(n.src,s="/icons/upload.png")||g(n,"src",s),g(n,"alt","arrow up")},m(t,p){d(t,n,p)},d(t){t&&u(n)}}}function fn(o){let n,s,t=X(o[0]),p=[];for(let c=0;c<t.length;c+=1)p[c]=mn(kn(o,t,c));return{c(){n=w("div"),s=w("ul");for(let c=0;c<p.length;c+=1)p[c].c();this.h()},l(c){n=b(c,"DIV",{class:!0});var r=q(n);s=b(r,"UL",{class:!0});var e=q(s);for(let l=0;l<p.length;l+=1)p[l].l(e);e.forEach(u),r.forEach(u),this.h()},h(){g(s,"class","page-ul"),g(n,"class","toc-details")},m(c,r){d(c,n,r),$(n,s);for(let e=0;e<p.length;e+=1)p[e]&&p[e].m(s,null)},p(c,r){if(r&5){t=X(c[0]);let e;for(e=0;e<t.length;e+=1){const l=kn(c,t,e);p[e]?p[e].p(l,r):(p[e]=mn(l),p[e].c(),p[e].m(s,null))}for(;e<p.length;e+=1)p[e].d(1);p.length=t.length}},d(c){c&&u(n),yn(p,c)}}}function mn(o){let n,s,t=o[6].title+"",p,c,r;return{c(){n=w("li"),s=w("a"),p=Z(t),r=T(),this.h()},l(e){n=b(e,"LI",{class:!0});var l=q(n);s=b(l,"A",{href:!0});var k=q(s);p=nn(k,t),k.forEach(u),r=C(l),l.forEach(u),this.h()},h(){g(s,"href",c=o[6].ref),N(s,"page-visible",o[8]===o[2]),N(s,"page-nonvisible",o[8]!==o[2]),g(n,"class","page-toc-text")},m(e,l){d(e,n,l),$(n,s),$(s,p),$(n,r)},p(e,l){l&1&&t!==(t=e[6].title+"")&&_n(p,t),l&1&&c!==(c=e[6].ref)&&g(s,"href",c),l&4&&N(s,"page-visible",e[8]===e[2]),l&4&&N(s,"page-nonvisible",e[8]!==e[2])},d(e){e&&u(n)}}}function dn(o){let n,s,t=o[6].title+"",p,c,r;return{c(){n=w("li"),s=w("a"),p=Z(t),r=T(),this.h()},l(e){n=b(e,"LI",{class:!0});var l=q(n);s=b(l,"A",{href:!0});var k=q(s);p=nn(k,t),k.forEach(u),r=C(l),l.forEach(u),this.h()},h(){g(s,"href",c=o[6].ref),N(s,"page-visible",o[8]===o[2]),N(s,"page-nonvisible",o[8]!==o[2]),g(n,"class","page-toc-text")},m(e,l){d(e,n,l),$(n,s),$(s,p),$(n,r)},p(e,l){l&1&&t!==(t=e[6].title+"")&&_n(p,t),l&1&&c!==(c=e[6].ref)&&g(s,"href",c),l&4&&N(s,"page-visible",e[8]===e[2]),l&4&&N(s,"page-nonvisible",e[8]!==e[2])},d(e){e&&u(n)}}}function Bn(o){let n,s,t,p="On this page ...",c,r,e,l,k,M,y,E,L,P,I="On this page",G,S,H,U,V;function z(i,v){return i[1]?zn:In}let B=z(o),A=B(o),_=o[1]&&fn(o);k=new Mn({}),y=new An({});let F=X(o[0]),h=[];for(let i=0;i<F.length;i+=1)h[i]=dn(un(o,F,i));return{c(){n=w("div"),s=w("div"),t=w("p"),t.textContent=p,c=T(),r=w("button"),A.c(),e=T(),_&&_.c(),l=T(),Y(k.$$.fragment),M=T(),Y(y.$$.fragment),E=T(),L=w("nav"),P=w("h3"),P.textContent=I,G=T(),S=w("ul");for(let i=0;i<h.length;i+=1)h[i].c();this.h()},l(i){n=b(i,"DIV",{class:!0});var v=q(n);s=b(v,"DIV",{class:!0});var m=q(s);t=b(m,"P",{class:!0,"data-svelte-h":!0}),O(t)!=="svelte-1929lhs"&&(t.textContent=p),c=C(m),r=b(m,"BUTTON",{class:!0});var D=q(r);A.l(D),D.forEach(u),m.forEach(u),e=C(v),_&&_.l(v),l=C(v),R(k.$$.fragment,v),M=C(v),R(y.$$.fragment,v),v.forEach(u),E=C(i),L=b(i,"NAV",{class:!0});var a=q(L);P=b(a,"H3",{class:!0,"data-svelte-h":!0}),O(P)!=="svelte-1hgt7fi"&&(P.textContent=I),G=C(a),S=b(a,"UL",{class:!0});var f=q(S);for(let j=0;j<h.length;j+=1)h[j].l(f);f.forEach(u),a.forEach(u),this.h()},h(){g(t,"class","page-toc-small-title"),g(r,"class","page-toc-small-expand-button"),g(s,"class","page-toc-small"),g(n,"class","page-main"),g(P,"class","page-toc-title"),g(S,"class","page-ul"),g(L,"class","page-toc")},m(i,v){d(i,n,v),$(n,s),$(s,t),$(s,c),$(s,r),A.m(r,null),$(n,e),_&&_.m(n,null),$(n,l),x(k,n,null),$(n,M),x(y,n,null),d(i,E,v),d(i,L,v),$(L,P),$(L,G),$(L,S);for(let m=0;m<h.length;m+=1)h[m]&&h[m].m(S,null);H=!0,U||(V=En(r,"click",o[4]),U=!0)},p(i,[v]){if(B!==(B=z(i))&&(A.d(1),A=B(i),A&&(A.c(),A.m(r,null))),i[1]?_?_.p(i,v):(_=fn(i),_.c(),_.m(n,l)):_&&(_.d(1),_=null),v&5){F=X(i[0]);let m;for(m=0;m<F.length;m+=1){const D=un(i,F,m);h[m]?h[m].p(D,v):(h[m]=dn(D),h[m].c(),h[m].m(S,null))}for(;m<h.length;m+=1)h[m].d(1);h.length=F.length}},i(i){H||(J(k.$$.fragment,i),J(y.$$.fragment,i),H=!0)},o(i){K(k.$$.fragment,i),K(y.$$.fragment,i),H=!1},d(i){i&&(u(n),u(E),u(L)),A.d(),_&&_.d(),Q(k),Q(y),yn(h,i),U=!1,V()}}}function Dn(o,n,s){let t,p;gn(o,W,k=>s(0,p=k));let c=!1;function r(k){let M=t;for(let y=0;y<k.length;y++)if(k[y].visible)return y;return M}function e(){s(1,c=!c)}const l=()=>{e()};return o.$$.update=()=>{o.$$.dirty&1&&s(2,t=r(p))},[p,c,t,e,l]}class On extends wn{constructor(n){super(),bn(this,n,Dn,Bn,hn,{})}}export{On as component};
//# sourceMappingURL=29.hWaODCb7.js.map
