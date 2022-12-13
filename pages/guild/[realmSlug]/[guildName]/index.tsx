import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import blizzAPI from 'lib/blizzard'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { BlizzGuildRoster, GuildRosterMember } from 'app'

import ProfileNotFound from 'components/ProfileNotFound'

interface RouteContext {
  params: {
    guildName: string
    locale: string
    realmSlug: string
  }
}

export const getServerSideProps: GetServerSideProps = async (context): Promise<any> => {
  console.log(context)
  const { realmSlug, guildName, locale = 'us' } = context.params as RouteContext['params']
  let props = {}

  try {
    let gName = guildName.replaceAll(' ', '-').replaceAll('_', '-')
    const accessToken = await blizzAPI.getAccessToken()
    props = await blizzAPI.query(`/data/wow/guild/${realmSlug}/${gName}/roster?namespace=profile-${locale}&locale=en_US&access_token=${accessToken}`)
  } catch (e) {
    console.error(e)
  }

  return { props }
}

const GuildPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { guild, members } = props as BlizzGuildRoster
  const [sortedMembers, setSortedMembers] = useState<GuildRosterMember[]>(members ?? [])
  const [sortBy, setSortBy] = useState('rank-desc')
  const [filterRank, setFilterRank] = useState('')
  const [filterRealm, setFilterRealm] = useState('')
  const [filterName, setFilterName] = useState('')
  const router = useRouter()

  if (!guild?.name) return (<ProfileNotFound />)

  const sortByCharacterName = (order: string) => {
    const sorted = sortedMembers?.sort((a, b) => {
      if (a.character.name < b.character.name) return order === 'asc' ? -1 : 1
      if (a.character.name > b.character.name) return order === 'asc' ? 1 : -1
      return 0
    })
    setSortedMembers(sorted)
  }

  const sortByRank = (order: string) => {
    const sorted = sortedMembers?.sort((a, b) => {
      if (a.rank < b.rank) return order === 'asc' ? -1 : 1
      if (a.rank > b.rank) return order === 'asc' ? 1 : -1
      return 0
    })
    setSortedMembers(sorted)
  }

  const sortByRealmSlug = (order: string) => {
    const sorted = sortedMembers?.sort((a, b) => {
      if (a.character.realm.slug < b.character.realm.slug) {
        return order === 'asc' ? -1 : 1
      }
      if (a.character.realm.slug > b.character.realm.slug) {
        return order === 'asc' ? 1 : -1
      }
      return 0
    })

    setSortedMembers(sorted)
  }

  const filterCharacterName = (name: string) => {
    const filtered = members?.filter((member) => member.character.name.toLowerCase().includes(name.toLowerCase()))
    setSortedMembers(filtered)
  }

  const filterRanks = (rank: string) => {
    const filtered = members?.filter((member) => member.rank === parseInt(rank))
    setSortedMembers(filtered)
  }

  const handleNavigate = (realmSlug: string, characterName: string) => {
    const href = `/character/${realmSlug}/${characterName}`
    router.push(href)
  }

  return (
    <div className='flex flex-1 gap-8 lg:flex-row sm:flex-col'>
      <div className='w-1/4 flex flex-1 flex-col gap-4 pb-8'>
        <h2 className='text-2xl mb-4'>Filters</h2>
        <div className='border-2 rounded-lg p-4'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex gap-4 w-full justify-evenly'>
              <label htmlFor='filter-rank' className='text-xl'>Rank</label>
              <input
                id='filter-rank'
                type='number'
                className='px-4 py-2 rounded-md'
                min='0'
                max='20'
                value={filterRank}
                onChange={(e) => setFilterRank(e.target.value)}
              />
            </div>

            <div className='flex justify-evenly w-full'>
              <div>
                <input id='rank-asc' type='radio' name='type' onChange={() => sortByRank('asc')} />&nbsp;<label htmlFor='rank-asc'>Ascending</label>
              </div>
              <div>
                <input id='rank-desc' type='radio' name='type' onChange={() => sortByRank('desc')}/>&nbsp;<label htmlFor='rank-desc'>Descending</label>
              </div>
            </div>

            <div className='flex justify-evenly w-full'>
              <div>
                <input type='radio' name='type' id='gt' />&nbsp;<label htmlFor='gt'>Greater</label>
              </div>
              <div>
                <input type='radio' name='type' id='lt' />&nbsp;<label htmlFor='lt'>Less</label>
              </div>
              <div>
                <input type='radio' name='type' id='et' />&nbsp;<label htmlFor='et'>Exact</label>
              </div>
              <div>
                <input type='radio' name='type' id='ne' />&nbsp;<label htmlFor='ne'>Not</label>
              </div>
            </div>
          </div>
        </div>

        <div className='border-2 rounded-lg p-4'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex gap-4 w-full justify-evenly'>
              <label htmlFor='filter-rank' className='text-xl'>Realm</label>
              <input id='filter-rank' className='px-4 py-2 rounded-md' />
            </div>

            <div className='flex justify-evenly w-full'>
              <div>
                <input type='radio' name='type' />&nbsp;<label htmlFor='realm-asc'>Ascending</label>
              </div>
              <div>
                <input type='radio' name='type' />&nbsp;<label htmlFor='realm-desc'>Descending</label>
              </div>
            </div>

            <div className='flex justify-evenly w-full'>
              <div>
                <input type='radio' name='type' id='realm-exact' />&nbsp;<label htmlFor='realm-exact'>Exact</label>
              </div>
              <div>
                <input type='radio' name='type' id='realm-not' />&nbsp;<label htmlFor='realm-not'>Not</label>
              </div>
            </div>
          </div>
        </div>

        <div className='border-2 rounded-lg p-4'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex gap-4 w-full justify-evenly'>
              <label htmlFor='filter-rank' className='text-xl'>Name</label>
              <input id='filter-rank' className='px-4 py-2 rounded-md' />
            </div>

            <div className='flex justify-evenly w-full'>
              <div>
                <input type='radio' name='type' id='name-asc' />&nbsp;<label htmlFor='name-asc'>Ascending</label>
              </div>
              <div>
                <input type='radio' name='type' id='name-desc' />&nbsp;<label htmlFor='name-desc'>Descending</label>
              </div>
            </div>

            <div className='flex justify-evenly w-full'>
              <div>
                <input type='radio' name='type' id='name-exact' />&nbsp;<label htmlFor='name-exact'>Exact</label>
              </div>
              <div>
                <input type='radio' name='type' id='name-includes' />&nbsp;<label htmlFor='name-includes'>Contains</label>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            className='px-4 py-2 bg-blue-500 rounded-md'
            onClick={() => setSortedMembers(members)}
          >
            Reset
          </button>
        </div>
      </div>

      <div className='w-3/4 flex flex-col items-center gap-4 pb-8'>
        <h2 className='text-2xl mb-4 font-bold text-center'>Roster for {guild.name} @ {guild.realm.name}</h2>
        <div className='border-2 rounded-lg w-full mx-auto p-2'>
          <table className='w-full'>
            <thead>
              <tr className='text-left text-xl'>
                <th>
                  Name
                </th>
                <th>
                  Realm
                </th>
                <th>
                  Rank
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedMembers.map((m, i) => (
                <tr
                  key={m.character.id}
                  className={`capitalize cursor-pointer ${i % 2 ? 'bg-gray-700 ' : ''}hover:bg-gray-500`}
                  onClick={() => handleNavigate(m.character.realm.slug, m.character.name.toLowerCase())}
                >
                  <td className='p-2'>{m.character.name}</td>
                  <td>{m.character.realm.slug.split('-').join(' ')}</td>
                  <td>{m.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GuildPage
