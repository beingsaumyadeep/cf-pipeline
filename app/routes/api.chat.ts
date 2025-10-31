import type { Route } from "./+types/api.chat";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body: ChatRequest = await request.json();
    const { message, history } = body;

    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get DeepSeek API key from environment
    const apiKey = import.meta.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "DeepSeek API key not configured on server" },
        { status: 500 }
      );
    }

    // Build conversation history
    const messages = [
      ...history,
      { role: "user" as const, content: message }
    ];

    // Call DeepSeek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("DeepSeek API error:", error);
      return Response.json(
        { error: `DeepSeek API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json() as any;
    const aiMessage = data.choices[0]?.message?.content || "No response from AI";

    return Response.json({ 
      message: aiMessage,
      success: true 
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
