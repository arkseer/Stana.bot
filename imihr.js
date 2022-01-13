const fs = require('fs');
const { Interaction } = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();
const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

(async () => {
    for (const file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, '../events');
    client.handleCommands(cmdFiles, '../commands');
    client.login(token);
})();