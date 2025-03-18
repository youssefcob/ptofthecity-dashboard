import{d as j,r as p,f as H,c as P,g as T,w as z,B as F,a as t,t as g,D as V,j as R,v as U,n as C,H as A,o as S,e as h,p as M,b as N,_ as L,F as q,h as G,i as Q}from"./index-DQv5aN4G.js";const O=_=>(M("data-v-72e3057d"),_=_(),N(),_),J={class:"header"},K=O(()=>t("h1",null,"Eligibility",-1)),W={class:"pagination-wrapper"},X={class:"clinic-wrapper"},Y={class:"btn-search-wrapper"},Z={class:"date-wrapper"},tt={class:"date"},et=O(()=>t("label",{for:"start"},"Start date:",-1)),nt={class:"date"},at=O(()=>t("label",{for:"end"},"End date:",-1)),st=["value"],lt=j({__name:"EligibilityHeader",props:{page:{type:Number,required:!0},lastPage:{type:Number,required:!0},downloading:{type:Boolean,required:!0}},emits:["statusChanged","paginate","exportCsv"],setup(_,{emit:o}){const f=_,r=p(f.page),w=p("all"),m=p(null),a=p(""),l=p(`${new Date().toISOString().split("T")[0]}`),y=p(""),c=p("all"),i=o,n=e=>{r.value==1&&e<0||r.value==f.lastPage&&e>0||(r.value=r.value+e,i("statusChanged",$()))},d=e=>{c.value=e,w.value=e,r.value=1,i("statusChanged",$())},b=p([]),I=e=>{if(e==="All"){m.value=null;return}b.value.includes(e)&&(m.value=e,r.value=1,i("statusChanged",$()))},D=e=>{a.value=e.target.value,r.value=1,i("statusChanged",$())},k=e=>{l.value=e.target.value,r.value=1,i("statusChanged",$())},E=()=>{i("exportCsv",$())},$=()=>{let e=[];r&&e.push(`page=${r.value}`),w.value&&e.push(`status=${w.value}`),m.value&&e.push(`insurance=${m.value}`),a.value&&e.push(`start_date=${a.value}`),l.value&&e.push(`end_date=${l.value}`),y.value=e.join("&"),console.log(y.value),i("statusChanged",y.value)},B=async()=>{let e=await A.get("images/insurance");e=e.data;let s=e.reduce((u,x)=>(u.push(x.title),u),[]);b.value=s};return H(async()=>{await B()}),(e,s)=>(S(),P("div",J,[K,T(F,{loading:_.downloading,class:"btn export",onClick:s[0]||(s[0]=u=>E())},{default:z(()=>[h("+ Export")]),_:1},8,["loading"]),t("div",W,[t("button",{onClick:s[1]||(s[1]=u=>n(-1)),class:"btn"},"<"),t("div",null,[t("span",null,g(f.page),1)]),t("button",{onClick:s[2]||(s[2]=u=>n(1)),class:"btn"},">")]),t("div",X,[T(V,{list:b.value,placeHolder:"Insurances",onInput:s[3]||(s[3]=u=>I(u))},null,8,["list"])]),t("div",Y,[R(t("select",{"onUpdate:modelValue":s[4]||(s[4]=u=>c.value=u),onChange:s[5]||(s[5]=u=>d(c.value))},[t("option",{class:C(["btn",{active:c.value==="all"}]),value:"all"},"All",2),t("option",{class:C(["btn",{active:c.value==="pending"}]),value:"pending"},"Pending",2),t("option",{class:C(["btn",{active:c.value==="confirmed"}]),value:"confirmed"},"Confirmed ",2),t("option",{class:C(["btn",{active:c.value==="cancelled"}]),value:"cancelled"},"Cancelled ",2)],544),[[U,c.value]])]),t("div",Z,[t("div",tt,[et,t("input",{type:"date",name:"start",onChange:s[6]||(s[6]=u=>D(u))},null,32)]),t("div",nt,[at,t("input",{type:"date",name:"end",onChange:s[7]||(s[7]=u=>k(u)),value:new Date().toISOString().split("T")[0]},null,40,st)])])]))}}),it=L(lt,[["__scopeId","data-v-72e3057d"]]),v=_=>(M("data-v-025a3e2f"),_=_(),N(),_),ot={class:"card"},rt={class:"info"},ut={class:"header"},dt=v(()=>t("h3",null,"Personal Info:",-1)),ct={class:"btns-wrapper"},gt=v(()=>t("strong",null,"Name: ",-1)),pt=v(()=>t("strong",null,"Phone: ",-1)),vt=v(()=>t("strong",null,"Email: ",-1)),_t=v(()=>t("strong",null,"Gender: ",-1)),bt=v(()=>t("strong",null,"Date Of Birth: ",-1)),ht=v(()=>t("h3",null,"Insurance Info:",-1)),ft=v(()=>t("strong",null,"Insurance Company: ",-1)),yt=v(()=>t("strong",null,"Insurance Card Front: ",-1)),mt=["href"],$t=v(()=>t("strong",null,"Insurance Card Back: ",-1)),wt=["href"],Ct=v(()=>t("strong",null,"Member ID: ",-1)),It=v(()=>t("strong",null,"Medicare ID: ",-1)),St=v(()=>t("strong",null,"Medicaid ID: ",-1)),Dt=v(()=>t("strong",null,"Submitted at: ",-1)),kt=j({__name:"EligibilityCard",props:{eligibility:{type:Object}},setup(_){var m;const o=_,f=p((m=o.eligibility)==null?void 0:m.status),r=async a=>{var y;if(f.value===a)return;const l=await A.put(`insurance/setStatus/${(y=o.eligibility)==null?void 0:y.id}/${a}`,{status:a},{Authorization:`Bearer ${localStorage.getItem("token")}`});l.status===401&&(window.location.href="/login"),l.status===200?f.value=a:alert(l.data.error)},w=a=>{if(!a)return"";const l=new Date(a),y=l.toLocaleDateString(),c=l.toLocaleTimeString();return`${y}  ${c}`};return(a,l)=>{var y,c,i,n,d,b,I,D,k,E,$,B,e,s,u;return S(),P("div",ot,[t("div",rt,[t("div",ut,[dt,t("div",ct,[t("button",{class:C([{active:f.value==="pending"},"btn"]),onClick:l[0]||(l[0]=x=>r("pending"))},"Pending",2),t("button",{class:C([{active:f.value==="accepted"},"btn"]),onClick:l[1]||(l[1]=x=>r("accepted"))},"Accepted",2),t("button",{class:C(["btn",{active:f.value==="rejected"}]),onClick:l[2]||(l[2]=x=>r("rejected"))},"Rejected",2)])]),t("p",null,[gt,h(g((y=o.eligibility)==null?void 0:y.first_name)+" "+g((c=o.eligibility)==null?void 0:c.last_name),1)]),t("p",null,[pt,h(g((i=o.eligibility)==null?void 0:i.phone),1)]),t("p",null,[vt,h(g((n=o.eligibility)==null?void 0:n.email),1)]),t("p",null,[_t,h(g((d=o.eligibility)==null?void 0:d.gender),1)]),t("p",null,[bt,h(g((b=o.eligibility)==null?void 0:b.dob),1)]),ht,t("p",null,[ft,h(" "+g((I=o.eligibility)==null?void 0:I.insurance_provider),1)]),t("p",null,[yt,h(),t("a",{href:(D=o.eligibility)==null?void 0:D.insurance_card_front,target:"_blank"},g((k=o.eligibility)==null?void 0:k.insurance_card_front),9,mt)]),t("p",null,[$t,h(),t("a",{href:(E=o.eligibility)==null?void 0:E.insurance_card_back,target:"_blank"},g(($=o.eligibility)==null?void 0:$.insurance_card_back),9,wt)]),t("p",null,[Ct,h(" "+g((B=a.$props.eligibility)==null?void 0:B.member_id),1)]),t("p",null,[It,h(" "+g((e=a.$props.eligibility)==null?void 0:e.medicare_id),1)]),t("p",null,[St,h(" "+g((s=a.$props.eligibility)==null?void 0:s.medicaid_id),1)]),t("p",null,[Dt,h(" "+g(w((u=a.$props.eligibility)==null?void 0:u.created_at)),1)])])])}}}),Et=L(kt,[["__scopeId","data-v-025a3e2f"]]),Bt={class:"eligibility-container"},xt=j({__name:"Eligibility",setup(_){p("pending");const o=p(1),f=p(0),r=p([]),w=i=>{c(i)},m=async(i="")=>{const n=await A.get(`insurance/filter?${i}`,{Authorization:`Bearer ${localStorage.getItem("token")}`});if(r.value=n.data.data,f.value=n.data.last_page,console.log(n.data),n.status===401){window.location.href="/login";return}if(n.status===200)return n.data;alert(n.data.error)},a=p(!1),l=async(i="")=>{try{a.value=!0;const n=await A.get(`insurance/filter/export?${i}`,{Authorization:`Bearer ${localStorage.getItem("token")}`});if(a.value=!1,n.status===200){const d=window.URL.createObjectURL(new Blob([n.data])),b=document.createElement("a");b.href=d;const I=new Date().toISOString().split("T")[0];b.setAttribute("download",`insurances_${I}.csv`),document.body.appendChild(b),b.click()}else alert(n.data.error)}catch(n){a.value=!1,console.error(n),alert("An error occured while exporting reservations")}},c=((i,n=300)=>{let d;return function(...b){clearTimeout(d),d=setTimeout(()=>i.apply(this,b),n)}})(m,300);return H(()=>{m()}),(i,n)=>(S(),P(q,null,[T(it,{downloading:a.value,page:o.value,lastPage:f.value,onStatusChanged:n[0]||(n[0]=d=>w(d)),onExportCsv:n[1]||(n[1]=d=>l(d))},null,8,["downloading","page","lastPage"]),t("div",Bt,[(S(!0),P(q,null,G(r.value,d=>(S(),Q(Et,{class:"eligibility",key:d.id,eligibility:d},null,8,["eligibility"]))),128))])],64))}}),At=L(xt,[["__scopeId","data-v-2a9aba9b"]]);export{At as default};
