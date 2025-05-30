'use client';

import { useState, useEffect } from 'react';

const TypewriterText = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let timeout;
        if (text) {
            timeout = setTimeout(() => {
                let i = 0;
                const typing = setInterval(() => {
                    setDisplayText(text.slice(0, i + 1));
                    i++;
                    if (i === text.length) clearInterval(typing);
                }, 30);
            }, delay);
        }
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayText}</span>;
};

export default TypewriterText;
