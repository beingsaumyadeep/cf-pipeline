# DeepSeek Chat Setup

## Overview
The chat functionality uses DeepSeek AI API on the server-side for secure API key handling.

## Setup Instructions

### 1. Get DeepSeek API Key
- Visit [DeepSeek Platform](https://platform.deepseek.com/)
- Sign up or log in
- Generate an API key

### 2. Local Development
Create a `.dev.vars` file in the project root:
```bash
DEEPSEEK_API_KEY=your_actual_api_key_here
```

### 3. Production Deployment
Set the environment variable in Cloudflare Workers:
```bash
wrangler secret put DEEPSEEK_API_KEY
```
Or via Cloudflare Dashboard:
- Go to Workers & Pages
- Select your worker
- Settings → Variables → Add variable
- Name: `DEEPSEEK_API_KEY`
- Value: Your API key
- Save

## How It Works

### Architecture
1. **Client (ChatUI)** - Sends user messages to `/api/chat`
2. **Server (api.chat.ts)** - Receives messages, calls DeepSeek API with conversation history
3. **DeepSeek API** - Processes conversation and returns AI response
4. **Server** - Returns AI response to client
5. **Client** - Displays response in chat UI

### Features
- ✅ Server-side API key management (secure)
- ✅ Conversation history maintained in client state
- ✅ Temporary chat (clears on refresh)
- ✅ Loading indicators
- ✅ Error handling
- ✅ No database required

### API Endpoint
**POST** `/api/chat`

Request body:
```json
{
  "message": "User's message",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}
```

Response:
```json
{
  "message": "AI response",
  "success": true
}
```

## Testing
1. Start dev server: `npm run dev`
2. Navigate to home page
3. Type a message in the chat
4. AI should respond within a few seconds

## Troubleshooting
- **"DeepSeek API key not configured on server"** - Add DEEPSEEK_API_KEY to .dev.vars
- **"Server error: 401"** - Invalid API key
- **"Server error: 429"** - Rate limit exceeded
- **Network errors** - Check internet connection and API endpoint
