'use client';

import { motion } from 'framer-motion';
import { backgroundVariants, containerVariants, cardHoverVariants } from '../lib/animations';
import ParticleBackground from './ParticleBackground';
import FloatingElement from './FloatingElement';

const AppLayout = ({ children }) => {
    return (
        <motion.div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden'
            }}
            variants={backgroundVariants}
            animate="animate"
        >
            {/* Enhanced floating elements with hover */}
            <FloatingElement top="10%" left="10%" size={100} />

            <ParticleBackground />

            <motion.div
                className="bg-white p-5 rounded-4 shadow-lg border"
                style={{
                    maxWidth: 540,
                    width: '100%',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                whileHover={cardHoverVariants.hover}
            >
                <motion.h1
                    className="mb-4 text-primary fw-bold text-center"
                    style={{
                        letterSpacing: 1,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        cursor: 'pointer'
                    }}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{
                        scale: 1.05,
                        textShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
                        transition: { duration: 0.3 }
                    }}
                >
                    🤖 AI Meeting Minutes Extractor
                </motion.h1>

                <motion.p
                    className="mb-4 text-secondary text-center"
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{
                        scale: 1.02,
                        color: '#4a5568',
                        transition: { duration: 0.2 }
                    }}
                >
                    Upload a <motion.span
                        className="fw-semibold text-primary"
                        whileHover={{
                            scale: 1.1,
                            color: '#667eea',
                            textShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        txt
                    </motion.span> file or paste your meeting notes to extract summary, decisions, and action items.
                </motion.p>

                {children}
            </motion.div>
        </motion.div>
    );
};

export default AppLayout;
