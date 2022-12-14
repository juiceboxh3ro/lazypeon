import { useRouter } from 'next/router'
import { useState } from 'react'
import realms from 'util/realms'

const CharacterSearch = () => {
  const [realm, setRealm] = useState('')
  const [character, setCharacter] = useState('')
  const router = useRouter()

  const handleNavigate = () => {
    const _realm = realm.toLowerCase().replace(/ /g, '-').replaceAll('\'', '')
    const _character = character.toLowerCase()
    const href = `/character/${_realm}/${_character}`
    router.push(href)
  }

  return (
    <div className='flex flex-1 flex-col items-center'>
      <form
        className='flex flex-1 flex-col gap-4 p-8 border border-blue-500 rounded-md'
        onSubmit={() => realm && character && handleNavigate()}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='realms'>Choose a Realm: <span className='text-right'>*</span></label>
          <input
            list='realms'
            name='realms'
            id='realms'
            className='py-2 px-4 rounded-md'
            autoComplete='on'
            onChange={(e) => setRealm(e.target.value)}
          />

          <datalist id='realms'>
            {realms.NA_US_REALMS.map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='character'>Character Name:</label>
          <input
            name='character'
            className='py-2 px-4 rounded-md'
            onChange={(e) => setCharacter(e.target.value)}
          />
        </div>
        <div className='flex justify-end mt-2'>
          <button
            className='p-2 bg-blue-500 rounded-md disabled:bg-slate-500'
            onClick={handleNavigate}
            disabled={!realm || !character}
            type='submit'
          >
            Search
          </button>
        </div>
        <p className='text-sm'>* Only NA Realms supported currently</p>
      </form>
    </div>
  )
}

export default CharacterSearch
