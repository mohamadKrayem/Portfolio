import React from 'react'

const Button = ({text, px, py}) => {
  return (
    <button className={`text-xl mt-3 bg-amber-400 rounded-full text-black px-${px} py-${py} border-2 border-solid border-transparent hover:border-inherit focus:border-sky-400`}>{text}</button>
  )
}

export default Button