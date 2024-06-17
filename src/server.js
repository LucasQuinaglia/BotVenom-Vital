import { VenomBot } from './venom.js';
import { stages, getStage } from './stages.js';
import { storage } from './storage.js';

const main = async () => {
  try {
    const venombot = await VenomBot.getInstance().init({
      session: 'Vital Equipamentos',
      headless: true,
      useChrome: false,
    });

    venombot.onMessage(async (message) => {
      if (message.isGroupMsg) return;

      // Verifique se o cliente está sendo atendido
      if (storage[message.from] && storage[message.from].beingAttended) {
        return; // Não faça nada se o cliente estiver sendo atendido
      }

      const currentStage = getStage({ from: message.from });

      await stages[currentStage].stage.exec({
        from: message.from,
        message: message.body,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

main();
