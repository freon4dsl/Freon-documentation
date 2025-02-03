import{s as $t,A as ve,a as h,e as _,H as Oe,f as g,b as k,m as I,d as x,F as Ve,g as l,h as $,i as c,B as $e,v as bt,x as he,w as Ft,t as Z,o as ee,j as T,C as At,D as wt,E as X,q as Ct,p as yt}from"../chunks/scheduler.CIEH-92L.js";import{S as St,i as Pt,e as be,c as B,a as D,m as R,t as G,b as O,d as V}from"../chunks/index.HLF2pGCU.js";import{e as We}from"../chunks/each.BLebZWAa.js";import{w as jt}from"../chunks/index.bxqR-5-s.js";import{P as ft,S as we,c as Nt,B as Bt}from"../chunks/index.CLjbMqgA.js";import{F as Dt}from"../chunks/Figure.ClABA4Sw.js";const J=jt([]);function Rt(o){let t;return{c(){t=Z("An Icon Component")},l(n){t=ee(n,"An Icon Component")},m(n,s){c(n,t,s)},d(n){n&&l(t)}}}function Gt(o){let t;return{c(){t=Z("Step 1: Create the Svelte Component")},l(n){t=ee(n,"Step 1: Create the Svelte Component")},m(n,s){c(n,t,s)},d(n){n&&l(t)}}}function Ot(o){let t;return{c(){t=Z("Step 2: Add to the Global Section")},l(n){t=ee(n,"Step 2: Add to the Global Section")},m(n,s){c(n,t,s)},d(n){n&&l(t)}}}function Vt(o){let t;return{c(){t=Z("Step3: Include in the Projection")},l(n){t=ee(n,"Step3: Include in the Projection")},m(n,s){c(n,t,s)},d(n){n&&l(t)}}}function Wt(o){let t;return{c(){t=Z("Step4: Register in the Starter Code")},l(n){t=ee(n,"Step4: Register in the Starter Code")},m(n,s){c(n,t,s)},d(n){n&&l(t)}}}function zt(o){let t;return{c(){t=Z("Final Result")},l(n){t=ee(n,"Final Result")},m(n,s){c(n,t,s)},d(n){n&&l(t)}}}function Ut(o){let t,n,s,i,r,d,p=`In this part of the example, we will guide you through the process of enhancing the look of the <code>Staff</code> model by adding an icon
	to each person. We will create a custom Svelte component named <code>PersonIcon.svelte</code>, and integrate it into the editor. Let’s get
	started!`,u,v,N,m,S,P=`To begin, we need to create a new Svelte component that will represent the icon for each person. Let’s call it <code>PersonIcon.svelte</code>. This component must be linked to the box model of the Freon editor. In Freon, each external component must be associated with a box,
	and the <code>PersonIcon</code> component will be tied to a box type called <code>ExternalSimpleBox</code>. The parameter
	<code>editor: FreEditor</code> is also mandatory. When the component is instantiated by the Freon editor both parameters will get a value.`,E,L,te="The complete Svelte component should look like this:",F,A,K,ye=`<code class="language-ts"><span class="token comment">// CourseSchedule/phase2/src/external/PersonIcon.svelte</span>

<span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>ExternalSimpleBox<span class="token punctuation">,</span> FreEditor<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>

		<span class="token comment">// Declare the 'box' and 'editor' parameters as required by Freon</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> box<span class="token operator">:</span> ExternalSimpleBox<span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> Display the icon <span class="token keyword">with</span> an image <span class="token operator">--</span><span class="token operator">></span>
<span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token string">'./icons8-person-94.png'</span> alt<span class="token operator">=</span><span class="token string">"Icon showing Person"</span> height<span class="token operator">=</span><span class="token string">"30px"</span><span class="token operator">/</span><span class="token operator">></span>
</code>`,ne,H,q,C,M,y='The next step is to inform the Freon code generator about the new external component. We can achieve this by modifying the <a href="/Documentation/Defining_an_Editor/Global_Projections"><code>global</code></a> section of the default editor configuration.',f,b,w="In the <code>main.edit</code> file, add the following code to declare the <code>PersonIcon</code> component:",W,j,se,Ce=`<code class="language-freon"><span class="token comment">// CourseSchedule/phase2/defs/main.edit#L3-L7
</span>
<span class="token class-name">global</span> &#123;
    <span class="token class-name">external</span> &#123;
        PersonIcon
    &#125;
&#125;</code>`,Se,oe,Xe=`This tells the editor that <code>PersonIcon</code> is an external component. You can name it anything you like, but for simplicity, we
	will use <code>PersonIcon</code>.`,Pe,z,ze,Te,ae,Ze=`To include the new component, we need to reference it in the editor’s projection for the <code>Person</code> concept. The way to do this
	is by adding <code>[external=PersonIcon]</code> to the projection. To be able to see the differences in the browser between the native
	editor and the one with external components we have decided to add the adjusted projection to a new editor (projection set). The icon is
	included in the fragment that shows the name and phone number details. Every fragment for the same concept must have a unique name.
	Therefore, we name this fragment <code>nameAndIcon</code>.`,Ee,le,Ie,Tt=`<code class="language-freon"><span class="token comment">// CourseSchedule/phase2/defs/externals.edit
</span>
<span class="token keyword">editor</span> externals

<span class="token class-name">Person</span> &#123;<span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token keyword">fragment</span> nameAndIcon<span class="token punctuation">]</span>
        Availability: $&#123;<span class="token function"><span class="token variable">self</span>.availability <span class="token keyword">checkbox</span></span>&#125; Competence: $&#123;<span class="token function"><span class="token variable">self</span>.competence</span>&#125;
<span class="token punctuation">]</span>
<span class="token keyword">fragment</span> nameAndIcon <span class="token punctuation">[</span>
<span class="token punctuation">[</span><span class="token keyword">external</span>=PersonIcon<span class="token punctuation">]</span> Nickname: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
Full Name: $&#123;<span class="token function"><span class="token variable">self</span>.fullName</span>&#125;
Phone <span class="token builtin">number</span>: $&#123;<span class="token function"><span class="token variable">self</span>.phone</span>&#125;
<span class="token punctuation">]</span>
&#125;
</code>`,xe,U,Ue,Le,ie,et="Now, we need to ensure the Freon editor knows how to instantiate our custom component. This is done by calling the <code>setCustomComponents</code> function in the application’s startup code.",He,pe,tt=`In your <code>externals.ts</code> file, import the <code>PersonIcon</code> component and add it to the <code>setCustomComponents</code> function
	like this:`,Me,ce,qe,Et=`<code class="language-ts"><span class="token comment">// CourseSchedule/phase2/src/external/externals.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>setCustomComponents<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core-svelte"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PersonIcon <span class="token keyword">from</span> <span class="token string">"./PersonIcon.svelte"</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Configure the external components used, so Freon can find them.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">configureExternals</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">setCustomComponents</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span> component<span class="token operator">:</span> PersonIcon<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"PersonIcon"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`,Fe,Y,Ye,Ae,re,nt=`Once all the steps are completed, your editor will look like this, with each person displaying their details alongside the newly added
	icon:`,je,ue,Ne,Q,st="Conclusion:",Be,fe,ot=`You’ve successfully added an icon to the <code>Staff</code> model in the Freon editor! By following these steps, you’ve created a custom Svelte
	component, integrated it into the Freon editor, and made it available in your projections.`,De,me,at="Next, you are going to learn how to get the information from the AST model, and use it in your external components.",Re,de,Ge;t=new ft({props:{prevLink:mt,nextLink:dt}});function It(e){o[1](e)}let lt={tag:"h1",id:"an-icon-component-1",$$slots:{default:[Rt]},$$scope:{ctx:o}};o[0][0]!==void 0&&(lt.intersecting=o[0][0]),s=new we({props:lt}),ve.push(()=>be(s,"intersecting",It));function xt(e){o[2](e)}let it={tag:"h2",id:"step-1-create-the-svelte-component-2",$$slots:{default:[Gt]},$$scope:{ctx:o}};o[0][1]!==void 0&&(it.intersecting=o[0][1]),v=new we({props:it}),ve.push(()=>be(v,"intersecting",xt));function Lt(e){o[3](e)}let pt={tag:"h2",id:"step-2-add-to-the-global-section-3",$$slots:{default:[Ot]},$$scope:{ctx:o}};o[0][2]!==void 0&&(pt.intersecting=o[0][2]),H=new we({props:pt}),ve.push(()=>be(H,"intersecting",Lt));function Ht(e){o[4](e)}let ct={tag:"h2",id:"step3-include-in-the-projection-4",$$slots:{default:[Vt]},$$scope:{ctx:o}};o[0][3]!==void 0&&(ct.intersecting=o[0][3]),z=new we({props:ct}),ve.push(()=>be(z,"intersecting",Ht));function Mt(e){o[5](e)}let rt={tag:"h2",id:"step4-register-in-the-starter-code-5",$$slots:{default:[Wt]},$$scope:{ctx:o}};o[0][4]!==void 0&&(rt.intersecting=o[0][4]),U=new we({props:rt}),ve.push(()=>be(U,"intersecting",Mt));function qt(e){o[6](e)}let ut={tag:"h2",id:"final-result-6",$$slots:{default:[zt]},$$scope:{ctx:o}};return o[0][5]!==void 0&&(ut.intersecting=o[0][5]),Y=new we({props:ut}),ve.push(()=>be(Y,"intersecting",qt)),ue=new Dt({props:{imageName:"examples/CourseSchedule/Screenshot-step2.png",caption:"Editor with added Icon",figureNumber:1}}),de=new ft({props:{prevLink:mt,nextLink:dt}}),{c(){B(t.$$.fragment),n=h(),B(s.$$.fragment),r=h(),d=_("p"),d.innerHTML=p,u=h(),B(v.$$.fragment),m=h(),S=_("p"),S.innerHTML=P,E=h(),L=_("p"),L.textContent=te,F=h(),A=_("pre"),K=new Oe(!1),ne=h(),B(H.$$.fragment),C=h(),M=_("p"),M.innerHTML=y,f=h(),b=_("p"),b.innerHTML=w,W=h(),j=_("pre"),se=new Oe(!1),Se=h(),oe=_("p"),oe.innerHTML=Xe,Pe=h(),B(z.$$.fragment),Te=h(),ae=_("p"),ae.innerHTML=Ze,Ee=h(),le=_("pre"),Ie=new Oe(!1),xe=h(),B(U.$$.fragment),Le=h(),ie=_("p"),ie.innerHTML=et,He=h(),pe=_("p"),pe.innerHTML=tt,Me=h(),ce=_("pre"),qe=new Oe(!1),Fe=h(),B(Y.$$.fragment),Ae=h(),re=_("p"),re.textContent=nt,je=h(),B(ue.$$.fragment),Ne=h(),Q=_("h3"),Q.textContent=st,Be=h(),fe=_("p"),fe.innerHTML=ot,De=h(),me=_("p"),me.textContent=at,Re=h(),B(de.$$.fragment),this.h()},l(e){D(t.$$.fragment,e),n=g(e),D(s.$$.fragment,e),r=g(e),d=k(e,"P",{"data-svelte-h":!0}),I(d)!=="svelte-1faqqm7"&&(d.innerHTML=p),u=g(e),D(v.$$.fragment,e),m=g(e),S=k(e,"P",{"data-svelte-h":!0}),I(S)!=="svelte-j7rl2x"&&(S.innerHTML=P),E=g(e),L=k(e,"P",{"data-svelte-h":!0}),I(L)!=="svelte-1ojb9uv"&&(L.textContent=te),F=g(e),A=k(e,"PRE",{class:!0});var a=x(A);K=Ve(a,!1),a.forEach(l),ne=g(e),D(H.$$.fragment,e),C=g(e),M=k(e,"P",{"data-svelte-h":!0}),I(M)!=="svelte-1fmtknp"&&(M.innerHTML=y),f=g(e),b=k(e,"P",{"data-svelte-h":!0}),I(b)!=="svelte-1nfmsxu"&&(b.innerHTML=w),W=g(e),j=k(e,"PRE",{class:!0});var ge=x(j);se=Ve(ge,!1),ge.forEach(l),Se=g(e),oe=k(e,"P",{"data-svelte-h":!0}),I(oe)!=="svelte-u8fxuh"&&(oe.innerHTML=Xe),Pe=g(e),D(z.$$.fragment,e),Te=g(e),ae=k(e,"P",{"data-svelte-h":!0}),I(ae)!=="svelte-1f61exi"&&(ae.innerHTML=Ze),Ee=g(e),le=k(e,"PRE",{class:!0});var _e=x(le);Ie=Ve(_e,!1),_e.forEach(l),xe=g(e),D(U.$$.fragment,e),Le=g(e),ie=k(e,"P",{"data-svelte-h":!0}),I(ie)!=="svelte-1rizmp0"&&(ie.innerHTML=et),He=g(e),pe=k(e,"P",{"data-svelte-h":!0}),I(pe)!=="svelte-1oqxkje"&&(pe.innerHTML=tt),Me=g(e),ce=k(e,"PRE",{class:!0});var ke=x(ce);qe=Ve(ke,!1),ke.forEach(l),Fe=g(e),D(Y.$$.fragment,e),Ae=g(e),re=k(e,"P",{"data-svelte-h":!0}),I(re)!=="svelte-1okusva"&&(re.textContent=nt),je=g(e),D(ue.$$.fragment,e),Ne=g(e),Q=k(e,"H3",{id:!0,"data-svelte-h":!0}),I(Q)!=="svelte-17zqw2m"&&(Q.textContent=st),Be=g(e),fe=k(e,"P",{"data-svelte-h":!0}),I(fe)!=="svelte-h9qunj"&&(fe.innerHTML=ot),De=g(e),me=k(e,"P",{"data-svelte-h":!0}),I(me)!=="svelte-z1dnkb"&&(me.textContent=at),Re=g(e),D(de.$$.fragment,e),this.h()},h(){K.a=null,$(A,"class","language-ts"),se.a=null,$(j,"class","language-freon"),Ie.a=null,$(le,"class","language-freon"),qe.a=null,$(ce,"class","language-ts"),$(Q,"id","conclusion-1")},m(e,a){R(t,e,a),c(e,n,a),R(s,e,a),c(e,r,a),c(e,d,a),c(e,u,a),R(v,e,a),c(e,m,a),c(e,S,a),c(e,E,a),c(e,L,a),c(e,F,a),c(e,A,a),K.m(ye,A),c(e,ne,a),R(H,e,a),c(e,C,a),c(e,M,a),c(e,f,a),c(e,b,a),c(e,W,a),c(e,j,a),se.m(Ce,j),c(e,Se,a),c(e,oe,a),c(e,Pe,a),R(z,e,a),c(e,Te,a),c(e,ae,a),c(e,Ee,a),c(e,le,a),Ie.m(Tt,le),c(e,xe,a),R(U,e,a),c(e,Le,a),c(e,ie,a),c(e,He,a),c(e,pe,a),c(e,Me,a),c(e,ce,a),qe.m(Et,ce),c(e,Fe,a),R(Y,e,a),c(e,Ae,a),c(e,re,a),c(e,je,a),R(ue,e,a),c(e,Ne,a),c(e,Q,a),c(e,Be,a),c(e,fe,a),c(e,De,a),c(e,me,a),c(e,Re,a),R(de,e,a),Ge=!0},p(e,[a]){const ge={};a&256&&(ge.$$scope={dirty:a,ctx:e}),!i&&a&1&&(i=!0,ge.intersecting=e[0][0],$e(()=>i=!1)),s.$set(ge);const _e={};a&256&&(_e.$$scope={dirty:a,ctx:e}),!N&&a&1&&(N=!0,_e.intersecting=e[0][1],$e(()=>N=!1)),v.$set(_e);const ke={};a&256&&(ke.$$scope={dirty:a,ctx:e}),!q&&a&1&&(q=!0,ke.intersecting=e[0][2],$e(()=>q=!1)),H.$set(ke);const Je={};a&256&&(Je.$$scope={dirty:a,ctx:e}),!ze&&a&1&&(ze=!0,Je.intersecting=e[0][3],$e(()=>ze=!1)),z.$set(Je);const Ke={};a&256&&(Ke.$$scope={dirty:a,ctx:e}),!Ue&&a&1&&(Ue=!0,Ke.intersecting=e[0][4],$e(()=>Ue=!1)),U.$set(Ke);const Qe={};a&256&&(Qe.$$scope={dirty:a,ctx:e}),!Ye&&a&1&&(Ye=!0,Qe.intersecting=e[0][5],$e(()=>Ye=!1)),Y.$set(Qe)},i(e){Ge||(G(t.$$.fragment,e),G(s.$$.fragment,e),G(v.$$.fragment,e),G(H.$$.fragment,e),G(z.$$.fragment,e),G(U.$$.fragment,e),G(Y.$$.fragment,e),G(ue.$$.fragment,e),G(de.$$.fragment,e),Ge=!0)},o(e){O(t.$$.fragment,e),O(s.$$.fragment,e),O(v.$$.fragment,e),O(H.$$.fragment,e),O(z.$$.fragment,e),O(U.$$.fragment,e),O(Y.$$.fragment,e),O(ue.$$.fragment,e),O(de.$$.fragment,e),Ge=!1},d(e){e&&(l(n),l(r),l(d),l(u),l(m),l(S),l(E),l(L),l(F),l(A),l(ne),l(C),l(M),l(f),l(b),l(W),l(j),l(Se),l(oe),l(Pe),l(Te),l(ae),l(Ee),l(le),l(xe),l(Le),l(ie),l(He),l(pe),l(Me),l(ce),l(Fe),l(Ae),l(re),l(je),l(Ne),l(Q),l(Be),l(fe),l(De),l(me),l(Re)),V(t,e),V(s,e),V(v,e),V(H,e),V(z,e),V(U,e),V(Y,e),V(ue,e),V(de,e)}}}let mt="/Examples/External_Components/The_CourseSchedule_DSL",dt="/Examples/External_Components/A_Wrapper_with_a_Button";function Yt(o,t,n){let s;bt(o,J,m=>n(7,s=m)),he(J,s=[{title:"An Icon Component",visible:!1,ref:"#an-icon-component-1"},{title:"Step 1: Create the Svelte Component",visible:!1,ref:"#step-1-create-the-svelte-component-2"},{title:"Step 2: Add to the Global Section",visible:!1,ref:"#step-2-add-to-the-global-section-3"},{title:"Step3: Include in the Projection",visible:!1,ref:"#step3-include-in-the-projection-4"},{title:"Step4: Register in the Starter Code",visible:!1,ref:"#step4-register-in-the-starter-code-5"},{title:"Final Result",visible:!1,ref:"#final-result-6"}],s);let i=[];Ft(()=>{document.querySelectorAll("pre").forEach(S=>{const P=document.createElement("div");P.className="copy-prompt";const E=document.createElement("p");E.innerHTML="👆 Click to copy",E.className="copy-prompt-p";const L=document.createElement("img");L.src="/icons/copy-icon.svg",L.className="copy-prompt-img",P.appendChild(L),P.appendChild(E),S.appendChild(P),S.querySelector(".copy-prompt > p").addEventListener("click",te=>{Nt(S.querySelector("code").textContent),S.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{S.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function r(m){o.$$.not_equal(i[0],m)&&(i[0]=m,n(0,i))}function d(m){o.$$.not_equal(i[1],m)&&(i[1]=m,n(0,i))}function p(m){o.$$.not_equal(i[2],m)&&(i[2]=m,n(0,i))}function u(m){o.$$.not_equal(i[3],m)&&(i[3]=m,n(0,i))}function v(m){o.$$.not_equal(i[4],m)&&(i[4]=m,n(0,i))}function N(m){o.$$.not_equal(i[5],m)&&(i[5]=m,n(0,i))}return o.$$.update=()=>{o.$$.dirty&1&&he(J,s[0].visible=i[0],s),o.$$.dirty&1&&he(J,s[1].visible=i[1],s),o.$$.dirty&1&&he(J,s[2].visible=i[2],s),o.$$.dirty&1&&he(J,s[3].visible=i[3],s),o.$$.dirty&1&&he(J,s[4].visible=i[4],s),o.$$.dirty&1&&he(J,s[5].visible=i[5],s)},[i,r,d,p,u,v,N]}class Jt extends St{constructor(t){super(),Pt(this,t,Yt,Ut,$t,{})}}function ht(o,t,n){const s=o.slice();return s[6]=t[n],s[8]=n,s}function gt(o,t,n){const s=o.slice();return s[6]=t[n],s[8]=n,s}function Kt(o){let t,n;return{c(){t=_("img"),this.h()},l(s){t=k(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){$(t,"class","page-toc-small-img"),yt(t.src,n="/icons/down-arrow.png")||$(t,"src",n),$(t,"alt","arrow down")},m(s,i){c(s,t,i)},d(s){s&&l(t)}}}function Qt(o){let t,n;return{c(){t=_("img"),this.h()},l(s){t=k(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){$(t,"class","page-toc-small-img"),yt(t.src,n="/icons/upload.png")||$(t,"src",n),$(t,"alt","arrow up")},m(s,i){c(s,t,i)},d(s){s&&l(t)}}}function _t(o){let t,n,s=We(o[0]),i=[];for(let r=0;r<s.length;r+=1)i[r]=kt(gt(o,s,r));return{c(){t=_("div"),n=_("ul");for(let r=0;r<i.length;r+=1)i[r].c();this.h()},l(r){t=k(r,"DIV",{class:!0});var d=x(t);n=k(d,"UL",{class:!0});var p=x(n);for(let u=0;u<i.length;u+=1)i[u].l(p);p.forEach(l),d.forEach(l),this.h()},h(){$(n,"class","page-ul"),$(t,"class","toc-details")},m(r,d){c(r,t,d),T(t,n);for(let p=0;p<i.length;p+=1)i[p]&&i[p].m(n,null)},p(r,d){if(d&5){s=We(r[0]);let p;for(p=0;p<s.length;p+=1){const u=gt(r,s,p);i[p]?i[p].p(u,d):(i[p]=kt(u),i[p].c(),i[p].m(n,null))}for(;p<i.length;p+=1)i[p].d(1);i.length=s.length}},d(r){r&&l(t),wt(i,r)}}}function kt(o){let t,n,s=o[6].title+"",i,r,d;return{c(){t=_("li"),n=_("a"),i=Z(s),d=h(),this.h()},l(p){t=k(p,"LI",{class:!0});var u=x(t);n=k(u,"A",{href:!0});var v=x(n);i=ee(v,s),v.forEach(l),d=g(u),u.forEach(l),this.h()},h(){$(n,"href",r=o[6].ref),X(n,"page-visible",o[8]===o[2]),X(n,"page-nonvisible",o[8]!==o[2]),$(t,"class","page-toc-text")},m(p,u){c(p,t,u),T(t,n),T(n,i),T(t,d)},p(p,u){u&1&&s!==(s=p[6].title+"")&&Ct(i,s),u&1&&r!==(r=p[6].ref)&&$(n,"href",r),u&4&&X(n,"page-visible",p[8]===p[2]),u&4&&X(n,"page-nonvisible",p[8]!==p[2])},d(p){p&&l(t)}}}function vt(o){let t,n,s=o[6].title+"",i,r,d;return{c(){t=_("li"),n=_("a"),i=Z(s),d=h(),this.h()},l(p){t=k(p,"LI",{class:!0});var u=x(t);n=k(u,"A",{href:!0});var v=x(n);i=ee(v,s),v.forEach(l),d=g(u),u.forEach(l),this.h()},h(){$(n,"href",r=o[6].ref),X(n,"page-visible",o[8]===o[2]),X(n,"page-nonvisible",o[8]!==o[2]),$(t,"class","page-toc-text")},m(p,u){c(p,t,u),T(t,n),T(n,i),T(t,d)},p(p,u){u&1&&s!==(s=p[6].title+"")&&Ct(i,s),u&1&&r!==(r=p[6].ref)&&$(n,"href",r),u&4&&X(n,"page-visible",p[8]===p[2]),u&4&&X(n,"page-nonvisible",p[8]!==p[2])},d(p){p&&l(t)}}}function Xt(o){let t,n,s,i="On this page ...",r,d,p,u,v,N,m,S,P,E,L="On this page",te,F,A,K,ye;function ne(f,b){return f[1]?Qt:Kt}let H=ne(o),q=H(o),C=o[1]&&_t(o);v=new Bt({}),m=new Jt({});let M=We(o[0]),y=[];for(let f=0;f<M.length;f+=1)y[f]=vt(ht(o,M,f));return{c(){t=_("div"),n=_("div"),s=_("p"),s.textContent=i,r=h(),d=_("button"),q.c(),p=h(),C&&C.c(),u=h(),B(v.$$.fragment),N=h(),B(m.$$.fragment),S=h(),P=_("nav"),E=_("h3"),E.textContent=L,te=h(),F=_("ul");for(let f=0;f<y.length;f+=1)y[f].c();this.h()},l(f){t=k(f,"DIV",{class:!0});var b=x(t);n=k(b,"DIV",{class:!0});var w=x(n);s=k(w,"P",{class:!0,"data-svelte-h":!0}),I(s)!=="svelte-1929lhs"&&(s.textContent=i),r=g(w),d=k(w,"BUTTON",{class:!0});var W=x(d);q.l(W),W.forEach(l),w.forEach(l),p=g(b),C&&C.l(b),u=g(b),D(v.$$.fragment,b),N=g(b),D(m.$$.fragment,b),b.forEach(l),S=g(f),P=k(f,"NAV",{class:!0});var j=x(P);E=k(j,"H3",{class:!0,"data-svelte-h":!0}),I(E)!=="svelte-1hgt7fi"&&(E.textContent=L),te=g(j),F=k(j,"UL",{class:!0});var se=x(F);for(let Ce=0;Ce<y.length;Ce+=1)y[Ce].l(se);se.forEach(l),j.forEach(l),this.h()},h(){$(s,"class","page-toc-small-title"),$(d,"class","page-toc-small-expand-button"),$(n,"class","page-toc-small"),$(t,"class","page-main"),$(E,"class","page-toc-title"),$(F,"class","page-ul"),$(P,"class","page-toc")},m(f,b){c(f,t,b),T(t,n),T(n,s),T(n,r),T(n,d),q.m(d,null),T(t,p),C&&C.m(t,null),T(t,u),R(v,t,null),T(t,N),R(m,t,null),c(f,S,b),c(f,P,b),T(P,E),T(P,te),T(P,F);for(let w=0;w<y.length;w+=1)y[w]&&y[w].m(F,null);A=!0,K||(ye=At(d,"click",o[4]),K=!0)},p(f,[b]){if(H!==(H=ne(f))&&(q.d(1),q=H(f),q&&(q.c(),q.m(d,null))),f[1]?C?C.p(f,b):(C=_t(f),C.c(),C.m(t,u)):C&&(C.d(1),C=null),b&5){M=We(f[0]);let w;for(w=0;w<M.length;w+=1){const W=ht(f,M,w);y[w]?y[w].p(W,b):(y[w]=vt(W),y[w].c(),y[w].m(F,null))}for(;w<y.length;w+=1)y[w].d(1);y.length=M.length}},i(f){A||(G(v.$$.fragment,f),G(m.$$.fragment,f),A=!0)},o(f){O(v.$$.fragment,f),O(m.$$.fragment,f),A=!1},d(f){f&&(l(t),l(S),l(P)),q.d(),C&&C.d(),V(v),V(m),wt(y,f),K=!1,ye()}}}function Zt(o,t,n){let s,i;bt(o,J,v=>n(0,i=v));let r=!1;function d(v){let N=s;for(let m=0;m<v.length;m++)if(v[m].visible)return m;return N}function p(){n(1,r=!r)}const u=()=>{p()};return o.$$.update=()=>{o.$$.dirty&1&&n(2,s=d(i))},[i,r,s,p,u]}class ln extends St{constructor(t){super(),Pt(this,t,Zt,Xt,$t,{})}}export{ln as component};
//# sourceMappingURL=70.Nobo458K.js.map
