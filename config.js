// Identitas penyedia layanan ditampilkan pada seluruh halaman restoran.
const PROVIDER = {
 name: "TAPDINE",
 founder: "Muhammad Arfian Yoga Pratama",
 role: "Founder & Developer",
 description: "TAPDINE dirancang dan dikembangkan untuk membantu restoran dan bisnis kuliner menghadirkan pengalaman digital yang praktis melalui QR Code dan NFC. Layanan mencakup pembuatan halaman digital, penyesuaian identitas restoran, integrasi tautan, serta dukungan dan pembaruan teknis.",
 contactLabel: "Hubungi TAPDINE",
 whatsappNumber: "", // Isi nomor WhatsApp resmi format 62xxxxxxxxxxx
 email: "", // Isi email resmi TAPDINE
 instagram: "" // Isi akun Instagram resmi TAPDINE
};

// Satu objek = satu restoran. URL contoh: https://username.github.io/tapdine/?r=ruang-rasa
// QR Code dan NFC menggunakan URL yang sama.
const RESTAURANTS = {
 "ruang-rasa": {
  name:"Ruang Rasa", category:"RESTAURANT • INDONESIAN",
  tagline:"Tempat cerita baik dimulai dari satu meja.",
  address:"Jl. Contoh No. 10, Surabaya",
  coverImage:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85",
  googleReviewUrl:"https://g.page/r/REPLACE_WITH_GOOGLE_REVIEW_ID/review",
  whatsappNumber:"6281234567890", whatsappMessage:"Halo Ruang Rasa, saya ingin bertanya.",
  instagram:"https://instagram.com/", tiktok:"https://tiktok.com/", facebook:"",
  mapsUrl:"https://maps.google.com/?q=Surabaya", menuUrl:"",
  promoTitle:"Ada yang spesial hari ini!", promoDescription:"Tanyakan promo terbaru langsung kepada tim kami.",
  serviceHours:"Setiap hari • 10.00–22.00", menu:[
   {category:"Favorit",items:[{name:"Nasi Ayam Rempah",description:"Ayam berbumbu rempah dengan nasi hangat.",price:"Rp28.000"},{name:"Es Teh Nusantara",description:"Teh segar pilihan.",price:"Rp8.000"}]},
   {category:"Camilan",items:[{name:"Pisang Goreng",description:"Renyah di luar, lembut di dalam.",price:"Rp18.000"}]}
  ]
 },
 "demo-kopi": {
  name:"Kedai Kopi Demo",category:"COFFEE SHOP • CAFE",tagline:"A little pause, a better day.",
  address:"Surabaya, Indonesia",coverImage:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1400&q=85",
  googleReviewUrl:"https://www.google.com/maps",whatsappNumber:"6281234567890",
  whatsappMessage:"Halo, saya ingin bertanya tentang Kedai Kopi Demo.",
  instagram:"https://instagram.com/",tiktok:"https://tiktok.com/",facebook:"",
  mapsUrl:"https://maps.google.com/?q=Surabaya",menuUrl:"",
  promoTitle:"Coffee o'clock!",promoDescription:"Hubungi kami untuk mengetahui promo yang sedang berjalan.",
  serviceHours:"Setiap hari • 08.00–22.00",menu:[{category:"Coffee",items:[{name:"Es Kopi Susu",description:"Espresso dan susu creamy.",price:"Rp20.000"}]}]
 }
};