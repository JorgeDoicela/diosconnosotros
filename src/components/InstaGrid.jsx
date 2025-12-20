import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { siteConfig } from '../data/config';

const InstaGrid = ({ onOpenMedia }) => {
    return (
        <motion.div
            className="grid grid-cols-3 gap-1 mb-10 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.05
                    }
                }
            }}
        >
            {siteConfig.socialGrid.map((item, index) => (
                <motion.div
                    key={item.id}
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative aspect-square bg-slate-200 overflow-hidden cursor-pointer group rounded-sm shadow-sm"
                    onClick={() => onOpenMedia(index)}
                >
                    {/* Imagen / Thumbnail / Video Preview */}
                    {item.type === 'video' ? (
                        <video
                            src={item.videoUrl}
                            poster={item.thumbnail}
                            className="w-full h-full object-cover transition-transform duration-500"
                            muted
                            loop
                            playsInline
                            onMouseOver={event => event.target.play()}
                            onMouseOut={event => event.target.pause()}
                        />
                    ) : (
                        <img
                            src={item.url}
                            alt="Media"
                            className="w-full h-full object-cover transition-transform duration-500"
                        />
                    )}

                    {/* Overlay oscura al hacer hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                    {/* Icono de Play para videos */}
                    {item.type === 'video' && (
                        <div className="absolute top-2 right-2">
                            <Play className="w-4 h-4 text-white fill-white drop-shadow-md" />
                        </div>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default InstaGrid;
