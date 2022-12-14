import { useEffect, useState } from 'react'
import notableRecipes, { INotableRecipe } from '@/util/notableRecipes'

const RaidReady = () => {
  const [openProfs, setOpenProfs] = useState<Record<string, boolean>>()
  const [openCats, setOpenCats] = useState<Record<string, boolean>>()

  useEffect(() => {
    let newOpenProfs: Record<string, boolean> = {}
    let newOpenCats: Record<string, boolean> = {}
    // set up open categories to be all `true`
    Object.entries(notableRecipes)
      .forEach(([profession, recipes]) => {
        newOpenProfs[profession] = false

        recipes.forEach(({ type }) => {
          newOpenCats[`${profession}-${type}`] = false
        })
    })

    setOpenProfs(newOpenProfs)
    setOpenCats(newOpenCats)
  }, [])
  
  return (
    <div className='flex flex-col gap-8'>
      {Object.entries(notableRecipes).map(([profession, recipes]) => (
        <div className='flex flex-1 flex-col' key={profession}>
          <h2
            className='text-xl capitalize my-4 cursor-pointer hover:text-blue-500 hover:underline'
            onClick={() => setOpenProfs((prev) => ({ ...prev, [profession]: !prev?.[profession] || false }))}
          >
            {profession} - {recipes.length} Categor{recipes.length === 1 ? 'y' : 'ies'}
          </h2>
          {openProfs?.[profession] ? (
            <div className='ml-8 flex flex-col gap-8'>
            {recipes.map((recipe) => (
              <div key={recipe.type}>
                <h3
                  className='text-lg capitalize mb-4 cursor-pointer hover:text-blue-500 hover:underline'
                  onClick={
                    () => setOpenCats((prev) => ({ ...prev, [`${profession}-${recipe.type}`]: !prev?.[`${profession}-${recipe.type}`] || false }))
                  }
                >
                  {recipe.type} - {recipe.consumable.length} Item{recipe.consumable.length === 1 ? '' : 's'}
                </h3>
                {openCats?.[`${profession}-${recipe.type}`] ? (
                  <ul className='ml-8 flex flex-col gap-4'>
                    {recipe.consumable.map((r) => (
                      <li
                        key={r.name}
                        className='w-1/2 border p-4 rounded-md cursor-pointer hover:bg-slate-700'
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
                ) : (<></>)}
              </div>
            ))}
          </div>
          ) : (<></>)}
        </div>
      ))}
    </div>
  )
}

export default RaidReady
