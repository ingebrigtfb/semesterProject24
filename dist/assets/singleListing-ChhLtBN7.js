import{f as a}from"./singleListing-eEJRQNNy.js";import"./constants-CL3gOxZ7.js";async function r(){const e=document.getElementById("listing-container");if(!e){console.error("Error: Listing container not found.");return}const i=new URLSearchParams(window.location.search).get("id");console.log("Listing ID:",i);try{const t=(await a(i)).data;console.log("Fetched Listing Data:",t),console.log("Media Array:",t.media);let n="";t.media&&t.media.length>0?t.media.length===1?n=`
          <img 
            src="${t.media[0].url}" 
            alt="${t.media[0].alt||"Listing Image"}" 
            class="w-full h-auto rounded-lg"
          >`:n=`
          <div class="carousel relative w-full h-auto overflow-hidden">
            <div id="carousel-images" class="flex transition-transform duration-500 ease-in-out">
              ${t.media.map(s=>`
                <img 
                  src="${s.url}" 
                  alt="${s.alt||"Listing Image"}" 
                  class="w-full h-auto flex-shrink-0 rounded-lg"
                >
              `).join("")}
            </div>
            <button 
              id="prev-button" 
              class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center z-20">
              &lt;
            </button>
            <button 
              id="next-button" 
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center z-20">
              &gt;
            </button>
          </div>`:n="<p></p>",e.innerHTML=`
      <div class="listing bg-white shadow-md rounded-lg p-4">
        <h1 class="text-2xl font-bold mb-4">${t.title||"No Title"}</h1>
        ${n}
        <p class="text-gray-700 mb-2"><strong>Description:</strong> ${t.description||""}</p>
        <p class="text-gray-700"><strong>Updated:</strong> ${new Date(t.updated||"").toLocaleString()}</p>
      </div>
    `,t.media&&t.media.length>1&&d(t.media.length)}catch(o){console.error("Error displaying listing details:",o),e.innerHTML="<p>Failed to load listing details. Please try again later.</p>"}}function d(e){const l=document.getElementById("carousel-images"),i=document.getElementById("prev-button"),o=document.getElementById("next-button");let t=0;console.log("Total Images in Carousel:",e);const n=()=>{const s=t*-100;l.style.transform=`translateX(${s}%)`,console.log("Current Index:",t)};i.addEventListener("click",()=>{t=(t-1+e)%e,n()}),o.addEventListener("click",()=>{t=(t+1)%e,n()}),n()}r();
