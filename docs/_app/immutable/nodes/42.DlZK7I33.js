import{s as ze,A as we,a as y,e as h,H as Ce,f as k,b as g,m as q,d as M,F as Se,g as i,h as b,i as u,B as Te,v as Fe,x as ke,w as nt,t as ce,o as pe,j as S,C as st,D as Re,E as W,q as Ve,p as Je}from"../chunks/scheduler.CIEH-92L.js";import{S as Ke,i as Qe,e as Le,c as Y,a as Z,m as ee,t as te,b as ne,d as se}from"../chunks/index.HLF2pGCU.js";import{e as be}from"../chunks/each.BLebZWAa.js";import{w as at}from"../chunks/index.bxqR-5-s.js";import{P as Ae,S as Ee,c as ot,B as lt}from"../chunks/index.D1zh88jY.js";const le=at([]);function it(a){let t;return{c(){t=ce("Styling")},l(n){t=pe(n,"Styling")},m(n,s){u(n,t,s)},d(n){n&&i(t)}}}function rt(a){let t;return{c(){t=ce("Styling the Web Application")},l(n){t=pe(n,"Styling the Web Application")},m(n,s){u(n,t,s)},d(n){n&&i(t)}}}function ct(a){let t;return{c(){t=ce("Styling the Editor")},l(n){t=pe(n,"Styling the Editor")},m(n,s){u(n,t,s)},d(n){n&&i(t)}}}function pt(a){let t,n,s,l,p,d,o="The web application and/or the editor, can be styled using either SCSS or CSS.",r,m,L,$,T,H=`The provided <a href="/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-5">web application</a>
	is build using the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library. This library uses SCSS, and therefore you need
	to run the preprocessor provided with SMUI for the styling to take effect. To do so, run the following command. When you do not change the
	styles, a single run will suffice. When you, however, do change the styles, you need to rerun this command.`,P,U,B,N='<code class="language-bash"><span class="token function">npm</span> run prepare-app   <span class="token comment"># Needed to generate the runtime CSS files. A single run will suffice.</span></code>',O,A,ie=`The <a href="/Documentation/Overview/Getting_Started#example-project-startup-2">example</a>
	and <a href="/Documentation/Overview/Getting_Started#template-project-startup-3">template</a> projects both contain a folder
	<code>style</code>
	that holds the SCSS files that are provided with the projects. There are two sets of styles that determine the look of the web application
	and editor, one for the light theme, and one for the dark theme. The latter can be found in the folder <code>style/dark</code>.`,z,D,I="The styling for the web application can be found in the following files.",w,E,C="<li><code>_app.scss</code>: contains all styling common to both dark and light mode.</li> <li><code>_app-theme-light.scss</code>: contains the styling for the light mode.</li> <li><code>dark/_app-theme-dark.scss</code>: contains the styling for the dark mode.</li> <li><code>_smui_theme.scss</code>: the file used in the <code>npm run prepare-app</code> command for the light mode.</li> <li><code>dark/_smui_theme.scss</code>: the file used in the <code>npm run prepare-app</code> command for the dark mode.</li>",f,_,v,j,x,re=`Because the minimal <a href="/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-5">web application</a>
	is provided for your convenience only, the styling of the editor is kept separate from the styling of the web application. When you read the
	<code>_smui-theme.scss</code>
	and <code>dark/_smui-theme.scss</code> files, you will notice that both refer to files that are included in the
	<code>@freon4dsl/core-svelte</code> package.`,G,F,ue,Xe=`<code class="language-scss"><span class="token comment">// Styling/_smui-theme.scss#L6-L8</span>

<span class="token keyword">@use</span> <span class="token string">'../node_modules/@freon4dsl/core-svelte/dist/styles/freon.css'</span><span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">'../node_modules/@freon4dsl/core-svelte/dist/styles/freon-light.css'</span><span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">'app_theme-light'</span><span class="token punctuation">;</span></code>`,fe,R,Me=`The files from the <code>@freon4dsl/core-svelte</code> package define the values for the styles that are used within the editor. All
	styling that determines color has been divided over <code>freon-light.css</code>
	and <code>freon-dark.css</code>. Other styles are in the file <code>freon.css</code>.`,de,V,He=`The comments and naming should (hopefully) indicate where each style is being used. For example, the following styles are defined for
	horizontal and vertical lists.`,me,J,he,Ye=`<code class="language-scss"><span class="token comment">// Styling/freon.css#L50-L66</span>

<span class="token selector">.list-component-horizontal </span><span class="token punctuation">&#123;</span>
    <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> 0pt<span class="token punctuation">;</span>
    <span class="token property">border-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.list-component-vertical </span><span class="token punctuation">&#123;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> 0pt<span class="token punctuation">;</span>
    <span class="token property">border-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,ge,K,Pe=`To change any of the styling, copy the files from the <code>@freon4dsl/core-svelte</code> package into your styles folder and adjust the
	<code>@use</code>
	statement in both <code>_smui-theme.scss</code> files to include your own files instead of the packaged ones. Then start changing the styles
	in your own copies to your liking, however, take care with the boolean and numeric controls, because they are based on Material UI components.`,_e,Q,De="<li>RadioComponent uses “—mdc-theme-secondary” for its color, if you want to override this value set “—freon-boolean-radiobox-color”.</li> <li>CheckComponent uses “—mdc-theme-secondary”, if you want to override it, use “—freon-boolean-checkbox-color”.</li> <li>SwitchComponent uses “—mdc-theme-primary”, if you want to override it, set “—freon-boolean-switch-color”.</li> <li>NumericSliderComponent uses “—mdc-theme-primary”, if you want to override it, set “—freon-numeric-slider-color”.</li> <li>InnerSwitchComponent uses “—mdc-theme-primary”, if you want to override it, set “—freon-boolean-switch-color”.</li>",ve,X,ye;t=new Ae({props:{prevLink:Ue,nextLink:je}});function Ze(e){a[1](e)}let Ie={tag:"h1",id:"styling-1",$$slots:{default:[it]},$$scope:{ctx:a}};a[0][0]!==void 0&&(Ie.intersecting=a[0][0]),s=new Ee({props:Ie}),we.push(()=>Le(s,"intersecting",Ze));function et(e){a[2](e)}let xe={tag:"h1",id:"styling-the-web-application-2",$$slots:{default:[rt]},$$scope:{ctx:a}};a[0][1]!==void 0&&(xe.intersecting=a[0][1]),m=new Ee({props:xe}),we.push(()=>Le(m,"intersecting",et));function tt(e){a[3](e)}let qe={tag:"h1",id:"styling-the-editor-3",$$slots:{default:[ct]},$$scope:{ctx:a}};return a[0][2]!==void 0&&(qe.intersecting=a[0][2]),_=new Ee({props:qe}),we.push(()=>Le(_,"intersecting",tt)),X=new Ae({props:{prevLink:Ue,nextLink:je}}),{c(){Y(t.$$.fragment),n=y(),Y(s.$$.fragment),p=y(),d=h("p"),d.textContent=o,r=y(),Y(m.$$.fragment),$=y(),T=h("p"),T.innerHTML=H,P=y(),U=h("pre"),B=new Ce(!1),O=y(),A=h("p"),A.innerHTML=ie,z=y(),D=h("p"),D.textContent=I,w=y(),E=h("ul"),E.innerHTML=C,f=y(),Y(_.$$.fragment),j=y(),x=h("p"),x.innerHTML=re,G=y(),F=h("pre"),ue=new Ce(!1),fe=y(),R=h("p"),R.innerHTML=Me,de=y(),V=h("p"),V.textContent=He,me=y(),J=h("pre"),he=new Ce(!1),ge=y(),K=h("p"),K.innerHTML=Pe,_e=y(),Q=h("ul"),Q.innerHTML=De,ve=y(),Y(X.$$.fragment),this.h()},l(e){Z(t.$$.fragment,e),n=k(e),Z(s.$$.fragment,e),p=k(e),d=g(e,"P",{"data-svelte-h":!0}),q(d)!=="svelte-mknrst"&&(d.textContent=o),r=k(e),Z(m.$$.fragment,e),$=k(e),T=g(e,"P",{"data-svelte-h":!0}),q(T)!=="svelte-59616k"&&(T.innerHTML=H),P=k(e),U=g(e,"PRE",{class:!0});var c=M(U);B=Se(c,!1),c.forEach(i),O=k(e),A=g(e,"P",{"data-svelte-h":!0}),q(A)!=="svelte-ub1uyg"&&(A.innerHTML=ie),z=k(e),D=g(e,"P",{"data-svelte-h":!0}),q(D)!=="svelte-ry7rfe"&&(D.textContent=I),w=k(e),E=g(e,"UL",{"data-svelte-h":!0}),q(E)!=="svelte-wa97co"&&(E.innerHTML=C),f=k(e),Z(_.$$.fragment,e),j=k(e),x=g(e,"P",{"data-svelte-h":!0}),q(x)!=="svelte-sw5ibt"&&(x.innerHTML=re),G=k(e),F=g(e,"PRE",{class:!0});var ae=M(F);ue=Se(ae,!1),ae.forEach(i),fe=k(e),R=g(e,"P",{"data-svelte-h":!0}),q(R)!=="svelte-12fkp6e"&&(R.innerHTML=Me),de=k(e),V=g(e,"P",{"data-svelte-h":!0}),q(V)!=="svelte-j4kip3"&&(V.textContent=He),me=k(e),J=g(e,"PRE",{class:!0});var oe=M(J);he=Se(oe,!1),oe.forEach(i),ge=k(e),K=g(e,"P",{"data-svelte-h":!0}),q(K)!=="svelte-2bxwnz"&&(K.innerHTML=Pe),_e=k(e),Q=g(e,"UL",{"data-svelte-h":!0}),q(Q)!=="svelte-1fb5i35"&&(Q.innerHTML=De),ve=k(e),Z(X.$$.fragment,e),this.h()},h(){B.a=null,b(U,"class","language-bash"),ue.a=null,b(F,"class","language-scss"),he.a=null,b(J,"class","language-scss")},m(e,c){ee(t,e,c),u(e,n,c),ee(s,e,c),u(e,p,c),u(e,d,c),u(e,r,c),ee(m,e,c),u(e,$,c),u(e,T,c),u(e,P,c),u(e,U,c),B.m(N,U),u(e,O,c),u(e,A,c),u(e,z,c),u(e,D,c),u(e,w,c),u(e,E,c),u(e,f,c),ee(_,e,c),u(e,j,c),u(e,x,c),u(e,G,c),u(e,F,c),ue.m(Xe,F),u(e,fe,c),u(e,R,c),u(e,de,c),u(e,V,c),u(e,me,c),u(e,J,c),he.m(Ye,J),u(e,ge,c),u(e,K,c),u(e,_e,c),u(e,Q,c),u(e,ve,c),ee(X,e,c),ye=!0},p(e,[c]){const ae={};c&32&&(ae.$$scope={dirty:c,ctx:e}),!l&&c&1&&(l=!0,ae.intersecting=e[0][0],Te(()=>l=!1)),s.$set(ae);const oe={};c&32&&(oe.$$scope={dirty:c,ctx:e}),!L&&c&1&&(L=!0,oe.intersecting=e[0][1],Te(()=>L=!1)),m.$set(oe);const $e={};c&32&&($e.$$scope={dirty:c,ctx:e}),!v&&c&1&&(v=!0,$e.intersecting=e[0][2],Te(()=>v=!1)),_.$set($e)},i(e){ye||(te(t.$$.fragment,e),te(s.$$.fragment,e),te(m.$$.fragment,e),te(_.$$.fragment,e),te(X.$$.fragment,e),ye=!0)},o(e){ne(t.$$.fragment,e),ne(s.$$.fragment,e),ne(m.$$.fragment,e),ne(_.$$.fragment,e),ne(X.$$.fragment,e),ye=!1},d(e){e&&(i(n),i(p),i(d),i(r),i($),i(T),i(P),i(U),i(O),i(A),i(z),i(D),i(w),i(E),i(f),i(j),i(x),i(G),i(F),i(fe),i(R),i(de),i(V),i(me),i(J),i(ge),i(K),i(_e),i(Q),i(ve)),se(t,e),se(s,e),se(m,e),se(_,e),se(X,e)}}}let Ue="/Documentation/Defining_an_Editor/Fragments",je="/Documentation/Defining_an_Editor/The_Parser_Projection";function ut(a,t,n){let s;Fe(a,le,r=>n(4,s=r)),ke(le,s=[{title:"Styling",visible:!1,ref:"#styling-1"},{title:"Styling the Web Application",visible:!1,ref:"#styling-the-web-application-2"},{title:"Styling the Editor",visible:!1,ref:"#styling-the-editor-3"}],s);let l=[];nt(()=>{document.querySelectorAll("pre").forEach(m=>{const L=document.createElement("div");L.className="copy-prompt";const $=document.createElement("p");$.innerHTML="👆 Click to copy",$.className="copy-prompt-p";const T=document.createElement("img");T.src="/icons/copy-icon.svg",T.className="copy-prompt-img",L.appendChild(T),L.appendChild($),m.appendChild(L),m.querySelector(".copy-prompt > p").addEventListener("click",H=>{ot(m.querySelector("code").textContent),m.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{m.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function p(r){a.$$.not_equal(l[0],r)&&(l[0]=r,n(0,l))}function d(r){a.$$.not_equal(l[1],r)&&(l[1]=r,n(0,l))}function o(r){a.$$.not_equal(l[2],r)&&(l[2]=r,n(0,l))}return a.$$.update=()=>{a.$$.dirty&1&&ke(le,s[0].visible=l[0],s),a.$$.dirty&1&&ke(le,s[1].visible=l[1],s),a.$$.dirty&1&&ke(le,s[2].visible=l[2],s)},[l,p,d,o]}class ft extends Ke{constructor(t){super(),Qe(this,t,ut,pt,ze,{})}}function Ne(a,t,n){const s=a.slice();return s[6]=t[n],s[8]=n,s}function Oe(a,t,n){const s=a.slice();return s[6]=t[n],s[8]=n,s}function dt(a){let t,n;return{c(){t=h("img"),this.h()},l(s){t=g(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){b(t,"class","page-toc-small-img"),Je(t.src,n="/icons/down-arrow.png")||b(t,"src",n),b(t,"alt","arrow down")},m(s,l){u(s,t,l)},d(s){s&&i(t)}}}function mt(a){let t,n;return{c(){t=h("img"),this.h()},l(s){t=g(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){b(t,"class","page-toc-small-img"),Je(t.src,n="/icons/upload.png")||b(t,"src",n),b(t,"alt","arrow up")},m(s,l){u(s,t,l)},d(s){s&&i(t)}}}function Be(a){let t,n,s=be(a[0]),l=[];for(let p=0;p<s.length;p+=1)l[p]=Ge(Oe(a,s,p));return{c(){t=h("div"),n=h("ul");for(let p=0;p<l.length;p+=1)l[p].c();this.h()},l(p){t=g(p,"DIV",{class:!0});var d=M(t);n=g(d,"UL",{class:!0});var o=M(n);for(let r=0;r<l.length;r+=1)l[r].l(o);o.forEach(i),d.forEach(i),this.h()},h(){b(n,"class","page-ul"),b(t,"class","toc-details")},m(p,d){u(p,t,d),S(t,n);for(let o=0;o<l.length;o+=1)l[o]&&l[o].m(n,null)},p(p,d){if(d&5){s=be(p[0]);let o;for(o=0;o<s.length;o+=1){const r=Oe(p,s,o);l[o]?l[o].p(r,d):(l[o]=Ge(r),l[o].c(),l[o].m(n,null))}for(;o<l.length;o+=1)l[o].d(1);l.length=s.length}},d(p){p&&i(t),Re(l,p)}}}function Ge(a){let t,n,s=a[6].title+"",l,p,d;return{c(){t=h("li"),n=h("a"),l=ce(s),d=y(),this.h()},l(o){t=g(o,"LI",{class:!0});var r=M(t);n=g(r,"A",{href:!0});var m=M(n);l=pe(m,s),m.forEach(i),d=k(r),r.forEach(i),this.h()},h(){b(n,"href",p=a[6].ref),W(n,"page-visible",a[8]===a[2]),W(n,"page-nonvisible",a[8]!==a[2]),b(t,"class","page-toc-text")},m(o,r){u(o,t,r),S(t,n),S(n,l),S(t,d)},p(o,r){r&1&&s!==(s=o[6].title+"")&&Ve(l,s),r&1&&p!==(p=o[6].ref)&&b(n,"href",p),r&4&&W(n,"page-visible",o[8]===o[2]),r&4&&W(n,"page-nonvisible",o[8]!==o[2])},d(o){o&&i(t)}}}function We(a){let t,n,s=a[6].title+"",l,p,d;return{c(){t=h("li"),n=h("a"),l=ce(s),d=y(),this.h()},l(o){t=g(o,"LI",{class:!0});var r=M(t);n=g(r,"A",{href:!0});var m=M(n);l=pe(m,s),m.forEach(i),d=k(r),r.forEach(i),this.h()},h(){b(n,"href",p=a[6].ref),W(n,"page-visible",a[8]===a[2]),W(n,"page-nonvisible",a[8]!==a[2]),b(t,"class","page-toc-text")},m(o,r){u(o,t,r),S(t,n),S(n,l),S(t,d)},p(o,r){r&1&&s!==(s=o[6].title+"")&&Ve(l,s),r&1&&p!==(p=o[6].ref)&&b(n,"href",p),r&4&&W(n,"page-visible",o[8]===o[2]),r&4&&W(n,"page-nonvisible",o[8]!==o[2])},d(o){o&&i(t)}}}function ht(a){let t,n,s,l="On this page ...",p,d,o,r,m,L,$,T,H,P,U="On this page",B,N,O,A,ie;function z(f,_){return f[1]?mt:dt}let D=z(a),I=D(a),w=a[1]&&Be(a);m=new lt({}),$=new ft({});let E=be(a[0]),C=[];for(let f=0;f<E.length;f+=1)C[f]=We(Ne(a,E,f));return{c(){t=h("div"),n=h("div"),s=h("p"),s.textContent=l,p=y(),d=h("button"),I.c(),o=y(),w&&w.c(),r=y(),Y(m.$$.fragment),L=y(),Y($.$$.fragment),T=y(),H=h("nav"),P=h("h3"),P.textContent=U,B=y(),N=h("ul");for(let f=0;f<C.length;f+=1)C[f].c();this.h()},l(f){t=g(f,"DIV",{class:!0});var _=M(t);n=g(_,"DIV",{class:!0});var v=M(n);s=g(v,"P",{class:!0,"data-svelte-h":!0}),q(s)!=="svelte-1929lhs"&&(s.textContent=l),p=k(v),d=g(v,"BUTTON",{class:!0});var j=M(d);I.l(j),j.forEach(i),v.forEach(i),o=k(_),w&&w.l(_),r=k(_),Z(m.$$.fragment,_),L=k(_),Z($.$$.fragment,_),_.forEach(i),T=k(f),H=g(f,"NAV",{class:!0});var x=M(H);P=g(x,"H3",{class:!0,"data-svelte-h":!0}),q(P)!=="svelte-1hgt7fi"&&(P.textContent=U),B=k(x),N=g(x,"UL",{class:!0});var re=M(N);for(let G=0;G<C.length;G+=1)C[G].l(re);re.forEach(i),x.forEach(i),this.h()},h(){b(s,"class","page-toc-small-title"),b(d,"class","page-toc-small-expand-button"),b(n,"class","page-toc-small"),b(t,"class","page-main"),b(P,"class","page-toc-title"),b(N,"class","page-ul"),b(H,"class","page-toc")},m(f,_){u(f,t,_),S(t,n),S(n,s),S(n,p),S(n,d),I.m(d,null),S(t,o),w&&w.m(t,null),S(t,r),ee(m,t,null),S(t,L),ee($,t,null),u(f,T,_),u(f,H,_),S(H,P),S(H,B),S(H,N);for(let v=0;v<C.length;v+=1)C[v]&&C[v].m(N,null);O=!0,A||(ie=st(d,"click",a[4]),A=!0)},p(f,[_]){if(D!==(D=z(f))&&(I.d(1),I=D(f),I&&(I.c(),I.m(d,null))),f[1]?w?w.p(f,_):(w=Be(f),w.c(),w.m(t,r)):w&&(w.d(1),w=null),_&5){E=be(f[0]);let v;for(v=0;v<E.length;v+=1){const j=Ne(f,E,v);C[v]?C[v].p(j,_):(C[v]=We(j),C[v].c(),C[v].m(N,null))}for(;v<C.length;v+=1)C[v].d(1);C.length=E.length}},i(f){O||(te(m.$$.fragment,f),te($.$$.fragment,f),O=!0)},o(f){ne(m.$$.fragment,f),ne($.$$.fragment,f),O=!1},d(f){f&&(i(t),i(T),i(H)),I.d(),w&&w.d(),se(m),se($),Re(C,f),A=!1,ie()}}}function gt(a,t,n){let s,l;Fe(a,le,m=>n(0,l=m));let p=!1;function d(m){let L=s;for(let $=0;$<m.length;$++)if(m[$].visible)return $;return L}function o(){n(1,p=!p)}const r=()=>{o()};return a.$$.update=()=>{a.$$.dirty&1&&n(2,s=d(l))},[l,p,s,o,r]}class $t extends Ke{constructor(t){super(),Qe(this,t,gt,ht,ze,{})}}export{$t as component};
//# sourceMappingURL=42.DlZK7I33.js.map
