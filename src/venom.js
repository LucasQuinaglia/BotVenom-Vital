import { create } from 'venom-bot';

export class VenomBot {
  #venombot;
  #session;

  static getInstance() {
    if (VenomBot.instance === undefined) VenomBot.instance = new VenomBot();
    return VenomBot.instance;
  }

  async init({ session, headless, useChrome}) {
    this.#session = session;
    this.#venombot = await create({
      session,
      headless: 'new',
      useChrome,
      multidevice: false,
    });

    return this;
  }

  get getSessionName() {
    return this.#session;
  }

  
  async onMessage(callback) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.');
    return await this.#venombot.onMessage(callback);
  }
  
  async getAllChatIds() {
    if (!this.#venombot) throw new Error('VenomBot not initialized.');

    const chats = await this.#venombot.getAllChats();
    const chatIds = chats.map(chat => chat.id._serialized || chat.id);

    return chatIds;
  }

  async getContact(id) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.');
    return await this.#venombot.getContact(id);
  }

  async sendText({ to, message }) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.');
    return await this.#venombot.sendText(to, message);
  }

  async sendContactVcard({ to, contact, name }) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.');
    return await this.#venombot.sendContactVcard(to, contact, name);
  }

  // Is not working
  // async sendButtons({ to, title, buttons, description }) {
  //   if (!this.#venombot) throw new Error('VenomBot not initialized.')

  //   return await this.#venombot.sendButtons(
  //     to,
  //     title,
  //     buttons,
  //     description,
  //   )
  // }

  
}
