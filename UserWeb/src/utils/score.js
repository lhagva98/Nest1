export function scorePercentage(right, wrong) {
  return Math.floor((right * 100) / (right + wrong), 2);
}
