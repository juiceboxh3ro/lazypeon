import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import blizzAPI from 'lib/blizzard'

import { BlizzCharacterProfessions, BlizzKeyName } from 'app'
import TierList from 'components/professions/TierList'
import ProfileNotFound from 'components/ProfileNotFound'

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
  const { character, primaries } = props as BlizzCharacterProfessions
  const [tier, setTier] = useState<BlizzKeyName[]>()
  const [filter, setFilter] = useState('Dragon Isles')

  if (!character?.name) return <ProfileNotFound />

  return (
    <div className="flex flex-1 gap-4 pb-8">
      <div className="w-1/2">
        <h2 className='text-2xl mb-4 font-bold'>Professions for {character.name} @ {character.realm.name}</h2>
        <div className="flex gap-2 items-center">
          <label htmlFor="filter" className="text-lg">Filter by Tier:</label>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
            className="px-4 py-2 rounded-md bg-gray-700 text-lg my-2"
          />
        </div>
        <div className="flex flex-col gap-8">
          {primaries.map((p) => (
            <TierList
              key={p.profession.id}
              profession={p.profession}
              tiers={p.tiers}
              setTier={setTier}
              filter={filter}
            />
          ))}
        </div>
      </div>

      <div className="w-1/2">
        {tier && (
          <ul>
            <p></p>
            {tier.filter((f) => f.name !== 'Opening').map((t) => (
              <li key={t.id}>
                <p>{t.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CharacterProfessionInfo
