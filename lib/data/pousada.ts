import {
  Coffee,
  Wifi,
  Car,
  Snowflake,
  Bath,
  Refrigerator,
  Tv,
  Accessibility,
  PawPrint,
  type LucideIcon,
} from "lucide-react";
import { photos, amenityStock } from "./images";

const GOOGLE_PLACE_ID = "ChIJZYBvBUHR2JQR-sRR8mTT-gc";
const GOOGLE_PLACE_CID = "575004332958795002";
const PLACE_NAME = "Pousada Recanto do Park";
const LATITUDE = -26.8145072;
const LONGITUDE = -48.6156718;

export const contact = {
  whatsappNumber: "554732671937",
  phoneDisplay: "+55 47 3267-1937",
  bookingEngineUrl: "https://reservas.pousadarecantodopark.com.br/",
  email: "pousadarecantodopark@gmail.com",
  instagramHandle: "@pousadarecantodopark",
  instagramUrl: "https://www.instagram.com/pousadarecantodopark/",
  googlePlaceId: GOOGLE_PLACE_ID,
  googlePlaceCid: GOOGLE_PLACE_CID,
  placeName: PLACE_NAME,
  latitude: LATITUDE,
  longitude: LONGITUDE,
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    PLACE_NAME,
  )}&query_place_id=${GOOGLE_PLACE_ID}`,
  googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    PLACE_NAME,
  )}&destination_place_id=${GOOGLE_PLACE_ID}`,
  googleReviewUrl: `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`,
  googleReviewsListUrl: `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`,
};

export function googleMapsEmbedUrl(locale: string) {
  return `https://maps.google.com/maps?cid=${GOOGLE_PLACE_CID}&hl=${locale}&z=16&output=embed`;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const isAccreditedAgent = false;

export type AmenityId =
  | "breakfast"
  | "parking"
  | "reception"
  | "ac"
  | "privateBathroom"
  | "minibar"
  | "tv"
  | "wifi"
  | "accessibility"
  | "petFriendly";

export const amenities: {
  id: AmenityId;
  icon: LucideIcon;
  image?: string;
}[] = [
  { id: "breakfast", icon: Coffee, image: photos.cafeBuffet },
  { id: "parking", icon: Car, image: photos.estacionamento },
  { id: "ac", icon: Snowflake, image: amenityStock.ac },
  { id: "privateBathroom", icon: Bath, image: photos.banheiro1 },
  { id: "minibar", icon: Refrigerator, image: amenityStock.minibar },
  { id: "tv", icon: Tv, image: amenityStock.tv },
  { id: "wifi", icon: Wifi, image: amenityStock.wifi },
  { id: "accessibility", icon: Accessibility, image: amenityStock.accessibility },
  { id: "petFriendly", icon: PawPrint, image: amenityStock.petFriendly },
];

export const showcaseAmenities = amenities.filter(
  ({ id }) => !["privateBathroom", "wifi", "tv"].includes(id),
);

const ROOM_AMENITY_IDS: AmenityId[] = [
  "privateBathroom",
  "ac",
  "tv",
  "wifi",
  "minibar",
];

export type RoomId = `suite${string}`;

export const rooms: {
  id: RoomId;
  slug: string;
  capacity?: number;
  sizeSqm?: number;
  images: string[];
  amenityIds: AmenityId[];
}[] = [
  {
    id: "suite01",
    slug: "suite-01",
    images: [
      photos.quarto1,
      photos.quartoJanela,
      photos.quartoTriplo,
      photos.quartoLilas,
      photos.banheiro1,
    ],
    amenityIds: ROOM_AMENITY_IDS,
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}
