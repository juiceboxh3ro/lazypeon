import { BlizzKeyName, PrimaryProfessionTiers } from 'app'
import { Dispatch, Fragment, SetStateAction} from 'react'

interface TierListProps {
  active: string
  filter: string
  profession: BlizzKeyName
  tiers: PrimaryProfessionTiers[]
  setActiveTier: Dispatch<SetStateAction<string>>
  setProfession: Dispatch<SetStateAction<string>>
  setTier: Dispatch<SetStateAction<BlizzKeyName[] | undefined>>
}

const TierList: React.FC<TierListProps> = ({
  active,
  filter,
  profession,
  tiers,
  setTier,
  setActiveTier,
  setProfession,
}) => {  
  const handleClick = (tier: BlizzKeyName[], name: string) => {
    setTier(tier)
    setActiveTier(name)
    setProfession(profession.name)
  }

  return (
    <div>
      <h3 className='text-xl font-bold py-2 mb-4'>{profession.name}</h3>
      <ul className='flex flex-col gap-4'>
        {tiers.map((t: PrimaryProfessionTiers) => (
          <Fragment key={t.tier.id}>
            {t.tier.name.toLowerCase().includes(filter.toLowerCase())
            ? (
              <li
                className='flex flex-col w-1/2 gap-2 cursor-pointer hover:text-blue-400'
                onClick={() => handleClick(t.known_recipes, t.tier.name)}
              >
                <label
                  htmlFor={`${t.tier.name}-progress`}
                  className={`text-lg${active === t.tier.name ? ' underline text-blue-400' : ''}`}
                >
                  {t.tier.name} - {t.skill_points} / {t.max_skill_points}
                </label>
                <progress
                  id={`${t.tier.name}-progress`}
                  value={t.skill_points}
                  max={t.max_skill_points}
                >
                  {t.skill_points}
                </progress>
              </li>
            ) : (
              <></>
            )} 
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default TierList
