'use client';

import { motion } from 'framer-motion';
import { downloadPDF, downloadJSON, copyToClipboard } from '../lib/utils';

const ModalButtons = ({ result, onClose }) => {
    const handleDownloadPDF = () => {
        downloadPDF(result);
    };

    const handleDownloadJSON = () => {
        downloadJSON(result);
    };

    const handleCopyText = () => {
        copyToClipboard(result, 'text');
    };

    return (
        <motion.div
            className="d-flex justify-content-between gap-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, type: 'spring' }}
        >
            <motion.button
                onClick={handleDownloadPDF}
                className="btn btn-success fw-semibold"
                style={{
                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: 'white',
                    padding: '10px 15px',
                    fontSize: '14px'
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 25px rgba(72, 187, 120, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
            >
                📄 PDF
            </motion.button>

            <motion.button
                onClick={handleDownloadJSON}
                className="btn fw-semibold"
                style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: 'white',
                    padding: '10px 15px',
                    fontSize: '14px'
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
            >
                📊 JSON
            </motion.button>

            <motion.button
                onClick={handleCopyText}
                className="btn fw-semibold"
                style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: 'white',
                    padding: '10px 15px',
                    fontSize: '14px'
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 25px rgba(6, 182, 212, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
            >
                📋 Copy
            </motion.button>

            <motion.button
                onClick={onClose}
                className="btn fw-semibold"
                style={{
                    background: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: 'white',
                    padding: '10px 15px',
                    fontSize: '14px'
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 25px rgba(160, 174, 192, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
            >
                ✕ Close
            </motion.button>
        </motion.div>
    );
};

export default ModalButtons;
