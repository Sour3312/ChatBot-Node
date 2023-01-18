const telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

// youtube.com/watch?v=7TUBWak4apQ

// t.me/sourabh_srv_bot

// got this botToken from BotFather(Telegram) 
const botToken = "5956411604:AAETjMMrVGVFXiByy70ZbgkylTqtdMC8OhY";

// this from https://beta.openai.com/account/api-keys
const AiKey = "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";

const config = new Configuration({ apiKey: AiKey });
const openAI = new OpenAIApi(config);

const bot = new telegram(botToken, { polling: true });

// start msg reply
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Hello I am Sourabh From Mapmyindia. How may I help you."
  );
});

// catch the user input into 'message' and reply accordingly via ai model 'ada'
// ada is ai model for auto reply to questions ask by the user 

bot.on("message", async (msg) => {
  const reply = await openAI.createCompletion({
    max_tokens: 100,
    model: "ada",
    prompt: msg.text,
    temperature: 0.5,
  });

  const chatId = msg.chat.id;
  bot.sendMessage(chatId, reply.data.choices[0].text);
});
