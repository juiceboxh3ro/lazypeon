import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react'
import blizzAPI from 'lib/blizzard'

import { BlizzCharacterProfessions, BlizzKeyName } from 'app'
import PrimariesTierList from 'components/professions/PrimariesTierList'
import ProfileNotFound from 'components/ProfileNotFound'
import notableRecipes, { INotableRecipe } from '@/util/notableRecipes'
import { useRouter } from 'next/router'

interface RouteContext {
  params: {
    realmSlug: string
    characterName: string
  }
}

export const getServerSideProps: GetServerSideProps = async (context): Promise<any> => {
  const { realmSlug, characterName } = context.params as RouteContext['params']
  let props = {}

  try {
    const accessToken = await blizzAPI.getAccessToken()
    const suffix = `?namespace=profile-us&locale=en_US&access_token=${accessToken}`
    // /profile/wow/character/{realmSlug}/{characterName}/professions
    props = await blizzAPI.query(`/profile/wow/character/${realmSlug}/${characterName}/professions${suffix}`)
  } catch (e) {
    console.error(e)
  }

  return { props }
}

const CharacterProfessionInfo = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { character, primaries, secondaries } = props as BlizzCharacterProfessions
  const [tier, setTier] = useState<BlizzKeyName[]>()
  const [view, setView] = useState<'pretty' | 'raw'>('pretty')
  const [profession, setProfession] = useState<string>('')
  const [activeTier, setActiveTier] = useState<string>('')
  const [filter, setFilter] = useState('Dragon Isles')
  const [notable, setNotable] = useState<INotableRecipe[]>()
  const [onlyRaidBuff, setOnlyRaidBuff] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!profession || ['Archaeology', 'Fishing'].includes(profession)) {
      setNotable(undefined)
      return
    }
    const _p = profession.toLowerCase()

    // @ts-ignore-next-line "string can't be used to index blahblah" - yes it can.
    const notableRecipesList: INotableRecipe[] = notableRecipes?.[_p]
    if (notableRecipesList) setNotable(notableRecipesList)
  }, [profession])

  if (!character?.name) return <ProfileNotFound />

  return (
    <div className="flex flex-1 gap-4 pb-8">
      <div className="w-1/3">
        <h2 className='text-2xl mb-4 font-bold'>
          Professions for&nbsp;
            <a
              href={`https://worldofwarcraft.com/en-us/character/us/${router.query.realmSlug}/${router.query.characterName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline cursor-pointer hover:text-blue-500"
            >{character.name} @ {character.realm.name}</a>
          </h2>
        <div className="flex gap-2 items-center">
          <label htmlFor="filter" className="text-lg">Filter by Tier:</label>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
            className="px-4 py-2 rounded-md bg-gray-700 text-lg my-2"
          />
        </div>
        <div className='flex flex-col gap-8'>
          <div className="flex flex-col gap-8">
            {primaries.map((p) => (
              <PrimariesTierList
                active={activeTier}
                key={p.profession.id}
                profession={p.profession}
                tiers={p.tiers}
                setTier={setTier}
                setActiveTier={setActiveTier}
                setProfession={setProfession}
                filter={filter}
              />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {secondaries
              ?.filter((s) => s.profession.name.toLowerCase() !== 'archaeology')
              ?.map((p) => (
                <PrimariesTierList
                  active={activeTier}
                  key={p.profession.id}
                  profession={p.profession}
                  tiers={p.tiers}
                  setTier={setTier}
                  setActiveTier={setActiveTier}
                  setProfession={setProfession}
                  filter={filter}
                />
            ))}
          </div>
        </div>
      </div>

      <div className="w-2/3">
        {tier && (
          <>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <button className={`rounded-lg px-4 py-2${onlyRaidBuff ? ' bg-green-500' : ' bg-gray-200 text-slate-900'}`} onClick={() => setOnlyRaidBuff((p) => !p)}>10.0 Raid / M+ Recipes</button>
              </div>
              <div className='overflow-hidden rounded-lg max-w-max'>
                <button className='px-4 py-2 bg-blue-500' onClick={() => setView('pretty')}>Pretty</button>
                <button className='px-4 py-2 bg-gray-400' onClick={() => setView('raw')}>JSON</button>
              </div>
            </div>
            {view === 'pretty' ? (
              <ul>
                {tier.filter((f) => f.name !== 'Opening').map((t) => {
                  const isNotable = notable?.find((n) => n.consumable.find((c) => c.name === t.name))
                  if (onlyRaidBuff && !isNotable) return null
                  return (
                    <li key={t.id} className='ml-[-0.5rem] my-2 p-2 rounded-md hover:bg-slate-800'>
                      <p className={isNotable ? 'text-green-400' : ''}>{isNotable ? '⭐️ ' : ''}{t.name}</p>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div
                className='whitespace-pre-line bg-gray-900 text-green-400 rounded-lg p-4'
              >
                <pre className='max-w-1/3 h-4xl overflow-scroll'>{JSON.stringify(tier, null, 2)}</pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CharacterProfessionInfo
