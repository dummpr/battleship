export const toScoreFormat = (score: number) => {
  let prefix = ''
  if (score < 10 && score >= 0) {
    prefix = '0'
  }
  return `${prefix}${score.toFixed(0)}`
}
