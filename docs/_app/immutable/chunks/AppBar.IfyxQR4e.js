import{n as G,s as X,e as E,t as ge,b as k,d as w,o as de,g as _,h as u,E as R,i as M,j as b,C as te,q as Te,r as re,D as he,a as A,f as L,V as be,_ as Me,$ as rt,y as j,z as F,Z as Ye,v as Xe,c as Be,u as ye,k as Se,l as Ie,G as xe,a0 as it,A as Ee,w as at,p as ke,m as we}from"./scheduler.Cra-n4xf.js";import{S as x,i as J,t as T,g as ce,f as ue,b as S,c as O,a as H,m as N,d as U}from"./index.Bm95Nbrf.js";import{p as lt,e as Y}from"./stores.Bq7jfj-I.js";import{w as Je}from"./index.B9cI0ado.js";import{p as Ce,d as ze}from"./Store.BHIIOPSA.js";import"./entry.CV5Hz3Wx.js";const Ke=typeof window<"u";let st=Ke?()=>window.performance.now():()=>Date.now(),Qe=Ke?r=>requestAnimationFrame(r):G;const fe=new Set;function et(r){fe.forEach(e=>{e.c(r)||(fe.delete(e),e.f())}),fe.size!==0&&Qe(et)}function ct(r){let e;return fe.size===0&&Qe(et),{promise:new Promise(n=>{fe.add(e={c:r,f:n})}),abort(){fe.delete(e)}}}function ut(r){let e,n,t,o,l;return{c(){e=E("span"),n=E("a"),t=ge(r[0]),this.h()},l(i){e=k(i,"SPAN",{class:!0});var a=w(e);n=k(a,"A",{class:!0,href:!0});var s=w(n);t=de(s,r[0]),s.forEach(_),a.forEach(_),this.h()},h(){u(n,"class","leafText"),u(n,"href",r[1]),R(n,"active",r[2].url.pathname===r[1]),u(e,"class","side-bar-entry"),R(e,"active",r[2].url.pathname===r[1])},m(i,a){M(i,e,a),b(e,n),b(n,t),o||(l=te(n,"click",r[3]),o=!0)},p(i,[a]){a&1&&Te(t,i[0]),a&2&&u(n,"href",i[1]),a&6&&R(n,"active",i[2].url.pathname===i[1]),a&6&&R(e,"active",i[2].url.pathname===i[1])},i:G,o:G,d(i){i&&_(e),o=!1,l()}}}function ft(r,e,n){let t,o;re(r,Ce,s=>n(4,t=s)),re(r,lt,s=>n(2,o=s));let{name:l}=e,{path:i}=e;function a(){t.hidePopover()}return r.$$set=s=>{"name"in s&&n(0,l=s.name),"path"in s&&n(1,i=s.path)},[l,i,o,a]}class tt extends x{constructor(e){super(),J(this,e,ft,ut,X,{name:0,path:1})}}function Pe(r,e,n){const t=r.slice();return t[2]=e[n],t}function Ae(r,e,n){const t=r.slice();return t[5]=e[n],t}function ht(r){let e,n,t=Y(r[2].content),o=[];for(let i=0;i<t.length;i+=1)o[i]=Le(Ae(r,t,i));const l=i=>S(o[i],1,1,()=>{o[i]=null});return{c(){for(let i=0;i<o.length;i+=1)o[i].c();e=be()},l(i){for(let a=0;a<o.length;a+=1)o[a].l(i);e=be()},m(i,a){for(let s=0;s<o.length;s+=1)o[s]&&o[s].m(i,a);M(i,e,a),n=!0},p(i,a){if(a&1){t=Y(i[2].content);let s;for(s=0;s<t.length;s+=1){const c=Ae(i,t,s);o[s]?(o[s].p(c,a),T(o[s],1)):(o[s]=Le(c),o[s].c(),T(o[s],1),o[s].m(e.parentNode,e))}for(ce(),s=t.length;s<o.length;s+=1)l(s);ue()}},i(i){if(!n){for(let a=0;a<t.length;a+=1)T(o[a]);n=!0}},o(i){o=o.filter(Boolean);for(let a=0;a<o.length;a+=1)S(o[a]);n=!1},d(i){i&&_(e),he(o,i)}}}function Le(r){let e,n,t,o,l;return t=new tt({props:{name:r[5].name,path:r[5].path?r[5].path:"/"}}),{c(){e=E("li"),n=E("div"),O(t.$$.fragment),o=A(),this.h()},l(i){e=k(i,"LI",{});var a=w(e);n=k(a,"DIV",{class:!0});var s=w(n);H(t.$$.fragment,s),s.forEach(_),o=L(a),a.forEach(_),this.h()},h(){u(n,"class","sidebar-simple")},m(i,a){M(i,e,a),b(e,n),N(t,n,null),b(e,o),l=!0},p:G,i(i){l||(T(t.$$.fragment,i),l=!0)},o(i){S(t.$$.fragment,i),l=!1},d(i){i&&_(e),U(t)}}}function Ve(r){let e,n,t,o,l,i;t=new tt({props:{name:r[2].name,path:r[2].path?r[2].path:"/"}});let a=r[2].content&&ht(r);return{c(){e=E("li"),n=E("div"),O(t.$$.fragment),o=A(),a&&a.c(),l=A(),this.h()},l(s){e=k(s,"LI",{});var c=w(e);n=k(c,"DIV",{class:!0});var p=w(n);H(t.$$.fragment,p),p.forEach(_),o=L(c),a&&a.l(c),l=L(c),c.forEach(_),this.h()},h(){u(n,"class","sidebar-header")},m(s,c){M(s,e,c),b(e,n),N(t,n,null),b(e,o),a&&a.m(e,null),b(e,l),i=!0},p(s,c){s[2].content&&a.p(s,c)},i(s){i||(T(t.$$.fragment,s),T(a),i=!0)},o(s){S(t.$$.fragment,s),S(a),i=!1},d(s){s&&_(e),U(t),a&&a.d()}}}function mt(r){let e,n,t,o=Y(r[0]),l=[];for(let a=0;a<o.length;a+=1)l[a]=Ve(Pe(r,o,a));const i=a=>S(l[a],1,1,()=>{l[a]=null});return{c(){e=E("nav"),n=E("ul");for(let a=0;a<l.length;a+=1)l[a].c();this.h()},l(a){e=k(a,"NAV",{});var s=w(e);n=k(s,"UL",{class:!0});var c=w(n);for(let p=0;p<l.length;p+=1)l[p].l(c);c.forEach(_),s.forEach(_),this.h()},h(){u(n,"class","sidebar-ul")},m(a,s){M(a,e,s),b(e,n);for(let c=0;c<l.length;c+=1)l[c]&&l[c].m(n,null);t=!0},p(a,[s]){if(s&1){o=Y(a[0]);let c;for(c=0;c<o.length;c+=1){const p=Pe(a,o,c);l[c]?(l[c].p(p,s),T(l[c],1)):(l[c]=Ve(p),l[c].c(),T(l[c],1),l[c].m(n,null))}for(ce(),c=o.length;c<l.length;c+=1)i(c);ue()}},i(a){if(!t){for(let s=0;s<o.length;s+=1)T(l[s]);t=!0}},o(a){l=l.filter(Boolean);for(let s=0;s<l.length;s+=1)S(l[s]);t=!1},d(a){a&&_(e),he(l,a)}}}function pt(r,e,n){let{tocContent:t}=e,o=t.content?t.content:[];return r.$$set=l=>{"tocContent"in l&&n(1,t=l.tocContent)},[o,t]}class nt extends x{constructor(e){super(),J(this,e,pt,mt,X,{tocContent:1})}}const _t={name:"Documentation",path:"/Documentation",content:[{name:"Overview",path:"/Documentation/Overview",content:[{name:"Getting Started",path:"/Documentation/Overview/Getting_Started"},{name:"Running Example",path:"/Documentation/Overview/Running_Example"}]},{name:"Creating the Metamodel",path:"/Documentation/Creating_the_Metamodel",content:[{name:"Language Structure",path:"/Documentation/Creating_the_Metamodel/Language_Structure"},{name:"Defining Properties",path:"/Documentation/Creating_the_Metamodel/Defining_Properties"}]},{name:"Defining an Editor",path:"/Documentation/Defining_an_Editor",content:[{name:"Projections",path:"/Documentation/Defining_an_Editor/Projections"},{name:"Indentation",path:"/Documentation/Defining_an_Editor/Indentation"},{name:"Ease of Editing",path:"/Documentation/Defining_an_Editor/Ease_of_Editing"},{name:"Boolean Projections",path:"/Documentation/Defining_an_Editor/Boolean_Projections"},{name:"Number Projections",path:"/Documentation/Defining_an_Editor/Number_Projections"},{name:"Projections for Limited Concepts",path:"/Documentation/Defining_an_Editor/Projections_for_Limited_Concepts"},{name:"Binary Expressions",path:"/Documentation/Defining_an_Editor/Binary_Expressions"},{name:"Global Projections",path:"/Documentation/Defining_an_Editor/Global_Projections"},{name:"Buttons",path:"/Documentation/Defining_an_Editor/Buttons"},{name:"Fragments",path:"/Documentation/Defining_an_Editor/Fragments"},{name:"Styling",path:"/Documentation/Defining_an_Editor/Styling"},{name:"The Parser Projection",path:"/Documentation/Defining_an_Editor/The_Parser_Projection"}]},{name:"Scoping, Typing, and Validating",path:"/Documentation/Scoping,_Typing,_and_Validating",content:[{name:"Scope Provider",path:"/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider"},{name:"Type Provider",path:"/Documentation/Scoping,_Typing,_and_Validating/Type_Provider"},{name:"Validator",path:"/Documentation/Scoping,_Typing,_and_Validating/Validator"}]},{name:"Interpreter Framework",path:"/Documentation/Interpreter_Framework",content:[{name:"The Expressions DSL",path:"/Documentation/Interpreter_Framework/The_Expressions_DSL"},{name:"Understanding the Framework",path:"/Documentation/Interpreter_Framework/Understanding_the_Framework"}]},{name:"Customizations",path:"/Documentation/Customizations",content:[{name:"Editor Customization",path:"/Documentation/Customizations/Editor_Customization"},{name:"External Components",path:"/Documentation/Customizations/External_Components"},{name:"Scoper Customization",path:"/Documentation/Customizations/Scoper_Customization"},{name:"Typer Customization",path:"/Documentation/Customizations/Typer_Customization"},{name:"Validator Customization",path:"/Documentation/Customizations/Validator_Customization"},{name:"Other Customizations",path:"/Documentation/Customizations/Other_Customizations"}]},{name:"CommandLine",path:"/Documentation/CommandLine"},{name:"Under the Hood",path:"/Documentation/Under_the_Hood",content:[{name:"Editor Framework",path:"/Documentation/Under_the_Hood/Editor_Framework"},{name:"Predefined Boxes",path:"/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes"},{name:"External Component Box Types",path:"/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types"},{name:"Core Interfaces",path:"/Documentation/Under_the_Hood/Core_Interfaces"},{name:"Editor Interfaces",path:"/Documentation/Under_the_Hood/Editor_Interfaces"},{name:"FreTool Interfaces",path:"/Documentation/Under_the_Hood/FreTool_Interfaces"}]},{name:"Terminology",path:"/Documentation/Terminology"}]},ot={name:"Tutorial",path:"/Tutorial",content:[{name:"Overview",path:"/Tutorial/Overview"},{name:"Creating your Metamodel",path:"/Tutorial/Creating_your_Metamodel"},{name:"Making an Editor",path:"/Tutorial/Making_an_Editor"},{name:"More Fun with Projections",path:"/Tutorial/More_Fun_with_Projections"},{name:"Expressions in Freon",path:"/Tutorial/Expressions_in_Freon"},{name:"Projections for Expressions",path:"/Tutorial/Projections_for_Expressions"},{name:"In Need of Scoping",path:"/Tutorial/In_Need_of_Scoping"},{name:"More Scoping",path:"/Tutorial/More_Scoping"},{name:"How to Handle Typing",path:"/Tutorial/How_to_Handle_Typing"},{name:"Validating the model",path:"/Tutorial/Validating_the_model"},{name:"Conclusion",path:"/Tutorial/Conclusion"}]},gt={name:"Examples",path:"/Examples",content:[{name:"Overview",path:"/Examples/Overview"},{name:"Building an Interpreter",path:"/Examples/Building_an_Interpreter",content:[{name:"Basic Evaluation Functions",path:"/Examples/Building_an_Interpreter/Basic_Evaluation_Functions"},{name:"Using the Context",path:"/Examples/Building_an_Interpreter/Using_the_Context"},{name:"Finishing the Test",path:"/Examples/Building_an_Interpreter/Finishing_the_Test"}]},{name:"Generic Types",path:"/Examples/Generic_Types",content:[{name:"The TyperExample DSL",path:"/Examples/Generic_Types/The_TyperExample_DSL"},{name:"The Typer Definition",path:"/Examples/Generic_Types/The_Typer_Definition"}]},{name:"External Components",path:"/Examples/External_Components",content:[{name:"The CourseSchedule DSL",path:"/Examples/External_Components/The_CourseSchedule_DSL"},{name:"An Icon Component",path:"/Examples/External_Components/An_Icon_Component"},{name:"A Wrapper with a Button",path:"/Examples/External_Components/A_Wrapper_with_a_Button"},{name:"Replacing a Part List",path:"/Examples/External_Components/Replacing_a_Part_List"},{name:"A Sorted Table",path:"/Examples/External_Components/A_Sorted_Table"}]}]},dt={name:"Demo",path:"/Demo",content:[{name:"Overview",path:"/Demo/Overview"}]},vt={name:"LionWeb",path:"/LionWeb",content:[{name:"Overview",path:"/LionWeb/Overview"}]},bt={name:"Background",path:"/Background",content:[{name:"Overview",path:"/Background/Overview"},{name:"Testimonial",path:"/Background/Testimonial"},{name:"Projectional Editing",path:"/Background/Projectional_Editing"},{name:"About the Name",path:"/Background/About_the_Name"},{name:"About the Authors",path:"/Background/About_the_Authors"},{name:"About the Site",path:"/Background/About_the_Site"}]},_e=[{name:"Documentation",path:"/Documentation",toc:_t},{name:"Tutorial",path:"/Tutorial",toc:ot},{name:"Examples",path:"/Examples",toc:gt},{name:"Demo",path:"/Demo",toc:dt},{name:"LionWeb",path:"/LionWeb",toc:vt},{name:"Background",path:"/Background",toc:bt}];function je(r){return Object.prototype.toString.call(r)==="[object Date]"}function wt(r){return--r*r*((1.70158+1)*r+1.70158)+1}function De(r,e){if(r===e||r!==r)return()=>r;const n=typeof r;if(n!==typeof e||Array.isArray(r)!==Array.isArray(e))throw new Error("Cannot interpolate values of different type");if(Array.isArray(r)){const t=e.map((o,l)=>De(r[l],o));return o=>t.map(l=>l(o))}if(n==="object"){if(!r||!e)throw new Error("Object cannot be null");if(je(r)&&je(e)){r=r.getTime(),e=e.getTime();const l=e-r;return i=>new Date(r+i*l)}const t=Object.keys(e),o={};return t.forEach(l=>{o[l]=De(r[l],e[l])}),l=>{const i={};return t.forEach(a=>{i[a]=o[a](l)}),i}}if(n==="number"){const t=e-r;return o=>r+o*t}throw new Error(`Cannot interpolate ${n} values`)}function Fe(r,e={}){const n=Je(r);let t,o=r;function l(i,a){if(r==null)return n.set(r=i),Promise.resolve();o=i;let s=t,c=!1,{delay:p=0,duration:g=400,easing:f=rt,interpolate:m=De}=Me(Me({},e),a);if(g===0)return s&&(s.abort(),s=null),n.set(r=o),Promise.resolve();const h=st()+p;let C;return t=ct(d=>{if(d<h)return!0;c||(C=m(r,i),typeof g=="function"&&(g=g(r,i)),c=!0),s&&(s.abort(),s=null);const y=d-h;return y>g?(n.set(r=i),!1):(n.set(r=C(f(y/g))),!0)}),t.promise}return{set:l,update:(i,a)=>l(i(o,r),a),subscribe:n.subscribe}}function Ct(r){let e,n,t,o,l,i;return{c(){e=ge(`// copied and adjusted from https://www.reddit.com/r/sveltejs/comments/fkfpd8/svg_ripple_button_component/
`),n=j("defs"),t=j("filter"),o=j("feGaussianBlur"),l=A(),i=j("circle"),this.h()},l(a){e=de(a,`// copied and adjusted from https://www.reddit.com/r/sveltejs/comments/fkfpd8/svg_ripple_button_component/
`),n=F(a,"defs",{});var s=w(n);t=F(s,"filter",{id:!0,x:!0,y:!0});var c=w(t);o=F(c,"feGaussianBlur",{in:!0,stdDeviation:!0}),w(o).forEach(_),c.forEach(_),s.forEach(_),l=L(a),i=F(a,"circle",{style:!0,cx:!0,cy:!0,r:!0,opacity:!0,filter:!0}),w(i).forEach(_),this.h()},h(){u(o,"in","SourceGraphic"),u(o,"stdDeviation",r[2]),u(t,"id","f1"),u(t,"x","0"),u(t,"y","0"),Ye(i,"fill","var(--color-button-active)"),u(i,"cx",r[0]),u(i,"cy",r[1]),u(i,"r",r[3]),u(i,"opacity",r[4]),u(i,"filter","url(#f1)")},m(a,s){M(a,e,s),M(a,n,s),b(n,t),b(t,o),M(a,l,s),M(a,i,s)},p(a,[s]){s&4&&u(o,"stdDeviation",a[2]),s&1&&u(i,"cx",a[0]),s&2&&u(i,"cy",a[1]),s&8&&u(i,"r",a[3]),s&16&&u(i,"opacity",a[4])},i:G,o:G,d(a){a&&(_(e),_(n),_(l),_(i))}}}function Et(r,e,n){let t,o,{x:l,y:i,sizeIn:a,size:s,speed:c,rippleBlur:p}=e;Xe(()=>{f.set(0),g.set(s)});const g=Fe(a,{duration:c}),f=Fe(.5,{duration:c+c*2.5,easing:wt});return re(r,g,m=>n(3,t=m)),re(r,f,m=>n(4,o=m)),r.$$set=m=>{"x"in m&&n(0,l=m.x),"y"in m&&n(1,i=m.y),"sizeIn"in m&&n(7,a=m.sizeIn),"size"in m&&n(8,s=m.size),"speed"in m&&n(9,c=m.speed),"rippleBlur"in m&&n(2,p=m.rippleBlur)},[l,i,p,t,o,g,f,a,s,c]}class kt extends x{constructor(e){super(),J(this,e,Et,Ct,X,{x:0,y:1,sizeIn:7,size:8,speed:9,rippleBlur:2})}}function Oe(r,e,n){const t=r.slice();return t[32]=e[n],t[34]=n,t}function He(r){let e,n;return e=new kt({props:{x:r[32].x,y:r[32].y,size:r[32].size,speed:r[2],sizeIn:r[3],rippleBlur:r[1]}}),{c(){O(e.$$.fragment)},l(t){H(e.$$.fragment,t)},m(t,o){N(e,t,o),n=!0},p(t,o){const l={};o[0]&32&&(l.x=t[32].x),o[0]&32&&(l.y=t[32].y),o[0]&32&&(l.size=t[32].size),o[0]&4&&(l.speed=t[2]),o[0]&8&&(l.sizeIn=t[3]),o[0]&2&&(l.rippleBlur=t[1]),e.$set(l)},i(t){n||(T(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Dt(r){let e,n,t,o,l,i,a,s;const c=r[16].default,p=Be(c,r,r[15],null);let g=Y(r[5]),f=[];for(let h=0;h<g.length;h+=1)f[h]=He(Oe(r,g,h));const m=h=>S(f[h],1,1,()=>{f[h]=null});return{c(){e=E("button"),n=E("span"),p&&p.c(),t=A(),o=j("svg");for(let h=0;h<f.length;h+=1)f[h].c();this.h()},l(h){e=k(h,"BUTTON",{class:!0});var C=w(e);n=k(C,"SPAN",{});var d=w(n);p&&p.l(d),d.forEach(_),t=L(C),o=F(C,"svg",{});var y=w(o);for(let z=0;z<f.length;z+=1)f[z].l(y);y.forEach(_),C.forEach(_),this.h()},h(){u(e,"class",l=r[0]+" rippleButton")},m(h,C){M(h,e,C),b(e,n),p&&p.m(n,null),b(e,t),b(e,o);for(let d=0;d<f.length;d+=1)f[d]&&f[d].m(o,null);r[18](e),i=!0,a||(s=[te(e,"click",r[17]),te(e,"touchstart",r[19]),te(e,"mousedown",r[20])],a=!0)},p(h,C){if(p&&p.p&&(!i||C[0]&32768)&&ye(p,c,h,h[15],i?Ie(c,h[15],C,null):Se(h[15]),null),C[0]&46){g=Y(h[5]);let d;for(d=0;d<g.length;d+=1){const y=Oe(h,g,d);f[d]?(f[d].p(y,C),T(f[d],1)):(f[d]=He(y),f[d].c(),T(f[d],1),f[d].m(o,null))}for(ce(),d=g.length;d<f.length;d+=1)m(d);ue()}(!i||C[0]&1&&l!==(l=h[0]+" rippleButton"))&&u(e,"class",l)},i(h){if(!i){T(p,h);for(let C=0;C<g.length;C+=1)T(f[C]);i=!0}},o(h){S(p,h),f=f.filter(Boolean);for(let C=0;C<f.length;C+=1)S(f[C]);i=!1},d(h){h&&_(e),p&&p.d(h),he(f,h),r[18](null),a=!1,xe(s)}}}function Tt(r,e,n){let t,{$$slots:o={},$$scope:l}=e,{icon:i=!1}=e,a="materialStyle",s=0,c=900,p=20;i===!0&&(s=9,c=500,p=20,a="iconStyle");function g(){const D=Je([]);return{subscribe:D.subscribe,add:$=>{D.update(le=>[...le,$])},clear:()=>{D.update($=>[])}}}const f=g();re(r,f,D=>n(5,t=D));let m,h,C,d,y,z,Q,W,Z,ie,q,K,ae={x:50,y:50};const ee=()=>{clearTimeout(K),K=setTimeout(()=>{f.clear()},c+c*2)};let P;function me(D,$){$=="touch"?(P=!0,f.add({x:D.pageX-ie,y:D.pageY-Z,size:q})):(P||f.add({x:D.clientX-ie,y:D.clientY-Z,size:q}),P=!1),ee()}Xe(()=>{n(9,C=h.offsetWidth),n(10,d=h.offsetHeight),m=h.getBoundingClientRect(),Z=m.y,ie=m.x});function ne(D){it.call(this,r,D)}function V(D){Ee[D?"unshift":"push"](()=>{h=D,n(4,h)})}const v=D=>me(D.touches[0],"touch"),B=D=>me(D,"click");return r.$$set=D=>{"icon"in D&&n(8,i=D.icon),"$$scope"in D&&n(15,l=D.$$scope)},r.$$.update=()=>{r.$$.dirty[0]&32256&&(n(11,y=Math.abs(C/2-ae.x)),n(12,z=Math.abs(d/2-ae.y)),n(13,Q=C/2+y),n(14,W=d/2+z),q=Math.sqrt(Math.pow(Q,2.2)+Math.pow(W,2.2)))},[a,s,c,p,h,t,f,me,i,C,d,y,z,Q,W,l,o,ne,V,v,B]}class Bt extends x{constructor(e){super(),J(this,e,Tt,Dt,X,{icon:8},null,[-1,-1])}}function yt(r){let e,n,t,o,l;return{c(){e=j("svg"),n=j("g"),t=j("path"),o=j("g"),l=j("path"),this.h()},l(i){e=F(i,"svg",{xmlns:!0,"enable-background":!0,width:!0,height:!0,viewBox:!0,fill:!0});var a=w(e);n=F(a,"g",{});var s=w(n);t=F(s,"path",{d:!0,fill:!0}),w(t).forEach(_),s.forEach(_),o=F(a,"g",{});var c=w(o);l=F(c,"path",{d:!0}),w(l).forEach(_),c.forEach(_),a.forEach(_),this.h()},h(){u(t,"d","M0,0h24v24H0V0z"),u(t,"fill","var(--color6)"),u(l,"d","M12,4.81L12,19c-3.31,0-6-2.63-6-5.87c0-1.56,0.62-3.03,1.75-4.14L12,4.81 M6.35,7.56L6.35,7.56C4.9,8.99,4,10.96,4,13.13 C4,17.48,7.58,21,12,21c4.42,0,8-3.52,8-7.87c0-2.17-0.9-4.14-2.35-5.57l0,0L12,2L6.35,7.56z"),u(e,"xmlns","http://www.w3.org/2000/svg"),u(e,"enable-background","new 0 0 24 24"),u(e,"width",r[1]),u(e,"height",r[0]),u(e,"viewBox","0 0 24 24"),u(e,"fill",r[2])},m(i,a){M(i,e,a),b(e,n),b(n,t),b(e,o),b(o,l)},p(i,[a]){a&2&&u(e,"width",i[1]),a&1&&u(e,"height",i[0]),a&4&&u(e,"fill",i[2])},i:G,o:G,d(i){i&&_(e)}}}function St(r,e,n){let{height:t=24}=e,{width:o=24}=e,{fill:l="var(--color1)"}=e;return r.$$set=i=>{"height"in i&&n(0,t=i.height),"width"in i&&n(1,o=i.width),"fill"in i&&n(2,l=i.fill)},[t,o,l]}class It extends x{constructor(e){super(),J(this,e,St,yt,X,{height:0,width:1,fill:2})}}function Mt(r){let e,n;return e=new It({}),{c(){O(e.$$.fragment)},l(t){H(e.$$.fragment,t)},m(t,o){N(e,t,o),n=!0},i(t){n||(T(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function zt(r){let e,n;return e=new Bt({props:{icon:!0,$$slots:{default:[Mt]},$$scope:{ctx:r}}}),e.$on("click",r[0]),{c(){O(e.$$.fragment)},l(t){H(e.$$.fragment,t)},m(t,o){N(e,t,o),n=!0},p(t,[o]){const l={};o&4&&(l.$$scope={dirty:o,ctx:t}),e.$set(l)},i(t){n||(T(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Pt(r,e,n){let t;re(r,ze,l=>n(1,t=l));function o(){at(ze,t=!t,t),window.document.body.classList.toggle("dark"),localStorage.setItem("darkMode",t?"enabled":"disabled"),console.log(`darkmode toggle: ${t}`)}return[o]}class At extends x{constructor(e){super(),J(this,e,Pt,zt,X,{})}}function Lt(r){let e,n,t,o,l,i;return{c(){e=j("svg"),n=j("path"),t=j("path"),this.h()},l(a){e=F(a,"svg",{xmlns:!0,width:!0,height:!0,viewBox:!0,fill:!0});var s=w(e);n=F(s,"path",{d:!0,fill:!0}),w(n).forEach(_),t=F(s,"path",{d:!0}),w(t).forEach(_),s.forEach(_),this.h()},h(){u(n,"d","M0 0h24v24H0z"),u(n,"fill",r[3]),u(t,"d","M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"),u(e,"xmlns","http://www.w3.org/2000/svg"),u(e,"width",o=r[1]+"px"),u(e,"height",l=r[0]+"px"),u(e,"viewBox",i="0 0 "+r[1]+" "+r[0]),u(e,"fill",r[2])},m(a,s){M(a,e,s),b(e,n),b(e,t)},p(a,[s]){s&8&&u(n,"fill",a[3]),s&2&&o!==(o=a[1]+"px")&&u(e,"width",o),s&1&&l!==(l=a[0]+"px")&&u(e,"height",l),s&3&&i!==(i="0 0 "+a[1]+" "+a[0])&&u(e,"viewBox",i),s&4&&u(e,"fill",a[2])},i:G,o:G,d(a){a&&_(e)}}}function Vt(r,e,n){let{height:t=24}=e,{width:o=24}=e,{fill:l="var(--color1)"}=e,{background:i="var(--color6)"}=e;return r.$$set=a=>{"height"in a&&n(0,t=a.height),"width"in a&&n(1,o=a.width),"fill"in a&&n(2,l=a.fill),"background"in a&&n(3,i=a.background)},[t,o,l,i]}class jt extends x{constructor(e){super(),J(this,e,Vt,Lt,X,{height:0,width:1,fill:2,background:3})}}function Ft(r){let e,n,t;return{c(){e=j("svg"),n=j("g"),t=j("path"),this.h()},l(o){e=F(o,"svg",{width:!0,height:!0,viewBox:!0,version:!0,xmlns:!0,"xmlns:xlink":!0,preserveAspectRatio:!0});var l=w(e);n=F(l,"g",{});var i=w(n);t=F(i,"path",{d:!0,fill:!0}),w(t).forEach(_),i.forEach(_),l.forEach(_),this.h()},h(){u(t,"d","M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z"),u(t,"fill",r[2]),u(e,"width",r[1]),u(e,"height",r[0]),u(e,"viewBox","0 0 256 250"),u(e,"version","1.1"),u(e,"xmlns","http://www.w3.org/2000/svg"),u(e,"xmlns:xlink","http://www.w3.org/1999/xlink"),u(e,"preserveAspectRatio","xMidYMid")},m(o,l){M(o,e,l),b(e,n),b(n,t)},p(o,[l]){l&4&&u(t,"fill",o[2]),l&2&&u(e,"width",o[1]),l&1&&u(e,"height",o[0])},i:G,o:G,d(o){o&&_(e)}}}function Ot(r,e,n){let{height:t=24}=e,{width:o=24}=e,{fill:l="var(--color1)"}=e;return r.$$set=i=>{"height"in i&&n(0,t=i.height),"width"in i&&n(1,o=i.width),"fill"in i&&n(2,l=i.fill)},[t,o,l]}class Ht extends x{constructor(e){super(),J(this,e,Ot,Ft,X,{height:0,width:1,fill:2})}}const Nt=r=>({}),Ne=r=>({});function Ut(r){let e;const n=r[10]["custom-tip"],t=Be(n,r,r[9],Ne);return{c(){t&&t.c()},l(o){t&&t.l(o)},m(o,l){t&&t.m(o,l),e=!0},p(o,l){t&&t.p&&(!e||l&512)&&ye(t,n,o,o[9],e?Ie(n,o[9],l,Nt):Se(o[9]),Ne)},i(o){e||(T(t,o),e=!0)},o(o){S(t,o),e=!1},d(o){t&&t.d(o)}}}function Gt(r){let e,n;return{c(){e=E("div"),n=ge(r[0]),this.h()},l(t){e=k(t,"DIV",{class:!0,style:!0});var o=w(e);n=de(o,r[0]),o.forEach(_),this.h()},h(){u(e,"class","default-tip"),u(e,"style",r[6])},m(t,o){M(t,e,o),b(e,n)},p(t,o){o&1&&Te(n,t[0])},i:G,o:G,d(t){t&&_(e)}}}function $t(r){let e,n,t,o,l,i,a;const s=r[10].default,c=Be(s,r,r[9],null),p=[Gt,Ut],g=[];function f(m,h){return m[0]?0:1}return l=f(r),i=g[l]=p[l](r),{c(){e=E("div"),n=E("span"),c&&c.c(),t=A(),o=E("div"),i.c(),this.h()},l(m){e=k(m,"DIV",{class:!0});var h=w(e);n=k(h,"SPAN",{class:!0});var C=w(n);c&&c.l(C),C.forEach(_),t=L(h),o=k(h,"DIV",{class:!0});var d=w(o);i.l(d),d.forEach(_),h.forEach(_),this.h()},h(){u(n,"class","tooltip-slot"),u(o,"class","tooltip"),R(o,"active",r[5]),R(o,"left",r[4]),R(o,"right",r[2]),R(o,"bottom",r[3]),R(o,"top",r[1]),u(e,"class","tooltip-wrapper")},m(m,h){M(m,e,h),b(e,n),c&&c.m(n,null),b(e,t),b(e,o),g[l].m(o,null),a=!0},p(m,[h]){c&&c.p&&(!a||h&512)&&ye(c,s,m,m[9],a?Ie(s,m[9],h,null):Se(m[9]),null);let C=l;l=f(m),l===C?g[l].p(m,h):(ce(),S(g[C],1,1,()=>{g[C]=null}),ue(),i=g[l],i?i.p(m,h):(i=g[l]=p[l](m),i.c()),T(i,1),i.m(o,null)),(!a||h&32)&&R(o,"active",m[5]),(!a||h&16)&&R(o,"left",m[4]),(!a||h&4)&&R(o,"right",m[2]),(!a||h&8)&&R(o,"bottom",m[3]),(!a||h&2)&&R(o,"top",m[1])},i(m){a||(T(c,m),T(i),a=!0)},o(m){S(c,m),S(i),a=!1},d(m){m&&_(e),c&&c.d(m),g[l].d()}}}function Rt(r,e,n){let{$$slots:t={},$$scope:o}=e,{tip:l=""}=e,{top:i=!1}=e,{right:a=!1}=e,{bottom:s=!1}=e,{left:c=!1}=e,{active:p=!1}=e,{color:g="var(--color-accent)"}=e,{bgColor:f="var(--color5)"}=e,m=`background-color: ${f}; color: ${g}; font-size: 0.7rem;`;return r.$$set=h=>{"tip"in h&&n(0,l=h.tip),"top"in h&&n(1,i=h.top),"right"in h&&n(2,a=h.right),"bottom"in h&&n(3,s=h.bottom),"left"in h&&n(4,c=h.left),"active"in h&&n(5,p=h.active),"color"in h&&n(7,g=h.color),"bgColor"in h&&n(8,f=h.bgColor),"$$scope"in h&&n(9,o=h.$$scope)},[l,i,a,s,c,p,m,g,f,o,t]}class ve extends x{constructor(e){super(),J(this,e,Rt,$t,X,{tip:0,top:1,right:2,bottom:3,left:4,active:5,color:7,bgColor:8})}}function Wt(r){let e,n,t,o,l,i,a,s,c,p,g;return o=new nt({props:{tocContent:r[1]}}),{c(){e=E("div"),n=E("nav"),t=E("div"),O(o.$$.fragment),l=A(),i=E("button"),a=E("img"),this.h()},l(f){e=k(f,"DIV",{popover:!0,id:!0,class:!0});var m=w(e);n=k(m,"NAV",{});var h=w(n);t=k(h,"DIV",{class:!0,role:!0});var C=w(t);H(o.$$.fragment,C),C.forEach(_),h.forEach(_),l=L(m),i=k(m,"BUTTON",{class:!0,popovertarget:!0,popovertargetaction:!0});var d=w(i);a=k(d,"IMG",{src:!0,style:!0,alt:!0,height:!0}),d.forEach(_),m.forEach(_),this.h()},h(){u(t,"class","sub-menu"),u(t,"role","dialog"),ke(a.src,s="/icons/close-icon.png")||u(a,"src",s),Ye(a,"color","red"),u(a,"alt","Freon Logo"),u(a,"height","24px"),u(i,"class","close-button"),u(i,"popovertarget",r[0]),u(i,"popovertargetaction","hide"),u(e,"popover","auto"),u(e,"id",r[0]),u(e,"class","popover-menu")},m(f,m){M(f,e,m),b(e,n),b(n,t),N(o,t,null),b(e,l),b(e,i),b(i,a),r[5](e),c=!0,p||(g=te(t,"click",r[4]),p=!0)},p(f,[m]){const h={};m&2&&(h.tocContent=f[1]),o.$set(h),(!c||m&1)&&u(i,"popovertarget",f[0]),(!c||m&1)&&u(e,"id",f[0])},i(f){c||(T(o.$$.fragment,f),c=!0)},o(f){S(o.$$.fragment,f),c=!1},d(f){f&&_(e),U(o),r[5](null),p=!1,g()}}}function Zt(r,e,n){let{id:t}=e,{content:o=ot}=e,l;function i(){l.showPopover()}const a=()=>{l.hidePopover()};function s(c){Ee[c?"unshift":"push"](()=>{l=c,n(2,l)})}return r.$$set=c=>{"id"in c&&n(0,t=c.id),"content"in c&&n(1,o=c.content)},[t,o,l,i,a,s]}class qt extends x{constructor(e){super(),J(this,e,Zt,Wt,X,{id:0,content:1,openContent:3})}get openContent(){return this.$$.ctx[3]}}function Ue(r,e,n){const t=r.slice();return t[6]=e[n],t[8]=n,t}function Yt(r){let e,n;return{c(){e=E("img"),this.h()},l(t){e=k(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){u(e,"class","side-bar-img"),ke(e.src,n="/icons/down-arrow.png")||u(e,"src",n),u(e,"alt","arrow down")},m(t,o){M(t,e,o)},d(t){t&&_(e)}}}function Xt(r){let e,n;return{c(){e=E("img"),this.h()},l(t){e=k(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){u(e,"class","side-bar-img"),ke(e.src,n="/icons/upload.png")||u(e,"src",n),u(e,"alt","arrow up")},m(t,o){M(t,e,o)},d(t){t&&_(e)}}}function Ge(r){let e,n,t,o;return n=new nt({props:{tocContent:r[6].tocContent}}),{c(){e=E("div"),O(n.$$.fragment),t=A(),this.h()},l(l){e=k(l,"DIV",{class:!0});var i=w(e);H(n.$$.fragment,i),t=L(i),i.forEach(_),this.h()},h(){u(e,"class","sub-menu")},m(l,i){M(l,e,i),N(n,e,null),b(e,t),o=!0},p(l,i){const a={};i&1&&(a.tocContent=l[6].tocContent),n.$set(a)},i(l){o||(T(n.$$.fragment,l),o=!0)},o(l){S(n.$$.fragment,l),o=!1},d(l){l&&_(e),U(n)}}}function $e(r){let e,n,t=r[6].title+"",o,l,i,a,s,c,p,g;function f(y,z){return y[6].showDetails?Xt:Yt}let m=f(r),h=m(r);function C(){return r[4](r[8])}let d=r[6].showDetails&&Ge(r);return{c(){e=E("span"),n=E("span"),o=ge(t),l=A(),i=E("button"),h.c(),a=A(),d&&d.c(),s=be(),this.h()},l(y){e=k(y,"SPAN",{class:!0});var z=w(e);n=k(z,"SPAN",{class:!0,role:!0});var Q=w(n);o=de(Q,t),Q.forEach(_),l=L(z),i=k(z,"BUTTON",{class:!0});var W=w(i);h.l(W),W.forEach(_),z.forEach(_),a=L(y),d&&d.l(y),s=be(),this.h()},h(){u(n,"class","menu-item"),u(n,"role","contentinfo"),u(i,"class","side-bar-expand-button"),u(e,"class","img-container")},m(y,z){M(y,e,z),b(e,n),b(n,o),b(e,l),b(e,i),h.m(i,null),M(y,a,z),d&&d.m(y,z),M(y,s,z),c=!0,p||(g=[te(n,"click",r[3]),te(i,"click",C)],p=!0)},p(y,z){r=y,(!c||z&1)&&t!==(t=r[6].title+"")&&Te(o,t),m!==(m=f(r))&&(h.d(1),h=m(r),h&&(h.c(),h.m(i,null))),r[6].showDetails?d?(d.p(r,z),z&1&&T(d,1)):(d=Ge(r),d.c(),T(d,1),d.m(s.parentNode,s)):d&&(ce(),S(d,1,1,()=>{d=null}),ue())},i(y){c||(T(d),c=!0)},o(y){S(d),c=!1},d(y){y&&(_(e),_(a),_(s)),h.d(),d&&d.d(y),p=!1,xe(g)}}}function xt(r){let e,n,t,o,l='<img src="/icons/close-icon.png" style="color: red" alt="Freon Logo" height="24px"/>',i,a=Y(r[0]),s=[];for(let p=0;p<a.length;p+=1)s[p]=$e(Ue(r,a,p));const c=p=>S(s[p],1,1,()=>{s[p]=null});return{c(){e=E("div"),n=E("nav");for(let p=0;p<s.length;p+=1)s[p].c();t=A(),o=E("button"),o.innerHTML=l,this.h()},l(p){e=k(p,"DIV",{popover:!0,id:!0,class:!0});var g=w(e);n=k(g,"NAV",{});var f=w(n);for(let m=0;m<s.length;m+=1)s[m].l(f);f.forEach(_),t=L(g),o=k(g,"BUTTON",{class:!0,popovertarget:!0,popovertargetaction:!0,"data-svelte-h":!0}),we(o)!=="svelte-1416fj5"&&(o.innerHTML=l),g.forEach(_),this.h()},h(){u(o,"class","close-button"),u(o,"popovertarget","main-menu"),u(o,"popovertargetaction","hide"),u(e,"popover","auto"),u(e,"id","main-menu"),u(e,"class","popover-menu")},m(p,g){M(p,e,g),b(e,n);for(let f=0;f<s.length;f+=1)s[f]&&s[f].m(n,null);b(e,t),b(e,o),r[5](e),i=!0},p(p,[g]){if(g&7){a=Y(p[0]);let f;for(f=0;f<a.length;f+=1){const m=Ue(p,a,f);s[f]?(s[f].p(m,g),T(s[f],1)):(s[f]=$e(m),s[f].c(),T(s[f],1),s[f].m(n,null))}for(ce(),f=a.length;f<s.length;f+=1)c(f);ue()}},i(p){if(!i){for(let g=0;g<a.length;g+=1)T(s[g]);i=!0}},o(p){s=s.filter(Boolean);for(let g=0;g<s.length;g+=1)S(s[g]);i=!1},d(p){p&&_(e),he(s,p),r[5](null)}}}function Jt(r,e,n){let t;re(r,Ce,c=>n(1,t=c));let o=[];_e.forEach(c=>{o.push({title:c.name,tocContent:c.toc,showDetails:!1})});function l(c){for(let p=0;p<5;p++)p===c?n(0,o[p].showDetails=!o[p].showDetails,o):n(0,o[p].showDetails=!1,o)}const i=()=>{t.hidePopover()},a=c=>{l(c)};function s(c){Ee[c?"unshift":"push"](()=>{t=c,Ce.set(t)})}return[o,t,l,i,a,s]}class Kt extends x{constructor(e){super(),J(this,e,Jt,xt,X,{})}}function Re(r,e,n){const t=r.slice();return t[6]=e[n],t[8]=n,t}function We(r,e,n){const t=r.slice();return t[6]=e[n],t[9]=e,t[8]=n,t}function Ze(r){let e,n=r[8],t;const o=()=>r[3](e,n),l=()=>r[3](null,n);let i={id:"category-"+r[8],content:r[6].toc};return e=new qt({props:i}),o(),{c(){O(e.$$.fragment)},l(a){H(e.$$.fragment,a)},m(a,s){N(e,a,s),t=!0},p(a,s){n!==a[8]&&(l(),n=a[8],o());const c={};e.$set(c)},i(a){t||(T(e.$$.fragment,a),t=!0)},o(a){S(e.$$.fragment,a),t=!1},d(a){l(),U(e,a)}}}function Qt(r){let e,n,t,o,l,i;return t=new jt({}),{c(){e=E("button"),n=E("span"),O(t.$$.fragment),this.h()},l(a){e=k(a,"BUTTON",{class:!0});var s=w(e);n=k(s,"SPAN",{class:!0});var c=w(n);H(t.$$.fragment,c),c.forEach(_),s.forEach(_),this.h()},h(){u(n,"class","app-bar-button-content"),u(e,"class","app-bar-button")},m(a,s){M(a,e,s),b(e,n),N(t,n,null),o=!0,l||(i=te(e,"click",r[4]),l=!0)},p:G,i(a){o||(T(t.$$.fragment,a),o=!0)},o(a){S(t.$$.fragment,a),o=!1},d(a){a&&_(e),U(t),l=!1,i()}}}function en(r){let e,n;return{c(){e=E("img"),this.h()},l(t){e=k(t,"IMG",{src:!0,alt:!0,height:!0}),this.h()},h(){ke(e.src,n="/freonlogo.png")||u(e,"src",n),u(e,"alt","Freon Logo"),u(e,"height","24")},m(t,o){M(t,e,o)},p:G,d(t){t&&_(e)}}}function qe(r){let e,n,t=r[6].name+"",o,l,i,a='<img class="main-menu-small-img" src="/icons/down-chevron-white.png" alt="arrow down"/> ',s,c;function p(){return r[5](r[8])}return{c(){e=E("a"),n=E("h6"),o=ge(t),l=A(),i=E("button"),i.innerHTML=a,this.h()},l(g){e=k(g,"A",{href:!0,class:!0});var f=w(e);n=k(f,"H6",{});var m=w(n);o=de(m,t),m.forEach(_),f.forEach(_),l=L(g),i=k(g,"BUTTON",{class:!0,"data-svelte-h":!0}),we(i)!=="svelte-fsaxo5"&&(i.innerHTML=a),this.h()},h(){u(e,"href",r[6].path),u(e,"class","app-bar-linkLogo"),u(i,"class","main-menu-small-expand-button")},m(g,f){M(g,e,f),b(e,n),b(n,o),M(g,l,f),M(g,i,f),s||(c=te(i,"click",p),s=!0)},p(g,f){r=g},d(g){g&&(_(e),_(l),_(i)),s=!1,c()}}}function tn(r){let e,n;return e=new At({}),{c(){O(e.$$.fragment)},l(t){H(e.$$.fragment,t)},m(t,o){N(e,t,o),n=!0},i(t){n||(T(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function nn(r){let e,n;return e=new Ht({}),{c(){O(e.$$.fragment)},l(t){H(e.$$.fragment,t)},m(t,o){N(e,t,o),n=!0},i(t){n||(T(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function on(r){let e,n,t,o,l,i,a,s,c="Freon",p,g,f,m,h,C,d="<div>Freon</div>",y,z,Q,W,Z,ie,q,K,ae;e=new Kt({});let ee=Y(_e),P=[];for(let v=0;v<ee.length;v+=1)P[v]=Ze(We(r,ee,v));const me=v=>S(P[v],1,1,()=>{P[v]=null});i=new ve({props:{tip:"Hide/show content",bottom:!0,$$slots:{default:[Qt]},$$scope:{ctx:r}}}),m=new ve({props:{tip:"home",bottom:!0,$$slots:{default:[en]},$$scope:{ctx:r}}});let ne=Y(_e),V=[];for(let v=0;v<ne.length;v+=1)V[v]=qe(Re(r,ne,v));return Z=new ve({props:{tip:"light/dark mode",bottom:!0,$$slots:{default:[tn]},$$scope:{ctx:r}}}),K=new ve({props:{tip:"github source",bottom:!0,$$slots:{default:[nn]},$$scope:{ctx:r}}}),{c(){O(e.$$.fragment),n=A();for(let v=0;v<P.length;v+=1)P[v].c();t=A(),o=E("div"),l=E("div"),O(i.$$.fragment),a=A(),s=E("div"),s.textContent=c,p=A(),g=E("div"),f=E("a"),O(m.$$.fragment),h=A(),C=E("a"),C.innerHTML=d,y=A(),z=E("nav");for(let v=0;v<V.length;v+=1)V[v].c();Q=A(),W=E("span"),O(Z.$$.fragment),ie=A(),q=E("a"),O(K.$$.fragment),this.h()},l(v){H(e.$$.fragment,v),n=L(v);for(let se=0;se<P.length;se+=1)P[se].l(v);t=L(v),o=k(v,"DIV",{class:!0});var B=w(o);l=k(B,"DIV",{class:!0});var D=w(l);H(i.$$.fragment,D),a=L(D),s=k(D,"DIV",{class:!0,"data-svelte-h":!0}),we(s)!=="svelte-qpymh7"&&(s.textContent=c),D.forEach(_),p=L(B),g=k(B,"DIV",{class:!0});var $=w(g);f=k($,"A",{href:!0,class:!0});var le=w(f);H(m.$$.fragment,le),le.forEach(_),h=L($),C=k($,"A",{href:!0,class:!0,"data-svelte-h":!0}),we(C)!=="svelte-rjlr5q"&&(C.innerHTML=d),y=L($),z=k($,"NAV",{class:!0});var pe=w(z);for(let se=0;se<V.length;se+=1)V[se].l(pe);pe.forEach(_),$.forEach(_),Q=L(B),W=k(B,"SPAN",{class:!0});var I=w(W);H(Z.$$.fragment,I),I.forEach(_),ie=L(B),q=k(B,"A",{target:!0,href:!0,class:!0});var oe=w(q);H(K.$$.fragment,oe),oe.forEach(_),B.forEach(_),this.h()},h(){u(s,"class","title"),u(l,"class","app-bar-small"),u(f,"href","https://www.freon4dsl.dev"),u(f,"class","app-bar-linkLogo"),u(C,"href","/"),u(C,"class","title"),u(z,"class","app-bar-main-menu"),u(g,"class","app-bar-large"),u(W,"class","app-bar-linkLogo"),u(q,"target","_blank"),u(q,"href","https://github.com/freon4dsl/Freon4dsl.git"),u(q,"class","app-bar-linkLogo"),u(o,"class","app-bar")},m(v,B){N(e,v,B),M(v,n,B);for(let D=0;D<P.length;D+=1)P[D]&&P[D].m(v,B);M(v,t,B),M(v,o,B),b(o,l),N(i,l,null),b(l,a),b(l,s),b(o,p),b(o,g),b(g,f),N(m,f,null),b(g,h),b(g,C),b(g,y),b(g,z);for(let D=0;D<V.length;D+=1)V[D]&&V[D].m(z,null);b(o,Q),b(o,W),N(Z,W,null),b(o,ie),b(o,q),N(K,q,null),ae=!0},p(v,[B]){if(B&1){ee=Y(_e);let I;for(I=0;I<ee.length;I+=1){const oe=We(v,ee,I);P[I]?(P[I].p(oe,B),T(P[I],1)):(P[I]=Ze(oe),P[I].c(),T(P[I],1),P[I].m(t.parentNode,t))}for(ce(),I=ee.length;I<P.length;I+=1)me(I);ue()}const D={};B&1026&&(D.$$scope={dirty:B,ctx:v}),i.$set(D);const $={};if(B&1024&&($.$$scope={dirty:B,ctx:v}),m.$set($),B&4){ne=Y(_e);let I;for(I=0;I<ne.length;I+=1){const oe=Re(v,ne,I);V[I]?V[I].p(oe,B):(V[I]=qe(oe),V[I].c(),V[I].m(z,null))}for(;I<V.length;I+=1)V[I].d(1);V.length=ne.length}const le={};B&1024&&(le.$$scope={dirty:B,ctx:v}),Z.$set(le);const pe={};B&1024&&(pe.$$scope={dirty:B,ctx:v}),K.$set(pe)},i(v){if(!ae){T(e.$$.fragment,v);for(let B=0;B<ee.length;B+=1)T(P[B]);T(i.$$.fragment,v),T(m.$$.fragment,v),T(Z.$$.fragment,v),T(K.$$.fragment,v),ae=!0}},o(v){S(e.$$.fragment,v),P=P.filter(Boolean);for(let B=0;B<P.length;B+=1)S(P[B]);S(i.$$.fragment,v),S(m.$$.fragment,v),S(Z.$$.fragment,v),S(K.$$.fragment,v),ae=!1},d(v){v&&(_(n),_(t),_(o)),U(e,v),he(P,v),U(i),U(m),he(V,v),U(Z),U(K)}}}function rn(r,e,n){let t;re(r,Ce,c=>n(1,t=c));let o=[];function l(c){o[c].openContent()}function i(c,p){Ee[c?"unshift":"push"](()=>{o[p]=c,n(0,o)})}return[o,t,l,i,()=>{t.togglePopover()},c=>l(c)]}class hn extends x{constructor(e){super(),J(this,e,rn,on,X,{})}}export{hn as A,nt as S,_t as a,bt as b,dt as d,gt as e,vt as l,ot as t};
//# sourceMappingURL=AppBar.IfyxQR4e.js.map
