import StyleCss from './Cell.module.css'
import {useContext} from 'react'
import {WordleContext, ContextType} from '../Grid/Grid'
interface Props {
    value: String
    row: number
    col: number
}

function Cell({value,row,col}: Props) {
  //useContext
  const {validationState} = useContext<ContextType>(WordleContext);

  return (
    <div className={`${StyleCss.cell} ${validationState[row][col] === "valid" ? StyleCss.in : validationState[row][col] === "in" ? StyleCss.inWord:"" }`}>{value}</div>
  )
}

export default Cell