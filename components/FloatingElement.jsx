'use client';

import { motion } from 'framer-motion';
import { floatingElementVariants } from '../lib/animations';

const FloatingElement = ({ top = '10%', left = '10%', size = 100 }) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                top,
                left,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
            }}
            animate={floatingElementVariants.animate}
            whileHover={floatingElementVariants.whileHover}
            transition={floatingElementVariants.transition}
        />
    );
};

export default FloatingElement;
