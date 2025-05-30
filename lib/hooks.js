import { useState } from "react";
import { processMeeting } from "../lib/api";

export const useMeetingProcessor = () => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await processMeeting({ file, text: input });
      setResult(data);
      setModalOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    // State
    input,
    setInput,
    file,
    setFile,
    result,
    loading,
    error,
    setError,
    modalOpen,

    // Actions
    handleSubmit,
    closeModal,
  };
};
