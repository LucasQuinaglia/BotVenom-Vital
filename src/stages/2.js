import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageTwo = {
  async exec(params) {
    const message = params.message.trim();
    const isMsgValid = /[ABC|1|2|3|0]/.test(message);

    let msg = '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️ 2.js';

    if (isMsgValid) {
      if (['*'].includes(message)) {
        const option = options[message]();
        msg = option.message;
        storage[params.from].stage = option.nextStage;
      } else {
        // Verificação adicional para evitar erros
        if (msg !== null) {
          msg =
            `✅*BELEZA!* Estarei te encaminhando para um consultor de venda \n\n` +
            '\n\n' +
            '\n--- ```⏳ *Aguarde um instante*.```---' +
            '\n--- *️⃣ - ```CANCELAR atendimento```';
        } else {
          console.error('menu[message] ou menu[message].description está undefined ou null');
          msg = '❌ *Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.*';
        }
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
      message,
      nextStage: STAGES.INITIAL,
    }
  },
}
