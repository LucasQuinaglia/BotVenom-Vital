import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageTwo = {
  async exec(params) {
    const message = params.message.trim();
    const isMsgValid = /[ABC]/.test(message.toUpperCase());

    let msg = '❌ *Digite uma opção válida, por favor.* \n 2.js';

    if (isMsgValid) {
      if (['CANCELAR'].includes(message)) {
        const option = options[message]();
        msg = option.message;
        storage[params.from].stage = option.nextStage;
      } else {
        msg =
            `✅*BELEZA!* Estarei te encaminhando para um consultor de venda \n\n` +
            '\n\n ' +
            '```⏳ Carregando...``` \n\n' +
            '```Para cancelar digite *CANCELAR* a qualquer momento.```'
      }

      if (storage[params.from].stage === STAGES.INITIAL) {
        storage[params.from].itens = [];
      }
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg });
  },
};


const options = {
  'CANCELAR': () => {
    const message =
      '🔴 Atendimento *CANCELADO* com sucesso. \n\n ```Volte Sempre!```'

    return {
      message
    }
  },
}
