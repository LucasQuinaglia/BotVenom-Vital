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

      // Verifique se o cliente está sendo atendido
      if (storage[clientId] && storage[clientId].beingAttended) {
        console.log('Cliente está sendo atendido');
        return; // Não faça nada se o cliente estiver sendo atendido
      }

      // Verifique o stage do cliente no arquivo JSON
      if (clientData['👤 Cliente'] && clientData['👤 Cliente'][clientId] && clientData['👤 Cliente'][clientId]['stage'] === '1') {
        storage[clientId] = { stage: STAGES.INITIAL };
        const endMessage = '🔴 Atendimento ENCERRADO. \n\n ```Volte Sempre!```';
        await venombot.sendText(clientId, endMessage);
        return;
      }

      // Atualize o storage com as informações do cliente
      storage[clientId] = storage[clientId] || {};
      storage[clientId].stage = '1'; // Exemplo de atualização de estágio, ajuste conforme necessário

      // Atualize o clientData com as novas informações
      clientData['👤 Cliente'][clientId] = storage[clientId];

      // Caminho do arquivo temporário
      const tempFilePath = path.join(path.dirname(originalFilePath), 'tempData.json');

      // Dados a serem salvos
      const jsonData = JSON.stringify(clientData, null, 2);

      // Escreva os dados no arquivo temporário
      fs.writeFileSync(tempFilePath, jsonData);

      // Renomeie o arquivo temporário para o nome original
      fs.renameSync(tempFilePath, originalFilePath);

      console.log('✅ Dados salvos com sucesso!');

      // Enviar mensagem após a atualização dos dados
      const userMessage = 'Sua mensagem personalizada aqui'; // Defina a mensagem correta aqui
      if (userMessage) {
        await venombot.sendText(clientId, userMessage);
      } else {
        console.error('Erro ao enviar mensagem: Texto da mensagem não definido');
      }

    } catch (err) {
      console.error('Erro ao salvar os dados:', err);
    }
  },
};
