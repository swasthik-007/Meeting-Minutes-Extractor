'use client';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modalFix.css';

// Components
import AppLayout from '../components/AppLayout';
import MeetingForm from '../components/MeetingForm';
import ResultsModal from '../components/ResultsModal';

// Custom Hook
import { useMeetingProcessor } from '../lib/hooks';

// Set Modal App Element
Modal.setAppElement('body');

export default function Home() {
  const {
    input,
    setInput,
    file,
    setFile,
    result,
    loading,
    error,
    setError,
    modalOpen,
    handleSubmit,
    closeModal
  } = useMeetingProcessor();

  return (
    <>
      <AppLayout>
        <MeetingForm
          input={input}
          setInput={setInput}
          file={file}
          setFile={setFile}
          error={error}
          setError={setError}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </AppLayout>

      <ResultsModal
        isOpen={modalOpen}
        onClose={closeModal}
        result={result}
      />
    </>
  );
}