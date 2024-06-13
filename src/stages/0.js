import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.BUDGET
    
    const venombot = await VenomBot.getInstance()

    const message = `
      👋 Olá, como vai?
      Eu sou o *assistente virtual* da Vital Equipamentos.
      Somos fornedores de EPIs e produzimos uniformes personalizados.
      *Posso te ajudar?* 🙋‍♂️
      -----------------------------------
      1️⃣ - FAZER ORÇAMENTO
      2️⃣ - TIRAR DÚVIDAS
      3️⃣ - FALAR COM VENDEDOR
    `
    await venombot.sendText({ to: from, message })
  },
}
