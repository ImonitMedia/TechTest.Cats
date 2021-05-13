export function deriveScore(score: []) {
  return score.reduce((prev, cur) => prev + cur.value, 0);
}
