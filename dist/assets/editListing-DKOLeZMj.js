import{A as g}from"./constants-Cio_5RR6.js";import{h as p}from"./headers-7jRSljoY.js";import{f}from"./singleListing-K9pWS-hE.js";async function b(s,d){const l=localStorage.getItem("token");if(!l)throw new Error("No auth token found. Please log in.");const a=`${g}/${s}`;try{const e=await fetch(a,{method:"PUT",headers:p(l),body:JSON.stringify(d)});if(console.log("Edit Listing Response:",e),!e.ok){const r=await e.json();throw console.error("Error Details:",r),new Error(`Failed to edit listing: ${r.message||"Unknown error"}`)}const t=await e.json();return console.log("Edited Listing Data:",t),t}catch(e){throw console.error("Error in editListing:",e),e}}async function y(s){const d=document.getElementById("edit-listing-container");if(!d){console.error("Error: #edit-listing-container not found.");return}try{const l=await f(s),{data:a}=l;d.innerHTML=`
            <form id="edit-listing-form" class="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
              <div class="flex flex-col">
                <label for="title" class="text-sm font-medium mb-1">Tittel</label>
                <input id="title" name="title" type="text" value="${a.title}" required class="border border-gray-300 rounded-md p-2">
              </div>
              <div class="flex flex-col">
                <label for="description" class="text-sm font-medium mb-1">Beskrivelse</label>
                <textarea id="description" name="description" required class="border border-gray-300 rounded-md p-2">${a.description||""}</textarea>
              </div>
              <div class="flex flex-col">
                <label for="endsAt" class="text-sm font-medium mb-1">Slutt dato og tid</label>
                <input id="endsAt" name="endsAt" type="datetime-local" value="${new Date(a.endsAt).toISOString().slice(0,-1)}" required class="border border-gray-300 rounded-md p-2">
              </div>
              <div class="flex flex-col gap-4" id="media-container">
                <label class="text-sm font-medium mb-1">Bilder</label>
                ${a.media.map(e=>`
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
        `,document.getElementById("add-image").addEventListener("click",()=>{const e=document.getElementById("media-container"),t=document.createElement("div");t.className="image-field flex items-center gap-4 mb-2";const r=document.createElement("input");r.type="url",r.name="media-url",r.placeholder="Bilde URL",r.className="border border-gray-300 rounded-md p-2 flex-grow";const i=document.createElement("input");i.type="text",i.name="media-alt",i.placeholder="Alt tekst",i.className="border border-gray-300 rounded-md p-2 flex-grow";const o=document.createElement("button");o.type="button",o.textContent="Fjern",o.className="text-red-500 hover:underline",o.addEventListener("click",()=>{e.removeChild(t)}),t.appendChild(r),t.appendChild(i),t.appendChild(o),e.appendChild(t)}),document.getElementById("edit-listing-form").addEventListener("submit",async e=>{e.preventDefault();const t=e.target,r=t.querySelectorAll(".image-field"),i=Array.from(r).map(n=>{const m=n.querySelector("input[name='media-url']").value.trim(),u=n.querySelector("input[name='media-alt']").value.trim();return{url:m,alt:u||void 0}}).filter(n=>n.url),o={title:t.querySelector("#title").value.trim(),description:t.querySelector("#description").value.trim(),endsAt:t.querySelector("#endsAt").value.trim(),media:i};try{const n=await b(s,o);console.log("Updated Listing:",n),alert("Endringer lagret!"),window.location.href=`/annonse/?id=${n.data.id}`}catch(n){console.error("Error updating listing:",n),alert("Kunne ikke lagre endringene.")}})}catch(l){console.error("Error displaying edit listing form:",l),d.innerHTML="<p>Kunne ikke laste annonsen. Vennligst prøv igjen senere.</p>"}}const h=new URLSearchParams(window.location.search),c=h.get("id");c?y(c):(console.error("Error: No listing ID found in the URL."),document.getElementById("edit-listing-container").innerHTML="<p>Kunne ikke finne annonsen. Vennligst prøv igjen senere.</p>");
