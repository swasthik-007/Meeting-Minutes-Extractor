'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particles only on client side to avoid hydration mismatch
        // This prevents server/client differences with Math.random() values
        const newParticles = [...Array(20)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
        }));
        setParticles(newParticles);
    }, []);

    // Don't render particles during SSR to prevent hydration mismatch
    if (particles.length === 0) {
        return null;
    }

    return (
        <>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.3)',
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                    }}
                />
            ))}
        </>
    );
};

export default ParticleBackground;
