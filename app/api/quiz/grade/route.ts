import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Stub grade route: returns dummy evaluation
  return NextResponse.json({
    correct: true,
    feedback: 'Stub feedback',
    masteryDelta: 0
  });
}
