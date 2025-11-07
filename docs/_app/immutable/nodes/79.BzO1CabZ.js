import{f,a as c,t as oe,e as xe}from"../chunks/nks1QWJh.js";import{y as de,G as me,x as I,z as ue,u as t,A as ne,g as a,I as re,B as R,a as N,$ as Te,v,s as pe,w as g}from"../chunks/bZIXIZs8.js";import{d as we,i as B,s as ie}from"../chunks/DANOUgWt.js";import{e as W,p as Me,i as Pe,s as se}from"../chunks/CKHUE_gp.js";import{h as ke}from"../chunks/DCXhKCCG.js";import{h as Le}from"../chunks/aX-frc9G.js";import{s as r}from"../chunks/BpSVRMQn.js";import{o as Ne}from"../chunks/D62n5Z03.js";import{P as le,S as ce,c as Ae,B as Fe}from"../chunks/CFDUsp8k.js";import{F as Be}from"../chunks/Bq9rkPJ0.js";const Ee=async({parent:M})=>{const{site:e,category:h}=await M();return{site:e,category:h,page:{title:"The CourseSchedule Language",description:"Define a simple DSL for scheduling adult training courses with teachers, rooms, and weekly time slots, and create a minimal native Freon editor to view and edit schedules.",tags:["Freon","CourseSchedule","DSL","scheduling","teachers","rooms","TimeStamp","modelunit","editor","projections","checkbox","fragments"],modifiedTime:"2025-11-07T17:20:18.642Z",publishedTime:"2025-11-07T17:20:18.642Z"}}},nt=Object.freeze(Object.defineProperty({__proto__:null,load:Ee},Symbol.toStringTag,{value:"Module"}));var qe=f(`<!> <!> <p>The <strong>CourseSchedule</strong> DSL focuses on scheduling adult training courses.<br/> Its core concepts are <strong>courses</strong>, <strong>rooms</strong>, and <strong>teachers</strong>, with a simplified notion of time:<br/> ten time slots per week—<strong>Monday morning</strong> through <strong>Friday afternoon</strong>.</p> <p>Below is the metamodel, which by now should feel familiar.</p> <pre class="language-freon"><code class="language-freon">// CourseSchedule/phase1/defs/main.ast

language CourseSchedule

model CourseSchedule &#123;
    persons: Staff[];
    courses: CourseCategory[];
    rooms: Building[];
    schedule: Schedule[];
&#125;

modelunit Schedule &#123;
    name: identifier;
    timeSlots: Slot[];
    file-extension = "scd";     // the file extension used by the parser
&#125;

modelunit Staff &#123;
    name: identifier;
    teachers: Person[];
    file-extension = "prs";     // the file extension used by the parser
&#125;

modelunit CourseCategory &#123;
    courses: Course[];
    file-extension = "crs";     // the file extension used by the parser
&#125;

modelunit Building &#123;
    rooms: Room[];
    file-extension = "bld";     // the file extension used by the parser
&#125;

/* model unit Schedule */
concept Slot &#123;
    time: TimeStamp;
    reference teacher: Person;
    reference room: Room;
    reference course: Course;
&#125;

limited TimeStamp &#123;
    day: number; // 1 = Monday, 2 = Tuesday, etc
    part: number; // 1 indicates morning, 2 indicates afternoon
    MondayMorning = &#123; day: 1, part: 1 &#125;
    TuesdayMorning = &#123; day: 2, part: 1 &#125;
    WednesdayMorning = &#123; day: 3, part: 1 &#125;
    ThursdayMorning = &#123; day: 4, part: 1 &#125;
    FridayMorning = &#123; day: 5, part: 1 &#125;
    MondayAfternoon = &#123; day: 1, part: 2 &#125;
    TuesdayAfternoon = &#123; day: 2, part: 2 &#125;
    WednesdayAfternoon = &#123; day: 3, part: 2 &#125;
    ThursdayAfternoon = &#123; day: 4, part: 2 &#125;
    FridayAfternoon = &#123; day: 5, part: 2 &#125;
&#125;

/* model unit Staff */
concept Person &#123;
    name: identifier;
    fullName: string;
    phone: number;
    availability: TimeStamp[];
    reference competence: Course[];
&#125;

/* model unit CourseCategory */
concept Course &#123;
    name: identifier;
    description: string;
&#125;

/* model unit AllCourses */
concept Room &#123;
    name: identifier;
    equipment: string;
&#125;</code></pre> <!> <p>As a first step we’ll create a <strong>native Freon editor</strong>—kept intentionally simple.<br/> We’ll extract a <strong>fragment</strong> for the teacher’s name and phone info, display a teacher’s <strong>competences</strong> as a <strong>checkbox</strong> list, and tidy up the rest.</p> <pre class="language-freon"><code class="language-freon">// CourseSchedule/phase1/defs/main.edit

editor default

global &#123;
    external &#123;
        PersonIcon,
        PhoneButton,
        StaffAccordion,
        Schedule
    &#125;
&#125;

/* model unit Staff */
Staff &#123;[
Staff in the category: $&#123;self.name&#125;

    $&#123;self.teachers&#125;
]&#125;

Person &#123;[
    [fragment name]
        Availability: $&#123;self.availability checkbox&#125; Competence: $&#123;self.competence&#125;
]
fragment name [
Nickname: $&#123;self.name&#125;
Full Name: $&#123;self.fullName&#125;
Phone number: $&#123;self.phone&#125;
]
&#125;

/* model unit CourseCategory */
CourseCategory &#123;[
Category: $&#123;self.name&#125;

    $&#123;self.courses&#125;
]&#125;

/* model unit Schedule */
Schedule &#123;[
Schedule $&#123;self.name&#125;

    $&#123;self.timeSlots&#125;
]&#125;
Slot &#123;[
$&#123;self.time&#125;
    Teacher: $&#123;self.teacher&#125;
    Room:    $&#123;self.room&#125;
    Course:  $&#123;self.course&#125;
]&#125;</code></pre> <p>The editor for the <strong>Staff</strong> model unit now looks like this:</p> <!> <!>`,1);function Ie(M,e){de(e,!0);const h=me({});Ne(()=>{document.querySelectorAll("pre").forEach(d=>{const s=document.createElement("div");s.className="copy-prompt";const A=document.createElement("p");A.innerHTML="👆 Click to copy",A.className="copy-prompt-p";const L=document.createElement("img");L.src="/icons/copy-icon.svg",L.className="copy-prompt-img",s.appendChild(L),s.appendChild(A),d.appendChild(s),d.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{d.querySelector("code")?.textContent!==null&&d.querySelector("code")?.textContent!==void 0&&Ae(d.querySelector("code").textContent),d.querySelector(".copy-prompt > p")?.innerHTML!==null&&d.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(d.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{d.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let C="/Examples/External_Components",y="/Examples/External_Components/An_Icon_Component";var E=qe(),x=I(E);le(x,{prevLink:C,nextLink:y});var T=t(x,2);ce(T,{tag:"h1",id:"the-courseschedule-language-1",onIntersectChange:i=>e.setVisible("the-courseschedule-language-1",i),get intersecting(){return h["the-courseschedule-language-1"]},set intersecting(i){h["the-courseschedule-language-1"]=i},children:(i,d)=>{ne();var s=oe("The CourseSchedule Language");c(i,s)},$$slots:{default:!0}});var P=t(T,8);ce(P,{tag:"h2",id:"the-freon-native-editor-2",onIntersectChange:i=>e.setVisible("the-freon-native-editor-2",i),get intersecting(){return h["the-freon-native-editor-2"]},set intersecting(i){h["the-freon-native-editor-2"]=i},children:(i,d)=>{ne();var s=oe("The Freon Native Editor");c(i,s)},$$slots:{default:!0}});var k=t(P,8);Be(k,{imageName:"examples/CourseSchedule/Screenshot-step1.png",caption:"The native Freon editor",figureNumber:1});var j=t(k,2);le(j,{prevLink:C,nextLink:y}),c(M,E),ue()}var je=f('<meta property="article:published_time"/>'),Oe=f('<meta property="article:modified_time"/>'),ze=f('<meta property="article:tag"/>'),He=f('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),De=(M,e)=>{pe(e,!a(e))},Re=f('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),We=f('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Ve=f('<li class="page-toc-text"><a> </a></li>'),Ze=f('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ge=f('<li class="page-toc-text"><a> </a></li>'),Je=f('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function rt(M,e){de(e,!0);let h=re(!1);const C=me([{id:"the-courseschedule-language-1",title:"The CourseSchedule Language",visible:!1,ref:"#the-courseschedule-language-1"},{id:"the-freon-native-editor-2",title:"The Freon Native Editor",visible:!1,ref:"#the-freon-native-editor-2"}]);let y=re(0);function E(o,n){const p=C.find(l=>l.id===o);p&&(p.visible=n);const m=C.findIndex(l=>l.visible);m>=0&&pe(y,m,!0)}const x=R(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),T=R(()=>e.data.page.description??e.data.category.description),P="https://freon4dsl.dev/images/freon-banner.png";let k=R(()=>{const o=Me.url.pathname;return`https://freon4dsl.dev${o==="/"?"/":o.replace(/\/$/,"")}`});const j=e.data.site?.tags??[],i=e.data.category?.tags??[],d=e.data.page.tags??[],s=[...new Set([...j,...i,...d].filter(Boolean))],A={"@context":"https://schema.org","@type":"WebPage",headline:a(x),description:a(T),url:a(k),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:s.length?s.join(", "):void 0,image:P,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var L=Je();Le(o=>{var n=He(),p=I(n),m=t(p,4),l=t(m,2);{var w=u=>{var b=je();N(()=>r(b,"content",e.data.page.publishedTime)),c(u,b)};B(l,u=>{e.data.page.publishedTime&&u(w)})}var _=t(l,2);{var S=u=>{var b=Oe();N(()=>r(b,"content",e.data.page.modifiedTime)),c(u,b)};B(_,u=>{e.data.page.modifiedTime&&u(S)})}var F=t(_,2);{var D=u=>{var b=xe(),Se=I(b);W(Se,17,()=>s,Pe,(be,Ce)=>{var ae=ze();N(()=>r(ae,"content",a(Ce))),c(be,ae)}),c(u,b)};B(F,u=>{s&&u(D)})}var q=t(F,2),K=t(q,4),Q=t(K,2),U=t(Q,2),X=t(U,2);r(X,"content",P);var Y=t(X,2),$=t(Y,4),ee=t($,2),te=t(ee,2);r(te,"content",P);var _e=t(te,2);ke(_e,()=>`<script type="application/ld+json">${JSON.stringify(A)}<\/script>`),N(u=>{Te.title=a(x)??"",r(p,"content",a(T)),r(m,"href",a(k)),r(q,"content",u),r(K,"content",a(x)),r(Q,"content",a(T)),r(U,"content",e.data.site.title),r(Y,"content",a(k)),r($,"content",a(x)),r(ee,"content",a(T))},[()=>s.join(", ")]),c(o,n)});var O=I(L),z=v(O),H=t(v(z),2);H.__click=[De,h];var ge=v(H);{var fe=o=>{var n=Re();c(o,n)},he=o=>{var n=We();c(o,n)};B(ge,o=>{a(h)?o(fe):o(he,!1)})}g(H),g(z);var V=t(z,2);{var ve=o=>{var n=Ze(),p=v(n);W(p,22,()=>C,m=>m,(m,l,w)=>{var _=Ve(),S=v(_);let F;var D=v(S,!0);g(S),g(_),N(q=>{r(S,"href",l.ref),F=se(S,1,"",null,F,q),ie(D,l.title)},[()=>({"page-visible":a(w)===a(y),"page-nonvisible":a(w)!==a(y)})]),c(m,_)}),g(p),g(n),c(o,n)};B(V,o=>{a(h)&&o(ve)})}var Z=t(V,2);Fe(Z,{});var ye=t(Z,2);Ie(ye,{setVisible:E}),g(O);var G=t(O,2),J=t(v(G),2);W(J,22,()=>C,o=>o,(o,n,p)=>{var m=Ge(),l=v(m);let w;var _=v(l,!0);g(l),g(m),N(S=>{r(l,"href",n.ref),w=se(l,1,"",null,w,S),ie(_,n.title)},[()=>({"page-visible":a(p)===a(y),"page-nonvisible":a(p)!==a(y)})]),c(o,m)}),g(J),g(G),c(M,L),ue()}we(["click"]);export{rt as component,nt as universal};
//# sourceMappingURL=79.BzO1CabZ.js.map
