import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Stub plan route: returns dummy plan
  return NextResponse.json({
    plan: {
      week_start: new Date().toISOString().split('T')[0],
      sessions: [
        { subject: 'Math', topics: ['Algebra'], goals: 'Example goals' }
      ]
    }
  });
}
