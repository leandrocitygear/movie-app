import React from 'react';
import './NextPage.css';

function NextPage({onNextPageClick}) {


  return (
    <div className='NextPage'>
        <button className='NextButton' onClick={onNextPageClick} >Next</button>

    </div>
  )
}

export default NextPage