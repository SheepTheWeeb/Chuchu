export function convertNumberToHearts(value: number): string {
  const maxHearts = 4
  let hearts = ''
  for (let i = 0; i < maxHearts; i++) {
    if (i < value) {
      hearts += '❤️'
    } else {
      hearts += '🖤'
    }
  }
  return hearts
}

export function convertNumberToPoo(value: number): string {
  if (value === 0) {
    return '✨'
  }

  const maxPoo = 5
  let poo = ''
  for (let i = 0; i < maxPoo; i++) {
    if (i < value) {
      poo += '💩'
    }
  }
  return poo
}
