import { VenomBot } from '../venom.js';
import { storage } from '../storage.js';
import { STAGES } from './index.js';

export const stageTwo = {
  async exec(params) {
    const from = params.from;
    const message = params.message.trim().toUpperCase();
    const isMsgValid = /[AEIOU]/.test(message);
    
    let msg;

    // Inicialize o storage para o usuário, se ainda não estiver inicializado
    if (!storage[from]) {
      storage[from] = { stage: STAGES.INITIAL, finalStage: {}, beingAttended: false };
    }

    if (!isMsgValid) {
      msg = '❌ *Digite uma opção válida, por favor.*';
    } else {
      if (message === 'CANCELAR') {
        const option = options['CANCELAR']();
        msg = option.message;
        storage[from].stage = option.nextStage || STAGES.INITIAL;
        storage[from].beingAttended = false; // Atendimento cancelado
      } else {
        msg = 
          '✅*BELEZA!* Estarei te encaminhando para um consultor de venda \n\n' +
          '\n\n ' +
          '```⏳ Carregando...```';
        storage[from].stage = STAGES.ATTEND;
      }
    }

    // Enviar a mensagem
    await VenomBot.getInstance().sendText({ to: from, message: msg });

    console.log('Próximo estágio:', storage[from].stage);
  },
};

const options = {
  'CANCELAR': () => {
    const message =
      '🔴 Atendimento *CANCELADO* com sucesso. \n\n ```Volte Sempre!```';

    return {
      message,
      nextStage: STAGES.INITIAL, // Defina o estágio correto após o cancelamento
    };
  },
};
