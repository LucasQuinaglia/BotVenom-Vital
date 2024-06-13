import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageThree = {
  async exec({ from, message }) {

    let msg = 'Atendimento *CANCELADO* com sucesso. \n Volte Sempre!'
    if (message === 'CANCELAR') {
      storage[from].stage = STAGES.INITIAL
    } 

    await VenomBot.getInstance().sendText({ to: from, message: msg })

    
  },
}
