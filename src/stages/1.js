import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { initialStage } from './0.js'
import { STAGES } from './index.js'

export const stageOne = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[123]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.*'

    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      storage[params.from].stage = option.nextStage || STAGES.INITIAL
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })

    if (storage[params.from].stage === STAGES.INITIAL) {
      await initialStage.exec(params)
    } else if (storage[params.from].stage === STAGES.SERVICE) {
      storage[params.from].finalStage = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(60), // 1 minute of inactivity
      }
    }
  },
}

const options = {
  1: () => {
    const message = `
      Certo, vamos lá! 🚀
      -----------------------------------
      Qual item você está procurando? 🤔
    `
    return {
      message,
      nextStage: STAGES.DOUBT,
    }
  },
  2: () => {
    const message =
      '```Descreva sua dúvida em poucas palavras e logo lhe encaminho à um atendente para te auxiliar! 🤗```'

    return {
      message,
      nextStage: STAGES.DOUBT,
    }
  },
  3: () => {
    const message =
      '🔊 *Entendi!* \n\n' +
      '```Escolha entre os vendedores para eu lhe encaminhar o contato direto```. \n\n' +
      '1️⃣ - Alex Sandro\n' +
      '2️⃣ - Marlon Daniel\n' +
      '3️⃣ - Débora Mara\n'
    return {
      message,
      nextStage: STAGES.SERVICE,
    }
  },
}


