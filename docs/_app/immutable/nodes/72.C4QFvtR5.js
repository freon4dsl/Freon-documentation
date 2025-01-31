import{s as ye,A as ce,a as C,e as b,H as ie,f as w,b as $,m as X,d as A,F as re,g as i,h as g,i as d,B as ue,v as Ce,x as le,w as Ae,t as ne,o as ae,j as S,C as Me,D as we,E as R,q as Se,p as Te}from"../chunks/scheduler.CIEH-92L.js";import{S as Ee,i as Pe,e as me,c as W,a as z,m as G,t as j,b as J,d as K}from"../chunks/index.HLF2pGCU.js";import{e as se}from"../chunks/each.BLebZWAa.js";import{w as Ne}from"../chunks/index.bxqR-5-s.js";import{P as fe,S as ke,c as Fe,B as Le}from"../chunks/index.yTjXiNmY.js";import{F as qe}from"../chunks/Figure.ClABA4Sw.js";const ee=Ne([]);function Ie(l){let e;return{c(){e=ne("The CourseSchedule Language")},l(s){e=ae(s,"The CourseSchedule Language")},m(s,n){d(s,e,n)},d(s){s&&i(e)}}}function Be(l){let e;return{c(){e=ne("The Freon Native Editor")},l(s){e=ae(s,"The Freon Native Editor")},m(s,n){d(s,e,n)},d(s){s&&i(e)}}}function De(l){let e,s,n,o,c,u,t=`The CourseSchedule DSL revolves about the scheduling of training courses for adults. The main concepts are courses, rooms, and teachers,
	and there is a simplified notion of time. There are 10 time slots in a week, from Monday morning to Friday afternoon.`,p,m,M="The following is the metamodel, which by now you should be able to understand without problems.",v,P,T,D=`<code class="language-freon"><span class="token comment">// CourseSchedule/phase1/defs/main.ast
</span>
language CourseSchedule

<span class="token keyword">model</span> <span class="token class-name">CourseSchedule</span> &#123;
    persons: <span class="token class-name">Staff</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    courses: <span class="token class-name">CourseCategory</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    rooms: <span class="token class-name">Building</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    schedule: <span class="token class-name">Schedule</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Schedule</span> &#123;
    name: <span class="token builtin">identifier</span>;
    timeSlots: <span class="token class-name">Slot</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"scd"</span>;     <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Staff</span> &#123;
    name: <span class="token builtin">identifier</span>;
    teachers: <span class="token class-name">Person</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"prs"</span>;     <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">CourseCategory</span> &#123;
    courses: <span class="token class-name">Course</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"crs"</span>;     <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Building</span> &#123;
    rooms: <span class="token class-name">Room</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"bld"</span>;     <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token comment">/* model unit Schedule */</span>
<span class="token keyword">concept</span> <span class="token class-name">Slot</span> &#123;
    time: <span class="token class-name">TimeStamp</span>;
    <span class="token keyword">reference</span> teacher: <span class="token class-name">Person</span>;
    <span class="token keyword">reference</span> room: <span class="token class-name">Room</span>;
    <span class="token keyword">reference</span> course: <span class="token class-name">Course</span>;
&#125;

<span class="token keyword">limited</span> <span class="token class-name">TimeStamp</span> &#123;
    day: <span class="token builtin">number</span>; <span class="token comment">// 1 = Monday, 2 = Tuesday, etc
</span>    part: <span class="token builtin">number</span>; <span class="token comment">// 1 indicates morning, 2 indicates afternoon
</span>    MondayMorning = &#123; day: <span class="token class-name">1</span>, part: <span class="token class-name">1</span> &#125;
    TuesdayMorning = &#123; day: <span class="token class-name">2</span>, part: <span class="token class-name">1</span> &#125;
    WednesdayMorning = &#123; day: <span class="token class-name">3</span>, part: <span class="token class-name">1</span> &#125;
    ThursdayMorning = &#123; day: <span class="token class-name">4</span>, part: <span class="token class-name">1</span> &#125;
    FridayMorning = &#123; day: <span class="token class-name">5</span>, part: <span class="token class-name">1</span> &#125;
    MondayAfternoon = &#123; day: <span class="token class-name">1</span>, part: <span class="token class-name">2</span> &#125;
    TuesdayAfternoon = &#123; day: <span class="token class-name">2</span>, part: <span class="token class-name">2</span> &#125;
    WednesdayAfternoon = &#123; day: <span class="token class-name">3</span>, part: <span class="token class-name">2</span> &#125;
    ThursdayAfternoon = &#123; day: <span class="token class-name">4</span>, part: <span class="token class-name">2</span> &#125;
    FridayAfternoon = &#123; day: <span class="token class-name">5</span>, part: <span class="token class-name">2</span> &#125;
&#125;

<span class="token comment">/* model unit Staff */</span>
<span class="token keyword">concept</span> <span class="token class-name">Person</span> &#123;
    name: <span class="token builtin">identifier</span>;
    fullName: <span class="token builtin">string</span>;
    phone: <span class="token builtin">number</span>;
    availability: <span class="token class-name">TimeStamp</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    <span class="token keyword">reference</span> competence: <span class="token class-name">Course</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token comment">/* model unit CourseCategory */</span>
<span class="token keyword">concept</span> <span class="token class-name">Course</span> &#123;
    name: <span class="token builtin">identifier</span>;
    description: <span class="token builtin">string</span>;
&#125;

<span class="token comment">/* model unit AllCourses */</span>
<span class="token keyword">concept</span> <span class="token class-name">Room</span> &#123;
    name: <span class="token builtin">identifier</span>;
    equipment: <span class="token builtin">string</span>;
&#125;
</code>`,V,x,L,H,q,Y=`As a first step we will create a native Freon editor, but we are not going to spend much effort on it. We will make the name and phone
	number information of a teacher into a fragment, put the list of competences of a teacher in a list of checkboxes, and clean up the rest a
	little bit.`,O,N,E,y=`<code class="language-freon"><span class="token comment">// CourseSchedule/phase1/defs/main.edit
</span>
<span class="token keyword">editor</span> <span class="token keyword">default</span>

<span class="token class-name">global</span> &#123;
    <span class="token class-name">external</span> &#123;
        PersonIcon,
        PhoneButton,
        StaffAccordion,
        Schedule
    &#125;
&#125;

<span class="token comment">/* model unit Staff */</span>
<span class="token class-name">Staff</span> &#123;<span class="token punctuation">[</span>
Staff <span class="token keyword">in</span> the category: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;

    $&#123;<span class="token function"><span class="token variable">self</span>.teachers</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Person</span> &#123;<span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token keyword">fragment</span> name<span class="token punctuation">]</span>
        Availability: $&#123;<span class="token function"><span class="token variable">self</span>.availability <span class="token keyword">checkbox</span></span>&#125; Competence: $&#123;<span class="token function"><span class="token variable">self</span>.competence</span>&#125;
<span class="token punctuation">]</span>
<span class="token keyword">fragment</span> name <span class="token punctuation">[</span>
Nickname: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
Full Name: $&#123;<span class="token function"><span class="token variable">self</span>.fullName</span>&#125;
Phone <span class="token builtin">number</span>: $&#123;<span class="token function"><span class="token variable">self</span>.phone</span>&#125;
<span class="token punctuation">]</span>
&#125;

<span class="token comment">/* model unit CourseCategory */</span>
<span class="token class-name">CourseCategory</span> &#123;<span class="token punctuation">[</span>
Category: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;

    $&#123;<span class="token function"><span class="token variable">self</span>.courses</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token comment">/* model unit Schedule */</span>
<span class="token class-name">Schedule</span> &#123;<span class="token punctuation">[</span>
Schedule $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;

    $&#123;<span class="token function"><span class="token variable">self</span>.timeSlots</span>&#125;
<span class="token punctuation">]</span>&#125;
<span class="token class-name">Slot</span> &#123;<span class="token punctuation">[</span>
$&#123;<span class="token function"><span class="token variable">self</span>.time</span>&#125;
    Teacher: $&#123;<span class="token function"><span class="token variable">self</span>.teacher</span>&#125;
    Room:    $&#123;<span class="token function"><span class="token variable">self</span>.room</span>&#125;
    Course:  $&#123;<span class="token function"><span class="token variable">self</span>.course</span>&#125;
<span class="token punctuation">]</span>&#125;
</code>`,I,h,r="The editor for the staff model unit now looks like this.",_,k,B,F,U;e=new fe({props:{prevLink:de,nextLink:he}});function Z(a){l[1](a)}let oe={tag:"h1",id:"the-courseschedule-language-1",$$slots:{default:[Ie]},$$scope:{ctx:l}};l[0][0]!==void 0&&(oe.intersecting=l[0][0]),n=new ke({props:oe}),ce.push(()=>me(n,"intersecting",Z));function xe(a){l[2](a)}let pe={tag:"h2",id:"the-freon-native-editor-2",$$slots:{default:[Be]},$$scope:{ctx:l}};return l[0][1]!==void 0&&(pe.intersecting=l[0][1]),x=new ke({props:pe}),ce.push(()=>me(x,"intersecting",xe)),k=new qe({props:{imageName:"examples/CourseSchedule/Screenshot-step1.png",caption:"The native Freon editor",figureNumber:1}}),F=new fe({props:{prevLink:de,nextLink:he}}),{c(){W(e.$$.fragment),s=C(),W(n.$$.fragment),c=C(),u=b("p"),u.textContent=t,p=C(),m=b("p"),m.textContent=M,v=C(),P=b("pre"),T=new ie(!1),V=C(),W(x.$$.fragment),H=C(),q=b("p"),q.textContent=Y,O=C(),N=b("pre"),E=new ie(!1),I=C(),h=b("p"),h.textContent=r,_=C(),W(k.$$.fragment),B=C(),W(F.$$.fragment),this.h()},l(a){z(e.$$.fragment,a),s=w(a),z(n.$$.fragment,a),c=w(a),u=$(a,"P",{"data-svelte-h":!0}),X(u)!=="svelte-xcsazm"&&(u.textContent=t),p=w(a),m=$(a,"P",{"data-svelte-h":!0}),X(m)!=="svelte-ysmc1z"&&(m.textContent=M),v=w(a),P=$(a,"PRE",{class:!0});var f=A(P);T=re(f,!1),f.forEach(i),V=w(a),z(x.$$.fragment,a),H=w(a),q=$(a,"P",{"data-svelte-h":!0}),X(q)!=="svelte-10ev2ix"&&(q.textContent=Y),O=w(a),N=$(a,"PRE",{class:!0});var Q=A(N);E=re(Q,!1),Q.forEach(i),I=w(a),h=$(a,"P",{"data-svelte-h":!0}),X(h)!=="svelte-1wlmgkw"&&(h.textContent=r),_=w(a),z(k.$$.fragment,a),B=w(a),z(F.$$.fragment,a),this.h()},h(){T.a=null,g(P,"class","language-freon"),E.a=null,g(N,"class","language-freon")},m(a,f){G(e,a,f),d(a,s,f),G(n,a,f),d(a,c,f),d(a,u,f),d(a,p,f),d(a,m,f),d(a,v,f),d(a,P,f),T.m(D,P),d(a,V,f),G(x,a,f),d(a,H,f),d(a,q,f),d(a,O,f),d(a,N,f),E.m(y,N),d(a,I,f),d(a,h,f),d(a,_,f),G(k,a,f),d(a,B,f),G(F,a,f),U=!0},p(a,[f]){const Q={};f&16&&(Q.$$scope={dirty:f,ctx:a}),!o&&f&1&&(o=!0,Q.intersecting=a[0][0],ue(()=>o=!1)),n.$set(Q);const te={};f&16&&(te.$$scope={dirty:f,ctx:a}),!L&&f&1&&(L=!0,te.intersecting=a[0][1],ue(()=>L=!1)),x.$set(te)},i(a){U||(j(e.$$.fragment,a),j(n.$$.fragment,a),j(x.$$.fragment,a),j(k.$$.fragment,a),j(F.$$.fragment,a),U=!0)},o(a){J(e.$$.fragment,a),J(n.$$.fragment,a),J(x.$$.fragment,a),J(k.$$.fragment,a),J(F.$$.fragment,a),U=!1},d(a){a&&(i(s),i(c),i(u),i(p),i(m),i(v),i(P),i(V),i(H),i(q),i(O),i(N),i(I),i(h),i(_),i(B)),K(e,a),K(n,a),K(x,a),K(k,a),K(F,a)}}}let de="/Examples/External_Components",he="/Examples/External_Components/An_Icon_Component";function He(l,e,s){let n;Ce(l,ee,t=>s(3,n=t)),le(ee,n=[{title:"The CourseSchedule Language",visible:!1,ref:"#the-courseschedule-language-1"},{title:"The Freon Native Editor",visible:!1,ref:"#the-freon-native-editor-2"}],n);let o=[];Ae(()=>{document.querySelectorAll("pre").forEach(p=>{const m=document.createElement("div");m.className="copy-prompt";const M=document.createElement("p");M.innerHTML="👆 Click to copy",M.className="copy-prompt-p";const v=document.createElement("img");v.src="/icons/copy-icon.svg",v.className="copy-prompt-img",m.appendChild(v),m.appendChild(M),p.appendChild(m),p.querySelector(".copy-prompt > p").addEventListener("click",P=>{Fe(p.querySelector("code").textContent),p.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{p.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function c(t){l.$$.not_equal(o[0],t)&&(o[0]=t,s(0,o))}function u(t){l.$$.not_equal(o[1],t)&&(o[1]=t,s(0,o))}return l.$$.update=()=>{l.$$.dirty&1&&le(ee,n[0].visible=o[0],n),l.$$.dirty&1&&le(ee,n[1].visible=o[1],n)},[o,c,u]}class Re extends Ee{constructor(e){super(),Pe(this,e,He,De,ye,{})}}function ge(l,e,s){const n=l.slice();return n[6]=e[s],n[8]=s,n}function _e(l,e,s){const n=l.slice();return n[6]=e[s],n[8]=s,n}function Ve(l){let e,s;return{c(){e=b("img"),this.h()},l(n){e=$(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","page-toc-small-img"),Te(e.src,s="/icons/down-arrow.png")||g(e,"src",s),g(e,"alt","arrow down")},m(n,o){d(n,e,o)},d(n){n&&i(e)}}}function Oe(l){let e,s;return{c(){e=b("img"),this.h()},l(n){e=$(n,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","page-toc-small-img"),Te(e.src,s="/icons/upload.png")||g(e,"src",s),g(e,"alt","arrow up")},m(n,o){d(n,e,o)},d(n){n&&i(e)}}}function ve(l){let e,s,n=se(l[0]),o=[];for(let c=0;c<n.length;c+=1)o[c]=be(_e(l,n,c));return{c(){e=b("div"),s=b("ul");for(let c=0;c<o.length;c+=1)o[c].c();this.h()},l(c){e=$(c,"DIV",{class:!0});var u=A(e);s=$(u,"UL",{class:!0});var t=A(s);for(let p=0;p<o.length;p+=1)o[p].l(t);t.forEach(i),u.forEach(i),this.h()},h(){g(s,"class","page-ul"),g(e,"class","toc-details")},m(c,u){d(c,e,u),S(e,s);for(let t=0;t<o.length;t+=1)o[t]&&o[t].m(s,null)},p(c,u){if(u&5){n=se(c[0]);let t;for(t=0;t<n.length;t+=1){const p=_e(c,n,t);o[t]?o[t].p(p,u):(o[t]=be(p),o[t].c(),o[t].m(s,null))}for(;t<o.length;t+=1)o[t].d(1);o.length=n.length}},d(c){c&&i(e),we(o,c)}}}function be(l){let e,s,n=l[6].title+"",o,c,u;return{c(){e=b("li"),s=b("a"),o=ne(n),u=C(),this.h()},l(t){e=$(t,"LI",{class:!0});var p=A(e);s=$(p,"A",{href:!0});var m=A(s);o=ae(m,n),m.forEach(i),u=w(p),p.forEach(i),this.h()},h(){g(s,"href",c=l[6].ref),R(s,"page-visible",l[8]===l[2]),R(s,"page-nonvisible",l[8]!==l[2]),g(e,"class","page-toc-text")},m(t,p){d(t,e,p),S(e,s),S(s,o),S(e,u)},p(t,p){p&1&&n!==(n=t[6].title+"")&&Se(o,n),p&1&&c!==(c=t[6].ref)&&g(s,"href",c),p&4&&R(s,"page-visible",t[8]===t[2]),p&4&&R(s,"page-nonvisible",t[8]!==t[2])},d(t){t&&i(e)}}}function $e(l){let e,s,n=l[6].title+"",o,c,u;return{c(){e=b("li"),s=b("a"),o=ne(n),u=C(),this.h()},l(t){e=$(t,"LI",{class:!0});var p=A(e);s=$(p,"A",{href:!0});var m=A(s);o=ae(m,n),m.forEach(i),u=w(p),p.forEach(i),this.h()},h(){g(s,"href",c=l[6].ref),R(s,"page-visible",l[8]===l[2]),R(s,"page-nonvisible",l[8]!==l[2]),g(e,"class","page-toc-text")},m(t,p){d(t,e,p),S(e,s),S(s,o),S(e,u)},p(t,p){p&1&&n!==(n=t[6].title+"")&&Se(o,n),p&1&&c!==(c=t[6].ref)&&g(s,"href",c),p&4&&R(s,"page-visible",t[8]===t[2]),p&4&&R(s,"page-nonvisible",t[8]!==t[2])},d(t){t&&i(e)}}}function Ue(l){let e,s,n,o="On this page ...",c,u,t,p,m,M,v,P,T,D,V="On this page",x,L,H,q,Y;function O(r,_){return r[1]?Oe:Ve}let N=O(l),E=N(l),y=l[1]&&ve(l);m=new Le({}),v=new Re({});let I=se(l[0]),h=[];for(let r=0;r<I.length;r+=1)h[r]=$e(ge(l,I,r));return{c(){e=b("div"),s=b("div"),n=b("p"),n.textContent=o,c=C(),u=b("button"),E.c(),t=C(),y&&y.c(),p=C(),W(m.$$.fragment),M=C(),W(v.$$.fragment),P=C(),T=b("nav"),D=b("h3"),D.textContent=V,x=C(),L=b("ul");for(let r=0;r<h.length;r+=1)h[r].c();this.h()},l(r){e=$(r,"DIV",{class:!0});var _=A(e);s=$(_,"DIV",{class:!0});var k=A(s);n=$(k,"P",{class:!0,"data-svelte-h":!0}),X(n)!=="svelte-1929lhs"&&(n.textContent=o),c=w(k),u=$(k,"BUTTON",{class:!0});var B=A(u);E.l(B),B.forEach(i),k.forEach(i),t=w(_),y&&y.l(_),p=w(_),z(m.$$.fragment,_),M=w(_),z(v.$$.fragment,_),_.forEach(i),P=w(r),T=$(r,"NAV",{class:!0});var F=A(T);D=$(F,"H3",{class:!0,"data-svelte-h":!0}),X(D)!=="svelte-1hgt7fi"&&(D.textContent=V),x=w(F),L=$(F,"UL",{class:!0});var U=A(L);for(let Z=0;Z<h.length;Z+=1)h[Z].l(U);U.forEach(i),F.forEach(i),this.h()},h(){g(n,"class","page-toc-small-title"),g(u,"class","page-toc-small-expand-button"),g(s,"class","page-toc-small"),g(e,"class","page-main"),g(D,"class","page-toc-title"),g(L,"class","page-ul"),g(T,"class","page-toc")},m(r,_){d(r,e,_),S(e,s),S(s,n),S(s,c),S(s,u),E.m(u,null),S(e,t),y&&y.m(e,null),S(e,p),G(m,e,null),S(e,M),G(v,e,null),d(r,P,_),d(r,T,_),S(T,D),S(T,x),S(T,L);for(let k=0;k<h.length;k+=1)h[k]&&h[k].m(L,null);H=!0,q||(Y=Me(u,"click",l[4]),q=!0)},p(r,[_]){if(N!==(N=O(r))&&(E.d(1),E=N(r),E&&(E.c(),E.m(u,null))),r[1]?y?y.p(r,_):(y=ve(r),y.c(),y.m(e,p)):y&&(y.d(1),y=null),_&5){I=se(r[0]);let k;for(k=0;k<I.length;k+=1){const B=ge(r,I,k);h[k]?h[k].p(B,_):(h[k]=$e(B),h[k].c(),h[k].m(L,null))}for(;k<h.length;k+=1)h[k].d(1);h.length=I.length}},i(r){H||(j(m.$$.fragment,r),j(v.$$.fragment,r),H=!0)},o(r){J(m.$$.fragment,r),J(v.$$.fragment,r),H=!1},d(r){r&&(i(e),i(P),i(T)),E.d(),y&&y.d(),K(m),K(v),we(h,r),q=!1,Y()}}}function We(l,e,s){let n,o;Ce(l,ee,m=>s(0,o=m));let c=!1;function u(m){let M=n;for(let v=0;v<m.length;v++)if(m[v].visible)return v;return M}function t(){s(1,c=!c)}const p=()=>{t()};return l.$$.update=()=>{l.$$.dirty&1&&s(2,n=u(o))},[o,c,n,t,p]}class Xe extends Ee{constructor(e){super(),Pe(this,e,We,Ue,ye,{})}}export{Xe as component};
//# sourceMappingURL=72.C4QFvtR5.js.map
