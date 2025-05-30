// API service functions for processing meeting data

export const processMeetingFile = async (file) => {
  const formData = new FormData();
  formData.append("meeting_file", file);

  const response = await fetch("/api/process-meeting", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to process meeting file");
  }

  return response.json();
};

export const processMeetingText = async (text) => {
  const response = await fetch("/api/process-meeting", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to process meeting text");
  }

  return response.json();
};

export const processMeeting = async ({ file, text }) => {
  if (file) {
    return processMeetingFile(file);
  } else if (text && text.trim()) {
    return processMeetingText(text);
  } else {
    throw new Error("Please provide either text input or upload a file");
  }
};
