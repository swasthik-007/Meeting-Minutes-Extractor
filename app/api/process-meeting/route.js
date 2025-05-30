import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(request) {
  try {
    let meetingText = "";
    const contentType = request.headers.get("content-type");

    // Handle different content types
    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("meeting_file");

      if (file) {
        if (file.type !== "text/plain") {
          return NextResponse.json(
            { error: "Only .txt files are allowed" },
            { status: 400 }
          );
        }
        const bytes = await file.arrayBuffer();
        meetingText = new TextDecoder().decode(bytes);
      } else {
        const textField = formData.get("text");
        if (textField) {
          meetingText = textField;
        }
      }
    } else if (contentType?.includes("application/json")) {
      const body = await request.json();
      meetingText = body.text || body.content || "";
    } else {
      // Handle raw text
      meetingText = await request.text();
    }

    // Validate input
    if (!meetingText.trim()) {
      return NextResponse.json(
        {
          error:
            "No meeting content provided. Please send a .txt file or raw text in the request body.",
          usage:
            "Send POST request with either a .txt file upload or raw text content",
        },
        { status: 400 }
      );
    }

    // Create AI prompt for structured extraction
    const prompt = `
Analyze the following meeting notes and extract the key information. Return ONLY a valid JSON object with this exact structure:

Meeting Notes:
${meetingText}

Expected JSON format:
{
  "summary": "2-3 sentence summary of the meeting",
  "decisions": ["list of key decisions made during the meeting"],
  "actionItems": [
    {
      "task": "specific task description",
      "owner": "person responsible (if mentioned, otherwise null)",
      "due": "deadline (if mentioned, otherwise null)"
    }
  ]
}

Instructions:
- Summary: 2-3 sentences maximum capturing the main points
- Decisions: Concrete decisions made during the meeting
- Action items: Specific tasks with owners and deadlines when mentioned
- Use null for missing owner or due date information
- Return ONLY valid JSON, no additional text, markdown, or formatting
- Ensure all strings are properly escaped for JSON
`;

    // Call Gemini API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    let result;
    try {
      result = await model.generateContent(prompt);
      clearTimeout(timeoutId);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error("AI API request timed out");
      }
      throw error;
    }

    const response = await result.response;
    let aiText = response.text();

    // Clean up the response to ensure it's valid JSON
    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Remove any leading/trailing non-JSON content
    const jsonStart = aiText.indexOf("{");
    const jsonEnd = aiText.lastIndexOf("}");

    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      aiText = aiText.substring(jsonStart, jsonEnd + 1);
    }

    // Parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(aiText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("AI Response:", aiText);

      return NextResponse.json(
        {
          error: "Failed to parse AI response. Please try again.",
          debug:
            process.env.NODE_ENV === "development"
              ? { aiResponse: aiText }
              : undefined,
        },
        { status: 500 }
      );
    }

    // Validate response structure
    const requiredFields = ["summary", "decisions", "actionItems"];
    for (const field of requiredFields) {
      if (!(field in parsedResult)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 500 }
        );
      }
    }

    if (!Array.isArray(parsedResult.decisions)) {
      parsedResult.decisions = [];
    }

    if (!Array.isArray(parsedResult.actionItems)) {
      parsedResult.actionItems = [];
    }

    // Ensure action items have the correct structure
    parsedResult.actionItems = parsedResult.actionItems.map((item) => ({
      task: item.task || "",
      owner: item.owner || null,
      due: item.due || null,
    }));

    // Return successful response
    return NextResponse.json(parsedResult, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);

    // Handle specific error types
    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "AI service configuration error" },
        { status: 500 }
      );
    }

    if (error.message?.includes("quota") || error.message?.includes("limit")) {
      return NextResponse.json(
        { error: "AI service quota exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error occurred while processing meeting notes",
        message:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Meeting Minutes Extractor API is running",
    endpoints: {
      "POST /api/process-meeting":
        "Process meeting notes (file upload or raw text)",
    },
  });
}
