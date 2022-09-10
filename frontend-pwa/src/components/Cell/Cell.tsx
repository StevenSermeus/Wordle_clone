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
    <div className={`flex border-2 border-accent md:w-24 md:h-24 sm:w-16 sm:h-16 w-16 h-16 md:text-base sm:text-sm`}>
      <div className={`cell ${validationState[row][col]} `}>{value}</div>
    </div>
    
  )
}

export default Cell