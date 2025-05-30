'use client';

import { motion } from 'framer-motion';
import { modalItemHoverVariants, badgeHoverVariants } from '../lib/animations';
import TypewriterText from './TypewriterText';

const FormattedView = ({ result }) => {
    return (
        <motion.div
            key="formatted"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Summary Section */}
            <motion.div className="mb-4">
                <motion.h5
                    className="fw-bold mb-3 d-flex align-items-center"
                    style={{ color: '#4a5568', cursor: 'pointer' }}
                    whileHover={{
                        scale: 1.02,
                        color: '#667eea'
                    }}
                >
                    📝 Summary
                </motion.h5>
                <motion.div
                    className="p-3 rounded-3"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        position: 'relative',
                        cursor: 'pointer'
                    }}
                    variants={modalItemHoverVariants}
                    whileHover="hover"
                >
                    <TypewriterText text={result?.summary} />
                </motion.div>
            </motion.div>

            {/* Decisions Section */}
            <motion.div className="mb-4">
                <motion.h5
                    className="fw-bold mb-3"
                    style={{ color: '#4a5568', cursor: 'pointer' }}
                    whileHover={{
                        scale: 1.02,
                        color: '#667eea'
                    }}
                >
                    ✅ Key Decisions
                </motion.h5>
                {result?.decisions?.map((d, i) => (
                    <motion.div
                        key={i}
                        className="list-group-item rounded-3 mb-2 border-0"
                        style={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                            cursor: 'pointer'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.5 }}
                        variants={modalItemHoverVariants}
                        whileHover="hover"
                    >
                        {d}
                    </motion.div>
                ))}
            </motion.div>

            {/* Action Items Section */}
            <motion.div className="mb-4">
                <motion.h5
                    className="fw-bold mb-3 d-flex align-items-center"
                    style={{ color: '#4a5568', cursor: 'pointer' }}
                    whileHover={{
                        scale: 1.02,
                        color: '#667eea'
                    }}
                >
                    🎯 Action Items
                    <motion.span
                        className="badge ms-2"
                        style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            cursor: 'pointer'
                        }}
                        variants={badgeHoverVariants}
                        whileHover="hover"
                    >
                        {result?.actionItems?.length || 0}
                    </motion.span>
                </motion.h5>

                {result?.actionItems?.map((a, i) => (
                    <motion.div
                        key={i}
                        className="border p-3 mb-3 rounded-3"
                        style={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(102, 126, 234, 0.1)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                            cursor: 'pointer'
                        }}
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.1 * i + 1, type: 'spring', damping: 15 }}
                        variants={modalItemHoverVariants}
                        whileHover="hover"
                    >
                        <div className="mb-1">
                            <strong style={{ color: '#2d3748' }}>Task:</strong> {a.task}
                        </div>
                        {a.owner && (
                            <div className="mb-1">
                                <strong style={{ color: '#2d3748' }}>Owner:</strong> {a.owner}
                            </div>
                        )}
                        {a.due && (
                            <div className="d-flex align-items-center">
                                <strong style={{ color: '#2d3748' }}>Due:</strong>
                                <motion.span
                                    className="ms-1 badge"
                                    style={{
                                        background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                                        cursor: 'pointer'
                                    }}
                                    variants={badgeHoverVariants}
                                    whileHover="hover"
                                >
                                    {a.due}
                                </motion.span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default FormattedView;
