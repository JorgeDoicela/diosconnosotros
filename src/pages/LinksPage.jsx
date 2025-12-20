import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BentoGrid from '../components/BentoGrid';
import InstaGrid from '../components/InstaGrid';
import Modal from '../components/Modal';
import { siteConfig } from '../data/config';
import profilePic from '../assets/Foto perfil.jpg';
import fbIcon from '../assets/Facebook.png';
import igIcon from '../assets/Instagram.png';
import mapsIcon from '../assets/Maps.png';
import webIcon from '../assets/Pagina.png';

const LinksPage = () => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [tempMedia, setTempMedia] = useState(null);

  const handleNext = () => {
    if (selectedMediaIndex !== null) {
      setSelectedMediaIndex((prev) => (prev + 1) % siteConfig.socialGrid.length);
    }
  };

  const handlePrev = () => {
    if (selectedMediaIndex !== null) {
      setSelectedMediaIndex((prev) => (prev - 1 + siteConfig.socialGrid.length) % siteConfig.socialGrid.length);
    }
  };

  const currentMedia = tempMedia || (selectedMediaIndex !== null ? siteConfig.socialGrid[selectedMediaIndex] : null);

  const closeMedia = () => {
    setSelectedMediaIndex(null);
    setTempMedia(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 px-4 md:py-12 md:px-6">
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2
            }
          }
        }}
      >

        {/* Header */}
        <motion.header
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
          }}
          className="text-center mb-10 flex flex-col items-center"
        >
          <motion.img
            src={profilePic}
            alt="Profile"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-6 shadow-lg border-4 border-white object-cover"
          />
          <h1 className="text-xl md:text-3xl font-bold font-merriweather text-black">{siteConfig.name}</h1>
          <p className="text-black text-sm md:text-lg mt-2 font-merriweather font-normal">{siteConfig.tagline}</p>
          <p className="text-black text-sm md:text-lg mt-1 font-merriweather font-normal">{siteConfig.location}</p>

          <div className="flex gap-6 md:gap-12 mt-8 text-slate-400 items-center">
            {/* Facebook */}
            <motion.a href="https://www.facebook.com/iglesiadcn14" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
              <img src={fbIcon} alt="Facebook" className="w-7 h-7 md:w-10 md:h-10 hover:opacity-80 transition-opacity" />
            </motion.a>
            {/* Instagram */}
            <motion.a href="https://www.instagram.com/iglesiadcn14?igsh=MW5kaGx5cGgzaDIweQ==" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <img src={igIcon} alt="Instagram" className="w-7 h-7 md:w-10 md:h-10 hover:opacity-80 transition-opacity" />
            </motion.a>
            {/* Página Web */}
            <motion.a href="https://www.diosconosotros.com/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
              <img src={webIcon} alt="Web" className="w-7 h-7 md:w-10 md:h-10 hover:opacity-80 transition-opacity" />
            </motion.a>
            {/* Maps */}
            {/* Maps */}
            <motion.a href="https://maps.app.goo.gl/UzurAiM3bbNYxDsM8" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <img src={mapsIcon} alt="Ubicación" className="w-7 h-7 md:w-10 md:h-10 hover:opacity-80 transition-opacity" />
            </motion.a>
          </div>
        </motion.header>

        {/* PARTE ORIGINAL: Botones clásicos (Moved Up) */}
        <motion.div
          className="space-y-3 md:space-y-4 mb-10"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {siteConfig.links.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.url}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`block w-full py-4 px-6 md:py-6 md:px-8 rounded-xl text-center font-bold font-merriweather shadow-sm transition-colors text-sm md:text-lg ${link.isHighlight ? 'bg-[#ce1616] text-white shadow-[#ce1616]/30 shadow-lg' : 'bg-white text-slate-700 border border-slate-100'
                }`}
            >
              {link.text}
            </motion.a>
          ))}
        </motion.div>

        {/* PARTE NUEVA: Grid tipo Instagram */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <InstaGrid onOpenMedia={(index) => {
            setTempMedia(null);
            setSelectedMediaIndex(index);
          }} />
        </motion.div>

        {/* PARTE NUEVA: Bento Grid interactivo (Moved Down) */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <BentoGrid onOpenVideo={(url) => {
            setSelectedMediaIndex(null);
            setTempMedia({ type: 'video', videoUrl: url });
          }} />
        </motion.div>


        {/* <footer className="text-center mt-16 text-[10px] text-slate-300 uppercase tracking-[0.3em]">
          © 2025 {siteConfig.name}
        </footer> */}
      </motion.div>

      {/* Modal para reproducir videos e imágenes */}
      <Modal
        isOpen={!!currentMedia}
        onClose={closeMedia}
        mediaItem={currentMedia}
        onNext={selectedMediaIndex !== null ? handleNext : null}
        onPrev={selectedMediaIndex !== null ? handlePrev : null}
      />
    </div>
  );
};

export default LinksPage;