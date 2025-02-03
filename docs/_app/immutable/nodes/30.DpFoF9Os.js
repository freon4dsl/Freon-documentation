import{s as ze,A as ke,a as b,e as g,H as he,f as w,b as _,m as x,d as F,F as ge,g as c,h as v,i as d,B as _e,v as Se,x as fe,w as We,t as oe,o as le,j as C,C as Ge,D as Ve,E as U,q as qe,p as De}from"../chunks/scheduler.CIEH-92L.js";import{S as Ae,i as je,e as ve,c as Y,a as J,m as K,t as Q,b as X,d as Z}from"../chunks/index.HLF2pGCU.js";import{e as me}from"../chunks/each.BLebZWAa.js";import{w as Oe}from"../chunks/index.bxqR-5-s.js";import{P as Ce,S as $e,c as Re,B as Ye}from"../chunks/index.CLjbMqgA.js";const se=Oe([]);function Je(a){let e;return{c(){e=oe("Customization of the Validator")},l(n){e=le(n,"Customization of the Validator")},m(n,s){d(n,e,s)},d(n){n&&c(e)}}}function Ke(a){let e;return{c(){e=oe("The Checker Interface")},l(n){e=le(n,"The Checker Interface")},m(n,s){d(n,e,s)},d(n){n&&c(e)}}}function Qe(a){let e;return{c(){e=oe("The Validation Class")},l(n){e=le(n,"The Validation Class")},m(n,s){d(n,e,s)},d(n){n&&c(e)}}}function Xe(a){let e,n,s,l,r,f,o='The validator can be adjusted by adding a single Typescript class. This class should implement the generated <a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frevalidator-4">checker interface</a> of the validator, adding checks per node of the AST that is visited.',i,m,L,y,T,I=`For each language a checker interface is generated. This interface is an extension of the worker part of the visitor pattern, adding an
	error list.`,P,V,B,D=`<code class="language-ts"><span class="token comment">// CustomizationsProject/src/freon/validator/gen/EntityModelValidator.ts#L15-L17</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">EntityModelCheckerInterface</span> <span class="token keyword">extends</span> <span class="token class-name">EntityModelWorker</span> <span class="token punctuation">&#123;</span>
    errorList<span class="token operator">:</span> FreError<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,A,z,ae="The worker defines two methods for each concept in the language, as shown in the next example.",W,H,M,E=`<code class="language-ts"><span class="token comment">// CustomizationsProject/src/freon/utils/gen/EntityModelWorker.ts#L56-L57</span>

<span class="token function">execBeforeEntity</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> Entity<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token function">execAfterEntity</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> Entity<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span></code>`,S,h,u,$,k,N=`As a convenience, Freon generates a file <code>~/freon/validator/CustomYourLanguageNameValidator.ts</code>, which will not be overwritten
	upon regeneration. This validator should implement the checker interface.`,j,q,ee=`You can give a custom implementation for any of the methods of the default worker. This method will override the (empty) default
	implementation. Any validation errors should be pushed onto the <code>errorList</code> attribute. Note that each error must implement the
	<a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frevalidator-4">FreError</a> interface.`,ie,G,ye=`The result of the above could look something like the following. In this example only nodes of type <code>EntityFunction</code> are
	checked. If the name of the node equals <code>determine</code> than an error is pushed on the <code>errorList</code>. If you want the
	walker to stop when an erroneous node is found you should return <code>true</code>, else return <code>false</code>.`,ce,O,re,Be=`<code class="language-ts"><span class="token comment">// CustomizationsProject/src/custom/validator/CustomEntityModelValidator.ts</span>

<span class="token comment">// Generated by the Freon Language Generator.</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> FreError<span class="token punctuation">,</span> FreErrorSeverity <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> EntityModelDefaultWorker <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../utils/gen/EntityModelDefaultWorker.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> EntityModelCheckerInterface <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"./gen/EntityModelValidator.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>EntityFunction<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../language/gen/index.js"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomEntityModelValidator</span> <span class="token keyword">extends</span> <span class="token class-name">EntityModelDefaultWorker</span> <span class="token keyword">implements</span> <span class="token class-name">EntityModelCheckerInterface</span> <span class="token punctuation">&#123;</span>
    errorList<span class="token operator">:</span> FreError<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * Example of a custom validation. Every EntityFunction with name 'determine' is considered incorrect.
     * @param modelelement
     */</span>
    <span class="token keyword">public</span> <span class="token function">execBeforeEntityFunction</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> EntityFunction<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>modelelement<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string">"determine"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>errorList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>
                <span class="token keyword">new</span> <span class="token class-name">FreError</span><span class="token punctuation">(</span>
                    <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">"determine" is a terrible name for a Function</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span>
                    modelelement<span class="token punctuation">,</span>
                    modelelement<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
                    FreErrorSeverity<span class="token punctuation">.</span>Error
                <span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
</code>`,pe,R,ue;e=new Ce({props:{prevLink:Te,nextLink:Le}});function Ne(t){a[1](t)}let be={tag:"h1",id:"customization-of-the-validator-1",$$slots:{default:[Je]},$$scope:{ctx:a}};a[0][0]!==void 0&&(be.intersecting=a[0][0]),s=new $e({props:be}),ke.push(()=>ve(s,"intersecting",Ne));function xe(t){a[2](t)}let we={tag:"h2",id:"the-checker-interface-2",$$slots:{default:[Ke]},$$scope:{ctx:a}};a[0][1]!==void 0&&(we.intersecting=a[0][1]),m=new $e({props:we}),ke.push(()=>ve(m,"intersecting",xe));function Ue(t){a[3](t)}let Ee={tag:"h2",id:"the-validation-class-3",$$slots:{default:[Qe]},$$scope:{ctx:a}};return a[0][2]!==void 0&&(Ee.intersecting=a[0][2]),h=new $e({props:Ee}),ke.push(()=>ve(h,"intersecting",Ue)),R=new Ce({props:{prevLink:Te,nextLink:Le}}),{c(){Y(e.$$.fragment),n=b(),Y(s.$$.fragment),r=b(),f=g("p"),f.innerHTML=o,i=b(),Y(m.$$.fragment),y=b(),T=g("p"),T.textContent=I,P=b(),V=g("pre"),B=new he(!1),A=b(),z=g("p"),z.textContent=ae,W=b(),H=g("pre"),M=new he(!1),S=b(),Y(h.$$.fragment),$=b(),k=g("p"),k.innerHTML=N,j=b(),q=g("p"),q.innerHTML=ee,ie=b(),G=g("p"),G.innerHTML=ye,ce=b(),O=g("pre"),re=new he(!1),pe=b(),Y(R.$$.fragment),this.h()},l(t){J(e.$$.fragment,t),n=w(t),J(s.$$.fragment,t),r=w(t),f=_(t,"P",{"data-svelte-h":!0}),x(f)!=="svelte-aywzhw"&&(f.innerHTML=o),i=w(t),J(m.$$.fragment,t),y=w(t),T=_(t,"P",{"data-svelte-h":!0}),x(T)!=="svelte-zsnlo4"&&(T.textContent=I),P=w(t),V=_(t,"PRE",{class:!0});var p=F(V);B=ge(p,!1),p.forEach(c),A=w(t),z=_(t,"P",{"data-svelte-h":!0}),x(z)!=="svelte-7kaf5v"&&(z.textContent=ae),W=w(t),H=_(t,"PRE",{class:!0});var te=F(H);M=ge(te,!1),te.forEach(c),S=w(t),J(h.$$.fragment,t),$=w(t),k=_(t,"P",{"data-svelte-h":!0}),x(k)!=="svelte-zoognr"&&(k.innerHTML=N),j=w(t),q=_(t,"P",{"data-svelte-h":!0}),x(q)!=="svelte-1f7q90g"&&(q.innerHTML=ee),ie=w(t),G=_(t,"P",{"data-svelte-h":!0}),x(G)!=="svelte-t92f88"&&(G.innerHTML=ye),ce=w(t),O=_(t,"PRE",{class:!0});var ne=F(O);re=ge(ne,!1),ne.forEach(c),pe=w(t),J(R.$$.fragment,t),this.h()},h(){B.a=null,v(V,"class","language-ts"),M.a=null,v(H,"class","language-ts"),re.a=null,v(O,"class","language-ts")},m(t,p){K(e,t,p),d(t,n,p),K(s,t,p),d(t,r,p),d(t,f,p),d(t,i,p),K(m,t,p),d(t,y,p),d(t,T,p),d(t,P,p),d(t,V,p),B.m(D,V),d(t,A,p),d(t,z,p),d(t,W,p),d(t,H,p),M.m(E,H),d(t,S,p),K(h,t,p),d(t,$,p),d(t,k,p),d(t,j,p),d(t,q,p),d(t,ie,p),d(t,G,p),d(t,ce,p),d(t,O,p),re.m(Be,O),d(t,pe,p),K(R,t,p),ue=!0},p(t,[p]){const te={};p&32&&(te.$$scope={dirty:p,ctx:t}),!l&&p&1&&(l=!0,te.intersecting=t[0][0],_e(()=>l=!1)),s.$set(te);const ne={};p&32&&(ne.$$scope={dirty:p,ctx:t}),!L&&p&1&&(L=!0,ne.intersecting=t[0][1],_e(()=>L=!1)),m.$set(ne);const de={};p&32&&(de.$$scope={dirty:p,ctx:t}),!u&&p&1&&(u=!0,de.intersecting=t[0][2],_e(()=>u=!1)),h.$set(de)},i(t){ue||(Q(e.$$.fragment,t),Q(s.$$.fragment,t),Q(m.$$.fragment,t),Q(h.$$.fragment,t),Q(R.$$.fragment,t),ue=!0)},o(t){X(e.$$.fragment,t),X(s.$$.fragment,t),X(m.$$.fragment,t),X(h.$$.fragment,t),X(R.$$.fragment,t),ue=!1},d(t){t&&(c(n),c(r),c(f),c(i),c(y),c(T),c(P),c(V),c(A),c(z),c(W),c(H),c(S),c($),c(k),c(j),c(q),c(ie),c(G),c(ce),c(O),c(pe)),Z(e,t),Z(s,t),Z(m,t),Z(h,t),Z(R,t)}}}let Te="/Documentation/Customizations/Typer_Customization",Le="/Documentation/Customizations/Other_Customizations";function Ze(a,e,n){let s;Se(a,se,i=>n(4,s=i)),fe(se,s=[{title:"Customization of the Validator",visible:!1,ref:"#customization-of-the-validator-1"},{title:"The Checker Interface",visible:!1,ref:"#the-checker-interface-2"},{title:"The Validation Class",visible:!1,ref:"#the-validation-class-3"}],s);let l=[];We(()=>{document.querySelectorAll("pre").forEach(m=>{const L=document.createElement("div");L.className="copy-prompt";const y=document.createElement("p");y.innerHTML="👆 Click to copy",y.className="copy-prompt-p";const T=document.createElement("img");T.src="/icons/copy-icon.svg",T.className="copy-prompt-img",L.appendChild(T),L.appendChild(y),m.appendChild(L),m.querySelector(".copy-prompt > p").addEventListener("click",I=>{Re(m.querySelector("code").textContent),m.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{m.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function r(i){a.$$.not_equal(l[0],i)&&(l[0]=i,n(0,l))}function f(i){a.$$.not_equal(l[1],i)&&(l[1]=i,n(0,l))}function o(i){a.$$.not_equal(l[2],i)&&(l[2]=i,n(0,l))}return a.$$.update=()=>{a.$$.dirty&1&&fe(se,s[0].visible=l[0],s),a.$$.dirty&1&&fe(se,s[1].visible=l[1],s),a.$$.dirty&1&&fe(se,s[2].visible=l[2],s)},[l,r,f,o]}class et extends Ae{constructor(e){super(),je(this,e,Ze,Xe,ze,{})}}function Me(a,e,n){const s=a.slice();return s[6]=e[n],s[8]=n,s}function Fe(a,e,n){const s=a.slice();return s[6]=e[n],s[8]=n,s}function tt(a){let e,n;return{c(){e=g("img"),this.h()},l(s){e=_(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){v(e,"class","page-toc-small-img"),De(e.src,n="/icons/down-arrow.png")||v(e,"src",n),v(e,"alt","arrow down")},m(s,l){d(s,e,l)},d(s){s&&c(e)}}}function nt(a){let e,n;return{c(){e=g("img"),this.h()},l(s){e=_(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){v(e,"class","page-toc-small-img"),De(e.src,n="/icons/upload.png")||v(e,"src",n),v(e,"alt","arrow up")},m(s,l){d(s,e,l)},d(s){s&&c(e)}}}function Ie(a){let e,n,s=me(a[0]),l=[];for(let r=0;r<s.length;r+=1)l[r]=Pe(Fe(a,s,r));return{c(){e=g("div"),n=g("ul");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=_(r,"DIV",{class:!0});var f=F(e);n=_(f,"UL",{class:!0});var o=F(n);for(let i=0;i<l.length;i+=1)l[i].l(o);o.forEach(c),f.forEach(c),this.h()},h(){v(n,"class","page-ul"),v(e,"class","toc-details")},m(r,f){d(r,e,f),C(e,n);for(let o=0;o<l.length;o+=1)l[o]&&l[o].m(n,null)},p(r,f){if(f&5){s=me(r[0]);let o;for(o=0;o<s.length;o+=1){const i=Fe(r,s,o);l[o]?l[o].p(i,f):(l[o]=Pe(i),l[o].c(),l[o].m(n,null))}for(;o<l.length;o+=1)l[o].d(1);l.length=s.length}},d(r){r&&c(e),Ve(l,r)}}}function Pe(a){let e,n,s=a[6].title+"",l,r,f;return{c(){e=g("li"),n=g("a"),l=oe(s),f=b(),this.h()},l(o){e=_(o,"LI",{class:!0});var i=F(e);n=_(i,"A",{href:!0});var m=F(n);l=le(m,s),m.forEach(c),f=w(i),i.forEach(c),this.h()},h(){v(n,"href",r=a[6].ref),U(n,"page-visible",a[8]===a[2]),U(n,"page-nonvisible",a[8]!==a[2]),v(e,"class","page-toc-text")},m(o,i){d(o,e,i),C(e,n),C(n,l),C(e,f)},p(o,i){i&1&&s!==(s=o[6].title+"")&&qe(l,s),i&1&&r!==(r=o[6].ref)&&v(n,"href",r),i&4&&U(n,"page-visible",o[8]===o[2]),i&4&&U(n,"page-nonvisible",o[8]!==o[2])},d(o){o&&c(e)}}}function He(a){let e,n,s=a[6].title+"",l,r,f;return{c(){e=g("li"),n=g("a"),l=oe(s),f=b(),this.h()},l(o){e=_(o,"LI",{class:!0});var i=F(e);n=_(i,"A",{href:!0});var m=F(n);l=le(m,s),m.forEach(c),f=w(i),i.forEach(c),this.h()},h(){v(n,"href",r=a[6].ref),U(n,"page-visible",a[8]===a[2]),U(n,"page-nonvisible",a[8]!==a[2]),v(e,"class","page-toc-text")},m(o,i){d(o,e,i),C(e,n),C(n,l),C(e,f)},p(o,i){i&1&&s!==(s=o[6].title+"")&&qe(l,s),i&1&&r!==(r=o[6].ref)&&v(n,"href",r),i&4&&U(n,"page-visible",o[8]===o[2]),i&4&&U(n,"page-nonvisible",o[8]!==o[2])},d(o){o&&c(e)}}}function st(a){let e,n,s,l="On this page ...",r,f,o,i,m,L,y,T,I,P,V="On this page",B,D,A,z,ae;function W(u,$){return u[1]?nt:tt}let H=W(a),M=H(a),E=a[1]&&Ie(a);m=new Ye({}),y=new et({});let S=me(a[0]),h=[];for(let u=0;u<S.length;u+=1)h[u]=He(Me(a,S,u));return{c(){e=g("div"),n=g("div"),s=g("p"),s.textContent=l,r=b(),f=g("button"),M.c(),o=b(),E&&E.c(),i=b(),Y(m.$$.fragment),L=b(),Y(y.$$.fragment),T=b(),I=g("nav"),P=g("h3"),P.textContent=V,B=b(),D=g("ul");for(let u=0;u<h.length;u+=1)h[u].c();this.h()},l(u){e=_(u,"DIV",{class:!0});var $=F(e);n=_($,"DIV",{class:!0});var k=F(n);s=_(k,"P",{class:!0,"data-svelte-h":!0}),x(s)!=="svelte-1929lhs"&&(s.textContent=l),r=w(k),f=_(k,"BUTTON",{class:!0});var N=F(f);M.l(N),N.forEach(c),k.forEach(c),o=w($),E&&E.l($),i=w($),J(m.$$.fragment,$),L=w($),J(y.$$.fragment,$),$.forEach(c),T=w(u),I=_(u,"NAV",{class:!0});var j=F(I);P=_(j,"H3",{class:!0,"data-svelte-h":!0}),x(P)!=="svelte-1hgt7fi"&&(P.textContent=V),B=w(j),D=_(j,"UL",{class:!0});var q=F(D);for(let ee=0;ee<h.length;ee+=1)h[ee].l(q);q.forEach(c),j.forEach(c),this.h()},h(){v(s,"class","page-toc-small-title"),v(f,"class","page-toc-small-expand-button"),v(n,"class","page-toc-small"),v(e,"class","page-main"),v(P,"class","page-toc-title"),v(D,"class","page-ul"),v(I,"class","page-toc")},m(u,$){d(u,e,$),C(e,n),C(n,s),C(n,r),C(n,f),M.m(f,null),C(e,o),E&&E.m(e,null),C(e,i),K(m,e,null),C(e,L),K(y,e,null),d(u,T,$),d(u,I,$),C(I,P),C(I,B),C(I,D);for(let k=0;k<h.length;k+=1)h[k]&&h[k].m(D,null);A=!0,z||(ae=Ge(f,"click",a[4]),z=!0)},p(u,[$]){if(H!==(H=W(u))&&(M.d(1),M=H(u),M&&(M.c(),M.m(f,null))),u[1]?E?E.p(u,$):(E=Ie(u),E.c(),E.m(e,i)):E&&(E.d(1),E=null),$&5){S=me(u[0]);let k;for(k=0;k<S.length;k+=1){const N=Me(u,S,k);h[k]?h[k].p(N,$):(h[k]=He(N),h[k].c(),h[k].m(D,null))}for(;k<h.length;k+=1)h[k].d(1);h.length=S.length}},i(u){A||(Q(m.$$.fragment,u),Q(y.$$.fragment,u),A=!0)},o(u){X(m.$$.fragment,u),X(y.$$.fragment,u),A=!1},d(u){u&&(c(e),c(T),c(I)),M.d(),E&&E.d(),Z(m),Z(y),Ve(h,u),z=!1,ae()}}}function at(a,e,n){let s,l;Se(a,se,m=>n(0,l=m));let r=!1;function f(m){let L=s;for(let y=0;y<m.length;y++)if(m[y].visible)return y;return L}function o(){n(1,r=!r)}const i=()=>{o()};return a.$$.update=()=>{a.$$.dirty&1&&n(2,s=f(l))},[l,r,s,o,i]}class pt extends Ae{constructor(e){super(),je(this,e,at,st,ze,{})}}export{pt as component};
//# sourceMappingURL=30.DpFoF9Os.js.map
