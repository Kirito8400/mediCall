import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, chatHistory } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      console.error("Perplexity API key not found in environment variables");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    // Prepare messages for Perplexity API - simplified approach
    const contextualMessage = `You are a helpful AI assistant for a doctors appointment platform. Please help with: ${message}\n\nProvide concise, helpful, and professional responses. For specific medical advice, remind users to consult healthcare professionals.`;

    const messages = [{ role: "user", content: contextualMessage }];

    // Call Perplexity API
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Perplexity API error:", response.status, errorData);

      if (response.status === 401) {
        return NextResponse.json(
          { error: "Authentication failed. Please check API key." },
          { status: 401 }
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to get AI response. Please try again." },
          { status: 500 }
        );
      }
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response format:", data);
      return NextResponse.json(
        { error: "Invalid response from AI service" },
        { status: 500 }
      );
    }

    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({
      message: aiResponse,
      success: true,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to send messages." },
    { status: 405 }
  );
}
