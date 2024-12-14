import{A as g}from"./constants-Cio_5RR6.js";import{h as p}from"./headers-7jRSljoY.js";import{f}from"./singleListing-fIb1iqMv.js";async function b(s,l){const o=localStorage.getItem("token");if(!o)throw new Error("No auth token found. Please log in.");const d=`${g}/${s}`;try{const e=await fetch(d,{method:"PUT",headers:p(o),body:JSON.stringify(l)});if(console.log("Edit Listing Response:",e),!e.ok){const r=await e.json();throw console.error("Error Details:",r),new Error(`Failed to edit listing: ${r.message||"Unknown error"}`)}const t=await e.json();return console.log("Edited Listing Data:",t),t}catch(e){throw console.error("Error in editListing:",e),e}}async function y(s){const l=document.getElementById("edit-listing-container");if(!l){console.error("Error: #edit-listing-container not found.");return}try{const o=await f(s),{data:d}=o;l.innerHTML=`
            <form id="edit-listing-form" class="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
              <div class="flex flex-col">
                <label for="title" class="text-sm font-medium mb-1">Tittel</label>
                <input id="title" name="title" type="text" value="${d.title}" required class="border border-gray-300 rounded-md p-2">
              </div>
              <div class="flex flex-col">
                <label for="description" class="text-sm font-medium mb-1">Beskrivelse</label>
                <textarea id="description" name="description" required class="border border-gray-300 rounded-md p-2">${d.description||""}</textarea>
              </div>
              <div class="flex flex-col gap-4" id="media-container">
                <label class="text-sm font-medium mb-1">Bilder</label>
                ${d.media.map(e=>`
                    <div class="image-field flex items-center gap-4 mb-2">
                      <input type="url" name="media-url" value="${e.url}" placeholder="Bilde URL" class="border border-gray-300 rounded-md p-2 flex-grow">
                      <input type="text" name="media-alt" value="${e.alt||""}" placeholder="Alt tekst" class="border border-gray-300 rounded-md p-2 flex-grow">
                      <button type="button" class="text-red-500 hover:underline" onclick="this.parentElement.remove()">Fjern</button>
                    </div>
                `).join("")}
                <button type="button" id="add-image" class="text-black">Legg til flere bilder</button>
              </div>
              <button type="submit" class="bg-secondary text-white px-4 py-2 rounded-lg mx-auto w-30">Lagre endringer</button>
            </form>
        `,document.getElementById("add-image").addEventListener("click",()=>{const e=document.getElementById("media-container"),t=document.createElement("div");t.className="image-field flex items-center gap-4 mb-2";const r=document.createElement("input");r.type="url",r.name="media-url",r.placeholder="Bilde URL",r.className="border border-gray-300 rounded-md p-2 flex-grow";const a=document.createElement("input");a.type="text",a.name="media-alt",a.placeholder="Alt tekst",a.className="border border-gray-300 rounded-md p-2 flex-grow";const i=document.createElement("button");i.type="button",i.textContent="Fjern",i.className="text-red-500 hover:underline",i.addEventListener("click",()=>{e.removeChild(t)}),t.appendChild(r),t.appendChild(a),t.appendChild(i),e.appendChild(t)}),document.getElementById("edit-listing-form").addEventListener("submit",async e=>{e.preventDefault();const t=e.target,r=t.querySelectorAll(".image-field"),a=Array.from(r).map(n=>{const m=n.querySelector("input[name='media-url']").value.trim(),u=n.querySelector("input[name='media-alt']").value.trim();return{url:m,alt:u||void 0}}).filter(n=>n.url),i={title:t.querySelector("#title").value.trim(),description:t.querySelector("#description").value.trim()};try{const n=await b(s,i);console.log("Updated Listing:",n),alert("Endringer lagret!"),window.location.href=`/annonse/?id=${n.data.id}`}catch(n){console.error("Error updating listing:",n),alert("Kunne ikke lagre endringene.")}})}catch(o){console.error("Error displaying edit listing form:",o),l.innerHTML="<p>Kunne ikke laste annonsen. Vennligst prøv igjen senere.</p>"}}const h=new URLSearchParams(window.location.search),c=h.get("id");c?y(c):(console.error("Error: No listing ID found in the URL."),document.getElementById("edit-listing-container").innerHTML="<p>Kunne ikke finne annonsen. Vennligst prøv igjen senere.</p>");
