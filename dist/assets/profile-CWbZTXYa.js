import{d as g}from"./constants-Cio_5RR6.js";import{h as f}from"./headers-7jRSljoY.js";async function v(a){const r=localStorage.getItem("token");if(!r)throw new Error("No auth token found. Please log in.");const n=new URL(`${g}/auction/profiles/${a}`);n.searchParams.append("_listings","true"),console.log("Fetching Profile with URL:",n);try{const t=await fetch(n,{headers:f(r)});if(console.log("Response Status:",t.status,t.statusText),!t.ok){const i=await t.text();throw console.error("Server Response:",t.status,t.statusText,i),new Error(`Failed to fetch profile: ${t.status} ${t.statusText} - ${i||"No details"}`)}return await t.json()}catch(t){throw console.error("Error in fetchProfile:",t),t}}async function p(a){const r=localStorage.getItem("token");if(!r)throw new Error("No auth token found. Please log in.");const n=`${g}/auction/listings/${a}`;try{const t=await fetch(n,{method:"DELETE",headers:f(r)});if(!t.ok){const s=await t.json();throw console.error("Server Response:",s),new Error(`Failed to delete listing: ${s.message||"Unknown error"}`)}return console.log(`Listing ${a} deleted successfully.`),!0}catch(t){throw console.error("Error in deleteListing:",t),t}}async function m(){const a=document.getElementById("profile-container"),r=document.getElementById("user-listings");if(!a){console.error("Error: #profile-container element not found in DOM.");return}if(!r){console.error("Error: #user-listings element not found in DOM.");return}const n=localStorage.getItem("userName");if(!n){a.innerHTML="<p>No username found. Please log in.</p>",r.innerHTML="<p>Log in to view your listings.</p>";return}try{const t=await v(n);console.log("Fetched Profile Data:",t);const s=t.data,i=s.listings||[],o=new Date,l=i.filter(e=>new Date(e.endsAt)>o),d=i.filter(e=>new Date(e.endsAt)<=o);a.innerHTML=`
    <div class="relative">
      <div class="relative">
        ${s.banner?`
              <img 
                src="${s.banner.url}" 
                alt="Profile Banner" 
                class="w-full h-48 object-cover rounded-lg"
              >
              <div class="absolute inset-0 bg-white bg-opacity-50 rounded-lg"></div>
            `:'<div class="w-full h-48 flex items-center justify-center text-gray-500"></div>'}
      </div>
      <div class="profile-info inset-x-0 transform -translate-y-1/4 flex flex-col items-center">
        <div class="avatar w-24 h-24 rounded-full border-4 border-secondary overflow-hidden flex items-center justify-center bg-gray-200">
          <img 
            src="${s.avatar?.url}" 
            alt="${s.avatar?.alt||"Avatar"}" 
            class="w-full h-full object-cover"
          >
        </div>
        <a href="/oppdater-profil/" class="text-gray-600 mt-4">Rediger profil</a>
        <h1 class="text-2xl font-medium mt-4">${s.name}</h1>
        
        <div class="flex flex-col mt-6">
          <p class="text-gray-700 mt-4"><strong>Bio:</strong> ${s.bio||""}</p>
          <p class="text-gray-700 mt-2"><strong>Antall annonser:</strong> ${i.length}</p>
          <p class="text-gray-700 mt-2"><strong>Annonser du har vunnet:</strong> ${s._count?.wins||0}</p>
          <p class="text-gray-700 mt-2"><strong>Kreditt:</strong> ${s.credits||0}</p>
        </div>
      </div>
    </div>
  `,r.innerHTML=`
        <div class="section mb-8">
          <h2 class="text-xl font-medium mb-4">Annonser jeg har vunnet</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${s.wins&&s.wins.length>0?s.wins.map(e=>`
                  <div class="listing bg-white shadow-md rounded-lg overflow-hidden block">
                    <div class="relative">
                      ${e.media&&e.media.length>0?`<img src="${e.media[0].url}" alt="${e.media[0].alt||"Listing Image"}" class="w-full h-48 object-cover">`:'<div class="w-full h-48 bg-gray-200 flex items-center justify-center">No Image</div>'}
                    </div>
                    <div class="p-4 flex flex-col gap-2">
                      <h3 class="text-lg font-medium">${e.title}</h3>
                      <p class="text-gray-700 line-clamp-2">${e.description||""}</p>
                      <a href="/annonse/?id=${e.id}" class="text-secondary font-medium mt-2">SE ANNONSE</a>
                    </div>
                  </div>
                `).join(""):"<p>Du har ikke vunnet noen annonser enda.</p>"}
          </div>
        </div>
  
        <div class="section mb-8">
          <h2 class="text-xl font-medium mb-4">Annonser jeg har lagt ut</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${l.length>0?l.map(e=>`
                  <div class="listing bg-white shadow-md rounded-lg overflow-hidden block">
                    <div class="relative">
                      ${e.media&&e.media.length>0?`<img src="${e.media[0].url}" alt="${e.media[0].alt||"Listing Image"}" class="w-full h-48 object-cover">`:'<div class="w-full h-48 bg-gray-200 flex items-center justify-center">No Image</div>'}
                    </div>
                    <div class="p-4 flex flex-col gap-2">
                      <h3 class="text-lg font-medium">${e.title}</h3>
                      <p class="text-gray-700 line-clamp-2">${e.description||""}</p>
                      <div class="flex items-center justify-between mt-4">
                        <a href="/annonse/?id=${e.id}" class="text-secondary font-medium">SE ANNONSE</a>
                        <div class="flex items-center gap-4">
                          <a href="/rediger/?id=${e.id}" class="text-secondary hover:underline">ENDRE</a>
                          <a href="#" data-id="${e.id}" class="text-red-500 hover:underline delete-listing">SLETT</a>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join(""):"<p>Du har ingen aktive annonser.</p>"}
          </div>
        </div>
  
        <div class="section">
          <h2 class="text-xl font-medium mb-4">Utgåtte Annonser</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${d.length>0?d.map(e=>`
                  <div class="listing bg-white shadow-md rounded-lg overflow-hidden block">
                    <div class="relative">
                      ${e.media&&e.media.length>0?`<img src="${e.media[0].url}" alt="${e.media[0].alt||"Listing Image"}" class="w-full h-48 object-cover">`:'<div class="w-full h-48 bg-gray-200 flex items-center justify-center">No Image</div>'}
                    </div>
                    <div class="p-4 flex flex-col gap-2">
                      <h3 class="text-lg font-medium">${e.title}</h3>
                      <p class="text-gray-700 line-clamp-2">${e.description||""}</p>
                      <div class="flex items-center justify-between mt-4">
                        <a href="/annonse/?id=${e.id}" class="text-secondary font-medium">SE ANNONSE</a>
                        <div class="flex items-center gap-4">
                          <a href="/rediger/?id=${e.id}" class="text-secondary hover:underline">ENDRE</a>
                          <a href="#" data-id="${e.id}" class="text-red-500 hover:underline delete-listing">SLETT</a>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join(""):"<p>Ingen utgåtte annonser.</p>"}
          </div>
        </div>
      `,document.querySelectorAll(".delete-listing").forEach(e=>{e.addEventListener("click",async c=>{c.preventDefault();const u=c.target.dataset.id;if(confirm("Er du sikker på at du vil slette denne annonsen?"))try{await p(u),alert("Annonse slettet."),m()}catch(h){alert(`Failed to delete listing: ${h.message}`)}})})}catch(t){console.error("Error displaying profile details:",t),a.innerHTML="<p>Failed to load profile details. Please try again later.</p>",r.innerHTML="<p>Failed to load your listings. Please try again later.</p>"}}function x(){localStorage.token||(alert("Du må være innlogget for å se denne siden"),window.location.href="/auth/login/")}x();m();
