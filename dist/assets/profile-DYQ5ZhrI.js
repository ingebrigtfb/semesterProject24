import{d as f}from"./constants-Cio_5RR6.js";import{h as g}from"./headers-7jRSljoY.js";async function h(s){const n=localStorage.getItem("token");if(!n)throw new Error("No auth token found. Please log in.");const a=new URL(`${f}/auction/profiles/${s}`);a.searchParams.append("_listings","true"),a.searchParams.append("_wins","true");try{const t=await fetch(a,{headers:g(n)});if(!t.ok){const i=await t.text();throw console.error("Server Response:",t.status,t.statusText,i),new Error(`Failed to fetch profile: ${t.status} ${t.statusText} - ${i||"No details"}`)}const r=await t.json();if(!r)throw new Error("No profile data returned by API.");return r}catch(t){throw console.error("Error in fetchProfile:",t),t}}async function p(s){const n=localStorage.getItem("token");if(!n)throw new Error("No auth token found. Please log in.");const a=`${f}/auction/listings/${s}`;try{const t=await fetch(a,{method:"DELETE",headers:g(n)});if(!t.ok){const r=await t.json();throw console.error("Server Response:",r),new Error(`Failed to delete listing: ${r.message||"Unknown error"}`)}return console.log(`Listing ${s} deleted successfully.`),!0}catch(t){throw console.error("Error in deleteListing:",t),t}}async function u(){const s=document.getElementById("profile-container"),n=document.getElementById("user-listings");if(!s||!n){console.error("Error: Required DOM elements not found.");return}s.innerHTML=`<div class="flex justify-center items-center h-48">
      <div class="loader border-t-4 border-secondary border-solid rounded-full w-8 h-8 animate-spin"></div>
    </div>`,n.innerHTML='<p class="text-center">Laster innhold...</p>';const a=localStorage.getItem("userName");if(!a){s.innerHTML="<p>Ingen brukernavn funnet, vennligst logg inn.</p>",n.innerHTML="<p>Logg inn for å se.</p>";return}try{const r=(await h(a)).data,i=r.listings||[],l=new Date,o=i.filter(e=>new Date(e.endsAt)>l),d=i.filter(e=>new Date(e.endsAt)<=l);s.innerHTML=`
    <div class="relative">
      <div class="relative">
        ${r.banner?`
              <img 
                src="${r.banner.url}" 
                alt="Profile Banner" 
                class="w-full h-48 object-cover rounded-lg"
              >
              <div class="absolute inset-0 bg-white bg-opacity-50 rounded-lg"></div>
            `:'<div class="w-full h-48 flex items-center justify-center text-gray-500"></div>'}
      </div>
      <div class="profile-info inset-x-0 transform -translate-y-1/4 flex flex-col items-center">
        <div class="avatar w-24 h-24 rounded-full border-4 border-secondary overflow-hidden flex items-center justify-center bg-gray-200">
          <img 
            src="${r.avatar?.url}" 
            alt="${r.avatar?.alt||"Avatar"}" 
            class="w-full h-full object-cover"
          >
        </div>
        <a href="/oppdater-profil/" class="text-gray-600 mt-4">Rediger profil</a>
        <h1 class="text-2xl font-medium mt-4">${r.name}</h1>
        
        <div class="flex flex-col mt-6">
          <p class="text-gray-700 mt-4 break-words break-all whitespace-normal"><strong>Bio:</strong> ${r.bio||""}</p>
          <p class="text-gray-700 mt-2"><strong>Antall annonser lagd:</strong> ${i.length}</p>
          <p class="text-gray-700 mt-2"><strong>Antall annonser vunnet:</strong> ${r._count?.wins||0}</p>
          <p class="text-gray-700 mt-2"><strong>Kreditt:</strong> ${r.credits||0}</p>
        </div>
      </div>
    </div>
  `,n.innerHTML=`
    <div class="section mb-8">
      <h2 class="text-xl font-medium mb-4">Annonser jeg har vunnet</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${r.wins&&r.wins.length>0?r.wins.map(e=>`
              <div class="listing bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
                <div class="relative">
                  ${e.media&&e.media.length>0?`<img src="${e.media[0].url}" alt="${e.media[0].alt||"Annonse bilde"}" class="w-full h-48 object-cover">`:'<div class="w-full h-48 bg-gray-200 flex items-center justify-center">Ingen bilde</div>'}
                </div>
                <div class="p-4 flex flex-col flex-grow">
                  <h3 class="text-lg font-medium">${e.title}</h3>
                  <p class="text-gray-700 line-clamp-2">${e.description||"Bio:"}</p>
                </div>
                <div class="mt-auto p-4 flex justify-between">
                  <a href="/annonse/?id=${e.id}" class="text-secondary font-medium hover:underline">SE ANNONSE</a>
                </div>
              </div>
            `).join(""):"<p>Du har ikke vunnet noen annonser enda.</p>"}
      </div>
    </div>
  
       <div class="section mb-8">
  <h2 class="text-xl font-medium mb-4">Aktive annonser</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    ${o.length>0?o.map(e=>`
          <div class="listing bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
            <div class="relative">
              ${e.media&&e.media.length>0?`<img src="${e.media[0].url}" alt="${e.media[0].alt||"Annonse bilde"}" class="w-full h-48 object-cover">`:'<div class="w-full h-48 bg-gray-200 flex items-center justify-center">Ingen bilde</div>'}
            </div>
            <div class="p-4 flex flex-col flex-grow">
              <h3 class="text-lg font-medium">${e.title}</h3>
              <p class="text-gray-700 line-clamp-2">${e.description||"Bio:"}</p>
            </div>
            <div class="mt-auto p-4 flex justify-between">
              <a href="/annonse/?id=${e.id}" class="text-secondary font-medium hover:underline">SE ANNONSE</a>
              <div class="flex gap-4">
                <a href="/rediger/?id=${e.id}" class="text-secondary hover:underline">ENDRE</a>
                <a href="#" data-id="${e.id}" class="text-red-500 hover:underline delete-listing">SLETT</a>
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
          <div class="listing bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
            <div class="relative">
              ${e.media&&e.media.length>0?`<img src="${e.media[0].url}" alt="${e.media[0].alt||"Annonse bilde"}" class="w-full h-48 object-cover">`:'<div class="w-full h-48 bg-gray-200 flex items-center justify-center">Ingen bilde</div>'}
            </div>
            <div class="p-4 flex flex-col flex-grow">
              <h3 class="text-lg font-medium">${e.title}</h3>
              <p class="text-gray-700 line-clamp-2">${e.description||""}</p>
            </div>
            <div class="mt-auto p-4 flex justify-between">
              <a href="/annonse/?id=${e.id}" class="text-secondary font-medium hover:underline">SE ANNONSE</a>
              <div class="flex gap-4">
                <a href="/rediger/?id=${e.id}" class="text-secondary hover:underline">ENDRE</a>
                <a href="#" data-id="${e.id}" class="text-red-500 hover:underline delete-listing">SLETT</a>
              </div>
            </div>
          </div>
        `).join(""):"<p>Ingen utgåtte annonser.</p>"}
  </div>
</div>
      `,document.querySelectorAll(".delete-listing").forEach(e=>{e.addEventListener("click",async c=>{c.preventDefault();const v=c.target.dataset.id;if(confirm("Er du sikker på at du vil slette denne annonsen?"))try{await p(v),alert("Annonse slettet."),u()}catch(m){alert(`Failed to delete listing: ${m.message}`)}})})}catch(t){console.error("Error displaying profile details:",t),s.innerHTML="<p>Failed to load profile details. Please try again later.</p>",n.innerHTML="<p>Failed to load your listings. Please try again later.</p>"}}function x(){localStorage.token||(alert("Du må være innlogget for å se denne siden"),window.location.href="/auth/login/")}x();u();
