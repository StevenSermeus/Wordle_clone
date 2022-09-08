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
    <div className={`flex border-2 border-accent w-24 h-24`}>
      <div className={`cell ${validationState[row][col]} `}>{value}</div>
    </div>
    
  )
}

export default Cell