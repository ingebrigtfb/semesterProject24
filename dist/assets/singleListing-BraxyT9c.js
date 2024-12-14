import{f as y}from"./singleListing-fIb1iqMv.js";import{A as w}from"./constants-Cio_5RR6.js";import{h as x}from"./headers-7jRSljoY.js";async function v(e,a){const i=localStorage.getItem("token");if(!i)throw new Error("No auth token found. Please log in.");try{const o=`${w}/${e}/bids`,t=await fetch(o,{method:"POST",headers:x(i),body:JSON.stringify({amount:a})});if(console.log("API Response:",t),!t.ok)throw new Error(`Failed to make bid: ${t.statusText}`);return await t.json()}catch(o){throw console.error("Error in makeBid:",o),o}}function L(e){const a=document.getElementById("countdown"),i=new Date(e);function o(){const n=i-new Date;if(n<=0){clearInterval(t),a.textContent="Auction has ended.",a.classList.add("text-gray-500");return}const d=Math.floor(n/(1e3*60*60*24)),r=Math.floor(n/(1e3*60*60)%24),u=Math.floor(n/(1e3*60)%60),f=Math.floor(n/1e3%60);a.textContent=`Tid igjen: ${d>0?d+"d ":""}${r.toString().padStart(2,"0")}:${u.toString().padStart(2,"0")}:${f.toString().padStart(2,"0")}`}const t=setInterval(o,1e3);o()}function I(e){const a=document.getElementById("carousel-images"),i=document.getElementById("prev-button"),o=document.getElementById("next-button");let t=0,l;const n=()=>{const u=t*-100;a.style.transform=`translateX(${u}%)`},d=()=>{l=setInterval(()=>{t=(t+1)%e,n()},3e3)},r=()=>{clearInterval(l)};i.addEventListener("click",()=>{r(),t=(t-1+e)%e,n(),d()}),o.addEventListener("click",()=>{r(),t=(t+1)%e,n(),d()}),d(),n()}async function $(){const e=document.getElementById("listing-container");if(!e){console.error("Error: Listing container not found.");return}const i=new URLSearchParams(window.location.search).get("id");console.log("Listing ID:",i);try{const t=(await y(i)).data;if(console.log("Fetched Listing Data:",t),!t){e.innerHTML="<p>Annonse ble ikke funnet.</p>";return}const l=t.endsAt?new Date(t.endsAt).toLocaleString():"No end date provided",n=t.bids?.length?t.bids.reduce((c,g)=>c+(g.amount||0),0):0,d=t.seller?.name||"Ukjent selger";let r="";t.media&&t.media.length>0?t.media.length===1?r=`
              <div class="w-full aspect-w-16 aspect-h-9">
                <img 
                  src="${t.media[0].url}" 
                  alt="${t.media[0].alt||""}" 
                  class="w-full h-full max-h-[500px] object-cover rounded-lg"
                >
              </div>`:r=`
              <div class="carousel relative w-full overflow-hidden">
                <div id="carousel-images" class="flex transition-transform duration-500 ease-in-out">
                  ${t.media.map(c=>`
                      <div class="w-full aspect-w-16 aspect-h-9 flex-shrink-0">
                        <img 
                          src="${c.url}" 
                          alt="${c.alt||"Listing Image"}" 
                          class="w-full h-full max-h-[500px] object-cover rounded-lg"
                        >
                      </div>`).join("")}
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
              </div>`:r="<p>Ingen bilder.</p>";const u=t.endsAt?'<p id="countdown" class="text-lg font-bold text-red-500"></p>':'<p class="text-gray-500">Ingen sluttid lagt inn.</p>',f=`
        <div class="bid-form-container mt-6">
          <p class="mb-2"><strong>Høyeste bud:</strong> ${n} NOK</p>
          <form id="bid-form" class="flex flex-col gap-4">
            <input 
              type="number" 
              id="bid-amount" 
              placeholder="Legg inn bud (NOK)" 
              class="w-full border border-secondary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" 
              required
            />
            <button 
              type="submit" 
              class="bg-secondary text-white font-medium px-4 py-2 rounded w-[100px]">
              Gi bud
            </button>
          </form>
          <p id="bid-message" class="mt-4 hidden"></p>
        </div>
      `;e.innerHTML=`
      <div class="listing bg-white shadow-md rounded-lg p-4">
        <h1 class="text-2xl font-medium mb-4">${t.title||""}</h1>
        ${r}
        <div class="flex justify-end mt-4">
          <p class="text-gray-700 text-sm"><strong>Opprettet av:</strong> ${d}</p>
        </div>
        <p class="text-gray-700 mt-4 mb-4"><strong>Beskrivelse:</strong> ${t.description||""}</p>
        <p class="text-gray-700 mb-4"><strong>Opprettet:</strong> ${new Date(t.created).toLocaleString("no-NO",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
        <p class="text-gray-700 mb-4"><strong>Oppdatert:</strong> ${new Date(t.updated).toLocaleString("no-NO",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
        <p class="text-gray-700 mb-4"><strong>Slutter:</strong> ${l}</p>
        ${u}
        ${f}
      </div>
    `,t.media&&t.media.length>1&&I(t.media.length),t.endsAt&&L(new Date(t.endsAt));const h=document.getElementById("bid-form"),p=document.getElementById("bid-amount"),s=document.getElementById("bid-message");h.addEventListener("submit",async c=>{c.preventDefault();const g=parseFloat(p.value),b=localStorage.getItem("token");if(!b){s.textContent="Du må logge inn for å by",s.classList.remove("hidden"),s.classList.add("text-red-600"),confirm("Du må logge inn for å by. Vil du bli omdirigert til innlogging?")&&(window.location.href="/auth/login/");return}if(g<=n){s.textContent="Ditt bud er for lavt",s.classList.remove("hidden"),s.classList.add("text-red-600");return}try{const m=await v(i,g,b);console.log("Bid successful:",m),s.textContent="Ditt bud er plassert!",s.classList.remove("hidden"),s.classList.add("text-green-500"),setTimeout(function(){window.location.reload(1)},5e3),p.value=""}catch(m){console.error("Error placing bid:",m),s.textContent="Kunne ikke plassere bud. Prøv igjen.",s.classList.remove("hidden"),s.classList.add("text-red-600")}})}catch(o){console.error("Error displaying listing details:",o),e.innerHTML="<p>Fikk ikke lastet inn annonse detaljer.</p>"}}$();
