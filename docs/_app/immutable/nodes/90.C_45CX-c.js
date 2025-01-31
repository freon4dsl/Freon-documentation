import{s as Pe,A as ue,a as w,e as k,H as ke,f as T,b as $,m as X,d as H,F as $e,g as c,h as g,i as d,B as he,v as He,x as re,w as Oe,t as se,o as ne,j as E,C as De,D as Se,E as z,q as Ie,p as Be}from"../chunks/scheduler.CIEH-92L.js";import{S as Me,i as Ae,e as me,c as x,a as G,m as U,t as R,b as W,d as j}from"../chunks/index.HLF2pGCU.js";import{e as ce}from"../chunks/each.BLebZWAa.js";import{w as xe}from"../chunks/index.bxqR-5-s.js";import{P as be,S as de,c as Ge,B as Ue}from"../chunks/index.D1zh88jY.js";import{F as Re}from"../chunks/Figure.ClABA4Sw.js";const te=xe([]);function We(a){let e;return{c(){e=se("Validating the model")},l(s){e=ne(s,"Validating the model")},m(s,n){d(s,e,n)},d(s){s&&c(e)}}}function je(a){let e;return{c(){e=se("Adding type checking")},l(s){e=ne(s,"Adding type checking")},m(s,n){d(s,e,n)},d(s){s&&c(e)}}}function ze(a){let e;return{c(){e=se("The result")},l(s){e=ne(s,"The result")},m(s,n){d(s,e,n)},d(s){s&&c(e)}}}function Je(a){let e,s,n,i,r,u,l=`In the previous lesson we learned how to add typings to the model, but there was not yet a way to show them. In this lesson we will use
	the typings to validate the model, and produce type errors.`,o,h,q,b,C,P=`Freon generates a validator for your DSL that has a number of built-in checks. For instance, the validator checks whether all references
	have a correct value. It also checks whether everything that has the type identifier in the metamodel, has a value that is correct
	according to the rules of TypeScript.`,S,V,Y=`However, for the typings there are no built-in checks. We have to define them ourselves. So, what is it that needs to be defined? Let’s
	take the <code>AndExpression</code> concept. It has a left, and a right hand side, and the types on both sides should be Boolean. It will
	be no surprise that we can define the rules for <code>OrExpression</code>s in the same way. Thus, we add another file, called
	<code>edu.valid</code>, and add the following definitions to it.`,I,B,D,ae=`<code class="language-freon"><span class="token comment">// Education/lesson9-defs/edu.valid#L1-L11
</span>
validator EduValidator for language Education

<span class="token class-name">AndExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, PrimitiveType:<span class="token class-name">Boolean</span> );
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.right, PrimitiveType:<span class="token class-name">Boolean</span> );
&#125;

<span class="token class-name">OrExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, PrimitiveType:<span class="token class-name">Boolean</span> );
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.right, PrimitiveType:<span class="token class-name">Boolean</span> );
&#125;</code>`,J,M,A=`Now what about instances of <code>LessOrEqualsExpression</code>, and the other comparison expressions? They also have a left, and a right
	hand side, but for them, it is important that the types on both sides are the same. We define that as follows.`,y,L,_,f=`<code class="language-freon"><span class="token comment">// Education/lesson9-defs/edu.valid#L13-L31
</span>
<span class="token class-name">LessOrEqualsExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;

<span class="token class-name">GreaterOrEqualsExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;

<span class="token class-name">LessThenExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;

<span class="token class-name">GreaterThenExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;

<span class="token class-name">EqualsExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;</code>`,v,m,F,O,N,Z=`The result should be some error message in the editor. Unfortunately, validation is not done immediately. That is something we like to add
	in a next version of Freon. In the current version you must select <code>Validate</code> from the Edit menu to activate the validator. But
	then it shows you…`,le,K,ie,Q,oe;e=new be({props:{prevLink:ye,nextLink:we}});function Ve(t){a[1](t)}let ge={tag:"h1",id:"validating-the-model-1",$$slots:{default:[We]},$$scope:{ctx:a}};a[0][0]!==void 0&&(ge.intersecting=a[0][0]),n=new de({props:ge}),ue.push(()=>me(n,"intersecting",Ve));function Ne(t){a[2](t)}let _e={tag:"h2",id:"adding-type-checking-2",$$slots:{default:[je]},$$scope:{ctx:a}};a[0][1]!==void 0&&(_e.intersecting=a[0][1]),h=new de({props:_e}),ue.push(()=>me(h,"intersecting",Ne));function Fe(t){a[3](t)}let ve={tag:"h2",id:"the-result-3",$$slots:{default:[ze]},$$scope:{ctx:a}};return a[0][2]!==void 0&&(ve.intersecting=a[0][2]),m=new de({props:ve}),ue.push(()=>me(m,"intersecting",Fe)),K=new Re({props:{imageName:"tutorial/Tutorial-lesson9-screenshot1.png",caption:"Validation error in grading expression",figureNumber:1}}),Q=new be({props:{prevLink:ye,nextLink:we}}),{c(){x(e.$$.fragment),s=w(),x(n.$$.fragment),r=w(),u=k("p"),u.textContent=l,o=w(),x(h.$$.fragment),b=w(),C=k("p"),C.textContent=P,S=w(),V=k("p"),V.innerHTML=Y,I=w(),B=k("pre"),D=new ke(!1),J=w(),M=k("p"),M.innerHTML=A,y=w(),L=k("pre"),_=new ke(!1),v=w(),x(m.$$.fragment),O=w(),N=k("p"),N.innerHTML=Z,le=w(),x(K.$$.fragment),ie=w(),x(Q.$$.fragment),this.h()},l(t){G(e.$$.fragment,t),s=T(t),G(n.$$.fragment,t),r=T(t),u=$(t,"P",{"data-svelte-h":!0}),X(u)!=="svelte-mok1tq"&&(u.textContent=l),o=T(t),G(h.$$.fragment,t),b=T(t),C=$(t,"P",{"data-svelte-h":!0}),X(C)!=="svelte-s91mmq"&&(C.textContent=P),S=T(t),V=$(t,"P",{"data-svelte-h":!0}),X(V)!=="svelte-1mkipl9"&&(V.innerHTML=Y),I=T(t),B=$(t,"PRE",{class:!0});var p=H(B);D=$e(p,!1),p.forEach(c),J=T(t),M=$(t,"P",{"data-svelte-h":!0}),X(M)!=="svelte-sy9xgt"&&(M.innerHTML=A),y=T(t),L=$(t,"PRE",{class:!0});var ee=H(L);_=$e(ee,!1),ee.forEach(c),v=T(t),G(m.$$.fragment,t),O=T(t),N=$(t,"P",{"data-svelte-h":!0}),X(N)!=="svelte-1g6s3iu"&&(N.innerHTML=Z),le=T(t),G(K.$$.fragment,t),ie=T(t),G(Q.$$.fragment,t),this.h()},h(){D.a=null,g(B,"class","language-freon"),_.a=null,g(L,"class","language-freon")},m(t,p){U(e,t,p),d(t,s,p),U(n,t,p),d(t,r,p),d(t,u,p),d(t,o,p),U(h,t,p),d(t,b,p),d(t,C,p),d(t,S,p),d(t,V,p),d(t,I,p),d(t,B,p),D.m(ae,B),d(t,J,p),d(t,M,p),d(t,y,p),d(t,L,p),_.m(f,L),d(t,v,p),U(m,t,p),d(t,O,p),d(t,N,p),d(t,le,p),U(K,t,p),d(t,ie,p),U(Q,t,p),oe=!0},p(t,[p]){const ee={};p&32&&(ee.$$scope={dirty:p,ctx:t}),!i&&p&1&&(i=!0,ee.intersecting=t[0][0],he(()=>i=!1)),n.$set(ee);const pe={};p&32&&(pe.$$scope={dirty:p,ctx:t}),!q&&p&1&&(q=!0,pe.intersecting=t[0][1],he(()=>q=!1)),h.$set(pe);const fe={};p&32&&(fe.$$scope={dirty:p,ctx:t}),!F&&p&1&&(F=!0,fe.intersecting=t[0][2],he(()=>F=!1)),m.$set(fe)},i(t){oe||(R(e.$$.fragment,t),R(n.$$.fragment,t),R(h.$$.fragment,t),R(m.$$.fragment,t),R(K.$$.fragment,t),R(Q.$$.fragment,t),oe=!0)},o(t){W(e.$$.fragment,t),W(n.$$.fragment,t),W(h.$$.fragment,t),W(m.$$.fragment,t),W(K.$$.fragment,t),W(Q.$$.fragment,t),oe=!1},d(t){t&&(c(s),c(r),c(u),c(o),c(b),c(C),c(S),c(V),c(I),c(B),c(J),c(M),c(y),c(L),c(v),c(O),c(N),c(le),c(ie)),j(e,t),j(n,t),j(h,t),j(m,t),j(K,t),j(Q,t)}}}let ye="/Tutorial/How_to_Handle_Typing",we="/Tutorial/Conclusion";function Ke(a,e,s){let n;He(a,te,o=>s(4,n=o)),re(te,n=[{title:"Validating the model",visible:!1,ref:"#validating-the-model-1"},{title:"Adding type checking",visible:!1,ref:"#adding-type-checking-2"},{title:"The result",visible:!1,ref:"#the-result-3"}],n);let i=[];Oe(()=>{document.querySelectorAll("pre").forEach(h=>{const q=document.createElement("div");q.className="copy-prompt";const b=document.createElement("p");b.innerHTML="👆 Click to copy",b.className="copy-prompt-p";const C=document.createElement("img");C.src="/icons/copy-icon.svg",C.className="copy-prompt-img",q.appendChild(C),q.appendChild(b),h.appendChild(q),h.querySelector(".copy-prompt > p").addEventListener("click",P=>{Ge(h.querySelector("code").textContent),h.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{h.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function r(o){a.$$.not_equal(i[0],o)&&(i[0]=o,s(0,i))}function u(o){a.$$.not_equal(i[1],o)&&(i[1]=o,s(0,i))}function l(o){a.$$.not_equal(i[2],o)&&(i[2]=o,s(0,i))}return a.$$.update=()=>{a.$$.dirty&1&&re(te,n[0].visible=i[0],n),a.$$.dirty&1&&re(te,n[1].visible=i[1],n),a.$$.dirty&1&&re(te,n[2].visible=i[2],n)},[i,r,u,l]}class Qe extends Me{constructor(e){super(),Ae(this,e,Ke,Je,Pe,{})}}function Te(a,e,s){const n=a.slice();return n[6]=e[s],n[8]=s,n}function Ee(a,e,s){const n=a.slice();return n[6]=e[s],n[8]=s,n}function Xe(a){let e,s;return{c(){e=k("img"),this.h()},l(n){e=$(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","page-toc-small-img"),Be(e.src,s="/icons/down-arrow.png")||g(e,"src",s),g(e,"alt","arrow down")},m(n,i){d(n,e,i)},d(n){n&&c(e)}}}function Ye(a){let e,s;return{c(){e=k("img"),this.h()},l(n){e=$(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","page-toc-small-img"),Be(e.src,s="/icons/upload.png")||g(e,"src",s),g(e,"alt","arrow up")},m(n,i){d(n,e,i)},d(n){n&&c(e)}}}function Ce(a){let e,s,n=ce(a[0]),i=[];for(let r=0;r<n.length;r+=1)i[r]=qe(Ee(a,n,r));return{c(){e=k("div"),s=k("ul");for(let r=0;r<i.length;r+=1)i[r].c();this.h()},l(r){e=$(r,"DIV",{class:!0});var u=H(e);s=$(u,"UL",{class:!0});var l=H(s);for(let o=0;o<i.length;o+=1)i[o].l(l);l.forEach(c),u.forEach(c),this.h()},h(){g(s,"class","page-ul"),g(e,"class","toc-details")},m(r,u){d(r,e,u),E(e,s);for(let l=0;l<i.length;l+=1)i[l]&&i[l].m(s,null)},p(r,u){if(u&5){n=ce(r[0]);let l;for(l=0;l<n.length;l+=1){const o=Ee(r,n,l);i[l]?i[l].p(o,u):(i[l]=qe(o),i[l].c(),i[l].m(s,null))}for(;l<i.length;l+=1)i[l].d(1);i.length=n.length}},d(r){r&&c(e),Se(i,r)}}}function qe(a){let e,s,n=a[6].title+"",i,r,u;return{c(){e=k("li"),s=k("a"),i=se(n),u=w(),this.h()},l(l){e=$(l,"LI",{class:!0});var o=H(e);s=$(o,"A",{href:!0});var h=H(s);i=ne(h,n),h.forEach(c),u=T(o),o.forEach(c),this.h()},h(){g(s,"href",r=a[6].ref),z(s,"page-visible",a[8]===a[2]),z(s,"page-nonvisible",a[8]!==a[2]),g(e,"class","page-toc-text")},m(l,o){d(l,e,o),E(e,s),E(s,i),E(e,u)},p(l,o){o&1&&n!==(n=l[6].title+"")&&Ie(i,n),o&1&&r!==(r=l[6].ref)&&g(s,"href",r),o&4&&z(s,"page-visible",l[8]===l[2]),o&4&&z(s,"page-nonvisible",l[8]!==l[2])},d(l){l&&c(e)}}}function Le(a){let e,s,n=a[6].title+"",i,r,u;return{c(){e=k("li"),s=k("a"),i=se(n),u=w(),this.h()},l(l){e=$(l,"LI",{class:!0});var o=H(e);s=$(o,"A",{href:!0});var h=H(s);i=ne(h,n),h.forEach(c),u=T(o),o.forEach(c),this.h()},h(){g(s,"href",r=a[6].ref),z(s,"page-visible",a[8]===a[2]),z(s,"page-nonvisible",a[8]!==a[2]),g(e,"class","page-toc-text")},m(l,o){d(l,e,o),E(e,s),E(s,i),E(e,u)},p(l,o){o&1&&n!==(n=l[6].title+"")&&Ie(i,n),o&1&&r!==(r=l[6].ref)&&g(s,"href",r),o&4&&z(s,"page-visible",l[8]===l[2]),o&4&&z(s,"page-nonvisible",l[8]!==l[2])},d(l){l&&c(e)}}}function Ze(a){let e,s,n,i="On this page ...",r,u,l,o,h,q,b,C,P,S,V="On this page",Y,I,B,D,ae;function J(f,v){return f[1]?Ye:Xe}let M=J(a),A=M(a),y=a[1]&&Ce(a);h=new Ue({}),b=new Qe({});let L=ce(a[0]),_=[];for(let f=0;f<L.length;f+=1)_[f]=Le(Te(a,L,f));return{c(){e=k("div"),s=k("div"),n=k("p"),n.textContent=i,r=w(),u=k("button"),A.c(),l=w(),y&&y.c(),o=w(),x(h.$$.fragment),q=w(),x(b.$$.fragment),C=w(),P=k("nav"),S=k("h3"),S.textContent=V,Y=w(),I=k("ul");for(let f=0;f<_.length;f+=1)_[f].c();this.h()},l(f){e=$(f,"DIV",{class:!0});var v=H(e);s=$(v,"DIV",{class:!0});var m=H(s);n=$(m,"P",{class:!0,"data-svelte-h":!0}),X(n)!=="svelte-1929lhs"&&(n.textContent=i),r=T(m),u=$(m,"BUTTON",{class:!0});var F=H(u);A.l(F),F.forEach(c),m.forEach(c),l=T(v),y&&y.l(v),o=T(v),G(h.$$.fragment,v),q=T(v),G(b.$$.fragment,v),v.forEach(c),C=T(f),P=$(f,"NAV",{class:!0});var O=H(P);S=$(O,"H3",{class:!0,"data-svelte-h":!0}),X(S)!=="svelte-1hgt7fi"&&(S.textContent=V),Y=T(O),I=$(O,"UL",{class:!0});var N=H(I);for(let Z=0;Z<_.length;Z+=1)_[Z].l(N);N.forEach(c),O.forEach(c),this.h()},h(){g(n,"class","page-toc-small-title"),g(u,"class","page-toc-small-expand-button"),g(s,"class","page-toc-small"),g(e,"class","page-main"),g(S,"class","page-toc-title"),g(I,"class","page-ul"),g(P,"class","page-toc")},m(f,v){d(f,e,v),E(e,s),E(s,n),E(s,r),E(s,u),A.m(u,null),E(e,l),y&&y.m(e,null),E(e,o),U(h,e,null),E(e,q),U(b,e,null),d(f,C,v),d(f,P,v),E(P,S),E(P,Y),E(P,I);for(let m=0;m<_.length;m+=1)_[m]&&_[m].m(I,null);B=!0,D||(ae=De(u,"click",a[4]),D=!0)},p(f,[v]){if(M!==(M=J(f))&&(A.d(1),A=M(f),A&&(A.c(),A.m(u,null))),f[1]?y?y.p(f,v):(y=Ce(f),y.c(),y.m(e,o)):y&&(y.d(1),y=null),v&5){L=ce(f[0]);let m;for(m=0;m<L.length;m+=1){const F=Te(f,L,m);_[m]?_[m].p(F,v):(_[m]=Le(F),_[m].c(),_[m].m(I,null))}for(;m<_.length;m+=1)_[m].d(1);_.length=L.length}},i(f){B||(R(h.$$.fragment,f),R(b.$$.fragment,f),B=!0)},o(f){W(h.$$.fragment,f),W(b.$$.fragment,f),B=!1},d(f){f&&(c(e),c(C),c(P)),A.d(),y&&y.d(),j(h),j(b),Se(_,f),D=!1,ae()}}}function et(a,e,s){let n,i;He(a,te,h=>s(0,i=h));let r=!1;function u(h){let q=n;for(let b=0;b<h.length;b++)if(h[b].visible)return b;return q}function l(){s(1,r=!r)}const o=()=>{l()};return a.$$.update=()=>{a.$$.dirty&1&&s(2,n=u(i))},[i,r,n,l,o]}class ot extends Me{constructor(e){super(),Ae(this,e,et,Ze,Pe,{})}}export{ot as component};
//# sourceMappingURL=90.C_45CX-c.js.map
