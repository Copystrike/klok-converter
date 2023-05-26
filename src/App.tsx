import { useEffect, useState } from "react";
import { parseTime, patterns } from "./lib/tijd-converter.ts";
import { Label } from "./components/ui/label.tsx";
import { Input } from "./components/ui/input.tsx";
import { Checkbox } from "./components/ui/checkbox.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table.tsx";

function App() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [isAvond, setIsAvond] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { error, data } = parseTime(inputText, isAvond);

    if (error) {
      setResultText("");
      setError(error);
      return;
    }

    setResultText(data?.time!);
    setError(null);
  }, [inputText, isAvond]);

  return (
    <main className="bg-primary text-primary-foreground min-h-screen min-w-full flex flex-col place-items-center select-none">
      <section className="flex flex-col gap-y-5 py-5 w-full md:w-1/2 px-5">
        {/* Outputs */}
        <section>
          <div className="text-center">
            <h1 className="font-bold">Uitkomst</h1>
            <h2 className="!select-auto">
              {error ? error : resultText + " uur"}
            </h2>
          </div>
        </section>
        {/* Inputs */}
        <section>
          <div>
            <Label htmlFor="timeText">Tijds zin</Label>
            <Input
              type="text"
              id="timeText"
              className="my-1.5"
              placeholder="5 voor half 10"
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="place-self-center sm:w-1/4">
            <Checkbox
              id="avond"
              className="border-white dark:border-black mr-2"
              onCheckedChange={() => setIsAvond(!isAvond)}
            />
            <label
              htmlFor="avond"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Avond tijd.
            </label>
          </div>
        </section>
        {/* Info */}
        <section>
          <h1 className="text-1xl font-bold">Informatie</h1>
          <p className="text-sm text-gray-500">
            Wij zijn er van op de hoogte dat je uuren boven de 24 of onder de 0
            kan hebben. (bv 25:99 of -1:00)
            <br />
            Dit is een bewuste keuze en zal voor nu niet veranderen.
          </p>
        </section>
        {/* Info */}
        <section>
          <h1 className="text-1xl font-bold">
            Ondersteunde tijds uitdrukkingen
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tijd</TableHead>
                <TableHead>Voorbeeld</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patterns.map((pattern) => (
                <TableRow key={pattern.name}>
                  <TableCell className="font-medium">{pattern.name}</TableCell>
                  <TableCell>{pattern.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </section>
    </main>
  );
}

export default App;
