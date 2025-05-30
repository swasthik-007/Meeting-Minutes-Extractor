'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { inputHoverVariants, labelHoverVariants } from '../lib/animations';
import { validateFile, formatFileSize, removeFile } from '../lib/utils';

const FileUpload = ({ file, setFile, error, setError }) => {
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const validation = validateFile(selectedFile);

        if (!validation.isValid) {
            setError(validation.error);
            e.target.value = '';
            return;
        }

        setFile(selectedFile);
        setError('');
    };

    const handleRemoveFile = () => {
        removeFile(setFile, setError);
    };

    return (
        <motion.div className="mb-3" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <motion.label
                className="form-label fw-semibold"
                style={{ cursor: 'pointer' }}
                variants={labelHoverVariants}
                whileHover="hover"
            >
                📁 Upload .txt file:
            </motion.label>

            <div className="d-flex gap-2 align-items-center">
                <motion.input
                    type="file"
                    className="form-control"
                    accept=".txt"
                    onChange={handleFileChange}
                    style={{
                        borderRadius: '0.75rem',
                        border: '2px solid #e0e7ff',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    variants={inputHoverVariants}
                    whileHover="hover"
                    whileFocus="focus"
                />

                {/* Remove File Button */}
                <AnimatePresence>
                    {file && (
                        <motion.button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleRemoveFile}
                            style={{
                                borderRadius: '0.5rem',
                                padding: '8px 12px',
                                whiteSpace: 'nowrap'
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🗑️ Remove
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* File Info Display */}
            <AnimatePresence>
                {file && (
                    <motion.div
                        className="mt-2 p-2 rounded-3"
                        style={{
                            background: 'rgba(102, 126, 234, 0.1)',
                            border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <small className="text-primary fw-semibold">
                            📄 {file.name} ({formatFileSize(file.size)})
                        </small>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FileUpload;
