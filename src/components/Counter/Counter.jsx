import React from 'react'

function Counter({incrementCounter, decrementCounter, number=0}) {

  return (
    <div>
      <button onClick={incrementCounter}>+</button>
      <span>{number}</span>
      <button onClick={decrementCounter}>-</button>
    </div>
  )
}

export default Counter
