import Cell from "../Cell/Cell";
import { useState, useEffect, createContext, useRef } from "react";
import list from "./list.json";
import Key from "../Key/Key";

const defaultArray = (size: number) => {
  const grid: Array<Array<String>> = [];
  for (let i = 0; i < 6; i++) {
    grid.push([]);
    for (let j = 0; j < size; j++) {
      grid[i].push("");
    }
  }
  return grid;
};

export type ContextType = {
  validationState: Array<Array<String>>;
  setValidationState: (value: Array<Array<String>>) => void;
};

export const WordleContext = createContext<ContextType>({
  validationState: defaultArray(5),
  setValidationState: () => {},
});
interface Props {
  size: number;
}
type Letter = {
  letter: string;
  state: string;
};
const generateAlphabet = () => {
  const alphabet: Array<Letter> = [];
  for (let i = 0; i < 26; i++) {
    alphabet.push({
      letter: String.fromCharCode(65 + i).toUpperCase(),
      state: "",
    });
  }
  return alphabet;
};

function Grid({ size }: Props) {
  const [validation, setValidation] = useState<Array<Array<String>>>(
    defaultArray(size)
  );
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wordle, setWordle] = useState<Array<Array<String>>>(
    defaultArray(size)
  );
  const [word, setWord] = useState("");
  const [rowId, setRowId] = useState<number>(0);
  const [colId, setColId] = useState<number>(0);
  const [alphabet, setAlphabet] = useState<Array<Letter>>(generateAlphabet());

  const rowIdRef = useRef(rowId);
  const colIdRef = useRef(colId);
  const wordleRef = useRef(wordle);
  const validationRef = useRef(validation);
  const sizeRef = useRef(size);
  const wordRef = useRef(word);
  const alphabetRef = useRef(alphabet);
  const isFinishedRef = useRef(isFinished);

  alphabetRef.current = alphabet;
  isFinishedRef.current = isFinished;
  wordRef.current = word;
  sizeRef.current = size;
  rowIdRef.current = rowId;
  colIdRef.current = colId;
  wordleRef.current = wordle;
  validationRef.current = validation;

  function flashError() {
    let newValidation = [...[...validationRef.current]];
    for (let i = 0; i < sizeRef.current; i++) {
      newValidation[rowIdRef.current][i] = "wrong";
    }
    setValidation(newValidation);
    setTimeout(() => {
      let validationCleanUp = [...[...validationRef.current]];
      for (let i = 0; i < sizeRef.current; i++) {
        validationCleanUp[rowIdRef.current][i] = "";
      }
      setValidation(validationCleanUp);
    }, 1000);
  }
  const handleKey = (key: string) => {
    if (isFinishedRef.current) {
      return;
    }

    if (key.match(/^[a-zA-Z]$/)) {
      if (colIdRef.current < sizeRef.current) {
        let wordleNew = [...wordleRef.current];
        wordleNew[rowIdRef.current][colIdRef.current] = key.toUpperCase();
        setWordle(wordleNew);
        setColId(colIdRef.current + 1);
      }
    } else {
      if (key === "Backspace" && colIdRef.current > 0) {
        let wordleNew = [...wordleRef.current];
        wordleNew[rowIdRef.current][colIdRef.current - 1] = "";
        setWordle(wordleNew);
        setColId(colIdRef.current - 1);
      } else {
        if (key === "Enter") {
          if (colIdRef.current < sizeRef.current) return;
          let guess = wordleRef.current[rowIdRef.current].join("");

          if (sizeRef.current === 5) {
            if (!list.word5.includes(guess.toLowerCase())) {
              flashError();
              return;
            }
          }
          if (sizeRef.current === 6) {
            if (!list.word6.includes(guess.toLowerCase())) {
              flashError();
              return;
            }
          }
          if (sizeRef.current === 7) {
            if (!list.word7.includes(guess.toLowerCase())) {
              flashError();
              return;
            }
          }

          if (wordRef.current === guess) {
            let newValidation = [...[...validationRef.current]];
            let newAlphabet = [...alphabetRef.current];
            for (let i = 0; i < sizeRef.current; i++) {
              newValidation[rowIdRef.current][i] = "valid";
              newAlphabet[guess.charCodeAt(i) - 65].state = "key-valid";
            }
            setAlphabet(newAlphabet);
            setValidation(newValidation);
            setIsFinished(true);
            return;
          } else {
            let newValidation = [...[...validationRef.current]];
            let newAlphabet = [...alphabetRef.current];
            let removableWord = wordRef.current;
            let removableArray: Array<String> = removableWord.split("");
            for (let i = 0; i < sizeRef.current; i++) {
              if (guess[i] === wordRef.current[i]) {
                removableArray = removableWord.split("");
                removableArray[i] = " ";
                removableWord = removableArray.join("");
              }
            }
            for (let i = 0; i < sizeRef.current; i++) {
              if (removableWord[i] === " ") {
                newValidation[rowIdRef.current][i] = "valid";
                newAlphabet[guess[i].charCodeAt(0) - 65].state = "key-valid";
              } else if (removableArray.includes(guess[i])) {
                newValidation[rowIdRef.current][i] = "in";
                newAlphabet[guess[i].charCodeAt(0) - 65].state =
                  newAlphabet[guess[i].charCodeAt(0) - 65].state === "key-valid"
                    ? "key-valid"
                    : "key-in";
              } else {
                newAlphabet[guess[i].charCodeAt(0) - 65].state = "key-not-in";
              }
            }
            setAlphabet(newAlphabet);
            setValidation(newValidation);
            setRowId(rowIdRef.current + 1);
            setColId(0);
          }
        }
      }
    }
  };

  function restart() {
    setWordle(defaultArray(size));
    setValidation(defaultArray(size));
    setRowId(0);
    setColId(0);
    setIsFinished(false);
    setAlphabet(generateAlphabet());
    if (size === 5) {
      setWord(
        list.word5[Math.floor(Math.random() * list.word5.length)].toUpperCase()
      );
    } else if (size === 6) {
      setWord(
        list.word6[Math.floor(Math.random() * list.word6.length)].toUpperCase()
      );
    } else if (size === 7) {
      setWord(
        list.word7[Math.floor(Math.random() * list.word7.length)].toUpperCase()
      );
    }
  }

  const handleEventKeyboard = (e: KeyboardEvent) => {
    handleKey(e.key);
  };

  useEffect(() => {
    document.addEventListener("keyup", handleEventKeyboard);
    return () => {
      document.removeEventListener("keyup", handleEventKeyboard);
    };
  }, []);

  useEffect(() => {
    restart();
  }, [size]);

  useEffect(() => {
    if (rowIdRef.current === 6) {
      setIsFinished(true);
    }
  }, [rowId]);

  return (
    <WordleContext.Provider
      value={{ validationState: validation, setValidationState: setValidation }}
    >
      <div
        className={
          "flex flex-col justify-center content-center items-center mt-5"
        }
      >
        {wordle.map((row: Array<String>, i: number) => {
          return (
            <div key={i} className={"flex "}>
              {row.map((cell: String, j: number) => {
                return <Cell key={`${i} ${j}`} value={cell} row={i} col={j} />;
              })}
            </div>
          );
        })}
      </div>
      <div className="keyboard">
        <div className="flex justify-center content-center mt-3">
          <Key
            letter="A"
            state={alphabet["a".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="Z"
            state={alphabet["z".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="E"
            state={alphabet["e".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="R"
            state={alphabet["r".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="T"
            state={alphabet["t".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="Y"
            state={alphabet["y".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="U"
            state={alphabet["u".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="I"
            state={alphabet["i".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="O"
            state={alphabet["o".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="P"
            state={alphabet["p".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
        </div>
        <div className="flex justify-center content-center mt-1">
          <Key
            letter="Q"
            state={alphabet["q".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="S"
            state={alphabet["s".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="D"
            state={alphabet["d".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="F"
            state={alphabet["f".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="G"
            state={alphabet["g".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="H"
            state={alphabet["h".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="J"
            state={alphabet["j".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="K"
            state={alphabet["k".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="L"
            state={alphabet["l".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="M"
            state={alphabet["m".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
        </div>
        <div className="flex justify-center content-center mt-1">
          <Key
            letter="Enter"
            state={{ letter: "Enter", state: "" }}
            handleClik={handleKey}
          />
          <Key
            letter="W"
            state={alphabet["w".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="X"
            state={alphabet["x".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="C"
            state={alphabet["c".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="V"
            state={alphabet["v".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="B"
            state={alphabet["b".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="N"
            state={alphabet["n".charCodeAt(0) - 97]}
            handleClik={handleKey}
          />
          <Key
            letter="Backspace"
            state={{ letter: "Backspace", state: "" }}
            handleClik={handleKey}
          />
        </div>
      </div>
      {isFinished && (
        <>
          {" "}
          <button
            className={"flex mx-auto mt-5 btn btn-primary"}
            onClick={() => restart()}
          >
            Restart the game : {word}
          </button>
        </>
      )}
    </WordleContext.Provider>
  );
}

export default Grid;
