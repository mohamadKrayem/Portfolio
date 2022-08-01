import React from 'react'

const ListElement = (props) => {
  return (
    <li className='flex mb-3'><span className='w-36'>{props.Lkey}:</span> <span className='w-[calc(100%-144px)] text-[#999999]'>{props.value}</span></li>
  )
}

export default ListElement