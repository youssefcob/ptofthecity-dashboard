import{d as f,f as v,o as n,c as i,l as u,t as p,m as k,a as l,F as g,h as y,n as x,_ as C}from"./index-Dum0w2EL.js";const E={class:"radio-input-field"},I={class:"options"},b=["checked","name","value"],B=["for"],F=f({__name:"RadioInputField",props:{title:{},options:{},error:{type:Boolean},checked:{}},emits:["change"],setup(m,{emit:h}){const e=m,d=h;v(()=>{const s=document.querySelectorAll(".radio-input");s.forEach(a=>{a.addEventListener("click",c=>{o(c),t(c)})});const o=a=>{const c=a.target;s.forEach(r=>{r.classList.remove("active")}),c.classList.add("active")},t=a=>{const r=a.target.previousElementSibling;r.checked=!0,d("change",r.value)}});const _=s=>e.checked==s?(d("change",s),!0):!1;return(s,o)=>(n(),i("div",E,[e.title?(n(),i("span",{key:0,class:"text",style:u(e.error?"color:red;":"")},p(e.title)+":",5)):k("",!0),l("div",I,[(n(!0),i(g,null,y(e.options,t=>(n(),i("div",{class:"option",key:t},[l("input",{type:"radio",onChange:o[0]||(o[0]=()=>{}),checked:_(t),name:e.title,value:t},null,40,b),l("div",{class:x(["radio-input",`${e.checked==t?"active":""}`]),for:t},null,10,B),l("label",{class:"text",style:u(e.error?"color:red;":"")},p(t),5)]))),128))])]))}}),R=C(F,[["__scopeId","data-v-baf0f7b7"]]);export{R};