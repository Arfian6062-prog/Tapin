(() => {
 const slug=new URLSearchParams(location.search).get("r")||"ruang-rasa";
 const r=RESTAURANTS[slug]||RESTAURANTS["ruang-rasa"],$=id=>document.getElementById(id);
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const wa=msg=>`https://wa.me/${String(r.whatsappNumber||"").replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;
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
 const socials=[
  ["Instagram",r.instagram,'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="fill-dot"/></svg>'],
  ["TikTok",r.tiktok,'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.2a4.2 4.2 0 1 1-3.4-4.1M14 3c.5 3.2 2.4 5.1 5.5 5.5"/></svg>'],
  ["Facebook",r.facebook,'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.6 0-4.4 1.6-4.4 4.5v2.3H8v3.2h2.6v8z"/></svg>'],
  ["YouTube",r.youtube,'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10 9 5 3-5 3z" class="solid"/></svg>'],
  ["X",r.x,'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 16M20 4 4 20M4 4h4l12 16h-4z"/></svg>'],
  ["Threads",r.threads,'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 9.3c-.8-3.5-3-5.3-6.4-5.3-4.1 0-6.6 3-6.6 8s2.5 8 6.7 8c3.3 0 5.3-1.8 5.3-4.5 0-2.3-1.5-3.7-4-3.7-2.1 0-3.4 1-3.4 2.5 0 1.2.9 2 2.2 2 1.7 0 2.8-1.3 2.8-3.5 0-2.8-1.4-4.4-4-4.4"/></svg>'],
  ["Pinterest",r.pinterest,'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21a9 9 0 1 0-3.7-.8l1.4-5.8c.3.7 1.3 1.3 2.5 1.3 3.3 0 5.1-3 5.1-6 0-2.6-2.2-4.9-5.7-4.9-4.2 0-6.4 3-6.4 5.7 0 1.6.6 3 1.9 3.5.2.1.4 0 .5-.2l.2-.9c.1-.3.1-.4-.2-.7-.4-.5-.7-1.1-.7-2 0-2.5 1.9-4.7 4.9-4.7 2.7 0 4.2 1.6 4.2 3.8 0 2.9-1.3 5.3-3.2 5.3-1.1 0-1.9-.9-1.6-2l.7-2.8c.4-1.7-.2-2.5-1.3-2.5-1.4 0-2.5 1.5-2.5 3.4 0 1.2.4 2 .4 2l-1.6 6.6"/></svg>']
 ];
 $("social-links").innerHTML=socials.filter(x=>x[1]&&!/^https?:\/\/(www\.)?(instagram|tiktok|facebook|youtube|x|threads|pinterest)\.com\/?$/i.test(x[1])).map(x=>`<a class="social-link" href="${esc(x[1])}" target="_blank" rel="noopener" aria-label="Buka ${x[0]}">${x[2]}<span>${x[0]}</span><i>↗</i></a>`).join("")||"<small>Social links coming soon.</small>";
 $("share-btn").onclick=async()=>{try{if(navigator.share)await navigator.share({title:r.name,url:location.href});else{await navigator.clipboard.writeText(location.href);toast("Link berhasil disalin!")}}catch(e){}};
 function modal(symbol,kicker,title,desc,html){$("symbol").textContent=symbol;$("kicker").textContent=kicker;$("modal-title").textContent=title;$("modal-desc").textContent=desc;$("modal-content").innerHTML=html;$("backdrop").hidden=false}
 function close(){ $("backdrop").hidden=true } $("close").onclick=close;$("backdrop").onclick=e=>{if(e.target===$("backdrop"))close()};document.onkeydown=e=>{if(e.key==="Escape")close()};
 function openMenu(){if(r.menuUrl){window.open(r.menuUrl,"_blank","noopener");return}const html=(r.menu||[]).map(g=>`<div class="menu-group"><h4>${esc(g.category)}</h4>${g.items.map(i=>`<div class="menu-item"><div><b>${esc(i.name)}</b><p>${esc(i.description)}</p></div><span class="menu-price">${esc(i.price)}</span></div>`).join("")}</div>`).join("");modal("☷","DIGITAL MENU","Menu pilihan kami","Pilihan menu restoran.",html||"<p>Menu sedang diperbarui.</p>")}
 function openFeedback(){modal("✳","YOUR VOICE MATTERS","Bagaimana pengalamanmu?","Semua masukan diterima. Google Review juga selalu tersedia di halaman utama.",`<div class="rating-row">${[1,2,3,4,5].map(n=>`<button class="rating-btn" data-rating="${n}">★</button>`).join("")}</div><textarea class="field" id="feedback-message" rows="3" placeholder="Ceritakan pengalaman atau saranmu..."></textarea><button class="modal-btn" id="send-feedback">KIRIM MASUKAN VIA WHATSAPP</button><a class="modal-btn secondary" href="${esc(r.googleReviewUrl||"#")}" target="_blank" rel="noopener">ATAU TULIS GOOGLE REVIEW ↗</a>`);let rating=0;document.querySelectorAll(".rating-btn").forEach(b=>b.onclick=()=>{rating=+b.dataset.rating;document.querySelectorAll(".rating-btn").forEach(x=>x.classList.toggle("selected",+x.dataset.rating<=rating))});$("send-feedback").onclick=()=>{const msg=`Halo ${r.name}, masukan saya. Rating: ${rating?rating+"/5":"tidak diisi"}. Pesan: ${$("feedback-message").value.trim()||"-"}`;if(!r.whatsappNumber){toast("Nomor WhatsApp belum diatur.");return}window.open(wa(msg),"_blank","noopener");close()}}
})();