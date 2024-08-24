'use client';

export const generateAnswer = async (userMessage: string, resumeText: string, onDataChunk: (chunk: string) => void) => {
  const response = await fetch('/api/generateAnswer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userMessage, resumeText })
  });

  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunk = decoder.decode(value, { stream: !done });
    onDataChunk(chunk); // Process each chunk as it arrives
  }
};
