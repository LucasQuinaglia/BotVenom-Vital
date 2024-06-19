import { VenomBot } from '../venom.js';
import { storage } from '../storage.js';
import { STAGES } from './index.js';

export const finalStage = {
  async exec({ from, message, params }) {
    if (!message || typeof message !== 'string') {
      console.error('Parâmetro inválido: message deve ser uma string');
      return;
    }

    // Verificar se storage[from] está definido
    if (!storage[from]) {
      storage[from] = { stage: STAGES.INITIAL, itens: [], finalStage: {} };
    }

    const msg = message.trim().toUpperCase();

    const currentDate = new Date();

    // Verificar se storage[from].finalStage está definido
    if (!storage[from].finalStage) {
      storage[from].finalStage = { endsIn: currentDate.getTime() + 60000 }; // 1 minuto a partir de agora
    }

    const history = storage[from].finalStage;

    const isMsgValid = /[1|2|3]/.test(message);

    let responseMsg;

    const options = {
      1: async () => {
        const message = 
        `
          Este é o contato do vendedor Alex. 📞\n
          Só mandar uma mensagem pra ele que ele te atende assim que possível. 📲
        `;
        await VenomBot.getInstance().sendContactVcard({
          to: from,
          contact: '47999352908@c.us',
          name: 'Alex'
        });
        return {
          message
        };
      },
      2: async () => {
        const message = 
        `
          Este é o contato do vendedor Daniel. 📞\n
          Só mandar uma mensagem pra ele que ele te atende assim que possível. 📲
        `;
        await VenomBot.getInstance().sendContactVcard({
          to: from,
          contact: '47992106162@c.us',
          name: 'Daniel'
        });
        return {
          message
        };
      },
      3: async () => {
        const message = 
        `
          Este já é o número da Débora \n
          Só aguardar um pouco que ela te atende assim que possível. 📲
        `;
        return {
          message,
          nextStage: STAGES.ATTEND,
        };
      },
    };

    if (isMsgValid) {
      const option = await options[Number(message)]();
      responseMsg = option.message;
      storage[from].stage = option.nextStage || STAGES.INITIAL;
    } else {
      responseMsg = '❌ *Digite uma opção válida, por favor.*';
    }

    await VenomBot.getInstance().sendText({ to: from, message: responseMsg });

    if (history.endsIn < currentDate.getTime() || msg === 'ENCERRAR') {
      storage[from].stage = STAGES.INITIAL;
      await VenomBot.getInstance().sendText({
        to: from,
        message: '🔚 *Atendimento encerrado* 🔚',
      });
      return;
    }

    storage[from].finalStage.endsIn = new Date().getTime() + 60000; // mais 1 minuto de inatividade
  },
};
