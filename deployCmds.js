const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot, guild, token } = require('./config.json');

const commands = [];
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of cmdFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(bot, guild), { body: commands })
    .then(() => console.log(`Successfully registered application commands.`))
    .catch(console.error);