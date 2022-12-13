interface BlizzSelfRef {
  _links: { self: { href: string } }
}

interface BlizzKeyId {
  key: { href: string }
  id: number
}

interface BlizzNameId {
  name: string
  id: number
}

interface BlizzKeyName extends BlizzKeyId {
  name: string
}

interface BlizzWoWRealm extends BlizzKeyName {
  slug: string
}

export interface BlizzWoWCharacter extends BlizzKeyName {
  realm: BlizzWoWRealm
  level: number
  playable_race: {
    id: number
    key: { href: string }
  }
  playable_class: {
    id: number
    key: { href: string }
  }
}

interface BlizzColor {
  id: number
  rgba: {
    r: number
    g: number
    b: number
    a: number
  }
}

export interface BlizzGuildInfo extends BlizzNameId {
  _links: BlizzSelfRef
  id: number
  faction: {
    type: string
    name: string
  }
  achievement_points: number
  member_count: number
  realm: BlizzWoWRealm
  crest: {
    emblem: {
      id: number
      media: BlizzKeyId
      color: BlizzColor
    }
    border: {
      id: number
      media: BlizzKeyId
      color: BlizzColor
    }
    background: {
      color: BlizzColor
    }
  }
  roster: {
    href: string
  }
  achievements: {
    href: string
  }
  created_timestamp: number
  activity: {
    href: string
  }
}

export interface GuildRosterMember {
  character: BlizzWoWCharacter
  rank: number
}

export interface BlizzGuildRoster extends BlizzNameId {
  _links: BlizzSelfRef
  guild: {
    id: number
    key: { href: string }
    name: string
    faction: {
      type: string
      name: string
    }
    realm: BlizzWoWRealm
  }
  lastModified: string
  members: GuildRosterMember[]
}

export interface PrimaryProfessionTier {
  known_recipes: BlizzKeyName[]
  max_skill_points: number
  skill_points: number
  id: number
  name: string
}

export interface PrimaryProfessionTiers {
  known_recipes: BlizzKeyName[]
  max_skill_points: number
  skill_points: number
  tier: PrimaryProfessionTier
}

export interface BlizzPrimaryProfession {
  profession: BlizzKeyName
  tiers: PrimaryProfessionTiers[]
}

export interface BlizzSecondaryProfession {
  profession: BlizzKeyName
  tiers: PrimaryProfessionTiers[]
}

export interface BlizzArchaeologyProfession {
  profession: BlizzKeyName
  skill_points: number
  max_skill_points: number
}

export interface BlizzCharacterProfessions {
  _links: BlizzSelfRef
  character: BlizzWoWCharacter
  primaries: BlizzPrimaryProfession[]
  secondaries: BlizzArchaeologyProfession[] | BlizzSecondaryProfession[]
  lastModified: string
}