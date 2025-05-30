'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { modalVariants } from '../lib/animations';
import FormattedView from './FormattedView';
import JSONView from './JSONView';
import ModalButtons from './ModalButtons';

const ResultsModal = ({ isOpen, onClose, result }) => {
    const [viewMode, setViewMode] = useState('formatted'); // 'formatted' or 'json'

    return (
        <AnimatePresence>
            {isOpen && result && (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                >
                    <motion.div
                        className="modal-content p-4"
                        style={{
                            borderRadius: '1.5rem',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            maxWidth: 750,
                            margin: 'auto',
                            border: 'none',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        initial={modalVariants.initial}
                        animate={modalVariants.animate}
                        exit={modalVariants.exit}
                        transition={modalVariants.transition}
                    >
                        {/* Enhanced Modal Header with View Toggle */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <motion.h2
                                className="h4 text-primary fw-bold mb-0"
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    cursor: 'pointer'
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    textShadow: '0 5px 15px rgba(102, 126, 234, 0.3)'
                                }}
                            >
                                📋 Extracted Meeting Minutes
                            </motion.h2>

                            {/* View Mode Toggle */}
                            <motion.div
                                className="btn-group"
                                role="group"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.button
                                    type="button"
                                    className={`btn btn-sm ${viewMode === 'formatted' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setViewMode('formatted')}
                                    style={{ borderRadius: '0.5rem 0 0 0.5rem' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    📋 Formatted
                                </motion.button>
                                <motion.button
                                    type="button"
                                    className={`btn btn-sm ${viewMode === 'json' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setViewMode('json')}
                                    style={{ borderRadius: '0 0.5rem 0.5rem 0' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    📄 JSON
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Content Display */}
                        <AnimatePresence mode="wait">
                            {viewMode === 'formatted' ? (
                                <FormattedView result={result} />
                            ) : (
                                <JSONView result={result} />
                            )}
                        </AnimatePresence>

                        {/* Enhanced Buttons */}
                        <ModalButtons result={result} onClose={onClose} />
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default ResultsModal;
