import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { siteConfig } from '../data/config';

const BentoGrid = ({ onOpenVideo }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-4 w-full mb-8">
      {siteConfig.topBlocks.map((block) => (
        <motion.div
          key={block.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${block.size} rounded-xl overflow-hidden shadow-sm bg-white border border-slate-100 relative`}
        >
          {block.type === 'carousel' && (
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="h-full w-full"
            >
              {block.images.map((img, i) => (
                <SwiperSlide key={i}><img src={img} className="object-cover h-full w-full" alt="Anuncio" referrerPolicy="no-referrer" /></SwiperSlide>
              ))}
            </Swiper>
          )}

          {block.type === 'video' && (
            <div
              onClick={() => onOpenVideo(block.videoUrl)}
              className="relative h-full w-full group cursor-pointer"
            >
              <img src={block.thumbnail} className="absolute inset-0 object-cover opacity-80 group-hover:scale-105 transition-transform" alt="Video" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold">▶ Ver</div>
            </div>
          )}

          {block.type === 'map' && (
            <iframe src={block.embedUrl} className="w-full h-full grayscale-0 md:grayscale md:hover:grayscale-0 transition-all border-0" allowFullScreen loading="lazy"></iframe>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default BentoGrid;