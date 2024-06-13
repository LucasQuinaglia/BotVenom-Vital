import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageThree = {
  async exec({ from, message }) {
    storage[from].address = message
    storage[from].stage = STAGES.PEDIDO

    let msg = 'Atendimento *CANCELADO* com sucesso. \n Volte Sempre!'
    if (message === 'CANCELAR') {
      storage[from].stage = STAGES.INITIAL
    } 

    await VenomBot.getInstance().sendText({ to: from, message: msg })

    // return '✅ *Prontinho, pedido feito!* \n\nAgora, se você ainda não sabe o valor da taxa de entrega para sua região, vou te passar para um atendente para que ele verique o valor da *taxa de entrega*. \n\n⏳ *Aguarde um instante*.'
  },
}
