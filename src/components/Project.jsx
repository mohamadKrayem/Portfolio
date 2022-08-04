import React from 'react'

const Project = (props) => {
  return (
    <div class="overflow-hidden aspect-video bg-red-400 cursor-pointer rounded-xl relative group w-80 h-52">
      <div class="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-[#000] to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
        <div className='w-full'>
          <div class="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out w-full">
            <div class="font-bold w-full">{props.title}</div>
              <div className='flex items-center gap-6 w-full opacity-60'>
                <a href={props.repo}>Github repo</a>
                <a href={props.demo}>Live demo</a>
              </div>
          </div>
        </div>
      </div>
      <img
        alt=""
        class="object-cover w-full h-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
        src={props.url}
      />
    </div>
  )
}

export default Project