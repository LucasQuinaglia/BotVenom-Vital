import fs from 'fs';
import { VenomBot } from '../venom.js';
import { storage } from '../storage.js';
import { STAGES } from './index.js';

export const stageAttend = {
  async exec({ from, message, params }) {
      
      // Obtenha informações do cliente
      const clients = await VenomBot.getInstance().getAllChatIds();

      const client = clients.find((client) => client === from);

      console.log('Client:', client);
      
      // Obtenha informações de contato
      const contact = await VenomBot.getInstance().getContact(client);

      console.log('Contact:', contact);

      // Crie a lista de dados
      const dataList = [`👤 Cliente: ${contact}`];

      // Converter a lista para uma string JSON
      const jsonData = JSON.stringify(dataList, null, 2);

      // Escreva o arquivo JSON
      const filePath = 'C:\\Users\\lucas_xln2bob\\Desktop\\BotVenom-Vital\\src\\stages\\data.json';
      fs.writeFileSync(filePath, jsonData, (err) => {
        if (err) {
          console.error('Erro ao escrever o arquivo:', err);
        } else {
          console.log('Data written to file:', filePath);
        }
      });
  },
}
