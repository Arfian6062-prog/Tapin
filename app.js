const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(window.location.search);
const slug = params.get("r") || "ruang-rasa";
const restaurant = TAPDINE_CONFIG.restaurants[slug] || TAPDINE_CONFIG.restaurants["ruang-rasa"];

document.title = `${restaurant.name} — TAPDINE`;
$("restaurant-name").textContent = restaurant.name;
$("restaurant-category").textContent = restaurant.category || "WELCOME TO";
$("restaurant-tagline").textContent = restaurant.tagline || "";
$("restaurant-location").textContent = restaurant.location || "";
$("restaurant-cover").src = restaurant.cover;
$("restaurant-cover").alt = `Suasana ${restaurant.name}`;

const wa = String(restaurant.whatsapp || "").replace(/\D/g, "");
const waLink = $("whatsapp-link");
if (wa) {
  waLink.href = `https://wa.me/${wa}?text=${encodeURIComponent(restaurant.whatsappMessage || `Halo ${restaurant.name}, saya ingin bertanya.`)}`;
} else {
  waLink.href = "#";
  waLink.addEventListener("click", (e) => { e.preventDefault(); alert("Kontak WhatsApp restoran belum tersedia."); });
}

const reviewLink = $("review-link");
if (restaurant.googleReview && !restaurant.googleReview.includes("REPLACE_WITH")) {
  reviewLink.href = restaurant.googleReview;
} else {
  reviewLink.href = "#";
  reviewLink.addEventListener("click", (e) => { e.preventDefault(); alert("Tautan Google Review restoran belum diatur."); });
}

const socialMeta = {
  instagram: {label:"Instagram", icon:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" class="fill"/>'},
  tiktok: {label:"TikTok", icon:'<path d="M14 3v11.2a4.2 4.2 0 1 1-3.5-4.1"/><path d="M14 3c.5 3 2.2 4.7 5 5"/>'},
  facebook: {label:"Facebook", icon:'<path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h1.7V1.5C17 1.3 16 1.2 14.7 1.2 11.5 1.2 9.5 3.1 9.5 6.6V9H7v4h2.5v8"/>'},
  youtube: {label:"YouTube", icon:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z" class="fill"/>'},
  x: {label:"X", icon:'<path d="m4 4 16 16M20 4 4 20"/>'},
  threads: {label:"Threads", icon:'<path d="M18.5 8.5c-.7-3.1-3-5-6.2-5-4.2 0-7 3.1-7 8.1 0 4.7 2.4 7.9 6.8 7.9 3.2 0 5.3-1.8 5.3-4.4 0-2.2-1.5-3.6-4-3.6-2.1 0-3.4 1-3.4 2.5 0 1.2.9 2 2.2 2 1.7 0 2.9-1.2 2.9-3.2 0-3.5-2.1-5.7-5.2-5.7"/>'},
  pinterest: {label:"Pinterest", icon:'<circle cx="12" cy="12" r="9"/><path d="m9 20 2-7m0 0c.4 1.3 1.4 2 2.7 2 2.3 0 3.8-2 3.8-4.5 0-2.6-2-4.5-4.9-4.5-3.4 0-5.3 2.2-5.3 4.8 0 1.3.5 2.4 1.5 2.8"/>'}
};
const socials = $("social-links");
Object.entries(socialMeta).forEach(([key, meta]) => {
  const url = restaurant.socials && restaurant.socials[key];
  if (!url) return;
  const a = document.createElement("a");
  a.className = "social-link";
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", meta.label);
  a.title = meta.label;
  a.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${meta.icon}</svg>`;
  socials.appendChild(a);
});
if (!socials.children.length) {
  const empty = document.createElement("span");
  empty.className = "welcome";
  empty.textContent = "Akun media sosial restoran akan segera hadir.";
  socials.appendChild(empty);
}
