import{b as c}from"./constants-CL3gOxZ7.js";import{h as m}from"./headers-D2xKkvkn.js";async function u(a){const t=localStorage.getItem("token");if(!t)throw new Error("No auth token found. Please log in.");try{const e=await fetch(c,{method:"POST",headers:m(t),body:JSON.stringify(a)});if(console.log("Create Listing Response:",e),!e.ok){const n=await e.json();throw console.error("Error Details:",n),new Error(`Failed to create listing: ${n.message||"Unknown error"}`)}const r=await e.json();return console.log("Parsed Response Data:",r),r}catch(e){throw console.error("Error in createListing:",e),e}}function g(){const a=document.getElementById("media-container"),t=document.createElement("div");t.className="image-field flex items-center gap-4 mb-2";const e=document.createElement("input");e.type="url",e.name="media-url",e.placeholder="Legg inn bilde url",e.className="border border-gray-300 rounded-md p-2 flex-grow";const r=document.createElement("input");r.type="text",r.name="media-alt",r.placeholder="Legg inn alt tekst",r.className="border border-gray-300 rounded-md p-2 flex-grow";const n=document.createElement("button");n.type="button",n.textContent="Fjern",n.className="text-red-500 hover:text-red-700",n.addEventListener("click",()=>{a.removeChild(t)}),t.appendChild(e),t.appendChild(r),t.appendChild(n),a.appendChild(t)}async function s(a){var l;a.preventDefault();const t=a.target,e=document.querySelectorAll(".image-field"),r=Array.from(e).map(o=>{const i=o.querySelector("input[name='media-url']").value.trim(),d=o.querySelector("input[name='media-alt']").value.trim();return{url:i,alt:d||void 0}}).filter(o=>o.url),n={title:t.querySelector("input[name='title']").value.trim(),description:t.querySelector("textarea[name='description']").value.trim(),endsAt:t.querySelector("input[name='endsAt']").value.trim(),media:r};console.log("Final Listing Data:",n);try{const o=await u(n);console.log("Created Listing:",o);const i=(l=o.data)==null?void 0:l.id;if(i)alert("Listing created successfully!"),window.location.href=`/annonse/?id=${i}`;else throw new Error("Listing ID not found in the response.")}catch(o){console.error("Error creating listing:",o),alert(`Error creating listing: ${o.message}`)}}document.getElementById("add-image").addEventListener("click",g);document.getElementById("create-listing-form").addEventListener("submit",s);document.getElementById("create-listing-form").addEventListener("submit",s);
