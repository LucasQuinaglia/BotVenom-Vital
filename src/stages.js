import {
  initialStage,
  stageOne,
  stageTwo,
  stageThree,
  finalStage,
} from './stages/index.js'

import { storage } from './storage.js'

export const stages = [
  {
    descricao: 'Welcome',
    stage: initialStage,
  },
  {
    descricao: 'Budget',
    stage: stageOne,
  },
  {
    descricao: 'Doubt',
    stage: stageTwo,
  },
  {
    descricao: 'Talk to Seller',
    stage: stageThree,
  },
  {
    descricao: 'Assistent',
    stage: finalStage,
  },
]

export function getStage({ from }) {
  if (storage[from]) {
    return storage[from].stage
  }

  storage[from] = {
    stage: 0,
    itens: [],
    address: '',
  }

  return storage[from].stage
}
