'use client';

import { motion } from 'framer-motion';
import { copyToClipboard } from '../lib/utils';

const JSONView = ({ result }) => {
    const handleCopyJSON = () => {
        copyToClipboard(result, 'json');
    };

    return (
        <motion.div
            key="json"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
        >
            <motion.div
                className="position-relative"
                style={{
                    background: '#1e1e1e',
                    borderRadius: '0.75rem',
                    padding: '20px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                }}
                whileHover={{
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
            >
                <motion.button
                    className="btn btn-sm btn-outline-light position-absolute"
                    style={{ top: '10px', right: '10px', zIndex: 10 }}
                    onClick={handleCopyJSON}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    📋 Copy JSON
                </motion.button>

                <pre style={{
                    color: '#f8f8f2',
                    margin: 0,
                    fontSize: '13px',
                    fontFamily: 'Monaco, Consolas, monospace',
                    lineHeight: '1.4'
                }}>
                    {JSON.stringify({
                        summary: result?.summary,
                        decisions: result?.decisions,
                        actionItems: result?.actionItems
                    }, null, 2)}
                </pre>
            </motion.div>
        </motion.div>
    );
};

export default JSONView;
