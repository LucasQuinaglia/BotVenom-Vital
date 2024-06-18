import fs from 'fs';
import { VenomBot } from './venom.js';
import { stages, getStage } from './stages.js';
import { storage } from './storage.js';
import { STAGES } from './stages/index.js';

const main = async () => {
  try {
    const venombot = await VenomBot.getInstance().init({
      session: 'Vital Equipamentos',
      headless: true,
      useChrome: false,
    });

    venombot.onMessage(async (message) => {
      if (message.isGroupMsg) return;

      const currentStage = getStage({ from: message.from });

      await stages[currentStage].stage.exec({
        from: message.from,
        message: message.body,
      });
    }
    );

  } catch (error) {
    console.error(error);
  }
};

main();
