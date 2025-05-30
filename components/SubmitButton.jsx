'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { buttonVariants } from '../lib/animations';

const SubmitButton = ({ loading, onClick, disabled }) => {
    return (
        <motion.button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={loading || disabled}
            onClick={onClick}
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '12px',
                fontSize: '16px',
                cursor: (loading || disabled) ? 'not-allowed' : 'pointer'
            }}
            variants={buttonVariants}
            whileHover={(!loading && !disabled) ? "hover" : {}}
            whileTap={(!loading && !disabled) ? "tap" : {}}
        >
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="d-flex align-items-center justify-content-center"
                    >
                        <motion.div
                            className="spinner-border spinner-border-sm me-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        AI is analyzing...
                    </motion.div>
                ) : (
                    <motion.span
                        key="extract"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        ✨ Extract Meeting Minutes
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default SubmitButton;
