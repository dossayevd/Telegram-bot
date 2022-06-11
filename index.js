const TelegramApi = require('node-telegram-bot-api');

const token = '5512470422:AAHKnrw9s-QCsBQXWG5inw_dqjmcj_0SZmk';

const bot = new TelegramApi(token, { polling: true });

const genderButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: '👱‍♂️ Мужчина', callback_data: 'male' },
        { text: '👩 Женщина', callback_data: 'female' }
      ]
    ]
  })
};

const weightButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: '50-55', callback_data: '50-55' },
        { text: '55-60', callback_data: '55-60' },
        { text: '60-65', callback_data: '60-65' }
      ],
      [
        { text: '65-70', callback_data: '65-70' },
        { text: '70-75', callback_data: '70-75' },
        { text: '75-80', callback_data: '75-80' }
      ],
      [
        { text: '80-85', callback_data: '80-85' },
        { text: '85-90', callback_data: '85-90' },
        { text: '90+', callback_data: '90+' }
      ]
    ]
  })
};

const ageButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: '20-25', callback_data: '20-25' },
        { text: '25-30', callback_data: '25-30' },
        { text: '30-35', callback_data: '30-35' }
      ],
      [
        { text: '35-40', callback_data: '35-40' },
        { text: '40-45', callback_data: '40-45' },
        { text: '45-50', callback_data: '45-50' }
      ],
      [
        { text: '50-55', callback_data: '50-55' },
        { text: '55-60', callback_data: '55-60' },
        { text: '60+', callback_data: '60+' }
      ]
    ]
  })
};

const start = () => {
  bot.on('message', async (msg) => {
    text = msg.text;
    chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendMessage(chatId, 'Привет, как тебя зовут?');
    } else {
      await bot.sendMessage(
        chatId,
        `${text}, перед тем как познакомиться с Кето Котом, ответь, пожалуйста, на 3 вопроса 📝`
      );
      await bot.sendMessage(chatId, '1. Выбери свой пол', genderButton);

      bot.on('callback_query', (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === 'male' || data === 'female') {
        }
        return bot.sendMessage(
          chatId,
          '2. А теперь укажи свой вес',
          weightButton
        );
      });

      bot.on('callback_query', (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (
          data === '50-55' ||
          '55-60' ||
          '60-65' ||
          '65-70' ||
          '70-75' ||
          '75-80' ||
          '80-85' ||
          '85-90' ||
          '90+'
        ) {
          return bot.sendMessage(chatId, '3. Сколько тебе лет?', ageButton);
        }
      });
    }
  });
};

start();
