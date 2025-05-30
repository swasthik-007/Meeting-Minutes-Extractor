# Meeting Minutes Extractor

An AI-powered web application that automatically extracts structured information from meeting notes and transcripts. Built with Next.js, React, and Google's Gemini AI, featuring a beautiful animated interface with drag-and-drop file upload.

![Meeting Minutes Extractor](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple?style=for-the-badge)

## Features

- 🤖 **AI-Powered Analysis** - Uses Google Gemini 2.0 Flash for intelligent content extraction
- 📁 **File Upload** - Drag-and-drop .txt file support with validation
- ✏️ **Text Input** - Direct text input for meeting transcripts
- 📊 **Structured Output** - Extracts summaries, decisions, and action items
- 🎨 **Beautiful UI** - Animated interface with particles and smooth transitions
- 📄 **PDF Export** - Generate professional PDF reports
- 📋 **Copy to Clipboard** - Easy sharing of results
- 💾 **JSON Download** - Export structured data
- 📱 **Responsive Design** - Works on desktop and mobile

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key

### 1. Clone & Install

```bash
git clone <repository-url>
cd meeting-minutes-extractor
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get your Gemini API key:**

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

### 3. Run the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 4. Access the Application

- **Web Interface**: http://localhost:3000
- **API Endpoint**: http://localhost:3000/api/process-meeting

## API Testing

### Using curl

#### 1. Test with File Upload

```bash
# Upload a .txt file
curl -X POST http://localhost:3000/api/process-meeting \
  -F "meeting_file=@sample_meetings/meeting1.txt"
```

#### 2. Test with Raw Text (JSON)

```bash
# Send text content as JSON
curl -X POST http://localhost:3000/api/process-meeting \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Team meeting today. We decided to launch the product on June 10. John will prepare the documentation by June 5. Sarah needs to coordinate with the marketing team."
  }'
```

#### 3. Test with Raw Text (Plain)

```bash
# Send plain text
curl -X POST http://localhost:3000/api/process-meeting \
  -H "Content-Type: text/plain" \
  -d "Weekly standup meeting. Discussed project timeline. Mike will finish the API by Friday. Lisa to review the code over the weekend."
```

#### 4. Health Check

```bash
# Check API status
curl -X GET http://localhost:3000/api/process-meeting
```

### Using Postman

#### File Upload Request:

- **Method**: POST
- **URL**: `http://localhost:3000/api/process-meeting`
- **Body**:
  - Type: `form-data`
  - Key: `meeting_file`
  - Type: File
  - Value: Select a .txt file

#### JSON Text Request:

- **Method**: POST
- **URL**: `http://localhost:3000/api/process-meeting`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "text": "Your meeting notes here..."
  }
  ```

## Sample Outputs

### Input: Meeting Notes

```text
Team Sync – May 26

Attendees: Ravi, Priya, Amit, Sarah

Discussion Points:
- We'll launch the new product on June 10.
- Ravi to prepare onboarding docs by June 5.
- Priya will follow up with logistics team on packaging delay.
- Beta users requested a mobile-first dashboard.

Action Items:
- Sarah to coordinate with design team for mobile UI mockups
- Amit will handle the server deployment by June 8
```

### Output: Structured JSON

```json
{
  "summary": "Team sync meeting held on May 26 with 4 attendees. Main focus was on the new product launch scheduled for June 10 and addressing beta user feedback for mobile-first dashboard requirements.",
  "decisions": [
    "Launch the new product on June 10",
    "Implement mobile-first dashboard based on beta user feedback"
  ],
  "actionItems": [
    {
      "task": "Prepare onboarding docs",
      "owner": "Ravi",
      "due": "June 5"
    },
    {
      "task": "Follow up with logistics team on packaging delay",
      "owner": "Priya",
      "due": null
    },
    {
      "task": "Coordinate with design team for mobile UI mockups",
      "owner": "Sarah",
      "due": null
    },
    {
      "task": "Handle the server deployment",
      "owner": "Amit",
      "due": "June 8"
    }
  ]
}
```

## Sample Files

The project includes two sample meeting files for testing:

### 📁 `sample_meetings/meeting1.txt`

- Team sync meeting with product launch planning
- Contains attendees, decisions, and action items
- Good for testing basic extraction

### 📁 `sample_meetings/meeting2.txt`

- Product review meeting with Q2 planning
- More complex structure with concerns and detailed discussions
- Tests advanced parsing capabilities

You can use these files to test the application:

```bash
# Test with sample file 1
curl -X POST http://localhost:3000/api/process-meeting \
  -F "meeting_file=@sample_meetings/meeting1.txt"

# Test with sample file 2
curl -X POST http://localhost:3000/api/process-meeting \
  -F "meeting_file=@sample_meetings/meeting2.txt"
```

## Project Structure

```
meeting-minutes-extractor/
├── app/
│   ├── page.jsx                 # Main application page
│   ├── layout.js               # Root layout
│   └── api/
│       └── process-meeting/
│           └── route.js        # API endpoint
├── components/                 # Reusable UI components
│   ├── AppLayout.jsx          # Main layout with animations
│   ├── MeetingForm.jsx        # Form component
│   ├── ResultsModal.jsx       # Results display modal
│   └── ...                    # Other components
├── lib/                       # Utilities and services
│   ├── api.js                 # API service functions
│   ├── hooks.js               # Custom React hooks
│   ├── utils.js               # Helper utilities
│   └── animations.js          # Framer Motion variants
├── sample_meetings/           # Sample .txt files
└── public/                    # Static assets
```

## Error Handling

The API provides detailed error responses:

```json
{
  "error": "No meeting content provided. Please send a .txt file or raw text in the request body.",
  "usage": "Send POST request with either a .txt file upload or raw text content"
}
```

Common error codes:

- `400`: Bad request (invalid input, wrong file type)
- `429`: Rate limit exceeded
- `500`: Internal server error

## Performance

- **Response Time**: ~2-5 seconds for typical meeting notes
- **File Size Limit**: Recommended < 50KB for .txt files
- **Timeout**: 30 seconds for AI processing
- **Rate Limiting**: Handled by Google Gemini API

## Technologies Used

- **Frontend**: Next.js 15.3.3, React 19, Framer Motion
- **Backend**: Next.js API Routes
- **AI**: Google Gemini 2.0 Flash
- **Styling**: Tailwind CSS, Bootstrap
- **File Handling**: Native HTML5 File API
- **PDF Generation**: jsPDF

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Need help?** Check the [troubleshooting guide](./REFACTORING_SUMMARY.md) or [hydration fix documentation](./HYDRATION_FIX.md).
