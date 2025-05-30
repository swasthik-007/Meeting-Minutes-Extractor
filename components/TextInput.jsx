'use client';

import { motion } from 'framer-motion';
import { inputHoverVariants, labelHoverVariants } from '../lib/animations';

const TextInput = ({ input, setInput }) => {
    return (
        <motion.div
            className="mb-3"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
            <motion.label
                className="form-label fw-semibold"
                style={{ cursor: 'pointer' }}
                variants={labelHoverVariants}
                whileHover="hover"
            >
                ✏️ Paste meeting text:
            </motion.label>
            <motion.textarea
                className="form-control"
                rows={6}
                value={input}
                placeholder="Paste your meeting notes here... 📝"
                onChange={(e) => setInput(e.target.value)}
                style={{
                    borderRadius: '0.75rem',
                    resize: 'vertical',
                    border: '2px solid #e0e7ff',
                    transition: 'all 0.3s ease'
                }}
                variants={inputHoverVariants}
                whileHover="hover"
                whileFocus="focus"
            />
        </motion.div>
    );
};

export default TextInput;
