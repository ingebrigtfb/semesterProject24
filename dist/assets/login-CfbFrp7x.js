import{c}from"./constants-CL3gOxZ7.js";async function i({email:o,password:n}){const t=await fetch(c,{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({email:o,password:n})});if(t.ok){const{data:e}=await t.json(),{accessToken:a,...r}=e,s=r.name;return localStorage.setItem("token",a),localStorage.setItem("userName",s),e}throw new Error("Login failed")}async function m(o){o.preventDefault();const n=o.target,t=new FormData(n),e=Object.fromEntries(t.entries());try{await i(e),alert("You are now logged in"),window.location.href="/"}catch(a){alert(a)}}const l=document.forms.login;l.addEventListener("submit",m);