import{d as k,r as y,f as H,c as $,a as t,t as l,n as h,o as f,p as L,b as M,_ as C,e as d,H as z,g as F,F as A,h as V,i as x}from"./index-x3ncPAbm.js";const G=u=>(L("data-v-32cd218c"),u=u(),M(),u),O={class:"header"},R=G(()=>t("h1",null,"Eligibility",-1)),q={class:"pagination-wrapper"},J={class:"btn-search-wrapper"},K=k({__name:"EligibilityHeader",props:{page:{type:Number,required:!0}},emits:["statusChanged","paginate"],setup(u,{emit:s}){const a=y("pending"),p=s,_=n=>{a.value=n,p("statusChanged",n)},b=n=>{p("paginate",n)};return H(()=>{}),(n,e)=>(f(),$("div",O,[R,t("div",q,[t("button",{onClick:e[0]||(e[0]=r=>b(-1)),class:"btn"},"Prev Page"),t("div",null,[t("span",null,l(n.$props.page),1)]),t("button",{onClick:e[1]||(e[1]=r=>b(1)),class:"btn"},"Next Page")]),t("div",J,[t("button",{class:h(["btn",{active:a.value==="pending"}]),onClick:e[2]||(e[2]=r=>_("pending"))},"Pending",2),t("button",{class:h(["btn",{active:a.value==="rejected"}]),onClick:e[3]||(e[3]=r=>_("rejected"))},"Rejected",2),t("button",{class:h(["btn",{active:a.value==="accepted"}]),onClick:e[4]||(e[4]=r=>_("accepted"))},"Accepted",2)])]))}}),Q=C(K,[["__scopeId","data-v-32cd218c"]]),o=u=>(L("data-v-025a3e2f"),u=u(),M(),u),U={class:"card"},W={class:"info"},X={class:"header"},Y=o(()=>t("h3",null,"Personal Info:",-1)),Z={class:"btns-wrapper"},tt=o(()=>t("strong",null,"Name: ",-1)),et=o(()=>t("strong",null,"Phone: ",-1)),nt=o(()=>t("strong",null,"Email: ",-1)),it=o(()=>t("strong",null,"Gender: ",-1)),st=o(()=>t("strong",null,"Date Of Birth: ",-1)),at=o(()=>t("h3",null,"Insurance Info:",-1)),lt=o(()=>t("strong",null,"Insurance Company: ",-1)),ot=o(()=>t("strong",null,"Insurance Card Front: ",-1)),rt=["href"],ct=o(()=>t("strong",null,"Insurance Card Back: ",-1)),dt=["href"],ut=o(()=>t("strong",null,"Member ID: ",-1)),pt=o(()=>t("strong",null,"Medicare ID: ",-1)),gt=o(()=>t("strong",null,"Medicaid ID: ",-1)),_t=o(()=>t("strong",null,"Submitted at: ",-1)),bt=k({__name:"EligibilityCard",props:{eligibility:{type:Object}},setup(u){var b;const s=u,a=y((b=s.eligibility)==null?void 0:b.status),p=async n=>{var r;if(a.value===n)return;const e=await z.put(`insurance/setStatus/${(r=s.eligibility)==null?void 0:r.id}/${n}`,{status:n},{Authorization:`Bearer ${localStorage.getItem("token")}`});e.status===401&&(window.location.href="/login"),e.status===200?a.value=n:alert(e.data.error)},_=n=>{if(!n)return"";const e=new Date(n),r=e.toLocaleDateString(),v=e.toLocaleTimeString();return`${r}  ${v}`};return(n,e)=>{var r,v,i,g,c,m,I,S,w,E,B,P,D,j,N;return f(),$("div",U,[t("div",W,[t("div",X,[Y,t("div",Z,[t("button",{class:h([{active:a.value==="pending"},"btn"]),onClick:e[0]||(e[0]=T=>p("pending"))},"Pending",2),t("button",{class:h([{active:a.value==="accepted"},"btn"]),onClick:e[1]||(e[1]=T=>p("accepted"))},"Accepted",2),t("button",{class:h(["btn",{active:a.value==="rejected"}]),onClick:e[2]||(e[2]=T=>p("rejected"))},"Rejected",2)])]),t("p",null,[tt,d(l((r=s.eligibility)==null?void 0:r.first_name)+" "+l((v=s.eligibility)==null?void 0:v.last_name),1)]),t("p",null,[et,d(l((i=s.eligibility)==null?void 0:i.phone),1)]),t("p",null,[nt,d(l((g=s.eligibility)==null?void 0:g.email),1)]),t("p",null,[it,d(l((c=s.eligibility)==null?void 0:c.gender),1)]),t("p",null,[st,d(l((m=s.eligibility)==null?void 0:m.dob),1)]),at,t("p",null,[lt,d(" "+l((I=s.eligibility)==null?void 0:I.insurance_provider),1)]),t("p",null,[ot,d(),t("a",{href:(S=s.eligibility)==null?void 0:S.insurance_card_front,target:"_blank"},l((w=s.eligibility)==null?void 0:w.insurance_card_front),9,rt)]),t("p",null,[ct,d(),t("a",{href:(E=s.eligibility)==null?void 0:E.insurance_card_back,target:"_blank"},l((B=s.eligibility)==null?void 0:B.insurance_card_back),9,dt)]),t("p",null,[ut,d(" "+l((P=n.$props.eligibility)==null?void 0:P.member_id),1)]),t("p",null,[pt,d(" "+l((D=n.$props.eligibility)==null?void 0:D.medicare_id),1)]),t("p",null,[gt,d(" "+l((j=n.$props.eligibility)==null?void 0:j.medicaid_id),1)]),t("p",null,[_t,d(" "+l(_((N=n.$props.eligibility)==null?void 0:N.created_at)),1)])])])}}}),vt=C(bt,[["__scopeId","data-v-025a3e2f"]]),yt={class:"eligibility-container"},ht=k({__name:"Eligibility",setup(u){const s=y("pending"),a=y(1),p=y(0),_=y([]),b=i=>{s.value=i,v()},n=i=>{a.value==1&&i<0||a.value==p.value&&i>0||(a.value=a.value+i,v())},e=async()=>{const i=await z.get(`insurance/status/${s.value}?page=${a.value}`,{Authorization:`Bearer ${localStorage.getItem("token")}`});if(_.value=i.data.data,p.value=i.data.last_page,console.log(i.data),i.status===401){window.location.href="/login";return}if(i.status===200)return i.data;alert(i.data.error)},v=((i,g=300)=>{let c;return function(...m){clearTimeout(c),c=setTimeout(()=>i.apply(this,m),g)}})(e,300);return H(()=>{e()}),(i,g)=>(f(),$(A,null,[F(Q,{page:1,onStatusChanged:g[0]||(g[0]=c=>b(c)),onPaginate:g[1]||(g[1]=c=>n(c))}),t("div",yt,[(f(!0),$(A,null,V(_.value,c=>(f(),x(vt,{class:"eligibility",key:c.id,eligibility:c},null,8,["eligibility"]))),128))])],64))}}),mt=C(ht,[["__scopeId","data-v-11b93bf0"]]);export{mt as default};