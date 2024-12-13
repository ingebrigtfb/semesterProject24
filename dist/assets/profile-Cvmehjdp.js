import{e as g}from"./constants-CL3gOxZ7.js";import{h as u}from"./headers-D2xKkvkn.js";async function h(o){const t=localStorage.getItem("token");if(!t)throw new Error("No auth token found. Please log in.");const n=new URL(`${g}/auction/profiles/${o}`);n.searchParams.append("_listings","true"),console.log("Fetching Profile with URL:",n);try{const e=await fetch(n,{headers:u(t)});if(console.log("Response Status:",e.status,e.statusText),!e.ok){const i=await e.text();throw console.error("Server Response:",e.status,e.statusText,i),new Error(`Failed to fetch profile: ${e.status} ${e.statusText} - ${i||"No details"}`)}return await e.json()}catch(e){throw console.error("Error in fetchProfile:",e),e}}async function v(o){const t=localStorage.getItem("token");if(!t)throw new Error("No auth token found. Please log in.");const n=`${g}/auction/listings/${o}`;try{const e=await fetch(n,{method:"DELETE",headers:u(t)});if(!e.ok){const a=await e.json();throw console.error("Server Response:",a),new Error(`Failed to delete listing: ${a.message||"Unknown error"}`)}return console.log(`Listing ${o} deleted successfully.`),!0}catch(e){throw console.error("Error in deleteListing:",e),e}}async function f(){var e,a,i;const o=document.getElementById("profile-container"),t=document.getElementById("user-listings");if(!o){console.error("Error: #profile-container element not found in DOM.");return}if(!t){console.error("Error: #user-listings element not found in DOM.");return}const n=localStorage.getItem("userName");if(!n){o.innerHTML="<p>No username found. Please log in.</p>",t.innerHTML="<p>Log in to view your listings.</p>";return}try{const l=await h(n);console.log("Fetched Profile Data:",l);const s=l.data,c=s.listings||[];o.innerHTML=`
      <div class="profile rounded-md p-4 flex flex-col items-center max-w-lg m-auto">
        <div class="avatar mt-4">
          <img src="${(e=s.avatar)==null?void 0:e.url}" alt="${((a=s.avatar)==null?void 0:a.alt)||"Avatar"}" class="rounded-full w-20 h-20">
        </div>
        <a href="/oppdater-profil/" class="text-gray-600 mt-2">Rediger profil</a>
        <h1 class="text-2xl font-medium mb-4">${s.name}</h1>
        <p class="text-gray-700 mb-2"><strong>Bio:</strong> ${s.bio||""}</p>
        <p class="text-gray-700 mb-2"><strong>Antall annonser:</strong> ${c.length}</p>
        <p class="text-gray-700 mb-2"><strong>Annonser du har vunnet:</strong> ${((i=s._count)==null?void 0:i.wins)||0}</p>
        <p class="text-gray-700 mb-2"><strong>Kreditt:</strong> ${s.credits||0}</p>
      </div>
    `,c.length===0?t.innerHTML="<p>Du har ikke lagt ut noen annonser</p>":t.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${c.map(r=>`
            <div class="listing bg-white shadow-md rounded-lg overflow-hidden block">
              <div class="relative">
                ${r.media&&r.media.length>0?`<img src="${r.media[0].url}" alt="${r.media[0].alt||"Listing Image"}" class="w-full h-48 object-cover">`:'<div class="w-full h-48 bg-gray-200 flex items-center justify-center">No Image</div>'}
              </div>
              <div class="p-4 flex flex-col gap-2">
                <h3 class="text-lg font-medium">${r.title}</h3>
                <p class="text-gray-700 line-clamp-2">${r.description||""}</p>
                <div class="flex items-center justify-between mt-4">
                  <a href="/annonse/?id=${r.id}" class="text-black font-medium">GI BUD</a>
                  <div class="flex items-center gap-4">
                    <a href="/rediger/?id=${r.id}" class="text-blue-500 hover:underline">ENDRE</a>
                    <a href="#" data-id="${r.id}" class="text-red-500 hover:underline delete-listing">SLETT</a>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      `,document.querySelectorAll(".delete-listing").forEach(r=>{r.addEventListener("click",async d=>{d.preventDefault();const m=d.target.dataset.id;if(confirm("Er du sikker på at du vil slette denne annonsen?"))try{await v(m),alert("Annonse slettet."),f()}catch(p){alert(`Failed to delete listing: ${p.message}`)}})})}catch(l){console.error("Error displaying profile details:",l),o.innerHTML="<p>Failed to load profile details. Please try again later.</p>",t.innerHTML="<p>Failed to load your listings. Please try again later.</p>"}}function w(){localStorage.token||(alert("Du må være innlogget for å se denne siden"),window.location.href="/auth/login/")}w();f();
