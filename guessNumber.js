// @guessTheNumbersBot

const TelegramBot = require('node-telegram-bot-api');

const token = '*';

const bot = new TelegramBot(token, {polling: true});

const chats = {}

let count = 0;

const gameButton = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data:"1"}, {text: '2', callback_data:"2"}, {text: '3', callback_data:"3"}],
            [{text: '4', callback_data:"4"}, {text: '5', callback_data:"5"}, {text: '6', callback_data:"6"}],
            [{text: '7', callback_data:"7"}, {text: '8', callback_data:"8"}, {text: '9', callback_data:"9"}],
            [{text: '0', callback_data: '0'}]
        ]
    })
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Начало'}, 
        {command: '/game', description: 'Игра'},
    ]);

    bot.on('message', async msg => {
        const text = msg.text;
        const id = msg.chat.id;

        if(text === '/start'){
            return bot.sendMessage(id, 'Добро пожаловать!');
        }
        
        if(text === '/game'){
            const rand = Math.floor(Math.random() * 10);
            chats[id] = rand;
            return bot.sendMessage(id, "Угадай число", gameButton);
        }

        return bot.sendMessage(id, "Я тебя не понимаю")
    });

    bot.on('callback_query', msg =>{

        count++;

        const data = msg.data;
        const id = msg.message.chat.id;

        if(data == chats[id]){ 

            bot.sendMessage(id, `Ты угадал, это цифра ${data}`);
            
            if(count > 5) {
                bot.sendMessage(id, `Тебе понадобилось всего-то ${count} попыток`);
                return count = 0;
            }
            
            bot.sendMessage(id, `И всего с ${count} попыток`);
            return count = 0;
        }
        
        return bot.sendMessage(id, `Не угадал`)
    })
}


start();   
