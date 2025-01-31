import{s as pn,A as De,a as u,e as d,H as K,f,b as m,m as y,d as P,F as X,g as s,h as $,i,B as Ae,v as un,x as He,w as Hn,t as ee,o as te,n as qn,j,C as Nn,D as fn,E as se,q as dn,p as mn}from"../chunks/scheduler.CIEH-92L.js";import{S as hn,i as gn,e as Re,c as x,a as S,m as D,t as A,b as R,d as B}from"../chunks/index.HLF2pGCU.js";import{e as Pt}from"../chunks/each.BLebZWAa.js";import{w as In}from"../chunks/index.bxqR-5-s.js";import{P as en,S as Be,c as Fn,B as xn}from"../chunks/index.yTjXiNmY.js";import{F as tn}from"../chunks/Figure.ClABA4Sw.js";const Z=In([]);function Sn(l){let n;return{c(){n=ee("Making an Editor for your DSL")},l(t){n=te(t,"Making an Editor for your DSL")},m(t,o){i(t,n,o)},d(t){t&&s(n)}}}function Dn(l){let n;return{c(){n=ee("The default editor")},l(t){n=te(t,"The default editor")},m(t,o){i(t,n,o)},d(t){t&&s(n)}}}function An(l){let n,t,o="Topic",c;return{c(){n=ee("A projection for the "),t=d("em"),t.textContent=o,c=ee(" model unit")},l(p){n=te(p,"A projection for the "),t=m(p,"EM",{"data-svelte-h":!0}),y(t)!=="svelte-3uahbr"&&(t.textContent=o),c=te(p," model unit")},m(p,g){i(p,n,g),i(p,t,g),i(p,c,g)},p:qn,d(p){p&&(s(n),s(t),s(c))}}}function Rn(l){let n;return{c(){n=ee("The Possibilities for Lists")},l(t){n=te(t,"The Possibilities for Lists")},m(t,o){i(t,n,o)},d(t){t&&s(n)}}}function Bn(l){let n;return{c(){n=ee("Inherited Projections")},l(t){n=te(t,"Inherited Projections")},m(t,o){i(t,n,o)},d(t){t&&s(n)}}}function On(l){let n;return{c(){n=ee("Triggers")},l(t){n=te(t,"Triggers")},m(t,o){i(t,n,o)},d(t){t&&s(n)}}}function Qn(l){let n,t,o,c,p,g,r="At last, your patience is rewarded. In this step of the tutorial we are going to make the editor looking great!",h,v,O,k,C,E=`Let’s create a file called <code>edu-main.edit</code> in the <code>src/defs</code> folder, and define a default editor for this model unit.
	Please, enter the following line.`,M,q,z,G=`<code class="language-freon"><span class="token comment">// Education/lesson2-defs/edu-topics.edit#L3-L3
</span>
<span class="token keyword">editor</span> <span class="token keyword">default</span></code>`,U,Q,Oe="There, that’s done!",ae,I,F='No, of course we are not done. Just kidding, and showing you that Freon will add a default <a href="/Documentation/Defining_an_Editor/Projections">projection</a> for any concept that is not included in the editor definition. You can build your editor concept by concept.',T,N,L="In fact, the editor that is generated in lesson 1, is completely based on the defaults generated by Freon.",_,b,w,H,ne,oe,V,Mt=`A complete editor definition is build from a number of projections. To define a single projection we need the name of the concept, some
	curly brackets, and, last but not least a pair of square brackets. Everything that goes between the square brackets will be taken as
	literal as possible into the editor, that is, if there is indentation or literal text, this will be projected as unchangeable strings.`,Qe,ie,Ht=`The first step is to focus on the <em>Topic</em> model unit. Let’s state how this model unit should look. The projection for
	<em>Topic</em> consists of four parts.`,Ve,le,qt=`<li>A line with the fixed string <code>SiteGroup:</code> followed by the name of the site group. For the latter we use a syntax similar to
		the smart strings in TypeScript: <code>\${self.main}</code>. You may leave out the <code>self.</code> part. It indicates that
		we refer to the property of the <em>Topic</em> object that is projected. For clarity, we will be using this prefix everywhere in the tutorial.</li> <li>A line with the fixed string <code>Topic:</code> followed by the name of the unit.</li> <li>The third line is again similar, but projects the <code>description</code> property of the model unit. Next, we add an empty line which,
		like the indentation, will show in the editor.</li> <li>The last part of the definition gives the projection of the <code>pages</code> property, which is a list. By adding the keyword
		<code>vertical</code>
		we tell Freon to project the list vertically.</li>`,ze,ce,Ge,_n=`<code class="language-freon"><span class="token comment">// Education/lesson2-defs/edu-topics.edit#L3-L16
</span>
<span class="token keyword">editor</span> <span class="token keyword">default</span>

<span class="token class-name">Topic</span> &#123;<span class="token punctuation">[</span>
    SiteGroup: $&#123;<span class="token function"><span class="token variable">self</span>.main</span>&#125;
    Topic: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
    Topic description: $&#123;<span class="token function"><span class="token variable">self</span>.description</span>&#125;

    Pages:
    $&#123;<span class="token function"><span class="token variable">self</span>.pages <span class="token keyword">vertical</span> </span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Page</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
<span class="token punctuation">]</span>&#125;</code>`,Ue,W,Ct,We,re,Nt=`Above we have projected the pages as a vertical list. There are many options to project lists. First, not all lists need to be projected
	vertically. Use the keyword <code>horizontal</code> to display all list elements on a single line. The keyword may also be omitted, the
	default value is <code>vertical</code>.`,Ye,pe,It=`In the next projection, for the <em>Theory</em> concept we project two lists: <code>self.content</code> and <code>self.questions</code>.
	Notice that we added something to the projection of <code>self.content</code> in the above definition:
	<code>terminator[== END OF LINE]</code>. It means that after every element of the list the string ’== END OF LINE’ character is projected.
	Note that the line of dashes will also appear in the editor.`,Je,ue,Ke,kn=`<code class="language-freon"><span class="token class-name">Theory</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Theory
        $&#123;<span class="token function"><span class="token variable">self</span>.content <span class="token keyword">vertical</span> <span class="token keyword">terminator</span>[== END OF LINE]</span>&#125;

    Questions:
        $&#123;<span class="token function"><span class="token variable">self</span>.questions <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;
</code>`,Xe,fe,Ft=`Instead of using a terminator, you could also opt for a <code>separator</code>, where the character or string is projected between every
	element of the list, or an <code>initiator</code>, which projects the character or string before the element.`,Ze,de,xt="Here are some examples of how you can tweak the display.",et,me,tt,vn=`<code class="language-freon">    Theory
        $&#123;<span class="token function"><span class="token variable">self</span>.contents <span class="token keyword">vertical</span> <span class="token keyword">separator</span> [.]</span>&#125;

    Theory
        $&#123;<span class="token function"><span class="token variable">self</span>.content <span class="token keyword">horizontal</span> <span class="token keyword">terminator</span> [====]</span>&#125;

    Theory
        $&#123;<span class="token function"><span class="token variable">self</span>.content <span class="token keyword">vertical</span> initiator [Line]</span>&#125;</code>`,nt,he,St="Go ahead and try the different options.",st,Y,Et,at,ge,Dt=`Remember that we defined the concept <code>Page</code> to be abstract, and there were a lot of concepts that inherit from
	<code>Page</code>? Of course, we can build inherited projection definitions as well. We have defined the projection for the abstract
	concept <code>Page</code> as follows. It’s nothing fancy, but you could do more, if you like.`,ot,_e,it,$n=`<code class="language-freon"><span class="token comment">// Education/lesson2-defs/edu-topics.edit#L14-L16
</span>
<span class="token class-name">Page</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
<span class="token punctuation">]</span>&#125;</code>`,lt,ke,At=`Now look at how we incorporate this projection in the projection of one of <code>Page</code>’s children using this syntax:
	<code>[=&gt;Page]</code>. It means that we will include the default projection of <em>Page</em> right there. Note that we can use
	inherited properties, like <code>questions</code>, as expected in the projection.`,ct,ve,rt,wn=`<code class="language-freon"><span class="token comment">// Education/lesson2-defs/edu-topics.edit#L18-L25
</span>
<span class="token class-name">Theory</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Theory <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        $&#123;<span class="token function"><span class="token variable">self</span>.content <span class="token keyword">vertical</span> <span class="token keyword">terminator</span>[== END OF LINE]</span>&#125;

    Questions:
        $&#123;<span class="token function"><span class="token variable">self</span>.questions <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;</code>`,pt,$e,Rt=`Now we can almost finish the projection for this model unit by adding the following lines. Each concept that inherits from <code>Page</code>
	is defined, as well as the <code>questions</code> and <code>content</code> parts of <code>Page</code>.`,ut,we,ft,bn=`<code class="language-freon"><span class="token comment">// Education/lesson2-defs/edu-topics.edit#L27-L76
</span>
<span class="token class-name">Video</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Video <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        Maybe this video will help you understand.
        $&#123;<span class="token function"><span class="token variable">self</span>.url</span>&#125;

    Questions:
        $&#123;<span class="token function"><span class="token variable">self</span>.questions <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">WorkSheet</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Worksheet <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        See if you can answer the following questions.

    Questions:
        $&#123;<span class="token function"><span class="token variable">self</span>.questions <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">ExamplePage</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Example <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        $&#123;<span class="token function"><span class="token variable">self</span>.content</span>&#125;

        Now, please, answer the following questions.

    Questions:
        $&#123;<span class="token function"><span class="token variable">self</span>.questions <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">InDepthMaterial</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    InDepthMaterial <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        $&#123;<span class="token function"><span class="token variable">self</span>.content</span>&#125;

        Test your understanding by answering the following questions.

    Questions:
        $&#123;<span class="token function"><span class="token variable">self</span>.questions <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Question</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
        $&#123;<span class="token function"><span class="token variable">self</span>.content</span>&#125;
        Correct Answer: $&#123;<span class="token function"><span class="token variable">self</span>.correctAnswer</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Line</span> &#123;
    <span class="token punctuation">[</span>$&#123;<span class="token function"><span class="token variable">self</span>.content</span>&#125;<span class="token punctuation">]</span>
&#125;</code>`,dt,J,jt,mt,be,Bt=`Last thing to learn in this lesson is how we can make editing easier for the user. Remember that we needed a concept for numeric
	fractions? Its called <code>Fraction</code>, and it is formed by combining two numbers, a numerator and a denominator. This is how the
	concept is defined in the .ast file.`,ht,ye,gt,yn=`<code class="language-freon"><span class="token comment">// Education/lesson2-defs/edu-topics.ast#L53-L56
</span>
<span class="token keyword">concept</span> <span class="token class-name">Fraction</span> <span class="token keyword">base</span> <span class="token class-name">NumberConcept</span> &#123;
    numerator: <span class="token builtin">number</span>;
    denominator: <span class="token builtin">number</span>;
&#125;</code>`,_t,Te,Ot=`In Freon the user must first choose the Fraction option from a dropdown menu before he/she can enter any number. To avoid this extra step
	in editing, we can tell Freon that when a certain key or string is entered, it should automatically create an instance of the associated
	concept. The key or string to be entered is called the <strong>trigger</strong>.`,kt,Le,Qt=`For the Fraction concept we defined the trigger to be a forwards slash. If the user wants to add a correct answer to a question, where the
	possibilities are either a <em>SimpleNumber</em> or a <em>Fraction</em>, entering the ’/’ will produce a <em>Fraction</em> instance. So, the
	last two projections are defined as follows.`,vt,Pe,$t,Tn=`<code class="language-freon"><span class="token comment">// Education/lesson2-defs/edu-topics.edit#L78-L85
</span>
<span class="token class-name">SimpleNumber</span> &#123;
    <span class="token punctuation">[</span>$&#123;<span class="token function"><span class="token variable">self</span>.value</span>&#125;<span class="token punctuation">]</span>
&#125;

<span class="token class-name">Fraction</span> &#123;
    <span class="token punctuation">[</span>$&#123;<span class="token function">numerator</span>&#125; / $&#123;<span class="token function">denominator</span>&#125;<span class="token punctuation">]</span>
    <span class="token keyword">trigger</span> = <span class="token string">"/"</span>
&#125;</code>`,wt,Ce,Vt="Now go ahead, generate a new editor, and have a look. Your editor should now look like this. Much better than the result from lesson 1!",bt,Ee,yt,je,zt=`When you’ve gotten this far, it might be a good idea to try for yourself what happens if you change the projection, for instance, you
	might switch the order of the lines. But don’t forget to get back to the next part of the tutorial, where we will have more fun with
	defining projections.`,Tt,Me,Lt;n=new en({props:{prevLink:nn,nextLink:sn}});function Ln(e){l[1](e)}let Gt={tag:"h1",id:"making-an-editor-for-your-dsl-1",$$slots:{default:[Sn]},$$scope:{ctx:l}};l[0][0]!==void 0&&(Gt.intersecting=l[0][0]),o=new Be({props:Gt}),De.push(()=>Re(o,"intersecting",Ln));function Pn(e){l[2](e)}let Ut={tag:"h2",id:"the-default-editor-2",$$slots:{default:[Dn]},$$scope:{ctx:l}};l[0][1]!==void 0&&(Ut.intersecting=l[0][1]),v=new Be({props:Ut}),De.push(()=>Re(v,"intersecting",Pn)),b=new tn({props:{imageName:"tutorial/Tutorial-lesson2-screenshot1.png",caption:"Editor from lesson 1",figureNumber:2}});function Cn(e){l[3](e)}let Wt={tag:"h2",id:"a-projection-for-the-topic-model-unit-3",$$slots:{default:[An]},$$scope:{ctx:l}};l[0][2]!==void 0&&(Wt.intersecting=l[0][2]),H=new Be({props:Wt}),De.push(()=>Re(H,"intersecting",Cn));function En(e){l[4](e)}let Yt={tag:"h2",id:"the-possibilities-for-lists-4",$$slots:{default:[Rn]},$$scope:{ctx:l}};l[0][3]!==void 0&&(Yt.intersecting=l[0][3]),W=new Be({props:Yt}),De.push(()=>Re(W,"intersecting",En));function jn(e){l[5](e)}let Jt={tag:"h2",id:"inherited-projections-5",$$slots:{default:[Bn]},$$scope:{ctx:l}};l[0][4]!==void 0&&(Jt.intersecting=l[0][4]),Y=new Be({props:Jt}),De.push(()=>Re(Y,"intersecting",jn));function Mn(e){l[6](e)}let Kt={tag:"h2",id:"triggers-6",$$slots:{default:[On]},$$scope:{ctx:l}};return l[0][5]!==void 0&&(Kt.intersecting=l[0][5]),J=new Be({props:Kt}),De.push(()=>Re(J,"intersecting",Mn)),Ee=new tn({props:{imageName:"tutorial/Tutorial-lesson2-screenshot2.png",caption:"Editor after adding some projection definitions",figureNumber:3}}),Me=new en({props:{prevLink:nn,nextLink:sn}}),{c(){x(n.$$.fragment),t=u(),x(o.$$.fragment),p=u(),g=d("p"),g.textContent=r,h=u(),x(v.$$.fragment),k=u(),C=d("p"),C.innerHTML=E,M=u(),q=d("pre"),z=new K(!1),U=u(),Q=d("p"),Q.textContent=Oe,ae=u(),I=d("p"),I.innerHTML=F,T=u(),N=d("p"),N.textContent=L,_=u(),x(b.$$.fragment),w=u(),x(H.$$.fragment),oe=u(),V=d("p"),V.textContent=Mt,Qe=u(),ie=d("p"),ie.innerHTML=Ht,Ve=u(),le=d("ul"),le.innerHTML=qt,ze=u(),ce=d("pre"),Ge=new K(!1),Ue=u(),x(W.$$.fragment),We=u(),re=d("p"),re.innerHTML=Nt,Ye=u(),pe=d("p"),pe.innerHTML=It,Je=u(),ue=d("pre"),Ke=new K(!1),Xe=u(),fe=d("p"),fe.innerHTML=Ft,Ze=u(),de=d("p"),de.textContent=xt,et=u(),me=d("pre"),tt=new K(!1),nt=u(),he=d("p"),he.textContent=St,st=u(),x(Y.$$.fragment),at=u(),ge=d("p"),ge.innerHTML=Dt,ot=u(),_e=d("pre"),it=new K(!1),lt=u(),ke=d("p"),ke.innerHTML=At,ct=u(),ve=d("pre"),rt=new K(!1),pt=u(),$e=d("p"),$e.innerHTML=Rt,ut=u(),we=d("pre"),ft=new K(!1),dt=u(),x(J.$$.fragment),mt=u(),be=d("p"),be.innerHTML=Bt,ht=u(),ye=d("pre"),gt=new K(!1),_t=u(),Te=d("p"),Te.innerHTML=Ot,kt=u(),Le=d("p"),Le.innerHTML=Qt,vt=u(),Pe=d("pre"),$t=new K(!1),wt=u(),Ce=d("p"),Ce.textContent=Vt,bt=u(),x(Ee.$$.fragment),yt=u(),je=d("p"),je.textContent=zt,Tt=u(),x(Me.$$.fragment),this.h()},l(e){S(n.$$.fragment,e),t=f(e),S(o.$$.fragment,e),p=f(e),g=m(e,"P",{"data-svelte-h":!0}),y(g)!=="svelte-1305kt8"&&(g.textContent=r),h=f(e),S(v.$$.fragment,e),k=f(e),C=m(e,"P",{"data-svelte-h":!0}),y(C)!=="svelte-1673qnr"&&(C.innerHTML=E),M=f(e),q=m(e,"PRE",{class:!0});var a=P(q);z=X(a,!1),a.forEach(s),U=f(e),Q=m(e,"P",{"data-svelte-h":!0}),y(Q)!=="svelte-o4jilw"&&(Q.textContent=Oe),ae=f(e),I=m(e,"P",{"data-svelte-h":!0}),y(I)!=="svelte-1uc25cn"&&(I.innerHTML=F),T=f(e),N=m(e,"P",{"data-svelte-h":!0}),y(N)!=="svelte-1rmhbo4"&&(N.textContent=L),_=f(e),S(b.$$.fragment,e),w=f(e),S(H.$$.fragment,e),oe=f(e),V=m(e,"P",{"data-svelte-h":!0}),y(V)!=="svelte-g1qkoj"&&(V.textContent=Mt),Qe=f(e),ie=m(e,"P",{"data-svelte-h":!0}),y(ie)!=="svelte-1mrv8ek"&&(ie.innerHTML=Ht),Ve=f(e),le=m(e,"UL",{"data-svelte-h":!0}),y(le)!=="svelte-i1jj09"&&(le.innerHTML=qt),ze=f(e),ce=m(e,"PRE",{class:!0});var qe=P(ce);Ge=X(qe,!1),qe.forEach(s),Ue=f(e),S(W.$$.fragment,e),We=f(e),re=m(e,"P",{"data-svelte-h":!0}),y(re)!=="svelte-1xgykec"&&(re.innerHTML=Nt),Ye=f(e),pe=m(e,"P",{"data-svelte-h":!0}),y(pe)!=="svelte-1hjv0pc"&&(pe.innerHTML=It),Je=f(e),ue=m(e,"PRE",{class:!0});var Ne=P(ue);Ke=X(Ne,!1),Ne.forEach(s),Xe=f(e),fe=m(e,"P",{"data-svelte-h":!0}),y(fe)!=="svelte-35qx36"&&(fe.innerHTML=Ft),Ze=f(e),de=m(e,"P",{"data-svelte-h":!0}),y(de)!=="svelte-jcidfk"&&(de.textContent=xt),et=f(e),me=m(e,"PRE",{class:!0});var Ie=P(me);tt=X(Ie,!1),Ie.forEach(s),nt=f(e),he=m(e,"P",{"data-svelte-h":!0}),y(he)!=="svelte-16o8oyj"&&(he.textContent=St),st=f(e),S(Y.$$.fragment,e),at=f(e),ge=m(e,"P",{"data-svelte-h":!0}),y(ge)!=="svelte-dza0n7"&&(ge.innerHTML=Dt),ot=f(e),_e=m(e,"PRE",{class:!0});var Fe=P(_e);it=X(Fe,!1),Fe.forEach(s),lt=f(e),ke=m(e,"P",{"data-svelte-h":!0}),y(ke)!=="svelte-8ws9c9"&&(ke.innerHTML=At),ct=f(e),ve=m(e,"PRE",{class:!0});var xe=P(ve);rt=X(xe,!1),xe.forEach(s),pt=f(e),$e=m(e,"P",{"data-svelte-h":!0}),y($e)!=="svelte-mf3hvl"&&($e.innerHTML=Rt),ut=f(e),we=m(e,"PRE",{class:!0});var Se=P(we);ft=X(Se,!1),Se.forEach(s),dt=f(e),S(J.$$.fragment,e),mt=f(e),be=m(e,"P",{"data-svelte-h":!0}),y(be)!=="svelte-ht8sen"&&(be.innerHTML=Bt),ht=f(e),ye=m(e,"PRE",{class:!0});var Xt=P(ye);gt=X(Xt,!1),Xt.forEach(s),_t=f(e),Te=m(e,"P",{"data-svelte-h":!0}),y(Te)!=="svelte-182azg4"&&(Te.innerHTML=Ot),kt=f(e),Le=m(e,"P",{"data-svelte-h":!0}),y(Le)!=="svelte-1qgt3pz"&&(Le.innerHTML=Qt),vt=f(e),Pe=m(e,"PRE",{class:!0});var Zt=P(Pe);$t=X(Zt,!1),Zt.forEach(s),wt=f(e),Ce=m(e,"P",{"data-svelte-h":!0}),y(Ce)!=="svelte-yug171"&&(Ce.textContent=Vt),bt=f(e),S(Ee.$$.fragment,e),yt=f(e),je=m(e,"P",{"data-svelte-h":!0}),y(je)!=="svelte-1dct97m"&&(je.textContent=zt),Tt=f(e),S(Me.$$.fragment,e),this.h()},h(){z.a=null,$(q,"class","language-freon"),Ge.a=null,$(ce,"class","language-freon"),Ke.a=null,$(ue,"class","language-freon"),tt.a=null,$(me,"class","language-freon"),it.a=null,$(_e,"class","language-freon"),rt.a=null,$(ve,"class","language-freon"),ft.a=null,$(we,"class","language-freon"),gt.a=null,$(ye,"class","language-freon"),$t.a=null,$(Pe,"class","language-freon")},m(e,a){D(n,e,a),i(e,t,a),D(o,e,a),i(e,p,a),i(e,g,a),i(e,h,a),D(v,e,a),i(e,k,a),i(e,C,a),i(e,M,a),i(e,q,a),z.m(G,q),i(e,U,a),i(e,Q,a),i(e,ae,a),i(e,I,a),i(e,T,a),i(e,N,a),i(e,_,a),D(b,e,a),i(e,w,a),D(H,e,a),i(e,oe,a),i(e,V,a),i(e,Qe,a),i(e,ie,a),i(e,Ve,a),i(e,le,a),i(e,ze,a),i(e,ce,a),Ge.m(_n,ce),i(e,Ue,a),D(W,e,a),i(e,We,a),i(e,re,a),i(e,Ye,a),i(e,pe,a),i(e,Je,a),i(e,ue,a),Ke.m(kn,ue),i(e,Xe,a),i(e,fe,a),i(e,Ze,a),i(e,de,a),i(e,et,a),i(e,me,a),tt.m(vn,me),i(e,nt,a),i(e,he,a),i(e,st,a),D(Y,e,a),i(e,at,a),i(e,ge,a),i(e,ot,a),i(e,_e,a),it.m($n,_e),i(e,lt,a),i(e,ke,a),i(e,ct,a),i(e,ve,a),rt.m(wn,ve),i(e,pt,a),i(e,$e,a),i(e,ut,a),i(e,we,a),ft.m(bn,we),i(e,dt,a),D(J,e,a),i(e,mt,a),i(e,be,a),i(e,ht,a),i(e,ye,a),gt.m(yn,ye),i(e,_t,a),i(e,Te,a),i(e,kt,a),i(e,Le,a),i(e,vt,a),i(e,Pe,a),$t.m(Tn,Pe),i(e,wt,a),i(e,Ce,a),i(e,bt,a),D(Ee,e,a),i(e,yt,a),i(e,je,a),i(e,Tt,a),D(Me,e,a),Lt=!0},p(e,[a]){const qe={};a&256&&(qe.$$scope={dirty:a,ctx:e}),!c&&a&1&&(c=!0,qe.intersecting=e[0][0],Ae(()=>c=!1)),o.$set(qe);const Ne={};a&256&&(Ne.$$scope={dirty:a,ctx:e}),!O&&a&1&&(O=!0,Ne.intersecting=e[0][1],Ae(()=>O=!1)),v.$set(Ne);const Ie={};a&256&&(Ie.$$scope={dirty:a,ctx:e}),!ne&&a&1&&(ne=!0,Ie.intersecting=e[0][2],Ae(()=>ne=!1)),H.$set(Ie);const Fe={};a&256&&(Fe.$$scope={dirty:a,ctx:e}),!Ct&&a&1&&(Ct=!0,Fe.intersecting=e[0][3],Ae(()=>Ct=!1)),W.$set(Fe);const xe={};a&256&&(xe.$$scope={dirty:a,ctx:e}),!Et&&a&1&&(Et=!0,xe.intersecting=e[0][4],Ae(()=>Et=!1)),Y.$set(xe);const Se={};a&256&&(Se.$$scope={dirty:a,ctx:e}),!jt&&a&1&&(jt=!0,Se.intersecting=e[0][5],Ae(()=>jt=!1)),J.$set(Se)},i(e){Lt||(A(n.$$.fragment,e),A(o.$$.fragment,e),A(v.$$.fragment,e),A(b.$$.fragment,e),A(H.$$.fragment,e),A(W.$$.fragment,e),A(Y.$$.fragment,e),A(J.$$.fragment,e),A(Ee.$$.fragment,e),A(Me.$$.fragment,e),Lt=!0)},o(e){R(n.$$.fragment,e),R(o.$$.fragment,e),R(v.$$.fragment,e),R(b.$$.fragment,e),R(H.$$.fragment,e),R(W.$$.fragment,e),R(Y.$$.fragment,e),R(J.$$.fragment,e),R(Ee.$$.fragment,e),R(Me.$$.fragment,e),Lt=!1},d(e){e&&(s(t),s(p),s(g),s(h),s(k),s(C),s(M),s(q),s(U),s(Q),s(ae),s(I),s(T),s(N),s(_),s(w),s(oe),s(V),s(Qe),s(ie),s(Ve),s(le),s(ze),s(ce),s(Ue),s(We),s(re),s(Ye),s(pe),s(Je),s(ue),s(Xe),s(fe),s(Ze),s(de),s(et),s(me),s(nt),s(he),s(st),s(at),s(ge),s(ot),s(_e),s(lt),s(ke),s(ct),s(ve),s(pt),s($e),s(ut),s(we),s(dt),s(mt),s(be),s(ht),s(ye),s(_t),s(Te),s(kt),s(Le),s(vt),s(Pe),s(wt),s(Ce),s(bt),s(yt),s(je),s(Tt)),B(n,e),B(o,e),B(v,e),B(b,e),B(H,e),B(W,e),B(Y,e),B(J,e),B(Ee,e),B(Me,e)}}}let nn="/Tutorial/Creating_your_Metamodel",sn="/Tutorial/More_Fun_with_Projections";function Vn(l,n,t){let o;un(l,Z,k=>t(7,o=k)),He(Z,o=[{title:"Making an Editor for your DSL",visible:!1,ref:"#making-an-editor-for-your-dsl-1"},{title:"The default editor",visible:!1,ref:"#the-default-editor-2"},{title:"A projection for the Topic model unit",visible:!1,ref:"#a-projection-for-the-topic-model-unit-3"},{title:"The Possibilities for Lists",visible:!1,ref:"#the-possibilities-for-lists-4"},{title:"Inherited Projections",visible:!1,ref:"#inherited-projections-5"},{title:"Triggers",visible:!1,ref:"#triggers-6"}],o);let c=[];Hn(()=>{document.querySelectorAll("pre").forEach(C=>{const E=document.createElement("div");E.className="copy-prompt";const M=document.createElement("p");M.innerHTML="👆 Click to copy",M.className="copy-prompt-p";const q=document.createElement("img");q.src="/icons/copy-icon.svg",q.className="copy-prompt-img",E.appendChild(q),E.appendChild(M),C.appendChild(E),C.querySelector(".copy-prompt > p").addEventListener("click",z=>{Fn(C.querySelector("code").textContent),C.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{C.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3)})})});function p(k){l.$$.not_equal(c[0],k)&&(c[0]=k,t(0,c))}function g(k){l.$$.not_equal(c[1],k)&&(c[1]=k,t(0,c))}function r(k){l.$$.not_equal(c[2],k)&&(c[2]=k,t(0,c))}function h(k){l.$$.not_equal(c[3],k)&&(c[3]=k,t(0,c))}function v(k){l.$$.not_equal(c[4],k)&&(c[4]=k,t(0,c))}function O(k){l.$$.not_equal(c[5],k)&&(c[5]=k,t(0,c))}return l.$$.update=()=>{l.$$.dirty&1&&He(Z,o[0].visible=c[0],o),l.$$.dirty&1&&He(Z,o[1].visible=c[1],o),l.$$.dirty&1&&He(Z,o[2].visible=c[2],o),l.$$.dirty&1&&He(Z,o[3].visible=c[3],o),l.$$.dirty&1&&He(Z,o[4].visible=c[4],o),l.$$.dirty&1&&He(Z,o[5].visible=c[5],o)},[c,p,g,r,h,v,O]}class zn extends hn{constructor(n){super(),gn(this,n,Vn,Qn,pn,{})}}function an(l,n,t){const o=l.slice();return o[6]=n[t],o[8]=t,o}function on(l,n,t){const o=l.slice();return o[6]=n[t],o[8]=t,o}function Gn(l){let n,t;return{c(){n=d("img"),this.h()},l(o){n=m(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){$(n,"class","page-toc-small-img"),mn(n.src,t="/icons/down-arrow.png")||$(n,"src",t),$(n,"alt","arrow down")},m(o,c){i(o,n,c)},d(o){o&&s(n)}}}function Un(l){let n,t;return{c(){n=d("img"),this.h()},l(o){n=m(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){$(n,"class","page-toc-small-img"),mn(n.src,t="/icons/upload.png")||$(n,"src",t),$(n,"alt","arrow up")},m(o,c){i(o,n,c)},d(o){o&&s(n)}}}function ln(l){let n,t,o=Pt(l[0]),c=[];for(let p=0;p<o.length;p+=1)c[p]=cn(on(l,o,p));return{c(){n=d("div"),t=d("ul");for(let p=0;p<c.length;p+=1)c[p].c();this.h()},l(p){n=m(p,"DIV",{class:!0});var g=P(n);t=m(g,"UL",{class:!0});var r=P(t);for(let h=0;h<c.length;h+=1)c[h].l(r);r.forEach(s),g.forEach(s),this.h()},h(){$(t,"class","page-ul"),$(n,"class","toc-details")},m(p,g){i(p,n,g),j(n,t);for(let r=0;r<c.length;r+=1)c[r]&&c[r].m(t,null)},p(p,g){if(g&5){o=Pt(p[0]);let r;for(r=0;r<o.length;r+=1){const h=on(p,o,r);c[r]?c[r].p(h,g):(c[r]=cn(h),c[r].c(),c[r].m(t,null))}for(;r<c.length;r+=1)c[r].d(1);c.length=o.length}},d(p){p&&s(n),fn(c,p)}}}function cn(l){let n,t,o=l[6].title+"",c,p,g;return{c(){n=d("li"),t=d("a"),c=ee(o),g=u(),this.h()},l(r){n=m(r,"LI",{class:!0});var h=P(n);t=m(h,"A",{href:!0});var v=P(t);c=te(v,o),v.forEach(s),g=f(h),h.forEach(s),this.h()},h(){$(t,"href",p=l[6].ref),se(t,"page-visible",l[8]===l[2]),se(t,"page-nonvisible",l[8]!==l[2]),$(n,"class","page-toc-text")},m(r,h){i(r,n,h),j(n,t),j(t,c),j(n,g)},p(r,h){h&1&&o!==(o=r[6].title+"")&&dn(c,o),h&1&&p!==(p=r[6].ref)&&$(t,"href",p),h&4&&se(t,"page-visible",r[8]===r[2]),h&4&&se(t,"page-nonvisible",r[8]!==r[2])},d(r){r&&s(n)}}}function rn(l){let n,t,o=l[6].title+"",c,p,g;return{c(){n=d("li"),t=d("a"),c=ee(o),g=u(),this.h()},l(r){n=m(r,"LI",{class:!0});var h=P(n);t=m(h,"A",{href:!0});var v=P(t);c=te(v,o),v.forEach(s),g=f(h),h.forEach(s),this.h()},h(){$(t,"href",p=l[6].ref),se(t,"page-visible",l[8]===l[2]),se(t,"page-nonvisible",l[8]!==l[2]),$(n,"class","page-toc-text")},m(r,h){i(r,n,h),j(n,t),j(t,c),j(n,g)},p(r,h){h&1&&o!==(o=r[6].title+"")&&dn(c,o),h&1&&p!==(p=r[6].ref)&&$(t,"href",p),h&4&&se(t,"page-visible",r[8]===r[2]),h&4&&se(t,"page-nonvisible",r[8]!==r[2])},d(r){r&&s(n)}}}function Wn(l){let n,t,o,c="On this page ...",p,g,r,h,v,O,k,C,E,M,q="On this page",z,G,U,Q,Oe;function ae(_,b){return _[1]?Un:Gn}let I=ae(l),F=I(l),T=l[1]&&ln(l);v=new xn({}),k=new zn({});let N=Pt(l[0]),L=[];for(let _=0;_<N.length;_+=1)L[_]=rn(an(l,N,_));return{c(){n=d("div"),t=d("div"),o=d("p"),o.textContent=c,p=u(),g=d("button"),F.c(),r=u(),T&&T.c(),h=u(),x(v.$$.fragment),O=u(),x(k.$$.fragment),C=u(),E=d("nav"),M=d("h3"),M.textContent=q,z=u(),G=d("ul");for(let _=0;_<L.length;_+=1)L[_].c();this.h()},l(_){n=m(_,"DIV",{class:!0});var b=P(n);t=m(b,"DIV",{class:!0});var w=P(t);o=m(w,"P",{class:!0,"data-svelte-h":!0}),y(o)!=="svelte-1929lhs"&&(o.textContent=c),p=f(w),g=m(w,"BUTTON",{class:!0});var H=P(g);F.l(H),H.forEach(s),w.forEach(s),r=f(b),T&&T.l(b),h=f(b),S(v.$$.fragment,b),O=f(b),S(k.$$.fragment,b),b.forEach(s),C=f(_),E=m(_,"NAV",{class:!0});var ne=P(E);M=m(ne,"H3",{class:!0,"data-svelte-h":!0}),y(M)!=="svelte-1hgt7fi"&&(M.textContent=q),z=f(ne),G=m(ne,"UL",{class:!0});var oe=P(G);for(let V=0;V<L.length;V+=1)L[V].l(oe);oe.forEach(s),ne.forEach(s),this.h()},h(){$(o,"class","page-toc-small-title"),$(g,"class","page-toc-small-expand-button"),$(t,"class","page-toc-small"),$(n,"class","page-main"),$(M,"class","page-toc-title"),$(G,"class","page-ul"),$(E,"class","page-toc")},m(_,b){i(_,n,b),j(n,t),j(t,o),j(t,p),j(t,g),F.m(g,null),j(n,r),T&&T.m(n,null),j(n,h),D(v,n,null),j(n,O),D(k,n,null),i(_,C,b),i(_,E,b),j(E,M),j(E,z),j(E,G);for(let w=0;w<L.length;w+=1)L[w]&&L[w].m(G,null);U=!0,Q||(Oe=Nn(g,"click",l[4]),Q=!0)},p(_,[b]){if(I!==(I=ae(_))&&(F.d(1),F=I(_),F&&(F.c(),F.m(g,null))),_[1]?T?T.p(_,b):(T=ln(_),T.c(),T.m(n,h)):T&&(T.d(1),T=null),b&5){N=Pt(_[0]);let w;for(w=0;w<N.length;w+=1){const H=an(_,N,w);L[w]?L[w].p(H,b):(L[w]=rn(H),L[w].c(),L[w].m(G,null))}for(;w<L.length;w+=1)L[w].d(1);L.length=N.length}},i(_){U||(A(v.$$.fragment,_),A(k.$$.fragment,_),U=!0)},o(_){R(v.$$.fragment,_),R(k.$$.fragment,_),U=!1},d(_){_&&(s(n),s(C),s(E)),F.d(),T&&T.d(),B(v),B(k),fn(L,_),Q=!1,Oe()}}}function Yn(l,n,t){let o,c;un(l,Z,v=>t(0,c=v));let p=!1;function g(v){let O=o;for(let k=0;k<v.length;k++)if(v[k].visible)return k;return O}function r(){t(1,p=!p)}const h=()=>{r()};return l.$$.update=()=>{l.$$.dirty&1&&t(2,o=g(c))},[c,p,o,r,h]}class ns extends hn{constructor(n){super(),gn(this,n,Yn,Wn,pn,{})}}export{ns as component};
//# sourceMappingURL=85.ChrWCbU7.js.map
