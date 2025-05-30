'use client';

import { motion, AnimatePresence } from 'framer-motion';

const ErrorAlert = ({ error }) => {
    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    className="alert alert-danger rounded-3 text-center"
                    style={{
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                        scale: 1.02,
                        boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
                    }}
                >
                    ❌ {error}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ErrorAlert;
