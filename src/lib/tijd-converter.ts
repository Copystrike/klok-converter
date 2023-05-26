interface Result {
  data?: {
    time: string;
    regex: RegExp;
    explanation?: string;
  };
  error?: string;
}

interface HandlerParams {
  isAvond: boolean;
}

interface Pattern {
  name: string;
  regex: RegExp;
  handler: (input: string[], params: HandlerParams) => string;
  usage?: string;
}

function hourCorrection(hour: string, isAvond?: boolean): number {
  const parsedHour = parseInt(hour);

  return isAvond ? parsedHour + 12 : parsedHour;
}

export const patterns: Pattern[] = [
  // Voeg invoerpatronen toe met behulp van reguliere expressies en een bijbehorende handlerfunctie
  {
    name: "minuten",
    regex: /^(\d+) minuten$/,
    handler: ([minutes], params) => `00:${minutes.padStart(2, "0")}`,
    usage: "5 minuten",
  },
  {
    name: "uur",
    regex: /^(\d+) uur$/,
    handler: ([hour], params) =>
      `${hourCorrection(hour, params.isAvond)}:00`,
    usage: "5 uur",
  },
  {
    name: "half",
    regex: /^half (\d+)$/,
    handler: ([hour], params) =>
      `${hourCorrection(hour, params.isAvond) - 1}:30`,
    // Als het 5:00 uur is en je haalt er 30 minuten vanaf, dan wordt het 4:30 uur. Als je 1 uur in tweeën deelt, krijg je 30 minuten. Daarom trekken we 30 minuten af.
    usage: "half 5",
  },
  {
    name: "kwart over",
    regex: /^kwart over (\d+)$/,
    handler: ([hour], params) =>
      `${hourCorrection(hour, params.isAvond)}:15`,
    usage: "kwart over 5",
  },
  {
    name: "kwart voor",
    regex: /^kwart voor (\d+)$/,
    handler: ([hour], params) =>
      `${hourCorrection(hour, params.isAvond) - 1}:45`,
    usage: "kwart voor 5",
  },
  {
    name: "over",
    regex: /^(\d+) over (\d+)$/,
    handler: ([minutes, hour], params) =>
      `${hourCorrection(hour, params.isAvond)}:${minutes.padStart(2, "0")}`,
    usage: "5 over 5",
  },
  {
    name: "na",
    regex: /^(\d+) na (\d+)$/,
    handler: ([minutes, hour], params) =>
      `${hourCorrection(hour, params.isAvond)}:${minutes.padStart(2, "0")}`,
    usage: "5 na 5",
  },
  {
    name: "voor",
    regex: /^(\d+) voor (\d+)$/,
    handler: ([minutes, hour], params) =>
      `${hourCorrection(hour, params.isAvond) - 1}:${
        60 - parseInt(minutes)
      }`,
    usage: "5 voor 5",
  },
  {
    name: "voor half",
    regex: /^(\d+) voor half (\d+)$/,
    handler: ([minutes, hour], params) => {
      return `${hourCorrection(hour, params.isAvond) - 1}:${
        30 - parseInt(minutes)
      }`;
    },
    usage: "5 voor half 5",
  },
  {
    name: "over half",
    regex: /^(\d+) over half (\d+)$/,
    handler: ([minutes, hour], params) => {
      return `${hourCorrection(hour, params.isAvond) - 1}:${
        30 + parseInt(minutes)
      }`;
    },
    usage: "5 over half 5",
  },
  {
    name: "nu",
    regex: /^nu$/,
    handler: ([], params) =>
      new Date().toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    usage: "nu",
  },
];

export function parseTime(input: string, avond: boolean): Result {
  // Verwijder witruimte en zet de hele string in kleine letters
  input = input.toLowerCase();

  // Zoek het eerste invoerpatroon dat overeenkomt met de invoer
  const pattern = patterns.find((p) => p.regex.test(input));

  if (!pattern) {
    return { error: "Geen overeenkomend patroon gevonden" };
  }

  // Haal de overeenkomende groepen op uit de invoer met de reguliere expressie en gebruik de bijbehorende formatterfunctie om de uitvoer te genereren
  const match = input.match(pattern.regex);
  match?.shift()!;
  console.log(match);
  let time = pattern.handler(match!, { isAvond: avond });

  return {
    data: {
      time,
      regex: pattern.regex,
    },
  };
}
