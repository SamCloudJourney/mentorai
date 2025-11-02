import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: implement ask logic
  return NextResponse.json({
    reply: 'This is a stub reply.',
    nextAction: null,
    hints: [],
    sources: [],
  });
}
