const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { pings, classes, agents, games } = require('../config.json');
const { execute } = require('./help');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Send roles select menus (Restricted to owner)')
        .setDefaultPermission(false),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        let pingsMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_pings')
                    .setPlaceholder('Select what content you want to be pinged')
                    .setMinValues(0)
                    .setMaxValues(5),
            );

        for (let x in pings) {
            pingsMenu.components[0].addOptions([
                {
                    label: pings[x]['label'],
                    value: pings[x]['value'],
                    emoji: pings[x]['emoji'],
                },
            ]);
        }

        let gamesMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_games')
                    .setPlaceholder('GAMES: Select what games you play')
                    .setMinValues(0)
                    .setMaxValues(2),
            );

        for (let x in games) {
            gamesMenu.components[0].addOptions([
                {
                    label: games[x]['label'],
                    value: games[x]['value'],
                    emoji: games[x]['emoji']
                },
            ]);
        }
        
        let vaClassesMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_va_classes')
                    .setPlaceholder('VALORANT: Select your main class')
                    .setMinValues(1)
                    .setMaxValues(1),
            );

        for (let x in classes) {
            vaClassesMenu.components[0].addOptions([
                {
                    label: classes[x]['label'],
                    value: classes[x]['value'],
                    emoji: classes[x]['emoji']
                },
            ]);
        }
        
        let vaAgentsMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_va_agents')
                    .setPlaceholder('VALORANT: Select your main agent')
                    .setMinValues(1)
                    .setMaxValues(1),
            );

        for (let x in agents) {
            vaAgentsMenu.components[0].addOptions([
                {
                    label: agents[x]['label'],
                    value: agents[x]['value'],
                    emoji: agents[x]['emoji'],
                },
            ]);
        }

            await interaction.reply({ content: `Command initiated`, ephemeral: true, components: [] });
            await wait(2000);

            await interaction.channel.send({ content: `You can select one or multiple options to be granted different benefits in the community`, ephemeral: false, components: [pingsMenu, gamesMenu, vaClassesMenu, vaAgentsMenu] });
    }
}