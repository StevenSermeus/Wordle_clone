import React from 'react'
import {useEffect, useContext,useState} from 'react'
import defaultArray from '../utils';
import { AppContext } from '../App';
import Cell from './Cell';


function Wordle() {
    
    const [word, setWord] = useState('');
    const [guess, setGuess] = useState(defaultArray(5));
    let [row, setRow] = useState(0);
    let [col, setCol] = useState(0);
    const handleKey = (e) => {
      document.removeEventListener('keyup',handleKey);
      if (e.key === 'Enter') {
        if(guess[row][length -1] !== " "){
            //compare with word
            let temp = guess[row].join("");
            if(temp === word){
                console.log("Correct");
            }
            else{
                console.log("Wrong");
            }
        }

      }else{
        if(guess[row][length -1] === " "){
        if(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"].includes(e.key.toLowerCase())){
            guess[row][col] = e.key.toUpperCase();
            setGuess(guess);
            col +=1;
            setCol(col);
        }
        }
        console.log(e.key)
        if(e.key === "Backspace"){
            if(col > 0){
                col -=1;
                setCol(col);
                guess[row][col] = " ";
                setGuess(guess);
            }
        }
        
      }
      document.addEventListener('keyup',handleKey)
    }
    const [length, setLength] = useState(5)
    useEffect(() => {
        setGuess(defaultArray(length));
        setWord("SALUT")
        
    }, [length])
    useEffect(() => {
        document.addEventListener('keyup', handleKey);
    },[]);
    
  //drop down menu to select length of word
  return(
    <>
    <div className="wordle">
        <div className='tries'>
            {guess[0].map((item,index) => {
                return <Cell className='letter' key={index} value={item} wordId={0} letterID={index}/>
            })}
        </div>
        <div className='tries'>
            {guess[1].map((item,index) => {
                return <Cell className='letter' key={index} value={item} wordId={0} letterID={index}/>
            })}
        </div>
        <div className='tries'>
            {guess[2].map((item,index) => {
                return <Cell className='letter' key={index} value={item} wordId={0} letterID={index}/>
            })}
        </div>
        <div className='tries'>
            {guess[3].map((item,index) => {
                return <Cell className='letter' key={index} value={item} wordId={0} letterID={index}/>
            })}
        </div>
        <div className='tries'>
            {guess[4].map((item,index) => {
                return <Cell className='letter' key={index} value={item} wordId={0} letterID={index}/>
            })}
        </div>
        <div className='tries'>
            {guess[5].map((item,index) => {
                return <Cell className='letter' key={index} value={item} wordId={0} letterID={index}/>
            })}
        </div>
      </div>
    <div>
        <select onChange={(e) => setLength(e.target.value)}>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        </select>
    </div>
    </>
  )
}

export default Wordle
