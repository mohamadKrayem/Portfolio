import React from 'react'

const Button = ({text, px, py, url}) => {
  return url!="" ? (
    <a
      download
      className={`md:text-xl text-lg mt-3 bg-amber-400 rounded-full text-black ${px} ${py} border-2 border-solid border-transparent hover:border-inherit focus:border-white`}
      href={url}
    >
      {text}
    </a>
  ) : (
    <a
      className={`md:text-xl text-lg mt-3 bg-amber-400 rounded-full text-black ${px} ${py} border-2 border-solid border-transparent hover:border-inherit focus:border-white`}
    >
      {text}
    </a>
  );
}

export default Button 