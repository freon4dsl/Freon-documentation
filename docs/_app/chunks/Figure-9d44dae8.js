import{S as j,i as q,s as C,e as N,k as S,t as _,c as v,a as p,n as k,g as h,d as F,b as l,a1 as I,f as A,F as u,h as E,H as G}from"./vendor-0216fdcb.js";/* empty css                                             */function H(r){let a,i,n,m,g,e,b,c,d,o;return{c(){a=N("figure"),i=N("img"),g=S(),e=N("figcaption"),b=_("Figure "),c=_(r[1]),d=_(". "),o=_(r[2]),this.h()},l(s){a=v(s,"FIGURE",{class:!0});var t=p(a);i=v(t,"IMG",{class:!0,src:!0,alt:!0}),g=k(t),e=v(t,"FIGCAPTION",{id:!0});var f=p(e);b=h(f,"Figure "),c=h(f,r[1]),d=h(f,". "),o=h(f,r[2]),f.forEach(F),t.forEach(F),this.h()},h(){l(i,"class","image svelte-iiau5p"),I(i.src,n="/images/"+r[0])||l(i,"src",n),l(i,"alt",m="Image '"+r[0]+"' seems to be missing"),l(e,"id",r[0]),l(a,"class","figure svelte-iiau5p")},m(s,t){A(s,a,t),u(a,i),u(a,g),u(a,e),u(e,b),u(e,c),u(e,d),u(e,o)},p(s,[t]){t&1&&!I(i.src,n="/images/"+s[0])&&l(i,"src",n),t&1&&m!==(m="Image '"+s[0]+"' seems to be missing")&&l(i,"alt",m),t&2&&E(c,s[1]),t&4&&E(o,s[2]),t&1&&l(e,"id",s[0])},i:G,o:G,d(s){s&&F(a)}}}function M(r,a,i){let{imageName:n}=a,{figureNumber:m=1}=a,{caption:g}=a;return r.$$set=e=>{"imageName"in e&&i(0,n=e.imageName),"figureNumber"in e&&i(1,m=e.figureNumber),"caption"in e&&i(2,g=e.caption)},[n,m,g]}class R extends j{constructor(a){super();q(this,a,M,H,C,{imageName:0,figureNumber:1,caption:2})}}export{R as F};
