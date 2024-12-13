import{b as c}from"./constants-CL3gOxZ7.js";async function d(){try{const e=new URL(c);e.searchParams.append("_active","true"),e.searchParams.append("_bids","true"),e.searchParams.append("_seller","true"),e.searchParams.append("sort","created"),e.searchParams.append("sortOrder","desc");const a=await fetch(e);if(!a.ok)throw new Error(`Failed to fetch listings: ${a.statusText}`);return await a.json()}catch(e){throw console.error("Error in fetchAllListings:",e),e}}async function m(){const e=document.getElementById("posts-container");if(!e){console.error("Error: posts-container element not found.");return}try{const s=(await d()).data;if(!s||s.length===0){e.innerHTML="<p>No listings available at the moment.</p>";return}e.className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6 max-w-[1400px] m-auto",s.forEach(t=>{const o=t.bids?t.bids.reduce((l,i)=>l+(i.amount||0),0):0,n=t.media&&t.media.length>0?`<img src="${t.media[0].url}" alt="${t.media[0].alt||"Listing Image"}" class="w-full h-64 object-cover rounded-t-lg">`:'<div class="w-full h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">No Image</div>',r=document.createElement("a");r.href=`/annonse/?id=${t.id}`,r.className="bg-white shadow-md rounded-lg flex flex-col hover:shadow-lg transition-shadow duration-300",r.innerHTML=`
        <div class="relative">
          ${n}
        </div>
        <div class="p-4 flex flex-col justify-between flex-grow">
          <h2 class="text-lg font-bold mb-2 line-clamp-3">${t.title}</h2>
          <p class="text-sm text-gray-600 mb-4 line-clamp-3">${t.description||"No description available"}</p>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600">
              GI BUD
            </button>
            <p class="text-sm font-medium text-gray-700">Total Bud: ${o} NOK</p>
          </div>
        </div>
      `,e.appendChild(r)})}catch(a){console.error("Error displaying posts:",a),e.innerHTML="<p>Failed to load listings. Please try again later.</p>"}}m();
