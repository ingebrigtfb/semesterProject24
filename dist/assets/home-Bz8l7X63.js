import{A as m}from"./constants-Cio_5RR6.js";async function f(){try{const e=new URL(m);e.searchParams.append("_active","true"),e.searchParams.append("_bids","true"),e.searchParams.append("_seller","true"),e.searchParams.append("sort","created"),e.searchParams.append("sortOrder","desc");const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch listings: ${t.statusText}`);return await t.json()}catch(e){throw console.error("Error in fetchAllListings:",e),e}}async function g(e){try{const t=new URL(m);t.searchParams.append("title",e),t.searchParams.append("_active","true"),t.searchParams.append("_bids","true"),t.searchParams.append("_seller","true"),t.searchParams.append("sort","created"),t.searchParams.append("sortOrder","desc");const a=await fetch(t);if(!a.ok)throw new Error(`Failed to fetch search results: ${a.statusText}`);return await a.json()}catch(t){throw console.error("Error in searchListings:",t),t}}async function w(){const e=document.getElementById("posts-container"),t=document.getElementById("search-bar");if(!e||!t){console.error("Error: Required DOM elements not found.");return}async function a(s=""){console.log("Search query:",s),e.innerHTML='<p class=" flex justify-center">Laster annonser...</p>';try{const n=s?await g(s):await f();console.log("API Response:",n);const i=n.data;if(!i||i.length===0){e.innerHTML=`<p>No listings found for "${s}".</p>`;return}const p=s?i.filter(r=>r.title.toLowerCase().includes(s.toLowerCase())):i;if(p.length===0){e.innerHTML=`<p>Ingen søk på "${s}".</p>`;return}const u=p.sort((r,l)=>{const d=r.title.toLowerCase(),o=l.title.toLowerCase(),c=s.toLowerCase();return d===c?-1:o===c?1:0});e.className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6 max-w-[1400px] m-auto",e.innerHTML="",u.forEach(r=>{const l=r.bids?r.bids.reduce((c,h)=>c+(h.amount||0),0):0,d=r.media&&r.media.length>0?`<img src="${r.media[0].url}" alt="${r.media[0].alt||"Listing Image"}" class="w-full h-64 object-cover rounded-t-lg">`:'<div class="w-full h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">No Image</div>',o=document.createElement("a");o.href=`/annonse/?id=${r.id}`,o.className="bg-white shadow-md rounded-lg flex flex-col hover:shadow-lg transition-shadow duration-300",o.innerHTML=`
          <div class="relative">
            ${d}
          </div>
          <div class="p-4 flex flex-col justify-between flex-grow">
            <h2 class="text-lg font-bold mb-2 line-clamp-3">${r.title}</h2>
            <p class="text-sm text-gray-600 mb-4 line-clamp-3">${r.description||""}</p>
            <div class="flex items-center justify-between">
              <button class="bg-secondary text-white text-sm font-medium px-4 py-2 rounded hover:bg-grey-700">
                GI BUD
              </button>
              <p class="text-sm font-medium text-gray-700">Total Bud: ${l} NOK</p>
            </div>
          </div>
        `,e.appendChild(o)})}catch(n){console.error("Error displaying listings:",n),e.innerHTML="<p>Failed to load listings. Please try again later.</p>"}}await a(),t.addEventListener("input",s=>{const n=s.target.value.trim();a(n)})}w();