import{d as q,j as C,o as i,c as u,g as p,I as h,a as t,H as F,p as y,b as A,_ as v,r as b,w as Q,M as H,F as m,e as f,t as _,f as M,h as $,i as S}from"./index-DI2dkZHq.js";import{R as N}from"./RadioInputField-aHcVYVff.js";const w=o=>(y("data-v-1fb28120"),o=o(),A(),o),B={class:"form"},D=w(()=>t("h1",null,"Add FAQ",-1)),j={class:"ps"},O=w(()=>t("span",null,"Questions are grouped by category",-1)),V=q({__name:"AddFaqModal",emits:["faqAdded"],setup(o,{emit:r}){const n=r,d=C({question:"",answer:"",category:"",is_main:!1}),c=e=>{d.is_main=e=="Yes"},l=async()=>{const e=await F.post("content/faqs",d,{Authorization:`Bearer ${localStorage.getItem("token")}`});console.log(e),e.status==201&&n("faqAdded",e.data)};return(e,s)=>(i(),u("div",B,[D,p(h,{height:"12rem",onInput:s[0]||(s[0]=a=>d.question=a),type:"text",placeHolder:"Question"}),p(h,{height:"12rem",onInput:s[1]||(s[1]=a=>d.answer=a),type:"text",placeHolder:"Answer"}),t("div",j,[p(h,{onInput:s[2]||(s[2]=a=>d.category=a),type:"text",placeHolder:"Category"}),O]),p(N,{onChange:s[3]||(s[3]=a=>c(a)),title:"In Main Page",options:["Yes","No"],checked:"No",error:!1}),t("button",{class:"btn",onClick:s[4]||(s[4]=a=>l())},"Submit")]))}}),Y=v(V,[["__scopeId","data-v-1fb28120"]]),z=o=>(y("data-v-bb2d22bb"),o=o(),A(),o),P={class:"header"},R=z(()=>t("h1",null,"FAQs",-1)),T={class:"btn-search-wrapper"},E=q({__name:"FAQsHeader",emits:["search","faqAdded"],setup(o,{emit:r}){const n=r,d=b(null),c=l=>{var e;n("faqAdded",l),(e=d.value)==null||e.closeModal()};return(l,e)=>(i(),u(m,null,[p(H,{ref_key:"modal",ref:d},{default:Q(()=>[p(Y,{onFaqAdded:e[0]||(e[0]=s=>c(s))})]),_:1},512),t("div",P,[R,t("div",T,[t("button",{class:"add",onClick:e[1]||(e[1]=s=>{var a;return(a=d.value)==null?void 0:a.openModal()})},"Add FAQ")])])],64))}}),L=v(E,[["__scopeId","data-v-bb2d22bb"]]),g=o=>(y("data-v-a029e07b"),o=o(),A(),o),G={class:"faq-card"},J={class:"info"},K=g(()=>t("strong",null,"Question: ",-1)),U=g(()=>t("strong",null,"Answer: ",-1)),W=g(()=>t("strong",null,"Is On Main Page: ",-1)),X=g(()=>t("strong",null,"Category: ",-1)),Z=q({__name:"FaqCard",props:{faq:{type:Object,required:!0}},emits:["faqDeleted"],setup(o,{emit:r}){const n=o,d=r,c=async()=>{const l=await F.delete(`content/faqs/${n.faq.id}`,{Authorization:`Bearer ${localStorage.getItem("token")}`});l.status===401&&(window.location.href="/login"),l.status===200&&d("faqDeleted",n.faq.id)};return(l,e)=>(i(),u("div",G,[t("div",J,[t("p",null,[K,f(_(n.faq.question),1)]),t("p",null,[U,f(_(n.faq.answer),1)]),t("p",null,[W,f(_(n.faq.is_main?"Yes":"No"),1)]),t("p",null,[X,f(_(n.faq.category),1)])]),t("div",{class:"btn-wrapper"},[t("button",{class:"btn delete",onClick:c},"Delete")])]))}}),ee=v(Z,[["__scopeId","data-v-a029e07b"]]),te={class:"faqs-container"},se={class:"wrapper"},ae={class:"sectionHeader"},oe={class:"questionsContainer"},ne=q({__name:"FAQs",setup(o){const r=b({}),n=b([]),d=async()=>{let e=await F.get("content/faqs");r.value=e.data,n.value=Object.keys(e.data)};M(()=>{d()});const c=e=>{for(let s of n.value)r.value[s]=r.value[s].filter(a=>a.id!==e)},l=e=>{n.value.includes(e.category)?r.value[e.category].push(e):(n.value.push(e.category),r.value[e.category]=[e])};return(e,s)=>(i(),u(m,null,[p(L,{onFaqAdded:s[0]||(s[0]=a=>l(a))}),t("div",te,[(i(!0),u(m,null,$(n.value,(a,de)=>(i(),u("div",se,[t("h1",ae,_(a),1),t("div",oe,[(i(!0),u(m,null,$(r.value[a],(I,k)=>(i(),S(ee,{onFaqDeleted:s[1]||(s[1]=x=>c(x)),faq:I,key:k},null,8,["faq"]))),128))])]))),256))])],64))}}),ie=v(ne,[["__scopeId","data-v-90cb9278"]]);export{ie as default};
