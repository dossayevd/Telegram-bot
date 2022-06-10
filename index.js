const TelegramApi = require('node-telegram-bot-api');

const { gameOptions, againOptions } = require('./options');

const token = '5533230002:AAHkZEVG0icNTVY6gAMS_jB-x5ys9sXIuBY';

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    `Сейчас я загадаю цифру от 0 до 9, а ты должна ее угадать!`
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Приветствие' },
    { command: '/game', description: 'Начать игру' }
  ]);

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      return bot.sendMessage(
        chatId,
        `Добро пожаловать! Этот бот был создан Даирханом Досаевым. Это первый телеграм бот в его жизни, и он решил посвятить его своей невероятной девушке. Приятного использования 😘. Для того чтобы продолжить вы должны ввести ваше имя:`
      );
    } else if (text === 'Дарья' || text === 'Даша') {
      await bot.sendMessage(
        chatId,
        `О да, ${text}, ты именно та, для которой это все и задумывалось!`
      );
      await bot.sendMessage(
        chatId,
        'Сейчас я загадаю цифру от 0 до 9, а тебе нужно всего лишь угадать🙃',
        gameOptions
      );
    } else if (text === '/game') {
      return startGame(chatId);
    } else {
      return bot.sendMessage(chatId, `Ой, ${text}, ты нет тот, кто нам нужен!`);
    }
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
      return startGame(chatId);
    }
    if (data == chats[chatId]) {
      await bot.sendMessage(
        chatId,
        `Поздравляю, ты отгадала цифру ${chats[chatId]}`,
        againOptions
      );
    } else {
      await bot.sendMessage(
        chatId,
        `К сожалению ты не угадала, бот загадал цифру ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
