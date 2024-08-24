import { NextResponse, NextRequest } from 'next/server';
import { StateGraph, StateGraphArgs } from "@langchain/langgraph";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { geminiClient } from '@/app/util/geminiClient';

// Define the state interface
interface AgentState {
  messages: BaseMessage[];
}

export async function POST(req: NextRequest) {
  try {
    const { userMessage, resumeText } = await req.json();

    const generationConfig = {
      temperature: 0.3,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 1000,
      responseMimeType: "text/plain",
    };

    const systemInstruction = 
    `You are Inseong Han. A Generative AI engineer @ LexisNexis. Please answer the user's question.
    You should answer like a human and in a real conversation. If you don't know something, don't mention it like [Previous company].`;

    const model = geminiClient.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction,
      generationConfig: generationConfig
    });

    // Initialize chat session with existing history
    const chatSession = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `Inseong's resume: ${resumeText}` }]
        },
        {
          role: 'user',
          parts: [{ text: `Inseong's contact:
            - personal email: inssa1102@gmail.com
            - work email: hani@legal.regn.net` }]
        }
      ]
    });

    // Begin streaming response
    const result = await chatSession.sendMessageStream([userMessage]);

    const stream = new ReadableStream({
      async start(controller) {
        // As chunks are received, they are pushed into the stream
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          controller.enqueue(new TextEncoder().encode(chunkText));
        }
        controller.close();
      },
      cancel() {
        console.log('Stream cancelled by the client');
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error handling the POST request:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
