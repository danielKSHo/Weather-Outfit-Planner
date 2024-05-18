
import React from 'react'

// button that will be reused everywhere in the program
const ActionButton = ({title, onClick, className, colour}) => {
  return (
    <button className={`${colour} font-bold border-blue border p-2 hover:bg-sky-200 hover:text-blue rounded-md duration-300 ease-out` +
        " " +
        className
      } onClick={onClick}>
        {title}
    </button>
  )
}

export default ActionButton





