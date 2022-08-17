import React from 'react'

const ListElement = (props) => {
  return (
    <li className='flex mb-3'><span className='md:w-36 w-20'>{props.Lkey}:</span> <span className='md:w-[calc(100%-144px)] text-[#999999]'>{props.value}</span></li>
  )
}

export default ListElement