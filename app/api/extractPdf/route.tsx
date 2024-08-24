import { NextResponse, NextRequest } from 'next/server';
import path from 'path';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { text } from 'node:stream/consumers';

// Define the interface for the request body
interface ExtractPDFRequest {
  fileName: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the file name
    const { fileName }: ExtractPDFRequest = await req.json();

    // Construct the full file path (assuming the file is in the public directory)
    const filePath = path.join(process.cwd(), 'public', 'profile', fileName);

    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    return NextResponse.json({ text: docs[0].pageContent });
        
  } catch (error: unknown) {
    // Handle errors and send an error response
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error handling the POST request:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
