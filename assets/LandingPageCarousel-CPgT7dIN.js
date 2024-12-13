import{d as C,r as m,f as H,o as d,c as r,a as n,g as p,I as $,F as b,h as y,t as I,_ as L,q as M,j as B,w as F,e as k,B as S,H as x,p as T,b as A,M as D}from"./index-BPzE-4MG.js";const P={class:"list-form-container"},E={class:"addToList-wrapper"},z={class:"list input-field"},N={class:"item"},V=["onClick"],j=C({__name:"ListInput",props:{list:{type:Array},placeHolder:String},emits:["input"],setup(u,{emit:v}){const c=u,l=m(""),o=m(c.list||[]),_=v,g=m(null),h=()=>{var t;l.value!==""&&(o.value.push(l.value),l.value="",(t=g.value)==null||t.clear(),_("input",o.value))},a=(t,e)=>{e.stopPropagation();const s=o.value.indexOf(t);s>-1&&o.value.splice(s,1),_("input",o.value)};return H(()=>{_("input",o.value)}),(t,e)=>(d(),r("div",P,[n("div",E,[p($,{ref_key:"listInput",ref:g,placeHolder:c.placeHolder,value:l.value,onInput:e[0]||(e[0]=s=>l.value=s)},null,8,["placeHolder","value"]),n("div",{class:"btn add",onClick:e[1]||(e[1]=s=>h())},"Add")]),n("div",z,[(d(!0),r(b,null,y(o.value,s=>(d(),r("div",N,[n("span",null,I(s),1),n("div",{class:"btn delete",onClick:i=>a(s,i)},"-",8,V)]))),256))])]))}}),q=L(j,[["__scopeId","data-v-662a5ec4"]]),O={class:"addToList-wrapper"},U={class:"list input-field"},G=["onClick"],J=C({__name:"MultiFileInputField",props:{list:{type:Array},placeHolder:{type:String,default:"Add Images"}},emits:["input"],setup(u,{emit:v}){const c=u;m("");const l=new FormData,o=m([]),_=m(null),g=v;m(null);const h=t=>{var s;t.forEach((i,f)=>{l.append(f,i),o.value.push(f)}),(s=_.value)==null||s.clear();let e=new FormData;l.forEach((i,f)=>{e.append("images[]",i)}),g("input",e)},a=(t,e)=>{e.stopPropagation(),l.delete(t),o.value=o.value.filter(s=>s!==t),l.forEach((s,i)=>{console.log(i,s)}),g("input",l)};return H(()=>{g("input",l)}),(t,e)=>(d(),r("div",O,[p(M,{placeHolder:c.placeHolder,onInput:e[0]||(e[0]=s=>h(s)),ref_key:"fileInputField",ref:_},null,8,["placeHolder"]),n("div",U,[(d(!0),r(b,null,y(o.value,(s,i)=>(d(),r("div",{class:"item",key:i},[n("div",{class:"btn delete",onClick:f=>a(s,f)},"-",8,G),n("span",null,I(s),1)]))),128))])]))}}),K=L(J,[["__scopeId","data-v-f4bb38db"]]),Q=u=>(T("data-v-7ce73406"),u=u(),A(),u),R={class:"form-wrapper"},W={class:"left"},X={class:"btn-wrapper"},Y={class:"right"},Z=Q(()=>n("div",{class:"ps"},"landscape aspect ratio 2:3 / 3:4 ",-1)),tt=C({__name:"AddCampaignModal",emits:["close","submit"],setup(u,{emit:v}){const c=v,l=m(!1),o=B({title:"",slogans:[],images:new FormData,animation_interval:"",buttonLink:"",buttonText:""}),_=async()=>{let a=g();try{l.value=!0;const t=await x.post("content/campaign",a,{Authorization:`Bearer ${localStorage.getItem("token")}`,"Content-Type":"multipart/form-data"});if(console.log(t.data),l.value=!1,t.status!=200){t.status===422&&alert(t.data.message),t.status===401&&(alert("Unauthorized"),window.location.href="/login"),console.log(t);return}c("submit",t.data)}catch(t){l.value=!1,console.log(t)}},g=()=>{let a=new FormData;return o.slogans.forEach(t=>{a.append("slogans[]",t)}),o.images.forEach((t,e)=>{a.append("images[]",t)}),a.append("title",o.title),a.append("animation_interval",o.animation_interval),a.append("buttonLink",o.buttonLink),a.append("buttonText",o.buttonText),a},h=a=>{o.images=a};return(a,t)=>(d(),r("div",R,[n("div",W,[p($,{placeHolder:"Add Title",onInput:t[0]||(t[0]=e=>o.title=e)}),p($,{placeHolder:"Interval In ms",onInput:t[1]||(t[1]=e=>o.animation_interval=e)}),p($,{placeHolder:"Button Link",onInput:t[2]||(t[2]=e=>o.buttonLink=e)}),p($,{placeHolder:"Button text",onInput:t[3]||(t[3]=e=>o.buttonText=e)}),n("div",X,[p(S,{class:"btn add",onClick:t[4]||(t[4]=e=>_()),loading:l.value},{default:F(()=>[k("submit")]),_:1},8,["loading"]),n("div",{class:"btn cancel",onClick:t[5]||(t[5]=e=>c("close"))},"Cancel")])]),n("div",Y,[n("div",null,[p(K,{onInput:t[6]||(t[6]=e=>h(e))}),Z]),p(q,{placeHolder:"Add Slogans",onInput:t[7]||(t[7]=e=>o.slogans=e)})])]))}}),et=L(tt,[["__scopeId","data-v-7ce73406"]]),w=u=>(T("data-v-4e5c237a"),u=u(),A(),u),nt={class:"landing-page"},at={class:"header"},ot=w(()=>n("h2",null,"Landing Page",-1)),st={class:"btn-wrapper"},lt={class:"card-header"},it={class:"slogans"},dt=w(()=>n("h3",null,"Slogans: ",-1)),rt=w(()=>n("h3",null,"Images: ",-1)),ut={class:"images"},ct=["href"],pt=w(()=>n("br",null,null,-1)),vt=C({__name:"LandingPageCarousel",setup(u){const v=m([]),c=m(null),l=m(!1),o=a=>{var t;v.value.push(a),(t=c.value)==null||t.closeModal()},_=async()=>{try{const a=await x.get("content/campaign",{Authorization:`Bearer ${localStorage.getItem("token")}`});console.log(a.data),v.value=a.data}catch(a){console.log(a)}},g=async a=>{l.value=!0;try{const t=await x.delete(`content/campaign/${a}`,{Authorization:`Bearer ${localStorage.getItem("token")}`});if(console.log(t.data),l.value=!1,t.status!=200){console.log(t);return}v.value=v.value.filter(e=>e.id!==a)}catch(t){l.value=!1,console.log(t)}},h=()=>{var a;(a=c.value)==null||a.openModal()};return H(()=>{_()}),(a,t)=>(d(),r(b,null,[p(D,{ref_key:"campaignModal",ref:c},{default:F(()=>[p(et,{onClose:t[0]||(t[0]=e=>{var s;return(s=c.value)==null?void 0:s.closeModal()}),onSubmit:t[1]||(t[1]=e=>o(e))})]),_:1},512),n("div",nt,[n("div",at,[ot,n("div",st,[n("button",{class:"btn add",onClick:t[2]||(t[2]=e=>h())},"Add Image")])]),(d(!0),r(b,null,y(v.value,(e,s)=>(d(),r("div",{class:"card",key:s},[n("div",lt,[n("h2",null,"Title: "+I(e.title),1),p(S,{class:"delete",onClick:i=>g(e.id),loading:l.value},{default:F(()=>[k("Delete")]),_:2},1032,["onClick","loading"])]),n("div",it,[dt,n("span",null,[k(" ["),(d(!0),r(b,null,y(e.slogans,(i,f)=>(d(),r(b,{key:f},[k(I(i)+", ",1)],64))),128)),k("]")])]),n("h3",null,"Animation: "+I(e.animation),1),n("h3",null,"Interval: "+I(e.animation_interval),1),n("h3",null,"Button Link: "+I(e.buttonLink),1),n("h3",null,"Button Text: "+I(e.buttonText),1),rt,n("div",ut,[(d(!0),r(b,null,y(e.images,(i,f)=>(d(),r("a",{key:f,href:i.path},[k("Image "+I(f),1),pt],8,ct))),128))])]))),128))])],64))}}),_t=L(vt,[["__scopeId","data-v-4e5c237a"]]);export{_t as default};
