import React from 'react'
import './PrevPage.css'

function PrevPage({onPrevPageClick}) {

  return (
    <div className='PrevPage'>
        <button className='PrevButton' onClick={onPrevPageClick}>Previous</button>

    
    </div>
  )
}

export default PrevPage