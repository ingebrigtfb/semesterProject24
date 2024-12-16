import{d as l}from"./constants-Cio_5RR6.js";import{h as s}from"./headers-7jRSljoY.js";async function c(r,a){const e=localStorage.getItem("token");if(!e)throw new Error("No auth token found. Please log in.");const o=`${l}/auction/profiles/${r}`;console.log("Request URL:",o),console.log("Request Body:",a);try{const t=await fetch(o,{method:"PUT",headers:s(e),body:JSON.stringify(a)});if(!t.ok){const n=await t.json();throw console.error("Server Response:",n),new Error(`Profile update failed: ${n.message||"Unknown error"}`)}return await t.json()}catch(t){throw console.error("Error in updateProfile:",t),t}}async function u(r){r.preventDefault();const a=r.target,e=new FormData(a),o={};e.get("bio")&&(o.bio=e.get("bio")),e.get("avatar")&&(o.avatar={url:e.get("avatar"),alt:e.get("avatar-alt")||"Avatar image"}),e.get("banner")&&(o.banner={url:e.get("banner"),alt:e.get("banner-alt")||"Banner image"});const t=localStorage.getItem("userName");if(!t){alert("No username found. Please log in.");return}try{const n=await c(t,o);alert("Profilen ble oppdatert!"),window.location.href="/profil/",console.log("Updated Profile:",n)}catch(n){alert(`Gikk ikke å oppdatere profil: ${n.message}`)}}function i(){const r=document.getElementById("bio"),a=document.getElementById("bio-char-count"),e=160-r.value.length;a.textContent=`${e} tegn igjen`}window.updateCharCount=i;document.getElementById("update-profile-form").addEventListener("submit",u);i();