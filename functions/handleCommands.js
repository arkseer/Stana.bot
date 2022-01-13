const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot, guild, token } = require('../config.json');

module.exports = (client) => {
    client.handleCommands = async (cmdFiles, path) => {
        client.cmdArray = [];
        for (const file of cmdFiles) {
            const cmd = require(`${path}/${file}`);
            //Set a new item in the Collection
            //With the key as the command name and the value as the exported module
            client.commands.set(cmd.data.name, cmd);
            client.cmdArray.push(cmd.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');
                await rest.put(Routes.applicationGuildCommands(bot, guild), { body: client.cmdArray});
                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};