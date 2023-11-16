import { Bot } from "grammy";
import dotenv from 'dotenv'; 

dotenv.config(); 
const TOKEN = process.env.TOKEN;
const bot = new Bot(String(TOKEN));

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));


// Start the bot.
bot.start();

// require('dotenv').config()
// const express = require('express')
// const bodyParser = require ('body-parser')
// const axios = require('axios')

// const {TOKEN, SERVER_URL} = process.env
// const TELEGRAM_API=`https://api.telegram.org/bot${TOKEN}`no
// const URI = `/webhook/${TOKEN}`
// const WEBHOOK_URL = SERVER_URL+URI

// const app = express()
// app.use(bodyParser.json())

// const init = async () => {
//     const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//     console.log(res.data)
// }


// // Echo received message
// app.post(URI, async (req, res) => {
//    console.log(req.body)

//    const chatId = req.body.message.chat.id
//    const text = req.body.message.text

//    await axios.post(`${TELEGRAM_API}/sendMessage`, {
//         chat_id: chatId,
//         text: text
//    })

//    return res.send()
// })

// app.listen(process.env.PORT || 4040, async () => {
//     console.log('app running on port', process.env.PORT || 4040)
//     await init()
// })