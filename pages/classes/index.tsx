import React from 'react'
import playableClasses from '@/util/playableClasses'

const Classes = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-center mb-8 text-2xl font-bold'>Gems, Enchants, & Consumables</h1>
      <div className='flex justify-center items-center w-2/3 mx-auto'>
        <div className='grid gap-8 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {playableClasses.map((playableClass) => (
            <div className='bg-slate-700 p-4 pb-8 rounded-md drop-shadow-lg' key={playableClass.name}>
              <h2 className='mb-4 font-bold text-lg' style={{ color: playableClass.classColor }}>{playableClass.name}</h2>
              <ul className='flex flex-col gap-2'>
                {playableClass.specializations.map((spec) => (
                  <li key={`${playableClass.name}-${spec.name}`}>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href={`${spec.consumables}`}
                      className='hover:text-blue-500 hover:underline'
                    >
                      {spec.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Classes
