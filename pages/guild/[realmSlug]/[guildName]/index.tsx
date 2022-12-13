import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import blizzAPI from 'lib/blizzard'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { BlizzGuildRoster, GuildRosterMember } from 'app'

import ProfileNotFound from 'components/ProfileNotFound'

const COMPARE = {
  gt: 'gt',
  lt: 'lt',
  exact: 'exact',
  not: 'not',
}

const FILTER = {
  type: 'rank',
  order: 'desc',
  compare: 'greater'
}

const FILTER_VALUES = {
  rank: '',
  realm: '',
  name: '',
}

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
    let gName = guildName.replaceAll(' ', '-').replaceAll('_', '-').replaceAll('\'', '')
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
  const [filter, setFilter] = useState(FILTER)
  const [filterValues, setFilterValues] = useState(FILTER_VALUES)
  const router = useRouter()

  if (!guild?.name) return (<ProfileNotFound />)

  const resetFilters = () => {
    setSortedMembers(members)
    setFilter(FILTER)
    setFilterValues(FILTER_VALUES)
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
            <div className='flex gap-4 w-full justify-evenly items-center'>
              <label htmlFor='filter-rank' className='text-xl'>Rank</label>
              <input
                id='filter-rank'
                type='number'
                className='px-4 py-2 rounded-md'
                min='0'
                max='20'
                value={filterValues.rank}
                onChange={(e) => setFilterValues({ ...filterValues, rank: e.target.value })}
              />
            </div>

            <div className='flex justify-evenly w-full items-center'>
              <div className='flex items-center'>
                <input type='radio' name='rank-compare' id='gt' onChange={() => setFilter({ ...filter, compare: COMPARE.gt })} />
                &nbsp;<label htmlFor='gt'>Greater</label>
              </div>
              <div className='flex items-center'>
                <input type='radio' name='rank-compare' id='lt' onChange={() => setFilter({ ...filter, compare: COMPARE.lt })} />
                &nbsp;<label htmlFor='lt'>Less</label>
              </div>
              <div className='flex items-center'>
                <input type='radio' name='rank-compare' id='et' onChange={() => setFilter({ ...filter, compare: COMPARE.exact })} />
                &nbsp;<label htmlFor='et'>Exact</label>
              </div>
              <div className='flex items-center'>
                <input type='radio' name='rank-compare' id='ne' onChange={() => setFilter({ ...filter, compare: COMPARE.not })} />
                &nbsp;<label htmlFor='ne'>Not</label>
              </div>
            </div>
          </div>
        </div>

        <div className='border-2 rounded-lg p-4'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex gap-4 w-full justify-evenly items-center'>
              <label
                htmlFor='filter-rank'
                className='text-xl'
              >
                Realm
              </label>
              <input
                id='filter-rank'
                className='px-4 py-2 rounded-md'
                value={filterValues.realm}
                onChange={(e) => setFilterValues({ ...filterValues, realm: e.target.value })}
              />
            </div>

            <div className='flex justify-evenly w-full items-center'>
              <div className='flex items-center'>
                <input type='radio' name='realm-compare' id='realm-exact' onChange={() => setFilter({ ...filter, compare: COMPARE.exact })} />
                &nbsp;<label htmlFor='realm-exact'>Exact</label>
              </div>
              <div className='flex items-center'>
                <input type='radio' name='realm-compare' id='realm-not' onChange={() => setFilter({ ...filter, compare: COMPARE.not })} />
                &nbsp;<label htmlFor='realm-not'>Not</label>
              </div>
            </div>
          </div>
        </div>

        <div className='border-2 rounded-lg p-4'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex gap-4 w-full justify-evenly items-center'>
              <label htmlFor='filter-rank' className='text-xl'>Name</label>
              <input
                id='filter-rank'
                className='px-4 py-2 rounded-md'
                value={filterValues.name}
                onChange={(e) => setFilterValues({ ...filterValues, name: e.target.value })}
              />
            </div>

            <div className='flex justify-evenly w-full'>
              <div className='flex items-center'>
                <input type='radio' name='name-compare' id='name-exact' onChange={() => setFilter({ ...filter, compare: COMPARE.exact })} />
                &nbsp;<label htmlFor='name-exact'>Exact</label>
              </div>
              <div className='flex items-center'>
                <input type='radio' name='name-compare' id='name-includes' onChange={() => setFilter({ ...filter, compare: COMPARE.not })} />
                &nbsp;<label htmlFor='name-includes'>Contains</label>
              </div>
            </div>
          </div>
        </div>

        <div className='border-2 rounded-lg p-4'>
          <div className="flex flex-col items-center gap-4">
            <div className='w-full flex justify-evenly items-center'>
              <h3 className='text-xl'>Order</h3>
              <div className='flex items-center'>
                <input type='radio' name='order-by' id='name-asc' onChange={() => setFilter({ ...filter, order: 'asc' })} />
                &nbsp;<label htmlFor='name-asc'>Ascending</label>
              </div>
              <div className='flex items-center'>
                <input type='radio' name='order-by' id='name-desc' onChange={() => setFilter({ ...filter, order: 'desc' })} />
                &nbsp;<label htmlFor='name-desc'>Descending</label>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            className='px-4 py-2 bg-blue-500 rounded-md'
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <p>{JSON.stringify(filter, null, 2)}</p>
        <p>{JSON.stringify(filterValues, null, 2)}</p>
      </div>

      <div className='w-3/4 flex flex-col items-center gap-4 pb-8'>
        <h2 className='text-2xl mb-4 font-bold text-center'>Roster for {guild.name} @ {guild.realm.name}</h2>
        <div className='border-2 rounded-lg w-full mx-auto p-2'>
          <table className='w-full'>
            <thead>
              <tr className='text-left text-xl'>
                <th>Name</th>
                <th>Realm</th>
                <th>Rank</th>
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
