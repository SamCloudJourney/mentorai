// Adjust difficulty based on correctness and current level
export function adaptDifficulty(correct: boolean, currentLevel: number): number {
  // Simple stub: increase level if correct, decrease if wrong but not below zero
  if (correct) {
    return currentLevel + 1;
  } else {
    return currentLevel > 0 ? currentLevel - 1 : 0;
  }
}
