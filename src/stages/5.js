import fs from 'fs';
import path from 'path';
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
      const dataList = [`👤 Cliente: ${contact.name}, ${storage[from].stage}`];

      // Caminho do arquivo original
      const originalFilePath = 'C:\\Users\\lucas_xln2bob\\Desktop\\BotVenom-Vital\\src\\stages\\data.json';

      // Caminho do arquivo temporário
      const tempFilePath = path.join(path.dirname(originalFilePath), 'tempData.json');

      // Dados a serem salvos
      const jsonData = JSON.stringify(dataList, null, 2);

      try {
        // Escreva os dados no arquivo temporário
        fs.writeFileSync(tempFilePath, jsonData);

        // Renomeie o arquivo temporário para o nome original
        fs.renameSync(tempFilePath, originalFilePath);

        console.log('✅ Dados salvos com sucesso!');
      } catch (err) {
        console.error('Erro ao salvar os dados:', err);
      }
  },
}
