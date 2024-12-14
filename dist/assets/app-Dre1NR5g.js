(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))m(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&m(r)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function m(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();const N="modulepreload",k=function(n,e){return new URL(n,e).href},x={},O=function(e,d,m){let t=Promise.resolve();if(d&&d.length>0){const r=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),b=l?.nonce||l?.getAttribute("nonce");t=Promise.allSettled(d.map(c=>{if(c=k(c,m),c in x)return;x[c]=!0;const u=c.endsWith(".css"),C=u?'[rel="stylesheet"]':"";if(!!m)for(let f=r.length-1;f>=0;f--){const h=r[f];if(h.href===c&&(!u||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${C}`))return;const a=document.createElement("link");if(a.rel=u?"stylesheet":N,u||(a.as="script"),a.crossOrigin="",a.href=c,b&&a.setAttribute("nonce",b),document.head.appendChild(a),u)return new Promise((f,h)=>{a.addEventListener("load",f),a.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return t.then(r=>{for(const l of r||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};function P(){localStorage.removeItem("token"),localStorage.removeItem("userName"),alert("You have been logged out."),window.location.href="/auth/login/"}const w=document.createElement("div"),p=document.createElement("div");p.className="max-w-7xl mx-auto flex justify-between items-center p-4 relative z-10";const y=document.createElement("div");y.className="logo flex-shrink-0";const g=document.createElement("a");g.href="/";g.className="block";const E=document.createElement("img");E.src="/images/solgtLogo.webp";E.alt="Solgt logo";E.className="h-11";g.appendChild(E);y.appendChild(g);p.appendChild(y);const v=document.createElement("div");v.className="hamburger-menu flex flex-col justify-around h-7 md:hidden cursor-pointer";for(let n=0;n<3;n++){const e=document.createElement("div");e.className="bg-black h-1 w-6 mb-1",v.appendChild(e)}p.appendChild(v);const i=document.createElement("div");i.className="dropdown-menu hidden md:flex flex-col md:flex-row mt-2 md:mt-0 bg-containers md:bg-transparent shadow-lg md:shadow-none rounded-lg p-4 md:p-0 absolute md:static left-0 w-full md:w-auto top-16 md:top-auto";const S=[{text:"Hjem",href:"/"}],_=[{text:"Min profil",href:"/profil/"},{text:"Lag ny annonse",href:"/lage/"}],L=localStorage.getItem("token");S.forEach(n=>{const e=document.createElement("a");e.href=n.href,e.className="block px-4 py-2 text-black hover:bg-gray-200 rounded md:rounded-none",e.textContent=n.text,i.appendChild(e)});L&&_.forEach(n=>{const e=document.createElement("a");e.href=n.href,e.className="block px-4 py-2 text-black hover:bg-gray-200 rounded md:rounded-none",e.textContent=n.text,i.appendChild(e)});const s=document.createElement("a");s.className="block px-4 py-2 text-black hover:bg-gray-200 rounded md:rounded-none";L?(s.textContent="Logout",s.href="#",s.addEventListener("click",n=>{n.preventDefault(),P()})):(s.textContent="Login/Registrer",s.href="/auth/login/");i.appendChild(s);p.appendChild(i);v.addEventListener("click",()=>{i.classList.toggle("hidden")});w.appendChild(p);document.addEventListener("DOMContentLoaded",async()=>{const n=document.getElementById("header");n&&n.appendChild(w),(await O(()=>import("./index-BpoU6F4U.js"),[],import.meta.url)).default(window.location.pathname)});export{O as _};