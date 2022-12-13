export interface INotableRecipe {
  type: string
  consumable: {
    name: string
    source: {
      key: string
      value: string
    }
  }[]
}

const enchanting: INotableRecipe[] = [
  {
    type: 'cloak',
    consumable: [
      {
        name: 'Homebound Speed',
        source: {
          key: 'Valdrakken Accord',
          value: 'Reputation 11',
        },
      },
      {
        name: 'Graceful Avoidance',
        source: {
          key: 'Dragonscale Expedition',
          value: 'Reputation 9',
        },
      },
      {
        name: 'Regenerative',
        source: {
          key: 'Iskaara Tuskarr',
          value: 'Reputation 10',
        },
      },
    ],
  },
  {
    type: 'chest',
    consumable: [
      {
        name: 'Waking Stats',
        source: {
          key: 'Profession Specialization',
          value: 'Magical Reinforcement',
        }
      },
      {
        name: 'Sustained Strength',
        source: {
          key: 'Maruuk Centaur',
          value: 'Reputation 8',
        }
      },
      {
        name: 'Reserve of Intellect',
        source: {
          key: 'Profession Specialization',
          value: 'Magical Reinforcement',
        }
      },
      {
        name: 'Accelerated Agility',
        source: {
          key: 'Iskaara Tuskarr',
          value: 'Reputation 10',
        }
      },
    ],
  },
  {
    type: 'bracers',
    consumable: [
      {
        name: 'Devotion of Speed',
        source: {
          key: 'Profession Specialization',
          value: 'Adaptive 20',
        }
      },
      {
        name: 'Devotion of Avoidance',
        source: {
          key: 'Profession Specialization',
          value: 'Adaptive',
        }
      },
      {
        name: 'Devotion of Leech',
        source: {
          key: 'Profession Specialization',
          value: 'Adaptive 10',
        }
      },
    ],
  },
  {
    type: 'boots',
    consumable: [
      {
        name: 'Plainsrunner\'s Breeze',
        source: {
          key: 'Maruuk Centaur',
          value: 'Repuation 8',
        }
      },
      {
        name: 'Watcher\'s Loam',
        source: {
          key: 'Valdrakken Accord',
          value: 'Repuation 11',
        }
      },
    ],
  },
  {
    type: 'ring',
    consumable: [
      {
        name: 'Devotion of Haste',
        source: {
          key: 'Profession',
          value: '35',
        }
      },
      {
        name: 'Devotion of Critical Strike',
        source: {
          key: 'Profession',
          value: '35',
        }
      },
      {
        name: 'Devotion of Mastery',
        source: {
          key: 'Profession',
          value: '35',
        }
      },
      {
        name: 'Devotion of Versatility',
        source: {
          key: 'Profession',
          value: '35',
        }
      },
    ],
  },
  {
    type: 'weapon',
    consumable: [
      {
        name: 'Sophic Devotion',
        source: {
          key: 'Profession Specialization',
          value: 'Sophic',
        }
      },
      {
        name: 'Wafting Devotion',
        source: {
          key: 'Profession Specialization',
          value: 'Air',
        }
      },
      {
        name: 'Frozen Devotion',
        source: {
          key: 'Profession Specialization',
          value: 'Frozen',
        }
      },
    ],
  },
]

const tailoring: INotableRecipe[] = [
  {
    type: 'legs',
    consumable: [
      {
        name: 'Temporal Spellthread',
        source: {
          key: 'Drop',
          value: '',
        }
      },
      {
        name: 'Frozen Spellthread',
        source: {
          key: 'Cobalt Assembly',
          value: 'High',
        }
      },
    ]
  }
]

const alchemy: INotableRecipe[] = [
  {
    type: 'potion',
    consumable: [
      {
        name: 'Elemental Potion of Ultimate Power',
        source: { key: '', value: '' },
      },
      {
        name: 'Elemental Potion of Power',
        source: { key: '', value: '' },
      },
      {
        name: 'Refreshing Healing Potion',
        source: { key: '', value: '' },
      },
      {
        name: 'Potion of Withering Vitality',
        source: { key: '', value: '' },
      },
      {
        name: 'Delicate Suspension of Spores',
        source: { key: '', value: '' },
      },
      {
        name: 'Residual Neural Channeling Agent',
        source: { key: '', value: '' },
      },
      {
        name: 'Aerated Mana Potion',
        source: { key: '', value: '' },
      },
      {
        name: 'Potion of Frozen Focus',
        source: { key: '', value: '' },
      },
      {
        name: 'Potion of Chilled Clarity',
        source: { key: '', value: '' },
      },
      {
        name: 'Potion of the Hushed Zephyr',
        source: { key: '', value: '' },
      },
    ],
  },
  {
    type: 'phial',
    consumable: [
      {
        name: 'Phial of Elemental Chaos',
        source: { key: '', value: '' },
      },
      {
        name: 'Phial of Glacial Fury',
        source: { key: '', value: '' },
      },
      {
        name: 'Iced Phial of Corrupting Rage',
        source: { key: '', value: '' },
      },
      {
        name: 'Phial of Tepid Versatility',
        source: { key: '', value: '' },
      },
      {
        name: 'Phial of the Eye in the Storm',
        source: { key: '', value: '' },
      },
      {
        name: 'Phial of Static Empowerment',
        source: { key: '', value: '' },
      },
    ],
  }
]

const inscription: INotableRecipe[] = [
  {
    type: 'rune',
    consumable: [
      {
        name: 'Howling Rune',
        source: { key: '', value: '' },
      },
      {
        name: 'Buzzing Rune',
        source: { key: '', value: '' },
      },
    ]
  }
]

const engineering: INotableRecipe[] = [
  {
    type: 'scope',
    consumable: [
      {
        name: 'High Intensity Thermal Scanner',
        source: { key: '', value: '' },
      }
    ],
  },
  {
    type: 'ammo',
    consumable: [
      {
        name: 'Completely Safe Rockets',
        source: { key: '', value: '' },
      }
    ],
  }
]

const blacksmithing: INotableRecipe[] = [
  {
    type: 'stone',
    consumable: [
      {
        name: 'Primal Whetstone',
        source: { key: '', value: '' },
      },
      {
        name: 'Primal Weightstone',
        source: { key: '', value: '' },
      },
    ],
  },
]

const leatherworking: INotableRecipe[] = [
  {
    type: 'armor kit',
    consumable: [
      {
        name: 'Fierce Armor Kit',
        source: { key: 'Reward', value: 'Grand Hunt' },
      },
      {
        name: 'Primal Weightstone',
        source: { key: 'Cobalt Assembly', value: 'High' },
      },
    ],
  },
]

const jewelcrafting: INotableRecipe[] = [
  {
    type: 'epic gem',
    consumable: [
      {
        name: 'Fierce Illimited Diamond',
        source: { key: '', value: '' },
      },
      {
        name: 'Skillful Illimited Diamond',
        source: { key: '', value: '' },
      },
      {
        name: 'Inscribed Illimited Diamond',
        source: { key: '', value: '' },
      },
      {
        name: 'Resplendent Illimited Diamond',
        source: { key: '', value: '' },
      },
    ],
  },
  {
    type: 'rare gem',
    consumable: [
      {
        name: 'Stormy Malygite',
        source: { key: '', value: '' },
      },
      {
        name: 'Radiant Malygite',
        source: { key: '', value: '' },
      },
      {
        name: 'Energized Malygite',
        source: { key: '', value: '' },
      },
      {
        name: 'Crafty Alexstraszite',
        source: { key: '', value: '' },
      },
      {
        name: 'Sensei\'s Alexstraszite',
        source: { key: '', value: '' },
      },
      {
        name: 'Deadly Alexstraszite',
        source: { key: '', value: '' },
      },
      {
        name: 'Radiant Alexstraszite',
        source: { key: '', value: '' },
      },
      {
        name: 'Sensei\'s Neltharite',
        source: { key: '', value: '' },
      },
      {
        name: 'Keen Neltharite',
        source: { key: '', value: '' },
      },
      {
        name: 'Zen Neltharite',
        source: { key: '', value: '' },
      },
      {
        name: 'Fractured Neltharite',
        source: { key: '', value: '' },
      },
      {
        name: 'Crafty Ysemerald',
        source: { key: '', value: '' },
      },
      {
        name: 'Energized Ysemerald',
        source: { key: '', value: '' },
      },
      {
        name: 'Keen Ysemerald',
        source: { key: '', value: '' },
      },
      {
        name: 'Quick Ysemerald',
        source: { key: '', value: '' },
      },
    ],
  },
  {
    type: 'socket',
    consumable: [
      {
        name: 'Tiered Medallion Setting',
        source: { key: 'Profession Specialization', value: 'Setting 30' },
      }
    ],
  },
]

const cooking: INotableRecipe[] = [
  {
    type: 'food',
    consumable: [
      {
        name: 'Grand Banquet of the Kalu\'ak',
        source: { key: '', value: '' },
      },
      {
        name: 'Fated Fortune Cookie',
        source: { key: '', value: '' },
      },
      {
        name: 'Sizzling Seafood Medley',
        source: { key: '', value: '' },
      },
      {
        name: 'Feisty Fish Sticks',
        source: { key: '', value: '' },
      },
      {
        name: 'Timely Demise',
        source: { key: '', value: '' },
      },
      {
        name: 'Thousandbone Tongueslicer',
        source: { key: '', value: '' },
      },
      {
        name: 'Revenge, Served Cold',
        source: { key: '', value: '' },
      },
      {
        name: 'Aromatic Seafood Platter',
        source: { key: '', value: '' },
      },
      {
        name: 'Seamoth Surprise',
        source: { key: '', value: '' },
      },
      {
        name: 'Roast Duck Delight',
        source: { key: '', value: '' },
      },
      {
        name: 'Great Cerulean Sea',
        source: { key: '', value: '' },
      },
    ],
  },
]

export default {
  enchanting,
  tailoring,
  alchemy,
  inscription,
  engineering,
  blacksmithing,
  leatherworking,
  jewelcrafting,
  cooking,
}
