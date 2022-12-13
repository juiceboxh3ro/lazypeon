import { BlizzKeyName, PrimaryProfessionTiers } from 'app'
import { Dispatch, SetStateAction } from 'react'

interface TierListProps {
  filter: string
  profession: BlizzKeyName
  tiers: PrimaryProfessionTiers[]
  setTier: Dispatch<SetStateAction<BlizzKeyName[] | undefined>>
}

const TierList: React.FC<TierListProps> = ({
  filter,
  profession,
  tiers,
  setTier
}) => {
  
  const handleClick = (tier: BlizzKeyName[]) => {
    setTier(tier)
  }

  return (
    <div>
      <h3 className='text-xl font-bold py-2 mb-4'>{profession.name}</h3>
      <ul className="flex flex-col gap-4">
        {tiers.map((t: PrimaryProfessionTiers) => (
          <>
            {t.tier.name.toLowerCase().includes(filter)
            ? (
                <li
                  key={t.tier.id}
                  className="flex flex-col w-1/2 gap-2 cursor-pointer hover:text-blue-400"
                  onClick={() => handleClick(t.known_recipes)}
                >
                  <label htmlFor={`${t.tier.name}-progress`} className="text-lg">
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
              )
            : (
              <></>
            )} 
          </>
        ))}
      </ul>
    </div>
  )
}

export default TierList
