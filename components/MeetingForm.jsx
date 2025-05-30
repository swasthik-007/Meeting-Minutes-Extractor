'use client';

import { motion } from 'framer-motion';
import FileUpload from './FileUpload';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import ErrorAlert from './ErrorAlert';

const MeetingForm = ({
    input,
    setInput,
    file,
    setFile,
    error,
    setError,
    loading,
    onSubmit
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <>
            <motion.form
                onSubmit={handleSubmit}
                className="mb-4"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
                <FileUpload
                    file={file}
                    setFile={setFile}
                    error={error}
                    setError={setError}
                />

                <TextInput
                    input={input}
                    setInput={setInput}
                />

                <SubmitButton
                    loading={loading}
                    disabled={!input.trim() && !file}
                />
            </motion.form>

            <ErrorAlert error={error} />
        </>
    );
};

export default MeetingForm;
