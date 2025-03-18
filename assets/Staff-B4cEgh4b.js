import{d as F,r as S,o as k,c as M,a as n,g as l,I as v,s as A,w as g,e as b,B as _,H as B,_ as h,u as L,M as N,t as w,F as E,p as T,b as O,f as U,h as V}from"./index-DQv5aN4G.js";const j={class:"form-container"},R={class:"left"},q={class:"right"},G={class:"btn-container"},J=F({__name:"AddStaffModal",emits:["newStaff","cancel"],setup(d,{emit:c}){const i=S(!1),s={first_name:"",last_name:"",title:"",image:new FormData,schedule:"",occupation:"",bio:""},o=c,f=async()=>{let a=r();i.value=!0;const e=await B.post("content/staff",a,{Authorization:`Bearer ${localStorage.getItem("token")}`,"Content-Type":"multipart/form-data"});i.value=!1,o("cancel"),e.status===201?o("newStaff",e.data):console.log(e),setTimeout(()=>{i.value=!1},2e3)},r=()=>{let a=new FormData;for(let e in s)e==="image"?s.image.forEach((t,C)=>{a.append("image",t)}):a.append(e,s[e]);return a};return(a,e)=>(k(),M("div",j,[n("div",R,[l(v,{placeHolder:"First Name",onInput:e[0]||(e[0]=t=>s.first_name=t)}),l(v,{placeHolder:"Last Name",onInput:e[1]||(e[1]=t=>s.last_name=t)}),l(v,{placeHolder:"title",onInput:e[2]||(e[2]=t=>s.title=t)}),l(v,{placeHolder:"Schedule",onInput:e[3]||(e[3]=t=>s.schedule=t)}),l(v,{placeHolder:"Occupation",onInput:e[4]||(e[4]=t=>s.occupation=t)}),l(A,{placeHolder:"Image",onInput:e[5]||(e[5]=t=>s.image=t)})]),n("div",q,[l(v,{height:"19rem",placeHolder:"Bio",onInput:e[6]||(e[6]=t=>s.bio=t)}),n("div",G,[l(_,{loading:i.value,onClick:e[7]||(e[7]=t=>f())},{default:g(()=>[b("Submit")]),_:1},8,["loading"]),l(_,{class:"cancel",onClick:e[8]||(e[8]=t=>o("cancel"))},{default:g(()=>[b("Cancel")]),_:1})])])]))}}),K=h(J,[["__scopeId","data-v-b0b39ef8"]]),P={class:"form-container"},Q={class:"left"},W={class:"right"},X={class:"btn-container"},Y=F({__name:"EditStaffModal",props:{member:Object},emits:["update","cancel"],setup(d,{emit:c}){var a,e,t,C,H,y;const i=d,s=S(!1),o={first_name:(a=i.member)==null?void 0:a.first_name,last_name:(e=i.member)==null?void 0:e.last_name,title:(t=i.member)==null?void 0:t.title,schedule:(C=i.member)==null?void 0:C.schedule,occupation:(H=i.member)==null?void 0:H.occupation,bio:(y=i.member)==null?void 0:y.bio},f=c,r=async()=>{var u;if(console.log(o),!i.member)return;s.value=!0;const I=await B.patch(`content/staff/update/${(u=i.member)==null?void 0:u.id}`,o,{Authorization:`Bearer ${localStorage.getItem("token")}`});s.value=!1,f("cancel"),I.status===201||I.status===200?f("update",I.data):console.log(I),setTimeout(()=>{s.value=!1},2e3)};return(I,u)=>(k(),M("div",P,[n("div",Q,[l(v,{placeHolder:"First Name",onInput:u[0]||(u[0]=m=>o.first_name=m),value:o.first_name},null,8,["value"]),l(v,{placeHolder:"Last Name",onInput:u[1]||(u[1]=m=>o.last_name=m),value:o.last_name},null,8,["value"]),l(v,{placeHolder:"Title",onInput:u[2]||(u[2]=m=>o.title=m),value:o.title},null,8,["value"]),l(v,{placeHolder:"Schedule",onInput:u[3]||(u[3]=m=>o.schedule=m),value:o.schedule},null,8,["value"]),l(v,{placeHolder:"Occupation",onInput:u[4]||(u[4]=m=>o.occupation=m),value:o.occupation},null,8,["value"])]),n("div",W,[l(v,{height:"14rem",placeHolder:"Bio",onInput:u[5]||(u[5]=m=>o.bio=m),value:o.bio},null,8,["value"]),n("div",X,[l(_,{loading:s.value,onClick:u[6]||(u[6]=m=>r())},{default:g(()=>[b("Submit")]),_:1},8,["loading"]),l(_,{class:"cancel",onClick:u[7]||(u[7]=m=>f("cancel"))},{default:g(()=>[b("Cancel")]),_:1})])])]))}}),Z=h(Y,[["__scopeId","data-v-ab98f0b8"]]),ee={class:"form-wrapper"},te=F({__name:"EditImageModal",props:{id:Number},emits:["update","cancel"],setup(d,{emit:c}){const i=d,s=c,o=S(!1);let f=new FormData;const r=async()=>{if(!i.id)return;o.value=!0;let a=new FormData;f.forEach((t,C)=>{a.append("image",t)});const e=await B.post(`content/staff/updateImage/${i.id}`,a,{Authorization:`Bearer ${localStorage.getItem("token")}`,"Content-Type":"multipart/form-data"});o.value=!1,s("cancel"),e.status===201||e.status===200?s("update",e.data):console.log(e)};return(a,e)=>(k(),M("div",ee,[l(A,{placeHolder:"Image",onInput:e[0]||(e[0]=t=>L(f)?f.value=t:f=t)}),l(_,{class:"submit",onClick:r,loading:o.value},{default:g(()=>[b("Submit")]),_:1},8,["loading"])]))}}),ae=h(te,[["__scopeId","data-v-3de741e2"]]),x=d=>(T("data-v-27d672d0"),d=d(),O(),d),le={class:"staff-card-header"},ne={class:"btn-container"},oe={class:"staff-card-body"},se=x(()=>n("strong",null,"occupation: ",-1)),de=x(()=>n("strong",null,"schedule: ",-1)),ie=x(()=>n("strong",null,"title: ",-1)),ue={class:"img"},re=x(()=>n("strong",null,"image: ",-1)),me=["href"],ce=x(()=>n("strong",null,"bio: ",-1)),fe=F({__name:"StaffCard",props:{member:Object},emits:["delete","update"],setup(d,{emit:c}){const i=d,s=S(!1),o=c,f=async e=>{e&&(s.value=!0,await B.delete(`content/staff/${e}`),s.value=!1,o("delete",e))},r=S(null),a=S(null);return(e,t)=>{var C,H,y,I,u,m,D;return k(),M(E,null,[l(N,{ref_key:"editModal",ref:r},{default:g(()=>{var $;return[l(Z,{member:i.member,onUpdate:t[0]||(t[0]=p=>o("update",p)),onCancel:($=r.value)==null?void 0:$.closeModal},null,8,["member","onCancel"])]}),_:1},512),l(N,{ref_key:"changeImageModal",ref:a},{default:g(()=>{var $,p;return[l(ae,{id:($=i.member)==null?void 0:$.id,onUpdate:t[1]||(t[1]=z=>o("update",z)),onCancel:(p=a.value)==null?void 0:p.closeModal},null,8,["id","onCancel"])]}),_:1},512),n("div",le,[n("h2",null,w((C=d.member)==null?void 0:C.first_name)+" "+w((H=d.member)==null?void 0:H.last_name),1),n("div",ne,[l(_,{class:"delete",loading:s.value,onClick:t[2]||(t[2]=$=>{var p;return f((p=d.member)==null?void 0:p.id)})},{default:g(()=>[b("Delete")]),_:1},8,["loading"]),l(_,{class:"edit",onClick:t[3]||(t[3]=$=>{var p;return(p=r.value)==null?void 0:p.openModal()})},{default:g(()=>[b("Edit")]),_:1})])]),n("div",oe,[n("div",null,[se,n("p",null,w((y=d.member)==null?void 0:y.occupation),1)]),n("div",null,[de,n("p",null,w((I=d.member)==null?void 0:I.schedule),1)]),n("div",null,[ie,n("p",null,w((u=d.member)==null?void 0:u.title),1)]),n("div",ue,[n("div",null,[re,b(),n("a",{href:(m=d.member)==null?void 0:m.image,target:"_blank"},"Click Here!",8,me)]),l(_,{class:"edit",onClick:t[4]||(t[4]=$=>{var p;return(p=a.value)==null?void 0:p.openModal()})},{default:g(()=>[b("Change Image")]),_:1})]),n("div",null,[ce,n("p",null,w((D=d.member)==null?void 0:D.bio),1)])])],64)}}}),pe=h(fe,[["__scopeId","data-v-27d672d0"]]),ve=d=>(T("data-v-0b9b3e5d"),d=d(),O(),d),ge={class:"staff-container"},be={class:"staff-container-header"},_e=ve(()=>n("h2",null,"Staff",-1)),Ie={class:"staff-card"},$e=F({__name:"Staff",setup(d){const c=S([]),i=S(null),s=async()=>{const r=await B.get("content/staff");c.value=r.data},o=r=>{c.value=c.value.filter(a=>a.id!==r)},f=r=>{c.value=c.value.map(a=>a.id===r.id?r:a)};return U(()=>{s()}),(r,a)=>(k(),M(E,null,[l(N,{ref_key:"modal",ref:i},{default:g(()=>[l(K,{onCancel:a[0]||(a[0]=e=>{var t;return(t=i.value)==null?void 0:t.closeModal()}),onNewStaff:a[1]||(a[1]=e=>c.value.push(e))})]),_:1},512),n("div",ge,[n("div",be,[_e,l(_,{class:"add",onClick:a[2]||(a[2]=e=>{var t;return(t=i.value)==null?void 0:t.openModal()})},{default:g(()=>[b("Add")]),_:1})]),(k(!0),M(E,null,V(c.value,e=>(k(),M("div",Ie,[l(pe,{member:e,onDelete:a[3]||(a[3]=t=>o(t)),onUpdate:a[4]||(a[4]=t=>f(t))},null,8,["member"])]))),256))])],64))}}),Ce=h($e,[["__scopeId","data-v-0b9b3e5d"]]);export{Ce as default};
