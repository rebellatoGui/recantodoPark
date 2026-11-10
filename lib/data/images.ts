function unsplash(id: string, width = 1600, height = 1200) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}

export const photos = {
  betoCarrero: "/photos/beto-carrero-world.webp",
  googleMaps: "/photos/google-maps.webp",
  gravataPedras: "/photos/praia-gravata-pedras.webp",
  gravataMar: "/photos/praia-gravata-mar.webp",
  acessoPraia: "/photos/acesso-a-praia.webp",
  cachorroPraia: "/photos/cachorro-praia.webp",
  oMar: "/photos/o-mar.webp",
  estacionamento: "/photos/estacionamento.webp",
  quarto1: "/photos/quarto1.webp",
  banheiro1: "/photos/banheiro1.webp",
  quartoJanela: "/photos/quarto-janela.webp",
  quartoTriplo: "/photos/quarto-triplo.webp",
  quartoLilas: "/photos/quarto-lilas.webp",
  fachadaNoite: "/photos/fachada-noite.webp",
  cafeBuffet: "/photos/cafe-buffet.webp",
  cafeBancada: "/photos/cafe-bancada.webp",
  refeitorio: "/photos/refeitorio.webp",
  refeitorioMesas: "/photos/refeitorio-mesas.webp",
  droneGravataPoster: "/photos/drone-gravata-poster.webp",
  droneGravata2Poster: "/photos/drone-gravata-2-poster.webp",
} as const;

// AV1 primeiro (mesma qualidade com bem menos bytes); H.264 para navegadores sem AV1.
// O navegador usa a primeira <source> cujo type ele aceita. /photos tem cache de 30 dias:
// ao trocar um vídeo, troque também o nome do arquivo, senão o navegador segue no antigo.
// No celular em pé o object-cover só mostra o centro do hero, então ele recebe um recorte
// vertical a 30fps (~1/6 do peso) em vez do 1080p60 inteiro.
const AV1 = 'video/mp4; codecs="av01.0.09M.10"';
const H264 = "video/mp4";

const PORTRAIT_PHONE = "(max-width: 767px) and (orientation: portrait)";

function videoSources(name: string, media?: string) {
  return [
    { src: `/photos/${name}.av1.mp4`, type: AV1, media },
    { src: `/photos/${name}.mp4`, type: H264, media },
  ];
}

export const videos = {
  hero: [...videoSources("hero-10s-mobile", PORTRAIT_PHONE), ...videoSources("hero-10s-60fps")],
  droneGravata: videoSources("drone-gravata"),
  droneGravata2: videoSources("drone-gravata-2"),
};

export const amenityStock = {
  ac: unsplash("1762341123870-d706f257a12e", 600, 600),
  minibar: unsplash("1540961403310-79825242906e", 600, 600),
  wifi: unsplash("1453928582365-b6ad33cbcf64", 600, 600),
  accessibility: unsplash("1656646523834-dd1cc57d33c9", 600, 600),
  tv: unsplash("1595935736128-db1f0a261263", 600, 600),
  petFriendly: unsplash("1698949654875-544ecfef27ac", 600, 600),
} as const;

export const gravataCarousel: { src: string; alt: string }[] = [
  { src: photos.gravataPedras, alt: "Costão de pedras e o mar na Praia do Gravatá" },
  { src: photos.oMar, alt: "Mar aberto visto da Praia do Gravatá" },
  { src: photos.cachorroPraia, alt: "Cachorro passeando na areia da praia" },
  { src: photos.acessoPraia, alt: "Passarela de acesso à praia entre a vegetação" },
  { src: photos.gravataMar, alt: "Ondas quebrando na Praia do Gravatá" },
];
