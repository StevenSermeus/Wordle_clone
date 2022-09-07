import Cell from '../Cell/Cell'
import {useState, useEffect,createContext} from 'react'
import StyleCss from './Grid.module.css'
import list from './list.json'

const defaultArray = (size: number) => {
    const grid: Array<Array<String>> = [];
    for (let i = 0; i < 6; i++) {
        grid.push([]);
        for (let j = 0; j < size; j++) {
            grid[i].push("");
        }
    }
    return grid;
}
export type ContextType = {
    validationState: Array<Array<String>>;
    setValidationState: (value: Array<Array<String>>) => void;
}

export const WordleContext = createContext<ContextType>({validationState: defaultArray(5), setValidationState: () => {}});
interface Props{
    size: number
}
const update = (aa:Array<Array<String>>, fn:Function) =>
  aa.map((rowItem, y) => rowItem.map((value, x) => fn({ x, y, value })));

function Grid({size}: Props){
    const [validation, setValidation] = useState<Array<Array<String>>>(defaultArray(size));
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [wordle, setWordle] = useState<Array<Array<String>>>(defaultArray(size));
    const [word, setWord] = useState("");
    const [rowId, setRowId] = useState<number>(0);
    const [colId, setColId] = useState<number>(0);
    type functionCall = {
        x: number,
        y: number,
        value: String
    }
    function flashError(){
        setValidation(update(validation, ({ x, y, value }: functionCall) => {
            if(y === rowId){
                return "wrong";
            }
            return value;
        }));
        setTimeout(() => {
            setValidation(update(validation, ({ x, y, value }: functionCall) => {
                if(value === "wrong"){
                    return "";
                }
                return value;
            }));
        }, 1000);
    }
    const handleEvent = (e:KeyboardEvent) => {
        if(rowId < 6){
        if(e.key.match(/^[a-zA-Z]$/) && colId < size){
            setWordle((prev) =>
            update(prev, ({ x, y, value }:functionCall) => {
              if (x === colId && y === rowId) {
                return e.key.toLocaleUpperCase();
              }
              return prev[y][x];
            }));
            setColId(colId+1);
        }else if(e.key === "Backspace" && colId > 0){
            let newWordle = [...wordle];
            newWordle[rowId][colId-1] = "";
            setWordle(newWordle);
            setColId(colId-1);
        }
        else if(e.key === "Enter" && colId === size){
            let guess = wordle[rowId].join("").toUpperCase();

            if(size === 5){
                if(!list.word5.includes(guess.toLowerCase())){
                    flashError();
                    return
                }
            }else if(size === 6){
                if(!list.word6.includes(guess.toLowerCase())){
                    flashError()
                    return
                }
            }
            else if(size === 7){
                if(!list.word7.includes(guess.toLowerCase())){
                    flashError();
                    return

                }
            }
            let guessed:Array<String> = []
            for(let i = 0; i < rowId; i++){
                guessed.push(wordle[i].join("").toUpperCase());
            }
            if(guessed.includes(guess.toUpperCase())){
                flashError();
                return
            }
            let newValidation = [...validation];
            if(guess === word){
                newValidation[rowId] = newValidation[rowId].map(() => "valid");
                setValidation(newValidation);
                setIsFinished(true);
            }else{
                let tempWord = []
                //get all the word in the wordle
                for(let i = 0; i < size; i++){
                    if(guess[i] === word[i]){
                        newValidation[rowId][i] = "valid";
                    }else{
                        tempWord.push(word[i]);
                    }
                }
                for(let i = 0; i < size; i++){
                    if(word[i] !== guess[i]){
                        newValidation[rowId][i] = tempWord.includes(guess[i]) ? "in" : "";
                    }
                }
                setValidation(newValidation);
                setRowId(rowId+1);
                setColId(0);
            }
            if(rowId === 5){
                setIsFinished(true);
            }
        }
    }
}
    

    useEffect(() => {
        document.addEventListener("keyup", handleEvent);
        return () => {
            document.removeEventListener("keyup", handleEvent);
        }
        }, [])

        useEffect(() => {
            setColId(0);
            setRowId(0);
            setWordle(defaultArray(size));
            setValidation(defaultArray(size));  
            setIsFinished(false);
            if(size === 5){
                setWord(list.word5[Math.floor(Math.random() * list.word5.length)].toUpperCase());
            }else if(size === 6){
                setWord(list.word6[Math.floor(Math.random() * list.word6.length)].toUpperCase());
            }
            else if(size === 7){
                setWord(list.word7[Math.floor(Math.random() * list.word7.length)].toUpperCase());
            }

        }, [size])

        useEffect(() => {
        document.removeEventListener("keyup", handleEvent);
        document.addEventListener("keyup", handleEvent);
        return () => {
            document.removeEventListener("keyup", handleEvent);
        }
        },[colId,rowId])


    function restart(){
        setWordle(defaultArray(size));
        setValidation(defaultArray(size));
        setRowId(0);
        setColId(0);
        setIsFinished(false);
        if(size === 5){
            setWord(list.word5[Math.floor(Math.random() * list.word5.length)].toUpperCase());
        }else if(size === 6){
            setWord(list.word6[Math.floor(Math.random() * list.word6.length)].toUpperCase());
        }
        else if(size === 7){
            setWord(list.word7[Math.floor(Math.random() * list.word7.length)].toUpperCase());
        }
    }

  return (
    <WordleContext.Provider value={{validationState: validation, setValidationState: setValidation}}>
    <div className={StyleCss.wordle}>
    {wordle.map((row:Array<String>, i:number) => {
        return (
            <div key={i} className={StyleCss.row}>
                {row.map((cell:String, j:number) => {
                    return (
                        <Cell key={`${i} ${j}`} value={cell} row={i} col={j}/>
                    )})}
            </div>
        )}
        )}
  </div>
    {isFinished && <> <button className={StyleCss.btn} onClick={() => restart()}>Restart the game : {word}</button></>}
  </WordleContext.Provider>
  )
}

export default Grid