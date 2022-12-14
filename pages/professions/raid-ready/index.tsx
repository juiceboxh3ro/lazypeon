import React from 'react'
import notableRecipes, { INotableRecipe } from '@/util/notableRecipes'

const RaidReady = () => {
  return (
    <div className='grid grid-cols-2 gap-8'>
      {Object.entries(notableRecipes).map(([profession, recipes]) => (
        <div className='flex flex-1 flex-col' key={profession}>
          <h2 className='capitalize my-4'>{profession} - {recipes.length} item{recipes.length === 1 ? '' : 's'}</h2>
          <div className='ml-8 flex flex-col gap-8'>
            {recipes.map((recipe) => (
              <div key={recipe.type}>
                <h3 className='capitalize mb-4'>{recipe.type}</h3>
                <ul className='ml-8 flex flex-col gap-4'>
                  {recipe.consumable.map((r) => (
                    <li
                      key={r.name}
                      className='border p-4 rounded-md cursor-pointer hover:bg-slate-700'
                    >
                      <a href={`https://www.wowhead.com/search?q=${r.name.toLowerCase().replaceAll(' ', '+')}`} target='_blank' rel='noopener noreferrer'>
                        <h3>{r.name}</h3>
                        {r.source.key ? (
                          <div className='border-t my-2 pt-4'>
                            <p>{r.source.key}{r.source.value ? ' - ' : ''}{r.source.value}</p>
                          </div>
                        ) : (<></>)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RaidReady
