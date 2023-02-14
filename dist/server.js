"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

// server.ts
require('dotenv').config();
const discord_js_1 = require("discord.js");
const { waitForDebugger } = require('inspector');
const fs_1 = __importDefault(require("fs"));
const process_1 = require("process");
const bot = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES] });
const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_DISCORD_ID = process.env.ADMIN_DISCORD_ID;

bot.once("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${new Date().toLocaleString()} - Bot is ready`);
    // Create an event listener for messages
    bot.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (!message.author.bot && message.author.id) {
            let args = message.content.split(' ');
            if (args[0].toUpperCase() === ('FAQ')) {
                message.channel.send('Assembling FAQ, wait...')
                    .then((message) => __awaiter(void 0, void 0, void 0, function* () {
                    message.edit(createFaqMenu());
                }));
            }
        }
    }));
    //Create an event listener for interactions (button interactions on this case)
    bot.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.isButton()) {
            const { questions, otherOption } = JSON.parse(fs_1.default.readFileSync('./faq-config.json', 'utf-8'));
            if (interaction.customId === '?') {
                interaction.reply({ content: otherOption.answer, ephemeral: true });
            }
            else {
                interaction.reply({ content: questions[interaction.customId].answer, ephemeral: true });
            }
        }
    }));
}));



let answer = 'Hello, if you want to know something about this place write FAQ'

bot.on('messageCreate', (message) => {
    if (message.content != answer) {
        if (message.content.toLowerCase() === 'hi') {
            message.reply({
                content: 'Hello, if you want to know something about this place write FAQ',
            });
        }
    }
});

bot.on('messageCreate', (message) => {
    if (message.content != answer) {
        if (message.content.toLowerCase() === 'fuck') {
            message.reply({
                content: "You'll be banned in T-minus ..... !",
            });
        }
    }
});


if (!BOT_TOKEN) {
    console.error("No tokens to launch the bot");
    (0, process_1.exit)(1);
}
bot.login(BOT_TOKEN);

/**
 * Function that creates the Faq Menu message reading from faq-config.json file all the configurations and questions
 * @returns MessageEditOptions with the content necessary to display the message and all the embeds and buttons
 */

function createFaqMenu() {
    const { intro, questions, otherOption, numberEmojis } = JSON.parse(fs_1.default.readFileSync('./faq-config.json', 'utf-8'));
    const buttons = [];
    const content = [];
    if (questions && questions.length > 0) {
        const rows = [];
        for (let i = 0; i < Math.min(questions.length, 9); i++) {
            const emoji = bot.emojis.cache.get(numberEmojis[i]) || numberEmojis[i];
            const q = questions[i];
            content.push(`${emoji} **${q.question}**`);
            buttons.push(new discord_js_1.MessageButton()
                .setEmoji(emoji)
                .setCustomId(i.toString())
                .setStyle("SECONDARY"));
        }
        const questionEmoji = bot.emojis.cache.get(numberEmojis[numberEmojis.length - 1]) || numberEmojis[numberEmojis.length - 1];
        content.push(`${questionEmoji} ${otherOption.question}`);
        buttons.push(new discord_js_1.MessageButton()
            .setEmoji(questionEmoji)
            .setCustomId('?')
            .setStyle("PRIMARY"));
        while (buttons.length > 0) {
            rows.push(new discord_js_1.MessageActionRow().addComponents(buttons.splice(0, Math.min(5, buttons.length))));
        }
        return {
            embeds: [{
                    title: intro.title,
                    description: intro.description,
                    color: 0xFF1717,
                    thumbnail: { url: intro.titleImageUrl }
                },
                {
                    title: intro.titleButtons,
                    description: content.join('\n\n'),
                    color: 0xFF1717,
                    thumbnail: { url: intro.messageButtonImage }
                }],
            content: null,
            components: rows
        };
    }
    return { content: "Nenhuma pergunta configurada!\n\nCrie perguntas no arquivo 'data/questions.json' e mande '!showFaq' novamente" };
}
//# sourceMappingURL=server.js.map