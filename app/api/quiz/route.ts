import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: implement quiz generator
  return NextResponse.json({
    itemId: 'sample-item',
    prompt: 'This is a sample quiz question.',
    answerSchema: { type: 'string' },
    solutionSteps: 'This is a sample solution.',
  });
}
