import React from 'react'

function Cell({value,wordId,letterID}) {
  return (
    <p className='cell'>
        {value}
    </p>
  )
}

export default Cell
