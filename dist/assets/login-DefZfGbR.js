import{b as c}from"./constants-Cio_5RR6.js";async function i({email:t,password:n}){const o=await fetch(c,{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({email:t,password:n})});if(o.ok){const{data:e}=await o.json(),{accessToken:a,...r}=e,s=r.name;return localStorage.setItem("token",a),localStorage.setItem("userName",s),e}throw new Error("Login failed")}async function m(t){t.preventDefault();const n=t.target,o=new FormData(n),e=Object.fromEntries(o.entries());try{await i(e),window.location.href="/"}catch(a){alert(a)}}const f=document.forms.login;f.addEventListener("submit",m);