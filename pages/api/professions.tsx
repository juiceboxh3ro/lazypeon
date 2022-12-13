import { BlizzAPI } from 'blizzapi'

// // for tricky slugs like "black-dragonflight"
// const getRealms = async (orderby = 'id', page = 1) => {
//   try {
//     const accessToken = await api.getAccessToken()
//     const res = await api.query(`/data/wow/search/realm?namespace=dynamic-us&orderby=${orderby}&_page=${page}&access_token=${accessToken}`)

//     res.results.forEach((r) => console.log(r.data.id, r.data.name.en_US))
//   } catch (e) {
//     console.error(e.code)
//     console.error(e.message)
//   }
// }

// /*
//   sample character data
//   'vue': {
//     'enchanting': { id: 333, DragonIsles: [] },
//     'jewelcrafting': { id: 755, DragonIsles: [] },
//   }
// */
// const guildMemberData = {}

// const getCharProfs = async (realmSlug, charName) => {
//   try {
//     const accessToken = await api.getAccessToken()
//     const suffix = `?namespace=profile-us&locale=en_US&access_token=${accessToken}`
//     // /profile/wow/character/{realmSlug}/{characterName}/professions
//     const res = await api.query(`/profile/wow/character/${realmSlug}/${charName}/professions${suffix}`)
//     const { primaries } = res

//     primaries.forEach((p) => {
//       const profName = p.profession.name.toLowerCase()
//       const profId = p.profession.id
//       const DragonIsles = p.tiers.filter((t) => {
//         if (t.tier.name.includes('Dragon Isles')) return t
//       })

//       guildMemberData[charName] = {
//         ...guildMemberData[charName],
//         [profName]: { id: profId, DragonIsles },
//       }
//     })
//   } catch (e) {
//     console.error(e.code)
//     console.error(e.message)
//   }
// }

// const getCharProfsBatch = async (members) => {
//   for (const member of members) {
//     const { character } = member
//     const { name, realm } = character
//     const realmSlug = realm.slug
//     await getCharProfs(realmSlug, name)
//   }
// }

// // 1. get guild members
// // 2. get character professions for each member
// // 2a. rate limit is 100 requests per second, throttle the speed to ~2 seconds per request
// const getGuildMembers = async () => {
//   try {
//     const accessToken = await api.getAccessToken()
//     const res = await api.query(`/data/wow/guild/zuluhed/threat-level-midnight/roster?namespace=profile-us&locale=en_US&access_token=${accessToken}`)
//     getCharProfsBatch(res.members)
//   } catch (e) {
//     console.error(e.code)
//     console.error(e.message)
//   }
// }

// // 3. filter character profession data to only include dragonflight key raiding and M+ recipes

// // 4. save data to a spreadsheet, each profession in a separate sheet

// // getCharProfs('zuluhed', 'vue')
