import{A as f}from"./constants-Cio_5RR6.js";import{h as g}from"./headers-7jRSljoY.js";import{f as p}from"./singleListing-DEtMEmTg.js";async function y(d,a){const l=localStorage.getItem("token");if(!l)throw new Error("No auth token found. Please log in.");const s=`${f}/${d}`;try{const e=await fetch(s,{method:"PUT",headers:g(l),body:JSON.stringify(a)});if(console.log("Edit Listing Response:",e),!e.ok){const n=await e.json();throw console.error("Error Details:",n),new Error(`Failed to edit listing: ${n.message||"Unknown error"}`)}const t=await e.json();return console.log("Edited Listing Data:",t),t}catch(e){throw console.error("Error in editListing:",e),e}}async function b(d){const a=document.getElementById("edit-listing-container");if(!a){console.error("Error: #edit-listing-container not found.");return}try{const l=await p(d),{data:s}=l;a.innerHTML=`
            <form id="edit-listing-form" class="bg-containers shadow-md rounded-lg p-6 flex flex-col gap-4">
            <h1 class="text-2xl font-medium mb-4 text-center">Rediger Annonse</h1>
              <div class="flex flex-col">
                <label for="title" class="text-sm font-medium mb-1">Tittel</label>
                <input id="title" name="title" type="text" value="${s.title}" required 
                  class="border border-secondary rounded-md p-2 focus:ring-2 focus:ring-secondary focus:outline-none">
              </div>
              <div class="flex flex-col">
                <label for="description" class="text-sm font-medium mb-1">Beskrivelse</label>
                <textarea id="description" name="description" required 
                  class="border border-secondary rounded-md p-2 focus:ring-2 focus:ring-secondary focus:outline-none">${s.description||""}</textarea>
              </div>
              <div class="flex flex-col gap-4" id="media-container">
                <label class="text-sm font-medium mb-1">Bilder</label>
                ${s.media.map(e=>`
                    <div class="image-field flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                      <input type="url" name="media-url" value="${e.url}" placeholder="Bilde URL" 
                        class="border border-secondary rounded-md p-2 w-full sm:w-auto sm:flex-1 focus:ring-2 focus:ring-secondary focus:outline-none">
                      <input type="text" name="media-alt" value="${e.alt||""}" placeholder="Alt tekst" 
                        class="border border-secondary rounded-md p-2 w-full sm:w-auto sm:flex-1 focus:ring-2 focus:ring-secondary focus:outline-none">
                      <button type="button" class="text-red-500 hover:underline" onclick="this.parentElement.remove()">Fjern</button>
                    </div>
                `).join("")}
                <button type="button" id="add-image" class="text-black hover:underline mt-2">Legg til flere bilder</button>
              </div>
              <button type="submit" class="bg-secondary text-white px-4 py-2 rounded-lg mx-auto w-30">Lagre endringer</button>
            </form>
        `,document.getElementById("add-image").addEventListener("click",()=>{const e=document.getElementById("media-container"),t=document.createElement("div");t.className="image-field flex flex-col sm:flex-row sm:items-center gap-4 mb-2";const n=document.createElement("input");n.type="url",n.name="media-url",n.placeholder="Bilde URL",n.className="border border-secondary rounded-md p-2 w-full sm:w-auto sm:flex-1 focus:ring-2 focus:ring-secondary focus:outline-none";const o=document.createElement("input");o.type="text",o.name="media-alt",o.placeholder="Alt tekst",o.className="border border-secondary rounded-md p-2 w-full sm:w-auto sm:flex-1 focus:ring-2 focus:ring-secondary focus:outline-none";const i=document.createElement("button");i.type="button",i.textContent="Fjern",i.className="text-red-500 hover:underline",i.addEventListener("click",()=>{e.removeChild(t)}),t.appendChild(n),t.appendChild(o),t.appendChild(i),e.appendChild(t)}),document.getElementById("edit-listing-form").addEventListener("submit",async e=>{e.preventDefault();const t=e.target,n=t.querySelectorAll(".image-field"),o=Array.from(n).map(r=>{const u=r.querySelector("input[name='media-url']").value.trim(),m=r.querySelector("input[name='media-alt']").value.trim();return{url:u,alt:m||void 0}}).filter(r=>r.url),i={title:t.querySelector("#title").value.trim(),description:t.querySelector("#description").value.trim(),media:o};try{const r=await y(d,i);console.log("Updated Listing:",r),alert("Endringer lagret!"),window.location.href=`/annonse/?id=${r.data.id}`}catch(r){console.error("Error updating listing:",r),alert("Kunne ikke lagre endringene.")}})}catch(l){console.error("Error displaying edit listing form:",l),a.innerHTML="<p>Kunne ikke laste annonsen. Vennligst prøv igjen senere.</p>"}}const x=new URLSearchParams(window.location.search),c=x.get("id");c?b(c):(console.error("Error: No listing ID found in the URL."),document.getElementById("edit-listing-container").innerHTML="<p>Kunne ikke finne annonsen. Vennligst prøv igjen senere.</p>");
