import fs from 'fs';
import path from 'path';
import { VenomBot } from '../venom.js';
import { storage } from '../storage.js';
import { STAGES } from './index.js';

export const stageAttend = {
  async exec({ from, message, params }) {
    try {
      const venombot = await VenomBot.getInstance();

      // Carregue o arquivo JSON existente
      const originalFilePath = 'C:\\Users\\lucas_xln2bob\\Desktop\\BotVenom-Vital\\src\\stages\\data.json';
      const clientData = JSON.parse(fs.readFileSync(originalFilePath, 'utf-8'));

      const clientId = from;

      // Atualize o storage com as informações do cliente
      storage[clientId] = storage[clientId];

      // Verifique o stage do cliente no arquivo JSON para decidir se deve ou não enviar mensagem
      if (clientData['👤 Cliente'] && clientData['👤 Cliente'][clientId] && clientData['👤 Cliente'][clientId]['stage'] == '1') {
        const endMessage = '🔴 Atendimento ENCERRADO. \n\n ```Volte Sempre!```';
        await venombot.sendText({ to: clientId, message: endMessage });

        // Reinicie o estágio do cliente para inicial
        storage[clientId].stage = STAGES.INITIAL;

        // Atualize o clientData com o novo estágio
        clientData['👤 Cliente'][clientId].stage = STAGES.INITIAL;

        // Reescreva o arquivo JSON com o estágio atualizado
        const updatedJsonData = JSON.stringify(clientData, null, 2);
        fs.writeFileSync(originalFilePath, updatedJsonData);

        console.log('Estágio do cliente reiniciado para inicial.');
      } else {
        // Atualize o clientData com as informações do cliente
        clientData['👤 Cliente'][clientId] = storage[clientId];
      }

      // Caminho do arquivo temporário
      const tempFilePath = path.join(path.dirname(originalFilePath), 'tempData.json');

      // Dados a serem salvos
      const jsonData = JSON.stringify(clientData, null, 2);

      // Escreva os dados no arquivo temporário
      fs.writeFileSync(tempFilePath, jsonData);

      // Renomeie o arquivo temporário para o nome original
      fs.renameSync(tempFilePath, originalFilePath);

      console.log('✅ Dados salvos com sucesso!');

    } catch (err) {
      console.error('Erro ao salvar os dados:', err);
    }
  },
};
