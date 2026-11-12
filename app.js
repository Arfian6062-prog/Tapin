(() => {
 const slug=new URLSearchParams(location.search).get("r")||"ruang-rasa";
 const r=RESTAURANTS[slug]||RESTAURANTS["ruang-rasa"],$=id=>document.getElementById(id);
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const wa=msg=>`https://wa.me/${String(r.whatsappNumber||"").replace(/\\D/g,"")}?text=${encodeURIComponent(msg)}`;
 const toast=msg=>{$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2300)};
 document.title=`${r.name} | TAPDINE`;
 $("restaurant-name").textContent=r.name;$("tagline").textContent=r.tagline;$("category").textContent=r.category;
 $("address-short").textContent=r.address;$("avatar").textContent=r.name.trim()[0].toUpperCase();
 // Identitas penyedia layanan TAPDINE
 $("provider-name").textContent=PROVIDER.name;
 $("provider-role").textContent=`${PROVIDER.role} • ${PROVIDER.founder}`;
 $("provider-description").textContent=PROVIDER.description;
 $("provider-credit").textContent=`Dibuat dan dikelola oleh ${PROVIDER.founder}.`;
 const providerNumber=String(PROVIDER.whatsappNumber||"").replace(/\D/g,"");
 const providerContact=$("provider-contact");
 if(providerNumber){providerContact.href=`https://wa.me/${providerNumber}?text=${encodeURIComponent("Halo TAPDINE, saya tertarik menggunakan layanan untuk restoran saya.")}`;}
 else if(PROVIDER.email){providerContact.href=`mailto:${PROVIDER.email}?subject=${encodeURIComponent("Informasi layanan TAPDINE")}`;}
 else if(PROVIDER.instagram){providerContact.href=PROVIDER.instagram;}
 else {providerContact.href="#";providerContact.onclick=e=>{e.preventDefault();toast("Kontak resmi TAPDINE belum diatur.")};}

 $("cover").style.backgroundImage=`url("${r.coverImage}")`;$("open-label").textContent=r.serviceHours;$("closing-name").textContent=r.name.toUpperCase();
 $("review-link").href=r.googleReviewUrl||"#";$("review-link").onclick=e=>{if(!r.googleReviewUrl||r.googleReviewUrl.includes("REPLACE_")){e.preventDefault();toast("Link Google Review belum diatur.");}};
 $("wa-link").href=wa(r.whatsappMessage||`Halo ${r.name}, saya ingin bertanya.`);
 $("maps-link").href=r.mapsUrl||"#";$("menu-link").onclick=e=>{e.preventDefault();openMenu()};
 $("feedback-open").onclick=openFeedback;$("promo-open").onclick=()=>modal("✦","SPECIAL FOR YOU",r.promoTitle,r.promoDescription,`<a class="modal-btn" href="${wa("Halo "+r.name+", boleh info promo yang tersedia?")}" target="_blank">TANYAKAN PROMO VIA WHATSAPP ↗</a>`);
 const socials=[["Instagram",r.instagram,"◎"],["TikTok",r.tiktok,"♪"],["Facebook",r.facebook,"f"]];
 $("social-links").innerHTML=socials.filter(x=>x[1]&&!x[1].endsWith("instagram.com/")&&!x[1].endsWith("tiktok.com/")).map(x=>`<a class="social-link" href="${esc(x[1])}" target="_blank" rel="noopener"><span>${x[2]}</span>${x[0]} ↗</a>`).join("")||"<small>Media sosial akan segera hadir.</small>";
 $("share-btn").onclick=async()=>{try{if(navigator.share)await navigator.share({title:r.name,url:location.href});else{await navigator.clipboard.writeText(location.href);toast("Link berhasil disalin!")}}catch(e){}};
 function modal(symbol,kicker,title,desc,html){$("symbol").textContent=symbol;$("kicker").textContent=kicker;$("modal-title").textContent=title;$("modal-desc").textContent=desc;$("modal-content").innerHTML=html;$("backdrop").hidden=false}
 function close(){ $("backdrop").hidden=true } $("close").onclick=close;$("backdrop").onclick=e=>{if(e.target===$("backdrop"))close()};document.onkeydown=e=>{if(e.key==="Escape")close()};
 function openMenu(){if(r.menuUrl){window.open(r.menuUrl,"_blank","noopener");return}const html=(r.menu||[]).map(g=>`<div class="menu-group"><h4>${esc(g.category)}</h4>${g.items.map(i=>`<div class="menu-item"><div><b>${esc(i.name)}</b><p>${esc(i.description)}</p></div><span class="menu-price">${esc(i.price)}</span></div>`).join("")}</div>`).join("");modal("☷","DIGITAL MENU","Menu pilihan kami","Pilihan menu restoran.",html||"<p>Menu sedang diperbarui.</p>")}
 function openFeedback(){modal("✳","YOUR VOICE MATTERS","Bagaimana pengalamanmu?","Semua masukan diterima. Google Review juga selalu tersedia di halaman utama.",`<div class="rating-row">${[1,2,3,4,5].map(n=>`<button class="rating-btn" data-rating="${n}">★</button>`).join("")}</div><textarea class="field" id="feedback-message" rows="3" placeholder="Ceritakan pengalaman atau saranmu..."></textarea><button class="modal-btn" id="send-feedback">KIRIM MASUKAN VIA WHATSAPP</button><a class="modal-btn secondary" href="${esc(r.googleReviewUrl||"#")}" target="_blank" rel="noopener">ATAU TULIS GOOGLE REVIEW ↗</a>`);let rating=0;document.querySelectorAll(".rating-btn").forEach(b=>b.onclick=()=>{rating=+b.dataset.rating;document.querySelectorAll(".rating-btn").forEach(x=>x.classList.toggle("selected",+x.dataset.rating<=rating))});$("send-feedback").onclick=()=>{const msg=`Halo ${r.name}, masukan saya. Rating: ${rating?rating+"/5":"tidak diisi"}. Pesan: ${$("feedback-message").value.trim()||"-"}`;if(!r.whatsappNumber){toast("Nomor WhatsApp belum diatur.");return}window.open(wa(msg),"_blank","noopener");close()}}
})();