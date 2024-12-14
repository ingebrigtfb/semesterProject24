import{d as l}from"./constants-Cio_5RR6.js";import{h as c}from"./headers-7jRSljoY.js";async function f(n){const t=localStorage.getItem("token");if(!t)throw new Error("No auth token found. Please log in.");const s=new URL(`${l}/auction/profiles/${n}`);s.searchParams.append("_listings","true"),console.log("Fetching Profile with URL:",s);try{const e=await fetch(s,{headers:c(t)});if(console.log("Response Status:",e.status,e.statusText),!e.ok){const a=await e.text();throw console.error("Server Response:",e.status,e.statusText,a),new Error(`Failed to fetch profile: ${e.status} ${e.statusText} - ${a||"No details"}`)}return await e.json()}catch(e){throw console.error("Error in fetchProfile:",e),e}}async function m(n){const t=localStorage.getItem("token");if(!t)throw new Error("No auth token found. Please log in.");const s=`${l}/auction/listings/${n}`;try{const e=await fetch(s,{method:"DELETE",headers:c(t)});if(!e.ok){const r=await e.json();throw console.error("Server Response:",r),new Error(`Failed to delete listing: ${r.message||"Unknown error"}`)}return console.log(`Listing ${n} deleted successfully.`),!0}catch(e){throw console.error("Error in deleteListing:",e),e}}async function d(){const n=document.getElementById("profile-container"),t=document.getElementById("user-listings");if(!n){console.error("Error: #profile-container element not found in DOM.");return}if(!t){console.error("Error: #user-listings element not found in DOM.");return}const s=localStorage.getItem("userName");if(!s){n.innerHTML="<p>No username found. Please log in.</p>",t.innerHTML="<p>Log in to view your listings.</p>";return}try{const e=await f(s);console.log("Fetched Profile Data:",e);const r=e.data,a=r.listings||[];n.innerHTML=`
      <div class="profile rounded-md p-4 flex flex-col items-center max-w-lg m-auto">
        <div class="avatar mt-4">
          <img src="${r.avatar?.url}" alt="${r.avatar?.alt||"Avatar"}" class="rounded-full w-20 h-20">
        </div>
        <a href="/oppdater-profil/" class="text-gray-600 mt-2">Rediger profil</a>
        <h1 class="text-2xl font-medium mb-4">${r.name}</h1>
        <p class="text-gray-700 mb-2"><strong>Bio:</strong> ${r.bio||""}</p>
        <p class="text-gray-700 mb-2"><strong>Antall annonser:</strong> ${a.length}</p>
        <p class="text-gray-700 mb-2"><strong>Annonser du har vunnet:</strong> ${r._count?.wins||0}</p>
        <p class="text-gray-700 mb-2"><strong>Kreditt:</strong> ${r.credits||0}</p>
      </div>
    `,a.length===0?t.innerHTML="<p>Du har ikke lagt ut noen annonser</p>":t.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${a.map(o=>`
            <div class="listing bg-white shadow-md rounded-lg overflow-hidden block">
              <div class="relative">
                ${o.media&&o.media.length>0?`<img src="${o.media[0].url}" alt="${o.media[0].alt||"Listing Image"}" class="w-full h-48 object-cover">`:'<div class="w-full h-48 bg-gray-200 flex items-center justify-center">No Image</div>'}
              </div>
              <div class="p-4 flex flex-col gap-2">
                <h3 class="text-lg font-medium">${o.title}</h3>
                <p class="text-gray-700 line-clamp-2">${o.description||""}</p>
                <div class="flex items-center justify-between mt-4">
                  <a href="/annonse/?id=${o.id}" class="text-black font-medium">GI BUD</a>
                  <div class="flex items-center gap-4">
                    <a href="/rediger/?id=${o.id}" class="text-blue-500 hover:underline">ENDRE</a>
                    <a href="#" data-id="${o.id}" class="text-red-500 hover:underline delete-listing">SLETT</a>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      `,document.querySelectorAll(".delete-listing").forEach(o=>{o.addEventListener("click",async i=>{i.preventDefault();const g=i.target.dataset.id;if(confirm("Er du sikker på at du vil slette denne annonsen?"))try{await m(g),alert("Annonse slettet."),d()}catch(u){alert(`Failed to delete listing: ${u.message}`)}})})}catch(e){console.error("Error displaying profile details:",e),n.innerHTML="<p>Failed to load profile details. Please try again later.</p>",t.innerHTML="<p>Failed to load your listings. Please try again later.</p>"}}function p(){localStorage.token||(alert("Du må være innlogget for å se denne siden"),window.location.href="/auth/login/")}p();d();
