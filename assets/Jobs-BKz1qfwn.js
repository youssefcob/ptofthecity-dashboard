import{d as b,j as k,r as v,o as c,c as p,g as r,I,w as J,e as _,B as C,H as $,p as A,b as j,a as e,_ as f,M as S,F as h,t as u,n as w,f as x,h as B,i as D}from"./index-x3ncPAbm.js";import{R as H}from"./RadioInputField-CLcVQA_e.js";const M=o=>(A("data-v-34b4e1ef"),o=o(),j(),o),F={action:"",class:"form"},T=M(()=>e("h1",null,"Add Job",-1)),L=b({__name:"AddJobModal",setup(o){const t=k({title:"",description:"",isAvailable:0}),i=a=>{t.isAvailable=a==="Available"?1:0},n=v(!1),d=async()=>{n.value=!0;const a=await $.post("career/jobs",t,{Authorization:`Bearer ${localStorage.getItem("token")}`});n.value=!1,a.status===401&&(window.location.href="/login"),a.status===201?window.location.reload():alert(a.data.error),console.log(a)};return(a,l)=>(c(),p("div",F,[T,r(I,{onInput:l[0]||(l[0]=s=>t.title=s),type:"text",placeHolder:"Enter Job Title"}),r(H,{onChange:l[1]||(l[1]=s=>i(s)),style:{width:"100%"},title:"",options:["Available","Unavailable"],checked:"Available",id:"availability",error:!1}),r(I,{onInput:l[2]||(l[2]=s=>t.description=s),height:"20rem",label:"Job Description",type:"text",placeHolder:"Enter Job Description"}),r(C,{onClick:d,loading:n.value},{default:J(()=>[_(" Submit")]),_:1},8,["loading"])]))}}),z=f(L,[["__scopeId","data-v-34b4e1ef"]]),E=o=>(A("data-v-87d9df94"),o=o(),j(),o),N={class:"header"},V=E(()=>e("h1",null,"Jobs",-1)),R=b({__name:"JobsHeader",setup(o){const t=v(null);return(i,n)=>(c(),p(h,null,[r(S,{ref_key:"modal",ref:t},{default:J(()=>[r(z)]),_:1},512),e("div",N,[V,e("button",{class:"btn",onClick:n[0]||(n[0]=d=>{var a;return(a=t.value)==null?void 0:a.openModal()})},"Add Job")])],64))}}),U=f(R,[["__scopeId","data-v-87d9df94"]]),m=o=>(A("data-v-c550755b"),o=o(),j(),o),q={class:"card"},O={class:"card-header"},G={class:"btns-wrapper"},K={class:"card-body"},P=m(()=>e("strong",null,"Availaibility: ",-1)),Q=m(()=>e("strong",null,"Description: ",-1)),W=m(()=>e("strong",null,"Created at: ",-1)),X=m(()=>e("strong",null,"Last updated at: ",-1)),Y=b({__name:"JobCard",props:{job:{type:Object,required:!0}},setup(o){var a;const t=o;console.log(t.job);const i=l=>{if(!l)return"";const s=new Date(l),g=s.toLocaleDateString(),y=s.toLocaleTimeString();return`${g}  ${y}`},n=v((a=t.job)==null?void 0:a.isAvailable),d=async l=>{if(n.value===l)return;const s=await $.put(`career/jobs/${t.job.id}/${l}`,{},{Authorization:`Bearer ${localStorage.getItem("token")}`});console.log(s.data),s.status===200&&(n.value=l)};return(l,s)=>(c(),p("div",q,[e("div",O,[e("h3",null,u(t.job.title),1),e("div",G,[e("button",{class:w([{active:n.value===1},"btn"]),onClick:s[0]||(s[0]=g=>d(1))},"Available",2),e("button",{class:w([{active:n.value===0},"btn"]),onClick:s[1]||(s[1]=g=>d(0))},"UnAvailable",2)])]),e("div",K,[e("p",null,[P,_(u(t.job.isAvailable),1)]),e("p",null,[Q,_(u(t.job.description),1)]),e("p",null,[W,_(u(i(t.job.created_at)),1)]),e("p",null,[X,_(u(i(t.job.updated_at)),1)])])]))}}),Z=f(Y,[["__scopeId","data-v-c550755b"]]),tt={class:"jobs-container"},et=b({__name:"Jobs",setup(o){const t=v([]),i=async()=>{const n=await $.get("career/jobs");t.value=n.data};return x(()=>{i()}),(n,d)=>(c(),p(h,null,[r(U),e("div",tt,[(c(!0),p(h,null,B(t.value,a=>(c(),D(Z,{key:a.id,job:a},null,8,["job"]))),128))])],64))}}),st=f(et,[["__scopeId","data-v-1e77568d"]]);export{st as default};
