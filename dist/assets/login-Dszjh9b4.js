import{b as i}from"./constants-Cio_5RR6.js";async function c({email:o,password:n}){const t=await fetch(i,{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({email:o,password:n})});if(t.ok){const{data:e}=await t.json(),{accessToken:a,...r}=e,s=r.name;return localStorage.setItem("token",a),localStorage.setItem("userName",s),e}throw new Error("Login failed")}async function m(o){o.preventDefault();const n=o.target,t=new FormData(n),e=Object.fromEntries(t.entries());try{await c(e),alert("You are now logged in"),window.location.href="/"}catch(a){alert(a)}}const l=document.forms.login;l.addEventListener("submit",m);