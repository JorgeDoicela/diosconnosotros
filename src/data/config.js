import {
  Instagram,
  Facebook,
  Youtube,
  Heart,
  MapPin,
  Send,
} from "lucide-react";
import img1 from "../assets/Cuadrícula/1.jpg";
import vid2 from "../assets/Cuadrícula/2.mp4";
import thumb2 from "../assets/Cuadrícula/Portadas de videos/2.png";
import img3 from "../assets/Cuadrícula/3.jpg";
import img4 from "../assets/Cuadrícula/4.jpg";
import vid5 from "../assets/Cuadrícula/5.mp4";
import thumb5 from "../assets/Cuadrícula/Portadas de videos/5.png";
import img6 from "../assets/Cuadrícula/6.jpg";
import vid7 from "../assets/Cuadrícula/7.mp4";
import thumb7 from "../assets/Cuadrícula/Portadas de videos/7.png";
import img8 from "../assets/Cuadrícula/8.jpg";
import img9 from "../assets/Cuadrícula/9.jpg";

// Carousel images
import c1 from "../assets/Carrusel/Primer versículo.png";
import c2 from "../assets/Carrusel/Segundo versículo.png";
import c3 from "../assets/Carrusel/Tercer versículo.png";
import c4 from "../assets/Carrusel/Cuarto versículo.png";
import videoCover from "../assets/Fondo video.jpg";

export const siteConfig = {
  name: "DCN | Dios con nosotros",
  tagline: "Servicios de adoración: Domingos 8:00 a.m. & 10:30 a.m. 🙌🏼",
  location: "Quito, Ecuador 📍",
  qrRedirectUrl: "https://diosconnosotros.vercel.app/links", // Destino modificable del QR (/go)
  // Bloques visuales de arriba
  topBlocks: [
    {
      id: "b2",
      type: "video",
      title: "Último Sermón",
      videoUrl: "https://www.youtube.com/embed/E-W39HA2jS4",
      thumbnail: videoCover,
      size: "col-span-1 aspect-square",
    },
    {
      id: "b3",
      type: "map",
      title: "Visítanos",
      embedUrl:
        "https://maps.google.com/maps?q=-0.237207,-78.5166632&hl=es&z=15&output=embed",
      size: "col-span-1 aspect-square",
    },
    {
      id: "b1",
      type: "carousel",
      images: [c1, c2, c3, c4],
      size: "col-span-2 h-48",
    },
  ],
  // Botones de abajo
  links: [
    {
      id: 1,
      text: "Aniversario número 18",
      url: "https://www.facebook.com/share/r/1A86bbY1uv/",
      isHighlight: true,
    },
    {
      id: 2,
      text: "Sermones domicales",
      url: "https://www.diosconosotros.com/lista-reproduccion/",
      isHighlight: true,
    },
    {
      id: 3,
      text: "Día de las madres",
      url: "https://www.diosconosotros.com/homenaje-a-las-madres/",
      icon: Send,
      isHighlight: true,
    },
    { id: 4, text: "Enlace", url: "#", icon: Heart, isHighlight: true },
    { id: 5, text: "Enlace", url: "#", isHighlight: true },
  ],
  // Grid tipo Instagram (3 columnas x 3 filas = 9 items)
  socialGrid: [
    { id: "g1", type: "image", url: img1 },
    { id: "g2", type: "video", videoUrl: vid2, thumbnail: thumb2 },
    { id: "g3", type: "image", url: img3 },
    { id: "g4", type: "image", url: img4 },
    { id: "g5", type: "video", videoUrl: vid5, thumbnail: thumb5 },
    { id: "g6", type: "image", url: img6 },
    { id: "g7", type: "video", videoUrl: vid7, thumbnail: thumb7 },
    { id: "g8", type: "image", url: img8 },
    { id: "g9", type: "image", url: img9 },
  ],
};
