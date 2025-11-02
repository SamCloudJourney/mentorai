export function calculateXP(correct: boolean, partial: boolean = false): number {
  if (correct) return 10;
  if (partial) return 5;
  return 2;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
