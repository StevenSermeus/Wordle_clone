import React from 'react'
import Grid from '../../components/Grid/Grid'
import NavBar from '../../components/NavBar/NavBar'
import StyleCss from './Wordle.module.css'
import {useState} from 'react'
function Wordle() {
    const [size, setSize] = useState(5);
  return (
    <>
    <NavBar/>
    <Grid size={size}></Grid>
    <div className={StyleCss.btnGroupe}>
      <button className={StyleCss.btn} onClick={() => setSize(5)}>5</button>
      <button className={StyleCss.btn} onClick={() => setSize(6)}>6</button>
      <button className={StyleCss.btn} onClick={() => setSize(7)}>7</button>
    </div>
    </>
  )
}

export default Wordle