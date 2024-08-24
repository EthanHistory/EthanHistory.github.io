import { NextResponse, NextRequest } from 'next/server';
import { FunctionDeclarationSchemaType } from '@google/generative-ai';
import { geminiClient } from '@/app/util/geminiClient';
import { JsonOutputParser } from "@langchain/core/output_parsers";

type MessageType = {
  text: string;
  role: string;
};

export async function POST(req: NextRequest) {
  try {
    const { messages, resumeText } = await req.json();

    const generationConfig = {
      temperature: 0.3,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 30,
      responseMimeType: "application/json",
      responseSchema: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          output_type: {
            type: FunctionDeclarationSchemaType.STRING,
            enum: ["question", "resume"],
            properties: {}
          },
          output_text: {
            type: FunctionDeclarationSchemaType.STRING,
            properties: {}
          }
        },
      },
    };

    const systemInstruction = 
    `You are a user who is interested in Inseong Han. You want to ask Inseong some new / follow-up questions about him or want Inseong to show resume or ETC.
    If you want to ask question, output_type should be "question" and the output_text should be the question that you want to ask.
    If you want Inseong show you the resume, output_type should be "resume" and the output_text should be empty.
    You don't want to ask or request the same thing again.

    <EXAMPLE>
      INPUT: Sure, here's Inseong's contact information:

      * Personal Email: inssa1102@gmail.com
      * Work Email: hani@legal.regn.net

      Let me know if you need anything else!


      OUTPUT:
      {
        "output_type":"resume",
        "output_text":""
      }
    </EXAMPLE>
    `;

    const model = geminiClient.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction,
      generationConfig: generationConfig,
    });

    // Initialize chat history with default messages
    let history = [
      {
        role: 'user',
        parts: [{ text: `Inseong's resume: ${resumeText}` }],
      },
      {
        role: 'user',
        parts: [{ text: `Inseong's contact:
          - personal email: inssa1102@gmail.com
          - work email: hani@legal.regn.net` }],
      },
    ];

    // Append new messages from the request to the history
    if (messages && Array.isArray(messages)) {
      messages.forEach((message: MessageType) => {
        history.push({
          role: message.role,
          parts: [{ text: message.text }],
        });
      });
    }

    const prompt = `Please ask me if you have any quesiton or need something.`

    const chatSession = model.startChat({ history });

    const result = await chatSession.sendMessage([prompt]);

    const parser = new JsonOutputParser();
    const structured_response = await parser.invoke(result.response.text());

    return NextResponse.json({ data: structured_response });

  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error handling the POST request:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
