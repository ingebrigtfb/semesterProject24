import{f as v}from"./singleListing-DEtMEmTg.js";import{A as w}from"./constants-Cio_5RR6.js";import{h as L}from"./headers-7jRSljoY.js";async function $(n,d){const r=localStorage.getItem("token");if(!r)throw new Error("No auth token found. Please log in.");try{const o=`${w}/${n}/bids`,t=await fetch(o,{method:"POST",headers:L(r),body:JSON.stringify({amount:d})});if(console.log("API Response:",t),!t.ok)throw new Error(`Failed to make bid: ${t.statusText}`);return await t.json()}catch(o){throw console.error("Error in makeBid:",o),o}}function I(n){const d=document.getElementById("countdown"),r=new Date(n);function o(){const e=r-new Date;if(e<=0){clearInterval(t),d.textContent="AUKSJONEN ER AVSLUTTET",d.classList.add("text-gray-500");return}const i=Math.floor(e/(1e3*60*60*24)),u=Math.floor(e/(1e3*60*60)%24),l=Math.floor(e/(1e3*60)%60),p=Math.floor(e/1e3%60);d.textContent=`Tid igjen: ${i>0?i+"d ":""}${u.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}:${p.toString().padStart(2,"0")}`}const t=setInterval(o,1e3);o()}function S(n){const d=document.getElementById("carousel-images"),r=document.getElementById("prev-button"),o=document.getElementById("next-button");let t=0,c;const e=()=>{const l=t*-100;d.style.transform=`translateX(${l}%)`},i=()=>{c=setInterval(()=>{t=(t+1)%n,e()},3e3)},u=()=>{clearInterval(c)};r.addEventListener("click",()=>{u(),t=(t-1+n)%n,e(),i()}),o.addEventListener("click",()=>{u(),t=(t+1)%n,e(),i()}),i(),e()}async function k(){const n=document.getElementById("listing-container");if(!n){console.error("Error: Listing container not found.");return}n.innerHTML=`<div class="flex justify-center items-center h-48">Laster innhold
      <div class="loader border-t-4 border-secondary border-solid rounded-full w-8 h-8 animate-spin"></div>
    </div>`;const r=new URLSearchParams(window.location.search).get("id");console.log("Listing ID:",r);try{const t=(await v(r)).data;if(console.log("Fetched Listing Data:",t),!t){n.innerHTML="<p>Annonse ble ikke funnet.</p>";return}const c=t.endsAt?new Date(t.endsAt).toLocaleString():"No end date provided",e=t.bids?.length?t.bids.sort((a,g)=>g.amount-a.amount):[],i=e.length>0?e[0].amount:0,u=t.seller?.name||"Ukjent selger";let l="";t.media&&t.media.length>0?t.media.length===1?l=`
            <div class="w-full aspect-w-16 aspect-h-9">
              <img 
                src="${t.media[0].url}" 
                alt="${t.media[0].alt||""}" 
                class="w-full h-full max-h-[500px] object-cover rounded-lg"
              >
            </div>`:l=`
            <div class="carousel relative w-full overflow-hidden">
              <div id="carousel-images" class="flex transition-transform duration-500 ease-in-out">
                ${t.media.map(a=>`
                  <div class="w-full aspect-w-16 aspect-h-9 flex-shrink-0">
                    <img 
                      src="${a.url}" 
                      alt="${a.alt||"Listing Image"}" 
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
            </div>`:l="<p>Ingen bilder.</p>";const p=e.length?e.map((a,g)=>`
      <div class="bidder flex items-center justify-between border-b border-gray-300 py-2">
        <p class="text-sm text-secondary">
          <strong>#${g+1}. ${a.bidder?.name||"Anonym"}</strong>
        </p>
        <p class="text-sm text-gray-600">${a.amount} NOK</p>
      </div>
    `).join(""):'<p class="text-gray-500">Ingen bud enda.</p>',h=t.endsAt?'<p id="countdown" class="text-lg font-bold text-red-500"></p>':'<p class="text-gray-500">Ingen sluttid lagt inn.</p>',y=`
        <div class="bid-form-container mt-6">
          <p class="mb-2"><strong>Høyeste bud:</strong> ${i} NOK</p>
          <form id="bid-form" class="flex flex-col gap-4">
            <input 
              type="number" 
              id="bid-amount" 
              placeholder="Legg inn bud (NOK)" 
              class="w-full border border-secondary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" 
            />
            <button 
              type="submit" 
              class="bg-secondary text-white font-medium px-4 py-2 rounded w-[100px]">
              Gi bud
            </button>
          </form>
          <p id="bid-message" class="mt-4 hidden"></p>
        </div>
      `;n.innerHTML=`
      <div class="listing bg-containers shadow-md rounded-lg p-4">
        <h1 class="text-2xl font-medium mb-4">${t.title||""}</h1>
        ${l}
        <div class="flex justify-end mt-4">
          <p class="text-gray-700 text-sm"><strong>Opprettet av:</strong> ${u}</p>
        </div>
        <p class="text-gray-700 mt-4 mb-4"><strong>Beskrivelse:</strong> ${t.description||""}</p>
        <p class="text-gray-700 mb-4"><strong>Opprettet:</strong> ${new Date(t.created).toLocaleString("no-NO",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
        <p class="text-gray-700 mb-4"><strong>Oppdatert:</strong> ${new Date(t.updated).toLocaleString("no-NO",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
        <p class="text-gray-700 mb-4"><strong>Slutter:</strong> ${c}</p>
        ${h}
        ${y}
        <div class="bidders-section mt-6">
          <h2 class="text-lg font-bold mb-4">Budgivere</h2>
          ${p}
        </div>
      </div>
    `,t.media&&t.media.length>1&&S(t.media.length),t.endsAt&&I(new Date(t.endsAt));const x=document.getElementById("bid-form"),f=document.getElementById("bid-amount"),s=document.getElementById("bid-message");x.addEventListener("submit",async a=>{a.preventDefault();const g=parseFloat(f.value),b=localStorage.getItem("token");if(!b){s.textContent="Du må logge inn for å by",s.classList.remove("hidden"),s.classList.add("text-red-600"),confirm("Du må logge inn for å by. Vil du bli omdirigert til innlogging?")&&(window.location.href="/auth/login/");return}if(g<=i){s.textContent="Ditt bud er for lavt",s.classList.remove("hidden"),s.classList.add("text-red-600");return}try{const m=await $(r,g,b);console.log("Bid successful:",m),s.textContent="Ditt bud er plassert!",s.classList.remove("hidden"),s.classList.add("text-green-500"),setTimeout(function(){window.location.reload(1)},5e3),f.value=""}catch(m){console.error("Error placing bid:",m),s.textContent="Kunne ikke plassere bud. Prøv igjen.",s.classList.remove("hidden"),s.classList.add("text-red-600")}})}catch(o){console.error("Error displaying listing details:",o),n.innerHTML="<p>Fikk ikke lastet inn annonse detaljer.</p>"}}k();
