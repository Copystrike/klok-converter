export const integerToNlNl = (input: number): string => {
  const dutchMegas = [
    "",
    "duizend",
    "miljoen",
    "miljard",
    "biljoen",
    "biljard",
    "triljoen",
    "triljard",
    "septiljoen",
    "octillion",
    "noniljoen",
    "decillion"
  ]
  const dutchUnits = [
    "nul",
    "één",
    "twee",
    "drie",
    "vier",
    "vijf",
    "zes",
    "zeven",
    "acht",
    "negen"
  ]
  const dutchTens = [
    "nul",
    "tien",
    "twintig",
    "dertig",
    "veertig",
    "vijftig",
    "zestig",
    "zeventig",
    "tachtig",
    "negentig"
  ]
  const dutchTeens = [
    "tien",
    "elf",
    "twaalf",
    "dertien",
    "veertien",
    "vijftien",
    "zestien",
    "zeventien",
    "achttien",
    "negentien"
  ]

  const words = []
  if (input < 0) {
    words.push("minder")
    input *= -1
  }

  // split integer in triplets
  const triplets = integerToTriplets(input)

  // zero is a special case
  if (triplets.length === 0) {
    return "nul"
  }

  // iterate over triplets
  for (let idx = triplets.length - 1; idx >= 0; idx--) {
    const triplet = triplets[idx]
    const tripletWords = []

    // nothing todo for empty triplet
    if (triplet === 0) {
      continue
    }

    // three-digits
    const hundreds = Math.floor(triplet / 100) % 10
    const tens = Math.floor(triplet / 10) % 10
    const units = triplet % 10

    switch (hundreds) {
      case 0:
        break
      case 1:
        tripletWords.push("honderd")
        break
      default:
        tripletWords.push(`${dutchUnits[hundreds]}honderd`)
        break
    }

    if (tens === 0 && units === 0) {
      tripletEnd(tripletWords, idx, words, dutchMegas)
    } else {
      switch (tens) {
        case 0:
          tripletWords.push(dutchUnits[units])
          break
        case 1:
          tripletWords.push(dutchTeens[units])
          break
        default:
          if (units > 0) {
            const word = `${dutchUnits[units]}en${dutchTens[tens]}`
            tripletWords.push(word)
          } else {
            tripletWords.push(dutchTens[tens])
          }
          break
      }

      tripletEnd(tripletWords, idx, words, dutchMegas)
    }
  }

  return words.join(" ")
}

function integerToTriplets(input: number): number[] {
  const triplets = []

  while (input > 0) {
    const triplet = input % 1000
    triplets.push(triplet)
    input = Math.floor(input / 1000)
  }

  return triplets
}

function tripletEnd(tripletWords: string[], idx: number, words: string[], dutchMegas: string[]): void {
  if (idx === 0) {
    words.push(tripletWords.join(""))
  } else if (idx === 1) {
    tripletWords.push(dutchMegas[idx])
    words.push(tripletWords.join(""))
  } else {
    words.push(tripletWords.join(""))
    words.push(dutchMegas[idx])
  }
}


