import{f as g,a as s,t as M,e as Te}from"../chunks/nks1QWJh.js";import{y as me,G as he,x as j,z as ue,u as a,A as P,g as o,I as se,B as Z,a as C,$ as Se,v,s as fe,w as f}from"../chunks/bZIXIZs8.js";import{d as Ae,i as B,s as ce}from"../chunks/DANOUgWt.js";import{e as Y,p as Ve,i as Re,s as le}from"../chunks/CKHUE_gp.js";import{h as Le}from"../chunks/DCXhKCCG.js";import{h as ke}from"../chunks/aX-frc9G.js";import{s as d}from"../chunks/BpSVRMQn.js";import{o as Ce}from"../chunks/D62n5Z03.js";import{P as de,S as F,c as Ie,B as qe}from"../chunks/CFDUsp8k.js";import{F as pe}from"../chunks/Bq9rkPJ0.js";const Me=async({parent:R})=>{const{site:e,category:c}=await R();return{site:e,category:c,page:{title:"Namespace Alternatives",description:"Learn how to replace hierarchical visibility in Freon using namespace alternatives, including qualified-name scenarios, recursive alternatives, and how alternatives transform the namespace tree into a graph.",tags:["namespace alternatives","scoping","visibility","qualified names","recursive alternatives","namespace graph","scope rules","Freon","DSL development"],modifiedTime:"2025-11-07T17:39:02.389Z",publishedTime:"2025-11-07T17:20:18.623Z"}}},nt=Object.freeze(Object.defineProperty({__proto__:null,load:Me},Symbol.toStringTag,{value:"Module"}));var Pe=g(`<!> <!> <p>There are occasions where you do not want to adhere to the hierarchical nature of namespaces. For example,
when you want to implement a qualified name in your DSL, like <code>moduleA.partB</code>, where what comes after the dot
is something that is visible in <code>moduleA</code>, but possibly not in the namespace
in which this expression is located.</p> <p>This can be done using namespace alternatives. Where namespace imports
add nodes to the set of visible nodes, a namespace alternative both <em>removes and adds</em> nodes. What is removed are the
visible nodes from the parent namespace. In the case of the expression <code>moduleA.partB</code> this would be the namespace
in which the expression resides. What is added is another namespace (the alternative), which in the example
would be the namespace identified by <code>moduleA</code>.</p> <!> <p>The effect of declaring a namespace alternative on the namespace tree is that the link of the namespace with its parent is
removed, and a link to another namespace is made.
This second namespace is then used as if it were an imported namespace, i.e. only the non-private (public), declared nodes become visible.</p> <p>For instance, suppose in the following figure that node Z1 has a namespace replacement to node A6, as shown by the green arrow.
In that case, the link between Z1 and its parent namespace A1 is broken. The visible nodes of Z1 are its
declared nodes ([H1, J1, A7]), plus the declared nodes of A6 ([A6, F1, D6]).</p> <!> <p>When we leave out the AST nodes, the difference to the namespace tree, will become clearer. Note that similar to the effect
of a namespace import, the effect of a namespace alternative is that the namespace tree is changed into a graph.</p> <!> <!> <p>Sometimes you may want to include not only the declared nodes of the alternative namespace, but its alternative
nodes as well. We can define this in the scope
file by adding the keyword <code>recursive</code> in front of the alternative namespace. Each alternative in the list can
have its own keyword.</p> <pre class="language-freon"><code class="language-freon">// Insurance/src/defs/scoper-docu.scope#L11-L15

AttributeRef &#123;
	alternatives &#123;
        self.owner().type();
    &#125; 
&#125;</code></pre> <!> <p>Let’s explore the case we mentioned earlier, where you want a qualified name in your DSL, like <code>moduleA.partB</code>. Suppose
you would also like to
be able to address local variables without the prefix, like <code>localVarA</code>. In that case you need to
include concepts like the following in your .ast file. A <code>SimpleVarReference</code> represents a reference to local variables,
a <code>ComplexVarReference</code> represents a reference with a prefix. To be prepared for the future where you might want
to have modules within modules the target of a <code>ComplexVarReference</code> is either a <code>SimpleVarReference</code> (no prefix), or
a <code>ComplexVarReference</code> (adding another prefix). The structure of your language would look like this:</p> <pre class="language-freon"><code class="language-freon">// QName/src/defs/LanguageWithScopes.ast#L21-L31

abstract concept VarReference &#123;
&#125;

concept ComplexVarReference base VarReference &#123;
    target: VarReference;
    reference module: Module;
&#125;

concept SimpleVarReference base VarReference &#123;
    reference target: Variable;
&#125;</code></pre> <p>Now the scoper definition can be as follows.</p> <pre class="language-freon"><code class="language-freon">// QName/src/defs/LanguageWithScopes.scope

scoper for language QName

isNamespace &#123; Module, VarReference &#125;

VarReference &#123;
    alternatives &#123;
        recursive owner().if(Module);
        owner().if(ComplexVarReference).module;
    &#125;
&#125;
</code></pre> <p>Both <code>Module</code> and <code>VarReference</code> are namespaces, which means that we can define what is visible in both contexts.
For <code>Module</code> we simply used the standard hierarchical manner of building namespaces. But <code>VarReference</code> is different.
An instance of <code>VarReference</code> resides within a <code>Module</code>, so when the hierarchy of namespaces is used, everything
that is visible in this <code>Module</code> would be visible in the <code>VarReference</code>. That is fine, when you want to refer to a local variable,
because the local variables would indeed be visible in the surrounding <code>Module</code>. But it is not okay, when we want to refer
to <code>partA</code> from <code>ModuleA</code>. In such an instance of a <code>ComplexVarReference</code> only what is visible in <code>ModuleA</code> should be visible.</p> <p>So, we distinguish between these two cases by creating two alternative namespaces. The first expression is actually
recreating the hierarchy of namespaces but <em>only</em> when the owning namespace is an instance of Module. Then the visible nodes
consist of everything declared in this owning namespace, and because it is recursive, we get the nodes from its parents as well.
The second expression yields a result when the <code>VarReference</code> exists within an instance of <code>ComplexVarReference</code>. In this case
it defines the <code>module</code> property of its owner as its namespace.</p> <p>We cannot define the scope of <code>ComplexVarReference</code> only, because then a <code>SimpleVarReference</code> within a <code>ComplexVarReference</code> would still have the scope of its parent, not of the <code>module</code> property of its parent.</p> <p>To finish this off, let’s revisit the editor definition to get the appearance and behaviour right. When you make the following entries
in the .edit file, any <code>ComplexVarReference</code> would indeed look like <code>moduleA.partB</code>, and any <code>SimpleVarReference</code> would look like <code>partX</code>. Now, the behaviour that you would normally get is that the user must create either a <code>ComplexVarReference</code> instance, or a <code>SimpleVarReference</code> instance, and then add the option from the correct list. The behaviour that you would like, is probably
that the user is simply able to select an option from the correct list. The trick to get this behaviour is to add the reference
shortcuts as shown below (See <a href="/Documentation/Defining_an_Editor">Ease of Editing</a>).</p> <pre class="language-freon"><code class="language-freon">// QName/src/defs/LanguageWithScopes.edit#L10-L20

ComplexVarReference &#123;[
    $&#123;module&#125;.$&#123;target&#125;
]
referenceShortcut = $&#123;module&#125;
&#125;

SimpleVarReference &#123;[
    $&#123;target&#125;
]
referenceShortcut = $&#123;target&#125;
&#125;</code></pre> <!> <p>As promised, here is the complete algorithm for building the namespace graph in pseudocode.</p> <pre><code>FreNamespace &#123;
    getDeclaredNodes(publicOnly: boolean): FreNamedNode[] &#123;
        return all AST nodes in the subtree of which this namespace is the top,
        and the leaves are AST nodes that are themselves namespaces.
        The parameter 'publicOnly' indicates whether to include AST nodes that are marked private.
        The constant 'ALL' indicates that all nodes should be included, the constant 'PUBLIC_ONLY'
        indicates the opposite.
    &#125;
    getParentNodes(): FreNamedNode[] &#123;
        THIS.parentNamespace.getVisibleNodes();
    &#125;
    getImportedNodes(list: FreNamespaceInfo[]): FreNamedNode[] &#123;
        list.forEach(import =&gt; &#123;
            import.namespace.getDeclaredNodes(PUBLIC_ONLY)
        plus
            if (import is recursive) &#123;
                import.namespace.getImportedNodes(import.namespace.imports)
            &#125;
        &#125;)
    &#125;
    getAlternativeNodes(): FreNamedNode[] &#123;
        getDeclaredNodes(ALL) plus
        getImportedNodes(THIS.alternatives)
    &#125;
    getVisibleNodes(): FreNamedNode[] &#123;
        if (has replacement) then
            getAlternativeNodes()
        else
            getDeclaredNodes(ALL) plus
            getParentNodes() plus
            getImportedNodes(THIS.imports)
        endif
    &#125;
&#125;
</code></pre> <p>With all this knowledge, we are finally able to explain how to write a Freon scoper definition. You can find this on the next page.</p> <!>`,1);function Be(R,e){me(e,!0);const c=he({});Ce(()=>{document.querySelectorAll("pre").forEach(i=>{const r=document.createElement("div");r.className="copy-prompt";const A=document.createElement("p");A.innerHTML="👆 Click to copy",A.className="copy-prompt-p";const I=document.createElement("img");I.src="/icons/copy-icon.svg",I.className="copy-prompt-img",r.appendChild(I),r.appendChild(A),i.appendChild(r),i.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{i.querySelector("code")?.textContent!==null&&i.querySelector("code")?.textContent!==void 0&&Ie(i.querySelector("code").textContent),i.querySelector(".copy-prompt > p")?.innerHTML!==null&&i.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(i.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{i.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let N="/Documentation/Defining_Scope_Rules/Namespace_Imports",b="/Documentation/Defining_Scope_Rules/The_Scoper_Definition";var D=Pe(),T=j(D);de(T,{prevLink:N,nextLink:b});var S=a(T,2);F(S,{tag:"h1",id:"namespace-alternatives-1",onIntersectChange:t=>e.setVisible("namespace-alternatives-1",t),get intersecting(){return c["namespace-alternatives-1"]},set intersecting(t){c["namespace-alternatives-1"]=t},children:(t,i)=>{P();var r=M("Namespace Alternatives");s(t,r)},$$slots:{default:!0}});var L=a(S,6);F(L,{tag:"h2",id:"effect-on-the-namespace-tree-2",onIntersectChange:t=>e.setVisible("effect-on-the-namespace-tree-2",t),get intersecting(){return c["effect-on-the-namespace-tree-2"]},set intersecting(t){c["effect-on-the-namespace-tree-2"]=t},children:(t,i)=>{P();var r=M("Effect on the Namespace Tree");s(t,r)},$$slots:{default:!0}});var k=a(L,6);pe(k,{imageName:"documentation/AST-graph-with-alternative.png",caption:"AST with namespace alternative",figureNumber:1});var E=a(k,4);pe(E,{imageName:"documentation/NS-graph-with-alternative.png",caption:"Namespace Graph with alternative",figureNumber:2});var W=a(E,2);F(W,{tag:"h2",id:"recursive-alternatives-3",onIntersectChange:t=>e.setVisible("recursive-alternatives-3",t),get intersecting(){return c["recursive-alternatives-3"]},set intersecting(t){c["recursive-alternatives-3"]=t},children:(t,i)=>{P();var r=M("Recursive Alternatives");s(t,r)},$$slots:{default:!0}});var O=a(W,6);F(O,{tag:"h2",id:"example-a-qualified-name-4",onIntersectChange:t=>e.setVisible("example-a-qualified-name-4",t),get intersecting(){return c["example-a-qualified-name-4"]},set intersecting(t){c["example-a-qualified-name-4"]=t},children:(t,i)=>{P();var r=M("Example: A Qualified Name");s(t,r)},$$slots:{default:!0}});var w=a(O,20);F(w,{tag:"h2",id:"scoping-the-algorithm-5",onIntersectChange:t=>e.setVisible("scoping-the-algorithm-5",t),get intersecting(){return c["scoping-the-algorithm-5"]},set intersecting(t){c["scoping-the-algorithm-5"]=t},children:(t,i)=>{P();var r=M("Scoping: The Algorithm");s(t,r)},$$slots:{default:!0}});var Q=a(w,8);de(Q,{prevLink:N,nextLink:b}),s(R,D),ue()}var Fe=g('<meta property="article:published_time"/>'),De=g('<meta property="article:modified_time"/>'),Ee=g('<meta property="article:tag"/>'),We=g('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),Oe=(R,e)=>{fe(e,!o(e))},He=g('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),je=g('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),Qe=g('<li class="page-toc-text"><a> </a></li>'),ze=g('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ze=g('<li class="page-toc-text"><a> </a></li>'),Ye=g('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function it(R,e){me(e,!0);let c=se(!1);const N=he([{id:"namespace-alternatives-1",title:"Namespace Alternatives",visible:!1,ref:"#namespace-alternatives-1"},{id:"effect-on-the-namespace-tree-2",title:"Effect on the Namespace Tree",visible:!1,ref:"#effect-on-the-namespace-tree-2"},{id:"recursive-alternatives-3",title:"Recursive Alternatives",visible:!1,ref:"#recursive-alternatives-3"},{id:"example-a-qualified-name-4",title:"Example: A Qualified Name",visible:!1,ref:"#example-a-qualified-name-4"},{id:"scoping-the-algorithm-5",title:"Scoping: The Algorithm",visible:!1,ref:"#scoping-the-algorithm-5"}]);let b=se(0);function D(n,l){const u=N.find(p=>p.id===n);u&&(u.visible=l);const m=N.findIndex(p=>p.visible);m>=0&&fe(b,m,!0)}const T=Z(()=>e.data.page.title?`${e.data.site.title} – ${e.data.category.title} – ${e.data.page.title}`:`${e.data.site.title} – ${e.data.category.title}`),S=Z(()=>e.data.page.description??e.data.category.description),L="https://freon4dsl.dev/images/freon-banner.png";let k=Z(()=>{const n=Ve.url.pathname;return`https://freon4dsl.dev${n==="/"?"/":n.replace(/\/$/,"")}`});const E=e.data.site?.tags??[],W=e.data.category?.tags??[],O=e.data.page.tags??[],w=[...new Set([...E,...W,...O].filter(Boolean))],Q={"@context":"https://schema.org","@type":"WebPage",headline:o(T),description:o(S),url:o(k),datePublished:e.data.page.publishedTime,dateModified:e.data.page.modifiedTime,keywords:w.length?w.join(", "):void 0,image:L,publisher:e.data?.site?.title?{"@type":"Organization",name:e.data.site.title}:void 0};var t=Ye();ke(n=>{var l=We(),u=j(l),m=a(u,4),p=a(m,2);{var V=h=>{var x=Fe();C(()=>d(x,"content",e.data.page.publishedTime)),s(h,x)};B(p,h=>{e.data.page.publishedTime&&h(V)})}var y=a(p,2);{var _=h=>{var x=De();C(()=>d(x,"content",e.data.page.modifiedTime)),s(h,x)};B(y,h=>{e.data.page.modifiedTime&&h(_)})}var q=a(y,2);{var z=h=>{var x=Te(),_e=j(x);Y(_e,17,()=>w,Re,(xe,Ne)=>{var re=Ee();C(()=>d(re,"content",o(Ne))),s(xe,re)}),s(h,x)};B(q,h=>{w&&h(z)})}var H=a(q,2),K=a(H,4),$=a(K,2),ee=a($,2),te=a(ee,2);d(te,"content",L);var ae=a(te,2),oe=a(ae,4),ne=a(oe,2),ie=a(ne,2);d(ie,"content",L);var ye=a(ie,2);Le(ye,()=>`<script type="application/ld+json">${JSON.stringify(Q)}<\/script>`),C(h=>{Se.title=o(T)??"",d(u,"content",o(S)),d(m,"href",o(k)),d(H,"content",h),d(K,"content",o(T)),d($,"content",o(S)),d(ee,"content",e.data.site.title),d(ae,"content",o(k)),d(oe,"content",o(T)),d(ne,"content",o(S))},[()=>w.join(", ")]),s(n,l)});var i=j(t),r=v(i),A=a(v(r),2);A.__click=[Oe,c];var I=v(A);{var ge=n=>{var l=He();s(n,l)},ve=n=>{var l=je();s(n,l)};B(I,n=>{o(c)?n(ge):n(ve,!1)})}f(A),f(r);var G=a(r,2);{var be=n=>{var l=ze(),u=v(l);Y(u,22,()=>N,m=>m,(m,p,V)=>{var y=Qe(),_=v(y);let q;var z=v(_,!0);f(_),f(y),C(H=>{d(_,"href",p.ref),q=le(_,1,"",null,q,H),ce(z,p.title)},[()=>({"page-visible":o(V)===o(b),"page-nonvisible":o(V)!==o(b)})]),s(m,y)}),f(u),f(l),s(n,l)};B(G,n=>{o(c)&&n(be)})}var J=a(G,2);qe(J,{});var we=a(J,2);Be(we,{setVisible:D}),f(i);var U=a(i,2),X=a(v(U),2);Y(X,22,()=>N,n=>n,(n,l,u)=>{var m=Ze(),p=v(m);let V;var y=v(p,!0);f(p),f(m),C(_=>{d(p,"href",l.ref),V=le(p,1,"",null,V,_),ce(y,l.title)},[()=>({"page-visible":o(u)===o(b),"page-nonvisible":o(u)!==o(b)})]),s(n,m)}),f(X),f(U),s(R,t),ue()}Ae(["click"]);export{it as component,nt as universal};
//# sourceMappingURL=47.CkXc-Fuk.js.map
