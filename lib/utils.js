import jsPDF from "jspdf";

// PDF Generation Utility
export const downloadPDF = (result) => {
  const doc = new jsPDF();
  let yPosition = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Meeting Minutes", 20, yPosition);
  yPosition += 15;

  // Date
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
  yPosition += 20;

  // Summary Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("📝 Summary", 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(
    result?.summary || "No summary available",
    170
  );
  doc.text(summaryLines, 20, yPosition);
  yPosition += summaryLines.length * 5 + 10;

  // Key Decisions Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("✅ Key Decisions", 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  if (result?.decisions && result.decisions.length > 0) {
    result.decisions.forEach((decision, i) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      const decisionLines = doc.splitTextToSize(`${i + 1}. ${decision}`, 170);
      doc.text(decisionLines, 20, yPosition);
      yPosition += decisionLines.length * 5 + 5;
    });
  } else {
    doc.text("No key decisions recorded", 20, yPosition);
    yPosition += 10;
  }

  yPosition += 10;

  // Action Items Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("🎯 Action Items", 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  if (result?.actionItems && result.actionItems.length > 0) {
    result.actionItems.forEach((item, i) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text(`${i + 1}. Task:`, 20, yPosition);
      doc.setFont("helvetica", "normal");

      const taskLines = doc.splitTextToSize(item.task, 150);
      doc.text(taskLines, 45, yPosition);
      yPosition += taskLines.length * 5;

      if (item.owner) {
        doc.setFont("helvetica", "bold");
        doc.text("Owner:", 25, yPosition);
        doc.setFont("helvetica", "normal");
        doc.text(item.owner, 50, yPosition);
        yPosition += 5;
      }

      if (item.due) {
        doc.setFont("helvetica", "bold");
        doc.text("Due:", 25, yPosition);
        doc.setFont("helvetica", "normal");
        doc.text(item.due, 45, yPosition);
        yPosition += 5;
      }

      yPosition += 5;
    });
  } else {
    doc.text("No action items recorded", 20, yPosition);
  }

  // Save the PDF
  doc.save("meeting-minutes.pdf");
};

// JSON Export Utility
export const downloadJSON = (result) => {
  const jsonData = {
    meetingMinutes: {
      summary: result?.summary,
      keyDecisions: result?.decisions,
      actionItems: result?.actionItems,
      extractedAt: new Date().toISOString(),
      metadata: {
        totalDecisions: result?.decisions?.length || 0,
        totalActionItems: result?.actionItems?.length || 0,
        wordCount: result?.summary?.split(" ").length || 0,
      },
    },
  };

  const dataStr = JSON.stringify(jsonData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "meeting-minutes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Clipboard Utility
export const copyToClipboard = (result, format = "json") => {
  let textToCopy;

  if (format === "json") {
    textToCopy = JSON.stringify(
      {
        summary: result?.summary,
        decisions: result?.decisions,
        actionItems: result?.actionItems,
      },
      null,
      2
    );
  } else {
    textToCopy = `MEETING SUMMARY:\n${
      result?.summary
    }\n\nKEY DECISIONS:\n${result?.decisions
      ?.map((d) => `• ${d}`)
      .join("\n")}\n\nACTION ITEMS:\n${result?.actionItems
      ?.map(
        (a) =>
          `• Task: ${a.task}${a.owner ? `\n  Owner: ${a.owner}` : ""}${
            a.due ? `\n  Due: ${a.due}` : ""
          }`
      )
      .join("\n\n")}`;
  }

  return navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      console.log("Copied to clipboard!");
      return true;
    })
    .catch((err) => {
      console.error("Failed to copy to clipboard:", err);
      return false;
    });
};

// File Management Utility
export const removeFile = (setFile, setError) => {
  setFile(null);
  setError("");
  // Reset file input
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.value = "";
  }
};

// File Validation Utility
export const validateFile = (file) => {
  if (file && file.type !== "text/plain") {
    return { isValid: false, error: "Please select a .txt file" };
  }
  return { isValid: true, error: null };
};

// Format file size utility
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
